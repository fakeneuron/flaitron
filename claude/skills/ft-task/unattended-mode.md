# `--unattended` — operator-less posture (executable steps)

> Lazy-loaded SKILL fragment — **shared**. Loaded by `/ft-task` and `/ft-close-epic` at their Step 0 when `unattended-mode = true`. The file is owned by `claude/skills/ft-task/`; `/ft-close-epic` resolves it through its `<UNATTENDED>` path binding.
>
> **The contract lives in [`SPEC/gate-postures.md`](../../../SPEC/gate-postures.md) §"`--unattended` operator posture"** — this fragment is its executable interpretation for the runner, not a second copy. Read the contract when this file is silent or in tension. The `park-reason:` key and its closed-set codes (§"Park reason"), the parked state, and its resume path are canonical in [`SPEC/blocked.md`](../../../SPEC/blocked.md).
>
> **`<SKILL>` below stands for the invoking skill's own slash command, flags included** — `/ft-task` (with `--debug` / `--loop` / `--micro` as passed) or `/ft-close-epic`. Substitute it wherever it appears; never hard-code a bare `/ft-task`.
>
> **Most of this file is written for the runner, `/ft-task`.** `/ft-close-epic` shares the park recipe, the pre-scaffold stop shape, and the never-relaxed list, but it is **not** a `--fast` superset there — see §"`/ft-close-epic`" at the end, and `SPEC/gate-postures.md` §"`/ft-close-epic` under the posture" for the contract.

## What the posture adds

`--unattended` declares that **no operator is present to answer a gate**. On `/ft-task` it supersets `--fast`'s *autonomy*: setting `unattended-mode = true` also sets `fast-mode = true` — the operator does not pass both flags — and **two** of the four `--fast` surfaces apply exactly as written (📦 force-skip, 🛠️ no-op for routine trips). On `/ft-close-epic` there is no `--fast` to superset, and the flag carries the posture directly. A PLAN.md row's `[unattended]` marker implies `--fast` on an attended run and **never** this posture — under an explicit `--unattended` it changes nothing.

**The two delegations are not inherited.** `--fast`'s 👁️ suppression *delegates* the visual check to the operator standing there (`SPEC/gate-postures.md` §"`--fast` operator override": *"the operator owns the visual-confirmation responsibility on fast-mode runs"*), and its Re-scope downgrade *delegates* the review of a rewritten plan to the operator watching the ⚠️ notice scroll by; the other two merely *remove a pause*. A delegation to nobody drops the obligation rather than transferring it, so under this posture the 👁️ ask **converts to a park** like any other unanswerable gate — see the 👁️ `CONFIRM` row of the map below — and a Re-scope parks `drift` exactly as it would with no `--fast` at all. Contract: `SPEC/gate-postures.md` §"`--unattended` operator posture" → "What is inherited, and what is not". In one line: **the posture supersets `--fast`'s autonomy, not its delegations.**

On top of that, it adds **exactly one behavior**: where `--fast` still lets a gate fire, `--unattended` **parks the tasknote** instead of firing a banner into an empty session. A conversion *removes* a banner and never adds one. Mint no new cue glyph; the CORE-065 two-banner cap is untouched.

The park that conversion writes is committed when the note is the tree's only uncommitted path (§"The park recipe"). Any other dirt, and the commit is skipped.

flaitron ships no orchestrator, scheduler, or session daemon. This posture is the contract an orchestrator reports to — contract in flaitron, runtime in the caller.

## The park recipe

Every conversion below performs the same three writes, then the lone-park commit, then the marker, and stops:

1. Flip the tasknote's YAML `status:` to `blocked`.
2. Flip the nav-header chip from `🟢 In progress` to `⏸ Blocked`.
3. Write `park-reason: <code> — <one-line prose>` into the frontmatter, where `<code>` comes from the closed set in `SPEC/blocked.md` §"Park reason". A caller splits on the first ` — ` to read the code and never parses the prose, so put the classification in the code and the detail in the prose. The value is a YAML plain scalar — one line, unquoted, **no `: ` and no ` #` in the prose, no trailing `:`** — rephrase rather than quote (same section, "The value is a YAML plain scalar").
4. **Lone-park commit.** Run `git status --porcelain`.
   - **Only the note.** Every line's path is `.flaitron/tasknote/<TASK-ID>.md`, and no line is anything else (a rename arrow, a second path, a dirty submodule). Then `git add -- .flaitron/tasknote/<TASK-ID>.md` — explicit pathspec only, never `git add .`, `git add -A`, or `git commit -a`. Read `git diff --cached --name-only` with **no pathspec**. It must list exactly that one path. Anything else → `git restore --staged -- .flaitron/tasknote/<TASK-ID>.md` and take the skip below. Do not unstage a path this step did not add. On a clean read, `git commit` with subject `chore: park <TASK-ID> — <code>` and no body. No pathspec on the commit: it publishes the index just read (`SPEC/plan-filing.md` §"Filing commits" — a pathspec commit bypasses that read). Never push. Never `--no-verify`. No 🏁 — PLAN.md stays unchecked, the note stays at `.flaitron/tasknote/<TASK-ID>.md`, and `status` stays `blocked`. Not a closure, and not a filing commit. Confirm `git show --name-only --pretty=format: HEAD` names only that path, and report `committed <sha>`.
   - **Skip.** Any other porcelain path, empty porcelain, an index the read rejected, or a failed commit: commit nothing and report `left uncommitted`. Do not retry and do not amend. Pre-scaffold stops write nothing, so they never reach this step. An attended park does not run it, and neither does a caller-written `interrupted` note (`docs/EXTERNAL-AGENTS.md` step 6).
5. Emit one inline marker and **stop**:

   ```markdown
   ⏸ --unattended park — <code>: <one line>. Tasknote parked at `.flaitron/tasknote/<TASK-ID>.md`; PLAN.md line unchanged. committed <sha> or left uncommitted
   ```

   `⏸` is the pre-existing nav chip, not a new cue glyph.

**Stop means stop.** Do not run Phase 3 or Phase 4. The tasknote stays at `.flaitron/tasknote/<TASK-ID>.md`, the PLAN.md line stays unchecked, and Phase 1 plus any partial Phase 2 work is preserved verbatim.

**A park never performs the operator's motion.** The lone-park commit publishes the note this recipe already wrote. It does not make the verdict's PLAN.md edit, delete the tasknote, or flip Completed. Record what the operator should do on resume in the `park-reason:` prose or the tasknote body — the resuming operator takes it under a real gate.

**Why only when alone.** Any other path is Phase 2 work or a concurrent edit. Committing it under a park subject publishes unfinished work. Committing the note and leaving the rest still trips the next dispatch's foreign-dirt gate, and splits one park across two states. The failure this closes is a clean run whose only leftover is the untracked note.

**Resume is unchanged.** Re-invoking `<SKILL> <TASK-ID>` against the parked tasknote takes `SPEC/blocked.md`'s normal resume path: drift-check the parked work, flip `status:` back to `in-progress`, flip the chip back to `🟢 In progress`, **remove `park-reason:`**, and continue — at Phase 2, or at Phase 1 for a `model-mismatch` park, which was written before Phase 1 ran (`step-3c-resume-blocked.md`). A micro-shaped park resumes in micro mode whether or not `--micro` is passed (`micro-mode.md` §"Step 2").

## Conversion map

Six gates convert from *ask and wait* to *park and stop*. The seventh row is the mid-execution dependency park that predates the posture, listed here because the posture changes what the runner does about it. The eighth is the scope guardrail, a check rather than a gate (§"Scope guardrails").

| Gate | `park-reason` code | `/ft-task` | `/ft-task --loop` (where it differs) |
|---|---|---|---|
| Step 1.5 **concrete-model mismatch** STOP | `model-mismatch` | Step 1.5 — scaffold, then park; an existing starter/blocked note or sidequest stub stops, write nothing (see below) | same |
| 🛠️ Phase 1→2 **drift carve-out** (`Re-scope` / `De-scope`) | `drift` | Step 4 exit gate | same (one-time, pre-loop) |
| **Destructive-action escalation** 🗄️/▶️/📡/💻 | `destructive` | Step 5 Phase 2 | loop body (already parks — add the key) |
| ✋ `ACTION` that is a **prerequisite** for continuing | `prerequisite` | wherever it surfaces | wherever it surfaces |
| A queued **bundled in-📦 prompt** | `input-needed` | Step 6 | same |
| 👁️ `CONFIRM` **visual ask** | `visual-confirm` | Step 5 Phase 3 | the one-time post-loop ask |
| Hard dependency mid-execution *(pre-existing park)* | `dependency` | Step 5 Phase 2 | loop body |
| **Scope guardrail** — diff outside `touches:` or over 400 lines | `out-of-scope` | Step 5, before each Phase 3 entry and after Phase 4's doc-drift sweep | before each cycle's verify, and after the doc-drift sweep |

`--micro` takes the `/ft-task` column as-is: each gate sits at the same step (`micro-mode.md` §"Composition").

**The 👁️ trigger is the emission condition, not a second judgment.** Wherever the run would emit a 👁️ ask, park with `park-reason: visual-confirm — <what needs looking at, and where>` instead — settled after the External review, whatever order the mode's prose lists them in, so a confirmed basis can decide it first (§"Scope guardrails"). Whether the change needs a visual check at all is decided upstream, exactly where it always was: a task with no rendered surface records the Phase 3 box `N/A`, emits no ask, and never parks. Do **not** invent a gating-vs-corroborating split — "the tests probably cover it" is the judgment this conversion deletes, and **a passing visual baseline does not convert it either**: flaitron cannot tell an approved golden from an auto-minted one, and "does the baseline cover what I changed" is that same split renamed (`SPEC/gate-postures.md` §"Park conversions"). The one exception is a deciding spec the operator confirmed before dispatch (§"Scope guardrails" → "The deciding spec").

**`--loop`'s one-time ask.** Per-cycle 👁️ suppression inside the loop is unchanged — taste criteria were split out to the one-time post-loop ask (`step-5-loop-mode.md` §"Step 6"), so the loop never had an ask to convert (`SPEC/loop.md` §"Gate collapse"). It is that **one-time** ask that parks. A loop that converged is not a loop that finished: park before closure, and record the split-out criteria in the reason prose.

**The ✋ split is biased conservative — park on doubt.** An *advisory* ✋ is recorded and the run continues; only a **prerequisite** ✋ parks. "It is probably advisory" is exactly the doubt this bias exists to refuse: an over-park costs one resume, an under-park reaches closure with the prerequisite never performed.

**`drift` vs `dependency`.** The code names what *stopped* the run, not what motivated it. A `Re-scope` verdict parks as `drift` even when a dependency drove the verdict — and even though `--fast` alone would have downgraded it to an inline notice; that downgrade is a delegation the posture does not inherit.

**`--loop`'s loop body.** Its destructive-action carve-out (`step-5-loop-mode.md` §"Step 5") already parks without an operator, by construction. Under `--unattended` it writes `park-reason: destructive — …` alongside the `## 🔁 Iterations` entry, so a caller reading the file alone can classify the stop, and runs the lone-park commit before the stop. The `loop-max` **soft stop** is *not* a conversion — it hands back to the operator with the tasknote intact and unparked, exactly as `SPEC/loop.md` specifies.

## Scope guardrails

Contract: `SPEC/gate-postures.md` §"Scope guardrails". Every `/ft-task --unattended` run takes both checks, whatever its mode, at **Phase 3 entry** — each entry, re-entry after a review blocker included; under `--loop`, before each cycle's verify (`step-5-loop-mode.md` step 3) — and once more after Phase 4's doc-drift sweep, before its first closure flip. Each mode's Phase 3 hook points here; a new mode that replaces Phase 3 must add one. `/ft-close-epic` does not run them: its audit fixes are scoped by the audit, not by `touches:`.

**The diff** is this task's own, never another task's. `<paths>` are `git diff --no-renames --name-only HEAD`, `git ls-files --others --exclude-standard`, and under `--loop` each committed iteration's `git show --no-renames --name-only --pretty=format: <sha>` — so a loop resumed after unrelated commits landed still names only its own paths. `--no-renames` lists a rename's source too, so a move out of scope cannot hide behind its destination.

1. **Paths.** Each of `<paths>` matches the **scope** — the starter's `touches:` logged at promotion when there is one (`step-3a-promote-starter.md`), else the note's `touches:` — or is a workflow path: `.flaitron/PLAN.md`, `.flaitron/PLAN-ARCHIVE.md`, this note at `.flaitron/tasknote/<TASK-ID>.md` or its archive path, a note or stub that this run's `/ft-file-task` filing created under `.flaitron/tasknote/` or `.flaitron/sidequest/`, or the deletion of `.flaitron/sidequest/<TASK-ID>.md` on promotion. Any other tasknote or stub, archived history included, is out of scope. An entry is an exact path, a directory ending `/` (everything beneath it), or a glob in git pathspec `:(glob)` semantics — `*` stops at `/`, `**` crosses it. No scope → workflow paths only.
2. **Size.** Sum added + deleted from `git diff --no-renames --numstat HEAD`, under `--loop` plus each committed iteration's `git show --no-renames --numstat --pretty=format: <sha>` (never a range, so foreign commits never count; a hunk rewritten across cycles counts each time — conservative, an over-park costs one resume), plus `git diff --no-index --numstat /dev/null <path>` for each untracked path (it exits 1 whenever the file is non-empty; that is expected, not a failure). A `-` (binary) counts 0, though its path still faces step 1. Skip lockfiles, matched on the file's basename at any depth (`*.lock`, `*.lockb`, `*.lock.json`, `*-lock.json`, `*-lock.yaml`, `npm-shrinkwrap.json`, `go.sum`), any path `git check-attr linguist-generated -- <path>` reports `set` or `true`, and everything under `.flaitron/`. Over 400 fails.
3. **On a miss**, if the 👁️ box already reads `decided by` (a miss at the post-sweep check), untick it and strike that line first — it asserted a confinement this check just disproved. Then park (§"The park recipe") with `park-reason: out-of-scope — <the stray paths, or N lines against the 400 cap>`. The park recipe's own porcelain read decides whether the note commits.

Never revert work, trim it, or edit `touches:` to get past a check — the stop is the report. **`touches:` is fixed at Phase 1 exit.** On a note promoted from a starter, Phase 1 may drop paths from the logged list but never add one; a path the work needs outside it is a `Re-scope`, which parks `drift` (§"Conversion map"). The path check reads the logged list, so a widened frontmatter cannot pass it.

**The doc-drift sweep stays in scope.** Phase 4's sweep edits an AI-referenced doc only when its path matches the scope (step 1's entry matching) and the edit keeps the size check clear. It never edits any other drift. That entry reads `drift — <the update it needs>`, and every such entry goes into **one** `/ft-file-task --unattended` filing (the default flow; `--park` refuses the flag). Run it at Step 6 once the closure paths are staged, so the row rides the atomic closure commit (`/ft-file-task` Step 4) and never commits on its own. The row names the docs and points at this note's archive path (`.flaitron/tasknote/archive/<area>/<TASK-ID>.md`) for the updates, which keeps it under the 70-word cap. Then append `; filed <ID>` after each entry's update text and re-stage the note. The row lands in `.flaitron/PLAN.md`, a workflow path, so closure proceeds on work already green, and the post-sweep check still runs as the backstop. If the filing stops, mark each entry `unfiled (<stop cause>)`, name the docs in the recap, and close anyway. The archived note keeps the record, and an unfiled follow-up costs less than parking finished work uncommitted. Attended runs edit as before, and the recap's scope line reports the edit.

**The deciding spec.** Promotion logs the starter's readiness basis as read then (`step-3a-promote-starter.md`), before the starter block is absorbed. At the Phase 3 👁️ item — always after the External review, whatever the mode — tick the box with `decided by <command(s)> — basis confirmed <starter created: date>` (promotion keeps the starter's `created:`) and emit no ask only when **all** hold: the PLAN.md row carries `[unattended]` (the operator's mark is what confirms the starter's basis for dispatch); the log reads `complete` with (d) commands; every logged (d) command shows `→ 0` in this run's receipt; both checks above are clear; and the External review graded the diff against the logged (d) wording, never `N/A` — a spec weaker than its stated (d) assertion is a verify command that passed without deciding it, which that review blocks. Otherwise park `visual-confirm` as the map says. Under `--loop` the same line goes on the 👁️ box at the post-loop step (`step-5-loop-mode.md` §"Step 6"). An attended run never writes the line, `[unattended]` row or not: it asserts confinement, which only these checks enforce, and a present operator owns the look. Only the logged (d) commands decide: a criterion Phase 1 added, a spec the run chose, a baseline, or a screenshot receipt decides nothing (`docs/GATE-DISCIPLINE.md` §"Refused carve-outs").

## Pre-scaffold stops

The pre-flight checks and the Step 1.5 model gate run before this run has written a tasknote (the skill/pin guard, last below, is the one stop that can also fire later), so a "park" there may have nothing to park — or may find a note it must not touch. Split by what the stop is *about*:

- **Concrete-model mismatch — scaffold, then park.** A task-level assignment problem, and the tree is known clean (the foreign-dirt gate already passed). Skip the AskUserQuestion two-path offer. **Create the note only when none exists** — neither a tasknote nor a `.flaitron/sidequest/<TASK-ID>.md` stub — then write the tasknote (from the template the run's flags select — the micro template under `--micro`) with `status: blocked` and `park-reason: model-mismatch — PLAN.md tags [<tag>], active model is <model>`, then the lone-park commit and the park marker, and halt. The caller gets the same readable stop surface it gets everywhere else. An existing `starter` or `blocked` note or a sidequest stub is **left untouched** — terminate and write nothing, in the `⏸ --unattended stop — model-mismatch: …` shape, naming the existing starter note, blocked note, or sidequest stub, so its promote or resume routing survives and the stub is retired by the attended promotion that reads it. Do **not** retag the PLAN.md line autonomously.
- **Foreign-dirt gate — terminate, write nothing.** Writing a new untracked file into a tree the paper-complete guard has just refused to touch makes that file its own foreign dirt on the next invocation — a self-blocking loop. Emit the marker, then the paths, then the caller-facing line, and stop:

  ```markdown
  🚧 DIRTY — commit, stash, or discard first:
  <one porcelain path per line>

  ⏸ --unattended stop — foreign-dirt: <N> uncommitted path(s). No tasknote written; commit, stash, or discard, then re-invoke.
  ```

  Never stash, clean, or commit them. Write nothing.
- **`## Completed` status gate and archive collision — terminate, write nothing.** Both mean a tasknote for this ID already exists; there is nothing new to park, and scaffolding one would duplicate it. Same `⏸ --unattended stop — <cause>: …` shape.
- **Open-siblings audit — terminate, write nothing.** A `.N` audit ID runs after every other child of its epic (`SPEC/unattended-candidacy.md` clause 6), and a run while one is open would park on drift. That parked note then dirties the tree for the next dispatch. At its hook in `preamble.md` §"Pre-flight", find the parent `<AREA>-EPIC-<N>` and every `<AREA>-<N>.<sub>` row anywhere in PLAN.md (nested or not). If any such row other than this `.N` is `- [ ]`, stop with `⏸ --unattended stop — open-siblings: <open child IDs>. No tasknote written.` A parent line that is missing, `- [x]`, or under `## Completed` stops the same way, with cause `no-parent` or `parent-closed`. This is `/ft-close-epic`'s Step 2 bail, read at run time like that one. Unlike CORE-736's admission-time clause-6 gate, it therefore also catches siblings filed or dispatched after `.N` was marked. A legacy numeric audit is not detected here and stays unguarded at run time — a runner cannot tell it from the last implementation child.
- **An existing in-flight tasknote** (`status:` `not-started` / `in-progress` / `completed`, or unrecognized) — the runner refuses this in Pre-flight, ahead of the model gate, and recommends continuing conversationally. Unchanged; report it in the same stop shape and write nothing.
- **Skill/pin guard — stop, never park.** It usually fires before any write, and can also fire later, when a lazily read file is absent. Either way the body and the pin disagree, so a park would be a further write the guard forbids, and a resume through the same body would hit the same stop. The guard paragraph in each body emits `⏸ --unattended stop — skill-pin-mismatch: <base directory or missing path>; wrote <paths, or nothing>.` itself, because the guard paragraph owns the stop, and halts. Never revert or commit in response; the stop line names what this run wrote, marking any path it already committed. No `park-reason:` code; the fix (remove the agent-home copy, or bump the pin) is the operator's.

## What `--unattended` never relaxes

`SPEC.md` §"Paper-complete guard" holds in full — all three parts, with no unattended variant:

1. **Foreign-dirt gate.** Emit `DIRTY` and the paths, then the machine-readable stop; never stash, clean, or commit that dirt, and write nothing. The lone-park commit is not this commit.
2. **Atomic single-commit closure.** Deliverables + PLAN flip + archive move land together or not at all.
3. **🏁 only with a deliverable-covering SHA.** Verify with `git show --name-only`; never invent a SHA. No operator watching is a reason to hold this line harder, not to relax it.

Nor does it keep **Phase 3's targeted default**. Run the repo's **full validation set**, never the targeted default: when the justfile defines any of `check` / `test` / `lint` / `typecheck`, `just check` if defined plus each other one it defines that `check` does not reach (`just --show check`, followed through its dependencies), else the validation commands the repo's `AGENTS.md` / `CLAUDE.md` names, else the steps its CI workflow runs — in that discovery order, and record each as `command → exit code` in the receipt exactly as the targeted commands would be. A red is Phase 2 evidence, not a closure question: a failure this diff caused sends the run back to Phase 2; a red the run cannot make green parks with `park-reason: input-needed — full suite red on <first failing command>, not caused by this diff; may closure proceed over it?` (rephrase so the prose carries no `: `; `drift` and `input-needed` prose ends with the operator's question — `SPEC/blocked.md` §"Park reason"), then the lone-park commit, never a close over it. A repo with no validation set records `N/A — no validation set declared`. `--fast` alone and the `[unattended]` row marker keep the attended targeted default. Contract: `SPEC/gate-postures.md` §"What `--unattended` never relaxes".

Nor does it relax **Phase 3's External review**. `/ft-task` runs it as its `SKILL.md` Phase 3 says, scoped to this run's own diff; a blocker the run cannot fix parks `park-reason: input-needed — <the blocker, and the question it puts>` and runs the lone-park commit rather than closing over it. Contract: `SPEC/gate-postures.md` §"What `--unattended` never relaxes".

Nor does it relax the **downstream-impact reconciliation** user-confirm, which guards plan correctness rather than pacing: with no operator to confirm, a direction-changing decision that reaches beyond the current task is a `Re-scope`, and `Re-scope` parks as `drift`.

Nor does it relax **[`SPEC.md`](../../../SPEC.md) §"Deferred hand-off filing"** — the duty to file a deferred real-world operator step as its own unchecked PLAN.md row. The posture *raises* the volume of deferred steps rather than lowering it: whatever an operator-less run could not do falls to the absent operator, and prose in a Recap or a `## 🔄 Handoff` hides it from every future reader. A run that reaches closure discharges it through `/ft-file-task --unattended`, whose filing commit is authorized by the duty itself ([`SPEC/plan-filing.md`](../../../SPEC/plan-filing.md) §"Filing commits" → "Unattended filing authority"). That filing report carries an `unattended-candidates:` line — the rows its predicate admitted for `[unattended]`, or `none` — and the closure **copies it verbatim into its own tasknote's Final Summary** before the archive move: a pre-archive closure write, so the resuming operator finds the candidates where they find the deferred rows (mirror of `SPEC/unattended-candidacy.md` §"Persistence"). The runner writes no token itself — it is not a filer, and the line names rows an operator may later mark. A run that *parks* files nothing — a park is paused, not closed, and its `park-reason:` already records what the operator must take up on resume.

`--unattended` removes *pauses*, never *proof*.

## `/ft-close-epic`

The epic-close skill accepts the flag on its own terms (`SPEC/gate-postures.md`
§"`/ft-close-epic` under the posture"). What it shares with `/ft-task`:

- **The park recipe** — used once, at its Step 4 Phase 1→2 exit gate. It runs
  the `default-fire-on-clarifications` flavor, so a clarification it cannot
  answer parks as `input-needed`; a `Re-scope` / `De-scope` verdict parks as
  `drift`. The audit tasknote exists by then, so the park recipe applies,
  lone-park commit included.
- **The pre-scaffold stop shape** — every Step 1-2 bail terminates and writes
  nothing, including the open-siblings ask (whose own default is already
  "bail", so it is taken deterministically rather than asked).
- **The never-relaxed list, in full.** The audit commit is a real commit.

What differs: it is **not a `--fast` superset** — nothing to inherit. Its
parent flip is not a question and runs as attended
(`SPEC/plan-filing.md` §"Epic parent flip").

`/ft-open-epic` does not accept the flag at all.
