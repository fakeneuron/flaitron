# Flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

- [ ] **CORE-EPIC-857** [heavy]🧠 | context-redundancy — Trim the self-referential per-task context the 2026-11-01 HARNESS-SURVEY pass measured (procedure and ft-task skill re-narrating SPEC, incident history in the tasknote README, SPEC.md rationale) and fix small-task over-routing; bucket-grouped children with byte targets (filed via /ft-open-epic; refined at .1 closure).
  - [ ] **CORE-857.1** [frontier]💎 | context-redundancy discovery — Scope shared design and file children .2..6 per SPEC/epic.md.
  - [ ] **CORE-857.N** [heavy]🧠 | context-redundancy audit — Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line); re-measure the per-runner cold start against the survey's byte targets. Filed now with the reserved terminal `.N` suffix (never renumbers as children are added).

## Medium

- [ ] **CORE-855** [moderate]🧩 | release v8.3.0 — Cut v8.3.0 with `/ft-release` (minor: CORE-851's `install.sh` carve-out). The README's tag-pinned installer URL 404s until the tag is pushed. After the push, confirm `install-test.yml` is green on ubuntu + macOS, and run the one-liner + `/ft-adopt` hand-off once on a scratch repo.

## Low

- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.
- [ ] **FE-151** [moderate] | viz-quality-stack — From natabula NAT-506 (fleet audit 2026-10-31, @f82a48e, still true @08fc7d1): `viz/` lacks diff-cover, `--max-warnings 0`, `noUncheckedIndexedAccess` and a `just coverage` recipe (natabula QUALITY-STACK). Adopt them the next time viz is worked on (lazy).

## Future Opportunities

(none)

## Completed

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
- [x] **FE-150** [moderate]🧩 [unattended] | active-parse-report — Completed 2026-10-27.
- [x] **FE-147** [moderate]🧩 | watch-degraded-signal — Completed 2026-10-27.
- [x] **FE-146** [light]🔧 | project-data-error-hygiene — Completed 2026-10-27.
- [x] **CORE-838** [light]🔧 [unattended] | micro-default-wording — Completed 2026-10-27.
- [x] **CORE-839** [light] | audit-overlay-reconcile — Re-reconciled `.flaitron/audit-overlay/SKILL.md` against `ft-audit` at v7.5.0 (CORE-802 decisions file, CORE-815.4 `[moderate]`: both inherited, no delta needed): `flaitron-reconciled:` v7.0.0 → v7.5.0, and the gates line's `ci.yml:33-41` range replaced by a step-level citation. Surfaced by audit-docs 2026-10-27 (Finding #2, Medium; Finding #3, Low), fixed inline.
- [x] **CORE-840** [light] | retire-superseded-spec — Removed `.flaitron/specs/spec-to-work-handoff.md` (superseded 2026-09-12, no inbound links, cited the retired `/ft-epic-discovery` seven times); history stays in git. Surfaced by audit-docs 2026-10-27 (Finding #4, Low), fixed inline.
- [x] **FE-145** [light]🔧 | scoped-error-clear — Completed 2026-10-27.
- [x] **CORE-835** [heavy]🧠 | candidacy-rendered-surface — Completed 2026-10-26.
- [x] **CORE-837** [heavy]🧠 | open-epic-model-seam — Completed 2026-10-26.
- [x] **CORE-836** [frontier]💎 | epic-filing-entry — Completed 2026-10-26.
- [x] **CORE-834** [light] | updater-comment-pointer — Fixed "workspaceRoot comment below" → "above" in tools/update-adopters.mjs:358. Surfaced by audit 2026-10-26 (Finding #2, Low), fixed inline.
- [x] **FE-144** [light] | parser-comment-placement — Moved scanDocument's header comment off resolveHeadingLine in viz/src/parser.ts. Surfaced by audit 2026-10-26 (Finding #1, Low), fixed inline.
- [x] **FE-143** [light]🔧 | dedupe-check-typecheck — Completed 2026-10-26.
- [x] **FE-142** [moderate]🧩 | solution-root-tsconfig — Completed 2026-10-26.
- [x] **FE-141** [light]🔧 [unattended] | build-runs-typecheck — Completed 2026-10-26.
- [x] **CORE-833** [light]🔧 [unattended] | dirty-tree-cue — Completed 2026-10-26.
- [x] **FE-140** [moderate]🧩 [unattended] | root-pass-remainder — Completed 2026-10-26.
- [x] **FE-139** [moderate]🧩 | shared-pure-tests-tier — Completed 2026-10-26.
- [x] **FE-138** [moderate]🧩 | node-tier-no-dom — Completed 2026-10-26.
- [x] **FE-136** [moderate]🧩 | per-tier-node-types — Completed 2026-10-26.
- [x] **FE-137** [light]🔧 | bare-builtin-tier-gate — Completed 2026-10-26.
