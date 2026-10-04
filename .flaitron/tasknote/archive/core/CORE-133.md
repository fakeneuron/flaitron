---
title: spec-area-prefix-photard-leak
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: []
---

# CORE-133 | spec-area-prefix-photard-leak

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace the `photard`-specific example on SPEC.md:113 with a stack-neutral placeholder so flowtron's SPEC reads as a generic tool, not a photard-aware one.

## ✅ Acceptance

- [ ] SPEC.md:113 no longer references `photard` or `OCR`
- [ ] Replacement example is clearly stack-neutral

## 🧩 Subtasks

- [ ] Confirm target text at SPEC.md:113
- [ ] Replace with stack-neutral example
- [ ] Run doc-drift sweep and close

## 🔗 Related

- [[CORE-132]] — user-idiosyncrasy audit that surfaced this finding (Finding #1.1)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md:113 still contains `(e.g., \`OCR-\` for photard's OCR pipeline)` — the photard leak is confirmed.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-132.md is the only load-bearing prior file; it surfaced this finding (#1.1) and proposed two neutral wordings: `<project>'s OCR` or `a vision-heavy project's OCR pipeline`. No other archive touched this specific line.
- [x] **Drift check** — SPEC.md:113 matches the task description exactly; no drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Replacement text: `(e.g., \`OCR-\` for a vision-heavy project's OCR pipeline)` — descriptive and stack-neutral. This choice mirrors the CORE-132 suggestion and avoids the less helpful `<project>` angle-bracket placeholder.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sibling fixes (CORE-134 through CORE-140) all do single-line prose edits in-place; same shape here
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — no tests applicable (doc-only change)

**Implementation Notes:**

Changed SPEC.md:113: `for photard's OCR pipeline` → `for a vision-heavy project's OCR pipeline`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no tests applicable (doc-only)
- [x] Ran lint/type-check on changed code — no lint applicable (markdown only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — not applicable

**Testing Notes:**

Doc-only change to SPEC.md:113. Verified replacement text reads correctly in context.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: updated (line 113 `photard's OCR pipeline` → `a vision-heavy project's OCR pipeline`) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-22.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

One-word fix: replaced `photard's OCR pipeline` with `a vision-heavy project's OCR pipeline` in SPEC.md:113. The domain-prefix example now reads as generic adopter guidance rather than a personal-project reference.

**Archived:** 2026-05-22
