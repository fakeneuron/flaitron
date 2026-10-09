---
title: rename-migrate-mode
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.2, CORE-769.6, CORE-769.N, CORE-711.3]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - claude/skills/ft-update/SKILL.md
  - docs/MIGRATION.md
  - .flaitron/PLAN.md
blocked-by: [CORE-769.6]
---

# CORE-769.7 | rename-migrate-mode

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-769.1]] [[CORE-769.2]] [[CORE-769.6]] [[CORE-769.N]] [[CORE-711.3]]

## 🎯 Goal

Make the fleet updater carry adopters across v7.0.0's skill renames: a rename-aware migrate that swaps old→new skill links and prunes the retired command links in the bump commit, a rename-blind-spot fix in the new-skills note, `/ft-update` naming a dangling slug's replacement, a MIGRATION manual recipe, and natabula's caller row.

## ✅ Acceptance

- [x] A bump whose range crosses the skill-rename tag is no longer skipped for that tag alone: it lifts only that tag, swaps each tracked `<surface>/<old>` skill link to `<new>`, prunes tracked links into `core/claude/commands/`, and commits the swap with the gitlink in one rollback-safe commit (also inside `applyMigrate`) — `node --test tools/update-adopters.test.mjs`
- [x] The new-skills note sees a `git mv`'d skill (`--no-renames`), and a rename the map covers is left to the swap, not flagged — `node --test tools/update-adopters.test.mjs`
- [x] The report line counts swapped/pruned links and the tracked files still naming a renamed slug (report-only) — `node --test tools/update-adopters.test.mjs`
- [x] Every rename-map entry has a matching MIGRATION retired-skills row (test-bound SSOT) — `node --test tools/update-adopters.test.mjs`
- [x] Updater syntax clean — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs`
- [x] `/ft-update` Step 4.6 names each dangling slug's replacement from the MIGRATION table — `grep -q 'Replacement' claude/skills/ft-update/SKILL.md` + `judgment` (prose contract)
- [x] MIGRATION carries a v7.0.0 manual recipe, and the fleet-updater paragraph names the v7 exception — `grep -q 'Upgrading to v7.0.0' docs/MIGRATION.md`
- [x] natabula NAT-391 caller row filed and committed locally in natabula — `git -C ~/Code/natabula log -1 --format=%s | grep -q NAT-391`
- [x] Drift checks clean — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `update-adopters.mjs`: `SKILL_RENAME` const (tag + map); `skillLinkPlan` / `applySkillLinkPlan` / `renamedSlugMentions` helpers
- [x] `checkAdopter`: scoped lift of the skill-rename tag, `skillRename` + plan/mention counts on the result; seam option
- [x] `applyBump` + `applyMigrate`: perform the plan inside the rollback window; commit pathspec covers the links
- [x] New-skills note: `--no-renames` + exclude mapped rename targets when the range crosses the tag
- [x] `reportResult` wording; header comment paragraph
- [x] Tests: plan unit, classify lift, apply end-to-end + rollback, note blind spot, MIGRATION parity
- [x] `/ft-update` Step 4.6 replacement lookup; MIGRATION recipe + fleet-updater sentence
- [x] File + commit NAT-391 in natabula
- [x] Phase 3: updater suite, checks, drift checks, `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]] — Discovery; Probe B found the `--diff-filter=A` blind spot and filed this child
- [[CORE-769.2]] — retired the `claude/commands/` wrappers whose adopter links this prunes
- [[CORE-769.6]] — last rename; its Learnings carry the final map
- [[CORE-769.N]] — terminal audit
- [[CORE-711.3]] — the v6 migrate mode this extends (seam, undo stack, tracked-links-only)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.0.0 is not cut yet (latest tag v6.1.0), and all 24 fleet adopters sit at v6.0.0 with **tracked** skill links (16–34 each). Each would cross v7's BREAKING block, and today that skips them all. natabula, for one, tracks 3 renamed `.claude/skills` links, 3 renamed `.agents/skills` links, a per-project `ft-new-project` link, and 8 `.claude/commands/*.md` links that v7 leaves dangling. Without this child the fleet bump to v7 is entirely manual.

- [x] Read relevant source files — `tools/update-adopters.mjs` in full (gates, v6 `applyMigrate` undo stack, `WIRING_SURFACES`, `addedFilesForSurface`), `/ft-update` Steps 3–4.7, MIGRATION §"Pinning and bumping" + retired-skills table, UPGRADING.md v6 recipe, `SPEC/scope-boundaries.md` §"Cross-repo edit remit". Small known read set, so no probe.

- [x] **Best Practices Review** — the rename map is fleet-tool data, like `RENAME_TAG`, so it lives as a constant beside it. MIGRATION's retired table stays the human SSOT that `/ft-update` reads, and a test binds the two. The new link work reuses `trackedSymlinks`, `unwind` and the undo-entry shape rather than adding a second rollback idiom. `applyBump` keeps `rollbackBump` and runs the link undos ahead of it, which avoids an unrelated refactor. The seam follows the `renameTag` precedent: a `checkAdopter` option default (`skillRename`), carried to apply on the adopter object, because no v7.0.0 tag exists and the test fixtures read real tags. Zero-dep `node:` builtins only.

- [x] **Archive skim** — `archive/core/` confirmed (README: `CORE-*` → `archive/core/`). 122 hits for `update-adopters.mjs`; the load-bearing ones were read directly. CORE-711.3 (v6 migrate) set the precedents: a `checkAdopter` option seam, only the rename tag lifted from the bearing gate, an undo stack unwound newest-first, tracked symlinks only, a real-submodule fixture, and a rollback asserted with a byte-identical snapshot. Its review blocker (ignored files resurfacing) is a reminder to check what a move leaves visible. CORE-769.2 narrowed the Claude surface to `claude/skills/` (`claudeSkillsSurface`). CORE-769.6's Learnings carry the final map.

- [x] **Drift check** — `--diff-filter=A` is at `update-adopters.mjs:492` as Probe B said. PLAN line vs this note: two operator-approved extensions, both inside "rename-aware fleet migration for v7.0.0": (1) prune tracked retired command links, since without it the lifted gate would commit a v7 bump that leaves 8 dangling tracked links per repo; (2) a report-only count of tracked files still naming an old slug, the analogue of v6's per-project step-6 prose sweep. The PLAN's "21 caller references" are 21 in `.claude/skills` at `.1` time; today it is ~68 across 19 natabula files (skills, templates, scripts + tests, docs), and the row scopes them all. MIGRATION's retired rows for the four renames and the command stubs already exist (`.2`–`.6`), so the manual recipe is a new subsection, not new rows. `ft-new-project` is global-only by contract, yet natabula tracks a per-project link to it; the map covers it generically.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 4 asks; see Resolved scoping

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Resolved scoping (AskUserQuestion, 2026-10-09).**

| Question | Decision |
|---|---|
| Retired command links | Swap + prune in the same commit |
| Prose references | Report-only count on the report line |
| natabula row | File NAT-391 + local commit in natabula (unpushed) |
| Map SSOT | Script constant + MIGRATION table; test-bound parity |

**Design.**
- `SKILL_RENAME = { tag: 'v7.0.0', map: { 'ft-file-followup': 'ft-file-task', 'ft-epic-discovery': 'ft-open-epic', 'ft-new-project': 'ft-adopt', 'ft-seed': 'ft-seed-unattended' } }`.
- Plan, read from tracked symlinks only:
  - **swap** — a link `<dir>/<old>` whose target ends `core/<claude|codex>/skills/<old>` becomes `<dir>/<new>` → `…/<new>`.
  - **prune** — a link whose target ends `core/claude/commands/<x>.md`. A swap whose `<new>` already exists prunes the old link instead.
  - Matching on `core/…`, not on the parent dir, lets the same plan work after `applyMigrate`'s `.flowtron`→`.flaitron` re-point.
- Crossing: `current < tag ≤ latest`. Only `tag` is lifted, on both paths.
- Apply: verify each new link resolves after checkout, else roll back. The bump commit pathspec gains the link paths; the message appends `, swap renamed skill links` when the plan is non-empty.
- Note fix: `--no-renames` makes a `git mv` read as an add, and keys whose slug is a mapped target are excluded when the range crosses `tag`. A mapped rename is the swap's job, and an unmapped future one now surfaces.
- Untracked (gitignored) old links are not swapped (v6 precedent). `/ft-update` Step 4.6 names their replacement, and the MIGRATION recipe covers them by hand.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-711.3's shape: a tag constant beside `RENAME_TAG`, a `checkAdopter` option seam, a scoped bearing-gate lift, undo entries pushed per mutation and unwound newest-first, tracked symlinks only. The new helpers sit beside `applyMigrate`'s and reuse `trackedSymlinks`, `pathExists`, `isDir` and `unwind`.

- [x] **Minimal refactor gate** — no refactor. `applyBump` keeps `rollbackBump` and runs its link undos ahead of it. `newSkillWiringSurfaces` is exported for the blind-spot test; its signature only grows an optional `excludeSlugs`.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — +9 (65 → 74)

**Implementation Notes:**

- `tools/update-adopters.mjs`:
  - `SKILL_RENAME` const `{ tag: 'v7.0.0', map }` (exported).
  - `skillLinkPlan`: swap and prune entries, matched on `…/core/<platform>/<kind>/<leaf>`.
  - `applySkillLinkPlan`: per-link undo; throws if a swapped link does not resolve at the new pin.
  - `renamedSlugMentions`: worktree `git grep -l`, which skips symlinks, so the plan's own links never count. Verified in a scratch repo, which let me drop the `excludePaths` parameter I started with.
  - `formatLinksNote`.
  - `checkAdopter`: lifts `skillRename.tag` for both layouts; when `current < tag ≤ latest`, the result carries `skillRename` and `linksNote`.
  - `applyBump`: the plan runs after `checkoutVerified`, `git add -A --` covers the links, the pathspec commit gains them, and the message appends `, rewire skill links for <tag>`.
  - `applyMigrate`: new step 6 plans after step 4's re-point; the old step 6 becomes 7.
  - `addedFilesForSurface`: `--no-renames`. `newSkillWiringSurfaces` and its cache now take `excludeSlugs`.
  - `reportResult`: appends `linksNote` and passes `skillRename` to the apply.
  - Header gets a "Skill-rename migration" paragraph, and the "Not covered" line is extended.
- `tools/update-adopters.test.mjs`: `addRenameLinks` fixture (Claude + Codex renamed links, a taken new name, a retired command link, an AGENTS.md mention). Tests:
  - MIGRATION parity
  - note blind spot on the real CORE-769.3 `git mv` commit, with and without the exclusion
  - plan unit
  - classify crossing / not crossing
  - scoped lift (v5.0.0 as stand-in)
  - apply end-to-end
  - rollback snapshot
  - unresolvable-swap rollback
  - `applyMigrate` composition
- `claude/skills/ft-update/SKILL.md` Step 4.6: each dangling hit gets `→ <replacement>`, looked up in MIGRATION's retired table.
- `docs/MIGRATION.md`: the Step 4.6 sentence names the replacement lookup; a new `#### Upgrading to v7.0.0 (skill renames)` recipe; the fleet-updater paragraph names v7.0.0 as the second lifted breaking release. The recipe was exercised against a scratch layout: renamed Claude and Codex links swapped and resolving, the command link pruned, a real `.claude/commands/audit.md` left alone.
- natabula: `NAT-391` filed under `## High`, local commit `e6f66a6` (unpushed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full updater suite (74), since `checkAdopter`/`applyBump` are shared paths

- [x] Ran lint/type-check on changed code — `node --check` ×2 (zero-dep script; no linter configured for `tools/`)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason) — receipt below; the new helpers reuse `trackedSymlinks`, `pathExists`, `isDir` and `unwind`. The dead `excludePaths` parameter was dropped once `git grep` turned out to skip symlinks.

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — two passes. Review 1 found 2 blockers, which sent the work back to Phase 2 and re-ran Phase 3. Review 2 found notes only.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (Phase 3 re-run after the review-1 blockers):

```text
node --test tools/update-adopters.test.mjs                                 → 0 (74 pass; +9)
node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs → 0
grep -q 'Replacement' claude/skills/ft-update/SKILL.md                     → 0
grep -q 'Upgrading to v7.0.0' docs/MIGRATION.md                            → 0
git -C ~/Code/natabula log -1 --format=%s | grep -q NAT-391               → 0
bash tools/drift-checks.sh                                                 → 0
scratchpad recipe-check.sh (MIGRATION v7 recipe on a fake layout)           → swaps resolve; ft-new-project removed, no per-project ft-adopt; ft-* command link pruned; vendor look-alike + real audit.md kept
```

**External review 1** (`/code-review medium`, working-tree diff only). 9 findings:

1. **blocker** — the `ft-new-project` → `ft-adopt` swap created a per-project link to a global-only skill → `SKILL_RENAME.globalOnly`, and such links are pruned. Recipe updated to match.
2. **note, fixed** — the note excluded every mapped target, even ones the swap did not wire → it now excludes only this adopter's plan `newPath`s, matched per surface `linkDir`.
3. **blocker** — a tracked link the adopter changed but never committed would be swept into the pathspec commit → the plan skips `git diff --name-only` paths; `applyMigrate` stages step 4's re-points before planning.
4. **note, fixed** — the mentions grep now also excludes `.flowtron/` archives.
5. **note, fixed** — a link target must run through `.flaitron/core` or `.flowtron/core`.
6. **note, fixed** — the recipe's `find` is narrowed to `*/core/claude/commands/ft-*.md`.
7. **note, fixed** — the note is `''` when there are no plan entries and no mentions.
8. **note, fixed** — the extra `-A` on `git add` is reverted.
9. **note, no change** — the plan is computed twice (check for the report, apply for the commit). `applyMigrate` has to re-plan after step 4's re-point, and a link changing between check and apply in one sweep only skews a report count.

Tests extended for 1/2/3/5/7: a global-only prune, a dirty link skipped, the per-surface exclusion, a vendor look-alike kept, an empty note.

**External review 2** (`/code-review medium`, the Phase 3 re-run from the top). 10 findings, no blockers:

1. **note, partly fixed** — the lift skips v7's non-link steps (AGENTS.md re-paste, audit-fork copied stubs, agent-home links). Lifting with a per-project prose sweep was the operator's Discovery decision, following v6. The paste-block is already counted as a mention. Added: a count of real files left in `.claude/commands/` (an audit fork's stub). Agent homes lie outside any adopter repo.
2. **note, fixed** — the crossing check gets the same `currentVersion && latestVersion` guard as the pinned-ahead check. It isn't reachable today: `pinnedVersion` always returns `vX.Y.Z`.
3. **note, fixed** — a new name that's already linked is now recorded as `kept` and excluded from the note.
4. **note, fixed** — empty segments are dropped when matching (a trailing `/` or `//` target), and `newTarget` replaces the last segment in place.
5. **note, fixed** — the recipe only touches links whose target runs through `.flaitron/core`, so an adopter's own `ft-seed` link survives (checked in recipe-check.sh).
6. **note, fixed** — recipe and tool now prune the same set: `*.md` links into `.flaitron/core/claude/commands/`.
7. **note, fixed** — Step 4.6 says a brace group in a Retired cell stands for each slug it expands to.
8. **note, no change** — mentions in live PLAN rows still count. SPEC's Completed stubs are `shortname — Completed`, and an old slug in an open row is real drift.
9. **note, no change** — the plan is computed twice; same reason as review 1 #9.
10. **note, fixed** — the header's skill-rename paragraph is rewrapped, and its "both" now names its referents.

Post-fix receipt: `node --test tools/update-adopters.test.mjs` → 0 (74 pass), with new asserts for `kept`, the trailing slash, and the command-file count. `node --check` ×2 → 0. Acceptance greps → 0. `bash tools/drift-checks.sh` → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update.
  - **Updated:**
    - `docs/PLATFORMS.md` §non-goals: "beyond the v6.0.0 rename move" now adds "and the v7.0.0 skill-rename link swap".
    - `docs/MIGRATION.md`: the deliverable itself.
    - `claude/skills/*/SKILL.md`: `ft-update` Step 4.6, also a deliverable.
  - **No change:**
    - SPEC.md and `SPEC/scope-boundaries.md`: the carve-out describes the updater generically, and its v6 migrate is unmentioned there too.
    - README, AGENTS.md: the validation commands are unchanged.
    - The four AGENTS-snippets: no wiring change.
    - CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION, PHILOSOPHY, DOGFOOD, GATE-DISCIPLINE, `SPEC/gates.md`, `SPEC/gate-postures.md`, GLOSSARY, CODEX-VERIFICATION, HARNESS-SURVEY.
    - UPGRADING: it covers directory renames, and the v7 recipe lives in MIGRATION per the PLAN line.
    - CONTEXT-BUDGET: drift-checks budgets pass; MIGRATION is exempt by name.
    - VERSION-HISTORY: written at `/ft-release`.
  - **Release hand-off:** the v7.0.0 tag's `Migration (BREAKING)` block should name the MIGRATION §"Upgrading to v7.0.0" recipe and the fleet updater's lift. That's `/ft-release`'s and `.N`'s job.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-09.` stub (epic child, kept nested), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A`. The non-obvious facts live where the next editor needs them, in code comments: worktree `git grep` skips symlinks, and a pathspec commit sweeps in unstaged edits to the paths it names.

**Final Summary:**

The fleet updater can now carry adopters across v7.0.0. A range crossing `SKILL_RENAME.tag` is lifted past that one tag on either layout. The apply runs inside the same rollback window and commit as the pin move:
- links to a renamed slug are swapped to the new name;
- links into the retired `claude/commands/` are removed;
- a per-project link renamed into the global-only `ft-adopt` is removed, not swapped;
- links the adopter edited without committing are left alone.

The report line counts the rewired links, the tracked files still naming an old slug, and any leftover real `.claude/commands` files. The new-skills note now sees `git mv`'d skills and leaves out only the ones this adopter's plan wires. `/ft-update` Step 4.6 names each dangling slug's replacement, and MIGRATION gains a hand recipe. natabula has NAT-391 for its callers.

- **Changed files:**
  - `tools/update-adopters.mjs`
  - `tools/update-adopters.test.mjs` (+9 tests, 65 → 74)
  - `claude/skills/ft-update/SKILL.md`
  - `docs/MIGRATION.md`
  - `docs/PLATFORMS.md`
  - `.flaitron/PLAN.md` (stub flip)
  - this note
  - natabula `e6f66a6` (`.flaitron/PLAN.md`; local, unpushed)
- **Verification:** updater suite → 0 (74 pass), `node --check` ×2 → 0, Acceptance greps → 0, drift checks → 0, and the manual recipe exercised on a scratch layout.
- **Refactors:** none. `applyBump` runs the link undos ahead of the unchanged `rollbackBump`.
- **Docs verdict:** PLATFORMS updated; everything else "no change" (sweep above).
- **`touches:` reconciliation:** declared 5 files; `git diff --name-only` shows those 5 plus `docs/PLATFORMS.md`, from the doc-drift sweep.
- **Maintainability:** the rename map is one constant, held to MIGRATION's table by a test. A future rename release needs a new tag/map entry, not new machinery. An unmapped `git mv` now surfaces in the note instead of going silent.
- **Operator follow-ups:**
  - Push natabula when ready (one local commit).
  - At `/ft-release` v7.0.0, write the tag's BREAKING Migration block so it points at MIGRATION §"Upgrading to v7.0.0 (skill renames)". The updater lifts only that tag.

**Archived:** 2026-10-09
