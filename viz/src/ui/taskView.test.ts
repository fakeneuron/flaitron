import { describe, expect, it } from 'vitest';
import type { Priority, Task, TaskNode } from '../parser';
import type { Tasknote, TasknoteFrontmatter, TasknoteStatus } from '../tasknote';
import {
  collectEpicIds,
  collectVisibleIds,
  countFiltered,
  countInProgress,
  countStarters,
  emptySections,
  groupBySection,
  isReady,
  matchesFilter,
  pruneMatchingNodes,
} from './taskView';

const SECTIONS: Priority[] = ['High', 'Medium', 'Low', 'Future Opportunities', 'Completed'];

const task = (overrides: Partial<Task> = {}): Task => ({
  id: 'CORE-1',
  description: 'x',
  priority: 'Medium',
  critical: false,
  unattended: false,
  handoff: false,
  completed: false,
  relatedTasks: [],
  blockedBy: [],
  ...overrides,
});

const node = (t: Task, children: Task[] = []): TaskNode => ({ task: t, children });

const tasknote = (overrides: Partial<TasknoteFrontmatter> = {}): Tasknote =>
  ({ frontmatter: { status: 'in-progress', ...overrides } }) as Tasknote;

const notes = (entries: Record<string, Tasknote>): Map<string, Tasknote> =>
  new Map(Object.entries(entries));

const NO_STATUS = new Set<TasknoteStatus>();

describe('matchesFilter', () => {
  it('keeps everything when there is no query and no status filter', () => {
    expect(matchesFilter(task(), notes({}), '', NO_STATUS)).toBe(true);
    expect(matchesFilter(task(), notes({}), '   ', NO_STATUS)).toBe(true);
  });

  it('matches case-insensitively across id, shortname, description, and frontmatter', () => {
    const t = task({ id: 'FE-94', shortname: 'app-decompose', description: 'Split the view' });
    const tn = notes({ 'FE-94': tasknote({ status: 'in-progress', title: 'Lift selectors' }) });

    expect(matchesFilter(t, tn, 'fe-94', NO_STATUS)).toBe(true);
    expect(matchesFilter(t, tn, 'DECOMPOSE', NO_STATUS)).toBe(true);
    expect(matchesFilter(t, tn, 'view', NO_STATUS)).toBe(true);
    expect(matchesFilter(t, tn, 'lift selectors', NO_STATUS)).toBe(true);
    expect(matchesFilter(t, tn, 'in-progress', NO_STATUS)).toBe(true);
    expect(matchesFilter(t, tn, 'nowhere', NO_STATUS)).toBe(false);
  });

  it('does not search frontmatter fields when the task has no tasknote', () => {
    expect(matchesFilter(task({ id: 'CORE-9' }), notes({}), 'in-progress', NO_STATUS)).toBe(false);
  });

  it('treats a task with no tasknote as not-started for the status filter', () => {
    const t = task({ id: 'CORE-9' });
    expect(matchesFilter(t, notes({}), '', new Set<TasknoteStatus>(['not-started']))).toBe(true);
    expect(matchesFilter(t, notes({}), '', new Set<TasknoteStatus>(['in-progress']))).toBe(false);
  });

  it('lets a PLAN.md [x] row override frontmatter status (effectiveStatus)', () => {
    const t = task({ id: 'CORE-9', completed: true });
    const tn = notes({ 'CORE-9': tasknote({ status: 'in-progress' }) });
    expect(matchesFilter(t, tn, '', new Set<TasknoteStatus>(['completed']))).toBe(true);
    expect(matchesFilter(t, tn, '', new Set<TasknoteStatus>(['in-progress']))).toBe(false);
  });

  it('requires both the status filter and the query to pass', () => {
    const t = task({ id: 'CORE-9', description: 'parser work' });
    const tn = notes({ 'CORE-9': tasknote({ status: 'in-progress' }) });
    const inProgress = new Set<TasknoteStatus>(['in-progress']);
    expect(matchesFilter(t, tn, 'parser', inProgress)).toBe(true);
    expect(matchesFilter(t, tn, 'parser', new Set<TasknoteStatus>(['blocked']))).toBe(false);
    expect(matchesFilter(t, tn, 'unrelated', inProgress)).toBe(false);
  });
});

const byId = (...tasks: Task[]): Map<string, Task> => new Map(tasks.map((t) => [t.id, t]));

describe('isReady', () => {
  it('is ready when open with no blockers', () => {
    const t = task({ id: 'FE-1', blockedBy: [] });
    expect(isReady(t, byId(t), notes({}))).toBe(true);
  });

  it('is not ready when the task itself is completed', () => {
    const t = task({ id: 'FE-1', completed: true, blockedBy: [] });
    expect(isReady(t, byId(t), notes({}))).toBe(false);
  });

  it('is ready when every PLAN.md blocker is completed', () => {
    const blocker = task({ id: 'FE-2', completed: true });
    const t = task({ id: 'FE-1', blockedBy: ['FE-2'] });
    expect(isReady(t, byId(t, blocker), notes({}))).toBe(true);
  });

  it('is not ready when a PLAN.md blocker is still open', () => {
    const blocker = task({ id: 'FE-2', completed: false });
    const t = task({ id: 'FE-1', blockedBy: ['FE-2'] });
    expect(isReady(t, byId(t, blocker), notes({}))).toBe(false);
  });

  it('is not ready when a blocker id resolves to no known task', () => {
    const t = task({ id: 'FE-1', blockedBy: ['FE-999'] });
    expect(isReady(t, byId(t), notes({}))).toBe(false);
  });

  it('also considers the tasknote frontmatter blocked-by targets, unioned with PLAN.md blockedBy', () => {
    const planBlocker = task({ id: 'FE-2', completed: true });
    const fmBlocker = task({ id: 'FE-3', completed: false });
    const t = task({ id: 'FE-1', blockedBy: ['FE-2'] });
    const tn = notes({ 'FE-1': tasknote({ blockedBy: ['FE-3'] }) });
    expect(isReady(t, byId(t, planBlocker, fmBlocker), tn)).toBe(false);

    const fmBlockerClosed = task({ id: 'FE-3', completed: true });
    expect(isReady(t, byId(t, planBlocker, fmBlockerClosed), tn)).toBe(true);
  });

  it('lets a completed PLAN.md [x] blocker override an in-progress frontmatter status (effectiveStatus)', () => {
    const blocker = task({ id: 'FE-2', completed: true });
    const blockerTn = notes({ 'FE-2': tasknote({ status: 'in-progress' }) });
    const t = task({ id: 'FE-1', blockedBy: ['FE-2'] });
    expect(isReady(t, byId(t, blocker), blockerTn)).toBe(true);
  });
});

describe('pruneMatchingNodes', () => {
  const parent = task({ id: 'FE-EPIC-1', description: 'epic' });
  const kid1 = task({ id: 'FE-1.2', description: 'alpha' });
  const kid2 = task({ id: 'FE-1.3', description: 'beta' });

  it('keeps a non-matching parent when a child matches, and prunes the siblings', () => {
    const out = pruneMatchingNodes([node(parent, [kid1, kid2])], (t) => t.description === 'alpha');
    expect(out).toHaveLength(1);
    expect(out[0]!.task.id).toBe('FE-EPIC-1');
    expect(out[0]!.children.map((c) => c.id)).toEqual(['FE-1.2']);
  });

  it('prunes every child when the parent matches but no child does', () => {
    const out = pruneMatchingNodes([node(parent, [kid1, kid2])], (t) => t.id === 'FE-EPIC-1');
    expect(out[0]!.children).toEqual([]);
  });

  it('drops a node when neither it nor any child matches', () => {
    expect(pruneMatchingNodes([node(parent, [kid1, kid2])], () => false)).toEqual([]);
  });

  it('preserves source order and leaves the input untouched', () => {
    const a = node(task({ id: 'A' }));
    const b = node(parent, [kid1, kid2]);
    const out = pruneMatchingNodes([a, b], () => true);
    expect(out.map((n) => n.task.id)).toEqual(['A', 'FE-EPIC-1']);
    expect(b.children).toHaveLength(2);
  });

  // React.memo(EpicRow) only bails when its `node` prop is
  // referentially stable — a fresh object/array on every call (regardless of
  // whether anything was actually filtered) would make the memo a no-op.
  it('reuses the input node and children references when nothing is filtered out', () => {
    const a = node(task({ id: 'A' }));
    const b = node(parent, [kid1, kid2]);
    const out = pruneMatchingNodes([a, b], () => true);
    expect(out[0]).toBe(a);
    expect(out[1]).toBe(b);
    expect(out[1]!.children).toBe(b.children);
  });

  it('allocates a fresh node, but still reuses the children reference, when only the parent itself does not match', () => {
    const b = node(parent, [kid1, kid2]);
    const out = pruneMatchingNodes([b], (t) => t.id !== parent.id);
    expect(out[0]).not.toBe(b);
    expect(out[0]!.children).toBe(b.children);
  });

  it('allocates a fresh children array when filtering actually removes a child', () => {
    const b = node(parent, [kid1, kid2]);
    const out = pruneMatchingNodes([b], (t) => t.id !== kid2.id);
    expect(out[0]).not.toBe(b);
    expect(out[0]!.children).not.toBe(b.children);
    expect(out[0]!.children.map((c) => c.id)).toEqual(['FE-1.2']);
  });
});

describe('groupBySection', () => {
  it('groups by display section, moving checked rows to Completed', () => {
    const grouped = groupBySection([
      node(task({ id: 'A', priority: 'High' })),
      node(task({ id: 'B', priority: 'Low' })),
      node(task({ id: 'C', priority: 'High', completed: true })),
    ]);
    expect(grouped.High.map((n) => n.task.id)).toEqual(['A']);
    expect(grouped.Low.map((n) => n.task.id)).toEqual(['B']);
    expect(grouped.Completed.map((n) => n.task.id)).toEqual(['C']);
  });

  it('floats critical rows to the top of High with a stable sort', () => {
    const grouped = groupBySection([
      node(task({ id: 'A', priority: 'High' })),
      node(task({ id: 'B', priority: 'High', critical: true })),
      node(task({ id: 'C', priority: 'High' })),
      node(task({ id: 'D', priority: 'High', critical: true })),
    ]);
    expect(grouped.High.map((n) => n.task.id)).toEqual(['B', 'D', 'A', 'C']);
  });

  it('leaves other sections unsorted', () => {
    const grouped = groupBySection([
      node(task({ id: 'A', priority: 'Medium' })),
      node(task({ id: 'B', priority: 'Medium', critical: true })),
    ]);
    expect(grouped.Medium.map((n) => n.task.id)).toEqual(['A', 'B']);
  });

  it('skips the sort for a single High row', () => {
    const grouped = groupBySection([node(task({ id: 'A', priority: 'High', critical: true }))]);
    expect(grouped.High.map((n) => n.task.id)).toEqual(['A']);
  });
});

describe('emptySections', () => {
  it('returns the sections with no nodes, in the caller-supplied order', () => {
    const grouped = groupBySection([node(task({ id: 'A', priority: 'Medium' }))]);
    expect(emptySections(SECTIONS, grouped)).toEqual([
      'High',
      'Low',
      'Future Opportunities',
      'Completed',
    ]);
  });

  it('returns every section when nothing is grouped', () => {
    expect(emptySections(SECTIONS, groupBySection([]))).toEqual(SECTIONS);
  });
});

describe('collectEpicIds', () => {
  it('collects nodes with children and bare EPIC ids, but not plain tasks', () => {
    const ids = collectEpicIds([
      node(task({ id: 'FE-EPIC-1' }), [task({ id: 'FE-1.2' })]),
      node(task({ id: 'FE-EPIC-2' })),
      node(task({ id: 'CORE-3' })),
    ]);
    expect([...ids]).toEqual(['FE-EPIC-1', 'FE-EPIC-2']);
  });
});

describe('collectVisibleIds', () => {
  const grouped = groupBySection([
    node(task({ id: 'FE-EPIC-1', priority: 'High' }), [
      task({ id: 'FE-1.2', priority: 'High' }),
      task({ id: 'FE-1.3', priority: 'High' }),
    ]),
    node(task({ id: 'CORE-2', priority: 'Medium' })),
    node(task({ id: 'CORE-3', priority: 'Low' })),
  ]);

  it('walks sections in the supplied order, epic children excluded when collapsed', () => {
    expect(collectVisibleIds(SECTIONS, grouped, new Set(), new Set())).toEqual([
      'FE-EPIC-1',
      'CORE-2',
      'CORE-3',
    ]);
  });

  it('splices an expanded epic’s children in directly after the parent', () => {
    expect(collectVisibleIds(SECTIONS, grouped, new Set(), new Set(['FE-EPIC-1']))).toEqual([
      'FE-EPIC-1',
      'FE-1.2',
      'FE-1.3',
      'CORE-2',
      'CORE-3',
    ]);
  });

  it('skips collapsed sections entirely, expanded epics included', () => {
    expect(
      collectVisibleIds(SECTIONS, grouped, new Set<Priority>(['High']), new Set(['FE-EPIC-1'])),
    ).toEqual(['CORE-2', 'CORE-3']);
  });

  it('follows the caller’s section order rather than a fixed one', () => {
    const reversed: Priority[] = ['Low', 'Medium', 'High'];
    expect(collectVisibleIds(reversed, grouped, new Set(), new Set())).toEqual([
      'CORE-3',
      'CORE-2',
      'FE-EPIC-1',
    ]);
  });
});

describe('countFiltered', () => {
  it('counts each node plus its retained children', () => {
    expect(
      countFiltered([
        node(task({ id: 'FE-EPIC-1' }), [task({ id: 'FE-1.2' }), task({ id: 'FE-1.3' })]),
        node(task({ id: 'CORE-2' })),
      ]),
    ).toBe(4);
  });

  it('is zero for an empty tree', () => {
    expect(countFiltered([])).toBe(0);
  });

  it('agrees with the pruned tree after filtering', () => {
    const nodes = [node(task({ id: 'FE-EPIC-1', description: 'x' }), [
      task({ id: 'FE-1.2', description: 'alpha' }),
      task({ id: 'FE-1.3', description: 'beta' }),
    ])];
    expect(countFiltered(pruneMatchingNodes(nodes, (t) => t.description !== 'beta'))).toBe(2);
  });
});

describe('countInProgress', () => {
  it('counts frontmatter in-progress rows', () => {
    const tasks = [task({ id: 'A' }), task({ id: 'B' }), task({ id: 'C' })];
    const tn = notes({
      A: tasknote({ status: 'in-progress' }),
      B: tasknote({ status: 'blocked' }),
    });
    expect(countInProgress(tasks, tn)).toBe(1);
  });

  it('never counts a PLAN.md [x] row, even with in-progress frontmatter', () => {
    const tasks = [task({ id: 'A', completed: true })];
    expect(countInProgress(tasks, notes({ A: tasknote({ status: 'in-progress' }) }))).toBe(0);
  });

  it('falls back to has-a-tasknote-and-unchecked when frontmatter carries no status', () => {
    const tasks = [task({ id: 'A' }), task({ id: 'B' })];
    const tn = new Map<string, Tasknote>([['A', { frontmatter: null } as Tasknote]]);
    expect(countInProgress(tasks, tn)).toBe(1);
  });
});

describe('countStarters', () => {
  it('counts only rows whose tasknote frontmatter is status: starter', () => {
    const tasks = [task({ id: 'A' }), task({ id: 'B' }), task({ id: 'C' })];
    const tn = notes({ A: tasknote({ status: 'starter' }), B: tasknote({ status: 'in-progress' }) });
    expect(countStarters(tasks, tn)).toBe(1);
  });

  it('is zero when no tasknote is a starter', () => {
    expect(countStarters([task({ id: 'A' })], notes({}))).toBe(0);
  });
});
