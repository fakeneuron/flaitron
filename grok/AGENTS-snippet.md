# Grok Build wiring snippet for flaitron

This file is the Grok-specific sibling of `claude/AGENTS-snippet.md`. The
workflow block itself is agent-neutral and remains canonical there; this file
owns only the Grok wiring commands and notes.

Grok's bundle is deliberately **thin**: no skill wrappers ship under
`grok/`. Grok discovers skills from `.grok/skills/` (native) and, by default,
from `.claude/skills/` (+ `.claude/commands/`), `.cursor/skills/`, and
`.agents/skills/` at each tier (cwd walk-up), so adopters wire the canonical
`claude/skills/` bodies. There is no second copy of the `ft-*` inventory to
keep in sync, and no Grok-specific translation layer — Grok auto-exposes
skills as `/<skill-name>` slash commands, so the canonical bodies run as
written.

## Block to paste into `AGENTS.md`

Use the block in `../claude/AGENTS-snippet.md` §"Block to paste into AGENTS.md".
Do not maintain a second copy here. Grok reads a repository-root `AGENTS.md`
with no configuration.

## One-time symlink wiring

**If the project is already wired for Claude Code, Codex, or Cursor, it is
already wired for Grok.** Grok loads `.claude/skills/` / `.claude/commands/`
(Claude compat, default on), `.agents/skills/` (at each tier), and
`.cursor/skills/` (Cursor compat, default on) as documented compatibility
surfaces, so the symlinks from `../claude/AGENTS-snippet.md` §"One-time
symlink wiring" (or the Codex / Cursor-only siblings) already serve Grok
sessions. Run that block and stop there — a second parallel install into
`.grok/skills/` adds no skills and no capability.

**Derived surface.** The roster is not decided here. It is defined once in
[`../claude/AGENTS-snippet.md`](../claude/AGENTS-snippet.md) §"One-time symlink
wiring", and the Grok-only block below is that roster under one substitution —
destination `.claude/skills/<n>` → `.grok/skills/<n>`, source path unchanged
(the targets are the canonical Claude bodies), lines sorted. Adding or removing a skill means editing the SSOT and regenerating
this block, never editing this block alone. It stays a literal `ln -s` list
because adopters copy-paste it and `tools/update-adopters.mjs` parses it;
`/ft-release` §7.1 diffs it against the SSOT as a set.

For a **Grok-only project** — one with no `.claude/`, no `.agents/skills/`,
and no `.cursor/skills/` wiring — install the same adopter subset under
Grok's own directory instead. Run from the project root after adding the
flaitron submodule at `.flaitron/core`:

```sh
mkdir -p .grok/skills
ln -s ../../.flaitron/core/claude/skills/ft-close-epic .grok/skills/ft-close-epic
ln -s ../../.flaitron/core/claude/skills/ft-file-task .grok/skills/ft-file-task
ln -s ../../.flaitron/core/claude/skills/ft-micro-task .grok/skills/ft-micro-task
ln -s ../../.flaitron/core/claude/skills/ft-open-epic .grok/skills/ft-open-epic
ln -s ../../.flaitron/core/claude/skills/ft-refactor .grok/skills/ft-refactor
ln -s ../../.flaitron/core/claude/skills/ft-seed-unattended .grok/skills/ft-seed-unattended
ln -s ../../.flaitron/core/claude/skills/ft-task .grok/skills/ft-task
ln -s ../../.flaitron/core/claude/skills/ft-update .grok/skills/ft-update
```

The targets are `claude/skills/` on purpose — those are the canonical skill
bodies, not Grok-specific copies. The relative paths are intentional: they
survive `git clone` and pin to whichever flaitron commit the submodule is
checked out at. Commit the symlinks (`git add .grok/`).

The submodule also brings flaitron's own tasknote archive at
`.flaitron/core/.flaitron/` (~16 MB, ~1,000 files) — flaitron's history, not
this project's context. Sparse-checkout drops it from the working tree; as the
fallback, keep it out of search tooling with that line in a root `.ignore`. The
sparse line and the per-tool list are in `../docs/MIGRATION.md` §1.1.

A Grok skill auto-exposes as `/<skill-name>`, so `/ft-task <TASK-ID>` works
after wiring.

Prefer `.grok/skills/` over `.agents/skills/` for repo-scoped Grok-only
wiring. Both work, but `.agents/skills/` is also Codex's repo-scoped
directory — keeping them separate avoids a slug collision between the
canonical bodies and Codex's `codex/skills/` wrappers if the project later
wires Codex too.

This snippet wires the adopter-installed subset: the tasknote family,
`/ft-seed-unattended`, and `/ft-update`. Global utility skills such as
`ft-adopt` and `ft-audit-repo` may be installed in the user skill directory when desired;
`ft-release` remains flaitron-self-only and is not part of the adopter snippet.
The canonical category table lives in
`../docs/PLATFORMS.md` §"Installed-surface policy", and the
install-once rule this block obeys is
`../docs/PLATFORMS.md` §"One canonical install path per project".

To verify Grok wiring: open a fresh Grok Build session in the project and
invoke `/ft-task`. The skill should appear with its description text.

## Pinning notes

These relative symlinks point through the project's pinned `.flaitron/core`
submodule, so the wired skill bodies move only when the project deliberately
bumps flaitron. Existing symlinks do not need rewiring on a normal version bump;
newly shipped adopter-subset skills may need new symlinks, which `/ft-update`
adds.

Do **not** glob the skill inventory into an agent home (`~/.grok/skills/`,
`~/.agents/skills/`, `~/.cursor/skills/`, or `~/.claude/skills/`). Project
scope and user scope enumerate separately, so a globally installed copy
doubles flaitron's footprint in every session before any work starts; and
user-scope collisions resolve by slug without regard to which platform
authored the body, so a globally installed Codex wrapper can be served to a
Grok session it was not written for. The agent home carries only the
global-only utilities. Canonical rule:
`../docs/PLATFORMS.md` §"One canonical install path per project".
