---
procedure: ft-task
source: claude/skills/ft-task/ templates/tasknote-template.md
restates: SPEC.md
last-verified: v8.3.0 · 2026-11-07
---

# Procedure SOP — `ft-task`

> Agent-neutral procedure SOP. Loaded by a contract-only agent (Codex CLI,
> Grok Build, …) via its per-platform pointer wrapper
> (`<platform>/procedures/ft-task.md`) when the operator asks it to start a
> task. Claude Code does **not** use this file — it runs the richer
> [`claude/skills/ft-task/SKILL.md`](../../claude/skills/ft-task/SKILL.md)
> directly. See [`SPEC/procedures/README.md`](README.md) for the layer.

This SOP **drives** the flaitron 4-phase tasknote workflow for one task, and
**routes** to the canonical contract rather than restating it:
[`SPEC.md`](../../SPEC.md) and its lazy modules win where the two diverge. A
step that cites a lazy module means *read it at that step*.

## When to run this procedure

The operator asks you to start a task by ID — "start `CORE-004`", "work on
`FE-012`", or your platform's equivalent of `/ft-task CORE-004`. The ID
matches `<AREA>-<NUMBER>` (or `<AREA>-<NUMBER>.<SUB>` for an epic subtask)
per [`SPEC.md` §"Task ID convention"](../../SPEC.md). If no valid ID is
given, ask for one — do not guess.

Whether the task warrants a tasknote — the skip cases (~25-line doc patches
among them) win over a standalone row's PLAN.md ID — is the Step 1 tier
advisory's call.
See [`SPEC/tasknote-selection.md`](../tasknote-selection.md) for the use/skip
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
| **autonomous mode** | The operator may ask you to run without stopping at the conditional gates (Claude Code exposes this as `--fast`). Honor it as described under each gate. It is also **implied by a PLAN.md row's `[unattended]` marker** when no mode was requested — see Step 1. |
| **debug mode** | The operator may ask you to drive the task hypothesis-first because the root cause is not yet known (Claude Code exposes this as `--debug`). **Explicit opt-in only** — never infer it from a bug-shaped task description. It adds *content* to Phases 1–4, no new phase, template, banner, or gate. When requested, **read [`claude/skills/ft-task/step-4-debug-mode.md`](../../claude/skills/ft-task/step-4-debug-mode.md) now** — the mode's single body for Phases 1–4. Read its `--fast` / `fast-mode` as autonomous mode and `AskUserQuestion` as a structured ask. |
| **loop mode** | The operator may ask you to run the task as an execute→verify loop because "done" is one or more machine-checkable commands (Claude Code exposes this as `--loop`). **Explicit opt-in only.** It changes the Phase 2↔3 drive, not the phases; cycles run autonomously, destructive steps park. Read [`SPEC/loop.md`](../loop.md) and [`claude/skills/ft-task/step-5-loop-mode.md`](../../claude/skills/ft-task/step-5-loop-mode.md) now, and follow the fragment wherever it amends a step, from scaffold to post-convergence review. Translate `fast-mode` to autonomous mode and `AskUserQuestion` to a structured ask. |
| **micro mode** | The operator may ask for a micro-sized record (Claude Code exposes this as `--micro`). **Explicit opt-in only**, though it is the routing default for known work with no design question ([`SPEC/tasknote-selection.md`](../tasknote-selection.md)). Same phases, gates, and closure, logged in one `## ⚡ Notes` section. Read [`claude/skills/ft-task/micro-mode.md`](../../claude/skills/ft-task/micro-mode.md) now. Refuses loop and debug mode. |
| **unattended mode** | The caller may declare that **no operator is present to answer a gate** (Claude Code exposes this as `--unattended`). It is autonomous mode's autonomy plus one behavior: the six gates nobody can answer **park the tasknote** instead of firing — the visual-confirmation ask and the Re-scope notice included, which autonomous mode only delegates to a present operator. **Read [`claude/skills/ft-task/unattended-mode.md`](../../claude/skills/ft-task/unattended-mode.md) now**, with [`SPEC/gate-postures.md` §"`--unattended` operator posture"](../gate-postures.md) and [`SPEC/blocked.md`](../blocked.md) beside it — the park recipe, the conversion map, the `park-reason:` codes. Translate as for debug mode, plus: its `/ft-task` steps are this SOP's steps, and `/ft-file-task --unattended` is the platform-neutral filing motion of [`SPEC.md` §"Deferred hand-off filing"](../../SPEC.md). |

Autonomous mode and debug mode are **orthogonal and compose** (the repro
re-verify is not a gate autonomous mode may suppress). Loop mode composes the
same way — autonomous mode reaches only its pre-loop Phase 1 surface, since
the loop already runs autonomously.
Micro mode composes with autonomous mode.
Unattended mode composes with all four, never replacing any of them.

**Parking.** How an unattended park writes, commits, and stops, and what it
never does: `claude/skills/ft-task/unattended-mode.md` §"The park recipe";
resume is the ordinary [`SPEC/blocked.md`](../blocked.md) path. What no
unattended run relaxes — the paper-complete guard, deferred hand-off filing
and its `unattended-candidates:` copy, and that a park files nothing:
`claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes".

**Cross-repo work** is filed in the repo it belongs to, never edited from
this cycle: [`SPEC.md` §"Cross-repo edit remit"](../../SPEC.md).

The **operator-cue vocabulary** (every glyph and its UPPERCASE label, the
fallback if your surface strips emoji) is contract-layer, not
Claude-specific — emit it **verbatim**. Full vocabulary:
[`SPEC/cue-vocabulary.md` §"Operator-cue vocabulary"](../cue-vocabulary.md).

## Steps

### 0 — Interpret invocation flags

Accept `--fast` / `-f`, `--debug` / `-d`, `--loop`, `--micro`, and `--unattended`
as an unordered set. When trailing tokens are present, read
[`claude/skills/ft-task/step-0-flags.md`](../../claude/skills/ft-task/step-0-flags.md)
and follow its flag validation, inline markers, and conditional fragment loads.
Translate `fast-mode` to autonomous mode and `AskUserQuestion` to a structured
ask. Unknown tokens require clarification before proceeding; do not silently
ignore them. Resolve paths relative to the canonical fragment directory and
this SOP's contract root, in either self-host or adopter layout.

### 1 — Locate the task and check its status

Read `.flaitron/PLAN.md` and find the line containing `**<TASK-ID>**`. If the
ID is absent, stop and ask whether to add it or use a different ID.

**Status gate (non-negotiable).** Re-read the located line. If it is checked
(`- [x]`) or lives under `## Completed`, the task is already closed — **stop**,
surface the conflict, and ask whether the operator meant a different ID.
Never infer status from earlier conversation; read the line.

Otherwise capture, per [`SPEC.md` §"Task-line format"](../../SPEC.md): the
optional `[model]` tag, an optional `[unattended]` marker, the `| shortname`,
the long description, the section heading the line lives under (its
**Priority**), and an optional `[!critical]` flag. An optional `[handoff]`
marker may sit in the trailing run; it declares a row that stops for a human
act and changes nothing on an attended run — read past it.

**The `[unattended]` marker is not unattended mode.** On a run where no mode
was requested it implies **autonomous mode** — say so inline, and read
[`SPEC/gate-postures.md` §"`--fast` operator override"](../gate-postures.md) —
never unattended mode, which only the caller declares. What the marker means:
[`SPEC/task-line-segments.md` §"Segment table"](../task-line-segments.md).

**Purpose blurb — emit it here**, once, ahead of the model gate, the
pre-flight checks, and any scaffold write (each can end the run), drawn only
from the `PLAN.md` long description:

```text
🎯 <TASK-ID> — <shortname>
<1-2 sentences of plain-English purpose.>
```

Then continue in the same turn; no mode suppresses it. Contract:
[`SPEC/cue-vocabulary.md` §"🎯 Purpose blurb"](../cue-vocabulary.md).

**Tier advisory.** Judge the tier the long description implies — skip,
micro, or full ([`SPEC/tasknote-selection.md`](../tasknote-selection.md); an
epic child never reads as skip; not in debug or loop mode). When no tasknote
or sidequest stub exists for the ID and the tier differs from the requested
shape, say so in one ⚠️ line; never change the mode yourself. On **skip** with
the operator present and no autonomous or unattended mode, ask once
(structured ask): run as requested, or edit directly — once Step 2's model
check and Step 3's pre-flight pass, make the edit, rewrite the row per
[`SPEC/plan-filing.md` §"Exception — skip-tier closures"](../plan-filing.md),
and commit both together, with no tasknote (never push).

**Filing-length advisory.** If the captured long description exceeds 70 words,
emit an informational warning and continue; do not block or refile it.

### 2 — Resolve the area and check the model

Resolve the **Area** from the `.flaitron/tasknote/README.md` §"Archive layout"
table — every task, every prefix. **Never derive it from the ID**
([`SPEC.md` §"Task ID convention"](../../SPEC.md)); no row for this prefix →
stop and ask.

Before the model check, run Step 3's in-flight refusal, then its foreign-dirt
guard and archived refusal, then (unattended mode, a literal `.N` ID only) its
open-siblings stop — once, so a retag never lands on a note this run then
refuses, and so Step 3 never mistakes this run's approved writes for foreign
dirt.

Then, before any heavy thinking, check the `[model]` tag against the model
you are running as, per [`SPEC/model.md`](../model.md). On a concrete
mismatch, category under-tier, or missing tag, read
[`claude/skills/ft-task/step-1.5-model-edge.md`](../../claude/skills/ft-task/step-1.5-model-edge.md),
translating its asks and keeping every invocation flag in re-entry
instructions: a concrete mismatch stops, a missing tag asks before scaffold,
a category under-tier only warns and proceeds. Never silently retag a
satisfied category. **Under unattended
mode** a concrete mismatch parks `model-mismatch` instead of asking, and you
never retag the PLAN line yourself — what it writes, and when it writes
nothing: [`SPEC/gate-postures.md` §"Pre-scaffold stops"](../gate-postures.md).

**Epic IDs** (`<AREA>-EPIC-<N>`, `<AREA>-<N>.<sub>`) — read
[`SPEC/epic.md`](../epic.md) for the lifecycle.

### 3 — Open or scaffold the tasknote

**Foreign-dirt gate.** Unless Step 2 already ran it, run
`git status --porcelain` before any scaffold / promote / resume write. This
ID's own `.flaitron/tasknote/<TASK-ID>.md` (any status but a deletion or
rename) is not foreign dirt — the in-flight refusal runs first and the branch
below routes it. Any other dirt: emit
`🚧 DIRTY — commit, stash, or discard first:` then the dirt list, and stop;
do not auto-clean ([`SPEC.md` §"Paper-complete guard"](../../SPEC.md)).
**Unattended mode neither relaxes nor parks this**: it emits its `⏸` stop
line and writes nothing, as on the archived / in-flight collisions below and
the `.N` open-sibling or missing/closed-parent stop —
`claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops".

Check `.flaitron/tasknote/<TASK-ID>.md` and branch on its existence / YAML
`status:`:

- **Already archived** at `.flaitron/tasknote/archive/<area>/<TASK-ID>.md` →
  stop; the task is closed. Surface the conflict.
- **`status: starter`** → promote it; the starter context becomes Phase 1
  input. Read [`SPEC/starter.md`](../starter.md) and execute
  [`claude/skills/ft-task/step-3a-promote-starter.md`](../../claude/skills/ft-task/step-3a-promote-starter.md),
  including the seed drift/fidelity check. Translate its ask primitives.
- **`status: blocked`** → resume from Phase 2; Phase 1 is already done on a
  parked tasknote — except a `model-mismatch` park, a bare scaffold written
  before Phase 1 ran, which resumes at Phase 1 (Step 4). Read [`SPEC/blocked.md`](../blocked.md) and execute
  [`claude/skills/ft-task/step-3c-resume-blocked.md`](../../claude/skills/ft-task/step-3c-resume-blocked.md),
  including drift-checking parked work and clearing `park-reason:`. Translate
  its ask primitives. Once the parked note is read, name the `park-reason:`
  you are clearing in one plain prose line before the run continues —
  ordinary prose, not a second 🎯 emission.
- **`status: in-progress` / `not-started` / `completed`, or unrecognized** →
  the file is in flight or closed; do not restart. Continue it
  conversationally; if its session is gone, recover an `in-progress` note by
  park-then-resume, never by restarting
  ([`SPEC/blocked.md`](../blocked.md) §"Resuming an interrupted run").
- **Absent** → **First, sidequest-stub retirement**: if
  `.flaitron/sidequest/<TASK-ID>.md` exists, this scaffold is a sidequest
  promotion — once the scaffold below is written, carry the stub's body into
  its Discovery Notes, and only after that write delete the stub
  ([`claude/skills/ft-file-task/park-mode.md`](../../claude/skills/ft-file-task/park-mode.md)
  §Notes → "Promotion"). Then scaffold fresh: copy
  `templates/tasknote-template.md` to
  `.flaitron/tasknote/<TASK-ID>.md` and fill the frontmatter + body per
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
ticking each box in the tasknote as you go. SPEC owns each item and its
reason; the motions this SOP adds:

- **Relevance Assessment** (non-negotiable) — `Proceed` / `Re-scope`
  (rewrites the PLAN.md line + tasknote header) / `De-scope` (closes with the
  rationale as the final summary), one-line rationale; a blocked prerequisite follows
  [`SPEC/blocked.md` §"Phase 1 entry"](../blocked.md). The exit gate below
  routes either non-`Proceed` verdict, per mode.
- **Read** the relevant source files — a broad or unknown read set → consider
  a **probe** ([`templates/subagent-probe-template.md`](../../templates/subagent-probe-template.md)).
  No sub-agent primitive on your
  platform: [`docs/PLATFORMS.md`](../../docs/PLATFORMS.md) §"Non-Claude capability triggers".
- **Best Practices Review** — for code or module-boundary work; otherwise
  `N/A` with reason.
- **Archive skim** — `ls .flaitron/tasknote/archive/<area>/`, `grep -l` it for
  each in-scope path (YAML `touches:` first), and open the IDs that
  `## 🔗 Related`, `supersedes:`, and ⚠️ `Superseded by` pointers on the hits
  name; over ~3 hits, a **probe**. An empty or absent
  folder → re-check `<area>` against the README table before logging "no prior
  tasknotes".
- **Drift check** — cited facts against the code, **and** your plan against
  its `PLAN.md` line and the SPEC contracts it touches (read them, don't
  recall them); surface drift before acting.
- **Clarify** — use a **structured ask** for anything genuinely ambiguous; if
  nothing is ambiguous, write `No clarifications needed` with the explicit
  assumptions. In autonomous mode, record reasonable assumptions directly
  instead of adding routine clarification pauses; required operator decisions
  retain their contract gates.
- **Populate ✅ Acceptance** with testable criteria, each naming the
  **verify command** that decides it; one no command decides marks itself
  `judgment` (or `👁️`) with a one-line reason. Contract:
  [`SPEC.md` §"Tasknote body shape"](../../SPEC.md). A promoted starter's
  `### Acceptance that decides it` criteria arrive verbatim, placeholders
  skipped — add to them and surface a drifted one, never silently reword or
  drop them ([`SPEC/starter.md`](../starter.md)).
- **Populate 🧩 Subtasks** with concrete, ordered steps, and **declare YAML `touches:`** with the paths this task expects to edit. Contract — exemptions, and the one run it binds: `SPEC.md` §"Tasknote frontmatter".

**Under debug mode**, work the fragment's four Phase 1 prompts *inside* this
checklist, after the Relevance Assessment, recording answers in Discovery
Notes. They add no box and no gate; the exit-gate judgment below is unchanged.

**Exit gate (🛠️ Phase 1→2).** Tick every Phase 1 box first. `ft-task` uses
the `default-skip` flavor; its judgment rule and skip marker are
[`SPEC/gates.md` §"Phase 1→2 exit gate"](../gates.md). Skip → emit
`✅ Phase 1 Discovery complete; entering Phase 2 Execution.` and start Phase 2
immediately. Fire → surface the 🛠️ banner with its mandatory 1-2 sentence
plain-English preview and wait for the operator's go
([`SPEC/cue-vocabulary.md` §"Accepted gate replies"](../cue-vocabulary.md)).
Record the judgment inline either way. De-scope always fires. Under autonomous mode a
Re-scope still makes its PLAN.md line and tasknote-header rewrite, then emits
the one-line ⚠️ notice and proceeds — a blocked prerequisite parks `drift` and
halts instead
([`SPEC/gate-postures.md` §"`--fast` operator override"](../gate-postures.md)).
Under unattended mode the verdict parks `drift` and stops **without** making its
PLAN.md edit or deleting the tasknote — both wait for the resuming operator
([`SPEC/blocked.md`](../blocked.md)); a `Proceed` first takes the size estimate
(`claude/skills/ft-task/unattended-mode.md` §"Scope guardrails").

### 5 — Phases 2-4

After the Phase 1→2 gate clears, Phase 2 → Phase 3 → Phase 4 closure ops flow
**continuously with no intermediate gate** until 📦 (Step 6).

- **Phase 2: Execution** — [`SPEC.md` §"🛠️ Phase 2"](../../SPEC.md): pattern
  survey, the minimal solution, a refactor only under its Minimal refactor
  gate (record the reason), targeted tests for non-trivial behavior. If a hard
  dependency surfaces mid-execution, **park** the tasknote per
  [`SPEC/blocked.md`](../blocked.md) and stop.
  Under **unattended mode** that stop runs the lone-park commit, and a
  destructive-action escalation (🗄️/▶️/📡/💻) or prerequisite ✋ `ACTION`
  parks the same way: `park-reason: destructive — …` /
  `prerequisite — …`; an *advisory* ✋ is
  recorded and the run continues. On doubt between the two, park.
  If a **direction-changing decision** surfaces — one whose effect reaches
  *beyond* this task (approach, contract, data model, sequencing) — read
  [`SPEC/tasknote-selection.md` §"Downstream-impact reconciliation"](../tasknote-selection.md)
  and run its scan before continuing; a decision whose effect stays inside
  this task skips it. Its confirm is an inline review prompt, **not** a
  banner, and it runs even under autonomous mode. Under **unattended mode**
  nobody can confirm, so the decision is a `Re-scope` and parks `drift`.
- **Phase 3: Testing & Linting** — [`SPEC.md` §"🧪 Phase 3"](../../SPEC.md).
  Run targeted tests + lint/type-check on changed code (full suite only for
  broad/cross-cutting changes). **Under unattended mode** first take the scope
  guardrails (cited below), then
  run the repo's full validation set instead — when the justfile defines any of `check` /
  `test` / `lint` / `typecheck`, `just check` if defined plus each other
  one it defines that `check` does not reach (`just --show check`), else
  `AGENTS.md`/`CLAUDE.md` commands, else CI steps — never the
  targeted default; a red the
  diff caused returns to Phase 2, and a red the run cannot make green parks
  `input-needed` rather than closing over it
  ([`SPEC/gate-postures.md` §"What `--unattended` never relaxes"](../gate-postures.md)).
  Record a **Verification receipt** in Testing Notes: each Acceptance verify
  command as `command → exit code` (+ the first failure line when non-zero),
  read from the runner's tail, with SPEC's structural half folded in. Then the
  **External review**: brief a read-only sub-agent with
  [`templates/subagent-probe-template.md`](../../templates/subagent-probe-template.md)
  §"Variant — review probe", scoped to the task's working-tree diff plus
  commits made by this run (exclude unrelated ahead-of-upstream history),
  and record each finding in Testing Notes with its
  disposition — a **blocker** returns to Phase 2 (Phase 3 re-runs), a **note**
  is fixed or filed; `N/A` only for a diff too small to grade — one that
  would have skipped the tasknote. Under
  unattended mode a blocker the run cannot fix parks `input-needed`.
  For frontend changes, ask the operator for visual confirmation with a
  `👁️ **CONFIRM**` ask in the emphasized inline shape, not a banner
  ([`SPEC/cue-vocabulary.md` §"Emphasized inline ask shape"](../cue-vocabulary.md)). Under autonomous mode,
  suppress the 👁️ ask but still run lint/type-check. **Under unattended mode**
  it parks `visual-confirm` unless a confirmed deciding spec decides it
  ([`SPEC/gate-postures.md` §"Scope guardrails"](../gate-postures.md)).
  **Under debug mode**, the fragment's repro
  re-verify runs **even under autonomous mode**; a still-failing repro returns
  to Phase 2, not closure.
- **Phase 4: Closure (auto-run)** — [`SPEC.md` §"🚀 Phase 4"](../../SPEC.md)
  and [§"Paper-complete guard"](../../SPEC.md) own every rule below. Start
  items 3–8 only when the deliverables can stage in the **same** atomic
  closure commit this turn — otherwise flip nothing. In order:
  1. Doc-drift sweep — per `.flaitron/tasknote/README.md` §"AI-referenced
     docs" entry, "no change" or the update (unattended: file
     out-of-scope drift, don't edit it; then retake the scope guardrails).
  2. Acceptance tick-through — tick or annotate every box. Never flip the nav
     chip; it is render-derived from YAML.
  3. YAML `status: completed` — a lifecycle write, which write-once does not
     reach — and the body's `**Archived:**` line set to today.
  4. Superseded-claim pointer, if this task falsified an archived claim, in
     the same commit ([`SPEC/superseded-claims.md`](../superseded-claims.md)).
  5. Flip **only this task's** PLAN.md line to
     `[x] **<TASK-ID>** [model] | shortname — Completed YYYY-MM-DD.`, every
     other bracket token and glyph copied verbatim. Standalone → top of
     `## Completed`; an epic child stays nested under its parent until the
     closure that leaves every child `[x]` moves the cohort
     ([`SPEC/epic.md` §"Child placement invariant"](../epic.md)).
  6. Recap (with the `touches:` reconciliation) and **Learnings**; persist
     handoffs in the note and file each deferred real-world step as an open
     PLAN row ([`SPEC.md` §"Deferred hand-off filing"](../../SPEC.md)).
  7. **Verify before moving**, mechanically: `grep -q '^status: completed$'`
     on the tasknote succeeds, no `## ✅ Acceptance` line is a bare `- [ ]`
     without an `N/A` or `not[ -]met` token, and `**Archived:**` carries a
     real date, not `YYYY-MM-DD`. A dirty result → fix and re-check; no mode
     relaxes this.
  8. Move the tasknote to `.flaitron/tasknote/archive/<area>/<TASK-ID>.md`.

  No banner here — the recap bundles into Step 6, and the next-task
  suggestion lands after the commit.

### 6 — Post-closure protocol

Read [`SPEC/post-closure.md`](../post-closure.md) now — a lazy module, read
here and nowhere earlier — and run its three steps, branching on
[`SPEC/gates.md` §"Conditional skip rule"](../gates.md) computed from the
**actual closure diff**, and staging under
[`SPEC.md` §"Paper-complete guard"](../../SPEC.md). Autonomous mode forces
the skip branch, naming the suppressed signals in the marker; a queued
in-📦 prompt still forces fire, and under unattended mode parks
`input-needed` instead
([`SPEC/gate-postures.md` §"Precedence ladder"](../gate-postures.md)).
