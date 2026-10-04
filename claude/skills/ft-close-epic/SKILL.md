---
name: ft-close-epic
description: Close a flaitron epic by scaffolding and driving its audit `.N` tasknote in one motion. With `--unattended`, runs with no operator present: the audit still closes and commits, and the parent-flip is deferred to the operator.
---

# close-epic — flaitron epic audit + close driver

You are scaffolding and driving the audit `.N` subtask of an epic, then prompting the user whether to flip the parent epic to `Completed`. The full lifecycle contract lives in `<SPEC_DIR>/epic.md` — this skill is the executable interpretation of the lifecycle's audit-and-close side, not a replacement. Treat `SPEC/epic.md` as authoritative when this file is silent or in tension.

The skill takes the **audit subtask ID** as `args` — canonically the reserved `.N` suffix (e.g., `args="CORE-057.N"`); a legacy numeric audit ID (e.g., `args="CORE-057.6"`) is also accepted. A trailing `--unattended` is the only other accepted token. If `args` is missing or its first token doesn't match `<AREA>-<NUMBER>.<SUB>`, stop and ask the user for a valid ID. Do not guess.

## Step 0 — Resolve paths

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail.

Paths: SPEC=`<root>SPEC.md`, SPEC_DIR=`<root>SPEC/`, template=`<root>templates/tasknote-template.md`, PLAN=`.flaitron/PLAN.md`, tasknote dir=`.flaitron/tasknote/`.

UNATTENDED (shared `--unattended` fragment, owned by `/ft-task`): `<root>claude/skills/ft-task/unattended-mode.md`.
SKILL_DIR (lazy fragment `unattended-close-epic.md` — this skill's own `--unattended` deltas): `<root>claude/skills/ft-close-epic/`.

After resolving, Read `<SPEC_DIR>/epic.md` for the canonical lifecycle before drafting anything.

**Parse the flag.** Split `args` on whitespace into `(AUDIT-SUBTASK-ID, rest...)`. Initialize `unattended-mode = false`; a `--unattended` token (no short alias) sets it true. Any unrecognized token → surface ``Unknown arg `<arg>`. Usage: `/ft-close-epic <AUDIT-SUBTASK-ID> [--unattended]`.`` and ask via AskUserQuestion whether the user meant `--unattended`, the default flow, or to abort. Do not proceed silently. This skill takes **no `--fast`** — there is none to pass.

When `unattended-mode = true`, Read `<SKILL_DIR>/unattended-close-epic.md`, `<UNATTENDED>`, `<SPEC_DIR>/gate-postures.md`, and `<SPEC_DIR>/blocked.md` now — the first carries this skill's own `--unattended` clauses, the second the posture's executable steps, the third its contract. Start at the fragment's §"Step 0 — Activation marker and what differs"; each step below points back to its own section.

## Step 1 — Pre-flight

- `.flaitron/PLAN.md` must exist (cwd is a flaitron-adopting project or flaitron itself).
- **Foreign-dirt gate (paper-complete guard).** Before scaffold writes, run `git status --porcelain`. If non-empty: **STOP**, surface the dirt list, ask the operator to commit / stash / discard themselves, then re-invoke. Do not auto-clean. See SPEC §"Paper-complete guard". **`--unattended` does not relax this** — it terminates and writes nothing, per the fragment's §"Steps 1-2 — Pre-scaffold stops".
- Parse `args` as `<AREA>-<NUMBER>.<SUB>` (where `.<SUB>` is a number or the reserved literal `.N` — both parse per SPEC §"Task ID convention"):
  - **Area** resolves by reading the `.flaitron/tasknote/README.md` §"Archive layout" table — every prefix, canonical ones included; `<area>` is **never derived from the ID** (SPEC §"Task ID convention"). No row for this prefix → stop and ask; do not guess a folder.
  - **`.<SUB>` segment is required** — `/ft-close-epic` only runs against epic subtasks, not standalone tasks. If the ID matches `<AREA>-<NUMBER>` (no `.<SUB>` suffix), stop and tell the user "`/ft-close-epic` runs against the audit `.N` subtask of an epic, not a standalone task. Use `/ft-task <ID>` for standalone tasks."
- Check `<tasknote dir>/<AUDIT-SUBTASK-ID>.md`:
  - If the file already exists with `status: in-progress`, stop and tell the user the audit tasknote is already in flight. Recommend continuing conversationally (e.g., "continue CORE-057.6") rather than restarting — this skill is start-only by design.
  - If `<tasknote dir>/archive/<area>/<AUDIT-SUBTASK-ID>.md` already exists, the audit is closed and archived; stop and surface the conflict.
- Otherwise (fresh scaffold path), continue.

**Pre-scaffold stops under `--unattended`.** Every bail in Steps 1-2 fires before the audit tasknote exists, so each terminates and **writes nothing** — shape and closed `<cause>` set in the fragment's §"Steps 1-2 — Pre-scaffold stops".

## Step 2 — Validate audit position and check sibling state

Read `.flaitron/PLAN.md`. Locate the parent epic ID by stripping the `.<SUB>` suffix and looking for `<AREA>-EPIC-<NUMBER>`:

- If no parent epic line is found in PLAN.md (active OR `## Completed`), stop and tell the user no parent epic `<AREA>-EPIC-<NUMBER>` exists for the given audit ID. The audit subtask must be filed under a parent epic via `/ft-epic-discovery`.
- If the parent epic line lives under `## Completed`, stop and surface the conflict — the parent has already been closed.

**Completed-rotation check (advisory).** While PLAN.md is open, count the checked rows under `## Completed` (nested epic children included). If the count exceeds **60**, surface a one-line warning:

```text
⚠️ PLAN.md `## Completed` holds <N> rows (>60). Consider rotating the
   oldest rows to `.flaitron/PLAN-ARCHIVE.md`. Proceeding.
```

Informational only — never block, never rotate. Rotation is an operator motion; the bound, the month-block granularity, and the two never-split rules are canonical in SPEC/plan-filing.md §"`## Completed` rotation".

Walk the parent's nested children block (lines indented 2 spaces under the parent line, matching `  - [ ] **<AREA>-<NUMBER>.<SUB>**` or `  - [x] **<AREA>-<NUMBER>.<SUB>**`, where `.<SUB>` is a number or the reserved literal `.N`). Determine:

- Whether a **`.N` audit child** (the reserved terminal suffix) is filed.
- The **highest `.<SUB>` numeric value** across the numeric children (legacy fallback).

Validate that the chosen `<AUDIT-SUBTASK-ID>` is the epic's audit child:

- **Canonical (`.N`)** — the ID ends in `.N`. Accept it: `.N` is the reserved terminal audit suffix per SPEC/epic.md and never renumbers.
- **Legacy numeric** — the epic has no `.N` child and the chosen ID matches the highest numeric `.<SUB>`. Accept it (repos that filed a numeric audit before the `.N` convention — both forms are valid per SPEC §"Task ID convention").
- **Neither** — stop. Surface "The audit is the epic's terminal child: the reserved `.N` suffix (canonical), or the highest-numbered child for legacy epics. This epic's audit child is `<AREA>-<NUMBER>.<AUDIT>` — pass that ID." (where `<AUDIT>` = `N` if a `.N` child exists, else the highest numeric `.<SUB>`).

Walk the children for **un-checked** `[ ]` siblings (excluding the chosen audit ID itself):

- **No open siblings** → proceed silently.
- **One or more open siblings** → use AskUserQuestion to ask:

  ```
  Open implementation children remain: <list>. Audit early before they close? (default No bails)
  ```

  - Default No → stop. Tell the user to drive the open children via `/ft-task <ID>` first, then re-run `/ft-close-epic <AUDIT-SUBTASK-ID>`.
  - Yes → continue, log the early-audit decision in the audit tasknote's Discovery Notes (Step 4) so the audit's scope is honest about the partial cohort.

  **When `unattended-mode = true`**, take the default-No bail deterministically — do not ask; see the fragment's §"Steps 1-2 — Pre-scaffold stops" → "Open-siblings ask".

## Step 3 — Scaffold the audit tasknote

Copy `<template>` to `<tasknote dir>/<AUDIT-SUBTASK-ID>.md` and fill the frontmatter per SPEC §"Tasknote frontmatter":

- `title:` — `<parent-epic-shortname> audit` (derive shortname from the parent epic's `| <shortname>` segment).
- `status:` — `in-progress`.
- `created:` — today's date (`YYYY-MM-DD`).
- `related-tasks:` — `[<AREA>-EPIC-<NUMBER>, <sibling-IDs>...]` (the parent epic plus all sibling subtask IDs in the cohort).

Replace the H1 with `# <AUDIT-SUBTASK-ID> | <parent-epic-shortname> audit` and update the nav header `🔗` chip to `[[<AREA>-EPIC-<NUMBER>]]`.

Pre-populate `## 🎯 Goal`, `## ✅ Acceptance`, and `## 🧩 Subtasks` with the canonical epic-audit shape parameterized to the cohort:

**Goal (one sentence):**

> Verify the completed `<AREA>-EPIC-<NUMBER>` (`<shortname>`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

**Acceptance (parameterized; the first criterion is the fixed doc-drift line per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" and is non-negotiable):**

```markdown
- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: <AUDIT-SUBTASK-ID> — audit <AREA>-EPIC-<NUMBER>` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `<AUDIT-SUBTASK-ID>` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flaitron/tasknote/archive/<area>/<AUDIT-SUBTASK-ID>.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `<AREA>-EPIC-<NUMBER>` to `Completed` and moving the cohort to `## Completed`
```

**Subtasks (parameterized):**

```markdown
- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `<AUDIT-SUBTASK-ID>` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`
```

Leave the standard 4-phase checklist sections from the template intact below the populated Goal / Acceptance / Subtasks.

## Step 4 — Drive Phase 1: Discovery

Walk the Phase 1 checklist per SPEC §"📝 Phase 1: Discovery". Tick boxes as each step completes. Skill-specific imperatives:

- **Reviewed PLAN.md** — already done in Step 2 (parent epic + sibling state walked).
- **Relevance Assessment** — Verdict: Proceed (the user explicitly invoked `/ft-close-epic` and Step 2's pre-flight passed). Rationale: capture cohort state at audit time (which children closed when, any early-audit decision from Step 2).
- **Read relevant source files** — for each cohort sibling, read its archived tasknote at `<tasknote dir>/archive/<area>/<SIBLING-ID>.md`. Capture each child's deliverables (files added/edited, design decisions, surfaces touched) in Discovery Notes.
- **Archive skim** — typically self-referential for an epic audit (cohort children are themselves archive entries). If the epic touched surfaces with prior tasknote history beyond the cohort, grep for those paths in `<tasknote dir>/archive/<area>/*.md` and read non-cohort hits for cumulative context.
- **Drift check** — verify cited paths and conventions in cohort children's deliverables still match HEAD (paths the implementation children touched may have moved during the cohort).
- **Clarifying questions** — for an audit, typically none. If cohort scope is ambiguous (some children deferred, partial-cohort early-audit per Step 2), use AskUserQuestion to confirm audit scope. **When `unattended-mode = true`**, see the fragment's §"Step 4 — Phase 1 Discovery".
- **Subtasks populated** — Step 3 scaffold pre-filled the canonical epic-audit subtask list; refine if Discovery surfaces a scope shift.

Do not enter Phase 2 until every Phase 1 box is ticked. Once ticked, apply the SPEC/gates.md §"Phase 1→2 exit gate"'s **`default-fire-on-clarifications` flavor** (this skill follows the higher-checkpoint flavor, not `/ft-task`'s `default-skip` — epic-closure is lower-volume and higher-stakes, so any surfaced clarification gates):

- **"No clarifications needed" branch** — emit the inline marker `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` and start Step 5 Phase 2 immediately. Plain prose, not a banner; not a new gate.
- **Clarifications-surfaced branch** — surface the **🛠️ Phase 1→2 operator-gate cue** with the mandatory 1-2 sentence plain-English preview line (per SPEC/gates.md §"Operator-gate cues") and wait for the user's go (conversational assent — SPEC/cue-vocabulary.md §"Accepted gate replies") before starting Step 5 Phase 2. **When `unattended-mode = true`**, the branch has no operator to fire at: **park** instead of banner, per the fragment's §"Step 4 — Phase 1 Discovery".

## Step 5 — Drive Phase 2: Execution

The Phase 2 deliverable is the audit findings — recorded in Implementation Notes. Walk the Phase 2 checklist:

- **Pattern survey** — N/A for most audits (no new code surface; the audit is a verification pass over existing cohort deliverables). For audits that surface a fix needing inline correction, note the precedent surveyed.
- **Implemented the minimal solution** — for most audits this is verification work, not code edits: walk the cohort coherence checklist (Acceptance criteria 2-4), record findings as Implementation Notes. If the audit surfaces a fix that's small and clearly in scope (e.g., a stale path reference in a sibling's deliverable), apply it inline. Larger misses → log for `/ft-file-followup` filing after closure.
- **Updated/added tests** — N/A unless the audit applied a code fix.

Capture in Implementation Notes:

- Cohort children inventoried (one bullet per child summarizing its deliverable).
- Coherence findings ("no inconsistencies surfaced" or specific surfaced issues).
- Any inline fixes applied (file:line + diff shape).
- Misses logged as `/ft-file-followup <NEW-ID>` candidates (one bullet per miss with one-line rationale; user invokes `/ft-file-followup` per miss after audit closure).

Phase 2 flows continuously into the Step 6 lint/test pass and Step 7 closure ops without an intermediate gate; the next operator-gate cue is the 📦 ready-to-commit banner in Step 9.

## Step 6 — Drive Phase 3: Testing & Linting

Markdown-prose verification only for most audits — no test surface. If the audit applied an inline fix, run lint/type-check on changed files and grade that fix through the **External review** box; otherwise tick all five Phase 3 boxes (test suite N/A, lint N/A, receipt N/A, External review N/A, frontend N/A — capture rationale in Testing Notes).

## Step 7 — Drive Phase 4: Closure (audit subtask, auto-run)

Walk the Phase 4 checklist for the audit subtask itself under SPEC §"Paper-complete guard". **No banner here** — closure ops auto-run; the recap drafted at the end bundles into Step 9's 📦 gate (parent-flip prompt also bundles there per Step 8). Flip only when ready to proceed to the atomic commit in Step 9; flip **only the audit subtask line** here (parent flip is Step 8/9 only — not collateral).

- **Doc-drift sweep (fixed line)** — for each entry in `<tasknote dir>/README.md` §"AI-referenced docs", state per-entry verdict ("no change" or the specific update). This is the contractually-required sweep per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line"; never skip.
- **Tick through `## ✅ Acceptance`** — tick every criterion the audit satisfied; annotate any it did not (`N/A` / not-met with a one-line reason). Never leave a box silently unticked. Do **not** flip the markdown nav chip to `✅ Completed` — that write was retired by CORE-042.4 and the chip is render-derived from YAML (SPEC §"🚀 Phase 4: Closure").
- **Flip the audit's PLAN.md line to stub form** — `- [x] **<AUDIT-SUBTASK-ID>** [<model>] | <shortname> audit — Completed YYYY-MM-DD.` per SPEC/plan-filing.md §"`## Completed` archive convention". Keep nested under `<AREA>-EPIC-<NUMBER>` in its current `## <Priority>` section (parent + cohort move only on Step 9 confirmation). **Epics filed before CORE-418 carry a bare `| audit` placeholder — replace it with `| <parent-epic-shortname> audit`, do not preserve it.** `| shortname` is required so visualizers have a row title, and a row reading only "audit" is untitled once several epics have closed.
- **Flip the audit tasknote's YAML `status:`** — `in-progress` → `completed`, before the move. A pre-archive lifecycle write; SPEC §"Tasknote frontmatter" write-once does not reach it.
- **Stamp the audit tasknote** — set its body `**Archived:** YYYY-MM-DD` line to today's date, before the move.
- **Verify, then move** — immediately before the `git mv`, check mechanically rather than by recollection: `grep -q '^status: completed$' <tasknote dir>/<AUDIT-SUBTASK-ID>.md` succeeds, `awk '/^## ✅ Acceptance/{a=1;next} a&&/^## /{a=0} a' <tasknote dir>/<AUDIT-SUBTASK-ID>.md | grep -E '^ *- \[ \]' | grep -viE 'N/A|not[ -]met'` prints nothing, and `grep -qE '^\*\*Archived:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}$' <tasknote dir>/<AUDIT-SUBTASK-ID>.md` succeeds. Same three checks as `/ft-task`'s pre-move gate and `/ft-release` §7.1 Pair P; a dirty result means one of the three closure writes above is still outstanding — fix it and re-run, never move on it. Applies identically under `--unattended`. Then `git mv <tasknote dir>/<AUDIT-SUBTASK-ID>.md <tasknote dir>/archive/<area>/<AUDIT-SUBTASK-ID>.md`.
- **Draft the recap** — leads with a 1-2 sentence plain-English summary (audit ran; key finding or "no inconsistencies surfaced"), then technical detail (cohort children inventoried, follow-ups to file, any inline fixes applied). Hold it for Step 9's 📦 bundle; do not surface a banner now.

**Under `--unattended` this step is unchanged** — the audit's own closure has nothing an operator must answer. Only the *parent* line is off-limits (Step 8); see the fragment's §"Step 7 — Phase 4 closure".

## Step 8 — Parent-epic flip eligibility (no banner)

After the audit closes cleanly, scan `.flaitron/PLAN.md` for the parent epic line + all its children. Determine eligibility:

- All children `[x]` (including the audit just closed) → **all-children-closed**: parent-flip is eligible. The Yes/No prompt fires inside Step 9's 📦 bundle.
- Any child `[ ]` (typical only when Step 2's early-audit gate was bypassed) → **not-all-closed**: parent-flip is **not eligible**. Note the open children for surfacing inside Step 9's bundle as a heads-up; the prompt is skipped.

This step computes state only — **no banner here**. The user-facing prompt (when eligible) bundles into Step 9's 📦 ready-to-commit gate alongside the recap + closure review + commit message.

When the prompt fires in Step 9 and the user answers **Yes**:

1. **Flip the parent line to stub form** — `- [x] **<AREA>-EPIC-<NUMBER>** [<model>] | <shortname> — Completed YYYY-MM-DD.` (drop the long description per stub-form, SPEC/plan-filing.md §"`## Completed` archive convention").
2. **Atomic move** — cut the parent line + all nested children from their current `## <Priority>` section; paste at the top of `## Completed`. Preserve the 2-space child indent. If the cohort was the last entry in its source section, restore the `(none)` placeholder under that section heading.

On **No** (still in Step 9's bundle): leave cohort nested under current section. Note "Cohort stays under `## <Priority>`. Re-run `/ft-close-epic` later or flip manually when ready." in the post-commit response.

Capture the flip decision in the audit tasknote's Final Summary block (still editable until git commit lands in Step 9).

**When `unattended-mode = true`, the prompt never fires.** Compute eligibility exactly as above, then **defer** rather than park — the recipe, the rationale, and the Final Summary blockquote to record are in the fragment's §"Step 8 — Parent-flip deferral".

## Step 9 — Post-closure protocol

**Read `<SPEC_DIR>/post-closure.md` now** — the protocol is a lazy module, loaded here and nowhere earlier — then run it, branching on SPEC/gates.md §"Conditional skip rule" against the audit closure diff. **Parent-flip override:** when Step 8 marked parent-flip eligible, the parent-flip Yes/No is a bundled in-📦 prompt and forces the 📦 gate to fire regardless of signal state (per SPEC's bundled-prompt override). When ineligible, the signal rule evaluates normally.

**When `unattended-mode = true`, the override does not apply** — the prompt was never queued (Step 8), so the 📦 gate evaluates against the audit closure diff alone. Never stage the parent flip or the cohort move. The unbundling rationale, the post-🏁 deferral line to emit, and why a destructive inline fix parks at Step 5 rather than reaching this step: fragment §"Step 9 — Post-closure protocol".

- **Skip branch** (parent-flip ineligible AND signals clear) — emit `✅ Closure complete; committing autonomously (<concrete-signal-summary>).` (e.g., `audit closure: PLAN.md flip + tasknote archive; no privileged-ops surface`), then run closure review + recap + commit + 🏁 + suggest-next-move + copy-paste in one response. Heads-up listing of open children (Step 8 ineligible branch) delivers inline alongside the closure review.
- **Fire branch** (parent-flip eligible OR privileged-ops signal hits) — surface the bundled 📦 ready-to-commit gate (per `SPEC/post-closure.md` step 1) and **wait**. Do **not** emit 🏁, next-move, or the copy-paste line in this turn. Alongside the SPEC-defined bundle, this skill carries:
  - **Parent-flip prompt** (when eligible per Step 8) — AskUserQuestion with default Yes:
    ```
    All <AREA>-EPIC-<NUMBER> children closed. Flip parent + move cohort to `## Completed`?

      Parent: <AREA>-EPIC-<NUMBER> | <shortname>
      Children to move: <AREA>-<N>.1 .. <AREA>-<N>.<M+1>, plus audit <AREA>-<N>.N

    (default Yes; declines leave cohort nested under current `## <Priority>` section)
    ```
  - **Commit message** — `feat: <AUDIT-SUBTASK-ID> — audit <AREA>-EPIC-<NUMBER>` (or `chore: ...` if no code edits landed).

On commit (either branch): if parent-flip Yes, apply the flip + atomic move per Step 8 before staging, so the commit captures the flip atomically. Stage audit deliverables + PLAN/archive (and parent flip when Yes) together; emit 🏁 only after a real deliverable-covering SHA (SPEC §"Paper-complete guard") — never invent a SHA. Parent-flip under 📦 is the only multi-line Completed move; it is not a collateral flip.

Skill-specific next-move shape:
- Candidates: read the full PLAN.md task-line shape (including `[model]`) to know the recommended model. When *printing the list to the user*, emit only the emoji primary label (`[heavy]🧠` / `[medium]🧩` / `[light]🔧` / (rare — manual-only filings) `[xheavy]🔭`) + "design / moderate / mechanical / exploratory" prose + shortname — drop the bare bracketed token from the visible suggestion output. Branches:
  - Misses logged → `/ft-file-followup <NEW-ID>` per miss (one at a time; user paces).
  - No misses + parent flipped + next task queued in PLAN.md → suggest that task (next epic or standalone).
  - No misses + parent flipped + PLAN.md empty of queued tasks → suggest filing a new epic in this session before clearing (see copy-paste exception below). This is the epic-scoped instance of SPEC §"Post-closure protocol" step 2's now-canonical **PLAN exhausted (terminal)** form — stop, don't invent a next move.
  - No misses + parent declined → manual flip when ready (edit PLAN.md: flip parent line to stub form, move parent + nested children to top of `## Completed`). Re-running `/ft-close-epic` would hit Step 1's already-archived bail.
- Copy-paste helper: emit a short visual cue that uses the same emoji primary label just printed for the chosen next-task candidate line (🔧 for [light] or light-appropriate tokens; 🧩 for [medium] or medium-appropriate tokens; 🧠 for [heavy] or heavy tokens; 🔭 for [xheavy]). Put the invocation on its **own line as inline-code with no trailing period** — a trailing `.` collides with the `.N` epic-subtask grammar (`FE-132.3.`) and breaks copy/paste. Shape: a label line `<glyph> Clear your session, then run:` followed by `` `/<next-skill> <ID>` `` alone on the next line — where `<glyph>` is the exact 🔧/🧩/🧠/🔭 just printed on the chosen candidate line; never default to 🔧. Never emit a literal `/clear then /model ...` instruction in the user-facing suggestion. **Exception — context-dependent skills:** when the next-skill is `/ft-file-followup` (in either mode) or `/ft-epic-discovery`, replace the label line with `👇 Run in this session:` — 👇 replaces the model glyph and signals run-here-don't-clear (the model signal stays on the candidate line); these skills draw from current-conversation context; clearing destroys what they need.

## Notes

- **Bracket twin of `/ft-epic-discovery`.** `/ft-epic-discovery` opens an epic (files parent + `.1` + `.N`, drives `.1` Discovery); `/ft-close-epic` closes it (drives audit `.N`, prompts parent flip). Together they bracket `SPEC/epic.md` lifecycle steps 1-2 and 4-5; `/ft-task` runs the implementation children (step 3).
- **Audit-only — never standalone.** Validates arg is the parent epic's audit child — the reserved `.N` suffix (canonical) or the highest numeric `.<SUB>` (legacy). Standalone tasks → `/ft-task <ID>`.
- **Open-children warn-and-proceed.** Sibling implementation children still open → skill warns and asks (default No bails). Useful for early audits when a child is stuck or deferred.
- **Audit follow-ups → `/ft-file-followup`.** Misses logged in Implementation Notes as `/ft-file-followup <NEW-ID>` candidates; user invokes per miss after closure (preserves the 50w/70w cap at its natural boundary).
- **Parent-flip is a prompt, not automatic.** Skill never silently flips. User confirms (default Yes); declines leave cohort nested for a later flip. Under `--unattended` the prompt does not fire at all and the flip is **deferred**, never auto-approved — the irreversible cohort move stays operator-owned in every posture.
- **`--unattended` is the only flag.** No `--fast` (the epic skills never took one, so there is nothing to be a superset of) and no `--debug`. Contract: SPEC/gate-postures.md §"`/ft-close-epic` under the posture". `/ft-epic-discovery` accepts neither — opening an epic is a scoping conversation, and there is nobody to have it with.
- **Auto-wired into adopters.** Symlinked via `claude/skills/ft-new-project/` + `docs/MIGRATION.md` §1.2 + `claude/AGENTS-snippet.md`'s symlink section. Existing adopters pick up on next flaitron version bump.
