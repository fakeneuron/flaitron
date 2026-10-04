---
title: flowtron self-host skill wiring
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: [CORE-129]
---

# CORE-130 | flowtron self-host skill wiring

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-129]]

## 🎯 Goal

Add the missing `.claude/` symlinks for `ft-starter-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, and `ft-close-epic` (commands + skills) so these are reachable from the slash menu in flowtron's own checkout.

## ✅ Acceptance

- [ ] All five skills reachable via `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic` in flowtron's self-host
- [ ] Symlinks follow the same pattern used by existing wired skills

## 🧩 Subtasks

- [x] Create 5 skill symlinks in `.claude/skills/` (ft-starter-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic)
- [x] Create 5 command symlinks in `.claude/commands/` (same five, `.md` suffix)
- [x] Verify all 10 symlinks resolve to valid source paths

## 🔗 Related

- [[CORE-129]] — predecessor; filing this task exposed the wiring gap

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gap confirmed. `.claude/skills/` has only `ft-audit` (forked), `ft-audit-docs` (forked), `ft-flowtron` (symlink), `ft-task` (symlink). The five filing skills are absent from both `skills/` and `commands/`. All five source dirs/files exist in `claude/skills/` and `claude/commands/`.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-104 (namespace sweep) confirmed when self-host `.claude/` was last rewired: forked audits renamed + task/flowtron symlinks re-pointed. The five filing skills were never added. CORE-129 (AGENTS.md migration, immediate predecessor) touched audit-family forks and bundled skills but not the self-host symlink list — that omission is this task's root cause.
- [x] **Drift check** — `.claude/skills/` and `.claude/commands/` inspected directly; description is accurate. `claude/skills/ft-starter-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic` all exist. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Symlink pattern follows existing `ft-flowtron`/`ft-task`: relative path `../../claude/skills/<name>` and `../../claude/commands/<name>.md`. Task scope is exactly 10 symlinks.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Existing skill symlinks use relative paths (e.g., `ft-task -> ../../claude/skills/ft-task`); new symlinks follow the same form.
- `ft-audit`/`ft-audit-docs` are forked copies, not symlinks, because they're customizable per-project. The five filing skills are not forkable — symlinks are correct.
- Global `~/.claude/` does not have these five skills either, so this fix only affects the self-host `.claude/` tree.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing `ft-flowtron`/`ft-task` symlinks use `../../claude/skills/<name>` / `../../claude/commands/<name>.md`; extended that exact shape, no new pattern.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (symlink-only change; no code or test surface)

**Implementation Notes:**

Created 10 symlinks following the existing relative-path convention. No files modified.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code change)
- [x] Ran lint/type-check on changed code — N/A (symlinks only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend change)

**Testing Notes:**

All 10 `readlink` targets verified. All five skills visible in the slash-menu skill list immediately after creation (system-reminder confirmed `ft-starter-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic` appearing).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 7 AI-referenced docs: no change. Task added symlinks only; no documentation surface affected.
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive
- [x] Recap drafted

**Final Summary:**

Added 10 symlinks to flowtron's self-host `.claude/` (5 skills + 5 commands) for `ft-starter-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, and `ft-close-epic`, following the existing relative-path pattern. All five are now reachable from the slash menu in the flowtron self-host checkout.

**Archived:** 2026-05-22
