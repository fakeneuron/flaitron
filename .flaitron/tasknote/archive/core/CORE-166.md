---
title: audit-scaffold-fork-path
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-166 | audit-scaffold-fork-path

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the `description:` frontmatter in all 6 audit scaffold files to say `.claude/skills/<name>/` (no `ft-` prefix), matching SPEC §"Skill namespace" and MIGRATION.md §1.2.1.

## ⚡ Notes

**Relevance:** Proceed — targeted 6-file frontmatter patch, single field, no design tradeoffs
**Drift check:** All 6 `description:` lines referenced `.claude/skills/ft-audit*/` — confirmed stale against MIGRATION.md §1.2.1 `cp` command which strips `ft-` from the fork path.
**Archive skim:** No prior tasknotes touch audit scaffold `description:` frontmatter — net-new finding from 2026-05-23 audit.
**Pattern survey:** MIGRATION.md §1.2.1 installs: `cp .../claude/skills/ft-$SKILL/SKILL.md  .claude/skills/$SKILL/SKILL.md` — fork drops `ft-`. Each `description:` now matches that convention.
**Implementation:** Stripped `ft-` from the fork-path claim in `description:` frontmatter for all 6 audit scaffolds: `ft-audit`, `ft-audit-backend`, `ft-audit-docs`, `ft-audit-frontend`, `ft-audit-performance`, `ft-audit-security`. Single-field change per file; body content untouched.
**Docs touched:** `claude/skills/ft-audit*/SKILL.md` (6 files) — the targeted change; no other AI-referenced docs affected.

## ✅ Recap

Stripped `ft-` from the `description:` frontmatter fork-path claim in all 6 audit scaffold SKILL.md files, aligning with MIGRATION.md §1.2.1 which installs forks without the `ft-` prefix (`audit/`, `audit-backend/`, etc.).

**Archived:** 2026-05-23
