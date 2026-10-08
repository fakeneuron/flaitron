---
title: effort-tiers discovery
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-EPIC-482]
touches:
  - .flaitron/PLAN.md
---

# CORE-741.1 | effort-tiers discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Scope the `CORE-EPIC-741` epic (`effort-tiers`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-741.2..5` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-741.2 .. CORE-741.5 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-741.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-741.2 .. CORE-741.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-741 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers)
- [[CORE-EPIC-482]] — predecessor: model-tier-recalibration (added the manual-only `[xheavy]`🔭 rung, the round-up default, and the effort axis)

## 🌳 Fan-out

- **Parallel:** [[CORE-741.5]] with [[CORE-741.3]] / [[CORE-741.4]] — viz parser/chip/fixtures are disjoint from the PLATFORMS table and the skill bodies (worktree-safe once .2 lands)
- **Sequential:** [[CORE-741.3]] after [[CORE-741.2]] · [[CORE-741.4]] after [[CORE-741.3]] · [[CORE-741.5]] after [[CORE-741.2]] — .2 fixes the rung, glyph, and triggers everything else cites; .4 prints the cells .3 writes
- **Synthesis:** [[CORE-741.N]] — cohort audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery` asking for more granular model/effort attribution: per-platform effort selectors (Claude low→max, Codex, Grok) are not expressed in routing today, top-tier models (Fable, Astra) are rarely suggested because they share the `heavy` band with Opus, and the operator wants a reliability-over-tokens bias plus extra glyphs for the split.

- [x] Read relevant source files — `SPEC/model.md` (whole), `docs/PLATFORMS.md` §"Platform×model×effort calibration table", `SPEC/post-closure.md` step 2-3 glyph print, `claude/skills/ft-task/preamble.md` §"Model gate", `SPEC/unattended-candidacy.md` clause 1, `docs/EXTERNAL-AGENTS.md` tier mentions; inventory grep below

- [x] **Best Practices Review** — N/A: pure PLAN filing, no code; the one boundary call (map in `docs/PLATFORMS.md`, rule in SPEC) is recorded below

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions — three AskUserQuestion rounds + child-tier review; see "Resolved scoping"

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Design surface inventory** (non-archive files naming the tier ladder / `xheavy` / effort axis):
- Contract: `SPEC/model.md` (ladder, xheavy manual-only, chooser cap at `[heavy]`, effort axis, round-up default, glyph mirror), `SPEC.md` (cue glossary), `SPEC/cue-vocabulary.md` (🔧/🧩/🧠/🔭 rows + fallback labels), `SPEC/gates.md`, `SPEC/post-closure.md` (step 2 glyph print, step 3 label line), `SPEC/plan-parser.md`, `SPEC/procedures/ft-task.md`, `SPEC/unattended-candidacy.md` clause 1 (light/medium only — `[frontier]` fails it by construction, no edit needed).
- Fixtures: `SPEC/fixtures/plan/markers.{md,json}`, `tolerances.{md,json}`.
- Skills: `claude/skills/ft-task/{preamble.md,step-1.5-model-edge.md}`, `ft-epic-discovery/SKILL.md` (Step 7 child cap "capped at `[heavy]`"), `ft-audit`, `ft-audit-repo`, `ft-refactor`; Codex wrappers mirror.
- Docs: `docs/PLATFORMS.md` (calibration table, as-of 2026-10-02), `docs/GLOSSARY.md`, `docs/AGENT-COMPAT.md` (ASCII fallback labels — CORE-550 precedent), `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/CONTEXT-BUDGET.md` (byte budgets — SPEC/model.md growth must fit), `docs/DOGFOOD.md`.
- Viz: `viz/src/parser.ts` (+ test), `viz/src/ui/ModelChip.tsx` (+ test).

**Archive skim.** CORE-EPIC-482 (model-tier-recalibration) is the direct precedent: .1 resolved the fourth rung as `[xheavy]`🔭 manual-only; .3 added the round-up default; .5 + FE-108 taught viz the glyph; CORE-489.2 swept mirrors; CORE-550 added the missing `XHEAVY` ASCII fallback (lesson: .2 must add `FRONTIER` to `docs/AGENT-COMPAT.md` in the same child). The effort-axis section explicitly bans variant tokens (`[opus-xhigh]`) — this epic keeps that ban (effort lives in the map, not the token).

**Drift check.** Cited paths all present at HEAD (`02add591`). PLATFORMS table roster as-of 2026-10-02 lists effort ladders including `low`/`max`; .3 drops them from *recommendations* only (the ladder column can still describe vendor reality). No drift against the PLAN line.

**Resolved scoping**

| # | Question | Resolution |
|---|---|---|
| 1 | Where does effort live? | PLAN tokens stay agent-neutral tier tokens; a tier × platform map gives the recommended model @ effort. No `@effort` token suffix (effort-axis ban stands). |
| 2 | Ladder shape | New chooser-assignable `[frontier]` rung between `[heavy]` and `[xheavy]`: `light < medium < heavy < frontier < xheavy`. |
| 3 | `[xheavy]` fate | **Keep both.** `[xheavy]`🔭 stays manual-only above frontier for multi-session open-ended exploration. |
| 4 | Frontier glyph | `[frontier]`💎 (💎 unused anywhere in SPEC/skills; 🚀 rejected — Phase 4 heading). ASCII fallback `FRONTIER`. |
| 5 | Frontier triggers | Contract/architecture design · high blast radius (security, migration, release, fleet-wide) · heavy-epic Discovery · deep research and investigation (operator's primary use). **Not** escalation-after-failure (operator declined). Audits default to heavy — "many audits are fine with Opus @ high". |
| 6 | Reliability bias | Keep `[medium]` filing default + round-up rule; effort leans at/above vendor default within each tier. |
| 7 | Effort vocabulary | **medium / high / xhigh only.** Never recommend `low` or `max` (operator never runs low). |
| 8 | Gate + effort | No gate effort check — gate stays tier-only; the map drives suggestions only. |
| 9 | Map home | `docs/PLATFORMS.md` (dated vendor facts, release-refreshed); `SPEC/model.md` carries the rule + tier definitions. |
| 10 | Light/medium mapping | light = Sonnet @ medium–high; medium = Opus @ medium (alt Sonnet @ high). |
| 11 | Children | M=4 as drafted; .3 and .5 `[medium]` (operator confirmed the departure from the `[heavy]` seed). |

**Approved map** (input to CORE-741.3; Codex/Grok cells to verify against vendor docs):

```text
tier        Claude                     Codex              Grok
light 🔧    Sonnet @ medium–high       Sol @ medium–high  Grok @ medium–high
medium 🧩   Opus @ medium              Sol @ high         Grok @ high
            (alt Sonnet @ high)        (alt Astra @ med)
heavy 🧠    Opus @ high                Astra @ high       Grok @ xhigh
frontier 💎 Fable @ high–xhigh         Astra @ xhigh      Grok @ xhigh + ⚠️ (no frontier model; suggest switching)
xheavy 🔭   manual-only — operator's choice (typically Fable @ xhigh)
effort vocabulary: medium | high | xhigh only
```

**Open for the children (assumptions, not resolved here):**
- .2: whether "when in doubt, round up" crosses heavy→frontier, or frontier is trigger-only. Leaning: round-up still stops at `[heavy]`; frontier is reached by trigger. The automated-chooser cap moves from `[heavy]` to `[frontier]` (xheavy still never chooser-assigned).
- .2: concrete-token bucketing — `fable` (and Astra-class) bucket to 💎; `opus` stays 🧠. A `[frontier]` task on an Opus session lands the ⚠️ under-tier advisory (the intended nudge toward Fable).
- .4: the chooser-cap change touches the orchestration contract — check `docs/EXTERNAL-AGENTS.md` stable-surface rows and file any caller-side row in the same closure (SPEC.md §"Cross-repo edit remit").

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-EPIC-482 cohort filing shape (2-space indent, `[model]` on every line, em-dash, ≤50w)

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing)

**Implementation Notes:**

- 4 child lines written (CORE-741.2..5); description word counts 40 / 50 / 36 / 31 (all ≤50w target). M unchanged from the filing estimate (4).
- Parent description refined from the filing placeholder (45w).
- Downstream-impact scan over the rest of the active PLAN (CORE-727, CORE-683, CORE-641): no downstream impact.
- `[unattended]` candidacy: no candidates — .2/.4/.N are `[heavy]` (clause 1); .3 and .5 wait on `[heavy]` .2, neither closed nor proposed (clause 6).
- Model departures from the `[heavy]` seed: .3 and .5 → `[medium]` (operator confirmed); .2 and .4 uniform.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only PLAN filing)

- [x] Ran lint/type-check on changed code — N/A (markdown-only PLAN filing)

- [x] **Verification receipt** — N/A: no verify commands; markdown mental-pass recorded in Testing Notes

- [x] **External review** — N/A: the deliverable is filed PLAN lines, not a diff to grade

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the CORE-EPIC-741 block: 2-space child indent on every child; bold IDs intact; `[model]` on every line, children ≤ `[heavy]`; no `[unattended]` anywhere; shortnames ≤30 chars; ` — ` separator consistent; all descriptions ≤50w; no trailing whitespace (`grep -c " $"` → 0); Fan-out wikilinks match filed children.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change (README, AGENTS, SPEC.md, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION). Contract edits land in .2–.5.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Filed CORE-EPIC-741 (effort-tiers) and scoped four children: .2 frontier-rung contract `[heavy]`, .3 PLATFORMS tier × platform model @ effort map `[medium]`, .4 routing skill sweep `[heavy]`, .5 viz frontier tier `[medium]`, plus the .N audit as filed. Key decisions: tier tokens stay agent-neutral; new chooser-assignable `[frontier]`💎 below manual-only `[xheavy]`🔭; effort recommendations limited to medium/high/xhigh; no gate effort check. Changed: `.flaitron/PLAN.md` only (matches `touches:`).

**Archived:** 2026-10-08
