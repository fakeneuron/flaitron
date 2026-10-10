---
title: single-model-decay-window
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-774]
touches:
  - SPEC/model.md
  - .flaitron/PLAN.md
---

# CORE-773 | single-model-decay-window

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-774]]

## 🎯 Goal

Open the single-model decay window: drop the "no swapping mid-task" paragraph from `SPEC/model.md`, record the window-start SHA, and file the restore-read row.

## ✅ Acceptance

- [x] Paragraph removed — `! grep -q "no swapping mid-task" SPEC/model.md`
- [x] `AGENTS.md` "end-to-end" mirror kept — `grep -q "run on end-to-end" AGENTS.md`
- [x] Restore-read row filed in PLAN.md — `grep -q "CORE-774" .flaitron/PLAN.md`
- [x] Window-start SHA recorded — `grep -q "b7106192" .flaitron/tasknote/CORE-773.md`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Delete the paragraph at `SPEC/model.md:42-45`
- [x] File the restore-read row (CORE-774)
- [x] Run the drift checks

## 🔗 Related

- [[CORE-774]] — restore-read follow-up
- [[CORE-659]] — precedent decay-window shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Row is open and unarchived, the tree was clean at start. The target paragraph still exists, now at `SPEC/model.md:42-45` as cited.

- [x] Read relevant source files — `SPEC/model.md` in full, `AGENTS.md`, `claude/AGENTS-snippet.md`.

- [x] **Best Practices Review** — `N/A`: single prose deletion in a SPEC module, no boundary touched.

- [x] **Archive skim** — followed the CORE-659 precedent (decay window, SHA recorded in the opening tasknote, restore-read follow-up row).

- [x] **Drift check** — one drift: the PLAN row cites `AGENTS.md:35` for the "end-to-end" mirror, but it now sits at `AGENTS.md:42`. The content is intact and stays. `claude/AGENTS-snippet.md:28` carries the same mirror.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--unattended). Assumption: the restore-read row is a new PLAN row filed directly as part of this task's deliverable.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Discovery surfaced no significant deviation → skip 🛠️.

Window-start SHA: `b7106192` (`chore: CORE-771 — roster-flag-guard`, HEAD before any edit).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Deleted the 4-line paragraph from `SPEC/model.md` (pre-edit lines 42-45). Filed CORE-774 (restore-read) under `## Low`. `AGENTS.md:42` and `claude/AGENTS-snippet.md:28` "end-to-end" mirrors untouched. Pattern: CORE-659 decay window.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: not a frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `! grep -q "no swapping mid-task" SPEC/model.md` → 0
- `grep -q "run on end-to-end" AGENTS.md` → 0
- `grep -q CORE-774 .flaitron/PLAN.md` → 0
- `grep -q b7106192 .flaitron/tasknote/CORE-773.md` → 0
- `bash tools/drift-checks.sh` → 0
- `just test` → 0 (591 passed); `just lint` → 0; `just typecheck` → 0
- External review: `N/A` — 5-line prose deletion plus one filed PLAN row; too small to grade.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: no other doc cites the removed paragraph (grep for `swapping mid-task` / `silently swap` outside archive is empty)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`

**Final Summary:**

Dropped the "no swapping mid-task" paragraph from `SPEC/model.md`, opening the single-model decay window. Window-start SHA: `b7106192`. Filed [[CORE-774]] to restore if any of the next 10 archived tasknotes shows a cross-model resume degrading the work. `touches:` reconciliation: `SPEC/model.md` and `.flaitron/PLAN.md` match the diff; the tasknote itself is the only addition. Doc verdict: no change. Learnings: N/A.

**Archived:** 2026-10-10
