---
title: ft-release-pin-grep-drift
status: completed
tags: []
created: 2026-06-11
due:
related-tasks: []
---

# CORE-311 | ft-release-pin-grep-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the three MIGRATION-pin locator grep pattern cites in ft-release SKILL.md Steps 4–5 — the documented pattern `(e.g., v` predates the backticked pin style and returns zero hits on current MIGRATION.md.

## ⚡ Notes

**Relevance:** Proceed — single-file doc patch to the skill's locator cites; exactly scoped.

**Drift check:** Verified the actual MIGRATION.md pin at line 382 (§3.8 Final pin verification): `` (e.g., `v5.6.0`) `` — backtick wraps the version number. Old grep `(e.g., v` returns zero hits (confirmed); `` grep -n 'describe --tags' docs/MIGRATION.md `` finds line 382 uniquely. No structural drift from the task description.

**Archive skim:** CORE-310 (last release tasknote) confirms the finding: "ft-release SKILL's dead MIGRATION-pin grep locator … filed as [[CORE-311]]." No prior tasknotes address this specific cite.

**Pattern survey:** Line 151 (SECURITY.md cite) uses the same SKILL.md pattern: `(grep for \`release tags (e.g.\`) and bump \`(e.g. \`vX.Y.Z\`)\` → ...`. The MIGRATION.md cites should follow the same locator-then-bump shape. Used `describe --tags` as the locator (unique to line 382; avoids nested-backtick rendering problem in code spans).

**Implementation:** Updated three lines in `claude/skills/ft-release/SKILL.md`:
- L136 (Step 4 Discovery, source-read): locator changed from `(e.g., v` → `describe --tags`
- L138 (Step 4 Discovery, drift-check): example format updated from `(e.g., vX.Y.Z)` → `` (e.g., `vX.Y.Z`) ``
- L150 (Step 5 Execution, edit #2): locator + bump format updated to match actual MIGRATION.md style

**Docs touched:** no change — only `claude/skills/ft-release/SKILL.md` modified (the skill doc being fixed is not an AI-referenced project doc).

## ✅ Recap

Updated three stale MIGRATION-pin locator cites in ft-release SKILL.md (Steps 4–5). The old grep `(e.g., v` returned zero hits because MIGRATION.md line 382 uses a backtick-quoted version `` (e.g., `v5.6.0`) ``. Replaced the locator with `describe --tags` (uniquely identifies line 382) and corrected the bump example format to reflect the actual backtick style.

**Archived:** 2026-06-11
