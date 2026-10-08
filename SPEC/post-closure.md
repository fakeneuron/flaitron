# Post-closure protocol

> Lazy-loaded SPEC module. Loaded by every closing runner at its final step — `/ft-task` Step 6, `/ft-micro-task` Step 5, `/ft-close-epic` Step 9, `/ft-epic-discovery` Step 10, `/ft-release` Step 8 — once the tasknote is archived and the closure commit is the next motion. Nothing before Phase 4 loads it. See `SPEC.md` for the always-loaded core spec (the four phases and the paper-complete guard this protocol runs under) and [`SPEC/gates.md`](gates.md) §"Conditional skip rule" for the skip/fire decision step 1 branches on.

After a tasknote is archived, run the three-step protocol (commit / mark landed / offer copy-paste line). Whether step 1 fires or skips is [`SPEC/gates.md` §"Conditional skip rule"](gates.md), which also carries the skip branch's autonomous-commit motion; what `--fast` and `--unattended` do to it is one row of [`SPEC/gate-postures.md` §"Flag precedence and surface matrix"](gate-postures.md). Steps 2–3 run **only after** a deliverable-covering SHA — never in the same turn as a fire-branch 📦 / 🟢 ask.

**Push is a separate gated step.** Ordinary commit-go, the autonomous-commit marker, and a `--fast` or `--unattended` skip authorize a local commit only. They do not authorize `git push`, and ordinary task closure never pushes. The one closure that does push is `/ft-release`: push-go is its own prompt inside the 📦 bundle ([`SPEC/gates.md` §"Operator-gate cues"](gates.md)), and only a Yes there lets the following commit-go include the push. A decline leaves the commit and tag local. Any other push is an operator-gated command, not a step of this protocol.

1. **Commit (bundled gate, fire branch).** Surface the 📦 banner ([`SPEC/gates.md` §"Operator-gate cues"](gates.md) — preview line mandatory) and wait for commit-go. The bundle has three parts:

   - **Closure review** — per-entry doc-drift verdicts, new PLAN.md stub-form line, archive path.
   - **Recap (work summary)** — 1-2 sentence plain-English lede, then technical detail (file paths / LOC / key decisions + optional verification ask) per [`SPEC.md` §"🚀 Phase 4: Closure"](../SPEC.md).
   - **Proposed commit message** — `feat: <TASK-ID> — <title>` (or `fix:` / `docs:` / `chore:`). Multiple recently-closed tasknotes may bundle into one commit.

   The commit-go prompt carries a `🟢` prefix (e.g., `🟢 Reply commit / go to land.`). Accepted replies are the closed set in [`SPEC/cue-vocabulary.md` §"Accepted gate replies"](cue-vocabulary.md) (`commit` / `go` / `yes` and the explicit commit verbs named there); `okay` / `looks good` are not members. Skill-level extensions (e.g., parent-flip Yes/No) ride inside this bundle; the commit-go is the single approval authorizing recap + closure + bundled prompts + commit.

   **ft-micro-task carve-out.** `/ft-micro-task` carries no 📦 banner block on the fire branch — its commit-go is the emphasized 🟢 GO ask (own line, blank-line isolated, bold label) in place of the banner. The 📦 cue does not apply; the 🟢 prefix does. The same conditional skip rule governs both forms. See `/ft-micro-task` SKILL.md Step 5.

2. **Mark the commit landed and suggest the next move.** Once the commit lands **and** the SHA passes the deliverable-covering check in [`SPEC.md` §"Paper-complete guard"](../SPEC.md), prefix the next-move tail with a 🏁 state-marker (parallels 🛠️ → 📦 → 🏁). **Never emit 🏁 without the just-landed closure commit's real SHA** — never an invented or reused one.

   ```markdown
   🏁 **<TASK-ID> — committed `<sha>`** · archived to `<archive-path>`
   <1-2 sentence plain-English description of what was accomplished in this commit>
   ```

   Then surface candidates with the emoji primary label inline per option — `[heavy]🧠`, `[medium]🧩`, `[light]🔧`, `[frontier]💎`, or (rare — manual-only filings) `[xheavy]🔭`, never the bare `[model]` token — followed by "design / moderate / mechanical / high-stakes / exploratory" prose and shortname. Concrete tokens bucket to their inherent tier ([`SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph"](model.md)). End each candidate with `· <model @ effort>` — the active platform's pick for its tier, per [`SPEC/model.md` §"Effort recommendations"](model.md) → "Printing a cell"; omit it where that rule prints no pick:

   ```markdown
   - **<TASK-ID>** [heavy]🧠 | shortname — one-sentence "why now" (design) · Opus @ high
   - **<TASK-ID>** [medium]🧩 | shortname — one-sentence "why now" (moderate) · Opus @ medium
   ```

   **Re-read PLAN.md now** (fresh Read tool call — do not rely on the Step 1 cached parse; the Completed section grows long and stale-context suggestions are a known error mode). For each candidate you intend to name, verify its task line is `- [ ]` (unchecked) and lives in an open section (`## High`, `## Medium`, `## Low`, or `## Future Opportunities`), **not** under `## Completed`. Drop any candidate that fails this check before surfacing it.

   One of three forms:
   - **Epic continuation:** closed task is in an active epic with cleared dependencies → name the single most natural next task ID.
   - **Open menu:** 2-3 candidates from PLAN.md mixing priority and readiness; user picks.
   - **PLAN exhausted (terminal):** the fresh re-read leaves no surviving candidate — every open-section task is checked, or the only entries live under `## Completed`. **Stop. Do not invent a next move.** Naming a task from the `## Completed` archive, a doc example, or the cached Step-1 parse is exactly the confabulation this branch prevents — the two forms above both presuppose ≥1 open task and do not apply. State plainly that PLAN.md holds no open work, then — *in this session, before any clear* — offer to file new work: `/ft-epic-discovery` for a new epic, `/ft-file-followup` for a standalone follow-up. Skip step 3's copy-paste session-reset line: there is no queued task to run after a clear.

   **Audit-family flag.** When a next-move candidate is an `/ft-audit*` slash command, prefix the candidate line (this step) and the copy-paste line (step 3) with 🔍. The `/ft-audit` scaffold, when forked per `docs/MIGRATION.md` §1.2.1, runs in adopter context as the unprefixed local fork (e.g., `/audit`), not `/ft-audit`; `/ft-audit-repo` is never forked and keeps its name. The 🔍 marker doubles as a self-check for any AI about to emit `/ft-audit*` as next move.

3. **Offer the copy-paste line.** The label-line glyph is **copied from the chosen candidate line just printed in step 2** — never default to 🔧. Emit the session-reset **label line**, then put the skill invocation **on its own line as inline-code with no trailing punctuation** — a trailing `.` after the ID collides with the `.N` epic-subtask grammar (`FE-132.3.`) and breaks copy/paste. Shape, where `<glyph>` is the candidate's 🔧/🧩/🧠/💎/🔭 and `<model @ effort>` its printed pick (with no pick, the label line ends `then run:`):

   ```markdown
   <glyph> Clear your session, then run on <model @ effort>:
   `/<next-skill> <args>`
   ```

   Never emit literal `/clear` or `/model` commands — the emoji and pick on the label line carry the model signal; the cue carries the session-reset intent. The skill segment matches the appropriate flaitron skill for the next task — most commonly `/ft-task` (normal tasks), `/ft-micro-task` (micros), or `/ft-audit*` (audit follow-ups — an adopter's forked `/ft-audit` runs as its unprefixed local fork per [`SPEC/layout.md`](layout.md) §"Skill namespace"; `/ft-audit-repo` keeps its name). `<args>` is the next task ID for tasknote-runner skills, or the skill's own argument shape otherwise.

   **Context-dependent skills flag.** When the next-skill is `/ft-file-followup` (in any mode — the default flow, `--park`, or `--starter`) or `/ft-epic-discovery`, replace the label line with `👇 Run in this session:` — 👇 (`HERE`) replaces the model glyph and signals run-here-don't-clear; the 🔧/🧩/🧠/💎/🔭 model signal and pick stay on the candidate line just printed. These skills draw from current-conversation context to draft their output, so clearing the session destroys what they need. Keep the skill invocation line unchanged.
