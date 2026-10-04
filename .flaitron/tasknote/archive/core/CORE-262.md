---
title: ft-release-viz-constant-rename
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [[FE-048]]
---

# CORE-262 | ft-release-viz-constant-rename

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Update the stale `FLOWTRON_VERSION` references in `claude/skills/ft-release/SKILL.md` to `VIZ_VERSION` (the actual constant name in `viz/src/ui/constants.ts` after the FE-048 rename) so the release bump process continues to correctly handle the viz header version pin.

## ⚡ Notes

**Relevance:** Proceed — mechanical doc fix in the release wiring skill. Directly from audit-docs finding #1 (High). Matches the pattern of prior wiring updates (CORE-221 added the pin, FE-048 renamed the const, now propagate to the skill). Fits micro.

**Drift check:** Confirmed in live files: `viz/src/ui/constants.ts:39` exports `VIZ_VERSION = 'v4.5.0'` (no FLOWTRON_VERSION left in non-archived). The ft-release/SKILL.md still has the old name in 4 places (acceptance, step 5 #4, and related prose was clean after prior). The grep in drift-check step searches for version strings (correct), git-add uses the filename (correct). No other live references outside archives/PLAN ticket.

**Archive skim:** CORE-221 (added the viz pin and wired the skill), CORE-260 (v4.5.0 release used it), FE-048 (the rename itself, documented the need to update the skill). Archived notes correctly used old name at the time; no conflicting decisions.

**Pattern survey:** Follows the same string-substitution pattern as the other 3 pins in the release recipe (SPEC, MIGRATION, SECURITY). The skill already has parallel structure for the 4 edits.

**Implementation:** Two precise replaces in the live skill:
- Acceptance list: `FLOWTRON_VERSION` → `VIZ_VERSION`
- Step 5 item 4: the assignment example `FLOWTRON_VERSION = ...` → `VIZ_VERSION = ...`

No other text in the skill used the old var name in a way that required change (prose uses the filename or "the fourth edit").

**Docs touched:** Only the on-demand skill itself (claude/skills/ft-release/SKILL.md). No changes to the AI-referenced prose docs list. (The PLAN ticket and this tasknote capture the audit.)

**Testing:** Verified post-edit with grep that no remaining `FLOWTRON_VERSION` in live non-archive files (only in this tasknote, the PLAN ticket describing the fix, and historical archives — as expected). The release logic for the 4 pins remains structurally identical.

## ✅ Recap

Fixed the release skill (CORE-262) so it references the current `VIZ_VERSION` constant (renamed in FE-048) instead of the stale `FLOWTRON_VERSION`. Two string updates in claude/skills/ft-release/SKILL.md (acceptance + step 5). Keeps the canonical 4-pin bump (SPEC + MIGRATION + SECURITY + viz constants) working for future releases. No other live drift found for the name. (Bundled with CORE-263 from same audit.)

**Archived:** 2026-06-02
