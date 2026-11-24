---
title: paste-block-fence-crlf
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-921
---

# CORE-930 | paste-block-fence-crlf

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

`workflowPasteBlock` in `tools/update-adopters/text.mjs` (moved there by CORE-931.4) opens on a bare ```` ```markdown ```` line and closes on the first ```` ``` ```` line, ignoring the shared fence rules (`SPEC/fixtures/fence`, `fenceOpeners`), so a paste block holding an inner fence would be truncated in every adopter's AGENTS.md. Separately, a CRLF AGENTS.md gets LF Workflow lines (mixed endings). Use `fenceOpeners` for the extractor and pin both behaviours as cases in `SPEC/fixtures/workflow-block/cases.json`. Pre-existing; surfaced by CORE-921's External review.

## Resume anchor

CORE-921 Phase 3 — External review findings being fixed or filed before Phase 4 closure.
