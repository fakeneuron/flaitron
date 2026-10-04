---
title: new-project legacy detection
status: completed
tags: []
created: 2026-05-07
due:
related-tasks: [CORE-043, CORE-045]
---

# CORE-044 | new-project legacy detection

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-043]] [[CORE-045]]

## 🎯 Goal

Extend the `new-project` skill's Step 0 precondition check to detect root-level legacy workflow tells (`PLAN.md`, `plan.json`, `WORKFLOW.md`, etc.) and bail with a pointer at `docs/MIGRATION.md` §3 instead of scaffolding flowtron alongside them.

## ✅ Acceptance

- [x] Step 0 enumerates legacy markers (root-level `PLAN.md`, `plan.json`, `WORKFLOW.md`) as a separate precondition group distinct from the existing flowtron-already-adopted markers
- [x] Bail message points at `docs/MIGRATION.md` §3 (lightweight, active-queue-only) as primary, with §2 noted as the heavy alternative
- [x] Existing flowtron-self precondition checks (`_project/flowtron/`, `_project/PLAN.md`, `.claude/commands/task.md`, `.claude/skills/task`) unchanged
- [x] Pre-Step-0 prose at SKILL.md line 10 reconciled with the new programmatic check (no contradictory pointer at §2-only)

## 🧩 Subtasks

- [x] Edit `claude/skills/new-project/SKILL.md` Step 0: add a third bullet group for legacy markers with bail pointing at MIGRATION.md §3 (primary) + §2 (alternative)
- [x] Reconcile the line 10 disclaimer prose with the new programmatic check (condense or remove the redundant §2-only pointer)
- [x] Read-back the updated SKILL.md to verify the precondition cascade reads cleanly
- [x] Reconcile `docs/MIGRATION.md` §1.0 line 25 precondition summary (in-scope follow-on; mirrors the new bail target)
- [x] Reconcile `claude/skills/new-project/SKILL.md` Notes line 152 (in-scope follow-on; same §3-or-§2 pointer)

## 🔗 Related

- [[CORE-043]] — v1.0.0 release cut where the gap surfaced
- [[CORE-045]] — MIGRATION.md §3.x pre-flight + post-cleanup checklists (paired follow-up)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v1.0.0 just shipped; no contract churn pending. The gap is a concrete, mechanical extension of an existing precondition list — clear diff in mind. PLAN.md description (~38w) is under the 70w cap.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — `claude/skills/new-project/SKILL.md` Step 0 still exists at lines 12–26 with the four-bullet flowtron-already-adopted check; `docs/MIGRATION.md` §3 (Lightweight migration) exists at line 169; line 10 prose still points at §2 only. No drift from the gap as filed in CORE-043.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim findings.** `_project/tasknote/archive/core/` greppped for `new-project|MIGRATION|legacy`:

- **CORE-012** — original `/new-project` skill creation. Established the Step 0 precondition shape (currently only flowtron-self markers).
- **CORE-020** — `/new-project` + MIGRATION.md update. Most recent skill+migration coordinated edit.
- **CORE-043** — v1.0.0 release. Surfaced this gap during the v1.0 audit pass (line 10 prose mentions legacy detection but Step 0 doesn't enforce it programmatically).

**Solution shape.** Add a third bullet group to Step 0's "None of the following exist" list — a *legacy markers* group distinct from the *flowtron-self* group. Two-bucket structure makes the bail messages clean (different bucket → different remediation). Bail target shifts from §2-only (current line 10 prose) to §3 primary + §2 alternative (per user clarification — §3 is the v0.10.0 lightweight path, the right default; §2 stays available for projects that want full ID preservation).

**Decisions locked (via clarifying questions):**

1. Legacy markers list = minimal trio: root-level `PLAN.md`, `plan.json`, `WORKFLOW.md`. Higher-signal tells like `ROADMAP.md` and helper scripts deferred — MIGRATION.md §3 already enumerates them in its judgment-call list, and false positives on `ROADMAP.md` would be annoying.
2. Bail target = §3 primary, §2 noted as heavy alternative.

**Files touched:** `claude/skills/new-project/SKILL.md` only. No tests, no docs propagation needed (MIGRATION.md §3 already exists; line 10 prose tightening is the only follow-on edit).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Step 0's existing "None of the following exist" bullet group is the canonical shape for precondition fences in this skill. Extended in parallel: a second bullet group with the same `<intro line> + <bullet list> + <if-any-present remediation>` structure. No new shape introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edit to a skill file)

**Implementation Notes:**

Three edits to `claude/skills/new-project/SKILL.md`:

1. **Line 10 (disclaimer prose)** — tightened from "If the project already has..., stop and point at MIGRATION.md §2" to "Step 0 detects prior workflow tooling and bails with a pointer at §3 (lightweight) or §2 (heavy)". Step 0 now does this programmatically, so the disclaimer credits the procedural check rather than restating it.
2. **Step 0 (lines 26–31)** — added a fourth precondition bullet group enumerating root-level `PLAN.md`, `plan.json`, `WORKFLOW.md`. Bail remediation directs at MIGRATION.md §3 primary (lightweight, active-queue-only), §2 alternative (full ID-preserving). The "flowtron would conflict, e.g. a root `PLAN.md` collides with `_project/PLAN.md`" parenthetical justifies the check (it's not just heuristic — it's a real path collision).
3. **Notes line 152** — updated the legacy migration pointer to `§3 (lightweight) or §2 (full, ID-preserving)`, matching the new bail target.

One follow-on edit to `docs/MIGRATION.md` §1.0 line 25 (precondition summary in the `/new-project` quick-path blurb) — added "no legacy workflow tooling at the root" with the same §3 / §2 routing note. Keeps the MIGRATION-side description aligned with what the skill actually does.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only edits to a skill file; no test pipeline)
- [x] Ran lint/type-check on changed code — N/A (markdown-only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Read-back of SKILL.md lines 1–40 and 140–154 confirms the four-bullet precondition cascade reads cleanly with parallel structure and distinct bail messages per bucket.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — `claude/skills/new-project/SKILL.md` (Step 0 + line 10 disclaimer + Notes line 152) and `docs/MIGRATION.md` §1.0 line 25 (precondition summary). No SPEC, README, CLAUDE-snippet, or template propagation needed (Step 0 is an internal skill detail; MIGRATION.md §3 already exists from v0.10.0).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-07.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Closed the legacy-detection gap surfaced during the v1.0.0 audit. The `/new-project` skill's Step 0 now enumerates root-level `PLAN.md`, `plan.json`, `WORKFLOW.md` as a separate precondition group (parallel to the existing flowtron-already-adopted check) and bails with a pointer at `docs/MIGRATION.md` §3 (lightweight, active-queue-only — typical case) or §2 (heavy, ID-preserving). Three SKILL.md edits (line 10 disclaimer tightened, Step 0 extended, Notes line 152 reconciled) plus one MIGRATION.md §1.0 follow-on so the quick-path blurb describes what Step 0 actually does. No code changes; no test/lint pipeline applies. CORE-045 (paired follow-on) generalizes the cross-project pre-flight + post-cleanup checklists into a permanent §3.x subsection.

**Archived:** 2026-05-07
