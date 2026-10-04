---
title: motion polish
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098]
---

# CORE-098.8 | motion polish

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Add subtle motion polish to the viz: chevron rotation on expand/collapse, gentle height-animated section and row expand, and hover-tint on rows — keeping all animations restrained and non-distracting.

## ✅ Acceptance

- [x] Chevron icon rotates on expand/collapse transitions
- [x] Section and row expand/collapse uses a subtle height animation
- [x] Rows show a hover-tint on mouse-over
- [x] All animations respect `prefers-reduced-motion`
- [x] No existing a11y baseline (FE-019) regressions
- [x] Visual confirmation from user

## 🧩 Subtasks

- [x] Add `duration-200 motion-reduce:transition-none` to `Chevron.tsx`
- [x] Animate `PrioritySection.tsx` section body with grid-rows CSS trick
- [x] Animate `EpicRow.tsx` subtask list with grid-rows CSS trick + header hover-tint
- [x] Add hover-tint to `TaskRow.tsx`
- [x] Add hover-tint to `SubtaskRow.tsx`
- [x] Start dev server + visual confirmation from user

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz embellishment)
- [[CORE-098.6]] — focus-ring system (predecessor)
- [[CORE-098.7]] — epic-row visual lift (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three deliverables (chevron rotation, height animation, hover-tint) are clearly scoped; source files exist and are in good shape.

- [x] Read relevant source files
- [x] **Archive skim** — no FE archive exists (`_project/tasknote/archive/fe/` absent); no prior tasknotes to review
- [x] **Drift check** — `Chevron.tsx`, `EpicRow.tsx`, `PrioritySection.tsx`, `TaskRow.tsx`, `SubtaskRow.tsx` all confirmed present and match expected shapes; no drift
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `Chevron.tsx` already has `transition-transform`; rotation IS animated at Tailwind's default 150ms — just needs explicit `duration-200` + `motion-reduce:transition-none` for polish and reduced-motion compliance.
- Both `PrioritySection.tsx` and `EpicRow.tsx` use conditional rendering (`{!collapsed && ...}` / `{expanded && ...}`) which causes instant show/hide. Will replace with the CSS grid-rows trick: outer `grid grid-rows-[0fr]/[1fr] transition-[grid-template-rows] duration-200`, inner `overflow-hidden`. Content always stays in DOM; `aria-expanded` on buttons already communicates state to screen readers.
- Hover-tint: `TaskRow.tsx` outer div and `SubtaskRow.tsx` outer div get `hover:bg-*` classes (both already have `transition-colors`). `EpicRow.tsx` outer div wraps the expanded subtask list so hover there is wrong; tint goes on the inner header `flex items-center` div instead.
- Tailwind config has no custom extensions; all needed utilities (`grid-rows-[...]`, `transition-[grid-template-rows]`, `motion-reduce:`) are standard Tailwind v3 arbitrary-value syntax.
- No clarifications needed. Assumptions: TaskDetail panel expand/collapse NOT animated (lazy-loaded; always mounting would defeat code-split; not mentioned in task description).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Chevron already used `transition-transform`; grid-rows trick is new to the codebase (no existing height-animation pattern); hover via `hover:bg-*` consistent with existing button hover patterns
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

5 files changed. Grid-rows CSS trick (`grid-rows-[0fr]`→`[1fr]` + inner `overflow-hidden`) for `PrioritySection` and `EpicRow` subtask list. One test updated: `App.test.tsx` removed stale `toBeNull()` check on a subtask row — grid trick always keeps subtask DOM nodes rendered (aria-expanded on the button already communicates state). Hover-tint: `hover:bg-slate-50` on `TaskRow`, `hover:bg-slate-100/70` on `SubtaskRow` (skips when highlighted/selected), `hover:bg-black/[0.03]` on `EpicRow` header div only (outer container wraps subtask list so tinting there is wrong).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

103/103 tests pass. `tsc --noEmit` clean. Visual confirmation received from user.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/CLAUDE-snippet.md` no change
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added motion polish to the viz: chevron rotation (explicit `duration-200` + `motion-reduce:transition-none`), height-animated expand/collapse for priority sections and epic subtask lists (CSS grid-rows trick), and hover-tint on TaskRow/SubtaskRow/EpicRow header. All subtle, all respecting reduced-motion. 103/103 tests pass; one stale `toBeNull()` test assertion updated to match the always-rendered DOM pattern.

**Archived:** 2026-05-16
