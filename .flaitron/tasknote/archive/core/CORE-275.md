---
title: grok-wiring-dir-claim
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: []
---

# CORE-275 | grok-wiring-dir-claim

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the stale "No `grok/` wiring directory exists today" claim from `docs/PLATFORMS.md` §"Grok Build adoption notes" so the opening sentence no longer contradicts the "Today's surface" table that already lists `grok/procedures/ft-task.md`.

## ⚡ Notes

**Relevance:** Proceed — single-sentence doc fix; PLAN description is precise and complete.
**Drift check:** `docs/PLATFORMS.md` line 202 matched exactly; stale claim confirmed present.
**Archive skim:** CORE-271.4 tasknote is the parent that shipped `grok/procedures/ft-task.md` — no conflicting guidance.
**Pattern survey:** "Today's surface" table at line 32 was already correct; only the §"Grok Build adoption notes" opening paragraph needed updating. No new shape introduced.
**Implementation:** Replaced "No `grok/` wiring directory exists today;" with "A `grok/procedures/ft-task.md` procedure pointer ships in the repo (CORE-271.4); no full wiring bundle exists today." — one sentence becomes two, accurately reflecting the shipped state.
**Docs touched:** `docs/PLATFORMS.md` — updated. No other AI-referenced doc requires change.

## ✅ Recap

Removed stale "No `grok/` wiring directory exists today" claim from `docs/PLATFORMS.md` §"Grok Build adoption notes" opening paragraph. Replaced with factual acknowledgement that `grok/procedures/ft-task.md` ships (CORE-271.4) but no full wiring bundle exists. The "Today's surface" table at line 32 and the Grok trigger table were already accurate — only the opening prose was stale.

**Archived:** 2026-06-02
