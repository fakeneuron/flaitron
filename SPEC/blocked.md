# Blocked tasks

> Lazy-loaded SPEC module. Loaded by `/ft-task` Step 3c when an existing tasknote has `status: blocked`, at Step 5 if a hard dependency surfaces mid-Phase-2, and at Step 0 under `--unattended` (every gate conversion writes a park, and the `park-reason:` code set lives here). See `SPEC.md` for the always-loaded core spec.

A task can be **blocked** at two distinct points in its lifecycle, and
flowtron records each at a different layer. The two signals are independent
— they describe different states and serve different consumers. A third,
optional tasknote-YAML key `blocked-by:` is a *planning* claim (durable
file ownership / predecessor), not a don't-start gate and not a park —
see `SPEC.md` §"Tasknote frontmatter". It does not replace either signal
below. A fourth key, `park-reason:`, **annotates** a park rather than
declaring one — it records why `status: blocked` was set and is cleared on
resume (§"Park reason" below). With no `status: blocked` it has
nothing to annotate, so it is not a further signal.

| Signal | Layer | Means | Entered when |
|---|---|---|---|
| `Blocked by [[ID]]` in PLAN.md long description | PLAN-line | Filed task, dependency cited, not yet started | At filing time, or via Phase 1 Re-scope |
| `status: blocked` in tasknote YAML frontmatter | Tasknote | Started and parked, with the work so far preserved | Phase 1→2 boundary, or mid-Phase-2 |

A task may carry one, both, or neither. Adopting projects' tools render the
two signals independently — the canonical viz parser extracts PLAN
`Blocked by [[ID]]` into `Task.blockedBy` (present whether or not the row
has a tasknote) and may show it as an opt-in row chip (default off). YAML
`blocked-by:` is separate TaskDetail meta, not that chip. The
tasknote-level `status:` drives the row's status badge for rows that have
a tasknote.

**Phase 1 entry (Re-scope path).** If Discovery surfaces a real-but-blocked
prerequisite, the verdict is `Re-scope`. Add `Blocked by [[ID]]` to the
PLAN.md long description (canonical wikilink form, see `SPEC/plan-parser.md` §"Long-description
conventions"). On a flagless run a `Re-scope` verdict **always** fires the 🛠️
Phase 1→2 gate ([`SPEC/gates.md`](gates.md) §"Phase 1→2 exit gate"), so the
operator is already present at exactly this point; the banner's preview line
offers the two dispositions and the operator picks one:

- **Delete and halt** — Discovery produced nothing worth keeping. Delete the
  just-scaffolded tasknote. The `Blocked by [[ID]]` clause carries the whole
  state, and a fresh `/ft-task <ID>` re-enters from the top.
- **Park** — Discovery produced work. Flip `status: blocked` and the nav chip
  to `⏸ Blocked`, write `park-reason: drift — <what Discovery found>`, and
  halt with the tasknote intact. The task re-enters through the ordinary
  resume path (§"Exit (resume)"), Phase 1 not re-run.

Neither disposition adds a verdict: blockers reuse `Re-scope` rather than
introducing a fourth Phase 1 verdict. Either way the task re-enters when the
blocker clears (remove the `Blocked by` clause). A blocker's own Phase 4
closure may strike a `Blocked by` wikilink naming it, on operator
confirmation, in the same closure commit; the dependent's resume path stays
the fallback.

**Why the choice, rather than one rule.** Phase 1 *is* complete at this
boundary, and a completed Discovery — archive skim, drift check, populated
Acceptance — is exactly the work worth preserving, so a blanket delete
discards it ([[CORE-660]] is the worked case: four distinct artifacts, none
of them Phase 2). But a blocker can also surface before Discovery has
produced anything, and parking *that* leaves a shell whose resume costs more
than a fresh start. The operator is the one who knows which they are looking
at, and the 🛠️ banner puts the question where they already are. `status:
blocked` is therefore **not** reserved for mid-Phase-2 parking; it spans the
Phase 1→2 boundary onward, and a Phase-1 park writes `drift`, the code for a
verdict-stop (§"`drift` vs `dependency`").

**Under `--fast`, park and say so.** `--fast` downgrades a Re-scope 🛠️ to an
inline ⚠️ notice ([`SPEC/gate-postures.md`](gate-postures.md) §"`--fast`
operator override"), so there is no banner to put the choice in — but the
operator *is* standing there, and that posture's Re-scope notice is a
**delegation**, not a removed pause. Take the park, name it in the notice, and
the operator overrules it inline if Discovery produced nothing. The default
falls to park for the same asymmetry the unattended path uses: an unnecessary
park costs one resume, an unnecessary delete costs a Discovery.

**Phase 1→2 boundary park (`--unattended`).** Under `--unattended`
([`SPEC/gate-postures.md`](gate-postures.md) §"`--unattended` operator posture") the 🛠️ drift
carve-out has no operator to fire a banner at, so there is nobody to pick
between the two dispositions above. The posture resolves it the safe way: a
`Re-scope` / `De-scope` verdict **parks unconditionally** — flip `status:
blocked`, flip the nav chip to `⏸ Blocked`, write `park-reason: drift — <what
Discovery found>`, halt with the tasknote intact — because an unnecessary
park costs one resume while an unnecessary delete costs a Discovery. The
PLAN.md edit and the tasknote deletion are **not** performed autonomously;
the operator resumes and takes them under a real gate. That deferral, not the
park itself, is what distinguishes this path from the attended one.

**Mid-Phase-2 parking.** If a hard dependency surfaces during Execution,
park the tasknote: flip YAML `status:` from `in-progress` to `blocked`,
flip the nav-header chip from `🟢 In progress` to `⏸ Blocked`, write
`park-reason: dependency — <the dependency>` (§"Park reason" below —
mandatory under `--unattended`, recommended otherwise),
optionally add `Blocked by [[ID]]` to the PLAN.md line (recommended for viz
visibility, not required — the two signals stay independent), and stop. Do
not run Phase 3 or Phase 4. The tasknote sits at
`.flowtron/tasknote/<TASK-ID>.md` until the blocker clears.

**Parked state.** A blocked tasknote is paused, not closed — Phase 4 is
reserved for actual completion (or a Phase 1 De-scope). The tasknote is not
archived, the PLAN.md task line stays unchecked, and Phase 1 + partial
Phase 2 work are preserved verbatim. `park-reason:` states which of the eight
stop causes (§"Park reason" below) put the note here, so a caller reading the
file alone can tell a drift park from a destructive-action park without a
transcript.

**Exit (resume).** Re-running `/ft-task <ID>` against a blocked tasknote enters
the resume path: drift-check the parked work first (Phase 2 progress may
rest on symbols that moved while the task was parked), flip `status:
blocked` → `in-progress`, flip the nav chip back to `🟢 In progress`,
remove `park-reason:` (it describes a current stop, and the run is no
longer stopped), optionally remove the `Blocked by` clause from PLAN.md (or
leave it as historical context), and continue Phase 2 from where parking
left off.
Phase 1 is already complete — do not re-run it.

## Park reason

One additive key, `park-reason:`, records *why* a tasknote sits at
`status: blocked`. Omit-when-absent like the planning keys in `SPEC.md`
§"Tasknote frontmatter": legacy parked notes omit it and tools ignore it when
absent. It appears only while a note is parked.

The value is a **stable code, then prose**, separated by the same ` — ` the
spec uses on the PLAN.md task line (`SPEC.md` §"Task-line format"):

```yaml
status: blocked
park-reason: destructive — needs a `git push` to the public remote before the tag can be verified
```

A caller splits on the first ` — ` to read the code and never parses the
prose. The code comes from a **closed set** — a new stop cause adds a row to
this table, never a free-form value:

| Code | Records |
|---|---|
| `drift` | A Phase 1 `Re-scope` / `De-scope` verdict — the operator's park disposition at the 🛠️ gate, or the unattended posture's unconditional one (§"Phase 1 entry") |
| `destructive` | A 🗄️/▶️/📡/💻 destructive-action escalation |
| `prerequisite` | A ✋ `ACTION` that must be performed before the run can continue |
| `model-mismatch` | The Step 1.5 concrete-`[model]` STOP |
| `input-needed` | A question autonomous execution cannot answer — a queued bundled in-📦 prompt, or `/ft-close-epic`'s Phase 1→2 clarification ask |
| `visual-confirm` | A Phase 3 👁️ `CONFIRM` visual ask — the check an operator-less run has nobody to hand to |
| `dependency` | A hard dependency surfaced mid-Phase-2 — the park that predates the posture |
| `interrupted` | The run ended without reaching closure *or* a gate — killed, out of context, session lost |

The first six are the gate conversions in [`SPEC/gate-postures.md`](gate-postures.md)
§"`--unattended` operator posture" — and `drift` doubles as the attended
operator's park disposition at the 🛠️ gate (§"Phase 1 entry"), the one code
written on both paths; `dependency` is the mid-Phase-2 park
this module has always had. `interrupted` is neither — nothing stopped the
run, it simply ended — and it is the one code a *caller* writes rather than a
runner, to route a stranded note into the resume path (§"Resuming an
interrupted run" below).

**The value is a YAML plain scalar.** It is written on one line, unquoted,
so that a line-wise reader and a YAML parser see the same bytes. Two
sequences a plain scalar cannot carry are therefore forbidden in the prose:
`: ` (colon-space — a YAML parser reads it as a nested mapping and rejects
the whole frontmatter, taking the note out of every tool that parses it) and
` #` (space-hash — a YAML parser reads it as a comment and silently truncates
the value). The value may not end in `:` for the same reason. A writer whose
prose wants a colon rephrases (`visual-confirm — Phase 3 👁️ CONFIRM asks
whether the header renders`, not `… CONFIRM: header renders`); quoting the
value is not the fix, because it changes the bytes a line-wise reader splits.
Backticks, emoji, and a trailing `?` are fine.

**`drift` vs `dependency`.** The code names what *stopped* the run, not what
motivated it. A `Re-scope` verdict parks as `drift` even when a dependency
drove the verdict, because the verdict is the stop. `dependency` is reserved
for the mid-Phase-2 park, where no verdict is involved. The split is what
decides a Phase-1 park's code: every park taken under §"Phase 1 entry" sits
behind a `Re-scope` verdict, so it writes `drift` — attended or not, and
whatever the blocker was.

**Written on every `--unattended` park; optional on an attended one.** With no
operator present the key is the only stop surface a caller has, so a park
without one is a park it cannot classify. An attended park may write it — the
same reason is useful to a human resuming a week later — but is not required to.

**Cleared on resume.** The key describes a *current* stop, so the flip back to
`status: in-progress` removes it, alongside the `⏸ Blocked` → `🟢 In progress`
chip. That is an active-note lifecycle write, not a retroactive edit — the
write-once carve-out in `SPEC.md` §"Tasknote frontmatter" already covers it. A
note that parks twice writes the second reason fresh; a note that reaches
Phase 4 closure carries none.

## Resuming an interrupted run

A park is a *deliberate* stop. A run can also simply **end** — the process is
killed, the context window runs out, the session is lost — leaving the tasknote
at `status: in-progress` with no gate having fired and no `park-reason:`
written. The runners refuse that state by design: `/ft-task` (and its two
siblings) stop on an in-flight tasknote and recommend continuing
conversationally, because restarting a half-executed task from Step 1 would
re-run Discovery over work already done.

That recommendation presumes a session. An operator-less caller has none — but
the tasknote itself holds the context, so the caller may either point a fresh
agent at the note with a prose continue (the runner's own recommendation,
carried out by a new session) or take the conversion below. The parked state
above already expresses "started, paused, resume from here"; the stranded note
simply never entered it.

**The path is two frontmatter writes, then a normal invocation.** The caller —
an operator by hand, or an orchestrator that noticed its child exited without a
commit — writes into the stranded note:

```yaml
status: blocked
park-reason: interrupted — session ended mid-Phase-2 without reaching closure or a gate
```

and re-invokes `<SKILL> <TASK-ID>`. The runner's status branch now sees
`blocked` and takes the **Exit (resume)** path above unchanged: drift-check the
parked work, flip back to `in-progress`, restore the `🟢 In progress` chip,
remove `park-reason:`, continue Phase 2. No new flag, no second resume path,
and no executable change to any runner.

**Flowtron performs neither write.** It ships no crash detector, no supervisor,
and no session daemon (`docs/VISION.md` §"What we won't accept") — a runner
cannot annotate a note in a session that no longer exists. This section is the
contract the caller reports to; the two writes are the caller's, exactly as the
`--unattended` posture is flowtron's contract and the orchestrator is not
([`SPEC/gate-postures.md`](gate-postures.md) §"`--unattended` operator posture").

**Scoped to `in-progress`.** The other two refused statuses are not this case
and take no shortcut:

- `not-started` is a retired template default and should never appear on a note the
  runners scaffolded; treat it as a filing error, not an interrupted run.
- `completed` means Phase 4 ran but the archive move or the commit did not —
  closure was interrupted *inside* the atomic step. That is paper-complete
  territory (`SPEC.md` §"Paper-complete guard"), and the foreign-dirt gate will
  stop the next invocation on the uncommitted work regardless. It is an
  operator repair, not a resume.

**Preserve the note, don't reconstruct it.** Whatever Phase 1 and partial Phase
2 the interrupted run wrote is the reason this path exists. Rewriting the
tasknote from the template, or re-running Discovery on top of it, throws away
exactly what resuming was meant to recover.

## Viz interaction

Adopting projects' tools render `Blocked by [[ID]]` (PLAN-line signal) and
tasknote `status: blocked` as independent signals; a row may show either,
both, or neither, and each rendering is correct in its own layer.
