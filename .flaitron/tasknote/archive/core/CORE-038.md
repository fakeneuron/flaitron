---
title: task SKILL.md cite-don't-restate
status: completed
priority: Future Opportunities
area: core
tags: []
created: 2026-05-05
due:
related-tasks: [CORE-037, CORE-039, CORE-040]
---

# CORE-038 | task SKILL.md cite-don't-restate

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-037]] [[CORE-039]] [[CORE-040]]

## 🎯 Goal

Trim Steps 3b / 4 / 6 of `.claude/skills/task/SKILL.md` by replacing duplicated SPEC contracts with concise citations, preserving the skill's own value-add (gating, sequencing, conditional branches).

## ✅ Acceptance

- [x] ≥500w savings off `.claude/skills/task/SKILL.md` (verified by `wc -w` before/after) — **503w** (2,732w → 2,229w, ~18.4%)
- [x] Trimmed skill still drives `/task` correctly end-to-end (verified by cold re-read; next real `/task` invocation is implicit follow-up validation)
- [x] Every `see SPEC §X` citation in the trimmed skill matches an actual heading in `SPEC.md` (verified by grep)
- [x] Skill-specific value-add preserved: Step 6 "one continuous flow" framing, Step 2 four-way file-state branch, Step 1.5 model gate three-case branch

## 🧩 Subtasks

- [x] Trim Step 3b (current lines 110-137): replace field-by-field frontmatter prose + body section-by-section prose with a citation to SPEC §"Tasknote frontmatter" + §"Tasknote body shape". Keep only skill-specific filing logic SPEC doesn't carry (title from PLAN.md shortname, priority from Step 1 section heading, area lowercase matches archive subfolder, related-tasks from PLAN.md cited IDs). Bare-citation form.
- [x] Trim Step 4 (current lines 149-163): replace the Phase 1 checklist restatement + Re-scope/De-scope/drift behavioral notes with a citation to SPEC §"4-phase workflow" / §"Phase 1 Discovery" + §"Blocked tasks". Preserve skill imperatives: tick boxes as you go, AskUserQuestion for ambiguity, do not enter Phase 2 until every Phase 1 box is ticked.
- [x] Trim Step 6 (current lines 173-187): replace the post-closure 1-2-3 enumeration with a citation to SPEC §"Post-closure protocol". Preserve skill orchestration: "one continuous flow", "commit-go is the only gate", "steps 2 and 3 in the same response as the commit confirmation", "confirm before committing", recommended-model-per-option in the suggest step.
- [x] Leave Step 1.5 (model gate) untouched — keep restated; it's a hot path and cost of misfire is high.
- [x] Cold re-read the trimmed SKILL.md straight through; flag any citation that wouldn't resolve cleanly without re-reading SPEC, and any skill-specific gating that got lost in translation.
- [x] Verify all citations resolve: grep `^## ` and `^### ` headings in SPEC.md against the citation list in the trimmed skill.
- [x] Word-count before/after; confirm ≥500w savings.

## 🔗 Related

- [[CORE-037]] — audit that filed this task
- [[CORE-039]] — parallel SPEC.md trim (sibling)
- [[CORE-040]] — PLAN.md filing discipline + skill gating (sibling)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-037 audit validated the premise; all SPEC sections targeted for citation carry the contracts in full; ~500-580w savings remain material on every `/task` load.

- [x] Read relevant source files
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Drift:** Starter cited Step 3b lines 101-128, Step 4 140-154, Step 6 164-178. Current values: 110-137, 149-163, 173-187 (~9 lines down). Cause: CORE-040 added "Filing-discipline check (advisory)" block to Step 1 (lines 49-56). No semantic drift — every trim target intact. SKILL.md grew 2,653w → 2,732w; the +79w is the CORE-040 advisory and is not in scope for this trim.
- **SPEC anchors confirmed live:** §"Tasknote frontmatter" (line 204), §"Tasknote body shape" (line 300), §"The 4-phase workflow" (line 353), §"Blocked tasks" (line 428), §"Post-closure protocol" (line 515), §"Model field" (line 606).
- **Decisions (from clarifying questions):**
  1. Step 1.5 — keep restated (hot path; cost of misfire high).
  2. Step 3b — bare-citation form (cite SPEC §"Tasknote frontmatter" + §"Tasknote body shape"; preserve only skill-specific filing logic).
  3. Verification — cold re-read after edit; treat next real `/task` invocation as implicit follow-up validation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

- **Pattern survey:** the cite-don't-restate shape is already in active use throughout `SKILL.md` — Step 1 (`See SPEC §"Task-line format"`), Step 2 (`using SPEC §"Task ID convention"`), Step 3a (`See SPEC §"Starter tasknotes"`). Trimmed sections extend this existing pattern.
- **Step 3b** trimmed from ~440w to ~140w. Bare-citation form: cite SPEC §"Tasknote frontmatter" + §"Tasknote body shape"; preserved a 6-line skill-specific filing-logic block (title / status / priority / area / created / related-tasks sourcing) for fields whose values come from skill state. Dropped explicit gating for `tags:` and `due:` (template defaults are correct without skill intervention).
- **Step 4** trimmed from ~290w to ~95w. Cited SPEC §"📝 Phase 1: Discovery" for the checklist + Re-scope/De-scope behavior; preserved 5 skill imperatives (tick boxes, first item already done in Step 1, AskUserQuestion for ambiguity, populate `## 🧩 Subtasks`, no Phase 2 until ticked).
- **Step 6** trimmed from ~200w to ~135w. Cited SPEC §"Post-closure protocol" for the three-step protocol; preserved skill orchestration ("one continuous flow", "commit-go is the only gate", "in the same response as the commit confirmation", "confirm before committing", "recommend a model alongside the next-task ID").
- **Step 1.5** untouched per Phase 1 decision — hot path, cost of misfire high.
- **Regression caught in cold re-read:** initial Step 3b draft hardcoded `templates/tasknote-template.md` but Step 0 establishes `Template:` as path-varying (adopting projects use `_project/flowtron/templates/...`). Restored generic phrasing: `Copy the template (path resolved in Step 0)`.
- **Hardlink note:** `.claude/skills/task/SKILL.md` and `claude/skills/task/SKILL.md` share inode 79872599 — a single edit lands in both.
- **Tests:** N/A — this is a markdown skill file. Functional verification was the cold re-read.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- No code-level test suite applies to a markdown skill file. Functional verification was a cold straight-through re-read of the trimmed `SKILL.md` (all 171 lines). Each citation traces to a confirmed SPEC anchor; each preserved skill imperative still reads operationally.
- No lint/type-check applies to markdown.
- No frontend visuals — N/A.
- One introduced issue (template-path regression) caught in cold re-read and fixed in-flight before Phase 4.
- Word count cross-check: `wc -w` reports 2,229w on both hardlinked paths. Savings 2,732 → 2,229 = **503w** (~18.4% of original). Hits the ≥500w acceptance threshold.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Trimmed three sections of `.claude/skills/task/SKILL.md` by replacing duplicated SPEC contracts with concise citations, preserving every skill-specific behavioral imperative. Step 3b / Step 4 / Step 6 collapsed by ~300w / ~195w / ~65w respectively (Step 3b: cite SPEC §"Tasknote frontmatter" + §"Tasknote body shape", retain skill-specific filing-logic block; Step 4: cite SPEC §"📝 Phase 1: Discovery", retain five operational imperatives; Step 6: cite SPEC §"Post-closure protocol", retain "one continuous flow" framing + commit-gate + model-recommendation addition).

Final: 2,732w → 2,229w, **503w savings** (~18.4%, ≥500w threshold met). Step 1.5 model gate intentionally untouched (hot path; restated for safety). One in-flight regression caught and fixed during cold re-read (template-path hardcoding). Both hardlinked SKILL.md paths picked up the trim atomically.

Touched files: `.claude/skills/task/SKILL.md` (= `claude/skills/task/SKILL.md` via hardlink), `_project/PLAN.md`, `_project/tasknote/CORE-038.md` (this file).

**Archived:** 2026-05-06
