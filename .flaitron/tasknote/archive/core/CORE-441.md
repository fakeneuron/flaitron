---
title: agents-roster-terse
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-440]
---

# CORE-441 | agents-roster-terse

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-440]]

## 🎯 Goal

Shorten AGENTS.md §Workflow peer-skill bullet to a names-only roster so KEEP IN SYNC tracks skill membership, not flag-level detail.

## ✅ Acceptance

- [x] AGENTS.md §Workflow peer-skill bullet lists slash-command names only (no purpose parentheticals, no `--park` flag prose)
- [x] Flag-level detail for `/ft-file-followup --park` remains in `claude/AGENTS-snippet.md` paste-block and `SPEC/tasknote-selection.md`
- [x] Bilateral KEEP IN SYNC comments document the names-only contract (not a second flag surface)
- [x] `claude/AGENTS-snippet.md` paste-block body unchanged (rich detail stays there)

## 🧩 Subtasks

- [x] Shorten AGENTS.md:14 peer-skill bullet to names-only
- [x] Update KEEP IN SYNC comments on AGENTS.md and `claude/AGENTS-snippet.md`
- [x] Verify paste-block and `SPEC/tasknote-selection.md` still carry park/flag detail

## 🔗 Related

- [[CORE-440]] — sibling: fixed `/ft-release` vs `/ft-update` split; left names-only shortening to this task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** AGENTS.md:14 still embeds park-flag prose and purpose labels; PLAN and CORE-440 explicitly defer names-only shortening here.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Best Practices:** N/A — docs/comment only.
- **Surfaces read:** `AGENTS.md:14`, `claude/AGENTS-snippet.md:9` (KEEP IN SYNC) + paste-block `:19` (park flags), `SPEC/tasknote-selection.md` park signature. No probe — narrow read set.
- **Archive skim:** [[CORE-440]] carved `/ft-release` vs `/ft-update` and explicitly left names-only shortening to this task. [[CORE-433.2]] added park flags to AGENTS.md parenthetical (Pair F); this task removes that prose per PLAN. [[CORE-318]] established bilateral KEEP IN SYNC — update both comments to "names-only".
- **Drift check:** PLAN line matches HEAD; paste-block line 19 still has full `--park [--low|--med|--fut|--high]` detail; tasknote-selection park signature intact. No SPEC contradiction.
- **Assumptions:** strip all purpose parentheticals; keep `/ft-task --debug` as the debug invocation name; paste-block body untouched; Pair F in `ft-release` SKILL.md (lists AGENTS.md as a park-flag surface) is out of scope — follow-up if needed.
- **No clarifications needed.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern:** CORE-318 bilateral KEEP IN SYNC; extend comments to document names-only contract per PLAN.
- **Minimal refactor:** none — two comment/prose edits only.
- **Tests:** N/A — markdown.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- N/A — markdown-only; no test/lint targets. Quality: N/A with reason.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change; `AGENTS.md` updated (this task); `SPEC.md` no change; `docs/MIGRATION.md` no change; `claude/AGENTS-snippet.md` comment updated, paste-block no change; `codex/AGENTS-snippet.md` no change; `cursor/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` no change; `CONTRIBUTING.md` no change; `SECURITY.md` no change; `docs/AGENT-NEUTRALITY.md` no change; `docs/PLATFORMS.md` no change; `claude/CAPABILITIES.md` no change; `docs/AGENT-COMPAT.md` no change; `docs/EXTERNAL-AGENTS.md` no change; `docs/WORKTREES.md` no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

AGENTS.md §Workflow peer roster is now a names-only slash-command list; park-flag and purpose prose removed so KEEP IN SYNC tracks membership, not a second flag surface. Bilateral KEEP IN SYNC comments document the contract; paste-block and `SPEC/tasknote-selection.md` retain full detail.

**Changed files:** `AGENTS.md` (roster bullet + KEEP IN SYNC), `claude/AGENTS-snippet.md` (KEEP IN SYNC comment only).

**Verification:** visual read of `AGENTS.md:14`, `claude/AGENTS-snippet.md:9` and `:19`, `SPEC/tasknote-selection.md` park signature — all acceptance criteria met.

**Refactors:** none. Pair F in `ft-release` SKILL.md still lists AGENTS.md as a park-flag mirror — deferred follow-up.

**Maintainability:** future roster edits sync skill names only; flag drift risk drops because one canonical flag surface remains in the paste-block and SPEC.

**Archived:** 2026-08-12
