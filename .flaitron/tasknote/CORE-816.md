---
title: quality-first-calibration
status: starter
tags: []
created: 2026-10-20
related-tasks: [CORE-814, CORE-741.3, CORE-EPIC-815]
---

# CORE-816 | quality-first-calibration

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-20) · 🔗 [[CORE-814]] · 🔗 [[CORE-741.3]] · 🔗 [[CORE-EPIC-815]]

## 🌱 Starter context

_Captured 2026-10-20 during the CORE-815.4 post-closure discussion. Promote to a full tasknote at `/ft-task` checkout._

### Why this exists

[[CORE-814]] lowered Claude `[moderate]` (then `[medium]`) from Opus @ medium to Sonnet @ high so the cell matched Sonnet's roster band. As a result, `[light]` and `[moderate]` print the same Claude Code pick. The operator puts code quality first and would rather lean a little heavier than sit on the cusp of errors. They have historically run moderate work on Opus @ medium and light work on Sonnet @ high.

### Solution shape

- Claude Code map: `[light]` Sonnet @ high, `[moderate]` Opus @ medium, `[heavy]` Opus @ high, so the three picks differ.
- Reword the roster's Opus row (heavy at default effort `medium`; `opus@low` ≈ moderate-band) and the "cell matches its band" rule around a stated quality-first bias. When a cell is on the cusp, pick the heavier model.
- Haiku stays off the map. It is allowed only as an explicit concrete `haiku` tag for the lightest or micro work.
- Apply the same bias to the Codex (Sol / Astra / Luna), Grok and Gemini cells, and check that each tier is labelled honestly.

### Files to touch (preliminary survey — drift-check at promotion)

- `docs/PLATFORMS.md` — §"Tier × platform map" cells and prose, §"Family roster" band and equivalence cells
- `SPEC/model.md` — §"Effort recommendations" (band-matching and "Printing a cell" rules)
- `SPEC/post-closure.md` — the `[moderate]🧩 … · Sonnet @ high` example line
- `docs/AGENT-NEUTRALITY.md` — the CORE-814 provenance rows
- `claude/skills/ft-task/step-1.5-model-edge.md` — only if a pick is restated there

### Explicitly out of scope

- A new sub-light tier — decided against (see below)
- Tier renames — [[CORE-EPIC-815]]

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Sub-light tier | No | `--micro` already covers tiny work; ladder churn is costly ([[CORE-EPIC-815]] precedent); a lower rung works against the quality-first bias |
| Haiku | Off the ladder; explicit `haiku` tag only | The operator doesn't trust it beyond the lightest or micro work |
| Bias | Lean heavier when a cell is on the cusp | Code quality first |

### Open at promotion (Phase 1 should resolve)

- Should the round-up default (`[moderate]` when unsure) move up to `[heavy]`? Lean: no. Moderate on Opus @ medium already gives the margin.
- Re-verify vendor roster facts? Lean: yes, for every cell this task changes.
- Is Grok's `[light]` / `[moderate]` same-pick acceptable, given there is no lighter Grok? Lean: decide at Discovery.

### Related

- [[CORE-814]] — the decision being revisited (`related-decision:`)
- [[CORE-741.3]] — origin of the tier × platform map
- [[CORE-EPIC-815]] — the tier rename; independent
