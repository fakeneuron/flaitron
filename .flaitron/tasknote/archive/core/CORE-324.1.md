---
title: repo-best-practices-sweep discovery
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-EPIC-324]
---

# CORE-324.1 | repo-best-practices-sweep discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-324]]

## 🎯 Goal

Scope the `CORE-EPIC-324` epic (`repo-best-practices-sweep`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-324.2`..`CORE-324.4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-324.2 .. CORE-324.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-324.5 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (per-child shortname + scope + which layer each touches) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-324.2 .. CORE-324.4; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-324 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-324]] — parent epic

---

## 📝 Phase 1: Discovery

- [ ] Reviewed the task entry in PLAN.md

- [ ] **Relevance Assessment**

  **Verdict:** Proceed | Re-scope | De-scope
  **Rationale:**

- [ ] Read relevant source files

- [ ] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [ ] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [ ] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [ ] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [ ] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [ ] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Archived:** 2026-06-14
