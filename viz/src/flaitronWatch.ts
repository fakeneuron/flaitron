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

// Both watchers watch each project's `.flaitron/` root (see `watchRoots`), not
// `tasknote/` or `tasknote/archive/` directly: chokidar silently never fires for
// a watch path that is absent at start, and a freshly adopted project has a
// PLAN.md but no tasknote dir yet. The root always exists — discovery gates on
// its PLAN.md — so the reach is carried entirely by `depth` + these predicates.
//
// `ignored` gates traversal as well as events, and the root also holds the
// `core/` submodule (a whole flaitron checkout), so the predicates prune by path
// shape: every directory on a reach path is named exactly and kept — stats-less
// pre-checks included — and everything else under the root is pruned.

function isMarkdownFile(path: string, stats?: Stats): boolean {
  return path.endsWith('.md') && stats?.isDirectory() !== true;
}

/**
 * Hot reach: `.flaitron/PLAN.md` + `tasknote/*.md`. `PLAN-ARCHIVE.md` stays
 * out — rotation always edits PLAN.md too — and the archive tree below the
 * tasknote dir is pruned at `archive/`.
 */
export function ignoreOutsideHotReach(projects: readonly ProjectDescriptor[]) {
  const roots = new Set(projects.map((p) => dirname(p.planPath)));
  const plans = new Set(projects.map((p) => p.planPath));
  const tasknoteDirs = new Set(projects.map((p) => p.tasknoteDir));
  return (path: string, stats?: Stats): boolean => {
    if (roots.has(path) || plans.has(path) || tasknoteDirs.has(path)) return false;
    return !(tasknoteDirs.has(dirname(path)) && isMarkdownFile(path, stats));
  };
}

/**
 * Archive reach must stay exactly `<archiveDir>/<area>/<file>.md` — the shape
 * `archiveCache`'s `readArchive` reads — a single area level. A stray `.md`
 * directly in the archive dir, or one nested below an area, stays silent.
 */
export function ignoreOutsideArchiveReach(projects: readonly ProjectDescriptor[]) {
  const roots = new Set(projects.map((p) => dirname(p.planPath)));
  const tasknoteDirs = new Set(projects.map((p) => p.tasknoteDir));
  const archiveDirs = new Set(projects.map((p) => p.archiveDir));
  return (path: string, stats?: Stats): boolean => {
    if (roots.has(path) || tasknoteDirs.has(path) || archiveDirs.has(path)) return false;
    const parent = dirname(path);
    // An area dir: anything but a file (or a `.md`, before stats arrive).
    if (archiveDirs.has(parent)) return path.endsWith('.md') || stats?.isFile() === true;
    return !(archiveDirs.has(dirname(parent)) && isMarkdownFile(path, stats));
  };
}

/**
 * Hot set (PLAN.md + active tasknotes) — must poll inside symlink roots.
 * `depth: 1` from the `.flaitron/` root reaches `tasknote/<file>.md`.
 */
export function hotWatchOptions(projects: readonly ProjectDescriptor[]) {
  return {
    ignoreInitial: true,
    depth: 1,
    usePolling: true,
    interval: WATCH_POLL_MS,
    ignored: ignoreOutsideHotReach(projects),
  } as const;
}

/**
 * Archives — native watch: at fleet scale the cost is the poll, not the
 * watch. `depth: 3` from the `.flaitron/` root reaches
 * `tasknote/archive/<area>/<file>.md`. Anchoring at the root also puts native
 * handles on the root and tasknote dir, so PLAN.md and active-note saves wake
 * this watcher too and are dropped by the predicate — the accepted price of a
 * root that exists before the archive does.
 */
export function archiveWatchOptions(projects: readonly ProjectDescriptor[]) {
  return {
    ignoreInitial: true,
    depth: 3,
    usePolling: false,
    ignored: ignoreOutsideArchiveReach(projects),
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
    // retired globs matched files only, and the reach predicates must keep the
    // directories on each reach path for traversal — so the file-only reach is
    // restored here.
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
