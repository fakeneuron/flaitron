---
title: model-routing-calibration
status: starter
tags: [model-routing]
created: 2026-10-20
touches:
  - SPEC/model.md
  - docs/PLATFORMS.md
related-tasks:
  - CORE-741.2
---

# CORE-814 | model-routing-calibration

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-20) · 🔗 [[CORE-741.2]]

## 🌱 Starter context

_Captured 2026-10-20 during an operator check of three rows a Codex (Sol) session filed all-`[frontier]` — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Three cross-repo rows came in all `[frontier]`. Graded against the current
triggers:

- BP-2581 neon-auth-migration-scope → `[frontier]` ✓ (security +
  credential/ID migration + cutover/rollback + scoping that files sequenced
  work).
- BE-102 pin-neon-jwt-verifier → `[heavy]` (bounded hardening; rejection
  tests catch the silent failure; only "assess legacy-fallback removal" is
  hard to unwind — split it rather than escalate the row).
- NAT-444 api-origin-topology → `[medium]` (decision already stated in the
  row; remaining work is recipe prose + one wording edit; matched
  "architecture design" by topic).

So 1 of 3 is correct. The cause is several stacked round-up rules, not one
rule:

1. `SPEC/model.md` §"When to choose `[frontier]`": triggers match on topic
   (security / data migration / contract / architecture). Only the
   blast-radius bullet carries "expensive to unwind", and nothing asks
   whether the decision is still open at filing.
2. `docs/PLATFORMS.md` §"Tier × platform map": cells sit a rung above the
   roster bands — `[light]`→Sonnet/Sol (medium-tier models), Claude
   `[medium]`→Opus (heavy-tier) primary; Haiku/Luna never primary.
3. `SPEC/model.md` §"Effort recommendations": the upper end of a range on
   doubt, and printing *always* takes the upper end — layered on the tier
   round-up default.

### Solution shape

- Frontier triggers gain qualifiers: the decision is still open at filing,
  **and** a wrong answer is hard to unwind. If the row already states the
  decision, that is not "design"; if the risky judgment can be split off,
  split it instead.
- Add calibration examples (the three rows above) as worked cases next to
  the triggers.
- Re-derive the map cells from the roster bands, or document why each cell
  deliberately sits a rung up.
- Revisit "printing always takes the upper end" against the
  reliability-over-tokens rationale.

### Files to touch (preliminary survey — drift-check at promotion)

- `SPEC/model.md` — §"When to choose `[frontier]`", §"Effort
  recommendations", §"Practical guidance and agent-aware defaults" round-up
  text.
- `docs/PLATFORMS.md` — §"Tier × platform map" cells + prose.
- `claude/skills/ft-file-task/SKILL.md` Step 2 item 3 and the sibling
  chooser skills (`/ft-open-epic`, `/ft-audit`, `/ft-audit-repo`,
  `/ft-refactor`, `/ft-seed-unattended`) — check whether any paraphrases the
  triggers; the `codex/` wrappers too, since Codex produced the sample.

### Explicitly out of scope

- Retagging the three sample rows in their own repos — each repo retags from
  its own session.
- The Step 1.5 gate mechanics (tier matching, ⚠️ advisory) — not implicated.

### Open at promotion (Phase 1 should resolve)

- Data is thin: no open `[frontier]` row exists across the 25 adopter repos
  today; natabula's four are all epic `.1` Discovery (intended). The rung is
  recent ([[CORE-741.2]]). Is this a Codex-reading problem or a rule problem?
  Lean: both — tighten the rule; wrapper wording is a secondary check.
- Should the round-up asymmetry argument still hold for effort, or only for
  tier? Lean: tier only; effort round-up compounds it.
- Does the work need an epic? Lean: no — two docs plus wrapper wording
  checks.

### Related

- [[CORE-741.2]] — introduced the `[frontier]` rung and its trigger list
  (predecessor).
