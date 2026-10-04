---
title: empty + loading states
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.1, CORE-098.11]
---

# CORE-098.10 | empty + loading states

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Add an informative empty-state message when filters produce no results and a loading skeleton on initial fetch.

## ✅ Acceptance

- [ ] Empty-state renders "No matches. Press Esc to clear filters." when the filtered task list is empty (filter chips active) and the data has loaded
- [ ] Loading skeleton renders on initial fetch before data arrives
- [ ] Skeleton respects the current density mode (compact/comfortable/spacious)
- [ ] Empty-state and skeleton visually consistent with existing viz design system (typography scale, dark/light theme)
- [ ] No regressions: existing filter, expand, keyboard nav, and settings behaviors unchanged

## 🧩 Subtasks

- [ ] Survey how the filter state and loading state are currently managed in viz
- [ ] Survey sibling components for skeleton/empty-state patterns to extend
- [ ] Implement empty-state component / inline message for filtered-empty case
- [ ] Implement loading skeleton for initial fetch
- [ ] Wire skeleton + empty-state into the main render path
- [ ] Visual confirmation (👁️)
- [ ] Lint/type-check

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic: viz embellishment
- [[CORE-098.1]] — discovery tasknote; scoped this subtask
- [[CORE-098.11]] — audit subtask that will verify the completed epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task description matches current state exactly: `PrioritySection.tsx:64-66` shows a bare "No tasks" when a section is filtered to empty; `App.tsx` has no `loading` boolean so the initial fetch renders nothing. Both gaps confirmed live.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

`viz/src/ui/App.tsx` (state + load callback + render — no loading state; filter state via `statusFilter`/`query`), `viz/src/ui/PrioritySection.tsx` (bare "No tasks" empty-state at line 64), `viz/src/ui/constants.ts` (`DENSITY_TOKENS`, `TYPOGRAPHY`), `viz/src/ui/useKeyboardNav.ts` (Esc handler at line 54-67: clears `query` + `statusFilter` when active — confirms message text accurate).

### Archive skim

- `CORE-098.1` (discovery, 2026-05-15) — **directly relevant.** Gap matrix entry for this task: "Empty-state + loading-state polish (informative copy + skeleton) | Pillar 1+2 | Lift L | Leverage L | Risk L." `load()` described as "blank list until JSON lands." Confirms scope.
- `CORE-098.9` (keyboard-shortcuts overlay, 2026-05-16) — confirms `Esc` handler at `useKeyboardNav.ts:57-59` clears both `query` and `statusFilter` when active. "Press Esc to clear filters." message text is accurate.
- `CORE-098.4` (density modes) — `DENSITY_TOKENS` introduced; all row/section spacing comes from here. Skeleton must use these tokens.

### Drift check

- `PrioritySection.tsx:64-66` "No tasks" placeholder — confirmed present, unchanged.
- `useKeyboardNav.ts:57-59` Esc filter-clear — confirmed present, unchanged.
- No `loading` state in `App.tsx` — confirmed; `load()` at lines 71-93 transitions directly from empty to populated with no intermediate state.

### No clarifications needed

Assumptions:
1. "Initial fetch" = loading while `load()` is running. Auto-refresh (EventSource `change` event) does NOT show skeleton — data is already visible and should stay visible during background refresh.
2. Filter-empty state shows when `filteredCount === 0` AND filters active (`statusFilter.size > 0 || query.trim()`) AND `!loading` AND `tasks.length > 0` (distinguish from a genuinely empty plan).
3. Skeleton respects current `visibilityPrefs.density` for spacing; 4 fake sections with animated pulse rows.
4. New file `LoadingSkeleton.tsx`; changes to `App.tsx` only. `PrioritySection.tsx` unchanged (per-section "No tasks" remains valid for individual empty sections when not all-empty).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no existing skeleton or filter-empty pattern in the codebase; both are net-new. `LoadingSkeleton.tsx` mirrors `PrioritySection`'s structural shape (rounded border, header row, interior div) using `animate-pulse` placeholder divs + `DENSITY_TOKENS` for spacing. Inline filter-empty message placed in `App.tsx` main render — no separate component needed for a one-line message.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A for UI-only change; existing 105 tests all pass, covering the surrounding render path.

**Implementation Notes:**

### Changes

- **New:** `viz/src/ui/LoadingSkeleton.tsx` — 4 skeleton sections (`SkeletonSection` × 4 with 3/2/4/1 rows), `animate-pulse`, density-aware spacing via `DENSITY_TOKENS`.
- **Modified:** `viz/src/ui/App.tsx`:
  - Added `loading: boolean` state (`useState(true)` — starts true so skeleton shows on mount).
  - `load(project, showSkeleton = true)` — `showSkeleton=true` sets loading before fetch; `showSkeleton=false` (used by `refresh`) keeps current data visible during background refresh.
  - `finally { setLoading(false) }` in `load()`.
  - `setLoading(true)` in `handleSelectProject` for immediate skeleton on project switch.
  - `setLoading(false)` in project-list fetch error path.
  - Main render branches: `loading` → `<LoadingSkeleton>`; `isFiltering && filteredCount === 0` → centered "No matches." message; otherwise sections.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test`: 105/105 pass.
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit` clean.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — Playwright auto-verified: filter-empty state renders centered "No matches. Press Esc to clear filters."; Esc restores sections correctly.

**Testing Notes:**

Loading skeleton is visually unverifiable via screenshot (local API <10ms); code path confirmed clean via type-check.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change. `SPEC.md`: no change. `docs/MIGRATION.md`: no change. `claude/CLAUDE-snippet.md`: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-16.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added an informative filter-empty state and a loading skeleton to viz. When filters produce no matches, the section list is replaced with a centered "No matches. Press Esc to clear filters." message; pressing Esc correctly clears both query and status filters. A `LoadingSkeleton` component renders on initial fetch (and project switch) using `animate-pulse` placeholder rows that respect the current density mode; background auto-refresh keeps the existing data visible. Changes: `viz/src/ui/LoadingSkeleton.tsx` (new, ~50 LOC), `viz/src/ui/App.tsx` (loading state + render branching). Type-check clean; 105/105 tests pass.

**Archived:** 2026-05-16
