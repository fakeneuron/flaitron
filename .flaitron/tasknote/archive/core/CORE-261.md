---
title: last-verified-backtick-style
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: []
---

# CORE-261 | last-verified-backtick-style

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align the six `last-verified` stamps to a single consistent backtick style (full stamp in backticks) across docs/AGENT-COMPAT.md, claude/CAPABILITIES.md, and docs/PLATFORMS.md.

## ⚡ Notes

**Relevance:** Proceed — Pure cosmetic consistency fix surfaced in v4.5.0 release doc-drift sweep (CORE-260 Finding #1, Low). Stamps remain factually accurate at v4.4.0 (verify-not-bump convention for minor bumps). Scope narrow, no design tradeoffs, no re-scope. User confirmed target style (full stamp) + exact-six scope via structured ask before any edits.

**Drift check:** Cited locations unchanged and accurate: AGENT-COMPAT.md:36 (Claude row uses version-only `v4.4.0`), :37 (Grok full), :38 (Codex full); claude/CAPABILITIES.md:56 (version-only); docs/PLATFORMS.md:236 (Grok section full) and :247 (Codex section full). All six still carry the v4.4.0 · 2026-06-01 (dogfooded) value exactly as described. Zero path/line/value drift.

**Archive skim:** `ls _project/tasknote/archive/core/` + `grep -l` for the three source paths across archive/core/*.md produced hits in:

- CORE-260.md (v4.5.0 release): documents the six stamps explicitly, the minor-bump verify-not-bump decision, the Low backtick-style cosmetic finding, and the filing of this CORE-261 (operator chose /ft-file-followup then escalated to micro-task). Load-bearing: reinforces that last-verified stamps are intentionally frozen across minor cuts; this task is the deferred formatting alignment.
- CORE-254.6.md and related epic audit notes: reference the stamps only for post-dogfood currency checks during the cross-agent epic; no prior style decisions recorded.

No conflicting prior art on stamp formatting. First dedicated alignment pass.

**Pattern survey:** PLATFORMS.md "Last verified:" prose sections and the Grok/Codex matrix rows use the full stamp as one backtick literal: `v4.4.0 · 2026-06-01 (dogfooded)`. The format spec example in AGENT-COMPAT.md §"Reading the cells" shows the entire `vX.Y.Z · YYYY-MM[-DD] (context-tag)` inside a single backtick span. The version-only form (`v4.4.0` · ...) appears only in the Claude matrix cell and the CAPABILITIES standalone line — the two outliers. Standardizing on the full form (operator choice) treats the stamp as a single atomic token, produces uniform table + prose rendering, and matches the spec's own presentation. No new pattern; extending the existing majority convention.

**Implementation:** Two targeted `search_replace` edits (AGENT-COMPAT.md:36 matrix cell; CAPABILITIES.md:56 "Last verified" line). Converted the two remaining version-only stamps (`v4.4.0` · ...) to full-stamp backticks to match the four already-correct instances and the canonical format example in AGENT-COMPAT §"Reading the cells". Post-edit grep confirms all six live stamps are now identical: `v4.4.0 · 2026-06-01 (dogfooded)`. No other files, no content changes, no tests required (pure markdown formatting).

**Docs touched:** no change (AGENT-COMPAT.md, CAPABILITIES.md, and PLATFORMS.md are already listed in _project/tasknote/README.md §"AI-referenced docs"; this is formatting-only alignment of a stamp literal — no semantic, currency, or date update).

## ✅ Recap

Aligned the six `last-verified` stamps (AGENT-COMPAT.md:36/37/38, CAPABILITIES.md:56, PLATFORMS.md:236/247) to one consistent style: the full stamp as a single backtick literal `v4.4.0 · 2026-06-01 (dogfooded)`. Matrix table and prose sections now uniform; matches the format spec example in the doc itself. Pure cosmetic/docs-only change with no semantic or version impact (stamps correctly left at v4.4.0 per minor-bump verify-not-bump convention). Tasknote archived; PLAN.md line flipped to Completed stub.

**Archived:** 2026-06-01
