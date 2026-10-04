---
title: de-anchor copy-paste glyph
status: completed
tags: []
created: 2026-06-10
due:
related-tasks: [CORE-255, CORE-254.4, CORE-297]
---

# CORE-304 | de-anchor copy-paste glyph

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Stop assistants from emitting a 🔧 label line for 🧠-tagged next tasks by removing the hardcoded 🔧 anchor from the post-closure copy-paste example templates — replace it with an explicit `<glyph>` placeholder and put the 🔧/🧠 mapping before the example.

## ⚡ Notes

**Relevance:** Proceed — live failure observed today in bananapeel (v5.4.0, current): post-closure candidate line correctly printed `[opus]🧠` for BP-2410.6 but the copy-paste label line came out 🔧. The matching *rule* exists (CORE-255) but every example template still hardcodes 🔧 with the 🧠 swap in a trailing parenthetical — assistants anchor on the literal example over the prose rule.
**Drift check:** All PLAN-cited sites verified present at patch time: SPEC.md §Post-closure step 3 (~467) + context-dependent flag (~476), SPEC/procedures/ft-task.md step 3 (~200), ft-task:152, ft-micro-task:122, ft-epic-discovery:240, ft-close-epic:197, ft-worktree-start:142-144 handoff block. Plus one site beyond the PLAN line: docs/GLOSSARY.md:31 "copy-paste line" entry carried the same `use 🔧` anchor.
**Archive skim:** CORE-255 (made the glyph rule candidate-driven but kept the hardcoded 🔧 in the example shapes — the surviving anchor this task removes), CORE-254.4 (wired the cue vocabulary with literal 🔧 phrasing), CORE-297 (added the context-dependent `Run in this session:` exception, also 🔧-anchored), CORE-237 (prose-cue form, "never literal /clear"). CORE-259 confirms the glyph set stays binary 🔧/🧠 — no vocabulary change here.
**Pattern survey:** Extended the existing angle-bracket placeholder convention already used in these exact templates (`<next-skill>`, `<args>`, `<next-ID>`) with `<glyph>`; the worktree-start handoff block uses `${GLYPH}` to match its sibling `${TASK_ID}`/`${WT_DIR}` substitution style. No new shape.
**Implementation:** 8 files. In every hand-off template: (1) the mapping rule now comes *before* the example ("copied from the chosen candidate line — 🧠 when it showed 🧠, 🔧 when it showed 🔧; never default to 🔧"); (2) the literal 🔧 in the example is replaced with `<glyph>` (or `${GLYPH}` in worktree-start's printed block); (3) the context-dependent `Run in this session:` exception now also uses `<glyph>` (same glyph rule). Intentionally untouched: ft-release:92's hardcoded 🧠 (fixed target `/ft-release`, always heavy — correct by construction); claude/commands/ft-worktree-start.md (shows both glyphs with the mapping, no anchor); SPEC/gates.md + SPEC/model.md (vocabulary definitions, not emission templates); archived tasknotes.
**Docs touched:** The changed files *are* the AI-referenced contract docs — SPEC.md, SPEC/procedures/ft-task.md, docs/GLOSSARY.md updated as the deliverable; 5 SKILL.md files (ft-task, ft-micro-task, ft-epic-discovery, ft-close-epic, ft-worktree-start). No other doc claims about the copy-paste line found stale.

## ✅ Recap

De-anchored the post-closure copy-paste templates: the hand-off example no longer leads with a literal 🔧 — all 8 live sites now state the candidate-glyph mapping first and use a `<glyph>`/`${GLYPH}` placeholder in the template, attacking the example-anchoring mechanism that CORE-255's rule-side fix left in place (observed misfire: bananapeel BP-2410.6, `[opus]🧠` candidate → 🔧 label line). Prompt-following can't be made impossible, only rare — an audit pass should treat any reappearing literal-glyph hand-off template as a regression.

**Archived:** 2026-06-10
