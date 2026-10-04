---
title: archive-metadata-cleanup
status: completed
tags: []
created: 2026-07-08
due:
related-tasks: [CORE-349.2, CORE-349.N]
---

# CORE-350 | archive-metadata-cleanup

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-349.2]] · 🔗 [[CORE-349.N]]

## 🎯 Goal

Correct the archived [[CORE-349.2]] tasknote metadata so its status and nav chip match its completed PLAN/archive state.

## ✅ Acceptance

- [x] Archived [[CORE-349.2]] frontmatter status is `completed`.
- [x] Archived [[CORE-349.2]] nav chip reads `✅ Completed`.
- [x] No unrelated archived tasknote content is rewritten.
- [x] Tasknote closure records validation and archives [[CORE-350]].

## 🧩 Subtasks

- [x] Confirm the active PLAN row and archived mismatch.
- [x] Update only the stale metadata/nav fields in [[CORE-349.2]].
- [x] Run focused markdown/diff validation.
- [x] Close [[CORE-350]] and update PLAN.md.

## 🔗 Related

- [[CORE-349.2]] — Archived tasknote with stale `in-progress` metadata after completion.
- [[CORE-349.N]] — Audit that surfaced the metadata mismatch as a follow-up.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The Low-priority PLAN row is open, the audit finding is still present in archived [[CORE-349.2]], and this task is a deliberate narrow exception to the normal archive write-once rule.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- PLAN row: `CORE-350` is open under `## Low`, tagged `[light]`, and asks only to correct archived [[CORE-349.2]] frontmatter/nav metadata surfaced by [[CORE-349.N]].
- Current archived [[CORE-349.2]] still has `status: in-progress` and `[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-349]]` despite being archived under `.flowtron/tasknote/archive/core/` and marked completed in PLAN history.
- Archive skim: [[CORE-349.N]] recorded the mismatch as a follow-up candidate and explicitly avoided silently rewriting archived tasknotes during the audit; this task now supplies that deliberate workflow step.
- Drift check: target file path, stale frontmatter field, and stale nav chip still match the audit finding. The general SPEC write-once policy remains intact because this task is explicitly scoped to the historical metadata correction.
- No clarifications needed. Assumptions: the fix should change only `status:` and the nav status chip in [[CORE-349.2]], leaving all execution notes and dates untouched.

Discovery surfaced no significant deviation -> skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: archived completed tasknotes use `status: completed` in frontmatter and a `✅ Completed` nav chip, matching current tasknote body conventions and the completed state in PLAN history.
- Updated only `.flowtron/tasknote/archive/core/CORE-349.2.md`: changed frontmatter `status: in-progress` to `status: completed` and changed the nav chip from `🟢 In progress` to `✅ Completed`.
- No execution notes, dates, related links, or historical body content were rewritten.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `sed -n '1,24p' .flowtron/tasknote/archive/core/CORE-349.2.md` confirmed frontmatter status and nav chip now read completed.
- `git diff -- .flowtron/tasknote/archive/core/CORE-349.2.md .flowtron/tasknote/CORE-350.md` showed the intended archive metadata diff plus this active tasknote.
- `git diff --check` passed.
- No code or frontend files changed; runtime tests, typecheck, and visual confirmation are not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change.
  - `SPEC.md` — no change; the archive write-once policy already allows specific workflow-required exceptions.
  - `docs/MIGRATION.md` — no change.
  - `claude/AGENTS-snippet.md` — no change.
  - `codex/AGENTS-snippet.md` — no change.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-08.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Corrected the archived [[CORE-349.2]] tasknote metadata so it now consistently reads completed in both frontmatter and the visible nav chip.

Technical detail: the change was intentionally limited to `.flowtron/tasknote/archive/core/CORE-349.2.md`, updating `status: completed` and `✅ Completed` without altering historical execution notes. Validation confirmed the corrected header and a clean markdown diff.

**Archived:** 2026-07-08
