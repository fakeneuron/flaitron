---
title: early-purpose-blurb
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-504]
---

# CORE-526 | early-purpose-blurb

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-504]]

## 🎯 Goal

Move the operator-facing purpose blurb earlier — emit it at Step 1, right
after the PLAN.md task line is captured — so a run that stops at the model
gate or a pre-flight check has still oriented the operator.

## ✅ Acceptance

- [x] `SPEC.md`'s contract section is renamed `### 🎯 Purpose blurb` and its body states the blurb fires immediately after the `PLAN.md` line is captured — before the model gate, the pre-flight checks and any scaffold write — sourced from the shortname + long description alone
- [x] All three ID-invoked runners emit it from **Step 1**: `/ft-task` (Step 3d retired, 3a/3b/3c routing lines cleaned), `/ft-goal-task` (Step 3d retired), `/ft-micro-task` (lifted out of Step 2)
- [x] `SPEC/procedures/ft-task.md` carries the same obligation in §1 rather than §3, so contract-only agents (Codex / Cursor / Grok) get the same ordering
- [x] Path-specific tails stay at their own paths as plain prose, not as a second 🎯 emission: the 3c resume path names the `park-reason:` it clears; `/ft-goal-task` names the loop shape where its data exists
- [x] Every citation of the old heading resolves against the new one — `SPEC/gates.md` (×2), `SPEC/procedures/ft-task.md`, the three `SKILL.md` files, `docs/AGENT-NEUTRALITY.md` — and no `Scaffold-time purpose blurb` string survives outside the archive
- [x] The bounds are unchanged: still not a cue, not a gate, no cue-table row, two-banner cap untouched, and neither `--fast` nor `--unattended` suppresses it
- [x] [[CORE-504]]'s falsified placement claim carries a `⚠️ Superseded by` pointer

## 🧩 Subtasks

- [x] `SPEC.md` — rename the heading to `### 🎯 Purpose blurb`; rewrite the motivation + firing point (Step 1, pre-gate/pre-scaffold), drop the "🎯 Goal just written" source clause, and relocate the resume-path sentence to describe prose at the resume path rather than blurb content
- [x] `SPEC.md` — decided: **keep** the section where it is. Its old justification ("sits at the point in the document where it fires") is dropped rather than answered by a move — `SPEC.md` has no step-ordering to sit before, and runner ordering is a skill/SOP concern
- [x] `SPEC/gates.md` — update the 🎯 row label and the following paragraph's two `§"…"` citations
- [x] `claude/skills/ft-task/SKILL.md` — insert the blurb emission into Step 1 after capture; delete Step 3d; strip the "then emit the **Step 3d purpose blurb**" clause from 3a / 3b / 3c; add the park-reason prose line to 3c
- [x] `claude/skills/ft-goal-task/SKILL.md` — same move; delete its Step 3d; keep the loop flavor where its data exists
- [x] `claude/skills/ft-micro-task/SKILL.md` — lift the blurb out of Step 2 into Step 1 after capture
- [x] `SPEC/procedures/ft-task.md` — move the "Purpose blurb" paragraph from §3 to §1
- [x] `docs/AGENT-NEUTRALITY.md:40` — update the heading name in the `--fast` ledger row (count stays 6)
- [x] Verify: `grep -rn "Scaffold-time purpose blurb"` returns only archived tasknotes; every new `§"🎯 Purpose blurb"` citation resolves

## 🔗 Related

- [[CORE-504]] — predecessor; introduced the 🎯 scaffold-time purpose blurb at Step 3d

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and reproduced by this very run — the model
  gate, foreign-dirt gate, archive-collision check and in-flight-tasknote
  check all sit between the PLAN.md read and Step 3d, and every one of them
  can terminate the run. An operator whose run stops at any of them has seen
  nothing but tool calls. Moving the emission earlier costs nothing: the
  blurb's substance was always derived from the PLAN.md line, which Step 1
  already holds.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

`SPEC.md` §"🎯 Scaffold-time purpose blurb" (the contract, lines 716-771);
`SPEC/gates.md` §"Glyph layers and reuse" (the 🎯 row + its empty-layer-1
paragraph); `SPEC/procedures/ft-task.md` §1 and §3 (the agent-neutral
projection); `claude/skills/ft-task/SKILL.md` Steps 1 → 3d;
`claude/skills/ft-goal-task/SKILL.md` Steps 1.5 → 3d;
`claude/skills/ft-micro-task/SKILL.md` Steps 1 → 2;
`docs/AGENT-NEUTRALITY.md:40`. A repo-wide grep for `purpose blurb` /
`Step 3d` / `Scaffold-time purpose` found no other live surface — the Codex
wrappers delegate to the SOP, and `cursor/` / `grok/` carry no blurb text of
their own, so those three platforms are covered by the SOP edit alone.

### Best Practices Review

Prose contract, no code. The touched responsibility split is the DRY one
[[CORE-504]] set up and this task preserves: the contract lives once in
`SPEC.md`, `SPEC/gates.md` documents the glyph reuse, `SPEC/procedures/`
projects it agent-neutrally, and each runner carries a short citing step plus
its own flavor. No new lazy fragment — the shared text is still ~8 lines per
runner, under the weight that earns a file read on every happy path. The one
structural change is a *deletion*: `/ft-task` and `/ft-goal-task` lose their
Step 3d entirely rather than keeping an empty step, since Step 1 is now the
single emission point for all three opening paths.

### Archive skim

`grep -l` over `.flowtron/tasknote/archive/core/` for the blurb surfaces:

- **[[CORE-504]]** — the predecessor that created the blurb. Two findings.
  (a) Its Clarifications record the *scope* decision (three ID-invoked
  runners) and the *shape* decision (🎯-prefixed inline marker), and
  explicitly rejected "blurb-plus-first-move" because Discovery has not run at
  scaffold time. None of that bears on emission *position*, so nothing here is
  contradicted. (b) Its Implementation Notes claim the SPEC section was
  "placed immediately before §'📝 Phase 1: Discovery' so it sits at the point
  in the document where it fires" — this task falsifies the second half of
  that clause, so CORE-504 earns a `⚠️ Superseded by` pointer at closure.
- **[[CORE-521]]** — corrected `docs/AGENT-NEUTRALITY.md`'s `--fast` ledger row
  to include §"🎯 Scaffold-time purpose blurb" (5→6 SPEC.md sites) six days
  ago. The rename touches that exact cell. The *count* stays 6 — this task
  moves the section, it does not add or remove a `--fast` site — so only the
  heading string changes.
- **[[CORE-506]]** — release note only; tags CORE-504 in v5.23.0. No claim to
  reconcile.
- No ⚠️ `Superseded by` pointers or `supersedes:` keys on any hit.

### Drift check

- **PLAN.md line vs. reality** — accurate. "CORE-504's 🎯 blurb fires only at
  Step 3d" holds for `/ft-task` and `/ft-goal-task`; `/ft-micro-task` emits
  from the tail of its Step 2, which is the same position relative to its own
  single scaffold path (after the model gate, after the pre-flight checks,
  after the scaffold write). The line's "all three ID-invoked runners" scope
  is therefore correct as filed.
- **SPEC contract** — read, not recalled. `SPEC.md` §"🎯 Scaffold-time purpose
  blurb" sources the blurb from "the `PLAN.md` long description and the `🎯
  Goal` just written". The Goal is itself *derived from* the PLAN.md line at
  scaffold (`/ft-task` Step 3b, `/ft-micro-task` Step 2, SOP §3 all say so),
  so dropping the Goal clause loses no information on the fresh-scaffold path.
  On the 3a promote path the starter note carries richer context that Step 1
  has not read — accepted as a deliberate tradeoff below.
- **`SPEC/gates.md`** — the 🎯 row's justification ("the blurb *is* the Goal,
  spoken instead of filed") survives the move unchanged: it is a claim about
  what the glyph means, not about when it fires.
- **Two-banner cap / cue-table** — untouched. Moving an emission point changes
  no obligation, so the blurb is still not a cue and still absent from the cue
  table.

### Clarifications (both answered by the operator)

1. **Heading → rename to `### 🎯 Purpose blurb`.** "Scaffold-time" becomes
   factually wrong the moment the blurb fires pre-scaffold, and a name with no
   positional claim cannot drift again. Ripples to six citing sites.
2. **Path-specific tails → left at their own paths as plain prose.** One blurb,
   one emission point, sourced from the PLAN.md line alone. The `park-reason:`
   is not knowable until 3c reads the file, and `loop-max` is not knowable
   until the scaffold ask — so each is stated where its data exists, as
   ordinary prose rather than a second 🎯 emission.

### Assumptions carried

- The 3a starter-promotion path emits a slightly thinner blurb than today
  (PLAN.md line only, not the starter note's captured context). Accepted: the
  operator gains orientation *earlier on every path* at the cost of *less*
  orientation on one, and the starter's context is surfaced by Phase 1
  Discovery moments later anyway.
- The `SPEC.md` section stays where it is in the document. Its placement
  before §"📝 Phase 1: Discovery" was justified by "it sits at the point in the
  document where it fires"; the sections around it are the phase contracts,
  and there is no earlier §"Step 1" heading in `SPEC.md` to sit before — the
  runner ordering is a skill/SOP concern, not a SPEC document-order one. The
  now-false justification is dropped from CORE-504's claim rather than
  answered by a move.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no executable surface changed; the CI `drift` job's structural gates stand in and were run (Phase 3)

**Implementation Notes:**

### Pattern survey

Extended the existing DRY split [[CORE-504]] established — contract once in
`SPEC.md`, glyph reuse in `SPEC/gates.md`, agent-neutral projection in
`SPEC/procedures/ft-task.md`, and a short citing step per runner — moving the
emission point without changing the ownership shape. No new lazy fragment: the
per-runner text is still ~6-8 lines, under the weight that earns a file read on
every happy path.

The one structural change is a **deletion**. `/ft-task` and `/ft-goal-task`
each lose Step 3d outright rather than keeping a hollow step, because Step 1
now precedes the 3a / 3b / 3c branch entirely — a single emission point with no
per-path variant to keep in sync. That is a net simplification of the thing
CORE-504 built: the old Step 3d existed *because* three paths converged on it.

### Minimal refactor gate

No refactor beyond the move. The heading rename (`Scaffold-time purpose blurb`
→ `Purpose blurb`) is not cleanup — leaving it would have made this task ship a
heading that contradicts its own body, the exact drift class [[CORE-521]] was
filed to fix. Six citing sites updated in lockstep, no others touched.

### Seven edits

1. **`SPEC.md`** — section renamed `### 🎯 Purpose blurb`; motivation rewritten
   to name the *terminating* checks (model gate, foreign dirt, archive
   collision, in-flight note) as the reason a late emission risks orienting the
   operator on nothing; firing point restated as "immediately after the
   `PLAN.md` line is captured"; the "and the `🎯 Goal` just written" source
   clause dropped, with an explicit note that the Goal derives from the same
   line so nothing is lost; the which-invocations paragraph rewritten from
   "on every path that opens a tasknote" to "once, ahead of the branch", and
   given the new sentence sending path-specific state (park-reason, `loop-max`)
   to its own path as ordinary prose. Bounds and `--fast`/`--unattended`
   paragraphs unchanged. Section left in place in the document.
2. **`SPEC/gates.md`** — 🎯 row label and the two `§"…"` citations in the
   empty-layer-1 paragraph; paragraph reflowed. The row's justification ("the
   blurb *is* the Goal, spoken instead of filed") is a claim about meaning, not
   timing, and survives the move untouched.
3. **`claude/skills/ft-task/SKILL.md`** — blurb block inserted into Step 1 after
   the task-line grammar note and before the two advisory checks; Step 3d
   deleted; the "then emit the **Step 3d purpose blurb**" clause stripped from
   3a / 3b / 3c; 3c given the park-reason prose line.
4. **`claude/skills/ft-goal-task/SKILL.md`** — same move into its Step 1; Step
   3d deleted; loop flavor kept in the blurb ("name the loop") but the
   `loop-max` budget explicitly *not* named there, since it is asked at Step 3b;
   park-reason prose appended to the 3c bullet.
5. **`claude/skills/ft-micro-task/SKILL.md`** — blurb lifted out of the tail of
   Step 2 and into Step 1, above that skill's inline pre-flight checks. Its
   single-scaffold-path note and the "blurb + ✅ Recap are the only two
   plain-English reads" line both kept.
6. **`SPEC/procedures/ft-task.md`** — the Purpose-blurb paragraph moved from §3
   to §1, landing after the `[unattended]`-marker prose and before the
   `## Completed`-rotation advisory (the same relative position the skills use);
   the resume branch in §3 keeps the park-reason obligation as plain prose.
   `last-verified:` left un-bumped — see the doc-drift sweep below.
7. **`docs/AGENT-NEUTRALITY.md:40`** — heading string in the `--fast` ledger row.
   The counts are unaffected and were re-derived rather than assumed: `--fast`
   still appears under exactly 6 `SPEC.md` headings and 3 named `SPEC/gates.md`
   sites, so [[CORE-521]]'s six-days-old correction still holds.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: markdown contract + skill prose only, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-only change; the narrowest covering validation is the CI `drift` job,
which is where this repo's structural gates live. Ran its six checks locally
against the working tree — wrapper-name invariant, `claude/skills` ↔
`codex/skills` parity, Pair A templates-roster clause, Pair B skill↔wrapper flag
parity, Pair C template back-link depth, Pair E ft-flowtron roster rows — all
pass. The `validate` job (`npm --prefix viz test` / `typecheck` / `lint`,
`node --test tools/update-adopters.test.mjs`) is `N/A`: no file under `viz/` or
`tools/` was touched.

Change-specific verification:

| Check | Command / method | Result |
|---|---|---|
| No stale heading string survives | grep for `Scaffold-time purpose blurb` across every live surface (`SPEC.md`, `SPEC/`, `claude/`, `codex/`, `cursor/`, `grok/`, `docs/`, `templates/`, `tools/`, root docs) | Only hit is `.flowtron/PLAN.md:14` — this task's own description, replaced by the stub at closure |
| No orphaned step reference | grep for `Step 3d` / bare `3d` across `claude/skills/`, `SPEC/`, `SPEC.md` | Zero hits |
| Lazy fragments unaffected | grep `blurb` / `3d` across all five `ft-task/` fragments | Zero hits — none referenced the retired step |
| New citations resolve | grep every `§"🎯 Purpose blurb"` citation and confirm `SPEC.md:716` is the matching heading | 6 citing sites, all resolve |
| `--fast` ledger counts still true | re-derived by mapping every `--fast` occurrence in `SPEC.md` to its enclosing heading, and every named `SPEC/gates.md` link | 6 SPEC.md headings, 3 gates.md sites — row unchanged |
| `.editorconfig` hygiene | trailing-whitespace + final-newline check on all 7 changed files | 0 trailing-ws, all end in newline |
| GFM integrity | fence-line parity on every changed file with a code block | Even on all |

### Quality assertions

No duplication introduced — the deletion of two Step 3d sections removed a
convergence point that no longer has three paths to converge. No dead prose: the
only text dropped is the "🎯 Goal just written" source clause, which the new
firing point makes false. No public-surface growth: no new glyph, no cue-table
row, no checklist box, no phase, no flag; the two-banner cap is untouched. No
stale code-facing documentation left behind — the sweep above is the proof.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Moved the 🎯 purpose blurb from its post-scaffold emission point (`/ft-task` and
`/ft-goal-task` Step 3d, `/ft-micro-task` the tail of Step 2) to **Step 1**,
immediately after the `PLAN.md` task line is captured — ahead of the model gate,
the foreign-dirt gate, the collision checks, and any scaffold write.

**Why it mattered:** four separate checks sit between the `PLAN.md` read and the
old emission point, and every one of them can terminate the run. An operator
whose run stopped at any of them had seen nothing but tool calls — the exact
cold-start gap [[CORE-504]] was built to close, left open on the paths where the
run never reaches Phase 1.

**Files (7 changed, +95/−89):** `SPEC.md` (contract rewritten, section renamed
`🎯 Purpose blurb`), `SPEC/gates.md` (glyph row + citations),
`SPEC/procedures/ft-task.md` (obligation moved §3 → §1, so Codex / Cursor / Grok
get the same ordering), the three runner `SKILL.md` files, and
`docs/AGENT-NEUTRALITY.md` (ledger heading string).

**Two operator decisions, both asked and answered in Phase 1:** rename the SPEC
heading (dropping "Scaffold-time", which the move falsifies, for a name with no
positional claim that cannot drift again), and leave the two facts the blurb
cannot know at Step 1 — a resume's `park-reason:` and a goal loop's `loop-max`
— at their own paths as ordinary prose rather than as a second 🎯 emission.

**Verification:** the CI `drift` job's six structural gates run locally (all
pass), plus seven change-specific checks — stale-string sweep, orphaned-step
sweep, lazy-fragment sweep, citation resolution, re-derived `--fast` ledger
counts, `.editorconfig` hygiene, GFM fence parity. `validate` job `N/A` (nothing
under `viz/` or `tools/` touched).

**Refactors:** none beyond the move. The heading rename is required by it, not
adjacent cleanup. Deferred nothing.

**Documentation:** the doc-drift sweep is below — one update
(`docs/AGENT-NEUTRALITY.md`, in the deliverable), sixteen "no change", and one
recorded non-bump (`SPEC/procedures/ft-task.md`'s `last-verified:`).

**Maintainability effect:** net *fewer* moving parts. Two Step 3d sections are
gone, and with them the three-way routing clauses that fed them — the blurb now
fires once, before the branch, so there is no per-path variant to keep in sync
and no future path that can be added while forgetting to emit it. The renamed
heading removes a positional claim that had already gone stale once.

### Doc-drift sweep

| Doc | Verdict |
|---|---|
| `README.md` | no change — carries no blurb text |
| `AGENTS.md` | no change — its KEEP-IN-SYNC block guards the skill roster and path conventions, neither touched |
| `SPEC.md` | **updated** — the contract this task moves (in the deliverable) |
| `docs/MIGRATION.md` | no change — adoption/bump procedure, no blurb surface |
| `claude/AGENTS-snippet.md` | no change — names skills, does not restate step bodies |
| `codex/AGENTS-snippet.md` | no change — the Codex `ft-task` wrapper delegates to `SPEC/procedures/ft-task.md`, which this task updated |
| `cursor/AGENTS-snippet.md` | no change — same delegation |
| `grok/AGENTS-snippet.md` | no change — same delegation |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | **updated** — `--fast` ledger row's heading string (in the deliverable); counts re-derived and unchanged |
| `docs/PLATFORMS.md` | no change — two-layer model unaffected; the contract layer moved, the wiring pattern did not |
| `claude/CAPABILITIES.md` | no change — [[CORE-504]] recorded that the blurb earns no row there (unconditional behavior, no operator trigger to reach for); moving its emission point does not create one. `last-verified:` stamp is a version-bump obligation, not a per-task one |
| `docs/AGENT-COMPAT.md` | no change — no per-agent cell changes; all four wiring platforms reach the new ordering through the SOP |
| `docs/EXTERNAL-AGENTS.md` | no change — the blurb is not a gate, so the unattended posture and handoff contract are untouched (and SPEC still states neither flag suppresses it) |
| `docs/WORKTREES.md` | no change |
| `docs/VISION.md` | no change — scope boundaries unaffected |

**Recorded non-bump.** `SPEC/procedures/ft-task.md`'s `last-verified:` stays at
`v5.21.0 · 2026-08-29`. Per `SPEC/procedures/README.md`, the stamp records a
*whole-SOP* re-check against its watched surfaces; this task verified one
paragraph, so bumping would overstate the claim. Same call [[CORE-504]] made,
now with the reason written down rather than left implicit.

### Superseded pointer

[[CORE-504]]'s Implementation Notes claimed the `SPEC.md` section was "placed
immediately before §'📝 Phase 1: Discovery' so it sits at the point in the
document where it fires". The second half is falsified by this task — the blurb
now fires at step 1. A `⚠️ Superseded by [[CORE-526]]` pointer was appended
under that note's nav header, append-only, and staged in this closure commit.

**Archived:** 2026-09-06
