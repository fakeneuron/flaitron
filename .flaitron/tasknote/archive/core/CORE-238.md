---
title: doc-xref-precision-sweep
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: []
---

# CORE-238 | doc-xref-precision-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix three imprecise cross-references in SECURITY.md, CAPABILITIES.md, and MIGRATION.md that lagged recent structural changes (SPEC modularisation and CORE-237 copy-paste form change), as surfaced by the 2026-05-31 audit-docs run.

## ✅ Acceptance

- [ ] SECURITY.md citations to "SPEC §Conditional skip rule" updated to "SPEC/gates.md §Conditional skip rule"
- [ ] CAPABILITIES.md `/clear` row "Leads the post-closure copy-paste line" updated to reflect the prose "Clear your session" cue form
- [ ] MIGRATION.md §1.2 slash-command count corrected from "nine" to "21 shipped / nine wired"

## 🧩 Subtasks

- [ ] Read SECURITY.md lines ~111 and ~135; fix both citations
- [ ] Read CAPABILITIES.md and update the `/clear` row description
- [ ] Read MIGRATION.md §1.2 and correct the slash-command count claim
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-237]] — introduced the prose "Clear your session" copy-paste form that CAPABILITIES.md lags

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three citations confirmed stale by reading SECURITY.md, CAPABILITIES.md, and MIGRATION.md. Fixes are exact and mechanical.

- [x] Read relevant source files

- [x] **Archive skim** — no prior tasknotes specifically targeted these citations. No load-bearing decisions to surface.

- [x] **Drift check** — all three stale citations confirmed at current HEAD:
  - SECURITY.md lines 111 + 135: `SPEC §"Conditional skip rule"` — heading lives in `SPEC/gates.md` line 91, not SPEC.md
  - CAPABILITIES.md `/clear` row: "Leads the post-closure copy-paste line" — post-CORE-237 the copy-paste is a prose cue ("Clear your session, then use…"); `/clear` is no longer literally in the line
  - MIGRATION.md §1.2 line 61: "ships nine slash commands inside the submodule" — submodule actually ships 21 (`ls claude/commands/ | wc -l`); nine are wired by §1.2

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. All three fixes are clear from the description and confirmed by drift check.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Heading `## Conditional skip rule` lives in `SPEC/gates.md` at line 91. SPEC.md defers to it with full linked citations throughout — the SECURITY.md prose citations that omit the file (`SPEC §"…"`) are the only stale ones.

CORE-237 changed the post-closure copy-paste form from a literal `/clear then /model … /ft-task` command string to a prose cue "Clear your session, then use 🔧 /ft-task <ID>". The CAPABILITIES.md `/clear` row still says "Leads the post-closure copy-paste line" which implies `/clear` appears literally at the start of a command string — no longer accurate.

`claude/commands/` contains exactly 21 `.md` files. MIGRATION.md §1.2 wires 9 (7 tasknote + 2 worktree). The sentence "ships nine slash commands inside the submodule" conflates the wired-count with the shipped-count.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — doc citation fixes; no code pattern applies

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — markdown only; N/A

**Implementation Notes:**

Three surgical prose edits:
- `SECURITY.md` lines 111 + 135: `SPEC §"Conditional skip rule"` → `SPEC/gates.md §"Conditional skip rule"`
- `claude/CAPABILITIES.md` `/clear` row: replaced "Leads the post-closure copy-paste line." with "The post-closure session-reset cue ('Clear your session, then use…') is the prose expression of this trigger."
- `docs/MIGRATION.md` §1.2: "Flowtron ships nine slash commands inside the submodule:" → "The submodule ships 21 slash commands; this step wires nine —"

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — markdown only; N/A

- [x] Ran lint/type-check on changed code — markdown only; N/A

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:**

No code changed; all three edits are markdown prose fixes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SECURITY.md`, `docs/MIGRATION.md`, `claude/CAPABILITIES.md` updated (this task); all others no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Fixed three imprecise cross-references that lagged recent structural changes: SECURITY.md's two citations now point to `SPEC/gates.md §"Conditional skip rule"` (the actual heading location), CAPABILITIES.md's `/clear` row now describes the prose "Clear your session" cue form instead of the retired literal-command form, and MIGRATION.md §1.2 now correctly distinguishes the 21-command submodule total from the 9 commands wired in this step.

**Archived:** 2026-05-31
