---
title: pinned-ahead guard
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-419, CORE-351.3, CORE-366]
---

# CORE-419.2 | pinned-ahead guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-419]] · [[CORE-351.3]] · [[CORE-366]]

## 🎯 Goal

Make `checkAdopter` bail with a `skip` status when an adopter's pinned flowtron version is *newer* than the latest release tag, so `--apply` can never silently downgrade it.

## ✅ Acceptance

- [x] `checkAdopter` returns `{ status: 'skip', current, reason }` when the adopter's pinned version parses newer than `latest`, before the migration gate runs
- [x] The skip reason names the downgrade risk and points at the likely cause (stale tag list in the flowtron checkout)
- [x] A pinned-ahead fixture in `tools/update-adopters.test.mjs` asserts the new skip (status + reason), portable and self-healing like the existing fixture pair
- [x] The script's header safety-gate list names the new gate
- [x] Full `node --test tools/update-adopters.test.mjs` suite passes — 26/26

## 🧩 Subtasks

- [x] Add the semver-comparison guard to `checkAdopter` between the `current === latest` branch and `tagsInRange`
- [x] Extend the header comment's "Per-adopter safety gates" list
- [x] Add the pinned-ahead fixture test
- [x] Run the full suite

## 🔗 Related

- [[CORE-EPIC-419]] — parent epic: fleet-updater-safety
- [[CORE-351.3]] — added the `drift` status; established the status-object shape this guard extends
- [[CORE-366]] — prior `checkAdopter` / `applyBump` hardening (staged-diff exit-code branch, SHA verification)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real in current code — `checkAdopter` (`tools/update-adopters.mjs:346`) computes `tagsInRange(current, latest)`, which returns `[]` for a pinned-ahead adopter, so `migrationBearingTags([])` is `[]` and the gate passes vacuously; the function then returns `{status:'bump'}` and `applyBump` checks out the *older* `latest`.

- [x] Read relevant source files — `tools/update-adopters.mjs` (502 lines, read in full), `tools/update-adopters.test.mjs` (416 lines, read in full). Narrow read set; no probe needed.

- [x] **Best Practices Review** — the module is already fully decomposed into single-purpose exported functions (post-CORE-364). `checkAdopter` is the single correct touch point: it owns every per-adopter gate and returns the status object the reporter switches on. `parseSemverTag` + `compareSemver` already exist and are exported — the guard composes them rather than adding a new comparison helper. No module-boundary change, no refactor required, nothing deferred.

- [x] **Archive skim** — `grep -l "checkAdopter\|pinned ahead\|downgrade" archive/core/*.md` → CORE-351.3 (added the `drift` status by gating the `current === latest` early-return; established that new gates return `{status, current, reason}` and stay report-only), CORE-366 (staged-diff `e.code === 1` branch + `verifyPinnedSha`; explicitly noted no prior task touched the range/migration path), CORE-364 (`main()` decomposition into `reportResult`/`reportSummary` — the reporter already renders any `skip` uniformly, so no reporting change is needed), CORE-360 (built the fixture matrix this task extends). CORE-400 flagged a 6-failure suite as pre-existing; **that is no longer true** — the baseline run below is 25/25 green (TEST-003's self-healing fixture pair fixed it). Nothing in the archive contradicts this task.

- [x] **Drift check** — code half: `checkAdopter` at `:335`, the `current === latest` early-return at `:341`, `tagsInRange(current, latest)` at `:346`, the migration gate at `:347-354`, `applyBump` at `:386`. `tagsInRange` (`:207-219`) filters `compareSemver(v, from) > 0 && compareSemver(v, to) <= 0` — for `from > to` that set is empty, confirming the PLAN line's root-cause claim exactly. Contract half: PLAN.md line re-read (`.flowtron/PLAN.md:15`); SPEC.md §"What flowtron does NOT provide" describes the tool as "moves each adopter's pinned submodule to the **latest non-breaking release** (dry-run by default, local commits only)" — a downgrade guard is squarely inside that contract, not a widening of it. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) "skip status" means the existing `status: 'skip'` shape, not a new status — the reporter's `⏭` branch already renders it and the summary already counts it, so no `reportResult`/`reportSummary` change; (2) the guard sits *before* the migration gate, since a pinned-ahead adopter should be reported as such rather than being classified by an empty range; (3) the fixture simulates pinned-ahead by calling `checkAdopter(adopter, previous)` on an adopter pinned at `latest` — this reuses the self-healing tag pair instead of hardcoding a tag or depending on a newer tag existing outside the pair; (4) the guard is defensive about unparseable versions (falls through to existing behavior), even though `pinnedVersion`'s regex already guarantees a parseable `vX.Y.Z`.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Baseline before any edit: `node --test tools/update-adopters.test.mjs` → 25 pass / 0 fail.

Why this is worth a guard rather than an accepted edge: the pinned-ahead state is not exotic. It is exactly what a stale tag list in the operator's flowtron checkout produces — bump the fleet, then run the tool again from a checkout that hasn't fetched the new tag, and every adopter you just bumped is now "behind" a `latest` that is older than they are. `--apply` would walk the fleet back a release and commit it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the guard is a fourth `checkAdopter` gate written in the exact shape of the three that precede it: an early `return { status: 'skip', current, reason }` with a one-line operator-actionable reason. It composes the already-exported `parseSemverTag` + `compareSemver` rather than adding a comparison helper, and needs no `reportResult`/`reportSummary` change because the `⏭` branch and `skipped` counter already render every `skip` uniformly (CORE-364's decomposition). No new pattern invented.

- [x] **Minimal refactor gate** — no refactor. The change is a 12-line insertion plus a 3-line header-comment bullet; nothing adjacent was touched and nothing was deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`tools/update-adopters.mjs`** (+15 lines, two hunks):

1. Header comment's "Per-adopter safety gates" list gains the pinned-ahead bullet — the list is the tool's own contract summary, and a gate absent from it is stale code-facing documentation.
2. `checkAdopter`: the guard sits between the `current === latest` early-return and `tagsInRange`, so a pinned-ahead adopter is *classified as such* rather than being handed to a gate that can only reason about a range that does not exist. Both versions are parsed defensively (`currentVersion && latestVersion`); an unparseable version falls through to prior behavior, which `pinnedVersion`'s regex should already make unreachable.

The reason string names the likely cause and the fix — `run git fetch --tags in <FLOWTRON_REPO> and re-run` — because a genuinely-ahead adopter is far rarer than a stale tag list in the operator's checkout.

**`tools/update-adopters.test.mjs`** (+13 lines): one fixture in the `checkAdopter classification` block. It pins an adopter at `latest` and calls `checkAdopter(adopter, previous)` — reusing TEST-003's self-healing tag pair instead of hardcoding a tag or assuming one exists above the pair, so the fixture cannot rot as releases accumulate the way the pre-TEST-003 fixtures did.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **26 pass / 0 fail** (baseline before the change was 25/0).

- [x] Ran lint/type-check on changed code — `node --check` clean on both files. No repo-root ESLint config exists; `viz/package.json`'s `lint` script scopes to `viz/src`, so `node --check` is the applicable static check for `tools/` (zero-dep plain Node by design).

- [x] **Quality assertions** — no duplication (the guard composes two existing exported helpers rather than restating semver comparison), no dead code, no new public surface (the guard is internal to an already-exported function; no new export), no unexplained complexity (12 lines with a comment naming the failure mode), and the code-facing doc that would otherwise go stale — the header's safety-gate list — was updated in the same diff.

- [x] (frontend) N/A — no frontend surface; the change is a Node CLI tool and its test.

**Testing Notes:**

**Guard-efficacy check (the assertion that matters).** A passing test proves nothing on its own — it has to fail without the fix. Stashed `tools/update-adopters.mjs` and re-ran the new fixture against the pre-guard file:

```text
✖ skip: pin newer than latest must not downgrade (CORE-419.2)
    actual: 'bump', expected: 'skip'
```

`actual: 'bump'` is the bug itself, reproduced: the pre-guard tool classifies a pinned-ahead adopter as bumpable, which under `--apply` is the silent downgrade. Guard restored and byte-verified against a pre-stash copy (`diff -q` clean) before proceeding.

**Live dry-run smoke** (read-only, default mode) across the real `~/code` fleet: 1 current · 0 drift · would bump 0 · 19 skipped · 0 failed — every skip attributed to the v5.15.0 migration gate, none to the new guard. No adopter is pinned ahead today, which is the expected result and confirms the guard adds no false positives to current fleet state.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change.

  Four of the fourteen mention the tool (`README.md:262`, `SPEC.md:58` + `:890`, `docs/MIGRATION.md:483`, `docs/CONVENTIONS.md:90`). Each was re-read: all describe the tool at carve-out level (dry-run default, local commits, skips migration-bearing ranges) without enumerating its gate list, so none is falsified by a fourth gate. `docs/MIGRATION.md:483`'s "skips any repo whose release range carries real migration steps" is illustrative, not exhaustive — still accurate. The gate list that *is* exhaustive lives in the script header and was updated in Phase 2.

- [x] Closed

- [x] **Evidence-based recap** drafted

**Final Summary:**

`tools/update-adopters.mjs` could silently downgrade the entire adopter fleet. When an adopter's pin was *newer* than the latest tag the flowtron checkout knew about, `tagsInRange` returned an empty list, the migration gate passed vacuously over it, and `checkAdopter` returned `bump` — so `--apply` would check out the older tag and commit it in every affected repo. This adds the guard that catches that case and reports it as a skip instead.

- **Changed:** `tools/update-adopters.mjs` (+15: pinned-ahead guard in `checkAdopter`, plus the header safety-gate bullet), `tools/update-adopters.test.mjs` (+13: one fixture).
- **Verification:** `node --test tools/update-adopters.test.mjs` 26/26 (baseline 25/25); `node --check` clean on both files; live dry-run across `~/code` unchanged (1 current · 19 migration-gate skips · 0 pinned-ahead false positives). The new fixture was confirmed to fail against the pre-guard file with `actual: 'bump'` — the bug reproduced before being fixed.
- **Refactors:** none made, none deferred. The guard composes existing exported helpers and needed no reporting change, since CORE-364's decomposition already renders every `skip` uniformly.
- **Documentation:** doc-drift sweep clean across all 14 AI-referenced docs; the exhaustive gate list in the script header was updated in the same diff.
- **Maintainability:** the fleet updater's one destructive verb — `--apply` — now refuses the one input shape that made it destructive in the wrong direction. The fixture reuses TEST-003's self-healing tag pair, so it cannot silently convert into a no-op as releases accumulate.

**Archived:** 2026-08-08
