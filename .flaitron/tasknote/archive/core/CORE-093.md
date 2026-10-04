---
title: SPEC tasknote-template claim trim
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: []
---

# CORE-093 | SPEC tasknote-template claim trim

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the "with field comments" claim from `SPEC.md` since `templates/tasknote-template.md` carries none, eliminating the reader mismatch when following SPEC → template.

## ✅ Acceptance

- [ ] `SPEC.md` §"Tasknote frontmatter" no longer contains the phrase "with field comments"
- [ ] The sentence reads naturally without the dropped phrase

## 🧩 Subtasks

- [ ] Remove "(with field comments)" from the sentence in `SPEC.md` §"Tasknote frontmatter"

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:163` contains "The canonical schema (with field comments) lives in `templates/tasknote-template.md`." The template carries no field comments — confirmed by reading it. Single-word group removal, no re-scope needed.

- [x] Read relevant source files
- [x] **Archive skim** — no prior tasknotes with "field comments" in core archive; nothing load-bearing.
- [x] **Drift check** — claim confirmed present in SPEC.md at lines 163-164; template confirmed to carry no comments. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `SPEC.md:163-164`: "The canonical schema (with field comments) lives in `templates/tasknote-template.md`." — "with field comments" is the only change target.
- `templates/tasknote-template.md` frontmatter block has no comments (bare YAML fields only).
- Fix: drop " (with field comments)" from the sentence → "The canonical schema lives in `templates/tasknote-template.md`."
- No clarifications needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — prose-only doc fix; plain Edit, no new shape needed
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Removed " (with field comments)" from `SPEC.md:163-164`. Sentence now reads: "The canonical schema lives in `templates/tasknote-template.md`."

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure markdown doc change — no tests, lint, or frontend verification applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: removed "(with field comments)" from §"Tasknote frontmatter" · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Removed the stale "(with field comments)" parenthetical from `SPEC.md` §"Tasknote frontmatter". The template carries no field comments; the old wording set a false expectation for readers following SPEC → template.

**Archived:** 2026-05-14
