---
title: micro-close-epic-note-recovery
status: sidequest
priority: Low
pickup: next-chat
created: 2026-10-07
parent: CORE-732
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

# CORE-733 | micro-close-epic-note-recovery

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

CORE-732 made `/ft-task` route its own uncommitted note ahead of the foreign-dirt gate and resume a `model-mismatch` park at Phase 1. Two runners miss it:

1. `/ft-micro-task` refuses its own uncommitted `--unattended` model-mismatch park; only `/ft-task` resumes it, running full-template Phase 1 on a micro-template note.
2. `/ft-close-epic` still runs its foreign-dirt gate before its existing-audit-note check, so an uncommitted in-progress audit note stops as dirt.

## Resume anchor

CORE-732 Phase 3 external review pass 1 (findings 1 and 6); fixes for the other findings were being applied.
