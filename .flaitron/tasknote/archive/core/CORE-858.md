---
title: seed-question-only-ask
status: completed
tags: [skills, ft-seed-unattended]
created: 2026-11-01
due:
related-tasks: [CORE-850.4]
touches:
  - claude/skills/ft-seed-unattended/scope-and-question.md
  - claude/skills/ft-seed-unattended/SKILL.md
  - SPEC/plan-filing.md
---

# CORE-858 | seed-question-only-ask

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-850.4]]

## 🎯 Goal

When every offer in an `/ft-seed-unattended` gate is a question, lead the ask with `<ID> <letter>` so an `all` reply no longer writes nothing by surprise; and stop the seed commit subject from reading `— 1 rows`.

## ✅ Acceptance

- [x] The fragment's §"Step 3" ask leads with `<ID> <letter>` when every offer is a question — `grep -q 'every offer is a question' claude/skills/ft-seed-unattended/scope-and-question.md`
- [x] SKILL.md Step 4 writes `1 row` (singular) when `<N>` is 1 — `grep -q '1 row' claude/skills/ft-seed-unattended/SKILL.md`
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the question-only lead to `scope-and-question.md` §"Step 3" → "The ask"
- [x] Add the singular rule on the `SKILL.md` Step 4 commit template (+ Step 5 report, `SPEC/plan-filing.md` table) — widened at External review
- [x] Run drift checks

## 🔗 Related

- [[CORE-850.4]] — added the `scope` / `question` dispositions and the "`all` answers no question" rule this fixes the ask for

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both defects are live at HEAD: `scope-and-question.md:151-154` appends the question sentence after the body's `Reply all…` lead even when there is nothing for `all` to keep; `SKILL.md:316` hard-codes `<N> rows`.

- [x] Read relevant source files — `claude/skills/ft-seed-unattended/SKILL.md` Steps 3–5, `scope-and-question.md` §"Step 3"

- [x] **Best Practices Review** — `N/A`: skill-prose edit, no module boundary.

- [x] **Archive skim** — `CORE-850.1`–`.4`, `.N` hit the seed skill paths; CORE-850.4 Discovery logs the assumption "`all` answers no question" — kept; this task changes only how the ask is led.

- [x] **Drift check** — cited paths/lines match HEAD (`@9e00253`); `<N> rows` also lives in `SPEC/plan-filing.md:93` (commit-shape table) and `docs/MIGRATION.md:536` as the template shape — the fix adds a singular rule sentence instead of rewriting the template string, so those mirrors stay exact.

- [x] No clarifications needed. Assumptions: "every offer is a question" means no mark, no pin, no split, and no scope without a riding question; the pluralization fix covers the commit subject named in the task (Step 5 report lines left as-is).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Fix shape 1: one sentence in the fragment's "The ask" — when every offer is a question, the ask leads with the `<ID> <letter>` sentence and drops the body's `all`-first line, since `all` would keep nothing.
- Fix shape 2: one clause after the `<N>` definition — `rows` → `row` when `<N>` is 1.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the fragment's existing "The ask gains…" paragraph and the body's `<N>` definition sentence; no new shape.

- [x] **Minimal refactor gate** — no refactor; Step 5 `seeded <N> rows` report lines left untouched (out of the named scope).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: skill prose; no executable surface.

**Implementation Notes:**

- `scope-and-question.md` §"Step 3": three lines after the ask sentence — when every offer is a question (no mark, pin, split, or bare scope), the `<ID> <letter>` sentence leads, before the body's `all`-first line.
- Final (after External review): the question-only rule also covers marks/items leaning on a question, and drops every `all` form (leads with the answer sentence; offers `none` + ID lists). Singular rule sits as a comment on the `SKILL.md` commit template line, in the Step 5 report lines, and in the `SPEC/plan-filing.md` commit-shape cell; the `— <N> rows` template string is unchanged, so `docs/MIGRATION.md:536` (historical v7.3.0 row) stays exact.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (the markdown suite)

- [x] Ran lint/type-check on changed code — `N/A`: markdown only; drift checks cover final newline / budgets.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q 'every offer is a question' claude/skills/ft-seed-unattended/scope-and-question.md` → 0
- `grep -q '1 row' claude/skills/ft-seed-unattended/SKILL.md` → 0
- `bash tools/drift-checks.sh` → 0 (all pairs ok); re-run after review fixes → 0

**External review** (`/code-review medium`, working-tree diff of this task only) — 7 findings, all notes:
1. Question-only rule missed marks/items leaning on a question → fixed (rule now covers them).
2. Rule kept the body's `all` line, so `all` still offered → fixed (every `all` form left out).
3. Step 5 `seeded/prepared <N> rows` still plural at 1 → fixed.
4. `SPEC/plan-filing.md:93` lacked the singular rule → fixed (cell note).
5. Rule 16 lines from the template → fixed (comment on the template line; earlier sentence reverted).
6. Mid-sentence reflow → fixed (revert removed it).
7. `docs/CONTEXT-BUDGET.md` byte ledger stale → no change: ledger is re-measured at release time (doc header: "read at release time, not at task time").

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC/plan-filing.md` commit-shape table updated (in diff); README §"AI-referenced docs" entries: no change; `docs/MIGRATION.md` historical row: no change; codex/cursor/grok wrappers carry no seed commit shape: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`.

**Final Summary:**

An `/ft-seed-unattended` gate where only questions are on offer (or marks leaning on them) no longer suggests `all`. That reply writes nothing, so the ask now leads with `<ID> <letter>`. The seed commit and report also say `1 row` instead of `1 rows`. Changed: `claude/skills/ft-seed-unattended/scope-and-question.md` (+5), `claude/skills/ft-seed-unattended/SKILL.md` (+3/−2), `SPEC/plan-filing.md` (1 line). Drift checks green. `touches:` matches `git diff --name-only` (plan-filing added at review). No refactor.

**Archived:** 2026-11-01
