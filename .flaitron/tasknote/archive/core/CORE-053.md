---
title: MIGRATION-variant-trim
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-052, CORE-049]
---

# CORE-053 | MIGRATION-variant-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-052]] [[CORE-049]]

## 🎯 Goal

Apply cite-don't-restate to `docs/MIGRATION.md` §1.5's variant/body-shape restatement (lines 95, 97–102, ~190w), mirroring the pattern CORE-052 applied to `templates/tasknote-README.md`.

## ✅ Acceptance

- [ ] ≥70w savings off `docs/MIGRATION.md` §1.5 (verified by `wc -w` before/after; 272w → ≤202w)
- [ ] Lines 95, 99, 100 reduced to one-sentence cite-only forms (no inline restatement of frontmatter shape, body shape, or starter/micro lifecycle); line 97 variant intro adapted as needed for the trimmed block; line 102 (epic lifecycle) preserved verbatim
- [ ] Every SPEC §X citation in the trimmed block resolves to an actual `^## ` / `^### ` heading in `SPEC.md`; every template path / SPEC module path resolves to an actual file
- [ ] Cold straight-through re-read of trimmed §1.5 confirms adopter setup-flow orientation still works end-to-end

## 🧩 Subtasks

- [ ] Draft the trimmed §1.5 block (lines 95, 97, 99-100 → cite-only forms; line 102 preserved verbatim); mirror CORE-052's per-line cite shapes
- [ ] Replace lines 95-102 in `docs/MIGRATION.md` with the drafted block
- [ ] `wc -w` verify ≥70w savings off §1.5 (272w → ≤202w); flag mid-flight if short
- [ ] Citation grep-verify: each SPEC §X resolves against `^## ` / `^### ` in SPEC.md; each template path / SPEC module path exists
- [ ] Cold straight-through re-read of trimmed §1.5 (full read, not skim); confirm adopter setup-flow orientation

## 🔗 Related

- [[CORE-052]] — tasknote-README variant trim (immediate predecessor; same pattern; doc-drift sweep that filed this)
- [[CORE-049]] — workflow token audit (filed the audit cohort; CORE-050/051/052 are the sibling trims)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Sibling-of-[[CORE-052]] cite-don't-restate trim filed by CORE-052's Phase 4 doc-drift sweep and traceable to [[CORE-049]] audit cohort. Pattern proven on adjacent surface (CORE-052: 702w → 504w, -28.2% on `templates/tasknote-README.md`). Same restatement content (variant block + body shape) lives in MIGRATION.md §1.5; trim transfers cleanly. Drift verified — starter's per-line counts match exactly (190w block as projected). Audience-judgment open question resolved (Phase 1 AskUserQuestion → pure cite-only mirroring CORE-052).

- [x] Read relevant source files — `docs/MIGRATION.md` §1.5 lines 86-103 (272w; per-line word counts verified), `templates/tasknote-README.md` (CORE-052 final shape, l.22-28), SPEC headings inventoried for citation resolution.
- [x] **Archive skim** — `_project/tasknote/archive/core/` enumerated; narrowed via `grep -l MIGRATION` (31 hits). Read [[CORE-052]] (immediate predecessor; just-merged): load-bearing — cite-don't-restate pattern + per-line cite shapes (mirror for lines 99/100) + functional verification protocol (citation grep + cold re-read) + audience-aware reasoning + line-28-preserve-verbatim precedent for line 102. Read CORE-052's Phase 4 doc-drift sweep entry that explicitly filed this follow-up. CORE-049 (audit cohort filing) confirms scope.
- [x] **Drift check** — file paths and line numbers match exactly (lines 95, 97, 99, 100, 102 still hold the cited content). Per-line: line 95 = 51w, line 97 = 10w, line 99 = 40w, line 100 = 51w, line 102 = 38w. Block total = 190w (starter said ~190w). **No drift** — unlike CORE-052 which found line 25 had grown +55w post-CORE-049, this block has been stable since the starter was filed.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 3 questions resolved via AskUserQuestion: (1) **Pure cite-only inline shape** (mirror CORE-052; one-sentence cite per variant; canonical shape lives in SPEC + templates); (2) **Line 95 collapse to one-sentence cite** (paralleling CORE-052's README l.22-23 lead-in; ~51w → ~20w); (3) **Line 102 preserved verbatim** (mirrors CORE-052's call on its line-28 analog; already at cite-shape with Discovery/Audit anchor names).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Drift findings — none

Starter's per-line baseline matches verified counts exactly:

| Line | Content | Starter claim | Actual | Trim target |
|---|---|---|---|---|
| 95 | Body-shape restatement | 51w | 51w ✓ | ~20w (cite) |
| 97 | Variant intro | 10w | 10w ✓ | adapt to fit trimmed block |
| 99 | Starter variant | 40w | 40w ✓ | ~16w (cite, mirror CORE-052 l.26) |
| 100 | Micro variant | 51w | 51w ✓ | ~30w (cite, mirror CORE-052 l.27) |
| 102 | Epic lifecycle | 38w | 38w ✓ | preserve verbatim |
| **Block** | | **~190w** | **190w ✓** | **~85-105w** |
| **§1.5 whole** | | — | 272w | **~190-200w** |

Projected block trim: ~85-105w (blocks 190w → 85-105w). §1.5 whole: 272w → ~190-200w. Acceptance threshold ≥70w savings against ~85w realistic = ~15w slack (mirrors CORE-052's slack ratio).

### B. SPEC anchors targeted for citation (verified live)

Same canonical citations as CORE-052 (audience differs but cited content is identical):

| Variant | Citation | Status |
|---|---|---|
| Standard (l.95) | SPEC §"Tasknote frontmatter" | ✓ |
| Standard (l.95) | SPEC §"Tasknote body shape" | ✓ |
| Standard (l.95) | `_project/flowtron/templates/tasknote-template.md` | ✓ |
| Starter (l.99) | `_project/flowtron/SPEC/starter.md` | ✓ |
| Micro (l.100) | SPEC §"When to use a tasknote (and when not to)" | ✓ |
| Epic (l.102, preserved) | `_project/flowtron/SPEC/epic.md` | ✓ |

Final verification at Phase 3 (citation grep against `SPEC.md` headings + `test -f` of cited paths).

### C. Decisions locked

| # | Decision | Source |
|---|---|---|
| 1 | Acceptance threshold ≥70w savings off §1.5 (272w → ≤202w); ~15w slack against ~85w realistic | Phase 1 projection (mirrors CORE-052 slack ratio) |
| 2 | Pure cite-only inline shape (no inline keyword bullets); mirror CORE-052 | Phase 1 AskUserQuestion |
| 3 | Line 95 collapse to one-sentence cite (paralleling CORE-052's README l.22-23 lead-in) | Phase 1 AskUserQuestion |
| 4 | Line 102 preserved verbatim — already cite-shaped with Discovery/Audit anchors | Phase 1 AskUserQuestion (mirrors CORE-052 line-28 call) |
| 5 | Phase 3 testing: N/A (adopter cold-read setup doc; no parser/test depends on this content); functional verification = citation grep-verify + cold straight-through re-read | Starter pre-lock + CORE-052 precedent |
| 6 | Version bump: patch (prose-only, no contract change) | Starter pre-lock; CORE-051/052 precedent |
| 7 | Pattern: cite-don't-restate (CORE-052 shape applied to MIGRATION.md surface; same audience tier as CORE-052's adopter-facing README) | This conversation |

### D. Pattern transfer note (CORE-052 → MIGRATION.md)

CORE-052 trimmed `templates/tasknote-README.md` (adopter-facing, ships into adopter projects on `cp` at §1.5 step). CORE-053 trims MIGRATION.md §1.5 (the doc that *describes* that `cp` step). Both surfaces are adopter cold-read; pattern transfers identically.

- **What stays the same:** drop SPEC restatement; preserve only what's not derivable from a one-line cite + the cited file. Line 102 preserved verbatim as already-cite-shaped (mirrors CORE-052 line 28).
- **MIGRATION-specific consideration:** §1.5's purpose is to walk the adopter through the `cp` + customize step. The body-shape mention (line 95) is mid-flow orientation, not standalone reference; collapse-to-cite (not drop) preserves the "the file you just copied describes X" beat that gives §1.5 its narrative spine.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown adopter cold-read setup doc; no parser/test depends on this content)

**Implementation Notes:**

- **Pattern survey:** extended [[CORE-052]]'s cite-don't-restate shape (immediate predecessor; just merged). No new pattern needed. Same audience tier (adopter cold-read); cite-only shape transfers cleanly. Per-line cite forms for Starter / Micro mirror CORE-052's README l.26-27 verbatim modulo path prefix; Epic line preserved verbatim mirroring CORE-052's line-28 call.
- **Files touched:** `docs/MIGRATION.md` only (lines 95-102 → 95-100 post-trim).
- **Edit shape:** original 8-line block (l.95-102: body-shape + variant intro + starter + micro + epic) replaced with 6-line block (orientation+cite + starter cite + micro cite + epic preserved verbatim). Line 102's epic content preserved verbatim per Phase 1 Decision 4.
- **Per-line:**
  - Line 95 (body-shape, was 51w) → merged with line 97 variant intro into single orientation+cite line: 30w. Cited SPEC §"Tasknote frontmatter" + §"Tasknote body shape" + `_project/flowtron/templates/tasknote-template.md`. Drops inline frontmatter field list, body-shape restatement, and `/task scaffolds this automatically` redundancy.
  - Line 97 (variant intro, was 10w) → merged into the line-95 orientation tail (`Two lightweight variants exist alongside it:`).
  - Line 99 (Starter, was 40w) → 16w cite. Mirrors CORE-052 README l.26 verbatim modulo path prefix. Cited `_project/flowtron/SPEC/starter.md` for lifecycle.
  - Line 100 (Micro, was 51w) → 31w cite. Mirrors CORE-052 README l.27 verbatim modulo path prefix. Cited SPEC §"When to use a tasknote (and when not to)" for threshold. Dropped `## ⚡ Notes` body-shape restatement and bold-prefix prompt list.
  - Line 102 (Epic, 38w) → 38w preserved verbatim per Phase 1 Decision 4.
- **Block size:** 190w → 111w (-79w / -41.6% of trim block).
- **§1.5 whole:** 272w → 193w (-79w / -29.0%). Beats ≥70w acceptance with **9w slack**.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI change)

**Testing Notes:**

- Functional verification = citation grep-verify + cold straight-through re-read of trimmed §1.5 (per Phase 1 Decision 5).
- **Citation grep:** all 3 SPEC heading citations matched against `^## ` in `SPEC.md`:
  - §"Tasknote frontmatter" — line 142 ✓
  - §"Tasknote body shape" — line 168 ✓
  - §"When to use a tasknote (and when not to)" — line 334 ✓
- **Cited file paths:** all 5 resolve via `test -f`:
  - `templates/tasknote-template.md` ✓
  - `templates/tasknote-starter-template.md` ✓
  - `templates/tasknote-micro-template.md` ✓
  - `SPEC/starter.md` ✓
  - `SPEC/epic.md` ✓ (line 100/old-102 cite, preserved verbatim)
- **Cold straight-through re-read** (full §1.5 read, l.86-101): adopter setup-flow orientation flow intact (1.5 header → `cp` template → customize copied README → "the README also describes the canonical shape, see SPEC + template" → 2 variant cites + epic preserved → §1.6 Commit). Each variant carries name + slash command + scaffold path + canonical citation. No template-shape regression; no orphaned references.
- **Word-count cross-check:** §1.5 272w → **193w** (-79w / -29.0%); meets acceptance with 9w slack.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Trimmed `docs/MIGRATION.md` §1.5 variant/body-shape restatement (lines 95, 97-102) via cite-don't-restate, mirroring [[CORE-052]]. Final: §1.5 **272w → 193w (-79w / -29.0%)**; trim block specifically **190w → 111w (-79w / -41.6%)**. Beats ≥70w acceptance with 9w slack.

**Doc-drift sweep:** all 4 AI-referenced docs reviewed:
- `README.md` — no change (line 62's YAML field reference is contextual Obsidian/Dataview pointer, not a canonical-shape restatement)
- `SPEC.md` — no change (cite target, not citer)
- `docs/MIGRATION.md` — trimmed (this task)
- `claude/CLAUDE-snippet.md` — no change (line 17 already cite-only one-line variant pointer)

**Pattern extended:** [[CORE-052]] cite-don't-restate, applied per-line:
- Line 95 (body-shape, 51w) + line 97 (variant intro, 10w) merged into single 30w orientation+cite line. Cited SPEC §"Tasknote frontmatter" + §"Tasknote body shape" + `_project/flowtron/templates/tasknote-template.md`. Drops inline frontmatter/body-shape restatement and `/task scaffolds this automatically` redundancy.
- Line 99 (Starter, 40w → 16w cite) — mirrors CORE-052 README l.26 verbatim modulo path prefix; cites `SPEC/starter.md`.
- Line 100 (Micro, 51w → 31w cite) — mirrors CORE-052 README l.27 verbatim modulo path prefix; cites SPEC §"When to use a tasknote (and when not to)".
- Line 102 (Epic, 38w preserved verbatim per Phase 1 Decision 4) — already at cite-shape with Discovery/Audit naming.

**Drift handled:** none — starter's per-line projections matched verified counts exactly (190w block as projected). Unlike CORE-052 which found line 25 had grown +55w post-CORE-049, this block has been stable since the starter was filed.

**No regressions** — 3 SPEC citations + 5 file path citations all resolve; cold straight-through re-read confirms adopter setup-flow orientation intact (`cp` template → customize → orientation+cite → variant cites + epic preserved → §1.6 Commit).

**Verification request:** lowest-friction eyeball is `git diff HEAD~1 -- docs/MIGRATION.md` — the variant block (now lines 95-100, was 95-102) should read as one orientation+cite line + 2 variant cite bullets + the preserved epic line, instead of the prior 4-paragraph restatement.

**Touched files:**

- `docs/MIGRATION.md` (trimmed §1.5 variant block; 272w → 193w)
- `_project/PLAN.md` (CORE-053 line flipped to stub + moved to `## Completed`)
- `_project/tasknote/CORE-053.md` → `_project/tasknote/archive/core/CORE-053.md` (this file)

**Archived:** 2026-05-09
