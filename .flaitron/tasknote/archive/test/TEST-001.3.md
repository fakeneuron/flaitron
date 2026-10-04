---
title: localstorage-warning-noise
status: completed
tags: []
created: 2026-07-08
due:
related-tasks:
  - TEST-EPIC-001
---

# TEST-001.3 | localstorage-warning-noise

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[TEST-EPIC-001]]

## 🎯 Goal

Remove the known Node 26 localStorage experimental warning from passing viz Vitest output.

## ✅ Acceptance

- [x] Viz test setup explicitly suppresses only the known Node 26 localStorage experimental warning
- [x] Targeted viz tests that exercise localStorage pass without printing the warning
- [x] Viz typecheck and lint pass

## 🧩 Subtasks

- [x] Confirm the current warning source and existing Node 26 storage workaround
- [x] Patch shared Vitest setup with a narrow warning filter
- [x] Run targeted tests plus typecheck and lint

## 🔗 Related

- [[TEST-EPIC-001]] — parent cleanup epic for viz gate output signal
- [[TEST-001.2]] — sibling cleanup for expected ErrorBoundary test noise

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task remains a narrow test-output cleanup for the Node 26 `localStorage` experimental warning called out by sibling `TEST-001.2`.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `TEST-001.2` verified the ErrorBoundary noise is now suppressed and explicitly left the Node 26 `ExperimentalWarning: localStorage is not available because --localstorage-file was not provided.` warning for this subtask.
- `FE-052` is load-bearing history: Node 26 exposes experimental Storage globals, which interfered with jsdom population; `viz/src/test/setup.ts` already owns the shared storage workaround.
- Drift check: the PLAN row's named scope still matches current code. `viz/src/test/setup.ts` contains the Node 26 localStorage/sessionStorage polyfill, and `viz/vite.config.ts` still loads that setup file for all Vitest runs.
- No clarifications needed. Assumption: this task should keep the existing storage polyfill behavior and only suppress the known warning text, not hide other process warnings.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the existing shared `viz/src/test/setup.ts` storage shim from `FE-052`; no new test harness shape needed.
- Initial attempt to filter `process.emitWarning` from `vite.config.ts` was both too late and broader than necessary. `--trace-warnings` showed the warning came from `setup.ts` reading `window.localStorage` in the `typeof` guard.
- Replaced the conditional read with unconditional `Object.defineProperty` calls for `localStorage` and `sessionStorage`, so tests install explicit in-memory storage without touching Node 26's experimental getter.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz test -- --run src/viewMode.test.ts` passed: 5 tests, no Node 26 localStorage warning printed.
- `npm --prefix viz test -- --run src/visibilityPrefs.test.ts src/projectStorage.test.ts` passed: 17 tests in `visibilityPrefs.test.ts`, no Node 26 localStorage warning printed. `projectStorage.test.ts` is not present, so Vitest ran the matching existing file.
- `npm --prefix viz run typecheck` passed.
- `npm --prefix viz run lint` passed.
- `npm --prefix viz test` passed: 16 files, 229 tests, no Node 26 localStorage warning printed.
- `👁️` Not applicable: this task only changes test setup and does not alter rendered UI behavior.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- Stopped the viz test setup from reading Node 26's experimental `localStorage` getter while installing the existing in-memory storage shim.
- Verified targeted storage tests, full viz tests, typecheck, and lint all pass with the localStorage warning gone.

**Doc-drift sweep:** `README.md` no change; `SPEC.md` no change; `docs/MIGRATION.md` no change; `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` no change; `CONTRIBUTING.md` no change; `SECURITY.md` no change; `docs/AGENT-NEUTRALITY.md` no change; `docs/PLATFORMS.md` no change; `claude/CAPABILITIES.md` no change; `docs/AGENT-COMPAT.md` no change.

**Archived:** 2026-07-08
