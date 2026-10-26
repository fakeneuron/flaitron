---
title: updater-retire-migrations
status: completed
tags: [tools, fleet-updater, cleanup]
created: 2026-10-26
due:
related-tasks: [CORE-711.3, CORE-769.7, CORE-778.3]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - SECURITY.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-release/step-7.2-tag-message.md
---

# CORE-827 | updater-retire-migrations

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-711.3]] · [[CORE-769.7]]

## 🎯 Goal

Retire `tools/update-adopters.mjs`'s two completed one-shot migrations — the v6 `.flowtron/` → `.flaitron/` rename and the v7 skill-link swap — with their tests and every doc that describes them, leaving a bump-only fleet updater.

## ✅ Acceptance

- [x] No migration identifier survives in the updater or its suite — `! git grep -n -E 'applyMigrate|PRE_RENAME|RENAME_TAG|SKILL_RENAME|skillLinkPlan|applySkillLinkPlan|ignoredNewLinks|renamedSlugMentions|formatLinksNote|renamedDirSegments|renamedRemoteUrl|preRename|linksNote|skillRename|excludeLinks' -- tools/update-adopters.mjs tools/update-adopters.test.mjs`
- [x] Updater suite and syntax checks pass — `node --test tools/update-adopters.test.mjs && node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs`
- [x] Live dry-run sweep is unchanged in outcome (24 adopters, 0 failed) — `node tools/update-adopters.mjs | grep -q 'Summary: .* 0 failed'`
- [x] No live doc describes the retired migrations — `! git grep -n -E 'applyMigrate|applySkillLinkPlan|migrate mode|fleet updater (below )?re-wires|which migrates' -- SECURITY.md docs/MIGRATION.md docs/PLATFORMS.md claude/skills/ft-update/SKILL.md`
- [x] step-7.2's sentinel note matches the case-insensitive check — `grep -q 'case-insensitive' claude/skills/ft-release/step-7.2-tag-message.md`
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [ ] `update-adopters.mjs`: delete the v6 rename (PRE_RENAME_* / RENAME_TAG, `preRename` discovery + `legacy` list, checkAdopter's pre-rename gates and scoped lift, `applyMigrate` + `unwind` + rename helpers, migrate report branches) and the v7 swap (SKILL_RENAME, crossing branch, `skillLinkPlan`…`formatLinksNote`, `applyBump`'s link work, now-dead `excludeLinks`); prune unused fs/path imports and exports; rewrite header + checkAdopter comment
- [ ] `update-adopters.test.mjs`: delete the rename / skill-rename groups, fixtures and imports; retarget discovery + no-adopters CLI tests; keep the `--no-renames` git-mv assertion without `excludeLinks`
- [ ] Docs: SECURITY.md fleet-updater section, MIGRATION.md (v7 recipe lead-in + updater paragraph), PLATFORMS.md out-of-scope bullet, ft-update SKILL.md pre-rename stop, step-7.2 casing parenthetical
- [ ] Run the suite, syntax checks, drift checks, live dry-run

## 🔗 Related

- [[CORE-711.3]] — added the v6 rename migration this retires
- [[CORE-769.7]] — added the v7 skill-rename link swap this retires
- [[CORE-778.3]] — extended `SKILL_RENAME.map` with the `ft-micro-task` fold
- [[CORE-812.4]] — later retirement deliberately left the updater unchanged (precedent: retirements no longer ride the updater)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both migrations are complete fleet-wide. A live dry-run on 2026-10-26 shows 24 adopters, 23 on v7.5.0 and 1 on v7.4.0, with no `.flowtron/` or legacy layouts, so roughly 400 lines and their tests are dead weight in the outlier file.

- [x] Read relevant source files — read in full: `tools/update-adopters.mjs`, the test outline and fixtures, the SECURITY.md §"Fleet updater", MIGRATION.md §"Upgrading to v7.0.0" lead-in and line 573, PLATFORMS.md §"Out of scope", ft-update SKILL.md pre-rename stop, step-7.2, SPEC/scope-boundaries.md carve-out

- [x] **Best Practices Review** — Pure deletion. The bump path (`checkAdopter` → `applyBump` → `checkoutVerified`) keeps its shape. Code made dead by the deletion goes too, under the "remove only what your changes made unused" rule: `unwind`, `trackedSymlinks`, `trackedGitignores`, `submoduleName`, `pathExists`, `isDir`, the `excludeLinks` parameter on `newSkillWiringSurfaces` and its cache, the `renameTag`/`skillRename` seams on `checkAdopter`, and the fs/path imports they used. `discoverAdopters` loses its `legacy` list, so it returns the adopter array. `addedFilesForSurface`'s `--no-renames` stays: a renamed slug still needs a fresh link on any future range.

- [x] **Archive skim** — `archive/core/` (confirmed against the README table) has 195 notes touching the updater. 14 name the migration code. Read with targeted greps:
  - CORE-778.3 put its fold into `SKILL_RENAME.map` and noted that "the next retirement will read" the header.
  - CORE-812.4 then retired `ft-prep-unattended` with "`tools/update-adopters.mjs` unchanged (the `ft-debug` fold precedent)", by operator decision, so later retirements already bypass the updater.
  - CORE-769.N bound `SKILL_RENAME.map` to MIGRATION's retired-skills table with a test. The table stays as human history, so that parity test goes with the map.
  - CORE-711.4 had `/ft-update` stop on `.flowtron/` and point at the fleet updater. That pointer is what changes here.
  - No archived note claims the migrations must stay.

- [x] **Drift check** — PLAN's cited identifiers all exist (`applyMigrate` :1119, `PRE_RENAME_*` :153-154, `SKILL_RENAME` :163, `skillLinkPlan`…`formatLinksNote` :836-946). The file is 1,440 lines, as cited. "Every adopter pins ≥ v7.4.0" was verified live (above). `step-7.2` turns out to name only `migrationBearingTags`, which stays. Its real stale claim is "exact casing; … uses `startsWith`" while the code is `toLowerCase().startsWith`, so the operator chose to fix that clause. SPEC/scope-boundaries.md and SPEC.md carve-out prose describe only bumping, so no change there. `docs/UPGRADING.md:7` ("the fleet updater read[s] only `.flaitron/`") becomes literally true, so no change.

- [x] Asked clarifying questions — step-7.2 → operator: fix the casing claim (keep the exact-casing instruction, say the check is case-insensitive). Assumptions: (1) a stray `.flowtron/` repo becomes invisible to discovery rather than reported. That is acceptable given the live survey, and `/ft-update` still stops on it with the UPGRADING pointer. (2) A < v7 pin now skips as "migration-bearing release(s) in range: v7.0.0 — run /ft-update manually", which is the generic fail-closed gate. (3) MIGRATION's retired-skills table and hand recipes stay (human history), and only the updater claims go.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** See the boxes above. Live sweep receipt: `node tools/update-adopters.mjs` → `Summary: 23 current · 0 drift · would bump 1 · 0 skipped · 0 failed` (judedelparte v7.4.0 → v7.5.0).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Pure deletion back to the pre-CORE-711.3 bump-only shape. `applyBump` matches its pre-CORE-769.7 body (checked against `da2f9cb5~1`). The one kept difference is that `staged = true` is set before the `git add`, which agrees with `rollbackBump`'s current "once the add was attempted" comment.

- [x] **Minimal refactor gate** — Removed only code the deletion made dead: `unwind`, `trackedSymlinks`, `trackedGitignores`, `submoduleName`, `pathExists`, `isDir`, `excludeLinks` (on `newSkillWiringSurfaces` and its cache key), `checkAdopter`'s `renameTag`/`skillRename` seams, and 9 fs/path imports. `discoverAdopters` returns the adopter array now that `legacy` is gone. No other cleanup.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — Deleted the `rename migration helpers`, `rename migration`, and `skill-rename migration` groups along with their fixtures. Retargeted the discovery test ("nothing else", array shape) and the two no-adopters CLI assertions. Dropped the CORE-601 legacy-only test. Kept the `--no-renames` git-mv assertion as `newSkillWiringSurfaces (real tags)`, without its `excludeLinks` half.

**Implementation Notes:**
- `tools/update-adopters.mjs` 1,440 → 874 lines; `tools/update-adopters.test.mjs` 1,890 → 1,188.
- Header: a short "Retired migrations (CORE-827)" note replaces the two migration paragraphs, and the drift, `--no-verify`, and "Not covered" paragraphs drop their migrate clauses.
- Docs:
  - SECURITY.md §"Fleet updater": bump-only intro, `checkoutVerified`/never-push/`--no-verify`/write-footprint bullets.
  - MIGRATION.md: v7 recipe lead-in, plus the updater paragraph now says it discovers only `.flaitron/core` and both moves are by hand.
  - PLATFORMS.md §"Out of scope": points at the hand recipes.
  - ft-update SKILL.md: pre-rename stop points at UPGRADING only.
  - step-7.2: casing parenthetical now says case-insensitive.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` on both files (no linter covers `tools/`)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line). The changed code has no duplication or stale docs. Dead code was swept by the identifier grep plus a usage scan of every fs/path import.

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
! git grep -n -E 'applyMigrate|…|excludeLinks' -- tools/update-adopters.mjs tools/update-adopters.test.mjs   → 0
node --test tools/update-adopters.test.mjs   → 0 (77 pass, 0 fail, 17 suites)
node --check tools/update-adopters.test.mjs  → 0
node --check tools/update-adopters.mjs       → 0
node tools/update-adopters.mjs               → 0  Summary: 23 current · 0 drift · would bump 1 · 0 skipped · 0 failed (24 adopters, identical to pre-change)
! git grep -n -E 'applyMigrate|applySkillLinkPlan|migrate mode|fleet updater (below )?re-wires|which migrates' -- SECURITY.md docs/MIGRATION.md docs/PLATFORMS.md claude/skills/ft-update/SKILL.md   → 0
grep -q 'case-insensitive' claude/skills/ft-release/step-7.2-tag-message.md   → 0
bash tools/drift-checks.sh                   → 0 (all pairs ok)
```

**External review** (`/code-review medium`, working-tree diff): 7 findings, all **notes**. No Acceptance criterion was falsified, so no blocker.
1. Pre-rename repos now vanish silently → **declined**. The PLAN line asks for legacy discovery removed, Discovery assumption (1) accepted the trade-off, the live sweep has 0 such repos, and `/ft-update` still stops on `.flowtron/` with the UPGRADING pointer.
2. The v7.0.0-crossing skip says "run /ft-update manually" → **declined**. That reason string is the generic migration-bearing message, unchanged here. `/ft-update` shows the tag's Migration block, which names the hand recipe.
3. `linkDir` dead after the `excludeLinks` removal → **fixed**: dropped the field from all four surfaces and the `claudeSkillsSurface` argument.
4. Nothing pins "a `.flowtron/` repo is not discovered" → **fixed**: the discovery test seeds `pre-rename/.flowtron/core/SPEC.md` and asserts it is absent.
5. Test title says "every surface" but asserts two → **fixed**: `deepEqual` on all four labels.
6. VERSION-HISTORY still describes the migrations → **declined**. Release history records each release as cut and stays append-only (the PLAN line's doc list excludes it).
7. `FLAITRON_DIR` single-use indirection → **declined**. It names the convention dir and was not made unused.

Post-fix re-run: `node --check` ×2 → 0; `node --test tools/update-adopters.test.mjs` → 0 (77/77); live dry-run → same Summary; `bash tools/drift-checks.sh` → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — Updated: `SECURITY.md` (fleet-updater section is bump-only), `docs/MIGRATION.md` (v7 recipe lead-in, updater paragraph), `docs/PLATFORMS.md` (out-of-scope bullet). No change to `README.md`, `AGENTS.md`, `SPEC.md`, the four `*/AGENTS-snippet.md` (their update/rename lines describe `/ft-update`, not the fleet updater), `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` (its hits are `/ft-update`), or `docs/VISION.md` (the carve-out wording is still accurate).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`. The one durable fact ("retirements no longer ride the updater") lives in the updater header's "Retired migrations" note, which is where the next person editing it will read it.

**Final Summary:**

The fleet updater is bump-only again. The v6 `.flowtron/` → `.flaitron/` move and the v7 skill-link swap are gone from `tools/update-adopters.mjs`, its suite, and the docs that described them. Every adopter had already crossed both.

- **Changed:**
  - `tools/update-adopters.mjs`: 1,440 → 872 lines.
  - `tools/update-adopters.test.mjs`: 1,890 → 1,186 lines. Three migration groups removed; the discovery test now pins `.flowtron/` exclusion; the `--no-renames` check now asserts all four surfaces.
  - `SECURITY.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `claude/skills/ft-update/SKILL.md`, `claude/skills/ft-release/step-7.2-tag-message.md` (casing claim corrected per operator).
- **Verification:** suite 77/77, both `node --check` 0, drift checks 0, live dry-run unchanged (`23 current · would bump 1 · 0 failed`). External review: 3 notes fixed, 4 declined with reasons (Testing Notes).
- **Refactors:** removed only code the deletion made dead (helpers, `excludeLinks`, `linkDir`, `checkAdopter` seams, 9 imports). `discoverAdopters` now returns an array. Nothing else changed.
- **Scope:** declared 7 files, changed 7. No undeclared paths.
- **Maintainability:** the outlier file drops about 40%, and `applyBump` is back to a single-path commit with one rollback helper. A pin still behind v6/v7 fails closed at the generic migration-bearing gate.

**Archived:** 2026-10-26
