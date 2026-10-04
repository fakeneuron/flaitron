---
title: updater-main-decompose
status: completed
tags: [tooling, refactor]
created: 2026-07-25
due:
related-tasks: []
---

# CORE-364 | updater-main-decompose

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Extract a `reportResult()` helper from `tools/update-adopters.mjs` `main()` so the per-adopter print/count branching (and the summary line) lives in dedicated presentation helpers, leaving `main()` as pure orchestration.

## ⚡ Notes

**Relevance:** Proceed — Finding #2 (Low) from the 2026-07-25 ft-audit; `main()` mixes orchestration with a five-branch print/count block. Extraction is a pure structural refactor with no behavior change.
**Best Practices Review:** `main()` currently owns setup, discovery, the per-adopter check→print→count loop body, and the summary. The loop body's five status branches (`current`/`drift`/`skip`/`bump-apply`/`bump-dry-run`) each mutate `counts` and print — a distinct presentation responsibility. Pull it into `reportResult(adopter, result, latest, apply, counts)` (async — the apply branch awaits `applyBump`) and the summary into `reportSummary(counts, apply)`. No new duplication; both helpers are single-purpose and take explicit args (no shared closure state). Deferred: nothing else in the file needs touching.
**Drift check:** PLAN.md cites `main()` "five-branch print/count block + summary" — matches lines 398–447 exactly (counts init, per-adopter branch block 408–432, summary 441–447). No drift.
**Archive skim:** `grep -l update-adopters archive/core/*.md` → recent hits (CORE-360/361, CORE-324.4/5, CORE-351.*) concern the wiring-surface / gitlink-drift logic, not `main()` structure. No prior tasknote decomposes `main()`; nothing load-bearing for this refactor.
**Pattern survey:** File already factors every unit of logic into small exported top-level functions (`checkAdopter`, `applyBump`, `formatSkillsNote`, …). `reportResult`/`reportSummary` extend that established shape — top-level `export`ed functions, consistent with the module's convention.
**Implementation:** Extracted two exported helpers. `reportResult(adopter, result, latest, apply, counts)` — async; owns the five-branch print+count block, awaiting `applyBump` in the apply branch (same try/catch → `counts.failed` on error). `reportSummary(counts, apply)` — owns the trailing summary line + the dry-run re-run hint. `main()`'s loop body reduces to the `checkAdopter` try/catch plus `await reportResult(...)`; after the loop it prints legacy note then `reportSummary(...)`. Both exported for parity with the rest of the module (and unit-testability). Behavior byte-identical — verified by the CLI integration tests that spawn the real script.
**Docs touched:** no change — `tools/update-adopters.mjs` is not an AI-referenced doc; the header comment block describes CLI behavior, which is unchanged.

## ✅ Recap

Extracted two exported presentation helpers from `main()` in `tools/update-adopters.mjs` (net structure change; ~+8 LOC for two doc-commented helpers, loop body shrank from ~35 lines to one `await reportResult(...)`):

- `reportResult(adopter, result, latest, apply, counts)` — async; the five-branch `current`/`drift`/`skip`/`bump-apply`/`bump-dry-run` print+count block, awaiting `applyBump` in the apply branch (same try/catch → `counts.failed`).
- `reportSummary(counts, apply)` — the trailing summary line plus the dry-run re-run hint.

`main()` is now pure orchestration: parse → discover → loop(`checkAdopter` + `reportResult`) → legacy note → `reportSummary`. Behavior byte-identical; all 21 tests pass unchanged (the CLI integration tests spawn the real script, covering `main()` end-to-end). No deferred cleanup. Docs: no change (not an AI-referenced doc; CLI behavior unchanged).

**Archived:** 2026-07-25
