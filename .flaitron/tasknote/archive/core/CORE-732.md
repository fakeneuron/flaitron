---
title: pre-scaffold-note-recovery
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-731]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-3c-resume-blocked.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-file-followup/park-mode.md
  - SPEC.md
  - SPEC/blocked.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/unattended-mode.md
  - docs/EXTERNAL-AGENTS.md
---

# CORE-732 | pre-scaffold-note-recovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-731]]

## 🎯 Goal

Let a runner recover the notes written at or before its model gate: this task's own uncommitted tasknote is routed by the existing-note check instead of stopping as foreign dirt, a `model-mismatch` park resumes at Phase 1, and a sidequest promotion carries the stub's body into the new note before deleting it.

## ✅ Acceptance

- [x] Both runners run their existing-note check ahead of the foreign-dirt gate, and the gate ignores `.flaitron/tasknote/<TASK-ID>.md` — `grep -n "ahead of its foreign-dirt" claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md` (2 hits) + `grep -n "not foreign dirt" claude/skills/ft-task/preamble.md SPEC.md SPEC/procedures/ft-task.md` (3 hits)
- [x] A `model-mismatch` park resumes at Phase 1, not Phase 2 — `grep -n "model-mismatch" claude/skills/ft-task/step-3c-resume-blocked.md claude/skills/ft-task/SKILL.md SPEC/blocked.md SPEC/procedures/ft-task.md` (≥1 hit each, in the resume text)
- [x] Sidequest promotion carries the stub body into the new note, then deletes the stub — `grep -n "carry" claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md SPEC/procedures/ft-task.md claude/skills/ft-file-followup/park-mode.md` (≥1 hit each)
- [x] Byte budgets hold — `wc -c` vs `docs/CONTEXT-BUDGET.md` (SKILL.md 33,000; preamble 9,000; SPEC.md 49,000; procedures/ft-task 34,200)
- [x] Wording is coherent across the surfaces — `judgment`: prose contract, no command decides consistency

## 🧩 Subtasks

- [x] preamble.md §Pre-flight: dirt-gate bullet ignores this ID's own tasknote; SPEC.md §"Foreign-dirt gate" + SOP §3 same exemption
- [x] ft-task SKILL.md + ft-micro-task SKILL.md: existing-note check spliced ahead of the foreign-dirt bullet (was: ahead of archive collision); SOP §2 order wording
- [x] Resume of a `model-mismatch` park → Phase 1: step-3c-resume-blocked.md, ft-task SKILL.md Step 3c, SPEC/blocked.md §"Exit (resume)", SOP §3 blocked bullet
- [x] Stub carry-over: ft-task Step 3b (Discovery Notes), micro Step 2 (`## ⚡ Notes`), SOP Absent bullet, park-mode.md §Promotion — scaffold, carry, then delete
- [x] Verify (greps, budgets), external review

## 🔗 Related

- [[CORE-731]] — parent; its external review filed this (pass-1 note 7 and the mismatch-resume gap; pass-2's stub-body loss on the attended path)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three gaps confirmed in current text. `preamble.md` §Pre-flight runs the foreign-dirt bullet before the runners' existing-note splice ("ahead of its archive-collision bullet"), so an uncommitted note stops as dirt. `step-3c-resume-blocked.md` step 5 and `SPEC/blocked.md` §"Exit (resume)" send every blocked note to Phase 2, including a `model-mismatch` park that was written as a bare scaffold. ft-task Step 3b, micro Step 2, and the SOP's Absent bullet `rm` the stub with no carry.

- [x] Read relevant source files — `claude/skills/ft-task/{SKILL.md,preamble.md,unattended-mode.md,step-3c-resume-blocked.md}`, `claude/skills/ft-micro-task/SKILL.md`, `SPEC.md` §"Paper-complete guard", `SPEC/blocked.md` §"Exit (resume)" / §"Resuming an interrupted run", `SPEC/procedures/ft-task.md` §2–3, `claude/skills/ft-file-followup/park-mode.md` §Notes, `templates/tasknote-{,micro-}template.md`.

- [x] **Best Practices Review** — N/A for code. For contract coherence: the dirt exemption lives once in the shared preamble (both runners inherit it) and is mirrored in SPEC.md and the SOP; the resume carve-out lives in the step-3c fragment with SPEC/blocked.md as contract.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. 26 hits on foreign-dirt; none decided against exempting the task's own note (grep for exempt/own-tasknote + dirt: none). Load-bearing: CORE-731 (parent) moved the in-flight refusal into Pre-flight "ahead of its archive-collision bullet", and its pass-1 stub carry-over for the *unattended park* was dropped in pass 2 because delete-before-write ordering and the micro template's missing Discovery Notes made it fragile. This task applies the carry only on the attended promotion, writing the new note first and deleting the stub last, and gives micro an explicit landing spot in `## ⚡ Notes`.

- [x] **Drift check** — the PLAN line and stub match the code; no drift. Note: micro parks (any code) are a micro-shaped note that `/ft-micro-task` refuses and `/ft-task` resumes; that pre-existing edge is out of scope (operator chose "Resume at Phase 1", accepting it).

- [x] Asked clarifying questions — AskUserQuestion, two answers: (1) keep the mismatch park and route its resume to Phase 1; (2) the dirt gate exempts this ID's own tasknote, with the existing-note check run ahead of it. Assumptions: other uncommitted paths (e.g. a mid-Phase-2 park's partial edits) still stop as foreign dirt, unchanged; the carry-over copies the stub's body sections verbatim (not the frontmatter).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea**
>
> Pre-existing gaps found by CORE-731's review, all about notes written at or before the model gate:
>
> 1. On both runners the foreign-dirt gate runs before the existing-note refusal. An uncommitted in-progress note, or an uncommitted `--unattended` model-mismatch park, reads as foreign dirt and blocks continue/resume.
> 2. A note parked for model mismatch resumes through Step 3c at Phase 2, though no Phase 1 ever ran.
> 3. Attended Step 3b and micro Step 2 delete a sidequest stub without carrying its body into the new note.
>
> **Resume anchor**
>
> CORE-731 Phase 3 external review (pass 3) was done and its fixes applied; next was Phase 4 closure.

- New Pre-flight order: Area → epic dispatch → runner's existing-note check → foreign-dirt (ignoring `.flaitron/tasknote/<TASK-ID>.md`) → archive collision.
- The mismatch park is written only when no note exists, onto a tree the dirt gate passed, so its only dirt is the note itself; the exemption makes it resumable without a commit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-731's shape: a runner splice into the shared preamble Pre-flight (now ahead of the dirt bullet), the exemption single-sourced in the preamble and mirrored in SPEC.md + SOP; the resume carve-out lives in the step-3c fragment with SPEC/blocked.md as contract.

- [x] **Minimal refactor gate** — no refactor. Review pass 2 note 10: the SOP's restated carry rule was replaced by a citation of park-mode.md §Promotion, which now owns the rule.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract only, no executable surface.

**Implementation Notes:**

- `claude/skills/ft-task/preamble.md` §Pre-flight: the dirt gate leaves out this ID's own existing tasknote (any status but a deletion or rename). The header's clean-tree claim names that exception.
- `claude/skills/ft-task/SKILL.md` + `claude/skills/ft-micro-task/SKILL.md`: the existing-note check is spliced ahead of the foreign-dirt bullet. The ft-task Step 3c route and its park-reason line now fit the Phase 1 exception. On both runners, stub retirement carries every section below the stub's nav line into the new note, writing the note before deleting the stub.
- `claude/skills/ft-task/step-3c-resume-blocked.md`: a model-mismatch exception in the intro, plus step 5 routing to Step 4 after any missing Step 3b scaffold values are filled.
- `SPEC.md` §"Foreign-dirt gate": the exemption, scoped per runner; "before blocked-resume continues". `SPEC/blocked.md` §"Exit (resume)": the exception. `SPEC/procedures/ft-task.md`: §2 order, §3 exemption, the blocked lead sentence, and the Absent bullet citing park-mode.
- `claude/skills/ft-task/unattended-mode.md` "Resume is unchanged" names the Phase 1 route. `claude/skills/ft-file-followup/park-mode.md` §Promotion owns the carry rule.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown contract only; no test reads these files.

- [x] Ran lint/type-check on changed code — N/A: no code changed.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — two `/code-review medium` passes on the working-tree diff; dispositions in Testing Notes. — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final run):

- `grep -c "ahead of its foreign-dirt"` → ft-task SKILL 1, micro SKILL 1 (exit 0)
- `grep -c "not foreign dirt"` → preamble 1, SPEC.md 1, SOP 1 (exit 0)
- `grep -c 'model-mismatch\` park'` → step-3c 2, ft-task SKILL 1, blocked.md 1, SOP 1 (exit 0)
- `grep -c carr` → ft-task SKILL 2, micro SKILL 3, SOP 4, park-mode 3 (exit 0)
- `wc -c` → SKILL.md 25,169 / 33,000; micro 17,054 / 33,000; preamble 7,984 / 9,000; SPEC.md 42,839 / 49,000; SOP 33,378 / 34,200. All within budget.
- Structural: there is one carry rule owner (park-mode.md); the two runners execute it inline, and the SOP cites it. No dead text was found.

External review pass 1 (`/code-review medium`, working tree), 10 findings:

- **Blocker → fixed** (2, 3, 4): Step 3c's park-reason paragraph, the SOP blocked lead sentence, and the step-3c intro and step-1 premise each contradicted the new Phase 1 route. All three were rewritten, and Phase 3 re-ran from the top.
- **Note → fixed** (1): SPEC.md's exemption is now scoped to `/ft-task` and `/ft-micro-task`. (5) The exemption no longer covers a deleted or renamed path. (7) The carry header is unified across surfaces. (8) The carry definition is unified: nav line left out, headings turned into bold labels. (9) The SOP carry step is ordered after the scaffold write.
- **Note → filed** (1 close-epic half, 6): [[CORE-733]] covers the micro-shaped mismatch park that `/ft-micro-task` cannot resume, and `/ft-close-epic`'s dirt-gate order.
- **Note → no change** (10): the "known clean" claim in unattended-mode holds, because the mismatch park writes a note only when none exists, so the tree passing the gate really is clean.

External review pass 2, 10 findings, no blockers:

- **Note → filed** (1): the micro-shaped mismatch park is already covered by [[CORE-733]].
- **Note → fixed** (2): SPEC.md now says micro refuses any existing note. (3) The exemption covers any status except a deletion or rename (staged files included). (4) A mismatch resume fills any missing Step 3b scaffold values, including the `--loop` addendum. (5) Changed "before blocked-resume continues". (6) The unattended-mode resume line names the Phase 1 route; gate-postures defers to blocked.md, so it needs no change. (7) "passes on through the rest of Pre-flight". (8) The preamble header names the exemption. (9) The carry covers every section below the nav line, including hand-added ones. (10) park-mode.md owns the carry rule, and the SOP cites it.
- No blocker, so no third pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A.

**Final Summary:**

Doc-drift sweep: `docs/EXTERNAL-AGENTS.md` item 5 ("Discovery is not re-run") now names the `model-mismatch` exception. Every other AI-referenced doc: no change. Grepping for foreign-dirt, resume, and sidequest promotion turned up nothing else that restates the changed rules. `SPEC.md` was edited as a deliverable.

Recap:

- **Changed:** the preamble and both runner SKILLs (Pre-flight order, dirt exemption, stub carry), the step-3c fragment (mismatch → Phase 1), `SPEC.md`, `SPEC/blocked.md`, the SOP, `unattended-mode.md`, `park-mode.md`, and `docs/EXTERNAL-AGENTS.md`.
- **Behaviour:** an uncommitted note for this ID no longer stops as foreign dirt. `/ft-task` refuses it if in flight, promotes it if a starter, and resumes it if blocked, so an uncommitted `--unattended` mismatch park is resumable. That park resumes at Phase 1 after its scaffold values are filled. Promoting a sidequest carries the stub's sections into the new note before deleting the stub.
- **Verification:** all Acceptance greps pass, all budgets hold, and two external review passes ran (pass 1 had three blockers, all fixed; pass 2 had notes only). [[CORE-733]] was filed for the micro and close-epic halves.
- **Refactors:** none. The SOP carry restatement was replaced with a citation.
- **`touches:` reconciliation:** `git diff --name-only` shows the eight originally declared paths, plus `unattended-mode.md` and `docs/EXTERNAL-AGENTS.md` (added mid-run by review pass 2 and the doc-drift sweep), plus the retired CORE-732 stub and the tasknote/PLAN workflow files.
- **Maintainability:** the dirt exemption has one source (the preamble), and the carry rule has one owner (park-mode.md).

**Archived:** 2026-10-07
