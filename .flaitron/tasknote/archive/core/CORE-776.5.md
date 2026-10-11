---
title: micro-unattended-review
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-776]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC.md
  - SPEC/gate-postures.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-micro-task/SKILL.md
  - docs/EXTERNAL-AGENTS.md
  - templates/subagent-probe-template.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-776.5 | micro-unattended-review

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-776]]

## 🎯 Goal

Decide what `/ft-micro-task --unattended` does about Phase 3's External review and the 👁️ check — a review probe plus a park on a rendered surface, or a terminal stop that routes to `/ft-task` — and align `SPEC/gate-postures.md`, `claude/skills/ft-task/unattended-mode.md`, and `docs/EXTERNAL-AGENTS.md` to the one posture chosen.

## ✅ Acceptance

- [x] A1 — `SPEC.md` §"🧪 Phase 3" → "When it is `N/A`" scopes the micro exemption to attended runs and points at the posture clause — `grep -q 'carries no such item attended' SPEC.md && grep -q 'Under .--unattended. it runs one anyway' SPEC.md`
- [x] A2 — `SPEC/gate-postures.md` §"What `--unattended` never relaxes" names `/ft-micro-task`, its grading target (🎯 Goal + PLAN.md row), and the rendered-surface `visual-confirm` park — `tr '\n' ' ' < SPEC/gate-postures.md | grep -q 'ft-micro-task. is the case the rule has to reach for.*its 🎯 Goal and PLAN.md row' && grep -q 'visual-confirm. before the closure writes' SPEC/gate-postures.md` (amended in Phase 3: the first form was same-line and the sentence wraps); file ≤ 22,000 bytes — `test $(wc -c < SPEC/gate-postures.md) -le 22000`
- [x] A3 — `claude/skills/ft-task/unattended-mode.md` carries an External review paragraph under §"What `--unattended` never relaxes" and the conversion map's 👁️ row no longer marks micro n/a — `grep -q 'relax \*\*Phase 3.s External review' claude/skills/ft-task/unattended-mode.md && ! grep -q 'no separate 👁️ ask)\*' claude/skills/ft-task/unattended-mode.md`
- [x] A4 — `claude/skills/ft-micro-task/SKILL.md` runs the External review and the `visual-confirm` park under `--unattended` only, and the "nothing changes here" claim is gone — `grep -q 'External review' claude/skills/ft-micro-task/SKILL.md && grep -q 'visual-confirm' claude/skills/ft-micro-task/SKILL.md && ! grep -q 'nothing changes here' claude/skills/ft-micro-task/SKILL.md`
- [x] A5 — `docs/EXTERNAL-AGENTS.md` names the micro grading target for callers — `grep -q '🎯 Goal and PLAN.md row' docs/EXTERNAL-AGENTS.md`
- [x] A6 — `templates/subagent-probe-template.md` §"Variant — review probe" tells a non-Claude runner what to paste for a micro note — `grep -q 'micro-tasknote' templates/subagent-probe-template.md`
- [x] A7 — Section citations, final newlines, and context budgets hold — `bash tools/drift-checks.sh → 0`
- [x] A8 — Attended `/ft-micro-task` is unchanged: no review item, no 👁️ ask added outside the `--unattended` paragraph; no new cue glyph, `park-reason:` code, or template section — `judgment` (read of the diff; nothing mechanical decides "unchanged attended") — held: every attended sentence edited gained only an `attended` qualifier or a posture-scoped parenthetical; the `--unattended` paragraph is the only new behavior

## 🧩 Subtasks

- [ ] S1 — `SPEC.md`: qualify the micro `N/A` clause as attended and point at gate-postures
- [ ] S2 — `SPEC/gate-postures.md`: extend the External review paragraph with the micro case (review + grading target + `visual-confirm` conversion), ≤ ~500 chars
- [ ] S3 — `claude/skills/ft-task/unattended-mode.md`: 👁️ row micro column, the "n/a there" sentence, and a new External review paragraph under §"What `--unattended` never relaxes"
- [ ] S4 — `claude/skills/ft-micro-task/SKILL.md`: Step 0 bullet + gate list, Step 3 `--unattended` paragraph (review + park), Step 4.5 note
- [ ] S5 — `docs/EXTERNAL-AGENTS.md` line 79 + `templates/subagent-probe-template.md` "The criteria" line: micro grading target
- [ ] S6 — run `bash tools/drift-checks.sh`, `git diff --check`, byte-count gate-postures; External review via `/code-review medium` scoped to this diff

## 🔗 Related

- [[CORE-EPIC-776]] — parent epic: closure-contract-coherence (Theme: Semantic SPEC↔skill drift, surfaced by audit-repo 2026-10-10)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The contradiction is real and current: `SPEC/gate-postures.md` §"What `--unattended` never relaxes" holds External review "on every path", while `SPEC.md` §"🧪 Phase 3" → "When it is `N/A`" says `/ft-micro-task` "carries no such item at all", and the micro skill under `--unattended` runs neither a review nor any visual stop. Both were written by the same task ([[CORE-656]]) and nobody reconciled them.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  One structured ask: posture (a) review probe + park vs. (b) terminal stop. **Operator chose (a)**, the recommended option. Assumptions asserted: attended micro stays exempt; the micro grading target is 🎯 Goal + PLAN.md row; findings live in the **Implementation** bold-prefix (no template change); no new cue glyph or `park-reason:` code.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**The contradiction, by site.**

- `SPEC/gate-postures.md` §"What `--unattended` never relaxes" (lines 291-299): "A context that did not write the diff grades it against `## ✅ Acceptance` on every path".
- `SPEC.md` §"🧪 Phase 3" → "When it is `N/A`" (line 443): "`/ft-micro-task` carries no such item at all: its whole threshold *is* that case." — written attended-only, with no posture qualifier.
- `claude/skills/ft-micro-task/SKILL.md`: no External review anywhere (Step 3 records only the Verification receipt in the **Implementation** bold-prefix); Step 0's `--unattended` bullet says "`/ft-micro-task` emits no separate 👁️ ask, so nothing changes here"; Step 4.5's attended recap carries an "optional verification request", which is where a rendered-surface look rides on the micro path.
- `claude/skills/ft-task/unattended-mode.md`: §"What `--unattended` never relaxes" carries the full-validation-set, downstream-impact, and deferred-hand-off paragraphs but **no External review paragraph at all** (for either runner — `/ft-task` carries its own inline in `SKILL.md`); the conversion map's 👁️ row reads "— *(no separate 👁️ ask)*" in the micro column, and the paragraph beneath it says "the row is n/a there rather than a park".
- `docs/EXTERNAL-AGENTS.md` line 79: "grades it against `## ✅ Acceptance`" — a micro-tasknote has no `## ✅ Acceptance` block, so a caller dispatching a micro run has no stated grading target.
- `templates/subagent-probe-template.md` §"Variant — review probe": "paste the tasknote's `## ✅ Acceptance` block verbatim" — same gap for non-Claude runners.
- `codex/skills/ft-micro-task/SKILL.md` is a 517-byte pointer; no restatement, no edit.

**Archive skim** (`archive/core/`, confirmed from the README table; every archived note since the box shipped matches `External review`, so the grep was narrowed to the introducing task). [[CORE-656]] (review-probe) introduced the box and recorded the micro exclusion as a deliberate assumption: *"Does `/ft-micro-task` carry the item? → No. A micro-task's whole threshold is 'below full ceremony', which is the trivial-diff `N/A` case … `ft-micro-task/SKILL.md` is not edited."* The same task wrote the gate-postures "on every path" paragraph. Its reasoning for the posture — *"with nobody reading the commit, the external grade is the only read of the diff that is not the generator's own"* — is independent of diff size, which is exactly why the two clauses collide. Nothing superseded either since. Siblings [[CORE-776.2]] / [[CORE-776.3]] / [[CORE-776.4]] / [[CORE-776.6]] are full-template notes (not micro runs) and touch different clauses; no overlap. `docs/GATE-DISCIPLINE.md` §"Refused carve-outs" refuses the "tests are green, probably looks fine unattended" argument for 👁️ — the same argument a micro run closing over a rendered surface would be making.

**Best Practices Review.** Markdown contract + skill wiring, no code. The governing shape is already established by the posture's full-validation-set rule: attended, Phase 3 keeps a lighter default because an operator reviews the commit; under `--unattended` the proof runs in full because nobody does. The External review has the same shape — attended micro is exempt *because* the operator reads a tiny commit — so the coherent fix extends that existing pattern rather than inventing a micro-specific one. The `/ft-micro-task` receipt already lands in the **Implementation** bold-prefix ("Micro-tasknotes have no Testing Notes section"); review findings go beside it, same placement rule. No new cue glyph, no new `park-reason:` code (`input-needed` and `visual-confirm` already cover the two stops), no template change.

**The two postures the PLAN line offers.**

- **(a) Review probe + park on a rendered surface.** Under `--unattended` only, `/ft-micro-task` runs the External review over its own diff (same mechanism `/ft-task` uses), grading against the only criteria a micro note states — its 🎯 Goal and its PLAN.md row — and records findings with disposition in **Implementation**. A blocker it can fix is fixed inline and the receipt re-run; one it cannot parks `input-needed`. Where the attended recap would carry a verification request for a rendered surface, the run parks `visual-confirm` before the closure writes instead. Attended micro is unchanged (still no review item; the operator reads the commit). Additive: ~6 files, a sentence or a paragraph each; `SPEC.md`'s clause gains an "attended" qualifier and a pointer.
- **(b) Terminal stop routing to `/ft-task`.** `/ft-micro-task --unattended` refuses pre-scaffold and tells the caller to re-dispatch under `/ft-task --unattended`. Removes a posture surface the dispatch model relies on: the `[unattended]` candidacy predicate admits exactly `[light]` / `[medium]` rows, which are micro's niche, so every light row would pay 4-phase ceremony or the flag would sit half-implemented. Touches the same files plus the micro column of the conversion map, EXTERNAL-AGENTS step 1 ("the two runners"), `SPEC/gate-postures.md` §"Applies to", PLATFORMS, the Codex wrapper description, and the `model-mismatch` resume path the micro skill already carries for the posture. Larger blast radius, and it answers a missing proof by removing the runner rather than adding the proof.

**Recommendation: (a).** "`--unattended` removes pauses, never proof" is the posture's own one-line rule, and (a) is the only option that adds the proof. The grading target (🎯 Goal + PLAN.md row) is a real design point to state once, in the contract, so non-Claude runners briefing the review probe know what to paste.

**Drift check.** Every cited path and section exists at the quoted text (verified by read, 2026-10-10). The plan matches its PLAN.md line; the three files the line names are in scope, plus the three the decision reaches that the line does not name: `claude/skills/ft-micro-task/SKILL.md` (where the posture executes — the line's "decide micro's posture" has no other home), `SPEC.md` (the attended-only clause that reads as the contradiction's other half), and `templates/subagent-probe-template.md` (the non-Claude grading target). Budgets: `SPEC/gate-postures.md` 20,278 / 22,000 — its own row says the next substantial posture edit should trim or extract first, so the addition there stays under ~500 chars; `SPEC.md` 43,395 / 49,000; `claude/skills/ft-micro-task/SKILL.md` 18,365 / 33,000; `unattended-mode.md`, `docs/`, and `templates/` are unbudgeted. Neutrality ledger (`docs/AGENT-NEUTRALITY.md` `/code-review` row) counts any-mention sites, so new text cites SPEC's "Who reviews" rather than naming `/code-review` — no ledger edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Two existing shapes extended, none invented. (1) The posture's full-validation-set rule — attended Phase 3 keeps a lighter default because an operator reads the commit; under `--unattended` the proof runs in full — now also carries the External review for micro, stated in the same "Nor does it …" paragraph family in both `gate-postures.md` and `unattended-mode.md`. (2) Micro's receipt placement ("no Testing Notes section; the receipt goes in the **Implementation** bold-prefix") now also hosts review findings and dispositions. The 👁️ conversion reuses the posture's own "the trigger is the emission condition" rule: micro's emission condition is the Step 4 recap's verification request, so a rendered surface parks `visual-confirm` at Step 3 before the closure writes. No new cue glyph, no new `park-reason:` code, no template section, no new file.

**Edits, by file.**

- `SPEC.md` §"🧪 Phase 3" → "When it is `N/A`": "carries no such item at all" → "carries no such item attended … Under `--unattended` it runs one anyway, graded against its 🎯 Goal and PLAN.md row" + pointer to gate-postures. 43,395 → 43,607 bytes.
- `SPEC/gate-postures.md` §"What `--unattended` never relaxes": the External review paragraph gains the micro case (attended exemption and why; review under the posture; grading target; rendered-surface `visual-confirm` conversion). 20,278 → 20,824 bytes, under the 22,000 cap and within the ~500-char bound Discovery set.
- `claude/skills/ft-task/unattended-mode.md`: conversion map 👁️ row micro column ("Step 3, before the closure writes — where the Step 4 recap would carry a verification request for a rendered surface"); the "row is n/a there" sentence rewritten to the emission-condition reading; new "Nor does it relax **Phase 3's External review**" paragraph covering both runners (the fragment had none for either — `/ft-task`'s lived only in its `SKILL.md`). 18,085 → 19,119 bytes.
- `claude/skills/ft-micro-task/SKILL.md`: Step 0 `--unattended` bullet parenthetical (the "nothing changes here" claim replaced by the park); Step 0 gate list gains the rendered surface and the unfixable review blocker, and names the full validation set + External review as never relaxed; Step 3 gains one `**Under --unattended only**` paragraph (review mechanism cited via SPEC's "Who reviews", grading target, findings in **Implementation**, blocker/note dispositions, `input-needed` and `visual-confirm` parks); Step 4.5 notes that no verification request reaches the recap under the posture. 18,365 → 19,865 bytes, under the 33,000 cap.
- `docs/EXTERNAL-AGENTS.md` line 79: parenthetical naming the micro grading target for callers.
- `templates/subagent-probe-template.md` §"Variant — review probe" "The criteria" line: what a non-Claude runner pastes for a micro note.

**Minimal refactor gate.** None. Left alone: `docs/GLOSSARY.md` "review probe" and `README.md` probe bullet (they describe the mechanism, not the posture, and both are counted sites in the neutrality ledger); `SPEC/blocked.md`'s `visual-confirm` row (its wording already covers the micro case); `codex/skills/ft-micro-task/SKILL.md` (a pointer, no restatement). No `/code-review` mention added anywhere, so the `docs/AGENT-NEUTRALITY.md` any-mention count is unchanged.

**Tests.** Markdown contract + skill wiring only; no test surface. Verification is the Acceptance greps, the byte-count gate, and `tools/drift-checks.sh` (Pair Q section citations, budgets, final newlines).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted suite / lint: no code changed, so the markdown checks stand in — `bash tools/drift-checks.sh` (context_budget, final_newline, pair_q citations, and the rest) and `git diff --check`.

```text
A1  grep 'carries no such item attended' + 'Under --unattended it runs one anyway' SPEC.md      → 0
A2a tr '\n' ' ' < SPEC/gate-postures.md | grep 'ft-micro-task. is the case … 🎯 Goal and PLAN.md row'
    && grep 'visual-confirm. before the closure writes' SPEC/gate-postures.md                     → 0
    (first form, same-line `grep 'ft-micro-task.*🎯 Goal'`, returned 1 against a correct file —
     the sentence wraps across lines; the verify command was amended, not the deliverable)
A2b test $(wc -c < SPEC/gate-postures.md) -le 22000   (20,824)                                   → 0
A3  grep 'relax **Phase 3.s External review' unattended-mode.md && ! grep 'no separate 👁️ ask)*' → 0
A4  grep 'External review' && grep 'visual-confirm' && ! grep 'nothing changes here' micro SKILL → 0
A5  grep '🎯 Goal and PLAN.md row' docs/EXTERNAL-AGENTS.md                                       → 0
A6  grep 'micro-tasknote' templates/subagent-probe-template.md                                  → 0
A7  bash tools/drift-checks.sh                                                                  → 0
git diff --check                                                                                → 0
```

Structural: no duplication (the micro rule is stated once in the contract and cited from the three executable/caller surfaces), no dead text left behind (the two superseded sentences were rewritten, not appended to), no stale pointers (every `§"…"` citation passes pair_q).

**External review** — `/code-review medium`, 9 findings. The reviewer ran against the branch's upstream-relative range rather than this task's working-tree diff, so 7 findings land on files this task never touched (`SPEC/plan-filing.md`, `claude/skills/ft-file-task/SKILL.md` ×2, `tools/update-adopters.mjs` ×2, `tools/update-adopters.test.mjs`, `.flaitron/PLAN.md` CORE-777 stub glyph) — earlier commits' work, not graded here; the CORE-776.N audit is the right reader for them, and they are listed in the Final Summary so it finds them. The two on this diff, both **note** (every Acceptance criterion still held):

1. `claude/skills/ft-micro-task/SKILL.md` Step 0 — the gate list named "a review blocker the run cannot fix" among the gates parked "with the code keyed to … §Conversion map", but the map has no review row and gate-postures says the review "adds no row to a runner's park map". **Fixed**: the blocker moved out of the map-keyed list into the never-relaxed clause, which now says it parks `input-needed` without a conversion-map row of its own.
2. Same file, Step 3 — the new `--unattended` paragraph sat directly above the unchanged attended sentence "micro-tasks are not designed to park. Surface and ask." **Fixed**: the sentence is now qualified `attended`, and names the `dependency` park Step 0 already describes for the posture.

Post-fix receipt: A4 → 0, `bash tools/drift-checks.sh` → 0, `git diff --check` → 0; micro `SKILL.md` 20,059 bytes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `SPEC.md` — updated (the micro `N/A` clause). `docs/EXTERNAL-AGENTS.md` — updated (line 79 grading target). `README.md` — no change (its probe bullet describes the mechanism; the sweep's grep for a micro/unattended review mention is empty). `AGENTS.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (no new `/code-review` site), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A — the durable rule ("`--unattended` removes pauses, never proof") was already in the contract; this task made one more surface obey it.

**Final Summary:**

`/ft-micro-task --unattended` now runs Phase 3's External review and parks on a rendered surface, closing the contradiction between `SPEC/gate-postures.md` ("on every path") and `SPEC.md` ("carries no such item at all"). Attended micro is unchanged — the operator reads a small commit — and under the posture the review grades against the only criteria a micro note states, its 🎯 Goal and PLAN.md row, with findings in the **Implementation** bold-prefix; a blocker the run cannot fix parks `input-needed`, a rendered surface parks `visual-confirm` before the closure writes. The operator chose this posture over the terminal-stop alternative via one structured ask.

- Changed (6 files, markdown only): `SPEC.md` (+212 B), `SPEC/gate-postures.md` (+546 B, 20,824 / 22,000), `claude/skills/ft-task/unattended-mode.md` (+~1,000 B: 👁️ row, emission-condition sentence, new External review paragraph), `claude/skills/ft-micro-task/SKILL.md` (+~1,700 B: Step 0 ×2, Step 3 paragraph, Step 4.5, dependency sentence), `docs/EXTERNAL-AGENTS.md` (one parenthetical), `templates/subagent-probe-template.md` (one clause).
- Verification: A1–A7 all → 0 (A2a's verify command amended from same-line to line-joined grep; the deliverable was correct), `bash tools/drift-checks.sh` → 0, `git diff --check` → 0. A8 held by judgment.
- External review: 2 notes on this diff, both fixed (conversion-map mis-keying of the review blocker; the unqualified "surface and ask" sentence). 7 findings outside this diff, not graded — for [[CORE-776.N]]: `SPEC/plan-filing.md:41` ID-allocation grep drops glyph-decorated rows; `ft-file-task/SKILL.md:213` allocation scans `archive/<area>/` only; `ft-file-task/SKILL.md:225` sidequest collision check is park-mode-only; `tools/update-adopters.mjs:1227` per-path `git diff --quiet` spawns; `tools/update-adopters.mjs:803` skip reason points at `/ft-update` whose `git add` skips ignored paths; `tools/update-adopters.test.mjs:459` `before` shadows the `node:test` hook; `.flaitron/PLAN.md` CORE-777 stub carries glyph-less `[medium]`.
- Refactors: none. Left alone: GLOSSARY / README probe prose, `SPEC/blocked.md` `visual-confirm` row, the Codex pointer wrapper.
- Docs: `SPEC.md` and `docs/EXTERNAL-AGENTS.md` updated; every other AI-referenced doc unchanged.
- Scope reconciliation: declared 6 files, changed 6. Undeclared: none.
- Maintainability: the posture's "never relaxes" list now reads the same in the contract, the shared fragment, the micro runner, and the caller doc, and a non-Claude runner briefing a review probe for a micro note knows what to paste.

**Archived:** 2026-10-10
