---
title: release v6.0.0
status: in-progress
tags: []
created: 2026-10-04
due:
related-tasks: [CORE-711.2, CORE-711.3, CORE-711.4, CORE-711.9, CORE-691, CORE-711.5, CORE-690]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-712.md
blocked-by:
  - CORE-711.5
  - CORE-711.9
---

# CORE-712 | release v6.0.0

[← PLAN.md](../PLAN.md) · 🟢 In progress (⏸ parked) · 🔗 [[CORE-711.2]] [[CORE-711.3]] [[CORE-711.4]] [[CORE-711.9]] [[CORE-691]] [[CORE-711.5]] [[CORE-690]]

## 🎯 Goal

Cut v6.0.0 major release tagging the flaitron rebrand (CORE-711.2 + CORE-711.3 + CORE-711.4 + CORE-711.9, hard cut) + CORE-691 since v5.35.0.

## ⏸ Parked 2026-10-04

The first `/ft-release` drive reached the 📦 gate and the operator declined to cut. The repo folder (`~/Code/flowtron`) and the GitHub repo (`fakeneuron/flowtron`) still carried the old name, and no full-repo `flowtron` sweep had run. The release-only edits were reverted, so `SPEC.md` stays at v5.35.0 and matches the tag. The doc-sweep fixes that hold either way landed as `d43ad4d2`. CORE-EPIC-711 was re-sequenced: .5 renames → .9 full-repo sweep → this cut.

**Resume with `/ft-release`** once [[CORE-711.5]] and [[CORE-711.9]] close. It re-scans PLAN, finds this line, and scaffolds over this note: carry the Discovery Notes and the tag-draft below forward. Redo all of the following at resume. None of it survives the park:

- The 3 version edits (`SPEC.md:3`, `docs/MIGRATION.md` `describe --tags` pin, `SECURITY.md` release-tag pin).
- The dogfood walk, with fresh receipts for every agent. The parked run had Claude refreshed (operator choice), Cursor refreshed on a verbatim receipt (CORE-711.6 drive), and Grok and Codex skipped. All reverted.
- The standing gate, the §6.1 CI check, the `npm audit`, the `/ft-audit docs ai-referenced` sweep, the §7.1 standing checks and mirror pairs, and the `docs/CONTEXT-BUDGET.md` ledger refresh.
- The README task counter. The parked run set it to 1062 as of 2026-10-03 in `d43ad4d2`; recompute it.
- The VERSION-HISTORY entry, re-locked together with the tag message.

**Locked tag-message draft (re-review at resume).** Add CORE-711.9 and the `d43ad4d2` fixes to Changes, and confirm the repo URL and folder references now hold.

```text
flaitron v6.0.0 — flowtron is now flaitron (.flowtron/ → .flaitron/, hard cut)

Major release. The project is renamed flowtron → flaitron. The convention directory moves .flowtron/ → .flaitron/, the submodule .flowtron/core → .flaitron/core, and the repository URL to github.com/fakeneuron/flaitron. This is a hard cut: v6 skills, the visualizer, and the fleet updater read only .flaitron/, and there is no old-name fallback. Archived tasknotes and the ft-* skill prefix are unchanged. Every existing adopter does a one-time move, described below.

Changes since v5.35.0:

Breaking:
- The contract, skills, templates, snippets, and docs read .flaitron/ and .flaitron/core/, and say flaitron throughout. flaitron's own plan and tasknotes moved to .flaitron/. (CORE-711.4)
- The visualizer scans .flaitron/ only. FLOWTRON_VIZ_WORKSPACE → FLAITRON_VIZ_WORKSPACE, localStorage keys → flaitron-viz-* (saved view preferences reset once), API field → flaitronVersion. (CORE-711.2)

Fleet updater (flaitron-self):
- tools/update-adopters.mjs classifies a pre-rename adopter as `migrate` once the latest tag is v6.0.0 or later. --apply performs steps 1–5 below in one rollback-safe local commit, renaming the submodule in place. (CORE-711.3)

Doc currency:
- Cross-file citation, path, and count sweep. (CORE-691)
- MIGRATION, PLATFORMS, README, and VISION corrected for the rename: symlink-stability claims, thin-overlay audit forks in the move, the README version note, and the visualizer's description. (CORE-712)

Migration (BREAKING — existing adopters only):
  1. Drop the old submodule: git submodule deinit -f .flowtron/core && git rm -f .flowtron/core && rm -rf .git/modules/.flowtron
  2. git mv .flowtron .flaitron
  3. git submodule add https://github.com/fakeneuron/flaitron.git .flaitron/core && git -C .flaitron/core checkout v6.0.0 && git add .flaitron/core
  4. Re-point every .claude/, .agents/skills/, .cursor/skills/, and .grok/skills/ symlink that runs through .flowtron to .flaitron
  5. Rewrite tracked .gitignore rules naming .flowtron/ to .flaitron/
  6. Update stray refs outside archived tasknotes: AGENTS.md, CLAUDE.md, active tasknotes, tool configs, FLOWTRON_VIZ_WORKSPACE, audit-fork keys flowtron-reconciled:/flowtron-tracks:, and a thin overlay's Referenced-scaffold path. Confirm with git grep -n flowtron.
  7. Stage and commit as one bump task
Full steps: docs/MIGRATION.md §"Upgrading an existing adopter from v5.x". Fresh adopters are unaffected. On a pre-rename layout, v6's /ft-update stops and points at that section. tools/update-adopters.mjs --apply automates steps 1–5; step 6 stays per-project. Machine-global ~/.claude/skills/ft-* links follow your flaitron checkout's path, so re-point them if you rename the clone. Cross-agent: <fill from the resume dogfood walk>.
```

Sentinel note: the `Migration (BREAKING …)` heading makes `migrationBearingTags` classify v6.0.0 as bearing. `tools/update-adopters.mjs` lifts that gate for `RENAME_TAG` (v6.0.0) only, and only for pre-rename adopters.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.35.0` → `v6.0.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.35.0` → `v6.0.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.35.0` → `v6.0.0`
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v6.0.0`, or recorded `skipped @ v6.0.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [ ] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-712 — flaitron v6.0.0 (...)` commit lands
- [ ] Annotated `v6.0.0` tag created with adopter-facing release notes
- [ ] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v6.0.0` (major: headline + 2–4 main bullets + optional secondary)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-712.md`

## 🧩 Subtasks

- [ ] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.35.0 → v6.0.0
- [ ] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [ ] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [ ] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [ ] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [ ] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-711.2]] — viz hard-cut to flaitron (`.flaitron/` scan, `FLAITRON_VIZ_WORKSPACE`, localStorage keys)
- [[CORE-711.3]] — `tools/update-adopters.mjs` migrate mode for pre-rename adopters
- [[CORE-711.4]] — text sweep + self-host move `.flowtron/` → `.flaitron/`
- [[CORE-711.9]] — full-repo flaitron sweep + canonical "formerly flowtron" note (blocked-by:)
- [[CORE-711.5]] — GitHub + folder renames (blocked-by:)
- [[CORE-691]] — cross-file cite, path, and count sweep (docs)
- [[CORE-690]] — prior release (v5.35.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Bump pattern is well-established, and v5.35.0 matches `SPEC.md:3` and `git describe`. Prefix classification alone gives minor (plain `feat:`, no `feat!:` or `BREAKING CHANGE:` trailer). CORE-EPIC-711 declares a breaking hard cut, and the operator locked v6.0.0 at the Step 1.1 draft. At the 📦 gate the operator re-scoped: the renames (.5) and a full-repo sweep (.9) land first.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md` (`describe --tags` pin; §"Upgrading an existing adopter from v5.x"), `SECURITY.md` (release-tag pin), `tools/update-adopters.mjs` (`RENAME_TAG`, `migrationBearingTags`).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-690 (v5.35.0) is the direct precedent: same 6-line subtasks and `touches:` set, plus the lesson to check CI on the parent before tagging.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:507`, `SECURITY.md:125` read v5.35.0 (re-resolve by grep at resume).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version (v6.0.0) and sequencing (renames + sweep first) both asked and answered.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Adopter migration impact:
  - **CORE-711.2 / .3 / .4 — breaking.** Convention dir, submodule path, repo URL, viz env var, and audit-fork keys all rename, with no fallback. Recipe: `docs/MIGRATION.md` §"Upgrading an existing adopter from v5.x". `tools/update-adopters.mjs --apply` runs steps 1–5; step 6 stays per-project.
  - **CORE-691 — none.**
- Parked-run evidence (re-run at resume; don't reuse): standing gate all exit 0 (fleet suite 65/0), `npm audit` 0 vulns, CI green on `b44ffbaa`. The doc sweep went 5 findings → 1 Low → 0; fixes landed in `d43ad4d2`. All 11 CI pairs, 4 drift steps, and Pairs F/I/K/L were clean (Pair L after the Pair Q `Reads:` repair).
- Advisories at park: 10 dangling global `~/.claude` links (CORE-711.5 removes them); completed rotation 101 rows (>60); viz major typescript 5.9.3→7.0.2 (CORE-641).
- Learning: a breaking epic's children should carry `feat!:` or a `BREAKING CHANGE:` trailer (`docs/CONVENTIONS.md`), so the release classifier proposes the major without an override. CORE-711.9's commit can carry the trailer.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey**

- [ ] **Minimal refactor gate**

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] **Verification receipt**

- [ ] **External review**

- [ ] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [ ] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and placed, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [ ] **Evidence-based recap** drafted

- [ ] **Learnings** — `N/A` or the line

**Final Summary:**

**Archived:** YYYY-MM-DD
