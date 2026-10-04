---
title: spec-incident-history
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-042.4, CORE-393]
---

# CORE-657 | spec-incident-history

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-042.4]] [[CORE-393]]

## 🎯 Goal

Move incident rationale and "why we rejected X" prose out of `SPEC.md` into
`docs/PHILOSOPHY.md` (or archive pointers), leaving every rule and section
heading verbatim, to recover byte headroom under `docs/CONTEXT-BUDGET.md`.

## ✅ Acceptance

- [ ] Incident rationale removed from `SPEC.md` and landed in `docs/PHILOSOPHY.md` — `git diff --stat SPEC.md docs/PHILOSOPHY.md` — **N/A — De-scoped: the prose is not in `SPEC.md` (Finding 1) and what remains is a guardrail (Finding 3)**
- [ ] Every rule and `## `/`### ` heading in `SPEC.md` byte-identical — `judgment` (diff read; no command decides "rule preserved") — **N/A — De-scoped: `SPEC.md` is unedited, so every heading is trivially byte-identical**
- [ ] `SPEC.md` recovers ≥ one working unit (1,127–2,957 chars) of headroom under the 53,000 cap — `wc -c SPEC.md` — **not met — unreachable by this mechanism (Finding 4); re-filed as CORE-664**

## 🧩 Subtasks

- [ ] Inventory the incident-rationale sites in `SPEC.md`
- [ ] Measure their byte weight against the headroom target
- [ ] Classify each as history vs. load-bearing guardrail against the archive record
- [ ] Move the history; leave the guardrails

## 🔗 Related

- [[CORE-042.4]] — nav-chip incident cited in SPEC.md rationale prose
- [[CORE-393]] — incident cited in SPEC.md rationale prose

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** De-scope
  **Rationale:** The row's two named targets have both evaporated. The
  "why we rejected X" prose already left `SPEC.md` — `SPEC/gate-discipline.md`
  §"Refused carve-outs" and `SPEC/scope-boundaries.md` own it, and `SPEC.md`
  keeps only pointers. What remains of the nav-chip incident material is
  **422 bytes across four sites**, of which 355 are the anti-misreading
  hardening [[CORE-393]] shipped on purpose; moving them regresses a shipped
  fix. Even moving all 422 leaves `SPEC.md` at 2,398 chars of headroom —
  still under one working unit, so the stated payoff is unreachable by this
  mechanism.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Read set.** `SPEC.md` (full, 51,024 b), `docs/PHILOSOPHY.md` (6,775 b),
`docs/CONTEXT-BUDGET.md` (budget rows + cold-start ledger),
`docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers",
`.flowtron/tasknote/README.md` §"AI-referenced docs", and the section
inventories of `SPEC/gate-discipline.md` + `SPEC/scope-boundaries.md`.

**Finding 1 — the "why we rejected X" half is already discharged.** The row
asks to move rejection rationale out of `SPEC.md`. It is not there. Two prior
extractions already own it: `SPEC/gate-discipline.md` §"Refused carve-outs"
(16,077 b, lazy) and `SPEC/scope-boundaries.md` §"What flowtron does NOT
provide" + §"PR / suggestion archetypes flowtron does not accept" (5,371 b,
lazy). `SPEC.md` retains only the pointers at L353-354, L683, and L846. A
rejection-language grep over `SPEC.md` returns no prose block, only those
pointers and the incident citations in Finding 2.

**Finding 2 — the nav-chip incident material is 422 bytes, four sites.**
Measured:

```text
  68 b  L260-262  "(CORE-042.4, SPEC v0.8.0: three closure status writes cut to two)"
 107 b  L271      "Reading the list as license … the misreading behind CORE-042.5 and CORE-393."
 167 b  L404-406  "Judgment alone let CORE-393 — a ticket to undo the contract CORE-042.4 …"
  80 b  L651-653  "CORE-042.4 retired that write deliberately (three status writes → two), and"
 422 b  TOTAL
```

**Finding 3 — 355 of those 422 bytes are a shipped hardening, not an
anecdote.** `archive/core/CORE-393.md` states it outright: the nav-chip
passage "has twice been misread into proposing a nav-chip flip" ([[CORE-042.5]]
and [[CORE-389.N]]), and CORE-393 shipped **as a hardening instead of a
reversal** — "the bullet now leads with the carve-out, the value list is
demoted and explicitly labelled *not a list of writes closure should
perform*, and Phase 4 itself carries a blockquote answering the question where
a scanning agent actually looks." Sites L271, L404-406, and L651-653 are
exactly those three devices. Moving them to `docs/PHILOSOPHY.md` — which
`.flowtron/tasknote/README.md` §"AI-referenced docs" excludes from the sweep
set as "history (nothing live mirrors it)" — would remove the deterrent from
the surface the misreading agent reads, and would be the fourth pass at the
same clause. Only the 68-byte L260-262 parenthetical is pure history.

**Finding 4 — the stated payoff is unreachable by this mechanism.**
`SPEC.md` is 51,024 b against the 53,000 cap: **1,976 b headroom**, ≈0.7 of
the 1,127–2,957 b working unit `docs/CONTEXT-BUDGET.md` measures for a
substantial edit here. Moving all 422 b (including the three guardrails)
yields 2,398 b — still under one unit, against the doc's own ~2-unit
standard. Moving only the safe 68 b yields 2,044 b, which is inside
single-digit release drift.

**Finding 5 — the budget pressure itself is real.** [[CORE-607]] left
`SPEC.md` at 47,265 b under a deliberately lowered 53,000 cap (5,735 b ≈ 2
units). Nine releases later it has grown to 51,024. So the row's *motivation*
is sound and the next extraction is a genuine need; its *named mechanism* is
not the one that can supply the bytes. The precedent that can is CORE-607's:
lift a substantial section wholesale into a lazy `SPEC/` module, leave a stub
at the heading so cross-file citations still resolve, and add a budget row.
Candidate sections by weight, none analyzed further here: §"🧪 Phase 3"
external-review rationale, §"Task-line format"'s segment table,
§"Paper-complete guard".

**Drift check.** Section headings are unchanged by this verdict, so the
`docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" rows citing
`SPEC.md` §"Task-line format" / §"Tasknote frontmatter" / §"Task ID
convention" / §"Tasknote body shape" / §"Paper-complete guard" stay resolved —
this is the constraint the row's own parenthetical flagged. No stable-surface
row moves, renames, or retires, so no caller-side filing is owed.

**Best Practices Review.** `N/A` — no code or module boundary in scope; the
verdict edits no source.

**No clarifications needed (--fast).** Assumptions asserted: (a) a 68-byte
move is below the skip threshold in `SPEC/tasknote-selection.md` and is not
worth a tasknote on its own; (b) regressing CORE-393's hardening to recover
355 bytes is not a trade the operator wants; (c) the headroom need is better
served by a separately filed CORE-607-style extraction than by re-scoping this
row onto a mechanism it does not name.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [ ] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Phase 2 did not run. `De-scope` jumps from the Phase 1 verdict straight to
Phase 4 closure (`SPEC.md` §"📝 Phase 1: Discovery"), so the four boxes above
are correctly unticked — no code or contract was edited by this task.

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [ ] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [ ] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Phase 3 did not run, for the same reason Phase 2 did not. `N/A` on every box:
there is no diff to test, lint, or grade — the closure diff is `PLAN.md` plus
this tasknote's archive move, the workflow-only shape `SPEC.md`
§"Paper-complete guard" §2 carves out.

The Discovery measurements are nonetheless reproducible, and are the evidence
the verdict rests on:

```text
wc -c SPEC.md                                    → 51024   (cap 53,000; headroom 1,976)
wc -c SPEC/gate-discipline.md                    → 16077   (owns §"Refused carve-outs")
wc -c SPEC/scope-boundaries.md                   →  5371   (owns the scope rejections)
grep -c 'CORE-042\.4\|CORE-393' SPEC.md          →     5   (5 lines / 4 sites; L404-405 wraps)
```

**External review** — `N/A`: no deliverable diff exists to grade. The one
adversarial read that mattered here happened inside Discovery instead, against
the archive record: `archive/core/CORE-393.md` contradicted the row's premise
that the nav-chip passages are anecdotes, and that contradiction is what
produced the verdict rather than a reviewer's finding after the fact.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep** — all 18 entries in `.flowtron/tasknote/README.md`
§"AI-referenced docs": **no change**. A De-scope edits no contract surface, so
nothing any of them mirrors moved. Named explicitly because the row's own
parenthetical flagged it: `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for
callers" — no change; no `SPEC.md` section heading moved, renamed, or retired,
so no stable-surface row shifted and no caller-side filing is owed.

**Learnings** — yes, one line, and it is already carried. The always-loaded
layer does not need a new rule: `SPEC.md` §"📝 Phase 1: Discovery" already
says the drift check is "a **cross-reference, not a judgment call**," and this
task is simply that clause working. Worth recording where it lands rather than
restating it: the PLAN.md row was filed against a premise that two earlier
tasks had already falsified, and only opening `CORE-393.md` surfaced it.
`N/A` for an `AGENTS.md` edit.

**Final Summary:**

De-scoped. The row asked to move incident rationale and "why we rejected X"
prose out of `SPEC.md` to recover byte headroom; Discovery found the first
half already gone, the second half load-bearing, and the payoff unreachable
either way.

The rejection prose left `SPEC.md` in earlier extractions —
`SPEC/gate-discipline.md` §"Refused carve-outs" (16,077 b) and
`SPEC/scope-boundaries.md` (5,371 b) own it, and `SPEC.md` keeps only
pointers. What remains is 422 b of nav-chip incident citation across four
sites, and 355 b of that is not anecdote but the anti-misreading hardening
[[CORE-393]] shipped deliberately after the same clause was misread twice
([[CORE-042.5]], then [[CORE-389.N]]): the carve-out-first bullet, the demoted
value list labelled "not a list of writes closure should perform," and the
Phase 4 blockquote. Moving those into `docs/PHILOSOPHY.md` — which
`.flowtron/tasknote/README.md` excludes from the drift-sweep set as history
"nothing live mirrors" — would have deleted the deterrent from the surface the
misreading agent actually reads, and made this the fourth pass at the clause.
Only the 68-byte `(CORE-042.4, SPEC v0.8.0: …)` parenthetical is pure history,
which is below the tasknote skip threshold on its own.

The motivation was sound and survives the De-scope. [[CORE-607]] left
`SPEC.md` at 47,265 b under a deliberately lowered 53,000 cap — 5,735 b, about
two working units. It has since grown to 51,024 b, leaving 1,976 b, roughly
0.7 of the 1,127–2,957 b unit `docs/CONTEXT-BUDGET.md` measures for a
substantial edit here. Moving all 422 b would reach 2,398 b and still miss one
unit. So the need was re-filed as **CORE-664**, naming the mechanism that has
the bytes — CORE-607's recipe of lifting one substantial section wholesale
into a lazy `SPEC/` module behind a stub, with a budget row to match.

- Files: 2 workflow paths — `.flowtron/PLAN.md` (CORE-657 → Completed stub; CORE-664 filed under `## High`) and this tasknote's archive move. No contract, doc, or code surface edited; `SPEC.md` byte-identical.
- Verification: Discovery receipts in Testing Notes. `wc -c SPEC.md` → 51024, unchanged across the task.
- Refactors: none — Phases 2 and 3 did not run, per the De-scope path.
- Documentation verdict: 18 "no change" / 0 updated.
- `touches:` reconciliation: `N/A — no file deliverable` (De-scope; the exempt shape in `SPEC.md` §"Tasknote frontmatter"). The two paths changed are this task's own PLAN row and tasknote, both excluded from the reconciliation by construction.
- Maintainability effect: a shipped guardrail against a three-time recurring misread stays on the always-loaded surface, and the real budget pressure moves from a row that could not relieve it to one that can.

unattended-candidates: none

The CORE-664 filing was drafted under `--fast` (implied by this row's own
`[unattended]` marker), so there was no operator act to write the token on
(`SPEC.md` §"`[unattended]` candidacy"). The predicate declines it anyway: the
row's whole content is a judgment about *which* section to lift, which is the
shape `SPEC/unattended-candidacy.md` biases against dispatching unwatched.

**Archived:** 2026-09-22
