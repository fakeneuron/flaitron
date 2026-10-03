import type { Priority, Task } from '../parser';
import type { Tasknote, TasknoteStatus } from '../tasknote';
import type { PaletteTokens } from './constants';

export function groupBy<T, K extends string | number>(
  items: T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keySelector(item);
    if (!Object.prototype.hasOwnProperty.call(groups, key)) {
      groups[key] = [];
    }
    groups[key].push(item);
  }
  return groups;
}

// PLAN.md wins on completion: if the row is `[x]` in PLAN.md, the row is
// authoritatively done regardless of frontmatter status. Phase 4 closure now
// asserts the `status: completed` flip (SPEC §"🚀 Phase 4: Closure"), but this
// fallback stays: adopters pinned to a pre-fix flaitron keep producing
// `in-progress` archives, and the oldest archives predate frontmatter entirely.
export function effectiveStatus(task: Task, tn: Tasknote | undefined): TasknoteStatus | null {
  if (task.completed) return 'completed';
  return tn?.frontmatter?.status ?? null;
}

// Display bucket for list/board grouping. Heading (`task.priority`) is
// provenance — where the row is filed. Checkbox overlay moves a top-level
// `[x]` into Completed even when the heading hasn't moved yet.
// Epic children are not grouped independently (`groupTasks` nests them).
export function displaySection(task: Task): Priority {
  return task.completed ? 'Completed' : task.priority;
}

// Version-currency of an adopter's pinned flaitron release vs the latest
// released tag. 'unknown' (no pinned version readable, or no tag resolved —
// e.g. the flaitron checkout itself) renders no dot: unknown ≠ stale.
type VersionCurrency = 'current' | 'behind' | 'unknown';

export function versionCurrency(
  version: string | null,
  latestRelease: string | null,
): VersionCurrency {
  if (!version || !latestRelease) return 'unknown';
  return version === latestRelease ? 'current' : 'behind';
}

// The three row kinds share one highlight → selection → neutral decision and
// differ only in which palette tokens it picks: subtask rows use the narrower
// ring-1 variants, epic rows a heavier neutral border.
type RowVariant = 'task' | 'epic' | 'subtask';

const ROW_OUTLINE_TOKENS: Record<RowVariant, (p: PaletteTokens) => [string, string, string]> = {
  task: (p) => [p.ROW_HIGHLIGHT, p.ROW_SELECTION, p.ROW_NEUTRAL],
  epic: (p) => [p.ROW_HIGHLIGHT, p.ROW_SELECTION, p.EPIC_ROW_NEUTRAL],
  subtask: (p) => [p.ROW_HIGHLIGHT_SUBTASK, p.ROW_SELECTION_SUBTASK, p.ROW_NEUTRAL_SUBTASK],
};

export function rowOutlineClass(
  palette: PaletteTokens,
  isHighlighted: boolean,
  isSelected: boolean,
  variant: RowVariant = 'task',
): string {
  const [highlight, selection, neutral] = ROW_OUTLINE_TOKENS[variant](palette);
  if (isHighlighted) return highlight;
  if (isSelected) return selection;
  return neutral;
}

// Caps the project chip row at `maxVisible`, pinning the active project into
// the visible set (swapping out the last slot) when it would otherwise fall
// into overflow — so switching projects never hides the one you're on.
export function visibleProjects(
  projects: string[],
  active: string | null,
  maxVisible: number,
): { visible: string[]; overflow: string[] } {
  if (projects.length <= maxVisible) return { visible: projects, overflow: [] };
  const activeIdx = active ? projects.indexOf(active) : -1;
  if (activeIdx >= maxVisible) {
    return {
      visible: [...projects.slice(0, maxVisible - 1), active as string],
      overflow: projects.filter((_, i) => i >= maxVisible - 1 && i !== activeIdx),
    };
  }
  return { visible: projects.slice(0, maxVisible), overflow: projects.slice(maxVisible) };
}

export function splitHighlight(
  text: string,
  query: string,
): Array<{ text: string; matched: boolean }> {
  const q = query.trim();
  if (!q) return [{ text, matched: false }];

  const lq = q.toLowerCase();
  const lt = text.toLowerCase();
  const segments: Array<{ text: string; matched: boolean }> = [];
  let cursor = 0;

  while (cursor < text.length) {
    const i = lt.indexOf(lq, cursor);
    if (i === -1) {
      segments.push({ text: text.slice(cursor), matched: false });
      break;
    }
    if (i > cursor) segments.push({ text: text.slice(cursor, i), matched: false });
    segments.push({ text: text.slice(i, i + lq.length), matched: true });
    cursor = i + lq.length;
  }

  return segments;
}
