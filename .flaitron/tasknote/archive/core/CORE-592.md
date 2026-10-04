---
title: updater-self-skip-realpath
status: completed
tags: []
created: 2026-09-13
due:
related-tasks: []
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
---

# CORE-592 | updater-self-skip-realpath

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix `discoverAdopters`'s self-skip check so a case-only (or otherwise
differently-spelled) path to flowtron's own checkout still resolves to the
same real directory instead of silently failing the `===` string compare.

## ⚡ Notes

**Relevance:** Proceed — PLAN.md line still matches current code exactly (line 491, `resolve(repo) === FLOWTRON_REPO`); no scope drift.
**Best Practices Review:** Single-responsibility fix confined to the existing comparison; introduced a small private `realOrResolve` helper mirroring the file's established `isFile`/`isDir` try/catch-swallow pattern rather than adding a new dependency or abstraction layer.
**Drift check:** `tools/update-adopters.mjs:491` and the `FLOWTRON_REPO` definition at line 104 matched the PLAN.md description exactly; no contradiction with SPEC.
**Archive skim:** `archive/core/` has no prior tasknote touching `discoverAdopters` or the self-skip line (grepped `tools/update-adopters.mjs` across archive — no hits); no Related/supersedes pointers on the PLAN.md line.
**Declared scope:** `touches:` above — `tools/update-adopters.mjs` (fix) + `tools/update-adopters.test.mjs` (regression test).
**Pattern survey:** Extended the file's existing `isFile`/`isDir` try/catch-to-fallback shape for the new `realOrResolve` helper; no new pattern introduced.
**Implementation:** Imported `realpath` from `node:fs/promises`; added `realOrResolve(path)` (try `realpath`, fall back to `resolve()` on error, e.g. a broken symlink entry from `readdir`) next to `isFile`/`isDir`. `discoverAdopters` now compares `await realOrResolve(repo)` against a `flowtronReal` computed once per call via `realOrResolve(FLOWTRON_REPO)`, instead of the bare `resolve(repo) === FLOWTRON_REPO`. Exported `realOrResolve` for direct testing. Added a regression test using a symlink alias to `FLOWTRON_REPO` (deterministic on every filesystem, same defect shape as the case-insensitive-volume scenario the PLAN line names) proving `realOrResolve` unifies the alias and the target while the old bare `resolve()` compare would have missed it. Verification receipt: `node --test tools/update-adopters.test.mjs` → exit 0 (53/53 pass, including the new test); `node --check tools/update-adopters.mjs` → exit 0; `node --check tools/update-adopters.test.mjs` → exit 0. Structural quality: no duplication introduced, single responsibility preserved, no new external dependency.
**Docs touched:** No change — no `.flowtron/tasknote/README.md` §"AI-referenced docs" entries describe this internal helper.

## ✅ Recap

Fixed `tools/update-adopters.mjs`'s `discoverAdopters` self-skip check: it now
compares both sides through a new `realOrResolve` helper (tries
`fs.promises.realpath`, falls back to `resolve()` for a nonexistent path)
instead of a bare `resolve(repo) === FLOWTRON_REPO` string compare, so a
workspace root that reaches flowtron's own checkout via a differently-spelled
path (case difference on a case-insensitive volume, or a symlink) is still
correctly recognized and skipped. Added a deterministic cross-platform
regression test (symlink alias to `FLOWTRON_REPO`) since the actual
case-insensitive-volume scenario can't be reproduced on CI's case-sensitive
filesystem. `touches:` reconciliation: `git diff --name-only` matches the
declared scope exactly (`tools/update-adopters.mjs`,
`tools/update-adopters.test.mjs`). Full suite green (53/53); no behavior
change for any existing adopter-discovery path.

**Archived:** 2026-09-13
