---
title: doc-drift-skill-roster
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-226 | doc-drift-skill-roster

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Patch three doc-drift items from the 2026-05-30 audit: update README.md "six tasknote skills" count + add the worktree pair, add `gates` and `tasknote-selection` to the SPEC/ module list in README.md, and register `/ft-worktree-start`/`/ft-worktree-end` in SPEC.md §"Skill namespace".

## ⚡ Notes

**Relevance:** Proceed — three localized doc-drift fixes, no design tradeoffs.
**Drift check:** README.md line 44 still reads "the six tasknote skills"; line 119 SPEC/ list still missing `gates` and `tasknote-selection`; SPEC.md §"Skill namespace" still missing `/ft-worktree-start`/`/ft-worktree-end`. All targets confirmed live at HEAD.
**Archive skim:** no prior tasknotes touch these specific README/SPEC skill-roster lines.
**Pattern survey:** SPEC/ module list uses a simple parenthetical comma-separated form; SPEC.md §"Skill namespace" uses a backtick slug list; README bootstrapping text uses a parenthetical skill list. All three follow the existing pattern — insert missing entries in the same style.
**Implementation:** Three edits: (1) README.md line 44: "six" → "seven", added `/ft-worktree-start`/`/ft-worktree-end` to parenthetical as a compound pair entry. (2) README.md line 119: added `gates` and `tasknote-selection` to SPEC/ module list. (3) SPEC.md §"Skill namespace": added `/ft-worktree-start`, `/ft-worktree-end` after `/ft-debug`.
**Docs touched:** README.md — updated (two locations); SPEC.md — updated (one location). No other AI-referenced doc entries affected.

## ✅ Recap

Patched three doc-drift findings (#2, #3, #4) from the 2026-05-30 audit: README.md "six tasknote skills" → "seven" with the worktree pair added as a compound parenthetical entry; SPEC/ module list extended with `gates` and `tasknote-selection`; SPEC.md §"Skill namespace" now lists `/ft-worktree-start` and `/ft-worktree-end` alongside `/ft-debug`. All edits are drop-in insertions following existing prose/list patterns.

**Archived:** 2026-05-30
