---
title: skills-cite-dont-restate
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-EPIC-535, CORE-535.1, CORE-535.3]
blocked-by:
  - CORE-535.3
---

# CORE-535.4 | skills-cite-dont-restate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

Collapse the eight restated contract spans in `ft-task`, `ft-micro-task`, and
`ft-epic-discovery` to one-line citations of their canonical SPEC homes,
keeping every skill-specific imperative intact.

## ✅ Acceptance

- [x] All eight `CORE-535.1` §E1 restated spans collapsed to one-line citations of their canonical homes, across `ft-task`, `ft-micro-task`, and `ft-epic-discovery`
- [x] Every skill-specific imperative survives — each branch, flag interaction, literal marker string, and operational instruction still present and still executable from the skill body alone
- [x] `claude/skills/ft-task/SKILL.md` under the 30,000-char budget in `docs/CONTEXT-BUDGET.md`
- [x] `ft-micro-task` and `ft-epic-discovery` both shrink and stay under 30,000
- [ ] **not met** — combined reduction is **−10,941**, not ≈20,000. `CORE-535.1` §E1's per-span figures measure total span size, not the duplicated fraction; realized harvest averaged ~44% (78% on span 1, 30% on span 6). Closing the gap would have required deleting skill-specific imperatives. Detail in Implementation Notes
- [x] Every citation resolves — the named section exists under that exact heading in the named file
- [x] `docs/CONTEXT-BUDGET.md`: the `ft-task` row deleted from §"Known over budget" (self-liquidating exemption), and the three skill numbers refreshed in the Ledger

## 🧩 Subtasks

- [x] Span 8 — 🎯 purpose-blurb bounds → `SPEC/purpose-blurb.md` (ft-task, ft-micro-task); keep the emission recipe, drop the bounds prose
- [x] Span 2 — Step 1.5 model-gate branch list → `SPEC/model.md` §"Category-vs-concrete matching" (ft-task, ft-micro-task); keep branch→action dispatch, drop tier explanations
- [x] Span 6 — Phase 1→2 exit-gate case lists → `SPEC/gates.md` §"Phase 1→2 exit gate" (ft-task, ft-epic-discovery); keep the flavor declaration + marker + unattended park
- [x] Span 5 — downstream-impact scan → `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" (ft-task, ft-epic-discovery); keep trigger point, two-banner-cap note, `--fast`/`--unattended` behavior
- [x] Span 4 — Phase 4 closure mega-bullet → SPEC §"🚀 Phase 4: Closure" (ft-task); keep auto-run + no-banner-here + recap-bundles-into-📦
- [x] Span 7 — conditional-skip branches + flag overrides → `SPEC/gates.md` §"Conditional skip rule" (all three); keep each skill's branch-local shape (📦 vs 🟢 GO) and marker examples
- [x] Span 3 — suggest-next-move / re-read-PLAN block → SPEC §"Post-closure protocol" step 2 (all three)
- [x] Span 1 — copy-paste helper paragraph → SPEC §"Post-closure protocol" step 3 (all three)
- [x] Verify every citation target resolves; re-read each edited step cold for executability
- [x] Measure with `wc -c`; update `docs/CONTEXT-BUDGET.md` (drop the ft-task over-budget row, refresh the ledger)

## 🔗 Related

- [[CORE-EPIC-535]] — parent epic (context-load-diet)
- [[CORE-535.1]] — epic Discovery; named the eight restated spans
- [[CORE-535.3]] — predecessor (`blocked-by:`); split SPEC core into lazy modules

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The eight spans, their canonical homes, and the ≈20k target all
  verified at HEAD; the budget row naming this task as owner is live. Scope is
  exactly as filed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Source of the eight spans

`CORE-535.1` §E1 enumerated them with canonical homes and ≈char counts
(measured 2026-09-06). Re-verified at HEAD; line refs there predate
[[CORE-535.3]]'s split, so homes were re-resolved against current headings:

| # | Span | Canonical home (verified at HEAD) | Skills |
|---|---|---|---|
| 1 | Copy-paste helper ¶ | `SPEC.md` §"Post-closure protocol" step 3 | all three |
| 2 | Model-gate branch list | `SPEC/model.md` §"Category-vs-concrete matching" | ft-task, ft-micro-task |
| 3 | Suggest-next-move / re-read PLAN | `SPEC.md` §"Post-closure protocol" step 2 | all three |
| 4 | Phase 4 closure mega-bullet | `SPEC.md` §"🚀 Phase 4: Closure" | ft-task |
| 5 | Downstream-impact scan | `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" | ft-task, ft-epic-discovery |
| 6 | Exit-gate skip/fire case lists | `SPEC/gates.md` §"Phase 1→2 exit gate" | ft-task, ft-epic-discovery |
| 7 | Conditional-skip + flag overrides | `SPEC/gates.md` §"Conditional skip rule" | all three |
| 8 | 🎯 purpose-blurb bounds | `SPEC/purpose-blurb.md` | ft-task, ft-micro-task |

Each home was read in full and confirmed to carry what the skills restate.
Span 8's module goes further and *names* the division: "the emission recipe
lives in the three ID-invoked runner skills, which cite this module rather
than restating it" — so the recipe stays in the skill and the bounds go.
Span 5's module ends the same way ("see each skill's own steps for where the
scan fires"). Both confirm the intended split rather than merely permitting it.

### B. What a citation may not absorb

The trim line is **contract vs. mechanics**. A citation may replace an
explanation of *why* a rule holds or a restatement of *what* it says. It may
not replace: a branch the skill must take, a literal marker or banner string
the skill must emit, a file the skill must Read, a flag interaction that
differs per skill, or a step-number reference into that skill's own flow.

### C. Prior art

- [[CORE-038]] — the pattern precedent on this same file (−503w over Steps
  3b / 4 / 6). It **deliberately left the Step 1.5 model gate restated**
  ("hot path; restated for safety"). [[CORE-535.1]] put it back in scope with
  heavier analysis. Resolution: honor the newer decision but keep exactly what
  "safety" meant — the branch→action dispatch (which files to Read, which
  branch to follow, the `--unattended` pre-scaffold stop) stays verbatim; only
  the tier-ladder explanation and its examples, which `SPEC/model.md` carries
  in a fuller table, are cited away.
- [[CORE-039]] — the same sweep on SPEC.md (−596w over nine sites).
- [[CORE-049]] — the audit that filed the [[CORE-050]] / [[CORE-051]] /
  [[CORE-052]] siblings; recorded ft-task as "already trimmed, re-growth is
  intentional contract content". It has since grown to 33,940.
- [[CORE-507]] §2.5 — "splitting a body into fragments defers load; it does
  not remove it." Restated in `docs/CONTEXT-BUDGET.md`. This task therefore
  **deletes** duplicated text; it does not move it into new fragments.

### D. Budget and target

`docs/CONTEXT-BUDGET.md` (written by [[CORE-535.2]]) caps
`claude/skills/*/SKILL.md` at 30,000 chars and lists `ft-task` (33,940) under
§"Known over budget" with **this task as its owner** — so closure must delete
that row, which is how the exemption self-liquidates. Baseline at HEAD:

| File | Chars | Budget |
|---|---|---|
| `ft-task/SKILL.md` | 33,940 | 30,000 (over by 3,940) |
| `ft-epic-discovery/SKILL.md` | 28,186 | 30,000 |
| `ft-micro-task/SKILL.md` | 21,265 | 30,000 |
| **total** | **83,391** | target ≈63,000 |

### E. Drift check

- All eight spans exist at HEAD; every canonical home resolves under the exact
  heading cited. Two homes moved in [[CORE-535.3]] and the citations reflect
  the new addresses: the 🎯 blurb's bounds are now `SPEC/purpose-blurb.md`
  (SPEC.md keeps a dispatch stub at §"🎯 Purpose blurb"), and §"Skill
  namespace" now lives in `SPEC/layout.md`.
- `.claude/skills/*` in this repo are **symlinks** into `claude/skills/`, so a
  single edit propagates; no hardlink pairs to keep in sync (the
  [[CORE-038]]-era hardlink shape is gone).
- No `/ft-release` §7.1 mirror-pair check binds any of the eight spans across
  files. Pair F guards the *skill roster* in `CLAUDE.md`/`AGENTS-snippet.md`,
  not skill bodies; Pair J guards `argument-hint:` flag rosters. No flag, step
  name, or roster entry changes here, so no pair is disturbed.
- `SPEC/procedures/ft-task.md` declares `source: claude/skills/ft-task/` and
  `last-verified: v5.21.0`. It **routes** rather than restates, so its content
  stays correct; per `SPEC/procedures/README.md` the stamp is "flagged at
  release, never bumped by it," and bumping it means re-checking a 29.6k SOP.
  Explicit non-goal — left stale for the release gate to flag honestly.

### F. Clarifications

No clarifications needed. Explicit assumptions:

1. "Eight spans" is [[CORE-535.1]] §E1's list exactly — the named runners-up
   (foreign-dirt gate, archive-skim recipe, Step 0 layout resolution) are
   **out of scope**; each is an operational recipe, not a restated contract,
   and the PLAN line names eight.
2. Behavior is preserved exactly. This is a documentation-density change, not
   a contract change — no rule is added, removed, or altered, so no SPEC edit
   and no version bump belongs to this task.
3. `docs/CONTEXT-BUDGET.md` is edited (over-budget row + ledger) because that
   doc names this task as the row's owner. It is deliberately not on the
   doc-drift sweep list, so the sweep will read "not a member," not "no change."

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown-prose edits, no executable surface

**Implementation Notes:**

Eight spans, three files, two passes. Every collapse replaced *explanation* with
a pointer and kept every branch, literal marker, fragment Read, and per-skill
flag interaction — the contract-vs-mechanics line from Discovery §B.

| Span | Where | Cut (chars) |
|---|---|---|
| 1 copy-paste helper | all three | ~3,160 |
| 2 model gate | ft-task, ft-micro-task | ~1,650 |
| 3 suggest-next-move | all three | ~1,700 |
| 4 Phase 4 mega-bullet | ft-task | ~1,350 |
| 5 downstream scan | ft-task, ft-epic-discovery | ~900 |
| 6 exit-gate case lists | ft-task, ft-epic-discovery | ~1,020 |
| 7 conditional-skip + overrides | all three | ~2,300 |
| 8 purpose-blurb bounds | ft-task, ft-micro-task | ~1,000 |

Second pass: the skip/fire branch bullets in all three still restated
`gates.md`'s "On skip" / "On fire" motions verbatim (bundle order, the
don't-emit-🏁 rule). Naming the two motions and citing them recovered a further
~550 across the three.

**What was deliberately not collapsed.** Span 2's branch dispatch — which files
to Read, which branch to follow, the `--unattended` pre-scaffold stop — stays
verbatim; [[CORE-038]] left the whole gate alone as a "hot path", and this
preserves the operative half of that caution while citing away the tier-ladder
explanation `SPEC/model.md` carries in a fuller table. The exit-gate judgment
strings and the `✅ Phase 1 Discovery complete…` / 🟢 GO markers stay: they are
literal emissions, not explanations. `/ft-micro-task` Step 4 and
`/ft-epic-discovery` Step 9 read like span 4 but are not it — both are
skill-specific closure sequences (the one-motion five-step list; the
flip-only-the-`.1`-line rules), which is why §E1 attributed span 4 to `ft-task`
alone. Runners-up named by §E1 (foreign-dirt gate, archive-skim recipe, Step 0
layout resolution) are operational recipes, not restated contracts, and stayed
out of scope.

**Size outcome — honest number.** −10,941 bytes, not the ~20,000 the PLAN line
projected. §E1's per-span "≈chars duplicated" figures measure *total span size*
across all copies; the recoverable fraction is only the restated part, since
each span also carries routing a citation cannot absorb. Realized harvest ranged
from 78% (span 1, almost pure prose) to 30% (span 6, mostly branch actions and
literal markers), averaging ~44%. Hitting 20,000 would have required cutting
imperatives — the failure mode this task exists to avoid.

| File | Before | After | Δ |
|---|---|---|---|
| `claude/skills/ft-task/SKILL.md` | 33,940 | 27,570 | −6,370 (−18.8%) |
| `claude/skills/ft-micro-task/SKILL.md` | 21,265 | 18,533 | −2,732 (−12.8%) |
| `claude/skills/ft-epic-discovery/SKILL.md` | 28,186 | 26,347 | −1,839 (−6.5%) |
| **total** | **83,391** | **72,450** | **−10,941 (−13.1%)** |

`docs/CONTEXT-BUDGET.md`: deleted the `ft-task` row from §"Known over budget"
(the exemption this task owned), refreshed the three skill numbers plus
`ft-task`'s whole-directory total (60,971 → 54,601), and fixed the glob-row
prose that said "except the two below" when only `ft-release` now exceeds
30,000.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` per `AGENTS.md` §"Validation" scope (viz + fleet updater untouched); substituted the citation resolver, 94 checked / 0 broken

- [x] Ran lint/type-check on changed code — `N/A` (markdown); `.editorconfig` conformance verified instead: fences balanced, no trailing whitespace, LF, final newline

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- **Citation resolver** (ad-hoc, over the three edited files): 94 `§"…"`
  citations checked against a heading index built from `SPEC.md`, `SPEC/*.md`,
  `SPEC/procedures/*.md`, and every `claude/skills/*/*.md`. **89 exact matches,
  5 valid, 0 broken.** The five are pre-existing prefix cites or an index gap,
  each confirmed against `HEAD`: `step-4-debug-mode.md` §"Phase 1" (real heading
  `## Phase 1 — the four prompts (Step 4)`), `tasknote-selection.md` §"When to
  use a tasknote" (real heading adds "(and when not to)"), and three to
  `.flowtron/tasknote/README.md` §"AI-referenced docs", which exists.
- **Structural:** all fences balanced (6 / 2 / 10), zero trailing-whitespace
  lines, final newline present, no CRLF — `.editorconfig` clean.
- **Repo validation gates:** `N/A` as written. `AGENTS.md` §"Validation" scopes
  its commands to `viz/` and the fleet updater; this change touches neither.
  Substituted the two checks above plus a cold re-read of every edited region
  for executability.
- **Executability re-read:** each collapsed span re-read against its canonical
  home to confirm nothing operative was lost. One place needed a check — the
  `/ft-epic-discovery` fire branch dropped "do **not** emit 🏁, next-move, or
  the copy-paste line in this turn"; it is carried by `gates.md` §"On fire" and
  restated by the very next bullet ("only with a real SHA"), so it holds.
- **Quality assertions:** no dead content (every removed sentence's content
  verified present at the cited home in Phase 1), no duplication introduced, no
  public-surface growth — zero new flags, steps, headings, files, or fragments.
- Frontend 👁️: `N/A` — markdown only.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Collapsed the eight contract spans that `[[CORE-535.1]]` §E1 found restated in
flowtron's three lifecycle skills down to one-line citations of their canonical
SPEC homes, cutting **83,391 → 72,450 bytes (−10,941, −13.1%)** across
`ft-task`, `ft-micro-task`, and `ft-epic-discovery`. Nothing was deleted from
the workflow: every branch, literal marker string, fragment Read, and per-skill
flag interaction survives, and each removed sentence's content was verified
present at the home now cited.

The headline result is `claude/skills/ft-task/SKILL.md` at **27,570 bytes**,
down from 33,940 — **2,430 under** the 30,000 budget `[[CORE-535.2]]` wrote
into `docs/CONTEXT-BUDGET.md`, so its §"Known over budget" row is deleted and
that exemption has self-liquidated as designed. `gates.md` is now the only
surface left on that table, owned by `[[CORE-535.5]]`.

**The ~20,000-char projection was not met, and should not have been.** §E1's
per-span figures measure total span size across copies, not the duplicated
fraction; each span also carries routing a citation cannot absorb. Realized
harvest ran 78% on the near-pure-prose copy-paste helper down to 30% on the
exit gate, averaging ~44%. Reaching 20,000 would have meant deleting
imperatives.

Two decisions worth the record. `[[CORE-038]]` deliberately left the Step 1.5
model gate restated as a "hot path"; this keeps the operative half of that
caution — the branch→action dispatch stays verbatim — and cites away only the
tier-ladder explanation `SPEC/model.md` carries more fully. And
`/ft-micro-task` Step 4 / `/ft-epic-discovery` Step 9 were left alone: they
read like span 4 but are skill-specific closure sequences, which is why §E1
scoped that span to `ft-task` alone.

Verification: 94 `§"…"` citations resolve (89 exact, 5 pre-existing prefix
cites confirmed against `HEAD`, 0 broken); fences balanced, `.editorconfig`
clean; repo validation gates `N/A` by `AGENTS.md` §"Validation" scope, with the
citation and structural checks substituted. Doc-drift sweep: 18 entries, all
"no change" — the contract itself did not move, only the skills' distance from
it. One note for a later pass: `.flowtron/tasknote/README.md`'s
"all 63 skill-body citations resolve today" is `[[CORE-492]]`'s point-in-time
finding, and this task changed the count; left as written rather than
re-derived by a different method than the original.

**Maintainability effect.** The three skills now have one home per rule instead
of two. A future change to the post-closure protocol, the conditional skip
rule, or the model gate lands in one file and reaches all three runners, rather
than requiring an author to notice that three skill bodies restated it.

**Archived:** 2026-09-07
