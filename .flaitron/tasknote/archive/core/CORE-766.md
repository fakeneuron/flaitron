---
title: epic-discovery-model-clause
status: completed
tags: [model, frontier, docs]
created: 2026-10-08
due:
related-tasks: [CORE-746, CORE-741.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-epic-discovery/SKILL.md
  - docs/CONTEXT-BUDGET.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-766 | epic-discovery-model-clause

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-746]]

## 🎯 Goal

Give `/ft-epic-discovery` Step 4's Model item the trigger-only `[frontier]` / never-`[xheavy]` chooser clause that CORE-746 added to `/ft-file-followup` Step 2 item 3, in ≤~300 bytes.

## ✅ Acceptance

- [x] Step 4 Model item names the never-`[xheavy]` rule — `grep -n 'xheavy' claude/skills/ft-epic-discovery/SKILL.md` shows it on the Model item
- [x] Edit adds ≤ 337 bytes (file stays ≤ 33,000) — `test $(wc -c < claude/skills/ft-epic-discovery/SKILL.md) -le 33000`
- [x] Budgets and drift checks stay green — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Append the trigger-only `[frontier]` / never-`[xheavy]` clause to Step 4 item 4 in `claude/skills/ft-epic-discovery/SKILL.md`
- [x] Check byte count and run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-746]] — parent; added the clause to `/ft-file-followup` and surfaced this gap in its external review
- [[CORE-741.4]] — `[frontier]` routing-skill sweep that took `ft-epic-discovery` to 32,663 bytes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `[light]🔧`, `## Low` (Priority reads from the PLAN section; the line sits under it)

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** At HEAD (`49e1df25`) `claude/skills/ft-epic-discovery/SKILL.md:61` (Step 4 item 4, Model) still lacks the clause; `/ft-file-followup` Step 2 item 3 (`SKILL.md:113`) carries it. The file is 32,663 bytes, 337 under the 33,000 cap.

- [x] Read relevant source files — `claude/skills/ft-epic-discovery/SKILL.md` Step 4 items 1–5, `claude/skills/ft-file-followup/SKILL.md:113`, `SPEC/model.md` §"When to choose `[frontier]`" and the `xheavy` manual-only rung, `docs/CONTEXT-BUDGET.md` rows 49 and 98, the CORE-746 archived note.

- [x] **Best Practices Review** — N/A (one prose clause in a skill body; no code or module boundary).

- [x] **Archive skim** — `grep -l ft-epic-discovery` over `archive/core/`: CORE-746 (the precedent, same clause on `/ft-file-followup`) and CORE-741.4 (took the file to 32,663 bytes); nothing contradicts the task. `<area>` = `core` per the README table.

- [x] **Drift check** — PLAN line, sidequest stub, and line 61 all match current code and `SPEC/model.md`. Item 4 already says a `[heavy]`/`[frontier]` epic files `.1` as `[frontier]` and that "a concrete or `[xheavy]` token stays as filed" — that is the *child-derivation* rule, not the chooser rule for the AI's own proposal, so the clause is still absent. `codex/skills/ft-epic-discovery/SKILL.md` has no Model item to mirror it into.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: the clause mirrors `/ft-file-followup`'s wording but is shortened because the same item already cites `SPEC/model.md` §"When to choose `[frontier]`"; no other file changes except a possible `docs/CONTEXT-BUDGET.md` byte-count refresh if the doc-drift sweep says so.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — `claude/skills/ft-epic-discovery/SKILL.md:61` (Step 4 Model item) lacks the trigger-only `[frontier]` / never-`[xheavy]` chooser clause that CORE-746 added to `/ft-file-followup` Step 2 item 3. The file is 32,663 of its 33,000-byte budget, so the edit must stay under ~300 bytes. Surfaced by CORE-746's external review.
>
> **Resume anchor** — Closing CORE-746 Phase 3 (External review recorded) and Phase 4 closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only

**Implementation Notes:**

Pattern survey: mirrored `/ft-file-followup` Step 2 item 3's clause, shortened — item 4 already cites `SPEC/model.md` §"When to choose `[frontier]`" later in the sentence. Appended inside the existing parenthetical: `; `[frontier]` only on a trigger, never `[xheavy]` — the operator's manual-only rung`. +86 bytes (32,663 → 32,749). Doc-drift: refreshed the `ft-epic-discovery` byte count and headroom in `docs/CONTEXT-BUDGET.md` row 49. No tests (prose-only).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -n 'xheavy' claude/skills/ft-epic-discovery/SKILL.md` → 0; line 61 carries the clause
- `test $(wc -c < claude/skills/ft-epic-discovery/SKILL.md) -le 33000` → 0 (32,749)
- `bash tools/drift-checks.sh` → 0 (all checks ok, `context_budget` included)
- External review: N/A — the diff is one 86-byte clause plus a one-line budget-doc number refresh; too small to grade.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** `/ft-epic-discovery` Step 4 Model item now carries the trigger-only `[frontier]` / never-`[xheavy]` clause, matching `/ft-file-followup`. Changed `claude/skills/ft-epic-discovery/SKILL.md` (+86 bytes, 32,749/33,000) and `docs/CONTEXT-BUDGET.md` (byte count and headroom refreshed). Doc-drift sweep: the budget doc was the only citer. `touches:` reconciliation: the diff also covered `docs/CONTEXT-BUDGET.md` and the sidequest stub deletion, neither declared. Learnings: N/A.

**Archived:** 2026-10-08
