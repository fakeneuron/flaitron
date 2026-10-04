---
title: skill-layer-sweep-blindspot
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-489.N]
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

# CORE-492 | skill-layer-sweep-blindspot

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-489.N]]

## 🎯 Goal

Decide and implement whether `claude/skills/*/SKILL.md` bodies — excluded from the AI-referenced-docs doc-drift sweep yet carrying factual claims about swept docs — need a sweep-layer guard, with accept-as-is a valid outcome.

## ✅ Acceptance

- [x] `.flowtron/tasknote/README.md`'s excluded-surfaces paragraph no longer offers lazy-loading as the sweep-exclusion reason, and states the actual volume reason with measured figures
- [x] The accepted residual risk (skill bodies state facts *about* swept docs; a contract change can falsify one unswept) and its catch layer (epic-audit, not per-task closure) are recorded at the point of exclusion
- [x] CORE-492's declined-guard decision is recorded with its evidence — 63 skill-body `§"…"` citations, zero genuine dangles, and the fact that a resolution check would not have caught CORE-489.N Finding 2
- [x] No new machinery: no `/ft-release` §7.1 Pair L, no validator, no change to the list's membership — `git diff` shows wording-only hunks
- [x] Mirror check: `docs/GLOSSARY.md:13` and `templates/tasknote-README.md` §"AI-referenced docs" re-read and either updated or confirmed true-as-written with a one-line reason
- [x] Repo validation set green; `/ft-release` §7.1 Pair K1/K2 greps silent

## 🧩 Subtasks

- [x] Reword `.flowtron/tasknote/README.md:67-70` — replace the laziness rationale with the volume rationale
- [x] Append the residual-risk + catch-layer paragraph, naming the `ft-release/SKILL.md:567` precedent and the declined guard with its evidence
- [x] Re-read `docs/GLOSSARY.md:13` and `templates/tasknote-README.md` for the same stranded rationale; edit or record as true-as-written
- [x] Run the repo validation set + Pair K1/K2
- [x] Phase 4: doc-drift sweep, flip PLAN line to stub, archive tasknote

## 🔗 Related

- [[CORE-489.N]] — surfaced this blindspot during the CORE-EPIC-489 close-out audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The blindspot the ticket names is real and still open at HEAD — `claude/skills/*/SKILL.md` is excluded from the sweep set (`.flowtron/tasknote/README.md:67-70`) while carrying 63 factual citations into swept docs. The cited precedent (`ft-release/SKILL.md:567`) was repaired by [[CORE-491]], but only the instance; the structural half the ticket was filed for is untouched. Discovery narrowed the remedy away from both candidates the PLAN line proposed — see the clarifying-questions entry.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: markdown prose only, no code or module boundary in scope. The one applicable convention is `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors", handled as a subtask (GLOSSARY / template mirror check) rather than a refactor.

- [x] **Archive skim** — read [[CORE-489.N]] (the audit that filed this, in full: three findings + the root-cause diagnosis + the explicit no-inline-fix decision) and [[CORE-491]] (the sibling that resolved findings 1 and 2 and reframed the list); followed CORE-491's `supersedes: [CORE-194.1]` edge back to the Q3 resolution. Findings in Discovery Notes.

- [x] **Drift check** — see Discovery Notes; one citation in the PLAN line is stale by repair, and one live inconsistency surfaced that the PLAN line does not name.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  One question put to the operator via AskUserQuestion — the outcome the PLAN line explicitly reserved (*"accept-as-is is a valid outcome"*). Four grounded branches offered: document-the-rationale / + Pair L guard / add the skill layer to the sweep set / pure no-op. **Resolved to: document the real rationale.** No guard, no membership change.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The blindspot, measured.** 63 citations of the shape `` `path.md` §"Section" ``
run from `claude/skills/*/SKILL.md` into swept docs. A resolution scan against
every heading in each target found **five misses, none of them a genuine
dangle** — all are matcher artifacts:

| Site | Cited | Why it is not drift |
| --- | --- | --- |
| `ft-new-project/SKILL.md:62,64` | `.flowtron/core/{cursor,grok}/AGENTS-snippet.md` §"One-time symlink wiring" | Adopter-relative path; `.flowtron/core/` does not exist in flowtron-self. Heading present at `cursor/AGENTS-snippet.md:21` / `grok/AGENTS-snippet.md:22`. |
| `ft-release/SKILL.md:345` | `docs/MIGRATION.md` §"Skills retired so far" | Anchor is a **bold line** (`docs/MIGRATION.md:501`), not a `#` heading. |
| `ft-release/SKILL.md:599` | `docs/VISION.md` §"Schema validators" | Anchor is a **bullet lead** (`docs/VISION.md:34`) — the same shape Pair K1 already resolves. |
| `ft-worktree-start/SKILL.md:170` | `docs/WORKTREES.md` §"Fan-out, YAML, and the start warn." | Heading is `docs/WORKTREES.md:37` without the trailing period; the `.` is sentence punctuation inside the closing quote. |

So a Pair-L-style resolution guard would report **zero real findings today** and
would need three normalization rules (strip the `.flowtron/core/` adopter
prefix, accept bold-line and bullet-lead anchors, strip trailing punctuation)
before it stopped crying wolf.

**The decisive point: the guard targets the wrong class.** [[CORE-489.N]]
Finding 2 — the miss that filed this ticket — was
`claude/skills/ft-release/SKILL.md:567` asserting *"the Phase 4 cold-start doc
sweep never walks `docs/VISION.md` at all"*. Its citation was
`.flowtron/tasknote/README.md` §"AI-referenced docs", **a section that existed
then and exists now**. The claim was *semantically* falsified by
[[CORE-489.3]] moving VISION.md onto the list; the pointer never dangled. No
grep resolves that. Citation rot and claim falsification are two classes, and
the ticket's proposed mechanism only reaches the one that has no instances.

**Drift check — code half.** `ft-release/SKILL.md:567` no longer states the
falsehood: [[CORE-491]] reworded Pair K's closing clause on 2026-08-29, and it
now reads that the sweep walks VISION for staleness but is blind to whether the
citations pointing at it resolve. The PLAN line's *instance* citation is
therefore stale-by-repair; its *structural* claim (`claude/skills/*/SKILL.md`
is excluded from the sweep and carries claims about swept docs) is exactly true
at HEAD.

**Drift check — cross-artifact half. One live inconsistency, and it is the
answer to this ticket.** `.flowtron/tasknote/README.md:67-70` reads:

> ``SPEC/*.md`` (lazy modules) and ``claude/skills/*/SKILL.md`` are loaded on
> demand by skill stubs — authoritative when fired, but **outside this sweep
> set**.

That offers lazy-loading as the *reason* for sweep exclusion — 23 lines after
:41-44, added by [[CORE-491]], establishes that lazy-loading is **not** a
sweep-exclusion criterion (`docs/VISION.md` is lazy *and* swept, and the
paragraph says so by name). CORE-491 severed the inference and left this
paragraph reasoning from it. So the question this ticket asks — *why is the
skill layer excluded?* — currently has **no valid answer written down**, which
is the real defect behind the blindspot.

**The reason that does survive is volume.** `SPEC/*.md` (2,321 lines) +
`claude/skills/*/SKILL.md` (3,845) = 6,166 lines against a 4,111-line sweep
set. Walking them at every Phase 4 closure roughly doubles a per-task step
Core Principle #3 exists to keep small. That is a cost decision, and it is
defensible written down — unlike the laziness one, which is now false.

**Mirror survey** (per `docs/CONVENTIONS.md` §"Canonical source with labeled
mirrors"). Two surfaces restate the exclusion:

- `docs/GLOSSARY.md:13` — *"`SPEC/` lazy modules and `claude/skills/*` are
  excluded on both counts."* States the fact, offers no rationale, asserts
  nothing false. True as written.
- `templates/tasknote-README.md` §"AI-referenced docs" — carries the
  membership rule in general form (*"a lazy doc that drifts belongs on this
  list"*) and **no** flowtron-self exclusion paragraph. Nothing to strand.

Precedent for leaving both: [[CORE-491]] deliberately left `/ft-release` Pair
E:407 and `docs/GLOSSARY.md:151` alone on the same test — old vocabulary, but
nothing false.

**Assumptions.** (a) `.flowtron/tasknote/README.md` is the right home for the
rationale: it is where the sweep set is declared and where the exclusion is
stated. (b) The adopter template stays untouched — an adopter's own
`.claude/skills/` is theirs, and CORE-491 already reframed that file. (c) The
declined guard is recorded in the repo, not only in this tasknote, so the next
auditor to notice the blindspot finds the weighing instead of re-filing it.

**Exit-gate judgment.** Discovery deviated from the PLAN line's two named
candidates (a §7.1 pair / a grep guard) and landed on a different file
entirely — normally a 🛠️ fire. The deviation was surfaced *and* resolved
inside Discovery by the operator's own AskUserQuestion selection, which named
the target and the scope, so the gate's function — operator go on the approach
— is already discharged. Skipping the banner rather than re-asking the
question just answered.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern rather than inventing one. [[CORE-491]] set the shape three paragraphs up in the same section: state the rule, then state what it does *not* imply, then name the concrete case. This edit continues it — states the exclusion, names why the neighbouring paragraph cannot be its reason, gives the reason that survives. The **Accepted residual risk** paragraph follows `docs/CONVENTIONS.md`'s own habit of recording a declined mechanism at the point it would have gone, so the next auditor finds the weighing instead of re-filing it (the precedent is `/ft-release` §7.1's "Positional arguments are out of scope. … Recorded here so a later reader does not read that silence as an oversight").

- [x] **Minimal refactor gate** — no refactor. One hunk, wording-only, +17/−4 in a single file. The list itself is untouched: no entry added, removed, reordered, or re-annotated. Deferred deliberately (see mirror survey in Discovery Notes): `docs/GLOSSARY.md:13` and `templates/tasknote-README.md`, both true as written — the same test [[CORE-491]] applied to Pair E:407 and `docs/GLOSSARY.md:151`.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose, no code path changed. The standing guards for this surface are `/ft-release` §7.1 Pair K and the repo validation set, both run in Phase 3.

**Implementation Notes:**

**One edit, `.flowtron/tasknote/README.md:67-83`, in two paragraphs.**

1. **The rationale swap.** *"are loaded on demand by skill stubs —
   authoritative when fired, but outside this sweep set"* becomes *"sit outside
   this sweep set … **their exclusion is a volume decision, not a laziness
   one**"*, with the reason stated inline: the preceding paragraph severs
   lazy-loading from sweep membership, so it cannot also be the exclusion
   reason, and the surviving reason is cost — ~6,200 lines of `SPEC/*.md` +
   `claude/skills/*/SKILL.md` against a ~4,100-line sweep set, roughly doubling
   a per-task step Core Principle #3 keeps small. The closing clause
   (*"excluded on both counts, so the distinction above does not arise"*) is
   preserved verbatim — it was always true.

2. **The residual-risk record.** New paragraph naming what the exclusion
   actually costs: skill bodies state facts *about* swept docs, so a contract
   change can falsify one with no sweep reaching it, with
   `claude/skills/ft-release/SKILL.md:567` as the worked instance. Names the
   catch layer (epic-audit — where [[CORE-489.N]] found it) and states that
   per-task closure is *not* expected to catch this class, which converts a
   silent gap into a declared one. Closes with CORE-492's declined guard and
   the two facts that decided it: 63 citations all resolving, and a resolution
   check missing the motivating case because that section never moved.

**Why the guard was declined, in one line.** Citation rot and claim
falsification are different classes; the proposed guard covers the one with
zero instances and misses the one with the instance that filed the ticket.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full validation set green: `npm --prefix viz test` **481 passed / 25 files**, `node --test tools/update-adopters.test.mjs` **37 passed / 0 failed**.

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (tsc --noEmit) clean, `npm --prefix viz run lint` (eslint src) clean, `node --check` on both updater files ok. Six-command `AGENTS.md` §"Validation" roster complete.

- [x] **Quality assertions** — no duplication introduced: the rationale is stated once, and the mirror survey confirmed neither `docs/GLOSSARY.md:13` nor `templates/tasknote-README.md` carries a competing copy. No new machinery, no list-membership change, no public-surface growth. `git diff --stat` = 1 file, +17/−4, single hunk. Re-ran the skill-body citation scan after the edit: still 63 citations, no new `§"…"` citation introduced by this change.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface touched (markdown prose in `.flowtron/tasknote/README.md`).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Documentation-appropriate verification plus the two standing guards for this
exact surface:

| Check | Result |
| --- | --- |
| `npm --prefix viz test` | 481 passed (25 files) ✓ |
| `npm --prefix viz run typecheck` | clean ✓ |
| `npm --prefix viz run lint` | clean ✓ |
| `node --test tools/update-adopters.test.mjs` | 37 pass / 0 fail ✓ |
| `node --check` ×2 (updater + its test) | ok ✓ |
| `/ft-release` §7.1 **Pair K1** (citations resolve to real canonical bullets) | silent ✓ |
| `/ft-release` §7.1 **Pair K2** (point-of-use restatements still name VISION.md) | silent ✓ |
| Skill-body `§"…"` citation scan, post-edit | 63 citations, 0 genuine dangles, none added ✓ |

Pair K1 and K2 are the relevant guards because this edit sits in the same
labeled-mirror family they police — the paragraph edited is the canonical
statement `docs/GLOSSARY.md:13` mirrors.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — 18 entries, 18 × no change.** Each entry was grepped for
`cold.start` / `AI-referenced` / `doc-drift sweep` / `excluded on both`. Four
non-zero hits, all read in full and all still true after this edit:
`SPEC.md:819,823` (describes the sweep; asserts nothing about what is excluded
or why), `docs/MIGRATION.md:236,273` (sweep-role framing, no exclusion
rationale), and `docs/CONVENTIONS.md:70` ([[CORE-491]]'s reword — cites the list
with the correct *swept ≠ cold-start* framing, and its claim is about
`VISION.md`'s laziness, not about why the skill layer is excluded). The other 14
entries had no hits. `docs/GLOSSARY.md` was surveyed but is deliberately not a
list entry (`docs/GLOSSARY.md:151`), so it is not a sweep verdict; it is covered
by the mirror survey instead.

**No ⚠️ superseded-claim pointer written.** This closure falsifies no factual
claim in an archived note. [[CORE-489.N]]'s Finding 2 — *"no Phase 4 sweep …
reaches it"* — is still true, since the skill layer stays excluded; and its
follow-up #3 was a recommendation flagged *"genuinely optional"* with the
outcome left open, so declining it executes the ticket rather than overturning a
decision. No `supersedes:` either, for the same reason.

**Final Summary:**

Answered the question the ticket asked — *should the skill-layer sweep blindspot
get a guard?* — with **no**, and made the answer findable at the point of
exclusion instead of only in this tasknote.

The reason is evidence, not preference. All **63** `` `path.md` §"Section" ``
citations running from `claude/skills/*/SKILL.md` into swept docs resolve today;
a resolution scan's five misses were every one a matcher artifact (adopter
`.flowtron/core/` path prefix ×2, bold-line and bullet-lead anchors ×2, trailing
punctuation inside a closing quote ×1). More decisively, the guard targets the
wrong class: [[CORE-489.N]] Finding 2 — `ft-release/SKILL.md:567`, the miss that
filed this ticket — cited `§"AI-referenced docs"`, **a section that existed then
and exists now**. [[CORE-489.3]] falsified what the sentence *said* about that
section; the pointer never dangled. Citation rot and claim falsification are two
classes, and the proposed mechanism covers the one with zero instances while
missing the one with the instance.

Discovery then surfaced the real defect, which the PLAN line does not name:
`.flowtron/tasknote/README.md:67-70` gave *"loaded on demand by skill stubs"* as
the reason the skill layer sits outside the sweep set — 23 lines after
[[CORE-491]] established that lazy-loading is **not** a sweep-exclusion
criterion (`docs/VISION.md` is lazy *and* swept, by name). CORE-491 severed the
inference and left this paragraph reasoning from it, so *"why is the skill layer
excluded?"* had no valid written answer. That is the question this ticket asks.

One edit, `.flowtron/tasknote/README.md`, +17/−4, single wording-only hunk: the
exclusion is restated as a **volume** decision (~6,200 lines of `SPEC/*.md` +
`claude/skills/*/SKILL.md` against a ~4,100-line sweep set — roughly doubling a
per-task step Core Principle #3 keeps small), followed by a new **Accepted
residual risk** paragraph naming what the exclusion costs, its catch layer
(epic-audit, where CORE-489.N found it), the explicit statement that per-task
closure is *not* expected to catch this class, and CORE-492's declined guard
with the two facts that decided it.

Refactors: none. Deferred deliberately — `docs/GLOSSARY.md:13` and
`templates/tasknote-README.md` §"AI-referenced docs" both state the exclusion
without offering the invalidated rationale, so both are true as written; this is
the same test CORE-491 applied when it left Pair E:407 and
`docs/GLOSSARY.md:151` alone. Verification: full six-command validation set
green (481 viz tests, 37 updater tests, typecheck, lint, 2 × `node --check`),
`/ft-release` §7.1 Pair K1 and K2 both silent, and the citation scan re-run
post-edit (63 citations, none added). Documentation verdict: 18 of 18 sweep
entries no change.

Maintainability effect: a silent gap became a declared one. The next auditor who
notices that skill bodies make claims about swept docs finds the weighing —
what it costs, what catches it, why the obvious guard was declined — instead of
re-deriving it and re-filing the ticket, which is the loop CORE-489.N's
follow-up list was already one turn into.

**Archived:** 2026-08-29
