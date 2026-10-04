---
title: Evolve tasknote template (YAML frontmatter + prettier Markdown)
status: completed
priority: High
area: core
model: opus
tags: [templates, workflow]
created: 2026-05-01
due:
related-tasks: [CORE-018, CORE-019, CORE-020]
---

# CORE-017 | Evolve tasknote template (YAML frontmatter + prettier Markdown)

**Goal:** Evolve the tasknote template with YAML frontmatter and a polished Markdown structure (title, status, priority, tags, created, due, related-tasks), and propagate the format through `templates/`, the `/task` skill, and `tasknote-README.md` so tasknotes are machine-parseable without losing AI/human editability.

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task intent is clear (add YAML frontmatter + tighten body for parseability), all three named touchpoints exist, and CORE-019/CORE-020 are explicit downstream consumers — meaning the frontmatter win pays off only if this lands. No reason to re-scope or de-scope.

- [x] Read relevant source files
- [x] **Drift check** — PLAN.md cites `templates/`, `/task` skill, and `tasknote-README.md`. All three exist at expected paths (`templates/tasknote-template.md`, `claude/skills/task/SKILL.md` — symlinked into `.claude/`, `templates/tasknote-README.md`). The `/task` skill hard-codes the current `**Goal:** **Priority:** **Area:** **Model:** **Status:**` shape and the `TASK-ID | Title` H1 in Step 3. SPEC.md §"The 4-phase workflow" duplicates the phase-checklist text from the template — minor SPEC update needed if checklist text changes. No actual drift in the plan's claims.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

**Discovery Notes:**

Touchpoints identified (in scope):

- `templates/tasknote-template.md` — the canonical template (primary edit)
- `claude/skills/task/SKILL.md` Step 3 — references field-line shape + H1 form; needs to teach the skill how to fill the new frontmatter
- `templates/tasknote-README.md` — only references template by name; minor or no edit
- `SPEC.md` — small additive note about frontmatter; phase-checklist text stays unchanged unless we deliberately rewrite it

Out of scope (deferred to downstream tasks):

- `viz/` parser — CORE-019 owns this
- `claude/skills/new-project/SKILL.md` + `docs/MIGRATION.md` — CORE-020 owns this
- Polished body restructure (emoji headings, GH checklists, `[[TASK-ID]]` linking, navigation header, Subtasks/Acceptance/Related sections) — CORE-018 owns this; CORE-017 is **frontmatter + minimum body adjustment**, not a full body rewrite

Key decisions to surface before execution steps:

1. **Frontmatter scope** — pure YAML replacing all header fields, vs. YAML for machine fields + keep `Goal:` as prose, vs. dual representation.
2. **New field set** — which of `tags / created / due / related-tasks / completed / archived` to include and where they default.
3. **Backwards-compat** — leave archived tasknotes as-is or backfill them.
4. **Scope split with CORE-018** — keep this task to frontmatter + minimal body tweaks (recommended given PLAN.md files them as separate High-priority tasks).

**Decisions confirmed (2026-05-01):**

- Frontmatter scope: YAML for machine fields; keep `**Goal:**` as a prose sentence in body
- Field set: `title, status, priority, area, model, tags, created, due, related-tasks` (no `completed`/`archived` in frontmatter)
- Status enum (kebab-case in YAML): `not-started | in-progress | blocked | completed`
- Priority values match PLAN.md headings (title-case): `Critical | High | Medium | Low | Future Opportunities`
- Defaults at scaffold: `status: in-progress`, `tags: []`, `due:` (empty), `related-tasks: []`, `created:` = today
- Backwards-compat: archived tasknotes left as-is — historical write-once records
- Scope split: this task is frontmatter + skill propagation + minimal SPEC note; CORE-018 owns the polished body restructure
- SPEC version bump (v0.1.1 → v0.2.0) and release tag are deferred to a follow-up task (matches the CORE-014/CORE-015 pattern of release-only and version-cleanup as separate tasks)

**Execution Steps:**

1. **Update `templates/tasknote-template.md`**: add YAML frontmatter block with the agreed field set above the H1; remove `**Priority:** **Area:** **Model:** **Status:**` body lines (now in frontmatter); keep H1, `**Goal:**` line, all phase checklists, and the bottom `**Archived:** YYYY-MM-DD` line unchanged.

2. **Update `claude/skills/task/SKILL.md` Step 3**: rewrite the field-filling instructions to fill the YAML frontmatter (including auto-filling `created` to today's date in `YYYY-MM-DD`, defaulting `tags: []`, `due:` empty, `related-tasks: []`); preserve the AskUserQuestion prompt for the model field; update the H1 form note.

3. **Update `templates/tasknote-README.md`**: add a one-line note that new tasknotes carry YAML frontmatter and point at `tasknote-template.md` as the canonical schema. No structural rewrite.

4. **Update `SPEC.md`**: add a small additive subsection (likely under "Working in the flowtron repo itself" or as a new short "Tasknote frontmatter" section) describing the YAML schema and pointing at `templates/tasknote-template.md` as the canonical reference. Phase-checklist text unchanged.

5. **Sanity check**: visually confirm the template renders cleanly (frontmatter shows as a YAML block in GitHub/most viewers); mentally walk the `/task` skill against a new task ID to confirm the new Step 3 still produces a complete tasknote; run `viz/` parser tests to confirm no regression (parser only consumes PLAN.md, expected green).

6. **Phase 4 closure**: update PLAN.md (flip CORE-017 to `[x]` with `Completed 2026-05-01`, move under `## Completed`), move tasknote to `_project/tasknote/archive/core/CORE-017.md`, recap to user.

## Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

**Pattern survey:** YAML frontmatter (`---` block at file top) is the cross-ecosystem convention — Jekyll, Hugo, Obsidian, MkDocs, gray-matter all use it. Field shape (kebab-case status enum, optional fields with explicit empties like `due:` and `tags: []`) tracks GitHub Issue templates. Extending an established convention rather than inventing a custom format. No existing flowtron parser to constrain choices (CORE-019 will be the first consumer).

**Files changed:**

1. `templates/tasknote-template.md` — added 11-line YAML frontmatter block at file top with the agreed schema; removed the four `**Priority:** **Area:** **Model:** **Status:**` body lines (now in frontmatter); kept H1, `**Goal:**` line, all phase checklists, and bottom `**Archived:**` line unchanged.
2. `claude/skills/task/SKILL.md` Step 3 — rewrote field-filling instructions: split into "YAML frontmatter" and "Body" subsections, documented each frontmatter field (defaults, value enum, derivation source), preserved the AskUserQuestion model prompt + the `created:` auto-fill rule.
3. `templates/tasknote-README.md` — extended the `tasknote-template.md` bullet under Layout with one sentence describing frontmatter fields and pointing at SPEC §"Tasknote frontmatter".
4. `SPEC.md` — added new section "Tasknote frontmatter" between §"Task ID convention" and §"The 4-phase workflow" with the canonical YAML schema in a fenced block, placement note (above H1), Goal-stays-in-body rationale, and adopting-project / archived-tasknote contracts.
5. `_project/tasknote/CORE-017.md` (this file) — converted to the new format mid-Phase-2 to validate the new shape on a live tasknote.

**Tests:** ran `viz/` parser test suite (`npm test -- --run`): 6/6 green. Parser only consumes PLAN.md so no regression expected, but confirmed.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- `viz/` parser test suite: 6/6 green. Parser only consumes PLAN.md so no impact expected; ran for reassurance.
- Lint/type-check: N/A — all four edited files are Markdown (no TS/JS/Python). No project-level Markdown linter configured.
- YAML validation: parsed both `templates/tasknote-template.md` and `_project/tasknote/CORE-017.md` frontmatter via `node` — both clean, all 9 fields present, types correct.
- Stale-shape grep: confirmed no remaining `**Priority:** / **Area:** / **Model:** / **Status:**` body-field lines in `templates/`, `claude/`, or `_project/tasknote/CORE-017.md`. (`SPEC.md:4: **Status:** Stable` is the spec document's own metadata header — unrelated to tasknote fields.)
- Visual confirmation: user has `CORE-017.md` open in IDE; will ask for template rendering confirmation before Phase 4.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed YYYY-MM-DD`)
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Added YAML frontmatter to the tasknote template — 9-field schema (`title`, `status`, `priority`, `area`, `model`, `tags`, `created`, `due`, `related-tasks`) sitting above the H1, with `**Goal:**` retained as a prose sentence in the body and the four-phase checklists unchanged. Propagated through the `/task` skill (Step 3 rewritten to fill frontmatter + body, including `created:` auto-fill and explicit defaults for `tags`, `due`, `related-tasks`), `templates/tasknote-README.md` (Layout bullet describes the schema and points at SPEC), and `SPEC.md` (new §"Tasknote frontmatter" between Task ID convention and 4-phase workflow with the canonical YAML schema in a fenced block).

**Key decisions (locked in Phase 1):**

- Frontmatter scope: YAML for machine fields, Goal stays in body as prose (chose the clean human/machine split).
- Field set: full PLAN.md spec; no `completed`/`archived` in frontmatter (PLAN.md and the body `**Archived:**` line stay the source of truth for those).
- Backwards-compat: archived tasknotes left as-is — they are write-once historical records and backfilling has no payoff.
- Scope: this task ships frontmatter + skill propagation only. CORE-018 owns the polished body restructure (emoji headings, GH checklists, `[[TASK-ID]]` linking, polished spec layout).
- Dogfooding: converted this active tasknote to the new format mid-Phase-2 to validate the shape on a real tasknote before close.

**Follow-ups surfaced (not done in this task):**

- Release task: bump `SPEC.md` `Version: v0.1.1 → v0.2.0` (additive feature, minor bump per SPEC §Versioning) and tag `v0.2.0` — matches the CORE-014/CORE-015 pattern of release/version handled separately.
- CORE-019 (frontmatter-aware viz cards) and CORE-020 (`/new-project` skill + `docs/MIGRATION.md` updates for the new format) are now unblocked.

**Tests:** `viz/` parser test suite green (6/6); YAML frontmatter validated via `node` parser on both the template and this tasknote; stale-shape grep clean across `templates/`, `claude/`, and `SPEC.md`.

**Archived:** 2026-05-01
