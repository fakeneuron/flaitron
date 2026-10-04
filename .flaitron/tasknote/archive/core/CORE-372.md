---
title: release v5.14.0
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: [CORE-EPIC-362, CORE-364, CORE-366, TEST-EPIC-002, CORE-371, CORE-373, CORE-361]
---

# CORE-372 | release v5.14.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-EPIC-362]] [[CORE-364]] [[TEST-EPIC-002]] [[CORE-371]]

## 🎯 Goal

Cut the v5.14.0 minor release tagging CORE-EPIC-362 (clean-code contract), CORE-364/CORE-366 (updater decompose + hardening), TEST-EPIC-002 (portable release gates), CORE-371 (shared workspace helpers), and CORE-373 (model-roster refresh) since v5.13.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.13.0` → `v5.14.0`
- [x] docs/MIGRATION.md example pin bumped `v5.13.0` → `v5.14.0`
- [x] SECURITY.md release-tag example pin bumped `v5.13.0` → `v5.14.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.13.0` → `v5.14.0`
- [x] `viz/package.json` `"version"` bumped `"5.13.0"` → `"5.14.0"` (bare semver, no `v` prefix)
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.14.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-372 — flowtron v5.14.0 (...)` commit lands
- [x] Annotated `v5.14.0` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-372.md`

## 🧩 Subtasks

- [x] 5 version edits + dogfood gate stamps
- [x] viz lint/typecheck/test + updater test suite
- [x] Doc-drift sweep + wiring-count/parity/installed-surface checks
- [x] Tag message drafted and approved
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-EPIC-362]] — clean-code contract (feat driving the minor bump)
- [[CORE-364]] — update-adopters main decompose
- [[CORE-366]] — updater hardening
- [[TEST-EPIC-002]] — portable full-repo release gates
- [[CORE-371]] — shared workspace helpers
- [[CORE-373]] — model-roster refresh
- [[CORE-361]] — prior release v5.13.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:3` and `git describe` both read `v5.13.0` (no drift). Unreleased commits include additive `feat:` work (CORE-EPIC-362, CORE-364, CORE-371, CORE-373, TEST-002.4) with no `feat!:` and no `BREAKING CHANGE:` in any body — highest rank is minor → `v5.14.0`, matching the PLAN-line target exactly.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:399`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — CORE-361 (v5.13.0) is the direct prior precedent: same five-pin, dogfood-gate, doc-sweep, tag, archive shape. Its residue adjudication for `SPEC/procedures/ft-task.md` was reused here.

- [x] **Drift check** — all five pins resolved at `v5.13.0` pre-edit; last tag matched `SPEC.md:3`. No pre-edit drift.

- [x] No clarifications needed beyond the mandatory dogfood-gate resolution (asked via AskUserQuestion; all three rows came back refreshed).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Commits since v5.13.0: **CORE-EPIC-362** (`feat:` clean-code contract — Best Practices Review, Pattern survey, Minimal Refactor Gate, Quality Assertions, evidence-based recap, propagated to the neutral procedure + runner cadence paths), **CORE-363** (`fix:` epic-child closure placement), **CORE-364** (`feat:` update-adopters main decompose), **CORE-366** (`fix:` updater hardening — pinned-SHA verification, staged-diff error branching, regex-parity contract test), **TEST-EPIC-002** (portable release gates — `--no-hardlinks` fixture clones + updater suite registered as a release gate), **CORE-371** (`feat:` shared workspace helpers), **CORE-373** (`feat:` model-roster refresh for the Claude 5 family), plus viz fixes FE-071/072/073/075/076/077 and doc-currency fixes CORE-365/367/368/370. No `feat!:` / `BREAKING CHANGE:`.

**Adopter impact:** no required project-side edits. Every changed surface — SPEC contract, `templates/*`, skill bodies — is read live from the submodule at the pinned tag (`SPEC/procedures/ft-task.md:110` scaffolds from `templates/tasknote-template.md` in-place), so a pin bump picks the changes up automatically. `templates/tasknote-README.md` (the only adopter-*seeded* template) is unchanged, so no re-seed is needed, and no new skill directories shipped, so the 13-skill / 13-command adopter-installed surface is unchanged and no `/ft-update` rewiring is required. Migration sentinel: `No required project-side edits`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release pattern follows CORE-361

- [x] **Minimal refactor gate** — N/A (version-string release)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string release; the shipping features' tests landed in their own tasknotes)

**Implementation Notes:** 5 version edits v5.13.0→v5.14.0: `SPEC.md:3`, `docs/MIGRATION.md:399`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json`. Dogfood gate — all three rows **refreshed** from real verification runs at v5.14.0 (operator ran Grok Build and Codex CLI dogfood sessions in parallel with this cut; both passed contract comprehension, cue-render, and Phase-1 drive with zero files written): **Claude** → `v5.14.0 · 2026-07-27 (dogfooded)` (`docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:56`); **Grok** → same stamp (`docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:291`); **Codex** → same stamp (`docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:313`). No `; skipped @` suffixes anywhere — all three rows current. Residue adjudication: `SPEC/procedures/ft-task.md:4` `last-verified: v5.13.0 · 2026-07-21` left untouched per CORE-361/CORE-356 precedent — SOP↔source currency stamp, not a release pin or dogfood row.

Five inline doc fixes absorbed from the §7.1 sweep (both High clusters were drift introduced by *this* cycle): the release-gate enumeration now names the portable updater suite in `docs/CONVENTIONS.md:90`, `docs/MIGRATION.md:171`, `SPEC.md:56`, and `README.md:204` (TEST-002.4 registered the gate without fanning out); and `claude/CAPABILITIES.md:29` now documents the Claude `low`/`medium`/`high`/`xhigh`/`max` effort ladder plus the "effort never earns a `[model]` token" rule that CORE-373 canonized — a row that would otherwise have carried a freshly-refreshed v5.14.0 dogfood stamp while describing pre-CORE-373 reality.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — version-string and prose edits only; no duplication, dead code, or public-surface growth introduced

- [x] (frontend) Visual confirmation not needed — version-string release only; no UI behavior changed

**Testing Notes:** `npm --prefix viz run lint` passed (eslint src, clean). `npm --prefix viz run typecheck` passed (tsc --noEmit, clean). `npm --prefix viz run test` passed: 18 files, 242 tests. `node --test tools/update-adopters.test.mjs` passed 24/24 across 9 suites — the TEST-002.4 portable gate, run here for the first time as a registered release gate. Package reports `flowtron-viz@5.14.0` (bump confirmed). Markdown mental-pass on SPEC.md / docs/MIGRATION.md / SECURITY.md: single-token version substitutions, no frontmatter touched, no fenced blocks broken. Standing §7.1 checks green: Claude symlink wiring count 26, matching MIGRATION §1.6 (13 commands + 13 skills), ft-new-project Step 7 (26 paths) and Step 8 (26 `readlink` lines + "twenty-six" prose); shipped-skill parity claude↔codex exact; installed-surface 13-slug adopter subset exact across all three snippets; zero forbidden repo-scoped installs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `ft-audit-docs` subroutine run over all 12 AI-referenced docs (5 passes). `README.md` release-gate mention updated; `SPEC.md` version pin + `tools/` layout line updated; `docs/MIGRATION.md` example pin + audit-gate list updated; `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change; `docs/CONVENTIONS.md` CI-decline gate enumeration updated; `CONTRIBUTING.md` no change; `SECURITY.md` release-tag example bumped; `docs/AGENT-NEUTRALITY.md` no change (ledger drift filed as CORE-375); `docs/PLATFORMS.md` Grok+Codex footers refreshed (currency cluster filed as CORE-377); `claude/CAPABILITIES.md` Claude stamp refreshed + effort-ladder row updated; `docs/AGENT-COMPAT.md` all three dogfood rows refreshed. Both High clusters fixed inline; four pre-existing Medium/Low clusters filed as CORE-374 through CORE-377 rather than ballooning the cut.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-27.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:** Flowtron v5.14.0 minor release ships the clean-code contract (CORE-EPIC-362 — Best Practices Review, Pattern survey, Minimal Refactor Gate, Quality Assertions, and an evidence-based recap folded into the existing four phases with no new phase, validator, or scorecard), the Claude 5 model-roster refresh with the effort/context-variant token carve-out (CORE-373), update-adopters decompose + hardening with pinned-SHA verification (CORE-364/CORE-366), portable release gates that made the updater suite sandbox-runnable and release-required (TEST-EPIC-002), shared viz workspace helpers (CORE-371), and epic-child closure placement (CORE-363). No required adopter migration: every changed surface is read live from the submodule at the pinned tag, the only adopter-seeded template is unchanged, and no new skills shipped, so the 13-skill / 13-command installed surface needs no rewiring. Dogfood gate fully resolved — Claude, Grok, and Codex all refreshed to `v5.14.0 · 2026-07-27 (dogfooded)` from real verification runs, with no skip suffixes outstanding. Gates: viz 242/242 across 18 files, updater 24/24, lint and typecheck clean.

**Archived:** 2026-07-27
