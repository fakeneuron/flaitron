---
title: legacy-dir-rm
status: completed
tags: []
created: 2026-05-19
due:
related-tasks: [CORE-033]
---

# CORE-117 | legacy-dir-rm

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-033]]

## 🎯 Goal

Remove the orphaned `legacy/` directory from the working tree after confirming the `legacy-pre-v0.1.0` git tag is present locally and pushed to remote.

## ✅ Acceptance

- [ ] `legacy-pre-v0.1.0` tag confirmed present locally
- [ ] `legacy-pre-v0.1.0` tag confirmed pushed to remote
- [ ] `legacy/` directory deleted from working tree
- [ ] Working tree is clean (no untracked legacy/ remnants)

## 🧩 Subtasks

- [x] Confirm `legacy-pre-v0.1.0` tag exists locally (done in Discovery)
- [x] Push `legacy-pre-v0.1.0` tag to remote (`git push origin legacy-pre-v0.1.0`)
- [x] Verify tag visible on remote (`git ls-remote --tags origin legacy-pre-v0.1.0`)
- [x] Delete `legacy/` from local disk (`rm -rf legacy/`)
- [x] Verify working tree is clean (no legacy/ remnants)

## 🔗 Related

- [[CORE-033]] — extracted `legacy/` contents to `legacy-pre-v0.1.0` git tag on 2026-05-06

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `legacy/` (204KB) is confirmed present on disk and untracked — pure cruft. Tag `legacy-pre-v0.1.0` exists locally and preserves the content. Deletion is safe.

- [x] Read relevant source files
- [x] **Archive skim** — read CORE-033 (the tasknote that created the tag and removed `legacy/` from git). Key finding: CORE-033 left "Push the tag to remote" as an **unchecked subtask**. The tag is not at the remote (`git ls-remote --tags origin legacy-pre-v0.1.0` returned empty). Pushing the tag is a prerequisite for this task.
- [x] **Drift check** — `legacy/` is confirmed present on disk (204KB: `_project/`, `_projects/`, `dist/`, `tsconfig.tsbuildinfo`). Tag exists locally. Remote tag absent (drift from task description's "confirming the tag … pushed" assumption — CORE-033 never completed that step). Path is clear: push tag, then delete directory.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `legacy/` is untracked by git (CORE-033 ran `git rm -r legacy/` but left the physical files on disk). Deleting it is a local-disk-only operation — no git commit needed for the deletion itself.
- `legacy-pre-v0.1.0` tag exists locally (`git tag -l` confirmed). Points to the pre-deletion HEAD containing the 71 `legacy/` files.
- Tag is NOT at remote — CORE-033 archived with "Push the tag to remote" unchecked. Must push before deletion to ensure the preservation promise in the README holds.
- The commit for this task will only touch: `_project/PLAN.md` (stub flip) and the archived tasknote — no `legacy/` files appear in the diff (they're untracked).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — pure git/filesystem operation; no code pattern to extend
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A

**Implementation Notes:**

Pushed `legacy-pre-v0.1.0` to remote (`c2ce8dc` → `refs/tags/legacy-pre-v0.1.0`), completing CORE-033's skipped step. Deleted untracked `legacy/` directory (204KB). Git working tree unchanged (directory was untracked).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changed)
- [x] Ran lint/type-check on changed code — N/A
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change (tag reference already present from CORE-033); SPEC.md, MIGRATION.md, CLAUDE-snippet.md, CONVENTIONS.md, CONTRIBUTING.md: no change
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Pushed `legacy-pre-v0.1.0` tag to remote (completing CORE-033's skipped step) and deleted the untracked 204KB `legacy/` directory from the working tree. No git diff changes — `legacy/` was already untracked.

**Archived:** 2026-05-19
