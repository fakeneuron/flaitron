---
title: micro-flag
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-778, CORE-778.1, CORE-778.3, CORE-778.4, CORE-042.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - templates/tasknote-micro-template.md
  - claude/skills/ft-task/micro-mode.md
  - claude/skills/ft-task/step-0-flags.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/tasknote-selection.md
  - AGENTS.md
  - claude/AGENTS-snippet.md
  - codex/skills/ft-task/SKILL.md
  - SPEC/procedures/ft-task.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-778.2 | micro-flag

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-778]]

## 🎯 Goal

Add `--micro` to `/ft-task` — flag parse and marker, a spec-on-top template variant, the scaffold / pre-move-gate / closure branches it needs, and `SPEC/tasknote-selection.md` routing — so the one runner can carry a micro-sized task end to end.

## ✅ Acceptance

- [x] `step-0-flags.md` parses `--micro`, emits its marker, refuses `--loop` / `--debug`, and composes with `--fast` / `--unattended` — `grep -c -- '--micro' claude/skills/ft-task/step-0-flags.md` ≥ 4 + `judgment` (refusal and composition read correctly)
- [x] New lazy fragment `claude/skills/ft-task/micro-mode.md` carries the Step 2 / 3b / 4 / 5 / Phase 4 branches (existing-note shape rule, scaffold, Discovery-in-Notes, Re-scope convert-in-place, Phase 3 in Notes, unchanged pre-move gate) — `test -f` + `judgment`
- [x] `templates/tasknote-micro-template.md` rewritten spec-on-top (🎯 / ✅ / 🧩 / 🔗 identical to the full template) + one `## ⚡ Notes` log + `**Final Summary:**` / `**Archived:**`, and the body's executable pre-move gate passes on a filled copy — scratch-copy gate run → exit 0
- [x] `ft-task/SKILL.md` dispatches the mode at Steps 0 / 2 / 3b / 4 / 5; `argument-hint:` and `description:` carry `--micro` — `bash tools/drift-checks.sh pair_j` and `pair_m` → 0
- [x] `<SKILL>` substitution clauses (`preamble.md`, `step-1.5-model-edge.md`, `unattended-mode.md`) name `--micro`, so a re-entry keeps the shape — `grep -l -- '--micro'` on all three
- [x] `SPEC/tasknote-selection.md` routes micro-sized work to `/ft-task <ID> --micro` — `grep -q '/ft-task <ID> --micro' SPEC/tasknote-selection.md`
- [x] Flag rosters carry `--micro`: `AGENTS.md` + `claude/AGENTS-snippet.md` flags lines (KEEP IN SYNC), the Codex `ft-task` wrapper description, and `SPEC/procedures/ft-task.md` (Step 0 accept list + a **micro mode** primitive row) — `grep -c -- '--micro'` on each ≥ 1
- [x] Drift checks and budgets clean — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Rewrite `templates/tasknote-micro-template.md` to the spec-on-top + `## ⚡ Notes` shape
- [x] Write `claude/skills/ft-task/micro-mode.md` (Steps 2 / 3b / 4 / 5 / Phase 4, `--unattended` composition)
- [x] Edit `step-0-flags.md`: token, refusal, marker, mode definition, composition line
- [x] Edit `ft-task/SKILL.md`: frontmatter, Step 0 token list + init, Step 2 / 3b / 4 / 5 one-line dispatches
- [x] Add `--micro` to the `<SKILL>` substitution clauses in `preamble.md`, `step-1.5-model-edge.md`, `unattended-mode.md`
- [x] Route `SPEC/tasknote-selection.md` micro pair to `/ft-task <ID> --micro`
- [x] Rosters: `AGENTS.md`, `claude/AGENTS-snippet.md`, `codex/skills/ft-task/SKILL.md`, `SPEC/procedures/ft-task.md`
- [x] Phase 3: scratch-copy pre-move gate run, `pair_j` / `pair_m`, full `drift-checks.sh`, `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-778]] — parent epic: fold `/ft-micro-task` into `/ft-task --micro`
- [[CORE-778.1]] — Discovery: surface inventory, resolved scoping, Fan-out (`.2` first)
- [[CORE-778.3]] — follow-up: retires the second runner once this flag exists
- [[CORE-778.4]] — follow-up: reconciles the contract-layer carve-outs this child leaves for it
- [[CORE-042.5]] — reversed decision: shipped micro as an independent runner ("`/task` not edited")

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** First child of the sequential chain; [[CORE-776.N]] (the ordering prerequisite on the parent row) closed at `000c8617`. `/ft-micro-task` is still live and nothing yet offers its shape on the one runner, so `.3` cannot retire it until this lands.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Read set.** `ft-task/SKILL.md`, `step-0-flags.md`, `preamble.md`, `step-3a` / `step-3c` fragments, `unattended-mode.md` (conversion map, pre-scaffold stops, never-relaxes), `ft-micro-task/SKILL.md`, both templates, `SPEC.md` §"Tasknote body shape" / §"🧪 Phase 3" (External review "When it is `N/A`") / §"Paper-complete guard", `SPEC/tasknote-selection.md` micro pair, `SPEC/cue-vocabulary.md` glyph layers, `SPEC/procedures/ft-task.md` primitives + Step 0, `step-7.1-mirror-pairs.md` Pairs J / M and the template-consumer table, `docs/CONTEXT-BUDGET.md` rows.

**Best Practices Review.** `--micro` is a fifth mode flag on the one runner, the shape `--debug` / `--loop` already take: Step 0 sets a mode boolean, `step-0-flags.md` dispatches a lazy fragment, and the body carries one-line "**When `micro-mode = true`**" hooks at the steps it changes (Step 3b's loop addendum is the model). The fragment owns the mode; the body stays a dispatcher (`ft-task/SKILL.md` 25,426 / 33,000 — headroom is not the constraint, but the fragment keeps a flagless run's read set unchanged). The mode changes **where** Phase 1–4 obligations are recorded (one `## ⚡ Notes` log), not **which** obligations run — so the Step 4 exit gate, the Phase 3 receipt and External review, the Phase 4 pre-move gate, and Step 6's 📦 / skip branch all apply unchanged. That is what lets `.4` delete the carve-outs rather than re-home them. Marker glyph: ⚡ already marks `--fast` / `--unattended` and the `## ⚡ Notes` heading, so the marker takes 🪶 — a non-cue residual glyph, a local decision per `SPEC/cue-vocabulary.md` §"Non-cue glyphs"; `.4` lists it there with the rest of that file's micro edits.

**Archive skim.** `.1` skimmed `archive/core/` for the epic (logged there): [[CORE-042.5]] shipped micro as an independent runner ("`/task` not edited") — reversed by this child by design; [[CORE-724.4]] single-sourced the preamble across both runners. Read additionally: [[CORE-571]], the `ft-goal-task` → `/ft-task --loop` fold — the direct precedent for a runner becoming a flag. It did the fold in one 33-file task; this epic splits it, so `.2` takes CORE-571's *flag-adding* half (fragment, Step 0, body hooks, `argument-hint`, rosters, SOP primitive row — "so the SOP stays current with its source") and leaves deletion / migration rows to `.3`.

**Drift check.** Parent row and `.1`'s inventory match HEAD `000c8617` for every surface this child edits. One plan-level note: `.1` asserted "the retired template file goes with the runner"; no child's PLAN line actually names that deletion, and the operator chose rewrite-in-place below, so the assertion is superseded here and `.3`'s line needs no edit. `/ft-micro-task` will read the rewritten template for the one-child gap until `.3` retires it — accepted.

**Clarifications** (one structured ask; all four answered with the recommended option):

| Question | Answer |
|---|---|
| Template home | Rewrite `templates/tasknote-micro-template.md` in place |
| Attended External review under `--micro` | Normal Phase 3 rule — run it against ✅ Acceptance, or `N/A` when the diff is too small to grade |
| `Re-scope` under `--micro` | Convert the note in place to the full shape (Notes carried into Discovery Notes) and continue as plain `/ft-task` |
| Roster scope | Include `AGENTS.md` / snippet flags lines, Codex wrapper, SOP primitive row |

Asserted, not asked: `--micro` on a **starter** promotes to the full shape with a ⚠️ notice (a starter's rich context is the full note's case; more ceremony, never less); a **blocked** note's shape decides — a `## ⚡ Notes` note resumes in micro mode with or without the flag, a full-shape note drops a passed `--micro` with a ⚠️ notice. `--micro --loop` / `--micro --debug` ask which flag to drop (under `--unattended`: terminate, write nothing). Marker 🪶. Out of scope, left to their children: `/ft-micro-task` deletion and the Pair-table consumer row (`.3`), the contract carve-outs incl. `SPEC.md` §"🧪 Phase 3"'s micro clause, `post-closure.md`'s 🟢 GO, `CAPABILITIES.md` / `PLATFORMS.md` flag rows, `cue-vocabulary.md` residual list (`.4`), the viz fixture (`.5`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown contract surfaces only; the pre-move-gate scratch run (Testing Notes) is the behavioral check, and `drift-checks.sh` Pairs J / M bind the new flag to `argument-hint:` / `description:`

**Implementation Notes:**

Pattern: the `--loop` mode shape ([[CORE-571]]) — Step 0 boolean, `step-0-flags.md` token + marker + mode paragraph dispatching one lazy fragment, and one-line "**When `micro-mode = true`**" hooks in the body at Steps 2 / 3b / 4 / 5, sitting beside the existing `loop-mode` hooks.

- **`templates/tasknote-micro-template.md`** — rewritten. Lines 1–42 are byte-identical to `tasknote-template.md` (frontmatter, nav header with 🔗 chip, 🎯 / ✅ / 🧩 / 🔗, divider); below the divider, one `## ⚡ Notes` log of ten bold-prefix lines (Relevance, Best Practices Review, Archive skim, Drift check, Clarifications, Pattern survey, Implementation, Verification receipt, External review, Docs touched), then the full template's `**Final Summary:**` / `**Archived:**` labels. The old **Declared scope** line is gone — `touches:` lives in YAML as on a full note — and `## ✅ Recap` is replaced by Final Summary.
- **`claude/skills/ft-task/micro-mode.md`** (new, 5.6k) — the whole mode: Step 2 existing-note shape rule, Step 3b template swap, Step 4 Discovery-as-lines + `Re-scope` convert-in-place, Step 5 per-phase record locations (External review on the normal rule; pre-move gate unchanged), composition.
- **`step-0-flags.md`** — `--micro` token, the `--loop` / `--debug` refusal (structured ask; `--unattended`: `flag-conflict` terminate-and-write-nothing stop), 🪶 marker, mode paragraph, composition line; "four" → "five" modes.
- **`ft-task/SKILL.md`** (25,426 → 26,391 / 33,000) — `description:` + `argument-hint:`, accepted-token sentence, `SKILL_DIR` list, micro template path, `micro-mode` init, Step 2 / 3b / 4 / 5 hooks.
- **`<SKILL>` clauses** — `preamble.md` (+12 B), `step-1.5-model-edge.md`, `unattended-mode.md` name `--micro`, so a model-gate or park re-entry keeps the shape.
- **`SPEC/tasknote-selection.md`** — the micro pair routes to `/ft-task <ID> --micro`; paragraph restated for the new shape; "Skip the micro-tasknote (use plain `/ft-task`)".
- **Rosters** — `AGENTS.md` and `claude/AGENTS-snippet.md` flags lines (KEEP IN SYNC pair, same parenthetical in both), Codex wrapper `description:`, `SPEC/procedures/ft-task.md` **micro mode** primitive row + composition line + Step 0 accept list (33,318 → 33,750 / 34,200).

Left in place deliberately (owned by later children, per Discovery): `/ft-micro-task` mentions in the same roster lines (`.3`), every contract-layer micro carve-out (`.4`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh pair_j` / `pair_m` (the checks that bind a skill's flags); no code suite touches these paths (`grep -rln tasknote-micro-template viz/src tools` → 1, no consumers)

- [x] Ran lint/type-check on changed code — N/A: markdown only; full `drift-checks.sh` covers final newlines, citations, and budgets

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt** (final pass, after the review fixes):

- `grep -c -- '--micro' claude/skills/ft-task/step-0-flags.md` → 5
- `test -f claude/skills/ft-task/micro-mode.md` → 0 (5,927 B)
- Pre-move gate on a filled scratch copy of the template (status → completed, boxes ticked, stamp dated): `grep -q '^status: completed$'` → 0; Acceptance awk scan → prints nothing; `**Archived:**` stamp grep → 0. Negative control: the stamp grep on the unfilled template → 1, and its Acceptance scan finds 2 open boxes. `diff` of lines 1–42 against `tasknote-template.md` → identical.
- `bash tools/drift-checks.sh pair_j` → 0 · `pair_m` → 0
- `grep -l -- '--micro'` on `preamble.md`, `step-1.5-model-edge.md`, `unattended-mode.md` → all three listed
- `grep -q '/ft-task <ID> --micro' SPEC/tasknote-selection.md` → 0
- `grep -c -- '--micro'`: `AGENTS.md` 1 · `claude/AGENTS-snippet.md` 1 · `codex/skills/ft-task/SKILL.md` 1 · `SPEC/procedures/ft-task.md` 2
- `bash tools/drift-checks.sh` → 0 (first run after the redirect edit → 1: `MISSING HINT FLAG ft-micro-task --micro` — Pair J read the stop line's `--micro` as the old skill's own flag; rephrased so the own slug does not lead the span; re-run → 0)

Structural: no duplication (the mode lives once, in `micro-mode.md`; body hooks are one-line dispatches), no dead code, stale docs left only where a later child owns them (below).

**External review** — `/code-review medium` over the working tree, 10 findings:

| # | Finding | Grade | Disposition |
|---|---|---|---|
| 3 | Shape-detected blocked resume never sets `micro-mode = true` | blocker | fixed — §"Step 2" sets it |
| 4 | `--loop` / `--debug` refusal skipped when the shape turns the mode on | blocker | fixed — §"Step 2" runs the refusal |
| 8 | "below the `---` divider" ambiguous with YAML fences | blocker | fixed — anchored to the body divider after `## 🔗 Related` |
| 10 | Old-shape `/ft-micro-task` notes resumed under `/ft-task` lack Acceptance / Final Summary | blocker | fixed — §"Step 2" upgrades a legacy note to the template first |
| 1, 2 | `/ft-micro-task` still live but cannot fill the rewritten template (placeholder Acceptance boxes would trip CI's `pair_p` on archive) | note | fixed — `/ft-micro-task` body now opens with a redirect stop to `/ft-task <ID> --micro` for the one-child gap |
| 7 | `unattended-candidates:` copy target is a micro `## ✅ Recap` | note | fixed in `micro-mode.md` (→ Final Summary); the `unattended-mode.md` line itself is `.4`'s |
| 5, 6 | `SPEC/blocked.md` L113 and `unattended-mode.md` L40 still route micro parks to `/ft-micro-task` | note | filed — [[CORE-778.4]] scope (both named in its PLAN line); the redirect keeps the old route landing on `--micro` meanwhile |
| 9 | `docs/EXTERNAL-AGENTS.md` rows, `docs/GLOSSARY.md`, `templates/tasknote-README.md` describe the old micro shape | note | filed — [[CORE-778.4]] (EXTERNAL-AGENTS) and [[CORE-778.5]] (GLOSSARY, tasknote-README), both in their PLAN lines |

Blockers returned the run to Phase 2; Phase 3 re-ran from the top (receipt above is the re-run).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `AGENTS.md` — updated (`--micro` on the flags line). `claude/AGENTS-snippet.md` — updated (same, KEEP IN SYNC). `SPEC.md` — no change here; its §"🧪 Phase 3" micro clause and §"Paper-complete guard" runner split are [[CORE-778.4]]'s. `README.md`, `docs/MIGRATION.md` — no change here ([[CORE-778.3]] / [[CORE-778.5]]). `codex/` / `cursor/` / `grok/` `AGENTS-snippet.md` — no change (no flags line; symlink lines are `.3`'s). `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md` — no change here; flag rows and stable-surface rows are `.4` / `.5`. `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (no micro or flag-roster content touched).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The reusable lesson is that a ceremony tier changes where obligations are recorded, not which ones run. It now lives in `micro-mode.md`'s lede, which is where a `--micro` run reads it.

**Final Summary:**

`/ft-task` now takes `--micro`. A micro-sized task gets a spec-on-top note with one `## ⚡ Notes` log, and runs the same phases, gates, External review, pre-move gate, and 📦 / skip closure as any other `/ft-task` run. `/ft-micro-task` is reduced to a redirect until [[CORE-778.3]] deletes it.

- **New:** `claude/skills/ft-task/micro-mode.md` (5,927 B, lazy). **Rewritten:** `templates/tasknote-micro-template.md` (lines 1–42 identical to the full template). **Edited:** `step-0-flags.md` (token, `--loop` / `--debug` refusal incl. `flag-conflict` unattended stop, 🪶 marker, mode paragraph), `ft-task/SKILL.md` (25,426 → 26,391 / 33,000; frontmatter + five one-line hooks), `<SKILL>` clauses in `preamble.md` / `step-1.5-model-edge.md` / `unattended-mode.md`, `SPEC/tasknote-selection.md` routing, `AGENTS.md` + `claude/AGENTS-snippet.md` flags lines, Codex wrapper description, `SPEC/procedures/ft-task.md` micro-mode row (33,750 / 34,200), `/ft-micro-task` redirect.
- **Decisions** (operator, one structured ask): rewrite the template in place; the normal Phase 3 External review rule; `Re-scope` converts the note in place; include rosters + SOP. Asserted: a starter promotes full-shape; a blocked note's shape wins (legacy micro notes upgraded on resume); marker 🪶.
- **Verification:** every Acceptance receipt passes (Testing Notes). `bash tools/drift-checks.sh` → 0. External review found 4 blockers, all fixed and re-verified, and 6 notes: 3 fixed, 3 already in `.4` / `.5` scope.
- **`touches:` reconciliation:** one undeclared path edited, `claude/skills/ft-micro-task/SKILL.md` (the review-driven redirect). Every declared path was edited.
- **Maintainability:** the micro tier now has a single dispatch source (`/ft-task` Step 0), and the shared fragments' `<SKILL>` clauses carry the flag. `.4` can delete the second-runner carve-outs instead of re-homing them. Handoffs: `.3` deletes the runner and fixes the ft-release template-consumer row; `.4` lists 🪶 in `cue-vocabulary.md`'s non-cue residual and fixes `blocked.md` L113, `unattended-mode.md` L40 / L99, and `EXTERNAL-AGENTS.md` rows 96–97; `.5` fixes `GLOSSARY.md` and `tasknote-README.md`.

**Archived:** 2026-10-10
