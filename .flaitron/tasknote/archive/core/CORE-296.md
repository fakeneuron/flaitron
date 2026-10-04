---
title: agents-model-field-guidance
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-296 | agents-model-field-guidance

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a sentence to AGENTS.md directing agents to `SPEC/model.md` for model-field semantics and the model-mismatch surface cue, matching what the adopter-paste-block already provides.

## ⚡ Notes

**Relevance:** Proceed — targeted single-file doc addition, exactly as filed
**Drift check:** AGENTS.md Workflow bullet list had no mention of the model field; AGENTS-snippet.md line 21 has the equivalent sentence for adopter projects — no drift, gap confirmed
**Archive skim:** CORE-259.md (medium-tier addition), CORE-282.md, CORE-293.md touched AGENTS.md/model areas; none added model-field guidance to the self-hosted AGENTS.md
**Pattern survey:** Matched the paste-block's sentence pattern (model segment → SPEC/model.md pointer → mismatch cue), adjusted path from `.flowtron/core/SPEC/model.md` to `SPEC/model.md` for self-host context; dropped the adopter-specific "adopters may use any short token" clause
**Implementation:** Added one bullet after the skills list in AGENTS.md §Workflow: "Each PLAN.md task line carries a `[model]` segment (see `SPEC/model.md` §"Model field" for practical/agent-aware guidance and the model-mismatch surface cue). The task runs end-to-end on the tagged model. If the loaded model doesn't match, surface the mismatch before continuing."
**Docs touched:** AGENTS.md updated (the change itself); no other AI-referenced docs changed

## ✅ Recap

Added one bullet to AGENTS.md §Workflow directing self-hosted agents to `SPEC/model.md` for model-field semantics and the mismatch surface cue, matching the equivalent sentence already in the adopter paste-block (AGENTS-snippet.md line 21). Path adapted from `.flowtron/core/SPEC/model.md` to `SPEC/model.md`.

**Archived:** 2026-06-06
