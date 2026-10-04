---
title: paper-complete guard
status: completed
tags: []
created: 2026-07-16
due:
related-tasks: []
---

# CORE-358 | paper-complete guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 —

## 🎯 Goal

Close the paper-complete hole: require a commit that lands deliverables before PLAN/archive mark Completed; gate foreign dirt at task start; ban collateral Completed flips; 🏁 only with a deliverable-covering SHA.

## ✅ Acceptance

- [x] SPEC.md (and gates/glossary as needed) define the paper-complete guard: foreign-dirt hard stop at task start; atomic single-commit closure; no collateral Completed flips; 🏁 only after a real SHA whose paths cover Acceptance deliverables (workflow-only carve-out for pure PLAN/archive tasks)
- [x] `SPEC/procedures/ft-task.md` operationalizes the guard (entry dirt check + closure/🏁 rules)
- [x] `/ft-task` SKILL implements the executable checks; peer runners that restate closure (micro/debug/goal/close-epic/epic-discovery) carry the same rules or an explicit cite
- [x] Grok/Codex pointers remain pointer-only (no restatement) — procedure update covers them
- [x] No general git UX (no stash automation, no interactive clean, no multi-repo tools) — status check + hard stop + commit path validation only
- [x] Closing commit for this task itself lands the contract deliverables under the new rules (no paper-complete of the guard)

## 🧩 Subtasks

- [x] Populate SPEC.md Phase 4 + Post-closure (+ entry gate) with paper-complete contract; gates.md 🏁 note if needed; GLOSSARY term
- [x] Update `SPEC/procedures/ft-task.md` (foreign-dirt at open; closure/🏁 deliverable-covering SHA; collateral ban)
- [x] Update `claude/skills/ft-task/SKILL.md` Steps 2 / 5 Phase 4 / 6
- [x] Update peer skills: ft-micro-task, ft-debug, ft-goal-task, ft-close-epic, ft-epic-discovery
- [x] Grep-verify no leftover "flip then imply complete without commit" language; Phase 3 notes
- [x] Close under the new rules (deliverable-covering SHA)

## 🔗 Related

- InvisiPaw FE-64 (2026-07-15) — paper-complete without deliverable commit; densify lost (external provenance)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Real hole (InvisiPaw FE-64): PLAN/archive marked Completed with no deliverable commit; uncommitted work discarded. Scope is contract-only (SPEC+procedures+skills), not general git UX.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Incident (external)
InvisiPaw FE-64 (2026-07-15): Phase 4 flipped PLAN + archived tasknote; **no deliverable commit ever landed**; uncommitted densify discarded before CORE-100.x. Provenance: `InvisiPaw/.flowtron/tasknote/archive/frontend/FE-64.reopen-provenance-2026-07-15.md`. Filed here as CORE-358 2026-07-16.

### Current hole (flowtron HEAD)
1. Phase 4 **writes** PLAN Completed + archive **before** commit; post-closure then commits. If session ends / commit skipped / only workflow paths staged, PLAN can read "done" without deliverables in git.
2. 🏁 may be emitted without verifying the SHA covers Acceptance surfaces.
3. No task-start dirt gate — foreign WIP can mix into closure or be discarded.
4. Nothing forbids flipping other tasks' PLAN lines during closure (collateral Completed).

### Operator clarifications (2026-07-16)
| Topic | Choice |
|---|---|
| Ordering | **Atomic single commit** — deliverables + PLAN flip + archive together; never flip without deliverables staged; never 🏁 until commit succeeds |
| Foreign dirt | **Hard stop** if `git status --porcelain` non-empty at task entry |
| 🏁 SHA | Commit paths must cover Acceptance deliverable surfaces; pure workflow-only tasks may be PLAN+archive alone |
| Surfaces | All tasknote runners + SPEC + procedure |

### Explicit assumptions
- Foreign-dirt gate fires at skill entry **before** scaffold/promote/execute writes (ft-task / micro / debug / goal / epic-discovery / close-epic). Same-conversation continue is out of band (start-only skills).
- Blocked-resume with WIP: hard stop still applies — operator commit/stash/discard first (no general stash UX).
- Close-epic parent-flip remains the only multi-line PLAN flip, and only under 📦 bundled approval (not "collateral").
- No version bump in this task — contract ships with next release; `last-verified` on procedure SOP updates.
- Grok/Codex wrappers are pointer-only; updating `SPEC/procedures/ft-task.md` is sufficient for those agents.
- Archive skim: prior post-closure / gate work (CORE-254.x, CORE-250, CORE-038 skill trim, CORE-301.x procedures) established flip-then-commit and cue vocabulary; none closed the paper-complete hole. No path renames contradicting this task.
- Drift: PLAN cites no line numbers; surfaces still SPEC.md Phase 4 / Post-closure, SPEC/gates.md, SPEC/procedures/ft-task.md, claude/skills/ft-task (+ peers). No drift.

### Out of scope
General git UX, amend policies beyond "atomic single commit", CI enforcement, auto-stash, multi-worktree dirt scanners.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern:** extend existing post-closure / gate contract shape (SPEC § + procedures + skills cite) rather than a new subsystem or general git tool.
- **SPEC.md:** new §"Paper-complete guard" (foreign-dirt entry gate; atomic single-commit closure; collateral ban; 🏁 deliverable-covering SHA); Phase 4 + Post-closure pointers.
- **SPEC/gates.md:** 🏁 vocabulary row notes paper-complete requirement.
- **SPEC/procedures/ft-task.md:** operational foreign-dirt + closure/🏁; last-verified → v5.12.0 · 2026-07-16.
- **Skills:** `ft-task`, `ft-micro-task`, `ft-debug`, `ft-goal-task`, `ft-close-epic`, `ft-epic-discovery` — entry dirt hard stop + closure/🏁 rules. Grok/Codex remain pointer-only (covered by procedure).
- **docs/GLOSSARY.md:** `paper-complete` term + 🏁 note.
- No tests (contract markdown only). No general git UX.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Markdown-contract only — no executable test surface.
- Grep-verified: `Paper-complete guard` section in SPEC; foreign-dirt on all six runners + procedure; no auto-stash/clean UX; Grok/Codex still pointer-only.
- Frontend N/A (no UI).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**
- `README.md` — no change
- `SPEC.md` — updated (new §"Paper-complete guard"; Phase 4 + Post-closure cross-refs)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- (Also updated off-list `docs/GLOSSARY.md` + `SPEC/gates.md` + procedure + skills.)

**Final Summary:**

Closed the paper-complete hole: task entry now hard-stops on a dirty tree; closure is one atomic commit of deliverables + PLAN + archive; 🏁 requires a real deliverable-covering SHA; no collateral Completed flips. Contract lives in SPEC with procedures and all tasknote runners wired.

**Archived:** 2026-07-16
