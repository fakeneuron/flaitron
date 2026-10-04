---
title: file-followup-no-clear-cue
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-297 | file-followup-no-clear-cue

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Patch the post-closure copy-paste cue so that context-dependent skills (`/ft-file-followup`, `/ft-epic-discovery`) use "Run in this session:" instead of "Clear your session, then run:" — because those skills need current-conversation context to function.

## ⚡ Notes

**Relevance:** Proceed — direct fix for a confirmed broken UX pattern; 6 spec/skill files patched.
**Drift check:** SPEC.md step 3 at line 474, ft-task line 152, ft-micro-task line 122 all contained the hardcoded "Clear your session, then run:" shape with no carve-out. ft-close-epic had a carve-out but with inconsistent `✋ ACTION:` wording. ft-epic-discovery and SPEC/procedures/ft-task.md had no carve-out.
**Archive skim:** No prior tasknotes touch this pattern.
**Pattern survey:** Audit-family 🔍 flag in SPEC step 3 is the existing per-skill-type carve-out model — same inline-exception structure applied for context-dependent skills.
**Implementation:** Added "Context-dependent skills flag" paragraph to SPEC.md §"Post-closure protocol" step 3. Added inline exception sentence to copy-paste helper bullet in ft-task, ft-micro-task, ft-epic-discovery, and ft-close-epic SKILL.md files. Added context-dependent flag to SPEC/procedures/ft-task.md. Exception text is consistent: replace label line with `🔧 Run in this session:` (or `🧠`) when next-skill is `/ft-file-followup` or `/ft-epic-discovery`.
**Docs touched:** SPEC.md, SPEC/procedures/ft-task.md, claude/skills/ft-task/SKILL.md, claude/skills/ft-micro-task/SKILL.md, claude/skills/ft-epic-discovery/SKILL.md, claude/skills/ft-close-epic/SKILL.md — all updated.

## ✅ Recap

Added a consistent "context-dependent skills" exception to the post-closure copy-paste cue across 6 files: when the suggested next-skill is `/ft-file-followup` or `/ft-epic-discovery`, the label reads `🔧 Run in this session:` instead of `Clear your session, then run:`, preserving the conversation context these skills need to function.

**Archived:** 2026-06-06
