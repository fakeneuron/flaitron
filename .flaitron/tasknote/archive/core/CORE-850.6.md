---
title: caller-contract
status: completed
tags: [unattended, external-agents, worktrees, contract]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-850.1, CORE-850.2, CORE-850.5, CORE-843]
touches:
  - docs/EXTERNAL-AGENTS.md
  - docs/WORKTREES.md
  - SPEC/model.md
  - ~/Code/caobunga/.flaitron/PLAN.md
blocked-by:
  - CORE-850.5
---

# CORE-850.6 | caller-contract

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-850]]

## 🎯 Goal

Publish the caller side of unattended readiness in `docs/EXTERNAL-AGENTS.md`: dispatch each operator-less run in its own `wt-<ID>` worktree, state the caller's runner cap, and add stable-surface rows for the readiness basis, the `out-of-scope` code, and the park-prose question convention; note in `docs/WORKTREES.md` that a starter copies like an active note; file the Caobunga caller row in the same closure.

## ✅ Acceptance

- [x] Orchestration contract carries a dispatch-isolation step naming `wt-<ID>` and `docs/WORKTREES.md`, with the single-checkout consequence stated — `grep -q 'wt-<TASK-ID>' docs/EXTERNAL-AGENTS.md && grep -qi 'single checkout' docs/EXTERNAL-AGENTS.md`
- [x] Runner cap stated as the caller's in the orchestration contract and in one `SPEC/model.md` sentence — `grep -qi 'runner cap' docs/EXTERNAL-AGENTS.md && grep -qi 'runner cap' SPEC/model.md`
- [x] Stable-surface rows for the readiness basis, `out-of-scope`, and the park-prose question convention, each naming an owner that exists — `grep -c '^| Readiness basis\|^| Park-prose question' docs/EXTERNAL-AGENTS.md` → 2, `out-of-scope` named in the `park-reason:` row; owner sections checked by `bash tools/drift-checks.sh pair_q`
- [x] `docs/WORKTREES.md` start half notes a starter note copies like an active one, and the operator-less dispatch use — `grep -qi 'starter' docs/WORKTREES.md`
- [x] Pair Q and the full drift-check set green — `bash tools/drift-checks.sh`
- [x] Caobunga row filed in `~/Code/caobunga/.flaitron/PLAN.md` and named in the Final Summary — `grep -q 'CBN-448' ~/Code/caobunga/.flaitron/PLAN.md`

## 🧩 Subtasks

- [x] EXTERNAL-AGENTS: append orchestration steps 10 "Dispatch each run in its own worktree" (single-checkout consequence) and 11 runner cap; no renumbering (external step-number citations)
- [x] EXTERNAL-AGENTS: step 4 / `park-reason:` row name `out-of-scope`; add Readiness basis and Park-prose question rows
- [x] SPEC/model.md: one runner-cap sentence
- [x] WORKTREES: starter-copies note in the start half; operator-less dispatch carve-out in "When to reach for a worktree"
- [x] Run drift checks; budgets
- [x] Phase 4: file CBN-448 in Caobunga PLAN (commit there, local only)

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-850.1]] — Discovery: `.6` scope, decisions 8 (worktree per dispatch), 9 (runner cap), 11 (Caobunga repo)
- [[CORE-850.2]] — readiness basis (`SPEC/unattended-candidacy.md` §"Readiness basis")
- [[CORE-850.5]] — `out-of-scope` code and park-prose convention (`SPEC/blocked.md`)
- [[CORE-843]] — lone-park commit; the residual dirty-park stall this routes to worktrees

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.5` closed and explicitly deferred EXTERNAL-AGENTS step 4 and the `out-of-scope` / question-prose rows to this child. Every surface the rows point at exists at HEAD (`SPEC/unattended-candidacy.md` §"Readiness basis", `SPEC/blocked.md` §"Park reason" with `out-of-scope` and the "prose states the question" paragraph). Nothing in EXTERNAL-AGENTS yet states the worktree dispatch or runner cap.

- [x] Read relevant source files — `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `SPEC/model.md` (frontier/heavy bands, §"Pinning a named model"), `SPEC/blocked.md` §"Park reason", `SPEC/unattended-candidacy.md` §"Readiness basis", `docs/PLATFORMS.md` calibration table rows, Caobunga `PLAN.md` + `models.py` park_reason docstring

- [x] **Best Practices Review** — N/A: doc contract edits; the one structural rule is EXTERNAL-AGENTS's "each row names its canonical owner and copies nothing", which the new rows follow.

- [x] **Archive skim** — area `archive/core/` (README table). The epic's own notes cover the in-scope paths: `CORE-850.1` (decisions 8, 9, 11; `.6` deliverable spec), `CORE-850.4` (left WORKTREES to `.6`), `CORE-850.5` (deferred step 4 + rows here), `CORE-843` (lone-park commit leaves only the partial-Phase-2 dirt case to stall a queue).

- [x] **Drift check** — PLAN line matches `.1`'s `.6` spec. Two refinements vs. the PLAN line, both inside its scope: (1) `.1` also names one `SPEC/model.md` sentence for the cap — included in `touches:`; (2) WORKTREES §"When to reach for a worktree" says "Do not use for: Single-task work", which contradicts per-dispatch worktrees — a one-line carve-out is needed beside the starter note. PLATFORMS bands: heavy = Opus @ high, Sol @ high, Grok @ xhigh; frontier = Fable, Astra (+ `mythos`). Caobunga: tree clean, highest ID CBN-447 → next CBN-448; its `park_reason` is a plain string, so `out-of-scope` breaks no enum, but nothing there branches on it or dispatches in worktrees yet (`docs/CONTRACT.md` names linked worktrees only in the run-mutex).

- [x] No clarifications needed. Assumptions: model families named as PLATFORMS bands them (Opus / Sol / Grok heavy-ceiling; Fable / Mythos / Astra frontier); the new steps append as 10 (dispatch isolation) and 11 (runner cap) rather than renumbering — revised at Phase 2 entry: `unattended-mode.md`, the seeder SKILL, and `SPEC/unattended-candidacy.md` cite EXTERNAL-AGENTS steps 2 and 6 by number, and callers may too; the Caobunga row is committed in Caobunga as `chore: file CBN-448 — …`, local only, never pushed.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Worktree dispatch scope: closure commit lands on `wt-<ID>`; the caller merges via the end half. Rotation is skipped in a linked worktree (WORKTREES §"Relationship"). A row with no tasknote yet scaffolds inside the worktree, so the `cp` applies only when a note (active or starter) exists.
- The stall is narrower after CORE-843: a park whose note is the only dirt commits itself; a park mid-Phase-2 with partial edits leaves dirt the next run's foreign-dirt gate refuses. The worktree confines that dirt.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing orchestration-step list and stable-surface table shapes (each row names its owner, copies nothing); WORKTREES gets a bold-led paragraph matching its prose style.

- [x] **Minimal refactor gate** — no refactor; append-only steps to preserve external step-number citations.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown contract only; drift checks are the gate.

**Implementation Notes:**

- `docs/EXTERNAL-AGENTS.md`: step 10 (worktree per dispatch; single-checkout consequence; fast-forward-only caller landing, non-ff landing is the operator's end half; outcome lives on the branch until it lands, no re-dispatch while `wt-<ID>` exists; rotation caveat), step 11 (runner cap, caller-owned, exclusion of frontier models by name); step 4 names `out-of-scope` and the display-only prose convention; table rows `park-reason:` (+`out-of-scope`), Park-prose question, Readiness basis; Isolating-agents and Relationship sections point at step 10.
- `SPEC/model.md` §"Pinning a named model": one sentence — gate never caps what a caller launches; cap lives in the orchestration contract.
- `docs/WORKTREES.md`: operator-less dispatch exception with its three differing readings (no note → skip `cp`; open `blocked-by` → decline dispatch; parked worktree may outlive the long-lived rule); starter copies like an active note; Relationship bullet updated.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (all checks incl. pair_q, budgets)

- [x] Ran lint/type-check on changed code — N/A: no code; markdown final-newline / budgets covered by drift checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (after review fixes):
- `bash tools/drift-checks.sh` → 0 (no non-ok line; pair_q ok)
- `grep -q 'wt-<TASK-ID>' docs/EXTERNAL-AGENTS.md && grep -qi 'single checkout' docs/EXTERNAL-AGENTS.md` → 0
- `grep -qi 'runner cap' docs/EXTERNAL-AGENTS.md && grep -qi 'runner cap' SPEC/model.md` → 0
- `grep -c '^| Readiness basis\|^| Park-prose question' docs/EXTERNAL-AGENTS.md` → 2; `grep -q '^| \`park-reason:\`.*out-of-scope' docs/EXTERNAL-AGENTS.md` → 0
- `grep -qi 'starter' docs/WORKTREES.md` → 0
- `grep -q 'CBN-448' ~/Code/caobunga/.flaitron/PLAN.md` → 0

External review (`/code-review medium`, working-tree diff) — 9 findings, all **notes** (no Acceptance criterion failed), all fixed in place:
1. Rotation never runs if every close is a worktree close → step 10 states it, citing plan-filing §"`## Completed` rotation". Fixed.
2. Non-fast-forward landing would need a caller merge commit (step 9) → caller lands fast-forward only; a merge is the operator's end half. Fixed.
3. Cap named models loosely vs. PLATFORMS bands (Sol/Grok moderate at default; Astra heavy at medium) → "families whose ceiling is the heavy band"; frontier models excluded by name at any effort (per `.1` decision 3 and the `.3` note). Fixed in both docs.
4. Readiness-basis row omitted heavy-tier name pins and assumed the note stays `starter` → both covered. Fixed.
5. WORKTREES carve-out claimed "procedure unchanged" while preconditions differ → three differing readings listed. Fixed.
6. Outcome invisible on main until landing; re-dispatch risk → step 10 says read it on the branch, never re-dispatch while `wt-<ID>` exists. Fixed.
7. Tasknote assumption still described a renumbering → revised. Fixed.
8. WORKTREES Relationship bullet parallel-only → updated. Fixed.
9. "newest member" time-relative wording → "The set includes". Fixed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: `.flaitron/tasknote/README.md` (WORKTREES entry names operator-less dispatch). Deliverables themselves: `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`. No change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md` (bands cited, not changed), `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/VISION.md` (worktree dispatch is caller-side; no runtime added).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-31.` stub (epic child, nested under parent), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — Contract docs cited by step number elsewhere should append new steps, not renumber; N/A for the always-loaded layer.

**Final Summary:**

The caller contract for unattended readiness is published. `docs/EXTERNAL-AGENTS.md` gains orchestration step 10 (dispatch every operator-less run in its own `wt-<ID>` worktree, with the single-checkout stall consequence, fast-forward-only caller landing, and the rotation caveat) and step 11 (the runner cap is the caller's: heavy-ceiling families at effort up to `xhigh`, never a frontier model by name). Step 4 and three stable-surface rows cover `out-of-scope`, the park-prose question convention, and the readiness basis. `SPEC/model.md` carries one cap sentence. `docs/WORKTREES.md` admits operator-less dispatch as an exception and notes a starter note copies like an active one. The Caobunga caller row **CBN-448** (`flaitron-caller-contract`) is filed in `~/Code/caobunga/.flaitron/PLAN.md` under `## Medium`.

Recap: changed files: `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `SPEC/model.md`, `.flaitron/tasknote/README.md`, `.flaitron/PLAN.md`, this note; cross-repo `~/Code/caobunga/.flaitron/PLAN.md`. Verification: drift checks green, six Acceptance greps exit 0. `touches:` reconciliation: matches declared, plus `.flaitron/tasknote/README.md` (doc-drift sweep) and workflow files. Maintainability: steps appended so existing step-number citations stay valid.

**Archived:** 2026-10-31
