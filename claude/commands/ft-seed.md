---
description: Seed `[unattended]` onto an existing PLAN.md in one attended pass — walk every open row with the candidacy predicate, confirm per row inside one review gate, write only the confirmed rows, commit. No args, no flags.
---

Invoke the `ft-seed` skill. The skill reads `SPEC/unattended-candidacy.md`, walks every open row in the four active sections of `.flaitron/PLAN.md` with its candidacy predicate (skipping rows already marked and rows carrying `[handoff]`), shows the candidates with `[unattended]` in place inside one prose review gate, writes the token only on the rows you keep — after `[model]`, every other byte verbatim — and commits the write under the filing-commit contract. Flaitron never writes the marker on its own discretion; your reply at the gate is the act.

Takes no arguments — run `/ft-seed` from the project root.

This is the bulk counterpart to the per-row candidacy every filing skill proposes at its own write step. For starting a seeded row, use `/ft-task <TASK-ID>`.
