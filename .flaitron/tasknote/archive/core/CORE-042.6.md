---
title: workflow phase rethink — Discovery
status: completed
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-042.1, CORE-042.2, CORE-042.3, CORE-042.4, CORE-042.5, CORE-037]
---

# CORE-042.6 | workflow phase rethink — Discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-042.1]] [[CORE-042.2]] [[CORE-042.3]] [[CORE-042.4]] [[CORE-042.5]] [[CORE-037]]

## 🎯 Goal

Revisit the 4-phase-vs-continuous-flow comparison from [[CORE-042.1]] §A9 with the post-A/post-C/post-B-half vantage now in hand, and decide ship-as-an-implementation-child vs propose-further (or close as no-change).

## ✅ Acceptance

- [ ] Drift-checked the §A9 side-by-side against current SPEC + template + viz + skill state (post-A modularization, post-C frontmatter shrink, post-CORE-042.4 Phase 4 trim, post-CORE-042.5 micro carve-out)
- [ ] Re-counted the 4-phase box total post-hybrid (was 21 in §A9; CORE-042.4 dropped one)
- [ ] Audited which §A9 named wins/costs are now captured by the hybrid landings (.4 + .5) and which residuals remain
- [ ] Sized residual costs that haven't moved (viz `[1,2,3,4]` indexing, archive consistency across 25+ archived tasknotes, AI deterministic-driving)
- [ ] Confirmed the four non-negotiable contracts (relevance, drift, archive skim, pattern survey) survive in any candidate shape
- [ ] Reached a ship-as-implementation-child / propose-further / close-as-no-change decision with explicit rationale
- [ ] (if ship) Filed implementation child(ren) under [[CORE-EPIC-042]] with `[model]` + shortname + ≤50w long description
- [ ] (if close) Optionally filed Future-Opportunities marker preserving the radical rethink option

## 🧩 Subtasks

- [ ] Drift-check the §A9 cited surfaces: SPEC §"The 4-phase workflow", `viz/src/tasknote.ts:135` (now :128), template, frontmatter field count, SPEC.md word count post-A
- [ ] Re-count Phase 1+2+3+4 boxes post-CORE-042.4 closure
- [ ] Re-derive the continuous-flow gate list from current 4-phase boxes; deduplicate redundancies
- [ ] Map §A9's named pros/cons onto post-hybrid reality: which are captured, which are still live
- [ ] Confirm the four non-negotiable contracts survive each candidate shape
- [ ] Form ship/propose/close recommendation with explicit rationale
- [ ] (Phase 2) Execute the recommendation — file children if ship, optional FO marker + close if no-change

## 🔗 Related

- [[CORE-042.1]] — epic Discovery; produced the §A9 short-form this task revisits
- [[CORE-042.2]] — Thrust A (SPEC modularization) landed; changes the cost calculus of further structural moves
- [[CORE-042.3]] — Thrust C (frontmatter audit) landed; reduced the schema surface
- [[CORE-042.4]] — Thrust C close (status source-of-truth); already trimmed Phase 4 closure from 3 writes to 2
- [[CORE-042.5]] — Thrust B (ship half: `/micro-task`) landed; captured the "ceremony for non-code tasks" win via the hybrid path
- [[CORE-037]] — parent diagnostic; original per-`/task` load measurement and structural-follow-up flag

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today (2026-05-06) by [[CORE-042.1]] §A9 as the Thrust B "propose" half (sibling of the just-shipped [[CORE-042.5]]). The PROPOSE decision was explicit: revisit continuous-flow vs 4-phase *after* the easier wins (Thrusts A + C + B-half) land. Those have now landed; this is the moment. No new evidence has surfaced post-.5 closure that would invalidate the question.

- [x] Read relevant source files — `SPEC.md`, `SPEC/epic.md`, `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`, `claude/skills/task/SKILL.md`, `viz/src/tasknote.ts`, `_project/tasknote/archive/core/CORE-042.1.md` / `.4.md` / `.5.md`, `_project/tasknote/archive/core/CORE-037.md`
- [x] **Archive skim** — see Discovery Notes §B0
- [x] **Drift check** — see Discovery Notes §B1; multiple drifts found (Phase 4 box count, viz line, frontmatter shape, SPEC word count)
- [x] Asked clarifying questions — disposition fork resolved via AskUserQuestion (3-option: Ship Shape A as new child / FO marker / no-change close); user picked **Ship Shape A as new child**. Filed below as CORE-042.7 with audit renumber .7 → .8 per [[CORE-042.1]] precedent.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### B0. Archive skim

Tasknotes that *shaped* (not just used) the 4-phase contract:

- **[[CORE-037]]** parent diagnostic — listed §"The 4-phase workflow" Phase 1 prose as a ~150w trim candidate but explicitly ruled out structural rethink; bundled the rethink into the "structural" deferred bucket that became [[CORE-EPIC-042]].
- **[[CORE-042.1]]** epic Discovery — produced the canonical §A9 side-by-side (4-phase 21 boxes vs continuous-flow ~16 gates) with the PROPOSE decision this task revisits. Hybrid path (Phase 4 simplification + micro carve-out) was named as the conservative win.
- **[[CORE-042.4]]** status source-of-truth (Thrust C close) — dropped Phase 4 box 6 (nav-chip update) and rewrote SPEC §"Tasknote body shape" so the chip is render-derived. Captures a piece of §A9's "deduplicate Phase 4" win.
- **[[CORE-042.5]]** micro-tasknote (Thrust B ship) — captures §A9's "ceremony for non-code tasks" win via a separate `/micro-task` template + skill, not a phase-shape change. Explicitly named [[CORE-042.6]] in its `related-tasks:` as the propose-half sibling.

All other archive hits (CORE-004 through CORE-040) consume the 4-phase shape but don't reshape it. No surprise findings.

### B1. Drift check vs §A9

| §A9 claim | Now | Drift? |
|---|---|---|
| 4-phase total: 21 boxes (P1=7 + P2=4 + P3=4 + P4=6) | P1=7 + P2=4 + P3=4 + **P4=5** = **20 boxes** | YES — CORE-042.4 dropped P4 box 6 (nav-chip) |
| `viz/src/tasknote.ts:135` hardcodes `[1,2,3,4]` | Same code, now at **`:128`** (CORE-042.3 removed `priority`/`area` parsing → 7-line shift) | LINE-ONLY drift; behavior unchanged |
| Frontmatter has 8 fields | **6 fields** post-CORE-042.3 (`title / status / tags / created / due / related-tasks`) | YES — orthogonal to phase rethink, but worth noting for closure-write count |
| `SPEC.md` 4,014w; per-`/task` 11,702w | `SPEC.md` **2,980w** (Thrust A modularized + ~300w of post-A additions for micro carve-out); `claude/skills/task/SKILL.md` **2,410w** (was 2,319w, +91w for module-dispatch language); PLAN.md **5,745w** (was 5,369w, +376w of `.2`/`.3`/`.4`/`.5` close summaries). Per-`/task` **~11,135w** for fresh-task; epic-subtask branch adds `SPEC/epic.md` (303w) → **~11,438w** | Net per-`/task` saving on fresh-task branch is **~567w (~5%)**, lower than CORE-042.2's claimed ~10% — PLAN.md grew while SPEC shrunk |
| §A9 "micro-tasks can drop irrelevant gates without inventing a new template" (continuous-flow pro) | CORE-042.5 invented a separate template anyway | YES — this §A9 pro is invalidated; the inventory cost the pro warned against was paid via /micro-task |
| §A9 named non-negotiable contracts: relevance, drift, archive skim, pattern survey | All four still present in 4-phase (P1 boxes for first three; P2 box for pattern survey) and in micro template (bold-prefix prompts) | No drift |

**Key drift:** §A9's 4-phase box total of 21 is stale; the actual current count is **20**. The continuous-flow alternative was sized at "~16 gates" by deduplicating the 21. With the deduplication CORE-042.4 already landed, the 4-phase count moved closer to the continuous-flow target by one box on its own — the gap shrunk from 5 boxes (21→16) to **4 boxes (20→16)**.

### B2. Hybrid landings: which §A9 wins are captured?

Mapping §A9's listed continuous-flow pros against post-hybrid reality:

| §A9 pro | Status | Notes |
|---|---|---|
| "Less ceremony" | **Partially captured** | Phase 4 -1 box (CORE-042.4); /micro-task -all-but-one section for trivially small tasks (CORE-042.5). Full-tasknote 4-phase still 20 boxes. |
| "Gates appear in cognitive order (no jumping back to P4 after P3 fix)" | **Not captured** | P4 still has "Verified all prior phases complete" + "Recapped" — both arguably out-of-order with mid-flow fixes. Untouched by hybrid. |
| "Micro-tasks can drop irrelevant gates without inventing a new template" | **Invalidated** | /micro-task IS a new template. The §A9 pro assumed continuous-flow's flat list would obviate it; instead, hybrid paid the new-template cost explicitly. |
| "Non-code tasks naturally skip lint/test gates" | **Captured** | /micro-task's `## ⚡ Notes` covers the audit/doc-patch case. Full-tasknote case still has P3 4 boxes regardless of code change. |
| "Phase 4 ceremony reduces" | **Partially captured** | -1 box already; P4 still has 5 boxes. Box 1 ("Verified all prior phases complete") and box 5 ("Recapped") are arguably the next-weakest deduplication candidates. |

§A9's listed cons against post-hybrid reality:

| §A9 con | Status | Notes |
|---|---|---|
| "Viz refactor needed (no `[1,2,3,4]` indexing)" | **STILL TRUE** | Confirmed at `viz/src/tasknote.ts:128`. CORE-042.5 already noted /micro-task triggers the same indexing pain (0/0 phases → "Phase 4 active" rendering bug). Viz cost is now *higher* — affects both /micro-task AND a hypothetical continuous-flow rewrite. |
| "Archive consistency — 25+ archived 4-phase tasknotes" | **WORSE** | Now ~32 archived in `core/` alone (after .1-.5 closures). Write-once policy still preserves them but the inconsistency between archive and active grows. |
| "AI deterministic driving — phase boundaries gate behavior" | **STILL TRUE** | task SKILL.md Step 4 still says "Do not enter Phase 2 until every Phase 1 box is ticked"; modular dispatch via SPEC/epic.md / starter.md / blocked.md doesn't change this. |
| "Hybrid captures most of the win" | **Partially confirmed** | Hybrid captured 2-of-5 pros fully + 2 partially + 1 invalidated. The "cognitive-order" pro (the most distinctive continuous-flow benefit) is not yet captured. |

### B3. Residual continuous-flow gain

**4-phase post-CORE-042.4 (20 boxes):**

P1 (7): PLAN review · Relevance · Read sources · Archive skim · Drift check · Clarifying Qs · Populate subtasks.
P2 (4): Pattern survey · Implement · Update tests · Run targeted tests.
P3 (4): Targeted suite · Lint/typecheck · Visual confirmation · Fixed introduced issues.
P4 (5): Verify prior phases · Update docs · Update PLAN · Archive · Recap.

**Continuous-flow target (§A9-style ~16 gates):**

PLAN review · Relevance · Read sources · Archive skim · Drift check · Clarifying Qs · Populate subtasks · Pattern survey · Minimal implementation · Tests added/updated · Targeted tests pass · Lint/typecheck pass · Visual confirmation (fe only) · Docs/inventories updated · PLAN flipped + archived · Recap with user. = **16 gates**.

Deduplication that yields 16 from 20:
1. Drop P3 box 4 "Fixed all introduced issues" (an outcome, not a step; if a box is failing it's not done)
2. Merge P2 box 4 "Ran targeted tests on changed files" with P3 box 1 "Ran targeted test suite for changed code" (currently both exist; the §A9 list collapses to one)
3. Drop P4 box 1 "Verified all prior phases complete" (redundant: if you can't tick the P4 closure boxes, prior phases aren't complete)
4. Merge P4 boxes 3+4 "Updated PLAN" + "Moved tasknote to archive" into one closure step (they always happen together)

**Net residual gain post-hybrid: 4-box reduction (20 → 16; ~20%)**, all from deduplicating redundant boxes within the existing phase shape — no shape change required.

This is a material insight: the §A9 "continuous-flow with named gates" alternative's actual win is concentrated in **deduplication**, not in the shape change. The cognitive-order pro (the only structurally distinctive benefit) is real but small in practice — Phase 1→2→3→4 already tracks cognitive flow for code-changing tasks; only the P4-box-1 / P3-box-4 reorderings are notable.

### B4. Costs of three candidate shapes

| Shape | Viz cost | Archive cost | AI-driving cost | Net |
|---|---|---|---|---|
| **A. Surgical 4-phase trim** (drop the 4 redundant boxes; phase shape unchanged) | None — `[1,2,3,4]` indexing intact; box-level checklist counting already tolerates varying counts per phase | None — archive parses fine; only adds noise on the "P4 has 4 boxes vs 5" axis (per-tasknote-revision drift, not shape drift) | None — Phase boundaries unchanged; SKILL Step 4 wording unchanged | **Cheap; small win (-4 boxes)** |
| **B. Continuous-flow flat list** (rewrite template + skill) | High — viz refactor; affect /micro-task too | High — 32 archived tasknotes parse with old shape; growing | Medium — SKILL must rewrite phase-gating language | **Expensive; medium win (-4 boxes + cognitive-order)** |
| **C. Status quo (no change)** | None | None | None | **No-op; preserves option for later** |

### B5. Recommendation: SHIP shape A (surgical trim) — close .6 with no further Discovery

**Rationale:**

1. The actual win in §A9's continuous-flow alternative is **deduplication of redundant boxes**, not the shape change. Shape A captures all 4 deduplication wins at zero viz/archive/SKILL cost.
2. The shape change's distinctive benefit (cognitive-order traversal) is real but small — Phase 1→2→3→4 already tracks cognitive flow for code-changing tasks; the P4-box-1 and P3-box-4 reorderings are both captured by Shape A's deduplication anyway.
3. Costs of Shape B haven't moved (viz refactor still required) and one cost grew (archive consistency: 25→32 tasknotes since .1 was filed). The ratio of cost-to-residual-win has worsened, not improved.
4. The §A9 PROPOSE decision was made *anticipating* the hybrid would capture most of the win. Post-hybrid, the residual is small enough that even Shape A is borderline-worth-shipping, and Shape B is clearly not.
5. /micro-task already absorbed the population of tasks where 4-phase ceremony was wasteful (audits, doc patches, single-file tweaks). Full-tasknote ceremony exists for tasks that genuinely benefit from the structure.

**Proposal:** Ship Shape A as a single new child task (**CORE-042.7** — 4-phase dedup) under [[CORE-EPIC-042]], filed *between* the current .6 and the audit (which renumbers .7 → .8 per [[CORE-042.1]] precedent for keeping audit at the highest number). Shape A is small enough that one task covers it: edit SPEC §"The 4-phase workflow" (4 box edits) + edit `templates/tasknote-template.md` (4 box edits) + verify viz tests pass (no parser change expected). SPEC patch bump (clarification only — no archived tasknote becomes invalid; no adopter workflow breaks). Estimated effort: ~30-45 minutes; well under the threshold for a `/micro-task`.

If user prefers conservative close: file Shape A as a Future-Opportunities marker instead of a child, leaving the four redundant boxes in place and accepting that the audit task (.7) will visit them in due course.

### B6. Non-negotiable contracts survival check

Confirmed all four contracts survive in any candidate shape:

| Contract | 4-phase | Shape A (surgical trim) | Shape B (continuous-flow) | /micro-task |
|---|---|---|---|---|
| Relevance Assessment | P1 box 2 | unchanged | gate 2 | bold-prefix prompt |
| Drift check | P1 box 5 | unchanged | gate 5 | bold-prefix prompt |
| Archive skim | P1 box 4 | unchanged | gate 4 | bold-prefix prompt |
| Pattern survey | P2 box 1 | unchanged | gate 8 | bold-prefix prompt |

No shape change endangers any of the four. Safe to ship.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed [[CORE-042.1]]'s epic-Discovery Phase 2 shape: deliverable is filed children in PLAN.md, not code. Same audit-renumber move ([[CORE-042.1]] renumbered audit .2 → .7 to keep it highest-numbered; this task renumbers audit .7 → .8 for the same reason). Section-anchor citation to §B in PLAN long descriptions (akin to .1's §A2/§A5 references) wasn't needed — the Shape A line is self-contained at 44w.
- [x] Implemented the minimal solution — filed `**CORE-042.7** [opus] | 4-phase dedup` between .6 and audit; renumbered audit `.7 → .8` (and updated audit's "follow-ups as .8+" → ".9+" inline reference).
- [x] Updated/added tests for non-trivial behavior — n/a (no code change; this is an epic-Discovery filing task)
- [x] Ran targeted tests on changed files — n/a (no code change)

**Implementation Notes:**

PLAN.md final state under `## Medium`:

| Line | ID | Status |
|---|---|---|
| 22 | CORE-EPIC-042 | open (parent epic; stays open per SPEC §"Epic lifecycle") |
| 23 | CORE-042.1 | [x] discovery (closed) |
| 24 | CORE-042.2 | [x] SPEC modularization (closed) |
| 25 | CORE-042.3 | [x] frontmatter audit (closed) |
| 26 | CORE-042.4 | [x] status source-of-truth (closed) |
| 27 | CORE-042.5 | [x] micro-tasknote (closed) |
| 28 | CORE-042.6 | [x] phase rethink Discovery (this task; flipped at closure) |
| 29 | CORE-042.7 | [ ] 4-phase dedup (NEW; Shape A) |
| 30 | CORE-042.8 | [ ] audit (was .7; renumbered) |

Both edits in one Edit call replacing the audit line with the new .7 + renumbered .8 lines.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (no code changed; epic-Discovery task)
- [x] Ran lint/type-check on changed code — n/a (no code changed)
- [x] (frontend) Asked the user for visual confirmation — n/a (no UI change)
- [x] Fixed all introduced issues — n/a

**Testing Notes:** Audit-shape Phase 3 pass-through; mirrors [[CORE-037]] / [[CORE-042.1]] structure. Sanity check: `grep CORE-042 _project/PLAN.md` confirms 8 lines (epic + 7 subtasks) all under priority `## Medium`; numbering monotonic .1→.8 with audit at the highest.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — PLAN.md updated: filed CORE-042.7 (Shape A — 4-phase dedup), renumbered audit .7 → .8 (with internal ".8+" → ".9+" follow-up reference); flipped CORE-042.6 to `[x]` in place under the epic per subtask-closure convention. Parent epic line stays open per SPEC §"Epic lifecycle".
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-042.6 was Thrust B's "propose" half — revisit the §A9 4-phase-vs-continuous-flow side-by-side from a post-A/post-C/post-B-half vantage and decide ship/propose/close. **Decision: SHIP Shape A (surgical 4-box dedup) as a new child** — filed as CORE-042.7; audit renumbered .7 → .8 to keep it highest-numbered per [[CORE-042.1]] precedent.

**Drift findings vs §A9 (logged in §B1):**

- 4-phase total is **20 boxes**, not 21 — CORE-042.4 already dropped P4 box 6 (nav-chip).
- `viz/src/tasknote.ts:135` → now `:128` (line drift only; `[1,2,3,4]` indexing unchanged).
- Frontmatter shrunk to 6 fields (CORE-042.3); orthogonal but worth noting for the closure-write count.
- Per-`/task` total now ~11,135w (fresh-task) / ~11,438w (epic-subtask) — net ~5% saving vs §A1's 11,702w baseline. PLAN.md grew (+376w of close summaries) while SPEC shrunk (-1,034w via Thrust A); the saving is real but smaller than CORE-042.2's claimed 10%.
- §A9's "continuous-flow lets micro-tasks drop irrelevant gates without inventing a new template" pro is **invalidated** — CORE-042.5 invented a separate template anyway.

**Post-hybrid survey (logged in §B2-B4):**

The actual residual win in §A9's continuous-flow alternative reduces to **deduplicating 4 redundant boxes** within the existing phase shape — no shape change required:

1. Drop P3 box 4 "Fixed all introduced issues" (an outcome, not a step)
2. Merge P2 box 4 "Ran targeted tests on changed files" with P3 box 1 "Ran targeted test suite for changed code" (currently both exist)
3. Drop P4 box 1 "Verified all prior phases complete" (redundant: if you can't tick the P4 closure boxes, prior phases aren't complete)
4. Merge P4 boxes 3+4 "Updated PLAN" + "Moved tasknote to archive" (always happen together)

Net: 20 → 16 boxes (~20% reduction). Cognitive-order traversal (§A9's only structurally distinctive continuous-flow benefit) is real but small in practice — Phase 1→2→3→4 already tracks cognitive flow for code-changing tasks.

**Costs of the full shape change (Shape B) haven't moved or have worsened:**

- Viz refactor still required (`[1,2,3,4]` indexing at `viz/src/tasknote.ts:128`); plus /micro-task already triggers the same indexing pain (parallel to CORE-042.5's filed FE follow-up candidate).
- Archive consistency: 25→32 archived 4-phase tasknotes since CORE-042.1 was filed; growing.
- AI deterministic-driving cost unchanged.

**Why ship Shape A specifically:**

| Shape | Viz cost | Archive cost | AI-driving cost | Win | Verdict |
|---|---|---|---|---|---|
| A. Surgical trim | None | None | None | -4 boxes | **Ship** |
| B. Continuous-flow flat list | High | High (grows) | Medium | -4 boxes + cognitive-order | Skip — costs >> distinctive win |
| C. Status quo | None | None | None | 0 | Skip — leaves uncontested dedup wins on the table |

Shape A captures all 4 deduplication wins at zero viz/archive/SKILL cost. Shape B's distinctive benefit (cognitive-order) is small enough that the cost ratio worsens, not improves, post-hybrid.

**Non-negotiable contracts confirmed (§B6):** all four (relevance, drift, archive skim, pattern survey) survive in Shape A unchanged — none of the dropped/merged boxes touch them.

**Method note:** This Discovery's value was almost entirely in the drift-check and post-hybrid re-sizing — the §A9 PROPOSE recommendation anticipated that the hybrid would capture most of the win, and the survey confirmed it did. The residual is small enough to ship as a single trim task rather than a structural rewrite.

**Children filed (PLAN.md lines 29-30):**

| ID | Title | Notes |
|---|---|---|
| CORE-042.7 | 4-phase dedup | NEW — Shape A; surgical trim per §B5 |
| CORE-042.8 | audit | Was .7; renumbered to keep highest |

**Out-of-task items (recorded but not filed):**

- Continuous-flow flat list (Shape B) — formally rejected per §B4-B5 cost/win ratio. Not filed as Future Opportunities; the case for it has weakened, not strengthened, post-hybrid.
- Viz `[1,2,3,4]` phase indexing refactor — already implicit in the existing FE follow-up candidate from CORE-042.5 (micro tasknotes show "Phase 4 active"); Shape A doesn't change phase counts, so no new pressure.

**Archived:** 2026-05-06
