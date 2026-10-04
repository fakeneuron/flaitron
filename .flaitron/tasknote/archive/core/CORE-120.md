---
title: plan-md-critical-heading-cleanup
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: [FE-044]
---

# CORE-120 | plan-md-critical-heading-cleanup

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[FE-044]]

## 🎯 Goal

Remove the legacy `## Critical` heading from `_project/PLAN.md` and add `(none)` placeholders under the empty `## High` and `## Low` sections to align the flowtron-self canonical PLAN with the critical-as-flag model.

## ✅ Acceptance

- [ ] `## Critical` section removed from `_project/PLAN.md`
- [ ] `## High` section has `(none)` placeholder
- [ ] `## Low` section has `(none)` placeholder
- [ ] No other sections touched

## 🧩 Subtasks

- [x] Remove the `## Critical\n\n(none)` block (lines 12-14) from `_project/PLAN.md`
- [x] Add `(none)` placeholder under empty `## High` in `_project/PLAN.md`
- [x] Add `(none)` placeholder under empty `## Low` in `_project/PLAN.md`

## 🔗 Related

- [[FE-044]] — critical-as-flag migration (predecessor that introduced the model this task aligns to)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `_project/PLAN.md` lines 12-14 contain the legacy `## Critical\n\n(none)` block. `## High` (line 16) and `## Low` (line 25) are both empty without `(none)` placeholders. All three conditions match the description exactly.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-078 (`plan-none-placeholder`) is the load-bearing precedent: added `(none)` under `## Medium` (same pattern). `templates/PLAN.md` has no `## Critical` section — the canonical post-FE-044 shape starts directly at `## High`.
- [x] **Drift check** — `_project/PLAN.md` has `## Critical` at line 12 (confirmed), `## High` at line 16 empty (confirmed), `## Low` at line 25 empty (confirmed). No drift; description matches current file.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. `templates/PLAN.md` is the authoritative target shape — no `## Critical` section, `(none)` under every empty section. CORE-078 established the `(none)` placeholder convention for `_project/PLAN.md` itself.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-078 established the `(none)` insertion pattern for `_project/PLAN.md`; extending that same shape, no new pattern needed.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Removed `## Critical\n\n(none)` block and added `(none)` under `## High` and `## Low`. Three targeted edits to `_project/PLAN.md`; no other files touched. No tests apply (markdown-only change).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only edit; no test suite or lint target applies. No frontend changes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 6 AI-referenced docs: no change (only `_project/PLAN.md` touched, not in the doc set)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-20.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Removed the legacy `## Critical\n\n(none)` block and added `(none)` placeholders under `## High` and `## Low` in `_project/PLAN.md`. Three targeted edits; no other files touched.

**Archived:** 2026-05-20
