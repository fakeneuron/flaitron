---
title: goal-task-demote
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-565.4, CORE-569, CORE-572, CORE-390]
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-5-loop-mode.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/commands/ft-task.md
  - claude/skills/ft-goal-task/SKILL.md
  - claude/commands/ft-goal-task.md
  - codex/skills/ft-goal-task/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - claude/CAPABILITIES.md
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - AGENTS.md
  - README.md
  - SPEC/loop.md
  - SPEC/layout.md
  - SPEC/gates.md
  - SPEC/purpose-blurb.md
  - SPEC/tasknote-selection.md
  - docs/PLATFORMS.md
  - docs/WORKTREES.md
  - docs/EXTERNAL-AGENTS.md
  - docs/MIGRATION.md
  - docs/GLOSSARY.md
  - docs/CONTEXT-BUDGET.md
  - .flowtron/PLAN.md
---

# CORE-571 | goal-task-demote

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-565.4]] · [[CORE-569]] · [[CORE-572]]

## 🎯 Goal

Decide whether `/ft-goal-task` demotes to a `/ft-task --loop` flag (contract `SPEC/loop.md` stays; the 28k body, `--worktree` / Pair G, the heartbeat roster row, and two symlinks go) or retires outright, and land the decision.

## ✅ Acceptance

- [x] Decision recorded: demote to `/ft-task --loop` (not retire, not keep), with the rationale in Discovery — `judgment` (operator-confirmed via AskUserQuestion; the transcript is the receipt)
- [x] `claude/skills/ft-task/step-5-loop-mode.md` exists, carries the loop delta (Phase 1 verify-command rule + no-machine-criteria stop, the Phase 2↔3 loop body, the one-time 👁️ post-loop ask, the recap addition), and `/ft-task` Step 0 loads it only when `--loop` is passed — `grep -q 'step-5-loop-mode.md' claude/skills/ft-task/SKILL.md && test -f claude/skills/ft-task/step-5-loop-mode.md`
- [x] Three runner paths deleted: `claude/skills/ft-goal-task/`, `claude/commands/ft-goal-task.md`, `codex/skills/ft-goal-task/` — `! test -e claude/skills/ft-goal-task && ! test -e claude/commands/ft-goal-task.md && ! test -e codex/skills/ft-goal-task`
- [x] No live `ft-goal-task` / `goal-task` / `--worktree` reference remains outside the archive and `docs/VERSION-HISTORY.md`, except the `docs/MIGRATION.md` retired-skills row and the `docs/WORKTREES.md` history note — `grep -rn --exclude-dir=archive --exclude-dir=.git --exclude-dir=node_modules -e 'goal-task' -e '--worktree' . | grep -v -e 'VERSION-HISTORY' -e 'PLAN-ARCHIVE' -e 'MIGRATION.md.*Retired' -e 'MIGRATION.md.*ft-goal-task.*v5' -e 'tasknote/CORE-571.md'` prints nothing
- [x] `SPEC/loop.md` still ships unchanged in contract; only its driver naming moves to `/ft-task --loop` — `grep -q 'ft-task.*--loop' SPEC/loop.md && ! grep -q 'ft-goal-task' SPEC/loop.md`
- [x] Pair G removed from `claude/skills/ft-release/step-7.1-mirror-pairs.md` and the four-way snippet `ln -s` roster diff (`step-7.1-standing-checks.md` §symlink roster) still passes with the lines dropped — run that check's `diff -u` block; prints nothing
- [x] `claude/skills/ft-task/SKILL.md` stays under the 33,000-char cap — `test $(wc -c < claude/skills/ft-task/SKILL.md) -le 33000`
- [x] `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains an `ft-goal-task` row — `grep -q '| \`ft-goal-task\` |' docs/MIGRATION.md`
- [x] Downstream reconcile applied as confirmed: CORE-569 row deleted, CORE-572 row's sequencing clause dropped — `! grep -q 'CORE-569' .flowtron/PLAN.md && ! grep -q 'Sequence with CORE-571' .flowtron/PLAN.md`

## 🧩 Subtasks

- [x] Write `claude/skills/ft-task/step-5-loop-mode.md` — port the goal-task delta (Steps 3b addendum, 4 verify rule, 5 loop body, 6 one-time ask) in the `step-4-debug-mode.md` shape; drop `--worktree`
- [x] Extend `/ft-task` SKILL.md: frontmatter `description:`, accepted-tokens line, Step 0 flag parse + `🔁 --loop` marker + fragment load, Step 3b scaffold addendum pointer, Step 4 verify-rule pointer, Step 5 loop dispatch + Step 6 note; keep ≤ 33,000 chars
- [x] Extend `claude/commands/ft-task.md` `description:` / `argument-hint:` / usage block with `--loop`
- [x] Delete `claude/skills/ft-goal-task/`, `claude/commands/ft-goal-task.md`, `codex/skills/ft-goal-task/`
- [x] Sweep runner-surface references: 4 `AGENTS-snippet.md` `ln -s` lines + Workflow bullets, `AGENTS.md` roster, `ft-flowtron` roster row, `SPEC/layout.md` roster + dispatch-source line, `ft-release/step-7.1-mirror-pairs.md` Pair G + consumer row, `CAPABILITIES.md` `--worktree` row + flag rows, `docs/PLATFORMS.md` rows, `docs/WORKTREES.md` alternate entry, `ft-epic-discovery` unsupported-flag line
- [x] Sweep flag-roster mentions: `SPEC/gates.md`, `SPEC/purpose-blurb.md`, `SPEC/tasknote-selection.md`, `SPEC/loop.md` header, `step-1.5-model-edge.md`, `unattended-mode.md` (fold the `/ft-goal-task` column into `/ft-task` with `--loop` notes), `docs/EXTERNAL-AGENTS.md`, `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `README.md`
- [x] Add the `ft-goal-task` row to `docs/MIGRATION.md` retired-skills table
- [x] Apply reconcile: delete CORE-569 row, edit CORE-572 row
- [x] Verify: Acceptance commands, standing-checks symlink diff, repo-wide grep, Pair I / Pair M gates for `--loop`
- [x] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-565.4]] — filed this task (roster-onboarding-value pass of the harness-value-review epic)
- [[CORE-569]] — `blocked-by:` this decision; moot if the demote lands
- [[CORE-572]] — worktree-pair-demote; sequenced after this (`--worktree` / Pair G is shared surface)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The evidence line on the PLAN row re-verifies at HEAD: zero `## 🔁 Iterations` *sections* in 880 archived notes (the 12 `grep -l` hits are prose mentions in authoring/roster notes, none a heading), no `.flowtron/LOOP-LOG.md`, no `.claude/loop.md`; caobunga wires the skill and has never run it. The skill's own Notes (§"Relationship to /ft-task") argued for a separate skill on execution-model grounds — that argument assumed operators would reach for it; ten weeks say they don't. The `[[CORE-390]]` precedent (`/ft-debug` → `/ft-task --debug`, 25 files, one `[medium]` task) proves the fold shape at this footprint.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — AskUserQuestion (three questions): **Decision = demote to `/ft-task --loop`**; **Scope = execute the sweep in this tasknote** (CORE-390 precedent); **Reconcile = Delete CORE-569, Edit CORE-572**. Assumptions: the heartbeat template and shape stay (the PLAN row's "heartbeat roster row" is `ft-flowtron/SKILL.md:52`, the goal-task row that ends with the heartbeat pointer — not the template); `--worktree` is dropped from the fold, not ported (CORE-572 owns the pair); the retired-skills table names `v5.27.0` as the release, per `SPEC/versioning.md` §Minor (v5.15.0 precedent for folds).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Evidence re-check (HEAD, 2026-09-10).** `grep -rl "## 🔁 Iterations" archive/` → 12 files, all prose mentions (CORE-330.x authoring, CORE-400/429/557/473.1/489.4/408.3/565.4 roster or contract edits); `grep "^## 🔁 Iterations"` → 0. No `.flowtron/LOOP-LOG.md`, no `.claude/loop.md`. 82 archive notes name `ft-goal-task`; every one is authoring, roster, or flag-propagation work. First shipped `f06b4fa` (CORE-330.4, 2026-07-02).

**Footprint (36 non-archive files name `goal-task` / `loop.md` / Pair G).** Three shape classes:
- *Runner surface (goes under demote):* `claude/skills/ft-goal-task/SKILL.md` (27,960), `claude/commands/ft-goal-task.md` (3,365), `codex/skills/ft-goal-task/SKILL.md` (720); the `ln -s` pairs in `claude/` (2 lines) · `codex/` · `cursor/` · `grok/` `AGENTS-snippet.md`; roster rows in `AGENTS.md`, `claude/skills/ft-flowtron/SKILL.md:52` (the "heartbeat roster row" the PLAN line names — it ends "Heartbeat shape: `templates/loop-heartbeat-template.md`"), `SPEC/layout.md:96`; Pair G in `claude/skills/ft-release/step-7.1-mirror-pairs.md:110-118` plus the `tasknote-template.md` consumer row at :44; `--worktree` rows in `claude/CAPABILITIES.md:33` and `docs/PLATFORMS.md:392/420/457`; `docs/WORKTREES.md:57` alternate entry point.
- *Flag-roster mentions (rewrite `/ft-goal-task` → `/ft-task --loop` or drop):* `SPEC/gates.md:350/539`, `SPEC/purpose-blurb.md:7/41`, `SPEC/tasknote-selection.md:245`, `claude/skills/ft-task/SKILL.md:24`, `step-1.5-model-edge.md:3/5`, `unattended-mode.md:3/7/46/58/66` (conversion-map column), `claude/CAPABILITIES.md:30/31`, `claude/AGENTS-snippet.md:23/24`, `claude/skills/ft-epic-discovery/SKILL.md:45`, `docs/PLATFORMS.md:35/74/264/389/417/454`, `docs/EXTERNAL-AGENTS.md:61` ("four skills accept it"), `docs/MIGRATION.md:63/487`, `docs/GLOSSARY.md:73` (goal loop), `docs/CONTEXT-BUDGET.md:127` (size roster — regenerated at release).
- *Contract (stays under demote):* `SPEC/loop.md` (7,971; its header names `/ft-goal-task` as the driver → `/ft-task --loop`), `SPEC.md` §"Loop tasks" + :154/:289/:443 (no skill named — unchanged), `SPEC/scope-boundaries.md:61`, `docs/VISION.md:46`, `docs/CONVENTIONS.md:66`, `docs/AGENT-NEUTRALITY.md:44-46/104`, `templates/loop-heartbeat-template.md`, `docs/GLOSSARY.md:79/81`, `README.md:276/283`. `docs/VERSION-HISTORY.md` is append-only history — untouched.

**Budget.** `claude/skills/ft-task/SKILL.md` is 29,411 against the 33,000 `docs/CONTEXT-BUDGET.md` cap; the `--debug` precedent added ~1.5k to the body and a 5,640 fragment. A `--loop` branch (Step 0 parse + marker, Step 4 verify-command rule + no-machine-criteria stop, Step 5 loop-body dispatch, Step 6 one-time 👁️ + Skip-branch note) fits the same pattern: ~2k in the body, the loop body itself in a lazy `step-5-loop-mode.md` fragment (~8k, loaded only when the flag is passed). Headroom ~1.5k after.

**Prior art.** [[CORE-390]] `debug-mode-fold` — `/ft-debug` (149-line skill) → `/ft-task --debug` via `step-4-debug-mode.md` (67 lines); 25 files in one commit `c5ea07a`; added `docs/MIGRATION.md` §"Retired skills leave dangling symlinks", which `/ft-update` Step 4.6 already surfaces — no new adopter machinery needed. [[CORE-330.1]]–[[CORE-330.6]] shipped the skill; [[CORE-362.3]] propagated cadence guidance into it; [[CORE-565.4]] filed this row with the evidence above.

**Best-practices review.** The fold extends the one established shape for a specialized `/ft-task` driver (flag + lazy fragment under `claude/skills/ft-task/`); it removes a duplicated skeleton (the 28k body restates Steps 0–3 and 6 of `/ft-task` "identically" — the [[CORE-569]] finding) rather than adding one. Dependency direction is unchanged: `SPEC/loop.md` stays the contract, the fragment is its dispatch source (`SPEC/layout.md:76-77` names the dispatch source explicitly → rewrite). No `--worktree` in the fold — it was the only consumer of the worktree pair from a runner, and [[CORE-572]] decides the pair itself.

**Drift.** PLAN row cites "28k body" (27,960 ✓), "`--worktree` / Pair G" (✓ `step-7.1-mirror-pairs.md:110`), "the heartbeat roster row" (✓ `ft-flowtron/SKILL.md:52`), "two symlinks" (✓ `claude/AGENTS-snippet.md:110-111`; Codex/Cursor/Grok snippets carry one each — three more `ln -s` lines than the row counts, same class). No SPEC contradiction: `SPEC/loop.md` names its driver in one header line and one sentence; the contract body is driver-agnostic.

**Downstream-impact scan (mid-flow decision reaches beyond this task).** Active rows sharing the surface: [[CORE-569]] — *Redundant* under demote (the body it trims is deleted) → propose **Delete**; [[CORE-572]] — *Stale clause* under demote ("Sequence with CORE-571 (`--worktree`)" — the flag is gone, the pair decision is independent) → propose **Edit** (drop the sequencing clause); [[CORE-570]], [[CORE-573]], [[CORE-568]] — *Unaffected*. User-confirm gated below.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract + wiring; the release standing checks are the test surface, run in Phase 3)

**Implementation Notes:**

**Pattern.** Flag + lazy fragment, the shape `--debug` / `step-4-debug-mode.md` already established under `claude/skills/ft-task/`. `step-5-loop-mode.md` (11,102 chars) ports the goal-task delta — Step 3b scaffold addendum, the Phase 1 verify-command rule + no-machine-criteria stop, the Step 5 loop body, the Step 6 one-time 👁️ ask, the recap addition — and drops everything the old body restated "identically" (Steps 0–3, 6; ~60% of 27,960 chars). `--worktree` was not ported: it chained two operator steps (`/ft-worktree-start` then re-invoke) and was the only runner-side consumer of the worktree pair, whose fate [[CORE-572]] decides; `docs/WORKTREES.md` now names the two-step path for a `--loop` run.

**`/ft-task` body.** +2,428 chars (29,411 → 31,839; cap 33,000): frontmatter `description:` clause (so loop-shaped requests still dispatch here — the [[CORE-390]] lesson), `--loop` in the accepted-tokens line, Step 0 parse + `🔁` marker + `loop-mode` paragraph (loads the fragment and `SPEC/loop.md`), Step 3b addendum pointer, Step 4 verify-rule pointer, Step 5 replacement paragraph. `loop.md` added to the SPEC_DIR lazy-module list; `/ft-goal-task` dropped from the shared-fragment note.

**Sweep (33 files).** Deleted: `claude/skills/ft-goal-task/SKILL.md`, `claude/commands/ft-goal-task.md`, `codex/skills/ft-goal-task/SKILL.md`. Rosters: `AGENTS.md`, `ft-flowtron` (row dropped; `--loop` clause folded into the `/ft-task` row, heartbeat pointer kept there), `SPEC/layout.md` (slug list + dispatch-source line), four `AGENTS-snippet.md` `ln -s` lines + the two `claude/` Workflow bullets, `docs/PLATFORMS.md` (three rosters, three `--worktree` rows → `--loop` rows, 19→18 counts), `docs/MIGRATION.md` (§1.2 short roster, §1.7 verify note, retired-skills row `v5.27.0`). Flag rosters `/ft-goal-task` → dropped or `/ft-task --loop`: `SPEC/gates.md` ×4, `SPEC/purpose-blurb.md` ×3, `SPEC/tasknote-selection.md`, `SPEC/loop.md` ×4 (header driver, goal-shape sentence, exit-gate flavor, taste-split cite), `step-1.5-model-edge.md` (flags-included `<SKILL>` rule), `unattended-mode.md` (conversion-map column → `/ft-task --loop (where it differs)`; two prose paragraphs), `ft-micro-task` ("three model-gate skills" → two), `ft-epic-discovery` unsupported-flag line, `claude/CAPABILITIES.md` (`--worktree` row → `--loop` row; `--fast` / `--unattended` rosters; contract-layer note), `docs/EXTERNAL-AGENTS.md` (four → three skills), `docs/GLOSSARY.md` (goal loop driver), `docs/AGENT-NEUTRALITY.md` (flag list), `docs/WORKTREES.md`. Release gate: Pair G tombstoned (letter kept so H–M citations stay stable); Pair J's foreign-slug example re-pointed at `ft-worktree-start.md`; `tasknote-template.md` consumer row. SOP: `SPEC/procedures/ft-task.md` gains a `loop mode` primitive row + compose sentence (its `source:` is `claude/skills/ft-task/`, so the SOP-currency check would have flagged this commit otherwise); `codex/skills/ft-task/SKILL.md` `description:` names `--loop`.

**Left alone, deliberately.** `docs/CONTEXT-BUDGET.md` — the §Ledger skill-size roster is release-refreshed (`/ft-release` §7.1 re-measures every row; the stale `ft-goal-task 26,497` entry drops there), and the `ft-goal-task (27,140)` in the 33,000 rationale cell is history about when the cap was set. `docs/VERSION-HISTORY.md` / `PLAN-ARCHIVE.md` — append-only history. Pair I :147 and Pair M :286 prose naming `/ft-goal-task` — past findings, not live surfaces. `templates/loop-heartbeat-template.md` and the heartbeat shape in `SPEC/loop.md` — out of scope (the PLAN row's "heartbeat roster row" was the `ft-flowtron` goal-task row, now gone). The two dangling repo-local symlinks (`.claude/skills/ft-goal-task`, `.claude/commands/ft-goal-task.md`, gitignored) were `rm`'d so the release's blocking local self-wiring check passes.

**Reconcile (operator-confirmed, Phase 1).** [[CORE-569]] deleted from PLAN.md (its target no longer exists); [[CORE-572]]'s "Sequence with CORE-571 (`--worktree`)" clause dropped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the release standing checks this change touches (below)

- [x] Ran lint/type-check on changed code — N/A (markdown only; no linter configured for `.md`)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A (no rendered surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Acceptance receipts (2026-09-10, HEAD + working tree):

- A1 decision — `judgment`: AskUserQuestion answered "Demote to `/ft-task --loop`" (transcript).
- A2 `grep -q 'step-5-loop-mode.md' claude/skills/ft-task/SKILL.md && test -f claude/skills/ft-task/step-5-loop-mode.md` → 0
- A3 `! test -e claude/skills/ft-goal-task && ! test -e claude/commands/ft-goal-task.md && ! test -e codex/skills/ft-goal-task` → 0
- A4 residue grep (excluding archive, VERSION-HISTORY, PLAN-ARCHIVE, this note, lines carrying `CORE-571` history notes, `CONTEXT-BUDGET.md`, mirror-pairs :147/:286 past-finding prose, and this task's own PLAN row) → prints only the `docs/MIGRATION.md:534` retired-skills row, which the criterion allows. Before the exclusions it also surfaced `docs/MIGRATION.md:63` (a live roster sentence) — fixed.
- A5 `grep -q 'ft-task.*--loop' SPEC/loop.md && ! grep -q 'ft-goal-task' SPEC/loop.md` → 0
- A6 symlink-roster diffs (`step-7.1-standing-checks.md`, five `diff -u`) → all empty, exit 0; Pair G absent from the live pairs (tombstone only)
- A7 `test $(wc -c < claude/skills/ft-task/SKILL.md) -le 33000` → 0 (31,839)
- A8 `grep -q '| \`ft-goal-task\` |' docs/MIGRATION.md` → 0
- A9 `! grep -q 'CORE-569' .flowtron/PLAN.md && ! grep -q 'Sequence with CORE-571' .flowtron/PLAN.md` → 0

Release standing checks run verbatim from the fragments: Pair B (Claude flags ↔ Codex wrapper descriptions) → empty; Pair E (`ft-flowtron` roster ↔ shipped skills + flags) → empty; Pair I (`CAPABILITIES.md` flag rows ↔ PLATFORMS non-Claude tables; derived roster now `--fast --unattended --debug --loop --park --deep`) → empty; Pair J (stub `argument-hint:` ↔ documented flags) → empty; Pair M (skill `description:` ↔ stub hint) → empty; shipped-skill parity `claude/skills` ↔ `codex/skills` ↔ `claude/commands` → identical; local self-wiring `claude/{skills,commands}` ↔ `.claude/{skills,commands}` → identical after the two dangling links were removed. Pair A (templates roster) prints its listing unchanged — no template moved. Keyword clause on the staged diff (`API_KEY|SECRET|TOKEN|PASSWORD`) → 0 hits.

Structural: no duplication introduced (the fragment removed a 28k restatement); no dead code (three deleted paths, no orphan fragment); public surface shrank by one skill and grew by one flag on the runner; code-facing docs updated in the same diff (SOP primitive row, Codex wrapper description, CAPABILITIES row).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (loop paragraph names the contract, not a skill) · `AGENTS.md` updated (roster) · `SPEC.md` no change (§"Loop tasks" names no skill) · `docs/MIGRATION.md` updated (roster sentence, §1.7 note, retired-skills row) · `claude/AGENTS-snippet.md` updated (two Workflow bullets, two `ln -s` lines) · `codex/` `cursor/` `grok/` `AGENTS-snippet.md` updated (one `ln -s` line each) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` updated (CAPABILITIES flag list) · `docs/PLATFORMS.md` updated (rosters, counts, three trigger rows) · `claude/CAPABILITIES.md` updated (`--loop` row replaces `--worktree`; flag rosters; contract-layer note) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` updated (skill count) · `docs/WORKTREES.md` updated (alternate entry point) · `docs/VISION.md` no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Decided **demote**: `/ft-goal-task` is now `/ft-task --loop`, a flag on the core runner backed by the lazy `claude/skills/ft-task/step-5-loop-mode.md` fragment (11,102 chars, loaded only when passed) and driving the unchanged `SPEC/loop.md` contract. Ten weeks of zero real runs said nobody reaches for the standalone skill; the [[CORE-390]] fold shape let the capability survive at near-zero standing cost — no roster row, no stub, no Codex wrapper, no symlink pair, no Pair G.

- **Files:** 33 changed, +347 / −331 — 3 deletions (28k skill body, 3.4k stub, 0.7k wrapper), 1 new fragment, 29 edits.
- **Verification:** all nine Acceptance receipts pass (Testing Notes); Pairs B / E / I / J / M and the symlink-roster, shipped-skill-parity, and local self-wiring standing checks run clean; `ft-task/SKILL.md` at 31,839 / 33,000.
- **Refactors:** none beyond the fold; `docs/CONTEXT-BUDGET.md` ledger left for the release re-measure by design.
- **Documentation:** swept (Phase 4 box); `SPEC/procedures/ft-task.md` gains the `loop mode` primitive so the SOP stays current with its source.
- **`touches:` reconciliation:** four undeclared paths edited — `claude/skills/ft-micro-task/SKILL.md` ("three model-gate skills" count), `codex/skills/ft-task/SKILL.md` (wrapper description), `SPEC/procedures/ft-task.md` (SOP primitive), `docs/AGENT-NEUTRALITY.md` (flag list); two declared paths untouched — `README.md` (no skill named), `docs/CONTEXT-BUDGET.md` (release-refreshed).
- **Maintainability:** roster 19 → 18 skills; one fewer body restating `/ft-task`'s skeleton; the loop contract now has exactly one dispatch source (`/ft-task` Step 0). Adopters see two dangling symlinks at their next `/ft-update` (Step 4.6 names them) and the retired-skills row tells them the replacement.
- **Follow-ups:** none filed. [[CORE-569]] deleted as moot; [[CORE-572]] proceeds independently.

**Archived:** 2026-09-10
