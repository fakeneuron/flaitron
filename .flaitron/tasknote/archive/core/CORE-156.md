---
title: ft-audit-fork-priority-section-currency
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-156 | ft-audit-fork-priority-section-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Drop retired `Critical` from the ft-audit SKILL.md priority-section list at lines 54 and 89; rewrite both to reflect the current `High (with [!critical]) / Medium / Low / Future Opportunities` convention per SPEC §"Priority levels".

## ⚡ Notes

**Relevance:** Proceed — straight doc-currency fix; no design tradeoffs.
**Drift check:** Lines 54 and 89 of `.claude/skills/ft-audit/SKILL.md` confirmed to still carry `Critical` as of 2026-05-23; SPEC §"Priority levels" (line 602+) confirms `Critical` is retired and `[!critical]` flag replaces it under `## High`.
**Archive skim:** Checked archive/core/; CORE-007, CORE-008, CORE-017, CORE-037, CORE-042.1 matched on "Critical" — none block or pre-empt this change (all are historical).
**Pattern survey:** Pass 2 house-style list uses backtick-delimited tokens separated by ` / `; line 89 follows the same inline list pattern. Matching that shape.
**Implementation:** Two targeted edits to `.claude/skills/ft-audit/SKILL.md`: (1) line 54 — replace `Critical` / `High` / ... with `High` / ... + `[!critical]` note; (2) line 89 — drop `## Critical` / prefix + add `[!critical]` flag guidance.
**Docs touched:** `.claude/skills/ft-audit/SKILL.md` updated; no SPEC or README changes needed.

## ✅ Recap

Removed retired `## Critical` priority-section name from both pass-2 house-style check (line 54) and step-5 filing instructions (line 89) in `.claude/skills/ft-audit/SKILL.md`. Both now reference `## High` with a `[!critical]` flag note, matching SPEC §"Priority levels".

**Archived:** 2026-05-23
