---
title: viz-shared-pure-node-guard
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-622]
touches:
  - viz/eslint.config.js
  - .github/workflows/ci.yml
---

# CORE-622.4 | viz-shared-pure-node-guard

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Extend the ESLint `no-restricted-imports` `node:*` guard to the eight shared-pure modules, and add `npm --prefix viz run build` to CI `validate` so `vite build` actually runs.

## ⚡ Notes

**Relevance:** Proceed — task is well-scoped, mechanical: extend an existing ESLint block pattern plus a CI step addition, no design tradeoffs.
**Best Practices Review:** Extends the existing `no-restricted-imports` block shape already used for `src/ui/**` in `viz/eslint.config.js`; new block scoped to the eight shared-pure files by exact path. CI change follows the existing `- run:` step shape in `ci.yml`'s `validate` job (drift job's Pair H extracts `- run:` steps via grep, so the new step must keep that exact shape).
**Drift check:** PLAN.md line cites `viz/eslint.config.js`'s `no-restricted-imports` `node:*` pattern and the eight shared-pure modules from `viz/README.md` §"Architecture — three tiers" — both confirmed current (read `viz/eslint.config.js` lines 29-74, `viz/README.md` Architecture table). CI `validate` job confirmed to run test/typecheck/lint but not `build` (read `.github/workflows/ci.yml`). No contradiction with SPEC.
**Archive skim:** No prior tasknote in `archive/core/` touches `no-restricted-imports` or the shared-pure tier guard specifically — this is new ground within the CORE-622 epic (siblings CORE-622.2/.3 covered the other two drift-ratchet-gaps checks).
**Declared scope:** `viz/eslint.config.js`, `.github/workflows/ci.yml` (see YAML `touches:`).
**Pattern survey:** Reuses the existing `no-restricted-imports` `patterns` array shape (see the `src/ui/**` block) for the new shared-pure block, scoped by exact file path instead of a directory glob. CI step reuses the existing `- run: npm --prefix viz run <script>` line shape.
**Implementation:** Added a second `no-restricted-imports` ESLint block in `viz/eslint.config.js` scoped by exact `files:` path to the eight shared-pure modules (`parser.ts`, `tasknote.ts`, `fence.ts`, `sseChange.ts`, `storage.ts`, `viewMode.ts`, `visibilityPrefs.ts`, `projectStorage.ts`), restricting `node:*` imports the same way the existing `src/ui/**` block does. Added `- run: npm --prefix viz run build` to `.github/workflows/ci.yml`'s `validate` job, after the `lint` step, so `vite build` (and its `tsc --noEmit` prefix) actually runs in CI — closing the second half of the task rather than dropping the `build`/`preview` scripts, since running `vite build` is a real check (it would fail if a shared-pure or Node-only-tier module accidentally leaked into the browser bundle) where deleting the scripts would just remove the gap's visibility. **Verification receipt:** `npm --prefix viz run lint` → 0 (clean, no violations against either restricted-imports block); `npm --prefix viz run build` → 0 (`tsc --noEmit && vite build` succeeded, 317 modules transformed); `npm --prefix viz run typecheck` → 0. No structural-quality concerns — both edits extend existing shapes with zero new abstractions.
**Docs touched:** `viz/README.md` is not in `.flowtron/tasknote/README.md` §"AI-referenced docs" and needed no edit — its §"Architecture — three tiers" already documented the shared-pure tier's Node-free convention; this task only added the enforcement mechanism. No change to any AI-referenced doc.

## ✅ Recap

Extended `viz/eslint.config.js` with a `no-restricted-imports` block guarding `node:*` imports on the eight shared-pure modules (`parser.ts`, `tasknote.ts`, `fence.ts`, `sseChange.ts`, `storage.ts`, `viewMode.ts`, `visibilityPrefs.ts`, `projectStorage.ts`), mirroring the existing `src/ui/**` guard. Added `npm --prefix viz run build` to CI's `validate` job so `vite build` actually runs (kept the `build`/`preview` scripts rather than dropping them, since exercising the real build is the check the epic's discovery flagged as missing). `touches:` reconciles clean: `git diff --name-only` shows exactly `viz/eslint.config.js` and `.github/workflows/ci.yml`, matching the declared scope. Lint, typecheck, and build all pass locally (0/0/0). No `/ft-audit` follow-up expected — this closes CORE-622.4 cleanly within the epic.

**Archived:** 2026-09-20
