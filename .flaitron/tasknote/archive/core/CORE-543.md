---
title: ci-drift-job-binding
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-492, CORE-535.3, CORE-546, CORE-547, CORE-464, CORE-487]
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

# CORE-543 | ci-drift-job-binding

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Close the gap that let CI stay red through the v5.25.0 cut: bind the `drift` CI job to the §7.1 fragments it hand-copies with a new §7.1 pair, and add a `/ft-release` step that refuses to cut against a red CI on the commit being tagged.

> **Re-scoped 2026-09-09** from *spec-citation-resolution-gate*. The filed mechanism — a `` `SPEC.md` §"…" `` citation-resolution gate — measures 0 genuine dangles and 3 false positives at HEAD, catches 1 of the 3 defects the CORE-535.3 split left (a YAML comment), and was declined by [[CORE-492]] on the same evidence. See Discovery Notes.

## ✅ Acceptance

- [x] **Pair L** exists in `claude/skills/ft-release/step-7.1-mirror-pairs.md` in the established pair idiom, binding the `drift` CI job's check bodies to the §7.1 fragments they are lifted from (`docs/CONVENTIONS.md:58` documents that lift; nothing currently binds it)
- [x] Pair L is **non-vacuous**: green on HEAD, and fails correctly on a mutated copy — specifically, it reproduces the v5.25.0 failure (§7.1 Pair A repaired to `SPEC/layout.md`, CI's twin left at `SPEC.md`)
- [x] Pair L covers the four checks the `drift` job actually lifts (wrapper-name invariant, shipped-skill parity, Pairs A/B/C/E), and does **not** claim coverage of the §7.1-only checks `docs/CONVENTIONS.md:58` deliberately excludes
- [x] `/ft-release` carries a step, before the tag is cut, asserting the `drift` and `validate` jobs are green on the commit being tagged — **scope narrowed, deliberately**: Step 6.1 gates on the commit the release *builds on*, because the release commit does not exist until §7.5. That is the commit that was red at v5.25.0, and Step 6.1 run against `21e1816` returns `failure`, so the cut would have blocked. The release commit's own post-push run is carried into §7.4 flag-don't-block rather than made a wait-loop inside the cut
- [x] That step's posture is explicit and justified — blocking, or flag-don't-block in the §7.1 machine-state idiom — and states what to do when CI has not yet reported
- [x] Pair-roster restatements bumped: `claude/skills/ft-release/SKILL.md:283` (`Pair A–K`) and `docs/CONVENTIONS.md:58` (`Pairs D and F–K`)
- [x] [[CORE-492]]'s declination is left standing, and CORE-543's measurement (0 genuine dangles / 3 false positives, 1-of-3 defect coverage) is recorded where the next auditor will find it — so the citation gate is not re-filed a third time
- [x] No runtime, validator, or schema — the guard is shell prose inside the standing release procedure ([[CORE-349.5]] precedent)
- [x] Repo validation set green (`AGENTS.md` §"Validation", six commands)

## 🧩 Subtasks

- [x] Re-read `step-7.1-mirror-pairs.md` Pair H (the extract-and-diff idiom Pair L extends) and the `drift` job's four lifted steps, and settle the extraction shape — what in the CI `run:` bodies is comparable to the fragment source, given the documented "adapted only to fail the step on a finding" delta
- [x] Write **Pair L** into `step-7.1-mirror-pairs.md` after Pair K, with both the check and the fix-direction prose (fix the CI copy to match §7.1, never the reverse — §7.1 is the superset and the source)
- [x] Verify Pair L on HEAD (green) and on a mutated copy reproducing the v5.25.0 divergence (fails with a readable finding)
- [x] Add the CI-status step to `claude/skills/ft-release/SKILL.md` — decide and record its posture, and its behavior when CI has not reported yet
- [x] Bump the two pair-roster restatements (`ft-release/SKILL.md:283`, `docs/CONVENTIONS.md:58`)
- [x] Record the CORE-543 measurement + the standing CORE-492 declination at the point a future auditor will look
- [x] Decide whether Pair L belongs in the `drift` CI job itself (`docs/CONVENTIONS.md:58` calls promoting a pair to CI "a separate call, not implied by minting it") — record the verdict either way
- [x] Phase 3: run the six-command validation set + every §7.1 check touched
- [x] Phase 4: doc-drift sweep, flip the PLAN line to stub form, archive the tasknote

## 🔗 Related

- [[CORE-492]] — declined the citation-resolution guard this task was filed as, 11 days earlier, on the same evidence; its declination stands (`related-decision:`)
- [[CORE-535.3]] — the lazy split that repaired §7.1's Pair A grep but not the CI twin (`related-decision:`)
- [[CORE-546]] — fixed the CI Pair A target inline; the failure this task builds the detector for (`depends-on:`)
- [[CORE-547]] — fixed the dead `AGENT-NEUTRALITY.md` ledger row inline (`depends-on:`)
- [[CORE-464]] — put the §7.1 drift subset in CI; the hand-copy this task binds (`related-decision:`)
- [[CORE-487]] — set the bar a new standing check must clear (derivable, not a prose paraphrase) and minted Pair K, the idiom Pair L extends (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The defect the ticket names is real and was real — CI was red through the whole v5.25.0 cut — but the mechanism it proposes does not reach it. Measured at HEAD: 62 `SPEC.md` citations, 59 resolve, and all 3 non-resolving are false positives (two of them `## Completed` rows that *quote* the drift they record). Against the three defects the split actually left, the gate catches one, and that one is a YAML comment. [[CORE-492]] declined this guard 11 days ago on the same evidence. The real gap is that the `drift` CI job is a hand-copied subset of the §7.1 fragments with nothing binding the copies — a pair-idiom gap.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  One question put to the operator via AskUserQuestion — the Re-scope verdict itself, with four grounded branches (bind-CI-to-§7.1 + CI-status gate / bind only / de-scope as already-handled / proceed as filed). **Resolved to: bind the `drift` CI job to §7.1 with a new pair, *and* add a release-time CI-status gate.**

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The premise does not survive measurement, and the proposed mechanism misses
the failure that motivated it.**

**1. Zero dangling `SPEC.md` citations at HEAD.** Repo-wide (144 tracked files,
archive and `viz/` excluded), the adjacent-form scan finds **62** citations
targeting `SPEC.md`; **59 resolve**. The 3 that do not are all false positives,
all in `.flowtron/PLAN.md`:

| Site | Cited | Why it is not drift |
| --- | --- | --- |
| `PLAN.md:18` | `SPEC.md` §"…" | **This ticket's own line**, quoting the citation *pattern* with a literal ellipsis |
| `PLAN.md:31` | `SPEC.md` §"Skill namespace" | [[CORE-546]]'s `## Completed` stub, *quoting the drift it fixed* |
| `PLAN.md:32` | `SPEC.md` §"Procedure SOPs (`SPEC/procedures/`)" | [[CORE-547]]'s `## Completed` stub, same |

The last two are a structural false-positive source, not a tuning problem: a repo
that records its own drift history by quoting the broken citation will have that
gate flag its own archaeology, and "fixing" the finding corrupts the record.

Widened to every target (not just `SPEC.md`): **414** adjacent-form citations,
**389 resolve**, 25 do not — and **none of the 25 is genuine**. Twenty are
placeholder-variable paths in skill bodies (`<SPEC_DIR>/model.md`,
`<SKILL_DIR>/unattended-mode.md`); five are relative-path and table artifacts.
This is [[CORE-492]]'s measurement (5 artifacts / 63 citations) reproduced at
6.5× the scale, with the same verdict.

**2. The gate catches 1 of the 3 defects the split actually left — and it is the
cosmetic one.** `dfc3c15` fixed three things, filed as [[CORE-546]] / [[CORE-547]]:

| # | Defect | Shape | Caught by a `SPEC.md §"…"` resolution gate? |
| --- | --- | --- | --- |
| 1 | `ci.yml:73` — `for f in README.md SPEC.md claude/…` | bare filename in a shell loop | **No** — there is no `§` citation to resolve |
| 2 | `ci.yml:35,54` — `SPEC.md §"Skill namespace"` ×2 | adjacent, unbackticked, in a `.yml` | **Yes** |
| 3 | `AGENT-NEUTRALITY.md` ledger row | `` \| `SPEC.md` \| §"Procedure SOPs …" \| `` — split across table cells | **No** — adjacency is broken by the cell boundary |

Verified by running the adjacency grep against each defect verbatim. Defect **#1
is the one that actually failed** — it reddened the `drift` job on every push
since the v5.25.0 cut. Defect #2, the only one the gate reaches, is a YAML
comment and a step label; it broke nothing. Defect #3 needs table-cell handling
the ticket does not propose.

**3. [[CORE-492]] declined this exact guard 11 days ago** (2026-08-29), recording
the reasoning at the point of exclusion in `.flowtron/tasknote/README.md`:
citation rot and claim falsification are two classes, and the guard covers the
one with no instances. CORE-543's evidence does not overturn that — it
reproduces it. `step-7.1-standing-checks.md:192-194` cites the declination as the
[[CORE-487]] bar a new standing check must clear ("a byte count is *derivable*,
not a prose paraphrase, so it cannot cry wolf the way the citation guard
[[CORE-492]] declined would have"). A gate that is 0-for-3 on genuine findings and
3-for-3 on false positives does not clear it.

**4. The real root cause, which the ticket does not name.** At `v5.25.0`:

- `§7.1` Pair A grep → `README.md SPEC/layout.md …` — **repaired** by [[CORE-535.3]]
- `ci.yml` drift-job Pair A grep → `README.md SPEC.md …` — **not repaired**

Same check, two hand-maintained copies, one fixed and one missed. The `drift` CI
job ([[CORE-464]]) is a hand-copied subset of the §7.1 fragments, and **nothing
binds the copies**. Pair H binds the *`validate`* job's `run:` steps to
`AGENTS.md` §"Validation" byte-for-byte; there is no equivalent pair for the
*`drift`* job. That is the missing detector — a pair-idiom gap, not a citation
gap — and it is precisely the drift class §7.1 pairs exist to close.

**5. The detector that existed worked, and was ignored.** CI went red on the
commit CORE-535.3 landed and stayed red through the entire v5.25.0 cut.
[[CORE-464]] put the drift checks in CI so drift is caught "on the commit that
lands it instead of at the next cut" — it fired correctly for two weeks. Nothing
in `/ft-release` reads CI status for the commit being tagged (grepped
`SKILL.md` + both §7.1 fragments: zero `gh run` / workflow-status references),
so a release can be, and was, cut against a red badge.

**Drift check.** The PLAN line's claim "nothing enumerated who cited them" is
false: [[CORE-535.3]] enumerated and repaired cross-references across **39
files** and verified "zero stale `SPEC.md §"…"` citations" — which HEAD
confirms. What it missed was one non-citation grep target and one table-split
ledger row. The line's framing ("a dead ledger row and a broken CI grep") is
accurate about the *symptoms*; its proposed *mechanism* does not reach either.

**Assumptions.** (a) The audit's inline fixes stand — all three defects are
already repaired at HEAD, so nothing here is a live breakage. (b) `viz/` and
`.flowtron/tasknote/archive/` are correctly out of any gate's scope (archived
notes are historical records per SPEC §"Tasknote frontmatter" write-once).

**Verdict: Re-scope.** The filed mechanism is measurably the wrong one; the
failure it was filed for has a different, narrower, and derivable detector.
Surfacing to the operator rather than absorbing the change.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pair L — `drift` CI job ↔ the §7.1 sources it lifts.** Extends Pair H's
extract-and-diff idiom (Pair H binds the *`validate`* job to `AGENTS.md`
§"Validation"; nothing bound the *`drift`* job). Byte identity is unavailable —
`docs/CONVENTIONS.md` §"GitHub Actions CI" says the CI copy is "lifted from
§7.1, adapted only to fail the step on a finding", so it carries extra `bad=`
accumulators and `|| exit 1`. What **is** derivable from both surfaces is the
set of repo paths each check reads, and that is exactly what drifted. A six-row
mapping joins each CI step to its source block across three files
(`SPEC/layout.md`, `step-7.1-standing-checks.md`, this fragment).

Three extraction decisions, each recorded in the pair's prose because each was a
bug first:

1. **Bracket classes, not `\*`, in the passed anchors.** The patterns travel
   through `awk -v` and apply as *dynamic* regexes, where string escapes are
   processed first: `^\*\*Pair B ` arrives as `^**Pair B ` — a malformed
   quantifier that silently matched far past the section and swallowed every
   later fence in the file. Caught because Pair B and Pair E reported paths
   belonging to Pairs G and I. `[*][*]` has no escape to lose.
2. **`echo`-argument text stripped from both sides.** Pair C's CI copy names
   `.flowtron/` only inside a findings message. Stripping quoted `echo`
   arguments compares what a check *reads*, not what it *says*.
3. **Trailing-slash directories captured.** The first path regex required a
   segment after the final `/`, so Pair C's `templates/` extracted **zero**
   paths — the step would have been silently vacuous. All six steps now yield
   ≥1 path, and the pair's prose names that as a property to re-check when a
   step is added.

**Step 6.1 — CI status on the commit being built on.** Blocking, because a red
`main` is repo state a commit in this cut can fix (contrast §7.1's
machine-global wiring half, advisory because no commit can fix `~/.claude/`).
Four outcomes are enumerated rather than just pass/fail: green proceeds;
failure blocks; `in_progress`/`queued` is explicitly *not* a pass; and a missing
`gh`, missing auth, or zero reported runs is also not a pass — the check must
never fail open, the same lesson as §"Glob-free by design" one surface over.
Scoped to the commit the release *builds on*, not the release commit (which does
not exist until §7.5); the post-push run is carried into §7.4 flag-don't-block.

**Roster bumps** by text match, not line number — `ft-release/SKILL.md`
(`Pair A–K` → `A–L`) and `docs/CONVENTIONS.md` (`Pairs D and F–K` → `F–L`).
Line-number citations are the drift class CORE-544 exists to fix; not adding to it.

**Declination re-affirmed, not overturned.** `.flowtron/tasknote/README.md`'s
CORE-492 paragraph gains a `Re-affirmed at CORE-543` note carrying the wider
scan's numbers and the structural false-positive shape, so the citation guard is
not re-filed a third time.

**Budget.** Step 6.1 first took `ft-release/SKILL.md` to 39,653 / 40,000 —
under budget but leaving 347 chars, effectively a wall for the next edit. Ran a
trim pass over the three most discursive passages (opening, blocking bullet,
scope paragraph), keeping every contract element: the command, the four
outcomes, the fix-direction posture, and the scope boundary. Now **39,315 —
685 under**. Still the tightest budgeted surface in the repo; flagged in the recap.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — no duplication: Pair L reuses Pair H's extract-and-diff idiom rather than minting a second shape, and its mapping table is the only place the CI↔§7.1 correspondence is written down. No dead code: all six mapping rows are exercised, and each yields ≥1 path (the vacuity check). No public-surface growth: no flag, skill, template, or schema added — one new pair and one new sub-step inside an existing skill. Complexity is explained at the point it appears: all three extraction subtleties carry prose naming the bug that motivated them. Net −338 chars on the tightest budgeted surface after the trim pass.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface touched (markdown prose in two skill files, one doc, and the tasknote README).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Full validation set plus every check touched, and — the point of the task — a
**non-vacuity proof against the real historical failure** rather than a
synthetic mutation.

| Check | Result |
| --- | --- |
| `npm --prefix viz test` | 530 passed (28 files) ✓ |
| `npm --prefix viz run typecheck` | clean ✓ |
| `npm --prefix viz run lint` | clean ✓ |
| `node --test tools/update-adopters.test.mjs` | 51 pass / 0 fail ✓ |
| `node --check` ×2 | ok ✓ |
| **Pair L**, extracted verbatim from the committed fragment, on HEAD | silent, exit 0 ✓ |
| **Pair L** vs the real `v5.25.0:.github/workflows/ci.yml` | **fires**: `< SPEC.md` / `> SPEC/layout.md` on Pair A ✓ |
| **Pair L** vs an independent mutation (Pair B `codex/` → `cursor/`) | **fires** on Pair B ✓ |
| **Step 6.1** block run verbatim on HEAD | `CI completed success` → proceeds ✓ |
| **Step 6.1** block run against the v5.25.0 tag commit | `CI completed failure` → **would have blocked the cut** ✓ |
| Pair H, both halves (presence + CI-verbatim) | silent ✓ |
| Full CI `drift` job, all 7 steps | green ✓ |
| Pair K1 / K2 | silent ✓ |
| Context budget, `ft-release/SKILL.md` | 39,315 / 40,000 — under ✓ |

Neither new check is vacuous, and neither was proven so by construction: Pair L
was run against the *actual* workflow file from the tag, and Step 6.1 against
the *actual* CI conclusion for the tag commit (`21e1816` → `failure`). The
working tree was restored and `git status` on `.github/workflows/ci.yml`
confirmed clean after the swap.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — 18 entries: 17 × no change, 1 × updated.** Each entry was
grepped for `Pair [A-L]` / `A–K` / `F–K` / `drift job` / `GitHub Actions` /
`CI status` / `citation guard` / `Step 6`. Seven files returned hits; all seven
were read.

- **`docs/CONVENTIONS.md` — updated.** §"GitHub Actions CI" explained that Pair H
  pins the `validate` job and that `drift` deliberately stays out of that
  extraction, which left a reader asking what guards `drift` — and until this
  task the honest answer was "nothing". Added one clause naming **Pair L**, what
  it compares, why byte identity is unavailable, and the `CORE-546` failure that
  minted it. (Its `Pairs D and F–K` → `F–L` roster bump is separate, made in
  Phase 2.)
- **No change ×6 (hits read, all still true):** `README.md` and
  `CONTRIBUTING.md` name GitHub Actions CI only in the CONVENTIONS "adheres to"
  list; `AGENTS.md` and `claude/AGENTS-snippet.md` hits are Pair **F**
  (park-priority flags), untouched; `SECURITY.md` §"GitHub Actions CI" describes
  the two jobs' *threat surface* and permissions, asserting nothing about what
  binds their contents; `docs/VISION.md`'s hit is the labeled-mirror preamble,
  unaffected.
- **No change ×11:** no hits.

`docs/CONTEXT-BUDGET.md` is deliberately outside the sweep set; its budget check
ran in Phase 3 (`ft-release/SKILL.md` 39,315 / 40,000 — under, after a trim).
`SPEC.md` is untouched by this task — the contract did not change, only the
release procedure and its CI mirror.

**No ⚠️ superseded-claim pointer, and no `supersedes:`.** This task does not
falsify [[CORE-492]]; it re-affirms its declination on wider evidence and
implements a different detector. CORE-492's archived note stays exactly as
written.

**Final Summary:**

Built the detector the failure actually wanted, after Discovery established the
filed one would have caught none of it.

**The re-scope, in evidence.** CORE-543 was filed as a `` `SPEC.md` §"…" ``
citation-resolution gate. Measured repo-wide across 144 tracked files and both
citation forms: **62** `SPEC.md` citations, **59 resolve**, and all 3 that do not
are false positives — this ticket's own `PLAN.md` line quoting the pattern with a
literal ellipsis, and the [[CORE-546]] / [[CORE-547]] `## Completed` rows
*quoting the very drift they record*. That last shape is structural, not
tunable: a repo that documents its drift history by quoting the broken citation
makes such a gate flag its own archaeology. Widened to every target: **414**
citations, 389 resolve, and **none of the 25 misses is genuine** (20 are
`<SPEC_DIR>`-style placeholder paths). That is [[CORE-492]]'s 2026-08-29
measurement reproduced at 6.5× scale — and CORE-492 had already declined this
guard, a fact `step-7.1-standing-checks.md` cites as the bar a new check must
clear.

Against the three defects the [[CORE-535.3]] split actually left, tested by
running the adjacency grep on each verbatim: the gate catches **one** — a YAML
comment and a step label. It misses the ledger row whose file and section sit in
different table cells, and it misses `for f in README.md SPEC.md …`, a bare
filename in a shell loop with no citation to resolve. That third one is the one
that mattered: it failed the `drift` job on every push from CORE-535.3 through
the v5.25.0 cut. `gh run list --commit 21e1816` returns **`failure`** for the tag
commit itself.

**Root cause, and the two things shipped.** §7.1's Pair A grep was repaired to
`SPEC/layout.md`; the CI job's hand-copied twin was not. `docs/CONVENTIONS.md`
documents that the CI shell is *"lifted from §7.1"* — and nothing bound the
copies. Pair H binds the `validate` job to `AGENTS.md`; the `drift` job had no
equivalent.

1. **§7.1 Pair L** (+4,900 chars) binds the `drift` job's six lifted checks to
   their §7.1 sources across three files, comparing the **set of repo paths each
   check reads** — derivable from both surfaces, and exactly what drifted. Byte
   identity is unavailable by design (the CI copy adds `bad=` accumulators).
2. **`/ft-release` Step 6.1** (+1,946 net) gates the cut on CI status, blocking,
   with all four outcomes enumerated — including that `in_progress` and a
   missing/unauthenticated `gh` are explicitly *not* passes. A check that fails
   open reports clean instead of reporting the truth.

**Both proven non-vacuous against the real history, not a synthetic mutation.**
Pair L, extracted verbatim from the committed fragment and run against the actual
`v5.25.0:.github/workflows/ci.yml`, fires with `< SPEC.md` / `> SPEC/layout.md`;
it also fires on an independent Pair B mutation. Step 6.1 run against the real
tag commit returns `failure` — the cut would have blocked. Working tree restored
and verified clean after the file swap.

Three extraction bugs were found and fixed during development, each now carrying
prose naming the bug: `\*` in an awk **dynamic** regex silently becomes a
malformed quantifier that swallowed every later fence; `echo`-argument text had
to be stripped so the comparison covers what a check *reads*, not what it *says*;
and the first path regex extracted **zero** paths from Pair C's `templates/`,
which would have shipped one silently vacuous step.

Changed files (5, markdown only): `step-7.1-mirror-pairs.md` (+4,900),
`ft-release/SKILL.md` (+1,946 net — Step 6.1, then a trim pass), `docs/CONVENTIONS.md`
(Pair L named in §"GitHub Actions CI" + roster bump), `.flowtron/tasknote/README.md`
(+1,129 — the declination re-affirmed beside CORE-492's), `.flowtron/PLAN.md`.
Refactors: none; roster bumps were made by text match, not line number, to avoid
adding to the drift class CORE-544 exists to fix.

Verification: full six-command validation set green (530 viz, 51 updater,
typecheck, lint, 2 × `node --check`), Pair H both halves, the full 7-step CI
`drift` job, and Pair K1/K2 all silent.

**One thing to watch.** `ft-release/SKILL.md` is the tightest budgeted surface in
the repo: 39,315 / 40,000 after a deliberate trim pass that recovered 338 chars
while keeping every contract element. 685 chars of headroom. The next edit to
that file should expect to extract a lazy fragment rather than append.

Maintainability effect: a check that had been silently guarding nothing for two
weeks now has a detector, and the release gate can no longer tag over a red
commit. The citation guard is declined for the second time — with the numbers
written next to CORE-492's, so the third auditor to notice stale pointers finds
the weighing instead of re-filing it.

**Archived:** 2026-09-09

