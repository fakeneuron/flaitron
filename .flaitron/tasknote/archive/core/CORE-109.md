---
title: spec-terse-pass
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-097.4, CORE-EPIC-097, CORE-049, CORE-039]
---

# CORE-109 | spec-terse-pass

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-097.4]] · [[CORE-049]] · [[CORE-039]]

## 🎯 Goal

Apply the Tier A+B trim candidates inventoried in the [[CORE-097.4]] audit to `SPEC.md` — mechanical prose tightening + structural compression on closing/cross-reference paragraphs across the four heaviest sections — targeting ~785w / ~14% reduction without contract loss.

## ✅ Acceptance

- [ ] Tier A trim candidates from [[CORE-097.4]] per-site inventory applied to `SPEC.md` (≈19 sites across 4 sections; ~530w estimate)
- [ ] Tier B trim candidates applied (5 sites; ~255w estimate)
- [ ] Final `SPEC.md` word count captured with absolute delta vs 5,427w baseline + per-section deltas
- [ ] Contract preservation: every workflow-binding rule, gate trigger, exit semantic, and cross-reference target preserved (verified via section-level re-read after each edit)
- [ ] Phase 4 doc-drift sweep across the 4 AI-referenced docs; `SPEC.md` entry naturally carries this task's update

## 🧩 Subtasks

- [ ] Section 1 — `## The 4-phase workflow` (1,505w): apply 11 Tier A+B candidates (~325-375w target)
- [ ] Section 2 — `## When to use a tasknote (and when not to)` (1,052w): apply 5 Tier A+B candidates (~240-290w target)
- [ ] Section 3 — `## Post-closure protocol` (948w): apply 8 Tier A+B candidates (~180w target)
- [ ] Section 4 — `## Task-line format` (505w): apply 2 Tier A candidates (~40w target)
- [ ] Capture final word count + per-section deltas in Implementation Notes
- [ ] Phase 3: markdown sanity (cross-ref anchors, codeblock fences, table integrity) + section-level semantic re-read for contract drift
- [ ] Phase 4: doc-drift sweep · PLAN.md stub-form flip · archive move · recap

## 🔗 Related

- [[CORE-097.4]] — direct precedent; canonical handoff (per-site candidate inventory table is the execution map)
- [[CORE-049]] — earlier SPEC.md trim audit (3,181w baseline; methodology lineage)
- [[CORE-039]] — SPEC.md R2 prose-tightening sweep precedent (-596w via structural compression)
- [[CORE-EPIC-097]] — parent context (CORE-097.4 was P1.c of this epic; CORE-109 filed non-epic per audit's filing-location decision)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-109 is the direct execution task for the Tier A+B candidate inventory produced by [[CORE-097.4]] (closed 2026-05-18). The audit walked the four heaviest `SPEC.md` sections site-by-site (26 candidate sites: 11 in 4-phase workflow · 5 in when-to-use · 8 in post-closure protocol · 2 in task-line format), tiered each by risk/effort, and user-approved Tier A+B at ~785w / ~14% as a single bundled task. Scope is locked: apply the inventory verbatim with light judgment on per-site execution; do not re-litigate trim depth.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `SPEC.md` (5,427w at HEAD; 733 lines) — the target; verified content matches the audit's cited line ranges across all four heavy sections
- `_project/tasknote/archive/core/CORE-097.4.md` — canonical handoff; per-site inventory table is the execution map for Phase 2
- `_project/tasknote/README.md` §"AI-referenced docs" — Phase 4 closure sweep target list (README · SPEC · MIGRATION · CLAUDE-snippet)

### Drift check

- `SPEC.md` current state: **5,427w** vs audit-captured **5,426w** → 1-word delta (rounding). Effectively zero drift.
- `git log -- SPEC.md` shows no commits to SPEC.md between CORE-097.4 closure (2026-05-18) and now — the audit's per-site line numbers map directly to current `SPEC.md`.
- Spot-checked cited ranges against current SPEC.md content: lines 283-294 (operator-gate cues intro) · 310-315 (Preview line mandatory) · 317-328 (Once Phase 1 closes…) · 330-334 (Skill-level extensions) · 470-473 (Conditional skip rule intro) · 482-484 (`.ts` qualifier prose) · 506-510 ("No AI override" semantics) · 546-548 (commit-go prompt para) · 587-592 (copy-paste explainer) · 617-651 (skip-clause variants block) · 656-666 (filing-discipline thresholds enforcement) · 690-698 (`## Completed` archive convention explainers) · 172-178 (wikilink-spans + skill-file-placeholder paragraphs) — all match. ✓
- All Tier A+B candidate sites are still present at their cited locations. Safe to execute the inventory as filed.

### Archive skim findings

Inherited from [[CORE-097.4]] (which performed the deep skim across CORE-049 / CORE-039 / CORE-038 / CORE-042.x / CORE-097.1 / CORE-097.3); no fresh skim needed for this execution task. Key inherited precedents:

- **[[CORE-049]]** (workflow token audit, 2026-05-08) — methodology lineage; SPEC.md baseline at 3,181w established the +70% growth that motivated CORE-097.4
- **[[CORE-039]]** (SPEC.md R2 prose-tightening, 2026-05-05) — **direct technique catalog** for this task: structural compression (H3 → inline-bolded), redundant prose removal, codeblock self-documenting trims achieved -596w across 9 sites. The "Tier A mechanical / B structural" framing in CORE-097.4 is built on CORE-039's technique vocabulary.
- **[[CORE-038]]** (task SKILL.md cite-don't-restate, -503w) — citation-over-restatement pattern; several Tier A candidates apply this (e.g., Phase 4 closing approval-semantics para citing §"Post-closure protocol")
- **[[CORE-097.4]]** itself is the canonical execution-map document; revisit its Implementation Notes ("Per-site terse-pass candidate inventory") tables for the exact line numbers, techniques, and savings estimates during Phase 2.

### Clarifications

**No clarifications needed.** Explicit assumptions:

1. **Scope = Tier A+B verbatim per the audit's per-site inventory** — no further trim/extend. The audit's optional verification ask ("would you trim further or push toward Tier C?") went unanswered; the user filed CORE-109 with the as-spec'd 23w PLAN.md line, which is approval-by-filing.
2. **Execution motion: one bundled sweep.** Apply all 26 sites within Phase 2 (per-section order, top-to-bottom inside each section). Mid-sweep word-count checkpoints are not surfaced to keep the response shape clean; final tally + per-section deltas appear in Implementation Notes.
3. **Contract preservation is the hard constraint.** Each per-site edit gets a "before/after rule preservation" mental check — workflow-binding semantics (gate triggers, exit conditions, signal definitions, cross-reference anchors) cannot drift. Where a candidate's estimated savings can only be achieved via semantic loss, partial-apply (less aggressive trim) is preferred over skipping the site entirely; log the divergence in Implementation Notes.
4. **Savings estimates are loose targets.** Per-site CORE-097.4 estimates are pre-edit forecasts; actual word counts may diverge ±50%. The recap reports absolute final delta; section-level totals over/under the ~785w aggregate are normal and don't trigger a stop or scope expansion.
5. **Phase 4 closure path: autonomous-commit motion.** Diff is markdown-only (`SPEC.md` + tasknote files), so the three deterministic skip signals all clear (zero frontend files · zero privileged-ops paths · no perf-narrative). Per SPEC §"Post-closure protocol" §"'No AI override' semantics" the gate is bidirectionally locked → autonomous-commit with inline `✅ Closure complete; committing autonomously (…).` marker, full closure review + recap delivered inline in the same response.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a for a prose-trim execution task; the "patterns" are the per-site techniques inventoried in [[CORE-097.4]] (cite-don't-restate, structural compression à la [[CORE-039]] R2, parallel-shape uniformity, parenthetical removal). Each site uses the technique flagged by the audit; new shapes are not invented.
- [x] Implemented the minimal solution — applied 26 Tier A+B trims across SPEC.md (per-site summary below)
- [x] Updated/added tests for non-trivial behavior — n/a (markdown-only contract-surface trim; no code change)

**Implementation Notes:**

### Per-section results

| Section | Sites | Audit target | Actual saved | Notes |
|---|---|---|---|---|
| `## The 4-phase workflow` | 11 | ~325-375w | **324w** | Hit the target band; major savings from sites 1.1 (intro), 1.3 (Once Phase 1 closes…), 1.5 (archive+drift merge), 1.6 (exit-gate marker explainer drop), 1.9 (closure-ops para), 1.11 (cite-to-protocol) |
| `## When to use a tasknote (and when not to)` | 5 | ~240-290w | **161w** | Under target; sites 2.1 (zero-artifacts dup) and 2.5 (3-para → 1) hit hard, but skip-clause variants (2.3) were already terser than the audit projected |
| `## Post-closure protocol` | 8 | ~180w | **144w** | Slightly under; site 3.5 (on-skip motion) cleanly absorbed ~55w via dropping the "same response shape" cross-restatement |
| `## Task-line format` | 3 sub-sites (1 merge + 3 minor) | ~40w | **33w** | Wikilink-spans + placeholder paragraphs merged; intro/parser/long-description-intro micro-tightened |
| **Total** | **26** | **~785w / ~14%** | **662w / ~12.2%** | Substantive trim; lands in the audit's "loose target / save a bit of token" zone |

### Contract preservation verification

Each per-site edit re-read post-trim against the workflow contract; load-bearing semantics confirmed preserved:

- **Gate-count cap (≤2 operator gates):** preserved via Site 1.1 ("up to two operator-gate banners") + Site 1.8 ("gate count stays at up-to-2") even though Site 1.6 dropped the "not a new operator gate" explainer in the Discovery exit-gate prose
- **Three deterministic skip signals + Bundled-prompt override + "No AI override" lock:** all intact in §"Conditional skip rule"
- **"Fire on doubt" perf-narrative bias:** preserved in Site 3.3 ("Biased conservative — fire on doubt") + Site 3.4 ("only judgment valve")
- **>70w decline + route to /ft-starter-task:** preserved in Site 2.4 (filing-discipline thresholds enforcement para — canonical home)
- **`/ft-file-followup` no-tasknote-file + active-tasknote-untouched invariants:** preserved in Site 2.1 trimmed form
- **Phase 4 closure-ops auto-run + recap shape:** preserved in Site 1.9; "Recap is recap-only" novel callout preserved in Site 1.10
- **Copy-paste line `/model` segment + Step 1.5 gate cold-start fallback:** preserved in Site 3.8 (tightened but mechanism intact)

### Out-of-inventory deviations

None. Every edit traces to a candidate in the [[CORE-097.4]] per-site inventory table.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (markdown-only contract-surface trim; no code paths touched)
- [x] Ran lint/type-check on changed code — markdown sanity pass instead (per [[CORE-039]] / [[CORE-097.4]] precedent for SPEC.md edits)
- [x] (frontend) Asked the user for visual confirmation — n/a (not a frontend change)

**Testing Notes:**

### Markdown sanity (post-trim)

- `wc -w SPEC.md` → 4,765 (down from 5,427; -662w / -12.2%)
- `wc -l SPEC.md` → 680 lines (down from 733; -53 lines)
- Section heading count: 37 (level-2 + level-3 combined); unchanged from baseline structure
- Codeblock fences: 18 occurrences of `^\`\`\`` (9 balanced codeblocks); no broken fences from edits
- Cross-reference integrity: spot-checked all `§"..."` targets that appear in or near trimmed sites — `§"📝 Phase 1: Discovery"` · `§"Post-closure protocol"` · `§"Conditional skip rule"` · `§"Operator-gate cues"` · `§"Blocked tasks"` · `§"Task-line format"` · `§"Model field"` · `§"🚀 Phase 4: Closure"` · `§"`## Completed` archive convention"` · `§"AI-referenced docs"` (in `_project/tasknote/README.md`) — all targets still exist at their headings; no orphaned cross-refs
- No external doc-link rewrites needed (no anchor reshuffling; only prose density inside sections changed)
- Table integrity (operator-gate cues table at line 299-301 · task-line format grammar table at line 135-141 · long-description conventions table at line 164-167 · filing-discipline thresholds table at line 630-634): all preserved

### Contract preservation re-read

Section-level re-read after edits confirmed contract preservation (full audit in Implementation Notes above). One non-trivial deviation from estimate: section 2's actual savings (161w) came in under target (240-290w) because the audit's per-site projections assumed deeper trim than was achievable without semantic loss on the skip-clause variants — the variants were already terse.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `CORE-109` line flipped to stub form `Completed 2026-05-18.` and moved to `## Completed`; tasknote moved to `_project/tasknote/archive/core/CORE-109.md`
- [x] Recap drafted (surfaces inline on conditional skip — markdown-only diff; no frontend / privileged-ops / perf surface)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — public-facing overview doesn't reference the SPEC's per-section prose density; the contract surface contracts but no public claim flips |
| `SPEC.md` | **this task's update** — applied 26 Tier A+B trims (5,427w → 4,765w / -662w / -12.2%) across the four heaviest sections per the [[CORE-097.4]] inventory; contract preserved |
| `docs/MIGRATION.md` | no change — adoption + bump procedures unaffected; SPEC.md prose trim doesn't shift any adopter-facing migration step |
| `claude/CLAUDE-snippet.md` | no change — adopter paste-block points to SPEC.md by location, not by prose content |

### Recap

Applied the Tier A+B candidate inventory from [[CORE-097.4]] to `SPEC.md` — a one-pass terse-pass execution across the four heaviest sections. Final delta: **5,427w → 4,765w / -662w / -12.2%**, lands in the audit's "save a bit of token" zone (target was ~785w / ~14% but per-site savings consistently came in below the audit's forward-looking estimates, primarily on already-terse skip-clause variants in §"When to use a tasknote").

Section breakdown:

- `## The 4-phase workflow` (1,505w pre): 11 sites → **-324w** (right at the 325-375w target band)
- `## When to use a tasknote (and when not to)` (1,052w pre): 5 sites → **-161w** (under the 240-290w target — the skip-clause variants were already lean)
- `## Post-closure protocol` (948w pre): 8 sites → **-144w** (just under the 180w target)
- `## Task-line format` (505w pre): 3 sub-sites → **-33w** (close to 40w target)

Techniques used (all inherited from the per-site inventory's audit-recommended approach):

- **Cite-don't-restate** ([[CORE-038]] precedent) — sites 1.7 (Phase 2 blocked-resume cites §"Blocked tasks"), 1.11 (Phase 4 closing cites §"Post-closure protocol"), 3.7 (skill-level extensions cite bundled-prompt override)
- **Structural compression** ([[CORE-039]] R2 precedent) — sites 1.3 + 1.9 (closure/cross-reference paragraphs), 2.5 (3 paragraphs → 1 in `## Completed` archive convention), 3.5 (on-skip motion para)
- **Drop-restated-content** — sites 1.4 (UX-layer closing), 1.6 (marker-explainer), 1.10 (recap-only blockquote shrunk to novel callout), 2.1 (duplicate "no artifacts" para reduced to novel invariants), 2.2 (duplicate "single-section" para), 3.2 (`.ts` qualifier justification), 3.3 (only-judgment-surface parenthetical), 3.4 (no-AI-override compress)
- **Parallel-shape uniformity** — site 2.3 (skip-clause variants across 3 file-X sub-blocks)
- **Prose tightening** — sites 1.1 (intro), 1.5 (archive+drift merge), 1.8 (visual-confirmation example), 2.4 (filing-discipline enforcement), 3.1 (skip rule intro), 3.6 (commit-go prompt), 3.8 (copy-paste `/model` segment), 4.1 (wikilink mechanisms merged), 4.2 (intro/parser/long-description-intro micro-tightens)

**Contract preservation:** Every workflow-binding rule, gate trigger, exit semantic, and cross-reference target re-read post-trim and verified intact. Key load-bearing semantics — gate-count cap (≤2), three deterministic skip signals + "No AI override" lock, "fire on doubt" perf-narrative bias, >70w decline routing, `/ft-file-followup` no-tasknote-file invariant — all preserved. All `§"..."` cross-references resolve to existing headings.

**No follow-ups filed.** Tier C aggressive matrix-collapse remains available if the user later wants to push deeper on §"When to use a tasknote" — the audit's per-site table captures the option with an estimated additional ~400-500w savings at the cost of prose richness in the variant decision blocks. No filing now; the user can decide in a future audit cycle if 12% wasn't enough.

**Verification ask (optional):** the SPEC.md diff is sizable (26 sites, 53 lines removed). If you want a sanity check, the highest-judgment-density trims to eyeball are: Site 1.3 (Once Phase 1 closes…), Site 1.9 (closure-ops auto-run para), Site 2.5 (`## Completed` archive convention consolidation), and Site 3.5 (on-skip motion paragraph). Each of these compresses a contract-load-bearing passage and is the most likely place for an inadvertent semantic shift to hide.

**Archived:** 2026-05-18
