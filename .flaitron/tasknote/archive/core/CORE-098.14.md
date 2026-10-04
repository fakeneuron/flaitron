---
title: subtask detail-panel expand
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.11, CORE-098.3, CORE-098.4, CORE-098.6, FE-026]
---

# CORE-098.14 | subtask detail-panel expand

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]] · [[CORE-098.11]]

## 🎯 Goal

Subtasks under an expanded epic can open a `TaskDetail` panel the same way `TaskRow`/`EpicRow` do — clicking a subtask's ID button toggles a lazy-mounted detail panel inline.

## ✅ Acceptance

- [ ] `SubtaskRow.tsx` consumes `expandedId` + `setExpandedId` props and lazy-mounts `<TaskDetail>` when `expandedId === task.id` (mirrors `TaskRow.tsx:9-11,49-58` + `EpicRow.tsx:11,106-115`)
- [ ] Subtask ID button becomes a detail-toggle (replaces former `navigateToTask(task.id)` call); carries `aria-expanded={isExpandedDetail}` matching `TaskRowInner.tsx:47`
- [ ] `EpicRow.tsx:92-100` plumbs new props (`tasknotesById`, `expandedId`, `setExpandedId`, `visibility`) through to `SubtaskRow`; `density` prop is folded into `visibility` (mirrors `TaskRow.tsx` shape)
- [ ] Bundle hygiene (FE-026 preserved): entry chunk stays ≤80 KB gz; `TaskDetail-*.js` lazy chunk still present; `gray-matter` absent from `viz/dist/assets/*.js`
- [ ] `npm --prefix viz test` passes; one new test added under `App — expand-on-click toggling` covering subtask click → detail expand/collapse (count grows 105 → 106)
- [ ] `npx tsc --noEmit` clean in `viz/`
- [ ] Visual confirmation (👁️) at `npm --prefix viz run dev` (port 5120): subtask click reveals/hides TaskDetail; keyboard Enter on a selected subtask also expands/collapses (existing `useKeyboardNav.ts:103-108` already wires Enter → `setExpandedId` for any `visibleIds` entry, including subtasks)
- [ ] Wikilink-to-subtask flow (`App.test.tsx:93-120`) still passes (no setExpandedId side-effect on `navigateToTask`)

## 🧩 Subtasks

1. **Refactor `SubtaskRow.tsx`** — swap `density: DensityMode` prop for `visibility: VisibilityPrefs`; add `tasknotesById`, `expandedId`, `setExpandedId` props; import `lazy`/`Suspense`/`TaskDetail`; change ID-button `onClick` from `navigateToTask(task.id)` to `setExpandedId(expandedId === task.id ? null : task.id)`; add `aria-expanded`; wrap existing flex row in an outer `<div>` so the TaskDetail Suspense block can render below it (sibling-to-row pattern from `TaskRow.tsx:32-58`)
2. **Update `EpicRow.tsx:92-100`** — pass `tasknotesById`, `expandedId`, `setExpandedId`, `visibility` to `SubtaskRow` instead of `density`
3. **Add test in `App.test.tsx`** under `describe('App — expand-on-click toggling')` — mirror lines 143-160 for a subtask-under-epic case: render plan with epic + tasknote-backed subtask, expand the epic, click the subtask ID, expect TaskDetail panel content visible; click again, expect content hidden
4. **Run targeted suite** — `npm --prefix viz test` (expect 106/106)
5. **Type-check** — `npx tsc --noEmit` clean
6. **Bundle sanity** — `npm --prefix viz run build`; verify entry ≤80 KB gz, `TaskDetail-*.js` lazy chunk present, no `gray-matter` in `viz/dist/assets/*.js`
7. **Visual confirmation** (👁️) — `npm --prefix viz run dev` (port 5120); walk Default / Compact / Comfortable density × light / dark theme; verify subtask click + keyboard Enter both expand/collapse the detail panel

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz embellishment)
- [[CORE-098.11]] — audit subtask that filed this follow-up
- [[CORE-098.3]] — introduced `TaskRowInner` detail-toggle pattern + `expandedId` plumbing (the pattern this task extends)
- [[CORE-098.4]] — `DENSITY_TOKENS` registry consumed by SubtaskRow
- [[CORE-098.6]] — focus-ring system that the ID button retains
- [[FE-026]] — bundle-split + lazy TaskDetail discipline to preserve

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed as `.14` by `.11` audit during user visual confirmation of CORE-EPIC-098. Concrete UX gap: subtasks with their own tasknote (Goal / Acceptance / Subtasks frontmatter body) have no in-app way to reveal that body — `TaskRow`/`EpicRow` both lazy-mount `<TaskDetail>` via `expandedId` plumbing but `SubtaskRow` was skipped. The state machine already supports this (`App.tsx:58` owns `expandedId`; `useKeyboardNav.ts:103-108` toggles it for any `visibleIds` entry including subtasks per `App.tsx:212-225`); only the SubtaskRow render is missing. Scope is well-bounded: one row component + one caller + one test.

- [x] Read relevant source files (see Discovery Notes)
- [x] **Archive skim** (see Discovery Notes)
- [x] **Drift check** (see Discovery Notes)
- [x] Asked clarifying questions — 1 resolved via AskUserQuestion (Q1 below)
- [x] Subtasks above populated with concrete, ordered steps

### Clarifying-question outcome (resolved 2026-05-16)

**Q1: Click behavior on the subtask ID button.** → *Option A — toggle detail panel (matches TaskRow).* Replace the current `navigateToTask(task.id)` call (which scrolls + highlights an already-visible row — mostly a no-op visual flash for clicked subtasks) with a detail-toggle. Wikilink-to-subtask routing in `TaskDetail` still goes through `App.tsx`'s `navigateToTask`, which keeps the scroll+highlight behavior; that path is unaffected (wikilink path doesn't auto-expand details for any row type — consistent across TaskRow/EpicRow today).

**Discovery Notes:**

### Source files reviewed

- `viz/src/ui/SubtaskRow.tsx` (full read) — current shape: 56-line FC, takes `{task, density, highlightId, isSelected, navigateToTask}`. Single button on the ID (line 41-47) calls `navigateToTask`. No `expandedId` plumbing. Consumes `DENSITY_TOKENS[density].subtaskRowPad` + `ROW_HIGHLIGHT_SUBTASK` + `ROW_SELECTION_SUBTASK`. Existing focus-ring: inline `focus:ring-slate-400/500` (line 44).
- `viz/src/ui/TaskRow.tsx` (full read) — the pattern to mirror. Lazy-imports `TaskDetail` (line 9), conditionally renders `<Suspense fallback={null}><TaskDetail …/></Suspense>` when `expandedId === task.id` (line 49-58). Detail-toggle lives inside `TaskRowInner` button (line 44-48). Outer rounded `<div>` wraps both the row flex container + the conditional TaskDetail sibling.
- `viz/src/ui/EpicRow.tsx` (full read) — the caller to update. Already plumbs `expandedId`/`setExpandedId` for the epic's own detail-toggle (line 64-80 via `TaskRowInner`); just doesn't pass them down to `SubtaskRow` (line 92-100). Also lazy-imports `TaskDetail` (line 11).
- `viz/src/ui/TaskRowInner.tsx` (full read) — the detail-toggle button anatomy: `<button type="button" onClick={onToggleDetail} aria-expanded={isExpandedDetail} className="… focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500">{task.id} {description}</button>` (line 44-56). SubtaskRow's ID-button shape is similar enough to retrofit by changing only the `onClick` and adding `aria-expanded`.
- `viz/src/ui/PrioritySection.tsx` (full read) — already passes `expandedId`/`setExpandedId` to both `EpicRow` (line 75-76) and `TaskRow` (line 92-93). No changes needed here.
- `viz/src/ui/App.tsx` (line 58, 240-313 read) — `expandedId` state lives at line 58; `setExpandedId(null)` fires on project-switch (line 253) and is exposed to `useKeyboardNav` (line 303-304). `visibleIds` (line 212-225) pushes subtask IDs when their parent epic is expanded (line 220), so the keyboard nav already targets subtasks.
- `viz/src/ui/useKeyboardNav.ts` (grepped) — line 103-108: `Enter` toggles `expandedId === selectedId ? null : selectedId` for any `visibleIds` entry. **Already works for subtasks at the state level**; only the SubtaskRow render side is missing.
- `viz/src/ui/App.test.tsx` (lines 85-160) — the test pattern to mirror. `describe('App — expand-on-click toggling')` at line 123-161 has the canonical click-twice-and-collapse test for `TaskRow`. The wikilink-to-subtask test at line 93-120 uses `screen.getByRole('button', { name: /CORE-900/, expanded: false })` — confirms TaskRowInner's detail-toggle button is queryable by `aria-expanded`; same `expanded:` filter will work for the new SubtaskRow toggle.

### Archive skim (source paths: `SubtaskRow.tsx`, `EpicRow.tsx`)

`grep -l 'SubtaskRow\|EpicRow' archive/{core,frontend}/*.md`:

- **CORE-098.11** (audit — just read; filed this task as finding #1b, lines 289 of archive) — recap notes `SubtaskRow.tsx:41-47` plumbing missing.
- **CORE-098.8** (motion polish) — added hover-tint to SubtaskRow/EpicRow + grid-rows trick that keeps subtask DOM mounted while collapsed (one `App.test.tsx` `toBeNull()` assertion was updated). Doesn't affect this task — the grid-rows wrapper is around the subtask-list container in EpicRow, not inside individual SubtaskRow.
- **CORE-098.7** (epic-row visual lift) — added `EPIC_ROW_NEUTRAL` + `epicRowOutlineClass` helper. No SubtaskRow impact.
- **CORE-098.6** (focus-ring system) — pinned SubtaskRow's nav-button focus-ring at line 44 with inline `focus:ring-slate-400/500`. Audit `.11` finding #1b suggested retrofitting via `PILL_*` constants but that's a chip-pattern; SubtaskRow's button is row-text not a pill, so inline focus-ring is correct. **Preserve inline focus-ring on the new toggle button** — no visual change.
- **CORE-098.4** (density modes) — added `DENSITY_TOKENS.subtaskRowPad` + `interRowGap` consumed by SubtaskRow/EpicRow. SubtaskRow consumes via `density: DensityMode` prop today; this task will fold `density` into `visibility` to match TaskRow/EpicRow shape and read `visibility.density` internally.
- **CORE-098.3** (settings-modal scaffold) — introduced the `expandedId` + `TaskRowInner` detail-toggle pattern this task extends. Schema v1 has `detailSections: {goal, acceptance, subtasks}` — TaskDetail honors these toggles per `App.test.tsx:367-381`. We pass `detailSections={visibility.detailSections}` through to TaskDetail in SubtaskRow, mirroring TaskRow.
- **CORE-098.2** (typography & color audit) — `ROW_HIGHLIGHT_SUBTASK` / `ROW_SELECTION_SUBTASK` constants consumed by SubtaskRow. No change here.
- **CORE-098.1** (Discovery) — original child-task scope, 10 deferred items. This task wasn't in `.1`'s scope; it's an audit follow-up (`.11`).
- **FE-007** (split App.tsx) — extracted EpicRow/TaskRow/SubtaskRow into separate files. Sets the pattern this task extends.
- **FE-008** (row-density redesign) — established the current SubtaskRow visual (checkbox-marker + monospace ID + truncated description). Keep this visual; only change the button's onClick.
- **FE-019** (a11y/perf pass) — zero `tabIndex` / `role=` overrides discipline; native semantics. The new `aria-expanded` attribute is native HTML — preserves the FE-019 baseline.
- **FE-021** (row-outline-dedup) — `epicRowOutlineClass` / `rowOutlineClass` helpers. SubtaskRow doesn't use these (uses `ROW_HIGHLIGHT_SUBTASK` / `ROW_SELECTION_SUBTASK` direct).
- **FE-024** (App.tsx decomposition) — extracted state + helpers including `useKeyboardNav`. Sets the keyboard-nav pattern that already works for subtasks.
- **FE-026** (viz-bundle-code-split) — established the lazy-TaskDetail discipline. **Critical**: SubtaskRow's new TaskDetail import MUST use `lazy(() => import('./TaskDetail'))` and `<Suspense fallback={null}>`, not a static import — otherwise `gray-matter` + `react-markdown` would land in the entry chunk and break FE-026's discipline (audit `.11` verified post-`.11` bundle: entry 55.43 KB gz, lazy chunk 48.21 KB gz, no gray-matter in entry — must not regress).

### Drift check

PLAN.md line cites three specific code references:

- ✅ `SubtaskRow.tsx` exists at `viz/src/ui/SubtaskRow.tsx` — confirmed (line numbers in audit's finding #1b: lines 41-47 are the ID-button block, still accurate).
- ✅ `TaskRow`/`EpicRow` pattern exists — confirmed via read; both lazy-mount `TaskDetail` via `expandedId === task.id`.
- ✅ `expandedId` plumbing absent from `SubtaskRow.tsx` — confirmed by re-read (props are `task, density, highlightId, isSelected, navigateToTask`; no `expandedId` / `setExpandedId`).

No path or function-name drift between the audit's finding (filed 2026-05-16, same day) and current code.

### Design decisions captured

1. **Click target = ID-text button** (per user Q1 answer): the existing button shape (ID + description in one click target) is preserved; only `onClick` swaps from `navigateToTask` to `setExpandedId` toggle. `aria-expanded` added.
2. **Visual structure**: wrap the existing `<div className="flex items-center …">` in an outer `<div>` so the conditional Suspense+TaskDetail block can render below it. Mirrors `TaskRow.tsx`'s outer `<div className="rounded border …">` wrapping a row-flex + conditional TaskDetail. SubtaskRow's outer wrapper has no border/background (subtasks live inside the EpicRow's subtask-list container with its own bg-tint), so the outer div is purely structural.
3. **Prop signature swap** `density` → `visibility` (mirrors `TaskRow`/`EpicRow` props). Internal: read `visibility.density` for `DENSITY_TOKENS` lookup; read `visibility.detailSections` to pass to `TaskDetail`.
4. **`navigateToTask` prop stays** — repurposed: was used for the ID-button onClick (going away); now passed through to `<TaskDetail navigateToTask={navigateToTask}/>` for wikilink resolution inside the subtask's detail panel. Same prop, different consumer.
5. **Out of scope**: `.13` (subtaskContainerPad density token at `EpicRow.tsx:90`) is a separate filed task — explicitly NOT touched here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `TaskRow.tsx:9-11,49-58` + `EpicRow.tsx:11,106-115` lazy-`TaskDetail` shape verbatim. `SubtaskRow` swapped `density: DensityMode` → `visibility: VisibilityPrefs` to match `TaskRow`/`EpicRow` prop signature.
- [x] Implemented the minimal solution — `SubtaskRow.tsx` rewritten (84 LOC vs prior 56); `EpicRow.tsx:92-102` callsite updated with new props
- [x] Updated/added tests for non-trivial behavior — one new test under `App — subtask expand-on-click toggling` mirroring the existing `App — expand-on-click toggling` shape

**Implementation Notes:**

- `SubtaskRow.tsx` changes:
  - Imports added: `Suspense`, `lazy` from React; `Tasknote` type; `VisibilityPrefs` type
  - Prop swap: `density: DensityMode` → `visibility: VisibilityPrefs` (read `visibility.density` internally for `DENSITY_TOKENS`; read `visibility.detailSections` to pass into `TaskDetail`)
  - Props added: `tasknotesById`, `expandedId`, `setExpandedId`
  - Outer structural `<div>` now hosts the row + conditional Suspense+TaskDetail sibling; `id="row-${task.id}"` stayed on the inner flex container alongside the `ROW_HIGHLIGHT_SUBTASK` className (preserves `App.test.tsx:115-116` wikilink assertion `targetRow.className.toMatch(/ring-indigo/)`)
  - ID-button: `onClick` swapped from `navigateToTask(task.id)` to `setExpandedId(isExpandedDetail ? null : task.id)`; `aria-expanded={isExpandedDetail}` added; layout class refined to `flex min-w-0 flex-1 items-center gap-2 rounded text-left focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500` (mirrors `TaskRowInner.tsx:48` exactly; the ID + description split into the same two-span structure so the whole text-area is the click target)
  - Conditional Suspense+`<TaskDetail task tasknote={tasknotesById.get(task.id)} detailSections={visibility.detailSections} navigateToTask={navigateToTask} />` rendered when `isExpandedDetail`
- `EpicRow.tsx:92-102` callsite: dropped `density={density}`; added `tasknotesById`, `visibility`, `expandedId`, `setExpandedId` (4 new props passed through)
- `App.test.tsx`: new `describe` block inserted before `App — row StatusChip`; mirrors the `App — expand-on-click toggling` shape with a tasknote-backed CORE-1.1 subtask under CORE-EPIC-1; verifies click expands `TaskDetail` (goal text visible) and second click hides it (toggle round-trips). 22 tests in `App.test.tsx` (up from 21).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **106/106 pass** (was 105 pre-`.14`; +1 new test). Wikilink-to-subtask test (`App.test.tsx:93-120`) still green: `id="row-CORE-1.1"` + `ring-indigo` class preserved on the inner flex container.
- [x] Ran lint/type-check on changed code — `cd viz && npx tsc --noEmit` clean (no output). Also clean inside `npm run build` (which runs `tsc --noEmit` first per `viz/package.json`).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — **functional behavior confirmed** (subtask click + Enter both expand/collapse the panel across density × theme). User flagged the visual rendering as "could be prettier" and noted starter-context body rendering wants a polish pass too — filed as **CORE-098.15** (`TaskDetail visual polish`) per `SPEC/epic.md` audit-followup pattern; out of scope for `.14`.

**Testing Notes:**

### Bundle sanity (`npm --prefix viz run build`, 2026-05-16)

| Asset | Raw | Gzipped | vs `.11` audit | vs 80 KB bar |
|---|---|---|---|---|
| `dist/index.html` | 0.93 kB | 0.53 kB | — | — |
| `dist/assets/index-*.css` | 24.79 kB | 5.00 kB | unchanged | — |
| `dist/assets/index-*.js` (entry) | 176.83 kB | **55.46 KB gz** | **+0.03 KB gz** | −24.54 KB headroom |
| `dist/assets/TaskDetail-*.js` (lazy) | 158.75 kB | **48.21 KB gz** | **unchanged** | — |

- 313 modules transformed (same as `.11`).
- `grep -l 'gray-matter' viz/dist/assets/*.js` → **0 hits** ✅ (FE-026 preserved)
- `grep -l 'react-markdown' viz/dist/assets/*.js` → only `TaskDetail-*.js` ✅ (lazy chunk only)
- Entry-chunk delta of +0.03 KB gz from the +5 LOC import surface (`Suspense`, `lazy`, `TaskDetail` type, `Tasknote` type, `VisibilityPrefs` type) is rounding-noise; lazy chunk size unchanged confirms `TaskDetail` did not regress into a static import.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview unaffected by a viz internal-rendering subtask.
  - `SPEC.md` — **no change.** Workflow contract unchanged.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md `.14` line flipped to stub form `Completed 2026-05-16.` (subtask completions stay under the epic per `CORE-098.12` / `.11` precedent — not moved to `## Completed`); follow-up `.15` filed under the epic before `.14` flipped; tasknote moved to `_project/tasknote/archive/core/CORE-098.14.md`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate — frontend files in diff means fire branch)

**Final Summary:**

Closed audit-follow-up `.14` from CORE-EPIC-098. The gap (filed by `.11` audit's finding #1b): `SubtaskRow.tsx` had no `expandedId` plumbing — subtasks under expanded epics couldn't open a `TaskDetail` panel even though the App-level state machine (`expandedId` at `App.tsx:58`, Enter-toggle at `useKeyboardNav.ts:103-108`) already supported it for any `visibleIds` entry. Fix mirrored `TaskRow`/`EpicRow`'s shape verbatim: added `lazy(() => import('./TaskDetail'))` + `<Suspense fallback={null}>` to `SubtaskRow.tsx`; swapped its `density: DensityMode` prop for `visibility: VisibilityPrefs` to match `TaskRow`/`EpicRow` signature; added `tasknotesById`/`expandedId`/`setExpandedId` props; repurposed the existing ID button as the detail-toggle (clicking the ID/description now toggles `setExpandedId(...)` with `aria-expanded={isExpandedDetail}` — replaces the redundant `navigateToTask(task.id)` call which only re-scrolled an already-visible row); wrapped the row in an outer structural `<div>` so the conditional Suspense+TaskDetail block renders as a sibling below it (the `row-${task.id}` anchor + `ROW_HIGHLIGHT_SUBTASK` class stay together on the inner flex container, preserving the wikilink test's `targetRow.className.toMatch(/ring-indigo/)` assertion at `App.test.tsx:115-116`). `EpicRow.tsx:92-102` callsite updated to pass the 4 new props. One new test added under `App — subtask expand-on-click toggling` (mirrors the existing `App — expand-on-click toggling` shape for `TaskRow`) — 105 → 106 tests, all green. `tsc --noEmit` clean. Bundle: entry **55.46 KB gz** (+0.03 vs `.11` baseline; 24+ KB headroom under the 80 KB bar), `TaskDetail-*.js` lazy chunk **48.21 KB gz** (unchanged — confirms `TaskDetail` did not regress to a static import); `gray-matter` absent from client bundle; `react-markdown` still scoped to the lazy chunk (FE-026 discipline preserved). Visual confirmation: user verified the toggle behavior across density × theme; flagged the rendering as visually cramped and starter-context as wanting a polish pass — filed as **`.15`** (`TaskDetail visual polish`) per `SPEC/epic.md` audit-followup pattern. Closure diff: `viz/src/ui/SubtaskRow.tsx` (rewritten — 56 → 84 LOC; primary change), `viz/src/ui/EpicRow.tsx` (3-line prop update at the SubtaskRow callsite), `viz/src/ui/App.test.tsx` (~50 LOC new describe block + test), `_project/PLAN.md` (1 line flipped to stub + 1 line added for `.15`), and this tasknote (full body → archived).

**Archived:** 2026-05-16
