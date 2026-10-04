---
title: bootstrap-submodule-path-drift
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-272]
---

# CORE-273 | bootstrap-submodule-path-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-272]]

## 🎯 Goal

Align the submodule path references in `ft-new-project` and `docs/MIGRATION.md` so every step consistently uses `.flowtron/core` (the canonical path), eliminating the half-migrated `.flowtron/flowtron` remnants.

## ✅ Acceptance

- [ ] `ft-new-project` SKILL.md: all submodule path references use `.flowtron/core` (no `.flowtron/flowtron`)
- [ ] `docs/MIGRATION.md` §1.1, §1.6, §3.8, §"Pinning and bumping": all submodule path references use `.flowtron/core`
- [ ] `SPEC.md` layout diagram: `core/` instead of `flowtron/`
- [ ] `ft-update` SKILL.md + command + v4.x upgrade guide: untouched (intentional dual-path / legacy-path references)

## 🧩 Subtasks

- [x] Read `ft-new-project` SKILL.md and identify all `.flowtron/flowtron` occurrences (4 hits: lines 42, 50, 51, 96)
- [x] Read `docs/MIGRATION.md` and identify all `.flowtron/flowtron` occurrences (9 hits: lines 54, 55, 154, 324, 335, 339, 342, 343, 345)
- [x] Grep broader codebase — AGENTS-snippet.md already fixed; SPEC.md line 37 layout diagram also needs update
- [x] Apply the fixes in `ft-new-project/SKILL.md` (4 replacements)
- [x] Apply the fixes in `docs/MIGRATION.md` (9 replacements)
- [x] Fix `SPEC.md` layout diagram (1 replacement)
- [x] Verify no remaining drift in in-scope files

## 🔗 Related

- [[CORE-272]] — surfaced this path drift during ft-update adopter submodule-bump work

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Grep confirms exact drift locations. Scope is well-defined: 3 files, ~13 string replacements, no executable code. One minor additional find (SPEC.md layout diagram).

- [x] Read relevant source files

- [x] **Archive skim** — CORE-272 is the direct parent (fixed AGENTS-snippet.md in-flight, filed CORE-273 explicitly). No other prior tasknotes touched these bootstrap paths.

- [x] **Drift check** — paths confirmed by grep; one additional location: SPEC.md line 37 layout diagram shows `flowtron/` (meaning `.flowtron/flowtron/`) while line 41 already says `.flowtron/core/` — minor additional fix in scope. `ft-update/SKILL.md` + command wrapper intentionally dual-path (leave). §"Upgrading from v4.x" lines 361-362 intentionally `.flowtron/flowtron` (legacy path; leave).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  - Canonical destination: `.flowtron/core` for all new adopters
  - `ft-update` dual-path logic: intentional — don't touch
  - v4.x upgrade guide references: accurate for that legacy path — don't touch

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
Grep found 4 occurrences in `ft-new-project/SKILL.md` (lines 42, 50, 51, 96) and 9 occurrences in `docs/MIGRATION.md` (lines 54, 55, 154, 324, 335, 339, 342, 343, 345) that seed new adopters at `.flowtron/flowtron`. SPEC.md line 37 also shows `flowtron/` in the layout diagram vs `.flowtron/core/` in the prose. AGENTS-snippet.md already fixed by CORE-272.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-272 did the same string-align surgery on `AGENTS-snippet.md`; extending that pattern directly. No new abstraction needed.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only edits)

**Implementation Notes:**
3 files changed: `claude/skills/ft-new-project/SKILL.md` (4 replacements — lines 42, 50, 51, 96), `docs/MIGRATION.md` (9 replacements — §1.1 ×2, §1.6 ×1, §3.8 ×1, §"Pinning and bumping" ×5), `SPEC.md` (1 replacement — layout diagram line 37). Left intentionally: `ft-update/SKILL.md` + command (dual-path notes, correct), `docs/MIGRATION.md` §"Upgrading from v4.x" lines 361-362 (legacy v4.x path, accurate).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — markdown mental-pass: submodule path consistent across all changed files; no broken cross-refs; fenced blocks balanced; intentional `.flowtron/flowtron` hits (ft-update dual-path notes + v4.x upgrade guide) confirmed as correct non-targets

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**
Verification grep: `grep -n ".flowtron/flowtron" ft-new-project/SKILL.md docs/MIGRATION.md SPEC.md` → only 2 hits remain (MIGRATION.md lines 361-362, §"Upgrading from v4.x", intentional).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` updated (layout diagram); `docs/MIGRATION.md` updated (adoption paths); `README.md` / `claude/AGENTS-snippet.md` / `docs/CONVENTIONS.md` / `CONTRIBUTING.md` / `SECURITY.md` / `docs/AGENT-NEUTRALITY.md` / `docs/PLATFORMS.md` / `claude/CAPABILITIES.md` / `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-02.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (inline — conditional skip)

**Final Summary:**
Aligned the half-migrated submodule path in all adopter bootstrap docs: new adopters now consistently add the submodule at `.flowtron/core` (matching every subsequent step and symlink reference). 14 replacements across 3 files (`ft-new-project/SKILL.md` ×4, `docs/MIGRATION.md` ×9, `SPEC.md` layout diagram ×1). Left intentionally unchanged: `ft-update` dual-path notes (backwards-compat, correct) and `docs/MIGRATION.md` §"Upgrading from v4.x" (accurately describes the legacy `git mv` path).

**Archived:** 2026-06-02
