import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act, waitFor, cleanup } from '@testing-library/react';
import { LIVE_RECOVERY_MS, useProjectData } from './useProjectData';

// The upgraded MockEventSource (src/test/setup.ts) records every instance and
// exposes emit(type). Reach the EventSource a hook mounted to drive its SSE
// branches. Tests clear the registry in beforeEach so the last instance is the
// current one. Index (not Array.at) — tsconfig lib is ES2020; @types/node 24
// no longer leaks ES2022 Array.at onto that lib.
interface MockES {
  url: string;
  readyState: number;
  emit(type: string, data?: string): void;
}
const esRegistry = () =>
  (globalThis.EventSource as unknown as { instances: MockES[] }).instances;
const latestES = () => {
  const all = esRegistry();
  return all[all.length - 1]!;
};

const planRes = (md: string) => ({ ok: true, status: 200, text: async () => md });
const jsonRes = (body: unknown) => ({ ok: true, status: 200, json: async () => body });

// `/api/plan-archive` also starts with `/api/plan`, so route checks
// compare the path exactly rather than by prefix — a prefix test would hand the
// archive fetch the PLAN.md mock.
const routeIs = (url: string, route: string) => url.split('?')[0] === route;

const planWith = (id: string) => `## Low\n\n- [ ] **${id}** | t — desc\n`;

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

beforeEach(() => {
  esRegistry().length = 0;
});

describe('useProjectData — same-project load race', () => {
  it('ignores a stale same-project load that resolves after a newer one', async () => {
    // Gate every load generation so the test controls resolution order. A new
    // generation begins on each /api/plan fetch; the other three reuse it.
    const gates = new Map<number, Promise<void>>();
    const releases = new Map<number, () => void>();
    const planTextByGen = new Map<number, string>();
    let currentGen = 0;
    const ensureGate = (gen: number) => {
      if (gates.has(gen)) return;
      gates.set(
        gen,
        new Promise<void>((resolve) => releases.set(gen, resolve)),
      );
    };

    const fetchMock = vi.fn((url: string) => {
      if (routeIs(url, '/api/plan')) {
        currentGen++;
        ensureGate(currentGen);
      }
      const gen = currentGen;
      return gates.get(gen)!.then(() => {
        if (routeIs(url, '/api/plan')) return planRes(planTextByGen.get(gen) ?? '');
        if (routeIs(url, '/api/plan-archive')) return planRes('');
        return jsonRes([]);
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    planTextByGen.set(1, planWith('FE-1')); // initial mount
    planTextByGen.set(2, planWith('FE-2')); // older refresh
    planTextByGen.set(3, planWith('FE-3')); // newer refresh

    const { result } = renderHook(() => useProjectData('p1'));

    // Let the initial load (gen 1) settle.
    await act(async () => {
      releases.get(1)!();
    });
    await waitFor(() => expect(result.current.tasks[0]?.id).toBe('FE-1'));

    // Fire two same-project refreshes: gen 2 (older) then gen 3 (newer).
    act(() => {
      result.current.refresh();
      result.current.refresh();
    });

    // Newer resolves first, older resolves last — the classic overwrite race.
    await act(async () => {
      releases.get(3)!();
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => expect(result.current.tasks[0]?.id).toBe('FE-3'));

    await act(async () => {
      releases.get(2)!();
      await new Promise((r) => setTimeout(r, 0));
    });

    // The stale gen-2 response must NOT overwrite the newer gen-3 data.
    expect(result.current.tasks[0]?.id).toBe('FE-3');
  });
});

describe('useProjectData — SSE branches', () => {
  let currentPlan: string;
  let currentArchive: string;

  const mountWithLivePlan = () => {
    currentPlan = planWith('FE-1');
    currentArchive = '';
    const fetchMock = vi.fn((url: string) => {
      if (routeIs(url, '/api/plan')) return Promise.resolve(planRes(currentPlan));
      if (routeIs(url, '/api/plan-archive')) return Promise.resolve(planRes(currentArchive));
      return Promise.resolve(jsonRes([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    const hook = renderHook(() => useProjectData('p1'));
    return { hook, fetchMock };
  };

  it('refreshes on a "change" event', async () => {
    const { hook } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

    currentPlan = planWith('FE-2');
    await act(async () => {
      latestES().emit('change');
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-2'));
  });

  it('refreshes on an unattributed {} payload', async () => {
    const { hook } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

    currentPlan = planWith('FE-2');
    await act(async () => {
      latestES().emit('change', '{}');
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-2'));
  });

  it('reconciles on reconnect: "error" then "open" triggers a refresh', async () => {
    const { hook } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

    currentPlan = planWith('FE-2');

    // A drop alone must not refresh — it only flags droppedSinceOpen.
    await act(async () => {
      latestES().emit('error');
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(hook.result.current.tasks[0]?.id).toBe('FE-1');

    // The following reconnect reconciles the change missed during the gap.
    await act(async () => {
      latestES().emit('open');
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-2'));
  });

  it('does not refresh on the first "open" (no prior drop)', async () => {
    const { hook, fetchMock } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

    const callsAfterLoad = fetchMock.mock.calls.length;
    currentPlan = planWith('FE-2');

    await act(async () => {
      latestES().emit('open');
      await new Promise((r) => setTimeout(r, 0));
    });

    // No prior drop → no redundant refresh: no new fetches, tasks unchanged.
    expect(fetchMock.mock.calls.length).toBe(callsAfterLoad);
    expect(hook.result.current.tasks[0]?.id).toBe('FE-1');
  });

  it('flags liveDisconnected on a drop and clears it on reconnect', async () => {
    const { hook } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));
    expect(hook.result.current.liveDisconnected).toBe(false);

    await act(async () => {
      latestES().emit('error');
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(hook.result.current.liveDisconnected).toBe(true);

    await act(async () => {
      latestES().emit('open');
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(hook.result.current.liveDisconnected).toBe(false);
  });

  it('polls while disconnected so the board keeps updating', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const { hook, fetchMock } = mountWithLivePlan();
      await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

      // Mid-stream drop: the browser is retrying on its own (CONNECTING), so
      // the poll must carry the board until it succeeds.
      latestES().readyState = 0;
      await act(async () => {
        latestES().emit('error');
        await new Promise((r) => setTimeout(r, 0));
      });

      const callsAfterDrop = fetchMock.mock.calls.length;
      currentPlan = planWith('FE-2');
      await act(async () => {
        await vi.advanceTimersByTimeAsync(LIVE_RECOVERY_MS);
      });

      expect(fetchMock.mock.calls.length).toBeGreaterThan(callsAfterDrop);
      await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-2'));
      // Still CONNECTING — no second socket racing the browser's own retry.
      expect(esRegistry().length).toBe(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('reopens the stream when the handshake was rejected (readyState CLOSED)', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const { hook } = mountWithLivePlan();
      await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

      // The 503-capacity shape: the browser fails the connection outright and
      // will never retry, so recovery has to construct a new EventSource.
      latestES().readyState = 2;
      await act(async () => {
        latestES().emit('error');
        await new Promise((r) => setTimeout(r, 0));
      });
      expect(esRegistry().length).toBe(1);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(LIVE_RECOVERY_MS);
      });
      expect(esRegistry().length).toBe(2);

      // A slot freed up: the fresh socket opens and live updates resume.
      await act(async () => {
        latestES().emit('open');
        await new Promise((r) => setTimeout(r, 0));
      });
      expect(hook.result.current.liveDisconnected).toBe(false);

      // Recovery stopped — no further sockets once live again.
      await act(async () => {
        await vi.advanceTimersByTimeAsync(LIVE_RECOVERY_MS * 2);
      });
      expect(esRegistry().length).toBe(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('ignores a change attributed to a different project', async () => {
    const { hook, fetchMock } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

    const callsAfterLoad = fetchMock.mock.calls.length;
    currentPlan = planWith('FE-2');

    await act(async () => {
      latestES().emit('change', '{"project":"other"}');
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(fetchMock.mock.calls.length).toBe(callsAfterLoad);
    expect(hook.result.current.tasks[0]?.id).toBe('FE-1');
  });

  it('refreshes on a change attributed to the active project', async () => {
    const { hook } = mountWithLivePlan();
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-1'));

    currentPlan = planWith('FE-2');
    await act(async () => {
      latestES().emit('change', '{"project":"p1"}');
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => expect(hook.result.current.tasks[0]?.id).toBe('FE-2'));
  });
});

// An attributed change carries the scopes its watched path can have
// invalidated, so the board fetches one endpoint instead of four. Everything
// that cannot be attributed to a scope still fetches all four.
describe('useProjectData — scoped refetch', () => {
  const ALL = [
    '/api/plan?project=p1',
    '/api/plan-archive?project=p1',
    '/api/active?project=p1',
    '/api/archive?project=p1',
  ];

  const mountScoped = () => {
    const fetchMock = vi.fn((url: string) => {
      if (routeIs(url, '/api/plan')) return Promise.resolve(planRes(planWith('FE-1')));
      if (routeIs(url, '/api/plan-archive')) return Promise.resolve(planRes(''));
      return Promise.resolve(jsonRes([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    return { hook: renderHook(() => useProjectData('p1')), fetchMock };
  };

  // Fetches made after the initial load settled.
  const since = (fetchMock: ReturnType<typeof vi.fn>, from: number) =>
    fetchMock.mock.calls.slice(from).map((c) => c[0] as string);

  const emitAndSettle = async (payload: string) => {
    await act(async () => {
      latestES().emit('change', payload);
      await new Promise((r) => setTimeout(r, 0));
    });
  };

  it('fetches only /api/archive for an archive-scoped change', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{"project":"p1","scopes":["archive"]}');

    expect(since(fetchMock, after)).toEqual(['/api/archive?project=p1']);
  });

  it('fetches only /api/active for an active-scoped change', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{"project":"p1","scopes":["active"]}');

    expect(since(fetchMock, after)).toEqual(['/api/active?project=p1']);
  });

  // PLAN-ARCHIVE.md is unwatched: rotation always edits PLAN.md in the
  // same motion, so the plan scope has to carry both or rotated history staleds.
  it('fetches both plan endpoints for a plan-scoped change', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{"project":"p1","scopes":["plan"]}');

    expect(since(fetchMock, after)).toEqual([
      '/api/plan?project=p1',
      '/api/plan-archive?project=p1',
    ]);
  });

  it('fetches the union when a window coalesced two scopes', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{"project":"p1","scopes":["active","archive"]}');

    expect(since(fetchMock, after)).toEqual([
      '/api/active?project=p1',
      '/api/archive?project=p1',
    ]);
  });

  it('fails open to all four on an unattributed payload', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{}');

    expect(since(fetchMock, after)).toEqual(ALL);
  });

  it('fails open to all four when the payload carries no scopes (older server)', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{"project":"p1"}');

    expect(since(fetchMock, after)).toEqual(ALL);
  });

  it('fails open to all four on a scope value it does not recognize', async () => {
    const { hook, fetchMock } = mountScoped();
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    const after = fetchMock.mock.calls.length;

    await emitAndSettle('{"project":"p1","scopes":["sidequest"]}');

    expect(since(fetchMock, after)).toEqual(ALL);
  });

  it('keeps reconnect-after-drop and the degraded poll unscoped', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const { hook, fetchMock } = mountScoped();
      await waitFor(() => expect(hook.result.current.loading).toBe(false));

      latestES().readyState = 0;
      await act(async () => {
        latestES().emit('error');
        await new Promise((r) => setTimeout(r, 0));
      });

      // The 5s poll fires precisely when the stream is down — no event to scope
      // it by, so it must stay a full refetch.
      const beforePoll = fetchMock.mock.calls.length;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(LIVE_RECOVERY_MS);
      });
      expect(since(fetchMock, beforePoll)).toEqual(ALL);

      // Reconnect reconciles a gap whose contents are unknowable.
      const beforeOpen = fetchMock.mock.calls.length;
      await act(async () => {
        latestES().emit('open');
        await new Promise((r) => setTimeout(r, 0));
      });
      expect(since(fetchMock, beforeOpen)).toEqual(ALL);
    } finally {
      vi.useRealTimers();
    }
  });

  // The archived slice must survive an active-only refetch, and a tasknote that
  // left /api/active must actually disappear — the two halves a single merged
  // map updated in place could not both express.
  it('replaces the active slice without dropping archived notes', async () => {
    const note = (id: string) => ({ id, path: `${id}.md`, frontmatter: { title: id } });
    let active: unknown[] = [note('FE-A')];
    const fetchMock = vi.fn((url: string) => {
      if (routeIs(url, '/api/plan')) return Promise.resolve(planRes(planWith('FE-1')));
      if (routeIs(url, '/api/plan-archive')) return Promise.resolve(planRes(''));
      if (routeIs(url, '/api/active')) return Promise.resolve(jsonRes(active));
      return Promise.resolve(jsonRes([note('FE-Z')]));
    });
    vi.stubGlobal('fetch', fetchMock);
    const hook = renderHook(() => useProjectData('p1'));

    await waitFor(() =>
      expect([...hook.result.current.tasknotesById.keys()].sort()).toEqual(['FE-A', 'FE-Z']),
    );

    // FE-A is archived: it leaves /api/active, and only the active slice refetches.
    active = [];
    await emitAndSettle('{"project":"p1","scopes":["active"]}');

    await waitFor(() =>
      expect([...hook.result.current.tasknotesById.keys()]).toEqual(['FE-Z']),
    );
  });

  // One counter would be safe only if every load were complete. With partial
  // loads a later narrow load must not discard an in-flight broader one's
  // other slices.
  it('does not let a later archive-scoped load discard an in-flight active slice', async () => {
    const note = (id: string) => ({ id, path: `${id}.md`, frontmatter: { title: id } });
    let releaseActive!: () => void;
    const activeGate = new Promise<void>((r) => {
      releaseActive = r;
    });
    let activeCalls = 0;

    const fetchMock = vi.fn((url: string) => {
      if (routeIs(url, '/api/plan')) return Promise.resolve(planRes(planWith('FE-1')));
      if (routeIs(url, '/api/plan-archive')) return Promise.resolve(planRes(''));
      if (routeIs(url, '/api/active')) {
        activeCalls++;
        // Stall only the refresh's active fetch, not the initial load's.
        if (activeCalls === 2) return activeGate.then(() => jsonRes([note('FE-A')]));
        return Promise.resolve(jsonRes([]));
      }
      return Promise.resolve(jsonRes([note('FE-Z')]));
    });
    vi.stubGlobal('fetch', fetchMock);
    const hook = renderHook(() => useProjectData('p1'));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    // Active-scoped change lands first but resolves last.
    await emitAndSettle('{"project":"p1","scopes":["active"]}');
    // An archive-scoped change overtakes it and settles.
    await emitAndSettle('{"project":"p1","scopes":["archive"]}');

    await act(async () => {
      releaseActive();
      await new Promise((r) => setTimeout(r, 0));
    });

    // The active response is still the newest for its own scope, so it commits.
    await waitFor(() =>
      expect([...hook.result.current.tasknotesById.keys()].sort()).toEqual(['FE-A', 'FE-Z']),
    );
  });
});

// Rotated `## Completed` history reaches the board through a fourth
// fetch that is never allowed to break it.
describe('useProjectData — rotated PLAN-ARCHIVE.md', () => {
  const mountWith = (plan: string, archive: unknown) => {
    const fetchMock = vi.fn((url: string) => {
      if (routeIs(url, '/api/plan')) return Promise.resolve(planRes(plan));
      if (routeIs(url, '/api/plan-archive')) return Promise.resolve(archive);
      return Promise.resolve(jsonRes([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    return { hook: renderHook(() => useProjectData('p1')), fetchMock };
  };

  it('concatenates archive rows after PLAN.md rows', async () => {
    const { hook } = mountWith(
      planWith('FE-1'),
      planRes('## Completed 2026-07\n\n- [x] **FE-0** — Completed 2026-07-14.\n'),
    );

    await waitFor(() => expect(hook.result.current.tasks.map((t) => t.id)).toEqual(['FE-1', 'FE-0']));
    expect(hook.result.current.tasks[1].priority).toBe('Completed');
  });

  it('requests the archive alongside the other three endpoints', async () => {
    const { hook, fetchMock } = mountWith(planWith('FE-1'), planRes(''));

    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(fetchMock.mock.calls.map((c) => c[0])).toEqual([
      '/api/plan?project=p1',
      '/api/plan-archive?project=p1',
      '/api/active?project=p1',
      '/api/archive?project=p1',
    ]);
  });

  it('renders the board from PLAN.md alone when the archive fetch fails', async () => {
    const { hook } = mountWith(planWith('FE-1'), { ok: false, status: 500 });

    await waitFor(() => expect(hook.result.current.tasks.map((t) => t.id)).toEqual(['FE-1']));
    expect(hook.result.current.error).toBeNull();
  });
});

// The load error is tracked per scope: a refresh clears only the errors of the
// scopes it re-fetched, so a scoped refresh cannot wipe a still-current error
// that belongs to a scope it never touched.
describe('useProjectData — per-scope error', () => {
  const mountFailing = (failing: Set<string>) => {
    const fetchMock = vi.fn((url: string) => {
      const route = url.split('?')[0]!;
      if (failing.has(route)) return Promise.resolve({ ok: false, status: 500 });
      if (routeIs(url, '/api/plan')) return Promise.resolve(planRes(planWith('FE-1')));
      if (routeIs(url, '/api/plan-archive')) return Promise.resolve(planRes(''));
      return Promise.resolve(jsonRes([]));
    });
    vi.stubGlobal('fetch', fetchMock);
    return renderHook(() => useProjectData('p1'));
  };

  const refreshAndSettle = async (
    hook: ReturnType<typeof mountFailing>,
    scopes?: Parameters<ReturnType<typeof mountFailing>['result']['current']['refresh']>[0],
  ) => {
    await act(async () => {
      hook.result.current.refresh(scopes);
      await new Promise((r) => setTimeout(r, 0));
    });
  };

  it('keeps a PLAN.md error across a successful active-scoped refresh', async () => {
    const failing = new Set(['/api/plan']);
    const hook = mountFailing(failing);
    await waitFor(() => expect(hook.result.current.error).toBe('PLAN.md fetch failed: HTTP 500'));

    await refreshAndSettle(hook, ['active']);
    expect(hook.result.current.error).toBe('PLAN.md fetch failed: HTTP 500');
  });

  it('keeps a tasknote-list error across a successful plan-scoped refresh', async () => {
    const failing = new Set(['/api/active']);
    const hook = mountFailing(failing);
    await waitFor(() => expect(hook.result.current.error).toBe('Tasknote list failed: HTTP 500'));

    await refreshAndSettle(hook, ['plan']);
    expect(hook.result.current.error).toBe('Tasknote list failed: HTTP 500');
  });

  it('clears a scope\'s own error when that scope refreshes successfully', async () => {
    const failing = new Set(['/api/plan']);
    const hook = mountFailing(failing);
    await waitFor(() => expect(hook.result.current.error).toBe('PLAN.md fetch failed: HTTP 500'));

    failing.clear();
    await refreshAndSettle(hook, ['plan']);
    expect(hook.result.current.error).toBeNull();
  });

  it('clears every scope\'s error on an unscoped refresh', async () => {
    const failing = new Set(['/api/plan']);
    const hook = mountFailing(failing);
    await waitFor(() => expect(hook.result.current.error).not.toBeNull());

    failing.clear();
    await refreshAndSettle(hook);
    expect(hook.result.current.error).toBeNull();
  });

  it('exposes the first standing error in plan, active, archive order', async () => {
    const failing = new Set(['/api/active']);
    const hook = mountFailing(failing);
    await waitFor(() => expect(hook.result.current.error).toBe('Tasknote list failed: HTTP 500'));

    // An archive-scoped failure lands beside the active one; active still wins.
    failing.add('/api/archive');
    await refreshAndSettle(hook, ['archive']);
    expect(hook.result.current.error).toBe('Tasknote list failed: HTTP 500');

    // Once active recovers, the archive error surfaces.
    failing.delete('/api/active');
    await refreshAndSettle(hook, ['active']);
    expect(hook.result.current.error).toBe('Archive list failed: HTTP 500');
  });

  it('keeps both errors when two scopes fail in the same load', async () => {
    const failing = new Set(['/api/plan', '/api/active']);
    const hook = mountFailing(failing);
    await waitFor(() => expect(hook.result.current.error).toBe('PLAN.md fetch failed: HTTP 500'));

    // Plan recovers; the active failure from that same first load still stands.
    failing.delete('/api/plan');
    await refreshAndSettle(hook, ['plan']);
    expect(hook.result.current.error).toBe('Tasknote list failed: HTTP 500');
  });

  it('commits the healthy slices when another scope fails in the same load', async () => {
    const hook = mountFailing(new Set(['/api/active']));
    await waitFor(() => expect(hook.result.current.error).toBe('Tasknote list failed: HTTP 500'));

    expect(hook.result.current.tasks.map((t) => t.id)).toEqual(['FE-1']);
  });

  it('clears standing load errors on reset()', async () => {
    const hook = mountFailing(new Set(['/api/plan']));
    await waitFor(() => expect(hook.result.current.error).toBe('PLAN.md fetch failed: HTTP 500'));

    act(() => hook.result.current.reset());
    expect(hook.result.current.error).toBeNull();
  });

  it('drops a failure from a project the hook has already switched away from', async () => {
    let rejectP1!: (e: Error) => void;
    // Every p1 fetch hangs on one shared promise, so a single rejection fails
    // the whole load after the switch.
    const hung = new Promise<never>((_, reject) => {
      rejectP1 = reject;
    });
    vi.stubGlobal('fetch', vi.fn(() => hung));

    // Switch to no project at all: no newer load stamps a seq, so only the
    // activeProjectRef guard stands between p1's failure and the error state.
    const { result, rerender } = renderHook(
      ({ p }: { p: string | null }) => useProjectData(p),
      { initialProps: { p: 'p1' as string | null } },
    );
    rerender({ p: null });

    await act(async () => {
      rejectP1(new Error('network down'));
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(result.current.error).toBeNull();
  });
});
