---
title: tests pinning both behaviors
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-431, CORE-431.2, CORE-431.3, CORE-431.N]
---

# CORE-431.4 | tests pinning both behaviors

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-431]] · [[CORE-431.2]] · [[CORE-431.3]]

## 🎯 Goal

Pin CORE-431.2 (split watch set + unlink cache bust) and CORE-431.3 (attributed SSE debounce/broadcast) with integration tests that exercise the vite wiring without booting Vite.

## ✅ Acceptance

- [x] Watch hot vs archive chokidar options are pinned (polled hot set, native archive set)
- [x] `onWatchEvent` pins archive invalidation, unlink→`invalidateProject`, and attributed `scheduleBroadcast`
- [x] Debounced broadcaster pins multi-project flush and unattributed fail-open `{}`
- [x] `vite.config.ts` thin-wires the extracted module; tests run without booting Vite

## 🧩 Subtasks

- [x] Extract watch/broadcast wiring from `vite.config.ts` into `viz/src/flowtronWatch.ts`
- [x] Add `viz/src/flowtronWatch.test.ts` covering both .2 and .3 integration behaviors
- [x] Slim `vite.config.ts` to import the extracted helpers + watcher option constants
- [x] Phase 3: targeted tests + lint/typecheck

## 🔗 Related

- [[CORE-EPIC-431]] — parent; fleet-scale watcher + scoped events
- [[CORE-431.2]] — split watch set; deferred chokidar integration pins here
- [[CORE-431.3]] — attributed SSE; deferred wire/integration pins here
- [[CORE-431.N]] — epic audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** .2 and .3 shipped the behavior and unit-tested helpers; PLAN line assigns integration pins that wire chokidar + SSE together to this child.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **PLAN.md:** Medium child of `CORE-EPIC-431`. `[light]🔧 | tests pinning both behaviors`. Parent children .2 (split watch) and .3 (attributed SSE) are completed 2026-08-12.
- **Deferred pins:** CORE-431.2 left "SSE/integration pins to [[CORE-431.4]]"; CORE-431.3 left "Chokidar/SSE integration pins stay with [[CORE-431.4]]". Unit coverage exists for `watchSet`, `sseChange`, `archiveCache`, `useProjectData` — not for `onWatchEvent` + debounced broadcast in `vite.config.ts`.
- **CORE-118 precedent:** declined extracting `broadcastChange` in 2026; .4's deliverable is the exception — extract the minimal watch+broadcast slice so vitest can pin it without `vite` dev server. `devApi.test.ts` fake-res pattern applies.
- **Best Practices Review:** New `flowtronWatch.ts` owns debounce state machine + `onWatchEvent`; `vite.config.ts` keeps chokidar lifecycle (watch/close/heartbeat). Import `projectForPath` / `projectForActiveTasknote` / `formatChangePayload` — no duplication. Export watcher option constants for .2 pin.
- **Archive skim:** CORE-431.2/.3 record exact behaviors to pin: hot `usePolling:true depth:1`, archive `usePolling:false depth:2`, unlink→`invalidateProject`, attributed debounce with fail-open `{}`.
- **Drift check:** `vite.config.ts` still inlines broadcast + onWatchEvent at L65-110. Helpers extracted per .2/.3. No SPEC contract for viz watcher. PLAN line matches extraction+test approach.
- **Clarifications:** No clarifications needed. Assumptions: (1) extract minimal slice, not full plugin; (2) fake timers for debounce; (3) no new Vite e2e harness.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** CORE-118/`devApi` extraction model — lifecycle stays in `flowtronApi`, orchestration moves to `flowtronWatch.ts`. Reuses existing `watchSet` + `sseChange` helpers; fake-res + fake-timers mirror `devApi.test.ts`.
- **Minimal refactor:** extracted only `createChangeBroadcaster`, `createOnWatchEvent`, and watcher option constants — not chokidar lifecycle or heartbeat. Deferred: Vite e2e harness, full plugin extraction.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: dev-server wiring only; no UI surface

**Testing Notes:**

- `npm --prefix viz test -- src/flowtronWatch.test.ts` — 10/10
- `npm --prefix viz test` — 335/335
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` + `npx eslint viz/vite.config.ts` — clean
- Quality: no duplicated debounce logic in vite.config; watcher options single-sourced; no new package exports beyond the module; no code-facing docs named the old inline wiring.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

CORE-431.2 and CORE-431.3 behaviors are now pinned by integration tests that run without booting Vite. `flowtronWatch.ts` owns the debounced attributed broadcaster and `onWatchEvent` wiring; `vite.config.ts` thin-imports it plus exported hot/archive watcher options.

Changed: `viz/src/flowtronWatch.ts` + test (new, 10 cases), `viz/vite.config.ts` (slimmed). Verification: 335 viz tests, typecheck, lint. Refactors: minimal extraction per CORE-118 lifecycle split; Vite e2e deferred. Docs: all 14 AI-referenced docs — no change. Maintainability: regressions in split-watch or attributed-SSE wiring now fail in vitest instead of only at manual dev-server exercise.

**Archived:** 2026-08-12
