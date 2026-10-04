---
title: post-shrink-fidelity audit
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-558, CORE-558.1, CORE-558.2, CORE-558.3, CORE-558.4, CORE-558.5]
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
---

# CORE-558.N | post-shrink-fidelity audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-558]]

## 🎯 Goal

Verify the completed `CORE-EPIC-558` (`post-shrink-fidelity`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-558.N — audit CORE-EPIC-558` commit lands — `chore:`, since the audit applied no inline fix
- [x] PLAN.md line for `CORE-558.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-558.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-558` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-558.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-558]] — parent epic (post-shrink-fidelity)
- [[CORE-558.1]] — epic Discovery; filed the `.2`–`.5` cohort
- [[CORE-558.2]] — spec-md-fidelity
- [[CORE-558.3]] — gates-unattended-fidelity
- [[CORE-558.4]] — skill-runner-fidelity
- [[CORE-558.5]] — budget-ceilings
- [[CORE-559]] — follow-on; sequenced after this epic (touches the same restored files)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-558.N`; pre-flight passed with a clean tree and all five implementation children (`.1`–`.5`) closed 2026-09-10. Full cohort, no early-audit bypass — Step 2's open-siblings ask never fired.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Best Practices Review:** `N/A` — verification pass over shipped markdown contract; no code surface, no module boundary.

**Cohort inventory** (all five archived at `.flowtron/tasknote/archive/core/`):

- **`.1` post-shrink-fidelity discovery** — filed the epic and four serial implementation children plus the reserved `.N`. Established the method the cohort ran on: treat [[CORE-EPIC-535]]'s shrink as *evidence*, diff each surface against its pre-split SHA, restore only what is still missing against current (post-`--unattended`) truth. Doc-drift 18/18.
- **`.2` spec-md-fidelity** — `SPEC.md` +39/−1 (49,285 → 51,566). Restored three sections the shrink had reduced to bare `Canonical contract: see X.` stubs: §"Cross-repo edit remit", §"Loop tasks", §"What flowtron does NOT provide". No `SPEC/` module edited; all six [[CORE-535.3]] extraction homes pointer-checked intact.
- **`.3` gates-unattended-fidelity** — `SPEC/gates.md` +419 chars (34,963 → 35,382). Restored one scope-limiter: `--fast` suppresses the 👁️ **ask**, not the phase — targeted tests and lint/type-check on changed code still run.
- **`.4` skill-runner-fidelity** — 3 files, +5/−1. Restored a routing imperative at the Step 1.5 model gate in `/ft-task`, `/ft-micro-task`, `/ft-goal-task`: `Satisfied` is the only branch that proceeds without reading `SPEC/model.md`, so route on a verified tier rather than an impression.
- **`.5` budget-ceilings** — `docs/CONTEXT-BUDGET.md`, 2 lines. `SPEC.md` 55,000 → **57,000**; `claude/skills/*/SKILL.md` 30,000 → **33,000**. Declined the ledger refresh `.2` had handed it, citing the doc's own `/ft-release` §7.1 ownership rule.

**Cohort shape.** Each of `.2`/`.3`/`.4` found exactly **one** class of loss, and all three are the same shape — a *bound or qualifier* that survived nowhere while the rule it qualified survived fine. `.4` recorded that convergence; this audit confirms it held across the full cohort and adds nothing to contradict it.

**Drift check.** All paths cited in the cohort's deliverables resolve at HEAD; `.5`'s four cited skill-body sizes (`ft-goal-task` 27,140 · `ft-epic-discovery` 26,986 · `ft-close-epic` 26,935 · `ft-task` 29,355) are exact to the byte.

**No clarifications needed.** Full cohort, clean tree, no scope ambiguity.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey / minimal refactor gate:** `N/A` — verification pass; no inline fix applied, so nothing to survey or refactor. **Tests:** `N/A` — no code changed.

### Finding 1 — `SPEC.md`'s restored omission list is an unguarded mirror site (→ follow-up)

[[CORE-558.2]]'s restore of `SPEC.md` §"What flowtron does NOT provide" re-created a **fourth** point-of-use restatement of `docs/VISION.md` §"What we won't accept", in the always-loaded surface. The mirror-label pattern (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors") is guarded at release time by `/ft-release` §7.1 **Pair K**, and the restored section sits outside both of its rosters:

- **K2** enumerates exactly three sections that must still name `VISION.md` — `docs/EXTERNAL-AGENTS.md` §"Not an Orchestration Runtime", `SPEC/gates.md` `**Runtime stays out.**`, `SPEC/loop.md` §"Runtime vs. contract". `SPEC.md` is not among them.
- Pair K's design note records `docs/PHILOSOPHY.md`, `docs/WORKTREES.md` and `README.md` as **deliberately** excluded, explicitly *"so a later reader does not read their absence as an oversight."* `SPEC.md` is not in that list either — so its absence reads as exactly the oversight that bullet exists to prevent.

The restored section names `SPEC/scope-boundaries.md` as its source, not `VISION.md`, so the chain to canonical is two hops (`SPEC.md` → `scope-boundaries.md` → `VISION.md`) and no gate models it. Nothing is broken today: all five external citations of `§"What flowtron does NOT provide"` (`README.md:290`, `docs/CONVENTIONS.md:137`, `SECURITY.md:164`, `docs/MIGRATION.md:538`, `docs/VISION.md:30`) name `SPEC/scope-boundaries.md` by path and resolve, and the two files' bullet lists are content-identical (5 bullets, same order, both carve-outs labelled singular). But `SPEC.md` now carries a **second heading of the same name**, and a rename or re-scope of the canonical bullet would silently falsify a copy no check reads.

**Why per-task closure could not catch it.** The falsified surface is `claude/skills/ft-release/step-7.1-mirror-pairs.md` — a skill fragment. `claude/skills/*/SKILL.md` and its fragments sit **outside** the doc-drift sweep set by design (`.flowtron/tasknote/README.md`, volume decision), and that README's §"Accepted residual risk" names this exact shape — *"skill bodies state facts about swept docs, so a contract change can falsify one with no sweep reaching it"* — and names **the epic-audit sweep as the catch layer**. This is that layer working as documented, for the second time (CORE-489.N was the first).

**Fix shape (deliberately not applied here):** a one-line roster decision in `step-7.1-mirror-pairs.md` — either add `SPEC.md` §"What flowtron does NOT provide" to K2's `printf` roster, or record it in the deliberate-exclusions bullet with its reason (it labels the *contract*, not the *justification*). Choosing between those is a contract judgment, not a typo fix, so it is filed rather than folded into an audit commit. → `/ft-file-followup`.

### Finding 2 — `.4`'s restore form differs in one of three skills (observation, no filing)

[[CORE-558.4]]'s Final Summary describes its restore as *"one bold-lead paragraph — 'Route on a verified tier, not an impression' — at the decision point in all three model-gate skills."* In `/ft-task` and `/ft-micro-task` it landed in that form, byte-identical to each other. In `/ft-goal-task` it was **inlined** into the existing dense Step 1.5 paragraph (`claude/skills/ft-goal-task/SKILL.md:69`), carrying the same substance — `Satisfied` is the only branch proceeding without the module; route on a verified tier; read §"Category-vs-concrete matching" *before* choosing — but without the bold lead or the verbatim phrase.

The substance is present in all three, and adapting to that section's compressed *"identical to /ft-task"* style is the defensible call. Recorded only because `grep "Route on a verified tier"` returns **2/3**, which a later reader could misread as a lost restore. Archived tasknotes are historical records and are not rewritten (`AGENTS.md` §"Editing Rules"); no follow-up filed.

### Verified clean

- **Budgets at HEAD, all under cap:** `SPEC.md` 51,566/57,000 · `SPEC/gates.md` 35,382/40,000 · `ft-task` 29,355/33,000 (largest glob body) · `ft-release` 30,619/40,000. No stale `55,000` / `30,000` restatement anywhere outside the archive (the two `ft-audit-context` hits are its own unrelated context-file bloat rubric).
- **The `.2`↔`.5` ledger disagreement resolved correctly.** `.2` handed the §"Ledger" numbers on as stale; `.5` declined the refresh and cited the doc's own rule that §7.1 owns them ([[CORE-555]] / [[CORE-556.2]] precedent). The ledger *is* stale at HEAD (`SPEC.md` 49,285 vs 51,566) — by design, and the section says so in its own words: *"if these numbers are stale, the cut that made them stale skipped its own standing check."* The next `/ft-release` refreshes it. §"Known over budget" is empty. **No follow-up needed.**
- **`.3`'s scope-limiter reads consistently with its one skill-local twin.** `SPEC/gates.md`'s restored *"the targeted tests and the lint / type-check on changed code still run"* matches `claude/skills/ft-task/SKILL.md:187`'s *"lint/type-check on changed code still runs"*; `/ft-micro-task` and `/ft-goal-task` carry no local copy and read `gates.md`, as `.3` intended.
- **Three-way omission mirror coherent.** `SPEC.md` (compact, pointer to contract) / `SPEC/scope-boundaries.md` (fuller, + PR archetypes) / `docs/VISION.md` (canonical justification) agree on all five bullets and on both singular carve-outs.
- **Nav-chip split is not a defect.** The cohort reads 3× `🟢 In progress` / 2× `✅ Completed`; repo-wide it is 420/113. `SPEC.md` §"🚀 Phase 4: Closure" (CORE-042.4, SPEC v0.8.0) retired the chip flip on purpose — the chip is render-derived from YAML and archived notes *may* lag. All five children carry `status: completed`. Nothing to fix.
- **Commit types consistent.** All five cohort commits used `docs:`, a type in active use per `docs/CONVENTIONS.md` §"Conventional Commits 1.0".
- **No regressions in earlier-shipped cohort surfaces.** Each child's deliverable is intact at HEAD and none was re-edited by a later sibling.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed

- [x] Ran lint/type-check on changed code — `N/A`, no code changed

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-prose verification only; the audit applied no inline fix, so all three code-facing boxes are `N/A`. **Quality assertions:** `N/A` — no changed code.

Verification actually run:

- `git status --porcelain` — clean at pre-flight (foreign-dirt gate passed).
- `wc -c` over all four budgeted surfaces + all 18 glob skill bodies — 4/4 under the post-`.5` caps.
- `grep` for stale `55,000` / `30,000` cap restatements outside the archive — 0 real hits.
- A cross-file citation/link pass over the six surfaces the cohort touched (306 citations). The raw pass reported 102 apparent dangles; **all** resolved as validator artifacts of the known kinds `.4` documented — unexpanded skill path variables (`<SPEC_DIR>` / `<SKILL_DIR>` / `<MODEL_EDGE>`), line-wrapped `§"…"` citations, and same-file heading-index misses. The four candidates that survived triage were each opened and confirmed real: `SPEC/gate-discipline.md` §"Refused carve-outs" (heading exists, line 110), `SPEC.md`'s `../PLAN.md` (inside a nav-header illustration block), `docs/CONVENTIONS.md` §"Pre-commit hooks" (heading exists, line 109), and `SPEC/epic.md` §"Fan-out." (prefix-cites `## Fan-out (optional)`, the established form, used identically in `SPEC/tasknote-inserts.md:45`). **0 genuine dangling citations.**
- Doc-drift sweep, 18/18 — below.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — 18/18 no change.** The cohort changed six surfaces (`SPEC.md`, `SPEC/gates.md`, three skill bodies, `docs/CONTEXT-BUDGET.md`). Swept against every entry:

`README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (it *is* a cohort deliverable; verified self-consistent, nothing further owed) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (the three skill edits are Claude-surface, already ledgered) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change (stamp `v5.26.0 · 2026-09-09`; no version bump in this cohort) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (its `--fast` / 👁️ prose at line 65 reads consistently with `.3`'s restored scope-limiter) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (three-way omission mirror verified coherent; the roster gap in Finding 1 is in a `/ft-release` fragment, **outside** this sweep set).

Targeted checks behind the verdicts: no swept doc restates the `--fast` bound, the Step 1.5 `Satisfied` branch, or a context cap.

**Final Summary:**

Audited the closed `CORE-EPIC-558` (`post-shrink-fidelity`) cohort and found it coherent, with **one** genuine miss — and the miss is one the workflow's own documentation predicted this exact step would catch.

`.2`'s restore of `SPEC.md` §"What flowtron does NOT provide" re-created a fourth point-of-use mirror of `docs/VISION.md` §"What we won't accept" in the always-loaded surface, and `/ft-release` §7.1 **Pair K** knows nothing about it — `SPEC.md` is absent from both K2's three-section roster and from the bullet recording which surfaces are *deliberately* excluded, the bullet written so that an absence is never misread as an oversight. Nothing is broken at HEAD: all five external citations name `SPEC/scope-boundaries.md` by path and resolve, and the two lists are content-identical. What is missing is the binding, so a future rename of a canonical bullet would falsify a copy no check reads. Filed rather than fixed — choosing between "add to K2" and "record as a deliberate exclusion" is a contract judgment about whether `SPEC.md` labels the contract or the justification, not a typo.

That the catch landed here is the point: the falsified surface is a **skill fragment**, and `claude/skills/**` sits outside the per-task doc-drift sweep by an explicit volume decision. `.flowtron/tasknote/README.md` §"Accepted residual risk" describes this failure mode in as many words and names the epic-audit sweep as its catch layer. This is the second time it has fired (CORE-489.N was the first), which is a working guard rather than a lucky one.

One further observation, recorded but not filed: `.4`'s restore is present in all three model-gate skills, but as a bold-lead paragraph in only two — `/ft-goal-task` took it inlined into its compressed Step 1.5, so `grep "Route on a verified tier"` returns 2/3 and could read as a lost restore. Substance is equivalent and the style adaptation is defensible; archived notes are historical records and were not rewritten.

**Cohort verdict.** `.2`/`.3`/`.4` each found exactly one class of loss and all three were the same shape — a bound or qualifier that survived nowhere while the rule it qualified survived fine. That convergence, recorded by `.4`, holds across the whole cohort under audit. `.5`'s two ceiling raises hold: all four budgeted surfaces are under cap at HEAD (`SPEC.md` 51,566/57,000 · `gates.md` 35,382/40,000 · `ft-task` 29,355/33,000 · `ft-release` 30,619/40,000), its four cited skill sizes are byte-exact, and its declination of the ledger refresh was correct — the ledger is stale by design and self-declares it, with `/ft-release` §7.1 owning the fix. The `.2`↔`.5` disagreement is the only place a sibling overrode another's stated expectation, and the override cited the governing rule.

**Evidence.** 0 files changed by this audit (verification-only; no inline fix warranted). Cohort measured: 4 commits, 6 non-workflow surfaces, +51/−2 lines total across them. Verification: 306 citations checked across the six touched surfaces with 0 genuine dangles after triaging 102 validator artifacts of three known kinds; 4/4 budgeted surfaces under cap; 18/18 doc-drift no change; nav-chip and commit-type variance both confirmed against their governing clauses as non-defects.

**Maintainability effect.** The epic set out to check whether a large shrink cost the repo load-bearing process, and the answer across four independent passes is: barely, and always in the same narrow way. The cumulative lesson worth carrying forward is `.4`'s — cite-don't-restate is sound, and what it costs is the *disambiguator at the decision point*. This audit adds a second-order one: a restore is not free either, because putting prose back into an always-loaded surface can re-create a mirror site that the release-time guards were re-rostered without.

**Parent-flip:** Confirmed at the 📦 gate. `CORE-EPIC-558` flipped to stub form and the full cohort (`.1`–`.5` + `.N`) moved atomically from `## Medium` to the top of `## Completed` in this same commit. `## Medium` retains `CORE-557` and `CORE-559`, so no `(none)` placeholder was needed.

**Archived:** 2026-09-10
