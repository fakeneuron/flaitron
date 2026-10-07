# Layout, and working in the flaitron repo itself

> Lazy-loaded SPEC module. Read when adopting flaitron into a project, working **on** flaitron rather than with it, wiring skills into a platform, or naming a skill. Not needed to run a task. See `SPEC.md` for the always-loaded core spec.

## Layout in adopting projects

After adopting flaitron, a project looks like:

```text
<project>/
├── AGENTS.md                       # references .flaitron/core/SPEC.md
├── .flaitron/
│   ├── PLAN.md                     # project-owned roadmap (this format)
│   ├── tasknote/
│   │   ├── README.md               # one-line pointer + project-specific notes
│   │   ├── BE-014.md               # active tasknotes
│   │   └── archive/<area>/         # completed tasknotes by area
│   ├── specs/                      # optional; hand-copied spec-template.md drafts
│   ├── sidequest/                  # optional; /ft-file-followup --park stubs
│   └── core/                       # git submodule pinned to a flaitron version
└── ...
```

The `.flaitron/core/` submodule is **read-only** in adopting projects.
Edits go upstream to the flaitron repo and are pulled via deliberate version
bumps (see [`SPEC.md`](../SPEC.md) §"Versioning").

## Working in the flaitron repo itself

Flaitron does not submodule itself. In this repo:

- The repo-root `SPEC.md` IS the canonical reference.
- `SPEC/` — lazy SPEC modules loaded on demand by skills.
- `SPEC/fixtures/plan/` — cross-parser conformance fixtures for the `PLAN.md` task-line grammar (sample `.md` + expected `.json` pairs; consumer contract in [`SPEC/fixtures/plan/README.md`](fixtures/plan/README.md)). Cited from [`SPEC/plan-parser.md`](plan-parser.md); run by `viz/src/parser.test.ts`.
- `SPEC/procedures/` — agent-neutral procedure SOPs: the source-of-truth projection of execution procedures (e.g. the `/ft-task` 4-phase workflow) for non-Claude wiring and contract-only agents. Format + loading convention: [`SPEC/procedures/README.md`](procedures/README.md).
- The flaitron `.flaitron/PLAN.md` tracks flaitron's own development.
- `.flaitron/audit-overlay/SKILL.md` — flaitron-self's own `/audit` thin overlay
  over the bundled `ft-audit` scaffold. It lives here, not under `.claude/`,
  because `.claude/` is wholly gitignored and these deltas are this repo's own
  audit contract: they exist nowhere else and must be versioned.
  `.claude/skills/audit` is a directory symlink to it — per-machine wiring the
  operator re-creates from [`CONTRIBUTING.md`](../CONTRIBUTING.md) §"Developing flaitron skills & commands".
- The `templates/` folder holds the canonical tasknote templates (full, micro, starter, sidequest) plus spec, loop-heartbeat, audit-overlay (usage: [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.2.1), and subagent-probe templates, and the `PLAN.md` / `tasknote-README.md` seed files.
- `claude/` — Claude Code commands + skills (`/ft-task`, `/ft-release`, `/ft-new-project`, ...); the adopter snippet lives at `claude/AGENTS-snippet.md`.
- `codex/` — Codex skill wrappers for the full `ft-*` inventory plus Codex-specific wiring notes.
- `cursor/` — Cursor thin wiring (`AGENTS-snippet.md` + `procedures/ft-task.md` pointer; no skill wrappers — adopters wire canonical `claude/skills/` bodies).
- `grok/` — Grok thin wiring (`AGENTS-snippet.md` + `procedures/ft-task.md` pointer; no skill wrappers — adopters wire canonical `claude/skills/` bodies).
- `tools/` — operator-side fleet scripts. Currently `update-adopters.mjs`, the singular CLI carve-out documented in [`SPEC/scope-boundaries.md`](scope-boundaries.md), plus its portable `update-adopters.test.mjs` suite (a registered release gate).

Global-only utilities install per [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.0. `/ft-release` is flaitron-self-only and stays repo-scoped in this checkout ([`docs/PLATFORMS.md`](../docs/PLATFORMS.md) §"Installed-surface policy").

### Procedure SOPs (`SPEC/procedures/`)

`SPEC/procedures/*.md` files are a distinct artifact from the lazy SPEC
modules above: agent-neutral **procedure SOPs** that project an execution
procedure (e.g. the `/ft-task` 4-phase workflow) for contract-only agents.
They carry a different frontmatter shape — `procedure:` / `source:` /
`restates:` / `last-verified:` — and are loaded by thin per-agent pointer
wrappers (`<platform>/procedures/<procedure>.md`) rather than by the
`/ft-task` SKILL dispatch. Canonical schema + loading convention:
[`SPEC/procedures/README.md`](procedures/README.md).

## Skill namespace

Bundled flaitron skills carry the `ft-` prefix in their slug (`/ft-task`,
`/ft-release`, `/ft-new-project`,
`/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`,
`/ft-close-epic`, `/ft-refactor`,
`/ft-seed`, `/ft-update`, and the audit family
`/ft-audit{,-repo}`). The prefix
reserves the `ft-` slug namespace for flaitron-owned skills so adopter
projects can drop the bundle into `.claude/` without shadowing their own
skill names.

**Adopters MUST NOT use `ft-` for project-specific skills.** Reserve the
prefix for upstream flaitron. When forking the audit family per
[`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.2.1, name the fork **without**
the prefix (e.g., `audit-payments`, not `ft-audit-payments`) — the fork is
adopter-owned and the unprefixed name makes ownership clear in skill
resolution.

**Wrapper-name invariant (grep-able).** Every command wrapper
`claude/commands/<name>.md` names its own basename in its invoke sentence
(`` Invoke the `<name>` skill ``) — skill resolution must never depend on
the model inferring a prefixed name from an unprefixed one. Check (prints
nothing when clean):

```sh
for f in claude/commands/ft-*.md; do
  grep -q "\`$(basename "$f" .md)\`" "$f" || echo "$f"
done
```
