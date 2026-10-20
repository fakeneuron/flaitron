---
title: model-routing-calibration
status: completed
tags: [model-routing]
created: 2026-10-20
due:
touches:
  - SPEC/model.md
  - docs/PLATFORMS.md
  - SPEC/post-closure.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-audit-repo/SKILL.md
  - docs/AGENT-NEUTRALITY.md
  - SPEC.md
  - docs/GLOSSARY.md
related-tasks:
  - CORE-741.2
---

# CORE-814 | model-routing-calibration

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-10-20 · 🔗 [[CORE-741.2]]

## 🎯 Goal

Stop automated choosers over-escalating `[model]` tags: qualify the `[frontier]` triggers by decision-left-open and hard-to-unwind rather than topic, add the three graded sample rows as worked calibration cases, and reconcile the `docs/PLATFORMS.md` tier × platform map cells and the effort upper-end printing rule with the roster bands.

## ✅ Acceptance

- [x] `SPEC/model.md` §"When to choose `[frontier]`" gates the two topic triggers (contract/architecture design, high blast radius) on both qualifiers — decision still open at filing **and** a wrong answer hard to unwind — with the stated-decision and split-it-off escapes; heavy-epic Discovery and deep research unchanged — `grep -q 'hard to unwind' SPEC/model.md && grep -q 'still open' SPEC/model.md`
- [x] Three worked calibration cases (frontier ✓ / heavy-with-split / medium) sit beside the triggers, described by shape, not by foreign repo IDs — `grep -c 'Worked cases' SPEC/model.md` → 1
- [x] `docs/PLATFORMS.md` Claude Code `[medium]` cell is `Sonnet @ high (alt Opus @ medium)`; one prose line states why `[light]` still sits a rung above its band — `grep -q 'Sonnet @ high (alt Opus @ medium)' docs/PLATFORMS.md`
- [x] Printing a cell takes the vendor default when the range contains it, else the range's lower end; "upper end" no longer the rule in either doc — `! grep -n 'upper end' SPEC/model.md docs/PLATFORMS.md`
- [x] Every restatement of a changed pick follows the new rule (post-closure example, step-1.5 edge note, AGENT-NEUTRALITY rows) — `! grep -rn 'Opus @ medium\b\|Fable @ xhigh (change' SPEC/post-closure.md claude/skills/ft-task/step-1.5-model-edge.md` + `judgment` on AGENT-NEUTRALITY wording
- [x] `/ft-audit-repo`'s `[frontier]` example no longer teaches topic matching — `! grep -q 'e.g. a security or migration finding)' claude/skills/ft-audit-repo/SKILL.md`
- [x] The trigger mirrors in `SPEC.md` §"Model field" and `docs/GLOSSARY.md` `[model]` carry the qualifier — `grep -q 'still open and' SPEC.md && grep -q 'still open and hard to unwind' docs/GLOSSARY.md`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `SPEC/model.md` §"When to choose `[frontier]`": qualify topic triggers + worked cases
- [x] `SPEC/model.md` §"Effort recommendations": reliability bullet + "Printing a cell" → vendor-default-in-range
- [x] `docs/PLATFORMS.md` §"Tier × platform map": `[medium]` Claude cell, prose on the remaining rung-up and the printing rule
- [x] Restatements: `SPEC/post-closure.md` step-2 example, `step-1.5-model-edge.md` example note, `docs/AGENT-NEUTRALITY.md` rows, `ft-audit-repo` example
- [x] Run drift checks

## 🔗 Related

- [[CORE-741.2]] — introduced the `[frontier]` rung and its trigger list (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three stacked round-ups the starter names are present as described; CORE-741.N already recorded the contract-work over-reach as a known weak spot. No open `[frontier]` row in this PLAN to reconcile.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — `N/A`: contract prose, no code or module boundary. Single-source note: the rule stays in `SPEC/model.md`, cells in `docs/PLATFORMS.md`; restatements only re-quote picks.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Starter absorbed** (default). Substance: three cross-repo rows filed all-`[frontier]` by a Codex session graded 1 of 3 correct — auth-migration scoping ✓ frontier; JWT-verifier pin → heavy (rejection tests catch the silent failure; only "assess legacy-fallback removal" is hard to unwind — split it); API-origin topology → medium (decision stated in the row; recipe prose + one wording edit; matched "architecture" by topic). Cause: three stacked round-ups (topic triggers, map cells a rung up, upper-end effort printing).
- **Drift check:** all cited sections exist as described (`SPEC/model.md:235-248` triggers, `:159-188` effort, `:199-207` round-up; `docs/PLATFORMS.md:437-460` map). Codex wrappers carry no model wording — they route to canonical bodies, so wrapper wording is not a cause. Chooser skills (`ft-file-task`, `ft-open-epic`, `ft-audit`, `ft-refactor`) cite the section by name without paraphrase; `ft-audit-repo/SKILL.md:78` adds "(e.g. a security or migration finding)" — a topic example, in scope. Restatements of changed picks: `SPEC/post-closure.md:41` (`Opus @ medium`), `step-1.5-model-edge.md:22,24` (`Fable @ xhigh`), `docs/AGENT-NEUTRALITY.md:53-54`. Neither target file is budgeted (`docs/CONTEXT-BUDGET.md` — PLATFORMS exempt by name; model.md lazy, unlisted).
- **Archive skim** (probe over CORE-741.1–.5/.N, 766, 812.1): trigger list is operator-set (CORE-741.1 Q5); map cells operator-set with no rung-up rationale beyond the reliability bias (Q10; CORE-741.3 review kept Claude `[medium]`=Opus as "overkill harmless"); upper-end printing from CORE-741.2 reconciling Q6 and CORE-741.4 Q2. "Unwind"/"still open" never discussed. CORE-741.N:110 flagged the over-reach and suggested a sharpener. CORE-766 / CORE-812.1 only applied the triggers.
- **Clarifications (operator, AskUserQuestion):** (1) qualifiers apply to the topic triggers only — heavy-epic Discovery and deep research are shape-defined, unchanged; (2) lower Claude `[medium]` to `Sonnet @ high (alt Opus @ medium)`, keep `[light]` at Sonnet (Haiku not in the verified roster) with a prose line; (3) printing takes the vendor default when in range, else the range's lower end. These revise CORE-741.1 Q10 and CORE-741.4 Q2 — operator decision, recorded here.
- **Assumption:** worked cases in SPEC are described by shape, without the foreign repo IDs (SPEC ships to adopters; provenance lives in this note).
- Printed picks under the new rule: Claude `[light]` Sonnet @ high (default high), `[medium]` Sonnet @ high, `[frontier]` Fable @ high (default high); Codex `[light]` Sol @ medium (default medium); Grok `[light]` Grok @ high (default high). Single-value cells unchanged.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing trigger list (new gate bullet beside the "Not a trigger" bullet) and the existing map/prose; worked cases follow the bold-label + bullets shape used throughout §"Practical guidance"

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract prose; verify greps + drift checks cover it

**Implementation Notes:**

- `SPEC/model.md`: topic-trigger gate bullet (still open **and** hard to unwind; stated-decision and split escapes); blast-radius bullet's own "expensive to unwind" folded into the gate; "Not a trigger" now says grade on the rungs below (not a flat `[heavy]`); three worked cases; reliability bullet rewritten as floor + no second round-up; "Printing a cell" → vendor default in range, else lower end, defaults sourced from PLATFORMS §"Family roster".
- `docs/PLATFORMS.md`: Claude `[medium]` → `Sonnet @ high (alt Opus @ medium)`; prose on band-matching, the `[light]` exception, and the `[light]`/`[medium]` same-pick consequence on Claude Code and Grok Build.
- Restatements: `SPEC/post-closure.md` example pick, `step-1.5-model-edge.md` (two `Fable @ xhigh` → `@ high`), `ft-audit-repo` example, `docs/AGENT-NEUTRALITY.md` rows; doc-drift mirrors `SPEC.md` §"Model field" and `docs/GLOSSARY.md` `[model]`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (markdown-only diff; no viz/tools code touched)

- [x] Ran lint/type-check on changed code — `N/A`: no code changed

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) `N/A` — no frontend change. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (re-run after the review blockers):

- A1 `grep -q 'hard to unwind' SPEC/model.md && grep -q 'still open' SPEC/model.md` → 0
- A2 `grep -c 'Worked cases' SPEC/model.md` → 1
- A3 `grep -q 'Sonnet @ high (alt Opus @ medium)' docs/PLATFORMS.md` → 0
- A4 `! grep -n 'upper end' SPEC/model.md docs/PLATFORMS.md` → 0
- A5 `! grep -rn 'Opus @ medium\b\|Fable @ xhigh' SPEC/post-closure.md claude/skills/ft-task/step-1.5-model-edge.md` → 0; AGENT-NEUTRALITY wording `judgment` — rows name CORE-814's changes, historical `Fable @ xhigh` kept as "until CORE-814"
- A6 `! grep -q 'e.g. a security or migration finding)' claude/skills/ft-audit-repo/SKILL.md` → 0
- A7 `grep -q 'still open and' SPEC.md && grep -q 'still open and hard to unwind' docs/GLOSSARY.md` → 0
- A8 `bash tools/drift-checks.sh` → 0 (context_budget ok; SPEC.md 43,366 / 49,000; post-closure 9,603 / 10,000)
- Structural: no duplication (blast-radius "expensive to unwind" folded into the gate), no stale docs (mirrors swept).

External review round 1 (`/code-review medium`, working-tree diff), 8 findings:

1. **blocker** — "topic match alone stays `[heavy]`" contradicted the `[medium]` worked case → fixed: grade on the rungs below.
2. **note** — `[light]`/`[medium]` print the same pick on Claude Code + Grok → fixed: documented as the intended consequence of the effort floor (changing it would break the floor or need a light-band roster row, out of scope).
3. **blocker** — vendor defaults are not in map cells, which "Printing a cell" needs → fixed: the rule and the map prose point at §"Family roster".
4. **note** — reliability bullet argued round-up while forbidding it → fixed: rewritten as floor + no second round-up.
5. **note** — duplicate "expensive to unwind" on blast radius → fixed: folded into the gate.
6. **note** — `touches:` missed SPEC.md / GLOSSARY → fixed.
7. **note** — Acceptance didn't cover the mirrors → fixed: A7 added.
8. **note** — AGENT-NEUTRALITY stale `Fable @ xhigh` literal → fixed.

External review round 2 (re-run after the blockers), 5 findings, all **notes** (no Acceptance criterion fails):

1. "one exception" prose overlooked effort-shifted cells (`Grok @ xhigh`, `Astra @ xhigh`) → fixed: cells reach their tier by band or roster effort shift.
2. "No second round-up" readable as lowering single-value cells → fixed: single-value effort is part of the cell, printed as written.
3. `Opus @ medium` alternate sits below the Opus 5 default (`high`) → skipped: the cell was `Opus @ medium` as primary before this task, and the map carries Opus 5.5 (default `medium`) verification.
4. post-closure doesn't mention the `[light]`/`[medium]` same pick → no change: its examples show `[heavy]`/`[medium]`; PLATFORMS prose owns the explanation.
5. Other filers' pointers lack the qualifier; ft-audit-repo's inline copy can drift → fixed for ft-audit-repo by dropping its example to a bare pointer like its siblings. The rest stays single-sourced in `SPEC/model.md`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` §"Model field" frontier bullet + `docs/GLOSSARY.md` `[model]` (mirrored the qualifier); `docs/AGENT-NEUTRALITY.md` rows + `docs/PLATFORMS.md` updated; README.md, AGENTS.md, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION — no change (no trigger, cell, or printing-rule text)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the rule lives in `SPEC/model.md`, mirrored in `SPEC.md`

**Final Summary:**

The `[frontier]` topic triggers (contract/architecture design, high blast radius) now fire only when the decision is still open at filing **and** a wrong answer is hard to unwind. They come with stated-decision and split-it-off escapes and three worked cases (frontier / heavy-with-split / medium). The Claude `[medium]` map cell is now Sonnet @ high, matching its band. Printing a cell takes the vendor default inside a range rather than the top, so effort no longer rounds up a second time on top of the tier. The operator revised CORE-741.1 Q10 and CORE-741.4 Q2 (Discovery Notes).

- **Changed:** `SPEC/model.md`, `docs/PLATFORMS.md`, `SPEC.md`, `docs/GLOSSARY.md`, `SPEC/post-closure.md`, `claude/skills/ft-task/step-1.5-model-edge.md`, `claude/skills/ft-audit-repo/SKILL.md`, `docs/AGENT-NEUTRALITY.md`.
- **Verification:** A1–A8 → 0. Drift checks pass, budgets included. Two review rounds: 2 blockers and 11 notes, all fixed or dispositioned in Testing Notes.
- **Refactors:** none. **Doc verdict:** mirrors swept (see Doc-drift sweep).
- **`touches:` reconciliation:** declared = actual (SPEC.md and GLOSSARY added mid-run when the doc-drift sweep reached them).
- **Maintainability:** the qualifier is single-sourced in `SPEC/model.md`. The always-loaded mirrors carry a one-clause summary, and ft-audit-repo's paraphrase is gone.

**Archived:** 2026-10-20
