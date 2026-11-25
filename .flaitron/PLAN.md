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

(none)

## Low

- [ ] **CORE-933** [light]🔧 | epic-audit-drift-line-restore-read — Blocked by decay-window depth: once 5 `.N` audit tasknotes archive after window-start `f2887f37` (CORE-927), check whether any missed cumulative doc-drift the Phase 4 sweep did not catch; if one did, restore the Acceptance line in `claude/skills/ft-close-epic/SKILL.md` and un-window `SPEC/epic.md`; otherwise close the window.
- [ ] **CORE-935** [light] | updater-node-guard-order — The Node ≥20 guard in `tools/update-adopters.mjs` now runs after six static module imports load; move it into a first-imported module or drop it.

## Future Opportunities

(none)

## Completed

- [x] **CORE-941** [light] | paste-fence-opener-forms — Completed 2026-11-24.
- [x] **CORE-942** [light] | updater-roster-whitespace — Completed 2026-11-24.
- [x] **CORE-940** [light] | reconciled-pin-source-rule — Completed 2026-11-24.
- [x] **CORE-939** [light] | ft-update-fence-close-prose — Completed 2026-11-24.
- [x] **CORE-EPIC-920** [heavy]🧠 | near-cap-trims-2 — Completed 2026-11-24.
  - [x] **CORE-920.2** [heavy]🧠 | headroom-spec-modules — Completed 2026-11-24.
  - [x] **CORE-920.3** [heavy]🧠 | headroom-runner-bodies — Completed 2026-11-24.
  - [x] **CORE-920.4** [heavy]🧠 | headroom-release-skill — Completed 2026-11-24.
  - [x] **CORE-920.N** [heavy]🧠 | near-cap-trims-2 audit — Completed 2026-11-24.
- [x] **CORE-EPIC-919** [moderate]🧩 | derived-figures — Completed 2026-11-24.
  - [x] **CORE-919.2** [light]🔧 [unattended] | overlay-figures-to-commands — Completed 2026-11-24.
  - [x] **CORE-919.3** [heavy]🧠 | reconciled-pin-guard — Completed 2026-11-24.
  - [x] **CORE-919.4** [light]🔧 | overlay-markdown-counts — Completed 2026-11-24.
  - [x] **CORE-919.N** [moderate]🧩 | derived-figures audit — Completed 2026-11-24.
- [x] **CORE-938** [light] | paste-block-heading-anchor — Completed 2026-11-24.
- [x] **CORE-937** [light] | paste-block-opener-strict — Completed 2026-11-24.
- [x] **CORE-930** [light] | paste-block-fence-crlf — Completed 2026-11-24.
- [x] **CORE-934** [light] | fixed-drift-labels — Completed 2026-11-24.
- [x] **CORE-925** [light]🔧 | just-wire — Completed 2026-11-24.
- [x] **CORE-929** [light]🔧 | roster-pin-check-docs — Completed 2026-11-24.
- [x] **CORE-928** [light]🔧 | conventions-check-roster — Added `plan_placeholder` to the "no source rule nor catalogue entry" list in `docs/CONVENTIONS.md` and made it seven; no tasknote. Completed 2026-11-24.
- [x] **CORE-936** [light] | roster-covers-modules — Completed 2026-11-24.
- [x] **CORE-932** [light] | check-updater-modules — Completed 2026-11-24.
- [x] **CORE-EPIC-931** [moderate]🧩 | updater-modules — Completed 2026-11-24.
  - [x] **CORE-931.2** [moderate]🧩 [unattended] | release-module — Completed 2026-11-24.
  - [x] **CORE-931.3** [light]🔧 [unattended] | workspace-module — Completed 2026-11-24.
  - [x] **CORE-931.4** [light]🔧 [unattended] | text-module — Completed 2026-11-24.
  - [x] **CORE-931.5** [moderate]🧩 [unattended] | wiring-module — Completed 2026-11-24.
  - [x] **CORE-931.6** [moderate]🧩 [unattended] | check-module — Completed 2026-11-24.
  - [x] **CORE-931.7** [moderate]🧩 [unattended] | apply-module — Completed 2026-11-24.
  - [x] **CORE-931.8** [moderate]🧩 | entry-docs — Completed 2026-11-24.
  - [x] **CORE-931.N** [moderate]🧩 | updater-modules audit — Completed 2026-11-24.
- [x] **CORE-927** [light]🔧 [unattended] | epic-audit-drift-line-window — Completed 2026-11-24.
- [x] **CORE-921** [heavy]🧠 | updater-followthrough-owner — Completed 2026-11-24.
- [x] **CORE-EPIC-918** [moderate]🧩 | closure-placeholder — Completed 2026-11-24.
  - [x] **CORE-918.2** [light]🔧 [unattended] | closure-none-clause — Completed 2026-11-24.
  - [x] **CORE-918.3** [moderate]🧩 [unattended] | plan-placeholder-check — Completed 2026-11-24.
  - [x] **CORE-918.4** [light]🔧 | codex-closure-none — Completed 2026-11-24.
  - [x] **CORE-918.N** [moderate]🧩 | closure-placeholder audit — Completed 2026-11-24.
- [x] **CORE-926** [light]🔧 [unattended] | layout-flaitron-dirs — Completed 2026-11-24.
- [x] **CORE-924** [moderate]🧩 [unattended] | mirror-parity-checks — Completed 2026-11-24.
- [x] **CORE-923** [moderate]🧩 [unattended] | drift-flag-helper — Completed 2026-11-24.
- [x] **CORE-922** [moderate]🧩 [unattended] | fence-cases — Completed 2026-11-24.
- [x] **CORE-917** [moderate] | arch-health-refresh — Completed 2026-11-24.
- [x] **CORE-916** [moderate] | ft-update-start-marker-stop — Completed 2026-11-24.
- [x] **CORE-915** [heavy] | direct-edit-path — Completed 2026-11-17.
- [x] **CORE-913** [moderate] | seed-grouped-stays — Completed 2026-11-17.
- [x] **CORE-914** [heavy] | fleet-clean-line — Completed 2026-11-17.
- [x] **CORE-912** [moderate]🧩 | release v8.5.0 — Completed 2026-11-14.
