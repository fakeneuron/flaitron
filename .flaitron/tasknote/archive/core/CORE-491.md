---
title: vision-sweep-role-split
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-489.3, CORE-489.N, CORE-194.1]
touches:
  - .flowtron/tasknote/README.md
  - templates/tasknote-README.md
  - docs/CONVENTIONS.md
  - docs/GLOSSARY.md
  - claude/skills/ft-release/SKILL.md
supersedes:
  - CORE-194.1
---

# CORE-491 | vision-sweep-role-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-489.3]] · [[CORE-489.N]] · [[CORE-194.1]]

## 🎯 Goal

Decide whether `docs/VISION.md` belongs on the AI-referenced-docs list, split
that list's two conflated roles (cold-start ground truth vs. Phase 4 doc-drift
sweep set), and reword the two stranded claims that no longer match.

## ✅ Acceptance

- [x] `.flowtron/tasknote/README.md` §"AI-referenced docs" header defines the list by its **sweep** role and states that membership does not imply cold-start loading (cold-start is a per-doc property); the section's closing paragraph no longer calls the list a "cold-start sweep"
- [x] `docs/VISION.md` remains on the list, its one-line purpose marking it lazy / swept-but-not-cold-start
- [x] `docs/CONVENTIONS.md:70` no longer claims `VISION.md` is outside the list; its actual argument (a mid-task assistant shouldn't have to load VISION to learn a scheduler is out of scope) survives and is true as written
- [x] `claude/skills/ft-release/SKILL.md` Pair K no longer claims the sweep never walks `docs/VISION.md`; Pair K's justification for existing survives the correction
- [x] `templates/tasknote-README.md` §"AI-referenced docs" header mirrors the reworded framing, so adopters are not shipped the conflation
- [x] `docs/GLOSSARY.md:13` defines **AI-referenced docs** by the sweep role without asserting the cold-start role
- [x] The overturn of `CORE-194.1` Q3 is recorded explicitly (YAML `supersedes:` + `## 🔗 Related` type hint + Implementation Notes), per SPEC §"Tasknote frontmatter" superseded-decision handling
- [x] No entry on the list is reordered, added, or removed beyond the VISION.md annotation — `git diff` shows wording-only hunks

## 🧩 Subtasks

- [x] Reword `.flowtron/tasknote/README.md` §"AI-referenced docs" header + closing paragraph to the sweep-set framing
- [x] Annotate the `docs/VISION.md` entry on that list as lazy / swept-not-cold-start
- [x] Mirror the header reword into `templates/tasknote-README.md` §"AI-referenced docs"
- [x] Reword `docs/CONVENTIONS.md:70`'s stranded parenthetical
- [x] Reword `claude/skills/ft-release/SKILL.md:567` (Pair K) closing clause
- [x] Update `docs/GLOSSARY.md:13`'s **AI-referenced docs** definition
- [x] Record the `CORE-194.1` Q3 overturn (YAML `supersedes:` already set; add Related type hint + Implementation Notes rationale)
- [x] Phase 3: run the repo validation commands + the `/ft-release` §7.1 Pair K greps locally

## 🔗 Related

- [[CORE-489.3]] — added `docs/VISION.md` to the AI-referenced-docs list; the change this task revisits
- [[CORE-489.N]] — epic audit that surfaced the conflated-roles finding and filed this task
- [[CORE-194.1]] — `supersedes:` Q3 resolved "VISION stays lazy" and encoded "VISION.md **NOT** added"; this task overturns the list-membership half while preserving the lazy-loading half

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three cited facts verify at HEAD. `docs/VISION.md` is entry
  18 on `.flowtron/tasknote/README.md` §"AI-referenced docs" (added by
  [[CORE-489.3]]); `docs/CONVENTIONS.md:70` and
  `claude/skills/ft-release/SKILL.md:567` both still assert the opposite. The
  decision the task exists to make has genuinely never been put to the operator
  — [[CORE-489.N]] declined an inline fix precisely so it would not be ratified
  silently. Nothing about the task has gone stale in the day since filing.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

  Read: `.flowtron/tasknote/README.md` §"AI-referenced docs" (:34-62 incl.
  closing paragraph), `docs/CONVENTIONS.md` §"Canonical source with labeled
  mirrors" (:63-76), `claude/skills/ft-release/SKILL.md` §7.1 Pair K (:567-585)
  and Pair E (:407), `templates/tasknote-README.md` §"AI-referenced docs"
  (:59-72), `docs/GLOSSARY.md` (:13, :47, :55, :83, :151), `docs/VISION.md`
  (headings), `SPEC.md` §"🚀 Phase 4: Closure" + §"Tasknote frontmatter",
  `SPEC/epic.md:93`. Probe not warranted — the read set was enumerable by one
  `grep -rn "AI-referenced"` and small enough to hold.

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  `N/A` for module boundaries — markdown prose only, no code path. The relevant
  discipline is flowtron's own §"Canonical source with labeled mirrors"
  convention (the section this task edits): the README section is the canonical
  statement of what the list *is*, and `templates/tasknote-README.md` +
  `docs/GLOSSARY.md:13` are its labeled mirrors. Rewording the canonical
  statement without its mirrors is exactly the drift class that produced this
  task, so the mirror set is in scope by the repo's own convention rather than
  as scope creep. No refactor; no restructuring of the list itself.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

  `grep -l` over `.flowtron/tasknote/archive/core/*.md` for `AI-referenced` and
  `VISION`. Load-bearing hits read in full: **[[CORE-194.1]]** (Q3 resolution —
  its CORE-194.2 acceptance line :166 reads "`VISION.md` **NOT** added (lazy per
  Q3 resolution)"; the rationale given at :141 is "SPEC is always-loaded; VISION
  is lazy" — a *cold-start* argument, never a sweep argument);
  **[[CORE-489.3]]** (its Implementation Notes :85 state the motive as "Closes
  the gap where the doc-drift sweep (Phase 4 + epic audits) never walked
  flowtron's own canonical scope-boundary statement" — a *sweep* argument, and
  its Discovery shows no awareness Q3 existed); **[[CORE-489.N]]** (:114-122,
  :167-169 — the three findings, the root-cause diagnosis, and the explicit
  decision to leave both mirrors unedited pending this task). Also skimmed
  CORE-487 (minted the labeled-mirror convention) and CORE-201 /
  `PLAN-ARCHIVE.md:382` (`ft-audit` scope vs. AI-referenced-docs reconciliation
  — no bearing on the roles question).

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

  **Code half — all citations exact.** `docs/CONVENTIONS.md:70` and
  `claude/skills/ft-release/SKILL.md:567` are both precisely the lines named in
  the PLAN.md description; both still assert the falsified claim verbatim.
  `docs/VISION.md` is present on the list.

  **Cross-artifact half — one finding, decisive.** Enumerated every reference to
  the list (`grep -rn "AI-referenced" --include="*.md"`, archive excluded): 20+
  consumers across `SPEC.md:819`, `SPEC/epic.md:93`,
  `SPEC/procedures/ft-task.md:318`, `/ft-close-epic` (×4), `/ft-micro-task`,
  `/ft-goal-task`, `/ft-epic-discovery` (×2), `/ft-release` (:119, :245),
  `/ft-audit passes/docs.md`, `docs/MIGRATION.md:273`, `/ft-new-project:136`,
  and both templates. **Every one of them uses the list for the doc-drift sweep
  and nothing else.** No mechanism anywhere reads this list to decide what to
  load at cold start — cold-start loading runs through `AGENTS.md` → `SPEC.md`,
  which the list's own `SPEC.md` entry already describes as the "primary AI
  cold-start surface". The "cold-start ground truth" half of the header is
  therefore descriptive prose that was never enforced, which is why the two
  roles could conflate without anything breaking. No contradiction with any SPEC
  contract; the plan matches the PLAN.md line, extended per the operator's Q3
  answer below.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Three questions put to the operator via AskUserQuestion — the decision
  [[CORE-489.N]] deliberately reserved. All three resolved to the recommended
  branch:

  1. **Does `docs/VISION.md` stay on the list?** → **Keep it.** [[CORE-489.3]]
     stands; the overturn of Q3's membership instruction is recorded explicitly
     rather than left silent.
  2. **How are the two roles disentangled?** → **Rename to the sweep set.** One
     flat list, header reworded to define membership as "swept for drift";
     cold-start loading becomes an orthogonal per-doc property. No subsections,
     no per-entry flags, no validator — consistent with Core Principles #1/#2
     and with the fact that no consumer needs the distinction structurally.
  3. **How far does the rewording reach?** → **The two named claims + the
     adopter template + `docs/GLOSSARY.md:13`.** `/ft-release` Pair E:407's
     "cold-start doc sweep" phrase and `docs/GLOSSARY.md:151`'s "must never be
     added" rationale are left alone: both are *true* as written, and editing
     accurate prose is outside this task's remit.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The two decisions were never actually in conflict.** [[CORE-194.1]] Q3
defended *"VISION is not loaded at cold start"* — still true after this task.
[[CORE-489.3]] fixed *"VISION is never swept for drift"* — also true, and the
gap was real. Only the shared list header made them look contradictory, by
binding one membership decision to two independent properties. This is why
[[CORE-489.N]] found "both are correct about different things" and why the
reversal read as a routine gap-fill to its author.

**What actually gets overturned.** Q3's *substance* (VISION stays lazy) is
preserved verbatim by this task. What is overturned is the membership
instruction CORE-194.2's acceptance line encoded from it — "`VISION.md` **NOT**
added" — which only followed from Q3 because the list conflated the roles. Per
SPEC §"Tasknote frontmatter", a superseded *decision* is recorded with YAML
`supersedes:` on the later note, never with a ⚠️ pointer on the old one (the
worked example there — CORE-159 overturning CORE-157's exclusion of
`docs/PLATFORMS.md` — is the same shape). No archived note states a falsehood:
CORE-194.1 is an accurate record of what was decided, and CORE-489.N's summary
was accurate when written. **No ⚠️ superseded-claim pointer is written by this
closure.**

**Mirror set is convention-mandated, not scope creep.** `docs/CONVENTIONS.md`
§"Canonical source with labeled mirrors" — the section carrying one of the two
stranded claims — is the repo's own rule that a canonical statement's
restatements move with it. `templates/tasknote-README.md:60` carries the
conflated header sentence nearly verbatim and ships it to every adopter;
`docs/GLOSSARY.md:13` is the term's definition. Leaving either would reproduce
the exact failure this task closes.

**Deliberately not touched.** `/ft-release` §7.1 **Pair E**:407 ("excluded from
`.flowtron/tasknote/README.md`'s cold-start doc sweep as lazily-loaded") — the
claim is true under both readings, since `claude/skills/*` is outside both
roles. `docs/GLOSSARY.md:151` (GLOSSARY "must never be added to the AI-referenced
docs list") — also true, and whether GLOSSARY should now be *swept* is a
separate question this task does not open. Both use the old vocabulary without
asserting anything false; per the operator's Q3 answer they stay.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

  Extended flowtron's own §"Canonical source with labeled mirrors" pattern
  rather than inventing one: the README section is the canonical statement, and
  `templates/tasknote-README.md` + `docs/GLOSSARY.md:13` are its labeled
  mirrors, each restating the rule *as it bears on its own surface* (adopter
  seed / term definition) rather than copying the canonical paragraph. The
  README's VISION.md entry annotation follows the existing "`path` — one-line
  purpose" style. No structural change to the list.

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

  No refactor. Five wording-only edits, +27/−15 across five files; the list
  itself is untouched apart from the VISION.md entry's trailing clause.
  Deferred by operator decision (Q3): `/ft-release` Pair E:407 and
  `docs/GLOSSARY.md:151`, both of which use the old vocabulary but state
  nothing false.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose only, no code path changed. The standing guards for these surfaces are `/ft-release` §7.1 Pair K and the CI `drift` job, both run in Phase 3.

**Implementation Notes:**

Five edits, +27/−15:

1. **`.flowtron/tasknote/README.md:34-70`** — §"AI-referenced docs" header now
   defines the list by its sweep role, with a second paragraph stating that
   membership means *swept for drift*, not *loaded at cold start*, and naming
   the two properties as independent (`SPEC.md` cold-start + swept;
   `docs/VISION.md` lazy + swept). The section's closing paragraph drops
   "default cold-start sweep" for "outside this sweep set", noting `SPEC/*.md`
   and `claude/skills/*` are excluded on both counts. The `docs/VISION.md`
   entry gains "Lazy-loaded: swept, not cold-start".

2. **`templates/tasknote-README.md:59-72`** — same reframing in the adopter
   seed, in the shorter shape that file uses (a lazy doc that drifts belongs on
   the list; an always-loaded doc that never drifts need not). Without this the
   conflation would keep shipping to every adopting project.

3. **`docs/CONVENTIONS.md:70`** — the parenthetical "deliberately *outside* the
   cold-start doc set" becomes "deliberately lazy, never read at cold start",
   with the citation retained and qualified. The bullet's actual argument — a
   mid-task assistant shouldn't have to load VISION to learn a scheduler is out
   of scope — is unchanged and now true as written.

4. **`claude/skills/ft-release/SKILL.md:567`** — Pair K's closing clause no
   longer claims the sweep "never walks `docs/VISION.md` at all". It now says
   the sweep walks VISION for staleness but is blind to whether the citations
   *pointing at* it still resolve. Pair K's justification for existing is not
   just preserved but sharpened: reading a doc for drift says nothing about
   labels held in five other files, which is precisely the gap Pair K closes.

5. **`docs/GLOSSARY.md:13`** — the **AI-referenced docs** definition states the
   sweep role and the independence of the two properties; the `SPEC/` +
   `claude/skills/*` exclusion becomes "excluded on both counts".

**Overturn recorded (Acceptance #7).** YAML `supersedes: [CORE-194.1]` +
the `## 🔗 Related` type hint. The overturn is partial and worth being precise
about: [[CORE-194.1]] Q3's *substance* — VISION stays lazy — survives this task
intact and is now stated more explicitly than before. What is overturned is the
membership instruction CORE-194.2's acceptance encoded from it ("`VISION.md`
**NOT** added"), which followed from Q3 only because the list conflated the two
roles. [[CORE-489.3]] made that change correctly but without citing Q3; this
task supplies the citation and the reasoning. Per SPEC §"Tasknote frontmatter",
a superseded *decision* takes `supersedes:` on the later note and **not** a ⚠️
pointer on the old one — the CORE-159 / CORE-157 `docs/PLATFORMS.md` precedent
is the same shape. No archived note states a falsehood, so this closure writes
no ⚠️ superseded-claim pointer.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

  `N/A` for code — markdown prose only. Doc-facing equivalents asserted from
  the diff: no new structure (the list stays flat, no subsections, no per-entry
  flags, no validator — Core Principles #1/#2 hold); no duplication added (the
  two mirrors restate the rule for their own surface rather than copying the
  canonical paragraph, per §"Canonical source with labeled mirrors"); no list
  entry reordered, added, or removed — `git diff` shows exactly one `- \`` hunk,
  the VISION.md entry's trailing clause; and every remaining "cold-start"
  mention in the tree was re-read and verified true.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend surface changed; `viz/` untouched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Full repo validation set (AGENTS.md §"Validation") — all green.**

- `npm --prefix viz test` → 481 passed / 25 files, 0 failed
- `npm --prefix viz run typecheck` → clean (`tsc --noEmit`)
- `npm --prefix viz run lint` → clean (`eslint src`)
- `node --test tools/update-adopters.test.mjs` → 37 passed, 0 failed
- `node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs` → OK

**Targeted checks for the surfaces actually edited.**

- **`/ft-release` §7.1 Pair K1** (every `PR-rejection mirror of "…"` citation in
  `SPEC.md` resolves to a live bullet lead) → printed nothing.
- **Pair K2** (`docs/EXTERNAL-AGENTS.md`, `SPEC/gates.md`, `SPEC/loop.md` each
  still name `VISION.md` in their restating section) → printed nothing. Both
  matter here because the Pair K rationale is one of the two edited claims.
- **Residual-falsehood sweep** — `grep -rn -i "cold.start"` across all non-archive
  markdown. Nine hits remain, each re-read and verified true: the two reworded
  claims, `docs/GLOSSARY.md:13` and `:83`, three lines in the reworded README
  section, `templates/tasknote-README.md:69`, the `PLAN.md` line for this task,
  and `/ft-release` Pair E:407 (deliberately untouched per Q3 — accurate, since
  `claude/skills/*` is outside both roles).
- **Claim arithmetic** — the new Pair K clause says the labels are "held in five
  other files"; verified against `docs/CONVENTIONS.md:67`, which enumerates
  exactly five (`SPEC.md`, `SPEC/loop.md`, `SPEC/gates.md`,
  `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  18 entries, per-entry verdict:

  - `docs/CONVENTIONS.md` — **updated** (:70, the stranded claim; see
    Implementation Notes #3)
  - `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`,
    `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`,
    `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `CONTRIBUTING.md`,
    `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`,
    `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`,
    `docs/WORKTREES.md`, `docs/VISION.md` — **no change** (17 entries).

  Each was grepped for `AI-referenced` / `cold.start` / `doc-drift sweep`; the
  only non-zero hits besides CONVENTIONS were `SPEC.md:819` and
  `docs/MIGRATION.md:236,273`, all three read in full and all three already
  sweep-role framing with no cold-start claim. `docs/VISION.md` itself makes no
  claim about its own list membership. `claude/CAPABILITIES.md`'s stamp reads
  `v5.21.0 · 2026-08-27 (dogfooded)` — current for this release line, no bump in
  this change. `docs/GLOSSARY.md` was edited but is deliberately **not** a list
  entry (`docs/GLOSSARY.md:151`), so it is not a sweep verdict.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Settled a decision that had been left explicitly open: `docs/VISION.md` stays on
the AI-referenced-docs list, and the list stops claiming a second role it never
actually had. The decisive Discovery finding is that **nothing in flowtron loads
this list at cold start** — all 20+ consumers use it for one thing, the Phase 4
and epic-audit doc-drift sweep — so "cold-start ground truth" was descriptive
prose that was never enforced. That is why [[CORE-194.1]] Q3 (VISION stays lazy)
and [[CORE-489.3]] (VISION should be swept) could both be right while appearing
to contradict each other: one membership decision was carrying two independent
properties.

Five wording-only edits, +27/−15 across five files, no structural change:
`.flowtron/tasknote/README.md` (header + closing paragraph + the VISION.md
entry), `templates/tasknote-README.md` (the adopter mirror, so the conflation
stops shipping), `docs/CONVENTIONS.md:70` and
`claude/skills/ft-release/SKILL.md:567` (the two stranded claims [[CORE-489.N]]
found), and `docs/GLOSSARY.md:13` (the term's definition). The Pair K reword is
the one that gained something: it now names why a sweep of `VISION.md` still
leaves Pair K necessary — reading a doc for drift says nothing about the labels
pointing at it from five other files.

Refactors: none; the list stays flat, with no subsections, per-entry flags, or
validator, per the operator's chosen shape and Core Principles #1/#2. Deferred
by operator decision: `/ft-release` Pair E:407 and `docs/GLOSSARY.md:151`, which
use the old vocabulary but assert nothing false. Verification: full validation
set green (481 viz tests, 37 updater tests, lint + typecheck + 2 syntax checks),
Pair K1 and K2 both silent, and a tree-wide `cold.start` sweep with all nine
surviving hits individually re-read and confirmed true. Documentation verdict: 1
of 18 sweep entries updated, 17 no change. The overturn of Q3's membership
instruction is recorded via YAML `supersedes:` rather than a ⚠️ pointer, since a
changed decision is not a falsified fact (SPEC §"Tasknote frontmatter"; the
CORE-159 / CORE-157 precedent).

Maintainability effect: the next reader of the list learns what membership does
and does not imply from the list itself, so adding a lazy-but-drifting doc no
longer reads as a reversal — which is the specific misreading that cost
`CORE-EPIC-489` an audit cycle and stranded two claims for a day.

**Archived:** 2026-08-29
