---
title: dogfood-validation
status: completed
tags: []
created: 2026-07-20
due:
related-tasks: [CORE-EPIC-362, CORE-362.1, CORE-362.2, CORE-362.3]
---

# CORE-362.4 | dogfood-validation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-362]]

## 🎯 Goal

Dogfood the revised four-phase workflow on this representative markdown-only task, verify that its quality checklist is clear and inherited across agent runners, run applicable repository quality gates, and update AI-referenced docs only where a user-facing claim demonstrably drifted.

## ✅ Acceptance

- [ ] A representative tasknote records a complete, understandable pass through the revised Phase 1–4 checklist without adding lifecycle or tooling surface
- [ ] Canonical contract, neutral procedure, Claude runner, Codex wrapper, and Grok pointer have coherent inheritance with no duplicated platform checklist
- [ ] Applicable repository quality gates and focused markdown/parity checks pass
- [ ] Every AI-referenced document receives a documented no-change or update verdict; only demonstrated user-facing drift is changed

## 🧩 Subtasks

- [x] Dogfood the revised checklist in this tasknote and record any ambiguity or unnecessary ceremony
- [x] Compare the canon, procedure, Claude runner, Codex wrapper, and Grok pointer for inheritance clarity and duplication
- [x] Run focused markdown/parity checks plus the visualizer test, typecheck, and lint gates
- [x] Apply a doc-only correction only if the evidence shows user-facing documentation drift
- [x] Complete the doc-drift sweep, close the PLAN row, archive this tasknote, and commit the atomic closure

## 🔗 Related

- [[CORE-EPIC-362]] — parent clean-code-guidance epic
- [[CORE-362.1]] — accepted scope, propagation policy, and dogfood boundary
- [[CORE-362.2]] — canonical contract and template guidance
- [[CORE-362.3]] — neutral procedure and runner-specific propagation

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The canonical guidance and its runner-specific projections have landed; a focused dogfood pass is the smallest remaining slice that can verify operational clarity and cross-agent inheritance without expanding the workflow.

- [x] Read relevant source files

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Best Practices Review:** This is a markdown-only validation task. `SPEC.md` remains the behavioral canon; `SPEC/procedures/ft-task.md` is the agent-neutral operational projection; Claude owns cadence-specific deltas; Codex and Grok deliberately remain thin routes. The tasknote is the sample artifact, so no production abstraction or refactor is needed. Avoiding a cross-platform duplicated checklist preserves responsibility boundaries and prevents documentation drift.
- **Archive skim:** [[CORE-362.1]] requires a single canonical checklist and evidence rather than scorecards; [[CORE-362.2]] placed the four additions in the canon/template and deferred cross-agent dogfood here; [[CORE-362.3]] projected only runner-specific deltas and preserved thin Codex/Grok wrappers. These decisions rule out a new module, audit mode, or platform-specific copy.
- **Drift check:** `SPEC.md`, `templates/tasknote-template.md`, `SPEC/procedures/ft-task.md`, and `claude/skills/ft-task/SKILL.md` carry the five intended dogfood prompts: Best Practices Review, DRY/SRP/composition-aware pattern survey, Minimal Refactor Gate, Quality Assertions, and evidence-based recap. `codex/skills/ft-task/SKILL.md` points to the neutral procedure; `grok/procedures/ft-task.md` points to that same procedure. The cited paths and inheritance hypothesis remain current.
- **Clarifications:** No clarifications needed. Assumptions: this tasknote is a representative markdown-only sample; repository quality means focused markdown/parity checks plus the documented visualizer test/typecheck/lint commands; docs change only for a concrete false or missing user-facing claim, not merely because internal wording evolved.
- **Exit-gate judgment:** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** The sample tasknote exercised every new prompt without ambiguity or added ceremony: its Discovery records responsibility and inheritance boundaries; Execution records the established canon → projection → thin-pointer pattern; Testing records structural quality evidence; Closure will record files, commands, doc verdict, and maintainability effect. The focused comparison confirms that `SPEC.md` owns the behavioral checklist, the neutral SOP exposes it to contract-only agents, Claude repeats only cadence deltas, and Codex/Grok point to the SOP rather than fork it. No code change or refactor is warranted for this markdown-only validation; preserving the existing composition avoids duplicated platform guidance. The only user-facing drift found was the Codex CLI dogfood date in `docs/AGENT-COMPAT.md`, refreshed after this live run.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:** `npm --prefix viz test` passed (16 files, 230 tests); `npm --prefix viz run typecheck` and `npm --prefix viz run lint` passed. `git diff --check` passed. Focused searches confirm the canon/template, neutral procedure, and runner-specific paths carry the intended prompts, while Codex and Grok retain only references to `SPEC/procedures/ft-task.md`. The changed surface is workflow markdown only; frontend confirmation is N/A. Quality assertions: no avoidable duplicated checklist, dead code, unexplained complexity, unnecessary public surface, or stale code-facing documentation was introduced; the one compatibility-matrix date was corrected as demonstrated drift.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-20.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**

- `README.md` — no change; the public overview does not claim a different clean-code or runner surface
- `SPEC.md` — no change; the canonical clean-code contract landed in [[CORE-362.2]] and dogfood confirms it reads clearly
- `docs/MIGRATION.md` — no change; adoption and update procedures are unaffected
- `claude/AGENTS-snippet.md` — no change; the agent-neutral paste-block and skill roster are unchanged
- `codex/AGENTS-snippet.md` — no change; Codex installation and invocation remain accurate
- `docs/CONVENTIONS.md` — no change; quality gates and markdown conventions remain accurate
- `CONTRIBUTING.md` — no change; contribution policy is unaffected
- `SECURITY.md` — no change; no trust boundary, privilege, or injection control changed
- `docs/AGENT-NEUTRALITY.md` — no change; canon, procedure, and wiring boundaries remain intentionally agent-neutral
- `docs/PLATFORMS.md` — no change; the current Codex/Grok wiring description matches the verified thin-pointer inheritance
- `claude/CAPABILITIES.md` — no change; no Claude-specific operator primitive changed
- `docs/AGENT-COMPAT.md` — updated; refreshed the Codex CLI `dogfooded` stamp to `v5.13.0 · 2026-07-20` from this live validation

**Final Summary:** Dogfooded the revised four-phase workflow on this representative markdown-only tasknote. The new quality prompts were clear, stayed lightweight, and preserved the intended canon → projection → thin-pointer inheritance across the neutral procedure, Claude runner, Codex wrapper, and Grok pointer.

Technical evidence: 2 deliverable files before closure (`docs/AGENT-COMPAT.md` and this tasknote), with the compatibility matrix receiving a one-line date refresh. `npm --prefix viz test` passed (16 files, 230 tests); `npm --prefix viz run typecheck`, `npm --prefix viz run lint`, `git diff --check`, and focused prompt/parity/thin-pointer searches passed. No refactor was made or deferred because the existing boundary is correct; the concrete maintainability effect is a live compatibility stamp plus evidence that agents inherit one checklist instead of maintaining copies.

**Archived:** 2026-07-20
