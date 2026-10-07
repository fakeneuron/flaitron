---
title: unattended-model-gate-order
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-07
parent: CORE-724.4
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

# CORE-725 | unattended-model-gate-order

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

Under `--unattended`, `/ft-task` runs its Step 1.5 model gate before the Step 2 foreign-dirt gate. The "concrete-model mismatch → scaffold, then park" path in `claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops" assumes the dirt gate has already passed, so it can write a blocked tasknote into a dirty tree. `/ft-micro-task` already runs pre-flight first. Fix: have `/ft-task` run `preamble.md` §"Pre-flight" before §"Model gate" (or gate the park on the dirt check), and repair the step-number citers.

## Resume anchor

CORE-724.4 Phase 3 had just finished (review pass 3 clean); next was Phase 4 closure.
