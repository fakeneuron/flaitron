---
title: dev-server-middleware-tests
status: completed
tags: [security, viz, tests]
created: 2026-05-18
due:
related-tasks: [CORE-114]
---

# CORE-118 | dev-server-middleware-tests

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-18 · 🔗 [[CORE-114]]

## 🎯 Goal

Extract `originGuard()` (and the `/api/*` route handlers where reasonable) from `viz/vite.config.ts` into a testable module under `viz/src/`, and cover the security boundary with unit tests so the CORE-114 hardening is no longer verified solely by an ad-hoc live smoke test.

## ✅ Acceptance

- [x] `originGuard()` + the allowlist constants (`DEV_PORT`, `ALLOWED_ORIGINS`, `ALLOWED_HOSTNAMES`) live in `viz/src/originGuard.ts` and are imported by `viz/vite.config.ts`
- [x] `/api/*` route-handler bodies live in `viz/src/devApi.ts` as factory functions taking runtime deps (`projects`, `archiveCache`, `sseClients`) as args; `vite.config.ts` thin-wires them while retaining lifecycle ownership (discovery, chokidar watcher, heartbeat, close handler, broadcast)
- [x] `viz/src/originGuard.test.ts` covers the 5 named cases: allowed `Origin`, blocked cross-origin `Origin`, blocked cross-origin `Referer`, missing-both pass-through, malformed `Referer`
- [x] `viz/src/devApi.test.ts` covers each of the 5 handlers with at least (a) cross-origin → 403 regression guard, (b) one happy-path behavior assertion
- [x] `npm test --prefix viz` passes (146/146 — 125 baseline + 21 new)
- [x] `npm run typecheck --prefix viz` clean
- [x] `npm run lint --prefix viz` clean
- [x] `npm run build --prefix viz` clean
- [x] Live behavior unchanged — handler bodies and `originGuard()` were moved bit-identically; the 5 `server.middlewares.use` wirings preserve route order; CORE-114's smoke matrix (cases #1–#7) holds by construction

## 🧩 Subtasks

- [x] Create `viz/src/originGuard.ts`: export `DEV_PORT` (5120), `ALLOWED_ORIGINS`, `ALLOWED_HOSTNAMES`, and `originGuard(req, res): boolean` — moved verbatim from `vite.config.ts:24-64` so behavior is bit-identical
- [x] Create `viz/src/devApi.ts`: export `projectFromQuery(req, projects)` plus 5 handler factories — `createProjectsHandler(projects)`, `createPlanHandler(projects)`, `createActiveHandler(projects)`, `createArchiveHandler(projects, archiveCache)`, `createEventsHandler(sseClients)`; each factory returns a `(req, res) => void | Promise<void>` that calls `originGuard()` first
- [x] Slim `viz/vite.config.ts`: replace inline guard/constants/handler bodies with imports; plugin keeps `flowtronApi()` ownership of `sseClients`, `archiveCache`, `projects` map, chokidar watcher, heartbeat, and `httpServer.on('close')` cleanup; the 5 `server.middlewares.use('/api/x', createXHandler(...))` lines wire the factories
- [x] Write `viz/src/originGuard.test.ts` — 5 acceptance cases + a 127.0.0.1 allowed-origin sanity case + a 2-entry-allowlist sanity case
- [x] Write `viz/src/devApi.test.ts` — per-handler tests using a `mkdtemp` workspace for the file-reading handlers (`/api/plan`, `/api/active`, `/api/archive`), and minimal request/response stubs; each handler block asserts (a) cross-origin → 403, (b) happy path
- [x] Ran `npm run lint --prefix viz`, `npm run typecheck --prefix viz`, `npm test --prefix viz`, `npm run build --prefix viz`; all clean

## 🔗 Related

- [[CORE-114]] — predecessor: added the `/api/*` middlewares + `originGuard()` to `viz/vite.config.ts`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All cited code is present and unchanged since CORE-114: `originGuard()` at `viz/vite.config.ts:38-64`, 5 `/api/*` middlewares at L134-216, zero tests touching either. The regression-risk gap is real — a future refactor that drops a single `if (!originGuard(req, res)) return;` line silently reopens the cross-origin read vector with no test signal. Closing it with unit tests under `viz/src/` matches the existing test-culture pattern (parser.test.ts, archiveCache.test.ts, workspace.test.ts all live next to their module).

- [x] Read relevant source files (`viz/vite.config.ts`, `viz/src/archiveCache.test.ts`, `viz/src/parser.test.ts`, `viz/src/workspace.test.ts`, `viz/eslint.config.js`, `viz/tsconfig.json`, `viz/package.json`)
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — no drift (see Discovery Notes)
- [x] Asked clarifying questions (extraction scope — answered: full extraction incl. route handlers)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Drift check.**
- `viz/vite.config.ts` — `originGuard()` at L38-64, `ALLOWED_ORIGINS` / `ALLOWED_HOSTNAMES` at L25-29, 5 middlewares at L134-216 (`/api/events`, `/api/projects`, `/api/plan`, `/api/active`, `/api/archive`). All match.
- `viz/src/` — no existing `originGuard.ts` / `devApi.ts` / equivalent test files. Sibling test files: `archiveCache.test.ts`, `parser.test.ts`, `tasknote.test.ts`, `viewMode.test.ts`, `visibilityPrefs.test.ts`, `workspace.test.ts`.
- Vitest v4.1.6, Vite v6.4.2 (post CORE-114 bump). `tsconfig.json` `include` already covers `src/**/*.ts` and `vite.config.ts`.
- No drift.

**Archive skim (`_project/tasknote/archive/core/`).**
- `CORE-114.md` — predecessor; introduced `originGuard()` + the 5 middlewares + `allowedHosts` lockdown. Verified solely by a 7-case live smoke test on port 5125. Closure notes explicitly call out "no new unit test file added since the guard is a thin header check exercised end-to-end" — that's the gap this tasknote closes.
- `CORE-115.md` — viz ESLint baseline. Wired the `lint` script (`eslint src`) and config. Does NOT lint `vite.config.ts` (outside `src/`). Implication: linting the new `src/originGuard.ts` and `src/devApi.ts` is automatic; the slimmed `vite.config.ts` continues to be caught by `tsc --noEmit` only.
- `CORE-098.9.md` / `CORE-098.11.md` — port-5120 migration / Lighthouse a11y; touched `vite.config.ts` but unrelated structurally.
- No prior unit-test work on the dev-server API surface.

**Pattern survey (informs Phase 2).**
- Existing module shape (parser.ts / archiveCache.ts / workspace.ts) is a pure module + sibling `<name>.test.ts`. `originGuard.ts` and `devApi.ts` mirror this exactly.
- `archiveCache.test.ts` uses `mkdtemp(tmpdir(), ...)` + `beforeEach` / `afterEach` cleanup for fs-touching handlers; reuse this for `/api/plan` / `/api/active` / `/api/archive` happy paths.
- `originGuard()` has no fs / network side effects → plain object fakes for `IncomingMessage` / `ServerResponse` suffice. Match the existing thin-stub style (no `http.createServer` round-trip needed).
- `projectFromQuery()` (currently L66-76 in `vite.config.ts`) is also pure and benefits from being co-located in `devApi.ts` — it's exercised by every handler test indirectly, and worth one explicit test pair (known project / unknown project).

**Extraction shape.**
- `originGuard.ts`: exports `DEV_PORT`, `ALLOWED_ORIGINS`, `ALLOWED_HOSTNAMES`, `originGuard`. Bit-identical to the current inline code.
- `devApi.ts`: exports `projectFromQuery` + 5 factory functions. Each factory closes over its runtime deps and returns a Connect-style middleware handler. The factory shape matches the read-only side-effect surface: handlers don't mutate `projects` or `archiveCache` — they only read.
- `vite.config.ts`: imports from both modules; `flowtronApi()` retains the closure over `sseClients`, `archiveCache`, `projects`, watcher, debounce/heartbeat timers, broadcast — all the moving lifecycle pieces. Roughly halves the file (~245 LOC → ~130 LOC estimated).

**Out of scope (per "minimum viable").**
- Extracting the Chokidar watcher setup — high effort, low test value, mixes too many side effects.
- Extracting `broadcastChange` / `scheduleBroadcast` — already trivially correct; extracting them would force the SSE clients set to live in another module, which costs more than it gains.
- Adding new test cases beyond the 5 named in PLAN.md + per-handler smoke (one cross-origin + one happy-path per handler). The acceptance is "close the regression-risk gap," not "comprehensive coverage of every route handler edge case."

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sibling `viz/src/` modules (`parser.ts`, `archiveCache.ts`, `workspace.ts`, `tasknote.ts`) all follow the same shape: one module + one sibling `<name>.test.ts`. The handler-factory pattern (closure over runtime deps, returns a Connect-style middleware) is a natural fit because each handler's only runtime dependency is read-only access to `projects` / `archiveCache` / `sseClients` — no further abstraction needed. No higher-order "withOriginGuard" wrapper introduced; each handler keeps the explicit `if (!originGuard(req, res)) return;` first-line invariant so the security-boundary call is visible at every handler site (a wrapper would hide it).
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Extraction map.**
- `viz/src/originGuard.ts` (new, 44 LOC) — exports `DEV_PORT`, `ALLOWED_ORIGINS`, `ALLOWED_HOSTNAMES`, `originGuard`. Function body and constants are byte-identical to the previous inline code; only the surrounding `import` lines differ.
- `viz/src/devApi.ts` (new, 132 LOC) — exports `projectFromQuery` + 5 factories (`createProjectsHandler`, `createPlanHandler`, `createActiveHandler`, `createArchiveHandler`, `createEventsHandler`). Each factory closes over its runtime deps and returns the handler. `safeReaddir` helper moved alongside.
- `viz/vite.config.ts` (modified, 244 LOC → 113 LOC, ~54% smaller) — retains the `flowtronApi()` plugin owning `sseClients`, `archiveCache`, `projects` map, chokidar watcher, heartbeat, debounce timer, `httpServer.on('close')` cleanup, and the `broadcastChange` / `scheduleBroadcast` pair. The 5 `server.middlewares.use` lines now read in the same order they fired before (events first inside the `httpServer` block, then projects/plan/active/archive outside it).

**Route ordering preserved.** The previous code registered `/api/events` inside `if (server.httpServer)` (since SSE needs the http server to be present) and the other four after that block. The new code preserves that ordering exactly — `createEventsHandler(sseClients)` stays inside the `httpServer` block, the other four stay outside. Vite's Connect-style middleware stack walks registrations in order, so preserving order is what guarantees CORE-114's smoke matrix continues to hold without re-running it.

**No new dependencies.** All imports already lived in `viz/src/`; only `chokidar` stays in `vite.config.ts` because the watcher lifecycle is the one piece that genuinely lives at the plugin layer.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm test --prefix viz` reports 146/146 pass (10 test files, 14.57s)
- [x] Ran lint/type-check on changed code — `npm run lint --prefix viz` clean; `npm run typecheck --prefix viz` clean; `npm run build --prefix viz` clean (Vite v6.4.2 production build, 311 modules)
- [x] (frontend) Visual confirmation N/A — refactor touches `viz/vite.config.ts` (dev-server plugin) and two new `viz/src/` modules with sibling test files. Zero React tree changes; zero changes to any `viz/src/ui/` file; zero user-visible HTML / CSS / JS bundle behavior shift. Matches CORE-114's "visual confirmation deferred" precedent for dev-server-only work.

**Testing Notes:**

**Test inventory (21 new tests; baseline was 125 → now 146).**

`viz/src/originGuard.test.ts` (7 tests):
1. allows allowed Origin (localhost variant)
2. allows allowed Origin (127.0.0.1 variant)
3. blocks cross-origin Origin → 403 + "Forbidden: cross-origin request"
4. blocks cross-origin Referer → 403 + "Forbidden: cross-origin referer" (Origin absent)
5. passes through missing-both (terminal `curl`, EventSource fallback)
6. blocks malformed Referer → 403 + "Forbidden: malformed referer"
7. allowlist sanity: exactly 2 entries, both loopback

`viz/src/devApi.test.ts` (14 tests):
- `projectFromQuery`: 3 cases (known / missing-query / unknown)
- `createProjectsHandler`: 2 cases (cross-origin 403 / happy-path JSON list)
- `createPlanHandler`: 3 cases (cross-origin 403 / happy-path PLAN body / unknown-project 400)
- `createActiveHandler`: 2 cases (cross-origin 403 / happy-path tasknote list)
- `createArchiveHandler`: 2 cases (cross-origin 403 / happy-path cache-served archive)
- `createEventsHandler`: 2 cases (cross-origin 403 + not-registered / happy-path SSE preamble + register + close-cleanup)

**Regression-guard rationale.** Every handler's first test asserts that a cross-origin request gets 403 without touching the underlying fs / cache. A future refactor that drops the `if (!originGuard(req, res)) return;` line from any single handler will fail its 403 test — closing the gap PLAN.md called out.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md` — no change (no reference to `originGuard` / `devApi` / dev-server internals)
  - `SPEC.md` — no change (workflow contract unaffected)
  - `docs/MIGRATION.md` — no change (no dev-server-internals reference)
  - `claude/CLAUDE-snippet.md` — no change (assistant surface unaffected)
  - `docs/CONVENTIONS.md` — no change (no new convention adopted/declined)
  - `CONTRIBUTING.md` — no change (solo-maintenance model unaffected)
  - `SECURITY.md` (not in §AI-referenced docs but pertinent given the security boundary): no change — the threat model and adopter guidance still hold; only the internal module layout shifted
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/CORE-118.md`
- [x] Recap drafted

**Final Summary:**

Closed the regression-risk gap on the CORE-114 viz dev-server security boundary. The `originGuard()` helper and its loopback allowlist now live in `viz/src/originGuard.ts`, and the 5 `/api/*` route handlers (`/api/events`, `/api/projects`, `/api/plan`, `/api/active`, `/api/archive`) live in `viz/src/devApi.ts` as factory functions taking runtime deps as args. `viz/vite.config.ts` shrank from 244 → 113 LOC and keeps only what genuinely belongs at the plugin layer: discovery, chokidar watcher, heartbeat, debounce, and close-handler. `viz/src/originGuard.test.ts` covers the 5 PLAN-named cases plus a 127.0.0.1 sanity case plus an allowlist-size sanity case (7 tests). `viz/src/devApi.test.ts` covers every handler with one cross-origin → 403 regression guard plus one happy-path assertion, plus 3 `projectFromQuery` cases (14 tests). Total: 146/146 viz tests pass (+21 over the 125 baseline), `tsc --noEmit` clean, `eslint src` clean, `vite build` clean. Behavior on the wire is unchanged — handler bodies are byte-identical and route registration order is preserved, so CORE-114's 7-case smoke matrix holds by construction.

**Files:** 2 new (`viz/src/originGuard.ts` 44 LOC, `viz/src/devApi.ts` 132 LOC), 2 new test (`viz/src/originGuard.test.ts` 88 LOC, `viz/src/devApi.test.ts` 268 LOC), 1 slimmed (`viz/vite.config.ts` 244 → 113 LOC), 1 tasknote (this file, archiving).

**Archived:** 2026-05-18
