---
title: worktree-pair-demote
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-565.4, CORE-571]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/WORKTREES.md
  - claude/skills/ft-worktree-start/SKILL.md
  - claude/skills/ft-worktree-end/SKILL.md
  - claude/commands/ft-worktree-start.md
  - claude/commands/ft-worktree-end.md
  - codex/skills/ft-worktree-start/SKILL.md
  - codex/skills/ft-worktree-end/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - AGENTS.md
  - claude/skills/ft-flowtron/SKILL.md
  - SPEC/layout.md
  - SPEC/epic.md
  - SPEC/tasknote-inserts.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/EXTERNAL-AGENTS.md
  - docs/GLOSSARY.md
  - README.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-572 | worktree-pair-demote

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-565.4]] [[CORE-571]]

## 🎯 Goal

Decide whether `/ft-worktree-start` + `/ft-worktree-end` demote from bundled skills to the procedure in `docs/WORKTREES.md`, and execute the verdict.

## ✅ Acceptance

- [x] A1 Decision recorded: demote to the `docs/WORKTREES.md` procedure (not retire, not keep), with the rationale in Discovery — `judgment` (operator-confirmed via AskUserQuestion; the transcript is the receipt)
- [x] A2 The six shipped paths are gone — `test ! -e claude/skills/ft-worktree-start -a ! -e claude/skills/ft-worktree-end -a ! -e claude/commands/ft-worktree-start.md -a ! -e claude/commands/ft-worktree-end.md -a ! -e codex/skills/ft-worktree-start -a ! -e codex/skills/ft-worktree-end`
- [x] A3 `docs/WORKTREES.md` carries a `## Procedure` section naming `git worktree add` and `git worktree remove` — `grep -q '^## Procedure' docs/WORKTREES.md && grep -q 'git worktree add' docs/WORKTREES.md && grep -q 'git worktree remove' docs/WORKTREES.md`
- [x] A4 No live `ft-worktree` reference (full slugs or the `ft-worktree-{start,end}` brace form) remains outside the archive, `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, the `docs/MIGRATION.md` retired-skills rows, and `docs/WORKTREES.md` history lines — `grep -rn --exclude-dir=archive --exclude-dir=.git --exclude-dir=node_modules 'ft-worktree' . | grep -v -e 'VERSION-HISTORY' -e 'PLAN-ARCHIVE' -e 'MIGRATION.md.*| v5' -e 'WORKTREES.md.*CORE-572' -e 'tasknote/CORE-572.md' -e 'CONTEXT-BUDGET.md' -e 'PLAN.md:.*CORE-572'` prints nothing
- [x] A5 Symlink-roster derivation still agrees across the four snippets — the five `diff -u` blocks in `claude/skills/ft-release/step-7.1-standing-checks.md` §symlink roster print nothing
- [x] A6 `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains `ft-worktree-start` and `ft-worktree-end` rows — `grep -q '| \`ft-worktree-start\` |' docs/MIGRATION.md && grep -q '| \`ft-worktree-end\` |' docs/MIGRATION.md`
- [x] A7 Shipped-skill parity holds: `claude/skills` ↔ `codex/skills` ↔ `claude/commands` slug sets identical, and Pair E (`ft-flowtron` roster ↔ shipped skills) prints nothing — run both from `step-7.1-standing-checks.md` / `step-7.1-mirror-pairs.md`
- [x] A8 Local self-wiring check passes after the four gitignored `.claude/` links (2 skills + 2 commands) are removed — `diff <(ls claude/skills) <(ls .claude/skills)` and `diff <(ls claude/commands) <(ls .claude/commands)` print nothing

## 🧩 Subtasks

- [ ] Rewrite `docs/WORKTREES.md`: "Skill naming" locked-convention row → demoted-by-CORE-572 note; §"Start / End Flow (Conceptual)" → `## Procedure` with the start commands, end commands, and three safety rules (main checkout only · collision check before `add` · merged-or-explicit-discard before `remove`) + one-sentence warn-only `blocked-by`; §"Adopter wiring" bullet
- [ ] Delete the six shipped paths + `rm` the two gitignored `.claude/` links
- [ ] Symlink rosters: drop 10 `ln -s` lines across the four `AGENTS-snippet.md`; rewrite the "worktree pair" prose in each; re-point `claude/AGENTS-snippet.md:21` at the doc
- [ ] Rosters: `AGENTS.md`, `ft-flowtron` (two rows), `SPEC/layout.md`, `docs/PLATFORMS.md` (`:35/74/75/264/268`, `:267` count), `docs/MIGRATION.md` (`:63/226/487` + two retired rows), `README.md` (`:49/102-105`)
- [ ] Behavior mentions skill → procedure: `docs/EXTERNAL-AGENTS.md`, `SPEC/epic.md:83`, `SPEC/tasknote-inserts.md:42`, `docs/GLOSSARY.md:147`
- [ ] Release gate: re-point the Pair J prose example in `step-7.1-mirror-pairs.md:197`
- [ ] Verify: A2–A8 commands, repo-wide residue grep

## 🔗 Related

- [[CORE-565.4]] — filed this task (roster-onboarding-value audit surfaced the never-used pair)
- [[CORE-571]] — related-decision: sibling demote decision (`--loop` goal-task), same filing source and shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The evidence line re-verifies at HEAD `5d9df85`: `git for-each-ref` → 0 `wt-` refs, `git reflog` → 0, `git log --all --merges` → 0 merge commits, `git worktree list` → main only; the 5 `git log --all` hits naming the pair are all authoring commits (CORE-215.3/.4/.5, CORE-279 ×2). `worktree` appears once in PLAN.md (this row). The 44 archive notes naming the skills are authoring, roster, or flag-propagation work — none records a `Worktree created for` handoff outside CORE-215. The sibling decision [[CORE-571]] just landed the same shape (demote, sweep in-task) one commit ago, and its sweep already stripped the only runner-side consumer (`--worktree`), so the pair now has zero callers.

- [x] Read relevant source files — `claude/skills/ft-worktree-{start,end}/SKILL.md`, both stubs, both Codex wrappers, `docs/WORKTREES.md`, and every live mention site (grep list in Notes); narrow enough to read directly, no probe

- [x] **Best Practices Review** — see Notes; a demote *removes* two bodies that restate `docs/WORKTREES.md` §"Start / End Flow" with shell wrapping, and moves the three safety rules worth keeping into the doc

- [x] **Archive skim** — 44 notes name the pair (`grep -l`); read the load-bearing ones directly: [[CORE-565.4]] (filing + evidence), [[CORE-571]] (precedent sweep, one commit ago), [[CORE-279]] (end-skill hardening — Proceed, edits only), [[CORE-485]] (`WT_ROOT` genericized — Proceed, edits only). The rest are roster/flag-propagation notes. No ⚠️ pointers on any of them.

- [x] **Drift check** — see Notes; PLAN row claims hold; no SPEC contradiction (SPEC.md never names the pair; `SPEC/epic.md:83` and `SPEC/tasknote-inserts.md:42` name the start *warn*, a behavior the doc procedure can carry)

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — AskUserQuestion (three questions): **Decision = demote to the doc procedure**; **Doc depth = compact procedure** (~30 lines: commands + three safety rules + one-sentence warn-only `blocked-by`; the orphan scan, ahead-count, and handoff block are not ported); **Scope = execute the sweep here** (CORE-571 precedent). Assumptions: the convention and its five locked decisions stay, with the "Skill naming" row annotated rather than deleted; the retired-skills rows name `v5.27.0` (same unreleased minor as `ft-goal-task`); `docs/CONTEXT-BUDGET.md`'s ledger is left for the release re-measure; `README.md:238` and the `docs/EXTERNAL-AGENTS.md` "one agent, one tasknote, one worktree" rule are convention prose and stay.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Evidence re-check (HEAD `5d9df85`, 2026-09-10).** Zero `wt-` refs / reflog entries / merge commits; no live worktree; five authoring commits name the pair. The PLAN row's "3.5 months shipped" holds: first shipped `aa30e11` (CORE-215.3, 2026-05-29). Adopter side per [[CORE-565.4]] §B: `worktree` absent from the measured adopter's PLAN, no `wt-` there either.

**What the skills actually do.** Start: preconditions (main checkout, clean-ish, tasknote exists, warn-only `blocked-by`), collision checks (branch / dir / stale registration), then `git checkout -b wt-<ID>` · `git worktree add` · `cp` tasknote (+ README) · handoff block. End: preconditions, orphan `wt-*` scan, merged-or-explicit-discard gate with ahead-count, `cp` the copied archive back, `git worktree remove`, optional `git branch -D`, summary. 12,008 + 12,598 chars of shell wrapping around four commands each. `docs/WORKTREES.md` §"Start / End Flow (Conceptual)" already lists the same four steps and points at the skills for "exact mechanics, safety checks, and edge cases" — under demote, that pointer becomes a short §"Procedure" block carrying the commands and the three rules worth keeping (main checkout only · collision check before add · merged-or-explicit-discard before remove).

**Sweep surface (under demote).**
- *Delete (6 paths):* `claude/skills/ft-worktree-start/SKILL.md`, `claude/skills/ft-worktree-end/SKILL.md`, `claude/commands/ft-worktree-start.md`, `claude/commands/ft-worktree-end.md`, `codex/skills/ft-worktree-start/SKILL.md`, `codex/skills/ft-worktree-end/SKILL.md`. Plus the two gitignored repo-local `.claude/{skills,commands}/ft-worktree-*` links (`rm` so the release self-wiring check passes — CORE-571 precedent).
- *Symlink rosters (10 `ln -s` lines, not four):* `claude/AGENTS-snippet.md:104-107` (2 commands + 2 skills — the "four" the row counts), `codex/AGENTS-snippet.md:40-41`, `cursor/AGENTS-snippet.md:55-56`, `grok/AGENTS-snippet.md:59-60` — same class CORE-571 found. Prose "worktree pair" in `claude/:118`, `codex/:27`, `cursor/:76`, `grok/:81`; `claude/:21` Workflow bullet names the convention (keep, re-point at the doc).
- *Rosters:* `AGENTS.md:20-21`, `claude/skills/ft-flowtron/SKILL.md:52-53` (two rows), `SPEC/layout.md:96`, `docs/PLATFORMS.md:35/74/75/264/268` + counts `:118` (historical, measured 2026-08-11 — leave) and `:267` (`18 SKILL.md` → 16), `docs/MIGRATION.md:63/226/487` + retired-skills table `:531` (two new rows, `v5.27.0`), `README.md:49/102-105`.
- *Behavior mentions (rewrite skill → procedure):* `docs/EXTERNAL-AGENTS.md:35/37/53/111`, `SPEC/epic.md:83`, `SPEC/tasknote-inserts.md:42`, `docs/GLOSSARY.md:147`.
- *Release gate:* `step-7.1-mirror-pairs.md:197` Pair J prose example cites `ft-worktree-start.md` and "both worktree stubs" (CORE-571 re-pointed it here from `ft-goal-task.md`) → re-point at a surviving stub. Pair E (`ft-flowtron` roster ↔ shipped skills) and the symlink-roster `diff -u` in `step-7.1-standing-checks.md` derive from the files, so they pass once rosters and files move together.
- *`docs/WORKTREES.md`:* §"Five Locked Conventions" row "Skill naming" → record the demote here (the doc's own rule: "Future changes require a new tasknote + rationale" — this is it); §"Start / End Flow" → absorb the mechanics; §"Adopter wiring" bullet; §"Relationship" pointers to `.3`/`.4` stay as history.
- *Left alone, deliberately:* `docs/CONTEXT-BUDGET.md:129` ledger (release-refreshed), `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, `docs/AGENT-NEUTRALITY.md:121` (CORE-571 history note), `README.md:238` + `docs/EXTERNAL-AGENTS.md:13/39` (name the convention, not the skills), `SPEC/epic.md:43/77`, `SPEC/tasknote-inserts.md:13/35`, `docs/VISION.md:48`, `docs/GLOSSARY.md:95` (convention prose — unchanged under demote).

**Best-practices review.** No code; the touched responsibility is "how an operator isolates an epic child." Today it is split three ways: the convention (doc), the executable interpretation (two 12k bodies), and the roster/wiring surfaces (≈10 files). The two bodies restate the doc's four-step flow with shell and add safety checks the doc only gestures at — a duplication the precedent ([[CORE-390]], [[CORE-571]]) resolved by keeping the contract and dropping the runner. Dependency direction stays: the doc is the SSOT; nothing else depends on the skill bodies now that `--worktree` is gone. No in-scope refactor beyond the demote; no deferred cleanup surfaced.

**Drift.** PLAN row: "two bodies" ✓ (12,008 / 12,598), "four symlinks" — four in `claude/AGENTS-snippet.md`, ten across all four snippets (same class as CORE-571's finding; not a contradiction), "two roster rows" ✓ (`ft-flowtron:52-53`; also `AGENTS.md`, `SPEC/layout.md`, PLATFORMS — same class), "no wt- branch, reflog entry, or merge commit" ✓ re-verified above, "none in the adopter" — per 565.4 §B, not re-measured here (cross-repo). Cross-artifact: SPEC.md names neither skill; `docs/WORKTREES.md` "Skill naming" is a locked convention whose own escape clause is a new tasknote with rationale. No `Blocked by`; CORE-571's reconcile already dropped the sequencing clause.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — retire-and-record, the shape [[CORE-571]] and [[CORE-390]] established: delete the runner surfaces, keep the contract, add retired-skills rows, leave append-only history alone

- [x] **Minimal refactor gate** — no refactor beyond the demote; the doc's §"Start / End Flow (Conceptual)" was replaced rather than appended to, since its whole purpose was to point at the skills

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code; the release standing checks are the tests and ran green (Phase 3)

**Implementation Notes:**

**Doc.** `docs/WORKTREES.md` (80 → 100 lines, 9,311 chars): intro re-pointed; "Skill naming" locked row now records the demote with the CORE-572 rationale; §"Start / End Flow (Conceptual)" replaced by `## Procedure` — start block (collision checks, `git worktree add -b`, two `cp`), the warn-only `blocked-by` sentence + handoff, end block (merged check, ahead-log, archive `cp`, `worktree remove`, optional `branch -D`), the three rules, one orphan-scan sentence; Fan-out table row, "Adopter wiring" bullet, and the Open-Questions / Related trailers updated. Not ported, per the operator's depth choice: the stale-registration prune branch, the ahead-count prose, the handoff block, the end-summary block. One latent bug in the old start skill fell away with it: it ran `git checkout -b` *then* `git worktree add <dir> <branch>`, which git refuses because the branch is already checked out in main — `add -b` does both in one step.

**Deleted (6 tracked + 4 gitignored).** `claude/skills/ft-worktree-{start,end}/SKILL.md`, `claude/commands/ft-worktree-{start,end}.md`, `codex/skills/ft-worktree-{start,end}/SKILL.md`; the four repo-local `.claude/{skills,commands}/ft-worktree-*` links `rm`'d so the release self-wiring check passes.

**Sweep (21 tracked files incl. deletions).** Symlink rosters: ten `ln -s` lines dropped across `claude/` (4) · `codex/` · `cursor/` · `grok/` (2 each) `AGENTS-snippet.md`, "worktree pair" prose rewritten in all four, `claude/:21` Workflow bullet re-pointed at the doc. Rosters: `AGENTS.md`, `ft-flowtron` (two rows), `SPEC/layout.md`, `docs/PLATFORMS.md` (three policy cells, two inventory lists, 18 → 16 twice), `docs/MIGRATION.md` (§1.2 sentence, §"complete surface" parenthetical, §1.7 verify note, `ft-goal-task` row's worktree clause, two new retired rows `v5.27.0`), `README.md` (adopter-subset sentence, WORKTREES entry). Behavior mentions skill → procedure: `docs/EXTERNAL-AGENTS.md` ×4, `SPEC/epic.md`, `SPEC/tasknote-inserts.md`, `docs/GLOSSARY.md`, `docs/VISION.md` (missed by the Discovery grep's 260-col cut; caught by the A4 residue grep). Loader / ledger rosters in the brace form: `SPEC/tasknote-selection.md:7` header, `docs/AGENT-NEUTRALITY.md:39` skill-names cell (caught by the Phase 4 doc-drift sweep). `.flowtron/tasknote/README.md` AI-referenced-docs row for WORKTREES. Release gate: Pair J prose example re-pointed from `ft-worktree-start.md` to `ft-micro-task.md`'s `` `/ft-task --fast` `` span and the "no slug" example narrowed to `ft-close-epic.md`.

**Left alone, deliberately.** `docs/CONTEXT-BUDGET.md:129` ledger (release-refreshed), `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, `docs/AGENT-NEUTRALITY.md:121` (CORE-571 history), `docs/PLATFORMS.md:118` (a dated 2026-08-11 measurement), convention prose that names worktrees but no skill (`README.md:237`, `docs/EXTERNAL-AGENTS.md:13/39`, `SPEC/epic.md:43/77`, `SPEC/tasknote-inserts.md:13/35`, `docs/GLOSSARY.md:95`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown only; the release standing checks below are the suite

- [x] Ran lint/type-check on changed code — N/A, no code

- [x] **Verification receipt** — see Testing Notes

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
A1 decision — judgment: AskUserQuestion answered "Demote to doc procedure" (transcript)
A2 test ! -e <six paths>                                              → 0
A3 grep -q '^## Procedure' && 'git worktree add' && 'git worktree remove' → 0
A4 residue grep on bare `ft-worktree` (exclusions per criterion)      → prints nothing (grep exit 1)
A5 symlink-roster derivation, five diff -u blocks                     → 0 0 0 0 0, all empty
A6 grep -q retired rows ft-worktree-start / ft-worktree-end            → 0
A7 parity claude/skills ↔ codex/skills ↔ claude/commands              → 0 0, empty
A7 Pair E ft-flowtron roster ↔ shipped skills                          → 0, empty
A8 self-wiring claude/{skills,commands} ↔ .claude/{skills,commands}   → 0 0, empty
```

Pairs B / I / J / M not re-run: the deleted stubs declared no flags and no `argument-hint:`, so the flag rosters those pairs guard are byte-identical to CORE-571's green run; the Pair J edit is prose in the rationale bullet, not the check. A4 surfaced one site the Discovery grep had truncated away (`docs/VISION.md:48`), and the Phase 4 sweep surfaced two more in the brace form `ft-worktree-{start,end}` (`SPEC/tasknote-selection.md:7`, `docs/AGENT-NEUTRALITY.md:39`) that the original full-slug pattern could not match — A4 was widened to the bare `ft-worktree` stem and re-run; all three fixed before the receipt above.

Structural: no duplication introduced (two 12k bodies restating the doc's four steps are gone); no dead code (six deleted paths, no orphan fragment, no orphan wrapper); public surface shrank by two skills and grew by nothing; code-facing docs updated in the same diff (four snippets, PLATFORMS inventories, retired-skills rows, README AI-referenced row).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` updated (adopter-subset sentence, WORKTREES entry) · `AGENTS.md` updated (roster) · `SPEC.md` no change (names worktrees at :164/:283 as a concept, no skill) · `docs/MIGRATION.md` updated (§1.2, surface parenthetical, §1.7 note, `ft-goal-task` row clause, two retired rows) · `claude/AGENTS-snippet.md` updated (Workflow bullet, four `ln -s` lines, subset sentence) · `codex/` `cursor/` `grok/` `AGENTS-snippet.md` updated (two `ln -s` lines + subset prose each) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` updated (skill-names cell of the tasknote-selection ledger row; :121 CORE-571 history left) · `docs/PLATFORMS.md` updated (three policy cells, two inventories, 18 → 16) · `claude/CAPABILITIES.md` no change (never named the pair) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` updated (four skill → procedure sites) · `docs/WORKTREES.md` updated (the deliverable) · `docs/VISION.md` updated (one warn sentence) — plus `.flowtron/tasknote/README.md`'s own WORKTREES row

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Decided **demote**: the `/ft-worktree-start` + `/ft-worktree-end` pair is gone and `docs/WORKTREES.md` §"Procedure" is now the executable form of the unchanged convention — the start and end commands, the three safety rules they encoded, and the warn-only `blocked-by` read, in ~45 lines where the two bodies spent 24,606 chars. Three and a half months with no `wt-` branch in this repo or the adopter's said nobody reaches for a skill to run `git worktree add`; the [[CORE-571]] / [[CORE-390]] retire-and-record shape let the convention survive at zero roster cost.

- **Files:** 6 deleted (two skill bodies, two stubs, two Codex wrappers), 20 edited (the doc, four `AGENTS-snippet.md`, `AGENTS.md`, `ft-flowtron`, `SPEC/layout.md`, `SPEC/epic.md`, `SPEC/tasknote-inserts.md`, `SPEC/tasknote-selection.md`, `docs/PLATFORMS.md`, `docs/MIGRATION.md`, `docs/EXTERNAL-AGENTS.md`, `docs/GLOSSARY.md`, `docs/VISION.md`, `docs/AGENT-NEUTRALITY.md`, `README.md`, `step-7.1-mirror-pairs.md`, `.flowtron/tasknote/README.md`), plus PLAN + this note. Four gitignored `.claude/` links removed locally.
- **Verification:** A1 judgment (operator-confirmed); A2–A8 all exit 0 with empty diffs (Testing Notes); the widened A4 stem grep caught three sites the full-slug pattern missed.
- **Refactors:** none beyond the demote; the old start skill's `checkout -b` → `worktree add` sequencing bug (git refuses a branch already checked out in main) fell away with the body — the procedure uses `add -b`.
- **Documentation:** the doc-drift sweep touched 13 of 18 AI-referenced docs; `docs/CONTEXT-BUDGET.md` ledger left for the release re-measure, `docs/VERSION-HISTORY.md` / `PLAN-ARCHIVE.md` append-only.
- **`touches:` reconciliation:** declared 22, changed 26 (excluding this note and PLAN). Undeclared: `SPEC/tasknote-selection.md`, `docs/AGENT-NEUTRALITY.md` (brace-form rosters), `docs/VISION.md` (truncated by the Discovery grep), `.flowtron/tasknote/README.md` (AI-referenced row) — all four are the same demote sweep, found by the widening residue check.
- **Maintainability:** roster 18 → 16 skills; adopter symlink block 4 lines shorter (10 across the four platforms); one fewer release-gate example pointing at a body that could vanish; the worktree convention now has exactly one executable home. Adopters see the dangling links at their next `/ft-update` and the retired-skills rows name the replacement.

**Archived:** 2026-09-10
