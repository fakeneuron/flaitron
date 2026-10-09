---
name: ft-close-epic
description: 'Close a flaitron epic by scaffolding and driving its audit `.N` tasknote in one motion; that closure flips the parent epic automatically once every child is closed. With `--unattended`, runs with no operator present: the audit still closes and commits, parent flip included.'
argument-hint: <AUDIT-SUBTASK-ID> [--unattended]
---

# close-epic — flaitron epic audit + close driver

You are scaffolding and driving the audit `.N` subtask of an epic through the closure that flips the parent epic to `Completed`. The full lifecycle contract lives in `<SPEC_DIR>/epic.md` — this skill is the executable interpretation of the lifecycle's audit-and-close side, not a replacement. Treat `SPEC/epic.md` as authoritative when this file is silent or in tension.

The skill takes the **audit subtask ID** as `args` — canonically the reserved `.N` suffix (e.g., `args="CORE-057.N"`); a legacy numeric audit ID (e.g., `args="CORE-057.6"`) is also accepted. A trailing `--unattended` is the only other accepted token. If `args` is missing or its first token doesn't match `<AREA>-<NUMBER>.<SUB>`, stop and ask the user for a valid ID. Do not guess.

## Step 0 — Resolve paths

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

Paths: SPEC=`<root>SPEC.md`, SPEC_DIR=`<root>SPEC/`, template=`<root>templates/tasknote-template.md`, PLAN=`.flaitron/PLAN.md`, tasknote dir=`.flaitron/tasknote/`.

UNATTENDED (shared `--unattended` fragment, owned by `/ft-task`): `<root>claude/skills/ft-task/unattended-mode.md`.
SKILL_DIR (lazy fragment `unattended-close-epic.md` — this skill's own `--unattended` deltas): `<root>claude/skills/ft-close-epic/`.

After resolving, Read `<SPEC_DIR>/epic.md` for the canonical lifecycle before drafting anything.

**Parse the flag.** Split `args` on whitespace into `(AUDIT-SUBTASK-ID, rest...)`. Initialize `unattended-mode = false`; a `--unattended` token (no short alias) sets it true. Any unrecognized token → surface ``Unknown arg `<arg>`. Usage: `/ft-close-epic <AUDIT-SUBTASK-ID> [--unattended]`.`` and ask via AskUserQuestion whether the user meant `--unattended`, the default flow, or to abort. Do not proceed silently. This skill takes **no `--fast`** — there is none to pass.

When `unattended-mode = true`, Read `<SKILL_DIR>/unattended-close-epic.md`, `<UNATTENDED>`, `<SPEC_DIR>/gate-postures.md`, and `<SPEC_DIR>/blocked.md` now — the first carries this skill's own `--unattended` clauses, the second the posture's executable steps, the third its contract. Start at the fragment's §"Step 0 — Activation marker and what differs"; each step below points back to its own section.

## Step 1 — Pre-flight

- `.flaitron/PLAN.md` must exist (cwd is a flaitron-adopting project or flaitron itself).
- Parse `args` as `<AREA>-<NUMBER>.<SUB>` (where `.<SUB>` is a number or the reserved literal `.N` — both parse per SPEC §"Task ID convention"):
  - **Area** resolves by reading the `.flaitron/tasknote/README.md` §"Archive layout" table — every prefix, canonical ones included; `<area>` is **never derived from the ID** (SPEC §"Task ID convention"). No row for this prefix → stop and ask; do not guess a folder.
  - **`.<SUB>` segment is required** — `/ft-close-epic` only runs against epic subtasks, not standalone tasks. If the ID matches `<AREA>-<NUMBER>` (no `.<SUB>` suffix), stop and tell the user "`/ft-close-epic` runs against the audit `.N` subtask of an epic, not a standalone task. Use `/ft-task <ID>` for standalone tasks."
- Check `<tasknote dir>/<AUDIT-SUBTASK-ID>.md` (this check runs ahead of the foreign-dirt gate, so an uncommitted audit note is refused here rather than stopped as dirt):
  - If the file already exists with `status: in-progress`, stop and tell the user the audit tasknote is already in flight. Recommend continuing conversationally (e.g., "continue CORE-057.6") rather than restarting — this skill is start-only by design.
  - If it exists with any other status (`blocked`, `starter`, or unrecognized), stop and surface it: this skill never overwrites a live note. A `blocked` note resumes and a `starter` promotes through `/ft-task <AUDIT-SUBTASK-ID>`.
  - If `<tasknote dir>/archive/<area>/<AUDIT-SUBTASK-ID>.md` already exists, the audit is closed and archived; stop and surface the conflict.
- **Foreign-dirt gate (paper-complete guard).** Before scaffold writes, run `git status --porcelain`. If non-empty: **STOP**, surface the dirt list, ask the operator to commit / stash / discard themselves, then re-invoke. Do not auto-clean. See SPEC §"Paper-complete guard". **`--unattended` does not relax this** — it terminates and writes nothing, per the fragment's §"Steps 1-2 — Pre-scaffold stops".
- Otherwise (fresh scaffold path), continue.

**Pre-scaffold stops under `--unattended`.** Every bail in Steps 1-2 fires before the audit tasknote exists, so each terminates and **writes nothing** — shape and closed `<cause>` set in the fragment's §"Steps 1-2 — Pre-scaffold stops". The skill/pin guard's own `⏸` form is the exception: it can fire after a write and names what was written.

## Step 2 — Validate audit position and check sibling state

Read `.flaitron/PLAN.md`. Locate the parent epic ID by stripping the `.<SUB>` suffix and looking for `<AREA>-EPIC-<NUMBER>`:

- If no parent epic line is found in PLAN.md (active OR `## Completed`), stop and tell the user no parent epic `<AREA>-EPIC-<NUMBER>` exists for the given audit ID. The audit subtask must be filed under a parent epic via `/ft-epic-discovery`.
- If the parent epic line lives under `## Completed`, stop and surface the conflict — the parent has already been closed.

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

> Verify the completed `<AREA>-EPIC-<NUMBER>` (`<shortname>`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

**Acceptance (parameterized; the first criterion is the fixed doc-drift line per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" and is non-negotiable):**

```markdown
- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `<AREA>-EPIC-<NUMBER>` (Step 5), landing in the audit's closure commit
- [ ] Single `feat: <AUDIT-SUBTASK-ID> — audit <AREA>-EPIC-<NUMBER>` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `<AUDIT-SUBTASK-ID>` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flaitron/tasknote/archive/<area>/<AUDIT-SUBTASK-ID>.md`
```

**Subtasks (parameterized):**

```markdown
- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [ ] Phase 4: flip `<AUDIT-SUBTASK-ID>` PLAN line to stub form + archive tasknote
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
- **Implemented the minimal solution** — for most audits this is verification work, not code edits: walk the cohort coherence checklist (Acceptance criteria 2-4), record findings as Implementation Notes. If the audit surfaces a fix that's small and clearly in scope (e.g., a stale path reference in a sibling's deliverable), apply it inline. Larger misses → file each as a `- [ ]` child row of the epic: the next `.<k>` after the highest numeric child, 2-space nested before `.N`, with `[model]`, `| shortname`, and a long description under the 50w target / 70w cap (SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds"). The rows land in the audit's closure commit, and an open child keeps the parent open until the last one closes (SPEC/epic.md lifecycle step 5).
- **Updated/added tests** — N/A unless the audit applied a code fix.

Capture in Implementation Notes:

- Cohort children inventoried (one bullet per child summarizing its deliverable).
- Coherence findings ("no inconsistencies surfaced" or specific surfaced issues).
- Any inline fixes applied (file:line + diff shape).
- Misses filed as child rows (one bullet per row: ID + one-line rationale).

Phase 2 flows continuously into the Step 6 lint/test pass and Step 7 closure ops without an intermediate gate; the next operator-gate cue is the 📦 ready-to-commit banner in Step 9.

## Step 6 — Drive Phase 3: Testing & Linting

Markdown-prose verification only for most audits — no test surface. If the audit applied an inline fix, run lint/type-check on changed files and grade that fix through the **External review** box; otherwise tick all five Phase 3 boxes (test suite N/A, lint N/A, receipt N/A, External review N/A, frontend N/A — capture rationale in Testing Notes).

## Step 7 — Drive Phase 4: Closure (audit subtask, auto-run)

Walk the Phase 4 checklist for the audit subtask itself under SPEC §"Paper-complete guard". **No banner here** — closure ops auto-run; the recap drafted at the end bundles into Step 9's 📦 gate. Flip only when ready to proceed to the atomic commit in Step 9; flip **only the audit subtask line** here (the parent flip runs in Step 9's post-closure protocol — not collateral).

- **Doc-drift sweep (fixed line)** — for each entry in `<tasknote dir>/README.md` §"AI-referenced docs", state per-entry verdict ("no change" or the specific update). This is the contractually-required sweep per `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line"; never skip.
- **Tick through `## ✅ Acceptance`** — tick every criterion the audit satisfied; annotate any it did not (`N/A` / not-met with a one-line reason). Never leave a box silently unticked. Do **not** flip the markdown nav chip to `✅ Completed` — that write was retired by CORE-042.4 and the chip is render-derived from YAML (SPEC §"🚀 Phase 4: Closure").
- **Flip the audit's PLAN.md line to stub form** — `- [x] **<AUDIT-SUBTASK-ID>** [<model>] | <shortname> audit — Completed YYYY-MM-DD.` per SPEC/plan-filing.md §"`## Completed` archive convention". Keep nested under `<AREA>-EPIC-<NUMBER>` in its current `## <Priority>` section (the parent and cohort move in Step 9, when every child is `[x]`). **Epics filed before CORE-418 carry a bare `| audit` placeholder — replace it with `| <parent-epic-shortname> audit`, do not preserve it.** `| shortname` is required so visualizers have a row title, and a row reading only "audit" is untitled once several epics have closed.
- **Flip the audit tasknote's YAML `status:`** — `in-progress` → `completed`, before the move — a lifecycle write, not a retroactive edit (SPEC §"Tasknote frontmatter" → "Write-once does not cover lifecycle writes").
- **Stamp the audit tasknote** — set its body `**Archived:** YYYY-MM-DD` line to today's date, before the move.
- **Verify, then move** — immediately before the `git mv`, check mechanically rather than by recollection: `grep -q '^status: completed$' <tasknote dir>/<AUDIT-SUBTASK-ID>.md` succeeds, `awk '/^## ✅ Acceptance/{a=1;next} a&&/^## /{a=0} a' <tasknote dir>/<AUDIT-SUBTASK-ID>.md | grep -E '^ *- \[ \]' | grep -viE 'N/A|not[ -]met'` prints nothing, and `grep -qE '^\*\*Archived:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}$' <tasknote dir>/<AUDIT-SUBTASK-ID>.md` succeeds. Same three checks as `/ft-task`'s pre-move gate and `/ft-release` §7.1 Pair P; a dirty result means one of the three closure writes above is still outstanding — fix it and re-run, never move on it. Applies identically under `--unattended`. Then `git mv <tasknote dir>/<AUDIT-SUBTASK-ID>.md <tasknote dir>/archive/<area>/<AUDIT-SUBTASK-ID>.md`.
- **Draft the recap** — leads with a 1-2 sentence plain-English summary (audit ran; key finding or "no inconsistencies surfaced"), then technical detail (cohort children inventoried, follow-ups to file, any inline fixes applied). Hold it for Step 9's 📦 bundle; do not surface a banner now.

**Under `--unattended` this step is unchanged** — the audit's own closure has nothing an operator must answer.

## Step 8 — Open-children check (no banner)

After the audit closes cleanly, scan `.flaitron/PLAN.md` for the parent epic line + all its children:

- All children `[x]` (including the audit just closed) → nothing to do here; Step 9's post-closure protocol flips the parent (`SPEC/plan-filing.md` §"Epic parent flip").
- Any child `[ ]` (miss rows filed in Step 5, or an early audit past Step 2's gate) → the parent stays open. Note the open children for a heads-up in Step 9's closure review. The closure of the last open child flips the parent, whichever runner makes it.

## Step 9 — Post-closure protocol

**Read `<SPEC_DIR>/post-closure.md` now** — the protocol is a lazy module, loaded here and nowhere earlier — then run it, branching on SPEC/gates.md §"Conditional skip rule" against the audit closure diff. Its epic-parent-flip pre-step runs before staging, so the flip lands in the audit's closure commit. **Under `--unattended`** the 📦 gate is force-skipped (no operator to wait on), and a destructive inline fix parks at Step 5 rather than reaching this step: fragment §"Step 9 — Post-closure protocol".

- **Skip branch** (signals clear) — emit `✅ Closure complete; committing autonomously (<concrete-signal-summary>).` (e.g., `audit closure: PLAN.md flip + parent flip + tasknote archive; no privileged-ops surface`), then run closure review + recap + commit + 🏁 + suggest-next-move + copy-paste in one response. Heads-up listing of open children (Step 8) delivers inline alongside the closure review.
- **Fire branch** (privileged-ops signal hits) — surface the bundled 📦 ready-to-commit gate (per `SPEC/post-closure.md` step 1) and **wait**. Do **not** emit 🏁, next-move, or the copy-paste line in this turn. The commit message is `feat: <AUDIT-SUBTASK-ID> — audit <AREA>-EPIC-<NUMBER>` (or `chore: ...` if no code edits landed).

On commit (either branch): stage audit deliverables + PLAN/archive together, the parent flip riding in PLAN.md when it ran; emit 🏁 only after a real deliverable-covering SHA (SPEC §"Paper-complete guard") — never invent a SHA.

Skill-specific next-move shape:
- Candidates: run `SPEC/post-closure.md` step 2 as written — the fresh PLAN.md re-read, the open-section verification, and the emoji-primary-label + `model @ effort` pick print (read the full task line, `[model]` included, to pick the label). This skill's branches:
  - Misses filed → suggest the first filed child (`/ft-task <ID>`); the last one's closure flips the parent.
  - No misses + parent flipped + next task queued in PLAN.md → suggest that task (next epic or standalone).
  - No misses + parent flipped + PLAN.md empty of queued tasks → step 2's **PLAN exhausted (terminal)** form: stop, don't invent a next move; offer to file a new epic in this session before clearing.
  - No misses + children still open (early audit) → suggest the next open child; its closure, when it is the last, flips the parent.
- Copy-paste helper: run `SPEC/post-closure.md` step 3 as written — the glyph and pick copied from the chosen candidate line, the own-line inline-code invocation with no trailing punctuation, and the 👇 `Run in this session:` exception. The terminal branch emits no copy-paste line. The invocation line is `` `/<next-skill> <ID>` ``.

## Notes

- **Bracket twin of `/ft-epic-discovery`.** `/ft-epic-discovery` opens an epic (files parent + `.1` + `.N`, drives `.1` Discovery); `/ft-close-epic` closes it (drives audit `.N`, whose closure flips the parent). Together they bracket `SPEC/epic.md` lifecycle steps 1-2 and 4-5; `/ft-task` runs the implementation children (step 3).
- **Audit-only — never standalone.** Validates arg is the parent epic's audit child — the reserved `.N` suffix (canonical) or the highest numeric `.<SUB>` (legacy). Standalone tasks → `/ft-task <ID>`.
- **Open-children warn-and-proceed.** Sibling implementation children still open → skill warns and asks (default No bails). Useful for early audits when a child is stuck or deferred.
- **Audit follow-ups are filed before closure.** Each miss becomes an open child row in the audit's own closure commit, under the 50w/70w cap. That keeps the parent open, so the auto-flip waits for the follow-ups instead of closing the epic over them.
- **Parent flip is automatic.** No prompt in any posture: the closure that leaves every child `[x]` flips the parent and moves the cohort in its own closure commit (`SPEC/plan-filing.md` §"Epic parent flip"). The move is reversible markdown, visible in the closure diff.
- **`--unattended` is the only flag.** No `--fast` (the epic skills never took one, so there is nothing to be a superset of) and no `--debug`. Contract: SPEC/gate-postures.md §"`/ft-close-epic` under the posture". `/ft-epic-discovery` accepts neither — opening an epic is a scoping conversation, and there is nobody to have it with.
- **Auto-wired into adopters.** Symlinked via `claude/skills/ft-new-project/` + `docs/MIGRATION.md` §1.2 + `claude/AGENTS-snippet.md`'s symlink section. Existing adopters pick up on next flaitron version bump.
