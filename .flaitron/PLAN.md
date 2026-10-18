# Flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

(none)

## Medium

(none)

## Low



- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

- [x] **CORE-809** [medium]🧩 | release v7.2.0 — Completed 2026-10-18.
- [x] **CORE-803** [light]🔧 [unattended] | release-ci-line — Completed 2026-10-18.
- [x] **CORE-804** [light] | brand-doc-sync — Add `brand/` to the AGENTS.md and README.md repo layouts; describe `public_metadata` in brand/README.md; repoint the overlay frontend rubric from brand/BRAND.md to the PROMPTS.md mark palettes; fix the PROMPTS.md chamber review date and scope its review-and-boundaries paragraph to the marks. Surfaced by audit-docs 2026-10-17 (Findings #3, #4, #5, #20, #23, Medium/Low), fixed inline.
- [x] **CORE-805** [light] | contract-mirror-gaps — Align ft-refactor's `--fast` description with its body; widen SPEC.md §"Who reviews" to the task's own diff; document fenced-code exclusion in SPEC/plan-parser.md; add /ft-refactor to Pair C's starter-template writers; narrow plan-filing's carve-out cite to /ft-audit; note the audit-decisions handoff in ft-audit-repo §5; add /ft-prep-unattended to SPEC/model.md's consulted-by list; note context's six passes in the overlay template. Surfaced by audit-docs 2026-10-17 (Findings #2, #6, #7, #8, #9, #10 + two capped Lows, Medium/Low), fixed inline.
- [x] **CORE-806** [light] | stale-cross-refs — Retarget EXTERNAL-AGENTS's park-conversion pointer to SPEC/gate-postures.md, MIGRATION §3.4→§1.5, ft-open-epic's `SPEC/epic.md` line-11 cites to §"Epic lifecycle", GATE-DISCIPLINE's post-closure cite to SPEC/post-closure.md, and DOGFOOD's stamp source; name the `.flaitron/core/.flaitron/` line in the codex/cursor/grok snippets. Surfaced by audit-docs 2026-10-17 (Findings #11–#15 + one capped Low, Medium/Low), fixed inline.
- [x] **CORE-807** [light] | currency-refresh — Re-measure CONTEXT-BUDGET §"Large reference docs" (PLATFORMS 60,198 · MIGRATION 68,908; cited sections 19,781 and 15,605, 2026-10-17); mark the ft-audit skill-body figure as re-measured at CORE-802; drop GATE-DISCIPLINE's hard-coded park-cause count; refresh the tasknote README line counts. Surfaced by audit-docs 2026-10-17 (Findings #16–#19, Medium/Low), fixed inline.
- [x] **CORE-808** [light] | stale-wording — Retire the command-stub wording in the GLOSSARY lazy-loaded entry; name the `.N` audit child in the SOP; describe the tasknote README's real contents in SPEC/layout.md; update SPEC/epic.md's subtask regex to the parser's. Surfaced by audit-docs 2026-10-17 (Findings #21, #22, #24, #25, Low), fixed inline.
- [x] **CORE-802** [heavy] | audit-decisions-file — Completed 2026-10-17.
- [x] **CORE-801** [heavy] | public-privacy-scrub — Completed 2026-10-17.
- [x] **CORE-800** [medium] | brand-chamber-reference — Completed 2026-10-17.
- [x] **CORE-799** [medium]🧩 | prep-split-collisions — Completed 2026-10-15.
- [x] **CORE-798** [heavy]🧠 | prep-guard-wording — Completed 2026-10-15.
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
