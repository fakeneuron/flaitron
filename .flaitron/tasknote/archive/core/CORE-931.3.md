---
title: workspace-module
status: completed
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931, CORE-931.2, CORE-366, CORE-479]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/workspace.mjs
  - tools/update-adopters.test.mjs
  - viz/src/workspace.ts
blocked-by:
  - CORE-931.2
---

# CORE-931.3 | workspace-module

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-931]] [[CORE-931.2]] [[CORE-366]] [[CORE-479]]

## 🎯 Goal

Move the updater's path and adopter-discovery code into
`tools/update-adopters/workspace.mjs`, behavior-preserving, behind the entry's
unchanged export set. The Version-regex parity test and `viz/src/workspace.ts`'s
three mirror comments repoint to the new home.

## ✅ Acceptance

- [x] Suite incl. the Version-regex parity test — `node --test tools/update-adopters.test.mjs`
- [x] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/workspace.mjs`
- [x] viz untouched in behaviour — `npm --prefix viz run typecheck && npm --prefix viz run lint`
- [x] The parity test reads `workspace.mjs` and is green **before** the old copy is deleted from the entry — receipt in Testing Notes
- [x] Entry export set unchanged (CORE-931.2's pin) — `node --test --test-name-pattern='entry facade' tools/update-adopters.test.mjs`
- [x] The move is behavior-preserving: no function body changes beyond imports and `export` keywords; viz changes are comments only — `judgment` (`git diff` shows moves, and the External review confirms it)
- [x] CI roster and drift checks hold — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Create `tools/update-adopters/workspace.mjs` with the moved code and its comments (`FLAITRON_DIR`, `SUBMODULE_PATH`, `expandHome`, `workspaceRoot`, `isFile`, `realOrResolve`, `pinnedVersion`, `pathKind`, `FLAITRON_URL`, `declaredSubmodulePaths`, `discoverAdopters`), importing `git` / `FLAITRON_REPO` from `release.mjs`; a one-line header pointing at the entry's contract
- [x] Repoint the Version-regex parity test to `workspace.mjs`; run it green while the entry still holds its copy
- [x] Rewire the entry: drop the moved code and the imports it leaves unused, import what it still uses, keep the export set via the bottom `export { … }`
- [x] Repoint `viz/src/workspace.ts`'s three mirror comments (comments only), `latestReleaseTag`'s to `release.mjs`
- [x] Run the suite, the `node --check` pair, viz typecheck + lint, and the drift checks

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic (updater-modules)
- [[CORE-931.2]] — predecessor (release-module); `blocked-by:`, closed
- [[CORE-366]] — related-decision: Version-regex parity pin
- [[CORE-479]] — related-decision: viz↔tools mirror naming and linking comments

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `tools/update-adopters/` holds only `release.mjs` (CORE-931.2 closed), and every symbol the starter names sits in the entry at the cited shape. The viz comments are at lines 20, 42 and 64 as surveyed. Nothing has landed since the filing.

- [x] Read relevant source files — the entry (header, import block, `expandHome`…`pinnedVersion`, `FLAITRON_URL`, `declaredSubmodulePaths`, `discoverAdopters`, `pathKind`, bottom export), `release.mjs`'s import surface, `viz/src/workspace.ts` mirror comments, the parity and entry-facade tests.

- [x] **Best Practices Review** — `workspace.mjs` is a leaf over `release.mjs` (`git`, `FLAITRON_REPO`) with no back-import to the entry, so the dependency direction is one-way. `FLAITRON_URL` and `declaredSubmodulePaths` are used only by `discoverAdopters` and stay module-private. `expandHome` and `isFile` have no entry caller once the code moves, so they stay private too. The zero-dependency viz mirror decision stands.

- [x] **Archive skim** — `archive/core/` has about 258 files naming the updater, 12 naming the moved paths. Load-bearing: CORE-366 (the regex-parity contract is a source-text assertion, so it follows the regex to its new file) and CORE-479 (mirror naming and the bidirectional linking comments, which move with their functions). CORE-931.2 set the facade pin this move must hold.

- [x] **Drift check** — Starter matches the code and the PLAN.md line. Two refinements: `FLAITRON_DIR` is also read by the entry's `TASKNOTE_README`, so it is exported from `workspace.mjs`; the entry's `homedir` and `realpath` imports go unused after the move and are dropped. `release.mjs:112` cites "workspaceRoot's mirror comment" by function name, still true after the move. No change to the plan.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumptions: the entry's `export { FLAITRON_REPO, SUBMODULE_PATH, realOrResolve }` line grows to include `discoverAdopters` and `pinnedVersion`, so the export set is unchanged; `pathKind` is exported from `workspace.mjs` only for the entry's own use, not re-exported.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the shape CORE-931.2 set: a leaf module under `tools/update-adopters/` with a one-line header pointing at the entry's contract, `export` keywords on what the entry imports, and the entry re-exporting its public names from the bottom `export { … }`.

- [x] **Minimal refactor gate** — no refactor. Code moved verbatim; the only edits are `export` keywords, the import blocks, and two comment lines in `workspace.mjs` (header naming `pathKind`; the duplication rationale reworded from "this script" to "the updater's modules" after the review).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — no new test: the parity test is repointed to `workspace.mjs`, and CORE-931.2's entry-facade pin guards the export set.

**Implementation Notes:**

Moved to `workspace.mjs`: `FLAITRON_DIR`, `SUBMODULE_PATH`, `expandHome`, `workspaceRoot`, `isFile`, `realOrResolve`, `pinnedVersion`, `pathKind`, `FLAITRON_URL`, `declaredSubmodulePaths`, `discoverAdopters`. The entry imports `FLAITRON_DIR`, `SUBMODULE_PATH`, `discoverAdopters`, `pathKind`, `pinnedVersion`, `realOrResolve`, `workspaceRoot`, and drops its `homedir` and `realpath` imports (no remaining use). Order held: workspace.mjs created, parity test repointed and run green with both copies present, then the entry's copy deleted. `viz/src/workspace.ts`: three comments only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — see Testing Notes. Changed code has no duplication (the entry's copies are deleted), no dead code (every remaining entry import is used), and no stale doc citing the moved functions (doc-drift sweep below).

- [x] **External review** — `/code-review medium` over the working-tree diff (new file marked intent-to-add so it showed). No blocker, three notes; dispositions in Testing Notes.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface; viz changed in comments only, and `--fast` suppresses the ask regardless.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt, final tree (after the two review-note comment edits):

```text
node --test tools/update-adopters.test.mjs                                      → 0  (124 pass, 0 fail)
node --check tools/update-adopters.mjs && node --check tools/update-adopters/workspace.mjs → 0
npm --prefix viz run typecheck                                                  → 0
npm --prefix viz run lint                                                       → 0
node --test --test-name-pattern='entry facade' tools/update-adopters.test.mjs   → 0
bash tools/drift-checks.sh                                                      → 0
```

Parity-before-delete: `node --test --test-name-pattern='Version regex parity' tools/update-adopters.test.mjs` → 0 with the test reading `workspace.mjs` while the entry still held its copy (the test passes by source-text match, so it was also run after the deletion as part of the suite → 0).

External review findings (all notes, none a blocker; the reviewer found no correctness bug and no import cycle):

1. `node --check` roster covers only the entry and its test, so the new modules are never syntax-checked directly (justfile, ci.yml, AGENTS.md §"Validation"). **Filed** as CORE-932 (`/ft-file-task --park --low`): the surfaces sit outside `touches:`, and `/ft-release` §7.1 Pair H pins the roster byte-for-byte.
2. `workspace.mjs` header said "workspace reads" yet holds `pathKind`; `SPEC/layout.md` still lists only `update-adopters.mjs`. **Header fixed**; the `SPEC/layout.md` entry is CORE-931.8's remit (its PLAN line repoints `SPEC/layout.md`).
3. The `expandHome` rationale comment said "this script has no package.json". **Reworded** to "the updater's modules".

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `.flaitron/tasknote/README.md` §"AI-referenced docs" walked: no entry cites the moved functions by file (grep for the moved names beside `update-adopters.mjs` in tracked markdown found none outside archive and PLAN rows). `SECURITY.md`, `SPEC/layout.md`, README and the audit overlay scope line are CORE-931.8's repoints. No change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-24.` stub (nested under CORE-EPIC-931), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in Final Summary.

- [x] **Learnings** — `N/A`.

**Final Summary:**

Moved the updater's path and adopter-discovery code (11 symbols) to `tools/update-adopters/workspace.mjs` (143 lines); the entry lost 138 lines and gained 11 (imports plus the widened bottom export). The Version-regex parity test now reads `workspace.mjs`, and was green before the old copy was deleted. `viz/src/workspace.ts` changed in three comment lines only. Verification: updater suite 124/124, `node --check` pair, viz typecheck and lint, the entry-facade pin and the drift checks all exit 0. `touches:` reconciliation: `git diff --name-only` is the tasknote, `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, `tools/update-adopters/workspace.mjs` and `viz/src/workspace.ts` — all declared; CORE-932 was filed in its own commit (`77a70ea6`). External review: no blocker, three notes (one filed as CORE-932, two fixed or deferred to CORE-931.8). Maintainability effect: the entry is down to roughly 1,320 lines with the workspace and path code behind a one-way leaf import; CORE-931.4 (text.mjs) can now take `SUBMODULE_PATH` from workspace.mjs.

**Archived:** 2026-11-24
