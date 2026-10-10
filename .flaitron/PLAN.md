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

- [ ] **CORE-EPIC-776** [heavy]🧠 | closure-contract-coherence — Discovery supplied by audit-repo 2026-10-10. Surfaced by audit-repo 2026-10-10 (Theme: Semantic SPEC↔skill drift)
  - [x] **CORE-776.2** [light]🔧 [unattended] | micro-recap-no-wait — Completed 2026-10-10.
  - [x] **CORE-776.3** [light]🔧 [unattended] | refactor-fast-label — Completed 2026-10-10.
  - [x] **CORE-776.4** [light]🔧 [unattended] | epic-second-audit — Completed 2026-10-10.
  - [ ] **CORE-776.5** [frontier]💎 | micro-unattended-review — `/ft-micro-task --unattended` runs no External review and no 👁️ check, yet `SPEC/gate-postures.md` §"What `--unattended` never relaxes" holds External review "on every path"; decide micro's posture (review probe + park on a rendered surface, or a terminal stop routing to `/ft-task`), then align gate-postures, `claude/skills/ft-task/unattended-mode.md`, and `docs/EXTERNAL-AGENTS.md`.
  - [ ] **CORE-776.6** [heavy]🧠 | id-allocation-home — ID allocators (`ft-file-task`, `ft-open-epic`, `ft-refactor`, `ft-audit`, `ft-audit-repo`) never scan `.flaitron/PLAN-ARCHIVE.md` (79 fixed-inline rows live only there), `ft-open-epic`/`ft-refactor` derive `archive/<area>/` instead of the README §"Archive layout" lookup, and `ft-file-task` skips epic numbers; add one `SPEC/plan-filing.md` §"ID allocation" and cite it from each skill (`ft-open-epic` has ~345 B of budget headroom, so the citation must net-shrink it).
  - [ ] **CORE-776.N** [heavy]🧠 | closure-contract-coherence audit
- [ ] **FE-EPIC-127** [medium]🧩 | viz-failure-paths — Discovery supplied by audit-repo 2026-10-10. Surfaced by audit-repo 2026-10-10 (Theme: viz dev-server failure paths)
  - [ ] **FE-127.2** [light]🔧 [unattended] | devapi-guarded-catch — `viz/src/devApi.ts` `guarded` awaits the handler with no catch and `projectFromQuery` calls `new URL` outside any try, so `GET /api/plan//a:99999` is an unhandled rejection that exits the Vite process; catch in `guarded` (log; 500, or destroy if headers are sent), return 400 from `projectFromQuery` on a bad URL, and test that the malformed request gets a status.
  - [ ] **FE-127.3** [light]🔧 [unattended] | viz-boundary-claims — `SECURITY.md` §Visualizer says the server binds localhost only and confines reads to `*/.flaitron/`; code relies on Vite's default bind and confines to the project-root realpath (`.flaitron/core` may be a symlinked checkout). Add a loopback `req.socket.remoteAddress` check to `guarded` (+ test) and correct the confinement sentence to the enforced boundary.
  - [ ] **FE-127.4** [medium]🧩 [unattended] | watch-late-dirs — when `tasknote/` or `tasknote/archive/` is absent at dev-server start, chokidar watches the parent and counts depth from there, so later notes never fire (`viz/src/flaitronWatch.ts` + `watchSet.ts`); watch each project's `.flaitron/` root with the depth and `ignored` reach re-anchored, and test creating the archive dir after start.
  - [ ] **FE-127.N** [medium]🧩 | viz-failure-paths audit

## Low



- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.
- [ ] **CORE-774** [light]🔧 | single-model-restore-read — Restore-read for [[CORE-773]]'s decay window (start SHA `b7106192`): read the tasknotes archived after that SHA; if any of the next 10 shows a cross-model resume degrading the work, restore the "no swapping mid-task" paragraph in `SPEC/model.md` (`git show b7106192:SPEC/model.md`, lines 42-45); otherwise record the clean read and close.

## Future Opportunities

(none)

## Completed

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
- [x] **CORE-EPIC-769** [heavy]🧠 | skill-surface — Completed 2026-10-09.
  - [x] **CORE-769.1** [heavy]🧠 | skill-surface discovery — Completed 2026-10-09.
  - [x] **CORE-769.2** [heavy]🧠 | retire-command-wrappers — Completed 2026-10-09.
  - [x] **CORE-769.3** [medium]🧩 | rename-file-task — Completed 2026-10-09.
  - [x] **CORE-769.4** [medium]🧩 | rename-open-epic — Completed 2026-10-09.
  - [x] **CORE-769.5** [medium]🧩 | rename-adopt — Completed 2026-10-09.
  - [x] **CORE-769.6** [medium]🧩 | rename-seed-unattended — Completed 2026-10-09.
  - [x] **CORE-769.7** [heavy]🧠 | rename-migrate-mode — Completed 2026-10-09.
  - [x] **CORE-769.N** [heavy]🧠 | skill-surface audit — Completed 2026-10-09.
- [x] **CORE-EPIC-768** [heavy]🧠 | plan-auto-rotate — Completed 2026-10-09.
  - [x] **CORE-768.1** [frontier]💎 | plan-auto-rotate discovery — Completed 2026-10-09.
  - [x] **CORE-768.2** [heavy]🧠 | auto-rotate-contract — Completed 2026-10-09.
  - [x] **CORE-768.3** [medium]🧩 | rotation-advisory-retire — Completed 2026-10-09.
  - [x] **CORE-768.4** [heavy]🧠 | epic-parent-auto-flip — Completed 2026-10-09.
  - [x] **CORE-768.N** [heavy]🧠 | plan-auto-rotate audit — Completed 2026-10-09.
- [x] **CORE-683** [medium]🧩 | epic-forward-restore — Completed 2026-10-09.
- [x] **CORE-727** [medium]🧩 | decay-window-restore — Completed 2026-10-09.
- [x] **CORE-767** [medium]🧩 | release v6.1.0 — Completed 2026-10-09.
- [x] **CORE-747** [medium]🧩 | codex-audit-overlay-path — Completed 2026-10-08.
- [x] **CORE-745** [medium]🧩 [unattended] | docs-audit-single-source — Completed 2026-10-08.
- [x] **CORE-750** [light]🔧 | release-budget-ratchet — Completed 2026-10-08.
- [x] **CORE-766** [light]🔧 | epic-discovery-model-clause — Completed 2026-10-08.
- [x] **CORE-746** [light]🔧 [unattended] | frontier-sweep-gaps — Completed 2026-10-08.
- [x] **CORE-749** [light]🔧 [unattended] | pair-q-wrapped-citations — Completed 2026-10-08.
- [x] **CORE-748** [light]🔧 [unattended] | audit-scaffold-self-refs — Completed 2026-10-08.
- [x] **CORE-743** [light]🔧 [unattended] | maintainer-wiring-glob — Completed 2026-10-08.
- [x] **CORE-744** [medium]🧩 [unattended] | skill-frontmatter-yaml — Completed 2026-10-08.
- [x] **CORE-765** [light]🔧 | dogfood-version-line — `docs/DOGFOOD.md` reads the version from `SPEC.md`'s `**Version:**` line, not "line 1". Surfaced by audit-docs 2026-10-08 (Finding #24, Low), fixed inline.

- [x] **CORE-764** [light]🔧 | layout-plan-archive — `SPEC/layout.md` adopter tree lists the optional `PLAN-ARCHIVE.md`. Surfaced by audit-docs 2026-10-08 (Finding #23, Low), fixed inline.

- [x] **CORE-763** [light]🔧 | candidacy-pair-n-owner — `SPEC/unattended-candidacy.md` says Pair N checks the literal and a labeled mirror and Pair Q resolves the label. Surfaced by audit-docs 2026-10-08 (Finding #22, Low), fixed inline.

- [x] **CORE-762** [light]🔧 | gate-discipline-scope — `docs/GATE-DISCIPLINE.md` scope sentence names all three homes — `SPEC/gates.md`, `SPEC/gate-postures.md`, `SPEC/cue-vocabulary.md`. Surfaced by audit-docs 2026-10-08 (Finding #21, Low), fixed inline.
