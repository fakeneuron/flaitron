---
title: natabula handoff
status: completed
tags: []
created: 2026-10-04
due:
related-tasks: [CORE-EPIC-711, CORE-711.4, CORE-711.5, CORE-711.7]
blocked-by:
  - CORE-711.4
parallel-safe-with:
  - CORE-711.5
---

# CORE-711.6 | natabula handoff

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-711]] · [[CORE-711.4]] · [[CORE-711.5]] · [[CORE-711.7]]

## 🎯 Goal

File Natabula-owned pre-wave and post-wave rebrand work so the fleet migration has its required layer update and residual-name review handoffs.

## ✅ Acceptance

- [x] Natabula’s PLAN contains a pre-wave NAT row covering `.flaitron/` deposits, `natabula-align`, fleet scripts, skills, docs, and fixtures — `rg -q 'NAT-354.*flaitron.*deposit' /Users/fakeneuron/Code/natabula/.flowtron/PLAN.md`
- [x] Natabula’s PLAN contains a post-wave NAT row to sweep residual `flowtron` outside archives and file one adopter review row per hit, including fakeneuron’s `/flowtron` page — `rg -q 'NAT-355.*rename review' /Users/fakeneuron/Code/natabula/.flowtron/PLAN.md`
- [x] The new rows are reconciled against Natabula’s active plan before filing — `judgment` (PLAN has no active task rows; its sole Future item is a routine-bump note and unaffected)

## 🧩 Subtasks

- [x] Confirm the two proposed Natabula rows and their dependency ordering.
- [x] File the pre-wave and post-wave rows in Natabula’s PLAN.
- [x] Re-read the target plan and record verification receipts.

## 🔗 Related

- [[CORE-EPIC-711]] — parent rebrand epic.
- [[CORE-711.4]] — predecessor; identified the `configs/` source drift that requires the pre-wave handoff.
- [[CORE-711.5]] — parallel-safe sibling.
- [[CORE-711.7]] — fleet wave blocked on this handoff.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The required Natabula work has not yet been filed, and CORE-711.7 depends on the pre-wave layer migration.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A: this is a cross-repo routing and filing task; implementation ownership remains with Natabula’s later task cycles.

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Natabula remains on the pre-v6 `.flowtron/` layout; its plan has no active task rows. `NAT-354` and `NAT-355` are unused.
- CORE-711.4 records that Natabula’s `configs/.gitleaks.toml` source still names `.flowtron/`; a layer refresh before the Natabula update would reintroduce the stale path.
- The target plan’s only future item is routine Flowtron bump guidance. It is unaffected by the two rebrand rows, so the downstream-impact scan has no active entry to reconcile.
- No clarifications needed. Assumptions: the pre-wave row is a heavy, multi-surface migration; the post-wave review is a medium fleet coordination task and waits for CORE-711.7’s wave.
- `touches:` is omitted because this flaitron checkout has no deliverable file beyond its lifecycle artifacts; the implementation and target-plan changes belong to Natabula.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed Natabula’s established Plan-row grammar and split pre-wave migration from post-wave review so each target task has one responsibility.

- [x] **Minimal refactor gate** — N/A: only two PLAN rows were filed; implementation refactors remain in Natabula’s future task cycles.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no executable behavior changed.

**Implementation Notes:**

- Filed and committed `NAT-354` before the fleet wave and `NAT-355` after `CORE-711.7` in Natabula (`fe91ddc`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: PLAN-only change.

- [x] Ran lint/type-check on changed code — N/A: PLAN-only change.

- [x] **Verification receipt** — recorded below; structural/code-quality review is N/A because the target change contains only two PLAN rows.

- [x] **External review** — N/A: the two-row PLAN diff is too small to grade independently; the operator approved the exact rows before filing.

- [x] (frontend) N/A — no frontend change.

**Testing Notes:**

- `rg -q 'NAT-354.*flaitron.*deposit' /Users/fakeneuron/Code/natabula/.flowtron/PLAN.md` → exit 0.
- `rg -q 'NAT-355.*rename review' /Users/fakeneuron/Code/natabula/.flowtron/PLAN.md` → exit 0.
- `git -C /Users/fakeneuron/Code/natabula diff --check` → exit 0 before commit; committed target-plan diff `fe91ddc` also passed Natabula’s staged gitleaks hook.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, and `docs/VISION.md`; the task only routed Natabula-owned work.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-10-04.` and kept nested beneath its active epic parent, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — target change: one Natabula PLAN file, +3/-1 lines, committed as `fe91ddc`; both acceptance greps and whitespace check passed. No refactor or documentation update was needed. `touches:` was correctly omitted because this checkout had no deliverable path; its lifecycle-only PLAN/tasknote edits are excluded, while the Natabula PLAN delivery is committed in its own repository. The explicit pre-/post-wave split makes the fleet dependency and later human review independently trackable.

- [x] **Learnings** — N/A.

**Final Summary:**

Filed Natabula’s prerequisite `.flaitron/` deposit migration and its post-wave residual-name review as separate, ordered NAT tasks. The target-plan commit is `fe91ddc`; CORE-711.7 can now rely on NAT-354, while NAT-355 preserves the human-facing review work for after the fleet wave.

**Archived:** 2026-10-04
