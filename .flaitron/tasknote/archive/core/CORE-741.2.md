---
title: frontier-rung-contract
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-741.1, CORE-741.3, CORE-741.4, CORE-741.5, CORE-EPIC-482]
touches:
  - SPEC/model.md
  - SPEC.md
  - SPEC/cue-vocabulary.md
  - SPEC/gates.md
  - docs/GLOSSARY.md
  - docs/AGENT-COMPAT.md
  - docs/AGENT-NEUTRALITY.md
  - docs/DOGFOOD.md
  - .flaitron/PLAN.md
---

# CORE-741.2 | frontier-rung-contract

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Make `[frontier]`💎 a contract-level, chooser-assignable tier between `[heavy]` and manual-only `[xheavy]`🔭 — with its triggers, the reliability-over-tokens effort bias, the medium/high/xhigh effort vocabulary, and the map rule — and mirror the glyph + `FRONTIER` fallback across the cue/glossary surfaces.

## ✅ Acceptance

- [x] `SPEC/model.md` ladder reads `light < medium < heavy < frontier < xheavy` and the chooser cap moves to `[frontier]` — `grep -q 'heavy  <  frontier  <  xheavy' SPEC/model.md && ! grep -q 'cap at \`\[heavy\]\`\|caps at \`\[heavy\]\`' SPEC/model.md`
- [x] `SPEC/model.md` carries the four frontier triggers, trigger-only reach (round-up stops at `[heavy]`), the reliability-over-tokens bias, the medium/high/xhigh effort vocabulary, and a map rule pointing at `docs/PLATFORMS.md` — `grep -c` on `When to choose \`\[frontier\]\``, `Reliability over tokens`, `` `medium`, `high`, or `xhigh` ``, `round-up stops at \`\[heavy\]\`` each ≥1; content `judgment` (prose contract)
- [x] Next-move glyph mirror covers 💎 / `FRONTIER` (`fable`→💎, `opus`→🧠) — `grep -q '\[frontier\]\`→💎' SPEC/model.md SPEC/cue-vocabulary.md`
- [x] Mirrors updated: SPEC.md §"Model field", cue-vocabulary (layer list, reuse table, next-task table), gates.md non-escalating glyph list, GLOSSARY (`[model]` + copy-paste line), AGENT-COMPAT label list, AGENT-NEUTRALITY rows, DOGFOOD cue-render list — `grep -l '💎\|FRONTIER\|frontier' <each file>` lists all eight
- [x] 💎 stays unique across the cue table (no second meaning) — `judgment` (read the cue-vocabulary tables)
- [x] SPEC.md stays within its 49,000-char budget and drift checks pass — `bash tools/drift-checks.sh`
- [x] Fixture/viz suites unaffected (no parser change in this child) — `npm --prefix viz test`

## 🧩 Subtasks

- [x] `SPEC/model.md`: intro, category list, ladder, chooser cap, calibration baseline (frontier bullet; `fable` moves heavy→frontier), gate-table example, effort section (vocabulary + reliability bias + map rule), round-up note, "When to choose `[frontier]`", xheavy cap wording, glyph-mirror section
- [x] `SPEC.md` §"Model field": five-rung ladder + `frontier` bullet + cap wording
- [x] `SPEC/cue-vocabulary.md`: tier-layer list, reuse table row, next-task row + prose
- [x] `SPEC/gates.md`: add 💎 to the never-escalates glyph list
- [x] `docs/GLOSSARY.md`: `[model]` entry + copy-paste line entry
- [x] `docs/AGENT-COMPAT.md`: `FRONTIER` in the ASCII label list
- [x] `docs/AGENT-NEUTRALITY.md`: emoji list (row 44) + provenance append (row 52)
- [x] `docs/DOGFOOD.md`: cue-render list line
- [x] Phase 3: verify commands + drift checks + viz test; external review

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers)
- [[CORE-741.1]] — Discovery; Resolved scoping table + approved map are this child's input
- [[CORE-741.3]] — follow-up: rebases the PLATFORMS table into the tier × platform map this child points at
- [[CORE-741.4]] — follow-up: teaches choosers / skills / post-closure the rung
- [[CORE-741.5]] — follow-up: viz parser + ModelChip + fixtures + `SPEC/plan-parser.md`
- [[CORE-EPIC-482]] — predecessor (added `[xheavy]`🔭, the round-up default, the effort axis)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-741.1 approved the rung, glyph, triggers, bias, and effort vocabulary; .3/.4/.5 all cite this contract, so it lands first (Fan-out Sequential).

- [x] Read relevant source files — `SPEC/model.md` (whole), `SPEC.md` §"Model field", `SPEC/cue-vocabulary.md` §"Glyph layers and reuse" + §"Next-task cues", `SPEC/gates.md` L84-90, `docs/AGENT-COMPAT.md` L150-170, `docs/GLOSSARY.md` L35/L89, `docs/AGENT-NEUTRALITY.md` L44/L52, `docs/DOGFOOD.md` L70-85, `docs/PLATFORMS.md` §"Platform×model×effort calibration table", `docs/CONTEXT-BUDGET.md` §"Budgets"

- [x] **Best Practices Review** — boundary: rule + tier definitions in `SPEC/model.md`, dated model @ effort cells in `docs/PLATFORMS.md` (CORE-741.1 Q9; same split CORE-724.3 made). No cells written here.

- [x] **Archive skim** — CORE-741.1 (input: Resolved scoping + approved map + three open assumptions for .2); CORE-EPIC-482 cohort via 741.1's skim (xheavy rung, round-up default, effort-axis variant-token ban); CORE-550 (lesson: the ASCII fallback in AGENT-COMPAT must land with the glyph — included here).

- [x] **Drift check** — every cited path present at HEAD `fa60c9f4`; PLAN line matches. Budget: `SPEC.md` 42,988 / 49,000; `SPEC/model.md`, `cue-vocabulary.md`, `docs/*` unbudgeted. 💎 unused outside PLAN.md (grep). Interim inconsistency accepted: `docs/PLATFORMS.md` still bands `fable` heavy until CORE-741.3 rebases the table (already in .3's scope).

- [x] Asked clarifying questions — one AskUserQuestion: round-up crossing heavy→frontier → **Trigger-only** (round-up stops at `[heavy]`; `[frontier]` reached only by its triggers). Explicit assumptions (from CORE-741.1 leanings): automated-chooser cap moves `[heavy]`→`[frontier]` (`[xheavy]` still never chooser-assigned); `fable` (+ `mythos`) inherent tier = frontier, `opus` stays heavy, an Astra-class flagship @ `xhigh` can earn frontier; a `[frontier]` task on an Opus session lands the ⚠️ under-tier advisory; gate stays tier-only (no effort read); frontier prose label `high-stakes`; `[frontier]` fails `[unattended]` candidacy clause 1 by construction (no edit). Out of scope (owned by siblings): `SPEC/post-closure.md`, skills, `SPEC/procedures/ft-task.md`, `claude/CAPABILITIES.md` (.4); `SPEC/plan-parser.md`, fixtures, viz (.5); PLATFORMS cells (.3). Added beyond the PLAN line's named list as same-deliverable glyph mirrors: `SPEC/gates.md`, `docs/AGENT-NEUTRALITY.md`, `docs/DOGFOOD.md`.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

The PLAN line names the map rule "pointing at `docs/PLATFORMS.md`"; .3 rebases §"Platform×model×effort calibration table" in place, so the pointer cites that heading — .3 must keep it or sweep the pointer.

Reliability bias wording reconciles Resolved-scoping Q6 ("at/above vendor default") with the approved map's light cell `Sonnet @ medium–high` (Sonnet default `high`): a cell qualifies when its range reaches the vendor default, and the upper end is the pick when in doubt.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-EPIC-482 `[xheavy]` rung shape: same section skeleton (ladder, cap bullet, calibration bullet, "When to choose" block, glyph mirror) and the same mirror set (SPEC.md, cue-vocabulary, GLOSSARY, AGENT-COMPAT per CORE-550)

- [x] **Minimal refactor gate** — no refactor; edits only add the rung and correct sentences the rung made false

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (prose contract; no parser change in this child — .5 owns viz/fixtures)

**Implementation Notes:**

- `SPEC/model.md`: intro (fourth chooser-assignable rung, fifth manual-only), category lists, ladder, cap `[heavy]`→`[frontier]`, `frontier` calibration bullet (`fable`/`mythos`; flagship@`xhigh` only on a platform with nothing above it — `opus` excluded), gate-table example, new §"Effort recommendations" (placed after §"Effort axis"'s trailing ⚠️/no-auto-retag paragraphs, before §"Practical guidance"), round-up-stops-at-`[heavy]` sentence, §"When to choose `[frontier]`" (four triggers + not-a-trigger line), xheavy cap wording, five-glyph mirror section.
- Mirrors: SPEC.md §"Model field"; cue-vocabulary (tier layer list, reuse-table row, `FRONTIER` next-task row + prose); gates.md non-escalating list; GLOSSARY `[model]` + copy-paste line (prose word `high-stakes`); AGENT-COMPAT label list; AGENT-NEUTRALITY rows 44/52; DOGFOOD cue-render list; `SPEC/unattended-candidacy.md` clause 6 (`.1` is `[heavy]`-or-above — added after review finding 3).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (fixtures/parser unaffected)

- [x] Ran lint/type-check on changed code — N/A (markdown only); `tools/drift-checks.sh` covers the markdown contract checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after review fixes):
- A1 `grep -q 'heavy  <  frontier  <  xheavy' SPEC/model.md && ! grep -q 'cap(s) at [heavy]' SPEC/model.md` → 0
- A2 `grep -c` → `When to choose [frontier]` 2 · `Reliability over tokens` 1 · `` `medium`, `high`, or `` 1 · `Round-up stops at [heavy]` 1 · `docs/PLATFORMS.md` 7
- A3 `grep -q '[frontier]`→💎'` on model.md + cue-vocabulary.md → 0
- A4 `grep -l '💎\|FRONTIER\|frontier'` over the eight mirror files → 8/8
- A5 judgment: 💎 appears in cue-vocabulary only as the frontier tier/next-task glyph (L42, L59, L254, L258-272)
- A6 `bash tools/drift-checks.sh` → 0 (SPEC.md 43,217 / 49,000)
- A7 `npm --prefix viz test` → 0 (587/587)
- trailing whitespace over changed files → none

External review (`/code-review medium`, working-tree diff) — 9 findings, all graded **blocker** except #7; Phase 2 fixes applied and Phase 3 re-run from the top:
1. model.md medium bullet "⚠️ only on a `[heavy]` task" stale → `[heavy]`-or-above. Fixed.
2. "resolve residual uncertainty toward the heavier tag" contradicted round-up-stops-at-heavy → "— up to `[heavy]`". Fixed.
3. `SPEC/unattended-candidacy.md` clause 6 ".1 is `[heavy]` by convention" vs the heavy-epic-Discovery trigger → `[heavy]`-or-above. Fixed (extra touched path).
4. "(§"Effort recommendations")" read as a PLATFORMS section → "below". Fixed.
5. Research overlap across heavy/frontier/xheavy → frontier trigger narrowed to "deliverable *is* the finding"; informing research stays heavy, multi-session is xheavy. Fixed.
6. `[frontier]` on `opus` vs "flagship @ xhigh earns frontier" → flagship clause limited to platforms with nothing above the flagship; `opus` excluded explicitly. Fixed.
7. **note** — medium→heavy dial-up says "highest effort" (often `max`) while recommendations ban `max`: pre-existing self-assessment wording; the effort vocabulary binds recommendations only (§"Effort recommendations" opens "The gate stays tier-only"). No change; .3's map cells use `xhigh`, so no recommendation needs `max`.
8. AGENT-NEUTRALITY row 52 surface column missing `[frontier]` → added. Fixed.
9. Intro rung count unnumbered → "A fourth, chooser-assignable rung". Fixed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — SPEC.md, docs/AGENT-NEUTRALITY.md, docs/AGENT-COMPAT.md: updated (this diff). docs/PLATFORMS.md: deferred to CORE-741.3 (fable still bands heavy there — its scope). claude/CAPABILITIES.md: deferred to CORE-741.4. docs/EXTERNAL-AGENTS.md: no change (no chooser-cap row). README, AGENTS, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, WORKTREES, VISION: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Added `[frontier]`💎 to the model contract: ladder `light < medium < heavy < frontier < xheavy`, chooser cap moved to `[frontier]`, trigger-only reach (round-up stops at `[heavy]`), four triggers, `fable` bands frontier (`opus` stays heavy), and a new §"Effort recommendations" (medium/high/xhigh vocabulary, reliability-over-tokens bias, map rule pointing at `docs/PLATFORMS.md`). Glyph + `FRONTIER` fallback mirrored across SPEC.md, cue-vocabulary, gates, GLOSSARY, AGENT-COMPAT, AGENT-NEUTRALITY, DOGFOOD. Verification: drift checks 0, viz 587/587; external review's 8 blockers fixed, 1 note dispositioned. `touches:` reconciliation: declared 9 paths; actual adds `SPEC/unattended-candidacy.md` (review finding 3). Maintainability: the rung's rule lives once in `SPEC/model.md`; dated cells stay in PLATFORMS for CORE-741.3.

**Archived:** 2026-10-08
