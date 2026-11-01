---
title: selection-gate-flags
status: completed
tags: [fleet, pin-bump, updater]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.2, CORE-852.4]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - SECURITY.md
  - docs/MIGRATION.md
blocked-by:
  - CORE-852.2
---

# CORE-852.3 | selection-gate-flags

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-852]] [[CORE-852.1]] [[CORE-852.2]] [[CORE-852.4]]

## 🎯 Goal

Port natabula `wave-bump.sh`'s repo-selection and gates into `tools/update-adopters.mjs` as generic flags (`--target`, `--only`, `--branch`, `--accept-migration`), plus `.gitmodules` path resolution and an uninitialised-submodule skip row, keeping every updater-only gate.

## ✅ Acceptance

- [x] `--target TAG` bumps to TAG instead of the newest tag; an unknown or non-semver TAG exits 2 before any repo read — `node --test tools/update-adopters.test.mjs`
- [x] `--only <repo>` (repeatable) lists and counts only the named adopters; a name matching no adopter prints one ⏭ skip row (repeats collapse) and counts as skipped; `--only` with no value is a usage error — `node --test tools/update-adopters.test.mjs`
- [x] `--branch <name>` skips a behind adopter whose checked-out branch is not `<name>`; absent flag = no branch gate — `node --test tools/update-adopters.test.mjs`
- [x] `--accept-migration TAG` (repeatable) waives only that tag's Migration block; validated before any repo read (unknown, after target, no Migration block to waive, release notes unreadable → exit 2); never waives an attended ledger — `node --test tools/update-adopters.test.mjs`
- [x] The submodule path is resolved from `.gitmodules` (the entry whose url names flaitron), falling back to `.flaitron/core`; check, bump, rollback and report all act on the resolved path — `node --test tools/update-adopters.test.mjs`
- [x] An adopter whose declared flaitron submodule is not initialised prints a ⏭ skip row naming the path, never a silent drop — `node --test tools/update-adopters.test.mjs`
- [x] Every existing updater-only gate and test still passes — `node --test tools/update-adopters.test.mjs`
- [x] Syntax checks clean — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs`
- [x] Header comment documents the new flags and gates — `judgment` — prose, read in review
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `parseArgs`: `--target`, `--only` (repeatable), `--branch`, `--accept-migration` (repeatable); USAGE line
- [x] Split `migrationBearingTags` into a per-tag `migrationAsk(tag)` classifier (`null` / `unreadable` / `asks`) so `--accept-migration` validation can name its reason; `migrationBearingTags` keeps its contract
- [x] `main`: resolve target (`--target` > `FLAITRON_UPDATE_LATEST` seam > newest tag), validate it and each accepted tag before discovery; header lines name target + accepted tags
- [x] `discoverAdopters`: resolve the flaitron submodule path from `.gitmodules` (fallback `.flaitron/core`); a declared-but-uninitialised path yields an adopter flagged `uninitialised`
- [x] Thread `subPath` through `recordedGitlinkSha` / `gitlinkDrift` / `checkAdopter` / `applyBump` / `rollbackBump` and the reason strings
- [x] `checkAdopter`: uninitialised skip (first), `--branch` gate (after detached HEAD), accepted tags filtered out of the bearing list
- [x] `main`: `--only` filter + unmatched-name skip rows
- [x] Tests mirroring `wave-bump.test.sh`'s `only` / `accept migration` / `uninit` / `offmain` cases, plus non-canonical `.gitmodules` path bump
- [x] Header comment update

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.1]] — Discovery; behaviour matrix + locked decisions (generic policy flags)
- [[CORE-852.2]] — blocked-by: attended-ledger guard ships first (Fan-out: sequential)
- [[CORE-852.4]] — next child; follow-through + commit contract

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed (a905d657); the selection/gate rows of `.1`'s matrix (`--target`, `--only`, not-main, `--accept-migration`, uninitialised, `.gitmodules`) are still W-only in the updater, and `.7`'s parity run needs them.

- [x] Read relevant source files — `tools/update-adopters.mjs` (all), `tools/update-adopters.test.mjs` (fixtures, parseArgs / checkAdopter / CLI groups), natabula `scripts/wave-bump.sh` (all), `scripts/wave-bump.test.sh` (all), `scripts/discover-fleet.sh`

- [x] **Best Practices Review** — gates stay inline and sequential in `checkAdopter` (CORE-479). Policy arrives as flags; the tool carries no fleet names (`.1` locked decision). The one shape change: `SUBMODULE_PATH` stops being a per-run constant and becomes per-adopter `subPath` (default `.flaitron/core`), threaded through the five functions that name it. `migrationBearingTags` gains a per-tag classifier so the accept validation and the gate share one Migration parser (the duplication `.1` names: wave's `migration_ask` "mirrors" it).

- [x] **Archive skim** — `.1`'s skim covers this file (CORE-490.3, CORE-419.3, CORE-827, CORE-486, CORE-479); `.2` adds the `--root` value-validation pattern (CORE-419.4) and the exit-1-only git catch (CORE-366). `.gitmodules` hits: CORE-711.3 (retired migrate mode parsed `.gitmodules` sections — retired at CORE-827, nothing to reuse), CORE-312 (`/ft-update` resolves `<FT>` from `.gitmodules` — the parity this port gives the batch tool). CORE-540/601: the "empty workspace prints no-adopters" test must stay green.

- [x] **Drift check** — PLAN line matches `.1`'s matrix rows and locked decision (generic flags; `--branch <name>` for wave's not-main). wave-bump's `--only` matches discover-fleet's relative path (recursive); the updater's discovery is one level — out of scope (operator: leave out; `.7` records any nested-adopter diff). The not-main gate in W fires only on behind repos (after the current check); same placement here. W counts a pin ahead of `--target` as current; the updater keeps its pinned-ahead skip (PLAN: "Keep the updater-only gates"), worded for a target. No drift against `SPEC.md` §"What flaitron does NOT provide" — the carve-out wording is `.6`'s.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — one asked (recursive discovery → leave out; `.7` records). Assumptions: (1) rejected `--target` / `--accept-migration` values exit **2** (usage — bad CLI input), where W exits 1; (2) `--target` must be a semver tag that resolves in FLAITRON_REPO, and wins over the `FLAITRON_UPDATE_LATEST` test seam; (3) `--only` matches the adopter's top-level directory name; (4) `.gitmodules` lookup takes the first `submodule.*.url` containing `flaitron` (W's rule) and falls back to `.flaitron/core` when there is none — existing fixtures carry no `.gitmodules`; (5) an uninitialised path is reported only when `.gitmodules` declares it (a bare missing `.flaitron/core` is not an adopter, as today); (6) `--branch` is single-valued; (7) an accepted tag waives the migration gate only — the ledger gate already runs first.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Fixture shape: tests use real flaitron tags via a local mirror clone, not a synthetic origin like `wave-bump.test.sh`. The `accept migration` cases map onto real tags: `v5.0.0` is BREAKING (asks); `v5.10.1` is all-clear ("no Migration block to waive"); an annotated non-Migration tag is needed for one case — use the serial lightweight-tag pattern (CORE-424.3) for "release notes unreadable".
- Uninit fixture: hand-written `.gitmodules` (url `…/flaitron.git`, path `.flaitron/core`) committed, then the submodule dir emptied — what `submodule deinit -f` leaves.
- Non-canonical path fixture: clone into `vendor/flaitron`, declare it in `.gitmodules`, bump end to end.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: `--root`'s value validation (CORE-419.4) for every new flag; inline sequential gates in `checkAdopter` (CORE-479); the unresolved-sentinel (`cachedCanonicalTagSha`) for tag resolution; `reportResult`'s ⏭ row for unmatched `--only` names; fixture helpers `makeAdopter` / `runCli`

- [x] **Minimal refactor gate** — three, each for Acceptance: (1) `parseArgs` value-taking moved into `takeValue` / `takeTag` closures — five flags would otherwise repeat the same missing/`--` check; (2) `migrationBearingTags`' loop body extracted to `migrationAsk(tag)` so `--accept-migration` validation shares one Migration parser (contract of `migrationBearingTags` unchanged); (3) `SUBMODULE_PATH` → per-adopter `subPath` in the five functions that named it (`rollbackBump` now takes `subPath` instead of `sub`)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `parseArgs` → `target`, `only[]`, `branch`, `acceptMigrations[]`; tags must be semver (usage error); `--only` / `--branch` reject empty. USAGE line names all flags.
- `migrationAsk(tag)` → `null` / `'unreadable'` / `'asks'`; `acceptMigrationError(tag, target)` → `unknown tag` / `after target X` / `no Migration block to waive` / `release notes unreadable` / null (wave-bump's four messages).
- `declaredSubmodulePath(repo)` — `git config -z -f .gitmodules --get-regexp '^submodule\..*\.url$'`, first url containing `flaitron`, its `.path`; any failure, absolute or escaping path → null → fallback `.flaitron/core`. `discoverAdopters` returns `{ name, repo, subPath }`, plus `uninitialised: true` when declared but no `SPEC.md`.
- `checkAdopter(adopter, latest, { attendedLedgers, branch, acceptedMigrations })`: uninitialised skip first; detached-HEAD check now reads `symbolic-ref --short` and feeds the `--branch` gate (`on branch X, not Y`); accepted tags filtered from the cached bearing list (cache stays raw). Pinned-ahead wording now says "target release … check --target, or run git fetch --tags".
- `main`: `--target` > `FLAITRON_UPDATE_LATEST` > newest tag; `--target` and each accepted tag validated before the header prints or discovery runs (exit 2); header prints `target release:` under `--target` and `migration accepted (reviewed): …`; `--only` filter runs ahead of the empty-workspace return so an unmatched name in an empty workspace still gets its row; unmatched rows print after the sweep, counted skipped.
- Header comment: usage lines, Selection / `--accept-migration` / Submodule-path paragraphs, gate list (+ uninitialised, + `--branch`), exit-2 wording; gate-count comment Ten → Twelve.
- Tests (+15): parseArgs new flags + rejections; `migrationAsk`; `acceptMigrationError` all four reasons (temporary lightweight `v0.0.2` in FLAITRON_REPO, serial group, try/finally — the CORE-424.3 pattern); checkAdopter `--branch`, partial/full waiver, ledger-beats-waiver, uninitialised, non-canonical bump + drift; discoverAdopters `.gitmodules` path / uninitialised / undeclared-invisible; CLI `--only` (incl. empty workspace), `--target` over the env seam, four pre-read rejections (exit 2, no `workspace:` line), accepted-tag header, uninitialised row; sandboxed `--apply` on `vendor/flaitron`. discoverAdopters' existing `deepEqual` gained `subPath` (intended).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` (the tool has no linter; zero-dep plain Node)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (104 tests, 104 pass) — decides Acceptance 1–7; after review fixes → 0 (106/106)
- `git branch --list 'v0.0.*'` → empty (temporary `isReleaseTag` branch cleaned up)

**External review** (`/code-review medium`, working-tree diff of the two tool files) — 9 findings, none a blocker (every Acceptance criterion held as written):

1. note, **fixed** — first flaitron-url `.gitmodules` entry without a checkout marked a repo uninitialised even when `.flaitron/core/SPEC.md` exists (regression vs pre-change). Now every declared path is a candidate, `.flaitron/core` last; first checked-out wins; uninitialised only when none is.
2. note, **fixed** — substring `flaitron` url match was case-sensitive and over-matched (`flaitron-brand-assets`). Now the url's last segment must be `flaitron(.git)`, case-insensitive (stricter than wave-bump; `.7`'s parity run will show any fleet effect).
3. note, **fixed** — `symbolic-ref --short` yields `heads/main` beside a same-named tag; `--branch` now compares the full `refs/heads/<name>`.
4. note, **fixed** — trailing `/` on a declared path stripped.
5. note, **fixed** — `--target` / `--accept-migration` resolved any ref (a branch spelled `v9.9.9` passed); new `isReleaseTag` requires `refs/tags/<tag>`.
6. note, declined — `--only` still probes every workspace dir before filtering; wave-bump does the same (discover then `selected`), cost is one `stat` + one `git config` per dir.
7. note, declined — accepted tags classified twice (validation + sweep); two extra `git tag -l` spawns per accepted tag, not worth a third cache.
8. note, declined — "No .flaitron/core adopters found." names the default path; still accurate for the fallback, and two existing tests pin the wording.
9. note, **fixed** — `startsWith('..')` rejected a legal `..name` path; now `=== '..' || startsWith('../')`.

Doc-drift sweep follow-on (same Phase 3 re-run): `.gitmodules` paths are adopter-authored and now reach `git add/commit/reset` as pathspecs → those three calls run under `--literal-pathspecs`; SECURITY.md's threat-model bullet updated to say so.
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0
- `bash tools/drift-checks.sh` → 0
- `git tag -l 'v0.0.*'` → empty before and after the run (temporary lightweight tag cleaned up)
- Header comment — judgment: reads the four new flags, Selection / accept / Submodule-path paragraphs, and the two new gate bullets
- Structural: no dead code (`rollbackBump`'s `sub` param replaced, not kept); public surface grows by `migrationAsk` + `acceptMigrationError` exports, both tested directly; no stale comment left naming `SUBMODULE_PATH` as the only path

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (names the tool, not its flags) · `AGENTS.md` no change (validation commands unchanged) · `SPEC.md` no change (carve-out wording is `.6`'s) · `docs/MIGRATION.md` **updated** — "discovers only `.flaitron/core` adopters" → path read from `.gitmodules`, default `.flaitron/core` · `claude/` `codex/` `cursor/` `grok/` `AGENTS-snippet.md` no change (the `ln -s` parse is untouched) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` **updated** — semver bullet names `--target` / `--accept-migration` and tag-only resolution; new literal-pathspecs bullet for the adopter-declared path; `--no-verify` bullet says "flaitron submodule gitlink" · `docs/AGENT-NEUTRALITY.md` `docs/PLATFORMS.md` `claude/CAPABILITIES.md` `docs/AGENT-COMPAT.md` `docs/EXTERNAL-AGENTS.md` `docs/WORKTREES.md` `docs/VISION.md` no change (no updater content). The broader `docs/` flag sweep stays `.6`'s.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the one durable point (adopter-declared paths reach git as pathspecs → `--literal-pathspecs`) now lives in SECURITY.md, which is already in the swept set

**Final Summary:**

`tools/update-adopters.mjs` now takes natabula `wave-bump.sh`'s selection and gate policy as generic flags: `--target`, repeatable `--only` (an unmatched name becomes one skip row), `--branch`, and repeatable `--accept-migration`, which is validated before any repo is read and refused with exit 2. It also reads the flaitron submodule path from `.gitmodules`, falls back to `.flaitron/core`, and reports a declared-but-uninitialised submodule as a skip row. Every pre-existing gate is unchanged.

- **Changed files:** `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs` (+18 tests, 88 → 106), `SECURITY.md`, `docs/MIGRATION.md`.
- **Verification:** `node --test tools/update-adopters.test.mjs` → 0 (106/106); `node --check` both → 0; `bash tools/drift-checks.sh` → 0; no temporary `v0.0.*` tag or branch left in FLAITRON_REPO.
- **Refactors:** `parseArgs` value helpers; `migrationAsk` extracted from `migrationBearingTags` (one Migration parser for gate + waiver validation); `SUBMODULE_PATH` → per-adopter `subPath`. Deferred: `--only` pre-filtering discovery, `migrationAsk` memoization, the empty-workspace message wording (review notes 6–8).
- **External review:** 9 notes, 0 blockers; 6 fixed, 3 declined with reasons (Testing Notes).
- **Doc verdict:** SECURITY.md + MIGRATION.md updated; rest no change.
- **`touches:` reconciliation:** declared 4 files, changed 4 — matches (SECURITY.md / MIGRATION.md added to `touches:` when the doc-drift sweep found them).
- **Maintainability:** wave-bump's selection logic now has one home; `.4` builds the follow-through on a per-adopter `subPath`, so the writes it adds land at the resolved path for free.
- **For `.7`:** two intentional divergences from wave-bump to expect in the parity diff: the url match is stricter (last segment `flaitron`, any case), and a pin ahead of `--target` is skipped rather than counted current. Discovery is still one level deep (operator: leave out).

**Archived:** 2026-10-31
