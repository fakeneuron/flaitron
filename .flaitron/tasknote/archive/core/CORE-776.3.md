---
title: refactor-fast-label
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-776]
touches:
  - AGENTS.md
  - claude/AGENTS-snippet.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-776.3 | refactor-fast-label

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-776]]

## 🎯 Goal

Reword the `--fast` clause in `AGENTS.md` and `claude/AGENTS-snippet.md` so it no longer implies `/ft-refactor --fast` suppresses conditional gates.

## ✅ Acceptance

- [x] Old clause gone from both files — `! grep -n "also on \`/ft-micro-task\` and \`/ft-refactor\`" AGENTS.md claude/AGENTS-snippet.md`
- [x] Both files name the refactor `--fast` as review-pause-only — `grep -c "review pause" AGENTS.md claude/AGENTS-snippet.md`
- [x] Drift checks + budgets pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Edit AGENTS.md line 22
- [x] Edit claude/AGENTS-snippet.md line 22
- [x] Run verify commands

## 🔗 Related

- [[CORE-EPIC-776]] — parent epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both files carry the identical clause; `SPEC/gate-postures.md` §"`--fast` operator override" confirms `/ft-refactor --fast` only skips the review pause.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** No clarifications needed (--fast). Archive skim: no prior tasknotes touch these lines. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Reworded the clause in both KEEP-IN-SYNC files to "also on `/ft-micro-task`; `/ft-refactor`'s own `--fast` only skips its review pause".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `! grep -n "also on ... /ft-refactor" AGENTS.md claude/AGENTS-snippet.md` → exit 0
- `grep -c "review pause" AGENTS.md claude/AGENTS-snippet.md` → 1 / 1
- `bash tools/drift-checks.sh` → context_budget ok, pair_c/pair_h ok; pair_q FAILED on `PLAN.md` citing `SPEC/plan-filing.md` §"ID allocation" (CORE-776.6's not-yet-written section) — pre-existing, confirmed identical with this diff stashed; not owned here.
- External review: N/A — two-line doc rewording.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** `--fast` clause in `AGENTS.md` and `claude/AGENTS-snippet.md` no longer claims `/ft-refactor` shares `--fast`'s gate suppression. Doc-drift sweep: no change (the two files are the sweep). `touches:` matched `git diff --name-only`.

**Archived:** 2026-10-10
