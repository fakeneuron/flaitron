---
title: sop-currency-gate
status: completed
tags: []
created: 2026-08-02
related-tasks: [CORE-395, CORE-390, CORE-361, CORE-356]
---

# CORE-397 | sop-currency-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-395]] [[CORE-390]] [[CORE-361]] [[CORE-356]]

## 🎯 Goal

Give `/ft-release`'s doc-currency walk a standing **flag-don't-bump** check that
surfaces `SPEC/procedures/*.md` drift from its `source:` — so the gap
[[CORE-390]] opened and [[CORE-395]] closed by hand gets caught mechanically,
without the stamp becoming a release pin.

## ✅ Acceptance

- [x] `/ft-release` Step 5 carries an SOP-currency check that, for every `SPEC/procedures/*.md`, compares `source:` commits against the `last-verified:` stamp and surfaces drift candidates
- [x] The check is **flag-only** — it explicitly forbids bumping `last-verified:` as part of a release cut ([[CORE-361]] / [[CORE-356]] precedent), and routes a real finding to `/ft-file-followup` rather than absorbing it into the cut
- [x] The check is **advisory, not a hard gate** — unlike the adjacent dogfood gate it does not block commit-go
- [x] Drift anchor is the stamp's **date**, not its version tag and not the SOP's last-touched commit (both alternatives fail on real history — see Discovery Notes)
- [x] Same-commit mirrors are classified in-sync, so the check reproduces [[CORE-395]]'s hand-built ledger rather than over-reporting every source touch
- [x] The Step 5 residue-grep confirmation list gains a carve-out for SOP `last-verified:` stamps, so the next release does not read the stamp as "real drift — fix it before continuing"
- [x] `SPEC/procedures/README.md` §"Frontmatter schema" states that `last-verified:` is release-flagged but never release-bumped
- [x] Check verified against real history: clean today, and flags [[CORE-390]] when run against the pre-[[CORE-395]] stamp
- [x] PLAN.md line flipped to stub form under `## Completed`; tasknote archived to `.flowtron/tasknote/archive/core/CORE-397.md`

## 🧩 Subtasks

- [x] Add the "Standing SOP-currency check (flag-don't-bump)" block to `/ft-release` Step 5, after the dogfood gate
- [x] Add carve-out (c) to the Step 5 residue-grep confirmation list for SOP `last-verified:` stamps
- [x] Add the flag-don't-bump sentence to `SPEC/procedures/README.md` §"Frontmatter schema"
- [x] Add the SOP-currency line to the Step 3 Acceptance template and the §7.4 closure-review bundle
- [x] Verify the check's commands against real history (clean now; flags CORE-390 at the historic stamp)
- [x] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-395]] — sop-currency-recheck; did this re-check by hand and built the ledger this check automates
- [[CORE-390]] — debug-mode-fold; the drift that hid for two weeks because nothing surfaced it
- [[CORE-361]] — release v5.13.0; the precedent that the SOP stamp is *not* a release pin (the "don't bump" half)
- [[CORE-356]] — the precedent CORE-361 cites for leaving the stamp untouched at release

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and unmitigated — `/ft-release` has no surface
  that reads `SPEC/procedures/*.md` frontmatter at all, and the two prior
  releases that touched the question ([[CORE-361]], [[CORE-356]]) resolved it as
  a one-off residue adjudication in Implementation Notes, leaving nothing behind
  that the next releaser would see.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A` for code boundaries; this is a
  skill-prose change with no executable surface. The governing boundary is
  editorial: `/ft-release` §7.1 already establishes a **"standing check"**
  shape (symlink-wiring count · shipped-skill parity · installed-surface
  policy) — each an "independently of the subroutine findings" block with a
  command, an expected result, and a verdict. That is the pattern to extend.
  The one deviation this check needs is its verdict clause: the three existing
  standing checks all resolve to "fix inline as Critical/High before cutting
  the release", and this one must resolve to "flag, don't fix, don't bump" —
  so it belongs beside the currency stamps in Step 5 rather than among the
  fix-inline checks in §7.1. See Discovery Notes for the placement call.

- [x] **Archive skim** — `grep -l "SPEC/procedures" archive/core/*.md` returned
  49 hits; the load-bearing ones are [[CORE-395]] and [[CORE-361]]. CORE-361's
  Implementation Notes carry the exact residue adjudication this task
  mechanizes: `SPEC/procedures/ft-task.md:4 last-verified: v5.12.0 · 2026-07-16
  left untouched per CORE-356 precedent — SOP↔source currency stamp, not a
  release pin or dogfood row.` CORE-395's Discovery Notes carry the hand-built
  commit-level drift ledger that this check reproduces mechanically.

- [x] **Drift check** — cited facts verified against the tree, not recalled.
  `SPEC/procedures/ft-task.md:4` reads `last-verified: v5.14.1 · 2026-08-02`
  (current, per CORE-395). `claude/skills/ft-release/SKILL.md` is 391 lines; its
  doc-currency walk is the dogfood gate at Step 5 (lines 168–178) and the
  residue-grep rule at line 176. Cross-artifact half: the plan contradicts no
  SPEC contract — `SPEC/procedures/README.md` §"Frontmatter schema" defines
  `last-verified:` as "bumped when the SOP is re-checked against `source:`",
  which a release cut is not, so flag-don't-bump is the reading the schema
  already implies. `SPEC.md` §"What flowtron does NOT provide" bars *schema
  validators*; this is a prose check in a skill the operator drives, not a
  runtime validator — the same shape as the three standing checks already in
  §7.1.

- [x] Asked clarifying questions — **No clarifications needed.** The one open
  design question (what anchors "has the source drifted?") was resolved
  empirically against real history rather than by preference — see Discovery
  Notes. Explicit assumptions: (1) the check is advisory, never blocking —
  "flag" in the PLAN line rules out a hard gate, and a stale SOP costs a full
  tasknote to fix ([[CORE-395]]), which must not hold a release hostage;
  (2) `SPEC/procedures/` holds one SOP today (`ft-task.md`) but the check is
  written to walk the glob, since the layer is designed to grow;
  (3) flowtron's zero-scripts principle means this ships as skill prose with
  inline shell, not a `tools/` script.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The gap, precisely.** `/ft-release` reads currency stamps in three files
(`docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`) and
gates on them hard. It never reads `SPEC/procedures/*.md` frontmatter.
`SPEC/procedures/README.md:45` explicitly describes `last-verified:` as
"mirroring the `docs/PLATFORMS.md` / `claude/CAPABILITIES.md` convention" — so
the stamp joined the currency family by design but never joined the walk that
covers it. [[CORE-390]] landed a substantive fold on `source:` and skipped the
SOP; nothing surfaced it for two weeks until [[CORE-395]] was filed by hand.

**Anchor choice — resolved empirically, not by preference.** Three candidate
anchors for "has `source:` moved since the SOP was verified?", each tested
against real history:

| Anchor | Result today (SOP is current) | Result at the pre-CORE-395 stamp | Verdict |
|---|---|---|---|
| Stamp **version** → `git log v5.14.1..HEAD -- <source>` | **5 false positives** | would work | ✗ re-introduces release-pin semantics [[CORE-361]] rejects |
| SOP's **last-touched commit** → `git log <sha>..HEAD -- <source>` | clean ✓ | **misses CORE-390** | ✗ false negative on the exact case that motivated this task |
| Stamp **date** → `git log --since=<date> -- <source>` | clean ✓ | surfaces CORE-390 ✓ | ✓ |

The version anchor fails because the stamp's version and its date decouple
whenever the SOP is re-checked mid-cycle — which is exactly what [[CORE-395]]
did (stamped `v5.14.1` on 2026-08-02; the `v5.14.1` tag is dated 2026-07-27, so
five post-tag commits look like drift). The last-touched-commit anchor fails
because a *touch* is not a *verification*: [[CORE-387]] touched the SOP
(`503a336`) after [[CORE-390]] touched `source:` (`c5ea07a`), so anchoring on
the touch hides the older drift. That decoupling is the whole reason
`last-verified:` exists as an explicit stamp instead of being inferred — so the
date half is the only honest anchor.

**Same-commit refinement.** Anchoring on the date alone over-reports: six
commits touched `source:` since the historic stamp, but three of them
([[CORE-391]], [[CORE-393]], [[CORE-381]]) landed their SOP hunk in the *same
commit*, which CORE-395 adjudicated as in-sync. Filtering those out reproduces
CORE-395's ledger exactly — CORE-390 flagged as the real gap, the three mirrors
classified in-sync, CORE-385 flagged (CORE-395 dismissed it as "no SOP
surface", which is a correct flag the operator then adjudicates). Verified:

```text
dec93c7  CORE-391 — sidequest-fold           in-sync (same commit)
c5ea07a  CORE-390 — debug-mode-fold          ** DRIFT CANDIDATE **
3a86452  CORE-393 — phase4-closure-hygiene   in-sync (same commit)
ff271e7  CORE-381 — phase4-status-flip       in-sync (same commit)
baf3716  CORE-385 — skill-trigger-frontmatter ** DRIFT CANDIDATE **
db6a6a2  CORE-373 — model-roster-refresh     ** DRIFT CANDIDATE **
```

The check flags candidates; the operator adjudicates. That is the
flag-don't-bump contract, and it is why this is not a validator.

**Placement — Step 5, not §7.1.** The PLAN line says "doc-currency walk", and
the skill's own description distinguishes "doc-currency shifts" (Step 5's
stamp walk) from "doc-drift sweep" (§7.1). The SOP stamp is a currency stamp by
its own README, so Step 5 is its home. The placement also does real work: the
new check sits directly beneath the dogfood gate, making the contrast explicit
— *those* stamps are resolved-and-bumped every release, *this* one is
flagged-and-never-bumped. That contrast is precisely what CORE-361 had to
reconstruct by hand from CORE-356.

**A second, load-bearing find: the residue grep contradicts the new check.**
Step 5's post-edit verification greps the outgoing version across `SPEC/`
(line 158), then line 176 rules that every hit must be either (a) a skipped
dogfood stamp or (b) an archived tasknote — "**any other hit is real drift —
fix it before continuing**". `SPEC/procedures/ft-task.md:4` currently reads
`last-verified: v5.14.1`, so at the very next cut it will surface in that grep
as an unclassified hit, and the rule as written instructs the releaser to
"fix" it — i.e. to bump the stamp. That is the exact anti-behavior this task
exists to prevent, sitting eighteen lines above where the new check lands.
Adding carve-out (c) is not adjacent cleanup; without it the deliverable
contradicts itself in the same step.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the skill's established **standing check**
  shape rather than inventing one: a bolded `**Standing … check**` lead, an
  inline shell block, an explicit anchor rationale, and a verdict clause —
  matching the three checks in §7.1 (symlink-wiring count · shipped-skill
  parity · installed-surface policy). The one intentional divergence is the
  verdict: those three resolve to "fix inline as Critical/High"; this one
  resolves to flag-and-file. That divergence is *why* it sits in Step 5 beside
  the currency stamps instead of in §7.1 beside the fix-inline checks.

- [x] **Minimal refactor gate** — no restructuring. Four insertions and one
  in-place widening (the residue-grep list gained a `(c)` clause); no section
  moved, renamed, or split. No `tools/` script — flowtron's zero-scripts
  principle puts this in skill prose as inline shell, like every other standing
  check.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` as unit tests; the
  deliverable is skill prose with no importable surface. Substituted **execution
  verification** against real git history, including a regression case — see
  Testing Notes.

**Implementation Notes:**

Four edits across three files.

**`claude/skills/ft-release/SKILL.md` (+31/−2)** — three insertions plus one
widening:

1. **Step 5 — "Standing SOP-currency check (flag-don't-bump)"**, placed directly
   beneath the dogfood gate. Walks `SPEC/procedures/*.md`, reads each `source:`
   and the **date** half of `last-verified:`, and lists `source:` commits since
   that date that did not also touch the SOP. Carries the anchor rationale
   (why not the version, why not the SOP's last-touched commit), the
   same-commit-mirror filter, the two resolutions (clean → state it and
   continue; candidates → adjudicate, file via `/ft-file-followup`, continue),
   and the explicit **advisory, not a gate** clause.
2. **Step 5 residue-grep list — new carve-out `(c)`** for `SPEC/procedures/*.md`
   `last-verified:` stamps. Load-bearing: see Discovery Notes — without it the
   next cut reads the stamp as "real drift — fix it before continuing", which is
   the exact anti-behavior this task prevents.
3. **Step 3 Acceptance template** — one parameterized line so the check appears
   in every future release tasknote's Acceptance list.
4. **§7.4 closure-review bundle** — one line carrying the verdict to commit-go,
   explicitly marked non-blocking to contrast with the dogfood gate directly
   above it.

**`SPEC/procedures/README.md` (+11)** — a "Flagged at release, never bumped by
it" paragraph under §"Frontmatter schema". This puts the semantics in the
*contract* rather than only in the skill: the schema already implied it
("bumped when the SOP is re-checked against `source:`" — a release cut is not a
re-check), but nothing said it outright, which is why [[CORE-361]] had to
reconstruct it by hand from [[CORE-356]]. A future platform's release procedure
now inherits the rule without reading the Claude skill.

**`docs/AGENT-NEUTRALITY.md` (+1)** — one ledger row. Surfaced by the doc-drift
sweep, not the ticket: the new paragraph names `/ft-release` inside
`SPEC/procedures/README.md`, a contract-layer file whose pre-existing Claude
references (the `source:` example, the "Claude Code does not use this layer"
contrast) were never registered. Registering the file's references together —
pre-existing plus the new one — follows [[CORE-395]]'s precedent exactly, where
the same sweep found the same class of unregistered reference in the sibling
SOP file.

**Known limitation, deliberately not widened.** The check anchors on whatever
`source:` declares — today `claude/skills/ft-task/SKILL.md`, a single file. The
`ft-task` skill has since grown lazy fragments (`step-1.5-model-edge.md`,
`step-3a-promote-starter.md`, `step-3c-resume-blocked.md`,
`step-4-debug-mode.md`), so a future change touching **only** a fragment would
not be flagged. [[CORE-390]] happened to edit `SKILL.md` too, so the regression
case still catches it. Widening the check to the skill *directory* would make it
disagree with the declared `source:` — the right fix is a `source:` schema
question (should it accept a path list or a directory?), which is a separate
ticket, not a silent broadening here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test`:
  18 files, 242 tests, all passing (standing gate; no viz surface touched)

- [x] Ran lint/type-check on changed code — `N/A` for linting: markdown only,
  no linted surface. Substituted execution verification of the shipped shell
  block, below.

- [x] **Quality assertions** — the shell block was executed as written (not
  eyeballed) and is the only new "code". No duplication: the anchor rationale is
  stated once, at the check, and the other three touchpoints (Acceptance line,
  §7.4 bundle line, residue carve-out) point at it rather than restating it.
  No dead prose, no new section shape, no growth in the skill's gate count — the
  check is explicitly advisory, so the two-banner cap is untouched. The
  `README.md` skip in the loop is necessary, not defensive: `SPEC/procedures/`
  contains `README.md` alongside the SOPs and it carries no frontmatter.

- [x] (frontend) Visual confirmation not needed — no frontend surface

**Testing Notes:**

**The check runs clean today** — executed verbatim from the skill:

```text
== SPEC/procedures/ft-task.md  (source: claude/skills/ft-task/SKILL.md, verified: 2026-08-02)
[exit 0]
```

Correct: [[CORE-395]] re-checked the SOP on 2026-08-02 and nothing has touched
`source:` since.

**Regression case — the check catches what it was built to catch.** Same script,
stamp date rewound to the pre-CORE-395 value (`2026-07-21`):

```text
   DRIFT CANDIDATE  c5ea07a feat: CORE-390 — debug-mode-fold
   DRIFT CANDIDATE  baf3716 feat: CORE-385 — skill-trigger-frontmatter
```

Both are correct outputs. [[CORE-390]] is the real gap — the one that hid for
two weeks and cost a full tasknote. [[CORE-385]] is a true positive the operator
dismisses: CORE-395 adjudicated it as "no SOP surface — the commit changed only
SKILL.md's YAML `description:`". That is the flag-don't-bump contract working as
designed, and it is why this is a check and not a validator. The three
same-commit mirrors CORE-395 classified in-sync ([[CORE-391]], [[CORE-393]],
[[CORE-381]]) are correctly filtered out and do not appear.

**Anchor alternatives falsified, not assumed** (full table in Discovery Notes):
the version anchor produces 5 false positives against today's tree; the
last-touched-commit anchor produces a false negative on the CORE-390 case
specifically. Both were run, not reasoned about.

**Wikilink integrity.** All four IDs cited in the new `SPEC/procedures/README.md`
prose resolve to real archived tasknotes: `CORE-361`, `CORE-356`, `CORE-390`,
`CORE-395`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change; `SPEC.md` no change (§"Procedure SOPs" routes to `SPEC/procedures/README.md` for the schema, so the new clause is already reachable — verified the routing sentence, not assumed); `docs/MIGRATION.md` no change (`/ft-release` is flowtron-self only and never installed in adopters — confirmed against `docs/PLATFORMS.md:199`); `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` no change (grep for `currency|last-verified|stamp` → zero hits; the doc has no currency-stamp surface); `CONTRIBUTING.md` no change; `SECURITY.md` no change; **`docs/AGENT-NEUTRALITY.md` — updated**, one row registering `SPEC/procedures/README.md`'s Claude references; `docs/PLATFORMS.md` no change (its `/ft-release` rows describe install policy, not the recipe's internals); `claude/CAPABILITIES.md` no change (grep for `ft-release` → zero hits; it is a capability-trigger reference, and this task added no capability); `docs/AGENT-COMPAT.md` no change (dogfood currency rows advance only on a real verification run, which this task did not perform).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-08-02.` at the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/CORE-397.md`

- [x] **Evidence-based recap** drafted

**Final Summary:**

`/ft-release` could see every currency stamp in the repo except the one on
`SPEC/procedures/*.md` — the stamp tracking whether the agent-neutral SOP that
Codex and Grok agents actually drive `ft-task` from still matches its `source:`.
That blind spot let [[CORE-390]]'s debug-mode fold sit un-mirrored in the SOP for
two weeks until [[CORE-395]] caught it by hand. This task gives the release walk
a standing **flag-don't-bump** check that surfaces the same drift mechanically,
while preserving the [[CORE-361]] / [[CORE-356]] rule that a release must never
bump that stamp.

The design question that mattered was what anchors "has the source moved?", and
it was settled by running all three candidates against real history rather than
by preference. The stamp's **version** produces five false positives today,
because a mid-cycle re-check decouples the version from the date — it would
re-introduce exactly the release-pin semantics CORE-361 rejected. The SOP's
**last-touched commit** produces a false negative on the CORE-390 case itself,
because a touch is not a verification. Only the stamp's **date** is honest, and
filtering same-commit mirrors makes the output reproduce CORE-395's hand-built
ledger.

**Changed:** `claude/skills/ft-release/SKILL.md` (+31/−2) — the Step 5 standing
check, a residue-grep carve-out, a Step 3 Acceptance line, a §7.4 bundle line.
`SPEC/procedures/README.md` (+11) — the flag-don't-bump semantics stated in the
contract, not only the skill. `docs/AGENT-NEUTRALITY.md` (+1) — one ledger row.

**Verified:** the shipped shell block executed verbatim, clean today (exit 0);
the same block with the stamp rewound flags CORE-390 and CORE-385, matching
CORE-395's hand ledger, with all three same-commit mirrors correctly filtered;
both rejected anchors falsified by execution; viz 242/242 passing; all four new
wikilinks resolve.

**Refactors:** none made — four insertions and one in-place list widening. One
deliberately deferred and documented: the check anchors on `source:` as declared
(a single file), so a change touching only an `ft-task` lazy fragment would not
be flagged; widening it is a `source:` schema question and belongs in its own
ticket rather than as a silent broadening here.

**Documentation verdict:** one AI-referenced doc updated
(`docs/AGENT-NEUTRALITY.md`, surfaced by the sweep rather than the ticket);
eleven verified unchanged, with `docs/CONVENTIONS.md`, `claude/CAPABILITIES.md`,
and `SPEC.md`'s routing sentence grepped rather than assumed.

**Maintainability effect:** the adjudication CORE-361 performed by hand and
buried in Implementation Notes is now standing skill text a releaser cannot miss,
sitting directly beneath the dogfood gate so the contrast between the two stamp
families — resolved-and-bumped vs flagged-and-never-bumped — is visible at the
point of decision. The residue-grep carve-out closes the trap that would
otherwise have pushed the very next release toward bumping the stamp.

**Archived:** 2026-08-02
