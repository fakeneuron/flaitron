---
title: worktrees-doc-reconcile
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: []
---

# CORE-242 | worktrees-doc-reconcile

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix two stale spots in `docs/WORKTREES.md`: correct the malformed `<wt-TASK-ID>` → `wt-<TASK-ID>` in the Location row, and de-future-tense the CORE-215.* framing since those skills have shipped.

## ✅ Acceptance

- [ ] Line 13 Location row reads `wt-<TASK-ID>` (not `<wt-TASK-ID>`)
- [ ] Lines 51/57/59-61 no longer frame CORE-215.* skills as future/upcoming — present tense or removed hedges

## 🧩 Subtasks

- [ ] Read `docs/WORKTREES.md` and confirm exact current text at the cited lines
- [ ] Fix malformed `<wt-TASK-ID>` in the Location row (line 13)
- [ ] De-future-tense the CORE-215.* framing (lines 51/57/59-61)
- [ ] Doc-drift sweep + archive + PLAN.md flip

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both issues confirmed live in `docs/WORKTREES.md`. Line 13 Location row uses `<wt-TASK-ID>` (angle brackets in wrong position); line 57 future-tenses the shipped CORE-215.5; lines 59-61 use "will be recorded" for completed CORE-215.3/215.4.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim:** CORE-215.2 authored `docs/WORKTREES.md` and already carried `<wt-TASK-ID>` (the malformed form) in its own Goal line — the error originated at authoring. CORE-229 fixed an analogous stale CORE-215.5 forward-ref in MIGRATION.md (different file, same pattern). No blocking decisions; both prior tasknotes confirm the fixes are straightforward doc-only edits.

**Drift check:**
- Line 13 Location row: `<wt-TASK-ID>` confirmed — malformed vs `wt-<TASK-ID>` at lines 14, 40, 41 and Branch naming convention.
- Line 51 ("are implemented"): already present tense — no fix needed.
- Line 57: "Full surface updates **land** in [[CORE-215.5]]" — CORE-215.5 completed 2026-05-30; "land" is stale future-framing.
- Lines 59-61: "will be recorded...folded back...in a follow-up" — future tense; CORE-215.3/215.4 both completed; no follow-up was ever needed.

**Clarifications:** No clarifications needed. Three unambiguous string fixes: (1) `<wt-TASK-ID>` → `wt-<TASK-ID>` in Location row, (2) "land" → "landed" on line 57, (3) future-tense Open Questions prose → past tense on lines 59-61.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern from CORE-229 (stale-forwardref cleanup in MIGRATION.md): surgical string edits only. Three changes in `docs/WORKTREES.md`:
1. Line 13 Location row: `<wt-TASK-ID>` → `wt-<TASK-ID>` (angle brackets now surround only the placeholder, matching lines 14/40/41 and branch naming convention)
2. Line 57: "land" → "landed" (de-future-tense CORE-215.5 reference)
3. Line 61: "that surface...will be recorded...folded back into this doc in a follow-up" → past-tense form; no adoption-relevant changes surfaced

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure markdown change (3 string edits in one doc file). No test suite, no lint/type-check surface on executables. No frontend files — no 👁️ visual confirmation needed. Conditional skip signals: zero frontend files, zero privileged-ops, zero perf-narrative. Clean for autonomous commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:** All 11 AI-referenced docs: no change. Only `docs/WORKTREES.md` was modified (not in the listed set).

**Final Summary:**

Fixed two stale-doc issues in `docs/WORKTREES.md` surfaced by the 2026-05-31 audit-docs run: corrected the malformed `<wt-TASK-ID>` placeholder in the Location row and de-future-tensed two CORE-215.* references whose work has shipped.

Technical: 1 file touched (`docs/WORKTREES.md`, 3 surgical string edits). No code, no frontend, no SPEC impact. Pattern followed CORE-229 (identical stale-forwardref cleanup in MIGRATION.md).

**Archived:** 2026-05-31
