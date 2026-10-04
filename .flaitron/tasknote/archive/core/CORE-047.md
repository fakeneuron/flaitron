---
title: doc-set drift contract
status: completed
tags: [workflow, docs, drift]
created: 2026-05-08
related-tasks: [CORE-046, CORE-EPIC-042, CORE-040]
---

# CORE-047 | doc-set drift contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-046]] [[CORE-EPIC-042]] [[CORE-040]]

## 🎯 Goal

Tighten flowtron's doc-drift contract — light Phase 4 wording + strict epic-audit acceptance line + a project-declared `## AI-referenced docs` set in `_project/tasknote/README.md` — so per-slice closures and epic audits actually catch user-facing / AI-referenced doc drift.

## ✅ Acceptance

- [ ] `templates/tasknote-README.md` gains `## AI-referenced docs` section with three seed entries (`README.md`, `CLAUDE.md`, `_project/PLAN.md`) — one-line purpose each + extension note
- [ ] `SPEC.md` §"🚀 Phase 4: Closure" first checkbox replaced with the lean doc-drift-sweep wording referencing `_project/tasknote/README.md` §"AI-referenced docs"
- [ ] `SPEC/epic.md` audit-subtask contract gains a fixed acceptance line: doc-drift sweep across the project-declared doc set
- [ ] `templates/tasknote-template.md` Phase 4 first checkbox wording matches updated `SPEC.md`
- [ ] `templates/tasknote-micro-template.md` `## ⚡ Notes` gains `**Docs touched:**` bold-prefix line
- [ ] `claude/skills/task/SKILL.md` Step 5 Phase 4 prose updated to reference the doc-drift sweep
- [ ] `claude/skills/micro-task/SKILL.md` Step 4 closure prose updated to mirror the new bold-prefix line
- [ ] `claude/skills/new-project/SKILL.md` Step 8 hand-off mentions `## AI-referenced docs` as a placeholder for adopters to extend
- [ ] No version bump in this tasknote (deferred — bundle into next minor); `SPEC.md` `Version:` line unchanged
- [ ] `_project/tasknote/README.md` created for flowtron-self (so the doc-drift sweep has a doc set to walk; flowtron's seed: README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md)
- [ ] Self-host doc-drift sweep at this tasknote's Phase 4 closure (canary against flowtron's own AI-referenced doc set)

## 🧩 Subtasks

- [x] Update `templates/tasknote-README.md` — add `## AI-referenced docs` section with seed entries + extension note (anchor the convention; everything else cross-refs this)
- [x] Update `SPEC.md` §"🚀 Phase 4: Closure" first checkbox to the lean doc-drift-sweep wording
- [x] Update `SPEC/epic.md` audit-subtask contract — add fixed doc-drift acceptance line
- [x] Update `templates/tasknote-template.md` Phase 4 first checkbox to match `SPEC.md`
- [x] Update `templates/tasknote-micro-template.md` `## ⚡ Notes` — add `**Docs touched:**` bold-prefix line
- [x] Update `claude/skills/task/SKILL.md` Step 5 Phase 4 prose
- [x] Update `claude/skills/micro-task/SKILL.md` Step 3 closure prose (the prefix is filled at closure-readiness time)
- [x] Update `claude/skills/new-project/SKILL.md` Step 8 hand-off note
- [x] Bootstrap flowtron-self's `_project/tasknote/README.md` (gap surfaced mid-execution; needed for canary; user-confirmed via AskUserQuestion)
- [ ] Self-host canary: run the new doc-drift sweep at this tasknote's Phase 4 against flowtron's AI-referenced doc set

## 🔗 Related

- [[CORE-046]] — flowtron v1.1.0 (post-closure /model + recap-only); same Phase 4 closure-contract surface, this rides the same wording layer
- [[CORE-EPIC-042]] — workflow architecture rethink; precedent for SPEC-tightening epics of this shape
- [[CORE-040]] — PLAN.md filing discipline; kindred discipline contract at the *filing* boundary, this is its *closure-time* counterpart

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bananapeel BP-300.x doc-drift evidence is concrete and recent; the three-part solution shape (light Phase 4 + strict epic-audit + project-declared doc set) is well-scoped and well-precedented by [[CORE-046]]'s closure-contract tightening.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source files read.** `SPEC.md` (Phase 4 §, Tasknote body shape §, Tasknote frontmatter §, Post-closure §, When-to-use §); `SPEC/epic.md` (audit-subtask contract); `SPEC/versioning.md` (minor-bump rules); `templates/tasknote-template.md` (Phase 4 line 68); `templates/tasknote-micro-template.md` (`## ⚡ Notes` lines 18-24); `templates/tasknote-README.md` (full); `claude/skills/task/SKILL.md` (Step 5); `claude/skills/micro-task/SKILL.md` (Step 4); `claude/skills/new-project/SKILL.md` (Step 6 — copies tasknote-README into adopting projects).

**Drift findings.** SPEC.md Phase 4 cited at "~lines 282-291"; current state is lines 282-299. Section name and content unchanged — the +8 line shift is from [[CORE-046]]'s recap-only callout (lines 293-295). Immaterial to the work; cited line ranges in the starter were approximate. Other cited paths (`templates/tasknote-template.md` line 68; `templates/tasknote-micro-template.md` lines 18-24) match exactly.

**Archive skim — load-bearing precedents.**
- [[CORE-046]] (v1.1.0) — directly parallel: same SPEC.md Phase 4 surface, same `claude/skills/task/SKILL.md` Step 5 surface, same `claude/skills/micro-task/SKILL.md` Step 4 surface. CORE-046 promoted soft prose to a stronger callout; this task tightens the *first checkbox* and adds enumeration. Same shape of change, same touch-set; safe precedent.
- [[CORE-042.5]] / [[CORE-042.6]] — micro-template provenance. Confirms the bold-prefix pattern is the canonical micro-tasknote shape; adding `**Docs touched:**` as a new bold-prefix line follows the established convention.
- [[CORE-042.9]] — SKILL-side lazy-load. Confirms `claude/skills/task/SKILL.md` Step 5 is a *narrative paragraph*, not a per-step checklist — the Phase 4 prose update lands as a single sentence rewrite, not a multi-line checklist edit.
- [[CORE-040]] — PLAN.md filing discipline. Same kind of contract-tightening; precedent for adding a fixed advisory line that fires on every task without being conditional.

**`/new-project` (Step 6) seeding mechanism.** `claude/skills/new-project/SKILL.md` Step 6 currently copies `templates/tasknote-README.md` to `_project/tasknote/README.md` then leaves the project-specific area-prefix table and "Project quick commands" as user-fill placeholders. Adding `## AI-referenced docs` to the template as a new section seeds it automatically into adopting projects via the same `cp` — no Step 6 logic change needed. Just add a one-line hand-off note in Step 8 if the section is left as a placeholder for the user to extend.

**Self-host meta-test.** This very tasknote's Phase 4 closure is the first chance to exercise the new doc-drift sweep against flowtron's own AI-referenced doc set (this repo's CLAUDE.md / README / SPEC.md). Useful canary — if the new wording is unclear at this closure, fix it before adopting projects ever see it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

  Direct precedent: [[CORE-046]] (light SPEC.md Phase 4 contract tightening propagated to `claude/skills/task/SKILL.md` Step 5 + `claude/skills/micro-task/SKILL.md` Step 4 in lockstep). Same touch-set, same ordering. Extending; no new shape.

- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc + skill prose changes only; no behavior code touched)

**Implementation Notes:**

- **Anchor first.** Edited `templates/tasknote-README.md` first; everything else cross-refs `_project/tasknote/README.md` §"AI-referenced docs", so anchoring the convention before propagation kept downstream wording consistent across SPEC.md, SPEC/epic.md, templates, and skill prose.
- **Lean wording landed verbatim** in SPEC.md and `templates/tasknote-template.md` Phase 4 first checkbox: ```- [ ] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update``` (matches the lean from the user's AskUserQuestion answer).
- **Epic-audit fix line** placed as a labeled paragraph between point-5 of the lifecycle list and "**Forward-looking.**" in `SPEC/epic.md` — parallels the existing addendum shape.
- **Micro-tasknote** got `**Docs touched:**` as a 6th bold-prefix in `## ⚡ Notes`, sitting after `**Implementation:**` (both fill during/after work, not upfront like the first four). The `claude/skills/micro-task/SKILL.md` Step 3 prose update reflects "fill at closure-readiness time" rather than "fill upfront."
- **`/new-project` Step 6 unchanged.** Adding the section to `templates/tasknote-README.md` seeds it automatically into adopting projects via the existing `cp _project/flowtron/templates/tasknote-README.md _project/tasknote/README.md`. Only the Step 8 hand-off bullet was extended.
- **Mid-execution scope addition: flowtron-self bootstrap.** Discovered flowtron's own `_project/tasknote/` had no `README.md` — the canary in subtask 9 needed one to actually walk a doc set. Surfaced via AskUserQuestion; user chose "Create now." Wrote a flowtron-specific README (not a copy of the template — flowtron-self is unique: no submodule, no project-extension prefixes, points at SPEC.md as canonical workflow rather than `_project/flowtron/SPEC.md`). Seeded `## AI-referenced docs` with flowtron-relevant entries: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`. SPEC modules + skill files explicitly noted as lazy-loaded, not part of the default cold-start sweep.
- **Version bump deferred** per user's AskUserQuestion answer — `SPEC.md` line 3 stays at `Version: v1.1.0`; this contract change rolls into the next minor bump.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz suite (`cd viz && npm test`): 59/59 passed (parser 29, tasknote 25, App 5). No regression; the new `_project/tasknote/README.md` doesn't match the `<TASK-ID>.md` pattern, so the parser ignores it as expected.
- [x] Ran lint/type-check on changed code — N/A; doc + skill-prose changes only, no TypeScript/JavaScript touched.
- [x] (frontend) Asked the user for visual confirmation — N/A; not a frontend change.

**Testing Notes:**

Doc + skill prose changes don't have a dedicated linter. Cross-ref consistency verified by `grep -n "Doc-drift sweep\|AI-referenced docs\|Docs touched"` across all 9 touched files: every reference resolves to the canonical `_project/tasknote/README.md` §"AI-referenced docs" anchor. SPEC.md line shift (line 284 = the new checkbox, was line 284 before — 1-for-1 substitution) doesn't move any other anchors. Viz parser depends only on PLAN.md task-line grammar and tasknote frontmatter shape; neither changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Canary run against flowtron-self's seed list (see `_project/tasknote/README.md` §"AI-referenced docs"):
  - `README.md` — **no change.** Public-facing repo overview; doesn't enumerate workflow internals; correctly stays silent on contract changes.
  - `SPEC.md` — **updated.** §"🚀 Phase 4: Closure" first checkbox rewritten to the lean doc-drift-sweep wording (line 284). No other prose touched.
  - `docs/MIGRATION.md` — **updated.** §1.5 extended with one sentence pointing adopters at the new `## AI-referenced docs` template section (caught by the canary itself — the sweep working as designed; without this enumeration step, the MIGRATION.md drift would have shipped silently).
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' paste-block; references SPEC.md but doesn't restate Phase 4 wording or the doc-set convention.

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Tightened flowtron's doc-drift contract end-to-end. (A) `SPEC.md` §"🚀 Phase 4: Closure" first checkbox rewritten as `**Doc-drift sweep** — for each entry in '_project/tasknote/README.md' §"AI-referenced docs", state "no change" or the update`; (B) `SPEC/epic.md` audit-subtask contract gains a fixed acceptance line for the same sweep across the project-declared doc set; (C) `templates/tasknote-README.md` gains the `## AI-referenced docs` section with three seed entries (`README.md`, `CLAUDE.md`, `_project/PLAN.md`), so adopters get the section pre-populated via `/new-project`'s existing `cp` step — no Step 6 logic change. Templates + skill prose updated in lockstep: `templates/tasknote-template.md` Phase 4 first checkbox; `templates/tasknote-micro-template.md` `## ⚡ Notes` gains `**Docs touched:**` bold-prefix; `claude/skills/task/SKILL.md` Step 5 + `claude/skills/micro-task/SKILL.md` Step 3 prose; `claude/skills/new-project/SKILL.md` Step 8 hand-off note. Mid-execution: surfaced that flowtron's own repo had no `_project/tasknote/README.md` (needed for the canary to walk a doc set), user-confirmed the bootstrap, wrote a flowtron-self README declaring `README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md` as flowtron's AI-referenced doc set. Self-host canary at this very Phase 4 caught a drift in `docs/MIGRATION.md` §1.5 (no mention of the new section to extend) — fixed in-flight. Version bump deferred per user choice; this rolls into the next minor.

**Archived:** 2026-05-08
