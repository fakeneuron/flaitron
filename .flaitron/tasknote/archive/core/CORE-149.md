---
title: ft-new-project-agents-seed
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-149 | ft-new-project-agents-seed

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add `AGENTS.md` to the seeded-docs enumeration in ft-new-project/SKILL.md Step 8 hand-off so the parenthetical matches the four-entry list in templates/tasknote-README.md §"AI-referenced docs".

## ✅ Acceptance

- [ ] Step 8 hand-off in `claude/skills/ft-new-project/SKILL.md` reads "seeded with `README.md` / `AGENTS.md` / `CLAUDE.md` / `_project/PLAN.md`"

## 🧩 Subtasks

- [ ] Read source file to confirm exact current text and line number
- [ ] Edit SKILL.md Step 8 to add `AGENTS.md` to the enumeration

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Step 8 hand-off in SKILL.md line 138 reads "seeded with `README.md` / `CLAUDE.md` / `_project/PLAN.md`" — three entries — while `templates/tasknote-README.md` §"AI-referenced docs" lists four entries including `AGENTS.md` as entry #2. CORE-129 added `AGENTS.md` to Step 4 but did not update Step 8. Single-line fix.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Archive hits on `ft-new-project/SKILL.md`: CORE-108 (version-pin; Step 6 only) and CORE-129 (AGENTS.md migration; Steps 3/4/7 but not Step 8). CORE-129 is the task that introduced the gap this task fixes. No drift — current Step 8 text confirmed missing `AGENTS.md`. No clarifications needed; assumption: the target text is `README.md` / `AGENTS.md` / `CLAUDE.md` / `_project/PLAN.md` matching template entry order.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

`claude/skills/ft-new-project/SKILL.md` line 138: inserted `` `AGENTS.md` / `` between `` `README.md` / `` and `` `CLAUDE.md` `` to match template entry order. No tests applicable (doc-only change).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Doc-only change; no test suite or lint applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

One-character insertion in `claude/skills/ft-new-project/SKILL.md` Step 8 hand-off — added `` `AGENTS.md` / `` to the seeded-docs enumeration so it matches `templates/tasknote-README.md` entry #2. Gap introduced by CORE-129 (which added AGENTS.md to Step 4 but missed Step 8).

**Archived:** 2026-05-23
