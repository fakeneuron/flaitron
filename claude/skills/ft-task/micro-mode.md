# Micro mode — `--micro` (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `task` SKILL.md Step 0 (through `step-0-flags.md`) when `micro-mode = true`, and by Step 2 when an existing blocked note carries `## ⚡ Notes`. Referenced at Steps 2, 3b, 4, and 5. A run without the mode never reads it. Template: `<root>templates/tasknote-micro-template.md`. Routing — `--micro` is the default route when a task's scope is known and it carries no design question: `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".

`--micro` is a ceremony tier, not a second workflow. The run drives the same four phases under the same contracts — relevance, drift, archive skim, best-practices review, clarifications, verify-command Acceptance, pattern survey, Verification receipt, External review, 👁️ ask, doc-drift sweep, paper-complete guard, post-closure protocol — and records them as bold-prefix lines in one `## ⚡ Notes` log instead of four phase checklists. The spec on top (🎯 Goal / ✅ Acceptance / 🧩 Subtasks / 🔗 Related) and the closing `**Final Summary:**` / `**Archived:**` labels are the full template's own. **Anything this fragment does not name runs exactly as the body says.**

## Step 2 — An existing note's shape decides

`--micro` shapes only a note this run scaffolds. On an existing note:

- **`status: starter`** — promote to the full shape (Step 3a as written). Emit `⚠️ --micro dropped — a starter promotes to the full tasknote.` and set `micro-mode = false`.
- **`status: blocked`** — the note's shape wins. A note with a `## ⚡ Notes` heading resumes in micro mode whether or not `--micro` was passed: set `micro-mode = true`, and if `--loop` or `--debug` is set, run `step-0-flags.md`'s `--micro` refusal now. A full-shape note drops a passed `--micro` with `⚠️ --micro dropped — <ID> is a full-shape tasknote.` and sets `micro-mode = false`. A micro note written by the retired `/ft-micro-task` (a `## ✅ Recap` section, no `## ✅ Acceptance`) is brought to the current template first: insert the missing ✅ Acceptance and 🧩 Subtasks sections (populated before Phase 2 continues), rename `## ✅ Recap` to the `**Final Summary:**` label, and keep its Notes lines verbatim. Step 3c runs as written, except its step 5 continues at the **Implementation** line rather than "Phase 2" — or at Step 4 below for a `model-mismatch` park, which is a bare micro scaffold.

## Step 3b — Scaffold

Copy the micro template in place of the full one. Every Step 3b value applies unchanged — `title:`, `status:`, `created:`, `related-tasks:`, the epic Fan-out echo, the 🎯 Goal — and the sidequest-stub carry lands at the top of `## ⚡ Notes`, ahead of the bold-prefix lines.

## Step 4 — Phase 1 in the Notes log

Each Phase 1 checklist item is its matching Notes line: **Relevance**, **Best Practices Review**, **Archive skim**, **Drift check**, **Clarifications**; Acceptance, Subtasks, and YAML `touches:` populate the spec on top exactly as the body says. "Every Phase 1 box ticked" reads as "every Discovery line filled". The Phase 1→2 exit gate then runs as written (default-skip flavor; De-scope fires; postures unchanged) with one addition ahead of it:

**`Re-scope` converts the note in place.** The verdict says the task outgrew micro. Before the body's Re-scope handling (🛠️ fire, the `--fast` ⚠️ notice, or the `--unattended` `drift` park), replace everything below the body's `---` divider (the one after `## 🔗 Related`, not a YAML fence) with the full template's four phase sections, carry the filled Notes lines verbatim into **Discovery Notes** as a block headed `Carried from the --micro log:`, tick the Phase 1 boxes those lines discharge, and set `micro-mode = false`. The run continues — or parks, or resumes later — as a plain `/ft-task` run.

## Step 5 — Phases 2–4 in the Notes log

The obligations are the body's; only where they are written changes:

- **Phase 2** — pattern survey → **Pattern survey**; the implementation, minimal-refactor reasoning, and any mid-run downstream-impact scan → **Implementation**. A hard dependency parks per `SPEC/blocked.md` (`status: blocked`, `⏸ Blocked` chip, `park-reason:`); under `--unattended` the park recipe's lone-park commit runs before the stop (`unattended-mode.md` §"The park recipe"). The parked note keeps its micro shape, and Step 2 above resumes it.
- **Phase 3** — targeted tests, lint/type-check, and each Acceptance verify command → **Verification receipt** (`command → exit code`, first failure line when non-zero). A frontend change still emits the `👁️ **CONFIRM**` ask; record the reply in the receipt. The **External review** runs on the normal rule — `/code-review medium` over this run's own diff, graded against `## ✅ Acceptance`, or `N/A` with a one-line reason when the diff is too small to grade — findings and dispositions in **External review**; a blocker returns to Phase 2 and the receipt re-runs.
- **Phase 4** — the doc-drift sweep and Learnings → **Docs touched**; the evidence-based recap, `touches:` reconciliation included, and under `--unattended` the `unattended-candidates:` line (`unattended-mode.md` §"What `--unattended` never relaxes") → **Final Summary**. The status flip, `**Archived:**` stamp, PLAN.md stub flip, and archive move run as the body says, and the **executable pre-move gate runs unchanged**: the micro note carries `status:`, `## ✅ Acceptance`, and `**Archived:**`, so all three checks bind.

Step 6 runs as written — the 📦 banner on the fire branch, the autonomous-commit motion on the skip branch.

## Composition

`--micro` composes with `--fast` and `--unattended` unchanged: each gate sits at the same step, so `unattended-mode.md` §"Conversion map"'s `/ft-task` column applies as-is, and a `model-mismatch` scaffold-then-park writes from the micro template. It refuses `--loop` (the loop needs per-cycle Phase 2↔3 and a `## 🔁 Iterations` log) and `--debug` (its prompts and repro re-verify are phase-section content) at Step 0.
