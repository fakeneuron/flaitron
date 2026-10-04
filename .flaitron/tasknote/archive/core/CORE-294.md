---
title: ft-update-symlink-trailing-slash
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-294 | ft-update-symlink-trailing-slash

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the `.claude/skills/ft-update` symlink to include a trailing slash on its target, matching every other skill symlink in `.claude/skills/`.

## ⚡ Notes

**Relevance:** Proceed — confirmed: `ft-update -> ../../claude/skills/ft-update` (no slash); all 21 other skill symlinks end with `/`. Fix is a one-operation recreate.
**Drift check:** Symlink and target both confirmed present. `.claude/skills/ft-update` points to `../../claude/skills/ft-update` (29 bytes); correct form is `../../claude/skills/ft-update/` (30 bytes, matches siblings). No drift in task description.
**Archive skim:** CORE-130 (filed five filing-skill symlinks) and CORE-057.3 / CORE-091 / CORE-191 (symlink-adjacent) — none touch `ft-update` trailing slash. First occurrence of this specific fix.
**Pattern survey:** All sibling skill symlinks use `../../claude/skills/<name>/` with trailing slash — recreate with same pattern.
**Implementation:** Deleted and recreated `.claude/skills/ft-update` with trailing slash via `rm` + `ln -s`.
**Docs touched:** no change — symlink fix only.

## ✅ Recap

Recreated `.claude/skills/ft-update` symlink with trailing slash `../../claude/skills/ft-update/` to match all sibling skill symlinks.

**Archived:** 2026-06-06
