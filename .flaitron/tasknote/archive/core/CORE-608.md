---
title: procedures-sop-budget-row
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: []
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-608 | procedures-sop-budget-row

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Give `SPEC/procedures/ft-task.md` its own budget row in `docs/CONTEXT-BUDGET.md` and amend the "Not budgeted, deliberately" paragraph, since that file is the always-loaded runner body for Codex/Cursor/Grok tasks but currently sits unbudgeted under reasoning that only accounts for Claude's load path.

## ✅ Acceptance

- [ ] `docs/CONTEXT-BUDGET.md` Budgets table has a `SPEC/procedures/ft-task.md` row with a 38,000-char budget — `judgment` (visual grep of the table)
- [ ] The "Not budgeted, deliberately" paragraph no longer lists `SPEC/procedures/ft-task.md` among the excluded lazy modules, and the reasoning is amended to acknowledge non-Claude load paths — `judgment` (read the amended prose)
- [ ] Current measured size of `SPEC/procedures/ft-task.md` is under the new 38,000 budget — `wc -c SPEC/procedures/ft-task.md`

## 🧩 Subtasks

- [ ] Add `SPEC/procedures/ft-task.md` | 38,000 row to the Budgets table (file size + ~1.5 working units, per `gate-postures.md`'s sizing rule)
- [ ] Amend the "Not budgeted, deliberately" paragraph to remove `SPEC/procedures/` from the exclusion list and note it now carries its own row
- [ ] Update the Ledger's "Lazy `SPEC/` modules" line if it should cross-reference the new budgeted status (only if warranted — do not over-edit)

## 🔗 Related

Surfaced by `/ft-audit-repo` 2026-09-19 (Theme: Ratchet follows Claude's load path only).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `docs/CONTEXT-BUDGET.md` still exists as described, `SPEC/procedures/ft-task.md` still measures 34,565 chars (confirmed via `wc -c`, matches the PLAN.md line), and it is still absent from the Budgets table and named in the "Not budgeted, deliberately" paragraph. No drift.

- [x] Read relevant source files — read `docs/CONTEXT-BUDGET.md` in full (already loaded this turn) and confirmed `SPEC/procedures/ft-task.md`'s frontmatter (`procedure: ft-task`, `restates: SPEC.md`) as the always-loaded runner body for non-Claude platforms per its own header comment.

- [x] **Best Practices Review** — doc-only edit; table row addition follows the exact format of existing rows (Surface | Budget | Why this number), and the "Why" cell follows the sizing convention used for `gate-postures.md` / `post-closure.md` (file size + ~1.5 working units) named explicitly in the PLAN.md line. No refactor needed beyond the two edits.

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/core/` and grepped for prior tasknotes touching `docs/CONTEXT-BUDGET.md`; hits are CORE-535.1/.3/.5, CORE-555, CORE-558.5, CORE-604.1/.2, CORE-605, CORE-607 — all are the budget-table lineage already cited inline in CONTEXT-BUDGET.md itself (CORE-599, CORE-EPIC-604, etc.), so the doc's own prose is the current and complete history; no separate finding beyond what's already inline.

- [x] **Drift check** — PLAN.md line's cited file path, char count, and paragraph name ("not budgeted, deliberately") all match current `docs/CONTEXT-BUDGET.md` content exactly. No contradiction with any SPEC contract — CONTEXT-BUDGET.md is explicitly a self-contained mechanism doc (not swept by doc-drift, not part of always-loaded set), and this task only edits its own table/prose, not SPEC.md.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumption: the 38,000 figure from the PLAN.md line is accepted as pre-sized by the filer (rationale: file is 34,565 chars + ~1.5 working units per the cited `gate-postures.md` sizing rule, consistent with how `gate-postures.md` and `post-closure.md` rows were sized).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:** Single-file doc edit (`docs/CONTEXT-BUDGET.md`), two changes: (1) add a Budgets table row for `SPEC/procedures/ft-task.md` at 38,000 chars, (2) amend the "Not budgeted, deliberately" paragraph to drop `SPEC/procedures/` from its exclusion list and note the new row. `docs/CONTEXT-BUDGET.md` is explicitly exempted from the doc-drift sweep list (its own §"Not on the doc-drift sweep list"), so Phase 4's doc-drift sweep records "no change (numbers owned by /ft-release)" for it as usual — this task edits it directly, which is the release-owned surface, not the sweep.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing Budgets table row pattern (`| Surface | Budget | Why this number |`) and the existing prose-list pattern in "Not budgeted, deliberately"; no new shape introduced.

- [x] **Minimal refactor gate** — no refactor; pure content addition/amendment within Acceptance scope.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose/table doc edit, no test surface.

**Implementation Notes:**

- Added Budgets table row: `SPEC/procedures/ft-task.md` | 38,000 chars, with a "Why this number" cell citing the always-loaded runner-body role for Codex/Cursor/Grok and the sizing rule (file at 34,565 + ~1.5 working units, mirroring `gate-postures.md`'s row).
- Amended "Not budgeted, deliberately" paragraph: removed `SPEC/procedures/` from the exclusion list (which previously read `docs/`, archived tasknotes, `tools/`, `viz/`, `SPEC/procedures/`, and the lazy `SPEC/` modules other than the three named), and added a clause noting `SPEC/procedures/ft-task.md` is budgeted separately because it is the always-loaded runner body for non-Claude platforms, so the "ordinary task" framing in that paragraph is scoped to Claude's load path only — the gap the task exists to close.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, doc-only change, no test suite applies.

- [x] Ran lint/type-check on changed code — N/A, markdown prose/table edit, no linter configured for `docs/`.

- [x] **Verification receipt**
  - `wc -c SPEC/procedures/ft-task.md` → 34565 (exit 0) — confirms current size is under the new 38,000 budget.
  - `grep -n "SPEC/procedures/ft-task.md" docs/CONTEXT-BUDGET.md` → exit 0, row present in Budgets table.
  - `grep -n "Not budgeted, deliberately" -A6 docs/CONTEXT-BUDGET.md` → exit 0, `SPEC/procedures/` no longer listed among exclusions; amendment present.
  - No avoidable duplication, dead code, unexplained complexity, or stale documentation introduced — this edit reduces staleness (closes the gap the task names).

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend/rendered surface; --fast/--unattended posture also suppresses this ask.

**Testing Notes:** All three verify commands above passed (exit 0 each). No test/lint framework applies to `docs/`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONTEXT-BUDGET.md` is explicitly not on the `.flowtron/tasknote/README.md` §"AI-referenced docs" list (by its own §"Not on the doc-drift sweep list"); no other entry on that list is affected by this change. No change.

- [x] Closed — all three Acceptance criteria ticked and verified (see Phase 3). YAML `status:` flipped to `completed`. PLAN.md line flipped to stub form and moved to top of `## Completed`. Tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** — see Final Summary below.

**Final Summary:**

Added a `SPEC/procedures/ft-task.md` | 38,000 row to `docs/CONTEXT-BUDGET.md`'s Budgets table and amended the "Not budgeted, deliberately" paragraph to drop `SPEC/procedures/` from the exclusion list, noting the exemption's original reasoning was scoped to Claude's own load path. One file changed: `docs/CONTEXT-BUDGET.md`. Verification: `wc -c SPEC/procedures/ft-task.md` → 34565 (under the new 38,000 cap); `grep` confirms the row and amended paragraph are present; the CI drift script (`.github/workflows/ci.yml`) parses the Budgets table generically, so the new row is picked up without a script change. No refactors, no tests applicable (doc-only). `touches:` scope reconciliation: declared `docs/CONTEXT-BUDGET.md`, actual diff matches exactly.

**unattended-candidates:** none

**Archived:** 2026-09-19
