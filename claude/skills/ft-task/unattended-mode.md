# `--unattended` — operator-less posture (executable steps)

> Lazy-loaded SKILL fragment — **shared**. Loaded by `/ft-task`, `/ft-micro-task`, and `/ft-close-epic` at their Step 0 when `unattended-mode = true`. The file is owned by `claude/skills/ft-task/`; the other two skills resolve it through their `<UNATTENDED>` path binding, the same way `/ft-micro-task` resolves `preamble.md` through `<PREAMBLE>`.
>
> **The contract lives in [`SPEC/gate-postures.md`](../../../SPEC/gate-postures.md) §"`--unattended` operator posture"** — this fragment is its executable interpretation across the two runners, not a second copy. Read the contract when this file is silent or in tension. The `park-reason:` key and its closed-set codes (§"Park reason"), the parked state, and its resume path are canonical in [`SPEC/blocked.md`](../../../SPEC/blocked.md).
>
> **`<SKILL>` below stands for the invoking skill's own slash command, flags included** — `/ft-task` (with `--debug` / `--loop` as passed), `/ft-micro-task`, or `/ft-close-epic`. Substitute it wherever it appears; never hard-code a bare `/ft-task`.
>
> **Most of this file is written for the two runners.** `/ft-close-epic` shares the park recipe, the pre-scaffold stop shape, and the never-relaxed list, but it is **not** a `--fast` superset there — see §"`/ft-close-epic`" at the end, and `SPEC/gate-postures.md` §"`/ft-close-epic` under the posture" for the contract.

## What the posture adds

`--unattended` declares that **no operator is present to answer a gate**. On the two runners it supersets `--fast`'s *autonomy*: setting `unattended-mode = true` also sets `fast-mode = true` — the operator does not pass both flags — and **two** of the four `--fast` surfaces apply exactly as written (📦 force-skip, 🛠️ no-op for routine trips). On `/ft-close-epic` there is no `--fast` to superset, and the flag carries the posture directly. A PLAN.md row's `[unattended]` marker implies `--fast` on an attended run and **never** this posture — under an explicit `--unattended` it changes nothing.

**The two delegations are not inherited.** `--fast`'s 👁️ suppression *delegates* the visual check to the operator standing there (`SPEC/gate-postures.md` §"`--fast` operator override": *"the operator owns the visual-confirmation responsibility on fast-mode runs"*), and its Re-scope downgrade *delegates* the review of a rewritten plan to the operator watching the ⚠️ notice scroll by; the other two merely *remove a pause*. A delegation to nobody drops the obligation rather than transferring it, so under this posture the 👁️ ask **converts to a park** like any other unanswerable gate — see the last row of the map below — and a Re-scope parks `drift` exactly as it would with no `--fast` at all. Contract: `SPEC/gate-postures.md` §"`--unattended` operator posture" → "What is inherited, and what is not". In one line: **the posture supersets `--fast`'s autonomy, not its delegations.**

On top of that, it adds **exactly one behavior**: where `--fast` still lets a gate fire, `--unattended` **parks the tasknote** instead of firing a banner into an empty session. A conversion *removes* a banner and never adds one. Mint no new cue glyph; the CORE-065 two-banner cap is untouched.

Flaitron ships no orchestrator, scheduler, or session daemon. This posture is the contract an orchestrator reports to — contract in flaitron, runtime in the caller.

## The park recipe

Every conversion below performs the same four writes, then stops:

1. Flip the tasknote's YAML `status:` to `blocked`.
2. Flip the nav-header chip from `🟢 In progress` to `⏸ Blocked`.
3. Write `park-reason: <code> — <one-line prose>` into the frontmatter, where `<code>` comes from the closed set in `SPEC/blocked.md` §"Park reason". A caller splits on the first ` — ` to read the code and never parses the prose, so put the classification in the code and the detail in the prose. The value is a YAML plain scalar — one line, unquoted, **no `: ` and no ` #` in the prose, no trailing `:`** — rephrase rather than quote (same section, "The value is a YAML plain scalar").
4. Emit one inline marker and **stop**:

   ```markdown
   ⏸ --unattended park — <code>: <one line>. Tasknote parked at `.flaitron/tasknote/<TASK-ID>.md`; PLAN.md line unchanged.
   ```

   `⏸` is the pre-existing nav chip, not a new cue glyph.

**Stop means stop.** Do not run Phase 3 or Phase 4. The tasknote stays at `.flaitron/tasknote/<TASK-ID>.md`, the PLAN.md line stays unchecked, and Phase 1 plus any partial Phase 2 work is preserved verbatim.

**A park never performs the operator's motion.** The drift park does not make the verdict's PLAN.md edit and does not delete the tasknote; the micro dependency park does not re-file the task. Record what the operator should do on resume in the `park-reason:` prose or the tasknote body — the resuming operator takes it under a real gate.

**Resume is unchanged.** Re-invoking `<SKILL> <TASK-ID>` against the parked tasknote takes `SPEC/blocked.md`'s normal resume path: drift-check the parked work, flip `status:` back to `in-progress`, flip the chip back to `🟢 In progress`, **remove `park-reason:`**, and continue — at Phase 2, or at Phase 1 for a `model-mismatch` park, which was written before Phase 1 ran (`step-3c-resume-blocked.md`). A micro-shaped `model-mismatch` park instead resumes in place under `/ft-micro-task` (its Step 2) and continues at its Step 3.

## Conversion map

Six gates convert from *ask and wait* to *park and stop*. The seventh row is the mid-execution dependency park that predates the posture, listed here because the posture changes what the runners do about it.

| Gate | `park-reason` code | `/ft-task` | `/ft-task --loop` (where it differs) | `/ft-micro-task` |
|---|---|---|---|---|
| Step 1.5 **concrete-model mismatch** STOP | `model-mismatch` | Step 1.5 — scaffold, then park; an existing starter/blocked note or sidequest stub stops, write nothing (see below) | same | Step 1.5 — same |
| 🛠️ Phase 1→2 **drift carve-out** (`Re-scope` / `De-scope`) | `drift` | Step 4 exit gate | same (one-time, pre-loop) | Step 3 Relevance prompt |
| **Destructive-action escalation** 🗄️/▶️/📡/💻 | `destructive` | Step 5 Phase 2 | loop body (already parks — add the key) | Step 3 execution |
| ✋ `ACTION` that is a **prerequisite** for continuing | `prerequisite` | wherever it surfaces | wherever it surfaces | wherever it surfaces |
| A queued **bundled in-📦 prompt** | `input-needed` | Step 6 | same | Step 5 |
| 👁️ `CONFIRM` **visual ask** | `visual-confirm` | Step 5 Phase 3 | the one-time post-loop ask | — *(no separate 👁️ ask)* |
| Hard dependency mid-execution *(pre-existing park)* | `dependency` | Step 5 Phase 2 | loop body | Step 3 — park + promote note |

**The 👁️ trigger is the emission condition, not a second judgment.** Wherever the run would emit a 👁️ ask, park with `park-reason: visual-confirm — <what needs looking at, and where>` instead. Whether the change needs a visual check at all is decided upstream, exactly where it always was: a task with no rendered surface records the Phase 3 box `N/A`, emits no ask, and never parks. Do **not** invent a gating-vs-corroborating split — "the tests probably cover it" is the judgment this conversion deletes, and **a passing visual baseline does not convert it either**: flaitron cannot tell an approved golden from an auto-minted one, and "does the baseline cover what I changed" is that same split renamed (`SPEC/gate-postures.md` §"Park conversions"). `/ft-micro-task` has no separate 👁️ ask (`SKILL.md` §Step 0), so the row is n/a there rather than a park.

**`--loop`'s one-time ask.** Per-cycle 👁️ suppression inside the loop is unchanged — taste criteria were split out to the one-time post-loop ask (`step-5-loop-mode.md` §"Step 6"), so the loop never had an ask to convert (`SPEC/loop.md` §"Gate collapse"). It is that **one-time** ask that parks. A loop that converged is not a loop that finished: park before closure, and record the split-out criteria in the reason prose.

**The ✋ split is biased conservative — park on doubt.** An *advisory* ✋ is recorded and the run continues; only a **prerequisite** ✋ parks. "It is probably advisory" is exactly the doubt this bias exists to refuse: an over-park costs one resume, an under-park reaches closure with the prerequisite never performed.

**`drift` vs `dependency`.** The code names what *stopped* the run, not what motivated it. A `Re-scope` verdict parks as `drift` even when a dependency drove the verdict — and even though `--fast` alone would have downgraded it to an inline notice; that downgrade is a delegation the posture does not inherit.

**`/ft-micro-task`'s dependency park.** The attended guidance is *"micro-tasks are not designed to park — re-file as `/ft-task`"*, and it stands for the attended path. Under `--unattended` there is no operator to re-file, so park with `park-reason: dependency — <the dependency>; promote to /ft-task on resume` and stop. The promotion is a resume instruction, not an autonomous action.

**`--loop`'s loop body.** Its destructive-action carve-out (`step-5-loop-mode.md` §"Step 5") already parks without an operator, by construction. Under `--unattended` it gains one obligation: write `park-reason: destructive — …` alongside the `## 🔁 Iterations` entry, so a caller reading the file alone can classify the stop. The `loop-max` **soft stop** is *not* a conversion — it hands back to the operator with the tasknote intact and unparked, exactly as `SPEC/loop.md` specifies.

## Pre-scaffold stops

The pre-flight checks and the Step 1.5 model gate run before this run has written a tasknote (the skill/pin guard, last below, is the one stop that can also fire later), so a "park" there may have nothing to park — or may find a note it must not touch. Split by what the stop is *about*:

- **Concrete-model mismatch — scaffold, then park.** A task-level assignment problem, and the tree is known clean (the foreign-dirt gate already passed). Skip the AskUserQuestion two-path offer. **Create the note only when none exists** — neither a tasknote nor a `.flaitron/sidequest/<TASK-ID>.md` stub — then write the tasknote (from the invoking runner's own template) with `status: blocked` and `park-reason: model-mismatch — PLAN.md tags [<tag>], active model is <model>`, and halt. The caller gets the same readable stop surface it gets everywhere else. An existing `starter` or `blocked` note (`/ft-task` only; `/ft-micro-task` lets only its own `model-mismatch` park through Pre-flight, and refuses every other existing note) or a sidequest stub is **left untouched** — terminate and write nothing, in the `⏸ --unattended stop — model-mismatch: …` shape, naming the existing starter note, blocked note, or sidequest stub, so its promote or resume routing survives and the stub is retired by the attended promotion that reads it. Do **not** retag the PLAN.md line autonomously.
- **Foreign-dirt gate — terminate, write nothing.** Writing a new untracked file into a tree the paper-complete guard has just refused to touch makes that file its own foreign dirt on the next invocation — a self-blocking loop. Report the dirt and stop:

  ```markdown
  ⏸ --unattended stop — foreign-dirt: <N> uncommitted path(s). No tasknote written; commit, stash, or discard, then re-invoke.
  ```

  List the paths. Never stash, clean, or commit them.
- **`## Completed` status gate and archive collision — terminate, write nothing.** Both mean a tasknote for this ID already exists; there is nothing new to park, and scaffolding one would duplicate it. Same `⏸ --unattended stop — <cause>: …` shape.
- **Open-siblings audit — terminate, write nothing.** A `.N` audit ID runs after every other child of its epic (`SPEC/unattended-candidacy.md` clause 6), and a run while one is open would park on drift. That parked note then dirties the tree for the next dispatch. At its hook in `preamble.md` §"Pre-flight", find the parent `<AREA>-EPIC-<N>` and every `<AREA>-<N>.<sub>` row anywhere in PLAN.md (nested or not). If any such row other than this `.N` is `- [ ]`, stop with `⏸ --unattended stop — open-siblings: <open child IDs>. No tasknote written.` A parent line that is missing, `- [x]`, or under `## Completed` stops the same way, with cause `no-parent` or `parent-closed`. This is `/ft-close-epic`'s Step 2 bail, read at run time like that one. Unlike CORE-736's admission-time clause-6 gate, it therefore also catches siblings filed or dispatched after `.N` was marked. A legacy numeric audit is not detected here and stays unguarded at run time — a runner cannot tell it from the last implementation child.
- **An existing in-flight tasknote** (`status:` `not-started` / `in-progress` / `completed`, or unrecognized) — the runners refuse this in Pre-flight, ahead of the model gate, and recommend continuing conversationally. Unchanged; report it in the same stop shape and write nothing.
- **Skill/pin guard — stop, never park.** It usually fires before any write, and can also fire later, when a lazily read file is absent. Either way the body and the pin disagree, so a park would be a further write the guard forbids, and a resume through the same body would hit the same stop. The guard paragraph in each body emits `⏸ --unattended stop — skill-pin-mismatch: <base directory or missing path>; wrote <paths, or nothing>.` itself, because the guard paragraph owns the stop, and halts. Never revert or commit in response; the stop line names what this run wrote, marking any path it already committed. No `park-reason:` code; the fix (remove the agent-home copy, or bump the pin) is the operator's.

## What `--unattended` never relaxes

`SPEC.md` §"Paper-complete guard" holds in full — all three parts, with no unattended variant:

1. **Foreign-dirt gate.** Report the dirt machine-readably; never stash, clean, or commit it.
2. **Atomic single-commit closure.** Deliverables + PLAN flip + archive move land together or not at all.
3. **🏁 only with a deliverable-covering SHA.** Verify with `git show --name-only`; never invent a SHA. No operator watching is a reason to hold this line harder, not to relax it.

Nor does it keep **Phase 3's targeted default**. Run the repo's **full validation set**, never the targeted default: the `justfile` recipes (`just test` / `just lint` / `just typecheck`) when one exists, else the validation commands the repo's `AGENTS.md` / `CLAUDE.md` names, else the steps its CI workflow runs — in that discovery order, and record each as `command → exit code` in the receipt exactly as the targeted commands would be. A red is Phase 2 evidence, not a closure question: a failure this diff caused sends the run back to Phase 2; a red the run cannot make green parks with `park-reason: input-needed — full suite red on <first failing command>, not caused by this diff, needs an operator to decide whether closure may proceed` (rephrase so the prose carries no `: `), never a close over it. A repo with no validation set records `N/A — no validation set declared`. `--fast` alone and the `[unattended]` row marker keep the attended targeted default. Contract: `SPEC/gate-postures.md` §"What `--unattended` never relaxes".

Nor does it relax the **downstream-impact reconciliation** user-confirm, which guards plan correctness rather than pacing: with no operator to confirm, a direction-changing decision that reaches beyond the current task is a `Re-scope`, and `Re-scope` parks as `drift`.

Nor does it relax **[`SPEC.md`](../../../SPEC.md) §"Deferred hand-off filing"** — the duty to file a deferred real-world operator step as its own unchecked PLAN.md row. The posture *raises* the volume of deferred steps rather than lowering it: whatever an operator-less run could not do falls to the absent operator, and prose in a Recap or a `## 🔄 Handoff` hides it from every future reader. A run that reaches closure discharges it through `/ft-file-task --unattended`, whose filing commit is authorized by the duty itself ([`SPEC/plan-filing.md`](../../../SPEC/plan-filing.md) §"Filing commits" → "Unattended filing authority"). That filing report carries an `unattended-candidates:` line — the rows its predicate admitted for `[unattended]`, or `none` — and the closure **copies it verbatim into its own tasknote's Final Summary** (a micro-tasknote's `## ✅ Recap`) before the archive move: a pre-archive closure write, so the resuming operator finds the candidates where they find the deferred rows (mirror of `SPEC/unattended-candidacy.md` §"Persistence"). The runner writes no token itself — it is not a filer, and the line names rows an operator may later mark. A run that *parks* files nothing — a park is paused, not closed, and its `park-reason:` already records what the operator must take up on resume.

`--unattended` removes *pauses*, never *proof*.

## `/ft-close-epic`

The epic-close skill accepts the flag on its own terms (`SPEC/gate-postures.md`
§"`/ft-close-epic` under the posture"). What it shares with the runners:

- **The park recipe** — used once, at its Step 4 Phase 1→2 exit gate. It runs
  the `default-fire-on-clarifications` flavor, so a clarification it cannot
  answer parks as `input-needed`; a `Re-scope` / `De-scope` verdict parks as
  `drift`. The audit tasknote exists by then, so all four writes apply.
- **The pre-scaffold stop shape** — every Step 1-2 bail terminates and writes
  nothing, including the open-siblings ask (whose own default is already
  "bail", so it is taken deterministically rather than asked).
- **The never-relaxed list, in full.** The audit commit is a real commit.

What differs: it is **not a `--fast` superset** — nothing to inherit. Its
parent flip is not a question and runs as attended
(`SPEC/plan-filing.md` §"Epic parent flip").

`/ft-epic-discovery` does not accept the flag at all.
