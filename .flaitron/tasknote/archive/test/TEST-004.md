---
title: isolate-updater-test-refs
status: completed
tags: []
created: 2026-11-25
due:
related-tasks: []
touches:
  - tools/update-adopters.test.mjs
---

# TEST-004 | isolate-updater-test-refs

[← PLAN.md](../../../PLAN.md) · 🟢 In progress

## 🎯 Goal

Run the updater's ref-mutating cases in a disposable clone and verify that the source checkout's branch and tag SHAs survive the suite.

## ✅ Acceptance

- [x] The lightweight-tag and branch-only release cases exercise the real release helpers against a disposable clone — `node --test tools/update-adopters.test.mjs`
- [x] The suite compares source branch and tag names and object IDs before and after all cases — `node --test tools/update-adopters.test.mjs`
- [x] The full suite also passes in a disposable source checkout with colliding refs `refs/tags/v0.0.2` and `refs/heads/v0.0.3`, with their object IDs preserved — `node --test tools/update-adopters.test.mjs` in the seeded checkout
- [x] Syntax and patch checks pass — `node --check tools/update-adopters.test.mjs` and `git diff --check`

## 🧩 Subtasks

- [x] Record the source ref state across the full suite.
- [x] Move the ref writes into a disposable clone and load the current release module there.
- [x] Run the full updater suite in the source checkout and in a disposable checkout with ref collisions.

## 🔗 Related

- [[TEST-002.3]] — portable fixture clone setup
- [[TEST-003]] — release-tag fixture selection and real-tag coverage

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md.
- [x] **Relevance Assessment** — Proceed. Three cases create refs in the source checkout and then attempt deletion even when creation fails.
- [x] Read the updater test setup, the facade, and the release helper module.
- [x] **Best Practices Review** — Use the existing portable Git fixture pattern. The release module derives its root from its own location, so a fixture copy can use the clone without a production configuration hook.
- [x] **Archive skim** — TEST-002.3 established portable local clones, TEST-002.4 retained the suite as a release gate, and TEST-003 established real-tag read coverage. The prior mutation approach is documented historically and needs no archive correction.
- [x] **Drift check** — The filed issue matches the three source-ref write sites. Other Git ref mutations already use disposable fixtures.
- [x] No clarifications needed. Preserve coverage against real release annotations and use a separate clone for synthetic refs.
- [x] Ordered subtasks and YAML `touches:` declared.

**Discovery Notes:** The Phase 1→2 gate skipped. The fixture change fits the filed scope and uses the existing clone pattern.

## 🛠️ Phase 2: Execution

- [x] Pattern survey
- [x] Minimal refactor gate
- [x] Implemented the minimal solution
- [x] Updated tests for non-trivial behavior

**Implementation Notes:** A no-tags local clone under the existing temp root loads a copy of the current release module. Both synthetic refs live in that clone. The top-level hooks compare sorted source branch and tag names and object IDs. No production refactor was needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran syntax and patch checks. The changed file is JavaScript.
- [x] Verification receipt — all acceptance commands passed. The diff uses the existing clone and cleanup helpers.
- [x] External review — no blockers. Made lightweight tag creation independent of Git signing defaults with `--no-sign`.
- [x] Visual confirmation — N/A. The change has no rendered surface.

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0, 126 passed in the source checkout. The final tag-signing adjustment was checked in the runs below.
- `node --test tools/update-adopters.test.mjs` in a disposable source checkout seeded with annotated tag `v0.0.2` and branch `v0.0.3` → 0, 126 passed with the final diff. A separate `diff -u` of the sorted branch and tag ref lists → 0, including the original object IDs for both collisions.
- `bash tools/drift-checks.sh` → 0.

- `node --check tools/update-adopters.test.mjs` → 0.
- `git diff --check` → 0.
- `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=tag.gpgSign GIT_CONFIG_VALUE_0=true node --test --test-name-pattern='migration guards \(isolated refs\)' tools/update-adopters.test.mjs` → 0, 2 passed.

## 🚀 Phase 4: Closure

- [x] Doc-drift sweep — no change for each entry. The test fixture change preserves the updater interface and the documented validation command.
  - `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`
  - `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`
  - `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`
- [x] Closed — acceptance verified, PLAN row completed, tasknote archived.
- [x] Evidence-based recap drafted
- [x] Learnings — N/A. The test file documents the fixture boundary.

**Final Summary:**

The ref-mutating updater cases now run in a disposable clone. The suite compares source branch and tag object IDs, and the full collision run preserved both pre-existing refs. The fixture imports the current release module at its expected path, so future release-helper changes are covered without a production configuration hook.

Scope reconciliation: declared one deliverable, changed one deliverable (`tools/update-adopters.test.mjs`, +48/−48), with no undeclared paths. No production refactor or documentation update was needed.

**Archived:** 2026-11-25
