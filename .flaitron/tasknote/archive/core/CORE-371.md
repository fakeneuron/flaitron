---
title: shared-workspace-helpers
status: completed
tags: []
created: 2026-07-26
due:
related-tasks: []
---

# CORE-371 | shared-workspace-helpers

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Resolve the `expandHome`/`workspaceRoot`/`isFile` duplication between `viz/src/workspace.ts` and `tools/update-adopters.mjs` — either extract a shared module or document the duplication as an intentional tradeoff.

## ⚡ Notes

**Relevance:** Proceed — still accurate; both files unchanged since the audit surfaced this.
**Best Practices Review:** `tools/update-adopters.mjs` has no `package.json` and is designed to run standalone via plain `node` (see its file-header comment: "not workflow machinery inside a project"). `viz/src/workspace.ts` is TypeScript, compiled/bundled through Vite. A shared module would either (a) be plain JS imported across the tools/↔viz/src boundary — new coupling between two currently-independent surfaces — or (b) be TS, requiring a loader tools/ doesn't have, breaking its zero-dep/plain-`node` guarantee. `expandHome`/`isFile` are verbatim identical; `workspaceRoot` differs in arg shape (env object vs root string) so isn't even a clean extraction candidate as-is. Chose to document rather than extract — same call CORE-366 made for the `**Version:**` regex pair, which already carries a mirroring comment ("Same Version-line contract viz/src/workspace.ts reads").
**Drift check:** PLAN.md's function names/paths match current code — `expandHome`/`isFile` are byte-identical (modulo TS types) between the two files; `workspaceRoot` differs only in signature. No drift.
**Archive skim:** CORE-366 (archive/core/CORE-366.md) previously hardened `update-adopters.mjs` and left the `**Version:**` regex pair intentionally duplicated with a linking comment rather than merging — direct precedent for this task's "document" branch.
**Pattern survey:** Extended the existing linking-comment convention already used for `pinnedVersion`/`readFlowtronVersion` (the Version-regex pair) — added a parallel comment above `expandHome`/`workspaceRoot`/`isFile` in both files.
**Implementation:** Added a comment block above `expandHome`/`workspaceRoot` in `tools/update-adopters.mjs` and a short pointer above `isFile`, explaining the duplication is intentional (zero-dep standalone tradeoff) and naming the mirror in `viz/src/workspace.ts`. Added the matching pointer comment above the three functions in `viz/src/workspace.ts`. No behavior change.
**Docs touched:** No change — no AI-referenced doc describes this duplication outside the two source files' own comments.

## ✅ Recap

Documented the `expandHome`/`workspaceRoot`/`isFile` duplication between `viz/src/workspace.ts` and `tools/update-adopters.mjs` as intentional (comment-only, no behavior change), following the same "document, don't merge" call CORE-366 made for the adjacent `**Version:**` regex pair — `tools/update-adopters.mjs` has no `package.json` and must stay runnable via plain `node`, so importing a shared module across the tools/↔viz/src boundary would either add new coupling or break that zero-dep guarantee. `workspaceRoot`'s differing arg shape (env object vs root string) also made it a poor extraction candidate as-is.

**Archived:** 2026-07-26
