---
title: micro-fold-in audit
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-778, CORE-778.1, CORE-778.2, CORE-778.3, CORE-778.4, CORE-778.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/procedures/ft-task.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-778.N | micro-fold-in audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-778]]

## 🎯 Goal

Verify the completed `CORE-EPIC-778` (`micro-fold-in`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-778` (Step 5), landing in the audit's closure commit — no misses; one inline fix
- [x] Single `feat: CORE-778.N — audit CORE-EPIC-778` (or `chore: ...` if no code edits land) commit lands — `chore:` (one SOP prose line, no code)
- [x] PLAN.md line for `CORE-778.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-778.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-778.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-778]] — parent epic
- [[CORE-778.1]] · [[CORE-778.2]] · [[CORE-778.3]] · [[CORE-778.4]] · [[CORE-778.5]] — audited cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator-invoked `/ft-close-epic CORE-778.N`; every implementation child (`.1`–`.5`) was `[x]` at audit time, all closed 2026-10-10 (`28aef8b8`, `0db364e4`, `c20486f2`, `9600bbfa`, `e6f38ace`). Full-cohort audit, no early-audit decision.

- [x] Read relevant source files — the five archived cohort notes, `micro-mode.md`, `step-0-flags.md`, and every `micro` line in the contract surfaces (`SPEC.md`, `SPEC/tasknote-selection.md`, `blocked.md`, `gate-postures.md`, `cue-vocabulary.md`, `procedures/ft-task.md`, `unattended-mode.md`, `ft-task/SKILL.md`, `CAPABILITIES.md`, `EXTERNAL-AGENTS.md`, `GLOSSARY.md`, `templates/tasknote-README.md`)

- [x] **Best Practices Review** — N/A: verification pass over shipped prose; no module boundary moves

- [x] **Archive skim** — self-referential (the cohort is the archive set, `CORE-*` → `archive/core/` per the README table); [[CORE-042.5]] (reversed decision) and [[CORE-571]] / [[CORE-769.3]] (fold and hard-cut precedents) already read by the children

- [x] **Drift check** — cohort-cited paths checked at HEAD `e6f38ace`: `claude/skills/ft-micro-task/` and `codex/skills/ft-micro-task/` absent; `ls claude/skills | wc -l` and `ls codex/skills | wc -l` → 11 each, matching PLATFORMS' counts; `templates/tasknote-micro-template.md`, `micro-mode.md` present

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: history rows (CONTEXT-BUDGET's CORE-724.4 rationale "shared by the two runners", MIGRATION's retired row, the rename map) describe past states and stay as written

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Cohort inventory:

- **[[CORE-778.1]] micro-fold-in discovery** — four-class surface inventory (39 files), resolved scoping (fold-in, spec-on-top shape, hard cut, M=4 sequential), Fan-out.
- **[[CORE-778.2]] micro-flag** — `--micro` on `/ft-task`: `step-0-flags.md` token / `--loop`+`--debug` refusal / 🪶 marker, new lazy `micro-mode.md`, rewritten `tasknote-micro-template.md` (lines 1–42 identical to the full template), body hooks at Steps 2 / 3b / 4 / 5, `<SKILL>` clauses, selection routing, rosters, SOP **micro mode** row. Superseded `.1`'s "template retires with the runner" by rewriting it in place.
- **[[CORE-778.3]] runner-retire** — deleted both `ft-micro-task` bodies; `SKILL_RENAME` fold entry under v7.0.0 + real-map test; MIGRATION row, recipe, §1.2; four snippet `ln -s` lines; `AGENTS.md` / snippet rosters; `skill_pin_guard_parity` 7 → 6; Pair C writer row.
- **[[CORE-778.4]] contract-reconcile** — 27 files: routing retargeted, two-runner splits collapsed, micro-only gate shapes deleted (🟢 GO, Recap persistence, review-against-Goal, dependency park); 🪶 into the non-cue residual; `--micro` row in CAPABILITIES; PLATFORMS counts 12 → 11; preamble `<suppressions>` inlined.
- **[[CORE-778.5]] docs-sweep** — GLOSSARY, CONTEXT-BUDGET, AGENT-NEUTRALITY, `tasknote-README.md`, `spec-template.md`; viz `--micro` parser fixture; "grep empty" met as an eight-file correct-history allowlist.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the audit pass; the inline fix mirrors [[CORE-778.4]]'s own `post-closure.md` edit word for word

- [x] **Minimal refactor gate** — one line changed; nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: one prose word removed

**Implementation Notes:**

**Coherence pass.**

- `ft-micro-task` grep outside VERSION-HISTORY and the archives still lists exactly `.5`'s eight-file allowlist (PLAN.md, `step-7.1-mirror-pairs.md`, `micro-mode.md`, CODEX-VERIFICATION, EXTERNAL-AGENTS, MIGRATION, both updater files). All are correct history.
- `--micro` reads the same everywhere it is defined: `step-0-flags.md` (refuses `--loop` / `--debug`; composes with `--fast` / `--unattended`), CAPABILITIES row, SOP mode row + composition lines, `micro-mode.md` §"Composition", `gate-postures.md` L115, `unattended-mode.md` L56. The blocked-resume point agrees across `micro-mode.md` §"Step 2", `blocked.md` L113–117, and `unattended-mode.md` L40 (the fragment names the Implementation-line override; the body's "Phase 2" defers to it). Template description matches across CAPABILITIES, GLOSSARY, `tasknote-README.md`, `tasknote-selection.md`, and EXTERNAL-AGENTS rows 96–97.
- Naming: the 🪶 marker, `micro-mode` boolean, `micro-mode.md` fragment, and "micro mode" SOP term are consistent; no surface still calls it "the one-shot" (fixed in `.3`).
- Concept grep (`two runners|both runners|runners'|three runners|two siblings|second runner|## ✅ Recap|📦 / 🟢|(or … 🟢 GO)`): the remaining hits are `micro-mode.md` L12 and EXTERNAL-AGENTS L97 (both about archived legacy notes, correct by design), CONTEXT-BUDGET L99 / L255 (history), and **one live miss** (below).
- v7.0.0 release hand-off from [[CORE-778.3]] ("the tag's Migration block should name the fold"): MIGRATION §"Upgrading to v7.0.0" already names the fold beside the four renames, so `/ft-release` will pick it up. Nothing to file.

**Inline fix (one).** `SPEC/procedures/ft-task.md` L499: "fire-branch 📦 / 🟢 ask" → "fire-branch 📦 ask". [[CORE-778.4]] made the same edit to `SPEC/post-closure.md` (the `/ 🟢` stood for `/ft-micro-task`'s 🟢 GO in place of 📦) but missed the SOP's mirror sentence, because its A3 grep did not include `SPEC/procedures/`.

**Misses filed:** none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs`, `node --test tools/update-adopters.test.mjs` (cohort regression guard); viz suite N/A (no viz change since `.5`'s green run)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (markdown lint and budgets); `node --check` on both updater files

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the diff is one removed word in a prose sentence, matching an already-reviewed [[CORE-778.4]] edit; too small to grade

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git grep -l ft-micro-task -- . ':!docs/VERSION-HISTORY.md' ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` → exactly the eight allowlisted files
- `bash tools/drift-checks.sh` → 0 (every check ok, incl. `context_budget`, `pair_j`, `pair_m`, `pair_q`, `skill_pin_guard_parity`)
- `node --test tools/drift-checks.test.mjs` → 0 (19 pass)
- `node --test tools/update-adopters.test.mjs` → 0 (79 pass, incl. the `ft-micro-task` fold test)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0
- `git diff --check` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `README.md` — no change (no micro or skill-count text). `AGENTS.md` — no change (the `--micro` flags line is current, KEEP IN SYNC with the snippet). `SPEC.md` — no change (L693 "micro-tasknote" pointer to `tasknote-selection.md` is current). `docs/MIGRATION.md` — no change (retired row, recipe, and §1.2 current; L280's micro pointer is current). `claude/AGENTS-snippet.md` — no change. `codex/` / `cursor/` / `grok/` `AGENTS-snippet.md` — no change (no micro text left). `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` — no change (no micro text). `docs/AGENT-NEUTRALITY.md` — no change (`.5` cleared its rows). `docs/PLATFORMS.md` — no change (Five tasknote skills / 11 bodies / 11 wrappers match `ls`). `claude/CAPABILITIES.md` — no change (`--micro` row agrees with `step-0-flags.md`; last-verified stamp is a version-bump item). `docs/AGENT-COMPAT.md` — no change. `docs/EXTERNAL-AGENTS.md` — no change (rows 96–97 match the template). `docs/WORKTREES.md`, `docs/VISION.md` — no change. Outside the set: `SPEC/procedures/ft-task.md` L499 updated (the inline fix).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Local lesson: a carve-out sweep over `SPEC/` should name `SPEC/procedures/` explicitly. The SOPs mirror skill and module prose sentence for sentence, and a grep scoped to `SPEC/*.md` misses them.

**Final Summary:**

The micro-fold-in cohort is coherent. `/ft-task --micro` is described the same way in every surface that defines it, the retired runner survives only in correct-history records, and every check passes. The audit found one leftover, fixed it inline, and filed no misses.

- **Inline fix:** `SPEC/procedures/ft-task.md` L499 drops the `/ 🟢` that stood for `/ft-micro-task`'s 🟢 GO. This mirrors [[CORE-778.4]]'s `post-closure.md` edit.
- **Verification:** `drift-checks.sh` 0; drift self-test 19/19; updater suite 79/79; `node --check` 0; the `ft-micro-task` allowlist grep is unchanged at eight files.
- **Doc-drift sweep:** no change across all 18 AI-referenced docs.
- **`touches:` reconciliation:** declared `SPEC/procedures/ft-task.md` + `.flaitron/PLAN.md`, and the diff edits those two plus this note.
- **Parent:** every child is now `[x]`, so this closure flips `CORE-EPIC-778` and moves the cohort to `## Completed`. The fold ships with the v7.0.0 major release.

**Archived:** 2026-10-10
