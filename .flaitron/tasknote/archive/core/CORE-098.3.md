---
title: settings-modal scaffold
status: completed
tags: [viz, ui, settings]
created: 2026-05-15
due:
related-tasks: [CORE-EPIC-098, CORE-098.1, CORE-098.2, CORE-098.9]
---

# CORE-098.3 | settings-modal scaffold

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Add a gear-icon trigger in the viz header rail that opens a native-`<dialog>` settings modal with selective-visibility toggles for row chips (tags / model / related / due) and detail-panel sections; persist preferences in `localStorage` per project.

## ✅ Acceptance

- [ ] Gear-icon button (`⚙️`) lands in the header right cluster, after `ThemeToggle`, matching the existing button-chrome style (`rounded border border-slate-300 …`); `aria-label="Open settings"` and `title="Settings"`
- [ ] New `viz/src/visibilityPrefs.ts` module exports `VisibilityPrefs` type, `DEFAULT_PREFS`, `readVisibilityPrefs(project)`, `writeVisibilityPrefs(project, prefs)`; localStorage key `flowtron-viz-prefs:<projectName>`; schema carries `version: 1`; bad/missing JSON returns `DEFAULT_PREFS`
- [ ] Pref shape: `{ version: 1, rowChips: { tags, model, related, due: false }, detailSections: { goal, acceptance, subtasks: true } }`; row chips all default OFF (post-FE-031 lean default); detail sections all default ON (matches current TaskDetail behavior)
- [ ] New `viz/src/ui/SettingsModal.tsx` renders a native `<dialog>` with `showModal()` API, two grouped sections (Row chips / Detail panel sections), a Reset-to-defaults button, and a Done button; closes on Esc, on Done click, and on backdrop click; `aria-labelledby` points at the modal heading
- [ ] New `viz/src/ui/ModelChip.tsx` (display-only — Opus / Sonnet label with `font-mono caption` styling) and `viz/src/ui/RelatedChip.tsx` (display-only — single chip per related ID, no click handler; shows up to 3 IDs + `+N` overflow indicator)
- [ ] `TaskRowInner.tsx` accepts a `visibility` prop (row-chips subset); renders chips conditionally — `tags` (frontmatter inline span per tag), `model` (`<ModelChip>`), `related` (`<RelatedChip>`), `due` (frontmatter inline span); existing PhaseDots / SubtaskProgress / StatusChip kept verbatim; chips slot **between** the PhaseDots/SubtaskProgress column and the StatusChip column (left-of-status), respecting the post-FE-031 two-column grid
- [ ] `TaskDetail.tsx` accepts a `detailSections` prop; conditionally renders Goal / Acceptance / Subtasks sections based on prefs; starter-context branch + meta-header unchanged
- [ ] Visibility prefs plumb cleanly through `App.tsx` → `PrioritySection.tsx` → `TaskRow.tsx` / `EpicRow.tsx` → `TaskRowInner.tsx` / `TaskDetail.tsx`; no React context (drill depth bounded; matches FE-031 prop-drill style)
- [ ] App loads prefs on `activeProject` change (alongside `load(activeProject)`); writes happen synchronously on toggle/reset
- [ ] `SubtaskRow.tsx` unchanged — visibility prefs apply only to top-level `TaskRow` / `EpicRow` (post-FE-031 SubtaskRow stays minimal; future task can extend if signal warrants)
- [ ] Chevron-button precedence: gear button does **not** open the modal when keyboard focus is on a row's chevron / detail-toggle; gear has its own focus path
- [ ] `npm --prefix viz run test` passes (full vitest suite, including new `visibilityPrefs.test.ts` + `App.test.tsx` settings-modal cases)
- [ ] `npm --prefix viz exec tsc -- --noEmit` clean
- [ ] User visually confirms (👁️) at `http://localhost:5176`: gear opens modal; toggling each row chip on shows that chip in rows (tags, model, related, due); toggling each detail-section off hides it in the expanded detail panel; Reset-to-defaults restores OFF row-chips / ON detail-sections; modal closes on Esc + backdrop click + Done; prefs survive a page refresh; switching project loads a different (or default) pref set
- [ ] FE-019 a11y baseline preserved — Lighthouse a11y stays ≥94 (settings modal uses native `<dialog>` for focus-trap / focus-restore; all controls have accessible names)

## 🧩 Subtasks

- [ ] Pattern survey — confirm `viz/src/projectStorage.ts` is the canonical per-project localStorage helper precedent (existing `ACTIVE_PROJECT_KEY`); extend the same try/catch shape for `visibilityPrefs.ts`
- [ ] Build `viz/src/visibilityPrefs.ts` — types + `DEFAULT_PREFS` + `readVisibilityPrefs(project)` + `writeVisibilityPrefs(project, prefs)`; key-prefix `flowtron-viz-prefs:`; safe-parse with `version` check; bad/missing → defaults
- [ ] Build `viz/src/visibilityPrefs.test.ts` — round-trip read/write, defaults on missing/bad JSON, per-project isolation, version-mismatch falls back to defaults
- [ ] Build `viz/src/ui/SettingsModal.tsx` — `<dialog>` with grouped checkboxes for `rowChips` (Tags / Model / Related / Due) and `detailSections` (Goal / Acceptance / Subtasks); Reset + Done buttons; backdrop-click closes (use `dialog.addEventListener('click', e => e.target === dialog && dialog.close())`)
- [ ] Build `viz/src/ui/ModelChip.tsx` — simple span: `font-mono text-[10px] uppercase` with subtle border; takes `model: 'opus' | 'sonnet'`
- [ ] Build `viz/src/ui/RelatedChip.tsx` — small chip showing up to 3 related IDs (separated by spaces) + `+N` overflow indicator; display-only (no click); same `caption` typography
- [ ] Modify `viz/src/ui/App.tsx` — add `visibilityPrefs` state + load-on-project-change effect; add gear button (rightmost in header right cluster); pass `setVisibilityPrefs` + `prefs` to `<SettingsModal>`; pass `visibility` prop down to `PrioritySection`
- [ ] Modify `viz/src/ui/PrioritySection.tsx` — accept + forward `visibility` prop to `TaskRow` / `EpicRow`
- [ ] Modify `viz/src/ui/TaskRow.tsx` + `EpicRow.tsx` — accept `visibility` prop; forward `rowChips` to `TaskRowInner`; forward `detailSections` to `<TaskDetail>`
- [ ] Modify `viz/src/ui/TaskRowInner.tsx` — accept `rowChips` prop; render Tags / Model / Related / Due chips conditionally in a new middle-column slot (left of StatusChip); inline span style for Tags + Due; component imports for ModelChip + RelatedChip
- [ ] Modify `viz/src/ui/TaskDetail.tsx` — accept `detailSections` prop; gate Goal / Acceptance / Subtasks rendering on `detailSections.{goal,acceptance,subtasks}`
- [ ] Modify `viz/src/ui/App.test.tsx` — add `describe` for settings modal: gear opens dialog; toggling rowChips.tags + rowChips.model renders chips in the row; toggling detailSections.subtasks hides the Subtasks section in expanded detail; Done closes the modal; new test for cross-project pref isolation (switch active project → prefs reload)
- [ ] Run `npm --prefix viz exec tsc -- --noEmit`
- [ ] Run `npm --prefix viz run test` (vitest)
- [ ] Start dev server (`npm --prefix viz run dev`) and ask user for visual confirmation (👁️)

## 🔗 Related

- [[CORE-EPIC-098]] — parent embellishment epic
- [[CORE-098.1]] — discovery subtask that filed this work
- [[CORE-098.2]] — predecessor: typography & color audit
- [[CORE-098.9]] — follow-up: keyboard-shortcuts overlay reuses this `<dialog>` infra

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-098.1 (Discovery, 2026-05-15) filed this child with a complete sketch of the modal mechanics, target call-sites, and pref-shape direction. CORE-098.2 (typography & color audit, 2026-05-15) just shipped the `constants.ts` token registry that the new gear button + modal will style against — clean foundation. The viz UI surface stabilized after FE-031 (chip-system trim, 2026-05-14) which intentionally trimmed the per-row chips this task selectively re-introduces as opt-in: scope is well-bounded to `viz/src/ui/` + one new sibling module under `viz/src/`. No competing in-flight work touches these files. FE-019 a11y baseline is preserved by leveraging the native `<dialog>` element's built-in focus-trap + Esc-close + focus-restore — no net-new a11y infra needed.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions — 3 resolved via AskUserQuestion (see Discovery Notes §"Clarifying-question outcomes")
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

`viz/src/ui/App.tsx` (header structure + state plumbing; gear lands rightmost in the right cluster, after `ThemeToggle`), `viz/src/ui/TaskRowInner.tsx` (current 2-column grid: PhaseDots/SubtaskProgress | StatusChip — chips slot left of StatusChip), `viz/src/ui/TaskDetail.tsx` (renders Goal / Acceptance / Subtasks for tasknote rows; starter-context branch unchanged), `viz/src/ui/PrioritySection.tsx`, `TaskRow.tsx`, `EpicRow.tsx` (prop-drill chain for `visibility`), `viz/src/ui/ThemeToggle.tsx` (button-chrome style the gear matches), `viz/src/ui/constants.ts` (post-CORE-098.2 token registry — TYPOGRAPHY / chip color tokens), `viz/src/projectStorage.ts` (canonical per-project localStorage helper — same try/catch shape for `visibilityPrefs.ts`), `viz/src/parser.ts` (`Task.model` + `Task.relatedTasks` exist), `viz/src/tasknote.ts` (`TasknoteFrontmatter.tags` + `due` exist), `viz/src/ui/SubtaskRow.tsx` (out of scope — stays minimal), `viz/package.json` (Tailwind 3.4.10 supports `backdrop:` modifier; jsdom 25 supports `<dialog>.showModal()` — no polyfill needed for tests).

### Archive skim — load-bearing precedents

- `FE-031` (chip-system trim, 2026-05-14) — **directly relevant.** Deleted `ModelChip.tsx`, `RelatedChip.tsx`, `BlockerChip.tsx`, `BackRefChip.tsx` and stripped tag/due inline rendering. Also removed the header Tags filter row. This task is the *additive* path back, but only inside the modal-toggle flow (default OFF). User's strong "low default density" preference (confirmed again in Q1 of this Discovery: "I just don't want to see them at the top menu bar to clutter everything up") is what informs default-OFF for all 4 row chips. ModelChip + RelatedChip get fresh, simpler shapes (display-only — no click-to-navigate on Related) per user Q2.
- `FE-024` (viz-app-decomposition) — established the prop-drill chain App → PrioritySection → TaskRow/EpicRow → TaskRowInner. The `visibility` prop rides the same chain; no React context introduced (drill depth bounded; context premature).
- `FE-019` (a11y + perf baseline) — Lighthouse 84/94/96/82 stands today; native `<dialog>` preserves the a11y baseline (focus-trap, focus-restore, Esc-close — all free). Bundle-size budget (per CORE-098.1: FE-026 sets the React-Markdown code-split precedent): SettingsModal is small + not lazy-imported (always-visible header button); ModelChip + RelatedChip are tiny; net addition ≪ 1KB gzipped.
- `FE-008` (row-density redesign) — established the two-cluster grid + Tier 1/Tier 2 chip hierarchy. New chips sit as Tier 2 (caption typography, same scale as StatusChip) in the grid; don't introduce a new tier.
- `FE-005` (vertical-list rebuild) — the layout the modal feature must preserve (it does — modal is overlay, doesn't disturb rows).
- `FE-013` (polish bundle) — precedent that granular per-feature children are valid scope shapes; this scaffold is the meaty one in the epic (5 new files + 7 modified) and warrants the [opus] tag the PLAN line carries.

### Drift check

PLAN.md line cites `localStorage` and the four chip names — all match current code state. Two implicit references confirmed:
- "Gear-icon trigger in header rail" — header rail's right cluster (search + ⓘ + ThemeToggle) is intact (App.tsx:299-319); gear lands rightmost after ThemeToggle.
- "selective-visibility controls for row chips" — row chips don't exist *as components* post-FE-031 (Q2 confirmed re-introducing as fresh slim files). The "row" surface is `TaskRowInner.tsx` (used by TaskRow + EpicRow, not SubtaskRow per FE-031 scope).

One PLAN-line detail to flag (not drift — extension): "detail-panel sections" in PLAN says nothing about which sections. CORE-098.1 sketch listed Goal / Acceptance / Subtasks / **Phase checklists**. Phase-checklists aren't rendered by current TaskDetail (Q3 confirmed defer); modal toggles only the 3 currently-rendered sections.

### Clarifying-question outcomes (resolved 2026-05-15)

1. **Scope of chip-visibility loop** — *Full scaffold (Q1).* Re-introduce tags / model / related / due as opt-in row chips, all default OFF; modal toggles take visible effect end-to-end. User's free-text: "chips are okay i just don't want to see them at the top menu bar to clutter everything up. in the tasknotes they are fine." Interpreted as: agree with the Option-A spirit + reinforce default-OFF for row-strip chips; detail-panel sections (Goal/Acceptance/Subtasks, rendered when row is expanded into a tasknote view) default ON. Default state is the operational expression of the user's lean-by-default preference.
2. **Chip component shapes** — *Fresh slim components (Q2).* Two new TSX files: `ModelChip.tsx` (display-only `font-mono` Opus/Sonnet label) and `RelatedChip.tsx` (display-only — up to 3 IDs + `+N` overflow, no click handler — simpler than pre-FE-031). Tags + Due render inline in `TaskRowInner.tsx` (matches pre-FE-031 shape — both were inline, not separate components). ~60-80 LOC net-new across the two chip files.
3. **Phase-checklist toggle** — *Defer (Q3).* Modal only toggles the 3 currently-rendered detail sections (Goal / Acceptance / Subtasks, all default ON). Phase-checklist parsing + rendering is a separate concern (would extend `Tasknote` type + parser + TaskDetail) — out of scope for `.3`. Can be revisited if a future child surfaces the need.

### Pref shape — final

```ts
export interface VisibilityPrefs {
  version: 1;
  rowChips: { tags: boolean; model: boolean; related: boolean; due: boolean };
  detailSections: { goal: boolean; acceptance: boolean; subtasks: boolean };
}
export const DEFAULT_PREFS: VisibilityPrefs = {
  version: 1,
  rowChips: { tags: false, model: false, related: false, due: false },
  detailSections: { goal: true, acceptance: true, subtasks: true },
};
```

Storage key: `flowtron-viz-prefs:<projectName>` — mirrors the existing `flowtron-viz-active-project` shape from `projectStorage.ts`. `version: 1` field protects against future schema migration (unknown-version reads fall back to defaults; one of the few places where forward-thinking validation pays for itself, since prefs survive on a user's disk across viz upgrades).

### Modal sketch (mechanics + a11y)

```tsx
<dialog ref={dialogRef} className="rounded-lg p-0 backdrop:bg-slate-900/40 …">
  <div className="p-4 min-w-[20rem]">
    <h2 id="settings-title" className="text-sm font-semibold mb-3">Settings</h2>
    <fieldset className="mb-3">
      <legend className="text-[10px] uppercase text-slate-500 mb-1.5">Row chips</legend>
      {/* Tags / Model / Related / Due — checkboxes */}
    </fieldset>
    <fieldset className="mb-3">
      <legend className="text-[10px] uppercase text-slate-500 mb-1.5">Detail panel</legend>
      {/* Goal / Acceptance / Subtasks — checkboxes */}
    </fieldset>
    <div className="flex justify-between">
      <button onClick={onReset}>Reset to defaults</button>
      <button onClick={onClose} autoFocus>Done</button>
    </div>
  </div>
</dialog>
```

a11y notes: `<dialog>` element + `showModal()` give focus-trap, focus-restore on close, Esc-to-close for free. `aria-labelledby="settings-title"` points the dialog at its heading. Each checkbox wraps in `<label>` for accessible name. Backdrop-click close: explicit handler — `dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); })` (the click target is `dialog` when the click lands on the backdrop, since `<dialog>` is sized to its content and `::backdrop` overflows outward).

### Row-chip placement sketch

TaskRowInner's current grid: `[PhaseDots/SubtaskProgress | StatusChip+extraRightSlot]`. Insert a third column between for the opt-in chips:

```
| PhaseDots SubtaskProgress | [Tags] [Model] [Related] [Due] | StatusChip [extraRightSlot] |
```

Each chip section conditionally renders only when its visibility toggle is ON. When all 4 row-chip toggles are OFF (the default), the middle column collapses to zero width — row looks identical to today's post-FE-031 baseline. This preserves the lean default the user reaffirmed in Q1.

### Expected closure-diff signal profile (informs Step 6 📦 evaluation)

- Frontend files: **yes** (5 new + 7 modified `.tsx` / `.ts` in `viz/src/` + `viz/src/ui/`) → 📦 **fires**
- Privileged-ops paths: no
- Perf-narrative: no (a few small new components + prop-drill; no hot-path / cache / index work; `<dialog>` adds nothing measurable to TTI)

The 📦 gate fires on this closure; the user gives one bundled approval after seeing the closure review + recap + visual confirmation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — confirmed `viz/src/projectStorage.ts` is the canonical per-project localStorage helper (try/catch'd `window.localStorage.{get,set}Item`); `visibilityPrefs.ts` extends the same shape with a typed payload. Confirmed prop-drill (no React context) is the established App→PrioritySection→TaskRow/EpicRow→TaskRowInner shape post-FE-024 (FE-031 followed it too). Confirmed `effectiveStatus` / `Tasknote.frontmatter` data sources are intact (FE-031 preserved frontmatter; only UI surface was trimmed). No new shape introduced.
- [x] Implemented the minimal solution — 5 new files, 7 modified, 1 test-setup polyfill, 1 new test file. See Implementation Notes.
- [x] Updated/added tests for non-trivial behavior — 6 new tests in `visibilityPrefs.test.ts`; 5 new settings-modal tests in `App.test.tsx`. Existing 84 tests untouched and still passing.

**Implementation Notes:**

### Files changed (12 source + 1 test-setup polyfill)

**New (5):**
- `viz/src/visibilityPrefs.ts` — `VisibilityPrefs` type + `DEFAULT_PREFS` + `readVisibilityPrefs(project)` / `writeVisibilityPrefs(project, prefs)`; key `flowtron-viz-prefs:<projectName>`; safe-parse with version + per-key boolean coercion (missing fields fall back to defaults, malformed JSON / unknown version → defaults)
- `viz/src/visibilityPrefs.test.ts` — 6 tests: defaults on empty, round-trip, per-project isolation, malformed-JSON fallback, unknown-version fallback, partial-coercion
- `viz/src/ui/SettingsModal.tsx` — native `<dialog>` with two `<fieldset>` groups (Row chips / Detail panel), Reset + Done buttons; effects sync `open` prop to `dialog.showModal()` / `close()`; backdrop-click handler closes; `aria-labelledby="settings-modal-title"`
- `viz/src/ui/ModelChip.tsx` — `font-mono text-[10px]` Opus / Sonnet label with subtle border
- `viz/src/ui/RelatedChip.tsx` — display-only chip showing up to 3 IDs + `+N` overflow indicator (no click handler — simpler than pre-FE-031)

**Modified (7):**
- `viz/src/ui/App.tsx` — added `visibilityPrefs` + `settingsOpen` state; gear button (rightmost in header right cluster, after ThemeToggle); pref load/write effect on `activeProject` change; `<SettingsModal>` mounted at end of root `<div>`; `visibility={visibilityPrefs}` passed to `<PrioritySection>`
- `viz/src/ui/PrioritySection.tsx` — accepts + forwards `visibility` prop to `<EpicRow>` / `<TaskRow>`
- `viz/src/ui/TaskRow.tsx` — accepts `visibility`; forwards `rowChips` to `TaskRowInner` and `detailSections` to `TaskDetail`
- `viz/src/ui/EpicRow.tsx` — same: forwards `rowChips` to `TaskRowInner` and `detailSections` to `TaskDetail`
- `viz/src/ui/TaskRowInner.tsx` — accepts `rowChips` prop; expanded grid from 2 cols → 3 cols (PhaseDots/Subtask | optional-chips | StatusChip+extraRightSlot); middle col conditionally renders Tags / Model / Related / Due chips (or zero-width when all OFF — preserves the post-FE-031 lean default)
- `viz/src/ui/TaskDetail.tsx` — accepts `detailSections` prop; gates Goal / Acceptance / Subtasks rendering on `detailSections.{goal,acceptance,subtasks}`; starter-context branch + meta-header unchanged
- `viz/src/ui/App.test.tsx` — added `describe('App — settings modal')` with 5 tests: gear opens dialog → Done closes; toggling row-chip prefs surfaces tags + model in the row; toggling Subtasks pref hides the Subtasks section in expanded detail; Reset to defaults restores OFF row-chips; per-project switch reloads prefs from that project's localStorage key

**Test-setup polyfill (1):**
- `viz/src/test/setup.ts` — added jsdom-25 polyfill for `HTMLDialogElement.prototype.{showModal, show, close}` (jsdom 25 ships the constructor but not the methods); minimal stub toggles the `open` attribute and fires the `close` event. Localized to test setup — production code uses the real native `<dialog>`.

### Decisions made during execution

- **3-column grid in TaskRowInner.** Instead of inserting chips into the existing right-col flex (which would crowd StatusChip), added a dedicated middle grid col. When all 4 row-chip toggles are OFF (the default), the middle col renders an empty `<div>` and the row visually matches the post-FE-031 baseline — preserves the lean default the user reaffirmed in Q1.
- **`<dialog>.showModal()` vs imperative state mirror.** The modal accepts an `open` prop and an `onClose` callback. An effect syncs `open` → `showModal()`/`close()`; a separate effect listens for the dialog's native `close` event (fired on Esc, backdrop click, or `dialog.close()`) and routes back to `onClose`. This way React state stays the source of truth, but the user-visible Esc / backdrop / button paths all converge through the same `close()` → `'close'` event → `onClose` flow.
- **Backdrop click closes via event-target check.** `dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close() })` — when the user clicks the `::backdrop` pseudo-element, the click event's `target` is the `<dialog>` itself (not a child), so this is a clean way to detect backdrop vs. content clicks without measuring coordinates.
- **Schema versioning in `VisibilityPrefs`.** Added `version: 1` field — overrides the usual "no speculative future-proofing" rule because prefs survive on a user's disk across viz upgrades, and a malformed-on-bump schema would crash row rendering. Unknown-version reads fall back to `DEFAULT_PREFS`.
- **No subtask-row chips.** Per Discovery scope, the `visibility` prop reaches TaskRow + EpicRow only. SubtaskRow stays minimal post-FE-031.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **95/95 pass** (7 test files, 9.11s). Includes 6 new `visibilityPrefs.test.ts` cases + 5 new settings-modal cases in `App.test.tsx`; all 84 pre-existing tests untouched.
- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) clean (zero errors). No linter is configured in viz (per CORE-098.1 / FE-031 — typecheck is the static-analysis layer).
- [x] (frontend) Asked the user for visual confirmation — user confirmed "looks good" and requested one tweak: flip `DEFAULT_PREFS.rowChips.model` from `false` → `true` so the model chip surfaces by default (a `[opus]`/`[sonnet]` tag is on most PLAN lines and carries useful at-a-glance signal). Re-ran tests after the flip; 95/95 still pass.

**Testing Notes:**

- `tsc --noEmit`: clean (both before + after the model-default flip).
- `vitest run`: 95/95 pass. New tests cover the full settings-modal lifecycle: open via gear, toggle each pref class (renaming the row-chip test to "surfaces hidden chips and hides shown ones" to reflect that model is now ON by default), Reset to defaults restores the new defaults (tags OFF / model ON), per-project pref isolation on project switch. The `visibilityPrefs.test.ts` per-project + partial-coercion cases were also retargeted to assert against the new defaults.
- jsdom 25 ships `HTMLDialogElement` but not `showModal`/`close` — added a minimal polyfill in `src/test/setup.ts` that toggles the `open` attribute and fires the `close` event (parallels the existing `scrollIntoView` / `matchMedia` / `EventSource` test polyfills in the same file). Production code path uses the real native `<dialog>` API.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview; viz-internal settings modal + new opt-in chip surface don't shift the flowtron-as-a-product surface.
  - `SPEC.md` — **no change.** Workflow contract unchanged; this task consumes the existing 4-phase + epic-subtask contracts as-is.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-15.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (bundles into the 📦 ready-to-commit gate — fires on the frontend-files signal)

**Final Summary:**

Scaffolded the viz settings modal end-to-end. Added a gear-icon (`⚙️`) button in the header right cluster (rightmost, after `ThemeToggle`) that opens a native `<dialog>` with two grouped sections: **Row chips** (Tags / Model / Related / Due) and **Detail panel** (Goal / Acceptance / Subtasks), plus Reset-to-defaults and Done buttons. Preferences persist in `localStorage` per-project under key `flowtron-viz-prefs:<projectName>`, with a `version: 1` schema field gating future migrations (malformed JSON or unknown version falls back to defaults). Defaults: Tags / Related / Due OFF; **Model ON** (per user direction during visual confirmation — `[opus]`/`[sonnet]` tags are on most PLAN lines and carry useful at-a-glance signal); Goal / Acceptance / Subtasks ON. Re-introduced the FE-031-deleted model and related chip surfaces as fresh slim display-only components: `ModelChip.tsx` (`font-mono text-[10px]` Opus / Sonnet label with subtle border) and `RelatedChip.tsx` (up to 3 IDs + `+N` overflow indicator — no click handler, simpler than pre-FE-031). Tags + Due render inline in `TaskRowInner.tsx`. Modal mechanics use the native `<dialog>` API for free focus-trap / focus-restore / Esc-close (FE-019 a11y baseline preserved); backdrop click closes via an event-target check (`e.target === dialog`). Files: **5 new** — `viz/src/visibilityPrefs.{ts,test.ts}` + `viz/src/ui/SettingsModal.tsx` + `ModelChip.tsx` + `RelatedChip.tsx`; **7 modified** — `App.tsx` (state + gear + modal mount), `PrioritySection.tsx` / `TaskRow.tsx` / `EpicRow.tsx` (forward `visibility` prop), `TaskRowInner.tsx` (3-column grid; conditional chip render — middle col collapses to zero width when all OFF, preserving the post-FE-031 lean default), `TaskDetail.tsx` (conditional section render), `App.test.tsx` (+5 settings-modal cases); **1 test-setup polyfill** — minimal `HTMLDialogElement.{showModal,close}` shim in `src/test/setup.ts` for jsdom 25. Tests: 95/95 pass (84 prior + 11 new); typecheck clean; user visually confirmed.

**Archived:** 2026-05-15
