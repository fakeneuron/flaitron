---
title: epic-disc-git-mv
status: sidequest
priority: Low
pickup: next-chat
created: 2026-10-06
parent: CORE-717
---

# CORE-718 | epic-disc-git-mv

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-06)

## Idea

`claude/skills/ft-epic-discovery/SKILL.md` Step 9 closure says `git mv <tasknote dir>/<AREA>-<N>.1.md …/archive/…`, but Step 5 scaffolds the `.1` tasknote as an untracked file and nothing stages it before closure (Step 4's filing commit stages only PLAN.md). `git mv` on an untracked file fails "not under version control". Switch to plain `mv` (as `/ft-task` closure's archive move does) or stage first. Pre-existing; surfaced by the CORE-717 code review.

## Resume anchor

CORE-717 Phase 3 — applying the code-review findings, then Phase 4 closure.
