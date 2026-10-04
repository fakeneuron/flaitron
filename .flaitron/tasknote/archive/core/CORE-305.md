---
title: release v5.5.0
status: completed
tags: []
created: 2026-06-10
due:
related-tasks: [CORE-303, CORE-304, CORE-302]
---

# CORE-305 | release v5.5.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-303]] · 🔗 [[CORE-304]] · 🔗 [[CORE-302]]

## 🎯 Goal

Cut the v5.5.0 minor release tagging CORE-303 (fable added to the model vocabulary — tier-calibration + model-ID surfaces) and CORE-304 (de-anchored post-closure copy-paste glyph templates), since v5.4.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.4.0` → `v5.5.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.4.0` → `v5.5.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.4.0` → `v5.5.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.4.0` → `v5.5.0`
- [ ] `viz/package.json` `"version"` bumped `"5.4.0"` → `"5.5.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.5.0`, or recorded `skipped @ v5.5.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-305 — flowtron v5.5.0 (...)` commit lands
- [ ] Annotated `v5.5.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-305.md`

## 🧩 Subtasks

- [ ] Bump the 5 version pins (SPEC.md:3 · docs/MIGRATION.md example pin · SECURITY.md release-tag example pin · viz/src/ui/constants.ts VIZ_VERSION · viz/package.json version)
- [ ] Walk the dogfood gate — resolve Claude / Grok / Codex rows (refresh-from-verification or record `skipped @ v5.5.0`)
- [ ] Verify with single grep across the live doc set (residue expected only for skipped stamps + write-once archived tasknotes)
- [ ] Phase 3: markdown mental-pass on prose edits + viz lint/typecheck/test
- [ ] Phase 4: doc-drift sweep (`/ft-audit-docs` subroutine) · draft annotated tag message · flip PLAN line + archive tasknote · 📦 gate
- [ ] Commit + tag + push (atomic on 🟢 commit-go)

## 🔗 Related

- [[CORE-303]] — fable model vocabulary (the feat: triggering the minor bump)
- [[CORE-304]] — de-anchored copy-paste glyph templates (the misfire fix adopters are waiting on)
- [[CORE-302]] — prior release v5.4.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical minor-bump cut. Last tag `v5.4.0` matches `SPEC.md:3` (no aborted-release drift). Commits since the tag: `feat: CORE-303` (fable model vocabulary) + `docs: CORE-304` (de-anchored copy-paste templates) → highest rank `feat:`, no `feat!:`/BREAKING → minor → v5.5.0, matching the PLAN target (user-confirmed).

- [x] Read relevant source files — the 5 version-pin locations + the dogfood-gate stamp surface (below)

- [x] **Archive skim** — prior release CORE-302 (v5.4.0) is the live template; canonical recipe with a two-skip dogfood gate (Grok + Codex skipped) and write-once residue treatment. This cut applies the same treatment.

- [x] **Drift check** — all 5 pins confirmed at `v5.4.0` @ HEAD (grep verified); dogfood-stamp surface enumerated (see Discovery Notes)

- [x] Asked clarifying questions — version confirmed v5.5.0 via structured ask; adopter impact unambiguous (no required project-side edits); dogfood-gate per-agent walk happens in Phase 2

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Version-pin locations (drift check @ HEAD)

The 5 standard pins to bump `v5.4.0 → v5.5.0`:

- `SPEC.md:3` — `**Version:** v5.4.0` ✅
- `docs/MIGRATION.md:371` — `(e.g., \`v5.4.0\`)` illustrating `git describe` output. **Example pin → bump.**
- `SECURITY.md:109` — `Pin to annotated release tags (e.g. \`v5.4.0\`)`. ✅
- `viz/src/ui/constants.ts:41` — `VIZ_VERSION = 'v5.4.0'`. ✅
- `viz/package.json:4` — `"version": "5.4.0"` (bare semver). ✅

### Dogfood-gate stamp surface (the Phase 2 walk's targets)

| Agent | Current stamp | Locations |
|---|---|---|
| Claude | `v5.4.0 · 2026-06-08 (dogfooded)` | `AGENT-COMPAT.md:36` + `CAPABILITIES.md:56` |
| Grok | `v5.3.0 · 2026-06-06 (dogfooded; skipped @ v5.4.0)` | `AGENT-COMPAT.md:37` + `PLATFORMS.md:238` |
| Codex | `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.4.0)` | `AGENT-COMPAT.md:38` + `PLATFORMS.md:253` |

The `unverified` rows are noted-not-gated — skip.

### Adopter migration impact

Additive cohort, **no required project-side edits**:

1. **Fable in the model vocabulary (CORE-303).** `SPEC/model.md` tier calibration now names `fable` as a heavy-tier concrete token (Anthropic's tier above opus); downstream `[model]`-tag matching and `/ft-stats` bucketing recognize it. Consumed via submodule pin; no adopter edits.
2. **De-anchored copy-paste glyph templates (CORE-304).** All 8 post-closure hand-off templates now state the candidate-glyph mapping before the example and use a `<glyph>`/`${GLYPH}` placeholder instead of a literal 🔧 — fixes the observed misfire where a `[opus]🧠` next task got a 🔧 label line (bananapeel BP-2410.6). Behavioral prompt fix, consumed via pin on `/ft-update`; no adopter edits.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extend existing surfaces (the 5 version pins + the `last-verified` stamp cells); no new shape

- [x] Implemented the minimal solution — 5 version pins + dogfood-gate resolution (two refreshes + one recorded skip)

- [x] Updated/added tests for non-trivial behavior — N/A (version-string + doc edits; viz lint/typecheck/test run in Phase 3)

**Implementation Notes:**

### Phase 2 state (2026-06-10) — paused at the dogfood gate

- **5 version pins applied** v5.4.0→v5.5.0: `SPEC.md:3`, `docs/MIGRATION.md:371`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4`.
- **Dogfood gate — RESOLVED (two refreshes + one skip):**

  | Agent | Resolution | Stamp state |
  |---|---|---|
  | Claude | **Refreshed** (this `/ft-release` session: CORE-304 + CORE-308 micro-task drives + release flow) | `v5.5.0 · 2026-06-10 (dogfooded)` @ AGENT-COMPAT:36 + CAPABILITIES:56 |
  | Grok | **Refreshed** ([[CORE-306]] real run at the RC — verified CORE-304 glyph emission + CORE-303 fable vocab; committed `f6dbe80` on its behalf, the Grok session closed without committing) | `v5.5.0 · 2026-06-10 (dogfooded)` @ AGENT-COMPAT:37 + PLATFORMS:238 |
  | Codex | **Skipped @ v5.5.0** (no Codex subscription this round) | `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.5.0)` @ AGENT-COMPAT:38 + PLATFORMS:253 |

- **CORE-306 closed** (`f6dbe80` — also fixed the stale "re-verified at v5.3.0" prose at AGENT-COMPAT:96 → v5.5.0). **CORE-307 re-filed** under Future Opportunities as a version-agnostic codex-dogfood ticket (subscription-gated), replacing the v5.5.0-specific line.
- ⚠️ Working tree carries the uncommitted release edits while the dogfood runs execute — dogfood sessions stage only their own files (warning embedded in both PLAN lines).
- **Cohort grew mid-cut (operator-directed):** [[CORE-308]] (👇 `HERE` in-session cue — replaces the model glyph on the `Run in this session:` label; gates.md vocabulary widening) landed `c60eb48` before the tag. Still `docs:` → bump stays minor. Tag message must include it; the dogfood runs can verify the 👇 cue alongside the CORE-304 glyph fix. (SPEC.md pin was temporarily reverted for that commit and re-applied — RC state verified intact after.)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test`: 14 files, 178 tests pass

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` + `typecheck` clean (output shows `flowtron-viz@5.5.0`)

- [x] (frontend) Asked the user for visual confirmation — N/A (version-string constant only; header version label)

**Testing Notes:**

Markdown prose edits (SPEC/MIGRATION/SECURITY + stamp cells) are single-token substitutions; no frontmatter or fenced blocks touched. viz lint/typecheck/test all green at v5.5.0. Grep residue check returned **zero** stale `v5.4.0` refs in the live doc set (the Codex skip stamp pins `v5.2.0`, so no v5.4.0 residue exists by construction).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — ran `/ft-audit-docs` subroutine over the 11-file AI-referenced doc set; 2 Low findings, both absorbed inline into the cut: CAPABILITIES.md:32 session-reset cue quote ("then use…" → "then run:…"); AGENT-COMPAT cue-fallback label roster extended (`LIGHT`, `HEAVY`, `HERE` added). All version pins, stamps, links, and sections otherwise clean.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-10.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-305.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v5.5.0, tagging the hand-off-cue cohort — CORE-304 (de-anchored copy-paste glyph templates: mapping-first prose + `<glyph>` placeholder across all 8 hand-off sites, fixing the observed `[opus]🧠`-candidate-gets-🔧-label misfire) and CORE-308 (new 👇 `HERE` in-session cue replacing the borrowed model glyph on `Run in this session:` labels; one-glyph widening of the CORE-254 vocabulary) — plus CORE-303 (fable as a heavy-tier concrete token). Bumped the 5 version pins. Dogfood gate: Claude refreshed inline (this `/ft-release` session), Grok refreshed via a real CORE-306 run at the RC (committed `f6dbe80` on its behalf — the Grok session closed without committing), Codex recorded `skipped @ v5.5.0` (no subscription; CORE-307 re-filed version-agnostic under Future Opportunities). Doc-drift sweep: 2 Low findings absorbed inline. No adopter migration required — `/ft-update` picks everything up via the pin.

**Archived:** 2026-06-10
