---
title: release-module
status: completed
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931, CORE-931.3, CORE-479, CORE-490.4, CORE-493]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/release.mjs
  - tools/update-adopters.test.mjs
---

# CORE-931.2 | release-module

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-931]] [[CORE-931.3]] [[CORE-479]] [[CORE-490.4]] [[CORE-493]]

## 🎯 Goal

Pin the updater entry's export set and `FLAITRON_REPO` with tests. Then move the
git runner, the unresolved sentinel, tag reads, release-note classification and
the four per-sweep caches into `tools/update-adopters/release.mjs`. The caches
are rebuilt on one shared memo helper. The entry stays a facade with an
unchanged export set.

## ✅ Acceptance

- [x] Entry export set pinned and unchanged — `node --test tools/update-adopters.test.mjs`
- [x] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/release.mjs`
- [x] Both pins (export set = today's 29 names; `FLAITRON_REPO` = the repo root holding this `SPEC.md`) were green **before** the move — `node --test --test-name-pattern='entry facade' tools/update-adopters.test.mjs` run against the pre-move entry, receipt in Testing Notes
- [x] The four per-sweep caches moved here run on one memo helper; the CORE-490.4 / CORE-493 promise-identity tests pass unchanged — `node --test --test-name-pattern='memoization' tools/update-adopters.test.mjs`
- [x] The move is behavior-preserving: no function body changes beyond the `FLAITRON_REPO` depth and the memo rewrite — `judgment` (the External review confirmed it behavior-preserving)
- [x] CI roster and drift checks hold — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the two pins to `tools/update-adopters.test.mjs` (`describe('entry facade (CORE-931.2)')`); run them green against the unchanged entry
- [x] Create `tools/update-adopters/release.mjs` with the moved code, `FLAITRON_REPO` re-derived as `'..', '..'`, and a one-line pointer to the entry header
- [x] Replace the four cache `Map`s with one exported memo helper (key → the cached in-flight promise)
- [x] Rewire the entry: drop the moved code and the now-unused `execFile`/`promisify` imports, import what it still uses, and re-export each moved public name
- [x] Run the suite, the `node --check` pair and the drift checks

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic (updater-modules)
- [[CORE-931.3]] — next step; `blocked-by:` this. It also owns repointing `viz/src/workspace.ts`'s `latestReleaseTag` name-sharing note to release.mjs
- [[CORE-479]] — related-decision: `checkAdopter` left inline
- [[CORE-490.4]] — the `(fromTag, toTag)` memo and its promise-identity tests
- [[CORE-493]] — the `canonicalTagSha` memo and its promise-identity tests

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The file is still 1,671 lines, `tools/update-adopters/` does not exist, and every symbol the starter names sits where the survey left it. Nothing has landed since the epic was filed (HEAD `f9a25f68` is the filing commit).

- [x] Read relevant source files — `tools/update-adopters.mjs` in full; `tools/update-adopters.test.mjs` imports (13–44), Version-regex parity test (358–372) and memo tests (1724–1800); `.github/workflows/ci.yml` validate job; `viz/src/workspace.ts` mirror comments.

- [x] **Best Practices Review** — Dependency direction: release.mjs imports only `node:*` and is imported by the entry, so it has no internal imports and cannot form a cycle. `recordedGitlinkSha`/`gitlinkDrift` stay behind because of their `SUBMODULE_PATH` default, as the starter says. Responsibility: release.mjs owns "what does FLAITRON_REPO say about its releases". Duplication: four copies of the `has/set/get` memo become one helper, the duplication finding CORE-490.N flagged. Abstraction: the helper is ~8 lines with two users here and a third (`forkDriftCache`) in CORE-931.5. It is not speculative.

- [x] **Archive skim** — area `core` confirmed against the README table (`CORE-*` → `archive/core/`). `grep -l update-adopters` returns 252 hits, too many to read, so I scoped the search to split and module decisions (`into modules|module directory|tools/update-adopters/|single file`). No prior note rules out splitting the file. Load-bearing notes, all already captured by the `/ft-refactor` survey: [[CORE-479]] (`checkAdopter` gates left inline; untouched here), [[CORE-490.4]] / [[CORE-493]] (memo returns the in-flight promise itself, not an async wrapper, so promise identity holds; the helper must keep that) and CORE-490.N (logged the memo duplication).

- [x] **Drift check** — Every symbol in the starter's move list exists at its cited role: `execFileAsync` :207, `FLAITRON_REPO` :209, `git` :239, `parseSemverTag`/`compareSemver` :365/:371, `describePin` :414, `unresolved`/`isUnresolved`/`gitErrorLine` :434–445, `canonicalTagSha` :461, `latestReleaseTag` :493, `tagsInRange` :499, `migrationBearingTags` :521, `isReleaseTag` :532, `migrationAsk` :545, `acceptMigrationError` :573, `cachedMigrationBearingTags` :691, `cachedCanonicalTagSha` :709, `cachedFlaitronFile` :1121, `cachedFlaitronTree` :1133. The entry exports exactly 29 names, matching the 29 the suite imports. The plan matches the PLAN.md line and the starter. No drift.
  - **`latestReleaseTag` comment:** it says "see the workspaceRoot comment *above*". After the move workspaceRoot is not above it in release.mjs, so the reference becomes location-free ("workspaceRoot's mirror comment"). That edit is in scope. `viz/src/workspace.ts:64` still reads true, because the entry keeps re-exporting `latestReleaseTag`, and CORE-931.3 owns repointing it.
  - **Version-regex parity test:** it reads the entry's source text for `pinnedVersion`'s regex. `pinnedVersion` stays this step (it is CORE-931.3's), so the test is unaffected.
  - **Open at promotion (Node ≥20 guard):** resolved by reading. release.mjs's top level is only `promisify(execFile)`, one `resolve(...)` and the memo-wrapped function constants. No syntax or API newer than the entry already used, and no side effect, so the guard still prints first on an old Node. Lean confirmed; no guard move.

- [x] No clarifications needed (--fast). Assumptions:
  1. The memo helper is exported from release.mjs (CORE-931.5 adopts it), not re-exported by the entry, which keeps the export set at 29.
  2. `canonicalTagSha`, `cachedFlaitronFile` and `cachedFlaitronTree` stay non-public from the entry. The entry imports the two cached readers for its wiring code.
  3. The entry's final `export { FLAITRON_REPO, SUBMODULE_PATH, realOrResolve };` line stays as is (re-exporting an imported binding is legal ESM). The moved function exports get one `export { … } from './update-adopters/release.mjs'`.
  4. Each cache's one-off comment folds into the helper's comment, and its key derivation stays byte-identical.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (the starter's three, unchanged)

**Discovery Notes:**

The starter context was absorbed into the spec sections above; the original is in git history (`f9a25f68`). Its out-of-scope list stands: `recordedGitlinkSha`/`gitlinkDrift` → CORE-931.6, `fetchTimeoutMs` → CORE-931.7, path constants, discovery and viz mirrors → CORE-931.3, the header split and SECURITY.md's `git()` line → CORE-931.8. The locked decisions stand too: the entry remains CLI and facade, there is one test file importing via the entry, the `node --check` list is unchanged, the module dir is `tools/update-adopters/`, and the interim header stays whole with a one-line pointer from the new module.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `tools/` has no module directory yet, so this is a new shape, justified by the epic's locked decisions: plain relative ESM under `tools/update-adopters/` keeps the zero-dependency plain-`node` property. The facade follows the entry's existing style, a trailing `export { … }`, and adds one `export { … } from` for the moved names. `memoByKey` generalises the four identical `has`/`set`/`get` blocks into their common shape.

- [x] **Minimal refactor gate** — Two changes beyond the move, both required by Acceptance: `FLAITRON_REPO` → `'..', '..'`, and the four memo blocks → `memoByKey`. Two comment edits are forced by the move: the sentinel comment's "two SHA resolvers below" now names where each one lives, and `latestReleaseTag`'s "workspaceRoot comment above" drops the now-false "above". Deferred: `forkDriftCache` → `memoByKey` (CORE-931.5), `viz/src/workspace.ts:64`'s pointer (CORE-931.3) and `SECURITY.md:283`'s `git()` pointer (CORE-931.8).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — two pins (`entry facade (CORE-931.2)`), written and green before any move

**Implementation Notes:**

- `tools/update-adopters/release.mjs` (new, 252 lines) holds `FLAITRON_REPO`, `git`, `parseSemverTag`, `compareSemver`, `describePin`, `unresolved`, `isUnresolved`, `gitErrorLine`, `canonicalTagSha` (private), `latestReleaseTag`, `tagsInRange`, `migrationBearingTags`, `isReleaseTag`, `migrationAsk`, `acceptMigrationError`, `memoByKey`, `cachedMigrationBearingTags`, `cachedCanonicalTagSha`, `cachedFlaitronFile` and `cachedFlaitronTree`. Every function body is byte-identical to the source; only comments and the memo plumbing changed.
- The entry went from 1,671 to 1,447 lines. It imports the 15 names it still uses and re-exports the 12 public moved functions, while its trailing `export { FLAITRON_REPO, SUBMODULE_PATH, realOrResolve }` line is untouched. `execFile`/`promisify` imports dropped (now unused here).
- Memo semantics are preserved. `memoByKey` stores `compute(...args)`'s returned promise itself, with no wrapper, so promise identity holds, and each key derivation is byte-identical to its former `Map` key. One difference: `cachedFlaitronFile` used to compute the key once and reuse it as the `git show` argument. Now the key function and the compute function each build `` `${tag}:${path}` ``, which is the same string.
- `cachedMigrationBearingTags` / `cachedCanonicalTagSha` changed from `export function` to `export const`, which is binding-equivalent for importers. Nothing calls them at module top level, so the TDZ cannot bite.
- Node-guard order: release.mjs's top level has no side effects beyond creating functions, so the entry's `< 20` guard still decides first in practice (confirmed by reading).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the full updater suite (it is the module's suite), 124/124

- [x] Ran lint/type-check on changed code — `node --check` on the entry, the new module and the suite (`tools/` has no linter; `npm --prefix viz run lint` covers `viz/` only, which this task does not touch)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — `/code-review medium` over this task's working-tree diff only (new module marked intent-to-add so it was in range). No blockers and no correctness bugs. Four notes: one fixed, three answered (Testing Notes)

- [x] (frontend) `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (attended default plus the full module suite; `--fast` is implied by the `[unattended]` row marker):

- **Pre-move** (entry untouched, pins added): `node --test --test-name-pattern='entry facade' tools/update-adopters.test.mjs` → 0 (2/2 pass)
- **Post-move:**
  - `node --test tools/update-adopters.test.mjs` → 0 (124/124 pass, 0 skipped)
  - `node --test --test-name-pattern='entry facade' tools/update-adopters.test.mjs` → 0 (2/2)
  - `node --test --test-name-pattern='memoization' tools/update-adopters.test.mjs` → 0 (8/8; the CORE-490.4 / CORE-493 promise-identity tests are unchanged)
  - `node --check tools/update-adopters.mjs && node --check tools/update-adopters/release.mjs` → 0
  - `node --check tools/update-adopters.test.mjs` → 0
  - `bash tools/drift-checks.sh` → 0 (every pair ok)
  - `node --test tools/drift-checks.test.mjs` → 0 (48/48)
  - CLI smoke: `node tools/update-adopters.mjs --root <empty scratch dir>` → 0, printing `latest release: v8.5.0`, which proves `FLAITRON_REPO` resolves the real tag list from the new depth
- **Hygiene:** no duplication left (the four memo blocks are now one helper), no dead code (`execFile`/`promisify` dropped from the entry), and no stale docs in scope (`SECURITY.md:283` still holds through the re-export; CORE-931.8 owns it).
- **👁️:** `N/A` — no rendered surface.

External review findings (`/code-review medium`; it confirmed the move behavior-preserving, the export set at 29, and `FLAITRON_REPO` at the repo root):

1. **note → fixed.** `claude/skills/ft-release/step-7.2-tag-message.md:28` pointed the sentinel check at `update-adopters.mjs:migrationBearingTags`. This move made the pointer stale, and no CORE-931 child tracked it. Repointed to `tools/update-adopters/release.mjs:migrationBearingTags`. `bash tools/drift-checks.sh` → 0 after the edit (the near-cap budget lines are advisory and predate the edit).
2. **note → no change (locked decision).** The new module is not in the CI/justfile `node --check` roster. The starter locked "`node --check` list unchanged": Pair H binds it to `/ft-release` at a 95% budget, and `node --test` loads every module, so a syntax error still fails CI. The reviewer's lazily-imported-module scenario does not arise: each later module is statically imported by the entry.
3. **note → no change (interim, owned).** release.mjs's one-line pointer to the entry header is interim by the locked "Interim header" decision. CORE-931.8 splits the header and adds the module map.
4. **note → declined, outside this diff.** `followThrough` reads `cachedWorkflowBlock(latest)` before knowing whether AGENTS.md has a Workflow heading. That line is byte-identical at `HEAD` (`git show HEAD:tools/update-adopters.mjs` line 1436), so this task did not introduce it. The cost is one cached `git show` per sweep. Not filed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — I grepped the tracked markdown for pointers into the moved code. `AGENTS.md`: no change (the validation roster and CLI path are unchanged). `SECURITY.md`: no change this task; line 283 still holds through the re-export, and CORE-931.8 owns repointing it. `SPEC/layout.md` and `README.md`: no change, and CORE-931.8 owns the module-map wording. `claude/skills/ft-release/step-7.2-tag-message.md:28`: updated (External review finding 1). Every other AI-referenced doc: no change, since none names a moved symbol.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`. The one insight (a module that derives a path from `import.meta.url` needs a pin before it moves) is already carried by this epic's later steps and the new test.

**Final Summary:**

This was the first move of CORE-EPIC-931. Characterization pins for the updater entry's 29-name export set and for `FLAITRON_REPO` landed first and passed against the untouched entry. The git runner, release-tag reads, release-note classification and the four per-sweep caches then moved into `tools/update-adopters/release.mjs`. The caches now share one `memoByKey` helper, and the entry stays the CLI and a re-exporting facade.

- **Changed:** `tools/update-adopters/release.mjs` (new, 252 lines); `tools/update-adopters.mjs` (1,671 → 1,447 lines; moved code out, plus an import block and an `export … from`); `tools/update-adopters.test.mjs` (+47, two pins); `claude/skills/ft-release/step-7.2-tag-message.md` (one pointer).
- **Verification:** suite 124/124 (exit 0); facade pins 2/2 both before and after the move; memo tests 8/8; `node --check` on the entry, the module and the suite → 0; `bash tools/drift-checks.sh` → 0; `node --test tools/drift-checks.test.mjs` → 48/48; CLI smoke resolves `v8.5.0` from the new depth.
- **Refactors:** four memo blocks → `memoByKey`, which is exported for CORE-931.5's `forkDriftCache`. Deferred: `viz/src/workspace.ts:64` (CORE-931.3), `SECURITY.md:283` and the header split (CORE-931.8).
- **Docs:** one pointer updated (`step-7.2-tag-message.md`); everything else no change or owned by a later child.
- **Scope:** declared 3 files, changed 4. Undeclared: `claude/skills/ft-release/step-7.2-tag-message.md`, a pointer this move made stale, surfaced by the External review and fixed in place.
- **Maintainability:** the release-read layer, which every later module imports, now has its own ~250-line home with no internal imports. The memo idiom lives in one place, and a later move that changes the export set or `FLAITRON_REPO` now fails a named test instead of silently retargeting tag reads.

**Archived:** 2026-11-24
