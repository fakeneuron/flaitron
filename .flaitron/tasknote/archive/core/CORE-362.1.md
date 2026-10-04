---
title: clean-code-guidance discovery
status: completed
tags: []
created: 2026-07-20
due:
related-tasks: [CORE-EPIC-362]
---

# CORE-362.1 | clean-code-guidance discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-362]]

## 🎯 Goal

Scope the `CORE-EPIC-362` epic (`clean-code-guidance`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-362.2`..`CORE-362.4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (agent-neutral contract, tasknote templates, runner projections, audit/quality overlap, adopter wiring) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-362.2 .. CORE-362.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-362.N reviewed and confirmed as-filed (or rewritten if Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure records a verdict for every AI-referenced doc

## 🧩 Subtasks

- [x] Inventory the clean-code guidance surface and record current checklist gaps
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents and log load-bearing decisions
- [x] Drift-check all cited skills, SPEC sections, procedures, templates, and quality/audit surfaces against HEAD
- [x] Resolve child boundaries, propagation policy, and whether a lazy module or audit mode is warranted
- [x] Draft refined long descriptions for CORE-362.2 .. CORE-362.4 and word-count each
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-362 with 2-space indent
- [x] Phase 3: run a markdown mental-pass on PLAN.md grammar, indentation, cross-references, and word budgets
- [x] Phase 4: run doc-drift sweep, flip the .1 PLAN line to stub form, and archive the tasknote

## 🔗 Related

- [[CORE-EPIC-362]] — parent clean-code-guidance epic
- [[CORE-EPIC-324]] — repository best-practices and contract-consistency precedent
- [[CORE-EPIC-352]] — agent-neutral capability and validation-boundary precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The brief spans the always-loaded workflow contract, canonical template, agent-neutral procedure, and specialized runners. Strengthening those existing surfaces is systemic and remains inside Flowtron’s markdown-only, four-phase design.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Surface inventory

| Surface | Current role | Discovery conclusion |
|---|---|---|
| `SPEC.md` four-phase workflow | Always-loaded agent-neutral contract | Canonical home for guidance that should affect every normal task; do not hide it in a lazy module |
| `templates/tasknote-template.md` | Persistent phase checklist | Mirror only concise, actionable checklist language so tasknotes record the review |
| `SPEC/procedures/ft-task.md` | Agent-neutral execution projection | Re-verify against canon and project the behavior without Claude-specific primitives |
| `claude/skills/ft-task/SKILL.md` | Rich Claude runner | Point at and reinforce canon; avoid a second full clean-code checklist |
| `ft-micro-task` | Compact single-section runner | Needs a tailored compact prompt because it does not carry the standard phase checklist |
| `ft-goal-task` / `ft-debug` | Specialized standard-template runners | Inherit shared contract; add only cadence-specific quality/refactor wording where their custom execute/verify steps bypass `/ft-task` prose |
| `ft-quality` | Independent command sweep | Remains verification-only; lint/typecheck/tests do not substitute for structural review |
| `ft-audit` family | Retrospective audit and ticket filing | Already covers idioms, hygiene, orphans, and doc drift; no new mode required for prospective task guidance |
| Codex wrappers / Grok procedure pointer | Route to neutral procedure or canonical skill | No copied checklist; contract and SOP propagation preserve cross-agent behavior |

### Clean-code audit

**Existing strengths:** Phase 1 already requires relevance, archive precedent, and drift checks. Phase 2 already requires an existing-pattern survey, minimal implementation, targeted tests, and restraint around adjacent refactors. Phase 3 already separates targeted verification from broad-suite judgment. Phase 4 already requires doc-drift and a recap with files, LOC, and key decisions.

**Gaps:**

1. **Responsibility boundaries are implicit.** Discovery does not ask whether the touched logic belongs in its current module, whether dependencies point in the established direction, or whether the change overloads one component.
2. **Duplication is primarily retrospective.** `/ft-audit` can find duplication later, but task execution has no prospective check for copy-paste introduced by the current change or a missed existing abstraction.
3. **The refactor boundary is underspecified.** “Resist refactoring adjacent code” prevents scope creep, but no rule distinguishes adjacent cleanup from the smallest in-scope refactor required to preserve a clear boundary or avoid new duplication.
4. **Phase 3 proves behavior more strongly than structure.** Tests and linters rarely detect duplicated logic, dead branches, misplaced responsibility, an unnecessarily widened public surface, or explanatory comments/docs made stale by the change.
5. **Recap quality evidence is inconsistent.** Files/LOC/key decisions are requested, but refactors made or consciously deferred and their maintainability effect are not explicit.
6. **Projection duplication needs restraint.** The same lifecycle is already described in SPEC, template, SOP, and several skills. New guidance should be canonical once, persisted compactly in the template, and specialized only where a runner’s cadence bypasses the standard wording.

### Proposed canonical checklist

- **Phase 1 — Best Practices Review:** identify touched responsibilities, dependency direction, relevant abstractions, and duplication in or around the changed path; record any in-scope refactor need or consciously deferred cleanup.
- **Phase 2 — Pattern Survey:** extend an established pattern or justify a new shape; check DRY and single-responsibility boundaries; prefer composition when it reduces coupling rather than as a universal rule.
- **Phase 2 — Minimal Refactor Gate:** refactor only when Acceptance requires it or the touched implementation would otherwise introduce duplication, obscure responsibility, or violate an established dependency boundary; log the reason. Defer unrelated cleanup.
- **Phase 3 — Quality Assertions:** alongside tests and lint/typecheck, confirm the change introduced no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation.
- **Phase 4 — Quality Evidence:** recap files and LOC, verification commands, refactors made or deferred with justification, documentation verdict, and the concrete maintainability effect. Avoid scorecards or arbitrary thresholds.

### Archive precedents

- [[CORE-324.1]] / [[CORE-324.3]] — repository best-practices and consistency work established “canon first, mirror only required projections”; it fixed explicit drift while leaving by-reference inheritors untouched.
- [[CORE-352.1]] — agent-capability Discovery locked no new lifecycle phase, schema validator, daemon, or unnecessary orchestration; optional engineering guidance belongs inside existing phases.
- [[CORE-340]] — cross-agent propagation used one canonical SPEC rule, one neutral procedure projection, explicit runner copies only where those runners restated the behavior, and by-reference inheritance elsewhere.
- [[CORE-330.4]] — specialized loop runners should preserve the shared skeleton and localize only their genuine execute/verify delta.

### Drift check

- All cited surfaces exist at HEAD: `SPEC.md`, `templates/tasknote-template.md`, `SPEC/procedures/ft-task.md`, `claude/skills/ft-{task,micro-task,goal-task,debug,quality,audit}/SKILL.md`, `codex/skills/ft-task/SKILL.md`, and `grok/procedures/ft-task.md`.
- Current `SPEC.md` and the tasknote template match on the four phase checklists. The neutral SOP is stamped `v5.12.0 · 2026-07-16` and must receive an honest re-verification stamp only when its child updates it.
- Repository search found no existing clean-code, DRY, SRP, composition, minimal-refactor-gate, or quality-assertion contract to extend. This is a real guidance gap, not renamed existing work.
- `/ft-audit` already covers Idioms, Hygiene, Orphans, and Doc drift; `/ft-quality` intentionally runs commands only. Neither should gain a new argument or own the task-execution contract.
- No new skill means adopter symlink inventories and skill namespace rosters do not change.

### Resolved scoping

| Question | Resolution |
|---|---|
| Filing inputs | `CORE-EPIC-362` · `clean-code-guidance` · Medium · `[heavy]` · M=3 · keep `.N` audit |
| Canonical home | Strengthen the existing four-phase sections in `SPEC.md`; no `SPEC/clean-code.md` because the guidance is always relevant and has no honest lazy-load trigger |
| Audit extension | No `--clean-code` mode; the audit family already detects retrospective hygiene issues, while this epic targets prospective task execution |
| Child split | `.2` contract + template · `.3` neutral procedure + runner deltas · `.4` dogfood simulation + validation/doc alignment |
| Refactor posture | Permit only justified, in-scope structural cleanup needed for Acceptance, duplication avoidance, or responsibility/dependency integrity; park adjacent cleanup |
| Quality metrics | Evidence, not scores: files/LOC, commands, refactors made/deferred, doc verdict, maintainability effect |
| Propagation | Route from agent-neutral canon; update explicit projections and specialized bypasses only, leaving pointer wrappers thin |

**Draft child descriptions:**

- `.2` `clean-code-contract` — 33 words: Strengthen the agent-neutral four-phase contract and canonical tasknote template with a Best Practices Review, DRY/SRP/composition-aware Pattern Survey, justified minimal-refactor gate, structural quality assertions, and evidence-based recap guidance; keep every addition contextual and lightweight.
- `.3` `runner-propagation` — 30 words: Re-verify and update the neutral ft-task procedure plus only runner-specific skill deltas needed by ft-task, micro, goal, and debug; preserve specialized cadence, thin Codex/Grok pointers, and a single canonical contract.
- `.4` `dogfood-validation` — 30 words: Simulate the revised workflow on a representative sample tasknote, verify checklist clarity and cross-agent inheritance, run applicable repository quality gates, and update AI-referenced docs only where user-facing claims demonstrably drift.

**Exit-gate judgment:** The operator confirmed the proposed inputs and child split. Because this skill uses `default-fire-on-clarifications` and a scoping confirmation occurred, Phase 2 requires the standard 🛠️ approval cue.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Extended the established epic cohort shape from [[CORE-EPIC-352]]: 2-space child indent, model tag on every row, shortname, em-dash separator, and concise implementation ownership per child. Filed three lines: `.2` contract/template (33 words), `.3` neutral procedure + runner deltas (30 words), and `.4` dogfood/validation/doc alignment (30 words). M held at 3 and the reserved `.N` audit did not renumber. Tests are N/A for this pure PLAN filing. Downstream-impact reconciliation found no other active PLAN entries outside the just-filed cohort; High/Low/Future are empty, so there is no downstream impact to reconcile.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:** Pure PLAN/tasknote markdown filing: executable tests, project lint/typecheck, and frontend confirmation are N/A. Markdown validation passed: every implementation child has a 2-space indent, bold grammar-valid ID, model tag, shortname under 30 characters, em-dash separator, and description below the 50-word target (`.2` 33w, `.3` 30w, `.4` 30w). `git diff --check` reported no whitespace errors. The implementation child `CORE-362.4` owns full dogfood and repository quality-gate execution after the contract and runner changes exist to test.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**

- `README.md` — no change; Discovery files work but does not alter shipped workflow behavior
- `SPEC.md` — no change; canonical edits belong to [[CORE-362.2]]
- `docs/MIGRATION.md` — no change; no new skill, command, wiring, or migration step
- `claude/AGENTS-snippet.md` — no change; peer-skill roster and adopter workflow remain unchanged
- `codex/AGENTS-snippet.md` — no change; Codex wiring remains a thin route to the neutral procedure
- `docs/CONVENTIONS.md` — no change; no repository convention changed during filing
- `CONTRIBUTING.md` — no change; contribution process unaffected
- `SECURITY.md` — no change; no trust boundary or security control changed
- `docs/AGENT-NEUTRALITY.md` — no change; Discovery preserved the contract/wiring split
- `docs/PLATFORMS.md` — no change; no platform inventory or plug-in pattern changed
- `claude/CAPABILITIES.md` — no change; no Claude capability or invocation syntax changed
- `docs/AGENT-COMPAT.md` — no change; dogfood evidence lands in [[CORE-362.4]]

**Final Summary:** Filed `CORE-EPIC-362` and closed its Discovery child with three implementation scopes: agent-neutral contract/template guidance, deliberately narrow runner propagation, and cross-agent dogfood/validation. The audit rejected a new lazy module, audit mode, schema, phase, or skill; it instead defined one canonical checklist with evidence-based quality reporting and a bounded refactor rule. Technical: M=3 held; child descriptions are 33/30/30 words; no downstream PLAN reconciliation was needed; validation was markdown-only and passed; parent scope required no closure rewrite.

**Archived:** 2026-07-20
