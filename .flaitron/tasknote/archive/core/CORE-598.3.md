---
title: handoff-token-ratify
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: [CORE-EPIC-598, CORE-598.1, CORE-598.2, CORE-598.4, CORE-EPIC-577, CORE-565.3, CORE-494]
touches:
  - SPEC.md
  - SPEC/plan-parser.md
  - SPEC/unattended-candidacy.md
  - SPEC/scope-boundaries.md
  - SPEC/procedures/ft-task.md
  - docs/EXTERNAL-AGENTS.md
  - docs/VISION.md
  - docs/GLOSSARY.md
  - templates/PLAN.md
  - claude/skills/ft-task/SKILL.md
  - viz/src/parser.ts
  - viz/src/parser.test.ts
  - viz/src/**/*.test.ts*
blocked-by:
  - CORE-598.2
---

# CORE-598.3 | handoff-token-ratify

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-598]] [[CORE-598.2]] [[CORE-598.4]]

## 🎯 Goal

Ratify `[handoff]` as the second canonical trailing token on PLAN.md task lines — SPEC grammar, `viz/src/parser.ts` capture, candidacy predicate clause 3 reading it as definitive, and a stable-surface row for callers — and record in `docs/VISION.md` that a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing.

## ✅ Acceptance

- [x] `SPEC.md` §"Task-line format" carries `[handoff]` in the grammar line, a segment-table row (what it declares, after `[model]`, operator-seeded, changes nothing on an attended run, wins over `[unattended]`), and an example row — `grep -q '\[handoff\]' SPEC.md && grep -q 'model\] \[unattended\] \[handoff\]' SPEC.md`
- [x] `SPEC/plan-parser.md` names `[handoff]` as the second captured member of the trailing run and extends both mis-authoring footguns to it — `grep -c '\[handoff\]' SPEC/plan-parser.md` ≥ 3
- [x] `SPEC/unattended-candidacy.md` clause 3 reads `[handoff]` on the drafted row as definitive (never a candidate), keyword screen kept as the fallback for unmarked rows — `grep -q '\[handoff\]' SPEC/unattended-candidacy.md`
- [x] `viz/src/parser.ts` captures `Task.handoff: boolean` from the trailing run; tests pin capture, both-tokens, `[!handoff]` whole-line failure, pre-`[model]` capture-as-model, and `false` on unmarked rows — `npm --prefix viz test → 0` · `npm --prefix viz run typecheck → 0` · `npm --prefix viz run lint → 0`
- [x] `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers": trailing-run row names two canonical members, a `[handoff]` row is added, and the "Out of contract" bullet excludes both — `grep -c '\[handoff\]' docs/EXTERNAL-AGENTS.md` ≥ 3
- [x] `docs/VISION.md` §"What we won't accept" → "Abstractions without two-project precedent" records the bounded carve-out: a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing; `SPEC/scope-boundaries.md`'s terse mirror carries the same clause — `grep -q 'out-of-repo consumer' docs/VISION.md && grep -q 'out-of-repo consumer' SPEC/scope-boundaries.md`
- [x] Candidacy *proposals* untouched — `git diff --stat` shows no edit to `claude/skills/ft-file-followup/`, `ft-epic-discovery/`, `ft-audit*/`, `ft-refactor/` and no edit to `SPEC/unattended-candidacy.md` §"Three postures" / §"Surfaces and mirrors"
- [x] No adopter ID in contract prose — `grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md templates --exclude=VERSION-HISTORY.md` → no hits
- [x] Budgeted surfaces under cap — `wc -c SPEC.md` ≤ 57,000 · `wc -c claude/skills/ft-task/SKILL.md` ≤ 33,000
- [x] Grammar-line mirrors agree — every literal `[!critical] [model] [unattended]` grammar line outside archives (`SPEC.md`, `templates/PLAN.md`, `viz/src/parser.ts`, `claude/skills/ft-task/SKILL.md`) reads `[!critical] [model] [unattended] [handoff]` — `grep -rn 'model\] \[unattended\] |' SPEC.md templates viz/src/parser.ts claude/skills/ft-task/SKILL.md` → no hits

## 🧩 Subtasks

- [x] `viz/src/parser.ts`: add `handoff: boolean` to `Task`, `HANDOFF_MARKER`, set it from `trailingTokens`; update the grammar comment + TRAILING_TOKENS comment
- [x] `viz/src/parser.test.ts`: fixture `handoff: false`; five new `it` blocks mirroring the CORE-494 `[unattended]` set
- [x] Other test fixtures constructing a `Task` literal: add `handoff: false` (typecheck-driven)
- [x] `SPEC.md` §"Task-line format": grammar line, ordering sentence, segment-table row, example row
- [x] `SPEC/plan-parser.md`: stacked-tokens bullet + both footguns cover `[handoff]`
- [x] `SPEC/unattended-candidacy.md`: clause 3 gains the definitive-token sentence
- [x] `docs/EXTERNAL-AGENTS.md`: trailing-run row, new `[handoff]` row, out-of-contract bullet
- [x] `docs/VISION.md` + `SPEC/scope-boundaries.md`: the carve-out clause
- [x] `docs/GLOSSARY.md`: `[handoff]` entry + grammar-elements list
- [x] `templates/PLAN.md`, `claude/skills/ft-task/SKILL.md`, `SPEC/procedures/ft-task.md`: grammar-line mirrors
- [x] Phase 3: `npm --prefix viz test` / `typecheck` / `lint`; grep receipts; budgets
- [x] Phase 4: doc-drift sweep, PLAN stub (nested under the epic), archive

## 🔗 Related

- [[CORE-EPIC-598]] — parent epic (flowtron-caobunga-concert)
- [[CORE-598.1]] — Discovery; §F Q2 resolved the `[handoff]` question and stated the VISION principle this task records
- [[CORE-598.2]] — blocked-by: declared the caller-write boundary; its `docs/EXTERNAL-AGENTS.md` stable-surface rows are the table this task's `[handoff]` row joins
- [[CORE-598.4]] — follow-up; the CBN rows cite the release carrying `.2` + `.3`
- [[CORE-EPIC-577]] — `[unattended]` candidacy; clause 3 of its predicate is what gains the `[handoff]` short-circuit
- [[CORE-565.3]] — first declared the stable caller surfaces; adopter IDs stay out of SPEC prose

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` closed this morning, so the sequential predecessor is clear. The token is unratified at HEAD (`grep '\[handoff\]'` over SPEC / docs / viz → 0 hits outside this note), the one real consumer reads it today by name from the same trailing run flowtron already captures, and the operator settled the standalone-cost question in `.1` §F Q2. Nothing in the PLAN line has moved.

- [x] Read relevant source files — `SPEC.md` §"Task-line format" (whole), `SPEC/plan-parser.md` (whole), `SPEC/unattended-candidacy.md` (whole), `SPEC/versioning.md` (bump classes), `SPEC/scope-boundaries.md:52`, `SPEC/procedures/ft-task.md:128-150`, `docs/EXTERNAL-AGENTS.md` (whole), `docs/VISION.md` (whole), `docs/GLOSSARY.md:75,143`, `docs/CONTEXT-BUDGET.md` (budgets table), `templates/PLAN.md:10-40`, `claude/skills/ft-task/SKILL.md:52`, `viz/src/parser.ts:1-145,365-414`, `viz/src/parser.test.ts:268-345`, `viz/src/ui/UnattendedChip.tsx`, `viz/src/ui/TaskRowInner.tsx:96-103`. Operator-approved this session, read-only: `~/Code/caobunga/docs/CONTRACT.md:1057-1061,1094` and `backend/caobunga/flowtron/grammar.py:20-45`.

- [x] **Best Practices Review** — one code boundary: `viz/src/parser.ts` owns the grammar; UI and tests consume `Task`. The change extends the existing `TRAILING_TOKENS` membership pattern (CORE-494) — a second named marker constant and a second boolean, no regex move. `Task.handoff` is made **required** like `Task.unattended`, so fixtures gain one line each (CORE-494 needed eight; typecheck finds them). No refactor; a viz chip for the token is deferred (Notes §E).

- [x] **Archive skim** — `touches:` grep over `archive/core/`: `parser.ts` 70 hits, `unattended-candidacy.md` 12, `plan-parser.md` 10, `VISION.md` 114, `EXTERNAL-AGENTS.md` 200. Read directly (no probe — the load-bearing set is known from `.1` §D): [[CORE-494]] (promoted `[unattended]` from tolerance to captured grammar; the exact shape this task repeats), [[CORE-577.1]] / [[CORE-577.2]] (candidacy predicate design; clause 3 keyword screen was chosen as a *screen, not a semantic judgment*), [[CORE-565.3]] (declared the stable surfaces — the trailing-run row and the out-of-contract bullet both say `[unattended]` is the *one* canonical member, which this task changes), [[CORE-598.1]] §B#5 / §F Q2, [[CORE-598.2]] (recap: adopter-ID grep is a standing acceptance line). Findings in Notes §A–§D.

- [x] **Drift check** — every path in the PLAN line resolves: `SPEC.md` §"Task-line format" (`:70-124`), `viz/src/parser.ts` capture (`:123,143,405`), candidacy clause 3 (`SPEC/unattended-candidacy.md:57-62`), stable-surface table (`docs/EXTERNAL-AGENTS.md:85-97`), `docs/VISION.md` two-project rule (`:36`). Cross-artifact: the plan contradicts no SPEC contract — `[unattended]`'s "flowtron never writes it" stays verbatim and `[handoff]` adopts the same rule; the stable-surface rows change *additively* (a second canonical member), which `SPEC/versioning.md` classes as **Minor** for the next release. Matches the PLAN line; no Re-scope.

- [x] Asked clarifying questions — one AskUserQuestion round, three answers: (1) approve reading caobunga's `[handoff]` section + `grammar.py` this session → **yes** (read; semantics in Notes §A); (2) writer policy → **operator-seeded only, like `[unattended]`**; (3) a row carrying both tokens → **mis-authored, `[handoff]` wins** (parser captures both; readers deny operator-less dispatch). Assumptions carried: the grammar line lists both tokens even though at most one belongs on a row — the segment table says so; no runner behaviour changes (`[handoff]` implies nothing on an attended run); no viz chip in this task.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. What `[handoff]` declares (from the one real consumer, read this session)

Three orthogonal row facts, grammar for two of them until now: `Blocked by [[ID]]` answers *may this start* (clears when the named task closes); `[unattended]` answers *may this run headless* (absent = undecided). Neither answers the third — **will this stop mid-run for a human act that is not another task**: a scoped cross-repo filing prompt, a physical-access step, a credential. Not a dependency (nothing upstream completes to release it), not an absent opt-in (no seeding makes it dispatchable) — a durable property of the work, known at filing time. The consumer: denies operator-less dispatch on it **even when `[unattended]` is also present** (the mis-seed case it measured live); never denies on an attended read (with an operator present the hand-off is simply the work); never writes it (marking is an operator act on the same footing as seeding `[unattended]`); reads it from the trailing run by name with no regex change — exactly the CORE-494 shape.

### B. What changes on flowtron's side, and what does not

- **Grammar** — `[handoff]` becomes the second captured member of `TRAILING_TOKENS`; every other lowercase trailing token stays a dropped tolerance. Both `[unattended]` footguns transfer verbatim (`[!handoff]` fails the line; `[handoff]` before / without `[model]` is captured as the model).
- **Candidacy clause 3** — today a keyword screen (*hand-off* / *handoff* among the words). The token makes the screen's *subject* explicit: a drafted row already carrying `[handoff]` is definitively not a candidate; the keyword screen stays as the conservative fallback for unmarked rows. No proposal surface changes; `[handoff]` is never proposed (`.1` §F Q2: candidacy proposals stay as-is).
- **Stable surfaces** — the trailing-run row and the out-of-contract bullet currently say `[unattended]` is the *one* canonical member. Additive change → a versioned (Minor) release, as [[CORE-565.3]]'s table demands; `.4`'s CBN rows cite that release.
- **Runners** — nothing. `[unattended]` implies `--fast` on an attended run; `[handoff]` implies nothing. `/ft-task` Step 1 needs no new capture; only the grammar-line mirror in `SKILL.md:52` updates.

### C. The VISION principle

VISION §"What we won't accept" → "Abstractions without two-project precedent" is what the consumer's own filing (`.1` §B#5) cited to *de-scope* the upstream ratification. The operator's answer (`.1` §F Q2) states the carve-out: a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing. It lands as a sentence inside that bullet (the rule keeps its subject — *abstractions* — and gains a bounded exception for *declared surfaces*), with the terse mirror in `SPEC/scope-boundaries.md:52` carrying the same clause so Pair K's citation check stays symmetric. `[handoff]` and the `[unattended]` candidacy proposals are the two instances.

### D. Budgets and mirrors

`SPEC.md` 51,918 / 57,000 (≈5,000 headroom; this task adds ≈700). `claude/skills/ft-task/SKILL.md` 28,192 / 33,000. `templates/PLAN.md` is measured but not capped. Literal grammar-line mirrors outside archives: `SPEC.md:75`, `templates/PLAN.md:13`, `viz/src/parser.ts:63`, `claude/skills/ft-task/SKILL.md:52` — all four update. `claude/skills/ft-audit-context/SKILL.md:108` is a *ticket format* for a filer that proposes `[unattended]`; it is not the grammar reference and `[handoff]` is never filer-written, so it stays.

### E. Deferred (not filed — operator's call)

A viz chip for `[handoff]` (FE-118 added `UnattendedChip` for `[unattended]` separately from CORE-494's capture). Not named by the PLAN line; the parser field lands now so a chip is a one-component follow-up if wanted.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-494]]'s shape exactly: a second named marker constant beside `UNATTENDED_MARKER`, a second required boolean on `Task`, membership tested against the already-captured `TRAILING_TOKENS` run — no regex move. Contract edits extend each existing `[unattended]` sentence to cover both markers rather than adding parallel paragraphs; the VISION principle lands inside the bullet whose rule it bounds.

- [x] **Minimal refactor gate** — `N/A` — no refactor; the one structural choice (required vs optional `handoff`) follows `unattended` for symmetry, at the cost of one fixture line in seven test files.

- [x] Implemented the minimal solution — 18 files, +142 / −48 (`git diff --stat`).

- [x] Updated/added tests for non-trivial behavior — five `it` blocks in `viz/src/parser.test.ts` mirroring the CORE-494 `[unattended]` set: capture after `[model]`, both markers in either order (with a glyph), `false` on unmarked rows, `[!handoff]` whole-line failure + diagnostic, pre-`[model]` / model-less capture-as-model.

**Implementation Notes:**

- **Parser** (`viz/src/parser.ts`): `Task.handoff: boolean` (required, like `unattended`); `HANDOFF_MARKER = /\[handoff\]/`; `handoff: HANDOFF_MARKER.test(trailingTokens ?? '')`; grammar comment and `TRAILING_TOKENS` comment now name two canonical members and both footguns. Seven fixture files gained `handoff: false` (typecheck found every one).
- **`SPEC.md`** §"Task-line format": grammar line, ordering sentence ("the two trailing markers AFTER it, in either order; at most one belongs on a row"), a `[handoff]` segment-table row carrying the consumer's exact semantics (stop mid-run for a human act that is not another task · not a dependency, not an absent opt-in · declines even with `[unattended]`, `[handoff]` wins · attended run unchanged · flowtron never writes it, no filer proposes it · `Task.handoff`), a `DEPLOY-012` example row, and the plan-parser pointer. 51,918 → 53,007 / 57,000.
- **`SPEC/plan-parser.md`**: stacked-tokens bullet names both captured members; the footgun section is retitled for both markers with `[!handoff]` and `model: 'handoff'` spelled out; a closing paragraph says a both-markers row parses with both booleans and points at SPEC.md for which one wins.
- **`SPEC/unattended-candidacy.md`** clause 3: `[handoff]` on the drafted row is definitive (never a candidate, nothing further consulted); the keyword screen is now explicitly the fallback for unmarked rows; candidacy never proposes `[handoff]`. §"Three postures" / §"Surfaces and mirrors" untouched — Pair N replayed locally → 0.
- **`docs/EXTERNAL-AGENTS.md`**: trailing-run row → "two canonical members"; new `[handoff]` marker row; out-of-contract bullet excludes both. `.4`'s CBN rows cite the release carrying this (Minor per `SPEC/versioning.md`).
- **`docs/VISION.md`** → "Abstractions without two-project precedent": the bounded exception in one sentence group — a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing (no gate, no runner behaviour, no flowtron-performed write; a non-using project sees the contract as before); `[handoff]` and the candidacy proposals named as the instances; "the test is the standalone cost, not the consumer count." `SPEC/scope-boundaries.md:52` carries the terse mirror pointing back.
- **Mirrors**: `templates/PLAN.md` (grammar line + two prose sentences), `claude/skills/ft-task/SKILL.md:52` (grammar line + "capture nothing from it"; 28,291 / 33,000), `SPEC/procedures/ft-task.md` (one sentence), `docs/GLOSSARY.md` (new `[handoff]` entry before `Handoff (🔄)`, grammar-elements list).
- **Not changed, deliberately**: `claude/skills/ft-audit-context/SKILL.md:108` (a filer's ticket format, and `[handoff]` is never filer-written); every filing skill body; `SPEC/gates.md` (`[handoff]` implies no posture); viz UI (chip deferred — Discovery §E).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- --run src/parser.test.ts` → 103 passed (5 new); then the full suite because `Task` is a shared type → 29 files / 561 passed.

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0.

- [x] **Verification receipt** — see Testing Notes. Structural: no duplication (one constant + one field + one assignment, same shape as its sibling), no dead code, no public-surface growth beyond the one declared `Task.handoff` field, code-facing comments updated in place.

- [x] (frontend) Asked the user for visual confirmation — `N/A` — no rendered surface changed (parser field only; no chip).

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
npm --prefix viz test -- --run src/parser.test.ts                              → 0   (103 passed)
npm --prefix viz test -- --run                                                 → 0   (29 files, 561 passed)
npm --prefix viz run typecheck                                                 → 0
npm --prefix viz run lint                                                      → 0
grep -q '\[handoff\]' SPEC.md && grep -q 'model\] \[unattended\] \[handoff\]' SPEC.md → 0
grep -c '\[handoff\]' SPEC/plan-parser.md                                      → 4   (≥ 3)
grep -q '\[handoff\]' SPEC/unattended-candidacy.md                             → 0
grep -c '\[handoff\]' docs/EXTERNAL-AGENTS.md                                  → 3   (≥ 3)
grep -q 'out-of-repo consumer' docs/VISION.md && … SPEC/scope-boundaries.md    → 0
git diff --stat  (no filing-skill paths; candidacy diff = one hunk @@ -54,12)  → ok
grep -rn -i 'caobunga\|CBN-' SPEC.md SPEC docs claude README.md templates …    → 1   (no hits — pass)
wc -c SPEC.md → 53,007 ≤ 57,000 · claude/skills/ft-task/SKILL.md → 28,291 ≤ 33,000
grep -rn 'model\] \[unattended\] |' SPEC.md templates viz/src/parser.ts claude/skills/ft-task/SKILL.md → 1 (no stale mirrors — pass)
CI replay: context-budget step → 0 · Pair N step → 0 · trailing-whitespace grep → 1 (none)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` — **updated** (deliverable: §"Task-line format") · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md` no change (none states the grammar) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change (flag tables, no row-marker claims) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` — **updated** (deliverable: two stable-surface rows + out-of-contract bullet) · `docs/WORKTREES.md` no change · `docs/VISION.md` — **updated** (deliverable: two-project carve-out). Also updated as deliverables outside the list: `SPEC/plan-parser.md`, `SPEC/unattended-candidacy.md`, `SPEC/scope-boundaries.md`, `SPEC/procedures/ft-task.md`, `docs/GLOSSARY.md`, `templates/PLAN.md`, `claude/skills/ft-task/SKILL.md`.

- [x] Closed — every Acceptance criterion ticked; YAML `status:` → `completed`; PLAN.md `.3` line flipped to stub form, kept nested under `CORE-EPIC-598` in `## High` (epic child placement invariant); tasknote moved to `.flowtron/tasknote/archive/core/`. No superseded-claim pointer: [[CORE-565.3]]'s "one canonical member" was true when written and is changed here, not falsified.

- [x] **Evidence-based recap** drafted — see Final Summary; surfaces inline on the 📦 conditional skip.

**Final Summary:**

`[handoff]` is canonical task-line grammar: the second captured member of the trailing bracket-token run, declaring that a row will stop mid-run for a human act that is not another task — not a dependency, not an absent opt-in, a durable property of the work. Flowtron's parser captures it into `Task.handoff`, the contract names it with the one real consumer's exact semantics (declines operator-less dispatch even beside `[unattended]`; attended runs unchanged; operator-written only, never proposed), the candidacy predicate reads it as definitive instead of keyword-guessing, and callers get a stable-surface row. `docs/VISION.md` now records why a one-consumer surface is admissible at all: a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing — the test is the standalone cost, not the consumer count.

- **Changed:** 18 files, +142 / −48. Contract: `SPEC.md` (+8 / −5; 53,007 / 57,000), `SPEC/plan-parser.md` (+17 / −10), `SPEC/unattended-candidacy.md` (+11 / −6, clause 3 only), `SPEC/scope-boundaries.md` (+1 / −1), `SPEC/procedures/ft-task.md` (+3 / −1). Docs: `docs/EXTERNAL-AGENTS.md` (+3 / −2), `docs/VISION.md` (+1 / −1), `docs/GLOSSARY.md` (+3 / −1). Mirrors: `templates/PLAN.md` (+8 / −4), `claude/skills/ft-task/SKILL.md` (+1 / −1). Code: `viz/src/parser.ts` (+24 / −17), `viz/src/parser.test.ts` (+55), six fixture files (+1 each).
- **Verification:** viz 561 / 561 (5 new parser tests), typecheck 0, lint 0; ten Acceptance grep receipts all pass; CI context-budget and Pair N steps replayed locally → 0; adopter-ID grep → no hits; no trailing whitespace.
- **Refactors:** none. `Task.handoff` made required for symmetry with `unattended`.
- **Documentation:** 3 AI-referenced docs updated as deliverables, 15 no change; 7 further contract / mirror files updated. Next release is **Minor** (`SPEC/versioning.md`: additive grammar + a changed stable-surface row); `.4`'s CBN rows cite it.
- **`touches:` reconciliation:** declared 13 entries (one glob), changed 18 paths — every changed path matches a declared entry; no undeclared paths (PLAN.md and this note excluded by construction).
- **Deferred (not filed — operator's call):** a viz chip for `[handoff]` beside `UnattendedChip` (Discovery §E).
- **Maintainability effect:** the consumer's reader and flowtron's parser now agree on two named markers with one upstream contract to cite, instead of one ratified token and one tolerated-and-dropped one that a future rewrite could silently strip; and the two-project rule has a written exception with a stated test, so the next orchestrator-facing surface is judged on standalone cost rather than re-litigated per token.

**Archived:** 2026-09-14
