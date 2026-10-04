---
title: release v5.3.0
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: [CORE-289, CORE-288, CORE-287, CORE-285, CORE-278]
---

# CORE-300 | release v5.3.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-287]] · 🔗 [[CORE-285]]

## 🎯 Goal

Cut the v5.3.0 minor release tagging the adopter audit-fork overlay + drift cohort (CORE-287 sanctioned thin-overlay path · CORE-288 fork-provenance markers + `/ft-update` drift warning · CORE-289 audit-orphan promotion guidance), the `/ft-release` context-budget escape hatch (CORE-285), the audit trivial-fix inline carve-out (CORE-286), and `/ft-worktree-end` hardening (CORE-279), plus viz + doc-currency fixes, since v5.2.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.2.0` → `v5.3.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.2.0` → `v5.3.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.2.0` → `v5.3.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.2.0` → `v5.3.0`
- [ ] `viz/package.json` `"version"` bumped `"5.2.0"` → `"5.3.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.3.0`, or recorded `skipped @ v5.3.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-300 — flowtron v5.3.0 (...)` commit lands
- [ ] Annotated `v5.3.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-300.md`

## 🧩 Subtasks

- [ ] Bump the 5 version pins (SPEC.md:3 · docs/MIGRATION.md example pin · SECURITY.md release-tag example pin · viz/src/ui/constants.ts VIZ_VERSION · viz/package.json version)
- [ ] Walk the dogfood gate — resolve Claude / Grok / Codex rows (refresh-from-verification or record `skipped @ v5.3.0`)
- [ ] Verify with single grep across the live doc set (residue expected only for skipped stamps + illustrative `(e.g. v5.2.0)` examples + archived tasknotes)
- [ ] Phase 3: markdown mental-pass on prose edits + viz lint/typecheck/test
- [ ] Phase 4: doc-drift sweep (`/ft-audit-docs` subroutine) · draft annotated tag message · flip PLAN line + archive tasknote · 📦 gate
- [ ] Commit + tag + push (atomic on 🟢 commit-go)

## 🔗 Related

- [[CORE-287]] — sanctioned thin-overlay path for adopter audit forks (new adopter-facing capability)
- [[CORE-288]] — fork-provenance markers + `/ft-update` audit-fork drift warning
- [[CORE-289]] — audit-orphan promotion + api/database/e2e overlay guidance
- [[CORE-285]] — `/ft-release` context-budget escape hatch
- [[CORE-278]] — prior release v5.2.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical minor-bump cut. Last tag `v5.2.0` matches `SPEC.md:3` (no aborted-release drift). Commits since the tag: `feat:` ×7 (CORE-279 worktree-end-hardening; CORE-280 viz-test-gate; CORE-285 ft-release-escape-hatch; CORE-286 audit-skip-threshold-inline; CORE-287/288/289 adopter audit-fork cohort) + `fix:`/`docs:`/`chore:`/`refactor:` → highest rank `feat:`, no `feat!:`/BREAKING → minor → v5.3.0, matching the PLAN target.

- [x] Read relevant source files — the 5 version-pin locations + the dogfood-gate stamp surface + the new CORE-287/288 audit-overlay illustrative-example surface (below)

- [x] **Archive skim** — prior release CORE-278 (v5.2.0) is the live template; it followed the canonical recipe with a zero-skip dogfood gate and correctly left write-once example version refs (the `SPEC/procedures/` currency stamps). This cut applies the same write-once treatment to the new audit-overlay `(e.g. v5.2.0)` examples.

- [x] **Drift check** — all 5 pins confirmed at `v5.2.0` @ HEAD; the new audit-overlay example surface classified (see Discovery Notes)

- [x] Asked clarifying questions — adopter impact resolved (see below); dogfood-gate per-agent walk deferred to Phase 2 (Step 5 AskUserQuestion)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Version-pin locations (drift check @ HEAD)

The 5 standard pins to bump `v5.2.0 → v5.3.0`:

- `SPEC.md:3` — `**Version:** v5.2.0` ✅
- `docs/MIGRATION.md:371` — `(e.g., \`v5.2.0\`)` illustrating `git describe` output. **Example pin → bump.**
- `SECURITY.md:109` — `Pin to annotated release tags (e.g. \`v5.2.0\`)`. ✅
- `viz/src/ui/constants.ts:41` — `VIZ_VERSION = 'v5.2.0'`. ✅
- `viz/package.json:4` — `"version": "5.2.0"` (bare semver). ✅

### Dogfood-gate stamp surface (the Step 5 walk's targets)

Dogfooded rows = Claude / Grok / Codex, all currently at `v5.2.0 · 2026-06-03 (dogfooded)` with **no** skip suffix (v5.2.0 was a zero-skip cut):

| Agent | Current stamp | Locations |
|---|---|---|
| Claude | `v5.2.0 · 2026-06-03 (dogfooded)` | `AGENT-COMPAT.md:36` + `CAPABILITIES.md:56` |
| Grok | `v5.2.0 · 2026-06-03 (dogfooded)` | `AGENT-COMPAT.md:37` + `PLATFORMS.md:238` |
| Codex | `v5.2.0 · 2026-06-03 (dogfooded)` | `AGENT-COMPAT.md:38` + `PLATFORMS.md:253` |

The 4 `unverified` rows (Cursor/Gemini/Aider/Amp) are noted-not-gated — skip. Related prose: `AGENT-COMPAT.md:96` ("dogfooded and re-verified at v5.2.0") needs refreshing if both Grok+Codex refresh to v5.3.0; goes stale otherwise.

### New audit-overlay illustrative examples (CORE-287/288), NOT release pins

Three live `v5.2.0` hits are illustrative `(e.g. v5.2.0)` example values showing "the arbitrary flowtron version your fork tracks / you installed from" — not claims about the current release:

- `docs/MIGRATION.md:131` — `flowtron-reconciled: v5.2.0` inside a fenced ```yaml frontmatter example block.
- `templates/audit-overlay-template.md:47` — `(e.g. \`v5.2.0\`)` in forker guidance prose.
- `claude/skills/ft-update/SKILL.md:97` — `(e.g. \`v5.2.0\`)` in the drift-scan parse step.

**Recommendation: leave all three at v5.2.0** (write-once illustrative examples, same class as CORE-278's `SPEC/procedures/` schema examples). Bumping them each release is churn with no semantic gain — they represent an arbitrary user-chosen version, not the current pin. Expected grep residue.

### Adopter migration impact

Additive cohort, **no required project-side edits**, but worth a context-sensitive Migration block (not rote "none"):

1. **Adopter audit-fork overlay path (CORE-287/288/289) — new adopter-facing capability.** Adopters can now fork audit scaffolds as thin overlays (`templates/audit-overlay-template.md`) carrying fork-provenance markers (`flowtron-reconciled:` / `flowtron-tracks:`); `/ft-update` gains a drift scan (Step 4.5) that warns when an upstream scaffold changed since a fork was last reconciled. Opt-in — pre-marker forks keep working untouched. Consumed via submodule pin; no required edits.
2. **`/ft-release` escape hatch (CORE-285) + audit inline carve-out (CORE-286) + `/ft-worktree-end` hardening (CORE-279).** Flowtron-self / workflow-internal refinements; no adopter surface change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing surfaces (the 5 version pins + the `last-verified` stamp cells); no new shape invented

- [x] Implemented the minimal solution — 5 version pins + dogfood-gate resolution (Claude refresh, Grok refresh, Codex skip)

- [x] Updated/added tests for non-trivial behavior — N/A (version-string + doc edits; viz lint/typecheck/test runs in Phase 3 for the one-line `constants.ts`/`package.json` change)

**Implementation Notes:**

### Phase 2 batch applied (2026-06-06)

- **5 version pins** v5.2.0→v5.3.0: `SPEC.md:3`, `docs/MIGRATION.md:371` (the `git describe` example pin only), `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4` (bare semver `"5.3.0"`).
- **Dogfood gate — RESOLVED, one skip (Codex):**

  | Agent | Resolution | Resulting stamp | Locations |
  |---|---|---|---|
  | Claude | **Refreshed** (this `/ft-release` session: contract read + CORE-300 Phase-1 drive + cue render) | `v5.3.0 · 2026-06-06 (dogfooded)` | AGENT-COMPAT.md:36 + CAPABILITIES.md:56 |
  | Grok | **Refreshed** (Grok ran `docs/DOGFOOD.md` at v5.3.0; PASS — applied its own stamp edits in-session) | `v5.3.0 · 2026-06-06 (dogfooded)` | AGENT-COMPAT.md:37 + PLATFORMS.md:238 |
  | Codex | **Skipped @ v5.3.0** (operator deferred this round) | `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.3.0)` | AGENT-COMPAT.md:38 + PLATFORMS.md:253 |

- **1 prose fix** in `AGENT-COMPAT.md:96` (§"Pre-adoption verification"): Grok's in-session edit had bumped it to claim *both* Grok and Codex "re-verified at v5.3.0" — corrected to "Grok Build … re-verified at v5.3.0, and Codex CLI at v5.2.0" (Codex skipped, so its last real verification holds at v5.2.0).
- **Intentional `v5.2.0` residue** (verified, not drift): the Codex skip stamps (AGENT-COMPAT:38 + PLATFORMS:253) + the accurate Codex prose ref (AGENT-COMPAT:96) + three write-once illustrative `(e.g. v5.2.0)` audit-overlay examples (MIGRATION:131, audit-overlay-template:47, ft-update/SKILL:97).

### Grok dogfood run — 2026-06-06

Grok ran `docs/DOGFOOD.md` for the v5.3.0 gate and PASSED all three steps (contract comprehension at v5.3.0, cue-render check, Phase-1 drive on CORE-300 with verdict Proceed / default-skip exit). `git status --porcelain` was dirty with the pre-existing release Phase-2 pin bumps + untracked tasknote (same class noted in CORE-278's archived dogfood run); the read-only drive itself wrote nothing. Grok applied its own stamp edits in-session (AGENT-COMPAT:37 + PLATFORMS:238 + the prose line); verified on-disk by the release driver and the over-broad prose claim corrected.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz lint/typecheck/test (the one-line `constants.ts` + `package.json` changes)

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation — N/A (version-string constant only; no UI/behavior change beyond the header version label)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — ran `/ft-audit-docs` subroutine over the 11-file AI-referenced doc set; **zero findings**. Per-entry: `SPEC.md` updated (:3 → v5.3.0; retired-field refs v0.2.0/v0.8.0 historical, kept); `docs/MIGRATION.md` updated (example pin :371 → v5.3.0; :131 yaml example + v5.0.0 rename history :400/410/413 kept); `SECURITY.md` updated (release-tag pin :109 → v5.3.0); `docs/AGENT-COMPAT.md` updated (Claude :36 → v5.3.0, Codex :38 skip stamp, prose :96 corrected); `docs/PLATFORMS.md` updated (Grok :238 → v5.3.0 by Grok session, Codex :253 skip stamp); `claude/CAPABILITIES.md` updated (:56 → v5.3.0); `README.md` / `claude/AGENTS-snippet.md` / `docs/CONVENTIONS.md` / `CONTRIBUTING.md` / `docs/AGENT-NEUTRALITY.md` — no change. Skill/command counts consistent at 22.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-06.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-300.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v5.3.0, tagging the adopter audit-fork overlay cohort (CORE-287 sanctioned thin-overlay path via `templates/audit-overlay-template.md` · CORE-288 fork-provenance markers + `/ft-update` Step 4.5 drift scan · CORE-289 audit-orphan promotion + api/database/e2e overlay guidance), plus the `/ft-release` context-budget escape hatch (CORE-285), the audit trivial-fix inline carve-out (CORE-286), `/ft-worktree-end` hardening (CORE-279), the `/ft-release` viz test gate (CORE-280), viz fixes (FE-055/056/057), and the CORE-281..299 doc-currency/settings-hygiene batch. Bumped the 5 version pins (SPEC / MIGRATION example / SECURITY / viz `constants.ts` / viz `package.json`). Dogfood gate: Claude refreshed inline during this `/ft-release`, Grok refreshed via a real `docs/DOGFOOD.md` run at v5.3.0 (PASS, applied its own stamp edits in-session), Codex recorded `skipped @ v5.3.0` (operator deferred). Corrected one over-broad prose claim Grok's edit introduced (AGENT-COMPAT:96 had claimed Codex re-verified at v5.3.0). Doc-drift sweep returned zero findings. No adopter migration required — the overlay path and provenance markers are opt-in and consumed via submodule pin; pre-marker forks keep working untouched.

**Archived:** 2026-06-06
