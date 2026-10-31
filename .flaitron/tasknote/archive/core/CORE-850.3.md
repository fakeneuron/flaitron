---
title: predicate-clauses
status: completed
tags: []
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-850.1, CORE-850.2, CORE-850.4, CORE-850.5]
touches:
  - SPEC/unattended-candidacy.md
  - SPEC/model.md
  - SPEC/task-line-segments.md
  - docs/EXTERNAL-AGENTS.md
  - claude/skills/ft-file-task/starter-mode.md
  - claude/skills/ft-seed-unattended/SKILL.md
  - .flaitron/PLAN.md
blocked-by: [CORE-850.2]
parallel-safe-with: [CORE-850.5]
---

# CORE-850.3 | predicate-clauses

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-850]] [[CORE-850.1]] [[CORE-850.2]]

## 🎯 Goal

Rewrite the `[unattended]` candidacy predicate so clause 1 reads concrete model names by inherent tier (heavy-tier names on `.2`'s readiness basis) and refuses `[frontier]` / `[xheavy]` / frontier names outright, clause 3 ignores the row's own ID and backticked spans and admits a rendered-surface row on a complete basis, and a new §"Never autonomous" semantic set binds filers and the seeder — with every mirror re-resolved.

## ✅ Acceptance

Shorthand: `PRED` = `sed -n '/^## Candidacy predicate/,/^## Readiness basis/p' SPEC/unattended-candidacy.md`.

- [x] Clause 1 reads a concrete name by its roster tier (heavy-tier names on a basis; an untierable name fails) and refuses `[frontier]` / `[xheavy]` / `fable` / `mythos` / `astra` with no preparation — `PRED | grep -q 'inherent tier' && PRED | grep -q 'mythos' && PRED | grep -q 'tier to one band'`
- [x] Clause 3's keyword screen skips the row's own bold ID and every backticked span; a rendered-surface row with a complete basis is admitted — `PRED | grep -q 'backticked span' && PRED | grep -q 'own bold ID' && PRED | grep -q 'complete.*basis'`
- [x] `## Never autonomous` section exists, lists the Constitution's 13-item semantic set, and clause 3 binds filers and the seeder to it as a stay — `grep -q '^## Never autonomous$' SPEC/unattended-candidacy.md && PRED | grep -q 'Never autonomous'`
- [x] §"Preparing declined rows" agrees: own-ID trip gone from Split, path-or-name Stay narrowed to unbackticked text, frontier and never-autonomous rows stay with no preparation — `grep -q 'outside a backticked span' SPEC/unattended-candidacy.md && ! grep -q 'its own ID, a path' SPEC/unattended-candidacy.md`
- [x] `SPEC/model.md` §"Pinning a named model" no longer says a concrete token fails clause 1 — `! grep -q 'A concrete token fails' SPEC/model.md && grep -q 'inherent tier' <(grep -A8 'Pinning a named model' SPEC/model.md)`
- [x] `SPEC/task-line-segments.md` blurb and `docs/EXTERNAL-AGENTS.md` step 2 state the new admission and exclusions — `grep -q 'Never autonomous' SPEC/task-line-segments.md && grep -q 'Never autonomous' <(grep '^2\. ' docs/EXTERNAL-AGENTS.md)`
- [x] Filer mirror re-resolved: `/ft-file-task --starter`'s basis paragraph covers heavy-tier names — `grep -q 'heavy-tier name' claude/skills/ft-file-task/starter-mode.md`
- [x] Seed-run stay classes re-walked on paper (a `[grok]` row, a backticked-path row, `DEPLOY-054`'s own ID, a `[frontier]` row, a never-autonomous row, a rendered-surface row with and without a basis) — `judgment`: no executable predicate; recorded in Testing Notes
- [x] Drift checks green — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`

## 🧩 Subtasks

- [x] Clause 1 rewrite in `SPEC/unattended-candidacy.md` (roster tier read, heavy-tier names on a basis, untierable fails, frontier exclusion)
- [x] Clause 3 rewrite (own-ID + backtick exclusion, rendered-surface admission on a basis, Never-autonomous binding); §"Readiness basis" closing paragraph aligned
- [x] New `## Never autonomous` section
- [x] §"Seeding an existing plan" + §"Preparing declined rows" aligned (split own-ID sentence, path-or-name stay, frontier / never-autonomous stays)
- [x] `SPEC/model.md` pinning sentence; `SPEC/task-line-segments.md` blurb; `docs/EXTERNAL-AGENTS.md` step 2
- [x] `claude/skills/ft-file-task/starter-mode.md` mirror re-resolve
- [x] Phase 3: acceptance commands, paper re-walk, drift checks, external review

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-850.1]] — Discovery; Specification `.3`, Constitution principles 6–7, Clarifications 3–4, 7
- [[CORE-850.2]] — predecessor: `## Readiness basis` and clause 1's `[heavy]` arm, which this extends
- [[CORE-850.4]] — follow-up: seeder applies these clauses
- [[CORE-850.5]] — parallel-safe (disjoint files)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` closed; clause 1 at HEAD still fails every concrete token (`model.md:324`) and frontier tags only by omission, clause 3 still trips on a row's own ID and backticked paths, and no never-autonomous section exists. The PLAN line (amended by `.2`) and the `.1` Specification still describe the work.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (whole), `SPEC/model.md` §"Category-vs-concrete matching" + §"Pinning a named model", `SPEC/task-line-segments.md`, `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract", `docs/PLATFORMS.md` roster rows, `claude/skills/ft-file-task/{SKILL,starter-mode}.md` candidacy mirrors, `claude/skills/ft-seed-unattended/SKILL.md` Steps 1–2, `docs/CONTEXT-BUDGET.md` lazy-module rows.

- [x] **Best Practices Review** — the predicate lives once (Constitution principle 3): every clause change lands in the module; `model.md`, the segments blurb, and EXTERNAL-AGENTS step 2 point at it rather than restating clause text. The roster owns per-name tiers, so clause 1 cites it rather than carrying its own name table (examples only).

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). `.1`'s skim covers the module (73 hits); read here for the clauses in scope: CORE-850.1 (Constitution 6–7, Clarifications 3/4/7, Specification `.3`), CORE-850.2 (clause 1 heavy arm; review notes deferring `model.md:325` / segments blurb / EXTERNAL-AGENTS step 2 to this task), CORE-835 (rendered-surface row named person-shaped; "never a pin"), CORE-783.2 (clause 3 two layers; keyword list frozen).

- [x] **Drift check** — one drift: the `.1` Specification bands `sol` heavy, but `docs/PLATFORMS.md` bands Sol moderate at its default (heavy only at `sol@high`+), and the `gpt-5` family token spans three tiers. Resolved below. Every other cited path exists; seeder text (`.4`'s file) states nothing this task falsifies.

- [x] Asked clarifying questions — answered 2026-10-31: (1) clause 1 defers to the `docs/PLATFORMS.md` roster's default-effort band for every name, so `sol` reads moderate; (2) a family token the roster cannot tier to one band (`gpt-5`) fails clause 1.

  Assumptions: `astra` stays excluded by name (operator decision, Clarification 3) though the roster bands it heavy at default; the backtick exclusion covers glyphs and keywords alike inside a backticked span — the never-autonomous layer catches a backticked `deploy`; a mention of another ID outside backticks still trips; never-autonomous rows stay (no pin, split, or scope) per the `.1` Specification, matching the existing Stay bullet's credentials/deploy stays; the seeder's own text is `.4`'s and is not edited here.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Fan-out echo: `blocked-by: [CORE-850.2]` (closed), `parallel-safe-with: [CORE-850.5]`.
- Pair N binds any `claude/skills/` file naming the module; `starter-mode.md` already carries the literal and a §"Readiness basis" label, so editing its prose keeps Pair N green. A new `## Never autonomous` heading is Pair Q-resolvable if cited in `§"…"` form.
- Budgets: `SPEC/task-line-segments.md` 10,000 (now ~6.2k); the candidacy module and EXTERNAL-AGENTS are unbudgeted.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: clause 1/3 prose in place; `## Never autonomous` is a new `## ` module section beside §"Readiness basis" (`.2`'s precedent); pointer sentences in `model.md` / segments / EXTERNAL-AGENTS cite the module rather than restate clauses

- [x] **Minimal refactor gate** — no refactor; only sentences whose claim changed were edited

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: contract prose; Pair N / Pair Q bind the mirrors and citations

**Implementation Notes:**

- `SPEC/unattended-candidacy.md`: clause 1 gains the roster-tier read (examples per `docs/PLATFORMS.md`: `sol` moderate, `gpt-5` untierable → fails) and a **Never admitted** line. Clause 3 skips the row's own bold ID and backticked spans, binds §"Never autonomous", and admits a rendered-surface row on a complete basis. §"Readiness basis" closing paragraph names both admission points. New `## Never autonomous` (13 items, stay-only). §"Seeding" pin example, Pin / Split / Stay bullets aligned.
- `SPEC/model.md` §"Pinning a named model": the "concrete token fails clause 1" sentence is replaced by the tier read; marking does not loosen the pin.
- `SPEC/task-line-segments.md` blurb and `docs/EXTERNAL-AGENTS.md` step 2: one sentence each on what can be marked.
- `claude/skills/ft-file-task/starter-mode.md`: the basis paragraph covers heavy-tier names and rendered-surface admission (clauses 1 and 3).
- Seeder text left for `.4` (nothing there is falsified: its clause-1 example is a pin on a `[heavy]` row, still declined without a basis).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown only)

- [x] **Verification receipt** — below; no duplication: each clause lives once in the module, and the three pointer sentences cite it

- [x] **External review** — two `/code-review medium` passes; pass 1 had 1 blocker (fixed; Phase 3 re-ran), pass 2 had 0 blockers; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:

```text
A1 PRED | grep -q 'inherent tier' && … 'mythos' && … 'cannot tier'          → 0
A2 PRED | grep -q 'backticked span' && … 'own bold ID' && … 'complete.*basis' → 0
A3 grep -q '^## Never autonomous$' … && PRED | grep -q 'Never autonomous'   → 0
A4 grep -q 'outside a backticked span' … && ! grep -q 'its own ID, a path'  → 0
A5 ! grep -q 'A concrete token fails' SPEC/model.md && … 'inherent tier'    → 0
A6 grep -q 'Never autonomous' SPEC/task-line-segments.md && … step 2        → 0
A7 grep -q 'heavy-tier name' claude/skills/ft-file-task/starter-mode.md     → 0
A9 bash tools/drift-checks.sh                                               → 0
A9 node --test tools/drift-checks.test.mjs                                  → 0  (pass 21, fail 0)
```

Paper re-walk of the seed run's stay classes (A8, judgment) — before → after:

- `[grok] | fix parser — Handle empty rows in` `` `src/parse.ts` ``. Before: clause 1 (concrete token). After: `grok` reads moderate → clauses 2–6 pass → **mark**.
- `[light] | bump stamp — Update the date in` `` `docs/MIGRATION.md` `` (NAT-471 shape). Before: stay, path-or-name. After: the backticked span is skipped → **mark**. The same row with the path bare still trips → stay, reason names the path.
- `**DEPLOY-054** [light] | lint fix — Fix lint warnings in` `` `src/app.ts` ``. Before: clause 3 on its own ID's prefix. After: own bold ID skipped → **mark**.
- `[frontier]` row, and a `[fable]` row. Before: clause 1. After: clause 1 "Never admitted" → **stay, no preparation**.
- `[opus]` row with no starter. Before: clause 1 (concrete). After: reads heavy, no basis → clause 1 → stay (or a pin with no token item).
- `[gpt-5]` row. After: untierable family token → clause 1 → stay.
- `[light] | rotate API keys — Replace the expired key in` `` `.dev.vars` ``. No keyword trips (span skipped; "keys" is not on the list). After: §"Never autonomous" (credentials) → **stay**, reason names the item.
- `[light] | ship — Run` `` `wrangler deploy` `` `after the build.` Mechanical screen skips the span; semantic layer → §"Never autonomous" (deploy) → **stay**.
- Rendered-surface `[moderate]` row, starter with complete basis incl. (d) a Playwright criterion. Before: clause 3 semantic (true look). After: **mark**. Same row with no starter, or a basis missing (d) → stay ("true look").

External review (`/code-review medium`, working-tree diff only):

- **Pass 1 — 1 blocker, 7 notes.**
  - Blocker, fixed: clause 1 said "a name the roster does not list fails" while its own examples (`haiku`, `sol`) are not roster tokens. Now the tier comes from a roster band cell (token or a model a cell names at one band, `sol`), else `SPEC/model.md`'s calibration baseline (`haiku`). `gpt-5` / `gemini-flash` (multi-band cells) and unlisted names fail. A1's grep string changed from `cannot tier` to `tier to one band` to match.
  - Note, fixed: the rendered-surface admission cited §"Park conversions" as if it supported an unattended finish. Now it says candidacy decides only what may be marked, and the runner's 👁️ handling is gate-postures' rule (`.5` owns the change).
  - Notes, fixed: the segments blurb, EXTERNAL-AGENTS step 2, and the `model.md` pin sentence leave out the rendered-surface basis and other clauses. All three now name heavy-or-rendered-surface work, and `model.md` says the other clauses still apply.
  - Note, fixed: the Split bullet said clause 3 skips "only" the own ID. It now names backticked spans too.
  - Note, no change: `codex` reads moderate though the token runs Astra, which is excluded by name. The roster gives `codex` one default band (moderate), and effort is session config (`SPEC/model.md` §"Effort axis"). The runner's effort cap is the caller's, which `.6` states.
  - Note, no change: skipping backticked spans takes `deploy` / `credential` inside backticks out of the mechanical screen. This is the operator's design from `.1` (Specification `.3`). The semantic layer, §"Never autonomous" included, is mandatory for every LLM filer and the seeder, and the clause says a skipped span is not a semantic pass.
  - Observation, no change: `docs/CONTEXT-BUDGET.md`'s module size is re-measured at release; the module is unbudgeted.
- Phase 3 re-ran from the top: A1–A7 → 0 (A4 → 1 at first because the phrase wrapped across lines, then rewrapped → 0); drift → 0; self-test pass 21 / fail 0.
- **Pass 2 — 0 blockers, 10 notes.** None reopens a phase: each either fails safe (a false negative, the predicate's stated safe direction) or repeats a pass-1 item.
  - Fixed: the predicate preamble now reads the starter for the basis arms of clauses 1 *and* 3.
  - Fixed: clause 1's bold headline names concrete names of each tier.
  - Fixed: **Never admitted** is "checked before the tier read", and the three names are called an operator exclusion, not a roster reading (the roster bands Astra heavy at its default).
  - Fixed: §"Readiness basis" requires a basis for `[heavy]` / heavy-tier names, not "above `[moderate]`", and a never-admitted row gains nothing from one.
  - Fixed: the Stay bullet drops "credentials, deploy" (now covered by its §"Never autonomous" entry) to avoid a double list.
  - Fixed: the segments blurb and EXTERNAL-AGENTS step 2 say "light- and moderate-tier work (a category tag or a concrete name)".
  - Fixed: the seeder mirror's clause-1 example (`ft-seed-unattended/SKILL.md:163`) names heavy-tier names and "no complete basis". A one-phrase mirror re-resolve, added to `touches:`; the rest of the seeder stays `.4`'s.
  - No change, repeat of pass 1: `codex` → Astra; the backtick skip covering cue glyphs; the runner still parking `visual-confirm` until [[CORE-850.5]].
- Final re-run: A1–A7 → 0; `bash tools/drift-checks.sh` → 0; `node --test tools/drift-checks.test.mjs` → 0 (pass 21, fail 0).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/EXTERNAL-AGENTS.md` **updated** (step 2: what can be marked at all). Every other entry has no change:
  - Root and contract docs: `README.md`, `AGENTS.md`, `SPEC.md` (the candidacy contract lives in the lazy module), `CONTRIBUTING.md`, `SECURITY.md`.
  - Snippets: `claude/AGENTS-snippet.md` (its seeder line names pin/split only, still true), `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`.
  - Other docs: `docs/MIGRATION.md`, `docs/CONVENTIONS.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md` (read as the tier source, not changed), `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/VISION.md`, and `docs/WORKTREES.md` (`.6`).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.3` line → `Completed 2026-10-31.` stub nested under CORE-EPIC-850, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A` for the always-loaded layer. Repo note: an acceptance `grep -q` on prose breaks when a rewrap splits the phrase. Keep grep targets short, or rewrap so they stay on one line.

**Final Summary:**

**What changed.** The `[unattended]` candidacy predicate is now tier-aware and has a semantic floor.

- **Clause 1.** Concrete names read by their roster tier: the `docs/PLATFORMS.md` band cell, else the `SPEC/model.md` calibration baseline. `haiku` reads light; `sonnet`, `grok`, `codex`, and `sol` read moderate. `opus` reads heavy and needs a confirmed readiness basis. `gpt-5`, `gemini-flash`, and unlisted names fail. `[frontier]`, `[xheavy]`, `fable`, `mythos`, and `astra` are never admitted and get no preparation.
- **Clause 3.** The keyword screen skips the row's own bold ID and every backticked span. A rendered-surface row is admitted on a complete basis with (d).
- **New `## Never autonomous`.** A 13-item semantic set. Filers and the seeder decline these rows as stays, whatever the basis.
- The prep taxonomy (Pin / Split / Stay) and §"Readiness basis" now agree with the clauses.
- Pointer sentences were re-resolved in `SPEC/model.md` §"Pinning a named model", `SPEC/task-line-segments.md`, `docs/EXTERNAL-AGENTS.md` step 2, `/ft-file-task --starter`'s basis mirror, and the seeder's clause-1 example.

**Verification.** A1–A7 → 0, `bash tools/drift-checks.sh` → 0, `node --test tools/drift-checks.test.mjs` → 0 (21/21). The A8 judgment was met by a paper re-walk of ten row shapes. Two review passes: 1 blocker and 14 notes fixed; 3 repeat notes with no change, reasons in Testing Notes.

**`touches:` reconciliation.** The diff matches all seven declared paths, plus this note's archive move. The seeder path was added mid-run (pass-2 mirror fix). No refactors.

**Follow-ups owned elsewhere.**
- [[CORE-850.5]]: the runner still parks `visual-confirm` on an admitted rendered-surface row until it lands.
- [[CORE-850.4]]: the seeder's `scope` disposition.
- [[CORE-850.6]]: the caller's runner cap, which is what bounds `codex` → Astra.

**Archived:** 2026-10-31
