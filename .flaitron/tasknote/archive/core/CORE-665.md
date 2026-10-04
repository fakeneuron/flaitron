---
title: phase1-attended-park
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-660, CORE-030, CORE-473.3]
touches:
  - SPEC/blocked.md
  - SPEC/gate-postures.md
  - SPEC.md
  - docs/GLOSSARY.md
  - .flowtron/tasknote/CORE-660.md
  - .flowtron/PLAN.md
---

# CORE-665 | phase1-attended-park

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-660]]

## 🎯 Goal

Resolve the contradiction in `SPEC/blocked.md` §"Phase 1 entry" — attended
Re-scope deletes the scaffolded tasknote "because Phase 1 holds nothing worth
preserving", while the `--unattended` carve-out preserves exactly that Phase 1
— by either widening the preservation to the attended path or stating why
attended differs.

## ✅ Acceptance

- [x] `SPEC/blocked.md` §"Phase 1 entry" offers both dispositions at the 🛠️ gate — `grep -q '\*\*Delete and halt\*\* —' SPEC/blocked.md && grep -q '\*\*Park\*\* —' SPEC/blocked.md` (command corrected at Phase 3 — see Testing Notes)
- [x] The mid-Phase-2 reservation is gone from the Phase-1 path — ``grep -c 'blocked` is reserved for mid-Phase-2' SPEC/blocked.md`` returns 0 (command corrected at Phase 3 — the Discovery form also matched this task's own negation)
- [x] The `--unattended` carve-out reads as the no-operator special case, not as an exception to a reservation — `grep -c 'The reservation above holds' SPEC/blocked.md` returns 0
- [x] `SPEC/gate-postures.md`'s widening paragraph no longer rests on the retired premise — `grep -c 'scopes .status: blocked. to mid-Phase-2' SPEC/gate-postures.md` returns 0
- [x] No stale `(mid-Phase-2 park)` gloss anywhere — `grep -rn '(mid-Phase-2 park)' SPEC.md SPEC/ docs/` returns nothing
- [x] [[CORE-660]] re-coded to the Phase-1 code — `grep -q '^park-reason: drift — ' .flowtron/tasknote/CORE-660.md`
- [x] No runner wiring changed — `git diff --name-only HEAD` lists no `claude/skills/` or `SPEC/procedures/` path (both defer to `blocked.md` on this branch; a change here would mean the deferral broke)
- [x] Every section anchor this task cites or rewrites still resolves — `judgment`: link targets are markdown headings and bold-leads, which no single command validates across files

## 🧩 Subtasks

- [x] Rewrite `SPEC/blocked.md` §"Phase 1 entry (Re-scope path)": 🛠️ gate fires (Re-scope always does), operator picks delete-and-halt or park; `Blocked by [[ID]]` and the three-verdict count unchanged
- [x] Reframe §"Phase 1→2 boundary park" as the no-operator special case — unconditional park, deferred PLAN edit — dropping "the reservation above holds"
- [x] Update the two-signal table row for `status: blocked` (currently "Mid-Phase-2 transition")
- [x] Update the `drift` row / §"drift vs dependency" if the widened path changes what they claim
- [x] Rewrite `SPEC/gate-postures.md` §"Widening of the mid-Phase-2 scoping" — its premise (blocked.md scopes to mid-Phase-2) is retired by this task
- [x] Drop the stale `(mid-Phase-2 park)` gloss in `SPEC.md` §"Tasknote frontmatter" and `docs/GLOSSARY.md`
- [x] Re-code [[CORE-660]]'s `park-reason:` from `dependency` to `drift`
- [x] Phase 3: verify anchors, inbound citations, and that no runner surface needed an edit

## 🔗 Related

- [[CORE-660]] — filed this task from its own 🛠️ gate; the live instance of the undescribed state, and the note re-coded here
- [[CORE-030]] — set the delete-and-halt motion (v0.6.0), operator-chosen, on the rationale this task retires
- [[CORE-473.2]] / [[CORE-473.3]] — argued the same widening and scoped it to `--unattended` for epic remit; `related-decision:`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line 18 is current, unchecked, under `## Medium`. The
  contradiction it names is real and verbatim: `SPEC/blocked.md:32-34` deletes
  the tasknote because "a Phase 1 blocker has no Phase 2 work to preserve",
  and `:47-49` says the opposite at the same boundary. [[CORE-660]] sits in
  the resulting undescribed state today. The line's own two alternatives —
  widen, or state why attended differs — are the decision this task makes.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**The contradiction, verbatim.** `SPEC/blocked.md` §"Phase 1 entry (Re-scope
path)" (lines 29-39): on a Phase-1 blocked prerequisite, add `Blocked by
[[ID]]`, *"delete the just-scaffolded tasknote, and halt. `status: blocked` is
reserved for mid-Phase-2 parking — a Phase 1 blocker has no Phase 2 work to
preserve."* §"Phase 1→2 boundary park (`--unattended` only)" (lines 41-51),
eleven lines below: *"Phase 1 is complete at that boundary and its Discovery
is exactly the work worth preserving — the reasoning behind the reservation
holds and the scoping widens by one position."* Both describe the same
boundary; only the flag differs.

**Provenance — the widening has already been argued twice, never on its
merits limited to attended.**

- [[CORE-030]] (v0.6.0) introduced the whole §"Blocked tasks" contract. Its
  Final Summary records delete-and-halt as design point 1 of an
  operator-clarified AskUserQuestion, chosen to hold the verdict count at
  three. The rationale was asserted at design time against a Phase 1 that, in
  v0.6.0, carried far less than today's checklist — no archive skim, no drift
  check, no populated Acceptance.
- [[CORE-473.2]] hit the contradiction head-on and *handed it forward*:
  "`SPEC/blocked.md:36-37` currently scopes `status: blocked` to mid-Phase-2
  parking … The 🛠️ conversion parks at the **Phase 1→2 boundary**, where Phase
  1 *is* complete and its Discovery is exactly the work worth preserving.
  `.2` names this widening in `SPEC/gates.md`; reflecting it into
  `SPEC/blocked.md` is `.3`'s edit."
- [[CORE-473.3]] made that edit — but the epic's remit was the `--unattended`
  posture, so the widening landed scoped to operator-less runs. The scoping is
  an artifact of which epic did the work, not a finding that attended differs.

**The live instance.** [[CORE-660]] ran attended yesterday, reached the Phase
1→2 boundary, and its Discovery had produced a window measurement, an
inbound-reference table, a provenance trim axis, and two drift findings. The
prescribed delete-and-halt would have discarded all four. The operator chose a
park; the note's own Discovery Notes record the deviation and filed this task
rather than leaving it silent.

**Why "state why attended differs" does not survive contact.** The only
candidate reason is that an operator can re-run Discovery, so the loss is
recoverable. It is not a difference between the two paths: Discovery costs the
same tokens and the same reads whoever is watching, and `--unattended`'s
carve-out does not justify itself by absence-of-operator either — it justifies
itself by *"Phase 1 is complete at that boundary"*, a fact about the workflow,
not about who is in the room.

**Resolution (operator, 2026-09-22, structured ask).** Widen, in the shape
that keeps a real attended/unattended distinction rather than erasing one: a
Re-scope verdict **always** fires 🛠️ (`SPEC/gates.md` §"Phase 1→2 exit gate",
`default-skip` flavor, "Always fire 🛠️"), so the gate is already the place the
operator is present. It presents both dispositions — delete-and-halt when
Discovery produced nothing, park when it produced work — and the operator
picks. Under `--unattended` there is nobody to pick, so the park is
unconditional and the PLAN.md edit defers. Two dispositions on the attended
path, one on the unattended; no fourth Phase-1 verdict either way. A first
framing of the question conflated "operator" with the `[unattended]` row
marker and was re-asked plainly before the answer was taken.

**Park code (operator, same ask).** An attended Phase-1 park writes `drift`.
§"drift vs dependency" already settles this — *"the code names what stopped
the run, not what motivated it. A `Re-scope` verdict parks as `drift` even
when a dependency drove the verdict"* — so the widened path needs no new code
and the closed set stays at eight. [[CORE-660]] currently reads `dependency`,
written before any rule covered its state; it is re-coded to `drift` here. The
note is active, not archived, so the write is ordinary lifecycle rather than a
retroactive edit.

**Inbound surfaces (checked, not recalled).**

| Surface | Bearing | Verdict |
|---|---|---|
| `SPEC/gate-postures.md:232-237` §"Widening of the mid-Phase-2 scoping" | Rests on the premise *"blocked.md scopes `status: blocked` to mid-Phase-2"* | **Stale after this task** — rewrite |
| `SPEC.md:149` (`blocked-by:` row) | Glosses `status: blocked` as "(mid-Phase-2 park)" | **Stale** — reword the gloss |
| `docs/GLOSSARY.md:23` | Same gloss, same contrast | **Stale** — reword |
| `docs/GLOSSARY.md:25` ("blocked tasknote") | "parked awaiting a prerequisite" — phase-neutral | No change |
| `claude/skills/ft-task/SKILL.md:140` | Step 4 *defers* the Re-scope-to-blocked path to `blocked.md` | No change — the deferral is why no wiring edit is needed |
| `SPEC/procedures/ft-task.md:265` | Same deferral, agent-neutral runner | No change |
| `SPEC/gates.md` §"Phase 1→2 exit gate" | Already fires 🛠️ on every Re-scope; the choice rides the banner's mandatory preview line | No change |
| `SPEC/tasknote-inserts.md:72` | "A hard dependency parks the tasknote" — mid-Phase-2 example, still true | No change |
| `docs/EXTERNAL-AGENTS.md:67,95,99` | Closed-set branching on `park-reason:` codes | No change — the set stays at eight |
| `docs/CONTEXT-BUDGET.md:164` | `blocked.md` 12,100 is a **ledger** row, not a budget (§"Not budgeted, deliberately" excludes lazy modules other than five named ones); refreshed by `/ft-release` §7.1 | No change |

**Drift found in passing.** None beyond the contradiction itself; PLAN.md line
18's cited section name and [[CORE-660]]'s state both match the files today.

**No mirror pair.** `grep 'blocked' claude/skills/ft-release/step-7.1-mirror-pairs.md`
returns nothing — `blocked.md` is not byte-bound to any sibling, so the edit is
single-surface plus the four inbound rewrites above.

**Versioning.** No `SPEC.md` `**Version:**` bump here; the bump is
`/ft-release`'s motion, matching every recent contract task's commit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** The two-disposition-at-a-gate shape is not new to this
repo — `SPEC/gate-postures.md` §"Pre-scaffold stops" already splits one stop
into "scaffold-then-park" vs "terminate without writing" by what the stop is
*about*, and `/ft-task` Step 4's own exit gate already routes two outcomes off
one judgment. This extends that shape rather than minting one. No new verdict,
no new `park-reason:` code, no new banner — the CORE-065 two-banner cap is
untouched because the choice rides the **existing** 🛠️ banner's mandatory
preview line rather than adding a pause.

**Minimal refactor gate.** Five files, contract layer only. The four
non-`blocked.md` edits are each forced by the widening — `gate-postures.md`'s
paragraph asserted a premise this task retires, and the two `(mid-Phase-2
park)` glosses would have contradicted the module they cite. `CORE-660.md` is
the re-code the operator chose. Nothing adjacent was cleaned up.

**Gap found and closed mid-execution.** The first draft of §"Phase 1 entry"
opened *"a `Re-scope` verdict **always** fires the 🛠️ gate"* — false under
`--fast`, which downgrades exactly that banner to an inline ⚠️ notice
(`SPEC/gate-postures.md:43`). A contract that puts the choice only in a banner
would have had no answer for the flag that suppresses it. Fixed in two places:
the opening is now scoped to a flagless run, and a new bold-lead §"Under
`--fast`, park and say so" gives that path its own rule — park by default,
name it in the notice, operator overrules inline. This is the `--fast`
posture's own delegation logic (§"Each delegation is bounded to its own
check"), not a new concession. `gate-postures.md`'s flag×surface matrix row
for the Re-scope drift gained the matching cell so the two surfaces agree.

**Three dispositions across the three postures, one rule behind them.**
Flagless → operator picks at the banner. `--fast` → park, notice, overrulable.
`--unattended` → park unconditionally, PLAN edit deferred. The asymmetry that
picks the default in the last two is stated once in §"Phase 1 entry" and cited
rather than restated: an unnecessary park costs one resume, an unnecessary
delete costs a Discovery.

**No tests.** Contract-layer markdown only; the repo ships no test that reads
`SPEC/`. Verification is the grep receipt below, which is what the Acceptance
criteria were written against.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt.** Each `## ✅ Acceptance` verify command, run from the
repo root:

| # | Command | Exit / count |
|---|---|---|
| 1 | `grep -q '\*\*Delete and halt\*\* —' SPEC/blocked.md && grep -q '\*\*Park\*\* —' SPEC/blocked.md` | `0` |
| 2 | `grep -c 'blocked\` is reserved for mid-Phase-2' SPEC/blocked.md` | `0` |
| 3 | `grep -c 'The reservation above holds' SPEC/blocked.md` | `0` |
| 4 | `grep -c 'scopes .status: blocked. to mid-Phase-2' SPEC/gate-postures.md` | `0` |
| 5 | `grep -rn '(mid-Phase-2 park)' SPEC.md SPEC/ docs/` | no match (`1` = pass) |
| 6 | `grep -q '^park-reason: drift — ' .flowtron/tasknote/CORE-660.md` | `0` |
| 7 | `git diff --name-only HEAD \| grep -c 'claude/skills/\|SPEC/procedures/'` | `0` runner paths |
| 8 | anchors + links — `judgment` | 6/6 cited anchors resolve; `gates.md`, `gate-postures.md`, `blocked.md` all exist |

**Two verify commands were mis-written in Discovery and corrected here** —
recorded rather than quietly swapped. Criterion 1 searched `Park —` where the
file carries `**Park** —`; criterion 2 searched `reserved for mid-Phase-2
parking`, a literal that *also* matches the intended negation this task writes
(`**not** reserved for mid-Phase-2 parking`) and so could never have returned
0. Both were broken instruments, not failing criteria: the first run read
`exit 1` / `1` against a file that was already correct. The corrected forms are
in the table, the criteria lines above were updated to match, and a sanity
check confirms the negation survives — `grep -c '\*\*not\*\* reserved for
mid-Phase-2 parking' SPEC/blocked.md` → `1`.

**Structural quality.** No duplication introduced — the delete/park asymmetry
is stated once and cited twice; no dead prose left behind (the retired
reservation sentence is gone, not commented); no public-surface growth (no new
verdict, code, key, or banner); no stale code-facing documentation (the four
inbound surfaces that described the old scoping were rewritten in the same
diff, per the Discovery table).

**Context budget.** `SPEC/gate-postures.md` 20,412 → 21,592 (+1,180), against
a **23,000** cap — passes, with 1,408 chars of headroom. Worth naming: that
row in `docs/CONTEXT-BUDGET.md` predicted this exact position ("one more edit
of that size leaves under one unit, and the next task after it should trim or
extract before it raises"), and a posture unit there measures ≈1,400. The next
substantial posture edit is the one that has to trim or extract. Not fixed
here — out of this task's scope, and the budget doc already carries the
instruction. `SPEC/blocked.md` 12,100 → 14,627 is a **ledger** row, not a
budget (`docs/CONTEXT-BUDGET.md` §"Not budgeted, deliberately"), refreshed by
`/ft-release` §7.1 at the next cut; no edit here.

**External review.** `/code-review low` over this run's own working-tree diff
(no commits made by this run, so the working tree *is* the diff). Returned
`(none)` — zero findings, so nothing to grade against Acceptance and no
disposition to record. Proportionate at `low`: the diff is five markdown
contract files with no executable surface.

**Not applicable.** No targeted test suite and no lint/type-check — the
changed set is `SPEC.md`, two `SPEC/` modules, `docs/GLOSSARY.md`, and one
tasknote; `npm --prefix viz` commands and `node --test tools/` cover paths
this diff does not touch. No frontend change, so no 👁️ ask.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep** — `grep -rn 'mid-Phase-2\|delete the just-scaffolded\|Phase
1 blocker'` across the whole sweep set returned nothing, so most rows are
mechanically clear rather than eyeballed:

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `AGENTS.md` | no change |
| `SPEC.md` | **updated** — `blocked-by:` row's gloss `(mid-Phase-2 park)` → `(a started-and-parked run)`; §"Blocked tasks" already defers wholesale to the module |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — cites §"Exit (resume)" as a bold-lead example; that heading is untouched |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — no Claude-specific surface added or retired |
| `docs/PLATFORMS.md` | no change |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | no change — checked line by line, since the sweep set flags it for unattended-posture edits. Its four park claims (`:48`, `:65`, `:69`, `:71`) are phase-neutral ("Phase 1 and any partial Phase 2 are preserved") and read *more* accurately after the widening. No stable-surface row moved, renamed, or retired: the closed code set stays at eight, `drift` keeps its spelling, the resume path is unchanged — so no caller-side row to file in caobunga's PLAN |
| `docs/WORKTREES.md` | no change |
| `docs/VISION.md` | no change — no scope boundary moved; this removes a contradiction rather than adding a capability |
| `docs/GLOSSARY.md` | **updated** — same `(mid-Phase-2 park)` gloss on the `blocked-by (YAML)` entry. The `blocked tasknote` entry ("parked awaiting a prerequisite") was already phase-neutral and stands |

**`touches:` reconciliation.** Declared six; `git diff --name-only` plus the
new note gives exactly six — `SPEC/blocked.md`, `SPEC/gate-postures.md`,
`SPEC.md`, `docs/GLOSSARY.md`, `.flowtron/tasknote/CORE-660.md`,
`.flowtron/PLAN.md`, plus this tasknote itself. No undeclared path.

**Final Summary:** Retired an eleven-line self-contradiction in
`SPEC/blocked.md`. §"Phase 1 entry" deleted a scaffolded tasknote on a Re-scope
because *"a Phase 1 blocker has no Phase 2 work to preserve"*; §"Phase 1→2
boundary park" answered, eleven lines down, that *"Phase 1 is complete at that
boundary and its Discovery is exactly the work worth preserving"* — and then
scoped that answer to `--unattended`. The archive says why: [[CORE-473.2]]
found the same contradiction, wrote the argument out in full, and handed the
`blocked.md` edit to [[CORE-473.3]], whose epic remit was the operator-less
posture. The scoping was an artifact of which epic did the work. Nobody had
ever argued that attended runs should discard Discovery.

**Resolved by widening, in the shape that keeps a real distinction rather than
erasing one.** A `Re-scope` verdict already always fires the 🛠️ gate, so the
operator is standing at exactly this point; the banner's preview line now
offers two dispositions — delete-and-halt when Discovery produced nothing, park
when it produced work — and the operator picks. `--unattended` parks
unconditionally and defers the PLAN.md edit, which is now what distinguishes
that path, rather than the park itself. No fourth Phase-1 verdict, no new
`park-reason:` code (the set stays at eight), no new banner — the choice rides
the existing 🛠️ preview line, so the CORE-065 two-banner cap is untouched.

**A gap in the first draft, found by verification rather than by eye.** That
draft opened "a `Re-scope` verdict **always** fires the 🛠️ gate" — false under
`--fast`, which downgrades precisely that banner to an inline ⚠️ notice. A
contract that put the choice only in a banner had no answer for the flag that
suppresses it. The opening is now scoped to a flagless run, and a new
§"Under `--fast`, park and say so" gives that path its own rule: park by
default, name it in the notice, operator overrules inline — which is the
`--fast` posture's own delegation logic, not a new concession. Three postures,
three dispositions, one asymmetry behind both defaults (an unnecessary park
costs one resume; an unnecessary delete costs a Discovery).

Five files, contract layer only. Four of the five edits were forced by the
first: `gate-postures.md`'s §"Widening of the mid-Phase-2 scoping" rested on a
premise this task retires and is rewritten to claim only what it still adds;
two `(mid-Phase-2 park)` glosses in `SPEC.md` and `docs/GLOSSARY.md` would have
contradicted the module they cite. [[CORE-660]] — the live instance, parked
yesterday in the undescribed state and the note that filed this task — is
re-coded `dependency` → `drift` per §"`drift` vs `dependency`" (the code names
the *stop*, and a Phase-1 park's stop is the verdict), with a dated
settled-by block appended to its Discovery Notes so whoever resumes it sees
why the frontmatter moved. **Zero runner wiring changed**, verified by command:
`claude/skills/ft-task/SKILL.md` and `SPEC/procedures/ft-task.md` both *defer*
the Re-scope-to-blocked path to this module, so the new contract reaches both
runners with no mirror-pair work and nothing to keep in sync.

8/8 Acceptance criteria pass; `/code-review low` over the run's own working-tree
diff returned `(none)`. Two of the eight verify commands were **mis-written in
Discovery and corrected at Phase 3** rather than quietly swapped — one searched
a literal that also matched this task's own negation and so could never have
returned 0, the other dropped the bold markers. Broken instruments, not failing
criteria; both readings are in Testing Notes. One number worth carrying
forward: `SPEC/gate-postures.md` is now 21,592 of its 23,000 cap, and
`docs/CONTEXT-BUDGET.md` predicted this exact position — the next substantial
posture edit is the one that must trim or extract before it raises.

**Learnings:** No always-loaded change. The transferable lesson is archive-shaped,
not contract-shaped: [[CORE-473.2]] wrote this task's entire argument fourteen
months of task-numbering ago and handed it forward, and it landed narrower than
it was argued because the epic that carried it had a narrower remit. A
hand-forward inherits the *receiving* task's scope, not the argument's. The
Phase 1 archive skim is what surfaced it, which is the case for keeping that box
non-negotiable — and, circularly, the case this task just made for not deleting
Discovery.

**Archived:** 2026-09-22
