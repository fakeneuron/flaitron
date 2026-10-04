---
title: audit-family 🔍 flag SPEC promotion
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-184]
---

# CORE-190 | audit-family 🔍 flag SPEC promotion

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-184]]

## 🎯 Goal

Promote CORE-184's 🔍 audit-family next-move flag from `claude/skills/ft-task/SKILL.md` §6 into SPEC §"Post-closure protocol" step 2 so `/ft-micro-task` and `/ft-close-epic` inherit the convention without per-skill duplication; trim the ft-task bullet to a citation.

## ✅ Acceptance

- [x] SPEC §"Post-closure protocol" step 2 carries the 🔍 audit-family flag rule (prefix candidate line + copy-paste line with 🔍 when next-move is `/ft-audit*`, with the MIGRATION.md §1.2.1 rationale + self-check note).
- [x] `claude/skills/ft-task/SKILL.md` Step 6 "Skill-specific" block's 🔍 bullet trimmed to a one-line citation pointing back to SPEC.
- [x] No edits to `/ft-micro-task` or `/ft-close-epic` skill files — both already cite SPEC §"Post-closure protocol" generically; SPEC promotion auto-propagates.
- [x] Doc-drift sweep at Phase 4 clean.

## 🧩 Subtasks

- [x] Insert audit-family 🔍 paragraph into SPEC.md §"Post-closure protocol" step 2 (after the "Either form" list, before step 3).
- [x] Trim the duplicated `**Audit-family flag.**` bullet in `claude/skills/ft-task/SKILL.md` Step 6 to a one-line SPEC citation.
- [x] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs".
- [x] Close (PLAN.md line → stub form, tasknote → archive/core/).

## 🔗 Related

- [[CORE-184]] — original landing of the 🔍 flag in ft-task SKILL §6; this task promotes it to SPEC and trims the duplicate.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit finding #3 (Medium) is a clean cite-don't-restate alignment — the 🔍 rule applies symmetrically to all three post-closure skills, so it belongs in SPEC's canonical post-closure section, not duplicated per skill. CORE-184 explicitly carved follow-up extension as out-of-scope; CORE-190 is that extension.

- [x] Read relevant source files — `SPEC.md` §"Post-closure protocol" (lines 444-524), `claude/skills/ft-task/SKILL.md` Step 6 (lines 137-149), `claude/skills/ft-micro-task/SKILL.md` Step 5 (lines 110-122), `claude/skills/ft-close-epic/SKILL.md` Step 9 (lines 172-196).
- [x] **Archive skim** — `CORE-184.md` (origin of the 🔍 flag) read in full. Re-scoped from structural fix to lightweight AI-output convention. Acceptance carved follow-up extension to other skills as out-of-scope — CORE-190 picks that up. `CORE-104.md` (skill namespace prefix) + `CORE-166.md` (audit scaffold fork-path) provide the upstream rationale for the `ft-audit*` vs `audit*` asymmetry that the 🔍 flag guards against.
- [x] **Drift check** — `grep -rn "🔍\|audit-family flag" SPEC.md SPEC/ claude/ docs/ templates/ README.md` confirms 🔍 next-move flag exists only at `claude/skills/ft-task/SKILL.md:149` in the contract surface. Other 🔍 hits in `claude/skills/ft-quality/SKILL.md` are unrelated (CLI status prefix). No prior SPEC reference. `/ft-micro-task` Step 5 (`claude/skills/ft-micro-task/SKILL.md:112`) + `/ft-close-epic` Step 9 (`claude/skills/ft-close-epic/SKILL.md:172`) both cite "per SPEC §'Post-closure protocol'" generically — SPEC promotion auto-propagates without per-skill edits.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  - Placement in SPEC step 2 (per task description): insert as a standalone paragraph after the "Either form" sub-list and before numbered step 3, indented 3 spaces to stay inside the numbered list item.
  - Cross-step phrasing: "prefix the candidate line (this step) and the copy-paste line (step 3) with 🔍" — names both locations explicitly so the rule reads complete from step 2.
  - ft-task SKILL §6 trim form: one-line bullet `**Audit-family flag** — see SPEC §"Post-closure protocol" step 2 for the 🔍 prefix convention on /ft-audit* next-move candidates.` (preserves the bullet position alongside the other two skill-specific items; cite-don't-restate-aligned).
  - The two siblings (`/ft-micro-task` + `/ft-close-epic`) get zero edits — they already inherit via their generic SPEC citation.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Pure cite-don't-restate consolidation. The 🔍 flag's content stays byte-for-byte intact; only its anchor moves from a per-skill bullet (ft-task SKILL §6) to the canonical post-closure step (SPEC §"Post-closure protocol" step 2). Two-file diff, no behavior change in `/ft-task` (the rule still fires identically); behavior gain in `/ft-micro-task` and `/ft-close-epic` because they now formally inherit the convention through their existing generic SPEC reference rather than silently not having it.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SPEC step 2's "Either form" sub-list carries existing inline conventions for next-move output (`[model]`-tagged candidate-line shape, Epic-continuation vs Open-menu branches). Appending a sibling `**Audit-family flag.**` paragraph below the sub-list extends that surface at the same indent depth and bold-prefix shape — no new section needed. For the ft-task SKILL §6 trim, the surrounding two bullets in "Skill-specific" use the "name → short rule" form; the citation-form bullet matches them.
- [x] Implemented the minimal solution — 1 paragraph added to `SPEC.md` §"Post-closure protocol" step 2 (4 lines including the blank-line separators), 1 bullet trimmed in `claude/skills/ft-task/SKILL.md` Step 6 (3-sentence multi-clause bullet → 1-sentence citation).
- [x] Updated/added tests for non-trivial behavior — N/A; pure markdown doc edits, no test toolchain applies.

**Implementation Notes:**

Edit 1 — `SPEC.md` §"Post-closure protocol" step 2: inserted the audit-family flag paragraph after the "Either form" sub-list and before numbered step 3, indented 3 spaces to stay inside the numbered list item. The paragraph reads:

> **Audit-family flag.** When a next-move candidate is an `/ft-audit*` slash command, prefix the candidate line (this step) and the copy-paste line (step 3) with 🔍. Audit-family skills are forked per project per `docs/MIGRATION.md` §1.2.1 — in adopter context the local fork is unprefixed (e.g., `/audit-docs`), not `/ft-audit-docs`. The 🔍 marker doubles as a self-check for any AI about to emit `/ft-audit*` as next move.

Cross-step phrasing "(this step) and the copy-paste line (step 3)" names both locations so the rule reads complete from its step-2 anchor without forcing the reader into step 3.

Edit 2 — `claude/skills/ft-task/SKILL.md` Step 6 "Skill-specific" block: the previous three-sentence bullet collapsed to a one-line citation:

> `- **Audit-family flag** — see SPEC §"Post-closure protocol" step 2 for the 🔍 prefix convention on /ft-audit* next-move candidates.`

Cite-don't-restate-aligned. The bullet stays in its position alongside the other two skill-specific items (candidate-line shape, copy-paste line) for the same surface reason it was there originally.

No edits to `/ft-micro-task` (Step 5 line 112) or `/ft-close-epic` (Step 9 line 172-174): both already cite "per SPEC §'Post-closure protocol'" generically, so the promotion auto-propagates. Verified during Drift check.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; markdown doc edits, no test suite.
- [x] Ran lint/type-check on changed code — N/A; markdown doc edits, no toolchain.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; no frontend surface.

**Testing Notes:**

Pure markdown contract-surface edit. Verification is by inspection: the inserted SPEC paragraph sits inside step 2's numbered-list-item indent (3 spaces) alongside the existing "Either form" block; the trimmed ft-task SKILL bullet renders cleanly alongside its two siblings. Both render as intended in GitHub-flavored markdown.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md no change · SPEC.md UPDATED (added 🔍 audit-family flag paragraph in §"Post-closure protocol" step 2) · docs/MIGRATION.md no change (already the rationale anchor via §1.2.1) · claude/AGENTS-snippet.md no change · docs/CONVENTIONS.md no change · CONTRIBUTING.md no change · SECURITY.md no change · docs/AGENT-NEUTRALITY.md no change (🔍 prefix is agent-neutral) · docs/PLATFORMS.md no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/`.
- [x] Recap drafted.

**Final Summary:**

Promoted CORE-184's 🔍 audit-family next-move flag from `claude/skills/ft-task/SKILL.md` §6 (Step 6 "Skill-specific" block) into `SPEC.md` §"Post-closure protocol" step 2 — one paragraph added at the canonical post-closure anchor, naming both the candidate line (step 2) and the copy-paste line (step 3) so the rule reads complete from its step-2 home. After promotion, trimmed the duplicated ft-task SKILL bullet to a one-line SPEC citation (cite-don't-restate-aligned). `/ft-micro-task` and `/ft-close-epic` auto-inherit the convention via their existing generic SPEC reference — no per-skill edits needed. 2 files touched; ~4 lines added in SPEC, ~3 lines collapsed to 1 in the SKILL.

**Archived:** 2026-05-24
