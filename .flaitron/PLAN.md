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

- [ ] **CORE-EPIC-920** [heavy]🧠 | near-cap-trims-2 — Six budgeted surfaces sit at 95–97% of their caps 18 days after CORE-869.5 trimmed the last such set, so each next edit to them pays a trim first. Discovery supplied by audit-repo 2026-11-24. Surfaced by audit-repo 2026-11-24 (Theme: Budget trims don't hold)
  - [ ] **CORE-920.2** [heavy]🧠 | headroom-spec-modules — Bring `SPEC/post-closure.md` (95%) and `SPEC/tasknote-selection.md` (97%) under their NEAR CAP lines with pointer-not-narrate cuts, ledger rows updated in `docs/CONTEXT-BUDGET.md`.
  - [ ] **CORE-920.3** [heavy]🧠 | headroom-runner-bodies — Same for `SPEC/procedures/ft-task.md` (95%) and `claude/AGENTS-snippet.md` (97%), whose paste-block reaches every adopter's `AGENTS.md` on its next bump.
  - [ ] **CORE-920.4** [heavy]🧠 | headroom-release-skill — Same for `claude/skills/ft-release/SKILL.md` (95%) and the `claude/skills/ft-release/**` directory cap (95%).
  - [ ] **CORE-920.N** [heavy]🧠 | near-cap-trims-2 audit

## Low

- [ ] **CORE-933** [light]🔧 | epic-audit-drift-line-restore-read — Blocked by decay-window depth: once 5 `.N` audit tasknotes archive after window-start `f2887f37` (CORE-927), check whether any missed cumulative doc-drift the Phase 4 sweep did not catch; if one did, restore the Acceptance line in `claude/skills/ft-close-epic/SKILL.md` and un-window `SPEC/epic.md`; otherwise close the window.
- [ ] **CORE-935** [light] | updater-node-guard-order — The Node ≥20 guard in `tools/update-adopters.mjs` now runs after six static module imports load; move it into a first-imported module or drop it.

## Future Opportunities

(none)

## Completed

- [x] **CORE-EPIC-919** [moderate]🧩 | derived-figures — Completed 2026-11-24.
  - [x] **CORE-919.2** [light]🔧 [unattended] | overlay-figures-to-commands — Completed 2026-11-24.
  - [x] **CORE-919.3** [heavy]🧠 | reconciled-pin-guard — Completed 2026-11-24.
  - [x] **CORE-919.4** [light]🔧 | overlay-markdown-counts — Completed 2026-11-24.
  - [x] **CORE-919.N** [moderate]🧩 | derived-figures audit — Completed 2026-11-24.
- [x] **CORE-938** [light] | paste-block-heading-anchor — Completed 2026-11-24.
- [x] **CORE-937** [light] | paste-block-opener-strict — Completed 2026-11-24.
- [x] **CORE-930** [light] | paste-block-fence-crlf — Completed 2026-11-24.
- [x] **CORE-934** [light] | fixed-drift-labels — Completed 2026-11-24.
- [x] **CORE-925** [light]🔧 | just-wire — Completed 2026-11-24.
- [x] **CORE-929** [light]🔧 | roster-pin-check-docs — Completed 2026-11-24.
- [x] **CORE-928** [light]🔧 | conventions-check-roster — Added `plan_placeholder` to the "no source rule nor catalogue entry" list in `docs/CONVENTIONS.md` and made it seven; no tasknote. Completed 2026-11-24.
- [x] **CORE-936** [light] | roster-covers-modules — Completed 2026-11-24.
- [x] **CORE-932** [light] | check-updater-modules — Completed 2026-11-24.
- [x] **CORE-EPIC-931** [moderate]🧩 | updater-modules — Completed 2026-11-24.
  - [x] **CORE-931.2** [moderate]🧩 [unattended] | release-module — Completed 2026-11-24.
  - [x] **CORE-931.3** [light]🔧 [unattended] | workspace-module — Completed 2026-11-24.
  - [x] **CORE-931.4** [light]🔧 [unattended] | text-module — Completed 2026-11-24.
  - [x] **CORE-931.5** [moderate]🧩 [unattended] | wiring-module — Completed 2026-11-24.
  - [x] **CORE-931.6** [moderate]🧩 [unattended] | check-module — Completed 2026-11-24.
  - [x] **CORE-931.7** [moderate]🧩 [unattended] | apply-module — Completed 2026-11-24.
  - [x] **CORE-931.8** [moderate]🧩 | entry-docs — Completed 2026-11-24.
  - [x] **CORE-931.N** [moderate]🧩 | updater-modules audit — Completed 2026-11-24.
- [x] **CORE-927** [light]🔧 [unattended] | epic-audit-drift-line-window — Completed 2026-11-24.
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
