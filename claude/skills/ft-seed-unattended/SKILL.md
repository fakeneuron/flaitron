---
name: ft-seed-unattended
description: Seed `[unattended]` onto an existing `.flaitron/PLAN.md` in one attended pass — walk every open row with the `SPEC/unattended-candidacy.md` predicate, mark the rows it admits, prepare the rows it declines with a factual pin, a split into a mechanical row plus an attended remainder (a starter when the remainder needs one), a scope starter carrying a readiness basis, or one bounded question, show it all inside one prose review gate, write only what the operator keeps, and commit the write. Use when the user asks to seed, bulk-mark, or sweep a plan for `[unattended]` rows, or to prep, unblock, or split rows so they can be marked. Attended-only, no flags; thin procedural skill, no tasknote.
---

# seed-unattended — bulk `[unattended]` seeding of an existing plan

You are seeding the `[unattended]` marker onto rows of a project's existing
`.flaitron/PLAN.md`. Every filing skill except `/ft-file-task --park` already *proposes* the marker for the
row it is about to write, but candidacy fires only at filing time — a plan
filed before that contract existed, or by hand, has no path to the token but
hand-editing. This skill is that path, and the path for the rows the
predicate declines: one walk marks the rows it admits and prepares the rows
it declines, one gate shows both, and a write covers only what the operator
confirmed. It is a **thin procedural skill** — it edits PLAN.md rows, may
insert a mechanical row, and may file a starter for an attended remainder; it
does **not** scaffold a tasknote for itself. A scope also files a starter
carrying a readiness basis. The skill takes **no arguments
and no flags**.

The skill is markdown-only — the assistant runs git inline via its Bash tool,
no shell scripts (per `SPEC/scope-boundaries.md` §"What flaitron does NOT
provide").

**The rule this skill exists under.** Flaitron itself never writes
`[unattended]` — seeding is an operator act (`SPEC/task-line-segments.md`;
`SPEC/unattended-candidacy.md` §"Recommend, never write"). This skill does not
change who writes the token. It changes *when the question is asked*: instead
of once per row at filing time, once per plan at the operator's request. The
operator's confirmation at Step 3 is the act; nothing unconfirmed reaches disk.
What a declined row may become — a pin, a split, a scope, a question, or a
stay — lives in
`SPEC/unattended-candidacy.md` §"Preparing declined rows"; apply it, do not
restate it here.

## Step 0 — Resolve paths, reject arguments

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail. `PLAN` is `.flaitron/PLAN.md` on both layouts; if it
is absent, bail — there is nothing to seed.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

If `args` is non-empty, stop and say so: this skill accepts no task ID and no
flag. There is deliberately no `--fast` and no `--unattended` — a posture with
no operator act writes nothing (module §"Three postures"), so an operator-less
seeding run would be a walk that ends in a report, and the report already
exists as the `unattended-candidates:` line the filers emit. A surface that
accepts neither flag has only the attended branch; this is that surface.

## Step 1 — Read the contract, then walk the plan

**Read `<root>SPEC/unattended-candidacy.md` now**, in full — the predicate and
§"Preparing declined rows" are applied from that text, not from memory or
from this file.

Read `PLAN`. Collect every **open** row — `- [ ]`, at any nesting depth — under
the four active headings `## High` / `## Medium` / `## Low` /
`## Future Opportunities`. `## Completed` is out of scope, and so is
`.flaitron/PLAN-ARCHIVE.md`; a closed row has nothing to dispatch. Also
collect, for clause 6, the checkbox state of every row (open or closed) so an
epic child's siblings can be resolved without a second read.

Two classes of open row are **skipped before the predicate runs**, and are
reported as counts, not listed:

- **Already marked** — the row contains `[unattended]` anywhere on the line.
  A mis-positioned token (before `[model]`, inside the description) is the
  `SPEC/plan-parser.md` §"`[unattended]` / `[handoff]` mis-authoring
  footguns" case: name the row in the Step 3 report as `already marked —
  position looks off; not repaired`, and leave it. This skill does not
  rewrite a token into place.
- **`[handoff]`** — clause 3 calls the marker definitive; the row is never a
  candidate, never prepared, and nothing else is consulted.

## Step 2 — Run the predicate, then prepare what it declines

**`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures" — the module was Read at Step 1, before this walk).
Attended branch only: this skill takes neither `--fast` nor `--unattended`, so
the `unattended-candidates:` line never fires here. Run §"Candidacy predicate"
over each remaining open row **as it stands in the file** — the row text *is*
the drafted line. A row the predicate admits is a **mark**: shown in the
Step 3 review with the token in place, and written at Step 4 only if the
operator's confirmation keeps it. A row it declines is classified by
§"Preparing declined rows" into exactly one of `stay`, `pin`, `split`,
`scope`, or `question` (a question may ride a scope).

**Basis read.** Clauses 1 and 3 read a row's starter for their basis arms.
On a `[heavy]`, heavy-tier-name, or rendered-surface row whose
`.flaitron/tasknote/<ID>.md` is at `status: starter`, check (a)–(d) on it
(module §"Readiness basis"), and that every script its criteria name is
defined. Complete → the predicate reads the basis as
held, and a row it admits is a mark whose fields Step 3 shows, so the keep
confirms them. Incomplete → the row stays on the clause the basis would
have satisfied (1 or 3), the reason naming the missing fields
(`basis incomplete — (b), (c)`). The note also rules out a scope (the
collision below). Never edit the note.

**Scope and question.** When a row is declined only for want of a
readiness basis, only by one undecided design choice, or by those two
together (clause 6 aside, per the module's Scope bullet), **Read
`<root>claude/skills/ft-seed-unattended/scope-and-question.md` now** and
classify and draft such rows by it. It also extends Steps 3–5; once it is
loaded, apply its section at each of them.

Clause 6 on an existing plan reads naturally: a `.k` child qualifies when its
stem predecessor — per the `.1`'s `## 🌳 Fan-out` if that note is on disk
(active or archived), else `.k-1` — is already `- [x]` in the rows collected
at Step 1, **or is itself a candidate in this walk** (a mark, or a token item
below); an open row already carrying the token does not count. Resolve
predecessors first, then dependents, and finish each row — mark, or
classification, draft, and token item below — before any row that waits on
it, so a dependent sees its predecessor's item and a chain whose head is
declined with no item declines the whole chain. A split's mechanical `.k` is
the one exception: it waits on the highest numeric sibling, so decide its
item once that sibling is resolved, before the `.N`. A `.N` audit row (or legacy
numeric audit child) waits on every sibling, so resolve it last. A `.1`
Discovery row is never a candidate; a parent `<AREA>-EPIC-<N>` row is never
one either.

Settle the Stay-bullet collisions while classifying, before any draft: a
source ID with `.flaitron/tasknote/<ID>.md`,
`.flaitron/tasknote/archive/*/<ID>.md`, or `.flaitron/sidequest/<ID>.md` is
`stay`, and so is a would-be split of an epic child whose parent has no `.N`
row, or whose next `.<k>` (counting splits drafted ahead in this walk)
already has a tasknote or stub. A row declined by clause 6 alone has no
person to remove and stays too. The stay reason names the file, the missing
`.N`, or the clause.

Draft the bytes Step 4 will write. No draft contains `[handoff]`.

- **`stay`** — no draft. The row is unchanged.
- **`pin`** — one rewritten copy of the source row. Every byte stays verbatim
  except the description words the pin replaces. Do not change the checkbox,
  the ID, `[model]` or its glyph, `[!critical]`, the shortname, or the indent.
  Edit by exact-string replacement of the whole row. A pinned row left with
  any clause-3 trip is not a pin (§"Preparing declined rows"): classify the
  row as a split or a stay instead.
- **`split`** — two rows, plus a starter when §"Preparing declined rows" calls
  for one.
  - **Remainder.** The source row, rewritten so the description is only the
    attended part. Same ID, same `[model]`, same indent. The long description
    stays within `SPEC/tasknote-selection.md` §"PLAN.md filing-discipline
    thresholds" (≤50 words).
  - **Mechanical row.** A new `- [ ]` line in the source row's priority
    section. `[light]🔧` when the slice is a clear diff, `[moderate]🧩` when it
    is multi-step and well-scoped (`SPEC/model.md` §"Model field"). No other
    tier. Description is only the factual slice, ≤50 words, same thresholds.
    Shortname ≤30 characters. A standalone source takes the next top-level ID
    from `SPEC/plan-filing.md` §"ID allocation", and is inserted at the
    source row's indent on the line
    immediately after its source row and any indented lines beneath it,
    with no blank line between, even when
    the source is its section's last row. An epic-child source does not take
    a new top-level ID: the mechanical row is the next `.<k>` after the
    highest numeric sibling already on disk, before `.N`, inserted 2-space
    nested under the parent immediately before that `.N` row. Several splits
    allocate in order, each counting IDs already on disk and rows drafted
    ahead in this walk.
  - **Screen.** Once the mechanical row's ID and placement are fixed, screen
    that row — not the remainder: clauses 1–5 over the exact bytes Step 3
    will show (§"Preparing declined rows"). Leave out a mention of the source
    ID that trips, and re-screen. A trip that remains turns the whole split
    into `stay`: drop the remainder rewrite, draft no starter, and name the
    word and the clause.
  - **Starter.** When the remainder is not understandable from its line,
    copy `<root>templates/tasknote-starter-template.md` to
    `.flaitron/tasknote/<source-ID>.md`, `status: starter`, `created:` today,
    title from the remainder shortname, and fill the template's sections from
    the remainder, and end the remainder row with the starter pointer
    ``Filed with starter at `.flaitron/tasknote/<source-ID>.md`.`` (outside
    the word count, as `/ft-file-task --starter` writes it). Do not call
    `/ft-file-task --starter` — that filer keeps its own gate. The collision
    check above has already ruled out a note or stub for that ID.

**Token items.** Run the full predicate — clause 6 included — over each
drafted row a preparation produces: the pinned row, or a split's mechanical
row (never the remainder, which still needs its person). When it admits the
row as drafted, the preparation carries a **dependent token item**: that row
with the token in place. When it declines — a pin on a `[heavy]` or
heavy-tier-name row with no complete basis (clause 1), a mechanical `.k` waiting on an open sibling that is not a
candidate (clause 6) — the preparation carries no item; record that clause
instead. A mechanical `.k` waits on the highest numeric sibling it was
numbered after; when the source was the highest, that sibling is the open
remainder, and the item does not fire this walk, by design (module
§"Preparing declined rows").

Record, per row, either `mark (+ clause-6 predecessor when one applies)`,
the preparation with its item or withholding clause, or `stay` with the
**first clause that failed** and any reason the Stay bullet asks for.

## Step 3 — One review gate

Surface the walk in one message, then stop and wait. The shape:

1. **Counts.** Open rows walked · already marked (skipped) · `[handoff]`
   (skipped) · marks · pins · splits · stays — plus the fragment's
   §"Step 3" count additions when it was loaded; its scope entries,
   Questions block, and answer forms join the sections below.
2. **Marks** — one per line, in PLAN order, each shown as the full row
   **exactly as Step 4 will write it**, with `[unattended]` in place after
   `[model]` and any model-suggestion glyph (`[light]🔧 [unattended]`; SPEC
   §"Task-line format", position footgun in `SPEC/plan-parser.md`), and one
   trailing clause naming the clause-6 predecessor when one applies — for a
   `.N`, every open sibling it waits on. A mark admitted on an on-disk
   starter's basis (Step 2 **Basis read**) carries one more line, so the
   keep confirms fields the operator saw:
   `basis (on disk): <path> — (a) touches: … · (b) <criteria with commands> · (c) open: none · (d) <spec, or n/a>`.
3. **Preparations** — pins and splits (and scopes, per the fragment), in
   PLAN order. Each pin is the full
   rewritten row. Each split is the remainder row, then the mechanical row,
   then `starter: .flaitron/tasknote/<ID>.md` when one will be written. Under
   each, its **dependent token item** — the pinned or mechanical row with the
   token in place, and its clause-6 predecessor when one applies — or
   `no item — clause N`. Show the bytes Step 4 will write:

   ```text
   1. - [ ] **CORE-581** [light]🔧 [unattended] | shortname — …
   2. - [ ] **CORE-582.3** [moderate]🧩 [unattended] | shortname — …   ← after CORE-582.2 (candidate in this pass)
   3. pin   - [ ] **CORE-590** [light]🔧 | shortname — … `npm test -- foo`
            item: - [ ] **CORE-590** [light]🔧 [unattended] | shortname — …
   4. split - [ ] **CORE-591** [heavy] | shortname — … (remainder)
            - [ ] **CORE-602** [light]🔧 | slice — … (mechanical)
            item: - [ ] **CORE-602** [light]🔧 [unattended] | slice — …
   ```

4. **Stays** — `ID — stay (reason) — clause N`, one line each; the reason
   only where §"Preparing declined rows" asks for one. No token, no argument;
   the predicate is conservative by design and a stay is the status quo, not
   a finding.
5. **The ask**, in one line: *Reply `all` to keep everything, `none` to write
   nothing, a list of IDs to keep only those, or `all but <IDs>` — a source
   ID names its mark or its preparation with its item; `<source ID> item`
   names only the item, and `<source ID> no item` keeps the preparation
   without it; dropping a preparation drops its item, its
   mechanical row, and its starter; dropping a mark or an item also drops
   every mark and item leaning on it.*

The reply is the act. Conversational assent (`SPEC/cue-vocabulary.md`
§"Accepted gate replies") counts as `all`; a reply that drops a mark or an
item drops it, and every kept mark or item leaning on it (module §"Three
postures") — name those in the Step 5 report. Dropping an item keeps its
preparation and leaves that row unmarked, for a later walk. `none`, or a
reply naming nothing on the list, ends the run at Step 5 with zero writes.
Items are named by their source ID, never by a mechanical row's new ID; a
reply that names a mechanical ID is read as its source ID. Keeping an item
keeps its preparation. Dropping an epic child's split also drops every kept
split in that epic whose mechanical `.k` was numbered after it, so the IDs
shown are the IDs written.
**Do not write anything before the reply.** Do not re-ask, do not batch into
a second gate for large plans — the list is as long as it is, and one
message holds it. This is a prose review, not an `AskUserQuestion`: the
structured ask caps at sixteen options per call, which would split a large
plan's confirmation across several gates, and the module asks for exactly one.

No mark, no preparation, and no question → report the counts and the
stays, say there is nothing to seed or prepare, and stop. No gate, no
commit.

## Step 4 — Write what the reply kept

In one continuous motion, after the reply (with the fragment's §"Step 4"
re-scan checks, writes, and recognized hunks when it was loaded):

1. **Filing-commit pre-check.** Immediately before any write, run the
   pre-check in `SPEC/plan-filing.md` §"Filing commits": `git diff --cached --quiet`
   non-zero, or any PLAN.md change beyond earlier task-row filings →
   `auto-commit = false`; otherwise `auto-commit = true`, recording any
   accumulated-filing IDs. Not a gate. Run it here, after the gate — the reply
   can take a while. Re-scan before writing any kept preparation: re-run the
   Step 2 collision check on its source ID, and for a split check that its
   mechanical ID is still free (unclaimed under `SPEC/plan-filing.md`
   §"ID allocation" — a standalone ID's `N` included — and no tasknote or
   stub with that ID) and, for an
   epic child, still the next `.<k>` after the highest numeric sibling —
   counting the kept splits ahead of it in this walk, as Step 2 allocated —
   with its `.N` row still present; and check that its source row still
   reads as Step 1 read it. Re-scan a mark admitted on an on-disk
   starter's basis too: the note must still read as Step 2 read it and
   every script its criteria name must still be defined, or the mark is
   skipped like a failed preparation. On any failure, skip that preparation and its
   item, leave its source row untouched, apply the reply's drop rules to
   what leaned on it, and name them all in Step 5. The writes in item 2 are
   this motion's own, not dirt the pre-check classifies.

2. **Write kept rows only.** Edit by exact-string replacement of the whole
   row, one row at a time; never regenerate `PLAN`. Rows the operator did not
   keep are untouched. Insert mechanical rows in allocation order, so each
   epic's new `.k` rows land ascending before its `.N`. Write starters last,
   after every `PLAN` edit has landed. If a replacement fails mid-motion,
   stop writing `PLAN`, write the starter only for a remainder whose pointer
   already landed, skip item 3, and report what was and was not written. If nothing kept survives the re-scan, nothing is written:
   skip item 3 and report `seeded 0 rows` / `prepared 0 source rows`.
   - **Mark** — insert ` [unattended]` immediately after the `[model]`
     segment and any model-suggestion glyph that follows it — before any
     `[handoff]` (none can be present on a candidate), before
     `| shortname`, before ` — `. Every other byte of the row stays verbatim
     to the file: checkbox, ID, `[!critical]` (none can be present), model,
     shortname, description, nesting indent.
   - **Pin** — the drafted rewrite, with the token inserted the same way when
     its item was kept; every other byte verbatim to the draft.
   - **Split** — the remainder rewrite; the mechanical row inserted where
     Step 2 placed it, with the token when its item was kept; the starter
     written from the draft.

3. **Commit the write** (when `auto-commit = true`):

   ```sh
   git add .flaitron/PLAN.md
   git add .flaitron/tasknote/<ID>.md   # each starter this motion created
   git diff --cached   # whole index, no pathspec
   git commit -m "chore: seed [unattended] — <N> rows"
   ```

   Omit the starter `git add` when this motion created none.

   **Post-stage verification.** Recognized hunks: a single-line change on a
   kept mark adding exactly ` [unattended]`; a description rewrite on a kept
   source row, token included only on a pin, scope, or answered question
   whose item was kept (a remainder never carries it); an inserted mechanical
   row, token included when its item was kept; a starter file this motion
   created; and the accumulated filings the pre-check recorded (their IDs go
   in the body line that section names). Anything else →
   `git restore --staged` on every path this motion staged, skip the commit,
   and report it as the `auto-commit = false` case.

   `<N>` is the number of source rows kept — marks plus preparations; an item
   rides its preparation's count. `auto-commit = false` → skip this item and
   say so in one line (`left uncommitted (PLAN.md or the index already
   carried other changes)`). Explicit pathspecs, the whole-index read,
   commit-never-push, and plain-text `committed <sha>` with no 🏁:
   `SPEC/plan-filing.md` §"Filing commits".

## Step 5 — Report

One short message:

- `seeded <N> rows: <IDs in PLAN order>` — the IDs that now carry the
  token: each mark, each pinned row, each mechanical row (its own ID), and
  each scoped or answered row — or `seeded 0 rows`.
- `prepared <N> source rows: <IDs in PLAN order>` — or `prepared 0 source
  rows`.
- `committed <sha>` — or the `left uncommitted` line from Step 4.
- Any mark, item, or split the reply or a Step 4 skip dropped by leaning or
  numbering, any preparation skipped at Step 4 with the re-scan check it
  failed, and any `already marked — position looks off; not repaired` row,
  so the operator can fix it by hand.
- When the fragment was loaded, its §"Step 5" lines.

The Step 3 reply **is** the commit authorization — there is no separate
commit-go ask, and no 🏁 marker. Nothing else changes: no tasknote for the
walk, no `## Completed` row, no PLAN line for the seeding itself. A seeded
row is still an ordinary open row; it now implies `--fast` on an attended
`/ft-task` and is dispatchable by an operator-less caller that reads the
marker (`docs/EXTERNAL-AGENTS.md` step 2). A prepared row whose item was
dropped or withheld is still unmarked.

## Notes

- **Attended-only by construction.** The whole skill is the one gate the
  candidacy module says a proposal must ride. Remove the gate and the skill
  has no reason to exist — an unattended walk is a report, and the filers
  already emit that report as `unattended-candidates:`.
- **Predicate and taxonomy live once.** Never restate a clause or a
  stay-rule here; Step 1 Reads the module and Step 2 applies it. A clause
  that seems wrong is fixed in `SPEC/unattended-candidacy.md`, where every
  filer picks the fix up on its next write.
- **Tokens only where the reply kept them.** The skill
  never writes `[handoff]`, which no filer proposes, and never writes
  `[unattended]` on a row the reply did not keep as a mark or an item.
- **Seeds and prepares, never repairs.** A mis-positioned existing token, a
  `[handoff]` that reads stale, a `Blocked by` that has since cleared — all
  reported or skipped, none rewritten. Row repair is a hand edit or a
  `/ft-task --micro`. A pin, a split, a scope, or an answered question is
  a preparation the operator confirmed, not a repair.
- **Does not retag** `[model]` on a source row, and does not add a test, a
  Playwright spec, or a keyword to the predicate.
- **Idempotent.** A second run walks the same plan, skips every row the first
  run seeded, and offers only what the predicate admits or the taxonomy
  prepares among the rest — typically rows filed since, and items a closed
  sibling has since settled. Nothing it writes can make a row *less*
  dispatchable.
- **Filers keep their gates.** This skill does not invoke them. A brand-new
  row gets its candidacy proposal at filing time from whichever filer writes
  it (`SPEC/unattended-candidacy.md` §"Surfaces and mirrors"); this skill is
  for the rows that were filed before, or without, that proposal. Starting a
  seeded row: `/ft-task <ID>`.
