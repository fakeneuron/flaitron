---
title: spec-tasklinegrammar-invisipaw-leak
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: []
---

# CORE-134 | spec-tasklinegrammar-invisipaw-leak

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-132]]

## 🎯 Goal

Replace the "InvisiPaw migration" examples at SPEC.md:151,154 with stack-neutral migration examples so the task-line-grammar section reads as generic adopter documentation.

## ✅ Acceptance

- [ ] SPEC.md:151 no longer references InvisiPaw
- [ ] SPEC.md:154 no longer references InvisiPaw
- [ ] Replacement examples are clearly stack-neutral and illustrate the same grammar concepts (model-only with no shortname; legacy no-model form)

## 🧩 Subtasks

- [ ] Confirm target text at SPEC.md:151,154
- [ ] Replace both lines with stack-neutral equivalents
- [ ] Run doc-drift sweep and close

## 🔗 Related

- [[CORE-132]] — user-idiosyncrasy audit that surfaced this finding (Finding #1.2)
- [[CORE-133]] — sibling fix (photard OCR example, same section)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md:151,154 both still read "InvisiPaw migration" — confirmed leak.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-132 surfaced this finding (#1.2). CORE-133 is the immediately prior sibling fix (photard OCR, same grammar-examples block); its pattern (plain in-place replacement, same line shape) applies directly here. No other archive file is load-bearing.
- [x] **Drift check** — SPEC.md:151,154 match the task description exactly; no drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Current lines:
- 151: `- [ ] **CORE-016** [sonnet] — Execute InvisiPaw migration per CORE-008 playbook.`
- 154: `- [ ] **CORE-016** — Execute InvisiPaw migration per CORE-008 playbook.    (legacy)`

Both rows illustrate "no shortname" forms — line 151 with a `[model]` tag, line 154 as the legacy no-model variant. The replacement only needs to keep the grammar shape intact; the description content is illustrative. Replacing "InvisiPaw migration" with "project adoption" keeps it generic without losing the instructional shape.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-133 (same grammar-examples block) is the direct precedent; plain in-place replacement, same shape
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — no tests applicable (doc-only)

**Implementation Notes:**

SPEC.md:151,154: `Execute InvisiPaw migration per CORE-008 playbook.` → `Execute project adoption per CORE-008 playbook.` (both the `[sonnet]` form and the legacy no-model form).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no tests applicable (doc-only)
- [x] Ran lint/type-check on changed code — no lint applicable (markdown only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — not applicable

**Testing Notes:**

Doc-only change to SPEC.md:151,154. Verified replacement text reads correctly in context.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: updated (lines 151,154 `InvisiPaw migration` → `project adoption`) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-22.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Two-word fix: replaced `InvisiPaw migration` with `project adoption` in both SPEC.md:151 (model-tagged form) and SPEC.md:154 (legacy no-model form). The task-line-grammar examples in the `## Task-line format` section now read as generic adopter documentation.

**Archived:** 2026-05-22
