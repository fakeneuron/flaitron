---
title: skill-citation-count-claim
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-492, CORE-535.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flowtron/tasknote/README.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-538 | skill-citation-count-claim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-492]] · [[CORE-535.N]]

## 🎯 Goal

Make the declined-guard evidence in `.flowtron/tasknote/README.md` re-derivable: recover [[CORE-492]]'s citation-counting rule, then either restate the count under it or drop the number while keeping the resolution assertion.

## ✅ Acceptance

- [x] `.flowtron/tasknote/README.md`'s residual-risk paragraph no longer carries a count that cannot be re-derived — either restated under a stated rule or dropped
- [x] The counting rule (citation shape, source scope, target scope, the three normalizations) is recorded at the point of use so the next auditor can re-run it instead of guessing
- [x] The resolution assertion is kept and is true at HEAD, verified by a scan under that rule and recorded in this tasknote
- [x] Wording-only hunk in one file: no new machinery, no validator, no change to the list's membership
- [x] Mirror check: `docs/GLOSSARY.md:13` and `templates/tasknote-README.md` §"AI-referenced docs" confirmed not to restate the count
- [x] `/ft-release` §7.1 Pair K1/K2 greps silent; repo validation set `N/A` by `AGENTS.md` §"Validation" scope (markdown only), with the citation scan substituted

## 🧩 Subtasks

- [x] Reword `.flowtron/tasknote/README.md:78-83` per the branch the operator picks (drop-the-number recommended)
- [x] Record the recovered rule, today's scan figures, and why 63 is unreproducible in Discovery Notes
- [x] Mirror check on `docs/GLOSSARY.md:13` and `templates/tasknote-README.md`
- [x] Pair K1/K2 greps + re-run the citation scan post-edit
- [x] Phase 4: doc-drift sweep, flip PLAN line to stub, archive tasknote

## 🔗 Related

- [[CORE-492]] — related-decision: wrote the paragraph and the "63 citations, zero genuine dangles" evidence on 2026-08-29; the counting rule is in its Discovery Notes, the script is not
- [[CORE-535.N]] — filed this follow-up: a naive `§"…"` count returned 254 and the audit declined to guess at the rule; also fixed the F3 dangle that briefly falsified the claim's truth half
- [[CORE-535.4]] — first flagged the count as stale at its own closure (it moved ~20K bytes of skill body into shared fragments) and left it rather than re-derive by a different method

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The defect is exactly as filed — `.flowtron/tasknote/README.md:81` carries a number nobody can re-derive, and two closures ([[CORE-535.4]], [[CORE-535.N]]) have already declined to touch it for want of the rule. The rule *is* recoverable from [[CORE-492]]'s Discovery Notes (shape, scope, normalizations); the number is not, because the tree it counted no longer exists. Both PLAN-line branches are live; Discovery recommends the second.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: markdown prose only, one paragraph in one file; no code or module boundary in scope. Applicable convention is `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors", handled as the mirror-check subtask. Original text: for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — `touches:` = `.flowtron/tasknote/README.md`; grep over `archive/core/` hits [[CORE-492]] (read in full — the rule lives in its Discovery Notes), [[CORE-535.N]] (follow-up #2 + F3), [[CORE-535.4]] (first stale flag, closure note). [[CORE-491]] / [[CORE-489.N]] named by CORE-492's Related; both concern the exclusion rationale, not the count — not re-read. Findings in Discovery Notes. Original text: skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — `README.md:81` still reads as the PLAN line quotes it. The PLAN line's naive count of 254 is now **255** (one `§"…"` added since CORE-535.N closed) — drift in the same direction as the ticket's point. Neither branch contradicts a SPEC contract; `SPEC/` says nothing about this paragraph. Original text: file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  One AskUserQuestion — the PLAN line's own either/or. Three branches offered: drop the number and state the rule (recommended) / restate with today's SKILL.md-scope count (22) / restate with the fragments-included count (39). **Resolved to: drop the number, state the rule.**

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The rule, recovered.** [[CORE-492]] Discovery Notes state it in one sentence:
*"63 citations of the shape `` `path.md` §"Section" `` run from
`claude/skills/*/SKILL.md` into swept docs."* Three parts — a **shape** (a
backticked path immediately followed by `§"…"`), a **source scope**
(`claude/skills/*/SKILL.md`, monolithic at the time), and a **target scope**
(docs on the `.flowtron/tasknote/README.md` §"AI-referenced docs" list). Its
five recorded misses add the **three normalizations** a resolver needs: strip
the adopter `.flowtron/core/` prefix, accept bold-line and bullet-lead anchors,
strip trailing punctuation inside the closing quote. What is *not* recorded:
the script, and whether `.flowtron/tasknote/README.md` itself (the list-holder,
not a list member) counted as a target — Finding 2's own example cites it, so
probably yes.

**Why 254/255 vs 63.** The naive count matches every `§"…"` in the skill tree.
Under CORE-492's rule that over-counts on three axes: citations into `SPEC/*.md`
lazy modules (~40, non-swept), citations into skill fragments and templated
placeholders (`<SKILL_DIR>/…`, `passes/<domain>.md`), and path-less `§"…"`
(*"the same module's §…"*, `§7.1`, prose mentions). None of those were in
CORE-492's count.

**Why 63 is unreproducible even under the rule.** Scan at HEAD
(`cite-scan.mjs`, scratchpad — rule + three normalizations, not committed):

| Source scope | Path-bearing citations | Into sweep-set docs | Resolve | + `.flowtron/tasknote/README.md` as target |
| --- | --- | --- | --- | --- |
| `claude/skills/*/SKILL.md` (CORE-492's scope) | 79 | **22** | 22/22 (all by heading) | 34 |
| every `.md` under `claude/skills/` (fragments included) | 118 | **39** | 39/39 (37 heading, 1 bullet-lead, 1 bold-line) | 55 |

No scoping choice lands on 63. The reason is not a counting error: [[CORE-535.4]]
moved ~20K bytes of `ft-task` / `ft-epic-discovery` / `ft-micro-task` body into
shared fragments and [[CORE-535.5]] untangled gate prose, so the tree CORE-492
counted is gone. The figure was a point-in-time measurement and the point has
passed. It will pass again at the next skill edit — the same structural
staleness [[CORE-535.N]] flagged for the ledger's `.flowtron/PLAN.md` row.

**What survives.** The *assertion* — every skill-body citation into a swept doc
resolves — is true at HEAD under both scopes, zero misses. The *rule* is worth
writing down at the point of use, because two audits in a row stalled for want
of it. The *number* carries no weight in the argument the paragraph makes: the
guard was declined because all citations resolved (zero genuine dangles) and
because the motivating miss was a falsified claim, not a dangling pointer. "63"
adds nothing to either leg.

**Recommendation → drop the number, state the rule.** Restate the sentence as
a dated finding with the counting shape inline, so the next auditor can re-run
it (and will find a different count, which is fine and expected).

**Mirror survey.** `docs/GLOSSARY.md:13` states the exclusion, no count.
`templates/tasknote-README.md` carries no flowtron-self exclusion paragraph.
`.flowtron/PLAN.md:22` quotes the sentence — it is this task's own line and
flips to stub form at closure. No other surface restates the count (`grep -rn
"63 skill|citations resolve today"` → the README line and the PLAN line only).

**Exit-gate judgment.** Discovery surfaced no significant deviation — the
PLAN line named both branches, the operator picked one inside Discovery, and
the edit stays in the file the line names → skip 🛠️.

**Assumptions.** (a) The scan script stays in the scratchpad, not the repo —
committing it would be the Pair-L guard CORE-492 declined. (b) The restated
sentence carries CORE-492's date, not a rolling "re-verified" stamp — a stamp
invites the ledger-row churn CORE-535.N logged. (c) One paragraph, one file.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the shape [[CORE-492]] set for this paragraph (state the decision, then the evidence that decided it) and the dated-finding idiom `docs/CONTEXT-BUDGET.md` uses for its ledger (*"Measured 2026-09-07 … refreshed by …"*). No new shape.

- [x] **Minimal refactor gate** — no refactor. One hunk, wording-only, +7/−3 in a single file. The list is untouched; no entry added, removed, or re-annotated. The scan script stays in the scratchpad by design (committing it would be the guard CORE-492 declined).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose, no code path. Standing guards for this surface (Pair K1/K2, the citation scan) run in Phase 3.

**Implementation Notes:**

**One edit, `.flowtron/tasknote/README.md:80-87`.** The declined-guard sentence
now reads: *every citation of the shape `` `path.md` §"Section" `` from
`claude/skills/` into a doc on this list resolved when it checked (2026-08-29;
the count is deliberately not restated — it moves with every skill edit, and
that shape is enough to re-run the scan, treating adopter-relative paths and
bold-line or bullet-lead anchors as resolved)*. Four things changed:

1. **"63" is gone**, with the reason for its absence stated inline so the next
   auditor does not read the missing number as an oversight — the same habit
   CORE-492 borrowed from `/ft-release` §7.1's "recorded here so a later reader
   does not read that silence as an oversight".
2. **The rule is stated** — shape, source scope, target scope — in one clause.
3. **The three normalizations** are named in six words, so a re-run does not
   re-discover CORE-492's five false misses.
4. **"resolve today" → "resolved when it checked (2026-08-29)"**: the assertion
   is now a dated finding, not a rolling claim that goes false silently.

The two legs of the argument — zero genuine dangles, and the motivating miss
being claim-falsification rather than citation rot — are untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` by `AGENTS.md` §"Validation" scope (markdown only; `viz/` and `tools/` untouched). Substituted: the citation scan re-run post-edit and `/ft-release` §7.1 Pair K1/K2.

- [x] Ran lint/type-check on changed code — edited lines: no trailing whitespace, all ≤80 columns, LF, GFM-compatible (double-backtick span for the literal single-backtick shape).

- [x] **Quality assertions** — the rule is stated once, at the point of use; mirror survey confirmed no competing copy. No machinery, no membership change, no public-surface growth. `git diff --stat` = 1 deliverable file, +7/−3, single hunk.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Result |
| --- | --- |
| Citation scan, `claude/skills/*/SKILL.md` → sweep-set docs (post-edit) | 22 citations, 22 resolve, 0 misses ✓ |
| Citation scan, every `.md` under `claude/skills/` → sweep-set docs (post-edit) | 39 citations, 39 resolve (37 heading, 1 bullet-lead, 1 bold-line), 0 misses ✓ |
| `/ft-release` §7.1 **Pair K1** (citations resolve to real canonical bullets) | silent ✓ |
| `/ft-release` §7.1 **Pair K2** (point-of-use restatements still name VISION.md) | silent ✓ |
| Skill citations *into* the edited README (`§"AI-referenced docs"` ×16) | heading untouched, all resolve ✓ |
| Edited-line hygiene (trailing ws / >80 cols) | none ✓ |

**Ledger note.** `.flowtron/tasknote/README.md` is a `docs/CONTEXT-BUDGET.md`
§"Always loaded" ledger row (6,559 → 6,849 after this edit, +290). Not refreshed
here: the ledger's own contract says it is refreshed by `/ft-release` §7.1 in
the same cut that reads it, and the README carries no budget cap of its own
(§"Budgets" lists `SPEC.md`, `SPEC/gates.md`, and the skill glob only). Left
for the next cut by design, not omission.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — 18 entries, 18 × no change.** Each entry grepped for
`citation guard` / `citations resolve` / `63 skill` / `CORE-492` /
`residual risk`; zero hits in all 18. The paragraph edited is the canonical
statement, and its only restatement outside the archive was this task's own
PLAN.md line, which flips to stub form at closure. `docs/GLOSSARY.md:13`
(surveyed, not a list entry) states the exclusion without a count — true as
written.

**No ⚠️ superseded-claim pointer written.** [[CORE-492]]'s "63 citations, zero
genuine dangles" was true when measured and is recorded as a dated finding in
its own note; this closure changes what the README asserts going forward, not
whether CORE-492's measurement was correct. [[CORE-535.N]]'s follow-up #2 and
[[CORE-535.4]]'s closure note are both discharged, not overturned.

**Final Summary:**

Recovered [[CORE-492]]'s counting rule and retired the number it produced.

The rule was recoverable — CORE-492's Discovery Notes state it in one sentence
(`` `path.md` §"Section" `` citations, from `claude/skills/*/SKILL.md`, into
docs on the AI-referenced list) and its five recorded false misses supply the
three normalizations a resolver needs. The **number** was not: under that rule
today's tree carries 22 such citations (39 with the fragments [[CORE-535.4]]
extracted), all resolving, and no scoping choice reproduces 63 because the
tree CORE-492 counted no longer exists. The naive 254/255 the ticket cites
over-counts on three axes the rule excludes — `SPEC/` lazy modules, skill
fragments and templated placeholders, and path-less `§"…"`.

The operator chose the PLAN line's second branch. One edit,
`.flowtron/tasknote/README.md`, +7/−3, single wording-only hunk: the sentence
now states the rule (shape, source, target, normalizations) instead of a count,
says why the count is deliberately absent (it moves with every skill edit), and
dates the resolution assertion to CORE-492's check rather than a rolling
"today". Both legs of the declined-guard argument are unchanged.

Verification: citation scan re-run post-edit under both scopes (22/22, 39/39,
zero misses), Pair K1/K2 silent, the 16 skill citations *into* the edited
README still resolve, 18 of 18 sweep entries no change. Repo validation set
`N/A` by scope. Refactors: none; the scan script stays in the scratchpad by
design. The README's ledger row in `docs/CONTEXT-BUDGET.md` is left for the
next release cut per that file's own refresh contract.

Maintainability effect: the next auditor who runs a naive `§"…"` count and gets
a number in the hundreds has the rule in front of them instead of two archived
tasknotes declining to guess at it — the loop this ticket was the third turn of.

**Archived:** 2026-09-07
