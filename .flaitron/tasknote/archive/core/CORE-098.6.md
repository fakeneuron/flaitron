---
title: focus-ring system
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098]
---

# CORE-098.6 | focus-ring system

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Add explicit `focus:ring-*` classes to all interactive elements where browser-default focus is invisible in either light or dark theme.

## ✅ Acceptance

- [ ] Every `<button>` and focusable non-input element has explicit `focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500` (or equivalent) — no element relies on browser-default alone
- [ ] Pill buttons (project chips, status filter pills) use a shared constant so the ring is uniform and DRY
- [ ] Native form controls (SettingsModal checkboxes / radio buttons) left to browser default (native inputs have acceptable browser rings; custom styling is out of scope)
- [ ] View-switcher segments excluded — CORE-098.5 not yet implemented
- [ ] Visual confirmation: tab-key focus traversal shows a visible ring on every audited element in both light and dark mode

## 🧩 Subtasks

- [x] Add `PILL_FOCUS_RING` constant to `constants.ts`; append to `PILL_ACTIVE` and `PILL_DEFAULT_SLATE`
- [x] Fix `App.tsx`: ⓘ button, gear button, status-filter inactive-state pills
- [x] Fix `ThemeToggle.tsx`: add focus ring to the toggle button
- [x] Fix `PrioritySection.tsx`: add `focus:ring-inset` variant to section-header button
- [x] Fix `EpicRow.tsx`: add focus ring to chevron expand/collapse button
- [x] Fix `TaskRowInner.tsx`: add focus ring to detail-toggle button
- [x] Fix `SubtaskRow.tsx`: add focus ring to navigate-to-task button
- [x] Fix `SettingsModal.tsx`: add focus ring to Reset and Done buttons
- [x] Build + visual tab-through confirmation (👁️)

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz-embellishment)
- [[CORE-098.3]] — settings-modal scaffold (SettingsModal in scope)
- [[CORE-098.4]] — density modes (PILL_ACTIVE / PILL_DEFAULT_SLATE last touched here)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task scope is well-defined. No view-switcher yet (CORE-098.5 open), so that surface is excluded. All other mentioned elements exist and have been audited.

- [x] Read relevant source files
- [x] **Archive skim** — prior tasknotes CORE-098.1 through CORE-098.4 scanned for focus-ring mentions
- [x] **Drift check** — task description names: chip buttons ✅ (ProjectSelector, status filter pills in App.tsx), gear ✅ (App.tsx gear button), view-switcher segments ⚠️ excluded (CORE-098.5 not yet implemented), modal controls ✅ (SettingsModal Reset + Done buttons). All in-scope elements confirmed present.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Audit findings — current focus state per element:**

| Element | File | Has explicit focus ring? |
|---------|------|--------------------------|
| Search input | App.tsx:325 | ✅ `focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600` |
| ⓘ (shortcuts) button | App.tsx:332 | ❌ browser default |
| ThemeToggle button | ThemeToggle.tsx:31 | ❌ browser default |
| Gear (settings) button | App.tsx:342 | ❌ browser default |
| Project chip buttons | ProjectSelector.tsx:24 | ❌ browser default (via PILL_ACTIVE / PILL_DEFAULT_SLATE) |
| Status filter pill buttons | App.tsx:364 | ❌ browser default (active: PILL_ACTIVE; inactive: STATUS_BADGE + hover) |
| PrioritySection header button | PrioritySection.tsx:49 | ❌ browser default |
| EpicRow chevron button | EpicRow.tsx:59 | ❌ browser default |
| TaskRowInner detail-toggle button | TaskRowInner.tsx:48 | ❌ browser default |
| SubtaskRow navigate button | SubtaskRow.tsx:44 | ❌ browser default |
| SettingsModal "Reset to defaults" | SettingsModal.tsx:138 | ❌ browser default |
| SettingsModal "Done" | SettingsModal.tsx:146 | ❌ browser default (has `autoFocus`) |
| SettingsModal checkboxes | SettingsModal.tsx:89,130 | — native; leave to browser |
| SettingsModal radio buttons | SettingsModal.tsx:107 | — native; leave to browser |

**CORE-098.1 discovery note on this:** "chip buttons rely on browser-default focus, which is invisible against `bg-slate-100` in light mode." Confirmed.

**Focus ring token decision:**
- Standard button ring: `focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500`
- PrioritySection header (full-width button): same but add `focus:ring-inset` so ring appears inside the element rather than clipping against the section card border
- Pill buttons: add via `PILL_FOCUS_RING` constant in constants.ts, embedded in `PILL_ACTIVE` and `PILL_DEFAULT_SLATE`; inline addition also needed for status-filter inactive-state in App.tsx

**Pill constant approach:** `PILL_ACTIVE` and `PILL_DEFAULT_SLATE` are only ever used on `<button>` elements (ProjectSelector and App.tsx). Safe to embed focus ring directly. `STATUS_BADGE` is used on both buttons (status filter pills) and display spans (StatusChip) — must NOT embed focus ring there; add inline at the call site instead.

**View-switcher excluded:** CORE-098.5 not yet implemented. Note in closure: CORE-098.5 author must add focus rings to segmented control at that time.

**No clarifications needed.** Assumptions:
- Native form inputs (checkbox, radio) are out of scope — browser-default rings acceptable
- Use `focus:ring-slate-400 dark:focus:ring-slate-500` consistently (slightly darker than search input's `slate-300` for better contrast on pill backgrounds)
- `focus:ring-inset` only for PrioritySection full-width button

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `focus:outline-none focus:ring-2` pattern from the search input; used `ring-slate-400 dark:ring-slate-500` (one step more contrast than search's `ring-slate-300`) for pill backgrounds
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — no new tests needed; focus ring classes are visual-only Tailwind, covered by visual confirmation in Phase 3

**Implementation Notes:**

- Added `PILL_FOCUS_RING` constant to `constants.ts`; embedded in `PILL_ACTIVE` and `PILL_DEFAULT_SLATE` (both button-only)
- Status-filter inactive-state pills in `App.tsx` — added `PILL_FOCUS_RING` to the inactive branch only (active branch already has it via `PILL_ACTIVE`)
- `TaskRowInner.tsx` and `SubtaskRow.tsx`: added `rounded` to enable ring rendering (ring requires a shaped boundary)
- `PrioritySection.tsx`: used `focus:ring-inset` so ring stays inside the full-width section-card border
- View-switcher excluded — CORE-098.5 not yet implemented; author must add focus rings at that time

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — 103/103 pass
- [x] Ran lint/type-check on changed code — tsc --noEmit clean
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change (viz UI-only, no doc surfaces touched)
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Added explicit `focus:ring-*` classes to all 10 interactive button surfaces that previously relied on browser-default focus (which is invisible against `bg-slate-100` in light mode). Added `PILL_FOCUS_RING` constant to `constants.ts` and embedded it in `PILL_ACTIVE` and `PILL_DEFAULT_SLATE`; applied inline to the ⓘ, gear, ThemeToggle, PrioritySection header, EpicRow chevron, TaskRowInner detail-toggle, SubtaskRow navigate, and both SettingsModal buttons. Section header uses `focus:ring-inset` to keep the ring inside the card border. Native form inputs (checkbox, radio) left to browser default. View-switcher excluded pending CORE-098.5.

**Archived:** 2026-05-16
