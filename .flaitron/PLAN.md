# Flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
in fintown, InvisiPaw, and photard.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High

- [ ] **CORE-EPIC-739** [medium]🧩 | drift-check-integrity — Make tools/drift-checks.sh fail loudly instead of passing on nothing. Discovery supplied by audit-repo 2026-10-08. Surfaced by audit-repo 2026-10-08 (Theme: drift checks are the test suite, but nothing tests them)
  - [x] **CORE-739.2** [medium]🧩 | drift-vacuous-floor — Completed 2026-10-08.
  - [x] **CORE-739.3** [medium]🧩 | drift-self-test — Completed 2026-10-08.
  - [ ] **CORE-739.N** [medium]🧩 | drift-check-integrity-audit — Audit the CORE-EPIC-739 children.

## Medium

(none)

## Low

- [ ] **CORE-727** [medium]🧩 | decay-window-restore — Blocked by decay-window depth: window [[CORE-724.7]] opened at `504f160f`. After 10 tasknotes archive past that SHA and at least one `/ft-audit` run commits filings past it, restore each of the four dropped rule groups only if the window shows the failure it guarded. Bar is in the archived CORE-724.7 note.

- [ ] **CORE-683** [medium]🧩 | epic-forward-restore — Blocked by decay-window depth: window [[CORE-680]] opened at `a78a8ae5`. After 8 epic tasknotes (`*-EPIC-*` or `*.<sub>`) archive past that SHA, restore `SPEC/epic.md`'s Forward-looking paragraph only if one followed it. Bar is in the archived CORE-680 note.

- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

- [x] **CORE-737** [light]🔧 | symlink-sparse-guard — Completed 2026-10-08.
- [x] **CORE-738** [medium]🧩 [unattended] | audit-sibling-runtime-guard — Completed 2026-10-08.
- [x] **CORE-736** [medium]🧩 | audit-row-sibling-gate — Completed 2026-10-08.
- [x] **CORE-EPIC-735** [heavy]🧠 | adopter-footprint — Completed 2026-10-08.
  - [x] **CORE-735.2** [medium]🧩 | submodule-weight-measure — Completed 2026-10-08.
  - [x] **CORE-735.3** [heavy]🧠 | footprint-decision — Completed 2026-10-08.
  - [x] **CORE-735.4** [medium]🧩 | sparse-checkout-docs — Completed 2026-10-08.
  - [x] **CORE-735.N** [heavy]🧠 | adopter-footprint audit — Completed 2026-10-08.

- [x] **CORE-EPIC-734** [heavy]🧠 | mirror-tax — Completed 2026-10-08.
  - [x] **CORE-734.2** [heavy]🧠 | drift-script-extract — Completed 2026-10-07.
  - [x] **CORE-734.3** [heavy]🧠 | mirror-pair-census — Completed 2026-10-07.
  - [x] **CORE-734.4** [heavy]🧠 | pair-l-retire — Completed 2026-10-07.
  - [x] **CORE-734.5** [medium]🧩 | pair-f-retire — Completed 2026-10-07.
  - [x] **CORE-734.6** [medium]🧩 | pair-i-retire — Completed 2026-10-07.
  - [x] **CORE-734.7** [medium]🧩 | pair-h-a-narrow — Completed 2026-10-07.
  - [x] **CORE-734.N** [heavy]🧠 | mirror-tax audit — Completed 2026-10-08.
- [x] **CORE-730** [medium]🧩 | global-skill-conflicts — Completed 2026-10-07.
- [x] **CORE-726** [medium]🧩 | epic-per-child-model — Completed 2026-10-07.
- [x] **CORE-728** [light]🔧 | snippet-bumping-dedupe — Completed 2026-10-07.
- [x] **CORE-733** [light]🔧 | micro-close-epic-note-recovery — Completed 2026-10-07.
- [x] **CORE-732** [medium]🧩 | pre-scaffold-note-recovery — Completed 2026-10-07.
- [x] **CORE-731** [medium]🧩 | unattended-park-existing-note — Completed 2026-10-07.
- [x] **CORE-725** [medium]🧩 | unattended-model-gate-order — Completed 2026-10-07.
- [x] **CORE-729** [heavy]🧠 | skill-pin-mismatch — Completed 2026-10-07.
- [x] **CORE-EPIC-724** [heavy]🧠 | context-diet — Completed 2026-10-07.
  - [x] **CORE-724.1** [heavy]🧠 | context-diet discovery — Completed 2026-10-07.
  - [x] **CORE-724.2** [heavy]🧠 | cold-start-trim — Completed 2026-10-07.
  - [x] **CORE-724.3** [heavy]🧠 | lazy-module-trim — Completed 2026-10-07.
  - [x] **CORE-724.4** [heavy]🧠 | skill-body-dedupe — Completed 2026-10-07.
  - [x] **CORE-724.5** [heavy]🧠 | adopter-surface-trim — Completed 2026-10-07.
  - [x] **CORE-724.6** [medium]🧩 | personal-conventions-out — Completed 2026-10-07.
  - [x] **CORE-724.7** [heavy]🧠 | decay-window-batch — Completed 2026-10-07.
  - [x] **CORE-724.N** [heavy]🧠 | context-diet audit — Completed 2026-10-07.
- [x] **CORE-722** [medium]🧩 | audit-deltas-remaining — Completed 2026-10-07.
- [x] **CORE-723** [medium]🧩 | release-dangling-link-scope — Completed 2026-10-07.
- [x] **CORE-720** [light]🔧 | audit-overlay-docs-deltas — Completed 2026-10-07.
- [x] **CORE-721** [heavy]🧠 | audit-overlay-home — Completed 2026-10-06.
- [x] **CORE-719** [light]🔧 | dependabot-enable — Completed 2026-10-06.
- [x] **CORE-EPIC-716** [medium]🧩 | gate-hygiene — Completed 2026-10-06.
  - [x] **CORE-716.2** [light]🔧 | viz-audit-fix — Completed 2026-10-06.
  - [x] **CORE-716.3** [medium]🧩 | updater-test-runtime — Completed 2026-10-06.
  - [x] **CORE-716.4** [light]🔧 | vitest-jsdom-pool — Completed 2026-10-06.
  - [x] **CORE-716.N** [medium]🧩 | gate-hygiene audit — Completed 2026-10-06.
- [x] **CORE-715** [medium] [unattended] | ci-spine-align — Completed 2026-10-06.
- [x] **CORE-718** [light]🔧 | epic-disc-git-mv — Completed 2026-10-06.
- [x] **CORE-717** [medium]🧩 | plan-filing-commit — Completed 2026-10-06.
- [x] **CORE-713** [medium]🧩 [handoff] | global config rebrand — Completed 2026-10-05.
- [x] **CORE-EPIC-711** [heavy]🧠 | flaitron-rebrand — Completed 2026-10-04.
  - [x] **CORE-711.1** [heavy]🧠 | flaitron-rebrand discovery — Completed 2026-10-03.
  - [x] **CORE-711.2** [light]🔧 | viz hard-cut — Completed 2026-10-03.
  - [x] **CORE-711.3** [heavy]🧠 | update-adopters migrate mode — Completed 2026-10-03.
  - [x] **CORE-711.4** [heavy]🧠 | text sweep + self-host move — Completed 2026-10-03.
  - [x] **CORE-711.5** [light]🔧 | github + folder renames — Completed 2026-10-04.
  - [x] **CORE-711.6** [light]🔧 | natabula handoff — Completed 2026-10-04.
  - [x] **CORE-711.7** [heavy]🧠 | fleet wave — Completed 2026-10-04.
  - [x] **CORE-711.8** [light]🔧 | global + external routing — Completed 2026-10-04.
  - [x] **CORE-711.9** [medium]🧩 | full-repo flaitron sweep — Completed 2026-10-04.
  - [x] **CORE-711.N** [heavy]🧠 | flaitron-rebrand audit — Completed 2026-10-04.
- [x] **CORE-714** [light]🔧 | release-zsh-glob — Completed 2026-10-04.
- [x] **CORE-712** [medium]🧩 | release v6.0.0 — Completed 2026-10-04.
- [x] **CORE-691** [light]🔧 | doc-crossfile-cite-sweep — Completed 2026-10-03.

- [x] **CORE-710** [light]🔧 | neutrality-capabilities-loop — `docs/AGENT-NEUTRALITY.md` CAPABILITIES trigger list adds `--starter` and `/code-review`; the `SPEC/loop.md` rows ledger `/ft-task --loop` and `step-5-loop-mode.md`. Surfaced by audit-docs 2026-10-03 (Finding #23, Low), fixed inline.

- [x] **CORE-709** [light]🔧 | neutrality-postclosure-dup — `docs/AGENT-NEUTRALITY.md` drops the duplicated `SPEC/post-closure.md` clause. Surfaced by audit-docs 2026-10-03 (Finding #22, Low), fixed inline.

- [x] **CORE-708** [light]🔧 | vision-updater-exception — `docs/VISION.md` Zero-scripts bullet names the bounded `tools/update-adopters.mjs` exception. Surfaced by audit-docs 2026-10-03 (Finding #21, Low), fixed inline.

- [x] **CORE-707** [light]🔧 | migration-audit-variants — `docs/MIGRATION.md` self-host wiring parenthetical names `/ft-audit`, `/ft-audit-repo` instead of "all audit variants". Surfaced by audit-docs 2026-10-03 (Finding #20, Low), fixed inline.

- [x] **CORE-706** [light]🔧 | external-agents-worktree-pair — `docs/EXTERNAL-AGENTS.md` parallelism sentence names isolated worktrees (`WORKTREES.md`) instead of the retired worktree skill pair. Surfaced by audit-docs 2026-10-03 (Finding #19, Medium), fixed inline.

- [x] **CORE-705** [light]🔧 | conventions-commit-types — `docs/CONVENTIONS.md` active commit types add `refactor:`, `perf:`, `test:`, `ci:`. Surfaced by audit-docs 2026-10-03 (Finding #18, Low), fixed inline.

- [x] **CORE-704** [light]🔧 | readme-codex-verification — README doc index lists `docs/CODEX-VERIFICATION.md`; the `docs/` layout bullet adds harness-survey and codex-verification. Surfaced by audit-docs 2026-10-03 (Finding #17, Low), fixed inline.

- [x] **CORE-703** [light]🔧 | neutrality-candidacy-section — `docs/AGENT-NEUTRALITY.md` `SPEC/unattended-candidacy.md` row cites §"Surfaces and mirrors". Surfaced by audit-docs 2026-10-03 (Finding #13, Medium), fixed inline.

- [x] **CORE-702** [light]🔧 | plan-parser-segment-cite — `SPEC/plan-parser.md` cites `SPEC/task-line-segments.md` §"Segment table" for the captured markers and the `[handoff]` precedence. Surfaced by audit-docs 2026-10-03 (Finding #12, Medium), fixed inline.

- [x] **CORE-701** [light]🔧 | loop-destructive-cite — `SPEC/loop.md` destructive-action carve-out cites `SPEC/gates.md` §"Destructive-action escalation". Surfaced by audit-docs 2026-10-03 (Finding #11, Medium), fixed inline.

- [x] **CORE-700** [light]🔧 | scope-boundaries-multiuser-mirror — `SPEC/scope-boundaries.md` Multi-user bullet carries its PR-rejection-mirror label to `docs/VISION.md`. Surfaced by audit-docs 2026-10-03 (Finding #10, Low), fixed inline.

- [x] **CORE-699** [light]🔧 | plan-filing-seed-roster — `SPEC/plan-filing.md` header loader list and execution-skill fence name `/ft-seed` beside the five filing motions. Surfaced by audit-docs 2026-10-03 (Finding #9, Low), fixed inline.

- [x] **CORE-698** [light]🔧 | snippet-followup-unattended — `claude/AGENTS-snippet.md` `--unattended` bullet names `/ft-file-followup --unattended` as the operator-less filing path. Surfaced by audit-docs 2026-10-03 (Finding #8, Low), fixed inline.

- [x] **CORE-697** [light]🔧 | snippet-update-adopter-subset — `claude/AGENTS-snippet.md` bump paragraph says `/ft-update` adds a symlink for a brand-new adopter-subset skill. Surfaced by audit-docs 2026-10-03 (Finding #7, Low), fixed inline.

- [x] **CORE-696** [light]🔧 | cue-vocabulary-split-pointers — `SPEC/cue-vocabulary.md` retargets the destructive-escalation and Rationalizations pointers, owns its cite-once §"Accepted gate replies", and says `/ft-file-followup` "in any mode". Surfaced by audit-docs 2026-10-03 (Finding #6, Medium), fixed inline.

- [x] **CORE-695** [light]🔧 | external-agents-step0-scope — `docs/EXTERNAL-AGENTS.md` Capability-probes row says `step-0-flags.md` holds the flag parse, conflict refusals, and mode dispatch. Surfaced by audit-docs 2026-10-03 (Finding #4, Low), fixed inline.

- [x] **CORE-694** [light]🔧 | versioning-ft-update — `SPEC/versioning.md` names `/ft-update` as the mechanical bump path. Surfaced by audit-docs 2026-10-03 (Finding #3, Medium), fixed inline.

- [x] **CORE-693** [light]🔧 | capabilities-claude-syntax — `claude/CAPABILITIES.md` names the `Agent` tool (formerly `Task`) and the full `/code-review` level list. Surfaced by audit-docs 2026-10-03 (Finding #2, Medium), fixed inline.

- [x] **CORE-692** [light]🔧 | capabilities-unattended-surfaces — `claude/CAPABILITIES.md` `--unattended` row names four `--fast` surfaces with both delegations (👁️ suppression, Re-scope notice) not inherited. Surfaced by audit-docs 2026-10-03 (Finding #1, Medium), fixed inline.

- [x] **CORE-690** [medium]🧩 | release v5.35.0 — Completed 2026-10-02.

- [x] **CORE-687** [light]🔧 | mirror-spec-attribution — `docs/CONVENTIONS.md` credits `SPEC/scope-boundaries.md` with the "for future-AI mid-task discipline" sentence. Surfaced by audit-docs 2026-10-02 (Finding #3, Medium), fixed inline.

- [x] **CORE-686** [light]🔧 | unattended-probe-drivers — Capability probes names the three tasknote drivers that load `unattended-mode.md`; `/ft-file-followup` keeps the posture inline. Surfaced by audit-docs 2026-10-02 (Finding #2, Medium), fixed inline.

- [x] **CORE-685** [light]🔧 | security-closure-push — Completed 2026-10-02.

- [x] **CORE-688** [medium]🧩 | calibration-roster — Completed 2026-10-02.

- [x] **CORE-689** [medium]🧩 | release-finding-gate — Completed 2026-10-02.

- [x] **CORE-684** [medium]🧩 | release v5.34.0 — Completed 2026-10-02.

- [x] **CORE-EPIC-679** [medium]🧩 | grok-probe-row — Completed 2026-10-02.
  - [x] **CORE-679.2** [light]🔧 | grok-spawn-schema — Completed 2026-10-02.
  - [x] **CORE-679.N** [light]🔧 | grok-probe-row audit — Completed 2026-10-02.

- [x] **CORE-660** [medium]🧩 | gate-discipline-trim — Completed 2026-10-02.

- [x] **CORE-EPIC-678** [heavy]🧠 | sop-headroom — Completed 2026-10-02.
  - [x] **CORE-678.2** [medium]🧩 | procedures-headroom — Completed 2026-10-02.
  - [x] **CORE-678.N** [medium]🧩 | sop-headroom audit — Completed 2026-10-02.

- [x] **CORE-680** [light]🔧 [unattended] | epic-forward-window — Completed 2026-10-02.

- [x] **CORE-682** [medium]🧩 | plan-filing-accumulate — Completed 2026-10-02.

- [x] **CORE-681** [light]🔧 | audit-command-symlink — Replaced gitignored `.claude/commands/audit.md` with a symlink to `claude/commands/ft-audit.md`, so the local `/audit` command states that context declares six passes. Surfaced by audit-context 2026-10-02 (Finding #1, Low), fixed inline.

- [x] **CORE-676** [light] [unattended] | platforms-grok-4.7 — Completed 2026-10-02.

- [x] **CORE-EPIC-677** [heavy] | codex-flowtron — Completed 2026-10-02.
  - [x] **CORE-677.1** [heavy] | codex-flowtron discovery — Completed 2026-10-01.
  - [x] **CORE-677.2** [heavy] | codex-install-verify — Completed 2026-10-01.
  - [x] **CORE-677.3** [heavy] | codex-workflow-parity — Completed 2026-10-01.
  - [x] **CORE-677.4** [heavy] | codex-grok-compare — Completed 2026-10-02.
  - [x] **CORE-677.N** [heavy] | codex-flowtron audit — Completed 2026-10-02.

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
