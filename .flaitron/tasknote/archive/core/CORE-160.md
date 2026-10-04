---
title: last-reviewed-field
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-160 | last-reviewed-field

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Decide the fate of `**Last reviewed:**` headers in `docs/PLATFORMS.md:3` and `docs/AGENT-NEUTRALITY.md:3`, then execute the decision.

## ⚡ Notes

**Relevance:** Proceed — two-line doc change with a clear precedent; no re-scope needed
**Drift check:** Both files confirmed: `docs/PLATFORMS.md:3` has `**Last reviewed:** 2026-05-23 ([[CORE-154.4]])` and `docs/AGENT-NEUTRALITY.md:3` has `**Last reviewed:** 2026-05-23 ([[CORE-154.2]], [[CORE-154.3]], [[CORE-154.4]], [[CORE-154.5]])`; no drift from PLAN description
**Archive skim:** CORE-035 (retired "Last updated:" from docs); CORE-154.3 (added "Last reviewed" to AGENT-NEUTRALITY.md with wikilinks — the wikilinks already carry provenance; CORE-154.4 added it to PLATFORMS.md). Decision: retire, consistent with CORE-035 — field is inconsistently applied across docs, no sweep rule exists, and git history + tasknote "Docs touched:" already provides the provenance trail. Adding a sweep rule would require all future tasknotes touching these docs to update the line — maintenance burden not worth the signal.
**Pattern survey:** No other docs under `docs/` have a "Last reviewed:" field — so retirement restores consistency rather than introducing a new shape
**Implementation:** Removed `**Last reviewed:**` line + blank line from `docs/PLATFORMS.md:3-4` and `docs/AGENT-NEUTRALITY.md:3-4`
**Docs touched:** `docs/PLATFORMS.md` — removed "Last reviewed" header (line 3-4); `docs/AGENT-NEUTRALITY.md` — removed "Last reviewed" header (line 3-4)

## ✅ Recap

Retired `**Last reviewed:**` from both docs consistent with CORE-035 precedent. The wikilink provenance in the referenced tasknotes' "Docs touched:" fields already encodes which task reviewed each doc. No sweep rule needed; no other docs were affected.

**Archived:** 2026-05-23
