---
title: graph-lite yaml surface
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-EPIC-445, CORE-445.1]
touches:
  - templates/
  - SPEC.md
  - SPEC/blocked.md
parallel-safe-with:
  - CORE-445.3
---

# CORE-445.2 | graph-lite yaml surface

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]] · 🔗 [[CORE-445.1]]

## 🎯 Goal

Add optional omit-when-absent YAML keys `touches`, `blocked-by`, and `parallel-safe-with` to the four tasknote templates and SPEC frontmatter, with examples and a Related-prose mirror — no validator.

## ✅ Acceptance

- [x] Four tasknote templates (`tasknote-template.md`, `tasknote-micro-template.md`, `tasknote-starter-template.md`, `sidequest-template.md`) carry the three optional keys as YAML comments — no live empty arrays
- [x] `SPEC.md` §Tasknote frontmatter documents `touches` / `blocked-by` / `parallel-safe-with` as omit-when-absent (examples, bare IDs, two-layer `blocked-by` vs PLAN `Blocked by` vs `status: blocked`)
- [x] `SPEC.md` §Related documents the type-hint prose mirror (`[[ID]] — blocked-by: …`)
- [x] No validator, no `blocks` / `depends-on` keys, no viz / skill / fan-out / worktree-start edits
- [x] Starter `### Files to touch` remains the informal prose survey

## 🧩 Subtasks

- [x] Pattern survey: extend the loop-key omit-when-absent shape (`SPEC/loop.md` §Frontmatter keys)
- [x] Comment the three keys into the four templates (happy path pays nothing)
- [x] Document keys + example + two-layer note in `SPEC.md` §Tasknote frontmatter
- [x] Document Related type-hint in `SPEC.md` §Tasknote body shape; mirror on the full-template Related example
- [x] One-paragraph third-signal note in `SPEC/blocked.md` so it no longer claims exactly two signals
- [x] Grep: no validator, no `blocks:` / `depends-on:` keys introduced
- [x] Phase 3 markdown mental-pass + `git diff --check`
- [x] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-445]] — parent epic: graph-lite planning
- [[CORE-445.1]] — Discovery: locked the three-key YAML surface
- [[CORE-445.3]] — parallel-safe-with: fan-out / worktree-start is a different surface

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Locked by [[CORE-445.1]]; the three-key YAML surface is still the first implementation child and has not landed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Relevance / Best Practices

Contract-layer edit, not a module-boundary change. Extend the loop-key precedent (`SPEC/loop.md` §Frontmatter keys): additive, omit-when-absent, tools ignore unknown keys. Do not invent a validator, a lazy `SPEC/graph.md`, or a new skill. `SPEC.md` §Tasknote frontmatter is the documentation home (these keys are general planning fields, not a content-triggered module).

`SPEC/blocked.md` currently says there are exactly two independent blocked signals (PLAN `Blocked by` vs `status: blocked`). Introducing YAML `blocked-by` makes that claim incomplete — one paragraph there is in-scope consistency, not a fan-out into `.3`.

No in-scope refactor. Viz `parseFrontmatter` already drops unknown keys (`.5` owns parsing). Skills that list the current six fields (`ft-new-project`) are out of scope.

### Sources read

- Four templates (canonical YAML today: `title` / `status` / `tags` / `created` / `due` / `related-tasks`; starter omits `due` + `related-tasks` and has body `### Files to touch`; sidequest is `parent:` / `pickup:`)
- `SPEC.md` §Tasknote frontmatter (cite-the-template, no inline schema dump — CORE-039) + §Related + write-once
- `SPEC/loop.md` §Frontmatter keys (the shape to extend)
- `SPEC/blocked.md` (two-signal table)
- `SPEC/starter.md` ("same YAML as a standard tasknote")
- `viz/src/tasknote.ts` `parseFrontmatter` (unknown keys dropped; comments are YAML-legal)
- Archived [[CORE-445.1]] (locked surface)

### Archive skim (load-bearing)

| ID | Locked | Implication |
|---|---|---|
| CORE-445.1 | Three keys only; omit-when-absent; comment-or-omit in templates; Related type-hint; no validator / `blocks` / `depends-on` | Execute as filed |
| CORE-039 | SPEC cites the template; do not re-dump the full YAML schema | Table + example, not a second canonical schema |
| CORE-417 | High bar for new YAML; no `superseded-by:`; no archive backfill | These three keys are the bar `.1` already cleared; `supersedes:` is `.4` |
| CORE-075 / CORE-024 / CORE-030 | Related vs PLAN Blocked-by stay orthogonal | New YAML is a third layer, not a merge |
| CORE-330.2 | Contract in flowtron, runtime in the runner | Keys are facts, not a scheduler |

Grep of `archive/core/` against the four template paths + `SPEC.md` frontmatter returned the usual template-sync cohort (CORE-018 / 047 / 069 / 362 / 387 / 393 / 416) — none contradict the `.1` lock.

### Drift check

- Cited paths exist at HEAD. Template YAML is still the six-field set `.1` inventoried. No `touches` / `blocked-by` / `parallel-safe-with` keys exist yet.
- PLAN.md line matches this plan: four templates + SPEC frontmatter + examples + Related-prose mirror; no validator.
- No SPEC contradiction: write-once applies to *new* notes; "flowtron itself does not parse this frontmatter" stays true; PLAN `Blocked by` remains the don't-start gate.

### No clarifications needed

Assumptions:

1. **comment-or-omit → comments on all four templates**, no live empty arrays. PLAN requires the keys on the four templates; comments are the only reading that satisfies that without making omitted-mean-undeclared a lie.
2. **SPEC.md is the docs home**, not a new lazy module. Loop keys live in `SPEC/loop.md` because they are module-triggered; these are general.
3. **Sidequest gets the same comment block** even though it is a different artifact — PLAN says four templates.
4. **GLOSSARY / MIGRATION / skills left alone.** GLOSSARY is not AI-referenced; MIGRATION already cites §Tasknote frontmatter. Epic-level glossary/no-runtime copy belongs to `.3` / `.N`.
5. **`SPEC/blocked.md` one-paragraph third-signal note** is in-scope so the two-signal table does not stay false.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the loop-key omit-when-absent shape (`SPEC/loop.md` §Frontmatter keys). No new module, skill, or validator.

- Four templates: commented `touches` / `blocked-by` / `parallel-safe-with` (no live empty arrays). Starter comment points at `### Files to touch` as the prose survey. Full + starter Related example lines carry the type-hint parenthetical.
- `SPEC.md` §Tasknote frontmatter: key table, two-layer `blocked-by` note, example YAML, no-`blocks`/no-`depends-on`/no-validator. §Related: type-hint sentence.
- `SPEC/blocked.md`: one paragraph so the two-signal table is no longer an exhaustive claim.
- This note dogfoods `touches:` + `parallel-safe-with: CORE-445.3`.
- Tests N/A (markdown contract). No refactor. Viz / skills / fan-out / worktree-start left for later children.

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

Markdown-only contract/template change. `git diff --check` clean. Template frontmatter has the three keys only as comments (no live empty arrays). Repo grep: no `^(blocks|depends-on):` keys; no new validator. Test suite / lint / frontend N/A. Quality: one comment block reused across four templates (small repetition is clearer than a shared include); no public/tooling surface grown; `SPEC/blocked.md` updated so the two-signal table is not left stale.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` updated (this child's contract). No change: `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Landed the three optional planning keys as omit-when-absent YAML (`touches`, `blocked-by`, `parallel-safe-with`) on the four templates (comments only) and in SPEC frontmatter, with a Related type-hint and a blocked.md third-signal note. No validator.

6 deliverable files, +75/−4. `git diff --check` clean; no `blocks` / `depends-on` keys; starter `### Files to touch` unchanged as prose. Tests/lint/frontend N/A. No refactor. Doc-drift: `SPEC.md` is the contract update; every other AI-referenced doc is no change (`MIGRATION.md` already cites §Tasknote frontmatter; `EXTERNAL-AGENTS.md` / `WORKTREES.md` belong to `.3`). Maintainability: agents can declare durable deps that survive the Phase 4 PLAN stub without a new runtime or skill.

**Archived:** 2026-08-17
