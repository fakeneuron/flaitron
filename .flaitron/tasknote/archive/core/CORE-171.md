---
title: doc-drift sweep 2026-05-24
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-171 | doc-drift sweep 2026-05-24

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix two enumerative-claim inaccuracies surfaced by the 2026-05-24 audit-docs run: qualify "six slash commands" in MIGRATION.md and re-derive or drop the "(5 sites)" count in AGENT-NEUTRALITY.md.

## ⚡ Notes

**Relevance:** Proceed — two targeted doc-only fixes with clear before/after from the audit findings.
**Drift check:** MIGRATION.md:60 text confirmed; AGENT-NEUTRALITY.md:35 confirmed. Both lines matched exactly.
**Archive skim:** CORE-169/165/166 touched these files for earlier doc-drift passes; no prior work on these specific claims.
**Pattern survey:** Enumerative-claim corrections; same pattern as the "(3 sites)" count in AGENT-NEUTRALITY.md row 36 (count in parens after section list).
**Implementation:** (1) MIGRATION.md:60 — "six slash commands" → "six tasknote slash commands" (submodule ships 17 total per PLATFORMS.md:169; the six listed are the tasknote skills specifically). (2) AGENT-NEUTRALITY.md:35 — "(5 sites)" → "(4 sites)": grep of SPEC.md found 4 distinct `--fast` paragraphs (line 307 §Operator-gate cues; lines 351-355 §Phase 1 drift carve-out; lines 390-393 §Phase 3 visual-confirmation suppression; line 456 §Conditional skip rule). No Phase 3 reference was missing — it was line 390, just counted incorrectly in the prior claim.
**Docs touched:** `docs/MIGRATION.md` updated (§1.2 body); `docs/AGENT-NEUTRALITY.md` updated (table row 35). No AI-referenced doc set entries require further update.

## ✅ Recap

Fixed two stale enumerative claims: qualified "six tasknote slash commands" in MIGRATION.md §1.2 to distinguish from the 17 total submodule skills, and corrected the `--fast` site count in AGENT-NEUTRALITY.md from 5 to 4 (verified by grep of SPEC.md).

**Archived:** 2026-05-24
