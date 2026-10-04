---
title: SPEC/procedures/ scaffold + SOP schema
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271, CORE-271.1, CORE-271.3, CORE-270]
---

# CORE-271.2 | SPEC/procedures/ scaffold + SOP schema

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]] · 🔗 [[CORE-271.1]] · 🔗 [[CORE-271.3]]

## 🎯 Goal

Create the `SPEC/procedures/` directory, define the procedure-SOP frontmatter schema + loading convention, and register the dir as a SPEC lazy-module extension in `SPEC.md` — the foundation the `ft-task` SOP (CORE-271.3) and per-agent pointer wrappers (CORE-271.4) build on.

## ✅ Acceptance

- [ ] `SPEC/procedures/` exists in git (materialized via a documenting placeholder, since git can't track an empty dir)
- [ ] Procedure-SOP frontmatter schema is defined and documented (field set + meaning + example)
- [ ] Loading convention documented: when/how a contract-only agent loads a `SPEC/procedures/<procedure>.md` SOP, and how per-agent pointer wrappers route to it
- [ ] `SPEC.md` registers the new `SPEC/procedures/` layer (§"Working in the flowtron repo itself" + §"Lazy SPEC module frontmatter" as appropriate)
- [ ] No `SPEC/procedures/ft-task.md` content authored here — that is CORE-271.3 (scope boundary held)
- [ ] Phase 4 doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Write `SPEC/procedures/README.md` — materializes the dir; documents the layer's purpose, the `procedure:`/`source:`/`last-verified:` frontmatter schema, the loading convention (per-agent wrapper routing), and an example block
- [ ] Register the layer in `SPEC.md` §"Working in the flowtron repo itself" (new `SPEC/procedures/` bullet pointing at the README)
- [ ] Register in `SPEC.md` §"Lazy SPEC module frontmatter" — note procedure SOPs carry a distinct frontmatter shape (not `paths:`) and are wrapper-loaded, pointing at the README
- [ ] Markdown mental-pass: cross-refs resolve, fences/indent clean, scope boundary held (no `ft-task.md` content authored)
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-271]] — parent epic (cross-agent-skill-projection)
- [[CORE-271.1]] — discovery; locked the 4-child carve + shared design surface
- [[CORE-271.3]] — next child: authors the actual `SPEC/procedures/ft-task.md` SOP on the schema this task defines
- [[CORE-270]] — architecture decisions: SPEC/procedures/ = agent-neutral SOP source of truth; DOGFOOD.md stays in docs/ (separate layer)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Architecture is locked from CORE-270/271.1 — `SPEC/procedures/` is the agent-neutral SOP source-of-truth layer; this is its foundational scaffold. `SPEC/procedures/` is absent at HEAD (new dir, expected). All upstream (CORE-269 DOGFOOD.md, CORE-271.1 discovery) complete. No scope deviation.

- [x] Read relevant source files — `SPEC.md` §"Working in the flowtron repo itself" + §"Lazy SPEC module frontmatter"; existing lazy modules `SPEC/epic.md` (`paths:` frontmatter + `> Lazy-loaded SPEC module…` prose loader line) and `SPEC/gates.md` (`paths: []` + multi-skill loader line); `docs/PLATFORMS.md` (two-layer model, sibling-dir plug-in pattern, single-source posture); `.flowtron/tasknote/README.md` §"AI-referenced docs" (Phase 4 sweep target).

- [x] **Archive skim** — CORE-271.1 (4-child carve locked: .2 spec-dir · .3 ft-task-sop · .4 per-agent-wrappers · .5 doc-updates; shared-surface table); CORE-270 (architecture locked: thin pointers, neutral SOP as SoT, DOGFOOD.md stays in docs/); CORE-091 (single-source-collapse "route, don't copy" precedent). No prior tasknote created a `SPEC/procedures/`-style layer — closest precedent is the existing `SPEC/*.md` lazy-module convention.

- [x] **Drift check** — `SPEC/procedures/`: absent (new, expected ✓); `SPEC.md` §"Lazy SPEC module frontmatter" + §"Working in the flowtron repo itself": present, match cited shape ✓; existing lazy modules carry `paths:` frontmatter + prose loader line ✓; `docs/PLATFORMS.md` sibling-dir + single-source posture intact ✓. No drift.

- [x] Asked clarifying questions — resolved below in "Resolved scoping"

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Scope boundary (this task vs. siblings)
- **CORE-271.2 (this):** dir scaffold + SOP frontmatter *schema* + *loading convention* + SPEC.md registration. Meta/foundation only.
- **CORE-271.3:** authors `SPEC/procedures/ft-task.md` (the actual SOP content) on the schema defined here.
- **CORE-271.4:** thin pointer stubs `grok/procedures/ft-task.md` + `codex/procedures/ft-task.md`.
- **CORE-271.5:** doc updates (PLATFORMS / AGENT-COMPAT / AGENT-NEUTRALITY / snippet).

### Open design points (→ clarifying questions)
1. **Dir materialization + schema-doc home** — git can't commit an empty dir. Candidates: `SPEC/procedures/README.md` (materializes dir AND documents the schema, self-contained) vs. `.gitkeep` + schema inline in SPEC.md only.
2. **Frontmatter field set** — existing lazy modules use only `paths:`. Procedure SOPs are a different artifact kind (agent-neutral procedure projection). Candidate fields: `procedure:` (slug, matches ft- namespace), `source:` (canonical Claude skill for drift-tracking), `agents:` (consumers), `last-verified:` (currency stamp, mirrors PLATFORMS/CAPABILITIES).

### Resolved scoping

| Question | Answer |
|---|---|
| Dir materialization + schema-doc home | `SPEC/procedures/README.md` — materializes the dir AND is the self-contained home for the schema + loading convention; `SPEC.md` gets a short registration pointer |
| Procedure-SOP frontmatter field set | Lean: `procedure:` + `source:` + `last-verified:`. Captures the slug, the drift-tracking anchor, and the currency signal the dogfood gate cares about; no `agents:` list (avoids staleness as wrapper set grows) |

→ Discovery surfaced no significant deviation (both answers took the lean/recommended option; same files in play) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed two existing shapes: the `SPEC/*.md` lazy-module convention (`paths:` frontmatter + `> Lazy-loaded…` prose loader line) as the contrast point the README defines *against*, and the `.flowtron/tasknote/README.md` "a README documents its own dir" shape for the placeholder. New `procedure:`/`source:`/`last-verified:` frontmatter is justified — it's a distinct artifact kind (agent-neutral procedure projection, not a filename-triggered rule module).

- [x] Implemented the minimal solution — `SPEC/procedures/README.md` (schema + loading convention + example) materializes the dir; two `SPEC.md` registration edits (§"Working in the flowtron repo itself" bullet + §"Lazy SPEC module frontmatter" subsection). No `ft-task.md` content authored (scope boundary held → CORE-271.3).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs only; no code path).

**Implementation Notes:**

`SPEC/procedures/README.md` defines: why the layer exists (narrow the contract-only adherence gap), the layer-separation from `docs/DOGFOOD.md` (operator runbook vs. agent-loaded SOP), the 3-field frontmatter schema with an example, and the 3-step loading convention (agent → per-platform wrapper → SOP). `source:` framed as derivation/drift-anchor per CORE-270 (neutral SOP is long-term SoT; Claude skill stays canonical wiring until the generator epic reconciles).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changed; viz suite is unrelated to SPEC/ doc edits).

- [x] Ran lint/type-check on changed code — N/A (markdown). Ran a link-integrity pass instead: all 7 relative-link targets in the new README + SPEC.md pointer resolve; git tracks the new dir; `[[CORE-091]]`/`[[CORE-270]]` wikilinks match the existing `docs/PLATFORMS.md` cross-ref convention.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Verified targets: `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`, `docs/DOGFOOD.md`, `SPEC.md`, `claude/CAPABILITIES.md`, `claude/skills/ft-task/SKILL.md` — all present. `git status`: `?? SPEC/procedures/`, ` M SPEC.md`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `SPEC.md` — **updated** (registered the new `SPEC/procedures/` layer: repo-layout bullet + frontmatter subsection)
  - `README.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` — no change (PLATFORMS/AGENT-COMPAT/AGENT-NEUTRALITY/snippet updates are CORE-271.5's explicit scope)

- [x] Closed — PLAN.md `CORE-271.2` line flipped to stub form (nested in place under CORE-EPIC-271; parent stays open until the epic closes) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Scaffolded the `SPEC/procedures/` layer — the agent-neutral procedure-SOP source of truth for contract-only agents. Created `SPEC/procedures/README.md` (materializes the dir; defines the `procedure:`/`source:`/`last-verified:` frontmatter schema, the 3-step wrapper-routing loading convention, and the layer-separation from `docs/DOGFOOD.md`), and registered the layer in `SPEC.md` (§"Working in the flowtron repo itself" bullet + a §"Lazy SPEC module frontmatter" subsection contrasting it with the `paths:`-keyed lazy modules). No SOP content authored — scope boundary held; the `ft-task` SOP lands in CORE-271.3. Markdown/doc-only change; all cross-refs verified.

**Archived:** 2026-06-02
