---
name: ft-prep-unattended
description: Prepare declined rows of an existing `.flaitron/PLAN.md` in one attended pass — classify each row the candidacy predicate declines, propose a factual pin or a split into a mechanical row plus an attended remainder, file a starter when the remainder needs one, and commit only what the operator keeps. Never writes `[unattended]`. Use when the user asks to prep, unblock, or split rows so a later seed can mark them. Attended-only, no flags; thin procedural skill.
---

# prep-unattended — prepare declined rows for a later seed

You are preparing open rows of a project's existing `.flaitron/PLAN.md` that
the `[unattended]` candidacy predicate declines. `/ft-seed-unattended` marks
rows the predicate already admits. This skill does the other walk: one pass,
one gate, and a write that covers only what the operator confirmed. It is a
**thin procedural skill**. It edits PLAN.md rows, may insert a mechanical row,
and may file a starter for an attended remainder. It does **not** scaffold a
tasknote for itself. The skill takes **no arguments and no flags**.

The skill is markdown-only — the assistant runs git inline via its Bash tool,
no shell scripts (per `SPEC/scope-boundaries.md` §"What flaitron does NOT
provide").

**The rule this skill exists under.** What a declined row may become — a pin,
a split, or a stay — lives in `<root>SPEC/unattended-candidacy.md`
§"Preparing declined rows". Read that section and apply it. Do not restate it
here. This skill never writes `[unattended]`. Seeding stays an operator act
on `/ft-seed-unattended`.

## Step 0 — Resolve paths, reject arguments

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail. `PLAN` is `.flaitron/PLAN.md` on both layouts; if it
is absent, bail — there is nothing to prepare.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

If `args` is non-empty, stop and say so: this skill accepts no task ID and no
flag. There is deliberately no `--fast` and no `--unattended` — a posture with
no operator act writes nothing (module §"Three postures"), and this walk's
product is a confirmed rewrite, not a report. A surface that accepts neither
flag has only the attended branch; this is that surface.

## Step 1 — Read the contract, then walk the plan

**Read `<root>SPEC/unattended-candidacy.md` now**, in full — the predicate and
§"Preparing declined rows" are applied from that text, not from memory or
from this file.

Read `PLAN`. Collect every **open** row — `- [ ]`, at any nesting depth — under
the four active headings `## High` / `## Medium` / `## Low` /
`## Future Opportunities`. `## Completed` is out of scope, and so is
`.flaitron/PLAN-ARCHIVE.md`. Also collect the checkbox state of every row
(open or closed) so clause 6 can be resolved without a second read.

Two classes are **skipped before the predicate runs**, reported as counts,
not proposed:

- **Already marked** — the row contains `[unattended]` anywhere on the line.
  A mis-positioned token is named `already marked — position looks off; not
  repaired` and left. This skill does not rewrite a token into place
  (`SPEC/plan-parser.md` §"`[unattended]` / `[handoff]` mis-authoring
  footguns").
- **`[handoff]`** — skipped. Clause 3 calls the marker definitive.

## Step 2 — Classify each declined row

**`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures" — the module was Read at Step 1, before this walk).
Attended branch only: this skill takes neither `--fast` nor `--unattended`, so
the `unattended-candidates:` line never fires here. Run §"Candidacy predicate"
over each remaining open row. A row the predicate admits is a **candidate**:
count it and leave it for `/ft-seed-unattended`. A row it declines is classified by
§"Preparing declined rows" into exactly one of `stay`, `pin`, or `split`.
Record the first clause that failed beside the class — the operator will want
it, and it costs nothing to keep. Settle that section's Stay-bullet
collisions while classifying, before any draft: a source ID with
`.flaitron/tasknote/<ID>.md`, `.flaitron/tasknote/archive/*/<ID>.md`, or
`.flaitron/sidequest/<ID>.md` is `stay`, and so is a would-be split of an
epic child whose parent has no `.N` row. The stay reason names the file or
the missing `.N`.

Draft the bytes Step 4 will write. No draft contains `[unattended]` or
`[handoff]`.

- **`stay`** — no draft. The row is unchanged.
- **`pin`** — one rewritten copy of the source row. Every byte stays verbatim
  except the description words the pin replaces. Do not change the checkbox,
  the ID, `[model]` or its glyph, `[!critical]`, the shortname, or the indent.
  Edit by exact-string replacement of the whole row.
- **`split`** — two rows, plus a starter when §"Preparing declined rows" calls
  for one.
  - **Remainder.** The source row, rewritten so the description is only the
    attended part. Same ID, same `[model]`, same indent. The long description
    stays within `SPEC/tasknote-selection.md` §"PLAN.md filing-discipline
    thresholds" (≤50 words).
  - **Mechanical row.** A new `- [ ]` line in the source row's priority
    section. `[light]🔧` when the slice is a clear diff, `[medium]🧩` when it
    is multi-step and well-scoped (`SPEC/model.md` §"Model field"). No other
    tier. Description is only the factual slice, ≤50 words, same thresholds.
    Shortname ≤30 characters. A standalone source takes the next top-level ID
    from `SPEC/plan-filing.md` §"ID allocation", and is inserted on the line
    immediately after its source row, with no blank line between, even when
    the source is its section's last row. An epic-child source does not take
    a new top-level ID: the mechanical row is the next `.<k>` after the
    highest numeric sibling already on disk, before `.N`, inserted 2-space
    nested under the parent immediately before that `.N` row. Several splits
    allocate in order, each counting IDs already on disk and rows drafted
    ahead in this walk.
  - **Starter.** When the remainder is not understandable from its line,
    copy `<root>templates/tasknote-starter-template.md` to
    `.flaitron/tasknote/<source-ID>.md`, `status: starter`, `created:` today,
    title from the remainder shortname, and fill the template's sections from
    the remainder. Do not call `/ft-file-task --starter` — that filer keeps
    its own gate. The collision check above has already ruled out a note or
    stub for that ID.

## Step 3 — One review gate

Surface the walk in one message, then stop and wait. The shape:

1. **Counts.** Open rows walked · already marked (skipped) · `[handoff]`
   (skipped) · candidates (left for seed) · stay · pin · split.
2. **Proposals** — pins and splits only, in PLAN order. Each pin is the full
   rewritten row. Each split is the remainder row, then the mechanical row,
   then `starter: .flaitron/tasknote/<ID>.md` when one will be written.
   Show the bytes Step 4 will write. No proposal line carries `[unattended]`.
3. **Stayed** — `ID — stay (reason) — clause N`, one line each.
4. **The ask**, in one line: *Reply `all` to prepare every proposal, `none`
   to write nothing, a list of source IDs to prepare only those, or `all but
   <IDs>`. Dropping a split drops its mechanical row and its starter together.*

The reply is the act. Conversational assent (`SPEC/cue-vocabulary.md`
§"Accepted gate replies") counts as `all`. `none`, or a reply naming no
proposal, ends the run at Step 5 with zero writes. **Do not write anything
before the reply.** Do not re-ask, and do not split a large plan across a
second gate. This is a prose review, not an `AskUserQuestion`.

Zero proposals → report the counts and the stayed list, say there is nothing
to prepare, and stop. No gate, no commit.

## Step 4 — Write the confirmed proposals

In one continuous motion, after the reply:

1. **Filing-commit pre-check.** Immediately before any write, run the
   pre-check in `SPEC/plan-filing.md` §"Filing commits": `git diff --cached --quiet`
   non-zero, or any PLAN.md change beyond earlier task-row filings →
   `auto-commit = false`; otherwise `auto-commit = true`, recording any
   accumulated-filing IDs. Not a gate. Run it here, after the gate. Re-scan
   IDs before writing a split. If a confirmed mechanical ID is now taken,
   skip that split, leave its source row untouched, and name it in Step 5.
   The rewrites in item 2 are this motion's own write, not dirt the pre-check
   classifies.

2. **Write confirmed proposals only.** Exact-string replacement of each
   confirmed source row. Insert each mechanical row where Step 2 placed it.
   Write each starter from the draft. Rows the operator did not keep are
   untouched. Never regenerate `PLAN`.

3. **Commit the write** (when `auto-commit = true`):

   ```sh
   git add .flaitron/PLAN.md
   git add .flaitron/tasknote/<ID>.md   # each starter this motion created
   git diff --cached   # whole index, no pathspec
   git commit -m "chore: prep unattended — <N> rows"
   ```

   Omit the starter `git add` when this motion created none.

   **Post-stage verification.** Recognized hunks: a description rewrite on a
   confirmed source row, an inserted mechanical row, a starter file this
   motion created, and the accumulated filings the pre-check recorded (their
   IDs go in the body line that section names). Anything else →
   `git restore --staged` on every path this motion staged, skip the commit,
   and report it as the `auto-commit = false` case.

   `<N>` is the number of source rows kept, not the number of lines written.
   `auto-commit = false` → skip this item and say so in one line
   (`left uncommitted (PLAN.md or the index already carried other changes)`).
   Explicit pathspecs, the whole-index read, commit-never-push, and
   plain-text `committed <sha>` with no 🏁:
   `SPEC/plan-filing.md` §"Filing commits".

## Step 5 — Report

One short message:

- `prepared <N> source rows: <IDs in PLAN order>` — or `prepared 0 source rows`.
- `committed <sha>` — or the `left uncommitted` line from Step 4.
- Any skipped split whose ID was taken, and any `already marked — position
  looks off; not repaired` row.
- `no [unattended] written` — the next mark is `/ft-seed-unattended`.

The Step 3 reply **is** the commit authorization — there is no separate
commit-go ask, and no 🏁 marker. A prepared row is still unmarked. Nothing
in this skill makes it dispatchable with nobody present.

## Notes

- **Never writes the token.** A pin or a mechanical row can be what a later
  seed admits. Writing the token here would skip the act seed exists to host.
- **Predicate and taxonomy live once.** A clause or a stay-rule that seems
  wrong is fixed in `SPEC/unattended-candidacy.md`, not copied into this file.
- **Does not repair.** A mis-positioned token, a stale `[handoff]`, a cleared
  `Blocked by` — reported or skipped, not rewritten. Row repair is a hand
  edit or a `/ft-task --micro`.
- **Does not retag** `[model]` on a source row, and does not add a test, a
  Playwright spec, or a keyword to the predicate.
- **Filers keep their gates.** This skill does not invoke them. A brand-new
  row still gets its candidacy proposal from whichever filer writes it
  (`SPEC/unattended-candidacy.md` §"Surfaces and mirrors").
