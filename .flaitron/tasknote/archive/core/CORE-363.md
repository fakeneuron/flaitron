---
title: epic-child closure
status: completed
tags: []
created: 2026-07-21
due:
related-tasks: []
---

# CORE-363 | epic-child closure

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align epic-child Phase 4 placement so completed children remain nested beneath active parents until `/ft-close-epic` atomically moves the cohort into Completed.

## ✅ Acceptance

- [x] Canonical Phase 4 and epic-lifecycle rules distinguish standalone-task placement from epic-child placement
- [x] Closed epic children retain 2-space nesting beneath an active parent; only `/ft-close-epic` moves the parent and complete cohort to `## Completed`
- [x] The standard tasknote template and neutral `ft-task` procedure project the same placement rule
- [x] Runner-specific closure prose is aligned where it owns an explicit PLAN-row move; by-reference and thin-pointer surfaces remain unduplicated
- [x] Focused semantic-parity and markdown-hygiene checks pass

## 🧩 Subtasks

- [x] Map every canonical, template, procedure, and runner closure instruction that applies to epic children
- [x] Add the standalone-versus-child placement rule to the canonical lifecycle and persistent standard template
- [x] Propagate the rule to the neutral procedure and runner-owned explicit closure steps
- [x] Verify semantic parity, existing correct epic bracket skills, and thin Codex/Grok pointers
- [x] Run the doc-drift sweep, close the PLAN row, archive the tasknote, and land one atomic commit

## 🔗 Related

- None declared in PLAN.md.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The archived CORE-362 audit records a reproduced placement failure, and current canonical/procedure/runner prose still directs generic closures to move epic children out from beneath active parents.

- [x] Read relevant source files

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Surface map:** canonical ownership sits in `SPEC.md` Phase 4, `SPEC/tasknote-selection.md`'s archive convention, and `SPEC/epic.md`; persistent standard-task guidance sits in `templates/tasknote-template.md`; the agent-neutral projection is `SPEC/procedures/ft-task.md`; explicit runner moves live in `claude/skills/ft-task/SKILL.md` and `claude/skills/ft-micro-task/SKILL.md`. `/ft-debug` and `/ft-goal-task` inherit closure by reference; `/ft-epic-discovery` and `/ft-close-epic` already preserve nesting; Codex and Grok pointers remain thin.
- **Best Practices Review:** this is markdown contract work, so code/module boundaries are N/A. Preserve the established dependency direction: canonical contract → neutral procedure and concise runner deltas → thin platform pointers. Put the complete rule in canon, add only executable placement wording to projections, and avoid a new abstraction or duplicated platform checklist.
- **Archive skim:** [[CORE-057.1]] and [[CORE-057.4]] establish the original precedent: a closed child stays nested under its active parent and the parent plus cohort move atomically only at epic close. [[CORE-340]] distinguishes explicit-prose projections from by-reference inheritors. [[CORE-362.3]] reaffirms canon-first propagation and thin Codex/Grok pointers. [[CORE-362.N]] records the concrete regression: generic closures moved `.3` and `.4` to top-level `## Completed`, forcing the audit close to reconstruct the cohort.
- **Drift check:** no cited path or root-cause drift. `SPEC/epic.md` still says children run normally without defining interim placement; `SPEC.md`, the neutral SOP, `/ft-task`, and `/ft-micro-task` still describe an unconditional move to `## Completed`; both bracket skills already contain the intended nesting rule. The parser already supports checked nested children in open priority sections, so no visualizer behavior change is required.
- **Clarifications:** No clarifications needed. Assumptions: the rule applies to numeric and `.N` child IDs; an unchecked parent in an open priority section is active; child closure rewrites the child to checked stub form but preserves its 2-space indent and current position; `/ft-close-epic` remains the only workflow authorized to move the whole cohort after parent-flip approval.
- **Exit-gate judgment:** Discovery surfaced no significant deviation from the filed multi-surface alignment task → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** extended the already-correct `/ft-epic-discovery` and `/ft-close-epic` rule: checked child rows remain nested, and only the approved parent flip moves the complete cohort. Historical CORE-057 closures confirm the same shape.
- **Canonical rule:** `SPEC.md`, `SPEC/epic.md`, and `SPEC/tasknote-selection.md` now distinguish standalone placement from epic-child placement. `templates/tasknote-template.md` carries the concise persistent checklist version.
- **Projection:** `SPEC/procedures/ft-task.md` now gives contract-only agents the executable branch and carries an honest `v5.13.0 · 2026-07-21` re-verification stamp. `/ft-task` mirrors the branch; `/ft-micro-task` no longer unconditionally moves child rows.
- **Inheritance:** `/ft-debug` and `/ft-goal-task` remain by-reference inheritors of `/ft-task` closure. The bracket skills were already correct, and Codex/Grok pointer layers remain unchanged.
- **Minimal refactor gate:** no structural refactor or new abstraction was warranted. Seven bounded markdown edits align existing ownership layers; parser code and platform wrappers remain untouched. Automated test additions are N/A because task-line grammar and rendering behavior do not change; Phase 3 uses focused semantic assertions plus the existing parser suite.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `npm --prefix viz test -- parser` passed: 1 file, 57 tests. Existing coverage confirms epic children, checked child grouping, and reserved `.N` parsing remain valid.
- Focused `rg` assertions passed across canon, standard template, neutral SOP, standard/micro runners, and both already-correct epic bracket skills. `git diff --name-only` confirmed no Codex/Grok pointer edits; `git diff --check` passed.
- Project lint/typecheck are N/A because no TypeScript or executable code changed; the targeted parser suite is the relevant compatibility check. Frontend visual confirmation is N/A because no frontend file changed.
- Quality assertions: no code, public API, dead path, or runtime complexity changed. The prose intentionally centralizes the full invariant in canon and limits projections to actionable branches, avoiding unnecessary duplication and stale platform wiring.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — standalone PLAN.md line flipped to stub form `Completed 2026-07-21.`, moved to the top of `## Completed`, and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**

- `README.md` — no change; the public workflow overview does not specify interim epic-child row placement
- `SPEC.md` — updated; Phase 4 now branches standalone placement from active epic-child placement
- `docs/MIGRATION.md` — no change; adopter wiring and migration guidance already route multi-child lifecycle details to `SPEC/epic.md`
- `claude/AGENTS-snippet.md` — no change; it already routes epic lifecycle behavior to `SPEC/epic.md`
- `codex/AGENTS-snippet.md` — no change; Codex wiring and invocation notes are unaffected
- `docs/CONVENTIONS.md` — no change; repository conventions are unaffected
- `CONTRIBUTING.md` — no change; contribution scope and process are unaffected
- `SECURITY.md` — no change; no trust boundary, credential surface, or prompt-injection control changed
- `docs/AGENT-NEUTRALITY.md` — no change; the canon → projection → pointer responsibility split remains intact
- `docs/PLATFORMS.md` — no change; platform inventory and thin-pointer architecture remain accurate
- `claude/CAPABILITIES.md` — no change; no Claude capability trigger changed and its v5.13.0 dogfood stamp remains current
- `docs/AGENT-COMPAT.md` — no change; no agent primitive or consume-mode behavior changed

**Final Summary:** Aligned epic-child Phase 4 placement across the canonical lifecycle, standard template, agent-neutral procedure, and runner-owned closure instructions. Closed children now stay checked and stubbed beneath active parents, leaving `/ft-close-epic` as the sole owner of the approved atomic parent-plus-cohort move.

Technical evidence: seven deliverable markdown files changed (+29/-10 before workflow closure). The existing canon → projection → thin-pointer structure was preserved; `/ft-debug` and `/ft-goal-task` inherit by reference, the epic bracket skills were already correct, and Codex/Grok pointers remain untouched. `npm --prefix viz test -- parser` passed 57/57 tests, focused semantic assertions passed, and `git diff --check` passed. No code/frontend surface changed, no refactor was needed, and all 12 AI-referenced docs received an explicit verdict. The maintainability effect is deterministic cohort structure throughout an epic, eliminating audit-time reconstruction of children stranded under top-level Completed.

**Archived:** 2026-07-21
