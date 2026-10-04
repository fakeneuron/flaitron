---
title: ft-task-copy-paste-skill-segment
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-167 | ft-task-copy-paste-skill-segment

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Expand the copy-paste line in `ft-task/SKILL.md` Step 6 from the narrow `/ft-task`-only form to the `/<ft-task|ft-micro-task|ft-starter-task>` alternation form matching SPEC §"Post-closure protocol" §3 and `ft-micro-task` Step 5.

## ⚡ Notes

**Relevance:** Proceed — SPEC §3 already has the canonical alternation form; `ft-task/SKILL.md` Step 6 is behind it, causing drift that misleads `ft-task` users into using `/ft-task` even when the next task is a micro or starter.
**Drift check:** `ft-task/SKILL.md` line 146 currently reads `/clear then /model <opus|sonnet> then /ft-task <NEXT-ID>` — confirmed present, confirmed narrow.
**Archive skim:** No prior tasknotes touch the copy-paste line specifically; no load-bearing history.
**Pattern survey:** `ft-micro-task/SKILL.md` Step 5 already uses the full alternation form. SPEC §3 is authoritative. Single-field update to match.
**Implementation:** Updated `claude/skills/ft-task/SKILL.md` line 146 — changed `/ft-task <NEXT-ID>` to `/<ft-task|ft-micro-task|ft-starter-task> <NEXT-ID>` and updated the trailing note to say "substitute the next task's PLAN-line `[model]` and the right slash command."
**Docs touched:** no change — `_project/tasknote/README.md` AI-referenced docs list does not include `ft-task/SKILL.md` as a separate doc entry.

## ✅ Recap

Updated `claude/skills/ft-task/SKILL.md` Step 6 copy-paste line to the `/<ft-task|ft-micro-task|ft-starter-task>` alternation form, aligning it with SPEC §"Post-closure protocol" §3 and `ft-micro-task/SKILL.md` Step 5. One line changed; no behavior change — purely brings the skill's copy-paste hint in sync with the SPEC contract.

**Archived:** 2026-05-23
