---
title: ft-flowtron key-docs security
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: []
---

# CORE-127 | ft-flowtron key-docs security

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a `SECURITY.md` bullet to the `## Key docs` list in `claude/skills/ft-flowtron/SKILL.md` so the info screen surfaces the security doc alongside the rest of the key project docs.

## ✅ Acceptance

- [x] `claude/skills/ft-flowtron/SKILL.md` §"Key docs" includes a `SECURITY.md` bullet with an accurate one-liner
- [x] The bullet is ordered consistently with its siblings

## 🧩 Subtasks

- [x] Add `SECURITY.md` bullet to `## Key docs` in `claude/skills/ft-flowtron/SKILL.md` (after `CONTRIBUTING.md`)
- [x] Verify the one-liner description matches `SECURITY.md` content

## 🔗 Related

_(none)_

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SECURITY.md` exists (added CORE-121, 2026-05-20); `## Key docs` in `claude/skills/ft-flowtron/SKILL.md` does not list it. Straightforward one-line addition.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-111 (ft-flowtron self-listing) and CORE-107 (template-list trim) are the prior hits on `ft-flowtron/SKILL.md`. Neither touched the `## Key docs` section. No load-bearing decisions found.
- [x] **Drift check** — `claude/skills/ft-flowtron/SKILL.md:62-70` Key docs block confirmed present and current. `SECURITY.md` exists at repo root. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  - No clarifications needed. Assumptions: bullet goes after `CONTRIBUTING.md`, one-liner describes threat model + vulnerability reporting.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `SECURITY.md` covers: vulnerability reporting, prompt-injection threat model, submodule supply-chain trust, visualizer dev-server scope.
- Current Key docs list ends with `CONTRIBUTING.md` then `templates/`. `SECURITY.md` fits after `CONTRIBUTING.md` as a project-health doc.
- File path: `claude/skills/ft-flowtron/SKILL.md`, Key docs section lines 62–70.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `## Key docs` uses a flat bullet list: `` - `filename` — one-liner ``. Extended the existing pattern with a consistent entry.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown change)

**Implementation Notes:**

Added one bullet after `CONTRIBUTING.md` in `claude/skills/ft-flowtron/SKILL.md`:
```
- `SECURITY.md` — threat model (prompt injection, submodule supply-chain trust, viz dev-server scope) and vulnerability reporting
```

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown skill file)
- [x] Ran lint/type-check on changed code — N/A (markdown)
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:**

No test suite or linter applies to markdown skill files.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 7 AI-referenced docs: no change needed. The changed file (`claude/skills/ft-flowtron/SKILL.md`) is a skill loaded on demand, not in the cold-start sweep.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-20.` and tasknote moved to `_project/tasknote/archive/core/CORE-127.md`
- [x] Recap drafted (inline — skip branch)

**Final Summary:**

Added `SECURITY.md` bullet to `## Key docs` in `claude/skills/ft-flowtron/SKILL.md`. The `/ft-flowtron` info screen now lists the security doc (threat model + vulnerability reporting) alongside its existing key-docs siblings. One-line edit; no logic or structure changes.

**Archived:** 2026-05-20
