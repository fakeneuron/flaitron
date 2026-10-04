---
title: updater-hardening
status: completed
tags: [tooling]
created: 2026-07-26
due:
related-tasks: []
---

# CORE-366 | updater-hardening

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Harden `tools/update-adopters.mjs`'s `applyBump` SHA verification and staged-diff error handling, and pin its `**Version:**` regex to `viz/src/workspace.ts`'s copy with a contract test.

## ✅ Acceptance

- [ ] `applyBump` verifies the checked-out submodule commit SHA equals the canonical `FLOWTRON_REPO` tag SHA (not just the `SPEC.md` version string) before committing the gitlink bump
- [ ] The staged-diff gate in `checkAdopter` branches on `e.code === 1` (real staged changes → skip) vs any other error code (rethrow — don't mask a genuine git failure as "staged changes")
- [ ] A contract test asserts the `**Version:**` regex in `tools/update-adopters.mjs` (`pinnedVersion`) and `viz/src/workspace.ts` (`readFlowtronVersion`) stay byte-identical
- [ ] Existing `tools/update-adopters.test.mjs` suite (21 tests) still passes

## 🧩 Subtasks

- [ ] `applyBump`: resolve `latest^{commit}` SHA in `FLOWTRON_REPO`, compare to submodule's checked-out `HEAD` SHA, throw descriptively on mismatch before `git add`/commit
- [ ] `checkAdopter`: branch the staged-diff `try/catch` on `e.code === 1` (skip, existing message) vs rethrow otherwise
- [ ] Add a contract test in `tools/update-adopters.test.mjs` pinning the `**Version:**` regex source identical between `update-adopters.mjs` and `viz/src/workspace.ts`
- [ ] Add/extend unit tests: SHA-mismatch failure path for `applyBump`, non-1-code rethrow for `checkAdopter`
- [ ] Run `tools/update-adopters.test.mjs` full suite; confirm all pass

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Three independent, small hardening items surfaced by the 2026-07-26 audit (Findings #2, #5, #10, all Low). No scope deviation — each maps 1:1 to a concrete code location already read.

- [x] Read relevant source files

- [x] **Best Practices Review** — `tools/update-adopters.mjs` is fully decomposed into single-purpose exported functions (post-CORE-364). `applyBump` and `checkAdopter` are the correct touch points — no module-boundary change needed. The regex-parity item is test-only (no production code change): extracting both files' regex source text via string match keeps the two modules independent (no new shared-import coupling between the Node CLI tool and the Vite/TS viz app, which are deliberately separate build targets).

- [x] **Archive skim** — `grep -l update-adopters archive/core/*.md` → CORE-364 (2026-07-25, `main()` decomposition — extracted `reportResult`/`reportSummary`, doesn't touch `applyBump`/`checkAdopter`), CORE-360/361 (wiring-surface + gitlink-drift logic), CORE-324.4/5, CORE-351.* (adjacent CLI features). Nothing touches `applyBump`'s SHA verification or the staged-diff `try/catch` — this is genuinely new hardening, not a re-do.

- [x] **Drift check** — PLAN.md cites `applyBump`, the staged-diff gate's `e.code === 1`, and the `**Version:**` regex parity between `tools/update-adopters.mjs` and `viz/src/workspace.ts`. Confirmed against current code: `applyBump` (update-adopters.mjs:363–376) checks out `latest` and verifies only the `SPEC.md` version string via `pinnedVersion`, never the SHA. `checkAdopter`'s staged-diff check (update-adopters.mjs:348–352) catches unconditionally with no `e.code` branch. Both regexes (`pinnedVersion` in update-adopters.mjs:149, `readFlowtronVersion` in workspace.ts:41) are `/^\*\*Version:\*\*\s*(v?\d+\.\d+\.\d+)/m` — byte-identical today, but nothing pins them together. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) "canonical FLOWTRON_REPO tag" means resolving `latest^{commit}` in `FLOWTRON_REPO` (same pattern `gitlinkDrift` already uses) and comparing it to the submodule's checked-out `HEAD` SHA post-checkout; (2) the staged-diff gate's non-1 codes should rethrow the original error (not swallow) so `checkAdopter`'s caller (`main`'s try/catch around `checkAdopter`) reports it as a check failure rather than mislabeling it "staged changes"; (3) the contract test compares regex *source text* extracted from both files (no export changes to `readFlowtronVersion`, which stays private/untested-directly in workspace.ts — matches existing convention of not exporting it).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `applyBump` (tools/update-adopters.mjs:363-376): after `git checkout <latest>` in the submodule, it only re-reads `SPEC.md`'s version string via `pinnedVersion`. A tag pointing at the wrong commit that happens to carry a matching `**Version:**` line (or a corrupted/re-tagged ref) would pass this check silently. Fix: resolve `latest^{commit}` in `FLOWTRON_REPO` (mirrors `gitlinkDrift`'s existing pattern at line 185) and compare against `git rev-parse HEAD` in the submodule post-checkout; throw descriptively on mismatch, before `git add`/`commit`.
- `checkAdopter`'s staged-diff gate (tools/update-adopters.mjs:348-352): `git diff --cached --quiet` exits 1 when there ARE staged changes (the expected/common case) but can also fail for other reasons (e.g. not a git repo, corrupted index) with a different exit code. The current bare `catch` conflates both into "staged changes in index" — actively misleading for a real failure. Fix: branch on `e.code === 1` → skip with existing message; else rethrow.
- Regex parity (update-adopters.mjs:149 `pinnedVersion`, workspace.ts:41 `readFlowtronVersion`): both already carry a comment noting they mirror each other ("Same Version-line contract viz/src/workspace.ts reads" / "Matches..."), but nothing enforces it — a future edit to one could silently diverge. Contract test lives in `tools/update-adopters.test.mjs` (node:test, already has `readFile` available via the module's own imports) reading both files' raw source and asserting the extracted regex literal strings are identical.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the file already factors logic into small single-purpose exported helpers (`parseSemverTag`, `compareSemver`, `formatSkillsNote`, `describePin`, `gitlinkDrift`, …). Extended that shape with `verifyPinnedSha` rather than inlining the comparison in `applyBump`.

- [x] **Minimal refactor gate** — extracted `verifyPinnedSha(checkedOutSha, canonicalSha, latest)` as a pure exported function so the mismatch branch is directly unit-testable without needing to fabricate a real divergent-SHA git fixture (natural git clones of the same tag always resolve to the same commit, so the failure path is otherwise untestable in-process). This is the smallest change that keeps both Acceptance's testability requirement and the module's existing small-helper convention. No other refactor.

- [x] Implemented the minimal solution

  - `tools/update-adopters.mjs`: `applyBump` now resolves the submodule's post-checkout `HEAD` SHA and the canonical `${latest}^{commit}` SHA in `FLOWTRON_REPO` (same resolution `gitlinkDrift` already does), and calls the new exported `verifyPinnedSha` to throw before `git add`/commit on mismatch.
  - `tools/update-adopters.mjs`: `checkAdopter`'s staged-diff `try/catch` now inspects `e.code` — `1` (real staged changes) still returns the existing skip; anything else rethrows.

- [x] Updated/added tests for non-trivial behavior

  - `tools/update-adopters.test.mjs`: `verifyPinnedSha` unit tests (match passes through, mismatch throws with the expected message).
  - `tools/update-adopters.test.mjs`: new `Version regex parity (CORE-366)` describe block — reads both `tools/update-adopters.mjs` and `viz/src/workspace.ts` source text and asserts both contain the exact pinned regex literal `String.raw\`/^\*\*Version:\*\*\s*(v?\d+\.\d+\.\d+)/m\``.
  - `tools/update-adopters.test.mjs`: new `checkAdopter classification` case — deletes the adopter repo's own `.git` (not the submodule's) so `git diff --cached --quiet` fails outside the exit-1 case (git falls back to `--no-index` usage-error mode, exit 129); asserts `checkAdopter` rejects with `e.code !== 1` rather than returning the `skip`/"staged changes" result.

**Implementation Notes:**

`viz/src/workspace.ts` itself was not modified — the regex-parity fix is a test-only contract (Acceptance only requires pinning, not touching a file that already reads correctly).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 24/24 pass (was 21; +3 new: `verifyPinnedSha`, regex parity, staged-diff rethrow)

- [x] Ran lint/type-check on changed code — no lint config for `tools/`; `node --check` on both `.mjs` files passes. `viz/src/workspace.ts` untouched (read-only for the contract test), no typecheck needed.

- [x] **Quality assertions** — no duplication introduced (`verifyPinnedSha` reuses the SHA-resolution pattern already established by `gitlinkDrift`, doesn't duplicate its code); no dead code; the new `try/catch` branch adds one conditional, not unexplained complexity; `verifyPinnedSha` is new public surface but matches the file's existing convention of small exported pure helpers and exists specifically to make the mismatch path testable; no code-facing docs went stale (the existing `pinnedVersion`/`readFlowtronVersion` comments already cross-reference each other and remain accurate).

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A, CLI tool with no UI surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

`node --test tools/update-adopters.test.mjs` → `tests 24, pass 24, fail 0` (verified twice: once after the staged-diff-gate rethrow fix confirmed the corrupt-repo fixture actually hits a non-1 exit code — git falls back to `--no-index` usage-error mode (exit 129) rather than "not a git repository" (128) when `.git` is missing, so the test asserts `e.code !== 1` generically rather than matching a specific error string).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any AI-referenced doc. This is internal hardening of `tools/update-adopters.mjs`'s already-documented behavior (SHA verification and error handling); none of the CLI's user-facing dry-run/apply output, usage, or safety-gate descriptions changed. Checked each entry: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md` — none reference `update-adopters.mjs` internals. No change.

- [x] Closed — PLAN.md line flipped, tasknote archived.

- [x] **Evidence-based recap** drafted below.

**Final Summary:**

Hardened `tools/update-adopters.mjs` per the 2026-07-26 audit (Findings #2, #5, #10, all Low):

- **SHA verification (Finding #2):** `applyBump` previously confirmed only the post-checkout `SPEC.md` version string. It now also resolves the submodule's checked-out `HEAD` SHA and the canonical `${latest}^{commit}` SHA in `FLOWTRON_REPO` (the same resolution `gitlinkDrift` already trusts) and throws before committing on mismatch. Extracted as a new pure exported helper, `verifyPinnedSha(checkedOutSha, canonicalSha, latest)`, so the failure path is directly unit-testable (a real divergent-SHA git fixture isn't constructible from identical clones of the same tag).
- **Staged-diff error handling (Finding #5):** `checkAdopter`'s `git diff --cached --quiet` catch block now branches on `e.code === 1` (real staged changes → existing skip message) vs any other code (rethrow) — a corrupted repo or other git failure is no longer mislabeled "staged changes in index."
- **Regex parity contract (Finding #10):** added a test asserting `tools/update-adopters.mjs`'s `pinnedVersion` regex and `viz/src/workspace.ts`'s `readFlowtronVersion` regex stay byte-identical (string-literal containment check against a single pinned `String.raw` constant). `viz/src/workspace.ts` itself was not modified.

**Files touched:** `tools/update-adopters.mjs` (+17/-6 LOC: `verifyPinnedSha` helper + `applyBump` SHA check + `checkAdopter` `e.code` branch), `tools/update-adopters.test.mjs` (+34 LOC: 3 new tests).

**Verification:** `node --test tools/update-adopters.test.mjs` → 24/24 pass (was 21). `node --check` on both changed `.mjs` files passes (no lint config for `tools/`).

**Refactors:** one minimal extraction (`verifyPinnedSha`) for testability, matching the file's existing small-pure-helper convention (`compareSemver`, `formatSkillsNote`, `describePin`, …); no unrelated cleanup.

**Documentation:** no change — internal hardening of already-documented CLI behavior.

**Maintainability effect:** closes a real (if narrow) correctness gap — a re-tagged or corrupted ref that carried a matching `SPEC.md` version string could previously pass `applyBump` silently; a real git failure during the staged-diff check could previously be misreported as "staged changes," hiding a genuine problem from the operator. The regex-parity test converts a documented-but-unenforced invariant (both source files carry a comment noting they mirror each other) into a machine-checked one.

**Archived:** 2026-07-26
