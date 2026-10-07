---
title: micro-close-epic-note-recovery
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-732]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-close-epic/unattended-close-epic.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC.md
  - SPEC/gate-postures.md
  - SPEC/blocked.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-733 | micro-close-epic-note-recovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-732]]

## 🎯 Goal

Let `/ft-micro-task` resume its own `model-mismatch` park, and let `/ft-close-epic` route its own existing audit note ahead of the foreign-dirt gate, matching what CORE-732 did for `/ft-task`.

## ✅ Acceptance

- [x] `/ft-micro-task` lets its own `model-mismatch` park through Pre-flight and resumes it in Step 2; every other existing note is still refused — `grep -c "own \`model-mismatch\` park" claude/skills/ft-micro-task/SKILL.md` (≥1) + `grep -c "Resume a \`model-mismatch\` park" claude/skills/ft-micro-task/SKILL.md` (≥1)
- [x] `/ft-close-epic` runs its existing-audit-note check ahead of the foreign-dirt gate and stops on any existing status — `grep -c "ahead of the foreign-dirt gate" claude/skills/ft-close-epic/SKILL.md` (≥1) + `grep -c "never overwrites a live note" claude/skills/ft-close-epic/SKILL.md` (≥1)
- [x] The contract surfaces no longer say micro refuses every existing note — `grep -rn "any existing note" SPEC.md SPEC claude | grep -v "but its own"` (no output) and `grep -c '`/ft-close-epic` runs the same' SPEC.md` (1)
- [x] Byte budgets hold — `wc -c` vs `docs/CONTEXT-BUDGET.md` (SKILL.md 33,000; SPEC.md 49,000; gate-postures 22,000)
- [x] Wording is coherent across the surfaces — `judgment`: prose contract, no command decides consistency

## 🧩 Subtasks

- [x] ft-micro-task SKILL.md: Step 1 existing-note bullet gains the own-`model-mismatch`-park exception; Step 2 gains the resume branch (fill scaffold values, flip status/chip, drop `park-reason:`, continue at Step 3)
- [x] ft-close-epic SKILL.md Step 1: existing-audit-note check ahead of the foreign-dirt gate (any status refused; blocked/starter point to `/ft-task <ID>`); `unattended-close-epic.md` `in-flight` cause covers any live note
- [x] Contract mirrors: SPEC.md §"Foreign-dirt gate", SPEC/gate-postures.md §"Pre-scaffold stops", `unattended-mode.md` §"Pre-scaffold stops", SPEC/blocked.md §"Exit (resume)" (micro resumes its own mismatch park)
- [x] Verify (greps, budgets), external review

## 🔗 Related

- [[CORE-732]] — parent; its external review filed this (pass-1 findings 1 and 6)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps confirmed in current text. `ft-micro-task/SKILL.md` Step 1 refuses "already exists" for any status, though `unattended-mode.md` §"Pre-scaffold stops" has micro write a `status: blocked` `model-mismatch` scaffold itself; nothing in micro resumes it. `ft-close-epic/SKILL.md` Step 1 runs the foreign-dirt gate first and only names `in-progress` / archived in its existing-note check, so an uncommitted audit note stops as dirt and a blocked one (committed) falls through to the Step 3 scaffold copy.
- [x] Read relevant source files — `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-close-epic/{SKILL.md,unattended-close-epic.md}`, `claude/skills/ft-task/{preamble.md,step-3c-resume-blocked.md,unattended-mode.md}`, `SPEC.md` §"Foreign-dirt gate", `SPEC/blocked.md` §"Exit (resume)", `SPEC/gate-postures.md` §"Pre-scaffold stops", `templates/tasknote-micro-template.md`, archived CORE-732 / CORE-725.

- [x] **Best Practices Review** — N/A for code. Contract coherence: close-epic does not use the shared preamble, so it carries its own dirt-gate exemption inline rather than inheriting it; micro inherits the exemption from `preamble.md` (already runner-agnostic), so only its existing-note bullet and a Step 2 resume branch are new.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Load-bearing: CORE-732 (parent; added the preamble exemption, the mismatch-resume-at-Phase-1 route, and filed this), CORE-725 (moved Pre-flight ahead of the model gate, so a mismatch park only lands in a clean tree). CORE-729 only added the skill/pin guard. Nothing decided against either change.

- [x] **Drift check** — no drift: the PLAN line and stub match the code. One correction to the stub's wording: a *blocked* audit note is not refused today, it falls through to the scaffold copy, so the close-epic fix has to refuse every status, not only `in-progress`.

- [x] Asked clarifying questions — AskUserQuestion, two answers: (1) micro resumes its own `model-mismatch` park only (micro skeleton + `park-reason: model-mismatch`); every other existing note stays refused; (2) close-epic refuses any existing audit note, checked ahead of the dirt gate, with blocked / starter pointing at `/ft-task <ID>`. Assumptions: no close-epic resume path is added; `/ft-task` is not made micro-aware, so `/ft-task` resuming a micro-shaped mismatch park stays as CORE-732 left it (out of scope, operator-chosen).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea**
>
> CORE-732 made `/ft-task` route its own uncommitted note ahead of the foreign-dirt gate and resume a `model-mismatch` park at Phase 1. Two runners miss it:
>
> 1. `/ft-micro-task` refuses its own uncommitted `--unattended` model-mismatch park; only `/ft-task` resumes it, running full-template Phase 1 on a micro-template note.
> 2. `/ft-close-epic` still runs its foreign-dirt gate before its existing-audit-note check, so an uncommitted in-progress audit note stops as dirt.
>
> **Resume anchor**
>
> CORE-732 Phase 3 external review pass 1 (findings 1 and 6); fixes for the other findings were being applied.

- Pre-flight order is unchanged for micro (existing-note check already sits ahead of the dirt gate via CORE-732); the new part is a carve-out inside that check plus a Step 2 resume branch.
- touches: extended during Phase 2 with the contract mirrors (`SPEC.md`, `SPEC/gate-postures.md`, `SPEC/blocked.md`, `claude/skills/ft-task/unattended-mode.md`, `claude/skills/ft-close-epic/unattended-close-epic.md`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-732's shape: a carve-out in micro's existing-note bullet plus a resume branch in its Step 2 (mirrors `step-3c-resume-blocked.md`'s mismatch exception); close-epic's check moved ahead of its dirt gate with the exemption restated inline, since it does not load the shared preamble.

- [x] **Minimal refactor gate** — no refactor. Deferred: making `/ft-task` refuse or special-case a micro-shaped mismatch park (operator chose micro-side resume only).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract only, no executable surface.

**Implementation Notes:**

- `claude/skills/ft-micro-task/SKILL.md`: Step 1 existing-note bullet gains the exception for this skill's own `model-mismatch` park (blocked + `park-reason: model-mismatch` + `## ⚡ Notes`); Step 2 gains **Resume a `model-mismatch` park** — fill missing scaffold values, flip status and chip, drop `park-reason:`, continue at Step 3, skip the template copy and stub retirement.
- `claude/skills/ft-close-epic/SKILL.md` Step 1: the existing-audit-note check now runs ahead of the foreign-dirt gate and refuses any status (blocked / starter point at `/ft-task <ID>`). `unattended-close-epic.md`: `in-flight` cause covers any live audit note.
- Mirrors: `SPEC.md` §"Foreign-dirt gate", `SPEC/gate-postures.md` §"Pre-scaffold stops", `claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops", `SPEC/blocked.md` §"Exit (resume)".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown contract only; no test reads these files.

- [x] Ran lint/type-check on changed code — N/A: no code changed (`git diff --check` → 0).

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final run):

- `grep -c 'own \`model-mismatch\` park' claude/skills/ft-micro-task/SKILL.md` → 1 (exit 0); `grep -c 'Resume a \`model-mismatch\` park' …` → 1 (exit 0)
- `grep -c "ahead of the foreign-dirt gate" claude/skills/ft-close-epic/SKILL.md` → 1 (exit 0); `grep -c "never overwrites a live note" …` → 1 (exit 0)
- `grep -rn "any existing note" SPEC.md SPEC claude | grep -v "but its own"` → no output (exit 1, as intended); `grep -c '\`/ft-close-epic\` runs the same' SPEC.md` → 1 (exit 0)
- `wc -c` → ft-micro-task SKILL 18,012 / 33,000; ft-close-epic SKILL 28,065 / 33,000; SPEC.md 42,988 / 49,000; gate-postures 20,559 / 22,000. All within budget.
- `git diff --check` → 0.
- Structural: no duplication or dead text. The one dead clause (the close-epic dirt-gate exemption) was found in review and removed.

External review pass 1 (`/code-review medium`, working tree), 7 findings:

- **Blocker → fixed** (1): the close-epic dirt-gate exemption was dead text, because the existing-note check refuses every status first. The clause, SPEC.md's wording, and Acceptance 2 and 3 were corrected, and Phase 3 re-ran from the top.
- **No change** (2): the `.N` argument is the audit ID throughout; Step 2 validates it and the note is named by it, so a `.N` argument cannot meet a legacy-numeric note. (3, 4): a `model-mismatch` park exists only as the gate's bare scaffold written when no note or stub exists, and `/ft-task`'s park lacks `## ⚡ Notes`, so the discriminator holds; Step 1 already routes the resumed note through Step 1.5. (6): the `/ft-task` pointer for blocked or starter audit notes was the operator's Discovery choice. (7): the text is accurate for the repeat-mismatch case.
- **Note → fixed** (5): SPEC/blocked.md steers a micro-shaped park to `/ft-micro-task <ID>`.

External review pass 2, 8 findings, no blockers:

- **Note → fixed** (3 `unattended-mode.md` "Resume is unchanged" now names the micro resume; 4 SPEC/blocked.md no longer overstates ("`/ft-task` is not micro-aware"), rewrapped; 7 gate-postures says micro's own park reaches micro's gate; 1/2 the unattended park writer now writes the note "from the invoking runner's own template", which makes the `## ⚡ Notes` marker deterministic).
- **No change** (5): the `/ft-task` pointer is the operator's choice. (6): the cause order is cosmetic; the foreign-dirt contract is unchanged. (8): `preamble.md` has no starter or blocked routing; that lives in `/ft-task` Step 2.
- No blocker, so no third pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A.

**Final Summary:**

Doc-drift sweep: `docs/EXTERNAL-AGENTS.md` item 5 (resume by re-invoking the same skill) still holds for the micro resume: no change. Every other AI-referenced doc: no change. `SPEC.md` was edited as a deliverable.

Recap:

- **Changed:** `claude/skills/ft-micro-task/SKILL.md` (Step 1 exception for its own `model-mismatch` park, Step 2 resume branch); `claude/skills/ft-close-epic/SKILL.md` (existing-audit-note check moved ahead of the dirt gate, any status refused); `unattended-close-epic.md`, `unattended-mode.md`, `SPEC.md`, `SPEC/gate-postures.md`, `SPEC/blocked.md` (mirrors).
- **Behaviour:** an uncommitted `--unattended` model-mismatch park from `/ft-micro-task` now resumes under `/ft-micro-task` and continues at its Step 3, instead of being refused or run through `/ft-task`'s full-template Phase 1. `/ft-close-epic` refuses an existing audit note of any status before the dirt gate, so an uncommitted in-progress note is reported as in flight, and a blocked or starter note is no longer overwritten by the scaffold copy.
- **Verification:** all Acceptance greps pass, all budgets hold, two external review passes (pass 1 had one blocker, fixed; pass 2 notes only).
- **Refactors:** none. Deferred: `/ft-task` does not refuse a micro-shaped mismatch park (operator chose micro-side resume only).
- **`touches:` reconciliation:** `git diff --name-only` shows the eight declared paths, plus the retired CORE-733 sidequest stub and the tasknote/PLAN workflow files.
- **Maintainability:** the resume rule for a micro mismatch park has one owner (micro Step 2), mirrored in four contract surfaces.

**Archived:** 2026-10-07
