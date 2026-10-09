---
name: ft-update
description: Bump an adopter project's pinned flaitron submodule to the latest released tag — show current→target version + tag changelog, fetch + checkout the tag, record the new pin, re-wire per-project Claude/Codex symlinks for newly shipped skills, report any dangling symlinks left by retired skills, refresh full-copy audit forks with newly shipped pass files without clobbering filled rubrics, and run a lightweight smoke check. Use when the user asks to update or bump their project's flaitron submodule to the latest release. Adopter-only (bails in flaitron-self); thin procedural skill, no tasknote.
---

# update — flaitron submodule bump (adopter-side)

You are bumping a project's pinned flaitron submodule to the latest released
tag. This is the consumer-side counterpart to `/ft-release` (which cuts the tag
on the producer side). It is a **thin procedural skill** — it performs the bump
and stages the result; it does **not** scaffold a 4-phase tasknote. The skill
takes **no arguments**.

The skill is markdown-only — the assistant runs git inline via its Bash tool, no
shell scripts (per `SPEC/scope-boundaries.md` §"What flaitron does NOT provide").

## Step 0 — Resolve the submodule path + verify cwd is an adopter project

The flaitron submodule lives at `.flaitron/core/`. Resolve `<FT>` (the actual
path) before anything else:

- Parse `.gitmodules` for the submodule whose `url` contains `flaitron` → its `path`. That is `<FT>`.
- Fallback if `.gitmodules` is unclear: `.flaitron/core/` when `.flaitron/core/SPEC.md` exists.

**Pre-rename layout — stop.** If `.flowtron/` exists (a pre-v6 `.flowtron/core/`
pin, or the older `.flowtron/flowtron/`), stop before any write: v6.0.0 renamed
the whole directory, and this skill does not move it. Point the user at
flaitron's `docs/UPGRADING.md` §"Upgrading an existing adopter from v5.x
(`.flowtron/` → `.flaitron/`)" — or, for a whole adopter fleet, at
`tools/update-adopters.mjs` in flaitron's checkout, which migrates
automatically.

Then guard — the skill bails unless this is a flaitron-adopting project:

- `<FT>/SPEC.md` exists (the pinned submodule resolved above).
- `.flaitron/PLAN.md` exists (this project's own PLAN).
- The repo-root `SPEC.md` heading is **not** `# Flaitron — Workflow Specification` — that heading means cwd is the flaitron checkout itself, where there is no submodule to bump.

If no flaitron submodule resolves, or any guard fails, stop. Tell the user `/ft-update` only runs inside a flaitron-adopting project (one with a flaitron submodule under `.flaitron/`). For flaitron's own checkout, releases are cut with `/ft-release`, not bumped. Do not modify any files.

Use `<FT>` in place of the submodule path for every command below.

## Step 1 — Resolve current pin and latest available tag

- **Re-apply the sparse trim** (`docs/MIGRATION.md` §1.1): if `test -L <FT>` fails (`<FT>` is not a symlink) and `git --version` is 2.35 or newer, run `git -C <FT> sparse-checkout set --no-cone '/*' '!/.flaitron/'`. This keeps flaitron's dogfood archive (`<FT>/.flaitron/`) out of the working tree. The command is idempotent and changes no gitlink. A superproject re-clone drops the per-clone sparse config, and this step restores it on every run that gets past Step 0. It runs first, before the network fetch and before any confirm, so neither an offline fetch nor a declined bump skips it. Every exit and the Step 5 recap say which happened: re-applied (files removed), already sparse, skipped on older git, where the adopter's deny/`.ignore` fence still covers the path, or skipped because `<FT>` is a symlink to a local flaitron checkout, whose own `.flaitron/` the trim would remove.
- **Current version:** read `<FT>/SPEC.md:3` (`**Version:** vX.Y.Z`).
- **Current pinned commit:** `git -C <FT> rev-parse --short HEAD`.
- **Fetch tags:** `git -C <FT> fetch --tags --quiet origin`.
- **Latest tag:** `git -C <FT> tag --sort=-v:refname | head -1`.

If the latest tag's version equals the current `SPEC.md` version, report "already on the latest release (`vX.Y.Z`)" with the sparse outcome, and stop — nothing to bump. Otherwise capture `<current>` and `<target>` for the rest of the run.

## Step 2 — Surface the bump + tag changelog, confirm

Flaitron has no `CHANGELOG.md` — the annotated tag message is the changelog. Show it:

```sh
git -C <FT> show <target> --no-patch
```

Surface to the user:

```text
flaitron bump (<FT>):
  current: <current>  (pin <short-sha>)
  target:  <target>   (latest tag)

Tag notes (<target>):
  <tag message — adopter-facing release notes + any Migration block>

Proceed with the bump?
```

Use AskUserQuestion (default Yes). If the tag message carries a **Migration** block with required project-side edits, call those out explicitly — the adopter may need to act on them after the pin moves. Do not proceed silently past a non-empty Migration block.

## Step 3 — Move the pin

Bumping is **not** `git submodule update` — that command *restores* the commit already recorded in the superproject index (it would undo a bump). Move the pin explicitly:

```sh
git -C <FT> checkout <target>
git add <FT>
```

When Step 1 applied the sparse config, the checkout respects it and never writes the dogfood archive back; on the older-git skip it does. `git add <FT>` records the new gitlink in the superproject. Verify: `git -C <FT> describe --tags` reads `<target>`, and `git diff --cached <FT>` shows the gitlink moving `<current>` → `<target>`.

## Step 4 — Re-wire per-project symlinks for newly shipped skills

Existing relative symlinks need no change — they track whatever the submodule points at. Only a **newly shipped** per-project skill needs a fresh symlink (it has none yet).

Handle each platform wiring surface independently:

- **Claude Code:** authoritative list is the `ln -s … .claude/skills/<name>` / `.claude/commands/<name>.md` block in the freshly-bumped `<FT>/claude/AGENTS-snippet.md` §"One-time symlink wiring". If `.claude/` exists, create any missing symlinks with the same relative form the snippet uses (substituting the resolved `<FT>`, e.g. `ln -s ../../<FT>/claude/skills/<name> .claude/skills/<name>`). If `.claude/` is absent, do not create a new Claude wiring surface during an update; report "Claude wiring not present; skipped `.claude/` symlink check."
- **Codex:** authoritative list is the `ln -s … .agents/skills/<name>` block in the freshly-bumped `<FT>/codex/AGENTS-snippet.md` §"One-time skill wiring". If `.agents/skills/` exists, create any missing symlinks with the same relative form the snippet uses (substituting the resolved `<FT>`, e.g. `ln -s ../../<FT>/codex/skills/<name> .agents/skills/<name>`). If `.agents/skills/` is absent, do not create a new Codex wiring surface during an update; report "Codex wiring not present; skipped `.agents/skills/` symlink check."
- **Cursor:** authoritative list is the Cursor-only `ln -s … .cursor/skills/<name>` block in the freshly-bumped `<FT>/cursor/AGENTS-snippet.md` §"One-time symlink wiring" (targets are canonical `claude/skills/` bodies). If `.cursor/skills/` exists, create any missing symlinks with the same relative form the snippet uses (substituting the resolved `<FT>`). If `.cursor/skills/` is absent, do not create a new Cursor wiring surface during an update; report "Cursor wiring not present; skipped `.cursor/skills/` symlink check." (Projects that only have `.claude/` and rely on Cursor's compat load need no Cursor-specific re-wire — the Claude surface above covers them.)
- **Grok:** authoritative list is the Grok-only `ln -s … .grok/skills/<name>` block in the freshly-bumped `<FT>/grok/AGENTS-snippet.md` §"One-time symlink wiring" (targets are canonical `claude/skills/` bodies). If `.grok/skills/` exists, create any missing symlinks with the same relative form the snippet uses (substituting the resolved `<FT>`). If `.grok/skills/` is absent, do not create a new Grok wiring surface during an update; report "Grok wiring not present; skipped `.grok/skills/` symlink check." (Projects that only have `.claude/`, `.agents/skills/`, or `.cursor/skills/` and rely on Grok's compat load need no Grok-specific re-wire — those surfaces above cover them.)

Report the added symlinks per platform (or "no new skills to wire"). Note: global/by-reference skills (`/ft-new-project`, `/ft-audit-repo`) are picked up by the user's agent-home wiring when desired, not per-project — do not add extra repo-scoped symlinks beyond each platform's snippet list. `/ft-update` is intentionally in the adopter subset; `/ft-release` is flaitron-self-only.

## Step 4.5 — Audit-fork drift scan & pass-file refresh

Scan the adopter's skill roots for local audit forks that carry fork-provenance markers — these signal which bundled scaffold a fork was last reconciled against so that silent upstream drift becomes visible. The roots are `.claude/skills` and, if present, `.agents/skills` (where the Codex wrapper installs a fork); `<root>` below is whichever one the fork lives in.

For each file matching `.claude/skills/*/SKILL.md` or `.agents/skills/*/SKILL.md` whose skill **directory** is not a symlink and whose `SKILL.md` is a regular file (`test ! -L "$(dirname <path>)" && test ! -L <path>`) and that contains a `flaitron-reconciled:` frontmatter field:

The directory test is the one that matters: every adopter-wired skill directory, Claude or Codex, is a symlink into the submodule, and the `SKILL.md` reached *through* that link is itself a regular file, so testing the file alone passes for all of them and classifies submodule-owned skills as local forks.

1. Parse the file's YAML frontmatter to read:
   - `flaitron-reconciled:` — the version tag the fork was last reconciled against (e.g. `v5.2.0`).
   - `flaitron-tracks:` — the bundled scaffold name (e.g. `ft-audit`).

2. If either field is missing or empty, skip this file and note it was skipped.

3. Check whether the tracked scaffold changed between the reconciled version and `<target>`:

   ```sh
   git -C <FT> log <reconciled>..<target> --oneline -- claude/skills/<flaitron-tracks>/
   ```

   Scope the path to the scaffold **directory**, not just its `SKILL.md` — a
   scaffold like `ft-audit` carries a sibling `passes/` library whose per-domain
   pass bodies are exactly what a fork reconciles against.

4. If the log is non-empty, emit a **non-blocking warning** for that fork:

   ```text
   ⚠️  Audit fork drift: <root>/<dir>/SKILL.md
       Reconciled at: <reconciled>  →  bumping to: <target>
       Scaffold `claude/skills/<flaitron-tracks>/` changed in N commit(s) since <reconciled>.
       Review the upstream diff, re-reconcile your fork, then update `flaitron-reconciled:` to <target>:

         git -C <FT> diff <reconciled>..<target> -- claude/skills/<flaitron-tracks>/
   ```

5. **Pass-file refresh (full-copy forks only).** A fork is **full-copy** when a `passes/` directory sits beside its `SKILL.md`; a fork with no `passes/` sibling is a **thin overlay** — it resolves pass files from the bundled scaffold at run time and therefore picks up newly shipped domains automatically. Report an overlay as `inherits new pass files automatically; no action` and skip the rest of this item.

   For a full-copy fork whose `flaitron-tracks:` is `ft-audit`, compare its `passes/` against the bundled set — at the target *and* at the reconcile point:

   ```sh
   ls <root>/<dir>/passes/                                                            # the fork has
   git -C <FT> ls-tree --name-only <target>     -- claude/skills/ft-audit/passes/     # bundled now
   git -C <FT> ls-tree --name-only <reconciled> -- claude/skills/ft-audit/passes/     # bundled then
   ```

   Classify every bundled-at-`<target>` file the fork lacks. The `<reconciled>` listing is the discriminator — it separates "the forker never saw this" from "the forker saw it and removed it":

   - **Newly shipped** — *absent* from the `<reconciled>` listing. Upstream added the domain after this fork was last reconciled, so the forker has never had the chance to decide against it. **Offer to copy it in**, one confirm per file:

     ```sh
     cp <FT>/claude/skills/ft-audit/passes/<domain>.md <root>/<dir>/passes/<domain>.md
     ```

     A copied file lands as an **unfilled scaffold** — say so, and point at the fork's §0 forker checklist for the slots it needs. `/ft-audit`'s own scaffold bootstrap will also catch them on the first run of that domain, so a deferred fill degrades to a prompt rather than to silence.

   - **Deliberately deleted** — *present* in the `<reconciled>` listing. The forker had the file and removed it; the scaffold's §0 explicitly sanctions deleting pass files for surfaces a project doesn't have. **Report only — never re-add.** Re-adding would silently undo a deliberate decision on every bump.

   Files present in **both** the fork and the bundle are never read, diffed, or written by this step. That is exactly where filled rubrics, gate commands, and sacred invariants live, and this refresh must not be able to reach them. Changes to pass files the fork already has are the drift *warning*'s job (item 4), not this item's.

   Copies are the only write this step makes, and only on an explicit per-file `AskUserQuestion` confirm. Declining is a valid answer and changes nothing.

6. If no `.claude/skills/*/SKILL.md` or `.agents/skills/*/SKILL.md` file carries `flaitron-reconciled:`, emit:
   `No provenance-marked audit forks found; skipping drift scan.`

Drift warnings are **informational only** — the bump proceeds regardless. After the adopter reviews and re-reconciles, they manually update `flaitron-reconciled:` to `<target>`. The item-5 pass-file copies are the one exception to report-only, and they are gated behind a per-file confirm; declining leaves the fork untouched. Report all warnings, copies, and skips (if any) before continuing to Step 5.

## Step 4.6 — Dangling symlink check

A release can retire or fold a skill (see `docs/MIGRATION.md` §"Retired skills leave dangling symlinks"). Step 4 wires symlinks for *newly shipped* skills; it does not prune ones left behind by a retired skill — check for those here, report-only.

For each wiring surface confirmed present in Step 4:

```sh
find .claude -type l ! -exec test -e {} \; -print          # if .claude/ is present
find .agents/skills -type l ! -exec test -e {} \; -print   # if .agents/skills/ is present
find .cursor/skills -type l ! -exec test -e {} \; -print   # if .cursor/skills/ is present
find .grok/skills -type l ! -exec test -e {} \; -print      # if .grok/skills/ is present
```

If any of those commands print hits, surface them:

```text
⚠️  Dangling symlink(s) found — target no longer resolves in the bumped submodule:
    <path>
    <path>
Likely a retired/folded skill (see docs/MIGRATION.md §"Retired skills leave dangling symlinks" for what replaced it). Safe to `rm` — these are symlinks into the submodule, never real files. Not pruned automatically; remove them yourself.
```

If all present-surface commands print nothing, report "No dangling symlinks found." This check is informational only — the bump proceeds regardless, and `/ft-update` never runs `rm` on the adopter's behalf.

## Step 4.7 — Agent-home shadow check

An agent-home copy of an adopter-subset slug shadows this project's repo-scoped wiring, so its body runs instead of the pin just recorded. A copy carrying the skill/pin guard stops the run wherever the runtime names its base directory, and an older or unnamed copy runs silently (`<FT>/docs/PLATFORMS.md` §"One canonical install path per project"). Agent homes lie outside the project, so **ask before probing**: one AskUserQuestion (default Skip) naming `~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills`, `~/.codex/skills`, `~/.cursor/skills` and `~/.grok/skills`. On approval, probe only the slugs in Step 4's Claude list. Never list an agent home, since its other entries are the user's:

```sh
for d in ~/.claude/skills ~/.agents/skills ~/.codex/skills ~/.cursor/skills ~/.grok/skills; do
  for s in <slugs from Step 4's Claude list>; do [ -e "$d/$s" ] && echo "$d/$s"; done
done
for s in <slugs from Step 4's Claude list>; do [ -e ~/.claude/commands/$s.md ] && echo ~/.claude/commands/$s.md; done
```

Any hits:

```text
⚠️  Agent-home copies shadow this project's pinned skills (their bodies run, not <FT>'s):
    <path>
Remove them yourself, keeping only the global-only utilities (ft-new-project, ft-audit-repo). /ft-update never deletes outside the project.
```

No hits → "No agent-home shadows found." Declined, or a refused read (a path-access guard) → "Agent-home shadow check not run — <declined | read refused>." A refused read names the remedy: the refusing guard needs a `read` root for each refused home, and arming it is the operator's act. Report-only; the bump proceeds regardless.

## Step 5 — Smoke check, stage, hand off

- **Symlink resolve check:** for each wiring surface present, verify one canonical link resolves into `<FT>`:
  - Claude: `readlink .claude/commands/ft-task.md` resolves into `<FT>/claude/commands/ft-task.md`; spot-check one skill dir symlink too.
  - Codex: `readlink .agents/skills/ft-task` resolves into `<FT>/codex/skills/ft-task`.
  - Cursor: `readlink .cursor/skills/ft-task` resolves into `<FT>/claude/skills/ft-task` (thin bundle — targets are Claude bodies).
  - Grok: `readlink .grok/skills/ft-task` resolves into `<FT>/claude/skills/ft-task` (thin bundle — targets are Claude bodies).
  A broken link means the submodule isn't checked out or the symlink target is stale — surface it.
- **Version confirm:** re-read `<FT>/SPEC.md:3` — now `<target>`.
- Optionally **offer** (do not auto-run) a full `/ft-task <ID>` against a real PLAN.md entry as a deeper smoke test.

Stage the bump explicitly, plus whichever wiring dirs exist and were checked (do **not** `git add .` / `-A` — there may be unrelated work):

```sh
git add <FT>
git add .claude/         # if present
git add .agents/skills/  # if present
git add .cursor/skills/  # if present
git add .grok/skills/    # if present
```

Surface a recap (current→target, tag headline, any new symlinks wired, any Step 4.7 shadow hits, the Step 1 sparse outcome, any Migration action items) and a proposed commit message:

```text
chore: bump flaitron <current> → <target>
```

Do **not** commit unprompted. Commit on the user's go, then stop — `/ft-update` drives no further workflow.

## Notes

- **Adopter-only — inverse of `/ft-release`.** `/ft-release` runs only in flaitron's own checkout; `/ft-update` runs only in adopter projects. Both are layout-guarded; `/ft-update` is wired repo-scoped (Step 4.7 reports an agent-home copy).
- **Submodule path is resolved, not assumed.** Step 0 reads the real path from `.gitmodules`; a pre-rename `.flowtron/` layout stops with a pointer to the v6 move rather than bumping in place.
- **Thin procedural skill.** No tasknote, no 4-phase flow. If you want the bump tracked in PLAN.md, file a line first (e.g. `**<AREA>-NNN** [light] | bump flaitron <target>`) or wrap it in `/ft-micro-task`; `/ft-update` itself just performs the mechanical bump.
- **Why not `git submodule update`.** Plain `git submodule update` checks out the commit recorded in the superproject index — it restores the *current* pin, not a new one. Bumping requires checking out the new tag inside the submodule and re-recording the gitlink with `git add <FT>` (Step 3).
- **Supersedes the manual prose.** Replaces `claude/AGENTS-snippet.md` §"Bumping the pinned flaitron version" as the executable path; the prose now points here.
