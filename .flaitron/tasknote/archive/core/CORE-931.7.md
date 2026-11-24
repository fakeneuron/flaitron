---
title: apply-module
status: completed
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/apply.mjs
blocked-by:
  - CORE-931.6
---

# CORE-931.7 | apply-module

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Move the updater's write path (`fetchTimeoutMs`, `TASKNOTE_README`, `AGENTS_MD`, `cachedWorkflowBlock`, `verifyPinnedSha`, `rollbackBump`, `followThrough`, `checkoutVerified`, `applyBump`) from `tools/update-adopters.mjs` into `tools/update-adopters/apply.mjs`, behavior-preserving, leaving the entry as a thin CLI (`USAGE`, `usageError`, `parseArgs`, `reportResult`, `reportSummary`, `main`, the Node ≥20 guard, the `isMain` guard, re-exports) with its export set unchanged.

## ✅ Acceptance

- [x] Suite — `node --test tools/update-adopters.test.mjs`
- [x] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/apply.mjs`
- [x] Export set unchanged; `applyBump` and `verifyPinnedSha` still importable from the entry — `entry facade (CORE-931.2)` test inside the suite above
- [x] `FLAITRON_FETCH_TIMEOUT_MS` still read at call time — the fetch-timeout test inside the suite above
- [x] Behavior-preserving move, never mixed with feature change — `judgment`: a sorted removed-vs-added line diff shows only `export` / import changes

## 🧩 Subtasks

- [x] (after CORE-931.5 and CORE-931.6 land) Create `tools/update-adopters/apply.mjs` with a one-line header (931.2–.4 shape) and the moved block: `fetchTimeoutMs`, `verifyPinnedSha`, `rollbackBump`, `TASKNOTE_README`, `AGENTS_MD`, `cachedWorkflowBlock`, `followThrough`, `checkoutVerified`, `applyBump`
- [x] apply.mjs imports `wireSkills` from `wiring.mjs` and its release/text/workspace helpers from their modules, never from the entry
- [x] Entry: delete the moved code, import `applyBump` for `reportResult`, re-export `applyBump` and `verifyPinnedSha`, drop imports only this move made unused (likely `rmdir`, `symlink`, `writeFile`, `PIN_LINE`, `rewritePinLines`, `workflowFollowThrough`, `workflowPasteBlock`, `pathKind`, `cachedCanonicalTagSha` — confirm at the time)
- [x] Run suite, `node --check` pair, drift checks

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.6]] — `blocked-by:` predecessor (check-module); parked `drift` on CORE-931.5.
- [[CORE-931.5]] — wiring-module; owns `wireSkills`, which `followThrough` calls; parked `out-of-scope`.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The move is still wanted, but it has a real-but-blocked prerequisite. `followThrough` (entry l.940) calls `wireSkills` (l.974; defined l.826), which CORE-931.5 moves to `wiring.mjs`. 931.5 is parked `out-of-scope` and 931.6, this note's declared `blocked-by:`, is parked `drift` behind it. Moving the write path now would make `apply.mjs` import `wireSkills` from `tools/update-adopters.mjs` while the entry imports `apply.mjs` — the entry↔module cycle 931.2 and 931.6 both refused. The starter's "Last code move" framing and its `blocked-by: [CORE-931.6]` both assume the earlier moves have landed.

- [x] Read relevant source files — `tools/update-adopters.mjs` top-level map (1202 lines; moved block at l.277–282, l.613–690, l.935–1045), `followThrough`'s call into `wireSkills`, the CORE-931.5 / CORE-931.6 parked notes.

- [x] **Best Practices Review** — Dependency direction decides it: modules under `tools/update-adopters/` import no entry code (931.2 Discovery). Alternatives that dodge the cycle (inject `wireSkills` through `ctx`, or move `wireSkills` here) change shape or widen `touches:` into 931.5's scope — either is a Re-scope, not a behavior-preserving move.

- [x] **Archive skim** — area `core` confirmed against README table (`CORE-*` → `archive/core/`). Load-bearing hits: CORE-931.2 (modules import no entry code; held `gitlinkDrift` back to avoid a cycle), CORE-931.3/.4 (one-line module header shape). The parked CORE-931.6 note records the same blocker one step earlier.

- [x] **Drift check** — Starter names all match current code: `fetchTimeoutMs` l.279, `verifyPinnedSha` l.617, `rollbackBump` l.635, `TASKNOTE_README`/`AGENTS_MD` l.675–676, `cachedWorkflowBlock` l.681, `followThrough` l.940, `checkoutVerified` l.981, `applyBump` l.1000; `isMain` l.1193. Plan drift: 931.5 (`a577f53c`) and 931.6 (`444672c3`) are parked, not landed; the PLAN.md row carries no `Blocked by [[ID]]` clause.

- [x] No clarifications needed (--fast) — assumption: the operator wants the epic's Sequential order (931.5 → 931.6 → 931.7) kept, not a reorder or a `ctx`-injection workaround.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Basis at promotion: complete — (d) Suite — `node --test tools/update-adopters.test.mjs` · Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/apply.mjs`
Scope at promotion: tools/update-adopters.mjs, tools/update-adopters/apply.mjs

Starter context absorbed into the spec sections above; the original is in git history (`f9a25f68`). Its locked decision stands: report printers stay in the entry (`reportResult` calls `applyBump` across the boundary). Out of scope stays: header split and doc pointers → CORE-931.8; the untested rollback-incomplete residue branch moves whole.

Discovery landed Re-scope (blocked prerequisite CORE-931.5, via CORE-931.6) → under `--unattended` parks `drift` (no ⚠️ downgrade; that is a delegation the posture does not inherit).

**Size note for resume (not the formal estimate, which runs only on Proceed):** the moved block is ~195 lines. A cross-file move counts as delete + add, so with import and re-export edits the diff comes to roughly 400–420 lines — at or just over the 400-line `--unattended` cap. Expect an `out-of-scope` park under `--unattended` even after 931.5 and 931.6 land; run it attended or split it (e.g. `rollbackBump` + `verifyPinnedSha` + `checkoutVerified` first).

**Operator's motion on resume:** add `Blocked by [[CORE-931.6]]` to the CORE-931.7 PLAN.md row, land CORE-931.5 and CORE-931.6 first, then resume this note — attended or split, given the size above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — the 931.2–.6 module shape: one-line header citing the entry's header, sibling-module imports only, entry imports what it calls and re-exports public names via `export … from`.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: pure move; the existing suite plus the `entry facade (CORE-931.2)` export-set pin cover it.

**Implementation Notes:**

- Resumed from the `drift` park: CORE-931.5 (`81221c41`) and CORE-931.6 (`b77cbc14`) have landed, so `wireSkills` is in `wiring.mjs` and the cycle is gone. Drift check: every cited symbol present; line numbers moved (entry 689 lines; block at l.260–265 and l.349–531). PLAN row never carried a `Blocked by` clause, so there is nothing to clean up there.
- `tools/update-adopters/apply.mjs` (207 lines): header + imports, then entry l.260–266 and l.349–531 copied byte-for-byte by `sed -n`. Exports stay as before (`verifyPinnedSha`, `applyBump`); the rest are module-private.
- Entry: block removed; dropped the whole `node:fs/promises` import plus `join`, `cachedCanonicalTagSha`, `cachedFlaitronFile`, `git`, `gitErrorLine`, `isUnresolved`, all four `text.mjs` imports, `FLAITRON_DIR`, `pathKind` and the `wireSkills` import; added `import { applyBump }` for `reportResult` and `export { applyBump, verifyPinnedSha } from './update-adopters/apply.mjs'`. Entry now 498 lines.
- Review nit fixed: `applyBump`'s "see \"Commit contract\" above" now points to `../update-adopters.mjs`'s header.
- Entry header (l.1–194) untouched; splitting it per module is CORE-931.8.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` (the updater has no linter/type-check in the roster)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (124/124 pass, `entry facade (CORE-931.2)` and the fetch-timeout test included)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters/apply.mjs` → 0; `node --check tools/update-adopters.test.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (all ok)
- Move judgment: sorted removed-vs-added line diff of entry + apply.mjs leaves only the header line, import/export lines and two blank separators.
- Duplication / dead code / stale docs: none left; the one stale comment (the review nit) is fixed.
- External review: `/code-review medium` over this task's working-tree diff (apply.mjs intent-to-added) — no correctness findings; 1 nit fixed (stale "Commit contract above" pointer); 1 pre-existing note outside this diff (`ft-close-epic` "fixed line" labels) — already filed as CORE-934.
- Frontend 👁️: N/A — no rendered surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update — no change: no AI-referenced doc names the moved functions' location; the header/SECURITY/layout/README repoint is CORE-931.8's scope.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Moved the updater's write path (`fetchTimeoutMs`, `verifyPinnedSha`, `rollbackBump`, `TASKNOTE_README`, `AGENTS_MD`, `cachedWorkflowBlock`, `followThrough`, `checkoutVerified`, `applyBump`) into `tools/update-adopters/apply.mjs` unchanged; the entry keeps its export set and drops from 689 to 498 lines. Changed: `tools/update-adopters.mjs` (+3/−207), `tools/update-adopters/apply.mjs` (+207). Verification: suite 124/124, `node --check` pair, drift checks all green. `touches:` reconciliation: diff = the two declared paths. Maintainability: the entry is now just the CLI (usage, args, report printers, `main`); every module imports only siblings, no entry cycle.

**Archived:** 2026-11-24
