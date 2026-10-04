---
title: filing-precheck-race
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/tasknote-selection.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/skills/ft-starter-task/SKILL.md
  - claude/skills/ft-audit/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-563 | filing-precheck-race

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Close the window in `/ft-file-followup` Step 4 where an operator save landing
between the filing-commit pre-check and `git add` is swept into the filing
commit, by verifying what actually got staged before committing.

## ✅ Acceptance

- [x] `SPEC/tasknote-selection.md` §"Filing commits" carries a **post-stage verification** rule beside "Pre-check, then skip on dirt": read `git diff --cached` after staging, every hunk must be one the filing wrote, an unrecognized hunk unstages and skips the commit — `grep -q 'Post-stage verification' SPEC/tasknote-selection.md`
- [x] All four filing runners carry the post-stage verification step in their commit item — `test $(grep -lc 'diff --cached' claude/skills/ft-file-followup/SKILL.md claude/skills/ft-file-followup/park-mode.md claude/skills/ft-starter-task/SKILL.md claude/skills/ft-audit/SKILL.md | wc -l) -eq 4`
- [x] The detection fallback reuses the existing `auto-commit = false` report shape — no new report class, no new gate, no 🏁 — `grep -c 'left uncommitted' SPEC/tasknote-selection.md claude/skills/ft-file-followup/SKILL.md` plus `judgment` (the two-banner cap is a prose invariant no command decides)
- [x] Markdown stays GFM-clean and `.editorconfig`-conformant on the five touched files — `git diff --check`

## 🧩 Subtasks

- [x] Add the **Post-stage verification** rule bullet to `SPEC/tasknote-selection.md` §"Filing commits", immediately after "Pre-check, then skip on dirt", stating why the read *closes* the window rather than narrowing it
- [x] `claude/skills/ft-file-followup/SKILL.md` Step 4 item 4 — verify after `git add`, before `git commit`
- [x] `claude/skills/ft-file-followup/park-mode.md` item 5 — same, two pathspecs
- [x] `claude/skills/ft-starter-task/SKILL.md` Step 5 — same, two pathspecs
- [x] `claude/skills/ft-audit/SKILL.md` §5 step 5 — same, PLAN.md plus inline-fix paths
- [x] Phase 3: run the Acceptance verify commands, record the receipt
- [x] Phase 4: doc-drift sweep, closure, `touches:` reconciliation

## 🔗 Related

- [[CORE-429]] — predecessor: introduced the filing commit, the pre-check, and the placement rule this task extends
- [[CORE-455]] — predecessor: extended §"Filing commits" to `/ft-audit`, adding the fourth runner
- [[CORE-551]] — related-decision: unattended filing authority; holds the guardrails verbatim, so the new rule inherits into that posture unchanged

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [ ] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The race is real and reproducible by inspection — `/ft-file-followup`
  Step 4 reads `git status --porcelain -- .flowtron/PLAN.md` at item 1 and stages with
  `git add .flowtron/PLAN.md` at item 4, with items 2-3 (the append and any confirmed
  reconcile edits) in between. Any write to PLAN.md landing in that span is staged
  unseen under a `chore: file` message. The PLAN line's proposed shape — verify the
  staged diff before committing — is the right one and needs no re-scoping.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**The window, precisely.** Two readings are in play and only one of them is
authoritative. The pre-check reads the *working tree* at item 1; the commit
publishes the *index* at item 4. Between them the filing writes, and so may an
operator's editor autosave, a formatter-on-save, or a concurrent session. Because
`git commit -m` with no pathspec publishes the index as it stands, a write landing
*after* `git add` cannot get in — the exposure is exactly the pre-check → `git add`
span, and nothing else.

That bounding is what makes the fix complete rather than merely narrower. Reading
`git diff --cached` **after** `git add` inspects the very bytes the commit will
publish, so every write that could have slipped in is visible to it. Re-running the
pre-check closer to the stage — the obvious cheaper alternative — only shrinks the
same window; it never closes it, and it would leave the contract asserting a
guarantee it does not deliver. Rejected on that ground.

**Fallback reuses what already exists.** On an unrecognized hunk the filing
unstages its own pathspecs and skips the commit, landing in the `auto-commit = false`
branch the contract has carried since [[CORE-429]]: "say so in one line and leave the
filing for the surrounding commit." No new outcome class, no new report shape, no new
gate, and — per §"Filing commits" — no resolving foreign PLAN dirt on the operator's
behalf. Hunk-level surgery (stage the filing's lines, drop the operator's) was
considered and rejected for exactly that reason: it is the agent silently deciding
what an operator's save meant.

**Archive skim** — 15 notes in `archive/core/` mention `auto-commit` or §"Filing
commits"; the load-bearing ones:

- [[CORE-429]] created the whole guard and, mid-flight, **moved** the pre-check from
  Step 1a pre-flight to immediately before each skill's first write, because every
  filing motion pauses for the operator between those points and a pre-flight reading
  goes stale across that pause. Its Implementation Notes state the placement rule as
  load-bearing "so a later edit doesn't quietly hoist it back to pre-flight."
  CORE-563 is the *residual* of that same fix: correct placement shrank the window to
  agent-only time but did not remove it. **The placement rule must survive this task
  untouched** — the new check is additive and sits after the stage, so it does not
  compete with it.
- [[CORE-455]] added `/ft-audit` as the fourth runner restating the rule, and noted the
  Codex wrapper is pointer-only (no edit).
- [[CORE-551]] added the unattended filing authority, which holds all four guardrails
  "verbatim." The new rule joins that set and inherits unchanged; the posture removes
  the *pause* before the commit, never the *proof* after it — which is precisely what a
  post-stage read is.

**Drift check** — every cited surface still matches. `SPEC/tasknote-selection.md`
§"Filing commits" exists with the "Pre-check, then skip on dirt" bullet intact;
`/ft-file-followup` Step 4 items 1 and 4 read as the PLAN line describes. The same
pre-check/commit pair also lives in `park-mode.md` (items 1, 5),
`/ft-starter-task` (Step 4 opener, Step 5) and `/ft-audit` §5 (steps 2, 5) — so the
PLAN line names one runner but the defect is class-wide across all four. Fixing only
the named one would leave three copies of the race behind, so all four are in scope.
No contradiction with any SPEC contract. `codex/`, `cursor/`, `grok/` carry no copy
(pointer-only wiring); `docs/GLOSSARY.md` and `docs/EXTERNAL-AGENTS.md` mention neither
`auto-commit` nor the pre-check.

**Best Practices Review** — markdown contract + skill prose only, no code. The touched
responsibility is one rule stated in one contract section and restated in four runners
— the existing shape for this family. Extending it is the pattern; a fifth surface or a
new abstraction would not be. Noted for follow-up, not fixed here: **nothing binds the
four runner restatements to the SPEC section.** The pre-check already sits unbound
across all four, and this task adds a second such rule, which is exactly the drift class
`/ft-release` §7.1's mirror pairs exist to close (Pair F is the precedent — five prose
mirrors of one roster). Filing a pair for the §"Filing commits" rule set is its own
tasknote; widening a release gate from inside this one would be scope creep.

**No clarifications needed.** Explicit assumptions: (1) the check runs on every filing
commit, not only when the pre-check read clean — a clean pre-check is precisely the
case that reaches the commit, so it is the only case that needs it; (2) detection
unstages the filing's own pathspecs only (`git restore --staged`), never `git reset
--hard`, and never touches the working tree; (3) the four runners state the rule in
their own established shapes rather than one normalized string, matching how
§"Filing commits" mirrors are maintained elsewhere; (4) no release-gate widening and no
new mirror pair in this task.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** One rule stated once in `SPEC/tasknote-selection.md`
§"Filing commits" and restated in each runner's own established shape is the
existing pattern for this family — [[CORE-429]] set it across three runners,
[[CORE-455]] extended it to the fourth. This task extends it rather than
introducing a shape. The new bullet sits immediately after "Pre-check, then skip
on dirt" so the two halves of one guard read in sequence, and the runner
restatements deliberately differ in wording (each names its own pathspecs and its
own skip-report location) rather than normalizing to one string — which is how
§"Filing commits" mirrors have always been maintained.

**Minimal refactor gate.** No refactor. [[CORE-429]]'s pre-check *placement* rule
is untouched by construction: the new check is additive and sits after `git add`,
so it does not compete for the "immediately before the first write" slot. Deferred
with reason: binding the four runner restatements to the SPEC section with a
`/ft-release` §7.1 mirror pair — real, but a release-gate widening is its own
tasknote, not an in-scope cleanup here.

**What landed.** `SPEC/tasknote-selection.md` gains the **Post-stage
verification** rule bullet, and its §"Unattended filing authority" guardrail
roster grows the new rule so the posture inherits it verbatim. Each of the four
runners gains a `git diff --cached` line in its fenced commit block plus a short
paragraph naming the recognized-hunk set for that motion, the
`git restore --staged` + skip fallback, and where to report it. `/ft-audit` gets
one extra sentence the others do not need: its inline-fix carve-out stages source
paths, which are far likelier than `PLAN.md` to be open in an editor mid-run.
`/ft-file-followup`'s unattended clause picks up the new rule in its
"still binds" list.

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

Markdown + skill prose only; no code, so no test suite and no type-check apply.
`viz/` and `tools/` are untouched — the repo's two runnable suites are out of
scope by construction. Frontend `👁️` box: **N/A**, no UI surface.

**Verification receipt** — each Acceptance criterion's verify command, as run:

| Criterion | Command | Result |
|---|---|---|
| SPEC rule present | `grep -q 'Post-stage verification' SPEC/tasknote-selection.md` | → 0 |
| All four runners wired | `test $(grep -l 'diff --cached' <4 runner paths> \| wc -l) -eq 4` | → 0 (`runners=4`) |
| No new report class | `grep -c 'auto-commit = false' <4 runner paths>` | → 0 (5 / 2 / 4 / 3 — every new fallback routes into the existing branch) |
| No new gate / no 🏁 | `git diff -U0 \| grep -n 'AWAITING APPROVAL\|🏁'` | → 3 hits, **all negative assertions** ("no 🏁"); zero banners added |
| GFM / `.editorconfig` clean | `git diff --check` | → 0 |

**One criterion's command was miscalibrated, and the criterion still holds.** The
"no new report class" line originally paired the `auto-commit = false` grep with
`grep -c 'left uncommitted'` on `SPEC/tasknote-selection.md`, which returned **0**.
That is not a miss: the SPEC states the fallback as prose ("say so in one line and
leave the filing for the surrounding commit"), and the literal string
`left uncommitted` is a *runner-side report shape*, present in
`/ft-file-followup` (1) and `/ft-audit` but never in the contract. The command
asserted a string the file was never supposed to carry. The substantive check is
the one that decided it — every new fallback routes into the pre-existing
`auto-commit = false` branch in all four runners, adding no outcome class.
Recorded rather than quietly rewritten, per the receipt's purpose.

**Context budget.** `claude/skills/*/SKILL.md` is capped at 33,000 chars
(`docs/CONTEXT-BUDGET.md`); after this task `ft-file-followup` is 24,917,
`ft-audit` 22,551, `ft-starter-task` 14,330 — all comfortably under.
`SPEC/tasknote-selection.md` (27,549) carries no budget row: only `gates.md`
among the lazy modules is capped. `park-mode.md` is a lazy fragment and is not
counted against its skill's row. The §"Ledger" byte counts are stale by these
deltas, which is by design — `/ft-release` §7.1 re-measures every row in the cut
that reads it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — all 19 entries in `.flowtron/tasknote/README.md`
§"AI-referenced docs" walked: **no change**. Three carry filing-commit text and
all three survive verbatim — `SPEC.md` §"Deferred hand-off filing" (line 618)
and its §"Tasknote selection" module summary (line 816) are pointer-level and
never enumerate the guardrails; `docs/EXTERNAL-AGENTS.md` step 8 points at
"Unattended filing authority", whose roster was updated **in place**, so the
pointer stays accurate. `SECURITY.md`'s `auto-commit` mention is the 📦
conditional skip rule for *execution* closures — a different mechanism, correctly
untouched. The five files this task edited (`SPEC/*.md`, three `SKILL.md`, one
lazy fragment) sit outside the sweep set by that section's own volume exclusion.

**`touches:` reconciliation** — declared 5 paths, `git diff --name-only` reports
the same 5. No undeclared path; nothing declared went unedited.

**Final Summary:**

Closed the residual race in flowtron's filing-commit guard. `/ft-file-followup`
Step 4 read `git status` at item 1 and staged at item 4, so any PLAN.md write
landing in between — an editor autosave, a format-on-save, a concurrent session —
was staged unseen and published under a `chore: file` message. [[CORE-429]] had
already moved that pre-check as close to the write as it goes; the window that
survived is agent-only time, and placement alone cannot remove it.

The fix reads the staged diff (`git diff --cached`) after `git add` and before
`git commit`, and requires every hunk to be one the filing wrote. Because
`git commit -m` with no pathspec publishes the index as it stands, nothing landing
after the stage can reach the commit — so the exposure is exactly the
pre-check → `git add` span, and the staged diff is the very content the commit
will publish. That makes this **complete**, not merely narrower; re-running the
pre-check nearer the stage was considered and rejected on precisely that ground,
since it would leave the contract asserting a guarantee it does not deliver.

**Scope widened from the PLAN line, deliberately** (the 🛠️ that fired): the line
named `/ft-file-followup` Step 4, but the same pre-check → `git add` pair lives
verbatim in `park-mode.md`, `/ft-starter-task`, and `/ft-audit` §5. Fixing only
the named runner would have left three copies of the race behind.

Changed: 5 files, +58 / −6. `SPEC/tasknote-selection.md` (+1 rule bullet, +1
guardrail-roster line), four runners (+1 `git diff --cached` line and +1
paragraph each). No code, so no suite applies; the four Acceptance verify
commands ran green and the receipt records one miscalibrated command honestly
rather than rewriting it. No refactor. Deferred with reason: nothing binds the
four runner restatements to the SPEC section, and this task adds a *second*
unbound rule to that set — a `/ft-release` §7.1 mirror pair is the right fix and
is its own tasknote.

Maintainability effect: the guard now validates the artifact it actually
publishes rather than a proxy reading of the working tree, and it does so by
routing into the `auto-commit = false` branch that already existed — no new gate,
no new report shape, no 🏁, and no resolving an operator's dirt on their behalf.

**Archived:** 2026-09-10
