---
title: prep-split-deploy-safety
status: completed
tags: [unattended, prep-unattended, spec]
created: 2026-10-18
due:
related-tasks: [CORE-783.3, CORE-798, CORE-799]
touches:
  - SPEC/unattended-candidacy.md
  - claude/skills/ft-prep-unattended/SKILL.md
  - SPEC/plan-filing.md
---

# CORE-810 | prep-split-deploy-safety

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-783.3]]

## 🎯 Goal

Make a `/ft-prep-unattended` split's mechanical row safe to ship while the person act is still pending, and make the skill insert that row on the line right after its source, with no blank line between, even when the source is its section's last row.

## ✅ Acceptance

- [x] SPEC §"Preparing declined rows" Split bullet requires the mechanical row to be safe to ship before the act. It must not remove or switch off what the project relies on until the act lands, nor require anything the act provides. A slice that fails this stays. — `awk '/^## Preparing declined rows/{p=1} /^## Persistence/{p=0} p' SPEC/unattended-candidacy.md | grep -q 'safe to ship'`
- [x] `/ft-prep-unattended` Step 2 placement says the mechanical row goes on the next line after its source with no blank line, including when the source is the section's last row. — `grep -q 'no blank line' claude/skills/ft-prep-unattended/SKILL.md`
- [x] No "append" wording left for the mechanical row (skill intro and Step 4 hunk list; `SPEC/plan-filing.md` §"Filing commits" ×2). — `! grep -rn -e 'append a mechanical' -e 'appended mechanical' -e 'unattended\` appended' SPEC claude`
- [x] Drift checks pass, context budgets included. — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the deploy-safety test to the Split bullet in `SPEC/unattended-candidacy.md` §"Preparing declined rows"
- [x] Tighten the standalone placement sentence in `claude/skills/ft-prep-unattended/SKILL.md` Step 2 (next line, no blank line, section's last row included)
- [x] Reword "append" → "insert" at skill line 12, skill Step 4 post-stage hunk list, and `SPEC/plan-filing.md` §"Filing commits"
- [x] Run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-783.3]] — shipped `/ft-prep-unattended` (predecessor)
- [[CORE-798]] / [[CORE-799]] — earlier tightenings of the same section (guard wording, split collisions)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both defects are confirmed in the field. In bananapeel, commit `09e9e88d` split BP-2563 into a code row, BP-2576. BP-2576 swaps Resend for a Cloudflare `send_email` binding and drops `RESEND_API_KEY`. Shipped before the domain is onboarded, it would stop invite and reset mail. It still passed the current test ("correct before, after, or without the act"), because the agent read that as code correctness, not deploy safety. The same commit put BP-2576 after a blank line under `## High`, not right after BP-2563.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` §"Preparing declined rows", `claude/skills/ft-prep-unattended/SKILL.md` (full), the Codex wrapper (pointer only), and `SPEC/plan-filing.md` §"Filing commits".

- [x] **Best Practices Review** — N/A: prose contract edit, no module boundary

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Relevant hits: CORE-783.3 (the skill), CORE-798 (pin guard wording), and CORE-799 (split collisions). CORE-799 moved collision checks to classification time and stated each rule once, with back-pointers. The same discipline applies here: the deploy-safety rule lives in the SPEC, not in the skill.

- [x] **Drift check** — the PLAN line matches the code. The skill already says "inserted immediately after its source row", so the defect is under-specification, not missing text. When the source row is a section's last, the blank line before the next heading invites putting the new row after it. Two "append" words in the skill and one in `SPEC/plan-filing.md` add to that reading.

- [x] No clarifications needed. Assumptions: (1) Deploy safety becomes a second condition in the Split bullet, so a slice that fails it is not cleanly separated and the row **stays**, the same as a slice that uses the act's result. No new class, no predicate clause. (2) The placement fix stays in the skill. The SPEC does not specify placement. (3) The bananapeel rows themselves are not repaired here; that belongs to bananapeel's own session.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

The Codex wrapper only points at the Claude body, so it needs no edit. GLOSSARY and the snippets only point at the section, and no other file restates the Split test (grep for `correct before` / `before, after, or without` → SPEC only). Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended the Split bullet's existing "has not separated cleanly → stays" test with a second condition, and the skill's existing placement sentence. No new class, clause, or section.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor. The three "append" → "insert" rewordings are on paths this task touches, and each is part of the misreading being fixed.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract; no test harness covers skill prose beyond the drift checks

**Implementation Notes:**

- `SPEC/unattended-candidacy.md` Split bullet: the mechanical row must also be safe to ship before the act, and never remove or switch off anything the project relies on until the act lands. The worked example is the BP-2576 shape, described generically. "A slice that fails that test" became "either test"; a failing slice still stays.
- `claude/skills/ft-prep-unattended/SKILL.md` Step 2 standalone placement: the new row goes on the line right after its source, with no blank line between, including when the source is its section's last row (above the blank line before the next heading).
- "append" → "insert" for the mechanical row at skill §intro, skill Step 4 post-stage hunk list, and `SPEC/plan-filing.md` §"Filing commits".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown only; `bash tools/drift-checks.sh` is the check that covers it

- [x] Ran lint/type-check on changed code — N/A: markdown only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final, after the third review):

- `awk … SPEC/unattended-candidacy.md | grep -q 'safe to ship'` → exit 0
- `grep -q 'no blank line' claude/skills/ft-prep-unattended/SKILL.md` → exit 0
- `! grep -rn -e 'append a mechanical' -e 'appended mechanical' -e 'unattended\` appended' SPEC claude` → exit 0
- `bash tools/drift-checks.sh` → exit 0 (context_budget included)
- Structural: the deploy-safety rule is stated once, in the SPEC. The skill applies it by reference (Step 1 reads the module in full), and no doc restates the Split test. Placement is stated once, in skill Step 2.

External review (`/code-review medium`, scoped to the working-tree diff; three passes):

- **Pass 1.** Blocker: `SPEC/plan-filing.md:160` still said "appended", and Acceptance 3's grep missed that word order. Fixed both, widening the grep. Notes fixed: EOF/heading edge in placement, re-wrap, the over-broad "anything the project relies on", the project-specific example. Notes, no change: Step 3 not surfacing deploy safety (the gate shows the bytes; classification is Step 2's job), Stay list not naming the new case (a split that uses the act's result is implied the same way).
- **Pass 2.** Blockers: the test missed a slice that *requires* what the act provides; the "only the act will replace" wording reopened the BP-2576 loophole; "keeping the old path … passes" read as overriding the first test. Fixed by restating as "leaves the project working while the act is pending", with both a removal and a requirement half. Notes fixed: re-wrap, duplicate placement sentence. Notes, no change: hand-filed swap rows at the seed predicate (no person act, so not a candidacy question), nested continuation lines (PLAN task lines are single-line by grammar).
- **Pass 3.** Blocker cluster (remainder ownership of old-path removal, ordering between the rows, a contradiction with "never requires") all traced to pass 2's "keeping the old path beside the new one can pass" carve-out. Dropped it, so such slices stay, per the module's "when uncertain, not a candidate". Notes, no change: the act never happening (the remainder stays open, the status quo), no clause number for the stay (it cites the clause that declined the row), row-text-only detection (pins already rely on repo knowledge), adjacent splits (A, A-mech, B, B-mech is deterministic). The fix after pass 3 was a deletion plus a re-wrap; no fourth pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  No change. `docs/GLOSSARY.md`, `docs/VERSION-HISTORY.md`, the snippets, and the other docs naming `/ft-prep-unattended` only point at §"Preparing declined rows". None restates the Split test or placement. `docs/CONTEXT-BUDGET.md` is enforced by the drift job, which passed.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. One review lesson: a passing-case carve-out in a conservative test drew blockers of its own. Stating only the fail case kept the rule closed.

**Final Summary:**

Changed: `SPEC/unattended-candidacy.md` (Split bullet adds a second test: safe to ship before the act, meaning the slice neither removes or switches off a path relied on until the act lands nor requires anything the act provides; failing it stays), `claude/skills/ft-prep-unattended/SKILL.md` (Step 2: the mechanical row goes on the line immediately after its source with no blank line, even for a section's last row; "append" → "insert" ×2; epic-child sentence re-wrapped), `SPEC/plan-filing.md` (§"Filing commits" "append"/"appended" → "insert"/"inserted"). Verification: all four Acceptance commands exit 0, drift checks clean, three review passes graded (the third's blockers closed by deleting a carve-out). `touches:` reconciliation: `git diff --name-only` = the three declared paths plus PLAN.md and this tasknote (workflow files) — matches. No refactor. Maintainability: the rule stays single-sourced in the SPEC. The bananapeel rows (BP-2563/BP-2576, the latter seeded `[unattended]` under the old wording) are not repaired here; that is bananapeel's own session.

**Archived:** 2026-10-18
