---
title: epic-discovery-stale-cites
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-150 | epic-discovery-stale-cites

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the stale PLAN.md line-number pin (lines 29-34 → CORE-EPIC-057 anchor) and the ghost CORE-057.5 child reference in `ft-epic-discovery` SKILL.md Steps 4 and 9.

## ⚡ Notes

**Relevance:** Proceed — targeted stale-reference fixes in a single SKILL.md file; no design tradeoffs.
**Drift check:** Line 94: `lines 29-34` pin is stale — CORE-EPIC-057 cohort now lives at lines 148-158 in PLAN.md. Line 226: `/ .5` ghost confirmed — CORE-057.5 didn't exist when the skill was authored during CORE-057.3.
**Archive skim:** No prior tasknotes touch ft-epic-discovery stale cite fixes.
**Pattern survey:** Line-number pins in SKILL.md prose are always fragile; fix uses the stable `CORE-EPIC-057 cohort` task-ID anchor, consistent with how sibling skills reference examples.
**Implementation:** Two edits to `.claude/skills/ft-epic-discovery/SKILL.md`: (1) line 94 — replace `_project/PLAN.md\` lines 29-34 precedent` with `CORE-EPIC-057 cohort in \`_project/PLAN.md`; (2) line 226 — drop `/ .5` from `CORE-057.1 / .2 / .5 closure precedents`.
**Docs touched:** no change — ft-epic-discovery SKILL.md is a skill contract, not an AI-referenced doc entry.

## ✅ Recap

Two targeted edits to `.claude/skills/ft-epic-discovery/SKILL.md`: (1) Step 4 line 94 — replaced stale `lines 29-34` pin with stable `CORE-EPIC-057 cohort` anchor; (2) Step 9 line 226 — dropped ghost `/ .5` from `CORE-057.1 / .2 / .5 closure precedents` (CORE-057.5 was a forward reference when the skill was authored during CORE-057.3). No behavioral changes; doc-only fix.

**Archived:** 2026-05-23
