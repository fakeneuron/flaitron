---
title: spec-token-refresh
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097, CORE-049, CORE-109]
---

# CORE-097.4 | spec-token-refresh

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-097]] · [[CORE-049]]

## 🎯 Goal

Run a **Terse pass** on `SPEC.md` (the per-`/ft-task` always-loaded core, 5,426w at HEAD; +70% since CORE-049): find a *bit* of token savings on the heaviest sections, file trim candidates as PLAN.md follow-ups individually or bundled per CORE-049 precedent. Caveman's 46% benchmark is loose inspiration, not a target.

## ✅ Acceptance

- [ ] Per-section word counts captured for `SPEC.md` HEAD with growth deltas vs the CORE-049 close baseline (3,181w on 2026-05-08); top heavy hitters identified
- [ ] Section-level review of the top heavy hitters with terse-pass candidates noted (cite-don't-restate, structural compression à la CORE-039 R2, prose tightening, further lazy-module decomposition where contract allows)
- [ ] Ranked terse-pass candidate list with per-candidate one-line proposal + estimated savings + readability/contract tradeoff
- [ ] Candidate list surfaced to user via AskUserQuestion; approvals / drops / re-prioritizations / bundling preference (individual tasks vs single bundled task) captured
- [ ] User-approved candidates filed in PLAN.md as follow-ups (individual or bundled per CORE-049 precedent), or "no meaningful trim" recorded with rationale and tasknote closed cleanly
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs": typically no AI-referenced doc updates from a pure-audit filing (per CORE-049 precedent); the audit itself doesn't touch contract surfaces

## 🧩 Subtasks

- [ ] Section-level review of the four heaviest SPEC.md sections (4-phase workflow 1,505w · when-to-use 1,052w · post-closure protocol 948w · task-line format 505w); note per-site terse-pass candidates with technique and estimated savings
- [ ] Section-level scan of medium-weight sections (Phase 4 Closure ~266w · Working in flowtron repo 211w · Tasknote frontmatter 175w · others) for any obvious wins; mark anything else as out-of-scope diminishing-returns
- [ ] Cross-cutting check: legacy-parse parentheticals, repeated wikilink-grammar prose, example blocks — common candidates from CORE-049 / CORE-039 precedent
- [ ] Compose ranked candidate list (estimated savings · ease · readability tradeoff)
- [ ] Surface candidate list via AskUserQuestion; capture approvals + bundling preference
- [ ] File approved candidates in PLAN.md (individual or single bundled task, user's call) or record "no meaningful trim" verdict
- [ ] Phase 4: doc-drift sweep · flip PLAN line to stub form · archive tasknote

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill-survey: adopt patterns from comparable AI-coding workflow repos)
- [[CORE-049]] — precedent for the SPEC.md trim audit (sibling-task pattern; filing/bundling convention for trim candidates)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-049 (2026-05-08) closed SPEC.md at 3,181w with a "diminishing returns; not worth filing" verdict on a round-3 sweep (~80-150w remaining). SPEC.md is now **5,426w at HEAD (+2,245w / +70%)** — accretion concentrated in `## The 4-phase workflow` (1,505w; operator-gate cues, exit gate, recap-only callout, Phase 4 closure ops), `## When to use a tasknote` (1,052w; decision-tree for tasknote/starter/follow-up/micro-task variants + filing-discipline thresholds + `## Completed` archive convention), `## Post-closure protocol` (948w; new "Conditional skip rule" with deterministic signals + autonomous-commit motion + bundled approval motion), `## Task-line format` (505w; long-description conventions, wikilink rules). The "diminishing returns" verdict is no longer current; a fresh terse pass is warranted. Per user, scope is **SPEC.md only** and target is "save a bit of token" (loose) — not caveman's 46%.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Resolved scoping (from AskUserQuestion)

| Question | Answer |
|---|---|
| Audit scope | **SPEC.md only** — strict reading of "spec-token-refresh" / "SPEC.md token audit on the always-loaded core". `ft-task/SKILL.md` (now 2,270w, +375w since CORE-049) and lazy SPEC modules are out of scope here; CORE-097.7 audit can sweep broader if warranted |
| Caveman 46% framing | **Loose / aspirational only.** User: "we are just looking to save a bit of token. if we don't aim for the 46%, perhaps we should call it something different like Terse or something equivalent." Adopting **"Terse pass"** as the working name; caveman dropped from the recap framing |

### Naming decision

Working name for this audit is **Terse pass** (per user). Caveman benchmark is loose inspiration only; recap will report absolute words saved, not framed against the 46% target.

### Source files reviewed

- `SPEC.md` (5,426w at HEAD) — primary target; section-level word counts captured below
- `SPEC/epic.md` · `starter.md` · `blocked.md` · `model.md` · `versioning.md` — lazy modules; reviewed to confirm what's already decomposed out of SPEC core (out of scope for trim, but informs where further decomposition is or isn't possible)
- `claude/skills/ft-task/SKILL.md` — out of scope per user, but referenced because some sections currently in SPEC.md are SKILL-callable (e.g., operator-gate banner block)
- `_project/tasknote/README.md` §"AI-referenced docs" — Phase 4 closure sweep target list
- `_project/tasknote/archive/core/CORE-049.md` — precedent: methodology + ranked-list + propose-then-file shape
- `_project/tasknote/archive/core/CORE-097.1.md` / `.2.md` / `.3.md` — sibling Discovery (this task is P1.c) + already-landed adoptions (`/ft-stats`, `SPEC/*.md paths:` frontmatter)
- `_project/tasknote/archive/core/CORE-039.md` (R2 SPEC.md prose-tightening sweep, -596w across 9 sites) — precedent for structural compression technique (H3 → inline-bolded) without contract loss
- `_project/tasknote/archive/core/CORE-038.md` (-503w on task SKILL.md via cite-don't-restate) — precedent for citation-over-restatement
- `_project/tasknote/archive/core/CORE-042.x` — precedent for lazy-module decomposition (created the 5 SPEC modules in scope-isolation moves)

### SPEC.md section-level inventory (current HEAD)

| Section | Words | Δ vs CORE-049 close (est) | Notes |
|---|---|---|---|
| `## The 4-phase workflow` | **1,505** | +~800 since CORE-049 | Operator-gate cues, conditional exit gate, recap-only callout, Phase 4 closure ops detail — much of this is post-CORE-046 / CORE-047 / CORE-088 era content. Biggest single target. |
| `## When to use a tasknote (and when not to)` | **1,052** | +~600 since CORE-049 | Multi-variant decision tree (tasknote / starter / follow-up / micro-task) + filing-discipline thresholds + `## Completed` archive convention. Concentrated growth; lots of parallel-shape blocks. |
| `## Post-closure protocol` | **948** | +~700 since CORE-049 | New "Conditional skip rule" with deterministic signals (frontend / privileged-ops globs / perf narrative) + autonomous-commit motion + bundled approval motion + 🏁 state-marker. Mostly net-new since CORE-049. |
| `## Task-line format` | **505** | +~250 since CORE-049 | Long-description conventions (`[[ID]]` / `Blocked by`) + wikilink-grammar prose + multiple example blocks. |
| `## 🚀 Phase 4: Closure` (H3, surfaced as ## by awk via emoji prefix oddity — see note) | 266 | n/a (nested) | Actually inside `## The 4-phase workflow`; awk grouping artifact, not a real top-level section. |
| `## Working in the flowtron repo itself` | 211 | +~100 (paths: subsection from CORE-097.3) | Recent additions for SPEC-module frontmatter convention |
| `## Tasknote frontmatter` | 175 | minor | Write-once policy added; legacy-field carve-outs |
| `## Skill namespace` | 98 | minor | Adopter-MUST-NOT carveout added |
| `## Layout in adopting projects` | 92 | flat | Stable |
| `## Task ID convention` | 85 | flat | Stable |
| `## Core principles` | 80 | flat | Stable |
| `## What flowtron does NOT provide` | 79 | flat | Stable |
| `## Tasknote body shape` | 73 | flat (post-CORE-039) | Already trimmed |
| `## Priority levels` | 61 | flat | Stable |
| `## What is Flowtron` | 47 | flat | Stable |
| Pointers (Versioning · Starter tasknotes · Model field · Epic lifecycle · Blocked tasks) | 4 each | flat | Already lazy-loaded; can't trim further |

**Total:** 5,426w (vs 3,181w at CORE-049 close = **+2,245w / +70.6% over 10 days**).

> **Note on awk grouping:** the level-2 SPEC.md sections are detected via `^## ` regex. The "🚀 Phase 4: Closure" line surfacing in the awk output is a nested H3 inside `## The 4-phase workflow` that the grouping treats as a level break — its 266w is already counted inside the 1,505w 4-phase total. Reported here for transparency, not as an additional section.

### Archive skim findings

- **[[CORE-049]]** (workflow token audit, 2026-05-08) — direct precedent. Methodology: per-surface word counts, two-axis cost model (size × load-frequency), section-level review, ranked candidate list, propose-then-file with user review. Decided to file 3 individual starters (not a CORE-EPIC). Concluded SPEC.md round-3 wasn't worth filing then; that verdict is now stale given +2,245w growth.
- **[[CORE-039]]** (SPEC.md R2 prose-tightening, 2026-05-05) — -596w across 9 sites via structural compression (H3 → inline-bolded), redundant prose removal, codeblock self-documenting trims. Directly relevant technique catalog for this terse pass.
- **[[CORE-038]]** (task SKILL.md cite-don't-restate, 2026-05-05) — proven citation-over-restatement pattern (-503w). Less directly applicable to SPEC.md itself (SPEC is the citation target), but useful where SPEC.md duplicates content that should live in a single canonical home.
- **[[CORE-042.x]]** (lazy-module decomposition, 2026-05-06/07) — created the 5 SPEC modules currently lazy-loaded. Further decomposition into new lazy modules is possible for some heavy sections (e.g., `## Post-closure protocol` "Conditional skip rule" deterministic signals could lazy-load on closure), but adds cognitive load. Tradeoff to surface per-candidate.
- **[[CORE-097.1]]** (sibling Discovery, 2026-05-18) — ranked this task as P1.c "Medium cost (audit + targeted rewrites), Medium novelty (extends an established flowtron pattern)." Explicitly noted: "caveman strips explicit prose; flowtron's prose is intentional for AI cold-start" — informs why 46% is loose, not target.
- **[[CORE-097.3]]** (paths frontmatter, 2026-05-18) — added the `### Lazy SPEC module frontmatter` subsection to SPEC.md (~120w). Recently-added intentional contract; not a trim target.
- **[[CORE-088]]** + **[[CORE-097]] cohort and CORE-047 / CORE-046** — drove the operator-gate cues, autonomous-commit motion, recap-only callout — content concentrated in the three heaviest sections.

### Drift check

- `SPEC.md` exists at expected path · word count 5,426w at HEAD ✓
- CORE-049 baseline (3,181w on 2026-05-08) recoverable from the archived CORE-049 tasknote's Discovery Notes ✓
- All cross-referenced precedent tasknotes (CORE-049 / CORE-039 / CORE-038 / CORE-042.x / CORE-097.1 / .3) exist at `_project/tasknote/archive/core/` ✓
- Caveman repo reference inherited from CORE-097.1's Discovery; not re-verified here (user dropped 46% framing — no further verification needed) ✓
- Lazy SPEC modules currently loaded on edge cases — no overlap with always-loaded scope ✓

### Pre-write hypothesis (validated in Phase 2)

Three workstream shapes likely surface, in priority order:

1. **`## The 4-phase workflow` structural compression + cross-reference trim** — biggest target. Operator-gate cue prose, exit-gate branching, Phase 4 closure callout are bloat candidates. Estimated ~150-300w if CORE-039 R2 technique applied carefully.
2. **`## Post-closure protocol` "Conditional skip rule" tightening** — deterministic-signal lists carry many parallel-shape examples; recap-only / state-marker prose has restated context. Estimated ~100-200w; possible deeper structural move (lazy-load) if user accepts the cognitive-load tradeoff.
3. **`## When to use a tasknote` parallel-block compression** — four variant sub-decision-trees (tasknote / starter / follow-up / micro-task) share a "use when / skip when" shape. Estimated ~100-200w via uniform-shape tightening.

If none clear a useful threshold, close as "no meaningful trim." Bundling decision (3 individual tasks vs one bundled task) deferred to the user-walk step per CORE-049 precedent.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a for an audit task; the deliverable is the audit. Methodology mirrors [[CORE-049]]: per-section walk, ranked candidate list, propose-then-file with user review. Techniques drawn from precedent: cite-don't-restate ([[CORE-038]]) and structural compression / prose tightening ([[CORE-039]] R2).
- [x] Implemented the minimal solution — per-site terse-pass candidate inventory + ranked candidate list + bundling recommendation below
- [x] Updated/added tests for non-trivial behavior — n/a (audit; no code change)

**Implementation Notes:**

### Per-site terse-pass candidate inventory

Walked the four heavy sections site-by-site. Findings grouped into three tiers by risk/effort.

#### `## The 4-phase workflow` (1,505w — biggest section)

| Site | Tier | Est. savings | Technique | Notes |
|---|---|---|---|---|
| Operator-gate cues intro (lines 283-294) | A | ~35w | Prose tighten | "moments where the assistant pauses..." is definitional padding; cross-ref sentences can be more compact |
| "Preview line mandatory" paragraph (lines 310-315) | A | ~25w | Drop restated template content | The italicization + placement is already shown in the banner template directly above; only the "what belongs in preview vs recap" callout is novel |
| "Once Phase 1 closes..." paragraph (lines 317-328) | B | ~60w | Tighten cross-references | Heavy explainer of recap/bundle/skip flow; tightens cleanly with one compact paragraph |
| "Skill-level extensions" paragraph (lines 330-334) | A | ~20w | Trim final restatement | "UX layer ... not introduce new gates" closing is a restatement |
| Discovery archive-skim + drift-check explainers (lines 353-361) | B | ~45w | Merge parallel "X exists because..." paragraphs | Both follow the same shape; one merged sentence covers both |
| Discovery exit-gate prose (lines 363-386) | A | ~40w | Trim "marker is plain prose..." explainer | The codeblock + branch labels carry the contract; the closing explainer is restated context |
| Phase 2 blocked-resume paragraph (lines 399-403) | A | ~25w | Cite-don't-restate §"Blocked tasks" | Currently restates the parking mechanics; one-sentence cite + behavior suffices |
| Phase 3 visual-confirmation explainer (lines 416-423) | A | ~25w | Trim long example sentence + restated "no banner block, no gate" | Contract is already concise; example sentence is illustrative not normative |
| Phase 4 "closure ops auto-run..." paragraph (lines 431-441) | B | ~45w | Tighten cross-references | Long explainer of recap shape + bundle motion; tightens via parallel-bullet recap structure |
| Phase 4 "Recap is recap-only" blockquote (lines 443-446) | A | ~25w | Shrink to the novel callout only | First half duplicates the prose above; only the "next-task suggestion belongs in post-closure protocol" callout is novel |
| Phase 4 closing approval-semantics paragraph (lines 448-453) | A | ~30w | Cite §"Post-closure protocol" | Branch-by-branch semantics already covered downstream; cite suffices |

**Section subtotal: ~325-375w** (Tier A: ~225w · Tier B: ~150w).

#### `## When to use a tasknote (and when not to)` (1,052w — second biggest)

| Site | Tier | Est. savings | Technique | Notes |
|---|---|---|---|---|
| Duplicate "follow-up filing produces zero artifacts" paragraph (line 630, ~110w) | A | ~80w | Trim restated bullet content | The paragraph re-prose-ifies what the "File a follow-up when:" bullets above already convey; novel content (declines at >70w) folds into one bullet |
| Duplicate "micro-tasknote uses a single section" paragraph (line 645, ~80w) | A | ~50w | Trim restated bullet content | Same pattern: re-prose-ifies bullets + skill-internal mechanic |
| Skip-clause tightening across 4 variants (lines 617-622, 632-636, 647-651) | A | ~40w | Parallel-shape uniformity | Light prose tighten; preserves the use/skip pair structure |
| **Aggressive option C1**: full decision-matrix collapse of all 4 variants | C | ~400-500w (instead of A-tier ~170w) | Structural compression à la [[CORE-039]] R2 (bullets → matrix) | Loses prose richness; gains scannability — one matrix replaces 8 bullet-blocks |
| `### PLAN.md filing-discipline thresholds` enforcement paragraph (lines 672-675) | A | ~35w | Tighten to one sentence | Three skills listed with verbose mechanism; one sentence covers |
| `### `## Completed` archive convention` explainers (lines 690-698) | B | ~35w | Compress 3 paragraphs → 1 | Why-shortname-required + legacy-parse + backwards-compat consolidates |

**Section subtotal: ~240-290w** at A+B (recommended); or **~550-650w** if Tier C matrix-collapse approved instead.

#### `## Post-closure protocol` (948w — third biggest)

| Site | Tier | Est. savings | Technique | Notes |
|---|---|---|---|---|
| Conditional skip rule intro (lines 470-473) | A | ~15w | Prose tighten | One-sentence rewrite |
| Frontend signal `.ts` qualifier prose (lines 482-484) | A | ~25w | Drop justification | Why-it-matters explainer; the qualifier itself is self-evident from "under explicit UI dir" |
| Perf-narrative signal parenthetical (lines 491-499) | A | ~20w | Drop restated "only judgment surface" | Already restated in §"'No AI override' semantics" below |
| "'No AI override' semantics" callout (lines 506-510) | A | ~20w | Compress to two sentences | Half is restating that perf-narrative is the valve |
| "On skip (autonomous-commit motion)" prose (lines 512-525) | B | ~55w | Tighten + compress restated motion | "Same response shape as post-commit response on the fire branch" + "the marker just replaces..." can collapse |
| Step 1 commit-go prompt paragraph (lines 546-548) | A | ~10w | Tighten | |
| Step 1 skill-level extensions paragraph (lines 550-554) | A | ~15w | Cite-don't-restate | Bundled-prompt override already documented above |
| Step 3 copy-paste explainer (lines 587-592) | A | ~20w | Tighten `/model` segment sentence | |

**Section subtotal: ~180w** (Tier A: ~125w · Tier B: ~55w).

#### `## Task-line format` (505w — fourth heavy)

| Site | Tier | Est. savings | Technique | Notes |
|---|---|---|---|---|
| Wikilink-spans + skill-file-placeholder paragraphs (lines 172-178) | A | ~25w | Merge two related paragraphs | Both cover wikilink-collision avoidance; one paragraph suffices |
| Various prose tighten (intro, adopting-projects parser, Long-description intro) | A | ~15w | Minor 5w-ish trims per site | |

**Section subtotal: ~40w** (Tier A only; low absolute payoff but very low risk).

#### Aggregate (across all 4 heavy sections)

| Tier | Range | What it buys |
|---|---|---|
| **Tier A only** (mechanical / safe) | ~530w (~10% of SPEC.md) | Explainer trims, parenthetical removals, cite consolidations — very low contract-loss risk |
| **Tier A + B** (recommended) | ~785w (~14%) | Above + structural compression on closing paragraphs and cross-reference paragraphs — low-to-moderate risk |
| **Tier A + B + C** (aggressive) | ~1,235w (~23%) | Above + full variant decision-matrix collapse in §"When to use a tasknote" — moderate risk, loses prose richness |

Caveman's 46% benchmark is unreachable on flowtron's intentional-prose contract surface; the aggressive Tier C approach lands at ~23% which is the realistic ceiling without contract drift. Per user's "loose target / save a bit of token" frame, **Tier A + B** is the recommended sweet spot.

### Out of scope (ruled out)

- **Lazy-module decomposition of in-SPEC sections** — could move the "Conditional skip rule" deterministic-signal sub-bullets into a new `SPEC/post-closure.md` lazy module. Adds cognitive load (one more file to discover) without clear win; the rule is referenced from every closure path so always-loaded is the right shape.
- **Medium-weight SPEC sections** (`## Working in the flowtron repo itself` 211w · `## Tasknote frontmatter` 175w · `## Skill namespace` 98w · etc.) — already lean post-prior-sweeps and contract-dense. No meaningful trim candidates.
- **`## Tasknote body shape`** (73w) — trimmed by CORE-039 already; tight.
- **All pointer sections** (Versioning · Starter tasknotes · Model field · Epic lifecycle · Blocked tasks — 4w each) — already at the minimum (one-liner + lazy-module link).
- **`ft-task/SKILL.md`** (2,270w; +375w since CORE-049) and lazy SPEC modules — out of scope per user's "SPEC.md only" decision.

### Bundling recommendation

Single bundled follow-up task: **"SPEC.md terse pass — apply Tier A+B candidates"** (or Tier A only, or A+B+C, per the user-walk verdict). Rationale:

- CORE-049's individual-filing decision was driven by 4 *different* surfaces with no shared decisions. This audit is single-file → all candidates share the SPEC.md context; one /ft-task session can apply them coherently without re-loading context per candidate.
- One commit, one doc-drift sweep, single contract review for the user instead of N.
- Low per-candidate effort (mostly editing 1-3 paragraphs apiece) makes splitting overhead-heavy.

**Filing location options** (surface to user):

- **Non-epic task** (e.g., `CORE-101` next free; Low or Medium priority) — keeps `CORE-EPIC-097`'s child set clean (epic's scope was "external-skill-survey + adoptions"; this audit-driven trim is internal flowtron tightness, not part of that scope).
- **New `.8` subtask under CORE-EPIC-097** — keeps the cohort-narrative tidy but breaks the convention that the final-numbered child is the audit (`.7`). Workable but non-canonical per SPEC/epic.md numbering convention.

Recommend the non-epic option.

### Walk-with-user (resolved)

| Question | User answer |
|---|---|
| Trim depth | **Tier A + B** (~785w / ~14% of SPEC.md) — mechanical + structural compression on closing/cross-reference paragraphs; preserves prose-rich variant decision blocks |
| Filing form | **Single bundled task in PLAN.md** (non-epic; keeps CORE-EPIC-097 children clean) |

### Filed follow-up

`- [ ] **CORE-109** [opus] | spec-terse-pass — Apply Tier A+B trims from [[<CORE-097.4>]] audit to SPEC.md (mechanical + structural compression across heavy sections; ~785w / ~14% target). Single-file; preserve contract.`

Filed under `## Low` priority in `_project/PLAN.md` (currently the only entry under Low; Critical/High/Medium also `(none)`). Word-count 23w — under the 50w target. `[opus]` tag because the trim requires judgment across multi-paragraph rewrites (per global CLAUDE.md model-selection guidance for design + multi-file paragraph-restructure work).

The candidate inventory table above (per-site, tiered) is the canonical handoff document — CORE-109's /ft-task session will Read this archived tasknote at Phase 1 and execute the approved candidates with the per-site detail intact.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (audit task; the deliverable is the candidate inventory + filed follow-up, not code)
- [x] Ran lint/type-check on changed code — n/a (no code; markdown only)
- [x] (frontend) Asked the user for visual confirmation — n/a (not a frontend change)

**Testing Notes:**

Audit task per [[CORE-049]] precedent — no code, no tests, no lint targets. Markdown mental-pass on the single PLAN.md filing (`CORE-109` under `## Low`): `[opus]` tag present · `| spec-terse-pass` shortname (18 chars · under 30) · em-dash separator · `[[<CORE-097.4>]]` wikilink angle-bracketed correctly per SPEC §"Long-description conventions" · word-count 23w (under 50w target) · placed cleanly above the next priority heading. No trailing whitespace.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `CORE-097.4` line flipped to stub form `Completed 2026-05-18.` (kept in-place under CORE-EPIC-097 per epic-lifecycle convention; parent stays open until `.7` audit closes the cohort); tasknote moved to `_project/tasknote/archive/core/CORE-097.4.md`
- [x] Recap drafted (surfaces inline on conditional skip — markdown-only diff; no frontend / privileged-ops / perf surface)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — public-facing overview doesn't enumerate workflow-surface trim follow-ups |
| `SPEC.md` | no change — this audit doesn't modify the workflow contract; the audit's filed follow-up [[CORE-109]] will land the actual SPEC.md edits and run its own doc-drift sweep at closure |
| `docs/MIGRATION.md` | no change — adoption + bump procedures unaffected |
| `claude/CLAUDE-snippet.md` | no change — adopter paste-block unaffected |

Per [[CORE-049]] precedent: pure-audit filings introduce no new contracts; downstream trim tasks each run their own canary.

### Recap

Ran a "Terse pass" audit on `SPEC.md` (per-`/ft-task` always-loaded core), the third adoption from `CORE-EPIC-097`'s external-skill-survey shortlist (P1.c). Captured per-section word counts — SPEC.md is now **5,426w at HEAD**, up **+2,245w (+70%) in 10 days** since the [[CORE-049]] baseline (3,181w on 2026-05-08), with growth concentrated in the four heaviest sections (4-phase workflow 1,505w · when-to-use 1,052w · post-closure protocol 948w · task-line format 505w). Walked each section site-by-site and produced a tiered candidate inventory (Tier A mechanical / B structural compression / C aggressive matrix-collapse), totaling ~530w / ~785w / ~1,235w savings respectively.

Caveman's 46% benchmark dropped from framing per user direction ("just looking to save a bit of token. if we don't aim for the 46%, perhaps we should call it something different like Terse or something equivalent") — adopted **"Terse pass"** as the working name; recap reports absolute savings instead of caveman comparison.

User-walked the inventory and approved **Tier A + B (~785w / ~14%)** as a **single bundled follow-up task** filed as `CORE-109` under `## Low`: "spec-terse-pass — Apply Tier A+B trims from [[<CORE-097.4>]] audit to SPEC.md…" (23w, well under the 50w target). The CORE-109 /ft-task session will Read this archived tasknote at Phase 1 and execute the per-site candidates with the inventory table as the canonical handoff.

Bundling diverges from [[CORE-049]]'s 3-individual-starter pattern because this audit is single-file → all candidates share SPEC.md context; one /ft-task session can apply them coherently. Filed non-epic (not as `CORE-097.8`) to keep CORE-EPIC-097's children clean — internal SPEC tightness isn't part of the original external-skill-survey scope, and filing inside the epic would have broken the SPEC/epic.md convention that the highest-numbered child (`.7`) is the audit.

**Verification ask (optional):** scan the PLAN.md `## Low` filing and the per-site candidate table in this tasknote — would you trim the candidate list further (e.g., drop any specific Tier B site) or extend (push toward Tier C matrix-collapse)?

**Archived:** 2026-05-18
