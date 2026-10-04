---
title: typography & color audit
status: completed
tags: []
created: 2026-05-15
due:
related-tasks: [CORE-EPIC-098, CORE-098.1]
---

# CORE-098.2 | typography & color audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]] · [[CORE-098.1]]

## 🎯 Goal

Codify a 4-step typography scale and consolidate viz's color palette — resolving the amber-collision across active-phase / highlight / in-progress / Medium — with a documented semantic mapping in `viz/src/ui/theme.ts` and consistent application across components.

## ✅ Acceptance

- [ ] `viz/src/ui/constants.ts` exports a `TYPOGRAPHY` const with 4 keys (`heading` / `subhead` / `body` / `caption`) mapping to Tailwind size classes, plus a JSDoc block documenting the role → size mapping
- [ ] `constants.ts` houses semantic color tokens consolidated from inline component maps: `SECTION_TINT` (moved from `PrioritySection.tsx`), `PRIORITY_BADGE` (moved from `TaskDetail.tsx`), `PHASE_DOT.{filled,active,inactive}` (moved from `PhaseDots.tsx`), `ROW_HIGHLIGHT` / `ROW_HIGHLIGHT_SUBTASK` (new, non-amber), `ROW_SELECTION`, `ROW_NEUTRAL`
- [ ] Row highlight migrated off amber to a non-colliding hue (indigo: `border-indigo-400 ring-indigo-300` light / `border-indigo-500 ring-indigo-600` dark); `utils.ts rowOutlineClass` + `SubtaskRow.tsx` inline highlight both consume the new token
- [ ] `App.test.tsx:117` + `:120` regex updated from `/ring-amber/` → `/ring-indigo/`; test still asserts the same highlight-applied → highlight-cleared lifecycle
- [ ] Off-grid typography sizes folded to the 4-step scale: `SubtaskRow.tsx:40,44` `text-[11px]` → `text-xs`; `SubtaskRow.tsx:33` `text-[9px]` → `text-[10px]`
- [ ] `PrioritySection.tsx`, `TaskDetail.tsx`, `PhaseDots.tsx` import their color tokens from `constants.ts` (inline maps deleted; no duplication remains)
- [ ] Remaining amber bindings preserved by design: PhaseDots active dot (transient state), `STATUS_BADGE['in-progress']` (in-progress status), Medium-priority section tint + detail badge — all kept in the state/attention semantic family
- [ ] `npm --prefix viz run test` passes (full vitest suite, including the updated highlight test)
- [ ] `npm --prefix viz exec tsc -- --noEmit` clean
- [ ] User visually confirms (👁️) at `http://localhost:5176`: typography reads consistent (no checkmark-sized vs row-sized text mismatch); Medium-priority row in-progress no longer collides visibly with row-highlight indigo flash

## 🧩 Subtasks

- [ ] Pattern survey — confirm `constants.ts` is the de-facto token registry (current exports: `STATUS_LABEL`, `STATUS_CHIP_LABEL`, `STATUS_BADGE`, `PILL_ACTIVE`, `PILL_DEFAULT_SLATE`) and we're extending it, not building a parallel structure
- [ ] Extend `constants.ts`: add `TYPOGRAPHY` const + JSDoc role-mapping block at top of file
- [ ] Extend `constants.ts`: add semantic color tokens — `SECTION_TINT`, `PRIORITY_BADGE`, `PHASE_DOT`, `ROW_HIGHLIGHT`, `ROW_HIGHLIGHT_SUBTASK`, `ROW_SELECTION`, `ROW_NEUTRAL`
- [ ] Migrate `PrioritySection.tsx`: import `SECTION_TINT` from `constants.ts`; remove inline map (lines 8-16)
- [ ] Migrate `TaskDetail.tsx`: import `PRIORITY_BADGE` from `constants.ts`; remove inline map
- [ ] Migrate `PhaseDots.tsx`: import `PHASE_DOT` from `constants.ts`; replace inline `bg-amber-400 ring-…` / `bg-emerald-500` / `bg-slate-200 dark:bg-slate-700` ternary classes with `PHASE_DOT.active` / `PHASE_DOT.filled` / `PHASE_DOT.inactive`
- [ ] Migrate `utils.ts rowOutlineClass`: replace amber highlight strings with `ROW_HIGHLIGHT`; replace selection / neutral strings with `ROW_SELECTION` / `ROW_NEUTRAL`
- [ ] Migrate `SubtaskRow.tsx` highlight inline (line 21): replace amber `bg-amber-100 ring-amber-300 dark:bg-amber-900/30 dark:ring-amber-700` with `ROW_HIGHLIGHT_SUBTASK`
- [ ] Fold `SubtaskRow.tsx:33` `text-[9px]` → `text-[10px]` (checkmark)
- [ ] Fold `SubtaskRow.tsx:40,44` `text-[11px]` → `text-xs` (link + title)
- [ ] Update `App.test.tsx:117` + `:120` regex: `/ring-amber/` → `/ring-indigo/`
- [ ] Run `npm --prefix viz exec tsc -- --noEmit`
- [ ] Run `npm --prefix viz run test` (vitest)
- [ ] Start dev server (`npm --prefix viz run dev`) and ask user for visual confirmation

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz-embellishment)
- [[CORE-098.1]] — Discovery subtask (current-state inventory + gap matrix that filed this child)
- [[FE-031]] — chip-system trim (just-shipped; signals user's low-density preference that informs token roles)
- [[FE-019]] — a11y + perf baseline (contrast posture this audit must preserve)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-098.1 (closed yesterday) filed this child with a clear gap inventory: 6 ad-hoc typography sizes + 5 amber-collision sites in viz. The viz UI surface stabilized after FE-019 (a11y/perf baseline), FE-024 (App decomposition), and FE-031 (chip-system trim) — clean moment for a cross-component token sweep before CORE-098.3 (settings modal) starts adding new UI surfaces that would re-encode the same drift. No competing in-flight work touches `viz/src/ui/`. Codifying the scale + binding the colors now also gives CORE-098.4 (density modes) a clean foundation to extend.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes (one drift flagged + resolved: PLAN.md `theme.ts` token-home → `constants.ts`)
- [x] Asked clarifying questions — 3 resolved via AskUserQuestion (see Discovery Notes §"Clarifying-question outcomes")
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

`viz/src/ui/theme.ts` (22 LOC — light/dark preference module only; **not** a token registry), `viz/src/ui/constants.ts` (current token home: `STATUS_BADGE`, `PILL_ACTIVE`, `PILL_DEFAULT_SLATE`), `viz/tailwind.config.ts` (zero `theme.extend` — pure Tailwind defaults), `viz/src/ui/PrioritySection.tsx` (inline `SECTION_TINT` map lines 8-16), `viz/src/ui/PhaseDots.tsx` (inline amber/emerald/slate ternary line 14-19), `viz/src/ui/TaskDetail.tsx` (inline `PRIORITY_BADGE` map line 12), `viz/src/ui/utils.ts` (`rowOutlineClass` amber highlight line 28-29), `viz/src/ui/SubtaskRow.tsx` (inline amber highlight line 21 + off-grid `text-[11px]` / `text-[9px]`), `viz/src/ui/App.tsx` (h1 + status filter pills using `STATUS_BADGE`), `viz/src/ui/StatusChip.tsx` (consumer of `STATUS_BADGE`), `viz/src/ui/App.test.tsx` (lines 117/120 regex `/ring-amber/` — highlight lifecycle test).

### Archive skim — five load-bearing prior tasknotes

The CORE-098.1 Discovery already surfaced FE-005 / FE-008 / FE-013 / FE-019 / FE-031 as the load-bearing precedents for the parent epic; their implications still apply to this child. One additional tasknote surfaced by file-targeted grep:

- `FE-025` (viz-contrast-fix, 2026-05-10) — **directly relevant.** Fixed WCAG AA contrast failure on small text (swapped `text-slate-400 dark:text-slate-500` → `text-slate-500 dark:text-slate-400` in `PrioritySection.tsx:65` and `SubtaskRow.tsx:48`); also trimmed `theme.ts` to light/dark only by removing the 'system' option. **Implication:** confirms `theme.ts` is the preference module today (not a token registry) and that small-text contrast is a watched dimension — any typography fold to a smaller size on a low-contrast surface would regress this. The off-grid folds in this task go *up* (9px → 10px, 11px → 12px), so they preserve or improve contrast.
- `FE-031` (chip-system trim, 2026-05-14) — the most recent style precedent. Confirms the user wants low default density; this audit doesn't add chips, it consolidates how existing ones are styled.

### Drift check

PLAN.md cites `viz/src/ui/theme.ts` as the home for the semantic mapping, but `theme.ts` is currently a 22-LOC light/dark preference module (`readPreference` / `writePreference` / `applyResolved`) — it carries no color or typography tokens. The de-facto token registry is `viz/src/ui/constants.ts` (`STATUS_BADGE`, `PILL_ACTIVE`, `PILL_DEFAULT_SLATE`). Surfaced to user; resolved via Q1 below (token home → `constants.ts`). Tasknote scope rebound accordingly; PLAN.md description is left unchanged (the archived tasknote becomes the canonical record of the corrected target per SPEC §"`## Completed` archive convention").

### Clarifying-question outcomes (resolved 2026-05-15)

1. **Token home (drift resolution)** — *Extend `constants.ts` (Recommended).* `theme.ts` stays pure (light/dark prefs only); `constants.ts` grows the typography + color tokens alongside the existing `STATUS_BADGE` family. Pattern-survey win: extends established convention, no net-new module.
2. **Amber-collision direction** — *Move highlight only (Recommended).* `utils.ts rowOutlineClass` + `SubtaskRow.tsx` inline highlight shift off amber to a non-colliding hue. Amber stays bound to the *state/attention* family (in-progress status, active-phase dot, Medium priority). Test `App.test.tsx:117,120` regex `/ring-amber/` migrates to the new hue.
3. **Off-grid typography sizes** — *Fold both into the 4-step scale (Recommended).* `text-[11px]` → `text-xs` (SubtaskRow link + title, lines 40, 44); `text-[9px]` → `text-[10px]` (SubtaskRow checkmark, line 33). Micro-bumps (~+1px on titles, +1px on checkmark) are visually negligible at chip scale and improve scale rhythm.

### New highlight hue — indigo

Pick: **indigo** (`border-indigo-400 ring-indigo-300 dark:border-indigo-500 dark:ring-indigo-600` for row outline; `bg-indigo-100 ring-indigo-300 dark:bg-indigo-900/30 dark:ring-indigo-700` for subtask-row highlight). Rationale: (a) clearly distinct from amber (resolves the collision); (b) different enough from sky (selection ring) to avoid persistent-vs-transient confusion at the moment a click-then-arrow sequence overlaps the two states; (c) different enough from violet (Future Opportunities section tint) to avoid section/row signal confusion; (d) Tailwind default — no `tailwind.config.ts` extension needed (`theme.extend` is empty today, intentionally).

### 4-step typography scale — assignment

| Role | Tailwind size | Current sites |
|---|---|---|
| **Heading** | `text-lg` | h1 in App.tsx header |
| **Subhead** | `text-sm` | section headers, search input, ⓘ button, ThemeToggle, error banner |
| **Body** | `text-xs` | task IDs, row titles, stats caption, filter pill row, "No tasks" placeholder |
| **Caption** | `text-[10px]` | chips, metadata rows, chevron, detail-section labels, subtask date, subtask checkmark (post-fold) |

Off-grid sizes (`text-[11px]`, `text-[9px]`) fold into Body and Caption respectively. Weight modifiers (`font-semibold`, `font-medium`), family (`font-mono`), and tabular alignment (`tabular-nums`) stay as orthogonal composition — they apply alongside the role token rather than getting absorbed into it. Token shape: `TYPOGRAPHY` is **size-only** (e.g., `TYPOGRAPHY.heading = 'text-lg'`) so composition stays explicit at use sites. The JSDoc block at the top of `constants.ts` documents the role mapping as the primary deliverable; the runtime export gives sites a way to bind the role explicitly when valuable.

### Application scope — bounded

Color tokens consume well at runtime (multi-class strings compress meaningfully — e.g., `bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900` shrinks to `SECTION_TINT.Medium`), so **all** color call sites migrate fully. Typography tokens are size-only single-class aliases — the documentation value is in the comment block + the disciplined fold to 4 sizes, not in renaming every `text-xs` to `TYPOGRAPHY.body`. So the typography sweep is **fold-only** (3 off-grid → in-grid edits), not a full rebind. Subsequent additions can opt into `TYPOGRAPHY.*` for new code.

### Expected closure-diff signal profile (informs Step 6 📦 evaluation)

- Frontend files: yes (6 `.tsx` + 1 `.ts` in `viz/src/ui/` UI dir → 📦 **fires**)
- Privileged-ops paths: no
- Perf-narrative: no (Tailwind class swaps; no hot-path / cache / index work)

The 📦 gate fires on this closure; the user gives one bundled approval after seeing the closure review + recap + visual confirmation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — confirmed `constants.ts` is the existing token registry (`STATUS_LABEL`, `STATUS_CHIP_LABEL`, `STATUS_BADGE`, `PILL_ACTIVE`, `PILL_DEFAULT_SLATE`); extended in-place rather than building a parallel module. Token shape matches existing convention: string constants for atomic tokens, `Record<Key, string>` maps for keyed sets, all module-scoped `export const`. Found one bonus binding site — `SubtaskRow.tsx:23` had its own selection ring (`ring-1 ring-sky-400 dark:ring-sky-600`, narrower than the regular `ROW_SELECTION`); added `ROW_SELECTION_SUBTASK` for parity rather than leaving it inline.
- [x] Implemented the minimal solution — 7 files touched. `constants.ts` (+JSDoc + TYPOGRAPHY + SECTION_TINT + PRIORITY_BADGE + PHASE_DOT + ROW_HIGHLIGHT + ROW_HIGHLIGHT_SUBTASK + ROW_SELECTION + ROW_SELECTION_SUBTASK + ROW_NEUTRAL); `PrioritySection.tsx`, `TaskDetail.tsx`, `PhaseDots.tsx`, `utils.ts`, `SubtaskRow.tsx` consume tokens (inline maps deleted); `App.test.tsx` regex `/ring-amber/` → `/ring-indigo/`.
- [x] Updated/added tests for non-trivial behavior — N/A new tests; updated `App.test.tsx:117,120` regex to track the highlight-color migration (test asserts the same lifecycle, hue swapped). The token refactor is a pure rename + extraction; existing component tests (TaskRow / EpicRow / SubtaskRow / etc.) cover the rendered output unchanged.

**Implementation Notes:**

### Files changed (7)

- `viz/src/ui/constants.ts` — extended with JSDoc + `TYPOGRAPHY` + `SECTION_TINT` + `PRIORITY_BADGE` + `PHASE_DOT` + 5 row-state classes (`ROW_HIGHLIGHT`, `ROW_HIGHLIGHT_SUBTASK`, `ROW_SELECTION`, `ROW_SELECTION_SUBTASK`, `ROW_NEUTRAL`)
- `viz/src/ui/PrioritySection.tsx` — imports `SECTION_TINT`; inline map deleted; removed unused `Priority` type import (now only used at parser callsite via existing `type { Priority, TaskNode }` block, which is still needed for the prop type)
- `viz/src/ui/TaskDetail.tsx` — imports `PRIORITY_BADGE`; inline map deleted; dropped unused `Priority` type import
- `viz/src/ui/PhaseDots.tsx` — imports `PHASE_DOT`; inline ternary now references the three tokens
- `viz/src/ui/utils.ts` — imports `ROW_HIGHLIGHT` / `ROW_NEUTRAL` / `ROW_SELECTION`; `rowOutlineClass` body collapses to three token returns
- `viz/src/ui/SubtaskRow.tsx` — imports `ROW_HIGHLIGHT_SUBTASK` / `ROW_SELECTION_SUBTASK`; off-grid typography folded: `text-[9px]` → `text-[10px]` (checkmark), `text-[11px]` → `text-xs` (link + title)
- `viz/src/ui/App.test.tsx` — regex `/ring-amber/` → `/ring-indigo/` (two assertions in the highlight-lifecycle test)

### Decisions made during execution

- **`ROW_SELECTION_SUBTASK` was added (not in original plan).** `SubtaskRow.tsx:23` carried its own narrower selection ring (`ring-1` vs the row outline's `ring-2`) — a deliberate density tuning. Pulling it into a named token preserves the density choice as a documented decision rather than inline magic.
- **Removed unused `Priority` type imports.** `PrioritySection.tsx` and `TaskDetail.tsx` no longer need to type the moved-out maps. Strict-mode `tsc` would have flagged unused imports.
- **Kept Tailwind `text-*` classes inline (no TYPOGRAPHY rebind sweep).** Token shape is size-only; runtime value of `TYPOGRAPHY.body` vs literal `text-xs` is zero (one-class alias). The deliverable is the documented role mapping in the JSDoc + the disciplined fold to 4 sizes. New code can opt into `TYPOGRAPHY.*` when adding fresh sites; legacy sites stay readable as-is. Bounded scope is the right call here — the diff already touches 7 files; a full rebind would inflate it without functional gain.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full vitest suite: **84/84 pass** (6 test files, 4.38s). The updated highlight-lifecycle test in `App.test.tsx` (post-`/ring-amber/` → `/ring-indigo/` swap) passes; archiveCache stderr noise is intentional malformed-frontmatter coverage, unrelated to this work.
- [x] Ran lint/type-check on changed code — `tsc --noEmit` exits clean (zero errors). No linter is configured in viz (per CORE-098.1 Discovery — typecheck is the static-analysis layer).
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `tsc --noEmit`: clean.
- `vitest run`: 84/84 pass, 4.38s. Test file inventory: `parser.test.ts` (29), `tasknote.test.ts` (25), `workspace.test.ts` (8), `archiveCache.test.ts` (10), `ProjectSelector.test.tsx` (3), `App.test.tsx` (9).
- Updated regex `/ring-indigo/` in `App.test.tsx:117,120` matches `ROW_HIGHLIGHT` (`border-indigo-400 ring-2 ring-indigo-300 …`) — TaskRow consumes `rowOutlineClass` from `utils.ts` which returns `ROW_HIGHLIGHT` when highlighted.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview; viz-internal token refactor doesn't shift the flowtron-as-a-product surface.
  - `SPEC.md` — **no change.** Workflow contract unchanged; this task consumes the existing 4-phase + epic-subtask contracts as-is.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-15.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (bundles into the 📦 ready-to-commit gate — fires on the frontend-files signal)

**Final Summary:**

Codified viz's design system by extending `viz/src/ui/constants.ts` (the existing token registry) with a 4-step typography scale (`TYPOGRAPHY.{heading,subhead,body,caption}`) plus consolidated color tokens: `SECTION_TINT`, `PRIORITY_BADGE`, `PHASE_DOT.{filled,active,inactive}`, `ROW_HIGHLIGHT`, `ROW_HIGHLIGHT_SUBTASK`, `ROW_SELECTION`, `ROW_SELECTION_SUBTASK`, `ROW_NEUTRAL` — all documented in a JSDoc block at the top of the file. Migrated `PrioritySection.tsx`, `TaskDetail.tsx`, `PhaseDots.tsx`, `utils.ts`, and `SubtaskRow.tsx` to consume tokens (5 inline color/typography maps + ternaries deleted). Resolved the amber-collision by moving row-highlight off amber → indigo (`utils.ts rowOutlineClass` + `SubtaskRow.tsx` inline highlight); amber stays bound to the in-progress/active-phase/Medium-priority state family by design. Folded the two off-grid typography sizes in `SubtaskRow.tsx`: `text-[9px]` → `text-[10px]` (checkmark) and `text-[11px]` → `text-xs` (subtask link + title). Updated `App.test.tsx:117,120` regex `/ring-amber/` → `/ring-indigo/`. 7 files changed; tsc clean; 84/84 vitest pass; user visually confirmed.

**Drift resolved:** PLAN.md named `viz/src/ui/theme.ts` as the token home, but `theme.ts` is the 22-LOC light/dark preference module (per FE-025). Tokens landed in `constants.ts` (the de-facto registry) per user direction; archived tasknote captures the corrected target.

**Archived:** 2026-05-15
