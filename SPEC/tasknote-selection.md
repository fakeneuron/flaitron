# Tasknote selection

> Lazy-loaded SPEC module. Loaded by the filing/runner skills (`/ft-task`, `/ft-micro-task`, `/ft-file-task`, `/ft-open-epic`, `/ft-refactor`) when they need the use/skip thresholds, the filing-discipline word budget, or the downstream-impact reconciliation scan. See `SPEC.md` for the always-loaded core spec. What happens to a PLAN.md row *after* it is filed — the filing-commit contract, the `## Completed` stub-form convention, and `## Completed` rotation — lives in the sibling [`SPEC/plan-filing.md`](plan-filing.md).

## When to use a tasknote (and when not to)

Each block below names the motion and its trigger; the skill named owns the
mechanics.

**Use a tasknote when:**

- The change touches more than one file
- The task has a `<AREA>-<NUMBER>` ID in PLAN.md
- The work involves design tradeoffs the assistant should record

**Skip the tasknote for:**

- Single-line typo fixes
- Pure formatting tweaks
- Documentation patches under ~10 lines
- Trivial config edits with no logic impact

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

- An idea or **quick fix** surfaces mid-session, you are **not** switching context, and it fits a ≤80-word stub plus a ≤30w PLAN one-liner

**Priority flags** (skip the question): `--low` → `## Low` (`pickup:
next-chat`); `--med` / `--medium` → `## Medium`; `--fut` / `--future` →
`## Future Opportunities`; `--high` → `## High`. **No flag** → one short
question (`Low · Medium · Future?`) before any disk write — never auto-file.

Park mode skips the review gate and the reconciliation scan, auto-allocates the
ID, and continues the main session inline; where it conflicts with the default
follow-up contract, park mode wins. Cadence: the `park-mode.md` fragment. Drop `--park` for the review gate; switch to `--starter` (they do not
compose) when context must persist beyond a stub.

**File a micro-tasknote (`/ft-micro-task <ID>`) when:**

- The task is above the skip threshold, single-file or near it, with no design tradeoffs worth multiple subtasks — you still want the relevance / drift / archive-skim / pattern-survey contracts

A micro-tasknote replaces the four phase checklists with one `## ⚡ Notes`
section of bold-prefix prompts (relevance / drift / archive / pattern /
implementation); closure flips PLAN.md and archives like a normal tasknote.
`/ft-micro-task` scaffolds, executes, and closes in one conversation.

**Skip the micro-tasknote (use `/ft-task` instead) when:**

- The task touches multiple files or has design tradeoffs
- The 4-phase log would carry useful state downstream
- You're unsure — default to `/ft-task`. The Discovery phase pays for itself.

**Run a tasknote in debug mode (`/ft-task <ID> --debug`) when:**

- The work investigates a bug or regression whose root cause is not yet known, so hypothesis-first cadence (expected vs. observed → ranked hypotheses → minimal repro → Phase 3 re-verify) beats shotgun-debugging

Debug mode is **explicit opt-in only** — the operator picks the entry point at
invocation, so never infer it from a bug-shaped description. It uses the
standard template and adds content, never a phase, banner, or gate; it composes
with `--fast` in either order, and the Phase 3 repro re-verify still runs. The
cadence lives in the `step-4-debug-mode.md` fragment the flag loads.

**Skip debug mode (use a plain `/ft-task` run) when:**

- The work is feature-shaped, the root cause is already known, or the bug is trivial

When in doubt, write the full tasknote. The 4-phase ceremony pays for itself.

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
