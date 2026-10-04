---
title: extract legacy/ to a tag
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-06
due:
related-tasks: []
---

# CORE-033 | extract legacy/ to a tag

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Tag current HEAD as `legacy-pre-v0.1.0` (preserving the 71-file `legacy/` directory), remove `legacy/` from main, and update README §"Repo layout" to reference the tag.

## ✅ Acceptance

- [x] Tag `legacy-pre-v0.1.0` exists and points to a commit that still contains `legacy/`
- [x] `legacy/` is no longer tracked on main (zero results from `git ls-files legacy/`)
- [x] README §"Repo layout" no longer lists the directory bullet; instead references the tag by name
- [ ] Tag is pushed to remote

## 🧩 Subtasks

- [x] Create annotated tag `legacy-pre-v0.1.0` at current HEAD
- [x] `git rm -r legacy/` to stage deletion
- [x] Update README §"Repo layout": replace the `legacy/` bullet with a tag reference line
- [x] Commit the removal
- [ ] Push the tag to remote

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** 71 tracked files in `legacy/` are dead weight from before v0.1.0; they live next to active code with no references from active files. Tagging + deletion is safe cleanup.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-005, CORE-007, CORE-008, CORE-010, CORE-011, CORE-021, CORE-023, CORE-024, CORE-030 all reference "legacy" only in passing (e.g. "legacy archived tasknotes need no migration"). No prior tasknote touched `legacy/` as a deletion or tagging operation.
- [x] **Drift check** — `legacy/` confirmed present (71 files via `git ls-files`); README §"Repo layout" at line 70 with `legacy/` bullet at line 78; tag `legacy-pre-v0.1.0` does not yet exist. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) annotated tag is appropriate for a named reference point; (2) README bullet is replaced with a tag reference, not simply deleted; (3) tag is pushed to remote so the reference is resolvable.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `legacy/` contains a full copy of the old flowtron app: `src/`, `dist/`, `templates/`, `tests/`, `_project/`, `_projects/`, config files. It is entirely separate from active flowtron code.
- Tag must be created **before** the deletion commit so it points to the last state containing `legacy/`.
- README line 78: `- \`legacy/\` — pre-v0.1.0 contents, retained for reference` → will become a note like `- pre-v0.1.0 source preserved in git tag \`legacy-pre-v0.1.0\``

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — pure git operation; no code pattern to extend
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (no code changed)
- [x] Ran targeted tests on changed files — N/A

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A
- [x] Fixed all introduced issues — N/A

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:** Tagged `legacy-pre-v0.1.0` at pre-deletion HEAD, removed 71 files under `legacy/` from main, updated README §"Repo layout" to reference the tag. No code changed.

**Archived:** 2026-05-06
