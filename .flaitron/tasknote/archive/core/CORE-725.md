---
title: unattended-model-gate-order
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-724.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/unattended-mode.md
  - docs/CONTEXT-BUDGET.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-725 | unattended-model-gate-order

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-724.4]]

## 🎯 Goal

Make `/ft-task` run the preamble's §"Pre-flight" (incl. the foreign-dirt gate) before its Step 1.5 model gate, as `/ft-micro-task` already does, so an `--unattended` model-mismatch park (or an attended retag) never writes into a dirty tree; repair the citers of the old order.

## ✅ Acceptance

- [x] `/ft-task` Step 1 runs §"Pre-flight" after §"Locate and capture"; Step 2 no longer does — `awk '/^## Step 1 /,/^## Step 1.5/' claude/skills/ft-task/SKILL.md | grep -q 'Pre-flight' && ! awk '/^## Step 2 /,/^## Step 3a/' claude/skills/ft-task/SKILL.md | grep -q 'Pre-flight'`
- [x] The shared preamble states the fixed order (Pre-flight before Model gate) for both runners — `grep -q 'Pre-flight".*before.*Model gate\|§"Pre-flight", then §"Model gate"' claude/skills/ft-task/preamble.md`
- [x] No live citer names "Step 2 pre-flight" for `/ft-task` — `! grep -rnE 'Step[- ]2[^0-9]{0,3}pre-?flight' claude/skills/ft-task/ docs/CONTEXT-BUDGET.md`
- [x] Context budgets still pass — CI budget loop (docs/CONTEXT-BUDGET.md §"Budgets") run locally → exit 0

## 🧩 Subtasks

- [x] `ft-task/SKILL.md`: move the §"Pre-flight" call into Step 1; retitle Step 2 "File-state branch"; repoint the unattended-posture paragraph and the Notes epic-load citer from Step 2 → Step 1
- [x] `preamble.md`: header names the fixed call order and why; blurb line lists checks in run order
- [x] `unattended-mode.md` §"Pre-scaffold stops": lead sentence names the Step 1 pre-flight checks ahead of Step 1.5
- [x] `docs/CONTEXT-BUDGET.md` preamble row: "Step 1 / 1.5 / 2" → "Step 1 / 1.5"
- [x] Run acceptance greps + budget loop

## 🔗 Related

- [[CORE-724.4]] — predecessor: the skill-body dedupe logged this ordering gap in Discovery and filed it here rather than change behaviour inside a dedupe

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is live. `claude/skills/ft-task/SKILL.md` runs Step 1.5 (model gate) before Step 2, which calls §"Pre-flight". `unattended-mode.md` §"Pre-scaffold stops" scaffolds-then-parks on a concrete mismatch, saying "the tree is known clean (the foreign-dirt gate already passed)", which is only true for `/ft-micro-task`.

- [x] Read relevant source files — `ft-task/SKILL.md`, `preamble.md`, `unattended-mode.md`, `step-1.5-model-edge.md`, `ft-micro-task/SKILL.md`, `SPEC/procedures/ft-task.md` §2–3, `SPEC/gate-postures.md` §"Pre-scaffold stops"

- [x] **Best Practices Review** — Prose-only skill bodies. Converging both runners on one order removes the per-runner divergence the shared preamble was hiding. Nothing new to abstract.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). Hits: CORE-724.4, CORE-724.N, CORE-729. CORE-724.4 Discovery drift item (2) and review note 3 record this exact gap, keep each skill's order, and file CORE-725 because a reorder is a behaviour change outside a dedupe. CORE-729 only touched the pin guard and doesn't matter here.

- [x] **Drift check** — Sidequest stub and PLAN line still match the code. `SPEC/procedures/ft-task.md` §2 already says "first pass Step 3 pre-flight, then park", so the neutral SOP is correct and needs no edit. `SPEC/gate-postures.md` §"Pre-scaffold stops" is stated per-posture and becomes true once the order is fixed, so no edit there either. The edge fragment's "proceed to Step 2" still holds for both runners.

- [x] No clarifications needed. Assumptions: (a) fix by reordering, not by gating the park on a second dirt check. Micro already uses this order, and it also covers attended retag/legacy writes. (b) Step numbers stay (1 / 1.5 / 2). Pre-flight folds into Step 1 exactly as micro does, so the "Step 1.5" citers across SPEC/docs remain valid. (c) Pre-flight reads README + `git status` + maybe `SPEC/epic.md` before the model gate. That is mechanical, not heavy thinking, and micro already does it.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Citers of the old order: `ft-task/SKILL.md:34` ("the Step 2 pre-flight checks"), `:44–46` (Step 2 heading + call), `:136` (epic.md "loaded at Step 2"); `unattended-mode.md:70` ("Step 1.5 and the Step-2 pre-flight checks"); `docs/CONTEXT-BUDGET.md:50` ("Step 1 / 1.5 / 2 preamble"). `preamble.md:3` says "in its own order", which is replaced by the fixed order.
- Out of scope: a model-mismatch park when a starter/blocked note already exists. The SOP covers it ("Create a note only when absent"), and the Claude fragment doesn't. That's a separate gap, not a reorder.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `/ft-micro-task`'s existing shape: Step 1 runs Locate-and-capture and then Pre-flight, Step 1.5 is the model gate, Step 2 writes

- [x] **Minimal refactor gate** — no refactor. Step numbers are kept so the ~20 "Step 1.5" citers across SPEC/docs/PLATFORMS stay valid.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose skill bodies, no test harness. Acceptance greps cover it.

**Implementation Notes:**

- `ft-task/SKILL.md`: Step 1 → "Locate the task in PLAN.md and pre-flight". It now calls §"Pre-flight" after Locate-and-capture, with a one-clause reason. Step 2 → "File-state branch" (the call is gone). The unattended paragraph says "Step 1 pre-flight checks". Notes: epic.md is "loaded at Step 1".
- `preamble.md`: the header names the fixed call order (Locate → Pre-flight → Model gate) and why. The blurb line lists the checks in run order.
- `unattended-mode.md` §"Pre-scaffold stops": the lead sentence names the Step 1 pre-flight checks and then the Step 1.5 model gate. Its "(the foreign-dirt gate already passed)" claim is now true for both runners, so it is unchanged.
- `docs/CONTEXT-BUDGET.md` preamble row: "Step 1 / 1.5 / 2" → "Step 1 / 1.5".
- Sidequest stub `.flaitron/sidequest/CORE-725.md` retired at scaffold (promotion).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown only. The viz/tools suites don't read these files (grep for the old heading in `*.ts`/`*.mjs`/`*.yml` → no hits).

- [x] Ran lint/type-check on changed code — `git diff --check` → 0; CI context-budget loop → 0

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review**: two `/code-review medium` passes on the working-tree diff. Pass 1: 2 blockers fixed, 7 notes (fixed, filed as [[CORE-731]], or accepted). Pass 2: 0 blockers, 7 notes (fixed, folded into CORE-731, or no change). See below.

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `awk Step1 | grep -q Pre-flight && ! awk Step2 | grep -q Pre-flight` → 0
- A2 `grep -q '§"Pre-flight", then §"Model gate"' preamble.md` → 0
- A3 `! grep -rnE 'Step[- ]2[^0-9]{0,3}pre-?flight' claude/skills/ft-task/ docs/CONTEXT-BUDGET.md` → 0
- A4 CI context-budget loop (copied from `.github/workflows/ci.yml`) → 0. `ft-task/SKILL.md` 24,203 / 33,000; `preamble.md` 7,496 / 9,000.
- External review pass 1 (`/code-review medium`, working-tree diff). A premature summary claiming "0 blockers, 2 notes" appeared before the agent finished. It was discarded and the real output graded instead, 9 findings:
  - **Blocker → fixed.** (2) Model gate's "before any source reads" contradicted the new order → carve-out for §"Pre-flight"'s mechanical lookups. (6) Preamble H1 and section order still read model-gate-first → sections reordered (Locate → Pre-flight → Model gate) and H1 updated.
  - **Note → fixed.** (7) `SPEC/gate-postures.md` §"Pre-scaffold stops" lead sentence not mirrored → synced. (9) Order rationale stated three times → SKILL.md clause trimmed to "per the preamble's call order".
  - **Note → filed** [[CORE-731]] (park). (1) Unattended mismatch park can overwrite an existing starter/in-flight note. (4) The same path skips sidequest-stub retirement. Both existed before this task; the SOP already has the rule.
  - **Note → accepted, no change.** (3) epic.md now loads before the gate even on a mismatch stop: `/ft-micro-task` precedent, rare path. (5) The SOP keeps its own §2/§3 structure: same effect, already parks only after pre-flight. (8) Attended dirty+mismatch now takes two round trips instead of one: dirt-first is the point of the fix, and micro already behaves this way.
- External review pass 2 (after the pass-1 fixes), 7 notes:
  - **Fixed.** (3/4) `unattended-mode.md` §"Pre-scaffold stops" and SKILL.md's unattended paragraph had dropped `/ft-task`'s Step 2 in-flight refusal from the terminate-and-write-nothing set → restored. (6) The "mechanical lookups" carve-out didn't cover the `SPEC/epic.md` read → it is now named. (7) The ordering clause in SKILL.md Step 1 → dropped.
  - **Folded into [[CORE-731]].** (1) The Step 2 in-flight refusal still runs after the model gate, so an attended retag can land and then be refused. This was already true before this task. (5) The `SPEC/gate-postures.md` "before the tasknote exists" premise. Both are the same existing-note-vs-model-gate gap.
  - **No change.** (2) Repeat the invariant in the dirt-gate bullet: the preamble header is its single source.
- Phase 3 re-run after fixes: A1–A4 → 0, `git diff --check` → 0. `ft-task/SKILL.md` 24,142; `preamble.md` 7,539 / 9,000; `gate-postures.md` 19,902 / 22,000.
- Structural: no duplication. The order rationale is stated once in the preamble and once as a short clause at the ft-task call site. No dead text left at Step 2. The old-order claim search across live `*.md` found no other sites.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry in README §"AI-referenced docs" → no change. Grepped for pre-flight / Step 1.5 / Step 2 / model gate / foreign-dirt. SPEC.md:302's blurb sentence lists what the blurb precedes and makes no ordering claim. SPEC.md §"Foreign-dirt gate" says "at skill entry", which now holds for both runners. EXTERNAL-AGENTS.md has no step citers. `docs/CONTEXT-BUDGET.md` (not in the list) updated its preamble row in Phase 2.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

- **Changed:** `claude/skills/ft-task/SKILL.md` (+6/−6): §"Pre-flight" moves from Step 2 into Step 1, before the Step 1.5 model gate; Step 2 is retitled "File-state branch"; two Step-2 citers repointed to Step 1. `claude/skills/ft-task/preamble.md` (+2/−2): fixed call order and its reason in the header. `claude/skills/ft-task/preamble.md` also reorders its sections (Locate → Pre-flight → Model gate), updates the H1, and carves Pre-flight's reads out of the Model gate's "before any source reads". `claude/skills/ft-task/unattended-mode.md` (+1/−1): §"Pre-scaffold stops" lead sentence. `SPEC/gate-postures.md` (+3/−2): the mirrored lead sentence. `docs/CONTEXT-BUDGET.md` (+1/−1): preamble row step span. `.flaitron/sidequest/CORE-725.md` retired.
- **Behaviour:** `/ft-task` now matches `/ft-micro-task` and the neutral SOP. The foreign-dirt gate, area resolution, and archive-collision checks run before the model gate, so every model-gate write (an `--unattended` model-mismatch park, an attended retag or legacy tag) lands only in a clean tree. `unattended-mode.md`'s "the foreign-dirt gate already passed" claim is now true on both runners.
- **Verification:** A1–A4 → 0 after every fix round (Testing Notes). `git diff --check` → 0. External review: two passes; pass 1 had 2 blockers, both fixed; pass 2 had 0 blockers.
- **Refactors:** none. Step numbers kept so the Step 1.5 citers in SPEC/docs stay valid.
- **`touches:` reconciliation:** `git diff --name-only` = the four declared paths + `SPEC/gate-postures.md` (undeclared; added by review finding 7) + the retired sidequest stub + PLAN.md/tasknote/CORE-731 stub (workflow).
- **Maintainability:** one call order for both runners removes a divergence the shared preamble was hiding. The existing-note-vs-model-gate gap (unattended overwrite, sidequest-stub retirement, attended retag-then-refuse) is filed as [[CORE-731]] (park, Medium).

**Archived:** 2026-10-07
