---
title: prune epic children under filter
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-432]
---

# CORE-432.3 | prune epic children under filter

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-432]]

## 🎯 Goal

When filters are active, prune non-matching epic children from the derived task tree so header count, list/board render, and keyboard-nav all read the same matching set — never inflated by hidden children.

## ✅ Acceptance

- [x] Under an active query/status filter, non-matching epic children are omitted from render (not only from parent keep/drop)
- [x] `filteredCount`, section counts, and `visibleIds` (keyboard-nav) all derive from the same pruned tree
- [x] Parent epic still stays visible when only a child matches (existing behavior preserved)
- [x] Unfiltered view still shows the full epic child set
- [x] Tests pin prune + count consistency; typecheck/lint clean

## 🧩 Subtasks

- [x] Derive pruned `filteredNodes` (map children through `matchesFilter`; keep parent if parent or any child matches)
- [x] Confirm count / `visibleIds` / `bySection` already consume that tree (no second parallel list)
- [x] Add App tests: prune non-matching children; matching count reflects pruned set
- [x] Run targeted tests + typecheck + lint

## 🔗 Related

- [[CORE-EPIC-432]] — parent epic (honest edge states)
- [[CORE-432.2]] — sibling: header version honesty

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed dishonest edge: `filteredNodes` keeps the epic when any child matches but retains the full `children` array. Count (`filteredCount`), section badges (`PrioritySection`), render (`EpicRow`), and keyboard-nav (`visibleIds`) all walk unpruned children — inflated "matching" counts and keyboard stops on off-filter rows.

- [x] Read relevant source files — `App.tsx` filter/count/visibleIds (138–188), `EpicRow`, `PrioritySection`, existing search tests, `useKeyboardNav`

- [x] **Best Practices Review** — Filter derivation belongs in one place (`App.tsx` `filteredNodes`); consumers already take `TaskNode[]` and should not re-filter. Prune at the map step so SRP stays with the filter; no new module unless the helper grows. Epic progress chip under filter should report the matching subset (same tree), not invent a second total.

- [x] **Archive skim** — CORE-098.* built search-reaches-subtasks + empty filter states but kept parent-or-any-child keep without child prune. CORE-432.2 sibling honesty fix on header version only. No prior task already pruned children.

- [x] **Drift check** — PLAN/epic cite `App.tsx:138-188`; still the filter/count/visibleIds block (line numbers shifted slightly after 432.2 header edit but same logic). No SPEC contract on viz filter trees. Line matches intent.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) when parent matches but a child does not, prune the non-matching child (do not keep full expanded set); (2) empty-children epic after prune still renders as a row; (3) no filter active → identity tree (all children pass `matchesFilter`).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Current keep rule kept parent with full children; fix prunes children at the single `filteredNodes` derivation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: keep derivation in `App.tsx` `filteredNodes`; consumers already read `TaskNode.children` — pruning at the single source is enough. No new util module.

Minimal refactor: only the `filteredNodes` useMemo body; comment documents the single-tree contract.

Implementation: `flatMap` → prune `children` with `matchesFilter`, drop nodes with no parent match and no matching children. Three App tests under `App — prune epic children under filter (CORE-432.3)`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- `npm --prefix viz test -- --run src/ui/App.test.tsx` → 45/45 pass
- `npm --prefix viz run typecheck` → clean
- `npm --prefix viz run lint` → clean
- Quality: single derivation site; no dead code; public surface unchanged
- Operator confirmed visual (go)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Pruned non-matching epic children in the single `filteredNodes` derivation so header match count, list/board render, epic progress chips, and keyboard-nav all share one honest tree. Parent still kept when only a child matches; unfiltered view unchanged. Tests pin prune + `2 of 4 matching` count. Docs: no AI-referenced doc change (viz filter behavior not documented there). Maintainability: one map step, no second filter list.

**Archived:** 2026-08-10
