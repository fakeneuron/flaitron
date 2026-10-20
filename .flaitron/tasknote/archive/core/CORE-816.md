---
title: quality-first-calibration
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-814, CORE-741.3, CORE-EPIC-815]
touches:
  - docs/PLATFORMS.md
  - SPEC/model.md
  - SPEC/post-closure.md
  - docs/AGENT-NEUTRALITY.md
  - claude/skills/ft-task/step-1.5-model-edge.md
---

# CORE-816 | quality-first-calibration

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-10-20 · 🔗 [[CORE-814]] · 🔗 [[CORE-741.3]] · 🔗 [[CORE-EPIC-815]]

## 🎯 Goal

Re-calibrate the `docs/PLATFORMS.md` tier × platform map and its `SPEC/model.md` rules around a stated quality-first bias, so Claude Code's `[light]` / `[moderate]` / `[heavy]` print three distinct picks (Sonnet @ high / Opus @ medium / Opus @ high), Haiku is named as off the map (explicit concrete `haiku` tag only), and every other platform's cells are re-checked under the same bias.

## ✅ Acceptance

- [x] Map Claude Code column is `Sonnet @ high` / `Opus @ medium (alt Sonnet @ high)` / `Opus @ high` / `Fable @ high–xhigh` — `grep -q '| \`\[moderate\]\`🧩 | Opus @ medium (alt Sonnet @ high) |' docs/PLATFORMS.md`
- [x] Map Codex column is `Sol @ medium (alt Luna @ high)` / `Sol @ medium` / `Sol @ high` / `Astra @ high–xhigh` — `grep -q '| Sol @ high | Grok @ xhigh |' docs/PLATFORMS.md && grep -q 'Astra @ high–xhigh' docs/PLATFORMS.md`
- [x] Map Grok column is `Grok @ medium` / `Grok @ high` / `Grok @ xhigh` / ⚠️ — `grep -q '| Grok @ medium |$' docs/PLATFORMS.md`
- [x] Roster `Band at default effort` cells unchanged; Sol / Astra equivalences match the new cells; Terra's status recorded — `git diff docs/PLATFORMS.md` + `judgment` (cell text)
- [x] Map prose states the quality-first bias, Haiku off the map, Terra's absence, and that Codex is now the only platform where `[light]`/`[moderate]` share a pick — `grep -c 'quality-first' docs/PLATFORMS.md` ≥ 1 + `grep -q 'haiku' docs/PLATFORMS.md` + `judgment`
- [x] `SPEC/model.md` floor rule is band-based under a stated quality-first bias (below-default effort allowed only when the configuration still reaches the tier) — `grep -q 'Quality-first' SPEC/model.md && ! grep -q "reaches the vendor's default or goes above it" SPEC/model.md`
- [x] Restatements follow (post-closure `[moderate]` example; AGENT-NEUTRALITY provenance) — `grep -q 'Opus @ medium' SPEC/post-closure.md && grep -q 'CORE-816' docs/AGENT-NEUTRALITY.md`
- [x] Drift checks + context budgets pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `docs/PLATFORMS.md` §"Tier × platform map": new date, cells, prose (quality-first bias, band-based floor, Haiku, Terra, same-pick now Codex-only, verification sources)
- [x] `docs/PLATFORMS.md` §"Family roster": Sol / Astra effort-shift equivalences; GPT-5.6 Terra note in the `gpt-5` row; dated note
- [x] `SPEC/model.md` §"Effort recommendations": reword the reliability-floor bullet into the quality-first rule
- [x] `SPEC/post-closure.md` step 2 `[moderate]` example pick → `Opus @ medium`
- [x] `docs/AGENT-NEUTRALITY.md` rows 53/54 provenance for CORE-816
- [x] Run drift checks; External review

## 🔗 Related

- [[CORE-814]] — the decision being revisited (moved Claude `[moderate]` to Sonnet to match its band)
- [[CORE-741.3]] — origin of the tier × platform map
- [[CORE-EPIC-815]] — the `[medium]` → `[moderate]` tier rename; independent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The map still carries CORE-814's band-matched Claude `[moderate]` = Sonnet pick, and the operator's quality-first bias is unrecorded anywhere. The PLAN line's scope holds. Its "Codex, Grok and Gemini re-checked" clause did turn into real cell changes (see Clarifications).

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — `N/A`: docs/contract wording only; ownership split stays (SPEC/model.md owns the rule, docs/PLATFORMS.md owns the dated cells)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read:** `docs/PLATFORMS.md:416-512` (map + roster), `SPEC/model.md:60-230` (ladder baseline, effort axis, §"Effort recommendations", round-up), `SPEC/post-closure.md:37-41`, `docs/AGENT-NEUTRALITY.md:53-54`, `claude/skills/ft-task/step-1.5-model-edge.md:9-24`.
- **Archive skim:** four hits name the map: CORE-741.3 (map origin), CORE-741.4 (printing rule), CORE-741.N, and CORE-814. CORE-814's clarification (2) lowered Claude `[medium]` to Sonnet and kept `[light]` on Sonnet because Haiku had no verified roster row. Its review note 2 documented the light/moderate same-pick as "the intended consequence of the effort floor". This task reverses that choice on Claude and Grok by replacing the default-based floor with a band-based one.
- **Drift check:** every cited path and section exists. One piece of drift: **the map has no Gemini column**, because Gemini only appears in two Family roster rows. Since roster bands stay unchanged (cells-only decision), Gemini changes nothing. The `step-1.5-model-edge.md` restatement looked like it was only the unchanged `Fable @ high` example. Phase 2 found its `Codex (Astra @ xhigh)` switch example too, so the file was added to `touches:` (see Implementation Notes).
- **Vendor re-verification (2026-10-20):**
  - Anthropic: `platform.claude.com/docs/en/build-with-claude/effort` lists Opus 5.5 default `medium` and Sonnet 5.5 default `high`. Haiku 5.5 exists with default `medium`.
  - OpenAI: `learn.chatgpt.com/docs/models` calls Astra the flagship and starts it at Light. It says "GPT-6.1 Sol offers near-Astra performance at a lower cost than Astra" (starts at the client default). Luna is the efficient model and starts at High. It also says "GPT-5.6 Sol, GPT-5.6 Terra, and GPT-5.6 Luna remain available during the rollout." Aggregators report 6.1 Sol about 1 point under Astra on the AA Intelligence Index, and ahead of 5.6 Terra on 10/10 shared benchmarks at a lower price ($2/$10 vs $2.50/$15 per M tokens). Terra was 5.6's middle tier, and GPT-6 has no Terra.
  - xAI: `docs.x.ai/docs/guides/reasoning` lists grok-4.7 `low`/`medium`/`high`/`xhigh` with default `high`, and pitches medium for "complex data analysis and long-context reasoning". `docs.x.ai/docs/models` names grok-4.7 as the flagship.
- **Clarifications (operator, AskUserQuestion, two rounds):**
  1. Claude Code: `[light]` Sonnet @ high · `[moderate]` Opus @ medium (alt Sonnet @ high) · `[heavy]` Opus @ high.
  2. Round-up default stays `[moderate]`.
  3. Codex: the operator's read is Sol ≈ Opus and Astra ≈ Fable (my Astra @ medium for `[moderate]` was "heavy"). The new column is `[light]` Sol @ medium (alt Luna @ high) · `[moderate]` Sol @ medium · `[heavy]` Sol @ high · `[frontier]` Astra @ high–xhigh. Light and moderate share a pick because nothing sits between Luna and Sol in GPT-6. Terra is not named, since 6.1 Sol dominates it.
  4. Grok: the operator's read is medium ≈ Sonnet@high/Opus@medium, high ≈ Opus medium–high, xhigh ≈ Opus high. The new column is `[light]` Grok @ medium · `[moderate]` Grok @ high · `[heavy]` Grok @ xhigh. The floor is reworded from "reaches the vendor default" to "reaches its tier's band".
  5. **Cells only.** Roster "Band at default effort" cells and the gate's `grok`/`codex` = moderate examples stay unchanged.
- **Consequence of 3 + 5 (needs the gate's go):** the roster's equivalence column currently reads `sol@xhigh–@max ≈ heavy-band` and `astra@xhigh ≈ frontier-band`. Without edits, the new `[heavy]` Sol @ high and `[frontier]` Astra @ high picks would read *under-tier* against their own roster rows. Plan: update **only the effort-shifted equivalences**, to `sol@high` ≈ heavy-band and `astra@high` ≈ frontier-band, citing the near-Astra vendor statement. The default bands are untouched, so a default-effort Sol or Grok session still gets the ⚠️ on `[heavy]`. A Codex session running Sol @ high would no longer get it.
- **Haiku:** it is already absent from the map. The prose now says so explicitly: no tier pick names Haiku, and it runs only on an explicit concrete `haiku` tag for the lightest or micro work. No roster row is added, and the SPEC/model.md `haiku`→light bucket stays.
- **Assumption:** the CORE-814 provenance rows in AGENT-NEUTRALITY stay as history, and CORE-816 is appended to them.

Starter context preserved verbatim (open questions feed the clarifying step):

> ## 🌱 Starter context
>
> _Captured 2026-10-20 during the CORE-815.4 post-closure discussion. Promote to a full tasknote at `/ft-task` checkout._
>
> ### Why this exists
>
> [[CORE-814]] lowered Claude `[moderate]` (then `[medium]`) from Opus @ medium to Sonnet @ high so the cell matched Sonnet's roster band. As a result, `[light]` and `[moderate]` print the same Claude Code pick. The operator puts code quality first and would rather lean a little heavier than sit on the cusp of errors. They have historically run moderate work on Opus @ medium and light work on Sonnet @ high.
>
> ### Solution shape
>
> - Claude Code map: `[light]` Sonnet @ high, `[moderate]` Opus @ medium, `[heavy]` Opus @ high, so the three picks differ.
> - Reword the roster's Opus row (heavy at default effort `medium`; `opus@low` ≈ moderate-band) and the "cell matches its band" rule around a stated quality-first bias. When a cell is on the cusp, pick the heavier model.
> - Haiku stays off the map. It is allowed only as an explicit concrete `haiku` tag for the lightest or micro work.
> - Apply the same bias to the Codex (Sol / Astra / Luna), Grok and Gemini cells, and check that each tier is labelled honestly.
>
> ### Files to touch (preliminary survey — drift-check at promotion)
>
> - `docs/PLATFORMS.md` — §"Tier × platform map" cells and prose, §"Family roster" band and equivalence cells
> - `SPEC/model.md` — §"Effort recommendations" (band-matching and "Printing a cell" rules)
> - `SPEC/post-closure.md` — the `[moderate]🧩 … · Sonnet @ high` example line
> - `docs/AGENT-NEUTRALITY.md` — the CORE-814 provenance rows
> - `claude/skills/ft-task/step-1.5-model-edge.md` — only if a pick is restated there
>
> ### Explicitly out of scope
>
> - A new sub-light tier — decided against (see below)
> - Tier renames — [[CORE-EPIC-815]]
>
> ### Decisions locked in this conversation
>
> | Decision | Choice | Rationale |
> |---|---|---|
> | Sub-light tier | No | `--micro` already covers tiny work; ladder churn is costly ([[CORE-EPIC-815]] precedent); a lower rung works against the quality-first bias |
> | Haiku | Off the ladder; explicit `haiku` tag only | The operator doesn't trust it beyond the lightest or micro work |
> | Bias | Lean heavier when a cell is on the cusp | Code quality first |
>
> ### Open at promotion (Phase 1 should resolve)
>
> - Should the round-up default (`[moderate]` when unsure) move up to `[heavy]`? Lean: no. Moderate on Opus @ medium already gives the margin.
> - Re-verify vendor roster facts? Lean: yes, for every cell this task changes.
> - Is Grok's `[light]` / `[moderate]` same-pick acceptable, given there is no lighter Grok? Lean: decide at Discovery.
>
> ### Related
>
> - [[CORE-814]] — the decision being revisited (`related-decision:`)
> - [[CORE-741.3]] — origin of the tier × platform map
> - [[CORE-EPIC-815]] — the tier rename; independent

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: docs/contract wording only, with no code path. `tools/drift-checks.sh` covers budgets and citations

**Implementation Notes:**

- Pattern: extended the existing map + roster + rule split. Cells and dated facts are in `docs/PLATFORMS.md`, and the rule is in `SPEC/model.md` §"Effort recommendations". No new shape.
- `docs/PLATFORMS.md`: map re-dated to 2026-10-20 with the new cells. The prose under the table was rewritten around the quality-first bias, the band-based floor, and Codex as the only light/moderate same-pick, with Terra and Haiku explained and re-verification sources listed. Roster: `gpt-5` row notes GPT-5.6 Sol/Terra/Luna. The `gpt-5` and `codex` equivalences moved to `sol@high` ≈ heavy and `astra@high` ≈ frontier. The roster header is dated 2026-10-20, and the "Band at default effort" column is untouched. The Codex effort row reads `[frontier]` = Astra @ high–xhigh.
- `SPEC/model.md`: the "Reliability floor" bullet became "Quality-first floor" (band-based, heavier on the cusp, below-default effort only where the tier is still reached). Range printing now defers to "Printing a cell", which already covered the lower-end case that Astra @ high–xhigh now needs.
- `SPEC/post-closure.md`: the `[moderate]` example is now `· Opus @ medium`.
- `claude/skills/ft-task/step-1.5-model-edge.md:24`: the Grok frontier switch example now names `Codex (Astra @ high)`. This was found by a grep for restatements, so the file was added to `touches:`.
- `docs/AGENT-NEUTRALITY.md`: CORE-816 provenance appended to the model.md and post-closure rows. The CORE-814 history is kept.
- No refactor.
- **Beyond the gate-approved plan (review round 1):** the plan named only the `sol@high` / `astra@high` shifts. Review round 1 showed that `Grok @ medium` had no roster backing and that Astra @ medium had no band in the codex row, so this run also added `grok@medium` ≈ moderate (the operator's stated read: "grok medium closer to opus medium or sonnet high") and codex-row `astra@medium` ≈ heavy (follows from the operator's Astra ≈ Fable read). Both are marked operator-calibrated, and neither changes a default band. Surfaced to the operator at closure.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (no code; drift checks cover the markdown)

- [x] Ran lint/type-check on changed code — `N/A`: markdown only; final-newline and context-budget checks pass in drift-checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final run, after review round 3 fixes):
- A1 `grep -q '| \`[moderate]\`🧩 | Opus @ medium (alt Sonnet @ high) |' docs/PLATFORMS.md` → 0
- A2 `grep -q '| Sol @ high | Grok @ xhigh |' … && grep -q 'Astra @ high–xhigh' …` → 0
- A3 `grep -q '| Grok @ medium |$' docs/PLATFORMS.md` → 0
- A4 roster "Band at default effort" column diff vs HEAD → 0 (unchanged); equivalence cells judged against the new cells (Sol/Astra/Grok shifts back every pick and are marked operator-calibrated); Terra noted in the `gpt-5` row
- A5 `grep -q 'quality-first' … && grep -q 'haiku' docs/PLATFORMS.md` → 0; judgment: the prose covers the bias, Haiku/Luna, Terra, and the Codex-only same-pick
- A6 `grep -q 'Quality-first' SPEC/model.md && ! grep -q "reaches the vendor's default or goes above it" SPEC/model.md` → 0
- A7 `grep -q 'Opus @ medium' SPEC/post-closure.md && grep -q 'CORE-816' docs/AGENT-NEUTRALITY.md` → 0
- A8 `bash tools/drift-checks.sh` → 0 (all checks ok, context_budget included)
- Structural: no duplication (the printing rule restatement was removed from the map in round 1), no dead text, and every restatement of a changed pick was updated (repo-wide `<Model> @` grep).

External review (`/code-review medium`, working-tree diff, three rounds):
- **Round 1 (7):** (1)+(5) **blocker**: `Grok @ medium` had no roster backing, and the floor's below-default clause could not be checked. Fixed by adding the `grok@medium` ≈ moderate shift and anchoring the clause to a roster shift. (2) note: Codex `[moderate]` not leaning heavier. This was an operator call, now explained in the prose. (3) note: Astra @ medium had no band. Fixed with a codex-row `astra@medium` ≈ heavy. (4) note: the Luna wording contradicted the table. Fixed. (6) note: the map restated the printing rule. Fixed by citing it instead. (7) note: model.md names example picks. No change, since the module already cited `Opus @ high` / `Fable @ high–xhigh` before this task.
- **Round 2 (9):** (1)(2)(3)(8) **blocker**: the SPEC/model.md baseline still said Astra is frontier "at `xhigh`" and a moderate model reaches heavy only "at its highest effort", so the Sol @ high / Astra @ high picks would trip their own ⚠️. Fixed: both baseline bullets now defer to the PLATFORMS bands. (4)(7) note: provenance cited OpenAI's Sol statement for the Astra shifts. Fixed: the shifts are marked operator-calibrated. (5) note: the Sol-margin claim. Reworded. (6) note: Grok `[light]` moved below the vendor default. No change, operator decision. (9) note: wrap. Fixed.
- **Round 3 (8), all note rung (no Acceptance criterion failed, no self-tripping pick):** (1) the rule claimed universality. Fixed: the ⚠️ cell is excepted and "cusp" is the operator's judgment. (2) `sol@high` cited vendor evidence. Fixed: marked operator-calibrated. (3) a redundant `astra@medium` in the gpt-5 row, whose default is already heavy. Removed. (4) shifts beyond the gate-approved plan. Recorded in Implementation Notes and surfaced at closure. (5) the circular below-default clause. The rule now requires operator-calibrated shifts to say so. (6) the "So `[light]`…" causality. Fixed: light-band models stay off primary picks. (7) Astra default unknown for printing. Fixed: "Astra starts at Light = `low`" added to the gpt-5 ladder. (8) Opus 5 and earlier default to `high`. Fixed: the prose says "Opus 5.5".

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

- **Doc-drift sweep:** `docs/PLATFORMS.md` and `docs/AGENT-NEUTRALITY.md` updated (the deliverables). Every other `.flaitron/tasknote/README.md` §"AI-referenced docs" entry gets "no change", backed by a grep for Sonnet/moderate picks and "vendor default" across them (0 hits). The earlier repo-wide `<Model> @` grep caught the `step-1.5-model-edge.md` example, which is now updated.
- **Changed files:** `docs/PLATFORMS.md` (map, prose, roster shifts/notes), `SPEC/model.md` (frontier and heavy baseline bullets, quality-first floor), `SPEC/post-closure.md` (`[moderate]` example), `claude/skills/ft-task/step-1.5-model-edge.md` (Codex frontier switch example), `docs/AGENT-NEUTRALITY.md` (provenance).
- **Verification:** A1–A8 → 0. Three external-review rounds: two blockers fixed, every note fixed or explained.
- **Refactors:** none.
- **`touches:` reconciliation:** `git diff --name-only` = declared five paths plus this tasknote; `step-1.5-model-edge.md` was added mid-run (found by the Phase 2 restatement grep).
- **Maintainability:** the ownership split holds (rule in SPEC/model.md, dated cells in PLATFORMS). Operator-calibrated roster shifts are now marked as such, so a future vendor refresh knows which cells rest on judgment.
- **Learnings:** `N/A`. Nothing new for the always-loaded layer.

**Archived:** 2026-10-20
