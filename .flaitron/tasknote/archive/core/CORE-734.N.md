---
title: mirror-tax audit
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.2, CORE-734.3, CORE-734.4, CORE-734.5, CORE-734.6, CORE-734.7]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-734.N | mirror-tax audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-734]] · [[CORE-734.2]] · [[CORE-734.3]] · [[CORE-734.4]] · [[CORE-734.5]] · [[CORE-734.6]] · [[CORE-734.7]]

## 🎯 Goal

Verify the completed CORE-EPIC-734 (`mirror-tax`) cohort sits coherently in the codebase: the [[CORE-734.3]] target (12 live §7.1 Pairs, 10 `pair_*` drift checks) holds, the cumulative doc-drift sweep is clean, and every miss is fixed inline or cited for follow-up.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update — `judgment` (per-entry reading; keyword grep in Discovery Notes)
- [x] Target: 12 live §7.1 Pairs — `grep -c '^\*\*Pair [A-Z]' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 17 entries, of which `grep -c '^\*\*Pair [A-Z] — retired' …` → 4 (F, G, I, L) and D is the pointer: 17 − 4 − 1 = 12
- [x] Target: 10 `pair_*` drift checks — `grep -cE '^pair_[a-z]+\(\) \{$' tools/drift-checks.sh` → 10
- [x] Every catalogue `Check: pair_<x>` names an existing function and vice versa (the gap Pair L's retirement left unguarded) — bijection diff below → exit 0

  ```sh
  diff <(grep -oE '^Check: `pair_[a-z]+`' claude/skills/ft-release/step-7.1-mirror-pairs.md | grep -oE 'pair_[a-z]+' | sort) \
       <(grep -oE '^pair_[a-z]+' tools/drift-checks.sh | sort)
  ```

- [x] Epic goal half 1: the release walk no longer parses `ci.yml` — `grep -n 'ci\.yml' claude/skills/ft-release/*.md tools/drift-checks.sh` → 7 hits, all expected: mirror-pairs L9 (history: [[CORE-734.2]] moved the shell out of `ci.yml`), L48/L50 (Pair H's entry), and `drift-checks.sh` L155/L161/L164/L170 (`pair_h`'s title, design comment, extraction, empty-side guard). None is a shell extraction for the release walk; `judgment` on that reading
- [x] Cohort coherence inventory: each child's deliverables read against the others (naming, counts, no contradictory cross-refs) — `judgment` plus the bare retired-letter grep below → exit 1 (no hits)

  ```sh
  grep -rnE --exclude-dir=archive --exclude-dir=node_modules --exclude=VERSION-HISTORY.md --exclude=PLAN-ARCHIVE.md --exclude=PLAN.md --exclude=CORE-734.N.md \
    '([A-R], ){1,}(and )?[EFGIL]\b[^a-z]|\b[EFGIL] (reads|binds|guards|checks)\b|[ (—]\b[A-R], [EFGIL]\b' \
    claude SPEC docs tools AGENTS.md README.md .flaitron/tasknote/README.md
  ```

- [x] No regressions in earlier-shipped cohort surfaces — `bash tools/drift-checks.sh` → 0
- [x] Audit findings recorded in Implementation Notes; misses fixed inline or cited as `/ft-file-followup` candidates — `judgment`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes (Final Summaries; targets from [[CORE-734.3]])
- [x] Measure the target: Pair entries, `pair_*` functions, `Check:` ↔ function bijection
- [x] Cumulative stale-reference grep (retired letters, `pair_a`, `Reads:`, count words, park-flag roster, per-flag PLATFORMS rows)
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" — fixed doc-drift sweep
- [x] Apply the inline fix (CONVENTIONS L66 release-only list)
- [x] Phase 3: drift checks, receipt, external review
- [x] Phase 4: flip `CORE-734.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax)
- [[CORE-734.3]] — set the target this audit verifies (census)
- [[CORE-734.2]], [[CORE-734.4]], [[CORE-734.5]], [[CORE-734.6]], [[CORE-734.7]] — the implementation cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All six implementation children (`.2`–`.7`) closed 2026-10-07; `.N` is the last open child and carries a measurable target from [[CORE-734.3]]. No `.1` note exists (Discovery was supplied by audit-repo), so the census note stands in for it.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Runner.** Invoked as `/ft-task CORE-734.N` (allowed by `SPEC/epic.md` lifecycle step 4) rather than `/ft-close-epic`. The audit Goal / Acceptance / Subtasks follow `/ft-close-epic` Step 3's canonical shape, parameterized with the `.3` target. The parent-flip motion belongs to `/ft-close-epic` Step 8; see Clarifications.
- **Read set.** `SPEC/epic.md`; `/ft-close-epic` Step 3; the [[CORE-734.3]] note in full; the Final Summaries of `.2`, `.4`–`.7`; `step-7.1-mirror-pairs.md` (header, A–D, F–I, K, L, M–Q); `tools/drift-checks.sh` (header, dispatcher, function list); `ci.yml` drift job; `docs/CONVENTIONS.md` §"GitHub Actions CI" and §"Dependency audit cadence"; `AGENTS.md` §Workflow roster + KEEP IN SYNC; `claude/AGENTS-snippet.md` L5–26; `docs/PLATFORMS.md` skill-body-flags rows; GLOSSARY / MIGRATION park pointers.
- **Best Practices Review.** The audit only reads, apart from one prose fix. The boundary under check is the epic's own rule: a check's shell lives only in `tools/drift-checks.sh` (CONVENTIONS L60), and the catalogue entries are pointers to it. That rule holds. Only `pair_h` reads `ci.yml`, and it does so as the deliberate AGENTS ↔ `ci.yml` content binding, not as a shell extraction.
- **Archive skim.** `archive/core/` was confirmed against the README table. The cohort notes are the archive here, read directly: six notes, Final Summaries plus the `.3` census. There is no ⚠️ pointer on any of them. Two "recorded on the stub for `.N`" phrases (`.4`, `.5`) refer to the retired **Pair** stubs, not the `.N` PLAN row: the row's history (`git show <sha>:.flaitron/PLAN.md` across `.2`–`.7`) never carried them. Both tradeoffs are on the Pair L and Pair F entries as recorded.
- **Target measured.**
  - 17 `**Pair` entries. Live: A B C H J K M N O P Q R = **12**. Retired stubs: F G I L. D is the pointer to the standing check. ✅ Target met.
  - `pair_*` functions: b c h j m n o p q r = **10** (`pair_a` gone). ✅
  - Catalogue `Check: pair_<x>` set == function set (both b c h j m n o p q r). The bijection Pair L used to assert holds today.
  - `bash tools/drift-checks.sh` → 0 (15 ok: 5 standing + 10 pairs).
- **Cumulative stale-reference grep** (live files; archive, VERSION-HISTORY, PLAN-ARCHIVE, PLAN excluded):
  - `pair_a`: only Pair A's own entry, which records the drop.
  - `Reads:`: only Pair L's retired stub.
  - Retired letters F/I/L (`Pair X` form only — **incomplete**, see the review in Testing Notes): only their own stubs, a `drift-checks.sh` comment recording the F retirement, and Pair Q's historical "Pair L took the third". Plus the tasknote README L120, past-tense history ("CORE-543 was re-scoped to … Pair L"), which is still true.
  - Count words: "Ten pairs" (§7.1 L9), "Eleven `ok` lines" (§7.1 L15), "ten pairs" (`ft-release` SKILL L279), and "thirteen functions" (CONVENTIONS L58, = 10 pairs + 3 standing) are all consistent with the target.
  - Park-flag roster (`--fut`): exactly the surfaces Pair F's retired stub enumerates (tasknote-selection, park-mode, step-0-flags, command stub, CAPABILITIES, `pair_m` exemption, CODEX-VERIFICATION).
  - PLATFORMS: three single **Skill-body flags** rows (Grok, Codex, Cursor), and no per-flag rows.
- **Finding 1 (miss, inline-fixable).** `docs/CONVENTIONS.md` L66 says "checks that … (Pairs D and K) stay in `/ft-release` §7.1". Before the epic it read "Pairs D, F, I, K, and L", matching L58's list. `.5` and `.6` dropped F and I from both lines. `.7` moved Pair A wholly out of CI and updated L58 to "Pairs A, D and K", but left L66, so the two restatements of the same split now disagree. Fix: L66 → "Pairs A, D and K".
- **Drift check.** The PLAN line matches the work: the target in the row is what was measured. `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" is satisfied by Acceptance #1. No SPEC contract is touched.
- **Clarifications (AskUserQuestion, 2026-10-07).**
  1. Parent flip → **bundle into 📦**. `/ft-close-epic` Step 8's parent-flip Yes/No rides the 📦 gate, and on Yes the parent flips and the cohort moves to `## Completed` in the same atomic commit (SPEC §"Paper-complete guard" → the parent-flip approval exception).
  2. Finding 1 → **fix inline** in this audit.
- **Assumptions.** The commit is `chore:` (docs only), following `/ft-close-epic`'s message convention. The parent line's own long description is rewritten to stub form only on Yes, per `SPEC/plan-filing.md`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: a one-phrase prose fix; no code

**Implementation Notes:**

- *Pattern survey.* The L66 fix repeats what `.5` and `.6` did to this line, each dropping its retired letter from both L58 and L66; `.7` changed L58 only. The mirror-pairs edits follow the cohort's own pattern of rewriting a stale pair list in place.
- *Final diff* (four prose edits, no code):
  - `docs/CONVENTIONS.md` L66 now reads "need release context or human judgment, or don't hold steady against the commit alone (Pairs A, D and K)". This covers Findings 1 and 4.
  - `step-7.1-mirror-pairs.md` L9: "The other two — A and K — … keep their shell here; D points at its standing check." (Finding 3)
  - `step-7.1-mirror-pairs.md` L60, Pair K: "B and J are frontmatter- and flag-derived, and the Phase 4 …" (Finding 2)
  - `step-7.1-mirror-pairs.md` L97, Pair K: "Release-gate only, like A and D." (Finding 5)
- *Minimal refactor gate.* Each edit corrects one stale claim in a cohort surface. Nothing was restructured.
- **Audit findings.**
  1. Target met: 12 live Pairs, 10 `pair_*` checks, `Check:` ↔ function bijection intact.
  2. Epic goal met: the release walk runs `tools/drift-checks.sh` and parses no `ci.yml` shape. `pair_h` reads `ci.yml`'s `validate` run steps as its content binding by design.
  3. Finding 1 (CONVENTIONS L66) is fixed inline.
  4. Finding 2, from the external review (blocker): Pair K's present-tense rationale (mirror-pairs L60) still said "I reads `CAPABILITIES.md` ↔ `PLATFORMS.md`", which went stale at [[CORE-734.6]]. It also named Pair E, deleted at [[CORE-603.2]] (retire-flowtron-stats) without a stub — the "Pair K / Pair L prose → drop E" sweep that note lists missed this one sentence. (An earlier draft of this note said E never existed. The second review corrected that, and so does the ⚠️ pointer this closure appends to [[CORE-734.3]], whose census made the same claim.) Fixed: "B and J are frontmatter- and flag-derived, and the Phase 4 …". My Discovery grep matched only the `Pair X` form and missed bare letters; the widened bare-letter grep is now an Acceptance verify.
  5. Finding 3, from the external review: mirror-pairs L9 said "The other pairs — A, D, K — … keep their shell here", but D's entry is a pointer with no shell. This dates from before the epic ("D, F, I, K, L"). Fixed: "The other two — A and K — … keep their shell here; D points at its standing check."
  6. Finding 4, from the external review: Finding 1's fix added A to L66's list but left L66's criterion narrower than L58's ("release context or human judgment"). Fixed: L66 now reads "need release context or human judgment, or don't hold steady against the commit alone", so the criterion matches L58 as well as the letters.
  7. Finding 5, from the second review: Pair K's "Release-gate only, like D" bullet (L97) left out A, which has been release-gate only since [[CORE-734.7]]. Fixed: "like A and D".
  8. No `/ft-file-followup` candidates.
- **Accepted residuals carried forward (not misses).**
  - Pair L's retirement left the catalogue ↔ function existence check unguarded. It is clean at this audit and recorded on the Pair L stub.
  - The park-flag roster copies are unbound by design; this is recorded on the Pair F stub.
  - Pair A's clause is guarded only at release time (judgment), per the [[CORE-734.3]] census.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; `tools/drift-checks.sh` covers the edited markdown (Pair Q citations, context budget, final newline)

- [x] Ran lint/type-check on changed code — N/A: markdown only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final pass, after the round-1 blocker and the round-2 notes):

```text
grep -c '^\*\*Pair [A-Z]' step-7.1-mirror-pairs.md         → 17; '— retired' → 4 (F G I L); D pointer → 12 live
grep -cE '^pair_[a-z]+\(\) \{$' tools/drift-checks.sh       → 10
Check: ↔ pair_ function bijection diff                     → 0
grep -n 'ci\.yml' ft-release/*.md drift-checks.sh          → 7 hits, all the expected set
bare retired-letter grep (Acceptance #6)                   → 1 (no hits)
bash tools/drift-checks.sh                                 → 0 (15 ok)
```

The first pass ran the same commands, all green. The bare-letter grep was not yet an Acceptance item, which is why the round-1 blocker got past it.

**External review, round 1** (`/code-review medium`, working-tree diff): 1 blocker, 6 notes.
- **Blocker, fixed → Phase 2, then Phase 3 re-ran from the top.** Pair K L60 still cited retired Pair I as live ("I reads …"), and the cohort-coherence criterion was unmet. Finding 2.
- **Notes:**
  1. L9's "A, D, K keep their shell": fixed (Finding 3).
  2. L66's criterion was narrower than L58's: fixed (Finding 4).
  3. Acceptance #5 didn't name its hit set: fixed (7 hits listed).
  4. Acceptance #4's command wasn't runnable: fixed (fenced, explicit path).
  5. Discovery's grep conclusion was incomplete: annotated in place.
  6. `touches:` was missing mirror-pairs.md: added.

**External review, round 2** (same scope): 0 blockers, 7 notes.
- *Fixed:*
  - Pair E did exist (deleted at [[CORE-603.2]]): note corrected, and ⚠️ pointer on [[CORE-734.3]].
  - Implementation Notes contradicted the final L66 diff: rewritten as the final diff.
  - Pair K L97 "like D" left out A: fixed (Finding 5).
  - The bare-letter grep had no path scope and missed `[EG]` in branch 2: fenced with paths and exclusions, `[EFGIL]` throughout.
- *Declined:*
  - **No `Pair E — retired` stub.** [[CORE-603.2]] deleted E rather than re-pointing it, by an operator decision recorded at its `.1`. Back-filling a stub would overturn that decision, and the count arithmetic doesn't depend on it.
  - **Pair K's "Every pair above is blind here" names only B and J.** Before this audit it named B, E, J and I, and still left out A, C, D and H. The sentence gives examples of why the pairs are blind; it is not a roster. The fix removed the stale names and did not try to enumerate the rest.
  - **L66 lists pairs, not L58's other release-only checks.** L66 sits in §"Dependency audit cadence" and cites the split as precedent, not as a second roster. Its pair list and criterion now match L58's, and that is all that's bound.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep** (fixed audit line, cumulative over the cohort):
- **Updated:** `docs/CONVENTIONS.md`, at L66 (Findings 1 and 4).
- **No change, with a reason:**
  - `README.md`: its `tools/` bullet and templates pointer are current.
  - `AGENTS.md`: `tools/` bullet; the §Validation Pair R / Pair H sentences are still true.
  - `claude/AGENTS-snippet.md`: the roster and KEEP IN SYNC agree with `AGENTS.md`.
  - `docs/PLATFORMS.md`: three Skill-body flags rows.
  - `claude/CAPABILITIES.md`: the L36 park-flag roster is a listed Pair F residue.
  - `docs/AGENT-NEUTRALITY.md`: the wrapper-name row names `drift-checks.sh`.
- **No change, no epic-relevant reference:** `SPEC.md`, `docs/MIGRATION.md`, the codex, cursor and grok snippets (their §7.1 mentions are installed-surface), `CONTRIBUTING.md`, `SECURITY.md` (`ci.yml` threat model unchanged), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.
- **Outside the set:** `step-7.1-mirror-pairs.md` was edited as a deliverable. `docs/CONTEXT-BUDGET.md` and `docs/VERSION-HISTORY.md` are release-owned.

**Recap.** The mirror-tax epic hit its target: 12 live §7.1 Pairs (from 15) and 10 `pair_*` drift checks (from 11). The release walk no longer parses `ci.yml`, and the `Check:` ↔ function bijection that Pair L once asserted still holds. The audit found and fixed five stale cross-references in cohort surfaces. Two came from cohort edits that missed a second restatement: Pair K's "I reads" after `.6`, and CONVENTIONS L66 after `.7`. Three predate the epic: Pair K's Pair E reference, the L9 shell list naming D, and K's "like D". It also corrected one false archived claim: the census said "Letter E never existed", and a ⚠️ pointer now sits on [[CORE-734.3]].
- **Changed:** `docs/CONVENTIONS.md` (1 line), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (3 lines), `.flaitron/tasknote/archive/core/CORE-734.3.md` (pointer), `.flaitron/PLAN.md`, and this note.
- **Verification:** the receipt above; `bash tools/drift-checks.sh` → 0. External review: two rounds. Round 1 found one blocker (fixed, and Phase 3 re-ran); round 2 found no blockers.
- **Refactors:** none.
- **`touches:` reconciliation:** declared 2, changed 2 (`docs/CONVENTIONS.md`, `step-7.1-mirror-pairs.md`), plus the closure-mandated ⚠️ pointer on `archive/core/CORE-734.3.md`, which is not declared because the superseded-claim rule writes it. `step-7.1-mirror-pairs.md` was added to `touches:` mid-task, after the round-1 review.
- **Maintainability:** the catalogue's prose matches its 12 live pairs. A reader of Pair K or L9 is no longer pointed at a retired check or at a shell that does not exist.
- **Follow-ups:** none filed.

**Learnings:** One line, recorded here rather than in AGENTS.md. A pair retirement has to sweep **bare-letter** pair lists ("B, E, and J", "I reads …") as well as `Pair X` citations. Two separate retirements, CORE-603.2 for E and `.6` for I, both missed the same sentence. This doesn't belong in the always-loaded layer: pair retirement is an `/ft-release` catalogue concern. The widened grep is kept in this note's Acceptance for the next retirement to copy.

**Parent flip:** Yes (operator, 📦 gate 2026-10-08). CORE-EPIC-734 flipped to stub form and moved to the top of `## Completed` with its seven children; `## Medium` restored to `(none)`.

**Archived:** 2026-10-08
