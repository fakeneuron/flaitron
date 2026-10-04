---
title: acceptance-verify-receipt
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-556]
touches:
  - SPEC.md
  - templates/tasknote-template.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-goal-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-557 | acceptance-verify-receipt

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-556]]

## 🎯 Goal

Make Phase 3 verification observable in `/ft-task`: require every non-visual `## ✅ Acceptance` criterion to name a machine-checkable verify command, and replace the self-ticked **Quality assertions** box with a command / exit-code / first-failure-line receipt recorded in Testing Notes — net-neutral on context budget.

## ✅ Acceptance

- [x] `SPEC.md` §"🧪 Phase 3" states the verify-command rule — `grep -q 'The verify-command rule' SPEC.md`
- [x] `SPEC.md` §"🧪 Phase 3" replaces the **Quality assertions** box with a folded **Verification receipt** box that keeps the structural assertions — `grep -q 'Verification receipt' SPEC.md && ! grep -q 'Quality assertions' SPEC.md`
- [x] `SPEC.md` §"Tasknote body shape" Acceptance bullet points at the rule — `grep -q 'verify command' SPEC.md`
- [x] `templates/tasknote-template.md` ships the folded box and a verify-command hint on Acceptance — `grep -q 'Verification receipt' templates/tasknote-template.md && ! grep -q 'Quality assertions' templates/tasknote-template.md`
- [x] All three Phase 3 SKILL restatements name the receipt — `grep -lq 'Verification receipt' claude/skills/ft-{task,goal-task,micro-task}/SKILL.md` (run per file)
- [x] `/ft-task` Step 4 carries the Acceptance verify-command imperative — `grep -q 'verify command' claude/skills/ft-task/SKILL.md`
- [x] No new `SPEC/` module was added — `test $(ls SPEC/*.md | wc -l) -eq 16`
- [x] `SPEC.md` stays under its 57,000-char budget — `test $(wc -c < SPEC.md) -lt 57000`
- [x] `claude/skills/ft-task/SKILL.md` stays under its 33,000-char budget — `test $(wc -c < claude/skills/ft-task/SKILL.md) -lt 33000`
- [x] Markdown renders correctly on GitHub (nested fences, table integrity) — judgment; read the diff

## 🧩 Subtasks

- [x] `SPEC.md` §"Tasknote body shape" — extend the **✅ Acceptance** bullet with the verify-command pointer
- [x] `SPEC.md` §"🧪 Phase 3" — replace the **Quality assertions** checklist box with the folded **Verification receipt** box
- [x] `SPEC.md` §"🧪 Phase 3" — replace the Quality-Assertions paragraph with **The verify-command rule** + **The receipt** prose (incl. the worked receipt block)
- [x] `templates/tasknote-template.md` — Acceptance placeholders gain the verify-command hint; Phase 3 box swapped to match SPEC
- [x] `claude/skills/ft-task/SKILL.md` — Step 4 gains the Acceptance verify-command imperative; Step 5 Phase 3 bullet names the receipt
- [x] `claude/skills/ft-goal-task/SKILL.md` — Step 5 verify bullet names the receipt; Step 4 rule para notes `/ft-task` now carries the weaker form
- [x] `claude/skills/ft-micro-task/SKILL.md` — Step 3 prose names the receipt in place of the bare quality assertions
- [x] Re-measure `wc -c` on `SPEC.md` + `claude/skills/ft-task/SKILL.md` against `docs/CONTEXT-BUDGET.md`
- [x] Run the Acceptance verify commands and record the receipt in Testing Notes (dogfood)

## 🔗 Related

- [[CORE-362.1]] — related-decision: settled that the clean-code contract lives in always-loaded `SPEC.md`, not a lazy module ("do not hide it in a lazy module"), and rejected a validator / scorecard / new phase. Governs both the no-split call and the fold.
- [[CORE-362.2]] — related-decision: authored the **Quality assertions** box this task folds into the receipt.
- [[CORE-EPIC-556]] — related-decision: the release-skill headroom epic whose budget ceilings this task is checked against (`docs/CONTEXT-BUDGET.md`).
- [[CORE-558.5]] — related-decision: set the current 57,000 / 33,000 ceilings this task must land under.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two named surfaces exist verbatim and the problem is live —
  Phase 3's third box is self-ticked prose today, and nothing in the tasknote
  records whether the gates behind it ran. Scope is unchanged; the PLAN line's
  one *speculative* clause (a `SPEC/` split) is answered below by a settled
  contract rather than re-scoped away.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Source read.** `SPEC.md` §"🧪 Phase 3" (L479–497) holds the four-box checklist
plus a Quality-Assertions paragraph; §"Tasknote body shape" holds the **✅
Acceptance** bullet. `templates/tasknote-template.md` L85 mirrors box 3. The
"four copies" the PLAN line names are really one canon (SPEC) + one template +
three *prose restatements* of differing shape — `ft-task` L184, `ft-goal-task`
L161, `ft-micro-task` L116 — not four literal copies of the box.
`/ft-goal-task`'s verify-command rule lives at its Step 4 (SKILL L110–124).

**Best Practices Review.** Markdown contract work; no module boundaries. The
governing structure is canon-plus-restatement: `SPEC.md` states the rule once
and the three SKILLs point at it in their own register. Extending that shape is
the pattern survey's answer — adding a fifth home (a `SPEC/` module) would
invert it. No refactor required; no cleanup deferred.

**Archive skim.** `grep -l` over `.flowtron/tasknote/archive/core/` for
`quality assertion` returned >20 hits, nearly all of them notes merely *filling*
their own Phase 3 box. Narrowing to authorship found the real edges:

- [[CORE-362.1]] (v5.14.0 Discovery) — inventoried this exact surface and
  **rejected a new lazy module, audit mode, schema, phase, validator, or
  scorecard**, choosing "one canonical checklist inside the existing four
  phases." Its surface table is explicit: *"`SPEC.md` four-phase workflow —
  canonical home for guidance that should affect every normal task; do not hide
  it in a lazy module."*
- [[CORE-362.2]] — authored the **Quality assertions** box and the
  evidence-not-scorecard framing now folded into the receipt.
- [[CORE-372]] — shipped both as v5.14.0's clean-code contract.
- `docs/CONTEXT-BUDGET.md` — `SPEC.md` cap 57,000 (measured 53,631, **3,369
  headroom**); `claude/skills/*/SKILL.md` cap 33,000 (`ft-task` 29,692,
  **3,308 headroom**). The doc records a substantial `SPEC.md` edit as
  +1,127…+2,957, so one edit fits and a second would not. It also warns that a
  lazy module which starts arriving on most tasks earns a budget row — which is
  what a `SPEC/verification.md` would immediately become.

**Drift check.** Paths, section names, and line numbers in the PLAN line all
match current files. One **cross-artifact drift**, surfaced to the operator
before any edit: the PLAN line floats splitting the rule into `SPEC/` as
"cheaper than four edits", which reverses the contract [[CORE-362.1]] settled
above. Operator confirmed **no split — edit in place**. Two further asks
resolved at the same time (see Clarifications).

**Clarifications** (AskUserQuestion, three answered):

1. **Rule strength** → *command where one exists*. Every Acceptance criterion
   names a verify command when one is machine-checkable (a `grep -q` on a
   contract file counts); a criterion no command decides marks itself
   `judgment` / `👁️` with a one-line reason. Deliberately weaker than
   `/ft-goal-task`'s: there the union of commands **is** the loop's termination
   condition, so every criterion must carry one; here contract and doc tasks are
   ordinary work, and `/ft-goal-task` already routes all-taste tasks *back* to
   `/ft-task` — a strict lift would close that exit off.
2. **Quality-assertions fate** → *fold both into one box*. Box count stays at
   four (net-neutral, as the PLAN asks) while [[CORE-362.2]]'s structural check
   survives. A straight cut would have dropped the dead-code / complexity /
   public-surface / stale-docs half, which Phase 2's Minimal Refactor Gate
   covers only partially (it reaches duplication, responsibility, and dependency
   direction — not the other four).
3. **`SPEC/` split** → *no split*, per the drift finding above.

**Assumptions carried into Phase 2.** The receipt format is
`command → exit code`, plus the first line of failure output when non-zero —
plain text in Testing Notes, no table, no schema, and nothing parses it. This
keeps [[CORE-362.1]]'s no-validator/no-scorecard line intact: the receipt is
*evidence*, and the assistant remains the validator.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** The governing shape here is *canon plus restatement*:
`SPEC.md` states a contract once, `templates/tasknote-template.md` ships the box
it produces, and each runner restates it in its own register. Extended that
shape rather than introducing a fifth home. Confirmed
`SPEC/procedures/ft-task.md` L370 already *delegates* Phase 3 to `SPEC.md`
rather than restating it, so the agent-neutral SOP needed no edit — the "four
copies" the PLAN line describes are one canon + one template + three prose
restatements of differing shape, not four literal copies.

**Minimal refactor gate.** No refactor. Five markdown files, +37/-11 lines, each
edit tracing to a named Acceptance criterion.

**What landed.**

- `SPEC.md` §"Tasknote body shape" — the **✅ Acceptance** bullet now names the
  verify command as part of Phase 1 population and points at §"🧪 Phase 3".
- `SPEC.md` §"🧪 Phase 3" — box 3 becomes **Verification receipt**, carrying
  both halves; the Quality-Assertions paragraph is replaced by **The
  verify-command rule** + **The receipt**, the latter with a worked
  `command → exit code` block showing a non-zero case with its first failure
  line. The no-scorecard/no-validator sentence [[CORE-362.2]] wrote survives in
  the folded prose, and a new "nothing parses it" line guards the receipt
  against becoming the validator [[CORE-362.1]] refused.
- `templates/tasknote-template.md` — Acceptance placeholders now model the rule,
  so the scaffold teaches the shape instead of a doc having to; Phase 3 box
  swapped to match SPEC exactly.
- `claude/skills/ft-task/SKILL.md` — Step 4 gains the Acceptance imperative
  beside the existing Subtasks one; Step 5's Phase 3 bullet names the receipt.
- `claude/skills/ft-goal-task/SKILL.md` — Step 5 verify bullet names the receipt
  and localizes it (`## 🔁 Iterations` per cycle, Testing Notes for the
  converged set); Step 4 gains a **Relationship to `/ft-task`'s rule** note so
  the now-two-strength rule cannot read as a contradiction, pointing a task that
  fails the strict form at the existing all-taste edge case.
- `claude/skills/ft-micro-task/SKILL.md` — Step 3 prose names the receipt and
  routes it to the **Implementation** bold-prefix, since micro-tasknotes have no
  Testing Notes section. Verified against `templates/tasknote-micro-template.md`:
  it has no `## ✅ Acceptance` section either, so the verify-command rule
  correctly does not reach micro-tasks — only the receipt does.

**No tests added.** Markdown contract change; flowtron ships no markdown
validator by design (Core Principle #2, Zero scripts) and the Acceptance
commands are the test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Verification receipt** — the eleven Acceptance verify commands, dogfooding the
box this task introduces:

```text
grep -q 'The verify-command rule' SPEC.md                                   -> 0
grep -q 'Verification receipt' SPEC.md && ! grep -q 'Quality assertions' .. -> 0
grep -q 'verify command' SPEC.md                                            -> 0
grep -q 'Verification receipt' templates/.. && ! grep -q 'Quality asser..'  -> 0
grep -q 'Verification receipt' claude/skills/ft-task/SKILL.md               -> 0
grep -q 'Verification receipt' claude/skills/ft-goal-task/SKILL.md          -> 0
grep -q 'Verification receipt' claude/skills/ft-micro-task/SKILL.md         -> 0
grep -q 'verify command' claude/skills/ft-task/SKILL.md                     -> 0
test $(ls SPEC/*.md | wc -l) -eq 16                                         -> 0
test $(wc -c < SPEC.md) -lt 57000                                           -> 0
test $(wc -c < claude/skills/ft-task/SKILL.md) -lt 33000                    -> 0
```

No non-zero exits, so no failure lines to record.

**Targeted suite / lint.** `N/A` — five markdown files, no code touched. Per
`AGENTS.md` §"Validation" the viz and updater suites cover `viz/` and `tools/`;
neither is in `touches:`, and running them would be broader than the change.
GitHub fence balance checked instead — even count in all five files; the new
`text` block in `SPEC.md` is top-level, not nested.

**👁️ visual confirmation.** `N/A` — no frontend surface.

**Budget (`docs/CONTEXT-BUDGET.md`).**

| Surface | Before | After | Delta | Cap | Headroom |
|---|---|---|---|---|---|
| `SPEC.md` | 53,631 | 55,018 | +1,387 | 57,000 | 1,982 |
| `claude/skills/ft-task/SKILL.md` | 29,692 | 30,269 | +577 | 33,000 | 2,731 |
| `templates/tasknote-template.md` | 5,150 | 5,381 | +231 | — | — |

Both budgeted surfaces stay under cap. The `SPEC.md` delta sits at the low end
of the doc's measured +1,127…+2,957 band for a substantial contract edit, and
the prose was trimmed once mid-execution (-59) specifically to protect headroom.
Worth flagging for whoever cuts the next release: 1,982 chars is under one
working unit — the same shape of squeeze [[CORE-555]] and [[CORE-558.5]] each
corrected by raising a ceiling. Not this task's call to make, and not over
budget today.

**Structural quality assertions** (the folded half, read from the actual diff):
no duplication introduced — the rule has exactly one canonical statement and
three pointers; no dead text left behind (`grep -i 'quality assertion'` returns
only the three intentional restatements plus the `docs/VERSION-HISTORY.md`
v5.14.0 entry, a historical record correctly untouched); no unexplained
complexity; no public-surface growth — Phase 3 box count is unchanged at four
and no `SPEC/` module was added; no stale code-facing documentation (sweep
below).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs",
18 entries walked:

- `SPEC.md` — **updated** by this task (§"Tasknote body shape" Acceptance
  bullet; §"🧪 Phase 3" box + prose).
- `README.md` · `AGENTS.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` ·
  `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` ·
  `grok/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` ·
  `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` ·
  `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` ·
  `docs/WORKTREES.md` · `docs/VISION.md` — **no change.** Grepped rather than
  assumed: the eight that mention "Phase 3" do so for the `--debug` re-verify,
  the `--unattended` 👁️ conversion, CI placement, or a section-name roster —
  none restates the Phase 3 checklist boxes. `docs/CONVENTIONS.md` L113
  summarizes Phase 3 as "targeted tests, lint and type-check on changed code,
  optional visual confirmation" and already omitted the third box, so it is not
  made stale.
- `docs/CONTEXT-BUDGET.md` is deliberately **not** on this list (its own
  §"Not on the doc-drift sweep list"); its numbers are owned by `/ft-release`
  and were read, not written, here.

**Final Summary:** `/ft-task` Phase 3 now produces evidence instead of a
self-tick. Two changes, one box: `## ✅ Acceptance` criteria name the **verify
command** that decides them where one exists (`judgment` / `👁️` with a reason
where none does), and Phase 3's third box became **Verification receipt** —
`command -> exit code`, plus the first failure line when non-zero, written into
Testing Notes. Five markdown files, +37/-11 lines: `SPEC.md` (canon),
`templates/tasknote-template.md` (the box + Acceptance placeholders that now
model the rule), and one-line Phase 3 restatements in `ft-task`, `ft-goal-task`,
`ft-micro-task`.

Two operator decisions shaped it away from the literal PLAN text, both taken at
Phase 1 with the evidence in hand. **The Quality assertions box was folded, not
cut** — a straight cut would have paid for the receipt by deleting
[[CORE-362.2]]'s dead-code / complexity / public-surface / stale-docs check,
which Phase 2's Minimal Refactor Gate covers only partially; folding both into
one box keeps the PLAN's net-neutral box count *and* the clean-code contract.
**No `SPEC/` module was created** — the PLAN floated a split as "cheaper than
four edits", but [[CORE-362.1]] settled the opposite for this exact surface
("do not hide it in a lazy module"), and `docs/CONTEXT-BUDGET.md` warns that a
lazy module arriving on most tasks earns a budget row anyway. The drift was
surfaced before any edit and the operator confirmed edit-in-place.

Verification: 11/11 Acceptance verify commands exit 0, recorded as a receipt in
Testing Notes — this tasknote is the first artifact in the new shape. `N/A` on
the viz/updater suites and on 👁️ (markdown only, no frontend). Budget:
`SPEC.md` 53,631 → 55,018 against a 57,000 cap; `ft-task` 29,692 → 30,269
against 33,000 — both under, with the `SPEC.md` headroom (1,982) flagged above
as worth a release-time look. `touches:` reconciliation: declared five paths;
`git diff --name-only` shows exactly those five plus this tasknote and
`.flowtron/PLAN.md`, the two closure artifacts every task writes. No undeclared
paths. Refactors: none made, none deferred. Maintainability effect: whether an
agent ran its Phase 3 gates is now readable from the tasknote rather than
inferred from a tick — the gap `NAT-225` routed upstream.

**Archived:** 2026-09-10
