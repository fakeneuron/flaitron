---
title: budget-near-cap-report
status: completed
tags: [drift-checks, context-budget]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-869, CORE-869.2, CORE-869.5]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONTEXT-BUDGET.md
---

# CORE-869.3 | budget-near-cap-report

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-869]]

## 🎯 Goal

`context_budget` prints a non-failing `NEAR CAP` line for any surface at or above 95% of its Budgets-table row, so headroom erosion shows before the check fails.

## ✅ Acceptance

- [x] A surface at 95% up to and including 100% of its row prints `NEAR CAP  <surface>  <size> of <budget> (<pct>%)`, in the exact-row, glob-row and `/**` directory-total shapes — `node --test tools/drift-checks.test.mjs`
- [x] The line never fails the check; an over-cap surface still prints only `OVER BUDGET` — same test run
- [x] Live tree still passes and names the five surfaces 869.5 lists — `bash tools/drift-checks.sh context_budget` exits 0
- [x] Full drift scan passes — `bash tools/drift-checks.sh`
- [x] `docs/CONTEXT-BUDGET.md` "How this is enforced" mentions the line — `grep -q 'NEAR CAP' docs/CONTEXT-BUDGET.md`

## 🧩 Subtasks

- [x] Add the 95% report to all three compare sites in `context_budget`
- [x] Add a fixture self-test covering the three row shapes, the 95% boundary, the cap boundary and the over-cap case
- [x] One sentence in `docs/CONTEXT-BUDGET.md` §"How this is enforced"

## 🔗 Related

- [[CORE-EPIC-869]] — parent epic (carrying-cost).
- [[CORE-869.5]] — the follow-up that trims the surfaces this report names.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `context_budget` only prints on failure; at-cap surfaces are invisible until they trip. Live run shows five surfaces at 97-99% of their rows, so the report has something to say today.

- [x] Read relevant source files — `tools/drift-checks.sh` (header shape rules, `context_budget`, dispatcher), `tools/drift-checks.test.mjs` (CASES, fixture describes), `docs/CONTEXT-BUDGET.md` §"Budgets" and §"How this is enforced".

- [x] **Best Practices Review** — extends the existing function in place. The header forbids a non-check helper function, so the 95% test is repeated inline at the three compare sites rather than shared.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). CORE-869.2 (same files; one-function-per-check shape kept). No other hit on `context_budget`'s body.

- [x] **Drift check** — PLAN line, function and test shape match current code. The `step-7.1-standing-checks.md` finding text is left alone: `claude/skills/ft-release/**` sits at 97% of its directory row, so adding bytes there works against the epic; 869.5 owns that surface.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumptions: the threshold is hard-coded at 95% (the PLAN line states it, and the budget doc restates no number); the line is informational on stdout only.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `context_budget` in place; test follows the isolated-fixture `describe` shape used for `pair_p` and `installer_anchors`

- [x] **Minimal refactor gate** — none; `if/elif` replaces the one-line `||` compare at each site

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Integer arithmetic only (`sz * 100 >= budget * 95`), bash 3.2 safe. `$((sz))` strips the leading padding BSD `wc` adds, so the NEAR CAP line is clean on macOS and Linux. The CASES coverage tests are unaffected: no new check function.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0 (40 pass, incl. the 2 new)

- [x] Ran lint/type-check on changed code — `just check` (includes `typecheck`, `lint`, `build`) → 0

- [x] **Verification receipt** — see Testing Notes; no duplication or dead code introduced (the inline repeat at three sites is forced by the header's no-helper rule)

- [x] **External review** — `/code-review medium` over this task's diff: no blockers, six notes, handled below

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrails (before Phase 3 entry): paths = `docs/CONTEXT-BUDGET.md`, `tools/drift-checks.sh`, `tools/drift-checks.test.mjs` (all in `touches:`) plus this note; 54 lines added/deleted against the 400 cap.

Receipt (unattended full validation set, `just check`):

- `node --test tools/drift-checks.test.mjs` → 0 (40 pass, 0 fail)
- `bash tools/drift-checks.sh context_budget` → 0, prints five `NEAR CAP` lines (`SPEC/gate-postures.md` 99%, `SPEC/post-closure.md` 98%, `claude/skills/ft-open-epic/SKILL.md` 99%, `claude/skills/ft-release/**` 97%, `SPEC/procedures/ft-task.md` 99%) then `context_budget ok`
- `bash tools/drift-checks.sh` → 0, every check ok
- `grep -q 'NEAR CAP' docs/CONTEXT-BUDGET.md` → 0
- `just check` → 0 (122 updater tests, 40 drift tests, viz test/typecheck/lint/build, drift scan). An earlier run failed once on `--only limits the sweep…` in `tools/update-adopters.test.mjs:927`: the random temp-dir suffix began with `b`, so `ft-upd-only-b…` matched the `/only-b/` assertion. Not caused by this diff; a re-run passed. Filed as CORE-871.

External review (`/code-review medium`, no blocker):

- *step-7.1 does not mention `NEAR CAP`* — note, filed as CORE-870 (that directory is at 97% of its row, so the edit is out of this task's `touches:` and size-checked separately).
- *Block repeated at three sites* — declined: the file header forbids a non-check helper function (it would run as a check).
- *Zero-budget division* — declined: every Budgets row is a positive cap; a zero row is a table error the existing check does not guard either.
- *`OVER BUDGET` still prints the BSD-padded count* — declined: pre-existing line, left untouched (surgical); the test already allows the padding.
- *Test pins full output order* — declined: the glob and row order are deterministic and the exact string is the point of the test.
- *Truncated percentage, literal 95* — declined: truncation never overstates headroom, and the 95 is the PLAN row's stated threshold.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — AI-referenced docs checked for `context_budget` / `OVER BUDGET` mentions (`README.md`, `AGENTS.md`, `docs/`, `claude/CAPABILITIES.md`, `CONTRIBUTING.md`): none beyond `docs/CONTEXT-BUDGET.md` (updated in this task, not on the sweep list by design). The one stale reader, `step-7.1-standing-checks.md`, is out of scope and filed as CORE-870.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-06.` stub (nested under CORE-EPIC-869), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — `N/A`; nothing for the always-loaded layer

**Final Summary:**

`context_budget` now prints `NEAR CAP  <surface>  <size> of <budget> (<pct>%)` for any surface at or above 95% of its row and not over it, in the exact, glob and `/**` shapes; it never fails the check. On the live tree it names the five surfaces CORE-869.5 targets.

- Changed files: `tools/drift-checks.sh` (+8/-3), `tools/drift-checks.test.mjs` (+43, fixture test for the three row shapes and both boundaries), `docs/CONTEXT-BUDGET.md` (+3).
- `touches:` reconciliation: `git diff --name-only` matches the declared three paths exactly.
- Verification: `just check` → 0; drift scan prints `context_budget ok` with five NEAR CAP lines.
- Doc verdict: `docs/CONTEXT-BUDGET.md` updated; `step-7.1-standing-checks.md` follow-up filed as CORE-870.
- Maintainability effect: headroom erosion is visible on every push and release walk before it trips a cap. The 95% compare is repeated inline at three sites by the header's design.
- Filed follow-ups: CORE-870 (step-7.1 NEAR CAP clause), CORE-871 (flaky `only-b` assertion).
- unattended-candidates: CORE-871

**Archived:** 2026-11-06
