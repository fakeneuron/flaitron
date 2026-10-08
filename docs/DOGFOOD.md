# Flaitron dogfood procedure

A versioned, pasteable verification procedure any AI agent runs to
confirm flaitron compatibility and refresh its `docs/AGENT-COMPAT.md`
`last-verified` row. Covers the three verification surfaces: contract
comprehension, cue-render check, and Phase-1 drive.

Audience: operators running a dogfood session under a new agent or
re-verifying an existing row before a release cut. Paste this file's
content (or reference its path) as the opening prompt in the target
agent's session on the flaitron repo.

## Prerequisites

1. **The flaitron repo** — run the session in a checkout of flaitron
   itself (not an adopter project). The `last-verified` stamps live
   here.
2. **The target agent** — the session must run under the agent whose
   `docs/AGENT-COMPAT.md` row you intend to refresh.
3. **Current version** — note `**Version:** vX.Y.Z` from `SPEC.md`'s
   `**Version:**` line before starting. The resulting stamp records this version.

## The procedure

Run the three steps in order. Do **not** write files or run shell
commands beyond those explicitly listed — this holds for the whole
procedure, the result section included: a dogfood session reports, it
never edits the stamp files. After all three steps pass, report the
result per §"Reporting the result".

### Step 1 — Contract comprehension

Read each file below in full before continuing:

1. `SPEC.md` — the canonical workflow contract; note the version
   string on its `**Version:**` line.
2. `AGENTS.md` — the context entry-point defining your surface.
3. `docs/AGENT-COMPAT.md` — the agent-compatibility matrix; find
   your row and note the current `Last verified` stamp.
4. `SPEC/gates.md` — the gate machinery (the operator-cue inventory
   itself lives in `SPEC/cue-vocabulary.md`).
5. `templates/tasknote-template.md` — the canonical 4-phase tasknote
   shape.
6. `.flaitron/tasknote/README.md` — the AI-referenced docs list and
   the archive layout.

Log: `Contract comprehension complete. flaitron version: vX.Y.Z.
My row: [paste current stamp from AGENT-COMPAT.md].`

### Step 2 — Cue-render check

Emit each cue in the full operator-cue vocabulary below, one per line,
using the canonical `<glyph> <UPPERCASE-LABEL>` form (per
`SPEC/cue-vocabulary.md` §"Operator-cue vocabulary"). Confirm each renders —
no tofu □, no stripped glyph, no mojibake. The UPPERCASE label is the
authoritative cross-agent fallback; note any glyph that fails to render.

**Event cues**
- 🗄️ DB
- ▶️ RUN
- 📡 REMOTE
- 💻 TERM
- ✋ ACTION

**Inline asks**
- 🟢 GO
- 👁️ **CONFIRM** — emitted in the emphasized shape (own line, bold label); note whether the bold renders, shows literal asterisks, or is stripped
- 🔍 AUDIT

**Landmark cues**
- 🛠️ AWAITING APPROVAL — Phase 2: Execution ready
- 📦 AWAITING APPROVAL — Ready to commit
- 🏁 TASK-ID — committed abc1234
- ✅ Phase 1 Discovery complete; entering Phase 2 Execution.

**Next-task cues**
- 🔧 LIGHT (mechanical)
- 🧩 MEDIUM (moderate)
- 🧠 HEAVY (design)
- 💎 FRONTIER (high-stakes — trigger-reached)
- 🔭 XHEAVY (exploratory — manual-only)
- 👇 HERE (run here — do not clear)

Log: `Cue-render check complete. [Note any non-rendering glyphs and
confirm the UPPERCASE label fallback is legible.]`

### Step 3 — Phase-1 drive

Pick one open task from `.flaitron/PLAN.md` (any unchecked line not
under `## Completed`). Run **Phase 1: Discovery** on it as you would
in a real session, following `SPEC.md` §"📝 Phase 1: Discovery":

**Exhausted-PLAN fallback.** If `.flaitron/PLAN.md` has no open task
(every line is under `## Completed` — the PLAN-exhausted terminal
state), do **not** fabricate a task. Instead exercise Discovery on the
terminal state itself: review the board, return a **De-scope** verdict
with the rationale that no open task exists (the expected terminal
state per `SPEC/post-closure.md`), run the archive `ls`/
`grep` and drift check against the most recent `## Completed` entry,
and emit the `default-skip` exit gate. This is a valid Phase-1 drive —
correctly detecting and reporting the exhausted board is the contract
behavior, and the dogfood passes on it.

1. Review the task entry in PLAN.md.
2. **Relevance Assessment** — state Verdict (Proceed / Re-scope /
   De-scope) and Rationale.
3. Read relevant source files in scope for the task.
4. **Archive skim** — run `ls .flaitron/tasknote/archive/<area>/`;
   grep for source paths in scope (prefer YAML `touches:` when set);
   also open IDs named by Related / `supersedes` / ⚠️ pointers; log any
   load-bearing findings.
5. **Drift check** — confirm file paths, function names, and
   hypotheses in the task description still match current code, and
   that the plan you are forming neither contradicts a SPEC contract
   nor diverges from its PLAN.md line.
6. **Clarifying questions** — ask if anything is genuinely ambiguous;
   otherwise write `No clarifications needed` with explicit
   assumptions.
7. **Populate Subtasks** — draft concrete, ordered steps for the task.
8. **Phase 1→2 exit gate** — apply the `default-skip` flavor by name:
   state whether Discovery surfaced a significant scope deviation, and
   whether you are emitting ✅ skip or firing 🛠️.

**Stop here.** Do not proceed to Phase 2 — write no files, run no
shell commands except the archive `ls` and `grep` in step 4.

Verify with:

```sh
git status --porcelain
```

Expected output: **no path this session wrote.** The clause measures
your own writes, not the checkout's state — an empty listing passes, and
so does one that lists only pre-existing dirt you did not create. In
particular, a receipt produced mid-cut in the release session's own
checkout will always see that cut's uncommitted version-pin edits
(`SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md`): those are the only
way the receipt can read the *new* version, they are not yours, and
they do not fail the step or the receipt (CORE-614). A path you did
write fails the step — revert it before reporting.

Log: `Phase-1 drive complete. Task: [TASK-ID]. Exit-gate decision:
[skip ✅ / fire 🛠️]. git status (session-written files): clean.`

## Reporting the result

After all three steps pass, hand the operator a **dogfood receipt** —
do **not** edit `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, or
`docs/PLATFORMS.md` yourself. **The receipt is your final message, and
it is this block filled in — nothing more, nothing rephrased:**

```text
Contract comprehension complete. flaitron version: vX.Y.Z. My row: [stamp as found in docs/AGENT-COMPAT.md].
Cue-render check complete. [non-rendering glyphs, or "all glyphs rendered"; UPPERCASE label fallback legible].
Phase-1 drive complete. Task: [TASK-ID]. Exit-gate decision: [skip ✅ / fire 🛠️]. git status (session-written files): clean.
Proposed stamp: vX.Y.Z · YYYY-MM-DD (dogfooded)
```

The first three lines are the `Log:` lines from Steps 1–3, pasted
verbatim — version read from `SPEC.md`, the row's current stamp as found
in `docs/AGENT-COMPAT.md`, the cue-render outcome, and the Phase-1
drive's task ID + exit-gate decision + the session-written-files status
clause. These are the evidence; a report that summarises them in other
words, or that describes running something other than this procedure,
does not refresh a row (CORE-613: two agents paraphrased and had to be
asked again). The fourth line is the stamp the row should now carry —
`vX.Y.Z` is the version noted in Step 1, `YYYY-MM-DD` is today's date,
and a real re-verification drops any prior `; skipped @ …` suffix. Do
not withhold or qualify the receipt because `git status --porcelain`
listed pre-existing dirt you did not write — Step 3 scopes that clause
to your own writes, and the release walk scores the receipt on the
version, the row, and the drive, never on the checkout's cleanliness.

Whoever applies the edit updates **all of the row's stamp locations
together** (per `docs/AGENT-COMPAT.md` §"Reading the cells"):

- **Claude Code** → `docs/AGENT-COMPAT.md` matrix row +
  `claude/CAPABILITIES.md` §"Last verified"
- **Grok Build / Codex CLI / Cursor** → `docs/AGENT-COMPAT.md` matrix row
  + their `docs/PLATFORMS.md` per-agent footers
- **Other agents** → `docs/AGENT-COMPAT.md` matrix row only (no
  separate trigger-reference file yet)

That writer is the operator by hand for a standalone re-verification,
or the release-driving `/ft-release` session's §5 dogfood-gate walk
during a cut — never the dogfood session, even when it is the only one
running. The walk is what enforces this shape: it resolves a row as
refreshed only against a receipt, and it re-checks every stamp from
file state before tagging, so a session that writes anyway is both
racing the walk and gaining nothing (CORE-406, CORE-501, CORE-588 —
three cuts in a row reconciled a parallel session's stamp writes by
hand before this was made report-only).

## Related

- [`docs/AGENT-COMPAT.md`](AGENT-COMPAT.md) — the compatibility
  matrix; carries the stamps this procedure refreshes and the full
  update-obligation contract (§"Reading the cells")
- [`SPEC/cue-vocabulary.md`](../SPEC/cue-vocabulary.md) §"Operator-cue vocabulary" —
  the authoritative source for the Step 2 cue vocabulary
- [`docs/PLATFORMS.md`](PLATFORMS.md) — per-agent structural notes;
  per-agent footers receive stamp updates from Step 3 for Grok/Codex/Cursor
- [[CORE-269]] — the task that produced this document
