---
title: PLAN.md signal extraction
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-02
due:
related-tasks: [CORE-018, CORE-023]
---

# CORE-024 | PLAN.md signal extraction

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-018]] [[CORE-023]]

## 🎯 Goal

Extend PLAN.md long-description prose with parseable `[[TASK-ID]]` wikilink + `Blocked by` conventions, and surface them in `viz/` as related-task and blocker chips on rows that have no tasknote.

## ✅ Acceptance

- [x] `viz/src/parser.ts` — `Task` interface gains `relatedTasks: string[]` and `blockedBy: string[]`; `parsePlan` extracts both from each task's long description using wikilink-only syntax. Wikilinks inside a `Blocked by` line are excluded from `relatedTasks` so the two signals don't double-up.
- [x] `viz/src/ui/App.tsx` — related-task chips render for rows **without** a tasknote, sourced from `task.relatedTasks` (frontmatter `relatedTasks` continues to win when present).
- [x] `viz/src/ui/App.tsx` — distinct red-tinted blocker chips render for `task.blockedBy` **always** (regardless of tasknote presence); clicking calls existing `navigateToTask`.
- [x] `viz/src/ui/App.tsx` — when a no-tasknote row is expanded, `[[TASK-ID]]` wikilinks inside the rendered PLAN.md description become clickable buttons that call `navigateToTask`. The literal `Blocked by [[ID]] — reason` prose remains visible verbatim (with the wikilink clickable).
- [x] "no tasknote" pill is suppressed when any chips/blockers are present (otherwise visually doubles up).
- [x] `_project/PLAN.md` — cross-references migrated to wikilink form: CORE-016 → `[[CORE-008]]`; FE-003 → `[[FE-001]]` / `[[FE-004]]` / `[[CORE-018]]`; FE-002 → `[[FE-001]]` / `[[FE-004]]`; CORE-EPIC-009 → `[[CORE-008]]`. CORE-016's "do not start until InvisiPaw backlog cleared" rephrased as `Blocked by [[CORE-008]] — ...` (anchoring on CORE-008 since the external InvisiPaw-backlog blocker has no task ID; per user choice).
- [x] `SPEC.md` — new §"Long-description conventions" subsection under §"Task-line format" documents `[[TASK-ID]]` wikilink + `Blocked by [[ID]]` syntax (wikilink-only) + the code-span exclusion rule. Version bumped v0.2.0 → v0.3.0; release tag deferred.
- [x] New parser tests cover both `relatedTasks` + `blockedBy` extraction (single, multiple, neither, the dedup-vs-Blocked-by case, the bare-ID-without-wikilink rejection, and the code-span-exclusion case). All existing parser tests still pass: 41 → 51 (+10 parser).
- [x] Visual confirmation in the dev server: CORE-016 shows a red ⛔ CORE-008 blocker chip; FE-002 / FE-003 / CORE-EPIC-009 show related-task chips on rows without a tasknote; expanding FE-003 shows `[[FE-001]]` / `[[FE-004]]` / `[[CORE-018]]` rendered as clickable buttons inline, while `\`[[FE-042]]\`` (in backticks) renders as literal code.

## 🧩 Subtasks

- [x] Extend `viz/src/parser.ts`: add `relatedTasks` + `blockedBy` to `Task`; write `extractBlockedBy` + `extractRelatedTasks` helpers; integrate into `parsePlan`.
- [x] Add parser tests in `viz/src/parser.test.ts`: relatedTasks (single, multiple, none, legacy); blockedBy (single, multiple, none); dedup (blocker wins); bare-ID `Blocked by: CORE-008` rejection; legacy minimal-form back-compat.
- [x] Update `viz/src/ui/App.tsx` `TaskRowInner`: related-task chips fall back to `task.relatedTasks` when no frontmatter; new `BlockerChip` (rose-tinted, `⛔` glyph) rendered from `task.blockedBy` for all rows; "no tasknote" pill suppressed when chips/blockers present.
- [x] Update `viz/src/ui/App.tsx` no-tasknote `TaskDetail` branch: `wikilinkifyMarkdown` pre-processes the description into `[[[ID]]](#wikilink-ID)` markdown links; `react-markdown` `components.a` map intercepts `#wikilink-` hrefs and renders them as clickable buttons calling `navigateToTask`. Threaded `navigateToTask` through `TaskDetail` (via both `EpicRow` and `TaskRow` call sites).
- [x] Migrate active `_project/PLAN.md` descriptions: CORE-016 (`[[CORE-008]]` + Blocked-by line), FE-003 (`[[FE-001]]`/`[[FE-004]]`/`[[CORE-018]]`), FE-002 (`[[FE-001]]`/`[[FE-004]]`), CORE-EPIC-009 (`[[CORE-008]]`).
- [x] Update `SPEC.md`: added §"Long-description conventions" subsection under §"Task-line format" with table + examples + code-span-exclusion clause. Bumped `Version: v0.2.0 → v0.3.0`; release tag deferred (mirrors CORE-017/CORE-018 pattern).
- [x] Run `npm run test` in `viz/` — 51/51 green (+10 parser tests).
- [x] Run `npm run build` (`tsc --noEmit && vite build`) in `viz/` — clean.
- [x] Visual confirmation via Playwright on `localhost:5174` — all four target rows confirmed; FE-003 expanded view confirmed inline wikilink buttons + code-span literal rendering.
- [x] **Mid-Phase-3 hardening (dogfood-discovered):** parser + UI now skip wikilinks inside backtick code spans. Discovered via FE-003's `\`[[FE-042]]\`` placeholder appearing as a spurious chip + raw-markdown text. Hardened `extractBlockedBy`/`extractRelatedTasks` with `stripCodeSpans`; updated `wikilinkifyMarkdown` to skip code-span segments. Added 1 parser test + SPEC clause documenting the rule.

## 🔗 Related

- [[CORE-018]] — established `[[TASK-ID]]` wikilink convention in tasknote bodies; this task extends it to PLAN.md descriptions
- [[CORE-023]] — task-line grammar extension; CORE-024 filed from its dogfooding (visual review surfaced empty right-gutter on tasks without tasknotes)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-05-02 from CORE-023 dogfooding (visual review surfaced empty right-gutter on tasks without tasknotes). Direct, well-scoped follow-up — viz/ surface area is already established; CORE-018 set the wikilink convention in tasknote bodies; this task carries that convention into the PLAN.md description prose. No drift, no scope inflation.

- [x] Read relevant source files (`viz/src/parser.ts`, `viz/src/ui/App.tsx`, `viz/src/tasknote.ts`, `viz/src/parser.test.ts`)
- [x] **Drift check** — All paths and shapes cited in the PLAN.md task description match current code: `viz/src/parser.ts` `Task` interface has no `relatedTasks` / `blockedBy` yet (lines 11–19); `viz/src/ui/App.tsx:595` only renders related-task chips when `fm` (frontmatter) is present, leaving rows without a tasknote with empty right-side gutter as described. CORE-018's `[[TASK-ID]]` wikilink convention is documented in SPEC.md §"Tasknote body shape" (line 185–188). No drift.
- [x] Asked clarifying questions — three resolved via AskUserQuestion: (a) **Blocked by syntax = wikilink-only** (`Blocked by [[ID]]`, never bare-ID); (b) **inline wikilinks in expanded description = clickable links** calling `navigateToTask`; (c) **Blocked by line prose stays visible** in the rendered description (only chip is a separate signal in the gutter).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Signal separation rule:** wikilinks inside a `Blocked by ...` line go to `blockedBy` only; wikilinks elsewhere in the description go to `relatedTasks`. A wikilink never lands in both buckets — keeps the visual chips orthogonal (slate "related" vs red "blocker").
- **Frontmatter precedence:** when a tasknote exists with `related-tasks:` populated, frontmatter wins (existing behavior). PLAN.md `task.relatedTasks` only fills the gap for rows without a tasknote (or with frontmatter `related-tasks: []`). `task.blockedBy` is independent — always rendered as the red blocker chip if present, regardless of tasknote.
- **`react-markdown` wikilink rendering:** simplest path is a small `remark` plugin (or text-replacement preprocess) that converts `[[TASK-ID]]` to a custom AST node, with a `components` map to render it as a button. Pattern survey deferred to Phase 2 — `react-markdown` + `remark-gfm` is already wired in `viz/src/ui/App.tsx:3`.
- **SPEC version bump:** mirrors CORE-017/CORE-018 — bump `SPEC.md` `Version:` header (v0.2.0 → v0.3.0 since this is additive grammar) but defer the release tag to a separate task. New optional convention; legacy lines parse fine.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing `RelatedChip` (App.tsx:777) into a sibling `BlockerChip` (rose-tinted, `⛔` glyph). Wikilink-rendering via existing `react-markdown` + `components.a` map (no new deps; no remark plugin). Parser extraction matches existing helper-function pattern (`cleanDescription` is the local precedent).
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior (10 new parser tests)
- [x] Ran targeted tests on changed files (`viz/src/parser.test.ts`)

**Implementation Notes:**

- **`react-markdown` wikilink path:** chose `wikilinkifyMarkdown(text)` → `[[[ID]]](#wikilink-ID)` markdown link → `components.a` interceptor over a custom remark plugin. CommonMark allows nested matched brackets in link text, so `[[[ID]]](url)` parses cleanly with link text = `[[ID]]`. Smaller footprint, no new deps.
- **Code-span gotcha (mid-Phase-3):** `[[FE-042]]` inside backticks in FE-003's prose was being parsed as a real chip + appearing as raw markdown in the expanded view. Fixed in both layers — parser strips code spans before extraction (`stripCodeSpans` helper); UI splits on code-span boundaries before transforming wikilinks. SPEC §"Long-description conventions" now documents this rule.
- **Signal separation:** wikilinks inside a `Blocked by` block land in `blockedBy` only; the same ID elsewhere is excluded from `relatedTasks` (blocker wins). Implemented as a `Set` filter rather than position-based — simpler and matches the user-visible "no double-rendering" intent.
- **Frontmatter precedence preserved:** `(fm ? fm.relatedTasks : task.relatedTasks)` — frontmatter wins for tasks with a tasknote; PLAN.md fills the gap for rows without one. Blocker chips are independent — always rendered when present.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code (vitest: 51/51, +10 parser, +0 tasknote)
- [x] Ran lint/type-check on changed code (`tsc --noEmit && vite build` — clean; only pre-existing gray-matter eval warning unchanged)
- [x] (frontend) Asked the user for visual confirmation (Playwright screenshots of the priority list + FE-003 expanded view confirmed all chip styles, suppression rules, and inline wikilink buttons)
- [x] Fixed all introduced issues (the dogfood-discovered code-span gotcha — fix landed in this same task per user's "Recommended" choice)

**Testing Notes:**

- 41 → 51 parser tests (+10): single-/multi-/empty-extraction for both `relatedTasks` and `blockedBy`; dedup-vs-Blocked-by; bare-ID rejection; legacy minimal-form back-compat; code-span exclusion.
- Full build: `tsc --noEmit && vite build` — zero TS errors, zero new lint output. Pre-existing gray-matter "use of eval" warning unchanged.
- Visual confirmation: chips render (CORE-016 = ⛔ CORE-008; FE-003 = FE-001/FE-004/CORE-018; FE-002 = FE-001/FE-004; CORE-EPIC-009 = CORE-008); "no tasknote" pill correctly suppressed where chips appear; FE-003 expanded shows clickable `[[FE-001]]` / `[[FE-004]]` / `[[CORE-018]]` buttons with proper `Jump to {ID}` titles; `\`[[FE-042]]\`` renders as monospace inline code.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change (SPEC.md §"Long-description conventions" + version bump; `_project/PLAN.md` cross-reference migrations)
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-02`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Surfaced cross-task signals from PLAN.md long-description prose: `[[TASK-ID]]` wikilinks → `Task.relatedTasks`, `Blocked by [[ID]], [[ID]]` → `Task.blockedBy`. Extended `viz/` to render related-task chips on rows without a tasknote (frontmatter still wins when present) and a distinct red-tinted blocker chip always; expanded no-tasknote rows show inline clickable wikilink buttons via `react-markdown`'s `components.a` map. Hardened both layers to ignore wikilinks inside backtick code spans (discovered mid-Phase-3 from FE-003's `\`[[FE-042]]\`` placeholder). Migrated four PLAN.md cross-references to wikilink form; CORE-016 gained a `Blocked by [[CORE-008]]` line (anchored on the playbook task per user choice, since the real "InvisiPaw backlog" blocker is external). SPEC bumped v0.2.0 → v0.3.0 with new §"Long-description conventions" subsection (release tag deferred). Tests: 41 → 51 (+10 parser).

**Archived:** 2026-05-02
