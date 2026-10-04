---
title: Migrate natabula to flowtron
status: completed
priority: High
area: core
model: opus
tags: [migration, de-scoped]
created: 2026-05-01
due:
related-tasks: [CORE-007, CORE-008, CORE-012]
---

# CORE-021 | Migrate natabula to flowtron

**Goal:** Bring the natabula repo onto the flowtron workflow, choosing between fresh adoption (`/new-project` skill) and prior-workflow migration (`docs/MIGRATION.md` §2) based on Phase 1 discovery.

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [ ] **Relevance Assessment**

  **Verdict:** De-scope (confirmed by user 2026-05-01)
  **Rationale:** The migration the task describes is already complete. natabula was greenfield-bootstrapped on flowtron yesterday (2026-04-30) via NAT-002 (`feat: bootstrap skeleton with Flowtron v0.1.1 submodule` — natabula commit `58a6c31`). Neither path the task description offers applies: there is no fresh `/new-project` adoption to perform (already done by hand, since CORE-012 hadn't shipped yet), and there is no prior workflow tooling to migrate per `docs/MIGRATION.md` §2 (natabula was greenfield).

- [x] Read relevant source files
- [x] **Drift check** — see findings below; significant drift surfaced
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

**Discovery Notes:**

State of `~/code/natabula` (verified 2026-05-01):

- `_project/flowtron/` git submodule pinned to `v0.1.1` (commit `a79e0fe`)
- `_project/PLAN.md` present with `NAT-*` task IDs (NAT-001, NAT-003 → NAT-011)
- `_project/tasknote/` with active `NAT-001.md`, `README.md`, and `tasknote-template.md` symlink → submodule
- `.claude/commands/task.md` and `.claude/skills/task` symlinked to `_project/flowtron/claude/...`
- Repo `CLAUDE.md` carries the flowtron Workflow block + `NAT-` prefix declaration
- Repo `README.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`, `docs/NEXT.md` all reference flowtron correctly
- natabula's own PLAN.md `Completed` section: `[x] NAT-002 — Repo skeleton + Flowtron submodule (v0.1.1) + .claude/ symlinks. Completed 2026-04-30.`
- natabula git history: only two commits (bootstrap + exploratory plan) — no pre-flowtron legacy ever existed

Drift findings vs. CORE-021's task description:

- Path A (`/new-project` skill): N/A — natabula was bootstrapped before CORE-012 shipped, and the bootstrap is done.
- Path B (`docs/MIGRATION.md` §2 — prior workflow tooling): N/A — natabula was greenfield; nothing to migrate from.
- Submodule version: natabula is pinned to `v0.1.1`, so it predates CORE-012 (`/new-project`) and CORE-017 (frontmatter). This is a *normal version bump*, not a migration — and natabula's own NAT-* backlog (NAT-003, NAT-005, NAT-010, NAT-011) already covers downstream alignment with shipped flowtron features.

The CORE-021 entry was filed today (`06787c2 chore: file CORE-021 (natabula migration) at High`), which appears to overlook NAT-002 having shipped 2026-04-30.

**Execution Steps:**

(deferred pending Relevance verdict — if De-scope is confirmed, jump to Phase 4 closure)

## Phase 2: Execution

_Skipped — De-scope verdict in Phase 1._

## Phase 3: Testing & Linting

_Skipped — De-scope verdict in Phase 1._

## Phase 4: Closure

- [x] Verified all prior phases complete (Discovery → De-scope; Phases 2-3 intentionally skipped)
- [x] Updated docs/inventories affected by the change (PLAN.md only — no code/docs to revise; the de-scope is the deliverable)
- [x] Updated PLAN.md (line flipped to `Completed 2026-05-01` with de-scope rationale, moved to `## Completed` section)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

De-scoped. CORE-021 was filed 2026-05-01 to migrate natabula onto flowtron, but Phase 1 discovery revealed natabula had already been greenfield-bootstrapped onto flowtron the previous day via NAT-002 — submodule pinned to `v0.1.1`, `.claude/commands/task.md` and `.claude/skills/task` symlinked into the submodule, `_project/PLAN.md` with `NAT-*` IDs, tasknote directory + symlinked template, and the canonical Workflow block in repo `CLAUDE.md`. Both paths the task description offered were N/A (`/new-project` skill: bootstrap was manual and predates CORE-012; `docs/MIGRATION.md` §2: no prior workflow tooling to migrate from, since natabula was greenfield). Pinned-version drift (v0.1.1 → HEAD, predating CORE-012 + CORE-017) is a normal submodule bump and is already covered by natabula's own backlog (NAT-003 / NAT-005 / NAT-010 / NAT-011). No code changes shipped from this tasknote; the value delivered is the explicit drift surfacing recorded in PLAN.md so the natabula migration question doesn't get re-filed.

**Archived:** 2026-05-01
