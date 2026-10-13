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

- [ ] **CORE-EPIC-783** [heavy]🧠 | unattended-prep — Attended /ft-prep-unattended classifies declined rows, pins a fact or splits a mechanical child plus an attended remainder, and files starters without writing [unattended]. /ft-seed-unattended stays the marker walk. Clause 3 keeps its keyword screen plus an LLM decline on a person-shaped row. Caobunga mirror is a handoff.
  - [x] **CORE-783.1** [frontier]💎 | unattended-prep discovery — Completed 2026-10-13.
  - [ ] **CORE-783.2** [heavy]🧠 | candidacy-prep-boundary — Pin clause 3 as two layers: the keyword list stays the mechanical screen, and a keyword miss is not a semantic pass. An LLM filer and /ft-prep-unattended decline a row that reads as needing a person. No new visual keywords. Caobunga's mirror is a handoff.
  - [ ] **CORE-783.3** [heavy]🧠 | prep-unattended-skill — Add attended flagless /ft-prep-unattended. It classifies declined rows, pins a fact, splits a mechanical child from an attended remainder, and files starters. It never writes [unattended]. Ship it in the adopter subset beside seed.
  - [ ] **CORE-783.N** [heavy]🧠 | unattended-prep audit — Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line). Filed now with the reserved terminal `.N` suffix (never renumbers as children are added).

## Low



- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

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
