---
title: selection-module
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-223, CORE-223.1, CORE-223.2, CORE-223.4, CORE-223.5]
---

# CORE-223.3 | selection-module

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-223]] [[CORE-223.1]] [[CORE-223.2]] [[CORE-223.4]] [[CORE-223.5]]

## 🎯 Goal

Extract the tasknote-selection matrix (§"When to use a tasknote (and when not to)") plus its two adjacent sub-sections (§"PLAN.md filing-discipline thresholds", §"`## Completed` archive convention") from SPEC.md into a new lazy module `SPEC/tasknote-selection.md`, leave pointer stubs in core, and rewire selection §-refs across the ~9 consuming skills + 2 templates.

## ✅ Acceptance

- [ ] New `SPEC/tasknote-selection.md` holds: §"When to use a tasknote (and when not to)" (incl. all use/skip blocks), §"PLAN.md filing-discipline thresholds", §"`## Completed` archive convention" — verbatim content preserved (tables, examples, thresholds)
- [ ] SPEC.md keeps pointer stubs (mirroring §"Epic lifecycle" / §"Model field" "Canonical contract: see …" style) where the sections were
- [ ] Selection §-refs rewired across the consuming skills + 2 templates: `SPEC §"…"` → `SPEC/tasknote-selection.md §"…"` for the moved sections
- [ ] `paths:` frontmatter deferred to `.4`; the module opens with the `> Lazy-loaded SPEC module…` prose trigger line
- [ ] SPEC.md still reads coherently end-to-end; no dangling §-refs to moved content remain in core
- [ ] Cross-ref grep clean (no broken `SPEC §"…"` pointing at relocated headings); char count dropped as projected (~6.9k core saving)

## 🧩 Subtasks

- [ ] Re-verify exact line ranges of the three selection sections against current SPEC.md HEAD (drift check, post-`.2`)
- [ ] Grep the consuming skills + docs + templates for selection §-refs to build the rewire map
- [ ] Create `SPEC/tasknote-selection.md` with lazy-module header + the three sections
- [ ] Excise the three sections from SPEC.md, leaving pointer stubs
- [ ] Rewire selection §-refs across the skills + 2 templates
- [ ] Verify: SPEC.md coherent, grep clean, char count dropped (~6.9k core saving)

## 🔗 Related

- [[CORE-EPIC-223]] — parent epic (spec-lazy-module-split)
- [[CORE-223.1]] — discovery; defined this child's scope, boundaries, and rewire breadth
- [[CORE-223.2]] — sibling: gates-module extraction (done; clean execution precedent)
- [[CORE-223.4]] — integration-wiring: adds `paths:` frontmatter, module-list refresh, budget verify, doc-currency
- [[CORE-223.5]] — final-subtask audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md is 32,528 chars after `.2`'s gate extraction — still above `.1`'s ~24,700 target. Extracting the selection matrix into `SPEC/tasknote-selection.md` is the filed `.3` remedy; `.1` locked the scope (move all three adjacent sections). Still the right work.

- [x] Read relevant source files — SPEC.md (full §430–543), `SPEC/epic.md`, `templates/tasknote-template.md`, `SPEC/gates.md` (module-shape precedent), the consuming skills + templates.

- [x] **Archive skim** — [[CORE-223.1]] (Discovery) measured the selection block and filed this child's scope; [[CORE-223.2]] (gates-module) is the direct execution precedent — same lazy-module pattern, same anchor approach, same defer-docs-to-`.4` child split. No conflicting prior decisions on the selection sections.

- [x] **Drift check** — re-verified the three section boundaries against current SPEC.md HEAD (post-`.2`): §"When to use a tasknote (and when not to)" `430`, §"PLAN.md filing-discipline thresholds" `507` (H3), §"`## Completed` archive convention" `528` (H3), block ends `542` before §"Priority levels" `544`. SPEC.md = 32,528 chars. The two filing/archive sub-sections are `###` nested under the `##` selection H2 — one contiguous block (430–542). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions (all pre-locked by `.1`/`.2`):
  - **Anchor style — bare pointer stub** (not `.2`'s thin-anchor). The selection sections are standalone (not interwoven with the 4-phase narrative the way gate machinery was), so they collapse to the established §"Model field" / §"Versioning" / §"Epic lifecycle" / §"Blocked tasks" pattern: keep the `## When to use a tasknote (and when not to)` H2 + one "Canonical contract: see …" pointer line covering all three sections. Matches `.1`'s "after pointer stubs" projection.
  - **Module section structure:** promote the two `###` sub-sections (`PLAN.md filing-discipline thresholds`, `` `## Completed` archive convention ``) to top-level `##` in the module — mirrors `SPEC/gates.md`'s flat `##` layout and makes each independently `§"…"`-referenceable. The §filing-discipline "…governed by §"`## Completed` archive convention" below" sibling ref stays bare (resolves within the module).
  - **Scope = skills + 2 templates only.** Doc refs (`docs/MIGRATION.md`, `docs/AGENT-NEUTRALITY.md`) deferred to [[CORE-223.4]]'s doc-currency sweep per `.1`'s child split — mirrors `.2`'s GLOSSARY/PLATFORMS deferral. See Handoff below.
  - **`paths:` frontmatter deferred to `.4`**; module opens with the `> Lazy-loaded SPEC module…` prose trigger line only.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Rewire map** (`SPEC §"<moved>"` → `SPEC/tasknote-selection.md §"<moved>"`). Three moved headings: A = §"When to use a tasknote (and when not to)", B = §"PLAN.md filing-discipline thresholds", C = §"`## Completed` archive convention".

| File:line | Heading | Note |
|---|---|---|
| ft-task/SKILL.md:59 | B | filing-discipline advisory |
| ft-task/SKILL.md:138 | C | closure stub form |
| ft-task/SKILL.md:157 | A | skip-the-tasknote cases |
| ft-micro-task/SKILL.md:3,76,126 | A | (3 = description frontmatter) |
| ft-micro-task/SKILL.md:57 | B | |
| ft-micro-task/SKILL.md:104 | C | |
| ft-starter-task/SKILL.md:14,97 | A | |
| ft-starter-task/SKILL.md:80 | B | |
| ft-file-followup/SKILL.md:3,8,97 | A | (3 = description frontmatter) |
| ft-file-followup/SKILL.md:41 | B | |
| ft-epic-discovery/SKILL.md:94,118 | B | |
| ft-epic-discovery/SKILL.md:223 | C | |
| ft-close-epic/SKILL.md:150,165 | C | |
| ft-release/SKILL.md:210 | C | |
| ft-debug/SKILL.md:144 | A | |
| ft-worktree-start/SKILL.md:8 | A | |
| ft-worktree-end/SKILL.md:8 | A | |
| commands/ft-micro-task.md:6 | A | command stub |
| commands/ft-file-followup.md:6 | B | command stub |
| templates/tasknote-README.md:19 | A | |
| templates/tasknote-micro-template.md:29 | A | (`§"When to use a tasknote"` short form) |

**SPEC.md internal refs** (sections that **stay** in core but point at moved C): line 366 (§Phase 4 closure checklist `see §"`## Completed` archive convention"`) → rewire to `SPEC/tasknote-selection.md §"…"`. Line 521 is *inside* the moving block → becomes a bare sibling ref in the module (no change). `templates/tasknote-template.md:79` mirrors SPEC:366's bare `§"…"` closure line → rewire to point at the module for accuracy.

**Handoff to [[CORE-223.4]]:** `docs/MIGRATION.md` (lines 150, 292) and `docs/AGENT-NEUTRALITY.md` (line 34) carry `SPEC §"When to use a tasknote"` / `§"`## Completed` archive convention"` refs pointing at now-relocated headings. Per `.1`'s child split these belong to `.4`'s doc-currency sweep, not `.3`. Flagged so `.4` doesn't miss them.

**Exit judgment:** Discovery surfaced no significant deviation — boundaries matched the post-`.2` measurement, rewire map is mechanical, all design decisions pre-locked at `.1`/`.2`. → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established lazy-module + pointer-stub shape: bare pointer stub in core mirrors §"Epic lifecycle" / §"Model field" / §"Versioning" / §"Starter tasknotes" ("Canonical contract: see …"); the module mirrors `SPEC/gates.md`'s flat top-level `##` section layout. No new shape invented.

- [x] Implemented the minimal solution — created `SPEC/tasknote-selection.md`; excised the §"When to use a tasknote" block (incl. both H3 subsections) from SPEC.md leaving a single pointer stub; rewired 23 selection §-refs across 14 skill/command/template files + SPEC.md's internal closure ref.

- [x] Updated/added tests for non-trivial behavior — n/a (markdown-only; no executable surface).

**Implementation Notes:**

- **`SPEC/tasknote-selection.md`** holds three top-level sections (verbatim): §"When to use a tasknote (and when not to)" (all use/skip blocks), §"PLAN.md filing-discipline thresholds", §"`## Completed` archive convention" — the latter two promoted from `###` to `##` so each is independently `§"…"`-referenceable. The intra-module "…governed by §"`## Completed` archive convention" below" sibling ref stays bare (resolves within the module).
- **SPEC.md core:** 32,528 → **25,754 chars** (−6,774). The §"When to use a tasknote (and when not to)" H2 stays as a bare pointer stub (covering all three sections); §Phase 4 closure checklist's internal `§"`## Completed` archive convention"` ref rewired to the module via markdown link.
- **Rewire (23 refs):** 14 files — ft-task ×3, ft-micro-task ×5, ft-starter-task ×3, ft-file-followup ×4, ft-epic-discovery ×3, ft-close-epic ×2, ft-release ×1, ft-debug ×1, ft-worktree-start ×1, ft-worktree-end ×1, commands/ft-micro-task ×1, commands/ft-file-followup ×1, tasknote-README ×1, tasknote-micro-template ×1, tasknote-template ×1 (bare ref) — plus SPEC.md internal ×1. Both prefix styles preserved: plain `SPEC §` → `SPEC/tasknote-selection.md §`, code-span `` `SPEC.md` §`` → `` `SPEC/tasknote-selection.md` §``, adopter-path `` `_project/flowtron/SPEC.md` §`` → `` `_project/flowtron/SPEC/tasknote-selection.md` §``.
- **Scope refinements beyond `.1`'s "~9 skills + 2 templates" estimate** (all flagged for transparency): also rewired `claude/AGENTS-snippet.md` (claude/-layer wiring, not in `.4`'s doc list) and `templates/tasknote-template.md`:79 (bare `§"…"` C-ref that would otherwise dangle). Both are `.3`-domain (wiring/templates), not `.4`-domain (prose docs).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — ran the viz suite (163/163 pass) as insurance; markdown docs only, no PLAN.md task-line grammar or tasknote-render surface changed → unaffected as expected.

- [x] Ran lint/type-check on changed code — n/a (no lint surface for SPEC/skill markdown; viz eslint scopes `viz/` only). Grep-verified: zero dangling `SPEC §"<moved-heading>"` refs across `claude/` + `templates/` + SPEC.md; 23 new `SPEC/tasknote-selection.md §` refs resolve.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a (no frontend).

**Testing Notes:** Grep-verified extraction integrity (dangling-ref check clean; deferred docs `docs/MIGRATION.md` 150/292 + `docs/AGENT-NEUTRALITY.md`:34 confirmed untouched for `.4`). Char-budget check: SPEC.md 25,754 < 40k (comfortable margin; matches `.1`'s ~24,700 combined gates+selection projection). viz suite green.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — AI-referenced docs (`_project/tasknote/README.md` §"AI-referenced docs"):
  - `README.md` — no change
  - `SPEC.md` — **updated** (this task: §"When to use a tasknote" block + two sub-sections extracted to `SPEC/tasknote-selection.md`; bare pointer stub left; internal §Phase 4 closure ref rewired)
  - `docs/MIGRATION.md` — **no change in `.3`** (selection refs at lines 150/292 point at relocated headings; rewiring deferred to [[CORE-223.4]]'s doc-currency sweep per `.1`'s child split — flagged in Discovery handoff)
  - `claude/AGENTS-snippet.md` — **updated** (its §"When to use a tasknote" ref rewired to `_project/flowtron/SPEC/tasknote-selection.md`; scope refinement beyond `.1`'s estimate — claude/-layer wiring, not in `.4`'s doc list)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **no change in `.3`** (table row :34 references §"When to use a tasknote" pointing at relocated content; deferred to `.4` per child split — flagged)
  - `docs/PLATFORMS.md` — no change (no selection refs)

- [x] Closed — PLAN.md `CORE-223.3` line flipped to stub form (in place beneath the in-flight `CORE-EPIC-223` parent; parent stays open until `.4`/`.5` close) and tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (inline on conditional skip).

**Final Summary:** Extracted the tasknote-selection content from SPEC.md into a new lazy module `SPEC/tasknote-selection.md`: §"When to use a tasknote (and when not to)" (all use/skip thresholds), §"PLAN.md filing-discipline thresholds", and §"`## Completed` archive convention" (the latter two promoted `###`→`##` for independent referenceability). SPEC.md keeps a single bare pointer stub (mirroring §"Model field" / §"Versioning"), dropping from 32,528 → 25,754 chars (−6,774) — comfortable margin under the 40k always-read budget, matching `.1`'s ~24,700 combined projection. Rewired 23 selection §-refs across 14 skill/command/template files + SPEC.md's internal closure ref, preserving plain / code-span / adopter-path prefix forms. Doc-set selection refs (MIGRATION 150/292, AGENT-NEUTRALITY :34) and `paths:` frontmatter deferred to [[CORE-223.4]] per the epic's child split. viz suite 163/163.

**Archived:** 2026-05-30
