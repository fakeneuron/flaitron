---
title: wikilink-token placeholder hygiene
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: []
---

# CORE-076 | wikilink-token placeholder hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace `[[RELATED-1]] [[RELATED-2]]` placeholder tokens in `step-3a-promote-starter.md:12` with a form that doesn't collide with the wikilink-integrity grep, and pin the safe placeholder shape in SPEC §"Long-description conventions".

## ✅ Acceptance

- [ ] `step-3a-promote-starter.md:12` uses angle-bracket-inside placeholder form (`[[<related-id>]]`) instead of `[[RELATED-N]]`
- [ ] `grep -nE '\[\[([A-Z]+-(EPIC-)?[0-9]+(\.[0-9]+)?)\]\]' claude/skills/task/step-3a-promote-starter.md` returns zero hits
- [ ] SPEC §"Long-description conventions" carries a one-liner pinning the safe placeholder shape for skill/doc files

## 🧩 Subtasks

- [ ] Fix line 12 of `claude/skills/task/step-3a-promote-starter.md` — replace `[[RELATED-1]] [[RELATED-2]]` with `[[<related-id-1>]] [[<related-id-2>]]`
- [ ] Add one-liner to SPEC.md §"Long-description conventions" (after the backtick-escape note, line ~132)
- [ ] Verify grep returns zero hits on the changed file
- [ ] Doc-drift sweep and closure

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The wikilink-integrity grep (`grep -nE '\[\[([A-Z]+-(EPIC-)?[0-9]+(\.[0-9]+)?)\]\]'`) matches `RELATED-1` and `RELATED-2` literally since they're all-uppercase followed by a hyphen and digit — exactly the pattern. The grep is a plain-text search; it doesn't understand that the tokens are inside a backtick code span in the rendered markdown, so they show up as false positives every time the audit runs. The SPEC already pins backtick escaping for PLAN.md prose; this task extends the guidance to skill/doc files with the angle-bracket-inside shape.

- [x] Read relevant source files
- [x] **Archive skim** — `ls _project/tasknote/archive/core/` — no prior tasknotes touching step-3a or wikilink placeholder. No load-bearing prior art.
- [x] **Drift check** — `step-3a-promote-starter.md` line 12 still reads `[[RELATED-1]] [[RELATED-2]]`; SPEC §"Long-description conventions" (line 116) has no existing placeholder-shape note. Both match the task description. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Grep pattern from CORE-073 discovery: `grep -nE '\[\[([A-Z]+-(EPIC-)?[0-9]+(\.[0-9]+)?)\]\]'`
- `RELATED-1` matches because: `RELATED` → `[A-Z]+`; `-` → literal; `1` → `[0-9]+`. Collision confirmed.
- Fix: `[[<related-id-1>]] [[<related-id-2>]]` — `<` is not `[A-Z]`, so the regex won't match.
- SPEC one-liner target: right after the existing backtick-escape sentence (line 132), before the Examples block.
- No clarifications needed. Both change sites are small and unambiguous.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SPEC already pins backtick escaping for PLAN.md prose; extended the convention to skill/doc files with angle-bracket-inside shape, consistent with the task description's suggestion
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — no tests applicable (markdown-only change)

**Implementation Notes:**

- `step-3a-promote-starter.md:12`: `[[RELATED-1]] [[RELATED-2]]` → `[[<related-id-1>]] [[<related-id-2>]]`
- `SPEC.md` §"Long-description conventions": added 3-line note after the backtick-escape sentence pinning `[[<placeholder>]]` for skill/doc illustrative wikilinks

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no test suite applies; markdown-only
- [x] Ran lint/type-check on changed code — verified with grep: zero hits for `[[RELATED-1]]` / `[[RELATED-2]]`; pre-existing `[[CORE-017]]` (legitimate resolved wikilink) remains
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a

**Testing Notes:**

- `grep -nE '\[\[([A-Z]+-(EPIC-)?[0-9]+(\.[0-9]+)?)\]\]' claude/skills/task/step-3a-promote-starter.md` → 1 hit: `[[CORE-017]]` on line 17 (pre-existing, resolves — one of the 5 valid wikilinks from CORE-073 audit). Zero false-positive placeholders remain.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: one-liner added to §"Long-description conventions" (this is the change) · docs/MIGRATION.md: no change · claude/CLAUDE-snippet.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Two-file fix for wikilink-integrity grep false positives. Replaced `[[RELATED-1]] [[RELATED-2]]` with `[[<related-id-1>]] [[<related-id-2>]]` in `step-3a-promote-starter.md:12`; added a 3-line note to SPEC §"Long-description conventions" pinning `[[<placeholder>]]` as the safe shape for illustrative wikilinks in skill/doc files.

**Archived:** 2026-05-10
