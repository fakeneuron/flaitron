---
title: spec viz stale parenthetical
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: []
---

# CORE-124 | spec viz stale parenthetical

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Rewrite SPEC.md §"What flowtron does NOT provide" to remove the stale "future visualizer would aggregate read-only" parenthetical and reflect the actual shipped boundary: read-only viz aggregation within a project is live; cross-project query API remains out of scope.

## ✅ Acceptance

- [ ] SPEC.md §"What flowtron does NOT provide" no longer references a "future visualizer"
- [ ] The updated bullet correctly identifies cross-project query API (not viz) as out of scope
- [ ] The shipped read-only viz aggregation capability is acknowledged in the clarification

## 🧩 Subtasks

- [x] Rewrite SPEC.md lines 609–611 — update the "Cross-project queries" bullet to name "Cross-project query API" as out of scope and acknowledge the shipped per-project read-only visualizer

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC.md:609–611 still contains "the future visualizer would aggregate read-only" but the viz shipped in CORE-098 (2026-05-16). The stale claim is live in the current codebase.

- [x] Read relevant source files
- [x] **Archive skim** — no prior tasknote explicitly preserved this language; no load-bearing constraints.
- [x] **Drift check** — SPEC.md:609–611 matches description exactly. No drift.
- [x] Asked clarifying questions — No clarifications needed. Assumptions: (1) Bullet subject → "Cross-project query API" (more precise out-of-scope item). (2) Parenthetical updated to acknowledge viz shipped per-project. (3) Write-once archive entries not touched.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No prior decisions found constraining this rewrite.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `- <thing> (<clause>)` bullet shape used by the 4 other bullets in §"What flowtron does NOT provide"; no new pattern needed
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only change)

**Implementation Notes:**

SPEC.md:609–611: "Cross-project queries (each project owns its history; the future visualizer would aggregate read-only)" → "Cross-project query API (each project owns its history; the read-only visualizer is shipped per project — a multi-project query API is not)"

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)
- [x] Ran lint/type-check on changed code — N/A (markdown-only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

No tests applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: updated (lines 609–611, stale parenthetical removed) · MIGRATION.md: no change · CLAUDE-snippet.md: no change · CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-20.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Rewrote SPEC.md §"What flowtron does NOT provide" to remove the stale "future visualizer would aggregate read-only" claim and replace it with an accurate boundary statement: the read-only per-project visualizer is shipped; a multi-project query API remains out of scope.

Technical: 2-line edit to `SPEC.md:609–611` — bullet subject changed from "Cross-project queries" to "Cross-project query API"; parenthetical updated to acknowledge shipped viz and name the true out-of-scope item.

**Archived:** 2026-05-20
