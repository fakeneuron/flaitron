---
title: typography scale bump
status: completed
tags: [viz, ui, typography]
created: 2026-05-15
due:
related-tasks: [CORE-EPIC-098, CORE-098.2, CORE-098.4]
---

# CORE-098.12 | typography scale bump

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]] · [[CORE-098.2]] · [[CORE-098.4]]

## 🎯 Goal

Bump the 4-step typography scale (`heading` / `subhead` / `body` / `caption`) codified in `viz/src/ui/constants.ts` by CORE-098.2 so the viz site reads less small, as flagged during CORE-098.4 visual confirmation; per-step bump amounts decided in Discovery.

## ✅ Acceptance

- [ ] `TYPOGRAPHY` const in `viz/src/ui/constants.ts` reflects the bumped scale values
- [ ] All literal Tailwind size class occurrences of the old body value (`text-xs`) updated to the new body value across `viz/src/ui/`
- [ ] All literal `text-[10px]` occurrences (caption sites) updated to the new caption value across `viz/src/ui/`
- [ ] Subhead (`text-sm`) occurrences updated if subhead bump is approved in Discovery
- [ ] Heading (`text-lg`) updated in `App.tsx` if heading bump is approved in Discovery
- [ ] Density-token interactions preserved: `DENSITY_TOKENS` is padding-only and font-agnostic — no changes needed there; visual confirmation verifies the combined result
- [ ] `npm --prefix viz run typecheck` clean (zero errors)
- [ ] `npm --prefix viz test` passes (vitest suite)
- [ ] 👁️ User visually confirms at `http://localhost:5176`: text reads more comfortably at all four scale levels; density modes (Comfortable / Default / Compact) still look correct with the bumped type

## 🧩 Subtasks

- [ ] Ask clarifying question (per-step bump amounts) — resolved in Discovery
- [ ] Update `TYPOGRAPHY` const in `constants.ts` with approved bump values
- [ ] Sweep `text-xs` (body) → new body size across all literal occurrences in `viz/src/ui/`
- [ ] Sweep `text-[10px]` (caption) → new caption size across all literal occurrences in `viz/src/ui/`
- [ ] Sweep `text-sm` (subhead) if subhead bump approved — limited to role-appropriate sites only
- [ ] Update `App.tsx` heading if heading bump approved
- [ ] Run `npm --prefix viz run typecheck`
- [ ] Run `npm --prefix viz test`
- [ ] Start dev server and request 👁️ visual confirmation

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz-embellishment)
- [[CORE-098.2]] — typography & color audit (codified the 4-step scale this task bumps)
- [[CORE-098.4]] — density modes (user flagged "reads small" during visual confirmation, filed this child)
- [[CORE-098.11]] — audit subtask (will verify typography + density interactions post-bump)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed directly from CORE-098.4 user confirmation feedback ("site fonts read small generally"). CORE-098.2 established the 4-step scale in `constants.ts`; CORE-098.4 locked density-token interactions (padding-only — no font coupling). Typography bump is additive on top of both closed tasks; no in-flight work touches `viz/src/ui/`. Clean moment to resolve the readability concern before the epic's audit subtask (`.11`) closes out.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

`viz/src/ui/constants.ts` (TYPOGRAPHY + DENSITY_TOKENS), `viz/src/ui/App.tsx`, `viz/src/ui/TaskRowInner.tsx`, `viz/src/ui/SubtaskRow.tsx`, `viz/src/ui/PrioritySection.tsx`, `viz/src/ui/TaskDetail.tsx`, `viz/src/ui/ModelChip.tsx`, `viz/src/ui/RelatedChip.tsx`, `viz/src/ui/StatusChip.tsx`, `viz/src/ui/EpicRow.tsx`, `viz/src/ui/SubtaskProgress.tsx`, `viz/src/ui/DetailSection.tsx`, `viz/src/ui/Chevron.tsx`, `viz/src/ui/SettingsModal.tsx`, `viz/src/ui/ThemeToggle.tsx`.

### Archive skim

- **CORE-098.2 (typography & color audit, 2026-05-15)** — established the scale and the "fold-only" decision: `TYPOGRAPHY` tokens are documented in the JSDoc but literals (`text-xs`, `text-sm`, etc.) were left in-place at call sites; the off-grid `text-[11px]`/`text-[9px]` outliers were folded to in-scale values. This task is the next stage: bump the scale values and sweep the literal occurrences to the new sizes.
- **CORE-098.4 (density modes, 2026-05-15)** — directly sourced this task. Key constraint: `DENSITY_TOKENS` is padding-only (`chipPad`, `rowPad`, etc.); chip *text size* is explicitly left on `TYPOGRAPHY.caption` (`text-[10px]`). A typography bump affects chip text — visual confirmation must verify chip appearance at all density modes.
- **FE-019 (a11y + perf baseline, 2026-05-10)** — Lighthouse 84/94/96/82. Contrast is the relevant dimension: all bumps go *up* in size, which preserves or improves small-text contrast (WCAG AA failure risk is at smaller sizes).
- **FE-025 (viz-contrast-fix, 2026-05-10)** — fixed WCAG AA failure on small text (`text-slate-400 dark:text-slate-500` → flipped for contrast). Bumping from 10px to 12px (caption) reduces risk of future AA failures at caption-tier.

### Drift check

PLAN.md line accurately describes the current state. Current `TYPOGRAPHY` in `constants.ts`:
- `heading`: `text-lg` (18px) — 1 site: `App.tsx:308` h1
- `subhead`: `text-sm` (14px) — 7 sites: search input, ⓘ button, ThemeToggle, error banner, `PrioritySection.tsx:52` section header, `SettingsModal.tsx:79` modal h2, `ThemeToggle.tsx:31`
- `body`: `text-xs` (12px) — 14 sites: task ID + title in `TaskRowInner.tsx`, subtask ID + title in `SubtaskRow.tsx`, stats in `App.tsx:311`, filter-pill row `App.tsx:348`, count + "No tasks" in `PrioritySection.tsx`, `TaskDetail.tsx:22` detail panel, `SettingsModal.tsx` labels + buttons
- `caption`: `text-[10px]` (10px) — 15 sites: Tags chip in `TaskRowInner.tsx`, date spans, `ModelChip.tsx`, `Chevron.tsx`, `EpicRow.tsx` done/total badge, `DetailSection.tsx` label, `SettingsModal.tsx` fieldset legends, subtask checkmark + date in `SubtaskRow.tsx`, `SubtaskProgress.tsx`, `RelatedChip.tsx`

`StatusChip.tsx` has no text-size class — inherits from parent container.

The CORE-098.2 "fold-only" decision was deliberate and documented: "runtime value of `TYPOGRAPHY.body` vs literal `text-xs` is zero (one-class alias)." The bump requires sweeping literals *and* updating the const.

No drift. All cited sites confirmed present in current code.

### Clarifying-question outcome (resolved 2026-05-15)

**Q1: Which steps to bump?** → *Body + Caption + Subhead.* Heading stays at `text-lg` (18px). Approved bump:
- `subhead`: `text-sm` → `text-base` (14→16px) — section headers, search input, modal title, ThemeToggle, error banner (~7 sites)
- `body`: `text-xs` → `text-sm` (12→14px) — task IDs, titles, stats, labels, modal controls (~14 sites)
- `caption`: `text-[10px]` → `text-xs` (10→12px) — chips, metadata, chevron, fieldset legends (~15 sites)

### Per-step bump decisions

The per-step amounts are the only open question. Scope below by option (approximate):

**Body + Caption only (minimal):**
- `body`: `text-xs` → `text-sm` (12→14px); ~14 literal sites
- `caption`: `text-[10px]` → `text-xs` (10→12px); ~15 literal sites

**Body + Caption + Subhead (moderate):**
- adds ~7 subhead (`text-sm` → `text-base`, 14→16px) sites
- heading stays at `text-lg`

**All four steps (uniform):**
- adds heading: `text-lg` → `text-xl` (18→20px); 1 site
- Note: `text-sm` is also used in `App.tsx` for search input/buttons — those are subhead-role and would bump with the subhead step; the `text-sm` in `SettingsModal.tsx:79` (h2) would also bump

### Density-token interaction

`DENSITY_TOKENS` is padding-only (verified). Bumping typography affects visual cell height (body text growing from 12→14px adds ~2px to each row's line-height), but this is additive on top of density — Compact mode will still look tighter than Default, Comfortable looser. The CORE-098.4 decision to keep chip text on `TYPOGRAPHY.caption` means caption bump directly affects chip readability. Visual confirmation at all three density modes clears this.

### Expected closure-diff signal profile

- Frontend files: yes (`viz/src/ui/` multiple `.tsx` / `.ts`) → 📦 **fires**
- Privileged-ops paths: no
- Perf-narrative: no (class string swaps; zero hot-path work)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — confirmed CORE-098.2's "fold-only" precedent: sweep literal class occurrences to new values + update TYPOGRAPHY const. No TYPOGRAPHY.* rebind at call sites (consistent with the CORE-098.2 decision that the runtime alias value is zero for single-class tokens). The approach is identical to what CORE-098.2 established for off-grid folds.
- [x] Implemented the minimal solution — 14 files touched. See Implementation Notes.
- [x] Updated/added tests for non-trivial behavior — N/A; no tests reference text-size class strings (confirmed by grep). The sweep is a pure class-string replacement; existing component tests (App / TaskRow / EpicRow / SubtaskRow etc.) cover rendered behavior unchanged.

**Implementation Notes:**

### Files changed (14)

- `viz/src/ui/constants.ts` — `TYPOGRAPHY.subhead` `'text-sm'→'text-base'`; `TYPOGRAPHY.body` `'text-xs'→'text-sm'`; `TYPOGRAPHY.caption` `'text-[10px]'→'text-xs'`; JSDoc role-table + scale-bump note updated
- `viz/src/ui/App.tsx` — subhead: search input, ⓘ button, gear button, error banner (`text-sm→text-base`); body: stats paragraph, filter-pill container (`text-xs→text-sm`)
- `viz/src/ui/TaskRowInner.tsx` — body: task ID, row title (`text-xs→text-sm`); caption: Tags chip, Due span, StatusChip container (`text-[10px]→text-xs`)
- `viz/src/ui/SubtaskRow.tsx` — caption: checkmark, completed date (`text-[10px]→text-xs`); body: subtask ID, subtask title (`text-xs→text-sm`)
- `viz/src/ui/PrioritySection.tsx` — subhead: section header label (`text-sm→text-base`); body: task count, "No tasks" (`text-xs→text-sm`)
- `viz/src/ui/TaskDetail.tsx` — body: detail panel container (`text-xs→text-sm`); caption: metadata header row (`text-[10px]→text-xs`)
- `viz/src/ui/EpicRow.tsx` — caption: done/total badge (`text-[10px]→text-xs`)
- `viz/src/ui/SubtaskProgress.tsx` — caption: progress count (`text-[10px]→text-xs`)
- `viz/src/ui/DetailSection.tsx` — caption: section label uppercase (`text-[10px]→text-xs`)
- `viz/src/ui/SettingsModal.tsx` — subhead: modal h2 (`text-sm→text-base`); caption: three fieldset legends (`text-[10px]→text-xs`); body: checkbox/radio labels, Reset + Done buttons (`text-xs→text-sm`)
- `viz/src/ui/ModelChip.tsx` — caption: chip text (`text-[10px]→text-xs`)
- `viz/src/ui/RelatedChip.tsx` — caption: chip text (`text-[10px]→text-xs`)
- `viz/src/ui/Chevron.tsx` — caption: chevron glyph (`text-[10px]→text-xs`)
- `viz/src/ui/ThemeToggle.tsx` — subhead: toggle button (`text-sm→text-base`)

### Decisions made during execution

- **TYPOGRAPHY const updated as the canonical record.** Literal sweeps make the rendered output match the documented scale; the token is the source of truth for new code.
- **StatusChip has no text-size class.** Inherits from parent containers (`TaskRowInner` rightmost column → now `text-xs`; `TaskDetail` metadata row → now `text-xs`). Behavior unchanged — the inheritance is intentional.
- **`DetailSection.tsx` uppercase label stays at caption tier.** The uppercase+tracking-wide label role is visually distinct from body; bumping it with caption (10px→12px) keeps the role distinction while improving readability.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **103/103 pass** (7 test files, 8.08s). All prior tests pass unchanged; no test references text-size class strings.
- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) clean (zero errors). No linter configured in viz (typecheck is the static-analysis layer).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — user confirmed ("go")

**Testing Notes:**

- `tsc --noEmit`: clean.
- `vitest run`: 103/103 pass (same suite as CORE-098.4 baseline). No text-size-class assertions in test files — no test changes needed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview; viz-internal typography bump doesn't shift the flowtron-as-a-product surface.
  - `SPEC.md` — **no change.** Workflow contract unchanged; consumed the existing 4-phase + epic-subtask contracts as-is.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-16.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (bundles into the 📦 ready-to-commit gate — fires on the frontend-files signal)

**Final Summary:**

Bumped three tiers of the viz typography scale (subhead / body / caption) one Tailwind step each, resolving the "reads slightly small" feel flagged during CORE-098.4 visual confirmation. Updated the `TYPOGRAPHY` const in `constants.ts` and swept all 36 literal class occurrences across 14 component files: body `text-xs→text-sm` (12→14px), subhead `text-sm→text-base` (14→16px), caption `text-[10px]→text-xs` (10→12px); heading stays at `text-lg`. Density-token interactions preserved — `DENSITY_TOKENS` is padding-only and font-agnostic; 103/103 tests pass; typecheck clean; user visually confirmed.

**Archived:** 2026-05-16
