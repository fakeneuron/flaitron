---
title: refactor-reconcile-gate
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: []
touches:
  - claude/skills/ft-refactor/SKILL.md
---

# CORE-877 | refactor-reconcile-gate

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Move `/ft-refactor`'s downstream-impact reconciliation scan from Step 5 (after its only gate) into Step 3, so its proposals are confirmed at the Step 4 review; under `--fast` the proposals are reported in the Step 6 hand-off and none applied.

## ✅ Acceptance

- [x] Step 3 runs the reconciliation scan and its proposals are drafted for the Step 4 review — `awk '/^## Step 3/,/^## Step 4/' claude/skills/ft-refactor/SKILL.md | grep -q 'Downstream-impact reconciliation'`
- [x] Step 4 default surfaces the proposals and the go confirms each; `--fast` applies none — `awk '/^## Step 4/,/^## Step 5/' claude/skills/ft-refactor/SKILL.md | grep -c -i 'reconcile'` ≥ 2
- [x] Step 5 no longer runs the scan; it only applies Step-4-confirmed edits (none under `--fast`) — `awk '/^## Step 5/,/^## Step 6/' claude/skills/ft-refactor/SKILL.md | grep -q 'confirmed reconcile'` and no `scan the rest of the active PLAN` there
- [x] Step 6 hand-off carries the unapplied proposals under `--fast` — `awk '/^## Step 6/,/^## Notes/' claude/skills/ft-refactor/SKILL.md | grep -q -i 'reconcile'`
- [x] Drift checks + budgets pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Step 3: add the scan bullet (scope: rest of active PLAN vs the target's surface; judgment skip)
- [x] Step 4: default — show proposals, go accepts/amends/rejects each; `--fast` — apply none, report in hand-off
- [x] Step 5 item 4: apply only Step-4-confirmed edits
- [x] Step 6: hand-off line for unapplied proposals under `--fast`
- [x] Run drift checks

## 🔗 Related

- Surfaced by audit-docs 2026-11-07 (Finding #7, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed at HEAD: `claude/skills/ft-refactor/SKILL.md` Step 5 item 4 runs the scan and says "apply only operator-confirmed edits", but Step 4 (the only gate) has already passed, and under `--fast` there is no gate at all.

- [x] Read relevant source files — `claude/skills/ft-refactor/SKILL.md`, `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation", `claude/skills/ft-open-epic/SKILL.md` Step 7 (scan proposals ride the same review prompt as candidacy), `claude/skills/ft-file-task/step-0-flags.md` (`--unattended`: "reconcile scan reports but applies nothing")

- [x] **Best Practices Review** — N/A: a prose contract edit inside one skill body; no module boundaries involved

- [x] **Archive skim** — `archive/core/` (confirmed against the README table). Hits for `ft-refactor/SKILL.md`: CORE-463.x (the skill's origin), CORE-736/738 (Step 4 cascade naming), CORE-729/730 (pin guard). None touch the Step 5 scan placement.

- [x] **Drift check** — PLAN line matches HEAD; SPEC contract says the scan "waits for explicit confirmation" and that each skill says "how it folds into the existing review gate", which `/ft-refactor` currently does not do. Codex wrapper is a pointer only, so there is no mirror to update. Body is 16,345 / 33,000.

- [x] No clarifications needed — assumptions: the scan scopes to the rest of the active PLAN (not the to-be-filed rows), same as `/ft-open-epic`; under `--fast` the hand-off lists each proposal unapplied (like the `unattended-candidates:` line), and nothing else changes.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** Precedent shape: `/ft-open-epic` Step 7 shows reconcile proposals "alongside" candidacy in the one review prompt; `/ft-file-task --unattended` "reports but applies nothing". Combining the two gives the fix.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `/ft-open-epic` Step 7 (proposals ride the one review prompt) + `/ft-file-task --unattended` ("reports but applies nothing")

- [x] **Minimal refactor gate** — no refactor; only the scan placement and its gate wiring moved

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract, no test harness for skill bodies; acceptance greps + drift checks stand in

**Implementation Notes:** Step 3 gains the scan bullet (scope widened to the drafted steps' files; new rows named by step position). Step 4 shows proposals (or "no downstream impact") with the plan; "file as proposed" accepts all, "edit first" amends/rejects and re-runs the scan when the plan changed; `--fast` applies none and lists them. Step 5 item 4 now only applies confirmed edits, substituting the resolved IDs and folding a Merge-into-child into the starter. Step 6 hand-off names unapplied proposals under `--fast`. Body 16,345 → 17,099 / 33,000.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh`

- [x] Ran lint/type-check on changed code — N/A: markdown only; drift checks cover final newline/budgets

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: not frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (after review fixes): A1 Step 3 grep → 0 · A2 Step 4 reconcile count → 2 · A3 Step 5 `confirmed reconcile` → 0, old scan text absent → 1 (expected) · A4 Step 6 grep → 0 · A5 `bash tools/drift-checks.sh` → 0.

External review (`/code-review medium`, this diff only): 10 notes, no blockers. Fixed: (1) proposals predate the epic ID → name new rows by step position, Step 5 substitutes IDs; (2) scan scope → target or any drafted step's files; (3) "edit first" re-runs the scan when the plan changed; (4) per-proposal answer → "file as proposed" accepts all, "edit first" amends/rejects; (5) "rest of the active PLAN" → "the active PLAN"; (6) "no downstream impact" shown at Step 4; (8) Merge-into-child also lands in the starter; (10) rewrapped the long spliced line. No change: (7) `--fast` hand-off-only listing is the PLAN line's chosen design; (9) the §"Skill bodies" ledger is re-measured at release, not per task.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: `SPEC/tasknote-selection.md` defers placement to each skill's steps; GLOSSARY / gate-postures don't describe the scan's step; Codex wrapper is a pointer

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:** `/ft-refactor`'s reconciliation scan now drafts in Step 3 and is confirmed at the Step 4 review; Step 5 only applies confirmed edits, and `--fast` applies none, listing them in the hand-off. Changed: `claude/skills/ft-refactor/SKILL.md` (matches `touches:`). Verification: all acceptance greps + drift checks green.

**Archived:** 2026-11-08
