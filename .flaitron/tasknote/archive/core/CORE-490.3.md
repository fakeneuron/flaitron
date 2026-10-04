---
title: no-verify-bump-commit
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

# CORE-490.3 | no-verify-bump-commit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-490]]

## 🎯 Goal

Pass `--no-verify` on the bump commit in `tools/update-adopters.mjs`'s `applyBump` (a pure gitlink move — nothing for hooks to lint) and document the choice in the header rollback contract.

## ✅ Acceptance

- [x] `applyBump`'s bump commit (`tools/update-adopters.mjs:658-667`) passes `--no-verify`
- [x] The header's "Mid-bump rollback" paragraph documents why (pure gitlink move — nothing for hooks to lint)
- [x] The two existing hook-based failure-injection tests (mid-fleet apply failure; rollback "commit fails") still force a genuine `applyBump` commit failure under the new `--no-verify` flag
- [x] A new test asserts a `pre-commit` hook that would otherwise reject the commit no longer blocks the bump (proves the acceptance criterion directly)
- [x] `node --test tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs` pass

## 🧩 Subtasks

- [x] Add `--no-verify` to the `git commit` call in `applyBump` (`tools/update-adopters.mjs:658-667`)
- [x] Add a sentence to the header "Mid-bump rollback" paragraph documenting the `--no-verify` choice
- [x] Swap `pre-commit` → `prepare-commit-msg` in the two existing hook-based failure fixtures (mid-fleet failure test, rollback "commit fails" test) and their comments — `--no-verify` skips `pre-commit`/`commit-msg` but not `prepare-commit-msg`
- [x] Add a new test proving hooks are now bypassed (pre-commit hook present, bump still succeeds)
- [x] Run `node --test tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs`

## 🔗 Related

- [[CORE-EPIC-490]] — parent epic: updater-failure-honesty

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `applyBump`'s bump commit (`tools/update-adopters.mjs:658-667`) does not pass `--no-verify`, exactly as the parent epic describes ("applyBump commits without --no-verify so adopter pre-commit hooks run unattended"). The commit is a pathspec commit touching only `.flowtron/core` (a pure gitlink move) — nothing an adopter's hooks could meaningfully lint. Running unvetted, adopter-defined hooks during an unattended sweep can also fail the bump for reasons unrelated to the pin move itself.

- [x] Read relevant source files — `tools/update-adopters.mjs` header comment, esp. the "Mid-bump rollback" paragraph (`:65-74`); `applyBump` in full (`:628-657`); `rollbackBump` (`:611-626`); the `git()` helper (`:148-151`). `tools/update-adopters.test.mjs`: `makeAdopter` (`:108-129`), `sandboxed --apply` describe block (`:496-563`), `applyBump rollback (CORE-419.3)` describe block (`:565-626`).

- [x] **Best Practices Review** — single responsibility: one flag added to one `git()` call plus its header-comment documentation. No new abstraction, no new module boundary. The change does touch two existing tests' fault-injection technique (see Drift check) — that's a required adaptation, not scope creep, since `--no-verify` structurally disarms their existing `pre-commit` hook fixture.

- [x] **Archive skim** — `grep -l 'applyBump\|--no-verify\|pre-commit hook' archive/core/*.md` hit 25 files; read the two load-bearing ones in full: **CORE-419.3** (built `applyBump`'s rollback + the `pre-commit exit 1` fixture, explicitly pinning `core.hooksPath` "so a global override on the host cannot silently disarm the injection" — fixture-side injection is the stated principle, "no new env var or injection hook in the production module") and **CORE-424.4** (reused CORE-419.3's exact `pre-commit` recipe for the mid-fleet failure test, calling it "the established way to fail apply mid-step without forge/origin surgery"). CORE-490.2 (sibling, this epic) confirms no `.1` Discovery child exists — no `## 🌳 Fan-out` claim to echo. No other archive hit added a load-bearing constraint beyond general `applyBump` authorship history.

- [x] **Drift check** — no drift on the production side: line 649 and the header paragraph (`:65-74`) match the epic's description exactly. **Drift surfaced on the test side**, caught during Discovery, not left for Phase 2 to discover blind: two existing tests inject an `applyBump` commit failure via a `.git/hooks/pre-commit` script that exits 1 — `'unstages the gitlink and restores the submodule when the commit fails'` (`:604-625`) and `'continues past a mid-fleet bump failure, counts 1 failed, exits 1'` (`:537-562`). `--no-verify` skips exactly `pre-commit` and `commit-msg` (verified empirically: `git commit --no-verify` still runs `prepare-commit-msg` and fails on its nonzero exit), so once `--no-verify` lands, both fixtures' hook would no longer fire and both tests would silently start exercising the *success* path instead of the failure path they're named for — a false-green regression, not a crash, so it wouldn't be caught by "tests still pass." This is now in scope as the minimal necessary fix: swap `pre-commit` → `prepare-commit-msg` in both fixtures (same `core.hooksPath`-pinned recipe, same forced-`exit 1` shape, same "fixture-side, not seam-side" principle CORE-419.3 established) so they keep failing for the reason they're testing. No SPEC contract touched — `tools/` is the CLI carve-out (SPEC.md §"What flowtron does NOT provide"), same as CORE-490.2.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Flag placement** — `--no-verify` goes among the commit's own flags, before the `--` pathspec separator: `git(repo, 'commit', '--quiet', '--no-verify', '-m', msg, '--', SUBMODULE_PATH)`. Standard git flag-then-pathspec ordering; no behavior ambiguity.
  2. **Test fixture swap is in-scope, not a deferred cleanup** — per the Drift check above, leaving the two existing tests on `pre-commit` would make them pass-but-lie once `--no-verify` lands. Fixing them is required to satisfy this task's own acceptance ("nothing for hooks to lint" must actually be true and tested), not an unrelated refactor.
  3. **New positive test added** — beyond fixing the two existing tests, one new test asserts the acceptance criterion directly (a `pre-commit` hook that would reject is now bypassed, bump succeeds). Existing tests were failure-path tests that happened to use hooks as a fault-injection vehicle; none of them asserted "hooks are skipped" as their subject.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Empirically verified** (scratch repo, not committed) that `git commit --no-verify` skips `pre-commit` and `commit-msg` but still invokes and honors the exit code of `prepare-commit-msg` — this is the swap target for both existing fault-injection fixtures.
- `rollbackBump` and `verifyPinnedSha` are untouched by this task — the other Phase 1 rollback test (`'restores the prior submodule SHA when a post-checkout verify fails'`, `:566-602`) fails at `verifyPinnedSha` before `git add` ever runs, so it's unaffected by `--no-verify` and needs no change.
- The header's "Per-adopter safety gates" bullet list (`:23-42`) does not mention hooks at all — the right documentation surface for this change is the "Mid-bump rollback" paragraph (`:65-74`), which already narrates the commit step's failure modes; per the PLAN.md line's own wording ("document it in the header rollback contract").

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the fix extends `applyBump`'s existing single `git(repo, 'commit', ...)` call with one flag; no new shape needed. The two adapted tests reuse `makeAdopter` + the exact `core.hooksPath`-pinned hook-fixture pattern CORE-419.3/CORE-424.4 established, just retargeting the hook name — no new test helper.

- [x] **Minimal refactor gate** — no refactor beyond the change itself. The two existing tests' `pre-commit` → `prepare-commit-msg` swap is required (not optional cleanup): left on `pre-commit`, both would silently start passing for the wrong reason once `--no-verify` landed (Drift check, Phase 1).

- [x] Implemented the minimal solution — `--no-verify` added to the bump commit (`tools/update-adopters.mjs:658-667`, with a one-line comment pointing at the header rationale); header "Mid-bump rollback" paragraph gained a closing sentence naming the choice and why (`:75-80`).

- [x] Updated/added tests for non-trivial behavior — swapped the hook name in the two existing fault-injection tests (`update-adopters.test.mjs:564-569`, `:634-639`) and added one new test, `'bumps past a rejecting pre-commit hook (--no-verify)'` (`:536-554`), that asserts the acceptance criterion directly.

**Implementation Notes:**

- `tools/update-adopters.mjs:658-667` — `applyBump`'s commit call gained `--no-verify`, placed among the commit's own flags before the `--` pathspec separator (matches existing git flag-then-pathspec ordering in the same call).
- `tools/update-adopters.mjs:75-80` — header "Mid-bump rollback" paragraph gained one closing sentence: the bump commit is a pure gitlink pathspec commit with nothing adopter-authored for a hook to lint, and running an adopter's own hooks unattended during a fleet sweep could abort an otherwise-clean bump for reasons unrelated to the pin move.
- `tools/update-adopters.test.mjs` — `'continues past a mid-fleet bump failure...'` (`:564-569`) and `'unstages the gitlink and restores the submodule when the commit fails'` (`:634-639`) both swapped their injected hook from `.git/hooks/pre-commit` to `.git/hooks/prepare-commit-msg` (same `exit 1` body, same `core.hooksPath` pin) — `--no-verify` skips exactly `pre-commit`/`commit-msg`, verified empirically not `prepare-commit-msg`, so both fixtures still force a genuine commit failure.
- `tools/update-adopters.test.mjs:536-554` — new test `'bumps past a rejecting pre-commit hook (--no-verify)'` under `describe('sandboxed --apply')`: installs a `pre-commit` hook that always exits 1, runs `applyBump`, asserts the bump still lands (`pinnedVersion` reads the new tag). Proves the acceptance criterion rather than relying on the adapted failure tests' absence-of-regression alone.
- `SECURITY.md` — doc-drift sweep (below) surfaced a genuine drift in the Fleet updater section: added a `Bump commit passes --no-verify` bullet next to the existing `Local-commits-never-push` bullet, since the change alters what adopter-side code executes during an unattended sweep.

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

- `node --test tools/update-adopters.test.mjs` → **40/40 pass** (37 baseline before CORE-490.2 + 2 from CORE-490.2 + 1 new here = 40; the two swapped-hook tests pass under their new `prepare-commit-msg` fixture and the new `--no-verify` bypass test passes).
- `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` → clean. `node --check` is this file's declared check (ESLint covers only `viz/src/**`, unaffected).
- **Quality assertions:** no duplication (the two swapped tests reuse the existing `core.hooksPath` fixture recipe verbatim, just retargeting the hook filename; the new test reuses `makeAdopter`/`checkAdopter`/`applyBump` with no new helper), no dead code, no public-surface growth, no stale code-facing docs — the two doc comments that described the commit step (`applyBump`'s inline comment and the header's "Mid-bump rollback" paragraph) were updated to state the new `--no-verify` behavior rather than left silent about it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

- `README.md` — no change.
- `AGENTS.md` — no change (validation commands unchanged; both still pass).
- `SPEC.md` — no change (carve-out reference only).
- `docs/MIGRATION.md` — no change (its `tools/update-adopters.mjs` paragraph, `:512`, describes the migration-gate/skill-symlink behavior, not the commit's hook handling; still accurate).
- `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — no change (adopter wiring, unrelated).
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — **updated.** Fleet updater section (§"Fleet updater (`tools/`)") gained a `Bump commit passes --no-verify` bullet next to `Local-commits-never-push`, naming that adopter-authored `pre-commit`/`commit-msg` hooks no longer run as a side effect of an unattended sweep.
- `docs/AGENT-NEUTRALITY.md` — no change.
- `docs/PLATFORMS.md` — no change.
- `claude/CAPABILITIES.md` — no change.
- `docs/AGENT-COMPAT.md` — no change.
- `docs/EXTERNAL-AGENTS.md` — no change.
- `docs/WORKTREES.md` — no change.
- `docs/VISION.md` — no change.

**Final Summary:**

`applyBump`'s bump commit now passes `--no-verify`: it is a pure `.flowtron/core` gitlink pathspec commit with nothing adopter-authored for a hook to lint, and running an adopter's own `pre-commit`/`commit-msg` hooks unattended during a fleet sweep could abort an otherwise-clean bump for reasons unrelated to the pin move. The header's "Mid-bump rollback" paragraph now documents the choice and its rationale, matching the PLAN.md line's explicit ask.

- **Changed:** `tools/update-adopters.mjs` (+11 lines: one flag on the commit call, a 2-line inline comment, a 6-line header-comment addition), `tools/update-adopters.test.mjs` (+~23 lines net: one new test, two existing hook-fixture tests retargeted from `pre-commit` to `prepare-commit-msg`), `SECURITY.md` (+4 lines: one new bullet).
- **Verification:** `node --test tools/update-adopters.test.mjs` → 40/40 pass; `node --check` clean on both `.mjs` files.
- **Refactors:** none. The two existing hook-fixture tests were adapted, not refactored — `--no-verify` structurally disarms their `pre-commit`-based fault injection (verified empirically: `--no-verify` skips `pre-commit`/`commit-msg` but not `prepare-commit-msg`), so retargeting the hook name was required to keep them testing a genuine commit failure rather than silently starting to test the success path. This was caught in Phase 1's Drift check, not left for a later regression.
- **Docs:** sweep above — 14 "no change", one genuine update (`SECURITY.md`).
- **Maintainability:** the commit step's hook behavior is now stated in three places that agree — the inline comment at the call site, the header's rollback-contract paragraph, and `SECURITY.md`'s Fleet updater section — so a future reader (or auditor) doesn't have to infer it from the flag alone. The new positive test (`'bumps past a rejecting pre-commit hook (--no-verify)'`) pins the acceptance criterion directly rather than relying only on the absence of a regression in the adapted failure tests.

**Archived:** 2026-08-29
