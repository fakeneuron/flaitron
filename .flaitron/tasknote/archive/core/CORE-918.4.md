---
title: codex-closure-none
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-918, CORE-918.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/procedures/ft-task.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-918.4 | codex-closure-none

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-918]]

## 🎯 Goal

Make step 5 of the Codex closure procedure (`SPEC/procedures/ft-task.md`, the PLAN flip) tell a closure to put `(none)` back under any section the move leaves empty, pointing at `SPEC/plan-filing.md` §"Empty-section placeholder", without growing the file.

## ✅ Acceptance

- [x] Step 5's PLAN-flip item carries the clause and the pointer — `grep -q 'Empty-section placeholder' SPEC/procedures/ft-task.md`
- [x] The file does not grow (hold its size) — `test "$(wc -c < SPEC/procedures/ft-task.md)" -le 24766`
- [x] Pointer cites a section that resolves — `bash tools/drift-checks.sh pair_q`
- [x] No drift check or budget regresses — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the clause + pointer to Phase 4 item 5 in `SPEC/procedures/ft-task.md` step 5
- [x] Trim restated clauses in step 5 (item 5's cohort tail, item 4's "in the same commit", the closing banner tail) to net ≤ 0 bytes
- [x] Run the drift checks and `just check`

## 🔗 Related

- [[CORE-EPIC-918]] — parent epic
- [[CORE-918.2]] — predecessor: the same clause in `SPEC.md` and the tasknote template

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** step 5 item 5 of `SPEC/procedures/ft-task.md` lacks the clause; `SPEC.md:471` and the template carry it (CORE-918.2); `SPEC/plan-filing.md` §"Empty-section placeholder" exists. No drift.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — `N/A`, one wording clause in a markdown contract; no module boundary

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Area `core` (README table). Archive skim: `CORE-918.2` (the sibling edit; filed this task from its External review), `CORE-918.3` (the check). No other archived note touches this file for 918.
- Size: file is 24,766 of its 26,000 cap (already past the 95% NEAR CAP line, 24,700). Task says hold size, so the clause (~135 chars) is offset by trims in step 5: item 5's "until the closure that leaves every child `[x]` moves the cohort" (the `epic.md` pointer already owns it), item 4's "in the same commit", and the closing banner's "and the next-task suggestion lands after the commit" (`post-closure.md` owns it). No drift check binds those phrases (`grep` of `tools/drift-checks.sh`).
- Pointer shape: the procedure file uses plain links (no "see … if unclear"), so the clause links `SPEC/plan-filing.md` §"Empty-section placeholder" as `../plan-filing.md`.
- No clarifications needed. Assumption: wording mirrors CORE-918.2's "a section this move leaves empty gets its `(none)` back".
- Phase 1 verdict Proceed → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, wording-only change

**Implementation Notes:**

Pattern survey: step 5 already cites SPEC owners by plain link after each rule, so the clause follows that shape, placed after the epic-child placement sentence (mirrors CORE-918.2's "after the placement parenthetical"). No refactor. No test added: markdown contract wording, covered by `pair_q` (cited heading resolves) and the budget check.
Diff: `SPEC/procedures/ft-task.md` +7/-7 (24,766 → 24,763 bytes). Trims: item 5's "until the closure that leaves every child `[x]` moves the cohort" (owned by the linked `SPEC/epic.md` section), item 4's "in the same commit" (the Phase 4 preface already requires the one atomic commit), the banner line's "and the next-task suggestion lands after the commit" (owned by `SPEC/post-closure.md`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no rendered surface (markdown contract edit)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (all from the repo root):
- `grep -q 'Empty-section placeholder' SPEC/procedures/ft-task.md` → 0
- `test "$(wc -c < SPEC/procedures/ft-task.md)" -le 24766` → 0 (24,763)
- `bash tools/drift-checks.sh pair_q` → 0 (`pair_q ok`)
- `bash tools/drift-checks.sh` → 0
- `just check` → 0 (viz test/typecheck/lint/build, updater tests, drift self-test, drift checks)

External review (`/code-review medium`, a non-author context, scoped to the working-tree diff): no blocker; three nits.
- Item 5's trim leaves "an epic child stays nested under its parent" without the last-child cohort move. Accepted, not fixed: the linked `SPEC/epic.md` §"Child placement invariant" owns it, and restoring ~40 bytes would breach the hold-size bound.
- Item 4 lost "in the same commit". No action: Phase 4's preface already requires the one atomic closure commit and `SPEC/superseded-claims.md` states it.
- Banner line lost the next-task-suggestion clause. No action: `SPEC/post-closure.md` owns the ordering.
Visual: no rendered surface — 👁️ box `N/A`; no ask.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — swept the AI-referenced docs by grep for the Closed-line / PLAN-flip wording: `SPEC.md` and the template already carry the clause (CORE-918.2); `SPEC/plan-filing.md` owns the rule; `claude/skills/ft-release/SKILL.md` restates only its own release flow. No change. The `docs/CONTEXT-BUDGET.md` ledger figure for this file (24,896) is hand-refreshed by `/ft-release` §7.1, outside `touches:`

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — `SPEC/procedures/ft-task.md` (+7/-7, 24,766 → 24,763 bytes); `just check` → 0; no refactor; `touches:` matches `git diff --name-only` plus this note and PLAN.md; the Codex closure procedure now states the `(none)` rule the other two Closed-line sites carry

- [x] **Learnings** — `N/A`; the rule already lives in `SPEC/plan-filing.md`, this only surfaces it at the third closure site.

**Final Summary:**

Added "a section this move leaves empty gets its `(none)` back" with a link to `SPEC/plan-filing.md` §"Empty-section placeholder" to step 5 item 5 of `SPEC/procedures/ft-task.md`, mirroring CORE-918.2's Closed-line clause. Offset it with three trims in step 5 (epic-cohort tail, "in the same commit", the next-task clause), each owned by a linked module, so the file went 24,766 → 24,763 bytes. `just check` passes; the External review found three nits, none blocking.

**Archived:** 2026-11-24
