# Tasknote selection

> Lazy-loaded by `/ft-task`, `/ft-file-task`, `/ft-open-epic`, `/ft-refactor`, and `/ft-import-task` for routing, filing word limits, and downstream-impact reconciliation. See `SPEC.md` for the core contract and [`SPEC/plan-filing.md`](plan-filing.md) for filing commits, Completed stubs, and rotation.

## When to use a tasknote (and when not to)

**Use a tasknote** for epic children and work outside the direct-edit path,
including design tradeoffs. Keep fixes that serve an active task's
acceptance in that task.

### Direct-edit path (skip tier)

Use direct edit for an authorized fix with known, local impact. It touches
one file or a tightly coupled pair, its intent is clear from the diff, and
it is easy to revert. A clarification of an existing SPEC rule or a small bug
fix with its regression test can qualify. Route new contract decisions,
uncertain behavior, privileged changes, and work needing a workflow gate
such as visual confirmation through the tasknote path. Use the privileged-ops
signal in [`SPEC/gates.md`](gates.md) §"Conditional skip rule" and judge the
actual impact of the change.

For an open standalone row without a tasknote or sidequest stub, the
`/ft-task` Step 1 advisory lets the operator choose direct edit. For an
unfiled fix requested or approved mid-session, use this path in conversation.

1. **Isolate.** Start with an empty index and clean target paths. Preserve
   unrelated work. If pending edits overlap or affect verification, defer
   the fix or work in isolation.
2. **Review and check.** Show the scoped diff and run the narrowest applicable
   project validation, including documented drift and budget checks for
   contract edits (in flaitron, `bash tools/drift-checks.sh`).
   Report the results or say why no project check applies. Resolve failures
   before committing. If the diff outgrows eligibility, use the tasknote path.
3. **Commit locally.** Choosing direct edit for a filed row authorizes the
   commit. For an unfiled fix, use explicit or standing commit authorization.
   Stage by path. Commit only if `git diff --cached --check` passes and the
   full staged diff matches the verified edit plus any filed Completed stub
   ([`SPEC/plan-filing.md`](plan-filing.md) §"Exception — skip-tier closures").
   An unfiled fix uses a plain Conventional Commit subject such as
   `fix: correct the empty-state count` with no task ID. Its commit is the sole
   record. Report the SHA.

### Other workflow routes

**Draft a spec (`templates/spec-template.md`) when:**

- A design worked out in conversation is not yet decomposed into tasks, or spans an epic-shaped body of work
- You want operator review of the design before any PLAN.md line or tasknote exists

A spec is a planning artifact, not a filing: copy the template to
`.flaitron/specs/<slug>.md` (create the directory on first use), fill its six
sections, review it, then convert its Tasks section via `/ft-open-epic`,
`/ft-file-task --starter`, `/ft-task`, or a direct PLAN.md line. No skill
drives it.

**Skip the spec (go straight to filing) when:**

- A one-liner idea needs neither a spec nor a starter — write the PLAN.md line directly
- The design is already clear and decomposed — file with `/ft-file-task --starter` or `/ft-open-epic`

**Plan a refactor (`/ft-refactor <target> [--fast]`) when:**

- One named target (file, module, directory, subsystem) needs restructuring too sequenced for one tasknote and too specific for an open-scope epic — including an `/ft-audit structure` depth escalation
- Behavior must be preserved, so characterization-test coverage is staged before any move

`/ft-refactor` is read-only on source and files a parent epic of starter
children plus a `.N` audit; execution is normal `/ft-task` cycles. No target →
`/ft-audit structure`; open scope → `/ft-open-epic`.

**File a starter (`/ft-file-task [ID] --starter`) when:**

- The PLAN.md long description would exceed **~50 words (target) or 70 words (hard cap)**
- Rich context (rationale, design decisions, file survey, open questions) surfaced mid-flow but the work is not starting now — park it before `/clear` can lose it

**Skip the starter (just add a one-line PLAN.md entry) when:**

- The long description fits inside ~50 words and no design or survey work has been done yet
- Starting it next is the natural move (file, then start)

**File a follow-up (`/ft-file-task [ID]`) when:**

- A ≤50-word task surfaces mid-flow and its rationale is worth one paragraph in chat but not on disk — one PLAN.md line, no tasknote file, the active tasknote untouched

**Skip the default follow-up (add `--starter`, or just inline a PLAN.md line) when:**

- The description would breach 50 words, or the context should persist to disk — add `--starter`
- No live conversation produced the rationale — write the PLAN.md line directly

**Park an idea instead (`/ft-file-task --park [--low|--med|--fut|--high] [ID] [idea]`) when:**

- You are deferring an idea or quick fix without switching context and it fits a ≤80-word stub plus a ≤30w PLAN one-liner

**Priority flags** (override the AI's read): `--low` → `## Low` (`pickup:
next-chat`); `--med` / `--medium` → `## Medium`; `--fut` / `--future` →
`## Future Opportunities`; `--high` → `## High`. **No flag** → the AI files
at its best-read priority without asking; the reply names it for correction.

Park mode skips the review gate and the reconciliation scan, auto-allocates the
ID, and continues the main session inline; where it conflicts with the default
follow-up contract, park mode wins. Cadence: the `park-mode.md` fragment. Drop `--park` for the review gate; switch to `--starter` (they do not
compose) when context must persist beyond a stub.

**File a micro-tasknote (`/ft-task <ID> --micro`) when:**

- The task is above the skip threshold, its scope is known, and it carries no design question — a small multi-file change included. This is the default tier for known work.

A micro-tasknote keeps the spec on top (🎯 Goal / ✅ Acceptance / 🧩 Subtasks)
and replaces the four phase checklists with one `## ⚡ Notes` log of
bold-prefix lines; the phases, gates, and closure are `/ft-task`'s own. A
`Re-scope` verdict converts it to the full shape in place. Cadence: the
`micro-mode.md` fragment the flag loads.

**Skip the micro-tasknote (use plain `/ft-task` instead) when:**

- The scope is unknown, or the task carries a design tradeoff worth recording
- The run needs `--loop` or `--debug` (`--micro` refuses both)

When in doubt whether known work fits micro, start micro: Discovery's
`Re-scope` verdict promotes it to the full tasknote in place. Unknown scope
still starts full — its Discovery phase pays for itself. This is a routing
default, not runner auto-select: the operator still passes `--micro`.

**Run a tasknote in debug mode (`/ft-task <ID> --debug`) when:**

- The work investigates a bug or regression whose root cause is not yet known, so hypothesis-first cadence (expected vs. observed → ranked hypotheses → minimal repro → Phase 3 re-verify) beats shotgun-debugging

Debug mode is **explicit opt-in only** — the operator picks the entry point at
invocation, so never infer it from a bug-shaped description. It uses the
standard template and adds content, never a phase, banner, or gate; it composes
with `--fast` in either order, and the Phase 3 repro re-verify still runs. The
cadence lives in the `step-4-debug-mode.md` fragment the flag loads.

**Skip debug mode (use a plain `/ft-task` run) when:**

- The work is feature-shaped, the root cause is already known, or the bug is trivial

## PLAN.md filing-discipline thresholds

Active PLAN.md long descriptions (everything after `— ` on the task line)
are subject to a hard word budget — the index reads cleanly only when each
line stays scannable, and rich context routes into starter bodies:

| Range | Status | Action |
|---|---|---|
| ≤50 words | Target — comfortably scannable | Keep the one-liner |
| 51-70 words | Yellow flag | Trim if practical; otherwise consider promoting to a starter |
| >70 words | Hard cap — exceeded | Move the rich context into a starter body via `/ft-file-task [ID] --starter`; PLAN.md line keeps a ≤50w summary |

The thresholds apply to **active** task lines (`High` / `Medium` /
`Low` / `Future Opportunities`). Lines under `## Completed`
are governed by [`SPEC/plan-filing.md`](plan-filing.md)
§"`## Completed` archive convention".

`/ft-file-task` and `/ft-task` flag filings that breach the cap at
filing/scaffold time — see the respective skill files for the mechanism.
`/ft-file-task`'s default flow declines at >70w and routes to its own
`--starter` mode, where the cap is a recorded override rather than a stop.

## Downstream-impact reconciliation

PLAN.md is worked incrementally, so the plan drifts out of cohesion as it
grows: a newly filed task or a mid-flow change of direction can leave an
**already-filed** entry stale, contradictory, or redundant. The filing
motion alone appends the new line and stops — it never checks whether
existing downstream entries still make sense. The classic failure mode: a
decision to change one task's approach (a contract, data model, or
dependency) silently invalidates a separate task that was written against
the old shape, and nobody notices until that task is picked up. The
**downstream-impact reconciliation scan** closes that gap.

**Triggers.** Run the scan at two moments:

- **New-task filing** — whenever a filing skill writes a new PLAN.md line
  (`/ft-file-task` in its default or `--starter` mode, the `/ft-open-epic` child
  cohort, or a direct inline addition).
- **Mid-flow direction-changing decision** — whenever a decision inside an
  active task (typically `/ft-task` Phase 2) changes the approach, contract,
  data model, or sequencing in a way that reaches beyond the current task.

Routine cases that obviously touch nothing downstream (the first task in a
fresh area, a self-contained typo ticket) skip the scan — apply judgment,
same as the selection thresholds above.

**The scan.** Three steps:

1. **Enumerate** active PLAN entries (`High` / `Medium` / `Low` / `Future
   Opportunities`) that share a surface with the new task or decision — same
   files, same subsystem, same contract, or a cited `[[wikilink]]`
   dependency. Closed (`## Completed`) entries are out of scope.
2. **Classify impact** per candidate (table below).
3. **Propose a reconcile action** for each impacted entry, then **wait for
   user confirmation** before editing any line.

**Impact classification:**

| Class | Meaning |
|---|---|
| Stale | entry describes a now-superseded shape (old approach, renamed file, changed contract) |
| Contradictory | entry would conflict with the new task/decision if both shipped |
| Redundant | the new task subsumes the entry, or two entries now overlap |
| Unaffected | shares a surface but its premise is unchanged — left as-is |

**Reconcile actions.** For each impacted entry, the scan proposes one of:

| Action | Effect |
|---|---|
| Merge | fold the entry into the new task (or vice versa); drop the absorbed line |
| Nest | convert it into an epic subtask / dependency of the new task — a dependency is written `Blocked by [[<ID>]]` (wikilink-only; `SPEC/plan-parser.md` §"Long-description conventions") |
| Edit | rewrite the entry's description to match the new direction |
| Delete | remove an entry the new work makes obsolete |
| Leave | no change — surfaced so the user sees it was considered |

**User-confirm gate.** The scan **never auto-rewrites the plan.** It
surfaces the impacted-entry list with one proposed action per line and waits
for explicit confirmation; the user accepts, amends, or rejects each, and
only then are the PLAN.md edits applied. The control is the human at the
gate, not an automated scorer (consistent with `SPEC.md` §"What flaitron
does NOT provide").

This section is the contract. The filing and runner skills invoke the scan
at their filing / decision points — see each skill's own steps for where the
scan fires and how it folds into the existing review gate.
