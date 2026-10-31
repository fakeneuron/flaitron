---
title: Codex reconcile block fails under zsh and the NAT-195 path guard
status: starter
tags: [codex, ft-update, ft-adopt, portability]
created: 2026-10-31
touches:
  - codex/reconcile-skills.md
---

# CORE-849 | Codex reconcile block fails under zsh and the NAT-195 path guard

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-31)

## 🌱 Starter context

_Captured 2026-10-31 during a repair-only `/ft-update` run in the fakeneuron adopter (pin v8.1.0, Claude Code on macOS) — promote to full tasknote at `/ft-task` checkout._

### Why this exists

`/ft-update` Step 1/4 runs the shell block in `codex/reconcile-skills.md`
inline. In the fakeneuron adopter it could not run as written, for two
independent reasons. Neither was a wiring problem: all 7 `.agents/skills`
links were already correct.

1. **zsh word-splitting.** The block is POSIX sh, but Claude Code's Bash tool
   ran it in the user's shell (zsh). zsh does not word-split unquoted
   `$ft_slugs`, so `for ft_slug in $ft_slugs` iterates once over the whole
   newline-joined roster. The body check then fails closed with a false
   `CONFLICT missing pinned body: ft-close-epic\nft-file-task…` and exits 1
   before any link work. The same applies to `for ft_slug in $ft_retired`.
   Any zsh-default host (macOS) hits this.
2. **Path-access guard false positives (natabula NAT-195, frozen NAT-401).**
   The operator's PreToolUse hook rejects the command text before it runs:
   - awk's match operator `$NF ~ /^\.agents\/skills\/…/` — `~ /` is read
     as a home-directory path ("references `/Users/<user>`").
   - the literal symlink target `../../$ft_dir/codex/skills/…` — read as a
     path outside the repo.
   The guard is frozen and not widened for one-off spellings; its own
   message says to reword.

Workaround that ran clean (exit 0, all KEPT, no retired leftovers) under the
guard: wrap the block in `sh <<'EOF' … EOF`, replace `$NF ~ /re/` with
`match($NF, /re/)`, and build the target as `up=..; "$up/$up/$ft_dir/…"`.

Investigate before fixing: confirm both causes reproduce outside fakeneuron,
and decide which belong in flaitron vs. the operator's guard.

### Solution shape

- Make the block shell-independent: an explicit `sh` invocation in the
  procedure text (heredoc or `sh -c`), or rewrite the loops to avoid
  unquoted word-splitting (`printf … | while IFS= read -r`).
- Prefer `match()` over `~` in the awk filters — semantically equal, no
  guard-tripping token.
- Decide whether to avoid the literal `../../` target (variable-built
  parent) or leave it and document the guard interaction.
- Check sibling inline blocks for the same patterns — the Step 4.5/4.6
  snippets in `claude/skills/ft-update/SKILL.md`, `/ft-adopt`'s Codex
  path, and the Claude/Cursor/Grok `ln -s` snippets (which also carry
  `../../`).

### Files to touch (preliminary survey — drift-check at promotion)

- `codex/reconcile-skills.md` — both shell blocks.
- `claude/skills/ft-update/SKILL.md` — maybe: wording on how to invoke the block.
- `claude/skills/ft-adopt/SKILL.md` — maybe, if it inlines the same block.

### Explicitly out of scope

- Changing the NAT-195 guard — frozen under NAT-401 in natabula, owned by
  the operator.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Filing shape | Starter, investigation first | Operator asked to file for investigation, not fix directly |

### Open at promotion (Phase 1 should resolve)

- Is the zsh failure reproducible on Codex itself, or only when Claude Code runs the block? Lean: any agent whose shell tool uses the login shell.
- Should flaitron accommodate an adopter-side guard at all? Lean: yes for zero-cost spellings (`match()`); the `sh` wrapper is a portability fix regardless.
- Do drift checks or the reconcile tests need a zsh run? Lean: a check that the block passes `zsh -c` would have caught cause 1.

### Related

- fakeneuron `/ft-update` repair run 2026-10-31 — where this surfaced (pin v8.1.0, wiring unchanged).
