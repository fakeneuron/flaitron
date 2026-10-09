# Runner preamble — locate, pre-flight, model gate (executable steps)

> SKILL fragment — **shared, every-run** (not lazy). Loaded by `/ft-task` and `/ft-micro-task` at their Step 1 on every run. The file is owned by `claude/skills/ft-task/`; `/ft-micro-task` resolves it through its `<PREAMBLE>` path. Each runner calls the three sections below from its own steps — §"Locate and capture", then §"Pre-flight", then §"Model gate" — and adds its own deltas there. Pre-flight runs first so every model-gate write (a retag, a legacy tag, an `--unattended` model-mismatch park) lands only in a tree the foreign-dirt gate has passed — clean but for this ID's own tasknote, which §"Pre-flight" exempts. See SPEC.md for every contract cited here.
>
> **`<SKILL>` below stands for the invoking skill's own slash command, flags included** — `/ft-task` (with whatever of `--debug` / `--loop` / `--fast` / `--unattended` was passed) or `/ft-micro-task`. Never hard-code a bare `/ft-task`; a re-entry without its flags drops the run's shape.

## Locate and capture

Read PLAN.md. Find the line containing `**<TASK-ID>**`. If the ID isn't in PLAN.md, stop and ask the user whether to add it or use a different ID. Do not invent an entry.

**Status gate (non-negotiable).** If the located line is checked (`- [x]`) or lives under the `## Completed` heading, the task is already closed. **Stop. Do not scaffold.** Surface the conflict and ask whether the user meant a different task ID. Decide this by re-reading the exact PLAN.md line — never infer status from prior conversation context.

Otherwise, capture:

- The optional `[model]` segment (`[heavy]` / `[medium]` / `[light]` primary recommended, `[frontier]` / `[xheavy]` above them; specific names e.g. `opus` / `sonnet` / `grok` remain valid per SPEC §"Model field") — see §"Model gate"
- The optional `| shortname` segment
- The one-line long description (everything after ` — `; may be empty)
- The section heading the line lives under (`High` / `Medium` / `Low` / `Future Opportunities`) — this is the task's **Priority**
- The optional `[!critical]` segment — the urgency flag (orthogonal to priority; legacy `## Critical` sections soft-migrate to `High` with the flag implicit, per `SPEC/task-line-segments.md`).
- The optional `[unattended]` marker (after `[model]`). **When present and no `--fast` / `--unattended` flag was passed**, set `fast-mode = true` and emit `⚡ --fast implied by the [unattended] row marker — <suppressions>; the --unattended posture is not implied.`, where `<suppressions>` is the clause the invoking skill names. Then **Read `<root>SPEC/gate-postures.md` now** — Step 0's flag walk did not load it. The marker never sets `unattended-mode`; under an explicit `--unattended` it changes nothing. Contract: SPEC/gate-postures.md §"`--fast` operator override" → "Implied by the `[unattended]` row marker".

The full grammar is `- [ ] **TASK-ID** [!critical] [model] [unattended] [handoff] | shortname — long description`, every segment but the ID optional (SPEC §"Task-line format"). `[handoff]` changes nothing on an attended run — capture nothing from it.

**Emit the 🎯 purpose blurb now** — before the pre-flight checks, the model gate, and any scaffold write, each of which can end the run:

```text
🎯 <TASK-ID> — <shortname>
<1-2 sentences of plain-English purpose.>
```

Two lines: the ID and the `| shortname`, then 1-2 sentences of purpose drawn from the long description just captured — the only source read yet. It fires once, here, ahead of any scaffold / promote / resume branch. Emit it and keep going in the same turn. Bounds — not a cue, not a gate, suppressed by neither flag: `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb".

**Filing-discipline check (advisory).** Word-count the long description. Over the 70-word hard cap (SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds") → surface one line and proceed:

```text
⚠️ PLAN.md description is <N> words (>70w cap). Should this have been filed
   as a starter? Proceeding with the existing line.
```

**Completed-rotation check (advisory).** While PLAN.md is open, count the checked rows under `## Completed` (nested epic children included). Over **60** → surface one line and proceed:

```text
⚠️ PLAN.md `## Completed` holds <N> rows (>60). Consider rotating the
   oldest rows to `.flaitron/PLAN-ARCHIVE.md`. Proceeding.
```

Both checks are informational only — never block, never refile, never rotate. The bound, the row-count granularity, and the never-split-a-cohort rule are canonical in SPEC/plan-filing.md §"`## Completed` rotation".

## Pre-flight

- Resolve the **Area** by reading the `.flaitron/tasknote/README.md` §"Archive layout" table — every task, every prefix, canonical ones included. `<area>` is **never derived from the task ID**: lowercasing the prefix is the adopter's declaration-time default, not a resolution you may perform, and a project may deliberately declare a folder it would not produce (`OPS-*` → `archive/operations/`). See SPEC §"Task ID convention". If the table has no row for this prefix, stop and ask — do not guess a folder.
- **Epic-ID dispatch.** If the TASK-ID is `<AREA>-EPIC-<N>` (parent epic) or `<AREA>-<N>.<sub>` (epic subtask), Read `<root>SPEC/epic.md` for the lifecycle contract before continuing. Plain `<AREA>-<N>` IDs do not load it.
- **Foreign-dirt gate (paper-complete guard).** Before any scaffold / promote / resume write, run `git status --porcelain`. If non-empty: **STOP**, surface the dirt list, ask the operator to commit / stash / discard themselves, then re-invoke. Do not auto-clean. This ID's own `.flaitron/tasknote/<TASK-ID>.md`, when it exists (any status but a deletion or rename — untracked, staged, or modified), is not foreign dirt — the runner's existing-note check, run ahead of this gate, routes it — so leave it out of the list (an uncommitted `/ft-task --unattended` model-mismatch park stays resumable by `/ft-task`). See SPEC §"Paper-complete guard".
- If `.flaitron/tasknote/archive/<area>/<TASK-ID>.md` already exists: stop. The task is already closed and archived. Surface the conflict and ask whether the user meant a different task ID — do not scaffold a duplicate.
- **Open-siblings audit (`--unattended` only).** A `.N` TASK-ID runs `unattended-mode.md` §"Pre-scaffold stops" → "Open-siblings audit" after the archive-collision check below.

Under `unattended-mode = true` every stop in this section, and the status gate above, terminates and writes nothing (`unattended-mode.md` §"Pre-scaffold stops").

## Model gate

Gate on the captured `[model]` segment before any source reads beyond §"Pre-flight"'s (its `SPEC/epic.md` dispatch included) — heavy thinking shouldn't run on the wrong model. The active model is whatever the assistant is currently running as (ask the user if uncertain). Which tags match which active models — concrete by exact identity, category by tier, and `[xheavy]` always under-tier — is canonical in `<root>SPEC/model.md` §"Category-vs-concrete matching".

**Route on a verified tier, not an impression.** `Satisfied` is the only branch that proceeds *without* reading the module, so a wrong turn into it is the one verdict nothing downstream corrects. When the active model's tier is not certain against a category tag, read §"Category-vs-concrete matching" **before** choosing the branch, not after — a capable model one rung below its tag still routes to **Category under-tier**.

Branch on the verdict. The edge fragment is `step-1.5-model-edge.md`, beside this file (`<root>claude/skills/ft-task/`); substitute `<SKILL>` for its `<SKILL>` placeholder.

- **Satisfied** → proceed silently to the invoking skill's next step.
- **Category under-tier** → Read `<root>SPEC/model.md` + the edge fragment in parallel, then follow its "Category under-tier" branch (⚠️ inline note, then proceed — not a STOP, not an auto-retag).
- **Concrete mismatch** → STOP. Read the same two in parallel, then follow the "Mismatch" branch.
- **Absent (legacy line)** → Read the same two in parallel, then follow the "Legacy entry" branch.
