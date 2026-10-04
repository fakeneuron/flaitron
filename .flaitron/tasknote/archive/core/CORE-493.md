---
title: canonical-tag-sha-reuse
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-490.2, CORE-490.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-493 | canonical-tag-sha-reuse

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-490.2]] [[CORE-490.4]]

## 🎯 Goal

Memoize `canonicalTagSha` by tag (it re-spawns `git rev-parse` per adopter for a sweep-constant `latest` and a commonly-shared `current`), and reconcile `applyBump`'s hand-inlined duplicate of that lookup with CORE-490.2's unresolved-sentinel contract.

## ✅ Acceptance

- [x] `canonicalTagSha(tag)` lookups are memoized per-process, keyed by `tag`, mirroring the `cachedMigrationBearingTags` / `cachedNewSkillWiringSurfaces` pattern from CORE-490.4
- [x] All three internal call sites (`gitlinkDrift`, the reverse-drift guard, the missing-pinned-tag guard) go through the cached wrapper
- [x] `applyBump`'s hand-inlined `git(FLOWTRON_REPO, 'rev-parse', ...)` duplicate is replaced with the cached wrapper, honoring the unresolved-sentinel contract (throws with the git error rather than letting a sentinel object flow into `verifyPinnedSha`)
- [x] Tests confirm promise-identity memoization for the new cache and that `applyBump` reuses the cache entry `checkAdopter` already warmed for the same adopter
- [x] Full suite passes (`node --test tools/update-adopters.test.mjs`) alongside `node --check tools/update-adopters.mjs`
- [x] No behavior change to any reported status/message — this is a performance + duplication fix only

## 🧩 Subtasks

- [x] Add `canonicalShaCache` Map + exported `cachedCanonicalTagSha(tag)` wrapper next to the existing `(fromTag, toTag)` caches
- [x] Repoint `gitlinkDrift`'s `canonicalTagSha(latest)` call to the cached wrapper
- [x] Repoint `checkAdopter`'s reverse-drift-guard and missing-pinned-tag-guard calls to the cached wrapper
- [x] Replace `applyBump`'s inlined `git rev-parse ${latest}^{commit}` with `cachedCanonicalTagSha(latest)`, adding an `isUnresolved` check that throws (preserving the existing throw-and-rollback path)
- [x] Add a `canonicalTagSha memoization (CORE-493)` test block: promise identity for a repeated tag, no cross-tag sharing, `checkAdopter` cache reuse across adopters, `applyBump` reuse of the cache `checkAdopter` already warmed
- [x] Run `node --test tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs`

## 🔗 Related

- [[CORE-490.2]] — gitlink-drift-unresolved-sentinel: defines the `unresolved(error)` / `isUnresolved(value)` sentinel contract this task's `applyBump` reconciliation must honor
- [[CORE-490.4]] — tag-pair-memoization: the `(fromTag, toTag)` cache pattern this task mirrors for a single-tag key
- [[CORE-490.N]] — updater-failure-honesty audit that surfaced this task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The description matches current code exactly. `canonicalTagSha` (`tools/update-adopters.mjs:304`) is called from three places within a single `checkAdopter` invocation depending on branch: `gitlinkDrift` (`:322`, only when `current === latest`), the reverse-drift guard (`:567`, only when `current !== latest`), and the missing-pinned-tag guard (`:609`). Across a fleet sweep, `latest` is identical on every `checkAdopter` call, and `current` is frequently shared across adopters pinned to the same release — none of that is cached today, so each adopter re-spawns `git rev-parse` in `FLOWTRON_REPO` for tags that cannot change mid-sweep. `applyBump` (`:694`, pre-edit) separately hand-inlines the identical `git(FLOWTRON_REPO, 'rev-parse', `${latest}^{commit}`)` call rather than reusing `canonicalTagSha`, bypassing CORE-490.2's sentinel contract entirely (a git failure there throws directly rather than returning the sentinel).

- [x] Read relevant source files — `tools/update-adopters.mjs` header comment (`:1-60`), the existing `(fromTag, toTag)` caches (`bearingTagsCache`/`cachedMigrationBearingTags`, `skillWiringCache`/`cachedNewSkillWiringSurfaces`, `:483-512`), `recordedGitlinkSha`/`canonicalTagSha`/`gitlinkDrift` (`:280-328`), `checkAdopter` in full (`:522-624`), `applyBump` (`:679-716`), `verifyPinnedSha` (`:634-640`); `tools/update-adopters.test.mjs`'s `(fromTag, toTag) memoization (CORE-490.4)` describe block (`:662-711`) and `applyBump rollback (CORE-419.3)` block (`:589-652`); the archived `CORE-490.2.md` and `CORE-490.4.md` (skimmed via the archive step below) for the sentinel and cache conventions to mirror.

- [x] **Best Practices Review** — the change stays inside the sentinel/cache machinery CORE-490.2/490.4 already established: one more `cachedXxx` wrapper next to the two existing ones, no new module boundary. Followed the same precedent CORE-490.2 set for `newSkillWiringSurfaces` (kept private, only the cached wrapper exported) rather than exporting `canonicalTagSha` itself — the sentinel-producing resolvers stay module-private; only the cache-facing surface is public. `applyBump`'s duplicate git call is removed entirely rather than kept alongside the cache (no duplication left). No deferred cleanup identified.

- [x] **Archive skim** — `grep -l 'canonicalTagSha\|cachedMigrationBearingTags\|cachedNewSkillWiringSurfaces' .flowtron/tasknote/archive/core/*.md` hit `CORE-490.2.md`, `CORE-490.4.md`, `CORE-459.3.md`, `CORE-459.4.md`. Read `CORE-490.2.md` (sentinel contract: `canonicalTagSha` returns `{unresolved: true, error}` on git failure, never throws; callers check `isUnresolved`) and `CORE-490.4.md`'s cache pattern (referenced via the live code, already read above) in full; `CORE-459.3`/`CORE-459.4` were the resolvers' original extraction and are unchanged by this task. No `## 🔗 Related`/`supersedes:`/⚠️ pointers on either hit beyond the parent `CORE-EPIC-490` link.

- [x] **Drift check** — no drift. PLAN.md's CORE-493 line names `canonicalTagSha`, `gitlinkDrift`, the missing-pinned-tag guard, and `applyBump`'s hand-inlined duplicate; all four match the code read above exactly (line numbers shift slightly from CORE-490.2/490.4's cited ranges due to the intervening cache additions, but the described defect and call sites are unchanged). No SPEC contract touched — `tools/update-adopters.mjs` is the singular CLI carve-out under SPEC.md §"What flowtron does NOT provide", same carve-out CORE-490.2/490.4 relied on.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Mirror CORE-490.4's exported-wrapper / private-resolver split** rather than caching inside `canonicalTagSha` directly — keeps the resolver's raw sentinel-producing behavior untouched and gives tests a promise-identity handle, exactly as `cachedNewSkillWiringSurfaces` does for its private `newSkillWiringSurfaces`.
  2. **`applyBump` should consume the sentinel, not bypass it.** Preserving the existing throw-and-rollback behavior on an unresolvable `latest` means checking `isUnresolved` explicitly and throwing an `Error` with the git message, rather than letting a `{unresolved: true, ...}` object flow into `verifyPinnedSha`'s string comparison (which would always report a spurious mismatch).
  3. **Cache invalidation is a non-issue**, same argument CORE-490.4 already documented: one short-lived process per sweep, `FLOWTRON_REPO`'s tags don't change mid-run.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `canonicalTagSha` has exactly three internal call sites pre-fix (`gitlinkDrift:322`, `checkAdopter` reverse-drift guard `:567`, `checkAdopter` missing-pinned-tag guard `:609`) plus `applyBump`'s independent hand-inlined duplicate (`:694`) — four total call sites for what is conceptually one lookup.
- Because `checkAdopter` always runs before `applyBump` for a given adopter in `main`'s sequential `for` loop, and the reverse-drift guard (or `gitlinkDrift`) always resolves `cachedCanonicalTagSha(latest)` somewhere along `checkAdopter`'s path to a `bump` verdict, `applyBump`'s cache lookup is a genuine reuse in practice, not just a code-dedup — confirmed by the new `applyBump reuses the cache checkAdopter already warmed for `latest`` test.
- Kept `canonicalTagSha` itself unexported and unchanged in body — only its call sites moved to the new cached wrapper — so CORE-490.2's sentinel contract (returns `unresolved(error)`, never throws) is untouched; the cache sits strictly above it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the exact `cachedXxx` / `Map` pattern already established twice in this file (`cachedMigrationBearingTags`, `cachedNewSkillWiringSurfaces`) rather than inventing a new caching shape; kept the raw resolver private per the `newSkillWiringSurfaces` precedent.

- [x] **Minimal refactor gate** — no refactor beyond what Acceptance required: added one cache + wrapper, repointed four call sites (three internal, one in `applyBump`), removed `applyBump`'s duplicate git call. No unrelated cleanup.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Cache** (`tools/update-adopters.mjs`, after `cachedNewSkillWiringSurfaces`) — `canonicalShaCache` Map + exported `cachedCanonicalTagSha(tag)`, single-key variant of the `(fromTag, toTag)` caches above it, with a comment explaining the sweep-constant-`latest` / shared-`current` motivation and cross-referencing CORE-493.
- **Call-site repoints** — `gitlinkDrift`'s `canonicalTagSha(latest)`, the reverse-drift guard's `canonicalTagSha(latest)`, and the missing-pinned-tag guard's `canonicalTagSha(current)` all now call `cachedCanonicalTagSha`. `canonicalTagSha` itself is unchanged and stays module-private.
- **`applyBump` reconciliation** — replaced `const canonicalSha = (await git(FLOWTRON_REPO, 'rev-parse', `${latest}^{commit}`)).trim();` with `const canonicalSha = await cachedCanonicalTagSha(latest);` followed by an explicit `isUnresolved(canonicalSha)` check that throws `Error(`could not resolve canonical SHA for ${latest} in ${FLOWTRON_REPO}: ${canonicalSha.error}`)` — caught by the existing outer `try/catch`, which still rolls back and rethrows exactly as before a raw git failure would have.
- **Behavior preserved:** every reported status string, skip reason, and rollback path is unchanged — this is a performance/duplication fix, not a contract change. `verifyPinnedSha`'s mismatch message and the rollback tests still pass unmodified.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — CLI-only change, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → **49/49 pass** (45 before + 4 new, 0 regressions). New `canonicalTagSha memoization (CORE-493)` describe block: promise identity for a repeated tag, no cross-tag cache sharing, `checkAdopter` cache reuse across two adopters sharing `latest`, and `applyBump` reusing the exact cache entry `checkAdopter` already warmed (asserted via promise identity, matching the CORE-490.4 test style).
- `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` → clean. Same as CORE-490.2/490.4, ESLint covers only `viz/src/**`, so `node --check` is this file's declared check per AGENTS.md §"Validation"; `viz/` is untouched.
- Existing `applyBump rollback (CORE-419.3)` tests (post-checkout verify-fail, commit-fail) still pass unmodified — confirms the `isUnresolved` reconciliation didn't disturb the mismatch-throw or rollback paths.
- **Quality assertions:** no duplication left (the one shared cache + wrapper replaces two independent lookups — the internal calls and `applyBump`'s inlined one), no dead code, no public-surface growth beyond the one new `cachedCanonicalTagSha` export (mirroring the two existing `cachedXxx` exports), no stale doc comments (the new cache carries its own rationale comment; the private `canonicalTagSha` doc comment was untouched since its contract didn't change).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), tasknote YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention", then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files and LOC where meaningful, verification commands and results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

- `README.md` — no change (public overview; no internal-tool implementation detail).
- `AGENTS.md` — no change (validation commands unchanged; both still pass).
- `SPEC.md` — no change (carve-out reference only; this task adds no workflow contract).
- `docs/MIGRATION.md` — no change (no adoption/bump-procedure behavior changed for adopters).
- `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — no change (adopter wiring, unrelated).
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change. Its §"Fleet updater" bullets enumerate the security surface (execFile-only invocation, semver-constrained args, canonical-SHA cross-check, never-push, dry-run default); the canonical-SHA cross-check itself is unchanged in outcome — only where the lookup is spawned and cached — so no bullet needs updating.
- `docs/AGENT-NEUTRALITY.md` — no change.
- `docs/PLATFORMS.md` — no change.
- `claude/CAPABILITIES.md` — no change.
- `docs/AGENT-COMPAT.md` — no change.
- `docs/EXTERNAL-AGENTS.md` — no change.
- `docs/WORKTREES.md` — no change.

**Final Summary:**

`canonicalTagSha`'s three internal call sites (`gitlinkDrift`, and `checkAdopter`'s reverse-drift and missing-pinned-tag guards) each re-spawned `git rev-parse` in `FLOWTRON_REPO` per adopter, even though `latest` is identical across a whole sweep and `current` is frequently shared. `applyBump` separately hand-inlined the same lookup, bypassing CORE-490.2's unresolved-sentinel contract. Added `cachedCanonicalTagSha(tag)` — a single-tag counterpart to CORE-490.4's `(fromTag, toTag)` caches — repointed all four call sites to it, and made `applyBump`'s reconciled call honor the sentinel (`isUnresolved` → throw, preserving the existing rollback path).

- **Changed:** `tools/update-adopters.mjs` (+~15 lines net: one cache Map + exported wrapper with rationale comment, three call-site repoints, `applyBump`'s duplicate replaced with the cached call + sentinel check) and `tools/update-adopters.test.mjs` (+1 import, +48 lines: one new describe block, 4 test cases).
- **Verification:** `node --test tools/update-adopters.test.mjs` 49/49 (4 new, 0 regressions); `node --check` clean on both files.
- **Refactors:** none beyond the change itself — `applyBump`'s duplicate git call is removed outright rather than left alongside the cache. Deferred: nothing identified: the fix is fully self-contained to the four call sites named in the task.
- **Docs:** sweep above — fourteen entries, no change on all fourteen (internal performance/dedup fix, no adopter-facing behavior or contract change).
- **Maintainability:** one lookup mechanism (`canonicalTagSha` + `cachedCanonicalTagSha`) now serves all four call sites instead of three sharing it and a fourth silently duplicating it outside the sentinel contract; a future change to the sentinel shape only needs to touch one resolver.

**Archived:** 2026-08-29
