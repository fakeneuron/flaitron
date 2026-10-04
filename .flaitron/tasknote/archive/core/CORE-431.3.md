---
title: project-attributed SSE change events; client ignores non-active projects
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-431, CORE-431.2, CORE-431.4, CORE-431.N]
---

# CORE-431.3 | project-attributed SSE change events; client ignores non-active projects

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-431]] · [[CORE-431.2]] · [[CORE-431.4]]

## 🎯 Goal

Attribute viz SSE `change` events to the project whose file changed, so the viewed board does not refetch when a sibling repo writes.

## ✅ Acceptance

- [x] Watch events map to a project; the SSE `change` payload carries `{ "project": "<name>" }` instead of unattributed `{}`
- [x] `useProjectData` refreshes only when the event's project matches the active project (unattributed `{}` still fail-open)
- [x] Reconnect `open` after a drop still refreshes the active project unconditionally
- [x] Path→project mapping and payload format/parse are extracted so [[CORE-431.4]] can pin them without booting Vite
- [x] Chokidar/SSE integration pins stay with [[CORE-431.4]]

## 🧩 Subtasks

- [x] Add `projectForPath()` in `viz/src/watchSet.ts` covering PLAN.md, active tasknotes, and archive files
- [x] Extract SSE payload format/parse (`{ project }` vs `{}`) into a node-free helper
- [x] Debounce accumulates unique project names; flush writes one attributed `change` per name (unattributed window still sends `{}`)
- [x] Client ignores `change` events whose `project` is not the active project; missing/empty payload still refreshes
- [x] Unit-test the mapper, payload helper, and client filter; leave wire/integration pins to [[CORE-431.4]]

## 🔗 Related

- [[CORE-EPIC-431]] — parent; fleet-scale watcher + scoped events
- [[CORE-431.2]] — split watch set; left SSE `data: {}` unattributed on purpose
- [[CORE-431.4]] — tests pinning both behaviors
- [[CORE-431.N]] — epic audit
- [[FE-011]] — original notify-only SSE `data: {}`
- [[CORE-118]] — `vite.config.ts` owns watcher lifecycle + broadcast; handlers live in `devApi.ts`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Sibling-repo writes still broadcast unattributed `data: {}` and refetch the viewed board; .2 split the watch set and explicitly deferred attribution here.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **PLAN.md:** Medium child of `CORE-EPIC-431`. `[medium]🧩 | project-attributed SSE change events; client ignores non-active projects`. Parent: "attribute SSE change events to a project so sibling-repo writes don't refetch the viewed board." No `.1` child; Discovery supplied by audit-repo 2026-08-10.
- **Current wire:** `viz/vite.config.ts:62-70` `broadcastChange` writes `event: change\ndata: {}\n\n` after a 200ms global debounce. Client `useProjectData.ts:78-81` opens `EventSource('/api/events')` and calls `refresh()` on every `change`, ignoring payload. Reconnect path (`error` → `open`) already refreshes unconditionally — keep that.
- **Not a viewing-channel.** CORE-431.2 Discovery mentioned a client→server "viewing X" channel as the *active-project-only watch* alternative. This task is payload attribution + client filter; the server still watches every project. No new `/api` route.
- **Debounce:** global timer stays. Accumulate unique project names in the window; flush one attributed event per name. If any event in the window cannot be attributed, send a single unattributed `{}` (fail-open) instead.
- **Best Practices Review:** CORE-118 keeps broadcast/debounce in `flowtronApi`. Path mapping belongs next to `projectForActiveTasknote` in `watchSet.ts` (PLAN exact, active `dirname === tasknoteDir`, archive `startsWith(archiveDir)` — same prefix rule as `archiveCache.invalidate`). Payload format/parse must be node-free so the client can import it — new `viz/src/sseChange.ts`, not `watchSet.ts` (`node:path`). Do not extract `broadcastChange` itself (CORE-118 declined that). Client filter stays in `useProjectData`; `createEventsHandler` preamble `event: open\ndata: {}` is unchanged.
- **Archive skim (load-bearing):**
  - FE-011: notify-only `data: {}`; client calls existing `load()`. Debounce 200ms, heartbeat 30s. That unattributed contract is what this task replaces for `change` (not `open` / ping).
  - CORE-118: plugin owns `sseClients`, debounce, broadcast; do not move those into `devApi.ts`.
  - FE-028: cache invalidation is already per-project; SSE broadcast was left global. Client `load()` refetches plan+active+archive on every `change`.
  - CORE-431.2: split watchers; Acceptance explicitly "SSE payload stays unattributed `data: {}` — project attribution is CORE-431.3". `projectForActiveTasknote` is unlink-only (must not start returning PLAN/archive owners).
  - CORE-222: polling rationale — untouched; this task does not change watchers.
- **Drift check:** Parent citation `viz/vite.config.ts:82` was the old `watchPaths` line; after .2 it is the `watchSets` call. No SPEC contract for the viz watcher/SSE (confirmed by search). PLAN line matches the payload+filter approach; no contradiction. `.4` owns integration pins — do not steal them.
- **Clarifications:** No clarifications needed. Assumptions: (1) attribution is payload-based, not a watch-set or viewing-channel change; (2) unattributed `{}` fail-open so reconnect-adjacent and unknown-path events still refresh; (3) `.4` keeps chokidar/SSE integration tests.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** CORE-118 keeps broadcast/debounce in `flowtronApi`. Extended the CORE-431.2 `watchSet.ts` helper set with `projectForPath` (PLAN exact / active dirname / archive prefix — same prefix rule as `archiveCache.invalidate`). Payload format/parse could not live in `watchSet.ts` (`node:path` would leak into the client bundle), so a node-free `sseChange.ts` is the encoder/decoder both sides import. Client filter stays in `useProjectData`; `createEventsHandler` preamble unchanged.
- **Minimal refactor:** extracted `projectForPath` + `formatChangePayload`/`projectFromChangeData` so .4 can pin without booting Vite. Did not extract `broadcastChange` (CORE-118 declined). Did not widen `projectForActiveTasknote` (unlink-only). Deferred: chokidar/SSE integration pins (.4).
- Debounce accumulates unique project names; flush writes one `{ "project": "<name>" }` per name. Any unattributed event in the window fail-opens to a single `{}`. Client ignores `change` whose `project` ≠ active; missing/`{}` still refreshes. Reconnect `open` still refreshes unconditionally.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- `npm --prefix viz test -- src/watchSet.test.ts src/sseChange.test.ts src/ui/useProjectData.test.ts` — 22/22
- `npm --prefix viz test` — 325/325
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` + `npx eslint vite.config.ts` (from `viz/`) — clean
- Quality: `projectForPath` does not replace `projectForActiveTasknote` (different contract); encoder/decoder is one module; MockEventSource `emit` gained an optional `data` argument with existing no-data callers unchanged; no new package exports; no code-facing doc named the unattributed `data: {}` contract.
- Visual confirmation: operator go 2026-08-12.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Sibling-repo writes no longer refetch the viewed viz board. SSE `change` events carry `{ "project": "<name>" }`; the client ignores events for any other project. Unattributed `{}` still fail-open, and a reconnect after a drop still refreshes.

Changed: `viz/vite.config.ts` (attributed debounce/broadcast), `viz/src/watchSet.ts` (`projectForPath`), `viz/src/sseChange.ts` + test (new encoder/decoder), `viz/src/ui/useProjectData.ts` (client filter), `viz/src/test/setup.ts` (MockEventSource `data`). Verification: 325 viz tests, typecheck, lint; operator visual confirm. Refactors: path mapper + payload helper extracted for .4; chokidar/SSE integration pins deferred to .4. Docs: no AI-referenced doc named the unattributed `data: {}` contract — no change. Maintainability: the viewed board is scoped to the active project without a viewing-channel or watch-set change.

**Archived:** 2026-08-12
