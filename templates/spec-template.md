---
title: <spec title>
slug: <kebab-slug>
status: draft
created: YYYY-MM-DD
related-tasks: []
---

# Spec — <title>

> Lightweight, review-first design spec. Living markdown — edit in place as
> the design evolves; there is no version machine and no schema. **Optional**
> input to planning: never required before `/ft-task` or `/ft-epic-discovery`,
> and it files nothing on its own. The section order below is fixed so specs
> read the same across a project; drop a section's body to a single line when
> there's little to say, but keep the heading.

## 🎯 Goal

One or two sentences: what this spec is for and what "done" looks like.

## 📋 Requirements

What must be true for the goal to be met — functional and non-functional.
Keep each bullet concrete and checkable; this list is what the Design and
Tasks sections answer to.

- Requirement 1
- Requirement 2

## 🧭 Design

The chosen approach and the decisions behind it: shape, key tradeoffs,
alternatives considered and why they were set aside. Text diagrams are
welcome. Keep it to what a builder needs to start — not an exhaustive
reference.

## 🧩 Tasks

Proposed decomposition into Flaitron work. Each line names a **suggested**
Flaitron type plus a one-line scope. Conversion stays operator-driven — run
the named skill yourself; a spec never files PLAN entries or tasknotes.

- **[epic]** `<scope>` — file via `/ft-epic-discovery`
- **[task]** `<scope>` — add a PLAN.md line, then `/ft-task <ID>`
- **[starter]** `<scope>` — `/ft-file-followup --starter` (rich context, not ready to start)
- **[micro]** `<scope>` — `/ft-micro-task <ID>`
- **[sidequest]** `<scope>` — `/ft-file-followup --park` (park mid-flow)

## ⚠️ Risks / Open Questions

Known risks, unresolved unknowns, and decisions deliberately deferred — the
things that could make this spec wrong. One bullet each.

- Risk / open question 1

## ✅ Validation Approach

How you'll know it works, in prose — the testing and verification strategy,
not a schema or a gate. Engineering guidance: targeted tests for changed
behavior, property-based tests where the input space is wide, manual/visual
confirmation for UI surfaces. This folds into each resulting task's Phase 3
(Testing & Linting); it never becomes a new lifecycle phase.
