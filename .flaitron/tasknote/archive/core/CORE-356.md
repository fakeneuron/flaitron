---
title: release v5.12.0
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-352, CORE-EPIC-353, CORE-348, CORE-349, CORE-354, CORE-355, CORE-346]
---

# CORE-356 | release v5.12.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-352]] [[CORE-EPIC-353]] [[CORE-346]]

## 🎯 Goal

Cut v5.12.0 minor release tagging the ft-spec skill (CORE-EPIC-352), the model-roster refresh / 🧩 MEDIUM third-glyph contract (CORE-EPIC-353), suggested-id-filers (CORE-348), release-wiring guardrails (CORE-349.x), and CORE-354/355 doc fixes since v5.11.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.11.0` → `v5.12.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.11.0` → `v5.12.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.11.0` → `v5.12.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.11.0` → `v5.12.0`
- [ ] `viz/package.json` `"version"` bumped `"5.11.0"` → `"5.12.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.12.0`, or recorded `skipped @ v5.12.0`
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-356 — flowtron v5.12.0 (...)` commit lands
- [ ] Annotated `v5.12.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-356.md`

## 🧩 Subtasks

- [ ] 5 version edits + dogfood gate stamps
- [ ] viz lint/typecheck/test
- [ ] Doc-drift sweep + wiring-count/parity/installed-surface checks
- [ ] Tag message drafted and approved
- [ ] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-EPIC-352]] — ft-spec skill (spec-agent-validation) feature driving the minor bump
- [[CORE-EPIC-353]] — model-roster refresh / 🧩 MEDIUM third-glyph contract feature driving the minor bump
- [[CORE-346]] — prior release v5.11.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md` and latest tag both read `v5.11.0`; unreleased commits include additive `feat:` work (two epics) plus fix/docs/chore commits, so the semver target is the filed minor release `v5.12.0`.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-346 (v5.11.0) is the direct prior release precedent; same five-pin, dogfood-gate, doc-sweep, tag, archive shape.

- [x] **Drift check** — all five pins resolve at `v5.11.0`: `SPEC.md:3`, `docs/MIGRATION.md:399`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json`. No pre-edit drift. Last tag `v5.11.0` matches `SPEC.md:3`.

- [x] No clarifications needed — assumption: both epics are additive (no `feat!:`/`BREAKING CHANGE:`), so a minor bump is correct; migration block names only optional new-skill wiring.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Commits since v5.11.0: **CORE-EPIC-352** (ft-spec skill — new tasknote-family skill; adds `claude/skills/ft-spec` + `codex/skills/ft-spec` and wires both into the adopter-installed subset, snippet now 13 skills, consistent with `docs/PLATFORMS.md` §"Installed-surface policy"), **CORE-EPIC-353** (model-roster refresh / 🧩 MEDIUM third-glyph contract — viz parser gained glyph tolerance in .6, so adopter PLAN lines keep parsing), **CORE-348** (suggested-id-filers), **CORE-349.x** (release-wiring guardrails, flowtron-self tooling), **CORE-351.x**/**TEST-001.x** (safety-net fixes), **CORE-354/355** (doc fixes). No `feat!:` / `BREAKING CHANGE:`. **Adopter impact:** no required project-side edits; the one migration-bearing item is the new `/ft-spec` skill — existing adopters run `/ft-update` (or `$ft-update`) after the tag to bump the pin and wire the new symlinks. Migration block will start with the `No required project-side edits` sentinel (mirrors v5.11.0 / v5.10.0 new-skill precedent). **Follow-up noted:** the `ft-release` SKILL.md's hardcoded §7.1 "Expected adopter-installed skill slugs" list (12 slugs) is stale — CORE-352 added `ft-spec` to the adopter subset but did not bump that materialized copy; SSOT `docs/PLATFORMS.md` and the snippets are consistent, so the release is clean, but the checker list should gain `ft-spec`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release pattern follows CORE-346

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** 5 version edits v5.11.0→v5.12.0: `SPEC.md:3`, `docs/MIGRATION.md:399`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json`. Dogfood gate (skip-now-dogfood-post-tag): **Claude refreshed** → `v5.12.0 · 2026-07-13 (dogfooded)` (`docs/AGENT-COMPAT.md` + `claude/CAPABILITIES.md`); **Grok** → `v5.10.0 · 2026-07-05 (dogfooded; skipped @ v5.12.0)` and **Codex** → `v5.11.0 · 2026-07-07 (dogfooded; skipped @ v5.12.0)` (`docs/AGENT-COMPAT.md` + `docs/PLATFORMS.md` footers). Residue adjudication: `SPEC/procedures/ft-task.md:4` `last-verified: v5.11.0` left untouched — it is a SOP↔source currency stamp (`SPEC/procedures/README.md:45`), not a release pin or dogfood row; bumping without re-checking the SOP would falsify it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Visual confirmation not needed — version-string release only; no UI behavior changed

**Testing Notes:** `npm --prefix viz run lint` passed. `npm --prefix viz run typecheck` passed. `npm --prefix viz run test` passed: 16 files, 230 tests. Package reports `flowtron-viz@5.12.0` (bump confirmed). Standing §7.1 checks all green: shipped-skill parity (claude↔codex), installed-surface policy (13-slug adopter subset incl `ft-spec`), no forbidden repo-scoped installs, and `ft-spec` fully fanned out across snippet + ft-new-project Step 3/7/8 (no CORE-329.2 drift).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change; `SPEC.md` version pin bumped; `docs/MIGRATION.md` example pin bumped; `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` no change; `CONTRIBUTING.md` no change; `SECURITY.md` release-tag example bumped; `docs/AGENT-NEUTRALITY.md` no change; `docs/PLATFORMS.md` Grok+Codex dogfood stamps set to `skipped @ v5.12.0`; `claude/CAPABILITIES.md` Claude dogfood stamp refreshed to v5.12.0; `docs/AGENT-COMPAT.md` all three dogfood stamps updated. Standing §7.1 checks green (parity / installed-surface / no-forbidden / ft-spec fan-out). Follow-up noted: `ft-release` SKILL.md §7.1 hardcoded expected-slug list missing `ft-spec` (flowtron-self tooling, outside AI-ref set).

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-13.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:** Flowtron v5.12.0 minor release ships the `/ft-spec` review-first spec skill (CORE-EPIC-352 — wired into the adopter subset on Claude and Codex surfaces via the agent-neutral SOP layer) and the model-roster refresh introducing the 🧩 MEDIUM third glyph with viz parser glyph-tolerance (CORE-EPIC-353), plus suggested-id filers (CORE-348), release-wiring guardrails (CORE-349.x), a repo-health sweep (CORE-354), and safety-net fixes (CORE-351.x/TEST-001.x). No required adopter migration; existing adopters can run `/ft-update` (or `$ft-update`) after the tag to bump the pin and wire the new `/ft-spec` symlinks. Dogfood gate: Claude refreshed at v5.12.0; Grok and Codex recorded deliberate skips at v5.12.0 (to be dogfooded against the clean tag in follow-up chats).

**Archived:** 2026-07-13
