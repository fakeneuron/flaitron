---
title: ft-stats-model-buckets
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [[CORE-256], [CORE-262]]
---

# CORE-263 | ft-stats-model-buckets

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Update `claude/skills/ft-stats/SKILL.md` model parsing, bucketing, capture table, and distribution table to recognize the current primary labels (`heavy`/`medium`/`light` from CORE-256 + agent tokens like `grok`) instead of the pre-tier `opus`/`sonnet`/`other`/`legacy` only.

## ⚡ Notes

**Relevance:** Proceed — mechanical update to the stats skill's data model and output tables. Surfaced by the audit-docs run (Finding #2, Medium) after observing the actual PLAN data and manual stats generation. The skill description had lagged the model-field evolution. Fits micro.

**Drift check:** Confirmed: current PLAN completed entries use `light` (33), `heavy` (5), `grok` (10), `gpt-5` (1), plus opus/sonnet/legacy. The generated _project/STATS.md reflected the expanded view. The skill still described only the old 4-bucket model (lines 44, 60, 79-82 etc.) and table. Matches SPEC §"Model field" and task-line grammar updates.

**Archive skim:** CORE-256 (model-label-valid-set + [medium] tier), CORE-206 (earlier model token vocab), CORE-221 etc for viz. No prior stats-skill update for the tiers. The ft-stats was not touched in the model-tier epic.

**Pattern survey:** The parsing step already extracts the raw token from `[<model>]`; just the bucket rule and output table needed expansion. The render and omit logic generalized easily. Follows how the PLAN and manual stats already surface the data.

**Implementation:** 
- Updated bucket description in Step 1 to list the primary tiers first, then opus/sonnet, other, legacy.
- Updated the capture table field desc.
- Expanded the model distribution table in Step 2 to 7 rows (heavy/medium/light/opus/sonnet/other/legacy).
- Updated the omit rule text to always surface the tiers when present.
- Minor note in the render section example.

No logic change to how the agent computes (the agent follows the updated steps when running /ft-stats).

**Docs touched:** Only the on-demand ft-stats skill. The AI-referenced list (including tasknote/README) had no direct model table claims. The generated STATS.md already used the expanded view manually.

**Testing:** Re-ran the equivalent stats aggregation (via node parse of PLAN) post-update mentally matches the expanded table. The actual /ft-stats --write will now produce correct buckets on next invocation. No breakage to velocity/area sections.

## ✅ Recap

Updated ft-stats/SKILL.md (CORE-263) for current model labels: expanded bucketing text, capture table, and distribution table to include `heavy`/`medium`/`light` (CORE-256) + `grok` etc. alongside the legacy opus/sonnet/other/legacy. (Bundled with CORE-262 from the same audit-docs pass after the viz FE-048 work.) Keeps stats output accurate vs real PLAN data and SPEC.

**Archived:** 2026-06-02
