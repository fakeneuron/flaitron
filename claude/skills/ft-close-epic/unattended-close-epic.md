# `--unattended` on `/ft-close-epic` — skill-specific deltas (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `ft-close-epic` SKILL.md Step 0 when `unattended-mode = true`, alongside the **shared** `<UNATTENDED>` fragment (`claude/skills/ft-task/unattended-mode.md`), `<SPEC_DIR>/gate-postures.md`, and `<SPEC_DIR>/blocked.md`. Carries every `--unattended`-only clause this skill sites at a step; the shared fragment carries the posture itself (park recipe, conversion map, pre-scaffold stop shape, never-relaxed list) and its own §"`/ft-close-epic`" summary of what this skill shares and differs on. Read that one for the posture, this one for where each rule lands in the run.
>
> The `<UNATTENDED>` and `<SPEC_DIR>` path bindings referenced below are resolved in `ft-close-epic` SKILL.md Step 0.
>
> **The contract lives in [`SPEC/gate-postures.md`](../../../SPEC/gate-postures.md) §"`--unattended` operator posture" → "`/ft-close-epic` under the posture"** — this fragment is its executable interpretation for this skill, not a second copy.

## Step 0 — Activation marker and what differs

On activation, emit:

`⚡ --unattended active — no operator present: the audit closes and commits autonomously, and the parent-flip is deferred rather than answered. Gates that cannot be answered park or terminate.`

The posture's contract is [`SPEC/gate-postures.md`](../../../SPEC/gate-postures.md) §"`--unattended` operator posture" → "`/ft-close-epic` under the posture". Two things differ from the three runners, and both matter below: the flag is **not** a `--fast` superset here (the epic skills never accepted `--fast`), and the Step 8/9 parent-flip is **unbundled and deferred**, not parked. Everything §"What `--unattended` never relaxes" lists holds in full — the audit commit is a real commit.

## Steps 1-2 — Pre-scaffold stops

The **foreign-dirt gate is not relaxed** — it terminates and writes nothing, in the machine-readable stop shape below. Never stash, clean, or commit foreign dirt.

**Pre-scaffold stops under `--unattended`.** Every bail in Steps 1-2 fires *before* the audit tasknote exists, so there is nothing to park — and scaffolding one to hold a stop would either duplicate an existing note or become its own foreign dirt on the next invocation (`<UNATTENDED>` §"Pre-scaffold stops"). Each terminates and **writes nothing**, in one shape (the skill/pin guard's `skill-pin-mismatch`, emitted by the guard paragraph itself, is the exception noted below):

```markdown
⏸ --unattended stop — <cause>: <one line>. No tasknote written.
```

`<cause>` is one of `foreign-dirt` · `in-flight` (any live audit note, whatever its status) · `archived` · `no-parent` · `parent-closed` · `audit-position` · `open-siblings`, plus `skill-pin-mismatch` (the skill/pin guard, which may also fire after a write; it names what was written instead of `No tasknote written.`, per `<UNATTENDED>` §"Pre-scaffold stops"). List the specifics (dirty paths, the correct audit ID, the open child IDs) so the caller can act without a transcript. Never stash, clean, or commit foreign dirt.

**Open-siblings ask (Step 2).** Take the default-No bail deterministically — do not ask. An early audit over a partial cohort is a scope judgment, and the ask's own default is already "bail". Stop with `⏸ --unattended stop — open-siblings: …`, naming the open child IDs.

## Step 4 — Phase 1 Discovery

**Clarifying questions.** Skip the AskUserQuestion call and write `No clarifications needed (--unattended)` with the explicit assumptions — unless the ambiguity genuinely blocks the audit, which is the exit-gate park below.

**Clarifications-surfaced branch of the Phase 1→2 exit gate.** The branch has no operator to fire at: **park** instead of banner, per the four-write recipe in `<UNATTENDED>` §"The park recipe" — `status: blocked`, chip → `⏸ Blocked`, `park-reason: input-needed — <the clarification>`, then stop. The audit tasknote exists by now (Step 3 scaffolded it), so the standard recipe applies unchanged; a `Re-scope` / `De-scope` verdict parks as `drift` instead. Do not run Phases 2-4, and do not touch PLAN.md.

## Step 7 — Phase 4 closure

**Under `--unattended` this step is unchanged.** The audit's own closure has nothing an operator must answer, so it runs exactly as written — including the `.N` PLAN stub flip and the archive move. Only the *parent* line is off-limits (Step 8).

## Step 8 — Parent-flip deferral

**When `unattended-mode = true`, the prompt never fires.** Compute eligibility exactly as Step 8 specifies — the state is what the caller needs — then **defer**: the parent line stays `- [ ]`, the cohort stays nested, and no Completed move happens. This is the one place the posture defers rather than parks, because by Step 9 the audit note is `completed` and archived and a parked note is *paused, not closed* ([`SPEC/blocked.md`](../../../SPEC/blocked.md) §"Parked state"). Nothing is lost: a parent `- [ ]` above a cohort of `- [x]` children states the pending flip structurally, and PLAN.md is a file the caller already reads. Record the deferral in the audit tasknote's Final Summary before the archive move, so the closed note carries it too:

> **Parent-flip deferred (`--unattended`).** All `<AREA>-EPIC-<NUMBER>` children closed; the flip and the cohort move to `## Completed` need an operator. Cohort left nested under `## <Priority>`.

## Step 9 — Post-closure protocol

**When `unattended-mode = true`, the override does not apply** — the prompt was never queued (Step 8). The 📦 gate evaluates against the audit closure diff **alone**, which for a typical audit is signals-clear → Skip branch → autonomous commit. Unbundling preserves the override's intent (the question stays unanswered by an autonomous run) while letting the audit close, which is the whole point of the posture reaching this skill; see SPEC/gate-postures.md §"`/ft-close-epic` under the posture". Stage the audit deliverables + the `.N` PLAN stub flip + the archive move — **never** the parent flip or the cohort move. Then, after the 🏁 marker and its real deliverable-covering SHA, emit the deferral on its own line:

```markdown
⏸ --unattended stop — parent-flip: <AREA>-EPIC-<NUMBER> eligible; all <M> children [x]. Cohort left nested under `## <Priority>`. Flip manually or re-run attended.
```

The suggest-next-move and copy-paste line emit as usual — the Skip branch is otherwise unchanged, and a caller that has no use for them ignores them; suppressing them would be a special case with nothing behind it.

**A destructive action never reaches Step 9.** If an audit's inline fix would touch a privileged-ops path (🗄️/▶️/📡/💻), that escalation surfaces during Step 5 Phase 2, and under `--unattended` it parks there — `park-reason: destructive — …`, per `<UNATTENDED>` §"Conversion map" — before Step 7 flips anything or the note is archived. Do not carry such a fix into closure and rely on the 📦 gate to catch it: the gate is force-skipped here, and the park is the stop.
