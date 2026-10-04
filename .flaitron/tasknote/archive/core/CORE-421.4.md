---
title: devApi response hardening
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-421]
---

# CORE-421.4 | devApi response hardening

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-421]]

## 🎯 Goal

Harden `viz/src/devApi.ts` responses by setting `X-Content-Type-Options: nosniff` and a restrictive per-handler CSP on every `/api/*` response, and rejecting non-GET/HEAD methods with 405 — closing the XSSI-adjacent gap where `originGuard` allows origin-less requests through.

## ✅ Acceptance

- [x] Every devApi handler (`createProjectsHandler`, `createPlanHandler`, `createActiveHandler`, `createArchiveHandler`, `createEventsHandler`) sets `X-Content-Type-Options: nosniff` and a restrictive `Content-Security-Policy` on the response, before any early-return (method guard, origin guard, or error path)
- [x] Non-GET/HEAD requests to any devApi handler receive a 405 response with an `Allow` header, before origin validation or business logic runs
- [x] Targeted tests cover the new headers and 405 behavior across all five handlers
- [x] SECURITY.md's "Visualizer dev-server scope" section reflects the new per-handler headers and 405 behavior

## 🧩 Subtasks

- [x] Add `applyApiHeaders` + `methodGuard` helpers to `viz/src/devApi.ts` and wire them into all five handler closures ahead of `originGuard`
- [x] Extend `viz/src/devApi.test.ts`'s `makeReq` to accept a `method` option
- [x] Add nosniff/CSP header assertions to each handler's existing success-path test
- [x] Add a "rejects a non-GET/HEAD request with 405" test per handler, mirroring the existing "rejects a cross-origin request with 403" pattern
- [x] Update SECURITY.md §"Visualizer (`viz/`) dev-server scope" for the new per-handler headers + 405 behavior

## 🔗 Related

- [[CORE-EPIC-421]] — parent epic (viz-robustness)
- [[CORE-421.2]] — fence-aware scanners (prior epic child)
- [[CORE-421.3]] — duplicate-epic guard (prior epic child)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line and epic Discovery context both still match current code — `originGuard` (viz/src/originGuard.ts:17-43) is confirmed permissive for origin-less requests (falls through to `return true` at line 42), and devApi.ts's five handlers set no `X-Content-Type-Options`, no per-route CSP, and no method restriction today. Straightforward hardening, no scope surprises.

- [x] Read relevant source files — `viz/src/devApi.ts` (all 5 handlers), `viz/src/originGuard.ts`, `viz/vite.config.ts` (global `DEV_CSP` + middleware registration), `viz/src/devApi.test.ts` (existing test conventions), `SECURITY.md` §"Visualizer dev-server scope". Used an Explore probe first to map handler locations, header state, and test/doc conventions before reading full files.

- [x] **Best Practices Review** — extends the existing per-handler `originGuard(req, res)` guard-clause pattern (each handler already leads with one early-return guard) with two more guard clauses (`applyApiHeaders`, `methodGuard`), kept in `devApi.ts` since this is response-shaping specific to the API handlers, not origin validation (which stays scoped to `originGuard.ts`). No new abstraction beyond two small helper functions; no dependency-boundary changes.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` skimmed for prior tasknotes touching `devApi.ts`/`originGuard.ts`/`vite.config.ts`: CORE-338 (SSE write-error guard) and CORE-231/CORE-239 (global CSP + SECURITY.md doc) are the relevant precedents — CORE-231/239 established the module-level-const-with-rationale-comment convention for CSP that this task's per-handler CSP follows, and established the doc-sync obligation to SECURITY.md that this task also owes.

- [x] **Drift check** — PLAN.md's CORE-421.4 line, the epic's Discovery framing, and the current code all agree: no drift. The task description's claim ("originGuard allows origin-less requests, so plan content is XSSI-readable today") is verified accurate against originGuard.ts:14-16's own comment, which documents this as a deliberate tradeoff (curl/EventSource support) — this task adds defense-in-depth on top, it does not change that origin-less-requests-allowed decision.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) CSP value is the most restrictive `default-src 'none'`, since none of the five handlers serve HTML — distinct from the existing HTML-page CSP in `vite.config.ts`, which stays untouched; (2) headers apply before origin/method rejection paths too, since 403/400/500 error bodies deserve the same hardening as 200 bodies; (3) `Allow: GET, HEAD` header accompanies every 405, per HTTP spec.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Handler inventory (`viz/src/devApi.ts`): `createProjectsHandler` (L26), `createPlanHandler` (L41), `createActiveHandler` (L64), `createArchiveHandler` (L105), `createEventsHandler` (L131) — each currently opens with `if (!originGuard(req, res)) return;` as its only guard. No `req.method` check exists anywhere in devApi.ts/vite.config.ts/originGuard.ts (confirmed via grep). No existing shared mock-req/res helper across test files — each test file defines its own local `makeReq`/`makeRes`; `devApi.test.ts`'s `makeReq` currently takes `{ url?, headers? }` and needs a `method?` option added. `.flowtron/tasknote/README.md` §"AI-referenced docs" includes `SECURITY.md`, confirming it's in the doc-drift sweep scope for this closure.

Discovery surfaced no significant deviation → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing per-handler guard-clause chain (each handler already opened with `if (!originGuard(req, res)) return;`); added two composable guard-clause helpers (`applyApiHeaders`, `methodGuard`) at module scope in `devApi.ts`, called in the same style, ahead of `originGuard`. Kept out of `originGuard.ts` — that module owns origin validation only, this is response shaping.

- [x] **Minimal refactor gate** — no refactor beyond the two new helper functions and their call sites; nothing else in `devApi.ts` touched.

- [x] Implemented the minimal solution — `applyApiHeaders` (sets `X-Content-Type-Options: nosniff` + `Content-Security-Policy: default-src 'none'`) and `methodGuard` (405 + `Allow: GET, HEAD` for non-GET/HEAD) wired into all five handlers (`createProjectsHandler`, `createPlanHandler`, `createActiveHandler`, `createArchiveHandler`, `createEventsHandler`) in `viz/src/devApi.ts`, both called before `originGuard` so even guarded/error responses carry the headers.

- [x] Updated/added tests for non-trivial behavior — see Phase 3.

**Implementation Notes:**

`viz/src/devApi.ts`: +27 lines (two helpers), +2 lines per handler (5 handlers) for the guard calls. No changes to `originGuard.ts` or `vite.config.ts` — the global HTML-page CSP there is untouched; the new per-handler CSP is a separate, stricter policy scoped to `/api/*` JSON/text/SSE responses.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- --run src/devApi.test.ts`: 22/22 passed (10 new: 5× 405 rejection, 5× header-presence assertions folded into existing success-path tests).

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` and `npm --prefix viz run typecheck`: both clean.

- [x] **Quality assertions** — no duplication (single shared `applyApiHeaders`/`methodGuard` pair, not per-handler copies), no dead code, no unexplained complexity, no public-surface growth (helpers are module-private, not exported), no stale code-facing docs.

- [x] (frontend) N/A — server-side Vite dev-middleware change only, no UI surface touched.

**Testing Notes:**

New tests added to `viz/src/devApi.test.ts`: `makeReq` extended with a `method` option (defaults to `'GET'`); one "rejects a non-GET/HEAD request with 405" test per handler (mirrors the existing "rejects a cross-origin request with 403" pattern) plus nosniff/CSP header assertions folded into each handler's existing success-path test.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — updated §"Visualizer (`viz/`) dev-server scope": added a 405-rejection bullet and a paragraph documenting the new per-`/api/*`-response CSP + `X-Content-Type-Options: nosniff`, distinguishing it from the existing HTML-page CSP.
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — all four Acceptance criteria satisfied (see Final Summary); YAML `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and kept nested beneath `CORE-EPIC-421` (active parent — siblings `.5`/`.N` still open); tasknote moves to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Hardened all five `viz/src/devApi.ts` `/api/*` handlers: every response now carries `X-Content-Type-Options: nosniff` and a locked-down `Content-Security-Policy: default-src 'none'` (set before any guard clause, so 403/400/405/500 error bodies are covered too), and non-GET/HEAD requests are rejected with 405 + `Allow: GET, HEAD` ahead of origin validation. This closes the response-hardening half of the XSSI-adjacent gap `originGuard` leaves open by design (origin-less requests, e.g. `curl`, are still allowed through — that tradeoff is unchanged and documented in `originGuard.ts`).

- **Changed:** `viz/src/devApi.ts` (+27 lines: `applyApiHeaders` + `methodGuard` helpers; +2 lines × 5 call sites), `viz/src/devApi.test.ts` (+1 `method` option on `makeReq`, +5 new 405 tests, +5 header assertions folded into existing success tests), `SECURITY.md` (§"Visualizer dev-server scope" updated).
- **Verification:** `npm --prefix viz test -- --run src/devApi.test.ts` → 22/22 passed. `npm --prefix viz run lint` and `run typecheck` → both clean.
- **Refactor:** none beyond the two new helpers — extended the existing guard-clause pattern, no unrelated cleanup.
- **Documentation:** `SECURITY.md` updated to match; all other AI-referenced docs unaffected.
- **Maintainability:** the two helpers are single points of change for future API-wide header or method-policy adjustments, rather than per-handler duplication.

**Archived:** 2026-08-09
