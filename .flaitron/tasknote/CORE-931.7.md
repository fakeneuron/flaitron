---
title: apply-module
status: blocked
park-reason: drift — Discovery found CORE-931.5 and CORE-931.6 both open and parked, and followThrough calls wireSkills, which 931.5 moves to wiring.mjs; moving the write path first would make apply.mjs import from the entry, a cycle. Re-scope to add Blocked by [[CORE-931.6]] to the PLAN.md row and resume after 931.5 and 931.6 land?
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

[← PLAN.md](../PLAN.md) · ⏸ Blocked · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Move the updater's write path (`fetchTimeoutMs`, `TASKNOTE_README`, `AGENTS_MD`, `cachedWorkflowBlock`, `verifyPinnedSha`, `rollbackBump`, `followThrough`, `checkoutVerified`, `applyBump`) from `tools/update-adopters.mjs` into `tools/update-adopters/apply.mjs`, behavior-preserving, leaving the entry as a thin CLI (`USAGE`, `usageError`, `parseArgs`, `reportResult`, `reportSummary`, `main`, the Node ≥20 guard, the `isMain` guard, re-exports) with its export set unchanged.

## ✅ Acceptance

- [ ] Suite — `node --test tools/update-adopters.test.mjs`
- [ ] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/apply.mjs`
- [ ] Export set unchanged; `applyBump` and `verifyPinnedSha` still importable from the entry — `entry facade (CORE-931.2)` test inside the suite above
- [ ] `FLAITRON_FETCH_TIMEOUT_MS` still read at call time — the fetch-timeout test inside the suite above
- [ ] Behavior-preserving move, never mixed with feature change — `judgment`: a sorted removed-vs-added line diff shows only `export` / import changes

## 🧩 Subtasks

- [ ] (after CORE-931.5 and CORE-931.6 land) Create `tools/update-adopters/apply.mjs` with a one-line header (931.2–.4 shape) and the moved block: `fetchTimeoutMs`, `verifyPinnedSha`, `rollbackBump`, `TASKNOTE_README`, `AGENTS_MD`, `cachedWorkflowBlock`, `followThrough`, `checkoutVerified`, `applyBump`
- [ ] apply.mjs imports `wireSkills` from `wiring.mjs` and its release/text/workspace helpers from their modules, never from the entry
- [ ] Entry: delete the moved code, import `applyBump` for `reportResult`, re-export `applyBump` and `verifyPinnedSha`, drop imports only this move made unused (likely `rmdir`, `symlink`, `writeFile`, `PIN_LINE`, `rewritePinLines`, `workflowFollowThrough`, `workflowPasteBlock`, `pathKind`, `cachedCanonicalTagSha` — confirm at the time)
- [ ] Run suite, `node --check` pair, drift checks

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

- [ ] **Pattern survey** — extended an existing pattern or justified a new shape

- [ ] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [ ] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [ ] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

## 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [ ] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [ ] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Archived:** YYYY-MM-DD
