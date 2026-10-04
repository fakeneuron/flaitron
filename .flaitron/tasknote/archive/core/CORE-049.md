---
title: workflow token audit
status: completed
tags: []
created: 2026-05-08
due:
related-tasks: [CORE-037, CORE-038, CORE-039, CORE-040, CORE-050, CORE-051, CORE-052]
---

# CORE-049 | workflow token audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-037]] [[CORE-038]] [[CORE-039]] [[CORE-040]] [[CORE-050]] [[CORE-051]] [[CORE-052]]

## 🎯 Goal

Audit flowtron's AI-facing workflow surfaces for redundant or low-signal token usage and file follow-up tasks for any meaningful reductions (or close as "no changes needed").

## ✅ Acceptance

- [ ] Per-surface word count + section-level review captured for every named workflow surface (SPEC.md + lazy modules, four SKILL stubs + lazy fragments, three templates, tasknote-README, plus the cross-cutting "doc-drift sweep / archive skim / post-closure protocol" anchors named in the brief)
- [ ] Ranked list of trim candidates with concrete proposals and estimated savings recorded in this tasknote (cost × load-frequency × trim-ease, mirroring CORE-037's two-axis model)
- [ ] User-approved candidates filed as follow-up tasks in PLAN.md (individual tasks, starter, or epic — bundling decided after user review per the brief's "may spawn a CORE-EPIC" clause)
- [ ] If no candidate clears the worth-trimming bar, "no changes needed" recorded with rationale and tasknote closed cleanly

## 🧩 Subtasks

- [ ] Surface inventory + word counts (done in Discovery Notes)
- [ ] Section-level review of each surface; identify duplication, low-signal prose, structural over-formatting; record per-surface findings
- [ ] Compose ranked candidate list with one-line proposals + estimated savings + load-frequency
- [ ] Walk ranked candidates with the user; capture approvals / drops / re-prioritizations / bundling preference (individual tasks vs epic vs starters)
- [ ] File approved candidates in PLAN.md (or record "no changes needed")

## 🔗 Related

- [[CORE-037]] — workflow token-cost audit (predecessor, 2026-05-05; scoped only the original always-loaded surfaces)
- [[CORE-038]] — task SKILL.md cite-don't-restate (proven pattern; -503w; foundational reference for this audit's likely findings)
- [[CORE-039]] — SPEC.md prose tightening sweep (proven pattern; -596w across nine sites)
- [[CORE-040]] — PLAN.md filing-discipline thresholds (post-CORE-037 surface accretion to account for)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Brief is concrete (six named surfaces). The flowtron workflow has accreted significantly since CORE-037 (2026-05-05): three new SKILL stubs (`micro-task`, `starter-task`, `new-project`), lazy-load architecture (5 SPEC modules + 3 SKILL fragments via CORE-042.9), CORE-040 filing-discipline block, CORE-046 recap-only callout + `/model` integration, CORE-047 doc-drift contract. Initial sizing confirms there's likely meaningful trim available — micro-task SKILL is now 1,904w (larger than task SKILL itself at 1,895w post-CORE-038 trim), suggesting cite-don't-restate hasn't been applied there.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — all six brief-named surfaces exist at expected paths; lazy-load architecture (SPEC/* + claude/skills/task/step-*) is post-CORE-037 and not in the brief's enumeration but materially affects the audit; flagged inline below.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Assumptions (no clarifications needed)

- **Audit depth:** section-level, mirroring CORE-037. Go deeper only if a candidate warrants it.
- **Bundling decision:** propose-then-file at user-walk step (per brief's "may spawn a CORE-EPIC" clause); decide individual vs epic vs starter based on what surfaces.
- **In-scope surfaces:** the AI-loaded workflow ones — SPEC.md + SPEC/*.md, four SKILL stubs + their lazy fragments, three tasknote templates, the tasknote-README template (ships into every adopter), the cross-cutting "doc-drift sweep / archive skim / post-closure protocol" anchors named in the brief (interpreted as their literal content, not separate surfaces).
- **Out-of-scope:** PLAN.md template (130w, already minimal); per-tasknote bodies (variable cost is task-author authoring, not structural); flowtron-self _project/tasknote/README.md (project-specific, not adopter-facing); docs/MIGRATION.md (adopter-facing but not AI-loaded at task time); CLAUDE-snippet.md (adopter paste-block, ships verbatim).
- **Cost model:** word-count + bytes/4 heuristic, mirroring CORE-037; relative ranking suffices over a real tokenizer.

### Surface inventory + word counts (drift-checked at HEAD)

**Always-loaded per `/task` invocation (the hot path):**

| Surface | Words | Load behavior |
|---|---|---|
| `SPEC.md` | 3,181 | every `/task`; was 4,319→3,929 at CORE-039 close. Re-grew via CORE-040, CORE-042.x SPEC-module split (lazy now), CORE-046, CORE-047, CORE-048 |
| `claude/skills/task/SKILL.md` | 1,895 | every `/task`; was 2,732→2,229 at CORE-038 close. Re-grew via CORE-046 (recap-only callout) and CORE-042.9 (lazy-load dispatch prose) |
| **per-`/task` total** | **~5,076** | (was ~6,158 post-CORE-038/039; modest re-growth) |

**Lazy SPEC modules (load on edge cases):**

| Module | Words | Fires when |
|---|---|---|
| `SPEC/blocked.md` | 494 | Phase 1 Re-scope to blocked, Phase 2 parking, Step 3c resume |
| `SPEC/epic.md` | 351 | Step 2 epic-ID dispatch (parent epics + subtasks) |
| `SPEC/starter.md` | 334 | Step 3a starter promotion |
| `SPEC/model.md` | 223 | Step 1.5 model mismatch / legacy entry |
| `SPEC/versioning.md` | 145 | Explicit version-bump tasks |
| **lazy SPEC total** | **1,547** | (typically only 0-1 fire per task) |

**Lazy SKILL fragments:**

| Fragment | Words | Fires when |
|---|---|---|
| `claude/skills/task/step-3a-promote-starter.md` | 441 | Step 3a starter promotion |
| `claude/skills/task/step-3c-resume-blocked.md` | 210 | Step 3c blocked resume |
| `claude/skills/task/step-1.5-model-edge.md` | 177 | Step 1.5 model mismatch / legacy entry |
| **lazy SKILL total** | **828** | (typically only 0-1 fire per task) |

**Other always-loaded SKILL stubs (when their respective slash-command fires):**

| Stub | Words | Notes |
|---|---|---|
| `claude/skills/micro-task/SKILL.md` | **1,904** | Loaded on `/micro-task`. **Larger than `task/SKILL.md`** despite simpler workflow → strong duplication signal |
| `claude/skills/starter-task/SKILL.md` | 1,343 | Loaded on `/starter-task` |
| `claude/skills/new-project/SKILL.md` | 1,178 | Loaded on `/new-project` (rare; once per adopting project) |

**Templates:**

| Template | Words | Load behavior |
|---|---|---|
| `templates/tasknote-README.md` | **702** | Ships into every adopter via `/new-project`; AI-consumed as adopter cold-start surface |
| `templates/tasknote-template.md` | 342 | Per `/task` scaffold |
| `templates/tasknote-micro-template.md` | 163 | Per `/micro-task` scaffold |
| `templates/tasknote-starter-template.md` | 156 | Per `/starter-task` scaffold |
| `templates/PLAN.md` | 130 | Per `/new-project` only |

**Always-loaded ambient (in flowtron-self repo only; adopters have their own equivalents):**

| Surface | Words | Notes |
|---|---|---|
| `_project/tasknote/README.md` | 259 | Flowtron-self only; not an adopter trim target |
| `_project/PLAN.md` | 906 | Flowtron-self only; subject to filing-discipline at task level |

### Archive skim

- **[[CORE-037]]** (workflow token-cost audit, 2026-05-05) — direct predecessor. Audit framework: per-file counts, two-axis cost model (size × load-frequency), section-level depth, propose-then-file with user review. CORE-037 also captured the "load-bearing for X doesn't mean live in surface Y" methodological lesson via post-closure scope expansion (filed CORE-040). This audit inherits both the framework and the lesson.
- **[[CORE-038]]** (-503w on task SKILL.md via cite-don't-restate) — proven pattern: replace duplicated SPEC contracts with concise citations, preserve skill-specific orchestration. The "Step 1.5 stays restated, hot path" decision is precedent. Findings here strongly suggest the same pattern applies to `micro-task/SKILL.md` and `starter-task/SKILL.md`.
- **[[CORE-039]]** (-596w on SPEC.md across nine sites) — proven pattern: prose-tightening sweep across multiple small sites in one task. Round-2 lesson: cold re-read finds heavy sections, structural compression (H3 → inline-bolded) without contract loss. Likely fewer easy wins remaining (CORE-039 swept aggressively); deeper structural review possible but diminishing returns.
- **[[CORE-040]]** (PLAN.md filing-discipline thresholds, 2026-05-06) — added the filing-discipline check block to `task/SKILL.md` Step 1; this is post-CORE-038, so audit must account for it.
- **[[CORE-042.x]]** (workflow architecture rethink, 2026-05-06/07) — introduced lazy-load architecture (SPEC modules + SKILL fragments). Reduces per-`/task` load by externalizing edge cases. Audit acknowledges the architecture but reviews each lazy module on its own merits.
- **[[CORE-046]]** (v1.1.0 — `/model` + recap-only, 2026-05-07) — added recap-only callout to `SPEC.md` Phase 4 and reinforcing one-liners to `task/SKILL.md` Step 5 + `micro-task/SKILL.md` Step 4. Touched both SKILL files in lockstep — same touch-set as the audit's likely SKILL-side proposals.
- **[[CORE-047]]** (doc-drift contract, 2026-05-08) — added `## AI-referenced docs` section to `tasknote-README.md` (currently 702w), the lean Phase 4 doc-drift-sweep checkbox to SPEC.md and templates, and `**Docs touched:**` to the micro-template. Most recent touch on the surfaces under audit; landed yesterday.

### Pre-write hypothesis (to be validated in Phase 2)

Three meaningful workstreams likely surface; each is the same proven pattern (cite-don't-restate / structural compression) at a different surface:

1. **Sibling SKILL cite-don't-restate** — micro-task + starter-task SKILLs likely carry 300-500w of duplication each. Mirrors CORE-038's task-SKILL trim.
2. **tasknote-README.md trim** — 702w is heavy for an adopter-cold-start surface; the three tasknote-shape paragraphs (lines 25-28) substantially restate SPEC.
3. **SPEC.md round 3 (modest)** — likely smaller than CORE-039's 596w; some new accretion (CORE-040 filing-discipline, CORE-047 doc-drift, CORE-046 recap-only) and unswept sites worth a critical re-read.

If validated, bundling is most cleanly two or three individual tasks (siblings of CORE-038/CORE-039), not a CORE-EPIC — same shape, no interdependencies, explicit pattern to apply.

If invalidated (audit finds no meaningful trim), close as "no changes needed."

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a for an audit task; the deliverable IS the audit. Methodology mirrors CORE-037: per-surface section-level review, two-axis cost model (size × load-frequency), ranked candidate list, propose-then-file with user review.
- [x] Implemented the minimal solution — section-level findings + ranked candidate list below
- [x] Updated/added tests for non-trivial behavior — n/a (audit; no code change)

**Implementation Notes:**

### Per-surface section-level findings

**`SPEC.md` (3,181w)** — CORE-039 already swept aggressively (-596w across nine sites). Round-3 critical re-read finds only minor sites: §"Tasknote body shape" bullet expansion under the codeblock (lines 195-224) restates ~50-80w of what the codeblock already shows; §"`## Completed` archive convention" (lines 402-423) has ~30w of legacy-parse parentheticals that could tighten. Total ~80-150w. **Diminishing returns; not worth filing as a standalone task.** Several recent additions (CORE-040 filing-discipline block, CORE-046 recap-only callout, CORE-047 doc-drift checkbox) are intentional contract content and lean already.

**`claude/skills/task/SKILL.md` (1,895w)** — already trimmed by CORE-038 (-503w via cite-don't-restate). Re-growth since: ~+80w from CORE-040 filing-discipline check (Step 1) + ~+15w from CORE-046 recap-only one-liner (Step 5) + lazy-load dispatch prose from CORE-042.9. All intentional. **Not in scope for new trim.**

**`claude/skills/micro-task/SKILL.md` (1,904w)** — **largest single trim opportunity.** Larger than `task/SKILL.md` despite simpler workflow → strong duplication signal. Sites:
- **Step 0 — Resolve paths** (~190w): near-verbatim copy of `task/SKILL.md` Step 0. Tighten duplicate phrasing → ~50-80w savings.
- **Step 1.5 — Model gate** (~228w): full inline mismatch + legacy-entry branches (CORE-042.9 lazy-loaded these out of `task/SKILL.md` into `step-1.5-model-edge.md`, but the same lazy-load was not applied to micro-task). Apply CORE-042.9's pattern → ~140w savings.
- **Step 2 — Scaffold** (~160w): restates frontmatter contract (SPEC §"Tasknote frontmatter"). Cite-don't-restate → ~30-50w savings.
- **Step 4 — Recap and close** (~250w): restates doc-drift-sweep contract, archive convention, recap-only callout — all canonical in SPEC. Cite-don't-restate → ~80-120w savings.
- **Step 5 — Post-closure** (~180w): same shape as `task/SKILL.md` Step 6 (already trimmed by CORE-038). Apply same cite-don't-restate → ~80w savings.

**Estimated micro-task SKILL trim: ~400-500w (1,904w → ~1,400-1,500w; ~21-26%).** Sibling-of-CORE-038 shape; same pattern, well-precedented.

**`claude/skills/starter-task/SKILL.md` (1,343w)** — moderate trim opportunity. Sites:
- **Step 0 — Resolve paths** (~170w): same Step 0 duplication as micro-task → ~50-80w savings.
- **Step 3 — Draft starter body** (~170w): the sub-heading list (lines 62-69) restates `templates/tasknote-starter-template.md` + `SPEC/starter.md`. Cite-don't-restate → ~50-80w savings.
- **Step 5 — Append PLAN.md entry** (~260w): restates SPEC §"PLAN.md filing-discipline thresholds" table inline (lines 109-115). Cite-don't-restate; preserve only the skill-specific override clause for >70w breaches → ~80-100w savings.

**Estimated starter-task SKILL trim: ~200-300w (1,343w → ~1,100-1,150w; ~15-22%).** Same cite-don't-restate pattern.

**`claude/skills/new-project/SKILL.md` (1,178w)** — procedural recipe; mirrors `docs/MIGRATION.md` §1. Loaded once-per-adopting-project (rare). Marginal trim possible at Step 0 (paths) but ROI low. **Out of scope.**

**`templates/tasknote-template.md` (342w)** — minimal; mostly checklists + placeholders. **No trim candidate.**

**`templates/tasknote-micro-template.md` (163w), `templates/tasknote-starter-template.md` (156w), `templates/PLAN.md` (130w)** — already minimal. **No trim candidates.**

**`templates/tasknote-README.md` (702w)** — adopter cold-start surface; ships into every adopter via `/new-project`. Sites:
- **Tasknote variants block** (lines 25-28, ~290w): three long paragraphs, one per variant (standard / starter / micro), each restating SPEC contracts (frontmatter shape, body shape, lifecycle citations). Could collapse to one-sentence pointers + SPEC citations → ~150-200w savings.
- Other sections (Layout, Area prefixes, Archive layout, AI-referenced docs, Quick commands) are all load-bearing or recently-added (CORE-047) and lean.

**Estimated tasknote-README trim: ~150-200w (702w → ~500-550w; ~21-28%).** Tradeoff: adopters lose inline variant context, gain a SPEC pointer. README already cites SPEC up top, so deeper SPEC-pointer at variant level is consistent with its existing shape.

**Lazy SPEC modules (1,547w combined: blocked 494, epic 351, starter 334, model 223, versioning 145)** — each is contract-dense; only 0-1 fire per task; CORE-039 round-2 already compressed `blocked.md`'s parent section in SPEC. **No trim candidates.**

**Lazy SKILL fragments (828w combined: step-3a 441, step-3c 210, step-1.5 177)** — each is procedural; lean already. **No trim candidates.**

**Cross-cutting items named in the brief:**
- **doc-drift sweep** — lives in SPEC.md Phase 4 + `tasknote-README.md` §"AI-referenced docs" + tasknote/micro templates + four SKILLs. Already lean post-CORE-047 (landed yesterday). **No trim candidate.**
- **archive skim** — lives in SPEC.md §"📝 Phase 1: Discovery" + `task/SKILL.md` Step 4 imperative. The SKILL imperative is skill-specific operational detail (not in SPEC), so cite-don't-restate doesn't apply. **No trim candidate.**
- **post-closure protocol** — lives in SPEC §"Post-closure protocol" + `task/SKILL.md` Step 6 + `micro-task/SKILL.md` Step 5. Already trimmed by CORE-038 + CORE-046. **No trim candidate at SPEC layer; covered for SKILLs by candidates 1+2 above.**

### Ranked candidate list

| # | Surface | Target | ~Savings | Load freq | Ease | Notes |
|---|---|---|---|---|---|---|
| 1 | `claude/skills/micro-task/SKILL.md` | Cite-don't-restate Step 1.5 (lazy-load model-gate edges per CORE-042.9 precedent) + Step 2 (cite SPEC frontmatter) + Step 4 (cite SPEC closure contracts) + Step 5 (cite SPEC post-closure); plus tighten Step 0 path-resolve duplication | ~400-500w | per-`/micro-task` | medium | Sibling-of-CORE-038; biggest single-file win |
| 2 | `claude/skills/starter-task/SKILL.md` | Cite-don't-restate Step 0 (path-resolve duplicate), Step 3 (sub-heading list cites template), Step 5 (filing-discipline threshold cites SPEC) | ~200-300w | per-`/starter-task` | medium | Same pattern, smaller surface |
| 3 | `templates/tasknote-README.md` | Collapse three tasknote-variant paragraphs (lines 25-28) to one-sentence pointers + SPEC citations | ~150-200w | per-`/new-project`; AI cold-start in adopter projects | easy | Adopter-facing; user judgment on inline-context tradeoff |

### Out of scope (ruled out)

- **SPEC.md round 3** — CORE-039 already swept (-596w); remaining ~80-150w hits readability tradeoffs. Not worth filing.
- **`task/SKILL.md`** — already trimmed by CORE-038; modest re-growth from CORE-040/CORE-046 is intentional contract content.
- **`new-project/SKILL.md`** — one-shot per adopter; trim ROI low.
- **Tasknote templates** (tasknote-template / tasknote-starter-template / tasknote-micro-template / PLAN.md) — already minimal.
- **Lazy SPEC modules + SKILL fragments** — already tight; only 0-1 fire per task.
- **Cross-cutting items** (doc-drift sweep / archive skim / post-closure protocol) — already lean post-CORE-038/CORE-046/CORE-047.

### Methodological cross-check (per CORE-037 lesson)

For each ruled-out surface, "load-bearing for X doesn't mean live in Y" was tested: SPEC.md round 3 sites are not relocatable (already at the canonical home post-CORE-039); new-project SKILL is procedurally tied to docs/MIGRATION.md (would just shuffle, not reduce); cross-cutting items are at the right level of abstraction in their canonical homes. No surfaces miscategorized.

### Bundling recommendation

**Three individual tasks under Medium priority.** Pattern is the same (cite-don't-restate, mirroring CORE-038/CORE-039) but at three different surfaces — no interdependencies, no shared decisions across them. A CORE-EPIC would be over-structuring; each task is modest (~150-500w trim), well-scoped, and independently committable. Filings sit comfortably under the ≤50w PLAN.md filing-discipline cap → inline one-liners, not starters.

**Total estimated combined savings if all three land:**
- Per `/micro-task` invocation: ~400-500w (~21-26% of micro-task SKILL)
- Per `/starter-task` invocation: ~200-300w (~15-22%)
- Per `/new-project` + adopter cold-start: ~150-200w (~21-28% of tasknote-README)

Always-loaded `/task` floor (~5,076w) is unchanged — task SKILL.md is already trimmed and SPEC.md round 3 wasn't worth filing. The audit's wins land on the *sibling* surfaces.

### Walk-with-user (pending)

Per CORE-037's high-value lesson: surface this candidate list to user via AskUserQuestion before filing. User can approve/drop/re-prioritize/re-bundle.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (audit task; the deliverable is the ranked list + filed starters, not code)
- [x] Ran lint/type-check on changed code — n/a (no code; markdown only)
- [x] (frontend) Asked the user for visual confirmation — n/a (not a frontend change)

**Testing Notes:** Audit task per [[CORE-037]] precedent — no code, no tests, no lint targets. Phase 3 is a structural pass-through.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
  - `README.md` — **no change.** Public-facing repo overview; doesn't enumerate workflow internals; correctly stays silent on token-audit follow-ups.
  - `SPEC.md` — **no change.** This audit doesn't modify the workflow contract; it files follow-ups that *will* touch SPEC-adjacent surfaces (SKILLs and templates), but those are scoped to the filed starters [[CORE-050]] / [[CORE-051]] / [[CORE-052]].
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopter paste-block unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-08.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Audited flowtron's AI-facing workflow surfaces against [[CORE-037]]'s framework (per-surface word counts, two-axis cost model, section-level review). Surveyed: SPEC.md (3,181w) + 5 lazy SPEC modules (1,547w combined); four SKILL stubs (`task` 1,895w, `micro-task` 1,904w, `starter-task` 1,343w, `new-project` 1,178w) + 3 lazy SKILL fragments (828w combined); five templates (1,493w combined); flowtron-self `_project/tasknote/README.md` (259w) + `_project/PLAN.md` (906w). Cross-cutting items named in the brief (doc-drift sweep, archive skim, post-closure protocol) reviewed at their canonical homes.

**Three meaningful trim workstreams surfaced; all approved by user; all filed as starters under Medium priority:**

1. **[[CORE-050]]** — `micro-task/SKILL.md` cite-don't-restate. Largest single-file win — micro-task SKILL is currently *larger* than `task/SKILL.md` (1,904w vs 1,895w) despite simpler workflow. Apply [[CORE-038]] pattern across Steps 1.5/2/4/5 + tighten Step 0; lazy-load model-gate edges per [[CORE-042.9]] precedent. **~400-500w savings.**
2. **[[CORE-051]]** — `starter-task/SKILL.md` cite-don't-restate. Steps 0 (path-resolve), 3 (sub-heading list cites template), 5 (filing-discipline threshold cites SPEC). **~200-300w savings.**
3. **[[CORE-052]]** — `tasknote-README.md` variant trim. Three variant paragraphs (lines 25-28) collapsed to one-sentence pointers + SPEC citations. **~150-200w savings;** adopter-facing surface — tradeoff: inline context vs. SPEC pointer.

**Total potential savings if all three land:** ~750-1,000w across the audit-targeted surfaces.

**Bundling decision (per user):** three starters, not a CORE-EPIC. Pattern is the same (cite-don't-restate sibling of [[CORE-038]] / [[CORE-039]]) but at three independent surfaces — no shared decisions, no interdependencies. Filed as starters (rather than inline PLAN.md entries) at the user's call to preserve the rich audit context for promotion-time reuse.

**Out of scope (with rationale):**

- **SPEC.md round 3** — [[CORE-039]] swept aggressively (-596w across nine sites); remaining ~80-150w hits readability tradeoffs. Diminishing returns.
- **`task/SKILL.md`** — already trimmed by [[CORE-038]] (-503w); modest re-growth from [[CORE-040]] / [[CORE-046]] is intentional contract content.
- **`new-project/SKILL.md`** — one-shot per adopter; trim ROI low.
- **Tasknote templates** (standard / starter / micro / PLAN.md) — already minimal.
- **Lazy SPEC modules + SKILL fragments** — already tight; only 0-1 fire per task.
- **Cross-cutting items** (doc-drift sweep / archive skim / post-closure protocol) — already lean post-[[CORE-038]] / [[CORE-046]] / [[CORE-047]].

**Methodological note (per CORE-037 lesson "load-bearing for X doesn't mean live in Y"):** Each ruled-out surface was tested for relocation potential. SPEC.md round-3 sites are at canonical homes post-[[CORE-039]]; new-project SKILL is procedurally tied to `docs/MIGRATION.md` (relocation would shuffle, not reduce); cross-cutting items are at the right level of abstraction. No surfaces miscategorized.

**Doc-drift canary:** clean. No AI-referenced doc updates required by the audit itself (the filed follow-ups will each run their own canary at closure).

**Archived:** 2026-05-08
