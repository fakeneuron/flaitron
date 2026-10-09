# PLAN.md filing

> Lazy-loaded SPEC module. Loaded at the two moments a PLAN.md row changes hands with git: by the filing motions (`/ft-file-task` and its `--park` / `--starter` modes, `/ft-audit`, `/ft-audit-repo`, `/ft-refactor`, `/ft-open-epic` at Step 4) and `/ft-seed-unattended` when they commit their own write, and by every closing runner (`/ft-task`, `/ft-micro-task`, `/ft-open-epic`, `/ft-close-epic`, `/ft-release`) at the Phase 4 stub flip — plus the visualizer as a `## Completed` history consumer. See `SPEC.md` for the always-loaded core spec, and the sibling [`SPEC/tasknote-selection.md`](tasknote-selection.md) for the use/skip thresholds, the filing-discipline word budget, and the downstream-impact reconciliation scan that decide *what* to file.

Three contracts, one subject — what happens to a PLAN.md row once it is
written: §"Filing commits" (how a filing lands in git), §"`## Completed`
archive convention" (how a closed row collapses), and §"`## Completed`
rotation" (how closed rows leave the plan file without being deleted). A
fourth, §"Empty-section placeholder", covers the inverse case — what a
section carries when it has no rows at all.

## Filing commits

The filing motions — `/ft-file-task` (default flow), its `--park`
and `--starter` modes, `/ft-audit`, `/ft-audit-repo`, `/ft-refactor`, and
`/ft-open-epic` (its Step 4 rows, before `.1` is scaffolded) — **commit their own
filing** at hand-off, and `/ft-seed-unattended`, which edits existing rows rather than
filing new ones, commits its write under the same contract. Filing approval *is* commit authorization: the operator
already confirmed at the review gate (follow-up / starter), by passing the park
flag and answering the priority question (park mode), at `/ft-audit`'s
write-step confirmation (tickets plus any inline fixes), at `/ft-audit-repo`'s
plan confirmation, at `/ft-refactor`'s plan-review confirmation, at
`/ft-open-epic`'s ID confirmation, or at `/ft-seed-unattended`'s review gate, and a second commit-go ask buys nothing.
Deliberately exempt: rows a closure files as its own deliverable (an epic
`.1`'s children) ride that closure commit, and `/ft-release`'s optional
release row rides the release commit. Left uncommitted, a filing carries into the next session
as working-tree dirt — which `SPEC.md` §"Paper-complete guard" then converts
into a hard stop at the next `/ft-task` entry. The pre-check below stops that
pile-up when the dirt is only earlier task-row filings: the next filing commits
them with itself. Any other PLAN edit, or a non-empty index, still skips, and
the hard stop remains until a surrounding commit lands.

Message shape, one per filing motion:

| Motion | Commit message |
|---|---|
| `/ft-file-task` (default) | `chore: file <ID> follow-up — <shortname>` |
| `/ft-file-task --park` | `chore: file <ID> park — <shortname>` |
| `/ft-file-task --starter` | `chore: file <ID> starter — <shortname>` |
| `/ft-audit` | `chore: audit file tickets — <domain>` |
| `/ft-audit-repo` | `chore: audit-repo file epics — <count> milestones` |
| `/ft-refactor` | `chore: file <AREA>-EPIC-<N> refactor plan — <shortname>` |
| `/ft-open-epic` | `chore: file <AREA>-EPIC-<N> — <shortname>` |
| `/ft-seed-unattended` | `chore: seed [unattended] — <N> rows` |

Rules:

- **Explicit pathspecs only.** Stage the filing's own paths by name —
  `.flaitron/PLAN.md`, plus `.flaitron/tasknote/<ID>.md` (starter) or
  `.flaitron/sidequest/<ID>.md` (park), plus each inline-fix source path
  (`/ft-audit` §5 trivial-fix carve-out). **Never** `git commit -a`,
  `git add .`, or `git add -A`. A follow-up is routinely filed from *inside*
  an active `/ft-task`, where the working tree legitimately carries the parent
  task's unfinished edits; a greedy stage would commit them under a `chore: file`
  message.
- **Pre-check, then commit accumulated filings or skip.** Two readings,
  taken immediately before the filing's *first write*, not at ID pre-flight.
  Every filing motion pauses for the operator between those points, and the
  tree can gain PLAN.md edits while it waits.

  1. **Index.** `git diff --cached --quiet` must exit 0. Non-zero → do not
     commit. The commit publishes the *whole* index, so a closure that has
     already staged deliverables but not yet its PLAN flip must not ride out
     under a `chore: file` subject. Unstaged files other than `.flaitron/PLAN.md` do not fail
     this reading and are not staged.
  2. **PLAN.md.** `git status --porcelain -- .flaitron/PLAN.md`.
     - Empty → commit. After the append the only PLAN delta is this filing.
     - Non-empty → `git diff --no-ext-diff -- .flaitron/PLAN.md` (no color).
       Commit together when every added line is a task row or blank, and
       every removed line is blank or a section's `(none)` placeholder
       (§"Empty-section placeholder"). Those rows are earlier filings that
       never got their own commit. Record their bold IDs, in file order,
       from this pre-check diff — not from the staged diff after the write.
       The subject stays this motion's row in the table above. When the
       recorded list is non-empty, the body is one line:
       `Also lands earlier uncommitted filings: <IDs>.`
     - Any other PLAN change — an edited existing row, section prose, Vision,
       a closure stub rewrite — → do not commit. Do not split the diff and do
       not rewrite the foreign lines. Say so in one line and leave the filing
       for the surrounding commit.

  A task row is an added line whose body matches
  `^[[:space:]]*- \[[ x]\] \*\*[A-Z]+-(EPIC-)?[0-9]+(\.[0-9N]+)?\*\*`.
  A blank line's body matches `^[[:space:]]*$`. A removed `(none)` matches
  `^[[:space:]]*\(none\)[[:space:]]*$`. Ignore diff metadata (`diff `,
  `index `, `--- `, `+++ `, `@@ `, `\ No newline`) and context lines. One
  failing line fails the whole diff. Do not stage any other path: a prior
  park or starter that never committed leaves its sidequest or starter file
  uncommitted, and this commit does not pick it up.
- **Post-stage verification, then skip on an unrecognized change.** Correct
  placement shrinks the pre-check's staleness window to agent-only time; it
  does not close it. A write landing between the pre-check and `git add` —
  an editor autosave, a format-on-save, a concurrent session — is staged
  unseen and published under a `chore: file` message. So after staging and
  **before** committing, read the whole staged diff (`git diff --cached`,
  **no pathspec** — the commit publishes the whole index, so the read must
  cover the whole index). A changed line this motion did not write must still
  pass the accumulated-filings test above. A changed line this motion wrote
  is recognized: the appended PLAN row, any confirmed reconcile edit, each
  named inline fix, and `/ft-seed-unattended`'s ` [unattended]` insertions (those edits
  fail the line test, which is why the pre-check runs before the seed write;
  post-stage accepts both or it undoes the rows the pre-check allowed). A
  starter or sidequest file this motion created is recognized. Anything else
  is unrecognized, whether it sits in its own hunk or beside a recognized
  line. **An unrecognized change → do not commit:** `git restore --staged`
  every path this filing staged, then take the skip branch above — one line
  saying so, filing left for the surrounding commit. This is the same
  outcome, not a new one; it adds no gate, no report shape, and no 🏁. Do
  not unstage only the bad part. **Why this closes the window rather than narrowing it:**
  `git commit -m` with no pathspec publishes the index as it stands, so a write
  landing *after* `git add` cannot reach the commit. The exposure is exactly the
  pre-check → `git add` span, and the unscoped staged diff is the very content
  the commit will publish — so every write that could have slipped in is visible
  to this read. Re-running the pre-check nearer the stage only makes the same
  window smaller and is not a substitute. For the same reason the commit never
  takes a pathspec (`git commit --only <path>` / `git commit <path>`): that
  form commits the *working tree* of the named paths, bypassing the index the
  read just verified, and re-opens the post-`git add` window.
- **Commit, never push.** Pushing stays the operator's call in their own
  session.
- **Confirmed reconcile edits ride along.** Where the operator confirmed edits
  from [`SPEC/tasknote-selection.md`](tasknote-selection.md)
  §"Downstream-impact reconciliation", they are part of the same filing and
  land in the same commit — so the commit is the filing's **last** write.
- **Not a closure commit.** A filing commit closes nothing: no PLAN.md
  checkbox flip, no archive move, no tasknote `status:` change. It therefore
  carries **no 🏁 marker** — `SPEC.md` §"Paper-complete guard" §3 reserves 🏁
  for a closure SHA covering Acceptance deliverables, which a filing has none
  of. Report the result as plain text instead (`committed <sha>`), the same
  shape `SPEC/loop.md`'s `## 🔁 Iterations` log uses for its per-cycle commits.
- **No new gate.** Filing skills surface neither standing phase-gate banner,
  and this adds none — the two-banner cap in `SPEC/gates.md` §"Operator-gate
  cues" is unaffected.

**Unattended filing authority.** The grounding above assumes an operator act
exists to point at. `/ft-file-task --unattended` has none — no review gate
was answered, no priority question, no write-step confirmation — yet
`SPEC.md` §"Deferred hand-off filing" still obliges an operator-less closure to
file the deferred step as its own unchecked PLAN.md row. The authorization is
therefore **the duty itself**: the run is discharging an obligation the contract
imposes, not exercising discretion, and the operator authorized it upstream by
launching an unattended run against a SPEC that imposes it. Every rule above
holds verbatim — explicit pathspecs, the pre-check and its accumulated-filings
test, the post-stage verification and its skip on an unrecognized change,
commit never push,
no 🏁. What the posture removes is the *pause* before the commit,
never the proof after it (`SPEC/gate-postures.md` §"`--unattended` operator posture").

Three limits come with it. **`--park` is out of scope:** park mode preserves an
operator's tangential mid-session thought and resumes their interrupted work
inline, and both halves presume an operator to have the thought — the
combination is refused rather than given an unattended meaning. **`--starter`
is out of scope too:** a starter body is AI-drafted rich context that exists
to be reviewed, so it keeps the review gate this posture suppresses — the
over-cap stop routes the absent operator to an attended `--starter` filing
rather than the run drafting one unreviewed. And
**reconciliation applies nothing:** [`SPEC/tasknote-selection.md`](tasknote-selection.md)
§"Downstream-impact reconciliation" is one of the things the posture never
relaxes, so an unattended filing still runs the scan and still reports what it
found, but confirms and applies no edit — a run with no operator never performs
the operator's motion.

**Execution skills keep their commit-go gate.** This section governs the seven
filing motions above and `/ft-seed-unattended`'s write, and nothing else. `/ft-task`, `/ft-micro-task`,
`/ft-open-epic` past its Step 4 filing, `/ft-close-epic`, `/ft-release`,
`/ft-adopt`, and `/ft-update` are unchanged: their commits
land deliverables or cut releases, and it is the 📦 conditional skip rule
(`SPEC/gates.md`) — not this section — that decides when they commit
autonomously.

## `## Completed` archive convention

Closed task lines collapse to a stub form:

```markdown
- [x] **TASK-ID** [model] | shortname — Completed YYYY-MM-DD.
```

The long description drops — the archived tasknote at
`.flaitron/tasknote/archive/<area>/<TASK-ID>.md` is the canonical record. So
never park anything durable there: a correction, caveat, or decision left in a
long description is deleted on a schedule (`SPEC.md` §"Tasknote frontmatter" →
factual corrections). Phase 4 closure rewrites the line to the stub form (not just the
checkbox + date); `| shortname` is required so visualizers have a row
title, `[model]` stays optional. The stub form above omits `[unattended]`
and other trailing bracket tokens only because the example row never carried
one — a row that does must keep it: the closure rewrite copies the full
trailing bracket-token run verbatim from the original line (`SPEC.md`
§"Task-line format"), it does not reconstruct the line from `[model]` alone.

**Placement rule.** A standalone closed task moves to the top of
`## Completed`. An epic child uses the same checked stub form but remains
2-space nested beneath its active parent in the parent's priority section
until the closure of its last open sibling moves the parent and complete
cohort to `## Completed` atomically (§"Epic parent flip"). Never strand an
individual child as a top-level Completed row.

**Exception — inline audit fixes.** A trivial fix applied inline by an
audit skill (the `/ft-audit*` §5 trivial-fix carve-out: skip-the-tasknote-sized
patches done at audit time instead of filed as a `## Low` ticket) has no
tasknote and no archive file, so its `## Completed` line **retains** a
short self-contained description plus `Surfaced by <audit-label>
YYYY-MM-DD (Finding #N, <severity>), fixed inline` — here the line itself
is the canonical record.

## Epic parent flip

An epic closes with the closure that leaves its last child `- [x]`. PLAN.md
already says the epic is done, so the flip is mechanical: an agent procedure
with no prompt, run under every posture by whichever runner closed that child.
Every closing runner runs it from [`SPEC/post-closure.md`](post-closure.md)
before step 1 stages anything, so the flip lands in the closure commit and
rotation's count in step 2 includes it:

1. **Check the closing task's own parent only.** It applies when the task's
   ID is `<AREA>-<N>.<sub>` and its row is 2-space nested beneath
   `<AREA>-EPIC-<N>`. Every nested child row must be checked (`- [x]`, either
   case), the one just closed included. One `- [ ]` child, a standalone
   task, or a parent already under `## Completed` means there is nothing to
   do. Other epics are never touched. An epic left fully `[x]` with no flip (an older run, or siblings
   closed in parallel worktrees, each seeing the other open) is flipped by
   hand.
2. **Flip** the parent line to stub form (§"`## Completed` archive
   convention"), dated today, keeping its trailing bracket-token run verbatim.
3. **Move** the parent and its nested children as one block, unchanged apart
   from the parent's flip, to the top of `## Completed`. A source section left
   empty gets its `(none)` back, and a `(none)` under `## Completed` is
   replaced (§"Empty-section placeholder").

Unlike rotation, the flip also runs in a linked worktree. It edits the same
places any closure does (its own rows and the top of `## Completed`), not
dozens of older rows.

## `## Completed` rotation

`## Completed` grows without bound: every closure appends a row and nothing
ever removes one. Tasknotes rotate to `.flaitron/tasknote/archive/<area>/`,
but their PLAN lines never did — so the plan file, which every task reads at
Step 1 and re-reads at post-closure, carries the entire project history
forever. **Rotation bounds the section without deleting anything.**

**The bound.** `## Completed` holds at most **60** checked rows (nested epic
children counted). Past that, the next closure rotates the oldest rows out
until **40** or fewer remain (§"Rotation is an agent procedure"). The gap is
deliberate hysteresis: one rotation buys about twenty closures, instead of a
one-row commit after every closure once the bound is reached.

**The rotation file.** `.flaitron/PLAN-ARCHIVE.md`, a sibling of `PLAN.md`.
Rotated rows are grouped under `## Completed <YYYY-MM>` headings, newest month
first. Rows move **verbatim** — same stub form, same nesting, same text. The
file is **append-only**: a rotated row is never rewritten or reordered once
moved. A month's heading, once created, stays open to further appends at its
existing position for as long as `## Completed` exists — rotation extends the
block in place and never rewrites or reorders it, regardless of which newer
month blocks have since been inserted above it. A row that resolves to a
month with no existing heading gets a new one, inserted in newest-month-first
order. This append rule is what keeps the §"Exception — inline audit fixes"
rows above safe, since those lines *are* their own canonical record and have
no archived tasknote to fall back on.

**Granularity: by row count, not by month.** A rotation moves the oldest
checked rows — regardless of which calendar month they fall in, current month
included — until `## Completed` is at or below the 40-row target. There is no
"complete month" requirement: a still-open month's oldest rows are as
eligible as any other. Rows still land under their own `Completed
<YYYY-MM-DD>.` month's archive heading (§"The rotation file"), so the archive
stays organized by month even though the *trigger* for moving a row is purely
count-based.

**Date resolution.** A row's month comes from its `Completed <YYYY-MM-DD>.`
token. Inline-audit-fix rows (§"Exception — inline audit fixes") carry no such
token — for those, read the date from their mandatory `Surfaced by <audit-label>
<YYYY-MM-DD>` clause, which is the same day the fix landed. A row that resolves
to neither is not rotated; leave it in `PLAN.md` and fix its filing instead.
A 2-space-nested epic child takes its top-level parent's month, so a cohort
lands under one heading (the never-split rule below).

**One rule that overrides the bound:**

- **Never split an epic cohort.** A 2-space-nested child always travels with
  its parent's block, even when its own `Completed` date falls in an earlier
  month or the cohort's move takes `## Completed` below the 40-row target.

**Rotation is an agent procedure.** Every closing runner checks the bound
once its closure commit lands ([`SPEC/post-closure.md`](post-closure.md)
step 2). Over 60, the agent rotates in the same response, with no prompt,
under every posture. The work is moving markdown lines an operator could move
by hand, so it stays a procedure, not a script (`SPEC.md` §"Core principles"
#2):

1. **Main checkout, clean files only.** Skip in a linked worktree, where
   `git rev-parse --path-format=absolute --git-dir` differs from
   `git rev-parse --path-format=absolute --git-common-dir`: a branch that
   moves dozens of PLAN rows conflicts on merge-back. Also skip when either
   file has uncommitted changes (`git diff --quiet HEAD -- .flaitron/PLAN.md
   .flaitron/PLAN-ARCHIVE.md` fails), so step 5 never sweeps someone else's
   edit into its commit. Either way, the next main-checkout closure catches
   up.
2. **Cut.** Count the checked rows under `## Completed`. Over 60, take whole
   top-level blocks (a row plus its 2-space-nested children) from the bottom
   of the section, oldest first (§"Placement rule" inserts new rows at the
   top). Stop as soon as 40 or fewer remain. A row that fails §"Date
   resolution" stays where it is and still counts.
3. **Move.** Group the cut rows by month. Each month's rows go, in their
   `PLAN.md` order, to the end of that month's existing block in
   `PLAN-ARCHIVE.md`, or under a new `## Completed <YYYY-MM>` heading placed
   newest month first. Cut and paste the lines; never retype them. If the file
   is absent, create it with a `# PLAN Archive` heading and a one-line pointer
   to this section.
4. **Verify.** `## Completed` holds 40 or fewer rows, and the `- [x]` row
   lines removed from `PLAN.md` match the `- [x]` row lines added to
   `PLAN-ARCHIVE.md` when both are sorted. Headings and blank lines the move
   adds are not rows.
5. **Commit separately**, after the closure commit and before 🏁, naming only
   the two files:

   ```sh
   git add .flaitron/PLAN.md .flaitron/PLAN-ARCHIVE.md
   git commit -m "chore: rotate <N> Completed rows to PLAN-ARCHIVE.md" -- .flaitron/PLAN.md .flaitron/PLAN-ARCHIVE.md
   ```

   A separate commit keeps the closure commit, and its 📦 review, about the
   task alone. The `git add` covers a first rotation, when the archive file
   is new. The paths after `--` keep any other change in the tree out of the
   commit.

**Why a second file and not a retention window.** Deleting rows past a window
would destroy the inline-audit-fix records described above, and truncate the
all-time history the visualizer reads. Rotation loses nothing.

**Why this does not re-open the single-plan-file decision.** flaitron's
founding adopter migrations collapsed `PLAN.md` + `ROADMAP.md` +
`PLAN_ARCHIVE.md` + `FUTURE_OPPORTUNITIES.md` into one file, because *active*
planning spread across four files meant no single place answered "what is
open?". `PLAN-ARCHIVE.md` holds **closed rows only** and never carries active
work, so that property is unchanged: `PLAN.md` remains the one file that
answers what is open. Do not extend the rotation file to hold anything but
closed rows.

**Consumers.** Readers that need full history — the visualizer's parser —
read both files and concatenate. Readers that only care about
open work (every runner skill's Step 1) read `PLAN.md` alone and are the
rotation's beneficiary. The file is absent until a project's first rotation;
consumers treat absence as an empty archive, never an error.

## Empty-section placeholder

An empty priority section — `## High`, `## Medium`, `## Low`, `## Future
Opportunities`, or `## Completed` — carries a literal `(none)` line rather
than being left blank. `templates/PLAN.md` ships it, blank-line-padded,
under every one of those headings as the canonical shape, and
`viz/src/parser.test.ts` has dedicated coverage (`ignores empty-section
placeholder lines`) confirming the parser recognizes `(none)` as inert prose
and never surfaces it as an unparsed line.

Filing into an empty section replaces its `(none)`; a section that empties
again — its last row completed or moved — gets `(none)` back in the same edit.

