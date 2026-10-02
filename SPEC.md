# Flowtron — Workflow Specification

**Version:** v5.34.0
**Status:** Stable

## What is Flowtron

Flowtron is a lightweight, project-agnostic tasknote system for solo
AI-assisted coding. One source of truth, consumed by adopting projects via
git submodule.

The goal is simple: catch the agent before it wastes a session. The four
phases, the Relevance Assessment, and the Acceptance criteria are the
checkpoints where you look — and one task per context window keeps each one
small enough to actually review. No scripts, daemons, databases, or schemas
to maintain.

## Core principles

1. **Markdown over JSON.** Plans and tasknotes are markdown files: human-editable, AI-scannable in diffs.
2. **Zero scripts.** All operations are `cp`, `mv`, and editing markdown. Anything more is over-engineering.
3. **One task per context window.** Tasks are sized so the assistant can hold the entire scope in working memory.
4. **Relevance before action.** Every task starts with a hard gate: is this still the right work?
5. **Versioned and pinned.** Adopting projects pin a specific flowtron commit; updates are deliberate.

## Layout, and working in the flowtron repo itself

The adopting-project directory layout, the flowtron repo's own layout,
procedure SOPs, and the reserved `ft-` skill-name prefix (adopters MUST NOT
use it for their own skills): see
[`SPEC/layout.md`](SPEC/layout.md).

## Task ID convention

Format: `<AREA>-<NUMBER>` for tasks, `<AREA>-EPIC-<NUMBER>` for epics with
subtasks numbered `<AREA>-<NUMBER>.<SUB>`.

Canonical area prefixes:

- `CORE-` — cross-cutting, orchestration, project-wide
- `BE-` — backend
- `FE-` — frontend
- `DB-` — database, migrations
- `DEPLOY-` — deployment, CI/CD, infra
- `TEST-` — testing infrastructure (not individual test fixes)

Adopting projects may add domain prefixes (e.g., `OCR-` for a vision-heavy
project's OCR pipeline). Domain prefixes must be declared in the project's
`.flowtron/tasknote/README.md`.

**`<area>` is looked up, never derived from the ID.** The archive folder for a
prefix is whatever the project's `.flowtron/tasknote/README.md` §"Archive layout"
table says — read it on every task, for every prefix, canonical ones included.
Lowercasing the prefix is the *declaration-time default* for adding a row, not a
resolution an agent may perform: a project may declare a folder the default would
not produce (`OPS-*` → `archive/operations/`), and the row wins. A prefix that
"looks known" is the one that gets lowercased on autopilot, so the lookup carries
no known/unknown branch.

Numbering: sequential within prefix. Decimals only for epic subtasks (e.g.,
`CORE-EPIC-009` parent + `CORE-009.1`, `CORE-009.2` children). The subtask
slot accepts either a number (`\d+`) or the reserved literal `N` — `<AREA>-<N>.N`
is the epic's terminal **audit** child (see [`SPEC/epic.md`](SPEC/epic.md)),
grammar-legal as-is so it never needs renaming to a sequential number.

## Epic lifecycle

Canonical contract: see [`SPEC/epic.md`](SPEC/epic.md).

## Task-line format

Each entry under a priority heading in PLAN.md follows this grammar:

```markdown
- [ ] **TASK-ID** [!critical] [model] [unattended] [handoff] | shortname — long description
```

All of `[!critical]`, `[model]`, `[unattended]`, `[handoff]`, and
`| shortname` are optional. Canonical ordering when the flags are present:
`[!critical]` BEFORE `[model]`, the two trailing markers AFTER it (in either
order; at most one of them belongs on a row). The legacy minimal form
`- [ ] **TASK-ID** — description` still parses for backwards compatibility.

The grammar is additive — flowtron bumps don't require migrating legacy
entries. **A rewrite preserves the trailing bracket-token run verbatim:** it
changes only the segment it means to change, copying every other bracket token
and any model-suggestion glyph from the original. A dropped token disarms it
with no diagnostic. This binds Phase 4's stub-form flip, which is why it stays
here rather than in the module below.

Per-segment semantics — the segment table (what each token means, who consumes
it, what it parses into), worked examples of every optional combination, and the
`[unattended]`-candidacy proposal contract: see
[`SPEC/task-line-segments.md`](SPEC/task-line-segments.md). Read it when
**writing** a row; reading one needs only the grammar and ordering above.

Parser tolerances, the `[unattended]` / `[handoff]` footguns, excluded shapes, the legacy
`## Critical` heading, the reserved `[[TASK-ID]]` / `Blocked by [[ID]]`
long-description conventions, and the canonical `viz/src/parser.ts` reference:
see [`SPEC/plan-parser.md`](SPEC/plan-parser.md).

## Tasknote frontmatter

**Write-once policy.** Archived tasknotes are historical records — not
retroactively edited when the spec evolves. Frontmatter and body
conventions apply to new tasknotes only; legacy archives stay as-is. Tools
should silently accept and ignore retired fields (the v0.2.0 `model:` field
since moved to the PLAN.md task line — see §"Task-line format" /
§"Model field"; and the v0.8.0 `priority:` and `area:` fields, both
derivable from the PLAN.md section heading and the task ID prefix
respectively) when parsing legacy archives. §"Tasknote body shape" and
§"Model field" refer back here rather than restating.

**Write-once does not cover lifecycle writes.** The policy scopes *retroactive*
edits — reaching back into an already-archived note because the spec moved on.
It does not reach the `status:` transitions the lifecycle itself performs
(`starter` → `in-progress` at promotion, `in-progress` → `blocked` at a park,
`blocked` → `in-progress` at a resume, `in-progress` → `completed` at Phase 4
closure). Each of those writes happens while the tasknote is **active**, before
any archive move. Do not cite write-once to justify leaving `status:` stale at
closure — that reading is what produced the drift this carve-out closes.

**Write-once does not cover factual corrections.** A task that proves a
**factual** claim in an archived tasknote false appends an append-only
`> **⚠️ Superseded by [[<TASK-ID>]]**` pointer under that note's nav header.
Contract + the three excluded cases:
[`SPEC/superseded-claims.md`](SPEC/superseded-claims.md).
Every tasknote opens with a YAML frontmatter block carrying machine-parseable
fields, followed by a Markdown body. The canonical schema lives in `templates/tasknote-template.md`. Valid `status:` values:
`starter | not-started | in-progress | blocked | completed`.

Flowtron itself does not parse this frontmatter — the field contract exists
so adopting projects' tools (visualizers, dashboards, queries) can consume
tasknote metadata without scraping the H1 line. Adopting projects can ignore
the frontmatter and continue working as before.

**Optional planning keys.** Four additive keys extend the frontmatter when a
task wants a durable, queryable planning claim. They follow the same
omit-when-absent rule as the loop keys
([`SPEC/loop.md`](SPEC/loop.md) §"Frontmatter keys"): legacy notes omit them;
tools ignore them when absent. Omitted means *undeclared*, not "touches
nothing" / "blocked by nothing" / "safe with everyone" / "supersedes
nothing." Bare IDs (not wikilinks) for task references; paths as strings or
globs.

| Key | Value | Meaning |
|---|---|---|
| `touches:` | list of path strings / globs | **Declared scope** — files or trees this task expects to edit. Filled at Phase 1, reconciled against the diff at Phase 4 |
| `blocked-by:` | list of bare task IDs | Durable planning dependency. Distinct from PLAN `Blocked by [[ID]]` (the don't-start / park-visible gate; see [`SPEC/blocked.md`](SPEC/blocked.md)) and from `status: blocked` (a started-and-parked run). Survives the Phase 4 PLAN stub. |
| `parallel-safe-with:` | list of bare task IDs | Claimed-safe concurrent siblings (typically worktree isolation) |
| `supersedes:` | list of bare task IDs | This later note replaces that prior *decision*. Written only on the later note. Distinct from the ⚠️ `Superseded by` pointer (factual-false forward write on the old note; see the write-once carve-out above). Never `superseded-by:` on the corrected note. |

Do **not** add `blocks` (the inverse of `blocked-by`; derivable by grep) or
`depends-on` (a synonym of `blocked-by`). A Related prose label `depends-on:`
is not this key. Flowtron ships no validator for these keys. The shipped
templates comment them rather than emitting empty arrays, so the happy-path
scaffold pays nothing at parse time. Starter `### Files to touch` stays the
informal prose survey; YAML `touches:` is the short queryable list once the
files are known.

```yaml
touches:
  - templates/
  - SPEC.md
blocked-by:
  - CORE-445.2
parallel-safe-with:
  - CORE-445.3
supersedes:
  - CORE-157
```

**`touches:` carries a lifecycle duty the other three do not.** It is the
task's *declared scope*: Phase 1 fills it with the paths the task expects to
edit — code or markdown, this repo's own contract edits included — and Phase 4
reconciles it against `git diff --name-only` (§"📝 Phase 1: Discovery",
§"🚀 Phase 4: Closure"). Only a task with **no file deliverable** is exempt —
a Discovery or audit child whose whole product is a `PLAN.md` filing — and an
exempt note writes nothing rather than an empty list. Exempt and undeclared
therefore read alike in the YAML, which is the price of shipping no validator
and the right price: the reconciliation reports what it finds and never
refuses.

**Park reason.** One additive key, `park-reason: <code> — <prose>`, records
*why* a tasknote sits at `status: blocked` — omit-when-absent like the planning
keys above, written by a runner at a park, cleared on resume. The closed code
set, the split rule, and the write / clear lifecycle:
[`SPEC/blocked.md`](SPEC/blocked.md) §"Park reason".

**Date format:** always use `YYYY-MM-DD` for `created:`, `Completed`, and `Archived` date fields.

## Starter tasknotes

Canonical contract: see [`SPEC/starter.md`](SPEC/starter.md).

## Tasknote body shape

Below the YAML frontmatter, every **standard** (non-starter) tasknote follows
a **spec-on-top + log-below** structure so it reads like a small, polished
spec rather than a pure execution log. The canonical layout lives in
`templates/tasknote-template.md`. Starter tasknotes (§"Starter tasknotes")
skip this layout — they carry only the nav header + `## 🌱 Starter context`
section until promotion.

```markdown
# <TASK-ID> | <title>
[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[RELATED]]   ← nav header

## 🎯 Goal
## ✅ Acceptance
## 🧩 Subtasks
## 🔗 Related
## 🌳 Fan-out                                                ← optional (epic Discovery `.1`, M>1)
## 🔄 Handoff                                                ← optional (mid-task resume state)

---

## 📝 Phase 1: Discovery
## 🛠️ Phase 2: Execution
## 🧪 Phase 3: Testing & Linting
## 🚀 Phase 4: Closure
```

**Top sections (the "spec"):**

- **Nav header** — single line under the H1: a `← PLAN.md` back-link, a status
  chip mirroring the YAML `status:`, and `[[TASK-ID]]` wikilink chips
  mirroring `related-tasks:`.

  **The chip is hand-authored at exactly four transitions — scaffold,
  promotion, park, resume — and is deliberately NOT flipped at Phase 4
  closure** (CORE-042.4, SPEC v0.8.0: three closure status writes cut to
  two). Visualizers compute the chip from YAML `status:` at render time, so
  an archived tasknote may show chip text that lags the YAML; YAML stays
  canonical for tasknote-bearing rows, the PLAN.md checkbox for the roadmap
  binary.

  **Chip vocabulary** — `🟢 In progress` / `✅ Completed` / `⏸ Blocked` /
  `⚪ Not started` / `🌱 Starter`. This enumerates what a *renderer* may
  produce, not writes closure performs: `✅ Completed` is rendered from YAML,
  never written by Phase 4. Reading the list as license for a closure-time
  chip flip is the misreading behind CORE-042.5 and CORE-393.
- **🎯 Goal** — one-sentence description of what this task accomplishes.
- **✅ Acceptance** — checklist of concrete, testable criteria for "done."
  Populated during Phase 1 Discovery, each criterion naming the **verify
  command** that decides it where one exists (§"🧪 Phase 3: Testing & Linting").
- **🧩 Subtasks** — checklist of the ordered, concrete steps to complete the
  task. Populated during Phase 1 Discovery (replaces the legacy Phase-1-internal
  "Execution Steps" block). A working plan, not a contract — **exempt from the
  Phase 4 Acceptance tick-through** (see §"🚀 Phase 4: Closure").
- **🔗 Related** — bullet list of related tasks with one-line context per ID,
  mirroring `related-tasks:` from the YAML in human-readable form. When a
  planning key is set, the same bullet may carry a type hint (`blocked-by:` /
  `parallel-safe-with:` / `supersedes:`) so the edge stays readable after the
  YAML is written: `[[CORE-445.2]] — blocked-by: templates land first`.
  Archive decision edges that have no YAML key use prose labels `depends-on:`
  (this decision rests on a prior one) and `related-decision:` (see-also) —
  never as frontmatter keys.

**Phase sections (the "log")** — the four-phase checklists below the divider
remain the execution record.

**Optional inserts.** Three sections are written only when the situation calls
for them. None ships in `templates/tasknote-template.md`, and a tasknote
without them is complete, not incomplete:

- **`## 🌳 Fan-out`** — epic-cohort parallelism declaration, written on a
  Discovery `.1` when the epic has more than one implementation child.
  Children echo the claim in YAML so a worktree copy (which carries only the
  child note) still sees it.
- **`## 🔄 Handoff`** — mid-task resume state, written when a session ends
  with work unfinished.
- **`## 🔁 Iterations`** — the append-only per-cycle log a goal loop keeps
  between Phase 3 and Phase 4. Owned by
  [`SPEC/loop.md`](SPEC/loop.md) §"`## 🔁 Iterations` log"; not restated here.

Fan-out and Handoff contract: see
[`SPEC/tasknote-inserts.md`](SPEC/tasknote-inserts.md).

**Cross-linking** — references to other tasknotes use
`[[<TASK-ID>]]` wikilinks throughout. They render as plain text on GitHub but
are first-class in markdown-vault tooling (Obsidian, Foam, Logseq) and stay
cheap to write.

**Backwards compatibility** — see §"Tasknote frontmatter" write-once policy.
Adopting projects pick up the new shape on their next flowtron version bump.

### Optional inserts — Fan-out and Handoff

Canonical contract for both: see
[`SPEC/tasknote-inserts.md`](SPEC/tasknote-inserts.md).

## The 4-phase workflow

Every tasknote follows four phases in strict serial order. Do not skip ahead.

### Operator-gate cues

The workflow surfaces **up to two** standing phase-gate banners: 🛠️ Phase 1→2
(post-Discovery) and 📦 ready-to-commit. Both are conditional, so a fully
mechanical task skips both and runs end-to-end with inline state markers.
Once Phase 1 closes, Phase 2 → Phase 3 → Phase 4 closure ops flow
continuously without intermediate gates, and skill-level extensions (epic
parent-flip, release push-go) bundle into 📦 rather than adding their own
banners.

That is the whole of the gate surface this core spec states. Everything that
governs it is lazy, in four modules, so a run loads only what its decision
needs:

- [`SPEC/gates.md`](SPEC/gates.md) — the machinery. Banner format and trigger
  table, the two-banner cap and its one bounded exception (a destructive
  🗄️/▶️/📡/💻 command escalating in-execution), the Phase 1→2 exit-gate flavors,
  and the conditional skip rule.
- [`SPEC/gate-postures.md`](SPEC/gate-postures.md) — the postures. `--fast`
  (an operator present but not to be asked) and `--unattended` (no operator —
  a gate the run cannot answer parks via `status: blocked` rather than firing
  a banner), with the single flag×surface matrix and precedence ladder
  settling every `--fast` / `--unattended` / 👁️ interaction. Loaded only when
  a flag or the `[unattended]` row marker is set.
- [`SPEC/cue-vocabulary.md`](SPEC/cue-vocabulary.md) — the reference. Every
  operator cue's glyph, UPPERCASE label, and emission shape.
- [`SPEC/gate-discipline.md`](SPEC/gate-discipline.md) — the discipline. Section
  homes for a new rationalization or red flag, and §"Refused carve-outs" in
  full. The historical catalog lives in
  [`docs/GATE-DISCIPLINE.md`](docs/GATE-DISCIPLINE.md).

### 🎯 Purpose blurb

An ID-invoked runner states in two plain-English lines what the task is, as
soon as the `PLAN.md` line is captured — before the model gate, the pre-flight
checks, and any scaffold write, each of which can end the run. Contract: see
[`SPEC/purpose-blurb.md`](SPEC/purpose-blurb.md).

### 📝 Phase 1: Discovery

Mandatory steps:

- [ ] Reviewed the task entry in PLAN.md
- [ ] **Relevance Assessment** — `Proceed` / `Re-scope` / `De-scope` with one-line rationale
- [ ] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (see below) and recording only its distilled return in Discovery Notes
- [ ] **Best Practices Review** — when code or module boundaries are in scope, identify the touched responsibilities, established dependency direction and abstractions, and nearby duplication; record any required in-scope refactor or deferred cleanup (otherwise `N/A` with a one-line reason)
- [ ] **Archive skim** — surface prior decisions on the same files / area by skimming `.flowtron/tasknote/archive/<area>/` for tasknotes that touched the source paths in scope (if YAML `touches:` is set, prefer those paths for the path grep); also open IDs named by `## 🔗 Related`, YAML `supersedes:`, and any ⚠️ `Superseded by` pointer on the hits — still `grep` + read, no query engine; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe** (same clause as the read step above) rather than pulling every hit into this window; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table (§"Task ID convention") before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one, and mistaking the two silently voids this step
- [ ] **Drift check** — verify file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** cross-reference the plan this tasknote is forming against its `PLAN.md` line and the SPEC contracts it touches (read them, don't recall them); surface any drift to the user before re-interpreting the task
- [ ] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [ ] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable — §"Tasknote frontmatter")

The Relevance Assessment is non-negotiable. `Re-scope` updates the PLAN.md line and tasknote header before continuing (if blocked prerequisite, see §"Blocked tasks") — preserve the full trailing bracket-token run verbatim (see §"Task-line format"). `De-scope` jumps to Phase 4 closure with the de-scope rationale as the final summary.

The read step's **probe clause** exists because broad search is the one part
of Discovery whose cost is mostly noise: locating five relevant files can take
fifty tool calls, all landing in the window that must hold the task through
Phase 4 (Core Principle #3). A **probe** is a bounded, read-only sub-agent that
owns no tasknote, answers one stated question, returns a distilled summary, and
ends — it never runs Phase 1, trips a gate, or closes anything. A delegated
context that *does* own a tasknote is a **delegate**
([README.md](README.md) §"Sessions, loops, and sub-agents"). Brief and return
shape: [`templates/subagent-probe-template.md`](templates/subagent-probe-template.md).
A judgment prompt, not a gate: no checklist box, no phase, no machinery, and
skipping it is always correct for a narrow read set.

Archive skim + drift check both exist because prior tasknotes record decisions and PLAN.md is a snapshot, not a spec. Surface findings before re-interpreting; never "correct" the plan by executing a different task. `touches:` narrows the path grep; typed Related lines, `supersedes:` IDs, and ⚠️ pointers are extra notes to open — edges to read, not a graph query.

The skim's **probe clause** is the same one, applied where it bites hardest: a
path grep over a mature archive scales with project age, not task size, and one
common path can return dozens of notes. The `~3` is a judgment line, not a
threshold — nothing counts hits, and reading four notes directly is always
correct; the default on a large hit list is "brief a probe and keep its
findings" rather than "read them all and keep the search too."

The drift check's **cross-artifact half** catches what its code half cannot: a
plan that contradicts a contract the SPEC already settled, or that has drifted
from the `PLAN.md` line it was filed as. This is the last cheap place to catch
either — Phase 4 collapses that line to a `Completed YYYY-MM-DD.` stub. It is a
**cross-reference, not a judgment call**: open the `PLAN.md` line and the SPEC
section and read them. Judgment alone let CORE-393 — a ticket to undo the
contract CORE-042.4 settled in §"Tasknote body shape" — reach a full tasknote
before anyone reread the clause.

The Best Practices Review is a focused pre-change check, not a repository
audit. Use it to understand the changed path well enough to preserve clear
responsibilities, existing dependency boundaries, and useful abstractions;
carry only an Acceptance-relevant refactor need into Phase 2, and leave
unrelated cleanup deferred.

**Exit gate.** Once every Phase 1 box is ticked, the 🛠️ Phase 1→2 banner
fires according to the skill's exit-gate flavor — `/ft-task` uses
`default-skip` (skip on routine clarifications; fire only on significant
scope deviation), `/ft-epic-discovery` + `/ft-close-epic` use
`default-fire-on-clarifications` (fire on any surfaced ask). The two
flavors' judgment rules, the shared skip-path inline marker, and the
`--fast` drift carve-out: see [`SPEC/gates.md` §"Phase 1→2 exit gate"](SPEC/gates.md).

### 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at how neighboring code (sibling modules, parallel components, adjacent services) solves the same shape of problem; chose to extend an existing pattern or justified a new shape, checked for avoidable duplication and blurred responsibilities, and preferred composition when it reduced coupling
- [ ] **Minimal refactor gate** — refactored only when Acceptance required it or the touched implementation would otherwise introduce avoidable duplication, obscure a responsibility, or violate an established dependency direction; recorded the reason and deferred unrelated cleanup
- [ ] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

Keep edits tightly scoped. Resist refactoring adjacent code unless the task
explicitly calls for it. The pattern survey exists to keep the codebase
unified — prefer extending what already works over inventing a parallel
solution. DRY, single-responsibility (SRP), and composition are contextual prompts,
not absolutes: a small local repetition can be clearer than a premature
abstraction, and composition earns preference only when it actually reduces
coupling.

The Minimal Refactor Gate permits the smallest structural correction needed
to satisfy Acceptance or keep the touched path coherent. It does not license
general cleanup; log broader opportunities for later work instead.

If a hard dependency surfaces mid-execution, **park the tasknote** per
§"Blocked tasks" and resume by re-invoking `/ft-task <ID>`.

Phase 2 flows continuously into Phase 3 (and Phase 4 closure ops) without
an intermediate gate; the next operator-gate cue is the 📦 ready-to-commit
banner in [`SPEC/post-closure.md`](SPEC/post-closure.md).

### 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code
- [ ] Ran lint/type-check on changed code
- [ ] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (`N/A` with a one-line reason when no code changed)
- [ ] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded in Testing Notes with its disposition (`N/A` with a one-line reason when the diff is too small to grade)
- [ ] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

Run the full test suite only when changes are broad or cross-cutting.

**The verify-command rule.** Each `## ✅ Acceptance` criterion names the command
that decides it — a test run, a lint or type-check, a `grep -q` on a contract
file, a `curl -sf` against an endpoint. A criterion only judgeable by eye or by
reading marks itself `judgment` (or `👁️`) with a one-line reason instead; do not
invent a command for it. [`SPEC/loop.md`](SPEC/loop.md) requires the stronger
form — *every* criterion loop-verifiable, since the union of the commands **is**
the loop's termination condition. Weaker here on purpose: contract and
documentation tasks are ordinary work, and a contrived command on a prose
criterion buys a tick, not evidence.

**The receipt.** Capture the receipt, not the transcript: read the runner's
tail — exit code and first failure line are the evidence. Phase 3 runs those
commands and writes what happened into Testing Notes — the command as
invoked, its exit code, and the first line of failure output when non-zero:

```text
npm --prefix viz test       → 0
npm --prefix viz run lint   → 1
    src/ui/Graph.tsx:42:7  'nodeId' is assigned a value but never used
```

A ticked box asserts a check ran; a receipt shows it. Nothing parses it — plain
text, read by whoever opens the note next. The structural assertions folded into
the same box stay review evidence from the actual diff and changed path: they
complement tests and static checks, and require no scorecard, arbitrary
threshold, or new validation tool.

**The external review.** Everything above this line is the generator grading its
own work: a ticked box and a green receipt are self-reported, and self-evaluation
is unreliable even where the criteria are machine-checkable. So one Phase 3 check
comes from somewhere else — a context that did **not** write the diff reads it
against `## ✅ Acceptance` and returns findings. It grades; it never patches. The
fix, when there is one, is Phase 2's work. Two rungs, and the rung *is* the
disposition:

- **blocker** — an Acceptance criterion does not actually hold: unmet, or its
  verify command passed without deciding it. Returns the run to Phase 2; Phase 3
  then runs again from the top.
- **note** — everything else. Recorded in Testing Notes, then fixed or filed at
  the runner's discretion. A note never reopens a phase.

**Who reviews.** The one property that matters is *not the author*. Claude Code
runs `/code-review medium` over the working tree; other runners brief a read-only
sub-agent with
[`templates/subagent-probe-template.md`](templates/subagent-probe-template.md)
§"Variant — review probe". Weighing the findings stays the parent's job either
way — a reviewer that has not read the tasknote will raise what Discovery
already declined.

**When it is `N/A`.** A diff too small to grade — the shape that would have
skipped the tasknote altogether
([`SPEC/tasknote-selection.md`](SPEC/tasknote-selection.md)) — records `N/A` with
a one-line reason, as the 👁️ item does on a task with no rendered surface.
`/ft-micro-task` carries no such item at all: its whole threshold *is* that case.

Neither flag suppresses it, since nothing here asks the operator anything. Under
`--loop` it runs **once**, after convergence, beside the one-time taste checks
([`SPEC/loop.md`](SPEC/loop.md)) — never per cycle; under `--unattended`
unchanged, a blocker the run cannot fix parking `input-needed`
([`SPEC/gate-postures.md`](SPEC/gate-postures.md) §"What `--unattended` never
relaxes"). It adds no phase, no banner, and no cue — one checklist item under the
existing 🧪 heading, the standing gate count unchanged. Flowtron ships the brief
and the two rungs; which primitive spawns the reviewer is the runner's business,
as with any probe.

**Choosing a test strategy (guidance, not a gate).** Default to targeted
tests on the changed behavior. Where the input space is wide — parsers,
encoders, round-trips, invariants that must hold across many inputs — a
property-based test earns its keep; reach for one when example tests would
leave large gaps. Visual confirmation covers UI surfaces that assertions
can't. This is engineering judgment folded into Phase 3, never a new
lifecycle phase or a schema/validator. The one posture that removes the
judgment is `--unattended`, which runs the repo's full validation set with
nobody present to make the "broad enough?" call —
[`SPEC/gate-postures.md`](SPEC/gate-postures.md) §"What `--unattended` never
relaxes".

The visual-confirmation ask uses the **emphasized inline ask** shape — its own
line, blank-line isolated, with the label bolded:

```text
👁️ **CONFIRM** — does the new outline render correctly at http://localhost:5120?
```

👁️ is the only cue that gates task completion, which is why it carries more
emphasis than a bare prefix — raised *within* the inline shape, so it is **not
a banner** and the standing phase-gate count is unaffected. Full contract:
[`SPEC/cue-vocabulary.md` §"Emphasized inline ask shape"](SPEC/cue-vocabulary.md).
What `--fast` and `--unattended` do to this ask — suppress it, and convert it
to a `visual-confirm` park, respectively — is one row of
[`SPEC/gate-postures.md` §"Flag precedence and surface matrix"](SPEC/gate-postures.md).

### 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [ ] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), tasknote YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see [`SPEC/plan-filing.md` §"`## Completed` archive convention"](SPEC/plan-filing.md) if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`
- [ ] **Evidence-based recap** drafted — changed files and LOC where meaningful, verification commands and results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)
- [ ] **Learnings** — did this task teach something the always-loaded layer (`AGENTS.md` / `.flowtron/tasknote/README.md` §"AI-referenced docs") should carry? `N/A` or the line

**Push-memory beside pull-memory.** The Phase 1 archive skim is *pull*
memory — a task reads prior tasknotes when it starts. This item is the
*push* counterpart: a durable insight this task surfaced lands directly in
the layer every session already reads unprompted (`AGENTS.md`), rather than
waiting to be pulled by some future task's archive skim, or never being
pulled at all. Most closures write `N/A` — the box exists for the rare task
that actually taught something durable, not as a second recap.

Phase 4 closure ops (Acceptance tick-through, doc-drift sweep, YAML `status:`
flip, PLAN.md flip/placement, archive move) auto-run without an intermediate
gate. The
`status:` flip is the **first** of the three closure writes (`status:`, PLAN.md
line, archive move) and is what makes the YAML canonical claim in §"Tasknote
body shape" true — it happens while the tasknote is still active, so it is a
pre-archive closure write, **not** a retroactive edit of an archived record
(see §"Tasknote frontmatter"). Where the flipped line lands is the checklist
item's own citation above. The recap drafts alongside: 1-2 plain-English
sentences of *what the task accomplished*, then the evidence the checklist item
names — `N/A` for irrelevant items, never invented metrics. It bundles into the
📦 ready-to-commit motion ([`SPEC/post-closure.md`](SPEC/post-closure.md)): behind the banner on the
fire branch, inline behind an `✅ Closure complete; …` marker followed by an
autonomous commit on the skip branch.

**Scope reconciliation.** One line of the recap compares the `touches:` the
task declared at Phase 1 against `git diff --name-only`, and names what was
edited without being declared:

```text
Declared 3 files, changed 11. Undeclared: src/api/client.ts, src/api/types.ts, …
```

The task's own tasknote and its `PLAN.md` row are excluded: closure rewrites
both by construction, so they carry no scope signal and reporting them every
time would bury the paths that do.

A **recorded fact, not a check**: nothing refuses, nothing re-opens a phase,
and a mismatch is not a finding — a task that legitimately grew says so on the
same line and closes. Declaring scope narrows a task; the reconciliation only
makes the narrowing visible at 📦, which is why it lives in the recap and not
in a gate ([`SPEC/gates.md`](SPEC/gates.md) §"Phase 1→2 exit gate"). A task
exempt from declaring (§"Tasknote frontmatter") writes
`N/A — no file deliverable` and is done.

> **Recap is recap-only.** The next-task suggestion belongs in the
> post-closure protocol, after the commit lands — not inside the recap.

**Handoff persistence.** Anything handed to the operator at closure that
must outlive the session — a proposed commit message, a filing the operator
is to run, a manual step — is written into the tasknote (the Recap, or a
`## 🔄 Handoff` for mid-task state) before archive. A terminal recap is not
durable: once the session scrolls past or the terminal closes, nothing
outside the tasknote file persists. The post-closure copy-paste line is
excluded: it is emitted after the closure commit lands and names the next
task, which the callout above keeps out of the recap.

**Deferred hand-off filing.** When closure defers a real-world operator step
past this task — a manual production action, a follow-up nobody has done
yet — recording it as prose (in the Recap, a `## 🔄 Handoff`, or a README) is
not enough: file it as its own unchecked PLAN.md row, and have any task
whose work depends on that step done first carry a `Blocked by [[ID]]`
clause pointing at it. This task's own PLAN.md line still flips to
Completed — a closed row with the hand-off only in prose hides the pending
step from every future reader; an open PLAN row keeps it visible. The duty
binds an operator-less closure too — the posture *raises* the count of
deferred steps, since whatever the run could not do falls to the absent
operator — and `/ft-file-followup --unattended` is its discharge path there
(`SPEC/plan-filing.md` §"Filing commits").

**Acceptance tick-through.** Closure asserts the task against its own stated
criteria, not against the agent's sense of being finished. Tick each
`## ✅ Acceptance` box the work satisfied; for any box it did not, annotate the
box in place (`N/A — <reason>` or `not met — <reason>`) rather than leaving it
silently unticked or deleting it. An unticked, unannotated box at archive time
is indistinguishable from an unnoticed one — which is what the checklist exists
to prevent. The annotation escape hatch is deliberate: criteria written in
Discovery sometimes stop applying by Phase 4, and forcing a tick would make the
box a rubber stamp.

**`## 🧩 Subtasks` is exempt.** Tick-through governs `## ✅ Acceptance` and
nothing else. Subtasks are a working plan, not a contract: the steps drafted in
Discovery legitimately churn as execution finds a better route, and a step
abandoned for a reason recorded in Implementation Notes is a normal outcome.
Unticked Subtasks boxes at archive time are **correct, not drift** — an
archived tasknote is judged on its Acceptance block alone.

**Superseded-claim pointer (conditional).** If this task falsified a factual
claim in an archived tasknote — the Phase 1 drift check is where that usually
surfaces — append the one-line `> **⚠️ Superseded by [[<TASK-ID>]]**` pointer to
that note as part of closure, and stage it in the same atomic commit. Most
closures falsify nothing and write no pointer. The shape, the append-only rule,
and the three cases it does *not* cover are canonical in §"Tasknote
frontmatter"; this is the trigger, not a second copy of the contract. No new
checkbox — the pointer rides the existing `Closed —` box.

> **No nav-header chip flip here.** Phase 4 does **not** flip the markdown nav
> chip to `✅ Completed`. CORE-042.4 retired that write deliberately (three
> status writes → two), and visualizers derive the chip from YAML `status:` at
> render time — so an archived tasknote reading `🟢 In progress` in the raw
> markdown is correct, not stale. See §"Tasknote body shape" → Nav header
> before proposing to re-add it.

The tasknote is closed when archived. Approval-semantics on each branch
live in [`SPEC/gates.md` §"Conditional skip rule"](SPEC/gates.md); commit
itself is not part of the tasknote.

**Paper-complete guard (Phase 4).** PLAN.md flip + archive move are
working-tree prep for a **single atomic closure commit** that must also
land the task's deliverables. Do not treat archive/Completed as "done"
until that commit succeeds. Full rules: §"Paper-complete guard".

## Blocked tasks

Canonical contract: see [`SPEC/blocked.md`](SPEC/blocked.md).

## Cross-repo edit remit

A tasknote's deliverable lands in the repo whose session opened it. When
Discovery surfaces work that belongs in a **different** repo — a doc, config,
or code change outside this checkout — file it there (a `PLAN.md` line, a
starter tasknote, or a routed ticket) rather than editing it directly from
this task cycle. The target repo's own `/ft-task` cycle executes it, with its
own Discovery, Acceptance, and closure commit. The boundary is symmetric with
the routing adopting projects already run in the other direction: a task that
finds a flowtron-side issue files a `CORE-` ticket and routes it, rather than
fixing flowtron from that project's session.

Canonical contract, including the single documented precedent exception: see
[`SPEC/scope-boundaries.md`](SPEC/scope-boundaries.md).

## Loop tasks

A tasknote run under an iteration loop (goal loops, heartbeats): the assistant
repeats Phase 2 → Phase 3 against a fixed Acceptance target until it is met, a
budget is exhausted, or a per-cycle relevance check says stop. The runtime —
cadence, re-invocation, session lifetime — is Claude Code's `/loop` or any
equivalent runner; flowtron ships no loop runner or scheduler. What flowtron
does ship is the **contract the loop reports to**: gate collapse to `--fast`
semantics (commit per verified iteration; destructive actions park via
`status: blocked` rather than collapse), a per-cycle relevance gate, a
`loop-max:` budget, the `## 🔁 Iterations` log, and the additive `loop:` /
`loop-max:` / `loop-last-run:` frontmatter keys.

Canonical contract: see [`SPEC/loop.md`](SPEC/loop.md).

## Post-closure protocol

Canonical contract: see [`SPEC/post-closure.md`](SPEC/post-closure.md).
Read it at a closing runner's final step, once the tasknote is archived and
the closure commit is the next motion — nothing before Phase 4 loads it. It
carries the three post-archive steps: the commit decision (skip or 📦 fire,
per [`SPEC/gates.md` §"Conditional skip rule"](SPEC/gates.md)), the 🏁
marker plus next-move suggestion after a deliverable-covering SHA, and the
copy-paste line.

## Paper-complete guard

Closes the hole where PLAN.md / archive show **Completed** but deliverables
never landed in git. Contract only — **not** a general git UX (no auto-stash, no clean
automation, no multi-repo tooling). Skills and procedures implement the
checks; this section is authoritative.

### 1. Foreign-dirt gate (task entry)

At **skill entry**, before scaffold / promote / execute writes (and before
blocked-resume continues Phase 2), run `git status --porcelain` (or
equivalent). If the working tree is **non-empty**:

- **STOP.** Do not scaffold, promote, or resume.
- Surface the dirt list and ask the operator to commit, stash, or discard
  **themselves** — then re-invoke the skill.
- No assistant-driven stash/clean/commit of foreign dirt.

Same-conversation continue after a start-only skill already opened the
tasknote is out of band (those skills refuse re-entry on in-flight notes).

### 2. Atomic single-commit closure

Phase 4 may write PLAN.md Completed + archive move in the working tree as
**prep**, but "done" means one **atomic** commit that includes:

1. The task's **deliverable paths** (code, docs, contract edits named by
   Acceptance / Implementation — not only workflow files), **and**
2. The PLAN.md flip + tasknote archive move for **this** task ID.

Rules:

- **Never** leave PLAN/archive as Completed without immediately proceeding
  to the post-closure commit path in the same turn (skip or 📦 fire). If
  commit cannot run, **do not** flip PLAN/archive yet — keep the tasknote
  open until deliverables are ready to land with the flip.
- **Never** commit PLAN/archive alone when Acceptance requires non-workflow
  deliverables. Stage deliverable paths first; refuse a Completed-only
  commit.
- **Workflow-only carve-out:** pure filing / Discovery / audit-with-no-code
  tasks may land PLAN + archive (and any PLAN child-line edits) alone when
  Acceptance has no other deliverable surfaces.
- **Ban collateral Completed flips.** Closure may flip only the current
  task's PLAN line (plus epic-cohort moves under an explicit 📦 parent-flip
  approval for `/ft-close-epic`). Do not mark other open tasks Completed as
  a side effect.

### 3. 🏁 only with a deliverable-covering SHA

Emit 🏁 **only after** `git commit` succeeds and returns a real SHA, and
only when `git show --name-only --pretty=format: <sha>` (or equivalent)
covers:

- the PLAN.md + archive paths for this task, **and**
- every non-workflow deliverable surface implied by Acceptance (judgment:
  paths edited for the goal — source modules, SPEC/skills, tests — not
  incidental untracked noise).

If the commit is missing required deliverable paths: **do not emit 🏁**;
fix the staging set and commit again (or reopen the tasknote if the flip
was premature). Never invent a SHA or claim a prior unrelated commit.

## When to use a tasknote (and when not to)

Canonical contract: see [`SPEC/tasknote-selection.md`](SPEC/tasknote-selection.md).
The module carries the full use/skip thresholds (tasknote · starter ·
follow-up · micro-tasknote · debug), the PLAN.md filing-discipline word
budget (≤50w target / 70w hard cap), and the downstream-impact
reconciliation scan (a new filing or a mid-flow direction change triggers a
cohesion check against active PLAN entries, behind a user-confirm gate).

What happens to a PLAN.md row *after* it is filed lives in the sibling
[`SPEC/plan-filing.md`](SPEC/plan-filing.md): the filing-commit contract (the
five filing motions — follow-up, park, starter, `/ft-audit`, and `/ft-refactor`
— auto-commit at hand-off since filing approval *is* commit authorization,
and `/ft-seed`'s row edits ride the same contract; execution skills keep
their commit-go gate), the `## Completed` archive stub-form convention,
and the `## Completed` rotation bound (the oldest rows spill verbatim to
`.flowtron/PLAN-ARCHIVE.md` on an operator motion; advisory only, nothing
deleted).

## Priority levels

Used in PLAN.md:

- **High** — important features, stabilization, and urgent work (blocking bugs, security issues, and production incidents add a `[!critical]` flag — see
  [`SPEC/task-line-segments.md`](SPEC/task-line-segments.md))
- **Medium** — standard development work
- **Low** — nice-to-haves, cleanup
- **Future Opportunities** — unprioritized future work

Selection rule: within High, `[!critical]` rows come first; then pick by
priority (High → Medium → Low → Future Opportunities), then by lowest
incomplete `<AREA>-<NUMBER>` within that priority.

## Model field

Canonical contract: see [`SPEC/model.md`](SPEC/model.md). The `[model]`
token names the task's cognitive load on a four-rung ladder, matched by
tier against the active model at the runners' Step 1.5 gate:

```text
light  <  medium  <  heavy  <  xheavy
```

- **`light`** — provably mechanical, clear diff in mind.
- **`medium`** — multi-step, well-scoped; the round-up default for a new filing.
- **`heavy`** — design, multi-file, high ambiguity, or cross-module synthesis.
- **`xheavy`** — manual-only exploratory work; automated choosers cap at `heavy`.

A concrete name (`opus`, `sonnet`, `grok`, …) matches by exact identity
instead. Tier calibration, the gate-action table, and the effort axis are the
module's.

## Versioning

Canonical contract: see [`SPEC/versioning.md`](SPEC/versioning.md).

## What flowtron does NOT provide

To prevent scope creep, flowtron deliberately omits:

- A CLI tool (use `cp`, `mv`, and your editor) — one carved-out exception:
  [`tools/update-adopters.mjs`](tools/update-adopters.mjs), the operator-side
  batch updater that maintains the fleet *around* adopting projects, not the
  workflow inside one.
- Schema validation (markdown is the schema; the assistant catches drift)
- A database backend (markdown files in git are the database)
- Cross-project query API (each project owns its history; the read-only
  visualizer is a single global instance — a multi-project query API is not)
- Per-project CI hooks (those belong in the adopting project)

Both carve-outs above are singular exceptions, not precedents. If you find
yourself wanting any of these, write a project-side helper — do not add them
to flowtron.

Canonical contract: see [`SPEC/scope-boundaries.md`](SPEC/scope-boundaries.md),
which also carries the PR / suggestion archetypes flowtron does not accept.
