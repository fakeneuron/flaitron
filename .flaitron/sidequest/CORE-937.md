---
title: paste-block-opener-strict
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-930
---

# CORE-937 | paste-block-opener-strict

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

`workflowPasteBlock` in `tools/update-adopters/text.mjs` has two pre-existing looseness points, found in CORE-930's External review. (1) The paste-fence opener regex `/^`{3,}markdown/` has no word boundary, so a ```` ```markdown-example ```` fence is taken as the paste fence; it also requires column 0 where `FENCE` allows 3 spaces. (2) The `## Block to paste into AGENTS.md` heading is matched even inside an earlier fenced block; require `openers[i] === -1`. Pin both in `SPEC/fixtures/workflow-block/cases.json` `snippetCases`.

## Resume anchor

CORE-930 Phase 3 — External review notes being fixed or filed before Phase 4 closure.
