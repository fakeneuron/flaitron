---
title: release v5.23.0
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-501, CORE-502, CORE-504, CORE-500]
---

# CORE-506 | release v5.23.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-501]] [[CORE-502]] [[CORE-504]] [[CORE-500]]

## 🎯 Goal

Cut v5.23.0, a minor release tagging the stamp-write-ownership mechanical backstop (CORE-501), the trailing-token suggestion-glyph ordering fix (CORE-502), and the scaffold-time purpose blurb (CORE-504) since v5.22.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.22.0` → `v5.23.0`
- [x] docs/MIGRATION.md example pin bumped `v5.22.0` → `v5.23.0`
- [x] SECURITY.md release-tag example pin bumped `v5.22.0` → `v5.23.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.23.0`, or recorded `skipped @ v5.23.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-506 — flowtron v5.23.0 (...)` commit lands
- [ ] Annotated `v5.23.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.23.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-506.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [x] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-501]] — stamp-write-ownership mechanical backstop, tagged in this release
- [[CORE-502]] — trailing-token suggestion-glyph ordering fix, tagged in this release
- [[CORE-504]] — scaffold-time purpose blurb, tagged in this release
- [[CORE-500]] — precedent: prior release tasknote (v5.22.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-500/484/480 precedent); commit log + version drift verified at Step 1.1/2 of `/ft-release`. This is the first cut to exercise CORE-501's stamp-write-ownership mechanical backstop, though no parallel-dogfooding race was observed in this session.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` for CORE-500 (prior release tasknote); confirms the 3-edit recipe (SPEC.md / MIGRATION.md / SECURITY.md only) is still current, and the dogfood-gate shape (Claude refreshed, three others resolved per operator input) is the standing pattern.

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.22.0`; `docs/MIGRATION.md:461` and `SECURITY.md:116` example pins both read `v5.22.0` — clean, matches `git describe --tags --abbrev=0`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Adopter-impact classification below found no required project-side edits.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 9 commits since v5.22.0 (16 files, +1231/−9). Grouped by cohort:

- **CORE-501 (stamp-write-ownership mechanical backstop)** — `/ft-release`'s §5 dirty-check now catches the parallel-dogfooding race even when a session misjudges its own role; the fix lives entirely in `claude/skills/ft-release/SKILL.md` (flowtron-self-only) and `docs/AGENT-COMPAT.md`. No adopter-facing surface.
- **CORE-502 (suggestion-glyph either-side acceptance)** — `viz/src/parser.ts` now emits `SUGGESTION_GLYPH` on both sides of the trailing-token run via a `SUGGESTION_GLYPH_AFTER` alias, so a PLAN line written `[xheavy]🔭 [unattended]` parses instead of dropping the row. Behavioral fix, auto-lands via `/ft-update`; viz is run from the flowtron checkout, not adopted piecemeal.
- **CORE-503 (visual-baseline carve-out refusal)** — contract-layer doc refinement to the `--unattended` 👁️ CONFIRM park rule (`SPEC.md`), naming the CORE-393 failure-mode vocabulary explicitly. No behavior change, no adopter action.
- **CORE-504 (scaffold-time purpose blurb)** — `/ft-task`, `/ft-goal-task`, and `/ft-micro-task` now write a one-line purpose blurb into the tasknote's Goal section at scaffold time, formalized in `SPEC.md` and `SPEC/gates.md`. Skill-body-only change (`claude/skills/ft-*/SKILL.md`), no `templates/` file touched — nothing for `/ft-update` to reconcile beyond the normal submodule bump.

**Verdict: no required project-side edits.** Nothing in this cut touches adopter-copied template files or requires a project-side reconcile. Migration block opens with the `No required project-side edits` sentinel.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`, all `v5.22.0` → `v5.23.0`. Post-edit grep clean — every remaining `v5.22.0` hit is expected residue: the dogfood stamps the gate below resolved, the write-once `docs/VERSION-HISTORY.md` historical entry, and a `docs/AGENT-COMPAT.md` prose reference to v5.22.0 as a past event (CORE-406 precedent narrative).

**SOP-currency check: clean, one candidate dismissed.** Two-tier walk over `SPEC/procedures/ft-task.md` (`source: claude/skills/ft-task/ templates/tasknote-template.md`, stamp `2026-08-29`) returned one tier-1 drift candidate and a tier-2 note of 3 SPEC.md commits. Candidate (4f9ac47, CORE-503) touched `claude/skills/ft-task/unattended-mode.md` and `SPEC/gates.md`, adding a rebuttal paragraph + rationalization-table row to the existing visual-confirm-park rule ("no park code, conversion row, cue glyph, banner, flag, heading, or validator added" per the commit's own note) and bumping a stale "Five" → "Six" gate count. Dismissed: the SOP already says "the six gates" at line 56 (correct count, no restatement drift), and it routes to `SPEC/gates.md` for the full contract rather than restating the rebuttal prose — nothing here for the SOP to mirror. Tier-2 note (CORE-502, CORE-500, CORE-494 touching SPEC.md) skimmed: CORE-502 is a viz-parser-only glyph-position tolerance, not part of the operator-facing task-line grammar the SOP restates; CORE-500/494 predate or coincide with the stamp date. No follow-up filed. Stamp left un-bumped per the flag-don't-bump rule.

**Dogfood gate:**
- **Claude** — refreshed to `v5.23.0 · 2026-08-30 (dogfooded)`. Directly evidenced: this session is driving `/ft-release` end-to-end through the cut. `docs/AGENT-COMPAT.md` matrix row + `claude/CAPABILITIES.md` §"Last verified" bumped.
- **Grok** — skipped @ v5.23.0 (operator confirmed no Grok session ran this cycle). Stamp kept at `v5.22.0 · 2026-08-29 (dogfooded; skipped @ v5.23.0)`. `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` Grok footer.
- **Codex** — skipped @ v5.23.0 (operator confirmed). Same stamp shape. `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` Codex footer.
- **Cursor** — skipped @ v5.23.0 (operator confirmed). Same stamp shape. `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` Cursor footer.

No parallel-dogfooding race observed — `git status --porcelain` on the three stamp files was clean before this walk began.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A (version strings + stamps only)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Standing validation gate (`AGENTS.md` §"Validation") — all 6 pass:
- `npm --prefix viz test` — 28 files, 524/524 passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — 49/49 passed
- `node --check tools/update-adopters.test.mjs` — clean
- `node --check tools/update-adopters.mjs` — clean

No feature-specific test pass needed — this cut is version-string edits, stamp resolution, and PLAN.md filing. Each shipped feature (CORE-501, CORE-502, CORE-504) ran its own suite in its own tasknote.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `/ft-audit docs` subroutine (5 passes over the 18-doc AI-referenced set; rubric = `.flowtron/tasknote/README.md` §"AI-referenced docs" + `README.md` + `SPEC.md`, gates = none configured, scope resolved via run-once derivation matching the CORE-500/CORE-484 precedent). **Zero findings.** Only `SPEC.md` and `docs/AGENT-COMPAT.md` changed within the sweep set since CORE-500's full sweep one day prior (9 commits, 16 files, +1231/−9 total) — both additions (CORE-502's either-side glyph note, CORE-504's new §"Scaffold-time purpose blurb", CORE-501's mechanical-backstop paragraph) are internally consistent with no cross-doc drift, broken links, or stale claims introduced.

  Standing mechanical checks — wiring-consumer derivation, shipped-skill parity, installed-surface policy (×5 diffs), local self-wiring (×4, blocking), global wiring (advisory: no dangling links, exactly 1 path casing across 23 links), and mirror pairs A/B/C/E/F/G/H/I/J/K — **all clean on the first run**. Pair D (README task-counter) found the one drift: `README.md:23-24` read "803 tasks … as of 2026-08-29" against an archive holding 807 (808 once this tasknote lands in the same commit) with a latest `**Archived:**` of 2026-08-30. **Fixed inline** as the recipe's mechanical substitution.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.23.0 (minor, 9 commits since v5.22.0, 16 files, +1231/−9). Three feature-level changes, each closing a gap found by dogfooding the workflow on itself: `/ft-task` / `/ft-micro-task` / `/ft-goal-task` now emit a scaffold-time purpose blurb so a cold-started operator gets an immediate read before Phase 1 ([[CORE-504]]); the viz parser now accepts the model-suggestion glyph on either side of the trailing-token run, closing a footgun that could silently drop a PLAN row carrying both the glyph and `[unattended]` ([[CORE-502]]); and `/ft-release`'s dogfood-gate stamp writes gained a `git status --porcelain` dirty-check immediately before writing, so a parallel dogfooding session's uncommitted edits are caught rather than overwritten ([[CORE-501]], closing the exact gap CORE-500's own cut hit). Alongside: [[CORE-503]] settled a re-raised carve-out attempt against the `--unattended` 👁️ visual-confirmation park, refusing the argument that a passing visual baseline is a replayed human approval rather than a fresh judgment call.

**Adopter impact: no required project-side edits.** Everything lands automatically on the next `/ft-update`. No `templates/` file was touched this cycle, so there is no optional reconcile item either — a cleaner cut than v5.22.0's one optional item.

**Verification:** all 6 standing gates green (524 viz tests, 49 updater tests, typecheck/lint/checks clean); SOP currency clean (one drift candidate dismissed — a doc-only rationalization addition that didn't change the SOP's already-correct "six gates" count); the doc sweep's 5 passes plus every standing mirror-pair and wiring check ran clean except the README task counter, fixed inline (803→808, date 2026-08-29→2026-08-30).

**Archived:** 2026-08-30
