---
title: plan-empty-sections-none
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-152 | plan-empty-sections-none

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add `(none)` placeholder to empty priority sections in `_project/PLAN.md` so every `## High`, `## Medium`, and `## Low` section always has visible content.

## ⚡ Notes

**Relevance:** Proceed — trivial doc patch; `## Low` is the only section currently missing the placeholder (High already has it; Medium has tasks).
**Drift check:** No code paths; PLAN.md line 21 (`## Low`) is immediately followed by a blank line then `## Future Opportunities` — no drift.
**Archive skim:** No prior tasknotes touch PLAN.md section placeholders (CORE-147 `placeholder-none-sync` fixed a different placeholder context; already closed).
**Pattern survey:** Existing `(none)` entries in `## High` (line 14) and `## Future Opportunities` (line 25) confirm the canonical placeholder form.
**Implementation:** Added `(none)` on the line after `## Low` heading in PLAN.md. Single-line change, no other sections affected.
**Docs touched:** no change — SPEC.md §"PLAN.md filing-discipline" already documents the `(none)` convention; no update needed.

## ✅ Recap

Added `(none)` placeholder to `## Low` in `_project/PLAN.md` — the only priority section that was empty without a placeholder. `## High` already had `(none)`; `## Medium` has active tasks. One-line doc patch.

**Archived:** 2026-05-23
