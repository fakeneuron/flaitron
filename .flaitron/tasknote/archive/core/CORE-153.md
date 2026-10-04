---
title: spec-migration-label-drift
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-153 | spec-migration-label-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align the SPEC.md §"Working in the flowtron repo itself" pointer text so it accurately describes MIGRATION.md §1.0's actual structure (a Flowtron-self-only table row, not a "flowtron-self developers block" subsection).

## ⚡ Notes

**Relevance:** Proceed — single-sentence pointer fix in SPEC.md; no design tradeoffs.
**Drift check:** SPEC.md line 55 and MIGRATION.md §1.0 read in full. Two stale tokens confirmed: (1) section-name quote `"One-time global installs"` mislabeled as the §1.0 heading (actual heading: `1.0 Quick path: /ft-new-project`; the bold "One-time global installs" is a paragraph within it); (2) `flowtron-self developers block` names a subsection that does not exist — the flowtron-self-only content is a table row labeled `Flowtron-self only`.
**Archive skim:** CORE-070 introduced the original pointer at SPEC.md L55 — historical record, accurate for what was written then. No prior fix attempts.
**Pattern survey:** Cross-reference pointers in this section use `see [link] §N.M → "label"` form. New text follows that form: `§1.0 → "One-time global installs" table, \`Flowtron-self only\` row.`
**Implementation:** SPEC.md line 55 updated — replaced `§1.0 "One-time global installs" → flowtron-self developers block` with `§1.0 → "One-time global installs" table, \`Flowtron-self only\` row.` MIGRATION.md untouched (it's the authoritative source).
**Docs touched:** `SPEC.md` — updated (pointer fix). All other AI-referenced docs: no change.

## ✅ Recap

Fixed stale pointer in SPEC.md §"Working in the flowtron repo itself" (line 55): replaced nonexistent section quote `"One-time global installs"` + phantom `flowtron-self developers block` subsection label with accurate `§1.0 → "One-time global installs" table, \`Flowtron-self only\` row.` One-line edit to SPEC.md only.

**Archived:** 2026-05-23
