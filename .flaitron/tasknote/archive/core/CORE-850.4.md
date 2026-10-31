---
title: seeder-scope-question
status: completed
tags: []
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-850.1, CORE-850.2, CORE-850.3, CORE-850.5]
touches:
  - SPEC/unattended-candidacy.md
  - SPEC/plan-filing.md
  - claude/skills/ft-seed-unattended/SKILL.md
  - claude/skills/ft-seed-unattended/scope-and-question.md
  - codex/skills/ft-seed-unattended/SKILL.md
  - SPEC/task-line-segments.md
  - docs/GLOSSARY.md
  - docs/PLATFORMS.md
  - docs/EXTERNAL-AGENTS.md
  - claude/AGENTS-snippet.md
  - .flaitron/PLAN.md
blocked-by: [CORE-850.3]
parallel-safe-with: [CORE-850.5]
---

# CORE-850.4 | seeder-scope-question

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-850]] [[CORE-850.1]] [[CORE-850.2]] [[CORE-850.3]]

## 🎯 Goal

Give `/ft-seed-unattended` two new dispositions inside its single Step 3 gate — `scope` (draft a starter carrying a complete readiness basis for a heavy or rendered-surface row) and `question` (one bounded multiple-choice question whose options carry their exact pin bytes) — capped at five of each per walk, with the taxonomy in `SPEC/unattended-candidacy.md` and the body growth in a lazy fragment.

## ✅ Acceptance

Shorthand: `MOD` = `SPEC/unattended-candidacy.md`; `FRAG` = `claude/skills/ft-seed-unattended/scope-and-question.md`; `PREP` = `sed -n '/^### Preparing declined rows/,/^## Persistence/p' MOD`.

- [x] `MOD` §"Preparing declined rows" defines **Scope** and **Question** and the five-per-walk caps — `PREP | grep -q '^- \*\*Scope\.\*\*' && PREP | grep -q '^- \*\*Question\.\*\*' && PREP | grep -q 'five'`
- [x] §"Never autonomous" admits a seeder question for the undecided-design item only — `sed -n '/^## Never autonomous/,/^## Three postures/p' MOD | grep -q 'question'`
- [x] §"Readiness basis" names the seeder gate as a confirming gate for a drafted or existing starter — `sed -n '/^## Readiness basis/,/^## Never autonomous/p' MOD | grep -q 'ft-seed-unattended'`
- [x] §"Seeding an existing plan" lists the Questions block, and the surface table's seeder row names scopes and questions — `sed -n '/^## Seeding an existing plan/,/^### Preparing/p' MOD | grep -q 'Questions' && grep 'ft-seed-unattended. | Step 4' MOD | grep -q 'questions'`
- [x] Lazy fragment exists with Step 2–5 sections, the body directs its Read, and Pair N binds it — `test -f FRAG && for s in 2 3 4 5; do grep -q "^## Step $s" FRAG || exit 1; done && grep -q 'scope-and-question.md' claude/skills/ft-seed-unattended/SKILL.md && bash tools/drift-checks.sh pair_n`
- [x] `SPEC/plan-filing.md` recognized-hunk sentence covers a scope rewrite carrying its token — `grep -q 'pin or scope' SPEC/plan-filing.md`
- [x] Fixture walk: a scratchpad plan with one heavy row, one rendered-surface row, one open-decision row, and one never-autonomous row walks to one gate showing a scope item, a scope item with a Playwright criterion, a question block, and a stay — `judgment`: the walk is an LLM procedure with no executable seeder; the gate is recorded in Testing Notes
- [x] `none` writes nothing on that fixture — `git -C <fixture> status --porcelain` prints nothing after the `none` reply
- [x] Drift checks green (budgets, Pair N, Pair Q) — `bash tools/drift-checks.sh && node --test tools/drift-checks.test.mjs`

## 🧩 Subtasks

- [x] `MOD`: Scope + Question bullets and caps in §"Preparing declined rows"; existing-starter basis read and seeder confirmation in §"Readiness basis"; question carve-out in §"Never autonomous"; Questions block in §"Seeding an existing plan"; surface-table row
- [x] `FRAG`: new lazy fragment — Step 2 classification + drafting, Step 3 gate additions + reply grammar, Step 4 writes + re-scan + post-stage hunks, Step 5 report
- [x] Seeder `SKILL.md`: Step 2 basis read for existing starters + fragment Read trigger; one-line hooks at Steps 3–5; description + Notes
- [x] `SPEC/plan-filing.md` recognized-hunk sentence; codex wrapper description
- [x] Phase 3: acceptance commands, fixture walk in scratchpad, drift checks, external review
- [x] Phase 4: doc-drift sweep (snippet utility line, glossary, segments blurb, EXTERNAL-AGENTS step 2 checked)

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-850.1]] — Discovery; Specification `.4`, Clarifications 2 and 10, stated assumptions
- [[CORE-850.2]] — readiness basis this drafts; its review deferred the seeder's basis read here
- [[CORE-850.3]] — blocked-by: the clauses and §"Never autonomous" this applies
- [[CORE-850.5]] — parallel-safe-with: the runner side of a scoped row (disjoint files)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.3` closed; at HEAD the seeder knows only pin / split / stay, never reads a row's starter for the basis arm (`.2`'s deferred review note), and has no path that drafts a basis or asks for a decision. The PLAN line and `.1` Specification `.4` still describe the work.

- [x] Read relevant source files — `claude/skills/ft-seed-unattended/SKILL.md` (whole), `SPEC/unattended-candidacy.md` (whole), `claude/skills/ft-file-task/starter-mode.md` (S3 basis mirror — the display shape to match), `templates/tasknote-starter-template.md`, `SPEC/starter.md` basis paragraph, `SPEC/plan-filing.md` §"Filing commits" recognized hunks, `SPEC/cue-vocabulary.md` §"Accepted gate replies", `tools/drift-checks.sh` `pair_n`, `docs/CONTEXT-BUDGET.md` rows, `codex/skills/ft-seed-unattended/SKILL.md`, seeder mentions across snippets / glossary / EXTERNAL-AGENTS / segments.

- [x] **Best Practices Review** — the taxonomy lives once in the module (Constitution principle 3); the fragment carries procedure only and a labeled mirror. The seeder body grows only by Read triggers and one-line hooks; the procedure lands in the fragment (PLAN line; `docs/CONTEXT-BUDGET.md` §"Skill bodies" prefers extraction).

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`); 12 notes name the seeder body. Read: CORE-850.1 / .2 / .3 (contract, deferred basis read, clauses), CORE-812.3 (merged walk; 18 review blockers, mostly Step 4 edge cases — re-scan, numbering, partial failure), CORE-812.N (one walk, one gate, one commit held), CORE-815.4 / CORE-796 (incidental). Load-bearing: Step 4's re-scan and partial-failure rules must cover the new writes.

- [x] **Drift check** — one tension: §"Never autonomous" lists "design choices not yet decided" as stay-only, which is exactly what `question` prepares. Resolved by a narrow carve-out (Clarification 2). Every cited path exists; the body is 22,391 B against the 33,000 cap.

- [x] Asked clarifying questions — answered 2026-10-31: (1) one question per row, 2–3 options, reply `<ID> a`; a row with two or more open decisions stays. (2) §"Never autonomous" gains a narrow carve-out: the undecided-design item alone may take a seeder `question`, and an unanswered question leaves a stay. (3) The walk reads an existing `status: starter` note's basis; complete → a mark with the fields shown (the keep is the confirmation); incomplete → stay naming the gap; the note is never edited. (4) A scope that cannot draft a complete basis is a stay naming the gap; no partial starter is written.

  Assumptions: a row takes exactly one class, except that a `question` may ride a `scope` (an open decision on a heavy or rendered-surface row) and counts against both caps; a scope adds the starter pointer suffix to its source row (outside the word count, as `/ft-file-task --starter` writes it); caps fill in PLAN order; `all` answers no question; the scope read is bounded to the row's named paths plus a shortname grep inside the repo (`.1` assumption).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Fan-out echo: `blocked-by: [CORE-850.3]` (closed), `parallel-safe-with: [CORE-850.5]`.
- Pair N binds any `claude/skills/` file naming the module: the fragment needs the `unattended-candidates:` literal and a `mirror of` label.
- `SPEC/plan-filing.md` recognized hunks already cover "a starter file this motion created"; only the token-on-rewrite clause names pins alone.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: two bullets beside Pin / Split / Stay in the module; the lazy fragment follows `ft-file-task/starter-mode.md` (an overlay of the host's later steps, "where it speaks, it wins"); the gate's basis lines match starter-mode S3's (a)–(d) list

- [x] **Minimal refactor gate** — no refactor; body edits are Read triggers, one-line hooks, and the two sentences whose claim changed (classification set, recognized token hunk)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: contract prose; Pair N binds the fragment's mirror and literal, Pair Q its citations

**Implementation Notes:**

- `SPEC/unattended-candidacy.md`: §"Readiness basis" names the seeder gate as a confirming gate (drafted or on-disk starter). §"Never autonomous" has the narrow question carve-out. §"Seeding an existing plan" lists four things: Marks (now including an on-disk starter's basis), Preparations (+ scope), Questions, and Stays. The open condition and write coverage are extended. §"Preparing declined rows" adds the preference order, **Scope** and **Question** bullets, and **Per-walk caps** (5 + 5; a rider counts against both). The surface-table row is updated.
- `claude/skills/ft-seed-unattended/scope-and-question.md` (new; 9.6 KB at first draft, final size in the recap): cap slots in PLAN order before drafting; scope read → draft → (a)–(d) check → pointer row → item; question bound → option pins → rider → per-option items; clause-6 note; gate additions (on-disk basis line under a mark, scope entry, Questions block, ask sentence, reply rules); Step 4 re-scan / writes / post-stage hunks; Step 5 lines.
- Seeder `SKILL.md` (22,391 → 23,686 B; cap 33,000): description, intro set, Step 2 **Basis read** (resolves `.2`'s deferred review note) + fragment Read trigger, hooks at Steps 3/4/5, the no-gate condition, the recognized token hunk.
- `SPEC/plan-filing.md`: the recognized-hunk sentence now reads "pin or scope". `codex/skills/ft-seed-unattended/SKILL.md`: description.
- A mid-run fix found by the fixture walk: the scope's bounded read also covers the repo's root command manifest and spec-runner config. Without it, (b) and (d) can't name a command the repo runs. This extends `.1`'s "named paths plus a shortname grep" assumption, and stays repo-local.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0 (21/21)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown only)

- [x] **Verification receipt** — below; no duplication: the taxonomy lives once in the module, the fragment carries procedure and a labeled mirror, and the body carries Read triggers and hooks

- [x] **External review** — nine `/code-review medium` passes. Passes 1–8 had blockers (fixed, Phase 3 re-ran each time). Pass 9 had 0 blockers. Findings below.

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Fixture walk (A7, judgment): a scratchpad git repo with `package.json` (`test`, `typecheck`, `test:e2e` = `playwright test`), `playwright.config.ts`, `src/{parser,db,cache}.ts`, `src/ui/Panel.tsx`, and four High rows. Walked by the new text:

- `CORE-101 [heavy] | parser rewrite`. No starter on disk, so clause 1 fails on the basis arm only, and clause 3 has no trip. → **scope** (slot 1/5).
  - (a) `src/parser.ts`
  - (b) `parseRow` output unchanged — `npm test`; types check — `npm run typecheck`
  - (c) none
  - (d) n/a
  - locked: single pass, `parseRow` signature kept
  - The basis is complete, so the item fires (`[heavy] [unattended]`).
- `FE-102 [moderate] | settings empty state`. Clause 1 passes. Clause 3's semantic layer reads a rendered surface. → **scope** (slot 2/5).
  - (a) `src/ui/Panel.tsx`, `e2e/panel-empty.spec.ts`
  - (b) empty state renders with no items — `npm run test:e2e -- e2e/panel-empty.spec.ts`; types — `npm run typecheck`
  - (d) "`e2e/panel-empty.spec.ts` asserts the empty-state text inside the Panel when it renders with no items". The runner was found via `playwright.config.ts` and `test:e2e`.
  - The item fires. This is the scope item with a Playwright criterion.
- `CORE-103 [moderate] | drafts store`. The only gap is one undecided choice, and both options are named on the row. → **question** (slot 1/5), Q1 "Store unsent drafts in `src/db.ts` or `src/cache.ts`?":
  - a) `… — Persist unsent drafts in `src/db.ts`.`
  - b) `… in `src/cache.ts`.`
  - Each option is a pin with no other trip, and each shows the token in place.
- `CORE-104 [light] | rotate keys`. No mechanical trip: the backticked `.dev.vars` is skipped, and "key" is not on the list. §"Never autonomous" (credentials and secrets) catches it. → **stay**, clause 3, reason named.
- Gate counts: walked 4 · marks 0 · pins 0 · splits 0 · stays 1 · scopes 2 · questions 1 · deferred by cap 0. One gate, with Preparations (2 scopes), Questions (Q1), and Stays (CORE-104).
- The walk exposed one gap, fixed in Phase 2: the bounded read reached neither `package.json` nor `playwright.config.ts`, so (b) and (d) could not be filled. Re-walked after the fix with the result above.

Receipt:

```text
A1 PREP | grep -q '^- \*\*Scope\.\*\*' && … Question … && … 'five'              → 0
A2 sed -n '/^## Never autonomous/,/^## Three postures/p' MOD | grep -q question → 0
A3 sed -n '/^## Readiness basis/,/^## Never autonomous/p' MOD | grep -q 'ft-seed-unattended'  → 0
A4 … Seeding … grep -q Questions && seeder table row grep -q questions          → 0
A5 test -f FRAG && ## Step 2..5 && body names FRAG && drift-checks.sh pair_n    → 0
A6 grep -q 'pin or scope' SPEC/plan-filing.md                                   → 0
A8 git -C <fixture> status --porcelain | wc -l  (after a `none` reply)          → 0 lines
A9 bash tools/drift-checks.sh                                                   → 0
A9 node --test tools/drift-checks.test.mjs                                      → 0  (pass 21, fail 0)
```

External review (`/code-review medium`, working-tree diff only):

- **Pass 1 — 4 blockers, 6 notes.**
  - Blocker, fixed: a mark on an on-disk starter showed its basis only through the fragment, which loads only for declined rows, so a keep could confirm fields nobody saw. The basis line now lives in body Step 3 item 2.
  - Blocker, fixed: a reply of only `CORE-620 b` read as a keep-only list and silently dropped the rest. An answer now counts as an ID in the body's list forms; the ask says to add `all` (`all, CORE-620 b`).
  - Blocker, fixed: a rendered-surface rider contradicted the Pin bullet ("never a pin"). The module Question bullet and fragment step 2 now say the scope's basis decides that reading on a rider.
  - Blocker, fixed: a rider drafted one starter for every option, so answer b could confirm option a's `touches:`. Starters are now drafted per option, and the chosen draft is written.
  - Note, fixed: the scope bullet now says clause 6 withholds the item, not the scope, matching the fragment and the pin rule.
  - Note, fixed: `SPEC/plan-filing.md` now says an answered question is a pin (the A6 grep still holds).
  - Note, fixed: the garbled mirror label is now one `(mirror of …)` label; the nested code span is rewritten in prose; the redundant re-scan check is folded into the collision check.
  - Note, no change: a starter on disk whose only gap is one open item cannot take a question. Clarification 3 says the walk never edits a note; the operator resolves it in `/ft-task` promotion or by hand.
  - Note, no change: `docs/CONTEXT-BUDGET.md`'s seeder figure (22,349) is re-measured at release, as for every body. The basis read stays in the body because it runs on walks that never load the fragment (now 23,953 B, cap 33,000).
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0. Fixture gate unchanged (no rider, no on-disk starter in it); `none` still writes nothing.
- **Pass 2 — 2 blockers, 6 notes; all fixed.**
  - Blocker: a rider's answer row was both pre-drafted (Question step 3) and added again at Step 4. It is now drafted once per option at Step 2, shown at the gate, and written as drafted.
  - Blocker: a mark admitted on an on-disk basis had no Step 4 re-scan, so a note edited after the gate could be confirmed stale. Body Step 4 item 1 now re-scans the note and skips the mark on change.
  - Notes: a rider needs both cap slots or takes neither. A plain question reads as Scope step 1 does, no further. Options are limited to the Pin bullet's facts (file, command, existing pattern; "value" dropped). The letterless `<ID> item` / `<ID> no item` forms are named as unanswered. The body Notes bullet names scope and question. The `SPEC/plan-filing.md` double parenthetical became one clause.
  - Note, pulled forward from the Phase 4 sweep: stale "pin or split" wording updated in `SPEC/task-line-segments.md`, `docs/GLOSSARY.md`, `claude/AGENTS-snippet.md`, and `docs/EXTERNAL-AGENTS.md` step 2 (one phrase each).
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines.
- **Pass 3 — 4 blockers, 6 notes; all fixed.**
  - Blocker: the Scope bullet's "no §Never autonomous item" barred the rider that the Question bullet allows. It now excepts the one choice a riding question answers. §"Never autonomous" says "alone or riding a scope".
  - Blocker: the fragment's load trigger (body Step 2 and fragment header) missed a rider, which is declined for both reasons. It now covers "those two together".
  - Blocker: a scope deleted `### Open at promotion` unconditionally, so (c) could hide an open choice. The draft now records whatever the read leaves open, and deletes the sub-heading only when nothing is open.
  - Blocker: a dependent of a question stayed marked when the answer's option had no item. The cascade now treats an unanswered question, an option with no item, and a `no item` answer alike.
  - Notes: `git grep -ilF -e` (fixed string, quoted). Deterministic slot walk (a rider takes neither slot when it can't take both, and the next row may take the freed one). Rider writes only the answered-question row. `docs/PLATFORMS.md` fragment inventory lists the new fragment. Body intro names the scope starter. Glossary gate list adds questions.
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines. The fixture gate is unchanged: neither scope read leaves anything open.
- **Pass 4 — 3 blockers, 7 notes.**
  - Blocker, fixed: `all but CORE-611, CORE-620 b` read two ways. An `<ID> <letter>` entry is now always an answer, read first and never excluded.
  - Blocker, fixed: the module contradicted itself. The Stay bullet's never-autonomous stay now excepts the undecided choice a question takes. The write list says a rider's answered row carries the pointer and is that row's only rewrite.
  - Blocker, fixed: a scope criterion could be a `grep -q` already true before any work. A command must now decide the work, not a fact already true. A grep counts only for a string the row must add, and a suite passing today decides only behavior the row must keep. (A first, stricter wording, "could not pass on the tree as it stands", ruled out CORE-101's behavior-preserving refactor on fixture re-walk, so it was relaxed.)
  - Notes, fixed: a failed draft frees its cap slot (otherwise failing rows starve later ones forever). The grep uses single quotes with `'\''`, so no expansion. An incomplete on-disk basis stays on clause 1 or 3, not "collision". A row with a dangling `Filed with starter at` pointer stays. The body's Step 3 item 3 and Step 5 `seeded` name scopes and answered rows.
  - No change, repeat of pass 1: the `docs/CONTEXT-BUDGET.md` figure is re-measured at release.
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines; fixture gate unchanged (`npm test` decides kept behavior on CORE-101, the e2e spec run decides the added empty state on FE-102).
- **Pass 5 — 1 blocker, 8 notes.**
  - Blocker, fixed: the pass-4 freed-slot rule let a late-drafted row get an item after its dependents had already resolved. Slotting and drafting now finish in their own phase before the body's clause-6 ordering, and only items follow that order.
  - Notes, fixed: command and spec-runner files are read in each directory between a named path and the root (catches `viz/package.json`, `frontend/playwright.config.ts`). A shortname grep over twenty matches is ignored. A rider deferred by cap names every full cap. The Step 4 re-scan re-checks that a scope's scripts are still defined. The `(c) open: none` format is the same in body and fragment. The Question bullet says the Pin bullet's "which of two patterns" stretches to three. The glossary names the on-disk-basis mark.
  - No change, third repeat: the `docs/CONTEXT-BUDGET.md` ledger figure. The ledger records release measurements ("Re-measured … at vX"), and the next `/ft-release` re-measures it. Body 24.4 KB against the 33,000 cap.
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines; fixture gate unchanged.
- **Pass 6 — 2 blockers, 7 notes.**
  - Blocker, fixed: an answered option whose own item was withheld (clause 6) still got the token unless the reply said `no item`. Step 3, the Step 4 write, and post-stage now all require the chosen option's item.
  - Blocker, fixed: "Clause 6 aside" excused `.1` and `.N` rows into a scope. It now covers only a `.k` waiting on an open sibling, and a `.1` or `.N` row is never a scope.
  - Notes, fixed: the module's read bound now matches the fragment (command files on the way to each named path). The Question bullet takes the same clause-6 aside. The gate example uses the defined `npm run test:e2e` script and two existing modules (no new file or dependency). The `deferred by cap` rows are also counted in `stays`. Command files are read once per walk.
  - No change: two display shapes for basis fields. A mark is a one-row item with a one-line basis; a scope is a multi-line preparation. Both list the same (a)–(d) fields as starter-mode S3.
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines; fixture gate unchanged.
- **Pass 7 — 1 blocker, 9 notes.**
  - Blocker, fixed: a scope row carrying its token could commit without its starter (the basis). Post-stage now treats a kept scope row staged without its starter as unrecognized, which unstages and skips the commit.
  - Notes, fixed: (b) reads as one rule (a defined script, or a `grep -q` for a string the row must add). (d) says the stated assertion is what makes the run decide. Command files are also read up the path of a grep hit, so a row that names no path is covered. A mark's re-scan also re-checks its scripts. An `<ID> <letter>` on a non-question is ignored and named. The dangling-pointer check moved to slot qualification, before any read. The Marks bullet reads "may be admitted only on". The receipt's A3 line now shows the command actually run, and the fragment's size is corrected.
  - No change: per-option drafts on a rider. Correctness needs each option's `touches:` and criteria (pass-1 blocker), and the caps bound the cost to 15 drafts.
  - No change: the (d) "generic runner" sentence. The module's (d) already lets the run write the spec the criterion states in words; the clarifying sentence above makes that explicit in the fragment.
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines; fixture gate unchanged.
- **Pass 8 — 2 blockers, 8 notes.**
  - Blocker, fixed: the pass-4 freed slot left the number of drafts unbounded, against the module's cap. The module now caps what a walk *offers* (5 + 5) and what it *attempts* (10 of each). A failed draft frees its offer, not its attempt.
  - Blocker, fixed: a rider's row (pin plus pointer) matched no recognized post-stage hunk. The answered-question hunk now names the pointer on a rider.
  - Notes, fixed: the body's load trigger names the clause-6 aside. A `.1` or `.N` row never takes a question. Step 4 stamps the write day in `created:` and the answer row. The fragment cites the cap section instead of restating "five". The gate example's locked row is a repo fact, not a design choice.
  - No change: a reply of only `CORE-620 b` keeps only CORE-620. That is the body's list rule (a reply naming some IDs keeps only those), its safe direction writes less, and the ask spells out `all, CORE-620 b`.
  - No change: a heavy row whose note is in flight (not `status: starter`) stays on collision. That note is a run in progress, not a seeding target.
  - No change: the PLAN line's "one to three bounded choices". Clarification 1 reads it as one question with two or three options, and the line collapses to its stub at closure.
- Phase 3 re-ran from the top: A1–A6 → 0; drift → 0; self-test pass 21 / fail 0; fixture `none` → 0 lines; fixture gate unchanged.
- **Pass 9 — 0 blockers, 9 notes.** Every finding fails safe (a kept item is skipped, so less is written) or is about consistency or wording; none reopens a phase.
  - Fixed:
    - The on-disk basis read checks its scripts are defined before the gate.
    - Every starter date is the write day.
    - The module's read bound names shortname hits.
    - A rider counts once against each cap, however many options it drafts.
    - Collision stays settle before slotting, so they spend no attempt.
    - (c) is plain: anything else left open fails the scope.
    - The body's Counts hook names only count additions.
    - `|` is escaped in the answer row.
  - No change, repeat of pass 6: the two basis display shapes.
- Final re-run: A1–A6 → 0; `bash tools/drift-checks.sh` → 0; `node --test tools/drift-checks.test.mjs` → 0 (21/21); fixture `none` → 0 lines.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: `claude/AGENTS-snippet.md` (seeder utility line names scope and question), `docs/PLATFORMS.md` (fragment inventory), `docs/EXTERNAL-AGENTS.md` (step 2 phrase only; no stable-surface row moved, so no caller-side row). No change: `README.md`, `AGENTS.md`, `SPEC.md` (the candidacy contract is the lazy module), `docs/MIGRATION.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` (wiring only, no seeder description), `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md` (`.6`).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.4` line → `Completed 2026-10-31.` stub nested under CORE-EPIC-850, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A` for the always-loaded layer. Repo note: in a procedure with many interacting rules, each review fix tended to open a new edge case. A fixture re-walk after each fix caught one of those at once (the over-strict (b) rule).

**Final Summary:**

**What changed.** `/ft-seed-unattended` can now prepare the two kinds of row that used to be stays: heavy or rendered-surface rows that lack a readiness basis, and rows held up by one open design choice. Both stay inside its one gate.

- **Scope.** The walk reads the repo within a bound and drafts a starter carrying a complete basis: `touches:`, deciding criteria built on scripts the repo defines, nothing open, and a stated spec assertion on a rendered surface. The gate shows the fields, and keeping the scope confirms them. A basis the walk cannot complete is a stay that names the gap.
- **Question.** One question with two or three options, each shown as the exact pinned row it writes. The reply `<ID> <letter>` answers it, and it may ride a scope with one starter draft per option.
- **Caps.** Five scopes and five questions offered per walk, ten attempts of each.
- **On-disk starters.** The walk reads an existing starter's basis: a complete one becomes a mark whose fields are shown, and an incomplete one stays, naming what is missing. This resolves `.2`'s deferred review note.
- **Contract.** The taxonomy lives in `SPEC/unattended-candidacy.md`. §"Never autonomous" gains one narrow carve-out: the undecided-design item may take a question.

**Changed files.**
- `SPEC/unattended-candidacy.md` (+97/−14 lines)
- New `claude/skills/ft-seed-unattended/scope-and-question.md` (12,674 B)
- Seeder `SKILL.md` (22,391 → 24,580 B; cap 33,000)
- One-phrase currency edits: `SPEC/plan-filing.md`, `SPEC/task-line-segments.md`, `codex/skills/ft-seed-unattended/SKILL.md`, `claude/AGENTS-snippet.md`, `docs/GLOSSARY.md`, `docs/PLATFORMS.md`, `docs/EXTERNAL-AGENTS.md`

**Verification.**
- A1–A6 → 0, drift → 0, self-test 21/21, fixture `none` → 0 lines.
- A7 (judgment) was met by a fixture walk: two scopes (one with a Playwright criterion), one question, one never-autonomous stay, in one gate.
- Nine review passes. 15 blockers fixed in passes 1–8, many of them edge cases opened by earlier fixes (the CORE-812.3 pattern). Pass 9 had 0 blockers. Notes are fixed or declined with reasons in Testing Notes.

**`touches:` reconciliation.** Declared 11 paths (6 at Phase 1, 5 added mid-run as review and doc-drift findings landed). Changed 10 plus the PLAN row and this note's archive move. Every changed path is declared; `.flaitron/PLAN.md` changes only by the closure stub.

**Refactors.** None.

**Deferred.**
- `docs/CONTEXT-BUDGET.md`'s seeder figure, re-measured at the next `/ft-release`.
- [[CORE-850.5]]: the runner reading a scoped starter.
- [[CORE-850.6]]: stable-surface rows for the basis.

**Archived:** 2026-10-31
