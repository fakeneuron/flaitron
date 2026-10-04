---
title: devApi error hygiene
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-425, CORE-425.3, FE-047, CORE-421.4]
---

# CORE-425.4 | devApi error hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-425]]

## 🎯 Goal

Every `/api/*` error response from the viz dev server carries an explicit `Content-Type: text/plain; charset=utf-8`, and the 400 body no longer reflects the caller-supplied `?project=` value back on the wire.

## ✅ Acceptance

- [x] Every `/api/*` error response body — 400 (bad/missing `?project=`), 403 (origin/referer reject), 405 (non-GET/HEAD), 500 (fs failure), 503 (SSE capacity) — carries `Content-Type: text/plain; charset=utf-8`.
- [x] The 400 body no longer reflects the caller-supplied `?project=` value; it returns a fixed `unknown project` string, with the requested name logged to server stderr only (`[devApi] unknown project: …`), per the [[FE-047]] precedent.
- [x] Success-path responses are unchanged: `application/json` for `/api/projects`, `/api/active`, `/api/archive`; `text/plain; charset=utf-8` for `/api/plan`; `text/event-stream` for `/api/events`. The `nosniff` + `default-src 'none'` headers from [[CORE-421.4]] still apply to every response including errors.
- [x] `viz/src/devApi.test.ts` asserts the error Content-Type across all five handlers' guard paths and asserts the 400 body contains no caller-supplied text; `viz/src/originGuard.test.ts` asserts it on the three 403 paths.
- [x] `SECURITY.md` §"Visualizer (`viz/`) dev-server scope" reflects the typed error bodies and the non-reflecting 400.

## 🧩 Subtasks

- [x] Add `viz/src/apiResponse.ts` — a leaf module exporting `endPlain(res, status, body)` that sets the status code, `Content-Type: text/plain; charset=utf-8`, and ends the response
- [x] Convert `originGuard.ts`'s three 403 sites to `endPlain`
- [x] Convert `devApi.ts`'s error sites to `endPlain`: 405 (after the `Allow` header), 3× 400, 3× 500, 1× 503
- [x] Change `projectFromQuery`'s unknown-project branch to log the name to stderr and return the fixed `{ error: 'unknown project' }`
- [x] Add/extend tests in `devApi.test.ts` (error Content-Type per handler; 400 body no longer echoes `ghost`) and `originGuard.test.ts` (403 Content-Type)
- [x] Update `SECURITY.md` §"Visualizer (`viz/`) dev-server scope"
- [x] Run targeted tests (`devApi`, `originGuard`) + full suite + lint + typecheck

## 🔗 Related

- [[CORE-EPIC-425]] — parent epic (viz near-miss diagnostics)
- [[CORE-425.3]] — predecessor epic child (near-miss heading diagnostic)
- [[FE-047]] — established the "log raw detail to stderr, return generic text" precedent for these same handlers
- [[CORE-421.4]] — added `applyApiHeaders` + `methodGuard`; the header/guard scaffolding this task extends

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are still live in current code. `viz/src/devApi.ts` writes ten `res.end()` bodies of which eight are error paths (405 L38; 400 L81/L106/L150; 500 L91/L134/L160; 503 L174) and **none** sets a `Content-Type` — only the success paths do (L66, L86, L129, L155, L177). `projectFromQuery` (L50) still returns `` `unknown project: ${name}` ``, reflecting the caller's `?project=` value onto the wire. Matches the PLAN.md line exactly.

- [x] Read relevant source files — `viz/src/devApi.ts` (all five handler closures, `applyApiHeaders`/`methodGuard`, `projectFromQuery`), `viz/src/originGuard.ts` (three 403 sites, L22/L33/L38), `viz/src/devApi.test.ts` (fake `res` harness — `setHeader` lowercases into `state.headers`, so Content-Type assertions work as-is), `viz/src/ui/useProjectData.ts` (error handling: only `res.ok` + `res.status` are consumed — **no caller reads an error body**, so no UI ripple), `viz/vite.config.ts` (middleware wiring), `SECURITY.md` §"Visualizer (`viz/`) dev-server scope".

- [x] **Best Practices Review** — Touched responsibility: writing an error response is currently duplicated inline at eleven sites across two modules (8 in `devApi.ts`, 3 in `originGuard.ts`), each repeating `statusCode` + `end`. Adding a `Content-Type` to each inline would make that duplication worse (11 × 3 lines), so the in-scope refactor is a single `endPlain(res, status, body)` helper. Dependency direction: `devApi.ts` already imports `originGuard.ts`, so the helper cannot live in `devApi.ts` without a cycle; it goes in a new leaf module `viz/src/apiResponse.ts` that both import — the same small-leaf-util shape as the existing `fsSafe.ts`. Deferred: nothing; the 405's `Allow` header and the SSE preamble stay at their call sites since they're path-specific, not a shared concern.

- [x] **Archive skim** — `grep -l 'devApi\|originGuard' archive/core/*.md` → 12 hits; two are load-bearing. **[[FE-047]]** (`archive/fe/FE-047.md`, "viz-api-error-path-leak") is the direct precedent for the 400 half: it stripped raw fs `error.message` from the three 500 bodies and established the convention "raw detail to `console.error` on stderr, short generic string on the wire," explicitly pattern-matched to `archiveCache.ts` and `originGuard.ts`. The unknown-project fix here is the same move applied to reflected *input* rather than leaked *paths*. **[[CORE-421.4]]** ("devApi response hardening") added `applyApiHeaders` + `methodGuard` and wrote the SECURITY.md sentence that this task must keep true — "set ahead of any guard clause so even 403/400/405/500 error bodies carry them." That claim covers `nosniff` + CSP but is silent on `Content-Type`; this task closes that asymmetry rather than contradicting it. No prior decision anywhere accepts untyped error bodies as intentional.

- [x] **Drift check** — Code: every cited line matches (`devApi.ts` 8 untyped error `res.end()`s, `projectFromQuery` interpolating `name` at L50, `originGuard.ts` three 403s). SPEC: no SPEC contract governs viz HTTP response shaping; `SPEC.md` §"What flowtron does NOT provide" scopes viz as the singular read-only-visualizer carve-out, and this is hardening inside that carve-out, not new surface. PLAN.md line: matches verbatim. **One in-scope doc surface**: `SECURITY.md:147-152` enumerates the per-`/api/*` response headers and must be updated for `Content-Type` — not drift, but a deliverable this task owns.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — Two design forks asked, both answered. **(1) 403 scope:** the three 403 bodies live in `originGuard.ts`, outside the PLAN line's literal "devApi" wording. Operator chose **include them via a shared `endPlain` helper in a new `viz/src/apiResponse.ts` leaf module** — so the acceptance is "every `/api/*` error body is typed," not "every `devApi.ts` error body." **(2) unknown-project body:** operator chose **generic wire body + stderr log of the requested name**, following [[FE-047]] over the smaller no-log variant. Assumption carried forward: `projectFromQuery`'s existing `missing ?project=<name>` string is a static usage hint with no caller input in it, so it is left unchanged.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The two halves are independent fixes sharing one file.** The Content-Type half is a pure hygiene sweep across eleven call sites; the reflection half is a two-line change inside `projectFromQuery`. Neither depends on the other, and neither has a UI consumer — `useProjectData.ts:44-46` reads only `res.ok` / `res.status` and never touches an error body, so the wire text is operator-facing (curl / devtools) only.

**Why `Content-Type` matters even with `nosniff`.** [[CORE-421.4]] already sends `X-Content-Type-Options: nosniff` on every response, which blocks MIME sniffing — so this is not an XSS fix. It is correctness: a body with no declared type leaves charset undefined, so a non-ASCII project name (or any future non-ASCII error text) renders per client guesswork, and `nosniff` on a *typeless* response is a rule with no subject. Declaring `text/plain; charset=utf-8` is what makes the existing `nosniff` meaningful on error paths.

**Test-harness note.** `devApi.test.ts`'s fake `res.setHeader` lowercases header names into `state.headers`, and existing tests already assert `state.headers['content-type']` on success paths — the new error-path assertions need no harness change. `originGuard.test.ts` will need checking for whether its fake `res` records headers at all.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced a scope deviation (the fix reaches `originGuard.ts` + a new leaf module, beyond the PLAN line's literal "devApi"), but it was the operator's own selection in the clarifying ask moments ago → skip 🛠️ rather than re-ask for approval already granted.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Two existing shapes governed the work. `devApi.ts` already factors cross-cutting response concerns into small helpers applied at the top of every handler (`applyApiHeaders`, `methodGuard` — both from [[CORE-421.4]]); `endPlain` is the same shape one level down, factoring the *terminal* write instead of the *preamble*. The 400-body change extends [[FE-047]]'s log-detail/return-generic split verbatim rather than inventing a second convention for reflected input. New module `apiResponse.ts` matches the existing `fsSafe.ts` leaf-util precedent (small, single-export, no dependencies) — chosen over hosting the helper in `originGuard.ts` (wrong responsibility) or `devApi.ts` (would cycle, since `devApi` already imports `originGuard`).

- [x] **Minimal refactor gate** — One refactor, required by Acceptance: eleven inline `statusCode` + `end` pairs became `endPlain` calls. Doing it inline instead would have triplicated a `setHeader('Content-Type', …)` line across eleven sites in two files. Deferred: the 405's `Allow` header and the SSE preamble stay at their call sites — they're path-specific, not a shared response concern, and folding them into the helper would grow its signature for one caller each. No unrelated cleanup taken.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`viz/src/apiResponse.ts` (new, 13 LOC).** Single export `endPlain(res, status, body)` — sets the status code, sets `Content-Type: text/plain; charset=utf-8`, ends. Header comment records why the type matters given `nosniff` and why the module is a leaf (keeps the `devApi` → `originGuard` import direction acyclic).

**`viz/src/originGuard.ts` (+3/-7).** The three 403 sites (cross-origin `Origin`, cross-origin `Referer`, malformed `Referer`) each collapse from a `statusCode` + `end` pair to one `endPlain` call. Bodies unchanged.

**`viz/src/devApi.ts` (+17/-17).** Eight error sites converted: `methodGuard`'s 405 (the `Allow` header still set first), the three 400s, the three 500s, and the SSE 503. `projectFromQuery`'s unknown-project branch now logs `` `[devApi] unknown project: ${name}` `` to stderr and returns the fixed `{ error: 'unknown project' }` — a four-line comment records the FE-047 lineage. The `missing ?project=<name>` string is untouched (static usage hint, no caller input). All five success paths untouched.

**`viz/src/devApi.test.ts` (+72/-5).** A `PLAIN_TEXT` constant backs the new assertions. Content-Type assertions added to all five handlers' 403 tests and all five 405 tests. Three new tests: a typed 400 for a missing `?project=`, a typed 500 (project descriptor pointed at a nonexistent `planPath`), and a typed 503 (eleventh SSE client against the cap of ten). Two rewritten: the `projectFromQuery` unit test now asserts the generic return *and* the stderr call via `vi.spyOn(console, 'error')`, and the handler-level 400 test asserts the body is `unknown project` and `not.toContain('ghost')`. The `console.error` spies double as output suppression, so the suite stays quiet.

**`viz/src/originGuard.test.ts` (+9/-1).** The fake `res` gained a `setHeader` that lowercases into a new `state.headers` — without it `endPlain` would throw. Content-Type assertions added to the three 403 tests.

**`SECURITY.md` (+10).** Two new bullets in §"Visualizer (`viz/`) dev-server scope": one for the typed error bodies (naming `endPlain`/`apiResponse.ts` and why `nosniff` needs a declared type to pin), one for the never-reflect-request-input rule.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — No avoidable duplication: the change *removes* eleven copies of an inline status-plus-end pair, and the one remaining near-repetition (`endPlain(res, 500, '…')` in three catch blocks) carries a distinct message per handler and is not worth abstracting further. No dead code. No unexplained complexity — `endPlain` is three statements with a comment stating why the header matters. Public-surface growth is one exported function in a new leaf module, the minimum needed to reach both `devApi.ts` and `originGuard.ts` without a cycle. Code-facing documentation: `devApi.ts`'s `API_SECURITY_HEADERS` comment ("even 403/400/500 error bodies carry it") was re-read and remains accurate; `SECURITY.md` was the one stale surface and is updated in this diff.

- [x] (frontend) Asked the user for visual confirmation — **N/A in the visual sense**; the diff touches the dev server's HTTP layer and renders nothing. Replaced with a stronger live end-to-end check: the running dev server on port 5120 was probed with `curl -D -` on every changed path (see Testing Notes). Operator-facing confirmation is bundled into the 📦 gate rather than asked separately.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Targeted: `npm --prefix viz test -- devApi originGuard` → **34/34** across 2 files.
- Full suite: `npm --prefix viz test` → **300/300 across 19 files** (297 before; +3 net new tests).
- `npm --prefix viz run lint` → clean. `npm --prefix viz run typecheck` → clean.
- **Live end-to-end verification.** Started the dev server (`npm --prefix viz run dev`, port 5120) and probed every changed path with `curl -sS -D -`. All five error classes returned `Content-Type: text/plain; charset=utf-8` alongside the pre-existing `X-Content-Type-Options: nosniff`:

  | Request | Status | Content-Type | Body |
  |---|---|---|---|
  | `/api/plan?project=ghost%3Cscript%3E` | 400 | `text/plain; charset=utf-8` | `unknown project` |
  | `/api/plan` (no `?project=`) | 400 | `text/plain; charset=utf-8` | `missing ?project=<name>` |
  | `POST /api/plan?project=flowtron` | 405 | `text/plain; charset=utf-8` (+ `Allow: GET, HEAD`) | `Method Not Allowed` |
  | `/api/archive` w/ `Origin: https://evil.example.com` | 403 | `text/plain; charset=utf-8` | `Forbidden: cross-origin request` |
  | `/api/active` w/ `Referer: not a url` | 403 | `text/plain; charset=utf-8` | `Forbidden: malformed referer` |

  The URL-encoded `<script>` payload in the first row is **absent from the response body** and appears only on server stderr (`[devApi] unknown project: ghost<script>` in the dev log) — the reflection half verified end-to-end rather than only in a unit test. Success paths re-checked unchanged: `/api/plan` → 200 `text/plain; charset=utf-8`, `/api/projects` → 200 `application/json`. Dev server stopped afterwards; `git status --porcelain` shows only this task's files.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries walked; `grep -lniE 'devApi|originGuard|apiResponse|error body|Content-Type'` across the roster returns exactly one hit. **`SECURITY.md` — updated** (two new bullets in §"Visualizer (`viz/`) dev-server scope": typed error bodies via `endPlain`, and the never-reflect-request-input rule; ships in this diff). **No change** to the other 13: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — none describes viz HTTP response shaping.

- [x] Closed — all 5 `## ✅ Acceptance` criteria ticked with evidence above; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept 2-space nested beneath the still-active `CORE-EPIC-425` (sibling `.N` audit remains open); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

The viz dev server's `/api/*` error responses now declare what they are and stop repeating what they were asked. Every error body — 400, 403, 405, 500, and the 503 SSE-capacity reject — carries `Content-Type: text/plain; charset=utf-8`, which is what gives the `X-Content-Type-Options: nosniff` header from [[CORE-421.4]] a type to actually pin; before this, eleven error sites across two modules ended the response with no declared type or charset at all. Separately, a request for an unknown `?project=` no longer reflects the caller's value back on the wire: the body is a fixed `unknown project` and the requested name goes to server stderr instead, extending [[FE-047]]'s log-detail/return-generic split from leaked filesystem paths to reflected request input.

**Changed files (6, +112/-29).** `viz/src/apiResponse.ts` (new, 13 LOC) — the shared `endPlain(res, status, body)` helper, a leaf module so the existing `devApi` → `originGuard` import direction stays acyclic. `viz/src/devApi.ts` (+17/-17) — eight error sites converted; `projectFromQuery` logs-and-generalizes the unknown-project case. `viz/src/originGuard.ts` (+3/-7) — three 403 sites converted. `viz/src/devApi.test.ts` (+72/-5) — Content-Type assertions on all five handlers' 403 and 405 paths, three new typed-error tests (400-missing, 500, 503), two rewritten for the non-reflecting 400. `viz/src/originGuard.test.ts` (+9/-1) — fake `res` gained `setHeader`; Content-Type asserted on the three 403s. `SECURITY.md` (+10) — two new scope bullets.

**Verification.** Targeted `devApi`/`originGuard` → 34/34. Full suite → **300/300 across 19 files** (297 before). Lint + typecheck clean. Live: the running dev server was probed with `curl -D -` on all five error classes and both success paths — every error carried the new Content-Type, and a `?project=ghost%3Cscript%3E` payload appeared nowhere in the response body while landing verbatim on stderr. Success paths (`text/plain` for `/api/plan`, `application/json` for `/api/projects`) unchanged.

**Refactors.** One, required by Acceptance: eleven inline `statusCode` + `end` pairs collapsed into `endPlain` calls rather than triplicating a `setHeader` line at each site. Deferred by choice: the 405's `Allow` header and the SSE preamble stay at their call sites as path-specific concerns.

**Documentation.** `SECURITY.md` updated (in this diff); the other 13 AI-referenced docs verified unaffected.

**Maintainability effect.** Error-response shaping now has exactly one implementation. A future handler cannot ship an untyped error body without deliberately bypassing the helper, and the invariant is asserted per-handler in tests rather than resting on eleven copies staying in sync.

**Archived:** 2026-08-09
