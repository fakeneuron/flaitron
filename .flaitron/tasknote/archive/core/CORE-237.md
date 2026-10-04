---
title: post-closure-form-spec-drift
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-237 | post-closure-form-spec-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the literal `/clear then /model` copy-paste prescription from SPEC §"Post-closure protocol" steps 2–3 and update CAPABILITIES.md §`/model` trigger to match the emoji/prose form already canonical in ft-task SKILL.md + GLOSSARY.

## ⚡ Notes

**Relevance:** Proceed — targeted doc-drift fix across 3 files (SPEC.md, CAPABILITIES.md, AGENT-NEUTRALITY.md); canonical form already correct in ft-task SKILL.md + GLOSSARY, just not yet backported to SPEC.

**Drift check:** All three stale sites confirmed at current HEAD: SPEC.md ~line 424-430 (literal `/clear then /model` code block in §3), CAPABILITIES.md line 31 ("post-closure copy-paste line emits `/model <X>`"), AGENT-NEUTRALITY.md line 36 (references "§"Post-closure protocol" §3" for `/clear` + `/model`).

**Archive skim:** No prior tasknotes in archive/core/ specifically targeting the copy-paste form drift in SPEC §"Post-closure protocol". CORE-224.x series established CAPABILITIES.md; no post-canonical-form update recorded.

**Pattern survey:** Canonical form is in two sibling docs: (1) ft-task SKILL.md Step 5 line 151: "emit a short visual cue of the form 'Clear your session, then use 🔧 /ft-task <next-ID>'… Never emit a literal `/clear then /model ...` instruction"; (2) GLOSSARY.md: "Never emits literal `/model` or `/clear` commands." Three sites to align.

**Implementation:** Updated four text blocks across three files:
- SPEC.md Step 2: `[model]` bare-token example → emoji form (`[heavy]🧠` / `[light]🔧`) with "design vs mechanical" prose; prose above updated from "surface candidates with `[model]` tags" to emoji-label form.
- SPEC.md Step 3: Removed the fenced `/clear then /model <opus|sonnet> then /<next-skill> <args>` code block + its explanatory prose; replaced with compact emoji/prose prescription ("Never emit literal `/clear` or `/model` commands").
- CAPABILITIES.md `/model` row: Removed "The post-closure copy-paste line emits `/model <X>` to pre-empt the Step 1.5 model-mismatch gate on the next hand-off." Replaced with framing that the emoji candidate list signals the target model and `/model` is the operator's tool to act on that signal.
- AGENT-NEUTRALITY.md ledger row 36: Removed `SPEC.md` + §"Post-closure protocol" §3 from citation location (literal `/clear`/`/model` no longer in contract layer §3); updated to `SPEC/model.md` only for `/model <X>`; removed `/clear` from the tracked terms; updated count from "3 sites" to "1 site"; tightened rationale.

**Docs touched:** SPEC.md §"Post-closure protocol" steps 2–3 — updated (this is the work). CAPABILITIES.md §"The triggers" `/model` row — updated. AGENT-NEUTRALITY.md ledger row for `/clear` + `/model <X>` — updated. docs/GLOSSARY.md — no change (already canonical). ft-task SKILL.md — no change (already canonical).

## ✅ Recap

Removed the stale `/clear then /model <opus|sonnet> then /<next-skill> <args>` code-block prescription from SPEC §"Post-closure protocol" steps 2–3; replaced with the emoji/prose form already canonical in ft-task SKILL.md + GLOSSARY. Updated CAPABILITIES.md `/model` row and AGENT-NEUTRALITY.md ledger to remove now-stale references to the copy-paste line emitting literal `/model`/`/clear` commands.

**Archived:** 2026-05-30
