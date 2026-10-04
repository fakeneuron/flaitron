---
title: "blocked" workflow phase
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-04
due:
related-tasks: []
---

# CORE-030 | "blocked" workflow phase

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Codify the `status: blocked` lifecycle — entry verdicts, mid-phase transitions, and closure handling — in SPEC.md and the `/task` skill so the existing data shape (frontmatter enum, viz badge, `Blocked by [[ID]]` parser) is matched by an actual workflow contract.

## ✅ Acceptance

- [x] `SPEC.md` gains a new top-level §"Blocked tasks" defining: two signals (PLAN-line `Blocked by [[ID]]` vs tasknote `status: blocked`) as independent layers; entry paths (Phase 1 Re-scope; mid-Phase-2 flip); parked-state semantics (no Phase 4 while blocked); exit (flip back to `in-progress`); viz interaction note.
- [x] `SPEC.md` Phase 1 Discovery + Phase 2 Execution cite the new section so the contract is reachable from each phase.
- [x] `SPEC.md` `Version` bumped v0.5.0 → v0.6.0 (additive minor — release tag deferred to a follow-up release task per established pattern).
- [x] `claude/skills/task/SKILL.md` Step 2 file-state branch is extended from three-way to four-way: `starter` / `blocked` (resume) / other / absent.
- [x] `claude/skills/task/SKILL.md` gains Step 3c "Resume a blocked tasknote" mirroring Step 3a's structure (drift-check the parked work, flip status, update nav header, continue at Phase 2).
- [x] `claude/skills/task/SKILL.md` Step 4 (Phase 1 Re-scope) + Step 5 (Phase 2) cross-reference the new SPEC §"Blocked tasks" so the skill stays consistent with the contract.
- [x] `viz/` tests + `tsc --noEmit` remain green (53/53 pass; tsc exit 0 — no code changes; existing rendering already matches the independent-layers design).

## 🧩 Subtasks

- [x] 1. Draft the new §"Blocked tasks" body for SPEC.md (two signals; entry paths; parked semantics; exit; viz note) and choose insertion point (between §"The 4-phase workflow" and §"Post-closure protocol").
- [x] 2. Patch SPEC.md Phase 1 Discovery (Re-scope rationale → cite §"Blocked tasks") and Phase 2 Execution (mid-flow blocked transition → cite §"Blocked tasks").
- [x] 3. Bump SPEC.md `Version` v0.5.0 → v0.6.0.
- [x] 4. Extend `claude/skills/task/SKILL.md` Step 2 to a four-way file-state branch: `starter` → 3a, `blocked` → 3c (resume), other → stop, absent → 3b.
- [x] 5. Add Step 3c "Resume a blocked tasknote" mirroring Step 3a's shape (drift-check captured Phase-2 state, flip `status: blocked` → `in-progress`, update nav header `⏸ Blocked` → `🟢 In progress`, continue at Phase 2).
- [x] 6. Patch skill Step 4 (Phase 1 Re-scope path) + Step 5 (Phase 2 mid-flow flip) to cite the new SPEC section.
- [x] 7. Run `viz/` test suite + `tsc --noEmit` to confirm no incidental breakage. **Result:** 53/53 tests pass; tsc exit 0.
- [x] 8. Final drift sweep: re-grep `blocked|Blocked` across the repo to confirm no other docs/templates reference the now-defined contract incorrectly. **Result:** all references consistent. `templates/` has no `blocked` references (default scaffold uses `not-started`); `claude/skills/starter-task/SKILL.md:39` mentions "blocked" as a possible existing-file state, still accurate.

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The contract gap described in PLAN.md is real and the affected files (SPEC.md, claude/skills/task/SKILL.md) are unambiguous. No re-scoping needed.

- [x] Read relevant source files
- [x] **Drift check** — clean. SPEC.md:362 (Relevance Assessment verdicts), SPEC.md:213 (frontmatter enum), viz/src/ui/App.tsx:39,47 (rose `Blocked` badge), viz/src/parser.ts:61 (`Blocked by [[ID]]` regex), viz/src/ui/App.tsx:893 (BlockerChip) all match the PLAN.md description exactly. No paths or symbols have moved.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Two parallel "blocked" signals exist today:
- **PLAN-line:** `Blocked by [[ID]]` in the long description; parsed by `viz/src/parser.ts` into `Task.blockedBy`; rendered as `BlockerChip` regardless of whether a tasknote exists.
- **Tasknote-level:** `status: blocked` in YAML frontmatter; rendered as a rose status badge on rows that have a tasknote.

These were added independently (CORE-024 added the PLAN-line parsing; the frontmatter enum has carried `blocked` since CORE-017). Neither has a workflow contract defining how a task enters or exits the blocked state, or whether/how the two signals are meant to reinforce each other.

**Open design questions (Q1–Q3 below)** are tracked to AskUserQuestion before populating Subtasks.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `SPEC.md` §"Starter tasknotes" is the closest precedent (status-driven workflow concept added between existing sections with its own lifecycle subsection). New §"Blocked tasks" mirrors that shape: paragraph definition → signals table → entry/state/exit subsections → viz interaction note. `claude/skills/task/SKILL.md` Step 3c mirrors Step 3a (Promote a starter) — same five-step shape (drift-check, status flip, nav-header swap, optional cleanup, continue at next phase). Both extensions reuse established patterns rather than inventing new shapes.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only spec changes; no logic to test)
- [x] Ran targeted tests on changed files — viz tests run as smoke check (53/53 pass; tsc clean)

**Implementation Notes:**

Three files touched:

- **`SPEC.md`** — version v0.5.0 → v0.6.0; Phase 1 Discovery rationale extended to point at §"Blocked tasks" for the Re-scope (blocked subset) entry path; Phase 2 Execution body extended with a paragraph on mid-flow parking; new top-level §"Blocked tasks" inserted between §"The 4-phase workflow" and §"Post-closure protocol", containing the two-signals table, entry paths (Phase 1 Re-scope, mid-Phase-2 parking), parked-state semantics, exit/resume protocol, and viz interaction note.
- **`claude/skills/task/SKILL.md`** — Step 2 three-way → four-way file-state branch (adds `status: blocked` → Step 3c); new Step 3c "Resume a blocked tasknote" mirroring Step 3a structure; Step 4 item 2 Relevance Assessment gains a `Re-scope (blocked subset)` bullet; Step 5 Phase 2 line gains the mid-execution parking instruction.
- **`_project/tasknote/CORE-030.md`** — this tasknote (will move to archive at Phase 4).

**Versioning:** v0.5.0 → v0.6.0 is an additive minor — new optional convention, no parser/schema/template change. Adopting projects' tools that don't care about workflow contracts continue working unchanged. Release tag deferred to a follow-up release task per the established pattern (CORE-028 = v0.4.0, CORE-025 = v0.3.0).

**Viz unchanged:** the design choice (Q3 = independent layers) means existing viz rendering is already correct — `STATUS_BADGE.blocked` (rose) for tasknote-status, `BlockerChip` for PLAN-line `Blocked by [[ID]]`. Both render in their own layer with no enforcement between them.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz: 53/53 pass
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit` exit 0
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI changes; the design intentionally leaves viz alone)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

Markdown-only changes have no native test harness. Verification = (1) viz suite as a smoke check that the unchanged code paths still pass; (2) repo-wide `grep "blocked|Blocked"` drift sweep confirming all references stay consistent with the now-defined contract.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — `docs/PHILOSOPHY.md` Relevance Assessment paragraph stays accurate (3 verdicts unchanged); `docs/MIGRATION.md` phase references unaffected; `templates/` unaffected (scaffold default is `not-started`); `README.md` unaffected.
- [x] Updated PLAN.md (line moved to `## Completed` with `Completed 2026-05-04` summary)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Defined the `status: blocked` workflow lifecycle that was missing from the SPEC even though `blocked` already existed in the frontmatter enum (CORE-017), the viz status badge (FE-004 era), and the PLAN-line `Blocked by [[ID]]` parser (CORE-024).

**Design (user-clarified via AskUserQuestion):**

1. **Phase 1 entry → Re-scope, no 4th verdict.** A blocker discovered in Phase 1 Discovery causes Re-scope: add `Blocked by [[ID]]` to the PLAN.md long description, delete the just-scaffolded tasknote, halt. The verdict count stays at 3.
2. **Mid-Phase-2 → park-and-resume.** A blocker that surfaces during execution flips the tasknote to `status: blocked` (with matching `⏸ Blocked` nav-header chip) and parks it at `_project/tasknote/<TASK-ID>.md`. Phase 4 does not run while blocked. Resume on `/task <ID>` re-invocation: drift-check, flip status back, continue Phase 2.
3. **Two signals as independent layers.** PLAN-line `Blocked by [[ID]]` (= "filed, not started, dependency cited") and tasknote `status: blocked` (= "started, parked") describe different states. Viz already renders them independently — no code change needed.

**Surface area:**
- `SPEC.md`: version v0.5.0 → v0.6.0; Phase 1 Discovery + Phase 2 Execution paragraphs cite the new section; new top-level §"Blocked tasks" inserted between §"The 4-phase workflow" and §"Post-closure protocol".
- `claude/skills/task/SKILL.md`: Step 2 three-way → four-way file-state branch; new Step 3c "Resume a blocked tasknote" mirroring Step 3a; Step 4 item 2 gains `Re-scope (blocked subset)` bullet; Step 5 Phase 2 line gains mid-execution parking instruction.
- `viz/`: untouched — 53/53 tests pass, tsc clean. Independent-layers design means existing rendering is already correct.

**Versioning:** v0.6.0 is additive minor (new optional convention; no parser/schema/template change). Adopting projects pick up the contract on their next submodule bump; legacy archived tasknotes need no migration. Release tag deferred to a follow-up release task per the established pattern.

**Archived:** 2026-05-04
