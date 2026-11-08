---
title: near-cap-small-unit-rows
status: completed
tags: [context-budget, drift-checks]
created: 2026-11-08
due:
related-tasks: [CORE-869.3, CORE-881, CORE-890]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONTEXT-BUDGET.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-891 | near-cap-small-unit-rows

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-869.3]] · [[CORE-881]] · [[CORE-890]]

## 🎯 Goal

Let a Budgets-table row name its own `NEAR CAP` threshold, so a small-unit row's line marks real erosion instead of firing from the day it is sized.

## ✅ Acceptance

- [x] A row whose "Why this number" cell carries `NEAR CAP at N%` reports from N% up to the cap; a row without it keeps 95%, in all three row shapes — `node --test tools/drift-checks.test.mjs`
- [x] `claude/AGENTS-snippet.md` and `templates/subagent-probe-template.md` carry an override sized from their working unit, and neither prints `NEAR CAP` on the live tree — `bash tools/drift-checks.sh context_budget | grep -cE 'NEAR CAP  (claude/AGENTS-snippet|templates/subagent-probe)'` prints 0
- [x] Their "judge it in units, not by that line" workaround sentences are gone, and §"How this is enforced" documents the override — `! grep -q 'not by that line' docs/CONTEXT-BUDGET.md && grep -q 'NEAR CAP at' docs/CONTEXT-BUDGET.md`
- [x] Drift checks and their self-test pass — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`
- [x] An override outside 1 to 99 fails the check (`BAD NEAR CAP`) — `node --test tools/drift-checks.test.mjs`

## 🧩 Subtasks

- [x] Parse an optional `NEAR CAP at N%` token per row in `context_budget`; use it at the three compare sites
- [x] Extend the self-test: an override row fires at its own threshold and stays silent below it
- [x] Add the token to the two small-unit rows, drop their workaround sentences, document the override in §"How this is enforced"
- [x] Doc-drift: `step-7.1-standing-checks.md`'s NEAR CAP clause names the per-row percentage

## 🔗 Related

- [[CORE-869.3]] — introduced the flat 95% `NEAR CAP` line
- [[CORE-881]] — sized the snippet row; filed this task from its External review
- [[CORE-890]] — the probe-template row, a second instance

---

## ⚡ Notes

**Relevance:** Proceed. Both rows still print `NEAR CAP` on the live tree (snippet 13,232 of 13,800; probe 4,988 of 5,200), and both "Why" cells carry a workaround sentence.
**Best Practices Review:** extend `context_budget` in place. The header forbids a non-check helper, so the threshold read sits in the loop and the three inline compares take a variable, keeping CORE-869.3's shape. The table stays the single source; the script still restates no number except the 95 default.
**Archive skim:** area `core` confirmed against the README table. CORE-869.3 settled the hard-coded 95 and the three inline compare sites. CORE-881 #6 filed this as a design call (per-row threshold or re-size). CORE-890 added the second instance.
**Drift check:** the cited paths and figures match the tree. The Budgets→Known-over-budget awk range also spans §"Cap history", but its rows have no bare-number second cell, so the row regex skips them and a token there is never read.
**Clarifications:** operator chose a per-row threshold over a re-size or a doc-only note. Assumptions: the token sits in the "Why this number" cell as `NEAR CAP at N%`. Thresholds leave about one upper-bound working unit of headroom at the line: snippet 97% (414 chars, about 1.1 × 363); probe 98% (104 chars, about 1.3 × 78).
**Pattern survey:** extends CORE-869.3's three inline compares in place, as the header requires (no helper). The table read gains a third `read` field for the Why cell. The self-test follows the existing near-cap `describe` fixture shape.
**Implementation:** `context_budget` reads `why` per row and sets `near=95`, or N from `NEAR CAP at N%` (bash `=~`, 3.2-safe). N must match `^[1-9][0-9]?$`, otherwise `BAD NEAR CAP <surface> <N>%` sets `bad`. The three compares use `$near`, and the header comment was restated. Rows: snippet `NEAR CAP at 97%`, probe `NEAR CAP at 98%`, each workaround sentence replaced. §"How this is enforced" documents the override and scopes it to rows sized under 5% headroom. The ft-task.md and ft-release rows keep 95%: they sit about one unit from the cap, so their line is real erosion.
**Verification receipt:** `node --test tools/drift-checks.test.mjs` → 0 (42 pass). Negative probe: the new override test against the HEAD script → 1 (fails as it should). `bash tools/drift-checks.sh` → 0. `bash tools/drift-checks.sh context_budget | grep -cE 'NEAR CAP  (claude/AGENTS-snippet|templates/subagent-probe)'` → prints 0 (live NEAR CAP: ft-release SKILL/**, procedures/ft-task.md only). Doc grep (`! grep -q 'not by that line' … && grep -q 'NEAR CAP at' …`) → 0.
**External review:** `/code-review medium` on this diff, 7 findings. (1) The rule scope read as covering ft-task.md and ft-release/**: fixed by rewording it to rows whose sized headroom is under 5%. (2) The unanchored token could take another row's figure: declined, since each row holds one token, no Why cell quotes another row's, and a dedicated column would reshape every row for a hypothetical risk. (3) N was not range-checked (100, 0, leading-zero octal): fixed with a 1–99 check that fails with `BAD NEAR CAP`, plus a test. (4) No unmarked row after marked ones: fixed, `plain.md` row added. (5) Glob and `/**` rows were not tested below their line: fixed, `g/quiet.md` and `e/**` added. (6) Stale header comment: fixed. (7) Ambiguous step-7.1 wording: fixed.
**Docs touched:** `docs/CONTEXT-BUDGET.md` (two rows plus §"How this is enforced") and `step-7.1-standing-checks.md` (NEAR CAP clause) are updated. The README §"AI-referenced docs" set needs no change: none of them mention `NEAR CAP`. No Learnings.

**Final Summary:** `context_budget` now reads an optional `NEAR CAP at N%` from a Budgets row's Why cell (default 95, N from 1 to 99, anything else fails). The two small-unit rows (snippet 97%, probe 98%) no longer print `NEAR CAP` from the day they were sized. `touches:` was reconciled: `step-7.1-standing-checks.md` was added by the doc-drift sweep. Files: `tools/drift-checks.sh`, `tools/drift-checks.test.mjs` (+2 tests), `docs/CONTEXT-BUDGET.md`, `claude/skills/ft-release/step-7.1-standing-checks.md`.

**Archived:** 2026-11-08
