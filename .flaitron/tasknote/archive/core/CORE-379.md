---
title: model-example-fable
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: []
---

# CORE-379 | model-example-fable

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add `fable` to SPEC/model.md's concrete-token example lists (:16, ~:52) so they match downstream mirrors (e.g. SPEC.md:164) that already include it.

## ⚡ Notes

**Relevance:** Proceed — small, well-scoped doc-only patch; matches PLAN.md description exactly.
**Best Practices Review:** N/A — additive edit to two existing example lists; no new abstraction, no responsibility change.
**Drift check:** SPEC/model.md line 16 and line 52 confirmed current; both are concrete-token example lists missing `fable`. SPEC.md:164 confirmed as the downstream mirror that already lists `fable`.
**Archive skim:** `no prior tasknotes` — archive/core has no prior tasknote touching SPEC/model.md's example lists (checked via grep).
**Pattern survey:** Extended the existing example-list pattern (comma-separated backtick-wrapped model names) already used at both sites and mirrored at SPEC.md:164 — no new shape introduced.
**Implementation:** Added `fable` as the first item in the concrete-token example lists at SPEC/model.md:16 and SPEC/model.md:52, matching the ordering already used at SPEC.md:164 (`fable`, `opus`, `sonnet`, `haiku`, ...).
**Docs touched:** SPEC/model.md (the two example lists) — direct target of this task; no other AI-referenced doc required a change.

## ✅ Recap

Added `fable` to both concrete-token example lists in SPEC/model.md (lines 16 and 52), bringing them in line with the SPEC.md:164 mirror which already listed it. Doc-only, two-line diff.

**Archived:** 2026-07-27
