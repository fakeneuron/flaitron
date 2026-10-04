---
name: ft-new-project
description: Bootstrap a fresh ~/code/ project with flaitron — adds the submodule, wires /ft-task, drops in PLAN.md + tasknote README, creates/patches AGENTS.md, and stages the commit. Use when the user asks to bootstrap or adopt flaitron into a new project. Mirrors docs/MIGRATION.md §1 conversationally; for fresh adoption only.
---

# new-project — flaitron adoption skill

You are bootstrapping flaitron into a fresh project. The full procedural reference lives in flaitron's `docs/MIGRATION.md` §1 — this skill is the executable interpretation, not a replacement. Treat MIGRATION.md as authoritative when this file is silent or in tension.

This skill is **fresh-adoption only** — Step 0 detects prior workflow tooling at the project root and bails with a pointer at `docs/MIGRATION.md` §3 (lightweight, active-queue-only — the typical case) or §2 (heavier path that preserves task-ID continuity). Both paths involve judgment calls that don't fit a recipe.

## Step 0 — Verify preconditions

The skill operates on the current working directory. Before doing anything:

- `.git/` exists (cwd is a git repo). If not, stop and tell the user to `git init` first.
- `AGENTS.md` or `CLAUDE.md` exists in cwd. If neither is present, stop and ask the user to create one before proceeding — this is a project-validity check (signals an AI-coding project); the flaitron paste-block itself lands in `AGENTS.md` (created in Step 4 if missing).
- None of the following exist (their presence means flaitron is already adopted):
  - `.flaitron/core/`
  - `.flaitron/PLAN.md`
  - `.claude/commands/ft-task.md`
  - `.claude/skills/ft-task`

  If any are present, stop. Surface what's already there and ask whether the user meant to bump the pinned version (see `docs/MIGRATION.md` §"Pinning and bumping") instead of bootstrapping fresh.

- None of the following exist at the project root (their presence means a legacy workflow system is in place — flaitron would conflict, e.g. a root `PLAN.md` collides with `.flaitron/PLAN.md`):
  - `PLAN.md`
  - `plan.json`
  - `WORKFLOW.md`

  If any are present, stop. Surface what's there and point the user at `docs/MIGRATION.md` §3 (lightweight migration: lift the active queue only, freeze legacy as read-only — the typical case) or §2 (heavier path that preserves task-ID continuity across the full archive). Do not bootstrap alongside legacy.

If any precondition fails, do not modify any files.

## Step 1 — Collect inputs

Use AskUserQuestion to gather:

1. **Project name** — default suggestion: cwd basename (e.g., `~/code/flowmagic` → `flowmagic`). Used to substitute the `# Project Name — PLAN.md` placeholder in `templates/PLAN.md`.
2. **Pinned flaitron version** — default suggestion: latest semver tag from `git ls-remote --tags --sort=-v:refname https://github.com/fakeneuron/flaitron.git | head -n1 | sed 's|.*/||'`. User can accept, override, or pin to `main` for unstable tracking (warn before doing so — the bump-tasknote / annotated-tag-message contract assumes a tag).

Record both before proceeding. If the user picks `main`, set the variable but skip the `git -C .flaitron/core checkout vX.Y.Z` step in Step 2.

## Step 2 — Add the submodule

From cwd:

```sh
mkdir -p .flaitron
git submodule add https://github.com/fakeneuron/flaitron.git .flaitron/core
git -C .flaitron/core checkout vX.Y.Z   # use the pinned version from Step 1
```

The `checkout` step is what pins the project to a specific flaitron commit. Skip it only if the user explicitly chose `main` in Step 1.

Reference: `docs/MIGRATION.md` §1.1.

## Step 3 — Wire the adopter skill subset via symlinks

Read `.flaitron/core/claude/AGENTS-snippet.md` and run the bash block under the §"One-time symlink wiring" heading from the project root. That block is the single source of truth for which skills an adopter installs — this skill never restates the roster, so it cannot drift from it. Run it verbatim — relative paths are intentional (they survive `git clone` and pin to whichever flaitron commit the submodule is checked out at). Do not substitute absolute paths.

**Cursor note:** Cursor loads `.claude/skills/` as a documented compatibility surface, so this Claude wiring already serves Cursor sessions. For a Cursor-only project (no `.claude/`), follow `.flaitron/core/cursor/AGENTS-snippet.md` §"One-time symlink wiring" instead — see `docs/MIGRATION.md` §1.2.

**Grok note:** Grok loads `.claude/skills/`, `.agents/skills/`, and `.cursor/skills/` as documented compatibility surfaces, so this Claude wiring already serves Grok sessions. For a Grok-only project (no `.claude/`, no `.agents/skills/`, no `.cursor/skills/`), follow `.flaitron/core/grok/AGENTS-snippet.md` §"One-time symlink wiring" instead — see `docs/MIGRATION.md` §1.2.

Reference: `claude/AGENTS-snippet.md` §"One-time symlink wiring" (canonical) · `cursor/AGENTS-snippet.md` (Cursor-only variant) · `grok/AGENTS-snippet.md` (Grok-only variant) · `docs/MIGRATION.md` §1.2 (adopter doc, points to the snippets).

## Step 3b — Fence the submodule's dogfood archive

`.flaitron/core/.flaitron/` is flaitron's own plan and tasknote archive (~14 MB, ~1,000 files) — flaitron's history, not this project's context. Keep it out of search and context tooling now, before the first session greps into it:

1. `.claude/settings.json` — add `Read(./.flaitron/core/.flaitron/**)` to `permissions.deny`. Create the file with just that key if it is absent; if it exists, merge the rule into the existing `deny` array and change nothing else. Claude Code applies the rule to its file tools, Grep/Glob, and `@file` mentions.
2. `.ignore` at the project root — append the line `.flaitron/core/.flaitron/` (create if absent). Covers ripgrep-based greps; `.gitignore` is the wrong file, the path is tracked content.
3. `.cursorignore` — the same line, when the file already exists or the project is Cursor-only (Step 3's Cursor note). Otherwise skip.

Tell the user the deny rule's one cost: it also fences the per-release tasknote `docs/MIGRATION.md` §"Pinning and bumping" names for major bumps; the annotated tag message (`git -C .flaitron/core show vX.Y.Z`) stays readable.

Reference: `docs/MIGRATION.md` §1.1.

## Step 4 — Create or patch AGENTS.md

Read `.flaitron/core/claude/AGENTS-snippet.md` and extract the markdown block under the "Block to paste into AGENTS.md" heading (the fenced ```markdown ... ``` block). If `AGENTS.md` doesn't exist in the project root, create it with the block's *contents* (without the outer fences) as initial content. If it exists, append the contents at the end of the file — do not overwrite or insert mid-file (project-specific instructions in `AGENTS.md` must be preserved).

**Then make sure the block will load.** A contract in a file the session never reads fails silently, so wire the Claude Code entry point now rather than leaving it to the Step 8 hand-off. Branch on what's at the project root:

- **No `CLAUDE.md`** — create the compatibility symlink; it is one file deep and relative, so it survives `git clone`:

  ```sh
  ln -s AGENTS.md CLAUDE.md
  ```

- **`CLAUDE.md` is already a symlink to `AGENTS.md`** — nothing to do.

- **`CLAUDE.md` is a real file** (the Step 1 precondition accepts this) — do **not** replace it; it holds the project's Claude-only directives. Offer to append a single `@AGENTS.md` import line to it, and say why. If the user declines, note in the Step 8 hand-off that `AGENTS.md` may not be loaded and point at `docs/MIGRATION.md` §1.3's verification.

Never paste the workflow block into `CLAUDE.md` as a second copy — two copies of the contract drift apart. `AGENTS.md` stays the single source.

Reference: `docs/MIGRATION.md` §1.3.

## Step 5 — Create .flaitron/PLAN.md

```sh
cp .flaitron/core/templates/PLAN.md .flaitron/PLAN.md
```

Then substitute `Project Name` (line 1: `# Project Name — PLAN.md`) with the project name from Step 1. Leave the rest of the placeholders (vision paragraph, task list) for the user to fill in afterward — surface this in the hand-off in Step 8.

Reference: `docs/MIGRATION.md` §1.4.

## Step 6 — Create .flaitron/tasknote/README.md

```sh
mkdir -p .flaitron/tasknote/archive
cp .flaitron/core/templates/tasknote-README.md .flaitron/tasknote/README.md
```

The README lists the five tasknote variants and carries the §"Archive layout" table that `/ft-task` reads on every run to resolve `<area>`. The skills scaffold new tasknotes from `.flaitron/core/templates/` automatically; the canonical shapes live there.

Reference: `docs/MIGRATION.md` §1.5.

## Step 7 — Stage and ask for commit-go

Stage the bootstrap files explicitly. Do **not** use `git add .` or `git add -A` — the project may have unrelated unstaged work that should not be bundled into the adoption commit:

```sh
git add .gitmodules .flaitron/core .flaitron/PLAN.md .flaitron/tasknote/ AGENTS.md
grep '^ln -s' .flaitron/core/claude/AGENTS-snippet.md | awk '{print $NF}' | xargs git add
```

Add `CLAUDE.md` to the first line when Step 4 created or modified it (the
symlink, or the `@AGENTS.md` import appended to an existing file). Skip it when
Step 4 left an existing `CLAUDE.md` untouched. Likewise add whichever exclusion
files Step 3b created or edited (`.claude/settings.json`, `.ignore`,
`.cursorignore`).

The second line stages exactly the symlinks Step 3 created, read back from the
snippet that created them — no roster is restated here, so a skill added
upstream is staged the day it ships.

Surface the proposed commit message and wait for commit-go (e.g. "yes", "go", "commit"). Do not commit unprompted — same protocol as the `/ft-task` post-closure flow.

Proposed message: `chore: adopt flaitron at vX.Y.Z` (substitute the actual pinned version). If the user picked `main`, the message is `chore: adopt flaitron (main, unpinned)`.

After the user approves, run `git commit` with the message. If the user wants a different message, follow their lead.

Reference: `docs/MIGRATION.md` §1.6.

## Step 8 — Verify and hand off

Confirm every symlink Step 3 created resolves — derived from the snippet, not
from a restated list, so the check never falls behind the roster:

```sh
grep '^ln -s' .flaitron/core/claude/AGENTS-snippet.md | awk '{print $NF}' |
  while read -r l; do
    [ -e "$l" ] || echo "BROKEN  $l -> $(readlink "$l")"
  done
```

No output means every link resolves into the submodule. Any `BROKEN` line names
the symlink to re-create from the snippet — fix before reporting success.

Then surface to the user, in one short message:

- Bootstrap is complete; flaitron is pinned to `vX.Y.Z` (or `main` if unpinned).
- **Next steps for them** (the skill leaves these as placeholders):
  - Edit `.flaitron/PLAN.md` — fill in the vision paragraph and initial task list.
  - Edit `.flaitron/tasknote/README.md` — declare any project-specific area prefixes; replace the "Project quick commands" section with real commands; extend `## AI-referenced docs` (seeded with `README.md` / `AGENTS.md` / `CLAUDE.md` / `.flaitron/PLAN.md`) as the architecture matures (architecture notes, API specs, DB schema docs, ADRs, inventories).
- **To verify the wiring:** invoke `/ft-task` in a fresh session with your coding agent (Claude Code, Cursor, Grok Build, Codex CLI, etc.; or the platform's equivalent slash/prompt command) in the project root. The command should appear in the menu (alongside the other flaitron skills) with its description.
- **Recommended follow-up.** Suggest auditing the context surfaces now with `/ft-audit context` — the `context` domain of the audit scaffold (`docs/MIGRATION.md` §1.2.1; before a fork exists, run `.flaitron/core/claude/skills/ft-audit/SKILL.md` with `context` as the domain — no forker placeholders, so it runs unforked). It scans the freshly-bootstrapped `CLAUDE.md`, `AGENTS.md`, and `.claude/{commands,skills}` for context bloat, redundancy with the just-pasted `AGENTS.md` block, `ft-*` namespace conflicts, and lean-context drift; findings land as PLAN tickets on the write-step confirmation. Catches first-day context-surface issues before they ossify.

Reference: `docs/MIGRATION.md` §1.7.

## Notes

- This skill does not touch existing files except `AGENTS.md` (created or appended-to in Step 4) and the exclusion files Step 3b merges a line into when they already exist (`.claude/settings.json`, `.ignore`, `.cursorignore`). Everything else is new.
- For migrating from a prior workflow system (existing `plan.json`, `WORKFLOW.md`, etc.), use `docs/MIGRATION.md` §3 (lightweight, active-queue-only) or §2 (full, ID-preserving) manually — the migration path involves judgment calls that don't fit a recipe.
- For bumping flaitron's pinned version in an already-adopted project, see `docs/MIGRATION.md` §"Pinning and bumping" — that's a different task (`CORE-XXX: Bump flaitron to vX.Y.Z`).
