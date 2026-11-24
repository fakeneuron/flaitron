---
title: wiring-module
status: completed
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/wiring.mjs
blocked-by:
  - CORE-931.4
---

# CORE-931.5 | wiring-module

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Move the updater's skill wiring (`wiringPlan`, `wireSkills`, the dangling-link prune) and audit-fork reads (`auditForks`, `forkPassGaps`, fork drift) from `tools/update-adopters.mjs` into `tools/update-adopters/wiring.mjs`, behavior-preserving, with the entry's export set unchanged.

## ✅ Acceptance

- [x] Suite — `node --test tools/update-adopters.test.mjs`
- [x] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/wiring.mjs`
- [x] Export set unchanged; `wiringPlan` still importable from the entry — `entry facade (CORE-931.2)` test inside the suite above
- [x] Behavior-preserving move, never mixed with feature change — `judgment`: a sorted removed-vs-added line diff shows only `export` keywords and the memo-helper adoption as changes

## 🧩 Subtasks

- [x] Create `tools/update-adopters/wiring.mjs` with a one-line header (931.2–.4 shape) and the moved block: `WIRING_SURFACES`, `PRUNE_SKIP`, `wiringPlan`, `linkTarget`, `ignoredPaths`, `danglingLinks`, `trackedPaths`, `wireSkills`, `FORK_ROOTS`, `auditForks`, `forkPassGaps`, `cachedForkDrift`
- [x] `cachedForkDrift` adopts `memoByKey` from `release.mjs` (same key, same promise caching)
- [x] Entry: delete the moved code, import what `checkAdopter` / `followThrough` call (`wiringPlan`, `wireSkills`, `auditForks`, `forkPassGaps`, `cachedForkDrift`), re-export `wiringPlan`, drop imports only this move made unused
- [x] Run suite, `node --check` pair, drift checks

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.4]] — `blocked-by:` predecessor (closed 2026-11-24).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-931.2/.3/.4 have landed (`release.mjs`, `workspace.mjs`, `text.mjs` exist), and every symbol the starter names sits in the entry (lines 269–935) at the cited shape.

- [x] Read relevant source files — the entry's import/re-export block, the wiring and fork block (`WIRING_SURFACES` through `cachedForkDrift`), `checkAdopter`'s callers (lines 589–603), `followThrough`'s `wireSkills` call, `rollbackBump`, `release.mjs`'s `memoByKey`, the facade test.

- [x] **Best Practices Review** — `wiring.mjs` depends one-way on `release.mjs` (`git`, `parseSemverTag`, `FLAITRON_REPO`, the cached reads, `memoByKey`), `workspace.mjs` (`pathKind`) and `text.mjs` (`snippetLinks`, `codexRoster`); nothing imports back into the entry. `linkTarget`, `ignoredPaths`, `danglingLinks`, `trackedPaths`, `WIRING_SURFACES`, `PRUNE_SKIP`, `FORK_ROOTS` have no entry caller, so they stay module-private. Exports: `wiringPlan`, `wireSkills`, `auditForks`, `forkPassGaps`, `cachedForkDrift` (the entry calls each). `SUBMODULE_PATH` is not needed: `wiringPlan` takes `subPath` as a parameter.

- [x] **Archive skim** — `archive/core/` (README table row `CORE-*` → `archive/core/`): CORE-852.5 owns the wiring/fork contract and its describe block; CORE-931.2 set the facade test and `memoByKey`; CORE-931.3/.4 set the module-and-facade shape this move repeats (sed-extracted bytes, sorted line diff as the move proof).

- [x] **Drift check** — Starter matches the code and PLAN.md line. Refinement: the moved block also carries its explanatory comments; `cachedWorkflowBlock`, `TASKNOTE_README`, `AGENTS_MD` sit inside the same range but belong to `followThrough` (CORE-931.7) and stay.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumptions: the CORE-852.5 describe block pins these seams end to end through `checkAdopter` / `applyBump`, so no new pin is added unless a drift check finds an uncovered path; the memo adoption keeps the key string and the cached-promise semantics.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Basis at promotion: complete — (d) n/a
Scope at promotion: tools/update-adopters.mjs · tools/update-adopters/wiring.mjs

Size estimate: ~555 lines (rename-aware) — ~263 lines deleted from the entry (lines 263–276 and 686–934), ~275 added in the new untracked `wiring.mjs` (counted in full via `git diff --no-index`), ~20 import/re-export edits. Not a rename: the entry survives, so `-M` pairs nothing.

Phase 1→2: Discovery verdict Proceed, but the `--unattended` size estimate exceeds the 400-line cap → park `out-of-scope` before any Phase 2 write (`claude/skills/ft-task/unattended-mode.md` §"Scope guardrails" → "The Phase 1 size estimate"). On resume: run attended (the cap is unattended-only) — Phase 1 above is complete and the Subtasks are the plan; or split the move into two children (wiring, then audit forks) if it must stay unattended.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — repeats the CORE-931.3/.4 module shape: one-line header, sed-extracted bytes, named imports from sibling modules, re-export from the entry for the facade.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — the only non-move change is `cachedForkDrift` adopting `memoByKey` (planned subtask; removes the hand-rolled duplicate of the helper).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: behavior-preserving move; CORE-852.5's describe block pins the wiring/fork seams end to end and the facade test pins the export set.

**Implementation Notes:**

Resumed attended from the `out-of-scope` park (the 400-line cap is `--unattended`-only); drift check clean — every cited symbol at its recorded lines. `wiring.mjs` (265 lines) = header + imports + entry lines 263–275 and 686–933 verbatim; entry deletes those plus their trailing blanks. Exports: `wiringPlan`, `wireSkills`, `auditForks`, `forkPassGaps`, `cachedForkDrift`; the rest stay module-private. Entry drops `lstat`, `mkdir`, `readdir`, `readlink`, `stat`, `dirname`, `sep`, `cachedFlaitronTree`, and the local `codexRoster` / `snippetLinks` imports (their re-exports stay) — each unused only after this move.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — no linter covers `tools/`; `node --check` on both files

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (124/124 pass; includes `entry facade (CORE-931.2)`)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters/wiring.mjs` → 0
- `bash tools/drift-checks.sh` → 0
- Move proof (judgment): sorted removed-vs-added line diff leaves only the `export` keywords on `wireSkills` / `auditForks` / `forkPassGaps`, the `cachedForkDrift` → `memoByKey` rewrite (same key string, same never-rejecting cached promise), and the import lines. No duplication or dead code left; the hand-rolled `forkDriftCache` is gone.
- External review (`/code-review medium`, non-author context): no blockers, no finding on this diff. Notes: wiring.mjs not in CI's `node --check` list (pre-existing, filed CORE-932); `workflowPasteBlock` inner-fence bug (pre-existing, filed CORE-930); two CORE-927 "fixed" label leftovers outside this diff → filed CORE-934 (park).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change. No swept doc names the per-module files; the doc repoints are CORE-931.8's.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: nothing new for the always-loaded layer.

**Final Summary:**

Moved the updater's skill wiring (`wiringPlan`, `wireSkills`, the dangling-link prune) and audit-fork reads (`auditForks`, `forkPassGaps`, `cachedForkDrift`) into `tools/update-adopters/wiring.mjs`; the entry imports the five names it calls and re-exports `wiringPlan`. Files: `tools/update-adopters.mjs` (+4/−268), `tools/update-adopters/wiring.mjs` (new, 265 lines). Both are in the declared `touches:`. Suite 124/124, the `node --check` pair and drift checks are green; the External review found no blockers. The only change beyond the move is `cachedForkDrift` adopting `memoByKey`. Resumed attended from the `out-of-scope` park, because the cap applies only to `--unattended` runs. Maintainability: the entry drops to 938 lines and sheds its fs-walking link code.

**Archived:** 2026-11-24
