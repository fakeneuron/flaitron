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

- [ ] **CORE-903** [light]🔧 | gitleaks-allowlist-rule-scope — `.gitleaks.toml`'s three path allowlists skip every rule, so a `private-key` hit in a `*.test.ts`, `*.example` or archived tasknote passes CI; add `targetRules = ["generic-api-key"]` to each (verified on 8.30.1, tree stays clean) and fix the comment; natabula's baseline, which this copy is deposited from, needs the same change. Surfaced by audit-security 2026-11-14 (Finding #1, Medium).
- [ ] **FE-152** [moderate]🧩 [unattended] | api-host-guard — `/api/*` leans on Vite's `allowedHosts` middleware running ahead of plugin middleware for DNS-rebinding defence; add a Host-header allowlist check to `guarded` in `viz/src/devApi.ts` with tests, and update `SECURITY.md`'s bullet. Surfaced by audit-security 2026-11-14 (Finding #2, Medium).
- [ ] **CORE-904** [moderate]🧩 [unattended] | supply-chain-drift-check — Nothing in CI enforces sacred invariant (5); add a `tools/drift-checks.sh` check (seeded cases in `tools/drift-checks.test.mjs`) asserting `install.sh` keeps only assignments and a final `main "$@"` at top level, and every workflow keeps `permissions:` plus 40-hex `uses:` pins. Surfaced by audit-security 2026-11-14 (Finding #3, Medium).

## Low

- [ ] **CORE-905** [light]🔧 | gitleaks-tarball-hash-pin — `ci.yml` verifies the gitleaks tarball against a checksums file from the same release; pin its SHA-256 in the workflow as `install-test.yml` does for shellcheck, and correct `SECURITY.md`'s "swapped tarball" claim. Surfaced by audit-security 2026-11-14 (Finding #4, Low).

## Future Opportunities


## Completed

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
