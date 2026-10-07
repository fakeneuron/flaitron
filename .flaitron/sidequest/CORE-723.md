---
title: release-dangling-link-scope
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-07
parent:
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

# CORE-723 | release-dangling-link-scope

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

`/ft-release` §7.1's local dangling-symlink scan is scoped `-name 'ft-*'`, so it
structurally cannot see `.claude/skills/audit` — the one wiring link with an
unprefixed name, because `SPEC/layout.md` §"Skill namespace" requires forks to
drop the prefix. [[CORE-721]] moved the overlay body to tracked
`.flaitron/audit-overlay/` and made that link the only path to it, so a missing
or stale link now breaks `/audit` silently with no gate catching it. Decide
whether §7.1 should scan unprefixed local forks generally or name this one path;
surfaced by CORE-721's external review.

## Resume anchor

CORE-721 closed and committed (`9b9ff3a`); the session was at its post-closure
next-move suggestion, recommending `/ft-task CORE-720`.
