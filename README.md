# flaitron

<p align="center">
  <img src="LOGO.webp" alt="flaitron logo" width="200">
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/github/license/fakeneuron/flaitron?style=flat-square&color=blue" alt="License: MIT"></a>
  <a href="https://github.com/fakeneuron/flaitron/releases"><img src="https://img.shields.io/github/v/release/fakeneuron/flaitron?style=flat-square&label=version&color=brightgreen" alt="Latest version"></a>
  <a href="https://github.com/fakeneuron/flaitron/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/fakeneuron/flaitron/ci.yml?style=flat-square" alt="CI build status"></a>
</p>

A lightweight, project-agnostic tasknote system for solo AI-assisted coding.
One source of truth, consumed by adopting projects via git submodule.

The goal: catch the agent before it wastes a session. The four phases, the
relevance gate, and the acceptance criteria are the checkpoints where you
look — and one task per context window keeps each one small enough to
actually review. No scripts, daemons, databases, or schemas to maintain.

![The flaitron visualizer showing flaitron's own PLAN.md — open tasks by priority, phase-progress dots, and the completed archive](.flaitron/screenshots/viz-board.png)

Flaitron is built with flaitron: **1062 tasks** closed through this exact
workflow between 2026-04-28 and 2026-10-03 (as of 2026-10-03) — each one with
a tasknote preserved in [`.flaitron/tasknote/archive/`](.flaitron/tasknote/archive/).
Count and date range are recomputed each release by `/ft-release` §7.1's
"Standing README task-counter check" (one archived tasknote per closed task,
standalone or epic child) — see `claude/skills/ft-release/step-7.1-standing-checks.md`.

## Quickstart

**Once per machine** — clone flaitron anywhere and wire the bootstrap skill:

```sh
git clone https://github.com/fakeneuron/flaitron.git ~/code/flaitron
mkdir -p ~/.claude/skills ~/.claude/commands
ln -s ~/code/flaitron/claude/skills/ft-new-project      ~/.claude/skills/ft-new-project
ln -s ~/code/flaitron/claude/commands/ft-new-project.md ~/.claude/commands/ft-new-project.md
```

**Once per project** — from the project root (a git repo with an `AGENTS.md`
or `CLAUDE.md`):

```sh
/ft-new-project
```

That adds the flaitron submodule, wires the adopter skill subset — the tasknote
family, `/ft-seed`, and `/ft-update`, whose exact roster is the
`ln -s` block in [`claude/AGENTS-snippet.md`](claude/AGENTS-snippet.md)
§"One-time symlink wiring" — and drops in the `.flaitron/` skeleton in one
pass. Then file a task in `.flaitron/PLAN.md` and run it:

```sh
/ft-task CORE-001
```

Prefer to wire it by hand, or not using Claude Code?
[docs/MIGRATION.md](docs/MIGRATION.md) carries the manual path (§1.1–1.7), the
full one-time global-install table (§1.0), and Codex / Cursor / Grok wiring (§1.2).
Grok is Cursor-shaped — it scans `.claude/skills/`, `.agents/skills/`, and
`.cursor/skills/`, so existing Claude, Codex, or Cursor wiring already
serves it; Grok-only projects follow [`grok/AGENTS-snippet.md`](grok/AGENTS-snippet.md).

<details>
<summary><b>All documentation</b></summary>

- [SPEC.md](SPEC.md) — canonical workflow contract (4-phase tasknote
  lifecycle, relevance gate, paper-complete guard, versioning rules)
- [docs/PHILOSOPHY.md](docs/PHILOSOPHY.md) — the "why": drift across prior
  per-project workflows and the principles that stuck
- [docs/VISION.md](docs/VISION.md) — outward-facing identity: who flaitron
  is for, the principles (recap of SPEC), and the PR/suggestion archetypes
  flaitron deliberately rejects
- [docs/GLOSSARY.md](docs/GLOSSARY.md) — alphabetized one-line definitions for
  ~73 load-bearing terms, phases, markers, and grammar elements (lazy-loaded
  pointer to SPEC anchors)
- [docs/MIGRATION.md](docs/MIGRATION.md) — adoption guide for fresh projects
  and migration from a prior workflow system
- [docs/CONVENTIONS.md](docs/CONVENTIONS.md) — conventions flaitron adheres to
  (Conventional Commits, SemVer, GFM, Diátaxis, GitHub Actions CI) and
  declines (CHANGELOG, ADR registry, release automation, pre-commit hooks, MCP
  servers, package-manager / marketplace distribution, template override
  stacking) with rationale
- [docs/VERSION-HISTORY.md](docs/VERSION-HISTORY.md) — curated, moderately-coarse
  release highlights (not a CHANGELOG); full notes live in annotated tags
- [docs/AGENT-NEUTRALITY.md](docs/AGENT-NEUTRALITY.md) — agent-neutrality
  contract: which contract-layer Claude-specific surfaces are intentional
  (load-bearing locators for the Claude Code wiring layer) and why
- [docs/PLATFORMS.md](docs/PLATFORMS.md) — multi-platform wiring pattern:
  the two-layer model (agent-neutral contract / per-platform wiring) and
  the symmetric plug-in shape by which platforms plug in (Claude Code and
  Codex CLI full wiring; Cursor and Grok thin siblings (Grok is
  Cursor-shaped: `.claude/skills/` / `.agents/skills/` / `.cursor/skills/`
  compat plus Grok-only `.grok/skills/`); others conversational)
- [docs/AGENT-COMPAT.md](docs/AGENT-COMPAT.md) — living agent-compatibility
  matrix: which AI coding agents flaitron supports, their contract
  entry-points, skill primitives, and last-verified currency
- [docs/DOGFOOD.md](docs/DOGFOOD.md) — pasteable verification procedure any AI
  agent runs to confirm flaitron compatibility and refresh its
  `docs/AGENT-COMPAT.md` `last-verified` row
- [docs/WORKTREES.md](docs/WORKTREES.md) — worktree convention for parallel
  epic children: the five locked decisions (location, branch naming,
  skill naming, tasknote handling, cleanup) and the four-command start / end procedure
- [docs/HARNESS-SURVEY.md](docs/HARNESS-SURVEY.md) — dated comparisons of
  flaitron against contemporary harnesses and trackers: differentiators, gaps,
  overkill, and the seed list for the next wider pass
- [docs/GATE-DISCIPLINE.md](docs/GATE-DISCIPLINE.md) — historical catalog of
  gate-skip excuses and observer symptoms, moved out of `SPEC/gate-discipline.md`
  after the CORE-659 decay window recorded no independent recurrence
- [docs/CODEX-VERIFICATION.md](docs/CODEX-VERIFICATION.md) — dated Codex
  installation receipt (CORE-677.2): discovery and repair observations
- [docs/CONTEXT-BUDGET.md](docs/CONTEXT-BUDGET.md) — per-file byte budgets for
  the surfaces an agent loads to run one task, the measured ledger behind them,
  and the CI and release-time checks that keep them honest
- [docs/EXTERNAL-AGENTS.md](docs/EXTERNAL-AGENTS.md) — handing a single
  tasknote off to an external CLI agent (Kiro / Claude Code / Codex): the
  one-agent-per-tasknote rule, the handoff contract, worktree isolation for
  parallel runs, and the orchestration contract a caller running tasknotes
  with nobody watching reports to — convention and contract only, no
  orchestration runtime
- [CONTRIBUTING.md](CONTRIBUTING.md) — solo-maintenance model, how to file
  issues, when PRs make sense
- [SECURITY.md](SECURITY.md) — threat model (prompt injection via
  user-authored markdown, submodule supply-chain trust, viz dev-server
  scope) and how to report a vulnerability

</details>

## Visualizer

`viz/` is a read-only view of every flaitron-adopting project under
your workspace — a priority-grouped list by default, with an optional
board mode. Open tasks with an active tasknote in
each project's `.flaitron/tasknote/` are flagged **In progress**. The
header-rail project selector swaps the active project;
the header subhead shows task counts, in-progress count, and the flaitron
version the selected project is using (from its `.flaitron/core/SPEC.md`).
Each project chip carries a version-currency dot — green when the project is
pinned at the latest released flaitron tag, red when it's behind, none when
no pin is readable. Filters and scroll position reset on switch.

Run **once per machine** from flaitron's own checkout — there is no
per-project install step. The dev server is pinned to port `5120` with
`strictPort`, so a second instance fails fast rather than scanning the same
workspace on a different port.

```sh
cd ~/code/flaitron/viz
npm install
npm run dev
```

The scanner globs `${FLAITRON_VIZ_WORKSPACE:-~/code}/*/.flaitron/PLAN.md` to
discover projects; the directory name (e.g., `myproject`) becomes the project
label. Dirs without a `.flaitron/PLAN.md` are silently skipped. Set
`FLAITRON_VIZ_WORKSPACE` if your projects live somewhere other than
`~/code/`. Discovery (and the latest-release tag) runs once at dev-server
start — restart to pick up newly adopted or removed projects, or a tag cut
mid-session; live updates cover file changes inside already-discovered
projects only.

Adopter projects' own `.flaitron/core/viz/` continues to work (read-only
submodule, unchanged) but is no longer the recommended path — prefer the
single global instance above.

## Working in markdown vaults

Flaitron is editor-agnostic — markdown files in git remain the source of
truth — but two of its choices happen to fit markdown-vault tools
(Obsidian, Foam, Logseq) natively:

- The `[[TASK-ID]]` cross-references in tasknote bodies are standard
  wikilink syntax (clickable links + surfaced in graph views).
- The YAML frontmatter on every tasknote (`status`, `tags`, `due`,
  `related-tasks`) is the shape vault-tool query plugins consume.

**Obsidian.** Open the project root (or just `.flaitron/`) as a vault and
tasknotes become a queryable, graph-viewable knowledge base with no extra
wiring. A minimal
[Dataview](https://blacksmithgu.github.io/obsidian-dataview/) snippet
(Obsidian-only) to list open tasks:

````markdown
```dataview
TABLE status, due
FROM ".flaitron/tasknote"
WHERE status != "completed"
SORT due
```
````

**Foam.** Wikilinks (including `[[note#Section]]` and `[[note|alias]]`)
and the graph view work out of the box in VS Code. No built-in query
plugin equivalent to Dataview.

**Logseq.** Wikilinks resolve natively. Frontmatter caveat: Logseq's
preferred form is block-properties (`key:: value`), not YAML — flat
markdown-with-YAML vaults still load, but querying tasknote metadata
uses Logseq's `:query` syntax rather than Dataview.

These tools are opt-in companion surfaces. None of the above is required.

## Agent memory

Autonomous AI coding agents — Claude Code sessions, sub-agents, fresh
context windows — need persistent memory that survives the context window:
state on disk they can reload and resume from. Flaitron's markdown state
model already is that layer:

- `PLAN.md` — durable intent: priorities, open tasks, and recent
  `## Completed` history in one scannable, git-versioned file. Older closed
  rows rotate verbatim to a sibling `PLAN-ARCHIVE.md` so the active plan
  stays bounded ([SPEC/plan-filing.md](SPEC/plan-filing.md)
  §"`## Completed` rotation"); nothing is ever deleted.
- `tasknote/<ID>.md` — working state for the active task: goal,
  acceptance criteria, subtasks, and the phase log. A fresh session (or a
  sub-agent handed the task) reads one file and picks up where the last
  context window stopped — and a session ending mid-task can leave an
  optional `## 🔄 Handoff` brief
  ([SPEC/tasknote-inserts.md](SPEC/tasknote-inserts.md)) to make that read cheaper still.
- `archive/<area>/` — long-term memory: one file per completed task,
  preserving decisions, regressions, and rationale. The Phase 1 archive
  skim ([SPEC.md](SPEC.md) §"📝 Phase 1: Discovery") is the recall step —
  grep the archive for prior work on the files in scope before acting.
- Git history — provenance and time-travel for all of the above; the
  memory is diffable, revertable, and reviewable like any other source.

There is no memory database, vector store, or server here — markdown
files in git are the memory. Nothing to enable: the workflow writes this
layer as a side effect of doing the work.

## Sessions, loops, and sub-agents

"One task per context window" ([SPEC.md](SPEC.md) Core Principle #3) has
an operator-side half: the reset *between* tasks. The assistant cannot
clear its own context — the post-closure cue ("Clear your session, then
run: …") hands that step to the operator. An agent that chains tasks
autonomously in one session skips the reset and accretes context; an
*unbounded* sub-agent — one turned loose without a stated scope or a
defined thing to return — starts a fresh context outside the workflow's
gates and archive trail. Neither breaks flaitron — but both quietly drop
the discipline the sizing principle depends on. The safe patterns:

- **One tasknote per session.** A fresh session *is* the reset, and it's
  cheap: the tasknote is the resume point (§"Agent memory" above), so
  starting cold costs one file read, not a re-discovery.
- **One worktree + fresh session per independent epic child.** For
  parallel work, isolate each child in its own checkout and context —
  the locked convention in [docs/WORKTREES.md](docs/WORKTREES.md).
- **`--fast` for within-task autonomy.** Passing `--fast` to `/ft-task`
  suppresses the routine operator gates on a single run — the sanctioned
  hands-off mode. It makes one task autonomous; it is not a license to
  chain tasks in one window.
- **`--unattended` for when nobody's there to ask.** `--fast` still
  assumes an operator who could answer a gate if one fired; `--unattended`
  declares that no one is — an orchestrator's child, a scheduled run, a
  session with no one watching. It supersets `--fast`'s autonomy — not
  its delegations, so the 👁️ visual check `--fast` hands to a present
  operator is one of the gates that converts — and where `--fast` would
  still let a gate fire, `--unattended` parks the tasknote instead of
  firing a banner into an empty session
  ([`SPEC/gate-postures.md`](SPEC/gate-postures.md) §"`--unattended` operator posture").
  The contract lives in flaitron; the runtime that decides *when* to run
  unattended is still the caller's.
- **A delegate gets exactly one tasknote.** A delegated context that
  reads one `tasknote/<ID>.md` and works its scope inherits the full
  Phase 1 record and runs the 4-phase workflow to closure. Anything
  broader belongs to the operator's session.
- **A probe owns no tasknote.** The other safe delegation: a bounded,
  read-only sub-agent that answers one question for the session holding
  the tasknote — "which files define X", "does this pattern exist
  anywhere else". It reads and searches, returns a distilled summary,
  and ends. It never runs Phase 1, never trips a gate, never closes or
  archives anything. The point is that the *noise* stays in the probe:
  the parent's Discovery Notes get the findings, not fifty tool calls.
  Brief and return shape:
  [templates/subagent-probe-template.md](templates/subagent-probe-template.md).
  Phase 3's **external review** is the one probe with a fixed question:
  grade this diff against the tasknote's Acceptance criteria. It matters
  that the grader is not the author — self-evaluation is unreliable even
  where the criteria are machine-checkable — and it grades without ever
  patching. Claude Code runners use `/code-review medium`; everyone else uses
  the review-probe variant of the same brief.

This is guidance, not machinery — but the loop case has a contract.
Flaitron ships no loop *runtime*: the runner, scheduler, and session
lifetime are Claude Code's `/loop` (or any equivalent), by design
([docs/VISION.md](docs/VISION.md) §"What we won't accept"). What flaitron
*does* ship is the markdown **contract a loop reports to** — how gates
collapse, when a loop parks, and how iterations are logged — in
[SPEC.md](SPEC.md) §"Loop tasks" ([SPEC/loop.md](SPEC/loop.md)). The
runtime lives in the runner; the contract lives in flaitron.

## Repo layout

- `SPEC.md` — workflow contract (authoritative)
- `SPEC/` — lazy SPEC modules (epic, starter, blocked, model, versioning, gates, gate-postures, cue-vocabulary, gate-discipline, post-closure, tasknote-selection, plan-filing, loop, layout, plan-parser, task-line-segments, scope-boundaries, tasknote-inserts, purpose-blurb, superseded-claims, unattended-candidacy) plus `procedures/` (pasteable skill procedures) and `fixtures/plan/` (task-line grammar conformance fixtures shared by every PLAN.md parser); loaded on demand by skills
- `templates/` — canonical tasknote templates (full, micro, starter, sidequest) plus spec, loop-heartbeat, audit-overlay, and subagent-probe templates, and the `PLAN.md` / `tasknote-README.md` seed files
- `claude/` — Claude Code skills + slash commands (adopter-facing snippet plus the full shipped `ft-*` inventory; adopter projects wire the policy subset, while flaitron-self-only skills like `/ft-release` stay upstream-only)
- `codex/` — Codex skill wrappers for the full `ft-*` inventory plus Codex-specific wiring notes
- `cursor/` — Cursor thin wiring (`AGENTS-snippet.md` + `procedures/ft-task.md` pointer; no skill wrappers — adopters wire canonical `claude/skills/` bodies)
- `grok/` — Grok thin wiring (`AGENTS-snippet.md` + `procedures/ft-task.md` pointer; no skill wrappers — adopters wire canonical `claude/skills/` bodies)
- `docs/` — philosophy, vision, glossary, migration, conventions, version history, agent-neutrality, platforms, agent-compat, dogfood, worktrees, gate-discipline, external-agents, harness-survey, codex-verification, and context-budget docs
- `.flaitron/` — flaitron's own roadmap and tasknotes (self-hosted)
- `viz/` — Vite/React visualizer (priority-grouped list + optional board mode)
- `tools/` — operator-side fleet scripts (`update-adopters.mjs`, the singular CLI carve-out — see `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" — plus its portable `update-adopters.test.mjs` suite)
- `CONTRIBUTING.md` — solo-maintenance model; issue and PR guidance
- `SECURITY.md` — threat model and vulnerability reporting
- `LICENSE` — MIT
- pre-v0.1.0 source preserved in git tag `legacy-pre-v0.1.0`

## Version

See [SPEC.md](SPEC.md) for the current contract version, the repo's git tags
for full release notes, and [docs/VERSION-HISTORY.md](docs/VERSION-HISTORY.md)
for a curated, moderately-coarse highlight reel.

Adopting projects pin a specific flaitron commit via git submodule and bump
deliberately. Each release tag's annotated message lists migration steps for
major bumps (no separate `CHANGELOG.md`).

Flaitron is solo-maintained with a personal adopter fleet. The major version
number counts breaking changes from the May 2026 rapid-iteration period
(v1.0.0 → v5.0.0 in 25 days), not project maturity — the contract was
break-free from v5.0.0 (2026-06-01) until v6.0.0, the one-time
flowtron → flaitron rename (`.flowtron/` → `.flaitron/`). Existing adopters
follow
[docs/MIGRATION.md](docs/MIGRATION.md) §"Upgrading an existing adopter from v5.x".

## License

Flaitron is [MIT-licensed](LICENSE).
