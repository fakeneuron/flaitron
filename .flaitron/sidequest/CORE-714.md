---
title: release-zsh-glob
status: sidequest
priority: Low
pickup: next-chat
created: 2026-10-04
parent: CORE-711.N
---

# CORE-714 | release-zsh-glob

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-04)

## Idea

`/ft-release` §7.1's standing context-budget block (`claude/skills/ft-release/step-7.1-standing-checks.md`) loops `for f in $surface` over glob rows (`claude/skills/*/SKILL.md`, `SPEC/*.md`, `SPEC/procedures/*.md`). zsh does not glob-expand an unquoted parameter, so under zsh those rows match nothing and the check passes silently. It is green today only because CI and the CORE-712 cut ran it under bash. §"On the globs" calls these globs "safe here", which is wrong for this reason. Fix the loop or require bash. Surfaced in CORE-712's Learnings and never filed.

## Resume anchor

CORE-711.N epic audit, Phase 2: after filing this park, finish the audit's findings record, then Phase 3 and closure.
