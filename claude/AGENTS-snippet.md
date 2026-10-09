# Flaitron adoption snippet

Paste the block below into your project's `AGENTS.md`, then run the symlink commands once to wire flaitron's skills into your project's `.claude/`.

---

## Block to paste into AGENTS.md

<!-- KEEP IN SYNC with AGENTS.md §Workflow. All three guards sit outside the fence so adopters never paste them; editing one side requires checking the other.
1. Peer-skill roster: names-only on both surfaces; adding/removing a tasknote-family skill edits both. Richer detail (stubs, gates) lives in SPEC/tasknote-selection.md and SPEC/gates.md — since CORE-510 the block names skills and points there, so keep new detail out of the fence. Version-bump skills are checkout-specific: this block names `/ft-update`, the self-host AGENTS.md names `/ft-release`. The pairing also covers the Plans/tasknotes/archive path bullets — same layout, slightly different prose.
2. (CORE-519) The "Do not skip phases" sentence — same claim, same SPEC/tasknote-selection.md pointer.
3. (CORE-516) The `[model]` bullet — same concept, same SPEC/model.md pointer. -->

```markdown
## Workflow

This project uses **flaitron** for task tracking. The canonical workflow contract lives at `.flaitron/core/SPEC.md` — read it before starting non-trivial work.

- Plans live in `.flaitron/PLAN.md`. Once `## Completed` outgrows its bound, closed rows rotate verbatim into an append-only `.flaitron/PLAN-ARCHIVE.md` (absent until the first rotation) — `.flaitron/core/SPEC/plan-filing.md` §"`## Completed` rotation".
- Tasknotes live in `.flaitron/tasknote/<TASK-ID>.md` while active and `.flaitron/tasknote/archive/<area>/<TASK-ID>.md` once closed.
- Start a task with `/ft-task <TASK-ID>`: it scaffolds the tasknote and drives Phase 1 Discovery before any code is written. Agents without `/ft-task` follow `.flaitron/core/SPEC/procedures/ft-task.md` (via `.flaitron/core/<platform>/procedures/ft-task.md` where one exists).
- `/ft-task` flags: `--debug` (hypothesis-first bug cadence), `--loop` (iterate Phase 2↔3 to a machine-checkable target — `.flaitron/core/SPEC/loop.md`), `--fast` (suppresses conditional gates; also on `/ft-micro-task` and `/ft-refactor`), and `--unattended` (no operator present: gates park the tasknote instead of asking; never together with `--fast` — `.flaitron/core/SPEC/gate-postures.md` §"`--unattended` operator posture"). `/ft-micro-task`, `/ft-close-epic`, and `/ft-file-task` take `--unattended` too.
- Peer skills: `/ft-micro-task <ID>`, `/ft-file-task [ID]` (`--park`, `--starter`), `/ft-open-epic`, `/ft-close-epic <ID>`, `/ft-refactor <target>` (plans only: a read-only survey, then an epic of children — it never edits source). Which shape fits which work: `.flaitron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)"; epics: `.flaitron/core/SPEC/epic.md`.
- Utilities: `/ft-seed-unattended` seeds `[unattended]` across an existing plan and never writes it unconfirmed (`.flaitron/core/SPEC/unattended-candidacy.md` §"Seeding an existing plan"); `/ft-update` bumps the flaitron pin.
- Filing a task, or a mid-flow decision that changes direction, runs a downstream-impact reconciliation scan against active PLAN entries; the plan is never rewritten without your confirm — `.flaitron/core/SPEC/tasknote-selection.md` §"Downstream-impact reconciliation".
- Optional, by hand: parallel epic children in worktrees (`.flaitron/core/docs/WORKTREES.md`), review-first specs that never file or scaffold (`.flaitron/core/templates/spec-template.md` → `.flaitron/specs/<slug>.md`), recurring heartbeat loops (`.flaitron/core/templates/loop-heartbeat-template.md`).
- Standard tasknotes (`/ft-task`) run the 4-phase workflow in serial order per `.flaitron/core/SPEC.md` §"The 4-phase workflow", followed by the post-closure protocol (commit + next-task suggestion). Do not skip phases once a tasknote is open — whether a change needs a tasknote at all is decided by `.flaitron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)". `/ft-micro-task` uses a lighter single-section ceremony in place of the full 4-phase flow.
- Each PLAN.md task line carries a `[model]` segment naming the model tier or name the task should run on end-to-end; adopters may use any short token. If the loaded model doesn't match, surface the mismatch before continuing. Contract: `.flaitron/core/SPEC/model.md` §"Model field".
- The `.flaitron/core/` submodule is read-only here. Edits go upstream to flaitron and arrive via deliberate version bumps — see `.flaitron/core/SPEC/versioning.md`. The pin is the submodule gitlink (`git -C .flaitron/core describe --tags`), also readable as the `**Version:**` line of `.flaitron/core/SPEC.md`; no project file restates it.
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

Flaitron's per-file byte budgets for its own shipped surfaces are in [`docs/CONTEXT-BUDGET.md`](../docs/CONTEXT-BUDGET.md).

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
| [`codex/AGENTS-snippet.md`](../codex/AGENTS-snippet.md) §"One-time skill wiring" | source `claude/skills/` → `codex/skills/`; dest `.claude/skills/` → `.agents/skills/` |
| [`cursor/AGENTS-snippet.md`](../cursor/AGENTS-snippet.md) §"One-time symlink wiring" | dest `.claude/skills/` → `.cursor/skills/`; source unchanged |
| [`grok/AGENTS-snippet.md`](../grok/AGENTS-snippet.md) §"One-time symlink wiring" | dest `.claude/skills/` → `.grok/skills/`; source unchanged |
| [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.6 | stages the destination paths this block creates |
| [`claude/skills/ft-adopt/SKILL.md`](skills/ft-adopt/SKILL.md) Steps 7–8 | stages and verifies the destination paths this block creates |

The last two derive their commands from this block at run time and restate no
path list. The three platform blocks stay literal `ln -s` lines — they are
copy-pasted by adopters and parsed by `tools/update-adopters.mjs`
(`wiredSkillKeys()`) and `/ft-update` Step 4 — so **adding or removing a skill
means editing this block first, then regenerating the three platform blocks by
substitution.** `/ft-release` §7.1's installed-surface check derives its expected
set from here and diffs all four blocks against it; there is no hand-maintained
roster left to drift.

Run these from the project root after adding the flaitron submodule at `.flaitron/core/`:

```sh
mkdir -p .claude/skills
ln -s ../../.flaitron/core/claude/skills/ft-task            .claude/skills/ft-task
ln -s ../../.flaitron/core/claude/skills/ft-micro-task      .claude/skills/ft-micro-task
ln -s ../../.flaitron/core/claude/skills/ft-file-task       .claude/skills/ft-file-task
ln -s ../../.flaitron/core/claude/skills/ft-open-epic       .claude/skills/ft-open-epic
ln -s ../../.flaitron/core/claude/skills/ft-close-epic      .claude/skills/ft-close-epic
ln -s ../../.flaitron/core/claude/skills/ft-update          .claude/skills/ft-update
ln -s ../../.flaitron/core/claude/skills/ft-refactor        .claude/skills/ft-refactor
ln -s ../../.flaitron/core/claude/skills/ft-seed-unattended .claude/skills/ft-seed-unattended
```

The relative paths are intentional — they survive `git clone` and pin to whichever flaitron commit the submodule is checked out at. Commit the symlinks (`git add .claude/`).

The submodule also brings flaitron's own tasknote archive at `.flaitron/core/.flaitron/` (~16 MB, ~1,000 files) — flaitron's history, not this project's context. Sparse-checkout drops it from the working tree, and `/ft-update` re-applies it after a re-clone. As the fallback, keep it out of Grep, Glob, and `@file` with a `Read(./.flaitron/core/.flaitron/**)` deny rule in `.claude/settings.json`. The sparse line, the per-tool list, and the rule's one cost are in [`docs/MIGRATION.md`](../docs/MIGRATION.md) §1.1.

This snippet wires the adopter-installed subset: tasknote family, `/ft-seed-unattended`, and `/ft-update`. Global utilities live in the user's agent home when desired; `/ft-release` is flaitron-self-only. Never also install the adopter subset in `~/.claude/skills/`: a user-scope copy shadows this project's pinned wiring and runs against the pin (`⛔ skill/pin mismatch`) — [`docs/PLATFORMS.md`](../docs/PLATFORMS.md) §"One canonical install path per project".

To verify Claude Code wiring: invoke `/ft-task` in a fresh Claude Code session. The skill should appear in the menu (alongside the other wired adopter-subset skills) with the description and argument hint from `skills/ft-task/SKILL.md`. For Codex, use the sibling `codex/AGENTS-snippet.md` wiring and invoke the skill through `/skills` or `$ft-task`. For Cursor, Claude wiring is already enough (Cursor loads `.claude/skills/` as a compatibility surface); Cursor-only projects use the sibling `cursor/AGENTS-snippet.md` instead. For Grok, Claude, Codex, or Cursor wiring is already enough (Grok loads those dirs as compatibility surfaces); Grok-only projects use the sibling `grok/AGENTS-snippet.md` instead.

## Bumping the pinned flaitron version

Run `/ft-update` from the project root to bump the pin: it shows the current→target version + the annotated-tag changelog for confirmation, moves the submodule pin, re-wires symlinks for any newly shipped skills, runs a smoke check, and stages the bump with a proposed commit. The symlinks above don't change for *existing* skills — they always track whatever the submodule currently points at; `/ft-update` only adds a symlink when the bump ships a brand-new adopter-subset skill.

Without `/ft-update`, bump by hand: [`docs/MIGRATION.md`](../docs/MIGRATION.md) §"Pinning and bumping".

## Visualizer

The visualizer is one global instance per machine, run from flaitron's own checkout rather than this project's `.flaitron/core/viz/`. Runbook (workspace scan, port, env override): [`README.md`](../README.md) §"Visualizer".
