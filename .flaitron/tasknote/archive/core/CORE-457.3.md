---
title: new-project-agents-gate
status: completed
tags: []
created: 2026-08-20
due:
related-tasks: [CORE-EPIC-457]
---

# CORE-457.3 | new-project-agents-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-457]]

## 🎯 Goal

`/ft-new-project` accepts `AGENTS.md` as the project-validity signal, keeping `CLAUDE.md` as sufficient but not required.

## ✅ Acceptance

- [x] `/ft-new-project` Step 0 precondition passes when either `AGENTS.md` or `CLAUDE.md` exists in cwd — `CLAUDE.md` remains sufficient but is no longer required
- [x] `docs/MIGRATION.md` §1 / §1.0 describe the updated gate accurately (no doc drift)
- [x] `claude/commands/ft-new-project.md` summary line reflects the updated gate

## 🧩 Subtasks

- [x] Update `claude/skills/ft-new-project/SKILL.md` Step 0 precondition bullet to accept `AGENTS.md` OR `CLAUDE.md`
- [x] Update `docs/MIGRATION.md` line 10 (intro parenthetical) and line 23 (§1.0 precondition description)
- [x] Update `claude/commands/ft-new-project.md` line 5 summary
- [x] Verify no other stale references to the CLAUDE.md-only gate remain (`grep -rn "CLAUDE.md" claude/skills/ft-new-project/ docs/MIGRATION.md claude/commands/ft-new-project.md`)

## 🔗 Related

- [[CORE-EPIC-457]] — parent epic (currency-surfaces); Discovery supplied by audit-repo 2026-08-20

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed current gate is CLAUDE.md-only across three doc surfaces; task description matches code exactly.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — doc/prose gate-condition edit, not a module-boundary change. No new abstraction; widening an existing OR-able precondition check.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked whether pre-existing `AGENTS.md` content needs special handling beyond Step 4's existing append behavior. Operator: plain append is sufficient — no new logic.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Evidence.** Grep for `project-validity` across the repo surfaces exactly three prose sites describing the CLAUDE.md-only gate, plus the code check itself:
- `claude/skills/ft-new-project/SKILL.md:17` — the actual Step 0 precondition: `CLAUDE.md exists in cwd. If not, stop...`
- `claude/commands/ft-new-project.md:5` — command summary: `cwd is a git repo with CLAUDE.md`
- `docs/MIGRATION.md:10` — intro parenthetical: `checks for CLAUDE.md as a project-validity heuristic`
- `docs/MIGRATION.md:23` — §1.0 precondition description: `cwd is a git repo with CLAUDE.md`

`.claude/commands/ft-new-project.md` and `.claude/skills/ft-new-project/` are symlinks to the `claude/` canonical copies — editing canonical is sufficient, no separate edit needed. `codex/skills/ft-new-project/SKILL.md` is a thin wrapper that reads-and-follows the canonical `claude/skills/ft-new-project/SKILL.md` — no separate edit needed there either. No cursor/grok `ft-new-project` files exist (Cursor/Grok load `.claude/skills/` per their documented compat surfaces, so no separate wiring).

**Archive skim.** No prior archived tasknote specifically touched this gate's condition (grep across `.flowtron/tasknote/archive/core/*.md` for `ft-new-project` returns many hits, but none edit the CLAUDE.md-only precondition itself — most just reference the skill in passing). `[[CORE-EPIC-457]]` (parent) — Discovery supplied by audit-repo 2026-08-20, no `.1` Discovery tasknote filed for this epic. Sibling `[[CORE-457.2]]` closed 2026-08-20 (STATS.md policy, unrelated surface).

**Drift.** All three doc-site line numbers and quoted text match current file contents exactly (re-read during Discovery, not recalled). No SPEC contradiction — SPEC.md is silent on `/ft-new-project`'s internal precondition logic (that lives in MIGRATION.md + the skill). Task description's parenthetical ("keep CLAUDE.md as sufficient, not required") matches the intended fix: widen from CLAUDE.md-required to (AGENTS.md OR CLAUDE.md)-required.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

  Widened an existing single-file OR-able precondition string (`X exists in cwd`) to `X or Y exists in cwd` — same shape MIGRATION.md and SKILL.md already use elsewhere (e.g. the legacy-tooling OR-list). No new pattern.

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

  No refactor — three isolated prose-string edits, each already scoped to exactly the gate description. Left the unrelated `/ft-audit-context` follow-up mention of `CLAUDE.md`/`AGENTS.md` untouched (different feature, not the validity gate).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose/doc edit, no test surface

**Implementation Notes:**

**Deliverables:**
- `claude/skills/ft-new-project/SKILL.md:17` — Step 0 precondition: `CLAUDE.md exists` → `AGENTS.md or CLAUDE.md exists`; "If not" → "If neither is present"
- `claude/commands/ft-new-project.md:5` — summary line: `cwd is a git repo with CLAUDE.md` → `cwd is a git repo with AGENTS.md or CLAUDE.md`
- `docs/MIGRATION.md:10` — intro parenthetical: `checks for CLAUDE.md as a project-validity heuristic` → `checks for AGENTS.md or CLAUDE.md as a project-validity heuristic`
- `docs/MIGRATION.md:23` — §1.0 precondition description: same `AGENTS.md or CLAUDE.md` substitution

`.claude/commands/ft-new-project.md` and `.claude/skills/ft-new-project/` are symlinks to the edited canonical `claude/` files — no separate edit. `codex/skills/ft-new-project/SKILL.md` reads-and-follows the canonical SKILL.md — no separate edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no test surface (prose/doc edit)

- [x] Ran lint/type-check on changed code — `git diff --check` clean

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

  Grep-verified all three CLAUDE.md-only gate mentions in scope were updated and no stale wording remains (one unrelated `/ft-audit-context` mention correctly left alone). No documentation now contradicts the code behavior it describes.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no UI surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Result |
|---|---|
| `git diff --check` | clean |
| grep for stale `CLAUDE.md`-only gate wording in the 3 target files | none remaining |
| symlink targets (`.claude/commands/ft-new-project.md`, `.claude/skills/ft-new-project/`) | unchanged, still resolve to edited canonical files |
| `codex/skills/ft-new-project/SKILL.md` | unchanged wrapper, still reads-and-follows canonical SKILL.md |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change (skill/command internal precondition logic, not a SPEC contract)
  - `docs/MIGRATION.md` — **updated** (§1 intro parenthetical + §1.0 precondition description — see Implementation Notes)
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Widened `/ft-new-project`'s Step 0 project-validity gate from requiring `CLAUDE.md` to accepting `AGENTS.md` OR `CLAUDE.md`, across the three prose sites that describe it: `claude/skills/ft-new-project/SKILL.md` (the actual precondition check), `claude/commands/ft-new-project.md` (command summary), and `docs/MIGRATION.md` (§1 intro + §1.0 description). `.claude/` symlinks and the Codex wrapper needed no separate edit — they resolve to / delegate to the canonical files already changed. No test surface (prose-only); `git diff --check` clean. Documentation verdict: `docs/MIGRATION.md` updated in-scope; all other AI-referenced docs unaffected. Maintainability effect: closes a false-negative that blocked adoption of flowtron in projects that already use `AGENTS.md`-only conventions (e.g. per-agent-neutral setups) without a `CLAUDE.md`.

**Archived:** 2026-08-20
