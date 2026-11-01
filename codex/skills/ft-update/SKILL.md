---
name: ft-update
description: Bump an adopter project's pinned Flaitron submodule from Codex and reconcile its skills, including repair at the same version.
---

# ft-update - Codex wrapper

Read and follow `../../../claude/skills/ft-update/SKILL.md`, applying the Codex translation rules in `../../AGENTS-snippet.md` §"Translation rules".

This invocation selects Codex unless the operator explicitly chooses another
surface. When Codex is selected or its root is already present, read
`../../reconcile-skills.md` before any checkout. At source
Step 1, run its block against the **current pin**, even if `.agents/skills`
is absent **and selected**; do this before fetching or returning at the same version. After
an approved bump, follow Step 3.5's sequence as written: the tracked
dangling-link prune, this block against the new pin, the pin-line and
Workflow writes, Step 4's rules for every other present surface, and the
removal of Step 1 links the target cannot back; any failure undoes the bump
per Step 3.5. Source Step 2's read-only roster check runs before the bump
ask. Preserve other
platform selection, use the net-path selector for staging, and stop on conflicts.
