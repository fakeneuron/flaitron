---
title: epic-disc-git-mv
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: [CORE-717]
touches:
  - claude/skills/ft-epic-discovery/SKILL.md
---

# CORE-718 | epic-disc-git-mv

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Make `/ft-epic-discovery`'s `.1` archive move work on the untracked tasknote it scaffolds.

## ⚡ Notes

**Relevance:** Proceed — `claude/skills/ft-epic-discovery/SKILL.md` Step 9 still says `git mv` on a note Step 5 creates untracked and nothing stages before Step 10; `git mv` refuses untracked files.
**Best Practices Review:** N/A — one closure-step sentence; no code surface.
**Drift check:** no drift — the only `git mv` in `claude/skills` / `SPEC` outside ft-release is this Step 9 closure bullet. Plan matches the PLAN line and SPEC §"🚀 Phase 4: Closure" (archive move, stamp before move per `/ft-task`'s pre-move gate).
**Archive skim:** CORE-129 / 205.1 / 254.4 / 255 mention `git mv` as their own closure motion (tracked files or pre-scaffold-commit era); none records a decision that epic-discovery must use `git mv`. CORE-717 filed this.
**Declared scope:** `claude/skills/ft-epic-discovery/SKILL.md`
**Pattern survey:** matches `/ft-task` and `/ft-micro-task` closure, which archive with plain `mv`; also moved the `Archived:` stamp ahead of the move, matching their pre-move stamp order.
**Implementation:** Step 9 "Move the `.1` tasknote" bullet: stamp first, then plain `mv`, with a one-clause reason. Sidequest stub `.flaitron/sidequest/CORE-718.md` retired. Receipt: `grep -c 'git mv' claude/skills/ft-epic-discovery/SKILL.md` → 1 (only inside the "not `git mv`" explanation); `npm --prefix viz test` → 0; CI context-budget block (bash) → 0. No duplication / dead text introduced.
**Docs touched:** README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md — no change.

## ✅ Recap

One bullet in `claude/skills/ft-epic-discovery/SKILL.md` Step 9 now stamps `Archived:` then archives the `.1` note with plain `mv` (the note is untracked, so `git mv` failed). Sidequest stub deleted. Scope: declared 1 path; diff also covers the PLAN flip, the stub deletion, and this archive — workflow paths, no undeclared deliverable.

**Archived:** 2026-10-06
