---
title: flag-surface-sync
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: []
---

# CORE-399 | flag-surface-sync

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Surface three existing skill flags (`--deep` on `ft-epic-discovery`, `--high` on `ft-file-followup`'s `--park`, `--worktree` on `ft-goal-task`) in the reference docs that describe them but currently omit them.

## ⚡ Notes

**Relevance:** Proceed — six named files, no design tradeoffs; matches the micro-tasknote threshold.
**Best Practices Review:** Doc-only edits following each doc's existing parallel-structure conventions (e.g. `— which carries debug mode behind --debug —` em-dash pattern in `docs/PLATFORMS.md`; `--fast`/`-f` row shape in `claude/CAPABILITIES.md`). No refactor needed.
**Drift check:** All six PLAN.md-cited files still exist at the cited paths; `--deep`, `--park`'s `--high`, and `--worktree` flags confirmed still live in their owning skills' `SKILL.md` step logic before editing the mirrors. No contradiction with SPEC.
**Archive skim:** `.flowtron/tasknote/archive/core/CORE-397.md` / `CORE-395.md` (SOP-currency sweeps) touched `CAPABILITIES.md`/`PLATFORMS.md` previously for cross-doc consistency — no load-bearing constraint found that changes this task's approach.
**Pattern survey:** Extended each doc's existing per-flag documentation shape rather than inventing a new one — `claude/CAPABILITIES.md` got a new table row shaped like the `--fast`/`-f` and `--debug` rows; `docs/PLATFORMS.md` got the same "— which carries X behind `--flag`" em-dash clause already used for `--debug` and `--park`; `docs/WORKTREES.md` got a one-line cross-reference after the Start flow steps; `ft-epic-discovery`'s frontmatter got an "Invoke with … args" sentence matching `ft-task`/`ft-goal-task`/`ft-file-followup`'s existing frontmatter phrasing; `ft-file-followup`'s `argument-hint` and `claude/AGENTS-snippet.md`'s park-mode clause both just gained `--high` alongside the already-listed `--low|--med|--fut`.
**Implementation:** Edited 6 files: `claude/skills/ft-epic-discovery/SKILL.md` (frontmatter description — added `--deep` + Invoke-with sentence; `.claude/` mirror is a hardlink, updated automatically), `claude/commands/ft-file-followup.md` (`argument-hint` — added `--high`; `.claude/` mirror is a symlink), `claude/AGENTS-snippet.md` (park-mode clause — added `--high`), `claude/CAPABILITIES.md` (new `--worktree` table row), `docs/PLATFORMS.md` (Claude Code row — added `--worktree` em-dash clause), `docs/WORKTREES.md` (Start flow — added `ft-goal-task --worktree` alternate-entry-point note). `codex/` mirrors intentionally left untouched — not named in the PLAN.md line, and codex's `ft-epic-discovery`/`ft-file-followup`/`AGENTS-snippet.md` don't carry any of these flag mentions today (checked via grep), a pre-existing translation-layer gap out of this task's scope.
**Docs touched:** `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, `docs/WORKTREES.md`, `claude/AGENTS-snippet.md` — all directly updated as the task's deliverable, not incidental drift.

## ✅ Recap

Added the three missing flag mentions across their six reference-mirror locations: `--deep` (ft-epic-discovery frontmatter), `--high` (ft-file-followup argument-hint + `claude/AGENTS-snippet.md`), and `--worktree` (new row in `claude/CAPABILITIES.md`, em-dash clause in `docs/PLATFORMS.md`, alternate-entry-point note in `docs/WORKTREES.md`). Each edit matched the doc's existing per-flag documentation shape (no new patterns introduced). `.claude/` mirrors under `commands/` and `skills/` sync automatically (symlink / hardlink respectively) — no separate edit needed there. `codex/` mirrors left untouched; they don't currently carry any of these flags and weren't named in the PLAN.md line.

**Archived:** 2026-08-02
