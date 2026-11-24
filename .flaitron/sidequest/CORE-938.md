---
title: paste-block-heading-anchor
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-937
---

# CORE-938 | paste-block-heading-anchor

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

Two pre-existing looseness points in `workflowPasteBlock` (`tools/update-adopters/text.mjs`), found in CORE-937's External review. (1) The `/^## Block to paste into AGENTS\.md/` heading regex has no end anchor, so `## Block to paste into AGENTS.md (legacy)` or `…AGENTS.mdx` is taken as the heading; anchor it like `WORKFLOW_HEADING` (`[ \t]*\r?$`). (2) The opener `/^`{3,}markdown(?=\s|$)/` rejects CommonMark's optional space after the backticks (```` ``` markdown ````), which `FENCE` and `fenceOpeners` accept; decide whether to allow it. Pin both in `SPEC/fixtures/workflow-block/cases.json` `snippetCases`, and update the fixture's `describes` text and `ft-update` Step 3.5.

## Resume anchor

CORE-937 Phase 3 — External review notes fixed or filed; next the Phase 3 receipt and Phase 4 closure.
