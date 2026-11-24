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


## Low

- [ ] **CORE-917** [moderate] | arch-health-refresh — Bring CORE-901's arch-health up to natabula NAT-645/646 (a self-host has no `.flaitron/core`, so the wave can't reach it): upload the artifact on success only; report-failure fires on a failed or cancelled (timed-out) scheduled run; AGENTS.md pointer becomes its own `## Repo map` section with `rm -rf arch && gh run download …` and a no-artifact fallback; `.gitignore` line anchored to `/arch/`. From natabula NAT-651.

## Future Opportunities


## Completed

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
- [x] **CORE-890** [moderate] | budget-other-templates — Completed 2026-11-08.
- [x] **CORE-889** [light] | cursor-grok-wiring-wording — Completed 2026-11-08.
- [x] **CORE-888** [light]🔧 | overlay-installer-invariants — Completed 2026-11-08.
- [x] **CORE-881** [moderate] [unattended] | budget-shipped-surfaces — Completed 2026-11-07.
- [x] **CORE-880** [light] [unattended] | sparse-size-figures — Completed 2026-11-07.
- [x] **CORE-879** [light] [unattended] | roster-args-deep-flag — Completed 2026-11-07.
- [x] **CORE-878** [light] [unattended] | grok-codex-wiring-wording — Completed 2026-11-07.
- [x] **CORE-876** [moderate]🧩 | ft-task-sop-reverify — Completed 2026-11-07.
- [x] **CORE-874** [light]🔧 | audit-overlay-refresh — Completed 2026-11-07.
- [x] **CORE-875** [light]🔧 | security-ci-coverage-job — Completed 2026-11-07.
- [x] **CORE-882** [light]🔧 | close-epic-plain-mv — `/ft-close-epic` Step 7 archives the untracked audit note with plain `mv`, not `git mv`. Surfaced by audit-docs 2026-11-07 (Finding #1, High), fixed inline.
- [x] **CORE-883** [light]🔧 | release-stages-readme — `/ft-release` §7.4 `git add`, §3 Acceptance and the line-8 recipe now include `README.md` (line 8 also `SECURITY.md`). Surfaced by audit-docs 2026-11-07 (Finding #2, High), fixed inline.
- [x] **CORE-884** [light]🔧 | skill-step-pointers — five stale step/section pointers corrected (`ft-adopt` Step 0 precondition, `ft-task` preamble "above", `step-3a` clarifying-questions item, `step-7.1-standing-checks` awk bound, `ft-open-epic` resume-entry scope) and `step-5.5-deep-prepass`'s misquote of SPEC replaced with a `SPEC/gates.md` §"Operator-gate cues" citation. Surfaced by audit-docs 2026-11-07 (Findings #4, #5, Low), fixed inline.
- [x] **CORE-885** [light]🔧 | loop-max-closure-clause — `step-5-loop-mode.md` Step 6 no longer implies a `loop-max` soft stop auto-closes. Surfaced by audit-docs 2026-11-07 (Finding #6, Medium), fixed inline.
- [x] **CORE-886** [light]🔧 | doc-crossref-fixes — `SPEC/scope-boundaries.md` security mirror matches the VISION heading; `docs/DOC-DRIFT-SWEEP.md` "above" pointers cite the tasknote README; README §"Repo layout" lists doc-drift-sweep. Surfaced by audit-docs 2026-11-07 (Findings #10, #11, #12, Low), fixed inline.
- [x] **CORE-887** [light]🔧 | stale-doc-figures — `docs/CONTEXT-BUDGET.md` `ft-task/SKILL.md` figure and cold-start sum (23,824; 106,657) in both places plus the CORE-865 entry, largest-body name dropped; `docs/GLOSSARY.md` last-update stamp. Surfaced by audit-docs 2026-11-07 (Findings #15, #20, Medium), fixed inline.
- [x] **CORE-865** [light]🔧 | agents-md-repo-layout-trim — `AGENTS.md` §"Repo Layout" cut from a file-by-file map to a pointer plus eight must-know bullets (prose outside `## Workflow` 108 → 91, under natabula's 100 budget); `docs/CONTEXT-BUDGET.md` `AGENTS.md` row 10,324 → 8,628. Completed 2026-11-06.
- [x] **CORE-870** [light]🔧 | near-cap-release-note — `step-7.1-standing-checks.md` now says a non-failing `NEAR CAP` line before `context_budget ok` needs no action; no tasknote. Completed 2026-11-06.
- [x] **CORE-873** [light]🔧 | unchecked-stub-row-check — Completed 2026-11-06.
- [x] **CORE-871** [light]🔧 | flaky-only-b-assertion — Completed 2026-11-06.
- [x] **CORE-EPIC-868** [heavy]🧠 | gate-blind-spots — Completed 2026-11-06.
  - [x] **CORE-868.2** [moderate]🧩 [unattended] | installer-anchor-drift-check — Completed 2026-11-06.
  - [x] **CORE-868.3** [moderate]🧩 | release-installs-new-tag — Completed 2026-11-06.
  - [x] **CORE-868.4** [light]🔧 | dependabot-minimatch-alert — Completed 2026-11-06.
  - [x] **CORE-868.N** [heavy]🧠 | gate-blind-spots audit — Completed 2026-11-06.
