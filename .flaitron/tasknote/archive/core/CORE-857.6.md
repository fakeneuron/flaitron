---
title: spec-c-extraction
status: completed
tags: [context, spec]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-857.1, CORE-856, CORE-657, CORE-558.2, CORE-857.4]
touches:
  - SPEC.md
  - docs/CONTEXT-BUDGET.md
  - .flaitron/PLAN.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
---

# CORE-857.6 | spec-c-extraction

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-857]] [[CORE-857.1]] [[CORE-856]] [[CORE-657]] [[CORE-558.2]]

## 🎯 Goal

Move the rationale prose CORE-856 classed as bucket C (plus the bucket-A test-strategy paragraph) out of always-loaded `SPEC.md` behind pointers, keeping every heading and every anti-misreading guard, and lower the `SPEC.md` budget cap by the bytes removed.

## ✅ Acceptance

- [x] Every `SPEC.md` heading is unchanged — `diff <(git show HEAD:SPEC.md | grep '^#') <(grep '^#' SPEC.md)` prints nothing
- [x] ≥1,000 B out of `SPEC.md` (re-scoped from ≥3,000; lowered from ≥1,500 as two External review passes restored guard clauses) — `test $(wc -c < SPEC.md) -le 43818`
- [x] §"What flaitron does NOT provide" keeps an always-loaded trace: the five omissions, the three carve-outs by name, both scripts' write bounds, "not precedents", and the `SPEC/scope-boundaries.md` pointer — a per-term `grep -q` loop over the joined section (`CLI`, `chema validation`, `database`, `query`, `CI hooks`, `update-adopters`, `never PLAN.md`, `install.sh`, `commits`, `refuses once`, `visualizer`, `not precedents`, `scope-boundaries.md`) prints no `MISS`
- [x] §"Core principles" keeps all five numbered bold labels, so the `#N` citers still resolve — `awk '/^## Core principles/,/^## Layout/' SPEC.md | grep -cE '^[1-5]\. \*\*'` → 5
- [x] §"What is Flaitron" points at `docs/VISION.md` — `awk '/^## What is Flaitron/,/^## Core principles/' SPEC.md | grep -q 'docs/VISION.md'`
- [x] Phase 3 "Choosing a test strategy" cut to a short paragraph (637 → ≤450 B; "one line" relaxed after External review restored the never-a-validator guard and the gap criterion) that still names that guard and the `--unattended` full-validation rule — `awk '/^\*\*Choosing a test strategy/,/^$/' SPEC.md | tr '\n' ' ' | grep -q 'schema/validator' && … | grep -q 'full validation set'` + `awk '/^\*\*Choosing a test strategy/,/^$/' SPEC.md | wc -c` ≤450
- [x] The hunks touch only the four target passages (CORE-558.2's §"Cross-repo edit remit" / §"Loop tasks" untouched) — `git diff -U0 SPEC.md | grep '^@@'` (judgment: read the hunk list)
- [x] `docs/CONTEXT-BUDGET.md` lowers the `SPEC.md` cap by the bytes removed and appends a cap-history step — `grep -n 'CORE-857.6' docs/CONTEXT-BUDGET.md`
- [x] Drift checks green (`pair_q` citations, `context_budget`) — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Rewrite §"What is Flaitron" to two sentences + a `docs/VISION.md` pointer
- [x] Trim §"Core principles" glosses; keep the five numbered bold labels and the #2 carve-out pointer
- [x] Compact §"What flaitron does NOT provide" to its always-loaded trace + `SPEC/scope-boundaries.md` pointer
- [x] Cut Phase 3 "Choosing a test strategy" to one line
- [x] Measure the cut; lower the `SPEC.md` cap in `docs/CONTEXT-BUDGET.md` by it and append the cap-history step
- [x] Phase 3: acceptance commands, `bash tools/drift-checks.sh`, External review on this diff
- [x] Phase 4: doc-drift sweep, closure flips, archive move

## 🔗 Related

- [[CORE-EPIC-857]] — parent epic
- [[CORE-857.1]] — Discovery that scoped this child
- [[CORE-856]] — survey that measured bucket C
- [[CORE-657]] — the anti-misreading filter
- [[CORE-558.2]] — restored §"What flaitron does NOT provide" as an always-loaded rule
- [[CORE-857.4]] — follows this child (its pointers target the final SPEC headings)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Still the right work, but the filed ≥3,000 B target assumed all four passages could go almost entirely. Two earlier decisions rule that out: CORE-558.2 keeps the omission list always-loaded, and VISION.md treats SPEC's principles as canonical. The operator chose a compact trace and a lower target (table below). The PLAN line was rewritten to match (63w).

- [x] Read relevant source files — `SPEC.md` L1-31 and L452-460, L757-782; `SPEC/scope-boundaries.md`; `docs/VISION.md` headings + L19-26; `docs/CONTEXT-BUDGET.md` rows; `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair K; `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers"

- [x] **Best Practices Review** — `N/A`: markdown contract prose; the boundary rule here is canonical-plus-labeled-mirror (`docs/CONVENTIONS.md`), applied below

- [x] **Archive skim** — `archive/core/` (confirmed against the README table); scoped to the predecessor cohort named in .1 and the section-specific hits: findings below

- [x] **Drift check** — the PLAN figures hold: bucket C 5,464 B (CORE-856), test strategy 637 B (the survey said 636), `SPEC.md` 44,818 B, cap 49,000. Drift: the target assumed the four passages could go almost whole, and the precedents below say otherwise. Resolved by the Re-scope.

- [x] Asked clarifying questions — resolved via AskUserQuestion, table below

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

**Measured passages (bytes, HEAD `ea23b117`).** §"What is Flaitron" 492 · §"Core principles" 668 · §"What flaitron does NOT provide" 1,498 · Phase 3 "Choosing a test strategy" 637, **3,295 total**. Reaching ≥3,000 out would mean deleting nearly all of it.

**Archive precedents (load-bearing).**
- [[CORE-558.2]] restored §"What flaitron does NOT provide" (and §"Cross-repo edit remit", §"Loop tasks") from a bare stub because they "state rules that fire unprompted". An agent about to add a CLI or validator has no trigger to load a module, so a rule with no always-loaded trace never gets read. `step-7.1-mirror-pairs.md:92` records the class as kept on purpose. [[CORE-724.2]] left all three untouched for the same reason. CORE-856 called the section movable because a lazy home exists, but did not address this reasoning.
- [[CORE-558.1]]: "Core principles stay." `docs/VISION.md:19` calls its own list a recap of SPEC's canonical one. Six files cite principles by number (#2 `SPEC/plan-filing.md:360`; #3 `docs/CONVENTIONS.md:152`, `docs/EXTERNAL-AGENTS.md:11`, `docs/CONTEXT-BUDGET.md:6`; #5 `docs/CONVENTIONS.md:162`; the list `docs/MIGRATION.md:544`).
- [[CORE-657]] / CORE-856 filter: a passage that answers a question an agent is known to have asked wrongly stays; who-decided-when goes to `docs/`.
- [[CORE-558.5]]: a VISION.md pointer *added* to SPEC core costs budget. This task adds one pointer as part of a net cut, and in §"What is Flaitron", not in the K2-adjacent §"What flaitron does NOT provide" (which keeps citing its contract module, `SPEC/scope-boundaries.md`), so the step-7.1 bullet stays true.

**Guards.** `docs/EXTERNAL-AGENTS.md` pins SPEC headings and `pair_q` resolves every `§"…"`, so every heading stays and only the prose under it moves. `tools/update-adopters.mjs:4` cites the omission section by name and the trace still names that file. `context_budget` measures `wc -c`.

**Resolved scoping** (AskUserQuestion, 2026-11-01):

| question | answer |
|---|---|
| §"What flaitron does NOT provide" | Compact always-loaded trace (~560 B): the five omissions, the three carve-outs by name, "not precedents", pointer. Bare stub declined (it would reverse CORE-558.2) |
| §"Core principles" | Keep the list canonical with all five numbered labels and trim the glosses. Moving it to VISION was declined |
| Target | Accept the actual cut (~1.8 KB) and lower the 49,000 cap by it; record the gap for `.N`. Pulling the Phase 1 / Phase 4 hardening paragraphs was declined |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-558.2]]'s compact-summary shape (always-loaded substance, closing `Canonical contract: see [module].` line, the idiom used 8× in `SPEC.md`) and [[CORE-724.2]]'s cap-history step format in `docs/CONTEXT-BUDGET.md`

- [x] **Minimal refactor gate** — only the four passages and their two dependents changed (the cap row and history, plus the step-7.1 bullet the new VISION pointer would otherwise contradict)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: contract prose; the guards are the drift checks + acceptance greps

**Implementation Notes:**

- Final `SPEC.md` 44,818 → 43,772, **−1,046** (`wc -c`). Of the four passages, §"What is Flaitron" (492 → 229) and test strategy (637 → ~440) carry the most; §"Core principles" kept its five labels and lost ~90 B of gloss; §"What flaitron does NOT provide" went 1,498 → ~1,000.
- The first pass reached −1,505. Two External review passes then found guard clauses that pass had dropped, all of them hardening under the CORE-657 filter: the scripts' write bounds and local-commit bound, the never-a-validator clause, the visualizer's not-a-query-API tie, the CI-hooks routing, and the property-test gap criterion. Restoring them, plus pass three's carve-out forward-reference, cost +459. The `.N` re-measure should take −1,046 as this child's figure, not the ~1,800 estimate or CORE-856's ~3 KB.
- Cap lowered 49,000 → 48,000, the cut rounded to the nearest 100 (the rounding is recorded in the cap-history row). Headroom 4,228 ≈ 2 working units, matching the row's sizing rationale.
- PLAN target updated to ~1,000 and the test strategy to "short paragraph". The Resolved-scoping "~1.8 KB" was the pre-implementation estimate.
- `step-7.1-mirror-pairs.md:92`: the CORE-558.5 rule restated as "a pointer added without a matching cut", naming §"What is Flaitron"'s pointer as one that replaced prose. Pass two had objected to narrowing the rule and pass three to rule-plus-exception; this wording states what the rule protects, which is the budget.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: contract prose, no executable surface; the acceptance greps are the targeted checks

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (`pair_q` citations resolve, `context_budget` green at the new 48,000 cap)

- [x] **Verification receipt** — receipt below. No duplication added: the trace is a labeled summary of `SPEC/scope-boundaries.md`, which stays canonical. No dead pointers, and no heading added or removed.

- [x] **External review** — three `/code-review medium` passes on the working-tree diff (no commits made this run). Pass 1 and pass 2 each returned blockers, so Phase 2 reopened and Phase 3 re-ran from the top each time. Pass 3 returned notes only. Dispositions below

- [x] (frontend) `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after pass-3 note fixes):

- A1 `diff <(git show HEAD:SPEC.md | grep '^#') <(grep '^#' SPEC.md)` → 0, no output
- A2 `test $(wc -c < SPEC.md) -le 43818` → 0 (43,772)
- A3 per-term loop over §"What flaitron does NOT provide" → no `MISS`
- A4 `… | grep -cE '^[1-5]\. \*\*'` → 5
- A5 `… | grep -q 'docs/VISION.md'` → 0
- A6 validator + full-validation greps → 0; paragraph 439 B (≤450)
- A7 `git diff -U0 SPEC.md | grep '^@@'` → five hunks, all inside the four passages (L9, L20, L452, L759-782); §"Cross-repo edit remit" / §"Loop tasks" untouched
- A8 `grep -c 'CORE-857.6' docs/CONTEXT-BUDGET.md` → 1 (cap-history row); cap row reads 48,000
- A9 `bash tools/drift-checks.sh` → 0
- Pair K2 snippet from `step-7.1-mirror-pairs.md` → no output

External review dispositions:

| pass | finding | rung | disposition |
|---|---|---|---|
| 1 | carve-outs' write bounds dropped | blocker | restored (updater writes only what `/ft-update` writes; installer commits nothing, refuses once PLAN.md exists) |
| 1 | "wanting any of these" pointed at the carve-outs, not the omissions | blocker | fixed: the helper sentence now follows the omission list |
| 1 | never-a-schema/validator clause dropped from test strategy | blocker | restored |
| 1 | step-7.1:92 contradicted by the new VISION pointer | note | fixed (final wording from pass 3) |
| 1 | #2 points at a carve-out list that also includes the visualizer | note | no change: #2 pointed there before this diff, and scope-boundaries.md excludes drift-checks.sh from the carve-outs |
| 1 | PLAN target ~1,800 ≠ actual | note | fixed: PLAN now ~1,000 |
| 1 | carve-out links became code spans | note | restored links |
| 1 | unwrapped one-line paragraph | note | fixed (wrapped) |
| 2 | visualizer listed as a carve-out with no tie to the query-API omission | blocker | restored "a single global instance, not a cross-project query API" |
| 2 | updater lost its local-commit bound | blocker | restored "commits it locally" |
| 2 | "Anything more is over-engineering" dropped from #2 | note | no change: the "Zero scripts" label states the rule; the sentence was emphasis |
| 2 | justification parentheticals dropped | note | CI-hooks routing restored; the rest is bucket-C rationale, kept out under the operator's compact-trace choice |
| 2 | PLAN "one line" vs paragraph | note | fixed: "short paragraph" |
| 2 | cap −1,200 ≠ cut | note | fixed: rounding recorded in the history row |
| 2 | step-7.1 narrowed CORE-558.5's claim | note | fixed (final wording from pass 3) |
| 2 | property-test gap criterion dropped | note | restored |
| 2 | HARNESS-SURVEY still says −~3 KB | note | no change: a dated survey record; the re-scope is on record in the PLAN line and this note |
| 3 | A6 command said ≤400, prose ≤450 | note | fixed |
| 3 | 110-col line | note | reflowed |
| 3 | "the judgment" had nothing to refer to | note | "removes this choice" |
| 3 | "no CLI" stated before its exceptions | note | "(bar the carve-outs below)" |
| 3 | parentheticals; installer positive bounds; three-vs-two carve-out count; survey | note | no change: the first and last were already declined; the installer's negative bounds are the guard; scope-boundaries.md L66 itself names three carve-outs |
| 3 | step-7.1 rule-plus-exception | note | restated as "a pointer added without a matching cut" |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` **changed** (the deliverable). `docs/VISION.md` no change: L19 "Recap of SPEC.md §Core principles … contract version is canonical" still holds, and it already carries the identity prose cut from §"What is Flaitron". `docs/CONVENTIONS.md` no change: #3/#5 citations resolve to the same labels and meaning. `docs/EXTERNAL-AGENTS.md` no change: no heading moved, and the #3 citation holds. `docs/MIGRATION.md` no change: L544 cites §"Core principles", still present. `README.md` no change: cites `SPEC/scope-boundaries.md`, unedited. `AGENTS.md`, the four `*/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`: no change, none cites the four passages. 17 no change, 1 changed.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-01.` stub nested under CORE-EPIC-857, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A` for the always-loaded layer. For `.N`: compacting an always-loaded guard section needs its guard clauses listed as acceptance terms before cutting. Two review passes here found clauses the first cut had dropped.

**Final Summary:**

Cut 1,046 B of rationale from always-loaded `SPEC.md` without moving a heading, and lowered its budget cap 49,000 → 48,000. Re-scoped from ≥3,000 B: CORE-558.2 keeps the omission list always-loaded as rules that fire unprompted, and VISION.md defers to SPEC's principles as canonical.

- `SPEC.md` 44,818 → 43,772. §"What is Flaitron" became two sentences plus a `docs/VISION.md` pointer. §"Core principles" kept all five numbered labels with shorter glosses. The test-strategy paragraph became a short paragraph that keeps the never-a-validator and `--unattended` rules. §"What flaitron does NOT provide" became a compact trace: the five omissions, three carve-outs with their write bounds, "not precedents", and the canonical pointer.
- `docs/CONTEXT-BUDGET.md`: cap 49,000 → 48,000, with the cap-history step and its rounding recorded.
- `claude/skills/ft-release/step-7.1-mirror-pairs.md:92`: the CORE-558.5 rule restated as "a pointer added without a matching cut", so the new VISION pointer does not contradict it.
- `.flaitron/PLAN.md`: Re-scope rewrite (target ~1,000 B, short paragraph), then the closure stub.
- Verification: nine acceptance commands and `bash tools/drift-checks.sh` → 0; three External review passes (two returned blockers, the third notes only), dispositions in Testing Notes.
- `touches:` reconciliation: `git diff --name-only` = `SPEC.md`, `docs/CONTEXT-BUDGET.md`, `.flaitron/PLAN.md`, `claude/skills/ft-release/step-7.1-mirror-pairs.md`, plus this note: matches the declared set (step-7.1 added at the pass-1 fix).
- Maintainability: per-task cold start −1,046 B on every runner. `.N` should record this child's −1,046 against CORE-856's ~3 KB estimate. The gap is the guard clauses the CORE-657 filter keeps.

**Archived:** 2026-11-01
