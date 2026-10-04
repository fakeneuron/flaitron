---
title: consolidate-fe-archive
status: completed
tags: []
created: 2026-07-16
due:
related-tasks: [CORE-EPIC-359]
---

# CORE-359.2 | consolidate-fe-archive

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Move the 18 mis-filed tasknotes under `.flowtron/tasknote/archive/FE/` into the canonical `archive/frontend/` folder and remove the empty `FE/` directory.

## ⚡ Notes

**Relevance:** Proceed — dual FE archive folders break archive skim under the README-mapped path; mechanical relocate only.
**Drift check:** no drift — `archive/FE/` had 18 notes; `archive/frontend/` had 54 with no overlapping basenames; README maps `FE-*` → `archive/frontend/`.
**Archive skim:** Prior FE work lived under both folders; CORE-350 was archive-metadata cleanup (not this split). No prior tasknote owned consolidating `FE/` → `frontend/`.
**Pattern survey:** `git mv` for history-preserving relocate (write-once archive content; location-only fix per audit-repo Theme A).
**Implementation:** `git mv` 18 files FE-049..FE-066 (incl. FE-063.2–.5) into `archive/frontend/`; removed empty `FE/`; zero collisions; frontend count 54→72.
**Docs touched:** AI-referenced docs — no change (README already documents `archive/frontend/`; on-disk layout now matches).

## ✅ Recap

Consolidated mis-filed FE archives: 18 tasknotes moved from `archive/FE/` → `archive/frontend/` via `git mv` (no ID collisions); empty `FE/` removed. On-disk layout now matches tasknote README archive map. No contract/doc edits required.

**Archived:** 2026-07-16
