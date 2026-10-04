---
title: ai-referenced-docs-cohort-154
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-157 | ai-referenced-docs-cohort-154

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Decide whether `docs/AGENT-NEUTRALITY.md` and `docs/PLATFORMS.md` belong in `_project/tasknote/README.md` §"AI-referenced docs", and apply the decision.

## ⚡ Notes

**Relevance:** Proceed — focused doc decision, single-file patch
**Drift check:** `_project/tasknote/README.md` §"AI-referenced docs" — list exists at lines 33-40, no drift
**Archive skim:** CORE-154.4, CORE-154.5, CORE-155, CORE-156 in archive/core/ — none directly address AI-referenced-docs decisions; CORE-121 (security-md-ai-ref-decision, not in recent archive) was the prior precedent for SECURITY.md inclusion
**Pattern survey:** each entry in §"AI-referenced docs" follows `- \`path\` — one-line purpose` shape; matched
**Implementation:** Added `docs/AGENT-NEUTRALITY.md` to the list with rationale "audits and Phase 4 sweeps consult this before flagging Claude-Code references in the contract layer". Excluded `docs/PLATFORMS.md` — its own header flags audience as "rare" (contributor adding new platform wiring, not Phase 4 workflows); already reachable from AGENT-NEUTRALITY.md when relevant.
**Docs touched:** `_project/tasknote/README.md` — added one entry to §"AI-referenced docs"

## ✅ Recap

Added `docs/AGENT-NEUTRALITY.md` to `_project/tasknote/README.md` §"AI-referenced docs"; excluded `docs/PLATFORMS.md`. Decision rationale: AGENT-NEUTRALITY.md is operationally load-bearing for audit correctness (its "don't re-flag" table prevents false-positive audit findings), while PLATFORMS.md is a rare contributor-facing architectural reference already reachable from AGENT-NEUTRALITY.md.

**Archived:** 2026-05-23
