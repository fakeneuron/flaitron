---
title: epic-second-audit
status: completed
tags: [spec, epic]
created: 2026-10-10
due:
related-tasks: [CORE-776.N]
touches:
  - SPEC/epic.md
---

# CORE-776.4 | epic-second-audit

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-776.N]]

## 🎯 Goal

Drop the unrunnable "file a fresh Audit subtask" sentence from `SPEC/epic.md` §"Epic lifecycle" step 5.

## ✅ Acceptance

- [x] The sentence is gone from `SPEC/epic.md` — `! grep -q "fresh Audit" SPEC/epic.md`
- [x] No other file carries it — `! grep -rn "fresh Audit\|second wave" . --include='*.md' | grep -v 'tasknote/archive\|PLAN'`
- [x] No new drift-check failures — `bash tools/drift-checks.sh` (only the pre-existing `pair_q` failure from the CORE-776.6 row's forward citation remains)

## 🧩 Subtasks

- [x] Delete the sentence at `SPEC/epic.md:58`
- [x] Grep for other copies; run drift checks

## 🔗 Related

- [[CORE-776.N]] — parent epic audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The sentence is still at `SPEC/epic.md:58`. Step 5 already says follow-ups are filed by the audit itself and that an open child holds the parent flip, so a second Audit subtask has no role.

- [x] Read relevant source files — `SPEC/epic.md` §"Epic lifecycle" steps 4-5.

- [x] **Best Practices Review** — N/A, one-sentence doc deletion.

- [x] **Archive skim** — `archive/core/` area confirmed from the README table; the sentence appears in no archived note outside the PLAN row itself. No prior tasknotes in scope.

- [x] **Drift check** — PLAN line matches the SPEC text.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed (`[unattended]` row, one-line deletion).

- [x] Subtasks populated; `touches:` declared.

**Discovery Notes:** Discovery surfaced no significant deviation → skip 🛠️. The leftover "For a few small follow-ups, close the audit…" sentence still reads fine alone; left untouched per the surgical rule.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, deletion.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose.

**Implementation Notes:** Removed one line from `SPEC/epic.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown only.

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh`.

- [x] **Verification receipt** — see Testing Notes.

- [x] **External review** — N/A, one-line doc deletion too small to grade.

- [x] (frontend) N/A.

**Testing Notes:**

- `grep -c "fresh Audit" SPEC/epic.md` → 0 matches.
- `grep -rn "fresh Audit\|second wave" . --include='*.md'` outside archive/PLAN → no hits.
- `bash tools/drift-checks.sh` → only `pair_q FAILED` (`STALE SECTION .flaitron/PLAN.md — SPEC/plan-filing.md §"ID allocation"`); identical on the stashed clean tree, so pre-existing and owned by CORE-776.6.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change.

- [x] Closed — Acceptance ticked, PLAN.md line flipped to stub (nested under CORE-EPIC-776), tasknote archived.

- [x] **Evidence-based recap** drafted — changed `SPEC/epic.md` (−1 line), matches declared `touches:`; maintainability effect: removes a contradictory instruction.

- [x] **Learnings** — N/A.

**Final Summary:** Dropped the unrunnable "file a fresh Audit subtask" sentence from `SPEC/epic.md` step 5. `pair_q` failure is pre-existing (CORE-776.6 forward citation).

**Archived:** 2026-10-10
