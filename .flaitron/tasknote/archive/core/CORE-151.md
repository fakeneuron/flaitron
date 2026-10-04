---
title: skill-bare-codefences
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-151 | skill-bare-codefences

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add language tags (`markdown` or `text`) to 6 bare code fence openers in `ft-epic-discovery/SKILL.md` and `ft-close-epic/SKILL.md` to satisfy house-style lint.

## ⚡ Notes

**Relevance:** Proceed — targeted doc hygiene exactly as described in PLAN.md.
**Drift check:** Will verify fence locations before editing; PLAN.md says 6 bare fences across two SKILL.md files.
**Archive skim:** no prior tasknotes touch these paths.
**Pattern survey:** Sibling SKILL.md files use ` ```markdown ` for markdown blocks and ` ```text ` for plain-text examples — will match.
**Implementation:** Added language tags to 6 bare code fence openers: `text` for the plain-text "Filing new epic:" block in ft-epic-discovery (line 68), `markdown` for the remaining 5 checklist/task-line blocks (ft-epic-discovery lines 84, 119, 129; ft-close-epic lines 83, 96). Closing fences left bare.
**Docs touched:** no change — `claude/skills/*/SKILL.md` are on-demand only, not in the cold-start sweep.

## ✅ Recap

Added language tags (`text` or `markdown`) to 6 bare code fence openers across ft-epic-discovery/SKILL.md and ft-close-epic/SKILL.md. Plain-text example block tagged `text`; all markdown checklist/task-line blocks tagged `markdown`. No design tradeoffs; purely mechanical doc hygiene.

**Archived:** 2026-05-23
