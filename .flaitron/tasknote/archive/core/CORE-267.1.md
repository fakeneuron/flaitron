---
title: release-dogfood-gate discovery
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-267]
---

# CORE-267.1 | release-dogfood-gate discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-267]]

## 🎯 Goal

Scope the `CORE-EPIC-267` epic (`release-dogfood-gate`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-267.2 .. CORE-267.4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-267.2 .. CORE-267.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-267.5 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-267.2 .. CORE-267.4; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-267 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-267]] — parent epic (release-dogfood-gate)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery CORE-EPIC-267` on the parent epic filed manually in `b24f91d` (parent-only line, no `.1`/`.N` children). The epic formalizes a release-process decision CORE-265 made by hand. Clear epic scope (shared design surface across `ft-release` + 3 stamp-carrying docs); not single-task.

- [x] Read relevant source files — see inventory below

- [x] **Archive skim** — load-bearing findings below

- [x] **Drift check** — paths/concepts verified against HEAD; no drift (below)

- [x] Asked clarifying questions — 4 scoping forks resolved via AskUserQuestion (table below)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface (inventory)

**The `last-verified` stamp surface — 3 docs, currently 9 stamps:**

| Doc | Stamps | Current state @ v5.0.0 |
|---|---|---|
| `docs/AGENT-COMPAT.md` (matrix, §"The matrix") | 7 rows (one per agent) — "Last verified" column | Claude `v5.0.0 (dogfooded)`; Grok/Codex `v4.4.0 (dogfooded)`; Cursor/Gemini/Aider/Amp `unverified` |
| `docs/PLATFORMS.md` (per-agent stub footers, l.236–279) | 6 `**Last verified:**` footers | Grok/Codex `v4.4.0 (dogfooded)`; Cursor/Gemini/Aider/Amp `unverified` |
| `claude/CAPABILITIES.md` (l.56, §"Last verified") | 1 (Claude) | `v5.0.0 (dogfooded)` |

- Stamp format: `vX.Y.Z · YYYY-MM[-DD] (context-tag)`; context-tags today = `dogfooded` / `docs-only · … (pre-adoption)` / `unverified` (`AGENT-COMPAT.md` §"Reading the cells").
- **Current update obligation is *soft prose*** (`AGENT-COMPAT.md:70-73`): "refresh the cell when you run a first session under the agent, or after a major bump." No release-time enforcement → drift accumulated (Grok/Codex lag Claude by a major version).

**The release flow — `claude/skills/ft-release/SKILL.md`:**
- §5 (Phase 2, l.142) already encodes "**`last-verified` stamps — verify, don't bump**": refresh only on first session under an agent or a **major** bump; minor/patch leave them. This is the seam the gate plugs into.
- ft-release is **flowtron-self only** (global symlink; never in adopters). So the gate is a *skill* concern, not the agent-neutral SPEC contract — **no SPEC.md / SPEC-module contract edit anticipated**.

### Archive skim — load-bearing findings

- **`CORE-265.md` (release v5.0.0)** — the direct precedent. Operator decision #1: refreshed the 2 Claude stamps to v5.0.0; **explicit-skipped** the 4 Grok/Codex stamps (left at `v4.4.0`, honest last-real-verification, "cannot re-dogfood non-Claude agents from this session"). Decision #3 explicitly filed CORE-EPIC-267 to make per-agent dogfood-or-explicit-skip a gate. **This epic productizes that ad-hoc call.** The "explicit-skip" today = *silently leaving the old stamp* — the epic's job is to make the skip a *recorded, deliberate* act.
- **`CORE-224.*` (epic, 6 children)** — established the AGENT-COMPAT matrix + PLATFORMS per-agent surface + the stamp format and update-obligation prose. This epic edits the obligation it set.
- **`CORE-261.md`** — `last-verified` backtick-style (cosmetic stamp format); **`CORE-248`** (last-verified-awareness) seeded ft-release §5's "verify, don't bump" awareness. Both confirm the stamp surface is the right altitude.

### Drift check

- `ft-release` §5 stamp paragraph live at HEAD (`SKILL.md:142`). ✅
- AGENT-COMPAT matrix rows live (l.36–42); update-obligation prose l.70–73. ✅
- PLATFORMS footers live (l.236/247 = Grok/Codex dogfooded; l.255/263/271/279 = 4× unverified). ✅
- CAPABILITIES Claude stamp l.56. ✅
- Immediate debt confirmed: Grok+Codex stamps sit at `v4.4.0` while flowtron is `v5.0.0` (a full major behind). No drift in cited paths.

### Resolved scoping (AskUserQuestion, 2026-06-01)

| Question | Resolution |
|---|---|
| Checklist form | **Reuse existing stamps** — the AGENT-COMPAT matrix rows (+ PLATFORMS footers) ARE the checklist; no new artifact. |
| Explicit-skip notation | **Extend the context-tag vocabulary** — add a `skipped @ vX.Y.Z` tag, keeping honest last-real-verification AND recording the deliberate skip. |
| Gate scope | **Dogfooded agents only** (Claude/Grok/Codex). The 4 `unverified` contract-only rows stay launch-coverage, *noted-not-gated* until first dogfood. |
| Child decomposition | **3 children**: .2 convention / .3 ft-release wiring / .4 v5 debt-discharge. N=5 (audit `.5`), as filed. |

### Drafted child scopes (for Phase 2 filing)

- **CORE-267.2** `[heavy]🧠 | dogfood-checklist-convention` (~42w) — Define the cross-agent dogfood gate convention: add a `skipped @ vX.Y.Z` context-tag to the `last-verified` stamp vocabulary, and rewrite `docs/AGENT-COMPAT.md` §"Reading the cells" update-obligation prose from soft refresh-guidance into a release-gate obligation (dogfood-or-explicit-skip). No new artifact — the matrix rows are the checklist.
- **CORE-267.3** `[heavy]🧠 | ft-release-gate-wiring` (~43w) — Wire the dogfood-or-explicit-skip gate into `claude/skills/ft-release/SKILL.md` §5/§7: walk the dogfooded-agent rows (Claude/Grok/Codex) at release time, force per-agent resolution (refresh stamp from real verification, or record `skipped @ vX.Y.Z`), and block tagging until every row is resolved. Bundle into the 📦 gate per SPEC.
- **CORE-267.4** `[light]🔧 | v5-skip-debt-discharge` (~39w) — Apply the new convention to the live debt: stamp the lagging Grok+Codex `last-verified` cells (AGENT-COMPAT.md + PLATFORMS.md) as `v4.4.0 · … (dogfooded; skipped @ v5.0.0)`, replacing CORE-265's silent leave-old-stamp. Doc-currency sweep on the 4 `unverified` rows for the noted-not-gated wording.

Dependency order: .2 (convention) → .3 (wiring, consumes the convention) → .4 (debt-discharge, applies the convention to live stamps). Audit `.5` confirmed as-filed — scope unchanged (no N shift).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the archived CORE-EPIC-254 / CORE-224 cohort shape (2-space child indent, `[model]` on every line, em-dash separator, ≤50w/70w descriptions)

- [x] Implemented the minimal solution — 3 child lines written into `.flowtron/PLAN.md`

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface)

**Implementation Notes:**

Wrote 3 implementation-child lines under `CORE-EPIC-267`, between the `.1` and `.5` lines, 2-space indent:

- `.2` dogfood-checklist-convention `[heavy]🧠` — ~42w
- `.3` ft-release-gate-wiring `[heavy]🧠` — ~43w
- `.4` v5-skip-debt-discharge `[light]🔧` — ~39w

All under the 50w target / 70w hard cap. **No audit-number shift** — N stayed 5; `.5` audit confirmed as-filed (scope unchanged). No SPEC contract edit (ft-release is flowtron-self only; the gate is a skill + doc concern).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Markdown mental-pass on the 3 new PLAN.md lines: 2-space child indent preserved on all three · `**CORE-267.N**` bold IDs intact · `[model]` tag present on every line · `| <shortname>` ≤30 chars · em-dash separator consistent · each description ≤70w · no trailing whitespace. Indentation matches the sibling `.1`/`.5` lines. Clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — **no change** across all 11 AI-referenced docs (README.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md). Pure Discovery filing — the AGENT-COMPAT / PLATFORMS / CAPABILITIES / ft-release edits land inside children `.2`–`.4`, not here.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (kept nested under `CORE-EPIC-267` per epic-cohort grouping) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 gate / inline on conditional skip)

**Final Summary:**

Opened `CORE-EPIC-267` (release-dogfood-gate) and closed its `.1` Discovery. The epic productizes the ad-hoc call CORE-265 made by hand (refresh Claude stamps, explicit-skip Grok/Codex): it makes per-agent dogfood-or-explicit-skip a `ft-release` gate over the existing `last-verified` stamp surface. Inventoried that surface — 9 stamps across `docs/AGENT-COMPAT.md` (matrix), `docs/PLATFORMS.md` (6 footers), `claude/CAPABILITIES.md` — and confirmed the obligation is soft prose today (`AGENT-COMPAT.md:70-73`), which let Grok/Codex drift a full major behind. Resolved 4 scoping forks with the operator: reuse the existing stamps as the checklist (no new artifact); record skips via a new `skipped @ vX.Y.Z` context-tag; gate dogfooded agents only (Claude/Grok/Codex), leaving the 4 unverified rows noted-not-gated; 3-child split. Filed `CORE-267.2` (convention), `.3` (ft-release wiring), `.4` (v5 debt-discharge) — each ≤43w. No SPEC contract edit (ft-release is flowtron-self only). Audit `.5` unchanged; N stayed 5.

**Archived:** 2026-06-01
