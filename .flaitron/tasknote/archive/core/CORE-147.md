---
title: placeholder-none-sync
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-147 | placeholder-none-sync

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the `(none — ...)` placeholder form in `ft-starter-task/SKILL.md` and `ft-file-followup/SKILL.md` to match the canonical `(none)` form from `templates/PLAN.md`, so the replace-branch fires correctly for adopters using the standard template.

## ✅ Acceptance

- [ ] `ft-starter-task/SKILL.md` line ~78 uses `(none)` not `(none — ...)`
- [ ] `ft-file-followup/SKILL.md` line ~78 uses `(none)` not `(none — ...)`
- [ ] Both match the canonical placeholder in `templates/PLAN.md`

## 🧩 Subtasks

- [ ] Read ft-starter-task/SKILL.md and ft-file-followup/SKILL.md to confirm exact current text
- [ ] Read templates/PLAN.md to confirm canonical placeholder form
- [ ] Fix ft-starter-task/SKILL.md
- [ ] Fix ft-file-followup/SKILL.md

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both SKILL.md files at line 78 use `(none — ...)` but `templates/PLAN.md` canonical placeholder is `(none)`. Bug is real — replace-branch never fires for adopters using standard template.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
- `ft-starter-task/SKILL.md:78` — `(none — ...)` confirmed.
- `ft-file-followup/SKILL.md:78` — `(none — ...)` confirmed.
- `templates/PLAN.md` canonical placeholder: `(none)` (bare, no dash/ellipsis).
- Archive skim: CORE-004/007/008/012/017 mention these paths; all predate this placeholder pattern — no load-bearing prior decisions.
- Drift check: line numbers match exactly; no drift.
- No clarifications needed — mechanical two-file string replacement.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — both files use identical placement-block wording; same fix applies to each.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**
- Changed `(none — ...)` → `(none)` in `claude/skills/ft-starter-task/SKILL.md:78` and `claude/skills/ft-file-followup/SKILL.md:78`.
- No tests — markdown-only skill files.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**
- No test suite or lint for markdown skill files. No frontend changes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md, SPEC.md, MIGRATION.md, AGENTS-snippet.md, CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md — all no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**
Fixed `(none — ...)` → `(none)` in the placement-block of `ft-starter-task/SKILL.md:78` and `ft-file-followup/SKILL.md:78`, aligning both skills to the canonical `templates/PLAN.md` placeholder form so the replace-branch fires correctly for adopters.

**Archived:** 2026-05-23
