---
title: agents-snippet-micro-4phase-claim
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-163 | agents-snippet-micro-4phase-claim

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Tighten the "Every tasknote runs the 4-phase workflow" line in the AGENTS.md paste-block to scope the claim to `/ft-task` (standard tasknotes) and clarify that `/ft-micro-task` uses a lighter single-section ceremony instead.

## ⚡ Notes

**Relevance:** Proceed — single targeted doc patch in AGENTS-snippet.md paste-block; no design tradeoffs.
**Drift check:** `claude/AGENTS-snippet.md` line 18 confirmed live; claim "Every tasknote runs the 4-phase workflow" is exactly the overstatement PLAN.md describes. No drift on paths.
**Archive skim:** CORE-162 (most recent) touched AGENTS-snippet.md today for Visualizer section only — no conflict. No prior tasknotes touch the 4-phase claim line.
**Pattern survey:** Line 17 of the paste-block already describes `/ft-micro-task` as "too light for the 4-phase ceremony"; line 18 contradicted it. New wording aligns both lines.
**Implementation:** Changed `claude/AGENTS-snippet.md` line 18: replaced "Every tasknote runs the 4-phase workflow" with "Standard tasknotes (`/ft-task`) run the 4-phase workflow…" and appended "`/ft-micro-task` uses a lighter single-section ceremony in place of the full 4-phase flow."
**Docs touched:** `claude/AGENTS-snippet.md` — updated line 18 to scope the 4-phase claim to `/ft-task` and add micro-task exception. No other AI-referenced docs changed.

## ✅ Recap

Tightened `claude/AGENTS-snippet.md` line 18 in the adopter paste-block: scoped "Every tasknote runs the 4-phase workflow" to "Standard tasknotes (`/ft-task`)" and added an explicit note that `/ft-micro-task` uses a lighter single-section ceremony. Eliminates the contradiction with line 17's existing micro-task description. Single-line doc patch; no follow-up needed.

**Archived:** 2026-05-23
