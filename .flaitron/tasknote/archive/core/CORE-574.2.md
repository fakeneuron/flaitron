---
title: ci-context-budget-check
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-574, CORE-574.3, CORE-543, CORE-577.2]
touches:
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONTEXT-BUDGET.md
  - docs/CONVENTIONS.md
---

# CORE-574.2 | ci-context-budget-check

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a `drift` CI step that mechanically checks every surface in `docs/CONTEXT-BUDGET.md` §"Budgets" against that table's caps, bound to its §7.1 source via a new Pair L mapping row.

## ⚡ Notes

**Relevance:** Proceed — PLAN line, epic goal, and current repo state (docs/CONTEXT-BUDGET.md §"How this is enforced" still reads "No script, hook, or CI job runs this") all agree; no re-scope needed.
**Best Practices Review:** Extends the established §7.1-check → `drift`-step → Pair L-mapping-row triad (CORE-543/CORE-577.2 precedent) rather than inventing a new shape. Mechanized the previously-manual "read the doc and eyeball-compare" half of the standing context-budget check into one derivable script, reused verbatim (plus a `bad=`/`exit 1` wrapper) as the CI copy — no duplicated logic, no restated budget numbers (parsed from the table at run time). Left the §"Known over budget" exemption and the §"Ledger" refresh as release-only, since both need `.flowtron/PLAN.md` ownership judgment or a release-cut trigger that a per-push CI job doesn't have; recorded that boundary explicitly in both docs so it doesn't read as an oversight.
**Drift check:** No drift — `docs/CONTEXT-BUDGET.md` §"Budgets" (4 rows), §"How this is enforced" (still said no CI job runs this), and `step-7.1-standing-checks.md`'s "Standing context-budget check" section all matched the PLAN line's description at read time.
**Archive skim:** `CORE-543` minted §7.1 Pair L (the CI-drift-job ↔ §7.1-source path-set binding) and its fix-direction/escape-hatch notes; `CORE-577.2` is the most recent precedent for adding an eighth (then seventh) lifted check — same triad, same "vacuous is fine as long as it still yields ≥1 path" property. `CORE-539` deliberately kept the old `wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md` budget-comparison command "unchanged" within its own scope while widening the *ledger-refresh* commands — this task supersedes that command (mechanizing the compare, not just the measurement) rather than contradicting CORE-539, which never claimed permanence for it.
**Declared scope:** see YAML `touches:` above.
**Pattern survey:** New CI step follows the existing `drift`-job idiom exactly (`bad=` accumulator fed by `done < <(...)` process substitution, never a piped `while`, per the ci.yml header comment and Pair N's own note on the same footgun). Precedence handling (`$exact` excluding non-glob rows from the glob's expansion) is new logic but mirrors the doc's own stated precedence rule rather than inventing a different one.
**Implementation:** Added a `Context budget (docs/CONTEXT-BUDGET.md §"Budgets")` step to the `drift` job in `.github/workflows/ci.yml`: parses the Budgets table's surface/budget pairs straight from `docs/CONTEXT-BUDGET.md` (`awk` range + `grep`/`sed`), `wc -c`s each surface (expanding globs, excluding paths that have their own more-specific row), and fails the step on any `OVER BUDGET` finding. Replaced the old raw `wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md | sort -rn` one-liner in `step-7.1-standing-checks.md`'s "Standing context-budget check" with the identical script (minus the `bad=`/`exit 1` wrapper), so the release-time check and the CI copy are the same script by construction; added a "Lifted into the CI `drift` job" paragraph there naming the CI/release split. Added the `Context budget` mapping row to §7.1 Pair L in `step-7.1-mirror-pairs.md` and bumped its "seven" → "eight lifted checks" count. Rewrote `docs/CONTEXT-BUDGET.md` §"How this is enforced" to describe the two-layer (CI + release) enforcement and dropped the now-false "No script, hook, or CI job runs this" sentence. Added the context-budget check to `docs/CONVENTIONS.md` §"GitHub Actions CI"'s roster of lifted checks. Verified: the new script runs clean (exit 0) at HEAD both standalone and as extracted from `ci.yml`'s YAML; a synthetic fixture confirmed the most-specific-row-wins precedence (a decoy `ft-release/SKILL.md` at 35,001 chars is exempted from the 33,000 glob cap by its own 40,000 row, while a sibling skill at the same size correctly fails); Pair L's actual binding script (extracted from `step-7.1-mirror-pairs.md`) runs clean against the new row.
**Docs touched:** `docs/CONTEXT-BUDGET.md` and `docs/CONVENTIONS.md` are both updated as part of this task's own scope (not a drift-sweep finding). Neither is on `.flowtron/tasknote/README.md` §"AI-referenced docs" (`docs/CONTEXT-BUDGET.md` is explicitly excluded per its own closing section; `docs/CONVENTIONS.md` is not a listed entry either) — no other entry on that list references the context-budget check or the `drift` job's step roster, so no further doc-drift update is needed.

## ✅ Recap

Added a mechanical `Context budget` step to the CI `drift` job that parses `docs/CONTEXT-BUDGET.md` §"Budgets" directly (no restated numbers) and `wc -c`s every surface against its row, respecting most-specific-row-wins precedence, failing the step on any overrun. The release-time "Standing context-budget check" in `claude/skills/ft-release/step-7.1-standing-checks.md` now runs the identical script by hand (the CI copy adds only a `bad=`/`exit 1` wrapper), with the §"Known over budget" ownership judgment and the §"Ledger" refresh staying release-only since both need context CI doesn't have. Added the new step's mapping row to §7.1 **Pair L** in `step-7.1-mirror-pairs.md` (bumping its count from seven to eight lifted checks) and updated `docs/CONTEXT-BUDGET.md` §"How this is enforced" plus `docs/CONVENTIONS.md` §"GitHub Actions CI" to describe the new two-layer enforcement, retiring the now-false "No script, hook, or CI job runs this" claim.

Changed (5 files, all docs/workflow, no code): `.github/workflows/ci.yml`, `claude/skills/ft-release/step-7.1-standing-checks.md`, `claude/skills/ft-release/step-7.1-mirror-pairs.md`, `docs/CONTEXT-BUDGET.md`, `docs/CONVENTIONS.md` — matches declared `touches:` exactly, no undeclared paths.

Verification: script runs clean at HEAD (standalone and as extracted from the YAML); Pair L's own binding script (extracted verbatim from its mapping table) confirms the CI copy and its §7.1 source agree on paths; a synthetic fixture confirmed precedence (specific row exempts a surface from the glob row's cap). YAML re-parsed successfully after the edit (`js-yaml`, via `viz/node_modules`). An `/ft-audit` pass has nothing further to check here — CORE-574.3 (the sibling Pair J/M lift) is untouched by this task and should still find `Context budget` as a normal-shaped step when it lands its own rows.

**Archived:** 2026-09-11
