---
title: spec-copy-paste-routing
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-158 | spec-copy-paste-routing

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Generalize the hardcoded `/ft-task` in SPEC §"Post-closure protocol" Step 3's copy-paste line to "the appropriate `/ft-*` skill", matching the routing behavior already present in ft-micro-task's SKILL.md.

## ⚡ Notes

**Relevance:** Proceed — single targeted doc patch in SPEC.md, no design tradeoffs.
**Drift check:** SPEC.md §"Post-closure protocol" Step 3 — checking now.
**Archive skim:** no prior tasknotes touch these paths.
**Pattern survey:** ft-micro-task SKILL.md already uses the correct phrasing; mirroring it into SPEC.md.
**Implementation:** Updated SPEC.md §"Post-closure protocol" Step 3: code fence changed from `/ft-task <NEXT-ID>` to `/<ft-task|ft-micro-task|ft-starter-task> <NEXT-ID>`; prose explanation extended to name each skill's use case.
**Docs touched:** `SPEC.md` — §"Post-closure protocol" Step 3 copy-paste line + prose. No other AI-referenced docs affected.

## ✅ Recap

Single-line code-fence fix in SPEC.md plus a one-sentence prose extension — the copy-paste line now shows `/<ft-task|ft-micro-task|ft-starter-task> <NEXT-ID>` matching ft-micro-task SKILL.md's existing Step 5 language, eliminating the inconsistency flagged by the 2026-05-23 audit.

**Archived:** 2026-05-23
