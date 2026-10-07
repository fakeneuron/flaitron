# Flaitron Agent Guide

## Workflow

This repository is **flaitron** itself. The canonical workflow contract lives
in `SPEC.md`; read it before starting non-trivial work.

- Plans live in `.flaitron/PLAN.md`.
- Rotated `## Completed` rows live in `.flaitron/PLAN-ARCHIVE.md` (closed rows
  only, append-only — see `SPEC/plan-filing.md` §"`## Completed` rotation").
- Active tasknotes live in `.flaitron/tasknote/<TASK-ID>.md`.
- Completed tasknotes live in `.flaitron/tasknote/archive/<area>/<TASK-ID>.md`.
- Tasknote templates live in `templates/`.
- Lazy workflow modules live in `SPEC/` and are loaded when the task shape
  calls for them.
- Start a task with `/ft-task <TASK-ID>`; peer skills:
  `/ft-micro-task`,
  `/ft-file-followup` (`--park [--low|--med|--fut|--high]`, `--starter`),
  `/ft-epic-discovery`, `/ft-close-epic`, `/ft-task --debug`,
  `/ft-task --loop`, `/ft-refactor`, `/ft-release`.
  <!-- KEEP IN SYNC — guards the roster above AND the path-convention bullets
       (Plans / tasknotes / archive locations) further up this section. Mirror: the KEEP
       IN SYNC comment above claude/AGENTS-snippet.md's paste-block fence.
       1. The roster is names-only, except `/ft-file-followup`'s park-priority
          flags, which the Pair F release gate requires on both surfaces.
       2. Richer detail (stubs, gates) lives in SPEC/tasknote-selection.md and
          SPEC/gates.md — not in claude/AGENTS-snippet.md's paste-block, which
          since CORE-510 names the skills and points there.
       3. Adding or removing a tasknote-family skill still requires editing
          both rosters.
       4. Version-bump skills are checkout-specific: this self-host guide names
          `/ft-release`; the adopter paste-block names `/ft-update`.
       5. The path-convention bullets are described in both files in slightly
          different prose; editing one requires checking the other. -->
<!-- KEEP IN SYNC (CORE-516): mirrors the `[model]` bullet in claude/AGENTS-snippet.md's paste-block (guard: the KEEP IN SYNC comment above that fence) — same `[model]` concept, same SPEC/model.md pointer. Editing one requires checking the other. -->
- Each PLAN.md task line carries a `[model]` segment naming the model tier or name the task should run on end-to-end; on mismatch, surface it before continuing. Contract: `SPEC/model.md` §"Model field".
- Four bundled skills are utility-only, not part of the tasknote lifecycle
  above: `/ft-audit`, `/ft-audit-repo`, `/ft-new-project`, `/ft-seed`. Full roster + naming convention:
  `SPEC/layout.md` §"Skill namespace".

Flaitron self-hosts its own roadmap. For non-trivial edits, follow the
tasknote lifecycle: `SPEC.md` §"The 4-phase workflow". Do not skip phases
once a tasknote is open — whether a change needs a tasknote at all is
decided by `SPEC/tasknote-selection.md` §"When to use a tasknote (and when
not to)".
<!-- KEEP IN SYNC (CORE-519): mirrors claude/AGENTS-snippet.md's "Do not
     skip phases" sentence — same claim, same SPEC/tasknote-selection.md
     pointer. Editing one requires checking the other. -->

## Repo Layout

- `README.md` — top-level project overview and entry point.
- `SECURITY.md` — security policy and vulnerability reporting.
- `CONTRIBUTING.md` — contributor guide: maintenance model, filing issues, PR process, local skill wiring.
- `.github/` — GitHub-specific config (CI workflow: `workflows/ci.yml`; Dependabot security-update config: `dependabot.yml`).
- `justfile` — `just` recipes (`setup`/`dev`/`test`/`lint`/`typecheck`/`build`) that delegate to the `viz/` npm scripts; §"Validation" below stays the roster of record.
- `SPEC.md` — canonical workflow contract.
- `SPEC/` — lazy modules for epics, starter tasks, blocked tasks, model
  routing, gate machinery, flag postures, the operator-cue vocabulary,
  versioning, tasknote selection, PLAN.md filing, loop tasks, the post-closure
  protocol, repo layout,
  PLAN parser tolerances, task-line segment semantics, scope boundaries,
  optional tasknote inserts, superseded claims, `[unattended]` candidacy, and
  `SPEC/procedures/` agent-neutral SOPs, and `SPEC/fixtures/plan/` task-line
  grammar conformance fixtures.
- `.flaitron/` — flaitron's own plan and tasknotes, plus `audit-overlay/SKILL.md`:
  the tracked body of flaitron-self's `/audit` thin overlay, which
  `.claude/skills/audit` symlinks to (`.claude/` is wholly gitignored, so the
  overlay's deltas would be unversionable there — `SPEC/layout.md`).
- `claude/` — Claude Code wiring: commands, skills, and the historical
  source for the agent-neutral adopter snippet.
- `codex/` — Codex CLI skill wrappers and wiring notes.
- `cursor/` — Cursor thin wiring (snippet + `ft-task` procedure pointer; no skill wrappers).
- `grok/` — Grok thin wiring (snippet + `ft-task` procedure pointer; no skill wrappers).
- `docs/` — supporting docs, conventions, migration, platform compatibility,
  design rationale, and `CONTEXT-BUDGET.md` (per-file byte budgets, enforced
  in CI and at release).
- `templates/` — canonical markdown templates.
- `tools/` — operator-side fleet scripts (`update-adopters.mjs` + tests).
- `viz/` — Vite/React/TypeScript visualizer (module tiers + no-Node-under-`src/ui/` rule: [`viz/README.md`](viz/README.md)).

## Validation

Use the narrowest validation that covers the change. For visualizer work, run
the main commands from the repository root (the directory containing the
`viz/` subdirectory):

```sh
npm --prefix viz test
npm --prefix viz run typecheck
npm --prefix viz run lint
npm --prefix viz run build
```

If your shell is already inside `viz/` (common when iterating on the UI), drop
the `--prefix viz` and run the bare forms (`npm test`, `npm run typecheck`, etc.).

For the fleet updater, run its portable zero-dependency suite and syntax checks
from the repository root:

```sh
node --test tools/update-adopters.test.mjs
node --check tools/update-adopters.test.mjs
node --check tools/update-adopters.mjs
```

The suite is a release gate; do not substitute a live adopter-fleet dry run or
an `--apply` operation for it.

CI's `drift` job additionally runs Pair R, grepping every checked
`.flaitron/PLAN.md` / `.flaitron/PLAN-ARCHIVE.md` stub row for the
`| shortname` `SPEC/plan-filing.md` §"`## Completed` archive convention"
requires — additive to the seven commands above, not part of the
`validate`-job "passing" roster `/ft-release` §7.1 Pair H binds byte-for-byte
(same relationship as the gitleaks scan in `docs/CONVENTIONS.md` §"GitHub
Actions CI").

## Dev Server

To preview the visualizer locally, start the dev server from the repository root:

```sh
npm --prefix viz run dev
```

The visualizer dev server is pinned to port `5120` with `strictPort`.

## Editing Rules

- Treat archived tasknotes as historical records; do not rewrite them unless
  a specific workflow step requires it.
- Preserve user-owned worktree changes. Check `git status --short` before
  broad edits.
- Keep markdown GitHub-Flavored Markdown compatible.
- Follow `.editorconfig`: UTF-8, LF endings, 2-space indentation, trim
  trailing whitespace, final newline.
- This repo is not an adopter checkout. There is no `.flaitron/core/`
  submodule here; `SPEC.md` at the root is the source of truth.

## Platform Notes

Claude Code has shipped wiring under `claude/`. Codex CLI has first-class
skill wrappers under `codex/` for the full `ft-*` inventory; `ft-task` routes
through `SPEC/procedures/`. Cursor has a thin sibling under `cursor/`
(`AGENTS-snippet.md` + procedure pointer; adopters wire canonical
`claude/skills/` bodies into `.cursor/skills/` or reuse `.claude/`). Grok
has a thin sibling under `grok/` (`AGENTS-snippet.md` + procedure pointer;
adopters reuse Claude/Codex/Cursor wiring or symlink canonical
`claude/skills/` bodies into `.grok/skills/`). Other agents consume the
contract conversationally through this file and `SPEC.md`.
