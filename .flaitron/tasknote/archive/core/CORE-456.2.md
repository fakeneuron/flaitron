---
title: grok-compat-docs
status: completed
tags: []
created: 2026-08-20
due:
related-tasks:
  - CORE-EPIC-456
  - CORE-456.3
  - CORE-456.4
  - CORE-456.N
touches:
  - docs/PLATFORMS.md
  - docs/AGENT-COMPAT.md
  - docs/MIGRATION.md
  - README.md
  - docs/AGENT-NEUTRALITY.md
---

# CORE-456.2 | grok-compat-docs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-456]] [[CORE-456.3]] [[CORE-456.4]] [[CORE-456.N]]

## 🎯 Goal

Update PLATFORMS.md, AGENT-COMPAT.md, MIGRATION.md, and the Grok trigger table so they state that Grok scans `.claude/skills` and `.agents/skills` (Cursor-shaped), and that `--fast` is available when those bodies load.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md` no longer classifies Grok as contract-only: Today's surface + Grok adoption notes state Cursor-shaped discovery (`.claude/skills/` + `.agents/skills/`), and the Grok trigger table documents `--fast` (and `--debug`) as available when those bodies load
- [x] `docs/AGENT-COMPAT.md` Grok consume-mode + skill/command primitive cells match that fact; last-verified stamp left for [[CORE-456.4]]
- [x] `docs/MIGRATION.md` §1.2 / §1.7 tell adopters: if Claude or Codex is already wired, Grok is already served
- [x] No `grok/AGENTS-snippet.md` ships here (owned by [[CORE-456.3]]); contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched

## 🧩 Subtasks

- [x] Update `docs/PLATFORMS.md`: intro, Today's surface (split Grok from Amp/Aider/Gemini), Installed-surface Grok row, plug-in tree comment, optional-reference cell, Grok adoption notes, trigger table (`--fast` / skill invocation / procedure-pointer fallback)
- [x] Update `docs/AGENT-COMPAT.md`: Grok matrix row consume-mode + primitive; reading-the-cells + pre-adoption sentences that still say contract-only. Leave last-verified stamp
- [x] Update `docs/MIGRATION.md`: §1.2 Grok install paragraph + §1.7 verify bullet (+ §3.8 smoke line if it still buckets Grok as contract-only)
- [x] Phase 3: grep-verify stale "Grok is contract-only" / "no `--fast` without grok/ bundle" claims on the named surfaces
- [x] Phase 4: doc-drift sweep; update AI-referenced one-liners this work falsifies (README quickstart / AGENT-NEUTRALITY ledger)

## 🔗 Related

- [[CORE-EPIC-456]] — parent epic: grok-thin-wiring (audit-repo 2026-08-20)
- [[CORE-456.3]] — sibling: ship `grok/AGENTS-snippet.md`
- [[CORE-456.4]] — sibling: dogfood restamp under Grok Build
- [[CORE-456.N]] — terminal audit child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Parent `CORE-EPIC-456` is open under Medium; this `.2` child is unchecked; no `.1` (Discovery supplied by audit-repo 2026-08-20). The filed claim is still true of the docs and still false of Grok: this session loaded `/ft-task` from `.claude/skills/ft-task/SKILL.md`, and Grok's own skill docs list `.claude/skills/` + `.agents/skills/` as default scans. Nothing has made the ticket obsolete.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

PLAN.md (parent + children), `docs/PLATFORMS.md` (Today's surface, Installed-surface, plug-in tree, Grok adoption notes, Grok trigger table, Cursor worked example as the shape to extend), `docs/AGENT-COMPAT.md` (Grok row + reading-the-cells + pre-adoption), `docs/MIGRATION.md` §1.2 / §1.7 / §3.8, `cursor/AGENTS-snippet.md` (thin-compat pattern), `grok/procedures/ft-task.md` (still pointer-only), `~/.grok/docs/user-guide/08-skills.md` (vendor discovery table), archived [[CORE-438.3]] / [[CORE-438.4]] / [[CORE-438.5]] (Cursor analog), [[CORE-271.4]] (pointer origin), [[CORE-224.4]] (Grok trigger table origin), [[CORE-257]] (first Grok dogfood). No probe — named files, known shape.

### What the docs currently claim (stale)

- Grok sits in the Amp/Aider/Gemini **contract-only** row in PLATFORMS.md Today's surface.
- Adoption notes: "contract-layer-only path"; skill primitives mention only `.grok/skills/` + a hypothetical future `grok/` bundle.
- Trigger table Force-skip: "No equivalent without a shipped `grok/` bundle"; Procedure pointer is "the standing entry path".
- AGENT-COMPAT Grok row: Consume mode `Contract only`; primitive "`.grok/skills/` … no full flowtron bundle".
- MIGRATION.md §1.2 has Claude / Codex / Cursor install paragraphs and no Grok paragraph.

### What Grok actually does (this session + vendor docs)

Grok discovers skills, in priority order, from `.grok/skills/`, `.claude/skills/` (+ commands), `.cursor/skills/`, user `~/.{grok,claude,cursor}/skills/`, and `.agents/skills/` at each tier (cwd walk-up). Claude/Cursor vendor dirs are on by default. Skills auto-wire as `/<name>`. Therefore a project already wired for Claude or Codex is already wired for Grok — the Cursor-shaped "if already wired, stop" rule. The canonical `claude/skills/` bodies carry `--fast` / `--debug`, so those flags work as soon as the bodies load. Live evidence: this `/ft-task CORE-456.2` invocation loaded `.claude/skills/ft-task/SKILL.md`.

### Pattern to extend (not invent)

Cursor's thin surface in PLATFORMS.md Today's surface + Installed-surface + trigger Skill-invocation / `--fast` rows + MIGRATION §1.2 "if already wired for Claude, already wired for Cursor". Grok is the same consume-shape with a different native dir (`.grok/skills/`) and an extra default-on Claude/Cursor compat scan. Do **not** ship `grok/AGENTS-snippet.md` here — that is [[CORE-456.3]]. Do **not** add a Worked-example section until that snippet exists (Cursor's worked example is snippet-shaped).

### Scope splits with siblings

| This task (.2) | Leave for siblings |
|---|---|
| Document scan paths + `--fast` when bodies load | `.3` ships `grok/AGENTS-snippet.md` (Grok-only `.grok/skills/` install) |
| Restamp AGENT-COMPAT **consume-mode + primitive facts** | `.4` restamps **last-verified** after `docs/DOGFOOD.md` |
| Phase 4 updates AI-referenced one-liners this work falsifies (README "Grok is contract-only") | Enumeration of `grok/` across skills / updater / SPEC layout stays pointer-accurate until `.3` |

### Out of scope (logged, not fixed)

The Grok trigger rows for sub-agent / `/model` / `/clear` still read as 2026-06 launch-coverage. This session has a native `spawn_subagent` tool and Grok's user-guide now documents subagents, plan mode, and `/` commands — but the PLAN line does not authorize a trigger-table refresh beyond skill discovery and `--fast`. Defer.

### Best Practices

Docs-only. N/A for code module boundaries. Keep Grok facts in the wiring docs (`PLATFORMS.md` / `AGENT-COMPAT.md` / `MIGRATION.md`); do not leak them into `SPEC.md` (AGENT-NEUTRALITY contract-layer posture). README quickstart one-liner is an AI-referenced claim this work falsifies — update at Phase 4, not as a new surface.

### Drift check

Cited files exist and still carry the stale claims. SPEC.md `grok/` layout line ("procedure pointer") remains factually true until `.3` and is left alone. No Fan-out on a missing `.1`; omit `blocked-by:` / `parallel-safe-with:`. PLAN line 70-word cap is fine (~28w). No SPEC contradiction.

### Clarifications

No clarifications needed. Assumptions: (1) consume-mode restamp is the AGENT-COMPAT *fact* cells in this task; last-verified stays `v5.18.0 · 2026-08-18 (dogfooded)` for `.4`; (2) adding `--debug` beside `--fast` is the same "when those bodies load" mechanism, not a new trigger family; (3) MIGRATION Grok-only install commands wait on `.3` — this task only documents the already-wired path.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended Cursor's thin-surface shape (Today's surface row + Installed-surface row + trigger Skill-invocation / `--fast` / `--debug` + MIGRATION "if already wired, stop") onto Grok. Split Grok out of the Amp/Aider/Gemini contract-only row. Did not invent a Worked-example or `grok/AGENTS-snippet.md` (`.3`). Did not restamp last-verified (`.4`). `--debug` added beside `--fast` as the same loaded-body flags.

No refactor beyond the named surfaces plus Phase 4 AI-referenced one-liners this work falsified (`README.md` quickstart + `docs/AGENT-NEUTRALITY.md` ledger rows). Tests N/A — docs-only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: docs-only, no test surface

- [x] Ran lint/type-check on changed code — `git diff --check` clean on the edited markdown

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no UI

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `test -e grok/AGENTS-snippet.md` → `SNIPPET_ABSENT` (`.3` still owns it)
- `git diff --check` on `docs/PLATFORMS.md` `docs/AGENT-COMPAT.md` `docs/MIGRATION.md` → clean
- Repo-wide `Grok is contract-only` grep (non-archive `*.md`) → 0 hits after the README/ledger updates
- Named-surface grep: PLATFORMS no longer buckets Grok with Amp/Aider/Gemini; AGENT-COMPAT Grok consume-mode is `Wiring + contract (thin, Cursor-shaped)`; last-verified still `v5.18.0 · 2026-08-18 (dogfooded)`
- Quality: Cursor-shaped facts live once in PLATFORMS and are pointed at from MIGRATION (no duplicated `ln -s` list); consume-mode restated in AGENT-COMPAT as the capability companion. No new public surface. Deferred: Grok trigger rows for sub-agent / `/model` / `/clear` (out of scope)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — **updated** (quickstart: Grok is Cursor-shaped; platforms blurb)
  - `AGENTS.md` — no change (`grok/` still the procedure pointer until [[CORE-456.3]])
  - `SPEC.md` — no change (same)
  - `docs/MIGRATION.md` — **updated** (this task)
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated** (README + MIGRATION ledger rows; wiring-path list adds `.grok/skills/`)
  - `docs/PLATFORMS.md` — **updated** (this task)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — **updated** (this task; last-verified left for [[CORE-456.4]])
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Grok no longer reads as a contract-only agent. PLATFORMS.md, AGENT-COMPAT.md, and MIGRATION.md now state the Cursor-shaped fact: Grok scans `.claude/skills/` and `.agents/skills/`, so existing Claude or Codex wiring already serves `/ft-task` (and `--fast` / `--debug` on those bodies).

**Paths:** `docs/PLATFORMS.md` (Today's surface split, Installed-surface Grok row, adoption notes, trigger table), `docs/AGENT-COMPAT.md` (consume-mode + primitive; last-verified untouched), `docs/MIGRATION.md` §1.2 / §1.7 / §3.8, plus Phase 4 drift on `README.md` quickstart and `docs/AGENT-NEUTRALITY.md` ledger. No `grok/AGENTS-snippet.md`. Contract layer untouched.

**Verification:** `git diff --check` clean; snippet absent; `Grok is contract-only` grep 0 on live `*.md`. Tests N/A.

**Refactors:** none. Deferred: Grok-only snippet ([[CORE-456.3]]), last-verified restamp ([[CORE-456.4]]), stale sub-agent/`/model`/`/clear` trigger rows.

**Maintainability:** adopters who already wired Claude or Codex stop duplicating install steps for Grok; the remaining Grok-only path is a named hole for `.3` rather than a silent contract-only lie.

**Archived:** 2026-08-20
