---
name: ft-file-followup
description: File a mid-flow follow-up task from inside an active tasknote. With `--park`, parks an idea or quick fix without losing it (tiny stub, resume inline). With `--starter`, files a starter tasknote with rich AI-captured context for work not ready to start. With `--unattended`, files with no operator present, auto-allocating the ID and suppressing review gates.
---

# file-followup — flowtron lightweight follow-up filer

You are filing a **follow-up task** for the task ID provided in `args`, or for
the suggested ID confirmed during input collection when `args` is omitted. The
full filing thresholds live in `SPEC/tasknote-selection.md` §"When to use a
tasknote (and when not to)" — this skill is the executable interpretation, not
a replacement. Treat SPEC.md as authoritative when this file is silent or in
tension.

A default `/ft-file-followup` filing produces **zero artifacts on disk beyond a single PLAN.md task line**. The "short context paragraph" — rationale + suspected scope + recommended priority/model — is delivered conversationally only, in the same response as the filing confirmation. There is no tasknote file. Active tasknotes (if `/ft-file-followup` runs mid-flow inside `/ft-task`) are **not** edited — no breadcrumb, no log entry. The active tasknote stays a record of what it was for, not a coordination ledger.

This skill is **filing-only**, and its default flow is the lightest of its three weights: use it as-is when the description fits in ≤50 words and no rich context (file survey / open questions / design decisions) needs to persist. If the description would breach 70 words or rich context warrants preserving, re-invoke with `--starter` — the SKILL surfaces this gate at Step 2.

Two flags deviate from both paragraphs above. **Park mode (`--park`)** writes a tiny stub at `.flowtron/sidequest/<ID>.md` in addition to the PLAN.md line, skips the review gate and the reconciliation scan, and resumes the interrupted work inline instead of handing off — full flow: `park-mode.md`. **Starter mode (`--starter`)** writes a starter tasknote at `.flowtron/tasknote/<ID>.md` carrying the rich context, keeps every gate, and suffixes the PLAN.md line with a pointer to it — full flow: `starter-mode.md`. Step 0 loads whichever fragment its flag names, via the `step-0-flags.md` fragment it reads whenever a flag is present.

If the task ID is missing, suggest one during input collection instead of
requiring it up front. If a non-flag token is present but doesn't match
`<AREA>-<NUMBER>` (or `<AREA>-<NUMBER>.<SUB>` for epic subtasks), stop and ask
the user for a valid task ID.

## Step 0 — Resolve paths and parse args

Two layouts. Pick by which file exists:

- **Adopter project:** `.flowtron/core/SPEC.md` exists → SPEC=`.flowtron/core/SPEC.md`, SPEC_DIR=`.flowtron/core/SPEC/`, SKILL_DIR=`.flowtron/core/claude/skills/ft-file-followup/`, templates=`.flowtron/core/templates/` (`sidequest-template.md` for park mode, `tasknote-starter-template.md` for starter mode).
- **Flowtron self-host:** repo-root `SPEC.md` with heading `# Flowtron — Workflow Specification` → SPEC=`SPEC.md`, SPEC_DIR=`SPEC/`, SKILL_DIR=`claude/skills/ft-file-followup/`, templates=`templates/`.

If neither matches, bail. PLAN=`.flowtron/PLAN.md`, tasknote dir=`.flowtron/tasknote/`, sidequest dir=`.flowtron/sidequest/` either way.

**Parse `args`.** Initialize `park-mode = false`, `starter-mode = false`, and
`unattended-mode = false`. If no token in `args` starts with `-`, the flagless
flow needs nothing further here: a `<AREA>-<NUMBER>` token is the proposed task
ID, any remaining free text is drafting context, and Step 1 follows. Otherwise
**Read `<SKILL_DIR>step-0-flags.md` now** and follow it: it walks `args` as an
unordered flag set, refuses the flag combinations that do not compose, defines
the shared `⏸ --unattended stop — <cause>: <one line>` shape, and dispatches
`park-mode.md` / `starter-mode.md` or the unattended posture with its inline
marker; then continue to Step 1.

Default flow (`park-mode = false`, `starter-mode = false`,
`unattended-mode = false`) is byte-identical to the pre-flag skill.

## Step 1 — Resolve or suggest the task ID

If no task ID token was parsed in Step 0, propose a **Suggested ID** before
collecting the rest of the fields (park mode auto-allocates instead — see
`park-mode.md` Step P1):

1. Choose the likely **Area** from conversation context (`CORE`, `FE`, `BE`,
   `DB`, `DEPLOY`, `TEST`, or a project-specific prefix declared in
   `.flowtron/tasknote/README.md`). If the area is genuinely ambiguous, ask one
   short area question before suggesting an ID.
2. Scan `.flowtron/PLAN.md`, `.flowtron/tasknote/`,
   `.flowtron/tasknote/archive/`, and `.flowtron/sidequest/` for IDs with that
   prefix.
3. Suggest the lowest unused next numeric task ID for that prefix. Use the
   next integer after the highest existing non-epic task number; skip any ID
   already present in PLAN.md, active tasknotes, archived tasknotes, or sidequest
   stubs. Do not allocate epic decimal children unless the user explicitly asked
   to file an epic subtask.
4. Carry the suggested ID into Step 2 as a user-reviewable field. The user can
   accept it or provide a different valid ID before anything is written.

If a task ID token was parsed in Step 0, use it as the proposed task ID.

**When `unattended-mode = true`**, steps 1-3 run unchanged but step 4 does not:
the scan is deterministic, so **auto-allocate** the ID it produces and carry it
straight to Step 1a — there is no reviewable field, because there is no
reviewer. If the area is genuinely ambiguous at step 1, the one short area
question cannot be asked either; stop:

```markdown
⏸ --unattended stop — area-ambiguous: cannot infer the task-ID prefix. Pass an explicit `<AREA>-<NUMBER>`; nothing written.
```

## Step 1a — Pre-flight checks

- Resolve the **Area** by reading the `.flowtron/tasknote/README.md` §"Archive layout" table — every task, every prefix, canonical ones included. `<area>` is **never derived from the task ID**: lowercasing the prefix is the adopter's declaration-time default, not a resolution you may perform, and a project may deliberately declare a folder it would not produce (`OPS-*` → `archive/operations/`). See SPEC §"Task ID convention". If the table has no row for this prefix, stop and ask — do not guess a folder.
- The task ID must NOT already exist in PLAN.md. If it does, stop and ask whether the user meant a different ID — `/ft-file-followup` files NEW tasks; reusing an existing entry is out of scope.
- `.flowtron/tasknote/<TASK-ID>.md` must NOT already exist. If it does, stop. Surface the conflict (could be in-flight, blocked, completed, starter, or already a follow-up that was promoted). In starter mode this is the path being written, so the check is load-bearing rather than defensive.
- `.flowtron/tasknote/archive/<area>/<TASK-ID>.md` must NOT already exist. If it does, stop — the ID has been used and archived; pick a fresh ID.
- **Park mode only:** `.flowtron/sidequest/<TASK-ID>.md` must NOT already exist either. On conflict, stop and ask for a different ID.

**When `unattended-mode = true`**, every check above still runs and still stops
— but it **terminates and writes nothing** instead of asking for a different ID,
in the Step 0 stop shape (`⏸ --unattended stop — id-conflict: …`, naming the
colliding path). Do not auto-bump to the next free ID: a collision on a
deterministically-allocated ID means the scan and the tree disagree, and picking
a neighbouring number papers over that rather than surfacing it.

## Step 2 — Collect inputs

Use AskUserQuestion to confirm the key fields. Pre-populate from conversation context where possible — the AI proposes; the user confirms or overrides.

**When `unattended-mode = true`**, skip the AskUserQuestion call entirely and
**draft all five fields** from the calling context — the closing tasknote's
Recap, its `## 🔄 Handoff`, and the Acceptance criterion that deferred the step.
The AI proposes and nobody overrides, so state the drafted values in the Step 5
report where the absent operator will see them.

0. **Task ID** — use `args` when provided; otherwise use the Suggested ID from
   Step 1. The user may override before filing. If the user changes the ID,
   rerun Step 1a against the final ID before Step 3.
1. **Title (shortname)** — concise; up to ~30 chars. Used as the `| shortname` segment on the PLAN.md line.
2. **Priority** — `High | Medium | Low | Future Opportunities`. AI proposes its best read. For urgent rows, propose `High` with a `[!critical]` flag (see `SPEC/task-line-segments.md`).
3. **Model** — see `SPEC/model.md` §"Model field" (and its "Practical guidance and agent-aware defaults" subsection) for examples and realistic defaults (mid-tier models like Grok/Sonnet often `[medium]`, or `[light]` for mechanical work); AI proposes a token (primary labels or specific name); goes on the PLAN.md task line.
4. **Long description** — the one-line PLAN.md long description (everything after `— ` on the task line). AI drafts from conversation context.

**Filing-discipline gate** (per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds"). Word-count the drafted long description:

- **≤50 words:** proceed.
- **51-70 words:** trim if practical; otherwise proceed with a yellow-flag note in the review surface (Step 3).
- **>70 words:** STOP. The description breaches the hard cap — the default flow is the wrong weight. Surface to the user: "The drafted description is `<N>` words (>70w cap). This belongs in a starter body, not a one-line PLAN.md entry. Recommend re-invoking as `/ft-file-followup <ID> --starter`." Do not proceed unless the user trims the description below the cap. **When `starter-mode = true`** the cap is not a stop — `starter-mode.md` Step S2 owns the override.

The 70w cap exists so PLAN.md stays scannable; rich context belongs in starter bodies (`--starter`) or full tasknotes (`/ft-task`). The default flow's niche is the ≤50w + ephemeral-context band only.

**Under `unattended-mode = true` the cap binds harder, not softer.** The
description is now self-drafted rather than operator-supplied, so a breach is
self-inflicted and fixable in place: **redraft once**, tighter, targeting ≤50
words. If the redraft still exceeds 70 words the context genuinely does not fit
this tool — do **not** file an over-cap row (that would silently defeat the gate
this skill exists to enforce). Stop instead, so the deferred step surfaces to
the operator as a stop rather than as a bad row:

```markdown
⏸ --unattended stop — over-cap: description is <N> words after redraft (>70w). Belongs in a starter body (an attended `--starter` filing); nothing written.
```

## Step 3 — Draft, scan, and surface for review

**When `starter-mode = true`**, `starter-mode.md` Step S3 substitutes the `## 🌱 Starter context` body for the paragraph drafted here; the scan and the review gate below run unchanged.

Draft the conversational paragraph from prior conversation context. **Free-form prose**, no fixed schema or bold-prefix prompts; the SKILL prescribes intent only:

- **What surfaced this follow-up** (the rationale tying it to the current conversation or active tasknote).
- **Suspected scope** (files / paths / hypotheses, when the conversation has surfaced any).
- **Why this priority and model** (one short clause when non-obvious; skip if obvious from the line itself).

Keep the paragraph under ~80 words. If the conversation has surfaced more context than fits, that is itself a signal to re-invoke with `--starter` — surface to the user.

**Downstream-impact reconciliation scan** (per SPEC/tasknote-selection.md §"Downstream-impact reconciliation" — authoritative for triggers, scan steps, and vocabulary). After drafting the new line, scan **active** PLAN entries (`High` / `Medium` / `Low` / `Future Opportunities`; `## Completed` is out of scope) for ones that share a surface with the new follow-up — same files, subsystem, contract, or a cited `[[wikilink]]` dependency. For each, classify impact (stale / contradictory / redundant / unaffected) and propose one reconcile action (merge / nest / edit / delete / leave). Routine filings that obviously touch nothing downstream (first task in a fresh area, a self-contained ticket) skip the scan — apply judgment, then note "no downstream impact" in the review surface. **Propose only — never edit an existing line before the user confirms** (the user-confirm gate is the existing review below, not a separate approval).

**`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures" — Read that module now, at this write step). Run its §"Candidacy predicate" over the drafted line exactly as Step 4 will append it — `[model]`, any `[!critical]`, the description, any `Blocked by` clause; clause 6 applies only when the ID is an epic subtask the user asked for. Every clause must hold; when one is uncertain the row is not a candidate. A candidate is **proposed, never seeded**: it is shown in the review below with the token in place, and the token is written at Step 4 only if the operator's confirmation keeps it. Flowtron itself never writes `[unattended]` on its own discretion (`SPEC/task-line-segments.md`).

**Surface for review.** Show the user, in one short message:

- The proposed PLAN.md line, exactly as it will be appended — **with `[unattended]` in place after `[<model>]` when the predicate admitted the row**, and one clause saying so (`candidate for [unattended] — <clause-6 predecessor, if any>`). The operator's assent keeps the token; an edit that drops it drops it. A row the predicate declined shows no token and says nothing.
- The drafted conversational paragraph.
- **Any proposed reconcile actions** — one impacted entry per line with its classification and proposed action (or "no downstream impact" when the scan found none or was skipped).

Edit per their feedback before writing anything. Do not skip the review. The reconcile proposals and the candidacy proposal fold into this same review gate — neither is a separate approval step, and neither adds a cue, banner, or checklist box.

**When `unattended-mode = true`:**

- **The review gate is suppressed** — there is nobody to surface it to, and a
  gate that fires into an empty session is a hang, not a safeguard.
- **The candidacy predicate still runs, and its result is reported, never
  written.** With no operator act there is nothing to confirm a token against,
  so Step 4 writes every row *without* `[unattended]` and the Step 5 report
  carries, on its own line, `unattended-candidates: <ID>` — or
  `unattended-candidates: none` when the predicate declined the row. The line
  always emits under this posture, so a later reader can tell "ran, found none"
  from "never ran". A run with no operator never marks its own rows.
- **The reconciliation scan still runs.** `SPEC/gate-postures.md` §"What `--unattended`
  never relaxes" holds it: it guards plan correctness rather than pacing, so the
  posture may not skip it. On the three runners an unconfirmable direction change
  parks as `drift`; here there is no tasknote to park, so the resolution is the
  same principle in the shape this motion allows — **scan, report, apply
  nothing.** Carry every classification and proposed action verbatim into the
  Step 5 report so the operator can act on them under a real gate later. Step 4
  item 3 becomes a no-op by construction: nothing was confirmed, so nothing is
  applied. A run with no operator never performs the operator's motion.

## Step 4 — File the entry

**When `starter-mode = true`**, `starter-mode.md` Step S4 runs this motion with its substitutions: the starter file is written before the line, the line carries the `Filed with starter at …` suffix, the commit stages two paths under `chore: file <ID> starter — <shortname>`, and item 5 does not run.

In one continuous motion, after the user has confirmed the Step 3 review (including any reconcile proposals) — or, under `unattended-mode = true`, immediately, since Step 3 surfaced no gate to confirm:

1. **Filing-commit pre-check.** Immediately before the append, apply `SPEC/plan-filing.md` §"Filing commits". `git diff --cached --quiet` non-zero → `auto-commit = false` (item 4 publishes the whole index, so a closure's staged deliverables must not ship under this subject). PLAN.md porcelain empty → `auto-commit = true`. PLAN.md non-empty → `git diff --no-ext-diff -- .flowtron/PLAN.md`: every added line a task row or blank, and every removed line blank or a `(none)` placeholder → `auto-commit = true` and those rows ride in this commit (record their IDs for the body line that section names); any other PLAN change → `auto-commit = false`. Not a gate. Steps 2-3 span operator turns, so a pre-flight reading can be stale.

2. **Append the PLAN.md entry.** Append a new entry under the appropriate `## <Priority>` heading using the canonical task-line grammar (SPEC §"Task-line format"; a dependency on another row is `Blocked by [[<ID>]]`, wikilink-only — `SPEC/plan-parser.md` §"Long-description conventions"):

   ```
   - [ ] **<TASK-ID>** [<model>] | <shortname> — <one-line long description>
   - [ ] **<TASK-ID>** [<model>] [unattended] | <shortname> — <one-line long description>   ← only when the Step 3 review kept the token
   ```

   `[unattended]` sits after `[<model>]` and any model-suggestion glyph (SPEC §"Task-line format"; position footgun in `SPEC/plan-parser.md`). It is written **only** on a row the operator confirmed as a candidate at Step 3 — never under `unattended-mode = true`, where the candidate is reported at Step 5 instead.

   Placement:
   - If the priority section already has entries, append to the bottom of that section.
   - If the section carries a `(none)` placeholder, replace the placeholder with the new entry.

   No `Filed with starter at ...` pointer (that suffix is starter mode's — `starter-mode.md` Step S4). The new line carries only the long description — no breadcrumb to a tasknote that doesn't exist.

3. **Apply confirmed reconcile edits.** If the Step 3 scan surfaced impacted entries and the user accepted (or amended) any proposed actions, apply those PLAN.md edits in the same motion — merge / nest / edit / delete the affected lines per the confirmed action. Apply nothing the user rejected or didn't see. No impact (or scan skipped) → no-op. **Under `unattended-mode = true` this is always a no-op** — the scan ran but nothing was confirmed, and its findings travel in the Step 5 report instead.

4. **Commit the filing** (when `auto-commit = true` from step 1 above). The filing's **last** write, so confirmed reconcile edits land with it. Stage the one path by name — never `git commit -a` / `git add .` / `git add -A`, since a mid-flow filing sits in a working tree carrying the parent `/ft-task`'s unfinished edits:

   ```sh
   git add .flowtron/PLAN.md
   git diff --cached   # post-stage verification — whole index, no pathspec; read before committing
   git commit -m "chore: file <TASK-ID> follow-up — <shortname>"
   ```

   **Post-stage verification is not optional.** The item-1 pre-check reads the working tree and the index; the commit publishes the index, and PLAN.md can gain a foreign write in between (an editor autosave, a concurrent session) that `git add` then stages unseen. Read the **whole** staged diff — no pathspec, since the commit takes the whole index — and confirm every hunk is one this filing wrote — the appended row, plus any confirmed reconcile edit from item 3. PLAN.md lines the pre-check classified as accumulated filings — added task rows or blanks, and removed blanks or a `(none)` — are part of this commit, not an unrecognized hunk. When that pre-check recorded IDs, add a second `-m` with the body line `SPEC/plan-filing.md` §"Filing commits" names; the subject stays the fence above. An unrecognized hunk → `git restore --staged .flowtron/PLAN.md`, skip the commit, and report it exactly as the `auto-commit = false` case at Step 5. Never unstage the foreign hunk and commit the rest. Because `git commit -m` publishes the index as it stands, nothing landing after `git add` can reach the commit — so this read closes the window rather than narrowing it. Never narrow the commit with a pathspec (`git commit --only`) instead: that commits the working tree of the named path, bypassing the index this read just verified.

   Commit only — never push. `auto-commit = false` → skip this step entirely and note it in Step 5. Full contract: SPEC/plan-filing.md §"Filing commits".

   **Under `unattended-mode = true` the commit still runs, and every rule above
   still binds** — explicit pathspec, the item-1 pre-check and its accumulated-filings test,
   the post-stage verification and its skip on an unrecognized change,
   commit-never-push, no 🏁. What changes is only what authorizes it: with no
   review gate answered, the authorization is the duty in `SPEC.md` §"Deferred
   hand-off filing" itself, per SPEC/plan-filing.md §"Filing commits" →
   "Unattended filing authority". Note that the pre-check makes the two orderings
   converge without special-casing: invoked from a closure that has already staged
   anything — its PLAN.md flip, or deliverables ahead of the flip (`git rm`s,
   source edits) — the index reading fails, `auto-commit = false`, and the new
   row simply rides into that atomic closure commit; invoked with a clean index,
   it commits standalone, and earlier task-row filings ride along when the pre-check allowed them. Closure follows. Both are already-supported
   behavior, so `SPEC.md` §"Paper-complete guard" §2 is unaffected either way.

5. **Deliver the conversational paragraph.** Surface the reviewed paragraph from Step 3 in the same response as the filing confirmation. The paragraph is **chat-only** — never persisted to disk, never written into the active tasknote. Under `unattended-mode = true` it is unreviewed rather than reviewed, and it folds into the Step 5 report — the sole surface an absent operator reads.

## Step 5 — Hand off

**When `starter-mode = true`**, `starter-mode.md` Step S5 supplies the message (starter path, PLAN entry, promotion pointer); the SHA / no-🏁 / never-push rules below hold.

Surface to the user, in one short message:

- `<TASK-ID>` filed at `.flowtron/PLAN.md` under `## <Priority>` with model `<model>`, `committed <sha>` — or, when Step 4.4 was skipped, `left uncommitted (PLAN.md or the index already carried other changes)`.
- The follow-up sits as a one-line PLAN.md entry until `/ft-task <TASK-ID>` (or `/ft-micro-task` for a one-shot) fires.
- (Conversational paragraph from Step 4.5 is included in this response.)

**When `unattended-mode = true`**, the same message is the run's only output and
the absent operator's only record, so it additionally carries: the five
auto-drafted fields (ID, shortname, priority, model, description) marked as
drafted-not-reviewed; every reconciliation finding from Step 3 with its
classification and proposed action, marked **not applied**; the unreviewed
context paragraph; and, on its own line, the Step 3 candidacy result:

```text
unattended-candidates: <TASK-ID>
```

(or `unattended-candidates: none`). No token was written — the line names a row
an operator may later mark in an attended session. A closure that invoked this
skill to discharge `SPEC.md` §"Deferred hand-off filing" copies that line
verbatim into its own tasknote's Final Summary before the archive move
(`SPEC/unattended-candidacy.md` §"Persistence"; the runner-side hook lives in
`/ft-task`'s shared `unattended-mode.md`); a standalone invocation has no
tasknote, and this report is its only record. Keep the
`⏸ --unattended stop — …` shape for the failure paths and this ordinary
hand-off shape for success — a filing that worked is not a stop.

The filing is committed by Step 4.4 — the Step 3 review approval **is** the commit authorization (under `--unattended`, the SPEC-imposed duty is, per §"Filing commits" → "Unattended filing authority"), so there is no separate commit-go ask. Report the SHA as plain text; emit **no 🏁 marker** (that glyph is reserved for a closure commit covering Acceptance deliverables — SPEC.md §"Paper-complete guard" §3). Never push. When the pre-check set `auto-commit = false`, the new PLAN.md line is instead bundled into whatever commit the surrounding conversation produces, exactly as before.

## Notes

- **Filing-only — no design decisions in the skill flow itself.** All context (rationale, suspected files, recommended priority/model) comes from the prior conversation; the skill just records the line and surfaces the paragraph.
- **Routing across the filing cohort:** see SPEC/tasknote-selection.md §"When to use a tasknote (and when not to)" for the full decision tree. One filer, three weights: the default flow's niche is ≤50w + ephemeral context only. Tangential idea + resume inline + no review gate → add `--park` (lighter; see `park-mode.md`). Above 50w, or a file survey / open questions / design decisions worth persisting → add `--starter` (heavier; see `starter-mode.md`). Filing+executing in one shot → `/ft-micro-task`. Starting an existing PLAN.md entry → `/ft-task`.
- **`--unattended` is the operator-less posture, not a speed flag.** Its one legitimate caller is a closure with no operator present discharging `SPEC.md` §"Deferred hand-off filing". It buys no autonomy an attended run lacks: the filing-discipline cap, the reconciliation scan, the pre-check, and the pathspec discipline all still bind, and every question it cannot answer terminates readably rather than being answered on the operator's behalf. Posture contract: `SPEC/gate-postures.md` §"`--unattended` operator posture".
- **No active-tasknote breadcrumb.** When invoked from inside `/ft-task`, `/ft-file-followup` does not write into the active tasknote — keeps the active tasknote a record of what it was for, not a coordination ledger. This is the strict reading of "only one PLAN.md line on disk."
