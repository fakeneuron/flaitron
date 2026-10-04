---
title: applyBump rollback
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-419, CORE-419.2, CORE-366, CORE-360]
---

# CORE-419.3 | applyBump rollback

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-419]] · [[CORE-419.2]] · [[CORE-366]] · [[CORE-360]]

## 🎯 Goal

Make `applyBump` atomic from the adopter's point of view: capture the submodule's prior SHA before checkout and, on any later failure, restore the submodule worktree and unstage the gitlink instead of leaving the repo half-updated.

## ✅ Acceptance

- [x] `applyBump` captures the submodule's pre-checkout `HEAD` SHA before mutating anything
- [x] Any failure after the checkout (SPEC.md version verify, SHA verify, `git add`, `git commit`) restores the submodule to the prior SHA and, when the gitlink was already staged, unstages it
- [x] The original failure is still thrown (the reporter's `✗ … bump failed — <msg>` line is preserved); a rollback that itself fails is surfaced in that message rather than swallowed
- [x] Failure-injection tests in `tools/update-adopters.test.mjs` cover both a pre-`add` failure (verify) and a post-`add` failure (commit), asserting prior SHA restored / gitlink unstaged / no bump commit
- [x] The script's header comment documents the rollback guarantee
- [x] Full `node --test tools/update-adopters.test.mjs` suite passes — 28/28

## 🧩 Subtasks

- [x] Capture `priorSha` in `applyBump` before `git checkout`; wrap the mutating sequence in try/catch
- [x] Add a `rollbackBump` helper that restores the submodule checkout and conditionally unstages the gitlink, returning a note when rollback is incomplete
- [x] Extend the header comment with a "Mid-bump rollback" block
- [x] Add the two failure-injection fixtures
- [x] Run the full suite + `node --check`

## 🔗 Related

- [[CORE-EPIC-419]] — parent epic: fleet-updater-safety
- [[CORE-419.2]] — sibling: pinned-ahead downgrade guard in `checkAdopter`
- [[CORE-366]] — added `verifyPinnedSha`, the failure point this rollback most directly covers
- [[CORE-360]] — built the fixture harness (`makeAdopter`, shared mirror clone) these tests extend

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real in current code — `applyBump` (`tools/update-adopters.mjs:402-418`) performs five mutating/verifying steps in sequence with no recovery. `git checkout --quiet <latest>` (`:406`) moves the submodule worktree; the two verifies (`:407-413`) and the `git add` (`:414`) / `git commit` (`:417`) that follow can all throw. `reportResult` (`:441-444`) catches, counts `failed`, and moves to the next adopter — leaving that repo's submodule checked out at the new tag with (past `:414`) the gitlink staged, and no commit. The operator's next `git status` in that repo shows work they did not do.

- [x] Read relevant source files — `tools/update-adopters.mjs` (519 lines, read in full), `tools/update-adopters.test.mjs` (429 lines, read in full). Narrow, known read set; no probe needed.

- [x] **Best Practices Review** — the module is fully decomposed into small single-purpose exported functions (post-CORE-364). `applyBump` is the single correct touch point: it owns the whole mutating sequence, and nothing else in the module mutates an adopter repo. Responsibilities touched: (a) the bump sequence itself, (b) the new recovery path. Those are distinct enough that inlining recovery into `applyBump`'s catch would blur it — extract a `rollbackBump` helper in the module's established shape (top-level, exported, explicit args, no shared closure state), exactly as CORE-366 did for `verifyPinnedSha`. No dependency-direction change, no nearby duplication, nothing deferred.

- [x] **Archive skim** — `grep -l applyBump archive/core/*.md` → four hits plus this epic's sibling:
  - **CORE-360** — built the test harness (`makeAdopter`, shared local mirror clone, `--root` temp workspaces, "never touches ~/code"). The failure-injection fixtures extend this harness rather than inventing a second one.
  - **CORE-366** — added `verifyPinnedSha` and the staged-diff `e.code === 1` branch. Load-bearing: it extracted the pure comparison specifically because a genuinely divergent SHA is not reachable from a natural clone; the failure-injection fixture here has to *forge* one. It also established that verifies happen "before `git add`/commit" — which is precisely why one of the two failure classes is pre-`add` and the other post-`add`.
  - **CORE-364** — `main()` decomposition into `reportResult`/`reportSummary`. Load-bearing: `reportResult`'s apply branch already wraps `applyBump` in try/catch → `counts.failed` + `✗ … bump failed — <msg>`. Rollback must therefore preserve the thrown error, not swallow it, or that reporting line goes silent.
  - **CORE-351.3** — added `gitlinkDrift`/`describePin`; recorded the tool's posture: zero-dep Node ESM, conservative, "never auto-mutating beyond the documented apply path". A rollback *narrows* the mutation footprint, so it sits inside that posture.
  - **CORE-419.2** (sibling, same epic) — established the current fixture idiom (self-healing `latest`/`previous` tag pair) and the guard-efficacy discipline: prove the new test fails against the pre-fix file.

- [x] **Drift check** — code half: every path the PLAN line cites matches current code. `applyBump` at `:402`; `git checkout --quiet latest` at `:406`; the SPEC.md version verify (`throw`) at `:407-410`; `verifyPinnedSha` at `:413`; `git add SUBMODULE_PATH` at `:414`; the pathspec commit at `:417`. There is no `try`/`catch` anywhere inside `applyBump` — the "half-updated" claim is exact, not approximate. Contract half: PLAN.md line re-read (`.flowtron/PLAN.md:16`); `SPEC.md` §"What flowtron does NOT provide" carves the tool out as "dry-run by default, local commits only, never pushes" — making a failed apply leave no trace is inside that carve-out, not a widening of it. `.flowtron/tasknote/README.md` §"Project quick commands" names the suite as a release gate (`node --test tools/update-adopters.test.mjs`), so the new fixtures land in a gated suite. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:

  1. **Rollback restores, it does not repair.** Scope is "return the repo to its pre-`applyBump` state", nothing more — no retry, no fetch undo (`git fetch --tags` only adds refs; it mutates no worktree and no index, so it is deliberately outside the rollback set).
  2. **`priorSha` is captured after the fetch, immediately before the checkout** — matching the PLAN line's wording ("before checkout"). The fetch cannot move `HEAD`, so the two capture points are equivalent; the later one keeps the capture adjacent to the mutation it guards.
  3. **Unstaging is conditional on having staged.** A failure before `git add` must not run `git reset` — `checkAdopter` verified the index was clean, but issuing a reset that was never needed is a mutation the tool has no business making. Tracked with an explicit `staged` flag rather than inferred.
  4. **`git reset --quiet -- <path>` is the unstage verb** (index entry back to `HEAD`), not `git restore --staged` — `reset` is the form already portable across the Node ≥20 / git versions this zero-dep script targets, and `checkAdopter`'s staged-clean precondition means resetting this one pathspec restores exactly the prior index.
  5. **The original error still propagates.** `reportResult` renders `e.message`; swallowing or replacing it would silently degrade CORE-364's reporting. A rollback that *itself* fails is appended to that message — a half-state the operator is not told about is the worst outcome of all, worse than the original failure.
  6. **Failure injection is fixture-side, not seam-side.** No new env var or injection hook in the production module; the two fixtures forge real git conditions (a re-tagged non-canonical commit; a failing `pre-commit` hook) so the test exercises the real code path unmodified.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Baseline before any edit: `node --test tools/update-adopters.test.mjs` → **26 pass / 0 fail**.

**The failure window, precisely.** Three distinct half-states are reachable today:

| Failure point | Submodule worktree | Superproject index | Committed pin |
|---|---|---|---|
| SPEC.md version verify (`:408`) | at `latest` ❌ | clean | old |
| `verifyPinnedSha` (`:413`) | at `latest` ❌ | clean | old |
| `git add` (`:414`) | at `latest` ❌ | clean-ish | old |
| `git commit` (`:417`) | at `latest` ❌ | gitlink staged ❌ | old |

Only the last row needs an unstage; all four need the checkout restored. That asymmetry is why `staged` is a flag rather than an unconditional reset.

**Why this is worth fixing rather than accepting.** The tool's whole posture is that a skipped or failed repo is *untouched* — that is what makes `--apply` across a 20-repo fleet safe to run unattended. Today a mid-bump failure quietly breaks that promise on exactly the repo the operator was told to look at, and the `✗ … bump failed` line gives no hint that the working tree was left modified. Worse, the residue is self-concealing: the submodule worktree now reads the *new* version, so a re-run classifies the repo as `current` (or `drift`) rather than `bump`, and the failure never surfaces again.

**Test-injection mechanics** (the non-obvious part):

- *Pre-`add` failure* — a natural clone of the same tag always resolves to the same SHA (CORE-366's finding), so divergence must be forged: check out `latest` in the fixture submodule, `commit --amend --allow-empty --no-edit` to mint a content-identical commit with a new SHA, force-move the local `latest` tag onto it, then return to the prior pin. `applyBump`'s opening `git fetch --tags` does **not** clobber an existing local tag (no `--force`), so the forgery survives. Post-checkout SPEC.md still reads `latest` → the version check passes → `verifyPinnedSha` is the thing that throws, which is the intended target.
- *Post-`add` failure* — a `.git/hooks/pre-commit` that exits 1 (mode 0o755). `git add` succeeds, `git commit` fails, and rollback must do both halves.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `rollbackBump` is written in the module's established shape: a top-level exported single-purpose function taking explicit args with no shared closure state, exactly the convention CORE-364 extended (`reportResult`/`reportSummary`) and CORE-366 extended (`verifyPinnedSha`). The header-comment block documenting the guarantee mirrors CORE-351.3's "Gitlink-drift detection" block — the file's existing idiom for explaining a non-obvious safety behavior. No new pattern invented; no reporting change needed, since `reportResult`'s existing `✗ … bump failed — <msg>` branch renders the (still-propagated) error unchanged.

- [x] **Minimal refactor gate** — one structural change: `applyBump`'s mutating sequence moved inside a `try` block (pure indentation, no reordering) so the failure window has a single catch. Recovery was extracted to `rollbackBump` rather than inlined, because "undo the mutations" is a distinct responsibility from "perform the bump" and inlining it would have doubled the catch block's size with error-handling-within-error-handling. Nothing adjacent touched; nothing deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`tools/update-adopters.mjs`** (+58 / −11), three hunks:

1. **Header comment** — new "Mid-bump rollback" block, in the style of the existing "Gitlink-drift detection" block. It names the half-state, the self-concealing property (a failed bump leaves the worktree reading the *new* version, so a re-run reclassifies the repo as `current`/`drift` and the failure never resurfaces), and the error-propagation contract.
2. **`rollbackBump(repo, sub, priorSha, staged)`** — new exported helper. Restores the submodule checkout; unstages the gitlink via `git reset --quiet -- <path>` only when `staged`. Best-effort by construction: each half has its own `try`/`catch` and pushes to a `residue` list rather than throwing, because the caller is already unwinding a failure and a throw here would destroy the original error. Returns `null` when fully restored, else a note naming what could not be undone.
3. **`applyBump`** — captures `priorSha` immediately after the fetch and before the checkout, tracks a `staged` flag flipped right after `git add`, and wraps checkout→verify→verify→add→commit in a `try`. The catch calls `rollbackBump`, appends any residue to `e.message`, and rethrows the original error so `reportResult`'s `✗` line is unchanged in the normal (fully-restored) case.

The `staged` flag is deliberate rather than inferred: a failure before `git add` must not issue a `git reset` the tool had no cause to run.

**`tools/update-adopters.test.mjs`** (+63): one new `describe` block, two fixtures on the CORE-360 harness.

The verify-failure fixture needed a real forgery, and the obvious way to build it does not work. Force-moving the local `latest` tag inside the adopter's own submodule makes `applyBump`'s opening `git fetch --tags` exit 1 ("would clobber existing tag") — which aborts *before* the checkout, so the test would pass while proving nothing. Verified empirically before choosing the alternative: clone a **separate forged origin**, amend `latest` there to mint a content-identical commit with a new SHA, delete the adopter submodule's local tag, and re-point its `origin` at the forge. Fetch then succeeds, SPEC.md still reads `latest`, and `verifyPinnedSha` is the thing that throws — the intended target. The rationale is recorded in a comment at the fixture, since the naive approach is the one a future reader will reach for first.

The commit-failure fixture uses a `pre-commit` hook that exits 1, with `core.hooksPath` pinned explicitly so a global `core.hooksPath` on the host cannot silently disarm the injection.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **28 pass / 0 fail** (baseline before the change: 26/0).

- [x] Ran lint/type-check on changed code — `node --check` clean on both files. No repo-root ESLint config exists and `viz/package.json`'s `lint` script scopes to `viz/src`, so `node --check` is the applicable static check for `tools/` (zero-dep plain Node by design). Matches `.flowtron/tasknote/README.md` §"Project quick commands".

- [x] **Quality assertions** — no avoidable duplication (the two rollback halves are different git verbs against different repos; `rollbackBump` is the module's only unstage/restore site). No dead code — both branches are covered by a fixture, and the `residue` path is reachable (a rollback failure on a corrupted repo). Public surface grows by exactly one export, `rollbackBump`, matching the module's convention of exporting every top-level helper for testability. No unexplained complexity: the `staged` flag and the fetch-outside-the-window choice each carry a one-line comment naming the reason. The code-facing documentation that would otherwise go stale — the script header, which is the tool's own contract summary — was updated in the same diff.

- [x] (frontend) N/A — no frontend surface; the change is a Node CLI tool and its test suite.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Guard-efficacy check (the assertion that matters).** A passing test proves nothing until it fails without the fix. Stashed `tools/update-adopters.mjs` back to `HEAD` (test file untouched) and re-ran the two new fixtures against the pre-fix module:

```text
✖ restores the prior submodule SHA when a post-checkout verify fails
    actual: '81abf386bec6b8da59574149f7befb3d451427e7'
    expected: '5740bf5d19fcd546288753e0e8245a56ed2ff522'
✖ unstages the gitlink and restores the submodule when the commit fails
    actual: '2db2effcd9b019b83baabcb68b3fef2b0fc634b6'
    expected: '5740bf5d19fcd546288753e0e8245a56ed2ff522'
```

Both `actual` values are the *forged/new* commit — the half-state itself, reproduced: the pre-fix tool leaves the submodule checked out at the tag it failed to land. Fix restored and byte-verified against a pre-stash copy (`diff -q` clean) before proceeding.

**Clobber pre-check.** The fixture design rested on a claim about git's behavior, so it was measured rather than assumed: force-moving a diverged local tag and running `git fetch --tags --quiet origin` exits **1**, not 0. Had the fixture been built the naive way, `applyBump` would have aborted at the fetch — before any mutation — and the rollback assertions would have passed vacuously. The forged-origin design (verified: fetch exit 0, checkout lands on the non-canonical SHA, SPEC.md reads `latest`) is the direct consequence.

**Live dry-run smoke** (read-only, default mode) across the real `~/code` fleet: `1 current · 0 drift · would bump 0 · 19 skipped · 0 failed` — byte-identical to the sibling task's baseline. `applyBump` is not reached in dry-run, so this confirms no regression in the surrounding module rather than exercising the new path; the fixtures own that.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change.

  Five of the fourteen mention the tool (`README.md:262`, `SPEC.md:58` + `:890`, `docs/MIGRATION.md:208` + `:483`, `docs/CONVENTIONS.md:90`). Each was re-read: all describe it at carve-out or release-gate level (dry-run default, local commits only, skips migration-bearing ranges, the `node --test` suite is a release gate) without describing `applyBump`'s failure handling. None is falsified by adding rollback; `docs/CONVENTIONS.md:90` and `docs/MIGRATION.md:208` name the suite as a gate, which the two new fixtures join rather than change. The documentation that *is* exhaustive about the tool's safety behavior lives in the script header and was updated in Phase 2. `SECURITY.md` was checked directly for submodule-bump / fleet claims — none present.

- [x] Closed

- [x] **Evidence-based recap** drafted

**Final Summary:**

`tools/update-adopters.mjs` could leave an adopter repo half-updated. `applyBump` checked out the new tag in the submodule and staged the gitlink *before* committing, with no recovery on any of the four failure points that follow the checkout — so a failed bump left that repo's submodule sitting on a tag it never committed, sometimes with the gitlink staged, while the fleet run moved on to the next repo. This makes the operation atomic from the adopter's point of view: capture the prior SHA, and on any later failure put the repo back exactly as it was.

- **Changed:** `tools/update-adopters.mjs` (+58/−11: header "Mid-bump rollback" block, new exported `rollbackBump`, `applyBump` restructured around a try/catch with a `priorSha` capture and a `staged` flag), `tools/update-adopters.test.mjs` (+63: two failure-injection fixtures).
- **Verification:** `node --test tools/update-adopters.test.mjs` **28/28** (baseline 26/26); `node --check` clean on both files; live dry-run across `~/code` unchanged at `1 current · 0 drift · 0 bump · 19 skipped · 0 failed`. Both new fixtures were confirmed to fail against the pre-fix module, each reporting the submodule left on the *new* commit — the half-state reproduced before being fixed.
- **Refactors:** one, and minimal — `applyBump`'s mutating sequence moved inside a `try` (indentation only, no reordering), with recovery extracted to `rollbackBump` rather than inlined so the catch block does not become error-handling-within-error-handling. Nothing else touched, nothing deferred.
- **Documentation:** doc-drift sweep clean across all 14 AI-referenced docs; the script header, which is the tool's own exhaustive contract summary, was updated in the same diff.
- **Maintainability:** the fleet updater's failure mode is now *no trace* rather than *silent residue* — and the residue mattered more than it looks, because it was self-concealing: the submodule worktree read the new version after a failed bump, so a re-run classified the repo as `current`/`drift` instead of `bump` and the failure never surfaced again. A rollback that itself fails is now named in the reported error rather than passing silently. The two fixtures also add the module's first coverage of `applyBump`'s failure paths, which had none.

**Archived:** 2026-08-08
