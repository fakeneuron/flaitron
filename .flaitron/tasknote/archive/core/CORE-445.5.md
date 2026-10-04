---
title: viz optional edges
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-EPIC-445, CORE-445.1, CORE-445.2]
touches:
  - viz/src/tasknote.ts
  - viz/src/ui/RelatedChip.tsx
  - viz/src/ui/TaskRowInner.tsx
  - viz/src/ui/TaskDetail.tsx
  - viz/src/ui/SettingsModal.tsx
  - viz/src/visibilityPrefs.ts
---

# CORE-445.5 | viz optional edges

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]] · 🔗 [[CORE-445.1]] · 🔗 [[CORE-445.2]]

## 🎯 Goal

Show already-parsed PLAN `blockedBy` as an opt-in Related-chip sibling, and parse omit-when-absent YAML planning keys onto TaskDetail — no new view and no new required `Task` fields.

## ✅ Acceptance

- [x] PLAN `Blocked by [[ID]]` (`Task.blockedBy`) renders as a Related-chip sibling behind a new `rowChips.blocked` toggle; default OFF (board unchanged)
- [x] No new required `Task` fields; no graph / dependency view; default list/board experience unchanged when the toggle is off
- [x] `parseFrontmatter` maps omit-when-absent `touches` / `blocked-by` / `parallel-safe-with` / `supersedes` onto `TasknoteFrontmatter` (undefined when absent or empty; unknown keys still ignored)
- [x] TaskDetail shows those arrays when present (compact meta, not a new settings section); absent keys render nothing
- [x] Targeted viz tests cover the chip toggle, default-off, and optional YAML parse/display; typecheck + lint clean

## 🧩 Subtasks

- [x] Pattern survey: extend RelatedChip + `rowChips.related` (CORE-098.3); omit-when-absent arrays like `due` (not `relatedTasks: []`)
- [x] Add `rowChips.blocked` (default false) to visibilityPrefs + SettingsModal; coerce missing stored keys to default
- [x] Generalize RelatedChip with glyph/tone; render `task.blockedBy` in TaskRowInner next to Related
- [x] Parse the four optional YAML keys in `parseFrontmatter`; export `TasknoteFrontmatter`
- [x] Show present keys as compact TaskDetail meta (bare IDs via WikilinkMarkdown); skip when omitted
- [x] Tests: parseFrontmatter omit/present; visibilityPrefs coerce; App settings toggle for Blocked; TaskDetail meta when present
- [x] `npm --prefix viz test` (targeted) + typecheck + lint
- [x] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-445]] — parent epic: graph-lite planning
- [[CORE-445.1]] — related-decision: trivial overlay — PLAN `blockedBy` chip + optional YAML in TaskDetail; no new view; keep `.5`
- [[CORE-445.2]] — depends-on: YAML keys this child parses (`touches` / `blocked-by` / `parallel-safe-with`; `.4` added `supersedes:`)
- [[CORE-445.4]] — related-decision: `supersedes:` is the fourth omit-when-absent key; viz parse was out of `.4`
- [[FE-031]] — related-decision: chip-trim deleted always-on BlockerChip; opt-in overlay must stay default-off
- [[CORE-098.3]] — related-decision: RelatedChip + `rowChips.related` default-off is the sibling pattern to extend

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Locked by [[CORE-445.1]]; `.2`–`.4` landed the markdown surface; viz still drops the new YAML and does not render `Task.blockedBy`.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Relevance / Best Practices

Viz overlay only. Parser already fills `Task.blockedBy` from PLAN `Blocked by [[ID]]` and drops unknown YAML. Extend CORE-098.3's opt-in RelatedChip + `rowChips.*` toggle; do not resurrect FE-031's always-on `BlockerChip`, add a graph view, or put YAML deps on `Task`.

Touched responsibilities: PLAN parse stays in `parser.ts` (no change); tasknote YAML in `tasknote.ts`; row chrome in `TaskRowInner` / `RelatedChip` / `visibilityPrefs` / `SettingsModal`; detail overlay in `TaskDetail`. Dependency direction: parser → Task; gray-matter → `parseFrontmatter` → TaskDetail. In-scope structural tweak: optional glyph/tone on RelatedChip so Blocked can share the list-chip without a Chip primitive (FE-018 deferred unification). No other refactor.

### Source files reviewed

- `viz/src/parser.ts` — `Task.blockedBy: string[]` required; extracted; unused in UI.
- `viz/src/tasknote.ts` — `TasknoteFrontmatter` unexported; maps `related-tasks` always to `[]`; unknown keys dropped.
- `viz/src/ui/RelatedChip.tsx` — display-only, `→` glyph, max 3 + overflow, slate.
- `viz/src/ui/TaskRowInner.tsx` — `showRelated = rowChips.related && task.relatedTasks.length > 0`.
- `viz/src/visibilityPrefs.ts` — `related: false` default; missing booleans coerce to default (no version bump for a new key).
- `viz/src/ui/SettingsModal.tsx` — `ROW_CHIP_KEYS` / labels drive the checkboxes.
- `viz/src/ui/TaskDetail.tsx` — Goal / Acceptance / Subtasks; meta header; no planning-key display.

### Archive skim

`archive/core/` + `archive/fe/` for viz parser / RelatedChip / visibilityPrefs / TaskDetail:

- **CORE-445.1** — locked overlay: PLAN `blockedBy` chip (Related sibling; default off or on) + optional YAML on TasknoteFrontmatter shown in TaskDetail; no new view / required Task fields; keep `.5`.
- **CORE-445.2** — YAML keys exist; viz parse deferred here. `parseFrontmatter` drops unknown keys.
- **CORE-445.4** — `supersedes:` is the fourth key; "no viz parse (`.5`)".
- **CORE-445.3** — Fan-out on `.1` + child YAML echo. `.1` was not backfilled; this child's Fan-out claim is unnamed → omit `blocked-by` / `parallel-safe-with` on this note.
- **FE-031** — deleted always-on BlockerChip / RelatedChip / BackRefChip for clutter. Overlay must be opt-in default-off.
- **CORE-098.3** — reintroduced RelatedChip behind `rowChips.related` default-off. Pattern to extend.
- **FE-018** — chip-family unification deferred; family resemblance over a Chip primitive.
- **FE-012** — old inbound BackRefChip; out of scope (would be a new view/signal).
- No ⚠️ / `supersedes:` pointers on these hits that change this plan.

### Drift check

- Cited paths exist. `Task.blockedBy` is still parsed and unused. `parseFrontmatter` still drops unknown keys.
- PLAN.md line matches: chip + optional YAML in TaskDetail; no new view or required Task fields.
- SPEC §Tasknote frontmatter: omit-when-absent; viz is the adopter-tool consumer; no validator.
- SPEC §What flowtron does NOT provide: no graph / query runtime — a chip + detail meta is not that.
- `.1` Fan-out example named `.2`/`.3` parallel, `.4` sequential after `.2`, `.N` synthesis — **not** `.5`. Echo omitted.
- No line-number citations on the PLAN line. No factual-false archive claim to pointer.

### Clarifications

No clarifications needed. Assumptions:

1. **"Optionally parse"** on the PLAN line is this child's second deliverable (omit-when-absent YAML), not a skip — `.1` kept `.5` covering both.
2. **Chip default OFF**, matching Related — satisfies "default list/board experience unchanged" and FE-031.
3. **All four** optional planning keys (`touches`, `blocked-by`, `parallel-safe-with`, `supersedes`), not only `blocked-by`.
4. YAML `blocked-by` stays on TaskDetail; the row chip is PLAN `Task.blockedBy` only (two-layer contract).
5. No settings toggle for TaskDetail planning meta — show when present, nothing when omitted.
6. Do not bump `VisibilityPrefs.version`; coerce a missing `blocked` boolean to `false`.
7. Subtask rows stay chip-minimal (CORE-098.3); blocked chip is TaskRowInner only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended CORE-098.3's opt-in RelatedChip rather than resurrecting FE-031's always-on BlockerChip. RelatedChip gained optional `glyph` / `tone` (defaults preserve `→` + slate); blocked rows pass `⊘` + rose. `rowChips.blocked` defaults false and coerces when missing — no prefs version bump.

`parseFrontmatter` maps the four omit-when-absent YAML keys with spread-when-present so absent/empty stays `undefined` (unlike `relatedTasks: []`). TaskDetail renders `planningMetaRows` only when keys exist; PLAN `blockedBy` stays a row chip, YAML `blocked-by` stays detail meta.

No new `Task` fields. SubtaskRow still chip-minimal. Chip-primitive unification still deferred (FE-018).

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

Targeted: `src/tasknote.test.ts` + `src/visibilityPrefs.test.ts` + `src/ui/TaskDetail.test.tsx` + `src/ui/App.test.tsx` — 130 passed. `npm --prefix viz run typecheck` and `lint` clean. Quality: RelatedChip generalization avoids a second list-chip file; no dead code; public surface grew by exported `TasknoteFrontmatter` + `planningMetaRows` (needed by tests/UI); no code-facing docs to update (viz overlay, not SPEC). Dev server: http://localhost:5120

Waiting on 👁️ visual confirmation.

Operator confirmed 2026-08-17 (`go`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Viz overlay for graph-lite planning: PLAN `blockedBy` is an opt-in Related-chip sibling (default off), and omit-when-absent YAML planning keys show as compact TaskDetail meta. No new `Task` fields, no graph view.

Paths: `viz/src/tasknote.ts` (+ optional YAML parse), `RelatedChip.tsx` (glyph/tone), `TaskRowInner.tsx`, `SettingsModal.tsx`, `visibilityPrefs.ts`, `TaskDetail.tsx` (`planningMetaRows`). Tests in `tasknote.test.ts`, `visibilityPrefs.test.ts`, `TaskDetail.test.tsx`, `App.test.tsx`. Verification: 130 targeted tests passed; `npm --prefix viz run typecheck` + `lint` clean; 👁️ confirmed. Refactors: RelatedChip generalized instead of a new BlockerChip (FE-018 Chip primitive still deferred). Doc-drift: no change on every AI-referenced doc (viz overlay is not a contract-doc surface). Maintainability: two-layer blocked signal is now visible without changing the default board.

**Archived:** 2026-08-17
