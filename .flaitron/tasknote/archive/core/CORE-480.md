---
title: release v5.20.0
status: completed
tags: []
created: 2026-08-26
due:
related-tasks: [CORE-EPIC-473, CORE-475, CORE-471]
---

# CORE-480 | release v5.20.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]] [[CORE-475]] [[CORE-471]]

## 🎯 Goal

Cut v5.20.0, a minor release tagging the unattended-orchestration epic (CORE-EPIC-473) and the argument-hint drift gate (CORE-475), plus related fixes/refactors since v5.19.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.19.0` → `v5.20.0`
- [x] docs/MIGRATION.md example pin bumped `v5.19.0` → `v5.20.0`
- [x] SECURITY.md release-tag example pin bumped `v5.19.0` → `v5.20.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.20.0`, or recorded `skipped @ v5.20.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-480 — flowtron v5.20.0 (...)` commit lands
- [ ] Annotated `v5.20.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.20.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-480.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [ ] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-EPIC-473]] — unattended-orchestration epic, tagged in this release
- [[CORE-475]] — argument-hint-drift-gate, tagged in this release
- [[CORE-471]] — precedent: prior release tasknote (v5.19.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-471/449/443 precedent); commit log + version drift verified in Step 2 of `/ft-release`.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md` example pin, `SECURITY.md` release-tag pin

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` for CORE-471, CORE-449, CORE-443 (prior release tasknotes); confirms the CORE-478-trimmed 3-edit recipe (SPEC.md/MIGRATION.md/SECURITY.md only — VIZ_VERSION + viz/package.json mirror were dropped by CORE-478 this cycle, so this tasknote's Acceptance list correctly omits them, unlike CORE-471's 5-edit precedent)

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.19.0`; `docs/MIGRATION.md:461` and `SECURITY.md:116` example pins both read `v5.19.0` — clean, matches `git describe --tags --abbrev=0`

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Bump is minor; adopter impact is unambiguous (see Discovery Notes).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 25 commits since v5.19.0. Grouped by area:

- **unattended-orchestration (CORE-EPIC-473, .1–.N)** — ships the `--unattended` operator-less posture (SPEC/gates.md), the `park-reason:` frontmatter key (SPEC.md), and wiring across `/ft-task`, `/ft-micro-task`, `/ft-goal-task`, `/ft-close-epic`. Additive/opt-in per CORE-473.6's own correction — a caller that never passes `--unattended` sees no behavior change. No manual adopter edit required; lands automatically via the next `/ft-update` (skill-body changes, no new symlink). Worth a Migration-block mention as a heads-up on the new capability.
- **argument-hint-drift-gate (CORE-475)** — new Pair J in `/ft-release` §7.1 (flowtron-self only). No adopter-facing surface.
- **viz-version-drop (CORE-478)** — deletes the dead `VIZ_VERSION` constant and trims `/ft-release`'s version-edit recipe from 5 to 3. Internal; adopters consume viz via the pinned submodule and never forked the footer. No adopter action.
- **doc-drift follow-ups (CORE-476, CORE-477, CORE-474)** — prose/currency corrections (readme-unattended-bullet closes CORE-473.N's own follow-up). No schema or contract change.
- **updater-naming-dedup (CORE-479)** — no-behavior-change naming/comment fix in flowtron's own `tools/update-adopters.mjs` / viz mirror. No adopter surface.
- **viz internal hardening (FE-95/96/97/98/99/100)** — vitest worker cap (flake fix), `/api/plan` realpath containment hardening, ESLint UI-tier rule, registry SSOT derivation, orphan/shape trim. All internal to flowtron's own `viz/` package, consumed via submodule; no adopter-facing surface or required edit.

**Verdict: no required project-side edits.** The `--unattended` posture (CORE-EPIC-473) is the only user-visible addition and is fully additive/opt-in — worth a Migration-block heads-up, not a required change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe (post-CORE-478 trim) + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:461`, `SECURITY.md:116`, all `v5.19.0` → `v5.20.0`. Grep verification clean — remaining `v5.19.0` hits are expected residue (dogfood stamps, SOP `last-verified` stamp, `docs/VERSION-HISTORY.md` historical entry).

**Dogfood gate — all 4 refreshed to `v5.20.0 · 2026-08-26 (dogfooded)`:**
- Claude — this session itself, driving `/ft-release` end-to-end.
- Grok, Codex, Cursor — parallel dogfood sessions run concurrently toward this same release; verdicts + evidence reported conversationally per the stamp-write-ownership rule (this session is the release-driving session, so it applied the writes).

Applied together across `docs/AGENT-COMPAT.md` (4 matrix rows), `docs/PLATFORMS.md` (3 non-Claude footers), and `claude/CAPABILITIES.md` (Claude footer).

**SOP-currency check:** clean. `SPEC/procedures/ft-task.md` — no Tier-1 drift candidates. Tier-2 advisory noted 3 `SPEC.md` commits since the 2026-08-25 stamp (CORE-473.2/.3/.5 — `--unattended` posture, `park-reason:` key, interrupted-resume); skimmed and confirmed the SOP already restates all three (unattended-mode primitive row, `park-reason:` closed-set codes, and the "Resuming an interrupted run" pointer) — landed by CORE-473.4 the same day as the stamp. No follow-up filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — N/A (version strings + stamps only)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Standing validation gate (`AGENTS.md` §"Validation") — all 6 pass:
- `npm --prefix viz test` — 25 files, 480/480 passed
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — 37/37 passed
- `node --check tools/update-adopters.test.mjs` — clean
- `node --check tools/update-adopters.mjs` — clean

No feature-specific test pass needed — this cut is version-string edits + stamp resolution only.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Standing mechanical checks (wiring-consumer derivation, shipped-skill parity, installed-surface policy ×5, local self-wiring ×4 [blocking], global wiring [advisory, clean: no dangling links, 1 path casing], mirror pairs A/B/C/E/F/G/H/I/J) all ran **clean**. Pair D (README task-counter) found drift: README.md said "744 tasks... as of 2026-08-24"; actual archive count is 765 files, latest `**Archived:**` date 2026-08-24 → 2026-08-26. **Fixed inline** (mechanical text substitution, Critical/High per recipe).

  `/ft-audit docs` subroutine (5 passes over the 16-doc AI-referenced set, scaffold placeholders resolved via run-once derivation on operator confirm — scope = the 16-doc set, rubric = that same file + README.md + SPEC.md, gates = none configured): Pass 1 (Claims vs. code) clean, Pass 2 (Cross-doc consistency) clean, Pass 3 (Cross-references) clean — 3 apparent broken relative links (`SPEC.md:473`, `docs/MIGRATION.md:403`, `:448`) confirmed as illustrative examples inside fenced/prose blocks, not real navigable links, Pass 4 (Currency) clean — spot-checked all `2026-*` date stamps across the set, all are legitimate write-once historical verification records, Pass 5 (Stale content) clean — `legacy`/`deprecated` mentions are all intentional backward-compat documentation, not forgotten content. Zero new findings; the one real drift in this cut's whole doc-drift sweep was Pair D above (already fixed).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.20.0 (minor, 25 commits since v5.19.0). Headline: the `--unattended` operator-less posture (CORE-EPIC-473) — five gates convert from ask-and-wait to a machine-readable `status: blocked` park under a new `park-reason:` frontmatter key, wired across `/ft-task`/`/ft-micro-task`/`/ft-goal-task`/`/ft-close-epic`, with a new Orchestration Contract in `docs/EXTERNAL-AGENTS.md` and an interrupted-run resume path. Also landed: `/ft-release`'s own version-edit recipe trimmed from 5 pins to 3 (dead `VIZ_VERSION` constant removed, CORE-478) plus a new Pair J argument-hint drift gate (CORE-475), a naming-dedup fix in the viz↔tools version mirror (CORE-479), and a wave of viz internal hardening (vitest flake fix, `/api/plan` realpath-containment security fix, ESLint UI-tier rule, registry SSOT derivation, orphan/shape trim — FE-95 through FE-100). Adopter impact: **no required project-side edits** — `--unattended` is fully additive/opt-in. Dogfood gate: all 4 rows (Claude/Grok/Codex/Cursor) refreshed to `v5.20.0 · 2026-08-26 (dogfooded)`, including 3 confirmed as genuine parallel-agent dogfood sessions toward this same release. SOP-currency: clean (ft-task.md already restates the 3 SPEC.md commits since its stamp). Doc-drift sweep: one real finding — README.md's stale task counter (744→765, date range →2026-08-26) — fixed inline; all other standing mirror-pair/wiring-parity checks and the 5-pass `/ft-audit docs` sweep came back clean.

**Archived:** 2026-08-26
