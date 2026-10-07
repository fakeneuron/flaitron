---
title: global-skill-conflicts
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-07
parent: CORE-729
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

# CORE-730 | global-skill-conflicts

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

Once natabula NAT-379 lets flaitron sessions read agent homes (`read` roots for `~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills` in `~/.claude/path-access-roots`), check them for flaitron slugs that shadow repo-scoped wiring. CORE-729's skill/pin guard stops those runs in adopters. Also make `/ft-release` §7.1's "Self-wiring parity machine-global (advisory)" check actually run instead of logging "not run — path-access guard" every cut (CORE-613, CORE-674).

## Resume anchor

CORE-729 Phase 2: guard, PLATFORMS paragraph, `/ft-update` Step 4.7, and the NAT-379 filing were done; next came Phase 3 verification.
