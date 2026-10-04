---
title: blocked-by-closure-sweep
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-393, CORE-381, CORE-473.2, CORE-473.3]
touches:
  - SPEC.md
  - SPEC/blocked.md
  - SPEC/gates.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
---

# CORE-527 | blocked-by-closure-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-393]] [[CORE-381]] [[CORE-473.2]]

> **⚠️ Superseded by [[CORE-533]]** — the Phase 4 Blocked-by sweep block, the `SPEC/blocked.md` §"Blocker-side clearing" section, the gate/procedure/skill mirrors, and the ledger bump were withdrawn: flowtron's own history holds one parseable clause (CORE-280, cleared by its own run the day it was written) and the viz chip is off by default, so the sweep lacked two-project precedent. One sentence in `SPEC/blocked.md`'s Re-scope paragraph survives.

## 🎯 Goal

Make Phase 4 closure sweep `PLAN.md` for `Blocked by [[ID]]` clauses naming the
task being closed, and surface any hits to the operator inside the existing 📦
bundle so now-satisfied clauses can be struck in the same closure motion —
closing the forgotten-stale-clause class without minting a new gate, glyph, or
checkbox.

## ✅ Acceptance

- [x] `SPEC.md` §"🚀 Phase 4: Closure" carries a **Blocked-by sweep (conditional)** paragraph: closure greps `PLAN.md` for `Blocked by` clauses whose wikilink names the closing ID, surfaces hits, and — on operator say-so — strikes them in the same closure commit
- [x] That paragraph states the two bounded edits explicitly: strike the whole clause when the closing ID is its only wikilink; drop **just that wikilink** when the clause lists several (`Blocked by [[A]], [[B]]` losing one blocker keeps the clause)
- [x] That paragraph states the safety line: this is the **only** sanctioned collateral `PLAN.md` write at closure — clause text only, never a checkbox flip, priority move, or any other edit to another row (§"Paper-complete guard" ban on collateral Completed flips is untouched)
- [x] The prompt is specified as a **bundled in-📦 prompt**, not a new banner — so a hit force-fires the 📦 gate per `SPEC/gates.md` §"Conditional skip rule" (including under `--fast`), and no third banner is minted (CORE-065 two-banner cap intact)
- [x] **Phase 4 stays at 3 boxes** — the sweep rides the existing `Closed —` box, per [[CORE-393]]; `templates/tasknote-template.md` is unmodified
- [x] `SPEC/blocked.md` documents the **blocker-side** removal motion, completing a lifecycle that until now only removed the clause from the blocked task's own resume path
- [x] `SPEC/gates.md` §"Conditional skip rule" names this as a second bundled-prompt consumer alongside `/ft-close-epic`'s parent-flip
- [x] `SPEC/procedures/ft-task.md` §5 Phase 4 mirrors it (agent-neutral projection stays in sync)
- [x] `claude/skills/ft-task/SKILL.md` Step 5 Phase 4 mirrors it
- [x] **Mirror-set boundary recorded** — the mirror set is exactly where the superseded-claim pointer already lives (`SPEC.md` + `SPEC/procedures/ft-task.md` + `ft-task/SKILL.md`), verified by grep; `ft-goal-task` / `ft-micro-task` / `ft-close-epic` / `ft-epic-discovery` / the template are deliberately untouched with the reason recorded
- [x] `--unattended` needs **no** new conversion — `claude/skills/ft-task/unattended-mode.md` already routes a queued bundled in-📦 prompt to `park-reason: input-needed`; verified, and the reason for not editing it recorded
- [x] Counter-assertion sweep across `SPEC.md`, `SPEC/`, `claude/`, `codex/`, `cursor/`, `grok/`, `docs/`, `templates/`: no surface asserts closure leaves blocker-naming clauses alone, and no surface claims Phase 4 has 4 boxes
- [x] **Zero archived tasknotes modified** — `git status` shows no change under `.flowtron/tasknote/archive/`
- [x] `viz` suite + `update-adopters` suite pass as a regression guard (no code path touched)
- [x] Dogfood: this task's own closure runs the new sweep against `PLAN.md` and reports its verdict

## 🧩 Subtasks

- [x] `SPEC.md` §"🚀 Phase 4: Closure" — add the Blocked-by sweep paragraph, modeled on the adjacent superseded-claim-pointer paragraph (conditional, rides the `Closed —` box, no new checkbox)
- [x] `SPEC/blocked.md` — add the blocker-side removal motion to the lifecycle prose
- [x] `SPEC/gates.md` §"Conditional skip rule" — extend the bundled-prompt override's `e.g.` with this consumer
- [x] `SPEC/procedures/ft-task.md` §5 Phase 4 — mirror
- [x] `claude/skills/ft-task/SKILL.md` Step 5 Phase 4 — mirror
- [x] Counter-assertion grep across the contract layer
- [x] Verify: `git status` clean under `archive/`; `npm --prefix viz test`; `node --test tools/update-adopters.test.mjs`

## 🔗 Related

- [[CORE-393]] — phase4-closure-hygiene; established "Phase 4 stays at 3 boxes" and enumerated the closure mirror set (`related-decision:`)
- [[CORE-381]] — asserted the Phase 4 YAML `status:` flip; origin of the fold-into-existing-box precedent (`related-decision:`)
- [[CORE-473.2]] — unattended-posture; owns the park conversion this sweep's prompt inherits (`depends-on:`)
- [[CORE-473.3]] — park-reason-key; defines `input-needed`, the reason a queued in-📦 prompt parks under `--unattended`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and current. `SPEC/blocked.md` documents two
  motions that *add* `Blocked by [[ID]]` (Phase 1 Re-scope, mid-Phase-2 park)
  and exactly one that removes it — the **resume** path, where the *blocked*
  task's own runner optionally strikes its own clause. Nothing anywhere makes
  the **blocker's** closure look at rows that cite it. So the common case —
  blocker closes, dependent row is never re-run until much later — leaves a
  clause asserting a dependency that was satisfied weeks ago. `PLAN.md`'s
  `Blocked by` parses into `Task.blockedBy` and drives an opt-in viz row chip,
  so a stale clause is not merely cosmetic; it misreports readiness.

- [x] Read relevant source files — `SPEC.md` §"🚀 Phase 4: Closure",
  §"Long-description conventions", §"Post-closure protocol", §"Paper-complete
  guard"; `SPEC/blocked.md` in full; `SPEC/gates.md` §"Conditional skip rule",
  §"`--unattended` operator posture"; `claude/skills/ft-task/SKILL.md`
  Step 5–6; `claude/skills/ft-task/step-3c-resume-blocked.md`;
  `templates/tasknote-template.md`

- [x] **Best Practices Review** — N/A for code boundaries (contract-layer
  markdown only, no module touched). The equivalent review is *contract*
  surface: the change must not mint a new banner (CORE-065 two-banner cap), a
  new glyph, a new Phase 4 checkbox (CORE-393 lock), or a new tool (SPEC
  §"What flowtron does NOT provide"). Every one of those is satisfied by
  reusing machinery that already exists — see Discovery Notes.

- [x] **Archive skim** — 700 notes under `archive/core/`; grepped for
  `SPEC/blocked.md` + `Blocked by` (20 hits) and for stale-clause language.
  Load-bearing findings in Discovery Notes below ([[CORE-393]], [[CORE-381]],
  the superseded-claim-pointer precedent, [[CORE-473.2]]/[[CORE-473.3]]).

- [x] **Drift check** — PLAN.md line matches current code: no `Blocked by`
  sweep exists at Phase 4 on any surface (verified by grep across `SPEC.md`,
  `SPEC/`, `claude/`, `templates/`). The plan formed below contradicts no SPEC
  contract — it reuses the bundled in-📦 prompt override, which
  `SPEC/gates.md` §"Conditional skip rule" already defines generically and
  already routes under `--unattended`. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with
  explicit assumptions — **No clarifications needed.** Assumptions asserted:
  (1) the sweep is contract + runner guidance, not a script — flowtron ships
  no tooling; (2) the mirror set is bounded to wherever the **superseded-claim
  pointer** is already mirrored, because that write is this one's exact
  structural twin (always considered, rarely acted, cross-row write staged in
  the closure commit) — any surface that omits the superseded pointer today is
  a pre-existing gap and is out of scope here, filed as a follow-up if real;
  (3) clause *removal* stays the operator's act, per the PLAN line.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The gap, precisely.** `Blocked by [[ID]]` in a PLAN.md long description is
one of two reserved machine-readable conventions (`SPEC.md`
§"Long-description conventions"); it parses into `Task.blockedBy` and drives an
opt-in viz row chip. `SPEC/blocked.md` describes three motions on it — two that
add (Phase 1 Re-scope; mid-Phase-2 park, optional) and one that removes: the
**resume** path, where the blocked task's own `/ft-task` run optionally strikes
its own clause (`step-3c-resume-blocked.md` step 4). Every removal path today
is therefore driven by the *dependent*. Nothing is driven by the *blocker*. A
blocker that closes while its dependents sit unstarted leaves clauses that
assert a satisfied dependency indefinitely — the class caobunga CBN-120.2 F1
observed.

**Reuse, not new machinery — four caps this change must not breach.**

1. *No new banner.* The CORE-065 two-banner cap (🛠️ + 📦) holds. The operator
   prompt rides the existing 📦 bundle as a **bundled in-📦 prompt**, the
   mechanism `SPEC/gates.md` §"Conditional skip rule" already defines
   generically and already exercises via `/ft-close-epic`'s parent-flip. That
   override force-fires 📦 even under `--fast`, which is exactly right: a
   stale-clause question is a user-input question, and autonomous commit
   cannot answer it.
2. *No new park conversion.* `claude/skills/ft-task/unattended-mode.md:52`
   already maps "a queued **bundled in-📦 prompt**" → `park-reason:
   input-needed`. This sweep's prompt is an instance of that row, not a new
   one. Verified — the file needs no edit.
3. *No new Phase 4 checkbox.* [[CORE-393]] locked "**Phase 4 stays at 3
   boxes**", inheriting [[CORE-381]]'s fold-into-existing-box precedent. The
   sweep rides the `Closed —` box.
4. *No new tool.* SPEC §"What flowtron does NOT provide" — the sweep is a grep
   the agent runs against a file already open at closure, not a script.

**Structural twin: the superseded-claim pointer.** `SPEC.md` §"🚀 Phase 4:
Closure" already carries one conditional cross-artifact write with this exact
shape — always considered, rarely acted on, writes to something *other* than
the closing task, staged in the same atomic closure commit, explicitly "No new
checkbox — the pointer rides the existing `Closed —` box." Modeling the new
paragraph on it keeps Phase 4 internally consistent and gives a defensible,
grep-checkable mirror-set boundary.

**Mirror set (verified by grep, not assumed).** Counting `Superseded` hits:
`SPEC.md` ✓, `SPEC/procedures/ft-task.md` ✓ (2), `claude/skills/ft-task/SKILL.md`
✓ (2) — and **0** in `ft-goal-task`, `ft-micro-task`, `ft-close-epic`,
`ft-epic-discovery`, and `templates/tasknote-template.md`. So the set is
exactly three files plus the gate-side mention. Note this is *narrower* than
[[CORE-393]]'s mirror set, which reached the epic skills — correctly, because
CORE-393's rule was **unconditional** (every closure must tick Acceptance)
while both conditional writes are rare. Whether the epic runners' omission of
the superseded pointer is itself a gap is a **separate** question and out of
scope here; if it looks real at execution time, file a follow-up rather than
widening this task.

**Safety line the contract must state.** Removing a clause from another row is
a collateral `PLAN.md` write, and §"Paper-complete guard" bans collateral
*Completed flips*. These do not conflict, but the boundary has to be explicit
or a future reader will read one as licensing the other: the sanctioned edit is
**clause text only** — never a checkbox flip, never a priority move, never any
other change to another row.

**Multi-blocker detail.** `Blocked by` accepts comma-separated wikilinks
(`SPEC.md` §"Long-description conventions"). Closing one of several blockers
must drop **that wikilink only** and leave the clause standing; only a clause
whose sole wikilink is the closing ID is struck entirely. Stated explicitly,
because the naive read ("remove the clause") is wrong in the multi-blocker case.

**Epic children.** The closing ID may be `<AREA>-<N>.<sub>`; the sweep matches
whatever ID is closing, with no special case.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established shape rather than inventing one: the new Phase 4 paragraph is modeled line-for-line on the adjacent **superseded-claim pointer** (conditional, cross-artifact, rides the `Closed —` box, staged in the same atomic commit), and the operator prompt reuses the **bundled in-📦 prompt** override that `/ft-close-epic`'s parent-flip already exercises. No new cue, glyph, checkbox, park-reason code, or tool.

- [x] **Minimal refactor gate** — no refactor. Five contract-layer files edited additively; one pre-existing sentence in `SPEC/blocked.md` amended (the Re-scope re-entry parenthetical) because the new motion would otherwise contradict it. Unrelated cleanup deferred — see the ledger note in Testing Notes.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract only, no code path. Both suites run as regression guards (Phase 3).

**Implementation Notes:**

**`SPEC.md` §"🚀 Phase 4: Closure"** — new **Blocked-by sweep (conditional)**
block after the superseded-claim pointer: the outward grep, the two bounded
edits (whole clause vs. single wikilink), the collateral-write safety line, and
the bundled-in-📦 routing with its `--fast` / `--unattended` consequences.

**`SPEC/blocked.md`** — new §"Blocker-side clearing (Phase 4)". The file
previously described three motions on the clause, all driven by the
*dependent*; this names the fourth, driven by the *blocker*, and closes with
why the two removal paths are complementary rather than redundant. Also
amended the Phase 1 Re-scope re-entry parenthetical, which had assumed the
dependent always removes its own clause.

**`SPEC/gates.md`** — two one-line extensions naming this as a second
bundled-prompt consumer (the §"Operator-gate cues" table row and the
§"Conditional skip rule" override paragraph). The override itself was already
generic; only its `e.g.` needed the second example.

**`SPEC/procedures/ft-task.md`** §5 Phase 4 and
**`claude/skills/ft-task/SKILL.md`** Step 5 Phase 4 — mirrors, placed
immediately after each file's superseded-pointer sentence.

**`docs/AGENT-NEUTRALITY.md`** — the `--fast` ledger row enumerated 6 SPEC.md
sites; the new Phase 4 paragraph names `--fast`, making it 7. Caught by the
Phase 4 doc-drift sweep, not by the counter-assertion grep.

**Deliberately untouched, with reasons:**

- `templates/tasknote-template.md` — [[CORE-393]] locked "**Phase 4 stays at 3 boxes**"; the sweep rides the existing `Closed —` box exactly as the superseded pointer does, and that pointer is likewise absent from the template.
- `claude/skills/ft-task/unattended-mode.md` — its conversion-map row for "a queued **bundled in-📦 prompt**" (line 52) is already generic. This sweep's prompt is an instance of that row. Adding a second row would duplicate, not clarify. Verified rather than assumed.
- `ft-goal-task` / `ft-micro-task` / `ft-close-epic` / `ft-epic-discovery` — outside the mirror set, established by grep: the superseded-claim pointer appears in `SPEC.md`, `SPEC/procedures/ft-task.md`, and `ft-task/SKILL.md` only (0 hits in all four). Narrower than [[CORE-393]]'s mirror set, correctly: CORE-393's rule was unconditional, both of these are conditional and rare.
- `docs/GLOSSARY.md` — not in the AI-referenced sweep set, and its "Closure (Phase 4)" entry enumerates only the unconditional ops (it omits the superseded pointer too).
- `SPEC.md` §"Paper-complete guard" — its "Ban collateral Completed flips" bullet is about *checkbox flips on other rows*, which this change does not do. The new paragraph names the guard explicitly and says it is untouched, so the two cannot be misread as licensing each other.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` **524/524 pass (28 files)**; `node --test tools/update-adopters.test.mjs` **49/49 pass**. Both are regression guards: no code path was touched.

- [x] Ran lint/type-check on changed code — `N/A` for tsc/eslint (no TypeScript changed). The applicable check is `.editorconfig` compliance, verified on all six changed files: zero trailing whitespace, final newline present, no CRLF.

- [x] **Quality assertions** — no avoidable duplication (the five contract surfaces are the *established* mirror pattern; `SPEC.md` is canonical and the other four cite it rather than restating the reasoning); no dead text; no unexplained complexity; no public-surface growth (zero new cues, glyphs, checkboxes, park-reason codes, flags, or tools); no stale code-facing documentation left behind — the one enumeration this change falsified was found and corrected.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface.

**Testing Notes:**

**Counter-assertion sweep** across `SPEC.md`, `SPEC/`, `claude/`, `codex/`,
`cursor/`, `grok/`, `docs/`, `templates/`: no surface asserts that closure
leaves blocker-naming clauses alone, and none claims Phase 4 has four boxes.
The `bundled in-📦 prompt` mentions in `SECURITY.md`, `docs/PLATFORMS.md`
(3 sites) and `claude/CAPABILITIES.md` all name the queued-prompt *category*
generically — critically, the "**six gates** an operator-less run cannot
answer" count is **unchanged**, because this sweep's prompt is a new instance
of the existing "queued bundled in-📦 prompt" gate, not a seventh gate.

**Doc-drift sweep** (18 AI-referenced docs) — 17 "no change", 1 update:

- `docs/AGENT-NEUTRALITY.md` — **updated**. Its `--fast` ledger row enumerated 6 SPEC.md sites; the new Phase 4 paragraph names `--fast`, so §"🚀 Phase 4: Closure" was added and the count bumped to 7. This is the [[CORE-521]] drift class, caught live by the sweep that exists for it.
- `docs/VISION.md` — no change, and worth stating why it survives: its §"Graph / multi-agent execution runtimes" bullet cites `Blocked by [[ID]]` as a *markdown fact* and rejects runtimes built over it. This change ships no runtime — the sweep is a grep the agent runs over a file already open at closure, and the removal decision stays with the operator. Consistent, not merely untouched.
- `README.md`, `AGENTS.md`, `SPEC.md` (this task), `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — no change; none enumerates the conditional Phase 4 writes.

**Dogfood — the sweep run against this very closure.** Grepping `PLAN.md` for
`Blocked by` returns two lines (CORE-527 and CORE-531), and **neither is a
hit**: both are prose *about* the convention, and neither carries a wikilink
naming `CORE-527`. Verdict: no hits, no prompt queued, 📦 not force-fired.
This is a useful negative result — it confirms the contract wording is right to
say "clauses **whose wikilink names** the closing ID" rather than "lines
containing `Blocked by`", since flowtron's own PLAN is full of the latter.

**Deferred, not fixed — possible follow-up.** The same
`docs/AGENT-NEUTRALITY.md` row claims "3 sites in `SPEC/gates.md`", but
`--fast` appears in ~15 sections of that file. Either the row counts only
normative definition sites (and is fine) or it has drifted like the SPEC.md
half just did. Resolving it needs a decision about the ledger's counting rule,
which is outside this task's remit; flagged to the operator at closure rather
than widened into scope.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 18 AI-referenced docs walked; 17 "no change", 1 update (`docs/AGENT-NEUTRALITY.md` ledger, 6→7 SPEC.md `--fast` sites). Per-entry verdicts in Testing Notes.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote moved to `.flowtron/tasknote/archive/core/`. No superseded-claim pointer written (this task falsified no archived factual claim). Blocked-by sweep run: no hits.

- [x] **Evidence-based recap** drafted

**Final Summary:**

Phase 4 closure now looks *outward* as well as inward: it greps `PLAN.md` for
`Blocked by` clauses whose wikilink names the task being closed, surfaces the
hits, and lets the operator strike the now-satisfied ones in the same closure
commit. Until now every removal path for that clause was driven by the
*dependent* task, so a blocker that closed while its dependents sat unstarted
left clauses asserting satisfied dependencies indefinitely — and because
`Blocked by [[ID]]` parses into `Task.blockedBy` and can surface as a viz row
chip, those stale clauses misreport readiness rather than merely reading oddly.

**Changed (6 files, ~85 lines added, contract layer only, zero code):**

| File | Change |
|---|---|
| `SPEC.md` | New **Blocked-by sweep (conditional)** block in §"🚀 Phase 4: Closure" (~30 lines) — canonical contract |
| `SPEC/blocked.md` | New §"Blocker-side clearing (Phase 4)" (~20 lines) + amended the Re-scope re-entry parenthetical |
| `SPEC/gates.md` | 2 one-line extensions naming the second bundled-prompt consumer |
| `SPEC/procedures/ft-task.md` | §5 Phase 4 mirror (agent-neutral projection) |
| `claude/skills/ft-task/SKILL.md` | Step 5 Phase 4 mirror |
| `docs/AGENT-NEUTRALITY.md` | `--fast` ledger row 6→7 SPEC.md sites |

**Verification:** `npm --prefix viz test` 524/524 · `node --test
tools/update-adopters.test.mjs` 49/49 · `.editorconfig` compliance on all six
files · counter-assertion grep across eight trees, clean · `git status` clean
under `.flowtron/tasknote/archive/` (zero archived notes modified) · dogfood
sweep run against this closure (no hits, correctly).

**Refactors:** none made. One pre-existing sentence amended in
`SPEC/blocked.md` because the new motion would otherwise contradict it. One
cleanup deferred with rationale: the same neutrality ledger row's "3 sites in
`SPEC/gates.md`" figure looks drifted (~15 sections mention `--fast`), but
resolving it needs a decision about the ledger's counting rule and is out of
remit here.

**Documentation verdict:** the change *is* documentation. Doc-drift sweep found
and fixed one falsified enumeration.

**Maintainability effect:** net-negative surface growth despite adding a
behavior — zero new cues, glyphs, checkboxes, park-reason codes, flags, or
tools. The sweep rides the existing `Closed —` box ([[CORE-393]]'s "Phase 4
stays at 3 boxes" holds), the prompt rides the existing bundled in-📦 override
(CORE-065's two-banner cap holds), and `--unattended` routing came free from an
already-generic conversion-map row. The mirror set is now grep-checkable: both
conditional Phase 4 writes live in exactly the same three files.

**Archived:** 2026-09-06
