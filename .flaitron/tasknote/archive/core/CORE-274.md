---
title: slash-cmd-count-22
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: []
---

# CORE-274 | slash-cmd-count-22

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Bump the stale "21 slash commands" integer to "22" in `docs/MIGRATION.md` §1.2 and `docs/PLATFORMS.md` §"Worked example: Claude Code", and confirm no other integer references are missed.

## ⚡ Notes

**Relevance:** Proceed — direct doc-accuracy fix; integer drifted after `ft-update` was added in CORE-272.
**Drift check:** Three occurrences: `docs/MIGRATION.md:62` ("ships 21 slash commands"), `docs/PLATFORMS.md:175` ("21 `.md` slash-command stubs"), `docs/PLATFORMS.md:180` ("21 `SKILL.md` skill bodies"). All at expected paths. Grep of other docs found no additional integer-only references to the count.
**Archive skim:** No prior tasknotes touch these exact doc lines.
**Pattern survey:** Straight integer replacement; matches the pattern used when counts changed previously.
**Implementation:** Changed all three "21" → "22" occurrences. `claude/commands/` has 22 `.md` files; `claude/skills/` has 22 directories — both confirmed by `ls | wc -l`.
**Docs touched:** `docs/MIGRATION.md` and `docs/PLATFORMS.md` are the changed files; `README.md` and `SPEC.md` have no slash-command count integer.

## ✅ Recap

Bumped "21" → "22" in three places: `docs/MIGRATION.md:62` (§1.2 ships-count sentence) and `docs/PLATFORMS.md:175` + `docs/PLATFORMS.md:180` (Worked example: Claude Code section). The new 22nd entry is `ft-update`, added in CORE-272.

**Archived:** 2026-06-02
