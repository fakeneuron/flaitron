---
title: subtask-list wrapper density
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.11, CORE-098.4]
---

# CORE-098.13 | subtask-list wrapper density

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]] · [[CORE-098.11]] · [[CORE-098.4]]

## 🎯 Goal

Wire the hardcoded subtask-list wrapper padding in `EpicRow.tsx` into the
density system so subtask containers respond to Comfortable / Default /
Compact like every other density-aware element.

## ✅ Acceptance

- [x] `subtaskContainerPad` token added to `DENSITY_TOKENS` with the three
      values from the audit (Comfortable `px-2.5 py-2`, Default `px-2 py-1.5`,
      Compact `px-1.5 py-1`)
- [x] `EpicRow.tsx` subtask-list container consumes `subtaskContainerPad`
      instead of the hardcoded `px-2 py-1.5`
- [x] All three density modes render correctly in the browser

## 🧩 Subtasks

- [x] Locate `DENSITY_TOKENS` definition and add `subtaskContainerPad`
- [x] Update `EpicRow.tsx:90` to consume the new token
- [x] Lint / type-check the touched files
- [x] Visual confirmation across all three density modes

## 🔗 Related

- [[CORE-EPIC-098]] — parent viz-embellishment epic
- [[CORE-098.11]] — audit that filed this task
- [[CORE-098.4]] — original density-modes implementation that introduced `DENSITY_TOKENS`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Mechanical density-token extension. The audit (`CORE-098.11` Finding #1) named the location, severity (minor — small Compact-mode inconsistency where wrapper feels looser than rows it contains), and exact fix (`subtaskContainerPad` token with three concrete values). `EpicRow.tsx` already destructures `tokens = DENSITY_TOKENS[density]` at line 44, so the consume-side is a single substitution at line 90. Sits well within `CORE-098.4`'s explicit scope contract ("density is a row-surface concern, not a header/detail-panel concern") — the subtask-list wrapper is a row-surface container.

- [x] Read relevant source files — `viz/src/ui/constants.ts` (the `DENSITY_TOKENS` registry at line 119, `DensityTokens` interface at line 109) and `viz/src/ui/EpicRow.tsx` (the consume site at line 90, the existing `tokens` destructure at line 44).
- [x] **Archive skim** — two load-bearing precedents in `_project/tasknote/archive/core/`:
  - `CORE-098.11.md` (audit) — Finding #1 filed this task with the exact spec (`subtaskContainerPad`, three values, `EpicRow.tsx:90`). The recap explicitly identifies it as one of two actionable follow-ups (`.13` + `.14`).
  - `CORE-098.4.md` (original density-modes implementation) — established the `DENSITY_TOKENS: Record<DensityMode, DensityTokens>` shape, the `tokens.<key>` consume pattern (used throughout EpicRow.tsx and SubtaskRow.tsx), and the scope contract that subtask-row surfaces ARE density-aware (existing `subtaskRowPad` + `subtaskInterRowGap` tokens). Adding `subtaskContainerPad` is a strict extension, not a new shape.
- [x] **Drift check:**
  - PLAN.md cites `EpicRow.tsx:90` — confirmed: line 90 IS the hardcoded `px-2 py-1.5` site (full classname: `` `flex flex-col ${tokens.subtaskInterRowGap} border-t border-slate-100 bg-slate-50/50 px-2 py-1.5 dark:border-slate-800 dark:bg-slate-950/50` ``).
  - Path-prefix nit: PLAN.md omits the `viz/src/ui/` prefix on `EpicRow.tsx:90`. Non-blocking — only one `EpicRow.tsx` exists in the repo. Not worth a separate drift task.
  - `DENSITY_TOKENS` lives at `viz/src/ui/constants.ts:119`; `DensityTokens` interface at line 109 — both need the new field added consistently. Pattern (interface + 3 mode entries) confirmed.
  - Token values (Comfortable `px-2.5 py-2`, Default `px-2 py-1.5`, Compact `px-1.5 py-1`) preserve current behavior at Default (round-trip safe) and follow the existing scaling cadence (`rowPad` and `subtaskRowPad` both step up/down by ~one tailwind notch per mode).
- [x] No clarifications needed. Assumptions:
  - Naming: `subtaskContainerPad` (per audit spec) — consistent with the existing `subtaskRowPad` / `subtaskInterRowGap` naming family for subtask-related tokens.
  - Field ordering in `DensityTokens` interface and each `DENSITY_TOKENS` mode entry: place `subtaskContainerPad` immediately after `subtaskRowPad` to keep the subtask-related tokens grouped (current order is `rowPad`, `subtaskRowPad`, `sectionInteriorPad`, `interRowGap`, `subtaskInterRowGap`, `betweenSectionsGap`, `chipPad`).
  - No test changes required: `CORE-098.4`'s density-mode tests assert `rowPad` substrings on top-level rows; the subtask-list wrapper isn't exercised by those tests. The change is a pure visual nudge in Compact mode; covered by visual confirmation in Phase 3.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Audit-filed task, scope is pinned.** `CORE-098.11` filed this with exact token name, exact values, and exact consume site. No invention required — execution follows the audit spec verbatim.
- **Pattern is mature.** Adding a token to `DENSITY_TOKENS` is the 8th time this pattern has been exercised (existing 7 tokens). The diff is: 1 interface field, 3 mode entries, 1 consume-site substitution. ~5-line change across 2 files.
- **No visible regressions expected at Default.** Default value (`px-2 py-1.5`) matches today's hardcoded value exactly. Comfortable and Compact get the intended visual lift.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending the existing `DENSITY_TOKENS` table (8th token in a mature pattern; 7 prior fields use the same shape). `EpicRow.tsx` already destructures `const tokens = DENSITY_TOKENS[density]` at line 44 — consume site uses the same `${tokens.<key>}` template-literal pattern as the neighboring `${tokens.subtaskInterRowGap}` on the same JSX element. No new shape introduced.
- [x] Implemented the minimal solution — 5-line diff total:
  - `viz/src/ui/constants.ts`: 1 line added to `DensityTokens` interface; 3 lines added to `DENSITY_TOKENS` (one per mode), all placed immediately after `subtaskRowPad` to keep subtask-related tokens grouped.
  - `viz/src/ui/EpicRow.tsx:90`: replaced hardcoded `px-2 py-1.5` with `${tokens.subtaskContainerPad}`; Default mode value matches the previous hardcoded value verbatim (round-trip safe).
- [x] Updated/added tests for non-trivial behavior — no test changes. `CORE-098.4`'s density-mode tests (`App.test.tsx`) assert `rowPad` substrings on top-level row containers; the subtask-list wrapper isn't exercised. The change is a small visual nudge in Compact/Comfortable; covered by visual confirmation in Phase 3 per `.4`'s precedent.

**Implementation Notes:**

- Default value matches today exactly (`px-2 py-1.5`) — zero visual change in Default mode.
- Comfortable bumps padding by ~1 tailwind notch (`px-2.5 py-2`); Compact tightens by ~1 notch (`px-1.5 py-1`). Both mirror the cadence of the neighboring `rowPad` and `subtaskRowPad` tokens.
- Token name `subtaskContainerPad` chosen per `.11` audit spec; sits in the subtask-naming family alongside `subtaskRowPad` and `subtaskInterRowGap`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **112/112 pass** (7 test files, 6.27s). No new tests needed (rationale in Phase 2).
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit` in `viz/` clean (no output, no errors). No separate linter configured per FE-019 precedent.
- [x] (frontend) Asked the user for visual confirmation 👁️ — user confirmed "good" across all three density modes (Comfortable / Default / Compact) on the expanded CORE-EPIC-098 subtask list.

**Testing Notes:**

- Default mode value (`px-2 py-1.5`) matches the previous hardcoded value — verified visually as unchanged in Default.
- Comfortable and Compact wrapper padding now scales with the rest of the row surfaces, closing the audit's Finding #1 visual inconsistency.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — four AI-referenced docs walked; all four show "no change" for this task (none reference viz internals / density tokens / `EpicRow`):
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/CLAUDE-snippet.md` — no change
- [x] Closed — PLAN.md `.13` flipped to stub form `Completed 2026-05-16.` and tasknote moved to `_project/tasknote/archive/core/CORE-098.13.md`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate below).

**Final Summary:**

Closed `CORE-098.11` audit's Finding #1: the subtask-list wrapper inside an expanded epic row is now density-aware. Added `subtaskContainerPad` as the 8th field in `DENSITY_TOKENS` (`viz/src/ui/constants.ts:109,119` — interface + three mode entries: Comfortable `px-2.5 py-2`, Default `px-2 py-1.5`, Compact `px-1.5 py-1`) and consumed it at `viz/src/ui/EpicRow.tsx:90` in place of the hardcoded `px-2 py-1.5`. 5-line code diff across 2 files. Default value preserves today's behavior exactly; Comfortable/Compact now scale alongside the rows they contain, eliminating the slight Compact-mode looseness the audit flagged. Tests `112/112` pass; `tsc --noEmit` clean; user visually confirmed across all three density modes. Doc-drift sweep: all four AI-referenced docs "no change".

**Archived:** 2026-05-16
