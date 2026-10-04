---
title: skill step-0 form drift
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-176 | skill step-0 form drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Rewrite `claude/skills/ft-epic-discovery/SKILL.md` Step 0 to the condensed "Two layouts. Pick by which file exists" form used by all other skills in the family, achieving house-style parity.

## ⚡ Notes

**Relevance:** Proceed — pure doc patch, no logic change, single-file scope; exactly the micro-tasknote niche.
**Drift check:** `claude/skills/ft-epic-discovery/SKILL.md` Step 0 (lines 13–31) still uses the old expanded bullet-list format; target condensed form confirmed at `claude/skills/ft-task/SKILL.md` Step 0.
**Archive skim:** no prior tasknotes touch ft-epic-discovery SKILL.md Step 0.
**Pattern survey:** condensed form identical across ft-task, ft-micro-task, ft-starter-task, ft-file-followup, ft-close-epic — `<root>` variable + flat path list + bail-on-neither. ft-epic-discovery adds one skill-specific note: read `<SPEC_DIR>/epic.md` after path resolution (kept).
**Implementation:** Replaced lines 13–31 of SKILL.md with the condensed two-layout block. Retained the "After resolving paths, Read `<SPEC_DIR>/epic.md`" sentence at the end of the block (skill-specific, load-bearing). Changed "Flowtron itself (self-hosted)" → "Flowtron self-host" and "Adopting project (typical)" → "Adopter project" to match the standard labels.
**Docs touched:** `claude/skills/ft-epic-discovery/SKILL.md` — Step 0 rewritten; no other AI-referenced docs changed.

## ✅ Recap

Rewrote ft-epic-discovery Step 0 from the old expanded format (separate sub-bullet path lists per layout) to the condensed `<root>`-variable form matching every other skill in the family. No behavioral change — same two layouts, same bail condition, same epic.md load directive. House-style parity achieved.

**Archived:** 2026-05-24
