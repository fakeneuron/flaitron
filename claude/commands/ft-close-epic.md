---
description: Close an epic by scaffolding and driving its audit `.N` tasknote, then prompting to flip the parent `<AREA>-EPIC-<N>` to `Completed`. Pre-fills the audit tasknote with the fixed doc-drift sweep acceptance line per `SPEC/epic.md`.
argument-hint: <AUDIT-SUBTASK-ID> [--unattended]
---

Invoke the `ft-close-epic` skill with the audit subtask ID (e.g., `/ft-close-epic CORE-057.N`; legacy numeric audit IDs like `CORE-057.6` are also accepted). The skill verifies cwd is a flaitron-using project, parses the arg as `<AREA>-<NUMBER>.<SUB>`, walks `.flaitron/PLAN.md` to confirm the ID is the parent epic's audit child — the reserved `.N` suffix (canonical) or the highest numeric `.<SUB>` (legacy) — and hard-bails otherwise, warns-and-proceeds-on-user-confirm if any sibling implementation children are still open, scaffolds the audit tasknote with the fixed doc-drift sweep Acceptance line + parameterized cohort-coherence Subtasks, drives the full 4-phase audit inline through closure, then surfaces parent-epic state and asks the user whether to flip the parent line + move the cohort to `## Completed` (default Yes).

Add `--unattended` (its only flag — there is no `--fast` here) when no operator is present: gates that cannot be answered park or terminate with a machine-readable reason, the `.N` audit still closes and commits atomically, and the parent-flip is **deferred** rather than auto-approved — the parent line stays open, the cohort stays nested, and the run reports the pending flip.

Bracket twin of `/ft-epic-discovery` (which opens an epic). For starting an existing standalone PLAN.md entry, use `/ft-task <TASK-ID>`. For mid-flow follow-up filings (typical: audit-surfaced misses), use `/ft-file-followup [TASK-ID]` (`--starter` for a starter tasknote). For micro tasks, use `/ft-micro-task <TASK-ID>`. For bootstrapping a fresh repo with flaitron, use `/ft-new-project`.
