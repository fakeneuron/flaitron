---
title: check-module
status: blocked
park-reason: drift — Discovery found CORE-931.5 still open (parked out-of-scope), and checkAdopter calls wiringPlan, auditForks, forkPassGaps and cachedForkDrift, which 931.5 moves to wiring.mjs; moving it first would make check.mjs import from the entry, a cycle. Re-scope to add Blocked by [[CORE-931.5]] to the PLAN.md row and resume after 931.5 lands?
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/check.mjs
blocked-by:
  - CORE-931.5
---

# CORE-931.6 | check-module

[← PLAN.md](../PLAN.md) · ⏸ Blocked · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Move `recordedGitlinkSha`, `gitlinkDrift`, `trackedLedgers` and `checkAdopter` from `tools/update-adopters.mjs` into `tools/update-adopters/check.mjs`, with gate order, inline shape and the CORE-479 comment moved verbatim, and the entry's export set unchanged.

## ✅ Acceptance

- [ ] Suite — `node --test tools/update-adopters.test.mjs`
- [ ] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/check.mjs`
- [ ] Export set unchanged; `checkAdopter` and `gitlinkDrift` still importable from the entry — `entry facade (CORE-931.2)` test inside the suite above
- [ ] Behavior-preserving move, never mixed with feature change; gate order and inline shape unchanged (CORE-479) — `judgment`: a sorted removed-vs-added line diff shows only `export` / import changes

## 🧩 Subtasks

- [ ] (after CORE-931.5 lands) Create `tools/update-adopters/check.mjs` with a one-line header (931.2–.4 shape) and the moved block: `recordedGitlinkSha`, `gitlinkDrift`, `trackedLedgers`, `checkAdopter`
- [ ] check.mjs imports its wiring dependencies (`wiringPlan`, `auditForks`, `forkPassGaps`, `cachedForkDrift`) from `wiring.mjs`, never from the entry
- [ ] Entry: delete the moved code, import `checkAdopter` for `main`, re-export `checkAdopter` and `gitlinkDrift`, drop imports only this move made unused
- [ ] Run suite, `node --check` pair, drift checks

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
