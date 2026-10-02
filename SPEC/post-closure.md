# Post-closure protocol

> Lazy-loaded SPEC module. Loaded by every closing runner at its final step — `/ft-task` Step 6, `/ft-micro-task` Step 5, `/ft-close-epic` Step 9, `/ft-epic-discovery` Step 10, `/ft-release` Step 8 — once the tasknote is archived and the closure commit is the next motion. Nothing before Phase 4 loads it. See `SPEC.md` for the always-loaded core spec (the four phases and the paper-complete guard this protocol runs under) and [`SPEC/gates.md`](gates.md) §"Conditional skip rule" for the skip/fire decision step 1 branches on.

After a tasknote is archived, run the three-step protocol (commit / mark landed / offer copy-paste line). Step 1 branches on the **conditional skip rule** — the privileged-ops signal, the bundled-prompt override, and the on-skip/on-fire routing all live in [`SPEC/gates.md` §"Conditional skip rule"](gates.md); what `--fast` and `--unattended` do to it is one row of [`SPEC/gate-postures.md` §"Flag precedence and surface matrix"](gate-postures.md). On skip, the closure auto-commits behind a `✅ Closure complete; committing autonomously (…)` marker; on fire, proceed with step 1 below. Steps 2–3 run **only after** a deliverable-covering SHA — never in the same turn as a fire-branch 📦 / 🟢 ask.

**Push is a separate gated step.** Ordinary commit-go, the autonomous-commit marker, and a `--fast` or `--unattended` skip authorize a local commit only. They do not authorize `git push`, and ordinary task closure never pushes. The one closure that does push is `/ft-release`: push-go is its own prompt inside the 📦 bundle ([`SPEC/gates.md` §"Operator-gate cues"](gates.md)), and only a Yes there lets the following commit-go include the push. A decline leaves the commit and tag local. Any other push is an operator-gated command, not a step of this protocol.

1. **Commit (bundled gate, fire branch).** Surface the bundled ready-to-commit gate behind the 📦 cue (per [`SPEC/gates.md` §"Operator-gate cues"](gates.md) — preview line mandatory) and wait for commit-go. The bundle has three parts:

   - **Closure review** — per-entry doc-drift verdicts, new PLAN.md stub-form line, archive path.
   - **Recap (work summary)** — 1-2 sentence plain-English lede, then technical detail (file paths / LOC / key decisions + optional verification ask) per [`SPEC.md` §"🚀 Phase 4: Closure"](../SPEC.md).
   - **Proposed commit message** — `feat: <TASK-ID> — <title>` (or `fix:` / `docs:` / `chore:`). Multiple recently-closed tasknotes may bundle into one commit.

   The commit-go prompt carries a `🟢` prefix (e.g., `🟢 Reply commit / go to land.`). Accepted replies are the closed set in [`SPEC/cue-vocabulary.md` §"Accepted gate replies"](cue-vocabulary.md) (`commit` / `go` / `yes` and the explicit commit verbs named there); `okay` / `looks good` are not members. Skill-level extensions (e.g., parent-flip Yes/No) ride inside this bundle per the override above; the commit-go is the single approval authorizing recap + closure + bundled prompts + commit.

   **ft-micro-task carve-out.** `/ft-micro-task` carries no 📦 banner block on the fire branch — its commit-go is the emphasized 🟢 GO ask (own line, blank-line isolated, bold label) in place of the banner. The 📦 cue does not apply; the 🟢 prefix does. The same conditional skip rule governs both forms. See `/ft-micro-task` SKILL.md Step 5.

2. **Mark the commit landed and suggest the next move.** Once the commit lands **and** the SHA passes the deliverable-covering check in [`SPEC.md` §"Paper-complete guard"](../SPEC.md), prefix the next-move tail with a 🏁 state-marker (parallels 🛠️ → 📦 → 🏁). **Never emit 🏁 without a real commit SHA** from the just-landed closure commit, and never invent or reuse an unrelated SHA. **Never emit this step (or step 3) in the same turn as a fire-branch 📦 / 🟢 ask.**

   ```markdown
   🏁 **<TASK-ID> — committed `<sha>`** · archived to `<archive-path>`
   <1-2 sentence plain-English description of what was accomplished in this commit>
   ```

   Then surface candidates with emoji primary label inline per option — emit `[heavy]🧠`, `[medium]🧩`, `[light]🔧`, or (rare — manual-only filings) `[xheavy]🔭` (never the bare `[model]` token) followed by "design / moderate / mechanical / exploratory" prose and shortname. The glyph mirrors the model tier 1:1 (`[light]`→🔧, `[medium]`→🧩, `[heavy]`→🧠, `[xheavy]`→🔭; concrete tokens bucket to their inherent tier — see [`SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph"](model.md)):

   ```markdown
   - **<TASK-ID>** [heavy]🧠 | shortname — one-sentence "why now" (design)
   - **<TASK-ID>** [medium]🧩 | shortname — one-sentence "why now" (moderate)
   ```

   **Re-read PLAN.md now** (fresh Read tool call — do not rely on the Step 1 cached parse; the Completed section grows long and stale-context suggestions are a known error mode). For each candidate you intend to name, verify its task line is `- [ ]` (unchecked) and lives in an open section (`## High`, `## Medium`, `## Low`, or `## Future Opportunities`), **not** under `## Completed`. Drop any candidate that fails this check before surfacing it.

   One of three forms:
   - **Epic continuation:** closed task is in an active epic with cleared dependencies → name the single most natural next task ID.
   - **Open menu:** 2-3 candidates from PLAN.md mixing priority and readiness; user picks.
   - **PLAN exhausted (terminal):** the fresh re-read leaves no surviving candidate — every open-section task is checked, or the only entries live under `## Completed`. **Stop. Do not invent a next move.** Naming a task from the `## Completed` archive, a doc example, or the cached Step-1 parse is exactly the confabulation this branch prevents — the two forms above both presuppose ≥1 open task and do not apply. State plainly that PLAN.md holds no open work, then — *in this session, before any clear* — offer to file new work: `/ft-epic-discovery` for a new epic, `/ft-file-followup` for a standalone follow-up. Skip step 3's copy-paste session-reset line: there is no queued task to run after a clear.

   **Audit-family flag.** When a next-move candidate is an `/ft-audit*` slash command, prefix the candidate line (this step) and the copy-paste line (step 3) with 🔍. Audit-family skills are forked per project per `docs/MIGRATION.md` §1.2.1 — in adopter context the local fork is unprefixed (e.g., `/audit`), not `/ft-audit`. The 🔍 marker doubles as a self-check for any AI about to emit `/ft-audit*` as next move.

3. **Offer the copy-paste line.** The label-line glyph is **copied from the chosen candidate line just printed in step 2** — 🧠 when the candidate showed 🧠, 🧩 when it showed 🧩, 🔧 when it showed 🔧, 🔭 when it showed 🔭; never default to 🔧. Emit the session-reset **label line**, then put the skill invocation **on its own line as inline-code with no trailing punctuation** — a trailing `.` after the ID collides with the `.N` epic-subtask grammar (`FE-132.3.`) and breaks copy/paste. Shape, where `<glyph>` is the candidate's 🔧/🧩/🧠/🔭:

   ```markdown
   <glyph> Clear your session, then run:
   `/<next-skill> <args>`
   ```

   Never emit literal `/clear` or `/model` commands — the emoji on the label line carries the model signal; the cue carries the session-reset intent. The skill segment matches the appropriate flowtron skill for the next task — most commonly `/ft-task` (normal tasks), `/ft-micro-task` (micros), or `/ft-audit*` (audit follow-ups — adopters use the unprefixed local fork per [`SPEC/layout.md`](layout.md) §"Skill namespace"). `<args>` is the next task ID for tasknote-runner skills, or the skill's own argument shape otherwise.

   **Context-dependent skills flag.** When the next-skill is `/ft-file-followup` (in any mode — the default flow, `--park`, or `--starter`) or `/ft-epic-discovery`, replace the label line with `👇 Run in this session:` — 👇 (`HERE`) replaces the model glyph and signals run-here-don't-clear; the 🔧/🧩/🧠/🔭 model signal stays on the candidate line just printed. These skills draw from current-conversation context to draft their output, so clearing the session destroys what they need. Keep the skill invocation line unchanged.
