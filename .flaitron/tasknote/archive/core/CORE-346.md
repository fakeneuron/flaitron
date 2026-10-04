---
title: release v5.11.0
status: completed
tags: []
created: 2026-07-07
due:
related-tasks: [CORE-344, CORE-345, CORE-343]
---

# CORE-346 | release v5.11.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-344]] [[CORE-345]] [[CORE-343]]

## 🎯 Goal

Cut v5.11.0 minor release for Codex wiring parity, updater wiring fixes, and sidequest wording clarification since v5.10.1.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.10.1` → `v5.11.0`
- [x] docs/MIGRATION.md example pin bumped `v5.10.1` → `v5.11.0`
- [x] SECURITY.md release-tag example pin bumped `v5.10.1` → `v5.11.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.10.1` → `v5.11.0`
- [x] `viz/package.json` `"version"` bumped `"5.10.1"` → `"5.11.0"`
- [x] Dogfood gate resolved — Claude + Grok `skipped @ v5.11.0`; Codex refreshed at `v5.11.0`
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-346 — flowtron v5.11.0 (...)` commit lands
- [x] Annotated `v5.11.0` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-346.md`

## 🧩 Subtasks

- [x] 5 version edits + dogfood gate stamps
- [x] viz lint/typecheck/test
- [x] Doc-drift sweep + wiring-count/parity checks
- [x] Tag message drafted and approved
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-344]] — Codex wiring parity feature that drives the minor bump
- [[CORE-345]] — Codex adopter-update wiring fix included in the cut
- [[CORE-343]] — prior release v5.10.1

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md` and latest tag both read `v5.10.1`; unreleased commits include one additive `feat:` plus fix/docs commits, so the semver target is the filed minor release `v5.11.0`.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-343 is the direct prior release precedent; this release follows the same five-pin, dogfood-gate, doc-sweep, tag, and archive shape.

- [x] **Drift check** — version pins currently resolve at `SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md`, `viz/src/ui/constants.ts`, and `viz/package.json`; no pre-edit drift found.

- [x] No clarifications needed — assumption: Codex wiring is additive and does not require a major bump; tag migration block will name optional Codex wiring only.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Commits since v5.10.1: `feat: CORE-344 codex wiring parity` (additive Codex skill bundle and docs), `fix: CORE-345 codex updater wiring` (adopter updater recognizes Codex skill wiring), and `docs: clarify sidequest plan row shape` (documentation clarification). No `feat!:` or `BREAKING CHANGE:` marker. Adopter impact: no required project-side edits; Codex users may optionally wire `.agents/skills` from `codex/AGENTS-snippet.md`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release pattern follows CORE-343

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** SPEC/MIGRATION/SECURITY/viz pins v5.10.1 → v5.11.0. Dogfood gate: Claude and Grok recorded deliberate skips at v5.11.0; Codex refreshed through this Codex-run release session.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Visual confirmation not needed — version-string release only; no UI behavior or layout changed

**Testing Notes:** `npm --prefix viz run lint` passed. `npm --prefix viz run typecheck` passed. `npm --prefix viz test` passed: 16 files, 229 tests. Vitest printed the expected ErrorBoundary test "render exploded" jsdom noise, but exited 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change; `SPEC.md` version pin bumped; `docs/MIGRATION.md` example pin bumped; `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` no change; `CONTRIBUTING.md` no change; `SECURITY.md` release-tag example bumped; `docs/AGENT-NEUTRALITY.md` no change; `docs/PLATFORMS.md` dogfood stamps updated; `claude/CAPABILITIES.md` dogfood stamp updated; `docs/AGENT-COMPAT.md` dogfood stamps updated and stale Claude-only bundle claim fixed.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-07.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:** Flowtron v5.11.0 minor release ships first-class Codex wiring parity: the full `ft-*` skill wrapper inventory, `.agents/skills` install notes, updater detection for newly shipped Codex skills, and refreshed compatibility docs. No required adopter migration; Codex users can optionally wire the repo-scoped skills and existing adopters can run `/ft-update` or `$ft-update` after the tag lands.

**Archived:** 2026-07-07
