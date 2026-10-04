---
title: starter promotion verification
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-06
due:
related-tasks: []
---

# CORE-032 | starter promotion verification

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a promotion-time check to the task skill's Step 3a so the captured starter context (Solution shape / Decisions locked / Files to touch) is verified to flow into the scaffolded Goal / Acceptance / Subtasks during starter promotion.

## ✅ Acceptance

- [ ] `claude/skills/task/SKILL.md` Step 3a Step 4 gains one new sub-bullet (the Fidelity check) at the end of the existing four-bullet spec-sections list, with the user-approved wording.
- [ ] Hardlink atomicity confirmed: edit visible at both `.claude/skills/task/SKILL.md` and `claude/skills/task/SKILL.md` after a single Edit call (same inode `79895343`).
- [ ] No collateral changes — Step 3a Steps 1, 2, 3, 5, 6, 7 + trailing note paragraph remain byte-identical; SPEC.md untouched (intent already captured in §"Starter tasknotes" Promotion §3).
- [ ] `cd viz && npm test -- --run` passes (smoke check; no logic change expected) and `npx tsc --noEmit` clean.

## 🧩 Subtasks

- [x] Confirm SKILL.md hardlink + locate Step 3a Step 4 bullet list (lines 95-99).
- [ ] Append the Fidelity check sub-bullet to Step 3a Step 4 with user-approved wording.
- [ ] Verify the edit landed in both hardlinked paths (single `stat`/`diff` check).
- [ ] Run `cd viz && npm test -- --run && npx tsc --noEmit` as smoke check.
- [ ] Phase 4 closure: flip PLAN.md, archive tasknote, recap.

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Captured starter context (`Solution shape` / `Decisions locked` / `Files to touch`) is high-value but easy to drop during AI re-synthesis at Step 3a Step 4. Existing checks (Step 3a Step 1 drift-check + Phase 1 drift-check) only cover code-citation drift, not content fidelity. Single-line skill addition closes a verification gap that's been latent since [[CORE-027]] introduced starters.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions — resolved 2026-05-06 via AskUserQuestion: (1) model retag PLAN.md `[sonnet]` → `[opus]` and proceed; (2) placement = append sub-bullet to Step 3a Step 4's bullet list, recommended wording.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Skill paths hardlinked.** `inode 79895343` → `.claude/skills/task/SKILL.md` ↔ `claude/skills/task/SKILL.md`. Single edit, both paths in sync (per [[CORE-038]] finding).
- **Step 3a current shape (lines 85-108).** Step 1 = drift-check captured citations vs current code. Steps 2-4 = flip frontmatter + nav header + insert spec sections. Step 5 = absorb-vs-preserve starter block. Steps 6-7 = phase sections + tick PLAN review. Note paragraph at end ties starter's "Open at promotion" sub-heading to Phase 1 Step 5 (clarifying questions).
- **Starter template structured sub-headings** (`templates/tasknote-starter-template.md`): `Why this exists` / `Solution shape` / `Files to touch` / `Explicitly out of scope` / `Decisions locked in this conversation` / `Open at promotion` / `Related`. Task description names three of these (`Solution shape` / `Decisions locked` / `Files to touch`) as the high-value substance worth verifying.
- **SPEC.md §"Starter tasknotes" Promotion §3** already says: `"The starter context informs the spec sections; it is not silently authoritative — Phase 1's drift check applies fully."` This captures intent (starter context should reach the spec sections) but only operationalizes code drift, not content fidelity. The skill addition operationalizes the missing half — cite-don't-restate norm satisfied (SPEC carries intent, skill carries mechanics; per [[CORE-038]]).
- **Archive skim findings:**
  - `archive/core/CORE-027.md` — original starter feature; defined Step 3a's promotion shape (drift-check + scaffold + flip status). No fidelity check at synthesis.
  - `archive/core/CORE-030.md` — Step 3c (blocked resume) modeled on Step 3a's structure. No fidelity check either.
  - `archive/core/CORE-038.md` — recent SKILL.md cite-don't-restate trim. Step 3a's substance was preserved (lines 85-108 unchanged). Step 1.5 explicitly carved out as "hot path, untouched"; the rest of Step 3a was light enough not to need trimming.
- **Constraint:** at promotion time, Goal is synthesized but Acceptance/Subtasks remain empty checklists (filled during Phase 1 Discovery). The fidelity check therefore spans both moments — verify Goal at Step 3a, carry the same lens into Phase 1 when populating Acceptance/Subtasks. Phrasing must reflect this without ballooning past "single line".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sub-bullets inside Step 4's bullet list already exist (the four spec-section bullets). Adding a fifth parallel bullet extends an existing shape; no new pattern needed.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only skill addition; no logic to test)
- [x] Ran targeted tests on changed files — viz suite as smoke check

**Implementation Notes:**

- **Single edit, two paths.** Edit applied to `.claude/skills/task/SKILL.md`; the file is hardlinked (`stat -f "%i %N"` → both paths resolve to inode 79916629 post-edit). `diff -q` between the two paths is silent. Per [[CORE-038]] hardlink finding.
- **Edit shape:** appended one sub-bullet to the existing four-bullet list at lines 95-99 (now 95-100). Indentation `   - ` matches the four siblings; bold lead-in `**Fidelity check**` matches Step 4's other bolded items elsewhere in the skill. Step 3a Steps 1, 2, 3, 5, 6, 7 + trailing note paragraph unchanged.
- **SPEC.md untouched.** §"Starter tasknotes" Promotion §3 already encodes intent (`"The starter context informs the spec sections; it is not silently authoritative — Phase 1's drift check applies fully."`). The skill addition operationalizes the missing half — cite-don't-restate norm satisfied per [[CORE-038]].

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `cd viz && npm test -- --run`: **53/53 pass** (`parser.test.ts` 29, `tasknote.test.ts` 24).
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit`: clean (exit 0).
- [x] (frontend) Asked the user for visual confirmation — N/A (markdown-only skill change; no UI surface).
- [x] Fixed all introduced issues — none introduced.

**Testing Notes:**

- 53/53 viz tests pass; tsc clean. No code logic touched — smoke check only.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — only `claude/skills/task/SKILL.md` (the change itself); SPEC.md intentionally unchanged.
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Added a single **Fidelity check** sub-bullet to `claude/skills/task/SKILL.md` Step 3a Step 4 (line 100), parallel to the four existing spec-section bullets: _"verify the starter's `Solution shape` / `Decisions locked` / `Files to touch` are reflected in the synthesized Goal (and earmarked for Phase 1's Acceptance/Subtasks population); flag any dropped substance to the user."_

Closes a verification gap latent since [[CORE-027]] introduced starters: Step 3a Step 1's drift-check and the Phase 1 drift-check both target code-citation drift; neither catches content-fidelity loss when the AI re-synthesizes structured starter content (`### Solution shape` / `### Decisions locked in this conversation` / `### Files to touch`) into Goal/Acceptance/Subtasks. The Fidelity check makes the latter explicit.

SPEC.md untouched — §"Starter tasknotes" Promotion §3 already encodes intent (`"The starter context informs the spec sections; it is not silently authoritative — Phase 1's drift check applies fully."`); the skill addition operationalizes the missing half per [[CORE-038]] cite-don't-restate norm (SPEC carries intent, skill carries mechanics).

**Hardlink atomicity:** both `.claude/skills/task/SKILL.md` and `claude/skills/task/SKILL.md` share inode `79916629` post-edit; `diff -q` silent. Single Edit propagated to both paths atomically.

**Pre-flight:** PLAN.md tagged `[sonnet]`; user retagged to `[opus]` at Step 1.5 and proceeded.

**Tests:** 53/53 viz tests pass (`parser.test.ts` 29, `tasknote.test.ts` 24); `tsc --noEmit` clean. Markdown-only skill change — smoke check only.

**Archived:** 2026-05-06
