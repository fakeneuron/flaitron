---
title: updater-legacy-only-report
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: []
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
---

# CORE-601 | updater-legacy-only-report

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Make `tools/update-adopters.mjs` report legacy-layout repos even when the workspace has zero `.flowtron/core` adopters, instead of the early return swallowing them.

## ⚡ Notes

**Relevance:** Proceed — PLAN.md line matches current code; the bug is real and the fix is scoped exactly as filed.
**Best Practices Review:** No new abstraction needed — moving an existing `if (legacy.length > 0)` block a few lines earlier in `main()`, above the `adopters.length === 0` early return. Dependency direction and responsibilities unchanged.
**Drift check:** `main()` in `tools/update-adopters.mjs` (around the `adopters.length === 0` early return, formerly lines 841-844, and the legacy-report block, formerly lines 859-863) still matches the PLAN.md description. No SPEC contradiction.
**Archive skim:** `archive/core/CORE-540.md` touched the same `discoverAdopters`/`main()` control-flow area (an unreadable root previously fell into the same `{adopters: [], legacy: []}` early-return path) and left an explicit note that the existing "empty workspace prints no-adopters message" test must keep passing for a genuinely empty, readable directory — confirmed still green. No other archived tasknote addresses the legacy-only-workspace gap itself.
**Declared scope:** `touches:` above — `tools/update-adopters.mjs` (fix) + `tools/update-adopters.test.mjs` (new test).
**Pattern survey:** Reused the existing `dry-run CLI (--root fixture)` describe block and its `runCli`/`mkdtemp` fixture pattern (same shape as the neighboring "empty workspace" test) rather than introducing a new test harness.
**Implementation:** In `main()`, hoisted the `if (legacy.length > 0) console.log(...)` block to run immediately after `discoverAdopters()`, before the `if (adopters.length === 0) { ...; return; }` early return (previously the legacy block ran only after the per-adopter loop, which the early return skipped entirely). Moved the block's `\n` from a leading to a trailing position so spacing still separates it from whatever follows. Added a `legacy-only workspace reports legacy repos, not just no-adopters` CLI test (zero adopters + one legacy-layout repo) asserting both the legacy line and the no-adopters line appear. Full suite (`node --test tools/update-adopters.test.mjs`): 54/54 pass. `node --check` clean on both touched files.
**Docs touched:** No change — no `.flowtron/tasknote/README.md` §"AI-referenced docs" entry covers `tools/update-adopters.mjs` behavior.

## ✅ Recap

Fixed `tools/update-adopters.mjs`'s `main()` so the legacy-layout report prints even in a workspace with zero `.flowtron/core` adopters, by hoisting the `if (legacy.length > 0)` block above the `adopters.length === 0` early return. Added a regression test (`legacy-only workspace reports legacy repos, not just no-adopters`) covering exactly that case. `touches:` matches `git diff --name-only` exactly: `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`. Verification: `node --test tools/update-adopters.test.mjs` → 54/54 pass; `node --check` clean on both files.

**Archived:** 2026-09-14
