---
title: ft-stats-symlink-cleanup
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-143 | ft-stats-symlink-cleanup

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Delete the stray circular symlink directory `claude/skills/ft-stats/ft-stats`, eliminating an untracked git artifact that poses an infinite-loop hazard for recursive scanners.

## ✅ Acceptance

- [ ] `claude/skills/ft-stats/ft-stats` is gone from the filesystem
- [ ] `git status` shows no untracked `ft-stats/ft-stats` entry
- [ ] `ls claude/skills/ft-stats/` contains only expected files (no self-referential subdirectory)

## 🧩 Subtasks

- [ ] Verify the symlink structure (`ls -la claude/skills/ft-stats/`)
- [ ] Remove the stray symlink dir (`rm -rf claude/skills/ft-stats/ft-stats`)
- [ ] Confirm `git status` clean of the artifact

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Artifact confirmed present — `ls -la` shows `claude/skills/ft-stats/ft-stats` is a symlink (created 2026-05-20) pointing to `/Users/fakeneuron/code/flowtron/claude/skills/ft-stats` (lowercase-`c` path alias of the parent dir). Git status confirms it is untracked. Circular reference; `rm -rf` is the correct fix.

- [x] Read relevant source files
- [x] **Archive skim** — 12 archive hits for "ft-stats" in CORE-097.x, CORE-099.1, CORE-113, CORE-138, CORE-141, CORE-142. All are routine mentions of the skill name; none record an intentional creation of the symlink. No load-bearing prior decisions found.
- [x] **Drift check** — `claude/skills/ft-stats/ft-stats` path matches exactly what gitStatus shows (`?? claude/skills/ft-stats/ft-stats`). No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Explicit assumptions: (1) the symlink is purely accidental — likely an `ln -s` gone wrong when the ft-stats skill was set up around 2026-05-20; (2) no code depends on `ft-stats/ft-stats`; (3) `rm -rf` on the symlink itself is safe since it does not follow the link target before deleting.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — pure filesystem delete; no neighboring code pattern applies
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (no code changed)

**Implementation Notes:**

`rm -rf claude/skills/ft-stats/ft-stats` — removed the stray symlink. `claude/skills/ft-stats/` now contains only `SKILL.md`. `git status` shows no untracked `ft-stats/ft-stats` entry.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (filesystem-only change)
- [x] Ran lint/type-check on changed code — N/A (no source files changed)
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend changes)

**Testing Notes:**

Verified post-deletion: `ls claude/skills/ft-stats/` → only `SKILL.md`; `git status` → clean of `ft-stats/ft-stats`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` and tasknote moved to `_project/tasknote/archive/core/CORE-143.md`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Deleted the stray circular symlink `claude/skills/ft-stats/ft-stats` (created 2026-05-20, never tracked by git) that pointed back to its own parent directory via the lowercase-`c` path alias. One `rm -rf` call; no source files changed; git status clean.

**Archived:** 2026-05-23
