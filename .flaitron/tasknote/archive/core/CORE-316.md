---
title: audit-repo-symlink-trailing-slash
status: completed
tags: []
created: 2026-06-13
due:
related-tasks: []
---

# CORE-316 | audit-repo-symlink-trailing-slash

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Recreate `.claude/skills/ft-audit-repo` symlink with a trailing slash to match all sibling skill symlinks in `.claude/skills/`.

## ⚡ Notes

**Relevance:** Proceed — exact fix described in PLAN.md, no re-scope needed.
**Drift check:** `.claude/skills/ft-audit-repo -> ../../claude/skills/ft-audit-repo` confirmed missing trailing slash; all other 22 skill symlinks use trailing-slash form.
**Archive skim:** CORE-294 (`ft-update-symlink-trailing-slash`) applied the identical fix via `rm` + `ln -s` — same pattern.
**Pattern survey:** All sibling skill symlinks use `../../claude/skills/<name>/` with trailing slash; recreate with same pattern.
**Implementation:** Deleted `.claude/skills/ft-audit-repo` and recreated as `../../claude/skills/ft-audit-repo/` with trailing slash.
**Docs touched:** no change — symlink fix only.

## ✅ Recap

Recreated `.claude/skills/ft-audit-repo` symlink with trailing slash `../../claude/skills/ft-audit-repo/` to match all 22 sibling skill symlinks.

**Archived:** 2026-06-13
