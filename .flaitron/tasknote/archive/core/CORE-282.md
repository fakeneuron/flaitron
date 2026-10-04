---
title: doc-audit-prose-patches
status: completed
tags: []
created: 2026-06-04
due:
related-tasks: []
---

# CORE-282 | doc-audit-prose-patches

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Apply four small prose fixes surfaced by audit-docs 2026-06-04: add `[medium]` as third primary label in SPEC/model.md intro; update AGENTS.md Codex wiring statement to reflect shipped pointer wrappers; remove stale forward-reference blockquote from SPEC/procedures/README.md; replace dead `[[CORE-206]]` wikilinks with inline text in docs/AGENT-NEUTRALITY.md.

## ⚡ Notes

**Relevance:** Proceed — all four targets confirmed stale; no re-scope needed. CORE-271.3 archived, codex/procedures/ft-task.md and grok/procedures/ft-task.md exist, CORE-206 is completed.

**Drift check:** All four file paths exist and match PLAN.md description. SPEC/procedures/ft-task.md exists confirming the forward-ref is stale. Pointer wrappers at codex/procedures/ft-task.md and grok/procedures/ft-task.md confirm AGENTS.md statement is outdated.

**Archive skim:** No prior archive tasknotes touch these exact prose targets (CORE-042.x / CORE-049 / CORE-052 hits were for broader contract-layer audits, no overlap with these four fixes).

**Pattern survey:** Doc patches only — match surrounding prose style; no code touched.

**Implementation:** SPEC/model.md line 13 — added `, \`[medium]\` (multi-step, well-scoped),` between `[heavy]` and `[light]` in the intro sentence. AGENTS.md lines 65-67 — replaced stale "no Codex-specific bundle ships yet" paragraph with accurate statement naming codex/ and grok/ pointer wrappers. SPEC/procedures/README.md lines 18-19 — removed stale blockquote forward-reference (`> This README defines the format…lands in CORE-271.3.`) now that CORE-271.3 is archived and ft-task.md exists. docs/AGENT-NEUTRALITY.md lines 40, 44 — replaced both `[[CORE-206]]` wikilinks with plain `CORE-206` inline text (CORE-206 is completed; wikilinks resolve to nothing).

**Docs touched:** SPEC/model.md, AGENTS.md, SPEC/procedures/README.md, docs/AGENT-NEUTRALITY.md — all updated inline per task.

## ✅ Recap

Four targeted prose patches: (1) SPEC/model.md intro now lists all three primary labels including `[medium]`; (2) AGENTS.md Platform Notes reflects shipped codex/ and grok/ pointer wrappers; (3) SPEC/procedures/README.md blockquote forward-reference to CORE-271.3 removed (SOP shipped); (4) dead `[[CORE-206]]` wikilinks in AGENT-NEUTRALITY.md replaced with plain text. No code changes; doc-only patch.

**Archived:** 2026-06-04
