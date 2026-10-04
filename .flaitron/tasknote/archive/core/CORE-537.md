---
title: plan-row-ledger-churn
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-535.N]
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

# CORE-537 | plan-row-ledger-churn

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-535.N]]

## 🎯 Goal

Decide and implement what the context-budget ledger should do with its `.flowtron/PLAN.md` row, which — alone among the files it tracks — changes by design at every task closure and so is stale the moment it is written.

## ✅ Acceptance

- [x] The three options in the PLAN.md line are resolved to one, with the two rejected ones recorded with their reason — the deliverable is a decision, not just an edit
- [x] `docs/CONTEXT-BUDGET.md` §"Ledger" → "Always loaded to run one task" no longer carries a falsifiable exact byte count for `.flowtron/PLAN.md`
- [x] A short note under that table states *why* this one row differs, so a future auditor re-measuring the ledger does not "correct" it back to an exact number
- [x] `.flowtron/PLAN.md` stays **unbudgeted** — no row added to §"Budgets", no entry in §"Known over budget"
- [x] No other ledger row, section, or budget is edited by this task
- [x] `claude/skills/ft-release/step-7.1-standing-checks.md` is **not** edited — per the doc's own "every number lives here and is restated nowhere" rule ([[CORE-465]]), the banding decision must not be duplicated into the check
- [x] The §7.1 refresh-coverage gap surfaced in Discovery is logged as a `/ft-file-followup` candidate rather than absorbed here

## 🧩 Subtasks

- [x] Re-read `docs/CONTEXT-BUDGET.md` §"Ledger" framing + the always-loaded table (done in Discovery)
- [x] Replace the `.flowtron/PLAN.md` exact figure with a band
- [x] Add the one-paragraph rationale note under the always-loaded table
- [x] Verify no other row/section changed and `step-7.1-standing-checks.md` is untouched (`git diff --stat`)
- [x] Log the §7.1 refresh-coverage gap as a follow-up candidate in Implementation Notes
- [x] Phase 4 closure: doc-drift sweep, PLAN.md stub flip, archive move

## 🔗 Related

- [[CORE-535.N]] — predecessor; the CORE-EPIC-535 audit that surfaced this ledger row as structurally churn-prone

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The row exists at `docs/CONTEXT-BUDGET.md` §"Ledger" → "Always
  loaded to run one task" and the churn is real and measurable today. The task
  is a bounded contract judgment over one table row, exactly the shape
  [[CORE-535.N]] deferred out of an audit because a factual correction could not
  settle it. No re-scope needed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The row under examination.** `docs/CONTEXT-BUDGET.md` §"Ledger" → "Always
loaded to run one task" lists six surfaces; the last is
`` `.flowtron/PLAN.md` | 2,253 ``. `/ft-task` Step 1 does read PLAN.md in full,
so the row is describing a genuine always-loaded cost — this is not a phantom
entry to delete for being wrong.

**Churn verified empirically.** The ledger stamp reads
`Measured 2026-09-07 at v5.24.0, refreshed by [[CORE-535.N]]` — i.e. refreshed
*today*. Re-measuring at HEAD, before this task changes anything:

| Surface | Ledger | Actual | Δ |
|---|---|---|---|
| `SPEC.md` | 48,771 | 49,002 | +231 |
| `claude/skills/ft-task/SKILL.md` | 27,588 | 28,845 | +1,257 |
| `.flowtron/tasknote/README.md` | 6,559 | 6,849 | +290 |
| `.flowtron/PLAN.md` | 2,253 | 2,258 | +5 |
| `AGENTS.md` | 6,816 | 6,816 | — |
| `templates/tasknote-template.md` | 4,935 | 4,935 | — |

Four of six rows are stale on the day of refresh (`CORE-536` and `CORE-538`
landed after `CORE-535.N` measured). This sharpens the finding rather than
weakening it — **the PLAN.md row is not uniquely stale, it is uniquely stale
*without teaching anything***:

- `SPEC.md` drifting +231 is *signal*. Some task deliberately grew the
  always-loaded contract, and the release check is supposed to catch it. The
  number is a ratchet.
- `.flowtron/PLAN.md` drifting +5 is *noise*. Nothing edited PLAN.md as a
  deliverable — closure itself rewrites a line on every single task, whatever
  the task was about. Re-measuring reports how many tasks happen to be open
  today, which is a fact about workload, not about the size of what flowtron
  ships.

**Why the row can never be budgeted.** The doc's own opening frames the whole
mechanism as "a promise flowtron makes about the size of the files it ships."
Flowtron does not ship `.flowtron/PLAN.md` to anyone — an adopter gets
`templates/PLAN.md` (already measured separately at 2,736 under §"Adopter-side
always-loaded") and then grows their own. So this row measures (a) a file
flowtron does not ship, whose size is (b) a function of open-task count, not
design. That is exactly why §"Budgets" has no row for it and never could.

**Drift check.**
- Paths in the task description all resolve at HEAD; the row is where the
  description says it is.
- ⚠️ One factual drift in the PLAN.md line itself: it says "unlike the other
  **26** rows". The ledger actually carries **46** rows across its four
  sections (6 always-loaded + 18 lazy `SPEC/` modules + 19 skill bodies +
  3 adopter-side), so "the other 45". The count is wrong but not load-bearing —
  the claim it supports ("alone among them it tracks a file that changes by
  design") holds, and I verified it by inspection: every other tracked surface
  is a spec, doc, skill body, or template that changes only when a task
  deliberately edits it. Recording the correction rather than propagating the
  number.
- The plan formed below contradicts no SPEC contract. `SPEC/scope-boundaries.md`
  and the doc's own §"How this is enforced" both bear on it; see the §7.1
  finding below.

**§7.1 refresh-coverage gap (out of scope — follow-up candidate).**
`claude/skills/ft-release/step-7.1-standing-checks.md:117` measures with:

```sh
wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md | sort -rn
```

then instructs "Refresh the ledger in this cut … Update both from the `wc -c`
output above." But that command covers only the *budgeted* surfaces plus the
skill bodies. It does not measure `AGENTS.md`, `.flowtron/tasknote/README.md`,
`templates/tasknote-template.md`, `.flowtron/PLAN.md`, any of the 18 lazy
`SPEC/` modules, or the three adopter-side rows — 25 of the ledger's 46 rows.
`AGENTS.md` (6,840 → 6,816) and `ft-stats` were refreshed by hand at
[[CORE-535.N]], which is consistent with the command not covering them. That is
a real defect in the refresh instruction, but it is a different decision from
this one and would widen a `[light]` Low task into rewriting a release gate.
Logged for `/ft-file-followup` at closure.

**Options considered.**

1. **Drop the row.** Rejected. `/ft-task` genuinely loads PLAN.md, so removing
   it makes the always-loaded section understate its own total and invites the
   next reader to re-add it as an oversight. It also leaves no place to record
   *why* it was dropped.
2. **Mark it refreshed-only-at-release.** Rejected as insufficient on its own.
   The §"Ledger" stamp already declares the whole table release-refreshed
   ("if these numbers are stale, the cut that made them stale skipped its own
   standing check"), so this option adds no new guarantee — and it would make a
   promise §7.1 does not currently keep, since the release command does not
   measure PLAN.md at all (gap above). It would also be false in spirit: the row
   is stale *between* closures, not merely between releases.
3. **Replace with an order-of-magnitude band.** ✅ Chosen. Keeps the
   always-loaded set complete and its total honest, removes a figure that is
   falsifiable on every commit and informative on none, costs nothing at release
   (there is nothing to re-measure), and is the only option that generalizes to
   adopters, whose PLAN.md is their own file at their own size.

**No clarifications needed.** Explicit assumptions: (1) the deliverable is a
decision recorded in `docs/CONTEXT-BUDGET.md`, not a mechanism change;
(2) the band belongs in the ledger table itself, not in a new section;
(3) per [[CORE-465]]'s "stop counting, start deriving" and the doc's own "every
number lives here and is restated nowhere", the decision is written **only** in
`docs/CONTEXT-BUDGET.md` and not mirrored into `step-7.1-standing-checks.md`;
(4) the other five always-loaded rows keep exact figures and this task does not
refresh them — that is the release cut's job.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**One row banded, one note added, one file touched.**
`docs/CONTEXT-BUDGET.md` §"Ledger" → "Always loaded to run one task":

```diff
-| `.flowtron/PLAN.md` | 2,253 |
+| `.flowtron/PLAN.md` | ~2–3k (band — see below) |
```

followed by a two-paragraph note under the table. The first paragraph carries
the *reason* (every other row drifts as signal; this one drifts as noise, and
measures a file flowtron does not ship). The second is an explicit
do-not-"fix"-this instruction naming both rejected options, so the next auditor
who re-measures the ledger reads why the band is deliberate instead of
correcting it back into churn — the exact failure mode `docs/CONTEXT-BUDGET.md`
§"Why byte budgets" says killed the [[CORE-EPIC-223]] split ("the ~40,000 figure
survived only as an oral working number").

**Pattern survey.** Extended the doc's established shape rather than inventing
one: §"Budgets" already carries a per-row "Why this number" column, §"Precedence"
and §"Not budgeted, deliberately" are both bold-lead rationale paragraphs
attached to the table they qualify, and §"Not on the doc-drift sweep list" is a
whole section arguing a deliberate omission. A banded row with an attached
bold-lead rationale is that same shape, one section down.

**Minimal refactor gate.** No refactor. `git diff --stat` = 1 file, +19/−1.

**Deliberately not edited: `claude/skills/ft-release/step-7.1-standing-checks.md`.**
Adding "don't re-measure the PLAN.md row" to the release check would restate a
ledger decision inside the checker — precisely the two-places-to-drift shape
[[CORE-465]] retired a §7.1 check for, and precisely what
`docs/CONTEXT-BUDGET.md` §"How this is enforced" forbids ("The check measures;
this doc decides… A budget duplicated into the check would drift from the budget
written here"). It also needs no edit to be correct: the check's `wc -c` command
never measured `.flowtron/PLAN.md` in the first place.

### Logged as a `/ft-file-followup` candidate (not fixed here)

**The §7.1 ledger-refresh instruction over-promises its own coverage.**
`step-7.1-standing-checks.md:117` measures
`wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md`, then line 136 instructs
"Refresh the ledger in this cut… Update both from the `wc -c` output above."
That output covers 21 of the ledger's 46 rows. It cannot refresh `AGENTS.md`,
`.flowtron/tasknote/README.md`, `templates/tasknote-template.md`,
`.flowtron/PLAN.md`, the 18 lazy `SPEC/` modules, or the 3 adopter-side rows.
Evidence it is already biting: measured at HEAD *on the same day*
[[CORE-535.N]] refreshed the ledger, `.flowtron/tasknote/README.md` is
6,559 → 6,849 (+290) — a surface the release command does not touch, drifted
by nearly 5%. The fix is a wider `wc -c` list, but choosing it is a change to a
release gate and belongs in its own task, not folded into a `[light]` decision
about one row.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**No test suite applies** — the change is prose and one table cell in a
`docs/` markdown file. No code, no `viz/` surface, no `tools/` surface, so
`npm --prefix viz test` and `node --test tools/update-adopters.test.mjs` are
`N/A` (nothing they cover was touched).

**Lint / hygiene on the changed file** — `.editorconfig` compliance verified
directly:
- no trailing whitespace (`grep -nP '[ \t]+$'` → none)
- final newline present (`tail -c1 | xxd` → `0a`)
- UTF-8, LF (`file` → "Unicode text, UTF-8 text"); the en-dash in `~2–3k` and
  the `—` in the note are consistent with the doc's existing punctuation
- GFM-compatible: an unchanged pipe table plus two ordinary paragraphs

**Quality assertions** — no duplication introduced (the decision is stated in
exactly one place, and Implementation Notes records the §7.1 non-edit that keeps
it that way); no dead content; no public-surface growth (no new section, no new
budget row); no stale code-facing documentation (grep confirms `2,253` is
restated nowhere in the repo outside this tasknote, and every external reference
to `docs/CONTEXT-BUDGET.md` — `AGENTS.md:72`, `README.md:105`,
`claude/AGENTS-snippet.md:56`, `ft-audit-context/SKILL.md:31`, `ft-release`
§7.1 + `SKILL.md:281` — describes it generically or points at §"Budgets", none
names the ledger's PLAN.md row).

**Scope verified** — `git diff --stat` → `docs/CONTEXT-BUDGET.md | 20 ++-`,
1 file changed, 19 insertions, 1 deletion. `step-7.1-standing-checks.md` absent
from the diff, as Acceptance requires.

**👁️ visual confirmation: N/A** — no frontend surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Decision: band the row.** `docs/CONTEXT-BUDGET.md` §"Ledger" → "Always loaded
to run one task" now reads `` `.flowtron/PLAN.md` | ~2–3k (band — see below) ``
instead of a `wc -c` figure, with a two-paragraph note stating why and
instructing future auditors not to "correct" it back.

**Changed files:** 1 — `docs/CONTEXT-BUDGET.md` (+19/−1). No code.

**Why the band beat the other two options.** The row measures a file that is
(a) rewritten by *every* closure regardless of the task, and (b) not shipped by
flowtron at all — adopters get `templates/PLAN.md` and grow their own. So its
exact size reports open-task count, never design. *Dropping* it was rejected
because `/ft-task` really does load PLAN.md, and a missing row makes the
always-loaded total understate itself and invites re-adding. *Marking it
release-refreshed* was rejected because the §"Ledger" stamp already says that of
every row — and it would promise something `/ft-release` §7.1 does not deliver,
since its `wc -c` command never measured PLAN.md.

**Verification.** `git diff --stat` → 1 file, +19/−1, with
`step-7.1-standing-checks.md` absent as Acceptance requires. `.editorconfig`
checks pass (no trailing whitespace, final `0a`, UTF-8/LF). Repo-wide grep
confirms `2,253` was restated nowhere, and all six external references to
`docs/CONTEXT-BUDGET.md` point at §"Budgets" or describe it generically — none
names this row, so nothing else drifted.

**Refactors:** none made. One deliberately *declined* and recorded: adding a
"don't re-measure this row" line to `/ft-release` §7.1 would duplicate a ledger
decision into the checker — the two-places-to-drift shape [[CORE-465]] retired a
§7.1 check for, and what the doc's own §"How this is enforced" forbids.

**Documentation verdict:** doc-drift sweep walked all 19 entries in
`.flowtron/tasknote/README.md` §"AI-referenced docs" — **all "no change."**
`docs/CONTEXT-BUDGET.md` is deliberately off that list (its own closing section
says why), and this edit changes no budget, so `AGENTS.md:72`'s "per-file byte
budgets, enforced at release" and `README.md:105`'s summary both stay accurate.

**Deferred (filed as follow-up):** `/ft-release` §7.1's refresh instruction
over-promises — its `wc -c` command reaches 21 of the ledger's 46 rows, so 25
rows silently never refresh. Measured proof at HEAD on the same day the ledger
was refreshed: `.flowtron/tasknote/README.md` 6,559 → 6,849 (+290). Widening a
release gate is its own task.

**Maintainability effect:** removes a ledger figure that was wrong within hours
of every refresh and could never be right, converting a standing source of
false-drift noise — and of pointless "fix" commits by auditors who spot the
mismatch — into a stable claim that carries its own rationale. Also corrects the
PLAN.md line's "other 26 rows" (the ledger has 46) rather than propagating it.

**Archived:** 2026-09-07
