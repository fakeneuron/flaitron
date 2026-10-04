---
title: PLAN.md task-line grammar — shortname + model field
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-02
due:
related-tasks: [FE-005, CORE-017, CORE-018, CORE-024]
---

# CORE-023 | PLAN.md task-line grammar — shortname + model field

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[FE-005]] [[CORE-017]] [[CORE-018]] [[CORE-024]]

## 🎯 Goal

Extend the PLAN.md task-line grammar to declare both an optional short label and a per-task model assignment, then propagate through SPEC.md, the `/task` skill (model-gate at entry), and `viz/` (parser + row title rendering).

## ✅ Acceptance

- [ ] PLAN.md task-line grammar supports `[model]` and `| shortname` segments (both optional; legacy minimal form `- [ ] **ID** — desc` still parses)
- [ ] `SPEC.md` updated: new §"Task-line format" defines the grammar; §"Model field" points at PLAN.md as source of truth; §"Tasknote frontmatter" drops the `model:` field; `Version` header bumped to `v0.2.0`
- [ ] `templates/tasknote-template.md` frontmatter no longer carries `model:`
- [ ] `templates/PLAN.md` shows new grammar in examples
- [ ] `viz/src/parser.ts` parses `[model]` + `| shortname` into new optional `Task.model` and `Task.shortname` fields
- [ ] `viz/src/tasknote.ts` `TasknoteFrontmatter` drops `model`; parser tolerates legacy archived tasknotes still carrying it
- [ ] `viz/src/ui/App.tsx` row title uses `task.shortname ?? fm?.title ?? task.description`; `ModelChip` reads from `task.model`
- [ ] `.claude/skills/task/SKILL.md` gates on model BEFORE scaffolding: read PLAN.md model first, block + offer override on mismatch, ask user only when no model on the PLAN.md line (legacy)
- [ ] All active `_project/PLAN.md` entries migrated to new grammar with model assignments (CORE-016, FE-003, CORE-023, CORE-EPIC-009 + 5 children, FE-002)
- [ ] Parser + tasknote tests updated; new tests cover the grammar extensions and frontmatter back-compat
- [ ] `viz` build clean; all tests green; visual confirmation in browser

## 🧩 Subtasks

- [ ] Extend `viz/src/parser.ts`: `TASK_LINE` regex captures optional `[model]` + `| shortname`; `Task` interface gains optional `model` + `shortname`
- [ ] Update `viz/src/parser.test.ts`: new cases for `[model]`, `| shortname`, both, and back-compat minimal form
- [ ] Update `viz/src/tasknote.ts`: drop `model` from `TasknoteFrontmatter` + `parseFrontmatter` validation; ignore legacy `model:` if present
- [ ] Update `viz/src/tasknote.test.ts` for the dropped field
- [ ] Update `viz/src/ui/App.tsx`: row title preference order (`task.shortname ?? fm?.title ?? task.description`); `ModelChip` consumes `task.model`
- [ ] Update `templates/tasknote-template.md`: drop `model:` from frontmatter
- [ ] Update `templates/PLAN.md`: examples in new grammar
- [ ] Update `templates/tasknote-README.md`: drop frontmatter-`model` mentions if present
- [ ] Update `SPEC.md`: new §"Task-line format" (after §"Task ID convention"); rewrite §"Model field"; trim §"Tasknote frontmatter" YAML schema; bump `Version` to `v0.2.0`
- [ ] Update `.claude/skills/task/SKILL.md`: early model-gate flow (read PLAN.md, gate, then scaffold); remove model AskUserQuestion at scaffold; document override + legacy-fallback behavior
- [ ] Run `cd viz && npm test` + `npm run build` + lint; ask user for visual confirmation
- [ ] Migrate `_project/PLAN.md`: rewrite active task lines into new grammar with model assignments
- [ ] Update `_project/PLAN.md` "Last updated" header for today's work
- [ ] Phase 4 closure: archive tasknote, flip PLAN.md, recap

## 🔗 Related

- [[FE-005]] — filer; viz/ dogfooding surfaced the need for a short label distinct from the long description
- [[CORE-017]] — introduced YAML frontmatter (including `model:`); CORE-023 retired the YAML field once PLAN.md became the source of truth
- [[CORE-018]] — established spec-on-top body shape; precedent for grammar-design conversations
- [[CORE-024]] — follow-up filed mid-Phase-3: surface PLAN.md description-prose signals (wikilink chips, blocker chips) on rows without tasknotes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Original scope (PLAN.md task-line shortname only) is correct but incomplete. Mid-Phase-1 conversation surfaced a parallel workflow defect: tasknote `model:` is decided at scaffold time (Step 3 of `/task`) — *after* paths are resolved, PLAN.md is read, and the scaffold body is synthesized — meaning all pre-scaffold thinking happens on whatever model was active. Fix is to declare the model on the PLAN.md task line itself (so `/task` can read it before any heavy work) and have `/task` gate on it. Same grammar surface as the shortname work; folding both into CORE-023 yields one coherent grammar revision instead of two close-succession churns.

- [x] Read relevant source files
- [x] **Drift check** — verified `viz/src/parser.ts:26` (the `TASK_LINE` regex captures rest as a single `(.+)` group), `viz/src/ui/App.tsx:569` (row title is `fm?.title ?? task.description`), SPEC §"Task ID convention" (lines 53–72) and §"Model field" (lines 278–290) and §"Tasknote frontmatter" (lines 74–104) all match the citations in the original task line. No drift.
- [x] Asked clarifying questions — syntax choice (`[model] | shortname — long`), YAML model handling (drop, PLAN.md is single source of truth), `/task` gate behavior on mismatch (block + offer override), legacy entries with no model (ask user). All recorded above.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Grammar (decided):**

```
- [ ] **TASK-ID** [model] | shortname — long description
```

- `[model]` and `| shortname` both optional; minimal `- [ ] **ID** — desc` legacy form keeps parsing.
- Model values: `opus | sonnet`. Shortname: free text up to the ` — `.
- Long description after ` — `. If no long description: `- [ ] **ID** [model] | shortname` is valid.

**Source-of-truth shift:**

- PLAN.md task line owns the model assignment.
- YAML `model:` field dropped from `templates/tasknote-template.md` and from `TasknoteFrontmatter`.
- Archived tasknotes (write-once historical) keep their YAML `model:` — `parseFrontmatter` tolerates the unknown field; back-compat preserved per CORE-017's policy.

**`/task` gate flow (new):**

1. Step 0: resolve paths.
2. **Step 0.5 (new):** read PLAN.md, find the task line, parse the model.
   - PLAN.md model present + matches active model → proceed.
   - PLAN.md model present + mismatches → block, offer "switch active model via `/model <X>` then re-invoke /task" OR "retag PLAN.md to active model and proceed."
   - PLAN.md model absent (legacy) → AskUserQuestion (current behavior preserved).
3. Step 1+ continue as today; Step 3 no longer asks for `model:` (already known).

**Suggested-next-task hook:** in Step 6 post-closure, the recommended model is now derivable from PLAN.md grammar; the suggestion line includes it without asking.

**File-edit dependency notes:**

- `App.tsx:582` references `fm.model` in `<ModelChip model={fm.model} />`. Dropping `model` from `TasknoteFrontmatter` breaks this — must co-edit App.tsx in the same change to source `model` from the parsed `Task`.
- `parseFrontmatter` currently *requires* `model` (`tasknote.ts:70` early-returns null if missing). Must drop from required-field gate or new tasknotes (which won't have `model:` in YAML) will fail to parse, removing all frontmatter-driven UI.

**Migration scope:** active PLAN.md entries to migrate — CORE-016, FE-003, CORE-023, CORE-EPIC-009 (+ CORE-009.1..5), FE-002. Completed entries are write-once historical and stay in the legacy minimal form. Migration done at the *end* of Phase 2, after parser ships, so viz/ doesn't render against an unparsed grammar mid-execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending the existing single-regex `TASK_LINE` pattern in `parser.ts`, the existing `describe`/`it` shape in `parser.test.ts`, the existing `ModelChip` component in `App.tsx`, the existing `## H2` section structure in `SPEC.md`, the existing `Step 0`/`Step 1`/... structure in `SKILL.md`. No new shapes invented.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

Files changed (10):

- `viz/src/parser.ts` — Extended `TASK_LINE` regex to capture optional `[model]` + `| shortname`; added `TaskModel` type + optional `Task.model` and `Task.shortname` fields. `cleanDescription` still applied to the long description (Completed-date extraction unchanged).
- `viz/src/parser.test.ts` — +8 tests covering all grammar variants, completed-date extraction with new grammar, and unknown-model rejection (silent skip).
- `viz/src/tasknote.ts` — Dropped `model` from `TasknoteFrontmatter`, removed `MODEL_VALUES` set, removed `model` from required-field validation. Legacy archived tasknotes carrying `model:` parse fine — gray-matter passes the field through, our shape narrowing drops it.
- `viz/src/tasknote.test.ts` — Updated 3 tests for dropped field; added back-compat test for legacy `model:` tolerance.
- `viz/src/ui/App.tsx` — Row title preference: `task.shortname ?? fm?.title ?? task.description`. `ModelChip` reads from `task.model` (renders for tasks WITHOUT tasknotes too). `TaskDetail`: dropped redundant "Description" label for tasks without tasknotes (renders prose directly via ReactMarkdown — post-visual-review fix).
- `templates/tasknote-template.md` — Dropped `model:` from YAML frontmatter.
- `templates/PLAN.md` — Examples in new grammar; HTML comment documenting the rule.
- `templates/tasknote-README.md` — Dropped `model` from frontmatter field list; pointer to SPEC §"Task-line format" + §"Model field".
- `SPEC.md` — Version bump v0.1.1 → v0.2.0; new §"Task-line format" (after §"Task ID convention"); §"Model field" rewritten (PLAN.md as source of truth, /task gate flow, retired YAML field); §"Tasknote frontmatter" YAML schema slimmed + v0.2.0 retirement note.
- `.claude/skills/task/SKILL.md` — Step 1 captures optional `[model]` + `| shortname` from line; new Step 1.5 model-gate (match / mismatch / legacy paths) before Step 2; Step 3 frontmatter section dropped `model:`, gained note that model is no longer in YAML; `title:` synthesis prefers PLAN.md shortname.

PLAN.md migration: 5 active entries + 5 epic children rewritten to new grammar with model assignments — CORE-016, FE-003, CORE-023, CORE-EPIC-009 + CORE-009.1..5, FE-002.

CORE-024 filed mid-Phase-3 from visual review: PLAN.md descriptions still mention IDs in prose ("per CORE-008", "Builds on FE-001"); separate task to extract them as `[[wikilinks]]` + add `Blocked by` parsing — keeps CORE-023 narrow.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- `npm test`: 41/41 pass (was 32 before CORE-023 → +9 net: +8 parser cases for the new grammar, +1 tasknote back-compat for legacy `model:` tolerance, with the prior status/model rejection test split + retitled).
- `npm run build`: `tsc --noEmit && vite build` clean. 402 KB JS bundle (no size regression). Pre-existing gray-matter `eval()` warning unchanged.
- Visual confirmation in browser: shortnames render as row titles for migrated tasks (e.g. "task-line grammar" for CORE-023, "InvisiPaw migration" for CORE-016); ModelChip shows on tasks without tasknotes; CORE-EPIC-009 expands with children showing shortnames + per-child model chips; legacy Completed entries render unchanged. Post-review: dropped redundant "Description" label in TaskDetail; filed CORE-024 for description-prose signal extraction.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-02`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-023 extended the PLAN.md task-line grammar to declare both an optional shortname and a per-task model assignment, then propagated the change through SPEC.md (v0.2.0), the `/task` skill (model-gate before scaffolding), the visualizer (parser + row-title rendering + ModelChip on tasks without tasknotes), and the active PLAN.md entries. The YAML frontmatter `model:` field was retired — PLAN.md is now the single source of truth for the model assignment, so `/task` reads it at entry without re-asking. Mid-Phase-1 re-scope from "shortname only" to "shortname + model" was driven by surfacing the parallel `/task`-decided-too-late workflow defect; one grammar revision covers both. Mid-Phase-3 visual review surfaced CORE-024 (PLAN.md description-prose signal extraction — `[[wikilink]]` chips + `Blocked by` chips on rows without tasknotes); filed as a separate task to keep CORE-023 narrow.

**Archived:** 2026-05-02
