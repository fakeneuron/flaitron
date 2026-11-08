---
title: release-midcut-defect-ask
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: [CORE-893, CORE-892]
touches:
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - CORE-894
# parallel-safe-with:
#   - CORE-894
# supersedes:
#   - CORE-894
---

# CORE-894 | release-midcut-defect-ask

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-893]]

## 🎯 Goal

Extend the release stop-or-continue decision to defects discovered anywhere mid-cut, within the existing context budget.

## ✅ Acceptance

- [x] Any pre-publication mid-cut defect reaches a shared severity policy when discovered, including dogfood and audit defects — judgment: trace representative scenarios through the recipe.
- [x] Medium/Low cannot be silently fixed, filed, or deferred; Stop and Release anyway retain explicit outcomes and uncertain replies stop; Critical/High and existing hard gates cannot be bypassed — judgment: inspect the changed policy and callers.
- [x] Expected advisories and post-publication reporting retain their existing posture — judgment: compare adjacent rules.
- [x] Skill body stays below its prior 38,100 bytes without raising caps; drift checks pass — `wc -c claude/skills/ft-release/SKILL.md`; `bash tools/drift-checks.sh`.

## 🧩 Subtasks

- [x] Consolidate severity/decision policy and route the docs audit and dependency audit to it.
- [x] Verify scenario behavior, budget, drift, and external review; close atomically.

## 🔗 Related

- [[CORE-893]] — motivating dogfood render-outcome gap; stays separate.
- [[CORE-892]] — release that surfaced the gap.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The audit-only gap remains in the current release recipe.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Clean entry tree; no active, archived, or sidequest collision. CORE maps to archive/core. `[heavy]` satisfied by this session.
- No clarifications needed. Assumption: generalize the existing severity policy; preserve expected named advisories and post-publication reporting. CORE-893 remains a separate repair.
- Source read: release body, dogfood/SOP fragment, Codex wrapper (direct canonical-body routing), budget policy, SPEC phases/gates/tasknote selection. Best Practices Review: N/A, prose recipe only; one shared decision avoids drift.
- Archive probe: CORE-689 established no-default Stop/Release anyway, uncertainty=Stop, and filing alone insufficient; CORE-684 motivated it. CORE-892 confirms the dogfood incident. CORE-891 keeps release's 95% warning; CORE-507 notes splitting defers load rather than removes it. No archived factual claim is falsified; the old narrower scope was intentional.
- Drift: §6.2 also permitted high/critical follow-up without fixing, so route it through the shared severity policy. This is within the filed any-defect scope. Expected SOP/global/rotation/majors advisories retain their dispositions. No other open row is changed or subsumed; CORE-893 unaffected.
- Phase 1 exit: default-skip, no material deviation or scope-changing clarification; proceed with the planned shared policy.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Added a shared eager policy above Step 0, replacing §7.1's duplicate decision text with a caller. §6.2 now routes dependency findings through it, so High/Critical cannot ship merely by filing.
- Medium/Low asks before fixing or filing; Stop repairs and re-runs in this tree; Release anyway records follow-up IDs (reusing existing rows). New defects require fresh decisions. Blocking checks cannot be waived.
- Minimal refactor: only the decision text was consolidated, needed to avoid two diverging severity policies and offset load. No new fragment, cap increase, or unrelated cleanup.
- Tests: no automated prose-mirroring tests added. Scenario review and repository drift checks decide this instruction-only change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → 0. All checks pass. Expected NEAR CAP advisories: release body 38,018/40,000; directory 107,872/113,000 after the review fix; ft-task SOP 24,896/26,000.
- `wc -c claude/skills/ft-release/SKILL.md` → 0, 38,018 bytes (prior 38,100; −82).
- `git diff --check` → 0.
- Scenario review (judgment):
  - Dogfood Medium gap with existing CORE-893: immediate ask; existing row is no authorization. Stop keeps cut held for repair/re-check; Release anyway reuses the row and records the decision.
  - Docs Medium: §7.1 caller holds before standing checks/§7.2; uncertain answer stops; no silent inline absorption.
  - High dependency finding: §6.2 fixes and verifies, otherwise stops; no filing bypass. High reduced to Medium enters the ask.
  - New defect after Release anyway: new decision required; no blanket approval.
  - Explicitly blocking standing check: Release anyway cannot waive it.
  - Expected stale SOP/global wiring/rotation/majors/NEAR CAP: named advisory disposition survives; a defect in the checking procedure itself enters the policy.
  - Post-publication CI/install failure: Step 8 still reports rather than reopening the cut.
- Code lint/typecheck and structural code assertions: N/A, prose-only recipe. Visual confirmation: N/A, no rendered surface.
- External review: no blockers. One note: standing-checks archive-hygiene wording directly authorized filing. Fixed by routing it explicitly through the shared decision. Scope expanded by that one fragment for caller consistency; no unrelated repair.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed 2026-11-08.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep (each declared doc):
- README.md — no change; no public release-entry change.
- AGENTS.md — no change; workflow roster unchanged.
- SPEC.md — no change; existing recipe-wait/two-banner contract preserved.
- docs/MIGRATION.md — no change; no adopter action.
- claude/AGENTS-snippet.md — no change; adopter wiring unchanged.
- codex/AGENTS-snippet.md — no change; wrapper still loads canonical release body.
- cursor/AGENTS-snippet.md — no change.
- grok/AGENTS-snippet.md — no change.
- docs/CONVENTIONS.md — no change; release audit cadence unchanged.
- CONTRIBUTING.md — no change; audit invocation unchanged.
- SECURITY.md — no change; no trust-boundary change.
- docs/AGENT-NEUTRALITY.md — no change; existing AskUserQuestion translation applies.
- docs/PLATFORMS.md — no change; named advisory posture preserved.
- claude/CAPABILITIES.md — no change; no version bump.
- docs/AGENT-COMPAT.md — no change; CORE-893 owns render-outcome repair.
- docs/EXTERNAL-AGENTS.md — no change; no stable surface moved.
- docs/WORKTREES.md — no change.
- docs/VISION.md — no change; no new validator or standing gate.

Learnings: N/A for always-loaded docs; the release-local rule lives at its point of use.

**Final Summary:**

The release recipe now routes defects discovered anywhere before publication through one severity and Stop/Release anyway policy. The docs audit, dependency audit, and archive-hygiene follow-up caller share it; expected advisories and post-publication reporting retain their existing posture.

Recap: changed two recipe files (+40/−18 lines), no code. Scenario review covers dogfood, audit, dependency, repeated/new defects, blocking checks, advisories, and post-publication failures. `bash tools/drift-checks.sh` and `git diff --check` pass; body 38,018 bytes, 82 below entry size, with no cap increase. Independent review: no blockers, one consistency note fixed. Consolidation is the only refactor, keeping the decision in one place; broader cleanup deferred as out of scope. Declared 2 deliverable files, changed 2; undeclared: none (tasknote/PLAN excluded). No deferred operator step. Proposed commit: `fix: CORE-894 — ask on mid-cut defects`.


**Archived:** 2026-11-08
