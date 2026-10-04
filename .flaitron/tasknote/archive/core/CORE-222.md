---
title: viz-watch-export-hygiene
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-222 | viz-watch-export-hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Document the `usePolling: true` rationale in `viz/vite.config.ts` and drop gratuitous `export` from internal-only symbols `ALLOWED_HOSTNAMES` and `ACTIVE_PROJECT_KEY`.

## ✅ Acceptance

- [ ] `usePolling: true` has an inline comment explaining the symlinked-workspace / FSEvents rationale (or the interval is tuned with justification)
- [ ] `ALLOWED_HOSTNAMES` and `ACTIVE_PROJECT_KEY` are unexported (no external consumers broken)

## 🧩 Subtasks

- [ ] Read `viz/vite.config.ts` and `viz/src/dev-server/middleware.ts` (or wherever the constants live) to confirm current state
- [ ] Verify no external imports of `ALLOWED_HOSTNAMES` or `ACTIVE_PROJECT_KEY` across the viz subtree
- [ ] Add comment to `usePolling: true` block
- [ ] Drop `export` keyword from both constants
- [ ] Run lint/type-check; confirm no import errors

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three items confirmed in current code exactly as described. `usePolling: true` at `vite.config.ts:53-57` lacks a rationale comment; `ALLOWED_HOSTNAMES` at `originGuard.ts:10` and `ACTIVE_PROJECT_KEY` at `projectStorage.ts:1` are exported with no external consumers.

- [x] Read relevant source files

- [x] **Archive skim** — prior tasknotes touching these files (CORE-098.*, CORE-115) cover viz embellishment and eslint setup. No load-bearing design decisions on these constants or the polling config.

- [x] **Drift check** — all three findings match current code exactly. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: 200ms polling interval is the chokidar default and reasonable — document rather than tune.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
- `ALLOWED_HOSTNAMES`: defined at `originGuard.ts:10`, only used at `originGuard.ts:33`. Zero external imports. Safe to drop `export`.
- `ACTIVE_PROJECT_KEY`: defined at `projectStorage.ts:1`, used at `projectStorage.ts:5,13`. Zero external imports. Safe to drop `export`.
- `usePolling: true` at `vite.config.ts:56`: watchPaths traverse project dirs discovered via `discoverProjects()` — in git-submodule adopter setups these can include symlinked dirs. FSEvents on macOS does not reliably fire inside symlinked directories; `usePolling` is the correct fix. 200ms interval is the chokidar polling default and appropriate here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `DEV_PORT` and `ALLOWED_ORIGINS` in `originGuard.ts` remain exported (they have external consumers: `vite.config.ts` imports `DEV_PORT`). Dropping `export` only from the two unused-externally constants follows this pattern.

- [x] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**
- `viz/vite.config.ts:55-57`: added 2-line comment above `usePolling: true` explaining FSEvents + symlinked-dir rationale.
- `viz/src/originGuard.ts:10`: dropped `export` from `ALLOWED_HOSTNAMES`.
- `viz/src/projectStorage.ts:1`: dropped `export` from `ACTIVE_PROJECT_KEY`.
- No tests needed: no logic changed, only a comment added and visibility narrowed on constants with no external consumers.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**
- `npm run typecheck`: clean (0 errors)
- `npm run lint`: clean (0 warnings/errors)
- `npm run test`: 163/163 passed
- No visual confirmation needed — no UI changes; this is config/source hygiene only.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 9 AI-referenced docs: no change (task only touched viz config/utility files).

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive.

- [x] Recap drafted

**Final Summary:**
Added a 2-line comment to `vite.config.ts` explaining the FSEvents/symlink rationale for `usePolling: true`; dropped `export` from `ALLOWED_HOSTNAMES` (originGuard.ts) and `ACTIVE_PROJECT_KEY` (projectStorage.ts) — both had zero external consumers. All 163 tests pass, lint and typecheck clean.

**Archived:** 2026-05-30
