---
name: ft-adopt
description: "Bootstrap a fresh project with Flaitron from Codex: submodule, PLAN, tasknote README, AGENTS.md block, and wiring."
---

# ft-adopt - Codex wrapper

Read and follow `../../../claude/skills/ft-adopt/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules".

This invocation selects Codex unless the operator explicitly chooses another
surface. When Codex is selected, read `../../reconcile-skills.md` before the source's Step 2; execute
its inline block at Step 3 against the selected pin's Codex snippet, creating
an absent `.agents/skills`. Derive Step 7 staging from its net-path selector
and Step 8 verification from that same pinned roster. Stop on conflicts.
Keep the agent-neutral `AGENTS.md` block
from the canonical Claude snippet. Codex reads `AGENTS.md` directly: perform
Step 3b's Claude settings rule and Step 4's `CLAUDE.md` wiring only when the
project also uses Claude Code, preserving existing files. The root `.ignore`
fence still applies; retain the source's conditional Cursor fence.
