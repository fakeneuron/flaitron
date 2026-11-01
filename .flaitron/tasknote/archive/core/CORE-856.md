---
title: agent-baseline-redundancy-survey
status: completed
tags: [context, survey]
created: 2026-11-01
due:
related-tasks: [CORE-657, CORE-660, CORE-661]
touches:
  - docs/HARNESS-SURVEY.md
---

# CORE-856 | agent-baseline-redundancy-survey

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-657]] [[CORE-660]] [[CORE-661]]

## 🎯 Goal

Append a third `docs/HARNESS-SURVEY.md` pass that classifies flaitron's ordinary-task load path (per runner, `wc -c`-measured) into agent-default restatement / harness-primitive explainer / rationale-in-loaded-text / self-maintenance machinery / small-task ceremony / load-bearing differentiator, scores the cut candidates, and recommends an epic, a pass-6 batch, or targeted trims — read-only on the contract.

## ✅ Acceptance

- [x] Survey section appended and drift checks pass — `bash tools/drift-checks.sh` → 0
- [x] No contract edits — `git diff --stat` shows no `SPEC.md` / `SPEC/` / `claude/skills/` paths (grep → 1, no match)
- [x] Every bucket row cites file + section with a reproducible `wc -c` byte count — `judgment`: Classification table carries file · section · line range · bytes · Unclassified residual, rows sum to Total; two review passes checked the arithmetic
- [x] Recommendation (a)/(b)/(c) stated with rationale against the 15% / bucket-E rule — `judgment`: §Filing recommends (a) on the bucket-E leg, states the 15% leg fires on gross only (17.2% / 25.8%) with net ~7.6% / ~11.4% at the 44% harvest rate; operator decides at 📦

## 🧩 Subtasks

- [x] Load-path map per runner: `wc -c` today vs at the context-diet close (`504f160f`, 2026-10-07) for the Claude always-loaded set, the flagged extras, and the Codex/Cursor/Grok set
- [x] Probe fan-out (read-only, one bucket question each): P1 `SPEC.md` + template + tasknote README A/B/C/F; P2 `ft-task` SKILL.md + preamble + gates.md + post-closure.md A/B/C/F; P3 `SPEC/procedures/ft-task.md` + four snippets A/B/C (weakest-runner lens); P4 bucket D inventory (KEEP IN SYNC blocks, drift-check pairs, mirror pairs, `ft-release/**`) — adopter-protective vs self-consistency; P5 bucket E — 8–10 recent small archived tasknotes, ceremony lines vs diff size
- [x] Distill into one classification table (file · section · bytes · bucket · weakest-runner test · disposition) and score candidates (bytes saved / maintenance removed / legibility / risk)
- [x] Re-examine [[CORE-657]]'s load-bearing-remainder verdict under bucket C; record bucket F keeps so they are not relitigated
- [x] Recommend (a)/(b)/(c) against the ≥15% / bucket-E rule, stated with the arithmetic
- [x] Append `## 2026-11-01 — third pass (agent-baseline lens)` to `docs/HARNESS-SURVEY.md` in the append-only shape; run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-657]] — `related-decision:` De-scoped incident-history trim; bucket C re-examines its verdict
- [[CORE-660]] — `related-decision:` gate-discipline trim via the decay window; the cadence data point
- [[CORE-661]] — `related-decision:` added `/ft-audit context` pass 6, the subtractive force recommendation (b) would change

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The lens is genuinely unapplied — both survey passes compared flaitron to other frameworks and [[CORE-EPIC-724]] (`context-diet`, 2026-10-07) deduplicated flaitron against *itself*; neither asked which clauses restate what the weakest runner does unprompted. Growth since the diet close is measured below and is real.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — `N/A`: no code or module boundary in scope; the deliverable is one appended doc section.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Drift check.** Every starter byte figure still holds within rounding: `SPEC.md` 44,818 · `claude/skills/ft-task/SKILL.md` 27,158 · `preamble.md` 7,513 · `SPEC/gates.md` 13,710 · `SPEC/procedures/ft-task.md` 34,197 · `claude/skills/ft-release/**` 108,531 (starter said ~118K; CONTEXT-BUDGET caps it at 113,000). `docs/HARNESS-SURVEY.md` has the two dated passes and both cited sections (§"Differentiators", §"External-caller exposure"). PLAN.md line matches the starter; no Re-scope.

**Archive skim.** `grep -l HARNESS-SURVEY archive/core/*.md` → 22 hits. Filtered by hand (the hits are short): 11 are Phase 4 doc-drift "dated record, no change" mentions (CORE-711.x, 769.x, 778.4, 831, 674); CORE-655…663 are the two passes' own filings, already summarized in the doc. **Load-bearing:**
- [[CORE-EPIC-724]] `context-diet` (2026-10-07, seven children, not named in the starter) is the direct predecessor. Its `.1` measured a flagless cold start of ~111k / ~136k with a flag and found "most of the bloat is restatement … dead rules are a small share". `.2` cut the four cold-start contract files 96,308 → 84,842 (−11.9%). `.7` opened a decay window (`504f160f`) dropping four no-provenance rule groups; [[CORE-727]] (2026-10-09) holds the restore bar. Its "Kept taste (protect)" and "Prior declines" lists are inputs to bucket F here.
- [[CORE-657]] Finding 3: 355 of the 422 bytes of nav-chip "history" in `SPEC.md` are CORE-393's anti-misreading hardening, not anecdote; Finding 5: the real headroom lever is CORE-607-style wholesale section extraction. Bucket C re-reads this with the agent-baseline question: does a current weakest runner still misread the passage without the guard?
- [[CORE-660]]: 16,077 → 4,686 on `gate-discipline.md` after a 34-note window — the cadence data point; the module was later deleted by 724.3.
- [[CORE-661]]: pass 6 proposes one clause per `/ft-audit context` run — the mechanism recommendation (b) would widen.
- [[CORE-727]] (decay-window restore, 2026-10-09) closed the window with all four cuts permanent and recorded a bucket-E signal it did not file: "CORE-728, CORE-750 and CORE-766 ran full tasknotes on one-to-two-line diffs. The bar doesn't measure it." Those three seed the bucket E sample.

**Growth since the diet close (`504f160f` → HEAD, 289 commits, 25 days).** `SPEC.md` 42,777 → 44,818 (+2,041) · `ft-task/SKILL.md` 23,437 → 27,158 (+3,721) · `preamble.md` 7,276 → 7,513 · `SPEC/gates.md` 14,095 → 13,710 (−385) · `SPEC/post-closure.md` 7,787 → 9,877 (+2,090) · `SPEC/procedures/ft-task.md` 32,740 → 34,197 (+1,457) · `AGENTS.md` 8,001 → 10,313 (+2,312) · `SPEC/gate-postures.md` 19,855 → 21,991 (+2,136). Always-loaded set (README +176, template −30 added; PLAN.md excluded as rotation): **+10,162** in 25 days, close to the −11.5k the diet removed from the flagged path. The "growth hunch" is a fact.

**Load path today (`wc -c`).** Claude flagless: `SPEC.md` 44,818 + `SKILL.md` 27,158 + `preamble.md` 7,513 + `AGENTS.md` 10,313 + tasknote `README.md` 11,052 + template 3,993 + `PLAN.md` 7,867 + `gates.md` 13,710 + `post-closure.md` 9,877 = **136,301**. Flag extras: `step-0-flags.md` 6,414 · `micro-mode.md` 6,334 · micro template 2,444 · `gate-postures.md` 21,991 · `tasknote-selection.md` 10,723 · `blocked.md` 15,870 · `unattended-mode.md` 25,665. Codex/Cursor/Grok: `SPEC.md` 44,818 + `SPEC/procedures/ft-task.md` 34,197 + snippet 6,149–7,522 + the shared `AGENTS.md`/README/template. Self-maintenance: 7 KEEP IN SYNC grep hits (P4 later: 4 real guard blocks), 12 drift-check functions by a `^check_|^pair_` grep (P4 later: 19 functions — the grep missed the seven not named `check_*`/`pair_*`), `ft-release/**` 108,531.

**No clarifications needed.** Assumptions asserted: (1) bucket E "small" = ≤50 LOC of non-tasknote diff in the closure commit (the starter's lean); (2) no `docs/CONTEXT-BUDGET.md` row for the survey doc — it is read at survey time, never at task time; (3) the 15% rule is measured against the flagless Claude cold start of 136,301 above, with the Codex path reported beside it; (4) the 724 epic's "Kept taste" list and the two passes' "not overkill" lists are bucket F by default — this pass re-examines them only through the weakest-runner test, not on taste; (5) the recommendation is written for the operator to decide at 📦, and nothing is filed here.

Carried from the promoted starter (filed 2026-11-01), preserved verbatim because the bucket definitions are the survey's method:

> **Why this exists.** The operator is concerned flaitron is over-specified relative to what coding agents now do unprompted. Confirmed pains (all four): per-task token cost, over-constraining agents, operator maintenance tax, adopter legibility. Evidence: simple tasks feel heavy, plus a growth hunch. Both prior `docs/HARNESS-SURVEY.md` passes (2026-09-21, 2026-09-22) compared flaitron to *other frameworks*; neither compared it to the *agent's own unprompted behavior*. Pass 6 (Contract decay, [[CORE-661]]) is the existing subtractive force but runs one clause per measurement window — [[CORE-660]] took ~10 days to move 11K of gate prose. This survey applies the missing lens across the whole ordinary-task load path at once.
>
> **Solution shape.**
> - **Map the load path per runner** with `wc -c`: Claude `SPEC.md` (44.8K) + `claude/skills/ft-task/SKILL.md` (27K) + `preamble.md` (7.5K) + `SPEC/gates.md` (near-universal); Codex/Cursor/Grok `SPEC/procedures/ft-task.md` (34K) + their snippets.
> - **Classify clauses into buckets:**
>   - **A — agent-default restatement** ("Read relevant source files", "Implemented the minimal solution", "Ran lint"). Test: would the weakest runner in use behave differently without it?
>   - **B — harness-primitive explainer** (probe/sub-agent prose, reviewer wiring). Cut to the trigger; runner-specific wiring moves to the snippet.
>   - **C — rationale/history in loaded text.** Move to `docs/` / archive with a pointer; re-examine [[CORE-657]]'s "load-bearing remainder" verdict.
>   - **D — self-maintenance machinery** (mirror pairs, KEEP IN SYNC blocks, drift-check pairs, the ~118K `/ft-release` dir). Does it protect adopters or only flaitron's self-consistency?
>   - **E — small-task ceremony.** Sample 8–10 recent small archived tasknotes; ceremony lines vs diff size; candidate fixes in `SPEC/tasknote-selection.md` thresholds and `--micro` defaults.
>   - **F — load-bearing differentiator.** Keep and record so it isn't relitigated (HARNESS-SURVEY §"Differentiators").
> - **Score** each candidate: per-task bytes saved, maintenance removed, legibility, risk.
> - **Recommend** (a) an epic with bucket-grouped children, (b) pass 6 → batch proposals by bucket, or (c) targeted trims only. Rule: ≥~15% ordinary-task load reduction, or bucket E addressed → (a).
> - Use probes for the classification fan-out; keep only the distilled table in the main window.
>
> **Explicitly out of scope.** Any edit to `SPEC.md`, `SPEC/`, `claude/skills/`, or runner snippets — the survey is read-only on the contract. Filing the epic — only on operator go at the 📦 gate, via `/ft-open-epic`.
>
> **Decisions locked.**
>
> | Decision | Choice | Rationale |
> |---|---|---|
> | Redundancy baseline | Weakest runner in use (Grok/Codex/Cursor) | Every runner shares the SPEC; a clause is redundant only if none of them needs it |
> | Deliverable | Exploration, then decide | Measure before cutting |
> | Hard constraints | External-caller parse surface untouched; pass-6 rules hold | HARNESS-SURVEY §"External-caller exposure" (Phase headings, per-phase checkboxes, `status:`/`park-reason:`, `## 🎯 Goal`); labeled mirrors aren't duplication; skipped-fragment catchers stay |
>
> **Open at promotion.** What counts as a "small" archived task for bucket E? Lean: ≤50 LOC of non-tasknote diff. Does the survey doc need its own `docs/CONTEXT-BUDGET.md` row? Lean: no — read at survey time, not task time.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern: `docs/HARNESS-SURVEY.md` is append-only, one dated `## ` section per pass with `### ` sub-sections (Landscape → ranked lists → Filing → Not examined → Sources). The third pass reuses that skeleton with the classification table in place of Landscape and keeps §"Filing" as the recommendation home, so the next pass can cite it the way pass 2 cites pass 1.

- [x] **Minimal refactor gate** — `N/A`: one appended section, nothing refactored; the survey touches no contract file by design.

- [x] Implemented the minimal solution — one appended section `## 2026-11-01 — third pass (agent-baseline lens)` in `docs/HARNESS-SURVEY.md` (Load path → Classification → D → E → F → Overkill re-ranked → Filing → Not examined)

- [x] Updated/added tests for non-trivial behavior — `N/A`: documentation deliverable, no code

**Implementation Notes:**

**P1 — `SPEC.md` / template / tasknote README.** `SPEC.md` 44,818: A=1,412 (3.2%) · B=1,616 (3.6%) · C=5,464 (12.2%) · F=35,781 (80%). Biggest A: §Phase 3 "Choosing a test strategy" L452-460 (636 B), §Phase 1 Best-Practices prose L351-355 (324), §Phase 2 L369-376 (452). Biggest C: §"What flaitron does NOT provide" L757-782 (1,498), §Core principles (667), §Phase 1 drift-check rationale L343-349 (538), §Phase 4 push-vs-pull memory L483-489 (508), §What is Flaitron (491). B: probe/delegate explainer L324-334 (819), skim probe clause (309), reviewer wiring L432-438 (488). Caveat: checkbox lines whose content is A ("Read relevant source files", "Implemented the minimal solution", "Ran lint") are scored F as parse surface; by content they add ~1–1.5K to A. `.flaitron/tasknote/README.md` 11,052: C=5,307 (48%) — five incident-history paragraphs L76-141 (CORE-489.3/492/543/622.3, ~4.5K) — F=5,467. Template 3,993: 99.7% F.

**P2 — `ft-task` SKILL.md / preamble / gates / post-closure (58,258 B).** SKILL.md 27,158: A=538 (2%) · **B2=5,262 (19.4%)** · C=1,096 · F=20,119. B2 sites: `--unattended` posture summary L35 (1,143 ↔ `gate-postures.md` + `unattended-mode.md`), Step 6 skill-specific L139-141 (964 ↔ `post-closure.md` steps 2–3, loaded one line earlier), External review L127 (916 ↔ SPEC §Phase 3 "Who reviews"), Phase 4 closure list L128 (770 ↔ SPEC §Phase 4, then "that section is authoritative"), epic Notes L145 (510 ↔ `epic.md`). A: Phase 2 L126 (391), tests/lint L127 (147). `preamble.md` 7,513: C=588, F=6,917. `gates.md` 13,710: B2=458 · C=999 (two-banner-cap governance L27-34, 629; Gate discipline pointer 370) · F=10,437 · unclassified 1,816. `post-closure.md` 9,877: B2=540 · C=211 · F=8,586. No plain-B passage in these four.

**Distilled arithmetic (Claude flagless cold start 136,301).** A ≈ 1,950 (1.4%; +1–1.5K if checkbox content were scored by content, but those lines are parse surface) · B 1,616 (1.2%) · B2 6,260 (4.6%) · C 13,665 (10.0%: SPEC 5,464 · README 5,307 · SKILL 1,096 · gates 999 · preamble 588 · post-closure 211) → **A+B+B2+C = 23,491 = 17.2% gross**; `AGENTS.md` (10,313) unprobed. Realistic harvest at 724.1's 44%-of-projection rate: 23,491 × 0.44 = ~10.3K = **7.6%** (review corrected my first "11–13%"). **Codex/Cursor/Grok cold start ≈ 135,800** (SPEC 44,818 + procedure 34,197 + AGENTS/README/template/PLAN 33,225 + gates/post-closure 23,587): procedure B2 14,650 + A/B/C 4,384 + SPEC A/B/C 8,492 + README C 5,307 + gates/post-closure B2/C 2,208 = **35,041 = 25.8% gross**, ~11.4% at the 44% rate. Headline: A is ~1.4% — flaitron does not mainly restate agent defaults; the redundancy is self-referential (skill/procedure re-narrating SPEC, incident history in loaded text) and routing (bucket E).

**P3 — Codex/Cursor/Grok path.** `SPEC/procedures/ft-task.md` 34,197: F=14,808 (43%) · **B2=14,650 (43%)** · C=1,708 · A=1,389 · B=1,287. The procedure re-narrates SPEC.md section by section: Phase 4 closure list L436-470 (2,333 B ↔ §Phase 4 + §Paper-complete guard), "Parking, in one paragraph" L63-87 (1,750 ↔ `blocked.md`), downstream-impact scan L375-391 (1,229 ↔ `tasknote-selection.md`), Step 6 L477-494 (1,125 ↔ `post-closure.md`), marker-vs-mode L132-146 (1,090 ↔ §Task-line format), Archive skim L304-316 (957, near-verbatim §Phase 1). A: Phase 2 core L360-367 (596), Clarify (338), Drift (297), targeted tests (158). Snippets: the only per-task-loaded snippet text is the `claude/AGENTS-snippet.md` paste-block L15-31 (3,855 B); everything else in the four snippets is one-time wiring (B). **Mirror tax across the four snippets ≈17.7 KB gross, ≈11 KB beyond one copy** (`ln` roster 2,528/4 · utilities 2,038/4 · derived-surface 1,950/3 + 1,659 SSOT · pinning 1,945/3 · no-global-glob 1,738/3 · archive-ignore 1,717/4 …) — maintenance cost, not per-task load. `SPEC/procedures/README.md` 5,119 B is not loaded per task.

**P4 — bucket D.** KEEP IN SYNC: only **4 real guard blocks** (2,826 B: `AGENTS.md:28/45/56`, `claude/AGENTS-snippet.md:9`), all guarding the adopter paste-block; my Discovery count of 7 included prose mentions. `tools/drift-checks.sh` 41,082 B / 19 functions, all run in CI; shell bytes by class: adopter-protective 11,014 · both 15,452 · internal-only 9,529 (`final_newline`, `sidequest_orphan`, `pair_h`, `pair_p`, `pair_r`, `pair_t`). `ft-release/**` 108,531: `SKILL.md` 37,336 · `step-7.1-mirror-pairs.md` 31,348 (15 pairs; adopter 5,778 / both 8,305 / internal 14,357 — Pair K alone 5,859 B of prose with no shell) · standing checks 22,871 · dogfood SOP 14,319 · tag message 2,657. **Per-task load from bucket D = 0 bytes**; it is release-time and CI cost only. CONTEXT-BUDGET §Budgets: 11 rows, 4,421 B of "Why". `docs/AGENT-NEUTRALITY.md` 26,295 B hand-maintained (54 commits since 2026-09-01), no check updates its counts.

**P5 — bucket E (10 archived notes, 2026-10-07 → 10-27, non-workflow diff ≤50 lines).** Median **698 tasknote bytes per diff line** (range 172 micro CORE-822 → 3,440 CORE-728: 6,881 B note for a 2-line edit). Under today's `SPEC/tasknote-selection.md` thresholds **6 of 10 route lighter than what ran**: CORE-728 and CORE-750 are skip-tier (doc patch <10 lines), CORE-766 / 825 / 828 / 838 are micro-tier; all six ran the full 4-phase note. Full notes average ~8,410 B (26–29 boxes); micro ~5,560 B (6–9 boxes) — micro saves a third, not an order of magnitude, because ⚡ Notes still logs every phase item. Box `N/A` frequency: Best Practices 7/10, External review 7/10, Doc-drift "no change" 5/10; Relevance / Archive skim / Drift check had content 10/10. Two artefacts: ticked boxes keeping the template instruction text (728, 825, 828); `tasknote-selection.md:13` "has an ID → tasknote" conflicts with `:20` "doc patch <10 lines → skip". Edges: closure-commit = all work assumed; `--micro` only became the stated default at CORE-818 (2026-10-22), so 728/750/766 followed their day's rule — but 825/828/838 post-date it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown only; `bash tools/drift-checks.sh` is the suite that covers it (receipt below)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (final newline, Pair Q citations, context budget) → 0

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — two `/code-review medium` passes on this task's diff; 1 blocker (returned to Phase 2, fixed, Phase 3 re-run) + 13 notes, all fixed; dispositions in Testing Notes

- [x] (frontend) `N/A` — no rendered surface changed

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (2026-11-01):
- `bash tools/drift-checks.sh` → 0 (19 checks, Pair Q section citations included)
- `git diff --stat | grep -E 'SPEC\.md|SPEC/|claude/skills/'` → 1 (no match: no contract path changed; diff = `docs/HARNESS-SURVEY.md`, `.flaitron/tasknote/CORE-856.md`)
- Spot-checks of cited anchors: `SPEC/tasknote-selection.md:13` = "has a `<AREA>-<NUMBER>` ID in PLAN.md", `:20` = "Documentation patches under ~10 lines" ✓ · `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" exists at L24 ✓ · tasknote README L76 / L141 bound the incident-history run ✓ · the new `## 2026-11-01` heading is the file's third `## ` section ✓
- Bucket-row byte counts are the probes' `sed -n 'S,Ep' | wc -c` figures; the per-path sums are re-added by hand in Implementation Notes (23,491 / 136,301 = 17.2%; 35,041 / 135,800 = 25.8% after the review's symmetry fix).

**External review, pass 1** (`/code-review medium`, this diff only) — 8 findings, graded against Acceptance:
- **Blocker** (criterion 4): "realistic harvest ~11–13% / ~15–18%" did not follow from the cited 44% rate (17.2% × 0.44 = 7.6%; 25.8% × 0.44 = 11.4%). Fixed: §Filing now says the 15% leg fires on gross only, states both net figures, and rests (a) on bucket E plus a 10–15 KB saving. Child byte targets lowered to match.
- Note: "1.0% of the procedure" → 4.1% (1,389 / 34,197). Fixed.
- Note: Codex/Cursor/Grok numerator omitted `gates.md` + `post-closure.md` B2/C (2,208) that the Claude numerator counted. Fixed: 35,041 = 25.8%.
- Note: regrowth "+9.6 KB" did not reproduce from the listed deltas. Fixed: +10,162 over the always-loaded set, PLAN.md excluded as rotation (21,905 → 7,867), `gate-postures.md` and the procedure listed as off-set.
- Note: Classification rows did not sum to Total. Fixed: Unclassified column added with the residual named for `gates.md` (1,816) and `post-closure.md` (540).
- Note: Discovery "7 KEEP IN SYNC / 12 drift-check functions" vs P4's 4 / 19. Fixed: Discovery line now carries the reconciliation (the grep missed functions not named `check_*`/`pair_*`).
- Note: Subtasks 2–6 unticked while Phase 2 ticked. Fixed.
- Note: bucket D sub-class sums left 5,087 (drift-checks header/dispatcher) and 2,908 (mirror-pairs intro) undisclosed. Fixed: both named.
Phase 3 re-run from the top after the fixes: `bash tools/drift-checks.sh` → 0; contract-path grep → 1 (no match). Pass 2 of the review recorded below.

**External review, pass 2** (`/code-review medium`, corrected diff) — 6 findings, no blocker; all notes, all fixed inline:
- Receipt line still read 32,833 / 24.2% — already replaced by 35,041 / 25.8% in the same edit batch (reviewer saw the pre-fix snapshot); confirmed by grep, no stale figure remains.
- Regrowth compared the 8-file always-loaded set (+10,162) to the diet's 4-file cut (−11,466). Fixed: both figures kept and labelled; like-for-like on the diet's own set is +5,882 = 51% regrown.
- "~24 KB serves only self-consistency" mixed `ft-release/**` (14,357) with `drift-checks.sh` internal shell (9,529). Fixed: split and attributed.
- "half of C is the README" → 39%; Overkill #2 attributed all 5,307 B to L76-141, which measures 4,563. Fixed: span figure corrected, the other 744 B located (L38-41, L50-55) and marked as staying.
- Scope sentence claimed every passage on the load path was classified while `AGENTS.md` / `PLAN.md` were not. Fixed: stated up front as a 13%-incomplete inventory, percentages as lower bounds.
- Overkill #1 cited "the file's own blockquote" for the authority clause; it is the plain intro at L16-22. Fixed with the quoted wording.
Final re-run: `bash tools/drift-checks.sh` → 0 (receipt below).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all entries "no change": `docs/HARNESS-SURVEY.md` is outside the sweep set and nothing in it mirrors a pass's content (same verdict as CORE-663 for pass 2); `README.md:122`'s index line ("dated comparisons of …") still describes the file. `docs/CONTEXT-BUDGET.md`: no row (read at survey time, not task time — Discovery assumption 2).

- [x] Closed — Acceptance ticked, `status: completed`, PLAN.md line → `Completed 2026-11-01.` stub at the top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A`: the survey's findings are filed as a recommendation for the operator; nothing belongs in the always-loaded layer until the epic decides it

**Final Summary:**

Appended the third `docs/HARNESS-SURVEY.md` pass, which turns the lens on flaitron's own per-task context instead of the field: five read-only probes bucketed nine always-loaded files by whether the weakest runner would behave differently without each passage. The operator's hypothesis is mostly false by bytes — agent-default restatement is 1.4% of the Claude cold start. The redundancy is self-reference and routing instead: `SPEC/procedures/ft-task.md` re-narrates SPEC for 43% of its bytes, `claude/skills/ft-task/SKILL.md` for 19%, the tasknote README carries 4.5 KB of incident history, and six of ten small tasks ran a full note where today's thresholds route skip or micro. Recommendation (a), an epic, on the bucket-E leg; the 15% leg fires only on gross (17.2% Claude / 25.8% other runners; ~7.6% / ~11.4% net at the recorded harvest rate), and the section says so.

- **Changed:** `docs/HARNESS-SURVEY.md` (+~215 lines, one dated section: Load path → Classification → D → E → F → Overkill re-ranked → Filing → Not examined); this tasknote. No contract file touched.
- **Verification:** `bash tools/drift-checks.sh` → 0 three times (initial, after pass-1 fixes, final); contract-path grep → no match. External review: pass 1 — 1 blocker (harvest arithmetic) + 7 notes, all fixed, Phase 3 re-run; pass 2 — 6 notes, all fixed.
- **Refactors:** none.
- **Doc-drift sweep:** all "no change"; the survey doc is outside the sweep set and `README.md:122` still describes it.
- **`touches:` reconciliation:** declared `docs/HARNESS-SURVEY.md`; `git diff --name-only` = that file + this tasknote. Matches.
- **Maintainability:** the next trim has byte-bound targets per bucket and a recorded F list, so it need not re-argue what to keep; regrowth is measured like-for-like (51% of the diet's cut back in 25 days).

**Archived:** 2026-11-01
