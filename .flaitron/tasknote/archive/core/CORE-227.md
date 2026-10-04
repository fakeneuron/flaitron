---
title: plan-duplicate-cleanup
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-227 | plan-duplicate-cleanup

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the duplicate `- [x] **CORE-222**` stub-form line from `## Low` in PLAN.md (line 20), since the canonical entry already lives in `## Completed` (line 45).

## ⚡ Notes

**Relevance:** Proceed — single-line deletion, no design tradeoff, exactly what the audit surfaced.
**Drift check:** PLAN.md line 20 confirmed `- [x] **CORE-222** [light] 🔧 | viz-watch-export-hygiene — Completed 2026-05-30.`; line 45 is the canonical duplicate in `## Completed`. No other files involved.
**Archive skim:** no prior tasknotes touch PLAN.md duplicate cleanup at this line.
**Pattern survey:** stub-form completed entries belong only in `## Completed`; removing checked stubs from priority sections is the established cleanup convention.
**Implementation:** Deleted line 20 (`- [x] **CORE-222** ...`) from `## Low`; canonical line 45 in `## Completed` is untouched.
**Docs touched:** no change — this is the PLAN.md self-correction, no doc references updated.

## ✅ Recap

Removed the stale `[x] CORE-222` line from `## Low` (line 20). The identical stub-form entry already existed in `## Completed` (line 45). One-line deletion; no other files touched.

**Archived:** 2026-05-30
