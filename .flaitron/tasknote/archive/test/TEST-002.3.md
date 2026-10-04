---
title: updater fixture portability
status: completed
tags: []
created: 2026-07-22
due:
related-tasks: [TEST-EPIC-002, TEST-002.2, TEST-002.4, TEST-002.N, CORE-360]
---

# TEST-002.3 | updater fixture portability

[← PLAN.md](../../PLAN.md) · 🟢 In progress · 🔗 [[TEST-EPIC-002]] [[CORE-360]]

## 🎯 Goal

Make the updater suite's local Git fixtures portable to restricted agent sandboxes without weakening its 21 behavior checks.

## ✅ Acceptance

- [x] Fixture repositories copy Git objects instead of depending on filesystem hardlinks
- [x] Both fixture clone layers retain the existing local, network-free repository topology
- [x] All 21 `tools/update-adopters.test.mjs` tests pass in the default restricted agent sandbox
- [x] `tools/update-adopters.mjs` remains unchanged and passes `node --check`

## 🧩 Subtasks

- [x] Replace hardlink-dependent fixture clone options with explicit object-copy semantics
- [x] Update the fixture comment so it describes the portability constraint accurately
- [x] Run the complete updater suite inside the default restricted sandbox
- [x] Run the production script syntax check and review the final diff for unnecessary scope
- [x] Complete the documentation sweep and archive the child atomically with its test deliverable

## 🔗 Related

- [[TEST-EPIC-002]] — parent portable full-repo gates epic
- [[TEST-002.2]] — preceding dependency-baseline child
- [[TEST-002.4]] — follow-up gate-discoverability child
- [[TEST-002.N]] — terminal portable-gates audit
- [[CORE-360]] — introduced the updater suite and its shared local-clone fixture architecture

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The default restricted sandbox reproduces the filed portability failure before any test body runs: `git clone --local` attempts a forbidden hardlink while constructing the shared mirror, cancelling all 21 updater tests.

- [x] Read relevant source files — `tools/update-adopters.test.mjs`, `tools/update-adopters.mjs`, the active epic cohort in `.flowtron/PLAN.md`, and the prior tasknotes `archive/core/CORE-360.md` plus `archive/TEST/TEST-002.2.md`

- [x] **Best Practices Review** — fixture construction belongs in the test file's existing `before` hook and `makeAdopter` helper; production updater responsibilities and exports are unaffected. Preserve the shared-mirror abstraction and network-free clone topology, but make the filesystem portability requirement explicit at both clone boundaries. No duplicated helper or production refactor is needed.

- [x] **Archive skim** — `CORE-360` established the zero-dependency `node:test` suite, shared local-clone mirror, temp adopter roots, and 21-test baseline; it reported 21/21 passing outside the restricted sandbox. `TEST-002.2` confirms this epic's convention of keeping each safety-net repair narrow and proving the complete relevant gate. No prior `archive/TEST/` note changed updater fixtures.

- [x] **Drift check** — the filed diagnosis matches current code and runtime: `tools/update-adopters.test.mjs` still passes `--local` in both the flowtron-to-mirror and mirror-to-fixture clones, its comment still calls the mirror “hardlink-friendly,” and the sandbox run fails at the first clone with `failed to create link ... Operation not permitted`. The suite still contains exactly 21 tests.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assume Git's documented `--no-hardlinks` option is the intended portability mechanism: retain `--local` for network-free local cloning while forcing object copies. Production behavior, fixture coverage, and test count stay unchanged.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The failure is setup-wide rather than 21 independent behavior failures: the top-level `before` hook cannot create its mirror, so Node cancels every child test. Neighboring code offers no alternative Git fixture abstraction; the existing two-layer mirror is deliberate for reuse and should remain. Applying `--no-hardlinks` at only the first layer would leave each adopter clone free to repeat the same forbidden operation, so both existing clone calls are in scope.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — retained `CORE-360`'s established shared-mirror + `makeAdopter` fixture pattern and changed only its Git clone policy; no parallel fixture shape, helper duplication, or production responsibility was introduced

- [x] **Minimal refactor gate** — no refactor needed; the two explicit clone call sites represent distinct fixture boundaries and each requires the same portability option. Consolidating their small argument lists would add indirection without improving the test boundary.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — no new case needed: the existing 21-test suite is itself the affected behavior surface, and its top-level setup can run only when both clone layers are portable

**Implementation Notes:**

Added Git's `--no-hardlinks` clone option alongside `--local` in both fixture boundaries: the real checkout → shared mirror clone and the shared mirror → adopter core clone. `--local` preserves the network-free topology while `--no-hardlinks` forces object copies compatible with the restricted sandbox. Updated the shared-mirror comment from “hardlink-friendly” to “object-copy source”; production code is unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 21 tests across 8 suites passed; 0 failed, cancelled, or skipped

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.test.mjs` and `node --check tools/update-adopters.mjs`: clean; `git diff --check`: clean

- [x] **Quality assertions** — the final test-only diff adds no new public surface, control flow, or abstraction; both required clone boundaries remain explicit, no dead code or stale comment remains, and production behavior is untouched

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (test fixture only; no frontend or rendered behavior changed)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Pre-change reproduction in the default restricted sandbox: the first `git clone --local` failed with `failed to create link ... Operation not permitted`; all 21 tests were cancelled by the failed top-level setup.
- Post-change restricted-sandbox run: 21/21 passed in 147.5 seconds, including classification, dry-run CLI, Gitlink drift, and sandboxed `--apply` coverage.
- The longer runtime is the expected cost of copying local Git objects rather than hardlinking them; no performance-sensitive production path changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — the change is internal test-fixture portability and does not alter the updater CLI, workflow contract, platform wiring, security model, or public verification instructions:

  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change; its v5.13.0 verification stamp remains current
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md child line flipped to stub form `Completed 2026-07-22.` and kept nested beneath active parent `TEST-EPIC-002`; tasknote moved to `.flowtron/tasknote/archive/TEST/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Made both updater fixture clone layers portable to restricted sandboxes by retaining local clones while forcing Git object copies with `--no-hardlinks`. The test-only implementation diff is 17 insertions / 3 deletions; all 21 updater tests now pass in the default sandbox, both test and production scripts pass `node --check`, and all 12 AI-referenced docs require no update. No refactor or production change was needed, and the repository now has a runnable updater safety net for the epic's later full-gate audit.

**Archived:** 2026-07-22
