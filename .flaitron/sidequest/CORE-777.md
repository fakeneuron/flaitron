---
title: ignored-skill-link-paths
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-10
parent: CORE-775.2
---

# CORE-777 | ignored-skill-link-paths

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-10)

## Idea

`skillLinkPlan` / `applySkillLinkPlan` (`tools/update-adopters.mjs`) create renamed skill links at paths that may be gitignored. `git add` refuses them (exit 1), so an adopter that force-added its skill links under an ignored `.claude/` fails every bump crossing the skill-rename tag; since CORE-775.2 the rollback is clean, but the bump never lands. Fix at path selection: `git check-ignore` the planned paths in `skillLinkPlan` (flag or prune), or `git add -f` the planned link paths. Surfaced by CORE-775.2's external review.

## Resume anchor

CORE-775.2 was in Phase 3 grading its `/code-review medium` findings, with closure and commit next.
