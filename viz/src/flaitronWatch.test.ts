import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import type { Stats } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createArchiveCache } from './archiveCache';
import {
  archiveWatchOptions,
  createChangeBroadcaster,
  createHeartbeat,
  createOnWatchError,
  createOnWatchEvent,
  ignoreNonMarkdown,
  ignoreOutsideArchiveArea,
  SSE_DEBOUNCE_MS,
  SSE_MAX_WAIT_MS,
  WATCH_HOT_OPTIONS,
  WATCH_POLL_MS,
  type ChangeHit,
} from './flaitronWatch';
import type { ProjectDescriptor } from './workspace';

interface FakeRes {
  chunks: string[];
}

function makeRes(): { res: ServerResponse; state: FakeRes } {
  const state: FakeRes = { chunks: [] };
  const res = {
    write(chunk: string) {
      state.chunks.push(chunk);
    },
  } as unknown as ServerResponse;
  return { res, state };
}

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'flaitron-viz-watch-'));
  vi.useFakeTimers();
});

afterEach(async () => {
  vi.useRealTimers();
  await rm(root, { recursive: true, force: true });
});

async function makeProject(name: string): Promise<ProjectDescriptor> {
  const projectRoot = join(root, name);
  const projectDir = join(projectRoot, '.flaitron');
  const tasknoteDir = join(projectDir, 'tasknote');
  const archiveDir = join(tasknoteDir, 'archive');
  await mkdir(join(archiveDir, 'core'), { recursive: true });
  await writeFile(join(projectDir, 'PLAN.md'), `## High\n\n- [ ] **${name.toUpperCase()}-001** — seed\n`);
  return {
    name,
    root: projectRoot,
    planPath: join(projectDir, 'PLAN.md'),
    planArchivePath: join(projectDir, 'PLAN-ARCHIVE.md'),
    tasknoteDir,
    archiveDir,
    flaitronVersion: null,
  };
}

const FILE = { isFile: () => true, isDirectory: () => false } as unknown as Stats;
const DIR = { isFile: () => false, isDirectory: () => true } as unknown as Stats;

describe('watcher option pins (chokidar 5 depths)', () => {
  it('polls the hot set at WATCH_POLL_MS with depth 0', () => {
    expect(WATCH_HOT_OPTIONS).toEqual({
      ignoreInitial: true,
      depth: 0,
      usePolling: true,
      interval: WATCH_POLL_MS,
      ignored: ignoreNonMarkdown,
    });
  });

  it('watches archives natively with depth 1', () => {
    const roots = ['/ws/alpha/.flaitron/tasknote/archive'];
    expect(archiveWatchOptions(roots)).toMatchObject({
      ignoreInitial: true,
      depth: 1,
      usePolling: false,
    });
    expect(typeof archiveWatchOptions(roots).ignored).toBe('function');
  });
});

// chokidar 4 dropped glob support, so the retired `*.md` / `*/*.md` reach is
// now carried by these predicates plus `depth`. They must not prune
// directories: `ignored` gates traversal as well as events.
describe('ignoreNonMarkdown', () => {
  it('ignores non-markdown files', () => {
    expect(ignoreNonMarkdown('/ws/a/.flaitron/tasknote/notes.txt', FILE)).toBe(true);
  });

  it('keeps markdown files', () => {
    expect(ignoreNonMarkdown('/ws/a/.flaitron/tasknote/CORE-001.md', FILE)).toBe(false);
  });

  it('keeps directories and stats-less pre-checks so traversal can reach files', () => {
    expect(ignoreNonMarkdown('/ws/a/.flaitron/tasknote/archive', DIR)).toBe(false);
    expect(ignoreNonMarkdown('/ws/a/.flaitron/tasknote/archive')).toBe(false);
  });
});

describe('ignoreOutsideArchiveArea (reader-matching reach)', () => {
  const archiveRoot = '/ws/alpha/.flaitron/tasknote/archive';
  const ignored = ignoreOutsideArchiveArea([archiveRoot]);

  it('keeps <archiveRoot>/<area>/<file>.md — the shape readArchive reads', () => {
    expect(ignored(join(archiveRoot, 'core', 'CORE-001.md'), FILE)).toBe(false);
  });

  it('ignores a stray .md sitting directly in the archive root', () => {
    expect(ignored(join(archiveRoot, 'README.md'), FILE)).toBe(true);
  });

  it('ignores .md nested deeper than one area level', () => {
    expect(ignored(join(archiveRoot, 'core', 'old', 'CORE-001.md'), FILE)).toBe(true);
  });

  it('ignores non-markdown files', () => {
    expect(ignored(join(archiveRoot, 'core', 'notes.txt'), FILE)).toBe(true);
  });

  it('keeps directories so traversal can reach the area dirs', () => {
    expect(ignored(join(archiveRoot, 'core'), DIR)).toBe(false);
    expect(ignored(join(archiveRoot, 'core'))).toBe(false);
  });

  it('is per-root', () => {
    const other = '/ws/beta/.flaitron/tasknote/archive';
    expect(ignoreOutsideArchiveArea([archiveRoot, other])(join(other, 'fe', 'FE-001.md'), FILE)).toBe(
      false,
    );
  });
});

describe('createOnWatchEvent wiring', () => {
  it('invalidates archive cache and schedules an attributed broadcast for archive changes', async () => {
    const alpha = await makeProject('alpha');
    const archivePath = join(alpha.archiveDir, 'core', 'CORE-001.md');
    await writeFile(
      archivePath,
      `---
title: prior
status: completed
created: 2026-05-01
---

# CORE-001 | prior
`,
    );
    const cache = createArchiveCache();
    const firstPromise = cache.get(alpha);
    await firstPromise;

    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: [alpha],
      archiveCache: cache,
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    onWatchEvent('change', archivePath);

    expect(scheduled).toEqual([{ project: 'alpha', scope: 'archive' }]);
    expect(cache.get(alpha)).not.toBe(firstPromise);
    const after = await cache.get(alpha);
    expect(after.map((t) => t.id)).toEqual(['CORE-001']);
  });

  it('does not invalidate archive cache on PLAN.md change but still attributes the project', async () => {
    const alpha = await makeProject('alpha');
    const cache = createArchiveCache();
    const firstPromise = cache.get(alpha);
    await firstPromise;

    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: [alpha],
      archiveCache: cache,
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    onWatchEvent('change', alpha.planPath);

    expect(scheduled).toEqual([{ project: 'alpha', scope: 'plan' }]);
    expect(cache.invalidate(alpha.planPath, [alpha])).toBe(false);
    expect(cache.get(alpha)).toBe(firstPromise);
  });

  it('unlink of an active tasknote invalidates the project archive cache and attributes broadcast', async () => {
    const alpha = await makeProject('alpha');
    const activePath = join(alpha.tasknoteDir, 'CORE-999.md');
    await writeFile(
      activePath,
      `---
title: active
status: in-progress
created: 2026-05-18
---

# CORE-999 | active
`,
    );
    await writeFile(join(alpha.archiveDir, 'core', 'CORE-001.md'), tasknote('CORE-001', 'prior'));
    const cache = createArchiveCache();
    const firstPromise = cache.get(alpha);
    await firstPromise;

    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: [alpha],
      archiveCache: cache,
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    onWatchEvent('unlink', activePath);

    expect(scheduled).toEqual([{ project: 'alpha', scope: 'active' }]);
    expect(cache.get(alpha)).not.toBe(firstPromise);
    const repopulated = await cache.get(alpha);
    expect(repopulated.map((t) => t.id)).toEqual(['CORE-001']);
  });

  it('ignores non-string filepath', async () => {
    const alpha = await makeProject('alpha');
    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: [alpha],
      archiveCache: createArchiveCache(),
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    onWatchEvent('change', null);

    expect(scheduled).toEqual([]);
  });
});

// The production call site passes `Map.values()` — a one-shot iterator. Every
// test above hands in an array, which is re-iterable, so array-fed tests alone
// can't express this failure.
// These construct the handler exactly as `vite.config.ts` does.
describe('createOnWatchEvent survives a one-shot iterator', () => {
  it('attributes a PLAN.md change when constructed from Map.values()', async () => {
    const alpha = await makeProject('alpha');
    const map = new Map<string, ProjectDescriptor>([[alpha.name, alpha]]);

    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: map.values(),
      archiveCache: createArchiveCache(),
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    // A PLAN.md path matches no archiveDir, so invalidate() walks the whole
    // sequence before projectForPath() reads it — the exact ordering that would
    // leave every change permanently unattributed.
    onWatchEvent('change', alpha.planPath);

    expect(scheduled).toEqual([{ project: 'alpha', scope: 'plan' }]);
  });

  it('keeps invalidating the archive cache after the first event', async () => {
    const alpha = await makeProject('alpha');
    const archiveDirCore = join(alpha.archiveDir, 'core');
    await writeFile(join(archiveDirCore, 'CORE-001.md'), tasknote('CORE-001', 'prior'));
    const map = new Map<string, ProjectDescriptor>([[alpha.name, alpha]]);

    const cache = createArchiveCache();
    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: map.values(),
      archiveCache: cache,
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    const firstPromise = cache.get(alpha);
    await firstPromise;
    onWatchEvent('change', join(archiveDirCore, 'CORE-001.md'));
    expect(cache.get(alpha)).not.toBe(firstPromise);

    // Second event on the same handler — where a consumed iterator leaves the
    // cache stale and the broadcast unattributed.
    const secondPromise = cache.get(alpha);
    await secondPromise;
    await writeFile(join(archiveDirCore, 'CORE-002.md'), tasknote('CORE-002', 'later'));
    onWatchEvent('add', join(archiveDirCore, 'CORE-002.md'));

    expect(cache.get(alpha)).not.toBe(secondPromise);
    const repopulated = await cache.get(alpha);
    expect(repopulated.map((t) => t.id).sort()).toEqual(['CORE-001', 'CORE-002']);
    expect(scheduled).toEqual([
      { project: 'alpha', scope: 'archive' },
      { project: 'alpha', scope: 'archive' },
    ]);
  });

  it('still invalidates the owning project on a second unlink event', async () => {
    const alpha = await makeProject('alpha');
    const first = join(alpha.tasknoteDir, 'CORE-998.md');
    const second = join(alpha.tasknoteDir, 'CORE-999.md');
    await writeFile(first, tasknote('CORE-998', 'active one'));
    await writeFile(second, tasknote('CORE-999', 'active two'));
    await writeFile(join(alpha.archiveDir, 'core', 'CORE-001.md'), tasknote('CORE-001', 'prior'));
    const map = new Map<string, ProjectDescriptor>([[alpha.name, alpha]]);

    const cache = createArchiveCache();
    const scheduled: Array<ChangeHit | undefined> = [];
    const onWatchEvent = createOnWatchEvent({
      projects: map.values(),
      archiveCache: cache,
      broadcast: { schedule: (hit) => scheduled.push(hit) },
    });

    onWatchEvent('unlink', first);
    const afterFirst = cache.get(alpha);
    await afterFirst;

    onWatchEvent('unlink', second);

    expect(cache.get(alpha)).not.toBe(afterFirst);
    expect(scheduled).toEqual([
      { project: 'alpha', scope: 'active' },
      { project: 'alpha', scope: 'active' },
    ]);
  });
});

// chokidar never forwards 'error' to the 'all' listener, and FSWatcher is an
// EventEmitter — an unlistened 'error' emit throws and kills the dev server.
// The listener's whole job is to log and swallow.
describe('createOnWatchError', () => {
  it('logs the label, errno code, and message to stderr without throwing', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = createOnWatchError('hot');
    const err = Object.assign(new Error('too many open files'), { code: 'EMFILE' });

    expect(() => onError(err)).not.toThrow();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0]?.[0]).toBe(
      '[flaitronWatch] hot watcher error (EMFILE): too many open files — watching degraded until the dev server restarts',
    );
    spy.mockRestore();
  });

  it('omits the code segment for a plain Error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    createOnWatchError('archive')(new Error('boom'));

    expect(spy.mock.calls[0]?.[0]).toBe(
      '[flaitronWatch] archive watcher error: boom — watching degraded until the dev server restarts',
    );
    spy.mockRestore();
  });

  it('stringifies a non-Error payload', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = createOnWatchError('hot');

    expect(() => onError('EBUSY')).not.toThrow();
    expect(() => onError(null)).not.toThrow();
    expect(spy.mock.calls.map((c) => c[0])).toEqual([
      '[flaitronWatch] hot watcher error: EBUSY — watching degraded until the dev server restarts',
      '[flaitronWatch] hot watcher error: null — watching degraded until the dev server restarts',
    ]);
    spy.mockRestore();
  });
});

describe('createChangeBroadcaster (debounce + attribution)', () => {
  it('debounces and writes one attributed change event per project', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'plan' });
    broadcaster.schedule({ project: 'beta', scope: 'archive' });
    broadcaster.schedule({ project: 'alpha', scope: 'plan' });
    vi.advanceTimersByTime(SSE_DEBOUNCE_MS);

    expect(state.chunks).toEqual([
      'event: change\ndata: {"project":"alpha","scopes":["plan"]}\n\n',
      'event: change\ndata: {"project":"beta","scopes":["archive"]}\n\n',
    ]);
  });

  // A burst legitimately spans kinds — an archive move unlinks from tasknoteDir
  // and adds under archiveDir — so the window accumulates a set per project
  // rather than letting the last scope win.
  it('accumulates every scope that fired for a project in one window', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'active' });
    broadcaster.schedule({ project: 'alpha', scope: 'archive' });
    broadcaster.schedule({ project: 'alpha', scope: 'active' });
    vi.advanceTimersByTime(SSE_DEBOUNCE_MS);

    expect(state.chunks).toEqual([
      'event: change\ndata: {"project":"alpha","scopes":["active","archive"]}\n\n',
    ]);
  });

  it('keeps scope sets separate per project', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'plan' });
    broadcaster.schedule({ project: 'beta', scope: 'active' });
    broadcaster.schedule({ project: 'alpha', scope: 'archive' });
    vi.advanceTimersByTime(SSE_DEBOUNCE_MS);

    expect(state.chunks).toEqual([
      'event: change\ndata: {"project":"alpha","scopes":["plan","archive"]}\n\n',
      'event: change\ndata: {"project":"beta","scopes":["active"]}\n\n',
    ]);
  });

  it('starts a fresh scope set after a flush', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'archive' });
    vi.advanceTimersByTime(SSE_DEBOUNCE_MS);
    broadcaster.schedule({ project: 'alpha', scope: 'plan' });
    vi.advanceTimersByTime(SSE_DEBOUNCE_MS);

    expect(state.chunks).toEqual([
      'event: change\ndata: {"project":"alpha","scopes":["archive"]}\n\n',
      'event: change\ndata: {"project":"alpha","scopes":["plan"]}\n\n',
    ]);
  });

  it('flushes at maxWaitMs when schedule keeps resetting the debounce timer', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({
      sseClients,
      debounceMs: SSE_DEBOUNCE_MS,
      maxWaitMs: SSE_MAX_WAIT_MS,
    });

    for (let i = 0; i < 5; i++) {
      broadcaster.schedule({ project: 'alpha', scope: 'plan' });
      vi.advanceTimersByTime(SSE_DEBOUNCE_MS - 1);
    }
    expect(state.chunks).toEqual([]);

    vi.advanceTimersByTime(SSE_MAX_WAIT_MS - 5 * (SSE_DEBOUNCE_MS - 1));
    expect(state.chunks).toEqual([
      'event: change\ndata: {"project":"alpha","scopes":["plan"]}\n\n',
    ]);
  });

  it('fail-opens to unattributed {} when any event in the window is unattributed', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'active' });
    broadcaster.schedule(undefined);
    vi.advanceTimersByTime(SSE_DEBOUNCE_MS);

    // The scoped payload is dropped too, not merged: an unattributable path may
    // have invalidated an endpoint the accumulated scopes would let a client skip.
    expect(state.chunks).toEqual(['event: change\ndata: {}\n\n']);
  });

  it('flush() writes immediately without waiting for the debounce timer', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'plan' });
    broadcaster.flush();

    expect(state.chunks).toEqual([
      'event: change\ndata: {"project":"alpha","scopes":["plan"]}\n\n',
    ]);
  });

  it('broadcasts to every registered SSE client', () => {
    const sseClients = new Set<ServerResponse>();
    const first = makeRes();
    const second = makeRes();
    sseClients.add(first.res);
    sseClients.add(second.res);
    const broadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });

    broadcaster.schedule({ project: 'alpha', scope: 'plan' });
    broadcaster.flush();

    const expected = 'event: change\ndata: {"project":"alpha","scopes":["plan"]}\n\n';
    expect(first.state.chunks).toEqual([expected]);
    expect(second.state.chunks).toEqual([expected]);
  });
});

describe('createHeartbeat', () => {
  it('writes a ping to every client on each tick after start()', () => {
    const sseClients = new Set<ServerResponse>();
    const first = makeRes();
    const second = makeRes();
    sseClients.add(first.res);
    sseClients.add(second.res);
    const heartbeat = createHeartbeat(sseClients, 30_000);

    heartbeat.start();
    vi.advanceTimersByTime(30_000);
    vi.advanceTimersByTime(30_000);

    expect(first.state.chunks).toEqual([': ping\n\n', ': ping\n\n']);
    expect(second.state.chunks).toEqual([': ping\n\n', ': ping\n\n']);
  });

  it('stop() clears the interval', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const heartbeat = createHeartbeat(sseClients, 30_000);

    heartbeat.start();
    heartbeat.stop();
    vi.advanceTimersByTime(30_000);

    expect(state.chunks).toEqual([]);
  });

  it('start() is idempotent — a second call does not schedule a duplicate interval', () => {
    const sseClients = new Set<ServerResponse>();
    const { res, state } = makeRes();
    sseClients.add(res);
    const heartbeat = createHeartbeat(sseClients, 30_000);

    heartbeat.start();
    heartbeat.start();
    vi.advanceTimersByTime(30_000);

    expect(state.chunks).toEqual([': ping\n\n']);
  });

  it('stop() before start() is a safe no-op', () => {
    const sseClients = new Set<ServerResponse>();
    const heartbeat = createHeartbeat(sseClients, 30_000);

    expect(() => heartbeat.stop()).not.toThrow();
  });
});

function tasknote(id: string, title: string): string {
  return `---
title: ${title}
status: completed
created: 2026-05-10
---

# ${id} | ${title}
`;
}
