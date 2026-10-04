---
title: in-session cue glyph
status: completed
tags: []
created: 2026-06-10
due:
related-tasks: [CORE-304, CORE-297, CORE-254]
---

# CORE-308 | in-session cue glyph

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Give the context-dependent "Run in this session:" label its own glyph — 👇 (`HERE`) replaces the 🔧/🧠 model glyph there, so an in-session ask no longer reads like a model cue; the model signal stays on the candidate line.

## ⚡ Notes

**Relevance:** Proceed — operator-reported UX confusion: `🔧 Run in this session:` reads as a light-model task cue (looks like a sonnet task) when its actual message is "don't clear, run here". Design fork already resolved at filing (👇 replaces the model glyph outright; structured ask 2026-06-10).
**Drift check:** Six live label sites confirmed (grep, post-CORE-304 text `<glyph> Run in this session:` (same glyph rule)): SPEC.md:476, SPEC/procedures/ft-task.md:215, ft-task:152, ft-micro-task:122, ft-epic-discovery:240, ft-close-epic:197. Vocabulary surfaces: SPEC/gates.md §"Next-task cues" table (~:105) + §"Destructive-action escalation" non-command-cue list (:157), SPEC.md §"Operator-cue glossary" table (:341), SPEC/procedures/ft-task.md:50 glyph roster.
**Archive skim:** CORE-297 introduced the `Run in this session:` exception (🔧-anchored); CORE-304 de-anchored it to `<glyph>` but kept the model-glyph semantics; CORE-254.3 locked the cue vocabulary in gates.md — CORE-259 declined a third *next-move* glyph (🔧/🧠 stays binary; unaffected here — 👇 is a new in-session cue, not a third model tier).
**Pattern survey:** New cue follows the established `<glyph> <UPPERCASE-LABEL>` convention (`👇` / `HERE`) — added as table rows in gates.md + SPEC.md glossary and to the procedures roster, same shape as the 🗄️/▶️/✋ rows CORE-254.3 added. No new structure.
**Implementation:** 7 files, 10 edits. New cue registered per the `<glyph> <UPPERCASE-LABEL>` convention: 👇 / `HERE`. (1) gates.md §"Next-task cues": added the 👇 table row + a paragraph defining semantics (replaces the model glyph on the label line for context-dependent skills only; signals *where*, not weight; deliberate one-glyph widening of the CORE-254 vocabulary — distinct from CORE-259's declined third *model* glyph) + added 👇 to the never-escalates list. (2) SPEC.md §"Operator-cue glossary": 👇 row. (3) SPEC.md §Post-closure context-dependent flag + SPEC/procedures/ft-task.md exception + the 4 skill copy-paste bullets: label is now literally `👇 Run in this session:` with the model-signal-stays-on-candidate-line note. (4) procedures roster line gained 👇. Commit note: SPEC.md also carried the uncommitted v5.5.0 release pin (CORE-305 in flight) — pin temporarily reverted to v5.4.0 for this commit and re-applied after, keeping the release commit canonical.
**Docs touched:** SPEC.md, SPEC/gates.md, SPEC/procedures/ft-task.md, 4 SKILL.md files — updated as the deliverable. docs/GLOSSARY.md "copy-paste line" entry checked: describes the clear-session path only, no in-session claim — no change. CAPABILITIES.md /clear row quotes the clear-session cue only — no change.

## ✅ Recap

The context-dependent `Run in this session:` label now carries its own cue — 👇 (`HERE`) — instead of reusing the 🔧/🧠 model glyph, which made in-session asks read as light-model task cues. 👇 registered in the gates.md vocabulary (one-glyph widening of the CORE-254 set), the SPEC.md glossary, and the procedures roster; all six emission sites updated. The next-move model glyph set stays binary 🔧/🧠 on candidate lines and clear-session hand-offs.

**Archived:** 2026-06-10
