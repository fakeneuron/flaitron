# `--unattended` on `/ft-close-epic` — skill-specific deltas (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `ft-close-epic` SKILL.md Step 0 when `unattended-mode = true`, alongside the **shared** `<UNATTENDED>` fragment (`claude/skills/ft-task/unattended-mode.md`), `<SPEC_DIR>/gate-postures.md`, and `<SPEC_DIR>/blocked.md`. Carries every `--unattended`-only clause this skill sites at a step; the shared fragment carries the posture itself (park recipe, conversion map, pre-scaffold stop shape, never-relaxed list) and its own §"`/ft-close-epic`" summary of what this skill shares and differs on. Read that one for the posture, this one for where each rule lands in the run.
>
> The `<UNATTENDED>` and `<SPEC_DIR>` path bindings referenced below are resolved in `ft-close-epic` SKILL.md Step 0.
>
> **The contract lives in [`SPEC/gate-postures.md`](../../../SPEC/gate-postures.md) §"`--unattended` operator posture" → "`/ft-close-epic` under the posture"** — this fragment is its executable interpretation for this skill, not a second copy.

## Step 0 — Activation marker and what differs

On activation, emit:

`⚡ --unattended active — no operator present: the audit closes and commits autonomously, parent flip included. Gates that cannot be answered park or terminate.`

The posture's contract is [`SPEC/gate-postures.md`](../../../SPEC/gate-postures.md) §"`--unattended` operator posture" → "`/ft-close-epic` under the posture". One thing differs from the runners: the flag is **not** a `--fast` superset here (the epic skills never accepted `--fast`). The parent flip is not a question, so it runs as attended (`SPEC/plan-filing.md` §"Epic parent flip"). Everything §"What `--unattended` never relaxes" lists holds in full — the audit commit is a real commit.

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

## Step 9 — Post-closure protocol

The 📦 gate is force-skipped, with no operator to wait on: autonomous commit, parent flip included when every child is `[x]`.

**A destructive action never reaches Step 9.** If an audit's inline fix would touch a privileged-ops path (🗄️/▶️/📡/💻), that escalation surfaces during Step 5 Phase 2, and under `--unattended` it parks there — `park-reason: destructive — …`, per `<UNATTENDED>` §"Conversion map" — before Step 7 flips anything or the note is archived. Do not carry such a fix into closure and rely on the 📦 gate to catch it: the gate is force-skipped here, and the park is the stop.
