---
title: prep-draft-self-screen
status: completed
tags: [unattended, prep-unattended, spec]
created: 2026-10-18
due:
related-tasks: [CORE-783.3, CORE-810, CORE-799]
touches:
  - SPEC/unattended-candidacy.md
  - claude/skills/ft-prep-unattended/SKILL.md
---

# CORE-811 | prep-draft-self-screen

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-810]]

## 🎯 Goal

Make `/ft-prep-unattended` screen its own drafted mechanical row against the candidacy predicate before proposing it, so a back-link naming the source row's ID can no longer trip clause 3 and make the next seed decline the split.

## ✅ Acceptance

- [x] SPEC §"Preparing declined rows" Split bullet requires the drafted mechanical row to pass clauses 1–5 as drafted, its own ID and any mention of the source ID included; a row that still trips stays (also listed in the Stay bullet). — `awk '/^## Preparing declined rows/{p=1} /^## Persistence/{p=0} p' SPEC/unattended-candidacy.md | grep -q 'as drafted'`
- [x] `/ft-prep-unattended` Step 2 has a Screen sub-step, after ID allocation and placement, that runs the screen over the exact bytes and turns a remaining trip into `stay` for the whole split. — `grep -q '\*\*Screen\.\*\*' claude/skills/ft-prep-unattended/SKILL.md`; the sub-step also drops a tripping source-ID mention before staying
- [x] Drift checks pass, context budgets included. — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the self-screen requirement to the Split bullet in `SPEC/unattended-candidacy.md` §"Preparing declined rows"
- [x] Add the draft-time screen step to the Mechanical-row bullet in `claude/skills/ft-prep-unattended/SKILL.md` Step 2
- [x] Run `bash tools/drift-checks.sh`; restamp CONTEXT-BUDGET if the cap check asks

## 🔗 Related

- [[CORE-783.3]] — shipped `/ft-prep-unattended` (predecessor)
- [[CORE-810]] — previous tightening of the same Split bullet (deploy safety)
- [[CORE-799]] — moved collision checks to classification time

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed in the field (bidviz, 2026-10-18): a drafted mechanical row carried a back-link naming the source row's ID, and the ID's own text (a canonical prefix such as `DEPLOY-`, or a shortname holding a clause-3 word) tripped clause 3. The skill proposed the split, the operator kept it, and the next `/ft-seed-unattended` declined the mechanical row, so the split bought nothing. Neither the SPEC Split bullet nor Step 2 asks the skill to run the predicate over its own draft.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (full), `claude/skills/ft-prep-unattended/SKILL.md` (full), `templates/tasknote-template.md`.

- [x] **Best Practices Review** — N/A: prose contract edit, no module boundary

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Hits: CORE-783.3 (the skill), CORE-799 (split collisions, rules stated once with back-pointers), CORE-810 (Split bullet's deploy-safety test; "state only the fail case" lesson from its review). Same discipline here: the rule lives in the SPEC, the skill applies it by reference at the draft step.

- [x] **Drift check** — the PLAN line matches the code. The Split bullet describes the mechanical row's content tests (factual slice, safe to ship) and the skill's Mechanical-row draft sets tier, length, and placement, but neither screens the draft's bytes against clauses 1–5. Step 1 already reads the module in full, so the predicate text is in hand at draft time.

- [x] No clarifications needed. Assumptions: (1) The screen covers the text clauses 1–5 over the exact drafted line; clause 6 reads sibling state at seed time and stays the seed's. (2) A back-link is optional, so a back-link whose ID trips is omitted rather than reworded; a trip in the slice's own words (path or name) is the existing Stay case, since rewording removes no person. (3) No new predicate clause, class, or gate; Step 3 shows the bytes as before.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Codex wrapper, GLOSSARY, and the snippets only point at §"Preparing declined rows" (CORE-810 confirmed the same). Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended the Split bullet (CORE-810 added a second test there the same way) and the skill's Mechanical-row sub-steps (Remainder / Mechanical row / Starter) with one more sub-step. No new class, clause, or section.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor. Re-wrapped only the paragraph lines the insertion touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract; no harness covers skill prose beyond the drift checks

**Implementation Notes:**

- `SPEC/unattended-candidacy.md` Split bullet: the drafted mechanical row must pass clauses 1–5 as drafted (exact line, its own ID and any mention of the source ID included; `DEPLOY-12` trips clause 3 on its prefix). A mention of the source is optional, so one that trips is left out; a row that still trips (own ID, a path, the slice's words) has not separated cleanly and the row stays. The Stay bullet lists the case too.
- `claude/skills/ft-prep-unattended/SKILL.md` Step 2: new **Screen** sub-step between Mechanical row and Starter. It runs once the ID and placement are fixed, on the mechanical row only, leaves out a tripping source-ID mention, and turns a remaining trip into `stay` for the whole split (remainder rewrite dropped, no starter drafted).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown only; `bash tools/drift-checks.sh` covers it (full viz suite also run under `--unattended`)

- [x] Ran lint/type-check on changed code — N/A: markdown only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final):

- `awk … SPEC/unattended-candidacy.md | grep -q 'as drafted'` → exit 0
- `grep -q '\*\*Screen\.\*\*' claude/skills/ft-prep-unattended/SKILL.md` → exit 0
- `bash tools/drift-checks.sh` → exit 0 (context_budget included)
- `npm --prefix viz test` → exit 0 (614 passed; unrelated to the diff, run as the `--unattended` full-validation default)
- Structural: the rule is single-sourced in the SPEC; the skill's Screen sub-step is the procedure (where in the draft it runs and what a trip does), not a second statement of the test.

External review (`/code-review medium`, scoped to the working-tree diff; two passes):

- **Pass 1.** Blockers: (a) the screen sat before the mechanical row's own ID was allocated, so it could not see the exact bytes; (b) a post-screen `stay` did not say to drop the remainder rewrite and the starter. Fixed both: Screen moved after ID and placement, and it drops the remainder and drafts no starter. Notes fixed: SPEC now covers the row's own ID, and the Stay bullet lists the case. Note, no change: the rule appears in the SPEC and the skill's procedure; the skill names only the ordering and the trip outcome.
- **Pass 2.** The skill did not drop a tripping source-ID mention before staying (disagreeing with the SPEC); fixed. Sub-step order ambiguity (Screen before Starter, "drop the starter draft"): reworded to "draft no starter" and the "No file is written" sentence removed. Remainder-vs-mechanical scope: the Screen now says "that row — not the remainder". Overlong reflowed line: re-wrapped. Note, no change: in a repo whose canonical area prefix trips clause 3 (`DEPLOY-`), a standalone mechanical row's own ID always trips, so splits there always stay. That is the module's conservative direction (a false negative is the status quo) and the Stay reason names the word; no exemption added. No third pass: the post-pass-2 edits were rewordings.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  No change. The Codex wrapper, GLOSSARY, snippets, and the other docs naming `/ft-prep-unattended` only point at §"Preparing declined rows"; none restates the Split test. `docs/CONTEXT-BUDGET.md` is enforced by the drift job, which passed.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The bug class: a skill that drafts a row for another skill's predicate must run that predicate on its own draft. Already the Screen sub-step; nothing for the always-loaded layer.

**Final Summary:**

Changed: `SPEC/unattended-candidacy.md` (Split bullet: the drafted mechanical row must pass clauses 1–5 as drafted, its own ID and any source-ID mention included; a mention that trips is left out, a row that still trips stays; Stay bullet lists the case), `claude/skills/ft-prep-unattended/SKILL.md` (Step 2: new Screen sub-step after ID allocation and placement; a remaining trip makes the whole split a `stay`, dropping the remainder rewrite and drafting no starter). Verification: all three Acceptance commands exit 0, drift checks clean, viz suite 614 passed, two review passes graded (blockers fixed in pass 1, wording fixes in pass 2). `touches:` reconciliation: `git diff --name-only` = the two declared paths plus PLAN.md and this tasknote (workflow files) — matches. No refactor. Maintainability: the rule stays single-sourced in the SPEC. The bidviz rows that prompted this are not repaired here; that is bidviz's own session.

**Archived:** 2026-10-18
