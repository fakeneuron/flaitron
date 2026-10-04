---
title: ft-spec-demote
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-565.4, CORE-571, CORE-572]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - templates/spec-template.md
  - SPEC/tasknote-selection.md
  - SPEC/layout.md
  - SPEC/gates.md
  - claude/skills/ft-spec/SKILL.md
  - claude/commands/ft-spec.md
  - codex/skills/ft-spec/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - AGENTS.md
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/commands/ft-refactor.md
  - claude/CAPABILITIES.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/GLOSSARY.md
  - docs/AGENT-NEUTRALITY.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-573 | ft-spec-demote

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-565.4]] · 🔗 [[CORE-571]] · 🔗 [[CORE-572]]

## 🎯 Goal

Decide whether `/ft-spec` demotes from a bundled skill to `templates/spec-template.md` plus the routing paragraph in `SPEC/tasknote-selection.md`, and execute the verdict.

## ✅ Acceptance

- [x] A1 Decision recorded: demote to `templates/spec-template.md` + the `SPEC/tasknote-selection.md` routing paragraph (not retire, not keep), rationale in Discovery — `judgment` (operator-confirmed via AskUserQuestion; the transcript is the receipt)
- [x] A2 The three shipped paths are gone — `test ! -e claude/skills/ft-spec -a ! -e claude/commands/ft-spec.md -a ! -e codex/skills/ft-spec`
- [x] A3 `templates/spec-template.md` survives and no longer names the skill; the routing block in `SPEC/tasknote-selection.md` names the template and the write target — `test -f templates/spec-template.md && ! grep -q 'ft-spec' templates/spec-template.md && grep -q 'spec-template.md' SPEC/tasknote-selection.md && grep -q '.flowtron/specs/<slug>.md' SPEC/tasknote-selection.md`
- [x] A4 No live `ft-spec` reference remains outside the archive, `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, `.flowtron/specs/`, `docs/CONTEXT-BUDGET.md`, the `docs/MIGRATION.md` retired-skills row + §1.7 note, the CORE-573 history clauses (`SPEC/tasknote-selection.md`, `step-7.1-mirror-pairs.md`), and the two dated wiring-miss anecdotes (`docs/PLATFORMS.md`, `step-7.1-standing-checks.md`) — `git grep -n 'ft-spec' -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!docs/VERSION-HISTORY.md' ':!.flowtron/specs' ':!docs/CONTEXT-BUDGET.md' ':!.flowtron/tasknote/CORE-573.md' | grep -v -e 'MIGRATION.md:.*| v5' -e 'MIGRATION.md:.*CORE-573' -e 'PLATFORMS.md:.*exact gap' -e 'standing-checks.md:.*CORE-352.2' -e 'PLAN.md:.*CORE-573' -e 'tasknote-selection.md:.*CORE-573' -e 'mirror-pairs.md:.*CORE-573' -e 'mirror-pairs.md:.*since-retired'` prints nothing
- [x] A5 Symlink-roster derivation still agrees across the four snippets — the `diff -u` blocks in `claude/skills/ft-release/step-7.1-standing-checks.md` §symlink roster print nothing
- [x] A6 `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains an `ft-spec` row — `grep -q '| \`ft-spec\` |' docs/MIGRATION.md`
- [x] A7 Shipped-skill parity holds: `claude/skills` ↔ `codex/skills` ↔ `claude/commands` slug sets identical, and Pair E (`ft-flowtron` roster ↔ shipped skills) prints nothing — run both from `step-7.1-standing-checks.md` / `step-7.1-mirror-pairs.md`
- [x] A8 Local self-wiring check passes after the two gitignored `.claude/` links are removed — `diff <(ls claude/skills) <(ls .claude/skills)` and `diff <(ls claude/commands) <(ls .claude/commands)` print nothing
- [x] A9 `git diff --check` → 0

## 🧩 Subtasks

- [ ] Rewrite the spec block in `SPEC/tasknote-selection.md` §"When to use a tasknote": heading → "Draft a spec (`templates/spec-template.md`)"; the `/ft-spec` peer paragraph → a hand procedure (copy to `.flowtron/specs/<slug>.md`, fill six sections, review before filing from Tasks); drop `/ft-spec` from the §"Filing commits" execution-skill list
- [ ] `templates/spec-template.md:42` — reword the `/ft-spec` never-files clause to the hand form
- [ ] Delete the three shipped paths + `rm` the two gitignored `.claude/` links
- [ ] Symlink rosters: drop 5 `ln -s` lines across the four `AGENTS-snippet.md`; rewrite the `claude/` spec bullet (`:26`) to point at the template + routing paragraph
- [ ] Rosters: `AGENTS.md:16`, `ft-flowtron` (one row), `SPEC/layout.md` (`:22` comment, `:95` namespace list), `docs/PLATFORMS.md` (`:35/74/75/263/264` + `15` → `14` counts), `docs/MIGRATION.md` (`:63` incl. the CORE-572 worktree residue, `:487`, retired row `v5.27.0`)
- [ ] Carve-outs and comparisons: `SPEC/gates.md:351`, `claude/CAPABILITIES.md:30`, `claude/skills/ft-refactor/SKILL.md` (`:10/:122/:224/:232`), `claude/commands/ft-refactor.md:13`, `docs/GLOSSARY.md:69`, `docs/AGENT-NEUTRALITY.md:39`
- [ ] Release gate: `step-7.1-mirror-pairs.md:48` template row "Written by" → by hand; `:108` Pair J prose example → a surviving stub
- [ ] Verify: A2–A9 commands, repo-wide residue grep

## 🔗 Related

- [[CORE-565.4]] — filed this task (roster-onboarding-value pass of the harness-value-review epic)
- [[CORE-571]] — related-decision: goal-task-demote, sibling demote verdict from the same epic
- [[CORE-572]] — related-decision: worktree-pair-demote, sibling demote verdict from the same epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The evidence line re-verifies at HEAD `33da4d3`: `.flowtron/specs/` holds one file, written 2026-07-12 by [[CORE-352.5]] (the skill's own dogfood) and never touched since; skill and template shipped the same day (`a19ffeb`). The body is 7,717 chars — the smallest in the roster — and every step it encodes (parse `--fast`, gather a brief, fill the six template sections, ask before writing, `mkdir -p` + write, hand off) is what an agent handed the template and the routing paragraph does conversationally. The two sibling decisions [[CORE-571]] / [[CORE-572]] landed the same demote-and-sweep shape one and two commits ago, so the retire-and-record pattern is fresh.

- [x] Read relevant source files — `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`, `templates/spec-template.md`, `SPEC/tasknote-selection.md` §"When to use a tasknote" + §"Filing commits", and every live mention site (`git grep` list in Notes); narrow enough to read directly, no probe

- [x] **Best Practices Review** — see Notes; a demote removes a body that restates the template's own preamble and the routing paragraph with a review-pause wrapper

- [x] **Archive skim** — 48 archive notes name the skill (`git grep -l`); the load-bearing ones read directly: [[CORE-565.4]] (filing + evidence, §B row), [[CORE-572]] and [[CORE-571]] (precedent sweeps, the exact surface list), [[CORE-570]] (touched `ft-spec` SKILL/stub only as roster neighbours; names this task as a sibling). The rest are roster / flag-propagation / Pair-J notes ([[CORE-352.x]] authored it; [[CORE-463.x]] added `/ft-refactor` beside it). No ⚠️ pointers on any of them.

- [x] **Drift check** — see Notes; PLAN row claims hold; no SPEC contradiction (`SPEC.md` never names the skill; the module mentions are routing prose and one `--fast` carve-out, both of which the demote removes rather than contradicts)

- [x] Asked clarifying questions — AskUserQuestion (three): **Decision = demote to template + routing paragraph**; **Scope = execute the sweep here** (CORE-571/572 precedent); **Residue = fix the CORE-572 leftover on `docs/MIGRATION.md:63` in passing** (same sentence block). Assumptions: the retired-skills row names `v5.27.0` (same unreleased minor as the three rows already there); `.flowtron/specs/` stays in the `SPEC/layout.md` tree as an optional hand-written dir; the two dated wiring-miss anecdotes (`docs/PLATFORMS.md:94`, `step-7.1-standing-checks.md:70`) stay as history the way CORE-572 left `docs/AGENT-NEUTRALITY.md:121`; `docs/CONTEXT-BUDGET.md`'s ledger is left for the release re-measure; the dogfood spec `.flowtron/specs/spec-to-work-handoff.md` is project data and stays.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (21 paths)

**Discovery Notes:**

**Evidence re-check (HEAD `33da4d3`, 2026-09-10).** `ls .flowtron/specs/` → one file, `spec-to-work-handoff.md`, mtime 2026-07-12; `git log -- .flowtron/specs/` → one commit (`181ffaf`, CORE-352.5). Skill body first landed `a19ffeb` (CORE-352.2, 2026-07-12). Sizes: `SKILL.md` 7,717 · stub 1,882 · Codex wrapper 467 · template 2,298. Adopter side per [[CORE-565.4]] §B: no `specs/` dir in the measured adopter.

**What the skill actually does.** Step 0 path resolve · Step 1 parse `--fast` (its own, unrelated to the runner flag — a carve-out `SPEC/gates.md:351` and `claude/CAPABILITIES.md:30` both have to explain) · Step 2 gather a brief from args/conversation, ask one question if thin · Step 3 fill the template's six sections + frontmatter · Step 4 review pause (skipped under `--fast`) · Step 5 `mkdir -p .flowtron/specs` + write · Step 6 hand off naming the conversion skills. The template's own preamble already says it is optional, living markdown, files nothing; the routing paragraph already says when to reach for one and how to convert its Tasks section. What the skill adds is the review-pause wrapper and the `--fast` bypass — a wrapper for a motion that has happened once.

**Sweep surface (under demote).**
- *Delete (3 paths):* `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`. Plus the two gitignored repo-local `.claude/{skills/ft-spec,commands/ft-spec.md}` links (`rm` so the release self-wiring check passes — CORE-571/572 precedent).
- *Symlink rosters (5 `ln -s` lines):* `claude/AGENTS-snippet.md:104-105` (stub + skill), `codex/AGENTS-snippet.md:36`, `cursor/AGENTS-snippet.md:51`, `grok/AGENTS-snippet.md:55`. Prose: `claude/AGENTS-snippet.md:26` spec bullet → re-point at the template + routing paragraph.
- *Rosters:* `AGENTS.md:16` peer list, `claude/skills/ft-flowtron/SKILL.md:46` (one row), `SPEC/layout.md:22` (tree comment) + `:95` (namespace list), `docs/PLATFORMS.md:35/74/75` (policy cells) + `:263-264` (inventory lists; `15` → `14` twice), `docs/MIGRATION.md:63` (§1.2 short-version sentence — also drops the stale "worktree pair are thin procedural utilities" clause CORE-572 left) + `:487` (§1.7 verify note) + retired-skills table (one new row, `v5.27.0`).
- *Routing + template (the surviving home):* `SPEC/tasknote-selection.md:25-36` — heading and peer paragraph become the hand procedure; `:250` drops `/ft-spec` from the execution-skill list. `templates/spec-template.md:42` — "run the named skill yourself; `/ft-spec` never files" → "conversion stays yours; a spec files nothing".
- *Carve-outs and comparisons (rewrite skill → template/spec):* `SPEC/gates.md:351-354` (drop the unrelated-`--fast` sentence), `claude/CAPABILITIES.md:30` (narrow to `/ft-refactor`), `claude/skills/ft-refactor/SKILL.md:10/122/224/232` + `claude/commands/ft-refactor.md:13` ("planning peer" comparisons → the spec template), `docs/GLOSSARY.md:69` (contrast clause), `docs/AGENT-NEUTRALITY.md:39` (ledger cell: section list + skill-names list).
- *Release gate:* `step-7.1-mirror-pairs.md:48` template row "Written by `/ft-spec`" → "by hand (no skill since CORE-573)"; `:108` Pair J prose example cites `ft-spec.md` as the stub naming `--park` without a roster → re-point at a surviving stub that does the same (`ft-refactor.md` names neither; check `ft-epic-discovery.md` / `ft-task.md` at execution and pick the one that matches the guard's premise, else reword the example to a hypothetical).
- *Left alone, deliberately:* `docs/CONTEXT-BUDGET.md:131` ledger (release-refreshed), `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, `.flowtron/specs/spec-to-work-handoff.md` (project data; names the skill as history), `docs/PLATFORMS.md:94` + `step-7.1-standing-checks.md:70` (dated wiring-miss anecdotes explaining why the self-wiring check exists), `README.md:282` (names "spec" among the templates — still true).

**Best-practices review.** No code; the touched responsibility is "capture a design before decomposing it." Today it is split three ways: the template (the artifact), the routing paragraph (when), and a 7.7k body (how — copy, fill, ask, write). The body restates the first two and adds a review pause; the precedent ([[CORE-571]], [[CORE-572]]) resolved this split by keeping the contract surface and dropping the runner. Dependency direction after the demote: the routing paragraph names the template; nothing else reads `.flowtron/specs/` (the skill's own Step 5 says so). No in-scope refactor beyond the demote; no deferred cleanup surfaced beyond the CORE-572 residue the operator approved fixing in passing.

**Drift.** PLAN row: "one spec ever written (its own dogfood, 2026-07-12)" ✓; "no adopter `specs/` dir" — per 565.4 §B, not re-measured (cross-repo); "a slug, a stub, a Codex wrapper, two symlinks, and a roster row" — two symlinks in `claude/AGENTS-snippet.md`, five across all four snippets, and roster rows on ~8 surfaces (same class as CORE-571/572's finding; not a contradiction). Cross-artifact: `SPEC.md` names neither the skill nor `.flowtron/specs/`; `SPEC/tasknote-selection.md`'s spec block is the routing paragraph the PLAN row names as the surviving home, so the plan lands *on* the contract rather than against it. No `Blocked by`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — retire-and-record, the shape [[CORE-571]] / [[CORE-572]] established two commits ago: delete the runner surfaces, keep the contract (here the template + routing paragraph), add the retired-skills row, leave append-only history alone

- [x] **Minimal refactor gate** — no refactor beyond the demote; the routing paragraph was rewritten in place (its whole purpose was to route to the skill), and the `--fast` carve-out in `SPEC/gates.md` / `claude/CAPABILITIES.md` narrowed to the one skill that still has its own review-pause flag (`/ft-refactor`) rather than deleted, since the distinction it draws is still true

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code; the release standing checks are the tests and ran green (Phase 3)

**Implementation Notes:**

**Surviving home.** `SPEC/tasknote-selection.md` §"When to use a tasknote": heading `Draft a spec (`/ft-spec [brief] [--fast]`)` → `Draft a spec (`templates/spec-template.md`)`; the peer paragraph is now the hand procedure — copy the template to `.flowtron/specs/<slug>.md` (create the dir on first use), fill six sections, review before filing from Tasks, convert via the same four routes — with one trailing clause recording the retirement. §"Filing commits" execution-skill list drops the slug. `templates/spec-template.md:42`: "`/ft-spec` never files" → "a spec never files".

**Deleted (3 tracked + 2 gitignored).** `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`; the two repo-local `.claude/{skills/ft-spec,commands/ft-spec.md}` links `rm`'d so the release self-wiring check passes.

**Sweep (18 edited files).** Symlink rosters: five `ln -s` lines dropped across `claude/` (2) · `codex/` · `cursor/` · `grok/` (1 each) `AGENTS-snippet.md`; the `claude/` spec bullet rewritten to the template + routing pointer. Rosters: `AGENTS.md` peer list, `ft-flowtron` (one row; 14 = 14), `SPEC/layout.md` (tree comment → "hand-copied spec-template.md drafts"; namespace list), `docs/PLATFORMS.md` (Seven → Six tasknote skills; two policy cells; two inventory lists; 15 → 14 three times), `docs/MIGRATION.md` (§1.2 short-version sentence — also dropped the stale "worktree pair are thin procedural utilities" clause CORE-572 left, per the operator's Residue answer; §1.7 verify note; one retired row `v5.27.0`). Carve-outs: `SPEC/gates.md` and `claude/CAPABILITIES.md` now name `/ft-refactor` as the skill with the unrelated review-pause `--fast`. Comparisons skill → spec artifact: `claude/skills/ft-refactor/SKILL.md` ×4, `claude/commands/ft-refactor.md`, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md` (ledger cell: section list + skill-names list). Release gate: `step-7.1-mirror-pairs.md` template row "Written by" → "by hand (no skill since CORE-573)"; Pair J's premise example re-worded to the since-retired stub — no surviving stub names `--park` without the full flag roster (`ft-epic-discovery.md` and `ft-file-followup.md` both carry all four), so the `continue` guard now has no live instance but keeps its reason.

**Left alone, deliberately.** `docs/CONTEXT-BUDGET.md:131` ledger (release-refreshed), `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, `.flowtron/specs/spec-to-work-handoff.md` (project data), the two dated wiring-miss anecdotes (`docs/PLATFORMS.md:94`, `step-7.1-standing-checks.md:70` — they explain why the self-wiring check exists), `README.md:282` ("spec" among the templates — still true).

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
A1 decision — judgment: AskUserQuestion answered "Demote to template + routing paragraph" (transcript)
A2 test ! -e <three paths>                                             → 0
A3 template survives, no slug; routing block names template + target    → 0
A4 residue grep on `ft-spec` (exclusions per criterion)                → prints nothing (grep exit 1)
A5 symlink-roster derivation, five diff -u blocks                      → 0 0 0 0 0, all empty
A6 grep -q retired row ft-spec                                          → 0
A7 parity claude/skills ↔ codex/skills (find, verbatim)                → 0, empty
A7 parity claude/skills ↔ claude/commands (sorted)                     → 0, empty
A7 Pair E ft-flowtron roster ↔ shipped skills (row + flag halves)       → 0, empty / no MISSING
A8 self-wiring claude/{skills,commands} ↔ .claude/{skills,commands}    → 0 0, empty; no DANGLING, no non-link
A9 git diff --check                                                     → 0
derived-consumer greps (MIGRATION §1.6, ft-new-project Step 7–8)        → 1 1 (empty, as required)
Pair J park-flag roster in stubs                                        → no MISSING
git diff | grep -cE 'API_KEY|SECRET|TOKEN|PASSWORD'                     → 0
wc -c SPEC/gates.md · ft-refactor · ft-flowtron SKILL.md               → 35,943 (cap 40,000) · 13,699 · 8,299 (glob cap 33,000)
```

A4's first run flagged `docs/PLATFORMS.md:94` because the anecdote's `unrunnable` wraps to the next line; the exclusion was corrected to a phrase on the matched line (`exact gap`) and the criterion updated to the command actually run. A7's first ad-hoc `claude/commands` comparison mis-sorted `ft-audit` against `ft-audit-context` (`.md` strips after `ls` orders) — re-run with `sort` on both sides, and the verbatim `find` form from the standing checks; both empty.

Structural: no duplication introduced (a 7.7k body restating the template preamble + routing paragraph is gone); no dead code (three deleted paths, no orphan fragment, no orphan wrapper; the Pair J `continue` guard keeps its reason with no live instance, stated as such); public surface shrank by one skill and grew by nothing; code-facing docs updated in the same diff (four snippets, PLATFORMS inventories, retired-skills row, `--fast` carve-outs, `ft-refactor` comparisons).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (names "spec" among the templates at :282 — still true; never named the skill) · `AGENTS.md` updated (peer list) · `SPEC.md` no change (never named the skill or `.flowtron/specs/`) · `docs/MIGRATION.md` updated (§1.2 sentence incl. the CORE-572 residue, §1.7 note, retired row) · `claude/AGENTS-snippet.md` updated (spec bullet, two `ln -s` lines) · `codex/` `cursor/` `grok/` `AGENTS-snippet.md` updated (one `ln -s` line each; no prose named the skill) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` updated (tasknote-selection ledger row: section list + skill-names cell) · `docs/PLATFORMS.md` updated (Seven → Six, two policy cells, two inventories, 15 → 14 ×3; the :94 anecdote kept as dated history) · `claude/CAPABILITIES.md` updated (`--fast` row narrowed to `/ft-refactor`) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (never named the skill) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (never named the skill) — 18 / 18 walked, 9 updated

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Decided **demote**: `/ft-spec` is gone and its value lives where it always did — `templates/spec-template.md` (the artifact) and the `SPEC/tasknote-selection.md` routing paragraph, which now carries the three-step hand procedure (copy to `.flowtron/specs/<slug>.md`, fill six sections, review before filing from Tasks) in place of a pointer at the skill. One spec in two months, written by the skill's own dogfood the day it shipped, said the 7.7k body was a review-pause wrapper around motions the template's preamble and the routing paragraph already describe; the [[CORE-571]] / [[CORE-572]] retire-and-record shape let the artifact survive at zero roster cost.

- **Files:** 3 deleted (skill body, stub, Codex wrapper), 18 edited (the template, `SPEC/tasknote-selection.md`, `SPEC/layout.md`, `SPEC/gates.md`, four `AGENTS-snippet.md`, `AGENTS.md`, `ft-flowtron`, `ft-refactor` skill + stub, `claude/CAPABILITIES.md`, `step-7.1-mirror-pairs.md`, `docs/PLATFORMS.md`, `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md`), +38/−41 lines on the edits, plus PLAN + this note. Two gitignored `.claude/` links removed locally.
- **Verification:** A1 judgment (operator-confirmed); A2–A9 all exit 0 with empty diffs (Testing Notes); the five symlink-roster derivations, both parity checks, Pair E both halves, Pair J, and the local self-wiring check all print nothing.
- **Refactors:** none beyond the demote. The `--fast` carve-out in `SPEC/gates.md` / `claude/CAPABILITIES.md` was narrowed to `/ft-refactor` rather than deleted (the distinction it draws is still true of that skill). Out-of-row cleanup, operator-approved: the stale "worktree pair are thin procedural utilities" clause CORE-572 left in `docs/MIGRATION.md` §1.2 is gone.
- **Documentation:** the doc-drift sweep touched 9 of 18 AI-referenced docs; `docs/CONTEXT-BUDGET.md` ledger left for the release re-measure, `docs/VERSION-HISTORY.md` / `PLAN-ARCHIVE.md` append-only; two dated wiring-miss anecdotes kept as history.
- **`touches:` reconciliation:** declared 21, changed 21 (this note and PLAN excluded by construction). **No undeclared paths.**
- **Maintainability:** roster 15 → 14 skills; adopter symlink block 2 lines shorter (5 across the four platforms); two `--fast` carve-outs each explain one skill instead of two; the spec concept now has exactly one executable home, and it is a template a stranger can copy without a slash command. Adopters see the dangling links at their next `/ft-update` and the retired-skills row names the replacement.

**Archived:** 2026-09-10
