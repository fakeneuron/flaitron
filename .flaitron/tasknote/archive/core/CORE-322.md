---
title: update-adopters-node-guard
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: []
---

# CORE-322 | update-adopters-node-guard

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a Node ≥20 version guard at the top of `tools/update-adopters.mjs` so the script exits cleanly with a clear error on unsupported runtimes.

## ⚡ Notes

**Relevance:** Proceed — single-file guard, clear diff, no design tradeoffs.
**Drift check:** `tools/update-adopters.mjs` exists at expected path; structure unchanged from CORE-312 creation. No drift.
**Archive skim:** CORE-312 created the file; CORE-319 released it. Neither added a version check. No prior tasknotes touch this guard path.
**Pattern survey:** Existing error paths use `console.error()` + `process.exit()` (see `parseArgs` and `main`). Guard follows the same shape. Placed after the last `import` line (earliest valid position in ESM, since imports are hoisted) and before `const execFileAsync`.
**Implementation:** Added 3-line guard block after the import block (line 34 → after): checks `process.versions.node` major, emits `console.error` with current version in the message, exits with code 1. Matches file's existing error-reporting style.
**Docs touched:** No change — the file header comment describes usage/flags; a runtime requirement isn't listed in README.md §"AI-referenced docs" either. No doc update needed.

## ✅ Recap

Added a 3-line Node ≥20 guard to `tools/update-adopters.mjs` (after the import block). Uses `Number(process.versions.node.split('.')[0]) < 20` to check the major, `console.error` + `process.exit(1)` to fail cleanly — matching the file's existing error-reporting style.

**Archived:** 2026-06-14
