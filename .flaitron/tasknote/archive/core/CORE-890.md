---
title: budget-other-templates
status: completed
tags: [docs, context-budget]
created: 2026-11-08
due:
related-tasks: [CORE-881, CORE-891]
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-890 | budget-other-templates

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-881]] · [[CORE-891]]

## 🎯 Goal

Account for every remaining shipped template in `docs/CONTEXT-BUDGET.md`: cap `templates/subagent-probe-template.md` with an enforced §"Budgets" row, and exempt the six seed templates by name with a reason.

## ✅ Acceptance

- [x] §"Budgets" carries a `templates/subagent-probe-template.md` row, and `context_budget` enforces it — `grep -qE '^\| \`templates/subagent-probe-template.md\` \| [0-9,]+ \|' docs/CONTEXT-BUDGET.md` + `bash tools/drift-checks.sh context_budget` + a temp-copy lowered-cap negative probe
- [x] §"Cap history" records the row's first cap — `grep -q 'subagent-probe-template.md\` | budgeted' docs/CONTEXT-BUDGET.md`
- [x] "Not budgeted, deliberately" names the six seeds with a reason — `awk '/^\*\*Not budgeted, deliberately/,/^## Cap history/' docs/CONTEXT-BUDGET.md | grep -oE 'templates/(tasknote-micro|tasknote-starter|sidequest|spec|audit-overlay|loop-heartbeat)-?template\.md' | sort -u | wc -l` = 6
- [x] Every file in `templates/` is budgeted or exempt by name — `for f in templates/*; do grep -q "\`$f\`" docs/CONTEXT-BUDGET.md || echo $f; done` prints nothing
- [x] Drift checks stay green — `just check`

## 🧩 Subtasks

- [x] Add the §"Budgets" row (after the `claude/AGENTS-snippet.md` row)
- [x] Add the §"Cap history" row
- [x] Extend "Not budgeted, deliberately" with the six seeds
- [x] Run the Acceptance commands, the negative probe, and `just check`

## 🔗 Related

- [[CORE-881]] — predecessor; exempted three templates by name, filed this from its External review
- [[CORE-891]] — `NEAR CAP` on small-unit rows; the new row prints it too

---

## ⚡ Notes

**Relevance:** Proceed — none of the four named templates appears anywhere in `docs/CONTEXT-BUDGET.md`; the gap CORE-881's review found is still open.
**Archive skim:** area `core` confirmed against the README table. CORE-881 is the load-bearing hit: its exemption reason (seed, read once, written out) and its closing rule ("a template a runner starts re-reading mid-task earns a row here"). Its sizing method: file + ~1.5 working units measured over the touching commits, rounded up to the next 100; a row that prints `NEAR CAP` from day one is accepted (CORE-891 owns that).
**Drift check:** the PLAN row is accurate, but it misses three more unaccounted templates: `spec-template.md`, `audit-overlay-template.md` and `loop-heartbeat-template.md`. It also frames `subagent-probe-template.md` as exemption-or-row, but `SPEC.md` §"Who reviews" and `SPEC/procedures/ft-task.md` show non-Claude runners brief every Phase 3 review probe from it. That makes it a mid-task re-read, which by CORE-881's own rule earns a row. Readers of the rest: micro (`/ft-task --micro` scaffold), starter (`/ft-file-task --starter`, `/ft-refactor`, `/ft-seed-unattended`), sidequest (`/ft-file-task --park`), spec (by hand), audit-overlay (`ft-audit` bootstrap / MIGRATION copy), loop-heartbeat (hand-copied to `.claude/loop.md`). All of them are seeds.
**Clarifications:** operator (AskUserQuestion): the probe template gets a §"Budgets" row, not an exemption; scope widens to all seven unaccounted templates, so every file in `templates/` is capped or exempt by name. Assumptions: the ledger is left to `/ft-release` (CORE-724.5 / CORE-881 precedent); the probe unit comes from its 8 touching commits: routine edits 0 to +78, and one +2,043 outlier (the review variant). 4,988 + ~1.5 × 78 = 5,105, which rounds up to **5,200**.
Size estimate: ~14 lines (rename-aware).
Discovery surfaced an operator-confirmed scope widening (three extra templates, one row in place of an exemption) that stays micro-sized → skip 🛠️.
**Pattern survey:** extended CORE-881's shapes. The §"Budgets" row uses the sibling "Why this number" form (what it is, why budgeted, sizing with the measured unit, headroom note). The §"Cap history" row uses the bare first-budget form. The exemption continues CORE-881's by-name template paragraph in place.
**Implementation:** `docs/CONTEXT-BUDGET.md` only (+13/−0): a `templates/subagent-probe-template.md` row at 5,200, its Cap history row, and a by-name exemption for the six seed templates. `tools/drift-checks.sh` is unchanged, because a plain-path row is enforced as-is. No refactor.
**Verification receipt:** `bash tools/drift-checks.sh context_budget` → 0 (prints `NEAR CAP templates/subagent-probe-template.md 4988 of 5200 (95%)`, as expected) · negative probe: temp copy of the tree with the cap lowered to 4,900 → 1 (`OVER BUDGET … 4988 > 4900`) · row grep → 0 · Cap history grep → 0 · exemption name count → 6 · `templates/*` coverage loop → prints nothing · `just check` → 0 (run before and after the review fixes). The 👁️ check is N/A: no rendered surface.
**External review:** `/code-review medium docs/CONTEXT-BUDGET.md`, run over this task's uncommitted diff only. Findings:
(1) Note, fixed: "§Ledger does not track these six" implied the probe template is tracked. Reworded: none of the six is in the Ledger, and `context_budget` measures the probe on every push.
(2) Note, fixed: "every task's Phase 3" overstated the load, since a review can be N/A. Now reads "each graded Phase 3 review".
(3) Note, fixed: "re-read mid-task" did not separate the probe from the seeds. The criterion is now *never written out*: its text is briefed from context, while a seed becomes an owned file.
(4) Note, fixed: the row omitted Claude-path readers. It now names the optional Phase 1 probe and `/ft-refactor`'s survey.
(5) Note, fixed: the row claimed ~1.5 units, but the cap leaves ~2.7. It now states 5,105 rounded up, with 212 chars ≈ 2.7 units at +78, and records the ±71 pair.
(6) Note, fixed: added the snippet row's "judge it in units" caveat.
(7) Note, fixed: a starter is read once per note filed and each read is written out, which the new criterion covers.
(8) Note, no change apart from one sharpened clause: the claim that the heartbeat template is consulted mid-loop is wrong. Its runner reads the owned `.claude/loop.md` copy (template lines 8–10), and the exemption now says so.
**Docs touched:** every `.flaitron/tasknote/README.md` §"AI-referenced docs" entry is unchanged. The README template list (line 11) names files, not budgets. No sweep doc cites the budget table, and `docs/CONTEXT-BUDGET.md` is deliberately off the list. Learnings: none.
**N/A:** Best Practices — docs-table edit, no code or module boundary

**Final Summary:**

- **Changed:** `docs/CONTEXT-BUDGET.md` (+13/−0). Every file in `templates/` is now budgeted or exempt by name. `subagent-probe-template.md` is capped at 5,200 because it is briefed into probes and never written out. The micro, starter, sidequest, spec, audit-overlay and loop-heartbeat seeds are exempt with a reason. Scope widened by operator answer from the PLAN row's four templates to all seven unaccounted ones.
- **Verification:** all Acceptance commands pass. The negative probe shows the row is enforced, and `just check` → 0.
- **`touches:` reconciliation:** declared `docs/CONTEXT-BUDGET.md`. The diff is that file plus workflow paths (this note, `.flaitron/PLAN.md`), which matches.
- **Maintainability:** the new row prints `NEAR CAP` by construction, a second instance for CORE-891's open decision.

**Archived:** 2026-11-08
