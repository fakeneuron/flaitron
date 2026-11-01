---
title: workflow-replace-fence-aware
status: sidequest
priority: Medium
pickup: soon
created: 2026-11-01
parent: CORE-852.6
---

# CORE-853 | workflow-replace-fence-aware

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-01)

## Idea

`tools/update-adopters.mjs` `SECTION_END` (`/^#{1,2} /`) and `WORKFLOW_HEADING` (~:1002-1004, used by `replaceWorkflowSection` and the heading count in `followThrough`) match `#` lines inside code fences. An adopter Workflow section with a fenced `# comment` is truncated mid-fence (unbalanced fence committed); a fenced `## Workflow` trips the >1-heading skip. Shipped paste block has no inner fences, so only customized sections hit it. Fix in the tool (+ test), then mirror in `claude/skills/ft-update/SKILL.md` Step 3.5, which states the line-by-line rule for parity.

## Resume anchor

CORE-852.6 Phase 3 — external review graded; #3 parked here, re-review of the blocker fixes next.
