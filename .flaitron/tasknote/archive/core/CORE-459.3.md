---
title: empty-stage no-op + gitlinkDrift on bump path
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-459]
---

# CORE-459.3 | empty-stage no-op + gitlinkDrift on bump path

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-459]]

## 🎯 Goal

Classify gitlink-current-but-worktree-stale adopter repos up front in `checkAdopter` so `applyBump` never attempts an empty-stage commit that fails and triggers `rollbackBump` to reset an already-correct worktree back to the stale SHA.

## ✅ Acceptance

- [x] `checkAdopter` returns `{status: 'drift', ...}` (not `'bump'`) when the superproject's committed `.flowtron/core` gitlink already equals the canonical latest-tag SHA but the checked-out submodule worktree (what `pinnedVersion` reads) is behind
- [x] New fixture test covers this reverse-drift classification, and asserts `checkAdopter` returns before any bump-path work would run — the fixture never calls `applyBump`, and the assertion is on `checkAdopter`'s return value alone
- [x] Existing test suite still passes in full — 36/36
- [x] Header comment's gitlink-drift-detection note covers both directions
- [x] `gitlinkDrift` and the new check share the recorded-gitlink / canonical-latest-SHA lookup rather than duplicating it

## 🧩 Subtasks

- [ ] Extract shared `recordedGitlinkSha(repo)` / `canonicalTagSha(tag)` helpers from `gitlinkDrift`'s inline logic
- [ ] Add the reverse-drift gate in `checkAdopter`, placed right after the existing `current === latest` early-return block (before the detached-HEAD guard), using the shared helpers
- [ ] Update the header comment's "Gitlink-drift detection" note to describe both directions
- [ ] Add a fixture test mirroring `drift-repo` but with worktree/gitlink roles swapped
- [ ] Run `node --test tools/update-adopters.test.mjs`

## 🔗 Related

- [[CORE-EPIC-459]] — parent epic: adopter-bump edge states (Finding #3, High)
- [[CORE-459.2]] — sibling child; detached-HEAD gate added just after the `current === latest` block this task extends

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Finding #3 (High) still matches current code. `checkAdopter` (tools/update-adopters.mjs:412) only checks `gitlinkDrift` when `current === latest` (line 417-420); when the worktree is stale (`current !== latest`) it falls straight through the detached-HEAD/pinned-ahead/migration/staged/dirty gates to `status: 'bump'` (line 473) even when the superproject's committed gitlink already equals the latest tag's SHA. `applyBump` (line 511) then checks out the submodule to `latest` (already true on disk before the run, in this scenario the checkout is a no-op that leaves the index identical to HEAD), `git add`s the gitlink (line 528, no-op — index already matches HEAD), and `git commit -- SUBMODULE_PATH` (line 532) fails with git's "nothing to commit" for that pathspec since there is no staged change relative to HEAD. The catch block (533) calls `rollbackBump` (494), which checks the submodule back out to `priorSha` — the *stale* SHA — actively reverting a worktree that only needed `git submodule update`, not a commit. This is exactly the epic's "rollback un-fixing healthy repos" theme.

- [x] Read relevant source files — read `checkAdopter` (412-474), `gitlinkDrift` (247-262), `applyBump` (511-540), and `rollbackBump` (494-509) in full in tools/update-adopters.mjs; read the `checkAdopter classification (fixtures)` suite (253-358) and the `gitlinkDrift / describePin` suite (373-386) in tools/update-adopters.test.mjs for fixture patterns, plus `makeAdopter` (108-129).

- [x] **Best Practices Review** — the fix extends the same early-classification shape `gitlinkDrift` already uses (compare the committed gitlink SHA against the canonical latest-tag SHA, report-only, no commit). `gitlinkDrift` and the new check both need "recorded gitlink SHA" and "canonical latest-tag SHA" — inlining a second copy of those two `rev-parse` calls would duplicate logic that already exists once; extracting two small private helpers (`recordedGitlinkSha`, `canonicalTagSha`) removes the duplication without introducing a new public surface (`gitlinkDrift`'s existing export signature and return contract are unchanged).

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` has no CORE-459.3 predecessor; this is the first work against Finding #3. Read the sibling `.flowtron/tasknote/archive/core/CORE-459.2.md` (same epic, same file): confirms the epic's Discovery was supplied externally by audit-repo (no `.1` tasknote in this repo) and establishes the precedent for gate placement ("right after the current/drift early return ... before the pinned-ahead guard") and the fixture-test-plus-header-comment-update pattern this task follows.

- [x] **Drift check** — PLAN.md's CORE-459.3 line ("gitlink-current-but-worktree-stale repos classified up front instead of 'nothing to commit' → rollback to the stale SHA") matches the code read above exactly. No SPEC contract conflict — this is the `tools/` fleet-maintenance carve-out already documented in the file's own header comment (per SPEC §"What flowtron does NOT provide"), same carve-out CORE-459.2 relied on.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Assumption: reuse the existing `'drift'` status for this classification rather than introduce a new status string. `reportResult`/`reportSummary` already treat `'drift'` as "report-only mismatch between committed gitlink and worktree, no commit performed, counted separately from current/bump/skip" — that's exactly this case, just the opposite direction of mismatch. The `reason` string is what distinguishes the two directions to the operator; no downstream code branches on the *content* of `reason`, only on `status`, so no consumer needs updating beyond the message text.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Verdict: Proceed, no significant scope deviation → skip 🛠️. Placed the new gate immediately after the existing `current === latest` block (lines 417-421) and before the detached-HEAD guard CORE-459.2 added — this classification needs no attached-HEAD, no clean index, nothing beyond a `rev-parse` comparison, so it belongs at the front of the function, ahead of every commit-path guard. Extracting `recordedGitlinkSha`/`canonicalTagSha` keeps `gitlinkDrift` and the new gate reading the exact same two facts instead of two independently-written `rev-parse` call pairs that could drift from each other.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `gitlinkDrift`/`current` early-return shape (SPEC.md tools/ conventions: same `{status, current, reason}` object shape, same try/catch-around-`rev-parse` idiom already used four times in this file for "can't resolve, treat as null/skip" cases).

- [x] **Minimal refactor gate** — extracted `recordedGitlinkSha(repo)` and `canonicalTagSha(tag)` from `gitlinkDrift`'s body (previously inlined `try { rev-parse HEAD:path } catch { return null }` and `try { rev-parse tag^{commit} } catch { return null }`) so the new reverse-drift gate in `checkAdopter` reuses them instead of duplicating the two lookups. `gitlinkDrift`'s exported signature, return contract (reason string | null), and existing tests are unchanged — this is purely lifting duplicated internals, not a new abstraction layer.

- [x] Implemented the minimal solution — in `checkAdopter`, right after the `current === latest` block: resolve `recordedGitlinkSha(repo)`; if non-null, resolve `canonicalTagSha(latest)`; if both resolve and are equal, return `{status: 'drift', current, reason: '...'}` naming that the committed pin already matches `latest` and the worktree needs `git submodule update` (or `/ft-update`) — no commit needed. Falls through to the existing guard chain unchanged when either lookup is null (mirrors `gitlinkDrift`'s own "can't resolve → treat as no signal" behavior) or the SHAs differ (genuinely a bump case).

- [x] Updated/added tests for non-trivial behavior — added `drift: committed gitlink already at latest, worktree behind (CORE-459.3)` to the `checkAdopter classification (fixtures)` suite, built by pinning the adopter at `latest` (so the committed gitlink is already correct) then checking the submodule worktree back out to `previous` without committing — the mirror image of the existing `drift-repo` fixture.

**Implementation Notes:** tools/update-adopters.mjs: extracted `recordedGitlinkSha`/`canonicalTagSha` (2 small private helpers, ~14 lines), rewrote `gitlinkDrift` to call them (net -4 lines), added the new reverse-drift gate in `checkAdopter` (+13 lines) between the `current === latest` block and the detached-HEAD guard, extended the header comment's "Gitlink-drift detection" paragraph (+4 lines) to name both directions. tools/update-adopters.test.mjs: +9 lines (one `it` block alongside `drift-repo`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 36/36 pass, including the new reverse-drift fixture.

- [x] Ran lint/type-check on changed code — no root-level lint config or package.json covers `tools/`; ran `node --check` on both changed files (syntax OK). N/A beyond that — no linter is configured for this directory (matches CORE-459.2 precedent).

- [x] **Quality assertions** — no duplication: extracting `recordedGitlinkSha`/`canonicalTagSha` *removed* a duplicate pair of `rev-parse` calls the new gate would otherwise have re-inlined; `gitlinkDrift`'s exported signature and return contract are unchanged, so no consumer needed updating. No dead code. No unexplained complexity — the new gate mirrors the existing `current === latest` / `gitlinkDrift` shape exactly. No public-surface growth — the two new helpers are private (unexported); `checkAdopter`'s return shape gains only a new `reason` string on the existing `'drift'` status. Header comment updated so it doesn't go stale.

- [x] (frontend) N/A — no UI surface touched.

**Testing Notes:** `node --test tools/update-adopters.test.mjs` → tests 36, pass 36, fail 0, cancelled 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change. Self-contained fix inside `tools/update-adopters.mjs` + its test file; no CAPABILITIES/AGENT-COMPAT/PLATFORMS/MIGRATION/SPEC surface was touched (same verdict as sibling CORE-459.2).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-459` parent; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted (below).

**Final Summary:** Added a reverse gitlink-drift guard to `checkAdopter` in `tools/update-adopters.mjs`, closing Finding #3 (High): a repo whose superproject already had the correct `.flowtron/core` gitlink committed, but whose checked-out submodule worktree was behind, was previously misclassified as an ordinary `bump`. `applyBump` would then check the worktree out to `latest` (already a no-op there), stage a gitlink identical to HEAD, and fail to commit it ("nothing to commit"); the resulting `rollbackBump` reset the worktree back to the stale SHA — actively un-fixing a repo that only needed `git submodule update`. Extracted `recordedGitlinkSha`/`canonicalTagSha` from `gitlinkDrift`'s previously-inlined logic so the new gate reuses the same lookups instead of duplicating them; `gitlinkDrift`'s exported signature and behavior are unchanged. The new gate sits right after the existing `current === latest` early return and before the detached-HEAD guard, returning `{status: 'drift', reason: '...run git submodule update...nothing to commit'}` up front, before any bump-path work (checkout, staging, commit attempt) runs. Added one fixture test (`drift: committed gitlink already at latest, worktree behind (CORE-459.3)`), the mirror image of the existing `drift-repo` fixture. Updated the header comment's "Gitlink-drift detection" note to describe both directions. Full suite: 36/36 pass, no regressions. No public-surface growth, no doc drift.

**Archived:** 2026-08-21
