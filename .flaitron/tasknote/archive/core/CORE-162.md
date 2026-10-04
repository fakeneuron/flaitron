---
title: viz-launch-style-drift
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-162 | viz-launch-style-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align MIGRATION.md §"Visualizer" launch commands with AGENTS-snippet.md §"Visualizer" style — separate lines, no `&&` chaining.

## ⚡ Notes

**Relevance:** Proceed — targeted doc-style fix matching the audit finding exactly.
**Drift check:** MIGRATION.md:317-318 used `&&` chaining; AGENTS-snippet.md:58-60 uses separate lines. Both paths confirmed live.
**Archive skim:** CORE-154 epic touched both docs (viz migration work); no conflicting guidance.
**Pattern survey:** AGENTS-snippet.md's separate-line style is the canonical shape; MIGRATION.md was the outlier.
**Implementation:** Changed MIGRATION.md §"Visualizer" code block from two `&&`-chained lines to three separate lines matching AGENTS-snippet.md. Kept `# one-time` comment on `npm install` since MIGRATION.md's migration-guide context benefits from it.
**Docs touched:** `docs/MIGRATION.md` — updated Visualizer code block style. `claude/AGENTS-snippet.md` — no change (source of truth, already correct).

## ✅ Recap

Changed MIGRATION.md's Visualizer code block from `&&`-chained lines to the separate-line style used in `claude/AGENTS-snippet.md`. Single-line doc patch — no design decisions or follow-up needed.

**Archived:** 2026-05-23
