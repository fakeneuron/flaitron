---
title: commit-inline-fixes
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: [FE-057, CORE-290]
---

# CORE-298 | commit-inline-fixes

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Commit the two inline fixes from the 2026-06-06 audit that were applied to the working tree but never staged or committed — `viz/src/ui/WikilinkMarkdown.tsx` (FE-057: target-blank on external links) and `docs/PLATFORMS.md` (CORE-290: tree comment updates for codex/grok).

## ⚡ Notes

**Relevance:** Proceed — both files are modified in the working tree; PLAN.md already marks FE-057 and CORE-290 Completed, so this is purely a commit housekeeping task.
**Drift check:** No PLAN.md references to specific line numbers; both diffs confirmed via `git diff` — changes are exactly as described in the Completed entries.
**Archive skim:** no prior tasknotes touch these paths.
**Pattern survey:** single commit bundling two small inline fixes from the same audit session — consistent with prior inline-fix commit convention.
**Implementation:** staged and committed `viz/src/ui/WikilinkMarkdown.tsx` + `docs/PLATFORMS.md` under `fix: CORE-298 — commit-inline-fixes`.
**Docs touched:** no change (PLATFORMS.md change is to the tree illustration comment, already committed; no AI-referenced docs list update needed).

## ✅ Recap

Committed the two stray inline fixes: WikilinkMarkdown external links now open in a new tab (`target="_blank" rel="noopener noreferrer"`), and PLATFORMS.md tree comments for codex/grok updated from "hypothetical" to "procedure-pointer shipped; full bundle hypothetical". No code logic changed — pure housekeeping commit for audit-session leftovers.

**Archived:** 2026-06-06
