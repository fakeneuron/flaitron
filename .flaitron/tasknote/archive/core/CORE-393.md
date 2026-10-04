---
title: phase4-closure-hygiene
status: completed
tags: []
created: 2026-08-01
due:
related-tasks: [CORE-389.N, CORE-381, CORE-042.4, CORE-042.5]
---

# CORE-393 | phase4-closure-hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-389.N]] [[CORE-381]] [[CORE-042.4]] [[CORE-042.5]]

## 🎯 Goal

Resolve the two Phase 4 closure-hygiene splits [[CORE-389.N]] surfaced — the nav-header chip and the `## ✅ Acceptance` tick-through — by deciding each on its merits and encoding the outcome in the Phase 4 checklist, `templates/tasknote-template.md`, and (for the chip half) whatever SPEC surface keeps a future audit from re-filing it.

## ✅ Acceptance

- [x] `SPEC.md` §"Tasknote body shape" — the nav-header bullet leads with "not flipped at Phase 4 closure" so the chip-value list can no longer be read as licensing the write ([[CORE-042.5]] and [[CORE-389.N]] both took that path)
- [x] `SPEC.md` §"🚀 Phase 4: Closure" — carries a one-line note that there is deliberately no nav-chip flip here, citing [[CORE-042.4]], so an agent scanning Phase 4 finds the answer without navigating to §"Tasknote body shape"
- [x] `SPEC.md` §"🚀 Phase 4: Closure" — the existing `Closed —` box additionally requires every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with reason); **Phase 4 stays at 3 boxes**
- [x] `templates/tasknote-template.md` Phase 4 `Closed —` box mirrors the Acceptance requirement
- [x] `SPEC/procedures/ft-task.md` §5 Phase 4 mirrors it (agent-neutral projection stays in sync)
- [x] `claude/skills/ft-task/SKILL.md` Step 5 Phase 4 mirrors it
- [x] `claude/skills/ft-close-epic/SKILL.md`, `ft-epic-discovery/SKILL.md`, `ft-goal-task/SKILL.md` — each enumerates closure ops explicitly rather than deferring, so each mirrors it
- [x] `/ft-micro-task` and `/ft-debug` deliberately untouched, with the reason recorded (micro template has no `## ✅ Acceptance` section; `ft-debug` Step 7 defers to `/ft-task`)
- [x] Counter-assertion sweep across `SPEC.md`, `SPEC/`, `claude/`, `codex/`, `grok/`, `docs/`, `templates/`: zero surfaces assert a Phase 4 chip flip, zero permit unticked Acceptance at closure
- [x] **Zero archived tasknotes modified** — `git status` shows no change under `.flowtron/tasknote/archive/` (no backfill, per the operator decision)
- [x] `viz` test suite + typecheck/lint clean — 242/242 viz + 24/24 `update-adopters` pass; **no code path touched**, run as a regression guard on the re-scoped PLAN.md line
- [x] Dogfood: this tasknote closes under the new rule — every Acceptance box above ticked or annotated, nav chip left at `🟢 In progress`

## 🧩 Subtasks

- [x] `SPEC.md` §"Tasknote body shape" — restructure the nav-header bullet (lead with the closure carve-out, demote the value list)
- [x] `SPEC.md` §"🚀 Phase 4: Closure" — add the "no chip flip here, and why" note
- [x] `SPEC.md` §"🚀 Phase 4: Closure" — fold the Acceptance requirement into the `Closed —` box + matching prose paragraph
- [x] `templates/tasknote-template.md` — mirror the `Closed —` box edit
- [x] `SPEC/procedures/ft-task.md` — mirror in the §5 Phase 4 prose
- [x] `claude/skills/ft-task/SKILL.md` — mirror in Step 5 Phase 4
- [x] `claude/skills/ft-close-epic/SKILL.md` (Step 7), `ft-epic-discovery/SKILL.md` (Step 9), `ft-goal-task/SKILL.md` (Step 6) — mirror in each closure step
- [x] Counter-assertion grep across the contract layer
- [x] Verify: `git status` clean under `archive/`; `npm --prefix viz run test` / `node tools/update-adopters.test.mjs`

## 🔗 Related

- [[CORE-389.N]] — the epic audit that surfaced this; its "SPEC gap" diagnosis is the premise this task re-examines
- [[CORE-381]] — asserted the Phase 4 YAML `status:` flip; established the fold-into-existing-box precedent and the backfill-as-operator-override precedent
- [[CORE-042.4]] — SPEC v0.8.0; **deliberately retired** the Phase 4 nav-chip flip and made the chip render-derived
- [[CORE-042.5]] — the sibling that misread §"Tasknote body shape"; the same misreading recurs here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The PLAN line frames both halves as one class ("Phase 4 asserts the YAML `status:` flip but not the nav-chip flip or an Acceptance tick-through … Add both"). Discovery splits them: the Acceptance half is a genuine unencoded gap, but the chip half is **not** a gap — [[CORE-042.4]] deliberately retired that exact flip and `SPEC.md` §"Tasknote body shape" documents the omission as intentional. "Add both" would silently reverse a locked-in design decision. Re-scoped from *"add two missing boxes"* to *"decide each half on its merits; one of them is a re-open, not a fill-in"*.

- [x] Read relevant source files

- [x] **Best Practices Review** — contract-layer edit, not module-boundary work. The touched responsibility is the Phase 4 closure assertion set, which fans out identically to `SPEC.md` → `templates/tasknote-template.md` → `SPEC/procedures/ft-task.md` → the closure-driving skills. That fan-out is the established flowtron shape ([[CORE-381]] Implementation Notes), not duplication to consolidate. No in-scope refactor; no code path touched (`viz` reads YAML, never the markdown chip — see Discovery Notes).

- [x] **Archive skim** — see findings below

- [x] **Drift check** — see findings below

- [x] Asked clarifying questions (three; answers recorded below)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### The chip half is a reversal, not a gap

`SPEC.md` §"Tasknote body shape" (the Nav-header bullet, `SPEC.md:324–333`)
already answers this question explicitly, and answers it the other way:

> The chip in the markdown body is hand-authored at state transitions
> (scaffold, promotion, park, resume) for editor parity but is **not**
> flipped at Phase 4 closure — visualizers compute the canonical chip from
> YAML `status:` at render time, so archived tasknotes may show a chip text
> that lags the YAML state. **This is intentional:** YAML stays canonical for
> tasknote-bearing rows, the PLAN.md checkbox stays canonical for the roadmap
> binary, and the chip is render-derived.

That wording is the deliverable of [[CORE-042.4]] (SPEC v0.8.0, 2026-05-06,
Thrust C of `CORE-EPIC-042`), whose whole point was to cut Phase 4 from three
status writes to two:

> Phase 4 closure now writes 2 places (PLAN.md checkbox + YAML `status:`)
> instead of 3. Archived tasknotes intentionally show stale chip text — this
> tasknote is the first dogfood.

Its Acceptance line 21 reads: *"Phase 4 closure box 'Updated nav header status
icon to ✅ Completed' **is removed** from `SPEC.md` … and
`templates/tasknote-template.md`"*. The box CORE-393 proposes to add is the
box CORE-042.4 deliberately deleted.

**Where the audit's premise went wrong.** [[CORE-389.N]] cites `SPEC.md:325`
as evidence the chip *should* flip — but line 325 is the parenthetical listing
valid chip values (`🟢 In progress / ✅ Completed / ⏸ Blocked / ⚪ Not started /
🌱 Starter`) **inside the very bullet** that goes on to say the chip is not
flipped at closure. The list enumerates the vocabulary; it does not license the
write. This is the same misreading of §"Tasknote body shape" that produced
[[CORE-042.5]]'s contradiction, which [[CORE-381]] had to clean up nine days
later — the section has now caused the same error twice in three months.

Its second citation — *"`SPEC/blocked.md` requires chip flips for
blocked/resume"* — is accurate but not analogous: CORE-042.4 retired **only**
the closure flip and explicitly kept scaffold / promotion / park / resume
(`SPEC/blocked.md:35, :49`). Those transitions leave the tasknote **active**,
where an editor-parity chip still has a reader. Closure is the one transition
where the file stops being edited, which is exactly why it was the one cut.

### Nothing consumes the markdown chip

`viz/src/tasknote.ts` never parses the nav-header line. Both chip renderers —
`viz/src/ui/StatusChip.tsx` (detail panel) and `viz/src/ui/TaskRowInner.tsx`
(row) — derive from YAML `status:` via `STATUS_CHIP_LABEL` / `STATUS_LABEL`.
The markdown chip's only reader is a human with the raw file open. So flipping
it at closure buys editor parity for archived files and costs one more write to
keep in sync — the exact trade CORE-042.4 priced and rejected.

Corroborating: a contract-layer grep for `✅ Completed` / `nav-header chip` /
`nav chip` across `claude/skills/*/SKILL.md`, `SPEC/*.md`, `templates/*.md`,
`docs/*.md` returns **zero** closure-flip assertions. The retirement is clean;
there is no half-migrated state to finish.

### Both halves measured repo-wide (574 archived tasknotes)

The audit sampled 14 files and reported "roughly half … half" for both. The
full census is materially more lopsided:

| Surface | Split |
|---|---|
| Nav-header chip | **159** `✅ Completed` · **399** `🟢 In progress` · 5 non-enum (`✅ Complete` ×2, `✅ Done` ×2, `✅ De-scoped` ×1) · 11 no nav line → **~28% flipped** |
| `## ✅ Acceptance` | **156** fully ticked · **320** carry ≥1 unticked box · 98 have no Acceptance checkboxes at all → **~33% of those with boxes** |

So the behavior isn't a coin flip — it's a ~70/30 minority practice in both
cases, consistent with "a handful of runs did it unprompted" rather than "the
contract is ambiguous." Directionally the audit's conclusion (repo-wide,
long-standing, not cohort-introduced) holds; the 50/50 figure does not.

The 5 non-enum chips are the same files [[CORE-381]] found carrying non-enum
YAML `status:` values (`CORE-224.1`, `CORE-372`, `CORE-094`, `CORE-102`, plus
`CORE-058`'s `✅ De-scoped`) — their YAML was backfilled; the chip text wasn't,
because nothing asked it to.

### The Acceptance half has no counter-decision

No SPEC section, skill, or archived tasknote asserts that Acceptance boxes may
stay unticked at closure. `SPEC.md` §"Tasknote body shape" describes ✅
Acceptance as *"checklist of concrete, testable criteria for 'done'"* and Phase
4 never revisits them. This half is a real unencoded gap, and it is the more
load-bearing of the two: an unticked Acceptance box is the difference between
"verified against stated criteria" and "the agent felt finished" — precisely
the oversight checkpoint SPEC's lede claims (`SPEC.md:12–16`). [[CORE-381]] is
itself an example: it archived with all 12 Acceptance boxes unticked despite a
Testing Notes table verifying every one.

### Precedents that constrain the fix shape

- **Box-count discipline** ([[CORE-042.4]] → [[CORE-381]]). CORE-042.4 cut
  Phase 4 to three boxes on purpose; CORE-381's clarifying-question #3 answer
  was *"fold into the existing `Closed —` box … re-adding one would partly
  undo it."* A new standalone Acceptance box would be the third task in a row
  to relitigate the count.
- **Backfill = explicit operator override** ([[CORE-381]]). Write-once bars
  retroactive archive edits; CORE-381's 359-file backfill happened only as a
  named operator decision, and the 9 pre-frontmatter archives were still held
  out as "fabrication, not correction." Any backfill here needs the same
  explicit call. Note the asymmetry: backfilling YAML `status:` fixed data a
  parser actually reads; backfilling chips or Acceptance ticks would fabricate
  a verification record after the fact for files nothing parses.

### Clarifying questions — answers

1. **Chip half** → *Reject the flip; harden SPEC instead.* [[CORE-042.4]]'s
   decision stands. The deliverable becomes two doc edits: lead the nav-header
   bullet with the closure carve-out so the value list can't be misread as
   license, and put a one-line "no chip flip here, and why" note at Phase 4
   itself — where an agent scanning the checklist actually looks. (Rejected:
   reversing CORE-042.4 and re-adding the third write; doing nothing, which
   leaves a trap that has now fired twice.)
2. **Acceptance half** → *Fold into the existing `Closed —` box.* Follows
   [[CORE-381]]'s clarifying-question #3 precedent; Phase 4 stays at 3 boxes.
   Closure now requires every criterion ticked **or** explicitly annotated
   (`N/A` / not-met with reason) — the annotation escape hatch keeps the box
   from becoming a rubber stamp on tasks whose criteria genuinely shifted.
3. **Backfill** → *None.* [[CORE-381]]'s backfill fixed a field a parser reads;
   backfilling chips or Acceptance ticks would fabricate a verification record
   for text nothing parses. New tasknotes pick up the rule going forward.

### Edit-surface map (from the closure-op enumeration survey)

| File | Chip note | Acceptance fold |
|---|---|---|
| `SPEC.md` §"Tasknote body shape" | ✅ restructure bullet | — |
| `SPEC.md` §"🚀 Phase 4: Closure" | ✅ one-line note | ✅ `Closed —` box + prose |
| `templates/tasknote-template.md` | — | ✅ |
| `SPEC/procedures/ft-task.md` §5 | — | ✅ |
| `claude/skills/ft-task/SKILL.md` Step 5 | — | ✅ |
| `claude/skills/ft-close-epic/SKILL.md` Step 7 | — | ✅ |
| `claude/skills/ft-epic-discovery/SKILL.md` Step 9 | — | ✅ |
| `claude/skills/ft-goal-task/SKILL.md` Step 6 | — | ✅ |
| `claude/skills/ft-micro-task/SKILL.md` | — | **out of scope** — `templates/tasknote-micro-template.md` has no `## ✅ Acceptance` section |
| `claude/skills/ft-debug/SKILL.md` | — | **inherits** — Step 7 is "identical to `/ft-task`" without re-enumerating |
| `codex/` · `grok/` | — | **inherits** — thin pointer wrappers; grep for `Phase 4` / `status:` returns zero closure enumerations |

Same shape [[CORE-381]] mapped: SPEC asserts once, template + procedure SOP
mirror, and only the skills that *re-enumerate* closure ops need the restatement.

### Drift check

- PLAN line cites Phase 4 asserting the YAML flip per [[CORE-381]] — accurate;
  `SPEC.md:495`. ✅
- PLAN line's `templates/tasknote-template.md` target — exists, Phase 4 block
  at lines 89–99. ✅
- PLAN line's `~50/50` figure — **drift.** Repo-wide it is ~28% / ~33%
  (table above). Inherited from the audit's 14-file sample.
- PLAN line's framing of the chip flip as a missing assertion — **drift, and
  the load-bearing one.** It is a retired assertion, deliberately removed by
  [[CORE-042.4]]. Surfaced to the operator before proceeding; drives the
  Re-scope verdict above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, see below

**Implementation Notes:**

**Pattern survey.** Two established shapes were extended rather than invented:

1. *The closure-op fan-out* — assert once in `SPEC.md`, mirror in
   `templates/tasknote-template.md`, mirror in the agent-neutral
   `SPEC/procedures/ft-task.md`, then restate only in the skills that
   **re-enumerate** closure ops. Exactly the map [[CORE-381]] used. Following
   it meant `/ft-debug` (Step 7 = "identical to `/ft-task`") and the `codex/` +
   `grok/` pointer wrappers correctly inherit with zero edits.
2. *The "name the misreading" hardening* — [[CORE-381]] added a §"Write-once
   does not cover lifecycle writes" paragraph that leads with a bolded
   corrective sentence and then names the exact misreading that caused the
   drift. The nav-header rewrite mirrors that shape rather than adding a new
   callout style.

**Minimal refactor gate.** The Acceptance requirement was folded into the
existing `Closed —` box rather than given its own — honoring [[CORE-042.4]]'s
box-count cut and [[CORE-381]]'s fold precedent. Phase 4 stays at 3 boxes.

**One correction beyond the literal edit list.** Amending the closure-ops lead
sentence to include the Acceptance tick-through made the following sentence's
*"the **first** of the three writes"* ambiguous (three of what, now that five
ops are listed?). Disambiguated in place to *"the first of the three closure
writes (`status:`, PLAN.md line, archive move)"* — a two-line clarification the
edit itself created, not adjacent cleanup.

**Changed files (7 deliverables + PLAN):**

| File | Change |
|---|---|
| `SPEC.md` §"Tasknote body shape" | Nav-header bullet split into three paragraphs: definition → **bolded** four-transitions-not-closure carve-out with the CORE-042.4 citation → chip vocabulary demoted and explicitly labelled "not a list of writes closure should perform", naming CORE-042.5 and CORE-393 as the two tickets the old ordering produced |
| `SPEC.md` §"🚀 Phase 4: Closure" | `Closed —` box leads with the Acceptance requirement; closure-ops lead sentence + three-writes disambiguation; new **Acceptance tick-through** prose paragraph; new **No nav-header chip flip here** blockquote |
| `templates/tasknote-template.md` | `Closed —` box mirrored |
| `SPEC/procedures/ft-task.md` §5 | Phase 4 prose mirrored (tick-through + explicit no-chip-flip) |
| `claude/skills/ft-task/SKILL.md` Step 5 | Phase 4 mirrored |
| `claude/skills/ft-close-epic/SKILL.md` Step 7 | New tick-through bullet before the PLAN flip |
| `claude/skills/ft-epic-discovery/SKILL.md` Step 9 | New tick-through bullet before the PLAN flip |
| `claude/skills/ft-goal-task/SKILL.md` Step 6 | Tick-through folded into the closure sentence, with the loop-specific rule that a `loop-max` soft stop closes with unmet criteria **annotated**, never silently unticked |
| `.flowtron/PLAN.md` | CORE-393 line rewritten for the Re-scope verdict (42 words, within the ≤50w target) |

**Deliberately untouched.** `/ft-micro-task` —
`templates/tasknote-micro-template.md` has no `## ✅ Acceptance` section, so
there is nothing to tick; adding one would grow the micro shape the template
deliberately keeps minimal. `/ft-debug` — Step 7 defers wholesale to
`/ft-task`. `codex/` + `grok/` — thin pointer wrappers; a grep for
`Phase 4` / `status:` across both returns zero closure enumerations.

**No tests added.** Contract/procedure assertions only; no runtime code path
exists to test, and flowtron ships no schema validator by design (SPEC §"What
flowtron does NOT provide"). Verification is the sweep + suite runs below.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `N/A`, see below

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation

- [x] (frontend) Asked the user for visual confirmation — `N/A`, see below

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Command | Result |
|---|---|---|
| viz suite | `npm --prefix viz run test` | **242/242 pass**, 18 files |
| Release gate | `node tools/update-adopters.test.mjs` | **24/24 pass**, 9 suites |
| Archive untouched | `git status --porcelain .flowtron/tasknote/archive/` | **empty** — 0 of 574 archives modified |
| Chip-flip counter-assertions | `grep -rn` for closure-time `✅ Completed` chip writes across `SPEC.md`, `SPEC/`, `claude/`, `codex/`, `grok/`, `docs/`, `templates/`, `README.md` | **0 hits** (the park/resume flips in `SPEC/blocked.md:35,:49` correctly survive — CORE-042.4 retired only the closure flip) |
| Unticked-Acceptance permissions | `grep -rni` for surfaces permitting unticked Acceptance at closure | **0 hits** |
| PLAN line still parses | re-scoped line checked against `viz/src/parser.ts:60` + `WIKILINK_PATTERN:82` | ✅ — `[[CORE-042.4]]` matches the `\.(?:\d+\|N)` subtask branch; `[medium]🧩` hits the decorative-glyph tolerance |

**Lint/type-check `N/A`.** No code file changed — all 8 modified paths are
markdown contract/skill/template surfaces. The viz suite and the adopters gate
were still run: `.flowtron/PLAN.md` **is** parsed by `viz/src/parser.ts`, and
the Re-scope rewrote its CORE-393 line, so the suite is the regression guard
for that edit rather than a formality.

**Quality assertions.** No duplication introduced: the Acceptance requirement
is asserted once in `SPEC.md` and *restated* in the six downstream surfaces
that re-enumerate closure ops — the established fan-out ([[CORE-381]]), not
copy-paste, and the four surfaces that inherit (`/ft-debug`, `/ft-micro-task`,
`codex/`, `grok/`) were deliberately left alone. No dead code, no complexity,
no public-surface growth (Phase 4 stays at 3 boxes). The stale code-facing
documentation in scope *was* the finding: `SPEC.md`'s nav-header bullet led
with a chip-value list that two separate tickets read as license for a write
the same bullet forbids — that ordering is now inverted and the trap named.

**Visual confirmation `N/A`.** No frontend file touched; no rendered output
differs. Confirmed by the unchanged 242-test viz suite.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Doc-drift sweep (12 entries):**

| Entry | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | **updated** — §"Tasknote body shape" nav-header bullet restructured; §"🚀 Phase 4: Closure" `Closed —` box + closure-ops prose + new Acceptance tick-through paragraph + new no-chip-flip blockquote |
| `docs/MIGRATION.md` | no change — its Phase-4 mention (line 248) describes the doc-sweep list itself, not the closure write set |
| `claude/AGENTS-snippet.md` | no change — its Acceptance mention (line 23) is the `/ft-goal-task` machine-checkable target, unaffected by the tick-through rule |
| `codex/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — line 66 describes tasknote shape as an ADR analogue; the section list is unchanged |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — both halves land in the agent-neutral `SPEC.md` + procedure SOP, adding no Claude-specific surface |
| `docs/PLATFORMS.md` | no change — `codex/` and `grok/` wrappers inherit; the plug-in pattern is untouched |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | no change — no per-agent consume-mode or entry-point changed |

**Final Summary:**

Phase 4 now requires an Acceptance tick-through at closure, and the SPEC
section that has twice been misread into proposing a nav-chip flip has been
restructured so it can't be. The ticket asked to add **two** missing Phase 4
boxes; Discovery found only one was missing. The nav-chip flip is not a gap —
[[CORE-042.4]] (SPEC v0.8.0) deleted that exact box on purpose to cut closure
from three status writes to two, and `SPEC.md` documented the omission as
intentional. [[CORE-389.N]] cited `SPEC.md:325` as evidence the chip *should*
flip, but that line is the list of valid chip values sitting **inside** the
bullet that forbids the write. This is the second ticket to make that exact
misreading: [[CORE-042.5]] made it three months earlier and [[CORE-381]] had to
clean it up. So the chip half shipped as a **hardening** instead of a
reversal — the bullet now leads with the carve-out, the value list is demoted
and explicitly labelled "not a list of writes closure should perform", and
Phase 4 itself carries a blockquote answering the question where a scanning
agent actually looks.

**Changed files (8, all markdown):** `SPEC.md` (2 sections),
`templates/tasknote-template.md`, `SPEC/procedures/ft-task.md`,
`claude/skills/ft-task/SKILL.md`, `claude/skills/ft-close-epic/SKILL.md`,
`claude/skills/ft-epic-discovery/SKILL.md`,
`claude/skills/ft-goal-task/SKILL.md`, `.flowtron/PLAN.md`. No code path
touched.

**Measurement corrected.** The ticket's "~50/50 split" came from the audit's
14-file sample. Repo-wide across all 574 archived tasknotes: nav chip **159
`✅ Completed` / 399 `🟢 In progress`** (~28%); Acceptance **156 fully ticked /
320 carrying ≥1 unticked box** (~33% of the 476 that have boxes). Not a coin
flip — a ~70/30 minority practice, which reads as "a few runs did it
unprompted" rather than "the contract is ambiguous."

**Verification.** viz 242/242 pass; `update-adopters` gate 24/24 pass;
`git status` under `.flowtron/tasknote/archive/` empty (0 of 574 modified);
counter-assertion greps return 0 chip-flip assertions and 0 unticked-Acceptance
permissions. The park/resume chip flips in `SPEC/blocked.md` correctly survive —
CORE-042.4 retired only the closure flip.

**Refactor deferred (deliberate).** Four surfaces that would have needed the
restatement under a copy-everywhere reading were left untouched because they
inherit: `/ft-debug` (Step 7 = "identical to `/ft-task`"), `/ft-micro-task`
(its template has no `## ✅ Acceptance` section at all), and the `codex/` +
`grok/` pointer wrappers.

**No backfill (operator decision).** [[CORE-381]]'s 359-file backfill fixed a
field a parser actually reads. Chips and Acceptance ticks are read by nobody
but a human with the raw file open, so backfilling them would fabricate a
verification record for 320 tasknotes where no one checked — the line CORE-381
also held at its 9 pre-frontmatter archives.

**Maintainability effect.** The Acceptance half closes the gap between "the
agent felt finished" and "the work was checked against its stated criteria,"
which is the oversight checkpoint `SPEC.md:12–16` claims flowtron provides —
[[CORE-381]] itself archived with all 12 Acceptance boxes unticked despite a
Testing Notes table verifying every one. The chip half's durable contribution
is narrower but more interesting: a SPEC section that misleads two independent
readers in three months is a defect in the *document*, and it now names its own
failure mode inline, the same technique CORE-381's write-once carve-out used.
This tasknote dogfoods both rules — Acceptance fully ticked, nav chip left at
`🟢 In progress`.

**Archived:** 2026-08-01
