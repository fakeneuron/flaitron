# Step 1.5 — Model-gate edge cases (executable steps)

> Lazy-loaded SKILL fragment — **shared**. Loaded by `/ft-task` and `/ft-micro-task` at their Step 1.5 when the concrete-mismatch, category under-tier, or legacy-entry branch fires. The file is owned by `claude/skills/ft-task/`; both reach it through the shared `preamble.md` §"Model gate" beside it. See that section for the always-loaded core dispatch and the satisfied-match path, and `SPEC/model.md` §"Category-vs-concrete matching" for the tier ladder + rule.
>
> **`<SKILL>` below stands for the invoking skill's own slash command, flags included** — `/ft-task` (with whatever of `--debug` / `--loop` / `--fast` / `--unattended` was passed) or `/ft-micro-task`. Substitute it wherever it appears when surfacing a branch to the operator; never hard-code a bare `/ft-task`. Sending the operator back through the wrong invocation drops its shape — a `--loop` re-entry without the flag loses the `loop:` / `loop-max:` frontmatter and the `## 🔁 Iterations` log.

## Mismatch — PLAN.md concrete `[model]` differs from the active model

Fires only when the tag is a **concrete** model name (`opus`/`sonnet`/`grok`/…) and the active model is a *different* concrete model. A **category** tag (`[xheavy]`/`[frontier]`/`[heavy]`/`[medium]`/`[light]`) never reaches this branch — it either proceeds (tier met or exceeded) or routes to "Category under-tier" below.

STOP. Surface the mismatch and offer two paths via AskUserQuestion:

1. "Switch active model: I'll stop. ▶️ RUN: `/model <PLAN-model>` then re-invoke `<SKILL> <TASK-ID>`." (recommended — preserves the filed assignment)
2. "Retag the PLAN.md line to `<active-model>` and proceed." If chosen, edit the PLAN.md line's `[model]` segment in place, then proceed to Step 2.

Do not silently override.

## Category under-tier — PLAN.md tag outranks the active model's tier

The active model's tier is *below* the category tag (e.g. a `[heavy]` task with the active model reading as medium-tier like grok, or light-tier like haiku; a `[frontier]` task on opus; or a `[medium]` task on a light-tier model). This is a soft advisory, **not** a STOP. Emit a one-line ⚠️ inline note, then proceed to Step 2:

> ⚠️ Active model reads below the tagged tier (this task is tagged `[frontier]`). Consider switching to Fable @ xhigh (change model and/or effort, then re-invoke), or retag the PLAN.md line if the lighter model is the deliberate choice. Proceeding as-is.

The switch target is the active platform's pick for the tagged tier — Read `docs/PLATFORMS.md` §"Tier × platform map" and print it per `SPEC/model.md` §"Effort recommendations" → "Printing a cell"; when the pick is the active model at a higher effort, the fix is the effort setting, not `/model`. A ⚠️ pick (Grok's `[frontier]`) adds the platform switch the map's note names — e.g. `⚠️ Grok @ xhigh — no frontier model here; switch to Claude Code (Fable @ xhigh) or Codex (Astra @ xhigh)`. Where that rule prints no pick, the note says `a higher-tier model (/model <higher-tier> then re-invoke)` instead. The gate itself stays tier-only.

Do not block and do not auto-retag — the category tag stays as filed. The operator stays in control; the note exists so an under-powered run on deep-reasoning work is visible rather than silently accepted. The reverse case (a heavier model on a `[light]` task) proceeds silently — overkill is harmless. Tier calibration is in `SPEC/model.md` §"Category-vs-concrete matching".

An **`[xheavy]` tag always lands here** — the manual-only exploratory rung sits above every roster model's default band, so no active model tier-satisfies it. The ⚠️ note is expected rather than exceptional: it marks the deliberate entry into operator-driven exploratory territory, and the operator proceeds (or retags) as they see fit. Automated choosers must never pick up an `[xheavy]` task (they cap at `[frontier]` — `SPEC/model.md` §"Category-vs-concrete matching").

## Legacy entry — PLAN.md `[model]` is absent (no `[model]` on the line)

Ask the user via AskUserQuestion to choose a model token. Recommended primary labels: `[heavy]` for design / multi-file / ambiguous work; `[medium]` for moderate, multi-step but well-scoped work (the round-up default — when in doubt, round up); `[light]` only for provably mechanical work with a clear diff in mind; `[frontier]` only when a `SPEC/model.md` §"When to choose `[frontier]`" trigger matches (round-up never reaches it). Do not offer `[xheavy]` as an option — the manual-only exploratory rung is a deliberate operator filing, never a default pick (`SPEC/model.md` §"Practical guidance"). You may use any short token per SPEC §"Model field" — the dated roster by tier, the cross-provider mapping (including where `gpt-5` sub-families land), and how effort settings shift a band are all in `docs/PLATFORMS.md` §"Platform×model×effort calibration table" (Read it for this branch; `SPEC/model.md` keeps no copy); this file carries no copy of its own. Project-specific names are equally valid. Use the bare family name: context-window and effort variants do not get their own token (see `SPEC/model.md` §"Effort axis"). Then write `[<chosen>]` into the PLAN.md line in place (insert immediately after `**TASK-ID**`), then proceed to Step 2. The next time `<SKILL>` runs against this line, no question is asked.
