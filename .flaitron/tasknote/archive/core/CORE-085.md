---
title: flowtron-skill-phase-row
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: []
---

# CORE-085 | flowtron-skill-phase-row

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Make the `/task` row in `claude/skills/flowtron/SKILL.md` name the same four phases as `SPEC.md` so the bundled info screen does not imply a non-existent “Design” phase or skip Testing & Linting.

## ✅ Acceptance

- [x] `/task` description in the bundled-skills table matches SPEC phase order and labels (Discovery → Execution → Testing & Linting → Closure).
- [x] No other row in that table regresses; read-only contract of the flowtron info skill preserved.

## 🧩 Subtasks

- [x] Edit the `/task` table cell in `claude/skills/flowtron/SKILL.md` to the canonical four-phase string.
- [x] Re-read `SPEC.md` §"The 4-phase workflow" and the edited line for literal parity (arrows, ampersand in “Testing & Linting”).
- [x] Confirm no other copy in that file repeats the wrong sequence (grep “Design” / wrong phase chain).

## 🔗 Related

- Audit finding 2026-05-14 (PLAN long description) — doc drift on cold-start `/task` explanation.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed  
  **Rationale:** `claude/skills/flowtron/SKILL.md` line 44 still said `Discovery → Design → Execution → Closure`, which contradicts `SPEC.md` (Phases 2–4 are Execution, Testing & Linting, Closure; no Design phase). Fix is a one-line doc correction in the stated file.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Sources:** `claude/skills/flowtron/SKILL.md` (bundled-skills table, `/task` row); `SPEC.md` §"The 4-phase workflow" / phase headings (`🛠️ Phase 2: Execution`, `🧪 Phase 3: Testing & Linting`, `🚀 Phase 4: Closure`).
- **Archive skim:** `grep` on `_project/tasknote/archive/core/*.md` for `claude/skills/flowtron/SKILL.md` returned no hits. Broader grep for `/task` + phase wording hits many historical tasknotes (workflow/gate work); none identified as owning this file’s info-screen copy. No load-bearing prior decision conflicts this one-line alignment.
- **Drift:** Path `claude/skills/flowtron/SKILL.md` is correct; erroneous string was at the `/task` description in the table. PLAN long description matched intent.
- **Assumptions (no clarifications needed):** Only the prose in the `/task` row needed changing; no VERSION or Step 1 logic changes. `[opus]` retag on PLAN reflects Composer-class session after model gate (SPEC allows only `opus` | `sonnet`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — bundled-skills table is uniform one-liner rows; no structural change — aligned `/task` prose with SPEC phase names only.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only)

**Implementation Notes:**

Single-cell edit in `claude/skills/flowtron/SKILL.md`: `/task` description now `Discovery → Execution → Testing & Linting → Closure` (matches `SPEC.md` phase sequence).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Confirmed the bundled-skills `/task` cell contains the canonical four-phase arrow chain only. Substring “design” appears elsewhere only in the `PHILOSOPHY.md` key-doc line (“design rationale”), unrelated to workflow phase names.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-14.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Aligned the flowtron info skill’s `/task` bundled-skills blurb with the real four-phase lifecycle in `SPEC.md`, replacing the mistaken “Design” phase and naming Phase 3 as Testing & Linting so cold-start readers are not mis-routed.

**Archived:** 2026-05-14
