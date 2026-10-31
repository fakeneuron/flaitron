---
title: unattended-readiness discovery
status: completed
tags: []
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-EPIC-812, CORE-822, CORE-843]
touches:
  - .flaitron/PLAN.md
---

# CORE-850.1 | unattended-readiness discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-850]]

## 🎯 Goal

Scope the `CORE-EPIC-850` epic (`unattended-readiness`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-850.2..6` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in the `## 🧭 Deep Pre-pass` §Clarifications table (the "Resolved scoping" table for this run)
- [x] Concrete child scopes for CORE-850.2 .. CORE-850.6 filed in .flaitron/PLAN.md (47–53 words each; `.5` over the 50w target, under the 70w cap)
- [x] Audit line CORE-850.N reviewed and confirmed as-filed (`[heavy]`, fixed doc-drift sweep line; no scope shift)
- [x] Phase 4 doc-drift sweep at closure: no AI-referenced doc updates (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-850.2 .. CORE-850.6; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-850 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-EPIC-812]] — predecessor: `/ft-seed-unattended` and the pin / split preparations this epic extends
- [[CORE-822]] — predecessor: third refused form of the 👁️ carve-out (adopter tiered evidence rule); this epic narrows that boundary, with provenance
- [[CORE-843]] — predecessor: lone-park commit; the mid-run dirty-park stall this epic routes to worktree-per-dispatch

## 🌳 Fan-out

- **Parallel:** [[CORE-850.5]] with [[CORE-850.3]] and [[CORE-850.4]] (disjoint files: gate-postures / unattended-mode / blocked / GATE-DISCIPLINE vs. candidacy module / seeder / filers)
- **Sequential:** [[CORE-850.3]] after [[CORE-850.2]] · [[CORE-850.4]] after [[CORE-850.3]] · [[CORE-850.5]] after [[CORE-850.2]] · [[CORE-850.6]] after [[CORE-850.5]]
- **Synthesis:** [[CORE-850.N]]

## 🧭 Deep Pre-pass

### Constitution

**Evidence the epic answers.** natabula `/natabula-seed-unattended`, 2026-10-31, 25 Caobunga-registered repos at v8.1.0: 160 open unmarked rows walked, 3 marks drafted, 2 written (~1.3%). ~95–100 stays failed clause 1 (`[heavy]`, model-name tags, epic structure); ~45 failed clause 3 (rendered surface, operator act, open decision, or a keyword in the row's own ID or a path); the rest were clause 4/6 or note/stub collisions. Caobunga showed 4 repos stalled at `blocked (visual-confirm)` and 1 at `blocked (drift)`, each a dirty tree halting that repo's queue.

**Principles — each clause must hold in every child.**

1. **Seeding stays an operator act.** Flaitron never writes `[unattended]`; every admission rides an existing confirm gate; `--fast` / `--unattended` postures emit and write nothing. `SPEC/unattended-candidacy.md` §"Recommend, never write" is preserved verbatim.
2. **Widen by readiness and precision, never by removing a gate.** No gate, park conversion, or paper-complete part is relaxed. A row is admitted because its basis is confirmed, not because a check is skipped.
3. **The predicate lives once.** Every clause change lands in `SPEC/unattended-candidacy.md`; filers carry labeled mirrors (Pair N / Pair Q); the never-autonomous set is a section of that module, not a per-skill list.
4. **One token.** `[unattended]` stays the only admission marker. No dotted or second token; grammar, `viz/src/parser.ts`, `SPEC/task-line-segments.md`, and every dispatcher are untouched. The readiness basis (scope paths, acceptance command, deciding assertions, pinned decisions) lives in the row's starter tasknote and pins.
5. **The refused carve-outs stay refused for run-time, agent-chosen checks.** A fourth form is admitted narrowly: seed-time, operator-confirmed deciding assertions plus scope confinement. `docs/GATE-DISCIPLINE.md` §"Refused carve-outs" records it as a dated boundary change with provenance (this epic's ID), beside CORE-495 / CORE-503 / CORE-822. The agent's own confidence in a rendering is never a criterion.
6. **Hard exclusions, no retag offer.** `[frontier]`, `[xheavy]`, and frontier model names (`fable`, `mythos`, `astra`) are never admitted. `[!critical]`, `[handoff]`, `Blocked by`, epic parents, and `.1` rows stay out as today. Tier-aliased names (`grok`, `sonnet`, `haiku`, `opus`, `sol`, `codex`) read by inherent tier for clause 1; the pin still binds dispatch and `model-mismatch` backstops a wrong runner.
7. **Never-autonomous set.** Credentials and secrets; deploy, production, and push; migrations on real data; destructive ops; paid external calls and any outbound side effect (email, posts, API mutations, OAuth, operator identity leaving the machine); physical acts and live-system reads; prose in the operator's voice; public or legal claims; undecided design choices; opening epics; self-widening guardrails (permission allowlists, hooks, `path-access-roots`, gitleaks / pre-commit config, CI workflows, and the candidacy module itself); release and tag cuts; new third-party dependencies. The keyword screen in clause 3 stays the mechanical layer; this set is the semantic layer the filer and seeder apply.
8. **A park never publishes unfinished work.** The committed-park idea is rejected. The queue-stall answer is caller-side worktree-per-dispatch per `docs/WORKTREES.md`; the runner is unchanged.
9. **Runner cap is the caller's, stated in the contract.** An operator-less caller runs heavy-band models (Opus, Sol, Grok) at effort up to `xhigh` when needed, never `fable` or `astra`. `SPEC/model.md` effort vocabulary is unchanged.
10. **No runtime, no new cue.** No orchestrator, queue, inbox file, or UI in flaitron; Caobunga owns the queue. No new cue glyph, no new banner; the two-banner cap holds; `/ft-seed-unattended` keeps exactly one gate, with questions listed inside it.
11. **Guardrails for admitted heavy work are mechanical.** Scope-path confinement from the starter (an out-of-scope diff parks), a diff-size cap, the full validation set, atomic single-commit closure, and drift parks as the backstop.

**Out of scope.** A deferred-look / `look-owed` state; dotted or second tokens; committed parks; Caobunga's inbox queue and UI; changes to the `[model]` ladder beyond the alias reading; viz changes; any new validator (`docs/VISION.md`: a sharper SPEC clause, not a validator).

### Specification

WHAT each child delivers, not how. Order is the proposed stem order; `.5` is parallel-safe with `.3`/`.4` (disjoint files). Every child runs `bash tools/drift-checks.sh` (Pair N mirrors, Pair Q citations, context budgets) and `node --test tools/drift-checks.test.mjs`; a child that grows a `SKILL.md` past its `docs/CONTEXT-BUDGET.md` line moves the growth into a lazy fragment rather than raising the budget.

**`.2` — readiness basis.** *Deliverable:* a new §"Readiness basis" in `SPEC/unattended-candidacy.md` defining the facts a starter must carry for a row above `[moderate]`, or one that changes a rendered surface, to be admitted — mapped onto the starter's existing shape so no new file type exists: (a) YAML `touches:` declared and non-empty (the scope the run is confined to); (b) a new starter subsection `### Acceptance that decides it`, every criterion in the SPEC §"🧪 Phase 3" verify-command shape, none `judgment` / `👁️`; (c) `### Open at promotion` empty; (d) for a rendered-surface row, at least one criterion names a spec run (Playwright or the repo's equivalent) that decides the rendered result. `templates/tasknote-starter-template.md` gains the subsection; `/ft-file-task --starter` S3 shows the basis and proposes `[unattended]` on a `[heavy]` row only when the basis is complete (its S4 mirror label updated). *Acceptance shape:* module section present and cited by clause 1 (`.3`); template renders; `/ft-file-task --starter` on a heavy brief with a complete basis proposes the token and on an incomplete one does not; `grep -q` on the section headings; drift checks green. *Interacts with:* `.3` cites it; `.4` drafts it; `.5` enforces `touches:` and reads (d).

**`.3` — predicate clauses, aliases, exclusions, never-autonomous set.** *Deliverable:* `SPEC/unattended-candidacy.md` §"Candidacy predicate" rewritten: clause 1 admits `[light]` / `[moderate]` (`[medium]`) as today, admits `[heavy]` only with a confirmed readiness basis (`.2`), reads a concrete name by its inherent tier (`haiku` → light; `grok` / `sonnet` / `codex` → moderate; `opus` / `sol` → heavy, basis required), and fails `[frontier]`, `[xheavy]`, and frontier names (`fable`, `mythos`, `astra`) with no preparation offered; clause 3's keyword screen excludes the row's own bold ID and every backticked span, so the "trips only on a path or a name" stay disappears for those shapes while a bare prose keyword still trips; a new §"Never autonomous" lists the Constitution's semantic set and binds every LLM filer and the seeder to decline such a row as a stay with that reason, never a pin, split, or scope. `SPEC/model.md` §"Pinning a named model" last sentence, `SPEC/task-line-segments.md` §"`[unattended]` candidacy", and `docs/EXTERNAL-AGENTS.md` step 2 updated to match; filer mirror labels re-resolved (Pair N / Pair Q). *Acceptance shape:* the seed run's stay classes re-walked on paper — a `[grok]` row with no person reads as a mark, `NAT-471`-style backticked-path rows no longer trip clause 3, `DEPLOY-054`'s own ID no longer trips, a `[frontier]` row stays with no item — recorded in Testing Notes; drift checks green. *Interacts with:* `.2` (clause 1 cites the basis); `.4` applies both; `.6` restates step 2.

**`.4` — seeder `scope` and `question` dispositions.** *Deliverable:* `/ft-seed-unattended` gains two dispositions inside its single Step 3 gate, with the taxonomy in `SPEC/unattended-candidacy.md` §"Preparing declined rows" (predicate lives once). **`scope`:** for a row declined only by clause 1 (`[heavy]` or heavy-name) or by a rendered surface under clause 3, with no never-autonomous hit and no note/stub collision, the walk reads the repo (bounded) and drafts a starter carrying the full readiness basis; the gate shows the basis fields inline (touches, deciding criteria, locked decisions, open = none) plus the starter path, with a dependent token item; capped per walk (constant, no flag), the overflow listed as stays with `scope deferred — cap`. **`question`:** for a row declined only by an open decision, the walk lists one to three bounded multiple-choice questions in a **Questions** block of the same gate, each option carrying the exact pin bytes it would write; the reply (`BE-511 a`) selects the pin and, where a scope starter is also drafted, fills its Decisions-locked row; unanswered → stay; capped per walk. Gate counts, reply grammar, Step 4 write rules, post-stage verification, and Step 5 report extended for both; body growth lands in a lazy fragment. *Acceptance shape:* a fixture plan with one heavy row, one rendered-surface row, one open-decision row, one never-autonomous row walks to one gate showing a scope item, a scope item with a Playwright criterion, a question block, and a stay; `none` writes nothing; mirror label + literal present (Pair N); drift checks green. *Interacts with:* `.2` (what a starter carries), `.3` (what is declined), `.5` (what the run does with it).

**`.5` — runner guardrails, pinned-evidence Phase 3, GATE-DISCIPLINE record.** *Deliverable:* under `--unattended`, `claude/skills/ft-task/unattended-mode.md` and `SPEC/gate-postures.md` add two mechanical checks before Phase 3: the diff's changed paths must match the note's `touches:` (plus the workflow paths closure itself writes) and stay under a diff-size cap, else park with a new `park-reason` code (`SPEC/blocked.md` table row; name settled in Clarifications); Phase 3's 👁️ item, on a row whose promoted starter carries a deciding spec criterion that passed with the diff inside scope, records `decided by <command> — basis confirmed <date>` in the box and emits no ask, otherwise parks `visual-confirm` as today; the attended `[unattended]`-implied `--fast` path records the same line beside its existing suppression. `docs/GATE-DISCIPLINE.md` §"Refused carve-outs" gains the fourth form, admitted, with the two grounds answered (who chose the check; scope confinement) and provenance `CORE-850` / date, plus a Rationalizations row and a Red Flag for the run-time agent-chosen variant that stays refused. `park-reason` prose for `drift` and `input-needed` is specified to state the one question the operator must answer. *Acceptance shape:* conversion map and surface matrix rows added; `blocked.md` closed set has the new code; GATE-DISCIPLINE provenance line present; `SPEC.md` §"🧪 Phase 3" pointer updated if its 👁️ sentence needs it; drift checks green. *Interacts with:* `.2` (reads `touches:` and (d)); `.6` publishes the new code.

**`.6` — caller contract.** *Deliverable:* `docs/EXTERNAL-AGENTS.md` gains a dispatch-isolation step (run each operator-less tasknote in a `wt-<ID>` worktree per `docs/WORKTREES.md`; a mid-run park then dirties only that worktree) with the single-checkout consequence stated; the runner cap stated as the caller's (heavy-band models at effort up to `xhigh`; never a frontier-band model; `[frontier]` / `[xheavy]` rows never admitted) in the orchestration contract and in one `SPEC/model.md` sentence; stable-surface rows for the readiness basis (`touches:` + `### Acceptance that decides it` as readable facts), the new park code, and the park-prose question convention; `docs/WORKTREES.md` start-half note that a starter note copies like an active one. Per `.flaitron/tasknote/README.md`'s EXTERNAL-AGENTS entry, the caller-side row (Caobunga: dispatch in worktrees; read the new code) is filed in the caller's own `PLAN.md` in the same closure. *Acceptance shape:* stable-surface table rows present and each names an owner that exists; `grep -q` on the worktree step; Pair Q green; the Caobunga row's filing named in the Final Summary. *Interacts with:* `.5` (code name), `.2` (basis fields).

### Clarifications

Resolved with the operator, 2026-10-31 (three design rounds before filing, one in the pre-pass).

| # | Question | Answer |
|---|---|---|
| 1 | Rendered-surface rows under `--unattended`: deferred look (`look-owed`), pinned evidence, or overrule? | **Seed-time pinned evidence only.** Operator-confirmed deciding assertions plus `touches:` scope confinement. No `look-owed` state. Run-time agent-chosen checks stay refused; GATE-DISCIPLINE records the fourth form as admitted with provenance. |
| 2 | Who decides a `[heavy]` row is ready? | **Seeder drafts a starter** (`scope` preparation) carrying the readiness basis; the operator's gate confirm is the act. |
| 3 | `[frontier]` rows and frontier models? | **Excluded outright, no retag offer.** `[frontier]`, `[xheavy]`, and `fable` / `mythos` / `astra` never admitted. Runner cap (caller's): Opus / Sol / Grok at effort up to `xhigh`. |
| 4 | Concrete model-name tags for clause 1? | **Tier alias, pin kept.** Read by inherent tier; `model-mismatch` backstops a wrong runner. A name the `docs/PLATFORMS.md` roster cannot tier fails clause 1. |
| 5 | Row-level posture tokens? | **One token.** `[unattended]` only; the starter carries the basis. |
| 6 | Mid-run park stalls the repo queue — committed park or worktree? | **Worktree per dispatch, caller side.** No committed park; runner unchanged. |
| 7 | Extra never-autonomous exclusions? | **All four accepted:** self-widening guardrails, release and tag cuts, new third-party dependencies, any outbound side effect. Plus opening epics. |
| 8 | New `park-reason` code for out-of-scope or over-cap diff? | **`out-of-scope`** — new closed-set row in `SPEC/blocked.md`. |
| 9 | Diff-size cap? | **400 lines** added + deleted, excluding lockfiles, generated files, and `.flaitron/`. |
| 10 | Seeder per-walk caps? | **5 `scope` + 5 `question`**, constants, no flag; overflow listed as stays. |
| 11 | Where is the caller repo for the `.6` cross-repo row? | **`~/Code/caobunga`** — `.6` edits its `.flaitron/PLAN.md` in the same closure (sibling-repo standing exception). |

Assumptions stated, not asked:

- The clause 3 keyword list stays frozen; the never-autonomous set is a semantic layer on top, not new keywords.
- "Basis confirmed `<date>`" reads the starter's `created:`; a later hand edit to a starter carries the same trust as the token itself.
- A deciding criterion for a rendered surface states the assertion in words (what the spec asserts, where); the run may write the spec file in Phase 2 — implementing an operator-stated assertion is not choosing the check.
- Attended `/ft-task` on an `[unattended]` row already suppresses the 👁️ ask via implied `--fast`; `.5` only adds the recorded decision line there.
- A `question` option carries its exact pin bytes at the gate, so an answer never produces a write the operator did not see.
- The seeder's `scope` read is bounded to the row's named paths plus a shortname grep; it never walks outside the repo.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-open-epic --deep` after a three-round design discussion grounded in the 2026-10-31 natabula seed run (1.3% admission over 160 rows; 5 repos stalled on dirty parks). The scope is cross-module contract work (candidacy, gate postures, blocked codes, seeder, starter template, caller doc) with a settled constitution — an epic, not a single task.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md`, `SPEC/gate-postures.md`, `SPEC/blocked.md`, `SPEC/model.md`, `SPEC/task-line-segments.md`, `SPEC/epic.md`, `SPEC.md` §"🧪 Phase 3", `docs/GATE-DISCIPLINE.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` §"Procedure", `docs/PLATFORMS.md` calibration table, `templates/tasknote-starter-template.md`, `claude/skills/ft-task/unattended-mode.md`, `claude/skills/ft-seed-unattended/SKILL.md`, `claude/skills/ft-file-task/starter-mode.md` (candidacy hooks), `viz/src/parser.ts` (trailing-token charset), `docs/CONTEXT-BUDGET.md` rows. No probe needed — the set was known.

- [x] **Best Practices Review** — `N/A`: the deliverable is filed PLAN lines; module-boundary judgments (predicate lives once; mirrors labeled; no new file type) are in the Constitution and bind the children.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). 73 notes name the candidacy module, the seeder, or the refused carve-outs; load-bearing ones read: CORE-822 (third refusal, receipts form, 2026-10-22 — the boundary `.5` narrows), CORE-503 (second refusal, baseline form), CORE-736 (clause 6 cascade — `.4`'s token items must keep it), CORE-619 (seeder birth; its doc-drift sweep lists every surface a seeder change touches), CORE-812.N (prep fold into one walk, one gate, one commit — `.4` must preserve), CORE-843 (lone-park commit; the dirty-park stall `.6` routes to worktrees).

- [x] **Drift check** — every path the Specification cites exists at HEAD (17 checked); `~/Code/caobunga/.flaitron/PLAN.md` exists. The pre-pass's claims re-read against files, not recalled: clause 1 text (`[heavy]` and a missing tag both fail; concrete token fails per `model.md` §"Pinning a named model"), clause 3 keyword list and its "stays that list" sentence, `TRAILING_TOKENS = [a-z][\w.-]*` and the literal `UNATTENDED_MARKER`, the six park conversions and the eight-code closed set, GATE-DISCIPLINE's three refused forms with CORE-495 / CORE-503 / CORE-822 provenance, WORKTREES start half `cp` of the active note (a starter at the same path copies identically). Budgets: `claude/skills/*/SKILL.md` 33,000 (seeder body 22,349 — room for `.4`); `SPEC/gate-postures.md` 22,000 (now 21,319 — `.5` must extract or trim, not grow in place); other lazy `SPEC/` modules unbudgeted. No drift.

- [x] Asked clarifying questions — resolved during deep pre-pass; see `## 🧭 Deep Pre-pass` §Clarifications (11 rows, 6 stated assumptions). No new question surfaced in Discovery.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declares `.flaitron/PLAN.md`

**Discovery Notes:**

- **Shared design surface.** Contract: `SPEC/unattended-candidacy.md` (clauses 1 and 3, new §"Readiness basis", §"Never autonomous", `scope` / `question` in §"Preparing declined rows"), `SPEC/gate-postures.md` (two pre-Phase-3 checks, 👁️ decided-by line, surface-matrix rows), `SPEC/blocked.md` (`out-of-scope` row), `SPEC/model.md` (pinning sentence; caller cap sentence), `SPEC/task-line-segments.md` (candidacy blurb). Skills: `ft-seed-unattended/SKILL.md` (+ a lazy fragment for the two dispositions), `ft-task/unattended-mode.md`, `ft-file-task/starter-mode.md` (basis display + heavy proposal). Templates: `tasknote-starter-template.md` (`### Acceptance that decides it`). Docs: `docs/GATE-DISCIPLINE.md` (fourth form admitted; rationalization row + red flag for the refused run-time variant), `docs/EXTERNAL-AGENTS.md` (worktree dispatch step, runner cap, stable-surface rows), `docs/WORKTREES.md` (starter copies like an active note). Tooling: Pair N / Pair Q re-resolve automatically; no new check.
- **Adopter wiring.** No new skill, no new symlink, no snippet change expected: the seeder and filers keep their slugs; the starter template change reaches adopters at pin bump. `.6` files the Caobunga row cross-repo under the `~/Code` sibling exception, per the README's EXTERNAL-AGENTS entry.
- **Why the ordering.** `.2` defines the basis `.3`'s clause 1 cites and `.4` drafts; `.5` consumes `touches:` and the deciding criterion and is disjoint in files from `.3` / `.4`; `.6` publishes `.5`'s code name.
- **Precedent kept.** CORE-736's transitive cascade applies to `scope` token items exactly as to pins and splits; CORE-812.N's one-walk-one-gate-one-commit shape is a Constitution clause; CORE-822's refusal text is extended with a fourth block, never rewritten.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-EPIC-057 cohort-children pattern: 2-space nested rows, `[model]` on every line, em-dash separator, `| shortname` ≤30 chars

- [x] **Minimal refactor gate** — PLAN.md rows only; no other file touched

- [x] Implemented the minimal solution — five child lines written under CORE-EPIC-850 between `.1` and `.N`

- [x] Updated/added tests for non-trivial behavior — `N/A` (PLAN.md filing; no executable surface)

**Implementation Notes:**

- Lines written: 5 (`.2`–`.6`). Word counts: `.2` 47 · `.3` 49 · `.4` 48 · `.5` 53 · `.6` 47 (≤70 cap; `.5` over the 50 target, kept for the four concrete facts it carries).
- M unchanged from filing (5). `.N` suffix unaffected.
- Per-child `[model]`: `.2`–`.5` `[heavy]` (seed); `.6` `[moderate]` — departs from the seed, confirmed by the operator at the review prompt (decisions stated; multi-file doc edits plus one cross-repo row).
- Downstream-impact scan over the rest of the active plan (CORE-849, CORE-641): no downstream impact.
- `[unattended]` candidacy (mirror of `SPEC/unattended-candidacy.md` §"Three postures", attended branch): `.2`–`.5` and `.N` fail clause 1 (`[heavy]`); `.6` trips clause 3 (*cross-repo*). No candidates; no token written.
- Fan-out filled: `.5` parallel with `.3`/`.4`; `.3`←`.2`, `.4`←`.3`, `.5`←`.2`, `.6`←`.5`; `.N` synthesis.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` (markdown PLAN rows)

- [x] Ran lint/type-check on changed code — `N/A`

- [x] **Verification receipt** — `N/A`: no verify commands on this Discovery's Acceptance; markdown mental-pass below

- [x] **External review** — `N/A`: the deliverable is filed PLAN lines, not a diff to grade

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space indent on all five rows; bold IDs intact; `[model]` on every row (`[heavy]` ×4, `[moderate]` ×1, none above `[frontier]`); no `[unattended]` on any row (none admitted); `| shortname` present, longest 23 chars; ` — ` separator consistent; word counts 47–53 (≤70); no trailing whitespace; `## 🌳 Fan-out` populated with wikilinks matching the six filed children.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (its edits are `.3` and `.6`) · `docs/WORKTREES.md` no change (`.6`) · `docs/VISION.md` no change. Pure Discovery filing; every contract edit is scoped to a child.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.1` line → `Completed 2026-10-31.` stub nested under CORE-EPIC-850, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A` for the always-loaded layer; the design record lives in this note's `## 🧭 Deep Pre-pass` for the children to read

**Final Summary:**

CORE-EPIC-850 `unattended-readiness` is filed and scoped. The epic widens what flaitron lets run unattended by readiness and precision rather than by removing gates: `[heavy]` and tier-aliased model names become admissible on an operator-confirmed starter that carries a readiness basis (`touches:` scope, deciding acceptance commands, no open decision, a deciding spec for rendered surfaces); the predicate gains clause-3 precision and a never-autonomous set; the seeder gains `scope` and `question` dispositions inside its one gate; the runner gains scope confinement, a diff cap, and a pinned-evidence Phase 3 path recorded in GATE-DISCIPLINE as a narrowed fourth form; the caller contract gains worktree-per-dispatch and the runner cap. `[frontier]`, `[xheavy]`, and frontier models are excluded outright; no look-owed state; one token.

Changed: `.flaitron/PLAN.md` (five child rows `.2`–`.6`, `.1` stub), this note (constitution, specification, 11-row clarifications table, Fan-out). `touches:` declared `.flaitron/PLAN.md`; the diff shows that path plus this note's archive move. Verification: markdown mental-pass (Testing Notes); no commands. Doc-drift sweep: no change on all 18 entries. Next: `/ft-task CORE-850.2` (readiness basis, `[heavy]`).

**Archived:** 2026-10-31
