---
title: readme-doc-index
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-234 | readme-doc-index

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add docs/AGENT-COMPAT.md (and optionally docs/WORKTREES.md) to README.md §"Documents" so the index reflects all shipped docs.

## ✅ Acceptance

- [ ] `docs/AGENT-COMPAT.md` appears in README.md §"Documents"
- [ ] `docs/WORKTREES.md` appears in README.md §"Documents" (if it exists)
- [ ] No other documents section entries are stale or missing

## 🧩 Subtasks

- [x] Read README.md §"Documents" to understand current state
- [x] Read docs/ to confirm which files exist
- [x] Add AGENT-COMPAT.md entry to README.md §"Documents" (after PLATFORMS.md)
- [x] Add WORKTREES.md entry to README.md §"Documents" (after AGENT-COMPAT.md)

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `docs/AGENT-COMPAT.md` and `docs/WORKTREES.md` both exist in docs/ but neither appears in README.md §"Documents". Straightforward additive doc-index patch.

- [x] Read relevant source files — README.md §"Documents", docs/ listing, first 30 lines of AGENT-COMPAT.md and WORKTREES.md for accurate description text

- [x] **Archive skim** — CORE-224.4 confirms AGENT-COMPAT.md was created/updated during the agent-compatibility epic but README.md received "no change" at closure. CORE-215.2 confirms WORKTREES.md was created during the worktree-convention epic but README.md also received "no change". Both gaps are independently confirmed; no conflicting prior decisions.

- [x] **Drift check** — `docs/AGENT-COMPAT.md` and `docs/WORKTREES.md` confirmed present. README.md §"Documents" confirmed to list neither. PLAN.md description matches observed state.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  - No clarifications needed. WORKTREES.md exists so no optionality — add both. Placement: AGENT-COMPAT.md after PLATFORMS.md (agent/multi-platform cluster), WORKTREES.md after AGENT-COMPAT.md.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
- Both files were created in prior epics but their respective closure doc-drift sweeps marked README.md "no change" (the sweeps check AI-referenced docs only, not the README §"Documents" index — the gap is a known blind spot in the audit-docs pass that surfaced it).
- Placement decision: AGENT-COMPAT.md pairs naturally with AGENT-NEUTRALITY.md + PLATFORMS.md (all three are agent/multi-platform surface docs); WORKTREES.md follows as a convention doc before CONTRIBUTING.md/SECURITY.md.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing §"Documents" bullet items use the same `- [link](path) — short wrapped description` shape; extending identically

- [x] Implemented the minimal solution — added two bullet entries to README.md §"Documents" after PLATFORMS.md

- [x] Updated/added tests for non-trivial behavior — doc-only change; no tests applicable

**Implementation Notes:**
- Added `docs/AGENT-COMPAT.md` and `docs/WORKTREES.md` entries to README.md §"Documents" lines 33-39 (after PLATFORMS.md, before CONTRIBUTING.md).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — doc-only; no test suite applies

- [x] Ran lint/type-check on changed code — markdown only; no lint tooling in repo

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — no frontend surface

**Testing Notes:**
- Verified the two new entries render correctly in context (markdown lint passed visually; link targets exist at `docs/AGENT-COMPAT.md` and `docs/WORKTREES.md`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: updated (two new §"Documents" entries). All other AI-referenced docs: no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**
Added `docs/AGENT-COMPAT.md` and `docs/WORKTREES.md` to README.md §"Documents". Both docs were created in prior epics (CORE-EPIC-224 and CORE-EPIC-215 respectively) but their closure sweeps only checked AI-referenced docs, leaving the public README index stale.

**Archived:** 2026-05-30
