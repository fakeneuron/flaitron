---
title: global-install-path-placeholder
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-177 | global-install-path-placeholder

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace hardcoded `~/code/flowtron/` in MIGRATION.md §1.0 global install commands with a `<path-to-flowtron-checkout>` placeholder or substitution note so that adopters cloning flowtron to a non-standard path get correct instructions.

## ⚡ Notes

**Relevance:** Proceed — doc-only fix, scoped to MIGRATION.md §1.0; no design tradeoffs.
**Drift check:** MIGRATION.md §1.0 lines 38–39 confirmed hardcoded `~/code/flowtron/` before edit.
**Archive skim:** CORE-049 and CORE-109 touched MIGRATION.md but for unrelated concerns (token audit, SPEC terse pass); no prior guidance on path placeholders.
**Pattern survey:** `<skill>` placeholder already used on the same lines — extending that inline-placeholder shape with `<path-to-flowtron-checkout>`.
**Implementation:** Replaced `~/code/flowtron/` → `<path-to-flowtron-checkout>/` in the two `ln -s` commands in §1.0 (lines 38–39). Only §1.0 had user-specific hardcoded paths; other `~/code/flowtron/` occurrences (e.g., viz §) are out of scope.
**Docs touched:** `docs/MIGRATION.md` — §1.0 symlink code block updated (lines 38–39).

## ✅ Recap

Replaced the two hardcoded `~/code/flowtron/` paths in MIGRATION.md §1.0's global install `ln -s` block with `<path-to-flowtron-checkout>/`. No other files changed. Adopters cloning flowtron to a non-standard path now get a clear signal to substitute their actual checkout location.

**Archived:** 2026-05-24
