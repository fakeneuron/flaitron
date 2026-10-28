# Flaitron — PLAN.md

## Vision

A lightweight, versioned, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed via git submodule by every
project under `~/code/`. Replaces the disjointed per-project workflow files
those projects had each grown on their own.

See [SPEC.md](../SPEC.md) for the canonical workflow contract.

## High


- [ ] **CORE-842** [moderate] | github-secret-controls — NAT-471 read public fakeneuron/flaitron repository scanning and push protection as disabled on 2026-10-28. Recheck metadata; with ordinary operator authorization enable the free eligible repository controls and verify both statuses. Preserve gitleaks; no alert-value reads, visibility changes or paid upgrades.

## Medium

(none)

## Low

- [ ] **CORE-641** [light]🔧 | typescript-7 — Parked: wait for a proper typescript-eslint release accepting TS 7.x (latest 8.71.0 peers `<6.1.0`; TS 7.1 is dev-only as of 2026-10-03) — don't revisit before then. Bump typescript 5.9→7 once typescript-eslint supports TS 7.1+; tsc also TS2882 on CSS side-effect import. CORE-639.3 reverted.

## Future Opportunities

(none)

## Completed

- [x] **CORE-841** [moderate]🧩 | release v8.0.0 — Completed 2026-10-27.
- [x] **FE-148** [moderate]🧩 | active-parse-visibility — Completed 2026-10-27.
- [x] **FE-149** [light] | degraded-banner-copy — Completed 2026-10-27.
- [x] **FE-150** [moderate]🧩 [unattended] | active-parse-report — Completed 2026-10-27.
- [x] **FE-147** [moderate]🧩 | watch-degraded-signal — Completed 2026-10-27.
- [x] **FE-146** [light]🔧 | project-data-error-hygiene — Completed 2026-10-27.
- [x] **CORE-838** [light]🔧 [unattended] | micro-default-wording — Completed 2026-10-27.
- [x] **CORE-839** [light] | audit-overlay-reconcile — Re-reconciled `.flaitron/audit-overlay/SKILL.md` against `ft-audit` at v7.5.0 (CORE-802 decisions file, CORE-815.4 `[moderate]`: both inherited, no delta needed): `flaitron-reconciled:` v7.0.0 → v7.5.0, and the gates line's `ci.yml:33-41` range replaced by a step-level citation. Surfaced by audit-docs 2026-10-27 (Finding #2, Medium; Finding #3, Low), fixed inline.
- [x] **CORE-840** [light] | retire-superseded-spec — Removed `.flaitron/specs/spec-to-work-handoff.md` (superseded 2026-09-12, no inbound links, cited the retired `/ft-epic-discovery` seven times); history stays in git. Surfaced by audit-docs 2026-10-27 (Finding #4, Low), fixed inline.
- [x] **FE-145** [light]🔧 | scoped-error-clear — Completed 2026-10-27.
- [x] **CORE-835** [heavy]🧠 | candidacy-rendered-surface — Completed 2026-10-26.
- [x] **CORE-837** [heavy]🧠 | open-epic-model-seam — Completed 2026-10-26.
- [x] **CORE-836** [frontier]💎 | epic-filing-entry — Completed 2026-10-26.
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
