---
title: epic-per-child-model
status: sidequest
priority: Medium
pickup: soon
created: 2026-10-07
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-epic-discovery/SKILL.md
  - codex/skills/ft-epic-discovery/SKILL.md
  - SPEC/model.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-726 | epic-per-child-model

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-10-07)

## Idea

`/ft-epic-discovery` collects one `[model]` at Step 2 #4 and writes it on every line — parent, `.1`, `.N`, and (per the Phase 2 pattern-survey note, "`[<model>]` tag preserved on every line") each `.2..(M+1)` child. Children differ in cognitive load, but the skill never asks per child, so every epic files uniform. Worse, a uniform category tag cannot route work to a specific top model: `[heavy]` is matched by tier (`SPEC/model.md` §"Category-vs-concrete matching"), so an Opus session silently satisfies a child that needs Fable.

Fix: at the Phase 2 child-filing step, propose a `[model]` per child (default = the epic's token; raise or lower per child from its Discovery-settled shape), shown in the existing review prompt alongside `[unattended]` candidacy; reword the "tag preserved on every line" note to "tag present on every line". Add a `SPEC/model.md` practical-guidance line: when a child must run on one named model, file the concrete token (e.g. `[fable]`) — the exact-identity gate enforces it; a category tag only advises.

Origin: sciphoenix SCI-128 (2026-10-07) hand-patched this as a project-local per-archetype table in `research/extraction/ROLLOUT.md` §3 "Model per child" — `[fable]` for T1/T2 source mining, chart + synthesis and B1 inventories; `[heavy]` for `.1`/`.N`. That table is the adopter precedent.

## Resume anchor

Not started. Filed from a sciphoenix session; nothing in flight here.
