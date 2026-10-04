---
title: viz dev-server security pass
status: completed
tags: [security, viz, deps]
created: 2026-05-18
due:
related-tasks: []
---

# CORE-114 | viz dev-server security pass

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-18

## 🎯 Goal

Harden `viz/`'s Vite dev API against cross-site reads of tasknote/PLAN
content, close the underlying Vite/esbuild/ws CVEs surfaced by `npm audit`,
and document the prompt-injection / submodule-trust model for adopters.

## ✅ Acceptance

- [x] `/api/plan`, `/api/active`, `/api/archive`, `/api/events`, `/api/projects` reject requests with non-localhost `Origin` / `Referer` (verified via smoke test cases #3, #5)
- [x] `vite.config.ts` pins `server.allowedHosts` to `localhost`/`127.0.0.1` (verified via smoke test case #7: spoofed `Host: evil.com` → 403)
- [x] `npm audit` reports zero moderate-or-higher vulns under `viz/`
- [x] `npm test`, `npm run typecheck`, `npm run build` all pass post-bump (125/125 tests, typecheck clean, Vite v6.4.2 build clean)
- [x] `npm run dev` boots and the API endpoints behave correctly under Vite v6 (smoke-tested on port 5125 since 5120 was occupied by the user's running viz; behavior identical)
- [x] `SECURITY.md` exists at repo root, covers prompt-injection model + submodule trust + viz scope, linked from README

## 🧩 Subtasks

- [x] Add `originGuard()` helper + apply to `/api/plan`, `/api/active`, `/api/archive`, `/api/events`, `/api/projects` in `viz/vite.config.ts` (rejects non-localhost `Origin` or `Referer`; allows origin-less requests for terminal `curl` use)
- [x] Set `server.allowedHosts: ['localhost', '127.0.0.1']` in `viz/vite.config.ts`
- [x] `npm audit fix --force` under `viz/` (Vite v5.4.2→v6.4.2, Vitest v2.0.5→v4.1.6, `ws` patched); zero vulns remain
- [x] Ran `npm test` (125/125 pass under Vitest v4.1.6), `npm run typecheck` (clean), `npm run build` (Vite v6.4.2, clean)
- [x] Smoke-tested 7 cases against a live dev server: root HTML allowed, allowed-origin → 200, evil-origin → 403, no-origin → 200, evil-referer → 403, 127.0.0.1 origin → 200, spoofed Host → 403 (allowedHosts working)
- [x] Added `SECURITY.md` at repo root (Reporting via GitHub issues · Prompt-injection threat model · Submodule supply-chain trust · Viz dev-server scope)
- [x] Linked `SECURITY.md` from `README.md` "Documents" list
- [x] Doc-drift sweep complete (see Phase 4)

## 🔗 Related

(none — ad-hoc cybersecurity audit, no parent epic)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three sub-fixes target real, verified findings: (a) the four `/api/*` middlewares have no Origin/Referer/auth check (confirmed by reading `viz/vite.config.ts:105-169`); (b) `npm audit` reports 6 moderate vulns including esbuild GHSA-67mh-4wv8-2f99 ("any website can read dev-server responses") and Vite GHSA-4w7w-66w2-5vf9 (path traversal); (c) no `SECURITY.md` exists. Scope is bounded — viz dev-server only, no production-bundle impact.

- [x] Read relevant source files (`viz/vite.config.ts`, `viz/src/workspace.ts`, `viz/src/parser.ts`, `viz/src/tasknote-parse.ts`, `viz/src/ui/WikilinkMarkdown.tsx`, `viz/package.json`)
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — all cited paths/lines/versions still match (see Discovery Notes)
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Clarifications resolved:**
- **Disclosure path:** GitHub issues only (no email, no private advisories). Matches the existing CONTRIBUTING.md "issues welcome" tone for a solo-maintainer OSS project.
- **SECURITY.md sections:** Reporting · Prompt-injection threat model (skills read user-authored markdown) · Submodule trust (pin to annotated tags, not `main`) · Viz dev-server scope (single-user localhost). Skipping the markdown-renderer XSS posture section — adds maintenance surface for a defense-in-depth posture already enforced by `react-markdown` defaults.

**Discovery Notes:**

**Threat model (the "why now").** Two coupled defects compound: (1) the viz dev API exposes tasknote/PLAN content on `localhost:5120` with no Origin/Referer/auth check; (2) Vite ≤6.4.1 / esbuild ≤0.24.2 have advisories specifically allowing arbitrary websites to make requests to the dev server and read responses (GHSA-67mh-4wv8-2f99, GHSA-4w7w-66w2-5vf9). Together they mean any website a user visits during a `viz` dev session can read their tasknote bodies (which routinely contain internal design notes, sometimes credentials). The Origin check is the durable fix; the version bump closes the underlying CVE chain.

**Archive skim.**
- `CORE-098.9` (port-5120 migration) — last edit to `vite.config.ts`; structure unchanged since.
- `CORE-098.11` (Lighthouse a11y) — explicitly noted `/api/*` 404 under `vite preview`, confirming dev-only scope.
- `CORE-100` — re-confirmed `viz/src/workspace.ts:32` is the runtime scanner.
- No prior security/CORS/Origin work in archive — this is the first pass.

**Drift check.** Files cited in the PLAN.md description and the audit notes:
- `viz/vite.config.ts` — `/api/plan` at L111, `/api/active` at L128, `/api/archive` at L154, `/api/events` SSE at L92. All present.
- `viz/package.json` devDeps — `vite ^5.4.2`, `vitest ^2.0.5` (matches what npm audit reported as vulnerable).
- `npm audit` output reproduces the 6 moderate findings cited.
- No drift.

**Out-of-scope (decided in pre-tasknote conversation).** Symlink containment in `workspace.ts` (overkill — assumes attacker already has write access to user's home dir). Signed-tag enforcement on releases (process change, not code). Tightening user's personal `.claude/settings.local.json` (gitignored personal config, not the repo's concern).

**Markdown XSS check (verified safe, no code change needed).** `WikilinkMarkdown.tsx` uses `react-markdown` v10 with `remark-gfm`, no `rehype-raw` or `allowDangerousHtml`. v10's default `urlTransform` filters `javascript:`/`data:` hrefs. Raw HTML in tasknotes is escaped. Logged here so future audits don't re-investigate.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `viz/vite.config.ts` already uses an early-return helper pattern (`projectFromQuery` returns a discriminated `{error}` union; callers gate on it). `originGuard()` mirrors that shape: returns `boolean`, writes the 403 itself, callers do `if (!originGuard(req, res)) return;`. No higher-order wrapper introduced — keeps the diff minimal and matches sibling handlers' early-return style.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — covered by 7-case live smoke test (see Phase 3); no new unit test file added since the guard is a thin header check exercised end-to-end against a real Vite dev server.

**Implementation Notes:**

**`viz/vite.config.ts` — new constants and helper.** Added `DEV_PORT = 5120`, `ALLOWED_ORIGINS` (set of `http://localhost:5120`, `http://127.0.0.1:5120`), `ALLOWED_HOSTNAMES` (set of `localhost`, `127.0.0.1`), and `originGuard(req, res): boolean`. The guard's three-arm logic: (a) if `Origin` header is present, allowlist-check it; (b) if `Origin` is absent but `Referer` is present, parse its hostname and allowlist-check; (c) if both absent, allow (terminal `curl`, server-internal requests). DNS-rebinding is handled by `server.allowedHosts` at the Vite layer, not by this guard. The `DEV_PORT` constant is reused in the `server.port` config to keep the origin allowlist and the bound port in sync.

**Five middlewares guarded.** `/api/events` (SSE), `/api/projects`, `/api/plan`, `/api/active`, `/api/archive`. The PLAN.md description named four (missed `/api/projects` during the initial audit); guarding it too prevents leaking the project-name list to cross-origin callers. Each middleware does `if (!originGuard(req, res)) return;` as its first statement.

**`server.allowedHosts: ['localhost', '127.0.0.1']`** added under `server`. Vite v5.4+ and v6.x both honor this; the Vite-layer 403 fires before the request reaches application middleware, so the test path is "spoofed Host header → Vite's own block message," confirmed in smoke case #7.

**Dep bump.** `npm audit fix --force` walked Vite v5.4.2 → v6.4.2, Vitest v2.0.5 → v4.1.6, plus `ws` and `@vitest/mocker` patches. Lockfile re-resolved cleanly; 7 added, 8 removed, 18 changed packages, 0 vulnerabilities reported afterward. No code changes needed for the major bumps — flowtron-viz uses standard Vite plugin API surface only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — 125/125 pass under Vitest v4.1.6
- [x] Ran lint/type-check on changed code — `tsc --noEmit` clean both before and after the bump; `vite build` clean
- [x] (frontend) Visual confirmation deferred — `viz/vite.config.ts` is dev-server config, not UI. The visualizer's runtime UI surface is unchanged; the user's already-running viz instance (PID 58768 on :5120) continues to serve the pre-bump build and will pick up the new code on its next `npm run dev` restart.

**Testing Notes:**

**Smoke test, 7 cases.** Ran a temporary dev server on port 5125 (the user's normal viz was bound to 5120; rather than disrupt it, used `npm run dev -- --port 5125`):

| # | Request | Expected | Actual |
|---|---------|----------|--------|
| 1 | `GET /` no Origin | 200 (root HTML) | 200 ✓ |
| 2 | `GET /api/projects` with `Origin: http://localhost:5120` | 200 + JSON | 200 + project list ✓ |
| 3 | `GET /api/projects` with `Origin: https://evil.example.com` | 403 | 403 "Forbidden: cross-origin request" ✓ |
| 4 | `GET /api/projects` no Origin (curl default) | 200 | 200 ✓ |
| 5 | `GET /api/plan?project=flowtron` with `Referer: https://evil.example.com/foo` | 403 | 403 "Forbidden: cross-origin referer" ✓ |
| 6 | `GET /api/plan?project=flowtron` with `Origin: http://127.0.0.1:5120` | 200 + PLAN.md | 200 + PLAN content ✓ |
| 7 | `GET /` with `Host: evil.com` | 403 (Vite layer) | 403 "Blocked request. This host (\"evil.com\") is not allowed." ✓ |

All seven match expected behavior. Smoke server killed after run.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md` — **updated** (added SECURITY.md entry to Documents list)
  - `SPEC.md` — no change (workflow contract unaffected)
  - `docs/MIGRATION.md` — no change (port 5120/strictPort/scan-path docs all still accurate)
  - `claude/CLAUDE-snippet.md` — no change (same)
  - `docs/CONVENTIONS.md` — no change (no new conventions adopted/declined)
  - `CONTRIBUTING.md` — no change (SECURITY.md is threat-model surface, not a convention; lives in README "Documents" list, not CONTRIBUTING's "where conventions live" list)
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/CORE-114.md`
- [x] Recap drafted

**Final Summary:**

Hardened viz's Vite dev API against cross-site reads of tasknote/PLAN content (the cybersecurity-audit headline finding from 2026-05-18) and closed the underlying esbuild/Vite/ws CVE chain via a Vite v5→v6 / Vitest v2→v4 major bump. Added a new `originGuard()` helper to `viz/vite.config.ts` that rejects `/api/*` requests with a cross-origin `Origin` or `Referer` (allowing origin-less terminal `curl` use unchanged), and set `server.allowedHosts: ['localhost', '127.0.0.1']` so spoofed `Host` headers (DNS rebinding) are blocked at the Vite layer. Wrote `SECURITY.md` covering the three durable risks (prompt injection via user-authored markdown, submodule supply-chain trust, viz dev-server scope) with adopter-mitigation guidance for each, and linked it from README. **Files:** 1 modified config (`viz/vite.config.ts`, ~60 LOC net), 2 modified deps files (`viz/package.json`, `viz/package-lock.json`), 2 new/modified docs (`SECURITY.md` new, `README.md` +3 lines), 1 tasknote (this file, archiving). **Verification:** 125/125 viz tests pass under Vitest v4.1.6, `tsc --noEmit` clean, `vite build` clean under v6.4.2, 7-case live smoke test all green, `npm audit` reports 0 vulns.

**Archived:** 2026-05-18
