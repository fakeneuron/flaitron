---
title: Add "Working in Obsidian" section to README.md
status: completed
priority: Medium
area: core
model: opus
tags: [docs, obsidian, dx]
created: 2026-05-01
due:
related-tasks: [CORE-017, CORE-018, CORE-019]
---

# CORE-022 | Add "Working in Obsidian" section to README.md

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-017]] [[CORE-018]] [[CORE-019]]

## 🎯 Goal

Add a short, opt-in "Working in Obsidian" section to `README.md` so prospective adopters who already use Obsidian see at a glance that flowtron's `[[TASK-ID]]` wikilinks (CORE-018) render natively and the YAML frontmatter (CORE-017) is Dataview-queryable — without committing flowtron to a maintained external-tooling doc.

## ✅ Acceptance

- [ ] `README.md` gains a brief "Working in Obsidian" section (≤ 20 lines)
- [ ] Section names both flowtron features that map natively: `[[TASK-ID]]` wikilinks (CORE-018) and YAML frontmatter (CORE-017)
- [ ] Includes one minimal Dataview query example — syntax verified against current public Dataview docs
- [ ] Framing is **opt-in** — "if you use Obsidian, here's how flowtron fits"; never prescriptive, never positions Obsidian as a flowtron requirement
- [ ] No new file added under `docs/` (re-scope rationale: avoid the maintenance burden of a dedicated external-tooling doc)
- [ ] Section placed at a sensible insertion point in `README.md` (likely between "Visualizer" and "Repo layout")

## 🧩 Subtasks

- [ ] Pick the README.md insertion point and section heading (likely "Working in Obsidian" between Visualizer and Repo layout)
- [ ] Verify one minimal Dataview query against current public Dataview docs (`https://blacksmithgu.github.io/obsidian-dataview/`)
- [ ] Draft 3–4 sentence positioning paragraph (opt-in framing; names wikilinks + frontmatter) plus the verified Dataview snippet
- [ ] Append the section to `README.md` and visually verify rendering
- [ ] Phase 3 — markdown lint, link check
- [ ] Phase 4 — PLAN.md flip + archive

## 🔗 Related

- [[CORE-017]] — Added the YAML frontmatter that Dataview queries will consume
- [[CORE-018]] — Introduced `[[TASK-ID]]` wikilinks; this doc explains how to make them clickable in Obsidian
- [[CORE-019]] — Same frontmatter consumed by `viz/` rather than Obsidian (parallel consumer, not a blocker)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both enabling pieces (CORE-017 frontmatter, CORE-018 wikilinks) shipped 2026-05-01; the user is the daily driver and benefits immediately. Scope is bounded (one new doc + a one-line README pointer). Passes all four FUTURE.md evaluation filters — Obsidian is opt-in companion tooling, not a mandate; markdown + git remain the source of truth.

- [x] Read relevant source files (`SPEC.md` §Tasknote frontmatter + §Tasknote body shape, `README.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`, `_project/FUTURE.md` §Ecosystem & Interoperability)
- [x] **Drift check** — No drift. CORE-017 frontmatter schema and CORE-018 wikilink syntax match what the task description references. Field list in PLAN.md task description (`status`, `priority`, `area`, `tags`, `due`, `related-tasks`) is a subset of the actual schema in SPEC.md lines 80-92 (also includes `title`, `model`, `created`); Dataview examples should reach the broader set where useful.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Audience framing (clarified by user, 2026-05-01):** User does not personally use Obsidian and is not opinionated about the setup. The doc exists as **positioning** — flowtron's `[[wikilinks]]` and frontmatter make it native-feeling for Obsidian users coming from AI-coding harnesses that already integrate with Obsidian-style PKM. So the doc:
- Frames Obsidian as **opt-in companion tooling**, never a flowtron requirement.
- Stays minimal (Dataview only — explicit user choice over the "vanilla expanded" and "opinionated stack" alternatives).
- Targets Obsidian-using prospective adopters, not the user's own daily workflow.
- Cannot be live-validated by the user during Phase 3 — Dataview/Obsidian behavior must be cross-checked against current public docs (Dataview: `https://blacksmithgu.github.io/obsidian-dataview/`; Obsidian wikilink resolution: official Obsidian docs). User can spot-check plausibility, not run the feature end-to-end.

**Re-scope decision (Phase 1 update, 2026-05-01):** After producing the outline + opening section, the user asked how critical a dedicated doc actually is. Honest reassessment:
- Zero current flowtron adopters use Obsidian; a 200–250 line guide would be speculative outreach to a hypothetical audience.
- An external-tooling doc would likely fail FUTURE.md's "still lightweight in six months?" filter — Dataview syntax drifts and plugin recommendations age.
- README.md is where prospective adopters actually scan first; a paragraph there does the positioning job at a fraction of the maintenance cost.

CORE-022 re-scoped from "Write `docs/OBSIDIAN.md` (~200 lines)" → "Add 'Working in Obsidian' section (≤ 20 lines) to README.md." PLAN.md line and tasknote header updated.

**Pattern survey (re-scoped):** README.md's existing sections — "Documents", "Bootstrapping a new project", "Visualizer", "Repo layout", "Version" — are short prose paragraphs (sometimes with a fenced code block). The new "Working in Obsidian" section should match this shape: a few sentences plus one fenced Dataview query. Insertion point between "Visualizer" and "Repo layout" feels natural — both are tooling-adjacent context.

**Out of scope** (recorded to prevent creep during Execution):
- Updating `/new-project` skill or `claude/CLAUDE-snippet.md` — pairs with CORE-020.
- Wikilink resolution in `viz/` — that's FE-003.
- Cross-project aggregator vault — overlaps with FE-002.
- Mandating Obsidian anywhere in flowtron's required surface — flowtron stays editor-agnostic.
- Touching archived tasknotes — write-once historical records (CORE-017 backwards-compat policy).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Phase 1 noted README.md's existing sections are short prose paragraphs (sometimes with a fenced code block); the new section follows that shape exactly. No new pattern introduced.
- [x] Implemented the minimal solution — appended "Working in Obsidian" section to `README.md` between "Visualizer" and "Repo layout"
- [x] Updated/added tests for non-trivial behavior — N/A (doc patch; no code, no testable behavior)
- [x] Ran targeted tests on changed files — N/A; visual rendering verification covered in Phase 3

**Implementation Notes:**

- **Dataview syntax verified** against `https://blacksmithgu.github.io/obsidian-dataview/queries/structure/` (fetched 2026-05-01): canonical `TABLE <fields> FROM "<folder>" WHERE <cond> SORT <field>` form. The example uses `WHERE status != "completed"` against the `status` frontmatter field shipped in CORE-017.
- **Code-block fencing:** Used quadruple-backtick outer fence around the inner triple-backtick `dataview` block so the example renders as **text** on GitHub (and in Obsidian). Reason: a bare triple-backtick `dataview` block would (a) render as a generic code block on GitHub with no benefit, and (b) attempt to **execute** in Obsidian against whatever paths exist in the reader's vault — confusing for someone browsing README.md inside a vault. The quad-backtick wrap shows the literal source for copy/paste in both contexts.
- **Section length:** 17 content lines + heading + surrounding blanks = within the ≤ 20-line acceptance criterion.
- **No new files**, no `docs/` additions — re-scope honored.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (doc patch)
- [x] Ran lint/type-check on changed code — manual markdown syntax check (no markdownlint config in repo); section structure, list nesting, code-fence balance all verified by re-reading the rendered file
- [x] Asked the user for visual confirmation of the rendered README section — green-lit 2026-05-01 (no adjustments requested)
- [x] Fixed all introduced issues — none surfaced

**Testing Notes:**

- **Link check:** Two links in the new section. The external Dataview link (`https://blacksmithgu.github.io/obsidian-dataview/`) was successfully fetched in Phase 2 (and is the homepage of the canonical Dataview docs). The `[[TASK-ID]]` token is a literal display, not a markdown link.
- **Frontmatter field accuracy:** The fields named in the section (`status`, `priority`, `area`, `tags`, `due`, `related-tasks`) match SPEC.md §"Tasknote frontmatter" exactly.
- **Existing README.md content:** Untouched. Edit was strictly additive — one new section between "Visualizer" and "Repo layout".

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — `README.md` is itself the inventory; no other docs reference Obsidian behavior
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-01`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Re-scoped from `docs/OBSIDIAN.md` (~250-line dedicated guide) to a 17-line `## Working in Obsidian` section in `README.md` after Phase 1 surfaced (a) zero current adopters use Obsidian, (b) a maintained external-tooling doc would fail FUTURE.md's lightweight-in-six-months filter, and (c) README.md is where prospective adopters actually scan first.

**Shipped:** A new section in `README.md` between "Visualizer" and "Repo layout" containing a positioning paragraph (editor-agnostic framing), bullets naming the two flowtron features that map natively to Obsidian (`[[TASK-ID]]` wikilinks from CORE-018; YAML frontmatter from CORE-017 as Dataview's query target), and one verified Dataview snippet (`TABLE status, priority, area FROM "_project/tasknote" WHERE status != "completed" SORT priority`). Closing line reaffirms Obsidian is opt-in companion tooling. Section length 17 content lines (acceptance: ≤ 20).

**Non-obvious choice:** The Dataview example uses a quadruple-backtick outer fence so the inner triple-backtick `dataview` block renders as literal text on GitHub *and* doesn't auto-execute when someone reads `README.md` inside an Obsidian vault.

**Verification:** Dataview syntax fetched and confirmed against the canonical docs (`https://blacksmithgu.github.io/obsidian-dataview/queries/structure/`); frontmatter field names match SPEC.md §"Tasknote frontmatter"; README.md's existing structure untouched; no `docs/` additions; opt-in framing throughout.

**Project memory saved:** A `project_obsidian_positioning.md` memory recording that flowtron's Obsidian-friendliness is positioning for prospective adopters in AI-coding-with-PKM workflows — not the user's own daily setup. Future Obsidian-related work should stay minimal and avoid prescribing setups the user can't validate.

**Archived:** 2026-05-01
