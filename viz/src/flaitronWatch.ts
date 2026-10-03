import type { Stats } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { dirname } from 'node:path';
import type { ArchiveCache } from './archiveCache.ts';
import { formatChangePayload, type ChangeScope } from './sseChange.ts';
import { projectForActiveTasknote, projectForPath } from './watchSet.ts';
import type { ProjectDescriptor } from './workspace.ts';

export const WATCH_POLL_MS = 200;
export const SSE_DEBOUNCE_MS = 200;
/** Upper bound on debounce coalescing — flush at least once per burst. */
export const SSE_MAX_WAIT_MS = 1000;
export const SSE_HEARTBEAT_MS = 30_000;

/**
 * Markdown files only. Directories must pass — chokidar applies `ignored` to
 * traversal as well as events, so pruning a directory would stop the watcher
 * ever reaching the files inside it. The stats-less pre-check chokidar makes
 * before stat'ing also passes, for the same reason.
 */
export function ignoreNonMarkdown(path: string, stats?: Stats): boolean {
  return stats?.isFile() === true && !path.endsWith('.md');
}

/**
 * Archive reach must stay exactly `<archiveRoot>/<area>/<file>.md` — the shape
 * `archiveCache`'s `readArchive` reads — a single area level. `depth: 1` alone
 * is looser than that: it would also admit a stray `.md` sitting directly in
 * an archive root, so the root list narrows it back.
 */
export function ignoreOutsideArchiveArea(archiveRoots: readonly string[]) {
  return (path: string, stats?: Stats): boolean => {
    if (stats?.isFile() !== true) return false;
    if (!path.endsWith('.md')) return true;
    return !archiveRoots.some((root) => dirname(dirname(path)) === root);
  };
}

/**
 * Hot set (PLAN.md + active tasknotes) — must poll inside symlink roots.
 * `depth: 0` keeps the reach at the tasknote dir's immediate children (the
 * active notes); it also stops the hot watcher descending into the archive
 * tree below it.
 */
export const WATCH_HOT_OPTIONS = {
  ignoreInitial: true,
  depth: 0,
  usePolling: true,
  interval: WATCH_POLL_MS,
  ignored: ignoreNonMarkdown,
} as const;

/**
 * Archives — native watch: at fleet scale the cost is the poll, not the
 * watch. `depth: 1` reaches `<area>/<file>.md`. Takes the watched archive
 * roots because the reach predicate needs them (see above).
 */
export function archiveWatchOptions(archiveRoots: readonly string[]) {
  return {
    ignoreInitial: true,
    depth: 1,
    usePolling: false,
    ignored: ignoreOutsideArchiveArea(archiveRoots),
  } as const;
}

/**
 * One attributed watch hit: which project changed and which kind of path fired.
 * Passed as a single value rather than two parameters so a half-attributed pair
 * (a project with no scope) is unrepresentable — `undefined` is the only
 * unattributed shape, and it fails open to a full refetch.
 */
export interface ChangeHit {
  project: string;
  scope: ChangeScope;
}

interface ChangeBroadcaster {
  schedule(hit: ChangeHit | undefined): void;
  flush(): void;
  dispose(): void;
}

export function createChangeBroadcaster(opts: {
  sseClients: Set<ServerResponse>;
  debounceMs?: number;
  maxWaitMs?: number;
}): ChangeBroadcaster {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let maxWaitTimer: ReturnType<typeof setTimeout> | null = null;
  // Project name → the scopes that fired for it during this window. A burst
  // legitimately spans kinds (an archive move touches tasknoteDir and
  // archiveDir), so the window accumulates a set per project rather than one
  // scope per project.
  const pendingScopes = new Map<string, Set<ChangeScope>>();
  let pendingUnattributed = false;

  const clearTimers = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    if (maxWaitTimer) {
      clearTimeout(maxWaitTimer);
      maxWaitTimer = null;
    }
  };

  const flush = () => {
    clearTimers();
    const entries = [...pendingScopes];
    const unattributed = pendingUnattributed;
    pendingScopes.clear();
    pendingUnattributed = false;
    // One unattributable event in the window collapses the whole flush to `{}`
    // (fail-open) — the scoped payloads would otherwise let a client
    // skip an endpoint the unknown path may have invalidated.
    const payloads = unattributed
      ? [formatChangePayload(undefined)]
      : entries.map(([name, scopes]) => formatChangePayload(name, scopes));
    for (const res of opts.sseClients) {
      for (const data of payloads) {
        res.write(`event: change\ndata: ${data}\n\n`);
      }
    }
  };

  const schedule = (hit: ChangeHit | undefined) => {
    if (hit) {
      let scopes = pendingScopes.get(hit.project);
      if (!scopes) {
        scopes = new Set();
        pendingScopes.set(hit.project, scopes);
      }
      scopes.add(hit.scope);
    } else pendingUnattributed = true;
    if (!maxWaitTimer) {
      maxWaitTimer = setTimeout(flush, opts.maxWaitMs ?? SSE_MAX_WAIT_MS);
    }
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(flush, opts.debounceMs ?? SSE_DEBOUNCE_MS);
  };

  return {
    schedule,
    flush,
    dispose() {
      clearTimers();
    },
  };
}

interface Heartbeat {
  start(): void;
  stop(): void;
}

/**
 * Keeps the SSE socket warm by writing `: ping` on an interval so intermediary
 * proxies/browsers don't time out an idle connection. `start()` is idempotent
 * (a second call while already running is a no-op) since `configureServer`
 * runs once per dev-server lifecycle but callers shouldn't have to track that.
 */
export function createHeartbeat(sseClients: Set<ServerResponse>, ms: number): Heartbeat {
  let interval: ReturnType<typeof setInterval> | null = null;
  return {
    start() {
      if (interval) return;
      interval = setInterval(() => {
        for (const res of sseClients) res.write(': ping\n\n');
      }, ms);
    },
    stop() {
      if (interval) clearInterval(interval);
      interval = null;
    },
  };
}

/**
 * `'error'` listener for a chokidar watcher. chokidar never forwards `'error'`
 * to the `'all'` listener (`emitWithAll` skips it), and `FSWatcher` is an
 * `EventEmitter` — so with no listener an EMFILE / EPERM / EBUSY fault throws
 * out of the event loop and takes the dev server down with it. Logging is the
 * whole degrade path: the watcher keeps whatever handles it did open, and a
 * dev-server restart is the recovery.
 */
export function createOnWatchError(label: string): (error: unknown) => void {
  return (error) => {
    const code = (error as { code?: unknown } | null)?.code;
    const message = error instanceof Error ? error.message : String(error);
    const where = typeof code === 'string' ? `${label} watcher error (${code})` : `${label} watcher error`;
    console.error(`[flaitronWatch] ${where}: ${message} — watching degraded until the dev server restarts`);
  };
}

export function createOnWatchEvent(opts: {
  projects: Iterable<ProjectDescriptor>;
  archiveCache: ArchiveCache;
  broadcast: Pick<ChangeBroadcaster, 'schedule'>;
}): (event: string, filepath: unknown) => void {
  // Materialize once. `Iterable` promises nothing about re-iterability, and the
  // handler below walks this list up to three times *per event*, for every
  // event on both watchers — so a one-shot iterator (the production call site
  // passes `Map.values()`) dies on the first pass and every later read sees an
  // empty sequence: SSE attribution never fires and archive-cache invalidation
  // stops matching. Safe to snapshot: discovery completes before this
  // handler is constructed and the project set is not mutated afterwards.
  const projects = [...opts.projects];
  return (event, filepath) => {
    if (typeof filepath !== 'string') return;
    // chokidar reports directory events (`addDir` / `unlinkDir`) too. The
    // retired globs matched files only, and `ignored` cannot prune directories
    // without also pruning traversal — so the file-only reach is restored here.
    if (!filepath.endsWith('.md')) return;
    opts.archiveCache.invalidate(filepath, projects);
    if (event === 'unlink') {
      const owner = projectForActiveTasknote(filepath, projects);
      if (owner) opts.archiveCache.invalidateProject(owner.name);
    }
    const hit = projectForPath(filepath, projects);
    // An unmatched path stays unattributed — and so unscoped — on purpose: not
    // knowing which project it belongs to also means not knowing which of its
    // endpoints it invalidated.
    opts.broadcast.schedule(hit && { project: hit.project.name, scope: hit.scope });
  };
}
