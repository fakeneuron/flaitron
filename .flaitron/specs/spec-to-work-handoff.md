---
title: Spec→work handoff
slug: spec-to-work-handoff
status: superseded
created: 2026-07-12
related-tasks: [[CORE-EPIC-352]]
---

> **Superseded 2026-09-12** — the consuming skills this spec proposed
> extending, `/ft-spec` and `/ft-starter-task`, have since been retired.
> Kept as a historical record (it was `/ft-spec`'s own dogfood output, per
> [[CORE-352.5]]); the design below is no longer actionable as written.

# Spec — Spec→work handoff

> Lightweight, review-first design spec. Living markdown — edit in place as
> the design evolves; there is no version machine and no schema. **Optional**
> input to planning: never required before `/ft-task` or `/ft-epic-discovery`,
> and it files nothing on its own. The section order below is fixed so specs
> read the same across a project; drop a section's body to a single line when
> there's little to say, but keep the heading.

## 🎯 Goal

Let a drafted `.flaitron/specs/<slug>.md` optionally serve as the brief for
`/ft-epic-discovery` and `/ft-starter-task`, so the design captured in a spec
flows into filed PLAN work without the operator re-typing it. "Done" = both
skills accept a spec reference, read the file as their brief, and run their
normal filing flow unchanged when no spec is given.

## 📋 Requirements

- `/ft-epic-discovery` accepts an optional spec reference and uses its
  Goal / Requirements / Design as the epic brief and 🧩 Tasks as candidate
  child scopes.
- `/ft-starter-task` accepts an optional spec reference and pulls rich context
  from it into the starter tasknote.
- Purely additive & optional — invoking either skill with no spec is
  byte-identical to today. A spec is never required.
- No new subsystem or parser: the skill *Reads* a markdown file; `.flaitron/specs/`
  stays an operator scratchpad; `/ft-spec` still files nothing itself.
- Agent-neutral: prose-level reading, no schema/validator; contract-only agents
  get the optional input named in the SOP.

## 🧭 Design

Add an optional arg — `--spec <slug-or-path>` — to `/ft-epic-discovery` and
`/ft-starter-task`. When present, the skill's brief-gathering step Reads
`.flaitron/specs/<slug>.md` and treats the six sections as the design brief:
Goal → epic/task goal, Requirements + Design → scope, 🧩 Tasks → candidate
children/scope. The spec is an *input*, not a driver — the skill still runs its
own Discovery and operator-review gates; nothing is auto-filed.

Reciprocal: `/ft-spec` Step 6 handoff names `--spec <slug>` as the concrete
conversion path (today it only says "run the named skill").

- **Tradeoff:** risks coupling specs toward the lifecycle. Mitigation: additive
  optional arg; no skill *requires* a spec; specs dir stays optional.
- **Alternative considered:** auto-file the Tasks section on read — rejected
  (violates operator-review-over-autonomy + the planning-peer files-nothing rule).

## 🧩 Tasks

- **[epic]** spec-consuming conversion skills — file via `/ft-epic-discovery`
  (could dogfood itself with `--spec spec-to-work-handoff`)
  - **[task]** `/ft-epic-discovery` optional `--spec` brief support
  - **[task]** `/ft-starter-task` optional `--spec` brief support
  - **[task]** `/ft-spec` Step 6 handoff cross-ref to the `--spec` path
  - **[task]** Codex wrappers + SOP sync for the changed skills
  - **[micro]** docs: `SPEC/tasknote-selection.md` + `docs/MIGRATION.md` note the spec→work path

## ⚠️ Risks / Open Questions

- Coupling risk: the optional arg drifts into a de-facto requirement — hold the additive/optional line.
- Section→field mapping wants a light *convention*, not a schema — where documented?
- Open Q: arg shape — `--spec <slug>` vs positional path vs auto-detect a lone spec.
- Reverse link: a filed epic should backlink its source spec (`related-tasks`) — needs a convention.

## ✅ Validation Approach

Skills are prose, so no executable surface. Validate by dogfooding again: run
`/ft-epic-discovery --spec spec-to-work-handoff` and confirm it yields sensible
children. Targeted check: each skill runs unchanged with no `--spec`. Docs:
cross-ref integrity for the new handoff path. Folds into each resulting task's
Phase 3 — no new lifecycle phase.
