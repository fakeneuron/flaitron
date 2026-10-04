---
title: release v6.0.0
status: completed
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

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-711.2]] [[CORE-711.3]] [[CORE-711.4]] [[CORE-711.9]] [[CORE-691]] [[CORE-711.5]] [[CORE-690]]

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

**Locked tag-message draft (re-review at resume).** Re-locked 2026-10-04 at resume with the CORE-711.9 bullet and the cross-agent line filled; the final text is the `v6.0.0` tag message (`git show v6.0.0`). Add CORE-711.9 and the `d43ad4d2` fixes to Changes, and confirm the repo URL and folder references now hold.

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

- [x] SPEC.md `**Version:** v5.35.0` → `v6.0.0`
- [x] docs/MIGRATION.md example pin bumped `v5.35.0` → `v6.0.0`
- [x] SECURITY.md release-tag example pin bumped `v5.35.0` → `v6.0.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v6.0.0`, or recorded `skipped @ v6.0.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-712 — flaitron v6.0.0 (...)` commit lands
- [x] Annotated `v6.0.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v6.0.0` (major: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-712.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.35.0 → v6.0.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

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

- [x] **Pattern survey** — N/A: release recipe; CORE-690 precedent followed.

- [x] **Minimal refactor gate** — N/A: no code.

- [x] Implemented the minimal solution — 3 version edits, dogfood stamps, README counter, CONTEXT-BUDGET ledger, VERSION-HISTORY entry.

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only cut.

**Implementation Notes:**

- Resumed 2026-10-04 after [[CORE-711.5]] + [[CORE-711.9]] closed; version re-confirmed v6.0.0 (prefix classifier said minor — no `feat!:`/trailer; PLAN target wins).
- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:507`, `SECURITY.md:125` v5.35.0 → v6.0.0.
- Dogfood ledger:
  - `Claude → v6.0.0 · 2026-10-04 (dogfooded) — written` (this session's own drive)
  - `Grok → v5.35.0 · 2026-10-02 (dogfooded; skipped @ v6.0.0) — written` (no receipt)
  - `Codex → v6.0.0 · 2026-10-04 (dogfooded) — written` (verbatim receipt: version v6.0.0, My row matched, Phase-1 drive CORE-712 / skip ✅)
  - `Cursor → v5.33.0 · 2026-09-23 (dogfooded; skipped @ v6.0.0) — written` (no receipt)
- SOP currency: clean (tier-2 note: 3 `SPEC.md` commits since 2026-10-01 — skimmed: the CORE-711.4 name sweep, two release cuts, and the CORE-660 gate-catalog move; the SOP carries no stale `flowtron` refs).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate, below.

- [x] Ran lint/type-check on changed code — standing gate, below.

- [x] **Verification receipt** — Testing Notes below; dogfood ledger re-verified from file state (no `MISSING`).

- [x] **External review** — `/ft-audit docs ai-referenced` across three read-only reviewers (Phase 4).

- [x] (frontend) N/A — no UI change.

**Testing Notes:**

- Standing gate (2026-10-04, resume): viz test / typecheck / lint / build, fleet suite, both `node --check` — all exit 0.
- §6.1: HEAD `3874c3b3` was 6 commits unpushed (no CI run); operator chose push-main-now → CI run 37233825825 `completed success`.
- §6.2: `npm audit --audit-level=high` — 0 vulnerabilities.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `/ft-audit docs ai-referenced` over all 19 entries: 1 Low (README task counter 1062 → 1064, cleared inline by the §7.1 standing counter check); every other entry no change beyond this cut's version pin (`SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md`) and dogfood stamps (`docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`). §7.1 standing checks and all mirror pairs (11 CI + A-content, F, I, K, L) clean; context budget clean under bash; ledger refreshed.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and placed, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in the 📦 gate.

- [x] **Learnings** — the context-budget block silently skips its glob rows under zsh (`for f in $surface` does not glob-expand an unquoted parameter); it passes only because CI and this cut ran it under bash. Worth a `bash` note beside "Run from the repository root".

**Final Summary:** Cut flaitron v6.0.0, the major release for the flowtron → flaitron rename (CORE-711.2/.3/.4/.9, plus CORE-691). The cut bumped the three version pins, refreshed Claude and Codex to v6.0.0 (Codex on a verbatim receipt), and recorded Grok and Cursor skipped. It also refreshed the README task counter and the context-budget ledger and prepended the VERSION-HISTORY entry. Adopter impact is breaking. Every existing adopter does the one-time `.flowtron/` → `.flaitron/` move in `docs/MIGRATION.md` §"Upgrading an existing adopter from v5.x", and `tools/update-adopters.mjs --apply` automates steps 1–5 for the CORE-711.7 fleet wave.

**Archived:** 2026-10-04
