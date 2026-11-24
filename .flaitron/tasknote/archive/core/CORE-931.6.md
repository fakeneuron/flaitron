---
title: check-module
status: completed
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/check.mjs
  - tools/update-adopters/release.mjs
blocked-by:
  - CORE-931.5
---

# CORE-931.6 | check-module

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Move `recordedGitlinkSha`, `gitlinkDrift`, `trackedLedgers` and `checkAdopter` from `tools/update-adopters.mjs` into `tools/update-adopters/check.mjs`, with gate order, inline shape and the CORE-479 comment moved verbatim, and the entry's export set unchanged.

## ✅ Acceptance

- [x] Suite — `node --test tools/update-adopters.test.mjs`
- [x] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/check.mjs`
- [x] Export set unchanged; `checkAdopter` and `gitlinkDrift` still importable from the entry — `entry facade (CORE-931.2)` test inside the suite above
- [x] Behavior-preserving move, never mixed with feature change; gate order and inline shape unchanged (CORE-479) — `judgment`: a sorted removed-vs-added line diff shows only `export` / import changes

## 🧩 Subtasks

- [x] (after CORE-931.5 lands) Create `tools/update-adopters/check.mjs` with a one-line header (931.2–.4 shape) and the moved block: `recordedGitlinkSha`, `gitlinkDrift`, `trackedLedgers`, `checkAdopter`
- [x] check.mjs imports its wiring dependencies (`wiringPlan`, `auditForks`, `forkPassGaps`, `cachedForkDrift`) from `wiring.mjs`, never from the entry
- [x] Entry: delete the moved code, import `checkAdopter` for `main`, re-export `checkAdopter` and `gitlinkDrift`, drop imports only this move made unused
- [x] Run suite, `node --check` pair, drift checks

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.5]] — `blocked-by:` predecessor (wiring-module); parked `out-of-scope`.
- [[CORE-479]] — related decision: gates left inline.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The move is still wanted, but it has a real-but-blocked prerequisite. `checkAdopter` (lines 431–616 of the entry) calls `wiringPlan` (l.589), `auditForks` (l.598), `cachedForkDrift` (l.602) and `forkPassGaps` (l.603). All four still live in the entry because CORE-931.5 (wiring-module) is parked `out-of-scope`, not landed. Moving `checkAdopter` now would make `check.mjs` import from `tools/update-adopters.mjs` while the entry imports `check.mjs`, an entry↔module cycle. 931.2 refused that shape when it held `gitlinkDrift` back. The starter's own `blocked-by: [CORE-931.5]` and its "with release, workspace and wiring already in modules" premise both assume 931.5 is done.

- [x] Read relevant source files — `tools/update-adopters.mjs` top-level map (1202 lines; moved block l.368–616), `checkAdopter`'s calls into wiring code, the CORE-931.5 parked note.

- [x] **Best Practices Review** — Dependency direction is the deciding issue: modules under `tools/update-adopters/` must not import from the entry (931.2 Discovery). Wiring has to move first, or this task has to take on wiring's move as well. That widens `touches:`, which is a Re-scope either way.

- [x] **Archive skim** — area `core` confirmed against README table (`CORE-*` → `archive/core/`). Load-bearing hits: CORE-931.2 (held `recordedGitlinkSha`/`gitlinkDrift` back to avoid a release↔workspace cycle; modules import no entry code), CORE-931.3/.4 (one-line module header shape), CORE-479 (gates stay inline, not reopened).

- [x] **Drift check** — Starter paths and names match current code: `recordedGitlinkSha` l.368, `gitlinkDrift` l.381, `trackedLedgers` l.400, `checkAdopter` l.431. Plan drift: the starter assumes wiring is already in a module, but CORE-931.5 is open and parked (`a577f53c chore: park CORE-931.5 — out-of-scope`). PLAN.md row carries no `Blocked by [[CORE-931.5]]` clause.

- [x] No clarifications needed (--fast) — assumption: the operator wants the epic's Sequential order (931.5 before 931.6) kept, not a reorder that lets check.mjs import from the entry.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Basis at promotion: complete — (d) Suite — `node --test tools/update-adopters.test.mjs` · Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/check.mjs`
Scope at promotion: tools/update-adopters.mjs, tools/update-adopters/check.mjs

Starter context absorbed into the spec sections above; the original is in git history (`f9a25f68`). Its out-of-scope list stands: no gate-array extraction (CORE-479); `applyBump` and the write path → CORE-931.7.

Discovery landed Re-scope (blocked prerequisite CORE-931.5) → under `--unattended` parks `drift` (no ⚠️ downgrade; that is a delegation the posture does not inherit).

**Size note for resume (not the formal estimate, which runs only on Proceed):** the moved block is ~249 lines (l.368–616). A cross-file move counts as delete + add, so the diff comes to about 500 lines. That is over the 400-line `--unattended` cap that parked CORE-931.5 the same way. Even once 931.5 lands, this move will park `out-of-scope` under `--unattended` unless it runs attended or is split.

**Operator's motion on resume:** add `Blocked by [[CORE-931.5]]` to the CORE-931.6 PLAN.md row, land CORE-931.5 first, then resume this note, attended or split, given the size above.

**Resume (2026-11-24, attended, `--fast` implied by the row marker):** cleared park-reason `drift`. CORE-931.5 landed at `81221c41`; the entry now imports `wiringPlan`, `auditForks`, `forkPassGaps`, `cachedForkDrift` from `wiring.mjs`, so no cycle remains. Drift check: all four symbols present, lines shifted to l.353 / 366 / 385 / 416–596. The 400-line cap is `--unattended`-only; this run is attended. The PLAN row never got a `Blocked by` clause, so there was nothing to clean up.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — the 931.2–.5 module shape: one-line header citing the entry's header, imports by module path, entry imports what `main` needs and re-exports the public names via `export … from`.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: pure move; the existing suite plus the `entry facade (CORE-931.2)` export-set pin cover it.

**Implementation Notes:**

- `tools/update-adopters/check.mjs` (265 lines): header + imports, then entry lines 351–596 copied byte-for-byte by `sed -n` (CORE-479 comment included). Only `gitlinkDrift` and `checkAdopter` are exported, as before; `recordedGitlinkSha` and `trackedLedgers` stay module-private (no other caller).
- Entry: block removed; dropped imports this move made unused (`cachedMigrationBearingTags`, `compareSemver`, `describePin`, `unresolved` from release; `auditForks`, `cachedForkDrift`, `forkPassGaps`, `wiringPlan` from wiring — `wiringPlan` still re-exported by its own `export … from`); added `import { checkAdopter }` for `main` and `export { checkAdopter, gitlinkDrift } from './update-adopters/check.mjs'`.
- `release.mjs` l.74–75: comment said `recordedGitlinkSha` lives in "the entry" → "check.mjs" (stale-doc fix; `touches:` widened by that one path).
- Entry header (l.1–194) untouched; splitting it per module is CORE-931.8.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` (the updater has no linter/type-check in the roster)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (124/124 pass, `entry facade (CORE-931.2)` included)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters/check.mjs` → 0; `node --check tools/update-adopters.test.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (all ok)
- Move judgment: sorted removed-vs-added line diff of entry + check.mjs leaves only the header line and import/export lines.
- Duplication / dead code / stale docs: none; the one stale comment (release.mjs) is fixed.
- External review: `/code-review medium` over this task's working-tree diff (check.mjs intent-to-added) — no correctness findings; 3 notes: (1) `ft-close-epic` "fixed line" label — outside this diff, already filed CORE-934; (2) `check.mjs` not in the `node --check` roster — already filed CORE-932 (all `tools/update-adopters/*.mjs`); (3) `blocked-by:` kept after resume — no change: it is a planning claim, not a gate (SPEC/blocked.md), and park-reason was the stop signal, now removed.
- Frontend 👁️: N/A — no rendered surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update — no change: no AI-referenced doc names the updater's modules; the header/SECURITY/layout/README repoint is CORE-931.8's scope.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Moved `recordedGitlinkSha`, `gitlinkDrift`, `trackedLedgers` and `checkAdopter` into `tools/update-adopters/check.mjs` unchanged; the entry keeps its export set and drops to ~686 lines. Changed: `tools/update-adopters.mjs` (+3/−252), `tools/update-adopters/check.mjs` (+265), `tools/update-adopters/release.mjs` (1-line comment). Verification: suite 124/124, `node --check` pair, drift checks all green. `touches:` reconciliation: diff = the three declared paths (release.mjs added at Phase 2 for the stale comment). Maintainability: the gate chain now sits in its own module, importing only from release/wiring/workspace, no entry cycle.

**Archived:** 2026-11-24
