---
title: Polish templates/ for scannability
status: completed
priority: High
area: core
model: opus
tags: [templates, workflow, dx]
created: 2026-05-01
due:
related-tasks: [CORE-017, CORE-019, CORE-020]
---

# CORE-018 | Polish `templates/` for scannability

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-017]] [[CORE-019]] [[CORE-020]]

## 🎯 Goal

Make every tasknote read like a small, polished spec — consistent emoji-prefixed headings, GitHub-style checklists, `[[TASK-ID]]` cross-linking, explicit Subtasks/Acceptance/Related sections, and a navigation header — by polishing the canonical `templates/` artifacts.

## ✅ Acceptance

- [x] `templates/tasknote-template.md` adopts the spec-on-top + log-below shape: nav header + `🎯 Goal` / `✅ Acceptance` / `🧩 Subtasks` / `🔗 Related` above a divider, then the four phase sections below
- [x] Phase headings carry consistent emoji prefixes (📝 / 🛠️ / 🧪 / 🚀) in the template AND in `SPEC.md` §"The 4-phase workflow"
- [x] `SPEC.md` carries a new short §"Tasknote body shape" describing the layout, with the canonical structure shown in a fenced block
- [x] `.claude/skills/task/SKILL.md` Step 3 teaches scaffolding all new top-section fields (nav header, Goal, Acceptance, Subtasks, Related)
- [x] `templates/tasknote-README.md` Layout bullet describes the new body shape and points at SPEC
- [x] This tasknote is dogfooded onto the new format mid-flight (validates the shape on a real, populated tasknote)
- [x] No stale references remain: no orphaned `**Execution Steps:**` headers, no pre-emoji `### Phase N:` subheadings outside archive
- [x] `viz/` parser tests stay green (no parser regression — parser only reads PLAN.md)

## 🧩 Subtasks

- [x] Rewrite `templates/tasknote-template.md` to spec-on-top + log-below shape (nav header, top sections, divider, emoji phase headings)
- [x] Update `.claude/skills/task/SKILL.md` Step 3 with field-filling instructions for new top sections
- [x] Add `SPEC.md` §"Tasknote body shape" between §"Tasknote frontmatter" and §"The 4-phase workflow"
- [x] Emoji-prefix the four `### Phase N:` subheadings in `SPEC.md` §"The 4-phase workflow"
- [x] Sync the duplicated Phase 1 + Phase 4 checklist text in `SPEC.md` with the new template (Subtasks-above wording; nav-header-status closure step)
- [x] Extend `templates/tasknote-README.md` Layout bullet
- [x] Dogfood: convert this in-flight tasknote to the new shape
- [x] Sanity check: YAML still parses, viz/ parser tests green, stale-shape grep clean
- [x] Phase 4 closure (PLAN.md flip + archive + recap)

## 🔗 Related

- [[CORE-017]] — frontmatter (predecessor — CORE-017 closure explicitly deferred this body restructure to CORE-018)
- [[CORE-019]] — viz/ frontmatter consumer (downstream — unblocked once template is finalized)
- [[CORE-020]] — `/new-project` skill + `docs/MIGRATION.md` updates (downstream — picks up new template format)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-017 closure explicitly deferred body restructure to CORE-018 (`"Scope kept tight per CORE-018 separation"`). Frontmatter just shipped and adopting projects (photard, natabula) consume the polished template via submodule bumps; landing this completes the template evolution arc and unblocks CORE-019/CORE-020 cleanly.

- [x] Read relevant source files
- [x] **Drift check** — `templates/tasknote-template.md`, `templates/tasknote-README.md`, `templates/PLAN.md`, `SPEC.md` §"Tasknote frontmatter" + §"The 4-phase workflow", and `.claude/skills/task/SKILL.md` Step 3 all exist at expected paths and reflect the post-CORE-017 shape. Archived CORE-017 tasknote names CORE-018 as the body-restructure owner. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Touchpoints (in scope):

- `templates/tasknote-template.md` — primary edit; full body restructure to spec-on-top + log-below
- `.claude/skills/task/SKILL.md` Step 3 — extend to teach scaffolding the new top sections (nav header, Goal, Acceptance, Subtasks, Related)
- `SPEC.md` — emoji-prefix the four phase subheadings to match template; add new §"Tasknote body shape" between §"Tasknote frontmatter" and §"The 4-phase workflow" describing the spec-on-top + log-below convention; sync duplicated Phase 1 + Phase 4 checklist text
- `templates/tasknote-README.md` — extend the Layout bullet with the new body shape; point at SPEC

Out of scope:

- `templates/PLAN.md` — not a tasknote; user picked "Tasknote template only" scope
- `templates/tasknote-README.md` structural rewrite — text-tweak only
- `viz/` parser updates — CORE-019 owns frontmatter consumption; this task does not change parser inputs
- `claude/skills/new-project/SKILL.md` + `docs/MIGRATION.md` — CORE-020 owns
- SPEC version bump (v0.1.1 → v0.2.0) — release task, deferred (matches CORE-014/CORE-015 + CORE-017's deferred-release pattern)

**Decisions confirmed (2026-05-01) via clarifying questions:**

1. **Scope:** tasknote template only + minimal SPEC/skill/README propagation. `templates/PLAN.md` and structural rewrite of `tasknote-README.md` deferred.
2. **Depth:** spec-on-top + log-below — top-level `## 🎯 Goal`, `## ✅ Acceptance`, `## 🧩 Subtasks`, `## 🔗 Related` sections above a `---` divider, then the four phases below as execution log.
3. **Linking:** Obsidian-style `[[TASK-ID]]` wikilinks (matches PLAN.md description literally; AI/vault-tool friendly; renders as plain text on GitHub which is acceptable since flowtron is markdown-vault-first).

**Section/emoji conventions chosen:**

- Top sections: `🎯 Goal` · `✅ Acceptance` · `🧩 Subtasks` · `🔗 Related`
- Phase sections: `📝 Phase 1: Discovery` · `🛠️ Phase 2: Execution` · `🧪 Phase 3: Testing & Linting` · `🚀 Phase 4: Closure`
- Nav header (one line below H1): `[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[RELATED]]` — status icon mirrors YAML `status:` (🟢 in-progress / ✅ completed / ⏸ blocked / ⚪ not-started); wikilink chips mirror YAML `related-tasks` for at-a-glance see-also.
- The new top `## 🧩 Subtasks` section replaces the old Phase-1-internal `**Execution Steps:**` block (moves the actionable plan to the spec layer; Phase 1 Discovery still defines them, but they live under the spec heading).

**Open question deferred to Phase 2 review:** the nav header status icon duplicates YAML `status:` — small drift surface. Default: keep (matches approved preview); add an explicit Phase 4 closure step to flip it so drift stays low.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

**Pattern survey:** Spec-on-top + log-below mirrors widely-used patterns — Architecture Decision Records (Context/Decision/Consequences at top, deliberation log below), Linear/GitHub Issue templates (problem + acceptance criteria above task list), and RFC documents (summary/motivation/design above implementation notes). Emoji-prefixed headings are standard in modern README/spec markdown (GitHub project READMEs, Notion templates). Obsidian `[[wikilinks]]` are native to markdown-vault tools (Obsidian, Foam, Logseq, Roam). Extending established conventions rather than inventing flowtron-specific shape. The 4-phase backbone stays as-is — this task layers a spec front-end on top, doesn't replace the execution log.

**Files changed:**

1. `templates/tasknote-template.md` — full body rewrite to spec-on-top + log-below: kept YAML frontmatter and H1 untouched; added nav header line, four top sections (`🎯 Goal`, `✅ Acceptance`, `🧩 Subtasks`, `🔗 Related`), and `---` divider; emoji-prefixed all four phase headings (📝 / 🛠️ / 🧪 / 🚀); replaced old Phase 1 "Defined concrete execution steps below" checkbox with "Subtasks above populated with concrete, ordered steps"; removed the old Phase-1-internal `**Execution Steps:**` block (moved up to top-level Subtasks); added new Phase 4 closure step "Updated nav header status icon to ✅ Completed" (closes the duplicated-status drift surface).
2. `.claude/skills/task/SKILL.md` — extended Step 3 **Body** subsection: added field-filling instructions for nav header (status icon mirrors YAML `status:`; wikilink chips mirror `related-tasks:`; drop the `· 🔗 ...` chip if `related-tasks: []`), Goal (under `## 🎯 Goal`), Acceptance (empty checklist at scaffold, populated during Discovery), Subtasks (empty at scaffold; replaces old "Execution Steps"), Related (mirrors `related-tasks:` in human-readable form, or `- (none)` if empty); added pointer to new SPEC §"Tasknote body shape".
3. `SPEC.md` — added new §"Tasknote body shape" between §"Tasknote frontmatter" and §"The 4-phase workflow" with a fenced layout diagram, top-section/phase-section descriptions, cross-linking convention, and backwards-compat note; emoji-prefixed all four `### Phase N:` subheadings (📝 / 🛠️ / 🧪 / 🚀); synced Phase 1 last checkbox text ("Defined concrete execution steps below" → "Subtasks above populated with concrete, ordered steps") and added new Phase 4 closure step ("Updated nav header status icon to ✅ Completed").
4. `templates/tasknote-README.md` — extended the `tasknote-template.md` Layout bullet with the new body shape (nav header + four top sections + divider + emoji phases) and `[[TASK-ID]]` wikilink convention; pointed at SPEC §"Tasknote body shape".
5. `_project/tasknote/CORE-018.md` (this file) — converted mid-Phase-2 to the new spec-on-top + log-below shape; populated `## ✅ Acceptance`, `## 🧩 Subtasks`, and `## 🔗 Related` from Phase 1 work to dogfood the format on a real, populated tasknote.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- **YAML validation:** parsed `templates/tasknote-template.md` and `_project/tasknote/CORE-018.md` frontmatter via `node`. Both clean — all 9 fields present, types correct (kebab-case `status`, list-form `tags` and `related-tasks`, etc.).
- **viz/ parser tests** (`npm test -- --run`): 6/6 green. Parser only consumes `_project/PLAN.md` so no impact expected; ran for reassurance.
- **Lint/type-check:** N/A — all four edited files are Markdown (no TS/JS/Python). No project-level Markdown linter configured.
- **Stale-shape grep** across `templates/`, `.claude/skills/`, `SPEC.md`:
  - `Execution Steps:` — clean (only intentional self-references inside this tasknote's own Acceptance + Implementation Notes blocks)
  - `^### Phase [1-4]:` (pre-emoji subheadings) — clean (zero matches; all four SPEC subheadings now carry emoji prefixes)
  - `Defined concrete execution steps below` (old Phase 1 checkbox text) — clean (zero matches)
- **Visual confirmation:** pending — asking user to render `templates/tasknote-template.md` and `_project/tasknote/CORE-018.md` in their IDE's markdown preview before Phase 4 closure.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-01`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Polished `templates/tasknote-template.md` to a **spec-on-top + log-below** shape so every tasknote reads like a small, polished spec rather than a pure execution log. Body now opens with a single-line nav header (`[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[RELATED]]`), then four spec sections (`🎯 Goal` / `✅ Acceptance` / `🧩 Subtasks` / `🔗 Related`), then a `---` divider, then the four phase sections with emoji prefixes (`📝 Discovery` / `🛠️ Execution` / `🧪 Testing` / `🚀 Closure`). Cross-references between tasknotes use Obsidian-style `[[TASK-ID]]` wikilinks.

The actionable plan migrated from a Phase-1-internal `**Execution Steps:**` block up to the top-level `## 🧩 Subtasks` section — same content, but now sits in the spec layer where it belongs (Phase 1 Discovery still defines them, but they live above the divider as part of the visible spec). The Phase 1 checklist's last item updated accordingly ("Subtasks above populated…"), and Phase 4 gained a new closure step ("Updated nav header status icon to ✅ Completed") to keep the duplicated status chip in sync with YAML.

**Files changed:**

1. `templates/tasknote-template.md` — full body rewrite
2. `.claude/skills/task/SKILL.md` Step 3 — extended **Body** subsection with field-filling instructions for nav header / Goal / Acceptance / Subtasks / Related
3. `SPEC.md` — new §"Tasknote body shape" (with fenced layout diagram, top-section/phase-section descriptions, cross-linking convention, backwards-compat note); all four `### Phase N:` subheadings emoji-prefixed; Phase 1 last-checkbox + Phase 4 closure-checklist synced with template
4. `templates/tasknote-README.md` — Layout bullet extended with new body shape and `[[TASK-ID]]` convention; pointed at SPEC §"Tasknote body shape"
5. `_project/tasknote/CORE-018.md` (this file) — dogfooded mid-Phase-2

**Key decisions (locked in Phase 1):**

- **Scope:** tasknote template only (+ minimal SPEC/skill/README propagation). `templates/PLAN.md` polish and structural rewrite of `tasknote-README.md` deferred — different artifacts, separate concerns.
- **Depth:** spec-on-top + log-below (not just cosmetic) — strongest match for "reads like a small, polished spec." Top sections are stable spec, phases below are execution log.
- **Linking:** Obsidian `[[TASK-ID]]` wikilinks throughout. Renders as plain text on GitHub but is first-class in markdown-vault tooling (Obsidian, Foam, Logseq) and is what PLAN.md's task description literally specified.
- **Nav header status drift:** kept the duplicated status chip (mirrors YAML `status:`) for at-a-glance scannability, but added an explicit Phase 4 closure checkbox to flip it — small but explicit drift surface.
- **Subtasks placement:** lifted from Phase-1-internal Execution Steps to a top-level spec section. Synced the Phase 1 checklist text and the SPEC duplicate to match.
- **Backwards compatibility:** archived tasknotes left as-is — same write-once policy as the CORE-017 frontmatter rollout. Adopting projects pick up the new shape on their next flowtron version bump.

**Follow-ups surfaced (not done in this task):**

- Release task: bump `SPEC.md` `Version: v0.1.1 → v0.2.0` (additive — adopting projects can ignore; matches CORE-014/CORE-015 + CORE-017 pattern of release-as-separate-task) and tag `v0.2.0`. The CORE-017 + CORE-018 pair is a natural release boundary (frontmatter + body shape together).
- CORE-019 (frontmatter-aware viz cards) is now fully unblocked — both schema and shape are stable.
- CORE-020 (`/new-project` skill + `docs/MIGRATION.md` updates) picks up the new template format on its next pass.

**Tests:** `viz/` parser tests 6/6 green; YAML frontmatter validated via `node` on both template and dogfooded tasknote; stale-shape grep clean across `templates/`, `.claude/skills/`, and `SPEC.md` (no orphaned `**Execution Steps:**` headers, no pre-emoji `### Phase N:` subheadings, no stale Phase 1 checkbox text).

**Archived:** 2026-05-01
