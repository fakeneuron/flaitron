---
title: clean-code-contract
status: completed
tags: []
created: 2026-07-20
due:
related-tasks: [CORE-EPIC-362]
---

# CORE-362.2 | clean-code-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-362]]

## 🎯 Goal

Strengthen the agent-neutral four-phase contract and canonical tasknote template with contextual, lightweight clean-code guidance and evidence-based closure reporting.

## ✅ Acceptance

- [x] `SPEC.md` Phase 1 adds a contextual Best Practices Review covering responsibility, dependency direction, existing abstractions, duplication, and in-scope or deferred refactor needs
- [x] `SPEC.md` Phase 2 expands Pattern Survey with DRY/SRP/composition-aware guidance and adds a justified, tightly bounded Minimal Refactor Gate
- [x] `SPEC.md` Phase 3 requires structural quality assertions for changed code without introducing scorecards or arbitrary thresholds
- [x] `SPEC.md` Phase 4 requires an evidence-based recap covering changed surface, verification, refactors made or deferred, documentation, and maintainability effect
- [x] `templates/tasknote-template.md` mirrors the canonical additions concisely while preserving the existing four phases and contextual N/A handling
- [x] Markdown and contract/template parity checks pass

## 🧩 Subtasks

- [x] Add the contextual Best Practices Review to Phase 1 in `SPEC.md`
- [x] Strengthen Phase 2 Pattern Survey and add the Minimal Refactor Gate in `SPEC.md`
- [x] Add structural Quality Assertions to Phase 3 in `SPEC.md`
- [x] Make Phase 4 recap guidance evidence-based and explicitly reject scorecards
- [x] Mirror the concise checklist additions in `templates/tasknote-template.md`
- [x] Verify focused wording parity, markdown hygiene, and diff scope
- [x] Run the AI-referenced doc-drift sweep, close the PLAN row, and archive the tasknote
## 🔗 Related

- [[CORE-EPIC-362]] — parent clean-code-guidance epic
- [[CORE-362.1]] — epic discovery and canonical checklist design

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The completed epic Discovery identified a concrete prospective-quality gap in the existing four phases, and the filed scope remains the smallest canonical slice that fixes it without adding lifecycle or tooling surface.

- [x] Read relevant source files

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Best Practices Review:** `SPEC.md` owns the agent-neutral behavior and the template records its actionable checklist; dependency direction is canon → projection. The task should avoid duplicating explanatory prose in the template, preserve the four existing phases, and keep every new check contextual for non-code work. No refactor outside the touched phase sections is required; runner propagation remains [[CORE-362.3]].
- **Archive skim:** [[CORE-324.3]] established honest canon/projection reconciliation; [[CORE-340]] reinforced editing explicit projections while leaving by-reference inheritors alone; [[CORE-352.1]] rejected new lifecycle phases and validators for optional engineering guidance; [[CORE-330.4]] localized specialized cadence instead of forking the shared skeleton. [[CORE-362.1]] supplies the accepted checklist and bounded-refactor policy.
- **Drift check:** Both cited deliverables exist and still carry matching four-phase checklists. `SPEC.md` currently has Pattern Survey, minimal implementation, targeted verification, and recap guidance, but no explicit Best Practices Review, DRY/SRP/composition language, refactor gate, structural assertions, or refactor/maintainability recap evidence. No cited path or root-cause hypothesis drifted.
- **Clarifications:** No clarifications needed. Assumptions: code-specific checks permit `N/A` with a short reason; composition is preferred only when it reduces coupling; refactors are allowed only for Acceptance or to avoid duplication/responsibility/dependency damage in the touched path; evidence replaces scorecards and thresholds.
- **Exit-gate judgment:** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Extended the existing four-phase checklist rather than adding a phase, lazy module, or separate quality system. `SPEC.md` carries the explanatory canon; `templates/tasknote-template.md` mirrors only the durable prompts. The Pattern Survey treats DRY, SRP, and composition as contextual judgment, while the Minimal Refactor Gate permits only the smallest Acceptance- or boundary-preserving correction and explicitly defers unrelated cleanup. No structural refactor was needed for this markdown-only change.

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

**Testing Notes:** Markdown-only contract/template change: executable tests, code lint/typecheck, and frontend visual confirmation are N/A. `git diff --check` passed. Focused parity assertions confirmed all four new labels occur in both `SPEC.md` and `templates/tasknote-template.md`; repository search confirmed runner-specific copies remain untouched for [[CORE-362.3]]. Quality Assertions are N/A for code, while review of the actual diff found no duplicated explanatory block in the template, no new public/tooling surface, and no stale internal cross-reference.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-20.` and kept nested under the open epic per cohort convention; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**

- `README.md` — no change; its Phase 1 archive-recall overview does not enumerate the phase checklist
- `SPEC.md` — updated as the canonical task deliverable
- `docs/MIGRATION.md` — no change; no adoption, update, or migration procedure changed
- `claude/AGENTS-snippet.md` — no change; runner-specific propagation belongs to [[CORE-362.3]]
- `codex/AGENTS-snippet.md` — no change; Codex wiring and invocation remain unchanged
- `docs/CONVENTIONS.md` — no change; its Phase 3 command-validation claims remain true, while Quality Assertions are additive review evidence rather than a hook or command
- `CONTRIBUTING.md` — no change; contribution policy is unaffected
- `SECURITY.md` — no change; no trust boundary, privilege, or injection control changed
- `docs/AGENT-NEUTRALITY.md` — no change; the additions are agent-neutral and introduce no platform-specific primitive
- `docs/PLATFORMS.md` — no change; platform wiring and capability mappings are unaffected
- `claude/CAPABILITIES.md` — no change; no Claude capability or operator primitive changed
- `docs/AGENT-COMPAT.md` — no change; cross-agent dogfood evidence belongs to [[CORE-362.4]]

**Final Summary:** Strengthened the standard four-phase workflow with a focused Best Practices Review, contextual DRY/SRP/composition prompts, a tightly bounded Minimal Refactor Gate, structural Quality Assertions, and an evidence-based recap. The additions make maintainability judgment explicit without adding a phase, validator, scorecard, or new tool.

Technical evidence: `SPEC.md` (+28/-5) carries the explanatory canon and `templates/tasknote-template.md` (+8/-2) mirrors only the actionable prompts, for 2 deliverable files and +36/-7 lines. `git diff --check` and focused four-label parity assertions passed; executable tests, code lint/typecheck, and frontend confirmation were N/A. No refactor was made or deferred, runner copies remain intentionally assigned to [[CORE-362.3]], and the full AI-referenced doc sweep found no secondary update required.

**Archived:** 2026-07-20
