---
title: post-closure copy-paste grammar widening
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-184, CORE-167, CORE-158]
---

# CORE-189 | post-closure copy-paste grammar widening

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-184]] [[CORE-167]] [[CORE-158]]

## 🎯 Goal

Widen the SPEC §"Post-closure protocol" step 3 copy-paste grammar to a generic `/<ft-skill> <args>` shape so the audit-family slash commands introduced as next-move candidates by CORE-184's 🔍 flag have a documented copy-paste form (the current grammar enumerates only `ft-task` / `ft-micro-task` / `ft-starter-task`).

## ✅ Acceptance

- [ ] SPEC §"Post-closure protocol" step 3 code-fence widened from `/<ft-task|ft-micro-task|ft-starter-task> <NEXT-ID>` to `/<next-skill> <args>` (matches `/ft-close-epic` SKILL Step 9's existing form)
- [ ] SPEC §"Post-closure protocol" step 3 prose extended to name `/ft-audit*` audit follow-ups (with adopter unprefixed-fork pointer to §"Skill namespace") and generalize `<args>` semantics
- [ ] `claude/skills/ft-task/SKILL.md` §6 copy-paste-line bullet widened to mirror SPEC code-fence shape
- [ ] `claude/skills/ft-micro-task/SKILL.md` Step 5 copy-paste-line bullet widened to mirror SPEC code-fence shape
- [ ] `claude/skills/ft-close-epic/SKILL.md` Step 9 — parity-verified, no edit needed (already on `/<next-skill> <args>` form)
- [ ] Doc-drift sweep clean across `_project/tasknote/README.md` §"AI-referenced docs" (SPEC.md is the only AI-referenced doc touched; everything else "no change")

## 🧩 Subtasks

- [x] Read SPEC §"Post-closure protocol" + the three SKILL files; grep for any other instances of the enumerated form
- [x] Skim CORE-184 / CORE-167 / CORE-158 in archive for prior decisions on this surface
- [ ] Edit `SPEC.md` §"Post-closure protocol" step 3 — widen code-fence + extend prose to cover audit-family + adopter unprefixed forks + generalize `<args>` semantics
- [ ] Edit `claude/skills/ft-task/SKILL.md` line 148 — widen code-fence to `/<next-skill> <args>`
- [ ] Edit `claude/skills/ft-micro-task/SKILL.md` line 122 — widen code-fence to `/<next-skill> <args>`
- [ ] Phase 4 doc-drift sweep across AI-referenced docs
- [ ] Close — flip PLAN.md to stub form + archive tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-184]] — added the 🔍 audit-family next-move flag that exposed the gap
- [[CORE-167]] — previously propagated the enumeration form into `ft-task` SKILL §6 (the pattern we widen)
- [[CORE-158]] — previously introduced the enumeration into SPEC (the canonical source we widen)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task is well-scoped. CORE-184 added a 🔍 audit-family next-move convention to `/ft-task` Step 6 but the underlying copy-paste grammar at three locations (SPEC step 3, ft-task §6, ft-micro-task Step 5) still enumerates only the three tasknote-runner skills (`/ft-task|ft-micro-task|ft-starter-task`), leaving `/ft-audit*` (and adopter unprefixed `/audit-*` forks) with no documented copy-paste shape. `/ft-close-epic` Step 9 already uses the target generic form `/<next-skill> <args>`; widening the other three to match it eliminates the gap and brings the four locations into parity.

- [x] Read relevant source files — SPEC.md §"Post-closure protocol" (lines 444-524), `claude/skills/ft-task/SKILL.md` §6 (lines 137-149), `claude/skills/ft-micro-task/SKILL.md` Step 5 (lines 110-122), `claude/skills/ft-close-epic/SKILL.md` Step 9 (lines 172-196).
- [x] **Archive skim** — three prior tasknotes on this surface:
  - **CORE-158** (2026-05-23) — introduced the enumeration `/<ft-task|ft-micro-task|ft-starter-task>` into SPEC §"Post-closure protocol" step 3 (was previously a bare `/ft-task`). Generalized from a single hardcoded skill to a three-skill alternation. Pattern: SPEC is canonical; prose explanation enumerates use cases for discoverability.
  - **CORE-167** (2026-05-23) — propagated the SPEC enumeration form into `ft-task` SKILL §6 (was lagging at the bare `/ft-task` form). Pattern: skill files mirror SPEC's code-fence shape; trailing one-line operator-nudge ("substitute the next task's PLAN-line `[model]` and the right slash command") carries the discoverability burden in skill files (no cite needed).
  - **CORE-184** (2026-05-24) — added the 🔍 audit-family next-move flag to `ft-task` SKILL §6. Notes "those stay out of scope; if the convention proves valuable, follow-up tasks can extend it." — CORE-189 is the natural follow-up to widen the underlying grammar; CORE-190 is the parallel follow-up to promote the 🔍 flag itself from `ft-task` SKILL to SPEC.

- [x] **Drift check** — all paths and line numbers cited in the task description match current code: SPEC.md:521 enumerated form ✓, ft-task SKILL:148 enumerated form ✓, ft-micro-task SKILL:122 enumerated form ✓, ft-close-epic SKILL:196 generic `/<next-skill> <args>` form ✓. Grep across `SPEC.md`, `SPEC/`, `claude/`, `docs/`, `templates/`, `README.md` confirms only the three named files carry the enumerated form. No stray instances.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Explicit assumptions: (1) target grammar is `/<next-skill> <args>` matching `/ft-close-epic`'s existing form (per task description); (2) SPEC prose extends to add `/ft-audit*` as a named candidate and point to §"Skill namespace" for the adopter unprefixed-fork rule; (3) skill files mirror the code-fence shape only (no expanded prose, matching CORE-167's posture); (4) `/ft-close-epic` SKILL Step 9 is already on target form — parity-verified, no edit needed; (5) CORE-184's 🔍 audit-family flag stays in `ft-task` SKILL §6 (CORE-190 is the separate promotion task — not in scope here).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Scope is purely grammatical.** Widen the code-fence shape at three locations to a generic form that already lives in the fourth location (`/ft-close-epic` Step 9). No behavior change — the AI emitting the copy-paste line substitutes the actual skill at emission time; widening the shape just documents the broader candidate set (audit family, plus future flowtron skills that don't take a task ID).

**Cite-don't-restate posture preserved.** Per CORE-167's precedent, skill files mirror SPEC's code-fence shape but don't extend the prose. Each skill file keeps its existing brief operator-nudge ("substitute the next task's PLAN-line `[model]` and the right slash command") unchanged. Only SPEC's prose grows — to name `/ft-audit*` as a named candidate and generalize `<args>` semantics for non-tasknote-runner skills.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `/ft-close-epic` SKILL Step 9 (line 196) already uses the generic `/<next-skill> <args>` shape; widening the other three sites brings them into parity. No new shape invented; an existing in-codebase pattern is generalized to a fourth location and lifted into SPEC as the canonical form.
- [x] Implemented the minimal solution — 3 edits, ~3 lines net change:
  - `SPEC.md` §"Post-closure protocol" step 3 — code-fence widened + prose extended to name `/ft-audit*` (with adopter unprefixed-fork pointer to §"Skill namespace") and generalize `<args>` semantics for non-tasknote-runner skills
  - `claude/skills/ft-task/SKILL.md` line 148 — code-fence widened (one token: alternation → `<next-skill>`; `<NEXT-ID>` → `<args>`)
  - `claude/skills/ft-micro-task/SKILL.md` line 122 — same one-token widening
- [x] Updated/added tests for non-trivial behavior — N/A; markdown doc edits, no test toolchain applies.

**Implementation Notes:**

**`/ft-close-epic` SKILL Step 9 — no edit needed.** Parity-verified: already on `/<next-skill> <args>` form. The skill's `/ft-file-followup` exception prose stays as-is.

**Grep verification post-edit.** Grep across `SPEC.md`, `SPEC/`, `claude/`, `docs/`, `templates/`, `README.md` returns zero hits for the old enumeration `ft-task|ft-micro-task|ft-starter-task`. All four canonical locations now carry the `/<next-skill> <args>` form.

**Cite-don't-restate posture preserved per CORE-167.** Skill files mirror only the code-fence shape; their existing brief operator-nudge ("substitute the next task's PLAN-line `[model]` and the right slash command") stands unchanged. Only SPEC's prose grows — to name `/ft-audit*` as a named candidate and generalize `<args>` semantics.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; markdown doc edits, no test surface affected.
- [x] Ran lint/type-check on changed code — N/A; markdown doc edits, no toolchain applies.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; no frontend touched.

**Testing Notes:**

Pure markdown doc edits to SPEC.md + two SKILL files. Verification is by inspection (already done): code-fence shape parity across the four locations, grep returns zero stale enumerations, SPEC prose still reads as one continuous paragraph after the extension.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** across `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — **updated** (§"Post-closure protocol" step 3 code-fence + prose extension; this is the canonical change)
  - `docs/MIGRATION.md` — no change (adoption + bump procedures don't restate this grammar)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **drift surfaced (pre-existing, not introduced by this task)**: line 36 cites SPEC §"Post-closure protocol" §3 with line range `L498-501`; actual current span is `L518-524`. The cite was already stale pre-edit (L498-501 has not matched step 3's location for some time); my widening shifted the closing prose by one sentence so the span ends at L524 now. **Out of scope per CORE-189**: the cite is a pre-existing drift independent of this task's grammar widening. Recommended `/ft-file-followup` candidate after closure — see "Misses logged" below.
  - `docs/PLATFORMS.md` — no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/CORE-189.md`.
- [x] Recap drafted (bundles into Step 6 per `/ft-task` SKILL).

**Final Summary:**

Widened the post-closure copy-paste grammar at three locations (SPEC §"Post-closure protocol" step 3, `ft-task` SKILL §6, `ft-micro-task` SKILL Step 5) from the narrow `/<ft-task|ft-micro-task|ft-starter-task> <NEXT-ID>` alternation to the generic `/<next-skill> <args>` form that `/ft-close-epic` SKILL Step 9 has carried since its introduction. The widening gives `/ft-audit*` next-move candidates (introduced as 🔍-flagged options by CORE-184) a documented copy-paste shape and accommodates future flowtron skills whose argument shape isn't a single task ID. SPEC prose also extended to name `/ft-audit*` as a named candidate (with an adopter unprefixed-fork pointer to §"Skill namespace") and generalize `<args>` semantics. Surface: 3 files changed, ~3 lines net change.

**Misses logged (candidates for `/ft-file-followup` after closure):**

- `docs/AGENT-NEUTRALITY.md` line 36 cites SPEC §"Post-closure protocol" §3 with stale line range `L498-501`; actual span is `L518-524`. Pre-existing drift, not introduced by this task — file a follow-up to either refresh the line range or convert the cite to a section-anchor-only reference.

**Archived:** 2026-05-24
