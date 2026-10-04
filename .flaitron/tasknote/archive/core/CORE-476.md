---
title: capabilities-deep-row
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-475, CORE-460.3, CORE-460.4, CORE-399]
touches:
  - claude/CAPABILITIES.md
  - docs/PLATFORMS.md
---

# CORE-476 | capabilities-deep-row

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-475]] · [[CORE-460.3]] · [[CORE-460.4]] · [[CORE-399]]

## 🎯 Goal

Give `--deep` the `claude/CAPABILITIES.md` flag row it has lacked since it
shipped, and carry the Pair I obligation through to every non-Claude
`docs/PLATFORMS.md` trigger table that already commits to a partial roster.

## ✅ Acceptance

- [x] `claude/CAPABILITIES.md` carries a `--deep` row in the established four-column shape, in the flag block, matching the Pair I row-shape anchor
- [x] The §"Agent-neutrality cross-check" list gains a per-trigger `--deep` bullet stating its actual contract-layer coverage (not a blanket claim)
- [x] `docs/PLATFORMS.md` §"Non-Claude capability triggers" → the Grok Build, Codex CLI, and Cursor tables each carry a `--deep` row, written for that platform's availability story rather than paraphrased from Claude's wording
- [x] The three stub sections (Gemini CLI, Aider, Sourcegraph Amp) stay untouched — Pair I's section guard exempts a table that names no flag
- [x] Pair I prints nothing at HEAD after the edits, and negative-tests as firing before the PLATFORMS rows land
- [x] Pairs F, G, and J still print nothing (no regression), and the `AGENTS.md` §"Validation" set passes
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — per-entry verdict

## 🧩 Subtasks

- [x] Add the `--deep` row to `claude/CAPABILITIES.md`'s trigger table
- [x] Add the `--deep` bullet to §"Agent-neutrality cross-check"
- [x] Negative-test Pair I (fires on CAPABILITIES-only edit, three sections short)
- [x] Add the `--deep` row to the Grok Build trigger table
- [x] Add the `--deep` row to the Codex CLI trigger table
- [x] Add the `--deep` row to the Cursor trigger table
- [x] Re-run Pair I (silent), Pairs F / G / J, and the validation set
- [x] Phase 4 closure

## 🔗 Related

- [[CORE-475]] — predecessor: minted Pair J, and its Phase 4 deferred note is the filing source for this task
- [[CORE-460.3]] — precedent: added `--park` / `--worktree` rows to the Grok + Cursor tables and minted Pair I; establishes the row idiom being extended
- [[CORE-460.4]] — backfilled the Codex table to 11 rows, bringing it inside Pair I's section guard
- [[CORE-399]] — added the `--worktree` row to `claude/CAPABILITIES.md`; the last time this table grew a flag

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap reproduces exactly as filed — `claude/CAPABILITIES.md`
  documents five flags and `--deep` is not among them, while the flag plainly
  changes *how* `/ft-epic-discovery` runs (three staged pre-pass rounds with
  their own gates), the same footing as `--debug`'s content-only row.

- [x] Read relevant source files — read inline; the read set was narrow and known (4 files + 2 precedent tasknotes), so no probe was warranted

- [x] **Best Practices Review** — `N/A` for code; documentation-only task. Structural equivalent applied: the row shape is fixed by `claude/CAPABILITIES.md`'s own pattern note and by Pair I's stated fix instruction, so this extends an established shape rather than inventing one. No duplication introduced — each of the four rows is the platform-specific restatement Pair I explicitly asks for, not a copy.

- [x] **Archive skim** — `grep -l` over `archive/core/` for the two `touches:` paths returned 25 hits; read the two load-bearing ones ([[CORE-460.3]], [[CORE-475]]) plus the flag-adding precedent [[CORE-399]]. Findings in Discovery Notes.

- [x] **Drift check** — every claim in the PLAN line verified against current files; the Pair I check re-run at HEAD to confirm the live roster. No drift. Cross-artifact half: `SPEC/epic.md` §"Optional deep pre-pass" and `SPEC.md` §"Operator-gate cues" both read — neither is contradicted by adding a wiring-layer row, and this task adds no contract-layer surface.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:

  1. The deliverable surface is four table rows — one in `claude/CAPABILITIES.md`, three in `docs/PLATFORMS.md` — plus the one cross-check bullet the CAPABILITIES row obliges.
  2. Stub sections stay row-less: Pair I's section guard skips a table naming no flag, and adding rows there would assert availability nobody has verified.
  3. `**Last verified:**` stamps stay untouched. They record a dogfood observation, not doc currency; [[CORE-475]] set that precedent one task ago, and no session was run under any agent here.
  4. `docs/AGENT-COMPAT.md` stays untouched — its own §"Scope of this matrix" defers per-agent triggers to PLATFORMS, and Pair I's fourth property records that non-mirroring as deliberate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The obligation, precisely.** Pair I derives its roster from
`claude/CAPABILITIES.md` rows matching `^\| \*\*`--[a-z-]+`` — today
`--fast --unattended --debug --worktree --park`, confirmed by running the
check at HEAD (silent, roster echoed). Its section guard is a partial-roster
rule: an agent section containing ≥1 roster flag must contain *all* of them;
one containing none is skipped. So the CAPABILITIES row does not merely
*suggest* three more rows — it makes the release gate fail until they land.
That coupling is why [[CORE-475]] deferred this rather than fixing it at
closure.

**Availability story differs per platform, and the rows should say so.**

- **Grok Build** and **Cursor** ship no wrappers — they load the canonical
  `claude/skills/ft-epic-discovery/SKILL.md` body, where `--deep` lives
  *inline* (Steps 1.5 / 5 / 5.5). Unlike `--debug` / `--park`, there is no
  lazy fragment to resolve relative to the body, which is a real simplification
  worth stating rather than copying the fragment sentence across.
- **Codex CLI** does ship a wrapper, and
  `codex/skills/ft-epic-discovery/SKILL.md` already names `--deep` in its
  `description:` while delegating straight to the canonical body — the same
  direct-routing shape the existing `--park` row describes, not the two-step
  SOP routing `--fast` / `--debug` use on `ft-task`.
- The pre-pass gates are **structured asks**, so each platform's existing
  structured-ask row is the right thing to point at: observed working under
  Grok ([[CORE-257]]), native under Cursor, and degraded to a prose ask under
  Codex by `codex/AGENTS-snippet.md` §"Translation rules". This is the
  per-platform nuance Pair I's fix instruction asks for.

**Contract-layer coverage for the cross-check bullet.** `--deep`'s only
contract-layer site is `SPEC/epic.md` §"Optional deep pre-pass" (plus a
`docs/GLOSSARY.md` definition). `docs/AGENT-NEUTRALITY.md`'s ledger row for
`SPEC/epic.md` names that exact bold label in its Section cell, so `--deep`
is already ledgered — unlike `--worktree`, whose site the same list records as
*not* ledgered today. The bullet should say so precisely; a blanket "covered"
claim is what that list exists to avoid.

**Observed, out of scope.** `docs/PLATFORMS.md` §"Worked example: Claude Code"
enumerates operator flags in prose and already omits `--unattended` — so it has
been short of the roster since that flag shipped, independent of `--deep`. Pair
I does not read it (it scopes to §"Non-Claude capability triggers"), and Pair G
greps the whole file, so nothing catches it. [[CORE-460.3]] de-enumerated four
*non-Claude* prose asides to §-pointers for exactly this reason and left the
Claude bullets alone. Pre-existing, a different surface, and a different fix
shape (de-enumerate, not add) — recorded here rather than widened into.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` (no code changed; the release-gate check that covers this surface, Pair I, already existed and was exercised both ways — see Testing Notes)

**Implementation Notes:**

**Pattern survey.** Four sources fixed the shape before a word was written: the
four-column header each table already declares, `claude/CAPABILITIES.md`'s own
pattern note, Pair I's fix instruction ("written from the matching
`claude/CAPABILITIES.md` row and re-stated for that platform's availability
story — not paraphrased from memory, and not normalized to Claude's wording"),
and the two rows [[CORE-460.3]] added for `--park` / `--worktree`, which are the
nearest precedent. Nothing new was invented; placement follows the existing flag
block in each table (after `--worktree`/`--park`, before the model/session row).

**Minimal refactor gate.** No refactor. Five insertions across two files, each a
whole table row or list bullet; no existing line was rewritten.

**Edits.**

- `claude/CAPABILITIES.md` — +2 lines. The `--deep` trigger row (placed last in
  the flag block, before `/model <name>`), and a §"Agent-neutrality cross-check"
  bullet placed *above* the `--worktree` + `--park` bullet so the list runs
  covered-first: `--deep`'s contract-layer site is ledgered, theirs partly is
  not, and the new bullet says which by naming the ledger row's Section cell.
- `docs/PLATFORMS.md` — +3 lines, one row per non-stub agent table. The three
  are deliberately **not** copies. Each differs in the syntax column, which is
  where the platforms actually diverge:
  - **Grok Build** / **Cursor** — no wrappers ship; the canonical body is loaded
    directly and `--deep` lives *inline* in its own steps, so unlike `--debug` /
    `--park` there is no lazy fragment to resolve. Stated positively rather than
    by copying the fragment sentence that does not apply.
  - **Codex CLI** — a wrapper does ship, already naming `--deep` in its
    `description:` and delegating straight to the canonical body: the
    direct-routing shape the `--park` row describes, not the two-step SOP hop
    `--fast` / `--debug` take through `ft-task`.
  - The "when to reach for it" column then routes each to that platform's own
    structured-ask story, because the pre-pass is three structured-ask gates:
    observed working under Grok ([[CORE-257]]), native under Cursor, and
    degraded to prose under Codex by its §"Translation rules" — a real cost
    difference an operator should weigh before passing the flag. Cursor's row
    additionally separates `--deep` from Plan mode two rows below it, the one
    neighbouring surface on that table it could be confused with.

**Deliberately untouched.** The three stub sections (Pair I's section guard
exempts them, and a row there would assert unverified availability);
`docs/AGENT-COMPAT.md` (structural by its own scope claim; Pair I's fourth
property records the non-mirroring as deliberate); both `**Last verified:**`
stamps (no dogfood run, no version bump — [[CORE-475]]'s precedent); and
`docs/PLATFORMS.md` §"Worked example: Claude Code", per the Discovery Notes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface changed

**Testing Notes:**

**Pair I, both directions.** Baseline at HEAD before any edit: silent, roster
`--fast --unattended --debug --worktree --park`. After the `CAPABILITIES.md` row
alone (the deliberate mid-state), it fired with exactly three findings —
`Grok Build`, `Codex CLI`, `Cursor`, each `:: --deep` — and zero false positives:
the three stub sections stayed exempt through the section guard, confirming that
guard still behaves as [[CORE-460.3]] documented. After the three PLATFORMS rows:
silent, roster now six flags. The new row is therefore verified to be *seen* by
the gate, not merely present near it.

**Neighbouring gates, no regression.** Pair J (silent — `--deep` was already in
`ft-epic-discovery.md`'s `argument-hint:` from [[CORE-475]]), Pair F both halves
(silent), Pair G (silent), and the wrapper-name invariant (silent).

**`AGENTS.md` §"Validation" set, all six commands green:** 470 viz tests across
25 files, `tsc --noEmit` clean, `eslint src` clean, `node --test
tools/update-adopters.test.mjs` 37/37, both `node --check`s clean. These are
unaffected by a docs-only diff and were run as regression cover, not as evidence
for the change.

**Quality assertions.** No code changed, so the code-facing half is `N/A`. The
documentation-facing half was asserted from the actual diff: five insertions, no
line rewritten; no duplication — the three PLATFORMS rows differ in their syntax
and reach-for columns exactly where the platforms differ, which is the
restatement Pair I asks for rather than a copy; no dead or orphaned text; no new
public surface (the flag already shipped — this documents it); and the two
`**Last verified:**` stamps were left alone deliberately, since a doc edit is
not a dogfood observation.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `AGENTS.md` | no change — its peer-skill roster is names-only by its own `KEEP IN SYNC` comment, flagged for `/ft-file-followup`'s park priorities only |
| `SPEC.md` | no change — this task adds wiring-layer rows only; §"Operator-gate cues" is untouched and the banner count is unaffected |
| `docs/MIGRATION.md` | no change — its flag mentions are identity notes on two retired skills folded into flags, not a roster |
| `claude/AGENTS-snippet.md` | no change |
| `codex/AGENTS-snippet.md` | no change — wiring commands only; the Codex `--deep` story lives in the trigger table and the wrapper's own `description:` |
| `cursor/AGENTS-snippet.md` | no change — thin wiring only |
| `grok/AGENTS-snippet.md` | no change — thin wiring only |
| `docs/CONVENTIONS.md` | no change — §"GitHub Actions CI" names `Pairs D and F–J`; no pair was minted or removed |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — the `SPEC/epic.md` ledger row already names the §"Optional deep pre-pass" bold label; this task adds no contract-layer surface, so no new row |
| `docs/PLATFORMS.md` | **updated** — a `--deep` row in each of the Grok Build, Codex CLI, and Cursor trigger tables |
| `claude/CAPABILITIES.md` | **updated** — the `--deep` trigger row plus its §"Agent-neutrality cross-check" bullet; `**Last verified:**` stamp untouched (no version bump, no dogfood run in this cut) |
| `docs/AGENT-COMPAT.md` | no change — structural matrix; its own §"Scope of this matrix" defers per-agent triggers to PLATFORMS |
| `docs/EXTERNAL-AGENTS.md` | no change — delegation, handoff, and the unattended posture are untouched; `--deep` stages an in-session epic filing |
| `docs/WORKTREES.md` | no change |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Gave `--deep` the `claude/CAPABILITIES.md` row it had lacked since it shipped,
and carried the obligation that row creates through to all three non-Claude
trigger tables — so the operator flag that adds a three-stage pre-pass to
`/ft-epic-discovery` is now documented on the same footing as `--debug`,
`--park`, and `--worktree`, on every platform that can reach it.

The coupling is what made this a task rather than a closure fix, and it is
mechanical: Pair I derives its flag roster from `CAPABILITIES.md` and holds every
`docs/PLATFORMS.md` agent section that already names ≥1 flag to the *full*
roster. Adding one row therefore moved the release gate's own target. The
mid-state was tested on purpose — with the `CAPABILITIES.md` row in and the
platform rows out, Pair I fired with exactly three findings, one per non-stub
section, and none against the three stubs.

Evidence: 2 files, 5 insertions, no line rewritten. Pair I verified both
directions (silent at baseline → three findings at the mid-state → silent after);
Pairs F, G, J and the wrapper-name invariant re-ran silent; the full `AGENTS.md`
§"Validation" set passed (470 viz tests, typecheck, lint, 37 updater tests, both
`node --check`s).

Refactors: none — five additive rows in shapes the files already declare.
Deliberately left alone, each for a stated reason: the three stub sections, both
`**Last verified:**` stamps, `docs/AGENT-COMPAT.md`, and — recorded in Discovery
Notes as an observation, not fixed — `docs/PLATFORMS.md` §"Worked example: Claude
Code", whose prose flag list has been a flag short since `--unattended` shipped.
That is a different surface no gate reads, and a different fix shape
(de-enumerate to a §-pointer, as [[CORE-460.3]] did for the non-Claude asides).

Maintainability effect: the last flag missing from the capability roster is now
in it, so `CAPABILITIES.md` is a complete answer to "which flags change how a
skill runs" rather than a nearly-complete one — and because Pair I derives from
that file, the roster it enforces grew by one with no edit to the check.

**Archived:** 2026-08-25
