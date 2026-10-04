---
title: release v5.22.0
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-489, CORE-EPIC-490, FE-EPIC-101, CORE-484]
---

# CORE-500 | release v5.22.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-EPIC-489]] [[CORE-EPIC-490]] [[FE-EPIC-101]] [[CORE-484]]

## 🎯 Goal

Cut v5.22.0, a minor release tagging two contract epics (CORE-EPIC-489 sweep coverage, CORE-EPIC-490 updater failure honesty), the FE-EPIC-101 viz archive-scale epic, and the CORE-485..499 cross-repo conformance and skill/doc cohort since v5.21.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.21.0` → `v5.22.0`
- [x] docs/MIGRATION.md example pin bumped `v5.21.0` → `v5.22.0`
- [x] SECURITY.md release-tag example pin bumped `v5.21.0` → `v5.22.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.22.0`, or recorded `skipped @ v5.22.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-500 — flowtron v5.22.0 (...)` commit lands
- [ ] Annotated `v5.22.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.22.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-500.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [x] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-EPIC-489]] — tier-mirror-and-sweep-coverage epic, tagged in this release
- [[CORE-EPIC-490]] — updater-failure-honesty epic, tagged in this release
- [[FE-EPIC-101]] — viz-archive-scale epic, tagged in this release
- [[CORE-484]] — precedent: prior release tasknote (v5.21.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-484/480/471 precedent); commit log + version drift verified at Step 1.1/2 of `/ft-release`. This is the first cut whose PLAN line was filed by the skill's own new Step 1.1 fallback ([[CORE-499]]) rather than hand-written ahead of invocation.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` for CORE-484, CORE-480, CORE-471 (prior release tasknotes); confirms the 3-edit recipe (SPEC.md / MIGRATION.md / SECURITY.md only) is still current, and that CORE-484's dogfood-gate shape (Claude refreshed, three others skipped) is the standing pattern.

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.21.0`; `docs/MIGRATION.md:461` and `SECURITY.md:116` example pins both read `v5.21.0` — clean, matches `git describe --tags --abbrev=0`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed on the bump itself. The adopter-impact classification below found one **optional** reconcile item that the Migration block must name rather than defaulting to the sentinel.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 31 commits since v5.21.0 (88 files, +6237/−350). Grouped by cohort:

- **CORE-EPIC-489 (tier-mirror-and-sweep-coverage)** — `[xheavy]🔭` propagated into `docs/DOGFOOD.md`'s cue checklist and `docs/GLOSSARY.md`'s `[model]` entry; `docs/VISION.md` added as the 18th doc-drift sweep entry; `templates/tasknote-README.md` reconciled ("Three" → "Five variants" + the missing Sidequest bullet). Its own `.N` audit found the sweep-coverage fix had silently reversed a standing lazy-loading decision, which [[CORE-491]] then settled.
- **CORE-EPIC-490 + CORE-493 (fleet updater)** — `gitlinkDrift` no longer reports a git failure as `✓ current`, the bump commit skips adopter hooks, and the per-adopter `FLOWTRON_REPO` spawn storm is memoized (`(fromTag, toTag)` caches plus CORE-493's single-tag `cachedCanonicalTagSha`). `tools/update-adopters.mjs` is the **maintainer-side** fleet tool — adopters never run it — so this whole cohort is invisible downstream.
- **FE-EPIC-101 (viz-archive-scale)** — archive wire slimming, targeted SSE refetch, collapsed-section unmount, and a bounded archive cache; `React.memo` on both row components. Auto-lands via `/ft-update`; viz is run from the flowtron checkout, not adopted.
- **CORE-485 (fleet-name-leakage-sweep)** — the substantive find: `/ft-worktree-start` and `/ft-worktree-end` computed `WT_ROOT="$HOME/code/${PROJECT_SLUG}-worktrees"`, hardcoding every adopter's project parent as `~/code`. Now derived as `$(dirname "$PROJECT_ROOT")` — identical for projects under `~/code`, **correct for adopters anywhere else**, where worktrees were previously created in the wrong tree. Behavioral fix, no adopter action required, but worth naming in the Migration block.
- **CORE-486 / 487 / 488 / 491 / 492 / 496 / 497 / 498** — contract ratifications and doc currency: the two cross-project carve-outs made reciprocal, the no-runtime mirror pattern named and given release-gate Pair K, a new `SPEC.md` §"Cross-repo edit remit", the VISION sweep-role split settled, the skill-layer sweep blindspot adjudicated as deliberately unguarded, and the `ft-task` SOP re-synced. Contract-layer only; nothing to do downstream.
- **CORE-494 (unattended-marker-grammar)** — `[unattended]` promoted from an accident of the stacked-`[model]` tolerance to canonical task-line grammar: the viz parser captures it into `Task.unattended`, and `SPEC.md` names it, fixes its position after `[model]`, and documents both mis-authoring shapes. Fully additive — flowtron itself never writes the marker, and rows without it are unchanged.
- **CORE-495 (visual-confirm-park)** — a Phase 3 👁️ visual-confirmation ask under `--unattended` now parks with `park-reason: visual-confirm — …` instead of committing silently. Behavior change confined to the operator-less posture, which is opt-in.
- **CORE-499 (ft-release-self-file-line)** — `/ft-release` files its own pending release line when PLAN carries none. Flowtron-self-only skill; never shipped to adopters.

**The one migration item.** `templates/PLAN.md` and `templates/tasknote-README.md` are **copied at adoption, not symlinked**, so a `/ft-update` bump does not refresh an adopter's own `.flowtron/PLAN.md` header comment or `.flowtron/tasknote/README.md`. Three changes landed in those templates this cycle: the `[unattended]` marker in the task-line grammar comment (CORE-494), the "Five variants" + Sidequest stub bullet (CORE-489.4), and the "membership means swept for drift, not loaded at cold start" clarifier (CORE-491).

**Verdict: one optional adopter reconcile, no required edits.** Nothing breaks if an adopter skips it — their PLAN.md parses identically and every skill behaves the same; the copies just describe a smaller feature surface than the version they are pinned to. The Migration block names it as optional rather than opening with the `No required project-side edits` sentinel, following the CORE-048/CORE-047 precedent for a context-sensitive migration note.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`, all `v5.21.0` → `v5.22.0`. Post-edit grep clean — every remaining `v5.21.0` hit is expected residue: the `SPEC/procedures/ft-task.md` SOP sync stamp (never a release pin), the write-once `docs/VERSION-HISTORY.md` historical entry, and the dogfood stamps the gate below resolved.

**SOP-currency check: clean.** Two-tier walk over `SPEC/procedures/ft-task.md` (`source: claude/skills/ft-task/ templates/tasknote-template.md`, stamp `2026-08-29`) returned zero tier-1 drift candidates and zero tier-2 notes — expected, since [[CORE-496]] re-verified this SOP earlier the same day. Stamp left un-bumped per the flag-don't-bump rule; no follow-up filed.

**Dogfood gate — all 4 refreshed to `v5.22.0 · 2026-08-29 (dogfooded)`:**
- **Claude** — refreshed. Directly evidenced: this session drove `/ft-release` end-to-end through the cut. `docs/AGENT-COMPAT.md` matrix row + `claude/CAPABILITIES.md` §"Last verified" bumped.
- **Grok** — refreshed. Evidenced by a parallel Grok Build session reporting `docs/DOGFOOD.md` Steps 1–3 passed at v5.22.0: skill body loaded from `.claude/skills/` compat, full cue vocabulary emitted, Phase 1 driven on CORE-500 (Proceed, default-skip), no files written by Grok. `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` Grok footer bumped.
- **Codex** — refreshed **on operator vouch at the §5 gate**, not on evidence surfaced in this session. Recorded honestly because the original write carried a checkably false justification ("matrix row + PLATFORMS footer already at v5.22.0"): both read `v5.20.0 · 2026-08-26 (dogfooded; skipped @ v5.21.0)` immediately before the walk, so the row was bumped by the write rather than found current.
- **Cursor** — refreshed **on operator vouch at the §5 gate**, same footing as Codex. The original write attributed a DOGFOOD.md end-to-end run to "this session" while the Grok evidence block simultaneously claimed "this session," and the structured ask it cited was this Claude session's own `AskUserQuestion` — so that attribution is not reproducible from the record and is not restated as if it were.

**Parallel-dogfooding note (CORE-406 class).** A Grok session wrote all eight stamp locations while this Claude session was carrying the cut to tag/push, which the §5 stamp-write-ownership rule reserves to the release-driving session. The race did not corrupt the version pins, but it did produce two `dogfooded` rows whose written rationale did not survive checking, plus two tasknote ticks that contradicted reality in opposite directions (subtask 36 claimed the SOP-currency walk had run before it had; subtask 35 showed the applied version edits as pending). All four were reconciled by hand before tagging — exactly the hand reconciliation the rule predicts when both sides write.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A (version strings + stamps only)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Standing validation gate (`AGENTS.md` §"Validation") — all 6 pass:
- `npm --prefix viz test` — 28 files, 521/521 passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — 49/49 passed
- `node --check tools/update-adopters.test.mjs` — clean
- `node --check tools/update-adopters.mjs` — clean

No feature-specific test pass needed — this cut is version-string edits, stamp resolution, and two doc corrections. Each shipped feature ran its own suite in its own tasknote.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `/ft-audit docs` subroutine (5 passes over the 18-doc AI-referenced set; scaffold placeholders resolved by run-once derivation — scope supplied by the caller as the `ai-referenced` token, rubric = `.flowtron/tasknote/README.md` §"AI-referenced docs" + `README.md` + `SPEC.md`, gates = none configured, matching the [[CORE-484]] precedent). **One Low finding, absorbed inline:** `docs/PLATFORMS.md:116` cited "36 roster entries for 18 skills ([[CORE-439]])" while the shipped inventory has grown to 19, so an attributed measurement no longer reproduced. Fixed by dating the measurement and naming the ratio as the point — deliberately *not* by live-updating the number, which would convert a historical record into a counter needing its own gate. Passes 1/2/3/5 clean, verified rather than assumed: README's `SPEC/` list matches disk 8-for-8 and its `docs/` list 12-for-12; all 23 `v5.x` pins across the set reconcile; every relative link in all 18 docs resolves (three apparent breaks re-confirmed as the CORE-484 false-positive class — a nav-header template inside a fenced block, and two prose examples of legacy-link style); zero stale-content markers.

  Standing mechanical checks — wiring-consumer derivation, shipped-skill parity, installed-surface policy (×5 diffs), local self-wiring (×4, blocking), global wiring (advisory: no dangling links, exactly 1 path casing across 23 links), and mirror pairs A/B/C/E/F/G/H/I/J/K — **all clean on the first run**. Pair D (README task-counter) found the one drift: `README.md:22-23` read "777 tasks … as of 2026-08-27" against an archive holding 802 (803 once this tasknote lands in the same commit) with a latest `**Archived:**` of 2026-08-29. **Fixed inline** as the recipe's mechanical substitution. The `**Archived:**`-field gap is 2 of 802 (0.25%) — immaterial, no follow-up filed.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.22.0 (minor, 31 commits since v5.21.0, 88 files, +6237/−350). The cut's own theme is the release's: making implicit conventions explicit and checkable. `[unattended]` stopped being an accident of the stacked-`[model]` tolerance and became declared grammar the viz parser captures ([[CORE-494]]); an unwritten routing rule became `SPEC.md` §"Cross-repo edit remit" ([[CORE-488]]); `$HOME/code` stopped being hardcoded in the worktree pair and became a derivation from the project root, which is the one behavioral fix adopters outside `~/code` will actually feel ([[CORE-485]]); and the no-runtime rule's eight restatements were ratified as a named "canonical source with labeled mirrors" pattern with a release-time guard rather than left to read as duplication ([[CORE-487]]). Alongside: the fleet updater stopped reporting an unresolvable git lookup as `✓ current` ([[CORE-EPIC-490]]), the viz archive board got its scale pass ([[FE-EPIC-101]]), and three doc-currency tasks ([[CORE-491]], [[CORE-492]], [[CORE-496]]) settled the VISION sweep-role split, adjudicated the skill-layer blind spot as deliberately unguarded, and re-synced the agent-neutral SOP.

**Adopter impact: no required project-side edits, one optional reconcile.** Everything lands automatically on the next `/ft-update`. The optional item is that `templates/PLAN.md` and `templates/tasknote-README.md` are copied at adoption rather than symlinked, so three template changes this cycle (the `[unattended]` grammar comment, the "Five variants" roster with its Sidequest bullet, and the swept-for-drift clarifier) do not reach copies already in an adopter's tree. Nothing breaks if skipped — the Migration block therefore keeps the `No required project-side edits` sentinel, which is load-bearing: `update-adopters.mjs:migrationBearingTags` does a `startsWith` on it, and a different opening line would flag the entire fleet as migration-bearing over a documentation nicety.

**Process note worth carrying forward.** Two things about this cut were unusual. First, it is the first release whose PLAN line was filed by `/ft-release` itself ([[CORE-499]], landed immediately before as its own task) rather than hand-written ahead of invocation — the Step 1.1 fallback computed the bump, proposed the ID, and filed on confirm. Second, a parallel Grok session wrote all eight dogfood stamp locations while this session was carrying the cut to tag/push, which the §5 stamp-write-ownership rule reserves to the release-driving session. The version pins were unaffected, but two `dogfooded` rows arrived with rationale that did not survive checking (the Codex row's stated justification was checkably false; the Cursor row's attribution collided with Grok's), and two tasknote ticks contradicted reality in opposite directions. The gate did its job — the discrepancy was caught before tagging, the operator vouched for the two rows, and the record now states what actually backs each one rather than the original claims. An `/ft-audit` pass reading these stamps should treat Codex and Cursor at v5.22.0 as operator-vouched, not session-evidenced.

**Verification:** all 6 standing gates green (521 viz tests, 49 updater tests, typecheck/lint/checks clean); SOP currency clean; the doc sweep's 5 passes plus every standing mirror-pair and wiring check run, with 2 findings fixed inline (README task counter 777→803, `docs/PLATFORMS.md:116` measurement dated).

**Archived:** 2026-08-29
