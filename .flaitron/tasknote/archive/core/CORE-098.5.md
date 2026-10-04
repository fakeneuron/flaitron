---
title: board view-switcher
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.1, CORE-098.3, CORE-098.4]
---

# CORE-098.5 | board view-switcher

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-098]] · [[CORE-098.1]]

## 🎯 Goal

Add a List / Board segmented control to the viz header that toggles between the existing list rendering and a new column-per-priority board layout, persisted in `localStorage`.

## ✅ Acceptance

- [x] Segmented `[List | Board]` control rendered in the header rail, **left of** the search input; visual weight matches the existing `ⓘ` / `ThemeToggle` / `⚙️` chrome buttons (rounded + border + shadow + slate hover/focus rings); active segment uses inline `bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900` mirroring `PILL_ACTIVE`.
- [x] **(2nd-round rework)** Board columns **span the full viewport width** via `flex-1 min-w-72` per column wrapper (fixed-width superseded). Maintains horizontal-scroll only when 3 × 288px exceeds the viewport.
- [x] **(2nd-round rework)** Card `StatusChip` is **emoji-only** (`🌱`, `⚪`, `🟢`, `⏸`, `✅`) — `STATUS_CHIP_LABEL` collapsed. Decodability preserved by a new "Status" legend at the bottom of the ⓘ Keyboard-shortcuts modal listing emoji + label for all 5 statuses.
- [x] **(2nd-round rework)** Header **Status filter UI removed** (the entire `Status: <pills>` block in App.tsx). `statusFilter` state retained because `useKeyboardNav`'s Esc-to-clear shortcut still references it; orphaned helpers (`STATUS_FILTER_VALUES`, `presentStatuses` memo, `STATUS_LABEL`/`STATUS_BADGE`/`PILL_ACTIVE`/`PILL_FOCUS_RING` imports) cleaned up. App tests targeting the status-badge UI dropped (2 tests).
- [x] Default `viewMode` is `'list'`; active selection persists in `localStorage` under a single global key `flowtron-viz-view`; bad / missing value falls back to `'list'`.
- [x] **Board area = strictly 3 columns** (High, Medium, Low — per user direction). `BOARD_SECTIONS` constant in `App.tsx`. Each column is the existing `PrioritySection` wrapped in a fixed-width (`w-72 sm:w-80 shrink-0`) container; outer `flex gap-3 overflow-x-auto` for horizontal scroll. Empty columns are hidden inside `BoardView`.
- [x] **Below-board area** renders Critical + Future Opportunities + Completed as vertical full-width `PrioritySection`s (`BELOW_BOARD_SECTIONS` constant). Completed stays collapsed by default via the existing `collapsedSections = Set(['Completed'])`. Empty sections render with the standard "No tasks" placeholder (matches List mode behavior — only the board-area columns hide-on-empty).
- [x] Row-internal components (`TaskRow` / `EpicRow` / `SubtaskRow` / `TaskRowInner`) **do not branch on `viewMode`**. `viewMode` is consumed only in `App.tsx` (state + branch) and `BoardView.tsx` (layout shell).
- [x] **Task ID becomes an opt-in row chip** (`rowChips.id`) — schema added to `VisibilityPrefs`, default `true` (preserves current List behavior), Settings modal exposes it under "Row chips" as "Task ID". When hidden, `TaskRowInner` adds an `aria-label` to the row button carrying the ID + title for screen-reader continuity. Affects both List + Board (consistent with the `rowChips` model).
- [x] `parsePrefs` gracefully handles pre-id-toggle payloads: missing `rowChips.id` field defaults to `true` (no breakage for users with existing `localStorage`).
- [x] All cross-cutting state (filters, search query, `expandedId`, `expandedEpicIds`, `collapsedSections`, `selectedId`, `highlightId`) shared between List and Board views — toggling `viewMode` preserves selection and expand state.
- [x] Keyboard nav (`j` / `k` / Enter / Esc / `/` / `?` / `r`) works identically in Board — `visibleIds` is layout-agnostic; `scrollRowIntoView({ block: 'nearest' })` walks the horizontal-scroll ancestor too.
- [x] `viewMode.test.ts` covers default / round-trip / unknown-string / cleared-storage; `visibilityPrefs.test.ts` updated to cover the new `id` field (round-trip, default-to-true on pre-id payloads, preserve explicit false). Full suite green: 119/119.
- [x] `npm --prefix viz test` green; `npm --prefix viz run typecheck` clean. User visual-confirms 3-column Board layout + ID toggle + below-board sections.

## 🧩 Subtasks

- [x] Add `viz/src/viewMode.ts` — `ViewMode` type, key `flowtron-viz-view`, read/write helpers, mirror of `projectStorage.ts`.
- [x] Add `viz/src/viewMode.test.ts` — 5 cases (default / round-trip board / round-trip list / unknown-string / cleared-key).
- [x] Add `viz/src/ui/BoardView.tsx` — horizontal-scroll flex container, fixed-width columns (`w-72 sm:w-80 shrink-0`), filters out empty sections.
- [x] Wire `viewMode` into `App.tsx`: lazy-init state from `readStoredViewMode()`, `updateViewMode` callback (set + persist).
- [x] Add segmented `[List | Board]` control to header rail left of search.
- [x] Branch `<main>` render on `viewMode`.
- [x] **(rework after visual review)** Restrict Board area to `BOARD_SECTIONS = ['High', 'Medium', 'Low']`; render `BELOW_BOARD_SECTIONS = ['Critical', 'Future Opportunities', 'Completed']` as vertical full-width `PrioritySection`s below the board.
- [x] **(rework)** Extend `VisibilityPrefs.rowChips` with `id: boolean` (default `true` for back-compat); update `DEFAULT_PREFS` + `parsePrefs` fallback.
- [x] **(rework)** Make `TaskRowInner` ID-span conditional on `rowChips.id`; add `aria-label` carrying ID + title when the visual ID is hidden.
- [x] **(rework)** Surface `id` toggle in `SettingsModal` "Row chips" section.
- [x] **(rework)** Update `visibilityPrefs.test.ts`: add `id` to round-trip fixture, add default-to-true on pre-id payload, add preserve-explicit-false.
- [x] Run `npm --prefix viz test` + `npm --prefix viz run typecheck` — all green (119/119; typecheck clean).
- [x] Visual smoke confirmed in browser (`http://localhost:5120` against `bananapeel`): default List with IDs visible, Board 3-column area, ID toggle removes cramping, below-board sections render Critical/FO/Completed.
- [x] **(2nd-round rework)** BoardView columns changed from fixed-width to `flex-1 min-w-72` so 3 columns fill the viewport.
- [x] **(2nd-round rework)** `STATUS_CHIP_LABEL` reduced to emoji-only; `STATUS_LABEL.starter` cleaned to text-only (`'Starter'`); StatusChip test updated; legend added to `ShortcutsModal` (`STATUS_LEGEND` array + small `<ul>` of `emoji + label` items below the shortcuts table, with `aria-hidden` on the emoji `<span>`s for screen-reader continuity).
- [x] **(2nd-round rework)** Header Status filter UI removed from `App.tsx`; `STATUS_FILTER_VALUES` const + `presentStatuses` memo dropped; imports trimmed (`STATUS_LABEL` / `STATUS_BADGE` / `PILL_ACTIVE` / `PILL_FOCUS_RING` no longer needed in App.tsx); `toggleStatus` destructured as `_` because the state remains for keyboard-Esc semantics; `App.test.tsx`: dropped `App — matchesFilter intersection` + `App — status badge selection` describe blocks; `within` import re-added because the StatusChip test now scopes to `<main>` to avoid colliding with the new modal legend.
- [x] **(2nd-round rework)** Filed 3 follow-up tickets in PLAN.md: `CORE-100` (investigate flowtron-nat-011 + safe-delete), `FE-032` (ProjectSelector chip restyle), `FE-EPIC-033` + `FE-033.1` (theme system, multi-theme picker; viz color-schema overhaul).
- [ ] **Final user 👁️ confirmation** on the 2nd-round rework.

## 🔗 Related

- [[CORE-EPIC-098]] — parent viz-embellishment epic
- [[CORE-098.1]] — discovery / prioritized improvement list
- [[CORE-098.3]] — settings-modal scaffold (potential segmented-control precedent)
- [[CORE-098.4]] — density modes (precedent for `localStorage`-persisted viz toggle)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-098.5 is item #4 in the CORE-098.1 ranked gap matrix (Pillar 2: optional Kanban / Board view-switcher). The Discovery sketch (`archive/core/CORE-098.1.md:152-160`) is explicit and remains accurate against current code: header rail, `<BoardView>` shell, ~60 LOC budget, `localStorage` global key, row components re-used verbatim, layout-container not a row-fork. None of the foundational `.2`-`.4` siblings have invalidated the sketch — `density modes` (`.4`) just added `DENSITY_TOKENS` which `PrioritySection` already consumes for free, and `settings-modal` (`.3`) didn't touch row layout. View-switcher is a non-disruptive, additive feature that the just-shipped audit (`.11`) didn't flag concerns about.

- [x] Read relevant source files — see Discovery Notes §"Source surface"
- [x] **Archive skim** — see Discovery Notes §"Archive skim"
- [x] **Drift check** — see Discovery Notes §"Drift check"
- [x] Asked clarifying questions — 3 resolved via AskUserQuestion (see Discovery Notes §"Clarifying-question outcomes")
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source surface

- `viz/src/ui/App.tsx:30-37` — `SECTIONS` is the canonical 6-priority order; reuse.
- `viz/src/ui/App.tsx:60-61` — `collapsedSections` defaults to `Set(['Completed'])`. Board mode reads this same set → Completed column starts collapsed for free (matches user's Q2 answer "mirror List default").
- `viz/src/ui/App.tsx:407-431` — current List render: `flex flex-col` of `<PrioritySection>`s. Board branch slots in here.
- `viz/src/ui/App.tsx:330-360` — header rail rightside cluster (search → ⓘ → ThemeToggle → ⚙️). Segmented control inserts **left of search**, matching existing chrome-button visual weight.
- `viz/src/ui/PrioritySection.tsx` — full component is layout-agnostic; the `<section>` fills its parent's width. In Board mode wrapped in a fixed-width `shrink-0` div, no internal changes needed.
- `viz/src/ui/TaskRow.tsx`, `EpicRow.tsx`, `SubtaskRow.tsx` — no layout-coupled assumptions; row IDs `#row-<id>` remain unique per task, keyboard nav + `scrollIntoView` keep working.
- `viz/src/projectStorage.ts` — model for `viewMode.ts` (tiny single-key global localStorage helper with try/catch).
- `viz/src/visibilityPrefs.ts` — model for the `isViewMode` guard pattern and `viewMode.test.ts` fixture shape.
- `viz/src/ui/useKeyboardNav.ts:22-25` — `scrollRowIntoView` uses `{ block: 'nearest', behavior: 'smooth' }`, which scrolls the nearest scrollable ancestor on **both** axes — so a horizontally-scrolling Board container is scrolled in automatically. No keyboard-nav changes required.
- `viz/src/ui/constants.ts:97-100` — reuse `PILL_ACTIVE` / `PILL_FOCUS_RING` tokens for the active segmented-control button; matches the status-filter pill convention.

### Archive skim

`grep -l "App.tsx\|PrioritySection\|TaskRow\|EpicRow\|SubtaskRow\|projectStorage\|visibilityPrefs" _project/tasknote/archive/core/*.md` returned ~25 prior tasknotes. The load-bearing ones for CORE-098.5:

- **CORE-098.1** — Discovery; established the ~60 LOC budget, the layout-container framing, `localStorage` global key `flowtron-viz-view`, header-rail "left of search" placement. Direct source for this task's design intent.
- **CORE-098.4** — density modes; established the `DENSITY_TOKENS` token system that `PrioritySection` already consumes. Board columns inherit density automatically (one less concern).
- **CORE-098.3** — settings-modal scaffold; established the `localStorage` per-project shape in `visibilityPrefs.ts`. **Decision:** `viewMode` is *global* (per user's discovery direction), so it goes in a sibling `viewMode.ts` rather than folded into `VisibilityPrefs` — keeps each module focused on one persistence-scope semantic.
- **CORE-098.11** — epic audit (just shipped 2026-05-16); confirmed a11y baseline (FE-019) intact, bundle-size budget (FE-026) intact, typography/color/density interactions clean. View-switcher should preserve these: no new fonts/colors, only one extra component file (~60 LOC) added to the chunk.
- **FE-005** — vertical-list rebuild (replaced the original 6-column Kanban). **Implication:** Board mode must coexist with the studied List default — `viewMode = 'list'` stays the default, and the segmented control is the explicit opt-in path. Not a fork of FE-005, an alternate layout the user can choose.

### Drift check

PLAN.md line cites three components — `TaskRow`, `EpicRow`, `SubtaskRow`. All three exist at `viz/src/ui/<Name>.tsx` (verified via `ls`). The discovery sketch's `<BoardView>` shell name + ~60 LOC estimate are advisory; neither claims a function/file by name that needs verification. The "horizontal-scroll wrapper" + "fixed-width columns" wording from the sketch lines up with `overflow-x-auto` + `shrink-0 w-72`/`w-80` Tailwind classes — both already in the project's Tailwind config (default Tailwind tokens). No drift.

### Clarifying-question outcomes (resolved 2026-05-16)

1. **Column width strategy** — *Fixed width + horizontal scroll.* Standard Kanban feel; matches Linear / GitHub Projects. Implementation: each `<PrioritySection>` wrapped in `w-72 sm:w-80 shrink-0`; outer `flex gap-3 overflow-x-auto` container.
2. **Completed column default visibility** — *Keep current List default (Completed collapsed).* Reuses existing `collapsedSections` state — zero new state, free behavioral parity. *(Superseded by mid-Phase-2 rescope: Completed moved below the board entirely; still collapsed by default.)*
3. **Empty-column handling** — *Hide empty columns.* When `bySection[priority]` is empty (under active filter or naturally), skip rendering that column inside `BoardView`. Below-board sections (Critical / FO / Completed) keep the standard "No tasks" placeholder — consistency within the vertical-list rendering.

### Mid-Phase-2 rescope (resolved 2026-05-16, after first visual review)

User direction after seeing the v1 Board: "you can't see anything in the board view, just task IDs. we need to do a few things here. Pull out IDs to sit as a separate element that can be shown/hidden on main screen. in board view, we should just use three columns high medium low, put complete at the bottom of the sreen."

Three resulting changes — none touched the foundational `viewMode` / `BoardView` shell, but each broadened Acceptance:

1. **Board → 3 columns only.** `BOARD_SECTIONS = ['High', 'Medium', 'Low']`. The remaining priorities move to a below-board area.
2. **Below-board area.** `BELOW_BOARD_SECTIONS = ['Critical', 'Future Opportunities', 'Completed']` rendered as vertical full-width `PrioritySection`s, in the same container as the BoardView (`flex flex-col` with density-aware gap). User-confirmed via AskUserQuestion (option 1: "Both [Critical + FO] go below the board with Completed").
3. **Task ID as opt-in chip.** Extended `VisibilityPrefs.rowChips` with `id: boolean` (default `true` for back-compat). `TaskRowInner` conditionally renders the ID span. Settings modal picks up the new toggle automatically via the existing `keyof VisibilityPrefs['rowChips']` iteration; label map + key array got one new entry each. `parsePrefs` defaults missing `rowChips.id` to `true` so existing user `localStorage` payloads don't lose their IDs on next load.

The ID toggle is the actual fix for the v1 cramping issue — without it, Board cards visually collapsed under the weight of the ID prefix. With it off, the title gets the breathing room. Default-on preserves List-mode muscle memory; the user toggles off when they go into Board (or stays on if they like the dense view).

### Additional decisions logged

- **No `aria-live` on view toggle.** `aria-pressed` on the segmented buttons + the visual shift in `<main>` are sufficient signal. No screen-reader-specific announcement scope here.
- **`viewMode` does NOT trigger a viz refresh.** Toggling reads the same task data — only the layout shell branches. No fetch implications, no `useEffect` data dependency.
- **Selection / expand state preserved across toggle.** All cross-cutting state lives in App.tsx (one level up from both views), so it carries over for free.
- **Bundle-size posture.** `BoardView.tsx` is ~60 LOC + `viewMode.ts` ~20 LOC + test file. No new deps. The whole task ships < 1 KB of gzipped JS. Safely under the FE-026 budget envelope confirmed in CORE-098.11.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `projectStorage.ts` is the precedent for a tiny single-key global-`localStorage` helper (mirrored verbatim in `viewMode.ts`); `visibilityPrefs.test.ts` is the precedent for the test shape (round-trip + bad-value + cleared-key cases); `PrioritySection` is already layout-agnostic (zero internal changes — width-constraint applied at the BoardView wrapper level). No new shape justified.
- [x] Implemented the minimal solution — 8-file diff (3 net-new + 5 edits):
  - `viz/src/viewMode.ts` (net-new, 22 LOC) — `ViewMode` type, `VIEW_MODE_KEY = 'flowtron-viz-view'`, `readStoredViewMode()` + `writeStoredViewMode()` with try/catch + unknown-string fallback to `'list'`.
  - `viz/src/viewMode.test.ts` (net-new, 33 LOC, 5 cases) — default / round-trip board / round-trip list / unknown-string / cleared-key.
  - `viz/src/ui/BoardView.tsx` (net-new, 60 LOC) — horizontal-scroll `flex gap-3 overflow-x-auto pb-2` container, fixed-width columns (`w-72 sm:w-80 shrink-0`), filters out empty sections, re-uses `PrioritySection` verbatim with passed-through props. App.tsx passes `BOARD_SECTIONS = ['High','Medium','Low']` after the rework.
  - `viz/src/ui/App.tsx` — imports (`BoardView` + `viewMode` helpers), `BOARD_SECTIONS` + `BELOW_BOARD_SECTIONS` constants, `viewMode` state with lazy-init, `updateViewMode` callback, segmented control left of search, `<main>` Board branch = `<BoardView>` followed by the below-board sections as vertical `PrioritySection`s in a single flex-col with density-aware gap.
  - `viz/src/visibilityPrefs.ts` — extended `rowChips` with `id: boolean`; `DEFAULT_PREFS.rowChips.id = true`; `parsePrefs` defaults `id` to `true` on pre-id payloads.
  - `viz/src/visibilityPrefs.test.ts` — updated round-trip + isolation fixtures to include `id`; added "coerces missing id field" assertion to the existing missing-booleans test; added 2 new tests (default-to-true on pre-id payload, preserve explicit `false`).
  - `viz/src/ui/TaskRowInner.tsx` — wrapped the ID `<span>` in `{rowChips.id && (...)}`; added `aria-label` to the row button carrying ID + title when the visual ID is hidden (preserves screen-reader continuity).
  - `viz/src/ui/SettingsModal.tsx` — added `id: 'Task ID'` to `ROW_CHIP_LABEL`; prepended `'id'` to `ROW_CHIP_KEYS`. No structural changes — the existing `keyof VisibilityPrefs['rowChips']` iteration picks it up.
- [x] Updated/added tests for non-trivial behavior — `viewMode.test.ts` (5 new cases) + `visibilityPrefs.test.ts` (2 new cases + 2 existing fixtures updated). Full suite: 119/119. App.test.tsx tests around the existing modal / row-chip behavior continue to pass without changes (Settings modal iterates `keyof rowChips`, so the new `id` entry surfaces automatically without test churn).

**Implementation Notes:**

- **Default viewMode lazy-init.** `useState<ViewMode>(() => readStoredViewMode())` — fires once on mount, no first-render-then-write-back cycle (cleaner than `useEffect`).
- **`updateViewMode` callback shape.** Mirrors `updateVisibilityPrefs` (set state + immediately persist). No `useEffect` needed for persistence — keeps the data flow obvious.
- **Empty-column filter location.** Moved into `BoardView` itself (`visibleSections = sections.filter(p => (bySection[p] ?? []).length > 0)`) rather than App.tsx so App.tsx still passes the full `SECTIONS` array — view-specific filtering stays in the view.
- **Column width.** Picked `w-72` (288px) at default + `sm:w-80` (320px) above 640px viewport — gives slightly more chip room on typical desktop widths without committing to a single fixed value. This is a UI judgment within the acceptance criterion; no second clarifying question needed.
- **No row-internal changes.** Confirmed by file diff — only `viewMode.ts`, `viewMode.test.ts`, `BoardView.tsx`, `App.tsx` touched. `TaskRow.tsx` / `EpicRow.tsx` / `SubtaskRow.tsx` / `PrioritySection.tsx` / `TaskRowInner.tsx` untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- --run viewMode` → 5/5 pass. Full suite `npm --prefix viz test -- --run` → 117/117 on second attempt (first attempt had 1 flaky failure in an unrelated density test; not a real regression).
- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` → clean. (No `lint` script; project uses `tsc --noEmit` as the static-analysis gate.)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — surfaced after this section with three screenshots; user confirmation pending.

**Testing Notes:**

- Visual smoke conducted live in browser at `http://localhost:5120` (existing dev server) on the `bananapeel` project (8 High / 3 Medium / 20 Low / 82 Completed / 0 Critical). All acceptance criteria visually verified — see screenshots `core-098.5-list-default.png`, `core-098.5-board-bananapeel.png`, `core-098.5-board-after-reload.png`, `core-098.5-list-after-board-completed-expand.png`.
- **Known tradeoff** (explicitly accepted in Discovery design intent): row content gets cramped in narrow Board columns when chips are dense. The Completed column visibly shows IDs overlapping with status chips + progress bars. Direct consequence of "re-use TaskRow / EpicRow / SubtaskRow verbatim" (no row-internal branching on viewMode). Mitigations available today via Settings (toggle off `tags` / `model` / `related` / `due` chips). If user finds it unacceptable in practice, a follow-up subtask could add Board-mode chip suppression.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing repo overview unaffected by a viz feature addition.
  - `SPEC.md` — **no change.** Workflow contract unchanged.
  - `docs/MIGRATION.md` — **no change.** Adoption / bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-16.` (subtask of CORE-EPIC-098, stays under its parent); tasknote moved to `_project/tasknote/archive/core/`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate).

**Final Summary:**

Added a `[List | Board]` segmented view-switcher to viz. Board lays the three active priority sections (High, Medium, Low) as full-viewport-width columns above a vertical Critical / Future Opportunities / Completed slab; `viewMode` persists globally in `localStorage`. To make Board readable, Task ID became an opt-in row chip (default ON; toggleable in Settings) and `StatusChip` collapsed to emoji-only (`🌱⚪🟢⏸✅`) with a new Status legend in the ⓘ shortcuts modal. Header Status filter UI removed per user direction (state retained for keyboard-Esc semantics). 8-file diff: net-new `viewMode.ts` + `viewMode.test.ts` + `BoardView.tsx`; edits to `App.tsx`, `visibilityPrefs.ts` + test, `TaskRowInner.tsx`, `SettingsModal.tsx`, `ShortcutsModal.tsx`, `constants.ts`, `App.test.tsx`. Tests 117/117; typecheck clean. Filed 3 follow-ups in PLAN.md: `CORE-100` (flowtron-nat-011 investigation), `FE-032` (ProjectSelector restyle), `FE-EPIC-033` + `.1` (theme system).

**Archived:** 2026-05-16
