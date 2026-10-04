---
title: procedures-postures-headroom
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-631, CORE-631.2, CORE-631.N, CORE-555, CORE-558.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/CONTEXT-BUDGET.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-631.3 | procedures-postures-headroom

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-631]]

## 🎯 Goal

Re-measure the working unit for `SPEC/procedures/ft-task.md` and `SPEC/gate-postures.md` from their touching commits since each `docs/CONTEXT-BUDGET.md` row was set, then for each file either trim to ≥ 1.5 units under its cap or record a justified raise in its ledger row, the way CORE-555 / CORE-558.5 did.

## ✅ Acceptance

- [x] A1 Both caps unchanged — `grep -q '^| `SPEC/gate-postures.md` | 23,000 |' docs/CONTEXT-BUDGET.md && grep -q '^| `SPEC/procedures/ft-task.md` | 38,000 |' docs/CONTEXT-BUDGET.md`
- [x] A2 Each of the two rows' "Why this number" cell records the re-measurement (measured unit, the commits it came from, headroom in units) and cites this task — `grep -E '^\| `SPEC/(gate-postures|procedures/ft-task)\.md`' docs/CONTEXT-BUDGET.md | grep -c 'CORE-631.3'` → `2`
- [x] A3 Every `drift` CI step green locally on the edited tree (Context budget, source-fence checks, ten pairs, final newline) — extract each `run: |` block from `.github/workflows/ci.yml`, run under `bash -e`
- [x] A4 §Ledger stamp untouched (CORE-556.2 rule: caps/provenance in-task, measurements at release) — `grep -q '^Measured 2026-09-20 at v5.30.0, refreshed by \[\[CORE-629\]\]' docs/CONTEXT-BUDGET.md`
- [x] A5 Neither budgeted file is edited — `git diff --name-only | grep -cE 'SPEC/(gate-postures|procedures/ft-task)\.md'` → `0`
- [x] A6 The two cells read as provenance in the CORE-555 / CORE-558.5 voice (why the number, what was measured, what would trip it) — `judgment`, read both rows against the `SPEC.md` row

## 🧩 Subtasks

- [x] S1 Rewrite the `SPEC/gate-postures.md` row's "Why" cell: keep the split provenance, replace the bare "~1.5 working units" claim with the measured posture unit (+1,438 / +419 / +1,383), where it was measured, the headroom in units at HEAD, and the n=3 caveat
- [x] S2 Rewrite the `SPEC/procedures/ft-task.md` row's "Why" cell the same way: the 25-commit steady-state band (+524 to +892), the three pre-propagation catch-ups as the exception that would trip it, headroom in units at HEAD
- [x] S3 Run the CI `drift` job's steps locally; verify A1–A6

## 🔗 Related

- [[CORE-EPIC-631]] — parent epic (budget-headroom); Discovery supplied by audit-repo 2026-09-20, no `.1` sibling
- [[CORE-631.2]] — sibling child (lifted-pairs-single-body; `ft-release/**` headroom, closed 2026-09-20)
- [[CORE-631.N]] — epic closure audit
- [[CORE-555]] — precedent: justified cap raise recorded in a `docs/CONTEXT-BUDGET.md` row
- [[CORE-558.5]] — precedent: justified cap raise recorded in a `docs/CONTEXT-BUDGET.md` row

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN figures match HEAD exactly (`SPEC/procedures/ft-task.md` 35,933 / 38,000; `SPEC/gate-postures.md` 20,412 / 23,000). Both rows borrowed their working unit rather than measuring it — `gate-postures.md` took CORE-555's ~2.5k whole-file `gates.md` unit (CORE-604.2 Discovery §E); the SOP row was accepted "pre-sized by the filer" (CORE-608), implying ~2,290 — so the "under one working unit" finding is real *by the rows' own sizing*, and the task's first clause (re-measure) is the deciding step. Whether the measured unit then calls for a trim, a raise, or a recorded re-measurement is an operator choice (Clarify below).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Sizes (HEAD af4eb7c).** `SPEC/procedures/ft-task.md` 35,933 / 38,000 (headroom 2,067). `SPEC/gate-postures.md` 20,412 / 23,000 (headroom 2,588). `docs/CONTEXT-BUDGET.md` 18,991 (unbudgeted).
- **How each row was sized.** `gate-postures.md` 23,000 = 19,029 at split + ~1.5 × the ≈2.5k unit CORE-555 measured on *whole-file* `gates.md` (CORE-604.2 Discovery §E: "the measured unit on this material is ≈ 2.5k") → implied unit ≈ 2,647. `procedures/ft-task.md` 38,000 = 34,565 + ~1.5 units, accepted by CORE-608 as "pre-sized by the filer" with no measurement of this file's own history → implied unit ≈ 2,290.
- **Re-measured unit — `gate-postures.md`.** Only one touching commit since the row was set (CORE-617, +1,383), so the sample was extended by measuring the posture sections *inside* `gates.md` per commit between CORE-535.5 and the split (awk over `## Flag precedence` / `## \`--fast\`` / `## \`--unattended\`` through the next non-posture `##`): CORE-536 +1,438 · CORE-551 +97 · CORE-558.3 +419 · six others −14 to +14. Substantial posture edits run ≈ +1,400 (1,383 / 1,438); the borrowed 2.6k was CORE-536's whole-file +2,567, of which only +1,438 landed in the postures. Headroom 2,588 ≈ **1.8 units** by the file's own unit.
- **Re-measured unit — `procedures/ft-task.md`.** 63 touching commits total. Three large jumps — CORE-395 +4,760 (2026-08-02, `sop-currency-recheck`, first catch-up), CORE-473.4 +3,379 (2026-08-25, whole `--unattended` mode added), CORE-496 +1,977 (2026-08-29, `sop-ft-task-resync`, last catch-up) — predate per-commit propagation. Since CORE-496, 25 touching commits: substantial edits +524 to +892 (CORE-504 +892 · CORE-571 +865 · CORE-610.3 +698 · CORE-527 +688 · CORE-536 +615 · CORE-551 +583 · CORE-564 +570 · CORE-587 +570 · CORE-606 +524); routine +1 to +420; one −688 (CORE-533 reverting CORE-527). Headroom 2,067 ≈ **2.3 units** at the +892 high end, ≈ 3.9 at the low. The borrowed ~2,290 exceeds every steady-state edit; only a new-mode addition (CORE-473.4 scale) would consume it in one task.
- **Archive skim** (18 notes name "working unit"; read the load-bearing four). CORE-555 — first raise; measured the unit (+2,567 substantial, +97–283 routine on `gates.md`), wrote the reason into the row's existing "Why" cell, did not touch the §Ledger stamp because only caps moved. CORE-558.5 — "Working unit, re-derived rather than inherited": re-measured per surface from `git log` byte deltas (`SPEC.md` 45 commits, +1,127 to +2,957), raised only where the measurement asked, left `gates.md` at 1.8 units ("a rounding difference from the intended two, not a defect"), and named an unmeasured raise "inventing a number the measurement does not ask for". CORE-556.2 — same squeeze on `ft-release` solved by extraction; rule "edit CONTEXT-BUDGET in-task only for cap changes; leave the ledger to the next `/ft-release`". CORE-604.2 / CORE-608 — the two rows' provenance (above). CORE-631.2 (sibling, today) — trimmed `ft-release/**` under its cap by making `ci.yml` the single body; cap untouched.
- **Best practices.** Doc-only task on `docs/CONTEXT-BUDGET.md` (+ possibly the two budgeted files). Touched responsibility: the Budgets table's "Why this number" cells, which already carry provenance with `[[wikilink]]` attribution — the CORE-555 / CORE-558.5 shape. The §Ledger figures for both files are release-refreshed and not touched here (CORE-556.2 rule). No refactor.
- **Clarification** (structured ask, answered): resolution = **record the re-measurement in each row, caps unchanged** — no trim, no raise. The PLAN line enumerated trim-or-raise as the outcomes; re-measurement shows the ≥ 1.5-unit condition already holds by each file's own unit, so the "trim to" clause is met with nothing to cut. Operator accepted the n=3 caveat on `gate-postures.md`.
- **Drift check.** PLAN figures (35,933 / 38,000 · 20,412 / 23,000) match HEAD; both precedent IDs exist in the archive; `SPEC/gate-postures.md`'s row text and `SPEC/procedures/ft-task.md`'s row text match the ledger lines read (44–50). No SPEC contract touched. Trim assessment: both files are contract prose with no ~1,400-byte block of duplication — a trim to 1.5 *borrowed* units would cut meaning, not fat.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, doc-only; the CI `drift` job's Context-budget step is the standing test and ran locally

**Implementation Notes:**

- **Pattern survey.** Extended the existing cell shape — every Budgets row's "Why this number" cell already carries provenance with `[[wikilink]]` attribution, and CORE-555 / CORE-558.5 wrote their recalibration reasons into the same cells rather than into new prose. Each of the two cells gains one run of sentences: how the original unit was arrived at (borrowed, from where), what was re-measured and from which commits, the headroom in measured units at HEAD, and the condition that would trip the cap next. No new section, no cap change, no ledger touch.
- **Refactor gate.** None. The §Ledger stamp and the lazy-module figures stay release-owned (CORE-556.2 rule); neither budgeted file is edited.
- Diff: `docs/CONTEXT-BUDGET.md` 2 insertions / 2 deletions (two table rows), 18,991 → 20,474 bytes (unbudgeted file).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — all 14 named `drift` CI steps extracted from `ci.yml` and run under `bash -e`

- [x] Ran lint/type-check on changed code — Final-newline drift step + Pair Q citation resolution green; every new `[[CORE-*]]` in the diff resolves to an archived note (this task's own ID resolves at archive)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — no rendered surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `grep -q '^| `SPEC/gate-postures.md` | 23,000 |' … && grep -q '^| `SPEC/procedures/ft-task.md` | 38,000 |' …` → exit 0
- A2 `grep -E '^\| `SPEC/(gate-postures|procedures/ft-task)\.md`' docs/CONTEXT-BUDGET.md | grep -c 'CORE-631.3'` → `2`
- A3 14/14 `drift` steps `ok` under `bash -e` (Wrapper-name · Shipped-skill parity · Context budget · Final newline · Pairs A B C H J M N O P Q) → exit 0 each
- A4 `grep -q '^Measured 2026-09-20 at v5.30.0, refreshed by \[\[CORE-629\]\]' docs/CONTEXT-BUDGET.md` → exit 0
- A5 `git diff --name-only | grep -cE 'SPEC/(gate-postures|procedures/ft-task)\.md'` → `0`
- A6 judgment: both cells read against the `SPEC.md` row — each names the sizing origin, the measurement (commits + deltas), the headroom in units, and the trip condition; the `gate-postures.md` cell carries its n=3 caveat explicitly.
- Structural: no duplication (each measurement is stated once, in its own row); no dead text (the original "~1.5 working units" sentences are kept as the provenance they are and qualified, not repeated); no public-surface growth; `docs/CONTEXT-BUDGET.md` is unbudgeted and deliberately off the doc-drift sweep list.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"): every entry — SPEC.md, SPEC/epic.md, docs/VISION.md, README.md, AGENTS.md, docs/MIGRATION.md, the four AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, SPEC/scope-boundaries.md — **no change** (none restates either cap or a working unit; `docs/CONTEXT-BUDGET.md` is off the list by its own §"Not on the doc-drift sweep list").

Re-measured the working unit for both budgeted surfaces from their own commit histories instead of the units their rows had borrowed. `SPEC/gate-postures.md`'s posture material, measured per commit inside `gates.md` from CORE-535.5 to the split and in its own file since, moves ≈ +1,400 per substantial edit (CORE-536 +1,438, CORE-617 +1,383) — not the ≈2.5k whole-file `gates.md` unit CORE-604.2 sized it with — so its 2,588 of headroom is ~1.8 units. `SPEC/procedures/ft-task.md`, across the 25 touching commits since CORE-496's last catch-up resync, moves +524 to +892 per substantial edit — not the ~2,290 CORE-608 accepted as pre-sized — so its 2,067 of headroom is ~2.3 units. Both caps therefore stand unchanged (23,000 / 38,000); each row's "Why this number" cell now records the measurement, the commits it came from, and what would trip the cap next (a fourth ~1.4k posture edit; a new mode at CORE-473.4's +3,379 scale), the CORE-555 / CORE-558.5 shape. No trim was needed and none was made — both files are contract prose with no ~1,400-byte block of duplication; a trim to 1.5 *borrowed* units would have cut meaning to meet a unit the files' own histories do not support.

- Changed (1 file): `docs/CONTEXT-BUDGET.md`, 2 table rows rewritten (+2/−2 lines, 18,991 → 20,474 bytes; unbudgeted).
- Verification: A1–A6 receipts above; all 14 `drift` CI steps green locally.
- Refactors: none. Deferred: none.
- `touches:` reconciliation: `git diff --name-only` = `docs/CONTEXT-BUDGET.md` = the one declared path; no undeclared paths.
- Maintainability effect: the two rows' headroom claims are now falsifiable against a stated unit and sample, and the next task that touches either file can read in the row itself whether it is the one that should trim or extract — instead of re-deriving the unit or inheriting one from a different file, which is how both rows came to overstate the squeeze in the first place.

**Archived:** 2026-09-20
