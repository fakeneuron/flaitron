# Tasknote selection

> Lazy-loaded SPEC module. Loaded by the filing/runner skills (`/ft-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-release`) when they need the use/skip thresholds, the filing-discipline word budget, or the downstream-impact reconciliation scan. See `SPEC.md` for the always-loaded core spec. What happens to a PLAN.md row *after* it is filed — the filing-commit contract, the `## Completed` stub-form convention, and `## Completed` rotation — lives in the sibling [`SPEC/plan-filing.md`](plan-filing.md).

## When to use a tasknote (and when not to)

**Use a tasknote when:**

- The change touches more than one file
- The work takes more than ~15 minutes
- The task has a `<AREA>-<NUMBER>` ID in PLAN.md
- The work involves design tradeoffs the assistant should record

**Skip the tasknote for:**

- Single-line typo fixes
- Pure formatting tweaks
- Documentation patches under ~10 lines
- Trivial config edits with no logic impact

**Draft a spec (`templates/spec-template.md`) when:**

- A design has been worked out in conversation but isn't decomposed into tasks yet — capturing it in a fixed-section spec (Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach) before filing prevents context loss
- The brief spans an epic or multi-task-shaped body of work and you want one reviewable artifact to derive filing decisions from
- You want operator review of the design before any PLAN.md line or tasknote artifact exists

A spec is a planning artifact, not a filing — it never writes a PLAN.md line or scaffolds a tasknote. Copy `templates/spec-template.md` to `.flaitron/specs/<slug>.md` (create the directory on first use), fill its six sections from the conversation, and review the draft before filing anything from its Tasks section. Convert that section to real work via `/ft-epic-discovery`, `/ft-file-followup --starter`, `/ft-task`, or a direct PLAN.md line. No skill drives this — the `/ft-spec` wrapper was retired by CORE-573; the template and this paragraph were the whole of its value.

**Skip the spec (go straight to filing) when:**

- A one-liner idea needs neither a spec nor a starter — write the PLAN.md line directly
- The design is already clear and decomposed — file directly with `/ft-file-followup --starter` or `/ft-epic-discovery`

**Plan a refactor (`/ft-refactor <target> [--fast]`) when:**

- One named target — a file, module, directory, or subsystem — needs restructuring that is too sequenced for a single tasknote and too specific for an open-scope epic
- An `/ft-audit structure` finding recommends a depth escalation on one target
- The change must preserve behavior, so the work needs characterization-test coverage staged before any move

`/ft-refactor` is read-only on source: it surveys dependencies, seams, and test coverage, surfaces a sequenced plan for review, and on your go files a parent epic + implementation children from `.2` + a `.N` audit, each child a starter carrying behavior-preservation acceptance seeds. Execution happens through normal `/ft-task` cycles on those children. No target means you want the breadth sweep (`/ft-audit structure`), not this; genuinely open scope means `/ft-epic-discovery`.

**File a starter (`/ft-file-followup [ID] --starter`) when:**

- The PLAN.md long description would exceed **~50 words (target) or 70 words (hard cap)** — richer context belongs in the starter body, not on the line
- A task is discovered mid-flow with rich context (rationale, design decisions, file survey, open questions) but isn't ready to start now
- The captured context would be lost or would bloat the PLAN.md long description if recorded as inline prose
- The right shape isn't fully obvious; the AI wants to preserve the survey and open questions for resolution at `/ft-task` checkout
- Rich mid-conversation context (epic brief, design conclusion, multi-step plan) won't be consumed in this session — park it in a starter now to protect against `/clear` loss, rather than surfacing it as a parenthetical "run `/ft-X` next and paste this" suggestion

If the ID is omitted, the skill suggests the next available task ID for review
before writing the starter.

**Skip the starter (just add a one-line PLAN.md entry) when:**

- The long description fits inside ~50 words (a scannable one-liner)
- The task is straightforward enough that the long description suffices
- No design decisions or file survey work has been done yet
- The next available `/ft-task <ID>` slot is the natural next move (file, then start; no sitting time)

**File a follow-up (`/ft-file-followup [ID]`) when:**

- A new task surfaces mid-flow (typically inside an active `/ft-task`) and the long description fits in ≤50 words, but the surrounding conversation context (why this came up, suspected files, recommended priority/model) is worth surfacing once at filing time without persisting it to disk
- The follow-up is clear enough that it doesn't need a starter body — but you still want a paragraph of rationale visible in chat alongside the new PLAN.md line
- You want the lightest filing motion in the cohort: one PLAN.md line written, a short paragraph delivered conversationally, zero edits to the active tasknote

A `/ft-file-followup` filing produces **no tasknote file** — the rationale paragraph lives in chat only, and the active tasknote (if any) is not edited.
If the ID is omitted, the skill suggests the next available task ID for review
before writing the PLAN.md line.

**Skip the default follow-up (add `--starter`, or just inline a PLAN.md line) when:**

- The description would breach 50 words — add `--starter`; rich context belongs in the starter body
- Persistent context (file survey, open questions, design decisions) is worth preserving to disk — same call
- You're outside any active conversation that produced the rationale — write the PLAN.md line directly

**Park an idea instead (`/ft-file-followup --park [--low|--med|--fut|--high] [ID] [idea]`) when:**

- An idea or **quick fix** surfaces mid-session (while coding a feature, auditing a file, etc.) and you do not want to lose it, but you are **not** switching context now
- The note fits in ≤80 words and a ≤30w PLAN one-liner — enough to reopen in the next chat, not enough for a review gate
- You want the lightest **persistent** filing motion: tiny stub at `.flaitron/sidequest/<ID>.md` + one PLAN line at the right priority, then straight back to the interrupted work

**Priority flags** (skip the question): `--low` → `## Low` (`pickup: next-chat`); `--med` / `--medium` → `## Medium`; `--fut` / `--future` → `## Future Opportunities`; `--high` → `## High`. **No flag** → one short question (`Low · Medium · Future?`) before any disk write; the AI may parenthesize its best read but does not auto-file.

Park mode skips the review gate and the downstream-impact reconciliation scan, auto-allocates an ID rather than surfacing one for confirmation, and replies in ≤70 words (park confirmation + priority + resume anchor) before **continuing the main session inline**. Where it conflicts with the default follow-up contract, park mode wins; the cadence lives in the `park-mode.md` lazy fragment the flag loads. Drop the flag when you want the review gate, the reconciliation scan, or a conversational rationale paragraph; escalate to `--starter` (dropping `--park` — the two do not compose) when a file survey, open questions, or design decisions need to persist beyond a stub; and use `/ft-micro-task` or `/ft-task` when you're ready to execute now.

**File a micro-tasknote (`/ft-micro-task <ID>`) when:**

- The task is above the skip threshold (more than a one-liner; touches code or non-trivial doc state) but small enough that the full 4-phase ceremony is overkill — typically under ~30 minutes of effort
- The change is single-file or near-single-file, with no design tradeoffs worth recording across multiple subtasks
- The shape is obvious enough that Acceptance/Subtasks checklists would just restate the goal — but you still want the relevance / drift / archive-skim / pattern-survey contracts before writing code
- Examples: small audits, focused doc patches, single-file behavior tweaks with clear scope

A micro-tasknote uses a single `## ⚡ Notes` section (bold-prefix prompts for relevance / drift / archive / pattern / implementation) instead of the four phase checklists; closure flips PLAN.md + the tasknote location like a normal tasknote. The `/ft-micro-task` skill is **file + execute (one-shot)** — scaffold, execute inline, close in one conversation.

**Skip the micro-tasknote (use `/ft-task` instead) when:**

- The task touches multiple files or has design tradeoffs to record
- The task is likely to take more than ~30 minutes
- The 4-phase log would carry useful state for downstream tasknotes or audits
- You're unsure — default to `/ft-task`. The Discovery phase pays for itself.

**Run a tasknote in debug mode (`/ft-task <ID> --debug`) when:**

- The work is investigating a bug, regression, or other unexpected behavior where the root cause is not yet known
- Hypothesis-first cadence pays off: capturing expected vs. observed first, ranking hypotheses, and designing a minimal repro before code edits prevents shotgun-debugging
- The fix lives behind the investigation — Phase 1 produces the hypothesis, Phase 2 targets it, and Phase 3 re-verifies the same minimal repro to confirm the root cause (not just the symptom) is fixed

Debug mode uses the same standard 4-phase template as a plain `/ft-task` run; the debug cadence (expected/observed → ranked hypotheses → minimal repro → re-verify) lives in the `step-4-debug-mode.md` lazy fragment the flag loads, not in the template itself. It adds content, never mechanics — no extra phase, banner, or gate — and composes with `--fast` in either order (the Phase 3 repro re-verify still runs). Debug mode is **explicit opt-in only**: never infer it from a task description that sounds bug-shaped, per the CORE-042.5 rule that the operator picks the entry point at invocation time.

**Skip debug mode (use a plain `/ft-task` run) when:**

- The work is feature-shaped, not bug-shaped — the goal is to *add* behavior, not to explain *unexpected* behavior
- The root cause is already known at filing time and the work is just landing the fix — `/ft-task`'s standard Phase 1 is enough
- The bug is trivial (typo, one-liner) — `/ft-task` (or the skip-the-tasknote rule above) is the right shape

When in doubt, write the full tasknote. The 4-phase ceremony pays for itself.

## PLAN.md filing-discipline thresholds

Active PLAN.md long descriptions (everything after `— ` on the task line)
are subject to a hard word budget — the index reads cleanly only when each
line stays scannable, and rich context routes into starter bodies:

| Range | Status | Action |
|---|---|---|
| ≤50 words | Target — comfortably scannable | Keep the one-liner |
| 51-70 words | Yellow flag | Trim if practical; otherwise consider promoting to a starter |
| >70 words | Hard cap — exceeded | Move the rich context into a starter body via `/ft-file-followup [ID] --starter`; PLAN.md line keeps a ≤50w summary |

The thresholds apply to **active** task lines (`High` / `Medium` /
`Low` / `Future Opportunities`). Lines under `## Completed`
are governed by [`SPEC/plan-filing.md`](plan-filing.md)
§"`## Completed` archive convention".

`/ft-file-followup` and `/ft-task` flag filings that breach the cap at
filing/scaffold time — see the respective skill files for the mechanism.
`/ft-file-followup`'s default flow declines at >70w and routes to its own
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
  (`/ft-file-followup` in its default or `--starter` mode, the `/ft-epic-discovery` child
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
