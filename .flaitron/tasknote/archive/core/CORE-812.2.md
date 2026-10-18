---
title: seed-prep-contract
status: completed
tags: [unattended, seed-unattended, prep-unattended, spec]
created: 2026-10-18
due:
related-tasks: [CORE-EPIC-812, CORE-812.1, CORE-812.3, CORE-783.3, CORE-797, CORE-810, CORE-811]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/unattended-candidacy.md
  - SPEC/plan-filing.md
  - SPEC/task-line-segments.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-812.2 | seed-prep-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-812]]

## 🎯 Goal

Rewrite `SPEC/unattended-candidacy.md` so one section contracts the merged `/ft-seed-unattended`: one attended walk over every open row, one prose gate listing marks, preparations (pin or split, each followed by a dependent token item), and stays, with the pin, split, ship-before-act, and self-screen rules kept and the never-writes-the-token rule dropped.

## ✅ Acceptance

- [x] One walk, one section: §"Preparing declined rows" is no longer a `## ` heading in `SPEC/unattended-candidacy.md`; the taxonomy sits under §"Seeding an existing plan" — `test "$(grep -c '^## Preparing declined rows' SPEC/unattended-candidacy.md)" = 0 && grep -q '^### Preparing declined rows' SPEC/unattended-candidacy.md`
- [x] One gate listing marks, preparations each followed by a dependent token item, and stays — `grep -q 'dependent token' SPEC/unattended-candidacy.md && grep -q '^- \*\*Marks\.\*\*' SPEC/unattended-candidacy.md && grep -q '^- \*\*Stays\.\*\*' SPEC/unattended-candidacy.md`
- [x] Never-writes-the-token dropped; `[handoff]` stays unwritten — `! grep -q 'never writes \`\[unattended\]\` or' SPEC/unattended-candidacy.md && grep -q 'never writes \`\[handoff\]\`' SPEC/unattended-candidacy.md`
- [x] Pin, split, ship-before-act, and self-screen rules kept — `grep -q 'Prefer a pin when one fact removes the person' SPEC/unattended-candidacy.md && grep -q 'safe to ship before the act' SPEC/unattended-candidacy.md && grep -q 'passes clauses 1–5 as drafted' SPEC/unattended-candidacy.md`
- [x] Surfaces table carries one seed row and no prep row; the module no longer names `/ft-prep-unattended` — `test "$(grep -c '^| \`/ft-seed-unattended\`' SPEC/unattended-candidacy.md)" = 1 && ! grep -q 'ft-prep-unattended' SPEC/unattended-candidacy.md`
- [x] Drift checks green (Pair N mirrors, Pair Q citations, context budgets) — `bash tools/drift-checks.sh`
- [x] Contract matches CORE-812.1 §"Resolved scoping" (one skill; three-part gate; dependent item drops both ways; `[handoff]` unwritten) — `judgment`: prose correspondence, no command decides it

## 🧩 Subtasks

- [ ] Drop `/ft-prep-unattended` from the module's reader line and from the clause-3 sentence (the seed walk declines a row that reads as needing a person)
- [ ] Rewrite §"Seeding an existing plan": skip classes, one gate in three parts (marks · preparations + dependent token item · stays), what the write covers, the dependency rule both ways, clause 6 over marks and items alike, one filing commit; drop never-writes-the-token, keep `[handoff]` unwritten
- [ ] Demote §"Preparing declined rows" to `###` under it; keep the Pin / Split / Stay bullets verbatim; replace its closing paragraph with the link back to the gate
- [ ] Collapse the two surfaces-table rows into one `/ft-seed-unattended` row
- [ ] Phase 3: run the Acceptance commands, `bash tools/drift-checks.sh`, `/code-review medium` on this diff
- [ ] Phase 4: doc-drift sweep, PLAN stub nested under CORE-EPIC-812, archive

## 🔗 Related

- [[CORE-EPIC-812]] — parent epic
- [[CORE-812.1]] — Discovery; "Resolved scoping" table fixes the gate shape this contract writes down
- [[CORE-812.3]] — follow-up; folds the prep classification into the seed skill body per this contract
- [[CORE-783.3]] — shipped `/ft-prep-unattended` and §"Preparing declined rows"
- [[CORE-797]] — split-safety guard G2 that must survive the merge
- [[CORE-810]] · [[CORE-811]] — ship-before-the-act test and drafted-row self-screen

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-812.1 settled the shape (one skill, one three-part gate, dependent token items) and this child writes it into the contract module ahead of `.3`'s skill-body fold. The two sections today describe two walks over the same rows with duplicated skip rules, gate prose, and commit prose; a fix to one (CORE-810, CORE-811) did not reach the other.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` in full; `claude/skills/ft-seed-unattended/SKILL.md` and `claude/skills/ft-prep-unattended/SKILL.md` (the two gate shapes the merged contract must cover); `SPEC/task-line-segments.md:38-46` (cross-reference paragraph); `tools/drift-checks.sh` `pair_q` (section-citation resolver) and `context_budget`; `docs/CONTEXT-BUDGET.md` §"Not budgeted" and the lazy-module ledger; archived `CORE-812.1` §"Resolved scoping" and `## 🌳 Fan-out`

- [x] **Best Practices Review** — module-boundary work: the module is the single source for the predicate and the pin/split/stay taxonomy; both skills Read it and mirror §"Three postures". The merge removes the duplicated procedure prose (skip classes, gate, commit) and keeps the taxonomy bullets verbatim. Dependency direction unchanged: skills → module; the module names skills only in its reader line, clause 3, and the surfaces table.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (1,049 notes). Hits for the two section names: CORE-619, CORE-724.5, CORE-736, CORE-783.3, CORE-783.N, CORE-797, CORE-798, CORE-799, CORE-810, CORE-811, CORE-812.1. Final Summaries of CORE-783.2 / CORE-797 / CORE-810 / CORE-811 read; findings below.

- [x] **Drift check** — PLAN line matches HEAD: both headings exist at `SPEC/unattended-candidacy.md:138` and `:164`, the two table rows at `:276-277`, the never-writes sentence at `:219`. The module measures 17,307 bytes against the ledger's 16,493 (CORE-810/811 landed after the v7.2.0 stamp, unstamped by precedent); the module is in the budget doc's "not budgeted" lazy class, so no cap binds. The `.1` Fan-out names `.2` only as `.3`'s predecessor, so no `blocked-by:` echo lands on this note.

- [x] No clarifications needed. Assumptions: (1) the merged section keeps the heading `## Seeding an existing plan`, as the PLAN line says; (2) the pin/split/stay taxonomy becomes `### Preparing declined rows` under it — Pair Q matches `# <Title>` as a prefix, so the five out-of-module citers (`claude/AGENTS-snippet.md`, `claude/skills/ft-prep-unattended/SKILL.md`, `SPEC/task-line-segments.md`, `docs/GLOSSARY.md`, `docs/EXTERNAL-AGENTS.md`) keep resolving without edits here; every one of them describes the prep skill, which stays shipped and unchanged until `.4` retires it, so their prose stays true in the interim; (3) the two skill bodies are not touched — `.3` folds the body, `.4` retires the slug; (4) the budget ledger is not re-stamped (release-time, per the CORE-810/811 precedent).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Archive findings:
- [[CORE-783.2]] — clause 3 is two layers; "An LLM filer and `/ft-prep-unattended` decline a row that reads as needing a person" is the semantic layer. The merge keeps the sentence and names the seed walk instead.
- [[CORE-797]] — both prep guards held only because the walk read the whole section, not the pin and split bullets alone. The merged section keeps the bullets contiguous under one sub-heading and the gate prose directly above them.
- [[CORE-810]] — the ship-before-the-act test in the Split bullet; kept verbatim.
- [[CORE-811]] — the drafted mechanical row passes clauses 1–5 as drafted (self-screen); a remaining trip turns the split into a stay. Kept verbatim. Distinct from the token item's test, which is the full predicate (clause 6 included) over the resulting row.

Design of the merged gate (from `.1` §"Resolved scoping"): marks (admitted rows as they stand, token in place) · preparations (pins and splits, each followed by a dependent token item on the resulting row the predicate admits as drafted) · stays (first failed clause). Dropping the preparation drops its item; dropping the item keeps the preparation and leaves the row unmarked for a later walk. A preparation whose result the predicate still declines (a pinned `[heavy]` row; a mechanical `.k` whose predecessor is open and not a candidate) carries no item. Clause 6 counts a kept token item as a candidate in the same walk, so the "drops every row leaning on it" rule covers both lists. One filing commit covers tokens, rewrites, mechanical rows, and starters.

Downstream, as judged at Discovery: `SPEC/task-line-segments.md:41-43` ("prepared, never marked, by `/ft-prep-unattended`") was to be left for `.4`. Review pass 1 overturned that — `.4`'s PLAN line does not name the file, and two more sentences in `SPEC/plan-filing.md` contradicted the new contract — so Phase 3 reconciled all three SPEC modules here (Testing Notes). The four snippets, `docs/GLOSSARY.md`, and `docs/EXTERNAL-AGENTS.md` still describe the shipped prep skill and stay for `.4`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the module's own shape: bold-lead bullets for the taxonomy (Pin / Split / Stay already), a bulleted three-part gate list in the same style, paragraphs for the write and skip rules; `###` is new to this module but standard in sibling SPEC modules

- [x] **Minimal refactor gate** — no refactor; the Pin / Split / Stay bullets are byte-identical to HEAD, the surrounding prose is the rewrite the task asks for, and the four other mentions of the prep slug in the module (reader line, clause 3, closing paragraph, table row) are the ones the PLAN line's "collapse" and "drop" name

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (contract prose; `tools/drift-checks.sh` is the executable check and ran green)

**Implementation Notes:**

Five edits to `SPEC/unattended-candidacy.md`: (1) reader line drops the prep clause; (2) clause 3's semantic layer names `/ft-seed-unattended`; (3) §"Seeding an existing plan" rewritten — skip classes, the three-part gate (Marks · Preparations with dependent token item · Stays), what the write covers, the dependency rule both ways, clause 6 counting a kept token item as a same-walk candidate, one filing commit, `[handoff]` never written, seeds-never-repairs, existing filers keep their gates; (4) `## Preparing declined rows` → `### Preparing declined rows` under it, bullets verbatim, closing paragraph replaced by the link back to the gate and the "earns its item from the predicate alone" rule; (5) the two surfaces-table rows collapsed into one, owner `[[CORE-619]] · [[CORE-EPIC-812]]`. Size 17,307 → 18,292 bytes (the gate list and the write rule are longer than the two closing paragraphs they replace); the module is unbudgeted.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (the executable suite for SPEC prose: Pair N mirrors, Pair Q citations, context budgets, final newlines)

- [x] Ran lint/type-check on changed code — N/A (markdown only); trailing-whitespace grep on the diff → 0 lines

- [x] **Verification receipt** — below; no duplication introduced (the taxonomy bullets stay single-sourced; the gate prose that lived twice now lives once), no dead text (the prep closing paragraph and table row are gone), stale sibling prose reconciled per review pass 1

- [x] **External review** — `/code-review medium` on the working-tree diff, two passes; dispositions below

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (after pass-1 fixes, all on `SPEC/unattended-candidacy.md` unless named):
- A1 `test "$(grep -c '^## Preparing declined rows' …)" = 0 && grep -q '^### Preparing declined rows' …` → 0
- A2 `grep -q 'dependent token' … && grep -q '^- \*\*Marks\.\*\*' … && grep -q '^- \*\*Stays\.\*\*' …` → 0
- A3 `! grep -q 'never writes `[unattended]` or' … && grep -q 'never writes `[handoff]`' …` → 0
- A4 `grep -q 'Prefer a pin when one fact removes the person' … && grep -q 'safe to ship before the act' … && grep -q 'passes clauses 1–5 as drafted' …` → 0
- A5 `test "$(grep -c '^| `/ft-seed-unattended`' …)" = 1 && ! grep -q 'ft-prep-unattended' …` → 0
- A6 `bash tools/drift-checks.sh` → 0 (17 checks ok, Pair N / Pair Q / `context_budget` included)
- A7 judgment: the gate is marks · preparations + dependent token item · stays; dropping the preparation drops the item, dropping the item keeps the preparation; `[handoff]` never written — matches `.1` §"Resolved scoping".
- Sizes: `unattended-candidacy.md` 17,307 → 18,856 (unbudgeted); `plan-filing.md` 25,866 → 26,066 (unbudgeted); `task-line-segments.md` 6,199 → 6,208 (cap 10,000).

External review, pass 1 — eight findings:
1. **blocker, fixed** — `SPEC/plan-filing.md` §"Filing commits" recognized only ` [unattended]` insertions for seed and attributed rewrites and mechanical rows to prep; a merged seed commit would have been refused as unrecognized. Seed's rewrites and inserted mechanical rows are now recognized alongside prep's; prep's mentions stay for `.4`.
2. **blocker, fixed** — `SPEC/plan-filing.md` §"Filing commits" said seed "edits existing rows rather than filing new ones", and §"ID allocation" did not list seed as a minter. Both reconciled; seed now mints a standalone split's ID.
3. **blocker, fixed** — `SPEC/task-line-segments.md` said a declined row is "prepared, never marked, by `/ft-prep-unattended`". Rewritten: the same walk prepares a declined row and marks the result only when the predicate admits it. (Discovery had parked this for `.4`, whose PLAN line does not name the file; the reviewer was right that it had no owner.)
4. **blocker, fixed** — "every other byte verbatim" was undefined for a token item on a prepared row. Now: verbatim to the file on a mark, to the drafted bytes on an item.
5. **blocker, fixed** — Stays listed "the first clause it failed" while the Stay bullet promises a path, a colliding note or stub, or the missing `.N`. The Stays entry now carries that reason where the bullet asks for one.
6. **note, accepted** — the module drops `/ft-prep-unattended` from its reader line and surfaces table while the skill is still shipped. This is the interim the epic chose at `.1`: the PLAN line for this task says "collapse the two surfaces-table rows", `.3` leaves the prep body in place, `.4` retires it, and the three land in one minor, so no released tag carries the interim. Pair N still passes on the prep body.
7. **blocker, fixed** — "reported as counts" contradicted "a mis-positioned marker is named in the report". The skip sentence now says the mis-positioned one is also named.
8. **blocker, fixed** — with `.k-1` as the undeclared stem predecessor, a split's mechanical row (always the next `.k` after the highest sibling) would wait on its own open remainder whenever the source is the highest sibling, so the dependent token item could never fire on the most common split shape. Clause 6 now says a mechanical row waits on its source's stem predecessor, not on the remainder: the slice is independent of the act by construction. A rule `.1` did not pre-decide; called out in the recap.

External review, pass 2 — eight findings:
1. **note, accepted** — the interim prep skill could read the merged section as licensing a token write. Its own body says "never writes `[unattended]`" at three steps and governs its writes; same interim as pass-1 #6, closed by `.3`/`.4` before any release.
2. **blocker, fixed** — "a stale `[handoff]` and a cleared `Blocked by`" were said to be *named* in the report, though `[handoff]` rows are skipped before the predicate and nothing detects staleness. Now: left as they stand, never rewritten (the shipped seed skill's own wording).
3. **note, already fixed** — `touches:` had been widened to the three SPEC files before the review read the note; the Discovery "recorded, not reconciled" paragraph is amended above to say pass 1 overturned it.
4. **note, accepted** — `SPEC/task-line-segments.md` now states the merged walk as fact ahead of the `.3` body. Interim, same minor; the operator's call is whether any release lands between `.2` and `.4` (recap).
5. **note, accepted** — `SPEC/plan-filing.md`'s recognizer accepts seed rewrites and inserted rows ahead of a body that produces them. Interim, same minor.
6. **blocker, fixed** — a pin on a `[heavy]` row was the example of an unmarked preparation, leaving it ambiguous whether such a pin is a preparation or a stay. Decided: a pinned row passes clauses 1–5 as drafted or the row stays (the Pin bullet now says so; the Stay bullet covers a pin or a split whose drafted row trips), so only clause 6 leaves a preparation unmarked. A tightening of the prep taxonomy; called out in the recap.
7. **blocker, fixed** — nothing said whether preparations alone open the gate or what a walk with nothing to show does. Now: the gate opens on a mark or a preparation; neither → counts and stays, no gate, no commit.
8. **note, fixed** — clause-6 settlement was restated three times. The seeding section's two sentences are one: a kept token item counts as a candidate in the same walk, for settling a dependent and for the §"Three postures" re-read; the predicate and that section stay canonical.

Receipt after pass-2 fixes: A1–A5 → 0, `bash tools/drift-checks.sh` → 0, trailing-whitespace grep on the diff → 0; `unattended-candidacy.md` 18,930 bytes.

External review, pass 3 — six findings:
1. **blocker, fixed** — the pass-1 clause-6 exception (a mechanical row waits on its source's predecessor) is knowable only inside the walk that cut the row; a later walk reads the default `.k-1` and strands it. Reverted. The contract now states the structural default once: a mechanical `.k` takes the next number after the highest sibling, so it waits on that sibling — the remainder itself when the source was the highest — and a later walk reads it the same way. The "later walk offers it as a mark" promise is now conditional on the predicate then admitting it.
2. **blocker, fixed** — the pass-2 pin narrowing (pinned row must pass clauses 1–5) silently removed pins from `[heavy]` rows, which HEAD allowed and the PLAN line says to keep. Reverted; the bullets are byte-identical to HEAD again (`diff` → identical). The pass-2 ambiguity is resolved the other way: the Preparations bullet names the preparation-without-item cases (a pin on a `[heavy]` row, clause 1; a `.k` with an open non-candidate predecessor, clause 6) and says the gate names the clause instead of an item.
3. **note, accepted** — interim prep skill reads a section that speaks of token items; third statement of the pass-1 #6 interim. Not fixed here; the recap asks the operator to keep `.2`–`.4` inside one release.
4. **blocker, fixed** — `SPEC/plan-filing.md`'s recognizer named seed's token insertion and description rewrite as separate shapes, so a kept pin with a kept item (one line carrying both) and a mechanical row arriving with its token matched neither. Both composites are now named.
5. **note, fixed** — the dependent-item rule lived twice (Preparations bullet and the subsection's closing paragraph). The closing paragraph no longer re-derives it.
6. **note, deferred to `.4`** — `docs/GLOSSARY.md:67/71/151`, `docs/EXTERNAL-AGENTS.md:63`, and `claude/AGENTS-snippet.md:24` still describe prep as the preparer and seed as the marker walk. They describe the shipped bodies, which `.3` and `.4` replace; `.4`'s PLAN line says "roster docs" and "the four snippets" without naming the two docs by path. The recap proposes naming them on `.4`'s line.

Receipt after pass-3 fixes: A1–A5 → 0, `bash tools/drift-checks.sh` → 0, trailing-whitespace grep → 0; sizes `unattended-candidacy.md` 18,659 · `plan-filing.md` 26,170 · `task-line-segments.md` 6,208.

External review, pass 4 — seven findings, no blocker:
1. **note, kept as decided** — re-argues pass-1 #8: a mechanical `.k` cut from the highest sibling waits on the open remainder, so its item cannot fire. Pass 3 showed the alternative is not durable across walks. Kept as the conservative default (a false negative is the status quo the predicate chooses); one rationale sentence added so the choice reads as deliberate.
2. **note, no change** — the reviewer read the tasknote before the pass-3 entry landed; the receipt it calls stale is followed by the pass-3 receipt with the reverts and the 18,659 reading.
3. **note, kept as decided** — re-argues pass-2 #6 the other way: a pin on a `[heavy]` row can never be admitted. HEAD allowed the pin, the PLAN line says keep the pin rules, and the pinned row still reads better and becomes a candidate on an operator retag; the Preparations bullet already names it as the clause-1 no-item case.
4. **note, fixed** — `SPEC/plan-filing.md` §"Filing commits" said the same clause twice back to back; now one clause naming both skills. §"ID allocation" says "each on a standalone split".
5. **note, fixed** — `SPEC/task-line-segments.md` cited the `###` taxonomy for the marking rule; it now cites §"Seeding an existing plan".
6. **note, fixed** — a mark leaning on a dropped *item* (not a dropped mark) was implicit; the re-read sentence now says "a dropped mark or a dropped item".
7. **note, deferred** — nothing in the repo blocks a release between `.2` and `.4`. Proposal in the recap: a "no release before `.4`" note on the parent or `.N` line, written by the operator.

Final receipt: A1–A5 → 0, `bash tools/drift-checks.sh` → 0 (17 ok), trailing-whitespace grep → 0; sizes `unattended-candidacy.md` 18,840 · `plan-filing.md` 26,086 · `task-line-segments.md` 6,209 (cap 10,000). Pin / Split / Stay bullets `diff` against HEAD → identical.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change (the retired-table row is `.4`'s) · `claude/AGENTS-snippet.md` no change here — its line 24 describes the shipped prep and seed bodies, its citation still resolves, and the four snippets are `.4`'s sweep · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (`.4`) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change here — line 63 describes the shipped prep skill and is named for `.4` below · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.2` line → stub nested under CORE-EPIC-812, tasknote moved to `.flaitron/tasknote/archive/core/`. No superseded-claim pointer: CORE-783.1's "seed stays a one-gate marker walk" was a decision, revisited by this epic, not a falsified fact.

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — N/A (the single-source rule and the review-pass pattern are already in the always-loaded layer)

**Final Summary:**

`SPEC/unattended-candidacy.md` now contracts one `/ft-seed-unattended` walk: every open row, one prose gate in three parts — marks (admitted rows, token in place), preparations (pins and splits as the bytes the write will produce, each followed by a dependent token item when the predicate admits the result as drafted), stays (first failed clause, plus the path, collision, or missing `.N` where the taxonomy asks for one) — and one filing commit covering tokens, rewrites, mechanical rows, and starters. Dropping a preparation drops its item; dropping an item keeps the preparation and leaves the row unmarked; a kept item counts as a same-walk candidate for clause 6 and the §"Three postures" re-read. The never-writes-the-token sentence is gone; `[handoff]` is still never written; the gate opens on a mark or a preparation and a walk with neither stops without one. The Pin / Split / Stay bullets are byte-identical to HEAD under a `###` heading inside the merged section, so the five out-of-module citers still resolve. The surfaces table has one seed row.

Changed: `SPEC/unattended-candidacy.md` (17,307 → 18,840), `SPEC/plan-filing.md` (seed named as an ID minter on a standalone split; §"Filing commits" recognizes seed's rewrites, its inserted mechanical rows, and the composite line a kept pin with a kept item produces), `SPEC/task-line-segments.md` (the cross-reference paragraph says the same walk prepares and marks; citation re-aimed). Verification: five Acceptance greps → 0 after every pass; `bash tools/drift-checks.sh` → 0; four `/code-review medium` passes — 11 blockers fixed, 2 kept as deliberate conservative defaults, the rest notes fixed or deferred (Testing Notes). No refactor. `touches:` reconciliation: declared 3, changed 3 (`SPEC/unattended-candidacy.md`, `SPEC/plan-filing.md`, `SPEC/task-line-segments.md`) — the last two were added during Phase 3 when review pass 1 showed them contradicting the new contract; the PLAN line named only the module. Maintainability: the procedure prose that lived twice (skip classes, gate, commit) lives once; the taxonomy stays single-sourced.

Two defaults the reviewers argued both ways, kept conservative: (1) a split's mechanical `.k` waits under clause 6 on the highest numeric sibling — the remainder itself when the source was the highest — so its item fires only when that sibling is closed or a mark; the in-walk exception tried in pass 1 is not knowable to a later walk. (2) A pin on a `[heavy]` row is a preparation without an item, as HEAD allowed; a pin never changes `[model]`.

Interim state, by the epic's sequencing: the shipped `/ft-prep-unattended` body still Reads this module, and `claude/AGENTS-snippet.md:24`, `docs/GLOSSARY.md:67/71/151`, and `docs/EXTERNAL-AGENTS.md:63` still describe prep as the preparer and seed as marks-only, until `.3` folds the body and `.4` retires the slug. Two proposals for the operator, both edits to sibling PLAN lines this task did not make: name `docs/GLOSSARY.md` and `docs/EXTERNAL-AGENTS.md` on `CORE-812.4`'s line (its "roster docs" does not name them by path), and carry a "no release before `.4`" note on `CORE-EPIC-812` or `CORE-812.N` so no tag ships the interim.

**Archived:** 2026-10-18
