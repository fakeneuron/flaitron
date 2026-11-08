# flaitron Agent Guide

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
  `/ft-file-task` (`--park`, `--starter`; flags: `SPEC/tasknote-selection.md`),
  `/ft-open-epic` (`--deep`), `/ft-close-epic`, `/ft-refactor`, `/ft-release`.
- `/ft-task` flags: `--debug` (hypothesis-first bug cadence), `--loop` (iterate
  Phase 2↔3 to a machine-checkable target — `SPEC/loop.md`), `--micro`
  (one `## ⚡ Notes` log in place of the phase checklists), `--fast`
  (suppresses conditional gates; `/ft-refactor`'s own `--fast` only skips
  its review pause),
  and `--unattended` (no operator present: gates park the tasknote instead of
  asking; never together with `--fast` — `SPEC/gate-postures.md`
  §"`--unattended` operator posture"). `/ft-close-epic` and `/ft-file-task`
  take `--unattended` too.
  <!-- KEEP IN SYNC — guards the roster above AND the path-convention bullets
       (Plans / tasknotes / archive locations) further up this section. Mirror: the KEEP
       IN SYNC comment above claude/AGENTS-snippet.md's paste-block fence.
       1. The skill roster carries names plus per-skill flags, no stubs or
          gate detail (only the snippet's roster carries arguments); `/ft-task` flags live on the flags line
          beside it, mirrored in claude/AGENTS-snippet.md's paste-block.
       2. Richer detail (stubs, gates) lives in SPEC/tasknote-selection.md and
          SPEC/gates.md — not in claude/AGENTS-snippet.md's paste-block, which
          since CORE-510 names the skills and points there.
       3. Adding or removing a tasknote-family skill or `/ft-task` flag still
          requires editing both rosters.
       4. Version-bump skills are checkout-specific: this self-host guide names
          `/ft-release`; the adopter paste-block names `/ft-update`.
       5. The path-convention bullets are described in both files in slightly
          different prose; editing one requires checking the other.
       6. `pair_s` (tools/drift-checks.sh) checks the flags line, the
          do-not-skip sentence, and the peer-skill slugs. -->
<!-- KEEP IN SYNC (CORE-516): mirrors the `[model]` bullet in claude/AGENTS-snippet.md's paste-block (guard: the KEEP IN SYNC comment above that fence) — same `[model]` concept, same SPEC/model.md pointer. Editing one requires checking the other. -->
- Each PLAN.md task line carries a `[model]` segment naming the model tier or name the task should run on end-to-end; on mismatch, surface it before continuing. Contract: `SPEC/model.md` §"Model field".
- Five bundled skills are utility-only, not part of the tasknote lifecycle
  above: `/ft-adopt`, `/ft-audit`, `/ft-audit-repo`, `/ft-import-task`, `/ft-seed-unattended`. Full roster + naming convention:
  `SPEC/layout.md` §"Skill namespace".

flaitron self-hosts its own roadmap. For non-trivial edits, follow the
tasknote lifecycle: `SPEC.md` §"The 4-phase workflow". Do not skip phases
once a tasknote is open — whether a change needs a tasknote at all is
decided by `SPEC/tasknote-selection.md` §"When to use a tasknote (and when
not to)".
<!-- KEEP IN SYNC (CORE-519): mirrors claude/AGENTS-snippet.md's "Do not
     skip phases" sentence — same claim, same SPEC/tasknote-selection.md
     pointer. Editing one requires checking the other. -->

## Repo Layout

`README.md` and `SPEC/layout.md` §"Working in the flaitron repo itself" carry
the fuller map; `ls` covers the rest. Know these before editing:

- `SPEC.md` + `SPEC/` — the workflow contract and its lazy modules (incl.
  `SPEC/procedures/` SOPs and `SPEC/fixtures/plan/` grammar fixtures);
  `SPEC/layout.md` is the module and skill-namespace map.
- `.flaitron/` — flaitron's own plan and tasknotes, plus `audit-overlay/SKILL.md`:
  the tracked body of flaitron-self's `/audit` thin overlay, which
  `.claude/skills/audit` symlinks to (`.claude/` is wholly gitignored, so the
  overlay's deltas would be unversionable there — `SPEC/layout.md`).
- `claude/`, `codex/`, `cursor/`, `grok/` — per-agent wiring; `claude/` holds
  the skills and the adopter snippet (`claude/AGENTS-snippet.md`).
- `docs/` — supporting docs; `docs/CONTEXT-BUDGET.md` holds per-file byte
  budgets, enforced in CI and at release.
- `brand/` — public identity kit; contract in `brand/README.md`.
- `tools/`, `install.sh`, `justfile` — fleet scripts, drift checks, the
  one-line installer (a CLI carve-out per `SPEC/scope-boundaries.md`), and
  `just` recipes; `just check` runs the §"Validation" roster plus
  `bash tools/drift-checks.sh`, and §"Validation" stays the roster of record.
- `viz/` — the visualizer (module tiers + no-Node-under-`src/ui/` rule:
  [`viz/README.md`](viz/README.md)).

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

For the drift checks, run their self-test from the repository root. It seeds one
known drift per `tools/drift-checks.sh` check into a temp copy and asserts the
check fails on it:

```sh
node --test tools/drift-checks.test.mjs
```

For the installer, run shellcheck and its sandboxed end-to-end test (needs the
network; it never touches the real `~`). CI runs both in the separate,
path-filtered `install-test.yml`, not in the eight-command roster above:

```sh
shellcheck -s sh install.sh tools/install.test.sh
sh tools/install.test.sh install.sh
```

CI's `drift` job runs every check in `bash tools/drift-checks.sh` — Pair Q
section citations, final newlines, context budgets, and Pair R's grep of
checked PLAN stub rows for the `| shortname` that
`SPEC/plan-filing.md` §"`## Completed` archive convention" requires, among
others. Run it locally after markdown edits; naming a check
(`bash tools/drift-checks.sh pair_q`) runs only that one. It is additive to
the eight commands above, not part of the `validate`-job "passing" roster
`/ft-release` §7.1 Pair H binds byte-for-byte (same relationship as the
gitleaks scan in `docs/CONVENTIONS.md` §"GitHub Actions CI").

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
