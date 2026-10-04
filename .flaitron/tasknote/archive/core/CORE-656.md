---
title: review-probe
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-663, CORE-658]
touches:
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - SPEC/gate-postures.md
  - templates/tasknote-template.md
  - templates/subagent-probe-template.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-5-loop-mode.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/CAPABILITIES.md
  - SPEC/loop.md
  - README.md
  - docs/AGENT-NEUTRALITY.md
  - docs/GLOSSARY.md
  - docs/EXTERNAL-AGENTS.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-656 | review-probe

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a Phase 3 external-review step in which a fresh read-only context grades the
working diff against the tasknote's `## ✅ Acceptance` by severity — `/code-review`
for Claude, a `subagent-probe-template.md` variant for other runners, `N/A` on
trivial diffs.

## ✅ Acceptance

- [x] `SPEC.md` §"🧪 Phase 3" carries an **External review** checklist item plus the contract block (blocker/note rungs, dispositions, `N/A` escape, runner split, `--loop` / `--unattended` / micro-task scope) — `grep -ci 'external review' SPEC.md` ≥ 2 (the checklist item capitalizes, the block heading does not)
- [x] `templates/tasknote-template.md` Phase 3 carries the same checklist item — `grep -q 'External review' templates/tasknote-template.md`
- [x] `templates/subagent-probe-template.md` carries a **review probe** variant (brief + return shape) for non-Claude runners — `grep -q 'review probe' templates/subagent-probe-template.md`
- [x] `claude/skills/ft-task/SKILL.md` Phase 3 names `/code-review` and the blocker→Phase 2 disposition — `grep -q 'code-review' claude/skills/ft-task/SKILL.md`
- [x] `SPEC/procedures/ft-task.md` Phase 3 carries the agent-neutral equivalent — `grep -q 'External review' SPEC/procedures/ft-task.md`
- [x] `SPEC/gate-postures.md` §"What `--unattended` never relaxes" states the posture — `grep -q 'External review' SPEC/gate-postures.md`
- [x] `docs/AGENT-NEUTRALITY.md` registers `/code-review` as an intentional Claude-specific surface — `grep -q 'code-review' docs/AGENT-NEUTRALITY.md`
- [x] `docs/GLOSSARY.md` defines **review probe** — `grep -q 'review probe' docs/GLOSSARY.md`
- [x] `docs/EXTERNAL-AGENTS.md`'s unattended-posture paragraph names the review — `grep -q 'External review' docs/EXTERNAL-AGENTS.md`
- [x] Phase 3 keeps its heading; no fifth phase and no new operator cue — `! grep -qE 'Phase 5|🔬 \*\*REVIEW\*\*' SPEC.md`
- [x] `claude/skills/ft-task/unattended-mode.md` untouched — `git diff --quiet HEAD -- claude/skills/ft-task/unattended-mode.md`
- [x] Byte budgets hold across every edited surface — the CI `Context budget` block, run locally (see Testing Notes)
- [x] Repo validation set green — `npm --prefix viz test`, `run typecheck`, `run lint`, `run build`; `node --test tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] `SPEC.md` — add the **External review** item to the Phase 3 checklist (after Verification receipt, before the 👁️ item) and the `**The external review.**` contract block after the receipt prose
- [x] `templates/tasknote-template.md` — mirror the checklist item
- [x] `templates/subagent-probe-template.md` — add `## Variant — review probe`: brief + fixed return shape, agent-neutral, read-only, grades but never patches
- [x] `claude/skills/ft-task/SKILL.md` — extend the Step 5 Phase 3 bullet with `/code-review` + disposition, and the `--loop` / `--unattended` clauses
- [x] `SPEC/procedures/ft-task.md` — one compact agent-neutral sentence in the Phase 3 bullet (tight budget: ~2,065 chars headroom)
- [x] `SPEC/gate-postures.md` — one sentence in §"What `--unattended` never relaxes"
- [x] `docs/EXTERNAL-AGENTS.md` — extend the unattended Phase 3 clause (line ~79)
- [x] `docs/AGENT-NEUTRALITY.md` — new ledger row for `/code-review`
- [x] `docs/GLOSSARY.md` — **review probe** term beside **probe** / **delegate**
- [x] Run the byte-budget check + the repo validation set; record the receipt

## 🔗 Related

- [[CORE-663]] — harness-survey v2 re-ranks the gaps this task closes (follow-up)
- [[CORE-658]] — push-memory, the sibling gap from the same survey ranking (peer)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `docs/HARNESS-SURVEY.md` §"Gaps (ranked)" ranks this #1 and
  calls it "the one critical gap" — Anthropic's own harness research found
  self-evaluation unreliable *even on verifiable tasks*, and flowtron's Phase 3
  is entirely self-reported (the Verification receipt is the generator grading
  its own diff). The survey is one day old; nothing has landed since that
  closes it. Every surface the PLAN line names still exists and still has the
  shape the line assumes.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Origin.** `docs/HARNESS-SURVEY.md` (2026-09-21, [[CORE-663]]'s v1 pass) rates
"Evaluator outside the generator" gap #1 of 4 and the only *critical* one. Its
comparison table records the Anthropic-harness row as Planner / Generator /
**Evaluator** separation, with flowtron's overlap column reading "Acceptance
tick-through — **no external evaluator**". The survey also notes
`/code-review ≈ evaluator` as native Claude Code overlap already sitting
unused. This task spends that overlap.

**Surface map — where the Phase 3 checklist is mirrored** (grep on
`Verification receipt`, the item that shares the block):

| Surface | Role |
|---|---|
| `SPEC.md:448-509` | canonical contract |
| `templates/tasknote-template.md:79-91` | the shipped checklist |
| `SPEC/procedures/ft-task.md:~399-416` | agent-neutral runner body (Codex / Cursor / Grok) |
| `claude/skills/ft-task/SKILL.md:172` | Claude runner prose |
| `claude/skills/ft-task/step-5-loop-mode.md:67` | per-cycle verify inside `--loop` |
| `claude/skills/ft-micro-task/SKILL.md:127` | inline receipt, no Testing Notes section |

The last two are deliberately **not** edited — see the scope calls below.

**Best Practices Review.** Documentation/contract work, no module boundaries.
The established pattern this extends is the existing Phase 3 checklist item +
prose-block shape (receipt, 👁️ ask), so the new item is a third instance of a
shape already stated twice rather than a new construct. Duplication risk is the
six-surface mirror above: each restatement is a copy that can drift, which is
why the runner surfaces get pointers to `SPEC.md` rather than restatements of
the severity contract. No refactor needed; none deferred.

**Archive skim.** `archive/core/` confirmed against
`.flowtron/tasknote/README.md` §"Archive layout" (`CORE-*` → `archive/core/`);
868 notes, of which 753 mention "Phase 3" — far past the useful-grep line, so
narrowed to the terms that matter: `code-review` / `external review` /
`evaluator` returns exactly one note, `CORE-604.1`, and that hit is
`docs/CONTEXT-BUDGET.md` provenance (its ≈172k cold-start measurement), not a
prior attempt at external review. **No prior tasknote has tried this.** The
load-bearing archive findings are indirect, via the budget ledger:
[[CORE-607]] moved §"Post-closure protocol" out of `SPEC.md` and *lowered* the
cap 57,000 → 53,000 rather than letting moved material escape the ratchet, and
[[CORE-605]] dropped `SPEC/plan-filing.md` off the cold-start sum by softening
citations to consult-when-unclear pointers. Both say the same thing to this
task: additions to `SPEC.md` are charged, and a pointer is cheaper than a
restatement.

**Drift check.** Clean. Every path and section the PLAN line names exists with
the assumed shape: `SPEC.md` §"🧪 Phase 3: Testing & Linting" (448),
`templates/subagent-probe-template.md` (a brief + fixed return shape, already
read-only and already "the parent still owns the judgment"),
`claude/skills/ft-task/unattended-mode.md` §"Conversion map" (six gate rows;
`input-needed` is a live code, `SPEC/blocked.md:106`). No SPEC contract is
contradicted: `docs/VISION.md` §"What we won't accept" bars multi-user
*reviewer queues and approval workflows*, not a read-only grading pass, and
`templates/subagent-probe-template.md` §Notes already bars the thing that would
break scope ("no runner, no dispatcher, no fan-out").

One drift flag to carry into the Phase 4 sweep, not a blocker:
`docs/VISION.md:11` reads "You are the only reviewer the agent gets — no team
handoff, no second pair of eyes catching a bad session before it lands." That
line describes the *solo-operator* premise (no human teammate), which this task
does not change — the operator remains the only human reviewer. Assessed as
still true, re-checked at closure.

**Byte-budget headroom** (measured 2026-09-22, caps from
`docs/CONTEXT-BUDGET.md` §"Budgets"):

| Surface | Now | Cap | Headroom |
|---|---|---|---|
| `SPEC.md` | 48,522 | 53,000 | 4,478 |
| `claude/skills/ft-task/SKILL.md` | 28,105 | 33,000 | 4,895 |
| `SPEC/procedures/ft-task.md` | 35,935 | 38,000 | **2,065** |

`procedures/ft-task.md` is the binding constraint — [[CORE-631.3]] measured a
substantial edit there at +524 to +892, so its share of this task must stay a
pointer-shaped sentence, not a restatement of the severity contract. The
cold-start ledger row is `/ft-release`-refreshed by contract and is **not**
edited here; `templates/subagent-probe-template.md` (2,860) carries no cap and
is off the cold-start path, which makes it the right home for the full brief.

**Clarifications asked** (structured ask, 2 questions):

1. *Severity vocabulary* → **two rungs, `blocker` / `note`.** A finding either
   sends the run back to Phase 2 or it does not; the three-rung
   blocker/concern/nit option was declined as a judgment the runner does not
   need to make. Cheapest on bytes and on ceremony.
2. *Does `/ft-micro-task` carry the item?* → **No.** A micro-task's whole
   threshold is "below full ceremony", which is the trivial-diff `N/A` case the
   PLAN line already carves out. Stated as a deliberate exclusion in `SPEC.md`
   so a later reader does not read the absence as drift; `ft-micro-task/SKILL.md`
   is not edited.

**Assumptions being asserted** (not asked):

- **"(no new code)" reads as a property of the reviewer, not only of the park
  branch.** The review grades and never patches, on every path — attended,
  `--fast`, and `--unattended` alike. The fix is always Phase 2's work. This is
  the reading that makes the existing probe contract ("does not decide", "does
  not fix anything you find") hold without a carve-out.
- **`--loop` runs the review once, post-convergence**, beside the one-time
  taste checks (`step-5-loop-mode.md` §"Step 6") — never per cycle. Stated in
  `SPEC.md` rather than edited into the loop fragment, so the loop file stays
  untouched for the same reason `unattended-mode.md` does.
- **The `--unattended` rule lands in `SPEC.md` + one sentence in
  `SPEC/gate-postures.md` §"What `--unattended` never relaxes"** — the section
  that already owns the sibling Phase 3 rule (full validation set, red parks
  `input-needed`). `claude/skills/ft-task/unattended-mode.md` §"Conversion map"
  is **not** touched: the review is not a gate, so it converts nothing and
  earns no seventh row. This is the PLAN line's explicit fence.
- **No new operator cue and no fifth phase.** The item sits inside the existing
  🧪 heading, emits no banner, and does not change the two-banner cap.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, contract/documentation task; the Acceptance greps are the executable check

**Implementation Notes:**

**Pattern survey.** The new item is a third instance of a shape `SPEC.md`
§"🧪 Phase 3" already states twice — a checklist box plus a named prose block
(`**The verify-command rule.**`, `**The receipt.**`, now
`**The external review.**`). The review probe is likewise a *variant* of an
existing primitive rather than a new one: `templates/subagent-probe-template.md`
already defined read-only, returns-a-fixed-shape, never-fixes-what-it-finds,
parent-owns-the-judgment. Nothing new was invented except the two rungs. No
refactor required; none deferred.

**The six-surface mirror, and what it got.** Discovery mapped six places the
Phase 3 checklist is restated. Only four were edited, and the split is the
DRY call:

- **Restated** (they are the checklist): `SPEC.md`, `templates/tasknote-template.md`.
- **Pointed** (they are runners): `claude/skills/ft-task/SKILL.md` and
  `SPEC/procedures/ft-task.md` carry the *motion* — invoke, grade, record,
  dispose — and defer rungs / flag interactions / the `N/A` bound to `SPEC.md`.
  The SOP's share is deliberately the shorter of the two (see budget note).
- **Untouched**: `claude/skills/ft-micro-task/SKILL.md` — micro-tasks are the
  `N/A` case by construction.
- ⚠️ **Originally also untouched, and that was wrong:**
  `claude/skills/ft-task/step-5-loop-mode.md`. The first draft reasoned that
  the loop's behavior "is stated in `SPEC.md` where both runners already read
  it, so the fragment stays as it is — same reasoning the PLAN line applies to
  `unattended-mode.md`." **False.** `SKILL.md:169` *replaces* Phase 3 under
  loop-mode, so a loop run never reaches the Phase 3 prose at all; the SPEC
  sentence described behavior no surface implemented. The external review
  caught it (finding 1). The loop fragment, `SPEC/loop.md` §"Gate collapse",
  and `SKILL.md:169` were all updated. Note the PLAN line's fence covered
  `unattended-mode.md` only — extending it to the loop fragment by analogy was
  the generator's own inference, not the operator's instruction. The
  `unattended-mode.md` fence itself still holds and is untouched.
- **Also corrected after review**: `ft-epic-discovery/SKILL.md` and
  `ft-close-epic/SKILL.md` enumerated "all three Phase 3 boxes" (finding 4).

**`unattended-mode.md` untouched, and why it is not an omission.** The posture
fragment's §"Conversion map" holds seven rows, each an *ask-and-wait gate*
turned into a park. The external review asks the operator nothing on any path,
so it converts nothing and earns no eighth row. What the posture does need — the
review still runs, a blocker parks `input-needed` — went to
`SPEC/gate-postures.md` §"What `--unattended` never relaxes", the section that
already owns the sibling Phase 3 rule (full validation set, red parks
`input-needed`). Placed by symmetry with that rule, not by convenience.

**Agent-neutrality.** ⚠️ *This paragraph originally claimed "exactly two sites"
and was wrong — the external review caught it (finding 3). Corrected in place
rather than deleted, since the miscount is the evidence.* `/code-review` is
named at **four** contract-layer sites — `SPEC.md`,
`templates/subagent-probe-template.md`, `README.md`, `docs/GLOSSARY.md` — each
of which also names the neutral path in the same breath, and all four are
registered in `docs/AGENT-NEUTRALITY.md`. The contract itself states a property — "a
context that did **not** write the diff" — so a runner with no review skill
satisfies it with a briefed sub-agent, and the brief names no spawn primitive
(the boundary `templates/subagent-probe-template.md` §Notes already draws).

**Byte budget.** `SPEC.md` 48,522 → 51,024 (+2,502), leaving 1,976 of the 53,000
cap — about **0.9 of a working unit** against the ~2-unit standard
`docs/CONTEXT-BUDGET.md` sets. The block was tightened once mid-execution after
a first draft left 1,795 (merged the two-rung lead-in into the opening
paragraph; collapsed the three flag paragraphs into one). It is not tightened
further: the remaining text is the contract, and moving it to a lazy module
would hide a *standing, every-task* item behind a conditional load. No new row
filed — [[CORE-657]] (High, open) is already scoped to recover `SPEC.md`
headroom by moving incident rationale out, and this task makes that row
load-bearing rather than merely tidy. `SPEC/procedures/ft-task.md` 35,935 →
36,482 (+547, within its measured +524…+892 band), 1,518 left.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

  *Added to this note by hand: it was scaffolded from the pre-change template,
  and a task that ships an external-review box should be the first to sit for
  it.*

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no rendered surface; markdown contract files only

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Acceptance verify commands** (all run from the repo root):

```text
grep -ci 'external review' SPEC.md                                      → 2
grep -q 'External review' templates/tasknote-template.md                → 0
grep -q 'review probe' templates/subagent-probe-template.md             → 0
grep -q 'code-review' claude/skills/ft-task/SKILL.md                    → 0
grep -q 'External review' SPEC/procedures/ft-task.md                    → 0
grep -q 'External review' SPEC/gate-postures.md                         → 0
grep -q 'code-review' docs/AGENT-NEUTRALITY.md                          → 0
grep -q 'review probe' docs/GLOSSARY.md                                 → 0
grep -q 'External review' docs/EXTERNAL-AGENTS.md                       → 0
! grep -qE 'Phase 5|🔬 \*\*REVIEW\*\*' SPEC.md                           → 0
git diff --quiet HEAD -- claude/skills/ft-task/unattended-mode.md       → 0
CI "Context budget" block, run locally                                  → 0
npm --prefix viz test                                                   → 0
npm --prefix viz run typecheck                                          → 0
npm --prefix viz run lint                                               → 0
npm --prefix viz run build                                              → 0
node --test tools/update-adopters.test.mjs                              → 0  (54 pass / 0 fail)
git diff --check                                                        → 0
```

**One verify command was wrong, and the review caught it before the tick.**
Criterion 1 was written as `grep -c 'External review' SPEC.md` ≥ 2 and returned
**1** — the checklist item capitalizes the term, the prose block heading does
not. The deliverable was correct; the command was. Amended to the
case-insensitive form rather than renaming the prose heading to satisfy a bad
grep — the latter is the "contrived command buys a tick, not evidence" failure
`SPEC.md` §"The verify-command rule" already names. Recorded rather than
silently fixed, since it is precisely the class of self-grading error this task
exists to catch.

**Byte budget.** Re-run after the doc-drift sweep added `README.md` and
`claude/CAPABILITIES.md` to the diff; still green. `SPEC.md` finishes at 51,024
of 53,000 — see the Implementation Notes budget paragraph for why no further
trim was made and why [[CORE-657]] is the recovery.

**External review** — `/code-review medium`, a forked context that did not write
the diff. Scope as graded: 9 modified files + the untracked tasknote. It
returned **5 findings**; graded against `## ✅ Acceptance` on the two rungs this
task ships: **3 blockers, 2 notes**. The run returned to Phase 2, fixed all
three, and re-ran Phase 3 from the top (receipts above are the re-run).

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 1 | The `--loop` path had no surface that runs the review. `SKILL.md:169` *replaces* Phase 3 under loop-mode, so the new sentence at `:172` was unreachable; `step-5-loop-mode.md` §"Step 6" listed only taste checks → Phase 4; `SPEC/loop.md` was silent. A `--loop` run would close with the box neither run nor `N/A`. | **blocker** — criterion 1's grep passed without deciding whether the stated `--loop` behavior was reachable | **Fixed.** New §"Step 6" item 2 in `step-5-loop-mode.md` (once, post-convergence; a blocker re-opens the loop, not closure; `input-needed` park under `--unattended`), a matching bullet in `SPEC/loop.md` §"Gate collapse", and `SKILL.md:169` now names it. |
| 2 | "invoke the `code-review` skill over the working tree" gave no scope bound. On a branch ahead of its remote the default range sweeps in earlier tasks' commits — *this checkout is 5 ahead of `origin/main`* — producing blockers the task cannot own, each bouncing it to Phase 2. | **blocker** — the mechanism misfires in the common case | **Fixed.** `SKILL.md` now pins the scope to this task's own diff and says why. `SPEC/procedures/ft-task.md` already pinned it by construction (the brief hands over a pasted diff). |
| 3 | The new neutrality row undercounted `/code-review` by two contract-layer sites: `README.md:278` and `docs/GLOSSARY.md:125`, the latter added by this same diff. A future audit would re-flag them — the exact failure the ledger prevents. | **blocker** — criterion 7's grep confirmed *registration*, not *completeness* | **Fixed.** Row widened to all four sites with the any-mention rule named. `docs/HARNESS-SURVEY.md`'s pre-existing mention is explicitly excluded with its reason. |
| 4 | `ft-epic-discovery/SKILL.md:217` and `ft-close-epic/SKILL.md:166` both say "tick all three Phase 3 boxes", so every epic tasknote would archive with an unticked, un-annotated External review box. | **note** — no Acceptance criterion covers those skills | **Fixed** (it is one sentence each). Now "all five", naming each box. This also closes a **pre-existing** omission the reviewer flagged: the `Verification receipt` box was already missing from both enumerations before this task. Same sentence, so it could not be half-fixed — called out here rather than folded in silently. |
| 5 | The blocker→Phase 2→Phase 3 cycle is unbounded, and under `--unattended` its only exit is "a blocker the run cannot fix" — a self-assessment by the same generator whose self-evaluation the section's opening paragraph calls unreliable. | **note** — a real design wrinkle, not a failed criterion | **Filed, not fixed.** The existing `--unattended` full-suite rule (`SPEC/gate-postures.md`) has the identical unbounded shape and flowtron accepted it, so fixing one and not the other would be incoherent; and a bound costs `SPEC.md` bytes it does not have (see the budget paragraph). Proposed as a PLAN row at the 📦 gate for the operator to accept or drop. |

**What this says about the mechanism.** It found three real defects in a diff
whose every self-reported check was already green — including one (finding 1)
that made the feature silently inoperative on an entire flag path, and one
(finding 3) whose Acceptance grep passed while the underlying claim was false.
That is the "verify command passed without deciding it" rung, observed on its
first run. Findings 2 and 3 also falsified two claims in this note's own
Implementation Notes, which the generator had written with confidence.

**Structural assertions** (`N/A` on the code half — no code changed; markdown
contract surfaces only). On the documentation half: no avoidable duplication —
the two runner surfaces carry the motion and point at `SPEC.md` for the rungs
rather than restating them, and the two deliberately-untouched mirrors
(`step-5-loop-mode.md`, `ft-micro-task/SKILL.md`) are named in Implementation
Notes with their reasons. No dead text, no stale cross-reference: every new
link target was resolved by the greps above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", all
18 entries:

| Doc | Verdict |
|---|---|
| `README.md` | **Updated** — §"Sessions, loops, and sub-agents" described probes as a Phase 1 Discovery tool only. Added the external review as the one probe with a fixed question. |
| `AGENTS.md` | No change — repo layout, validation commands, skill roster; none moved. |
| `SPEC.md` | **Updated** — the deliverable. §"🧪 Phase 3" gains the checklist item + `**The external review.**` block. |
| `docs/MIGRATION.md` | No change — adoption/bump steps; no new wiring, no new file an adopter must symlink. |
| `claude/AGENTS-snippet.md` | No change — names skills, not phase checklists. The item ships inside `templates/tasknote-template.md`, which adopters already copy. |
| `codex/AGENTS-snippet.md` | No change — same reason; routes `ft-task` through the SOP, which was updated. |
| `cursor/AGENTS-snippet.md` | No change — same reason. |
| `grok/AGENTS-snippet.md` | No change — same reason. |
| `docs/CONVENTIONS.md` | No change — commits, versioning, formatting, CI. The CI `Context budget` job is unchanged and still passes. |
| `CONTRIBUTING.md` | No change. |
| `SECURITY.md` | No change — the review probe is read-only and briefed with repo content the session already holds; it introduces no new untrusted-input path. |
| `docs/AGENT-NEUTRALITY.md` | **Updated** — new ledger row registering `/code-review` at its two contract-layer sites. |
| `docs/PLATFORMS.md` | No change — verified, not assumed. Its three non-Claude trigger tables (Grok Build, Codex CLI, Cursor) each already carry a **Sub-agent / isolated exploration** row realizing the probe primitive, and the review probe *is* a probe, so it rides the existing row. A per-agent review-tool row would be speculation about vendor capabilities flowtron has not observed. |
| `claude/CAPABILITIES.md` | **Updated** — new `/code-review` trigger row, the sub-agent row's contract-side-trigger cell widened, and a cross-check bullet. Its `Last verified` stamp (`v5.32.0 · 2026-09-21`) is **not** bumped: the stamp is release-owned, and `/ft-release` refreshes it. |
| `docs/AGENT-COMPAT.md` | No change — per-agent consume-mode / entry-point / primitive / currency. No agent's mode changed. |
| `docs/EXTERNAL-AGENTS.md` | **Updated** — the unattended-posture paragraph enumerated Phase 3's behavior and would have been incomplete; now names the review, and states it commits nothing so it does not trip step 9's foreign-commit boundary. Stable-surface rows: none moved, renamed, or retired, so no caller-side row is owed. |
| `docs/WORKTREES.md` | No change. |
| `docs/VISION.md` | No change, and this one was re-checked rather than waved through. Line 11 — "You are the only reviewer the agent gets — no team handoff, no second pair of eyes" — reads adjacent to this task, but it states the *solo-operator premise*: no human teammate. That is still true; the operator remains the only human reviewer, and an agent grading a diff is not a team handoff. §"What we won't accept" bars reviewer queues and approval workflows (multi-user machinery); this ships neither, and adds no runner or dispatcher. |

**Learnings** — `N/A`. The contract change is self-describing at the surfaces
that already carry the Phase 3 checklist; nothing here needs to reach the
always-loaded layer independently of `SPEC.md`, which *is* that layer.

**Final Summary:**

Flowtron's Phase 3 gains an **External review**: a context that did not write
the diff grades it against `## ✅ Acceptance` on two rungs — a **blocker**
returns the run to Phase 2, a **note** is fixed or filed. It closes the gap
`docs/HARNESS-SURVEY.md` ranked #1 and called the only critical one: every
Phase 3 check before it was the generator grading itself.

**Changed files — 15** (markdown only, no code):

| Group | Files |
|---|---|
| Contract | `SPEC.md` (+2,502), `SPEC/gate-postures.md`, `SPEC/loop.md`, `SPEC/procedures/ft-task.md` (+547) |
| Templates | `templates/tasknote-template.md`, `templates/subagent-probe-template.md` (new §"Variant — review probe") |
| Claude wiring | `ft-task/SKILL.md`, `ft-task/step-5-loop-mode.md`, `ft-epic-discovery/SKILL.md`, `ft-close-epic/SKILL.md`, `CAPABILITIES.md` |
| Docs | `README.md`, `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `docs/EXTERNAL-AGENTS.md` |

**Verification.** 18 commands, all exit 0 (receipts in Testing Notes): 11
Acceptance greps, the CI `Context budget` block run locally, the four `viz`
commands, `node --test tools/update-adopters.test.mjs` (54 pass / 0 fail), and
`git diff --check`. One verify command was itself defective — a case-sensitive
grep that returned 1 where the deliverable was correct — amended rather than
worked around, and recorded.

**The mechanism was dogfooded on its own diff, and it paid immediately.**
`/code-review` returned 5 findings against a diff whose every self-reported
check was already green: **3 blockers** (the `--loop` path had no surface that
actually ran the review, making the feature inoperative on a whole flag path;
`/code-review` was invoked with no scope bound, which on a branch ahead of its
remote grades unrelated commits; the neutrality ledger row undercounted its own
sites by two) and **2 notes** (one fixed, one filed). The run returned to Phase
2, fixed all three, and re-ran Phase 3 from the top. Two of the findings
falsified claims this tasknote's own Implementation Notes had stated with
confidence — both corrected in place, with the error left visible.

**`touches:` reconciliation.** Declared 15, changed 15 — but the declaration
was amended twice mid-run, both times honestly: `README.md` +
`claude/CAPABILITIES.md` were added when the Phase 4 doc-drift sweep found real
drift, and `SPEC/loop.md` + the three skill files were added when the external
review's blockers sent the run back to Phase 2. No undeclared path was edited.

**Scope note.** Fixing finding 4 also closed a **pre-existing** omission — the
`Verification receipt` box was already missing from both epic skills'
enumerations before this task. It is one sentence in each file, so it could not
be half-corrected; flagged here rather than folded in silently.

**Maintainability effect.** Flowtron now has an evaluator that is not the
generator, at the one point in the lifecycle where the diff exists and closure
has not yet happened — with no new phase, no new banner, no runner, and no
dispatcher. Cost: `SPEC.md` sits at 51,024 of its 53,000 cap (~0.9 of a working
unit), which makes the already-filed [[CORE-657]] load-bearing rather than
merely tidy.

**Archived:** 2026-09-22

