---
title: template-git-c-align
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-178 | template-git-c-align

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace `cd _project/flowtron && git show vX.Y.Z` with `git -C _project/flowtron show vX.Y.Z` in `templates/tasknote-README.md:14` to align with MIGRATION.md and AGENTS-snippet.md house style.

## ⚡ Notes

**Relevance:** Proceed — exact single-line doc fix matching PLAN.md description; no design tradeoffs.
**Drift check:** `templates/tasknote-README.md:14` confirmed at HEAD with the old `cd` form — no drift from task description.
**Archive skim:** CORE-125 applied the identical `cd → git -C` fix to `claude/CLAUDE-snippet.md:51`; same pattern, different file. No overlap with current task.
**Pattern survey:** `git -C <dir> show vX.Y.Z` is the established house style; CORE-125 + MIGRATION.md + AGENTS-snippet.md all use it.
**Implementation:** Replaced `cd _project/flowtron && git show vX.Y.Z` → `git -C _project/flowtron show vX.Y.Z` in `templates/tasknote-README.md:14`.
**Docs touched:** `templates/tasknote-README.md` — updated to house style; no AI-referenced docs changed.

## ✅ Recap

One-line change in `templates/tasknote-README.md:14`: replaced the `cd && git show` form with `git -C` to match the house style established in CORE-125 and used consistently in MIGRATION.md and AGENTS-snippet.md.

**Archived:** 2026-05-24
