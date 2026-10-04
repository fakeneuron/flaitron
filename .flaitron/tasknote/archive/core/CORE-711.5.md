---
title: github + folder renames
status: completed
tags: []
created: 2026-10-03
due:
related-tasks: [CORE-EPIC-711, CORE-711.4, CORE-711.6, CORE-711.7, CORE-711.8, CORE-711.9, CORE-712]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/PLAN.md
blocked-by:
  - CORE-711.4
parallel-safe-with:
  - CORE-711.6
# supersedes:
#   - TASK-ID
---

# CORE-711.5 | github + folder renames

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-10-04 · 🔗 [[CORE-EPIC-711]]

## 🎯 Goal

Rename the GitHub repo, origin, local folder, global `~/.claude` links and the Claude project memory dir, so the rebrand is in place before the full-repo sweep (`.9`) and the v6.0.0 cut ([[CORE-712]]). Re-sequenced 2026-10-04: the release no longer gates this task; this task gates the release.

## ✅ Acceptance

- [x] GitHub repo is `flaitron` and origin points at it — `git remote get-url origin | grep -q flaitron`
- [x] No dangling `~/.claude` ft-* links remain — `find ~/.claude/skills ~/.claude/commands -maxdepth 1 -type l ! -exec test -e {} \; -print` prints nothing
- [x] Live links resolve into `~/Code/flaitron` — `judgment` (13 links; checked by the find above plus a readlink listing)
- [x] Claude project memory dir moved to the `-Users-fakeneuron-Code-flaitron` key — `test -d ~/.claude/projects/-Users-fakeneuron-Code-flaitron/memory`

## 🧩 Subtasks

- [x] `gh repo rename flaitron`; `git remote set-url origin`
- [x] Re-point the 13 live global skill/command symlinks; remove the 10 dangling
- [x] `mv ~/Code/flowtron ~/Code/flaitron` and move the project memory dir (last; ends this session's cwd)

## 🔗 Related

- [[TASK-ID]] — short context (predecessor / follow-up / parent epic; type-hint `blocked-by:` / `parallel-safe-with:` / `supersedes:` / `depends-on:` / `related-decision:` when the edge is set)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operational rename; gates .9 and CORE-712.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:** Operational task (no repo code). Phases 1–3 collapsed; boxes ticked as N/A except where noted. Folder `mv` was already done by the operator before this session.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** `gh repo rename flaitron --repo fakeneuron/flowtron`; `git remote set-url origin`. Operator temporarily added `~/.claude` to `path-access-roots` (removed after). Relinked 13 global skill/command symlinks into `~/Code/flaitron`; removed 10 dangling (skills: ft-audit-context, ft-flowtron, ft-goal-task, ft-starter-task, ft-stats, ft-worktree-end, ft-worktree-start; commands: ft-audit-context, ft-flowtron, ft-stats). Moved old `-Code-flowtron` project dir contents (transcripts + 8 memory files) into `-Code-flaitron`; removed the empty old dir.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:** `git remote get-url origin | grep -q flaitron` → 0; dangling-link `find` → empty; `readlink` listing shows 13 links into `~/Code/flaitron`; `test -d ~/.claude/projects/-Users-fakeneuron-Code-flaitron/memory` → 0. External review N/A: no diff. Not pushed: local `main` is 2 commits ahead of the renamed remote.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Repo, origin, global links and project memory dir all on the flaitron name. Docs: no change (no repo files edited beyond this tasknote and PLAN). Learnings: N/A.

**Archived:** 2026-10-04
