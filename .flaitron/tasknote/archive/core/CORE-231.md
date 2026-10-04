---
title: viz-csp
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-231 | viz-csp

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-30

## 🎯 Goal

Remove the inline theme-init script from `viz/index.html` (extract to an external `theme-init.js`) and add a `Content-Security-Policy` response header via Vite `server.headers`, closing the audit-security Finding #2.

## ✅ Acceptance

- [ ] Inline theme-init script removed from `viz/index.html`; logic lives in `viz/public/theme-init.js`, referenced as a render-blocking `<script src="/theme-init.js">` in `<head>` (no-FOUC behavior preserved).
- [ ] `Content-Security-Policy` response header set via `vite.config.ts` `server.headers`, strict on all directives except where Vite's dev server provably requires a relaxation (documented inline).
- [ ] Dev server still works end-to-end: app renders, theme resolves with no flash, HMR/React-refresh functions, SSE live-reload (`/api/events`) connects — no CSP violations in the browser console.

## 🧩 Subtasks

- [ ] Create `viz/public/theme-init.js` with the current IIFE theme-resolve logic.
- [ ] Replace the inline `<script>…</script>` in `viz/index.html` with `<script src="/theme-init.js"></script>` in the same `<head>` position.
- [ ] Add `server.headers['Content-Security-Policy']` to `vite.config.ts` with the agreed directive set + rationale comment.
- [ ] Verify in-browser: render, no theme flash, HMR works, SSE connects, console clean of CSP violations.
- [ ] `npm run typecheck` + `npm run lint` clean.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The inline script and the missing CSP both exist as described; the fix is well-scoped. One cross-cutting concern surfaced (Vite dev injects its own inline script) that affects the CSP design but not the task's validity.

- [x] Read relevant source files

- [x] **Archive skim** — no prior CORE tasknote touched `viz/index.html`, `vite.config.ts` CSP, or theme-init (grep over `archive/core/*.md` for `csp`/`content-security`/`theme-init`/`server.headers` returned no hits).

- [x] **Drift check** — paths match: inline IIFE present at `viz/index.html:8-20`; `viz/vite.config.ts` has a `server` block (port/strictPort/allowedHosts) but no `headers`; `viz/public/` exists (favicon.svg, LOGO.png) so a new `theme-init.js` there serves at `/theme-init.js`. No drift.

- [x] Asked clarifying questions (CSP approach — fired the Phase 1→2 gate; see below).

- [x] Subtasks above populated with concrete, ordered steps.

**Discovery Notes:**

- **Vite dev injects an inline script.** Empirically confirmed via `curl http://localhost:5120/`: `@vitejs/plugin-react` injects an inline `<script type="module">…injectIntoGlobalHook…</script>` (React-refresh preamble) into the served `<head>`. The `@vite/client` HMR script is external (`<script src="/@vite/client">`, covered by `'self'`), but the preamble is **inline**. So a `script-src 'self'` CSP with no inline allowance would break HMR/React-refresh in the dev server — independent of removing *our* inline theme-init script.
- **Consequence:** extracting the theme-init script removes the only inline script from the *production build* (`vite build` strips the dev preamble), but the *dev server* CSP must still permit Vite's inline preamble. Two ways: (A) `script-src 'self' 'unsafe-inline'`, or (B) a static `html.cspNonce` + matching `'nonce-…'` so script-src carries no `'unsafe-inline'`.
- **connect-src needs:** SSE `/api/events` (same-origin, `'self'`) + the Vite HMR websocket (`ws://localhost:5120` / `ws://127.0.0.1:5120`).
- **style-src needs `'unsafe-inline'` in dev:** Vite/Tailwind inject `<style>` at runtime.
- The dev server is the only real deployment surface (no production host); `vite preview` exists but is unused. Scoping the CSP to `server.headers` per the ticket; a stricter `preview.headers` CSP is a possible follow-up, not in scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing commented `server` block in `vite.config.ts` (port/allowedHosts already document security posture there); matched its module-level-const + explanatory-comment style for `DEV_CSP`/`DEV_CSP_NONCE`.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (config + static-asset change; behavior verified in-browser, no unit-testable logic added).

**Implementation Notes:**

- New `viz/public/theme-init.js` holds the unchanged theme IIFE; `viz/index.html` now references it via `<script src="/theme-init.js">` (render-blocking, same `<head>` slot → no-FOUC preserved).
- `vite.config.ts`: added module-level `DEV_CSP_NONCE = 'flowtron-dev'` + `DEV_CSP` string, `html: { cspNonce: DEV_CSP_NONCE }`, and `server.headers['Content-Security-Policy'] = DEV_CSP`.
- `DEV_CSP`: `default-src 'self'`; `script-src 'self' 'nonce-flowtron-dev'` (no `'unsafe-inline'`); `style-src 'self' 'unsafe-inline'` (dev runtime `<style>` injection); `img-src 'self' data:`; `connect-src 'self' ws://localhost:5120 ws://127.0.0.1:5120`; `object-src 'none'`; `base-uri 'self'`; `frame-ancestors 'none'`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no unit tests apply; verified in a real browser via Playwright instead.

- [x] Ran lint/type-check on changed code — `npm run typecheck` (tsc, covers `vite.config.ts`) ✅; `npm run lint` (eslint src) ✅.

- [x] (frontend) Visual confirmation — pure non-visual refactor (UI renders identically); verified programmatically: app rendered, **0 console errors / 0 CSP violations**, HMR + `@vite/client` loaded clean, SSE `/api/events` `onopen` fired, `theme=dark` reload applied the `dark` class before render (no-FOUC). 👁️ offered to the user below.

**Testing Notes:**

- `curl http://localhost:5120/`: CSP header present and exact; React-refresh preamble (inline), `@vite/client`, `/theme-init.js`, `/src/main.tsx` all carry `nonce="flowtron-dev"`.
- Playwright: navigate → 0 errors/warnings; SSE open OK; dark-theme reload path verified; localStorage reset afterward.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · **SECURITY.md: updated** (added a CSP bullet to the `viz/` dev-server scope list, which had drifted to omit the new header) · docs/AGENT-NEUTRALITY.md: no change · docs/PLATFORMS.md: no change · claude/CAPABILITIES.md: no change · docs/AGENT-COMPAT.md: no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` and tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Extracted the inline theme-init IIFE from `viz/index.html` to `viz/public/theme-init.js` and added a defense-in-depth `Content-Security-Policy` dev-server header via `vite.config.ts` `server.headers`. Discovery found Vite's dev server injects its own inline React-refresh preamble, so a strict `script-src 'self'` would break HMR; resolved with a static `html.cspNonce` so `script-src` stays free of `'unsafe-inline'`. Verified in-browser: render OK, 0 CSP violations, HMR + SSE connect, no-FOUC dark-theme path intact. Closes audit-security Finding #2 (Medium). Files: `viz/index.html`, `viz/public/theme-init.js`, `viz/vite.config.ts`, `SECURITY.md` (doc-drift).

**Archived:** 2026-05-30
