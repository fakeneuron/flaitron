---
title: migration-worktree-stale-forwardref
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-229 | migration-worktree-stale-forwardref

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the redundant + stale paragraph at MIGRATION.md:63 that re-introduces the worktree pair (already covered at line 61) and claims "Full wiring...lands in the worktree epic's adopter-surface child" — work that shipped in CORE-215.5.

## ⚡ Notes

**Relevance:** Proceed — the stale forward-reference is live in MIGRATION.md and will mislead adopters.
**Drift check:** MIGRATION.md:63 still contains the exact paragraph described; line 61 remains the canonical worktree mention. No drift from PLAN.md description.
**Archive skim:** No prior CORE tasknotes specifically address this paragraph; CORE-215.5 was the worktree-wiring epic that made line 63 stale.
**Pattern survey:** Doc-only deletion — no code touched. Removing a complete sentence/paragraph is the standard pattern for stale forwardref cleanup.
**Implementation:** Removed the standalone paragraph at line 63 that re-introduced `/ft-worktree-start` + `/ft-worktree-end` and contained the stale "Full wiring for the pair lands in the worktree epic's adopter-surface child" claim. Line 61 already covers the pair fully.
**Docs touched:** `docs/MIGRATION.md` — removed redundant/stale paragraph.

## ✅ Recap

Deleted the standalone paragraph at MIGRATION.md line 63 that redundantly re-introduced the worktree pair and held a stale future-tense forwardref (already shipped as CORE-215.5). Line 61 remains the single canonical mention of the worktree utilities.

**Archived:** 2026-05-30
