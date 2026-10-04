---
title: migration-cursor-commit
status: completed
tags: []
created: 2026-08-18
due:
related-tasks:
  - CORE-438
  - CORE-446
touches:
  - docs/MIGRATION.md
---

# CORE-447 | migration-cursor-commit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-438]] [[CORE-446]]

## 🎯 Goal

Add a Cursor-only staging note to MIGRATION §1.6 so `git add` does not assume `.claude/` paths a Cursor-only install never creates.

## ⚡ Notes

**Relevance:** Proceed — the §1.6 Claude `git add` block still fails as written for the Cursor-only path §1.2 documents; High leftover from CORE-438.
**Best Practices Review:** §1.6 is a Claude-default consumer of the 22-path symlink set (CORE-329.2 / `/ft-release` §7.1). Cursor wiring commands are SSOT in `cursor/AGENTS-snippet.md` (CORE-091 / PLATFORMS "don't duplicate"). In-scope: pointer prose after the Claude block. Deferred: Codex `.agents/skills/` sibling note (not in this PLAN line); `ft-new-project` Step 7 is Claude bootstrap and already points at §1.6.
**Drift check:** PLAN cites MIGRATION §1.6; heading still `### 1.6 Commit` at `docs/MIGRATION.md:261`; 22 `.claude/` paths in the fence; Cursor-only install is §1.2; snippet still says `git add .cursor/`. No SPEC contradiction.
**Archive skim:** [[CORE-438.4]] added Cursor install + verify (§1.2 / §1.7) and left §1.6 Claude-only — this is that leftover. [[CORE-329.2]] made §1.6 a counted Claude-path consumer; do not insert `.cursor/` paths into the fence. [[CORE-091]] / PLATFORMS SSOT: point at the snippet, don't copy the `ln -s` list.
**Pattern survey:** Same pointer shape as §1.2 "open `cursor/AGENTS-snippet.md`"; `ft-update` already stages `git add .cursor/skills/  # if present`. Keep the 22-path block byte-stable for the release count check.
**Implementation:** One paragraph after the Claude `git add` fence. Points Cursor-only adopters at `git add .cursor/` in `cursor/AGENTS-snippet.md` plus the shared `.flowtron/` / `AGENTS.md` paths. Fence left at 22 `.claude/` paths so `/ft-release` §7.1 stays green. Dropped a draft maintainer-only `/ft-release` sentence from the adopter-facing para.
**Docs touched:** `docs/MIGRATION.md` — updated (§1.6 Cursor-only staging note). Remaining AI-referenced docs: no change (`README.md`, `AGENTS.md`, `SPEC.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`).

## ✅ Recap

One paragraph on `docs/MIGRATION.md` §1.6. Cursor-only adopters following §1.1–1.7 no longer `git add` missing `.claude/` paths; they stage `.cursor/` per the snippet. Claude 22-path fence unchanged (verified). Tests/lint N/A (markdown). No refactor. Maintainability: next Cursor leftover is CORE-446 README index copy.

**Archived:** 2026-08-18
