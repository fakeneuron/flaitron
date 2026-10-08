import { fenceMask } from './fence.ts';

export type Priority =
  | 'High'
  | 'Medium'
  | 'Low'
  | 'Future Opportunities'
  | 'Completed';

// Category labels: 'light' | 'medium' | 'heavy', plus chooser-assignable
// 'frontier' and manual-only 'xheavy' (SPEC §"Task-line format" +
// SPEC/model.md). Concrete model names (e.g. 'fable', 'opus', 'sonnet',
// 'haiku', 'grok', 'gpt-5', 'gemini-pro') are valid precision tokens; the
// TASK_LINE regex accepts any short lowercase token matching [a-z][\w.-]*.
export type TaskModel = string;

export interface Task {
  id: string;
  description: string;
  priority: Priority;
  critical: boolean;
  unattended: boolean;
  handoff: boolean;
  completed: boolean;
  completedDate?: string;
  model?: TaskModel;
  shortname?: string;
  relatedTasks: string[];
  blockedBy: string[];
}

// The canonical priority registry, in board/list render order. Single source
// for both the parser's heading lookup below and the UI's section lists
// (`App.tsx`) — adding a `Priority` here reaches every consumer, so the
// parser and the UI never have to be edited in lockstep.
export const PRIORITIES: readonly Priority[] = [
  'High',
  'Medium',
  'Low',
  'Future Opportunities',
  'Completed',
];

const SECTION_HEADINGS = new Set<Priority>(PRIORITIES);

// Legacy `## Critical` heading — soft-migrated to `High` with every task
// under it auto-flagged `critical: true`. Adopter PLAN.md files that still
// carry a `## Critical` section keep parsing without data loss.
const LEGACY_CRITICAL_HEADING = 'Critical';

// Rotated-history heading (`## Completed 2026-07`). `.flaitron/PLAN-ARCHIVE.md`
// groups its month blocks under these, newest month first; the rows beneath are
// verbatim `PLAN.md` stubs, so only the heading needs teaching — the task-line
// grammar below is untouched. Mapped onto the canonical `Completed` priority
// inside the heading branch rather than widened into SECTION_HEADINGS, mirroring
// LEGACY_CRITICAL_HEADING: the canonical Priority set stays the five section
// names the board renders.
// Contract: SPEC/plan-filing.md §"`## Completed` rotation".
const COMPLETED_MONTH_HEADING = /^Completed\s+\d{4}-\d{2}$/;

// Grammar (see SPEC §"Task-line format"):
//   - [ ] **TASK-ID** [!critical] [model] [unattended] [handoff] | shortname — long description
// All of `[!critical]`, `[model]`, `[unattended]`, `[handoff]`, and
// `| shortname` are optional. Canonical ordering: `[!critical]` BEFORE
// `[model]`, the two trailing markers AFTER it. The legacy minimal form
// `- [ ] **TASK-ID** — desc` keeps parsing.
//
// TASK_LINE is composed from named fragments so each piece of the grammar —
// including the tolerances below — is independently readable and diffable.
// Fragment order below is left-to-right match order; concatenation order in
// the `new RegExp(...)` call must match it exactly.
// Capture groups, in order: mark, id, criticalRaw, modelRaw, trailingTokens,
// criticalAfter, shortnameRaw, longRaw. The two tolerances listed below
// are non-capturing; CRITICAL_FLAG_AFTER is the swapped-order capture
// (canonical CRITICAL_FLAG stays group 3; this is group 6 so a
// `[model] [!critical]` row — including after a suggestion glyph — still sets
// `critical`):
//   1. STATUS_GLYPH — leading status glyph between the checkbox and the ID
//      (`- [ ] ⏸ **ID**`) — the nav-header chip set 🟢/⏸/✅/⚪/🌱.
//   2. SUGGESTION_GLYPH — a model-suggestion glyph after `[model]`
//      (`[medium]🧠` / `[medium] 🔧` / `[medium]🧩` / `[frontier]💎` /
//      `[medium]🔭`, space-optional) — decorative, redundant with the model
//      tier, dropped.
//      Emitted in TWO slots, straddling TRAILING_TOKENS, so the glyph is
//      accepted on either side of the trailing-token run:
//      `[xheavy]🔭 [unattended]` and `[xheavy] [unattended]🔭` both parse.
//      A single slot accepts only one ordering: a glyph on the other side
//      is unconsumable and fails TASK_LINE outright.
//      Both slots are optional and non-capturing, so carrying two costs no
//      capture group. Same shape as CRITICAL_FLAG_AFTER below.
//
// TRAILING_TOKENS is the run of bracket tokens after `[model]`. It is
// CAPTURED because two members of that run are canonical grammar:
// `[unattended]`, the operator's task-level opt-in marker, and `[handoff]`,
// the operator's declaration that the row stops mid-run for a human act.
// Membership is tested against the captured run, so either marker may sit
// anywhere in it; every other trailing token is a dropped tolerance (a stacked
// `[model]` such as `[fable] [light]` keeps the first as `model`; the rest are
// dropped). Two mis-authoring shapes are deliberately NOT rescued here, and
// SPEC/plan-parser.md documents both for either marker:
// `[!unattended]` / `[!handoff]` matches no slot and fails TASK_LINE outright
// (the row surfaces as an unparsed diagnostic), and a marker written before
// `[model]` — or with no `[model]` at all — is captured as the model, because
// MODEL_TOKEN takes the first bracket token it sees.
// Emoji are matched via alternation (not a char class) so astral-plane glyphs
// match correctly without the `u` flag; an optional trailing VS16 is tolerated.
//
// TASK_ID_BODY is the shared ID shape: canonical SPEC
// `<AREA>-<NUMBER>` / `<AREA>-EPIC-<NUMBER>` / one `.(digits|N)` subtask
// slot, plus two adopter near-misses — a lowercase letter suffix on a
// numeric segment (`FE-310.3a`) and repeating decimals (`FE-067.2.1`).
// Threaded through TASK_ID, WIKILINK_PATTERN, BLOCKED_BY_BLOCK, and
// ID_SHAPE_CASE_INSENSITIVE so the five regex slots stay in lockstep. Not
// canonical authoring — new entries still use SPEC §"Task ID convention".
const BULLET_CHECKBOX = String.raw`^\s*-\s+\[([ xX])\]\s+`;
const STATUS_GLYPH = String.raw`(?:(?:🟢|⏸|✅|⚪|🌱)\uFE0F?\s+)?`;
const TASK_ID_BODY = String.raw`[A-Z]+(?:-EPIC)?-\d+(?:\.(?:\d+[a-z]?|N))*`;
const TASK_ID = String.raw`\*\*(${TASK_ID_BODY})\*\*`;
const CRITICAL_FLAG = String.raw`(?:\s+\[(!critical)\])?`;
const MODEL_TOKEN = String.raw`(?:\s+\[([a-z][\w.-]*)\])?`;
const SUGGESTION_GLYPH = String.raw`(?:\s*(?:🧠|🔧|🧩|💎|🔭)\uFE0F?)?`;
const TRAILING_TOKENS = String.raw`((?:\s+\[[a-z][\w.-]*\])*)`;
const SUGGESTION_GLYPH_AFTER = SUGGESTION_GLYPH;
const CRITICAL_FLAG_AFTER = CRITICAL_FLAG;
const SHORTNAME = String.raw`(?:\s+\|\s+([^\n]+?))?`;
const LONG_DESCRIPTION = String.raw`(?:\s+[—-]\s+([^\n]+?))?\s*$`;
const TASK_LINE = new RegExp(
  BULLET_CHECKBOX +
    STATUS_GLYPH +
    TASK_ID +
    CRITICAL_FLAG +
    MODEL_TOKEN +
    SUGGESTION_GLYPH +
    TRAILING_TOKENS +
    SUGGESTION_GLYPH_AFTER +
    CRITICAL_FLAG_AFTER +
    SHORTNAME +
    LONG_DESCRIPTION
);
// The two canonical members of TRAILING_TOKENS. `[unattended]` is the
// task-level opt-in marker an operator-less runner reads before dispatching a
// task unattended; `[handoff]` declares the row will stop for a human act that
// is not another task (a cross-repo prompt, a physical step, a credential), so
// such a runner declines it even when `[unattended]` is also present. Both are
// captured; what a reader does with them is the reader's.
const UNATTENDED_MARKER = /\[unattended\]/;
const HANDOFF_MARKER = /\[handoff\]/;
const COMPLETED_DATE = /\bCompleted\s+(\d{4}-\d{2}-\d{2})\.?/;
const HEADING_LINE = /^##\s+(.+?)\s*$/;

function cleanDescription(raw: string): string {
  return raw
    .replace(COMPLETED_DATE, '')
    .replace(/\*\*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/^[.\s]+|[.\s]+$/g, '');
}

// Long-description conventions (see SPEC §"Long-description conventions"):
//   `[[TASK-ID]]`             — cross-reference; collected into Task.relatedTasks
//   `Blocked by [[ID]], [[ID]]` — dependency; collected into Task.blockedBy
// Wikilink-only — bare-ID forms (`Blocked by: CORE-008`) are not recognized.
// Wikilinks inside markdown inline code spans (between backticks) are treated
// as literal text and ignored, mirroring how renderers display code spans.
// A wikilink that appears inside a `Blocked by` block lands in `blockedBy` only;
// the same ID elsewhere in the description is excluded from `relatedTasks` to
// avoid double-rendering (blocker is the stronger signal).
export const WIKILINK_PATTERN = new RegExp(
  String.raw`\[\[(${TASK_ID_BODY})\]\]`,
  'g'
);
const BLOCKED_BY_BLOCK = new RegExp(
  String.raw`Blocked by\s+(\[\[${TASK_ID_BODY}\]\](?:\s*,\s*\[\[${TASK_ID_BODY}\]\])*)`,
  'g'
);
const CODE_SPAN = /`[^`]*`/g;

function stripCodeSpans(text: string): string {
  return text.replace(CODE_SPAN, '');
}

function extractBlockedBy(text: string): string[] {
  const cleaned = stripCodeSpans(text);
  const ids = new Set<string>();
  for (const block of cleaned.matchAll(BLOCKED_BY_BLOCK)) {
    for (const m of block[1].matchAll(WIKILINK_PATTERN)) ids.add(m[1]);
  }
  return Array.from(ids);
}

function extractRelatedTasks(text: string, blocked: string[]): string[] {
  const cleaned = stripCodeSpans(text);
  const blockedSet = new Set(blocked);
  const ids = new Set<string>();
  for (const m of cleaned.matchAll(WIKILINK_PATTERN)) {
    if (!blockedSet.has(m[1])) ids.add(m[1]);
  }
  return Array.from(ids);
}

export interface TaskNode {
  task: Task;
  children: Task[];
}

interface DuplicateEpic {
  /** The epic ID that appeared under more than one heading. */
  id: string;
}

const EPIC_ID = /^([A-Z]+)-EPIC-(\d+)$/;
const SUBTASK_ID = /^([A-Z]+)-(\d+)\.(?:\d+[a-z]?|N)(?:\.(?:\d+[a-z]?|N))*$/;

function epicKey(id: string): string | null {
  const m = EPIC_ID.exec(id);
  return m ? `${m[1]}-${m[2]}` : null;
}

function subtaskParentKey(id: string): string | null {
  const m = SUBTASK_ID.exec(id);
  return m ? `${m[1]}-${m[2]}` : null;
}

export function isEpic(node: TaskNode): boolean {
  return node.children.length > 0 || EPIC_ID.test(node.task.id);
}

export function getSubtaskParentEpicId(id: string): string | null {
  const m = SUBTASK_ID.exec(id);
  return m ? `${m[1]}-EPIC-${m[2]}` : null;
}

interface GroupTasksResult {
  nodes: TaskNode[];
  duplicateEpics: DuplicateEpic[];
}

export function groupTasks(tasks: Task[]): GroupTasksResult {
  const epicByKey = new Map<string, TaskNode>();
  const seenEpicKeys = new Set<string>();
  const duplicateEpics: DuplicateEpic[] = [];

  // Pass 1: index every epic first so a subtask listed before its epic in
  // the input array still finds its parent in pass 2. Only the first
  // occurrence of a given epic ID is kept — an epic ID hand-authored under
  // two headings would otherwise let the second `.set()` silently overwrite
  // the first (last write wins), stranding it out of its original section.
  for (const task of tasks) {
    const eKey = epicKey(task.id);
    if (!eKey) continue;
    if (seenEpicKeys.has(eKey)) {
      duplicateEpics.push({ id: task.id });
      continue;
    }
    seenEpicKeys.add(eKey);
    epicByKey.set(eKey, { task, children: [] });
  }

  const pushedEpicKeys = new Set<string>();
  const nodes: TaskNode[] = [];
  for (const task of tasks) {
    const eKey = epicKey(task.id);
    if (eKey) {
      // Guard mirrors pass 1: a duplicate epic line must not push its
      // shared TaskNode into `nodes` a second time.
      if (pushedEpicKeys.has(eKey)) continue;
      pushedEpicKeys.add(eKey);
      nodes.push(epicByKey.get(eKey)!);
      continue;
    }
    const pKey = subtaskParentKey(task.id);
    if (pKey && epicByKey.has(pKey)) {
      epicByKey.get(pKey)!.children.push(task);
      continue;
    }
    nodes.push({ task, children: [] });
  }

  return { nodes, duplicateEpics };
}

export interface UnparsedLine {
  /** 1-based line number in PLAN.md */
  line: number;
  text: string;
}

export interface NearMissHeading {
  /** 1-based line number in PLAN.md */
  line: number;
  /** The heading text as written (e.g. "medium") */
  heading: string;
  /** The canonical Priority it case-insensitively matches (e.g. "Medium") */
  matched: Priority;
}

interface PlanParseResult {
  tasks: Task[];
  unparsed: UnparsedLine[];
  nearMissHeadings: NearMissHeading[];
}

// Lowercased priority name -> canonical Priority, for the near-miss check below.
const LOWERCASE_TO_PRIORITY = new Map<string, Priority>(
  Array.from(SECTION_HEADINGS, (p) => [p.toLowerCase(), p])
);

// Loose checkbox-bullet prefix: a line that *looks like* a task entry. Lines
// matching this inside a recognized section but failing TASK_LINE are
// hand-authoring mistakes — collected as diagnostics instead of silently dropped.
const CHECKBOX_BULLET = /^\s*-\s+\[[ xX]\]/;

// Pre-flaitron legacy record: a completed historical line whose bold
// token was never an `<AREA>-NNN` ID (`**P1**`, `**flowtron v5.2.0 bump**`) —
// it predates flaitron's ID convention and has no tasknote to promote it to.
// The grammar allows only a bare `**token**` optionally followed by an
// em/en-dash description — no room for `[!critical]`/`[model]`/`| shortname`,
// so a line carrying any of those never matches here and still falls through
// to the unparsed diagnostic below.
const LEGACY_LABEL_LINE =
  /^\s*-\s+\[([ xX])\]\s+\*\*([^*]+)\*\*(?:\s+[—-]\s+(.+))?\s*$/;

// A token that merely has the wrong case of a real ID (`fe-065`) still reads
// as a hand-authoring typo and must keep surfacing as unparsed — only a token
// with no letter-dash-digit structure at all (checked case-insensitively) is
// eligible for the legacy exclusion above.
const ID_SHAPE_CASE_INSENSITIVE = new RegExp(`^${TASK_ID_BODY}$`, 'i');

// HTML comments (`<!-- ... -->`, possibly multi-line) are non-rendered content:
// checkbox lines inside them — typically a grammar-reference example carrying a
// literal `**TASK-ID**` placeholder — must not parse as tasks or surface as
// diagnostics. Blank the comment interior while preserving newlines so
// the 1-based line numbers reported for real content stay accurate. An unclosed
// `<!--` (no matching `-->`) is left untouched — PLAN.md comment blocks are always
// closed, and matching to EOF risks blanking real content below a stray marker.
function blankHtmlComments(markdown: string): string {
  return markdown.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
}

// One document's worth of scanning. Private because the two documents a board
// reads are not interchangeable: only `PLAN.md`'s diagnostics reach the caller
// (see parsePlanWithDiagnostics).
// A heading line's effect on scan state: which priority (if any) subsequent
// lines file under, whether the legacy `## Critical` section is active, and
// the near-miss match (if the heading looks like a typo'd priority).
function resolveHeadingLine(heading: string): {
  priority: Priority | null;
  legacyCriticalSection: boolean;
  nearMissMatch: Priority | null;
} {
  if (heading === LEGACY_CRITICAL_HEADING) {
    return { priority: 'High', legacyCriticalSection: true, nearMissMatch: null };
  }
  if (SECTION_HEADINGS.has(heading as Priority)) {
    return { priority: heading as Priority, legacyCriticalSection: false, nearMissMatch: null };
  }
  if (COMPLETED_MONTH_HEADING.test(heading)) {
    return { priority: 'Completed', legacyCriticalSection: false, nearMissMatch: null };
  }
  return {
    priority: null,
    legacyCriticalSection: false,
    nearMissMatch: LOWERCASE_TO_PRIORITY.get(heading.toLowerCase()) ?? null,
  };
}

// A task-section line's effect on scan output: a parsed `Task`, unparsed
// text for a checkbox line that looked like a task but didn't match, or
// `null` for a line that's neither (blank lines, prose, etc.).
function parseTaskLine(
  line: string,
  currentPriority: Priority,
  legacyCriticalSection: boolean,
): { task: Task } | { unparsedText: string } | null {
  const m = TASK_LINE.exec(line);
  if (!m) {
    if (CHECKBOX_BULLET.test(line)) {
      const legacyMatch = LEGACY_LABEL_LINE.exec(line);
      const isLegacyRecord =
        legacyMatch !== null &&
        (legacyMatch[1] === 'x' || legacyMatch[1] === 'X') &&
        !ID_SHAPE_CASE_INSENSITIVE.test(legacyMatch[2]);
      // A checkbox with no ID emphasis (`*` / `**`) is a prose
      // checklist item, not a failed task. Genuine ID near-misses still
      // carry asterisks (`*FE-064*`, `**fe-065**`) and keep flagging.
      if (!isLegacyRecord && line.includes('*')) {
        return { unparsedText: line.trim() };
      }
    }
    return null;
  }

  const [, mark, id, criticalRaw, modelRaw, trailingTokens, criticalAfter, shortnameRaw, longRaw] =
    m;
  const completed = mark === 'x' || mark === 'X';
  const longText = longRaw ?? '';
  const dateMatch = COMPLETED_DATE.exec(longText);
  const blockedBy = extractBlockedBy(longText);
  const relatedTasks = extractRelatedTasks(longText, blockedBy);

  return {
    task: {
      id,
      description: longText ? cleanDescription(longText) : '',
      priority: currentPriority,
      critical: criticalRaw === '!critical' || criticalAfter === '!critical' || legacyCriticalSection,
      unattended: UNATTENDED_MARKER.test(trailingTokens ?? ''),
      handoff: HANDOFF_MARKER.test(trailingTokens ?? ''),
      completed,
      completedDate: dateMatch ? dateMatch[1] : undefined,
      model: modelRaw as TaskModel | undefined,
      shortname: shortnameRaw ? shortnameRaw.trim() : undefined,
      relatedTasks,
      blockedBy,
    },
  };
}

function scanDocument(markdown: string): PlanParseResult {
  const lines = blankHtmlComments(markdown).split(/\r?\n/);
  const inFence = fenceMask(lines);
  const tasks: Task[] = [];
  const unparsed: UnparsedLine[] = [];
  const nearMissHeadings: NearMissHeading[] = [];
  let currentPriority: Priority | null = null;
  let legacyCriticalSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (inFence[i]) continue;
    const headingMatch = HEADING_LINE.exec(line);
    if (headingMatch) {
      const heading = headingMatch[1];
      const resolved = resolveHeadingLine(heading);
      currentPriority = resolved.priority;
      legacyCriticalSection = resolved.legacyCriticalSection;
      if (resolved.nearMissMatch) {
        nearMissHeadings.push({ line: i + 1, heading, matched: resolved.nearMissMatch });
      }
      continue;
    }
    if (!currentPriority) continue;

    const parsed = parseTaskLine(line, currentPriority, legacyCriticalSection);
    if (parsed && 'task' in parsed) {
      tasks.push(parsed.task);
    } else if (parsed && 'unparsedText' in parsed) {
      unparsed.push({ line: i + 1, text: parsed.unparsedText });
    }
  }

  return { tasks, unparsed, nearMissHeadings };
}

// `PLAN.md` plus, optionally, the rotated history in `.flaitron/PLAN-ARCHIVE.md`.
// Rotation moves closed rows out of `PLAN.md` verbatim, so a board that reads
// only the first file loses every rotated month; concatenating the second
// restores whole history. Absence is an empty archive, never an error — the file
// does not exist until a project's first rotation.
//
// Diagnostics stay `PLAN.md`-only, deliberately. `UnparsedLine.line` /
// `NearMissHeading.line` are documented as `PLAN.md` line numbers and rendered
// as "N lines in PLAN.md ..."; the archive is machine-rotated,
// append-only, and never hand-authored, so it is not the authoring surface those
// diagnostics were built to protect. Reporting an archive line number under that
// banner would point the operator at a line of `PLAN.md` that says something
// else entirely.
export function parsePlanWithDiagnostics(
  markdown: string,
  archiveMarkdown?: string,
): PlanParseResult {
  const plan = scanDocument(markdown);
  if (!archiveMarkdown) return plan;
  const archive = scanDocument(archiveMarkdown);
  return { ...plan, tasks: [...plan.tasks, ...archive.tasks] };
}
