---
title: plan-exhausted-terminal-state
status: completed
tags: []
created: 2026-07-03
due:
related-tasks: []
---

# CORE-340 | plan-exhausted-terminal-state

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗

## 🎯 Goal

Add a "PLAN exhausted → stop, don't invent" terminal branch to SPEC
§Post-closure protocol step 2 so a task-runner that closes the last open task
halts cleanly instead of confabulating a next move from the `## Completed`
archive or doc examples.

## ✅ Acceptance

- [x] SPEC §Post-closure protocol step 2 documents a third **PLAN exhausted (terminal)** form alongside "Epic continuation" / "Open menu": no open task survives the re-read → stop, don't invent; offer in-session filing; skip the copy-paste reset line.
- [x] The terminal guard is propagated to the inheriting task-runner skills that carry their own suggest-next prose (`ft-task`, `ft-micro-task`) and to the `SPEC/procedures/ft-task.md` projection; by-reference inheritors (`ft-debug`, `ft-goal-task`, `ft-epic-discovery`) inherit without edit.
- [x] `/ft-close-epic`'s existing empty-PLAN pattern is cross-referenced as the now-canonical source.

- [x] Add the **PLAN exhausted (terminal)** branch to `SPEC.md` §Post-closure protocol step 2.
- [x] Add a terminal guard sentence to `SPEC/procedures/ft-task.md` step 2 (contract-only projection parity).
- [x] Add a terminal note to `claude/skills/ft-task/SKILL.md` suggest-next-move bullet.
- [x] Add a terminal note to `claude/skills/ft-micro-task/SKILL.md` suggest-next bullet.
- [x] Add a "now canonical" cross-ref to `claude/skills/ft-close-epic/SKILL.md` line 197.

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Real gap. SPEC §Post-closure protocol step 2 enumerates exactly two next-move forms — "Epic continuation" and "Open menu" — both presupposing ≥1 open task. On PLAN exhaustion a runner has no documented terminal branch, so it confabulates a move from `## Completed` or a doc example. The corrective pattern already exists in `/ft-close-epic` (empty-PLAN → suggest filing a new epic in-session); lifting it into canon is the right, minimal fix.

- [x] Read relevant source files

- [x] **Archive skim** — no prior CORE tasknote addressed the PLAN-exhausted terminal state; the only existing handling is `/ft-close-epic` SKILL.md line 197 (the pattern this task promotes). Broad "exhaust" grep hits are loop-budget contexts, unrelated.

- [x] **Drift check** — verified: SPEC step 2 forms live at SPEC.md lines 519-522 (`Either form:` → Epic continuation / Open menu); `/ft-close-epic` empty-PLAN pattern at SKILL.md line 197; procedures projection at `SPEC/procedures/ft-task.md` step 2 (lines 195-199, says "suggest the next task" with no terminal guard). No drift. The cited BE-250 transcript is a different project's incident (motivation only, not in this repo's archive).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (a) canon lives in SPEC §Post-closure protocol step 2, so by-reference inheritors (`ft-debug`, `ft-goal-task`, `ft-epic-discovery`) auto-inherit; (b) only skills with their own enumerated suggest-next prose (`ft-task`, `ft-micro-task`) plus the `procedures/ft-task.md` projection get an explicit terminal note; (c) `/ft-close-epic` keeps its specialized wording, gaining a "now canonical" cross-ref.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Propagation surface map:**
- **Canon** — `SPEC.md` §Post-closure protocol step 2 (PRIMARY): add terminal form.
- **Projection** — `SPEC/procedures/ft-task.md` step 2: terminal guard for contract-only agents.
- **Own suggest-next prose** — `ft-task` (SKILL line 151), `ft-micro-task` (SKILL Step 5): explicit terminal note.
- **Source pattern** — `ft-close-epic` (SKILL line 197): already correct; add "now canonical" cross-ref.
- **By-reference (no edit)** — `ft-debug` ("exactly as /ft-task Step 5/6"), `ft-goal-task` ("identical to /ft-task"), `ft-epic-discovery` (references SPEC canon; always has a freshly-filed next child anyway).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `/ft-close-epic`'s existing empty-PLAN handling (SKILL.md line 197) rather than inventing a new shape; mirrored SPEC step 2's existing two-form bullet structure ("Epic continuation" / "Open menu") by adding a parallel third bullet.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (docs/canon only; no code, no parser/grammar change).

**Implementation Notes:**

Five edits, all additive prose:
1. `SPEC.md` §Post-closure protocol step 2 — `Either form:` → `One of three forms:`, added **PLAN exhausted (terminal)** bullet (canon).
2. `SPEC/procedures/ft-task.md` step 2 — terminal-case guard sentence for contract-only agents.
3. `claude/skills/ft-task/SKILL.md` — terminal note in the suggest-next-move candidates bullet.
4. `claude/skills/ft-micro-task/SKILL.md` — terminal note in the suggest-next bullet.
5. `claude/skills/ft-close-epic/SKILL.md` line 197 — "now canonical" cross-ref to the SPEC form.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changed; flowtron ships zero scripts, markdown-only edits).

- [x] Ran lint/type-check on changed code — N/A (prose docs). Verified all 5 targets carry the "PLAN exhausted" form via grep; no broken cross-references.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:** `grep -l "PLAN exhausted"` confirms the terminal form in all 5 files. Parser/grammar untouched, so `viz/` tests are unaffected.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: no change. None restate the post-closure next-move forms ("Epic continuation" / "Open menu"), so none drift. `SPEC.md` was edited as the task target, not as drift.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-03.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (inline on conditional skip)

**Final Summary:** Added a third **PLAN exhausted (terminal)** form to SPEC §Post-closure protocol step 2 — when a fresh PLAN.md re-read leaves no open task, the runner must stop and offer in-session filing rather than confabulate a next move from `## Completed` or a doc example. Propagated the guard to the two skills with their own suggest-next prose (`ft-task`, `ft-micro-task`) and the `SPEC/procedures/ft-task.md` projection; by-reference inheritors (`ft-debug`, `ft-goal-task`, `ft-epic-discovery`) inherit automatically. Cross-referenced `/ft-close-epic`'s pre-existing empty-PLAN pattern as the now-canonical source. Docs-only; 5 files, +13/-5.

**Archived:** 2026-07-03
