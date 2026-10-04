---
title: gate-logic-untangle
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-EPIC-535, CORE-535.1, CORE-535.2, CORE-535.3, CORE-535.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
blocked-by:
  - CORE-535.4
---

# CORE-535.5 | gate-logic-untangle

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

Untangle the gate logic in `SPEC/gates.md` into one flag×surface matrix and one precedence ladder, move the advisory discipline prose to a lazy `SPEC/gate-discipline.md`, resolve the five SPEC↔gates↔selection double-homes, and bring `SPEC/gates.md` under the 35k-char budget.

## ✅ Acceptance

- [x] `SPEC/gates.md` carries **one** flag×surface matrix covering `--fast`, `--unattended`, and 👁️ — every surface as a row, `Default` / `--fast` / `--unattended` as columns. No other section restates a flag's per-surface effect beyond a one-line pointer.
- [x] `SPEC/gates.md` carries **one** precedence ladder — bundled in-📦 prompt > `--unattended` park > `--fast` skip > signal/flavor default — with the carve-outs no flag position reaches named alongside it.
- [x] The CORE-065 two-banner cap is stated **once**; every other mention is a pointer or removed.
- [x] §"Rationalizations" + §"Red Flags" live in a new lazy `SPEC/gate-discipline.md` (with `paths: []` frontmatter and a `> Lazy-loaded SPEC module.` trigger line per `SPEC/layout.md`); `SPEC/gates.md` keeps a pointer stub.
- [x] Every external citation of the two moved sections resolves to the new file — `SPEC.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-NEUTRALITY.md`.
- [x] The five `SPEC.md` ↔ `gates.md` ↔ `tasknote-selection.md` double-homes from [[CORE-535.1]] §E2 are each resolved to a single home with a pointer at the other site (the §"Operator-cue glossary" one was already resolved by [[CORE-535.3]]; recorded as such rather than re-done). — 4 resolved, 1 pre-resolved; table in Implementation Notes
- [x] No dangling section citation: every `gates.md §"…"` heading referenced elsewhere in the repo still exists.
- [x] `wc -c SPEC/gates.md` ≤ 35,000 and `wc -c SPEC.md` ≤ 50,000; no other budgeted surface regresses past its cap. — 32,299 / 48,771; reached via the operator-approved second extraction (option A at the 🛠️ gate), not by the filed deliverables alone
- [x] `docs/CONTEXT-BUDGET.md` — the `SPEC/gates.md` row is deleted from §"Known over budget" (the table's self-liquidating rule), and the lazy-module ledger is re-measured to include `gate-discipline.md`.
- [x] Module rosters naming `SPEC/` contents (`AGENTS.md`, `README.md`, `SPEC/layout.md`) name `gate-discipline.md`.

## 🧩 Subtasks

- [x] Create `SPEC/gate-discipline.md`: frontmatter + trigger line, §"Rationalizations" and §"Red Flags" moved, plus the long-form CORE-503 baseline refusal relocated from §"Park conversions"
- [x] Replace both sections in `gates.md` with a pointer stub; update the module's intro paragraph
- [x] Add `## Flag precedence and surface matrix` (ladder + matrix) after §"Conditional skip rule"
- [x] Collapse the scattered `--fast` / `--unattended` restatements (Operator-gate cues · Emphasized inline ask shape · Destructive-action escalation · Phase 1→2 exit gate · Conditional skip rule) to one-line pointers
- [x] Shrink §"`--fast` operator override", §"What is inherited, and what is not", §"Park conversions" to their non-duplicated argument, keeping every cited heading
- [x] State the two-banner cap once in §"Operator-gate cues"; repoint the other mentions
- [x] Trim the ~2.6k of provenance/history prose in §"Glyph layers and reuse" + §"Next-task cues" that [[CORE-535.1]] §E5 marked non-load-bearing
- [x] Resolve the four open double-homes in `SPEC.md` (§"Operator-gate cues" ¶, Phase 3 👁️ block, `park-reason:` ↔ §"Park conversions", Phase 4 stub-form/placement ¶)
- [x] Update citations + rosters: `SPEC.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-NEUTRALITY.md`, `AGENTS.md`, `README.md`, `SPEC/layout.md`
- [x] Measure with `wc -c`; update `docs/CONTEXT-BUDGET.md` (Known-over-budget row, ledger)
- [x] Phase 3 verification + Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-535]] — parent epic (context-load-diet)
- [[CORE-535.1]] — Discovery; findings E4 (tangled logic) + E5 (gates.md tail) scope this task
- [[CORE-535.2]] — `blocked-by:` predecessor; set the 35k gates.md budget + ledger this task measures against
- [[CORE-535.3]] — `blocked-by:` predecessor; SPEC.md lazy split
- [[CORE-535.4]] — `blocked-by:` immediate predecessor; skills cite-don't-restate

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Every named deliverable is real, current, and correctly
  scoped — the matrix, the ladder, the cap-once statement, the
  `gate-discipline.md` extraction, and the five double-homes all describe
  `SPEC/gates.md` as it stands today. What does **not** hold is the arithmetic
  binding them to the `≤35k` acceptance criterion: the deliverables plus every
  trim [[CORE-535.1]] §E5 sanctioned leave the file ~6k over. The budget is
  reachable only by a move the filed scope does not name. See "The budget gap"
  below.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Read set

`SPEC/gates.md` (whole), `SPEC.md` §§"Tasknote frontmatter" / "The 4-phase
workflow" → "Operator-gate cues" / "🧪 Phase 3" / "🚀 Phase 4",
`SPEC/tasknote-selection.md` §"`## Completed` archive convention",
`SPEC/epic.md`, `SPEC/layout.md` §"Lazy SPEC module frontmatter",
`docs/CONTEXT-BUDGET.md`, `docs/AGENT-NEUTRALITY.md`.

### B. Archive skim (probe)

Grep over `archive/core/` for `SPEC/gates.md` returned 20 notes — well past the
~3 the SPEC names as the probe threshold — so the reading was handed to a
read-only probe. Distilled return, constraints a rewrite must not break:

- **Two-home rule for the discipline prose** ([[CORE-386]] / [[CORE-388]]).
  §"Rationalizations" + §"Red Flags" live in `SPEC/gates.md` and in the single
  consolidated `/ft-audit` skill — nowhere else. Standing rule: any new escape
  hatch on this surface ships with matching rows in both sections.
- **Every Rationalizations row terminates in a real refuting `§` citation**
  ([[CORE-386]]). That column is what stops the section decaying into
  freestanding advice; a section rename must re-point it.
- **[[CORE-468]] refused to lazy-load `/ft-audit`'s own red flags**, on the
  ground that *"a red flag you can only read after loading the fragment cannot
  catch 'you never loaded the fragment.'"* Directly analogous to this task's
  extraction — see Implementation Notes for how the stub answers it.
- **[[CORE-503]]'s baseline refusal had to be recorded in three places** —
  §"Park conversions", one Rationalizations row, one Red Flags line — per
  [[CORE-393]]'s findability doctrine. [[CORE-503]] also *declined* giving the
  argument its own heading, reasoning that §"What is inherited, and what is
  not" earned one only because five files cite it and this had no citers.
- **§"Runtime stays out." must keep naming `docs/VISION.md`** — [[CORE-487]]'s
  release-time Pair K2 grep asserts exactly that pointer, proven non-vacuous by
  mutation. Untouched here.
- **Six-gate parity across five surfaces** ([[CORE-503]]): `gates.md` ×3,
  `SPEC.md`, `claude/skills/ft-task/unattended-mode.md`,
  `SPEC/procedures/ft-task.md`.
- **`docs/AGENT-NEUTRALITY.md` enumerates 14 `gates.md` sections by name**
  ([[CORE-532]], correcting [[CORE-521]]). Any heading added, renamed, or
  relocated silently falsifies that ledger.
- **The 🎯 empty-layer-1 row is contract**, not narration ([[CORE-504]],
  read as such by [[CORE-526]]). **Do not "normalize"** the `🔧 / 🧠 / 🔭` row at
  §"Next-task cues" — [[CORE-489.2]] verified it is not drift, because 🧩 owns
  its own row in the glyph-layers table.
- **[[CORE-535.3]] deleted `SPEC.md` §"Operator-cue glossary"** rather than
  moving it; **[[CORE-535.4]] stripped the exit-gate and conditional-skip
  restatements out of all three runner skills.** Both mean `gates.md` is now
  the *single* home for that content — trimming it deletes, it does not
  relocate.
- Sanctioned as trimmable: the ~2.6k of history / glyph-reuse prose inside
  §"Operator-cue vocabulary" ([[CORE-535.1]] §E5), the [[CORE-482.3]] History
  sentence in §"Next-task cues", and the post-table reuse narration
  ([[CORE-415.2]] — whose one placement decision, keeping the Casing rule
  adjacent to §"Glyph layers and reuse", survives).

### C. Drift check

Every path, section name, and figure in the PLAN.md line still matches the
tree. `SPEC/gates.md` measures 51,809 b at entry, as `docs/CONTEXT-BUDGET.md`
§"Known over budget" records, and this task is its named owner. The five
double-homes from §E2 are current except one: §"Operator-cue glossary" was
already resolved by [[CORE-535.3]] (deleted, not moved), so four remain open.
No SPEC contract contradicts the plan.

### D. The budget gap (the Re-scope)

`≤35,000 b` is not reachable from the deliverables the PLAN.md line names.
Measured, in bytes (`wc -c`, the unit `docs/CONTEXT-BUDGET.md` gates on):

| Step | Bytes | Running |
|---|---|---|
| At entry | — | 51,809 |
| Matrix + ladder added; five scattered flag restatements collapsed to pointers; §"`--fast`", §"What is inherited", §"Park conversions" shrunk to their non-duplicated argument; cap stated once | −2,600 | 49,209 |
| §"Rationalizations" + §"Red Flags" + the [[CORE-503]] refusal → `SPEC/gate-discipline.md`, less the stub left behind | −4,508 | 44,701 |
| [[CORE-535.1]] §E5's sanctioned provenance trims | −492 | 44,209 |
| **Everything the PLAN.md line authorizes** | | **44,209** |
| Remaining honest trim, surveyed section by section (§"Operator-gate cues" trigger table, §"`/ft-close-epic` under the posture" rationale, §"What a park is" ↔ `blocked.md` overlap, minor) | ≈ −3,100 | ≈ 41,100 |
| **Budget** | | **35,000** |

The residual ~6,100 b cannot come out of what is left without cutting prose
the archive skim above names as load-bearing. The gap is not a shortfall in
execution — it is that §E5 sized the extraction against a 51.8k file using
character counts, while the budget gates on **bytes**, and this file is dense
in multi-byte glyphs (44,209 b = 42,875 chars; the two units diverge by ~1.3k
here and by more before the cut).

The one move that closes it is a **second extraction**: §"Operator-cue
vocabulary" and its seven subsections are 16,046 b of the remaining 44,209 —
reference tables (glyph/label inventories, cue shapes) rather than the gate
machinery a run consults at a decision point. One of the seven,
§"Destructive-action escalation" (2,405 b), is *not* reference — it is the
two-banner cap's one bounded exception — so it would be promoted to a
top-level `gates.md` section rather than moved. Net −13,641 b, landing
`gates.md` at ≈ **31,970 b**, under budget with ~3k of headroom.

That move contradicts [[CORE-535.1]] §E5, which judged the vocabulary
load-bearing and nominated only its 2.6k of history prose. §E5 was classifying
*content value*, not *placement* — but it is the Discovery this task inherits,
so overriding it is an operator call, not an assistant one. Options are on the
🛠️ gate.

### E. No clarifications needed beyond the gate

Assumptions asserted: `wc -c` bytes is the budget unit (`docs/CONTEXT-BUDGET.md`
§"Why byte budgets" states it outright); existing `gates.md` headings are not
renamed, because ~20 citations across the repo address them by name; and
`docs/CONTEXT-BUDGET.md` §"Known over budget" is self-liquidating, so this task
deletes its own row rather than flipping it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

### Pattern survey

Extended the shape [[CORE-535.3]] established one task earlier: a lazy
`SPEC/*.md` module with `paths: []` frontmatter, a `> Lazy-loaded SPEC module.`
trigger line, and a pointer stub left at the old site. Two modules were filed
that way — `SPEC/gate-discipline.md` and `SPEC/cue-vocabulary.md` — and both
are registered in the three rosters that enumerate `SPEC/` contents
(`AGENTS.md`, `README.md`, `SPEC/layout.md` §"Lazy SPEC module frontmatter").
No new shape was invented.

### The second extraction (operator decision)

Phase 1 §D established that the filed deliverables reach ≈41,100 b against a
35,000 b budget. The 🛠️ gate offered three ways out; the operator chose **A**,
the second extraction. Executed as:

- `SPEC/cue-vocabulary.md` — §"Operator-cue vocabulary" and six of its seven
  subsections (13,647 b of body). Reference material: glyph/label inventories
  and emission shapes.
- §"Destructive-action escalation" **stayed** and was promoted to a top-level
  `## ` heading in `gates.md`. It is the seventh subsection and the only one
  that is machinery rather than vocabulary — the two-banner cap's one bounded
  exception ([[CORE-254.1]]), tied to a concrete command about to execute. It
  is cited by name twice from `gates.md` and once from `SPEC/loop.md`.

`gates.md` 51,809 → **32,299 b**, under budget with 2.7k of headroom.

### How the [[CORE-468]] objection is answered

[[CORE-468]] refused to lazy-load `/ft-audit`'s red flags on the ground that
*"a red flag you can only read after loading the fragment cannot catch 'you
never loaded the fragment.'"* That objection applies verbatim here, and the
[[CORE-535.1]] §F operator decision to extract anyway does not dissolve it.

The stub answers it rather than ignoring it. `gates.md` §"Gate discipline —
read before skipping a gate" stays in the file the agent already has, and
carries the **trigger** (skip a gate, de-escalate a signal, emit 🏁, argue a
flag covers an unlisted case) plus the four sentences that most reliably mean
you are already there — quoted inline, refutations left in the module. What
moved is the 7.5k table of refutations; what stayed is the part that has to be
readable by someone who never loaded it. The [[CORE-386]] / [[CORE-388]]
two-home rule survives as *this file names the trigger, that file holds the
content*, and the standing rule (a new escape hatch ships with matching rows)
is restated in the stub so it cannot be lost with the table.

### Minimal refactor gate

Four deviations from a pure move, each required by Acceptance:

- **§"Destructive-action escalation" promoted, not moved** — see above. A
  pure split would have carried it into the vocabulary module, where it does
  not belong.
- **The [[CORE-503]] baseline refusal relocated** to
  `gate-discipline.md` §"Refused carve-outs", with a pointer left at
  §"Park conversions". [[CORE-503]] declined giving it a heading because it had
  no citers; it now has one, and the refusal genre is exactly what the
  discipline module holds. Its two §"Rationalizations" rows were re-pointed to
  the new section, preserving [[CORE-386]]'s rule that every row terminates in
  a real refuting citation.
- **Precedence-ladder rung 2 rewritten** after review. As first drafted, "any
  gate that would fire … becomes a park" contradicted the matrix row for a 📦
  privileged-ops trip, which `--unattended` *inherits as a skip*. Rung 2 now
  states the inheritance explicitly before the conversion.
- **`SPEC/layout.md`, `AGENTS.md`, `README.md` rosters** touched only to add
  the two module names.

Deferred, untouched: the gate-relaxation ideas raised alongside the option-A
approval (filed separately — see Final Summary), and `docs/AGENT-NEUTRALITY.md`'s
`SPEC.md`-half site count, which measures 6 under a strict any-mention rule
against the 4 [[CORE-532]] recorded. That half is not a surface this task moved,
[[CORE-532]] owns it, and the discrepancy is more likely a narrower counting
rule than an error — flagged here rather than silently "corrected".

### Double-homes resolved

| # ([[CORE-535.1]] §E2) | Resolution |
|---|---|
| Operator-gate cues ¶ (`SPEC.md` ↔ `gates.md`) | `SPEC.md` now states only the two-banner count and the continuous-flow rule, then routes to the three modules by what each governs. The banner-format / trigger-table / flavor prose it duplicated is gone. |
| §"Operator-cue glossary" | **Already resolved** by [[CORE-535.3]], which deleted it as a lossy copy rather than moving it. Recorded, not re-done. |
| Phase 3 👁️ block (`SPEC.md` ↔ §"Emphasized inline ask shape") | `SPEC.md` keeps the shape + example (it is a checklist item there) and drops the structural-not-chromatic rationale and the two flag paragraphs; the flag behavior is one matrix row. |
| `park-reason:` table (`SPEC.md`) ↔ §"Park conversions" | Split cleanly: `SPEC.md` owns the closed code set and its lifecycle (written on every unattended park, cleared on resume); `gates.md` owns gate → behavior. The duplicated six-row table was deleted from `gates.md`; the six-gate parity [[CORE-503]] fixed across five surfaces still holds. |
| Phase 4 stub-form/placement (`SPEC.md` ↔ `tasknote-selection.md`) | The prose restatement of standalone-vs-epic-child placement is gone; the checklist item's own citation carries it. |

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

Markdown-only change; no code path, parser, or test fixture was touched, so no
suite covers it (`npm --prefix viz test` and `node --test
tools/update-adopters.test.mjs` exercise the visualizer parser and the fleet
updater, neither of which reads these files). The structural checks that *do*
cover it were run instead:

- **Dangling-citation scan** — every `SPEC/{gates,cue-vocabulary,gate-discipline}.md
  §"…"` citation across `SPEC.md`, `SPEC/`, `SPEC/procedures/`, `docs/`,
  `claude/`, `codex/`, `cursor/`, `grok/`, `templates/`, and the roots, resolved
  against the three files' actual headings. **0 dangling** after re-pointing 16
  citations across 11 files. Two apparent hits in `docs/AGENT-NEUTRALITY.md` are
  scanner artifacts — the regex window slides across that row's file-column
  boundary; each section group there carries an explicit `(N sites in <file>)`
  attribution.
- **Relative-link check** — all non-anchor markdown links repo-wide.
  12 broken, all pre-existing (adopter-relative `../PLAN.md` in templates,
  regex literals in `step-7.1-mirror-pairs.md`, illustrative `legacy/...`
  placeholders). **0 new.**
- **Release Pair K2** (`step-7.1-mirror-pairs.md`) — run verbatim; passes.
  `gates.md` §"Runtime stays out." still names `VISION.md` within 6 lines,
  the guard [[CORE-487]] proved non-vacuous by mutation.
- **Standing context-budget check** (`step-7.1-standing-checks.md`) — run
  verbatim. `SPEC.md` 48,771 ≤ 50,000 · `SPEC/gates.md` 32,299 ≤ 35,000 ·
  `ft-release` 37,369 ≤ 40,000 · every other `SKILL.md` ≤ 30,000 (max
  `ft-task` 27,588). All under.
- **Six-gate parity** ([[CORE-503]]) — re-verified 6/6 across `gates.md` ×2,
  `gate-discipline.md` ×1, `SPEC.md`, `unattended-mode.md`, and
  `claude/skills/ft-task/SKILL.md`.

**Quality assertions.** No duplication introduced: the matrix and ladder
*replaced* the five scattered flag restatements rather than joining them, and
each vacated site now carries a one-line pointer. No dead prose — the two moved
sections kept every row. No public-surface growth beyond the two module files
the operator approved. Documentation is the deliverable here, so the
doc-drift verdict is in Phase 4 rather than deferred.

👁️ `N/A` — no rendered surface changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs",
per entry:

| Entry | Verdict |
|---|---|
| `README.md` | **Updated** — `SPEC/` module roster names `cue-vocabulary` + `gate-discipline` |
| `AGENTS.md` | **Updated** — same roster, prose form |
| `SPEC.md` | **Updated** — §"Operator-gate cues" rewritten as a three-module route; Phase 3 👁️ and Phase 4 placement double-homes resolved |
| `docs/MIGRATION.md` | no change — adopters consume `SPEC/` wholesale; no per-module list |
| `claude/AGENTS-snippet.md` | no change — points at `SPEC/layout.md` for the module contract, names no module |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — its `gates.md` reference is to §"Runtime stays out.", which stayed |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — §"Control-marker integrity" stayed in `gates.md` |
| `docs/AGENT-NEUTRALITY.md` | **Updated** — the `--fast` ledger row re-apportioned across three files (14 / 3 / 3), counts re-measured |
| `docs/PLATFORMS.md` | no change |
| `claude/CAPABILITIES.md` | no change |
| `docs/AGENT-COMPAT.md` | **Updated** — two §"Operator-cue vocabulary" / §"Emphasized inline ask shape" citations re-pointed |
| `docs/EXTERNAL-AGENTS.md` | no change — Pair K2 verified its `VISION.md` pointer intact |
| `docs/WORKTREES.md` | no change |
| `docs/VISION.md` | no change |

Also updated outside the sweep set (not members, changed because this task
moved what they cite): `SPEC/layout.md`, `SPEC/loop.md`, `SPEC/model.md`,
`SPEC/purpose-blurb.md`, `SPEC/procedures/ft-task.md`, `docs/DOGFOOD.md`,
`docs/GLOSSARY.md`, `docs/CONTEXT-BUDGET.md`, and four `SKILL.md` bodies
(`ft-task`, `ft-goal-task`, `ft-close-epic`, `ft-epic-discovery`) — citation
re-points only, no contract change.

**Final Summary:**

Untangled `SPEC/gates.md` and brought it under its byte budget. The flag logic
that was spread across five sections and restated five times is now one
flag×surface matrix and one precedence ladder; the two-banner cap is stated
once in §"Operator-gate cues" and cited from the three places that used to
re-assert it. The advisory prose moved to `SPEC/gate-discipline.md`, and — on
the operator's option-A decision at the 🛠️ gate — the cue inventory moved to
`SPEC/cue-vocabulary.md`, leaving `gates.md` as gate machinery only.

**Files.** 3 new (`SPEC/cue-vocabulary.md` 14,819 b, `SPEC/gate-discipline.md`
13,096 b, this tasknote), 18 modified. `SPEC/gates.md` 51,809 → **32,299 b**
(−37.7%); `SPEC.md` 49,005 → **48,771 b**. Net repo prose change is
approximately −5,600 b: the split relocates, the consolidation deletes.

**Verification.** 0 dangling section citations after re-pointing 16 across 11
files; 0 new broken links; release Pair K2 passes; the standing
context-budget check passes on every budgeted surface. Details in Testing
Notes.

**Budget.** `docs/CONTEXT-BUDGET.md` §"Known over budget" is now **empty** —
this task deleted the last row at its own closure, which is exactly the
self-liquidating behavior that table specifies. Neither new module earns a
budget row: neither is loaded to run an ordinary task, which is the whole
reason for splitting them out.

**Refactors deferred, with reason.** `docs/AGENT-NEUTRALITY.md`'s `SPEC.md`-half
site count measures 6 against the 4 [[CORE-532]] recorded; left alone because
that half is not a surface this task moved and the gap more likely reflects a
narrower counting rule than an error. Flagged, not silently corrected.

**Maintainability effect.** Concrete: the question *"what does `--fast` do to
this gate?"* had five possible homes and now has one table. The [[CORE-535.1]]
§E4 finding that motivated this task — inheritance stated 5×, the cap 7×, the
👁️ posture needing 4 cross-refs — is closed by construction rather than by
discipline. And `gates.md` is now the file an agent can afford to load at every
gate decision, which is the only reason it had a budget.

**Follow-up filed at the operator's request.** Gate-relaxation candidates
surfaced while working the file are recorded for separate filing — they change
gate *behavior*, which this context-load task deliberately did not.

**Archived:** 2026-09-07
