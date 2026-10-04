---
title: viz fleet-scale watcher + scoped events audit
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-431, CORE-431.2, CORE-431.3, CORE-431.4]
---

# CORE-431.N | viz fleet-scale watcher + scoped events audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-431]]

## 🎯 Goal

Verify the completed `CORE-EPIC-431` (`viz fleet-scale watcher + scoped events`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-431.N — audit CORE-EPIC-431` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-431.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-431.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-431` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-431.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-431]] — parent epic: viz fleet-scale watcher + scoped events
- [[CORE-431.2]] — split watch set (hot poll + native archive watch)
- [[CORE-431.3]] — project-attributed SSE change events; client filter
- [[CORE-431.4]] — integration tests pinning both behaviors

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-task CORE-431.N` (terminal audit child). Parent `CORE-EPIC-431` is active under `## Medium`; implementation children `.2`–`.4` all closed 2026-08-12; no open siblings; early-audit gate N/A. Epic was filed without a `.1` — Discovery was supplied by audit-repo 2026-08-10.

- [x] Read relevant source files — archived `CORE-431.2`–`.4`; live `viz/vite.config.ts`, `viz/src/watchSet.ts`, `viz/src/sseChange.ts`, `viz/src/flowtronWatch.ts`, `viz/src/flowtronWatch.test.ts`, `viz/src/ui/useProjectData.ts`, `viz/src/archiveCache.ts`

- [x] **Best Practices Review** — N/A for the audit itself (verification pass). Applied *to* the cohort: module split follows CORE-118 (`watchSet` pure paths, `sseChange` node-free wire format, `flowtronWatch` orchestration, `vite.config` lifecycle only) — correct dependency direction.

- [x] **Archive skim** — cohort archives are the primary inventory. Load-bearing non-cohort context cited by children: [[CORE-222]] (symlink polling rationale for hot set), [[FE-028]] / [[FE-076]] (how archives entered the poll set), [[CORE-118]] (watcher lifecycle stays in `flowtronApi`). No additional archive reads changed the picture.

- [x] **Drift check** — HEAD matches each child's shipped shape:
  - `watchSets()` partitions hot (`planPath` + `tasknote/*.md`) vs archive (`archive/*/*.md`); hot polls at `WATCH_POLL_MS`, archive native at `depth: 2`
  - `createOnWatchEvent` invalidates archive cache, `unlink` of active tasknote calls `invalidateProject`, attributes via `projectForPath`
  - `createChangeBroadcaster` debounces per-project payloads; unattributed window fail-opens to `{}`
  - `useProjectData` filters `change` events by `projectFromChangeData`; `{}`/missing still refresh; reconnect `open` still refreshes
  - `flowtronWatch.test.ts` pins .2 options + .3 debounce/attribution + wiring (10 cases); full suite 335/335 at audit time
  - Parent PLAN citation `viz/vite.config.ts:82` was the pre-.2 `watchPaths` line; line 77 is now `watchSets(discovered)` — historical parent description only (drops on parent stub flip)

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) full-cohort audit (all three implementation children closed); (2) native archive watch at fleet scale is the authorized .2 trade-off (poll removed, not watch removed); (3) Vite e2e deferred by .4 stays deferred; (4) misses file via `/ft-file-followup` after closure, not inline, unless trivial and clearly in-scope.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Closed | Deliverable |
|---|---|---|
| **CORE-431.2** | 2026-08-12 | Split chokidar: polled hot watcher + native archive watcher; `watchSet.ts` (`watchSets`, `projectForActiveTasknote`); `archiveCache.invalidateProject`; unit tests |
| **CORE-431.3** | 2026-08-12 | `projectForPath`; `sseChange.ts` encoder/decoder; attributed debounce in vite (later moved to `flowtronWatch.ts`); client filter in `useProjectData`; unit tests |
| **CORE-431.4** | 2026-08-12 | Extracted `flowtronWatch.ts` (broadcaster + `onWatchEvent` + watcher option constants); `flowtronWatch.test.ts` (10 integration pins without booting Vite); slimmed `vite.config.ts` |

### Epic theme check

Theme: stop polling ~4.9k archive files at 200ms; attribute SSE `change` events so sibling-repo writes do not refetch the viewed board. Three-child sequence is clean: split watch set → attribute + filter → pin wiring in tests. Deferred alternatives (active-project-only watch / viewing channel) were explicitly rejected in .2/.3 Discovery and not partially implemented.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass. Cohort *extends* CORE-118's extraction model consistently across three children.

- [x] **Minimal refactor gate** — N/A. No inline fixes applied (see Implementation Notes).

- [x] Implemented the minimal solution — cohort inventory + coherence pass + fixed doc-drift sweep

- [x] Updated/added tests for non-trivial behavior — N/A (audit made no code edits)

**Implementation Notes:**

### Cohort children inventoried

- **CORE-431.2** — Removed fleet-scale 200ms poll on archives. Hot set (`PLAN.md` + `tasknote/*.md`) keeps `usePolling: true` per CORE-222 symlink rationale. Archives use native chokidar (`usePolling: false`, `depth: 2`). Active-tasknote `unlink` busts project archive cache via `invalidateProject`.
- **CORE-431.3** — SSE `change` payloads carry `{ "project": "<name>" }`; client ignores non-active projects. Unattributed `{}` fail-open preserved. `projectForActiveTasknote` stays unlink-only; `projectForPath` handles attribution. Node-free `sseChange.ts` avoids bundling `node:path` in the client.
- **CORE-431.4** — `flowtronWatch.ts` owns debounce state machine + `onWatchEvent`; `vite.config.ts` owns chokidar lifecycle + SSE heartbeat. Ten integration tests pin .2 watcher options and .3 debounce/attribution/wiring without booting Vite.

### Coherence verdict

Verified clean:

- **Module boundaries:** `watchSet` (paths), `sseChange` (wire format), `flowtronWatch` (server orchestration), `useProjectData` (client filter), `vite.config` (thin wiring) — no duplicated debounce or path-mapping logic.
- **Cross-child contracts:** `.2`'s `projectForActiveTasknote` unlink-only rule respected by `.3`'s separate `projectForPath`. `.4` imports helpers from `.2`/`.3` modules rather than re-deriving.
- **Naming/style:** `WATCH_HOT_OPTIONS` / `WATCH_ARCHIVE_OPTIONS` / `WATCH_POLL_MS` / `SSE_DEBOUNCE_MS` live together in `flowtronWatch.ts` after `.4` extraction (FE-070's named constant moved with the wiring — still named, no magic numbers in `vite.config`).
- **No contradictory cross-refs** across archived tasknotes or live code comments.
- **No regressions:** full viz suite 335/335, typecheck, lint at audit HEAD (see Testing Notes).

### Findings

No misses surfaced. The cohort delivers the parent epic's two goals (poll removal + scoped client refresh) with consistent layering and test pins. Intentional deferrals (.4's Vite e2e; .2's active-project-only watch alternative) are documented in the children's archives, not silently dropped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — audit made no code edits; re-ran full viz suite + cohort integration file as no-regressions check

- [x] Ran lint/type-check on changed code — N/A for audit diff (markdown only); `npm --prefix viz run typecheck` + `run lint` run anyway — clean

- [x] **Quality assertions** — N/A for audit's own diff. Cohort surfaces show no avoidable duplication or stale code-facing documentation in the AI-referenced doc set.

- [x] (frontend) N/A — audit touched no UI; cohort's client filter was visually confirmed by operator during .3 closure

**Testing Notes:**

- `npm --prefix viz test` — 335/335
- `npm --prefix viz test -- src/flowtronWatch.test.ts src/watchSet.test.ts src/sseChange.test.ts src/ui/useProjectData.test.ts` — 32/32 (cohort test surface)
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 AI-referenced docs: no change (viz watcher/SSE behavior is dev-server implementation detail; none of the listed docs name the old single-watcher poll set or the unattributed `data: {}` contract)

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` → `completed`; PLAN line flipped; tasknote archived

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Fleet-scale watcher audit found no inconsistencies. The CORE-431.2/.3/.4 cohort coherently stops archive polling, attributes SSE change events to projects, and pins the wiring in `flowtronWatch.test.ts` without booting Vite. Full viz verification green at HEAD (335 tests, typecheck, lint). Parent flipped to Completed 2026-08-12 (operator go, default Yes).

**Archived:** 2026-08-12
