---
description: Start and complete a flaitron micro-tasknote in one shot for tasks above the skip threshold but below the full 4-phase ceremony.
argument-hint: <TASK-ID> [--fast | -f] [--unattended]
---

Invoke the `ft-micro-task` skill with `args="$ARGUMENTS"`. The skill validates the task ID against PLAN.md, scaffolds `.flaitron/tasknote/$ARGUMENTS.md` from `templates/tasknote-micro-template.md`, drives execution inline (relevance · drift · archive skim · pattern survey · implementation), recaps, flips PLAN.md, and archives the tasknote — single conversation flow. See SPEC/tasknote-selection.md §"When to use a tasknote (and when not to)" for the micro carve-out threshold.

If `$ARGUMENTS` is empty, ask the user for a task ID before invoking the skill.

Usage:

- `/ft-micro-task <TASK-ID>` — default flow with the conditional commit-go ask per `SPEC/gates.md` §"Conditional skip rule" (fires when the closure diff trips signal rules).
- `/ft-micro-task <TASK-ID> --fast` (or `-f`) — operator opt-in: forces the Skip branch at Step 5 regardless of signal trips (autonomous commit). Sibling of `/ft-task --fast`; same flag, narrower surface (`/ft-micro-task` has no banner gates).
- `/ft-micro-task <TASK-ID> --unattended` — operator-less posture, superseding `--fast`'s autonomy (never pass both; the 👁️ surface it declines to inherit does not exist on this skill). Adds parking: a `Re-scope`/`De-scope` verdict, a destructive-action escalation, a prerequisite ✋ ACTION, the Step 1.5 concrete-model STOP, and a queued commit-go question each flip the tasknote to `status: blocked` with a `park-reason:` code and stop, rather than asking. A mid-execution hard dependency parks too, recording promote-to-`/ft-task` as a resume instruction instead of re-filing autonomously. The paper-complete guard is not suppressed.

For full 4-phase tasks, use `/ft-task <TASK-ID>`. For lightweight follow-up filings, use `/ft-file-followup [TASK-ID]` (no tasknote artifact; `--starter` files a rich-context starter for work not ready to start). For opening a new epic, use `/ft-epic-discovery`. For closing one, use `/ft-close-epic`. For bootstrapping a fresh repo with flaitron, use `/ft-new-project`.
