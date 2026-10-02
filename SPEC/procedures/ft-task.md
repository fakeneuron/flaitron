---
procedure: ft-task
source: claude/skills/ft-task/ templates/tasknote-template.md
restates: SPEC.md
last-verified: v5.33.0 · 2026-10-01
---

# Procedure SOP — `ft-task`

> Agent-neutral procedure SOP. Loaded by a contract-only agent (Codex CLI,
> Grok Build, …) via its per-platform pointer wrapper
> (`<platform>/procedures/ft-task.md`) when the operator asks it to start a
> task. Claude Code does **not** use this file — it runs the richer
> [`claude/skills/ft-task/SKILL.md`](../../claude/skills/ft-task/SKILL.md)
> directly. See [`SPEC/procedures/README.md`](README.md) for the layer.

This SOP describes how to **drive** the flowtron 4-phase tasknote workflow
for one task. It is the *floor* that narrows the adherence gap for agents
without Claude Code's skill machinery — it **routes** to the canonical
contract rather than restating it. The authority for every rule below is
[`SPEC.md`](../../SPEC.md) and its lazy modules; when this SOP and the
contract diverge, the contract wins.

## When to run this procedure

The operator asks you to start a task by ID — "start `CORE-004`", "work on
`FE-012`", or your platform's equivalent of `/ft-task CORE-004`. The ID
matches `<AREA>-<NUMBER>` (or `<AREA>-<NUMBER>.<SUB>` for an epic subtask)
per [`SPEC.md` §"Task ID convention"](../../SPEC.md). If no valid ID is
given, ask for one — do not guess.

First decide whether the task even warrants a tasknote: single-line typos,
formatting tweaks, ~10-line doc patches, and trivial config edits skip the
ceremony — make the edit directly. See
[`SPEC/tasknote-selection.md`](../tasknote-selection.md) for the use/skip
threshold and the lighter-weight forms (micro / starter / follow-up).

## Agent-neutral primitives

This SOP names operations, not Claude Code tools. Substitute your platform's
equivalent where a step calls for one (full ledger:
[`docs/AGENT-NEUTRALITY.md`](../../docs/AGENT-NEUTRALITY.md)):

| Operation | What it means here |
|---|---|
| **structured ask** | A multi-option question to the operator (Claude Code's `AskUserQuestion`). Use your platform's structured-choice prompt, or fall back to a prose ask. |
| **prose ask** | A free-text question to the operator. |
| **trigger** | The operator's conversational request to start the task — there is no slash dispatch to rely on. |
| **autonomous mode** | The operator may ask you to run without stopping at the conditional gates (Claude Code exposes this as `--fast`). Honor it as described under each gate; the concept is platform-neutral, the flag syntax is not. It is also **implied by a PLAN.md row's `[unattended]` marker** when no mode was requested — see Step 1. |
| **debug mode** | The operator may ask you to drive the task hypothesis-first because the root cause is not yet known (Claude Code exposes this as `--debug`). **Explicit opt-in only** — never infer it from a bug-shaped task description. It adds *content* to Phases 1–4 and no mechanics: no new phase, template, banner, or gate. When requested, **read [`claude/skills/ft-task/step-4-debug-mode.md`](../../claude/skills/ft-task/step-4-debug-mode.md) now** — the mode's single body for Phases 1–4 (the Claude wiring reads the same file). Read its `--fast` / `fast-mode` as autonomous mode and `AskUserQuestion` as a structured ask. |
| **loop mode** | The operator may ask you to run the task as an execute→verify loop because "done" is one or more machine-checkable commands (Claude Code exposes this as `--loop`). **Explicit opt-in only.** It changes the Phase 2↔3 drive, not the phases; cycles run autonomously, destructive steps park. Read [`SPEC/loop.md`](../loop.md) and [`claude/skills/ft-task/step-5-loop-mode.md`](../../claude/skills/ft-task/step-5-loop-mode.md) now. Apply its scaffold addendum and strict Acceptance rule, replace the plain Phase 2↔3 drive with its cycle procedure, and run its one-time taste checks and external review after convergence. Translate `fast-mode` to autonomous mode and `AskUserQuestion` to a structured ask. |
| **unattended mode** | The caller may declare that **no operator is present to answer a gate** (Claude Code exposes this as `--unattended`). It supersets autonomous mode's *autonomy* — nothing ever blocks waiting for an answer — plus exactly one added behavior: the six gates an operator-less run cannot answer **park the tasknote** instead of firing a banner into an empty session. It does **not** inherit autonomous mode's two *delegating* suppressions: the visual-confirmation ask hands the check to a present operator, and the Re-scope notice hands drift awareness to that operator. With nobody present both convert to parks rather than vanishing. Full contract, including which six and what a park writes: [`SPEC/gate-postures.md` §"`--unattended` operator posture"](../gate-postures.md). |

Autonomous mode and debug mode are **orthogonal and compose** (the repro
re-verify is not a gate autonomous mode may suppress). Loop mode composes the
same way — autonomous mode reaches only its pre-loop Phase 1 surface, since
the loop already runs autonomously.
Unattended mode composes with all three — it is autonomous mode plus parking,
never a replacement for any of them.

**Parking, in one paragraph.** Under unattended mode a converted gate flips the
tasknote's YAML `status:` to `blocked`, flips the nav chip to `⏸ Blocked`,
writes `park-reason: <code> — <one line>` from the closed set in
[`SPEC/blocked.md` §"Park reason"](../blocked.md) (a YAML plain scalar: no
`: ` or ` #` in the prose, no trailing `:` — rephrase rather than quote), and
**stops** — no Phase 3,
no Phase 4, PLAN.md line unchanged, Phase 1 and any partial Phase 2 work
preserved verbatim. A park never performs the operator's own motion (it does
not make a verdict's PLAN edit, delete a tasknote, or re-file a task); it
records what the resuming operator should do. A park *is* a stop:
unattended mode removes **pauses**, never **proof** — all three parts of
[`SPEC.md` §"Paper-complete guard"](../../SPEC.md) hold with no unattended
variant, and so does
[`SPEC.md` §"Deferred hand-off filing"](../../SPEC.md): a run that reaches
closure with nobody present still files each deferred real-world operator step
as its own unchecked PLAN.md row rather than leaving it as prose (Claude Code
exposes the filing motion as `/ft-file-followup --unattended`; the concept is
platform-neutral, the flag syntax is not). The duty binds *harder* here, since
whatever the run could not do falls to the absent operator. The filing's
`unattended-candidates:` report line is copied into the closing tasknote's
Final Summary before the archive move
([`SPEC/unattended-candidacy.md` §"Persistence"](../unattended-candidacy.md)) —
the run marks no row itself. A run that parks
files nothing — a park is paused, not closed, and its `park-reason:` already
carries what to take up. Resume is the ordinary blocked path in
[`SPEC/blocked.md`](../blocked.md), which also clears `park-reason:`.

**Cross-repo work, in one paragraph.** A tasknote's deliverable lands in the
repo whose session opened it. When Discovery — or later execution — surfaces
work belonging to a *different* repo (a doc, config, or code change outside
this checkout), **file it there** (a PLAN.md line, a starter tasknote, or a
routed ticket) rather than editing it directly from this task cycle; the
target repo's own procedure run executes it, with its own Discovery,
Acceptance, and closure commit. This is symmetric with the routing adopting
projects already use in the other direction — a project task that finds a
flowtron-side issue files a `CORE-` ticket and routes it rather than fixing
flowtron from its own session. One tasknote (CORE-483.3) predates the rule and
edited another repo's files directly as its whole deliverable; it stands as
the **single documented exception, not a precedent**, in the same sense as the
carve-outs in [`SPEC/scope-boundaries.md` §"What flowtron does NOT
provide"](../scope-boundaries.md). Full contract:
[`SPEC/scope-boundaries.md` §"Cross-repo edit remit"](../scope-boundaries.md).

The **operator-cue vocabulary** (🛠️ 📦 🟢 👁️ 🏁 ✅ 🔧 🧩 🧠 🔭 👇 🗄️ ▶️ 📡 💻 ✋ 🔍 and
their UPPERCASE labels) is contract-layer, not Claude-specific — emit it
**verbatim**. The glyph is the fast-scan signal; the UPPERCASE label is the
fallback if your surface strips emoji. Full vocabulary:
[`SPEC/cue-vocabulary.md` §"Operator-cue vocabulary"](../cue-vocabulary.md).

## Steps

### 0 — Interpret invocation flags

Accept `--fast` / `-f`, `--debug` / `-d`, `--loop`, and `--unattended`
as an unordered set. When trailing tokens are present, read
[`claude/skills/ft-task/step-0-flags.md`](../../claude/skills/ft-task/step-0-flags.md)
and follow its flag validation, inline markers, and conditional fragment loads.
Translate `fast-mode` to autonomous mode and `AskUserQuestion` to a structured
ask. Unknown tokens require clarification before proceeding; do not silently
ignore them. Resolve paths relative to the canonical fragment directory and
this SOP's contract root, in either self-host or adopter layout.

### 1 — Locate the task and check its status

Read `.flowtron/PLAN.md` and find the line containing `**<TASK-ID>**`. If the
ID is absent, stop and ask whether to add it or use a different ID.

**Status gate (non-negotiable).** Re-read the located line. If it is checked
(`- [x]`) or lives under `## Completed`, the task is already closed — **stop**,
surface the conflict, and ask whether the operator meant a different ID.
Never infer status from earlier conversation; read the line.

Otherwise capture, per [`SPEC.md` §"Task-line format"](../../SPEC.md): the
optional `[model]` tag, an optional `[unattended]` marker, the `| shortname`,
the long description, the section heading the line lives under (its
**Priority**), and an optional `[!critical]` flag. Canonical ordering when the
flags are present: `[!critical]` **before** `[model]`, `[unattended]`
**after** it. An optional `[handoff]` marker may sit in the same trailing
run; it declares a row that stops for a human act and changes nothing on an
attended run — read past it.

**The `[unattended]` marker is not unattended mode.** The marker is the
*operator's* per-row declaration that this task is safe to drive with nobody
present; the mode in the primitives table above is the *caller's*
per-invocation declaration that nobody is. **The marker never implies the
mode** — reading it does not put you in unattended mode, and running in the
mode does not require the row to carry it. What a marked row *does* imply, on
an attended run where no mode was requested, is **autonomous mode**: a row
declared safe with nobody present needs no pauses when somebody is, so treat
it as an autonomous-mode run and say so inline
([`SPEC/gate-postures.md` §"`--fast` operator override"](../gate-postures.md)). Flowtron never writes the marker; seeding it
is an operator act, so a caller choosing work autonomously treats an
**unmarked row as undecided, not approved**. Grammar, position, and the two
ways authors mis-write it:
[`SPEC.md` §"Task-line format"](../../SPEC.md); the dispatch posture that
consumes it: [`docs/EXTERNAL-AGENTS.md`](../../docs/EXTERNAL-AGENTS.md).

**Purpose blurb — emit it here.** With the line captured and nothing else read
yet, emit a short plain-English statement of what the task is: two lines, the
ID and shortname, then 1-2 sentences of purpose drawn from the `PLAN.md` long
description.

```text
🎯 <TASK-ID> — <shortname>
<1-2 sentences of plain-English purpose.>
```

This is the earliest point you know what the task is, and every check between
here and Phase 1 — the model gate, the foreign-dirt gate, the collision checks
— can end the run, so a later emission risks orienting the operator on nothing.
It fires once, ahead of the promote / scaffold / resume branch, so there is no
per-path variant to keep in sync. Emit it and continue in the same turn: it
expects no reply, blocks nothing, and is suppressed by neither `--fast` nor
`--unattended`. It is **not** an operator cue and adds no gate. Full contract:
[`SPEC/purpose-blurb.md`](../purpose-blurb.md).

**`## Completed`-rotation advisory.** While `PLAN.md` is open, count the
checked rows under `## Completed` (nested epic children included). Past
**60**, surface a one-line `⚠️` advisory naming the count and suggesting the
operator rotate the oldest rows to `.flowtron/PLAN-ARCHIVE.md` — then
continue. Informational only; never block, never rotate on your own. Full
contract (the 60-row bound, row-count granularity, the never-split-a-cohort
rule): [`SPEC/plan-filing.md` §"`## Completed` rotation"](../plan-filing.md).

**Filing-length advisory.** If the captured long description exceeds 70 words,
emit an informational warning and continue; do not block or refile it.

### 2 — Resolve the area and check the model

Resolve the **Area** by reading the `.flowtron/tasknote/README.md`
§"Archive layout" table — every task, every prefix, canonical ones included.
`<area>` is **never derived from the ID**: lowercasing the prefix is the
adopter's declaration-time default, not a resolution you may perform, and a
project may deliberately declare a folder it would not produce (`OPS-*` →
`archive/operations/`). See [`SPEC.md` §"Task ID convention"](../../SPEC.md). No
row for this prefix → stop and ask; do not guess a folder.

On a concrete mismatch, category under-tier, or missing-tag branch, read
[`claude/skills/ft-task/step-1.5-model-edge.md`](../../claude/skills/ft-task/step-1.5-model-edge.md).
Translate its asks to this platform's primitives and preserve every invocation
flag in re-entry instructions. A concrete mismatch stops and offers switch or
operator-approved retag; a missing tag asks before scaffold; a category
under-tier only warns and proceeds. Never silently retag a satisfied category.
Run the foreign-dirt guard below before any model edit. Run it once for
entry; Step 3 must not mistake this run's approved writes for foreign dirt.

Check the `[model]` tag against the model you are running as, per
[`SPEC/model.md`](../model.md). If the task is tagged for a heavier tier or a
different concrete model than yours, surface that to the operator before doing
heavy thinking on the wrong model — heavy work should not run on an
under-tier model silently. **Under unattended mode** there is no operator to
surface a concrete mismatch to: first pass Step 3 pre-flight, then park with
`status: blocked` and `park-reason: model-mismatch — …`. Create a note only
when absent; preserve existing starter/blocked content. Halt rather than asking or
retagging the PLAN line yourself. The soft under-tier advisory is unchanged —
it never blocked, so there is nothing to convert.

**Epic IDs.** If the ID is `<AREA>-EPIC-<N>` or `<AREA>-<N>.<sub>`, read
[`SPEC/epic.md`](../epic.md) for the lifecycle — the parent line is not
checked off until all children close; a `.1` child is typically epic-level
Discovery (deliverable = the filed child list), and the highest-numbered
child is typically an Audit.

### 3 — Open or scaffold the tasknote

**Foreign-dirt gate (paper-complete guard).** Before any scaffold / promote /
resume writes, run `git status --porcelain` unless already checked before a
model edit in Step 2. If foreign dirt exists: **STOP**, surface
the dirt list, and ask the operator to commit / stash / discard themselves,
then re-invoke. Do not auto-clean. Full contract:
[`SPEC.md` §"Paper-complete guard"](../../SPEC.md). **Unattended mode does not
relax this**, and it does not park here either: writing a new tasknote into a
tree the guard has just refused to touch makes that file its own foreign dirt
on the next invocation. Report the dirt machine-readably and terminate without
writing — likewise for the archived / in-flight collisions below, where a
tasknote for this ID already exists and there is nothing new to park.

Check `.flowtron/tasknote/<TASK-ID>.md` and branch on its existence / YAML
`status:`:

- **Already archived** at `.flowtron/tasknote/archive/<area>/<TASK-ID>.md` →
  stop; the task is closed. Surface the conflict.
- **`status: starter`** → promote it; the starter context becomes Phase 1
  input. Read [`SPEC/starter.md`](../starter.md) and execute
  [`claude/skills/ft-task/step-3a-promote-starter.md`](../../claude/skills/ft-task/step-3a-promote-starter.md),
  including the seed drift/fidelity check. Translate its ask primitives.
- **`status: blocked`** → resume from Phase 2; Phase 1 is already done on a
  parked tasknote. Read [`SPEC/blocked.md`](../blocked.md) and execute
  [`claude/skills/ft-task/step-3c-resume-blocked.md`](../../claude/skills/ft-task/step-3c-resume-blocked.md),
  including drift-checking parked work and clearing `park-reason:`. Translate
  its ask primitives. Once the parked note is read, name the `park-reason:`
  you are clearing in
  one plain prose line before Phase 2 begins — the step-1 blurb could not have
  known it, and there is no Discovery here to orient the operator. Ordinary
  prose, not a second 🎯 emission.
- **`status: in-progress` / `not-started` / `completed`** → the file is in
  flight or closed; do not restart. Continue it conversationally. If the
  session that started it is gone, that is not possible — an `in-progress`
  note is recovered by park-then-resume, not by restarting. See
  [`SPEC/blocked.md`](../blocked.md) §"Resuming an interrupted run".
- **Absent** → **First, sidequest-stub retirement**: if
  `.flowtron/sidequest/<TASK-ID>.md` exists, this scaffold is a sidequest
  promotion — delete it now. Contract:
  [`claude/skills/ft-file-followup/park-mode.md`](../../claude/skills/ft-file-followup/park-mode.md)
  §Notes → "Promotion" ("Delete `.flowtron/sidequest/<ID>.md` after
  promotion"); this executes it at the point a promoting run actually writes,
  instead of relying on the promoter to remember a rule stated only in that
  fragment and `docs/GLOSSARY.md`. Then scaffold fresh: copy
  `templates/tasknote-template.md` to
  `.flowtron/tasknote/<TASK-ID>.md` and fill the frontmatter + body per
  [`SPEC.md` §"Tasknote frontmatter"](../../SPEC.md) and
  [§"Tasknote body shape"](../../SPEC.md). Set `status: in-progress`,
  `created:` to today, `title:` from the shortname, `related-tasks:` from any
  IDs the PLAN.md line cites. The 🎯 Goal derives from the PLAN.md line; ✅
  Acceptance and 🧩 Subtasks start empty and fill during Phase 1.
  If the ID is an epic implementation child (not `.1` / `.N`), echo any
  `## 🌳 Fan-out` claim that names it into omit-when-absent `blocked-by:`
  / `parallel-safe-with:` so a worktree copy still sees the claim
  ([`SPEC/epic.md`](../epic.md) §"Fan-out").

### 4 — Phase 1: Discovery

Work the Phase 1 checklist in [`SPEC.md` §"📝 Phase 1: Discovery"](../../SPEC.md),
ticking each box in the tasknote as you go:

- **Relevance Assessment** (non-negotiable) — `Proceed` / `Re-scope` /
  `De-scope` with a one-line rationale. `Re-scope` rewrites the PLAN.md line +
  tasknote header before continuing. A hard prerequisite on a flagless run
  offers delete-and-halt or park at the 🛠️ gate; autonomous mode defaults to
  park, and unattended mode parks without making the verdict's PLAN edit
  ([`SPEC/blocked.md`](../blocked.md)). `De-scope` clears its required gate
  before Phase 4 closure with the rationale as the final summary.
- **Read** the relevant source files — when the read set is broad or its shape
  is unknown, consider isolating the search in a **probe**
  ([`templates/subagent-probe-template.md`](../../templates/subagent-probe-template.md))
  and recording only its distilled return in Discovery Notes. A probe owns no
  tasknote, never runs Phase 1, and never trips a gate; it answers one stated
  question and ends. Judgment prompt, not a gate — skipping it is always
  correct for a narrow read set. If your platform exposes no sub-agent
  primitive, see [`docs/PLATFORMS.md`](../../docs/PLATFORMS.md)
  §"Non-Claude capability triggers" for the second-session approximation.
- **Best Practices Review** — for code or module-boundary work, identify
  touched responsibilities, dependency direction, existing abstractions, nearby
  duplication, and any required in-scope refactor or deferred cleanup; otherwise
  record `N/A` with reason.
- **Archive skim** — list `.flowtron/tasknote/archive/<area>/` and look for
  prior tasknotes touching the files in scope (if YAML `touches:` is set,
  prefer those paths); also open IDs named by `## 🔗 Related`, YAML
  `supersedes:`, and any ⚠️ `Superseded by` pointer on the hits — still
  grep + read, no query engine; when the grep returns more than a handful of
  notes (~3 is a fair line), prefer handing the reading to a **probe** — the
  read step's clause above, applied where it bites hardest, since a path grep
  over a mature archive can return dozens of notes — rather than pulling every
  hit into this window; log load-bearing findings (renames, regressions, prior
  decisions) before re-interpreting the task. An absent or empty
  `archive/<area>/` is a prompt to re-check `<area>` against the README table
  before logging "no prior tasknotes" — a derived-and-wrong folder is
  indistinguishable from a genuinely empty one.
- **Drift check** — verify cited paths, line numbers, function names, and
  root-cause hypotheses still match the code, **and** cross-reference the plan
  you are forming against its `PLAN.md` line and the SPEC contracts it touches
  (read them, don't recall them); surface drift before acting.
- **Clarify** — use a **structured ask** for anything genuinely ambiguous; if
  nothing is ambiguous, write `No clarifications needed` with the explicit
  assumptions. In autonomous mode, record reasonable assumptions directly
  instead of adding routine clarification pauses; required operator decisions
  retain their contract gates.
- **Populate ✅ Acceptance** with concrete, testable criteria, each naming the
  **verify command** that decides it — a test run, a lint/type-check, a
  `grep -q` on a contract file. A criterion no command decides marks itself
  `judgment` (or `👁️`) with a one-line reason; do not invent one. Contract:
  [`SPEC.md` §"Tasknote body shape"](../../SPEC.md).
- **Populate 🧩 Subtasks** with concrete, ordered steps, and **declare YAML `touches:`** with the paths this task expects to edit. Contract — exemptions, and why it is never a gate: `SPEC.md` §"Tasknote frontmatter".

**Under debug mode**, work the fragment's four Phase 1 prompts *inside* this
checklist, after the Relevance Assessment, recording answers in Discovery
Notes. They add no box and no gate; the exit-gate judgment below is unchanged.

**Exit gate (🛠️ Phase 1→2).** Tick every Phase 1 box first. `ft-task` uses
the `default-skip` flavor: when
Discovery surfaced only routine clarifications (or none), emit the inline
marker `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` and start
Phase 2 immediately — record the judgment inline ("Discovery surfaced no
significant deviation → skip 🛠️"). When Discovery surfaced a **significant
scope deviation** (a `Re-scope`/`De-scope` verdict — always; or a
clarification that changed which file to edit, restructured the subtasks,
added a cross-cutting concern, or changed the approach), surface the 🛠️
banner with a mandatory 1-2 sentence plain-English preview and wait for the
operator's go (conversational assent —
[`SPEC/cue-vocabulary.md` §"Accepted gate replies"](../cue-vocabulary.md)). Full flavor rules
and the autonomous-mode drift carve-out (De-scope always fires 🛠️ even under
autonomous mode; a Re-scope under autonomous mode still rewrites the PLAN.md
line and tasknote header, then announces it in a one-line ⚠️ notice and
proceeds instead of firing — on a blocked prerequisite the notice names a
`drift` park instead and the run halts, per
[`SPEC/blocked.md`](../blocked.md) §"Under `--fast`, park and say so"):
[`SPEC/gates.md` §"Phase 1→2 exit gate"](../gates.md). **Under unattended
mode** neither verdict is weakened, and there is nobody to fire at or to
read a notice: the verdict parks with `park-reason: drift — …` and stops,
leaving the verdict's own PLAN.md edit and any tasknote deletion to the
resuming operator.

### 5 — Phases 2-4

After the Phase 1→2 gate clears, Phase 2 → Phase 3 → Phase 4 closure ops flow
**continuously with no intermediate gate** — the next gate is 📦 at commit
time (Step 6).

- **Phase 2: Execution** — [`SPEC.md` §"🛠️ Phase 2"](../../SPEC.md). Survey
  neighboring code for an existing pattern to extend (justify a new shape only
  if none fits), check DRY and single-responsibility boundaries, and prefer
  composition when it reduces coupling. Implement the minimal solution; make a
  refactor only when Acceptance requires it or the touched path would otherwise
  introduce duplication, obscure responsibility, or violate a dependency
  boundary; record the reason and defer unrelated cleanup. Add targeted tests
  for non-trivial behavior. If a hard dependency surfaces mid-execution,
  **park** the tasknote per [`SPEC/blocked.md`](../blocked.md) and stop.
  Under **unattended mode** a destructive-action escalation (🗄️/▶️/📡/💻) and a
  ✋ `ACTION` that is a **prerequisite** for continuing park the same way, with
  `park-reason: destructive — …` / `prerequisite — …`; an *advisory* ✋ is
  recorded and the run continues. The prerequisite/advisory split is biased
  conservative — park on doubt, since an over-park costs one resume and an
  under-park reaches closure with the prerequisite never performed.
  If a **direction-changing decision** surfaces mid-execution — one that
  changes the approach, contract, data model, or sequencing in a way reaching
  *beyond* this task — run the **downstream-impact reconciliation scan** before
  continuing: enumerate active `PLAN.md` entries (`High` / `Medium` / `Low` /
  `Future Opportunities`; `## Completed` is out of scope) sharing a surface
  with the decision, classify each (stale / contradictory / redundant /
  unaffected), and propose one reconcile action per impacted entry (merge /
  nest / edit / delete / leave). Surface the list for explicit operator
  confirmation, apply only what is confirmed, then resume. A decision whose
  effect stays inside this task skips the scan (judgment). This is an inline
  review prompt, **not** a third banner — and like the Re-scope/De-scope
  carve-out it guards plan correctness, so it runs even under autonomous mode
  (it proposes; the operator owns the confirm). Under **unattended mode** there
  is no operator to own that confirm, so such a decision is a `Re-scope` and
  parks as `drift`. Triggers, scan steps, and
  vocabulary:
  [`SPEC/tasknote-selection.md` §"Downstream-impact reconciliation"](../tasknote-selection.md).
- **Phase 3: Testing & Linting** — [`SPEC.md` §"🧪 Phase 3"](../../SPEC.md).
  Run targeted tests + lint/type-check on changed code (full suite only for
  broad/cross-cutting changes). **Under unattended mode** run the repo's full
  validation set instead — its `justfile` recipes, its `AGENTS.md` validation
  commands, or its CI workflow's steps — never the targeted default; a red the
  diff caused returns to Phase 2, and a red the run cannot make green parks
  `input-needed` rather than closing over it
  ([`SPEC/gate-postures.md` §"What `--unattended` never relaxes"](../gate-postures.md)).
  Record a **Verification receipt** in Testing
  Notes: read the runner's tail, not full scrollback, and record each
  Acceptance verify command as `command → exit code`, with the
  first failure line when non-zero, folded together with the structural
  half — for changed code, confirm no avoidable duplication, dead code,
  unexplained complexity, unnecessary public-surface growth, or stale
  code-facing documentation; otherwise record `N/A` with reason. Then the
  **External review**: brief a read-only sub-agent with
  [`templates/subagent-probe-template.md`](../../templates/subagent-probe-template.md)
  §"Variant — review probe", scoped to the task's working-tree diff plus
  commits made by this run (exclude unrelated ahead-of-upstream history),
  and record each finding in Testing Notes with its
  disposition — a **blocker** returns to Phase 2 (Phase 3 re-runs), a **note**
  is fixed or filed; `N/A` when the diff is too small to grade. Under
  unattended mode a blocker the run cannot fix parks `input-needed`. Rungs,
  flag interactions, and the `N/A` bound: [`SPEC.md` §"🧪 Phase 3"](../../SPEC.md).
  For frontend changes, ask the operator for visual confirmation with a
  `👁️ **CONFIRM**` ask in the **emphasized inline shape** — its own line,
  blank-line isolated, label bolded
  ([`SPEC/cue-vocabulary.md` §"Emphasized inline ask shape"](../cue-vocabulary.md)). Still inline
  prose, **not** a banner: the emphasis is raised within the ask, not promoted
  out of it. Under autonomous mode,
  suppress the 👁️ ask but still run lint/type-check. **Under unattended mode**
  do not suppress it: there is no operator to hand the check to, so the ask
  parks the tasknote with `park-reason: visual-confirm — …` and the run stops.
  **Under debug mode**, the fragment's repro
  re-verify runs **even under autonomous mode**; a still-failing repro returns
  to Phase 2, not closure.
- **Phase 4: Closure (auto-run)** — [`SPEC.md` §"🚀 Phase 4"](../../SPEC.md)
  + [`SPEC.md` §"Paper-complete guard"](../../SPEC.md). Run the doc-drift
  sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" (per
  entry: "no change" or the specific update). Tick every `## ✅ Acceptance`
  criterion the work satisfied and annotate any it did not (`N/A` / not-met
  with a one-line reason) — never leave a box silently unticked. Do **not**
  flip the markdown nav chip to `✅ Completed`; that write was retired
  deliberately and the chip is render-derived from YAML. Flip the tasknote's
  YAML `status:` to `completed` (a pre-archive lifecycle write — write-once
  does not reach it). Also set the body's `**Archived:** YYYY-MM-DD` line to
  today's date. If this task falsified a **factual** claim in an already
  archived tasknote, append the one-line
  `> **⚠️ Superseded by [[<TASK-ID>]]** — <what was falsified>` pointer under
  that note's nav header and stage it in the same commit — append-only, never
  rewriting the original text (`SPEC.md` §"Tasknote frontmatter" carries the
  contract and the three cases it excludes). Conditional: most closures write
  no pointer. Flip **only this task's**
  PLAN.md line to the stub form
  `[x] **<TASK-ID>** [model] | shortname — Completed YYYY-MM-DD.`. Preserve
  every untouched bracket token and model-suggestion glyph, including the
  trailing marker run, verbatim on this and any other PLAN rewrite. For a
  standalone task, move the row to the top of `## Completed`; for an epic
  child, preserve its 2-space nesting beneath the active parent in the current
  priority section until `/ft-close-epic` moves the whole cohort. **Verify
  before moving.** Immediately before that move, mechanically confirm rather
  than recall: `grep -q '^status: completed$'` on the tasknote succeeds, no
  line under `## ✅ Acceptance` reads a bare `- [ ]` without an `N/A` or
  `not[ -]met` token, and the body's `**Archived:**` line carries a real
  date rather than the unfilled `YYYY-MM-DD` placeholder — the first two are
  the same idiom
  [`claude/skills/ft-release/step-7.1-mirror-pairs.md`](../../claude/skills/ft-release/step-7.1-mirror-pairs.md)
  Pair P runs post-hoc across the whole archive, extended here with the
  stamp check, run once on the single note first. A dirty result means the
  status flip, the Archived stamp, or an Acceptance annotation is still
  outstanding — fix it and re-check rather than moving.
  Applies identically under autonomous and unattended mode; neither relaxes
  it. Move the tasknote to
  `.flowtron/tasknote/archive/<area>/<TASK-ID>.md` — but only when deliverable
  paths are ready to stage in the **same** atomic closure commit (do not flip
  if you cannot proceed to commit). Ban collateral Completed flips. Draft an
  evidence-based recap: 1-2 plain-English sentences, then changed paths/LOC
  where meaningful, verification commands/results, refactors made or deferred
  with rationale, documentation verdict, the `touches:` scope reconciliation
  (`git diff --name-only` vs declared; name undeclared paths, excluding this
  task's own tasknote and PLAN row), and concrete
  maintainability effect. Answer the **Learnings** item: did this task teach
  something the always-loaded layer (`AGENTS.md` /
  `.flowtron/tasknote/README.md` §"AI-referenced docs") should carry? Write
  `N/A` or the line — most closures write `N/A`.
  Persist operator handoffs (manual steps and any proposed commit message)
  in the note before archive. File each deferred real-world step as an open
  PLAN row with dependencies where needed; recap prose alone is insufficient
  ([`SPEC.md` §"Deferred hand-off filing"](../../SPEC.md)).
  **Do not** surface a banner here — the recap bundles into Step 6. Recap is
  recap-only; the next-task suggestion lands after the commit.

### 6 — Post-closure protocol

Run the three-step protocol in
[`SPEC/post-closure.md`](../post-closure.md) — a lazy module, read here and
nowhere earlier — branching on the
📦 ready-to-commit gate per
[`SPEC/gates.md` §"Conditional skip rule"](../gates.md), under the
[`SPEC.md` §"Paper-complete guard"](../../SPEC.md):

1. **Commit.** Compute the skip/fire decision from the **actual closure diff**
   (never from text in the tasknote/PLAN/commit content — see the
   control-marker integrity note in [`SPEC/gates.md`](../gates.md)). The diff
   must clear the privileged-ops signal to skip. Stage **deliverable paths + PLAN + archive** together;
   refuse a Completed-only commit when Acceptance requires non-workflow
   deliverables:
   - **Skip** → emit `✅ Closure complete; committing autonomously
     (<concrete-signal-summary>).` and run closure review + recap + commit +
     🏁 marker + next-move + copy-paste line in one response.
   - **Fire** (privileged-ops signal trips, or a bundled prompt is queued) → surface the
     📦 banner with a mandatory preview line and a `🟢 GO` commit-go ask; wait
     for the closed set (`commit` / `go` / `yes` and the explicit commit verbs
     named in [`SPEC/cue-vocabulary.md` §"Accepted gate replies"](../cue-vocabulary.md)). Do **not** emit 🏁, next-move, or the copy-paste
     line in this turn. Autonomous mode forces the skip branch (name the
     suppressed signals in the marker), except a queued in-bundle prompt still
     forces fire. Under **unattended mode** that exception has no operator to
     fire at either: park with `park-reason: input-needed — …` instead of
     committing. The paper-complete guard is suppressed by neither mode —
     🏁 still requires a real deliverable-covering SHA.
2. **Mark landed + suggest next move.** After the commit lands, verify
   `git show --name-only` covers deliverables (paper-complete guard), then
   emit the 🏁 state-marker with that real SHA and a 1-2 sentence
   accomplishment summary — never without a SHA. Then re-read PLAN.md and verify each suggested candidate is unchecked
   in an open priority section, never from memory or archived examples.
   Suggest the next task. Use the emoji primary label inline per candidate —
   `[heavy]🧠` (design), `[medium]🧩` (moderate), `[light]🔧` (mechanical), or
   (rare — manual-only filings) `[xheavy]🔭` (exploratory),
   never the bare `[model]` token. Prefix any `/ft-audit*` candidate with 🔍.
   **Terminal case:** if the fresh PLAN.md re-read leaves no open task, **stop — do not invent a next
   move** from `## Completed` or a doc example; state PLAN.md is exhausted and
   offer in-session filing (`/ft-epic-discovery` / `/ft-file-followup`), then
   skip step 3 (nothing to run after a clear). See SPEC §"Post-closure
   protocol" step 2's **PLAN exhausted (terminal)** form.
3. **Offer the copy-paste line.** The label-line glyph is copied from the
   chosen candidate line just printed in step 2 — 🧠 when it showed 🧠, 🧩 when
   it showed 🧩, 🔧 when it showed 🔧, 🔭 when it showed 🔭; never default to 🔧.
   A session-reset
   label line, then the next invocation alone on its own line as inline code
   **with no trailing punctuation** (a trailing `.` collides with the `.N`
   epic-subtask grammar). Shape, where `<glyph>` is the candidate's 🔧/🧩/🧠/🔭:

   ```markdown
   <glyph> Clear your session, then run:
   `/ft-task <next-ID>`
   ```

   The emoji carries the model signal; never emit
   literal session-reset or model-switch commands. **Exception — context-dependent
   skills:** when the next-skill is `/ft-file-followup` (in either mode) or `/ft-epic-discovery`,
   replace the label line with `👇 Run in this session:` — 👇 (`HERE`) replaces
   the model glyph and signals run-here-don't-clear; the model signal stays on
   the candidate line. These skills draw from current-conversation context;
   clearing destroys what they need.
