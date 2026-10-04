---
title: budget-ceiling-recalibration
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-535.1, CORE-535.3, CORE-535.5, CORE-536, CORE-553]
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-555 | budget-ceiling-recalibration

[← PLAN.md](../PLAN.md) · ✅ Complete

## 🎯 Goal

Raise the `SPEC.md` and `SPEC/gates.md` context budgets to operating ceilings that accommodate a substantial contract task, and record in each row why the prior figures never had working margin.

## ⚡ Notes

**Relevance:** Proceed — `SPEC/gates.md` measures 34,963 against a 35,000 cap (37 chars) and `SPEC.md` 49,285 against 50,000 (715). Neither is over budget, so nothing is blocked today; the next substantial contract edit to either trips a release gate that `docs/CONTEXT-BUDGET.md` declares blocking. Operator decision (2026-09-09): raise the budgets rather than compress contract prose — instruction clarity outranks byte discipline. Scope is the two Budgets rows plus the reason recorded in each; the cap-history mechanism considered alongside was explicitly declined.

**Best Practices Review:** N/A — markdown reference doc, no code module boundaries. The one boundary question is where budget numbers live, already settled by [[CORE-535.2]] under [[CORE-465]]: one home (this doc), the release check derives. Verified still true — a repo-wide grep for `50,000` / `35,000` outside `docs/CONTEXT-BUDGET.md` and the write-once archive returns nothing, and `step-7.1-standing-checks.md` restates no cap. Single-file change with no mirror to update.

**Drift check:** PLAN.md cites the two current values and both match HEAD (`SPEC.md` 49,285, `SPEC/gates.md` 34,963). **One cited premise was wrong and is corrected here.** The PLAN line says both figures were split *targets* reused as ceilings, hit "to within 998 and 134 chars". True for `SPEC.md` (CORE-535.3 landed 49,005 against 50,000 — 995 of margin from day one). **Not** true for `SPEC/gates.md`: [[CORE-535.5]] deliberately overshot, landing 32,299 with ~2,701 chars of headroom its own tasknote records as intentional. That headroom was then consumed by a single task — [[CORE-536]] took gates.md 32,299 → 34,866, **+2,567, 95% of it**. So the gates.md defect is not a missing margin but a margin sized below one working unit of contract change. No SPEC contract is contradicted: `docs/CONTEXT-BUDGET.md` §"Known over budget" explicitly sanctions raising a budget "with the reason ... as an explicit decision rather than a silent drift", which is this task's shape.

**Archive skim:** `grep -l CONTEXT-BUDGET .flowtron/tasknote/archive/core/` returns 15 notes; three declare it in YAML `touches:` ([[CORE-536]], [[CORE-538]], [[CORE-544]]). Load-bearing reads: [[CORE-535.2]] minted the Budgets table and fixed the numbers-live-in-one-place rule; [[CORE-535.5]] recorded the 2.7k headroom figure that overturned this task's stated premise (see Drift check); [[CORE-536]] is the task that consumed it. [[CORE-553]] (the v5.26.0 cut, yesterday's session) measured the current values and refreshed the ledger. No prior tasknote proposes or declines a cap *raise* — this is the first, so there is no precedent to contradict.

**Pattern survey:** Extends the established table shape — the "Why this number" cell already carries provenance prose with `[[wikilink]]` attribution on all four existing rows, so the recalibration reason goes there rather than into new prose or a new section. Sizing principle derived from measured history rather than invented: routine contract tasks run +97 to +283 chars ([[CORE-551]], [[CORE-542]]-era), a substantial one +2,567 ([[CORE-536]]), so a ceiling wants roughly two substantial tasks of room. 55,000 and 40,000 give 5,715 and 5,037 — about two substantial or twenty routine tasks each. Numbers were operator-approved before measurement and the evidence supports them unchanged.

**Implementation:** Two table rows in `docs/CONTEXT-BUDGET.md` §"Budgets" — `SPEC.md` 50,000 → **55,000**, `SPEC/gates.md` 35,000 → **40,000** — with the recalibration reason written into each row's existing "Why this number" cell rather than into new prose or a new section (the cell already carries provenance with `[[wikilink]]` attribution on all four rows, so the shape was there). The two cells now say different things because the two defects differ: `SPEC.md`'s cell records the target-vs-ceiling category error (a destination reused as a ceiling, 995 chars of margin from day one); `gates.md`'s records that the split *did* leave ~2,700 deliberate chars and [[CORE-536]] consumed 2,567 of them in one task, so the margin existed but was sized below one working unit of contract change. New headroom: 5,715 and 5,037 — about two substantial tasks each at the measured +2,567 rate, or twenty routine ones at +97–283. Diff is 2 insertions / 2 deletions in 1 file. **Deliberately not done:** the cap-change-history mechanism (operator declined it when scoping — repeated raises stay visible only through this doc's git history), and the ledger stamp, which is untouched because only caps moved, not measurements; it correctly still reads `Measured 2026-09-09 at v5.26.0, refreshed by [[CORE-553]]`.

**Docs touched:** No change across all 18 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries. `docs/CONTEXT-BUDGET.md` is itself deliberately absent from that set (the doc's own closing section says why), and a repo-wide grep confirms no doc in the set restates a cap number — `step-7.1-standing-checks.md` measures and this doc decides, per [[CORE-465]]. Nothing downstream needed updating.

## ✅ Recap

Raised the two context budgets that had no working margin: `SPEC.md` 50,000 → 55,000 and `SPEC/gates.md` 35,000 → 40,000, both in `docs/CONTEXT-BUDGET.md` §"Budgets" (2 lines, 1 file). `gates.md` had 37 chars of headroom and `SPEC.md` 715 before this change; neither was over budget, but the next substantial contract edit to either would have tripped a release gate the doc declares blocking — and would have forced that decision mid-cut, under gate pressure, which is the wrong context for a structural call.

The task's stated premise was half wrong and the drift check caught it. PLAN.md asserted both caps were split *targets* hit to within 998 and 134 chars. True for `SPEC.md`. For `gates.md`, [[CORE-535.5]] deliberately overshot its target and landed 32,299 with ~2,700 chars of headroom its own tasknote records as intentional — then [[CORE-536]]'s gate-relaxation pass consumed 2,567 of it, 95%, in a single task. So the two rows document two different defects, and the sizing principle now rests on a measured unit of change (+2,567 substantial, +97–283 routine) rather than on the round-number guess the numbers were originally picked as. The approved figures held up unchanged against that evidence.

Verification: the §7.1 budget check re-run against the new caps shows all four budgeted surfaces OK (`SPEC.md` 49,285/55,000 · `gates.md` 34,963/40,000 · `ft-release` 39,315/40,000 · largest other body `ft-task` 28,845/30,000); §"Known over budget" stays empty; the Budgets table is structurally intact at 3 columns on every row; all five `[[wikilinks]]` resolve; and the measured ledger still matches `wc -c` on every skill-body row, confirming the edit touched caps only. No mirror to update — the caps are stated in exactly one place, and that property was re-verified rather than assumed.

**Maintainability effect:** removes false pressure on contract prose. Instruction clarity was being traded against a byte figure that was never sized as an operating ceiling. The ratchet still bites — 40,000 and 55,000 are real caps a runaway would hit — but it now bites on genuine regrowth rather than on the first substantial task after a split. The declined cap-history mechanism remains the known gap: a future reader auditing whether raises are becoming habitual must read this doc's git log, since nothing in the doc itself tracks that.

**Archived:** 2026-09-09
