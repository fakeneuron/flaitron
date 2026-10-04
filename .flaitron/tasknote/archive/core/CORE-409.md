---
title: sop-drift-detector-gap
status: completed
tags: []
created: 2026-08-06
due:
related-tasks: [CORE-408.N, CORE-397, CORE-395, CORE-390, CORE-270]
---

# CORE-409 | sop-drift-detector-gap

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-408.N]] [[CORE-397]] [[CORE-395]] [[CORE-390]] [[CORE-270]]

## 🎯 Goal

Widen `/ft-release`'s SOP-currency check beyond the single `source:` file so a
change to any surface a procedure SOP mirrors or restates is surfaced — with a
two-tier output that keeps the adjudication list small enough to survive.

## ✅ Acceptance

- [x] `source:` accepts **one or more** space-separated paths (files or directories); `SPEC/procedures/README.md` §"Frontmatter schema" states the widened form and the space-separated convention
- [x] A second frontmatter field carries the **restated contract surfaces** (advisory tier), documented in the same schema table as optional — shipped as `restates:`
- [x] `/ft-release` Step 5's shell block walks both fields: `source:` paths emit per-commit `DRIFT CANDIDATE` lines (tier 1, unchanged semantics); restated paths emit **one count line per path** (tier 2)
- [x] The check stays **flag-don't-bump and advisory** — no new gate, no stamp bump, `/ft-file-followup` routing preserved ([[CORE-361]] / [[CORE-356]] precedent intact)
- [x] `SPEC/procedures/ft-task.md` frontmatter populated with the widened watch set, closing [[CORE-397]]'s explicitly-deferred lazy-fragment gap — verified against 5 real fragment-only commits
- [x] `SPEC.md` §"Procedure SOPs" frontmatter-shape sentence lists the new field
- [x] Verified against real history: the widened check flags `5be450e` ([[CORE-408.2]], the probe clause) — the commit today's check structurally cannot see — and the tier-2 note is one line, not 13
- [x] PLAN.md line flipped to stub form under `## Completed`; tasknote archived to `.flowtron/tasknote/archive/core/CORE-409.md`

## 🧩 Subtasks

- [x] Add the `restates:` row to `SPEC/procedures/README.md` §"Frontmatter schema"; widen the `source:` row to a path list; update the example block and the `last-verified:` wording
- [x] Replace `/ft-release` Step 5's shell block with the two-tier walk; update the surrounding prose (watch-set description + resolution branches)
- [x] Populate `SPEC/procedures/ft-task.md` frontmatter with the widened watch set
- [x] Update `SPEC.md:94` frontmatter-shape sentence
- [x] Execute the new shell block verbatim against real history; confirm tier-1 flags `5be450e` and tier-2 emits one note line
- [x] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-408.N]] — the audit that surfaced this gap (Finding #2); its Finding #1 is the drift the widened check would have caught
- [[CORE-397]] — sop-currency-gate; built the check being widened, and deferred the lazy-fragment half of this exact gap by name
- [[CORE-395]] — sop-currency-recheck; the hand re-check the check automates
- [[CORE-390]] — debug-mode-fold; the original drift that hid for two weeks
- [[CORE-270]] — pinned `source:` semantics as derivation-not-ownership

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real, unmitigated, and *structurally* invisible to
  the existing detector — not a judgment miss. [[CORE-397]] anchored the check
  on the single path `source:` declares, and [[CORE-408.N]] Finding #1 landed
  entirely outside it. Both halves confirmed against the tree, not recalled:
  `SPEC/procedures/ft-task.md:3` still reads `source: claude/skills/ft-task/SKILL.md`
  (one file), and the check flags zero commits for the probe-clause window.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md:146-206`
  (Step 5, incl. the check at 181-204), `SPEC/procedures/README.md`,
  `SPEC/procedures/ft-task.md:1-40`, `SPEC.md` §"Procedure SOPs",
  `.flowtron/tasknote/README.md` §"AI-referenced docs". Read set was narrow and
  its shape known from the PLAN line — no probe needed.

- [x] **Best Practices Review** — `N/A` for code boundaries; the deliverable is
  skill prose + frontmatter schema, no executable or importable surface. The
  governing boundary is editorial and was inherited rather than invented:
  [[CORE-397]] established the **standing check** shape (bolded lead · inline
  shell · explicit anchor rationale · verdict clause) and placed this check in
  Step 5 beside the currency stamps. This task edits that block in place and
  adds no new section, so the placement call does not reopen. The one new
  boundary question — one widened field vs. two fields — is resolved in
  Discovery Notes on semantics, not preference.

- [x] **Archive skim** — `grep -l "SPEC/procedures" archive/core/*.md` → 54 hits;
  load-bearing ones read in full: [[CORE-397]] (built this check; its
  Implementation Notes name this task's sibling gap explicitly — see below),
  [[CORE-408.N]] (Finding #2, the filing source), and the [[CORE-361]] /
  [[CORE-356]] flag-don't-bump precedent chain via CORE-397's citations.

- [x] **Drift check** — every cited fact re-verified against the tree.
  `/ft-release` Step 5's SOP-currency block is at lines 181-204 and its loop
  does `git log ... -- "$src"` on a single quoted path (confirmed at line 190).
  `SPEC/procedures/ft-task.md:4` reads `last-verified: v5.14.1 · 2026-08-02`
  (unbumped by CORE-408.N by design). `SPEC.md:94` restates the frontmatter
  shape as `procedure:` / `source:` / `last-verified:` — a third restatement
  surface this task must keep in sync. Cross-artifact half: the plan
  contradicts no SPEC contract. `SPEC.md` §"What flowtron does NOT provide" bars
  *schema validators*; this stays operator-driven prose with inline shell, the
  same shape CORE-397 already shipped. Zero-scripts (Core Principle #2) rules
  out a `tools/` helper. The PLAN line's "widen the watch set **or** add a
  second anchor field" is satisfied by either; the chosen design does both,
  because the two-tier output requires the two surfaces to be distinguishable.

- [x] Asked clarifying questions — **one asked**, on the only genuine design
  fork (how to handle `SPEC.md`), resolved by the operator against measured
  data rather than preference. See Discovery Notes.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The gap, precisely.** [[CORE-397]] built the SOP-currency check to anchor on
whatever `source:` declares — for `ft-task`, the single file
`claude/skills/ft-task/SKILL.md`. But the SOP has **two** kinds of upstream:
the Claude skill it is derived from, and the SPEC contracts it restates.
[[CORE-408.N]]'s Finding #1 (the probe clause) landed in `SPEC.md` and
`templates/tasknote-template.md` and never touched the Claude skill — so no
`source:` commit occurred and the check had nothing to flag. Finding #2 recorded
that as the recurrence of the very failure the check exists to prevent, through
a hole the [[CORE-395]] fix does not cover.

**[[CORE-397]] named this task's sibling by hand.** Its Implementation Notes
close with a "Known limitation, deliberately not widened" paragraph: the check
anchors on a single file, so a change touching only an `ft-task` *lazy fragment*
(`step-1.5-model-edge.md`, `step-3a-promote-starter.md`,
`step-3c-resume-blocked.md`, `step-4-debug-mode.md`) is invisible too — and it
routes the fix here verbatim: *"the right fix is a `source:` schema question
(should it accept a path list or a directory?), which is a separate ticket, not
a silent broadening here."* Same root cause, same ticket. Closing only the
SPEC half while leaving the fragment half open would re-file CORE-397's
deferral for a third time.

**Watch-set candidates, measured — not reasoned about.** Following CORE-397's
own precedent of settling the anchor question by execution:

| Candidate watch path | commits / 60d | candidates in the CORE-408 window |
|---|---|---|
| `claude/skills/ft-task/SKILL.md` (today's `source:`) | 14 | **0 — the miss** |
| `claude/skills/ft-task/` (dir; closes CORE-397's deferral) | 16 | 0 |
| `templates/tasknote-template.md` | 7 | **1 — the true positive, zero noise** |
| `SPEC.md` (whole file) | 53 | **13** |

Two results decided the design. First, `templates/tasknote-template.md` is a
near-perfect proxy for the checklist surface the SOP mirrors: `5be450e`
([[CORE-408.2]]) carried the probe clause into *both* `SPEC.md` and the
template, so a template watch flags Finding #1 with exactly one candidate and no
false positives. Second, `SPEC.md` whole-file is unusable as a peer path —
12-16 candidates per release cut (cadence is ~weekly; ~11 `SPEC.md` commits per
window), against the 0-2 CORE-397's design produces. A 16-item adjudication list
at every cut is how an advisory check gets rubber-stamped into uselessness.

**Design fork, put to the operator.** Three options were presented with the
measured cost of each: precise-only (skill dir + template), full (`SPEC.md` as a
peer path), or **tiered**. Operator chose **tiered**: mirror surfaces emit
per-commit `DRIFT CANDIDATE` lines exactly as today; restated contract surfaces
emit **one count line per path**. This covers the PLAN line's stated premise —
`SPEC.md` drift becomes *visible* rather than invisible — while the adjudication
list stays at 0-2. Coverage without a noise flood.

**Two fields, not one widened field.** The tiering *requires* the two surface
classes be distinguishable in the frontmatter, which settles a question that
would otherwise be a coin-flip: `source:` keeps its [[CORE-270]] semantics
(derivation from the canonical Claude wiring) and merely widens from one path to
a list; a new optional `restates:` carries the contract surfaces the SOP
paraphrases but does not mirror line-for-line. Had the operator chosen
precise-only, one widened field would have been correct — the second field earns
its keep only because tier 2 exists.

**Explicit assumptions.**

1. **The `last-verified:` stamp is not bumped by this task.** Widening the watch
   set is not a re-verification of the SOP against it ([[CORE-408.N]] declined
   the same bump for the same reason). Consequence, stated here so the next
   releaser is not surprised: the first widened run **will** flag `5be450e` as a
   tier-1 candidate. That is a correct flag the operator dismisses as
   already-mirrored — CORE-408.N landed the probe clause in the SOP (verified:
   `grep -c probe SPEC/procedures/ft-task.md` → 3).
2. **The AI-referenced-docs ledger is not widened.** Finding #2's second half
   notes `SPEC/procedures/*.md` sits outside the Phase 4 sweep, and
   [[CORE-408.N]] deliberately declined to fix it there. It stays declined: the
   ledger's closing paragraph excludes `SPEC/*.md` by design, and a SOP does not
   drift per-task — it drifts when its upstream moves, which is precisely what
   the release-time check now watches. Adding it would tax every Phase 4 closure
   in the repo to catch a release-cadence event.
3. **Space-separated paths on one line**, not a YAML list — the skill extracts
   frontmatter with `sed` and word-splits into `git log`, so this needs no
   parser and keeps Core Principle #2 (zero scripts) intact.
4. `SPEC/procedures/` holds one SOP today (`ft-task.md`), but both fields are
   walked as a glob because the layer is designed to grow ([[CORE-397]]'s
   assumption, carried forward).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-397]]'s **standing check** shape in
  place rather than adding a sibling block: same bolded lead, same inline shell,
  same explicit anchor rationale, same verdict clause, same Step 5 placement
  beside the currency stamps. The two-tier split is a widening *inside* that
  block, not a new one. The frontmatter change follows the schema table's
  existing row shape, and `restates:` reuses `source:`'s space-separated path
  convention rather than inventing a second encoding.

- [x] **Minimal refactor gate** — no restructuring. Four files, all additive or
  in-place: one shell block rewritten, three prose insertions, one schema row
  added, one row and three sentences reworded for the widened semantics. No
  section moved, renamed, or split; no `tools/` script (Core Principle #2).
  Deferred cleanup: none surfaced.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` as unit tests; the
  deliverable is skill prose + frontmatter with no importable surface.
  Substituted **execution verification** of the shipped block against real git
  history, including [[CORE-397]]'s regression case and a new portability case
  (see Testing Notes). This substitution caught a real defect — see below.

**Implementation Notes:**

Four files, +56/−21.

**`SPEC/procedures/README.md` (+25/−12)** — §"Frontmatter schema" reworked:
`source:` widened from "the canonical Claude skill" to "the surfaces this SOP
mirrors", one or more space-separated paths, directories allowed; new optional
`restates:` row for paraphrased contract; `last-verified:` now says it tracks
"its watched surfaces (`source:` + `restates:`)"; a new **"Why two fields"**
paragraph carries the measured rationale; the flag-don't-bump paragraph now
describes both tiers; the example block shows the widened shape.

**`claude/skills/ft-release/SKILL.md` (+25/−6)** — Step 5's shell block replaced
with the two-tier walk, plus three prose updates: the check's lead sentence
(now `source:` + `restates:`), a **"Why the second tier is a count"** paragraph,
a **portability guard** paragraph, and a third resolution branch for the
tier-2 note. Placement, gate count, and flag-don't-bump semantics unchanged.

**`SPEC/procedures/ft-task.md` (+2/−1)** — frontmatter populated:
`source: claude/skills/ft-task/ templates/tasknote-template.md`,
`restates: SPEC.md`. The directory form closes [[CORE-397]]'s deferred
fragment gap without listing four fragment filenames that would go stale.

**`SPEC.md` (+1/−1)** — §"Procedure SOPs" frontmatter-shape sentence gains
`restates:`. Found by the drift check, not the ticket: `SPEC.md:94` is a third
restatement of a schema owned by `SPEC/procedures/README.md`, so widening the
schema without it would have shipped this task's own class of drift.

**One real defect, caught by running the block instead of reading it.** The
first draft used `git log … -- $src`, correct in `sh`/bash. **zsh does not
word-split an unquoted `$var`** — it passed the whole two-path string as one
pathspec, matched nothing, and printed a *clean* verdict for a demonstrably
drifting SOP. Since the block ships in an `sh` fence but is pasted into an
interactive shell (zsh on this workstation), that is a silent false negative —
the one failure mode a drift detector must not have, and the same shape of bug
this task exists to remove. Fixed with `$(echo "$src")`, which splits in zsh,
bash, and `sh` alike (verified in all three), and guarded twice against a future
"simplification": an inline code comment and a prose paragraph in the skill.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` →
  **18 files / 245 tests passed** (4.40s). Not a targeted surface (no PLAN
  grammar or parser change); run as the registered release-gate sanity check.

- [x] Ran lint/type-check on changed code — `N/A` for linting: markdown only, no
  linted or typed surface. Substituted execution verification of the shipped
  shell block plus the structural checks tabulated below.

- [x] **Quality assertions** — the only new "code" is the shell block, and it
  was **executed as written** rather than eyeballed, in two shells and against
  two stamp dates. No duplication: the measured rationale is stated once in
  `SPEC/procedures/README.md` §"Why two fields" and once operationally in the
  skill's §"Why the second tier is a count"; the two are not copies — the
  contract states the semantics, the skill states the operating consequence.
  No dead prose. Public-surface growth is exactly one optional frontmatter
  field; zero new gates, banners, files, or scripts, so the two-banner cap is
  untouched. No stale code-facing docs: all four restatements of the schema
  (`README.md` table, `README.md` example, `SPEC.md:94`, the skill's lead
  sentence) were updated together and re-read after editing.

- [x] (frontend) Asked the user for visual confirmation — `N/A`. No frontend
  surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**The widened check adds exactly two catches — one per named gap, zero
regressions.** Run verbatim from the skill at the current stamp (2026-08-02):

```text
== SPEC/procedures/ft-task.md  (source: claude/skills/ft-task/ templates/tasknote-template.md, verified: 2026-08-02)
   DRIFT CANDIDATE  5be450e feat: CORE-408.2 — isolation-contract
   DRIFT CANDIDATE  4b0ad83 fix: CORE-400 — model-edge-fragment-strategy
   note: 3 SPEC.md commits since stamp — skim if the SOP restates a changed section
```

`5be450e` is the target: the commit carrying the probe clause into `SPEC.md` +
`templates/tasknote-template.md`, which [[CORE-408.N]] Finding #2 proved the old
check *structurally* could not see. It is now flagged.

**Regression case — [[CORE-397]]'s ledger reproduced, then extended.** Same
block, stamp rewound to the pre-[[CORE-395]] value (2026-07-21), classified by
whether the old single-file anchor could have seen each hit:

| Commit | | Old check | Gap it represents |
|---|---|---|---|
| `5be450e` | CORE-408.2 — isolation-contract | **MISSED** | SPEC/template — [[CORE-408.N]] Finding #2 |
| `db6a6a2` | CORE-373 — model-roster-refresh | **MISSED** | lazy fragment — [[CORE-397]]'s deferral |
| `4b0ad83` | CORE-400 — model-edge-fragment-strategy | caught | — |
| `c5ea07a` | CORE-390 — debug-mode-fold | caught | the original motivating drift |
| `baf3716` | CORE-385 — skill-trigger-frontmatter | caught | — |

All three previously-caught commits still flag (no regression), and the three
same-commit mirrors [[CORE-397]] classified in-sync ([[CORE-391]], [[CORE-393]],
[[CORE-381]]) remain correctly filtered.

**The fragment gap was real, not hypothetical.** Isolating commits that touched
an `ft-task` lazy fragment but *not* `SKILL.md` returns five across the repo's
history (`db6a6a2`, `3ed5c24`, `3346d6b`, `3f13e00`, `c49fd9e`) — each invisible
to the old anchor, each covered by the directory form now. One earlier reading of
mine was wrong and is corrected here: `4b0ad83` does *not* demonstrate this gap,
because it touched `SKILL.md` as well.

**Tier 2 does what it was chosen to do.** In the rewound window, `SPEC.md`
contributes **one** note line reading `13` instead of 13 adjudicable candidates —
the noise suppression the operator selected, quantified on the same run that
proves coverage.

**Portability — the defect the run caught.** Word-splitting verified directly in
all three shells:

| Shell | bare `$src` | `$(echo "$src")` |
|---|---|---|
| zsh | **does not split** — one bogus pathspec, silent clean verdict | splits ✓ |
| bash | splits | splits ✓ |
| `sh` | splits | splits ✓ |

| Structural check | Method | Result |
|---|---|---|
| Viz suite (release gate) | `npm --prefix viz test` | 18 files / 245 tests passed |
| Changed-file set | `git diff --stat` | 4 files, +56/−21; zero files added |
| Trailing whitespace | `grep -n " $"` on all 4 changed files | none |
| SOP frontmatter parses | the exact `sed` expressions the skill uses | all 3 fields extract correctly |
| Code fences balanced | `awk` fence count over the release skill | 36 (balanced) |
| Wikilink integrity | every `[[ID]]` added to `SPEC/procedures/README.md` | `CORE-409` live in PLAN.md; `CORE-361`/`CORE-356`/`CORE-390`/`CORE-395` archived |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries walked. **`SPEC.md` — updated** (§"Procedure SOPs" frontmatter-shape sentence gains `restates:`; a third restatement of the widened schema, found by the drift check rather than the ticket). **`docs/AGENT-NEUTRALITY.md` — updated**, one cell: row 38 registered the `source:` anchor as `claude/skills/<procedure>/SKILL.md`, now stale since the anchor is the skill *directory*; the ledger's job is accuracy about which Claude paths the contract layer names, so the form matters. `README.md` no change (its two `last-verified` hits are the `docs/AGENT-COMPAT.md` dogfood stamp — a different stamp family). `docs/MIGRATION.md` no change (`/ft-release` is flowtron-self only, never installed in adopters; grep for the schema fields → zero hits). `claude/AGENTS-snippet.md` / `codex/AGENTS-snippet.md` no change (zero hits). `docs/CONVENTIONS.md` no change (zero hits). `CONTRIBUTING.md` no change. `SECURITY.md` no change. `docs/PLATFORMS.md` no change — verified rather than assumed: its five `SPEC/procedures/` references all describe *routing* to the SOP, and its `last-verified` mention at line 393 is the AGENT-COMPAT matrix column, not SOP frontmatter. `claude/CAPABILITIES.md` no change (its single hit is the dogfood stamp format; this task added no capability). `docs/AGENT-COMPAT.md` no change (dogfood rows advance only on a real verification run, which this task did not perform). `docs/EXTERNAL-AGENTS.md` no change (zero hits). `docs/WORKTREES.md` no change (zero hits). Also checked outside the ledger: `codex/procedures/ft-task.md` and `grok/procedures/ft-task.md` both point rather than restate, so neither carries the schema — no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-08-06.` at the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/CORE-409.md`

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

`/ft-release`'s SOP-currency check watched exactly one file — whatever `source:`
named — while the `ft-task` SOP actually derives from four surfaces. Two of them
were invisible to it, and both had already caused real, documented misses: a
`SPEC.md`/template change (which is how [[CORE-408.N]] Finding #1's probe clause
went unmirrored) and an `ft-task` lazy fragment ([[CORE-397]] named this gap in
its own Implementation Notes and routed the fix to a future ticket — this one).
The check now walks a widened `source:` path list plus a new optional
`restates:` field, in two tiers.

The tiering is the design call, and it was made against measured data rather
than taste. Adding `SPEC.md` as an ordinary watch path covers the gap but
produces **12-16 candidates per release cut** against the 0-2 [[CORE-397]]
designed around — an adjudication list that size is how an advisory check gets
rubber-stamped into uselessness. So mirrored surfaces (`source:`) still emit one
adjudicable candidate per commit, while paraphrased contract (`restates:`) emits
a single count line to skim. Broad-contract drift becomes visible without
becoming noise.

**Changed:** `SPEC/procedures/README.md` (+25/−12) — widened `source:`, new
`restates:` row, two-tier flag-don't-bump prose, measured "why two fields"
rationale. `claude/skills/ft-release/SKILL.md` (+25/−6) — the two-tier walk plus
three prose blocks. `SPEC/procedures/ft-task.md` (+2/−1) — the populated watch
set. `SPEC.md` (+1/−1) and `docs/AGENT-NEUTRALITY.md` (+1/−1) — the two schema
restatements the sweep caught.

**Verified:** the block executed verbatim, not eyeballed. It adds exactly two
catches — `5be450e` (the SPEC/template gap) and `db6a6a2` (the fragment gap) —
with zero regressions: all three commits the old check caught still flag, and
[[CORE-397]]'s three same-commit mirrors stay filtered. The fragment gap was
confirmed real, not hypothetical: five historical commits touched a fragment
without touching `SKILL.md`. Tier 2 collapsed 13 would-be candidates to one
line. Viz 245/245. One earlier reading of mine was wrong and is corrected in
Testing Notes: `4b0ad83` does not demonstrate the fragment gap, since it touched
`SKILL.md` too.

**The run caught a real defect that reading would not have.** The first draft's
`git log … -- $src` is correct in `sh`/bash but **zsh does not word-split an
unquoted `$var`** — it passed both paths as one bogus pathspec, matched nothing,
and printed a *clean* verdict for a demonstrably drifting SOP. Shipped in an
`sh` fence, pasted into an interactive zsh, that is a silent false negative: the
one failure mode a drift detector must not have, and the same shape of bug this
task exists to remove. Fixed with `$(echo "$src")` (verified splitting in zsh,
bash, and `sh`) and guarded twice against future "simplification" — an inline
comment and a prose paragraph.

**Refactors:** none made; the change extends [[CORE-397]]'s standing-check shape
in place. Two things deliberately not done, both logged as Discovery
assumptions: `last-verified:` is **not** bumped (widening the watch set is not a
re-verification — so expect the first run to flag `5be450e` as an
already-mirrored candidate, which [[CORE-408.N]] resolved), and the
AI-referenced-docs ledger is **not** widened ([[CORE-408.N]] declined it; a SOP
drifts on release cadence, so taxing every Phase 4 closure in the repo is the
wrong instrument).

**Documentation verdict:** two AI-referenced docs updated, both surfaced by
checks rather than the ticket; twelve verified unchanged, with `PLATFORMS.md`,
`CAPABILITIES.md`, and `README.md` grepped rather than assumed.

**Maintainability effect:** the detector's blind spot is closed on both axes a
SOP can drift, and the schema now says *why* the two fields differ, so the next
SOP added to the layer inherits the distinction instead of rediscovering it.
[[CORE-397]]'s explicitly-deferred limitation is retired rather than re-filed a
third time.

**Archived:** 2026-08-06
