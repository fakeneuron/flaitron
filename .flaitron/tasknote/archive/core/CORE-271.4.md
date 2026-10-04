---
title: per-agent-wrappers
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271]
---

# CORE-271.4 | per-agent-wrappers

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]]

## 🎯 Goal

Create thin pointer stubs `grok/procedures/ft-task.md` and `codex/procedures/ft-task.md` that route contract-only agents to the agent-neutral SOP; scaffold the minimal `grok/` and `codex/` sibling wiring dirs per the PLATFORMS.md plug-in pattern.

## ✅ Acceptance

- [ ] `grok/procedures/ft-task.md` exists as a thin pointer to `SPEC/procedures/ft-task.md`
- [ ] `codex/procedures/ft-task.md` exists as a thin pointer to `SPEC/procedures/ft-task.md`
- [ ] Both files are minimal (route, don't copy — no step content)
- [ ] Relative paths to SOP resolve correctly from each platform subdir
- [ ] Phase 4 doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [x] Phase 1 Discovery complete
- [x] Create `grok/procedures/ft-task.md` pointer stub
- [x] Create `codex/procedures/ft-task.md` pointer stub
- [x] Phase 3 + Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-271]] — parent epic (cross-agent-skill-projection)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC/procedures/ft-task.md landed in CORE-271.3 (HEAD). Both `grok/` and `codex/` dirs are absent — creating them with their `procedures/` subdirs and pointer stubs is the complete scope of this task. No blockers.

- [x] Read relevant source files — `SPEC/procedures/ft-task.md` (the SOP being pointed at), `SPEC/procedures/README.md` (loading convention: wrapper routes to SOP, doesn't restate), `docs/PLATFORMS.md` (plug-in pattern: sibling top-level dir, naming conventions, hard constraints), `CORE-271.3` archive (scope boundary: .4 = wrappers only; .5 = doc updates).

- [x] **Archive skim** — CORE-271.3: scope boundary confirmed (wrappers are .4; doc updates are .5); pointer wrapper format implied by README §"Loading convention" ("points; it does not restate the steps"). CORE-271.2: `SPEC/procedures/` schema established. No prior tasknote created `grok/` or `codex/` dirs.

- [x] **Drift check** — `grok/`: absent (new, expected ✓); `codex/`: absent (new, expected ✓); `SPEC/procedures/ft-task.md`: present (the target SOP) ✓; `SPEC/procedures/README.md`: present, loading convention clear ✓. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Explicit assumptions: (1) minimal scaffold = just `procedures/` subdir + pointer stub per platform (no AGENTS-snippet.md, commands/, or skills/ — those are future wiring contributions, not in scope here); (2) wrapper content is a short redirect instruction only — no step content copied; (3) relative path from `<platform>/procedures/ft-task.md` to `SPEC/procedures/ft-task.md` is `../../SPEC/procedures/ft-task.md`; (4) scope boundary held: no doc updates (that's .5).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Wrapper shape per README §"Loading convention": "the per-platform wrapper `<platform>/procedures/<procedure>.md` routes the agent here rather than copying the steps." Content = one trigger instruction + one `[load this]` link. Minimal and clear.

Relative path check: `grok/procedures/ft-task.md` → `../../` = repo root → `../../SPEC/procedures/ft-task.md` ✓. Same for `codex/procedures/ft-task.md` ✓.

Discovery surfaced no significant deviation → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no existing `grok/` or `codex/` platform dirs; first instance of the `<platform>/procedures/` shape. Format derived directly from SPEC/procedures/README.md §"Loading convention": wrapper points to SOP, doesn't restate steps.

- [x] Implemented the minimal solution — `grok/procedures/ft-task.md` and `codex/procedures/ft-task.md` created as thin pointer stubs.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown files only)

**Implementation Notes:**

Created two identical-shape pointer files. Each contains: a header identifying the platform, one trigger instruction, a relative-path link to `../../SPEC/procedures/ft-task.md`, and the routing declaration. Relative paths verified correct from each location.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)

- [x] Ran lint/type-check on changed code — N/A (markdown only)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend changes)

**Testing Notes:**

Verified both dirs created (`grok/procedures/ft-task.md`, `codex/procedures/ft-task.md`). Relative paths from each stub to `SPEC/procedures/ft-task.md` (two dirs up) confirmed correct.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: no change. PLATFORMS.md / AGENT-COMPAT.md doc updates deferred to CORE-271.5 (that's its scope).

- [x] Closed — PLAN.md line flipped to stub `Completed 2026-06-02.` and tasknote archived.

- [x] Recap drafted

**Final Summary:**

Created `grok/procedures/ft-task.md` and `codex/procedures/ft-task.md` as thin pointer stubs routing contract-only agents to `SPEC/procedures/ft-task.md`. Scaffolded the minimal `grok/` and `codex/` sibling wiring dirs (each with a `procedures/` subdir) per the PLATFORMS.md plug-in pattern.

**Archived:** 2026-06-02
