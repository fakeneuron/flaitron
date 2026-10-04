---
title: security-md-ai-ref-decision
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: []
---

# CORE-121 | security-md-ai-ref-decision

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Decide whether `SECURITY.md` belongs in `_project/tasknote/README.md` §"AI-referenced docs" and act on the decision — either add it with a one-line purpose or add a note explaining the deliberate exclusion.

## ✅ Acceptance

- [ ] Decision made: `SECURITY.md` is either listed in §"AI-referenced docs" or an explicit exclusion note is present
- [ ] `_project/tasknote/README.md` updated accordingly

## 🧩 Subtasks

- [ ] Read `_project/tasknote/README.md` §"AI-referenced docs" to understand current scope
- [ ] Read `SECURITY.md` to assess its content and AI-relevance
- [ ] Make the include/exclude decision with rationale
- [ ] Edit `_project/tasknote/README.md` to reflect the decision

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `_project/tasknote/README.md` §"AI-referenced docs" does not include `SECURITY.md`. Gap confirmed.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-004/005/006/007/012 match `README.md` (early setup tasks; not load-bearing for this decision). No prior tasknotes touched `SECURITY.md`.
- [x] **Drift check** — Both `_project/tasknote/README.md` and `SECURITY.md` exist at the cited paths. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Decision: **include** `SECURITY.md`. The prompt-injection section directly describes how AI skills interact with user-authored content — genuine cold-start ground truth for anyone running `/ft-task` against contributor PRs. Supply-chain and viz sections are also relevant for bump tasks and viz work. Consistent with the existing inclusion of `CONTRIBUTING.md` (policy doc). One-line purpose: `SECURITY.md` — prompt-injection and supply-chain threat model; informs how skills handle contributor-authored content and submodule bumps.

No clarifications needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing entries follow `- \`file\` — short purpose` shape; appended after `CONTRIBUTING.md` (thematic grouping with other policy docs)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Added `- \`SECURITY.md\` — prompt-injection and supply-chain threat model; informs how skills handle contributor-authored content and submodule bumps` to `_project/tasknote/README.md` §"AI-referenced docs" after `CONTRIBUTING.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only change to `_project/tasknote/README.md`. No test suite or lint applies. No frontend changes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/CLAUDE-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` newly added (this task's deliverable)
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Added `SECURITY.md` to `_project/tasknote/README.md` §"AI-referenced docs" with a one-line purpose. 1 file changed, 1 line added.

**Archived:** 2026-05-20
