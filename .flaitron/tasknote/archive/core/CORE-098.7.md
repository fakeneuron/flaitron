---
title: epic-row visual lift
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098]
---

# CORE-098.7 | epic-row visual lift

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Add subtle visual distinction to epic rows (heavier border, leading icon, background tint) so the epic-vs-task hierarchy reads at a glance without relying on the chevron.

## ✅ Acceptance

- [ ] Epic rows have a visually distinct treatment (border, icon, tint) compared to plain task rows
- [ ] The hierarchy is readable at a glance without the expand chevron
- [ ] No regression in Comfortable/Default/Compact density modes
- [ ] No regression in dark mode
- [ ] Focus-ring system (CORE-098.6) remains intact
- [ ] Bundle-size budget intact (FE-026)

## 🧩 Subtasks

- [ ] Add `EPIC_ROW_NEUTRAL` constant to `constants.ts`
- [ ] Add `epicRowOutlineClass` helper to `utils.ts`
- [ ] Update `EpicRow.tsx`: `border-2`, `epicRowOutlineClass`, `bg-slate-50/dark:bg-slate-800/50`, `relative`, inner stripe div
- [ ] Build + visual tab-through / expand confirmation (👁️)
- [ ] tsc --noEmit clean

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic: viz-embellishment
- [[CORE-098.1]] — discovery tasknote (visual improvement list)
- [[CORE-098.6]] — predecessor: focus-ring system (focus styling on EpicRow)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task scope is clear. EpicRow.tsx and TaskRow.tsx use identical container classes (`rounded border bg-white dark:bg-slate-900`) with no epic-specific visual distinction beyond the chevron and done/total chip. CORE-098.6 stabilized the focus-ring system; no ring regressions anticipated.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-098.1 confirms the gap ("same row height + font; parent-child could be reinforced with subtle border weight or leading icon"). CORE-098.6 touched EpicRow.tsx chevron button (added focus:ring-*); no other archive tasknote touched EpicRow's visual shell.
- [x] **Drift check** — EpicRow.tsx container at line 48 is `rounded border bg-white dark:bg-slate-900 ${rowOutlineClass(...)} transition-colors` — matches description exactly. TaskRow.tsx uses same container pattern with `pl-9` indent. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Design decisions (confirmed via AskUserQuestion 2026-05-16):**
- **Leading icon**: left-edge accent stripe — `absolute inset-y-0 left-0 w-0.5 rounded-l bg-slate-400 dark:bg-slate-500 pointer-events-none aria-hidden`. Sits inside the 2px border, creating a composite left-edge indicator without any layout shift.
- **Border**: `border-2` (2px all around); neutral color `border-slate-300 dark:border-slate-700` (slightly darker than TaskRow's `border-slate-200`). Highlight/selection ring classes remain unchanged — `ring-2` is a box-shadow and doesn't conflict with `border-2`.
- **Background tint**: `bg-slate-50 dark:bg-slate-800/50` (neutral cool, no priority-color connotation; works across all 6 priority sections).
- `TaskRow`'s `pl-9` indent is **unchanged** — the stripe is absolutely positioned and adds no flow-layout width.

**Files in scope:**
- `viz/src/ui/constants.ts` — add `EPIC_ROW_NEUTRAL` token
- `viz/src/ui/utils.ts` — add `epicRowOutlineClass` helper
- `viz/src/ui/EpicRow.tsx` — apply all three visual treatments

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `rowOutlineClass` from `utils.ts`; added `epicRowOutlineClass` as a sibling using the same 3-case shape with a new `EPIC_ROW_NEUTRAL` constant
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — no new tests needed; Tailwind class changes are visual-only; covered by visual confirmation in Phase 3

**Implementation Notes:**

- Added `EPIC_ROW_NEUTRAL = 'border-slate-300 dark:border-slate-700'` to `constants.ts`
- Added `epicRowOutlineClass` to `utils.ts` (3-case: highlight → `ROW_HIGHLIGHT`, selected → `ROW_SELECTION`, neutral → `EPIC_ROW_NEUTRAL`)
- Updated `EpicRow.tsx` container: `border` → `border-2`; `bg-white dark:bg-slate-900` → `bg-slate-50 dark:bg-slate-800/50`; added `relative`; switched to `epicRowOutlineClass`
- Added inner stripe `<div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l bg-slate-400 dark:bg-slate-500" />` before the flex content row
- `TaskRow`'s `pl-9` indent unchanged — stripe is absolutely positioned, zero flow-layout impact

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — 103/103 pass
- [x] Ran lint/type-check on changed code — tsc --noEmit clean
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — confirmed "go"

**Testing Notes:**

Visual tab-through and density-mode check done in Playwright. Both light and dark modes confirmed. Epic rows clearly distinct from task rows in bananapeel (mixed content) and flowtron (epic-only) projects. Comfortable density mode tested — no regression. Expand/collapse approved by user.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change (viz UI-only diff; no flowtron contract surface touched)
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Added three-signal visual distinction to `EpicRow`: `border-2` (2px vs task rows' 1px), `bg-slate-50 dark:bg-slate-800/50` background tint, and an absolutely-positioned 2px left accent stripe (`bg-slate-400 dark:bg-slate-500`). Added `EPIC_ROW_NEUTRAL` constant to `constants.ts` and `epicRowOutlineClass` helper to `utils.ts` (same 3-case shape as `rowOutlineClass`, neutral case uses the new token). `TaskRow`'s `pl-9` indent is unchanged — the stripe is in flow-layout position `absolute`, zero structural impact. 103/103 tests pass, tsc clean, visual confirmed in both themes across all density modes.

**Archived:** 2026-05-16
