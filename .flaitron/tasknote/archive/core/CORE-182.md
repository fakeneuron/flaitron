---
title: migration-md §3.3 cross-walk fintown leak
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-182 | migration-md §3.3 cross-walk fintown leak

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Genericize the §3.3 cross-walk table task descriptions — auth middleware, settings drawer, health-check endpoint shape — to match §3.4's post-CORE-136 generic wording, removing fintown-specific project leakage from MIGRATION.md.

## ⚡ Notes

**Relevance:** Proceed — targeted doc patch, single file, no design tradeoffs
**Drift check:** §3.3 table at MIGRATION.md lines 226–231; rows confirmed present and patched
**Archive skim:** CORE-136 (git: `feat: CORE-136 — replace MIGRATION.md §3.4 fintown task examples`) is the direct predecessor — genericized §3.4 but left §3.3 untouched; no other tasknotes touch §3.3
**Pattern survey:** §3.4 uses short 2–3 word lowercase labels (auth middleware, boot banner); §3.3 Notes column now follows the same shape
**Implementation:** Replaced 5 fintech-specific Notes: "Spread/fee-aware entry redesign"→"auth middleware", "Boot-banner observability"→"boot banner", "Full-screen blotter modal"→"settings drawer", "Halt UX banner"→"offline banner", "Opt-in daily-loss USD cap"→"health-check endpoint". Kept "Playwright UX smoke" (generic). BE-001/BE-002 now match §3.4 exactly.
**Docs touched:** docs/MIGRATION.md §3.3 cross-walk table — updated

## ✅ Recap

Replaced 5 fintech-specific Notes in §3.3's cross-walk table with generic equivalents that now match §3.4's post-CORE-136 label shape (2–3 word lowercase). CORE-136 had genericized §3.4 but left §3.3 untouched; this closes that gap. "Playwright UX smoke" retained (framework-specific but not project-specific). Observation: §3.3 uses P-prefixed legacy IDs (P41-2, etc.) while §3.4 references T-45/T-62 in its "Supersedes" notes — minor fictional-project inconsistency outside this task's scope.

**Archived:** 2026-05-24
