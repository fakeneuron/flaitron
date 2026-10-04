---
title: close-epic-followup-no-clear
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-172 | close-epic-followup-no-clear

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Special-case `/ft-file-followup` candidates in `/ft-close-epic` Step 9 so they're surfaced as "file in this session before /clear" rather than the standard `/clear → /model → /ft-file-followup` copy-paste, which would lose the session context the skill needs.

## ✅ Acceptance

- [ ] `/ft-close-epic` Step 9 next-move logic distinguishes `/ft-file-followup` candidates from other skill candidates
- [ ] File-followup candidates carry a "file in this session before /clear" instruction instead of a `/clear` copy-paste line
- [ ] Non-file-followup candidates continue to use the standard `/clear → /model → /<skill> <args>` form
- [ ] No other skill files change

## 🧩 Subtasks

- [ ] Read `/ft-close-epic` SKILL.md, locate Step 9 copy-paste + next-move shape
- [ ] Determine the minimal edit to special-case `/ft-file-followup` candidates
- [ ] Apply the edit
- [ ] Doc-drift sweep → close

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Problem is live — `ft-close-epic/SKILL.md` Step 9 applies the standard `/clear`-first copy-paste uniformly, including to `/ft-file-followup` candidates that can't self-bootstrap after context is cleared.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `ft-close-epic/SKILL.md` Step 9 "Copy-paste line" confirmed: `standard /clear then /model <opus|sonnet> then /<next-skill> <args> shape` — applies uniformly, no file-followup carve-out.
- CORE-167 (copy-paste alternation in ft-task/SKILL.md) and CORE-158 (SPEC §3 generalization) are related background — neither touches ft-close-epic or ft-file-followup specifically.
- SPEC §"Post-closure protocol" Step 3 copy-paste covers ft-task / ft-micro-task / ft-starter-task only; no change needed there.
- No clarifications needed. Assumptions: edit is limited to `ft-close-epic/SKILL.md` Step 9 copy-paste sentence; /ft-file-followup candidates get "file in this session before /clear"; all other candidates keep the standard form.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no existing carve-out pattern in the skill suite; new shape justified by the unique constraint that /ft-file-followup needs live session context
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Edited `claude/skills/ft-close-epic/SKILL.md` Step 9 "Copy-paste line" sentence (1 line changed).
- New form: non-file-followup candidates → standard `/clear → /model → /<skill>` copy-paste; file-followup candidates → "file in this session before /clear" with example phrase.
- Rationale included inline in the SKILL: "/ft-file-followup cannot self-bootstrap from PLAN.md reads the way other skills can."

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only edit to a SKILL.md file. No test suite, no lint surface, no frontend changes. N/A on all three boxes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 9 AI-referenced docs: no change. Only `claude/skills/ft-close-epic/SKILL.md` was edited; not in the cold-start sweep set.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/CORE-172.md`
- [x] Recap drafted

**Final Summary:**

Added a `/ft-file-followup` exception to `ft-close-epic/SKILL.md` Step 9's copy-paste instruction: file-followup candidates are now surfaced as "file in this session before /clear" rather than the standard `/clear`-first form, because `/ft-file-followup` needs the live session context to produce its paragraph. Non-file-followup candidates continue using the standard form. One sentence changed in one file.

**Archived:** 2026-05-24
