---
name: ft-task
description: Start or promote a Flaitron tasknote from Codex and drive the 4-phase workflow through closure. With `--debug`, drive it hypothesis-first for a bug or regression. With `--loop`, run Phase 2/3 as an inline execute-verify loop against machine-checkable acceptance. With `--fast`, suppress conditional gates and commit autonomously. With `--unattended`, run with no operator present, parking at gates instead of asking.
---

# ft-task - Codex wrapper

Read and follow `../../../SPEC/procedures/ft-task.md` first. It is the agent-neutral execution SOP for this workflow.

If the SOP does not cover a needed edge case, read `../../../claude/skills/ft-task/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules" — plus one rule specific to this wrapper: load lazy fragments from `../../../claude/skills/ft-task/` only when the source dispatch says they apply.
