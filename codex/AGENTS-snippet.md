# Codex wiring snippet for flaitron

This file is the Codex-specific sibling of `claude/AGENTS-snippet.md`.
The workflow block itself is agent-neutral and remains canonical there for
historical continuity; this file owns only the Codex wiring commands.

## Block to paste into `AGENTS.md`

Use the block in `../claude/AGENTS-snippet.md` §"Block to paste into AGENTS.md".
Do not maintain a second copy here.

## One-time skill wiring

**Derived surface.** The roster is not decided here. It is defined once in
[`claude/AGENTS-snippet.md`](../claude/AGENTS-snippet.md) §"One-time symlink
wiring", and the block below is that roster under one substitution — source
`claude/skills/<n>` → `codex/skills/<n>`, destination `.claude/skills/<n>` →
`.agents/skills/<n>`, lines sorted. Adding or removing a skill means editing the SSOT and
regenerating this block, never editing this block alone. It stays a literal
`ln -s` list because adopters copy-paste it and `tools/update-adopters.mjs`
parses it; `/ft-release` §7.1 diffs it against the SSOT as a set.

Codex discovers repo-scoped skills from `.agents/skills` in the current
directory walk. From an adopting project's repository root, after adding the
flaitron submodule at `.flaitron/core`, wire the adopter-facing Flaitron skill
subset (tasknote execution family, `ft-seed`, and `ft-update`):

```sh
mkdir -p .agents/skills
ln -s ../../.flaitron/core/codex/skills/ft-close-epic .agents/skills/ft-close-epic
ln -s ../../.flaitron/core/codex/skills/ft-epic-discovery .agents/skills/ft-epic-discovery
ln -s ../../.flaitron/core/codex/skills/ft-file-followup .agents/skills/ft-file-followup
ln -s ../../.flaitron/core/codex/skills/ft-micro-task .agents/skills/ft-micro-task
ln -s ../../.flaitron/core/codex/skills/ft-refactor .agents/skills/ft-refactor
ln -s ../../.flaitron/core/codex/skills/ft-seed .agents/skills/ft-seed
ln -s ../../.flaitron/core/codex/skills/ft-task .agents/skills/ft-task
ln -s ../../.flaitron/core/codex/skills/ft-update .agents/skills/ft-update
```

The submodule also brings flaitron's own tasknote archive at
`.flaitron/core/.flaitron/` (~16 MB, ~1,000 files) — flaitron's history, not
this project's context. Sparse-checkout drops it from the working tree; as the
fallback, keep it out of search tooling with that line in a root `.ignore`. The
sparse line and the per-tool list are in `../docs/MIGRATION.md` §1.1.

Use `/skills` in Codex or type `$ft-task` / `$ft-update` / another wired
skill name to invoke a Flaitron skill. Global utility skills such as
`ft-new-project` and `ft-audit-repo` may be installed in the user skill directory when desired;
`ft-release` remains flaitron-self-only and is not part of the adopter snippet.
The canonical category table lives in
`../docs/PLATFORMS.md` §"Installed-surface policy".
Codex's built-in CLI slash commands do not define arbitrary custom `/ft-*`
commands; the stable exported surface is the `ft-*` skill name.

## Translation rules

Every wrapper under `codex/skills/` is a thin pointer at a canonical body that
was written for Claude Code. These are the rules for reading such a body from
Codex. They live here once rather than restated in each wrapper, so a change to
how Codex translates lands in one place:

- Use a concise prose question when the source skill asks for a structured ask
  and no Codex structured prompt is available.
- Invoke sibling Flaitron Codex skills by their `ft-*` names when a source step
  references another skill.
- Treat `.claude/` paths as Claude-only install paths; Codex install paths are
  documented in §"One-time skill wiring" above.

Treat `../SPEC.md` and the lazy modules under `../SPEC/` as authoritative when
source instructions diverge from the contract.

A wrapper may add a rule of its own — `ft-task` names one for its lazy fragments
— but never restates these.

## Pinning notes

These relative symlinks point through the project's pinned
`.flaitron/core` submodule, so the wired skill bodies move only when the
project deliberately bumps flaitron. Existing symlinks do not need rewiring on
a normal version bump; newly shipped adopter-subset skills may need new symlinks, which `/ft-update` adds.

For flaitron maintainers who want hot-reload behavior while editing this
checkout, wire the wrapper inventory **repo-scoped**, from the checkout root:

```sh
mkdir -p .agents/skills
(cd .agents/skills && ln -s ../../codex/skills/* .)
```

Do **not** glob the inventory into `~/.agents/skills/`. That directory is read by
Codex, Claude Code, Cursor, and Grok alike, and same-named skills resolve by slug
without regard to which platform authored the body — so a globally installed
Codex wrapper can be served to an agent it was not written for. The agent home
carries only the global-only utilities, installed one at a time, and only on a
machine where Codex is the driver. Canonical rule:
`../docs/PLATFORMS.md` §"One canonical install path per project".

Installation evidence and reproducible fresh-runtime checks live in
[`docs/CODEX-VERIFICATION.md`](../docs/CODEX-VERIFICATION.md). Discovery
receipts are separate from workflow and compatibility verification.
