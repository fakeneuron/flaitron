---
title: drop Last-updated residue
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [[CORE-035]], [[CORE-073]]
---

# CORE-075 | drop Last-updated residue

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-035]] [[CORE-073]]

## 🎯 Goal

Remove the residual "Update PLAN.md's **Last updated:** line if it has one" defensive-guard bullet from `starter-task` and `file-followup` SKILLs so adopters aren't misdirected into reviving the retired convention.

## ✅ Acceptance

- [x] Bullet removed from `claude/skills/starter-task/SKILL.md` (was at line 89)
- [x] Bullet removed from `claude/skills/file-followup/SKILL.md` (was at line 87)
- [x] No other Last-updated residue remains in `claude/skills/**` (verified via grep)

## 🧩 Subtasks

- [x] Delete the bullet from `claude/skills/starter-task/SKILL.md:89` (under Step 5 Placement)
- [x] Delete the bullet from `claude/skills/file-followup/SKILL.md:87` (under Step 4 Placement)
- [x] Verify no residue remains: `grep -rn "Last updated" claude/ SPEC.md SPEC/ templates/` returns zero hits
- [x] Phase 4 doc-drift sweep on `_project/tasknote/README.md` §"AI-referenced docs"

## 🔗 Related

- [[CORE-035]] — retired the Last-updated convention; this is residue from that sweep
- [[CORE-073]] — audit-flowtron-self that surfaced this finding (Finding #3, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit (CORE-073) classified the two bullets as orphans — defensive guards for a retired convention ([[CORE-035]]) that now misdirect adopters. User filed the task accepting that framing.

- [x] Read relevant source files
- [x] **Archive skim** — skimmed for prior tasknotes touching these paths; see Discovery Notes
- [x] **Drift check** — verified; see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Drift check passed.** Both bullets exist verbatim at the cited line numbers (`starter-task/SKILL.md:89`, `file-followup/SKILL.md:87`). Comprehensive grep `grep -rn "Last updated" claude/ SPEC.md SPEC/ templates/` returns exactly 2 hits — the same 2 cited. No other residue.
- **Verdict shift (CORE-056 → CORE-073).** [[CORE-056]] (2026-05-04) explicitly flagged these as `**Last updated:** conditional paths in starter-task / file-followup SKILLs — guarded with "if it has one"; legacy-adopter parse path. Mostly dead post-[[CORE-035]]. Minor; defensible to leave.` That verdict was overridden by the [[CORE-073]] audit (2026-05-10): retired-field guards constitute orphans because the if-guard wording reads to a fresh adopter as "you may need to add a Last-updated line here," which is exactly the misdirection [[CORE-035]] retired. The shift is from "harmless dead branch" to "active misdirection vector." Filing CORE-075 ratifies the audit's framing.
- **Archive scope-touchpoints:** CORE-073 (audit that surfaced this), CORE-061 (FUTURE.md cleanup also driven by [[CORE-035]] retirement), CORE-056 (the prior contrary verdict). CORE-035 itself has no tasknote archive entry — it was a small task completed pre-tasknote-promotion-discipline.
- **No clarifications needed.** Task is fully scoped: delete 2 bullets, verify residue-free, no SPEC change, no template change, no PLAN.md format change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern:** both bullets sat under "Placement:" sub-sections. `starter-task/SKILL.md` had them at top level under Step 5; `file-followup/SKILL.md` had them indented (3-space) under numbered Step 4.1. No replacement needed — the convention is fully retired, so clean deletion is the move.
- **Implementation:** two single-bullet `Edit` calls, no other surrounding text touched. Both Placement sub-sections now end at the `(none — ...)` placeholder bullet, which reads cleanly.
- **No tests apply** — doc-only change; the meaningful test is the residue grep (Phase 3).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- **Targeted residue grep:** `grep -rn "Last updated" claude/ SPEC.md SPEC/ templates/` → 0 hits (exit 1). Confirms the targeted scope is purged.
- **Broader sweep:** `grep -rn "Last updated" --include="*.md" .` excluding archive and active tasknote → 3 matches, all legitimate references:
  1. `_project/PLAN.md:23` — CORE-075's own task description (archives at closure).
  2. `_project/PLAN.md:118` — CORE-035's `Completed` stub (historical record).
  3. `.claude/skills/audit/SKILL.md:56` — forked audit's Pass 4 rubric **defines** "Last updated:" residue as a thing to catch (per [[CORE-035]] retirement). Definition, not residue — keep.
- **No lint/type-check applies** to doc-only markdown edits beyond grep.
- **No frontend change** — visual-confirmation step does not apply.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep results:**

| Entry | Verdict |
| --- | --- |
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/CLAUDE-snippet.md` | no change |

All four docs reference the `/starter-task` and `/file-followup` skills (by name, install path, or smoke-test mention), but **none** reference the `Last updated:` convention. The retired-convention residue lived only in the two SKILL bodies cited in the task description.

**Final Summary:**

Deleted the two surviving `**Last updated:**` defensive-guard bullets at `claude/skills/starter-task/SKILL.md:89` and `claude/skills/file-followup/SKILL.md:87` (2 lines removed, 0 added). Comprehensive grep across `claude/`, `SPEC.md`, `SPEC/`, and `templates/` now returns zero hits — the convention is fully retired across active surfaces. Remaining matches in the broader sweep are all legitimate: CORE-035's `Completed` stub in PLAN.md, this task's own description, and the forked audit's Pass 4 rubric that **defines** "Last updated:" residue as a thing to look for. Closes [[CORE-073]] Audit Finding #3.

**Archived:** 2026-05-10
