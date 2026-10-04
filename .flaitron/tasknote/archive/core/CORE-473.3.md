---
title: park-reason-key
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473, CORE-473.1, CORE-473.2]
touches:
  - SPEC.md
  - SPEC/blocked.md
blocked-by:
  - CORE-473.2
parallel-safe-with:
  - CORE-473.5
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# supersedes:
#   - TASK-ID
---

# CORE-473.3 | park-reason-key

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]]

## 🎯 Goal

Define the structured park-reason frontmatter key — a stable code token plus prose — in `SPEC.md` §"Tasknote frontmatter", and reflect the park lifecycle plus the Phase 1→2 boundary widening into `SPEC/blocked.md`, so a caller reading a parked tasknote can tell *why* it stopped without a transcript.

## ✅ Acceptance

- [x] `SPEC.md` §"Tasknote frontmatter" carries a **`park-reason:`** subsection defining one additive, omit-when-absent key whose value is `<code> — <prose>` — a stable code token, the ` — ` separator §"Task-line format" already uses, then one line of prose
- [x] The subsection tables **six** stable codes — `drift` · `destructive` · `prerequisite` · `model-mismatch` · `input-needed` · `dependency` — the first five cited to `SPEC/gates.md` §"`--unattended` operator posture", `dependency` covering the attended mid-Phase-2 park that predates the posture
- [x] The **closed-set** rule is stated: a new stop cause adds a row to that table, never a free-form value
- [x] The **write rule** is stated: mandatory on every `--unattended` park (with no operator, the key is the only stop surface a caller has), optional on an attended park
- [x] The **clear-on-resume** rule is stated and grounded in the write-once *lifecycle-write* carve-out already in that section — removing the key on `blocked` → `in-progress` is an active-note write, not a retroactive edit
- [x] `drift` vs `dependency` is disambiguated explicitly: the code names what *stopped* the run, so a `Re-scope` verdict parks as `drift` even when a dependency drove it; `dependency` is the mid-Phase-2 park where no verdict is involved
- [x] `SPEC/blocked.md` records the key at the three lifecycle points it touches — written at the park, part of the parked record, removed at resume
- [x] `SPEC/blocked.md`'s mid-Phase-2 scoping is **widened by one position** per [[CORE-473.2]]'s hand-off: under `--unattended` a Phase 1→2 boundary `Re-scope`/`De-scope` verdict parks with Discovery preserved instead of taking the attended delete-the-tasknote motion; the attended Phase 1 path is restated as unchanged, and the PLAN edit + deletion are explicitly not performed autonomously
- [x] `blocked.md`'s opening paragraph separates `park-reason:` from the two signals the way it already separates `blocked-by:` — it *annotates* a park, it is not a further signal
- [x] `SPEC/gates.md`'s existing forward reference ("The reason key and its code tokens live in `SPEC.md` §Tasknote frontmatter") now resolves to a real subsection; no dangling anchor anywhere in the diff
- [x] No new cue glyph, no banner, no validator — `AWAITING APPROVAL` count unchanged and the cue table untouched
- [x] No template, skill, command-stub, `claude/CAPABILITIES.md`, or `docs/PLATFORMS.md` file is edited — `.3` is contract-only, matching `.2`; templates resolved to the `loop-*` module-only precedent and the resume fragment's clear-the-key step is [[CORE-473.4]]'s wiring
- [x] Every added link and every cited §heading resolves; no trailing whitespace

## 🧩 Subtasks

- [x] Draft the `park-reason:` subsection: value grammar + yaml example, six-code table, closed-set rule, write rule, clear-on-resume rule, `drift`-vs-`dependency` disambiguation
- [x] Insert it into `SPEC.md` §"Tasknote frontmatter" after the Optional-planning-keys block, before the `**Date format:**` line
- [x] Edit `SPEC/blocked.md` at five points: opening fourth-key paragraph · Phase 1→2 boundary-park widening (new paragraph after the Re-scope path) · mid-Phase-2 park writes the key · parked-state record · resume clears the key
- [x] Verify `SPEC/gates.md`'s forward reference resolves and that no back-pointer is needed (it cites the section, not a sub-anchor)
- [x] Phase 3: verify by command — `AWAITING APPROVAL` parity, glyph set-diff, link + anchor resolution, contract-only diff (`git diff --stat`), no trailing whitespace, markdown pass on edited blocks
- [x] Phase 4: doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" + flip the `.3` PLAN line to stub form (nested under the active parent) + archive

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic
- [[CORE-473.1]] — epic Discovery; filed this child and its Fan-out claim
- [[CORE-473.2]] — `blocked-by:`; fixed the **cardinality** of the park reason (five stop causes) and cited `SPEC.md` §"Tasknote frontmatter" as the key's home. `.3` fixes the **spelling** and reflects the `blocked.md` widening `.2` named but did not own
- [[CORE-473.4]] — `parallel-safe-with:`-adjacent successor; wires the flag through the runners, and owns the resume fragment's clear-the-key step
- [[CORE-473.5]] — `parallel-safe-with:`; disjoint surface (`/ft-close-epic` + the resume path)
- [[CORE-445.2]] — landed the optional planning keys (`touches` / `blocked-by` / `parallel-safe-with`) in this exact section; the omit-when-absent, no-validator pattern this key follows
- [[CORE-416.2]] — the write-once *lifecycle-write* carve-out the clear-on-resume rule rests on

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two edit surfaces named in the PLAN line were re-read at HEAD: `SPEC.md` §"Tasknote frontmatter" has no reason key, and `SPEC/gates.md` §"`--unattended` operator posture" already forward-cites that section as the key's home — a pointer that resolves to a section but not yet to the row it promises. [[CORE-473.2]]'s hand-off names both deliverables explicitly (the key's spelling, and the `blocked.md` widening), so the work is defined and unstarted. `.3` is Fan-out-Parallel with [[CORE-473.5]] and blocked only by `.2`, which landed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**What `.2` handed over, verbatim.** [[CORE-473.2]] closed by naming two items it did not own: (1) `SPEC/blocked.md:33-37` scopes `status: blocked` to mid-Phase-2 parking on the reasoning *"a Phase 1 blocker has no Phase 2 work to preserve"*, while the 🛠️ conversion parks at the **Phase 1→2 boundary** where Phase 1 *is* complete — reflecting that widening into `blocked.md` is `.3`'s edit; and (2) `.2` fixed the reason's **cardinality** (five stop causes), `.3` fixes its **spelling** (key name + code tokens). Both re-read at HEAD; neither has drifted.

**Pattern survey — two precedents, and they disagree about templates.** The frontmatter layer has exactly two shapes for an additive key, and the choice between them is the only real design fork in the deliverable:

| Precedent | Shape | Template surface |
|---|---|---|
| [[CORE-445.2]] planning keys (`touches` / `blocked-by` / `parallel-safe-with` / `supersedes`) | Flat scalar or flat list, omit-when-absent, no validator, table row in `SPEC.md` §"Tasknote frontmatter" | **Commented into all four templates** — they are *scaffold-time* planning claims a human writes |
| `SPEC/loop.md` §"Frontmatter keys" (`loop:` / `loop-max:` / `loop-last-run:`) | Same, but the table lives in the mode's own module | **Absent from every template** — verified by `grep -rn 'loop-max\|loop:' templates/` (one prose hit in `loop-heartbeat-template.md`, no frontmatter stub) |

`park-reason:` is written by a runner at a park, never by a human at scaffold, which is the `loop-*` situation and not the `445` one. Its *home* still differs from `loop-*`: `.2` already committed the key to `SPEC.md` §"Tasknote frontmatter" rather than to `blocked.md`, so the table goes where `.2` promised and only the template question follows the loop precedent. Operator confirmed both (Q3 below). Dependency direction is preserved — `SPEC.md` owns the schema, `blocked.md` and `gates.md` cite inward, nothing new points outward.

**Archive skim** (`grep -l` over `.flowtron/tasknote/archive/core/` for `SPEC/blocked.md` → 20 hits, `Tasknote frontmatter` → 25 hits). Load-bearing beyond the `.473` cohort:

- **[[CORE-445.2]]** — the direct template for this edit: keys landed as omit-when-absent YAML with a `blocked.md` third-signal note and **no validator**. Its sibling [[CORE-445.5]] put the viz overlay in a *separate child*, which is why `.3` writes no viz code (see non-scope below).
- **[[CORE-445.1]]** — established that "existing adopters need no migration" is the bar an additive frontmatter key must clear. Omit-when-absent clears it.
- **[[CORE-416.2]] / the write-once carve-out** — `SPEC.md` already distinguishes *retroactive* edits (forbidden) from *lifecycle* writes on an active note (`starter`→`in-progress`, `in-progress`→`blocked`, `blocked`→`in-progress`, `in-progress`→`completed`, all explicitly carved out). Clearing `park-reason:` at resume rides that existing carve-out rather than needing a new one.
- **[[CORE-386]]** — any new escape hatch in `SPEC/gates.md` arrives with Rationalizations/Red Flags rows. `.3` adds no hatch (it describes a stop, it does not permit one), so no rows are owed; `.2` already paid that cost for the posture.

**Drift check.** All paths and quotes verified by direct read at HEAD: `SPEC.md:297-410` (§"Tasknote frontmatter" — write-once policy, lifecycle carve-out, valid `status:` values, Optional-planning-keys table, `**Date format:**` close), `SPEC/blocked.md:1-64` (whole file), `SPEC/gates.md` §"`--unattended` operator posture" (the five conversions and the forward citation), `SPEC/loop.md:126-143`, `claude/skills/ft-task/step-3c-resume-blocked.md:1-11`. No pre-existing drift. `.3` creates **one** forward obligation and does not create a stale pointer: the resume fragment's five steps do not mention `park-reason:`, so after this commit a `/ft-task` resume would leave the key on an `in-progress` note. That is skill wiring — `.2` set the contract-then-wiring order and touched no skill; [[CORE-473.4]] owns the runner surface. Recorded in the sweep and in Related so it is not rediscovered.

**Clarifying questions (AskUserQuestion, 3 asked, all answered with the recommended option).**

| # | Question | Answer | Consequence |
|---|---|---|---|
| Q1 | One key (`park-reason: <code> — <prose>`) vs. two keys vs. a nested mapping | **One key, `<code> — <prose>`** | Matches the PLAN task-line separator the spec already defines, stays greppable (`grep 'park-reason: destructive'`), and matches the singular "key" the PLAN line filed. No flowtron frontmatter key nests, so the mapping option would have introduced a shape |
| Q2 | Five unattended-only codes, or six including `dependency` for the classic attended mid-Phase-2 park | **Six** | The key generalizes from "unattended stop" to "why this note is parked". An enum that cannot describe the most common park would read as an oversight. Forces the `drift`-vs-`dependency` disambiguation into the deliverable |
| Q3 | Comment the key into the shipped templates ([[CORE-445.2]]) or leave it to the module (`loop-*`) | **Module only** | Templates unchanged; the diff stays the two files the PLAN line names |

**Assumptions asserted.** Code tokens are lowercase kebab and semantically named after the *stop*, not the glyph (`destructive`, not `🗄️`) — glyphs are cue vocabulary and belong in `SPEC/gates.md`. The set is closed by statement, not by a validator; flowtron ships none for any frontmatter key and `.3` does not start.

**Deliberate non-scope (filed, not forgotten).** (a) **Viz** — the parser ignores unknown frontmatter keys and no viz child was filed on this epic; [[CORE-445.5]]'s precedent is that the overlay is its own child, so `.3` writes no viz code and creates no viz drift. (b) **Skill wiring** — the resume fragment's clear-the-key step and every `--unattended` flag mention belong to [[CORE-473.4]]. (c) **`docs/EXTERNAL-AGENTS.md`** — already recorded stale by `.2` and owned by [[CORE-473.6]].

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey — extended the `445` key shape, borrowed the `loop-*` template posture.** `park-reason:` is a flat scalar, omit-when-absent, no validator, tabled in `SPEC.md` §"Tasknote frontmatter" — the [[CORE-445.2]] shape verbatim. Its value grammar reuses the ` — ` separator §"Task-line format" already defines rather than inventing a delimiter, so the code/prose split is a convention the file already teaches. Template surface follows the `loop-*` precedent instead (module-documented, no scaffold stub), because the key is a runner's lifecycle write, not a human's scaffold-time claim. No new shape, no new file, no new glyph.

**Minimal refactor gate.** No refactor. `SPEC.md` is purely additive. `SPEC/blocked.md` has five edits, four of which extend an existing sentence with a clause; the fifth adds a paragraph. One existing sentence changed meaning by design — the resume step now *requires* removing `park-reason:` where the neighbouring `Blocked by` cleanup stays optional, because a stale reason on an `in-progress` note asserts something false while a stale `Blocked by` is merely historical.

**Edit surface — 2 files, +72/−5, contract layer only:**

| File | Change |
|---|---|
| `SPEC.md` | New `**Park reason.**` block in §"Tasknote frontmatter" (+46): value grammar + yaml example, six-code closed-set table, the `drift`-vs-`dependency` disambiguation, the mandatory-under-`--unattended` write rule, and the clear-on-resume rule grounded in the existing lifecycle-write carve-out. Placed after the Optional-planning-keys block and before `**Date format:**`, so the two additive-key families read together |
| `SPEC/blocked.md` | Five edits (+26/−5): the opening paragraph now separates `park-reason:` as an *annotation* the way it already separates `blocked-by:` as a *planning claim*; a new `**Phase 1→2 boundary park (`--unattended` only)**` paragraph carrying the widening; the mid-Phase-2 park writes `dependency`; the parked-state record names what the key buys a caller; resume clears it |

**The widening is stated as a widening, not a rewrite.** `blocked.md`'s reservation — *"`status: blocked` is reserved for mid-Phase-2 parking — a Phase 1 blocker has no Phase 2 work to preserve"* — is left in place and explicitly held for the attended path. The new paragraph adds the one position where its premise does not apply (Phase 1 complete at the 1→2 boundary, Discovery worth preserving) and states what an unattended run must *not* do there: the `Re-scope` PLAN.md edit and the tasknote deletion are operator motions, not autonomous ones. That distinction is the substance of the widening — without it, "`Re-scope` parks" could be read as licence to autonomously edit the plan.

**Downstream-impact reconciliation — none required.** The six-code decision (Q2) widens the key past the posture but reaches no other active PLAN entry: `.4` still owns runner wiring, `.5` the entry points, `.6` the doc contract, `.N` the audit. `## Medium`, `## Low`, and `## Future Opportunities` are empty. No reconcile action proposed.

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

No executable surface — markdown contract prose only, so the targeted-suite and lint/type-check boxes are `N/A` in the code sense and the 👁️ frontend box is `N/A` (no UI). Acceptance is structural and each criterion was verified by command:

| Check | Command | Result |
|---|---|---|
| Two-banner cap intact | `grep -c 'AWAITING APPROVAL'` on `HEAD:` vs. working copy, all three gate-bearing files | `SPEC.md` 0→0, `SPEC/blocked.md` 0→0, `SPEC/gates.md` 12→12 |
| No new cue glyph minted | Python set-diff of all `So`/`Sk` code points, HEAD vs. working copy | `SPEC.md` no change. `SPEC/blocked.md` +`🛠` — **not a new cue**: it is the Phase 1→2 exit-gate glyph, canonical in `SPEC/gates.md`, new to *this file* only because `blocked.md` had never quoted that gate before. Same finding shape as [[CORE-473.2]]'s `⏸` |
| Every added link resolves | extract `](…)` from added lines, `os.path.exists` each | 3/3 OK (`SPEC/gates.md`, `SPEC/blocked.md` from `SPEC.md`; `gates.md` from `blocked.md`) |
| Every cited §heading exists | grep each anchor in its target | 3/3 OK (§"Task-line format", §"Tasknote frontmatter", §"`--unattended` operator posture") |
| `.2`'s forward reference now lands | read `SPEC/gates.md:489` against the new section | *"The reason key and its code tokens live in `SPEC.md` §Tasknote frontmatter"* — resolved; the section it names now carries both. No back-pointer needed (it cites the section, not a sub-anchor), and no dangling anchor was written |
| Contract-only diff | `git diff --name-only` | `SPEC.md`, `SPEC/blocked.md` — zero template / skill / command-stub / `claude/CAPABILITIES.md` / `docs/PLATFORMS.md` paths |
| Whitespace | `grep -nE ' +$'` + `git diff --check` | none / clean |
| Wrap width | `awk length>78` over added lines | 80–84 on three lines, inside the file's own 79–82 house range (`SPEC.md:309-331` pre-existing); one over-long resume sentence rewrapped |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — per-entry verdicts.** Grepped all sixteen entries for `status: blocked` and `park`; every `park` hit is `--park` (the `/ft-file-followup` sidequest flag), unrelated to this key.

| Doc | Verdict |
|---|---|
| `README.md` | no change — L257 points at `SPEC/loop.md` for "when a loop parks" rather than restating the mechanism; still accurate |
| `AGENTS.md` | no change |
| `SPEC.md` | **updated** — the deliverable itself; §"Tasknote frontmatter" gains the `park-reason:` block |
| `docs/MIGRATION.md` | no change — its `park` hits are `/ft-file-followup --park` roster prose |
| `claude/AGENTS-snippet.md` | no change — L23's "parks on destructive steps" describes `/ft-goal-task`'s loop behavior, which the key annotates but does not alter |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — `.2` already added the `--unattended` clause to the first-run advisory; a stop-reason key adds no new injection surface |
| `docs/AGENT-NEUTRALITY.md` | no change — `park-reason:` is agent-neutral frontmatter with no Claude-specific surface to ledger |
| `docs/PLATFORMS.md` | no change — its `park` rows are `--park`; the `--unattended` flag rows are [[CORE-473.4]]'s (Pair I gated) |
| `claude/CAPABILITIES.md` | no change **now** — same Pair I gate, [[CORE-473.4]] |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | **still stale, still owned by [[CORE-473.6]]** — L43 §"The Return" and L60 §"Relationship" were falsified by `.2`, not by this commit. Re-recorded rather than fixed, so `.6` receives one clean edit |
| `docs/WORKTREES.md` | no change |

**Known forward obligation (not drift in an AI-referenced doc).** `claude/skills/ft-task/step-3c-resume-blocked.md` lists five resume steps and does not yet clear `park-reason:`. That is runner wiring, which [[CORE-473.2]] established `.3` does not touch and [[CORE-473.4]] owns; `.N` backstops it.

**Final Summary:**

Landed `park-reason:` — one additive, omit-when-absent frontmatter key that records *why* a tasknote sits at `status: blocked`. The value is a stable code, then prose, split by the same ` — ` the spec already defines for the PLAN.md task line, so a caller reads the code by splitting on the first separator and never parses the prose. Six codes form a closed set: the five gate conversions [[CORE-473.2]] fixed the cardinality of (`drift` · `destructive` · `prerequisite` · `model-mismatch` · `input-needed`) plus `dependency` for the mid-Phase-2 park that predates the posture. `.2` fixed the cardinality; `.3` fixed the spelling, and `.2`'s forward citation now lands on a real table instead of on a promise.

Three rules make the key trustworthy rather than decorative. **Mandatory under `--unattended`, optional attended** — with no operator present the key is the only stop surface a caller has, so a park without one is a park it cannot classify. **Cleared on resume**, riding the write-once *lifecycle-write* carve-out already in that section: a stale reason on an `in-progress` note asserts something false, which is why that step is required where the neighbouring `Blocked by` cleanup stays optional. **`drift` vs `dependency` disambiguated by what stopped the run, not what motivated it** — a `Re-scope` verdict parks as `drift` even when a dependency drove it, the one ambiguity a reader hits immediately.

`SPEC/blocked.md` took `.2`'s handed-over widening. Its reservation — *"`status: blocked` is reserved for mid-Phase-2 parking — a Phase 1 blocker has no Phase 2 work to preserve"* — is left standing and explicitly held for the attended path; a new paragraph adds the single position where its premise fails (the Phase 1→2 boundary under `--unattended`, where Phase 1 *is* complete and Discovery is the work worth preserving) and states the limit that keeps the widening honest: the `Re-scope` PLAN.md edit and the tasknote deletion are operator motions, never autonomous ones. Without that clause, "`Re-scope` parks" reads as licence to autonomously rewrite the plan.

Scope held to the two files the PLAN line named — 2 files, +72/−5, contract layer only. Three Discovery asks all resolved to the recommended option, and the template question resolved *against* the nearest precedent on purpose: [[CORE-445.2]] comments its planning keys into all four templates because a human writes them at scaffold, while `park-reason:` is a runner's lifecycle write, which is the `loop-*` situation — module-documented, no scaffold stub, no noise on every task. Verified by command rather than by eye: `AWAITING APPROVAL` 12→12 on `gates.md`, glyph set-diff clean (the one addition, `🛠`, is the existing Phase 1→2 cue quoted for the first time in `blocked.md`), 3/3 added links and 3/3 cited anchors resolve, `git diff --check` clean, zero template/skill/stub/`CAPABILITIES`/`PLATFORMS` paths. One forward obligation is recorded rather than fixed: the resume fragment's five steps do not yet clear the key — runner wiring, [[CORE-473.4]]'s surface by the epic's own contract-then-wiring order, with `.N` as backstop.

**Archived:** 2026-08-25
