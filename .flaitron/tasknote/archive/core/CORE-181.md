---
title: conventions-pre-v3-breaking-claim
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-181 | conventions-pre-v3-breaking-claim

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Correct `docs/CONVENTIONS.md:25` to attribute the parenthetical `(BREAKING)` form to the v3.0.0 release commit itself (CORE-105), not to pre-v3.0.0 commits in general.

## ⚡ Notes

**Relevance:** Proceed — single-line doc correction to a verifiable factual claim; fully in scope.
**Drift check:** `docs/CONVENTIONS.md:25` still reads "Pre-v3.0.0 commits used a parenthetical `(...BREAKING)` form in the subject; the canonical `!` is the going-forward convention." — matches the PLAN.md description exactly, no drift.
**Archive skim:** CORE-099.* and CORE-110 reference CONVENTIONS.md but none touch the Conventional Commits breaking-change section; no prior load-bearing findings.
**Pattern survey:** Surrounding prose at lines 19–25 describes the `!` indicator as the canonical going-forward form. The fix keeps that structure and corrects only the attribution of the legacy form.
**Implementation:** Rewrote the sentence on line 25 of `docs/CONVENTIONS.md`: changed "Pre-v3.0.0 commits" → "The v3.0.0 release commit itself (CORE-105)" to match git-log evidence (commit `40c589d` is the only `BREAKING`-annotated commit, and it IS the v3.0.0 release). The `...` ellipsis in the old form was also spurious — the actual commit uses `(BREAKING)`, not `(...BREAKING)`.
**Docs touched:** `docs/CONVENTIONS.md` — corrected; no other AI-referenced docs changed.

## ✅ Recap

Corrected the one-sentence historical claim in `docs/CONVENTIONS.md:25`: `(BREAKING)` was used in the v3.0.0 release commit itself (CORE-105), not in pre-v3.0.0 commits — confirmed by `git log`. Also removed the spurious `...` ellipsis from the example form.

**Archived:** 2026-05-24
