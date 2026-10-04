---
title: graph-lite planning discovery
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-EPIC-445]
---

# CORE-445.1 | graph-lite planning discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]]

## 🎯 Goal

Scope the `CORE-EPIC-445` epic (`graph-lite planning`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-445.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-445.2 .. CORE-445.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-445.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-445.2 .. CORE-445.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-445 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-445]] — parent epic: graph-aware planning and parallel isolation (lite)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery` with a five-move contract brief (file ownership, epic/worktree fan-out, archive decision links, optional viz edges, no-runtime guardrails). That is epic-shaped: shared design surface across templates, SPEC, WORKTREES, VISION/PHILOSOPHY, and viz — not a single-task patch.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Relevance / Best Practices

Extend existing patterns; do not invent a parallel graph artifact.

- Additive optional YAML (precedent: `loop:` / `loop-max:` / `loop-last-run:` in `SPEC/loop.md`) — omit-when-absent; tools ignore unknown keys.
- Optional body insert (precedent: `## 🔄 Handoff`) — not in the default template if the happy path pays nothing.
- PLAN `Blocked by [[ID]]` stays the **don't-start gate** (`SPEC/blocked.md`); do not replace it.
- Starter `### Files to touch` is the informal `touches` body precedent.
- Factual archive correction stays the append-only `> **⚠️ Superseded by [[ID]]**` pointer (CORE-417). Decision reversals are *not* that pointer.
- No new skill (CORE-408.1 / CORE-390–392 roster-bloat). No parent 4-phase planning tasknote. No validator.

### Shared design surface

| Surface | What this epic would touch | Notes |
|---|---|---|
| Templates | `templates/tasknote-template.md`, `tasknote-micro-template.md`, `tasknote-starter-template.md`, `sidequest-template.md` | Canonical YAML today: `title` / `status` / `tags` / `created` / `due` / `related-tasks`. Starter omits `due` + `related-tasks`; has body `### Files to touch` + `### Related`. Sidequest is a different artifact (`parent:` / `pickup:`). |
| SPEC core | `SPEC.md` §Tasknote frontmatter, §Tasknote body shape, §Phase 1 archive-skim, §What flowtron does NOT provide / PR archetypes | Write-once: new keys apply to *new* notes. "Flowtron itself does not parse this frontmatter" — viz is the adopter-tool consumer. |
| SPEC modules | `SPEC/epic.md`, `SPEC/blocked.md`, `SPEC/tasknote-selection.md`, `SPEC/starter.md`, `SPEC/loop.md` (precedent only) | Epic: "run children in order." No fan-out table. Blocked: two independent signals (PLAN `Blocked by` vs `status: blocked`). |
| Isolation docs | `docs/WORKTREES.md`, `docs/EXTERNAL-AGENTS.md` | Worktrees: independent children only; copy **child** tasknote only. EXTERNAL-AGENTS already rejects a fan-out/swarm runtime. |
| Philosophy | `docs/VISION.md` §What we won't accept, `docs/PHILOSOPHY.md`, `SPEC.md` PR archetypes | Natural home for "why we are not building a graph runtime." |
| Supporting docs | `docs/GLOSSARY.md`, `docs/MIGRATION.md`, `docs/CONVENTIONS.md` | GLOSSARY has no `worktree` / fan-out entries. MIGRATION: optional-field + ignore-if-absent is a non-breaking bump. CONVENTIONS is the wrong first home (external conventions). |
| Viz | `viz/src/tasknote.ts` `parseFrontmatter`, `viz/src/parser.ts` `Task.blockedBy` / `relatedTasks` | Unknown YAML keys are dropped, not rejected. `Task.blockedBy` is **parsed and unused in UI**. No graph renderer. Default view = priority-grouped list. |
| Skills | `ft-worktree-start` / `ft-worktree-end`, `ft-epic-discovery` pre-fill | Start/end do not read any parent declaration. Independence is operator judgment. |
| Parent epic artifact | PLAN line only | Rare `CORE-EPIC-*.md` notes (e.g. CORE-EPIC-194) are post-hoc close-out hygiene, not planning records. |

### Existing dependency / ownership mechanisms (do not compete)

1. PLAN `[[TASK-ID]]` → viz `relatedTasks` (Related chip, default off).
2. PLAN `Blocked by [[ID]]` (wikilink-only) → viz `blockedBy` (no UI consumer).
3. YAML `related-tasks:` + `## 🔗 Related` — predecessor / follow-up / parent epic. Bare IDs only (CORE-075).
4. `status: blocked` — mid-Phase-2 park, not an edge.
5. `> **⚠️ Superseded by [[ID]]**` — factual-false only; not decision overturn; not a YAML key (CORE-417).
6. Worktree eligibility — verbal: "no hard dependencies on in-flight siblings."
7. Sidequest `parent:` — interrupted-session pointer, not file ownership.

### Archive skim (load-bearing)

| ID | Locked | Implication |
|---|---|---|
| CORE-215.1 / .6 | Parallel *execution* = worktrees; workflow-orthogonal; one child per tree | Cite WORKTREES; do not invent a second parallelism runtime |
| CORE-328.1 / .4 | No programmatic delegation; one-task-per-window is social | Declaring deps does not authorize chaining tasks in one window |
| CORE-352.4 | EXTERNAL-AGENTS: contract, not scheduler; no fan-out/swarm runtime | Graph edges are facts, not a job graph |
| CORE-408.1 / .2 | Probe owns no tasknote; no runner/dispatcher | Probes may *read* declarations; they do not own nodes |
| CORE-194.1 / .2 | Markdown-over-JSON; no GSD orchestrator | No extra planning artifact class |
| CORE-330.2 | Runtime in the runner, contract in flowtron | Same split for any graph-lite field |
| CORE-358 | Paper-complete; out of scope: multi-worktree dirt scanners | Do not add lock/dirt tooling |
| CORE-024 / CORE-030 / FE-012 | PLAN Blocked-by vs related are orthogonal | Extend; do not merge edge types |
| CORE-417 | No `superseded-by:` YAML; no PLAN-only durable edges; no backfill | New YAML needs a high bar; Phase 4 stubs delete PLAN descriptions |

### Drift check

- Operator label `GRAPH-LITE-001` is not a declared prefix; remapped to `CORE-EPIC-445` (confirmed).
- Cited paths exist at HEAD: four templates, `SPEC.md` frontmatter/body/Phase 1, `SPEC/epic.md`, `SPEC/blocked.md`, `docs/WORKTREES.md`, `docs/EXTERNAL-AGENTS.md`, `docs/VISION.md`, `viz/src/tasknote.ts`, `viz/src/parser.ts`.
- `SPEC.md` still says flowtron does not parse frontmatter; viz does parse a subset — documented adopter-tool contract, not drift.
- Parent-epic tasknotes are not a current planning surface (glossary: parent = PLAN row).
- No contradiction with SPEC "run children in order" if parallel remains operator-opt-in via worktrees + explicit declarations.
- PLAN.md line for this Discovery matches the work in progress.

### Proposed minimal markdown surface (pending scoping)

**Invariant.** Optional, omit-when-absent, human-readable, no validator, no new skill, no parent planning tasknote, no archive backfill, no runtime.

**A. Child/tasknote YAML (the durable planning fields)**

Three additive keys only (loop-key precedent). Bare IDs, not wikilinks. Paths as strings/globs.

```yaml
touches:
  - templates/
  - SPEC.md
blocked-by:
  - CORE-445.2
parallel-safe-with:
  - CORE-445.3
```

- Omitted means *undeclared*, not "touches nothing" / "safe with everyone."
- `blocked-by` on the tasknote is the **durable planning dep** (survives Phase 4 PLAN stub). PLAN `Blocked by [[ID]]` remains the **don't-start / park-visible gate**.
- Do **not** add `blocks` (inverse of `blocked-by`; derivable by grep) or `depends-on` (synonym).
- Mirror in `## 🔗 Related` with a one-line type hint when useful: `[[CORE-445.2]] — blocked-by: templates land first`.
- Templates: comment-or-omit in the shipped YAML (happy path pays nothing). SPEC documents the keys as optional. Starter `### Files to touch` stays as the prose survey; YAML `touches:` is the short queryable list once known.

**B. Epic fan-out (lives on `.1`, echoed on children)**

Parent stays a PLAN checkbox. Optional `## 🌳 Fan-out` insert on the Discovery `.1` (epic-discovery pre-fill when M>1; not in the default full template):

```markdown
## 🌳 Fan-out

- **Parallel:** [[CORE-445.2]] · [[CORE-445.3]]
- **Sequential:** [[CORE-445.4]] after .2
- **Synthesis:** [[CORE-445.N]] (audit; no extra parent synthesis task)
```

Each child also carries its own `parallel-safe-with` / `blocked-by` so a worktree (which copies **only** the child note) still sees the claim. `/ft-worktree-start` may **warn** if the child declares `blocked-by` an open sibling; it must not lock or refuse (operator-driven).

**C. Archive as a lightweight decision graph**

- No new database. No `related-decision:` key.
- Backward edges: `related-tasks` + typed `## 🔗 Related` lines (`depends-on` / `related-decision` as prose labels).
- Optional YAML `supersedes: [ID]` on the *later* note only (I replace that decision). Distinct from the ⚠️ pointer, which stays the only *forward* write onto an old archive, and only for factual-false claims.
- Phase 1 archive-skim: if `touches:` exists, prefer those paths; also follow Related / `supersedes` / ⚠️ pointers. Still `grep` + read; no query engine.

**D. Viz (trivial overlay or skip)**

- Do not add required `Task` fields or a graph view.
- Cheapest honest win: render the already-parsed PLAN `blockedBy` as a chip (Related-chip sibling; default off or on).
- Optional: parse new YAML keys onto `TasknoteFrontmatter` as omitted-when-absent arrays; show in TaskDetail.
- Default list/board experience unchanged.

**E. Guardrails**

- New VISION §What we won't accept bullet: graph / multi-agent *execution* runtimes (declare in markdown; never schedule, lock, or auto-fan-out).
- Terse mirror in SPEC PR archetypes.
- One paragraph in EXTERNAL-AGENTS §Not an orchestration runtime + PHILOSOPHY pointer.
- GLOSSARY: `touches`, `parallel-safe-with`, `worktree` (the last is an existing-doc hole).
- MIGRATION: optional fields; no forced adopter migration; no new skill symlink.

### Resolved scoping

| Question | Choice |
|---|---|
| Planning-field home | Optional YAML + Related prose. Omit-when-absent. Bare IDs. |
| blocked-by vs PLAN `Blocked by` | Two layers. PLAN = don't-start gate. YAML = durable planning dep. No `blocks` / `depends-on`. `status: blocked` stays park-only. |
| Fan-out home | `.1` `## 🌳 Fan-out` + child YAML echo. No parent planning tasknote. Synthesis = existing `.N` audit. |
| Archive edges | Typed Related prose (`depends-on` / `related-decision`) + optional `supersedes:` on the later note. ⚠️ pointer stays factual-false only. No backfill. |
| Viz | Trivial overlay: PLAN `blockedBy` chip + optional YAML in TaskDetail. No new view. Keep `.5`. |
| Worktree-start | Warn-only if child YAML `blocked-by` an open sibling. Never lock. |
| Adopter wiring | No new skill. Optional fields. Non-breaking bump; MIGRATION one-liner. |

### Draft child lines (to file in Phase 2)

- `CORE-445.2` [medium] | graph-lite yaml surface — Add optional omit-when-absent YAML keys touches, blocked-by, and parallel-safe-with to the four tasknote templates and SPEC frontmatter, with examples and a Related-prose mirror. No validator. **(25w)**
- `CORE-445.3` [medium] | epic-worktree fan-out — Declare epic fan-out on Discovery .1 (child YAML echo); mesh WORKTREES and a warn-only worktree-start check; document that flowtron will not become a graph runtime. **(25w)**
- `CORE-445.4` [medium] | archive decision links — Typed Related depends-on / related-decision lines; optional supersedes: on later notes; Phase 1 skim follows them; no archive backfill. **(19w)**
- `CORE-445.5` [light] | viz optional edges — Show PLAN blockedBy as a chip; optionally parse new YAML in TaskDetail. No new view or required Task fields. **(19w)**
- `CORE-445.N` — keep as-filed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Filed 4 implementation children under `CORE-EPIC-445` (2-space indent, between `.1` and `.N`). M stayed 4. Word counts: `.2` 25w · `.3` 25w · `.4` 19w · `.5` 19w (all ≤50w target). Models: `.2`/`.3`/`.4` `[medium]`, `.5` `[light]`. Parent long description refined at closure (placeholder dropped). `.N` kept as-filed.

Downstream-impact scan: no other active PLAN entries (High/Low `(none)`, Future empty, Medium is this cohort only). No downstream impact.

Pattern: CORE-EPIC-438 / CORE-EPIC-416 cohort filing. Tests N/A (PLAN.md filing only).

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

Markdown mental-pass on the PLAN.md cohort: 2-space indent on every child; bold IDs intact; `[model]` on every line; shortnames ≤30; em-dash separators; long descriptions ≤70w (max 25w); no trailing whitespace. Test suite / lint / frontend N/A (pure PLAN + tasknote filing).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change on every AI-referenced doc (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`). Contract edits land in `.2`–`.5`.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed `CORE-EPIC-445` and closed its Discovery. Implementation children `.2`–`.5` are scoped: optional YAML planning fields, epic/worktree fan-out plus a no-runtime guardrail, archive decision links, and a trivial viz overlay. Existing adopters need no migration.

Surface inventoried (templates, SPEC frontmatter/body/epic/blocked, WORKTREES, EXTERNAL-AGENTS, VISION, viz parser). Locked markdown surface is omit-when-absent YAML `touches` / `blocked-by` / `parallel-safe-with` plus typed Related prose; fan-out on `.1` with child YAML echo; `supersedes:` on later notes only. Child word counts 25 / 25 / 19 / 19. M stayed 4. `.N` unchanged. No downstream PLAN impact. Doc-drift: no change (contract edits belong in the children).

**Archived:** 2026-08-17
