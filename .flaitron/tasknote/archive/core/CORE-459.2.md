---
title: detached-HEAD pre-flight gate
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-459]
---

# CORE-459.2 | detached-HEAD pre-flight gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-459]]

## 🎯 Goal

Add a `symbolic-ref --quiet HEAD` pre-flight check to `checkAdopter` so a tag-checkout/bisect/rebase adopter repo is skipped instead of receiving an orphaned bump commit.

## ✅ Acceptance

- [x] `checkAdopter` returns `{status: 'skip', reason: 'detached HEAD...'}` when the adopter repo's HEAD is detached, before any bump-path work runs
- [x] New fixture test covers the detached-HEAD skip path
- [x] Existing test suite still passes in full
- [x] Header comment's safety-gate list updated to name the new gate

## 🧩 Subtasks

- [x] Read `checkAdopter` in tools/update-adopters.mjs to find where a pre-flight gate belongs
- [x] Confirm `git symbolic-ref --quiet HEAD` exit-code behavior (0 on a branch, 1 detached)
- [x] Add the gate, following the existing `e.code !== 1 → rethrow` pattern used by the staged-changes gate
- [x] Add a fixture test mirroring the dirty-worktree/staged-changes skip tests
- [x] Run `node --test tools/update-adopters.test.mjs`
- [x] Update header comment's safety-gate list

## 🔗 Related

- [[CORE-EPIC-459]] — parent epic: adopter-bump edge states (Finding #1, High)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Finding #1 (High) still matches current code — `checkAdopter` (tools/update-adopters.mjs:410) had no detached-HEAD check, and `applyBump` commits onto `repo`'s HEAD (line 519), exactly the orphaned-commit risk the finding describes.

- [x] Read relevant source files — read `checkAdopter` (410-461), `applyBump` (498-527), and the `git()` helper (127-130) in tools/update-adopters.mjs; read the `checkAdopter classification (fixtures)` suite (253-349) in tools/update-adopters.test.mjs for the test pattern.

- [x] **Best Practices Review** — the fix is a single early-return gate matching the shape of the existing staged-changes and dirty-worktree gates (same try/catch `e.code !== 1 → rethrow` idiom, same `{status:'skip', current, reason}` return shape). No new abstraction needed; extends the established pattern.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` has no CORE-459.2 predecessor; this is the first work against Finding #1 (the epic's Discovery was supplied externally by audit-repo, not via a `.1` tasknote in this repo).

- [x] **Drift check** — PLAN.md's CORE-459.2 line matches Finding #1 exactly; no SPEC contract conflict (this is the `tools/` fleet-maintenance carve-out already documented in the file's own header comment, per SPEC §"What flowtron does NOT provide").

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Assumption: the detached-HEAD check belongs on `repo` (the adopter superproject, where `applyBump` commits), not `sub` (the flowtron submodule) — confirmed by `applyBump`'s commit call at line 519 targeting `repo`.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Verdict: Proceed, no significant scope deviation → skip 🛠️. Placed the gate right after the `current === latest` early return (so it only guards the path that could reach a bump commit) and before the pinned-ahead guard, so a detached-HEAD adopter fails fast before any tag-range/network work runs. Empirically verified `git symbolic-ref --quiet HEAD` exits 0 on a branch and 1 (silently) when detached, in a scratch repo.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing skip-gate pattern (staged-changes / dirty-worktree gates); no new shape introduced.

- [x] **Minimal refactor gate** — no refactor needed; single additive gate, N/A.

- [x] Implemented the minimal solution — added a `try { await git(repo, 'symbolic-ref', '--quiet', 'HEAD') } catch (e) { if (e.code !== 1) throw e; return {status:'skip', ...} }` gate in `checkAdopter` (tools/update-adopters.mjs), plus a matching line in the file's header safety-gate comment list.

- [x] Updated/added tests for non-trivial behavior — added `skip: detached HEAD in adopter repo (CORE-459.2)` to the `checkAdopter classification (fixtures)` suite in tools/update-adopters.test.mjs, using the existing `makeAdopter` fixture + `git checkout -q --detach HEAD`.

**Implementation Notes:** tools/update-adopters.mjs: +9 lines (gate) + 2 lines (header comment), inserted between the `current === latest` early return and the pinned-ahead guard. tools/update-adopters.test.mjs: +7 lines (one `it` block alongside the sibling `skip: dirty .flowtron/core worktree` test).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 35/35 pass, including the new detached-HEAD test.

- [x] Ran lint/type-check on changed code — no root-level lint config or package.json covers `tools/`; ran `node --check` on both changed files (syntax OK). N/A beyond that — no linter is configured for this directory.

- [x] **Quality assertions** — no duplication (gate mirrors the existing idiom exactly in shape); no dead code; no added complexity; no public-surface growth (`checkAdopter`'s return shape is unchanged — only a new `reason` string on the existing `skip` status); header comment updated so it doesn't go stale.

- [x] (frontend) N/A — no UI surface touched.

**Testing Notes:** `node --test tools/update-adopters.test.mjs` → tests 35, pass 35, fail 0, cancelled 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change. This is a self-contained fix inside `tools/update-adopters.mjs` + its test file; no CAPABILITIES/AGENT-COMPAT/PLATFORMS/MIGRATION/SPEC surface was touched.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-459` parent; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted (below).

**Final Summary:** Added a detached-HEAD pre-flight gate to `checkAdopter` in `tools/update-adopters.mjs` (+11 lines) — a `git symbolic-ref --quiet HEAD` check on the adopter's own repo, placed right after the current/drift early return and before the pinned-ahead guard, returning `{status:'skip', reason:'detached HEAD — check out a branch before bumping'}` on exit code 1 (rethrowing on any other failure, mirroring the existing staged-changes gate idiom). Closes Finding #1 (High): previously a tag-checkout/bisect/rebase adopter repo sailed through `checkAdopter` and `applyBump` would commit the gitlink bump onto detached HEAD — a commit no branch points to, orphaned the moment the operator returned to a branch. Added one fixture test (`skip: detached HEAD in adopter repo (CORE-459.2)`) mirroring the sibling staged-changes/dirty-worktree tests, using `git checkout -q --detach HEAD` on the adopter fixture. Updated the file's header safety-gate list to name the new gate. Full suite: 35/35 pass, no regressions. No refactors, no doc drift, no public API change.

**Archived:** 2026-08-21
