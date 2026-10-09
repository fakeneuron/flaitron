---
name: ft-task
description: Start a flaitron tasknote for a normal-sized, multi-step, or design-tradeoff-bearing task and drive it through the SPEC's 4-phase workflow. With `--debug` (`-d`), runs hypothesis-first for bugs. With `--loop`, iterates Phase 2/3 until a machine-checkable check passes. With `--fast` (`-f`), suppresses conditional gates. With `--unattended`, runs operator-less, parking at gates instead of asking.
argument-hint: <TASK-ID> [--debug | -d] [--loop] [--fast | -f] [--unattended]
---

# task — flaitron tasknote runner

You are starting a tasknote for the task ID provided in `args` (e.g., `CORE-004`). The full workflow contract lives in flaitron's `SPEC.md` — this skill is the executable interpretation, not a replacement. Treat SPEC.md as authoritative when this file is silent or in tension.

If `args` is missing or its first token doesn't match `<AREA>-<NUMBER>` (or `<AREA>-<NUMBER>.<SUB>` for epic subtasks), stop and ask the user for a valid task ID. Do not guess. Trailing `--fast` / `-f`, `--debug` / `-d`, `--loop`, and `--unattended` flags are the only other accepted tokens — see Step 0.

## Step 0 — Resolve paths

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

Paths this skill uses:
- SPEC: `<root>SPEC.md` (always loaded core)
- SPEC_DIR (lazy modules `epic.md` · `starter.md` · `blocked.md` · `model.md` · `loop.md` · `versioning.md` · `gate-postures.md` · `post-closure.md`): `<root>SPEC/`
- SKILL_DIR (`preamble.md` — **every-run**, shared with `/ft-micro-task`; lazy fragments `step-0-flags.md` · `step-1.5-model-edge.md` and `unattended-mode.md` — both shared, also loaded by `/ft-micro-task` — · `step-3a-promote-starter.md` · `step-3c-resume-blocked.md` · `step-4-debug-mode.md` · `step-5-loop-mode.md`): `<root>claude/skills/ft-task/`
- Template: `<root>templates/tasknote-template.md`
- PLAN: `.flaitron/PLAN.md`, tasknote dir: `.flaitron/tasknote/` (always)

Subsequent steps name what to Read; the SPEC contract + matching SKILL fragment typically load in parallel.

**Parse `args`.** Split on whitespace into `(TASK-ID, rest...)`. Initialize `fast-mode = false`, `debug-mode = false`, `loop-mode = false`, and `unattended-mode = false`. If `rest` is empty, continue to Step 1 — the default flow, which reads nothing further here. Otherwise **Read `<SKILL_DIR>/step-0-flags.md` now** and follow it: it walks `rest` as an unordered flag set, stops on any unrecognized token, emits one inline marker per active flag, defines the four modes, and dispatches the per-mode fragments (`step-4-debug-mode.md`; `step-5-loop-mode.md` + `<SPEC_DIR>/loop.md`; `unattended-mode.md` + `<SPEC_DIR>/blocked.md`); then continue to Step 1.

**When `unattended-mode = true`, the steps below do not restate the posture.** Every gate that would ask an operator — the Step 1.5 concrete-model STOP, the Step 4 drift carve-out, a destructive-action escalation or prerequisite ✋ `ACTION` in Phase 2, the Phase 3 👁️ ask, a queued in-📦 prompt at Step 6 — parks the tasknote instead (the concrete-model STOP on an existing starter/blocked note or sidequest stub terminates and writes nothing), with the `park-reason:` code keyed to this skill's step in `<SKILL_DIR>/unattended-mode.md` §"Conversion map"; the Step 1 pre-flight checks, the in-flight refusal included, terminate and write nothing (§"Pre-scaffold stops"). The posture sets `fast-mode = true` but does **not** inherit `--fast`'s two delegations — the 👁️ suppression and the Re-scope downgrade both park — and it relaxes neither the paper-complete guard nor the downstream-impact confirm (§"What `--unattended` never relaxes").

## Step 1 — Locate the task in PLAN.md and pre-flight

**Read `<SKILL_DIR>/preamble.md` now** — shared with `/ft-micro-task`, read every run — and run its §"Locate and capture": the PLAN.md lookup, the status gate, the segment capture, the `[unattended]` row marker, the 🎯 purpose blurb, and the filing-discipline check. Here the row marker's `<suppressions>` clause is `same suppressions as --fast`, and the blurb fires ahead of the 3a / 3b / 3c branch.

Then run its §"Pre-flight" (Area, epic-ID dispatch, foreign-dirt gate, archive collision, `--unattended` open-siblings audit), with this check ahead of its foreign-dirt bullet — run here, before the model gate, so a retag or an `--unattended` park never lands on a note this run then refuses, and before the dirt gate, so an uncommitted note is routed rather than stopped as dirt:

- If `.flaitron/tasknote/<TASK-ID>.md` exists with any `status:` other than `starter` / `blocked` (`not-started` / `in-progress` / `completed`, or unrecognized), the file is in flight or already closed. Stop. Tell the user the tasknote exists and recommend they continue conversationally (e.g., "continue CORE-004") rather than restarting. This skill is start-only by design. **When the session that started it is gone** — killed, out of context, an orchestrator's child that exited — "continue conversationally" is unreachable; name the park-then-resume path in `<SPEC_DIR>/blocked.md` §"Resuming an interrupted run" instead of stopping at the recommendation. That path applies to `in-progress` only. A `starter` or `blocked` note passes on through the rest of Pre-flight to the Step 1.5 model gate.

## Step 1.5 — Model gate (BEFORE scaffolding)

Run the preamble's §"Model gate". **Satisfied** proceeds to Step 2.

## Step 2 — File-state branch

- Check `.flaitron/tasknote/<TASK-ID>.md`. **Three-way branch on the file's YAML `status:`** (an in-flight or closed note was already refused in Step 1):
  - **`status: starter`** — starter tasknote awaiting promotion. Continue at **Step 3a (Promote a starter)**.
  - **`status: blocked`** — parked tasknote awaiting resume. Continue at **Step 3c (Resume a blocked tasknote)**.
  - **File absent** — fresh scaffold path. Continue at **Step 3b (Scaffold a fresh tasknote)**.

## Step 3a — Promote a starter (existing file with `status: starter`)

Read `<SPEC_DIR>/starter.md` (lifecycle contract) and `<SKILL_DIR>/step-3a-promote-starter.md` (executable steps), then continue at **Step 4 (Phase 1: Discovery)**.

## Step 3b — Scaffold a fresh tasknote (no existing file)

**Sidequest-stub retirement.** If `.flaitron/sidequest/<TASK-ID>.md` exists, this scaffold is a sidequest promotion — read it now; once the scaffold below is written, carry every section below its nav line (`## Idea`, `## Resume anchor`, and any added by hand), verbatim, into the new note's **Discovery Notes** as a quoted block headed `Carried from the retired sidequest stub:`, section headings turned into bold labels, and only after that write delete the stub (`rm .flaitron/sidequest/<TASK-ID>.md`). Contract: `claude/skills/ft-file-followup/park-mode.md` §Notes → "Promotion" ("Delete `.flaitron/sidequest/<ID>.md` after promotion"); this executes it at the point a promoting run actually writes, instead of relying on the promoter to remember a rule stated only in that fragment and `docs/GLOSSARY.md`.

Copy the template (path resolved in Step 0) to `.flaitron/tasknote/<TASK-ID>.md`. The frontmatter schema and body layout are canonical in SPEC §"Tasknote frontmatter" and §"Tasknote body shape" — fill them as specified there. The template ships the canonical phase checklists; leave them exactly as they ship.

**Skill-specific values at scaffold time:**

- `title:` — prefer the PLAN.md `| shortname` (Step 1) when present; otherwise derive from the long description.
- `status:` — `in-progress`.
- `created:` — today's date.
- `related-tasks:` — from PLAN.md if the line cites parent epics, predecessors, or follow-ups; otherwise `[]`.
- **Epic implementation-child YAML echo.** If the TASK-ID is `<AREA>-<N>.<sub>` and is *not* `.1` / `.N`, look at the sibling Discovery `.1` (active or archived) for a `## 🌳 Fan-out` section. Copy any Parallel / Sequential claim that names this child into omit-when-absent `blocked-by:` / `parallel-safe-with:` on *this* note (bare IDs; Sequential "after X" → `blocked-by: [X]`; Parallel peers → `parallel-safe-with`). Omit the keys when Fan-out does not name this child. A worktree copies only the child note, so the `.1` heading alone is not visible there. Contract: [`SPEC/epic.md`](../../../SPEC/epic.md) §"Fan-out". Do not invent a parser or a lock.

🎯 Goal is derived from the PLAN.md line at scaffold; ask the user if it's too terse for a clear one-sentence goal. ✅ Acceptance and 🧩 Subtasks are empty checklists at scaffold, populated during Phase 1 Discovery.

**When `loop-mode = true`**, apply the scaffold addendum in `<SKILL_DIR>/step-5-loop-mode.md` §"Step 3b" — the three additive `loop:` / `loop-max:` / `loop-last-run:` keys and the `## 🔁 Iterations` section.

Then continue at **Step 4 (Phase 1: Discovery)**.

## Step 3c — Resume a blocked tasknote (existing file with `status: blocked`)

Read `<SPEC_DIR>/blocked.md` (lifecycle contract) and `<SKILL_DIR>/step-3c-resume-blocked.md` (executable steps), then continue at **Step 5** at Phase 2 (the lazy fragment's step 5 directs there; Phase 1 is already complete on a parked tasknote) — except a `model-mismatch` park, written as a bare scaffold before Phase 1 ran, which continues at **Step 4** (Phase 1).

Once the fragment has read the parked note, **name the `park-reason:` being cleared** in one plain prose line before the run continues. On the Phase 2 route the operator lands with no Discovery to orient them, and the Step 1 blurb could not have known why the note was parked. Ordinary prose, not a second 🎯 emission.

## Step 4 — Phase 1: Discovery (drive now)

Work through the Phase 1 checklist per SPEC §"📝 Phase 1: Discovery". Re-scope and De-scope behavior is canonical there; the Re-scope-to-blocked path defers to `<SPEC_DIR>/blocked.md` (Read it if Discovery surfaces a real-but-blocked prerequisite).

**When `debug-mode = true`** (from Step 0): run the four hypothesis-first prompts from `<SKILL_DIR>/step-4-debug-mode.md` §"Phase 1" after the Relevance Assessment, recording answers in Discovery Notes. They sit *inside* this checklist — they add no box and no gate, and the exit-gate judgment below is unchanged.

Skill-specific imperatives on top of the SPEC contract:

- Tick boxes in the tasknote as you complete them.
- The first checklist item (Reviewed PLAN.md) is already done in Step 1 of this skill.
- For the Archive skim step: `ls .flaitron/tasknote/archive/<area>/` to enumerate, then for each source path in scope run `grep -l <path> .flaitron/tasknote/archive/<area>/*.md` (if YAML `touches:` is set, prefer those paths). Read the hits and log anything load-bearing in Discovery Notes (file moves, regressions, design decisions, hardlink notes, etc.). Also open IDs named by `## 🔗 Related`, YAML `supersedes:`, and any ⚠️ `Superseded by` pointer on those hits — still grep + read; no query engine. If `archive/<area>/` is empty or absent, **re-check `<area>` against the README table before believing it** — a derived-and-wrong folder is indistinguishable from a genuinely empty one, and mistaking the two silently voids this step against a full archive. Once the folder is confirmed, log "no prior tasknotes" and tick the box.
- For the Clarifying questions step: use AskUserQuestion for anything genuinely ambiguous. If nothing is ambiguous, write `No clarifications needed` in the tasknote with the explicit assumptions.
  **When `fast-mode = true`** (from Step 0): skip the AskUserQuestion call and write `No clarifications needed (--fast)` with the explicit assumptions the operator is asserting.
- For the `## ✅ Acceptance` population: name on each criterion the **verify command** that decides it — a test run, a lint/type-check, a `grep -q` on a contract file. A criterion no command decides marks itself `judgment` (or `👁️`) with a one-line reason; do not invent one. Phase 3 runs these and records the receipt. Contract: SPEC §"🧪 Phase 3: Testing & Linting". **When `loop-mode = true`**, the strict form in `<SKILL_DIR>/step-5-loop-mode.md` §"Step 4" applies instead — every criterion loop-verifiable, taste criteria split to a one-time post-loop 👁️ subsection, and a stop (drop `--loop`) when none is machine-checkable.
- For the "populate Subtasks" step: fill the tasknote's `## 🧩 Subtasks` checklist with concrete, ordered steps, and declare YAML `touches:` with the paths this task expects to edit. Contract — including which tasks are exempt and why it is never a gate: SPEC §"Tasknote frontmatter".
- Do not enter Phase 2 until every Phase 1 box is ticked. Once ticked, apply the SPEC/gates.md §"Phase 1→2 exit gate"'s **`default-skip` flavor** — the flavor `/ft-task` uses. That section's judgment rule is authoritative for which deviations skip and which fire; this skill only routes the two outcomes:
  - **Skip branch (default)** — emit the inline marker `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` and start Step 5 Phase 2 immediately. Plain prose, not a banner; not a new gate.
  - **Fire branch** — surface the **🛠️ Phase 1→2 operator-gate cue** with the mandatory 1-2 sentence plain-English preview line (per SPEC/gates.md §"Operator-gate cues") and wait for the user's go (conversational assent — SPEC/cue-vocabulary.md §"Accepted gate replies") before starting Step 5 Phase 2.

  - **Re-scope under `fast-mode = true`** (not under `--unattended` — Step 0) — not a fire. Make the verdict's PLAN.md line + tasknote-header rewrite exactly as attended, emit `⚠️ Re-scope (--fast) — <what changed in the plan>; proceeding.` on its own line, then take the Skip branch's marker. **On a blocked prerequisite**, park `drift` instead (`<SPEC_DIR>/blocked.md` §"Under `--fast`, park and say so"): the notice names the park in place of `proceeding`, and the run halts — the operator overrules inline. De-scope still fires.

  Record the judgment inline at the exit ("Discovery surfaced no significant deviation → skip 🛠️." or "Discovery surfaced <one-line reason> → fire 🛠️." or "Discovery landed Re-scope → ⚠️ notice (--fast).") so the operator can spot misjudgments in the transcript.

**`--fast` interaction.** On a `Proceed` verdict with `fast-mode = true`, the clarifying-questions step writes `No clarifications needed (--fast)` and the Skip branch fires; the drift carve-out above is canonical in SPEC/gate-postures.md §"`--fast` operator override" → "Each delegation is bounded".

## Step 5 — Phases 2-4 (drive conversationally)

After the Phase 1→2 cue clears, Phase 2 → Phase 3 → Phase 4 closure ops
flow continuously without an intermediate gate. The next operator-gate
cue is the 📦 ready-to-commit banner in Step 6.

**When `loop-mode = true`**, Phase 2 and Phase 3 below are replaced by the inline execute→verify loop in `<SKILL_DIR>/step-5-loop-mode.md` §"Step 5" (per-cycle relevance gate, commit-per-verified-iteration, `loop-max` soft stop, destructive-step park), followed by its §"Step 6" one-time 👁️ ask **and one-time External review**; then Phase 4 closure and Step 6 below run unchanged, on the Skip branch since the loop ran under `--fast` semantics.

- **Phase 2: Execution** — pattern survey first (look at sibling modules / parallel components for an existing shape to extend; justify a new shape if none fits). Implement minimally; refactor only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation, recording the reason and deferring unrelated cleanup. Then run targeted tests on changed files. Tick boxes as you go. **If a hard dependency surfaces mid-execution**, Read `<SPEC_DIR>/blocked.md` and park the tasknote per its contract — flip `status: blocked`, update the nav header to `⏸ Blocked`, write `park-reason: dependency — <the dependency>` (mandatory under `--unattended`, recommended otherwise), and stop. The next `/ft-task <ID>` invocation enters the resume path (Step 3c) automatically. **If a direction-changing decision surfaces mid-execution** — one whose effect reaches *beyond* the current task (approach, contract, data model, sequencing) — run the **downstream-impact reconciliation scan** before continuing; a decision whose effect stays inside the task skips it. SPEC/tasknote-selection.md §"Downstream-impact reconciliation" is authoritative for triggers, steps, impact classes, and reconcile actions. Its user-confirm is an inline review prompt, **not** a banner, and it fires regardless of `fast-mode` — it guards plan correctness, and the user owns the confirm.
- **Phase 3: Testing & Linting** — targeted tests, lint/type-check, and the **Verification receipt** box for changed code (each Acceptance verify command recorded in Testing Notes as `command → exit code` with the first failure line when non-zero — the receipt, not the transcript: read the runner's tail, not its full scrollback — alongside the canonical structural quality assertions folded into the same box); visual confirmation for frontend changes (emphasized `👁️ **CONFIRM**` ask — its own line, blank-line isolated, bold label — per SPEC §"🧪 Phase 3: Testing & Linting"; emphasis raised *within* the inline shape, still not a banner block). Run the full suite only for broad/cross-cutting changes. Then run the **External review** box: invoke `/code-review medium` **scoped to this task's own diff** — the working tree plus any commits this run itself made, never an upstream-relative default range, which on a branch ahead of its remote sweeps in earlier tasks' commits and returns blockers this task cannot own. Grade its findings against `## ✅ Acceptance` on SPEC's two rungs, and record each in Testing Notes with its disposition — a **blocker** returns you to Phase 2 and Phase 3 re-runs from the top; a **note** is fixed or filed (`/ft-file-followup --park`) and never reopens a phase. `N/A` with a one-line reason when the diff is too small to grade. Suppressed by neither flag: under `--loop` it runs once post-convergence beside the one-time taste checks, never per cycle; under `--unattended` a blocker the run cannot fix parks `park-reason: input-needed — <the blocker>` rather than closing over it. The reviewer never patches — the fix is always yours. Flows directly into Phase 4 closure ops; no gate between them. **When `fast-mode = true`** (from Step 0; not under `--unattended` — Step 0), suppress the 👁️ CONFIRM prose ask — lint/type-check on changed code still runs, but the operator owns the visual-confirmation responsibility. **When `debug-mode = true`**, apply the Phase 2 emphasis and run the Phase 3 repro re-verify from `<SKILL_DIR>/step-4-debug-mode.md` — re-execute the exact minimal repro from Phase 1 and record the outcome in Testing Notes. The re-verify runs **even under `--fast`**; a still-failing repro sends you back to Phase 2 with updated hypotheses, not to closure.
- **Phase 4: Closure (auto-run)** — run the closure ops per SPEC §"🚀 Phase 4: Closure", which is authoritative for all of them: the doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", the `## ✅ Acceptance` tick-through, the YAML `status:` flip *before* the archive move, the body's `**Archived:** YYYY-MM-DD` line set to today's date, the PLAN.md stub-form flip and its standalone-vs-epic-child placement, the archive move, the conditional superseded-claim pointer, and the evidence-based recap — whose `touches:` scope reconciliation (`git diff --name-only` vs declared) is a recorded fact that never re-opens a phase, per SPEC §"🚀 Phase 4: Closure". Skill-specific on top of it: flip **only this task's** PLAN.md line — ban collateral Completed flips — and per SPEC §"Paper-complete guard" do not flip or move anything unless the deliverable paths can stage in the same atomic closure commit this turn. **Executable pre-move gate** — immediately before the archive `mv`, verify mechanically rather than by recollection: `grep -q '^status: completed$' .flaitron/tasknote/<TASK-ID>.md` succeeds, `awk '/^## ✅ Acceptance/{a=1;next} a&&/^## /{a=0} a' .flaitron/tasknote/<TASK-ID>.md | grep -E '^ *- \[ \]' | grep -viE 'N/A|not[ -]met'` prints nothing, and `grep -qE '^\*\*Archived:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}$' .flaitron/tasknote/<TASK-ID>.md` succeeds (rejects the unfilled `YYYY-MM-DD` placeholder) — the first two are the idiom `/ft-release` §7.1 Pair P runs post-hoc across the whole archive, extended here with the stamp check, run once on the single note before it joins that archive. A failing status or stamp check, or any printed line from the Acceptance scan, means a closure write is still outstanding — fix it and re-run; never move on a dirty result. Applies identically under `--fast`/`--unattended`; neither suppresses it. **Do not surface a banner here** — the recap bundles into Step 6's 📦 gate, and stays recap-only: the next-task suggestion lands after the commit, in Step 6.

## Step 6 — Post-closure protocol

**Read `<SPEC_DIR>/post-closure.md` now** — the protocol is a lazy module, loaded here and nowhere earlier — then run its three-step protocol (commit / suggest next move / copy-paste line) under SPEC §"Paper-complete guard", branching on SPEC/gates.md §"Conditional skip rule" against the closure diff. Stage **deliverable paths + PLAN + archive** together; refuse a Completed-only commit when Acceptance requires non-workflow deliverables.

- **Skip branch** (signals clear, no bundled in-📦 prompt) — run that section's **autonomous-commit motion** end to end, naming the cleared signal in its marker as diff facts (e.g., `4 markdown files; no privileged-ops surface`). Before 🏁, verify `git show --name-only` covers the deliverables; never invent a SHA.
- **Fire branch** (privileged-ops signal hits OR bundled in-📦 prompt queued) — run its **bundled-approval motion**: surface the 📦 gate and wait for commit-go (SPEC/cue-vocabulary.md §"Accepted gate replies"). The 🏁 marker — carrying a 1-2 sentence accomplishment summary — plus next-move and copy-paste land only in the later post-commit response.

**`--fast` override.** Canonical in SPEC/gates.md §"Conditional skip rule" → Flag overrides and SPEC/gate-postures.md §"`--fast` operator override": `--fast` forces Skip regardless of signal trips (naming the suppressed signals in the marker). Two things it does not reach: the Step 4 drift carve-out upstream, and the paper-complete guard here — 🏁 still requires a real deliverable-covering SHA.

Skill-specific:
- Suggest-next-move: run `SPEC/post-closure.md` step 2 as written — the **fresh PLAN.md re-read** (never the Step 1 cached parse), the unchecked-and-open-section verification that drops failing candidates, the **PLAN exhausted (terminal)** form when none survives, the emoji-primary-label + `model @ effort` pick print, and the 🔍 prefix on `/ft-audit*` candidates. On the terminal form, skip the copy-paste line below: there is nothing to run after a clear.
- Copy-paste helper: run `SPEC/post-closure.md` step 3 as written — the glyph and pick copied from the chosen candidate line, the own-line inline-code invocation with no trailing punctuation, and the 👇 `Run in this session:` exception for context-dependent skills. Here `<args>` is the next task ID and the invocation line is `` `/ft-task <next-ID>` ``.

## Notes

- **Sub-tasks of an epic** (`<AREA>-<NUMBER>.<SUB>`) follow the same flow. The parent epic line in PLAN.md is not flipped to complete until all children are. For code-sweep / multi-child feature epics, the first subtask (`.1`) is typically a **Discovery** task — its deliverable is the filed child task list in PLAN.md, not code — and the final subtask is an **Audit** task that verifies the completed epic sits well in the codebase. Full lifecycle in `<SPEC_DIR>/epic.md` (loaded at Step 1 for epic IDs).
- **Skip-the-tasknote cases** (single-line typo, formatting tweak, ~10-line doc patch, trivial config edit) — see SPEC/tasknote-selection.md §"When to use a tasknote (and when not to)". For these, decline to scaffold and tell the user to make the edit directly.
