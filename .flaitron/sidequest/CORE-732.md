---
title: pre-scaffold-note-recovery
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-07
parent: CORE-731
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

# CORE-732 | pre-scaffold-note-recovery

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

Pre-existing gaps found by CORE-731's review, all about notes written at or before the model gate:

1. On both runners the foreign-dirt gate runs before the existing-note refusal. An uncommitted in-progress note, or an uncommitted `--unattended` model-mismatch park, reads as foreign dirt and blocks continue/resume.
2. A note parked for model mismatch resumes through Step 3c at Phase 2, though no Phase 1 ever ran.
3. Attended Step 3b and micro Step 2 delete a sidequest stub without carrying its body into the new note.

## Resume anchor

CORE-731 Phase 3 external review (pass 3) was done and its fixes applied; next was Phase 4 closure.
