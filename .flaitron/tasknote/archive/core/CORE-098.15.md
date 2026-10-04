---
title: TaskDetail visual polish
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.14, CORE-098.3, CORE-098.4, CORE-098.12, FE-026]
---

# CORE-098.15 | TaskDetail visual polish

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]] · [[CORE-098.14]]

## 🎯 Goal

Polish the `TaskDetail` panel rendering: (a) un-cramp the subtask-expand path filed by `.14` (panel sits inside `EpicRow`'s subtask-list grid wrapper with no breathing room from adjacent rows); (b) rework `🌱 Starter` context rendering into a per-subsection, user-friendly layout with its own settings-modal visibility toggles; (c) lift the shared `DetailSection` chrome (Goal/Acceptance/Subtasks + each starter subsection) one step in heading + body typography with a light card treatment.

## ✅ Acceptance

- [ ] **Subtask panel restyle** — `TaskDetail` rendered from `SubtaskRow` (lazy-mount at `SubtaskRow.tsx:71-80`) reads as a card with breathing room: breaks out of `EpicRow.tsx:90`'s `px-2 py-1.5` subtask-list wrapper edge-to-edge, distinct rounded border + bg, vertical separation (margin) from adjacent `SubtaskRow`s. Preserves the under-the-clicked-row anchoring (Q1 = restyle in place).
- [ ] **Starter rendering shape** — when `status === 'starter'`, `TaskDetail.tsx:47-52`'s single `DetailSection title="🌱 Starter context"` block is replaced by per-subsection `DetailSection` blocks (one per `###` sub-heading). Renders only: *Why this exists*, *Solution shape*, *Files to touch*, *Out of scope*. Preamble line + *Decisions locked* table + *Open at promotion* questions + *Related* sub-section are never rendered in the panel.
- [ ] **Starter sub-section parser** — new `extractStarterSubsections(body): Record<StarterSubsectionKey, string>` helper in `viz/src/tasknote.ts` (mirrors existing `extractSection`'s substring-match shape; walks the starter body by `^### ` headings). Tested in `viz/src/tasknote.test.ts` against the starter-template fixture sub-headings.
- [ ] **`Tasknote` interface extended** — `starterSubsections: Record<StarterSubsectionKey, string>` field populated by `tasknote-parse.ts` from `starterContext`. Empty strings for missing sub-headings (don't break starters that have only some sub-headings).
- [ ] **`VisibilityPrefs` schema additive field** — `starterSections: { whyExists, solutionShape, filesToTouch, outOfScope }` (all `true` by default) added to `visibilityPrefs.ts`. `parsePrefs` uses the existing `isBool(...) ? ... : DEFAULT_PREFS.starterSections.x` additive fallback — **no version bump**, old v1 prefs migrate transparently (preserves user's existing density/rowChips/detailSections choices). Round-trip tested in `visibilityPrefs.test.ts`.
- [ ] **SettingsModal — Starter context fieldset** — new `<fieldset>` legend "Starter context" with four checkboxes (`Why this exists`, `Solution shape`, `Files to touch`, `Out of scope`) mirroring the existing "Detail panel" fieldset shape (`SettingsModal.tsx:118-134`).
- [ ] **DetailSection visual lift** — `viz/src/ui/DetailSection.tsx` heading promoted from `text-xs font-semibold uppercase tracking-wide text-slate-500` to a `text-sm font-semibold text-slate-700/200` (subhead-adjacent, normal-case) heading; body wrapper from `prose prose-xs` → `prose prose-sm`; light card chrome around the body (rounded + soft bg + interior padding). Applied uniformly across all `DetailSection` consumers (Goal / Acceptance / Subtasks + each starter sub-section).
- [ ] **Bundle hygiene (FE-026 preserved)** — entry chunk stays ≤80 KB gz; `TaskDetail-*.js` lazy chunk still present; `gray-matter` absent from `viz/dist/assets/*.js`; `react-markdown` still scoped to the lazy chunk. Baseline: entry **55.46 KB gz** (post-`.14`), lazy `TaskDetail-*.js` **48.21 KB gz**.
- [ ] **Tests** — `npm --prefix viz test` passes; new tests added for `extractStarterSubsections` (template-fixture coverage) and the `visibilityPrefs.starterSections` additive-migration path. Existing 106 tests still green.
- [ ] **Type-check** — `npx tsc --noEmit` clean in `viz/`.
- [ ] **Visual confirmation** (👁️) at `npm --prefix viz run dev` (port 5120): walk Default / Compact / Comfortable density × light / dark theme. Verify (i) subtask panel reads as a card with breathing room, (ii) DetailSection heading + body typography is bigger/cleaner, (iii) starter row click shows only the four configured subsections with user-friendly headings (no preamble/decisions/open/related leakage), (iv) SettingsModal "Starter context" fieldset toggles each subsection independently and persists across reload.

## 🧩 Subtasks

1. **Starter sub-section parser** — add `extractStarterSubsections(body): Record<StarterSubsectionKey, string>` to `viz/src/tasknote.ts` (mirrors `extractSection`'s shape but matches `^###` instead of `^##`, with substring matching against a fixed key-map: `whyExists` → "Why this exists", `solutionShape` → "Solution shape", `filesToTouch` → "Files to touch", `outOfScope` → "Explicitly out of scope"). Add coverage in `viz/src/tasknote.test.ts` using a fixture body taken from `templates/tasknote-starter-template.md`. Verify missing sub-headings → empty strings, not undefined.
2. **Tasknote parser plumbing** — extend `viz/src/tasknote-parse.ts` so the parsed `Tasknote` exposes `starterSubsections` (call `extractStarterSubsections` on the `starterContext` extracted at line 22 of the current parser). Type extended in `viz/src/tasknote.ts:17-28` interface.
3. **VisibilityPrefs additive field** — `viz/src/visibilityPrefs.ts`: add `starterSections: { whyExists, solutionShape, filesToTouch, outOfScope }` (all `true`) to `VisibilityPrefs` interface + `DEFAULT_PREFS`. Extend `parsePrefs` with the same `isBool(...) ? ... : DEFAULT_PREFS.starterSections.x` fallback used for `detailSections`. Add test in `viz/src/visibilityPrefs.test.ts`: old v1 raw JSON missing `starterSections` parses to defaults for the new field while preserving other fields; round-trip preserves explicit values.
4. **SettingsModal — Starter context fieldset** — `viz/src/ui/SettingsModal.tsx`: add `STARTER_SECTION_LABEL` map + `STARTER_SECTION_KEYS` array + `setStarterSection` handler (mirrors `DETAIL_SECTION_*` shape lines 21-25, 34, 65-67). Add a new `<fieldset>` after the existing "Detail panel" one (line 118) with legend "Starter context" and four checkboxes.
5. **DetailSection visual lift** — `viz/src/ui/DetailSection.tsx`: bump heading from `text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400` → `text-sm font-semibold text-slate-700 dark:text-slate-200` (normal-case). Body wrapper from `prose prose-xs max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0 [&_input]:mr-1` → `prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0 [&_input]:mr-1`. Wrap the body block in a card div: `rounded bg-white px-2.5 py-1.5 dark:bg-slate-900/60` (or similar — confirm in the visual pass). Container spacing: bump `mb-2 last:mb-0` to `mb-3 last:mb-0` to give the lifted sections more separation.
6. **TaskDetail subtask-context restyle** — `viz/src/ui/TaskDetail.tsx:22`: change the panel root from `border-t border-slate-100 bg-slate-50/40 px-3 py-2 …` to a structure that breaks out of the EpicRow subtask-list `px-2 py-1.5` wrapper edge-to-edge when nested. Approach: add a `compact: boolean` prop (or context-detect via a wrapper component) passed from `SubtaskRow`, and apply `-mx-2 mt-2 mb-0.5` (breakout + vertical separation) + `rounded border border-slate-200 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900` when `compact` is set. Standalone `TaskRow`/`EpicRow` callsites pass `compact={false}` (or omit) and get the existing inline panel chrome. `SubtaskRow.tsx:73-77` passes `compact={true}`.
7. **TaskDetail starter-mode rendering** — `viz/src/ui/TaskDetail.tsx:47-52`: replace the single starter `DetailSection` with four conditional `DetailSection` blocks driven by `tasknote.starterSubsections` and `detailPrefs.starterSections`. Headings: `Why this exists`, `Solution shape`, `Files to touch`, `Out of scope`. Each gated by its toggle AND by non-empty content (an empty extracted subsection just doesn't render). Wire `starterSections` prop into the `TaskDetail` props alongside `detailSections`.
8. **App-level prop plumbing** — `viz/src/ui/App.tsx` + `EpicRow.tsx` + `SubtaskRow.tsx` + `TaskRow.tsx`: pass `visibility.starterSections` through to `TaskDetail` alongside the existing `detailSections={visibility.detailSections}` prop drop. (Verify whether to widen TaskDetail's `detailSections` prop to include `starterSections`, or add a parallel prop — pick whichever is the cleanest extension at the callsites.)
9. **Run targeted suite** — `npm --prefix viz test`. Expect existing 106 + new sub-section parser tests + new visibilityPrefs additive-field tests, all green.
10. **Type-check** — `cd viz && npx tsc --noEmit` clean.
11. **Bundle sanity** — `npm --prefix viz run build`; capture per-chunk gzipped sizes; verify entry ≤80 KB gz, `TaskDetail-*.js` lazy chunk still present (no static-import regression), `gray-matter` absent from `viz/dist/assets/*.js`, `react-markdown` only in the lazy chunk. Compare to `.14` baseline (entry 55.46 KB gz, lazy 48.21 KB gz).
12. **Visual confirmation** (👁️) — `npm --prefix viz run dev` (port 5120). Walk Default / Compact / Comfortable density × light / dark theme. Test: subtask click shows the card-styled panel (Acceptance #1), starter click shows per-subsection layout (#2), DetailSection chrome (#7) reads cleanly across modes, SettingsModal "Starter context" toggles work and persist.

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz embellishment)
- [[CORE-098.14]] — predecessor (subtask detail-panel expand); filed this task via user visual-confirmation feedback ("could be prettier", starter wants polish)
- [[CORE-098.3]] — established the `detailSections: {goal, acceptance, subtasks}` settings-toggle pattern this task extends with `starterSections`
- [[CORE-098.4]] — DENSITY_TOKENS scope-by-design excludes TaskDetail + header chrome; this polish respects that contract (per-component tuning, not new density tokens)
- [[CORE-098.12]] — typography scale registry (`TYPOGRAPHY.{heading,subhead,body,caption}` in `constants.ts`); DetailSection heading lift moves up one step from caption tier
- [[FE-026]] — bundle-split + lazy TaskDetail discipline to preserve through this polish

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed (with scope-widened call captured below)
  **Rationale:** Filed by `.14` via user visual-confirmation feedback during functional-pass: subtask-expand panel from `.14` reads as visually cramped (panel sits inside EpicRow's `px-2 py-1.5` subtask-list wrapper with only `gap-1` Default-density spacing from adjacent SubtaskRows — its own `px-3 py-2 border-t` chrome butts against neighbors); starter-context body rendering wants polish (currently dumps the raw `## 🌱 Starter context` body with all sub-headings including the internal-workflow preamble + Decisions table + Open-at-promotion questions, styled identically to a Goal/Acceptance/Subtasks side-section). Scope confirmed (Q3) as widened from the PLAN.md line to also touch the shared `DetailSection` chrome consumed by Goal / Acceptance / Subtasks — a single-file lift in `DetailSection.tsx` applies polish uniformly. No drift between the audit/`.14` findings (filed today) and current code. The state machine (`expandedId` plumbing) is intact from `.14`; this is a pure styling + rendering-shape change with one schema-additive bump (visibilityPrefs `starterSections`).

- [x] Read relevant source files (see Discovery Notes)
- [x] **Archive skim** (see Discovery Notes)
- [x] **Drift check** (see Discovery Notes)
- [x] Asked clarifying questions — 6 resolved via two AskUserQuestion rounds (Q1–Q3 round 1; Q4–Q6 round 2)
- [x] Subtasks above populated with concrete, ordered steps

### Clarifying-question outcomes (resolved 2026-05-16)

**Q1 — Subtask panel placement (lift vs restyle):** Restyle in place. Keep panel as a `SubtaskRow` sibling (current shape from `.14`); add card-styled + indented treatment so it reads as a card under the clicked row. Smaller change; preserves click→panel anchoring.

**Q2 — Starter body polish direction:** Two-axis answer — *(a) Treat as 'full body, prominent'* (drop the metadata-caption styling; bigger heading; bump body typography) + *(b) Card the body* (distinct surface vs panel bg). Plus user-flagged direction: *"have less information than is in the .md file — mostly user-friendly stuff"* + *"make this customizable in project settings, like the other custom viz stuff"*. Filter rule resolved in Q4–Q6.

**Q3 — Scope width:** Include DetailSection polish. Goal/Acceptance/Subtasks rendering gets the same lift via the shared `DetailSection` component. Single-file change; uniform visual treatment.

**Q4 — Starter subsections to render:** Show *Why this exists* + *Solution shape* + *Explicitly out of scope* + *Files to touch*. Drop the rest. Plus: expose as per-subsection settings toggles in SettingsModal (mirrors existing `detailSections` shape).

**Q5 — Preamble line:** Drop. The italic `_Captured YYYY-MM-DD during <…> — promote to full tasknote at /task checkout._` line is internal-workflow gossip.

**Q6 — Decisions/Open-at-promotion subsections:** Drop both. Operationally `/task` Discovery-time artifacts; not user-facing panel content.

**Discovery Notes:**

### Source files reviewed

- `viz/src/ui/TaskDetail.tsx` (full read, 82 LOC) — current rendering: outer `<div className="border-t border-slate-100 bg-slate-50/40 px-3 py-2 text-sm text-slate-700 …">` at line 22 hosts a meta-header row + branched body (starter → single `DetailSection title="🌱 Starter context" markdown={tasknote.starterContext}` at lines 47-52; non-starter tasknote → three conditional `DetailSection`s for Goal/Acceptance/Subtasks at lines 53-72; raw `task.description` markdown for no-tasknote case at lines 73-77). VS Code link at the right of the metadata header (line 36-44) stays.
- `viz/src/ui/EpicRow.tsx` (full read, 121 LOC) — caller surface. Subtask-list grid wrapper at lines 88-105: `<div className="flex flex-col {tokens.subtaskInterRowGap} border-t border-slate-100 bg-slate-50/50 px-2 py-1.5 …">` (Default-density: `gap-1`). When a SubtaskRow inside this wrapper expands its TaskDetail, the panel renders as a SubtaskRow sibling — sandwiched between adjacent SubtaskRows with only `gap-1` separation. The grid-rows transition trick at lines 84-87 (from `.8`) keeps subtask DOM mounted while collapsed but doesn't affect this task (it's a wrapper around the subtask-list, not inside individual SubtaskRows). Epic's own TaskDetail still renders at the end (line 109-118) — unaffected.
- `viz/src/ui/SubtaskRow.tsx` (full read, 84 LOC, post-`.14`) — lazy TaskDetail mount at lines 71-80. Outer structural `<div>` (line 33) wraps inner flex row + conditional Suspense+TaskDetail sibling. This is where the "cramped" panel renders. The new task's subtask-context restyle hooks here.
- `viz/src/ui/TaskRow.tsx` (full read, 61 LOC) — standalone (non-epic) row variant. Outer `<div className="rounded border …">` at lines 32-58 has its own visual container; TaskDetail renders inside that, NOT cramped (it has the row's full padding-9 left-indent + the row's distinct bg). No restyle needed on this path — but DetailSection chrome lift applies (same component).
- `viz/src/ui/DetailSection.tsx` (full read, 18 LOC) — the shared section renderer consumed by both starter + non-starter branches. Heading: `text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400` (caption-tier, metadata-styled). Body wrapper: `prose prose-xs max-w-none [&_p]:my-1 [&_ul]:my-1 [&_li]:my-0 [&_input]:mr-1`. Container: `mb-2 last:mb-0`. **This file is the single source of truth for section chrome — one edit lifts all three (Goal/Acceptance/Subtasks) and each starter sub-section.**
- `viz/src/ui/WikilinkMarkdown.tsx` (full read) — markdown rendering w/ wikilink-to-button substitution. No changes needed; DetailSection lift wraps this verbatim.
- `viz/src/ui/constants.ts` (full read of relevant parts, lines 1-148) — `TYPOGRAPHY` scale at lines 30-35: `heading/subhead/body/caption` = `text-lg/text-base/text-sm/text-xs`. Bumping DetailSection heading from caption (`text-xs`) → body (`text-sm`) keeps it within the registry. **CORE-098.4 design call captured at lines 105-108:** `Scope: row-surface only — TaskDetail and header chrome stay fixed.` (CORE-098.11 audit reconfirmed this at line 41 of the audit.) This task respects that contract: per-component tuning of `DetailSection`'s padding (inside TaskDetail) is fine; we do NOT add density tokens for TaskDetail itself.
- `viz/src/tasknote.ts` (full read, 122 LOC) — `extractSection(body, titleSubstring)` at lines 77-96 walks the body by `## ` headings, substring-matches the title, collects lines until the next `## ` or `---`. The new `extractStarterSubsections` mirrors this shape but matches `### ` headings and uses a fixed key→substring map to extract the four keep-keys.
- `viz/src/tasknote-parse.ts` (lines 1-30 read) — populates `goal`/`acceptance`/`subtasks`/`starterContext` via `extractSection`. Will add `starterSubsections: extractStarterSubsections(...)` alongside line 22.
- `viz/src/visibilityPrefs.ts` (full read, 81 LOC) — `VisibilityPrefs` interface at lines 3-17, `DEFAULT_PREFS` at lines 19-24, `parsePrefs` at lines 35-64. Adding `starterSections` follows the existing `detailSections` pattern exactly (top-level field with per-key `isBool` fallback). No version bump needed — additive field with fallback default is forward-compatible from v1 (parsePrefs already gives any missing sub-field its DEFAULT value via the `isBool(...) ? … : DEFAULT_PREFS.detailSections.X` pattern; the same pattern works for a missing-top-level `starterSections`).
- `viz/src/ui/SettingsModal.tsx` (full read, 156 LOC) — `<fieldset>` shape at lines 118-134 ("Detail panel") is the template to mirror for the new "Starter context" fieldset. Component already has the `setDetailSection` handler pattern (lines 65-67) — new `setStarterSection` handler is a direct copy.
- `templates/tasknote-starter-template.md` (full read, 46 LOC) — defines the canonical sub-section structure under `## 🌱 Starter context`: preamble italic line at line 14, then `### Why this exists` (16), `### Solution shape` (20), `### Files to touch (preliminary survey — drift-check at promotion)` (25 — note the parenthetical; the new parser must substring-match "Files to touch"), `### Explicitly out of scope` (29), `### Decisions locked in this conversation` (33), `### Open at promotion (Phase 1 should resolve)` (39), `### Related` (43). Sub-section parser keys: `whyExists` → "Why this exists", `solutionShape` → "Solution shape", `filesToTouch` → "Files to touch", `outOfScope` → "Explicitly out of scope".

### Archive skim (source paths: `TaskDetail.tsx`, `DetailSection.tsx`, `SubtaskRow.tsx`, `EpicRow.tsx`, `SettingsModal.tsx`, `visibilityPrefs.ts`)

`grep -l 'TaskDetail\|DetailSection\|SubtaskRow\|EpicRow\|SettingsModal' archive/core/*.md`:

- **CORE-098.14** (predecessor — full read) — added lazy-`TaskDetail` mount to `SubtaskRow`. Visual confirmation step explicitly deferred the "could be prettier" + starter-polish feedback to this task. Bundle baseline post-`.14`: entry **55.46 KB gz** (+0.03 vs `.11`), lazy `TaskDetail-*.js` **48.21 KB gz** (unchanged). Wikilink test (`App.test.tsx:115-116`) asserts `id="row-CORE-1.1"` + `ring-indigo` on inner flex container — preserve through the subtask panel restyle (the inner flex container stays as the highlight target; the new card chrome attaches to the TaskDetail block, not to SubtaskRow's row div).
- **CORE-098.12** (typography scale bump, recent — relevant slice) — `TaskDetail.tsx:22` panel container moved from `text-[10px]` (caption-off-grid) → `text-sm` (body) for the metadata header context. `DetailSection.tsx` body wrapper was `prose-xs` then and stayed `prose-xs` (caption-tier text inside the body) — bumping to `prose-sm` here continues the same one-step-up direction from `.12`. **No conflict with `.12` decisions** — that task established the registry; this task makes a per-component choice within it.
- **CORE-098.11** (audit, PASS) — reconfirmed at line 41 the `.4` scope decision: "TaskDetail + header chrome stay fixed by design (`.4` scope)" — i.e., no density-tokenization for TaskDetail. This task respects that: polish lives inside DetailSection + TaskDetail's own per-context chrome, not via DENSITY_TOKENS extensions.
- **CORE-098.10** (empty + loading states) — added `LoadingSkeleton`; no TaskDetail surface impact.
- **CORE-098.8** (motion polish) — added the EpicRow subtask-list grid-rows height-animation wrapper at `EpicRow.tsx:84-87`. The wrapper sits OUTSIDE the cramped subtask-list grid; restyling TaskDetail inside SubtaskRow doesn't touch the wrapper. `prefers-reduced-motion` discipline still applies — the new card chrome should NOT animate.
- **CORE-098.7** (epic-row visual lift) — added `EPIC_ROW_NEUTRAL` + `epicRowOutlineClass`. No DetailSection / TaskDetail content impact.
- **CORE-098.6** (focus-ring system) — established the `PILL_*` constants + inline `focus:ring-slate-400/500` per surface. DetailSection has no interactive surfaces (rendered markdown is read-only; wikilink buttons inside `WikilinkMarkdown` already carry their own ring) — no focus-ring impact here.
- **CORE-098.4** (density modes) — the scope-by-design call (TaskDetail + header chrome stay fixed). Reconfirmed via `.11` audit. This task respects it.
- **CORE-098.3** (settings-modal scaffold) — introduced `detailSections: {goal, acceptance, subtasks}` toggles + the `SettingsModal` fieldset shape. The new `starterSections` field + fieldset is a direct extension of this pattern, no shape-divergence.
- **CORE-098.2** (typography & color audit) — established the off-grid-deprecation discipline. Bumping DetailSection heading from `text-xs uppercase` → `text-sm normal-case` stays on-grid (`text-sm` is the `body` registry tier).
- **CORE-080** (the starter-context surface introduction, per grep) — original starter render path. No conflict with reworking how starter renders here.
- **CORE-051** (starter override clause — workflow doc) — no viz impact; mentions starter content discipline for the workflow contract.
- **CORE-027 / CORE-069** (other starter-touching tasknotes — workflow scope) — no viz impact.
- **CORE-042.1/.3/.4** (FE-rendering refactors that touched these components) — established the component split; no shape-divergence with this task.
- **FE-026** (bundle-split + lazy TaskDetail discipline) — **critical preserve**: any new imports in TaskDetail must stay inside the lazy chunk. This polish adds no new third-party deps (pure styling + parser logic). Bundle envelope: ≤80 KB gz entry. Starter sub-section parser sits in `tasknote.ts` (eager — already loaded for tasknote parsing) — not in the lazy chunk, but doesn't pull `gray-matter` or `react-markdown`, so the entry chunk impact is +tiny (a small function).

### Drift check

PLAN.md line cites:
- ✅ `TaskDetail.tsx` exists at `viz/src/ui/TaskDetail.tsx` — confirmed.
- ✅ `EpicRow.tsx` subtask-list grid wrapper at `EpicRow.tsx:90` (cramped container) — confirmed (`px-2 py-1.5` on the inner div of the grid-rows wrapper at line 89-91).
- ✅ "Subtask `TaskDetail` panel from `.14`" — confirmed via SubtaskRow.tsx:71-80 (`.14`'s lazy-mount block intact).
- ✅ "starter-context body rendering in `TaskDetail.tsx`" — confirmed at lines 47-52 (single `DetailSection title="🌱 Starter context"` block).

No drift between the `.14` recap's filing of `.15` (today) and current code.

### Design decisions captured

1. **Subtask panel breakout strategy** — use negative margin (`-mx-2` to cancel the EpicRow wrapper's `px-2`; `mt-2 mb-0.5` for vertical separation from adjacent rows) on the TaskDetail root when nested inside a SubtaskRow. Driven by a `compact: boolean` prop (or equivalent context signal) passed from `SubtaskRow.tsx:73-77`. `TaskRow.tsx` and `EpicRow.tsx` callsites omit the prop / pass `false` → existing inline panel chrome unchanged on those paths. Rationale: single-file change, no new wrapper components.
2. **`compact` prop naming** — final choice in Phase 2 (alternatives: `inset`, `nested`, `subtaskContext`). Lean: `compact` since it parallels density-mode naming and reads cleanly at the callsite.
3. **DetailSection lift typography** — heading `text-xs uppercase tracking-wide text-slate-500` → `text-sm font-semibold text-slate-700 dark:text-slate-200` (normal-case, no tracking, registered `body` tier). Body wrapper `prose-xs` → `prose-sm` (registered `body` tier inside prose). Container `mb-2` → `mb-3` for separation between lifted sections. Card chrome around body: `rounded bg-white px-2.5 py-1.5 dark:bg-slate-900/60` (tentative — confirm in visual pass). The card sits inside TaskDetail's existing `bg-slate-50/40` panel background, creating a two-layer surface (panel → card-per-section).
4. **Starter sub-section parser placement** — `viz/src/tasknote.ts` (not `tasknote-parse.ts`) for parity with `extractSection`. Pure function, easily tested.
5. **VisibilityPrefs additive vs version-bump** — keep `version: 1`. Additive new top-level `starterSections` field with the existing per-key `isBool` fallback discipline. Old prefs missing the field get DEFAULT_PREFS for all four keys, preserving the user's other settings. **No localStorage migration risk.**
6. **`TaskDetail` prop signature for starterSections** — extend an existing prop or add parallel? Lean: add `starterSections: VisibilityPrefs['starterSections']` alongside the existing `detailSections: VisibilityPrefs['detailSections']` (parallel shape; clearer at the callsite). All three callsites (`TaskRow.tsx`, `EpicRow.tsx`, `SubtaskRow.tsx`) pass both. Final call in Phase 2 — could equivalently widen `detailSections` to include starter keys (single bag of section toggles). Decide based on which reads cleaner in `App.tsx` plumbing.
7. **Out of scope for this task** — `.5` (board view-switcher) and `.13` (subtaskContainerPad density token at EpicRow.tsx:90) are the remaining open `.<N>` children of CORE-EPIC-098 and stay independent. The audit (`.11`) ran before this task was filed; the CORE-EPIC-098 final-audit subtask will run after `.15` + `.13` + `.5` all close.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing `extractSection` substring-match shape (`viz/src/tasknote.ts:77-96`) for the new `extractStarterSubsections` (sibling helper, same regex discipline against `###` instead of `##`); extended `parsePrefs` additive-fallback pattern (`visibilityPrefs.ts:46-63`) verbatim for `starterSections`; mirrored existing `DETAIL_SECTION_*` shape (`SettingsModal.tsx:21-25,34,65-67,118-134`) for the new `STARTER_SECTION_*` map + handler + fieldset. `TaskDetail`'s new `compact` prop is the only new shape — justified by needing context-specific chrome (subtask wrapper breakout) that doesn't generalize beyond the SubtaskRow caller.
- [x] Implemented the minimal solution — 6 viz files changed: `tasknote.ts`, `tasknote-parse.ts`, `visibilityPrefs.ts`, `DetailSection.tsx`, `TaskDetail.tsx`, `SettingsModal.tsx`. Three callsites (`TaskRow.tsx`, `EpicRow.tsx`, `SubtaskRow.tsx`) gained the `starterSections={visibility.starterSections}` prop drop; `SubtaskRow` also passes `compact`. Test fixture (`viz/src/test/fixtures.ts`) widened with `starterSubsections` default to satisfy the extended `Tasknote` interface.
- [x] Updated/added tests for non-trivial behavior — 4 new `extractStarterSubsections` tests (full body / partial / empty / decisions-filter); 2 new `visibilityPrefs.starterSections` tests (missing-field migration / partial-bool fallback); existing `parseTasknote` starter test extended with `starterSubsections` assertions; round-trip test updated to include the new `starterSections` field.

**Implementation Notes:**

### Parser additions (`viz/src/tasknote.ts`)

- `StarterSubsectionKey = 'whyExists' | 'solutionShape' | 'filesToTouch' | 'outOfScope'` exported alongside `STARTER_SUBSECTION_KEYS` array and `emptyStarterSubsections()` factory (for test fixtures).
- `extractStarterSubsections(body)` walks the `## 🌱 Starter context` body by `### ` headings, substring-matching against a fixed title map (`Why this exists` / `Solution shape` / `Files to touch` / `Explicitly out of scope`). Missing sub-headings → empty strings (not undefined). Decisions / Open at promotion / Related sub-headings are deliberately not in the keep-list, so their body never gets collected.
- `Tasknote` interface extended with `starterSubsections: StarterSubsections`; `tasknote-parse.ts` populates it via `extractStarterSubsections(starterContext)`.

### VisibilityPrefs additive (`viz/src/visibilityPrefs.ts`)

- Added `starterSections: { whyExists, solutionShape, filesToTouch, outOfScope }` (all `true` by default) to `VisibilityPrefs` + `DEFAULT_PREFS`. Kept `version: 1` (no schema-version bump) — the field is read via `(d.starterSections as Record<string, unknown> | undefined) ?? {}` with per-key `isBool` fallback to defaults, so pre-existing v1 prefs missing this field migrate transparently (preserves user's density/rowChips/detailSections choices). New test in `visibilityPrefs.test.ts` confirms the migration path.

### DetailSection lift (`viz/src/ui/DetailSection.tsx`)

- Heading: `text-xs uppercase tracking-wide text-slate-500` → `text-sm font-semibold text-slate-700 dark:text-slate-200` (normal-case, registered `body` typography tier per `constants.ts:34`).
- Body wrapper: `prose prose-xs` → `prose prose-sm` (one step up; matches the body-tier convention).
- Body card chrome: `rounded border border-slate-200/70 bg-white/70 px-2.5 py-1.5 dark:border-slate-700/60 dark:bg-slate-900/40` — sits on top of TaskDetail's own panel bg, creating a two-layer surface that reads as "card per section."
- Inter-section spacing: `mb-2` → `mb-3` so the lifted cards don't crowd.

### TaskDetail restructure (`viz/src/ui/TaskDetail.tsx`)

- New `compact?: boolean` prop (defaults `false`). When `true`, panel root uses `-mx-2 mt-2 mb-0.5 rounded border border-slate-200 bg-white px-3 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-900` — the negative `-mx-2` cancels `EpicRow.tsx:90`'s subtask-list `px-2` wrapper edge-to-edge; the rounded border + shadow + bg-white reads as a card lift over the wrapper's `bg-slate-50/50`; `mt-2 mb-0.5` separates the card vertically from adjacent subtask rows.
- New `starterSections: VisibilityPrefs['starterSections']` prop alongside the existing `detailSections`.
- Starter branch replaced: instead of a single `DetailSection title="🌱 Starter context" markdown={tasknote.starterContext}`, the panel now maps over `STARTER_SUBSECTION_KEYS` and renders one `DetailSection` per subsection, gated by `starterSections[key] && tasknote.starterSubsections[key]`. Sub-section titles use a user-friendly `STARTER_SUBSECTION_LABEL` map (e.g., `outOfScope` → "Out of scope" instead of the template's "Explicitly out of scope"). The preamble line + Decisions / Open at promotion / Related are never rendered (the parser never collects them).
- No-tasknote branch's prose wrapper bumped `prose-xs` → `prose-sm` for consistency with the lifted DetailSection bodies.

### SettingsModal fieldset (`viz/src/ui/SettingsModal.tsx`)

- New `STARTER_SECTION_LABEL` map (`whyExists` → "Why this exists", `solutionShape` → "Solution shape", `filesToTouch` → "Files to touch", `outOfScope` → "Out of scope"); `STARTER_SECTION_KEYS` array; `setStarterSection(key, value)` handler.
- New `<fieldset legend="Starter context">` block after the existing "Detail panel" one, four checkboxes in a 2-col grid.

### Callsite plumbing

- `TaskRow.tsx` + `EpicRow.tsx` (both for the row's own TaskDetail, not the subtask-list): added `starterSections={visibility.starterSections}`.
- `SubtaskRow.tsx`: added `starterSections={visibility.starterSections} compact` (so the subtask-context panel uses the breakout chrome; `compact` is the SubtaskRow caller's signal).

### Bundle impact

| Asset | Raw | Gzipped | vs `.14` baseline |
|---|---|---|---|
| `dist/index.html` | 0.93 kB | 0.53 kB | unchanged |
| `dist/assets/index-*.css` | 25.11 kB | 5.06 kB | +0.06 KB gz (new utility classes from card chrome + compact panel) |
| `dist/assets/index-*.js` (entry) | 178.15 kB | **55.73 KB gz** | **+0.27 KB gz** (extractStarterSubsections + starterSections prefs plumbing in always-loaded path) |
| `dist/assets/TaskDetail-*.js` (lazy) | 159.27 kB | **48.42 KB gz** | **+0.21 KB gz** (STARTER_SUBSECTION_LABEL map + compact-prop branch in TaskDetail + DetailSection card chrome) |

- 313 modules transformed (unchanged).
- `grep -l 'gray-matter' viz/dist/assets/*.js` → **0 hits** ✅ (FE-026 preserved)
- `grep -l 'react-markdown' viz/dist/assets/*.js` → only `TaskDetail-*.js` ✅ (lazy chunk only)
- Entry-chunk total: 24.27 KB gz headroom under the 80 KB acceptance bar.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **112/112 pass** (was 106 post-`.14`; +6 = 4 new `extractStarterSubsections` + 2 new `visibilityPrefs.starterSections` migration tests).
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit -p viz` clean (exit 0). Bundle build also runs `tsc --noEmit` first per `viz/package.json:scripts.build` — also clean.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — user confirmed two rounds: (1) initial chrome + starter rendering + SettingsModal fieldset all read well; (2) flagged "indentation is off" because the chip row + section headings + cards were starting at the panel's left edge instead of the row's title column. Fixed by swapping `px-3` → `pl-9 pr-3` on both compact and non-compact panel roots in `TaskDetail.tsx`; chip row + sections now align with the row's `pl-9` title-column offset. User confirmed "good go" on the re-check.

**Testing Notes:**

### Test suite breakdown

```
✓ src/visibilityPrefs.test.ts (11 tests) — was 9; +2 starterSections migration tests
✓ src/parser.test.ts (29 tests) — unchanged
✓ src/tasknote.test.ts (29 tests) — was 25; +4 extractStarterSubsections tests
✓ src/workspace.test.ts (8 tests) — unchanged
✓ src/archiveCache.test.ts (10 tests) — unchanged (stderr warnings are pre-existing malformed-frontmatter fixtures)
✓ src/ui/ProjectSelector.test.tsx (3 tests) — unchanged
✓ src/ui/App.test.tsx (22 tests) — unchanged (subtask-expand test from `.14` still green — the compact prop is additive to SubtaskRow's TaskDetail render; existing test asserts on goal-text-visible which still holds)

Total: 112 passed (was 106; +6).
```

### Bundle sanity verification

Re-ran `npm --prefix viz run build` and grepped distributions — see Implementation Notes bundle table above. All FE-026 guardrails hold: entry ≤80 KB gz (55.73 KB; 24+ KB headroom), `TaskDetail-*.js` lazy chunk present and gzipped 48.42 KB, `gray-matter` absent from `viz/dist/assets/*.js`, `react-markdown` only in the lazy chunk.

### Visual smoke (pre-handoff, before 👁️)

Walked through dev server at port 5120 with Playwright:

- **flowtron / CORE-098.15** (subtask expand under CORE-EPIC-098, Default density, light): compact panel chrome rendered correctly — `-mx-2 mt-2 mb-0.5 rounded border bg-white shadow-sm` breaks out of EpicRow's `px-2 py-1.5` subtask-list wrapper, sits as a card with `mt-2` separation from adjacent rows. Inside: Goal / Acceptance / Subtasks sections each render with the lifted DetailSection chrome (semibold normal-case heading + `prose-sm` body inside a rounded white-on-slate card).
- **bananapeel / BP-1105** (starter tasknote, Medium priority, Default density, light): starter-mode rendering shows exactly the four configured subsections — `Why this exists`, `Solution shape`, `Files to touch`, `Out of scope`. The preamble line, Decisions table, Open at promotion bullets, and Related wikilinks from the source `.md` are NOT in the rendered panel (filtered by the parser).
- **SettingsModal**: new "STARTER CONTEXT" fieldset appears between "Detail panel" and the action buttons, four checkboxes in a 2-col grid, all defaulted on.

Pre-handoff smoke passes. Visual-confirmation ask (👁️) below for user sign-off across density × theme.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview unaffected by a viz internal-rendering polish.
  - `SPEC.md` — **no change.** Workflow contract untouched.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md `.15` line flipped to stub form `Completed 2026-05-16.` (epic subtask completions stay under the parent epic per `.12` / `.14` precedent — not moved to `## Completed`); tasknote moved to `_project/tasknote/archive/core/CORE-098.15.md`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate — frontend files in diff means fire branch)

**Final Summary:**

Closed audit-follow-up `.15` from CORE-EPIC-098. The gap (filed by `.14` visual-confirmation): the `TaskDetail` panel rendered from the new SubtaskRow lazy-mount felt cramped (sandwiched between adjacent SubtaskRows inside `EpicRow.tsx:90`'s `flex flex-col gap-1 px-2 py-1.5` subtask-list wrapper with only the `subtaskInterRowGap` density-token's spacing between siblings); the starter-context rendering dumped the entire raw `## 🌱 Starter context` body — including internal-workflow preamble, "Decisions locked" provenance table, "Open at promotion" Phase-1 seed questions, and "Related" wikilinks — as a single tiny-uppercase-caption `DetailSection`; and the shared `DetailSection` chrome read as metadata-caption rather than as a content section.

Fix in three layers. **Layer 1 — subtask panel breakout (`TaskDetail.tsx` compact prop):** new `compact?: boolean` prop swaps the panel root from `border-t border-slate-100 bg-slate-50/40 px-3 py-2` → `-mx-2 mt-2 mb-0.5 rounded border border-slate-200 bg-white px-3 py-2.5 shadow-sm` (dark-mode mirror); the `-mx-2` cancels EpicRow's `px-2` wrapper edge-to-edge so the panel reads as a card lifting out of the cramped subtask-list, with `mt-2 mb-0.5` vertical separation from adjacent SubtaskRows. `SubtaskRow.tsx` callsite passes `compact`; `TaskRow.tsx` / `EpicRow.tsx` callsites omit it (default `false`) so the non-subtask paths keep their existing inline chrome. **Layer 2 — starter rendering shape:** new `extractStarterSubsections` parser in `viz/src/tasknote.ts` walks the starter body by `### ` sub-headings against a fixed key→title map (`whyExists` / `solutionShape` / `filesToTouch` / `outOfScope`); the four implementation-flavored sub-sections (preamble line, Decisions table, Open at promotion, Related) are deliberately not in the keep-list, so the parser never collects them. `Tasknote` interface extended with `starterSubsections: StarterSubsections`; `tasknote-parse.ts` populates it from `starterContext`. `TaskDetail.tsx`'s starter branch now maps over `STARTER_SUBSECTION_KEYS` and renders one `DetailSection` per subsection, each gated by `starterSections[key] && tasknote.starterSubsections[key]`, with user-friendly labels (`outOfScope` → "Out of scope" instead of the template's "Explicitly out of scope"). **Layer 3 — DetailSection visual lift:** heading from `text-xs uppercase tracking-wide text-slate-500` → `text-sm font-semibold text-slate-700 dark:text-slate-200` (normal-case, registered `body` typography tier per `constants.ts:34`); body wrapper `prose prose-xs` → `prose prose-sm`; new card chrome `rounded border border-slate-200/70 bg-white/70 px-2.5 py-1.5 dark:border-slate-700/60 dark:bg-slate-900/40` around the body so each section reads as a card-on-panel two-layer surface; inter-section `mb-2` → `mb-3`. Applied uniformly across all `DetailSection` consumers (Goal / Acceptance / Subtasks in the standard branch + each starter sub-section). **Plus content indent (added after first visual-confirmation round):** swapped panel root's `px-3` → `pl-9 pr-3` (both compact and non-compact) so the chip row + section headings + cards align with the row's existing `pl-9` title-column offset — content reads as visually nested under the parent row instead of starting at the panel's edge.

**Settings plumbing.** `VisibilityPrefs` extended additively with `starterSections: { whyExists, solutionShape, filesToTouch, outOfScope }` (all `true` by default); kept `version: 1` and used the existing per-key `isBool ? … : DEFAULT_PREFS.starterSections.x` fallback discipline, so pre-existing v1 prefs missing the field migrate transparently (preserves user's density/rowChips/detailSections choices — zero localStorage migration risk). `SettingsModal.tsx` gained a new "STARTER CONTEXT" fieldset between "Detail panel" and the action buttons, mirroring the existing `DETAIL_SECTION_*` shape (2-col grid, four checkboxes). Three callsites (`TaskRow.tsx`, `EpicRow.tsx`, `SubtaskRow.tsx`) updated to pass `starterSections={visibility.starterSections}` alongside `detailSections=…`.

**Tests.** Six new tests landed (105 → 112 passing, accounting for the `.14` baseline of 106): four new `extractStarterSubsections` cases (full body / partial / empty / decisions-filter) in `tasknote.test.ts`; two new `visibilityPrefs.starterSections` migration cases (missing-field defaults / partial-bool fallback) in `visibilityPrefs.test.ts`. The existing `parseTasknote` starter test extended with `starterSubsections` assertions; the round-trip `VisibilityPrefs` test updated to include the new `starterSections` field. Test fixture (`viz/src/test/fixtures.ts`) widened with `starterSubsections: emptyStarterSubsections()` default to satisfy the extended `Tasknote` interface. `tsc --noEmit` clean.

**Bundle hygiene preserved.** Entry chunk **55.73 KB gz** (+0.27 KB gz vs `.14` baseline 55.46 KB — covers `extractStarterSubsections` parser + `starterSections` prefs plumbing in the always-loaded path); lazy `TaskDetail-*.js` **48.42 KB gz** (+0.21 KB gz vs `.14` baseline 48.21 KB — covers `STARTER_SUBSECTION_LABEL` map + `compact`-prop branch in TaskDetail + DetailSection card chrome). 313 modules transformed (unchanged). `gray-matter` absent from `viz/dist/assets/*.js` (FE-026 preserved); `react-markdown` still scoped to the lazy chunk only. Entry chunk has 24.27 KB gz headroom under the FE-026 80 KB acceptance bar.

**Visual confirmation.** User walked: (i) subtask compact panel chrome (CORE-098.15 expansion under CORE-EPIC-098 in flowtron) — card breakout reads with breathing room; (ii) starter rendering (BP-1105 in bananapeel) — four sub-sections show cleanly, preamble + Decisions + Open + Related correctly filtered; (iii) SettingsModal "STARTER CONTEXT" fieldset with four working toggles. Flagged indent miss on first pass; re-confirmed "good go" after the `pl-9 pr-3` swap aligned panel content with the row's title column.

**Closure diff:** `viz/src/tasknote.ts` (+44 LOC: `StarterSubsectionKey` type, `STARTER_SUBSECTION_KEYS`/`_TITLES`, `emptyStarterSubsections`, `extractStarterSubsections` walker, `Tasknote.starterSubsections` field), `viz/src/tasknote-parse.ts` (3-line wiring), `viz/src/visibilityPrefs.ts` (+18 LOC: type + default + parse fallback), `viz/src/ui/DetailSection.tsx` (rewritten: heading typo + card chrome), `viz/src/ui/TaskDetail.tsx` (+12 LOC, restructured starter branch + compact prop + indent), `viz/src/ui/SettingsModal.tsx` (+30 LOC: STARTER_SECTION_* + new fieldset), `viz/src/ui/TaskRow.tsx` / `viz/src/ui/EpicRow.tsx` / `viz/src/ui/SubtaskRow.tsx` (1-line `starterSections=` prop drop each; `SubtaskRow` also gains `compact`), `viz/src/test/fixtures.ts` (1-line `starterSubsections` default), `viz/src/tasknote.test.ts` (+76 LOC test coverage), `viz/src/visibilityPrefs.test.ts` (+38 LOC test coverage), `_project/PLAN.md` (1 line flipped to stub), and this tasknote (full body → archived).

**Archived:** 2026-05-16
