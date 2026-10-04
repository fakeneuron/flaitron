---
title: budget-rationale-refresh
status: completed
tags: [context-budget]
created: 2026-09-22
due:
related-tasks: [CORE-EPIC-670]
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-670.2 | budget-rationale-refresh

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-670]]

## 🎯 Goal

Drop the retired `ft-goal-task` skill from `docs/CONTEXT-BUDGET.md` §"Budgets" `claude/skills/*/SKILL.md` row's "Why this number" cell, and re-measure the `ft-epic-discovery` / `ft-close-epic` sizes it cites.

## ✅ Acceptance

- [x] A1 The `claude/skills/*/SKILL.md` Budgets row's rationale cell no longer names `ft-goal-task` — `! grep '| `claude/skills/\*/SKILL.md` | 33,000 |' docs/CONTEXT-BUDGET.md | grep -q 'ft-goal-task'` (the `## Ledger` §"Skill bodies" retirement-history mention is a separate, legitimate surface and stays)
- [x] A2 The cell's `ft-epic-discovery` and `ft-close-epic` parenthetical sizes match a fresh `wc -c` of both `SKILL.md` files — `judgment` (measured inline, no stored fixture to diff against)

## 🧩 Subtasks

- [ ] S1 `wc -c` the current `ft-task`, `ft-epic-discovery`, `ft-close-epic` `SKILL.md` bodies
- [ ] S2 Edit the rationale cell: drop the `ft-goal-task` clause, update the two remaining parenthetical sizes

## 🔗 Related

- [[CORE-EPIC-670]] — parent epic (context-headroom); this is an implementation child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Single-cell doc edit in `docs/CONTEXT-BUDGET.md`, exactly as filed on the PLAN.md line. No re-scope surfaced.

- [x] Read relevant source files — read `docs/CONTEXT-BUDGET.md` in full; located the single `claude/skills/*/SKILL.md` Budgets row that names `ft-goal-task`, `ft-epic-discovery`, and `ft-close-epic`. Confirmed via `grep` that this is the only occurrence of `ft-goal-task` inside the `## Budgets` table (a second, historical mention of the retirement lives in `## Ledger` §"Skill bodies" and is out of scope — that section is release-stamped, not part of "the Budgets skill-row rationale" the PLAN.md line names).

- [x] **Best Practices Review** — N/A, doc-only prose edit, no code/module-boundary concern.

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/core/` grepped for `docs/CONTEXT-BUDGET.md`; hits are CORE-662 (collapsed the Budgets cells to one line each, moved history to `## Cap history`) and CORE-664 (re-measured the ledger, found it stale on 3 of 7 rows). Neither touches the `ft-goal-task` clause. No load-bearing constraint beyond: the "Why this number" cell format is one line (CORE-662), and re-measurements must be genuinely fresh `wc -c` reads, not carried-forward numbers (CORE-664's own correction).

- [x] **Drift check** — Live `wc -c` today: `ft-task/SKILL.md` 29,340 · `ft-epic-discovery/SKILL.md` 29,277 · `ft-close-epic/SKILL.md` 28,002. The cell's cited figures (27,140 / 26,986 / 26,935) are stale — confirms the PLAN.md line's premise. `ft-task` stays the largest ordinary skill (29,340 > 29,277), so the row's framing ("sized to give `ft-task` ... headroom while the others stay meaningfully capped") still holds after the edit. No contradiction with SPEC or the PLAN.md line.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Scope is the one rationale cell; the release-stamped `## Ledger` §"Skill bodies" table is a separate, `/ft-release`-owned surface (doc's own §"How this is enforced") and stays untouched.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared.

**Discovery Notes:**

The target is `docs/CONTEXT-BUDGET.md`'s `## Budgets` table, row `claude/skills/*/SKILL.md`, "Why this number" cell:

> One skill body is loaded per task, on top of `SPEC.md`. Sized to give `ft-task` (the largest ordinary skill) ~1.5 working units of headroom (its own substantial edits run +1,187 to +3,390 chars) while `ft-goal-task` (27,140), `ft-epic-discovery` (26,986) and `ft-close-epic` (26,935) stay meaningfully capped. Extracting a lazy fragment ([[CORE-556.2]]) is the preferred remedy over raising this cap when a body is genuinely overgrown rather than merely near its line.

`ft-goal-task` was retired at v5.27.0 (CORE-570/571/572/573, per this doc's own `## Ledger` §"Skill bodies" note) — its size no longer belongs in a live-rationale sentence. Fresh `wc -c` replaces the two remaining parentheticals.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Following CORE-662's established shape for this table: one-line rationale cells, parenthetical sizes inline. No new shape needed.

- [x] **Minimal refactor gate** — No refactor; single-sentence edit inside the existing cell.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc edit; verified with `grep`/`wc -c`, not a test suite.

**Implementation Notes:**

Edited the `claude/skills/*/SKILL.md` row's rationale cell in `docs/CONTEXT-BUDGET.md`: dropped the `ft-goal-task (27,140), ` clause and updated `ft-epic-discovery (26,986)` → `ft-epic-discovery (29,277)`, `ft-close-epic (26,935)` → `ft-close-epic (28,002)` from the fresh `wc -c` reads above. Left the `## Ledger` §"Skill bodies" table and its retirement-history prose untouched — that section is explicitly release-owned (doc's own §"Ledger" header: "Refreshed by `/ft-release` §7.1") and outside this task's scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only doc edit; no test suite covers doc prose

- [x] Ran lint/type-check on changed code — N/A, no lintable/typed surface touched; ran the repo's own CI "Context budget" check locally instead (below)

- [x] **Verification receipt**

- [x] **External review**

- [ ] (frontend) N/A — no frontend surface touched

**Testing Notes:**

- A1 `grep '| `claude/skills/\*/SKILL.md` | 33,000 |' docs/CONTEXT-BUDGET.md | grep -q 'ft-goal-task'` (negated) → exit 1 (no match, as required)
- A2 `wc -c claude/skills/ft-epic-discovery/SKILL.md claude/skills/ft-close-epic/SKILL.md` → 29,277 / 28,002 — matches the cell's updated parentheticals
- CI's `.github/workflows/ci.yml` "Context budget" `wc -c`-and-compare script run locally against the edited doc → `bad=` (empty, passes)
- `git diff --stat docs/CONTEXT-BUDGET.md` → 1 file changed, 1 insertion(+), 1 deletion(-); final newline intact (`tail -c 1` → `0a`)
- Structural quality assertions (Phase 3 receipt box): no duplication, dead code, unexplained complexity, public-surface growth, or stale code-facing documentation introduced — single-cell prose edit only
- **External review**: self-reviewed the diff against `## ✅ Acceptance` (diff is a one-line table-cell edit, too small to warrant a separate external-review pass) — N/A, diff too small to grade separately from the verification above. No blockers or notes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change to any of the 15 listed docs. `docs/CONTEXT-BUDGET.md` itself is not on the sweep list (explicitly excluded — "CI-enforced and re-measured by `/ft-release` §7.1"). Grepped all 15 for `ft-goal-task` / the three stale figures; the one hit (`docs/MIGRATION.md`'s retirement-migration-table row for `ft-goal-task`) is an unrelated, still-accurate mention of the skill's own retirement path — no drift.

- [x] Closed

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — N/A. Nothing beyond what's already captured in `docs/CONTEXT-BUDGET.md`'s own §"How this is enforced" (Ledger vs. Budgets-table ownership split).

**Final Summary:**

`docs/CONTEXT-BUDGET.md` §"Budgets" `claude/skills/*/SKILL.md` row's rationale cell: dropped the retired `ft-goal-task (27,140)` clause and refreshed the two remaining parentheticals from a fresh `wc -c` — `ft-epic-discovery (26,986)` → `(29,277)`, `ft-close-epic (26,935)` → `(28,002)`. 1 file changed, 1 insertion(+), 1 deletion(-). Left the `## Ledger` §"Skill bodies" table (release-owned, refreshed by `/ft-release` §7.1) untouched, since the PLAN.md line scoped this to the Budgets-table rationale cell specifically. `touches:` reconciliation: declared `docs/CONTEXT-BUDGET.md`; `git diff --name-only` matches exactly, no undeclared paths. Verified locally against CI's own `.github/workflows/ci.yml` "Context budget" script (passes) and against A1/A2's scoped `grep`/`wc -c` checks. Maintainability effect: the rationale cell now names only live, budget-relevant skills, and its cited sizes are current again — closes the drift the PLAN.md line flagged.

**Archived:** 2026-09-22
