---
title: frontmatter audit
status: completed
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-EPIC-042, CORE-042.1, CORE-023]
---

# CORE-042.3 | frontmatter audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-042]] [[CORE-042.1]] [[CORE-023]]

## 🎯 Goal

Drop `priority:` and `area:` from tasknote frontmatter (both fully derivable — priority from PLAN section heading, area from ID prefix), migrating viz parser/UI consumers, template, SPEC, and active tasknotes per the [[CORE-023]] field-retirement pattern.

## ✅ Acceptance

- [ ] `viz/src/tasknote.ts` — `TasknoteFrontmatter` drops `priority` + `area`; `parseFrontmatter` no longer requires them; legacy archived tasknotes carrying them parse fine (silently ignored)
- [ ] `viz/src/ui/TaskDetail.tsx` — priority badge sourced from `task.priority` (PLAN parser), still gated on `tasknote` presence (no visual regression)
- [ ] `viz/src/tasknote.test.ts` — fixtures stripped of `priority:` + `area:`; new back-compat test mirrors the existing legacy `model:` tolerance case
- [ ] `templates/tasknote-template.md` + `templates/tasknote-starter-template.md` — `priority:` + `area:` removed from YAML
- [ ] `templates/tasknote-README.md` — frontmatter field-list drops `priority`, `area`
- [ ] `SPEC.md` §"Tasknote frontmatter" — `priority:` valid-values sentence removed; back-compat note added (mirrors v0.2.0 `model:` retirement note)
- [ ] `claude/skills/task/SKILL.md` Step 3b + `claude/skills/starter-task/SKILL.md` Step 4 + `claude/skills/new-project/SKILL.md` — frontmatter scaffold lines for `priority:` + `area:` removed
- [ ] `README.md` + `docs/MIGRATION.md` — frontmatter field-list mentions of `priority`/`area` dropped
- [ ] Active tasknotes (`_project/tasknote/CORE-036.md` + this file) migrated post-parser-ship per [[CORE-023]] precedent
- [ ] `viz` build clean, all tests green, visual confirmation in browser
- [ ] No SPEC version bump (per filing decision: v0.8.0 cut at 042.4 closure when all of Thrust C lands)

## 🧩 Subtasks

- [ ] Edit `viz/src/tasknote.ts` — drop `priority` + `area` from `TasknoteFrontmatter`; remove from `parseFrontmatter` required-field gate + returned object; drop unused `Priority` import
- [ ] Update `viz/src/tasknote.test.ts` — strip `priority:`/`area:` from all 7 fixture rows + 2 YAML strings; add a back-compat test asserting legacy archived tasknotes carrying them parse without rejection (modeled on the existing `model:` tolerance test, line 89)
- [ ] Edit `viz/src/ui/TaskDetail.tsx:22` — change `tasknote?.frontmatter?.priority` to derive from `task.priority` while preserving the current `tasknote &&` visual gate
- [ ] Run `cd viz && npm test` + `npm run build` + lint; ask user for visual confirmation
- [ ] Edit `templates/tasknote-template.md` — drop `priority:` + `area:` lines
- [ ] Edit `templates/tasknote-starter-template.md` — drop `priority:` + `area:` lines
- [ ] Edit `templates/tasknote-README.md:17` — frontmatter field-list drops `priority`, `area`
- [ ] Edit `SPEC.md` §"Tasknote frontmatter" — remove `priority:` valid-values sentence; add back-compat note paralleling the v0.2.0 `model:` retirement note
- [ ] Edit `claude/skills/task/SKILL.md` — Step 3b "Skill-specific values" drops `priority:` + `area:` bullets (lines 124-125)
- [ ] Edit `claude/skills/starter-task/SKILL.md` — frontmatter writing drops `priority:` + `area:` bullets (lines 89-90)
- [ ] Edit `claude/skills/new-project/SKILL.md:90` — field-list paragraph drops `priority`, `area`
- [ ] Edit `README.md` — field-list (line 49) drops `priority`, `area`; Dataview example (lines 61, 64) updated or trimmed
- [ ] Edit `docs/MIGRATION.md:85` — field-list drops `priority`, `area`
- [ ] Migrate active tasknotes (post-parser-ship): drop `priority:` + `area:` from YAML in `_project/tasknote/CORE-036.md` and this tasknote (`CORE-042.3.md`)
- [ ] Phase 4 closure — archive tasknote, flip PLAN.md, recap (no SPEC version bump)

## 🔗 Related

- [[CORE-EPIC-042]] — parent epic (workflow architecture rethink, Thrust C)
- [[CORE-042.1]] — Discovery predecessor; scope in §A5 (per-field audit) + §A8 (migration playbook)
- [[CORE-023]] — precedent: retired the `model:` frontmatter field; same fan-out pattern

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md still carries `priority:` + `area:` as live frontmatter fields (verified at `templates/tasknote-template.md:4-5`); both are derivable from existing PLAN.md / ID-prefix surfaces; consumer audit in [[CORE-042.1]] §A5 enumerates the touch points and concludes drop-both. Scope is concrete and current.

- [x] Read relevant source files
- [x] **Archive skim** — read [[CORE-017]] (frontmatter introduction), [[CORE-023]] (model-field retirement, direct precedent), [[CORE-037]] (parent diagnostic). Findings logged in Discovery Notes.
- [x] **Drift check** — verified `viz/src/tasknote.ts:9-10,63-64,68,74-75`, `viz/src/ui/TaskDetail.tsx:22`, `SPEC.md:156`, `claude/skills/task/SKILL.md:124-125`, `claude/skills/starter-task/SKILL.md:89-90` all match the citations in [[CORE-042.1]] §A5+A8. No drift.
- [x] Asked clarifying questions — version bump strategy (no bump on 042.3; v0.8.0 cut at 042.4 closure) and TaskDetail badge gating (preserve current `tasknote &&` gate, swap data source) settled with the user. See Discovery Notes.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Active consumer surface (drift-checked 2026-05-06)

**Code (viz/):**
- `viz/src/tasknote.ts` lines 2 (Priority import), 9-10 (interface fields), 63-64 (parse), 68 (required-field gate), 74-75 (returned object).
- `viz/src/ui/TaskDetail.tsx:22` — priority badge data source.
- `viz/src/tasknote.test.ts` — 7 fixture rows + 2 inline YAML strings (lines 22-23, 32-33, 42-43, 55-56, 70-71, 81-82, 93-94, 228-229, 346-347).

**Templates:**
- `templates/tasknote-template.md:4-5`
- `templates/tasknote-starter-template.md:4-5`
- `templates/tasknote-README.md:17` (frontmatter field-list paragraph)

**Active tasknotes (migrated end-of-Phase-2 per [[CORE-023]] precedent):**
- `_project/tasknote/CORE-036.md` (priority/area both present)
- `_project/tasknote/CORE-042.3.md` (this file — populated at scaffold under current spec)

**SPEC + modules:**
- `SPEC.md:156` (priority valid-values sentence)
- Module sweep clean: the lone match in `SPEC/starter.md:38` is "appropriate priority section" referring to PLAN.md heading, not frontmatter — preserved.

**Skills:**
- `claude/skills/task/SKILL.md:124-125` (Step 3b frontmatter writing)
- `claude/skills/starter-task/SKILL.md:89-90` (Step 4 frontmatter writing)
- `claude/skills/new-project/SKILL.md:90` (field-list paragraph)

**Docs:**
- `README.md:49` (field-list mention) + `:61,64` (Dataview-style query example referencing the fields)
- `docs/MIGRATION.md:85` (field-list paragraph)

**Out of scope (preserved as path-component "area", not frontmatter "area:"):** all `archive/<area>/` references in skills and SPEC — these derive from the ID prefix at runtime, not from the YAML field.

### PLAN-derivation already in place

- `priority`: `viz/src/parser.ts:131-138` sets `currentPriority` from each `## H2` heading; lines 152-155 assign it to `Task.priority` for every task. Already a single source of truth.
- `area`: derivable from ID prefix (`/^([A-Z]+)-/`); no `Task.area` field exists in the parser today, and no consumer beyond the `parseFrontmatter` required-field gate uses it. Drop is purely additive simplification.

### Decisions (from clarifying-questions round)

1. **Version bump strategy** — no SPEC version bump on 042.3. Hold v0.7.0 through this child; 042.4 closure cuts v0.8.0 covering both Thrust C breaking changes (priority/area drop + status source-of-truth) in one tag message. v1.0 deferred until full backlog (Thrust B + audit) clears. SPEC.md is updated *truthfully* in 042.3 (priority valid-values sentence removed) — the version is just the adoption signal, and only flowtron self-host consumes it pre-bump.

2. **TaskDetail badge gating** — preserve current visual behavior (badge visible only when a tasknote is present). Swap data source from `tasknote?.frontmatter?.priority` to `task.priority`, but keep the `tasknote &&` conditional. Zero UX regression; minimal scope.

### [[CORE-023]] pattern application

CORE-023 retired the `model:` field with an identical fan-out shape. Replicate the file-touch order:

1. Parser first (so the type narrows and the required-field gate relaxes).
2. Tests second (covers both new shape and legacy back-compat).
3. UI third (consumes the new parser surface).
4. Build/lint/visual checkpoint.
5. Templates + SPEC + skills + docs.
6. Active tasknote migration last (so viz/ never renders against unparsed YAML mid-execution).

Differences from CORE-023:

- **No version bump** in 042.3 (CORE-023 cut v0.2.0 on closure; here we hold for 042.4).
- **Two fields, not one.** Doubles the test/template surface but not the file count.
- **Active tasknote migration is small** — 2 files (CORE-036 + this) vs CORE-023's PLAN.md grammar migration of 10+ entries.
- **Archive write-once mechanism is identical** — gray-matter passes legacy fields through, our shape narrowing drops them. New back-compat test asserts this for the priority+area pair.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing single-shape `parseFrontmatter` (CORE-023's `model:` retirement is a 1:1 precedent: narrow the interface, relax the required-field gate, drop the typed-cast assignment). Existing `describe`/`it` shape in tests. No new shapes invented.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

Files changed (12):

- `viz/src/tasknote.ts` — Dropped `priority` + `area` from `TasknoteFrontmatter`; removed both from `parseFrontmatter` reads, required-field gate, and returned object. Removed unused `Priority` import.
- `viz/src/tasknote.test.ts` — Stripped `priority:`/`area:` from 7 fixture rows + 2 inline YAML strings. Updated "rejects when required fields are missing" to assert null on missing `created` (the actual remaining required-field gate). Added new back-compat test `tolerates legacy 'priority:' and 'area:' fields on archived tasknotes (ignored, not rejected)` mirroring the existing legacy `model:` tolerance test.
- `viz/src/ui/TaskDetail.tsx` — Priority badge data source changed from `tasknote?.frontmatter?.priority` to `tasknote ? task.priority : undefined`. Preserves the current "badge only when a tasknote exists" visual gate; data now comes from the PLAN parser.
- `templates/tasknote-template.md` + `templates/tasknote-starter-template.md` — Dropped `priority:` + `area:` lines from YAML.
- `templates/tasknote-README.md` — Field-list paragraph dropped `priority`, `area`; added a one-sentence note pointing at the PLAN-section / ID-prefix derivation so adopters know where the metadata moved.
- `SPEC.md` — `§"Tasknote frontmatter"` write-once policy note now lists `priority:` + `area:` alongside `model:` as retired fields tools should silently ignore (labeled v0.8.0, the version 042.4 will cut). The `priority:` valid-values sentence at line 156 is gone.
- `claude/skills/task/SKILL.md` — Step 3b "Skill-specific values" drops the `priority:` + `area:` bullets.
- `claude/skills/starter-task/SKILL.md` — Step 4 frontmatter writing drops the `priority:` + `area:` bullets.
- `claude/skills/new-project/SKILL.md` — Field-list paragraph drops `priority`, `area` (also drops the stale `model` reference that should have been retired in CORE-023 — drive-by truthful-rewrite of the same sentence).
- `README.md` — Obsidian/Dataview frontmatter list (line 49) drops `priority`, `area`. The Dataview example (lines 61-64) now queries `status, due` and sorts by `due`, since `priority`/`area` are no longer queryable from the frontmatter (and the Dataview example wasn't quite right anyway given `priority` was already going to be dropped).
- `docs/MIGRATION.md` — Field-list paragraph (line 85) updated to the truthful current set; also drops the stale `model` reference (same drive-by as new-project SKILL).
- `_project/tasknote/CORE-036.md` + `_project/tasknote/CORE-042.3.md` — Active tasknote YAML migrated. Done after parser shipped (per [[CORE-023]] precedent) so viz never renders against an unparsed shape mid-execution.

**Drive-by note:** README, MIGRATION.md, and new-project SKILL field-lists were already wrong before today — they still listed `model` (retired in CORE-023) in their enumerations. Surgical-rule says don't widen scope, but the sentence we had to update IS the field-list itself; writing a partial truth (`title, status, model, tags, ...`) would have left the list still wrong. Updated to the correct current set as a single coherent edit. Worth separately auditing whether other CORE-023 doc updates were missed.

**Build/test results:** `npm test` 54/54 pass (`tasknote.test.ts` 25 cases: net +1 for the new legacy-fields tolerance case). `npm run build` clean — only the pre-existing gray-matter `eval()` warning, unchanged; 406 KB JS bundle, no size regression.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- `npm test`: 54/54 pass. `tasknote.test.ts` net +1 (new "tolerates legacy `priority:` and `area:` fields" back-compat case).
- `npm run build`: `tsc --noEmit && vite build` clean. 406 KB JS bundle (no size regression). Pre-existing gray-matter `eval()` warning unchanged.
- Visual confirmation: CORE-036 (standalone, Future Opportunities, has a starter tasknote) — violet "Future Opportunities" badge renders in the detail header from `task.priority`; starter-context body still renders correctly. Tasks without tasknotes still show no badge (gating preserved).
- Side observation flagged to user (not in scope for this task): epic subtasks (CORE-042.x rows under CORE-EPIC-042) cannot be expanded in viz — `SubtaskRow.tsx:29` calls `navigateToTask` (scroll + highlight only), with no `setExpandedId` plumbing. Standalone task rows have it via `TaskRow.tsx:35,39`. Pre-existing gap, predates this task. To be filed separately if the user wants it tracked.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-042.3 retired the `priority:` and `area:` YAML frontmatter fields per Thrust C of the [[CORE-EPIC-042]] rethink, mirroring the [[CORE-023]] field-retirement playbook. Both fields were fully derivable — `priority` from the PLAN.md section heading (already read by `parser.ts`) and `area` from the task ID prefix (no parser-side reader; only the frontmatter required-field gate consumed it). The 12-file fan-out covered viz parser/UI/tests, both templates, tasknote-README, SPEC.md §"Tasknote frontmatter" (write-once policy now lists `priority:` + `area:` alongside `model:` as retired fields tools should silently ignore), three skills (`/task`, `/starter-task`, `/new-project`), `README.md` + `docs/MIGRATION.md`, and the two active tasknotes (CORE-036 + this one, migrated post-parser-ship per [[CORE-023]] precedent so viz never rendered against an unparsed shape mid-execution). TaskDetail badge data source switched from `tasknote?.frontmatter?.priority` to `tasknote ? task.priority : undefined`, preserving the current "badge only when a tasknote exists" gating. New back-compat test asserts archived tasknotes carrying legacy `priority:` + `area:` parse fine (gray-matter passes through, our shape narrowing drops them). Drive-by: corrected the `model` field still appearing in three doc enumerations — a pre-existing CORE-023 doc-cleanup gap surfaced because the same sentences were the ones being edited; rewriting them as partial truths would have left the lists still wrong. SPEC version held at v0.7.0 per filing decision; the v0.8.0 bump covering all of Thrust C will land at [[CORE-042.4]]'s closure. 54/54 viz tests green, build clean, browser-verified against CORE-036.

**Archived:** 2026-05-06
