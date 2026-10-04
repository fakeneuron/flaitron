---
title: split watch set
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-431, CORE-431.3, CORE-431.4, CORE-431.N]
---

# CORE-431.2 | split watch set

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-431]] · [[CORE-431.3]] · [[CORE-431.4]]

## 🎯 Goal

Stop polling every archive markdown file at 200ms: keep the 200ms poll on `PLAN.md` + active tasknotes, and watch archives without a fleet-scale poll.

## ✅ Acceptance

- [x] `viz/vite.config.ts` polls only each project's `PLAN.md` and `tasknote/*.md` (the hot set) at `WATCH_POLL_MS`
- [x] Archive paths are not in the polled watcher; they are watched natively (`usePolling: false`) on the existing `archive/<area>/*.md` glob
- [x] Unlink of an active tasknote still invalidates that project's archive cache (symlink-safe closure path when native FSEvents miss)
- [x] SSE payload stays unattributed `data: {}` — project attribution is [[CORE-431.3]]
- [x] Path partitioning is extracted so [[CORE-431.4]] can pin it without booting Vite

## 🧩 Subtasks

- [x] Extract `watchSets()` + `projectForActiveTasknote()` into `viz/src/watchSet.ts`
- [x] Split `flowtronApi` into a polled hot watcher and a native archive watcher; close both on shutdown
- [x] Add `archiveCache.invalidateProject(name)` and call it on hot-path `unlink` of an active tasknote
- [x] Unit-test the path helper + `invalidateProject`; leave SSE/integration pins to [[CORE-431.4]]
- [x] Phase 3: targeted tests + lint/typecheck

## 🔗 Related

- [[CORE-EPIC-431]] — parent; fleet-scale watcher + scoped events
- [[CORE-431.3]] — project-attributed SSE (out of scope here)
- [[CORE-431.4]] — tests pinning both behaviors
- [[CORE-431.N]] — epic audit
- [[FE-028]] — added archive glob + cache invalidation to the single polled watcher
- [[CORE-222]] — `usePolling: true` because FSEvents misses inside symlink project roots
- [[FE-011]] — original watch was PLAN + active only; archives were out of the poll set

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Single polled watcher still globs every `archive/<area>/*.md` across `~/code` at 200ms; the PLAN line is current and the split is the first implementation child of an in-flight epic.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **PLAN.md:** Medium child of `CORE-EPIC-431`. `[heavy]🧠 | split watch set — poll PLAN.md + active tasknotes only; archives coarse/native or active-project-only`. Parent cites `viz/vite.config.ts:82` (still the `watchPaths` line). Discovery was supplied by audit-repo 2026-08-10; no `.1` child.
- **Current watcher** (`viz/vite.config.ts:82-98`): one chokidar instance, `usePolling: true`, `interval: WATCH_POLL_MS` (200), `depth: 2`, paths = `planPath` + `tasknoteDir/*.md` + `archiveDir/*/*.md` for every discovered project. On `all`: `archiveCache.invalidate(filepath)` then debounced unattributed SSE `data: {}`.
- **Why polling exists (CORE-222):** FSEvents does not reliably fire inside symlink project roots; `discoverProjects` includes symlink entries. Polling must stay on the hot set.
- **Design pick — native archive watcher, not coarse, not active-project-only.**
  - *Coarse* (poll `archiveDir` at `depth: 1`) would drop file-level `change` events. A superseded-claim in-place edit then a PLAN.md SSE refetch would hit a still-warm FE-028 cache and serve stale archive bodies. Closure `mv` would usually be saved by directory mtime, but in-place edits would not.
  - *Active-project-only* needs a client→server "viewing X" channel, which is [[CORE-431.3]]'s surface. Sibling archives would stay cached-stale until the next native/hot event after a project switch.
  - *Native* (`usePolling: false` on the existing `*/*.md` glob) is what the PLAN line authorizes, and the 4.9k cost is the *poll*, not the watch. FSEvents/inotify on archive files is cheap. Symlink miss is covered by the hot-path `unlink` of the active tasknote (closure always moves it); in-place archive edits on symlink roots stay Refresh-recoverable (write-once, rare).
- **Do not invalidate the archive cache on every PLAN.md/active `change`.** That would re-parse the whole archive on each PLAN save and regress FE-028's warm-cache win (fintown was 1.26s cold).
- **Out of scope:** SSE `data:` attribution ([[CORE-431.3]]); full behavior-pinning tests ([[CORE-431.4]]). This task extracts a testable `watchSets` helper and adds unit coverage of the partition + `invalidateProject`; .4 pins both children together.
- **Best Practices Review:** Watcher *lifecycle* stays in `flowtronApi` (CORE-118). Path partitioning is a pure function — extract to `viz/src/watchSet.ts` (same direction as `archiveCache` / `workspace`) so .4 does not have to boot Vite. Add `invalidateProject` on the existing cache rather than a fake archive-path invalidate. No new SSE shape.
- **Archive skim (load-bearing):**
  - FE-011: original watch was PLAN + active only; "closure-archives still trigger a refresh because the source file disappears."
  - FE-002: explicitly did not recurse into `archive/`.
  - FE-028: added `archive/**/*.md` + cache invalidation to the *same* polled watcher (later narrowed to `*/*.md` by FE-076). That is how archives entered the 200ms poll set.
  - CORE-222: polling rationale (symlink / FSEvents) — still valid for the hot set; this task stops applying it to archives.
  - CORE-118: `vite.config.ts` owns discovery, chokidar, heartbeat, close; handlers live in `devApi.ts`.
  - FE-070: named `WATCH_POLL_MS` (tasknote not in archive under that id; constant is live at `vite.config.ts:26`).
- **Drift check:** Citation `vite.config.ts:82` still points at `watchPaths`. `WATCH_POLL_MS = 200` live. `archiveCache.invalidate` still prefix-matches `archiveDir` only (active-tasknote paths return false — confirmed by `archiveCache.test.ts`). No SPEC contract for the viz watcher. PLAN line's "coarse/native or active-project-only" is an authorized choice, not a contradiction; pick recorded above.
- **Clarifications:** No clarifications needed. Assumptions: (1) native archive watch + hot `unlink` invalidate is the authorized "native" branch; (2) .3/.4 stay out of this diff; (3) in-place archive edits on symlink project roots may need the manual Refresh button — acceptable under write-once.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** CORE-118 keeps watcher lifecycle in `flowtronApi`; `archiveCache` / `workspace` already own extracted helpers. Extended that split: `watchSet.ts` is a pure partition, vite.config owns two chokidar instances + close. SSE `data: {}` unchanged (FE-011 / CORE-431.3).
- **Minimal refactor:** extracted `watchSets` + `projectForActiveTasknote` so .4 can pin without booting Vite; added `invalidateProject` rather than a fake archive-path invalidate. Did not change `invalidate()`'s archiveDir-prefix contract (PLAN/active `change` must not bust the FE-028 warm cache). Deferred: SSE attribution (.3), chokidar integration tests (.4).
- Two watchers share `onWatchEvent`. Hot: `usePolling: true`, `depth: 1`, `WATCH_POLL_MS`. Archive: `usePolling: false`, `depth: 2`, same `*/*.md` glob. Empty-set guards skip `chokidar.watch([])`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no UI surface; watcher is dev-server only

**Testing Notes:**

- `npm --prefix viz test -- src/watchSet.test.ts src/archiveCache.test.ts` — 18/18
- `npm --prefix viz test` — 313/313
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` + `npx eslint vite.config.ts` — clean
- Quality: no duplicated watch-path lists; `join` dropped from vite.config (moved into `watchSets`); `invalidateProject` is a one-line Map.delete; no new public package exports; no code-facing docs named the old single-watcher poll set.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The viz dev server no longer polls every archive markdown file at 200ms. `PLAN.md` and active tasknotes stay on the polled hot watcher; archives use a native chokidar instance, with hot-path `unlink` of an active tasknote still busting that project's archive cache so closure stays correct on symlink roots.

Changed: `viz/vite.config.ts` (split watchers), `viz/src/watchSet.ts` + test (new), `viz/src/archiveCache.ts` (`invalidateProject`) + test. Verification: 313 viz tests, typecheck, lint. Refactors: path partition extracted for .4; SSE attribution and integration pins deferred to .3/.4. Docs: no AI-referenced doc named the poll set — no change. Maintainability: the 4.9k-file poll is gone; CORE-222's polling rationale now applies only where FSEvents actually fails.

**Archived:** 2026-08-12
