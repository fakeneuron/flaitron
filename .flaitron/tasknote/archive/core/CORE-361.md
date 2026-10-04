---
title: release v5.13.0
status: completed
tags: []
created: 2026-07-16
due:
related-tasks: [CORE-358, CORE-360, CORE-EPIC-359, CORE-357, CORE-356]
---

# CORE-361 | release v5.13.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-358]] [[CORE-360]] [[CORE-356]]

## 🎯 Goal

Cut v5.13.0 minor release tagging CORE-358 (paper-complete guard) + CORE-360 (update-adopters tests) and related hygiene since v5.12.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.12.0` → `v5.13.0`
- [x] docs/MIGRATION.md example pin bumped `v5.12.0` → `v5.13.0`
- [x] SECURITY.md release-tag example pin bumped `v5.12.0` → `v5.13.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.12.0` → `v5.13.0`
- [x] `viz/package.json` `"version"` bumped `"5.12.0"` → `"5.13.0"` (bare semver, no `v` prefix)
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.13.0`, or recorded `skipped @ v5.13.0`
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-361 — flowtron v5.13.0 (...)` commit lands
- [x] Annotated `v5.13.0` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-361.md`

## 🧩 Subtasks

- [x] 5 version edits + dogfood gate stamps
- [x] viz lint/typecheck/test
- [x] Doc-drift sweep + wiring-count/parity/installed-surface checks
- [x] Tag message drafted and approved
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-358]] — paper-complete guard (feat driving the minor bump)
- [[CORE-360]] — update-adopters automated tests
- [[CORE-EPIC-359]] — workflow-state hygiene
- [[CORE-357]] — dogfood v5.12.0 follow-up (all three rows dogfooded)
- [[CORE-356]] — prior release v5.12.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md` and latest tag both read `v5.12.0`; unreleased commits include additive `feat: CORE-358` (paper-complete guard) plus fix/chore/test commits — highest rank is minor → `v5.13.0`, matching the PLAN-line target.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-356 (v5.12.0) is the direct prior release precedent; same five-pin, dogfood-gate, doc-sweep, tag, archive shape.

- [x] **Drift check** — all five pins resolve at `v5.12.0`: `SPEC.md:3`, `docs/MIGRATION.md:399`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json`. No pre-edit drift. Last tag `v5.12.0` matches `SPEC.md:3`.

- [x] No clarifications needed — assumption: CORE-358 is additive contract hardening (no `feat!:`/`BREAKING CHANGE:`), so a minor bump is correct; migration block starts with `No required project-side edits` (behavior tightens at pin-bump; no project-side file edits required).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Commits since v5.12.0: **CORE-358** (`feat:` paper-complete guard — foreign-dirt hard stop at task entry, atomic single-commit closure, ban collateral Completed flips, 🏁 only with deliverable-covering SHA; contract in SPEC + procedures + tasknote runners), **CORE-360** (`test:` automated tests for `update-adopters`), **CORE-EPIC-359** (workflow-state hygiene — FE archive consolidate + orphan sidequest cleanup), **CORE-357** (`fix:` Grok+Codex dogfood stamps refreshed to dogfooded @ v5.12.0; ft-release slug list + DOGFOOD exhausted-PLAN fallback). No `feat!:` / `BREAKING CHANGE:`. **Adopter impact:** no required project-side edits — pin bump + `/ft-update` (or re-read contract) picks up paper-complete behavioral rules automatically. Migration sentinel: `No required project-side edits`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release pattern follows CORE-356

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string release; CORE-360's tests shipped in their own tasknote)

**Implementation Notes:** 5 version edits v5.12.0→v5.13.0: `SPEC.md:3`, `docs/MIGRATION.md:399`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json`. Dogfood gate (all three refreshed at cut): **Claude** → `v5.13.0 · 2026-07-16 (dogfooded)` (`docs/AGENT-COMPAT.md` + `claude/CAPABILITIES.md`); **Grok** → `v5.13.0 · 2026-07-16 (dogfooded)` (`docs/AGENT-COMPAT.md` + `docs/PLATFORMS.md`); **Codex** → `v5.13.0 · 2026-07-16 (dogfooded)` (`docs/AGENT-COMPAT.md` + `docs/PLATFORMS.md`). Residue adjudication: `SPEC/procedures/ft-task.md:4` `last-verified: v5.12.0 · 2026-07-16` left untouched per CORE-356 precedent — SOP↔source currency stamp, not a release pin or dogfood row.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Visual confirmation not needed — version-string release only; no UI behavior changed

**Testing Notes:** `npm --prefix viz run lint` passed. `npm --prefix viz run typecheck` passed. `npm --prefix viz run test` passed: 16 files, 230 tests. Package reports `flowtron-viz@5.13.0` (bump confirmed). Markdown mental-pass on SPEC.md / docs/MIGRATION.md / SECURITY.md: single-token version substitutions, no frontmatter or fenced blocks touched. Standing §7.1 checks green: wiring count 26; shipped-skill parity claude↔codex; installed-surface 13-slug adopter subset; zero forbidden repo-scoped installs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change; `SPEC.md` version pin bumped; `docs/MIGRATION.md` example pin bumped; `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` no change; `CONTRIBUTING.md` no change; `SECURITY.md` release-tag example bumped; `docs/AGENT-NEUTRALITY.md` no change; `docs/PLATFORMS.md` Grok+Codex footers refreshed to `v5.13.0 · 2026-07-16 (dogfooded)`; `claude/CAPABILITIES.md` Claude stamp refreshed to `v5.13.0 · 2026-07-16 (dogfooded)`; `docs/AGENT-COMPAT.md` all three dogfood rows refreshed to `v5.13.0 · 2026-07-16 (dogfooded)`. ft-audit-docs subroutine: zero Critical/High findings. Standing §7.1 checks green.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-16.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:** Flowtron v5.13.0 minor release ships the paper-complete guard (CORE-358 — foreign-dirt hard stop, atomic single-commit closure, ban collateral Completed flips, deliverable-covering 🏁) plus automated tests for update-adopters (CORE-360) and workflow-state hygiene (CORE-EPIC-359). No required adopter migration; pin bump picks up the new closure rules automatically. Dogfood gate: Claude, Grok, and Codex all refreshed at v5.13.0 · 2026-07-16 (dogfooded).

**Archived:** 2026-07-16
