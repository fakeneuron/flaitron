---
title: template-test-strategy-pointer
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-565.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - templates/tasknote-template.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-568 | template-test-strategy-pointer

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace the verbatim "Choosing a test strategy" blockquote in `templates/tasknote-template.md` with a one-line pointer to `SPEC.md` §"🧪 Phase 3: Testing & Linting".

## ⚡ Notes

**Relevance:** Proceed — the blockquote is still present verbatim in both files at HEAD; nothing has changed since [[CORE-565.2]] filed this row.
**Best Practices Review:** N/A — single-line markdown edit in a scaffold template; no code boundary, no new abstraction.
**Drift check:** `templates/tasknote-template.md` lines 89-95 still carry the exact blockquote text; `SPEC.md` lines 465-471 (§"🧪 Phase 3: Testing & Linting") still carry the source verbatim. No divergence from the PLAN.md line or any SPEC contract.
**Archive skim:** [[CORE-565.2]] (filer, row #34 of its Discovery Notes §B) is the only prior tasknote touching this path; it deferred the edit rather than executing it, describing it exactly as done here. No other archive/core/ tasknote references `tasknote-template.md`'s test-strategy blockquote.
**Declared scope:** `touches: [templates/tasknote-template.md]`.
**Pattern survey:** Extends the existing cite-don't-restate convention already used elsewhere in the templates (e.g. the `SPEC.md §Tasknote frontmatter` pointer comment in the same file's frontmatter block) — no new shape.
**Implementation:** Replaced the 7-line blockquote (`> **Choosing a test strategy (guidance, not a gate).** ...`) with a one-line pointer: `**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".` Verification: `grep -c "Choosing a test strategy" templates/tasknote-template.md` → 1 (pointer only, blockquote body gone); `grep -c "Choosing a test strategy" SPEC.md` → 1 (source untouched).
**Docs touched:** `templates/tasknote-template.md` — deliverable. All other `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — no change (adopter-visible template trim only; no skill, SPEC, or convention doc affected).

## ✅ Recap

Replaced the ~600-char verbatim "Choosing a test strategy" blockquote in `templates/tasknote-template.md` with a one-line pointer to `SPEC.md` §"🧪 Phase 3: Testing & Linting", removing a copy that would otherwise drift from its source on every future SPEC.md Phase 3 edit. `touches:` reconciliation: declared `templates/tasknote-template.md`; `git diff --name-only` (excluding this tasknote) matches exactly. Adopter-visible change — lands with the next release.

**Archived:** 2026-09-11
