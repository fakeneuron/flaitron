# Project Name — PLAN.md

## Vision

One-paragraph statement of the project's purpose and end state. Replace this
with the actual project vision.

See [.flaitron/core/SPEC.md](core/SPEC.md) for the canonical workflow contract.

<!--
Task-line grammar (see .flaitron/core/SPEC.md §"Task-line format"):

  - [ ] **TASK-ID** [!critical] [model] [unattended] [handoff] | shortname — long description

All of `[!critical]`, `[model]` (see `SPEC/model.md` §"Model field" and its
"Practical guidance and agent-aware defaults" subsection for examples,
realistic defaults such as mid-tier models like Grok/Sonnet often `[medium]`
(or `[light]` for mechanical work), and the full agent-aware notes; any short
token is valid), `[unattended]`, `[handoff]`, and `| shortname` are optional.
Canonical ordering: `[!critical]` BEFORE `[model]`, the two trailing markers
AFTER it (at most one belongs on a row). Flagged
tasks float to the top of the High column with a red marker chip.
`[unattended]` marks a row safe to dispatch with no operator present — an
opt-in an operator seeds deliberately; most projects never use it. The
runners also read it as implied `--fast` on an attended run. `[handoff]`
marks a row that stops mid-run for a human act (a cross-repo prompt, a
physical step, a credential) — operator-written too; an operator-less
caller declines it, an attended run is unchanged. A hard
dependency on another row goes in the long description as
`Blocked by [[TASK-ID]]` — wikilink-only, literal `Blocked by`; `Blocked on`,
a bare ID, or free prose does not parse (see SPEC/plan-parser.md §"Long-description
conventions"). The
minimal legacy form
`- [ ] **TASK-ID** — description` keeps parsing for backwards compatibility,
but new entries should declare a model so /ft-task can gate on it without
re-asking at scaffold time.

Illustrative entries (replace TASK-ID with a real <AREA>-<N> id when filing):

  - [ ] **TASK-ID** [!critical] [heavy] | shortname — Optional `[!critical]` flag floats this row to the top of High.
  - [ ] **TASK-ID** [medium] | shortname — One-line description of a moderate, multi-step but well-scoped task.
  - [ ] **TASK-ID** [light] | shortname — One-line description of a mechanical, clear-diff task.
  - [x] **TASK-ID** [light] | shortname — Completed YYYY-MM-DD.

`## Completed` is bounded (see .flaitron/core/SPEC/plan-filing.md
§"`## Completed` rotation"): past ~60 rows, rotate the oldest rows into a
sibling `.flaitron/PLAN-ARCHIVE.md`. That file does not exist until your
first rotation, and rotation is an operator motion — nothing here
auto-applies, and no closed row is ever deleted.

These examples live ABOVE the first `##` heading on purpose: the parser only
processes checkbox lines *inside* ## High / Medium / Low / Future Opportunities
/ Completed, so illustrative TASK-ID lines here never surface as unparsed
diagnostics. Add real entries under the headings below.
-->

## High

(none)

## Medium

(none)

## Low

(none)

## Future Opportunities

(none)

## Completed

(none)
