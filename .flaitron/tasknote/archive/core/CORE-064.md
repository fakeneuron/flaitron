---
title: equalize step-1.5 fragments
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-056]
---

# CORE-064 | equalize step-1.5 fragments

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-056]]

## 🎯 Goal

Equalize `claude/skills/micro-task/step-1.5-model-edge.md` with `claude/skills/task/step-1.5-model-edge.md` by porting the default-recommendation guidance and "next-time no question" note that the CORE-056 audit found missing.

## ✅ Acceptance

- [ ] `micro-task/step-1.5-model-edge.md` Legacy-entry includes the default-recommendation guidance (`opus` for design/multi-file/ambiguous, `sonnet` for mechanical)
- [ ] `micro-task/step-1.5-model-edge.md` Legacy-entry includes the "next-time no question" note (using `/micro-task`, not `/task`)
- [ ] `micro-task/step-1.5-model-edge.md` Legacy-entry includes the placement instruction `(insert immediately after **TASK-ID**)` (part of the same paragraph being equalized)

## 🧩 Subtasks

- [ ] Edit `claude/skills/micro-task/step-1.5-model-edge.md` Legacy-entry paragraph to match `task/step-1.5-model-edge.md`
- [ ] Doc-drift sweep
- [ ] Close: flip PLAN.md line, move tasknote to archive

## 🔗 Related

- [[CORE-056]] — audit that surfaced the content gap between the two step-1.5 fragments

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both files exist, gap is exactly as CORE-056 described — no drift.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- CORE-056 (archived) precisely identifies the two missing items in `micro-task/step-1.5-model-edge.md` Legacy-entry: (1) default recommendation guidance, (2) "next-time no question" note.
- Gap confirmed by reading both files: `task/` version is the reference; `micro-task/` version also missing the placement instruction `(insert immediately after **TASK-ID**)`.
- "next-time" note must say `/micro-task` not `/task` (skill-appropriate adaptation).
- No clarifications needed. Scope: 1 paragraph in 1 file, ~5 lines added.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `task/step-1.5-model-edge.md` is the reference; direct extension, no new shape needed
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill fragment)

**Implementation Notes:**

Equalized `micro-task/step-1.5-model-edge.md` Legacy-entry paragraph with `task/` reference: added default-recommendation guidance, placement instruction, and "next-time no question" note (adapted `/task` → `/micro-task`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown)
- [x] Ran lint/type-check on changed code — N/A (markdown)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change; SPEC.md: no change; docs/MIGRATION.md: no change; claude/CLAUDE-snippet.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Added three missing items to `claude/skills/micro-task/step-1.5-model-edge.md` Legacy-entry paragraph: default-recommendation guidance (`opus` for design/ambiguous, `sonnet` for mechanical), placement instruction, and "next-time no question" note. One-line change; the `task/` fragment is now the canonical reference for both skills.

**Archived:** 2026-05-09
