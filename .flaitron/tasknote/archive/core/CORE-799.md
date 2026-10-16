---
title: prep-split-collisions
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: [CORE-797, CORE-798]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/unattended-candidacy.md
  - claude/skills/ft-prep-unattended/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-799 | prep-split-collisions

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-797]]

## 🎯 Goal

Make `/ft-prep-unattended` classify two split collisions as `stay`: an epic child whose parent has no `.N` row (a legacy numeric audit, which a new `.k` would land after), and a source ID that already has a `.flaitron/sidequest/` stub.

## ✅ Acceptance

- [x] The SPEC §"Preparing declined rows" Stay bullet names both cases — `grep -n 'no \`.N\` row' SPEC/unattended-candidacy.md` and `grep -n 'sidequest' SPEC/unattended-candidacy.md` each hit inside the section
- [x] The skill's Step 2 applies both before any draft (moved from the placement rule and the Starter check after the review blocker) — `grep -n 'no \`.N\` row' claude/skills/ft-prep-unattended/SKILL.md` and `grep -n 'sidequest' claude/skills/ft-prep-unattended/SKILL.md` each hit
- [x] The stay-rule lives once: the skill names the case and points at the SPEC, without restating its reason — `judgment` (prose single-sourcing; no command decides it). Confirmed by review pass 2
- [x] Drift checks pass — `bash tools/drift-checks.sh` → exit 0

## 🧩 Subtasks

- [x] Add both cases to the Stay bullet in `SPEC/unattended-candidacy.md` §"Preparing declined rows"
- [x] Skill Step 2: settle both collisions while classifying (the first pass placed them in the mechanical-row placement rule and the Starter check; moved after the review)
- [x] Starter bullet: replace the inline tasknote check with a back-pointer
- [x] Run the drift checks

## 🔗 Related

- [[CORE-797]] — predecessor: the dry-run that found G3 (legacy numeric audit) and G4 (sidequest stub)
- [[CORE-798]] — sibling filing from the same dry-run (G1 + G2, guard wording)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are still live at HEAD. The skill's epic-child rule ("before `.N`") has no anchor when the parent has no `.N` row. The Starter check covers only tasknotes, not sidequest stubs. A real split would hit either one.

- [x] Read relevant source files — `claude/skills/ft-prep-unattended/SKILL.md` (full), `SPEC/unattended-candidacy.md` §"Preparing declined rows" and clause 6, `claude/skills/ft-close-epic/SKILL.md` legacy-numeric rule (line 65), `codex/skills/ft-prep-unattended/SKILL.md` (a pointer only)

- [x] **Best Practices Review** — N/A: prose contract only. Single-sourcing applies. The skill's Notes say a stay-rule is fixed in the SPEC, not copied into the skill. The skill's Step 2 mechanics already name the existing-tasknote stay at the point of use, so the two new cases go in the same two places.

- [x] **Archive skim** — `<area>` is `archive/core/` (README table, `CORE-*`). Hits: [[CORE-783.3]] (the skill body; "a source ID that already has a tasknote stays, and that stay is in the module"), [[CORE-797]] (G3/G4 evidence), [[CORE-798]] (rewrote the Pin/Split bullets today and left G3/G4 out of scope). Nothing contradicts this change.

- [x] **Drift check** — the PLAN line matches the code. Step 2 says "the next `.<k>` … before `.N`, inserted … immediately before that `.N` row" (SKILL.md lines 97–100). The Starter check names only `.flaitron/tasknote/<source-ID>.md` or an archived note (lines 108–110). The SPEC Stay bullet lists a tasknote but no stub. `unattended-candidacy.md` has no Budgets-table row (unbudgeted lazy module).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) "Legacy numeric audit" is detected the way `/ft-close-epic` detects it: the parent has no `.N` row. An epic whose audit was never filed has no anchor either, so it stays too. (2) A sidequest stub makes the row stay whether or not a starter would be written. This mirrors the existing tasknote stay, which applies to the source ID and not only to the starter. (3) `/ft-task` Step 3a's missing stub retirement (noted in CORE-797 G4) is out of scope. Once prep never writes a starter over a stub, that path is not reached from here.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

The Codex wrapper only points at the Claude body, so it needs no edit. No other file restates the Stay list. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended the Stay bullet's existing stay list and the existing-tasknote clause in place. In the skill, the two mechanics lines that already name a stay got the new cases: the epic-child placement rule and the Starter collision check.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract; no test harness covers skill prose beyond the drift checks

**Implementation Notes:**

- `SPEC/unattended-candidacy.md` Stay bullet: (a) "an epic child whose parent has no `.N` row" stays, with the reason (a legacy numeric or unfiled audit, so a new `.k` lands after it); (b) the tasknote clause now covers a `.flaitron/sidequest/` stub ("or orphan a stub").
- `claude/skills/ft-prep-unattended/SKILL.md` Step 2, after the review blocker: the collisions are settled while classifying, before any draft. A source ID with a tasknote, an archived note, or a sidequest stub stays, and so does a would-be split under a parent with no `.N` row. The stay reason names the file or the missing `.N`. The Starter bullet's old inline tasknote check became a back-pointer ("The collision check above has already ruled out …"), so the check is stated once. The first-pass sentence in the placement rule was removed.
- SPEC, after the review: the no-`.N` case is scoped to a split, since a pin adds no `.k`. The reason covers the unfiled case ("no `.N` to insert before"), and the stub is named `.flaitron/sidequest/<ID>.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown only; `bash tools/drift-checks.sh` is the check that covers it

- [x] Ran lint/type-check on changed code — N/A: markdown only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final, after the second review):

- `grep 'no \`.N\` row\|sidequest'` on SPEC §"Preparing declined rows" (awk-extracted) → exit 0, 2 lines
- `grep -c 'no \`.N\` row\|sidequest' claude/skills/ft-prep-unattended/SKILL.md` → exit 0, 2 (both in Step 2's classification paragraph, ahead of "Draft the bytes")
- `bash tools/drift-checks.sh` → exit 0 (context_budget included)
- Structural: the tasknote-collision check is stated once. The Starter bullet's old inline copy became a back-pointer. No stale docs: no other file restates the Stay list. GLOSSARY and the snippets only point at the section.

External review (`/code-review medium`, scoped to the working-tree diff):

- **Pass 1, blocker → Phase 2 → Phase 3 re-run:** the collision checks sat inside the Starter and placement drafting branches, while the SPEC makes the whole row stay. A no-starter split or a pin on a stubbed ID would have gone through. Fixed by moving both checks to classification. The same root cause produced five more notes (mid-draft reclassification, allocation ordering, no SPEC pointer, divergent reason). The move fixed them too.
- **Pass 1 notes, fixed:** the no-`.N` case is scoped to a split (a pin adds no `.k`). The reason now covers an unfiled audit. The SPEC names `.flaitron/sidequest/<ID>.md`.
- **Pass 1 note, no action:** the reviewer said `/ft-task` already retires stubs. That is Step 3b. Assumption (3) is about Step 3a, so it stands.
- **Pass 2: no blockers.** Notes fixed: the archived note now has its glob path, `.flaitron/tasknote/archive/*/<ID>.md`, and the Starter back-pointer dropped "never write over one", which did not fit a stub. Notes, no action: (a) a pin on an ID that has a tasknote stays. That is the pre-existing SPEC rule, unchanged here. (b) A mechanical `.k` colliding with an archived note or stub is covered by "counting IDs already on disk" and `SPEC/plan-filing.md` §"ID allocation". (c) Pin-vs-split precedence: "would-be split" already sits after the SPEC's prefer-a-pin order.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`/ft-prep-unattended` now classifies two split collisions as `stay` while it classifies, before any draft. The first is a source ID that already has a tasknote, an archived note, or a `.flaitron/sidequest/<ID>.md` stub (G4). The second is a would-be split of an epic child whose parent has no `.N` row (G3: a legacy numeric or unfiled audit). The rule lives in `SPEC/unattended-candidacy.md` §"Preparing declined rows". The skill names the cases at classification, and the Starter bullet points back to that check.

Changed: `SPEC/unattended-candidacy.md` (Stay bullet, +3 net lines) and `claude/skills/ft-prep-unattended/SKILL.md` (Step 2, +4 net lines). Verification: the acceptance greps hit, and `bash tools/drift-checks.sh` → 0. Two review passes ran: one blocker, fixed. Refactor: the Starter bullet's inline tasknote check became a back-pointer, so the check is stated once.

Doc-drift sweep: no change. No AI-referenced doc restates the Stay list. `docs/GLOSSARY.md`, the four `*/AGENTS-snippet.md`, `docs/EXTERNAL-AGENTS.md`, and `docs/AGENT-NEUTRALITY.md` only point at the skill or the section. The Codex wrapper only points at the Claude body. `unattended-candidacy.md` has no Budgets row.

`touches:` reconciliation: declared the two files. The diff has those two, plus PLAN.md and this note's archive move. Nothing undeclared.

Maintainability: the collision stays now sit in one paragraph at classification time, so a later stay-rule has one place to land.

Learnings: N/A.

**Archived:** 2026-10-15
