---
title: harness-survey-v2
status: completed
tags: [docs, research]
created: 2026-09-22
due:
related-tasks: [CORE-655, CORE-656, CORE-657, CORE-658, CORE-659, CORE-660, CORE-661, CORE-662, CORE-664, CORE-665, FE-124]
touches:
  - docs/HARNESS-SURVEY.md
---

# CORE-663 | harness-survey-v2

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-655]] · [[CORE-656]] · [[CORE-661]]

## 🎯 Goal

Append a dated second, wider-net pass to `docs/HARNESS-SURVEY.md` that covers
the first pass's §"Not examined" list from primary sources, adds adoption
velocity, records one clone-and-read trial per family, and re-ranks gaps and
overkill against what CORE-655…665 actually landed.

## ✅ Acceptance

- [x] A new `## 2026-09-22 — second pass (wider net)` section is appended after the first pass; the first pass is not rewritten — `git diff docs/HARNESS-SURVEY.md` shows additions only below line 101 (`judgment` on the diff read)
- [x] Every product/tracker/practice in the first pass's §"Not examined" list is covered or explicitly marked skipped with a reason — `judgment` (checklist cross-read)
- [x] Sources are primary (vendor docs, repos, READMEs, changelogs); any comparison-blog citation is flagged as such — `judgment`
- [x] Star/commit velocity recorded for open-source products, with the date and command/source — `grep -q "velocity" docs/HARNESS-SURVEY.md`
- [x] One clone-and-read trial per family recorded, or N/A with a reason (closed products) — `judgment`
- [x] Gaps and overkill re-ranked with each first-pass item's disposition stated (landed / parked / still open) against CORE-655…665 — `judgment`
- [x] Candidate follow-up rows presented to the operator; only kept rows filed in `.flowtron/PLAN.md` — `judgment` (operator answer: none filed — "document and rest"; recorded in the survey §"Filing")
- [x] `docs/HARNESS-SURVEY.md` has a final newline and the CI context-budget check still passes — `tail -c1 docs/HARNESS-SURVEY.md | xxd -p` → `0a`; budget check if the doc is budgeted

## 🧩 Subtasks

- [x] Fan out 5 research probes by family (primary docs + `gh` velocity + clone-and-read in scratchpad)
- [x] Distill returns; cross-check any claim that would change a ranking
- [x] Re-read `SPEC.md` + `docs/VISION.md` touchpoints needed for ranking
- [x] Draft the second-pass section (landscape delta, velocity table, trials, first-pass disposition, re-ranked gaps/overkill, not-examined-next, sources)
- [x] Present candidate rows; file the kept ones
- [x] Verify Acceptance

## 🔗 Related

- [[CORE-655]] … [[CORE-662]], [[FE-124]] — first-pass follow-ups (`b39eb024`)
- [[CORE-664]], [[CORE-665]] — landed in the same window; [[CORE-660]] still parked (`blocked`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The first pass explicitly left a seed list and admitted its sources were comparison blogs; the follow-ups it filed have now mostly landed, so a re-rank is due and has something concrete to rank against.

- [x] Read relevant source files — `docs/HARNESS-SURVEY.md` (101 lines, full); research itself isolated in probes (Phase 2)

- [x] **Best Practices Review** — N/A: doc-only append, no code or module boundary.

- [x] **Archive skim** — `archive/core/` (confirmed against README table; 878 notes). `grep -l HARNESS-SURVEY` hits: CORE-655, 656, 658, 659, 661, 662. Read Final Summaries of those plus 657, 664, 665. Load-bearing: gap #1 evaluator → landed as Phase 3 External review (656); gap #2 push-memory → Phase 4 Learnings box (658); gap #3 ready view → FE-124 viz toggle; overkill #1 gate prose → 659 dropped two triggers, 660 parked (decay window 1 run deep); overkill #2 incident history → 657 De-scoped (already extracted; remainder load-bearing), headroom recovered via 664; overkill #4 budget cells → 662 (23,244 → 20,224); subtractive force → 661 audit pass 6; caobunga headings → 655.

- [x] **Drift check** — PLAN line cites `docs/HARNESS-SURVEY.md` §"Not examined" (present, line 81) and CORE-655…662 (all closed except 660, parked). No SPEC contract touched; doc's own header says passes append, not rewrite — plan conforms.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — Operator answers 2026-09-22: trials = **shallow clone + read** into session scratchpad (no installs, no running third-party agents); filing = **propose, operator picks**; breadth = **parallel research subagents** by family.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Families for the probes: (1) spec-first / task decomposition — Kiro, Tessl,
Conductor (Gemini CLI), Taskmaster AI; (2) cloud / async agents — Devin,
Codex cloud, Jules, Copilot coding agent, OpenAI Symphony (verify); (3) IDE/CLI
memory & rules — Cursor plan mode + rules, Cline memory bank, Aider
conventions, Amp; (4) trackers & orchestrators — Backlog.md, tkr, claude-flow
(+ beads re-check); (5) practices + first-pass velocity — Karpathy LLM-wiki,
Ralph loop, "boil the lake", star/commit velocity for first-pass products,
Anthropic plugin-marketplace install counts.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose-only doc append

**Implementation Notes:**

Extended the doc's own pattern: a dated `##` pass appended below the first,
same sub-headings where they apply (Landscape, Gaps, Overkill, Not examined,
Sources) plus pass-specific ones (Practices, Hands-on trials, Velocity,
First-pass disposition, Filing). No refactor; first pass untouched.

Five general-purpose probes (spec-first, cloud/async, IDE/CLI memory,
trackers, practices+velocity) ran in parallel; clones only in the session
scratchpad. Probe "gap" claims cross-checked against the contract before
ranking — five turned out already covered (park-reason codes, interrupted-run
resume, `## 🔄 Handoff`, module load lines, Drift check) and are recorded as
"not gaps". Operator asked for critical additions / token savers; answer: none
critical; token savers already in flight (CORE-660) or low-yield → no rows.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code

- [x] Ran lint/type-check on changed code — N/A: no code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipts:
- `git diff docs/HARNESS-SURVEY.md | grep -c '^-[^-]'` → 0 (additions only)
- `tail -c1 docs/HARNESS-SURVEY.md | xxd -p` → `0a`
- `grep -q velocity docs/HARNESS-SURVEY.md` → exit 0
- `grep -n HARNESS-SURVEY docs/CONTEXT-BUDGET.md .github/workflows/ci.yml` → no hits (doc unbudgeted; no CI budget check applies)
- Judgment criteria (coverage, primary sources, trials, dispositions) graded by the external review below.

External review (general-purpose subagent, non-authoring context, graded
against Acceptance + fact-checked every flowtron self-claim against the repo):
- **blocker** — velocity command as recorded caps at 100 but four rows report
  >100 (probes used `--paginate`). Fixed: command note now states the
  `--paginate` sum for those rows. Criterion re-checked → pass.
- **note** — "every `SPEC/` module opens with a 'Loaded by' line" wrong as
  quoted (10/21 say "Read when…"). Fixed: now "a 'Lazy-loaded SPEC module'
  line naming its load trigger".
- **note** — flowtron ★ 0 reads like an error. Fixed: "self; public, unpromoted".
- **note** — `/ft-release` mirror pairs still no row. Not filed: operator chose
  no rows this pass.
- Self-found on re-read: "17 products and practices" → "17 products and 3 practices".

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? N/A — the one method lesson (probe "gaps" must be checked against the contract before ranking) is survey-specific and now lives in the survey itself

**Final Summary:**

Appended `## 2026-09-22 — second pass (wider net)` to `docs/HARNESS-SURVEY.md`
(+~150 lines, 0 deleted; first pass untouched). It covers all 17 products and
3 practices the first pass left unexamined, from primary sources only. It
records one clone-and-read trial per family (Conductor, Symphony + Codex,
Cline, Backlog.md, Anthropic's ralph-loop plugin), a 20-row star/commit
velocity table plus official-marketplace install counts, and a disposition
for every first-pass item.

Headline findings: the evaluator, push-memory, and ready-view gaps have all
landed. Symphony, Backlog.md and the IDE vendors' own evolution
independently converge on flowtron's shapes: park-with-reason, deny-by-default
unattended, a fail-closed ready rule, lazy scoped rules over read-everything
memory. Spec-ceremony leaders are pivoting or dormant, which argues against
growing `--deep`. Re-ranked open gaps: enforcement-hook recipes, a
loop-cycle-from-disk clause, operator corrections feeding Learnings, and
criterion-level receipts. Five probe-proposed gaps were already covered and
are recorded as such.

Filing: none. Operator asked for critical additions or token savers; none are
critical, and the token savers are already in flight (CORE-660) or low-yield.
External review: 1 blocker (velocity command wording) and 3 notes, all fixed
or dispositioned. `touches:` reconciliation: declared `docs/HARNESS-SURVEY.md`;
diff = that file + this tasknote + PLAN.md (workflow files). No undeclared
paths. Doc-drift sweep: no change to any AI-referenced doc (survey-only,
no contract text touched).

**Archived:** 2026-09-22
