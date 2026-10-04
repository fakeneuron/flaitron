---
title: spec-section-extract
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-607, CORE-657]
touches:
  - SPEC.md
  - SPEC/task-line-segments.md
  - SPEC/unattended-candidacy.md
  - SPEC/gate-postures.md
  - SPEC/model.md
  - SPEC/plan-parser.md
  - SPEC/plan-filing.md
  - SPEC/procedures/ft-task.md
  - SPEC/fixtures/plan/README.md
  - claude/skills/ft-seed/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - docs/CONTEXT-BUDGET.md
  - docs/EXTERNAL-AGENTS.md
  - docs/AGENT-NEUTRALITY.md
  - docs/GLOSSARY.md
  - README.md
  - AGENTS.md
  - CONTRIBUTING.md
---

# CORE-664 | spec-section-extract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-607]] · [[CORE-657]]

## 🎯 Goal

Recover `SPEC.md` headroom back to the ~2-working-unit standard by lifting one
substantial section into a lazy `SPEC/` module, leaving a stub at the heading so
cross-file citations resolve, and registering the new file in
`docs/CONTEXT-BUDGET.md`.

## ✅ Acceptance

- [x] `SPEC/task-line-segments.md` exists as a lazy module carrying the segment
      table, the examples block, and the `[unattended]`-candidacy paragraph
      verbatim apart from re-based links —
      `sed -n 3p SPEC/task-line-segments.md | grep -q 'Lazy-loaded SPEC module'`
      + a verbatim diff of the moved range against `git show HEAD:SPEC.md`
      showing only link re-bases (recorded in Testing Notes)
- [x] `SPEC.md` keeps `## Task-line format` as a stub carrying the grammar
      block, the optionality/ordering rule, the trailing-bracket-token
      preservation rule, and pointers to the new module and
      `SPEC/plan-parser.md` — `grep -q '^## Task-line format$' SPEC.md` and
      `grep -c '^## ' SPEC.md` still prints `30`
- [x] The Phase 4 stub-rewrite rule stays always-loaded (not moved) so closure
      needs no module read — `grep -q 'trailing bracket-token run' SPEC.md`
- [x] `wc -c SPEC.md` ≤ 47,100 (≥ 2 working units ≈ 5,900 under the unchanged
      53,000 cap) and `wc -c SPEC/task-line-segments.md` ≤ 10,000
- [x] No non-archive surface cites moved material as living in `SPEC.md` —
      `grep -rn --exclude-dir=archive --exclude-dir=.git --exclude-dir=node_modules -E 'SPEC(\.md)? §"Task-line format"' .`
      returns only citations satisfied by the stub's retained content
      (`judgment`; the per-citer verdict table is recorded in Testing Notes)
- [x] ~~Every surface that *writes* a PLAN row Reads the module at its filing
      step~~ — **revised in Phase 2.** Each filing skill already carries the row
      shape it writes inline and cites `SPEC.md` only for the grammar and the
      token position, both retained in the stub; forcing six mandatory Reads
      would have added context cost for no gain, inverting the task's purpose.
      The module is wired as a **citation**, on the `SPEC/plan-parser.md`
      precedent (cited, never force-Read). Revised criterion: every skill
      citation whose cited fact moved now names the module —
      `grep -c 'task-line-segments' claude/skills/ft-{file-followup,epic-discovery,seed,refactor,audit,audit-repo}/SKILL.md`
      (each ≥ 1 — `ft-audit` / `ft-audit-repo` joined after the external review
      found they carried the moved sentence too), and no skill gains a Read
      instruction
- [x] `/ft-task`, `/ft-micro-task`, and `SPEC/procedures/ft-task.md` still run a
      task end-to-end without loading the module — `judgment`: reading a row
      needs only the retained grammar, so no Read is wired onto a runner.
      `ft-task/SKILL.md` carries one *citation* (its `[!critical]` line), which
      is a pointer, not a load
- [x] `docs/CONTEXT-BUDGET.md`: new Budgets row `SPEC/task-line-segments.md`
      10,000 with its "why" cell (sized in Phase 2 once the file measured
      5,490: file + ~1.5 working units, the sibling rule — Discovery's estimate
      of 9,000 predated the measurement); `SPEC.md` cap unchanged at 53,000 with the
      extract noted; §Ledger `SPEC.md` figure, lazy-module list, cold-start sum,
      and split note refreshed — the CI `Context budget` block run locally →
      exit 0, no `OVER BUDGET`
- [x] Every repointed `§"…"` citation resolves to a real heading or bold-lead in
      its named file — the CI `Pair Q` step run locally → exit 0
- [x] Rosters naming `SPEC/` contents name the module, each in its own idiom —
      `grep -q 'task-line-segments' README.md` (filename-style roster) and
      `grep -q 'task-line segment semantics' AGENTS.md` (concept-style roster;
      it names "PLAN parser tolerances", not `plan-parser`, so the filename grep
      Discovery wrote never fitted this file)
- [x] `docs/AGENT-NEUTRALITY.md` row 40 file-set recounted for `SPEC.md` and the
      new module — `judgment` (recount grep recorded in Testing Notes)
- [x] Full validation roster green (`npm --prefix viz test` / `typecheck` /
      `lint` / `build`; `node --test tools/update-adopters.test.mjs`) — parser
      and fixtures are unaffected by a prose move, so this is a regression guard
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md`
      §"AI-referenced docs" — `judgment`

## 🧩 Subtasks

- [x] Create `SPEC/task-line-segments.md`: title + lazy-load trigger line naming
      the filing surfaces that load it, then move `SPEC.md` lines 84–106 (table
      + examples) and 114–124 (`[unattended]` candidacy) verbatim; re-base the
      `SPEC/*.md` and `docs/*.md` link paths for the new depth
- [x] Rewrite `SPEC.md` §"Task-line format" as a stub: keep the grammar block,
      the optionality/ordering prose, and the trailing-bracket-token
      preservation rule; add the module pointer above the existing
      `SPEC/plan-parser.md` pointer
- [x] Repoint intra-`SPEC/` citers whose cited fact moved:
      `unattended-candidacy.md` (4 cites), `gate-postures.md`, `model.md`,
      `plan-parser.md` (its boundary sentence), `plan-filing.md`,
      `procedures/ft-task.md`, `fixtures/plan/README.md`
- [x] ~~Wire the Read at each filing step~~ → **repoint the filing skills'
      citations** (revised in Phase 2, see Acceptance): `ft-file-followup`,
      `ft-epic-discovery`, `ft-seed`, `ft-refactor`. `ft-audit` /
      `ft-audit-repo` needed no edit — both cite only the grammar and the token
      position, which the stub retains.
- [x] Repoint docs citers: `docs/EXTERNAL-AGENTS.md` (grammar + marker rows),
      `docs/GLOSSARY.md` term pointers
- [x] Rosters: `README.md` + `AGENTS.md` `SPEC/` bullets, `CONTRIBUTING.md`
      SPEC.md description
- [x] `docs/CONTEXT-BUDGET.md`: new Budgets row, §Ledger numbers, cold-start sum,
      lazy-module list, split note
- [x] `docs/AGENT-NEUTRALITY.md` row 40: file set + recount
- [x] Phase 3: `wc -c`, verbatim diff, heading count, citation grep + verdict
      table, Read-wiring grep, CI budget block, CI Pair Q, neutrality recount,
      validation roster

## 🔗 Related

- [[CORE-607]] — predecessor; established the extract-to-lazy-module recipe (`SPEC/post-closure.md`) and the 53,000 cap
- [[CORE-657]] — predecessor; de-scoped its own headroom recovery and re-filed it here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The premise verifies exactly — `wc -c SPEC.md` = 51,024 against
  the 53,000 cap, leaving 1,976 chars, below the +1,127…+2,957 working unit
  `docs/CONTEXT-BUDGET.md` measured for this file. All three candidate sections
  named in the PLAN line still exist at the cited shapes. The CORE-607 recipe is
  intact and re-runnable. No re-scope: the task is to pick one section and
  extract it, and one of the named candidates clears the target on its own.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**A. Premise verified, no drift.** `wc -c SPEC.md` = 51,024 — the PLAN line's
figure byte-for-byte. Cap 53,000, headroom 1,976. `docs/CONTEXT-BUDGET.md`
measures a substantial `SPEC.md` edit at +1,127 to +2,957 across 45 touching
commits, so the ~2-unit standard wants ≈5,900 of headroom — i.e. `SPEC.md` at
≈47,100 or below, a net removal of ≈3,900+.

**B. Candidate arithmetic.** Measured each candidate the PLAN line named, plus
two it did not, against that ≈3,900 bar:

| Candidate | Block | Net after stub | Headroom | Units |
|---|---|---|---|---|
| Task-line segment table + examples + candidacy (84–124) | 4,938 | ~4,240 | ~6,200 | ~2.1 ✅ |
| Phase 3 external-review rationale (485–521) | 2,259 | ~1,860 | ~3,840 | ~1.3 ✗ |
| Phase 3 verify-rule + receipt + review (458–521) | 3,736 | ~3,300 | ~5,280 | ~1.8 ✗ |
| Paper-complete guard (711–772) | 2,849 | ~2,450 | ~4,430 | ~1.5 ✗ |
| Phase 4 rationale prose (557–665) | 6,658 | ~5,900 | ~7,900 | ~2.7 — not lazy |

Only the segment table clears the standard as a single-section extract, which is
the shape the PLAN line scopes. Operator chose it (AskUserQuestion, this run).

**C. Why it is genuinely lazy.** The laziness boundary is read-vs-write, not
frequency. A runner *reading* a PLAN row at Step 1 needs the grammar line and
the ordering rule — both stay in the stub, and `/ft-task` + `/ft-micro-task`
already restate the grammar inline in their own bodies. The per-segment
semantics (the `[model]` token vocabulary, `[unattended]`'s deny-by-default
consumer contract, `[handoff]`'s pair-precedence rule) are consumed when
*writing* a row, which only the filing surfaces do — and those already Read
`SPEC/unattended-candidacy.md` at that same moment, so the module arrives with a
read they already perform. This is the CORE-607 shape: post-closure.md moved
because it arrives only at a closing runner's final step.

**D. One block deliberately stays behind.** The
"a rewrite preserves the trailing bracket-token run verbatim" rule (lines
108–112) is a *closure-path* rule — Phase 4 flips the PLAN line to stub form and
must copy every other bracket token; `SPEC/plan-filing.md` and
`docs/EXTERNAL-AGENTS.md` both cite it for exactly that. Moving it would put a
module read on every task's Phase 4. Kept in the stub; the move is therefore
lines 84–106 + 114–124, ~4,450, netting `SPEC.md` to ≈46,970 (~2.0 units).

**E. New module, not `SPEC/plan-parser.md`.** `plan-parser.md`'s own header
sentence draws the boundary explicitly: "The canonical task-line grammar itself
stays in `SPEC.md` §'Task-line format'; this module carries the tolerances,
footguns, exclusions…". Folding the segment table in there would contradict that
module's stated remit and force a rewrite of its framing, and it would recover
headroom without a budget row — the very move `docs/CONTEXT-BUDGET.md` calls
gaming the number. A new `SPEC/task-line-segments.md` with its own row is the
CORE-607 precedent.

**F. Archive skim (`archive/core/`, 723 notes cite `SPEC.md`).** Read
`CORE-607.md` in full — it is the recipe of record and this tasknote's Acceptance
and Subtasks are modelled on it directly (module + stub + citer repoint + Read
wiring + rosters + budget row + neutrality recount + verbatim-diff verification).
`CORE-657`'s PLAN stub records why the headroom work was re-filed here: its own
incident-history material was already resident in `SPEC/gate-discipline.md` and
`SPEC/scope-boundaries.md`, so no extract was available there. The cap history
(`CORE-555` 50k→55k, `CORE-558.5` →57k, `CORE-607` →53k) is settled and this task
raises no cap — headroom comes from the move alone.

**G. Blast radius, measured.** `§"Task-line format"` is the most-cited section in
the repo: ~20 non-archive citers across `SPEC/` modules, six skills, four `docs/`
files, three templates, and `SPEC/fixtures/plan/README.md`. The stub preserves
every citation *syntactically* (CI Pair Q resolves on the heading), so the work
is semantic: for each citer, decide whether the fact it cites survives in the
stub or moved to the module. That per-citer verdict is a Phase 3 judgment
criterion with its table recorded in Testing Notes, not a grep that can pass
vacuously. No release mirror pair anchors on the moved text (`grep` over
`step-7.1-mirror-pairs.md` → the only hits are Pair Q and Pair R, both generic).

**H. Best-practices review.** Prose/contract work, no code. Dependency direction
is preserved — `SPEC/` modules may cite `SPEC.md` and each other; the new module
adds no inbound edge to always-loaded material. No duplication introduced: the
table exists in exactly one place after the move, and the stub carries pointers,
not a second copy. `docs/GLOSSARY.md` already restates several segment
definitions in its own idiom; those are glossary entries, not a mirror pair, so
they get pointer updates rather than being folded in.

**No clarifications needed** beyond the one asked. Explicit assumptions:
(1) the 53,000 cap stays — this task raises no cap; (2) the new module's budget
is sized like its siblings, file (~4,700) plus ~1.5 working units ≈ 9,000;
(3) the moved text is verbatim apart from link re-basing for the new depth;
(4) no runner gains a Read — if Phase 2 finds a runner that genuinely needs the
segment semantics mid-run, that falsifies assumption (3)'s laziness premise and
returns here before wiring one.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt.**

```text
sed -n 3p SPEC/task-line-segments.md | grep -q 'Lazy-loaded SPEC module'   → 0
grep -q '^## Task-line format$' SPEC.md                                    → 0
grep -c '^## ' SPEC.md                                                     → 30 (unchanged)
grep -q 'trailing bracket-token run' SPEC.md                               → 0 (2 hits)
wc -c SPEC.md                                                              → 46,908  (≤ 47,100)
wc -c SPEC/task-line-segments.md                                           → 5,691   (≤ 10,000)
grep -c 'task-line-segments' <6 filing skills>                             → ≥1 each
grep -c 'task-line-segments' ft-task (citation only) / ft-micro-task / procedures/ft-task  → 1 / 0 / 0
stale-cite sweep: grep 'never writes ... (SPEC §"Task-line format")'      → 1 (no hits, correct)
every CONTEXT-BUDGET figure re-checked against wc -c                       → 6/6 match
cold-start sum recomputed from the seven rows                              → 121,840 = asserted
grep -q 'task-line-segments' README.md                                     → 0
grep -q 'task-line segment semantics' AGENTS.md                            → 0
CI "Context budget" block (run locally)                                    → 0  "context budget OK"
CI "Pair Q — section citations resolve" (run locally, module in scope)     → 0  "Pair Q OK"
trailing-whitespace grep over changed .md                                  → 1 (no hits, correct)
final-newline check over changed .md                                       → 0 (no offenders)
npm --prefix viz test                                                      → 0  (29 files, 578 tests)
npm --prefix viz run typecheck                                             → 0
npm --prefix viz run lint                                                  → 0
npm --prefix viz run build                                                 → 0  (built in 253ms)
node --test tools/update-adopters.test.mjs                                 → 0  (54 tests, 15 suites)
```

Pair Q initially ran with the new module invisible (`git ls-files` skips
untracked files); re-run after `git add -N` with the module in scope, and that
is the reading recorded above.

**Verbatim-move diff.** `diff` of `git show HEAD:SPEC.md` lines 84–106 + 114–124
against the module body returns exactly four classes of delta, no content
change: (1) three link re-bases for the new depth (`SPEC/gate-postures.md` →
`gate-postures.md` ×2, `docs/EXTERNAL-AGENTS.md` → `../docs/EXTERNAL-AGENTS.md`,
`SPEC/unattended-candidacy.md` → `unattended-candidacy.md`); (2) two cites that
were intra-`SPEC.md` and are now cross-file, gaining `[`SPEC.md`](../SPEC.md)`
(§"Task ID convention", §"Model field"); (3) the `Examples:` lead-in and the
`**[unattended]` candidacy.**` bold-lead promoted to `##` headings, which is what
makes them citable in their new home; (4) prose re-wrapped at the same width.

**Per-citer verdict table.** ~20 non-archive citers of §"Task-line format". Each
was read and classified by *which fact it cites*, not by whether the grep still
matches — a stub preserves every citation syntactically, so the grep alone would
pass vacuously.

| Citer | Fact cited | Verdict |
|---|---|---|
| `SPEC.md` §Tasknote frontmatter (l.108) | grammar, "moved to the task line" | stub ✔ |
| `SPEC.md` §Phase 1 (l.347) | trailing-run preservation on Re-scope | stub ✔ — the rule deliberately stayed |
| `SPEC.md` §Priority levels (l.767) | `[!critical]` semantics | **repointed** → module |
| `SPEC/unattended-candidacy.md` ×3 | `[unattended]` / `[handoff]` definitions, "never writes it" | **repointed** → module |
| `SPEC/unattended-candidacy.md` (l.100) | token position after `[model]` + glyph | stub ✔ (ordering rule) |
| `SPEC/gate-postures.md` | `[unattended]` marker definition | **repointed** → module |
| `SPEC/model.md` ×2 | `[model]` segment location; trailing-run copy on retag | stub ✔ |
| `SPEC/blocked.md` | the ` — ` separator the grammar uses | stub ✔ |
| `SPEC/plan-filing.md` | trailing-run copy on the closure rewrite | stub ✔ |
| `SPEC/plan-parser.md` header | boundary statement ("grammar stays in SPEC.md") | **amended** — now names the module too |
| `SPEC/plan-parser.md` ×2 (l.47, l.89) | clean canonical form; canonical flag order | stub ✔ |
| `SPEC/procedures/ft-task.md` ×2 | what to capture; grammar + position | stub ✔ — confirms the read path needs no module |
| `SPEC/fixtures/plan/README.md` | "every optional-segment combination" | **repointed** → module (the examples moved) |
| `ft-file-followup` (l.110) | `[!critical]` semantics | **repointed** → module |
| `ft-file-followup` ×2 (l.187, l.194) | grammar; token position | stub ✔ |
| `ft-epic-discovery` (l.58) | `[!critical]` semantics | **repointed** → module |
| `ft-epic-discovery` (l.86) | grammar | stub ✔ |
| `ft-seed` (l.22) | "seeding is an operator act" | **repointed** → module |
| `ft-seed` (l.108) | token position | stub ✔ |
| `ft-refactor` (l.127) | "flowtron never writes `[unattended]`" | **repointed** → module |
| `ft-refactor` (l.180) | canonical grammar | stub ✔ |
| `ft-task` ×2, `ft-micro-task`, `ft-release`, `ft-audit`, `ft-audit-repo` | canonical grammar / token position | stub ✔ |
| `docs/EXTERNAL-AGENTS.md` grammar row | grammar owner | **amended** — module added beside SPEC.md |
| `docs/EXTERNAL-AGENTS.md` `[unattended]` + `[handoff]` rows | marker semantics | **repointed** → module |
| `docs/GLOSSARY.md` ×4 (`[!critical]`, `[handoff]`, shortname, `[unattended]`) | per-segment definitions | **repointed** → module |
| `docs/GLOSSARY.md` **grammar elements** (l.77) | enumerates exactly the relocated tokens | **repointed** → module (I first graded this stub ✔; the external review was right that the most token-centric entry must not land on a stub that defines none of them) |
| `docs/GLOSSARY.md` ×2 (`Blocked by`, wikilink) | long-description conventions | stub ✔ (pre-existing imprecision: these are really `plan-parser.md`'s §"Long-description conventions"; out of scope) |
| `docs/MIGRATION.md` (l.362) | `[!critical]` semantics | **repointed** → module |
| `docs/MIGRATION.md` (l.447) | grammar for rewriting legacy rows | stub ✔ |
| `templates/PLAN.md`, `loop-heartbeat-template.md`, `tasknote-README.md` | grammar (adopter-facing) | stub ✔ — deliberately kept on `SPEC.md` |
| `ft-audit`, `ft-audit-repo`, `ft-epic-discovery` (l.192), `ft-file-followup` (l.148), `ft-seed` (l.83) | "flowtron never writes `[unattended]`" | **repointed** → module (missed on the first pass; the sentence line-wraps, which defeated the greps I used) |
| `ft-task/SKILL.md` (l.51) | `[!critical]` semantics | **repointed** → module (citation only, no Read) |
| `SPEC/fixtures/plan/canonical.json` `describes` | paired contract prose | **repointed** → module |

**Neutrality recount (`docs/AGENT-NEUTRALITY.md` row 40, any-mention rule).**
§"Task-line format" was on the `SPEC.md` list because its `[unattended]` cell
named the `--fast` the marker implies. That cell moved, and the stub names the
marker but no flag (`grep` over the stub range returns `[unattended]` the token
only). `SPEC.md` recounted 6 → 5; `SPEC/task-line-segments.md` added to the file
set with 1 site. Row text updated with the CORE-664 clause.

**External review — `/code-review` over this task's working tree.** Nine
findings, five graded **blocker** (Acceptance did not actually hold), four
**note**. Every one was real; the reviewer's arithmetic was independently
re-verified before acting. Phase 2 re-entered, then Phase 3 re-ran from the top
— the receipt above is the post-fix run.

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 1 | `docs/AGENT-NEUTRALITY.md:40` still opened "(6 sites in `SPEC.md`" while its own new clause said "recounted 6 → 5" | **blocker** | Fixed → "(5 sites". My Acceptance criterion "row 40 recounted" was not met: I wrote the recount clause but left the count it contradicts. |
| 2 | `SPEC/task-line-segments.md:3` header over-claimed on two axes — named `/ft-audit` + `/ft-audit-repo` as loaders when neither referenced the module, and described force-Read loading the diff deliberately did not wire | **blocker** | Fixed → header reframed to "consulted, not force-Read", stating the `plan-parser.md` precedent explicitly and that each filing surface carries its row shape inline. The header had been written before the Phase 2 revision and never updated to match it. |
| 3 | `ft-audit:75` + `ft-audit-repo:70` still cite `SPEC.md` for "flowtron never writes `[unattended]`", a sentence this same diff declared owned by the module | **blocker** | Fixed. Acceptance criterion 5 (no surface cites moved material as living in `SPEC.md`) genuinely failed. |
| 4 | Same stale sentence at `ft-epic-discovery:192` and `ft-file-followup:148` — both files the diff *had* touched elsewhere, so two citations of one fact disagreed inside a single file | **blocker** | Fixed. A fifth instance the reviewer did not reach, `ft-seed:83`, was found while fixing these — line-wrapped across two lines, which is why my earlier greps missed all five. |
| 5 | `docs/CONTEXT-BUDGET.md` cold-start prose arithmetically incoherent: the "−965" and "−4,156" figures describe no state the repo has ever been in | **blocker** | Fixed, and it was the most serious finding. See the note below. |
| 6 | `SPEC.md` recorded as 46,868 in three places; `wc -c` says 46,908 | **note** | Fixed in all three. I measured before the final `[!critical]` repoint at `SPEC.md:767` and never re-measured. |
| 7 | `SPEC/fixtures/plan/canonical.json` `describes` field contradicts the README line the diff repointed | **note** | Fixed; JSON re-validated. The README calls the `.json` "the contract" and requires both edited in one commit. |
| 8 | `docs/GLOSSARY.md:77` **grammar elements** — the most token-centric entry in the file — still points at the stub | **note** | Fixed. I had classified this stub-satisfied in the verdict table; that judgment was wrong, and the table row is corrected above. |
| 9 | `claude/skills/ft-task/SKILL.md:51` cites `SPEC.md` for `[!critical]` semantics that moved | **note** | Fixed as a citation edit, which does not conflict with the no-runner-load criterion. |

**On finding 5 — the ledger error, recorded because it generalizes.** The
cold-start sentence carried a v5.32.0 snapshot of seven per-file figures. I
refreshed `SPEC.md`'s alone and differenced it against the stale siblings,
producing a −965 and a 119,983 total that were both fiction. Re-measuring every
row showed three had drifted independently of this task (`ft-task/SKILL.md`
28,105 → 29,117, tasknote README 10,379 → 10,734, template 5,188 → 5,635), so
the path stood at **125,953** before CORE-664, not the recorded 120,948. This
task took **−4,113** off it, landing **121,840**. All seven rows are now
measured at one moment and the stamp moved from v5.32.0 to this task. The
generalizable lesson is written into the doc itself: a sum in this ledger is
only true when every row is measured together, and refreshing one row against
stale siblings yields a plausible number describing no real state.

**Pre-existing defect observed, not fixed (out of scope).** Row 40 of
`docs/AGENT-NEUTRALITY.md` contains the `SPEC/post-closure.md` "(1 site — …)"
clause twice, verbatim — a duplication that predates this task (CORE-607 era).
Left untouched under the surgical-change rule; worth a one-line follow-up.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs", 18 entries):

- `README.md` — **updated**: `SPEC/` roster bullet names `task-line-segments`.
- `AGENTS.md` — **updated**: `SPEC/` bullet names "task-line segment semantics" (this file's roster is concept-style, not filename-style). `CLAUDE.md` is a symlink, so it followed.
- `SPEC.md` — **updated**: the extract itself; §"Task-line format" is now a stub.
- `docs/MIGRATION.md` — **updated**: the `[!critical]` cite at l.362 repointed. The l.447 grammar cite stays on `SPEC.md`, correctly.
- `claude/AGENTS-snippet.md` — no change: names skills and paths, not the task-line grammar's per-segment semantics.
- `codex/`, `cursor/`, `grok/` `AGENTS-snippet.md` — no change: thin wiring, same reason.
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change: its `SPEC.md` line describes the lifecycle, the relevance gate, cues, the guard, and versioning — none of which moved. (Declared in `touches:` as a precaution; verified unnecessary.)
- `SECURITY.md` — no change.
- `docs/AGENT-NEUTRALITY.md` — **updated**: row 40 file set + site recount 6 → 5.
- `docs/PLATFORMS.md` — no change.
- `claude/CAPABILITIES.md` — no change: no task-line-grammar reference.
- `docs/AGENT-COMPAT.md` — no change.
- `docs/EXTERNAL-AGENTS.md` — **updated**: three stable-surface Owner cells repointed. Its sweep entry flags "contract edits that touch … the task-line grammar" as routine drift against it, and requires a caller-side filing **in the same closure** when a closure *moves, renames, or retires a stable-surface row*. `judgment`: none of the three rows moved, was renamed, or was retired — each keeps its name and its guarantee, and only the Owner column gained the module. The row's own stated mechanism ("a caller that ports the grammar re-verifies it against both on every pin bump") is what carries this to the caller. **No caobunga-side filing owed.**
- `docs/WORKTREES.md` — no change.
- `docs/VISION.md` — no change: scope boundaries untouched.

**Final Summary:**

Restored `SPEC.md`'s working headroom to the ~2-unit standard by extracting one
section, raising no cap — the CORE-607 move, repeated. `SPEC.md` 51,024 →
**46,908**, headroom 1,976 → **6,092** (≈2.1 working units under the unchanged
53,000 cap).

**What moved, and the boundary that decided it.** The §"Task-line format"
segment table, the worked examples, and the `[unattended]`-candidacy paragraph
now live in `SPEC/task-line-segments.md` (5,691, budgeted 10,000). The split
point is **read-vs-write, not frequency**: a runner *capturing* a row at Step 1
needs the grammar block and the ordering rule, which stay in the stub, so no
runner gained a load; the per-token semantics travel to the module for the
surfaces that *write* rows. The trailing-bracket-token preservation rule
deliberately stayed behind — it binds Phase 4's stub-form flip, and moving it
would have put this module on every closure. That cost ~490 chars of extract and
was worth it.

**Changed:** 21 files + 1 new. `SPEC.md` −4,116; new module +5,691; 18 citation
repoints across 6 skills, 5 `SPEC/` modules, 4 `docs/` files, and 1 JSON
fixture; budget row + ledger refresh; neutrality recount.

**Verification:** CI context-budget block, CI Pair Q citation resolution, 578
viz tests, typecheck, lint, build, 54 fleet-updater tests — all exit 0, all
re-run after the review re-entry. Every figure asserted in
`docs/CONTEXT-BUDGET.md` re-checked against `wc -c` (6/6) and the cold-start sum
recomputed from its own seven rows (121,840 = asserted).

**Refactors deferred:** `docs/AGENT-NEUTRALITY.md` row 40 duplicates its
`SPEC/post-closure.md` clause verbatim (CORE-607-era defect). Left untouched
under the surgical-change rule.

**Scope reconciliation.** Declared 23 paths, changed 21 (+ this tasknote and its
PLAN row, excluded by construction). No undeclared path was touched. Six
declared paths went unedited — `SPEC/model.md`, `SPEC/plan-filing.md`,
`SPEC/procedures/ft-task.md`, `CONTRIBUTING.md`, and two others — each verified
stub-satisfied rather than assumed. Three paths were edited that Discovery had
declared but not anticipated *why*: `ft-audit`, `ft-audit-repo`, and
`ft-task/SKILL.md` turned out to carry moved material the first pass missed.

**What the external review changed.** Nine findings, five blockers, all real.
The run went back to Phase 2 and Phase 3 re-ran from the top. The consequential
one was a false number: I refreshed one row of a seven-row ledger snapshot and
differenced it against the six stale siblings, writing a "−965" that described
no state this repo has ever been in. Re-measuring every row showed the path had
drifted to 125,953 before this task (not the recorded 120,948) and that CORE-664
took −4,113 off it. The other four blockers were the same failure in a different
key: I trusted greps over a sentence that line-wraps, so five stale citations of
material this very diff relocated survived my "no surface cites moved material"
criterion. Both are recorded in Testing Notes with the fix.

**Maintainability effect.** `SPEC.md` can absorb two more substantial contract
tasks before the next extract-or-raise decision, and the per-segment semantics
now sit in a file that can grow without spending always-loaded budget.

**Learnings.** One, written into `docs/CONTEXT-BUDGET.md` itself rather than
left here: a sum in that ledger is only true when every row is measured at the
same moment, and refreshing a single row against stale siblings produces a
plausible total describing no real state. It is a property of that doc, so it
belongs in that doc — not in the always-loaded layer, which is unaffected.
`AGENTS.md` / README §"AI-referenced docs": `N/A`.

**Archived:** 2026-09-22
