---
title: runner-propagation
status: completed
tags: []
created: 2026-07-20
due:
related-tasks: [CORE-EPIC-362, CORE-362.1, CORE-362.2]
---

# CORE-362.3 | runner-propagation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-362]]

## 🎯 Goal

Re-verify the neutral ft-task procedure and add only the clean-code guidance that runner-specific execution cadences do not already inherit from the canonical contract.

## ✅ Acceptance

- [x] `SPEC/procedures/ft-task.md` accurately projects the canonical clean-code guidance through all four phases and carries an honest verification stamp
- [x] `claude/skills/ft-task/SKILL.md` reinforces only its explicit execution deltas for the new guidance
- [x] `claude/skills/ft-micro-task/SKILL.md`, `ft-goal-task/SKILL.md`, and `ft-debug/SKILL.md` receive concise cadence-specific guidance where their flows bypass the standard phrasing
- [x] Codex wrappers and the Grok procedure pointer remain thin, with no duplicated checklist
- [x] Focused parity and markdown-hygiene checks pass

## 🧩 Subtasks

- [x] Compare the canonical contract, neutral procedure, and four runner-specific execution paths
- [x] Identify gaps that need an explicit delta versus behavior inherited by reference
- [x] Update the neutral procedure and only the needed Claude runner guidance
- [x] Verify parity, thin-pointer preservation, and markdown hygiene
- [x] Close and archive the tasknote with the completed PLAN row

## 🔗 Related

- [[CORE-EPIC-362]] — parent clean-code-guidance epic
- [[CORE-362.1]] — propagation policy and scope discovery
- [[CORE-362.2]] — canonical contract and template changes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The prior child added the canonical guidance, and this focused projection pass closes documented omissions without widening lifecycle or platform scope.

- [x] Read relevant source files

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Best Practices Review:** `SPEC.md` remains the behavioral canon; `SPEC/procedures/ft-task.md` is its agent-neutral projection; Claude runners own only cadence-specific instructions. Dependency direction is canon → procedure/runner deltas → thin Codex/Grok pointers. No structural refactor is needed beyond concise additions to existing phase prose.
- **Archive skim:** [[CORE-362.1]] requires canon-first propagation, explicit-projection updates only, and thin Codex/Grok routes. [[CORE-362.2]] deliberately left runner propagation to this task. [[CORE-340]] provides the same agent-neutral projection precedent.
- **Drift check:** `SPEC.md` and `templates/tasknote-template.md` now include Best Practices Review, DRY/SRP/composition-aware Pattern Survey, Minimal Refactor Gate, Quality Assertions, and evidence-based recap guidance. The neutral procedure still omits those details. `ft-task` repeats an older Phase 2 execution summary; micro's compact notes, goal-loop cycle, and debug execution/re-verify steps each bypass part of the standard prose. Codex wrappers are already thin; Grok exposes only `grok/procedures/ft-task.md` as a pointer, so neither needs a checklist copy.
- **Clarifications:** No clarifications needed. Assumptions: "needed" means a runner has bespoke cadence prose that would otherwise fail to surface the canonical guidance; by-reference inheritance remains unchanged.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Extended the established canon → projection pattern. The neutral procedure now projects all four clean-code additions and receives an honest `v5.13.0 · 2026-07-20` verification stamp. The standard runner, compact micro flow/template, goal-loop execute/verify cycle, and debug hypothesis/re-verify cadence each receive only their bypass-specific wording. No Codex/Grok wrapper edit was needed. This markdown-only contract task required no code refactor; the Minimal Refactor Gate is satisfied by preserving thin pointers and avoiding a duplicated platform checklist.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:** Markdown-only workflow guidance: executable tests, project lint/typecheck, and frontend confirmation are N/A. `git diff --check` passed. Focused searches confirm the neutral procedure carries the current stamp plus Best Practices Review, DRY/SRP/composition, and evidence-based recap terms; the micro template supplies the fifth Notes prompt; and `git diff --name-only` confirms Codex/Grok pointers remain untouched. Quality assertions: the diff adds no code, public surface, or stale documentation; its only new durable prompt is needed to make the compact micro runner consistent.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**

- `README.md` — no change; public overview does not enumerate internal phase wording
- `SPEC.md` — no change; canonical guidance already landed in [[CORE-362.2]]
- `docs/MIGRATION.md` — no change; no wiring or adoption procedure changed
- `claude/AGENTS-snippet.md` — no change; skill roster and adopter workflow are unchanged
- `codex/AGENTS-snippet.md` — no change; Codex remains a thin route to the neutral procedure
- `docs/CONVENTIONS.md` — no change; repository conventions are unaffected
- `CONTRIBUTING.md` — no change; contribution model is unaffected
- `SECURITY.md` — no change; no trust boundary changed
- `docs/AGENT-NEUTRALITY.md` — no change; the canon/projection split is preserved
- `docs/PLATFORMS.md` — no change; platform inventory and plug-in pattern are unchanged
- `claude/CAPABILITIES.md` — no change; Claude capability triggers are unaffected
- `docs/AGENT-COMPAT.md` — no change; this task does not add or alter consume modes

**Final Summary:** Re-verified and updated the neutral `ft-task` procedure plus the four runner-specific cadence paths, while keeping Codex and Grok as thin pointers. The compact micro template now records its missing Best Practices Review prompt; all other changes are bounded wording projections of the existing canon.

Technical evidence: 6 deliverable files, +40/-27 lines before workflow closure; `git diff --check` and focused parity/thin-pointer assertions passed. Executable tests, lint/typecheck, and frontend confirmation were N/A for markdown-only guidance. No refactor was made because the existing canon → projection structure is correct; the maintainability gain is consistent quality guidance without duplicating it into platform wrappers.

**Archived:** 2026-07-20
