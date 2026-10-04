---
title: sibling-skill cosmetic drift
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-064]
---

# CORE-191 | sibling-skill cosmetic drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Two-line cosmetic alignment sweep: equalize the `(recommended …)` parenthetical on the `/ft-micro-task` step-1.5 fragment with its `/ft-task` sibling (CORE-064 contract), and drop the `ft-` prefix on the inner backticked skill name in three command files so they match the other 15 command files' `Invoke the \`<unprefixed>\` skill` pattern.

## ⚡ Notes

**Relevance:** Proceed — both findings re-verified against current code; pure cosmetic alignment with established sibling patterns, no design tradeoffs.
**Drift check:** Confirmed. (a) `claude/skills/ft-micro-task/step-1.5-model-edge.md:9` currently ends `(recommended)`; sibling `claude/skills/ft-task/step-1.5-model-edge.md:9` ends `(recommended — preserves the filed assignment)`. (b) `grep "Invoke the \`" claude/commands/*.md` confirms 15 unprefixed and exactly 3 prefixed outliers — `ft-quality.md:5`, `ft-stats.md:5`, `ft-epic-discovery.md:5` — matching PLAN.md's claim.
**Archive skim:** `_project/tasknote/archive/core/CORE-064.md` is the parent contract ("equalize step-1.5 fragments"). It established the equalization rule but kept the `(recommended)` short on the micro-task fragment while the ft-task sibling later acquired the longer `(recommended — preserves the filed assignment)`; CORE-191 closes that residual drift. No prior tasknote touched the command-file `Invoke the …` prose.
**Pattern survey:** (a) Direct copy of the ft-task sibling's parenthetical wording — single source of truth for the equalized phrase. (b) `Invoke the \`<unprefixed>\` skill` matches 15 sibling command files (ft-audit, ft-audit-*, ft-close-epic, ft-file-followup, ft-micro-task, ft-starter-task, ft-flowtron, ft-new-project, ft-task, ft-release). No new shape introduced.
**Implementation:** Four edits across four files. (1) `claude/skills/ft-micro-task/step-1.5-model-edge.md:9` — append ` — preserves the filed assignment` inside the trailing parenthetical. (2) `claude/commands/ft-quality.md:5` — `` `ft-quality` `` → `` `quality` ``. (3) `claude/commands/ft-stats.md:5` — `` `ft-stats` `` → `` `stats` ``. (4) `claude/commands/ft-epic-discovery.md:5` — `` `ft-epic-discovery` `` → `` `epic-discovery` ``. All edits are prose-only; no behavior change (the user-facing slash command names remain `/ft-quality`, `/ft-stats`, `/ft-epic-discovery` — only the inner skill-name backtick changes).
**Docs touched:** no change to the AI-referenced doc set (SPEC.md, SPEC/, claude/skills/, docs/MIGRATION.md). The micro-task step-1.5 fragment is a lazy-loaded SKILL fragment; the command files are wrappers — neither is part of the AI-referenced contract surface that drives drift sweeps.

## ✅ Recap

Four single-line edits closed the residual cosmetic drift surfaced by the 2026-05-24 audit. (a) `claude/skills/ft-micro-task/step-1.5-model-edge.md:9` now ends with `(recommended — preserves the filed assignment)`, byte-equivalent to its `/ft-task` sibling per the CORE-064 equalization contract. (b) Three outlier command files (`ft-quality.md`, `ft-stats.md`, `ft-epic-discovery.md`) dropped the `ft-` prefix on the inner backticked skill name, restoring uniformity with the 15 sibling command files. Verified post-edit: `grep "Invoke the \`ft-" claude/commands/*.md` returns no matches; both step-1.5 fragments end with the same parenthetical. No behavior change — slash-command names (`/ft-quality` etc.) and skill identities are untouched.

**Archived:** 2026-05-24
