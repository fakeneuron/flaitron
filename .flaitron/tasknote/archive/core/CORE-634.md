---
title: rotation-closed-month-append
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: []
touches:
  - SPEC/plan-filing.md
  - .flowtron/PLAN-ARCHIVE.md
---

# CORE-634 | rotation-closed-month-append

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Fix the `## Completed` rotation clause in `SPEC/plan-filing.md` so a row resolving to a month heading that already sits below a later month's block can still append there, instead of reading as unrotatable.

## ✅ Acceptance

- [x] The "closed to further appends" clause no longer contradicts "oldest first" / "never split a cohort" — `judgment` (prose-only fix; no verify command decides prose coherence) — MET, see Implementation Notes
- [x] `grep -q "closed to further appends" SPEC/plan-filing.md` returns no match (old contradictory clause removed) — `grep -q "closed to further appends" SPEC/plan-filing.md; test $? -eq 1` → exit 0 (grep exit 1, test confirms)

## 🧩 Subtasks

- [x] Replace the "closed to further appends" clause in `SPEC/plan-filing.md` §"`## Completed` rotation" with wording that says: append to the existing month block's end wherever it sits in the file; blocks are extended in place, never rewritten or reordered
- [x] Re-read the surrounding paragraph and the "Granularity" / "Date resolution" subsections to confirm the replacement stays consistent with them
- [x] Verify no other doc carries the same contradictory clause — found + fixed the identical clause in `.flowtron/PLAN-ARCHIVE.md`'s preamble; no other doc in the AI-referenced set mentions it

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line, current SPEC/plan-filing.md text, and the reported contradiction all still match — read `SPEC/plan-filing.md` lines 176-229 directly and confirmed the "closed to further appends" clause is still present verbatim and still creates the described contradiction (a row resolving to a month that already has a later block above it has no literal destination).

- [x] Read relevant source files — read `SPEC/plan-filing.md` §"`## Completed` rotation" (lines 176-229) in full.

- [x] **Best Practices Review** — N/A, this is a prose-only SPEC clarification, no code/module boundaries touched.

- [x] **Archive skim** — `grep -l "SPEC/plan-filing.md" .flowtron/tasknote/archive/core/*.md` to check for prior tasknotes touching this file's rotation section, read any hits.

- [x] **Drift check** — confirmed against current `SPEC/plan-filing.md` (not recalled); PLAN.md line's description of the bug matches the file as read above.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed (--unattended/--fast). Assumption: fix is a targeted prose replacement of the identified clause only, no restructuring of the surrounding rotation contract.

- [x] Subtasks above populated; `touches:` declared.

**Discovery Notes:**

`SPEC/plan-filing.md` lines 194-201 read (as of this Discovery):

> The *current* (still-open) calendar month's heading is the one exception to
> "adds month blocks" — since rotation no longer waits for a month to finish
> (see "Granularity" below), a later rotation may append more rows under that
> same still-open heading; only a month's heading that has already received a
> later month's block above it is closed to further appends.

Read literally: once a newer month's block has been inserted above an older
month's heading, that older heading is "closed" — so a late-swept row that
resolves to that older month has no valid append target, contradicting
"oldest first" / "never split a cohort" and the append-only file contract
stated two sentences earlier ("Rows move verbatim... The file is
append-only"). Surfaced in adppro 2026-09-20 (17 late-swept May-July rows)
per the PLAN.md line.

Fix: drop the "closed to further appends" framing entirely. Every month
heading, once created, stays open to further appends at its existing
position in the file — rotation extends the block in place and never
rewrites or reorders it, regardless of which newer blocks have since been
added above it. A new heading is only created when no heading exists yet
for that row's month.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — this is a doc-only prose fix inside an existing SPEC section; no code pattern applies. N/A.

- [x] **Minimal refactor gate** — single clause replaced; no surrounding prose touched beyond what's needed for consistency. N/A beyond the one clause.

- [x] Implemented the minimal solution — replaced the contradictory sentence in `SPEC/plan-filing.md` §"`## Completed` rotation".

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only SPEC doc; no test suite covers SPEC wording.

**Implementation Notes:**

Replaced:

> only a month's heading that has already received a later month's block
> above it is closed to further appends.

With:

> a month's heading, once created, stays open to further appends at its
> existing position for as long as `## Completed` exists — rotation extends
> the block in place and never rewrites or reorders it, regardless of which
> newer month blocks have since been inserted above it.

Kept the surrounding sentences (the still-open-current-month exception intro,
and the "This append rule is what keeps..." closer) intact since they remain
accurate under the new wording.

Found the identical contradictory clause mirrored in `.flowtron/PLAN-ARCHIVE.md`'s
own preamble ("only a month heading with a newer one already stacked above it
is closed to further appends") — same bug, same fix, in scope since leaving it
would keep the contradiction alive in the file readers hit first. Replaced it
with the equivalent "stays open at its existing position" wording.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only markdown edit, no test suite covers SPEC wording

- [x] Ran lint/type-check on changed code — N/A, no lint config targets `.md` prose; verified GFM validity by eye (no broken headings/links introduced)

- [x] **Verification receipt** — `grep -q "closed to further appends" SPEC/plan-filing.md; echo $?` → 1 (removed, as required). `grep -q "closed to further appends" .flowtron/PLAN-ARCHIVE.md; echo $?` → 1 (removed). No avoidable duplication/dead code/stale docs introduced — this is the doc being fixed.

- [x] (frontend) N/A — not a frontend change

**Testing Notes:**

Both instances of the contradictory "closed to further appends" clause
(`SPEC/plan-filing.md` and `.flowtron/PLAN-ARCHIVE.md` preamble) confirmed
removed via grep. `git diff` reviewed by eye: two isolated prose edits, no
structural markdown breakage (headings, links, list nesting all intact).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (does not restate the rotation append rule) · `docs/MIGRATION.md` no change (no restatement) · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · rest of AI-referenced set: no restatement of the rotation append rule found.

- [x] Closed — both Acceptance criteria met, `status:` flipped to `completed` below, PLAN.md line to be flipped to stub form and kept at top of `## Completed` (standalone task).

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Fixed the `## Completed` rotation contract in `SPEC/plan-filing.md` (2 files,
2 lines of prose changed net): the clause "only a month's heading that has
already received a later month's block above it is closed to further
appends" made a late-swept row's target month literally unrotatable once a
newer month's block existed above it, contradicting the surrounding
append-only / oldest-first / never-split-a-cohort contract. Replaced it in
both `SPEC/plan-filing.md` and the identical mirrored clause in
`.flowtron/PLAN-ARCHIVE.md`'s preamble with: a month heading, once created,
stays open to further appends at its existing position for as long as
`## Completed` exists, regardless of which newer blocks sit above it.
Verification: both old clauses confirmed absent by grep (exit 1). No tests
apply (prose-only SPEC/doc fix); doc-drift sweep found no other AI-referenced
doc restating the rule. `touches:` scope: `SPEC/plan-filing.md` (declared),
`.flowtron/PLAN-ARCHIVE.md` (declared after Discovery, once the mirrored
clause was found). No refactors, no deferred cleanup.

**Archived:** 2026-09-20
