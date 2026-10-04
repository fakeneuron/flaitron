---
title: release v5.19.0
status: in-progress
tags: []
created: 2026-08-24
due:
related-tasks: [FE-EPIC-94, CORE-EPIC-463, CORE-465, CORE-464, CORE-467, CORE-466, CORE-449]
---

# CORE-471 | release v5.19.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-EPIC-94]] [[CORE-EPIC-463]] [[CORE-465]] [[CORE-464]] [[CORE-467]] [[CORE-466]] [[CORE-449]]

## 🎯 Goal

Cut v5.19.0, a minor release tagging viz-app-decompose (FE-EPIC-94), refactor-and-structure-audit (CORE-EPIC-463), wiring-roster-ssot (CORE-465), ci-drift-checks (CORE-464), plan-completed-rotation (CORE-467), and neutrality-ledger-gaps (CORE-466) since v5.18.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.18.0` → `v5.19.0`
- [x] docs/MIGRATION.md example pin bumped `v5.18.0` → `v5.19.0`
- [x] SECURITY.md release-tag example pin bumped `v5.18.0` → `v5.19.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.18.0` → `v5.19.0`
- [x] `viz/package.json` `"version"` bumped `"5.18.0"` → `"5.19.0"` (bare semver, no `v` prefix), `viz/package-lock.json` resynced to match
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.19.0`, or recorded `skipped @ v5.19.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way) — 1 candidate found, filed as [[CORE-472]]
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-471 — flowtron v5.19.0 (...)` commit lands
- [ ] Annotated `v5.19.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.19.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-471.md`

## 🧩 Subtasks

- [ ] Apply the 5 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, viz/src/ui/constants.ts, viz/package.json + package-lock.json)
- [ ] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [ ] Run the Phase 4 doc-drift sweep (`/ft-audit docs` subroutine) + standing mirror-pair / wiring-parity checks
- [ ] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [ ] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[FE-EPIC-94]] — viz-app-decompose, tagged in this release
- [[CORE-EPIC-463]] — refactor-and-structure-audit, tagged in this release
- [[CORE-465]] — wiring-roster-ssot, tagged in this release
- [[CORE-464]] — ci-drift-checks, tagged in this release
- [[CORE-467]] — plan-completed-rotation, tagged in this release
- [[CORE-466]] — neutrality-ledger-gaps, tagged in this release
- [[CORE-449]] — precedent: prior release tasknote (v5.18.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (5-pin recipe, CORE-048/CORE-443/CORE-449 precedent); commit log + version drift verified in `/ft-release` Step 2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:461` example pin, `SECURITY.md` release-tag pin, `viz/src/ui/constants.ts`, `viz/package.json`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — [[CORE-449]] (v5.18.0) is the direct prior precedent: same five-pin recipe, dogfood gate (Claude/Grok/Codex/Cursor), SOP-currency check, VERSION-HISTORY prepend, standing checks A–I. No structural drift in the release recipe since that cut.

- [x] **Drift check** — `SPEC.md:3` reads `v5.18.0`, matches `git describe --tags --abbrev=0`. `docs/MIGRATION.md:461` example pin reads `v5.18.0`. No drift. PLAN line `release v5.19.0` matches the computed minor bump (68 commits, highest = `feat:`, no `feat!`/`BREAKING CHANGE`).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Bump is minor; adopter impact is unambiguous (see Discovery Notes).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 68 commits since v5.18.0. Grouped by area:

- **viz-app-decompose (FE-EPIC-94)** — internal refactor of flowtron's own `viz/src/ui/App.tsx` into hooks/components. No adopter-facing behavior change.
- **refactor-and-structure-audit (CORE-EPIC-463)** — ships a new `/ft-refactor` skill (depth-planner) + a 7th `structure` domain for `/ft-audit`. Additive: adopter symlink block goes 22 → 24, wired automatically by `/ft-update`'s "re-wire per-project symlinks for newly shipped skills" step. No manual adopter edit required.
- **plan-completed-rotation (CORE-467/FE-094/CORE-470)** — new opt-in `## Completed` rotation contract in `SPEC/tasknote-selection.md`: past 150 checked rows, `/ft-task` surfaces an advisory and the operator rotates oldest whole-month blocks into a sibling `.flowtron/PLAN-ARCHIVE.md`. Viz and `/ft-stats` now read both files. Operator-triggered, not automatic — no adopter action required until their own PLAN.md crosses the threshold. Worth a Migration-block mention as a heads-up (not a required edit).
- **wiring-roster-ssot (CORE-465) / ci-drift-checks (CORE-464) / neutrality-ledger-gaps (CORE-466) / audit-bootstrap-lazy (CORE-468)** — flowtron-self internal hardening (CI, SSOT derivation, doc-drift gates). No adopter-facing surface.
- **release-publish-step (CORE-461)** — `/ft-release` (flowtron-self only) now publishes GitHub Releases. Not shipped to adopters.
- **Grok/Cursor platform-parity (CORE-EPIC-456/457/458/459/460)** — trigger-table backfills, dogfood restamps, `--park`/`--worktree` flag parity. Doc/wiring currency only; no adopter code change.
- **viz major-bump wave (FE-EPIC-090)** — Tailwind 4, React 19, Vite 8, ESLint 10 in flowtron's own `viz/` package. Adopters consume viz via the pinned submodule; not a fork target under normal use.
- **Misc doc/audit fixes** (CORE-450–455, CORE-462, CORE-469) — prose/currency corrections, no schema or contract change.

**Verdict: no required project-side edits.** New `/ft-refactor` skill and the PLAN.md rotation contract are both additive/opt-in and land automatically on the next `/ft-update` or `/ft-task` invocation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — five-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution — five pins landed; dogfood stamps resolved

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**5 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`, `viz/src/ui/constants.ts:41`, `viz/package.json:4` (+ `viz/package-lock.json` resynced via `npm install --package-lock-only`), all `v5.18.0`/`5.18.0` → `v5.19.0`/`5.19.0`. Grep verification clean — remaining `v5.18.0` hits are expected residue (dogfood stamps, `docs/VERSION-HISTORY.md` historical entry).

**Dogfood gate — all 4 refreshed to `v5.19.0 · 2026-08-24 (dogfooded)`:**
- Claude — this session itself, driving `/ft-release` end-to-end. Dropped prior `; skipped @ v5.18.0` suffix.
- Grok — parallel session reported refreshed (evidence: DOGFOOD.md Steps 1–3 under Grok 4.6; contract read at SPEC v5.19.0; full cue vocabulary incl. NAS/TERM; Phase 1 drive on CORE-471). Did not write stamp files itself (CORE-406 parallel-dogfood-stamp-ownership) — applied here.
- Codex — parallel session reported refreshed (contract comprehension complete; read-only Phase 1 drive on CORE-471: Proceed). Applied here.
- Cursor — parallel session reported refreshed. Applied here.

Stamp locations updated: `docs/AGENT-COMPAT.md` matrix (4 rows), `claude/CAPABILITIES.md` §"Last verified" (Claude), `docs/PLATFORMS.md` footers (Grok/Codex/Cursor).

**SOP-currency check — one real finding, filed as follow-up.** Ran the standing `SPEC/procedures/*.md` drift scan; `SPEC/procedures/ft-task.md` (verified 2026-08-18) flagged one Tier-1 drift candidate: CORE-467 added a `## Completed`-rotation advisory check to `claude/skills/ft-task/SKILL.md` Step 1 without a matching SPEC/procedures mirror. Confirmed genuine (not a Claude-only-surface dismissal) and filed **[[CORE-472]]** via `/ft-file-followup` rather than fixing inline. Tier-2 note (5 `SPEC.md` commits since stamp) skimmed — all roster/wiring-count edits, no material restated-section drift.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (470 passed, 25 files), `node --test tools/update-adopters.test.mjs` (37 passed, 12 suites)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck`, `npm --prefix viz run lint`, `node --check tools/update-adopters.test.mjs`, `node --check tools/update-adopters.mjs` — all clean

- [x] **Quality assertions** — N/A (version-string substitutions + stamp updates only; no code logic changed in this cut)

- [x] (frontend) Asked the user for visual confirmation — N/A, no UI change in this cut

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `/ft-audit docs` subroutine over the 19-doc AI-referenced set: Pass 1 (Claims vs. code) 1 Low, Pass 2 (Cross-doc consistency) clean, Pass 3 (Cross-references) clean, Pass 4 (Currency) 1 High + 1 Low, Pass 5 (Stale content) clean. High (README.md task counter, 691→744 / date range) fixed inline per the standing README task-counter check. Both Lows (GLOSSARY.md missing `## Completed`-rotation entry; entry-count nit) absorbed inline on operator confirm — added alphabetized entry + bumped ~68→~71. Standing checks (wiring-consumer derivation, shipped-skill parity, installed-surface policy ×4, local self-wiring ×4, global wiring, mirror pairs B/C/E/F/G/H/I) all ran clean — no findings.

- [ ] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Cut flowtron v5.19.0 (minor, 68 commits since v5.18.0) — the largest release window yet. Headline additions: a new `/ft-refactor` depth-planner skill (read-only survey → sequenced, behavior-preserving refactor plan filed as an epic) plus a 7th `structure` domain for `/ft-audit`; viz's `App.tsx` decomposed into extracted hooks/components; PLAN.md's `## Completed` section bounded by a new rotation contract into a sibling `.flowtron/PLAN-ARCHIVE.md` (viz and `/ft-stats` updated to read both files); `/ft-release` now publishes GitHub Releases on push-go and its §7.1 drift checks also run in CI. Also landed: a wave of Grok/Codex/Cursor platform-parity hardening, a viz major dependency bump (React 19, Vite 8, Tailwind 4), and doc-currency fixes. Adopter impact: **no required project-side edits** — the new skill and the rotation contract are both additive/opt-in, picked up automatically on the next `/ft-update` or `/ft-task` invocation. One real SOP-currency drift surfaced during the cut (CORE-467's `## Completed`-rotation advisory not mirrored in `SPEC/procedures/ft-task.md`) — filed as [[CORE-472]] rather than fixed inline, per the flag-don't-bump contract. The `/ft-audit docs` doc-drift sweep found one High (README.md's stale task counter, 691→744) fixed inline, and two Low GLOSSARY findings (missing `## Completed`-rotation entry, stale entry count) absorbed inline on operator confirm.

**Archived:** 2026-08-25
