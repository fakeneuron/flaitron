---
description: Close an epic by scaffolding and driving its audit `.N` tasknote, whose closure flips the parent `<AREA>-EPIC-<N>` to `Completed`. Pre-fills the audit tasknote with the fixed doc-drift sweep acceptance line per `SPEC/epic.md`.
argument-hint: <AUDIT-SUBTASK-ID> [--unattended]
---

Invoke the `ft-close-epic` skill with the audit subtask ID (e.g., `/ft-close-epic CORE-057.N`; legacy numeric audit IDs like `CORE-057.6` are also accepted). The skill verifies cwd is a flaitron-using project, parses the arg as `<AREA>-<NUMBER>.<SUB>`, walks `.flaitron/PLAN.md` to confirm the ID is the parent epic's audit child — the reserved `.N` suffix (canonical) or the highest numeric `.<SUB>` (legacy) — and hard-bails otherwise, warns-and-proceeds-on-user-confirm if any sibling implementation children are still open, scaffolds the audit tasknote with the fixed doc-drift sweep Acceptance line + parameterized cohort-coherence Subtasks, drives the full 4-phase audit inline through closure. When every child is then `[x]`, the closure commit also flips the parent line and moves the cohort to `## Completed`, with no prompt.

Add `--unattended` (its only flag — there is no `--fast` here) when no operator is present: gates that cannot be answered park or terminate with a machine-readable reason, and the `.N` audit still closes and commits atomically, parent flip included.

Bracket twin of `/ft-epic-discovery` (which opens an epic). For starting an existing standalone PLAN.md entry, use `/ft-task <TASK-ID>`. Audit-surfaced misses are filed as open child rows in the audit's own closure commit, which keeps the parent open. For other mid-flow follow-up filings, use `/ft-file-followup [TASK-ID]` (`--starter` for a starter tasknote). For micro tasks, use `/ft-micro-task <TASK-ID>`. For bootstrapping a fresh repo with flaitron, use `/ft-new-project`.
