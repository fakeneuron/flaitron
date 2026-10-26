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

- [ ] **CORE-835** [heavy]🧠 | candidacy-rendered-surface — Clause 3 judges row text, but `--unattended` parks on every 👁️ emission (gate-postures §"Park conversions"), so a marked row whose work changes a rendered surface parks by construction. Add one semantic sentence, not a keyword: such work reads as needing a person; align Pin, since no test decides that 👁️. Evidence: 31 of 80 caobunga fleet parks were `visual-confirm`; 3 of the latest 7 were semantic-layer seed marks.
- [ ] **CORE-836** [frontier]💎 | epic-filing-entry — `/ft-open-epic` files and drives `.1` in one motion, so a `.1` tagged `[frontier]` still runs on the filing session's model. Explore a file-only `/ft-file-epic`, `/ft-file-task --epic`, or a stricter `/ft-open-epic` model gate before `.1` starts; settle naming and the file/drive split.

## Low

- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

- [x] **CORE-834** [light] | updater-comment-pointer — Fixed "workspaceRoot comment below" → "above" in tools/update-adopters.mjs:358. Surfaced by audit 2026-10-26 (Finding #2, Low), fixed inline.
- [x] **FE-144** [light] | parser-comment-placement — Moved scanDocument's header comment off resolveHeadingLine in viz/src/parser.ts. Surfaced by audit 2026-10-26 (Finding #1, Low), fixed inline.
- [x] **FE-143** [light]🔧 | dedupe-check-typecheck — Completed 2026-10-26.
- [x] **FE-142** [moderate]🧩 | solution-root-tsconfig — Completed 2026-10-26.
- [x] **FE-141** [light]🔧 [unattended] | build-runs-typecheck — Completed 2026-10-26.
- [x] **CORE-833** [light]🔧 [unattended] | dirty-tree-cue — Completed 2026-10-26.
- [x] **FE-140** [moderate]🧩 [unattended] | root-pass-remainder — Completed 2026-10-26.
- [x] **FE-139** [moderate]🧩 | shared-pure-tests-tier — Completed 2026-10-26.
- [x] **FE-138** [moderate]🧩 | node-tier-no-dom — Completed 2026-10-26.
- [x] **FE-136** [moderate]🧩 | per-tier-node-types — Completed 2026-10-26.
- [x] **FE-137** [light]🔧 | bare-builtin-tier-gate — Completed 2026-10-26.
- [x] **FE-135** [moderate]🧩 | triple-slash-types-gate — Completed 2026-10-26.
- [x] **FE-134** [moderate]🧩 | type-query-import-gate — Completed 2026-10-26.
- [x] **CORE-832** [moderate]🧩 | narrow-just-check — Completed 2026-10-26.
- [x] **FE-133** [light]🔧 [unattended] | dynamic-import-tier-gate — Completed 2026-10-26.
- [x] **CORE-831** [light]🔧 [unattended] | unattended-just-check — Completed 2026-10-26.
- [x] **CORE-830** [light]🔧 | check-cmd-drift — Completed 2026-10-26.
- [x] **CORE-829** [moderate]🧩 | release-dir-headroom — Completed 2026-10-26.
- [x] **CORE-827** [heavy]🧠 | updater-retire-migrations — Completed 2026-10-26.
- [x] **FE-132** [light]🔧 [unattended] | theme-init-parity — Completed 2026-10-25.
- [x] **CORE-828** [light]🔧 [unattended] | just-check — Completed 2026-10-25.
- [x] **FE-131** [moderate]🧩 [unattended] | viz-tier-lint — Completed 2026-10-25.
- [x] **CORE-826** [moderate]🧩 [unattended] | agents-snippet-drift-pair — Completed 2026-10-25.
- [x] **CORE-825** [light]🔧 | audit-context-always-runs — Completed 2026-10-25.
- [x] **CORE-824** [moderate]🧩 | release v7.5.0 — Completed 2026-10-25.
- [x] **FE-129** [light]🔧 [unattended] | viz-audit-advisories — Completed 2026-10-24.
- [x] **FE-130** [light] | devapi-host-comment — Rewrote the `isLoopbackAddress` comment in `viz/src/devApi.ts` to credit FE-128's `server.host` pin instead of claiming the config sets none. Surfaced by audit-security 2026-10-24 (Finding #1, Low), fixed inline.
- [x] **CORE-823** [light] | settings-flowtron-paths — Removed two dead `npm --prefix …/Code/flowtron/viz` allow rules from gitignored `.claude/settings.local.json`; the path is gone since the v6.0.0 rename and `Bash(npm *)` already covers the live one. Surfaced by audit-context 2026-10-23 (Finding #1, Low), fixed inline.
- [x] **CORE-821** [heavy]🧠 | fable-effort-split — Completed 2026-10-22.
- [x] **CORE-820** [moderate]🧩 | empty-plan-emoji — Completed 2026-10-22.
- [x] **CORE-822** [moderate]🧩 | visual-receipts-vs-park — Completed 2026-10-22.
- [x] **CORE-819** [moderate]🧩 [unattended] | plan-only-subjects — Completed 2026-10-22.
- [x] **CORE-818** [heavy]🧠 | micro-default — Completed 2026-10-22.
- [x] **CORE-817** [moderate]🧩 | release v7.4.0 — Completed 2026-10-20.
- [x] **CORE-816** [heavy] | quality-first-calibration — Completed 2026-10-20.
- [x] **CORE-EPIC-815** [moderate] | moderate-tier-rename — Completed 2026-10-20.
  - [x] **CORE-815.1** [medium] | moderate-tier-rename discovery — Completed 2026-10-20.
  - [x] **CORE-815.2** [heavy] | moderate-tier-contract — Completed 2026-10-20.
  - [x] **CORE-815.3** [light] | moderate-tier-viz — Completed 2026-10-20.
  - [x] **CORE-815.4** [moderate] | moderate-tier-sweep — Completed 2026-10-20.
  - [x] **CORE-815.N** [moderate] | moderate-tier-rename audit — Completed 2026-10-20.
- [x] **CORE-814** [heavy] | model-routing-calibration — Completed 2026-10-20.
- [x] **CORE-813** [medium]🧩 | release v7.3.0 — Completed 2026-10-18.
- [x] **CORE-EPIC-812** [heavy] | seed-prep-merge — Completed 2026-10-18.
  - [x] **CORE-812.1** [frontier] | seed-prep-merge discovery — Completed 2026-10-18.
  - [x] **CORE-812.2** [frontier] | seed-prep-contract — Completed 2026-10-18.
  - [x] **CORE-812.3** [heavy] | seed-absorbs-prep — Completed 2026-10-18.
  - [x] **CORE-812.4** [medium] | retire-prep-slug — Completed 2026-10-18.
  - [x] **CORE-812.N** [heavy] | seed-prep-merge audit — Completed 2026-10-18.
- [x] **CORE-811** [light]🔧 [unattended] | prep-draft-self-screen — Completed 2026-10-18.
- [x] **CORE-810** [medium]🧩 | prep-split-deploy-safety — Completed 2026-10-18.
- [x] **CORE-809** [medium]🧩 | release v7.2.0 — Completed 2026-10-18.
- [x] **CORE-803** [light]🔧 [unattended] | release-ci-line — Completed 2026-10-18.
