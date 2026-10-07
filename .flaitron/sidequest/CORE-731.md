---
title: unattended-park-existing-note
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-07
parent: CORE-725
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-731 | unattended-park-existing-note

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

Under `/ft-task --unattended`, the Step 1.5 concrete-model-mismatch "scaffold, then park" write (`claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops") runs before Step 2's file-state branch. It can therefore overwrite an existing starter or in-progress tasknote, and it skips Step 3b's sidequest-stub retirement. `SPEC/procedures/ft-task.md` §2 already says "Create a note only when absent; preserve existing starter/blocked content". Port that rule, plus stub retirement, to the Claude fragment. Found by the CORE-725 external review. Pass 2 added two more points. First, `/ft-task`'s Step 2 in-flight refusal also runs after the model gate, so an attended retag can land and then be refused, leaving PLAN.md dirt behind. `/ft-micro-task` checks for an existing note inside Pre-flight. Likely fix: move the existing-note checks ahead of Step 1.5. Second, fix `SPEC/gate-postures.md` §"Pre-scaffold stops" ("before the tasknote exists") in the same change.

## Resume anchor

CORE-725 Phase 3 external review had returned 9 findings; review fixes were applied, and next was re-running Phase 3 and then closure.
