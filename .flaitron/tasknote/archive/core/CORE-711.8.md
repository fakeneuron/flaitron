---
title: global + external refs
status: completed
tags: []
created: 2026-10-04
due:
related-tasks: [CORE-EPIC-711, CORE-711.1, CORE-711.5, CORE-711.N]
touches:
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-711.8.md
  - ../judedelparte/.flaitron/PLAN.md
---

# CORE-711.8 | global + external refs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-711]] [[CORE-711.1]] [[CORE-711.5]] [[CORE-711.N]]

## 🎯 Goal

Route the remaining external and global flaitron-rename references to their owning locations, preserving the deferred `~/fakeneuron/` work until that access root exists.

## ✅ Acceptance

- [x] JD-030 routes the current judedelparte app-metadata rename and sibling-content references to its owner — `rg -n '\*\*JD-030\*\*' .flaitron/PLAN.md` in the target repository
- [x] CORE-713 records the named global configuration/doc references and guard-hook review as an operator handoff — `rg -n '\*\*CORE-713\*\*' .flaitron/PLAN.md`
- [x] CORE-713 explicitly preserves the `~/fakeneuron/` scan until the operator adds its access root — `rg -n 'fakeneuron' .flaitron/PLAN.md`

## 🧩 Subtasks

- [x] File the judedelparte-owned rename work in that repository's tracking system.
- [x] Route the global Claude and `~/Code` configuration changes to the operator-owned configuration workflow.
- [x] Preserve the `~/fakeneuron/` scan as a blocked follow-up until the access root exists.

## 🔗 Related

- [[CORE-EPIC-711]] — parent rebrand epic
- [[CORE-711.1]] — discovery and original external-surface inventory
- [[CORE-711.5]] — completed prerequisite for GitHub and folder renames
- [[CORE-711.N]] — terminal audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The declared deliverables all belong outside this checkout; `SPEC/scope-boundaries.md` requires routing them to their owning workflows instead of editing them from this task cycle.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: no in-repo code or module boundary is in scope; routing preserves each owner's own discovery, validation, and atomic closure.

- [x] **Archive skim** — read CORE-711.1's source inventory and CORE-711.4's cross-repo boundary context; the former assigns these surfaces to this child and the latter confirms the post-rename state.

- [x] **Drift check** — named paths exist except `~/fakeneuron/`; judedelparte's `flowtron.yml` and its sibling app content still contain the legacy name, while the named global docs/config contain the expected legacy references. The execution requested by the PLAN line conflicts with `SPEC/scope-boundaries.md`'s cross-repo remit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — a Phase 1 re-scope gate is required: assume the target owners will choose their own tracking IDs and validation after approval.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Area lookup: `CORE-*` → `archive/core/`. The row is an epic implementation child; CORE-711.1 declares it sequential after CORE-711.5, which is completed.
- `judedelparte/content/apps/flowtron.yml` still has the legacy ID, display name, summary, portal URL, and GitHub URL. Its sibling `caobunga.yml` and `natabula.yml` also use the old product name; CORE-711.1 additionally inventories the app icon, tests, and founder experience content.
- `~/.claude/CLAUDE.md` lines 12 and 44, `~/.claude/settings.json` line 105, and `~/Code/CLAUDE.md` line 12 have legacy references. CORE-711.1 separately records the guard hook, whose contents need owner-side review. `~/fakeneuron/` remains absent.
- This is not a merely mechanical implementation in flaitron: the deliverable must change from external edits to owner-side routing. No tasknote is present in this checkout for the foreign work, and no external writes were made.
- Re-scope approved at the Phase 1→2 gate on 2026-10-04. The revised PLAN line and tasknote goal retain only routing work in this checkout.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing PLAN-row task filing is the established routing mechanism; one owner-specific row plus one `[handoff]` operator row keeps responsibilities separate.

- [x] **Minimal refactor gate** — `N/A`: tracking-only markdown changes; no external content or configuration was edited.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no behavior changed.

**Implementation Notes:**

- Filed `JD-030` at the top of judedelparte's `## Medium`: app metadata, icon/tests, and public content references land in the owner repository.
- Filed `CORE-713` in flaitron `## Medium` with `[handoff]`: the operator owns the `~/.claude`, `~/Code`, and guard-hook changes, while the row preserves the unavailable `~/fakeneuron/` scan.
- No path outside either PLAN file was changed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: routing-only PLAN changes.

- [x] Ran lint/type-check on changed code — `git diff --check` in both repositories passed.

- [x] **Verification receipt** — routing-only markdown changes introduce no code-quality concerns.

- [x] **External review** — independent review passed after two corrected scope/record findings.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git diff --check` → exit 0; `git -C ~/Code/judedelparte diff --check` → exit 0.
- `rg -n '\*\*CORE-713\*\*' .flaitron/PLAN.md` → exit 0; `rg -n '\*\*JD-030\*\*' ~/Code/judedelparte/.flaitron/PLAN.md` → exit 0.
- External review: first pass found an unauthorized workflow-prose clause in JD-030; removed. Second pass found the stale tasknote restatement; removed. Final pass: `PASS` — no blockers or notes. The reviewer confirmed no app or global-config content changed.
- Structural quality: `N/A` beyond concise PLAN rows; no code, public API, or behavior changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to README, AGENTS, SPEC, docs/MIGRATION, the four platform snippets, docs/CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, or VISION; the routing remains consistent with scope-boundaries.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-10-04.` and retained beneath its active epic parent, then tasknote moved to `.flaitron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — routing scope reconciles to the declared flaitron PLAN/tasknote plus judedelparte PLAN; no undeclared path changed. No refactor was needed; owner-specific rows prevent cross-repo edits from bypassing local workflow and validation.

- [x] **Learnings** — `N/A`: the existing cross-repo remit correctly directed the outcome.

**Final Summary:** Routed the remaining rebrand work instead of editing it from flaitron: judedelparte now owns `JD-030` (committed as `88ccf5e`), while `CORE-713` records the operator-owned global configuration handoff and deferred `~/fakeneuron/` scan. The actual app/config surfaces remain unchanged in this cycle.

**Archived:** 2026-10-04
