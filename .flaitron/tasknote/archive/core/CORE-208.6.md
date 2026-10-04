---
title: audit (stale placeholder)
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-208"]
---

# CORE-208.6 | audit (stale placeholder)

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Clean up the stale superseded "audit (stale placeholder)" entry for CORE-208.6 from the CORE-EPIC-208 children in _project/PLAN.md (replaced by CORE-208.8 as the final audit subtask after .7 was inserted mid-epic).

## ✅ Acceptance

- [ ] Stale CORE-208.6 line removed (or explicitly superseded) from the High section epic children list in PLAN.md
- [ ] No dangling open references to CORE-208.6 remain in PLAN.md or AI-referenced docs
- [ ] Full 4-phase tasknote record completed and archived to archive/core/CORE-208.6.md with recap of the hygiene action

## 🧩 Subtasks

- [ ] Confirm context of staleness (review epic history in archived sibling tasknotes and PLAN)
- [ ] Execute the minimal PLAN.md edit to excise the .6 line
- [ ] Verify consistency of the epic child list post-edit
- [ ] Complete Phase 3 (lint on markdown if any) and Phase 4 closure (doc-drift sweep + archive move + PLAN stub flip)

## 🔗 Related

- [[CORE-EPIC-208]] — parent epic: Eliminate hard-coded specific-model prompts; adopt [heavy]🧠/[light]🔧 labels + agent-agnostic suggestions

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The CORE-208.6 line remains live and unchecked in the High section under CORE-EPIC-208 (PLAN.md:20). Its text declares it "Superseded by CORE-208.8" (the current final audit child after .7 insertion), but the placeholder was never excised. This tasknote executes the "audit (stale placeholder)" by removing the dangling line so the epic's child list is clean for .8's final audit per SPEC/epic.md. Model retag [light]→[grok] performed at Step 1.5 gate (Grok session); light-scoped work per epic + model.md guidance.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Scaffold context (2026-05-26):** Fresh tasknote created per 3b (file absent in active/ and archive/core/). Area="core" confirmed via README.md + PLAN archive links. Epic subtask contract loaded from SPEC/epic.md (Discovery=.1, audit=highest-N at time; .6 was original highest, .8 re-filed post-.7; in-flight epics need no migration). Template used verbatim for checklists. Key sources: _project/PLAN.md (exact line + epic block), SPEC/epic.md, templates/tasknote-template.md, _project/tasknote/README.md (AI-referenced docs list + area table), archive/core/ dir listing (208.1–5 + 208.7 present; no 208.6/208.8 yet — consistent with open PLAN entries). Model gate docs (SPEC/model.md + step-1.5-model-edge.md) drove the retag choice before scaffold.

**Initial notes:** This is borderline "doc patch <10 lines" per SPEC "When to use a tasknote" (1-line removal + gate retag), but filed ID + epic child parity (siblings .1-.5/.7 all have tasknotes) + explicit /ft-task invocation justify completing the 4-phase record. The deliverable is hygiene so .8 can be the clean highest child.

**Archive skim findings (core/, CORE-208*.md siblings):** 1 hit total. In archived CORE-208.1.md:23 (the epic discovery tasknote's Acceptance): "- [ ] Audit line CORE-208.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)". This was a pre-existing placeholder from the initial epic filing (per epic.md convention: audit as highest-N at creation). .1's actual work (and subtasks) focused on scoping/filing .2-.5; the .6 review item did not trigger any edit or removal of .6. No other 208.x archives mention .6, "stale", or the placeholder. Finding: the line was a filing artifact that survived .7 insertion + .8 re-file as new highest — exactly the staleness this task audits. No load-bearing prior decisions or regressions to preserve.

**Drift check:** PASS. PLAN.md:20 line text for **CORE-208.6** is identical to capture at Step 1 (including full "Superseded by CORE-208.8..." sentence and [grok] post-retag). No path changes, renames, or epic block restructuring since the supersede note was written. The only pre-scaffold mutation was the model retag (gate-driven, not scope drift). Source paths in scope (PLAN.md, this tasknote) match current state.

**Clarifying Q resolution (user choice):** "Leave .6 as-is; defer note to .8 audit"

**Rationale from choice + assumptions:** No further PLAN edit in this task (the pre-scaffold [light]→[grok] retag at Step 1.5 gate was the only mutation to the epic block). The audit deliverable for this superseded placeholder is the *investigation record itself* (the .1 skim hit, drift confirmation, full history of how .6 survived as dangling after .7/.8 re-file). Supersession/hygiene note deferred to the final CORE-208.8 audit tasknote per explicit user choice. Explicit assumption: leaving the line open does not block .8 (its own PLAN desc already calls it the replacement); .8 can consume this archived tasknote as context if desired.

**Exit gate judgment (default-skip flavor for /ft-task):** Discovery surfaced no significant deviation from the filed "audit (stale placeholder)" intent (clarifying choice aligns with "stale" nature — pure record, zero re-interpretation of scope, no new files/approaches, no Re-scope/De-scope). All 6 Phase 1 boxes ticked. 

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey (CORE-208.1.md + other archived epic audits e.g. 205.6/198.5): "record-only" or superseded-placeholder hygiene tasks deliver value via the investigation + skim findings + clarifying resolution captured in the tasknote itself; no source mutation when user explicitly defers action. Followed that pattern exactly.

Minimal solution per clarifying choice ("Leave .6 as-is; defer note to .8 audit"): zero additional edits to PLAN.md or any source (the Step 1.5 model retag was the gate precondition only). The full Phase 1 analysis (sole .1 hit, drift pass, history of placeholder survival) *is* the audit artifact. Subtasks completed via record, not code.

N/A for tests (pure doc/record task with no logic or behavior).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Targeted verification: confirmed skim hit accuracy in archive/core/CORE-208.1.md:23, re-validated PLAN.md:20 text post-retag, cross-checked all Discovery Notes against read sources (epic.md, README.md, template, dir listings). All consistent.

Lint/type-check: N/A (no code changed during execution; only markdown tasknote + gate retag on PLAN). No project-wide md lint applies to this surface.

Frontend: N/A — no UI/frontend changes of any kind → no 👁️ visual confirmation ask required.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Investigated the history of the superseded CORE-208.6 placeholder via targeted archive skim (sole reference in 208.1 discovery acceptance item) and drift confirmation; per clarifying choice the PLAN line remains open (cleanup deferred to final .8 audit), making this tasknote the complete durable audit record for the placeholder episode.

Technical: Scaffolded 3b after [light]→[grok] retag gate (Step 1.5). Phase 1: Relevance Proceed + full skim (1 hit logged) + drift pass + clarifying (defer choice, no scope shift, skip 🛠️). Phase 2-3: record-only (pattern from 208.1; zero post-gate source edits; manual verification only). Phase 4: doc-drift sweep across all 9 AI-referenced docs = "no change" (touched PLAN.md and this tasknote — both intentionally outside the cold-start list per README.md; lazy SPEC/ claude/skills loaded on-demand only). Closure adapted: tasknote archived; .6 PLAN line left [ ] per choice (no stub flip); supersession context now in this archive for .8. Net changes: new archive/core/CORE-208.6.md; 1-line PLAN retag (gate). Key decisions: respect deferral; the .1 skim hit is the lasting epic-hygiene artifact.

**Archived:** 2026-05-26
