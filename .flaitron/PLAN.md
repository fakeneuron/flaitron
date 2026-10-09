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

- [ ] **CORE-EPIC-769** [heavy]🧠 | skill-surface — Rethink how flaitron skills are named, bundled, and installed before the next release: default wiring vs fork/global-only policy, renames, roster add/retire, and packaging channel. .1 may split this into two epics.
  - [ ] **CORE-769.1** [heavy]🧠 | skill-surface discovery — Discovery: survey skill naming, bundling, and install policy — why ft-audit is fork-only and ft-audit-repo/ft-new-project global-only, ft-file-followup → ft-file-task and peer renames, roster additions/retirements, plugin vs submodule-symlink packaging; file children, or two epics if warranted. Filed with starter at `.flaitron/tasknote/CORE-769.1.md`.
  - [ ] **CORE-769.N** [heavy]🧠 | skill-surface audit — Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line). Filed with the reserved terminal `.N` suffix.

## Low



- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

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

- [x] **CORE-761** [light]🔧 | migration-overlay-size — `docs/MIGRATION.md` §1.2.1 calls the thin overlay a short SKILL.md (~70-line template), not ~25 lines. Surfaced by audit-docs 2026-10-08 (Finding #20, Low), fixed inline.

- [x] **CORE-760** [light]🔧 | glossary-stamp-order — `docs/GLOSSARY.md` Maintenance stamp reads CORE-741.2 (2026-10-08) and the `sidequest` entry moves to its alphabetical slot after `shortname`. Surfaced by audit-docs 2026-10-08 (Finding #19, Low), fixed inline.

- [x] **CORE-759** [light]🔧 | agents-drift-command — `AGENTS.md` §"Validation" names `bash tools/drift-checks.sh` as the drift job's full run and the local check after markdown edits, in place of "additionally runs Pair R". Surfaced by audit-docs 2026-10-08 (Finding #17, Medium), fixed inline.

- [x] **CORE-758** [light]🔧 | budget-headroom-741 — `docs/CONTEXT-BUDGET.md` glob row reads `ft-epic-discovery` 32,663 / ~340 headroom, cap history gains CORE-741.4 entries for the glob and `SPEC/procedures/ft-task.md` (33,842), and §"Ledger" is "above". Surfaced by audit-docs 2026-10-08 (Finding #16, Medium), fixed inline.

- [x] **CORE-757** [light]🔧 | selection-loader-list — `SPEC/tasknote-selection.md` loader header lists `/ft-refactor` and drops `/ft-close-epic` / `/ft-release`, which never cite it. Surfaced by audit-docs 2026-10-08 (Finding #15, Low), fixed inline.

- [x] **CORE-756** [light]🔧 | cue-vocab-glossary-ptr — `SPEC/cue-vocabulary.md` points at `SPEC.md` §"Operator-gate cues" and `docs/GLOSSARY.md` instead of the removed at-a-glance glossary. Surfaced by audit-docs 2026-10-08 (Finding #14, Low), fixed inline.

- [x] **CORE-755** [light]🔧 | probe-template-paths — `templates/subagent-probe-template.md` cites its contract as `.flaitron/core/SPEC.md` / `.flaitron/core/README.md`, so an adopter no longer reads its own README. Surfaced by audit-docs 2026-10-08 (Finding #13, Low), fixed inline.

- [x] **CORE-754** [light]🔧 | ai-ref-exclusions — `.flaitron/tasknote/README.md` §"AI-referenced docs" exclusions grow to eight `docs/` files (`CODEX-VERIFICATION.md`, `HARNESS-SURVEY.md` as dated records; `GATE-DISCIPLINE.md` as a teaching doc owned by `SPEC/gates.md` + `SPEC/gate-postures.md`) and the volume counts read ~5,500 vs ~4,200 lines. Surfaced by audit-docs 2026-10-08 (Finding #10, Medium), fixed inline.

- [x] **CORE-753** [light]🔧 | postclosure-audit-fork — `SPEC/post-closure.md` limits the unprefixed-local-fork rule to a forked `/ft-audit`; `/ft-audit-repo` keeps its name. Surfaced by audit-docs 2026-10-08 (Finding #8, Medium), fixed inline.

- [x] **CORE-752** [light]🔧 | security-allowlist-sources — `SECURITY.md` §"Adopter scanner false-positive allowlists" names the files that actually carry the keywords (`SPEC/gates.md`, `docs/GATE-DISCIPLINE.md`, `docs/GLOSSARY.md`, `SECURITY.md`, the un-sparsed `.flaitron/` archive) and its example lines match. Surfaced by audit-docs 2026-10-08 (Finding #4, Medium), fixed inline.

- [x] **CORE-751** [light]🔧 | overlay-drift-gates — `.flaitron/audit-overlay/SKILL.md`: unkeyed scope adds `tools/drift-checks.sh`, unkeyed gates add `node --test tools/drift-checks.test.mjs` (citation now `ci.yml:33-41`), and the `docs:` gate is `bash tools/drift-checks.sh pair_q final_newline context_budget` in place of the stale "not a locally invokable command" none. Surfaced by audit-docs 2026-10-08 (Finding #3, Medium), fixed inline.

- [x] **CORE-EPIC-742** [medium]🧩 | contract-guard-gaps — Completed 2026-10-08.
  - [x] **CORE-742.2** [medium]🧩 [unattended] | sidequest-orphan-guard — Completed 2026-10-08.
  - [x] **CORE-742.3** [light]🔧 | sidequest-promoted-guard — Completed 2026-10-08.
  - [x] **CORE-742.N** [medium]🧩 | contract-guard-gaps audit — Completed 2026-10-08.
- [x] **CORE-EPIC-741** [heavy]🧠 | effort-tiers — Completed 2026-10-08.
  - [x] **CORE-741.1** [heavy]🧠 | effort-tiers discovery — Completed 2026-10-08.
  - [x] **CORE-741.2** [heavy]🧠 | frontier-rung-contract — Completed 2026-10-08.
  - [x] **CORE-741.3** [medium]🧩 | platform-effort-map — Completed 2026-10-08.
  - [x] **CORE-741.4** [heavy]🧠 | routing-skill-sweep — Completed 2026-10-08.
  - [x] **CORE-741.5** [medium]🧩 | viz-frontier-tier — Completed 2026-10-08.
  - [x] **CORE-741.N** [heavy]🧠 | effort-tiers audit — Completed 2026-10-08.
- [x] **CORE-740** [light]🔧 [unattended] | drift-floor-coverage — Completed 2026-10-08.
