---
title: roster-covers-modules
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-932
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

# CORE-936 | roster-covers-modules

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

`pair_h` and `pair_t` only compare AGENTS.md §"Validation", `ci.yml` and the justfile `check` recipe to each other, so a module added under `tools/update-adopters/` and left off all three passes every drift check unchecked. `node --check` reads one file per call, so a glob is no fix. Add a drift check that diffs `ls tools/update-adopters/*.mjs` against the `node --check tools/update-adopters/` lines in the AGENTS.md roster, plus a self-test seed in `tools/drift-checks.test.mjs`. Surfaced by the CORE-932 External review.

## Resume anchor

Closing CORE-932: External review notes fixed or filed; closure checks and the commit are next.
