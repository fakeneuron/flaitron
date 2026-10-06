---
title: vitest-jsdom-pool
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: [CORE-EPIC-716]
touches:
  - viz/vite.config.ts
---

# CORE-716.4 | vitest-jsdom-pool

[← PLAN.md](../../../PLAN.md) · ✅ Completed

## 🎯 Goal

Try `pool: 'vmThreads'` in the viz Vitest config; keep it only if 587/587 pass and the run is faster.

## ⚡ Notes

**Relevance:** Proceed — Vitest still reports jsdom created 29× (~47% of run) at baseline.
**Best Practices Review:** N/A — one config key in the existing `test` block; no responsibilities or dependencies touched.
**Drift check:** no drift — `test.maxWorkers: '50%'` block in `viz/vite.config.ts` matches the PLAN line; no `vitest.config.*` exists, so the setting belongs in `vite.config.ts`.
**Archive skim:** no load-bearing findings — earlier vitest notes (CORE-639.x, CORE-674) concerned timeouts/worker caps, which stay unchanged.
**Declared scope:** touches `viz/vite.config.ts`.
**Pattern survey:** extends the existing `test` block, same commented-setting style as `testTimeout` / `maxWorkers`.
**Implementation:** added `pool: 'vmThreads'` plus a two-line comment after `maxWorkers`. Baseline (5 runs): 9.4 / 8.3 / 6.8 / 7.9 / 9.5s, median ~8.3s, environment ~47%. vmThreads (4 runs): 5.8 / 6.0 / 8.5 / 8.5s, median ~7.3s, environment ~20%. Machine noise is wide; the environment-share drop is the consistent signal. Kept. Known vmThreads caveat: possible memory growth on much larger suites; not observed here.
**Verification receipt:** `npm --prefix viz test` ×4 → exit 0, 587/587 each; `npm --prefix viz run typecheck` → exit 0; `npm --prefix viz run lint` → exit 0. Structural assertions: N/A (config only).
**Docs touched:** no change.

## ✅ Recap

Added `pool: 'vmThreads'` to the viz Vitest config (`viz/vite.config.ts`, +3 lines). 587/587 tests pass across 4 runs; jsdom's share of the run fell from ~47% to ~20% and the median wall-clock from ~8.3s to ~7.3s (noisy). Typecheck and lint clean. Declared scope matches `git diff --name-only` (plus PLAN.md and this archived note).

**Archived:** 2026-10-06
