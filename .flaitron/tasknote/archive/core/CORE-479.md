---
title: updater-naming-dedup
status: completed
tags: []
created: 2026-08-26
due:
related-tasks: []
---

# CORE-479 | updater-naming-dedup

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-366]] [[CORE-371]]

## 🎯 Goal

De-trap the viz↔tools mirror naming between `tools/update-adopters.mjs` and `viz/src/workspace.ts` — `latestReleaseTag` shares a name across files but has different signatures, while `pinnedVersion`/`readFlowtronVersion` share behavior but have different names — and optionally extract `checkAdopter`'s eight skip-gates to an ordered array.

## ✅ Acceptance

- [x] `latestReleaseTag` in `tools/update-adopters.mjs` and `viz/src/workspace.ts` carries a linking comment (matching the CORE-371 convention) explaining the two mirrors share a name but differ in signature/resolution strategy
- [x] `viz/src/workspace.ts`'s `readFlowtronVersion` is renamed to `pinnedVersion` to match `tools/update-adopters.mjs`'s exported mirror, with its call site and comment updated
- [x] `checkAdopter`'s eight-gate extraction is explicitly resolved (done, or deliberately deferred with a one-line rationale) — it is optional per the PLAN.md line. **Resolved: deferred**, rationale recorded as a code comment above `checkAdopter` (sequential state-dependency between gates makes a clean array extraction a larger refactor than this task's naming scope).
- [x] `tools/update-adopters.test.mjs` (37 tests, grown from 24 at CORE-366) and `viz/src/workspace.test.ts` still pass after the rename

## 🧩 Subtasks

- [x] Add a linking comment above `latestReleaseTag` in `tools/update-adopters.mjs` (near line 289) cross-referencing `viz/src/workspace.ts`'s mirror and naming the signature difference (0-arg, fixed `FLOWTRON_REPO` vs 1-arg explicit `repoDir`)
- [x] Add the reciprocal linking comment above `latestReleaseTag` in `viz/src/workspace.ts` (near line 59), extending its existing comment
- [x] Rename `readFlowtronVersion` → `pinnedVersion` in `viz/src/workspace.ts` (private function, no export change) and update its one call site in `discoverProjects`
- [x] Update the comment above `pinnedVersion` in `tools/update-adopters.mjs` and add/adjust the comment above `pinnedVersion` in `viz/src/workspace.ts` so both cross-reference each other by the now-shared name
- [x] Confirm the CORE-366 regex-parity contract test (`tools/update-adopters.test.mjs` describe block "Version regex parity (CORE-366)") still passes unmodified — it checks regex source text, not function names
- [x] Record the checkAdopter eight-gate decision (extract or defer) with rationale
- [x] Run `node --test tools/update-adopters.test.mjs` and `npm --prefix viz test -- workspace` (or equivalent) to confirm no regressions

## 🔗 Related

- [[CORE-366]] — predecessor: `updater-hardening` added the still-standing `pinnedVersion`/`readFlowtronVersion` regex-parity contract test and the tools-side "Same Version-line contract..." linking comment this task extends
- [[CORE-371]] — predecessor: `shared-workspace-helpers` established the bidirectional linking-comment convention (`expandHome`/`workspaceRoot`/`isFile`) this task completes for `latestReleaseTag` and `pinnedVersion`/`readFlowtronVersion`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Two concrete naming traps between `tools/update-adopters.mjs` and `viz/src/workspace.ts`, both confirmed present in current code (Findings #6/#8, Medium/Low, from the 2026-08-26 structure audit). No scope deviation — maps 1:1 to the PLAN.md line.

- [x] Read relevant source files — `tools/update-adopters.mjs` (header comment, `pinnedVersion`, `latestReleaseTag`, `checkAdopter`, `expandHome`/`workspaceRoot`/`isFile` block), `viz/src/workspace.ts` (`expandHome`/`workspaceRoot`/`isFile`, `readFlowtronVersion`, `latestReleaseTag`, `discoverProjects`), `tools/update-adopters.test.mjs` (import list, `pinnedVersion`/`latestReleaseTag` test blocks, the CORE-366 regex-parity contract test), `viz/src/workspace.test.ts` (import list, `latestReleaseTag` describe block)

- [x] **Best Practices Review** — Confirmed via `git log -S` that CORE-371 introduced the bidirectional linking-comment convention for `expandHome`/`workspaceRoot`/`isFile`, following the "document, don't merge" precedent CORE-366 set for the `**Version:**` regex pair. `latestReleaseTag` never received this treatment (no cross-file comment on either side); `pinnedVersion`/`readFlowtronVersion` received only a one-directional comment (tools → viz, not reciprocated). This task completes that established pattern rather than inventing a new one: unify the name where one mirror is unexported/untested-directly and a rename is low-blast-radius (`readFlowtronVersion` → `pinnedVersion`), and add the missing linking comment where the signatures genuinely differ and a same-name-different-signature pair is the established tolerated shape (`workspaceRoot` precedent) — `latestReleaseTag` keeps its name, gains the comment.

- [x] **Archive skim** — `grep -l viz/src/workspace.ts\|tools/update-adopters.mjs archive/core/*.md` surfaced ~50 hits; read the two load-bearing ones by `git log -S` on the mirroring comments: **CORE-366** (`updater-hardening`, 2026-07-26) added `verifyPinnedSha`, hardened `checkAdopter`'s staged-diff `try/catch` to branch on `e.code === 1`, and pinned the `pinnedVersion`/`readFlowtronVersion` regex source as a byte-identical contract test (function names were explicitly left unaligned — "readFlowtronVersion... stays private/untested-directly in workspace.ts"). **CORE-371** (`shared-workspace-helpers`, 2026-07-26) resolved the `expandHome`/`workspaceRoot`/`isFile` duplication finding by documenting rather than extracting, citing `tools/update-adopters.mjs`'s zero-dep plain-`node` constraint as the reason a shared module isn't viable, and established the bidirectional linking-comment convention this task extends to the two functions it missed. Neither task renamed anything; this task is the first to do so, and only where it's genuinely low-risk (private, untested-by-name function).

- [x] **Drift check** — PLAN.md's function names (`latestReleaseTag`, `pinnedVersion`, `readFlowtronVersion`, `checkAdopter`) all match current code. `latestReleaseTag`: tools (update-adopters.mjs:289) takes zero args and reads the fixed `FLOWTRON_REPO`; viz (workspace.ts:59) takes an explicit `repoDir` arg — confirmed different signatures, no existing cross-comment on either side. `pinnedVersion`/`readFlowtronVersion`: tools (update-adopters.mjs:230) is exported and directly tested; viz (workspace.ts:42) is unexported/private, called only from `discoverProjects` — confirmed same regex/behavior, different names, one-directional comment only. `checkAdopter` (update-adopters.mjs:437-534): counted 8 early-return skip/guard branches after the initial unreadable-version check (reverse-drift, detached-HEAD, pinned-ahead, missing-tag, migration-bearing, staged-changes, dirty-submodule, plus the initial unreadable-SPEC.md check) — matches "eight gates." No drift from the PLAN.md description.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) "de-trap the naming" means resolving both directions of the trap — same-name/different-signature (`latestReleaseTag`) via a documenting comment (matching the `workspaceRoot` precedent, since CORE-371 already established that same-name-different-arg-shape mirrors are tolerated with a comment, not a rename) and different-name/same-behavior (`pinnedVersion`/`readFlowtronVersion`) via a rename to a shared name (since the viz side is private/untested-by-name, making this the one pair where a rename is low-risk and precedent-free to choose either direction — converging on `pinnedVersion`, the exported/tested/older name, minimizes churn); (2) the `checkAdopter` eight-gate extraction is optional per the PLAN.md line's own wording, so Phase 2 will make and record an explicit accept/defer call rather than treating it as a hard Acceptance item; (3) no behavior change anywhere — comment-only and rename-only edits, consistent with CORE-366/CORE-371's "document, don't merge" precedent.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

`checkAdopter`'s 8 gates are sequentially state-dependent (later gates consume `current`, `recordedGitlink`, `currentVersion`/`latestVersion`, `range`/`bearing` computed by earlier gates) — a clean "ordered array of independent gate functions" would need a threaded context object or per-gate recomputation, either of which is a larger, `[medium]`-shaped refactor rather than the `[light]` mechanical scope this task is filed at. Leaning toward deferring the extraction (recording the rationale in Phase 2/Closure) unless it turns out simpler once the naming fix is in and the function is re-read fresh.

Discovery surfaced no significant scope deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-371 bidirectional linking-comment convention (already used for `expandHome`/`workspaceRoot`/`isFile`) to `latestReleaseTag`; converged `readFlowtronVersion` onto the older/exported/tested name `pinnedVersion` rather than inventing a third naming scheme.

- [x] **Minimal refactor gate** — no behavior change: comment additions + one private-function rename + one call-site update. `checkAdopter`'s eight gates were reviewed and deliberately left inline (recorded as a code comment above the function) — the gates are sequentially state-dependent, so a clean array extraction needs a threaded context object, a larger refactor than this task's naming scope; the PLAN.md line marks it optional.

- [x] Implemented the minimal solution

  - `tools/update-adopters.mjs`: added a linking comment above `latestReleaseTag` naming the viz mirror and the signature difference; updated the `pinnedVersion` comment to note the now-shared name; added a rationale comment above `checkAdopter` recording the deferred gate-extraction decision.
  - `viz/src/workspace.ts`: added the reciprocal linking comment above `latestReleaseTag`; renamed `readFlowtronVersion` → `pinnedVersion` (private, unexported) with an updated comment and its one call site in `discoverProjects`.

- [x] Updated/added tests for non-trivial behavior — N/A, no behavior change; existing test suites re-run unmodified to confirm no regression (Phase 3).

**Implementation Notes:**

`readFlowtronVersion` was unexported and called only from `discoverProjects`, and no test file referenced it by name (only the CORE-366 regex-parity contract test, which checks source text, not identifiers) — confirmed via grep before renaming, so the rename carried no test-breakage risk.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 37/37 pass; `npm --prefix viz test -- workspace` (vitest): 15/15 pass

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs`: OK; `npm --prefix viz run typecheck` (tsc --noEmit): clean; `npm --prefix viz run lint` (eslint src): clean

- [x] **Quality assertions** — no duplication introduced (the tools/viz pair stays deliberately duplicated per CORE-366/CORE-371 precedent — this task only aligns naming and documents it); no dead code; the added comments are the non-obvious-WHY kind (naming rationale, deferred-refactor rationale), not restating what the code already says; no unnecessary public-surface growth (`pinnedVersion` in workspace.ts stays private, matching its predecessor's convention); no stale code-facing docs (the CORE-366/CORE-371 comments this task extends remain accurate, now completed for the two mirrors they'd missed).

- [ ] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A, CLI tool (`tools/update-adopters.mjs`) + backend workspace helper (`viz/src/workspace.ts`), no UI surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

`node --test tools/update-adopters.test.mjs` → `tests 37, pass 37, fail 0` (grown from the 24 recorded at CORE-366; the CORE-366 regex-parity describe block passed unmodified). `npm --prefix viz test -- workspace` → `Test Files 1 passed (1), Tests 15 passed (15)`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any AI-referenced doc. Checked each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`) — none document `update-adopters.mjs`/`workspace.ts` internal function names or the `checkAdopter` gate structure; this is comment-only + a private-function rename with no CLI/behavior/contract change. Matches CORE-366's "no change" conclusion for the same files.

- [x] Closed — all `## ✅ Acceptance` criteria ticked (see above); YAML `status:` flipped to `completed` below; PLAN.md line to be flipped to stub form at commit time; tasknote to move to `.flowtron/tasknote/archive/core/CORE-479.md` in the same commit.

- [x] **Evidence-based recap** drafted below.

**Final Summary:**

Completed both required naming de-traps between `tools/update-adopters.mjs` and `viz/src/workspace.ts` (2026-08-26 audit Findings #6/#8) and resolved the optional `checkAdopter` gate-extraction as a deliberate defer:

- **`latestReleaseTag` (same name, different signature):** added a bidirectional linking comment on both sides (matching the CORE-371 convention already used for `expandHome`/`workspaceRoot`/`isFile`) explaining the mirrors share a name but not a signature — tools always resolves against the fixed `FLOWTRON_REPO`, viz needs an explicit `repoDir` because it discovers adopters at arbitrary paths.
- **`pinnedVersion`/`readFlowtronVersion` (different name, same behavior):** renamed `viz/src/workspace.ts`'s private `readFlowtronVersion` to `pinnedVersion`, converging on the older/exported/tested tools-side name; updated its one call site (`discoverProjects`) and both files' comments to cross-reference each other by the now-shared name. The CORE-366 regex-parity contract test (checks source text, not identifiers) passed unmodified.
- **`checkAdopter`'s eight gates (optional):** reviewed and deliberately left inline — the gates are sequentially state-dependent (later gates consume state earlier gates compute), so a clean array-of-independent-gates extraction would need a threaded context object, a larger refactor than this task's naming scope. Recorded the rationale as a code comment above `checkAdopter` so a future audit doesn't re-surface it without context.

**Files touched:** `tools/update-adopters.mjs` (+13/-0 LOC: 3 new/extended comments, no logic change), `viz/src/workspace.ts` (+7/-3 LOC: 2 comment additions/extensions, 1 rename + 1 call-site update, no logic change).

**Verification:** `node --test tools/update-adopters.test.mjs` → 37/37 pass. `npm --prefix viz test -- workspace` (vitest) → 15/15 pass. `npm --prefix viz run typecheck` (tsc --noEmit) → clean. `npm --prefix viz run lint` (eslint src) → clean. `node --check tools/update-adopters.mjs` → OK.

**Refactors:** none beyond the one in-scope rename (`readFlowtronVersion` → `pinnedVersion`); the `checkAdopter` gate extraction was explicitly deferred (see above) rather than attempted and reverted.

**Documentation:** no change — internal naming/comment cleanup with no user-facing or contract-level behavior change.

**Maintainability effect:** closes both directions of the mirror-naming trap the audit flagged. A reader grepping `pinnedVersion` now finds both mirrors instead of only the tools-side export; a reader calling `latestReleaseTag` in either file now sees an explicit note that the same name hides a different signature, rather than discovering it only by reading both call sites. Completes the CORE-366/CORE-371 "document, don't merge" convention for the two mirror pairs it had missed.

**Archived:** 2026-08-26
