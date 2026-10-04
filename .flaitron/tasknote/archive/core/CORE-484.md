---
title: release v5.21.0
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482, CORE-EPIC-483, CORE-480]
---

# CORE-484 | release v5.21.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]] [[CORE-EPIC-483]] [[CORE-480]]

## 🎯 Goal

Cut v5.21.0, a minor release tagging the model-tier-recalibration epic (CORE-EPIC-482) and the screenshot-discipline epic (CORE-EPIC-483) since v5.20.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.20.0` → `v5.21.0`
- [x] docs/MIGRATION.md example pin bumped `v5.20.0` → `v5.21.0`
- [x] SECURITY.md release-tag example pin bumped `v5.20.0` → `v5.21.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.21.0`, or recorded `skipped @ v5.21.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-484 — flowtron v5.21.0 (...)` commit lands
- [ ] Annotated `v5.21.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.21.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-484.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [x] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-EPIC-482]] — model-tier-recalibration epic, tagged in this release
- [[CORE-EPIC-483]] — screenshot-discipline epic, tagged in this release
- [[CORE-480]] — precedent: prior release tasknote (v5.20.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-480/471/449 precedent); commit log + version drift verified in Step 2 of `/ft-release`.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md` example pin, `SECURITY.md` release-tag pin

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` for CORE-480, CORE-471, CORE-449 (prior release tasknotes); confirms the 3-edit recipe (SPEC.md/MIGRATION.md/SECURITY.md only) is still current

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.20.0`; `docs/MIGRATION.md:461` and `SECURITY.md:116` example pins both read `v5.20.0` — clean, matches `git describe --tags --abbrev=0`

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Bump is minor; adopter impact is unambiguous (see Discovery Notes).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 12 commits since v5.20.0. Grouped by epic:

- **model-tier-recalibration (CORE-EPIC-482, .1–.N)** — adds a new `[xheavy]🔭` model tier alongside the existing `[light]🔧` / `[medium]🧩` / `[heavy]🧠` three-way, with a calibration table, viz parser support (`parser.ts`), and propagation across 13 skill/doc files (`claude/skills/*`, `docs/*`, `SPEC/procedures/ft-task.md`). Fully additive — existing tags are unaffected, and a caller that never uses `[xheavy]` sees no behavior change. No manual adopter edit required; lands automatically via the next `/ft-update`. Worth a Migration-block mention as a heads-up on the new tier.
- **screenshot-discipline (CORE-EPIC-483, .1–.N)** — per its own audit's "flowtron stays silent" verdict, confirmed by diff: this epic touches only `.flowtron/PLAN.md` and archived tasknotes in flowtron's own checkout. It's a personal screenshot-policy change (global `CLAUDE.md`, natabula deposits, adopter-repo screenshot pruning) tracked as flowtron tasks but carrying zero flowtron-shipped surface. No adopter-facing change at all.

**Verdict: no required project-side edits.** The `[xheavy]` model tier (CORE-EPIC-482) is the only user-visible addition and is fully additive/opt-in — worth a Migration-block heads-up, not a required change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`, all `v5.20.0` → `v5.21.0`. Grep verification clean — remaining `v5.20.0` hits are expected residue (dogfood stamps, VERSION-HISTORY historical entry).

**Dogfood gate — resolved:**
- Claude — refreshed to `v5.21.0 · 2026-08-27 (dogfooded)` — this session itself, driving `/ft-release` end-to-end.
- Grok, Codex, Cursor — no real session run this cycle; recorded `; skipped @ v5.21.0` suffix, prefix held at last real verification (`v5.20.0 · 2026-08-26`).

Applied together across `docs/AGENT-COMPAT.md` (4 matrix rows), `docs/PLATFORMS.md` (3 non-Claude footers), and `claude/CAPABILITIES.md` (Claude footer).

**SOP-currency check:** clean. `SPEC/procedures/ft-task.md` — 2 Tier-1 candidates (CORE-482.2, CORE-482.3), both dismissed: the SOP's §2 model-check delegates tier mechanics to `SPEC/model.md` (already updated) rather than restating them inline, so there's no neutral-layer surface for the `[xheavy]` gate/roster changes to strand. Tier-2 advisory noted 5 `SPEC.md` commits since the 2026-08-25 stamp; skimmed — the glyph-vocabulary widening was already mirrored into the SOP by CORE-482.4 the same day. No follow-up filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A (version strings + stamps only)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Standing validation gate (`AGENTS.md` §"Validation") — all 6 pass:
- `npm --prefix viz test` — 25 files, 481/481 passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — 37/37 passed
- `node --check tools/update-adopters.test.mjs` — clean
- `node --check tools/update-adopters.mjs` — clean

No feature-specific test pass needed — this cut is version-string edits + stamp resolution only.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `/ft-audit docs` subroutine (5 passes over the 17-doc AI-referenced set; scaffold placeholders resolved via run-once derivation on operator confirm — scope = the 17-doc set, rubric = that same file + README.md + SPEC.md, gates = none configured): Pass 1 (Claims vs. code) clean, Pass 2 (Cross-doc consistency) — 1 finding: `docs/AGENT-NEUTRALITY.md:43` still listed the stale three-way `[heavy]🧠`/`[medium]🧩`/`[light]🔧` glyph set missing `[xheavy]🔭` (CORE-482.3/.4 widened it elsewhere but missed this file) — **fixed inline** (trivial one-line doc edit, release-adjacent to this cut's own CORE-482 epic). Pass 3 (Cross-references) clean — 2 apparent broken relative links (`SPEC.md:473`, `docs/MIGRATION.md:403`) confirmed as illustrative examples inside a nav-header template and prose, not real navigable links. Pass 4 (Currency) clean — spot-checked all `2026-*` date stamps, all legitimate write-once historical records. Pass 5 (Stale content) clean — `legacy`/`deprecated` mentions are all intentional backward-compat documentation.

  Standing mechanical checks (wiring-consumer derivation, shipped-skill parity, installed-surface policy ×5, local self-wiring ×4 [blocking], global wiring [advisory, clean: no dangling links, 1 path casing], mirror pairs A/B/C/E/F/G/H/I/J) all ran **clean**. Pair D (README task-counter) found drift: README.md said "765 tasks... as of 2026-08-26"; actual archive count is 777 files, latest `**Archived:**` date 2026-08-27. **Fixed inline** (mechanical text substitution, Critical/High per recipe).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.21.0 (minor, 12 commits since v5.20.0). Headline: the manual-only `[xheavy]🔭` exploratory model tier (CORE-EPIC-482) — a new rung above `[heavy]` with an always-⚠️ under-tier advisory (never blocking), a round-up default for practical model-tag guidance, a maintained platform×model×effort calibration table in `SPEC/model.md`, glyph propagation across every next-move emitter and the agent-neutral SOP, and viz parser support with a dedicated regression test. Also landed: the screenshot-discipline epic (CORE-EPIC-483), confirmed by diff to carry zero flowtron-shipped surface — personal screenshot policy only. Adopter impact: **no required project-side edits** — the new tier is fully additive/opt-in. Dogfood gate: Claude refreshed to `v5.21.0 · 2026-08-27 (dogfooded)` (this session); Grok/Codex/Cursor recorded `skipped @ v5.21.0`, prefix held at `v5.20.0`. SOP-currency: clean (2 candidates dismissed — SOP delegates model-tier mechanics to `SPEC/model.md` rather than restating them). Doc-drift sweep: one real finding — `docs/AGENT-NEUTRALITY.md`'s stale three-way glyph list missing `[xheavy]🔭` — fixed inline; README.md's task counter (765→777, date range →2026-08-27) also fixed inline; all standing mirror-pair/wiring-parity checks came back clean.

**Archived:** 2026-08-27
