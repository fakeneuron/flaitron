---
title: skill-bare-codefences-round2
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-151]
---

# CORE-155 | skill-bare-codefences-round2

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Tag all bare ``` openers in ft-task, ft-close-epic, ft-file-followup, ft-starter-task, and ft-release SKILL.md files as ```text or ```markdown to match SPEC + templates idiom.

## ⚡ Notes

**Relevance:** Proceed — direct continuation of CORE-151 pattern, same fix applied to the remaining 5 skill files.
**Drift check:** No code paths cited; scope is SKILL.md files in claude/skills/ — confirmed present.
**Archive skim:** CORE-151 (skill-bare-codefences) fixed ft-micro-task, ft-epic-discovery, ft-task-step1.5 fragments — same pattern applies here.
**Pattern survey:** CORE-151 established the idiom: bare openers preceding prose/command output → ```text; markdown examples → ```markdown. Following that same heuristic.
**Implementation:** Tagged 8 bare ``` openers across 3 files: ft-task (1), ft-starter-task (1), ft-release (6). ft-close-epic and ft-file-followup had zero openers (all bare fences were closers). Tags: ```text for plain-text blocks (warning message, task-line examples, version display, commit message, tag template, Skill() call); ```markdown for checklist-item blocks (ft-release acceptance criteria).
**Docs touched:** no change

## ✅ Recap

Tagged 8 bare ``` openers across ft-task, ft-starter-task, and ft-release SKILL.md files. ft-close-epic and ft-file-followup were already clean (only closers). All remaining bare fences are closers, which are correct as-is.

**Archived:** 2026-05-23
