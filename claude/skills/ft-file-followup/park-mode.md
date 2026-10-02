# Park mode (`--park`)

> Lazy-loaded SKILL fragment. Loaded by `claude/skills/ft-file-followup/SKILL.md`
> Step 0 when `park-mode = true`. Carries the whole park flow; the host SKILL's
> Steps 2–5 (AskUserQuestion collection, review gate, reconcile scan,
> conversational paragraph, hand-off) are **bypassed** in this mode.

Park an **idea or quick fix** without breaking the current session. The lightest
persistent filing motion: one tiny stub at `.flowtron/sidequest/<TASK-ID>.md`,
one PLAN line under the right priority section, then straight back to work.

**Lighter than a default `/ft-file-followup` filing:** no review gate, no
downstream-impact reconciliation scan, no conversational paragraph.
**Heavier than chat-only:** the idea, priority intent, and a resume anchor
persist to disk.

Where this fragment and the host SKILL's default flow conflict, **park mode
wins** — it is a distinct filing contract, not a variation on the default one.

## Step P1 — Resolve the task ID

If `args` carries a valid `<AREA>-<NUMBER>` (or `<AREA>-<NUMBER>.<SUB>`) token
after flag-stripping, use it. Otherwise **auto-allocate** the next free ID: area
= active tasknote prefix, else active PLAN entry prefix, else `CORE-`; scan all
PLAN.md lines (open + `## Completed`) for `**<AREA>-<N>**` and
`**<AREA>-<N>.<SUB>**`, take max `N`, use `N+1`. Do not ask unless the area is
genuinely ambiguous — park mode auto-allocates rather than surfacing a
suggested ID for confirmation.

Run the host SKILL's Step 1a pre-flight against the resolved ID, plus one park-
specific check: the ID must NOT already exist at `.flowtron/sidequest/<ID>.md`.
On any conflict, stop and ask for a different ID — do not guess.

## Step P2 — Resolve priority

Parse `args` for a priority flag (any position; strip before drafting):

| Flag | PLAN section | `pickup:` |
|---|---|---|
| `--low` | Low | `next-chat` |
| `--med`, `--medium` | Medium | `soon` |
| `--fut`, `--future` | Future Opportunities | `later` |
| `--high` | High | `soon` |

Examples: `/ft-file-followup --park --low fix null guard in parser`,
`/ft-file-followup --park --med CORE-342`,
`/ft-file-followup --park explore redis --fut`.

**No flag → one short question, then stop.** Before writing anything, ask
exactly one line (no AskUserQuestion widget, no multi-field form):

```text
Park as **Low** (next-chat fix) · **Medium** (soon) · or **Future** (later)?
```

Optionally parenthesize your best read from context, e.g. `(sounds like Low)`.
**Do not write files until the user answers.** On the next turn, map their reply
(`low` / `med` / `fut` / full words / flag repeat) and continue at Step P3.

## Step P3 — Draft

From conversation context + remaining `args` text after flag/ID stripping:

1. **Idea** — compress to ≤80 words in `## Idea`.
2. **Shortname** — ≤30 chars for the PLAN `| shortname` segment.
3. **Long description** — ≤30 words for the PLAN `— ` segment (hard cap; trim
   ruthlessly). A ≤30w line is a strict subset of the host SKILL's ≤50w target,
   so park filings never reach the >70w filing-discipline gate.
4. **Resume anchor** — one sentence in `## Resume anchor`: where the main
   session was (active task + step, or the in-flight user goal).
5. **Parent** — YAML `parent:` = active task ID when one exists; else leave empty.
6. **Priority** — from flag or the user's answer; set YAML `priority:` and
   `pickup:` per the table above. Default model `[light]`; `[medium]` only when
   the idea clearly needs design judgment. Add `[!critical]` on the PLAN line
   only for `--high` with explicit urgency.

**Context hints** (for the question's parenthetical suggestion only — never
auto-file without a flag or an answer): quick fix / typo → suggest Low; same
feature/epic → suggest Medium; tangential exploration → suggest Future. Ready to
execute **now** → `/ft-micro-task`, not this mode.

## Step P4 — Write (one motion)

Template path (resolved by the host SKILL's Step 0 layout branch):

- **Adopter:** `.flowtron/core/templates/sidequest-template.md`
- **Flowtron self-host:** `templates/sidequest-template.md`

Then:

1. **Filing-commit pre-check.** Immediately before any write, apply
   `SPEC/plan-filing.md` §"Filing commits". `git diff --cached --quiet`
   non-zero → `auto-commit = false`. PLAN.md porcelain empty →
   `auto-commit = true`. PLAN.md non-empty → `git diff --no-ext-diff -- .flowtron/PLAN.md`:
   every added line a task row or blank, and every removed
   line blank or a `(none)` placeholder → `auto-commit = true` and those rows
   ride in this commit (record their IDs for the body line that section names);
   any other PLAN change → `auto-commit = false`. Not a gate. Run it here, not
   at Step P1 — the Step P2 priority question waits for the operator.
2. `mkdir -p .flowtron/sidequest/`
3. Copy the template → `.flowtron/sidequest/<TASK-ID>.md`; fill frontmatter, H1,
   nav date, `## Idea`, `## Resume anchor`, `parent:`.
4. Append under `## <Priority>`:

   ```text
   - [ ] **<TASK-ID>** [light] | <shortname> — <long description>
   ```

   Replace the `(none)` placeholder if present; else append to section bottom.

5. **Commit the filing** (when item 1 set `auto-commit = true`).
   Stage both paths by name — never `git commit -a` / `git add .` / `git add -A`,
   since a park fires mid-session in a working tree carrying the interrupted
   work's edits:

   ```sh
   git add .flowtron/PLAN.md .flowtron/sidequest/<TASK-ID>.md
   git diff --cached   # whole index, no pathspec
   git commit -m "chore: file <TASK-ID> park — <shortname>"
   ```

   **Post-stage verification.** Read that staged diff before committing. Item 1
   read the working tree and the index; the commit publishes the index, and
   PLAN.md can gain a foreign write in between that `git add` stages unseen.
   The read takes no pathspec because the commit takes none. Every hunk must be
   one this park wrote — the appended row, and the whole sidequest stub as a new
   file. PLAN.md lines the pre-check classified as accumulated filings — added task
   rows or blanks, and removed blanks or a `(none)` — are part of this commit,
   not an unrecognized hunk. When that pre-check recorded
   IDs, add a second `-m` with the body line `SPEC/plan-filing.md` §"Filing commits"
   names; the subject stays the fence above. An unrecognized hunk → `git restore --staged` both paths, skip the
   commit, and say so in the Step P5 reply exactly as the `auto-commit = false`
   case. Never unstage the foreign hunk and commit the rest. Contract:
   `SPEC/plan-filing.md` §"Filing commits".

   Commit only — never push. Park mode has no review gate, so the **invocation
   itself** (flag + priority flag, or the Step P2 priority answer) is the
   commit authorization; there is no separate commit-go ask. `auto-commit = false`
   → skip, and say so in the Step P5 reply. Full contract:
   `SPEC/plan-filing.md` §"Filing commits".

Do **not** run the downstream-impact reconciliation scan — park mode is
explicitly outside it.

## Step P5 — Resume (mandatory handoff)

Reply in **≤70 words total** using this exact shape — no extra sections, no
reconcile notes, no promotion lecture:

```text
📌 **<TASK-ID>** parked **<Priority>** → `.flowtron/sidequest/<TASK-ID>.md` · committed `<sha>`

**Resuming:** <resume anchor, one sentence>
```

The SHA rides the first line as plain text — it is **not** a third section, and
it is **not** a 🏁 marker (reserved for closure commits; `SPEC.md`
§"Paper-complete guard" §3). When Step P4's commit was skipped, the tail reads
`· uncommitted` instead.

If the user immediately corrects priority in chat, move the PLAN line to the
right section in the same turn (no re-file). When the park was already
committed, that correction is a follow-up commit, not a re-file.

Then **continue the interrupted work inline** in the same response (pick up
code/edits/questions exactly where the session left off before the park). The
park bracket is a parenthetical, not a session end — this overrides the host
SKILL's Step 5 hand-off, which ends its turn.

## Notes

- **Routing:** see `SPEC/tasknote-selection.md`. `--park` = park idea or quick
  fix, ≤80w, resume inline. Need a review gate or reconcile scan → drop the flag
  and run the default `/ft-file-followup` flow. Rich context → `--starter`
  instead (the two flags do not compose). Execute now → `/ft-micro-task` or
  `/ft-task`.
- **PLAN row shape:** standard task-line grammar only — no park suffix, badge
  hook, or viz-specific label. The board shows a normal open task; rich context
  lives in the stub (`## Idea`, `## Resume anchor`). Viz parity is intentionally
  out of scope for this ephemeral parking state.
- **No `[unattended]` candidacy:** the host's Step 3 proposal rides a review
  gate, and park has none by design — the row is written without the token and
  without a candidates line, and is judged for the marker when the stub is
  promoted or run. Not a suppression to un-suppress; there is no gate to host it.
- **Promotion:** fresh session → read stub; `/ft-micro-task <ID>` (quick fix),
  `/ft-task <ID>` (normal), or expand the stub by hand into a starter from
  `tasknote-starter-template.md` (the row already exists, so the `--starter`
  filer's must-not-exist pre-flight refuses the ID — a manual edit, PLAN row
  untouched).
  **Delete `.flowtron/sidequest/<ID>.md` after promotion** — CORE-359.3 cleaned
  up an orphan stub left by a promotion that skipped this step.
- **Context-dependent:** draws from the current conversation — run in-session,
  not after `/clear`.
