# flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

- [ ] **CORE-EPIC-868** [heavy]🧠 | gate-blind-spots — Bind the three places no gate reads today: the installer's text anchors, the install at a freshly pushed tag, and the open Dependabot alert. Discovery supplied by audit-repo 2026-11-06. Surfaced by audit-repo 2026-11-06 (Theme: the installer reads text it does not own).
  - [x] **CORE-868.2** [moderate]🧩 [unattended] | installer-anchor-drift-check — Completed 2026-11-06.
  - [ ] **CORE-868.3** [moderate]🧩 | release-installs-new-tag — Have `/ft-release` prove the advertised installer URL after the tag is pushed: run `sh tools/install.test.sh install.sh` at the new tag and record the result. Add `workflow_dispatch` and the anchor files' paths to `install-test.yml`'s filter.
  - [ ] **CORE-868.4** [light]🔧 | dependabot-minimatch-alert — Close Dependabot alert #6 (minimatch < 11.0.1, GHSA-g3hv-75wg-m249, reached only through eslint in `viz` devDependencies; three failed `Dependabot Updates` runs since 2026-11-01). Take an eslint release that lifts the range, or an `overrides` pin if `npm --prefix viz run lint` stays green, else dismiss as dev-only with that reason. Record which.
  - [ ] **CORE-868.N** [heavy]🧠 | gate-blind-spots audit
- [ ] **CORE-872** [heavy]🧠 | size-cap-renames — Make the `--unattended` size cap rename-aware: size counts a rename by its content delta via one named git invocation (paths keep `--no-renames`), and Phase 1 estimates size with the same rule so over-cap rows park at Discovery, not closure. Evidence: marscharts FE-540/FE-541. Filed with starter at `.flaitron/tasknote/CORE-872.md`.

## Medium

- [ ] **CORE-EPIC-869** [heavy]🧠 | carrying-cost — Cut what the archive and the at-cap budgets cost per edit: batch the per-file drift loops, report near-cap surfaces, refresh two stale figures, restore budget headroom. Discovery supplied by audit-repo 2026-11-06. Surfaced by audit-repo 2026-11-06 (Theme: context budgets run at the cap; Theme: the archive's cost scales with success).
  - [x] **CORE-869.2** [moderate]🧩 [unattended] | drift-check-batching — Completed 2026-11-06.
  - [ ] **CORE-869.3** [light]🔧 [unattended] | budget-near-cap-report — Completed 2026-11-06.
  - [ ] **CORE-869.4** [light]🔧 [unattended] | stale-size-figures — Re-measure the structure pass-4 figures in `.flaitron/audit-overlay/SKILL.md` (`tools/update-adopters.mjs` 872 → 1,653 lines, `tools/drift-checks.sh` 811 → 884, median and p90) and reword `tools/update-adopters.mjs` line 4 to match the two CLI carve-outs in `SPEC/scope-boundaries.md`.
  - [ ] **CORE-869.5** [heavy]🧠 | near-cap-trims — Bring the five surfaces at 97% of cap or above back to 95% or below (`SPEC/gate-postures.md`, `claude/skills/ft-open-epic/SKILL.md`, `SPEC/post-closure.md`, `SPEC/procedures/ft-task.md`, `claude/skills/ft-release/**`) by trimming, or re-base a cap with its reason in `docs/CONTEXT-BUDGET.md`.
  - [ ] **CORE-869.N** [heavy]🧠 | carrying-cost audit

## Low

- [ ] **CORE-864** [light] | release-note-heading-casing — The release that ships CORE-863 must say in its tag notes that `SPEC.md`'s line-1 heading is now lowercase. An `install.sh` from an earlier tag refuses that core (`update` dies "does not hold flaitron"; global ft-adopt is skipped), so users fetch the latest installer. Close with that release.
- [ ] **CORE-865** [light] | agents-md-repo-layout-trim — From natabula fleet audit 2026-11-05 (@5cd59b70): root `AGENTS.md` has 108 prose lines outside `## Workflow` (natabula `check-fleet-agents-prose.sh` budget 100). `## Repo Layout` (line 60 on) is a file-by-file map that copies `SPEC/layout.md` and `README.md`. Trim it to a pointer plus any entry an agent must know before editing; keep `## Validation` and `## Editing Rules`.
- [ ] **CORE-870** [light] | near-cap-release-note — In `claude/skills/ft-release/step-7.1-standing-checks.md` (~line 155), say a non-failing `NEAR CAP` line printed before `context_budget ok` needs no action; `context_budget` now prints them (CORE-869.3). That directory sits at 97% of its row, so size-check the edit or land it after CORE-869.5.
- [ ] **CORE-871** [light] | flaky-only-b-assertion — Fix the flaky `--only limits the sweep` test (CORE-852.3) in `tools/update-adopters.test.mjs` (~line 927): its assertion that the output lacks the text `only-b` also trips on the printed temp workspace `ft-upd-only-<random>` whenever the suffix starts with `b`. Match `only-b:` or drop the workspace line. Seen once 2026-11-06.

## Future Opportunities

- [ ] **CORE-866** [moderate] | handoff-row-drift-check — From natabula NAT-535: make SPEC.md §"Deferred hand-off filing" mechanical. Port natabula `scripts/check-handoff-rows.sh` (a hand-off block in an archived note must cite a PLAN row or say none deferred) as a `tools/drift-checks.sh` check or `/ft-task` Phase 4 step. Also have `/ft-close-epic`'s `.N` audit file a row per open hand-off it lists. NAT-495.N listed four and filed none.

## Completed

- [x] **CORE-867** [moderate] | doc-sweep-touches-scope — Completed 2026-11-06.
- [x] **CORE-863** [moderate]🧩 | brand-casing-guard — Completed 2026-11-05.
- [x] **CORE-861** [heavy]🧠 | brand-casing-policy — Completed 2026-11-05.
- [x] **CORE-862** [light]🔧 | ci-job-timeouts — Completed 2026-11-05.
- [x] **CORE-860** [moderate] [unattended] | brand-nearmiss-guard — Completed 2026-11-04.
- [x] **CORE-641** [light]🔧 | typescript-7 — Completed 2026-11-01. De-scoped: upstream toolchain watching is a fleet concern; re-filed in natabula as NAT-517.
- [x] **FE-151** [moderate] | viz-quality-stack — Completed 2026-11-01.
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
