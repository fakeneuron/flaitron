# Starter mode (`--starter`)

> Lazy-loaded SKILL fragment. Loaded by `claude/skills/ft-file-followup/SKILL.md`
> Step 0 when `starter-mode = true`. Unlike `park-mode.md`, this fragment does
> **not** replace the host flow — it overlays Steps 2–5. Where a step below is
> silent, the host SKILL's step applies unchanged; where it speaks, it wins.

File a **starter tasknote**: the host's PLAN.md line **plus** a
`.flaitron/tasknote/<TASK-ID>.md` carrying rich AI-captured context (rationale,
suspected files, design decisions, open questions) that would otherwise be
lost or bloat the long description. The starter sits at `status: starter`
until `/ft-task <ID>` promotes it (its Step 3a path). Lifecycle contract:
`<SPEC_DIR>/starter.md` — **Read it now**, before drafting anything. Neither
the host nor this fragment loads `SPEC.md`.

**Heavier than the default flow:** an artifact lands on disk, and the PLAN
line carries a pointer to it. **Same gates:** the Step 2 collection, the Step 3
review gate, and the downstream-impact reconciliation scan all run exactly as
in the default flow — a starter body is AI-drafted rich context that exists to
be reviewed. This is why `--starter` composes with neither `--park` (two
artifact shapes) nor `--unattended` (no reviewer); the host's Step 0 refuses
both combinations terminally.

Assumes the conversation has **already surfaced** rich context. If it hasn't,
do not use this mode: drop the flag and file the one-line entry.

## Step S1 — ID and pre-flight

Host Steps 1 and 1a run unchanged. The `.flaitron/tasknote/<TASK-ID>.md`
must-not-exist check there is the one that matters most here — it is the path
this mode writes.

## Step S2 — Collect inputs

Host Step 2 runs with one change to the **filing-discipline gate**: a
long description over 70 words is **not** a stop in this mode. The starter
body is where the rich context goes, so first trim the line toward ≤50 words;
if the user insists on a longer line, record why under a
`### Why the line couldn't be trimmed` sub-heading in the body (Step S3)
before writing. Do not silently breach the cap.

Optional inputs the AI may pre-fill silently (user corrects at the Step S3
review): `tags:`, `due:` (only if the conversation specified a deadline),
`related-tasks:` (wikilinks to predecessors / parent epic / follow-ups).

## Step S3 — Draft the starter body, scan, and surface for review

The `## 🌱 Starter context` body **replaces** the host's conversational
paragraph. Compose it from conversation context using the sub-headings the
starter template ships (Why this exists / Solution shape / Files to touch /
Explicitly out of scope / Decisions locked / Open at promotion / Related);
drop any sub-heading with nothing genuine to capture, per
`<SPEC_DIR>/starter.md`. Everything stays under the single
`## 🌱 Starter context` section — no 🎯 / ✅ / 🧩 spec sections, no phase
scaffolding; promotion adds those.

The host's **downstream-impact reconciliation scan** and its **`[unattended]`
candidacy** proposal both run unchanged — the predicate is evaluated over the
line *without* the `Filed with starter at …` suffix, which carries no signal.

**Surface for review** — the host's Step 3 review gate, with the body in place
of the paragraph: the drafted starter body, the proposed PLAN.md line exactly
as it will be appended (Step S4 shape — with `[unattended]` in place after
`[<model>]` when the host's predicate admitted the row), and any reconcile
proposals (or "no downstream impact"). Edit per feedback before writing
anything. Do not skip the review; it is the commit authorization, and the
operator's assent is the only act that keeps a proposed token.

## Step S4 — Write the starter file and the PLAN.md line

Host Step 4 runs with these substitutions, in the same continuous motion:

1. **Filing-commit pre-check** — unchanged (host Step 4 item 1).

2. **Write the starter file** before the PLAN.md line. Template path (from
   the host's Step 0 layout branch):

   - **Adopter:** `.flaitron/core/templates/tasknote-starter-template.md`
   - **Flaitron self-host:** `templates/tasknote-starter-template.md`

   ```sh
   cp <starter template path> .flaitron/tasknote/<TASK-ID>.md
   ```

   Then fill it: YAML per SPEC §"Tasknote frontmatter" from the Step S2
   inputs — `title:` = the shortname, `status: starter` (already set),
   `created:` = today (`YYYY-MM-DD`); H1 `# <TASK-ID> | <title>`; nav header
   `🌱 Starter (filed <today>)`, plus `· 🔗 [[RELATED]]` chips mirroring
   `related-tasks:` when set; the `## 🌱 Starter context` placeholder body
   replaced with the Step S3 draft.

3. **Append the PLAN.md entry** — host Step 4 item 2, with the starter
   pointer suffix this mode owns (the default flow's "no pointer" rule does
   not apply here):

   ```text
   - [ ] **<TASK-ID>** [<model>] | <shortname> — <one-line long description>. Filed with starter at `.flaitron/tasknote/<TASK-ID>.md`.
   ```

   The Step S2 word count excludes the suffix. A token the S3 review kept
   sits after `[<model>]` exactly as in host Step 4 item 2
   (`[<model>] [unattended] | <shortname>`); a declined or dropped candidate
   leaves the line as shown.

4. **Apply confirmed reconcile edits** — unchanged (host Step 4 item 3).

5. **Commit the filing** (when the pre-check set `auto-commit = true`) —
   host Step 4 item 4, staging **two** paths by name and using the starter
   commit shape from `SPEC/plan-filing.md` §"Filing commits":

   ```sh
   git add .flaitron/PLAN.md .flaitron/tasknote/<TASK-ID>.md
   git diff --cached   # whole index, no pathspec
   git commit -m "chore: file <TASK-ID> starter — <shortname>"
   ```

   **Post-stage verification** as host item 4, over the whole staged diff:
   recognized hunks are the appended row, any confirmed reconcile edit, the
   whole starter file as a new file, and the accumulated filings the pre-check
   recorded. Anything else → `git restore --staged` **both** paths, skip the
   commit, and report it at Step S5 as the `auto-commit = false` case.

6. **No conversational paragraph.** The starter body is the canonical home
   for rationale, file surveys, and decisions — moving that content to disk is
   the point of this mode. Host Step 4 item 5 does not run.

## Step S5 — Hand off

Host Step 5's message, reworded for the artifact:

- Starter filed at `.flaitron/tasknote/<TASK-ID>.md`.
- PLAN.md entry appended under `## <Priority>` with model `<model>`,
  `committed <sha>` — or `left uncommitted (PLAN.md or the index already
  carried other changes)` when the commit was skipped.
- The starter sits until `/ft-task <TASK-ID>` is invoked — that promotion
  drift-checks the captured context against current code and scaffolds the
  rest of the tasknote (`<SPEC_DIR>/starter.md` lifecycle).

Report the SHA as plain text; **no 🏁 marker** (reserved for closure commits —
`SPEC.md` §"Paper-complete guard" §3). Never push.

## Notes

- **Routing:** `SPEC/tasknote-selection.md` §"When to use a tasknote (and
  when not to)". `--starter` = rich context (file survey / open questions /
  design decisions) for a task not ready to start, or a description that will
  not fit the 70w cap. One-liner suffices → drop the flag. Tangential idea,
  resume inline → `--park`. Starting an existing entry → `/ft-task`. Epic
  scope → `/ft-epic-discovery`.
- **Proactive invocation on cross-session handoff:** when rich mid-conversation
  context (epic brief, design conclusion, multi-step plan) won't be consumed in
  this session — e.g., the user is about to `/clear` and run
  `/ft-epic-discovery` or `/ft-task` against an ID not yet filed — file a
  starter **now** rather than burying the brief in a "(run `/ft-X` next and
  paste this above)" parenthetical. The filing is cheap; regenerating a lost
  brief is not. Trigger list: `SPEC/tasknote-selection.md` §"File a starter".
- **Context-dependent:** draws from the current conversation — run in-session,
  not after `/clear`.
