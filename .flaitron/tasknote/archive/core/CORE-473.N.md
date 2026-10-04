---
title: unattended-orchestration audit
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473, CORE-473.1, CORE-473.2, CORE-473.3, CORE-473.4, CORE-473.5, CORE-473.6]
---

# CORE-473.N | unattended-orchestration audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]]

## 🎯 Goal

Verify the completed `CORE-EPIC-473` (`unattended-orchestration`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-473.N — audit CORE-EPIC-473` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-473.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-473.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-473` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-473.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic (unattended-orchestration)
- [[CORE-473.1]] — epic Discovery; filed the child cohort
- [[CORE-473.2]] — `--unattended` operator posture (SPEC/gates.md)
- [[CORE-473.3]] — `park-reason` frontmatter key
- [[CORE-473.4]] — `--unattended` runner wiring + roster
- [[CORE-473.5]] — reachable epic-close + interrupted resume
- [[CORE-473.6]] — orchestration contract (docs/EXTERNAL-AGENTS.md)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-473.N` invoked explicitly; Step 2 pre-flight passed cleanly — parent `CORE-EPIC-473` active, `.N` is the canonical reserved audit child, all six implementation children `[x]`, no early-audit partial cohort. Full cohort available for the coherence pass.

- [x] Read relevant source files — all six archived cohort tasknotes read (Goal + Acceptance + Implementation Notes + Final Summary); no probe needed, the read set was known and bounded at six files

- [x] **Best Practices Review** — the cohort is a contract/docs-layer change with no module boundaries. Touched responsibilities are documentation surfaces owned by four canonical homes (`SPEC/gates.md` posture · `SPEC.md` reason key · `SPEC/blocked.md` lifecycle · `docs/PLATFORMS.md` per-agent wiring), with one shared executable fragment (`claude/skills/ft-task/unattended-mode.md`). Duplication was the epic's live risk and every child managed it by pointing rather than restating — the audit's job was to verify the pointers agree, which is where all three findings landed.

- [x] **Archive skim** — self-referential for this audit; the cohort *is* the archive set. No non-cohort `CORE-473` hits in `archive/core/`.

- [x] **Drift check** — cited surfaces re-verified against HEAD, not recalled: `SPEC.md` park-reason table carries all 7 codes; `SPEC/gates.md:548` carries the `/ft-close-epic` not-a-superset carve-out; all 6 park-reason codes in live use are inside the closed set; `viz/src/tasknote.ts:1` already types `blocked`. Three drift items found (below) — all cohort-created, none pre-existing.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Assumptions: (1) audit scope is the full six-child cohort; (2) inline fixes are limited to cohort-internal contradictions, with content *additions* to public-facing prose deferred to follow-up.

- [x] Subtasks above populated with concrete, ordered steps — the scaffold's canonical epic-audit list stands; no scope shift surfaced.

**Discovery Notes:**

**Cohort inventory (six children, all closed 2026-08-25).** The epic shipped in strict contract-then-wiring order, and each child's deliverable is a distinct layer:

| Child | Deliverable | Surface |
|---|---|---|
| `.1` | Epic Discovery — filed `.2`–`.6`, resolved four scoping questions | PLAN.md only |
| `.2` | `--unattended` posture: five gate conversions, park definition, never-relaxed list | `SPEC/gates.md` +134/−4 (3 files) |
| `.3` | `park-reason:` key — 6-code closed set, write/clear rules, `blocked.md` widening | `SPEC.md` + `SPEC/blocked.md` +72/−5 |
| `.4` | Runner wiring — 3 runners, 3 stubs, CAPABILITIES, PLATFORMS ×3, SOP | 15 files +232/−50 |
| `.5` | `/ft-close-epic --unattended` + interrupted-resume; 7th code `interrupted` | 15 files +227/−28 |
| `.6` | Orchestration contract — 6 numbered rules; corrected 2 false claims | `docs/EXTERNAL-AGENTS.md` +38/−7 (3 files) |

**The cohort's own deferral chain resolved correctly.** `.2`, `.4`, and `.5` each recorded `docs/EXTERNAL-AGENTS.md`'s two false claims as stale-and-deferred rather than fixing them; `.6` paid that debt. Verified at HEAD: `grep -c` for both original claims returns 0/0. The deferral discipline held — no child landed a conflicting edit on `.6`'s surface.

**One explicit hand-off to this audit.** `.6` deferred `docs/GLOSSARY.md` — no `--unattended` / `park-reason` entry — "flagged for [[CORE-473.N]] rather than expanded here." Verified and **upheld as correct**: `GLOSSARY.md` carries no `--fast`, `--debug`, `--worktree`, or `park-reason` entry either, so nothing asymmetric was created, and the file is not in the AI-referenced ledger. Adding one flag entry to a glossary that documents no flags would be the drift, not the fix. No action.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — each of the three inline fixes was written from an existing correct sibling rather than composed fresh: F1 from the three runners' `argument-hint` lines, F2 from `claude/AGENTS-snippet.md`'s "On the three runners … On `/ft-close-epic` there is no `--fast` to superset" split, F3 from the row's own surviving structure. No new shape.

- [x] **Minimal refactor gate** — no refactor. Three edits, +5/−5 total, each correcting a statement the cohort itself made false.

- [x] Implemented the minimal solution — three inline fixes applied; one finding deferred to follow-up (below)

- [x] Updated/added tests for non-trivial behavior — **N/A.** No code changed; all three edits are markdown prose/frontmatter. The cohort's invariants are enforced by `/ft-release` §7.1 drift pairs, which were run rather than added to.

**Implementation Notes:**

**Cohort coherence: strong.** Five verification passes over the cohort's cross-cutting claims, run by command rather than read by eye:

| Check | Result |
|---|---|
| `park-reason` codes in live use vs. `SPEC.md` closed set | 6 codes used, all inside the 7-code set; no invented value |
| `/ft-release` §7.1 **Pair B** (Claude ↔ Codex `description:` flags) | clean |
| `/ft-release` §7.1 **Pair E** (`ft-flowtron` roster rows + flags) | clean |
| `/ft-release` §7.1 **Pair I** (CAPABILITIES ↔ 3 non-Claude trigger tables) | clean |
| `AWAITING APPROVAL` count / new cue glyphs | 66 → 66; zero glyphs on added lines — the CORE-065 two-banner cap holds |
| Validation suite | `npm --prefix viz test` 470/470 · `node --test` 37/37 · `git diff --check` clean |

The four roster surfaces the epic had to keep aligned (`claude/CAPABILITIES.md`, `docs/PLATFORMS.md` ×3, the Codex mirrors, `ft-flowtron`'s bundled table) are consistent, and the deferral chain from `.2`/`.4`/`.5` into `.6` closed cleanly. The three findings below are all *narrow* — none is a design miss, and none required reopening a child's decision.

**F1 — `claude/commands/ft-close-epic.md:3`: `argument-hint` omitted `--unattended`. Fixed inline.**
The stub's *body* documented the flag (line 8, added by `.5`), but its `argument-hint` read `<AUDIT-SUBTASK-ID>` alone while every other flag-bearing stub lists its flags there (`ft-task`, `ft-micro-task`, `ft-goal-task`, `ft-file-followup`, `ft-refactor`, `ft-spec`). `argument-hint` is what Claude Code renders in the slash-command picker — the flag was invisible at the one surface an operator reads *before* typing. This is precisely the [[CORE-460.3]] class the epic kept citing ("a flag missing from a mirror since the day it shipped"), and it slipped because no drift pair covers `argument-hint`: Pair B and Pair E are `description:`-derived, Pair I covers CAPABILITIES ↔ PLATFORMS. Fix: `argument-hint: <AUDIT-SUBTASK-ID> [--unattended]`.

**F2 — `docs/EXTERNAL-AGENTS.md:61` rule 1: unqualified `--fast` superset claim across all four entry points. Fixed inline.**
The rule read *"It is a strict superset of `--fast` — never pass both … Four runners accept it (`/ft-task`, `/ft-micro-task`, `/ft-goal-task`, `/ft-close-epic`)."* Both halves are wrong for the fourth: `/ft-close-epic` never accepted `--fast` (`SPEC/gates.md:548`, and `.5`'s whole carve-out), and it is not a runner — the cohort is otherwise careful to say "the three runners" (`unattended-mode.md:9`, `claude/AGENTS-snippet.md:23`, `SKILL.md:33`). This is the highest-consequence of the three: `.6` shipped this section explicitly as *the contract an orchestrator author reads before the SPEC*, so an unqualified superset claim here is the one place a caller would form the wrong model without ever opening `gates.md`. Cause is ordering — `.6` ran after `.5` but its acceptance was scoped to neutrality, the six-rule DRY design, and the two *filed* corrections; the carve-out was not on its checklist. Fix follows `claude/AGENTS-snippet.md`'s established split verbatim: three runners where it is a superset, `/ft-close-epic` where it carries the posture directly. Rule 4's bare *"re-invoking the same runner"* widened to *"the same skill"* in the same edit — `/ft-close-epic` also parks (its Phase 1→2 gate, per `.5`), so "runner" excluded the one resume case a caller is most likely to hit. Rule 6 left alone: *"the epic-close runner"* names its own referent, so no misread is possible.

**F3 — `docs/AGENT-NEUTRALITY.md:41`: rationale said "both rows" after the row became three. Fixed inline.**
`.4` caught that this ledger row described the SOP primitives table as two rows when its absorption made it three, and fixed the row's *inventory* half — but its *rationale* half still read "both rows lead with the concept" with only two concept-quotes. Verified the substantive claim still holds for all three (the `unattended mode` row does lead with "no operator is present to answer a gate" and demotes the flag to a parenthetical), so the fix is the count and the third quote, not the argument.

**Deferred to follow-up — `README.md` §"Sessions, loops, and sub-agents" (F4).**
That section is the project's public account of *safe autonomy patterns*, and its `--fast` bullet calls it "the sanctioned hands-off mode." Post-`CORE-473` that is incomplete in exactly the distinction the epic exists to draw: `--fast` means "don't ask me" with an operator present; `--unattended` means nobody is there at all. The section even closes with the contract-not-runtime framing (*"the runtime lives in the runner; the contract lives in flowtron"*) that the posture instantiates a second time — so the gap is conspicuous. No child touched `README.md`, and it is entry #1 in the AI-referenced ledger.

Not fixed inline, deliberately: F1–F3 are corrections of statements the cohort made false, while this is a **content addition to public-facing positioning prose** — the README is the front door, and the bullet's framing is an authoring call rather than a drift repair. Filed as a `/ft-file-followup` candidate below.

**Doc-drift sweep (fixed line) — 17 entries, 2 updated, 1 follow-up, 14 no change.** Recorded in Phase 4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the full `AGENTS.md` §"Validation" roster ran despite no code changing, since the audit's job is to prove the cohort left nothing broken: `npm --prefix viz test` **470/470** (25 files) · `node --test tools/update-adopters.test.mjs` **37/37**

- [x] Ran lint/type-check on changed code — **N/A for the three edits** (markdown prose + one frontmatter scalar; no linted surface). In place of a linter, the cohort's own gates were re-run *after* the edits: Pairs B / E / I clean, `AWAITING APPROVAL` 66 → 66, zero cue glyphs on added lines, `git diff --check` clean.

- [x] **Quality assertions** — no duplication introduced: F2 was written to *point* at the carve-out's canonical owner (`SPEC/gates.md`) in the doc's own established shape rather than restate the posture, which is the DRY constraint `.6` set for that section and the one an audit is most likely to violate. No dead prose, no public-surface growth (F1 documents an already-shipped flag; it adds none).

- [x] (frontend) Asked the user for visual confirmation — **N/A.** No frontend surface; `viz/` is untouched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Verification was the deliverable here, so every claim in Implementation Notes is command-backed. Full record:

```
npm --prefix viz test                       → 25 files, 470 tests passed
node --test tools/update-adopters.test.mjs  → 37 pass, 0 fail
git diff --check                            → clean
Pair B (claude↔codex description flags)     → no output
Pair E (ft-flowtron rows + flags)           → no output, diff exit 0
Pair I (CAPABILITIES ↔ PLATFORMS ×3)        → no output
AWAITING APPROVAL, tracked *.md             → 66 before, 66 after
cue glyphs on added lines                   → none
park-reason codes in use vs. closed set     → 6/6 inside the 7-code set
```

Pairs A / C / F / G / H were not run: none touches a surface this audit or the cohort edited (templates roster, template back-links, park-priority flags, `--worktree` mirrors, validation-command roster). Pairs B / E / I are the three that cover the flag-and-roster surfaces `CORE-473` actually moved, plus the two `/ft-release` gates the cohort's own children ran. Noted rather than silently skipped.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 17 entries, per-entry verdict below

| # | Entry | Verdict |
|---|---|---|
| 1 | `README.md` | **Follow-up (F4)** — §"Sessions, loops, and sub-agents" still calls `--fast` "the sanctioned hands-off mode" with no `--unattended` bullet. Real gap; deferred as a content addition to public-facing prose, not a drift repair |
| 2 | `AGENTS.md` | no change — its peer-skill roster is declared names-only by its own `KEEP IN SYNC` comment, excepting `/ft-file-followup`'s park flags (Pair F); no gate covers `--unattended` here |
| 3 | `SPEC.md` | no change — `.2`/`.3`/`.5` current; park-reason table verified at 7 codes, `gates.md` enumeration pointer accurate |
| 4 | `docs/MIGRATION.md` | no change — a new *flag* is not a wiring change (no skill dir added); the roster derives from `claude/AGENTS-snippet.md`, and §"Skills retired so far" takes retirements only |
| 5 | `claude/AGENTS-snippet.md` | no change — `.5` current; carries the correct three-runners / `/ft-close-epic` split. Used as the model for fix F2 |
| 6 | `codex/AGENTS-snippet.md` | no change — wiring commands only (recorded as deliberately not a trigger mirror, `/ft-release` §7.1 Pair I) |
| 7 | `cursor/AGENTS-snippet.md` | no change — thin wiring only, same rationale |
| 8 | `grok/AGENTS-snippet.md` | no change — thin wiring only, same rationale |
| 9 | `docs/CONVENTIONS.md` | no change — its `drift` CI job runs Pairs A/B/C/E; all still pass after this audit's edits |
| 10 | `CONTRIBUTING.md` | no change — solo-maintenance model, no flag surface |
| 11 | `SECURITY.md` | no change — `.2` correctly extended the first-run advisory to name `--unattended`; verified at HEAD |
| 12 | `docs/AGENT-NEUTRALITY.md` | **updated (F3)** — `:41` rationale said "both rows" after `.4` made the registered set three; count and third concept-quote corrected |
| 13 | `docs/PLATFORMS.md` | no change — `.4`/`.5` current across all three non-Claude tables; Pair I clean |
| 14 | `claude/CAPABILITIES.md` | no change — `--unattended` row present and accurate. §"Last verified" reads `v5.19.0 · 2026-08-24`, which predates the row by one day; the stamp's declared update trigger is the next `/ft-release` cut, so re-stamping here would forge a verification that has not happened |
| 15 | `docs/AGENT-COMPAT.md` | no change — §"Scope of this matrix" declares it structural and defers per-agent triggers to `PLATFORMS.md`; its absence is recorded as deliberate in Pair I's notes, not an oversight |
| 16 | `docs/EXTERNAL-AGENTS.md` | **updated (F2)** — rule 1's unqualified `--fast` superset claim scoped to the three runners; rule 4 "runner" → "skill" |
| 17 | `docs/WORKTREES.md` | no change — the posture does not alter worktree mechanics; `.1`'s Fan-out surface untouched by this cohort |

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active parent per SPEC/epic.md §"Child placement invariant", tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below; surfaces at the 📦 gate alongside the parent-flip prompt

**Final Summary:**

Audited the closed `CORE-EPIC-473` (`unattended-orchestration`) cohort — six children shipping the `--unattended` posture, the `park-reason:` key, runner wiring, the epic-close and resume entry points, and the published orchestration contract. **The cohort is coherent.** Its hardest structural risk was duplication — by `.6` the posture was specified across four canonical owners plus three per-agent wiring tables — and every child managed it by pointing rather than restating, so the audit's job reduced to verifying the pointers agree. They do: all six `park-reason` codes in live use sit inside the 7-code closed set, `/ft-release` §7.1 Pairs B / E / I are clean, the `AWAITING APPROVAL` count is unmoved at 66 with zero cue glyphs on added lines, and the deferral chain in which `.2`, `.4`, and `.5` each recorded `docs/EXTERNAL-AGENTS.md`'s two false claims rather than fix them closed correctly at `.6` (both claims `grep -c` → 0). Full validation green: viz 470/470, `node --test` 37/37.

Three narrow misses, all fixed inline — **3 files, +5/−5**, every edit correcting a statement the cohort itself made false rather than reopening a decision. The consequential one is **F2**: `docs/EXTERNAL-AGENTS.md` rule 1 asserted `--unattended` is "a strict superset of `--fast`" across all four entry points and called them "four runners", when `/ft-close-epic` never accepted `--fast` and is not a runner — the exact carve-out `.5` established and six sibling surfaces state correctly. It matters more than its size because `.6` shipped that section explicitly as the contract an orchestrator author reads *before* the SPEC, so it is the one place a caller forms the wrong model without ever opening `gates.md`. The cause was ordering, not carelessness: `.6` ran after `.5` but its acceptance was scoped to neutrality, the six-rule DRY design, and the two corrections it had been *filed* to make. **F1** left `--unattended` out of `claude/commands/ft-close-epic.md`'s `argument-hint` while the stub body documented it — invisible in the slash-command picker, the one surface an operator reads before typing, and uncaught because no drift pair covers `argument-hint` (Pairs B and E are `description:`-derived, Pair I covers CAPABILITIES ↔ PLATFORMS). **F3** was residual: `.4` fixed the inventory half of an `AGENT-NEUTRALITY.md` ledger row it had made stale, leaving the rationale half saying "both rows" of three.

One finding deferred rather than absorbed. `README.md` §"Sessions, loops, and sub-agents" — the project's public account of safe autonomy patterns — still presents `--fast` as "the sanctioned hands-off mode" with no `--unattended` bullet, which is incomplete in precisely the distinction this epic exists to draw, in the section that already closes with the contract-not-runtime framing the posture instantiates a second time. It is filed for `/ft-file-followup` rather than fixed here because it is a content addition to public-facing positioning prose, not a drift repair, and the front door's framing is an authoring call. `docs/GLOSSARY.md`, explicitly handed to this audit by `.6`, was checked and **upheld as correctly absent**: it carries no `--fast`, `--debug`, `--worktree`, or `park-reason` entry either, so adding one would create the asymmetry rather than close it.

**Maintainability effect.** After three one-line corrections, an orchestrator author reading `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" gets an accurate account of which four skills take the flag and how the fourth differs, and an operator gets the flag in the picker where they will actually see it. The audit also names a real gate gap for a future cut — `argument-hint` is a documented flag surface that no `/ft-release` §7.1 pair binds, which is how F1 shipped and stayed.

**Parent flip: confirmed.** `CORE-EPIC-473` flipped to stub form and the full cohort (`.1`–`.6` + `.N`) moved atomically to the top of `## Completed` in the same commit; `(none)` restored under `## High`, which the cohort had been the sole entry of.

**Archived:** 2026-08-25
