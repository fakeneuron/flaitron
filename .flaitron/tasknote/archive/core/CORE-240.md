---
title: model-vocab-cascade
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: []
---

# CORE-240 | model-vocab-cascade

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Update `SPEC.md` task-line-format table and `templates/PLAN.md` example rows to reflect `[heavy]`/`[light]` as the primary recommended model labels (with opus/sonnet as examples), replacing the legacy `[opus]`-only examples introduced before CORE-206.

## ⚡ Notes

**Relevance:** Proceed — direct two-file mechanical edit scoped precisely by the PLAN.md description.
**Drift check:** SPEC.md:145 confirmed at the cited location; templates/PLAN.md example rows confirmed. No drift from filing description.
**Archive skim:** no prior tasknotes touch these paths.
**Pattern survey:** follows vocabulary established in CORE-206 and codified in SPEC/model.md; no new shape needed.
**Implementation:** (1) SPEC.md:145 `[model]` row — replaced "Recommended set: `opus` \| `sonnet`…" with "`[heavy]`/`[light]` as recommended primary labels, specific names as precision tokens"; (2) SPEC.md examples block — replaced `[opus]` with `[heavy]` (design/critical tasks) or `[light]` (housekeeping/routine), `[sonnet]` with `[light]`; (3) templates/PLAN.md — replaced `[opus]` with `[heavy]` (critical row) and `[light]` (routine + completed rows). No other files needed changes.
**Docs touched:** SPEC.md (§"Task-line format" table + examples), templates/PLAN.md (example rows) — both updated as the target of this task.

## ✅ Recap

Updated `SPEC.md:145` and the examples block to use `[heavy]`/`[light]` as the recommended primary model labels (with specific names like `opus`/`sonnet` as precision escape hatches), and updated `templates/PLAN.md` example rows to match. Aligns SPEC.md with the vocabulary already codified in SPEC/model.md by CORE-206.

**Archived:** 2026-05-31
