---
title: orchestration-contract
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473, CORE-473.2, CORE-473.3, CORE-473.4, CORE-473.5]
touches:
  - docs/EXTERNAL-AGENTS.md
blocked-by:
  - CORE-473.3
  - CORE-473.4
  - CORE-473.5
---

# CORE-473.6 | orchestration-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]] · [[CORE-473.2]] · [[CORE-473.3]] · [[CORE-473.4]] · [[CORE-473.5]]

## 🎯 Goal

Extend `docs/EXTERNAL-AGENTS.md` with the positive contract an orchestrator reports to — beside its existing not-a-runtime boundary — and correct the two claims (§"The Return", §"Relationship") that `--unattended` made false.

## ✅ Acceptance

- [x] `docs/EXTERNAL-AGENTS.md` carries a **positive orchestration contract** section — what an operator-less caller declares, reads back, classifies, and resumes — placed beside (not inside) the existing §"Not an Orchestration Runtime" boundary
- [x] The new section **points, never restates**: the posture lives in `SPEC/gates.md`, the `park-reason:` code table in `SPEC.md`, the interrupted-resume writes in `SPEC/blocked.md`, the per-agent wiring in `docs/PLATFORMS.md` — no second copy of any of them
- [x] §"The Return" no longer claims a single terminal state or that the per-task operator diff review is the in-flight control point; it names the three outcomes (completed / parked / terminated-write-nothing) and what actually holds the line under the posture
- [x] §"Relationship" no longer asserts "**No SPEC contract change.**"; the bullet states the accurate additive/opt-in claim
- [x] Prose is **orchestrator-neutral** — no vendor, product, or runner name introduced by this task's additions
- [x] Every added link target and cited section anchor resolves; no wikilink-integrity exposure introduced
- [x] Doc-drift sweep run; `README.md`'s doc-index one-liner and the tasknote-README ledger one-liner for `docs/EXTERNAL-AGENTS.md` updated if the new section makes them incomplete

## 🧩 Subtasks

- [x] Draft the new §"The Orchestration Contract" between §"The Return" and §"Not an Orchestration Runtime" — declare / read back / classify / resume / annotate-a-stranded-run, each a pointer to its canonical owner
- [x] Rewrite §"The Return" for the three terminal outcomes and the real in-flight controls (paper-complete guard + park conversions)
- [x] Correct §"Relationship" bullet 1 from "No SPEC contract change" to the additive/opt-in claim
- [x] Sweep the added prose for vendor names and for restated contract text that belongs to `SPEC/gates.md` / `SPEC.md` / `SPEC/blocked.md` / `docs/PLATFORMS.md`
- [x] Verify link targets + section anchors by command; check trailing whitespace
- [x] Phase 4: doc-drift sweep, update the two index one-liners if stale, close and archive

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic: unattended-orchestration
- [[CORE-473.2]] — blocked-by: defines the `--unattended` operator posture this doc describes
- [[CORE-473.3]] — blocked-by: `park-reason:` frontmatter key (the stop surface a caller reads)
- [[CORE-473.4]] — blocked-by: `--unattended` runner wiring + roster
- [[CORE-473.5]] — blocked-by: reachable epic-close + interrupted resume

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two stale claims are still stale at HEAD (`0ca7c76`), verbatim, and three sibling closures (`.2` / `.4` / `.5`) each recorded them as deliberately deferred to this child. The positive-contract half is the deliverable `.1` scoped as extension-first — extend `docs/EXTERNAL-AGENTS.md` rather than mint a parallel doc. Nothing upstream moved the target.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read set.** `docs/EXTERNAL-AGENTS.md` (67 lines, whole file) · `SPEC/gates.md` §"`--unattended` operator posture" (the full posture: park conversions, what a park is, pre-scaffold stops, what it never relaxes, `/ft-close-epic` terms, **Applies to**) · `SPEC.md` §"Tasknote frontmatter" → **Park reason** (the closed-set code table) · `SPEC/blocked.md` §"Resuming an interrupted run" · `SPEC/epic.md` (epic dispatch + Fan-out) · `docs/VISION.md` §"What we won't accept" · `docs/PLATFORMS.md` (three `--unattended` wiring rows) · `.flowtron/tasknote/README.md` §"AI-referenced docs" · `README.md` doc index · `docs/GLOSSARY.md`. No probe — the read set was named by `.1` and narrow.

**What the epic actually shipped (the contract this doc must describe).** Four surfaces, each with a distinct owner — the reason the new section must point rather than restate:

| Surface | Canonical owner |
|---|---|
| The posture itself: five park conversions, the pre-scaffold stop split, what it never relaxes, `/ft-close-epic`'s deferred parent-flip, **Applies to** (four runners; not `/ft-epic-discovery`) | `SPEC/gates.md` §"`--unattended` operator posture" ([[CORE-473.2]], [[CORE-473.5]]) |
| `park-reason:` — the `<code> — <prose>` shape, split-on-first-`—` rule, and the seven-code closed set | `SPEC.md` §"Tasknote frontmatter" → **Park reason** ([[CORE-473.3]]) |
| The interrupted-run path: two frontmatter writes the **caller** performs, then a normal invocation | `SPEC/blocked.md` §"Resuming an interrupted run" ([[CORE-473.5]]) |
| Per-agent flag availability + routing | `docs/PLATFORMS.md` §"Non-Claude capability triggers" + `claude/CAPABILITIES.md` ([[CORE-473.4]]) |

**Best Practices Review.** No code; module boundaries are *documentation* boundaries and they are the live risk. `docs/EXTERNAL-AGENTS.md` is the operator-facing **convention** layer; `SPEC/*` is the **contract** layer; `docs/PLATFORMS.md` is the **wiring** layer. Dependency direction is convention → contract, never the reverse, and never a copy. The failure mode this task must avoid is a fifth restatement of the five park conversions — `docs/PLATFORMS.md` already carries that list three times (once per agent table) because wiring tables are per-agent by construction; a fourth prose copy in a doc that is *not* per-agent would be pure duplication that drifts on the next posture edit. **In-scope structural work:** one new H2 beside the existing negative boundary, plus two surgical section corrections. **Deferred:** `docs/GLOSSARY.md` has no `--unattended` / `park-reason` entry — but it has no `--fast` entry either, so no asymmetry is created by leaving it; it is also not in the AI-referenced ledger. Not this task's scope; flagged for [[CORE-473.N]].

**Archive skim.** `grep -l EXTERNAL-AGENTS .flowtron/tasknote/archive/core/*.md` → 25 hits; the load-bearing ones:

- **[[CORE-352.4]]** authored the doc. Two decisions still binding: the tools named are **examples, not dependencies** (tool-agnostic by construction), and the doc's boundary section deliberately **mirrors** VISION §"What we won't accept" rather than restating it. The new positive section is the other half of that same mirror.
- **[[CORE-445.3]]** added the Fan-out bullet to the boundary list — *"markdown facts, not a scheduler; `/ft-worktree-start` may warn, must not refuse."* An orchestration contract that promised dispatch over `blocked-by:` would contradict this bullet in the same file. The positive contract must be explicit that declarations are read-only inputs to the caller's own scheduling.
- **[[CORE-408.2]]** added the probe carve-out to §"The Core Rule" — the rule bounds *ownership*, not every context an owner may consult. Unchanged by this task, but it is the precedent for the shape used here: a one-sentence carve-out inside an existing rule rather than a competing rule.
- **[[CORE-408.3]]** established the reciprocal-pointer convention when two surfaces share a word (§"The Handoff Contract" ↔ SPEC's `## 🔄 Handoff`). Relevant because "the contract an orchestrator reports to" is a phrase `SPEC/gates.md` already uses verbatim — the new section adopts it and links back rather than coining a rival term.
- **[[CORE-473.2]] / [[CORE-473.4]] / [[CORE-473.5]]** each recorded `docs/EXTERNAL-AGENTS.md` as *stale, owned by `.6`* in their doc-drift sweeps, explicitly declining the fix so as not to hand this child a conflicting edit. Three consecutive deferrals — this is the accumulated debt, and it lands here or nowhere.

**Drift check.** Both target claims verified verbatim at HEAD (`0ca7c76`), not recalled:

- `docs/EXTERNAL-AGENTS.md:43` §"The Return" — *"the operator reviewing the diff is still the control point"*, preceded by *"its output is exactly what any flowtron session produces"* (single terminal state). False under the posture on both counts: a run may end **parked** (`status: blocked`, PLAN line unchecked, no commit) or **terminated write-nothing** (foreign-dirt / status-gate / archive-collision), and no operator reviews anything per-task.
- `docs/EXTERNAL-AGENTS.md:60` §"Relationship" — *"**No SPEC contract change.**"* Falsified by [[CORE-473.2]]'s commit, which added an operator posture to `SPEC/gates.md` and a `park-reason:` key to `SPEC.md`.

Cross-artifact half: the plan formed here contradicts no SPEC contract. It ships **no runtime** — no scheduler, dispatcher, daemon, lock, or job graph — which is the constraint every child of this epic inherits from `.1` (`docs/VISION.md` §"What we won't accept" blesses *"flowtron does ship the markdown contract a loop reports to … Contract in flowtron, runtime in the runner"*). The `PLAN.md` line asks for exactly the two halves scoped here, and its "orchestrator-neutral prose — no vendor named" constraint is carried into Acceptance. Anchors verified to exist: `SPEC.md:912` §"Post-closure protocol", `SPEC.md:960` §"Paper-complete guard", `docs/PHILOSOPHY.md:49` §"What flowtron deliberately is not".

**Superseded-claim pointer — not applicable.** The two false claims live in `docs/EXTERNAL-AGENTS.md`, a live doc this task edits directly. No *archived tasknote* asserted them, and the three sibling notes that named them were accurate about their own moment (they said "stale, owned by `.6`"). Nothing to append.

**No clarifications needed.** Explicit assumptions:

1. **Extension, not a new doc.** `.1` resolved this ("extension-first"); a parallel `docs/ORCHESTRATION.md` is not filed and is not created here.
2. **Point, never restate.** The new section names what a caller must do and links to the owner of each rule. No copy of the five-conversion table, the seven-code park table, or the per-agent availability matrix.
3. **Placement is between §"The Return" and §"Not an Orchestration Runtime"** — positive contract first, then the boundary that bounds it, so a reader meets what flowtron *does* provide before what it refuses.
4. **Vendor-neutral additions.** The pre-existing example names in §-opening prose and the `README.md` index stay as [[CORE-352.4]] wrote them; this task introduces none.
5. **Two index one-liners are in scope via the doc-drift sweep**, not as scope creep — `README.md` and `.flowtron/tasknote/README.md` both enumerate this doc's contents.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown-only change with no parseable surface; the repo suite ran as the standing gate (470/470)

**Implementation Notes:**

**Pattern survey.** Three existing shapes were extended rather than invented:

1. **Positive-beside-negative.** `docs/VISION.md` §"What we won't accept" already pairs each rejection with its *bounded exception* in the same bullet ("flowtron **does** ship the markdown contract a loop reports to … Contract in flowtron, runtime in the runner"). This doc had only the rejection half. §"The Orchestration Contract" is that same pairing given a section, placed immediately **before** §"Not an Orchestration Runtime" so a reader meets what flowtron provides, then what bounds it. The closing line of the new section hands off explicitly ("What it deliberately does **not** provide is the subject of the next section").
2. **Point, don't restate** — the file's own convention from [[CORE-352.4]]: sibling docs get markdown links, `SPEC*` references are plain-text `§` citations. Followed exactly; six SPEC citations added, zero relative SPEC links, so no `../` path can rot.
3. **Numbered contract rules** — mirrors §"The Handoff Contract"'s existing 1-2-3 shape one section up, so the doc now has two numbered contracts of the same visual weight.

**DRY was the live risk, and it drove one draft revision.** `docs/PLATFORMS.md` already carries the five park conversions three times (once per agent table — unavoidable, wiring tables are per-agent by construction). A fourth prose copy in a doc that is *not* per-agent would be duplication with no reader benefit and would drift on the next posture edit. The first draft of rule 2 enumerated all five conversions; it was rewritten to characterize the *class* ("a gate that survives `--fast` does so because it needs a decision, not merely patience") with three illustrative examples and a pointer. Same treatment for rule 3: the `park-reason:` **shape** and the closed-set *property* a caller branches on are stated, the seven codes are not copied.

**Minimal refactor gate.** Three edits beyond the two filed corrections, each required for the file to stay internally true once the new section existed — not general cleanup:

- **Intro (`:5`)** — "Flowtron ships no orchestrator … The tools named here are examples" gained one sentence pointing at the new section, so the doc's own summary is not a half-truth.
- **§"Not an Orchestration Runtime" opener (`:77`)** — "describes a **convention for a human operator**" became "a **convention and a markdown contract**", since the doc now also serves a caller with no human in it.
- **Same section's VISION mirror (`:84`)** — the parenthetical listing what flowtron *does* ship ("the tasknote, the 4-phase workflow, the operator cues, the Fan-out declaration") gained "and the operator-less posture above". Leaving it out would have made the boundary section enumerate a contract list that excludes the contract two sections up.

Deferred, not done: `docs/GLOSSARY.md` gains no `--unattended` / `park-reason` entry. It carries no `--fast` entry either, so nothing asymmetric is created, and it is not in the AI-referenced ledger — flagged for [[CORE-473.N]] rather than expanded here.

**The two filed corrections.**

- **§"The Return"** asserted a single terminal state and named the per-task diff review as the control point. Rewritten to keep the attended case as the opening paragraph (it is still true) and add two things: the three endings as filesystem facts (Closed / Parked / Refused), and *what actually holds the line* when no operator is at the gate — the park conversions plus the untouched paper-complete guard. The framing chosen is "the control point **moves**; it does not disappear", because the operator does still review, on accumulated commits rather than per task.
- **§"Relationship" bullet 1** — "**No SPEC contract change.**" → "**The contract does not vary by agent; it varies by posture.**" The bullet's original point (identical workflow across agents) survives verbatim, including its vendor list, which is [[CORE-352.4]]'s deliberate examples-not-dependencies framing and not this task's to rewrite. What changed is the false half: the posture is an opt-in, additive contract, and a run that does not declare it sees the pre-existing contract unchanged.

**Orchestrator-neutral.** The only vendor names in the diff are the three carried through untouched in that Relationship sentence. Verified by command, not by eye — `git diff -U0 | grep '^+' | grep -inE "kiro|codex|cursor|grok|claude|anthropic|openai|gpt|gemini"` returns exactly one line, that sentence. The new section names skills (`/ft-task`, `/ft-close-epic`, `/ft-epic-discovery`) — flowtron's own agent-neutral vocabulary, present in every platform wiring — and describes callers only by shape ("a headless session, a scheduled run, a process handing out children of an epic").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface changed

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

`npm --prefix viz test` — **25 files / 470 tests passed**, 6.84s. Markdown-only change with no parseable surface, so the suite is the standing regression gate rather than a targeted check; no test was added, because nothing here is machine-consumed.

**Verified by command, not by eye:**

| Check | Command | Result |
|---|---|---|
| Trailing whitespace | `git diff --check` | clean |
| Heading structure (no duplicate H2) | `grep -n '^## ' docs/EXTERNAL-AGENTS.md` | 7 headings, `## The Orchestration Contract` at `:55` between `## The Return` and `## Not an Orchestration Runtime` |
| Both false claims gone | `grep -c "No SPEC contract change"` / `grep -c "still the control point"` | **0** / **0** |
| SPEC anchors cited all exist | 6× `grep -c` against `SPEC/gates.md`, `SPEC.md`, `SPEC/blocked.md` | 6/6 return `1` |
| Sibling doc links resolve | file test on `docs/PLATFORMS.md`, `docs/WORKTREES.md`, `docs/PHILOSOPHY.md` | 3/3 OK |
| In-page anchor `#the-orchestration-contract` | `grep -c` | 2 (intro `:5` + §"The Return" `:45`), both matching the H2 slug |
| Wikilink exposure in added lines | `grep -cE '\[\[[A-Z]+-[0-9]+\]\]'` on `+` lines | **0** |
| Vendor names in added lines | `grep -inE "kiro\|codex\|cursor\|grok\|claude\|anthropic\|openai\|gpt\|gemini"` on `+` lines | **1** — the untouched Relationship example list ([[CORE-352.4]]'s framing), zero introduced |

**Quality assertions.** No duplication: the five park conversions and the seven `park-reason:` codes are *pointed at*, never copied — the one draft that enumerated them was revised (Implementation Notes). No dead prose: the three edits outside the two filed corrections each fix a sentence the new section would otherwise have falsified. No public-surface growth: no new file, no new frontmatter key, no new cue glyph, no template change, no skill change — `git diff --stat` is 3 markdown files. No stale code-facing documentation: the two index one-liners that enumerate this doc's contents were the sweep's only finding and were updated in the same commit.

**One structural defect caught in-flight.** The first `Edit` re-emitted `## Not an Orchestration Runtime` at the tail of its replacement while the original heading still stood below, producing a duplicate H2 at `:75`/`:77` and an empty section. Caught by the `grep -n '^## '` structure check rather than by reading the diff, and removed before any further edit. The check is recorded here because the failure mode — an append-shaped edit silently duplicating the boundary it inserts before — is invisible in a rendered read.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — per-entry verdicts.**

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — the doc-index one-liner for `docs/EXTERNAL-AGENTS.md` enumerated the doc's sections and would have been incomplete the moment the new H2 landed; now names the orchestration contract and reads "convention and contract only, no orchestration runtime" |
| `AGENTS.md` | no change — repo layout, validation commands, and platform wiring notes are untouched |
| `SPEC.md` | no change — the posture (`SPEC/gates.md`) and `park-reason:` (`SPEC.md` §"Tasknote frontmatter") already landed in [[CORE-473.2]] / [[CORE-473.3]]; this task cites them and adds nothing |
| `docs/MIGRATION.md` | no change — no adoption or bump step is affected by a docs-layer addition |
| `claude/AGENTS-snippet.md` | no change — wiring-roster SSOT ([[CORE-465]]) untouched; no skill, command, or symlink added |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — no commit, versioning, or formatting convention changed |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — checked deliberately: [[CORE-473.2]] already extended its don't-suppress-the-remaining-pause advisory from `--fast` to the posture, and this task adds no new suppression surface |
| `docs/AGENT-NEUTRALITY.md` | no change — checked deliberately: no Claude-specific surface is introduced. The new section names flowtron's own skill slugs, which the ledger does not treat as Claude-specific, and the flag already has its registered entries at `:41` / `:116` |
| `docs/PLATFORMS.md` | no change — its three `--unattended` wiring rows ([[CORE-473.4]]) are the per-agent availability layer, which the new section *links to* rather than mirrors |
| `claude/CAPABILITIES.md` | no change — flag row landed in [[CORE-473.4]]; no new capability trigger here |
| `docs/AGENT-COMPAT.md` | no change — deliberately not a flag mirror (Pair I rationale, carried from [[CORE-473.4]]) |
| `docs/EXTERNAL-AGENTS.md` | **updated — this task's deliverable.** New §"The Orchestration Contract"; §"The Return" rewritten for three endings and the real in-flight controls; §"Relationship" bullet 1 corrected; three consistency edits (intro pointer, boundary-section opener, VISION-mirror parenthetical). The two claims [[CORE-473.2]] / [[CORE-473.4]] / [[CORE-473.5]] each deferred are now false-free |
| `docs/WORKTREES.md` | no change — the isolation convention is unchanged, and the new section adds no parallelism claim; rule 2 of the boundary list (`/ft-worktree-start` warns, never refuses) still holds verbatim |

Off-ledger note: `docs/GLOSSARY.md` has no `--unattended` / `park-reason` entry. Not swept (not in the ledger) and not asymmetric (no `--fast` entry either) — flagged for [[CORE-473.N]], not fixed here.

**Final Summary:**

Closed the last accounting gap in `CORE-EPIC-473`: `docs/EXTERNAL-AGENTS.md` now states the **positive contract an operator-less caller reports to**, beside the not-a-runtime boundary it already had, and the two claims the posture falsified are gone. Three sibling closures ([[CORE-473.2]], [[CORE-473.4]], [[CORE-473.5]]) each recorded those claims as stale-and-deferred rather than fix them — the deferral was correct (a conflicting edit would have landed on this child) and this is where the debt was paid.

**The design problem was duplication, not wording.** By the time this child ran, the posture was fully specified across four owners: `SPEC/gates.md` (conversions, pre-scaffold stops, `/ft-close-epic` terms), `SPEC.md` (the `park-reason:` closed set), `SPEC/blocked.md` (resume + interrupted), and `docs/PLATFORMS.md` (per-agent wiring, which necessarily repeats the conversion list three times). A fifth prose copy in the one doc that is *not* per-agent would have been the first thing to drift on the next posture edit. So the section is six numbered rules — declare · expect a park · classify by code · resume · annotate a stranded run · expect one deferred epic motion — each naming its canonical owner and stating only what a caller must *do*. The first draft of rule 2 enumerated all five conversions and was revised to characterize the class instead; rule 3 states the `<code> — <prose>` split and the closed-set property without copying the seven codes.

**The §"The Return" correction was the substantive one.** The old text asserted one terminal state and named the per-task diff review as the control point. Both false: a run may end **parked** (no commit, PLAN line still `[ ]`) or **refused** (nothing written), and no operator reviews anything per-task. The rewrite keeps the attended paragraph intact, adds the three endings as filesystem facts, and answers the question the correction raises — with no operator at the gate, the line is held by the park conversions plus the untouched paper-complete guard. Framed as "the control point **moves**; it does not disappear", because review is deferred to accumulated commits, not removed.

**Scope held.** 3 files, **+38/−7**, contract-and-docs layer only — zero skill, command-stub, template, `SPEC/`, or `claude/CAPABILITIES.md` paths. No new file, frontmatter key, cue glyph, checklist box, or gate; nothing here is a runtime, which is the constraint every child of this epic inherits from `.1`. Three edits beyond the two filed corrections were required for internal truth, not cleanup: the intro's "flowtron ships no orchestrator" sentence now points at what it *does* ship; the boundary section's opener widened from "convention for a human operator" to "convention and a markdown contract"; and its VISION-mirror parenthetical gained the posture, since it enumerates flowtron's contract surfaces and had been excluding one two sections above it.

**Verification.** `npm --prefix viz test` 25 files / 470 tests passed. `git diff --check` clean. Both false claims `grep -c` → **0**/**0**. 6/6 cited SPEC anchors exist; 3/3 sibling doc links resolve; both in-page anchors match the new H2 slug; zero wikilink exposure. Orchestrator-neutrality verified by command — exactly one vendor-name line in the diff, the untouched [[CORE-352.4]] example list. One defect caught in-flight by the heading-structure check: an append-shaped edit duplicated `## Not an Orchestration Runtime`, invisible in a rendered read, removed before the next edit. Doc-drift sweep: 2 updated, 15 no change (`SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md` checked deliberately, all correctly unchanged).

**Maintainability effect.** An orchestrator author no longer has to reverse-engineer the contract from four SPEC modules and three per-agent wiring tables: one section says what to pass, what three shapes the repo can be in afterward, how to branch on a stop, and who performs the two writes flowtron will never perform. And the doc most likely to be read *before* the SPEC no longer tells that reader the posture does not exist.

**Archived:** 2026-08-25
