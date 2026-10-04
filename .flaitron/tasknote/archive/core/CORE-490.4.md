---
title: tag-pair-memoization
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-490]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-490.4 | tag-pair-memoization

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-490]]

## 🎯 Goal

Memoize `migrationBearingTags` and `newSkillWiringSurfaces` by `(fromTag, toTag)` in `tools/update-adopters.mjs` so a sweep with many adopters pinned to the same current tag doesn't redundantly re-spawn the same `git` subprocesses per adopter.

## ✅ Acceptance

- [x] Repeated `checkAdopter` calls in the same sweep that share the same `(current, latest)` pair reuse a cached migration-bearing-tags result instead of re-running `tagsInRange` + `migrationBearingTags` git spawns
- [x] Repeated `checkAdopter` calls in the same sweep that share the same `(current, latest)` pair reuse a cached `newSkillWiringSurfaces` result instead of re-running its git spawns
- [x] `migrationBearingTags`'s existing exported `(tags)` signature and `tagsInRange`'s existing exported `(fromTag, toTag)` signature are unchanged (both have direct test coverage and an external caller outside `checkAdopter`)
- [x] No cache-invalidation logic is added — `FLOWTRON_REPO`'s tags are immutable for the lifetime of one sweep process, so a per-process cache is safe without expiry
- [x] `node --test tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs` pass

## 🧩 Subtasks

- [x] Add a module-level cache (e.g. two `Map`s, or one keyed by a `{fn}:{fromTag}:{toTag}` composite) in `tools/update-adopters.mjs`
- [x] Wrap the `tagsInRange` + `migrationBearingTags` call pair in `checkAdopter` (`:572-573`) behind a cached-by-`(current, latest)` helper, without changing the exported functions' signatures
- [x] Wrap `newSkillWiringSurfaces(current, latest)` (called at `:596`) behind a cache keyed by `(current, latest)`
- [x] Add a test proving the cache is exercised on a repeated pair (e.g. two adopters sharing the same pinned tag see one set of underlying git calls, verified via a spy/count or via the cache's exposed size) without weakening existing per-adopter behavior assertions
- [x] Run `node --test tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs`

## 🔗 Related

- [[CORE-EPIC-490]] — parent epic: updater-failure-honesty

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `checkAdopter` (`tools/update-adopters.mjs:491-598`) calls `tagsInRange(current, latest)` → `migrationBearingTags(range)` and `newSkillWiringSurfaces(current, latest)` once per adopter in the sequential sweep loop (`:757-764`). `latest` is fixed for the whole sweep, and `current` is very often shared across adopters (most pin to the same prior release), so the exact scenario the epic names — redundant `FLOWTRON_REPO` git spawns for a repeated `(fromTag, toTag)` pair — is real and matches current code, exactly as the epic and this child's PLAN line describe.

- [x] Read relevant source files — `tools/update-adopters.mjs`: `git()` helper (`:155-158`), `migrationBearingTags` (`:364-394`, exported, per-tag `git tag -l --format=...` spawns), `wiredSkillKeys`/`addedFilesForSurface`/`newSkillWiringSurfaces` (`:399-449`, not exported, `git show`/`git diff` spawns), `checkAdopter` (`:491-598`, call sites at `:572-573` and `:596`), the sweep loop (`:750-764`). `tools/update-adopters.test.mjs`: import list (`:13-31`), direct `migrationBearingTags` usage (`:81`, `:214`, `:219`, `:228` — always called with a plain tag array, never a `(fromTag, toTag)` pair), `tagsInRange` usage (`:654`), confirmed `newSkillWiringSurfaces` has no direct test import (private to the module, only exercised through `checkAdopter`).

- [x] **Best Practices Review** — single responsibility: this is a caching layer added around two existing pure-ish (repo-scoped, not mutating) lookup functions, not a redesign. Dependency direction unchanged — the cache lives inside `update-adopters.mjs`, doesn't leak into `checkAdopter`'s public contract, and doesn't touch `tagsInRange`/`migrationBearingTags`'s exported signatures (both have direct test coverage per the read above, and `migrationBearingTags` also has a caller outside `checkAdopter` at `:81` with a different argument shape — a single-tag array — so changing its signature to `(fromTag, toTag)` would break that caller and the direct tests). No nearby duplication to extend; this is new module-level state (first cache in the file), justified because `checkAdopter` is the only place both functions are invoked in a loop over a shared-`latest` axis.

- [x] **Archive skim** — `grep -l 'migrationBearingTags\|newSkillWiringSurfaces\|tagsInRange' .flowtron/tasknote/archive/core/*.md` hit `CORE-490.2.md` and `CORE-490.3.md` (both sibling epic children). CORE-490.3's Discovery Notes confirm **no `.1` Discovery child was ever filed for this epic** — the epic was filed with its children already scoped, so there's no `## 🌳 Fan-out` claim to echo into this note's YAML. Neither sibling touched `migrationBearingTags`/`newSkillWiringSurfaces`/caching — CORE-490.2 fixed `gitlinkDrift`'s unresolved-sentinel handling, CORE-490.3 added `--no-verify` to the bump commit. No load-bearing constraint from either beyond confirming the no-`.1` state (already independently verified: `find .flowtron/tasknote -iname "CORE-490.1*"` and the archive equivalent both returned nothing).

- [x] **Drift check** — PLAN.md's line text matches current code exactly: `migrationBearingTags` (`tools/update-adopters.mjs:364`) and `newSkillWiringSurfaces` (`:428`) both exist under those names, both are called from `checkAdopter` with a `(fromTag, toTag)`-shaped pair available at the call site (`current`/`latest`), and `FLOWTRON_REPO` (`:103`) is read-only within a sweep — confirmed no code path in `tools/update-adopters.mjs` writes to `FLOWTRON_REPO` (it's only ever passed as the `cwd` for `git()` read subcommands: `tag`, `show`, `diff`, `rev-parse`). This is the epic's own performance sub-goal ("per-adopter re-queries of FLOWTRON_REPO repeat ... subprocess spawns on a large sweep"); this child scopes exactly the two functions named in its own PLAN line, no broader.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Cache scope and key** — a per-process (module-level) cache keyed by the `(fromTag, toTag)` string pair, one cache per wrapped function (or one `Map` keyed by `{fn-tag}:{fromTag}:{toTag}`), living only inside `tools/update-adopters.mjs`. No cross-process persistence, no TTL/expiry — a sweep is one short-lived CLI invocation and `FLOWTRON_REPO`'s tag set doesn't change mid-run (confirmed above), so there's nothing to invalidate.
  2. **Don't change exported signatures** — `migrationBearingTags(tags)` and `tagsInRange(fromTag, toTag)` keep their current signatures/exports untouched (both have direct test coverage; `migrationBearingTags` also has the `:81` non-`checkAdopter` caller with a single-tag-array shape). Memoization is added as a wrapper at the `checkAdopter` call site (`:572-573`) that caches the `tagsInRange` + `migrationBearingTags` pair's *result* by `(current, latest)`, not inside `migrationBearingTags` itself. `newSkillWiringSurfaces` is unexported and only called from `checkAdopter`, so it can be wrapped directly.
  3. **Test verification approach** — since `git()` is a local (non-exported-as-mockable-from-outside-ESM) helper, the new test proves memoization behaviorally: run `checkAdopter` (or the new cached wrapper directly) twice with the same `(current, latest)` pair and assert either (a) an exposed cache-hit signal (e.g. a `Map.size` staying at 1, or an exported cache-clear/inspect hook added for testability) or (b) result identity/equality plus a lightweight call-count via a test-local wrapper around `git` if one is introduced. Exact mechanism decided in Phase 2 once the wrapper shape is chosen — the acceptance criterion is "reuses a cached result," not a specific test technique.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- The epic's own header text ("per-adopter re-queries of FLOWTRON_REPO repeat ~2,700 subprocess spawns on a large sweep") is epic-level framing from the audit-repo discovery, not literal code in the file — no comment in `update-adopters.mjs` cites that figure. This child's scope is strictly the two named functions per its own PLAN.md line, not a broader spawn-reduction sweep.
- `discoverAdopters` (`:460-479`) and the sweep loop (`:750-764`) are sequential (`for...of` with `await`), so there's no concurrency hazard for a shared in-memory cache — no need for request-coalescing/in-flight dedup, a plain `Map` populated synchronously after each `await` resolves is sufficient.
- `formatSkillsNote` (`:451-458`, exported, tested directly) is a pure formatter downstream of `newSkillWiringSurfaces` and is untouched by this change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no existing cache/memoization shape in this file to extend (first module-level cache in `update-adopters.mjs`); justified as new because `checkAdopter` is the only place these two functions are called in a loop over a shared `latest` axis. Kept `migrationBearingTags`/`tagsInRange` exported signatures untouched (SRP: caching is a concern of the *caller* pattern, not the pure lookup functions) — wrapped at the `checkAdopter` call site instead of mutating the lookup functions themselves, preferring composition (`.then()` chaining `tagsInRange` → `migrationBearingTags`) over reimplementing either.

- [x] **Minimal refactor gate** — no refactor beyond the two call-site swaps in `checkAdopter` (`:572-573` → one line, `:596` → one line) and the new cache module. Nothing else touched.

- [x] Implemented the minimal solution — added `bearingTagsCache`/`cachedMigrationBearingTags` and `skillWiringCache`/`cachedNewSkillWiringSurfaces` (`tools/update-adopters.mjs`, inserted after `discoverAdopters`, before the skip/drift gates comment), each a plain (non-`async`) function returning the cached in-flight/settled promise directly from a `Map` keyed by `` `${fromTag}::${toTag}` ``. `checkAdopter` now calls the cached wrappers instead of `tagsInRange`+`migrationBearingTags` / `newSkillWiringSurfaces` directly. Both wrappers are exported for direct test coverage.

- [x] Updated/added tests for non-trivial behavior — new `describe('(fromTag, toTag) memoization (CORE-490.4)')` block in `tools/update-adopters.test.mjs`: promise-identity on repeated calls (both wrappers), cache non-sharing across distinct pairs, result parity between `cachedMigrationBearingTags` and the uncached `tagsInRange`+`migrationBearingTags` path, and an integration test proving two `checkAdopter` calls sharing `(current, latest)` don't repopulate the cache entry.

**Implementation Notes:**

- `tools/update-adopters.mjs:484-511` — new module-level caches + wrappers, inserted between `discoverAdopters` and the existing "Eight sequential skip/drift gates" comment (natural seam: right before their sole consumer, `checkAdopter`).
- `tools/update-adopters.mjs` — `checkAdopter`'s two call sites (previously `tagsInRange(current, latest)` + `migrationBearingTags(range)`, and `newSkillWiringSurfaces(current, latest)`) now call `cachedMigrationBearingTags(current, latest)` and `cachedNewSkillWiringSurfaces(current, latest)` respectively.
- **Deliberate choice — plain functions, not `async`:** an `async function` wrapper always returns a *new* `Promise` object even when it `return`s an already-settled/in-flight promise (the async machinery adopts the inner promise's state onto a fresh outer one), which would break promise-identity as a memoization proof and defeat the "share one in-flight computation" property for genuinely concurrent callers. Plain functions returning the `Map`-stored promise directly avoid both problems. `await` on the caller side works identically either way.
- No change to `migrationBearingTags`'s or `tagsInRange`'s exported signatures — both keep their existing direct test coverage and the non-`checkAdopter` caller at `update-adopters.test.mjs:81` (single-tag-array shape) untouched.

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

- `node --test tools/update-adopters.test.mjs` → **45/45 pass** (40 baseline through CORE-490.3 + 5 new memoization tests).
- `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` → clean. `node --check` is this file's declared check (ESLint covers only `viz/src/**`, unaffected — confirmed in CORE-490.3's Testing Notes).
- **Quality assertions:** no duplication (both cache wrappers share the same `Map`-keyed-by-composite-string shape, intentionally parallel rather than factored into one generic memoize helper for two call sites — judged not worth the indirection at this size); no dead code; no unexplained complexity (the async-vs-plain-function choice is commented at the point of decision); public-surface growth is two new exports (`cachedMigrationBearingTags`, `cachedNewSkillWiringSurfaces`) — necessary for direct promise-identity test coverage, consistent with this file's existing convention of exporting internals for test access (`git`, `pinnedVersion`, `verifyPinnedSha`, etc.); no stale code-facing docs — the new cache header comment states scope, safety rationale (no invalidation needed), and the plain-function-vs-async tradeoff.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

- `README.md` — no change.
- `AGENTS.md` — no change (validation commands unchanged; both still pass).
- `SPEC.md` — no change (carve-out reference only).
- `docs/MIGRATION.md` — no change (its `tools/update-adopters.mjs` paragraph describes migration-gate/skill-symlink behavior, not internal caching).
- `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — no change (adopter wiring, unrelated).
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change (Fleet updater section describes gate/hook/commit behavior toward adopters; caching is a pure internal performance detail, not a security-relevant behavior change).
- `docs/AGENT-NEUTRALITY.md` — no change.
- `docs/PLATFORMS.md` — no change.
- `claude/CAPABILITIES.md` — no change.
- `docs/AGENT-COMPAT.md` — no change.
- `docs/EXTERNAL-AGENTS.md` — no change.
- `docs/WORKTREES.md` — no change.
- `docs/VISION.md` — no change.

**Final Summary:**

Memoized `migrationBearingTags` and `newSkillWiringSurfaces` in `tools/update-adopters.mjs` by `(fromTag, toTag)`: `checkAdopter` now calls new `cachedMigrationBearingTags`/`cachedNewSkillWiringSurfaces` wrappers instead of re-running `tagsInRange`+`migrationBearingTags`/`newSkillWiringSurfaces` on every adopter, so a sweep where many adopters share the same pinned tag against a fixed `latest` computes each distinct `(fromTag, toTag)` pair's git-backed lookups exactly once per process. No behavioral change to the sweep's output — same skip/bump classifications, verified by the parity test against the uncached path.

- **Changed:** `tools/update-adopters.mjs` (+28 lines: two module-level `Map` caches, two exported wrapper functions with a header comment, two one-line call-site swaps in `checkAdopter`), `tools/update-adopters.test.mjs` (+2 imports, +50 lines: one new `describe` block, 5 tests).
- **Verification:** `node --test tools/update-adopters.test.mjs` → 45/45 pass (40 baseline + 5 new); `node --check` clean on both `.mjs` files.
- **Refactors:** none beyond the two call-site swaps required to route through the new caches. `migrationBearingTags`/`tagsInRange`'s exported signatures were deliberately left untouched (existing direct test coverage + a non-`checkAdopter` caller) — the cache wraps the caller's usage pattern, not the lookup functions themselves.
- **Docs:** sweep above — 15 "no change"; this is an internal performance change with no observable-contract or adopter-facing behavior shift.
- **Maintainability:** the new cache is documented at its own declaration (scope, why no invalidation is needed, why plain functions rather than `async`) rather than left to be inferred from the diff; the deliberate async-vs-plain-function tradeoff is called out explicitly since it's the kind of detail a future refactor could silently break (wrapping in `async` again would defeat promise-identity sharing without any test failing to explain why, absent the comment).

**Archived:** 2026-08-29
