---
title: ft-update-wiring-confirm
status: completed
tags: []
created: 2026-06-05
due:
related-tasks: []
---

# CORE-283 | ft-update-wiring-confirm

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗

## 🎯 Goal

Confirm that `ft-update` being absent from flowtron-self's `.claude/{skills,commands}` wiring is the intended adopter-only exclusion, and document the intent where a reader would actually look.

## ✅ Acceptance

- [ ] Confirmed: the omission is intentional (not stale wiring)
- [ ] Documentation of the exclusion is visible in MIGRATION.md at the point where a developer setting up flowtron-self local wiring would encounter it

## 🧩 Subtasks

- [ ] Confirm: audit evidence + CORE-272 history + skill guard = intentional
- [ ] Add a prose note in MIGRATION.md §"Optional: local `.claude/` wiring" explaining ft-update is intentionally excluded (adopter-only; bails in flowtron-self)

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and actionable — the audit-context finding is correct. The `.claude/skills/` wiring in the flowtron repo has 21 `ft-*` symlinks but not `ft-update`, and the MIGRATION.md "Optional: local wiring" glob (`ln -s ../../claude/skills/*`) would naturally include it, creating an expectation mismatch. A short note resolves the ambiguity durably.

- [x] Read relevant source files

- [x] **Archive skim** — searched archive for tasknotes touching `ft-update`, flowtron-self wiring, and symlink decisions.

  **CORE-272** (ft-update-skill) is the definitive prior: acceptance criteria explicitly state "No per-project symlink line added (global glob `claude/skills/*` covers it) — both decisions noted." The decision not to wire `ft-update` in flowtron-self was deliberate.

- [x] **Drift check** — all paths verified current:
  - `.claude/skills/` has 21 symlinks; `ft-update` absent — matches expected state
  - `.claude/commands/` has 21 symlinks; `ft-update` absent — matches expected state
  - `~/.claude/skills/ft-update` exists — globally installed as expected
  - `docs/MIGRATION.md` §1.0 table marks `/ft-update` as "Adopters only"
  - MIGRATION.md "Optional: local wiring" section uses `ln -s ../../claude/skills/*` glob with no ft-update carve-out note

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  1. The omission is intentional — CORE-272 decided it; MIGRATION.md documents "Adopters only"; the skill's Step 0 guard bails cleanly.
  2. The right place to document the exclusion is MIGRATION.md's "Optional: local `.claude/` wiring" section, because that's where a developer would follow the `*` glob and wonder why `ft-update` is missing from the actual machine state.
  3. Wiring it locally (non-committed) is NOT the deliverable — `.claude/` is gitignored; a committed doc note is the durable fix.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The `*` glob in MIGRATION.md line 118 (`ln -s ../../claude/skills/* .claude/skills/`) covers all skills including `ft-update`, so anyone following those instructions would end up WITH `ft-update` wired, and the bail message would serve as runtime self-documentation. But the actual machine state excludes it (because CORE-272 used individual `ln -s` commands, not the glob). The audit-context flagged the resulting namespace gap as "Low / Pass d."

The fix: one sentence in MIGRATION.md's "Optional: local wiring" section noting that `ft-update` is adopter-only and intentionally excluded (or that the `*` glob is fine — the skill bails gracefully). No code changes needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the existing concise prose + parenthetical note style already used in the same paragraph; no new shape needed.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — docs-only change; no tests applicable.

**Implementation Notes:**

Added one trailing sentence to `docs/MIGRATION.md` §"Optional: local `.claude/` wiring when cwd is the flowtron checkout" paragraph explaining that the `*` glob intentionally wires `/ft-update` and the bail-in-flowtron-self behavior is by design.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no test suite for markdown docs.

- [x] Ran lint/type-check on changed code — markdown prose; no lint tool applicable.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — not applicable; no frontend change.

**Testing Notes:**

Docs-only change. Verified the edited sentence reads correctly in context and the MIGRATION.md diff is minimal and scoped.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/MIGRATION.md` updated (this task's target); all other AI-referenced docs: no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-05.` and tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Confirmed the `ft-update` omission from flowtron-self's `.claude/` wiring is intentional (CORE-272 decision; skill bails in flowtron-self). Added a clarifying sentence to `docs/MIGRATION.md` §"Optional: local `.claude/` wiring" explaining the inclusion is harmless and deliberate.

**Archived:** 2026-06-05
