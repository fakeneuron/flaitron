---
title: error-boundary-test-noise
status: completed
tags: []
created: 2026-07-08
due:
related-tasks:
  - TEST-EPIC-001
---

# TEST-001.2 | error-boundary-test-noise

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[TEST-EPIC-001]]

## 🎯 Goal

Suppress expected ErrorBoundary render-noise in viz tests while preserving the assertions that verify fallback rendering.

## ✅ Acceptance

- [x] `src/ui/ErrorBoundary.test.tsx` no longer emits jsdom uncaught-error stack spam for the intentional throwing cases
- [x] ErrorBoundary assertions still verify the default and custom fallback behavior

## 🧩 Subtasks

- [x] Reproduce the noisy ErrorBoundary test output and identify the emitting path
- [x] Patch the test to suppress only the expected jsdom error event
- [x] Re-run the targeted viz test and confirm the stack spam is gone

## 🔗 Related

- [[TEST-EPIC-001]] — parent cleanup epic for viz gate output signal

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task is still narrowly scoped to expected ErrorBoundary test noise, and the current targeted run reproduces that exact problem.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- No prior `archive/TEST/` tasknotes exist yet, so there is no earlier TEST-area history to inherit.
- The existing `console.error` spy in `src/ui/ErrorBoundary.test.tsx` suppresses React’s caught-error logging, but jsdom still emits repeated `Error: Uncaught [Error: render exploded]` traces from the intentional throwing render path.
- No clarifications needed. Assumption: this subtask should suppress only the expected test noise from the boundary test file, not broader Node 26 warnings covered by sibling task `TEST-001.3`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Kept the suppression local to `src/ui/ErrorBoundary.test.tsx` instead of changing shared jsdom/Vitest setup, because only this file intentionally renders a throwing component and the emitted error text is part of the test fixture.
- Added a small render helper that installs a temporary `window` `error` listener, calls `preventDefault()` only for the expected `render exploded` error, then removes the listener immediately after render.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz test -- --run src/ui/ErrorBoundary.test.tsx` passed. The repeated jsdom `Uncaught [Error: render exploded]` stack traces no longer appear.
- The targeted test still prints Node 26's `ExperimentalWarning: localStorage is not available because --localstorage-file was not provided.` That warning is outside this subtask's scope and remains for `TEST-001.3`.
- `npm --prefix viz run typecheck` passed.
- `npm --prefix viz run lint` passed.
- `👁️` Not applicable: this task only changes test-only error suppression and does not alter rendered UI behavior.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- Suppressed the expected jsdom uncaught-error event in `ErrorBoundary.test.tsx` for the intentional throwing render cases, leaving the fallback assertions intact.
- Verified the targeted test output is now clean aside from the separate Node 26 `localStorage` warning tracked by `TEST-001.3`; typecheck and lint both still pass.

**Archived:** 2026-07-08
