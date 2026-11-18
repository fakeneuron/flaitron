---
title: direct-edit-path
status: completed
tags: []
created: 2026-11-17
due:
related-tasks: [CORE-857.5]
touches:
  - SPEC/tasknote-selection.md
  - SPEC/plan-filing.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-audit/SKILL.md
  - docs/CONVENTIONS.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-915 | direct-edit-path

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-857.5]]

## 🎯 Goal

Define a risk-based direct-edit path and a short pre-commit protocol for simple filed and unfiled fixes.

## ✅ Acceptance

- [x] The skip tier names eligibility, required checks, and the recording shape for both filed and unfiled edits — `bash tools/drift-checks.sh`
- [x] Budgets hold — `bash tools/drift-checks.sh` (context budgets)
- [x] The policy routes a clarification of existing intent, a narrow code fix with a regression test, a new contract rule, and an epic child according to their impact — judgment from the written policy and scenario walkthrough.
- [x] Filed closure keeps the checked stub and atomic commit; both runner mirrors and the audit carve-out consume the new rule with their existing approval and recording steps — judgment from the dispatch and closure prose.

## 🧩 Subtasks

- [x] Specify eligibility, authorization, diff isolation, validation, and local commit steps.
- [x] Preserve the filed closure record and document the commit-only record for unfiled work.
- [x] Update the runner and audit references, reconcile the commit convention, and record the context budgets.

## 🔗 Related

- [[CORE-857.5]] — related-decision: established the skip advisory and standalone closure record.
- `7fe2c277` — corrected the existing `/ft-close-epic` invocation in a standalone commit and prompted this task.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The size-based skip list and filed-only closure still leave the precedent in `7fe2c277` without an explicit route.

- [x] Read the routing, filing, gates, and tasknote contracts, both runner branches, audit §5, the commit convention, and the context ledger. Downloaded `arch-health` and read `arch/viz/dep-graph.json`; its 112-module graph covers the visualizer. The affected surfaces are linked workflow prose.

- [x] **Best Practices Review** — eligibility and checks belong in tasknote selection, PLAN record shape belongs in plan filing, and entry points apply the rules by reference. Keep the audit's confirmed batch write and domain limits.

- [x] **Archive skim** — the read-only probe traced [[CORE-857.5]] to [[CORE-856]], [[CORE-857.1]], [[CORE-857.2]], and [[CORE-818]]. Preserve the attended tier choice, atomic filed closure, and micro default. [[CORE-591]], [[CORE-563]], [[CORE-429]], and [[CORE-682]] establish commit isolation. [[CORE-455]] and [[CORE-873]] cover audit authorization and attribution.

- [x] **Drift check** — the starter paths and commit match HEAD. The agent-neutral SOP and audit dispatcher repeat the superseded size rule, and the commit conventions expect an ID. Those mirrors belong in this change. Historical v8.3 release notes still accurately describe that release. The active PLAN contains only CORE-915, so the downstream scan finds no other active entry to reconcile.

- [x] No clarifications needed. Adopt the starter's proposed defaults. A clarification of existing intent may qualify. Unfiled work uses a plain Conventional Commit subject without an ID and creates no row. `/ft-task` remains ID-based. Incidental work needs authorization, and distinct unstaged changes may coexist only when target paths and validation are isolated.

- [x] Subtasks and YAML `touches:` declared.

**Discovery Notes:**

Phase 1→2 gate skipped under `default-skip`. The added mirror edits apply the same filed scope and preserve existing approvals, so the work can proceed as filed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — reuse named-path staging, whole-index review, and the filed Completed stub. The audit uses the common eligibility and validation in its confirmed batch.

- [x] **Minimal refactor gate** — no refactor. Removing duplicated size criteria keeps the touched entry points aligned.

- [x] Implemented the risk-based route, verification protocol, and recording rules in prose.

- [x] Updated/added tests for non-trivial behavior — N/A. Workflow prose only; use drift checks and scenario review.

**Implementation Notes:**

The existing checked stub keeps its shortname, trailing tokens, date, placement, and rotation. A taskless direct-edit commit takes no ID. Both runners defer to the common path. The audit uses the eligibility and checks under its own write-step confirmation and retains the attributed row and batch commit. Context caps held.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A. No runtime code changed.

- [x] Ran lint/type-check on changed code — N/A. The Markdown checks ran.

- [x] **Verification receipt** — commands and scenario results below. Code structure review is N/A for this prose diff.

- [x] **External review** — a non-author context graded the diff against Acceptance. Fixed both blockers in Phase 2, repeated Phase 3 checks, and obtained a cleared re-review. Findings and dispositions are below.

- [x] (frontend) Visual confirmation — N/A. No rendered product surface changed.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → 0 on the initial pass, after blocker fixes, and after the final review note. Context budgets, section citations, and Completed-row checks passed.
- Closure verification `bash tools/drift-checks.sh` → 1 before staging the archive move. First failure: `awk: can't open file .flaitron/tasknote/CORE-915.md`. Staged the move, then reran the full check → 0.
- `git diff --check` and `git diff --cached --check` → 0.
- Scenario walkthrough: an authorized correction to an existing invocation can land as a local commit with no ID. A bounded bug fix and its test can qualify as a tightly coupled pair. A new SPEC rule needs a tasknote even if it fits in a sentence. An epic child retains its tasknote. An overlapping pending edit is deferred or isolated. An attended filed standalone direct edit follows both entry checks and puts the edit and stub in one commit.
- External review blockers fixed: rejected audit hunks could ride a shared-path commit, and unrelated changes could affect validation. The audit now excludes failed hunks, defers affected checks, and stages validated fixes only.
- Review notes fixed: canonical commit authorization and staged-diff matching are explicit. Re-review cleared the blockers and flagged missing staged edits as a remaining edge case. The audit now checks for both missing and unexpected hunks before committing.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md` now documents a plain commit subject for unfiled direct edits and their inline checks. No change for `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, or `docs/VISION.md`. The existing routing pointers and external stable surfaces still apply.

- [x] Closed — Acceptance ticked, status set to completed, PLAN row moved to the top of Completed, and this note archived under core.

- [x] **Evidence-based recap** below.

- [x] **Learnings** — N/A. The existing always-loaded routing pointer leads to the updated rule.

**Final Summary:**

CORE-915 defines when bounded fixes can use direct edit, from eligibility and validation through the local commit. A filed standalone task records the edit and its Completed row in the same commit. An unfiled edit records the change in Git history.

- Scope: declared 7 files, changed 7. 72 lines added, 54 removed across deliverables. Both task runners and the audit link to the canonical eligibility rule.
- Verification: drift checks and Git whitespace checks passed. The routing file measures 12,190 of 12,500 bytes. The audit now rejects missing and unexpected staged hunks.
- Refactors: none required. Documentation and workflow contracts carry the change. Commit subject is `feat: CORE-915 — define direct-edit path`.

**Archived:** 2026-11-17
