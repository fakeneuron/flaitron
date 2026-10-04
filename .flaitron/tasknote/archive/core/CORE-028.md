---
title: release v0.4.0
status: completed
priority: Low
area: core
tags: []
created: 2026-05-03
due:
related-tasks: [CORE-027, FE-006, CORE-014, CORE-025]
---

# CORE-028 | release v0.4.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-027]] [[FE-006]] [[CORE-014]] [[CORE-025]]

## 🎯 Goal

Tag annotated `v0.4.0` capturing the starter-tasknotes feature (CORE-027 + FE-006) and push main + tag.

## ✅ Acceptance

- [x] Annotated tag `v0.4.0` created with release summary in message
- [x] Tag pushed to remote (alongside main)
- [x] PLAN.md line flipped to completed

## 🧩 Subtasks

- [x] Review commits since v0.3.0 to confirm what's in scope
- [x] Draft annotated tag message (headline + bullet summary)
- [x] Create annotated tag `v0.4.0`
- [x] Push `main` and the tag to origin
- [x] Flip PLAN.md line; archive tasknote

## 🔗 Related

- [[CORE-027]] — starter tasknotes (primary content of this release)
- [[FE-006]] — viz/ starter chip (bundled in this release)
- [[CORE-014]] — release v0.1.0 (pattern predecessor)
- [[CORE-025]] — release v0.3.0 (pattern predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-027 and FE-006 are both shipped (Completed in PLAN.md); the "optionally FE-006 if shipped first" condition is met. SPEC is already at v0.4.0. All content is ready to tag.

- [x] Read relevant source files
- [x] **Drift check** — CORE-027 and FE-006 confirmed shipped. SPEC bumped to v0.4.0 by CORE-027. CORE-026 (doc fix — no tasknote) is also in the range and warrants a brief mention. "No migration required" holds — starter is a new additive status value only. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Commits in range (v0.3.0..HEAD):
- `a37998e feat: FE-006 — viz/ starter chip`
- `f687176 feat: CORE-027 — starter tasknotes`
- `e9b07cf docs: CORE-026 — remove redundant "Pinned to:" version line`

Assumptions (no clarifications needed):
1. FE-006 is shipped → include it in the release (satisfies the "optionally" condition)
2. CORE-026 (minor doc fix, no tasknote) included under a brief "Tooling / docs" bullet
3. SPEC contract is v0.4.0 (updated by CORE-027); tag message will cite this
4. Tag message format follows v0.3.0 pattern verbatim (section headers, migration block, etc.)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed v0.3.0 tag message structure exactly (section headers, migration block, per-task bullet format)
- [x] Implemented the minimal solution — annotated tag `v0.4.0` created and pushed; `main` pushed
- [x] Updated/added tests for non-trivial behavior — N/A (release task; no code changes)
- [x] Ran targeted tests on changed files — N/A

**Implementation Notes:**

Tag `v0.4.0` created annotated on commit `a37998e` (FE-006, HEAD). Pushed both `main` (+3 commits since v0.3.0) and the tag to `origin`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changes)
- [x] Ran lint/type-check on changed code — N/A
- [x] (frontend) Asked the user for visual confirmation — N/A
- [x] Fixed all introduced issues — N/A

**Testing Notes:** Release-only task; no code changes introduced.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-03`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Tagged and pushed `v0.4.0` — additive minor release bundling CORE-027 (starter tasknotes + SPEC v0.4.0) and FE-006 (viz/ 🌱 chip). CORE-026 doc fix also in range. No migration required for adopting projects beyond bumping the submodule pin.

**Archived:** 2026-05-03
