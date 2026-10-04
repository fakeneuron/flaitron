---
title: skill-directory-budget-row
status: completed
tags: [context-budget, ci, ft-release]
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-622, CORE-574.2, CORE-608, CORE-604.2]
touches:
  - docs/CONTEXT-BUDGET.md
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-622.2 | skill-directory-budget-row

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a `claude/skills/ft-release/**` directory-total row to `docs/CONTEXT-BUDGET.md` §"Budgets" and teach the CI `drift` context-budget step and `/ft-release` §7.1 to sum a `**` row, so a skill that fragments its way under the per-file cap is still ratcheted on what it actually loads.

## ⚡ Notes

**Relevance:** Proceed — the gap is as described: `claude/skills/ft-release/**` sums to 117,337 at HEAD, `step-7.1-mirror-pairs.md` alone is 50,099 (over the body's 40,000 cap), and nothing but a ledger prose line measures the directory. Scope matches the PLAN line exactly; no re-scope.
**Best Practices Review:** The check keeps its "measures; the doc decides" split — the new `**` arm reads the row from the table like every other, restating no number. The sum uses the exact `find <dir> -type f -exec cat {} + | wc -c` idiom the §7.1 ledger refresh already uses for the same directory, so one idiom now serves both the ledger and the gate. CI copy and §7.1 copy stay identical modulo `bad=` / `exit 1` (Pair L's contract). No refactor; nothing deferred.
**Drift check:** PLAN line's figures hold (117,337 directory, 50,099 fragment, 40,000 parent cap); `gate-postures.md`'s row still states the file-plus-~1.5-units sizing rule the line cites; the CI step and §7.1 block are the CORE-574.2 script unchanged since. No drift.
**Archive skim:** `grep -l CONTEXT-BUDGET archive/core/*.md` → CORE-574.2 (the CI lift: `$exact` precedence, `bad=` via process substitution, js-yaml verification recipe — all reused here), CORE-608 (the most recent budget-row addition and its sizing prose — the row shape followed), CORE-613 (last ledger refresh; explains the 116,394 vs 117,337 gap as post-cut growth). CORE-604.2 is the origin of the "split that un-budgets what it moves has gamed the number" rule the new row cites.
**Declared scope:** YAML `touches:` above — `docs/CONTEXT-BUDGET.md`, `.github/workflows/ci.yml`, `claude/skills/ft-release/step-7.1-standing-checks.md`.
**Pattern survey:** New `case` arm extends the existing three-arm dispatch (`*'*'*` glob / literal path) rather than a second loop; placed first because `*'*'*` would otherwise swallow it. Row prose follows the CORE-608 / `gate-postures.md` shape: what it is, why budgeted, who set it, sizing rule with the measured unit.
**Implementation:** (1) `docs/CONTEXT-BUDGET.md` — new `claude/skills/ft-release/**` | 125,000 row (117,971 after this task's own §7.1 edit, plus ~1.5 units; unit measured from the last twenty commits touching the directory: a new mirror pair or CI binding runs +4,000 to +5,300), a Precedence sentence stating a `/**` row is additive to per-file rows, and a §Ledger note that the `ft-release` gaming case is now gated while `ft-task`'s directory stays a ledger figure (its fragments are branch-gated). (2) `.github/workflows/ci.yml` + (3) `claude/skills/ft-release/step-7.1-standing-checks.md` — the `*'**')` arm summing the directory, plus a prose paragraph in §7.1 on what a `/**` row means. Verification receipt: §7.1 script extracted and run under `zsh` → 0 and `bash` → 0 (no output); CI `run:` extracted via `viz/node_modules/js-yaml` → parses, `bash` → 0; fixture with the row lowered to 100,000 → both copies print `OVER BUDGET  claude/skills/ft-release/**  117971 > 100000`, CI copy exits 1; Pair L binding script extracted and run → 0, no output; `diff` of the two script bodies → only the `bad=` / `exit 1` deltas. Structural assertions: N/A — shell in a YAML step and a markdown fence, no lint/type surface; the diff between copies is the structural check.
**Docs touched:** `docs/CONTEXT-BUDGET.md` edited in scope (deliberately off the §"AI-referenced docs" list). `docs/CONVENTIONS.md` §"GitHub Actions CI" names "the context-budget check" generically — no change. No other listed entry describes the budget step's row shapes.

## ✅ Recap

Changed 3 files (+26/−3): `docs/CONTEXT-BUDGET.md` (new `claude/skills/ft-release/**` | 125,000 directory-total row + precedence and ledger prose), `.github/workflows/ci.yml` and `claude/skills/ft-release/step-7.1-standing-checks.md` (the `**` summing arm, identical modulo `bad=`/`exit 1`; §7.1 gains one explanatory paragraph). Matches declared `touches:` exactly; no undeclared paths. Verified: both script copies exit 0 at HEAD, fail correctly on a lowered-budget fixture, Pair L binds clean, YAML parses. No refactors. Maintainability: the "fragments its way under the cap" gap §Ledger named is closed for the one skill it applied to, by one `case` arm reusing the ledger's own directory-sum idiom; `ft-task`'s directory is left as a ledger figure on purpose (branch-gated fragments). For `/ft-release`'s next cut: the row is 7,029 under budget, and the ledger's `ft-release` total (116,394) is stale as usual until §7.1 refreshes it.

**Archived:** 2026-09-20
