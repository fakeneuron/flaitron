---
title: lazy-module-trim
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-724.2, CORE-683]
blocked-by:
  - CORE-724.2
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
touches:
  - SPEC/tasknote-selection.md
  - SPEC/gate-discipline.md
  - docs/GATE-DISCIPLINE.md
  - SPEC/purpose-blurb.md
  - SPEC/cue-vocabulary.md
  - SPEC/procedures/README.md
  - SPEC/epic.md
  - SPEC/tasknote-inserts.md
  - SPEC/scope-boundaries.md
  - SPEC/model.md
  - SPEC/plan-filing.md
  - SPEC/unattended-candidacy.md
  - SPEC/blocked.md
  - SPEC/plan-parser.md
  - SPEC.md
  - SPEC/gates.md
  - SPEC/gate-postures.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - README.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-724.3 | lazy-module-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Trim the lazy `SPEC/` modules: cut restatement and rationale (tasknote-selection routing prose, gate-discipline and purpose-blurb folds, procedures README trim, Fan-out and in-module scope-boundaries dedupe, model.md vendor facts to PLATFORMS, expired clauses) without losing a unique rule, leave the CORE-683 slot untouched, and repair every citer.

## ✅ Acceptance

- [x] `SPEC/gate-discipline.md` deleted. §"Refused carve-outs" and the new-row section homes live in `docs/GATE-DISCIPLINE.md`, and every live citer is repointed — `! test -e SPEC/gate-discipline.md && ! git grep -q 'SPEC/gate-discipline' -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN*.md' ':!docs/VERSION-HISTORY.md' ':!docs/HARNESS-SURVEY.md' ':!docs/CONTEXT-BUDGET.md'`
- [x] `SPEC/purpose-blurb.md` retired. Its bounds now live in `SPEC/cue-vocabulary.md`, and the citers are repointed — `! test -e SPEC/purpose-blurb.md && ! git grep -q 'purpose-blurb\.md' -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN*.md' ':!docs/VERSION-HISTORY.md' ':!docs/CONTEXT-BUDGET.md'`
- [x] tasknote-selection §"When to use a tasknote (and when not to)" is compressed, with every bold lead and Pair F's four park flags kept, and the file has a CONTEXT-BUDGET row — `wc -c` before/after; Pair F loop prints nothing; `grep -q 'SPEC/tasknote-selection.md' docs/CONTEXT-BUDGET.md`
- [x] Fan-out has one home per concern: epic.md owns the lifecycle and echo, tasknote-inserts owns the shape — `judgment` (diff read; each rule stated once)
- [x] procedures/README.md rationale and archaeology are trimmed; §"Frontmatter schema" and §"Loading convention" are kept — `wc -c`; Pair Q
- [x] model.md vendor facts are cut to PLATFORMS pointers. The sonnet-stays-medium rule, the haiku example, and every cited heading are kept (the Grok 4.6 `xhigh` clause moves too: PLATFORMS states it, and CORE-676 kept it only as out of scope) — `judgment` + `grep -q 'stays .medium. deliberately' SPEC/model.md`
- [x] scope-boundaries ↔ SPEC.md is deduped within the CORE-558.2 / K1 constraints. SPEC.md's restored sections are byte-identical — section diff vs HEAD
- [x] Expired clauses and task-ID archaeology are dropped across the lazy modules. Rules, hardening, grammar examples and bound literals stay — `judgment` (per-file list in Implementation Notes)
- [x] CORE-683 slot untouched: the region between epic.md §"Audit acceptance" and `**Skills.**`, plus the intro "Simpler implementations don't need it — apply judgment." — `tr '\n' ' ' < SPEC/epic.md | grep -q "Simpler implementations don't need it — apply judgment."` (the sentence wraps) + diff hunks at :29/:68 only
- [x] CI drift job green (Pair Q, context budget, all 15 steps); release pairs F and K1/K2 print nothing — `node <scratchpad>/drift.cjs` + the F/K snippets

## 🧩 Subtasks

- [x] tasknote-selection: replace §"When to use…" with the compressed draft (keep every lead, the Pair F flags, and the micro skeleton cited by ft-micro-task); add a Budgets row and a Cap history row; drop the entry from "Not budgeted"
- [x] gate-discipline fold: move the scope, standing-rule homes and §"Refused carve-outs" into docs/GATE-DISCIPLINE.md; delete SPEC/gate-discipline.md; repoint gates.md §"Gate discipline", gate-postures §"Park conversions", SPEC.md module list, README (×2), AGENT-NEUTRALITY:40
- [x] purpose-blurb retire: add cue-vocabulary §"🎯 Purpose blurb" (bounds only); delete SPEC/purpose-blurb.md; repoint SPEC.md §"🎯 Purpose blurb", the SOP, ft-task/ft-micro-task SKILL, cue-vocab:71, README module roster, AGENT-NEUTRALITY:40
- [x] procedures/README: trim §"Why this layer exists" to its contrast, the "Why two fields" and derivation archaeology, and the task-IDs; keep §"Frontmatter schema" (incl. flag-don't-bump) and §"Loading convention"
- [x] Fan-out: tasknote-inserts keeps the shape and the default; epic.md keeps the lifecycle, echo and warn-not-lock; each cites the other instead of restating
- [x] scope-boundaries: in-module dedupe only (carve-out cross-references, v0.1.0 archaeology); SPEC.md's restored sections untouched
- [x] model.md: cut the vendor effort ladders, the roster generations, "Current Grok 4.x usage (2026-05)", the Opus/Grok cross-provider bullet and "Unchanged from the original gate"; point to PLATFORMS. Keep the sonnet rule, haiku, and every cited H2 (Grok 4.6 clause moves — PLATFORMS has it). Drop the "Moved to" calibration stub only if it has no citer
- [x] expired sweep: cue-vocabulary, plan-filing, unattended-candidacy, blocked, plan-parser, epic.md "Historical:", tasknote-selection CORE-573/042.5; leave the CORE-683 slot alone
- [x] Repair citers; recount AGENT-NEUTRALITY; CONTEXT-BUDGET budget/history rows (Ledger left for /ft-release)
- [x] Phase 3: drift.cjs, Pair F/K1/K2, the CORE-558.2 section diff, git diff --check, /code-review medium

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic
- [[CORE-724.2]] — predecessor (`blocked-by:`); cold-start trim, same restatement-cut pattern
- [[CORE-683]] — restore window on `SPEC/epic.md`; slot left untouched
- [[CORE-660]] — kept a `SPEC/` home for gate-discipline; re-decided here by the epic row

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The row's intent holds, with two changes Discovery surfaced. (1) `purpose-blurb.md` is **retired** (bounds folded into `cue-vocabulary.md`) rather than demoted in place, per the operator's "retire some as needed / combination" answer. `procedures/README.md` stays and is trimmed, because it is a cited layer index. (2) The "scope-boundaries ↔ SPEC.md" dedupe narrows to in-module duplication: SPEC.md's copies are the CORE-558.2-restored class (CORE-574.5 declined recompacting them), and the module is their canonical with Pair K1 bound to it. Reopening either rides .7, never a direct cut. "Drop expired clauses" widens to all lazy modules (operator answer).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A: markdown contract edits; module boundaries move (two SPEC modules retire into a doc and a sibling module) but no code; — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Measured (HEAD `62c82de8`).** tasknote-selection 15,217 (§"When to use" ≈10.1k) · gate-discipline 4,686 · purpose-blurb 4,027 · procedures/README 5,970 · epic 5,959 · tasknote-inserts 4,615 · scope-boundaries 5,472 · model 14,765 · cue-vocabulary 15,213 · plan-filing 19,237 · unattended-candidacy 12,304 · blocked 14,655 · plan-parser 9,364. Local CI drift runner (`<scratchpad>/drift.cjs`, every `drift` step run under `bash -e`) is 15/15 green at baseline.

**Bindings (probe over `step-7.1-*.md` + ci.yml).** Pair F: `--low --med --fut --high` must stay in tasknote-selection. Pair K1: `## What flaitron does NOT provide` heading + `PR-rejection mirror of "<title>" (in docs/VISION.md|above)` shape in scope-boundaries. K2: loop.md `VISION.md` within 12 lines (untouched). Pairs N/O/R and standing checks bind unattended-candidacy and plan-filing literals (label shape, §"Filing commits", stub form, "so visualizers have a row title", the **60** bound); the cuts avoid them. Pair Q: every `§"…"` must resolve. `ft-micro-task/SKILL.md:108` cites the selection module for the `## ⚡ Notes` skeleton, and `starter-mode.md:160` cites §"File a starter", so both stay. viz cites model.md §"Tier ladder vs. the next-move suggestion glyph" and §"Category-vs-concrete matching" in code comments, so headings stay. No CI or code reads the retiring files.

**Archive skim** (`archive/core/`, confirmed against the README table; two probes plus direct reads of CORE-680, CORE-724.1, CORE-724.2).
- [[CORE-680]]: the CORE-683 slot is the region between epic.md §"Audit acceptance" and `**Skills.**`. The restore bar also cites the intro sentence "Simpler implementations don't need it — apply judgment.", so both stay byte-identical.
- [[CORE-660]] kept a `SPEC/` home for gate-discipline (AGENT-NEUTRALITY count, the gate-postures deep link, header-only tables as a copyable shape). The epic row filed under CORE-724.1 re-decides that. The header-only tables and the "recognizing your own draft sentence" mechanism travel to the doc intact; dropping the new-row trigger itself is .7's.
- [[CORE-504]] / [[CORE-535.3]] / [[CORE-565.2]]: the purpose blurb's load-bearing content is the bounds (cold-ID test, not-a-cue / no-third-gate, flags don't suppress, 🎯 documented reuse). There is no operator decline on module status.
- [[CORE-558.2]] / [[CORE-574.5]]: SPEC.md §"Cross-repo edit remit" and §"What flaitron does NOT provide" are restored compactions and stay byte-identical.
- [[CORE-558.4]] / [[CORE-688]]: "sonnet … stays `medium` deliberately" is anti-misread text. [[CORE-676]] left the Grok 4.6 `xhigh` clause in model.md as out of its scope, not as hardening; PLATFORMS already states it, so it moves (Phase 2). [[CORE-604.3]]: haiku stays as the `light` example. [[CORE-566]] left "Current Grok 4.x usage" and the Opus/Grok bullet for a later pass, and this is that pass.
- [[CORE-510]] / [[CORE-519]]: AGENTS.md and the paste-block cite §"When to use…" as the routing home, so the heading and every lead stay.

**Expired-clause sweep** (probe across 11 lazy modules). Taken: cue-vocabulary task-ID provenance ×7; plan-filing CORE-655/657/668 history ¶, the CORE-604.4 aside, the 2026-09-13/CORE-591 aside, and the paragraph-form migration note; unattended-candidacy `CORE-065` / `CORE-494` asides and the fork-transition note; blocked CORE-660 worked-case aside plus two "predates/always had" clauses; plan-parser `(FE-063.2)` and "Pre-FE-044". Left: unattended-candidacy Owner column (shape change), superseded-claims worked examples (they illustrate the rule), plan-parser adopter-tolerance note, and layout / loop / task-line-segments / starter / versioning (nothing expired).

**Drift check.** Cited paths in the row all resolve at HEAD. One drift: the row says "demote purpose-blurb.md", and the plan retires it (operator answer). Recorded as Re-scope above, with no SPEC contract contradicted. The model.md §"Platform×model×effort calibration table" stub has 0 live citers, so it retires on the CORE-724.2 stub precedent.

**Clarifications** (AskUserQuestion). Expired scope → all lazy modules. Routing cut → keep leads, compress bullets. Purpose-blurb → operator asked "is there a strong reason to avoid retiring some … a combination as appropriate?" Answer: no operator decline binds module status, so retire gate-discipline + purpose-blurb and keep/trim procedures/README (cited layer index).

**Assumptions.** (1) `docs/CONTEXT-BUDGET.md` §Ledger stays the release's job (CORE-724.2 precedent); only Budgets and Cap history change. (2) docs/VERSION-HISTORY and docs/HARNESS-SURVEY mentions are dated records and are left as written. (3) The tasknote-selection budget = trimmed size + ~1.5 working units, rounded to 500 (sibling convention).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown contract edits; the CI drift job is the standing check

**Implementation Notes:**

Pattern: the CORE-724.2 restatement cut plus the CORE-660 / CORE-604.2 fold-into-a-budgeted-or-reference-home shape. Every cited heading and bold lead was kept; the two retired files' citers were all repointed.

- **tasknote-selection 15,217 → 10,706** (10,216 before the review restored the park-flag mapping and the debug/`--fast` clause). §"When to use…" went from ≈10.1k to ≈5.1k. Each bold lead keeps its trigger bullets; mechanics now point to the skill or fragment that owns them (park cadence → `park-mode.md`, debug cadence → `step-4-debug-mode.md`). Kept: the micro `## ⚡ Notes` skeleton sentence (cited by `ft-micro-task/SKILL.md:108`), the four park flags (Pair F), the debug opt-in rule (its CORE-042.5 ID dropped), and the spec paragraph minus the CORE-573 retirement note. New Budgets row 12,500 (size + ~1.5 sibling units, rounded), a Cap history row, removed from the "Not budgeted" list, and the Ledger's "neither is close to earning a budget row" clause corrected.
- **gate-discipline fold.** `docs/GATE-DISCIPLINE.md` now opens with the module's mechanism, scope and new-row rule (new rows append to the existing tables) and ends with §"Refused carve-outs" in full; the window archaeology is one sentence. `SPEC/gate-discipline.md` deleted. Repointed: gates.md header (three → two sibling modules) and §"Gate discipline" (the standing rule names the doc as the only home), gate-postures §"Park conversions", SPEC.md module list (four → three modules), README (docs entry and SPEC roster), CONTEXT-BUDGET ledger prose. The doc's two self-citing rows now say §"Refused carve-outs" below.
- **purpose-blurb fold.** New `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb" carries the emission point, shape, single source, which invocations plus the cold-ID test, the not-a-cue / no-third-gate bound, and the flags clause; the why-narrative and CORE-504 example were dropped. Repointed: cue-vocab §"Glyph layers and reuse", SPEC.md §"🎯 Purpose blurb", the SOP, both runner SKILLs, the README roster.
- **cue-vocabulary**, net 15,213 → 16,564 (+2.0k blurb, −0.7k): 7 task-ID provenance clauses cut, plus the duplicate "canonical set" paragraph.
- **procedures/README 5,970 → 5,119.** §"Why this layer exists" compressed (the DOGFOOD contrast is one clause). Dropped the "Why two fields" measurement history, the CORE-361/356/390/395 archaeology and the CORE-270 derivation paragraph. §"Frontmatter schema", the flag-don't-bump rule and tiers, and §"Loading convention" are kept.
- **Fan-out.** epic.md 5,959 → 5,738 points to tasknote-inserts for shape, placement and default, and keeps echo and warn-never-lock. tasknote-inserts 4,615 → 4,031 points to epic.md for those. epic.md "Historical:" sentence compressed to the live tolerance. The CORE-683 slot and intro sentence are untouched.
- **scope-boundaries 5,472 → 5,337.** In-module only: the three cross-referencing "singular exception" clauses became one sentence, and the "v0.1.0 cut" archaeology was replaced. SPEC.md's restored sections are byte-identical; K1 is clean.
- **model.md 14,765 → 13,008.** Vendor effort ladders, the roster generations (Fable/mythos, Sonnet 5, OpenAI line), "Current Grok 4.x usage (2026-05)", the Opus/Grok cross-provider bullet, "Unchanged from the original gate", the duplicate valid-tokens sentence, and the uncited "Moved to" calibration stub H2 (CORE-724.2 stub precedent) were cut. The Grok 4.6 `xhigh` arrival sentence went too: CORE-676 only left it out of scope, and PLATFORMS already states it. Kept: sonnet-stays-medium (anti-misread), haiku, and the four live H2s viz cites. The Opus/Grok observations and the Sonnet 5 note now sit in a dated **Observed usage** paragraph under the PLATFORMS calibration table (outside Pair I's window).
- **Expired sweep.** plan-filing 19,237 → 18,525: the 2026-09-13/CORE-591 aside, the paragraph-form migration note, the CORE-604.4 aside, and the CORE-655..668 history paragraph (replaced by its one live rule: an emptied section gets `(none)` back in the same edit). unattended-candidacy: CORE-065 / CORE-494 asides. blocked: CORE-660 worked case, "predates the posture", "always had". plan-parser: FE-063.2, "Pre-FE-044". Left on purpose: the candidacy Owner column, superseded-claims examples, the adopter-fork note (a standing rule, not a transition).
- **AGENT-NEUTRALITY:40.** purpose-blurb's 1 site is now cue-vocabulary §"🎯 Purpose blurb" (3 → 4). gate-discipline's 1 site moved out of `SPEC/` to docs.
- **Net.** The 14 touched `SPEC/` modules went 145,798 → 129,247 (−16,551) across two files retired. SPEC.md 42,901 → 42,777.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — CI drift job locally (15/15), plus the release-only F/K1/K2 snippets

- [x] Ran lint/type-check on changed code — `git diff --check` (markdown only; no code)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no rendered surface — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
A1 ! test -e SPEC/gate-discipline.md && ! git grep -q 'SPEC/gate-discipline' -- <excludes>   → 0 (first run 1: gates.md:3 header; fixed)
A2 ! test -e SPEC/purpose-blurb.md && ! git grep -q 'purpose-blurb\.md' -- <excludes>        → 0
A3 wc -c SPEC/tasknote-selection.md → 15,217 → 10,706 (≤ 12,500 cap); Pair F loop → no output; grep -q budget row → 0
A6 grep -q 'stays `medium` deliberately' SPEC/model.md                                         → 0
A9 tr '\n' ' ' < SPEC/epic.md | grep -q "Simpler implementations … apply judgment."            → 0; epic.md hunks @29, @68 only
A7 SPEC.md §Cross-repo edit remit / §Loop tasks / §What flaitron does NOT provide vs HEAD       → identical ×3
A10 node <scratchpad>/drift.cjs (all 15 drift steps incl. Context budget, Pair Q)              → 0 (15 OK / 0 FAIL)
    Pair K1, K2 snippets (step-7.1-mirror-pairs.md)                                            → no output
git diff --check; git diff --cached --check                                                    → 0
```

**External review** (`/code-review medium`, working-tree diff only, 10 findings). Graded against Acceptance:
- **blocker** · `step-1.5-model-edge.md:30` still said "`SPEC/model.md` keeps only a stub" after the stub was retired → "keeps no copy".
- **blocker** · tasknote-selection park block lost the flag→section mapping, the `--medium` / `--future` aliases, the no-flag "ask, never auto-file" rule, and "park mode wins" (contract-only agents route from SPEC) → restored in four lines.
- **blocker** · procedures/README lost the ownership rule (neutral SOP is the long-term source of truth; the Claude skill stays canonical wiring until a generator reconciles them) → restored.
- **blocker** · GATE-DISCIPLINE lost the pre-window/new-row separation the empty SPEC tables gave → added §"Rationalizations since the window" (header-only table) and §"Red Flags since the window"; the intro and the gates.md standing rule now name those homes; "Reference, not a loaded contract" → "Not loaded at task time".
- **blocker** · tasknote-selection debug block lost "standard template; composes with `--fast`; repro re-verify still runs" → restored in one clause.
- note · Acceptance/Discovery said the Grok 4.6 clause stays, but Phase 2 moved it deliberately → Acceptance and Discovery wording aligned with the recorded decision.
- note · `docs/AGENT-NEUTRALITY.md:52` named `mythos` and "model.md keeping a stub" → both claims corrected.
- note · `claude/CAPABILITIES.md:29` cited model.md §"Effort axis" for the vendor ladder → now cites the PLATFORMS table for ladders and model.md for the axis.
- note · gates.md "the only home … alongside the /ft-audit copy" was self-contradictory → "and in the consolidated `/ft-audit` skill's own copy — update both".
- note · cue-vocabulary is now the blurb's contract home but unbudgeted → no change: `purpose-blurb.md` was itself unbudgeted, the runners carry the emission recipe, and the section is consulted only when questioning bounds, so the ledger's "reference — loaded when composing or interpreting a cue" still holds.

**Re-run after review fixes (Phase 3 from the top):** A1 → 0; A2 → 0; Pair F → no output; K1/K2 → no output; sonnet grep → 0; CORE-683 sentence → 0, epic.md hunks @29/@68 only; CORE-558.2 sections identical ×3; `git diff --check` (both) → 0; ownership-rule grep → 0; `drift.cjs` → 15 OK / 0 FAIL.

Structural assertions: no new public surface. Two lazy files were retired with every live citer repointed (Pair Q green). The only new headings are cue-vocabulary §"🎯 Purpose blurb" and the two GATE-DISCIPLINE "since the window" homes. Every pointer added in place of a restatement names a heading that Pair Q confirms.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README: SPEC roster drops the two retired modules, docs entry for GATE-DISCIPLINE rewritten. SPEC: three-modules count, purpose-blurb pointer, gate-discipline list entry removed. AGENT-NEUTRALITY: :40 recount, :52 mythos/stub claims. PLATFORMS: Observed-usage paragraph added. CAPABILITIES: :29 effort citation retargeted (last-verified stamp left to the release). AGENTS, MIGRATION, the four snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES (cites epic.md §"Fan-out", still resolves), VISION: no change. Not on the list: CONTEXT-BUDGET (budget + history rows, two ledger-prose corrections; numbers left to `/ft-release`), GATE-DISCIPLINE (fold target). — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A; "a restatement cut can take a unique rule with it" is already the CORE-EPIC-558 / CORE-724.2 lesson, and the review caught it again as designed — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Trimmed 14 lazy `SPEC/` modules from 145,798 to 129,247 chars (−16,551, −11.4%) and retired two. `SPEC/gate-discipline.md` folded into `docs/GATE-DISCIPLINE.md`, with new-row homes kept separate from the pre-window record. `SPEC/purpose-blurb.md`'s bounds now live in `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb". tasknote-selection's routing prose is compressed and gets its first budget row (12,500).

- **Files:** tasknote-selection 15,217 → 10,706; model 14,765 → 13,008; plan-filing 19,237 → 18,525; procedures/README 5,970 → 5,119; tasknote-inserts 4,615 → 4,031; epic 5,959 → 5,738; scope-boundaries 5,472 → 5,337; blocked, unattended-candidacy and plan-parser trimmed slightly; cue-vocabulary 15,213 → 16,564 (blurb in, provenance out). Citers repaired across SPEC.md, gates.md, gate-postures.md, the SOP, ft-task and ft-micro-task SKILLs, step-1.5-model-edge, README, AGENT-NEUTRALITY, CAPABILITIES and CONTEXT-BUDGET. PLATFORMS gained the dated vendor observations.
- **Verification:** see Testing Notes. CI drift job 15/15 locally including Pair Q and the context budget; release pairs F/K1/K2 clean; CORE-558.2 sections byte-identical; CORE-683 slot untouched.
- **Review:** 5 blockers (cuts that took unique rules or left a false claim) and 5 notes. Nine were fixed, one was recorded with no change needed, and Phase 3 was re-run.
- **Deferred:** the no-provenance triggers (gate-discipline new-row rule, ~15/30-min heuristics) and any reopened decline (SPEC.md's restored scope sections) go to [[CORE-724.7]]. Skill-body restatement goes to [[CORE-724.4]]. The CONTEXT-BUDGET Ledger is left for `/ft-release`.
- **`touches:` reconciliation:** declared 23, all changed. Undeclared: `.flaitron/PLAN.md` (the Re-scope rewrite and closure flip), this tasknote, and three citer/home repairs: `docs/PLATFORMS.md` (where model.md's vendor observations moved), `claude/CAPABILITIES.md`, and `claude/skills/ft-task/step-1.5-model-edge.md` (both from the review).
- **Maintainability:** an epic task's cold start reads `epic.md` −221 chars; every filing or runner skill that consults tasknote-selection reads −4.5k; two modules fewer to keep in sync; each Fan-out rule and each model vendor fact now has one home.

**Archived:** 2026-10-07
