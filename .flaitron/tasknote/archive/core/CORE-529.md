---
title: deferred-handoff-filing-discipline
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-528]
---

# CORE-529 | deferred-handoff-filing-discipline

[← PLAN.md](../PLAN.md) · ✅ Completed

> **⚠️ Superseded by [[CORE-533]]** — the `(caobunga CBN-120.2 F4 / adppro DATA-13.3)` citation was removed from `SPEC.md`; adopter task IDs stay in tasknotes, not contract prose.

## 🎯 Goal

Add guidance to SPEC.md that a real-world operator step deferred past a
task's closure must be filed as its own unchecked PLAN.md row (with
dependents pointing at it via `Blocked by [[ID]]`), never left as only
prose in a README or Recap.

## ⚡ Notes

**Relevance:** Proceed — PLAN.md line matches; guidance still missing from SPEC.md.
**Best Practices Review:** Doc-only change; no code responsibilities or dependency direction in scope. N/A.
**Drift check:** PLAN.md line (`.flowtron/PLAN.md:16`) cited no specific paths/line numbers to verify beyond the guidance itself; no drift.
**Archive skim:** `CORE-528.md` (sibling finding, same audit — caobunga CBN-120.2 F2) added a "Handoff persistence" paragraph to SPEC.md §"🚀 Phase 4: Closure" covering *how* a hand-off is persisted (written into the tasknote before archive). `CORE-531.md` (caobunga CBN-123 F5) established the `Blocked by [[ID]]` wikilink-grammar convention this task's row references. No archived tasknote yet covers *filing* a deferred hand-off as its own PLAN row — this is the gap CORE-529 closes.
**Pattern survey:** Extended CORE-528's "Handoff persistence" paragraph shape (bold lead-in, short rule, one-line rationale, source citation) with a sibling "Deferred hand-off filing" paragraph directly beneath it in the same Phase 4 Closure section — same section, same voice, no new heading level.
**Implementation:** Added a "Deferred hand-off filing" paragraph to `SPEC.md` §"🚀 Phase 4: Closure", immediately after the existing "Handoff persistence" paragraph: a deferred real-world operator step must be filed as its own unchecked PLAN.md row (prose alone — Recap, `## 🔄 Handoff`, or README — is not enough), with dependent tasks carrying `Blocked by [[ID]]` back to it; the closing task's own PLAN.md line still flips to Completed. Cites caobunga CBN-120.2 F4 / adppro DATA-13.3, matching the PLAN.md line's citation.
**Docs touched:** SPEC.md is the deliverable itself. No other AI-referenced doc (`.flowtron/tasknote/README.md` §"AI-referenced docs") needed a change — the new paragraph is self-contained guidance in the canonical contract file.

## ✅ Recap

Added a "Deferred hand-off filing" paragraph to `SPEC.md` §"🚀 Phase 4:
Closure" (~13 lines), directly beneath the existing "Handoff persistence"
paragraph. It states that a real-world operator step deferred past a
task's closure must be filed as its own unchecked PLAN.md row — not left
as only prose in a Recap, `## 🔄 Handoff`, or README — with dependent tasks
carrying a `Blocked by [[ID]]` clause pointing at it (grammar per
CORE-531). The closing task's own PLAN.md line still flips to Completed;
only the deferred *hand-off* needs its own open row. No refactor needed
(pure doc addition, no code/dependency surface). Docs: no other
AI-referenced doc required an update. Maintainability: closes a
prose-vs-PLAN-row gap the sibling CORE-528 finding (same audit) didn't
cover, so a future closure can't silently drop a deferred operator step
into an untracked README paragraph.

**Archived:** 2026-09-06
