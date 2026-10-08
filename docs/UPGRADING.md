# Upgrading across a directory rename

One-time recipes for an adopter pinned before a convention-directory rename. Ordinary version bumps, `/ft-update`, and the fleet updater are covered in [MIGRATION.md](MIGRATION.md) §"Pinning and bumping".

## Upgrading an existing adopter from v5.x (`.flowtron/` → `.flaitron/`)

flaitron **v6.0.0** renames the project from flowtron, and with it the convention directory `.flowtron/` → `.flaitron/` and the repository URL. It is a hard cut: v6 skills, the visualizer, and the fleet updater read only `.flaitron/`. Fresh adopters following [MIGRATION.md](MIGRATION.md) §1 are unaffected. An existing adopter does a one-time move when bumping to v6.0.0 — whether or not `.flowtron/core` already holds v6 (a v5 `/ft-update` can check it out; v6's `/ft-update` then stops and points here). Run from the project root, as one bump task:

1. **Drop the old submodule** (read-only upstream content — nothing project-owned lives in it):
   ```sh
   git submodule deinit -f .flowtron/core
   git rm -f .flowtron/core
   rm -rf .git/modules/.flowtron
   ```
2. **Rename the directory** (moves `PLAN.md`, `PLAN-ARCHIVE.md`, `tasknote/`, `sidequest/`, `specs/`; untracked and ignored files travel with it):
   ```sh
   git mv .flowtron .flaitron
   ```
3. **Re-add the submodule under the new name and URL, pinned to v6.0.0:**
   ```sh
   git submodule add https://github.com/fakeneuron/flaitron.git .flaitron/core
   git -C .flaitron/core checkout v6.0.0
   git -C .flaitron/core sparse-checkout set --no-cone '/*' '!/.flaitron/'   # optional, git ≥ 2.35: MIGRATION.md §1.1
   git add .flaitron/core
   ```
4. **Re-point the symlinks.** Every `.claude/`, `.agents/skills/`, `.cursor/skills/`, and `.grok/skills/` link into `../../.flowtron/core/...` now dangles; retarget each in place:
   ```sh
   for d in .claude .agents/skills .cursor/skills .grok/skills; do
     [ -d "$d" ] && find "$d" -type l | while IFS= read -r l; do
       t=$(readlink "$l"); case "$t" in *.flowtron*) ln -sfn "$(printf '%s' "$t" | sed 's/\.flowtron/.flaitron/g')" "$l" ;; esac
     done
   done
   ```
5. **Rewrite ignore rules** naming `.flowtron/` in any tracked `.gitignore` to `.flaitron/`.
6. **Update stray references** outside archived tasknotes (which stay as written): `AGENTS.md`, `CLAUDE.md`, active tasknotes, project docs, tool configs (e.g. a `Read(./.flowtron/core/.flowtron/**)` deny rule → `Read(./.flaitron/core/.flaitron/**)`, gitleaks/ignore-file paths, `FLOWTRON_VIZ_WORKSPACE` → `FLAITRON_VIZ_WORKSPACE`), and audit forks (full-copy and thin overlay): their frontmatter keys `flowtron-reconciled:` / `flowtron-tracks:` → `flaitron-reconciled:` / `flaitron-tracks:`, plus a thin overlay's Referenced-scaffold line `.flowtron/core/claude/skills/ft-audit/SKILL.md` → `.flaitron/core/claude/skills/ft-audit/SKILL.md`. Confirm clean: `git grep -n flowtron -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'`.
7. **Stage and commit.** Steps 1–3 staged themselves; steps 4–6 only edited the working tree, so stage them too (`git add -A` on whichever of `.claude`, `.agents`, `.cursor`, `.grok` exist, plus `.gitignore` and the files step 6 touched), then commit the move + re-pin + rewiring as a single bump task (4-phase flow — [MIGRATION.md](MIGRATION.md) §"Pinning and bumping").

## Upgrading an existing adopter from v4.x (`_project/` → `.flowtron/`)

> Historical recipe, kept in v5-era names. After it, continue with the v6 move above.

flowtron **v5.0.0** renames the convention directory `_project/` → `.flowtron/` (the dotfolder convention). Fresh adopters were unaffected — v5-era MIGRATION.md §1 already used `.flowtron/`. An existing adopter pinned under the v4.x `_project/` layout does a one-time rename when bumping to v5.0.0:

1. **Rename the directory** (moves `PLAN.md`, `tasknote/`, and the submodule in one step). Git rewrites the submodule's `.gitmodules` path and `.git/config` entry:
   ```sh
   git mv _project .flowtron
   ```
2. **Rename the submodule directory** to the canonical `core` name (v4.x used `flowtron` as the submodule dirname within `_project`; after the mv above it lands at `.flowtron/flowtron`):
   ```sh
   git mv .flowtron/flowtron .flowtron/core
   ```
3. **Re-pin the submodule to v5.0.0:**
   ```sh
   git -C .flowtron/core fetch --tags
   git -C .flowtron/core checkout v5.0.0
   ```
4. **Re-run the symlink wiring.** The old `.claude/` symlinks point at `_project/flowtron/...` and now dangle — re-create them from `.flowtron/core/claude/AGENTS-snippet.md` §"One-time symlink wiring" (run from the project root).
5. **Update stray `_project/` references** in `AGENTS.md`, `CLAUDE.md`, and project docs to `.flowtron/`. Confirm clean: `grep -rn _project . --exclude-dir=.git`.
6. **Commit** the rename + re-pin + rewiring as a single bump task (4-phase flow — [MIGRATION.md](MIGRATION.md) §"Pinning and bumping").
