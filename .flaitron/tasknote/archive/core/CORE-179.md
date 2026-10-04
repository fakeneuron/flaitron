---
title: conventions-changelog-examples
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-179 | conventions-changelog-examples

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace the stale `CORE-043`/`CORE-046` release-tasknote examples in `docs/CONVENTIONS.md` §CHANGELOG with a pointer to `_project/tasknote/archive/core/`.

## ⚡ Notes

**Relevance:** Proceed — targeted single-line doc patch, exactly as described.
**Drift check:** `docs/CONVENTIONS.md:60` still references `CORE-043` (v1.0.0) and `CORE-046` (v1.1.0); both exist in the archive at `_project/tasknote/archive/core/`. The sentence is accurate but cites specific tasknotes that are now three major versions behind (current is v3.x).
**Archive skim:** CORE-043.md and CORE-046.md are in archive — confirming they do record tag-message structure. No prior tasknotes address this CONVENTIONS.md line.
**Pattern survey:** Surrounding prose uses plain prose references to the archive; no special link format needed. Adjacent stale-ref fixes (CORE-181) follow same single-sentence reword pattern.
**Implementation:** Rewrote line 60 to drop the specific stale task IDs and replace with a pointer to `_project/tasknote/archive/core/`; preserved the structural explanation of what's in those tasknotes.
**Docs touched:** `docs/CONVENTIONS.md` — updated §CHANGELOG example line. No AI-referenced docs changed.

## ✅ Recap

Replaced `CORE-043 (v1.0.0)` and `CORE-046 (v1.1.0)` name-drops with a pointer to `_project/tasknote/archive/core/`; preserved the explanation that release tasknotes record the tag-message structure. One-line change, no design decisions.

**Archived:** 2026-05-24
