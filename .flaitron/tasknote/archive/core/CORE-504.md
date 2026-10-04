---
title: scaffold-purpose-blurb
status: completed
tags: []
created: 2026-08-30
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

# CORE-504 | scaffold-purpose-blurb

[← PLAN.md](../PLAN.md) · 🟢 In progress

> **⚠️ Superseded by [[CORE-526]]** — the blurb no longer fires at scaffold time; it moved to step 1, immediately after the `PLAN.md` line is captured, so the SPEC section named here is `🎯 Purpose blurb` and no longer "sits at the point in the document where it fires". The `/ft-task` and `/ft-goal-task` Step 3d this note created were retired in the same move.

## 🎯 Goal

Emit a short plain-English purpose blurb at tasknote scaffold — before Phase 1 Discovery begins — so the operator gets an immediate read on what the task is.

## ✅ Acceptance

- [x] `SPEC.md` carries a short contract subsection under §"The 4-phase workflow", immediately before §"📝 Phase 1: Discovery", defining the scaffold-time purpose blurb: what it is, the `🎯` shape, when it fires, and the bounds (not a cue, not a gate, no reply expected, two-banner cap untouched)
- [x] `SPEC/gates.md` §"Glyph layers and reuse" gains one `🎯` row recording the cross-layer reuse (blurb marker × `## 🎯 Goal` heading) so the glyph is not undocumented on emission
- [x] All three ID-invoked runners emit the blurb at fresh scaffold, before Phase 1 — `claude/skills/ft-task/SKILL.md` (Step 3b), `claude/skills/ft-micro-task/SKILL.md` (Step 3), `claude/skills/ft-goal-task/SKILL.md` (Step 3b) — each in its own established prose shape, routing to the SPEC contract rather than restating it
- [x] The blurb also fires on the promote (3a) and resume (3c) paths in `/ft-task` / `/ft-goal-task`, or the contract explicitly scopes it to fresh scaffold only — decided, not left silent
- [x] `SPEC/procedures/ft-task.md` §3 carries the same emit obligation, so a contract-only agent (Codex / Grok / Cursor) reaches it too; `last-verified:` stamp left un-bumped per the flag-don't-bump rule
- [x] No new operator cue: `SPEC.md` §"Operator-cue glossary" and `SPEC/gates.md` §"Operator-cue vocabulary" tables are unchanged, and the standing two-banner cap is untouched
- [x] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs" — per-entry verdict

## 🧩 Subtasks

- [x] Write the `SPEC.md` contract subsection (the authority the three runners route to)
- [x] Add the `🎯` row to `SPEC/gates.md` §"Glyph layers and reuse"
- [x] Wire `claude/skills/ft-task/SKILL.md` Step 3b (+ decide 3a / 3c)
- [x] Wire `claude/skills/ft-goal-task/SKILL.md` Step 3b
- [x] Wire `claude/skills/ft-micro-task/SKILL.md` Step 3
- [x] Mirror the obligation into `SPEC/procedures/ft-task.md` §3
- [x] Verify: no cue-table edits, `/ft-release` §7.1 Pair I check, repo-wide `🎯` grep, markdown mental-pass
- [x] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-473.4]] — `unattended-wiring`; the precedent for wiring one behavior across exactly these three ID-invoked runners plus the procedure SOP (`related-decision:`)
- [[CORE-254.2]] — established the operator-cue vocabulary and the glyph-layer model this task deliberately stays outside of (`depends-on:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and verified against current code — `/ft-task` Step 3b scaffolds the file and Step 4 begins Discovery with no conversational statement of what the task is. The `🎯 Goal` written into the tasknote is a *file* write, not an operator-facing emit, so an operator invoking `/ft-task <ID>` cold after a `/clear` sees tool calls and then Discovery questions, never a plain-English read of the work.

- [x] Read relevant source files — no probe needed; the read set was narrow and known (5 skill bodies, 2 SPEC surfaces, 1 procedure SOP)

- [x] **Best Practices Review** — `N/A` for code/module boundaries (this task edits markdown contract + skill prose only). The applicable analogue: the *pattern* to extend is the existing inline-marker family (`⚡ --fast active`, `🔬 --debug active`, `✅ Phase 1 Discovery complete`) — plain conversational lines emitted from a skill step, routing to a SPEC contract rather than restating it. New shape not justified; extending that family is.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` (678 notes). Path-grepped for the surfaces in scope and for prior blurb/marker art. Findings logged below.

- [x] **Drift check** — no drift. Verified against current code and contract, not recall.

- [x] Asked clarifying questions — two, both answered (below)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Gap confirmed

`claude/skills/ft-task/SKILL.md:129` ends Step 3b with the scaffold-value list
and hands straight to Step 4 Phase 1. Nothing between them addresses the
operator. Same shape in `/ft-goal-task` Step 3b and `/ft-micro-task` Step 3.
The PLAN.md line's premise is accurate as written.

### Archive skim

- **[[CORE-473.4]]** (`unattended-wiring`) — the closest structural precedent:
  one behavior wired across `ft-task` / `ft-micro-task` / `ft-goal-task`, their
  command stubs, `claude/CAPABILITIES.md`, and `SPEC/procedures/ft-task.md`.
  Its Acceptance is the template for this task's surface list. Load-bearing
  detail: it *did* have to touch the procedure SOP, which is why that surface
  is in Acceptance here.
- **[[CORE-390]]** (`debug-mode-fold`) — precedent for the `🔬 --debug active`
  inline marker, i.e. a non-cue glyph emitted from a skill step. Confirms the
  residual-glyph route is established practice rather than a novel move.
- **[[CORE-254.2]]** — origin of the operator-cue vocabulary; **[[CORE-308]]**
  (👇 `HERE`) and **[[CORE-353.3]]** (🧩 `MEDIUM`) are the two precedents for
  *widening the cue table*, each explicitly deliberated. This task does not
  widen it — see the glyph decision below.
- No prior tasknote proposed a scaffold-time purpose blurb. No superseded
  claims, no ⚠️ pointers to follow.

### Drift check

- **PLAN.md line** — matches. The line's scope question ("`/ft-task` only, or
  the whole initiating cohort ... plus a SPEC line") is the question asked and
  answered below; answering it is the filing working as intended, not drift.
- **`SPEC/gates.md` §"Non-cue glyphs"** — read, not recalled. States that ⚡,
  🔬, 🧭, 🌳, 🔁, 🔄, 📌, 📋, ⚠️ sit outside all three glyph layers, are
  "legitimate and bounded", and that "adding to this residual is a local
  decision for the owning skill; adding to the **cue table** is a vocabulary
  change". This is the clause that makes a `🎯` blurb marker cheap and a cue
  row expensive.
- **`SPEC/gates.md` §"Glyph layers and reuse"** — read. `🎯` is already in
  service on **layer 2** (tasknote structure: the `## 🎯 Goal` heading). The
  reuse table's own rule — "Cross-layer reuse is permitted when the two
  meanings are semantically coherent, and is not a collision" — covers this
  precisely: the blurb *is* the Goal, stated conversationally. Coherent, not a
  collision.
- **Two-banner cap (CORE-065)** — unaffected. The blurb expects no reply and
  gates nothing, so it is neither a banner nor an ask. Explicitly asserted in
  Acceptance so a later reader cannot re-read this task as a third gate.

### Clarifications (both answered by the operator)

1. **Scope → the three ID-invoked runners + a SPEC line.** `/ft-task`,
   `/ft-micro-task`, `/ft-goal-task`. `/ft-epic-discovery` and
   `/ft-close-epic` are deliberately out: both are invoked *in-session* with
   the scoping conversation still live, so a blurb there restates what the
   operator just said. The principled cut is "was this invoked cold with a
   bare task ID after a `/clear`" — which is exactly these three, and exactly
   the set [[CORE-473.4]] wired.
2. **Shape → `🎯`-prefixed inline marker.** Not plain prose (no fast-scan
   signal; blends into scaffolding chatter — the same failure gates.md
   §"Emphasized inline ask shape" diagnosed for 👁️). Not blurb-plus-first-move
   (Discovery has not run at scaffold time, so the second line would be a
   guess off the PLAN description, and a wrong guess is worse than none).

### Glyph decision (recorded so it does not read as an evasion)

`🎯` enters as **cross-layer reuse of an in-service layer-2 glyph**, documented
with one row in `SPEC/gates.md` §"Glyph layers and reuse" — *not* as a new row
in the operator-cue table. Rationale: the cue table is for cues, and gates.md
reserves additions to it for deliberated vocabulary changes ([[CORE-254.2]] /
[[CORE-308]] / [[CORE-353.3]]). The blurb bears no obligation, accepts no
reply, and gates nothing, so cue-table membership would misfile it alongside
🛠️ / 📦 / 👁️ / 🟢. The nearest cue-table members are the 🏁 / ✅ inline state
markers, and the honest reading is that the blurb is *adjacent* to those rather
than one of them: 🏁 and ✅ mark transitions the workflow has completed, while
the blurb introduces work not yet begun. Documenting the reuse (rather than
staying silent) is what keeps a future `/ft-audit docs` pass from flagging an
undocumented glyph on emission.

### Two surfaces beyond the option preview

The chosen scope option's preview sketched three skills + `SPEC.md` (+ a
question-marked `CAPABILITIES.md`). Two additions, both implied by the answers
rather than expanding them:

- **`SPEC/gates.md`** — named in the chosen shape-option's own description
  ("slots into SPEC/gates.md's documented non-cue glyphs residual").
- **`SPEC/procedures/ft-task.md`** — the agent-neutral projection of this exact
  scaffold step; [[CORE-473.4]], cited in the chosen option's preview, had to
  update it for the same reason. Omitting it would leave Codex / Grok / Cursor
  running a scaffold step that silently diverges from the Claude one.

**`claude/CAPABILITIES.md` — no row.** That doc indexes *operator-facing
capability triggers* (flags, `/model`, `/clear`). The blurb is unconditional
behavior with no trigger to reach for, so a row would misrepresent it. Recorded
here so the Phase 4 sweep's "no change" verdict is a decision, not an oversight.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern; no new shape invented

- [x] **Minimal refactor gate** — no refactor performed; all six edits are additive

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`; markdown contract + skill prose only, no executable surface. The registered `/ft-release` structural gates stand in, and were run (Phase 3).

**Implementation Notes:**

### Pattern survey

The pattern extended is the **inline-marker family** — `⚡ --fast active`,
`🔬 --debug active`, `✅ Phase 1 Discovery complete` — plain conversational
lines emitted from a numbered skill step that route to a SPEC contract instead
of restating it. The blurb is the same shape at a new emission point. No new
shape needed justifying.

The **DRY split** follows the same family: the contract lives once in
`SPEC.md`, and each runner carries a short step that cites it and adds only its
own flavor. `/ft-task` Step 3d is the fullest statement; `/ft-goal-task`
explicitly says "identical to `/ft-task` Step 3d" and adds only the loop line;
`/ft-micro-task` adds only the single-path note. This mirrors how
`step-1.5-model-edge.md` and `unattended-mode.md` are owned by `/ft-task` and
referenced by the siblings ([[CORE-473.4]]). No lazy fragment was created — at
~8 lines per runner the shared text is well under the weight that earns one,
and a fragment would cost a file read on the happy path of every single run.

### Six edits

1. **`SPEC.md`** — new `### 🎯 Scaffold-time purpose blurb` under §"The 4-phase
   workflow", placed immediately before §"📝 Phase 1: Discovery" so it sits at
   the point in the document where it fires. Carries: the motivation (a *file*
   write states nothing to an operator who has not opened the file), the
   two-line shape with a worked example, the which-invocations rule, the
   explicit out-of-scope call for the two epic skills with its test ("could the
   invocation arrive cold with nothing but an ID"), and the bounds paragraph.
2. **`SPEC/gates.md`** — one `🎯` row in §"Glyph layers and reuse" plus a
   paragraph explaining the empty layer-1 cell and why the cue table is
   deliberately not touched.
3. **`claude/skills/ft-task/SKILL.md`** — new **Step 3d**, with Steps 3a / 3b /
   3c each amended to route through it. A single shared step rather than three
   copies.
4. **`claude/skills/ft-goal-task/SKILL.md`** — Step 3d, citing `/ft-task`'s and
   adding the loop flavor (name the loop and the `loop-max` budget, since the
   operator is about to watch a cycle rather than a single pass).
5. **`claude/skills/ft-micro-task/SKILL.md`** — appended to Step 2 rather than
   given its own step: this skill has one scaffold path and no promote/resume
   branch, so a shared step would have nothing to share.
6. **`SPEC/procedures/ft-task.md`** — the same obligation in §3, so contract-only
   agents (Codex / Grok / Cursor) reach it. `last-verified:` left un-bumped per
   the flag-don't-bump rule.

### Decision recorded: the blurb fires on all three opening paths

Acceptance required this be decided rather than left silent. It fires on fresh
scaffold, starter promotion, **and** blocked resume. The cold-start condition is
identical on all three — the operator typed a bare ID — and the resume path
needs it most: Phase 1 is already complete on a parked note, so the operator
lands directly in Phase 2 with no Discovery to orient them. On that path the
blurb additionally names the `park-reason:` being cleared.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` for unit tests (no executable surface). The registered `/ft-release` structural gates are the applicable suite and were run; results below.

- [x] Ran lint/type-check on changed code — `N/A`; markdown. Manual pass on table alignment, fence closure, heading level, and link-target resolution instead.

- [x] **Quality assertions**

- [ ] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

### Checks run

| Check | Command | Result |
|---|---|---|
| Wrapper-name invariant (`SPEC.md`) | `for f in claude/commands/ft-*.md; ...` | clean — printed nothing |
| `/ft-release` §7.1 **Pair I** (CAPABILITIES flag rows ↔ non-Claude trigger tables) | the derived `flags=…` + `awk` pipeline | clean — no `MISSING TRIGGER FLAG` |
| `/ft-release` §7.1 **Pair J** (command-stub `argument-hint:` ↔ documented flags) | the per-stub `own`/`hint` loop | clean — no `MISSING HINT` |
| Cue-table integrity | `git diff SPEC.md SPEC/gates.md \| grep -E "^[+-]\| (🗄️\|▶️\|…) "` | clean — no cue row added or removed |
| Repo-wide `🎯` audit | `grep -rn "🎯" --include="*.md" .` | every pre-existing hit is the `## 🎯 Goal` heading (layer 2); new hits are only the six intended surfaces |
| Citation resolution | grep for the two new `§"…"` targets | `### 🎯 Scaffold-time purpose blurb` and `### Glyph layers and reuse` both resolve from all five citing files |

Pairs I and J were expected clean (this task adds no operator flag) and were run
to confirm the edits didn't disturb them, not because a change was expected.

### Quality assertions

- **No avoidable duplication** — the contract is stated once in `SPEC.md`; the
  three runners and the SOP cite it. The one deliberate restatement is the
  two-line shape block, repeated per runner so an agent following a skill step
  doesn't need a second file read mid-scaffold; that trade is the same one
  every existing runner step makes.
- **No dead code / no unexplained complexity** — six additive markdown blocks,
  no control flow, no deletions.
- **Public-surface growth: bounded and deliberate.** One new SPEC subsection,
  one glyph-reuse table row, one new numbered skill step (`/ft-task` 3d). The
  three surfaces flowtron guards most closely are all **unchanged**: no
  operator-cue table row, no new banner (two-banner cap intact), no new
  checklist box or phase. Asserted explicitly in the SPEC text so a later reader
  can't re-read the blurb as a third gate.
- **No stale documentation introduced** — `git diff --stat` is exactly the six
  intended files, 124 insertions / 2 deletions, no collateral edits.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict below

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

### Doc-drift sweep (18 entries)

| Doc | Verdict |
|---|---|
| `README.md` | no change — describes the 4-phase workflow and the probe/delegate split, enumerates no cue or marker set |
| `AGENTS.md` | no change — repo layout + validation commands; names no scaffold-step behavior |
| `SPEC.md` | **updated** — new §"🎯 Scaffold-time purpose blurb" (the contract this task adds) |
| `docs/MIGRATION.md` | no change — adoption / bump procedure; unaffected by an unconditional runner behavior |
| `claude/AGENTS-snippet.md` | no change — see note below |
| `codex/AGENTS-snippet.md` | no change — wiring commands only |
| `cursor/AGENTS-snippet.md` | no change — thin pointer wiring |
| `grok/AGENTS-snippet.md` | no change — thin pointer wiring |
| `docs/CONVENTIONS.md` | no change — commits / versioning / formatting |
| `CONTRIBUTING.md` | no change — maintenance model |
| `SECURITY.md` | no change — see control-marker note below |
| `docs/AGENT-NEUTRALITY.md` | no change — ledgers *Claude-specific* surfaces; the blurb is contract (`SPEC.md`) mirrored into the agent-neutral SOP, so it is neutral by construction and earns no ledger row |
| `docs/PLATFORMS.md` | no change — its per-agent tables are **capability-trigger** rosters (things an operator invokes); the blurb has no trigger. `/ft-release` Pair I confirms mechanically |
| `claude/CAPABILITIES.md` | no change — same reason; decided in Discovery, not an oversight |
| `docs/AGENT-COMPAT.md` | no change — per-agent currency stamps; no re-dogfood required, and stamps are flag-don't-bump |
| `docs/EXTERNAL-AGENTS.md` | no change — its cue references are to 🛠️ / 📦 and the six unattended park conversions, all unchanged |
| `docs/WORKTREES.md` | no change — isolation convention |
| `docs/VISION.md` | no change — the blurb adds no runtime, scheduler, validator, or query layer; nothing in §"What we won't accept" is engaged |

**`claude/AGENTS-snippet.md` note.** Line 18 ("scaffolds the tasknote … and
drives Phase 1 Discovery before any code is written") describes the exact step
this task changed and remains **true as written** — the blurb is emitted
between those two clauses, not in place of either. The snippet documents what
adopters *invoke* (skills, flags, args) and already omits every other emitted
marker (`✅`, `🏁`, the next-move glyphs), so adding the blurb there would break
its scoping and cost every adopter a re-paste on bump for behavior they cannot
trigger. No change, deliberately.

**`SECURITY.md` / control-marker note.** §"Forged in-content control-markers"
and `SPEC/gates.md` §"Control-marker integrity" enumerate the markers that
carry *authority* — the `✅` gate/closure markers, the 🛠️/📦 banners, the
destructive-action escalation, and the skip-rule signals — because a forged
copy of one in read content could socially-engineer the assistant past a human
gate. `🎯` grants no clearance, approves nothing, and no branch reads it, so a
forged blurb in a tasknote body or `PLAN.md` line achieves nothing. Its absence
from those lists is correct, not an omission. Recorded so a later security pass
does not have to re-derive it.

**Final Summary:**

Closes the cold-start read gap in the three ID-invoked task runners. Until now,
`/ft-task CORE-504` — typically the operator's first message after a `/clear` —
scaffolded a tasknote and dropped straight into Phase 1 Discovery, so
everything between invocation and the first Discovery question was tool calls.
The `🎯 Goal` written at scaffold is a *file* write, and a file the operator has
not opened states nothing to them. All three runners now emit a two-line
plain-English purpose blurb before the first phase step.

**Changed:** 6 files, +124 / −2.

- `SPEC.md` (+54) — new `### 🎯 Scaffold-time purpose blurb` under §"The
  4-phase workflow", placed immediately before §"📝 Phase 1: Discovery": the
  motivation, the two-line shape with a worked example, the which-invocations
  rule, the deliberate exclusion of the two epic skills, and the bounds.
- `SPEC/gates.md` (+13) — one `🎯` row in §"Glyph layers and reuse" plus the
  paragraph explaining its empty layer-1 cell.
- `claude/skills/ft-task/SKILL.md` (+19/−2) — new **Step 3d**, with 3a / 3b /
  3c amended to route through it.
- `claude/skills/ft-goal-task/SKILL.md` (+13) — Step 3d with the loop flavor.
- `claude/skills/ft-micro-task/SKILL.md` (+9) — appended to Step 2 (single
  scaffold path, so no shared step to build).
- `SPEC/procedures/ft-task.md` (+18) — same obligation in §3 for contract-only
  agents; `last-verified:` left un-bumped per flag-don't-bump.

**Two decisions, both operator-confirmed at Phase 1.** Scope is the three
ID-invoked runners, not the full initiating cohort: `/ft-epic-discovery` and
`/ft-close-epic` are invoked in-session with the scoping conversation still
live, so a blurb there restates what the operator just said. The test that
separates them — "could this invocation arrive cold with nothing but an ID" —
is written into the contract so the boundary is defensible later rather than
merely observed. Shape is a `🎯`-prefixed marker over plain prose, because
prose with no fast-scan signal blends into scaffolding chatter, which is the
failure `SPEC/gates.md` §"Emphasized inline ask shape" already diagnosed for
👁️.

**Verification.** No unit tests apply (markdown contract + skill prose, no
executable surface). The registered structural gates were run and are clean:
the `SPEC.md` wrapper-name invariant, `/ft-release` §7.1 Pair I and Pair J, a
cue-table integrity diff, a repo-wide `🎯` audit (every pre-existing hit is the
`## 🎯 Goal` heading), and citation-resolution greps for both new `§"…"`
targets from all five citing files.

**Refactors.** None — six additive blocks, no deletions. One was considered and
declined: a shared lazy fragment for the blurb text, as
`step-1.5-model-edge.md` and `unattended-mode.md` do. At ~8 lines per runner
the duplication is below the weight that earns a fragment, and a fragment would
cost a file read on the happy path of *every* run — the wrong trade for a step
that fires unconditionally.

**Maintainability.** The surfaces flowtron guards most closely are untouched:
no operator-cue table row, no new banner (the CORE-065 two-banner cap holds),
no new checklist box or phase. `🎯` enters as documented cross-layer reuse of
an in-service glyph rather than a vocabulary widening, which keeps the cue
table's uniqueness rule meaningful and keeps a future `/ft-audit docs` pass
from flagging an undocumented glyph. The contract is stated once and cited five
times, so the next edit has one place to land.

**Archived:** 2026-08-30
