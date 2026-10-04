---
title: audit-repo-nest-children
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-670.N]
touches:
  - claude/skills/ft-audit-repo/SKILL.md
---

# CORE-672 | audit-repo-nest-children

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-670.N]]

## 🎯 Goal

State the 2-space child-nesting rule in `ft-audit-repo`'s PLAN.md-write bullets so future audit-repo filings match `SPEC/epic.md`'s child placement invariant.

## ✅ Acceptance

- [x] `claude/skills/ft-audit-repo/SKILL.md` §6 write-bullets state that implementation children and the `.N` audit placeholder are 2-space nested under their `<AREA>-EPIC-<N>` parent — `judgment` (read the diff; doc-only, no verify command) — met, bullet added citing `SPEC/epic.md` §"Child placement invariant"
- [x] No other SKILL.md content altered — `judgment` — met, `git diff` shows exactly one added line

## 🧩 Subtasks

- [ ] Add a nesting bullet to `claude/skills/ft-audit-repo/SKILL.md` §6, alongside the existing "One `- [ ] **<AREA>-EPIC-<N>**` parent per milestone..." bullet
- [ ] Confirm current PLAN.md (`FE-EPIC-125`) is already correctly nested — no PLAN.md edit expected

## 🔗 Related

- [[CORE-670.N]] — epic audit that found CORE-EPIC-670's cohort filed flat, inline-fixed it, and filed this follow-up to close the root cause in `ft-audit-repo`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `claude/skills/ft-audit-repo/SKILL.md` §6's write-bullets (lines ~74-79) list how to file the milestone plan into PLAN.md but never state the 2-space nesting that `SPEC/epic.md` §"Child placement invariant" requires and that sibling skills (`ft-epic-discovery`, `ft-refactor`) both state explicitly. Still accurate — file unchanged since CORE-670.N surfaced it today.

- [x] Read relevant source files — `claude/skills/ft-audit-repo/SKILL.md` §6, `SPEC/epic.md` §"Child placement invariant", and the nesting phrasing in `claude/skills/ft-epic-discovery/SKILL.md` (Step 4: "nested with 2-space indent under the parent for the subtask lines") and `claude/skills/ft-refactor/SKILL.md` ("2-space indent on children").

- [x] **Best Practices Review** — one-bullet doc addition matching the existing sibling-skill phrasing; no abstraction or module-boundary concerns.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-670.N.md` is the surfacing note: it inline-fixed the flat `CORE-EPIC-670` cohort in PLAN.md and logged this exact follow-up ("`audit-repo-nest-children` — state 2-space nesting in `ft-audit-repo`'s filing bullet; nest the `FE-EPIC-125` rows"). Current `.flowtron/PLAN.md` shows `FE-EPIC-125`'s children already 2-space nested, so that half of the follow-up is already satisfied — this task is the doc-only remainder.

- [x] **Drift check** — no drift; SKILL.md content at the cited lines matches the task description, and `.flowtron/PLAN.md`'s `FE-EPIC-125` cohort is already nested (verified live, not just from the archived note).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--fast). Assumption: only the SKILL.md prose bullet needs adding; PLAN.md needs no edit since `FE-EPIC-125` is already correctly nested.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:**

Root cause and scope confirmed via `CORE-670.N`'s audit: `ft-audit-repo/SKILL.md` §6's "After the user confirms, write the plan..." bullet list omits the nesting instruction that `ft-epic-discovery` and `ft-refactor` both carry. Fix is additive prose only — one bullet, phrased consistently with the sibling skills and citing `SPEC/epic.md` §"Child placement invariant". `FE-EPIC-125` in live PLAN.md is already nested, so no PLAN.md write is in scope for this task.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extend the existing §6 write-bullet list with one new bullet, phrased like `ft-epic-discovery`'s "nested with 2-space indent under the parent" and `ft-refactor`'s "2-space indent on children"

- [x] **Minimal refactor gate** — no refactor; single additive bullet only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc change

**Implementation Notes:**

Added one bullet to `claude/skills/ft-audit-repo/SKILL.md` §6, immediately after the existing parent/children/`.N`-placeholder bullet: "**2-space indent every child and the `.N` placeholder under their parent** — same convention as `ft-epic-discovery` and `ft-refactor` (SPEC/epic.md §"Child placement invariant"). Never file a cohort flat." No other line touched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only doc change, no executable surface

- [x] Ran lint/type-check on changed code — N/A, `claude/skills/*/SKILL.md` carries no lint/type-check step in this repo's validation set

- [x] **Verification receipt** — both Acceptance criteria are `judgment` (no verify command; doc-only, human-read diff). `git diff` confirms one added line, no other lines touched. No duplication, dead code, or public-surface growth introduced.

- [x] **External review** — invoked `/code-review medium` scoped to `claude/skills/ft-audit-repo/SKILL.md`'s working-tree diff. Verdict: zero findings — "clean, minimal, single-bullet addition," phrasing and citation match the stated goal, no other lines touched. No blockers, no notes to file.

- [x] (frontend) Asked the user for visual confirmation — N/A, not a frontend change

**Testing Notes:**

`git diff -- claude/skills/ft-audit-repo/SKILL.md` → one line added (the nesting bullet), zero lines removed or altered elsewhere. External review (forked `code-review` skill, medium effort) returned `[]` — no conflicts, no reportable findings at that precision bar.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `claude/skills/*/SKILL.md` (the only file touched) sits outside the AI-referenced-docs sweep set (`.flowtron/tasknote/README.md` §"AI-referenced docs": "`SPEC/*.md` (lazy modules) and `claude/skills/*/SKILL.md` sit outside this sweep set"). No entry on the list touches this content. No change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept under `## Low`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

- [x] **Learnings** — N/A; the fix closes a documentation gap identified by a prior audit (`CORE-670.N`), nothing new for the always-loaded layer

**Final Summary:**

One line added to `claude/skills/ft-audit-repo/SKILL.md` §6 (+1/-0), stating that epic implementation children and the `.N` audit placeholder must be 2-space nested under their parent, matching `ft-epic-discovery`/`ft-refactor`'s existing phrasing and citing `SPEC/epic.md` §"Child placement invariant". No PLAN.md edit needed — `FE-EPIC-125`, the other cohort the surfacing note (`CORE-670.N`) flagged, was already correctly nested in the live plan. External review (forked, medium effort): zero findings. `touches:` reconciliation: declared `claude/skills/ft-audit-repo/SKILL.md`, actual diff matches exactly. Doc-drift: N/A, file outside sweep set. Maintainability effect: closes the root cause `CORE-670.N` traced for the CORE-EPIC-670 flat-filing incident, so future `/ft-audit-repo` runs file cohorts nested by default.

**Archived:** 2026-09-22
