---
title: visual-baseline-vs-park
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-495, CORE-473.2, CORE-386]
touches:
  - SPEC/gates.md
  - claude/skills/ft-task/unattended-mode.md
---

# CORE-503 | visual-baseline-vs-park

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-495]]

## 🎯 Goal

Decide whether a passing, unchanged visual baseline should carve out the
`--unattended` 👁️ `CONFIRM` → park conversion CORE-495 established, and record
the verdict in the SPEC so the question stops re-surfacing.

## ✅ Acceptance

- [x] `SPEC/gates.md` §"Park conversions" → the 👁️ trigger note names the **passing-baseline** argument explicitly and refutes it on both premises: unverifiable provenance, and coverage-as-the-deleted-split
- [x] The same note states the no-cost case — where output provably did not change, the Phase 3 box is already `N/A`, emits no ask, and never parks — so the carve-out only bites where the baseline is not evidence
- [x] `SPEC/gates.md` §"Rationalizations" gains **one row** phrased in the re-filer's own words ("a recorded human approval replayed"), distinct from the weaker "probably fine" row already at `:671`
- [x] `SPEC/gates.md` §"Red Flags" gains **one line** whose symptom is the coverage judgment, per [[CORE-386]]'s standing rule that a gates-surface change arrives with both
- [x] `SPEC/gates.md:668`'s stale **"Five named gates"** corrected to six — drift left by [[CORE-495]]'s five→six move, verified against §"Park conversions" and four other surfaces
- [x] `claude/skills/ft-task/unattended-mode.md` §"Conversion map" trigger note compresses the same refusal and **cites** the contract rather than re-deriving it
- [x] **No** new park code, conversion row, cue glyph, banner, flag, or validator — conversion count stays six, `AWAITING APPROVAL` count unchanged, cue table untouched
- [x] No mirror-roster sweep required, **verified by grep** rather than asserted (flag semantics unchanged → Pair I `CAPABILITIES` ↔ `PLATFORMS` untouched)
- [x] Every added link and cited §heading resolves; no trailing whitespace; `viz` suite + typecheck + lint clean

## 🧩 Subtasks

- [x] `SPEC/gates.md` — the 👁️ trigger-note paragraph refuting the baseline argument
- [x] `SPEC/gates.md` — one Rationalizations row
- [x] `SPEC/gates.md` — one Red Flags line
- [x] `SPEC/gates.md` — the `:668` five→six count fix
- [x] `claude/skills/ft-task/unattended-mode.md` — trigger-note clause
- [x] Phase 3 — verify by command: conversion-count parity, banner-count parity, glyph set-diff, link/anchor resolution, whitespace, mirror-sweep null result, viz suite + typecheck + lint
- [x] Phase 4 — doc-drift sweep, PLAN line flip, archive

## 🔗 Related

- [[CORE-495]] — `related-decision:` — established the 👁️ → park conversion this task re-examines, and offered the same split at its Q1; this note refuses the narrower re-raise and pays for the refusal in findable prose
- [[CORE-473.2]] — `related-decision:` — the posture whose `--fast` inheritance CORE-495 narrowed; the argument refused here is a bid to widen it back
- [[CORE-386]] — `related-decision:` — the standing rule that a `SPEC/gates.md` change arrives with Rationalizations / Red Flags rows

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The question is live and the surface it targets is real at HEAD: `SPEC/gates.md:515-522` states the 👁️ trigger with no gating-vs-corroborating split, and `:671`'s Rationalizations row refutes only the weaker *"tests are green and it probably looks fine"* — not the sharper claim the PLAN line raises. So the contract does not currently answer this task's question in the words a re-filer would use, which is the [[CORE-393]] failure mode `SPEC.md:811` names by ID. Proceed to answer it and record the answer where it will be found.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A for code boundaries; the deliverable is contract prose in one module plus its executable-interpretation fragment. The dependency direction that *does* apply is stated in `unattended-mode.md`'s own header — the contract lives in `SPEC/gates.md`, the fragment cites it — and it constrains the edit: the argument is written once in the contract, compressed in the fragment.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The question, stated precisely.** [[CORE-495]] converts the Phase 3 👁️ ask to a
park under `--unattended`, with the trigger fixed at the *emission condition* and
an explicit refusal to split gating from corroborating. This task raises the
strongest available counter-example: a committed visual baseline that passes
**byte-identical** is not an inference about appearance — it is a recorded human
approval replayed. An intentional visual change fails it and parks anyway. So the
carve-out looks like it costs nothing.

**Why it is still refused — three findings, in order of force.**

1. **The premise is unverifiable, and this posture is the reason.** "A recorded
   human approval" assumes a human ever approved the golden. Baselines are
   routinely minted by `--update-snapshots` with nobody looking, and nothing in the
   artifact distinguishes the two. Flowtron cannot check it — and `--unattended` is
   precisely the declaration that nobody is present to attest. The carve-out's
   load-bearing fact is the one fact the posture guarantees is unavailable.
2. **Coverage is the deleted split, renamed.** "Does this baseline cover the
   surface I changed?" is a judgment made by the agent about its own diff with no
   observer — the same shape as gating-vs-corroborating, arriving one step earlier.
   [[CORE-495]] put that split to the operator as its Q1 and it was declined, on
   the recorded ground that a second judgment surface mints a fresh rationalization.
3. **The genuinely-covered case already costs nothing.** If rendered output
   provably did not change, Phase 3 records the box `N/A`, emits no ask, and never
   parks — the contract already handles it upstream. The carve-out therefore only
   bites where the baseline's relation to the change is a *judgment*, which is
   exactly where it stops being evidence.

**Two supporting facts from the sweep.** Flowtron defines no visual baseline
anywhere — zero hits for baseline/screenshot/snapshot as a testing artifact across
`SPEC.md`, `SPEC/`, and the runner skills — so a carve-out would make the gate
contract depend on an artifact it cannot name, define, or verify, which is the
validator-adjacent scope `SPEC.md` §"What flowtron does NOT provide" refuses.
`docs/VERSION-HISTORY.md:51` records the adjacent screenshot-discipline work as
*"personal policy only, no flowtron-shipped surface"* — the same boundary held once
already.

**Cost asymmetry, unchanged from [[CORE-495]].** An over-park costs one resume; an
under-park closes a task whose rendered surface nobody saw, with no operator left
to catch it.

**So the deliverable is the refutation, not the rule.** The rule does not change.
What changes is that the contract now answers this argument *in the words a
re-filer would use* — which is the whole reason `SPEC.md:811` cites [[CORE-393]]:
a settled contract gets re-filed when the settlement is not findable.

**Archive skim** (`grep -l` over `.flowtron/tasknote/archive/core/` for
`SPEC/gates.md` → 12 recent hits; `visual-confirm`/👁️ → 12). Load-bearing:

- **[[CORE-495]]** — read in full. Its Q1 offered this exact split and the operator
  declined it; its Final Summary records the reason. Its `touches:` list is the
  authority for which surfaces a 👁️-contract change reaches, and it is why this
  task's scope is *two* files rather than eighteen: nothing here changes flag
  semantics, a count, or a code.
- **[[CORE-386]]** — a `SPEC/gates.md` change arrives with Rationalizations / Red
  Flags rows. Squarely applicable: this task's entire deliverable is that pair.
- **[[CORE-473.1]]/[[CORE-473.2]]** — the posture and its original strict-superset
  claim. The argument refused here is, structurally, a bid to restore one surface
  of the inheritance [[CORE-495]] narrowed — worth naming so the refutation lands
  next to that narrowing rather than as an unrelated caution.

**Drift check.** All cited paths, line numbers, and quotes verified by direct read
at HEAD (v5.22.0). One finding, in the exact table being edited:

- **`SPEC/gates.md:668` reads "Five named gates halt the run"** — stale. [[CORE-495]]
  moved the conversion count five → six and updated `SPEC.md:458`, `:503`, `:540`,
  `unattended-mode.md:44`, and `procedures/ft-task.md:56`, but not this
  Rationalizations cell. Fixing it is in scope: it is the cell adjacent to the row
  this task adds, and shipping a new row beside a wrong count in the same table
  would be negligent. **No ⚠️ `Superseded by` pointer on [[CORE-495]]'s archived
  note** — the stale text lives in a live contract file, not in that note, and its
  Acceptance claimed only the `SPEC.md` count it did correct. Per `SPEC.md`
  §"Tasknote frontmatter" the pointer covers a falsified *factual claim in an
  archived note*; this is neither.

**Clarifying questions (AskUserQuestion, 1 asked).**

| # | Question | Answer | Consequence |
|---|---|---|---|
| Q1 | Carve-out, or refuse it? Four options: reject + sharpen · accept conditioned · reject but clarify upstream · de-scope | **Reject + sharpen** (the recommended option) | The rule is unchanged; the deliverable is a findable refutation. Rejects the two larger options — a conditioned carve-out (needs runner wiring and a coverage judgment) and the upstream clarification (the same judgment relocated to where no gate watches it) — and rejects de-scoping, which would leave the question to be re-filed a third time |

**Assumptions asserted.** The refutation is written **once** in `SPEC/gates.md`
§"Park conversions" and cited — not re-derived — in the SKILL fragment, matching
that fragment's own header. No SPEC version bump (`/ft-release` owns versioning).
No `park-reason` code, conversion row, glyph, banner, or flag is added, so no
mirror-roster sweep is implied — asserted here, verified by grep in Phase 3.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A. Contract prose only; no executable surface changed, and the gate contract has no validator by standing decision (`SPEC.md` §"What flowtron does NOT provide")

**Implementation Notes:**

**Pattern survey — extended three shipped shapes, invented none.** The refutation
paragraph sits inside §"Park conversions" beside the existing 👁️-trigger and ✋-split
notes, in their voice (bolded lead clause, then the argument). The Rationalizations
row and Red Flag line are [[CORE-386]]'s standing pair, and the row is deliberately
placed **immediately after** `:671`'s "probably fine" row so a reader arriving with
the weaker excuse meets the stronger one's refutation in the next line. Nothing new
was structured: no heading, no table, no file.

**Minimal refactor gate — no refactor.** Four additions and one word changed. The
one structural temptation declined: giving the baseline argument its own `###`
heading, as [[CORE-495]] did for §"What is inherited, and what is not". Declined
because that heading existed to be *cited from five other files*; this one has no
citers — the fragment cites §"Park conversions", which already exists.

**Written once, cited once.** `unattended-mode.md` gets a one-clause compression
plus a pointer, per its own header (*"the contract lives in `SPEC/gates.md`"*). The
provenance argument is not restated there — a runner loading the fragment needs the
rule and the pointer, not the reasoning.

**The in-scope drift fix.** `SPEC/gates.md:668` → `:686` read *"Five named gates halt
the run"*; corrected to six. [[CORE-495]] moved the count and updated five other
surfaces but not this cell. Verified post-fix: all six count claims across
`SPEC/gates.md` ×3, `SPEC.md`, `unattended-mode.md`, and `SPEC/procedures/ft-task.md`
now agree.

**Edit surface — 2 files, +24/−2:**

| File | Change |
|---|---|
| `SPEC/gates.md` | §"Park conversions" — the baseline-refutation paragraph (both premises + the no-cost case + the CORE-503/495 provenance line); §"Rationalizations" — one row in the re-filer's words; §"Red Flags" — one symptom line; `:686` — five→six |
| `claude/skills/ft-task/unattended-mode.md` | §"Conversion map" trigger note — one clause + contract pointer |

**Downstream-impact reconciliation — not triggered.** No direction-changing decision:
the verdict *preserves* the contract rather than changing it. `## High`, `## Low`,
and `## Future Opportunities` are empty and `## Medium` holds only this task, so
there is no active entry to reconcile against regardless.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` **28 files / 524 passed**; `node --test tools/update-adopters.test.mjs` **49 passed, 0 failed**. Both are release gates, run as regression proof rather than because this diff touches them

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` (`tsc --noEmit`) and `npm --prefix viz run lint` (`eslint src`) both clean

- [x] **Quality assertions** — no avoidable duplication: the provenance + coverage argument is stated **once** in `SPEC/gates.md` §"Park conversions"; the Rationalizations row compresses it and the SKILL fragment cites it, neither re-deriving it. No dead prose — the `:686` cell was a live claim that was false. No public-surface growth: zero new codes, rows, glyphs, banners, flags, files, or headings (one heading was considered and declined — see Implementation Notes). No stale code-facing documentation: `viz/src/parser.ts` parses neither `park-reason:` nor gate prose

- [x] (frontend) N/A — markdown contract prose only; no rendered surface changed, so no ask was emitted. Fitting for the subject: this is the upstream `N/A` the refutation says already costs nothing

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Acceptance here is structural, so each criterion was verified by command rather than
by reading:

| Check | Command | Result |
|---|---|---|
| Conversion-count parity | grep all six/five count claims across 4 files | **6/6 agree** post-fix (`gates.md` ×3, `SPEC.md:458`, `unattended-mode.md:44`, `procedures/ft-task.md:56`); was 5/6 at HEAD |
| Two-banner cap intact | `grep -c 'AWAITING APPROVAL'`, HEAD vs working, 4 gate-bearing files | `gates.md` **12→12**; `SPEC.md` / `blocked.md` / `loop.md` 0→0 |
| No new cue glyph minted | Python set-diff of all `So`/`Sk` code points, HEAD vs working, both changed files | **added=∅, removed=∅** — every glyph used already appeared in these files |
| Cited §headings resolve | extract `§"…"` from added diff lines, match against real `#+` headings | **2/2** (§"Park conversions", §"`--unattended` operator posture`") |
| Added links resolve | extract `](…)` from added lines | **none added** — vacuously clean |
| Mirror-roster null result | grep the 7 roster/mirror surfaces for the 👁️ trigger rule or a rationalization count | **null.** All 6 hits state the *six-gate enumeration* and the inheritance semantics — both unchanged by this diff — and none states the trigger rule. Pair I (`CAPABILITIES` ↔ `PLATFORMS` ×3) correctly untouched |
| Whitespace | `git diff --check` + trailing-space grep | clean / none |
| Release gates | viz suite + typecheck + lint; tools suite | 524 + 49 pass; all checks clean |

The mirror check is the one worth naming: it was run to prove a **negative**
(no sweep needed), which is the assertion most easily made by assumption. The
grep returned the roster lines and they enumerate six gates — consistent with
the corrected count, and independent confirmation that `:686` was the outlier
rather than the rule.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

Swept by grep across all 18 entries for `unattended` / `visual-confirm`/👁️ /
`baseline`/`snapshot` / `rationalization`/`red flag`, then by read on every
non-zero hit. **No entry required an update** — and the reason is uniform: this
task changed no rule, count, code, glyph, or flag semantic, so every mirror that
commits to those still states the truth.

| Doc | Verdict |
|---|---|
| `README.md` | no change — its 5 `--unattended` mentions state the posture and the delegation carve-out, both unaltered |
| `AGENTS.md` | no change — zero hits; repo layout + validation commands. Its four validation commands were the ones run |
| `SPEC.md` | no change — its one `Rationalizations` reference (`:685`) points at the pair without stating a count; §"🧪 Phase 3"'s conversion clause is unchanged, as is the `park-reason` closed set (no code added) |
| `docs/MIGRATION.md` | no change — zero hits on all four probes |
| `claude/AGENTS-snippet.md` | no change — states the delegation carve-out, not the trigger rule |
| `codex/` · `cursor/` · `grok/AGENTS-snippet.md` | no change — zero `unattended` hits in all three; thin wiring pointing at canonical bodies |
| `docs/CONVENTIONS.md` | no change — its single hit is the mirror-pattern illustration, unaffected |
| `CONTRIBUTING.md` | no change — zero hits; solo-maintenance model |
| `SECURITY.md` | no change, and checked by read: `:88` warns against suppressing the remaining pause under `--fast` / `--unattended` on contributor-authored content. Still true, and this task makes the posture no *less* strict — it refuses a proposed suppression. `:196`'s unattended-fleet-sweep line is orthogonal |
| `docs/AGENT-NEUTRALITY.md` | no change — **and verified by count, not by eye.** Its `:40` ledger row enumerates the `--fast` sites; the token count is **54→54** in `SPEC/gates.md` and **8→8** in `SPEC.md`, so no site was added. The only new flag tokens in the diff are `--unattended` (already ledgered) and `--update-snapshots`, which is neither Claude-specific nor flowtron-defined — reworded to `--update-snapshots`-style during Phase 4 so the contract reads it as illustration rather than a named artifact |
| `docs/PLATFORMS.md` | no change — all three §"Non-Claude capability triggers" tables enumerate the **six** gates and the inheritance semantics; both unchanged. Pair I holds without an edit |
| `claude/CAPABILITIES.md` | no change — same enumeration, same six, Pair I's other half. Last-verified stamp stands: no version bump here |
| `docs/AGENT-COMPAT.md` | no change — its 👁️ passage (`:153`) governs the *emission shape* of an ask that is emitted. This task changes neither the shape nor which asks are emitted |
| `docs/EXTERNAL-AGENTS.md` | no change, and this one needed a real read: `:65` tells an operator-less caller that the 👁️ ask parks *"rather than vanishing"* and defers the enumeration to `SPEC/gates.md`. It states the rule this task upholds and delegates the detail this task sharpened — correct as written |
| `docs/WORKTREES.md` | no change — zero hits; isolation convention, orthogonal |
| `docs/VISION.md` | no change — the refusal ships *less* machinery, not more. Its §"What we won't accept" boundary is what the verdict leans on (a carve-out would make the gate contract depend on a test artifact flowtron cannot define or verify), so the boundary is reinforced rather than moved |

**Outside the sweep set, edited as deliverables.** `SPEC/gates.md` and
`claude/skills/ft-task/unattended-mode.md` sit outside by the volume decision in
`.flowtron/tasknote/README.md`, not by irrelevance.

**No ⚠️ `Superseded by` pointer written.** The `:686` count fix corrects live
contract text, not a factual claim in [[CORE-495]]'s archived note — that note's
Acceptance claimed only the `SPEC.md` count, which it did correct. Per `SPEC.md`
§"Tasknote frontmatter" the pointer covers a falsified claim *in the note*; this is
not one.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The `--unattended` 👁️ park rule is unchanged. What changed is that the contract now
refuses the *strongest* argument against it, in the words someone raising that
argument would use — so the question stops costing a tasknote each time it occurs
to someone.

The argument was good, which is why it earned a real answer rather than a pointer to
[[CORE-495]]. A committed visual baseline passing byte-identical genuinely is not an
inference; it is a recorded approval replayed, and an intentional visual change fails
it and parks anyway. It still does not carve out, for two reasons the contract now
states: **the premise is unverifiable, and this posture is precisely why** — nothing
distinguishes a golden a human approved from one a snapshot-regeneration run minted
with nobody looking, and `--unattended` is the declaration that nobody is present to
attest which it was — and **"does this baseline cover the surface I changed?" is the
gating-vs-corroborating split renamed**, arriving one step earlier where no gate
watches it. Note what the carve-out would actually buy: where output provably did not
change, the Phase 3 box is *already* `N/A` and nothing parks. It bites only where the
baseline's relation to the change is a judgment — which is where it stops being
evidence.

- **2 files, +24/−2.** `SPEC/gates.md` §"Park conversions" carries the refutation; §"Rationalizations" gains one row deliberately placed next to `:671`'s weaker "probably fine" row, so a reader arriving with the weak excuse meets the strong one's answer on the next line; §"Red Flags" gains the symptom (*the load-bearing step is your own judgment that the baseline covers what you changed*), per [[CORE-386]]'s standing pair rule. `unattended-mode.md` compresses it to one clause and cites the contract rather than re-deriving it.
- **One drift fixed in the same table.** `SPEC/gates.md:686` still read *"Five named gates halt the run"* — stale since [[CORE-495]] moved the conversion count five → six across five other surfaces but not this cell. All six count claims now agree.
- **Nothing was added to the machinery.** No park code, conversion row, cue glyph, banner, flag, heading, file, or validator. One `###` heading was considered and declined: [[CORE-495]]'s equivalent existed to be cited from five files; this argument's only citer is a section that already exists.
- **Verified by command, including the negatives.** 524 viz tests + 49 updater tests pass; `tsc` and `eslint` clean. Conversion-count parity 6/6 (was 5/6); `AWAITING APPROVAL` 12→12 on `gates.md`; glyph set-diff **added=∅, removed=∅**; 2/2 cited §headings resolve; `git diff --check` clean. The `--fast` token count held at 54→54 in `gates.md` and 8→8 in `SPEC.md` — the `docs/AGENT-NEUTRALITY.md` ledger check [[CORE-495]] caught only at verification time.
- **Documentation verdict: no entry in the 18-doc sweep set required an update**, for one uniform reason — no rule, count, code, glyph, or flag semantic changed, so every mirror that commits to those still states the truth. Proving that negative was the work: `docs/EXTERNAL-AGENTS.md`, `SECURITY.md`, and `docs/AGENT-NEUTRALITY.md` were each read rather than grepped, and the neutrality result drove the one Phase 4 edit (`--update-snapshots` → `--update-snapshots`-style, so the contract reads a tool name as illustration rather than as an artifact flowtron defines).
- **Maintainability effect.** This is the [[CORE-393]] failure mode caught one cycle earlier and at a fraction of the cost. A settled contract gets re-filed when the settlement is not findable in the raiser's vocabulary; `SPEC.md:811` cites that by ID as the reason the drift check exists. CORE-503 arrived from another project with a better version of a refused argument, and the answer it met — *"the tests probably cover it"* — was not addressed to it. Now it is, at the two surfaces an assistant actually reads mid-run.

**Archived:** 2026-08-30
