---
title: candidacy-rendered-surface
status: completed
tags: [unattended, candidacy]
created: 2026-10-26
due:
related-tasks: [CORE-783.2, CORE-EPIC-812]
touches:
  - SPEC/unattended-candidacy.md
---

# CORE-835 | candidacy-rendered-surface

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-783.2]] · [[CORE-EPIC-812]]

## 🎯 Goal

Make candidacy clause 3's semantic layer name work that changes a rendered surface as needing a person — one sentence, no new keyword — and align the Pin class so it never claims to remove that person, since `--unattended` parks on every 👁️ it would emit and no test decides that ask.

## ✅ Acceptance

- [x] Clause 3's semantic layer gains one sentence naming rendered-surface work as person-shaped and citing the park conversion — `grep -q 'rendered surface' SPEC/unattended-candidacy.md && grep -F -q 'SPEC/gate-postures.md' SPEC/unattended-candidacy.md`
- [x] The keyword list and the CORE-783.2 two-layer wording are unchanged, with no visual or raster keyword added — `grep -F -q '*operator*, *hand-off* / *handoff*, *manual*,' SPEC/unattended-candidacy.md && grep -F -q '*deploy*, *migration*. Two layers.' SPEC/unattended-candidacy.md && grep -q 'A keyword miss is not a semantic pass' SPEC/unattended-candidacy.md && grep -F -q 'do not add visual or raster keywords' SPEC/unattended-candidacy.md`
- [x] The Pin bullet says no test decides the 👁️ on rendered-surface work, so such a row is a split or a stay, never a pin — `awk '/^- \*\*Pin\.\*\*/{p=1} /^- \*\*Split\.\*\*/{p=0} p' SPEC/unattended-candidacy.md | tr -s '\n ' ' ' | grep -q 'rendered surface'`
- [x] The new wording is not copied into a skill body — `! grep -R -q 'rendered surface' claude/skills/ft-seed-unattended claude/skills/ft-file-task`
- [x] Drift checks pass, including context budgets and section citations — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the semantic sentence to clause 3, right after "decline a row that reads as needing a person even when no keyword trips."
- [x] Add the alignment to the Pin bullet, beside its "test command that decides that check" rule.
- [x] Run the acceptance greps and `bash tools/drift-checks.sh`.

## 🔗 Related

- [[CORE-783.2]] — predecessor: pinned clause 3 as two layers (mechanical screen + semantic decline) and forbade new visual/raster keywords
- [[CORE-EPIC-812]] — merged `/ft-prep-unattended` into `/ft-seed-unattended`; owns §"Preparing declined rows"
- [[CORE-797]] — prep dry-run that found the "generic runner is not a deciding test" gap behind the current Pin wording

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is live. `SPEC/gate-postures.md` §"Park conversions" (line 179) parks on *every* 👁️ emission, and whether a change emits one depends on whether it has a rendered surface. Clause 3's semantic layer (`SPEC/unattended-candidacy.md:66-69`) says to decline a row that "reads as needing a person", but it never says rendered-surface work is such a row, so seed marks it. The fleet evidence in the PLAN line (31/80 caobunga parks `visual-confirm`; 3 of the latest 7 were semantic-layer seed marks) is the cost.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (whole), `SPEC/gate-postures.md` §"Park conversions", `claude/skills/ft-task/unattended-mode.md:58`, `SPEC.md:442` (the rendered-surface N/A rule).

- [x] **Best Practices Review** — N/A: a SPEC prose edit with no code or module boundary. The one structural rule is canonical-with-mirrors: clause 3 lives in the module once, and skill bodies must not restate it ([[CORE-783.2]], [[CORE-736]]).

- [x] **Archive skim** — `grep -l unattended-candidacy archive/core/*.md` → ~25 hits. Load-bearing ones: [[CORE-783.2]] pinned the two layers. Its acceptance greps (`A keyword miss is not a semantic pass`, `Two layers`, the unchanged keyword list, `do not add visual or raster keywords`, nothing copied into `claude/skills`) are constraints this edit must keep. [[CORE-797]] found that a generic runner existing (`npm run test:e2e`) does not decide a check; the Pin bullet's "A generic runner that merely exists" sentence came from that. [[CORE-836]] reconciled against this row and found no impact. Area `CORE-*` → `archive/core/` confirmed against the README table.

- [x] **Drift check** — PLAN line matches HEAD. §"Park conversions" exists at `SPEC/gate-postures.md:162` and its 👁️ paragraph says exactly "Whenever Phase 3 would emit a 👁️ ask, the run parks". Clause 3 still names `/ft-seed-unattended` (prep merged into seed by CORE-EPIC-812). The Pin bullet's test-command rule is at lines 203-213. No drift.

- [x] No clarifications needed. Assumptions: (1) the sentence lands in clause 3's semantic layer, after "even when no keyword trips"; it is prose, not a list entry. (2) "Align Pin" means one sentence in the Pin bullet: no test decides the Phase 3 👁️ on rendered-surface work, because the run emits it whatever passes (and gate-postures refuses a passing visual baseline too), so such a row is a split or a stay, never a pin. (3) Stay already covers this through its "true look … where no existing test command decides it" definition, so it is left as is. (4) No skill body changes: seed and the filers Read the module.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

The row's root cause is the gap between two judgments. Candidacy judges the row text. Park conversion judges what the run's work emits. A row like "restyle the plan table header" trips no keyword and might read as mechanical, but its Phase 3 has a rendered surface, so `--unattended` parks it on `visual-confirm` every time. The semantic sentence connects the two. It names the *work* (changes a rendered surface), not words in the row, so it stays a semantic judgment and adds nothing to the mechanical screen.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing shape: clause 3's semantic layer already ends with "decline a row that reads as needing a person"; the new sentence names one such class, following the prose pattern [[CORE-783.2]] set. The Pin addition sits next to the [[CORE-797]] "generic runner does not decide" sentence, which has the same shape (this test-like thing does not decide the check, so it is a split or a stay).

- [x] **Minimal refactor gate** — no refactor. Two sentence insertions; the keyword list, the `[handoff]` short-circuit, and the Stay/Split bullets are untouched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: SPEC prose. The acceptance greps and `bash tools/drift-checks.sh` (Pair Q section citation, context budget) are the checks.

**Implementation Notes:**

`SPEC/unattended-candidacy.md`:

Final wording (after the External review pass):

- **Clause 3 (semantic layer):** "A row whose described work changes a rendered surface reads that way: its Phase 3 👁️ ask is a person's look, and `--unattended` parks on every one (`SPEC/gate-postures.md` §"Park conversions")." This judges the work the row *describes*, which keeps it inside the predicate's "evaluated over the drafted row text" contract. It is a semantic judgment and adds nothing to the mechanical screen.
- **Pin bullet:** "No test decides the Phase 3 👁️ on work that changes a rendered surface (clause 3) — an `--unattended` run asks it whatever passes — so that row is never a pin." This aligns Pin with gate-postures' rule that the 👁️ trigger is the emission condition and that a passing visual baseline does not convert it.
- **Stay bullet (review blocker fix):** the "true look" definition gains "and a rendered-surface change always is one". This overturns Discovery assumption (3): Stay's "where no existing test command decides it" alone left a rendered-surface row that has a Playwright spec unclassified.
- Re-wrapped the two Pin and Stay lines the inserts pushed past the file's width. Their wording is unchanged.

Byte delta: 18,878 → 19,332 (+454). `context_budget` passes. The lazy-module ledger in `docs/CONTEXT-BUDGET.md` is release-refreshed, so it is not edited here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 21/21 pass

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown-only diff; no viz/updater code touched)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (SPEC prose only)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `grep -q 'rendered surface' SPEC/unattended-candidacy.md && grep -F -q 'SPEC/gate-postures.md' SPEC/unattended-candidacy.md` → 0
- `grep -F -q '*operator*, *hand-off* / *handoff*, *manual*,' … && grep -F -q '*deploy*, *migration*. Two layers.' … && grep -q 'A keyword miss is not a semantic pass' … && grep -F -q 'do not add visual or raster keywords' …` → 0
- Pin awk scan, first draft `tr '\n' ' '` → 1. Cause: the phrase wraps across lines (`rendered` / `  surface`), which leaves a run of spaces. The verify command was wrong, not the content. Corrected to `tr -s '\n ' ' '` → 0
- `! grep -R -q 'rendered surface' claude/skills/ft-seed-unattended claude/skills/ft-file-task` → 0
- `bash tools/drift-checks.sh` → 0 (pair_q resolves §"Park conversions"; context_budget ok)
- `node --test tools/drift-checks.test.mjs` → 0 (21 pass)

Re-run from the top after the review blocker fix: c1–c4 → 0, `bash tools/drift-checks.sh` → 0, `node --test tools/drift-checks.test.mjs` → 0 (21 pass).

External review — `/code-review medium` scoped to the working-tree diff of `SPEC/unattended-candidacy.md`. 9 findings:

1. **Blocker, fixed → Phase 2 → Phase 3 re-run.** Stay's "true look … where no existing test command decides it" disagreed with the new Pin rule for a rendered-surface row that has a deciding-looking spec. Stay now says a rendered-surface change always is a true look.
2. Note, no change. Pin's permission to rewrite a 👁️ cue once a deciding test is named still holds for a 👁️ on a check with no rendered surface (a generated file's content). The new sentence narrows it explicitly, with nothing left to contradict.
3. Note, fixed. The predicate is "evaluated over the drafted row text", but the sentence judged the work. Reworded to "a row whose described work changes a rendered surface".
4. Note, fixed. "Every 👁️" was wider than gate-postures' Phase 3 ask. Now reads "its Phase 3 👁️ ask … parks on every one". Provably unchanged output is not "work that changes a rendered surface", so no false negative follows.
5. Note, fixed. The rationale was "parks by construction", which would generalize to every park code. It is now grounded in the person's look.
6. Note, fixed. The Pin sentence now back-references "(clause 3)" rather than restating the park rule uncited.
7. Note, fixed. "The run" had no antecedent and now reads "an `--unattended` run".
8. Note, no change. Splits already require the mechanical row to pass clauses 1–5 as drafted, and clause 3's semantic layer now declines a mechanical row whose described work changes a rendered surface. A slice whose text hides a rendered change is beyond any text predicate, and the conservative default covers the doubt.
9. Note, no change. `docs/CONTEXT-BUDGET.md` lazy-module bytes are re-measured at release (every prior delta there is stamped "Re-measured … at vX"). Per-task edits do not write them, and `context_budget` passes.

Structural: no duplication. The clause-3 sentence lives in the module only, and no skill body restates it (canonical-with-mirrors). No dead text, and no stale cross-references.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every §"AI-referenced docs" entry: no change. `grep -rln "semantic layer|keyword miss|true look"` across docs/, SPEC.md, AGENTS.md, README.md, claude/, codex/ found no mirror of clause 3 or the Pin/Stay wording. The candidacy rule lives only in the module, and no snippet, roster, or platform doc restates it.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. One local lesson: a verify grep over wrapped prose needs `tr -s '\n ' ' '`, not `tr '\n' ' '`. Too narrow for the always-loaded layer.

**Final Summary:**

Candidacy clause 3's semantic layer now names a row whose described work changes a rendered surface as person-shaped, because its Phase 3 👁️ is a person's look and `--unattended` parks on every one. The keyword list is unchanged. Pin now says such a row is never a pin, since no test decides that 👁️, and Stay's "true look" covers it explicitly.

- **Changed:** `SPEC/unattended-candidacy.md` (+454 bytes, three sentence edits).
- **Verification:** 4 acceptance greps → 0; `bash tools/drift-checks.sh` → 0; drift self-test 21/21.
- **Review:** 1 blocker fixed, 5 notes fixed, 3 notes no change (reasons in Testing Notes).
- **Refactors:** none.
- **Doc verdict:** no change.
- **`touches:` reconciliation:** declared `SPEC/unattended-candidacy.md` = changed set (plus workflow files `.flaitron/PLAN.md` and this note).
- **Maintainability:** the rule stays canonical in one module, with no mirror to drift.

**Archived:** 2026-10-26
