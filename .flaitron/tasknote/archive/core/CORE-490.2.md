---
title: gitlink-drift-unresolved-sentinel
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

# CORE-490.2 | gitlink-drift-unresolved-sentinel

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-490]]

## 🎯 Goal

Make `tools/update-adopters.mjs` report an unresolvable gitlink or canonical tag SHA as a distinguishable unresolved sentinel and surface it as a status skip carrying the git error, instead of silently falling through to "✓ current".

## ✅ Acceptance

- [x] `recordedGitlinkSha` / `canonicalTagSha` return a distinguishable **unresolved sentinel** carrying the git error instead of a bare `null`, so a caller can tell "git could not answer" from a resolved SHA
- [x] `gitlinkDrift` propagates the sentinel rather than collapsing an unresolvable lookup to `null` (= "no drift")
- [x] `checkAdopter`'s `current === latest` branch returns `{status: 'skip', current, reason}` naming the git error when either lookup is unresolved — never `{status: 'current'}`
- [x] The two other resolver call sites (reverse-drift guard, missing-pinned-tag guard) keep their existing classifications and operator-facing messages
- [x] An injected-failure fixture test covers the new skip, and the full suite passes (`node --test tools/update-adopters.test.mjs`) alongside `node --check tools/update-adopters.mjs`
- [x] The header comment's per-adopter safety-gate list documents the new skip

## 🧩 Subtasks

- [x] Add the `unresolved(error)` / `isUnresolved(value)` sentinel pair with a comment naming what it distinguishes
- [x] Convert `recordedGitlinkSha` / `canonicalTagSha` to return the sentinel (with git's first stderr line) on failure instead of `null`
- [x] Propagate the sentinel through `gitlinkDrift`
- [x] Map the sentinel to a `skip` in `checkAdopter`'s `current === latest` branch; adapt the reverse-drift and missing-pinned-tag predicates without changing their behaviour, with a comment saying why they stay fall-through
- [x] Update the header comment's "Per-adopter safety gates" list + gitlink-drift paragraph
- [x] Add a fixture test: adopter pinned at `latest` with its own `.git` removed → `skip` naming the git error (currently reports `current`)
- [x] Run `node --test tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs`

## 🔗 Related

- [[CORE-EPIC-490]] — parent epic: updater-failure-honesty

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The defect matches current code exactly. `gitlinkDrift` (`tools/update-adopters.mjs:281-295`) returns `null` — the "no drift" value — when *either* `recordedGitlinkSha` (`:259`) or `canonicalTagSha` (`:271`) swallows a git failure and returns `null`. `checkAdopter`'s `current === latest` branch (`:456-460`) then early-returns `{status: 'current'}` and never touches git again, so a broken adopter repo or an unreadable `FLOWTRON_REPO` is reported as `✓ current` — a git failure rendered as a clean bill of health.

- [x] Read relevant source files — `tools/update-adopters.mjs` header comment (`:1-60`), `git`/`pinnedVersion`/`describePin` (`:142-256`), `recordedGitlinkSha`/`canonicalTagSha`/`gitlinkDrift` (`:257-295`), `checkAdopter` in full (`:444-545`), `applyBump`/`rollbackBump` (`:560-613`), `reportResult` (`:619-648`); `tools/update-adopters.test.mjs` fixture helpers (`makeAdopter`, `:104-129`), the `checkAdopter classification (fixtures)` suite (`:253-382`), and the `gitlinkDrift / describePin` suite (`:397-409`).

- [x] **Best Practices Review** — the change stays inside the two resolver helpers CORE-459.3 extracted plus their three call sites; no new module boundary, no new public surface beyond the sentinel pair (kept module-private — the tests assert through `checkAdopter`/`gitlinkDrift`, which are already exported). It extends the file's established shape rather than inventing one: the `{status: 'skip', current, reason}` report-only classification CORE-459.2/459.3/459.4 all used, and CORE-366's "branch on the real error instead of masking it" principle applied one layer down (CORE-366 fixed the same class of bug in the staged-diff gate). No duplication introduced — a second `try/catch` per call site is exactly what the sentinel avoids. No deferred cleanup identified.

- [x] **Archive skim** — 85 `archive/core/` notes mention `update-adopters`; narrowed by `grep -l 'gitlinkDrift\|recordedGitlinkSha\|canonicalTagSha'` to 9, read CORE-351.3, CORE-366, CORE-459.3, CORE-459.4 (the four that own this code). Load-bearing findings in Discovery Notes below.

- [x] **Drift check** — no drift. PLAN.md's CORE-490.2 line names `recordedGitlinkSha`/`canonicalTagSha`, the fall-through to `current`, and an injected-failure test; all three match the code read above. The parent CORE-EPIC-490 line's framing ("gitlinkDrift conflates 'git failed to resolve' with 'no drift' and reports ✓ current") is verbatim accurate. No SPEC contract touched — `tools/update-adopters.mjs` is the singular CLI carve-out under SPEC.md §"What flowtron does NOT provide", the same carve-out CORE-459.2/3/4 relied on. No `.1` Discovery child exists for this epic (Discovery was supplied by audit-repo 2026-08-28), so there is no `## 🌳 Fan-out` claim to echo into YAML.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Reuse the existing `skip` status** rather than add a new one — `reportResult`/`reportSummary` already treat `skip` as "report-only, no commit, counted separately", which is exactly "could not verify". Same assumption CORE-459.3/459.4 made.
  2. **Every resolver failure is "unresolved"** — git's exit code cannot separate "no committed gitlink yet" from "broken repo" (both are exit 128 with different stderr), so the sentinel carries the git message and the caller reports it rather than classifying it. Consequence: an adopter whose submodule was never committed moves from `✓ current` to `skip: could not resolve the committed gitlink …`, which is the honest reading the epic asks for.
  3. **Only the `current === latest` early return is converted to a skip.** The other two call sites already fail honestly: the reverse-drift guard falls through to the detached-HEAD / staged-diff gates, which rethrow any non-exit-1 git failure (CORE-366), and the missing-pinned-tag guard already returns a `skip`. Their predicates are adapted to the sentinel with no behaviour change, preserving CORE-459.4's message and CORE-366's rethrow test.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **The silent-success path is singular.** `checkAdopter` calls the resolvers at three places: `gitlinkDrift` inside the `current === latest` early return (`:457`), the reverse-drift guard (`:470-473`), and the missing-pinned-tag guard (`:514`). Only the first can report a *success* off a git failure, because it returns before any further git call. The other two either fall through into gates that rethrow (`git symbolic-ref`, `git diff --cached` — both branch on `e.code !== 1` and rethrow, per CORE-366) or already return a `skip`.
- **CORE-351.3** built `gitlinkDrift` and chose `null` = "no drift"; the null-on-failure catch was written as "can't resolve the latest tag locally — skip the cross-check", i.e. the conflation was deliberate-but-unexamined, not accidental.
- **CORE-459.3** extracted `recordedGitlinkSha`/`canonicalTagSha` out of `gitlinkDrift` for the reverse-drift guard; **CORE-459.4** then reused `canonicalTagSha` for the missing-pinned-tag guard, treating `null` as "tag not found" and emitting a `skip` naming `git fetch --tags`. That message is the one behaviour this task must preserve while changing the return contract underneath it.
- **CORE-366** is the direct precedent: it fixed the same defect class in the staged-diff gate (`e.code === 1` → skip, anything else → rethrow, "don't mask a genuine git failure"). This task applies that principle to the two SHA resolvers.
- **Verification convention** for this file is `node --test tools/update-adopters.test.mjs` + `node --check`, with real temp-git fixtures (no mocking framework — zero-dep by design). The injected failure therefore has to be a real broken repo: `rm -rf <adopter>/.git` on a `latest`-pinned fixture, which reaches the `current === latest` branch (SPEC.md is read from disk, so `pinnedVersion` still succeeds) and today returns `current`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Sentinel pair** (`tools/update-adopters.mjs:259-278`) — `unresolved(error)` returns `{unresolved: true, error}`; `isUnresolved(value)` is the type guard; `gitErrorLine(e)` pulls the first line of git's stderr (falling back to `e.message`). Module-private: the tests assert through the already-exported `checkAdopter` / `gitlinkDrift`, so no new public surface.
- **Resolvers** (`:280-300`) — both `catch` blocks now return the sentinel instead of `null`. Their doc comments were rewritten to say so; the old "no committed gitlink to compare against (e.g. no commits yet)" reading is exactly the conflation this task removes.
- **`gitlinkDrift`** (`:302-320`) — returns the sentinel (wrapping the resolver's error with which lookup failed) rather than `null`, with a comment stating that `null` is deliberately reserved for "compared, no drift".
- **`checkAdopter`** — the `current === latest` branch (`:481-492`) maps the sentinel to `{status: 'skip', current, reason: '<git error> — pin left unverified'}`. The reverse-drift guard (`:493-508`) and missing-pinned-tag guard (`:549`) had their predicates swapped to `isUnresolved(...)` with no behaviour change; the reverse-drift guard carries a comment naming why fall-through is correct there (the gates below rethrow non-exit-1 git failures, CORE-366).
- **Header comment** — one new "Per-adopter safety gates" bullet plus two sentences on the gitlink-drift paragraph.
- **Behaviour change worth naming:** an adopter whose `.flowtron/core` gitlink was never committed now reports `skip` rather than `✓ current`. That is the intended reading — the pin genuinely cannot be verified — and it was the assumption logged in Phase 1.

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

- `node --test tools/update-adopters.test.mjs` → **39/39 pass** (37 before + 2 new). Both new cases confirmed by name in the run.
- `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` → clean. ESLint covers only `viz/src/**` (`viz/eslint.config.js:11`), so `node --check` is this file's declared check per AGENTS.md §"Validation"; `viz/` is untouched.
- **Injected failure:** `checkAdopter classification (fixtures)` gains a fixture pinned at `latest` whose *superproject* `.git` is removed while the submodule stays intact — `pinnedVersion` still reads `latest` off disk, so the run lands in exactly the branch that used to early-return `current`. It now asserts `skip` + the git error + `pin left unverified`. A second case in the `gitlinkDrift` suite asserts the sentinel directly (`!== null`, `.unresolved === true`), pinning the contract the caller depends on.
- **Quality assertions:** no duplication added (the sentinel is what avoids a second try/catch per call site), no dead code, no public-surface growth (`unresolved`/`isUnresolved`/`gitErrorLine` are module-private), and the three doc comments that stated the old `null` contract were updated rather than left stale.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

- `README.md` — no change (names `tools/` and the carve-out; no status vocabulary).
- `AGENTS.md` — no change (validation commands unchanged; both still pass).
- `SPEC.md` — no change (carve-out reference only; this task adds no workflow contract).
- `docs/MIGRATION.md` — no change (§1.2.1 gates and the §"sweeping releases" paragraph describe skip-on-migration behaviour, all still accurate).
- `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — no change (adopter wiring, unrelated).
- `docs/CONVENTIONS.md` — no change (CI `validate`/`drift` job command lists unchanged).
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change. Its §"Fleet updater" bullets enumerate the *security* surface (execFile-only invocation, semver-constrained args, canonical-SHA cross-check, never-push, dry-run default, symlink footprint); an honesty fix to drift reporting strengthens fail-closed behaviour but adds no new bullet-worthy surface, and every existing bullet stays accurate.
- `docs/AGENT-NEUTRALITY.md` — no change (no Claude-specific surface touched).

**Final Summary:**

`gitlinkDrift` used to answer "no drift" when git simply failed to answer, and `checkAdopter`'s `current === latest` branch returns without touching git again — so a broken adopter repo (or an unreadable `FLOWTRON_REPO`) was reported as `✓ current`. The two SHA resolvers now return a distinguishable unresolved sentinel carrying git's own message, `gitlinkDrift` propagates it, and that branch reports `skip: <git error> — pin left unverified` instead.

- **Changed:** `tools/update-adopters.mjs` (+~40 lines net: sentinel trio, two resolver catches, `gitlinkDrift` propagation, one new `checkAdopter` branch, two predicate swaps, header-comment bullet + two sentences) and `tools/update-adopters.test.mjs` (+2 cases, ~25 lines).
- **Verification:** `node --test tools/update-adopters.test.mjs` 39/39; `node --check` clean on both files.
- **Refactors:** none beyond the change itself. The sentinel replaces a `null` that meant two things — the minimum shape that distinguishes them — and is deliberately module-private. Explicitly deferred: the reverse-drift and missing-pinned-tag call sites keep their current behaviour, because both already fail honestly (fall-through into gates that rethrow non-exit-1 git failures, per CORE-366; and an existing `skip` with CORE-459.4's `git fetch --tags` guidance). Converting them would have broken CORE-366's rethrow test for no honesty gain.
- **Docs:** sweep above — nine entries, no change on all nine.
- **Maintainability:** the `null`-means-two-things contract is gone from this file's hot path; the one behaviour change (never-committed gitlink now reports `skip`, not `current`) is documented in the header comment and pinned by a test that asserts the sentinel directly, so a future reader can't restore the conflation without a red test.

**Archived:** 2026-08-29
