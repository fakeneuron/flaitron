---
title: `--park`/`--worktree` flag parity
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-460, CORE-460.2, CORE-460.4, CORE-456.2, CORE-438.5, CORE-458]
touches:
  - docs/PLATFORMS.md
  - docs/AGENT-COMPAT.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-460.3 | `--park`/`--worktree` flag parity

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-460]] · [[CORE-460.2]] · [[CORE-460.4]] · [[CORE-456.2]] · [[CORE-438.5]] · [[CORE-458]]

## 🎯 Goal

Close the two-flag drift in the Cursor + Grok platform surfaces — the trigger
tables gain the missing `--park` / `--worktree` rows, every other mirror stops
enumerating and points at them instead — and mint a Pair I release gate so the
non-Claude trigger tables are held to `claude/CAPABILITIES.md`'s flag roster.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md` §"Non-Claude capability triggers" → the Grok Build and Cursor trigger tables each carry a `--park` and a `--worktree` row in the established four-column shape
- [x] The four PLATFORMS prose asides that enumerated a stale two-flag roster (Today's-surface Grok row, Grok quirk row, Cursor + Grok worked-example operator-flag bullets) point at §"Non-Claude capability triggers" instead of restating flags
- [x] `docs/AGENT-COMPAT.md`'s Grok and Cursor rows de-enumerate to a pointer, matching the file's own §"Scope of this matrix" claim that the matrix is structural
- [x] `/ft-release` §7.1 gains **Pair I** — `claude/CAPABILITIES.md` flag rows ↔ PLATFORMS non-Claude trigger-table sections — deriving both the flag roster and the section list rather than listing either
- [x] Pair I prints nothing at HEAD after the edits, and negative-tests as firing on the pre-fix table shape
- [x] Pairs F and G still print nothing (no regression from the de-enumeration)
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — per-entry verdict

## 🧩 Subtasks

- [x] Add `--park` + `--worktree` rows to the Grok Build trigger table
- [x] Add `--park` + `--worktree` rows to the Cursor trigger table
- [x] De-enumerate PLATFORMS:38, :366, :326-327, :346-347 to §-pointers
- [x] De-enumerate AGENT-COMPAT's Grok + Cursor rows to a pointer
- [x] Mint Pair I in `/ft-release` §7.1 (prose + derived check + guard rationale)
- [x] Run Pair I positive + negative; re-run Pairs F and G
- [x] Surface the CORE-460.4 downstream-impact reconciliation for confirmation
- [x] Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-460]] — parent epic: platform-parity gate widening
- [[CORE-460.2]] — sibling: fixed the `claude/commands/*.md` half and named this task as owner of the codex/cursor/grok mirrors in its own doc sweep; surveyed and deliberately declined to mint Pair I
- [[CORE-460.4]] — follow-on: Codex trigger-table backfill; its PLAN line's "9-row shape" claim goes stale when this task takes Cursor/Grok to 11 rows
- [[CORE-456.2]] — added `--fast` (and `--debug`) to the Grok trigger table and the AGENT-COMPAT Grok row; the enumerations this task removes entered there
- [[CORE-438.5]] — authored the Cursor 9-row trigger table this task extends
- [[CORE-458]] — most recent edit to the Grok trigger table; established the row-shape idiom being extended

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every drift site in the PLAN line confirmed live at HEAD by grep,
  and [[CORE-460.2]]'s doc sweep explicitly deferred four entries to this task.
  The gate half is the epic's stated purpose.

- [x] Read relevant source files — `docs/PLATFORMS.md` (Today's surface, the four
  worked examples, Grok adoption notes, all seven §"Non-Claude capability triggers"
  sections), `docs/AGENT-COMPAT.md` (whole), `claude/CAPABILITIES.md` (whole),
  `grok/` + `cursor/` + `codex/AGENTS-snippet.md`, and `/ft-release` §7.1 Pairs A–H.
  No probe — named files, known shape.

- [x] **Best Practices Review** — no code changes; markdown contract + wiring
  surfaces only. Two established shapes govern the work. (1) The per-platform
  trigger table's fixed four-column row (`Trigger | Syntax | What it controls in
  flowtron | When to reach for it`), used by all three live tables and most
  recently extended by [[CORE-458]] — the new `--park` / `--worktree` rows extend
  it rather than inventing a shape. (2) §7.1's **derived-not-listed** check idiom,
  minted by Pair F's command-stub half: select the surfaces by scan, guard with
  `continue` so a surface that commits to *no* roster is skipped, and hold only
  the ones that commit to a partial roster. Pair I applies that idiom one level up
  (sections instead of files). No refactor required; no deferred cleanup.

- [x] **Archive skim** — grepped `archive/core/` for `docs/PLATFORMS.md`,
  `docs/AGENT-COMPAT.md`, `CAPABILITIES.md`, then read the four notes that
  *authored* the surfaces in scope:
  - `CORE-456.2.md:26,30,37` — the origin of both enumerations being removed. Its
    Acceptance says the Grok trigger table "documents `--fast` (and `--debug`) as
    available when those bodies load", and it wrote the same clause into the
    AGENT-COMPAT Grok row. Accurate for the flag roster as CORE-456.2 read it;
    `--park` / `--worktree` shipped on other skills. **No ⚠️ Superseded pointer** —
    this is the spec-evolution case the write-once carve-out explicitly excludes,
    not a falsified factual claim.
  - `CORE-438.5.md:133,175` — authored the Cursor "9-row trigger table" and enrolled
    Cursor as the 4th dogfood-gated row. The row count is a historical fact about
    what that task shipped; this task takes it to 11 without falsifying it.
  - `CORE-458.md:107` — the row-shape precedent: "Extended the existing
    `| Trigger | Syntax | What it controls | When to reach for it |` row shape
    already used by all four per-platform trigger tables … Matched the Sub-agent
    row's phrasing style to Cursor's equivalent row for cross-row consistency."
    Followed here.
  - `CORE-460.2.md:107,176-186` — surveyed Pair I and **deliberately declined to
    mint it**, choosing to widen Pair F instead because its drift was one layer
    down. Its doc sweep names four entries "no change *in scope* — CORE-460.3's
    deliverable": `codex/`, `cursor/`, `grok/AGENTS-snippet.md`, `docs/PLATFORMS.md`
    operator-flag list, `docs/AGENT-COMPAT.md`. So the letter I is free and the
    hand-off is explicit.

- [x] **Drift check** — every PLAN-line claim verified against HEAD:
  - `docs/PLATFORMS.md:326-327` (Cursor worked example) and `:346-347` (Grok) →
    both read "same `--fast` / `--debug` spellings" (stale) ✓
  - `docs/PLATFORMS.md:380-392` (Grok table, 9 rows) and `:429-439` (Cursor table,
    9 rows) → neither carries a `--park` or `--worktree` row ✓
  - `docs/AGENT-COMPAT.md:37` (Grok row) → "`--fast` / `--debug` available when
    those bodies load" (stale); `:39` (Cursor row) → no flag clause at all. These
    are the "×2" ✓
  - `grok/AGENTS-snippet.md` → zero flag mentions of any kind, as is
    `cursor/AGENTS-snippet.md` (its structural twin). **De-scoped** — see
    assumption 4 below.
  - Two sites the PLAN line does **not** name carry the same stale sentence and are
    pulled in: `docs/PLATFORMS.md:38` (Grok row in §"Today's surface") and `:366`
    (Grok quirk table) — both "`--fast` / `--debug` are those bodies' trailing flags".
  - `claude/CAPABILITIES.md` flag rows confirmed as exactly four: `--fast` (30),
    `--debug` (31), `--worktree` (32), `--park` (33). Row 55 already records that
    `--worktree` is un-ledgered — unchanged by this task.
  - `/ft-release` §7.1 → Pairs A–H live; **Pair I is unused**. Pair G's check greps
    `docs/PLATFORMS.md` whole-file for `--worktree`, satisfied by the Claude worked
    example at `:280`, which is why it never saw this drift.
  - SPEC cross-check: `SPEC.md` §"Paper-complete guard" — the workflow-only carve-out
    does **not** apply; deliverables are real doc + skill files and stage with PLAN +
    archive in one commit. §"Tasknote frontmatter" write-once — no archived note is
    falsified (see Archive skim).

- [x] Asked clarifying questions OR logged "No clarifications needed"

  Two structured asks, both answered by the operator, both resolving toward
  **fewer restatements**:

  1. **AGENT-COMPAT treatment** → *de-enumerate to a pointer* (over widening both
     rows to four flags). The file's own §"Scope of this matrix" says the matrix is
     structural and per-agent triggers live in PLATFORMS.md; the enumeration was
     already off-scope.
  2. **Thin snippets** → *neither `grok/` nor `cursor/AGENTS-snippet.md` gets a flag
     sentence.* Both state they "own only the wiring commands and notes"; flags are
     trigger-reference content.

  Explicit assumptions carried into Phase 2:
  1. Applying the operator's stated preference consistently, the four PLATFORMS
     **prose asides** (`:38`, `:366`, `:326-327`, `:346-347`) also de-enumerate to
     within-file §-pointers rather than widening to four flags. Mixing the two
     treatments inside one file would be incoherent, and a pointer cannot drift.
  2. The **two trigger tables remain the enumerating surface** for non-Claude —
     they are the doc that claims to list triggers, and Pair I gates them.
     `claude/CAPABILITIES.md` stays the Claude-side SSOT.
  3. Pair I scopes its mirrors to §"Non-Claude capability triggers" sections only,
     derived by scan. Codex's table names no flag today and is correctly skipped by
     the guard; it is picked up automatically the moment [[CORE-460.4]] gives it a
     flag row. A gate that ships red gets commented out — this one ships green.
  4. The `grok/AGENTS-snippet.md` half of the PLAN line is **de-scoped by operator
     decision**, not overlooked. Recorded in Acceptance as an explicit non-goal
     rather than silently dropped.
  5. `docs/VERSION-HISTORY.md` is a historical record and is never retro-patched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The drift class is the epic's stated theme in its purest form: `--fast` and
`--debug` reached the Cursor/Grok surfaces because [[CORE-456.2]] and
[[CORE-438.5]] were *about* those flags. `--park` and `--worktree` shipped on
other skills, so nothing carried them across — and Pair G, the one gate that
mentions `--worktree`, greps `docs/PLATFORMS.md` whole-file and is satisfied by
an unrelated Claude bullet 90 lines away. The gate existed and still lagged the
surface it guarded.

Six of the eight sites turned out to be prose asides rather than rosters, which
is what makes the operator's two answers load-bearing: the fix is not "add two
more flags in eight places" but "let two tables enumerate and make the other six
point at them." That shrinks the gated surface from eight mirrors to two derived
sections — and Pair I then needs neither a flag list nor a section list.

**Downstream impact (pending confirmation).** Taking Cursor/Grok from 9 rows to
11 makes [[CORE-460.4]]'s PLAN line ("bring the 4-row Codex table to Cursor/Grok's
**9-row** shape") stale. Surfaced in Phase 2 before the edit lands.

Discovery surfaced no significant scope deviation — the two asks narrowed the
deliverable rather than redirecting it → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended two established shapes rather than inventing
  either. (1) The trigger tables' fixed four-column row, following [[CORE-458]]'s
  own instruction to match a sibling row's phrasing style for cross-row
  consistency: the new `--park` / `--worktree` rows mirror the existing
  Force-skip / Debug rows' "same availability as `--fast`" framing on Grok (where
  compat-surface loading is the real caveat) and drop it on Cursor (where it
  isn't), exactly as the existing rows already differ between the two tables.
  (2) §7.1's derived-not-listed check idiom from Pair F's command-stub half —
  Pair I applies the same `continue`-style guard one level up, over sections
  instead of files. No new pair-count statement exists to update (verified: the
  "four such pairs" at `SKILL.md:377` is a CORE-EPIC-420 historical fact), and
  the pairs are not enumerated anywhere outside §7.1.

- [x] **Minimal refactor gate** — no refactor. Six surgical doc edits, four
  new table rows, one appended pair block. Pairs A–H are byte-identical.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the check fence **is** the
  test; positive, negative, and derivation-half tested below rather than asserted.

**Implementation Notes:**

Ten edits across three files, in two classes.

**Enumerate (the two surfaces that claim to list triggers):**

1. `docs/PLATFORMS.md` §"Non-Claude capability triggers" → Grok Build table: new
   `Park mode (--park)` + `Worktree handoff (--worktree)` rows (9 → 11)
2. Same, Cursor table (9 → 11)

**De-enumerate (six prose asides that read as complete two-flag rosters):**

3. `docs/PLATFORMS.md:38` — Grok row in §"Today's surface"
4. `docs/PLATFORMS.md:366` — Grok quirk table, skill/command-primitives row
5. `docs/PLATFORMS.md:326-327` — Cursor worked-example operator-flags bullet
6. `docs/PLATFORMS.md:346-347` — Grok worked-example operator-flags bullet
7. `docs/AGENT-COMPAT.md:37` — Grok matrix row
8. `docs/AGENT-COMPAT.md:39` — Cursor matrix row (gains the clause; had none)

**Gate:**

9. `claude/skills/ft-release/SKILL.md` §7.1 — new **Pair I** after Pair H: prose
   (why Pairs B/E/G were all blind), the derived check, and four preserved-property
   bullets
10. `.flowtron/PLAN.md` — [[CORE-460.4]] reconcile edit (below)

**Derived, not listed** is the whole design. Pair F had to name five mirrors and
was blind to a sixth layer for three correction passes; Pair I names neither its
flags nor its sections. The roster comes from `CAPABILITIES.md`'s own row anchor
and the sections from the PLATFORMS heading scan, so a flag added to CAPABILITIES
*and* an agent section that later grows its first flag row are both covered the
day they land — verified by simulation below.

The section guard is why the gate can ship green rather than red. Codex's table
names no flag today ([[CORE-460.4]] owns that backfill) and the three stub
sections have no table at all; demanding four flags there would fire four false
positives on the check's first run. Only a section already committing to a partial
roster is held to the full one — Pair F's `continue` rationale verbatim, one level
up.

`tr '\n' ' '` is not cosmetic: BWK `awk` on macOS rejects a newline inside a `-v`
assignment (`awk: newline in string`), which is exactly how the first prototype
failed. The `F[i] != ""` guards absorb the trailing separator that introduces.

**Downstream-impact reconciliation.** The 9 → 11 row change reaches beyond this
task, so the scan ran over active PLAN entries before closure. One impacted row:
[[CORE-460.4]], **stale** — its line pinned Codex's target at "Cursor/Grok's
9-row shape." `CORE-460.N`, `CORE-EPIC-460`, and the `FE-EPIC-088` cohort are
**unaffected** (different surface). Operator confirmed the edit; the line now reads
11-row and names Pair I as already waiting for Codex's first flag row. No other
PLAN edits made.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — all four §7.1 fences touching
  this work, plus three Pair I scenarios

- [x] Ran lint/type-check on changed code — `N/A`: markdown doc + skill surfaces
  only. The repo's six validation commands cover `viz/` TS and `tools/*.mjs`,
  neither of which this task touches.

- [x] **Quality assertions** — no avoidable duplication (the point of the task was
  *removing* six restatements, not adding any; Pair I deliberately does not
  restate Pair F's or Pair G's lists). No dead code. No public-surface growth
  beyond one pair block inside an existing section — no new pair letter beyond the
  next free one, no pair-count statement to update, no external roster of pairs.
  No stale code-facing docs: the stale docs were the deliverable, and Pair I's
  fourth bullet records the two surfaces it deliberately does *not* police so
  their absence cannot be re-read later as an oversight.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no UI surface.

**Testing Notes:**

Positive — all four fences clean at HEAD after the edits:

| Check | Result |
|---|---|
| Pair F half 1 (five park mirrors) | no output |
| Pair F half 2 (command stubs) | no output |
| Pair G (`--worktree` mirrors) | no output |
| **Pair I** (CAPABILITIES ↔ trigger tables) | no output |

Pair F and Pair G were re-run specifically to prove the de-enumeration caused no
regression — Pair G greps `docs/PLATFORMS.md` whole-file for `--worktree`, and the
Claude worked example at `:280` plus the two new table rows keep it satisfied.

Negative — a gate that has never failed is unverified. Pair I was run against a
scratch copy of `docs/PLATFORMS.md` with the four new rows stripped (the exact
pre-fix shape):

```text
MISSING TRIGGER FLAG Grok Build :: --worktree
MISSING TRIGGER FLAG Grok Build :: --park
MISSING TRIGGER FLAG Cursor :: --worktree
MISSING TRIGGER FLAG Cursor :: --park
```

Four lines, naming exactly the drift this task fixed — and silent on the same run
for Codex and the three stub sections, confirming the guard.

Derivation half — a synthetic `| **`--newflag`** |` row spliced into a scratch
`claude/CAPABILITIES.md` produced the roster `--fast --debug --worktree --park
--newflag` and immediately reported:

```text
MISSING TRIGGER FLAG Grok Build :: --newflag
MISSING TRIGGER FLAG Cursor :: --newflag
```

This is the property Pair F's fixed list lacks: the gate widens itself when the
source roster grows, with no edit to the check.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md`
  §"AI-referenced docs" (17 entries). Every entry was grepped for the four operator
  flags; the verdicts below distinguish "no flag mention" from "mentions a flag but
  not as a platform roster":

  - `README.md` — no change; its one `--fast` (`:232`, within-task-autonomy bullet) is contract framing, not a platform roster
  - `AGENTS.md` — no change; its one hit is the park-priority roster (Pair F's surface, untouched here)
  - `SPEC.md` — no change; 7 hits, all contract-layer `--fast` / `--debug` semantics and the `sidequest/` path. No platform flag list
  - `docs/MIGRATION.md` — no change; 5 hits are the retired-skill replacement table (`:494-495`) and Grok/Cursor **wiring** paragraphs (`:72`, `:294`) that name no flags
  - `claude/AGENTS-snippet.md` — no change; 4 hits are per-skill usage clauses, not a platform roster
  - `codex/AGENTS-snippet.md` — no change; zero flag mentions, and Codex's trigger-table backfill is [[CORE-460.4]]
  - `cursor/AGENTS-snippet.md` — **no change, deliberately.** Zero flag mentions; operator decision to leave the thin snippets wiring-only (Discovery assumption 4)
  - `grok/AGENTS-snippet.md` — **no change, deliberately.** Same decision; this is the one PLAN-line deliverable de-scoped by the operator, recorded rather than dropped
  - `docs/CONVENTIONS.md` — no change; its single hit is an unrelated `CORE-321` reference
  - `CONTRIBUTING.md` — no change; zero hits
  - `SECURITY.md` — no change; its `--fast` (`:88`) is threat-model framing about suppressing pauses, unaffected by which flags exist
  - `docs/AGENT-NEUTRALITY.md` — no change. Checked specifically because this task edited `docs/AGENT-COMPAT.md`: the ledger tracks **contract-layer** Claude references, and its only relevant row (`:55`) says Claude sub-agent mechanics live in `claude/CAPABILITIES.md` and non-Claude approximations in `docs/PLATFORMS.md`. Still true — and more true after this task moved trigger detail *toward* PLATFORMS
  - `docs/PLATFORMS.md` — **updated** (2 new rows per table × 2 tables; 4 prose asides de-enumerated)
  - `claude/CAPABILITIES.md` — no change. It is Pair I's *source*, read but not edited; its `**Last verified:** v5.16.0 · 2026-08-09 (dogfooded; skipped @ v5.18.0)` stamp is untouched — no dogfood run happened here, and stamp writes belong to the release-driving session per `docs/AGENT-COMPAT.md` §"Reading the cells"
  - `docs/AGENT-COMPAT.md` — **updated** (Grok + Cursor rows de-enumerated to a pointer). Last-verified stamps untouched, same reasoning
  - `docs/EXTERNAL-AGENTS.md` — no change; zero hits, and no delegation/handoff semantics changed
  - `docs/WORKTREES.md` — no change; its `--worktree` (`:57`) documents the `/ft-goal-task` entry point, which this task cites but does not alter

  Out-of-set but checked: `claude/skills/ft-release/SKILL.md` is excluded from the
  cold-start sweep as a lazily-loaded skill body, and is a **deliverable** here
  rather than a drift site.

- [x] Closed

- [x] **Evidence-based recap** drafted

**Final Summary:**

Gave the Cursor and Grok trigger tables the `--park` and `--worktree` rows they
had been missing since those flags shipped, cut the six prose asides that were
restating a stale two-flag roster down to pointers, and minted `/ft-release`
§7.1 **Pair I** so `claude/CAPABILITIES.md`'s flag rows are now bound to the
non-Claude trigger tables by a check that derives both its roster and its section
list.

**Changed:** 4 files. `docs/PLATFORMS.md` (+4 table rows, 4 prose asides
de-enumerated), `docs/AGENT-COMPAT.md` (2 matrix rows), `claude/skills/ft-release/SKILL.md`
(+1 pair block: prose, a 12-line check, 4 preserved-property bullets),
`.flowtron/PLAN.md` (the confirmed [[CORE-460.4]] reconcile edit).

**Verification:** Pairs F (both halves), G, and I all clean at HEAD. Pair I
additionally negative-tested against a scratch copy with the four new rows
stripped — fires exactly 4 lines naming the real drift, silent on Codex and the
three stub sections — and its derivation half proven by splicing a synthetic
`--newflag` row into a scratch `CAPABILITIES.md`, which immediately demanded both
tables. Pairs F and G were re-run specifically to prove the de-enumeration caused
no regression.

**Refactors:** none made, none deferred. Pairs A–H are byte-identical.

**Scope note:** the `grok/AGENTS-snippet.md` half of the PLAN line was
**de-scoped by operator decision**, not missed — both thin snippets state they own
wiring commands only, and flags are trigger-reference content. `docs/AGENT-COMPAT.md`
was likewise de-enumerated rather than widened, matching its own §"Scope of this
matrix". Both decisions are recorded in Pair I's fourth property bullet so a later
reader cannot mistake their absence from the gate for an oversight.

**Documentation:** 17-entry AI-referenced doc sweep — 2 updated, 15 "no change",
with two of those carrying an explicit *deliberately* qualifier.

**Maintainability:** net **−4 mirrors**. The task removed six restatements and
added two gated table rows, so the surface that can drift shrank while coverage
grew. Where Pair F had to name five files and stayed blind to a sixth layer across
three correction passes, Pair I names neither its flags nor its sections: the next
flag added to `CAPABILITIES.md` is demanded of both tables the day it lands, and
Codex joins the gate automatically the moment [[CORE-460.4]] gives its table a
first flag row — no edit to the check either time.

**Archived:** 2026-08-21
