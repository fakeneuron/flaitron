---
title: density modes
status: completed
tags: [viz, ui, density]
created: 2026-05-15
due:
related-tasks: [CORE-EPIC-098, CORE-098.1, CORE-098.2, CORE-098.3, CORE-098.12]
---

# CORE-098.4 | density modes

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-098]] · [[CORE-098.3]]

## 🎯 Goal

Add Comfortable / Default / Compact density toggles to the settings modal; each mode adjusts row padding + chip sizing + section gap; persists alongside visibility prefs.

## ✅ Acceptance

- [x] `viz/src/visibilityPrefs.ts` exports a `DensityMode = 'comfortable' | 'default' | 'compact'` type; `VisibilityPrefs` gains a required `density: DensityMode` field; `DEFAULT_PREFS.density = 'default'`
- [x] `parsePrefs` accepts the new `density` field with per-key fallback (missing or invalid string → `'default'`); schema `version` stays at `1` so existing v1-stored prefs round-trip cleanly without resetting visibility selections
- [x] `viz/src/ui/constants.ts` exports a `DENSITY_TOKENS: Record<DensityMode, DensityTokens>` registry covering `rowPad` / `subtaskRowPad` / `sectionInteriorPad` / `interRowGap` / `subtaskInterRowGap` / `betweenSectionsGap` / `chipPad`; co-located with the post-CORE-098.2 token registry
- [x] `SettingsModal.tsx` renders a third `<fieldset>` "Density" between "Row chips" and "Detail panel"; three radio buttons (Comfortable / Default / Compact, `name="density-mode"`); selection writes `{...prefs, density: <value>}` through `onChange`; Reset-to-defaults restores `'default'`
- [x] `App.tsx` main sections-container reads `DENSITY_TOKENS[visibilityPrefs.density].betweenSectionsGap` instead of hardcoded `gap-3`
- [x] `PrioritySection.tsx` inner content container reads `DENSITY_TOKENS[density].{sectionInteriorPad, interRowGap}` instead of hardcoded `p-2 gap-1.5`; receives `density` via the existing `visibility: VisibilityPrefs` prop
- [x] `TaskRow.tsx` outer row padding switches from `px-2.5 py-1.5 pl-9` to `${DENSITY_TOKENS[density].rowPad} pl-9` (left-indent fixed at `pl-9` for chevron-less alignment); passes `density` through to `TaskRowInner`
- [x] `EpicRow.tsx` outer row padding switches from `px-2.5 py-1.5` to `DENSITY_TOKENS[density].rowPad`; expanded-subtasks container uses `DENSITY_TOKENS[density].subtaskInterRowGap` for the inter-subtask gap; done/total badge uses `DENSITY_TOKENS[density].chipPad`; passes `density` to `TaskRowInner` and each `SubtaskRow`
- [x] `SubtaskRow.tsx` accepts a new `density: DensityMode` prop (required, no default — sourced from EpicRow); row padding switches from `px-2 py-1` to `DENSITY_TOKENS[density].subtaskRowPad`
- [x] `TaskRowInner.tsx` accepts a new `density: DensityMode` prop; inline Tags span padding switches from `px-1.5 py-0.5` to `DENSITY_TOKENS[density].chipPad`; forwards `density` to `<ModelChip>` / `<RelatedChip>` / `<StatusChip>`
- [x] `StatusChip.tsx` / `ModelChip.tsx` / `RelatedChip.tsx` accept an optional `density?: DensityMode` prop (default `'default'`); chip padding switches from hardcoded `px-1.5 py-0.5` to `DENSITY_TOKENS[density ?? 'default'].chipPad`
- [x] **Out of scope (preserved):** TaskDetail outer padding (`px-3 py-2`) and chips inside it (PRIORITY_BADGE, the in-detail StatusChip), header chrome (search input, `ⓘ`, ThemeToggle, gear, status filter pills) — density is a row-surface concern, not a header/detail-panel concern; matches Linear precedent
- [x] Chip text size **unchanged** — stays on `TYPOGRAPHY.caption` (`text-[10px]`); density scales chip *padding* only, preserving the CORE-098.2 typography registry
- [x] `viz/src/visibilityPrefs.test.ts` extended: 3 new cases — missing-density-field falls back to `'default'`; invalid density string (`"super-dense"`) falls back to `'default'`; per-project density isolation (Compact vs Comfortable). Existing round-trip test extended to include `density: 'compact'`.
- [x] `viz/src/ui/App.test.tsx` extended: 5 new cases under `describe('App — density modes')` — Density fieldset renders 3 radios; Compact tightens row padding (`px-2 py-1`); Comfortable loosens (`px-3 py-2`); Reset restores Default; per-project density loads on project switch
- [x] `npm --prefix viz test` passes — **103/103** pass (95 prior + 8 new: 3 visibilityPrefs + 5 App density)
- [x] `npm --prefix viz run typecheck` clean (zero errors)
- [x] User visually confirmed (👁️) at `http://localhost:5176`: gear-modal renders new Density fieldset with three radios in horizontal row; selecting Compact / Default / Comfortable visibly tightens / restores / loosens row + chip + section padding end-to-end; subtask rows under expanded epic scale too; Reset restores Default; user feedback: "looks great" + flagged site fonts read small generally → filed as follow-up `CORE-098.12` (typography scale bump) in PLAN.md, slotted after `.11` audit so audit catches both density + typography interactions

## 🧩 Subtasks

- [x] Pattern survey — confirmed `constants.ts` is the canonical token-registry surface (post-CORE-098.2 `TYPOGRAPHY` / `STATUS_BADGE` / `SECTION_TINT` / `PHASE_DOT` pattern); `DENSITY_TOKENS` co-located with the same shape. Confirmed `VisibilityPrefs` prop-drill chain (post-CORE-098.3) carries density — no new context introduced.
- [x] Extend `viz/src/visibilityPrefs.ts` — added `DensityMode` type + `density` field on `VisibilityPrefs` + `DEFAULT_PREFS.density = 'default'`; extended `parsePrefs` with `isDensity` guard + per-key fallback; kept schema `version: 1` (additive extension preserves existing v1 user prefs)
- [x] Add density cases to `viz/src/visibilityPrefs.test.ts` — 3 new tests; existing round-trip test updated to include `density: 'compact'`; all 9 visibilityPrefs tests pass
- [x] Extend `viz/src/ui/constants.ts` — added `DensityTokens` interface + `DENSITY_TOKENS` record with leading doc-block tying back to CORE-098.4 + the typography-registry separation contract
- [x] Modify `viz/src/ui/SettingsModal.tsx` — inserted "Density" fieldset between "Row chips" and "Detail panel"; three radios `name="density-mode"` wrapped in `<label>` for accessible name
- [x] Modify `viz/src/ui/App.tsx` — main sections-container now reads `DENSITY_TOKENS[visibilityPrefs.density].betweenSectionsGap` (replaced hardcoded `gap-3`)
- [x] Modify `viz/src/ui/PrioritySection.tsx` — inner content container now reads `${tokens.interRowGap}` + `${tokens.sectionInteriorPad}` (replaced hardcoded `gap-1.5 p-2`)
- [x] Modify `viz/src/ui/TaskRow.tsx` — row container now reads `${DENSITY_TOKENS[density].rowPad} pl-9` (replaced `px-2.5 py-1.5 pl-9`); forwards `density` to `<TaskRowInner>`
- [x] Modify `viz/src/ui/EpicRow.tsx` — row container reads `tokens.rowPad`; subtask-container gap reads `tokens.subtaskInterRowGap`; done/total badge reads `tokens.chipPad`; forwards `density` to `<TaskRowInner>` and to each `<SubtaskRow>`
- [x] Modify `viz/src/ui/SubtaskRow.tsx` — added required `density: DensityMode` prop; row padding reads `DENSITY_TOKENS[density].subtaskRowPad`
- [x] Modify `viz/src/ui/TaskRowInner.tsx` — added required `density: DensityMode` prop; inline Tags span reads `chipPad`; forwards `density` to `<ModelChip>` / `<RelatedChip>` / `<StatusChip>`
- [x] Modify `viz/src/ui/StatusChip.tsx` / `ModelChip.tsx` / `RelatedChip.tsx` — each accepts optional `density?: DensityMode` (default `'default'`); chip-padding reads `DENSITY_TOKENS[density].chipPad`. Optional + default ensures TaskDetail's in-detail StatusChip (no density prop passed) stays on default padding — preserves the "detail-panel doesn't scale" scope contract
- [x] Extend `viz/src/ui/App.test.tsx` — 5 new cases in `describe('App — density modes')`; introduced `rowPadClasses()` helper that queries the row's first-child div for className substring assertion
- [x] Run `npm --prefix viz run typecheck` — clean (zero errors)
- [x] Run `npm --prefix viz test` — 103/103 pass (5.77s)
- [x] Started dev server (`npm --prefix viz run dev`) and got user visual confirmation (👁️): "looks great"; user also flagged a site-wide font-size feel — filed as follow-up `CORE-098.12` in PLAN.md before closing

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz-embellishment)
- [[CORE-098.1]] — epic discovery (filed this subtask)
- [[CORE-098.3]] — settings-modal scaffold (modal infra + per-project prefs this extends)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Builds directly on CORE-098.3 (settings-modal scaffold, just-shipped 2026-05-15) — `VisibilityPrefs` + `<SettingsModal>` + `localStorage` per-project persistence are in place; density is a clean third pref class slotting into the existing schema and modal. CORE-098.2 (typography & color audit, 2026-05-15) just stabilized `constants.ts` as the canonical token-registry surface — `DENSITY_TOKENS` extends the same pattern. CORE-098.1 (Discovery, 2026-05-15) sketched the three-radio "Density" group as part of the modal's planned shape and ranked this as gap #2 on the embellishment matrix. No competing in-flight work touches the scope; all 95 prior tests are green; the scope is well-bounded to `viz/src/{visibilityPrefs.ts,ui/}`.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions — 3 resolved via AskUserQuestion (see Discovery Notes §"Clarifying-question outcomes")
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

`viz/src/visibilityPrefs.ts` (schema + parser to extend), `viz/src/ui/constants.ts` (post-CORE-098.2 token registry — `DENSITY_TOKENS` extends this pattern), `viz/src/ui/SettingsModal.tsx` (radio-group surfaces between the two existing `<fieldset>` groups), `viz/src/ui/App.tsx` (between-sections `gap-3` reads density), `viz/src/ui/PrioritySection.tsx` (section interior `p-2 gap-1.5` reads density), `viz/src/ui/TaskRow.tsx` (outer row `px-2.5 py-1.5 pl-9` — `pl-9` stays fixed for chevron-less alignment), `viz/src/ui/EpicRow.tsx` (row outer + subtask container + done/total badge), `viz/src/ui/SubtaskRow.tsx` (row `px-2 py-1` — gets new `density` prop), `viz/src/ui/TaskRowInner.tsx` (Tags span chip-pad + forwards density to chip subcomponents), `viz/src/ui/StatusChip.tsx` / `ModelChip.tsx` / `RelatedChip.tsx` (chip `px-1.5 py-0.5` switches to `DENSITY_TOKENS[density].chipPad`), `viz/src/ui/TaskDetail.tsx` (out of scope — detail panel stays fixed; in-detail StatusChip uses default density via the optional-prop fallback).

### Archive skim — load-bearing precedents

- **CORE-098.3 (settings-modal scaffold, 2026-05-15)** — primary precedent. Established `VisibilityPrefs` schema, `<SettingsModal>` shape, prop-drill chain (App → PrioritySection → TaskRow/EpicRow → TaskRowInner / TaskDetail), schema-versioning posture (`version: 1` field; unknown-version → defaults). Density rides the same prop chain; adds a third pref class.
- **CORE-098.2 (typography & color audit, 2026-05-15)** — established `constants.ts` as the canonical token-registry surface (`TYPOGRAPHY`, `STATUS_BADGE`, `SECTION_TINT`, `PHASE_DOT`, etc.). `DENSITY_TOKENS` co-locates with these. The `TYPOGRAPHY.caption` (`text-[10px]`) token is the *only* place chip text size lives — density scales chip *padding* only, preserving the typography registry (per user Q2).
- **CORE-098.1 (epic discovery, 2026-05-15)** — sketched the three-radio Density group in the modal mock and ranked Density modes as gap #2 (M-leverage / H-impact). Spacing inventory captured: `section p-2, header px-3 py-2, row px-2.5 py-1.5, inter-row gap-1.5. Dense by default.` The "Default = today's spacing" mapping (per user Q1) preserves this baseline.
- **FE-008 (row-density redesign)** — established the two-cluster grid + Tier 1/Tier 2 chip hierarchy. Density modes scale visual rhythm (padding, gap); they do not change the chip tier vocabulary — Tier 1 (PhaseDots / SubtaskProgress) stays bolder than Tier 2 chips across all three modes.
- **FE-031 (chip-system trim, 2026-05-14)** — user's "low default density" preference. Maps to "Default = today's spacing" (per Q1) — the lean post-FE-031 baseline IS Default, with Comfortable as the opt-in roomier path and Compact as the further-tighter opt-in.
- **FE-019 (a11y + perf baseline)** — Lighthouse 84/94/96/82. Radio group inside the existing `<dialog>` preserves the baseline: each `<input type="radio">` wraps in a `<label>` for accessible name; native radio-group keyboard navigation (arrow keys) is free; the existing focus-trap from `dialog.showModal()` covers the new fieldset too. No net-new a11y infra.
- **FE-024 (viz-app-decomposition)** — established the App → PrioritySection → TaskRow/EpicRow → TaskRowInner prop-drill chain. CORE-098.3 followed it. CORE-098.4 follows it too — `density` rides on the existing `visibility: VisibilityPrefs` prop; chips get a new optional `density?` prop; SubtaskRow gets a new required `density` prop (its first VisibilityPrefs-derived prop, scoped narrowly to density).

### Drift check

PLAN.md line cites three concrete surfaces:
- "row padding" — confirmed: TaskRow:38 (`px-2.5 py-1.5 pl-9`), EpicRow:50 (`px-2.5 py-1.5`), SubtaskRow:20 (`px-2 py-1`).
- "chip sizing" — interpreted as chip *padding* per Q2 (`px-1.5 py-0.5` across StatusChip:6, ModelChip:10, RelatedChip:10, Tags inline in TaskRowInner:66, EpicRow done/total badge:68 `px-2 py-0.5`).
- "section gap" — interpreted as **both** inter-row gap (PrioritySection:55 `gap-1.5`), section interior padding (PrioritySection:55 `p-2`), and between-sections gap (App.tsx:384 `gap-3`); plus the expanded-subtasks gap inside EpicRow (EpicRow:76 `gap-1`) per Q3 "All rows + all gaps."

No drift. The CORE-098.3 schema-versioning posture (`version: 1`; unknown-version → defaults) is the relevant constraint to honor — adding `density` as a new field within v1 keeps existing user prefs intact (per-field fallback for missing density → `'default'`, no version bump needed; bumping to v2 would wipe row-chip + detail-section selections for users with existing v1-stored prefs).

### Clarifying-question outcomes (resolved 2026-05-15)

1. **Density mode mapping** — *Today's spacing = Default (Q1).* `Default` keeps the current post-FE-031 baseline (row `px-2.5 py-1.5`, inter-row `gap-1.5`, section interior `p-2`, between-sections `gap-3`). `Comfortable` adds one step of looseness; `Compact` tightens by one step. No existing user sees a visual shift unless they opt in — matches the lean-by-default ethos and avoids regressing FE-031.
2. **"Chip sizing" interpretation** — *Chip padding only (Q2).* Density scales chip box-padding (`px-1.5 py-0.5` → tighter/looser). Chip text size stays on `TYPOGRAPHY.caption` (`text-[10px]`). Preserves the just-stabilized CORE-098.2 typography registry; cleaner separation of concerns (typography registry = text-size canonical home; density = spacing canonical home).
3. **Density scope** — *All rows + all gaps (Q3).* Density applies to TaskRow + EpicRow + SubtaskRow padding, section interior padding (`p-2`), inter-row gap (`gap-1.5`), between-sections gap (`gap-3`), and the expanded-subtasks gap inside EpicRow (`gap-1`). TaskDetail outer padding + header chrome stay fixed (density is a row/list-surface concern; TaskDetail is the detail-panel surface). Largest blast radius of the three options — cohesive visual breathing/tightening across the whole list when density flips.

### Final `DENSITY_TOKENS` shape

```ts
export type DensityMode = 'comfortable' | 'default' | 'compact';

export interface DensityTokens {
  rowPad: string;              // TaskRow + EpicRow outer (TaskRow keeps pl-9)
  subtaskRowPad: string;        // SubtaskRow
  sectionInteriorPad: string;   // PrioritySection inner content container
  interRowGap: string;          // PrioritySection flex flex-col gap
  subtaskInterRowGap: string;   // EpicRow expanded-subtasks flex flex-col gap
  betweenSectionsGap: string;   // App.tsx main sections-container gap
  chipPad: string;              // StatusChip / ModelChip / RelatedChip / Tags inline / done-total badge
}

export const DENSITY_TOKENS: Record<DensityMode, DensityTokens> = {
  comfortable: {
    rowPad: 'px-3 py-2',
    subtaskRowPad: 'px-2.5 py-1.5',
    sectionInteriorPad: 'p-3',
    interRowGap: 'gap-2',
    subtaskInterRowGap: 'gap-1.5',
    betweenSectionsGap: 'gap-4',
    chipPad: 'px-2 py-1',
  },
  default: {
    rowPad: 'px-2.5 py-1.5',
    subtaskRowPad: 'px-2 py-1',
    sectionInteriorPad: 'p-2',
    interRowGap: 'gap-1.5',
    subtaskInterRowGap: 'gap-1',
    betweenSectionsGap: 'gap-3',
    chipPad: 'px-1.5 py-0.5',
  },
  compact: {
    rowPad: 'px-2 py-1',
    subtaskRowPad: 'px-1.5 py-0.5',
    sectionInteriorPad: 'p-1.5',
    interRowGap: 'gap-1',
    subtaskInterRowGap: 'gap-0.5',
    betweenSectionsGap: 'gap-2',
    chipPad: 'px-1 py-0',
  },
};
```

Step grading: each token moves ±1 Tailwind step from default. Compact's `py-0` on chips is the minimum (still rendering a 1-line label with `text-[10px]`); Comfortable's `py-2` on rows + `py-1` on chips creates clear visual breathing without ballooning the page height.

### Schema-extension strategy (preserves existing v1 prefs)

```ts
// in parsePrefs, after the version === 1 + rc + ds checks:
const densityIn = d.density;
const density: DensityMode =
  densityIn === 'comfortable' || densityIn === 'default' || densityIn === 'compact'
    ? densityIn
    : DEFAULT_PREFS.density;
return { version: 1, rowChips: {...}, detailSections: {...}, density };
```

Existing v1-stored prefs (from users who installed viz between 2026-05-15 settings-modal landing and this density add) lack the `density` key. Per-field fallback returns `'default'` — these users see no visual change until they open the modal. Schema `version` stays at `1` because the extension is *additive* and backward-compatible. A future *breaking* schema change is what `version` bumps are for.

### Modal-fieldset placement sketch

```
┌─ Settings ──────────────────────────────────────────┐
│  Row chips                                           │
│   ☐ Tags     ☐ Model     ☐ Related     ☐ Due date   │
│                                                      │
│  Density                                             │
│   ○ Comfortable   ● Default   ○ Compact              │
│                                                      │
│  Detail panel                                        │
│   ☑ Goal     ☑ Acceptance     ☑ Subtasks            │
│                                                      │
│  [Reset to defaults]                  [Done]         │
└──────────────────────────────────────────────────────┘
```

Placement between "Row chips" and "Detail panel" matches the CORE-098.1 sketch and groups list-surface controls (row-chips + density both affect the row list) above the detail-panel controls. Radio implementation: three `<input type="radio" name="density-mode" value="<mode>">` siblings in a horizontal flex; each wrapped in a `<label>` for accessible name; `checked={prefs.density === <mode>}` + `onChange={() => onChange({ ...prefs, density: <mode> })}`.

### Out-of-scope decisions (documented for future audit `.11`)

- **TaskDetail panel padding stays fixed.** Density is a row/list-surface concern; the expanded detail panel is a separate surface. Linear works the same way (density doesn't affect the issue-detail panel).
- **Header chrome stays fixed.** Search input, ⓘ button, ThemeToggle, gear, status filter pills — all header chrome, not part of the scrollable row list. Density doesn't reach them.
- **Chip text size unchanged.** Stays on `TYPOGRAPHY.caption` (`text-[10px]`). Density scales chip *padding* only (Q2).
- **Schema version stays at 1.** Additive extension; existing user prefs survive intact. A future breaking schema change is what `version` bumps are for.

### Expected closure-diff signal profile (informs Step 6 📦 evaluation)

- Frontend files: **yes** (10 `.tsx` / `.ts` modified in `viz/src/` + `viz/src/ui/`, 2 test files extended) → 📦 **fires**
- Privileged-ops paths: no
- Perf-narrative: no (token-table lookup is a property access; no hot-path / cache work; bundle delta ≪ 1 KB)

The 📦 gate fires on this closure; the user gives one bundled approval after seeing the closure review + recap + visual confirmation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `constants.ts` is the canonical token-registry surface post-CORE-098.2 (`TYPOGRAPHY` / `STATUS_BADGE` / `SECTION_TINT` / `PHASE_DOT`); `DENSITY_TOKENS` co-located with the same shape. The `VisibilityPrefs` prop-drill chain (App → PrioritySection → TaskRow/EpicRow → TaskRowInner / TaskDetail) introduced in CORE-098.3 carries `density` along the same path — no React context, no new shape.
- [x] Implemented the minimal solution — 10 files modified, 0 net-new files. See Implementation Notes.
- [x] Updated/added tests for non-trivial behavior — 8 new test cases (3 visibilityPrefs + 5 App density). All 95 prior tests untouched.

**Implementation Notes:**

### Files changed (10 source + 2 tests)

**Modified (10 source):**
- `viz/src/visibilityPrefs.ts` — added `DensityMode` type; `VisibilityPrefs.density: DensityMode` (required); `DEFAULT_PREFS.density = 'default'`; `isDensity` guard; per-key fallback in `parsePrefs` (missing or non-mode string → `'default'`); schema `version: 1` unchanged
- `viz/src/ui/constants.ts` — imported `DensityMode`; added `DensityTokens` interface + `DENSITY_TOKENS` record with leading doc-block; co-located with the post-CORE-098.2 token registry
- `viz/src/ui/SettingsModal.tsx` — imported `DensityMode`; added `DENSITY_LABEL` / `DENSITY_KEYS` + `setDensity` helper; new `<fieldset legend="Density">` slot between Row chips and Detail panel; three radios (`name="density-mode"`, each in a `<label>` for accessible name)
- `viz/src/ui/App.tsx` — imported `DENSITY_TOKENS`; main sections-container reads `DENSITY_TOKENS[visibilityPrefs.density].betweenSectionsGap`
- `viz/src/ui/PrioritySection.tsx` — imported `DENSITY_TOKENS`; inner content container reads `${tokens.interRowGap}` + `${tokens.sectionInteriorPad}`
- `viz/src/ui/TaskRow.tsx` — imported `DENSITY_TOKENS`; row container reads `${DENSITY_TOKENS[visibility.density].rowPad} pl-9` (left-indent fixed; chevron-less alignment); forwards `density={visibility.density}` to `<TaskRowInner>`
- `viz/src/ui/EpicRow.tsx` — imported `DENSITY_TOKENS`; row container reads `tokens.rowPad`; subtask-container gap reads `tokens.subtaskInterRowGap`; done/total badge reads `tokens.chipPad`; forwards `density` to `<TaskRowInner>` and to each `<SubtaskRow>`
- `viz/src/ui/SubtaskRow.tsx` — imported `DENSITY_TOKENS` + `DensityMode`; new required `density: DensityMode` prop; row padding reads `DENSITY_TOKENS[density].subtaskRowPad`
- `viz/src/ui/TaskRowInner.tsx` — imported `DENSITY_TOKENS` + `DensityMode`; new required `density` prop; inline Tags span reads `chipPad`; forwards `density` to chip subcomponents
- `viz/src/ui/StatusChip.tsx` / `ModelChip.tsx` / `RelatedChip.tsx` — each imports `DENSITY_TOKENS` + `DensityMode`; accepts optional `density?: DensityMode` (default `'default'`); chip padding reads `DENSITY_TOKENS[density].chipPad`

**Modified (2 tests):**
- `viz/src/visibilityPrefs.test.ts` — updated existing round-trip test to carry `density: 'compact'`; added 3 new cases (missing-density-field → `'default'`, invalid-string → `'default'`, per-project density isolation)
- `viz/src/ui/App.test.tsx` — added `describe('App — density modes')` with 5 cases; introduced `rowPadClasses()` helper that queries the row's first-child div className for substring assertion

### Decisions made during execution

- **Schema version stayed at 1 (additive extension).** Adding `density` is backward-compatible with existing v1 reads via per-key fallback. Bumping to v2 would have wiped row-chip + detail-section selections for users with existing v1-stored prefs (since the parser falls back to DEFAULT_PREFS on unknown version) — that loss isn't justified by a non-breaking addition. The `version` field's role is *breaking* schema changes; this isn't one.
- **Chip text size stayed on the typography registry.** Per user Q2, density scales chip *padding* only. The `text-[10px]` in each chip's className comes from `TYPOGRAPHY.caption` (codified in CORE-098.2); density doesn't touch typography. Clean separation — typography registry owns text size, density tokens own spacing.
- **TaskRow's `pl-9` left-indent stayed fixed across modes.** The `pl-9` aligns chevron-less rows with the chevron column inside epic rows. Scaling `pl-*` per mode would chase a 4px alignment improvement at the cost of bookkeeping — the pre-existing 36-vs-38px misalignment in Default carries forward into all modes (range ±2px). Not perceptibly worse; not worth a separate token.
- **Optional `density?` on chip components (not required).** The optional + `default` fallback ensures TaskDetail's in-detail StatusChip (where no `density` prop is forwarded) keeps Default chip padding — matches the "detail-panel doesn't scale" scope contract without TaskDetail needing to consume `VisibilityPrefs.density`.
- **Required `density` on TaskRowInner / SubtaskRow (not optional).** Both are row-surface components reached only via TaskRow / EpicRow, both of which already consume `visibility: VisibilityPrefs` and trivially forward `density`. Making the prop required catches drift if a future caller forgets to pass it.
- **Done/total badge folded into the chip family.** EpicRow's `done/total` badge previously used `px-2 py-0.5` (slightly larger than the post-FE-031 chip-padding default). Folded it to the `chipPad` token for token-registry consistency. Minor visual tightening of the badge at Default (`px-1.5 py-0.5`); chip family now scales uniformly.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **103/103 pass** (7 test files, 5.77s). 95 prior + 8 new (3 visibilityPrefs density + 5 App density).
- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) clean (zero errors). No linter is configured in viz (per CORE-098.1 / FE-031 — typecheck is the static-analysis layer).
- [x] (frontend) Asked the user for visual confirmation (👁️) — user confirmed "looks great" and flagged a separate site-wide font-feel concern (filed as `CORE-098.12` follow-up, not folded in).

**Testing Notes:**

- `tsc --noEmit`: clean.
- `vitest run`: 103/103 pass. Density tests cover the canonical lifecycle: modal renders three radios with Default checked; clicking Compact narrows the row container to `px-2 py-1`; clicking Comfortable expands to `px-3 py-2`; Reset restores Default from a Compact-stored state; per-project density isolation (project A Compact, project B Comfortable) confirms the prefs reload on project switch.
- `rowPadClasses()` helper queries `document.getElementById('row-CORE-100')` then its `:scope > div` (the inner row container holding the density-driven padding). Substring assertions on `.className` use the Tailwind classnames directly (`px-2 py-1`, `px-2.5 py-1.5`, `px-3 py-2`) — robust to className-order shuffles since they're substring tests.
- The existing 'coerces missing booleans' test still passes because `density` falls back per-field too (the test asserts specific row-chip / detail-section fields, doesn't check density).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview; viz-internal density modes don't shift the flowtron-as-a-product surface.
  - `SPEC.md` — **no change.** Workflow contract is unchanged; this task consumed the existing 4-phase + epic-subtask contracts as-is.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md `.4` line flipped to stub `Completed 2026-05-15.` (stays under the epic; sibling-completed subtasks `.1` / `.2` / `.3` did the same); tasknote moved to `_project/tasknote/archive/core/CORE-098.4.md`
- [x] Recap drafted (bundles into the 📦 ready-to-commit gate — fires on the frontend-files signal)

**Final Summary:**

Added three opt-in density modes (Comfortable / Default / Compact) to viz's settings modal, scaling row-surface padding and gaps end-to-end while preserving the post-FE-031 lean baseline as the default. Schema extension: `VisibilityPrefs` gains a required `density: DensityMode` field with per-key fallback in `parsePrefs` — schema `version: 1` stays unchanged so existing user prefs survive the rollout (missing-density reads cleanly to `'default'`). Token registry: extended `viz/src/ui/constants.ts` with a `DENSITY_TOKENS: Record<DensityMode, DensityTokens>` table covering `rowPad` / `subtaskRowPad` / `sectionInteriorPad` / `interRowGap` / `subtaskInterRowGap` / `betweenSectionsGap` / `chipPad` — co-located with the post-CORE-098.2 token registry and stepped ±1 Tailwind notch per mode. Modal: new "Density" `<fieldset>` between Row chips and Detail panel with three radios in a horizontal flex (`name="density-mode"`, each wrapped in `<label>` for accessible names; native radio-group keyboard nav is free). Scope: density scales the row/list surface only — TaskDetail outer padding and header chrome (search, ⓘ, ThemeToggle, gear, status filter pills) stay fixed by design (matches Linear precedent). Chip text size stays on `TYPOGRAPHY.caption` (CORE-098.2's just-stabilized registry); density scales chip *padding* only. Files: 10 source modified (`viz/src/visibilityPrefs.ts` + `viz/src/ui/{constants.ts, SettingsModal.tsx, App.tsx, PrioritySection.tsx, TaskRow.tsx, EpicRow.tsx, SubtaskRow.tsx, TaskRowInner.tsx, StatusChip.tsx, ModelChip.tsx, RelatedChip.tsx}` — `constants.ts` counted once), 2 tests extended (8 new cases: 3 `visibilityPrefs.test.ts` + 5 `App.test.tsx` `describe('App — density modes')`). Tests: 103/103 pass (95 prior + 8 new); typecheck clean; user visually confirmed end-to-end. User feedback during confirmation flagged a site-wide font-size feel — filed as follow-up `CORE-098.12` (typography scale bump) in PLAN.md before closing, slotted after `.11` audit so the audit catches both density + typography interactions.

**Archived:** 2026-05-15
