---
title: readme-viz-example-projectname
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: [CORE-132]
---

# CORE-135 | readme-viz-example-projectname

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-132]]

## 🎯 Goal

Replace the `project-14` directory-name example in README.md:54 with a generic placeholder so adopters don't encounter Project-17/project-14 project names in the docs.

## ✅ Acceptance

- [ ] README.md:54 uses a generic placeholder (e.g. `myproject`) instead of `project-14`
- [ ] No other `project-14` references in README.md

## 🧩 Subtasks

- [ ] Confirm scope: verify line 54 is the only README.md `project-14` hit
- [ ] Apply single-word substitution `project-14` → `myproject`
- [ ] Doc-drift sweep and closure

## 🔗 Related

- [[CORE-132]] — audit that surfaced this finding (Finding #1.3, Low)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** README.md:54 confirmed to still contain `project-14`. Exact match to CORE-132 Finding #1.3. Single-word substitution; no scope drift.

- [x] Read relevant source files — README.md:48–57 read; one `project-14` occurrence at line 54 in the viz-scanner description.
- [x] **Archive skim** — CORE-132 is the origin of this finding; no prior tasknote independently edited README.md:54 for this purpose. No load-bearing precedents.
- [x] **Drift check** — README.md:54 still reads `"the directory name (e.g., \`project-14\`) becomes the project label"`. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. PLAN.md line and CORE-132 both suggest `myproject` as the replacement. Only one `project-14` occurrence in README.md. Assumption: use `myproject` per the task description's parenthetical.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-133 and CORE-134 are the direct siblings; same inline replacement shape.
- [x] Implemented the minimal solution — README.md:54 `project-14` → `myproject`.
- [x] Updated/added tests for non-trivial behavior — doc-only change; no tests applicable.

**Implementation Notes:**

Single-word substitution in README.md:54. No cascading changes needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — doc-only; no tests applicable.
- [x] Ran lint/type-check on changed code — doc-only; no lint applicable.
- [x] (frontend) Asked the user for visual confirmation — no frontend change.

**Testing Notes:**

Verified with `grep -n "project-14" README.md` — zero hits. `myproject` confirmed at line 54.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: updated (project-14→myproject). SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-22.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Replaced the single `project-14` example in README.md:54 with `myproject`, eliminating the only personal-project name leak in the public repo front door. One-line doc change; no code or contract impact.

**Archived:** 2026-05-22
