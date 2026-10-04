---
name: ft-seed
description: Seed `[unattended]` onto an existing `.flaitron/PLAN.md` in one attended pass — walk every open row with the `SPEC/unattended-candidacy.md` predicate, show the candidates with the token in place inside one prose review gate, write the token only on the rows the operator keeps, and commit the write. Use when the user asks to seed, bulk-mark, or sweep a plan for `[unattended]` rows. Attended-only, no flags; thin procedural skill, no tasknote.
---

# seed — bulk `[unattended]` seeding of an existing plan

You are seeding the `[unattended]` marker onto rows of a project's existing
`.flaitron/PLAN.md`. Every filing skill already *proposes* the marker for the
row it is about to write, but candidacy fires only at filing time — a plan
filed before that contract existed, or by hand, has no path to the token but
hand-editing. This skill is that path: one walk, one gate, and a write that
covers only what the operator confirmed. It is a **thin procedural skill** —
it edits PLAN.md rows and commits; it does **not** scaffold a tasknote. The
skill takes **no arguments and no flags**.

The skill is markdown-only — the assistant runs git inline via its Bash tool,
no shell scripts (per `SPEC/scope-boundaries.md` §"What flaitron does NOT
provide").

**The rule this skill exists under.** Flaitron itself never writes
`[unattended]` — seeding is an operator act (`SPEC/task-line-segments.md`;
`SPEC/unattended-candidacy.md` §"Recommend, never write"). This skill does not
change who writes the token. It changes *when the question is asked*: instead
of once per row at filing time, once per plan at the operator's request. The
operator's confirmation at Step 3 is the act; nothing unconfirmed reaches disk.

## Step 0 — Resolve paths, reject arguments

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail. `PLAN` is `.flaitron/PLAN.md` on both layouts; if it
is absent, bail — there is nothing to seed.

If `args` is non-empty, stop and say so: this skill accepts no task ID and no
flag. There is deliberately no `--fast` and no `--unattended` — a posture with
no operator act writes nothing (module §"Three postures"), so an operator-less
seeding run would be a walk that ends in a report, and the report already
exists as the `unattended-candidates:` line the filers emit. A surface that
accepts neither flag has only the attended branch; this is that surface.

## Step 1 — Read the contract, then walk the plan

**Read `<root>SPEC/unattended-candidacy.md` now**, in full — the predicate is
applied from that text, not from memory or from this file.

Read `PLAN`. Collect every **open** row — `- [ ]`, at any nesting depth — under
the four active headings `## High` / `## Medium` / `## Low` /
`## Future Opportunities`. `## Completed` is out of scope, and so is
`.flaitron/PLAN-ARCHIVE.md`; a closed row has nothing to dispatch. Also
collect, for clause 6, the checkbox state of every row (open or closed) so an
epic child's stem predecessor can be resolved without a second read.

Two classes of open row are **skipped before the predicate runs**, and are
reported as counts, not listed:

- **Already marked** — the row contains `[unattended]` anywhere on the line.
  A mis-positioned token (before `[model]`, inside the description) is the
  `SPEC/plan-parser.md` §"`[unattended]` / `[handoff]` mis-authoring
  footguns" case: name the row in the Step 3 report as `already marked —
  position looks off; not repaired`, and leave it. This skill seeds; it does
  not rewrite.
- **`[handoff]`** — clause 3 calls the marker definitive; the row is never a
  candidate and nothing else is consulted.

## Step 2 — Run the predicate over every remaining row

**`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures" — the module was Read at Step 1, before this walk).
Run its §"Candidacy predicate" over each remaining open row **as it stands in
the file** — the row text *is* the drafted line here: `[model]`, any
`[!critical]`, the description with its keyword screen, any `Blocked by`
clause, the parent-epic shape, and the epic-child rule. Every clause must
hold; when one is uncertain the row is not a candidate. A candidate is
**proposed, never seeded**: it is shown in the Step 3 review with the token
in place, and the token is written at Step 4 only if the operator's
confirmation keeps it. This skill accepts neither `--fast` nor
`--unattended`, so only the attended branch applies — the
`unattended-candidates:` emission line never fires from this surface. Neither
the candidacy nor its result adds a cue, banner, or checklist box. Flaitron
itself never writes `[unattended]` on its own discretion
(`SPEC/task-line-segments.md`).

Clause 6 on an existing plan reads naturally: a `.k` child qualifies when its
stem predecessor — per the `.1`'s `## 🌳 Fan-out` if that note is on disk
(active or archived), else `.k-1` — is already `- [x]` in the rows collected
at Step 1, **or is itself a candidate in this walk**. Resolve predecessors
first, then dependents, so a chain whose head is declined declines the whole
chain. A `.1` Discovery row is never a candidate; a parent `<AREA>-EPIC-<N>`
row is never one either.

Record, per row, either `candidate (+ clause-6 predecessor when one applies)`
or the **first clause that failed** — the failing clause is what the operator
will want to see for the rows that are *not* offered, and it costs nothing to
keep.

## Step 3 — One review gate

Surface the walk in one message, then stop and wait. The shape:

1. **Counts.** Open rows walked · already marked (skipped) · `[handoff]`
   (skipped) · declined · candidates.
2. **Candidates** — one per line, in PLAN order, each shown as the full row
   **exactly as Step 4 will write it**, with `[unattended]` in place after
   `[model]` and any model-suggestion glyph (`[light]🔧 [unattended]`; SPEC
   §"Task-line format", position footgun in `SPEC/plan-parser.md`), and one
   trailing clause naming the clause-6 predecessor when one applies:

   ```text
   1. - [ ] **CORE-581** [light]🔧 [unattended] | shortname — …
   2. - [ ] **CORE-582.3** [medium]🧩 [unattended] | shortname — …   ← after CORE-582.2 (candidate in this pass)
   ```

3. **Declined** — collapsed to `ID — clause N` per row, one line each. No
   token, no argument; the predicate is conservative by design and a declined
   row is the status quo, not a finding.
4. **The ask**, in one line: *Reply `all` to seed every candidate, `none` to
   seed nothing, a list of IDs to seed only those, or `all but <IDs>`.*

The reply is the act. Conversational assent (`SPEC/cue-vocabulary.md`
§"Accepted gate replies") counts as `all`; an edit that drops a row drops it;
`none`, or a reply naming no candidate, ends the run at Step 5 with zero
writes. **Do not write anything before the reply.** Do not re-ask, do not
batch into a second gate for large plans — the list is as long as it is, and
one message holds it. This is a prose review, not an `AskUserQuestion`: the
structured ask caps at sixteen options per call, which would split a large
plan's confirmation across several gates, and the module asks for exactly one.

Zero candidates → report the counts and the declined list, say there is
nothing to seed, and stop. No gate, no commit.

## Step 4 — Write the confirmed rows

In one continuous motion, after the reply:

1. **Filing-commit pre-check.** Immediately before any write, apply
   `SPEC/plan-filing.md` §"Filing commits". `git diff --cached --quiet`
   non-zero → `auto-commit = false`. PLAN.md porcelain empty →
   `auto-commit = true`. PLAN.md non-empty → `git diff --no-ext-diff -- .flaitron/PLAN.md`:
   every added line a task row or blank, and every removed
   line blank or a `(none)` placeholder → `auto-commit = true` and those rows
   ride in this commit (record their IDs for the body line that section names);
   any other PLAN change → `auto-commit = false`. Not a gate. Run it here,
   after the gate — the reply can take a while. The token insertions in item 2
   are this motion's own write, not part of the dirt this reading classifies.

2. **Insert the token.** On each confirmed row, and **only** those, insert
   ` [unattended]` immediately after the `[model]` segment and any
   model-suggestion glyph that follows it — before any `[handoff]` (none can
   be present on a candidate), before `| shortname`, before ` — `. Every
   other byte of the row stays verbatim: checkbox, ID, `[!critical]` (none
   can be present), model, shortname, description, nesting indent. Rows the
   operator did not keep are untouched. Edit by exact-string replacement of
   the whole row, one row at a time; never regenerate the file.

3. **Commit the write** (when `auto-commit = true`). Stage by explicit
   pathspec only — **never** `git commit -a`, `git add .`, or `git add -A`:

   ```sh
   git add .flaitron/PLAN.md
   git diff --cached   # whole index, no pathspec
   git commit -m "chore: seed [unattended] — <N> rows"
   ```

   **Post-stage verification.** Read that staged diff before committing. The
   pre-check read the working tree and the index; the commit publishes the
   index, and PLAN.md can gain a foreign write between the two — an editor
   autosave, a concurrent session — that `git add` then stages unseen. The
   read takes no pathspec because the commit takes none. Every hunk must be
   one this skill wrote: a single-line change on a confirmed row, adding
   exactly ` [unattended]`. PLAN.md lines the pre-check classified as accumulated filings — added
   task rows or blanks, and removed blanks or a `(none)` — are part of this
   commit, not an unrecognized hunk.
   When that pre-check recorded IDs, add a second `-m` with the body line
   `SPEC/plan-filing.md` §"Filing commits" names; the subject stays the fence
   above. An unrecognized hunk → `git restore --staged
   .flaitron/PLAN.md`, skip the commit, and report it exactly as the
   `auto-commit = false` case. Never unstage the foreign hunk and commit the
   rest.

   `<N>` is the number of rows seeded. Commit only — never push.
   `auto-commit = false` → skip this item and say so in one line
   (`left uncommitted (PLAN.md or the index already carried other changes)`).
   Not a closure commit — report `committed <sha>` as plain text, **no 🏁**
   (`SPEC.md` §"Paper-complete guard" §3).

## Step 5 — Report

One short message:

- `seeded <N> rows: <IDs in PLAN order>` — or `seeded 0 rows` when the reply
  kept nothing.
- `committed <sha>` — or the `left uncommitted` line from Step 4.
- Any `already marked — position looks off; not repaired` rows from Step 1,
  so the operator can fix them by hand.

The Step 3 reply **is** the commit authorization — there is no separate
commit-go ask, and no 🏁 marker. Nothing else changes: no tasknote, no
`## Completed` row, no PLAN line for the seeding itself. A seeded row is
still an ordinary open row; it now implies `--fast` on an attended `/ft-task`
and is dispatchable by an operator-less caller that reads the marker
(`docs/EXTERNAL-AGENTS.md` step 2).

## Notes

- **Attended-only by construction.** The whole skill is the one gate the
  candidacy module says a proposal must ride. Remove the gate and the skill
  has no reason to exist — an unattended walk is a report, and the filers
  already emit that report as `unattended-candidates:`.
- **Predicate lives once.** Never restate a clause here; Step 1 Reads the
  module and Step 2 applies it. A clause that seems wrong is fixed in
  `SPEC/unattended-candidacy.md`, where every filer picks the fix up on its
  next write.
- **Seeds, never repairs.** A mis-positioned existing token, a `[handoff]`
  that reads stale, a `Blocked by` that has since cleared — all reported or
  skipped, none rewritten. Row repair is a hand edit or a `/ft-micro-task`.
- **Idempotent.** A second run walks the same plan, skips every row the first
  run seeded, and offers only what the predicate admits among the rest —
  typically rows filed since. Nothing it writes can make a row *less*
  dispatchable.
- **Routing.** A brand-new row gets its candidacy proposal at filing time
  from whichever filer writes it (`SPEC/unattended-candidacy.md` §"Surfaces
  and mirrors"); this skill is for the rows that were filed before, or
  without, that proposal. Starting a seeded row: `/ft-task <ID>`.
