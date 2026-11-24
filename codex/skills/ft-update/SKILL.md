---
name: ft-update
description: Bump an adopter project's pinned flaitron submodule from Codex and reconcile its skills, including repair at the same version.
---

# ft-update - Codex wrapper

Read and follow `../../../claude/skills/ft-update/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules".

This invocation selects Codex unless the operator explicitly chooses another
surface. When Codex is selected or its root is already present, read
`../../reconcile-skills.md` before any checkout. At source
Step 1, run its block against the **current pin**, even if `.agents/skills`
is absent **and selected**; do this before fetching or returning at the same version. After
an approved bump, source Step 3.5 owns the order, including where this block
runs against the new pin, and the undo on failure. Source Step 2's read-only
roster check runs before the bump ask. Preserve other
platform selection, use the net-path selector for staging, and stop on conflicts.
