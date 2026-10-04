---
title: self-host-claude-md
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: []
---

# CORE-514 | self-host-claude-md

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a repo-root `CLAUDE.md` compatibility symlink to `AGENTS.md` so flowtron's own agent guide auto-loads in Claude Code sessions in this repo.

## ⚡ Notes

**Relevance:** Proceed — matches PLAN.md line exactly; a symlink is a well-established pattern already used at `~/Code/CLAUDE.md -> AGENTS.md`.
**Best Practices Review:** N/A — single symlink creation, no code/logic, no abstraction or dependency-direction concerns.
**Drift check:** No drift. `AGENTS.md:106-107` still carries the "this repo is not an adopter checkout" guard cited in the PLAN.md line; no `CLAUDE.md` currently tracked at repo root.
**Archive skim:** `grep -l CLAUDE.md .flowtron/tasknote/archive/core/*.md` — hits are docs/adoption tasknotes (CORE-511 "point contributors to the .claude/ wiring recipe", CORE-509/510 keep-in-sync work) but none created or discussed a self-host root `CLAUDE.md` symlink; no direct precedent to reconcile against.
**Pattern survey:** Extends the existing `~/Code/CLAUDE.md -> AGENTS.md` symlink convention (relative symlink, same filename target) — no new shape introduced.
**Implementation:** Created relative symlink `CLAUDE.md -> AGENTS.md` at repo root via `ln -s`.
**Docs touched:** no change — this is the doc-loading fix itself; CORE-515 covers documenting the convention for adopters.

## ✅ Recap

Added `CLAUDE.md` as a relative symlink to `AGENTS.md` at the flowtron repo root, matching the `~/Code/CLAUDE.md -> AGENTS.md` convention. This closes the gap where Claude Code sessions in this repo never auto-loaded `AGENTS.md` (and its validation commands, editing rules, and self-host guard) because no `CLAUDE.md` was tracked.

**Archived:** 2026-08-30
