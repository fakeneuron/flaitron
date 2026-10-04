---
title: micro-task-spec-carve-out
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-146 | micro-task-spec-carve-out

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a carve-out to SPEC §"Post-closure protocol" acknowledging that ft-micro-task's prose commit-go is the legitimate fire-branch form for micro-tasknotes (replacing the 📦 banner block while keeping the same conditional skip rule).

## ✅ Acceptance

- [ ] SPEC §"Post-closure protocol" fire-branch step 1 notes the ft-micro-task prose-ask variant
- [ ] The carve-out makes clear the same conditional skip rule governs both forms
- [ ] ft-micro-task/SKILL.md is unchanged
- [ ] No other files changed

## 🧩 Subtasks

- [ ] Locate the exact insertion point in SPEC.md §"Post-closure protocol" fire-branch step 1
- [ ] Draft and apply the carve-out sentence/note
- [ ] Verify ft-micro-task/SKILL.md unchanged and no drift

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SPEC §"Post-closure protocol" step 1 describes the fire branch exclusively in 📦 banner terms (preview-line mandatory, 🟢 prefix) with no acknowledgment that ft-micro-task uses a prose ask instead. CORE-089 deliberately preserved this banner-free shape in ft-micro-task/SKILL.md but left the SPEC gap. The carve-out belongs here.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Archive skim:** CORE-089 is the load-bearing precedent. It introduced the conditional skip rule and explicitly noted ft-micro-task "carries no explicit 📦 banner today — its commit-go is a prose ask, not a banner block" (archive, Implementation Notes). CORE-089 reshaped ft-micro-task SKILL.md Step 5 to the conditional 2-bullet form but did not add a SPEC carve-out. The audit (CORE-145 cohort, 2026-05-23) surfaced this as Finding #4 (High). CORE-066 (gate-cue UX refinements) also noted: "/micro-task, /file-followup, /starter-task deferred — same out-of-scope pattern." No other archive hits are load-bearing.
- **Drift check:** SPEC.md §"Post-closure protocol" step 1 at lines ~468–476 still matches what's described (verified by direct read). ft-micro-task/SKILL.md Step 5 prose-ask fire-branch form unchanged. No drift.
- **No clarifications needed.** Assumption: the carve-out lives as a paragraph at the end of step 1 (after the 🟢 prefix sentence), using the `**ft-micro-task carve-out.**` bold-intro pattern consistent with other carve-out notes in SPEC. ft-micro-task/SKILL.md stays as-is per task description.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: SPEC uses `**<topic> carve-out.**` bold-intro paragraphs for skill-specific variant notes (see Phase 1 and Phase 3 `--fast` carve-outs). Applied the same pattern to §"Post-closure protocol" step 1, as a final paragraph after the 🟢 prefix sentence. Single paragraph addition — no bullets, no substructure. ft-micro-task/SKILL.md untouched per task scope.

Changed: `SPEC.md` — added 2-line carve-out paragraph at line 476 inside step 1 of §"Post-closure protocol".

No tests needed (pure doc patch, no code changed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure SPEC.md doc edit — no code changed. Test suite, lint, and typecheck are N/A. No frontend changes. Visual check: carve-out at SPEC.md:476 reads cleanly and uses the established bold-intro carve-out pattern.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**
- `README.md` — no change
- `SPEC.md` — updated: added ft-micro-task carve-out paragraph at §"Post-closure protocol" step 1
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change

**Final Summary:**

Added a two-line `**ft-micro-task carve-out.**` paragraph to SPEC §"Post-closure protocol" step 1 authorizing ft-micro-task's prose commit-go as the fire-branch form for micro-tasknotes (no 📦 banner; same conditional skip rule governs both forms). ft-micro-task/SKILL.md unchanged.

**Archived:** 2026-05-23
