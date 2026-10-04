---
title: spec-core-lazy-split
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-EPIC-535, CORE-535.1, CORE-535.2, CORE-EPIC-223, CORE-507]
blocked-by:
  - CORE-535.2
---

# CORE-535.3 | spec-core-lazy-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-535]]

## 🎯 Goal

Move the ~26k chars of narrow-use sections out of always-loaded `SPEC.md` into lazy `SPEC/` modules reached by dispatch lines, drop the operator-cue glossary duplicate in favour of `SPEC/gates.md`, repair every cross-reference, and land `SPEC.md` at or under its 50,000-char budget.

## ✅ Acceptance

- [x] Six new lazy modules exist under `SPEC/` in the canonical module shape (`paths: []` frontmatter + the `> Lazy-loaded SPEC module. Loaded by …` line), carrying the moved prose **verbatim** apart from link-depth repairs: `plan-parser.md` · `layout.md` · `scope-boundaries.md` · `tasknote-inserts.md` · `purpose-blurb.md` · `superseded-claims.md`
- [x] Each moved section's old slot in `SPEC.md` carries a dispatch stub in the established `Canonical contract: see [`SPEC/<mod>.md`]` shape, naming when the module loads
- [x] `SPEC.md` §"Operator-cue glossary" is deleted, not moved — the four `SPEC/gates.md` §"Operator-cue vocabulary" tables it lossily copied stay the single home, and §"Operator-gate cues" carries the pointer
- [x] `SPEC.md` §"Loop tasks" is collapsed to the pointer stub form its siblings (§"Blocked tasks", §"Model field") already use
- [x] Every cross-reference to a moved section is repaired repo-wide — `AGENTS.md`, `README.md`, `SECURITY.md`, `docs/` (AGENT-NEUTRALITY · PLATFORMS · CONVENTIONS · VISION · MIGRATION · GLOSSARY · PHILOSOPHY), `claude/` skills + snippet, `codex/`, `SPEC/gates.md`, `SPEC/tasknote-selection.md`, `SPEC/procedures/`, `.flowtron/tasknote/README.md` — with no `SPEC.md §"…"` citation left pointing at a section that no longer lives there
- [x] Both release-gate greps that anchor on moved `SPEC.md` content are repaired in `claude/skills/ft-release/step-7.1-mirror-pairs.md`: Pair A's `templates/` roster grep (and its `SPEC.md:55` prose anchor) and Pair K1's `sec="^## What flowtron does NOT provide$"` source
- [x] The `SPEC/` module enumerations in `AGENTS.md` §"Repo Layout" and `README.md`'s repo-layout bullet name the new modules
- [x] `wc -c SPEC.md` is **at or under 50,000**, verified in Phase 3 against `docs/CONTEXT-BUDGET.md`'s Budgets table
- [x] `docs/CONTEXT-BUDGET.md` self-liquidates: the `SPEC.md` row is deleted from §"Known over budget" and the §Ledger `SPEC.md` figure is refreshed to the measured post-split value
- [x] Phase 4 doc-drift sweep across all 18 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries

## 🧩 Subtasks

- [x] Resolve the budget-shortfall scoping question (the filed candidate list lands ~51.5k, ~1.5k over the 50,000 budget) via AskUserQuestion
- [x] Write `SPEC/plan-parser.md` — parser tolerances (decorative + adopter near-misses), `[unattended]` footguns, bare-checkbox / HTML-comment / legacy-label exclusions, legacy `## Critical` heading, §"Long-description conventions"; keep a one-sentence bracket-token-preservation rule in `SPEC.md` §"Task-line format"
- [x] Write `SPEC/layout.md` — §"Layout in adopting projects" + §"Working in the flowtron repo itself" + §"Lazy SPEC module frontmatter" + §"Procedure SOPs" + §"Skill namespace"
- [x] Write `SPEC/scope-boundaries.md` — §"Cross-repo edit remit" + §"What flowtron does NOT provide" + §"PR / suggestion archetypes flowtron does not accept"
- [x] Write `SPEC/tasknote-inserts.md` — §"🌳 Fan-out (optional)" + §"🔄 Handoff (optional)"
- [x] Write `SPEC/purpose-blurb.md` — §"🎯 Purpose blurb"
- [x] Write `SPEC/superseded-claims.md` — the §"Tasknote frontmatter" write-once factual-corrections carve-out (⚠️ `Superseded by` pointer, append-only rule, three excluded cases, the never-park-a-correction-in-PLAN paragraph)
- [x] Cut the moved spans from `SPEC.md`, insert the dispatch stubs, delete §"Operator-cue glossary", collapse §"Loop tasks"
- [x] Repair cross-references repo-wide (grep-driven, per the Acceptance surface list)
- [x] Repair the two `ft-release` §7.1 mirror-pair greps
- [x] Update the `SPEC/` module enumerations in `AGENTS.md` + `README.md`
- [x] Phase 3: `wc -c` every touched surface against the Budgets table; re-run both repaired mirror-pair greps; markdown/link mental-pass on every touched file
- [x] Phase 4: self-liquidate the `docs/CONTEXT-BUDGET.md` row + refresh the ledger, doc-drift sweep, flip the PLAN line to stub form nested under the parent, archive the tasknote

## 🔗 Related

- [[CORE-EPIC-535]] — parent epic (context-load-diet)
- [[CORE-535.1]] — Discovery; §E3 names the lazy-load candidates this task extracts (`blocked-by:` predecessor via Fan-out: sequential after [[CORE-535.2]])
- [[CORE-535.2]] — predecessor: wrote `docs/CONTEXT-BUDGET.md` + the release standing check that this task's ≤50,000 budget is measured against
- [[CORE-EPIC-223]] — precedent: the original SPEC.md lazy-module split (gates.md + tasknote-selection.md) whose lack of a ratchet let SPEC.md regrow
- [[CORE-507]] — precedent: ft-release SKILL.md 77k→38k via verbatim fragment extraction + dispatch lines; the extraction pattern to extend
- [[CORE-535.4]] — successor: cites sections this task relocates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The predecessor's ratchet is live — `docs/CONTEXT-BUDGET.md` records `SPEC.md` ≤50,000 with this task named as the owner of the current 78,119-byte violation, and the `/ft-release` §7.1 standing check reads that row. Measurement confirms the premise: the nine sections [[CORE-535.1]] §E3 enumerated still exist at HEAD and still total ~27.7k. One scope adjustment (below) rather than a re-scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Extraction arithmetic (bytes, `wc -c` semantics, measured 2026-09-06 at HEAD)

`SPEC.md` = 78,119 bytes / 76,778 chars (the gap is multi-byte glyphs; the budget and the release check both measure bytes via `wc -c`). Budget 50,000 → must shed ≥28,119.

The nine [[CORE-535.1]] §E3 candidates, measured as line ranges:

| Span | L | Bytes |
|---|---|---|
| §"Working in the flowtron repo itself" (+ 2 subsections) | 50–104 | 3,588 |
| §"Skill namespace" | 105–137 | 1,378 |
| Task-line parser prose (legacy `## Critical` → §"Long-description conventions") | 201–336 | 7,754 |
| §"🌳 Fan-out (optional)" | 595–633 | 1,836 |
| §"🔄 Handoff (optional)" | 634–678 | 2,293 |
| §"Operator-cue glossary" | 704–731 | 1,604 |
| §"🎯 Purpose blurb" | 732–793 | 3,621 |
| §"Cross-repo edit remit" | 1030–1049 | 1,127 |
| §"Loop tasks" | 1050–1065 | 864 |
| §"What flowtron does NOT provide" (+ archetypes) | 1213–1246 | 3,678 |
| **Total** | | **27,743** |

Raw removal → 50,376. Adding back six dispatch stubs (~95 each), the retained one-sentence bracket-token-preservation rule (~380) and the retained `viz/src/parser.ts` canonical-reference line (~225) → **~51,551, about 1,551 over budget**. §E3's "~26.5k" estimate was accurate; the shortfall is that it was never checked against the target.

**Resolved (AskUserQuestion, 2026-09-06):** extract the §"Tasknote frontmatter" write-once **factual-corrections** carve-out (L358–400, 2,453 bytes) into a sixth module, `SPEC/superseded-claims.md`. Projected landing **~49.2k, ~800 bytes of margin**. Two alternatives declined by the operator: also folding §"Layout in adopting projects" into a renamed `SPEC/layout.md` (~48.2k, but costs SPEC.md's standalone readability), and trimming the three Phase 1 rationale paragraphs in place (honours the filed list literally, but trimming is [[CORE-535.5]]'s shape).

The carve-out is textbook narrow-use by SPEC's own words — "Most closures falsify nothing and write no pointer" — and both touchpoints (the Phase 1 archive skim, the Phase 4 closure trigger) already cite it by pointer rather than restating it.

### B. Module design — six modules, grouped by *when you read it*

| Module | Contents | Loads when |
|---|---|---|
| `SPEC/plan-parser.md` | Legacy `## Critical` heading · decorative parser tolerances · `[unattended]` mis-authoring footguns · adopter near-misses · bare-checkbox / HTML-comment / legacy-label exclusions · §"Long-description conventions" | Writing or debugging an unusual PLAN.md row; a row failed to parse |
| `SPEC/layout.md` | §"Layout in adopting projects" + §"Working in the flowtron repo itself" + §"Lazy SPEC module frontmatter" + §"Procedure SOPs" + §"Skill namespace" | Adopting flowtron, working *on* flowtron, or wiring skills into a platform |
| `SPEC/scope-boundaries.md` | §"Cross-repo edit remit" + §"What flowtron does NOT provide" + §"PR / suggestion archetypes" | Discovery surfaces work outside this repo; evaluating a feature or PR suggestion |
| `SPEC/tasknote-inserts.md` | §"🌳 Fan-out (optional)" + §"🔄 Handoff (optional)" | Writing one of the two optional body inserts |
| `SPEC/purpose-blurb.md` | §"🎯 Purpose blurb" | Questioning or changing the blurb (the *emission recipe* stays in the three ID-invoked runners) |
| `SPEC/superseded-claims.md` | Write-once factual-corrections carve-out: ⚠️ pointer shape, append-only rule, three excluded cases, never-park-in-PLAN ¶ | A task falsifies a factual claim in an archived tasknote |

**Two non-moves.** §"Operator-cue glossary" is **deleted**, not relocated — §E2 identified it as a lossy copy of four `SPEC/gates.md` tables, and the filed scope says "in favour of gates.md"; §"Operator-gate cues" keeps the pointer it already carries. §"Loop tasks" collapses to the pointer stub its siblings (§"Blocked tasks", §"Model field", §"Versioning") already use — the 864-byte summary paragraph restates `SPEC/loop.md`'s own opening.

**Retained in core deliberately:** the one-sentence rule that a task-line rewrite preserves the trailing bracket-token run verbatim. It binds every Phase 4 stub flip and every Re-scope, so the *rule* stays in §"Task-line format"; only its rationale moves. Same for the `viz/src/parser.ts` canonical-reference line.

### C. Cross-reference surface (grep-driven, 2026-09-06)

Citations to moved sections, by file:

- **Release gates (must not break):** `claude/skills/ft-release/step-7.1-mirror-pairs.md` — **Pair A** greps `'tasknote templates (full'` across `README.md SPEC.md claude/skills/ft-flowtron/SKILL.md` and names the anchor `SPEC.md:55`, which is inside §"Working in the flowtron repo itself"; **Pair K1** greps `SPEC.md` for the PR-archetype citations and resolves them against `sec="^## What flowtron does NOT provide$"` in `SPEC.md`. Both need their source file repointed.
- **`SPEC/` siblings:** `gates.md:102` (§"🎯 Purpose blurb"), `tasknote-selection.md:363` (§"Long-description conventions"), `procedures/ft-task.md:89,90,152,218` (§"What flowtron does NOT provide", §"Cross-repo edit remit", §"🎯 Purpose blurb", §"Tasknote body shape"), `procedures/README.md:44` (§"Skill namespace"), `epic.md:68` (§"Tasknote body shape" → Fan-out).
- **Skills:** `ft-task` (blurb), `ft-micro-task` (blurb, body shape), `ft-goal-task` (blurb), `ft-starter-task` / `ft-file-followup` / `ft-epic-discovery` (§"Long-description conventions"), `ft-epic-discovery:152` (§"🌳 Fan-out"), `ft-audit-context:69` / `codex/skills/ft-audit:13` (§"Skill namespace"), `ft-update:15` / `ft-stats:16` (§"What flowtron does NOT provide").
- **Wiring + docs:** `AGENTS.md:41,59-60`, `README.md:72,209,281,290`, `SECURITY.md:162`, `claude/AGENTS-snippet.md:56` (§"Lazy SPEC module frontmatter"), `docs/AGENT-NEUTRALITY.md` (4 rows naming moved sections by name, plus the row-40 six-site `--fast` count, two of whose sites — §"🎯 Purpose blurb" and §"Loop tasks" — leave `SPEC.md`), `docs/PLATFORMS.md:525`, `docs/CONVENTIONS.md:66,77,79,137,145`, `docs/VISION.md:30`, `docs/MIGRATION.md:538`, `docs/GLOSSARY.md:17,107`, `docs/PHILOSOPHY.md:51`, `.flowtron/tasknote/README.md:65`.
- **Module enumerations to extend:** `AGENTS.md:59-60` and `README.md:281` both list the lazy modules by name.

`docs/AGENT-NEUTRALITY.md` is a hand-maintained ledger — no release check greps it (verified) — but it is on the doc-drift sweep list, so its moved-section rows are repaired here rather than swept later.

### D. Archive skim

`grep -l 'SPEC.md'` over `archive/core/` returns most of the archive, so the read was scoped to the predecessors already named by `## 🔗 Related` plus the two epic siblings (the ~3-hit probe clause applies; four targeted reads was the cheaper call):

- [[CORE-535.1]] — §E3 supplies the candidate list and §E2 the double-home inventory; §E2 assigns the `park-reason:` table and the §"Operator-gate cues" ¶ to [[CORE-535.5]], so this task touches neither. Fan-out declares `.3` sequential after `.2`, echoed in this note's YAML `blocked-by:`.
- [[CORE-535.2]] — wrote `docs/CONTEXT-BUDGET.md`, the 50,000 budget, and the §7.1 standing check that reads it. Its "Known over budget" table names this task as the `SPEC.md` row's owner, and that row is **self-liquidating**: deleting it is this task's closure obligation, not a later cleanup.
- [[CORE-EPIC-223]] — the precedent split. Its failure mode was verifying `wc -c` in Phase 3 and writing the number into no contract; the ratchet now exists, so this task's Phase 3 measurement has somewhere to land.
- [[CORE-507]] — the extraction pattern: move prose **verbatim**, leave a dispatch line, repair link depth. Its §2.5 caveat ("splitting defers load, it does not remove it") is why the two non-moves above are a deletion and a collapse rather than two more modules — those bytes are removed, not deferred.

### E. Drift check

- All 10 candidate line ranges, both release-gate greps, and every cross-reference in §C verified against HEAD by grep on 2026-09-06.
- `docs/CONTEXT-BUDGET.md`'s `SPEC.md` ledger figure (78,119) matches `wc -c` at HEAD — no drift since [[CORE-535.2]] closed.
- No SPEC contract contradicted: the moves are relocations, and §"Lazy SPEC module frontmatter" (itself moving) states the `paths:` convention the six new modules follow — status/content-triggered modules declare `paths: []`, which is what all six are.
- No downstream-impact scan target: the only open PLAN entries are this epic's own cohort, and the sibling scopes (`.4` skills, `.5` gates.md) are disjoint from the surfaces edited here.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the [[CORE-507]] extraction shape rather than
inventing one: cut the span **verbatim**, give the module the canonical
`paths: []` frontmatter + `> Lazy-loaded SPEC module. Read when …` line, repair
link depth, and leave a dispatch stub in the vacated slot matching the
`Canonical contract: see [\`SPEC/x.md\`]` form §"Blocked tasks" / §"Model field" /
§"Versioning" already use. No new shape was needed and none was invented.

**Minimal refactor gate.** Two deviations from a pure move, both required by
Acceptance rather than taken as cleanup:

- The module was named `SPEC/flowtron-self.md` until the mid-Phase-2 budget
  decision folded §"Layout in adopting projects" into it. An adopter-facing
  section inside a file called "flowtron-self" is a misnomer, so it was renamed
  to `SPEC/layout.md` before any cross-reference pointed at it — free at that
  moment, and a rename later would have touched every citation twice.
- The `### Optional inserts — Fan-out and Handoff` stub was written, then
  deleted: §"Tasknote body shape"'s existing `**Optional inserts.**` bullets
  already name both sections, so the stub duplicated them. One pointer line
  after the bullet list replaced two per-bullet pointers.

Everything else deferred. §"Operator-gate cues"'s double-home with `gates.md`
and the `park-reason:` table's overlap with §"Park conversions" were both left
untouched — [[CORE-535.1]] §E2 assigns them to [[CORE-535.5]].

**Two non-moves, as designed.** §"Operator-cue glossary" (1,604 b) was
*deleted*, not relocated — it was a lossy copy of four `gates.md` tables, and
its one live pointer ("see the glossary below" in §"Operator-gate cues") now
names `SPEC/gates.md` §"Operator-cue vocabulary" directly. §"Loop tasks" (864 b)
collapsed to the pointer stub its siblings already use. Those 2,468 bytes are
removed from the repo, not deferred into a module — the distinction [[CORE-507]]
§2.5 draws.

**Retained in core deliberately.** The rule that a task-line rewrite preserves
the trailing bracket-token run verbatim stays in §"Task-line format" (one
sentence, rationale moved) because it binds every Phase 4 stub flip and every
Re-scope. The `viz/src/parser.ts` canonical-reference sentence went to the
module with the tolerances it introduces.

**Budget arithmetic, twice corrected.** [[CORE-535.1]] §E3's nine candidates
measured 27,743 b — accurate, but never checked against the 50,000 target. Raw
removal landed 51,551 with stubs; the operator added `superseded-claims.md`
(2,453 b), which landed 50,047 — still 47 over, because dispatch stubs and the
retained rules cost more than forecast. Surfaced mid-Phase-2 with corrected
numbers; the operator then took the option declined at Phase 1 (fold
§"Layout in adopting projects" into the module) for real margin. **Final:
49,005 / 50,000 — 995 bytes clear.**

**Release gates.** Two §7.1 mirror-pair checks anchored on moved `SPEC.md`
content and would have broken silently: Pair A's `templates/` roster grep (its
`SPEC.md:55` anchor is now `SPEC/layout.md`) and Pair K1's
`sec="^## What flowtron does NOT provide$"` source (now
`SPEC/scope-boundaries.md`). Both repaired and re-run green.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown contract + skill prose; no executable surface, so no test suite and no
lint/type-check apply (`viz/` untouched). Verification was measurement and the
repo's own standing checks:

- **Budget (the Acceptance number).** `wc -c SPEC.md` = **49,005 / 50,000** —
  down 29,114 bytes (−37.3%) from 78,119 at HEAD. The `/ft-release` §7.1
  context-budget check run against the post-edit tree: `SPEC.md` PASS;
  `SPEC/gates.md` 51,809 and `ft-task/SKILL.md` 33,940 still over, both with
  owner rows confirmed `- [ ]` in PLAN.md → informational, no unowned
  violation, check does not block.
- **Pair A** — `ls templates/` (10 files) against the three roster clauses:
  three hits, one per file, every template named in each. Green.
- **Pair K1** — the citation-resolution loop re-run with
  `src="SPEC/scope-boundaries.md"`: prints nothing. Green.
- **Wrapper-name invariant** — all `claude/commands/ft-*.md` name their own
  basename. Green.
- **Link validation** — every relative link in `SPEC.md`, the six new modules,
  `SPEC/procedures/`, `docs/`, `README.md`, `AGENTS.md`, `SECURITY.md`,
  `templates/PLAN.md`, and `claude/AGENTS-snippet.md` resolved by path check:
  5 broken, all confirmed pre-existing at HEAD (adopter-shaped `../PLAN.md`
  nav-header examples, `core/SPEC.md` in the PLAN template, MIGRATION's
  illustrative `legacy/` paths). Zero introduced.
- **Stale-citation sweep** — grep for every moved section name across the repo
  (excluding archived tasknotes): zero `SPEC.md §"…"` citations left pointing at
  relocated content. `docs/VERSION-HISTORY.md`'s "New `SPEC.md` §"Cross-repo
  edit remit"" line was deliberately **not** rewritten — it records what a past
  release shipped and is accurate as history.
- **Structural pass** — all six modules carry `paths: []` frontmatter, the
  lazy-load line, a final newline, and no trailing whitespace; no heading in
  `SPEC.md` lost its surrounding blank lines (five cut points were checked and
  two repaired).

**Quality assertions.** No avoidable duplication introduced — the one duplicated
pointer (two Optional-inserts bullets naming the same module) was collapsed to
one; the glossary duplicate was removed rather than relocated. No dead content:
every moved span is reachable from a dispatch stub, and every stub names when
its module loads. Public surface grew by six files and shrank by 29,114 bytes
on the surface that is loaded unconditionally.

👁️ `N/A` — no frontend or rendered UI surface changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Cut `SPEC.md` — the file every flowtron task loads in full before it does
anything — from **78,119 to 49,005 bytes (−29,114, −37.3%)**, landing 995 under
the 50,000 budget [[CORE-535.2]] wrote into `docs/CONTEXT-BUDGET.md` and 1,030
under the `/ft-release` §7.1 check that reads it. Nothing was deleted from the
contract except one duplicate: ten narrow-use sections moved **verbatim** into
six new lazy `SPEC/` modules, each reached by a dispatch stub naming when it
loads.

| New module | Carries | Bytes |
|---|---|---|
| `SPEC/plan-parser.md` | parser tolerances, `[unattended]` footguns, excluded shapes, legacy `## Critical`, long-description conventions | 8,310 |
| `SPEC/layout.md` | adopter layout, flowtron-repo layout, lazy-module frontmatter, procedure SOPs, skill namespace | 6,526 |
| `SPEC/scope-boundaries.md` | cross-repo edit remit, what flowtron does not provide, PR archetypes | 5,116 |
| `SPEC/tasknote-inserts.md` | `## 🌳 Fan-out`, `## 🔄 Handoff` | 4,626 |
| `SPEC/purpose-blurb.md` | the 🎯 blurb's bounds and scope | 4,013 |
| `SPEC/superseded-claims.md` | the write-once factual-corrections carve-out | 2,980 |

Two spans were **removed rather than relocated**: §"Operator-cue glossary"
(1,604 b), a lossy copy of four `SPEC/gates.md` tables, and §"Loop tasks"'s
864-byte summary, which restated `SPEC/loop.md`'s own opening — both now single
pointers. That distinction matters: [[CORE-507]] §2.5 warns that splitting
defers load rather than removing it, so 2,468 of the 29,114 bytes are gone from
the repo, not merely moved later in the read order.

**Verification.** `SPEC.md` PASS at 49,005/50,000. Both `/ft-release` §7.1
mirror-pair checks that anchored on moved content — Pair A's `templates/` roster
grep and Pair K1's PR-archetype citation loop — were repaired to their new
source files and re-run green; left alone they would have broken silently at the
next cut, which is the exact failure class Pair K exists to catch. Wrapper-name
invariant green. Every relative link across the touched surfaces resolves (5
pre-existing breaks confirmed unchanged at HEAD, 0 introduced). Repo-wide grep
for each moved section name leaves zero stale `SPEC.md §"…"` citations.

**Cross-references repaired: 39 files.** `AGENTS.md`, `README.md`,
`SECURITY.md`, `templates/PLAN.md`, `.flowtron/tasknote/README.md`, eight
`docs/`, four `SPEC/` siblings, both `SPEC/procedures/`, nine skill bodies, the
Claude snippet, and the Codex wrapper. `docs/AGENT-NEUTRALITY.md` needed more
than a path swap: its `--fast` row counts *sites per file*, and the count fell
from 6 to 4 in `SPEC.md` with 1 appearing in `SPEC/purpose-blurb.md`, while the
`/loop` row's `SPEC.md` anchor moved to `SPEC/scope-boundaries.md`. No release
check greps that ledger, so a path-only repair would have left it quietly wrong.

**Two scope corrections, both surfaced rather than absorbed.** Discovery found
[[CORE-535.1]] §E3's nine candidates land ~1.5k over budget — accurate
measurement never checked against the target — and the operator added
`superseded-claims.md`. That landed 47 bytes over, because my stub-cost estimate
was wrong; rather than quietly trimming untouched prose or amending the budget,
the corrected arithmetic went back to the operator, who took the option they had
declined at Phase 1. The budget was met, not moved — which is the whole point of
[[CORE-535.2]]'s ratchet on the first task to test it.

**Maintainability effect.** The always-loaded set drops from ~78k to ~49k bytes
(~7.3k tokens saved on every task, before any gate module loads), and the
`SPEC/` tree grows by 31,571 — content that now arrives only on the task shape
that needs it. `SPEC.md`'s outline is intact: every moved section still has a
heading in the core spec, so a reader scanning the contract sees the same table
of contents and follows one pointer for the detail. The `docs/CONTEXT-BUDGET.md`
`SPEC.md` row self-liquidated on schedule, leaving only [[CORE-535.4]]'s and
[[CORE-535.5]]'s rows outstanding.

**Doc-drift sweep** across all 18 `.flowtron/tasknote/README.md`
§"AI-referenced docs" entries:

- `README.md` — **updated**: `SPEC/` module list extended with six names; the
  `## 🔄 Handoff` citation repointed to `SPEC/tasknote-inserts.md`; the
  `tools/` CLI carve-out citation repointed to `SPEC/scope-boundaries.md`
- `AGENTS.md` — **updated**: §"Repo Layout" `SPEC/` bullet names the six new
  modules; the §"Skill namespace" pointer names `SPEC/layout.md`
- `SPEC.md` — **updated**: the deliverable — ten sections moved out, one
  deleted, one collapsed, six dispatch stubs added
- `docs/MIGRATION.md` — **updated**: two citations repointed (§"Skill
  namespace" → `SPEC/layout.md`; the `update-adopters.mjs` carve-out →
  `SPEC/scope-boundaries.md`). Adoption and bump procedures are otherwise
  untouched: adopters read `.flowtron/core/SPEC.md` and its modules by the same
  submodule path, so no adoption step changes
- `claude/AGENTS-snippet.md` — **updated**: the §"Lazy SPEC module frontmatter"
  citation now names `SPEC/layout.md`. The fenced paste-block is byte-unchanged
- `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` ·
  `grok/AGENTS-snippet.md` — no change; all three point at the Claude
  paste-block rather than copying it, and none cites a moved section
- `docs/CONVENTIONS.md` — **updated**: six citations repointed (PR archetypes
  ×3 → `SPEC/scope-boundaries.md`, long-description conventions →
  `SPEC/plan-parser.md`, CLI carve-out → `SPEC/scope-boundaries.md`,
  wrapper-name invariant → `SPEC/layout.md`)
- `CONTRIBUTING.md` — no change; cites no moved section
- `SECURITY.md` — **updated**: the `update-adopters.mjs` carve-out citation now
  names `SPEC/scope-boundaries.md`
- `docs/AGENT-NEUTRALITY.md` — **updated**: four rows' File column moved to
  `SPEC/layout.md`; the `--fast` row recounted (6→4 sites in `SPEC.md`, +1 in
  `SPEC/purpose-blurb.md`); the `/loop` row's `SPEC.md` anchor replaced with
  `SPEC/scope-boundaries.md`. No new Claude-specific surface was introduced —
  every registered reference moved file, not kind
- `docs/PLATFORMS.md` — **updated**: three §"Skill namespace" /
  §"Working in the flowtron repo itself" citations repointed to
  `SPEC/layout.md`. The two-layer contract/wiring model is unaffected: the new
  modules are contract-layer, the same as the sections they hold
- `claude/CAPABILITIES.md` — no change; its two `SPEC.md §` citations
  (§"📝 Phase 1: Discovery", §"Post-closure protocol") both name sections that
  stayed. `last-verified` stamp (`v5.24.0 · 2026-08-30`) not bumped — no version
  bump in this task
- `docs/AGENT-COMPAT.md` — no change; cites no moved section
- `docs/EXTERNAL-AGENTS.md` — **updated**: the `## 🔄 Handoff` citation →
  `SPEC/tasknote-inserts.md`, and the `[unattended]` mis-authoring citation
  split (grammar and position stayed in `SPEC.md` §"Task-line format"; the two
  footguns are now `SPEC/plan-parser.md`). Its §"Core principles",
  §"Post-closure protocol", §"Paper-complete guard", and §"Tasknote
  frontmatter" → "Park reason" citations all still resolve
- `docs/WORKTREES.md` — no change; it cites `SPEC/epic.md` §"Fan-out" (a lazy
  module, untouched by this split), not the `SPEC.md` section that moved
- `docs/VISION.md` — **updated**: the terse-mirror pointer now names
  `SPEC/scope-boundaries.md`. §"What we won't accept" itself is unchanged, and
  Pair K1 re-run confirms all eight citations still resolve to real bullets

Off-sweep-set but same commit, by their own contracts:
`docs/CONTEXT-BUDGET.md` (self-liquidated its `SPEC.md` row; ledger refreshed
across the always-loaded set, all 16 lazy modules, all 19 skill bodies, and the
adopter set), `docs/GLOSSARY.md`, `docs/PHILOSOPHY.md`, `templates/PLAN.md`, the
nine skill bodies, and `claude/skills/ft-release/step-7.1-mirror-pairs.md`.

**Archived:** 2026-09-06
