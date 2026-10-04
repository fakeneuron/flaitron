---
title: fix remaining flag + layout drift
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-433]
---

# CORE-433.2 | fix remaining flag + layout drift

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-433]]

## 🎯 Goal

Close four doc-drift blind spots: add missing `--high` and `--worktree` flag mentions, restore three missing `.flowtron/` layout paths in SPEC.md's adopting-project tree, and drop the stale "security" claim from AGENTS.md's `docs/` bullet.

## ✅ Acceptance

- [x] `--high` present in park-flag rosters at all 5 named sites
- [x] `--worktree` present on `/ft-goal-task` descriptions at both named sites
- [x] SPEC.md adopting-project layout tree lists `specs/`, `sidequest/`, and `STATS.md` under `.flowtron/`
- [x] AGENTS.md `docs/` bullet no longer lists "security" (SECURITY.md lives at repo root)

## 🧩 Subtasks

- [x] Add `--high` to park flag lists (5 sites)
- [x] Add `--worktree` to goal-task flag prose (2 sites)
- [x] Extend SPEC.md layout tree with specs/, sidequest/, STATS.md
- [x] Drop "security" from AGENTS.md docs/ bullet

## 🔗 Related

- [[CORE-EPIC-433]] — parent epic: drift blind spots
- [[CORE-399]] — prior flag-surface-sync (partial; left these mirrors stale)
- [[CORE-433.3]] — follow-up: widen gates so flag-roster drift is detectable

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four findings remain accurate against current sources; pure mechanical doc fixes with no design tradeoffs. Parent epic still open; this child is the remaining surface-sync slice after CORE-399's partial pass.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — markdown-only mirror sync; no code or module-boundary work.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- PLAN line (High, under CORE-EPIC-433): four independent doc fixes. Description ~55w (under 70w cap).
- **SSOT for flags:** `ft-file-followup/SKILL.md` usage already includes `--high`; `ft-goal-task/SKILL.md` ships `--worktree`. Mirrors lag.
- **5 `--high` sites still omit it:** `SPEC/tasknote-selection.md:72` signature, `AGENTS.md:14` peer roster, `docs/GLOSSARY.md:61` sidequest entry, `ft-flowtron/SKILL.md:48` roster row, `docs/MIGRATION.md:477` retired-skill replacement cell. Body prose at tasknote-selection:78 already documents `--high` → High.
- **2 `--worktree` sites still omit it:** `ft-flowtron/SKILL.md:51` goal-task row; `docs/PLATFORMS.md:234-239` operator-mode-flag list (Claude Code table row already has the em-dash clause from CORE-399).
- **SPEC.md layout tree** (`## Layout in adopting projects`, lines 30–41) lists only PLAN.md / tasknote/ / core/ under `.flowtron/`. Live project has `specs/` + `STATS.md`; `sidequest/` is created lazily by park mode.
- **AGENTS.md:32-33** `docs/` bullet includes "security"; `docs/` has no SECURITY.md (repo-root `SECURITY.md` is correct). Drop the word only.
- **Archive skim:** CORE-399 fixed a different six-file set for the same three flags; left these residual mirrors. CORE-430.N nested validation-roster F2 under this epic as 433.4 (out of scope here). No contradicting design decision.
- **Assumptions:** Match existing roster phrasing (`--low|--med|--fut|--high`); PLATFORMS gets a third bullet for `--worktree` parallel to `--debug`/`--park`; layout tree uses optional-looking siblings with short comments; do not touch `claude/AGENTS-snippet.md` (already has `--high`) or codex mirrors (not named). KEEP IN SYNC comment on AGENTS.md:14 is roster-membership, not the flag parenthetical — still update the parenthetical for accuracy.
- **No clarifications needed.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended each doc's existing roster/list shape (CORE-399 pattern) — flag parentheticals, operator-mode bullet, layout-tree siblings with short comments. No new structure.
- Minimal refactor: none; pure additive/mirror edits + one word drop.
- Edits:
  1. `--high` → `SPEC/tasknote-selection.md`, `AGENTS.md`, `docs/GLOSSARY.md`, `claude/skills/ft-flowtron/SKILL.md` (hardlink `.claude/skills/...`), `docs/MIGRATION.md`
  2. `--worktree` → `ft-flowtron/SKILL.md` goal-task row; `docs/PLATFORMS.md` operator-mode list
  3. SPEC.md layout tree + `specs/`, `sidequest/`, `STATS.md`
  4. AGENTS.md `docs/` bullet: drop "security"
- Tests: N/A (markdown-only).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- Targeted tests: N/A — no executable code.
- Lint/type-check: N/A — markdown-only.
- Quality assertions: residual old patterns `[--low|--med|--fut]` cleared at all 5 named sites; both `--worktree` sites present; layout paths present; no "security" in AGENTS.md. Frontend ask: N/A (no UI).
- Deferred to CORE-433.3: automated gate so flag-roster drift is detectable next time.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Synced residual flag and layout doc mirrors left after CORE-399: `--high` at 5 park-roster sites, `--worktree` at 2 goal-task sites, three optional `.flowtron/` paths in SPEC.md's adopting-project tree, and a stale "security" word on AGENTS.md's `docs/` bullet. Seven markdown files; no code. Maintains doc/SSOT parity so agents see the real flag surface; gate automation remains CORE-433.3.

**Doc-drift sweep (AI-referenced docs):**
- `README.md` — no change
- `SPEC.md` — updated (layout tree +specs/, +sidequest/, +STATS.md)
- `docs/MIGRATION.md` — updated (retired `ft-sidequest` replacement includes `--high`)
- `claude/AGENTS-snippet.md` — no change (already had `--high` from CORE-399)
- `codex/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — updated (operator-mode list +`--worktree`)
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change

Out-of-list deliverables: `AGENTS.md`, `docs/GLOSSARY.md`, `SPEC/tasknote-selection.md`, `claude/skills/ft-flowtron/SKILL.md`.

**Archived:** 2026-08-10
