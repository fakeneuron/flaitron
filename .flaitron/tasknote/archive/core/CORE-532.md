---
title: neutrality-ledger-gates-count
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-527]
touches:
  - docs/AGENT-NEUTRALITY.md
---

# CORE-532 | neutrality-ledger-gates-count

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-527]]

## 🎯 Goal

Reconcile `docs/AGENT-NEUTRALITY.md`'s `--fast` ledger row, whose `SPEC/gates.md` half claims "3 sites" when the file actually names the flag in more sections than that.

## ⚡ Notes

**Relevance:** Proceed — the gap is real and current: verified by direct grep + a heading-boundary script, not by re-reading the PLAN.md claim. `SPEC/gates.md` currently has 14 headings (`##`–`####`) whose body text mentions `--fast`, not the row's claimed 3.
**Best Practices Review:** N/A — one-line ledger-table cell edit in a contract-layer doc, no code/module boundary involved.
**Drift check:** PLAN.md's own guess ("15 sections") also doesn't match — the precise count, using the identical any-heading-mentions-it script verified against [[CORE-527]]'s already-corrected `SPEC.md` half (which independently reproduces that row's stated "7"), is **14**. [[CORE-527]]'s Testing Notes flagged this as "~15" (approximate, with a tilde) and explicitly deferred the fix and the counting-rule decision to a follow-up — this task. No SPEC contract contradicted.
**Archive skim:** [[CORE-527]] (this task's own `related-tasks`) is the direct precedent — it corrected the row's `SPEC.md` half from 6→7 using an any-mention-counts-as-a-site rule (confirmed by rerunning that exact method here) and deferred the `SPEC/gates.md` half as out of its remit. No other archived tasknote touches this ledger row.
**Pattern survey:** Reused [[CORE-527]]'s exact counting method (count headings — any level, `##` through `####` — whose body text contains `--fast`) rather than inventing a second rule for the other half of the same row; keeps the row internally consistent instead of applying a looser count to one half and a stricter one to the other.
**Implementation:** `docs/AGENT-NEUTRALITY.md`'s `SPEC.md` + `SPEC/gates.md` ledger row: replaced "§"Phase 1→2 exit gate", §"`--fast` operator override", §"Conditional skip rule" (3 sites in `SPEC/gates.md`)" with the full 14-section list (Operator-gate cues, Glyph layers and reuse, Emphasized inline ask shape, Accepted gate replies, Destructive-action escalation, Phase 1→2 exit gate, Conditional skip rule, `--fast` operator override, `--unattended` operator posture, What is inherited and what is not, Park conversions, `/ft-close-epic` under the posture, Rationalizations, Red Flags) plus a one-line note naming the counting rule as shared with the `SPEC.md` half and citing this task + [[CORE-527]], so a future reader doesn't need to re-derive why the two halves' figures differ in magnitude but not in method.
**Docs touched:** `docs/AGENT-NEUTRALITY.md` — updated (the fix itself). No other AI-referenced doc asserts this row's figures.

## ✅ Recap

Corrected `docs/AGENT-NEUTRALITY.md`'s `--fast` ledger row: the `SPEC/gates.md` half claimed "3 sites" (naming only §"Phase 1→2 exit gate", §"`--fast` operator override", §"Conditional skip rule"); a heading-boundary grep applying the same any-mention rule [[CORE-527]] used to correct the row's `SPEC.md` half (6→7, independently reproduced here) finds **14** headings in `SPEC/gates.md` whose body names `--fast`. Replaced the stale 3-item list with the full 14-section enumeration and a one-line note stating the shared counting rule, so both halves of the row now use one documented method instead of leaving the reader to guess why they differ. Deferred by [[CORE-527]] as an out-of-remit follow-up; no code path touched, no other doc references the stale figure. Verification: `npm --prefix viz test` and `node --test tools/update-adopters.test.mjs` pass unchanged (no code touched); `.editorconfig` compliance checked on the one changed file (no trailing whitespace, final newline present).

**Archived:** 2026-09-06
