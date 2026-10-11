---
title: contract-reconcile
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-778, CORE-778.2, CORE-778.3, CORE-778.5]
blocked-by: [CORE-778.3]
touches:
  - SPEC.md
  - SPEC/gate-postures.md
  - SPEC/gates.md
  - SPEC/post-closure.md
  - SPEC/cue-vocabulary.md
  - SPEC/blocked.md
  - SPEC/model.md
  - SPEC/plan-filing.md
  - SPEC/unattended-candidacy.md
  - SPEC/layout.md
  - SPEC/versioning.md
  - SPEC/tasknote-selection.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-task/step-5-loop-mode.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-file-task/SKILL.md
  - claude/skills/ft-file-task/park-mode.md
  - claude/skills/ft-open-epic/SKILL.md
  - templates/subagent-probe-template.md
  - docs/EXTERNAL-AGENTS.md
  - docs/PLATFORMS.md
  - docs/GATE-DISCIPLINE.md
  - claude/CAPABILITIES.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-778.4 | contract-reconcile

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-778]]

## 🎯 Goal

Remove every second-runner (`/ft-micro-task`) carve-out from flaitron's contract layer, so the SPEC, its modules, the shared `ft-task` fragments, `ft-file-task` routing, and the platform / capability / caller docs describe `/ft-task --micro` as the one micro path.

## ✅ Acceptance

- [x] No `/ft-micro-task` mention remains in the in-scope contract files except the two legacy-note clauses (archived notes from the retired runner) — `git grep -n 'ft-micro-task' -- SPEC.md SPEC/ claude/skills/ft-task/ claude/skills/ft-file-task/ claude/skills/ft-open-epic/ templates/subagent-probe-template.md docs/EXTERNAL-AGENTS.md docs/PLATFORMS.md claude/CAPABILITIES.md docs/GATE-DISCIPLINE.md | grep -v -e 'written by the retired `/ft-micro-task`' -e 'Archived notes from the retired `/ft-micro-task`'` prints nothing (content-matched exclusions, revised from line numbers per review note 9)
- [x] No multi-runner phrasing survives in the contract layer — `git grep -n -E "runners'|three runners|two runners|both runners|two siblings|two ID-invoked|shared \`(ft-task/)?preamble|preamble[^·]*shared with" -- SPEC.md SPEC/ claude/ codex/ templates/ docs/EXTERNAL-AGENTS.md docs/PLATFORMS.md docs/GATE-DISCIPLINE.md` prints nothing (widened per review note 8)
- [x] `post-closure.md`'s 🟢 GO carve-out and `gates.md` / `GATE-DISCIPLINE.md`'s "(or 🟢 GO)" are gone — `! grep -n -E 'ft-micro-task carve-out|\(or [^)]*🟢 GO\)|📦 / 🟢' SPEC/post-closure.md SPEC/gates.md docs/GATE-DISCIPLINE.md`
- [x] `unattended-mode.md`'s conversion map drops the micro column (4 columns) and `blocked.md` no longer says `/ft-task` is not micro-aware — `grep -c '^| Gate | .park-reason. code | ./ft-task. | ./ft-task --loop. (where it differs) |$' claude/skills/ft-task/unattended-mode.md` → 1 and `! grep -q 'not micro-aware' SPEC/blocked.md`
- [x] 🪶 joins `cue-vocabulary.md`'s non-cue residual — `grep -q '🪶 (`--micro` active)' SPEC/cue-vocabulary.md`
- [x] `CAPABILITIES.md` carries a `--micro` row and the `--fast` / `--unattended` rows name only `/ft-task` as the runner — `grep -q '^| \*\*`--micro`\*\*' claude/CAPABILITIES.md`
- [x] `PLATFORMS.md` skill counts match the tree — `ls claude/skills | wc -l` → 11 and `grep -q '11 `SKILL.md` skill bodies' docs/PLATFORMS.md && grep -q 'Five tasknote skills' docs/PLATFORMS.md`
- [x] `EXTERNAL-AGENTS.md` stable-surface rows describe the current `--micro` template (Final Summary lede readable; legacy archived micro notes named as the exception) — `judgment`: prose accuracy against `templates/tasknote-micro-template.md`
- [x] Drift checks and their self-test pass — `bash tools/drift-checks.sh` → 0 and `node --test tools/drift-checks.test.mjs` → 0

## 🧩 Subtasks

- [x] SPEC.md: Phase 3 "When it is `N/A`" micro clause; Paper-complete guard runner split; Model field "the runners'"
- [x] SPEC modules: `gate-postures.md` (header, `--fast` applies-to, row-marker, pre-scaffold, open-siblings, External review, `/ft-close-epic`, applies-to), `gates.md` (header, On fire), `post-closure.md` (header, step-intro, carve-out, skill segment), `cue-vocabulary.md` (🎯 invocations, 🪶), `blocked.md` (model-mismatch resume, in-flight refusal), `model.md`, `plan-filing.md`, `unattended-candidacy.md`, `layout.md`, `versioning.md`, `tasknote-selection.md` headers / rows
- [x] Shared `ft-task` fragments: `preamble.md` (header, `<SKILL>`, `<suppressions>` inlined), `step-1.5-model-edge.md`, `step-5-loop-mode.md`, `unattended-mode.md` (header, map column, micro paragraphs, resume, Recap), `ft-task/SKILL.md` (SKILL_DIR list, Step 1 clause)
- [x] Routing: `ft-file-task/SKILL.md` (report line, cohort routing), `park-mode.md` (context hint, routing, promotion), `ft-open-epic/SKILL.md` (unsupported-flag runner list)
- [x] Caller / platform docs: `templates/subagent-probe-template.md`, `docs/EXTERNAL-AGENTS.md` (step 1, review paragraph, rows 91 / 96 / 97), `docs/PLATFORMS.md` (inventory rows, slug example, scaffold sketch, worked-example count, Codex flag route), `claude/CAPABILITIES.md` (`--fast` / `--unattended` rows, new `--micro` row), `docs/GATE-DISCIPLINE.md`
- [x] Phase 3: Acceptance receipts, drift checks + self-test, External review

## 🔗 Related

- [[CORE-EPIC-778]] — parent epic: fold `/ft-micro-task` into `/ft-task --micro`
- [[CORE-778.2]] — predecessor: shipped `--micro` and the rewritten template; handed this child its fix list
- [[CORE-778.3]] — predecessor: deleted the runner; scoped every contract-layer mention to this child
- [[CORE-778.5]] — follow-up: docs sweep (GLOSSARY, README, CONTEXT-BUDGET, AGENT-NEUTRALITY, CODEX-VERIFICATION, templates)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-778.3]] deleted the runner, so every contract clause that still routes to `/ft-micro-task`, splits a rule between "the two runners", or carves out a micro-only gate shape now describes a skill that does not exist. [[CORE-778.2]] made `--micro` run `/ft-task`'s own phases, gates, External review, and 📦 closure, so the carve-outs can be deleted rather than re-homed.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Read set.** Every line of `git grep -n -i 'ft-micro-task\|micro'` outside VERSION-HISTORY, the archive, and PLAN files (47 files), read in context for the in-scope ones; plus a second grep for two-runner phrasing (`two runners`, `both runners`, `the runners`, `two siblings`, `🟢 GO`, `## ✅ Recap`). Current `templates/tasknote-micro-template.md` and `claude/skills/ft-task/micro-mode.md`.

**Best Practices Review.** The carve-outs come in three kinds, and each has one fix. (1) **Routing to the retired skill** ("execute now → `/ft-micro-task`", next-skill segment, applies-to lists): retarget to `/ft-task --micro` or drop the name. (2) **Two-runner splits** ("the two runners", "`/ft-micro-task`: any existing note but its own park", the `<PREAMBLE>` / `<UNATTENDED>` bindings, the preamble's `<suppressions>` parameter): collapse to the one runner. `unattended-mode.md` stays shared with `/ft-close-epic`, so "the runner" there means `/ft-task` as against `/ft-close-epic`. (3) **Micro-only gate shapes** (no attended External review, review graded against 🎯 Goal + PLAN row, 🟢 GO in place of 📦, the recap-carried 👁️ request, the "not designed to park" dependency park, `## ✅ Recap` as the persistence point): delete, since `micro-mode.md` already states that `--micro` runs the body's gates unchanged. No new shape. `preamble.md` and `step-1.5-model-edge.md` stay separate files; folding them back into the body is out of scope, and the `<SKILL>` placeholder still carries the run's flags.

**Archive skim** (`archive/core/`, confirmed against the README table row `CORE-*` → `archive/core/`). [[CORE-778.1]] has the surface inventory (class 2 + class 3 = this child) and the reversed-decision note for `blocked.md` L113: [[CORE-042.5]]'s "`/task` not edited" is reversed by design, so no ⚠️ pointer. [[CORE-778.2]] handed over specific items: 🪶 into `cue-vocabulary.md`'s non-cue residual, `blocked.md` L113, `unattended-mode.md` L40 / L99, `EXTERNAL-AGENTS.md` rows 96–97, and the CAPABILITIES / PLATFORMS flag rows. [[CORE-778.3]] put every SPEC module, shared fragment, ft-file-task, PLATFORMS, CAPABILITIES, and EXTERNAL-AGENTS mention in this child, and the GLOSSARY / README / CONTEXT-BUDGET / AGENT-NEUTRALITY / CODEX-VERIFICATION / template mentions in [[CORE-778.5]].

**Drift check.** Every surface the PLAN line names exists at HEAD `c20486f2` with the quoted text. Surfaces beyond the line that carry the same carve-outs and that no other child owns: `SPEC/versioning.md` L24, `SPEC/tasknote-selection.md` L3, `claude/skills/ft-open-epic/SKILL.md` L48, `docs/GATE-DISCIPLINE.md` L47 (a mirror of `gates.md` L194's "(or 🟢 GO)"). They are in scope here, which matches `.3`'s "SPEC modules … belong to `.4`". Left alone on purpose: `SPEC/layout.md` L44 and `step-7.1-mirror-pairs.md` L19/L37 (the micro *template* still exists); `micro-mode.md` L12 (the legacy-note upgrade has to name the retired runner); `docs/MIGRATION.md`'s retired-skills row and `tools/update-adopters*` (correct history); `docs/HARNESS-SURVEY.md` L219 ("multi-runner" there means agent platforms); `GATE-DISCIPLINE.md` L64 (🟢 GO is still `/ft-release`'s commit-go prefix inside its 📦 bundle). `EXTERNAL-AGENTS.md` row 96 is still accurate: a `--micro` note has no phase headings. Row 97 is stale, because the template now ships `**Final Summary:**`.

**Clarifications.** No clarifications needed. Assumptions: the stable-surface edits in `EXTERNAL-AGENTS.md` ride the unreleased v7.0.0 major that already carries the fold (`.3`). `CAPABILITIES.md` gains a `--micro` row in the `--loop` row's shape, since that file is the flag roster. The preamble's `<suppressions>` parameter is inlined because it existed only so a second runner could name its own clause. GATE-DISCIPLINE is in scope as `gates.md`'s mirror.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose; the drift checks are the mechanical guard

**Implementation Notes:**

Pattern: [[CORE-571]]'s `ft-goal-task` → `--loop` fold, the precedent for retiring a runner's carve-outs once the flag runs the body's own gates. Applied by kind, as the Best Practices Review laid out:

- **Routing retargeted** to `/ft-task <ID> --micro`: `post-closure.md` skill segment, `versioning.md`, `ft-file-task/SKILL.md` (report line, cohort routing), `park-mode.md` (context hint, routing, promotion), `step-5-loop-mode.md`.
- **Two-runner splits collapsed** to `/ft-task`: SPEC.md (Paper-complete guard, Model field), `gate-postures.md` (header, row-marker, `--fast` applies-to now names `--micro`, pre-scaffold, open-siblings, `/ft-close-epic` contrast, applies-to), `gates.md` / `model.md` / `tasknote-selection.md` / `plan-filing.md` headers and the plan-filing execution-skill list, `unattended-candidacy.md` row, `layout.md` namespace roster, `cue-vocabulary.md` 🎯 invocations, `blocked.md` interrupted-run refusal ("its two siblings" → `/ft-close-epic`), `preamble.md` / `step-1.5-model-edge.md` headers and `<SKILL>` lines, `ft-task/SKILL.md` SKILL_DIR list and Step 1 clause, `unattended-mode.md` header / runner references, `ft-open-epic` unsupported-flag list, `unattended-close-epic.md` L15 (undeclared; the same "the runners" phrasing), EXTERNAL-AGENTS step 1 ("Three skills" → "Two"; "fourth" → "third") and the capability-probes row, CAPABILITIES `--fast` / `--unattended` syntax cells.
- **Micro-only gate shapes deleted**: SPEC.md §"Phase 3" N/A clause; `gate-postures.md` External review paragraph; `post-closure.md` 🟢 GO carve-out and "📦 / 🟢 ask"; `gates.md` On-fire parenthetical and its `GATE-DISCIPLINE.md` mirror; `unattended-mode.md`'s map column (replaced by a one-line "`--micro` takes the `/ft-task` column as-is" note), the recap-carried 👁️ sentence, the dependency-park paragraph, the review paragraph, the `## ✅ Recap` persistence parenthetical, and the "own template" / "lets only its own park" clauses; `blocked.md` "not micro-aware" (now: the note's shape puts the resumed run in `--micro` mode); `subagent-probe-template.md`'s no-Acceptance clause; EXTERNAL-AGENTS review paragraph and `## ✅ Recap` persistence cell.
- **Additions**: 🪶 in `cue-vocabulary.md`'s non-cue residual; a `--micro` row in CAPABILITIES (the `--loop` row's shape); `micro-mode.md` named in PLATFORMS' fragment list; EXTERNAL-AGENTS row 97 now says the micro template carries the lede labels and names archived `/ft-micro-task` notes as the no-lede exception.
- **Counts**: PLATFORMS "Six tasknote skills" → Five (`--micro` named beside `--debug` / `--loop`), Claude bodies 12 → 11, Codex wrappers 12 → 11 (the Codex count is undeclared, found by grepping the file for stale counts; `ls codex/skills | wc -l` → 11); the scaffold sketch's example slug became `ft-file-task`.
- **Inlined** the preamble's `<suppressions>` parameter, which existed so a second runner could name its own clause.

Refactor: none beyond the above. Left alone on purpose: `micro-mode.md` L12, `step-7.1-mirror-pairs.md` L101 (CORE-554 history), and the `.5`-owned files.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` (the suite covering the checks these files feed); no code changed

- [x] Ran lint/type-check on changed code — N/A: markdown only; `bash tools/drift-checks.sh` is the markdown lint

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (HEAD `c20486f2` + working tree):

- A1 `git grep -n 'ft-micro-task' -- <in-scope set> | grep -v -e 'micro-mode.md:12:' -e 'EXTERNAL-AGENTS.md:97:'` → prints nothing (grep -v exit 1). First run printed two misses the Discovery read had truncated (`SPEC/plan-filing.md` L3 header; `EXTERNAL-AGENTS.md` L98 capability-probes row); both fixed, then re-run.
- A2 `git grep -n -E 'two runners|both runners|two siblings|two ID-invoked' -- SPEC.md SPEC/ claude/skills/ft-task/ docs/EXTERNAL-AGENTS.md` → exit 1 (no match).
- A3: the drafted command (`carve-out|or .*🟢 GO\)`) was too broad, since "carve-out" also names the legitimate De-scope drift carve-out. Tightened to `! grep -n -E 'ft-micro-task carve-out|\(or [^)]*🟢 GO\)|📦 / 🟢' SPEC/post-closure.md SPEC/gates.md docs/GATE-DISCIPLINE.md` → exit 0.
- A4 `grep -c '^| Gate | …(where it differs) |$' unattended-mode.md` → 1; `! grep -q 'not micro-aware' SPEC/blocked.md` → exit 0.
- A5 `grep -q '🪶 (`--micro` active)' SPEC/cue-vocabulary.md` → exit 0.
- A6 `grep -q '^| \*\*`--micro`\*\*' claude/CAPABILITIES.md` → exit 0.
- A7 `ls claude/skills | wc -l` → 11; the two PLATFORMS greps → exit 0.
- A8 (judgment): row 97 now matches `templates/tasknote-micro-template.md`, which ends `**Final Summary:**` / `**Archived:** YYYY-MM-DD` under `## ⚡ Notes`. Row 96 is unchanged in substance and still accurate.
- A9 `bash tools/drift-checks.sh` → 0 (every check `ok`, including `context_budget`, `pair_q`, `skill_pin_guard_parity`); `node --test tools/drift-checks.test.mjs` → 0 (19/19).

**Second pass** (after the review blocker, Phase 3 from the top): A1 (revised) → prints nothing; A2 (widened) → exit 1, no match; A3 → 0; A4 → 1 / 0; A5 → 0; A6 → 0; A7 → 11 / 0; A9 `bash tools/drift-checks.sh` → 0, `node --test tools/drift-checks.test.mjs` → 0 (19/19).

**External review** (`/code-review medium`, working-tree diff of this run only; nothing committed yet). 9 findings, graded against ✅ Acceptance:

1. **blocker** — `SPEC/blocked.md` L113: "resumes the same way" sent every micro park to Phase 1 Discovery, which contradicts `micro-mode.md` §"Step 2" (the Implementation line; Discovery only for `model-mismatch`). Fixed: the note's shape puts the run in `--micro`, and it continues at the log's matching line.
2. **blocker** (A2 / Goal) — `ft-file-task/SKILL.md` L168 "three runners". Fixed → "`/ft-task` and `/ft-close-epic`" (declared path).
3. **blocker** (A2 / Goal) — `SPEC/task-line-segments.md` L3 "the runners' shared `preamble.md`". Fixed → "`/ft-task`'s `preamble.md`" (undeclared path).
4. **blocker** (A2 / Goal) — `docs/PLATFORMS.md` L297 "every-run shared" preamble. Fixed.
5. note — subject/verb agreement left plural at `gate-postures.md` L89 / L250 and `unattended-mode.md` L82. Fixed.
6. note — CAPABILITIES `--unattended` "composes with … `--micro` in any order" overstated, since `--micro` refuses the other two. Fixed with the `flag-conflict` qualifier.
7. note — the `--debug` / `--loop` rows did not mention the `--micro` refusal. Fixed ("refused beside `--micro`").
8. note — A2's pattern was too narrow to back its claim. Widened; the new pattern catches 2–4.
9. note — A1 excluded leftovers by line number. Switched to content matching.

Structural: no duplication introduced. The deleted micro paragraphs had no other referent; the one new cross-reference (`micro-mode.md` §"Composition" / §"Step 2") resolves, per Pair Q.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `SPEC.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, and `docs/EXTERNAL-AGENTS.md` were updated as this task's deliverable (see Implementation Notes). The CAPABILITIES last-verified stamp is unchanged: it is re-verified at a version bump, and this is not one. `docs/AGENT-NEUTRALITY.md` and `docs/MIGRATION.md` carry no current carve-out that this child owns (AGENT-NEUTRALITY's micro ledger rows are [[CORE-778.5]]'s; MIGRATION's retired-skills row is correct history). No change: `README.md` (its micro mentions are [[CORE-778.5]]'s), `AGENTS.md` (the `--micro` flag line is current), the four `AGENTS-snippet.md` files ([[CORE-778.3]] cleaned them), `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md`. A grep found no micro mention in any of those files.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A for the always-loaded layer. The lesson is local to retiring a runner: grep for the *concept* (`runners'`, `three runners`, "shared" preamble), not only the runner's name. The name-only Acceptance grep missed three sites that the review caught.

**Final Summary:**

The contract layer now describes one runner. Every SPEC module, shared `ft-task` fragment, routing line, and caller / platform doc that split a rule between `/ft-task` and `/ft-micro-task`, routed to the retired skill, or carved out a micro-only gate shape now names `/ft-task` (with `--micro` where it matters). The micro-only shapes are deleted outright: no attended External review, review graded against Goal + PLAN row, 🟢 GO in place of 📦, the recap-carried 👁️ request, the "not designed to park" dependency park, and `## ✅ Recap` persistence.

- **Edited (27 files, +105 / −119):** `SPEC.md`; `SPEC/` `gate-postures` · `gates` · `post-closure` · `cue-vocabulary` (+🪶) · `blocked` · `model` · `plan-filing` · `unattended-candidacy` · `layout` · `versioning` · `tasknote-selection` · `task-line-segments`; `claude/skills/ft-task/` `SKILL` · `preamble` · `step-1.5-model-edge` · `step-5-loop-mode` · `unattended-mode` (map column dropped); `ft-file-task/` `SKILL` · `park-mode`; `ft-open-epic/SKILL`; `ft-close-epic/unattended-close-epic`; `templates/subagent-probe-template.md`; `docs/` `EXTERNAL-AGENTS` · `PLATFORMS` (counts 12 → 11 for both Claude bodies and Codex wrappers) · `GATE-DISCIPLINE`; `claude/CAPABILITIES.md` (new `--micro` row).
- **Decisions** (asserted, no ask): the stable-surface rows ride the unreleased v7.0.0; the preamble's `<suppressions>` parameter is inlined; GATE-DISCIPLINE is in scope as `gates.md`'s mirror; `preamble.md` / `step-1.5-model-edge.md` stay separate files.
- **Verification:** every Acceptance receipt passes on the second pass; `bash tools/drift-checks.sh` → 0; self-test 19/19. External review: 4 blockers (the `blocked.md` resume-point contradiction and three multi-runner leftovers), all fixed, Phase 3 re-run; 5 notes, all fixed.
- **`touches:` reconciliation:** two undeclared paths, `SPEC/task-line-segments.md` (review finding 3) and `claude/skills/ft-close-epic/unattended-close-epic.md` (the same "the runners" phrasing, found by the Phase 2 grep). Every declared path was edited.
- **Maintainability:** what remains outside the archive and VERSION-HISTORY is [[CORE-778.5]]'s (GLOSSARY, CONTEXT-BUDGET, AGENT-NEUTRALITY, CODEX-VERIFICATION, `tasknote-README.md`, `spec-template.md`) or correct history (MIGRATION row, `update-adopters` rename map, mirror-pairs L101, `micro-mode.md`'s legacy-note upgrade, EXTERNAL-AGENTS row 97's archived-note exception). Handoff to `.5`: CONTEXT-BUDGET L50 / L99 still call the preamble "shared with `/ft-micro-task`".

**Archived:** 2026-10-10
