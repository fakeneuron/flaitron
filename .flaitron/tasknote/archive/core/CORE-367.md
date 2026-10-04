---
title: export-surface-sweep-2
status: completed
tags: []
created: 2026-07-26
due:
related-tasks: [FE-069]
---

# CORE-367 | export-surface-sweep-2

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-069]]

## 🎯 Goal

Finish the FE-069 de-export class: drop `export` on 3 viz types (TasknoteFrontmatter, StarterSubsections, TaskRowInnerProps), 2 test-fixture exports (seedFetch, ProjectFetchOverride), and the 10 unimported `tools/update-adopters.mjs` exports.

## ✅ Acceptance

- [ ] `export` dropped from the 3 viz types (`TasknoteFrontmatter`, `StarterSubsections`, `TaskRowInnerProps`); confirmed zero cross-file imports before editing
- [ ] `export` dropped from the 2 test-fixture exports (`seedFetch`, `ProjectFetchOverride`); confirmed zero cross-file imports before editing
- [ ] `export` dropped from every unimported `tools/update-adopters.mjs` export verified by grep (see Drift check — 11 confirmed, not the 10 cited); internal in-file usages preserved
- [ ] `tsc --noEmit` (viz) and `node --test tools/update-adopters.test.mjs` both pass clean after the edits

## 🧩 Subtasks

- [x] Drop `export` on `TasknoteFrontmatter` and `StarterSubsections` in `viz/src/tasknote.ts`
- [x] Drop `export` on `TaskRowInnerProps` in `viz/src/ui/TaskRowInner.tsx`
- [x] Drop `export` on `seedFetch` and `ProjectFetchOverride` in `viz/src/test/fixtures.ts`
- [x] Drop `export` on the 11 unimported `tools/update-adopters.mjs` exports: `expandHome`, `workspaceRoot`, `isFile`, `isDir`, `wiredSkillKeys`, `addedFilesForSurface`, `newSkillWiringSurfaces`, `reportResult`, `reportSummary`, `main`, and `WIRING_SURFACES` (drop from the trailing `export { ... }` block, keep `FLOWTRON_REPO`/`SUBMODULE_PATH` exported — both are imported by the test file)
- [ ] Run viz `tsc --noEmit` + `node --test tools/update-adopters.test.mjs` to confirm no regressions

## 🔗 Related

- [[FE-069]] — predecessor (dropped export on 5 internal-only viz types; this task finishes the class)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Mechanical de-export continuing the FE-069 class, exactly as scoped by the three audit findings; no design tradeoffs.

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A. Pure visibility narrowing (dropping `export`), no responsibility or dependency-direction change, no refactor needed.

- [x] **Archive skim** — `archive/core/` and `archive/frontend/` both have many hits for these shared files (`tasknote.ts`, `TaskRowInner.tsx`, `fixtures.ts`, `update-adopters.mjs`), but none concern the visibility of these specific exports. One load-bearing find: CORE-364 (`updater-main-decompose`, completed 2026-07-25) extracted `reportResult`/`reportSummary` out of `main()` as exported presentation helpers — explains why they're exported today and confirms they're legitimately in scope for this de-export pass (the CORE-367 audit ran 2026-07-26, right after).

- [x] **Drift check** — Verified all 5 viz/test-fixture names by grep: none are imported outside their defining file. For `tools/update-adopters.mjs`, grepped every `^export` and cross-checked against `tools/update-adopters.test.mjs`'s import list — found **11** unimported exports, not the 10 cited by the task line: `expandHome`, `workspaceRoot`, `isFile`, `isDir`, `wiredSkillKeys`, `addedFilesForSurface`, `newSkillWiringSurfaces`, `reportResult`, `reportSummary`, `main`, and `WIRING_SURFACES`. Minor count drift (audit likely undercounted by one) — proceeding with the grep-verified list of 11 as ground truth, consistent with FE-069's verify-before-drop methodology.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: the 11-vs-10 discrepancy is a minor audit miscount, not a scope signal; treating the grep-verified list as authoritative is a same-class mechanical extension of the cited finding, not a scope change.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** See Drift check above for the full unimported-export list and the CORE-364 cross-reference. No re-interpretation of the task was needed beyond the count correction.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced no significant deviation (count correction only, same mechanical class) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A. Mirrors FE-069's exact pattern: drop `export` keyword only, no shape change.

- [x] **Minimal refactor gate** — N/A. No refactor; pure visibility narrowing on 16 declarations across 4 files.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A. Visibility-only change, no new behavior; existing tests are the regression check (Phase 3).

**Implementation Notes:** Dropped `export` on 16 declarations across 4 files:
- `viz/src/tasknote.ts` — `TasknoteFrontmatter`, `StarterSubsections`
- `viz/src/ui/TaskRowInner.tsx` — `TaskRowInnerProps`
- `viz/src/test/fixtures.ts` — `ProjectFetchOverride`, `seedFetch`
- `tools/update-adopters.mjs` — `expandHome`, `workspaceRoot`, `isFile`, `isDir`, `wiredSkillKeys`, `addedFilesForSurface`, `newSkillWiringSurfaces`, `reportResult`, `reportSummary`, `main`, and `WIRING_SURFACES` (dropped from the trailing `export { ... }` block; `FLOWTRON_REPO`/`SUBMODULE_PATH` stayed exported)

All internal in-file call sites unaffected (visibility-only; no signature or behavior change).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — Confirmed: no duplication, dead code, or complexity introduced. Public surface *shrank* (16 fewer module-level exports), which is exactly the intent. No code-facing docs referenced the dropped export keywords.

- [x] (frontend) N/A — pure visibility-only change (dropped `export` keyword), zero rendered/behavioral difference; nothing to visually confirm.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:** `npm --prefix viz run typecheck` clean · `npm --prefix viz run lint` clean · `node --test tools/update-adopters.test.mjs` 24/24 pass · `vitest run src/tasknote.test.ts src/ui/App.test.tsx` 64/64 pass (targeted files covering `tasknote.ts` types and `TaskRowInner` rendering via `App.test.tsx`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — All 12 entries: no change. Pure internal-visibility cleanup on viz/tools source; none of the AI-referenced docs cite these export names or the update-adopters.mjs / tasknote.ts / fixtures.ts / TaskRowInner.tsx public surface.

- [x] Closed — PLAN.md line flipped to stub form, moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:** Dropped `export` on 16 unimported/internal-only declarations across 4 files — 3 viz types (`TasknoteFrontmatter`, `StarterSubsections` in `viz/src/tasknote.ts`; `TaskRowInnerProps` in `viz/src/ui/TaskRowInner.tsx`), 2 test-fixture exports (`ProjectFetchOverride`, `seedFetch` in `viz/src/test/fixtures.ts`), and 11 `tools/update-adopters.mjs` exports (`expandHome`, `workspaceRoot`, `isFile`, `isDir`, `wiredSkillKeys`, `addedFilesForSurface`, `newSkillWiringSurfaces`, `reportResult`, `reportSummary`, `main`, `WIRING_SURFACES`) — one more than the task's cited count of 10; grep-verified against `tools/update-adopters.test.mjs`'s import list before editing, logged as a drift correction rather than a scope change. All changes are visibility-only (dropped keyword, zero signature/behavior change); no refactor needed. Verification: `tsc --noEmit` clean, `eslint src` clean, `node --test tools/update-adopters.test.mjs` 24/24 pass, targeted `vitest run` (tasknote.test.ts + App.test.tsx) 64/64 pass. Doc-drift: no change across all 12 AI-referenced docs. Maintainability effect: narrows the public surface of two source files and a CLI tool script by 16 symbols, reducing the class of things future changes must treat as a stable contract.

**Archived:** 2026-07-26
