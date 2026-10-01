# Flowtron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
in fintown, InvisiPaw, and photard.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

(none)

## Medium

- [ ] **CORE-660** [medium]🧩 | gate-discipline-trim — Blocked by decay-window depth: the window [[CORE-659]] opened at `f8c44275` has observed 1 run, its own. Parked at Phase 1→2 (`status: blocked`); Discovery, inbound-reference table, and the provenance trim axis are preserved in the tasknote. Resume once N independent runs have archived. Destination decided: `docs/GATE-DISCIPLINE.md`.

- [ ] **CORE-EPIC-677** [heavy] | codex-flowtron — Verify Codex skill installation and workflow adherence, repair evidenced wiring or contract gaps, and compare identical isolated fixtures with Grok Build. Separate static parity, live behavior, and cross-model observations; retain a final evidence and doc-drift audit.
  - [x] **CORE-677.1** [heavy] | codex-flowtron discovery — Completed 2026-10-01.
  - [x] **CORE-677.2** [heavy] | codex-install-verify — Completed 2026-10-01.
  - [ ] **CORE-677.3** [heavy] | codex-workflow-parity — Blocked by [[CORE-677.2]]. Check all wrapper routes, flags, and SOP/canonical contract parity; exercise representative lifecycle and mode fixtures. Fix evidenced gaps, review structured-ask fallback and SOP currency, and record tested versus static-only coverage in docs/CODEX-VERIFICATION.md. Leave Grok calibration to [[CORE-676]].
  - [ ] **CORE-677.4** [heavy] | codex-grok-compare — Blocked by [[CORE-677.3]]. Run identical bounded completion and gate/park fixtures through Codex wrappers, a same-model/effort Codex SOP control, and Grok Build. Capture prompts, versions, receipts, and closure artifacts in docs/CODEX-VERIFICATION.md; distinguish model from wiring effects. Compatibility refresh requires separate qualifying report-only dogfood receipts.
  - [ ] **CORE-677.N** [heavy] | codex-flowtron audit — Audit installation receipts, skill and SOP parity, isolated comparison evidence, unresolved failures, and compatibility claims. Include the fixed per-entry doc-drift sweep across .flowtron/tasknote/README.md's AI-referenced docs; check stamp claims against qualifying live receipts.

## Low

- [ ] **CORE-641** [light]🔧 | typescript-7 — Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

- [ ] **CORE-676** [light] [unattended] | platforms-grok-4.7 — `docs/PLATFORMS.md`'s xAI calibration row names Grok 4.6; `grok models` now defaults to `grok-4.7` (plus `grok-4.7-build-fast`). Refresh the row and its effort-ladder note. Surfaced by caobunga CBN-254.

## Future Opportunities

(none)

## Completed

- [x] **CORE-675** [light]🔧 | ft-task-sop-learnings — Completed 2026-09-23.
- [x] **CORE-674** [medium]🧩 | release v5.33.0 — Completed 2026-09-23.
- [x] **FE-126** [light] | vite-config-comment-trim — Completed 2026-09-23.
- [x] **CORE-673** [light]🔧 | code-review-level-pin — Completed 2026-09-23. Pinned `/code-review medium` at the six sites where the contract names the tool for Phase 3's External review (`ft-task/SKILL.md`, `SPEC.md`, `CAPABILITIES.md`, `README.md`, `GLOSSARY.md`, `subagent-probe-template.md`); `step-5-loop-mode.md` needed no edit. `ultra` stays excluded.
- [x] **FE-EPIC-125** [heavy]🧠 | viz-comment-provenance-trim — Completed 2026-09-23.
  - [x] **FE-125.2** [medium]🧩 | parser-comment-trim — Completed 2026-09-22.
  - [x] **FE-125.3** [medium]🧩 | viz-comment-trim-rest — Completed 2026-09-22.
  - [x] **FE-125.N** [medium]🧩 | viz-comment-trim-audit — Completed 2026-09-23.
- [x] **CORE-672** [light]🔧 [unattended] | audit-repo-nest-children — Completed 2026-09-22.
- [x] **CORE-671** [medium]🧩 [unattended] | gate-postures-headroom — Completed 2026-09-22. `SPEC/gate-postures.md` 21,592 → 20,409 (headroom 6.1% → 11.3%) by within-file restatement cuts, cap held; `docs/CONTEXT-BUDGET.md` now states per-row working-unit sizing, not a flat 10%, governs headroom (`ft-release/**` at ≈2 units needs no action).
- [x] **CORE-EPIC-670** [heavy]🧠 | context-headroom — Completed 2026-09-22.
  - [x] **CORE-670.2** [light]🔧 | budget-rationale-refresh — Completed 2026-09-22.
  - [x] **CORE-670.3** [heavy]🧠 | procedures-ft-task-extract — Completed 2026-09-22.
  - [x] **CORE-670.4** [medium]🧩 | large-docs-budget-decision — Completed 2026-09-22.
  - [x] **CORE-670.N** [medium]🧩 | context-headroom-audit — Completed 2026-09-22.
- [x] **CORE-663** [heavy]🧠 | harness-survey-v2 — Completed 2026-09-22. Appended a second, primary-source survey pass to `docs/HARNESS-SURVEY.md`: 17 products + 3 practices, one clone-and-read trial per family, star/commit velocity, first-pass dispositions, re-ranked gaps/overkill. No rows filed (operator).
- [x] **CORE-662** [light]🔧 | context-budget-cells — Completed 2026-09-22. `docs/CONTEXT-BUDGET.md`'s 9 `## Budgets` cells collapsed to one line each; raise/lower history moved to a new `## Cap history` section. 23,244 → 20,224 chars.
- [x] **CORE-669** [light]🔧 | plan-none-convention-doc — Completed 2026-09-22.
- [x] **FE-124** [light]🔧 [unattended] | viz-ready-filter — Completed 2026-09-22. Added an `isReady` predicate (`taskView.ts`) and a header "Ready" toggle showing open rows whose `Blocked by [[ID]]` / `blocked-by:` targets are all closed; Escape clears it with the other filters. `viz/src/parser.ts` untouched.
- [x] **CORE-668** [light]🔧 | plan-high-none-placeholder — Completed 2026-09-22.
- [x] **CORE-667** [medium]🧩 | fast-rescope-park-drift — Completed 2026-09-22. `SPEC/gates.md` §"Flag interaction", `SPEC/procedures/ft-task.md`'s exit gate, and `ft-task/SKILL.md` Step 4 now carve out the `--fast` blocked-prerequisite park per `SPEC/blocked.md`.
- [x] **CORE-666** [light]🔧 | core660-link-fix — Completed 2026-09-22.
- [x] **CORE-661** [medium]🧩 | audit-decay-pass — Completed 2026-09-22. Added pass 6 "Contract decay" to `/ft-audit`'s `context` domain (flowtron-self only, one clause per run, provenance-selected, proposes a [[CORE-659]]-shaped decay window); generalised the dispatcher off a fixed five passes.
- [x] **CORE-665** [medium]🧩 | phase1-attended-park — Completed 2026-09-22. Widened `SPEC/blocked.md` §"Phase 1 entry": a Re-scope on a blocked prerequisite now offers delete-and-halt *or* park at the 🛠️ gate, `--fast` parks by default with an overrulable notice, `--unattended` parks unconditionally; [[CORE-660]] re-coded `dependency` → `drift`.
- [x] **CORE-659** [light]🔧 [unattended] | gate-discipline-decay-window — Completed 2026-09-22. Dropped the two live "read `gate-discipline.md` before skipping" triggers from `SPEC/gates.md` and `SPEC/procedures/ft-task.md`; window-start SHA `f8c44275` recorded in the archived tasknote for [[CORE-660]].
- [x] **CORE-664** [heavy]🧠 | spec-section-extract — Completed 2026-09-22. Moved §"Task-line format"'s segment table, examples, and `[unattended]`-candidacy paragraph into lazy `SPEC/task-line-segments.md`; `SPEC.md` 51,024 → 46,908 (headroom 1,976 → 6,092, ≈2.1 working units) with no cap raise.
- [x] **CORE-657** [medium]🧩 [unattended] | spec-incident-history — Completed 2026-09-22. De-scoped: the "why we rejected X" prose already lives in `SPEC/gate-discipline.md` / `SPEC/scope-boundaries.md`, and 355 of the 422 remaining incident bytes are [[CORE-393]]'s anti-misreading hardening; headroom re-filed as [[CORE-664]].
- [x] **CORE-656** [heavy]🧠 | review-probe — Completed 2026-09-22.
- [x] **CORE-658** [light]🔧 [unattended] | learnings-box — Completed 2026-09-22.
- [x] **CORE-655** [light]🔧 | caller-surface-sweep — Completed 2026-09-22.
- [x] **CORE-654** [medium]🧩 | release v5.32.0 — Completed 2026-09-21.
- [x] **FE-122** [light]🔧 | handoff-chip — Completed 2026-09-21.
- [x] **CORE-653** [light] | security-spec-read-note — `SECURITY.md` §Visualizer names the one uncontained read: `.flowtron/core/SPEC.md` is followed through symlinks for its Version line only, nothing from it reaches the wire (`viz/src/workspace.ts`). Surfaced by audit 2026-09-21 (Finding #2, Low), fixed inline.
- [x] **FE-123** [light] | viz-readme-build-command — `viz/README.md` §Commands lists `npm --prefix viz run build`, matching AGENTS.md §"Validation", CI, and the justfile. Surfaced by audit 2026-09-21 (Finding #3, Low), fixed inline.
- [x] **CORE-EPIC-652** [heavy]🧠 | public-surface-decoupling — Completed 2026-09-21.
  - [x] **CORE-652.2** [medium]🧩 | natabula-ref-inventory — Completed 2026-09-21.
  - [x] **CORE-652.N** [light]🔧 | public-surface-decoupling audit — Completed 2026-09-21.
- [x] **CORE-EPIC-651** [heavy]🧠 | gate-reliability — Completed 2026-09-21.
  - [x] **CORE-651.2** [light]🔧 [unattended] | pair-q-out-of-repo-skip — Completed 2026-09-21.
  - [x] **CORE-651.3** [light]🔧 [unattended] | updater-test-cleanup-race — Completed 2026-09-21.
  - [x] **CORE-651.4** [light]🔧 [unattended] | engines-ci-matrix — Completed 2026-09-21.
  - [x] **CORE-651.5** [light]🔧 | lockfile-engines-sync — Completed 2026-09-21.
  - [x] **CORE-651.N** [light]🔧 | gate-reliability audit — Completed 2026-09-21.
- [x] **CORE-643** [light] | brand-kit-back-port — Completed 2026-09-21.
- [x] **CORE-640** [light]🔧 | js-yaml-5-gray-matter — Completed 2026-09-21.
- [x] **CORE-644** [medium]🧩 | audit-bootstrap-self-branch — Completed 2026-09-21.
- [x] **CORE-645** [light] | docs-audit-gates-claim — `docs/MIGRATION.md` §1.2.2 and `/ft-release` §7.1 no longer say the `docs` audit runs with no gates; both name the CI `drift` job's doc checks (Pair Q citation resolver, final-newline, context budget) as the local gate. Surfaced by audit-docs 2026-09-21 (Finding #1, Medium), fixed inline.
- [x] **CORE-646** [light] | neutrality-ledger-two-rows — `docs/AGENT-NEUTRALITY.md` ledger gains rows for `SPEC/unattended-candidacy.md` (`claude/skills/`, `.claude/skills/audit/`) and `templates/audit-overlay-template.md` (referenced-scaffold path, `CLAUDE.md` rubric example), both path facts. Surfaced by audit-docs 2026-09-21 (Finding #2, Medium), fixed inline.
- [x] **CORE-647** [light] | agents-layout-justfile — `AGENTS.md` §"Repo Layout" names the root `justfile` (CORE-637). Surfaced by audit-docs 2026-09-21 (Finding #3, Low), fixed inline.
- [x] **CORE-648** [light] | agents-model-mirror-pointer — `AGENTS.md:35` KEEP IN SYNC pointer now reads `claude/AGENTS-snippet.md:32` (the `[model]` bullet), matching the snippet's reverse pointer. Surfaced by audit-docs 2026-09-21 (Finding #4, Low), fixed inline.
- [x] **CORE-650** [light] | sweep-set-exclusion-note — `.flowtron/tasknote/README.md` §"AI-referenced docs" now states why `docs/PHILOSOPHY.md` (historical), `docs/DOGFOOD.md` (release-gated), `docs/CONTEXT-BUDGET.md` (CI-enforced + release-remeasured), and `docs/VERSION-HISTORY.md` (release-written) sit outside the sweep set. Surfaced by audit-docs 2026-09-21 (insight), fixed inline.
- [x] **CORE-649** [light] | platforms-wrapper-count — `docs/PLATFORMS.md` Codex "Structured ask" row says "every wrapper" instead of the stale "all 11 wrappers" (12 since `ft-seed`). Surfaced by audit-docs 2026-09-21 (Finding #5, Low), fixed inline.
- [x] **CORE-642** [medium]🧩 | release v5.31.0 — Completed 2026-09-20.
- [x] **CORE-EPIC-639** [heavy]🧠 | toolchain-currency — Completed 2026-09-20.
  - [x] **CORE-639.2** [light]🔧 [unattended] | ci-node-matrix — Completed 2026-09-20.
  - [x] **CORE-639.3** [medium]🧩 | viz-majors-triage — Completed 2026-09-20.
  - [x] **CORE-639.N** [light]🔧 | toolchain-currency audit — Completed 2026-09-20.
