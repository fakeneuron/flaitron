---
title: archive decision links
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-EPIC-445, CORE-445.1, CORE-445.2, CORE-417]
touches:
  - SPEC.md
  - templates/
  - claude/skills/ft-task/
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-micro-task/
  - claude/skills/ft-epic-discovery/
  - docs/DOGFOOD.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
blocked-by:
  - CORE-445.2
---

# CORE-445.4 | archive decision links

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]] · 🔗 [[CORE-445.1]] · 🔗 [[CORE-445.2]] · 🔗 [[CORE-417]]

## 🎯 Goal

Add typed Related `depends-on` / `related-decision` prose, optional later-note YAML `supersedes:`, and a Phase 1 archive-skim that follows those edges — without archive backfill or a query engine.

## ✅ Acceptance

- [x] `SPEC.md` §Tasknote body shape documents Related type-hints `depends-on:` / `related-decision:` as prose labels (not YAML keys); YAML `depends-on:` stays forbidden
- [x] `SPEC.md` §Tasknote frontmatter documents omit-when-absent `supersedes:` (bare IDs, later note only) as distinct from the ⚠️ factual-false pointer (forward write on the old note)
- [x] Four tasknote templates comment `supersedes:` with the other optional planning keys — no live empty arrays
- [x] `SPEC.md` §Phase 1 Archive skim: if `touches:` exists, prefer those paths; also follow Related / `supersedes` / ⚠️ pointers; still `grep` + read; no query engine
- [x] Executable skim echoes (`ft-task`, `ft-micro-task`, `SPEC/procedures/ft-task.md`, `docs/DOGFOOD.md`) carry the follow-edges sentence
- [x] No archive backfill, no `related-decision:` YAML key, no viz parse (`.5`), no validator, no new skill

## 🧩 Subtasks

- [x] Pattern survey: extend `.2` omit-when-absent YAML + Related type-hint; keep CORE-417 ⚠️ pointer untouched
- [x] Document Related type-hints `depends-on:` / `related-decision:` in SPEC §Related; extend the full-template Related example
- [x] Add `supersedes:` to the optional-planning-keys table + template comments; fence it from ⚠️ / `superseded-by:`
- [x] Extend SPEC Phase 1 Archive skim bullet + following paragraph (touches-prefer + follow edges)
- [x] Echo the follow-edges sentence into ft-task / procedure SOP / ft-micro-task / DOGFOOD
- [x] GLOSSARY: `supersedes` term + maintenance line
- [x] Grep: no `related-decision:` YAML key; no `depends-on:` YAML key; no archive rewrites
- [x] Phase 3 markdown mental-pass + `git diff --check`
- [x] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-445]] — parent epic: graph-lite planning
- [[CORE-445.1]] — related-decision: locked typed Related + later-note `supersedes:` + skim-follows-edges; no backfill
- [[CORE-445.2]] — blocked-by: YAML surface this child extends (`supersedes:` is the fourth omit-when-absent key)
- [[CORE-417]] — related-decision: ⚠️ pointer stays factual-false-only; rejected `superseded-by:` on the old note
- [[CORE-445.5]] — follow-up: optional viz parse of new YAML (out of this child's scope)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Locked by [[CORE-445.1]]; `.2` landed the YAML/Related surface this child extends; archive decision links have not landed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Relevance / Best Practices

Contract-layer edit, not a module-boundary change. Extend the `.2` omit-when-absent YAML table and Related type-hint sentence; do not invent a query engine, a `related-decision:` key, or a viz parser (`.5`). No in-scope refactor.

`depends-on` as a Related *prose label* is not the YAML key `.2` forbade. Keep that fence explicit in SPEC so agents do not write `depends-on:` in frontmatter.

### Archive skim (load-bearing)

| ID | Locked | Implication |
|---|---|---|
| CORE-445.1 | Typed Related `depends-on` / `related-decision`; `supersedes:` on later note only; skim follows Related / `supersedes` / ⚠️; no `related-decision:` key; no backfill | Execute as filed |
| CORE-445.2 | Three planning keys; Related type-hint for `blocked-by:` / `parallel-safe-with:`; no YAML `blocks` / `depends-on`; no validator | Fourth key `supersedes:` slots into the same table/comments |
| CORE-445.3 | Fan-out + no-runtime; Sequential `.4` after `.2` | Echo `blocked-by: [CORE-445.2]` (already closed) |
| CORE-417 | ⚠️ pointer = factual-false forward write on the *old* note; rejected `superseded-by:` YAML on the corrected note; no archive backfill of other falsification-language notes | `supersedes:` is the inverse edge on the *later* note; do not reopen Option B |
| CORE-075 | Related YAML = bare IDs only | Keep `supersedes:` as bare IDs, not wikilinks |

### Drift check

- PLAN.md line matches `.1` draft (19w). Fan-out still says Sequential `.4` after `.2`; `.2` is closed.
- `SPEC.md` §Related already has the `.2` type-hint sentence; Phase 1 Archive skim is still path-grep only.
- CORE-417's three excluded cases (superseded decision / spec evolution / bulk backfill) are still in §Tasknote frontmatter — this child must not fold decision-reversal into the ⚠️ pointer.
- No contradiction with `.2`'s "no `depends-on` key" if the new labels stay in Related prose.
- Viz parseFrontmatter still drops unknown keys — `.5` owns rendering. Out of scope.

### Explicit assumptions

No clarifications needed.

- `supersedes:` is omit-when-absent, list of bare IDs, written on the later note at scaffold (or when the author knows the overturn) — never appended onto an already-archived note.
- Related labels: `depends-on:` = this decision rests on a prior one; `related-decision:` = see-also. Neither is a YAML key.
- Archive skim stays `ls` + `grep` + read. `touches:` narrows the path grep when present; Related / `supersedes` / ⚠️ are extra IDs to open, not a graph query.
- Skills that restate the skim recipe get a follow-edges sentence (same SPEC/skill split `.3` used). `ft-epic-discovery` / `ft-close-epic` skim recipes are out of scope unless they copy the path-grep paragraph verbatim in a way that would contradict SPEC — they already defer to SPEC Phase 1; leave them.
- No GLOSSARY entries for the prose labels (they are type-hints on an existing heading). One `supersedes` term, because it is a new YAML key.
- No MIGRATION bump text (optional field; ignore-if-absent already covered by `.3`).
- No archive rewrite of CORE-445.1's Fan-out or anyone else's Related.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (contract prose; no executable surface)

**Implementation Notes:**

Pattern: fourth omit-when-absent key in the `.2` table/comments; Related type-hints split into YAML mirrors (`blocked-by` / `parallel-safe-with` / `supersedes`) vs prose-only labels (`depends-on` / `related-decision`). CORE-417's ⚠️ carve-out gained one sentence pointing decision overturns at later-note `supersedes:`.

In-execution honesty vs Discovery assumptions: `docs/MIGRATION.md` listed the three `.2` keys by name, so the parenthetical gained `supersedes` (otherwise the AI-referenced adoption doc would be stale). `ft-epic-discovery` restated the path-grep recipe verbatim, so it got the follow-edges sentence too. Neither is a direction change.

No refactor. Tests N/A (contract prose; CONVENTIONS declines validators). Viz parse deferred to `.5`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable surface)

- [x] Ran lint/type-check on changed code — N/A (`git diff --check` only)

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown contract. `git diff --check` clean. Repo grep: no live `depends-on:` / `related-decision:` / `superseded-by:` / `blocks:` YAML keys; templates comment `supersedes:` only. Test suite / lint / frontend N/A. Quality: follow-edges sentence is deliberately echoed (SPEC contract + skill/SOP/dogfood executables), not abstracted; no public/tooling surface grown.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Archive decision links are now a markdown surface: typed Related `depends-on:` / `related-decision:` prose, later-note YAML `supersedes:`, and a Phase 1 skim that follows those edges plus ⚠️ pointers. The ⚠️ factual-false pointer and CORE-417's rejected `superseded-by:` on the old note are unchanged. No archive backfill.

Deliverables ~12 files, +51/−25 (plus this note). `git diff --check` clean; no forbidden YAML keys. Tests/lint/frontend N/A. No refactor. Doc-drift: `SPEC.md` (frontmatter / Related / Phase 1 skim / superseded-decision fence); `docs/MIGRATION.md` (optional-YAML parenthetical). All other AI-referenced docs: no change. GLOSSARY / DOGFOOD / skill echoes are not on that list. Maintainability: a later note can declare which decision it replaces, and Discovery will open that prior note, without a graph runtime or a retroactive archive write.

**Archived:** 2026-08-17
