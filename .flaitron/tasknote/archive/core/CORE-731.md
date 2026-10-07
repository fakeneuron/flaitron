---
title: unattended-park-existing-note
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-725]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-micro-task/SKILL.md
  - SPEC/gate-postures.md
  - SPEC/procedures/ft-task.md
  - docs/EXTERNAL-AGENTS.md
---

# CORE-731 | unattended-park-existing-note

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-725]]

## 🎯 Goal

Make `/ft-task` check for an existing tasknote before its Step 1.5 model gate, so an `--unattended` model-mismatch park writes a note only when neither a tasknote nor a sidequest stub exists and an attended retag can no longer land and then be refused; correct the "before the tasknote exists" premise in the posture docs.

## ✅ Acceptance

- [x] `/ft-task` refuses an in-flight note (`not-started` / `in-progress` / `completed`) in its Step 1 pre-flight, ahead of the Step 1.5 model gate; Step 2 branches only starter / blocked / absent — `grep -n "ahead of its archive-collision bullet" claude/skills/ft-task/SKILL.md` and `grep -c "Four-way branch" claude/skills/ft-task/SKILL.md` = 0
- [x] `unattended-mode.md` §"Pre-scaffold stops": the mismatch park scaffolds only when neither a tasknote nor a sidequest stub exists; an existing starter/blocked note or stub terminates and writes nothing — `grep -n "sidequest" claude/skills/ft-task/unattended-mode.md` + `grep -n "left untouched" claude/skills/ft-task/unattended-mode.md`
- [x] `SPEC/gate-postures.md` §"Pre-scaffold stops" no longer claims the stops run "before the tasknote exists" and carries the create-only-when-absent rule — `grep -c "before the tasknote exists" SPEC/gate-postures.md` = 0
- [x] `SPEC/procedures/ft-task.md` runs the archived / in-flight refusals at entry, before the model check, and states the same create-only-when-neither-exists / untouched-existing rule — `grep -n "in-flight refusal" SPEC/procedures/ft-task.md`
- [x] Byte budgets hold — `wc -c` vs `docs/CONTEXT-BUDGET.md` rows (SKILL.md 33,000; gate-postures 22,000; procedures/ft-task 34,200)
- [x] Wording is coherent across the four surfaces — `judgment`: prose contract, no command decides consistency

## 🧩 Subtasks

- [x] SKILL.md: move the in-flight refusal from Step 2 into Step 1's Pre-flight delta (ahead of archive collision, as `/ft-micro-task` does); Step 2 → three-way; fix the unattended paragraph's "Step 2 in-flight refusal"
- [x] unattended-mode.md §"Pre-scaffold stops": intro premise, mismatch bullet (create only when neither note nor stub exists; existing starter/blocked or stub → stop, write nothing), in-flight bullet
- [x] SPEC/gate-postures.md §"Pre-scaffold stops": same premise + rule
- [x] SPEC/procedures/ft-task.md §2: in-flight refusal before model edit; tighten "preserve existing starter/blocked content"
- [x] Verify (greps, budgets), external review

## 🔗 Related

- [[CORE-725]] — predecessor; its external review filed this (pass-1 notes 1/4, pass-2 notes 1/5)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gap confirmed in current code. `unattended-mode.md:72` scaffolds the mismatch park unconditionally, and `/ft-task` reaches Step 2's file-state branch (in-flight refusal, starter/blocked routing) only after Step 1.5, so the park can overwrite a starter/in-progress note and skips Step 3b's stub retirement. The neutral SOP (`SPEC/procedures/ft-task.md:202`) already says "create only when absent".

- [x] Read relevant source files — `claude/skills/ft-task/{SKILL.md,preamble.md,unattended-mode.md,step-1.5-model-edge.md}`, `claude/skills/ft-micro-task/SKILL.md` (Step 1 existing-note check), `SPEC/gate-postures.md` §"Pre-scaffold stops", `SPEC/procedures/ft-task.md` §2–3.

- [x] **Best Practices Review** — N/A for code; for contract coherence the fix copies `/ft-micro-task`'s placement (existing-note check inside Pre-flight, ahead of archive collision) instead of inventing a new step.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Hits on `unattended-mode.md` / Pre-scaffold stops include CORE-617, 619, 656, 665, 690, 724.4, 725, 729. Load-bearing: CORE-725 reordered `/ft-task` so Pre-flight runs before the model gate, and its review filed this task (pass-1 notes 1 and 4: overwrite and stub retirement; pass-2 notes 1 and 5: attended retag-then-refuse and the gate-postures premise). CORE-725 also restored the Step 2 in-flight refusal to the terminate-and-write-nothing set in `unattended-mode.md` and SKILL.md. This task moves it again, so both mentions must follow it.

- [x] **Drift check** — the PLAN line and sidequest stub match the code. The stub's Pass 2 extras (hoist ahead of 1.5; fix gate-postures premise) are in scope per the stub. No drift.

- [x] Asked clarifying questions — one AskUserQuestion. Answer: on an existing starter/blocked note, an `--unattended` mismatch **stops and writes nothing** (doesn't park the note in place). Assumptions: (a) in-flight refusal hoisted on both attended and unattended paths; (b) the SOP gets the matching edit so the neutral and Claude runners don't diverge; (c) `/ft-micro-task` needs no edit, since it already refuses any existing note in Pre-flight, and the shared `unattended-mode.md` bullet covers its stub retirement.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Current order on `/ft-task`: Locate → Pre-flight (area, epic, dirt, archive collision) → 1.5 model gate (retag / legacy tag / unattended park writes) → Step 2 file-state branch. Writes at 1.5 precede the existing-note knowledge.
- After fix: Pre-flight also refuses in-flight notes. Starter / blocked / absent reach 1.5; under `--unattended` a mismatch on starter/blocked stops with no write; absent → retire stub, scaffold blocked. (Pass 2 extended this to a sidequest stub.)
- `SPEC/gate-postures.md:65` matrix row ("Scaffold, then park") first planned as-is; review pass 1 amended it to name the existing-note stop.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — copied `/ft-micro-task` Step 1's shape: a runner-specific existing-note check spliced into the shared Pre-flight, ahead of its archive-collision bullet.

- [x] **Minimal refactor gate** — no refactor; the in-flight bullet moved verbatim from Step 2 to Step 1.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract only, no executable surface.

**Implementation Notes:**

- `claude/skills/ft-task/SKILL.md` — Step 1 Pre-flight delta holds the in-flight refusal (moved from Step 2); Step 2 is now a three-way branch; the unattended paragraph names the refusal as part of Step 1's pre-flight.
- `claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops" — premise corrected; the mismatch bullet creates a note only when neither a tasknote nor a sidequest stub exists, and otherwise leaves the existing starter/blocked note or stub untouched (terminate, write nothing, the stop line naming it); the in-flight bullet says the refusal is in Pre-flight and covers unrecognized statuses. Conversion-map row amended to match.
- `claude/skills/ft-micro-task/SKILL.md` — unattended summary names the stub stop (review pass 3).
- `SPEC/gate-postures.md` §"Pre-scaffold stops" — same premise fix and rule.
- `SPEC/procedures/ft-task.md` §2 — the in-flight refusal runs before any model edit; the vague "preserve existing starter/blocked content" is replaced by the explicit rule.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown contract only; no test reads these files.

- [x] Ran lint/type-check on changed code — N/A: no code changed.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — three `/code-review medium` passes on the working-tree diff; dispositions in Testing Notes. — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `grep -n "ahead of its archive-collision bullet" claude/skills/ft-task/SKILL.md` → 0 (line 40)
- `grep -c "Four-way branch" claude/skills/ft-task/SKILL.md` → 1 (count 0, as required)
- `grep -n "sidequest" claude/skills/ft-task/unattended-mode.md` → 0 (line 72); `grep -n "left untouched" …` → 0 (line 72)
- `grep -c "before the tasknote exists" SPEC/gate-postures.md` → 1 (count 0, as required)
- `grep -n "in-flight refusal" SPEC/procedures/ft-task.md` → 0 (line 193)
- `wc -c` → SKILL.md 24,442 / 33,000; gate-postures.md 20,276 / 22,000; procedures/ft-task.md 32,831 / 34,200; unattended-mode.md 16,166 (no row). All within budget.
- Structural: the in-flight bullet was moved, not duplicated. Its old Step 2 copy was removed, so no stale text is left.

External review, pass 1 (`/code-review medium`, working-tree diff), 10 findings:

- **Blocker → fixed** (1). The park deleted the sidequest stub without carrying its body over, losing context. The stub body is now carried into the note's Discovery Notes before deletion, in unattended-mode.md, gate-postures.md, and the SOP. Phase 3 re-ran from the top. *(Superseded in pass 2: carry-over dropped.)*
- **Note → fixed** (2) The SOP left the archive-collision check after the model edit; Step 3's archived and in-flight refusals are now hoisted together. (3/4/5) The gate-postures matrix row, the unattended-mode Conversion map row, and the SKILL.md unattended summary now name the existing-note stop. (6) "passes on to Step 2" now reads "passes on to the Step 1.5 model gate". (8) The SOP's vague "Step 3 pre-flight" now names the checks. (9) Rewrapped to ~80 columns. (10) gate-postures now notes that micro refuses any existing note.
- **Note → to file** (7) The foreign-dirt gate runs before the in-flight refusal, so an untracked in-progress note reads as foreign dirt. This was already true on both runners before this task. Filed together with a related gap pass 1 surfaced: a note parked for model mismatch resumes at Phase 2 with no Phase 1 behind it.

External review, pass 2, 10 findings. Most traced to pass 1's carry-the-stub-body fix: delete-before-write ordering, the micro template having no Discovery Notes section, divergence from the attended path, the SOP's cited branch carrying nothing, and the tracked stub deletion turning into foreign dirt on resume.

- **Blocker → fixed by design change** (1, 2, 4, 5, 6, 10): the stub carry-over was dropped. A sidequest stub now counts as an existing note, so an unattended mismatch stops and writes nothing, the same as the operator's starter/blocked answer. The attended promotion still reads the stub and retires it. The original "skips stub retirement" defect is resolved because the park no longer scaffolds next to a stub. Also rewrapped gate-postures.
- **Note → fixed** (3): Step 1's refusal now catches any `status:` other than starter/blocked, restoring the old catch-all. (7) The SOP runs the refusals at entry, before the model check, not only "before any model edit". (9) "It applies" → "That path applies".
- **Note → no change** (8): the SOP's Step 3 still defines the refusals and §2 runs them early. This mirrors the existing pattern for the foreign-dirt guard.
- Phase 3 re-ran: receipt greps → all exit 0 / counts 0; `wc -c` SKILL.md 24,632, gate-postures 20,414, SOP 32,811, all within budget.

External review, pass 3, 8 findings, all notes, all fixed:

- (1) The tasknote's Goal and Acceptance still described the pass-1 stub design → updated.
- (2) The SOP Step 3 dirt-guard exception was stale → now reads "unless already run at entry in Step 2".
- (3) The SOP Step 3 duplicated the refusals → added a note that Step 2 ran them at entry and Step 3 defines them.
- (4) gate-postures §"Park conversions" claimed model-mismatch always parks → now notes the no-park stop.
- (5) The micro SKILL.md unattended summary lacked the stub exception → added. This adds `touches:`.
- (6) "Unrecognized status" wording differed across the three surfaces → added to unattended-mode and to the SOP Step 3 bullet.
- (7) The gate-postures premise implied the shared preamble does the refusal → now reads "Each runner's pre-flight".
- (8) The stop line didn't name the existing artifact → it now names the starter note, blocked note, or stub.

Wording-only, no blocker, so no fourth pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. One process note stays in this record: an untested review fix (pass 1's stub carry-over) created more surface than it closed. When a fix grows a new mechanism, prefer narrowing the behaviour instead (pass 2).

**Final Summary:**

Doc-drift sweep: `docs/EXTERNAL-AGENTS.md` §"three possible endings" → its "Refused" list now names a model mismatch on an existing note or sidequest stub. Every other AI-referenced doc: no change (grep for model-mismatch / in-flight / pre-scaffold found nothing else affected; SPEC.md:636 is generic).

Recap:

- **Changed:** `claude/skills/ft-task/SKILL.md` (in-flight refusal moved from Step 2 into the Step 1 Pre-flight delta; catch-all for unrecognized statuses; Step 2 three-way), `claude/skills/ft-task/unattended-mode.md` and `SPEC/gate-postures.md` (§"Pre-scaffold stops": corrected premise; mismatch park creates a note only when neither a tasknote nor a sidequest stub exists, otherwise terminates writing nothing and names what it found; Conversion-map / matrix / Park-conversions text aligned), `SPEC/procedures/ft-task.md` (refusals run at entry before the model check; same rule), `claude/skills/ft-micro-task/SKILL.md` (unattended summary names the stub stop), `docs/EXTERNAL-AGENTS.md` (doc-drift).
- **Behaviour:** an attended retag can no longer land and then be refused. An `--unattended` mismatch never overwrites a starter/blocked note and never scaffolds next to a sidequest stub, so stub retirement stays with the attended promotion that reads the stub.
- **Verification:** Acceptance greps all pass (counts 0 where required). Byte budgets: SKILL.md 24,632 / 33,000; gate-postures 20,483 / 22,000; SOP 32,880 / 34,200. Three external review passes; all findings fixed except one accepted no-change (pass 2 #8). Pre-existing gaps were filed as [[CORE-732]].
- **Refactors:** none; the in-flight bullet moved, it was not duplicated.
- **`touches:` reconciliation:** `git diff --name-only` = the declared six paths, plus the retired CORE-731 sidequest stub and the tasknote/PLAN (workflow). micro SKILL.md and EXTERNAL-AGENTS.md were added to `touches:` mid-run (review pass 3, doc-drift).
- **Maintainability:** both runners and the SOP now share one rule. An existing note or stub, whatever its form, is never written over at the model gate.

**Archived:** 2026-10-07
