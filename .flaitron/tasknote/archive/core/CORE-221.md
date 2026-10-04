---
title: viz-version-drift
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-221 | viz-version-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Bump `viz/src/ui/constants.ts` `FLOWTRON_VERSION` from v4.0.0 to v4.2.0, and add a version-sync step to the `/ft-release` skill so the viz header stays current on every future release.

## ✅ Acceptance

- [ ] `FLOWTRON_VERSION` in `viz/src/ui/constants.ts` reads `v4.2.0`
- [ ] `/ft-release` skill includes a step to update `FLOWTRON_VERSION` in `viz/src/ui/constants.ts` as part of the release flow

## 🧩 Subtasks

- [ ] Read `viz/src/ui/constants.ts` and confirm current `FLOWTRON_VERSION` value
- [ ] Update `FLOWTRON_VERSION` to `v4.2.0`
- [ ] Read `claude/skills/ft-release.md` and locate the best insertion point for a version-sync step
- [ ] Add version-sync step to `/ft-release` skill
- [ ] Doc-drift sweep + closure

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `viz/src/ui/constants.ts:39` reads `FLOWTRON_VERSION = 'v4.0.0'` — confirmed stale. ft-release SKILL.md Step 7.4 already says "3 doc edits" but Step 5 only executes 2. Gap is real and exactly as described.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-197: added FLOWTRON_VERSION = 'v4.0.0' with note "bumped as part of each /ft-release" — intent was to wire this but the skill was never updated. No other prior tasknote touched ft-release SKILL.md's execution steps.

- [x] **Drift check** — `viz/src/ui/constants.ts:39` confirmed at `v4.0.0`. ft-release SKILL.md at `claude/skills/ft-release/SKILL.md`. All cited locations valid.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) bump FLOWTRON_VERSION to v4.2.0 now; (2) version-sync step lands in SKILL.md Step 5 as item 3, with corresponding updates to Step 3 acceptance, Step 6 lint note, and Step 7.4 staging.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.0.0'` stale by 2 minors; current release is v4.2.0
- CORE-197 set this constant noting "bumped as part of each /ft-release" — the intent was always there but the SKILL.md was never updated
- ft-release SKILL.md Step 7.4 preview already says "3 doc edits"; Step 5 only applies 2 — wiring this brings them into agreement
- SKILL.md edits needed: Step 3 acceptance (add viz line), Step 5 (2→3 edits, add item 3, update grep + `Implementation Notes` count), Step 6 (update "viz suite stays untouched" note), Step 7.4 (add `viz/src/ui/constants.ts` to staging command)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — prior release tasknotes (CORE-193, CORE-204, CORE-210) show the same 2-edit shape; new item 3 follows the same "file → one-line substitution" pattern. No new shape needed.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — no logic changed; string constant + skill prose only; lint/type-check is the test surface

**Implementation Notes:**

- `viz/src/ui/constants.ts:39` — `'v4.0.0'` → `'v4.2.0'`
- `claude/skills/ft-release/SKILL.md` Step 3 — added `viz/src/ui/constants.ts FLOWTRON_VERSION` acceptance criterion
- `claude/skills/ft-release/SKILL.md` Step 5 — "2 doc edits" → "3 doc edits"; added item 3; updated grep; updated Implementation Notes count
- `claude/skills/ft-release/SKILL.md` Step 6 — updated linting note to cover viz/src/ui/constants.ts with lint/typecheck command
- `claude/skills/ft-release/SKILL.md` Step 7.4 — added `viz/src/ui/constants.ts` to staging command
- 4 files changed; diff shape: 3 TS lines + ~12 skill prose lines

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — string constant only; no logic surface

- [x] Ran lint/type-check on changed code — ESLint clean, tsc --noEmit clean

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no UI change; version string update only)

**Testing Notes:**

ESLint: clean. tsc --noEmit: clean. No test suite needed for a string constant change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 9 AI-referenced docs: no change (ft-release SKILL.md is loaded on-demand, not in the cold-start set)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Bumped `FLOWTRON_VERSION` in `viz/src/ui/constants.ts` from `v4.0.0` to `v4.2.0`, and wired a version-sync step into `/ft-release` SKILL.md so every future release automatically updates the viz header constant alongside SPEC.md and MIGRATION.md. Four files changed: constants.ts (1 line), SKILL.md Step 3 acceptance (1 line added), Step 5 execution (2→3 edits + new item 3 + updated grep + count), Step 6 linting note (updated for viz typecheck), Step 7.4 staging command (viz/src/ui/constants.ts added). Lint and typecheck pass clean.

**Archived:** 2026-05-30
