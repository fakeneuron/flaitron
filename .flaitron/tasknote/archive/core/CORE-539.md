---
title: release-ledger-refresh-gap
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-537]
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

# CORE-539 | release-ledger-refresh-gap

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-537]]

## 🎯 Goal

Close the gap between `/ft-release` §7.1's measurement command and the
`docs/CONTEXT-BUDGET.md` ledger it claims to refresh — either widen the command
to cover every ledger row, or shrink the ledger to what the command measures.

## ✅ Acceptance

- [x] `/ft-release` §7.1's context-budget check measures every **measurable** row in `docs/CONTEXT-BUDGET.md` §"Ledger" — 45 of 46; `.flowtron/PLAN.md` stays banded and unmeasured per [[CORE-537]]
- [x] Each ledger-refresh command's output maps to exactly one §"Ledger" subsection, so the refresh stays the mechanical substitution the check claims it is
- [x] The **budget-comparison** command still measures exactly the budgeted set (`SPEC.md`, `SPEC/gates.md`, skill bodies) — what the gate blocks on is unchanged
- [x] The two whole-directory totals cited in §"Skill bodies" prose (`ft-release`, `ft-task`) are covered by a command
- [x] No ledger number, budget figure, or "don't measure this row" decision is restated in the checker ([[CORE-465]] derive-don't-count; [[CORE-537]]'s declined edit stays declined)
- [x] Every shipped command run against HEAD; output reproduces each current ledger number or names the drift

## 🧩 Subtasks

- [x] Split §7.1's "Standing context-budget check" measurement into two purposes: keep the existing `wc -c` as the **budget-comparison** command, unchanged
- [x] Add the **ledger-refresh** commands — four, mirroring §"Ledger"'s four subsections one-to-one, plus the two whole-directory totals
- [x] Rewrite the "Refresh the ledger in this cut" paragraph to map each command to its section and leave membership to the doc
- [x] Add a short why-widened note carrying the 21-of-46 measurement, so the next reader cannot re-narrow it by accident
- [x] Run every shipped command against HEAD; verify all 45 measurable rows are covered and diff against the ledger
- [x] Confirm no number or ledger decision was duplicated into the checker; confirm `docs/CONTEXT-BUDGET.md` needs no edit
- [x] `.editorconfig` compliance (LF, no trailing whitespace, final newline)

## 🔗 Related

- [[CORE-537]] — predecessor; surfaced this gap while filing plan-row-ledger-churn

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every claim in the PLAN.md line verified exactly at HEAD (see
  Discovery Notes). The gap is real, currently causing measurable decay, and the
  fix is contained to one checker fragment. Scope unchanged.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Measured the gap at HEAD.** `docs/CONTEXT-BUDGET.md` §"Ledger" has four
subsections totalling **46 rows**: always-loaded 6 · lazy `SPEC/` modules 18 ·
skill bodies 19 · adopter-side 3. §7.1's one measurement command —
`wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md` — reaches **21 files**
(`SPEC.md`, `gates.md`, 19 skill bodies). Every number in the PLAN.md line
checks out exactly: 21 of 46 measured, 25 never refreshed.

**The decay is live, not theoretical.** The ledger is stamped
`Measured 2026-09-07 at v5.24.0` — today. Against that stamp:

| Row | Ledger | HEAD | Drift | Covered? |
|---|---|---|---|---|
| `.flowtron/tasknote/README.md` | 6,559 | 6,849 | **+290** | no |
| `templates/PLAN.md` | 2,736 | 2,801 | **+65** | no |
| `ft-task` whole-dir (prose) | 54,601 | 56,378 | **+1,777** | no |
| `SPEC.md` | 48,771 | 49,002 | +231 | yes |
| `ft-task/SKILL.md` | 27,588 | 28,845 | +1,257 | yes |
| `ft-goal-task/SKILL.md` | 26,176 | 26,497 | +321 | yes |
| `ft-micro-task/SKILL.md` | 18,533 | 18,981 | +448 | yes |

The covered rows drifted too, but they self-correct at the next cut — that is
the ratchet working. The uncovered three cannot self-correct at any cut, which
is the defect. All 18 lazy-module rows and the remaining always-loaded /
adopter-side rows match the ledger exactly today; they are correct by luck
(nothing edited them since `.N`), not by mechanism.

**Verdict on the PLAN line's two options: widen, not shrink.** Shrinking the
ledger to the measured 21 would delete the lazy-`SPEC/` and adopter-side
sections that [[CORE-535.3]] and [[CORE-535.5]] had just built, and would
delete the always-loaded rows that give the section its total — losing real
information to make a stale number go away. Widening costs a handful of extra
`wc -c` lines in a fragment that is loaded once per release cut and is not
itself budgeted.

**Two archive constraints the design must respect** (both from the immediately
preceding cohort, both easy to violate here):

- [[CORE-537]] **explicitly declined** adding a "don't re-measure `.flowtron/PLAN.md`"
  line to §7.1, as duplicating a ledger decision into the checker — the
  two-places-to-drift shape [[CORE-465]] retired a §7.1 check for. So the
  widened command must simply *not name* PLAN.md, with no explanatory comment
  restating why. The doc's own banded row already says it.
- [[CORE-465]]'s "stop counting, start deriving" applies. The two large sets
  stay globs (`SPEC/*.md` + `SPEC/procedures/*.md`, `claude/skills/*/SKILL.md`)
  so a newly shipped module or skill is measured with no edit here. The
  always-loaded and adopter-side sets cannot be derived from the filesystem —
  "what an agent loads to run one task" is a judgment, and `templates/` holds
  10 `.md` files of which only 3 are ledger rows — so those two commands carry
  explicit paths. That is membership the doc already decides; the command
  restates no *number*, which is what §"How this is enforced" actually forbids.

**Design.** Mirror the four §"Ledger" subsections with four commands in the same
order, plus two `find … | wc -c` lines for the whole-directory totals cited in
§"Skill bodies" prose. Each command's output then maps to exactly one section,
making the refresh the mechanical substitution the check already claims to be.
The existing budget-comparison `wc -c` is left byte-identical: it measures
precisely the budgeted set, and widening what the *gate blocks on* is not this
task.

**No glob hazard.** §"Glob-free by design" in the same fragment guards
*unmatched* globs (zsh aborts a loop with `no matches found`). All globs added
here always match inside the repo, and the fragment already carries an §"On the
glob" note licensing exactly this. The two whole-directory totals use `find` on
literal directory paths — no loop, no glob.

**`docs/CONTEXT-BUDGET.md` needs no edit.** The defect is entirely checker-side:
that doc decides, the check measures, and only the measuring half is short.
§"Ledger"'s "Refreshed by `/ft-release` §7.1 in the same cut that reads it" is
written as a standing promise — false for 25 rows today, true for 45 after this
change. One adjacent inaccuracy noted and deliberately left alone: the §"Ledger"
provenance stamp credits [[CORE-535.N]] with re-measuring "every row" while that
tasknote's own summary says 27 rows. It is an archived historical claim (not
rewritable) surfaced through a provenance stamp that the *next* release cut
overwrites with its own date and version — self-liquidating, and out of scope.

**No clarifications needed.** Assumptions asserted: (a) widen beats shrink, per
the reasoning above; (b) `.flowtron/PLAN.md` stays out of the measurement, per
[[CORE-537]]; (c) the budget-comparison command's coverage is deliberate and
stays as-is; (d) the ledger's four-section shape is stable enough to mirror
one-to-one.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**One file changed:** `claude/skills/ft-release/step-7.1-standing-checks.md`
(+58/−9). No code, no other surface — the defect was entirely checker-side.

**Split the check's two purposes.** The single `wc -c` served both the budget
comparison and the ledger refresh while being sized for the first. It stays
**byte-identical** (verified: the diff contains no `+`/`-` line touching it) —
only its lead-in now says "the budgeted surfaces", so the narrower scope reads
as deliberate rather than as the whole story. Four new refresh commands mirror
§"Ledger"'s four subsections one-to-one, plus two `find … | wc -c` lines for the
whole-directory totals that section cites in prose and the `SKILL.md`-only glob
cannot reach.

**Pattern survey.** Extended the established shape rather than inventing one:
this fragment already carries multi-command `sh` blocks with `#` section
comments (installed-surface policy check), a "Why this shape" rationale block
after a rewritten check (wiring-consumer derivation), and a glob-safety note.
The new material uses all three. No new abstraction, no new check — the check
count in `ft-release` SKILL.md §7.1's dispatch enumeration is unchanged, so that
surface needed no edit.

**Derivation over counting** ([[CORE-465]]). The two large sets stay globs
(`SPEC/*.md` + `SPEC/procedures/*.md`, `claude/skills/*/SKILL.md`), so a newly
shipped module or skill is measured with no edit here — and §"On the globs" now
says that is *why* they are globs, not merely that they are safe. The
always-loaded and adopter-side sets carry explicit paths because "what an agent
loads to run one task" is a judgment the filesystem cannot answer (`templates/`
holds 10 `.md` files; 3 are ledger rows). No number is restated: the checker
carries no budget and no current ledger value.

**Honored [[CORE-537]]'s declined edit.** `.flowtron/PLAN.md` is simply absent
from the commands, with no comment explaining its absence. The one sentence that
gestures at it points *outward* — "§'Ledger' says which and why, and this check
does not restate that decision" — so the doc keeps the decision and the checker
keeps none of it.

**Minimal refactor gate.** One rename in the touched block: §"On the glob" →
§"On the globs", now that three globs are in play. Verified nothing cites the
label (it is a bold inline lead, not a heading; repo-wide grep found no external
reference). Deferred, deliberately: `docs/CONTEXT-BUDGET.md` needs no edit —
§"Ledger"'s "Refreshed by `/ft-release` §7.1 in the same cut that reads it" was
written as a standing promise and this change is what makes it true.

**Tests:** none. Markdown-only change to a release-time procedure; the
verification is running the shipped commands, done in Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code). Substituted: ran every shipped command verbatim, below

- [x] Ran lint/type-check on changed code — N/A (markdown). Substituted: `.editorconfig` + fence-balance checks, below

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**All six shipped commands run verbatim from the repository root, all clean.**
Coverage confirmed at **45 of 46 ledger rows** — always-loaded 5 · lazy `SPEC/`
18 · skill bodies 19 · adopter-side 3. The 46th is `.flowtron/PLAN.md`, banded
and deliberately unmeasured per [[CORE-537]]. Before this change: 21.

Each command's output lands in exactly one §"Ledger" subsection, verified by
eye against the doc: the always-loaded command emits its 5 rows in the ledger's
own order, and the two `sort -rn` blocks emit theirs in the descending order the
ledger already presents.

**Drift the widened commands would now catch** (measured at HEAD, against a
ledger stamped `2026-09-07` — the same day):

| Row | Ledger | HEAD | Drift |
|---|---|---|---|
| `.flowtron/tasknote/README.md` | 6,559 | 6,849 | +290 |
| `templates/PLAN.md` | 2,736 | 2,801 | +65 |
| `ft-task` whole-dir | 54,601 | 56,378 | +1,777 |

None of the three was reachable by any cut before this change. The remaining
uncovered rows happen to match the ledger exactly today — correct by luck, not
by mechanism, which is the point.

**Budget command unaffected.** `git diff` contains no `+`/`-` line touching
`wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md | sort -rn`; the budgeted
set and what the gate blocks on are byte-identical to HEAD.

**Whole-dir semantics reproduce.** `find claude/skills/ft-release -type f -exec
cat {} + | wc -c` returned exactly **83,421** against the pre-edit tree — the
ledger's own figure — confirming the command reproduces the intended semantic
rather than a near-miss. Post-edit it reads 85,680, the +2,259 this task added.

**Quality assertions.** No duplication introduced (no budget or ledger number
restated in the checker — grep-verified: the only `wc -c SPEC.md` occurrences in
live files are the two commands in this fragment itself). No dead prose: the
paragraph the new commands displaced was rewritten, not left alongside. No
public-surface growth — the §7.1 check count is unchanged, so `ft-release`
SKILL.md §281's dispatch line ("also refreshes that doc's ledger in this cut")
needed no edit and is now more accurate than it was. Renamed label checked for
external citations (none). No new script, hook, or CI job — `docs/CONVENTIONS.md`
§"Release automation" respected.

**Mechanical checks.** Code fences balanced (20 = 10 pairs). `.editorconfig`:
no trailing whitespace, final byte `0a`, zero CR. `step-7.1-mirror-pairs.md`
carries no pair over this surface (grep-verified), so no mirror obligation.

**Budget impact.** `ft-release/SKILL.md` untouched at 37,369 / 40,000. This
fragment is not a budgeted surface — only `SKILL.md` rows carry caps — and it
loads once per release cut, never alongside a tasknote.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Decision: widen the command.** `/ft-release` §7.1's context-budget check now
carries two measurement halves with different jobs — the original `wc -c` for the
**budget comparison** (byte-identical, still exactly the budgeted set) and four
new commands for the **ledger refresh**, mirroring `docs/CONTEXT-BUDGET.md`
§"Ledger"'s four subsections one-to-one, plus two `find … | wc -c` lines for the
whole-directory totals that section cites in prose.

**Coverage: 21 → 45 of the ledger's 46 rows.** The 46th is `.flowtron/PLAN.md`,
banded and deliberately unmeasured per [[CORE-537]].

**Changed files:** 1 — `claude/skills/ft-release/step-7.1-standing-checks.md`
(+58/−9). No code, no other surface: the ledger decides and the check measures,
and only the measuring half was short, so `docs/CONTEXT-BUDGET.md` needed no
edit at all.

**Why widen rather than shrink.** The PLAN line offered both. Shrinking to the
measured 21 would have deleted the lazy-`SPEC/` and adopter-side sections
[[CORE-535.3]] and [[CORE-535.5]] had just built, plus the always-loaded rows
that give that section its total — losing real information to make a stale
number go away. Widening costs a handful of `wc -c` lines in a fragment loaded
once per release cut and not itself budgeted.

**Verification.** All six shipped commands run verbatim, all clean; coverage
confirmed row-by-row against the doc. Three rows the old command could never
reach were measurably stale against a ledger stamped the *same day*:
`.flowtron/tasknote/README.md` +290, `templates/PLAN.md` +65, `ft-task`
whole-directory total +1,777. The whole-dir command reproduced the ledger's own
`ft-release` figure (83,421) exactly against the pre-edit tree, confirming the
semantic rather than a near-miss. Budget command verified byte-identical by
diff. Fences balanced, `.editorconfig` clean, no mirror-pair obligation.

**Two archive constraints honored, both from the immediately preceding cohort.**
[[CORE-537]] declined adding a "don't re-measure PLAN.md" line here as
duplicating a ledger decision into the checker — so PLAN.md is simply absent,
with no comment, and the one sentence that gestures at the gap points *outward*
at the doc. [[CORE-465]]'s "stop counting, start deriving" — the two large sets
stay globs, so a newly shipped skill or `SPEC/` module is measured with no edit
here; §"On the globs" now records that as the reason they are globs.

**Refactors:** one, in the touched block — §"On the glob" → §"On the globs",
now that three globs are in play; verified uncited elsewhere. One deliberately
declined and recorded: `docs/CONTEXT-BUDGET.md` §"Ledger"'s provenance stamp
credits [[CORE-535.N]] with re-measuring "every row" while that tasknote's own
summary says 27 of 46. It is an archived historical claim surfaced through a
stamp that the next cut overwrites with its own date and version —
self-liquidating, and rewriting archived history to fix it is out of scope.

**Documentation verdict:** doc-drift sweep walked all 18 entries in
`.flowtron/tasknote/README.md` §"AI-referenced docs" — **all "no change."**
`README.md:105` and `AGENTS.md:72` describe the budgets generically and no
budget moved. `docs/CONTEXT-BUDGET.md` is deliberately off that list (its own
closing section says why). `ft-release` SKILL.md:281's dispatch line already
claimed the check "also refreshes that doc's ledger in this cut" — a claim that
was true of 21 rows when written and is true of 45 now, so it needed no edit and
got none.

**Maintainability effect.** The ledger's own standing promise — "if these
numbers are stale, the cut that made them stale skipped its own standing check"
— was false for 25 of its 46 rows and is now true for all 45 it measures. The
failure mode this closes is the quiet one: a stale row in a ratchet doc reads
exactly like a fresh one, so the 25 uncovered rows were decaying without any cut
being able to notice, on the same day an epic audit had "refreshed" them.

**Archived:** 2026-09-07
