---
title: release v5.9.1
status: completed
tags: []
created: 2026-07-03
due:
related-tasks: [CORE-340, CORE-339]
---

# CORE-341 | release v5.9.1

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-340]] [[CORE-339]]

## 🎯 Goal

Cut flowtron v5.9.1 patch release tagging CORE-340 (plan-exhausted terminal-state SPEC next-move branch + skill propagation) since v5.9.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.9.0` → `v5.9.1`
- [x] docs/MIGRATION.md example pin bumped `v5.9.0` → `v5.9.1`
- [x] SECURITY.md release-tag example pin bumped `v5.9.0` → `v5.9.1`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.9.0` → `v5.9.1`
- [x] `viz/package.json` `"version"` bumped `"5.9.0"` → `"5.9.1"` (bare semver, no `v` prefix)
- [x] Dogfood gate resolved — Claude refreshed → v5.9.1; Grok + Codex recorded `skipped @ v5.9.1`
- [x] Phase 4 doc-drift sweep run across the AI-referenced docs set (zero findings)
- [x] Single `feat: CORE-341 — flowtron v5.9.1 (...)` commit lands
- [x] Annotated `v5.9.1` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-341.md`

## 🧩 Subtasks

- [x] 1. Read SPEC.md:3 + MIGRATION.md + SECURITY.md + constants.ts + package.json pin locations
- [x] 2. Archive skim — CORE-339 for release shape
- [x] 3. Adopter-impact classification of commits since v5.9.0
- [x] 4. Apply 5 version edits (SPEC · MIGRATION · SECURITY · constants.ts · package.json)
- [x] 5. Dogfood gate — Claude refreshed, Grok + Codex skipped
- [x] 6. Phase 3 lint/test pass (viz package scripts)
- [x] 7. Doc-drift sweep + standing wiring-count check
- [x] 8. Draft + review annotated tag message
- [x] 9. Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-340]] — plan-exhausted-terminal-state (SPEC terminal next-move branch + skill propagation) — the change this release tags
- [[CORE-339]] — prior release v5.9.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Single-commit patch release; CORE-340 is the only commit since v5.9.0 and changes the SPEC contract + three closure skills. Bump pattern well-established (CORE-339 precedent). User confirmed target v5.9.1 in Step 2.

- [x] Read relevant source files — SPEC.md:3, docs/MIGRATION.md:387 pin, SECURITY.md:109 pin, viz/src/ui/constants.ts:41, viz/package.json:4

- [x] **Archive skim** — CORE-339 (v5.9.0) nearest precedent; structural shape unchanged.

- [x] **Drift check** — SPEC.md:3 read `**Version:** v5.9.0`; `git describe --tags --abbrev=0` returned `v5.9.0`; MIGRATION.md/SECURITY.md/constants.ts/package.json pins all at 5.9.0 — no drift.

- [x] Asked clarifying questions — user confirmed scope (cut v5.9.1 for the docs/SPEC-contract change; audit produced no new fixes) and dogfood-gate resolution.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Commits since v5.9.0 (1 total): `docs: CORE-340 — plan-exhausted-terminal-state`. Touched SPEC.md, SPEC/procedures/ft-task.md, and three closure skills (ft-task, ft-micro-task, ft-close-epic SKILL.md) — plus its own PLAN.md flip + archived tasknote. No `feat!:` / `BREAKING CHANGE:` → patch bump.

Adopter impact: SPEC contract + skill-body change, consumed via submodule pin and picked up automatically on the next `/ft-update`. No new template section, no BREAKING change, no required project-side edits. Migration block: `No required project-side edits`.

The preceding audit of the viz surface (2026-07-03) found zero findings and wrote nothing to PLAN.md — so there are no code fixes bundled in this cut; it tags the CORE-340 SPEC clarification only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — 5 version edits per canonical recipe (CORE-339 precedent)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string edits only)

**Implementation Notes:**

5 version edits applied: SPEC.md:3, docs/MIGRATION.md:387, SECURITY.md:109, viz/src/ui/constants.ts:41, viz/package.json:4 (v5.9.0 → v5.9.1 / bare "5.9.1"). Grep verification clean — the four `v`-prefixed pins all read v5.9.1; the only residual v5.9.0 hits are recorded dogfood skips + the AGENT-COMPAT:96 prose (accurate).

Dogfood gate resolved (Claude refresh, Grok + Codex skip):
- Claude: refreshed → `v5.9.1 · 2026-07-03 (dogfooded)` (docs/AGENT-COMPAT.md:36, claude/CAPABILITIES.md:56)
- Grok: `v5.9.0 · 2026-07-03 (dogfooded; skipped @ v5.9.1)` (docs/AGENT-COMPAT.md:37, docs/PLATFORMS.md:238)
- Codex: `v5.9.0 · 2026-07-03 (dogfooded; skipped @ v5.9.1)` (docs/AGENT-COMPAT.md:38, docs/PLATFORMS.md:253)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation — N/A, version-string-only edits

**Testing Notes:**

`npm --prefix viz run lint / typecheck / test` — all clean. 16 test files, 229 tests passed. `flowtron-viz@5.9.1` in the script banner confirms the package.json bump. Markdown prose edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, docs/AGENT-COMPAT.md, docs/PLATFORMS.md, claude/CAPABILITIES.md) are single-token substitutions; no frontmatter or fenced blocks touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — focused currency/consistency pass over the touched + AI-referenced docs: zero findings (pins consistent at v5.9.1, dogfood stamps self-consistent, AGENT-COMPAT:96 prose accurate, VIZ_VERSION consumed at App.tsx:309). Standing symlink-wiring count check: no-op — 22 `ln -s` in claude/AGENTS-snippet.md, no wiring file touched since v5.9.0 (roster unchanged).

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive

- [x] Recap drafted (bundled into the 📦 gate)

**Final Summary:**

Flowtron v5.9.1 patch release tagging CORE-340 (plan-exhausted terminal-state) since v5.9.0. When a project's PLAN.md has no remaining actionable rows, the SPEC now defines an explicit terminal next-move branch, propagated into the ft-task, ft-micro-task, and ft-close-epic closure/next-move guidance. Five version pins bumped v5.9.0 → v5.9.1. Dogfood gate: Claude refreshed → v5.9.1; Grok + Codex recorded `skipped @ v5.9.1` (same-day patch, no fresh non-Claude sessions). Doc-drift sweep + standing wiring-count check: zero findings. The preceding viz audit found nothing to fix, so this cut tags the SPEC clarification only. No adopter-side migration required — picked up automatically on the next `/ft-update` pin bump.

**Archived:** 2026-07-03
