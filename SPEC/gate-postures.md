# Flag postures — `--fast` and `--unattended`

> Lazy-loaded SPEC module. Loaded by `/ft-task` and `/ft-micro-task` at their Step 0 flag parse when `--fast` or `--unattended` is set, at their Step 1 when the PLAN.md row's `[unattended]` marker implies `--fast`, and by `/ft-close-epic` at its Step 0 under `--unattended`; consulted by any surface reasoning about what a flag suppresses, converts, or never reaches. A flagless run on an unmarked row never loads it. See [`SPEC/gates.md`](gates.md) for the gate machinery these postures cross-cut and `SPEC.md` for the always-loaded core spec.

The two operator postures that cross-cut every gate live here — `--fast` (an
operator who is present but does not want to be asked) and `--unattended` (no
operator present at all) — with the precedence ladder and surface matrix that
settle every `--fast` / `--unattended` / 👁️ interaction in one place. Each gate
section in `gates.md` states its own rule and points here for the flag
interaction; nothing here restates a gate. The executable interpretation for
the operator-less posture is `claude/skills/ft-task/unattended-mode.md`; the
`park-reason:` codes it writes are canonical in [`SPEC/blocked.md`](blocked.md)
§"Park reason".

## Flag precedence and surface matrix

### Precedence ladder

Read top-down. The first rung that applies decides, and a lower rung never
overturns a higher one.

1. **Bundled in-📦 prompt.** A queued user-input question is never skipped by
   any flag. Attended it forces the 📦 banner; under `--unattended` it parks
   (`input-needed`) — because neither an autonomous commit nor a banner into
   an empty session can answer it.
2. **`--unattended` conversion.** It first *inherits* everything rung 3 skips —
   those gates are gone, not parked. What it does not inherit is `--fast`'s two
   **delegations** (the 👁️ ask and the Re-scope notice), because a transfer
   needs a transferee. So: any gate that would still fire, plus those two
   undelegatable surfaces, becomes a **park** rather than a banner or a silent
   skip. This rung sits above rung 3 because where the two disagree, the park
   wins — never the other way round.
3. **`--fast` skip.** Forces the Skip branch on 📦, suppresses the 👁️ ask, and
   downgrades a Re-scope 🛠️ to an inline notice, regardless of signal state.
   Also implied by the row's `[unattended]` marker (§"`--fast` operator
   override").
4. **Signal / flavor default.** The privileged-ops glob match (📦) and the
   skill's exit-gate flavor (🛠️), computed from the actual diff and the actual
   Discovery Notes.

**Outside the ladder entirely.** No rung reaches these, and no flag position
argues its way past them: the destructive-action escalation (a safety control
— `--unattended` parks it, never suppresses it), the 🛠️ De-scope drift
carve-out, and [`SPEC.md`](../SPEC.md) §"Paper-complete guard" in all three
parts.

### Surface matrix

**Bold** marks a cell the flag does **not** reach. `park-reason:` codes are the
closed set in [`SPEC/blocked.md`](blocked.md) §"Park reason".

| Surface | Default | `--fast` | `--unattended` |
|---|---|---|---|
| 🛠️ Phase 1→2, routine trip | Per flavor ([`SPEC/gates.md`](gates.md) §"Phase 1→2 exit gate") | No-op under `default-skip` — already skipped | Inherited; a firing flavor parks `drift` |
| 🛠️ Phase 1→2, Re-scope | Fires; on a blocked prerequisite the banner offers delete-or-park ([`SPEC/blocked.md`](blocked.md) §"Phase 1 entry") | Inline ⚠️ notice; the PLAN.md rewrite is still made, and a blocked prerequisite parks by default, named in the notice | Parks `drift` — the notice is a delegation, not inherited |
| 🛠️ Phase 1→2, De-scope | Fires | **Fires** — drift carve-out | Parks `drift` |
| 📦 clear signal | Skips (autonomous commit) | Skips | Skips |
| 📦 privileged-ops signal trip | Fires | Skips; the suppressed signal is named in the marker | Inherited — skips |
| 📦 bundled in-📦 prompt | Fires | **Fires** | Parks `input-needed` |
| 👁️ `CONFIRM` (Phase 3) | Emphasized inline ask | Suppressed — the present operator owns the check | Parks `visual-confirm` |
| 🗄️/▶️/📡/💻 destructive escalation | Escalates to a banner | **Escalates** | Parks `destructive` |
| ✋ `ACTION`, prerequisite | Inline cue; does not block the assistant | Inline cue | Parks `prerequisite` |
| ✋ `ACTION`, advisory | Inline cue | Inline cue | Recorded; the run continues |
| Step 1.5 concrete-`[model]` mismatch | STOP + structured ask | STOP + ask | Scaffold, then park `model-mismatch`; an existing starter/blocked note or sidequest stub stops, write nothing |
| Foreign-dirt gate | STOP, write nothing | **STOP** | **STOP**, write nothing — reported machine-readably |
| Paper-complete guard (all three parts) | Enforced | **Enforced** | **Enforced** |
| `[unattended]` row marker, no flag passed | Implies `--fast` | — | **Not implied** |

Three readings the matrix forecloses. `--fast` reaches **exactly four**
surfaces (§"`--fast` operator override") and no fifth. `--unattended`
**parks** where it differs; a park is a stop, not a wave-through. And a
conversion **removes a banner; it never adds one** — no new cue glyph is
minted anywhere in this table.

## `--fast` operator override

Passing `--fast` (or `-f`) is operator-side opt-in for autonomous
execution on routine runs. It declares an operator who is **present but does
not want to be asked**, and it touches exactly four surfaces — 📦 force-skip,
👁️ suppression, a 🛠️ no-op for routine trips, and the Re-scope downgrade to
an inline notice. Their per-surface effects, and the one lever that outranks
the flag (a queued bundled in-📦 prompt), are in §"Flag precedence and surface
matrix".

**Implied by the `[unattended]` row marker.** A PLAN.md row carrying
`[unattended]` ([`SPEC/task-line-segments.md`](task-line-segments.md)) is the operator's
declaration that the row is safe to drive with nobody present — so it needs
no pauses when somebody is. The two runners that accept `--fast` set
fast-mode from the marker when no flag was passed, and say so inline
(`⚡ --fast implied by the [unattended] row marker …`). The marker implies
**only** this flag: it never puts a run in the `--unattended` posture, which
stays the caller's per-invocation declaration (§"`--unattended` operator
posture"; [`docs/EXTERNAL-AGENTS.md`](../docs/EXTERNAL-AGENTS.md)).

Two properties the matrix's rows depend on and this section owns. The 📦
force-skip is **operator-side de-escalation by explicit input**, distinct from
the AI-side bidirectional lock in [`SPEC/gates.md`](gates.md) §"Conditional skip rule" — which is why the
suppressed signal must be named in the marker (e.g., `committing autonomously
(privileged-ops path touched; suppressed via --fast).`). And the 👁️
suppression and the Re-scope notice are **delegations, not removed pauses** —
the hinge of §"What is inherited, and what is not".

**Each delegation is bounded to its own check.** `--fast` suppresses the 👁️
**ask**, not the phase around it: the targeted tests and the lint / type-check
on changed code still run, and the operator owns only the visual confirmation.
Likewise the Re-scope notice delegates the *review* of the rewritten plan, not
the rewrite: the verdict still rewrites the PLAN.md line and tasknote header
([`SPEC.md`](../SPEC.md) §"📝 Phase 1: Discovery"), then emits
`⚠️ Re-scope (--fast) — <what changed in the plan>; proceeding.` on its own
line and enters Phase 2 behind the ordinary skip marker. On a blocked
prerequisite it parks `drift` instead, names the park in the notice in place
of `proceeding`, and halts; the operator overrules inline
([`SPEC/blocked.md`](blocked.md) §"Under `--fast`, park and say so").

`--fast` applies to `/ft-task` (every flag set, `--loop` included) and
`/ft-micro-task` — the epic skills (`/ft-epic-discovery`,
`/ft-close-epic`) do not accept it. `/ft-refactor` has its own,
unrelated `--fast`: it only skips the operator review pause before
filing the refactor epic and never touches the 👁️/📦/🛠️ gate surface
described above.

## `--unattended` operator posture

`--unattended` declares something `--fast` never claims: that **no
operator is present to answer a gate**. It supersets `--fast`'s autonomy —
passing it never requires also passing `--fast`, and no gate ever blocks
waiting for an answer — and it adds exactly one behavior on top. Where
`--fast` still lets a gate fire, `--unattended` **parks the tasknote**
instead of firing a banner into an empty session.

**Runtime stays out.** Flaitron ships no orchestrator, scheduler,
dispatcher, or session daemon (see [`docs/VISION.md`](../docs/VISION.md)
§"What we won't accept"). This posture is the **contract an orchestrator
reports to** — the same boundary [`SPEC/loop.md`](loop.md) draws for loop
runners, widened from one runner to any operator-less caller. Contract in
flaitron, runtime in the caller.

### What is inherited, and what is not

`--fast`'s four surfaces are not the same kind of thing, and the
distinction is what this posture turns on. 📦 force-skip and the 🛠️ no-op
**remove a pause** — the run proceeds and the operator reviews the commit
afterwards — so both are inherited exactly as written. 👁️ suppression and
the Re-scope notice **transfer an obligation**: the visual check to *"the
operator [who] owns the visual-confirmation responsibility on fast-mode
runs"*, and the review of a rewritten plan to the operator watching it scroll
by (§"`--fast` operator override"). Neither is inherited; each converts to a
park (`visual-confirm`, `drift`). The rows are in §"Flag precedence and
surface matrix".

A transfer needs a transferee. `--unattended` exists to declare there is
none, so inheriting either delegated surface would inherit a **transfer to
nobody**: the obligation is not deferred, it is dropped — silently, on the
one cue [`SPEC/cue-vocabulary.md`](cue-vocabulary.md)
§"Emphasized inline ask shape" calls the only one that *gates task
completion*, or on a plan nobody re-read before it executed. Converting them
costs no autonomy (a park is not a pause) and buys the caller a readable stop.

Stated in one line: **`--unattended` supersets `--fast`'s autonomy, not its
delegations.**

### Park conversions

Six gates cannot be answered by a caller that is not there, so under
`--unattended` each converts from *ask and wait* to *park and stop*, one
`park-reason:` code apiece: the 🛠️ drift carve-out (`drift`), the
destructive-action escalation (`destructive`), a prerequisite ✋ `ACTION`
(`prerequisite`), the Step 1.5 concrete-model mismatch (`model-mismatch`, via
§"Pre-scaffold stops", which stops without a park when a note or stub
exists), a queued bundled in-📦 prompt (`input-needed`), and the Phase 3 👁️
ask (`visual-confirm`); their rows are in §"Surface matrix". What follows is
why four of them read the way they do.

The 🛠️ conversion parks at the Phase 1→2 boundary because Phase 1 is complete
and its Discovery is exactly the work worth preserving. The destructive
conversion generalizes [`SPEC/loop.md`](loop.md) §"Gate collapse" →
"Destructive-action carve-out" from one runner to the posture.

**The 👁️ trigger is the emission condition, not a second judgment.**
Whenever Phase 3 would emit a 👁️ ask, the run parks with
`park-reason: visual-confirm — …`. Whether a change needs visual
confirmation at all is decided upstream, where it always was: a task with no
rendered surface records the Phase 3 box `N/A`, emits no ask, and never
parks. There is deliberately **no** gating-vs-corroborating split here — an
`--fast`-style "the tests probably cover it" judgment is exactly the
rationalization this conversion exists to remove.

**A passing visual baseline does not convert it either** — not even a
byte-identical one argued as a recorded human approval *replayed*. Full
reasoning: [`docs/GATE-DISCIPLINE.md`](../docs/GATE-DISCIPLINE.md) §"Refused
carve-outs".

**The ✋ split is biased conservative — park on doubt.** Same asymmetry as
the destructive-action predicate: an over-park costs one resume, an
under-park reaches closure with the prerequisite never performed. "It is
probably advisory" is the doubt the bias exists to refuse.

### What a park is

The park is [`SPEC/blocked.md`](blocked.md)'s existing parked state,
entered from a gate rather than from a hard dependency:

- Flip YAML `status:` to `blocked` and the nav chip to `⏸ Blocked`.
- Record a **structured reason** distinguishing the six stop causes
  above — a caller reading the tasknote must be able to tell a drift park
  from a destructive-action park without a transcript. The reason key and
  its code tokens live in [`SPEC/blocked.md`](blocked.md) §"Park reason".
- **Stop.** Do not run Phase 3 or Phase 4. The tasknote stays at
  `.flaitron/tasknote/<TASK-ID>.md`, the PLAN.md line stays unchecked, and
  Phase 1 plus any partial Phase 2 work is preserved verbatim.

Resume is unchanged: re-running the skill against the parked tasknote
takes [`SPEC/blocked.md`](blocked.md)'s normal resume path, with an
operator present to answer the gate that parked it.

**The park itself is not unattended-only.** [`SPEC/blocked.md`](blocked.md)
§"Phase 1 entry" offers it attended too, as one of two dispositions at the 🛠️
gate. What this posture adds is its **unconditionality** — with
nobody to pick, a `Re-scope` / `De-scope` verdict parks every time, and the
PLAN.md edit defers.

### Pre-scaffold stops

The Step 1 pre-flight checks and the Step 1.5 model gate run before this
run has written a tasknote (the skill/pin guard, last below, can also fire
later), so a "park" there may have nothing to park — or
may find a note it must not touch. Each runner's pre-flight refuses an
in-flight note (`/ft-micro-task`: any existing note but its own
`model-mismatch` park), so only a starter or blocked note can reach
`/ft-task`'s model gate, and only its own park `/ft-micro-task`'s. The posture splits by what
the stop is *about*:

- **Concrete-model mismatch — scaffold, then park.** A task-level
  assignment problem, and the tree is known clean (the foreign-dirt gate
  already passed). Create the note only when none exists — neither a
  tasknote nor a sidequest stub — writing it with `status: blocked` and
  the reason, then halt, so the caller gets the same readable stop surface
  it gets everywhere else. An existing starter or blocked note, or a
  sidequest stub, is left untouched — terminate and write nothing, so its
  promote or resume routing survives.
- **Foreign-dirt gate — terminate, write nothing.** Writing a new
  untracked file into a tree the guard has just refused to touch makes
  that file its own foreign dirt on the next invocation. Report the dirt
  and stop.
- **`## Completed` status gate and archive collision — terminate, write
  nothing.** Both mean a tasknote for this ID already exists; there is
  nothing new to park, and scaffolding one would duplicate it.
- **Open-siblings audit — terminate, write nothing.** A `.N` audit ID
  whose epic still has an open child would park on drift, and that note
  would dirty the tree for the next dispatch. The runners walk the
  parent's children at run time and stop with cause `open-siblings`
  (`no-parent` / `parent-closed` when the parent is missing or closed),
  as `/ft-close-epic` Step 2 already does.
- **Skill/pin guard — stop, never park.** Body and pin disagree, so a
  park is a further write the guard forbids, and a resume through the same
  body would stop again. The guard paragraph in each body owns the line:
  `⏸ --unattended stop — skill-pin-mismatch: <base directory or missing
  path>; wrote <paths, or nothing>.` After a write (a lazily read missing
  file), it reverts and commits nothing, and names what it wrote, marking
  any path already committed.

### What `--unattended` never relaxes

[`SPEC.md`](../SPEC.md) §"Paper-complete guard" holds in full — all three
parts, with no unattended variant. The foreign-dirt gate may report the dirt
machine-readably but never stash, clean, or commit it; deliverables, PLAN
flip, and archive move still land in one atomic commit or not at all; and no
operator watching is a reason to hold 🏁 harder, not to relax it — an
unnoticed paper-complete is the failure the guard was written for.

**Nor does it keep Phase 3's targeted default.** Attended,
[`SPEC.md`](../SPEC.md) §"🧪 Phase 3" defaults to targeted tests on the
changed behavior and reserves the full suite for broad or cross-cutting
changes — guidance, because an operator reviews the commit and can
second-guess the "is this change broad?" call. Under `--unattended` nobody
does, so Phase 3 runs the repo's **full validation set** — `just test` /
`just lint` / `just typecheck`, or whatever the repo declares as its
equivalents (its `justfile` recipes, its `AGENTS.md` validation commands, its
CI workflow's steps) — never the targeted default, and the receipt records
each command. A red result is Phase 2 evidence, not a closure question: a
failure the diff caused returns the run to Phase 2; one the run cannot make
green parks `input-needed` rather than closing over it — whether a red the
diff did not cause may be closed over is exactly a question autonomous
execution cannot answer, and the ✋ bias above (park on doubt) applies. A
repo that declares no validation set records `N/A` with that reason. The
motivating case is an orchestrator's green-targeted / red-full closes: the targeted
run was green, the full suite was red, and the judgment that would have run
it had no one to make it. `--fast` and the `[unattended]` row marker keep the
attended default — an operator reviews those commits.

**Nor does it relax Phase 3's External review.** A context that did not write
the diff grades it against `## ✅ Acceptance` on every path, and the posture is
the case it was written for: with nobody reading the commit, the external
grade is the only read of the diff that is not the generator's own. A
**blocker** the run can fix returns it to Phase 2; one it cannot parks
`park-reason: input-needed — <the blocker>` rather than closing over it. A
**note** is recorded and the run continues. The reviewer never patches, so
this converts no gate and adds no row to a runner's park map — see
[`SPEC.md`](../SPEC.md) §"🧪 Phase 3: Testing & Linting".

`--unattended` removes *pauses*, never *proof*.

### `/ft-close-epic` under the posture

The two runners above are not the whole surface. `/ft-close-epic` drives an
epic's `.N` audit through closure under the posture too, and the audit commits
exactly as an attended run with clear signals would. Its parent flip is not a
question, so the posture leaves it alone: the closure that leaves every child
`[x]` flips the parent and moves the cohort
([`plan-filing.md`](plan-filing.md) §"Epic parent flip").

One semantic differs from the runners': **it is not a `--fast` superset.** The
epic skills never accepted `--fast`, so there is nothing to be a superset of.
`--unattended` carries the posture directly: suppress what has no operator,
park or terminate what cannot be answered. The one conversion that parks is
the Phase 1→2 exit gate, where the audit tasknote exists and the standard
recipe applies. `/ft-close-epic` runs the `default-fire-on-clarifications`
flavor, so a clarification it cannot answer parks as `input-needed`, the same
"question autonomous execution cannot answer" that code already names.

Everything §"What `--unattended` never relaxes" lists holds here in full: the
audit commit is a **real** commit, so the foreign-dirt gate still terminates
write-nothing and 🏁 still requires a deliverable-covering SHA.

**Applies to** the two runners `--fast` applies to — `/ft-task`,
`/ft-micro-task` — plus `/ft-close-epic`, on the terms
above, and `/ft-file-task`, on
[`plan-filing.md`](plan-filing.md) §"Filing commits".
`/ft-epic-discovery` does not accept it: it opens an epic by filing
PLAN.md lines from a scoping conversation, and there is no such conversation
to have with nobody present.
