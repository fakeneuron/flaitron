---
title: refactor-filing-post-stage-verify
status: in-progress
tags: []
created: 2026-09-13
due:
related-tasks: []
touches:
  - claude/skills/ft-refactor/SKILL.md
---

# CORE-593 | refactor-filing-post-stage-verify

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add the `SPEC/tasknote-selection.md` §"Filing commits" post-stage verification to `claude/skills/ft-refactor/SKILL.md` Step 6, matching the shape already used by the other four filing runners.

## ⚡ Notes

**Relevance:** Proceed — the gap is exactly as described in PLAN.md: Step 6 (Commit + hand off) has the pre-check (added at CORE-591) but no post-stage `git diff --cached` verification, unlike its four filing-runner siblings (`ft-file-followup` default/`--park`/`--starter`, `ft-audit`).
**Best Practices Review:** No new abstraction — this extends an existing, well-established pattern (post-stage verification already implemented identically four times) to the one filing runner missing it. No refactor needed; the addition is additive and localized to Step 6.
**Drift check:** PLAN.md's citations still match current code — `SPEC/tasknote-selection.md` §"Filing commits" (lines 143-227) carries both the pre-check and post-stage-verification rules; `claude/skills/ft-refactor/SKILL.md` Step 6 (originally lines 218-226) had the pre-check (Step 5, lines 166-171, from CORE-591) but no post-stage read before commit. No contradiction with the SPEC contract — the addition brings Step 6 into compliance with it.
**Archive skim:** `archive/core/` grepped for `ft-refactor/SKILL.md` and `Filing commits` — no prior tasknote touches this exact gap. CORE-563 (adding the contract + 4 runners) and CORE-591 (patching the ft-refactor pre-check only) are named in the PLAN.md line but their tasknotes are outside this task's scope to re-open; their shape was read directly from the current file contents instead (`ft-file-followup/SKILL.md`, `ft-file-followup/starter-mode.md`, `ft-audit/SKILL.md`).
**Declared scope:** `touches: claude/skills/ft-refactor/SKILL.md` (YAML above).
**Pattern survey:** Modeled on `claude/skills/ft-file-followup/starter-mode.md`'s compact shape (per the PLAN.md line's explicit instruction) rather than the longer prose in `ft-file-followup/SKILL.md` default flow or `ft-audit/SKILL.md` — starter-mode's shape fits because ft-refactor Step 6, like starter mode, stages PLAN.md plus one or more sibling artifact files (starter tasknotes) rather than PLAN.md alone.
**Implementation:** Added a `git add` / `git diff --cached` / `git commit` code block (previously the step was prose-only, no code block) plus a **Post-stage verification** paragraph to Step 6 of `claude/skills/ft-refactor/SKILL.md`: every staged hunk must be one this filing wrote (PLAN.md rows, confirmed reconcile edits, each new starter file); an unrecognized hunk → `git restore --staged` every staged path, skip the commit, report as the `auto-commit = false` case; never unstage only the foreign hunk; cites `SPEC/tasknote-selection.md` §"Filing commits" for the full contract. Confirmed `.claude/skills/ft-refactor` is a symlink to the canonical `claude/skills/ft-refactor/` (no duplicate to update) and `codex/skills/ft-refactor/SKILL.md` is a thin wrapper that reads the canonical file (no duplicate content). Verification receipt: markdown-only change, no test/lint suite covers skill-body prose; verified by `grep -n "diff --cached"` confirming the new block landed, and a manual read-through of the edited Step 6 against the three sibling implementations for consistency.
**Docs touched:** no change — `claude/skills/*/SKILL.md` files are explicitly excluded from the `.flowtron/tasknote/README.md` §"AI-referenced docs" sweep set ("a volume decision, not a laziness one").

## ✅ Recap

Added the missing post-stage `git diff --cached` verification to `claude/skills/ft-refactor/SKILL.md` Step 6 ("Commit + hand off"), matching the compact shape used in `ft-file-followup/starter-mode.md`: a `git add`/`git diff --cached`/`git commit` code block, followed by a short paragraph requiring every staged hunk to be attributable to this filing (PLAN.md rows, confirmed reconcile edits, new starter files), with `git restore --staged` + skip-and-report on an unrecognized hunk, citing `SPEC/tasknote-selection.md` §"Filing commits" as the full contract. This closes the last of the five filing runners CORE-563 established the pattern for — `ft-refactor` was the one CORE-591 patched only at the pre-check, per the PLAN.md line. Scope reconciliation: only `claude/skills/ft-refactor/SKILL.md` changed, matching the declared `touches:`. No downstream doc drift — SKILL.md files sit outside the doc-drift sweep set by design.

**Archived:** 2026-09-13
