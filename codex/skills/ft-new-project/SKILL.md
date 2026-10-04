---
name: ft-new-project
description: "Bootstrap a fresh project with Flaitron from Codex: submodule, PLAN, tasknote README, AGENTS.md block, and wiring."
---

# ft-new-project - Codex wrapper

Read and follow `../../../claude/skills/ft-new-project/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules".

For Codex bootstrap, use `../../../codex/AGENTS-snippet.md` §"One-time skill
wiring" instead of the source's Claude wiring block at Step 3. Derive the
Step 7 staging set and Step 8 symlink verification from that same Codex block;
do not create Claude command stubs. Keep the agent-neutral `AGENTS.md` block
from the canonical Claude snippet. Codex reads `AGENTS.md` directly: perform
Step 3b's Claude settings rule and Step 4's `CLAUDE.md` wiring only when the
project also uses Claude Code, preserving existing files. The root `.ignore`
fence still applies; retain the source's conditional Cursor fence.
