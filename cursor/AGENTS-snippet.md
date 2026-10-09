# Cursor wiring snippet for flaitron

This file is the Cursor-specific sibling of `claude/AGENTS-snippet.md`. The
workflow block itself is agent-neutral and remains canonical there; this file
owns only the Cursor wiring commands and notes.

Cursor's bundle is deliberately **thin**: no skill wrappers ship under
`cursor/`. Cursor discovers skills from `.cursor/skills/` and `.agents/skills/`
and documents `.claude/skills/` as a compatibility surface, so adopters wire the
canonical `claude/skills/` bodies directly. There is no second copy of the `ft-*`
inventory to keep in sync, and no Cursor-specific translation layer — Cursor has
a native structured ask, native sub-agents, and native `/<skill-name>` slash
commands, so the canonical bodies run as written.

## Block to paste into `AGENTS.md`

Use the block in `../claude/AGENTS-snippet.md` §"Block to paste into AGENTS.md".
Do not maintain a second copy here. Cursor reads a repository-root `AGENTS.md`
with no configuration.

## One-time symlink wiring

**If the project is already wired for Claude Code, it is already wired for
Cursor.** Cursor loads `.claude/skills/` as a documented compatibility surface,
and project-scope skill directories dedupe by slug, so the symlinks from
`../claude/AGENTS-snippet.md` §"One-time symlink wiring" already serve Cursor
sessions. Run that block and stop there — a second parallel install adds no
skills and no capability.

**Derived surface.** The roster is not decided here. It is defined once in
[`../claude/AGENTS-snippet.md`](../claude/AGENTS-snippet.md) §"One-time symlink
wiring", and the Cursor-only block below is that roster under one substitution —
destination `.claude/skills/<n>` → `.cursor/skills/<n>`, source path unchanged
(the targets are the canonical Claude bodies), lines sorted. Adding or removing a skill means editing the SSOT and regenerating
this block, never editing this block alone. It stays a literal `ln -s` list
because adopters copy-paste it and `tools/update-adopters.mjs` parses it;
`/ft-release` §7.1 diffs it against the SSOT as a set.

For a **Cursor-only project** — one with no `.claude/` wiring — install the same
adopter subset under Cursor's own directory instead. Run from the project root
after adding the flaitron submodule at `.flaitron/core`:

```sh
mkdir -p .cursor/skills
ln -s ../../.flaitron/core/claude/skills/ft-close-epic .cursor/skills/ft-close-epic
ln -s ../../.flaitron/core/claude/skills/ft-epic-discovery .cursor/skills/ft-epic-discovery
ln -s ../../.flaitron/core/claude/skills/ft-file-followup .cursor/skills/ft-file-followup
ln -s ../../.flaitron/core/claude/skills/ft-micro-task .cursor/skills/ft-micro-task
ln -s ../../.flaitron/core/claude/skills/ft-refactor .cursor/skills/ft-refactor
ln -s ../../.flaitron/core/claude/skills/ft-seed .cursor/skills/ft-seed
ln -s ../../.flaitron/core/claude/skills/ft-task .cursor/skills/ft-task
ln -s ../../.flaitron/core/claude/skills/ft-update .cursor/skills/ft-update
```

The targets are `claude/skills/` on purpose — those are the canonical skill
bodies, not Cursor-specific copies. The relative paths are intentional: they
survive `git clone` and pin to whichever flaitron commit the submodule is
checked out at. Commit the symlinks (`git add .cursor/`).

The submodule also brings flaitron's own tasknote archive at
`.flaitron/core/.flaitron/` (~16 MB, ~1,000 files) — flaitron's history, not
this project's context. Sparse-checkout drops it from the working tree; as the
fallback, keep it out of indexing and AI access with that line in a root
`.cursorignore`. The sparse line and the per-tool list are in
`../docs/MIGRATION.md` §1.1.

A Cursor skill auto-exposes as `/<skill-name>`, so `/ft-task <TASK-ID>` works
after wiring.

Prefer `.cursor/skills/` over `.agents/skills/` for repo-scoped Cursor wiring.
Both work, but `.agents/skills/` is also Codex's repo-scoped directory — keeping
them separate avoids a slug collision between the canonical bodies and Codex's
`codex/skills/` wrappers if the project later wires Codex too.

This snippet wires the adopter-installed subset: the tasknote family,
`/ft-seed`, and `/ft-update`. Global utility skills such as
`ft-new-project` and `ft-audit-repo` may be installed in the user skill directory when desired;
`ft-release` remains flaitron-self-only and is not part of the adopter snippet.
The canonical category table lives in
`../docs/PLATFORMS.md` §"Installed-surface policy", and the
install-once rule this block obeys is
`../docs/PLATFORMS.md` §"One canonical install path per project".

To verify Cursor wiring: open a fresh Cursor session in the project and invoke
`/ft-task`. The skill should appear with its description text; an entry that
lists with an **empty** description is the frontmatter failure described next.

## Forking skills — the description must be valid YAML

Cursor parses `SKILL.md` frontmatter more strictly than Claude Code. An
unquoted `description:` scalar may not contain a colon followed by a space; when
it does, the frontmatter fails to parse and the skill still appears in the
roster but loads with an **empty description**. Nothing errors — the skill
simply stops being model-invocable and becomes command-only, because the
description is what an agent reads to decide to reach for it.

This is worth knowing if you fork a flaitron skill under an unprefixed name per
`../docs/MIGRATION.md` §1.2.1: keep `": "` out of the description,
or quote the scalar — single quotes, with an apostrophe written twice. The
same goes for anything else YAML reads as syntax: a ` #` (truncates the value as
a comment), a trailing `:`, or a leading indicator such as `[` (an
`argument-hint:` like `[TASK-ID]`), `{`, `*`, `- ` or a backtick. When unsure,
quote.
Upstream, the `skill_frontmatter_yaml` check in
`../tools/drift-checks.sh` holds the shipped skill frontmatter to
this rule.

## Pinning notes

These relative symlinks point through the project's pinned `.flaitron/core`
submodule, so the wired skill bodies move only when the project deliberately
bumps flaitron. Existing symlinks do not need rewiring on a normal version bump;
newly shipped adopter-subset skills may need new symlinks, which `/ft-update`
adds.

Cursor follows relative directory symlinks at adopter depth — verified
discovered, resolved, and invoked in live sessions, in all three candidate
directories. Edits to the submodule target are visible through the link, but a
running session's skill roster is fixed at session start: after a pin bump,
start a fresh session rather than expecting the running one to reload.

Do **not** glob the skill inventory into an agent home (`~/.cursor/skills/`,
`~/.agents/skills/`, or `~/.claude/skills/`). Project scope and user scope
enumerate separately, so a globally installed copy doubles flaitron's footprint
in every session before any work starts; and user-scope collisions resolve by
slug without regard to which platform authored the body, so a globally installed
Codex wrapper can be served to a Cursor session it was not written for. The
agent home carries only the global-only utilities. Canonical rule:
`../docs/PLATFORMS.md` §"One canonical install path per project".
