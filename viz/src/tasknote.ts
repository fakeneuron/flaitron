import { fenceMask } from './fence.ts';

export type TasknoteStatus = 'starter' | 'not-started' | 'in-progress' | 'blocked' | 'completed';

export interface TasknoteFrontmatter {
  title: string;
  status: TasknoteStatus;
  tags: string[];
  created: string;
  due?: string;
  relatedTasks: string[];
  /** Omit-when-absent planning keys (SPEC.md §Tasknote frontmatter). */
  touches?: string[];
  blockedBy?: string[];
  parallelSafeWith?: string[];
  supersedes?: string[];
}

export interface ChecklistCounts {
  total: number;
  done: number;
}

export interface ClosureDrift {
  unticked: number;
  total: number;
}

export type StarterSubsectionKey = 'whyExists' | 'solutionShape' | 'filesToTouch' | 'outOfScope';

type StarterSubsections = Record<StarterSubsectionKey, string>;

export interface Tasknote {
  id: string;
  path: string;
  frontmatter: TasknoteFrontmatter | null;
  goal: string;
  acceptance: string;
  subtasks: string;
  starterContext: string;
  starterSubsections: StarterSubsections;
  subtasksProgress: ChecklistCounts;
  phases: ChecklistCounts[];
  closureDrift: ClosureDrift | null;
}

export interface UnparsableTasknote {
  id: string;
  reason: string;
}

export interface ActiveTasknotesResponse {
  tasknotes: Tasknote[];
  unparsable: UnparsableTasknote[];
}

export const STARTER_SUBSECTION_KEYS: StarterSubsectionKey[] = [
  'whyExists',
  'solutionShape',
  'filesToTouch',
  'outOfScope',
];

const STARTER_SUBSECTION_TITLES: Record<StarterSubsectionKey, string> = {
  whyExists: 'Why this exists',
  solutionShape: 'Solution shape',
  filesToTouch: 'Files to touch',
  outOfScope: 'Explicitly out of scope',
};

export const emptyStarterSubsections = (): StarterSubsections => ({
  whyExists: '',
  solutionShape: '',
  filesToTouch: '',
  outOfScope: '',
});

const STATUS_VALUES = new Set<TasknoteStatus>([
  'starter',
  'not-started',
  'in-progress',
  'blocked',
  'completed',
]);

function asString(v: unknown): string | undefined {
  if (typeof v === 'string') return v;
  return undefined;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === 'string');
}

/** Empty or non-array → omitted (undeclared), not an empty claim. */
function asOptionalStringArray(v: unknown): string[] | undefined {
  const items = asStringArray(v);
  return items.length > 0 ? items : undefined;
}

export function parseFrontmatter(raw: unknown): TasknoteFrontmatter | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Record<string, unknown>;
  if (Object.keys(data).length === 0) return null;

  const title = asString(data.title);
  const status = asString(data.status);
  const created = asString(data.created);
  const due = asString(data.due);

  if (!title || !status || !created) return null;
  if (!STATUS_VALUES.has(status as TasknoteStatus)) return null;

  const touches = asOptionalStringArray(data.touches);
  const blockedBy = asOptionalStringArray(data['blocked-by']);
  const parallelSafeWith = asOptionalStringArray(data['parallel-safe-with']);
  const supersedes = asOptionalStringArray(data.supersedes);

  return {
    title,
    status: status as TasknoteStatus,
    tags: asStringArray(data.tags),
    created,
    due: due && due.length > 0 ? due : undefined,
    relatedTasks: asStringArray(data['related-tasks']),
    ...(touches ? { touches } : {}),
    ...(blockedBy ? { blockedBy } : {}),
    ...(parallelSafeWith ? { parallelSafeWith } : {}),
    ...(supersedes ? { supersedes } : {}),
  };
}

const SECTION_HEADING = /^##\s+(.+?)\s*$/;
const SUBSECTION_HEADING = /^###\s+(.+?)\s*$/;
const HORIZONTAL_RULE = /^---\s*$/;

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractSection(body: string, titleSubstring: string): string {
  const titleBoundary = new RegExp(`\\b${escapeRegExp(titleSubstring)}\\b`);
  const lines = body.split(/\r?\n/);
  const inFence = fenceMask(lines);
  let inSection = false;
  const collected: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFence[i]) {
      const heading = SECTION_HEADING.exec(line);
      if (heading) {
        if (inSection) break;
        if (titleBoundary.test(heading[1])) {
          inSection = true;
          continue;
        }
        continue;
      }
      if (inSection && HORIZONTAL_RULE.test(line)) break;
    }
    if (!inSection) continue;
    collected.push(line);
  }
  return collected.join('\n').trim();
}

export function extractStarterSubsections(starterContext: string): StarterSubsections {
  const result = emptyStarterSubsections();
  if (!starterContext) return result;
  const lines = starterContext.split(/\r?\n/);
  const inFence = fenceMask(lines);
  let activeKey: StarterSubsectionKey | null = null;
  const buffers: Record<StarterSubsectionKey, string[]> = {
    whyExists: [],
    solutionShape: [],
    filesToTouch: [],
    outOfScope: [],
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFence[i]) {
      const heading = SUBSECTION_HEADING.exec(line);
      if (heading) {
        const title = heading[1];
        const matchedKey =
          STARTER_SUBSECTION_KEYS.find((k) => title.includes(STARTER_SUBSECTION_TITLES[k])) ?? null;
        activeKey = matchedKey;
        continue;
      }
      if (activeKey && HORIZONTAL_RULE.test(line)) {
        activeKey = null;
        continue;
      }
    }
    if (!activeKey) continue;
    buffers[activeKey].push(line);
  }
  for (const key of STARTER_SUBSECTION_KEYS) {
    result[key] = buffers[key].join('\n').trim();
  }
  return result;
}

const CHECKLIST_LINE = /^\s*-\s+\[([ xX])\]/;

// Checklist lines that are document structure, not fenced sample content. Both
// checklist scanners below walk this rather than the raw lines, so a fenced
// example row can never inflate a phase count or a drift count.
function structuralChecklistLines(markdown: string): { line: string; checked: boolean }[] {
  const lines = markdown.split(/\r?\n/);
  const inFence = fenceMask(lines);
  const items: { line: string; checked: boolean }[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (inFence[i]) continue;
    const m = CHECKLIST_LINE.exec(lines[i]);
    if (m) items.push({ line: lines[i], checked: m[1] === 'x' || m[1] === 'X' });
  }
  return items;
}

export function activePhaseIndex(phases: ChecklistCounts[]): number {
  for (let i = 0; i < phases.length; i++) {
    const p = phases[i];
    if (p.total === 0) return i;
    if (p.done < p.total) return i;
  }
  return Math.max(0, phases.length - 1);
}

// The Phase 4 Acceptance tick-through obligation (SPEC.md §"🚀 Phase 4: Closure")
// did not exist before TICK_THROUGH_EFFECTIVE. Notes archived earlier were
// never governed by it, so flagging them would be false drift, not detection.
// The comparison below is strict: the rule landed at 23:32, and the `**Archived:**
// stamp is date-only, so a note stamped 2026-08-01 most likely closed before the
// rule existed (notes that day closed as early as 21:24). Excluding the landing day trades a
// few unflagged hours for no false flags — the same "unknown is not drift" stance
// the missing-stamp case takes.
const TICK_THROUGH_EFFECTIVE = '2026-08-01';

const ARCHIVED_STAMP = /^\*\*Archived:\*\*\s+(\d{4}-\d{2}-\d{2})\s*$/m;

// Closure may annotate a criterion in place instead of ticking it
// (`N/A — reason` / `not met — reason`, SPEC.md §"Acceptance tick-through").
// An annotated box is a satisfied obligation, so it is not drift.
const ANNOTATED = /\b(?:N\/A|not[ -]met)\b/i;

export function extractArchivedDate(body: string): string | undefined {
  return ARCHIVED_STAMP.exec(body)?.[1];
}

// Unticked, unannotated `## ✅ Acceptance` criteria on a note archived under the
// tick-through rule. Returns null when there is nothing to report — no archive
// stamp (an active note, or an unfilled `YYYY-MM-DD` placeholder), a note closed
// before the rule existed, or a clean Acceptance block. Unknown is not drift.
export function closureDrift(
  acceptance: string,
  archivedDate: string | undefined,
): ClosureDrift | null {
  if (!archivedDate || archivedDate <= TICK_THROUGH_EFFECTIVE) return null;
  const items = structuralChecklistLines(acceptance);
  const unticked = items.filter((i) => !i.checked && !ANNOTATED.test(i.line)).length;
  return unticked > 0 ? { unticked, total: items.length } : null;
}

export function countChecklist(markdown: string): ChecklistCounts {
  if (!markdown) return { total: 0, done: 0 };
  const items = structuralChecklistLines(markdown);
  return { total: items.length, done: items.filter((i) => i.checked).length };
}

