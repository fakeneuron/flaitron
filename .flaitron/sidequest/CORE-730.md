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

Once natabula NAT-379 lets flaitron sessions read agent homes (`read` roots for `~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills` in `~/.claude/path-access-roots`), check them for flaitron slugs that shadow repo-scoped wiring. CORE-729's skill/pin guard stops those runs in adopters. Also make `/ft-release` §7.1's "Self-wiring parity machine-global (advisory)" check actually run instead of logging "not run — path-access guard" every cut (CORE-613, CORE-674). Square `/ft-release`'s description ("Flaitron-self only (global symlink)") with PLATFORMS ("`ft-release` [is] never installed globally"); CORE-729's review flagged the contradiction. Also from that review: give the skill/pin guard stop an `--unattended` shape (`⏸ --unattended stop` cause / `park-reason:` code) in `claude/skills/ft-task/unattended-mode.md`.

## Resume anchor

CORE-729 Phase 2: guard, PLATFORMS paragraph, `/ft-update` Step 4.7, and the NAT-379 filing were done; next came Phase 3 verification.
