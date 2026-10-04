---
title: epic-subtask-stub-checkbox
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-148 | epic-subtask-stub-checkbox

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-057]]

## 🎯 Goal

Fix `- [ ]` → `- [x]` in the closed-subtask stub form examples in ft-epic-discovery/SKILL.md:226 and ft-close-epic/SKILL.md:150, aligning them with the canonical `- [x]` form in SPEC §"`## Completed` archive convention" and ft-task/SKILL.md:133.

## ✅ Acceptance

- [ ] `ft-epic-discovery/SKILL.md:226` stub form example reads `- [x]`
- [ ] `ft-close-epic/SKILL.md:150` stub form example reads `- [x]`
- [ ] No other `- [ ]` stub form examples exist in skill files for completed lines

## 🧩 Subtasks

- [ ] Archive skim for prior tasknotes touching these skill files
- [ ] Drift check — confirm line numbers still match current files
- [ ] Fix `- [ ]` → `- [x]` in ft-epic-discovery/SKILL.md:226
- [ ] Fix `- [ ]` → `- [x]` in ft-close-epic/SKILL.md:150
- [ ] Sweep other skill files for the same pattern (defensive)
- [ ] Phase 3: lint/type-check (markdown only — N/A)
- [ ] Phase 4: doc-drift sweep + closure

## 🔗 Related

- [[CORE-057]] — expand-shipped-skills epic that originally authored ft-epic-discovery and ft-close-epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two skill files contain `- [ ]` in code examples that describe a completed stub form. SPEC §"`## Completed` archive convention" and ft-task/SKILL.md:133 both use `- [x]`. The discrepancy would cause any AI following those examples to write wrong checkbox state. Straightforward two-line fix.

- [x] Read relevant source files
- [x] **Archive skim** — grepped archive/core/ for ft-epic-discovery/SKILL.md and ft-close-epic/SKILL.md; no prior tasknotes specifically touched these files (CORE-057.3/.4 authored them but those tasknotes are about the full skill creation, not this specific bug). No load-bearing prior findings.
- [x] **Drift check** — ft-epic-discovery/SKILL.md:226 and ft-close-epic/SKILL.md:150 confirmed to contain `- [ ]` in the stub form examples as of HEAD. Line numbers match.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: fix only the backtick-enclosed stub form examples (not prose descriptions of the `[ ]`/`[x]` checkbox tokens); a defensive sweep of other skill files for the same pattern is warranted.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- ft-epic-discovery/SKILL.md:226 has: `` `- [ ] **<AREA>-<next-N>.1** ...` `` — should be `- [x]`
- ft-close-epic/SKILL.md:150 has: `` `- [ ] **<AUDIT-SUBTASK-ID>** ...` `` — should be `- [x]`
- SPEC.md:591 canonical: `- [x] **TASK-ID** [model] | shortname — Completed YYYY-MM-DD.`
- ft-task/SKILL.md:133 canonical: `` `[x] **<TASK-ID>** [model] | shortname — Completed YYYY-MM-DD.` ``
- PLAN.md ## Completed section: all entries use `- [x]`

✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SPEC.md:591 and ft-task/SKILL.md:133 are the canonical references; both use `- [x]`. No new shape needed — two-character inline fix per existing pattern.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior (markdown only; N/A)

**Implementation Notes:**

- ft-epic-discovery/SKILL.md:226: `- [ ]` → `- [x]` in the `.1` Discovery stub form example
- ft-close-epic/SKILL.md:150: `- [ ]` → `- [x]` in the audit stub form example
- Defensive sweep confirmed no other occurrences in claude/skills/, SPEC.md, or SPEC/

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code (N/A — markdown only)
- [x] Ran lint/type-check on changed code (N/A — markdown only)
- [x] (frontend) Asked the user for visual confirmation (N/A — no frontend changes)

**Testing Notes:**

Markdown-only changes to two skill files; no runnable test surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive
- [x] Recap drafted

**Final Summary:**

Fixed `- [ ]` → `- [x]` in the closed-subtask stub form examples in ft-epic-discovery/SKILL.md:226 and ft-close-epic/SKILL.md:150, aligning them with the canonical checked form in SPEC §"`## Completed` archive convention". Two-character fix in each file; defensive sweep confirmed no other occurrences.

**Archived:** 2026-05-23
