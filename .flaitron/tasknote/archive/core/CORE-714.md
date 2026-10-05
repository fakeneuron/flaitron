---
title: release-zsh-glob
status: completed
tags: []
created: 2026-10-04
due:
related-tasks: [CORE-712]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-release/step-7.1-standing-checks.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-714 | release-zsh-glob

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-712]]

## 🎯 Goal

Make the `/ft-release` §7.1 context-budget loop expand its glob rows under both zsh and bash, and correct the §"On the globs" note that wrongly calls them safe.

## ✅ Acceptance

- [x] The loop expands glob rows under zsh — run the block under `zsh` and confirm a glob row (e.g. `SPEC/*.md`) is measured, no `no matches found` noise
- [x] Same block still works under `bash` — `bash -c` run of the block
- [x] §"On the globs" no longer claims the globs are safe by virtue of always matching — `grep -q 'does not glob-expand an unquoted' claude/skills/ft-release/step-7.1-standing-checks.md`

## 🧩 Subtasks

- [x] Replace `for f in $surface` with an eval-expanded `ls -d` list
- [x] Rewrite §"On the globs"
- [x] Verify under zsh and bash

## 🔗 Related

- [[CORE-712]] — source of the Learnings that filed this

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bug reproduced in zsh (`for f in $surface` leaves the literal pattern); one-file doc patch, no drift against PLAN line.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Archive skim: CORE-712 (source Learnings) only. Drift check: loop at line 165 and §"On the globs" match PLAN description. No clarifications needed (assumption: paths contain no spaces — true of every budget row). Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Replaced `for f in $surface` with `for f in $(eval "ls -d $surface" 2>/dev/null)` — eval re-parses the pattern as a command word, so it globs in zsh and bash, and an unmatched pattern yields an empty list instead of aborting. Rewrote §"On the globs" to state the real mechanism. `$(eval …)` chosen over zsh-only `$~surface` to stay portable; no refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Real block under `zsh` and `bash` → exit 0, no `OVER BUDGET`.
- Probe (budget forced to 0 so every measured file prints): bash 16, zsh 16 (fixed), zsh with old loop 5 (glob rows skipped) → confirms the fix.
- `grep -q 'does not glob-expand an unquoted' …step-7.1-standing-checks.md` → 0.
- External review: N/A — 14-line single-file doc/shell patch, verified by the probe above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Fixed the §7.1 context-budget loop so glob rows are measured under zsh as well as bash (eval-expanded `ls -d`), and corrected the §"On the globs" note. Touched only `claude/skills/ft-release/step-7.1-standing-checks.md`; declared `touches:` matches. Doc-drift sweep: no change. Learnings: N/A — the fix and its rationale now live in the contract text itself.

**Archived:** 2026-10-04
