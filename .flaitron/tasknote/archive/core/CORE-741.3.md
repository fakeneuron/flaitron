---
title: platform-effort-map
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-741.1, CORE-741.2, CORE-741.4]
touches:
  - docs/PLATFORMS.md
blocked-by:
  - CORE-741.2
parallel-safe-with:
  - CORE-741.5
---

# CORE-741.3 | platform-effort-map

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Rebase `docs/PLATFORMS.md` §"Platform×model×effort calibration table" into a tier × platform map (Claude / Codex / Grok) naming the recommended `model @ effort` per tier — medium/high/xhigh only — with frontier bands and the Grok no-frontier ⚠️, Codex/Grok cells verified against vendor docs.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md` §"Platform×model×effort calibration table" (heading kept — five pointers cite it) leads with a tier × platform map: five tier rows × Claude / Codex / Grok columns naming `model @ effort` — `grep -q '^### Tier × platform map' docs/PLATFORMS.md`
- [x] Map cells name only `medium` / `high` / `xhigh` (no `low` / `max` recommendation) — `awk '/^### Tier × platform map/{a=1;next} a&&/^### /{a=0} a&&/^\| \`\[/' docs/PLATFORMS.md | grep -E '@ (low|max)'` prints nothing (exit 1)
- [x] Frontier row: Fable @ high–xhigh · Astra @ xhigh · Grok ⚠️ no-frontier note naming the nearest cell + the switch — `grep -c 'Astra @ xhigh\|Fable @ high–xhigh' docs/PLATFORMS.md` ≥2; ⚠️ wording `judgment`
- [x] Family roster re-banded for CORE-741.2: `fable` row band `frontier`; Astra@xhigh noted as frontier-band — `grep -E '^\| Anthropic \| `fable`' docs/PLATFORMS.md | grep -q frontier`
- [x] Codex/Grok cells verified against vendor docs, sources + as-of date recorded under the map — `grep -q 'docs.x.ai' docs/PLATFORMS.md`; content `judgment` (Testing Notes cite the fetches)
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the section intro: the section now carries the map (recommendations) and the family roster (gate calibration facts)
- [x] Add `### Tier × platform map` (as of 2026-10-08) with the approved cells, effort-vocabulary + reliability-bias pointer to `SPEC/model.md` §"Effort recommendations", the Grok ⚠️ no-frontier note, xheavy manual-only row, vendor sources
- [x] Add `### Family roster` subheading over the existing table; `fable` band heavy → frontier; Astra@xhigh frontier equivalence; Codex ladder notes `Ultra`; stamp note for the re-band
- [x] Phase 3: verify commands + drift checks; external review

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers)
- [[CORE-741.1]] — Discovery; the approved map is this child's input
- [[CORE-741.2]] — predecessor: frontier-rung contract (`SPEC/model.md` §"Effort recommendations" points at this table)
- [[CORE-741.4]] — follow-up: next-move suggestions print the cells this child writes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-741.2 landed the rule (`SPEC/model.md` §"Effort recommendations") pointing at this section, and left `fable` banded heavy here pending this child; CORE-741.4's next-move print needs the cells.

- [x] Read relevant source files — `docs/PLATFORMS.md` §"Platform×model×effort calibration table" (whole) + §"Codex CLI" effort/model-switch rows; `SPEC/model.md` calibration baseline + §"Effort axis" + §"Effort recommendations"; pointer grep for the heading

- [x] **Best Practices Review** — N/A for code; boundary per CORE-741.1 Q9: cells here, rule in `SPEC/model.md` — the map restates no rule beyond a one-line pointer

- [x] **Archive skim** — 19 hits on "calibration table". Load-bearing: CORE-741.1 (approved map, Resolved scoping Q7/Q10), CORE-741.2 (heading must stay or the pointer sweeps; fable re-band deferred here), CORE-688 (2026-10-02 vendor refresh — sources read then: Anthropic effort guide, OpenAI Codex models page, xAI reasoning page), CORE-604.3 (table moved here from model.md), CORE-724.3 (model.md stub retired; vendor facts live only here). Area `core` confirmed against README.

- [x] **Drift check** — PLAN line matches CORE-741.1's approved map; heading cited by `SPEC/model.md` (×5), `claude/CAPABILITIES.md`, `step-1.5-model-edge.md`, `docs/CONTEXT-BUDGET.md`, AGENT-NEUTRALITY → **heading kept verbatim**, map added as a `###` inside it. No tooling parses the table (`tools/`, ft-release grep). Out-of-scope drift seen: §"Codex CLI" effort + model-switch rows map only `[heavy]`/`[medium]`/`[light]` and list no 💎 label — glyph-surface sweep belongs to CORE-741.4 (handed off in Implementation Notes).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: the map leads and the family roster table stays beneath it (the Step 1.5 self-assessment and the edge fragment's cross-provider lookup still read band-by-family); Gemini rows stay in the roster but get no map column (map is Claude / Codex / Grok per the PLAN line); light Codex cell keeps the approved Sol @ medium–high and adds `alt Luna @ high` (vendor-verified start setting for Luna, the Codex light model) — additive, not a change to the approved pick.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Vendor verification (2026-10-08):
- xAI `docs.x.ai/docs/guides/reasoning`: grok-4.7 `reasoning_effort` = `low`/`medium`/`high`/`xhigh`, "defaults to `"high"`". `docs.x.ai/docs/models`: grok-4.7 is the flagship ("the most capable model we've built"); nothing above it → Grok has no frontier-band model, ⚠️ note confirmed.
- OpenAI `learn.chatgpt.com/docs/models` (Codex): Astra = "most capable", GPT-6.1 Sol = "near-Astra performance … at a lower cost", Luna = most efficient for focused tasks. Effort: Light(=`low`) / Medium / High / Extra High / Max / **Ultra** (new — subagents; Luna lacks it). "Start with High for Luna or Light for Astra"; Sol starts at the client default. Approved cells (Sol @ medium–high / high; Astra @ medium / high / xhigh) all reach or exceed the vendor start → reliability bias satisfied.
- Claude cells unchanged from 741.1 (Opus 5.5 default `medium`, Sonnet/Fable default `high`, per CORE-688's refresh).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing section in place (CORE-604.3 / CORE-688 shape: framing paragraph, dated as-of stamp, table, notes); the map is a sibling `###` table so the heading every pointer cites stays put

- [x] **Minimal refactor gate** — no refactor; intro reworded only where "this table" became two tables

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (docs only; no tooling parses the table)

**Implementation Notes:**

- `docs/PLATFORMS.md` §"Platform×model×effort calibration table": intro names the two tables and their jobs; new `### Tier × platform map` (as of 2026-10-08; 5 tiers × Claude Code / Codex / Grok Build; effort-vocabulary + upper-end pointer to `SPEC/model.md` §"Effort recommendations"; Grok ⚠️ no-frontier note naming the switch; vendor sources); existing table under `### Family roster` with `fable` band heavy → frontier, `astra@xhigh` ≈ frontier-band, Codex Ultra fact.
- Handoff to [[CORE-741.4]]: §"Codex CLI" effort row ("Maps to `[heavy]` / `[medium]` / `[light]`") and model-switch row (emoji label list without 💎) still predate the frontier rung — glyph/chooser surfaces are .4's sweep.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (docs only; no tooling parses the table — `tools/`, ft-release grep)

- [x] Ran lint/type-check on changed code — N/A (markdown); `tools/drift-checks.sh` covers the markdown contract checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after review fixes):
- A1 `grep -q '^### Tier × platform map' docs/PLATFORMS.md` → 0
- A2 map-row `awk … | grep -E '@ (low|max)'` → 1 (no match; 5 tier rows scanned)
- A3 `grep -c 'Astra @ xhigh\|Fable @ high–xhigh' docs/PLATFORMS.md` → 2; ⚠️ wording judgment: names the nearest cell (Grok @ xhigh, heavy-band) and the switch (Fable / Astra @ xhigh), advice-only
- A4 `grep -E '^\| Anthropic \| \`fable\`' … | grep -q frontier` → 0
- A5 `grep -q 'docs.x.ai' docs/PLATFORMS.md` → 0; fetches recorded in Discovery Notes
- A6 `bash tools/drift-checks.sh` → 0
- trailing whitespace in changed files → 0

External review (`/code-review medium`, working-tree diff) — 9 findings:
1. **blocker** — `codex` roster row said `codex@xhigh` ≈ heavy while the map / `gpt-5` row band Astra @ xhigh frontier. Fixed: row now reads Astra @high heavy · Astra @xhigh frontier · Sol @xhigh–@max heavy.
2. **blocker** — map `[heavy]` Codex cell (Astra @ high) vs that same row. Fixed by #1.
3. **blocker** — roster stamp note named only the `fable` re-band. Fixed: stamp lists all three 2026-10-08 edits.
4. note — the map's 2026-10-08 stamp covered unre-verified Claude cells. Fixed: the sources line says Claude cells carry the 2026-10-02 verification.
5. note — intro "`@ effort`" / "family-level tokens" did not fit both tables. Fixed: roster rows = family tokens, map cells = models; both notations named.
6. note — the `[xheavy]` Claude cell named a pick for a manual-only rung. Fixed: all three cells read `manual-only`, and the "typically Fable @ xhigh" hint moved to prose.
7. note — `[medium]` Claude cell Opus @ medium is heavy-band. No change: operator-approved cell (CORE-741.1 Q10); overkill is harmless to the gate.
8. note — `gemini-pro` Deep Think not re-banded frontier. No change: Deep Think is a mode, not a token; banding it would be an unverified vendor claim; Gemini is outside the map's platforms. The `.N` audit can revisit.
9. **blocker** — A2 verify command was a placeholder. Fixed: concrete `awk | grep` in Acceptance.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/PLATFORMS.md`: updated (this diff). `claude/CAPABILITIES.md`: no change (row 31 cites the section for per-family ladders, which the roster still holds; frontier wording is CORE-741.4's). `SPEC/model.md`: no change (heading it cites is kept). README, AGENTS, SPEC.md, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Rebased `docs/PLATFORMS.md` §"Platform×model×effort calibration table" into two tables. A new **Tier × platform map** (as of 2026-10-08) gives a `model @ effort` cell for each of 5 tiers × Claude Code / Codex / Grok Build, using medium/high/xhigh only, with the Grok no-frontier ⚠️ and its switch advice. The existing **Family roster** now bands `fable` frontier and Astra @ xhigh frontier-band (`gpt-5` + `codex` rows), and records Codex's new Ultra setting. Codex/Grok cells were verified against learn.chatgpt.com and docs.x.ai. No refactor; the heading every pointer cites is unchanged. External review: 4 blockers + 3 notes fixed, 2 notes kept with reasons. `touches:` reconciliation: `git diff --name-only` = `docs/PLATFORMS.md` (+ PLAN/tasknote workflow files), matching the declaration. Maintainability: one section now serves both the gate calibration and the CORE-741.4 suggestion print. Handoff to CORE-741.4: the §"Codex CLI" effort/model-switch rows still predate 💎.

**Archived:** 2026-10-08
