---
description: Start a flaitron tasknote for the given task ID and drive it through the SPEC's 4-phase workflow. With `--debug`, adds a hypothesis-first cadence for bugs and unexpected behavior. With `--loop`, iterates Phase 2↔3 until a machine-checkable Acceptance check passes. With `--fast`, suppresses the conditional gates. With `--unattended`, runs the operator-less posture — gates park the tasknote instead of firing a banner.
argument-hint: <TASK-ID> [--debug | -d] [--loop] [--fast | -f] [--unattended]
---

Invoke the `ft-task` skill with `args="$ARGUMENTS"`. The skill scaffolds `.flaitron/tasknote/$ARGUMENTS.md` from the flaitron template, runs Phase 1 Discovery, and continues through phases 2-4 plus the post-closure protocol.

If `$ARGUMENTS` is empty, ask the user for a task ID before invoking the skill.

Usage:

- `/ft-task <TASK-ID>` — default flow; the 🛠️ and 📦 gates are conditional per `SPEC/gates.md` §"Operator-gate cues".
- `/ft-task <TASK-ID> --fast` (or `-f`) — operator present but not to be asked: 📦 forced to Skip, the 👁️ visual ask delegated to the operator, Re-scope downgraded to an inline ⚠️ notice. Also implied by an `[unattended]` marker on the task's PLAN.md row. Contract: `SPEC/gate-postures.md` §"`--fast` operator override".
- `/ft-task <TASK-ID> --debug` (or `-d`) — hypothesis-first cadence for bugs: four Phase 1 prompts and a Phase 3 repro re-verify; guidance, not a gate. Skip it when the root cause is already known.
- `/ft-task <TASK-ID> --loop` — converge-until-a-check-passes: every Acceptance criterion machine-checkable, Phase 2↔3 iterated under `SPEC/loop.md` with commit-per-verified-iteration. Not for one-pass work.
- `/ft-task <TASK-ID> --unattended` — nobody present to answer a gate: supersets `--fast`'s autonomy (never pass both), and the gates it cannot answer park the tasknote (`status: blocked` + `park-reason:`) instead of asking. Resume by re-invoking with an operator present. Contract: `SPEC/gate-postures.md` §"`--unattended` operator posture".

The flags are orthogonal and compose in any order; the skill's Step 0 defines each mode.

For small file + execute one-shots, use `/ft-micro-task <TASK-ID>`. For lightweight follow-up filings, use `/ft-file-followup [TASK-ID]` (no tasknote artifact; `--starter` files a rich-context starter instead). For opening a new epic, use `/ft-epic-discovery`. For closing one, use `/ft-close-epic`. For bootstrapping a fresh repo with flaitron, use `/ft-new-project`.
