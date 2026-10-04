---
title: epic-worktree fan-out
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-EPIC-445, CORE-445.1, CORE-445.2]
touches:
  - SPEC.md
  - SPEC/epic.md
  - docs/WORKTREES.md
  - docs/VISION.md
  - docs/EXTERNAL-AGENTS.md
  - claude/skills/ft-epic-discovery/
  - claude/skills/ft-worktree-start/
---

# CORE-445.3 | epic-worktree fan-out

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]] · 🔗 [[CORE-445.1]] · 🔗 [[CORE-445.2]]

## 🎯 Goal

Declare epic fan-out on Discovery `.1` (with child YAML echo), mesh WORKTREES and a warn-only `/ft-worktree-start` check, and document that flowtron will not become a graph runtime.

## ✅ Acceptance

- [x] `SPEC.md` §Tasknote body shape documents `## 🌳 Fan-out` as a third optional insert (Handoff-shaped: not in the default full template; epic-discovery pre-fills when M>1)
- [x] `SPEC/epic.md` records the fan-out contract: `.1` owns the declaration; children echo via `blocked-by` / `parallel-safe-with`; default remains serial; parallel is operator-opt-in via worktrees
- [x] `/ft-epic-discovery` injects an empty Fan-out placeholder at scaffold when M>1 and populates it when filing children
- [x] `/ft-task` Step 3b tells epic implementation children to echo Fan-out claims into YAML so a worktree copy still sees them
- [x] `docs/WORKTREES.md` meshes Fan-out + child YAML + warn-only start check; independence is no longer verbal-only
- [x] `/ft-worktree-start` warns (never locks/refuses) when the child YAML `blocked-by` lists an still-open PLAN line
- [x] No-runtime guardrail: VISION bullet + SPEC PR-archetype mirror + EXTERNAL-AGENTS paragraph + PHILOSOPHY pointer
- [x] No new skill, no validator, no lock, no archive backfill of CORE-445.1

## 🧩 Subtasks

- [x] Pattern survey: optional-insert precedent (`## 🔄 Handoff`) + warn-loudly-proceed pattern already in worktree-start (dirty git status)
- [x] SPEC.md body shape: third optional insert + short Fan-out subsection
- [x] SPEC/epic.md: fan-out + serial-default / parallel-opt-in + child YAML echo
- [x] ft-epic-discovery: inject when M>1 (Step 5); populate in Phase 2 (Step 7)
- [x] ft-task Step 3b: one-liner child YAML echo
- [x] ft-worktree-start: warn-only blocked-by check after the tasknote exists
- [x] WORKTREES.md: mesh the three surfaces
- [x] Guardrails: VISION, SPEC PR archetypes, EXTERNAL-AGENTS, PHILOSOPHY, GLOSSARY, gates.md residual 🌳, MIGRATION one-liner
- [x] Phase 3 markdown mental-pass + `git diff --check`
- [x] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-445]] — parent epic: graph-lite planning
- [[CORE-445.1]] — Discovery: locked Fan-out on `.1` + child YAML echo + warn-only start + no-runtime guardrails
- [[CORE-445.2]] — parallel-safe-with: YAML keys this child echoes; already closed
- [[CORE-445.4]] — sequential after this: archive decision links (different surface)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Locked by [[CORE-445.1]]; `.2` landed the YAML keys this child echoes; fan-out / worktree-start / no-runtime docs have not landed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Relevance / Best Practices

Contract + thin-skill edit, not a new runtime. Extend three existing shapes:

1. Optional body insert — `## 🔄 Handoff` (SPEC §Tasknote body shape): documented, not templated, happy path pays nothing. Fan-out is the same class, scoped to Discovery `.1` when M>1.
2. Warn-loudly-then-proceed — `/ft-worktree-start` already does this for a dirty main checkout. The `blocked-by` check is the same flavor: warn, never lock.
3. PR-archetype pair — VISION prose + SPEC terse mirror (loop-runtime is the immediate sibling). Graph / multi-agent *execution* runtimes are the next bullet, not a new doc class.

No in-scope refactor. No new skill (CORE-408.1 roster-bloat). Codex `ft-worktree-start` is a pointer wrapper — edit the Claude skill only. `SPEC/procedures/` has no worktree SOP; do not add one.

🌳 for `## 🌳 Fan-out` is **coherent reuse** of the residual worktree glyph (`SPEC/gates.md` §Glyph layers): Fan-out is the planning declaration of which children may use worktrees, not an unrelated concept. Update the residual parenthetical; do not add a cue.

### Sources read

- Archived [[CORE-445.1]] (locked surface B + E) and [[CORE-445.2]] (YAML keys landed; fan-out / worktree-start / EXTERNAL-AGENTS / WORKTREES deferred here)
- `SPEC.md` §Tasknote body shape (two optional inserts), §What flowtron does NOT provide / PR archetypes (7 bullets; GLOSSARY still says six)
- `SPEC/epic.md` lifecycle step 3: "Run children in order, normal flow." No fan-out table
- `SPEC/gates.md` residual: 🌳 (worktree)
- `claude/skills/ft-epic-discovery/SKILL.md` Step 5 scaffold / Step 7 child filing (Deep Pre-pass is the inject-placeholder precedent)
- `claude/skills/ft-worktree-start/SKILL.md` (no YAML read; independence is operator judgment)
- `claude/skills/ft-task/SKILL.md` Step 3b (related-tasks only at scaffold)
- `docs/WORKTREES.md`, `docs/EXTERNAL-AGENTS.md` §Not an orchestration runtime, `docs/VISION.md` §What we won't accept, `docs/PHILOSOPHY.md` §What flowtron deliberately is not, `docs/GLOSSARY.md`
- `codex/skills/ft-worktree-start/SKILL.md` (pointer only)

### Archive skim (load-bearing)

| ID | Locked | Implication |
|---|---|---|
| CORE-445.1 | Fan-out on `.1` + child YAML echo; warn-only start; no parent planning tasknote; no lock; no archive backfill; VISION/SPEC/EXTERNAL-AGENTS/PHILOSOPHY/GLOSSARY/MIGRATION | Execute as filed |
| CORE-445.2 | Three YAML keys; this child owns fan-out / worktree-start / no-runtime copy | Do not re-document the keys |
| CORE-215.1 / .3 / .6 | Parallel execution = worktrees; thin start skill; copy **child** tasknote only; no SPEC contract change for the 4-phase inside a worktree | Mesh WORKTREES; do not invent a second parallelism runtime |
| CORE-352.4 | EXTERNAL-AGENTS already rejects fan-out/swarm runtime | Add the graph-runtime bullet beside it, do not replace |
| CORE-328.1 / .4 | No programmatic delegation; one-task-per-window is social | Declaring Fan-out does not authorize chaining tasks in one window |
| CORE-358 | Out of scope: multi-worktree dirt scanners | Warn-only; no lock/dirt tooling |
| CORE-330.2 | Runtime in the runner, contract in flowtron | Same split for graph-lite fields |
| CORE-415.2 | 🌳 is a named residual (worktree); reuse across unrelated concepts is forbidden | Fan-out is related — update the parenthetical |
| CORE-417 | No archive backfill | Do not write Fan-out onto archived CORE-445.1 |

### Drift check

- Cited paths exist at HEAD. `.2` landed `touches` / `blocked-by` / `parallel-safe-with` as comments on the four templates + SPEC frontmatter. No `## 🌳 Fan-out` exists. worktree-start still does not read YAML. VISION has 7 "won't accept" bullets; EXTERNAL-AGENTS already has a fan-out/swarm rejection (execution runtime, not the markdown heading).
- PLAN.md line matches this plan: Fan-out on `.1` (child YAML echo); mesh WORKTREES + warn-only start; document no graph runtime.
- No SPEC contradiction: "run children in order" stays the default; parallel remains operator-opt-in via worktrees + explicit declarations (CORE-445.1 drift check, still true). Write-once: do not backfill archived `.1` notes. "Flowtron itself does not parse this frontmatter" stays true — the warn is skill prose reading YAML the way it already reads `status:`.
- GLOSSARY "six shapes" is already stale vs 7 SPEC/VISION bullets (loop runtime landed later). Touching that sentence to add the 8th also restores loop runtime in the list.
- `blocked-by` / `parallel-safe-with` omitted on this note: `.2` was the parallel sibling and is already closed (undeclared ≠ "safe with everyone"; the parallel claim is historical in Related).

### No clarifications needed

Assumptions:

1. **No backfill of archived CORE-445.1.** Forward-looking contract only. This epic's `.1` closed before the heading existed.
2. **Child YAML echo is skill prose, not a parser.** `/ft-task` Step 3b + `SPEC/epic.md` tell the agent to copy Fan-out claims into the child's YAML; nothing greps `.1` mechanically.
3. **Warn fires on any still-open PLAN `- [ ]` ID in the child's `blocked-by`**, not a parsed "same-epic sibling" check. Omitted `blocked-by` → no warn (undeclared).
4. **GLOSSARY + MIGRATION + gates.md residual are in-scope** (CORE-445.1 guardrails E; `.2` deferred them here). CONVENTIONS.md is the wrong home.
5. **PHILOSOPHY gets one sentence** in "What flowtron deliberately is not", not a new section.
6. **M=1 epics skip Fan-out** (nothing to fan out). `.N` is always Synthesis.
7. **Default Fan-out when Discovery does not classify:** all implementation children Sequential; `.N` Synthesis. Conservative match for "run children in order."

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended Handoff (optional insert), dirty-checkout warn (worktree-start), and the VISION/SPEC PR-archetype pair. No new skill, module, validator, or lock.

- `SPEC.md`: third optional insert + Fan-out subsection; 8th PR archetype.
- `SPEC/epic.md`: serial default stands; Fan-out section; child YAML echo.
- `/ft-epic-discovery`: inject empty Fan-out when M>1; fill at child-filing; Step 8 mental-pass row.
- `/ft-task` Step 3b + SOP Step 3: echo prose (not a parser). `.N` skipped.
- `/ft-worktree-start`: warn-only `blocked-by` vs open PLAN `- [ ]`; omitted → no warn.
- `docs/WORKTREES.md`: three-surface table. VISION / EXTERNAL-AGENTS / PHILOSOPHY / GLOSSARY / MIGRATION / gates.md residual 🌳.
- Templates untouched. Archived CORE-445.1 not backfilled.
- Tests N/A (markdown + skill prose). No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown + skill-prose contract. `git diff --check` clean. Templates have no Fan-out heading and no `blocks:` / `depends-on:` keys. Test suite / lint / frontend N/A. Quality: contract lives in SPEC; skills are the executable echo (same split as Handoff vs its skill writers). GLOSSARY PR-archetypes 6→8 also restores the omitted loop-runtime bullet. No public/tooling surface grown.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` updated (Fan-out insert + PR archetype). `docs/MIGRATION.md` updated (omit-when-absent one-liner). `docs/EXTERNAL-AGENTS.md` updated (job-graph bullet + VISION/PHILOSOPHY pointers). `docs/WORKTREES.md` updated (three-surface mesh). No change: `README.md`, `AGENTS.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`. (VISION / PHILOSOPHY / GLOSSARY / `SPEC/epic.md` / `SPEC/gates.md` / skills are outside the AI-referenced list; they were updated as deliverables.)

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Epic children can now declare parallelism on Discovery `.1` (`## 🌳 Fan-out`) and echo it in child YAML so a worktree copy still sees the claim; `/ft-worktree-start` warns on an open `blocked-by` and will not lock. Flowtron documents that it will not become a graph runtime.

Deliverables: SPEC body + epic module + three skills + WORKTREES/VISION/EXTERNAL-AGENTS/PHILOSOPHY/GLOSSARY/MIGRATION/gates residual. Templates untouched; CORE-445.1 not backfilled. `git diff --check` clean; tests/lint/frontend N/A. No refactor. Doc-drift: SPEC, MIGRATION, EXTERNAL-AGENTS, WORKTREES updated; remaining AI-referenced docs no change. Maintainability: parallel epic work is a markdown fact plus a warn, not a scheduler.

**Archived:** 2026-08-17
