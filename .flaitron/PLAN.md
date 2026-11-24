# flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

(none)

## Medium

- [ ] **CORE-EPIC-919** [moderate]🧩 | derived-figures — Hand-copied figures in the audit overlay go stale within weeks. CORE-869.4 re-measured them on 2026-11-06 and they have drifted again (`tools/drift-checks.sh` 973 → 1,221 lines), and `flaitron-reconciled:` still reads v8.4.0 after v8.5.0. Swap figures for the command that yields them instead of re-measuring. Discovery supplied by audit-repo 2026-11-24. Surfaced by audit-repo 2026-11-24 (Theme: Hand-copied figures go stale)
  - [x] **CORE-919.2** [light]🔧 [unattended] | overlay-figures-to-commands — Completed 2026-11-24.
  - [ ] **CORE-919.3** [heavy]🧠 | reconciled-pin-guard — Decide where a `flaitron-reconciled:` pin that trails the tag gets caught: a `/ft-release` §7.1 step that bumps it when the scaffold diff is empty, or a drift check. Today only an audit notices (CORE-900, then this run). `claude/skills/ft-release/**` is at 95% of its byte budget.
  - [ ] **CORE-919.4** [light]🔧 | overlay-markdown-counts — In `.flaitron/audit-overlay/SKILL.md`, the `docs:` scope line still carries hand-copied counts ("1,311 of the repo's 1,441 tracked markdown files … as of 2026-11-07"). Replace each with the command that yields it, or drop the figures. Surfaced by CORE-919.2 External review.
  - [ ] **CORE-919.N** [moderate]🧩 | derived-figures audit
- [ ] **CORE-EPIC-920** [heavy]🧠 | near-cap-trims-2 — Six budgeted surfaces sit at 95–97% of their caps 18 days after CORE-869.5 trimmed the last such set, so each next edit to them pays a trim first. Discovery supplied by audit-repo 2026-11-24. Surfaced by audit-repo 2026-11-24 (Theme: Budget trims don't hold)
  - [ ] **CORE-920.2** [heavy]🧠 | headroom-spec-modules — Bring `SPEC/post-closure.md` (95%) and `SPEC/tasknote-selection.md` (97%) under their NEAR CAP lines with pointer-not-narrate cuts, ledger rows updated in `docs/CONTEXT-BUDGET.md`.
  - [ ] **CORE-920.3** [heavy]🧠 | headroom-runner-bodies — Same for `SPEC/procedures/ft-task.md` (95%) and `claude/AGENTS-snippet.md` (97%), whose paste-block reaches every adopter's `AGENTS.md` on its next bump.
  - [ ] **CORE-920.4** [heavy]🧠 | headroom-release-skill — Same for `claude/skills/ft-release/SKILL.md` (95%) and the `claude/skills/ft-release/**` directory cap (95%).
  - [ ] **CORE-920.N** [heavy]🧠 | near-cap-trims-2 audit
- [ ] **CORE-EPIC-931** [moderate]🧩 | updater-modules — Split `tools/update-adopters.mjs` (1,671 lines, seven responsibilities) into modules under `tools/update-adopters/`, leaf-first, behind the entry as a re-exporting facade so the CLI path, test imports and CI roster hold (filed via /ft-refactor; plan on the child starters).
  - [x] **CORE-931.2** [moderate]🧩 [unattended] | release-module — Completed 2026-11-24.
  - [x] **CORE-931.3** [light]🔧 [unattended] | workspace-module — Completed 2026-11-24.
  - [ ] **CORE-931.4** [light]🔧 [unattended] | text-module — Move the pure markdown helpers (`fenceOpeners`, Workflow-block and pin-line rewrites, `snippetLinks`, `codexRoster`) to `tools/update-adopters/text.mjs`; the fence and workflow-block fixture cases keep pinning them through the entry.
  - [ ] **CORE-931.5** [moderate]🧩 [unattended] | wiring-module — Move skill wiring (`wiringPlan`, `wireSkills`, dangling-link prune) and audit-fork reads (`auditForks`, `forkPassGaps`, fork drift) to `tools/update-adopters/wiring.mjs`.
  - [ ] **CORE-931.6** [moderate]🧩 [unattended] | check-module — Move `checkAdopter` and `trackedLedgers` to `tools/update-adopters/check.mjs`, gate order and inline shape unchanged (CORE-479's call stands).
  - [ ] **CORE-931.7** [moderate]🧩 [unattended] | apply-module — Move `applyBump`, `followThrough`, `rollbackBump`, `checkoutVerified` and `verifyPinnedSha` to `tools/update-adopters/apply.mjs`; the entry keeps only `parseArgs`, `main`, the report printers and the `isMain` guard.
  - [ ] **CORE-931.8** [moderate]🧩 | entry-docs — Split the 193-line header so each section sits on its module (entry keeps usage, selection, exit codes, module map); repoint SECURITY.md, `SPEC/layout.md`, README and the audit overlay scope line; decide whether the carve-out text names the module directory.
  - [ ] **CORE-931.N** [moderate]🧩 | updater-modules audit
- [ ] **CORE-925** [light]🔧 | just-wire — Add an idempotent `wire` recipe to `justfile` (missing `.claude/skills`, overlay and `.agents/skills` links only; prints dangling links, removes none) and point `CONTRIBUTING.md` §"Developing flaitron skills" at it. Surfaced by audit-structure 2026-11-24 (Finding #8, Medium)

## Low

- [ ] **CORE-927** [light]🔧 [unattended] | epic-audit-drift-line-window — Open a decay window on the `.N` audit's fixed doc-drift Acceptance line: drop it and its "non-negotiable" lead-in from `claude/skills/ft-close-epic/SKILL.md`, keeping the Goal, Subtask walk and Phase 4 sweep; mark `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" as windowed; record the window-start SHA; file the restore-read row (bar: 5 `.N` audits archived after it). Surfaced by audit-context 2026-11-24 (Finding #1, Low).
- [ ] **CORE-928** [light]🔧 | conventions-check-roster — In `docs/CONVENTIONS.md` §"GitHub Actions CI", the "Six checks have neither a source rule nor a catalogue entry" list omits `plan_placeholder`; add it (CORE-918.3: each priority section in `.flaitron/PLAN.md` holds a row or `(none)`, never both, and all five headings exist) and make it seven. Surfaced by CORE-918.3 doc-drift sweep.
- [ ] **CORE-929** [light]🔧 | roster-pin-check-docs — Name the CORE-924 checks where their rules live: `snippet_roster_parity` in `claude/AGENTS-snippet.md` §"One-time symlink wiring" and in place of `step-7.1-standing-checks.md`'s four roster diffs; `coverage_pin` in the `justfile`/`ci.yml` coverage comments; both in `docs/CONVENTIONS.md` §"GitHub Actions CI". Updates: `.flaitron/tasknote/archive/core/CORE-924.md` Phase 4.
- [ ] **CORE-930** [light] | paste-block-fence-crlf — Make `workflowPasteBlock` use `fenceOpeners` (an inner fence truncates the block today) and decide CRLF AGENTS.md endings; pin both in `SPEC/fixtures/workflow-block/cases.json`.
- [ ] **CORE-932** [light] | check-updater-modules — Add `tools/update-adopters/*.mjs` to the `node --check` step in justfile `check`, ci.yml and AGENTS.md §"Validation"; `/ft-release` Pair H pins the roster, so change all together.

## Future Opportunities

(none)

## Completed

- [x] **CORE-921** [heavy]🧠 | updater-followthrough-owner — Completed 2026-11-24.
- [x] **CORE-EPIC-918** [moderate]🧩 | closure-placeholder — Completed 2026-11-24.
  - [x] **CORE-918.2** [light]🔧 [unattended] | closure-none-clause — Completed 2026-11-24.
  - [x] **CORE-918.3** [moderate]🧩 [unattended] | plan-placeholder-check — Completed 2026-11-24.
  - [x] **CORE-918.4** [light]🔧 | codex-closure-none — Completed 2026-11-24.
  - [x] **CORE-918.N** [moderate]🧩 | closure-placeholder audit — Completed 2026-11-24.
- [x] **CORE-926** [light]🔧 [unattended] | layout-flaitron-dirs — Completed 2026-11-24.
- [x] **CORE-924** [moderate]🧩 [unattended] | mirror-parity-checks — Completed 2026-11-24.
- [x] **CORE-923** [moderate]🧩 [unattended] | drift-flag-helper — Completed 2026-11-24.
- [x] **CORE-922** [moderate]🧩 [unattended] | fence-cases — Completed 2026-11-24.
- [x] **CORE-917** [moderate] | arch-health-refresh — Completed 2026-11-24.
- [x] **CORE-916** [moderate] | ft-update-start-marker-stop — Completed 2026-11-24.
- [x] **CORE-915** [heavy] | direct-edit-path — Completed 2026-11-17.
- [x] **CORE-913** [moderate] | seed-grouped-stays — Completed 2026-11-17.
- [x] **CORE-914** [heavy] | fleet-clean-line — Completed 2026-11-17.
- [x] **CORE-912** [moderate]🧩 | release v8.5.0 — Completed 2026-11-14.
- [x] **CORE-908** [light]🔧 | overlay-hostguard-boundary — `.flaitron/audit-overlay/SKILL.md` invariant (2) and the `security:` pass 3 line now name `hostGuard` alongside `allowedHosts` and `originGuard` as the viz dev-server boundary; no tasknote. Completed 2026-11-14.
- [x] **CORE-907** [moderate] | supply-chain-yaml-edges — Completed 2026-11-14. `supply_chain` reads quoted and spaced workflow keys, fails a next-line or null `permissions:`, and skips `run:` values and block-scalar bodies; fetch spellings a line grep cannot see are documented as known limits.
- [x] **CORE-911** [light] | supply-chain-latest-download — Completed 2026-11-14. `supply_chain` fails a `releases/latest/download` URL or a `gh release download` outright, pinned or not. Hoisted-variable and spelled-differently fetches stay with [[CORE-907]].
- [x] **CORE-910** [light] | supply-chain-release-pin — Completed 2026-11-14. `supply_chain` fails a workflow step that fetches a `releases/download` URL without a literal `*_SHA256` env and a `sha256sum -c` in the same step. Follow-ups [[CORE-911]], [[CORE-907]].
- [x] **CORE-909** [light] | gitleaks-step-fleet-shape — Completed 2026-11-14. The gitleaks scan runs once in its own `secret-scan` job on a clean checkout before install, in natabula's spine step shape; `SECURITY.md` caveat dropped. Not yet seen running on GitHub.
- [x] **CORE-905** [light]🔧 | gitleaks-tarball-hash-pin — Completed 2026-11-14. `ci.yml`'s gitleaks step checks the tarball against an in-workflow `GITLEAKS_SHA256` (GitHub asset digest), not the release's own checksums file; `SECURITY.md` claim scoped to match. Follow-ups [[CORE-909]], [[CORE-910]].
- [x] **CORE-903** [light]🔧 | gitleaks-allowlist-rule-scope — Completed 2026-11-14. Each `.gitleaks.toml` allowlist now `targetRules = ["generic-api-key"]`; a `private-key` in a test path fires again. Source fix filed as natabula NAT-618.
- [x] **FE-152** [moderate] | api-host-guard — Completed 2026-11-14. `guarded` 403s any Host / `:authority` not in shared `ALLOWED_HOSTS`, after the peer check; feeds `allowedHosts` + `ALLOWED_ORIGINS`.
- [x] **CORE-904** [moderate] | supply-chain-drift-check — Completed 2026-11-14. bash lists install.sh top-level commands under a skipping DEBUG trap; workflow permissions + SHA pins checked.
- [x] **CORE-906** [light] | overlay-invariant-5-exception — `.flaitron/audit-overlay/SKILL.md` invariant (5) now names `arch-health.yml`'s `report-failure` `issues: write` as the one sanctioned grant, matching `SECURITY.md`. Surfaced by audit-security 2026-11-14 (Finding #5, Low), fixed inline.
- [x] **CORE-902** [light] | install-test-shellcheck-pin — Completed 2026-11-14. Pinned shellcheck 0.11.0 + SHA-256; live CI run not yet observed (needs a push).
- [x] **CORE-897** [heavy] | seeder-fleet-gaps — Completed 2026-11-14. All ten NAT-551 cases landed per operator picks; adds a correction class.
- [x] **CORE-896** [moderate] | grok-block-adoption — Completed 2026-11-14. Adopted the current (v3) public block, not v1.
- [x] **CORE-901** [moderate] | arch-health-adoption — Completed 2026-11-14.
- [x] **CORE-898** [light] | spec-load-header-rosters — `SPEC/starter.md`, `SPEC/tasknote-selection.md` and `SPEC/model.md` load headers now name `/ft-import-task` (and `starter.md` names `/ft-file-task --starter`). Surfaced by audit-docs 2026-11-10 (Finding #1, Medium), fixed inline.
- [x] **CORE-899** [light] | glossary-count-stamp — README no longer restates the glossary term count (was 73, 74 on disk); `docs/GLOSSARY.md` last-update stamp cites CORE-895's `/ft-import-task` entry. Surfaced by audit-docs 2026-11-10 (Finding #2, Low), fixed inline.
- [x] **CORE-900** [light] | overlay-reconciled-pin — `.flaitron/audit-overlay/SKILL.md` `flaitron-reconciled:` v8.3.0 → v8.4.0 (scaffold diff is brand-casing only). Surfaced by audit-docs 2026-11-10 (Finding #3, Low), fixed inline.
- [x] **CORE-895** [heavy] | ft-import-task — Completed 2026-11-08.
- [x] **CORE-893** [moderate] | dogfood-render-outcome — Completed 2026-11-08.
- [x] **CORE-894** [heavy] | release-midcut-defect-ask — Completed 2026-11-08.
- [x] **CORE-892** [moderate] | release v8.4.0 — Completed 2026-11-08.
- [x] **CORE-864** [light] | release-note-heading-casing — Completed 2026-11-08.
- [x] **CORE-866** [moderate] | handoff-row-drift-check — Completed 2026-11-08.
- [x] **CORE-877** [moderate] | refactor-reconcile-gate — Completed 2026-11-08.
- [x] **CORE-891** [moderate] | near-cap-small-unit-rows — Completed 2026-11-08.
