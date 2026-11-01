# Flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

(none)

## Medium

(none)

## Low

- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.
- [ ] **FE-151** [moderate] | viz-quality-stack — From natabula NAT-506 (fleet audit 2026-10-31, @f82a48e, still true @08fc7d1): `viz/` lacks diff-cover, `--max-warnings 0`, `noUncheckedIndexedAccess` and a `just coverage` recipe (natabula QUALITY-STACK). Adopt them the next time viz is worked on (lazy).

## Future Opportunities

(none)

## Completed

- [x] **CORE-855** [moderate]🧩 | release v8.3.0 — Completed 2026-11-01.
- [x] **CORE-859** [light]🔧 | file-task-nested-placement — `/ft-file-task` Step 4 placement now appends past 2-space-nested child rows; no tasknote. Completed 2026-11-01.
- [x] **CORE-858** [light]🔧 | seed-question-only-ask — Completed 2026-11-01.
- [x] **CORE-EPIC-857** [heavy]🧠 | context-redundancy — Completed 2026-11-01.
  - [x] **CORE-857.1** [frontier]💎 | context-redundancy discovery — Completed 2026-11-01.
  - [x] **CORE-857.2** [heavy]🧠 | procedure-point-not-narrate — Completed 2026-11-01.
  - [x] **CORE-857.3** [moderate]🧩 [unattended] | readme-history-out — Completed 2026-11-01.
  - [x] **CORE-857.4** [heavy]🧠 | skill-b2-pointers — Completed 2026-11-01.
  - [x] **CORE-857.5** [heavy]🧠 | small-task-routing — Completed 2026-11-01.
  - [x] **CORE-857.6** [heavy]🧠 | spec-c-extraction — Completed 2026-11-01.
  - [x] **CORE-857.N** [heavy]🧠 | context-redundancy audit — Completed 2026-11-01.
- [x] **CORE-856** [heavy]🧠 | agent-baseline-redundancy-survey — Completed 2026-11-01.
- [x] **CORE-851** [heavy] | one-line-installer — Completed 2026-11-01.
- [x] **CORE-EPIC-852** [heavy] | pin-bump-tool-merge — Completed 2026-11-01.
  - [x] **CORE-852.1** [heavy] | pin-bump-tool-merge discovery — Completed 2026-10-31.
  - [x] **CORE-852.2** [moderate] | attended-ledger-guard — Completed 2026-10-31.
  - [x] **CORE-852.3** [heavy] | selection-gate-flags — Completed 2026-10-31.
  - [x] **CORE-852.4** [heavy] | follow-through-commit-contract — Completed 2026-10-31.
  - [x] **CORE-852.5** [heavy] | wiring-and-forks — Completed 2026-10-31.
  - [x] **CORE-852.6** [moderate] | ft-update-parity-carveout — Completed 2026-11-01.
  - [x] **CORE-852.7** [moderate] | release-and-parity-run — Completed 2026-11-01.
  - [x] **CORE-852.N** [heavy] | pin-bump-tool-merge audit — Completed 2026-11-01.
- [x] **CORE-854** [moderate]🧩 | release v8.2.0 — Completed 2026-11-01.
- [x] **CORE-853** [moderate] | workflow-replace-fence-aware — Completed 2026-11-01.
- [x] **CORE-849** [moderate]🧩 | codex-reconcile-portability — Completed 2026-10-31.
- [x] **CORE-EPIC-850** [heavy] | unattended-readiness — Completed 2026-10-31.
  - [x] **CORE-850.1** [frontier] | unattended-readiness discovery — Completed 2026-10-31.
  - [x] **CORE-850.2** [heavy] | readiness-basis — Completed 2026-10-31.
  - [x] **CORE-850.3** [heavy] | predicate-clauses — Completed 2026-10-31.
  - [x] **CORE-850.4** [heavy] | seeder-scope-question — Completed 2026-10-31.
  - [x] **CORE-850.5** [heavy] | runner-scope-guardrails — Completed 2026-10-31.
  - [x] **CORE-850.6** [moderate] | caller-contract — Completed 2026-10-31.
  - [x] **CORE-850.N** [heavy] | unattended-readiness audit — Completed 2026-10-31.
- [x] **CORE-848** [moderate]🧩 | release v8.1.0 — Completed 2026-10-30.
- [x] **CORE-847** [light] | readme-v8-major — Added v8.0.0 (the `/api/active` response-shape change) to README's breaking-majors sentence. Surfaced by audit-docs 2026-10-30 (Finding #4, Medium), fixed inline.
- [x] **CORE-846** [light] | roster-guard-wording — Reworded the "names-only" KEEP IN SYNC guards in `AGENTS.md` and `claude/AGENTS-snippet.md` to "names plus arguments and per-skill flags, no stubs or gate detail", matching the rosters they guard. Surfaced by audit-docs 2026-10-30 (Finding #3, Low), fixed inline.
- [x] **CORE-845** [light] | bump-tasknote-wording — Moved `docs/MIGRATION.md`'s stranded "a bump is a task with a tasknote" line from §"Upgrading to v7.0.0" into §"Pinning and bumping", reworded to `SPEC/versioning.md` (no tasknote by default), and dropped "4-phase flow" from both `docs/UPGRADING.md` commit steps. Surfaced by audit-docs 2026-10-30 (Finding #2, Medium), fixed inline.
- [x] **CORE-844** [light] | overlay-size-figures — Updated `.flaitron/audit-overlay/SKILL.md` to v8.0.0 measurements: structure pass-4 sizes (70 files, median 39, p90 271; outliers `update-adopters.mjs` 872, `drift-checks.sh` 811) and the docs scope count (128 files). Surfaced by audit-docs 2026-10-30 (Finding #1, Low), fixed inline.
- [x] **CORE-843** [moderate]🧩 [unattended] | unattended-park-commit — Completed 2026-10-30.
- [x] **CORE-842** [moderate] | github-secret-controls — Completed 2026-10-29.
- [x] **CORE-841** [moderate]🧩 | release v8.0.0 — Completed 2026-10-27.
- [x] **FE-148** [moderate]🧩 | active-parse-visibility — Completed 2026-10-27.
- [x] **FE-149** [light] | degraded-banner-copy — Completed 2026-10-27.
