---
title: workflow token-cost audit
status: completed
priority: Future Opportunities
area: core
tags: []
created: 2026-05-05
due:
related-tasks: [CORE-036, CORE-038, CORE-039, CORE-040, CORE-041]
---

# CORE-037 | workflow token-cost audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-036]] [[CORE-038]] [[CORE-039]] [[CORE-040]] [[CORE-041]]

## 🎯 Goal

Measure where the flowtron workflow itself inflates AI context and produce a ranked list of trim candidates, each filed as a follow-up implementation task.

## ✅ Acceptance

- [ ] Per-file token counts gathered for every workflow surface that loads into AI context (PLAN.md, SPEC.md, project + workspace CLAUDE.md, `.claude/skills/task/SKILL.md`, `templates/tasknote-template.md`, in-flight tasknote bodies)
- [ ] Ranked list of high-cost / low-value content identified, with concrete trim proposals
- [ ] Each trim candidate filed as a separate follow-up task in PLAN.md
- [ ] Discovery findings (counts + rankings + rationale) recorded in this tasknote

## 🧩 Subtasks

- [ ] Read PLAN.md in full; identify section-level trim candidates
- [ ] Read SPEC.md in full; identify section-level trim candidates
- [ ] Read `.claude/skills/task/SKILL.md` in full; identify section-level trim candidates
- [ ] Read global + workspace `CLAUDE.md`; identify trim candidates
- [ ] Read `templates/tasknote-template.md`; identify trim candidates
- [ ] Compose ranked candidate list (cost × load-frequency × trim-ease) with one-line proposals
- [ ] Walk the ranked list with user; capture approvals / drops / re-prioritizations
- [ ] File approved candidates as PLAN.md task lines

## 🔗 Related

- [[CORE-036]] — PLAN.md Completed-section archive strategy (now a starter; converted by this audit's dogfood pass)
- [[CORE-038]] — task SKILL.md cite-don't-restate (filed by this audit; starter)
- [[CORE-039]] — SPEC.md prose tightening sweep (filed by this audit; starter)
- [[CORE-040]] — PLAN.md filing discipline + starter conversion sweep (filed post-closure on user's structural prompt)
- [[CORE-041]] — dynamic-index direction marker (filed post-closure for future exploration)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Brief is concrete with six named surfaces and a well-defined deliverable (per-file counts + ranked trim candidates). Initial sizing confirms the cost is real: PLAN.md (4,459 words) + SPEC.md (4,319 words) + task SKILL.md (2,653 words) total ~11.4k words loading on every `/task` invocation. Worth measuring and trimming.

- [x] Read relevant source files
- [x] **Drift check** — all six named surfaces exist at the cited paths; CORE-036 confirmed in PLAN.md as a related antecedent. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Initial sizing (drift-checked):**

| Surface | words | lines | bytes | load behavior |
|---|---|---|---|---|
| `_project/PLAN.md` | 4,459 | 86 | 35,104 | per `/task` invocation; frequent ad-hoc reads |
| `SPEC.md` | 4,319 | 643 | 28,526 | per `/task` invocation |
| `.claude/skills/task/SKILL.md` | 2,653 | 184 | 17,274 | per `/task` invocation |
| `~/.claude/CLAUDE.md` (global) | 465 | 40 | 3,060 | every conversation |
| `templates/tasknote-template.md` | 338 | 80 | 2,016 | per scaffold (rare) |
| `~/code/CLAUDE.md` (workspace) | 209 | 21 | 1,475 | every conversation in `~/code/` |
| in-flight tasknote bodies | varies | — | — | per task continuation |

**Two-axis cost model:** size × load-frequency.
- Always-loaded (CLAUDE.md pair) is small in absolute terms (~674 words combined) — every-conversation cost but low ceiling.
- Per-`/task` surfaces (PLAN.md + SPEC.md + task SKILL.md, ~11.4k words) load on every workflow invocation — biggest absolute bulk.
- Template + tasknote bodies load per continuation; template is the floor that propagates into every new tasknote.

**Assumptions logged (per AskUserQuestion answers):**
- Token counts: word-count + bytes/4 heuristic; no real tokenizer.
- Audit depth: section-level (specific headings/blocks per surface, with one-line trim proposal each).
- Filing: propose-then-file — ranked list lives in this tasknote first; only user-approved candidates land in PLAN.md.
- CORE-036 overlap: PLAN.md `## Completed` section trim is already filed as CORE-036; will note it as covered and avoid duplicating.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a for an audit task; the "implementation" is the audit deliverable itself, not code
- [x] Implemented the minimal solution — full read of all six surfaces, candidates identified
- [x] Updated/added tests for non-trivial behavior — n/a (no code change)
- [x] Ran targeted tests on changed files — n/a (no code change)

**Implementation Notes:**

### Per-section findings

**PLAN.md (4,459 words)** — `## Completed` section is 41 entries, ~3,200 words = **~78% of PLAN.md**. Many entries are 200-450-word paragraphs duplicating their archived tasknote summaries. Active sections (Critical / High / Medium / Future) are ~1,200 words and load-bearing — trim risk too high. **One trim site, already filed as CORE-036.**

**SPEC.md (4,319 words)** — multiple section-level candidates:
- §Epic lifecycle (lines 74-131, ~580w): worked example + 5-step lifecycle + Audit-follow-ups Few/Many branches + apply/skip prose. Collapsible to ~250w.
- §Long-description conventions (lines 167-202, ~340w): the "matches the wikilink style introduced in §Tasknote body shape — adopting projects with markdown-vault tooling get cross-references for free" framing is positioning, not contract.
- §Tasknote frontmatter / §Tasknote body shape / §Model field — each contains a "write-once policy for archived tasknotes" or "Pre-v0.2.0 retired field" note. Three variants of the same statement; consolidate.
- §Starter tasknotes (lines 296-298): "Starters are filed selectively..." duplicates §When to use a tasknote.
- §The 4-phase workflow Phase 1 prose (lines 368-380, ~150w): Re-scope/De-scope/drift detail already canonical in §Blocked tasks.
- §Blocked tasks Viz interaction (lines 503-513, ~80w): describes independent rendering — collapsible to one sentence.

**`.claude/skills/task/SKILL.md` (2,653 words)** — substantial duplication of SPEC contracts:
- Step 3b (lines 101-128, ~440w): restates YAML frontmatter field semantics + body section semantics already in SPEC §Tasknote frontmatter / §Tasknote body shape.
- Step 4 (lines 140-154, ~290w): restates the Phase 1 checklist + Re-scope/De-scope/drift behavior already in SPEC §4-phase workflow / §Blocked tasks.
- Step 6 (lines 164-178, ~200w): post-closure 1/2/3 nearly verbatim from SPEC §Post-closure protocol; skill-specific value-add is only the "one continuous flow / commit-go is the gate" guidance.

**`templates/tasknote-template.md` (338w)** — checklists are load-bearing (each is a real workflow step). The "**Discovery Notes:** / **Implementation Notes:** / **Testing Notes:**" empty placeholders propagate into every new tasknote (~60 chars × 4 phases × every tasknote). Removing them and relying on free-form text under phase headers would save tokens at the floor — but the placeholders signal *where* to write, useful for AI consumption. Marginal at best; not a strong candidate.

**`~/.claude/CLAUDE.md` (465w)** — already lean. No section-level trim candidates.

**`~/code/CLAUDE.md` (209w)** — already lean. The §Tech Stack Tendencies block is positioning, but savings are negligible.

**In-flight tasknote bodies** — variable; per-tasknote cost dominated by AI-authored Discovery/Execution notes, not template floor. No structural trim — this is task-author discipline.

### Ranked trim candidates

Ranking axis: **per-load savings × load frequency × trim ease**. SPEC.md and SKILL.md load on every `/task` invocation; CLAUDE.md pair loads every conversation; template loads per fresh scaffold; PLAN.md loads frequently in workflow contexts.

| # | Surface | Target | ~Words saved | Load freq | Ease | Notes |
|---|---|---|---|---|---|---|
| 1 | PLAN.md | `## Completed` archive strategy | ~3,200 | high | hard | **Already filed as CORE-036** |
| 2 | SKILL.md | Steps 3b + 4 + 6 — cite SPEC instead of restating procedural contracts (frontmatter fields / Phase 1 checklist / post-closure 1-2-3) | ~500-580 | per-`/task` | medium | Single coherent task; biggest non-CORE-036 win |
| 3 | SPEC.md | §Epic lifecycle compress (collapse worked example, tighten Audit follow-ups, drop apply/skip pair) | ~330 | per-`/task` | medium | Concentrated in one section |
| 4 | SPEC.md | Prose tightening sweep: §Long-description conventions positioning + §Tasknote frontmatter "write-once policy" + §Starter selective-filing duplicate + §4-phase Phase 1 prose + §Blocked Viz interaction + §Model field tail (consolidate "write-once policy" + drop pre-v0.2.0 retired-field note) | ~330-410 | per-`/task` | easy | Mechanical bundle; one task with multiple small edits |
| 5 | template | Drop "**Discovery Notes:** / **Implementation Notes:** / **Testing Notes:**" empty placeholders | ~10-20 per tasknote | per-scaffold | trivial | Marginal; bundle into a future template revision if anything else accrues |

### Proposed filing

**Two follow-up tasks** (not five — bundling avoids the very PLAN.md churn we're auditing):

- **CORE-038 [opus] | task SKILL.md cite-don't-restate** — Compress `.claude/skills/task/SKILL.md` Steps 3b, 4, and 6 by replacing duplicated SPEC contracts (YAML frontmatter field semantics, Phase 1 checklist behavioral notes, post-closure protocol enumeration) with concise citations to the SPEC sections that already define them. Preserve skill-specific value-add (the "continuous flow / commit-go is the gate" guidance in Step 6, the four-way file-state branch summary in Step 2). Estimated savings: ~500-580 words. Loads on every `/task` invocation.

- **CORE-039 [opus] | SPEC.md prose tightening sweep** — Compress `SPEC.md` across six small sites: (1) §Epic lifecycle worked-example + audit-follow-ups branch + apply/skip pair (~330w), (2) §Long-description conventions positioning paragraph (~80-100w), (3) consolidate "archived tasknotes are write-once" policy currently mentioned in §Tasknote frontmatter, §Tasknote body shape, and §Model field into one canonical statement (~30-50w + drift safety), (4) drop §Starter tasknotes selective-filing paragraph (lines 296-298, duplicates §When to use a tasknote, ~30w), (5) compress §The 4-phase workflow Phase 1 prose to cite §Blocked tasks (~80w), (6) compress §Blocked tasks Viz interaction subsection to one sentence (~50w). Estimated savings: ~600-700 words. Bumps SPEC patch version (clarification only). Loads on every `/task` invocation.

**Plus already-filed:** CORE-036 covers PLAN.md `## Completed` archive strategy.

**Total estimated savings:** ~1,100-1,300 words trimmed from per-`/task` context surfaces (≈10-12% of the ~11,400-word per-task load), independent of CORE-036.

**Out of scope (ruled out by audit):**
- CLAUDE.md pair (global + workspace) — already lean; trim opportunities <30 words combined.
- Template — checklists are load-bearing; placeholder removal is marginal (~10-20w/tasknote).
- In-flight tasknote bodies — variable cost is task-author authoring, not structural floor.
- Active PLAN.md task descriptions — load-bearing for upcoming-work Discovery; trim risk too high.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (audit task; no code changed)
- [x] Ran lint/type-check on changed code — n/a (no code changed)
- [x] (frontend) Asked the user for visual confirmation — n/a
- [x] Fixed all introduced issues — n/a

**Testing Notes:** Audit task — no code, no tests, no lint targets. Phase 3 is a structural pass-through.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — PLAN.md updated: filed CORE-038 + CORE-039 under Future Opportunities; flipped CORE-037 to Completed
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-05`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Measured all six per-`/task` and always-loaded surfaces. The big three (PLAN.md 4,459w + SPEC.md 4,319w + task SKILL.md 2,653w) total ~11,400 words loading on every `/task` invocation — that's where 95%+ of the trim-able cost lives. The always-loaded CLAUDE.md pair (~674w combined) is already lean.

Filed two coherent follow-up tasks under Future Opportunities (per user direction; bundling avoids creating the PLAN.md churn the audit is trying to fix):

- **[[CORE-038]]** — task SKILL.md cite-don't-restate (Steps 3b/4/6 cite SPEC instead of duplicating contracts). ~500-580w savings.
- **[[CORE-039]]** — SPEC.md prose tightening sweep across six small sites (Epic-lifecycle compress + Long-description-conventions positioning + write-once-policy consolidation + Starter-selective-filing duplicate + Phase-1-prose tighten + Blocked-Viz-interaction collapse). ~600-700w savings; patch version bump.

PLAN.md `## Completed` section trim is already filed as [[CORE-036]] and was excluded from the audit's new candidates to avoid double-filing.

**Out-of-scope per audit findings:**
- CLAUDE.md pair (global + workspace) — already lean; trim opportunities <30w combined
- Template checklists — load-bearing (each item is a real workflow step)
- Active PLAN.md long descriptions — load-bearing for upcoming-work Discovery
- In-flight tasknote bodies — variable cost is author-driven, not structural

**Total estimated savings if both follow-ups land:** ~1,100-1,300w off every `/task` load (≈10-12%) independent of CORE-036.

Key methodological decisions (per AskUserQuestion in Phase 1): word-count + bytes/4 heuristic over real tokenizer (relative ranking sufficed); section-level audit depth over surface-level or line-level; propose-then-file rather than file-all-direct (validated value — reduced 5+ candidates to 2 bundled tasks during user review).

### Post-closure scope expansion

After the closure recap, the user pushed back on a load-bearing audit decision: I had marked active PLAN.md long descriptions as out-of-scope on the grounds that they're load-bearing for Discovery. The user correctly identified this as a structural miss — the context CAN be load-bearing somewhere other than PLAN.md (specifically, in starter tasknotes, the v0.4.0 mechanism shipped via [[CORE-027]] / [[CORE-028]] / [[FE-006]]). SPEC.md §"When to use a tasknote" already has the rule ("File a starter when... captured context would bloat the PLAN.md long description"), but it's qualitative and being violated — including by this audit's own filings of CORE-036 / CORE-038 / CORE-039 with 100-300w inline prose.

Three actions taken in response (all in this same closure commit):

1. **Filed [[CORE-040]]** — sharpens SPEC threshold to a hard rule (≤50w target / 70w cap → starter), updates `/starter-task` + `/task` skills to flag long filings at filing time, sweeps existing PLAN.md entries for outliers above threshold. Patch version bump.
2. **Filed [[CORE-041]]** — Future-Opportunities marker for the dynamic-index direction (Dataview-style frontmatter queries / DB-backed index). Pre-decision capture; not a near-term task.
3. **Dogfooded the convention** — converted [[CORE-036]] / [[CORE-038]] / [[CORE-039]] from inline-prose long descriptions to starter tasknotes. PLAN.md lines now ≤50w each; rich implementation context lives in `_project/tasknote/CORE-036.md` / `CORE-038.md` / `CORE-039.md` until promoted at `/task` checkout.

**Methodological lesson:** the audit was correct in its measurements but framed "load-bearing" too narrowly — "load-bearing for X" doesn't mean "must live in surface Y." Future audits should test each "out of scope" rationale by asking *where the load-bearing content could plausibly live instead*. Rotating context off PLAN.md into starters preserves the load-bearing property while shrinking the per-workflow-read cost.

**Other AI-harness comparison** (for context, recorded for future reference): GitHub Issues / Linear / Jira list views are the closest analog — title + short description in the index, full body on click. PKM tools (Obsidian Dataview, Logseq) compose the index dynamically from per-page frontmatter. SQLite / DB-backed indexes were considered and ruled out at this scale (violates SPEC §"What flowtron does NOT provide"; markdown's diff-as-audit-trail property doesn't translate; viz already solves query-shaped problems at the UI layer). Dynamic-index direction filed as [[CORE-041]] for if/when scale demands it.

**Archived:** 2026-05-05
