---
title: audit-docs-skill-stale-doc-list
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-165 | audit-docs-skill-stale-doc-list

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Update `.claude/skills/ft-audit-docs/SKILL.md` to reflect 9 AI-referenced docs (add `docs/AGENT-NEUTRALITY.md` and `docs/PLATFORMS.md`) and change the "seven files" phrase to match.

## ⚡ Notes

**Relevance:** Proceed — straightforward doc sync; SKILL.md scope list drifted when CORE-157 added two docs to the canonical README.md §"AI-referenced docs"

**Drift check:** `.claude/skills/ft-audit-docs/SKILL.md` lines 22–29 (hardcoded scope list) and line 47 ("seven files") — confirmed stale against `_project/tasknote/README.md` §"AI-referenced docs" which now lists 9 files

**Archive skim:** no prior tasknotes touch this SKILL.md path

**Pattern survey:** two sibling entries already follow the pattern — single-line path entry inside the fenced `text` block; adding two more lines in the same form

**Implementation:** added `docs/AGENT-NEUTRALITY.md` and `docs/PLATFORMS.md` to the fenced scope list in §1 step 1; changed "seven files" → "nine files" on line 47

**Docs touched:** `_project/tasknote/README.md` §"AI-referenced docs" — no change; `.claude/skills/ft-audit-docs/SKILL.md` is itself the target (not an AI-referenced doc)

## ✅ Recap

Added `docs/AGENT-NEUTRALITY.md` and `docs/PLATFORMS.md` to the `all`/empty scope list in `.claude/skills/ft-audit-docs/SKILL.md` §1.1, and updated the "seven files" phrase on line 47 to "nine files". SKILL.md now matches the canonical 9-file list in `_project/tasknote/README.md` §"AI-referenced docs".

**Archived:** 2026-05-23
