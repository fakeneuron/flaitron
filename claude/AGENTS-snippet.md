# Flowtron adoption snippet

Paste the block below into your project's `AGENTS.md`, then run the symlink commands once to wire flowtron's slash commands into your project's `.claude/`.

---

## Block to paste into AGENTS.md

<!-- KEEP IN SYNC: the peer-skill roster in the block below is also kept as a names-only list in AGENTS.md §Workflow (except `/ft-file-followup`'s park-priority flags, which Pair F requires on both surfaces); adding/removing a tasknote-family skill requires editing both. This comment sits outside the fence so adopters never paste it. Richer detail (stubs, gates) lives in SPEC/tasknote-selection.md and SPEC/gates.md — as of CORE-510 the paste-block names the skills and points there rather than restating them, so keep new detail out of the fence. Version-bump skills are checkout-specific: this adopter paste-block names `/ft-update`; the self-host AGENTS.md names `/ft-release`. This pairing also covers the path-convention bullet just below (Plans/tasknotes/archive locations) — both files describe the same layout in slightly different prose; editing one requires checking the other. -->

```markdown
## Workflow

This project uses **flowtron** for task tracking. The canonical workflow contract lives at `.flowtron/core/SPEC.md` — read it before starting non-trivial work.

- Plans live in `.flowtron/PLAN.md`. Once `## Completed` outgrows its bound, closed rows rotate verbatim into a sibling `.flowtron/PLAN-ARCHIVE.md` (append-only; absent until the first rotation) — contract: `.flowtron/core/SPEC/plan-filing.md` §"`## Completed` rotation".
- Tasknotes live in `.flowtron/tasknote/<TASK-ID>.md` while active and `.flowtron/tasknote/archive/<area>/<TASK-ID>.md` once closed.
- Start a task with `/ft-task <TASK-ID>` (e.g., `/ft-task BE-014`). The slash command scaffolds the tasknote from the flowtron template and drives Phase 1 Discovery before any code is written. Contract-only agents without `/ft-task`: load `.flowtron/core/<platform>/procedures/ft-task.md` (if one exists for your platform) — it routes to the agent-neutral SOP at `.flowtron/core/SPEC/procedures/ft-task.md`.
- Other filing skills for non-task-shaped work: `/ft-micro-task <ID>`, `/ft-file-followup [ID]` (`--park [--low|--med|--fut|--high]`, `--starter`), `/ft-epic-discovery`, `/ft-close-epic <ID>`. Which shape fits which work: `.flowtron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)"; epic lifecycle: `.flowtron/core/SPEC/epic.md`.
- Filing a new task and mid-flow direction-changing decisions run a **downstream-impact reconciliation** scan so the plan stays cohesive as it grows: the new task/decision is checked against existing active PLAN entries for stale / contradictory / redundant overlap, and one reconcile action (merge / nest / edit / delete / leave) is proposed per impacted entry behind a user-confirm gate — the plan is never auto-rewritten. Contract: `.flowtron/core/SPEC/tasknote-selection.md` §"Downstream-impact reconciliation".
- For independent children of a multi-child epic, the optional worktree convention (location `<p>-worktrees/wt-<ID>/` alongside the project checkout, branch `wt-<ID>`, tasknote copy) lets you execute siblings in parallel isolated checkouts. Convention and the four-command start / end procedure: `.flowtron/core/docs/WORKTREES.md` — no skill; run it by hand or ask the agent to.
- For bugs and unexpected behavior, `/ft-task <TASK-ID> --debug` adds a hypothesis-first cadence (expected/observed → ranked hypotheses → minimal repro → re-verify) inside Phase 1 Discovery, plus a Phase 3 obligation to re-run that exact repro after the fix. Soft scaffolding, not a gate; composes with `--fast` in either order.
- When a task is driven by an orchestrator or headless session with **no operator present**, add `--unattended` (on `/ft-task`, `/ft-micro-task`, or `/ft-close-epic`): gates nobody is there to answer **park** the tasknote (`status: blocked` plus a machine-readable `park-reason:` code) instead of firing a banner into an empty session. Never pass it together with `--fast`. What it supersets, what it never relaxes, and the per-gate conversion map: `.flowtron/core/SPEC/gate-postures.md` §"`--unattended` operator posture". `/ft-file-followup --unattended` files a deferred step with no operator present (`.flowtron/core/SPEC/plan-filing.md` §"Filing commits").
- For converge-until-a-check-passes work (a suite going green, a metric crossing a threshold), `/ft-task <TASK-ID> --loop` runs the Phase 2↔3 execute→verify cycle as an inline loop against a machine-checkable Acceptance target. Loop budget, per-cycle relevance gate, and autonomy semantics: `.flowtron/core/SPEC/loop.md`. The recurring-maintenance (heartbeat) shape ships as `.flowtron/core/templates/loop-heartbeat-template.md`.
- To seed `[unattended]` across a plan that predates per-row candidacy: `/ft-seed` — walks every open PLAN.md row with the candidacy predicate, shows the candidates inside one review gate, and writes the marker only on the rows you keep. Flowtron never writes it unconfirmed. Contract: `.flowtron/core/SPEC/unattended-candidacy.md` §"Seeding an existing plan".
- To bump the flowtron version pin: `/ft-update` — shows the current→target changelog, moves the submodule, adds symlinks for any newly shipped skills, runs a smoke check, and stages the commit.
- Before filing, a design worked out in conversation can be captured as a review-first spec: copy `.flowtron/core/templates/spec-template.md` to `.flowtron/specs/<slug>.md` and fill its six sections. A spec never files a PLAN.md line or scaffolds a tasknote. When to reach for one: `.flowtron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".
- `/ft-refactor <target> [--fast]` plans a behavior-preserving refactor of one named file, module, or subsystem: a read-only depth survey, then — on your go — an epic of starter-seeded children run through normal `/ft-task` cycles. It never edits source. When to reach for it: `.flowtron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".
- Standard tasknotes (`/ft-task`) run the 4-phase workflow in serial order per `.flowtron/core/SPEC.md` §"The 4-phase workflow", followed by the post-closure protocol (commit + next-task suggestion). Do not skip phases once a tasknote is open — whether a change needs a tasknote at all is decided by `.flowtron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)". `/ft-micro-task` uses a lighter single-section ceremony in place of the full 4-phase flow.
<!-- KEEP IN SYNC (CORE-519): mirrors AGENTS.md's "Do not skip phases" sentence — same claim, same SPEC/tasknote-selection.md pointer. Editing one requires checking the other. -->
<!-- KEEP IN SYNC (CORE-516): mirrors AGENTS.md:36 — same `[model]` concept, same SPEC/model.md pointer. Editing one requires checking the other. -->
- Each PLAN.md task line carries a `[model]` segment naming the model tier or name the task should run on end-to-end; adopters may use any short token. If the loaded model doesn't match, surface the mismatch before continuing. Contract: `.flowtron/core/SPEC/model.md` §"Model field".
- The `.flowtron/core/` submodule is read-only here. Edits go upstream to flowtron and arrive via deliberate version bumps — see `.flowtron/core/SPEC/versioning.md`. The pin is the submodule gitlink (`git -C .flowtron/core describe --tags`), also readable as the `**Version:**` line of `.flowtron/core/SPEC.md`; no project file restates it.
```

### Check that Claude Code loads it

Pasting is not loading. In a fresh session, confirm `AGENTS.md` is in context — ask the assistant to quote the `## Workflow` heading you just pasted, or check the context files the session reports loading. If it isn't there, don't paste the block a second time into `CLAUDE.md`; make `CLAUDE.md` resolve to the same file by running `ln -s AGENTS.md CLAUDE.md` from the project root.

If the project already has a real `CLAUDE.md` with Claude-only directives, keep it and add `@AGENTS.md` as an import line instead. Either way `AGENTS.md` stays the single source of the contract. Full rationale, the verification steps, and the same check for other agents' native context files: [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.3.

### Keeping `AGENTS.md` small — `.claude/rules/`

`AGENTS.md` is always loaded, so everything in it is paid for on every task — including the guidance that only matters in one subtree. Claude Code supports **path-scoped rules**: markdown files under `.claude/rules/` whose `paths:` frontmatter names globs, loaded only when a matching file is actually read (verified against Claude Code's docs 2026-09-06, [[CORE-535.1]]).

If your project is carrying frontend-only conventions, a `tools/` directory's constraints, or per-language style notes in `AGENTS.md`, that content is a good candidate to move:

```text
---
paths: ['frontend/**/*.tsx', 'frontend/**/*.ts']
---

Components use the design tokens in `frontend/src/styles/tokens.css`; never
hardcode a hex value.
```

Flowtron's per-file byte budgets for its own shipped surfaces are in [`docs/CONTEXT-BUDGET.md`](../docs/CONTEXT-BUDGET.md).

Two limits worth knowing before you move anything:

- **Do not move the paste-block.** It is the workflow contract and applies to every file in the project, so it is always relevant and belongs in `AGENTS.md`.
- **`.claude/rules/` is Claude Code only.** Codex, Cursor, Grok and other agents reading `AGENTS.md` will not see it. Anything a non-Claude agent must obey stays in `AGENTS.md`, even at the cost of bytes.

---

## One-time symlink wiring

**This block is the single source of truth for the adopter-wiring roster.** The
set of skills an adopting project installs is defined here and nowhere else.
Five surfaces are *derived* from it and must never be edited independently:

| Derived surface | Derivation |
|---|---|
| [`codex/AGENTS-snippet.md`](../codex/AGENTS-snippet.md) §"One-time skill wiring" | source `claude/skills/` → `codex/skills/`; dest `.claude/skills/` → `.agents/skills/`; commands dropped |
| [`cursor/AGENTS-snippet.md`](../cursor/AGENTS-snippet.md) §"One-time symlink wiring" | dest `.claude/skills/` → `.cursor/skills/`; commands dropped; source unchanged |
| [`grok/AGENTS-snippet.md`](../grok/AGENTS-snippet.md) §"One-time symlink wiring" | dest `.claude/skills/` → `.grok/skills/`; commands dropped; source unchanged |
| [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.6 | stages the destination paths this block creates |
| [`claude/skills/ft-new-project/SKILL.md`](skills/ft-new-project/SKILL.md) Steps 7–8 | stages and verifies the destination paths this block creates |

The last two derive their commands from this block at run time and restate no
path list. The three platform blocks stay literal `ln -s` lines — they are
copy-pasted by adopters and parsed by `tools/update-adopters.mjs`
(`wiredSkillKeys()`) and `/ft-update` Step 4 — so **adding or removing a skill
means editing this block first, then regenerating the three platform blocks by
substitution.** `/ft-release` §7.1's installed-surface check derives its expected
set from here and diffs all four blocks against it; there is no hand-maintained
roster left to drift.

Run these from the project root after adding the flowtron submodule at `.flowtron/core/`:

```sh
mkdir -p .claude/commands .claude/skills
ln -s ../../.flowtron/core/claude/commands/ft-task.md            .claude/commands/ft-task.md
ln -s ../../.flowtron/core/claude/commands/ft-micro-task.md      .claude/commands/ft-micro-task.md
ln -s ../../.flowtron/core/claude/commands/ft-file-followup.md   .claude/commands/ft-file-followup.md
ln -s ../../.flowtron/core/claude/commands/ft-epic-discovery.md  .claude/commands/ft-epic-discovery.md
ln -s ../../.flowtron/core/claude/commands/ft-close-epic.md      .claude/commands/ft-close-epic.md
ln -s ../../.flowtron/core/claude/skills/ft-task            .claude/skills/ft-task
ln -s ../../.flowtron/core/claude/skills/ft-micro-task      .claude/skills/ft-micro-task
ln -s ../../.flowtron/core/claude/skills/ft-file-followup   .claude/skills/ft-file-followup
ln -s ../../.flowtron/core/claude/skills/ft-epic-discovery  .claude/skills/ft-epic-discovery
ln -s ../../.flowtron/core/claude/skills/ft-close-epic      .claude/skills/ft-close-epic
ln -s ../../.flowtron/core/claude/commands/ft-update.md       .claude/commands/ft-update.md
ln -s ../../.flowtron/core/claude/skills/ft-update            .claude/skills/ft-update
ln -s ../../.flowtron/core/claude/commands/ft-refactor.md     .claude/commands/ft-refactor.md
ln -s ../../.flowtron/core/claude/skills/ft-refactor          .claude/skills/ft-refactor
ln -s ../../.flowtron/core/claude/commands/ft-seed.md         .claude/commands/ft-seed.md
ln -s ../../.flowtron/core/claude/skills/ft-seed              .claude/skills/ft-seed
```

The relative paths are intentional — they survive `git clone` and pin to whichever flowtron commit the submodule is checked out at. Commit the symlinks (`git add .claude/`).

The submodule also brings flowtron's own tasknote archive at `.flowtron/core/.flowtron/` (~14 MB, ~1,000 files) — flowtron's history, not this project's context. Keep it out of Grep, Glob, and `@file` with a `Read(./.flowtron/core/.flowtron/**)` deny rule in `.claude/settings.json`; the per-tool list and the rule's one cost are in [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.1.

This snippet wires the adopter-installed subset: tasknote family, `/ft-seed`, and `/ft-update`. Global utilities live in the user's agent home when desired; `/ft-release` is flowtron-self-only.

To verify Claude Code wiring: invoke `/ft-task` in a fresh Claude Code session. The command should appear in the menu (alongside the other wired adopter-subset skills) with the description from `commands/ft-task.md`. For Codex, use the sibling `codex/AGENTS-snippet.md` wiring and invoke the skill through `/skills` or `$ft-task`. For Cursor, Claude wiring is already enough (Cursor loads `.claude/skills/` as a compatibility surface); Cursor-only projects use the sibling `cursor/AGENTS-snippet.md` instead. For Grok, Claude, Codex, or Cursor wiring is already enough (Grok loads those dirs as compatibility surfaces); Grok-only projects use the sibling `grok/AGENTS-snippet.md` instead.

## Bumping the pinned flowtron version

Run `/ft-update` from the project root to bump the pin: it shows the current→target version + the annotated-tag changelog for confirmation, moves the submodule pin, re-wires symlinks for any newly shipped skills, runs a smoke check, and stages the bump with a proposed commit. The symlinks above don't change for *existing* skills — they always track whatever the submodule currently points at; `/ft-update` only adds a symlink when the bump ships a brand-new adopter-subset skill.

Manual equivalent, if `/ft-update` isn't wired: flowtron has no `CHANGELOG.md` — release notes and migration steps live in the annotated tag message (`git -C .flowtron/core show vX.Y.Z`) and the per-release tasknote in `.flowtron/core/.flowtron/tasknote/archive/core/`. Fetch + checkout the target tag inside `.flowtron/core`, then `git add .flowtron/core` to record the new pin (not `git submodule update`, which restores the current pin).

## Visualizer

The flowtron visualizer is a single global instance — run it **once per machine** from flowtron's own checkout, not from this project's `.flowtron/core/viz/`:

```sh
cd ~/code/flowtron/viz
npm install
npm run dev
```

It scans `${FLOWTRON_VIZ_WORKSPACE:-~/code}/*/.flowtron/PLAN.md` and renders every adopting project; the header-rail project selector swaps the active project. The header subhead shows task counts, in-progress count, and the flowtron version the selected project is using (from its `.flowtron/core/SPEC.md`). Port `5120` is pinned with `strictPort`, so a second instance fails fast. The adopter-side `.flowtron/core/viz/` still works for offline / submodule-pinned use, but the global instance above is the recommended path.
