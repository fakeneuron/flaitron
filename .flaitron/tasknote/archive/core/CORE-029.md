---
title: epic lifecycle
status: completed
priority: High
area: core
tags: []
created: 2026-05-04
due:
related-tasks: []
---

# CORE-029 | epic lifecycle

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Codify the epic open-with-discovery + close-with-audit lifecycle in `SPEC.md` (and a parallel note in `templates/tasknote-README.md`) so code-sweep / multi-child epics consistently bracket their child tasks with a planning task and a final audit task.

## ✅ Acceptance

- [ ] `SPEC.md` gains a new top-level §"Epic lifecycle" section between §"Task ID convention" and §"Task-line format", covering: epic-opening **Discovery** subtask role (`.1`), epic-closing **Audit** subtask role (final `.N`), qualitative threshold (code sweeps + multi-child features; user judgment), and follow-up handling when audit surfaces misses (file as additional epic children; re-audit if many)
- [ ] `SPEC.md` `Version:` header bumped v0.4.0 → v0.5.0 (additive minor — new optional convention, no migration). Release tag is a separate follow-up task, mirroring the CORE-027 → CORE-028 pattern
- [ ] `templates/tasknote-README.md` Layout section gains a parallel one-line note pointing at SPEC §"Epic lifecycle"
- [ ] `claude/skills/task/SKILL.md` Notes section "Sub-tasks of an epic" bullet extended with a sentence flagging that the first (discovery) and final (audit) subtasks of an epic carry epic-level responsibilities — see SPEC §"Epic lifecycle"
- [ ] SPEC text frames the convention as forward-looking — existing epics (e.g., `CORE-EPIC-009`) need no migration
- [ ] `viz/` remains green (`tsc --noEmit` + `npm test`); no parser changes expected since discovery/audit are ordinary numbered epic subtasks

## 🧩 Subtasks

- [ ] Draft the §"Epic lifecycle" copy (review with user before applying)
- [ ] Edit `SPEC.md`: insert the new section + bump `Version:` header to v0.5.0
- [ ] Edit `templates/tasknote-README.md`: append parallel note to Layout bullet
- [ ] Edit `claude/skills/task/SKILL.md`: extend the "Sub-tasks of an epic" Notes bullet
- [ ] Verify `viz/` tests + tsc still pass
- [ ] Phase 4 closure: PLAN.md flip → Completed, archive tasknote, recap

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SCRATCH.md captures user-felt friction (no formal lifecycle for code-sweep / multi-child epics). Codifying the open-with-discovery + close-with-audit pattern in SPEC.md is purely additive guidance, fits cleanly alongside §"Starter tasknotes" (parallel "self-contained workflow shape gets its own section" precedent), and pays for itself the next time an epic is filed. No reason to re-scope or de-scope.

- [x] Read relevant source files
- [x] **Drift check** — paths cited in the PLAN.md long description (`_project/SCRATCH.md`, `SPEC.md`, `templates/tasknote-README.md`) all exist; SCRATCH note still accurately captures the desired pattern. CORE-EPIC-009 in PLAN.md (`.1`–`.5` children, no discovery/audit) confirms the new convention applies forward only — no past-epic migration needed (matches PLAN.md description's "No migration of past epics").
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Decisions resolved via AskUserQuestion (2026-05-04):**

1. **Naming:** `Discovery` + `Audit`. User said "kickoff as you see best fit" but used "discovery task" / "audit task" themselves — going with their natural wording. Risk: "Discovery" already names Phase 1 of every tasknote; SPEC copy will disambiguate as *epic-level* discovery (scope: plan child tasks) vs *task-level* Phase 1 Discovery (scope: this one task).
2. **Structure:** Discovery is `<AREA>-<N>.1`, audit is the final `.N`. Same grammar as existing epic subtasks — no new ID convention.
3. **Placement:** New top-level §"Epic lifecycle" between §"Task ID convention" and §"Task-line format" in SPEC.md. Mirrors §"Starter tasknotes" precedent.
4. **Threshold:** Qualitative judgment. Wording matches PLAN.md description ("code sweeps + multi-child features only, not simple implementations").

**User-added scope (beyond original PLAN.md description):** "let's make sure this is clear in CLAUDE context or skills as appropriate" → added `claude/skills/task/SKILL.md` Notes bullet to deliverables. CLAUDE-snippet.md left untouched (covers adoption block; epic-lifecycle guidance lives in SPEC and skill, both of which adopting projects already pick up via submodule).

**SPEC version-bump rationale:** Adding a new top-level workflow section parallels CORE-027's §"Starter tasknotes" addition, which bumped v0.3.0 → v0.4.0. Additive convention, no migration → minor bump v0.4.0 → v0.5.0. Tag + release is a separate follow-up task (filed at closure if user agrees).

**Audit-as-de-scope edge case:** If an audit pass turns up zero issues, the audit task still proceeds (its work is the verification). Phase 4 final summary records "no follow-ups surfaced." Not a de-scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrored §"Starter tasknotes" precedent (CORE-027, v0.3.0 → v0.4.0): a self-contained workflow shape gets its own top-level SPEC section with definition / structure / lifecycle / threshold paragraphs. Same shape applied here.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only changes; no code logic affected, no parser change since discovery/audit subtasks reuse existing `<AREA>-<N>.<SUB>` grammar)
- [x] Ran targeted tests on changed files

**Implementation Notes:**

Four files touched:

- `SPEC.md` — `Version:` v0.4.0 → v0.5.0; new top-level §"Epic lifecycle" inserted between §"Task ID convention" and §"Task-line format" (~58 lines: opening definition, epic-vs-Phase-1 disambiguation, numbering convention + worked example, 5-step lifecycle, threshold paragraph, forward-looking note).
- `templates/tasknote-README.md` — new "Epic lifecycle" bullet appended to the Layout section, parallel to the starter-template bullet.
- `claude/skills/task/SKILL.md` — Notes section "Sub-tasks of an epic" bullet extended with one sentence flagging Discovery (`.1`) + Audit (final) roles and pointing at SPEC §"Epic lifecycle".
- `_project/tasknote/CORE-029.md` — this tasknote (Discovery + Execution + Testing notes).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation — N/A (doc-only; user reviewed proposed §"Epic lifecycle" copy verbatim before edits landed)
- [x] Fixed all introduced issues — none surfaced

**Testing Notes:**

`viz/` regression check:

- `npm test -- --run` → 53/53 pass (29 parser + 24 tasknote)
- `npx tsc --noEmit` → clean

No parser change was needed. Discovery (`.1`) and Audit (final `.N`) are ordinary numbered epic subtasks under the existing `<AREA>-<NUMBER>.<SUB>` grammar, already handled by `viz/src/parser.ts` `groupTasks`.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-04`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Codified the epic open-with-Discovery + close-with-Audit lifecycle in flowtron's SPEC. New top-level §"Epic lifecycle" sits between §"Task ID convention" and §"Task-line format" and covers: epic-opening Discovery subtask (`<AREA>-<N>.1`, deliverable is the filed child task list in PLAN.md, not code), epic-closing Audit subtask (final `.N`, verifies the completed work sits well in the codebase), 5-step lifecycle including audit-follow-up handling (few → file as additional children + close audit; many → file follow-ups + fresh Audit subtask), qualitative threshold (code sweeps + multi-child features; user judgment), and an explicit forward-looking note (existing in-flight epics like `CORE-EPIC-009` need no migration). Parallel one-line bullet added to `templates/tasknote-README.md` Layout section; `claude/skills/task/SKILL.md` "Sub-tasks of an epic" Notes bullet extended to flag Discovery + Audit roles. SPEC bumped v0.4.0 → v0.5.0 (additive minor — new optional convention, no code or schema change); release tag is a follow-up task mirroring CORE-027 → CORE-028. SCRATCH.md note resolved and superseded; can be cleared. User-clarified via AskUserQuestion that naming was `Discovery` + `Audit` (not `Kickoff`), structure was numbered epic subtasks (no special `.0` slot), placement was a new top-level SPEC section, and threshold was qualitative (not numeric). `viz/` parser unaffected — discovery/audit are ordinary numbered subtasks; 53/53 tests pass, tsc clean.

**Archived:** 2026-05-04
