---
title: ft-task-sop-probe-hint
status: completed
tags: []
created: 2026-09-08
due:
related-tasks: [CORE-541, CORE-535.2]
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

# CORE-542 | ft-task-sop-probe-hint

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-541]] · [[CORE-535.2]]

## 🎯 Goal

Mirror the probe-by-default-above-~3-hits Archive-skim hint into `SPEC/procedures/ft-task.md`, re-verify the SOP against its Claude-skill and template sources, and bump its `last-verified:` stamp.

## ✅ Acceptance

- [x] `SPEC/procedures/ft-task.md`'s **Archive skim** bullet carries the probe-by-default-above-~3-hits clause, phrased as a **judgment prompt** — no new step, no gate, skipping always correct ([[CORE-408.2]] shape, matching `SPEC.md` §"📝 Phase 1: Discovery" and `templates/tasknote-template.md`)
- [x] The added clause **cites** the SOP's existing read-step probe clause rather than restating what a probe is ([[CORE-535.4]] cite-don't-restate shape); no second probe definition enters the file
- [x] SOP re-verified against its `source:` surfaces (`claude/skills/ft-task/` + `templates/tasknote-template.md`) — every commit to those paths since the `2026-08-29` stamp adjudicated as either already mirrored or explicitly non-drift, with the adjudication recorded in Discovery Notes
- [x] `last-verified:` bumped to `v5.25.0 · 2026-09-08` per `SPEC/procedures/README.md` §"Frontmatter" (a sync event, not a release pin)
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Add the probe-by-default clause to the SOP's Archive-skim bullet (line ~255), citing the read step's clause above it
- [x] Bump the SOP frontmatter `last-verified:` to `v5.25.0 · 2026-09-08`
- [x] Phase 3: re-read the edited bullet against `SPEC.md` line 381 + the template's line for wording consistency; confirm link targets resolve; re-measure the SOP against `docs/CONTEXT-BUDGET.md`
- [x] Phase 4: doc-drift sweep, flip the PLAN.md line to stub form, archive the tasknote

## 🔗 Related

- [[CORE-541]] — predecessor; the v5.25.0 release SOP-currency check surfaced this gap
- [[CORE-535.2]] — origin of the probe-by-default hint now being mirrored

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and confirmed by direct read — `SPEC.md` line 381 and `templates/tasknote-template.md`'s Archive-skim line both carry the probe clause; `SPEC/procedures/ft-task.md` line 255 does not. Cited line number (~255) is accurate. Scope is two edits to one file.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The gap, confirmed.** Three surfaces should carry the same Archive-skim
guidance. Two do:

- `SPEC.md:381` — "…when the grep returns more than a handful of notes (~3 is a
  fair line), prefer handing the reading to a **probe** (same clause as the read
  step above) rather than pulling every hit into this window…", with a rationale
  paragraph at `SPEC.md:406-412`.
- `templates/tasknote-template.md` — the matching checklist line carries the same
  clause in shorter form.
- `SPEC/procedures/ft-task.md:255-260` — **does not.** Its Archive-skim bullet
  covers the path grep, `touches:` narrowing, and the Related/`supersedes`/⚠️
  edge-following, but stops before the probe clause.

The SOP's Phase 1 **read** step (lines 242-250) already carries the probe clause
in full, including the "judgment prompt, not a gate" framing and the
`docs/PLATFORMS.md` §"Non-Claude capability triggers" fallback for platforms with
no sub-agent primitive. So the mirror only needs to *point* at that clause, not
re-explain probes — which is also what `SPEC.md`'s own version does ("same clause
as the read step above").

**Origin.** [[CORE-535.2]] added the clause to `SPEC.md` + the template as one of
four small context-hygiene fixes folded in from `.1`. Its acceptance line named
exactly those two surfaces; the SOP was never in scope. Commit `1fbc7a3` touched
`templates/tasknote-template.md` and not `SPEC/procedures/ft-task.md` — the
un-mirrored `source:` commit that [[CORE-541]]'s release SOP-currency check
flagged.

**Archive skim.** A `grep -l "procedures/ft-task"` over
`.flowtron/tasknote/archive/core/` returns **103** notes — well past the ~3 line
this task exists to document. Narrowed instead to the two edges that actually
bear on the work: the origin note ([[CORE-535.2]], read in full) and the stamp
convention in `SPEC/procedures/README.md`. Reading all 103 would have been the
exact failure the clause is written to prevent. Load-bearing findings: the clause
is deliberately a judgment prompt per [[CORE-408.2]] ("reading four notes directly
is always a correct call"); and per [[CORE-270]] the SOP is hand-authored *from*
its watched surfaces, with `last-verified:` tracking that sync.

**Re-verification against `source:` (tier 1).** Commits touching
`claude/skills/ft-task/` or `templates/tasknote-template.md` since the
`2026-08-29` stamp, adjudicated:

| Commit | Task | Touched SOP? | Verdict |
|---|---|---|---|
| `29e02f3` | CORE-536 gate-relaxation-pass | yes | mirrored |
| `efac5f4` | CORE-535.5 gate-logic-untangle | yes | mirrored |
| `b75a55d` | CORE-535.4 skills-cite-dont-restate | **no** | **non-drift** — pure compression of the Claude skill (restated contract → one-line citations, 33,940→27,570 bytes). Its commit message asserts every branch, marker, fragment Read, and flag interaction preserved; diff confirms no behavior added. The SOP already routes rather than restates, so there is nothing to mirror. |
| `e0773c2` | CORE-535.3 spec-core-lazy-split | yes | mirrored |
| `1fbc7a3` | CORE-535.2 context-load-ledger | **no** | **drift — this task.** The probe clause below. |
| `bc916a0` | CORE-533 narrow-caobunga-batch | yes | mirrored |
| `b9a30d8` | CORE-527 blocked-by sweep | yes | mirrored |
| `0e68ce5` | CORE-526 purpose blurb Step 1 | yes | mirrored |
| `4f9ac47` | CORE-503 visual-baseline refusal | no | non-drift — refuses a carve-out; the SOP's Phase 3 already states the unattended 👁️ park unconditionally (lines 369-371). |
| `6f46a86` | CORE-504 scaffold-time purpose blurb | yes | mirrored |

Two `source:` commits did not touch the SOP; one is this task's finding, the
other adjudicates clean. No other drift.

**Coverage spot-checks (tier 2, `restates: SPEC.md`).** Verified present in the
SOP: the 🎯 purpose blurb at Step 1 (lines 140-158), the `[unattended]` row
marker and its "marker never implies the mode" rule (lines 125-139), the
Re-scope/De-scope drift carve-out, the `## Completed`-rotation advisory, epic
Fan-out echo, and Phase 3's quality assertions (paraphrased rather than titled).
The rotation advisory's "**150**" imperative against its "(the 100-row bound…)"
parenthetical reads like an inconsistency but is **correct** — `SPEC/tasknote-selection.md:289`
documents the 100/150 split as deliberate hysteresis.

**One adjudicated non-finding, deliberately not folded in.** The Claude skill's
Step 1 **filing-discipline check** (>70-word PLAN description → ⚠️ advisory) has
no SOP counterpart. This is not post-hoc drift: the check landed in the skill on
`2026-05-17` (`adb47d1`), two weeks *before* the SOP was authored on `2026-06-02`
(`39cfb0b`), so the SOP's original derivation omitted it by choice. The SOP is
explicitly the *floor* that routes, not a line-for-line mirror of every advisory.
Recorded here rather than expanded into scope; surfaced to the operator at close
in case a follow-up is wanted.

**Best Practices Review.** Documentation-only change to one markdown file. The
touched responsibility is "agent-neutral restatement of the Phase 1 checklist";
dependency direction is SOP → `SPEC.md` (routes to it, never the reverse). The
existing abstraction to extend is the read step's probe clause immediately above,
which the new text cites — no new shape, no duplication introduced. No refactor
required, none deferred.

**Clarifications.** No clarifications needed. Explicit assumptions: (a) the SOP's
compressed house style is preserved — cite the read-step clause rather than
restate the probe definition; (b) `last-verified:` bumps to the *current* release
`v5.25.0` with today's date `2026-09-08`, per `SPEC/procedures/README.md` §"Flagged
at release, never bumped by it" (this is a hand-run sync event, which is exactly
what the stamp records); (c) no other SOP content changes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Two edits, one file (`SPEC/procedures/ft-task.md`, +7/-3 lines, 30,315 → 30,622
chars).

**1. Probe clause on the Archive-skim bullet (line ~255).** Inserted after the
"still grep + read, no query engine" clause and before the "log load-bearing
findings" tail, so the bullet keeps its existing order: *what to grep → what
edges to follow → how to read the hits → what to log*. Wording follows
`SPEC.md:381`'s judgment-prompt phrasing verbatim on the operative span ("when
the grep returns more than a handful of notes (~3 is a fair line), prefer
handing the reading to a **probe**"), then diverges to fit the SOP's house
style: an em-dash aside compresses `SPEC.md`'s separate rationale paragraph
(`SPEC.md:406-412`) into one clause naming *why* — a path grep over a mature
archive can return dozens of notes — and points at the read step's clause
already present at lines 242-250 rather than restating what a probe is. That
back-reference is the same move `SPEC.md` makes ("same clause as the read step
above") and keeps the [[CORE-535.4]] cite-don't-restate discipline: the SOP
gains no second probe definition, and the read step remains the single place
that carries the "judgment prompt, not a gate" framing and the
`docs/PLATFORMS.md` fallback for platforms with no sub-agent primitive.

**Pattern survey.** The shape extended is the SOP's own Phase 1 bullet
convention — a bold label, an em-dash, prose clauses separated by semicolons,
no nested sub-bullets. No new shape introduced, no abstraction added. DRY holds
by construction: the only duplicated span is the ~15-word operative sentence
that must read the same across all three surfaces to be recognizable as the
same rule.

**2. `last-verified:` bumped** `v5.21.0 · 2026-08-29` → `v5.25.0 · 2026-09-08`.
Hand-run sync event, which is precisely what the stamp records per
`SPEC/procedures/README.md` §"Flagged at release, never bumped by it" — a
release cut flags a stale stamp but never advances it.

**Minimal refactor gate.** No refactor. The rotation-advisory 150-vs-100
wording checked during Discovery was verified correct, not adjusted; the
absent filing-discipline advisory was adjudicated a deliberate original
omission and left alone rather than folded into an unscoped edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Documentation-only change to one markdown file; the repo's test/lint commands
(`npm --prefix viz …`, `node --test tools/…`) cover the visualizer and the fleet
updater and touch nothing here, so there is no targeted suite to run. Verified
by direct inspection instead:

- **Diff review** — `git diff` confirms exactly the two intended hunks and no
  collateral change (7 insertions, 3 deletions, one file).
- **Wording consistency** — the edited bullet re-read against `SPEC.md:381` and
  the matching line in `templates/tasknote-template.md`; the operative sentence
  matches on all three surfaces.
- **Links** — the added text introduces no new link targets. The probe reference
  is prose pointing at the read step in the same file, so no path can rot.
- **Markdown** — clause structure and continuation-line indentation match the
  surrounding bullets; GFM-compatible, no new constructs.
- **Byte budget** — `wc -c` = 30,622. `docs/CONTEXT-BUDGET.md` §"Budgets"
  explicitly lists `SPEC/procedures/` under **"Not budgeted, deliberately"**, so
  the +307 chars breaches nothing. The informational ledger line (105) still
  reads `30,315`; deliberately left for `/ft-release` Step 7.1 to refresh in the
  same cut, per the standing check [[CORE-535.2]] shipped. Not hand-edited here.
- **Quality assertions** — no duplication beyond the deliberately-shared
  sentence, no dead text, no unexplained complexity, no surface growth (the
  bullet count and section structure are unchanged), no stale doc left behind.
- **Frontend** — `N/A`; no UI surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — all 18 `.flowtron/tasknote/README.md` §"AI-referenced docs"
entries: no change.** Verified rather than assumed: a grep for
`procedures/ft-task` + `last-verified` across the set returns hits in six docs
(`README.md`, `claude/AGENTS-snippet.md`, `docs/AGENT-NEUTRALITY.md`,
`claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`), and
every one is **structural** — it names the SOP's existence, its routing role for
Cursor/Codex/Grok pointer wrappers, or its per-platform wiring row. None
restates the Archive-skim bullet, and none mirrors this SOP's `last-verified:`
value (`claude/CAPABILITIES.md`'s stamp is its own doc's, already at
`v5.25.0 · 2026-09-08`). `docs/AGENT-NEUTRALITY.md:41` registers the SOP's
Claude-specific sites; the added text is agent-neutral prose citing a clause in
the same file, so that ledger row is unchanged. `SPEC/procedures/ft-task.md` is
itself outside the sweep set. The remaining twelve entries reference neither the
SOP nor a stamp.

**Final Summary:**

Closed the last un-mirrored surface of [[CORE-535.2]]'s probe-by-default clause.
`SPEC.md` §"📝 Phase 1: Discovery" and `templates/tasknote-template.md` both told
a Discovery agent to hand a large archive-grep result to a probe; the
agent-neutral SOP that contract-only agents (Codex, Cursor, Grok) actually load
did not — so the one class of agent with the least machinery got the least
guidance on the step whose cost grows with project age rather than task size.

**Changed:** `SPEC/procedures/ft-task.md` only, +7/-3 lines, 30,315 → 30,622
chars. Two edits: the probe clause inserted into the Archive-skim bullet
(line ~255), and `last-verified:` bumped `v5.21.0 · 2026-08-29` →
`v5.25.0 · 2026-09-08`.

**Wording.** The operative sentence matches `SPEC.md:381` verbatim so the rule
reads as the same rule on all three surfaces. `SPEC.md`'s separate seven-line
rationale paragraph compresses into one em-dash aside naming the *why* (a path
grep over a mature archive returns dozens of notes), and the clause **points at**
the SOP's existing read-step probe clause (lines 242-250) rather than restating
what a probe is — the [[CORE-535.4]] cite-don't-restate discipline, and the same
back-reference `SPEC.md` itself makes. The read step stays the single home of the
"judgment prompt, not a gate" framing and the `docs/PLATFORMS.md` fallback for
platforms with no sub-agent primitive. No new box, no gate.

**Re-verification (the task's second half).** Ten commits touched the SOP's
`source:` surfaces since the `2026-08-29` stamp. Eight touched the SOP in the
same commit. The two that did not were adjudicated individually: `1fbc7a3`
(CORE-535.2) is this task's finding; `b75a55d` (CORE-535.4) is **non-drift** — a
pure compression of the Claude skill body from restated contract to one-line
citations, adding no behavior for a routing SOP to mirror. Tier-2 spot-checks
against `restates: SPEC.md` found the 🎯 purpose blurb, the `[unattended]` row
marker, the Re-scope/De-scope carve-out, the Fan-out echo, and Phase 3's quality
assertions all present. The rotation advisory's "150" vs "(the 100-row bound…)"
looked like an inconsistency and is not: `SPEC/tasknote-selection.md:289`
documents the split as deliberate hysteresis.

**Verification.** Documentation-only, so no suite applies; verified by diff
review (exactly two hunks, no collateral change), three-way wording comparison
against `SPEC.md:381` and the template, link check (the addition introduces no
link targets), and `wc -c`. `docs/CONTEXT-BUDGET.md` lists `SPEC/procedures/`
under "Not budgeted, deliberately", so +307 chars breaches nothing; its
informational ledger line still reads `30,315` and was deliberately left for
`/ft-release` Step 7.1's standing check to refresh in the same cut rather than
hand-edited here.

**Refactors:** none made, none required. Deferred cleanup: none.

**One observation for the operator, not folded in.** The Claude skill's Step 1
filing-discipline advisory (>70-word PLAN description → ⚠️) has no SOP
counterpart. This is not drift — the check predates the SOP by two weeks
(`adb47d1` 2026-05-17 vs `39cfb0b` 2026-06-02), so the original derivation
omitted it deliberately, and the SOP is explicitly the routing *floor* rather
than a line-for-line mirror. Left alone rather than expanded into scope; worth a
follow-up only if the SOP's advisory coverage is meant to be exhaustive, in which
case the `## Completed`-rotation advisory it *does* carry is the precedent.

**Maintainability effect.** The three surfaces that state the archive-skim rule
now state it identically, so the next `/ft-release` SOP-currency check has one
fewer standing candidate to re-adjudicate, and a Codex/Cursor/Grok agent running
Discovery in a mature repo gets the same context-cost guidance a Claude agent
does. This task's own Discovery is the worked example: the archive grep returned
103 notes and two were read.

**Archived:** 2026-09-08
