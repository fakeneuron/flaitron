---
title: closure-none-clause
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-918, CORE-918.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC.md
  - templates/tasknote-template.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-918.2 | closure-none-clause

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-918]]

## 🎯 Goal

Make the Phase 4 Closed line tell a closure to put `(none)` back under any PLAN.md section the move leaves empty, pointing at `SPEC/plan-filing.md` §"Empty-section placeholder", in both `SPEC.md` and `templates/tasknote-template.md`.

## ✅ Acceptance

- [x] `SPEC.md` Phase 4 Closed line carries the clause and the pointer — `grep -q 'Empty-section placeholder' SPEC.md`
- [x] `templates/tasknote-template.md` Closed line carries the same clause and pointer — `grep -q 'Empty-section placeholder' templates/tasknote-template.md`
- [x] Pointer cites a section that resolves — `bash tools/drift-checks.sh pair_q`
- [x] No drift check or budget regresses — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Edit the Closed line in `SPEC.md` §"🚀 Phase 4: Closure"
- [x] Edit the Closed line in `templates/tasknote-template.md`
- [x] Run the drift checks and its test suite

## 🔗 Related

- [[CORE-EPIC-918]] — parent epic
- [[CORE-918.3]] — follow-up: drift check for blank PLAN.md sections

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** the Closed lines in `SPEC.md` and `templates/tasknote-template.md` lack the clause; `SPEC/plan-filing.md` §"Empty-section placeholder" exists and carries the rule. No drift.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Closed line sites: `SPEC.md` (Phase 4 checklist), `templates/tasknote-template.md` line 99. The micro template has no Closed line; `claude/skills/ft-task/SKILL.md` Phase 4 defers to SPEC, so it is out of scope.
- Binding pair: `grep` of `tools/drift-checks.sh` finds no check that compares the two Closed lines byte-for-byte; Pair Q checks that the cited section resolves, so the pointer must name `SPEC/plan-filing.md` and the heading `Empty-section placeholder` (exists at plan-filing.md:426).
- Budget: `SPEC.md` 43,842 of 48,000; the clause adds roughly 200 chars. The ledger figures in `docs/CONTEXT-BUDGET.md` are outside `touches:` and are re-measured by their own tasks.
- Archive skim: `archive/core/` has no tasknote touching these Closed lines for CORE-918; no prior tasknotes in scope.
- No clarifications needed (--unattended). Assumption: the clause goes right after the placement parenthetical, before "then tasknote moved".
- CORE-605 (archived) deliberately softened both Closed-line pointers to "see X if unclear" so they are not a required load of `plan-filing.md`; the new pointer keeps that shape (no leading "per").
- Size estimate: ~4 lines (rename-aware)
- Phase 1 verdict Proceed → skip 🛠️.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, wording-only change

**Implementation Notes:**

Pattern survey: both Closed lines already carry a placement parenthetical plus a "see X if unclear" pointer (CORE-605); the clause follows that shape in both files, after the parenthetical, before "then tasknote moved". No refactor. No test added: markdown contract wording, covered by the existing drift checks (`pair_q` resolves the cited heading).
Diff: `SPEC.md` 1 line, `templates/tasknote-template.md` 1 line.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no rendered surface (markdown contract edit)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Full validation set (`--unattended`): `just check` → exit 0 (viz test, typecheck, lint, build; update-adopters tests and syntax checks; `node --test tools/drift-checks.test.mjs`; `bash tools/drift-checks.sh`, `context_budget ok`, `pair_q ok`). Re-run after the review fix: exit 0.
Acceptance:
- `grep -q 'Empty-section placeholder' SPEC.md` → 0
- `grep -q 'Empty-section placeholder' templates/tasknote-template.md` → 0
- `bash tools/drift-checks.sh pair_q` → pair_q ok (inside `just check`)
- `bash tools/drift-checks.sh` → 0 (inside `just check`)
Scope guardrails: paths = `SPEC.md`, `templates/tasknote-template.md`, this note (all in scope or workflow); size 2 added + 2 deleted lines against the 400 cap.

External review (`/code-review medium`, a non-author context): one finding on this diff, a nit — the two Closed lines placed the clause differently (SPEC.md after the parenthetical, template inside it). Fixed: the template now matches SPEC.md's structure. The review's other three findings sit in `.github/workflows/arch-health.yml`, `AGENTS.md` and `tools/update-adopters.mjs`, files this task does not touch (the reviewer's range reached earlier commits); recorded here, not acted on. The review also noted `docs/CONTEXT-BUDGET.md` still lists `SPEC.md` 43,842 and the template 3,993 (now 43,991 and 4,119). That ledger is hand-refreshed by `/ft-release` §7.1 and outside `touches:`, so it is left.
Visual: no rendered surface — 👁️ box `N/A`; no ask, no park.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — swept the AI-referenced docs by grep for the Closed-line wording: only `SPEC.md` and the template restate it (edited). One mirror outside the list and outside `touches:`: `SPEC/procedures/ft-task.md` step 5 (the Codex closure procedure) lacks the clause; filed as CORE-918.4. `docs/CONTEXT-BUDGET.md` ledger figures are owned by `/ft-release`; no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — `SPEC.md` (+1/-1), `templates/tasknote-template.md` (+1/-1); `just check` → 0; no refactor; `touches:` matches `git diff --name-only` exactly; the Closed line now states the `(none)` rule that earlier closures applied unevenly

- [x] **Learnings** — `N/A`; the rule was already in `SPEC/plan-filing.md`, and this task only surfaces it on the Closed line.

**Final Summary:**

Added "a section this move leaves empty gets its `(none)` back" with a "see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear" pointer to the Phase 4 Closed line in `SPEC.md` and `templates/tasknote-template.md`, matching placement in both. Full `just check` passes. The External review nit on mismatched placement was fixed. Follow-up filed as CORE-918.4 for the Codex closure procedure.

unattended-candidates: none

**Archived:** 2026-11-24
