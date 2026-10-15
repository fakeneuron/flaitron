# Flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
in fintown, InvisiPaw, and photard.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

(none)

## Medium

- [ ] **CORE-798** [heavy]🧠 | prep-guard-wording — Tighten SPEC/unattended-candidacy.md §"Preparing declined rows": a pin clears a clause-3 cue only with an existing test command that decides that result (a generic runner or a path-tripped keyword stays), and a split's mechanical row never consumes the person act's result. Surfaced by CORE-797 dry-run 2026-10-15.
- [ ] **CORE-799** [medium]🧩 | prep-split-collisions — /ft-prep-unattended Step 2 splits: on an epic whose audit is a legacy numeric child (no `.N`), the next `.k` lands after the audit and clause 6 cycles; a source ID with a `.flaitron/sidequest/` stub gets a starter, failing `sidequest_orphan`. Classify both as stay. Surfaced by CORE-797 dry-run 2026-10-15.

## Low



- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

- [x] **CORE-797** [heavy]🧠 | prep-unattended-dryrun — Completed 2026-10-15.
- [x] **CORE-796** [medium]🧩 | release v7.1.0 — Completed 2026-10-15.
- [x] **CORE-791** [light]🔧 | frontier-grok-wording — Completed 2026-10-15.
- [x] **CORE-790** [light]🔧 | doc-nit-sweep — Completed 2026-10-15.
- [x] **CORE-792** [light]🔧 | budget-cap-cell — Reword the `claude/skills/*/SKILL.md` Budgets cell in docs/CONTEXT-BUDGET.md to cite §"Skill bodies" instead of restating byte counts that disagreed with the ledger. Surfaced by audit-docs 2026-10-15 (Finding #1, Medium), fixed inline.
- [x] **CORE-793** [light]🔧 | budget-large-refs — Re-measure docs/CONTEXT-BUDGET.md §"Large reference docs" (PLATFORMS 59,973 · MIGRATION 67,201, 2026-10-15) and make its refresh-policy sentence and the §Ledger intro agree: hand-refreshed, outside the §7.1 block. Surfaced by audit-docs 2026-10-15 (Finding #2, Low), fixed inline.
- [x] **CORE-794** [light]🔧 | vision-mirror-list — Correct the docs/VISION.md mirror list and count in .flaitron/tasknote/README.md §"AI-referenced docs" to the five surfaces docs/VISION.md §"What we won't accept" names. Surfaced by audit-docs 2026-10-15 (Finding #3, Medium), fixed inline.
- [x] **CORE-795** [light]🔧 | upgrading-v7-pointer — Append a forward pointer from docs/UPGRADING.md's v5.x recipe to docs/MIGRATION.md §"Upgrading to v7.0.0 (skill renames)". Surfaced by audit-docs 2026-10-15 (Finding #7, Low), fixed inline.
- [x] **CORE-789** [heavy] | codex-wiring-bootstrap — Completed 2026-10-14.

- [x] **CORE-788** [heavy] | brand-pilot-provenance — Completed 2026-10-14.

- [x] **CORE-787** [medium]🧩 | overlay-reconcile-pin — Completed 2026-10-13.
- [x] **CORE-784** [light]🔧 | glossary-archetype-pointer — Point the PR / suggestion archetypes glossary entry at SPEC/scope-boundaries.md §"PR / suggestion archetypes flaitron does not accept". Surfaced by audit-docs 2026-10-13 (Finding #1, Medium), fixed inline.
- [x] **CORE-785** [light]🔧 | budget-epic-wikilink — Retarget the ft-release directory budget history wikilink from [[CORE-734]] to [[CORE-EPIC-734]]. Surfaced by audit-docs 2026-10-13 (Finding #2, Medium), fixed inline.
- [x] **CORE-786** [light]🔧 | glossary-maintenance-stamp — Set the glossary maintenance line to CORE-783.3 (2026-10-13). Surfaced by audit-docs 2026-10-13 (Finding #4, Low), fixed inline.
- [x] **CORE-EPIC-783** [heavy]🧠 | unattended-prep — Completed 2026-10-13.
  - [x] **CORE-783.1** [frontier]💎 | unattended-prep discovery — Completed 2026-10-13.
  - [x] **CORE-783.2** [heavy]🧠 | candidacy-prep-boundary — Completed 2026-10-13.
  - [x] **CORE-783.3** [heavy]🧠 | prep-unattended-skill — Completed 2026-10-13.
  - [x] **CORE-783.N** [heavy]🧠 | unattended-prep audit — Completed 2026-10-13.
- [x] **CORE-782** [medium]🧩 | rotation-receipt — Completed 2026-10-12.
- [x] **CORE-781** [medium]🧩 | auto-priority — Completed 2026-10-12.
- [x] **CORE-780** [medium]🧩 [unattended] | sop-recheck-ft-task — Completed 2026-10-11.
- [x] **CORE-779** [medium]🧩 | release v7.0.0 — Completed 2026-10-11.
- [x] **CORE-774** [light]🔧 | single-model-restore-read — Completed 2026-10-11.
- [x] **FE-128** [light] | viz-host-pin — Completed 2026-10-11.
- [x] **FE-EPIC-127** [medium]🧩 | viz-failure-paths — Completed 2026-10-11.
  - [x] **FE-127.2** [light]🔧 [unattended] | devapi-guarded-catch — Completed 2026-10-11.
  - [x] **FE-127.3** [light]🔧 [unattended] | viz-boundary-claims — Completed 2026-10-11.
  - [x] **FE-127.4** [medium]🧩 [unattended] | watch-late-dirs — Completed 2026-10-11.
  - [x] **FE-127.N** [medium]🧩 | viz-failure-paths audit — Completed 2026-10-11.
- [x] **CORE-EPIC-778** [frontier]💎 | micro-fold-in — Completed 2026-10-10.
  - [x] **CORE-778.1** [frontier]💎 | micro-fold-in discovery — Completed 2026-10-10.
  - [x] **CORE-778.2** [heavy]🧠 | micro-flag — Completed 2026-10-10.
  - [x] **CORE-778.3** [medium]🧩 | runner-retire — Completed 2026-10-10.
  - [x] **CORE-778.4** [heavy]🧠 | contract-reconcile — Completed 2026-10-10.
  - [x] **CORE-778.5** [light]🔧 | docs-sweep — Completed 2026-10-10.
  - [x] **CORE-778.N** [heavy]🧠 | micro-fold-in audit — Completed 2026-10-10.
- [x] **CORE-EPIC-776** [heavy]🧠 | closure-contract-coherence — Completed 2026-10-10.
  - [x] **CORE-776.2** [light]🔧 [unattended] | micro-recap-no-wait — Completed 2026-10-10.
  - [x] **CORE-776.3** [light]🔧 [unattended] | refactor-fast-label — Completed 2026-10-10.
  - [x] **CORE-776.4** [light]🔧 [unattended] | epic-second-audit — Completed 2026-10-10.
  - [x] **CORE-776.5** [frontier]💎 | micro-unattended-review — Completed 2026-10-10.
  - [x] **CORE-776.6** [heavy]🧠 | id-allocation-home — Completed 2026-10-10.
  - [x] **CORE-776.N** [heavy]🧠 | closure-contract-coherence audit — Completed 2026-10-10.
- [x] **CORE-777** [medium] | ignored-skill-link-paths — Completed 2026-10-10.
- [x] **CORE-EPIC-775** [medium]🧩 | v7-bump-safety — Completed 2026-10-10.
  - [x] **CORE-775.2** [medium]🧩 [unattended] | bump-rollback-staging — Completed 2026-10-10.
  - [x] **CORE-775.3** [light]🔧 [unattended] | migrate-staging-guards — Completed 2026-10-10.
  - [x] **CORE-775.N** [medium]🧩 | v7-bump-safety audit — Completed 2026-10-10.
- [x] **CORE-773** [light]🔧 [unattended] | single-model-decay-window — Completed 2026-10-10.
- [x] **CORE-771** [light]🔧 [unattended] | roster-flag-guard — Completed 2026-10-10.
- [x] **CORE-772** [light]🔧 | skill-wiring-v7 — Re-wired gitignored `.claude/skills/` after CORE-769's renames: removed four dangling links (`ft-epic-discovery`, `ft-file-followup`, `ft-new-project`, `ft-seed`) and linked `ft-adopt`, `ft-file-task`, `ft-open-epic`, `ft-seed-unattended`. Surfaced by audit-context 2026-10-10 (Finding #2, Medium), fixed inline.
- [x] **CORE-EPIC-770** [heavy]🧠 | global-layer-alignment — Completed 2026-10-09.
  - [x] **CORE-770.1** [frontier]💎 | global-layer-alignment discovery — Completed 2026-10-09.
  - [x] **CORE-770.2** [light]🔧 | memory-refresh — Completed 2026-10-09.
  - [x] **CORE-770.3** [medium]🧩 | global-standards-diff — Completed 2026-10-09.
  - [x] **CORE-770.4** [light]🔧 | natabula-v7-handoff — Completed 2026-10-09.
  - [x] **CORE-770.N** [heavy]🧠 | global-layer-alignment audit — Completed 2026-10-09.
