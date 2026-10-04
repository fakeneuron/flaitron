---
title: unattended-filing-authority
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: []
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

# CORE-551 | unattended-filing-authority

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-429]] [[CORE-529]]

## 🎯 Goal

Make the deferred hand-off filing duty that `SPEC.md` §"Deferred hand-off
filing" imposes at every closure actually dischargeable by an operator-less
run, by giving `/ft-file-followup` a real `--unattended` mode and grounding
its filing commit in the SPEC duty rather than in an operator act.

## ✅ Acceptance

- [x] `/ft-file-followup` Step 0 recognizes `--unattended` as a real flag (not an unknown arg), sets `unattended-mode = true`, and emits an inline marker naming what the posture changes
- [x] `--park --unattended` is refused terminally — park mode preserves an operator's mid-session thought and presumes an operator having it
- [x] Under `--unattended`: Step 1 auto-allocates the ID deterministically, Step 2's AskUserQuestion collection is suppressed in favour of an AI draft, and Step 3's review gate is suppressed
- [x] The filing-discipline cap still binds under `--unattended`: a >70w self-drafted description is redrafted once, then terminates readably rather than filing an over-cap row
- [x] The downstream-impact reconciliation scan still **runs** under `--unattended` but applies nothing — findings are reported to the absent operator, never acted on (gates.md: the posture removes pauses, never proof)
- [x] Step 1a pre-flight conflicts terminate and write nothing, in the posture's readable-stop shape
- [x] `SPEC/tasknote-selection.md` §"Filing commits" gains the unattended authority clause: the SPEC-imposed duty is the authorization when no operator act exists, with the four existing guardrails (explicit pathspecs, pre-check/skip-on-dirt, commit-never-push, no 🏁) held verbatim
- [x] `SPEC.md` §"Deferred hand-off filing" names `/ft-file-followup --unattended` as the discharge path when no operator is present
- [x] `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" gains the deferred-hand-off-filing item
- [x] `SPEC/gates.md` §"`--unattended` operator posture" → "Applies to" no longer omits `/ft-file-followup`
- [x] Frontmatter `description:` + `claude/commands/ft-file-followup.md` wrapper (`argument-hint` and body) stop implying the flag set is `[TASK-ID] [--park …]` only
- [x] Budgets hold: `SPEC.md` ≤ 50,000 and `SPEC/gates.md` ≤ 35,000 chars (`wc -c`), per `docs/CONTEXT-BUDGET.md`
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] `SPEC/tasknote-selection.md` §"Filing commits" — add the unattended authority clause + the `--park` refusal note
- [x] `SPEC.md` §"Deferred hand-off filing" — add the discharge-path sentence (budget: ≤998 chars of headroom)
- [x] `SPEC/gates.md` — extend the "Applies to" sentence only (budget: ≤134 chars of headroom)
- [x] `claude/skills/ft-file-followup/SKILL.md` — Step 0 parse + marker; Step 1 auto-allocate; Step 2 suppression + redraft rule; Step 3 scan-but-apply-nothing; Step 4 authority; Step 5 report shape
- [x] `claude/skills/ft-file-followup/SKILL.md` frontmatter `description:` + `claude/commands/ft-file-followup.md` wrapper
- [x] `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" — 4th item
- [x] Verify budgets with `wc -c`; repo-wide grep that no surface still calls `--unattended` an unknown arg on this skill
- [x] File the `/ft-epic-discovery` parallel-gap follow-up (operator-confirmed at Discovery)

## 🔗 Related

- [[CORE-429]] — `related-decision:` established §"Filing commits" and the operator-grounded commit authority this task extends
- [[CORE-529]] — `related-decision:` added `SPEC.md` §"Deferred hand-off filing", the duty this task makes dischargeable
- [[CORE-535.1]] — `depends-on:` set the `SPEC.md` / `gates.md` byte budgets that constrain this task's edit sizes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three symptoms in the PLAN.md line verified live against current
  sources (see Discovery Notes); the line diagnoses accurately and prescribes no fix,
  so choosing between the two candidate designs sits inside its stated problem rather
  than beyond it. Two further factors surfaced during Discovery — the
  "Ban collateral Completed flips" reading and the `SPEC.md` / `gates.md` byte budgets
  — constrain *how* the fix is shaped but do not change *what* the task is for.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Relevance:** Proceed — all three symptoms named in the PLAN.md line verified live
against current sources; no drift.

**Symptom verification (drift check):**
1. `claude/skills/ft-file-followup/SKILL.md:42` — `--unattended` falls into the
   "Any other `--`-prefixed token" branch, which surfaces a usage notice **and asks
   via AskUserQuestion**. Under the posture that is an ask into an empty session:
   a hang, which is precisely the failure `--unattended` exists to prevent.
2. `SPEC/tasknote-selection.md:145-152` §"Filing commits" — commit authority is
   grounded entirely in operator acts ("the operator already confirmed at the review
   gate … by passing the park flag and answering the priority question … or at
   `/ft-audit`'s write-step confirmation"). No unattended run performs any of these,
   so no authority exists for the filing commit.
3. `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" —
   lists the paper-complete guard's three parts plus downstream-impact reconciliation.
   Omits `SPEC.md` §"Deferred hand-off filing", leaving open the (wrong) reading that
   the duty lapses when no operator is present. It does not: the posture *raises* the
   count of deferred operator steps, since everything the run cannot do falls to the
   absent operator.

**Fourth factor, not named in the PLAN.md line.** `SPEC.md` §"Paper-complete guard"
§2's **"Ban collateral Completed flips"** bullet reads "Closure may flip only the
current task's PLAN line". A runner can reasonably read that as a blanket bar on
touching any other PLAN row at closure — a second, independent reason it cannot
discharge the duty. The rule in fact bans *Completed flips*, not an appended
unchecked row; worth keeping in view even though Design B routes the write through
the filer rather than through closure directly.

**Fifth factor: byte budgets are a hard design constraint.** `docs/CONTEXT-BUDGET.md`
caps `SPEC.md` at 50,000 (currently 49,002 → **998 chars headroom**) and
`SPEC/gates.md` at 35,000 (currently 34,866 → **134 chars headroom**). Both are
release gates (`/ft-release` §7.1), and the "Known over budget" escape hatch is not
usable here: a row whose owner closes immediately becomes an unowned over-budget
surface, which *blocks* the cut. So `gates.md` gets a single-sentence correction and
nothing more, and `SPEC.md` gets one sentence. The substantive contract prose goes to
`SPEC/tasknote-selection.md` and the SKILL body, both uncapped or far under cap
(`ft-file-followup/SKILL.md` 16,031 / 30,000).

**Best Practices Review:** Contract + skill-body change; no code. Touched
responsibilities: the filing-commit authority contract (`tasknote-selection.md`), the
posture's never-relaxed set (`unattended-mode.md`), and one skill's arg parser and
step flow. Dependency direction preserved — SPEC modules stay authoritative, skill
bodies stay executable interpretations that cite them. No new abstraction; the
`--unattended` parse follows the existing unordered-flag-set idiom already used by
`--park` in the same Step 0 and by `--fast`/`--debug`/`--unattended` in `/ft-task`.

**Archive skim** (`grep -ln` on the three contract names across 723 notes in
`archive/core/`, 7 hits, all read):
- [[CORE-429]] — authored §"Filing commits". Its Acceptance explicitly fenced the
  change: *"Execution skills are untouched — `/ft-task`, `/ft-micro-task`, … keep
  their commit-go gate verbatim."* The fence is about execution skills, not about
  unattended filing, so extending the section for the posture does not reopen it.
- [[CORE-529]] — authored `SPEC.md` §"Deferred hand-off filing", motivated by
  caobunga CBN-120.2 F4 / adppro DATA-13.3. Carries a ⚠️ `Superseded by [[CORE-533]]`
  pointer (the adopter-ID citation was later stripped from contract prose — adopter
  task IDs stay in tasknotes, not in SPEC). Followed the pointer; the supersession
  touched only the citation, not the duty. Confirms the duty was written from a real
  adopter failure, which matches CBN-138.2 blocking on this task.
- [[CORE-455]], [[CORE-463.3]] — §"Filing commits" mentions only; nothing load-bearing.
- [[CORE-473.2]] / [[CORE-473.4]] / [[CORE-473.6]] — built the never-relaxes list.
  Establish its shape (paper-complete guard in full, then "Nor does it relax …" for
  non-guard items) — the shape the new 4th item follows.

**Design decision (operator-selected at Discovery).** Two designs were surfaced:
- **A — closure authors the row directly.** `SPEC.md` already words the duty as an
  instruction to Phase 4 ("file it as its own unchecked PLAN.md row"), so closure
  could simply append it inside the atomic closure commit: no new flag, no new commit
  authority, `/ft-file-followup`'s refusal becomes correct-by-design.
- **B — teach `/ft-file-followup` a real `--unattended` mode.** One filing path for
  every caller, at the cost of a new commit-authority clause.

**Operator chose B.** Recorded because A was the skill's recommendation; B is what
gets built, in full. B's cost — a second commit alongside closure — proved smaller on
inspection than first estimated: `/ft-file-followup` is *already* routinely invoked
from inside an active `/ft-task`, and its existing Step 4 pre-check
(`git status --porcelain -- .flowtron/PLAN.md`) makes the two cases converge without
new machinery. If closure has already staged its PLAN flip, the pre-check reads dirty,
sets `auto-commit = false`, and the hand-off row simply rides into the atomic closure
commit. If not, it commits standalone first and closure follows. Both orders are
already-supported behavior; atomicity is not weakened.

**Design points settled during Discovery (not in either preview):**
- **`--park --unattended` is refused.** Park mode exists to preserve an operator's
  tangential mid-session thought and resume their interrupted work inline; both halves
  presume a present operator. Refusing terminally is the posture's own idiom and is
  cheaper than inventing an unattended park.
- **Reconciliation runs but applies nothing.** `SPEC/gates.md` §"What `--unattended`
  never relaxes" holds the downstream-impact reconciliation user-confirm. In a filing
  motion there is no tasknote to park, so the resolution is to run the scan and report
  its findings to the absent operator while applying zero edits — consistent with
  `unattended-mode.md`'s "a park never performs the operator's motion", and with the
  posture's one-line summary: it removes *pauses*, never *proof*.
- **The >70w cap binds harder, not softer.** The description is now self-drafted, so
  breaching the cap is self-inflicted rather than an operator's input: redraft once,
  then terminate. Filing an over-cap row unattended would silently defeat the gate.

**Clarifying questions:** Asked two via AskUserQuestion (design fork; the adjacent
`/ft-epic-discovery` gap). Both answered — Design B, and file-don't-fix.

**Assumption on the blocked adopter.** caobunga CBN-138.2 lives outside this repo and
was not read (cross-repo paths are not opened without explicit approval). Assumed need:
"an operator-less worker must be able to file the deferred hand-off row." The PLAN.md
line's own framing supports this and nothing in the deliverable depends on details
beyond it.

**Parallel gap, deliberately out of scope.** `/ft-epic-discovery`'s Step 0 unknown-arg
branch has the identical hang: `SPEC/gates.md` §"`--unattended` operator posture"
states the skill "does not accept" the flag, but its parser would still fire
AskUserQuestion at an absent caller rather than terminating. Operator confirmed at
Discovery: file it as its own row at closure, do not widen this task.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** The `--unattended` parse extends the unordered-flag-set idiom
already in this file's Step 0 (used by `--park` and the four priority flags) rather
than introducing a parser shape; the terminal-stop marker reuses
`⏸ --unattended stop — <cause>: <one line>` verbatim from `unattended-mode.md`
§"Pre-scaffold stops", so no new cue glyph is minted and the two-banner cap is
untouched. The new `SPEC/tasknote-selection.md` prose sits inside the existing
§"Filing commits" and follows its bold-lead-in / rule / rationale shape, directly
above the §"Execution skills keep their commit-go gate" scope fence it parallels.

**Minimal refactor gate.** No refactor. Every edit is additive prose plus four
enumeration corrections that were factually wrong once the flag existed.

**Deliverable (12 files).**
- `claude/skills/ft-file-followup/SKILL.md` — the mode itself. Step 0 recognizes the
  flag, refuses `--park --unattended`, and emits the posture marker; Step 1
  auto-allocates instead of proposing a reviewable field; Step 1a's four pre-flight
  checks terminate-and-write-nothing instead of asking; Step 2 drafts all five fields
  and redraft-once-then-terminates on the 70w cap; Step 3 suppresses the review gate
  but keeps the reconciliation scan (report, apply nothing); Step 4 grounds the commit
  in the SPEC duty and makes item 3 a structural no-op; Step 5 becomes the absent
  operator's only record.
- `SPEC/tasknote-selection.md` §"Filing commits" — the "Unattended filing authority"
  clause: the duty authorizes, all four guardrails bind verbatim, plus the two limits
  (`--park` out of scope, reconciliation applies nothing).
- `SPEC.md` §"Deferred hand-off filing" — one sentence naming the discharge path and
  stating the duty binds an operator-less closure.
- `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" —
  the fourth item (the omission the PLAN.md line named).
- `SPEC/procedures/ft-task.md` — the same addition in the agent-neutral SOP, which is
  what a non-Claude unattended runner actually reads; names the flag as *the Claude
  spelling* of a neutral primitive, per the file's established convention.
- `SPEC/gates.md` — "Applies to" corrected. Held to **96 chars** against 134 of
  headroom; everything substantive was routed to uncapped surfaces for this reason.
- Wiring + dispatch surfaces: `claude/commands/ft-file-followup.md` (description +
  `argument-hint` + body), `codex/skills/ft-file-followup/SKILL.md`,
  `claude/skills/ft-flowtron/SKILL.md` roster row, `claude/CAPABILITIES.md` (both the
  `--unattended` and `--park` rows).
- Doc-drift: `docs/EXTERNAL-AGENTS.md` (stale "Four skills accept it" + a new step 8
  for the duty) and `docs/PLATFORMS.md` (three per-platform availability cells).

**Two CI gates proved the wiring edits load-bearing, not cosmetic.** The `drift` job's
**Pair B** (Claude skill `description:` flags ↔ Codex wrapper description flags) and
**Pair E** (roster flag coverage) both extract `--[a-z-]+` from frontmatter and diff
the sets. Adding `--unattended` to the Claude description alone would have failed both;
the codex-wrapper and `ft-flowtron` roster edits are what keep them green.

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

No code changed — contract, skill-body, and doc surfaces only — so `npm --prefix viz`
(test / typecheck / lint) and `node --test tools/update-adopters.test.mjs` are **N/A**:
`git status --porcelain` confirms nothing under `viz/` or `tools/` was touched. The
narrowest validation that actually covers this change is the CI `drift` job, run in
full locally:

| Check | Result |
|---|---|
| Wrapper-name invariant (`SPEC/layout.md` §"Skill namespace") | PASS |
| Shipped-skill parity (`claude/skills` ↔ `codex/skills`) | PASS |
| Pair A — templates roster clause across three surfaces | PASS |
| Pair B — Claude skill flags ↔ Codex wrapper descriptions | PASS |
| Pair C — template back-link depth | PASS |
| Pair E — ft-flowtron roster row coverage | PASS |
| Pair E — ft-flowtron roster flag coverage | PASS |

Flag extraction verified non-vacuous rather than trusting a green diff of two empty
sets: both descriptions resolve to `[--park --unattended]` and the roster row to
`[--fut --high --low --med --park --unattended]`.

**Byte budgets** (`docs/CONTEXT-BUDGET.md`, a release gate at `/ft-release` §7.1):

| Surface | After | Cap |
|---|---|---|
| `SPEC.md` | 49,285 | 50,000 |
| `SPEC/gates.md` | 34,963 | 35,000 |
| `claude/skills/ft-file-followup/SKILL.md` | 23,648 | 30,000 |

Every other `claude/skills/*/SKILL.md` re-checked against its cap (40,000 for
`ft-release`, 30,000 otherwise) — none over.

**Quality assertions.** No duplication introduced: each contract statement has one
canonical home (`tasknote-selection.md` for the authority, `SPEC.md` for the duty) and
every other surface cites rather than restates it. No dead prose, no public-surface
growth beyond the one flag the task exists to add. One clause was rewritten during
Phase 3 for precision — "suppresses neither the scan nor its confirm" read as
self-contradictory next to "applies nothing", and now says the confirm is *unavailable
rather than waived*.

**`.editorconfig`** verified across all 13 touched files: LF, final newline, no
trailing whitespace.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-file-followup` now accepts `--unattended`, closing the gap where `SPEC.md`
§"Deferred hand-off filing" imposed a filing duty on every closure that an
operator-less run had no way to discharge. 12 files: the mode in the skill body, the
commit-authority clause in `SPEC/tasknote-selection.md` §"Filing commits", the duty's
unattended-invariance in `SPEC.md` + `unattended-mode.md` + the agent-neutral SOP, and
seven wiring/doc surfaces whose skill enumerations the new flag falsified.

**Design.** Two shapes were surfaced at Discovery; the operator chose teaching the
filer a real `--unattended` mode over having closure author the row directly. Its one
real cost — a second commit alongside the atomic closure commit — dissolved on
inspection: `/ft-file-followup` is already routinely invoked from inside an active
`/ft-task`, and its existing Step 4 pre-check makes both orderings converge with no
new machinery. Invoked from a closure that has already staged its PLAN flip, the
pre-check reads dirty, sets `auto-commit = false`, and the row rides into the atomic
commit; from a clean tree it commits standalone and closure follows. `SPEC.md`
§"Paper-complete guard" §2 is unaffected either way.

**What the posture does not buy.** The filing-discipline cap, the reconciliation scan,
the pre-check, explicit-pathspec staging, commit-never-push, and no-🏁 all bind exactly
as attended. Four questions it cannot answer — ambiguous area, ID collision,
still-over-cap description, `--park --unattended` — terminate with a one-line
`⏸ --unattended stop` and write nothing, rather than being answered on the absent
operator's behalf. The 70w cap in fact binds *harder*: the description is now
self-drafted, so a breach is redraftable rather than an operator's input.

**Maintainability effect.** The `--unattended` surface is now enumerated consistently
across all seven places that name it, and two CI gates (Pair B, Pair E) mechanically
hold three of those in sync from here on. `SPEC/gates.md` closed at 34,963/35,000 —
**37 chars of headroom**, tight enough that the next edit there will need a trim or a
split; flagged for the operator rather than acted on.

**Deferred, filed rather than left as prose** (`SPEC.md` §"Deferred hand-off filing",
the very contract this task services): `/ft-epic-discovery` has the identical parser
hang — `SPEC/gates.md` states it "does not accept" the flag, yet its Step 0 unknown-arg
branch would still fire AskUserQuestion at an absent caller. Operator confirmed at
Discovery to file rather than fix; filed as [[CORE-552]].

**Archived:** 2026-09-09
