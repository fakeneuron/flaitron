---
title: migration-md ai-referenced-docs seed parity
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-175 | migration-md ai-referenced-docs seed parity

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Update the `§1.5` seed parenthetical in `docs/MIGRATION.md` to include `AGENTS.md` as the second entry, matching the 4-entry seed list used by `templates/tasknote-README.md` and `claude/skills/ft-new-project/SKILL.md`.

## ⚡ Notes

**Relevance:** Proceed — single-line doc patch to close a 3-entry vs. 4-entry seed list discrepancy surfaced by the 2026-05-24 audit.
**Drift check:** MIGRATION.md:115 confirmed — exact 3-entry parenthetical present at HEAD; no drift.
**Archive skim:** CORE-171 (2026-05-24 doc-drift sweep) surfaced this finding; no prior fix attempted. CORE-169 touched MIGRATION.md in a different section; no overlap.
**Pattern survey:** Matches the 4-entry seed form in `templates/tasknote-README.md:74-77` and `claude/skills/ft-new-project/SKILL.md:138` — inserting `AGENTS.md` as the second entry.
**Implementation:** Single-word insertion in `docs/MIGRATION.md:115` — added `AGENTS.md` between `README.md` and `CLAUDE.md` in the seed parenthetical.
**Docs touched:** `docs/MIGRATION.md` updated (the change itself); no AI-referenced docs need updating.

## ✅ Recap

Added `AGENTS.md` as the second entry in the `docs/MIGRATION.md §1.5` seed parenthetical, aligning it with the 4-entry seed list in `templates/tasknote-README.md` and `claude/skills/ft-new-project/SKILL.md`. Single-line doc patch; no other files touched.

**Archived:** 2026-05-24
