---
title: glossary-count-currency
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-235 | glossary-count-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Refresh the stale "~48 entries" glossary count in README.md and docs/GLOSSARY.md to reflect the actual current count (~53).

## ✅ Acceptance

- [ ] README.md count updated to match actual glossary entry count
- [ ] docs/GLOSSARY.md count updated to match actual glossary entry count

## 🧩 Subtasks

- [ ] Count actual entries in docs/GLOSSARY.md
- [ ] Update count string in README.md:20
- [ ] Update count string in docs/GLOSSARY.md:8

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Stale count string in two doc files; straightforward 1-line patch each.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
- README.md:20: `~48 load-bearing terms` confirmed present ✓
- GLOSSARY.md:7 (filed as :8 — 1-line offset; no impact): `~48 entries at initial cut` confirmed present ✓
- Actual entry count: 53 (grep -c '^\\*\\*' confirms exactly 53 bold-headed definitions)
- Archive skim: prior tasknotes reference README.md in passing; none touched the count string — no load-bearing findings
- No clarifications needed. Assumptions: replace `~48` with `~53` in both locations; keep `~` prefix to match existing style.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**
- README.md:20: `~48` → `~53`
- GLOSSARY.md:7: `~48 entries at initial cut` → `~53 entries` (dropped stale "at initial cut" qualifier; the count has grown since the initial filing)
- No tests applicable — doc-only patch.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**
- Doc-only patch; no test suite or lint applicable. No frontend surfaces changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep results:**
- `README.md` — updated: `~48` → `~53` in the GLOSSARY.md doc entry description (line 20)
- All other AI-referenced docs — no change

**Final Summary:**
Refreshed stale "~48 entries" count to "~53" in README.md and docs/GLOSSARY.md to match the actual 53 glossary definitions. Also dropped the now-stale "at initial cut" qualifier from GLOSSARY.md.

**Archived:** 2026-05-30
