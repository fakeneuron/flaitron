---
title: agents-dev-server-hint-dedup
status: completed
tags: []
created: 2026-06-13
due:
related-tasks: []
---

# CORE-317 | agents-dev-server-hint-dedup

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the redundant `--prefix viz` drop-hint parenthetical from `AGENTS.md` `## Dev Server`, since the "As with validation…" cross-reference in the same parenthetical already directs readers to the `## Validation` section where the hint is fully explained.

## ⚡ Notes

**Relevance:** Proceed — parenthetical at line 58 is a verbatim re-statement of the logic already in `## Validation`; the "As with validation" wording itself implies readers can look there, so the full restatement is redundant noise.
**Drift check:** AGENTS.md lines 57–58 match the PLAN.md description; blank line at 57, parenthetical at 58, port note at 59 — no drift.
**Archive skim:** no prior tasknotes touch these paths.
**Pattern survey:** simple one-line deletion; no new shape introduced.
**Implementation:** Deleted line 58 (`(As with validation, drop \`--prefix viz\` if your shell is already inside \`viz/\`.)`) from `AGENTS.md`. Blank line 57 remains as the natural separator between the code block and the port note that follows.
**Docs touched:** `AGENTS.md` — one line removed (the redundant parenthetical). No other AI-referenced docs affected.

## ✅ Recap

Removed the near-duplicate parenthetical from `AGENTS.md` `## Dev Server`. The "As with validation…" cross-reference was the entire parenthetical's content — eliminating it leaves a clean code block → blank line → port-pin note structure with no information loss.

**Archived:** 2026-06-13
