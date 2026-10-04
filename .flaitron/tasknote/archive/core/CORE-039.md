---
title: SPEC.md prose tightening sweep
status: completed
priority: Future Opportunities
area: core
tags: []
created: 2026-05-05
due:
related-tasks: [CORE-037, CORE-038, CORE-040]
---

# CORE-039 | SPEC.md prose tightening sweep

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-037]] [[CORE-038]] [[CORE-040]]

## 🎯 Goal

Trim ~600-700w of redundant prose from SPEC.md across six discrete sites identified by the [[CORE-037]] audit, preserving the spec contract (no behavioral change).

## ✅ Acceptance

- [x] All six trim sites edited per the starter table (round 1, 377w savings)
- [x] Round-2 structural cuts applied: §Blocked tasks H3-subsection compression to inline-bolded paragraphs + frontmatter codeblock trim + starter YAML codeblock trim
- [x] Cumulative SPEC.md savings: **596w** (4525w → 3929w; ≈13.2% of the file, on every `/task` load)
- [x] No contract change — fields, parser inputs, phase semantics, and conventions all unchanged
- [x] SPEC.md `**Version:**` patch-bumped (v0.6.1 → v0.6.2)
- [x] No skill/template/code edits (out of scope; sibling tasks own those surfaces)
- [x] 53/53 viz tests pass; tsc clean (sanity check that nothing parser-adjacent regressed)

## 🧩 Subtasks

- [x] Site 1: §Epic lifecycle — dropped CORE-EPIC-040 worked example, compressed audit-follow-ups Few/Many to single paragraph, replaced apply/skip prose pair with "apply judgment" line
- [x] Site 2: §Long-description conventions — dropped wikilink-style framing paragraph; tightened wikilink-only and code-span clarifications
- [x] Site 3: write-once-policy consolidation — added canonical paragraph at top of §Tasknote frontmatter; deleted the 232-238 block (write-once + v0.2.0 retired-field) and the §Model field 631-632 paragraph; replaced §Tasknote body shape backwards-compatibility paragraph with one-line citation
- [x] Site 4: §Starter tasknotes — dropped "Starters are filed selectively..." paragraph
- [x] Site 5: §Phase 1 prose — compressed Re-scope/De-scope/drift detail to cite §"Blocked tasks"
- [x] Site 6: §Blocked tasks Viz interaction — compressed to one sentence
- [x] Patch-bump `**Version:**` to v0.6.2
- [x] Round 2 — Site 7: §Blocked tasks — compressed four H3 sub-sections to inline-bolded paragraphs; preserved two-signal contract + signals table + Viz interaction. Section dropped from 595w → ~340w.
- [x] Round 2 — Site 8: §Tasknote frontmatter — replaced the YAML codeblock with a one-line cite to `templates/tasknote-template.md` plus an inline `status:` / `priority:` enumeration for at-a-glance reference.
- [x] Round 2 — Site 9: §Starter tasknotes — dropped the YAML codeblock; absorbed the diff-from-standard ("status: starter and the optional `due:` / `related-tasks:` typically omitted") into the surrounding prose. Kept the markdown layout codeblock — that's the unique starter body shape.
- [x] Re-run viz tests + tsc after round 2

## 🔗 Related

- [[CORE-037]] — workflow token-cost audit that filed this task
- [[CORE-038]] — parallel skill cite-don't-restate trim (sibling, completed 2026-05-06)
- [[CORE-040]] — PLAN.md filing-discipline thresholds (sibling, completed 2026-05-06; touched §"When to use a tasknote", which is line-adjacent but not overlapping)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Six trim sites all still anchored after one day's intervening work (CORE-038 skill-side, CORE-040 §"When to use a tasknote" extension); audit's twin recommendation already shipped on the skill side, so this closes the pair. No contract change. Adopters need no migration.

- [x] Read relevant source files
- [x] **Drift check** — see drift table in Discovery Notes; only Site 3c shifted (+23 lines from CORE-040), content preserved
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Starter context (preserved verbatim from filing 2026-05-05)

> _Captured 2026-05-05 during the [[CORE-037]] workflow token-cost audit. Filed initially as a long PLAN.md entry; converted to starter as part of [[CORE-040]] dogfood pass._
>
> **Why this exists**
>
> `SPEC.md` (~4,319w) loads on every `/task` invocation via the task skill. The [[CORE-037]] audit identified six discrete trim sites totalling ~600-700w of redundant or low-value prose. Each is a small mechanical edit; bundled into one sweep to avoid PLAN.md churn.
>
> **Solution shape**
>
> Six discrete edits, applied in one Phase 2 pass. Each preserves the spec contract — this is prose tightening, not behavioral change.
>
> **Files to touch (preliminary survey — drift-check at promotion)**
>
> - `SPEC.md` (six sites, see below)
> - `SPEC.md` `**Version:**` header — patch bump (clarification only)
>
> **The six trim sites**
>
> | # | Section | Lines (approx) | Action | ~Savings |
> |---|---|---|---|---|
> | 1 | §Epic lifecycle | 74-131 | Collapse worked-example block + tighten audit-follow-ups Few/Many branches + drop apply/skip prose pair (replace with "apply judgment") | ~330w |
> | 2 | §Long-description conventions | 167-202 | Drop "matches the wikilink style introduced in §Tasknote body shape — adopting projects with markdown-vault tooling get cross-references for free" framing paragraph; tighten wikilink-only justification + carve-out prose | ~80-100w |
> | 3 | §Tasknote frontmatter / §Tasknote body shape / §Model field | 232-238, 349-351, 608-609 | Consolidate three variants of the "archived tasknotes are write-once" / "Pre-v0.2.0 retired field" policy into one canonical statement near the top of SPEC; cite from each section | ~30-50w + drift-resilience |
> | 4 | §Starter tasknotes | 296-298 | Drop "Starters are filed selectively..." paragraph that duplicates §"When to use a tasknote" filing rules | ~30w |
> | 5 | §The 4-phase workflow Phase 1 prose | 368-380 | Compress the Re-scope / De-scope / drift detail to cite §"Blocked tasks" instead of restating | ~80w |
> | 6 | §Blocked tasks Viz interaction | 503-513 | Compress to one sentence: "Adopting projects' tools render `Blocked by [[ID]]` and tasknote `status: blocked` as independent signals; either, both, or neither may show on a row." | ~50w |
>
> **Decisions locked**
>
> - Patch version bump (clarification only — no contract change, no field changes, no parser changes).
> - Adopting projects need no migration; the trim is additive in the sense that nothing they rely on is removed.
>
> **Explicitly out of scope**
>
> - Skill changes ([[CORE-038]] covers skill cite-don't-restate)
> - Template changes (template content is load-bearing per audit findings)
> - Behavioral changes to any phase or convention (this is prose tightening only)
>
> **Estimated savings**
>
> ~600-700 words off every `/task` invocation (≈14-16% of SPEC.md).
>
> **Open at promotion (Phase 1 should resolve)**
>
> - Site #3 (write-once policy consolidation) — where exactly does the canonical statement live? Top of SPEC §"Tasknote frontmatter"? A new top-level note? Lean: top of §"Tasknote frontmatter" with a back-reference from the other two sections.
> - Should the §Versioning section also be reviewed for trim? Not on the audit's list but adjacent.
> - Each site's word count is an estimate; verify post-edit total and update the SPEC version-bump line accordingly.

### Drift report (2026-05-06 promotion)

SPEC.md is now v0.6.1 (4,525w; was v0.6.0 / 4,319w at filing). Sole change since filing is [[CORE-040]] (commit 678288a, +24 lines in §"When to use a tasknote"). Site-by-site:

| # | Site | Starter line | Current line | Status |
|---|------|--------------|--------------|--------|
| 1 | §Epic lifecycle | 74-131 | 74-131 | match |
| 2 | §Long-description conventions framing | 167-202 (incl. 192-194) | 167-202 (incl. 192-194) | match |
| 3a | §Tasknote frontmatter write-once | 232-238 | 232-238 | match |
| 3b | §Tasknote body shape write-once | 349-351 | 349-351 | match |
| 3c | §Model field retired-field paragraph | 608-609 | 631-632 | mechanical drift (+23 from CORE-040) |
| 4 | §Starter tasknotes "Starters are filed selectively..." | 296-298 | 296-298 | match |
| 5 | §Phase 1 prose (Re-scope/De-scope/drift) | 368-380 | 368-380 | match |
| 6 | §Blocked tasks Viz interaction | 503-513 | 503-513 | match |

No content surprises; no scope change. The Site 3c shift is a normal +23-line offset and the content at the new location is the same retired-field paragraph the starter cited.

### Clarifying questions resolved

1. **Site 3 canonical anchor:** Top of §"Tasknote frontmatter". The consolidated paragraph covers both "archived tasknotes are write-once" and "pre-v0.2.0 retired `model:` field" policies; §"Tasknote body shape" and §"Model field" cite it via "see §Tasknote frontmatter". Lowest-churn placement; keeps the policy in the section adopting projects already read first.
2. **§Versioning scope:** Out. Audit didn't flag it. If a trim opportunity surfaces later, file a fresh task; not diluting this sweep.
3. **Word counts:** estimates only at scaffold time; the actual savings will be measured post-edit and the version-bump line written accordingly.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cite-don't-restate is the established trim pattern from [[CORE-038]]'s skill sweep just shipped; same shape applies here (Sites 3, 5 cite existing canonical sections; Sites 1, 2, 4, 6 are pure deletion + tightening). No new pattern introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (prose-only edit; no behavioral surface)
- [x] Ran targeted tests on changed files — viz tests cover the parser which depends on the SPEC's Task-line / Long-description grammar; both untouched.

**Implementation Notes:**

- **Round 1** (the six audit-identified sites): 4525w → 4148w = 377w savings.
  - All six edits applied; no parser/template/skill files touched.
  - Site 3 canonical paragraph placed at top of §"Tasknote frontmatter" (per Phase 1 decision); §"Tasknote body shape" backwards-compat now a one-line cite; §"Model field" pre-v0.2.0 paragraph deleted entirely (canonical statement at top of §"Tasknote frontmatter" already references §"Model field" + §"Task-line format" — reverse-pointer was redundant).
  - Site 1 trim came in tighter than the audit's 330w estimate because the worked-example block (~50w) was the chunk; lifecycle prose was already reasonably tight.

- **Round 2** (re-scope after user's "is this overkill?" cold re-read): 4148w → 3929w = 219w further savings.
  - Site 7 (§Blocked tasks): cold re-read found this was the heaviest section at 595w and over-formatted with four H3 sub-sections each wrapping a numbered list. Compressed to four inline-bolded paragraphs preserving every state transition and the two-signal contract. Section now ~340w. The H3 + numbered-list shape was the genuinely "overly prescriptive" finding.
  - Site 8 (§Tasknote frontmatter codeblock): the 11-line YAML block duplicated `templates/tasknote-template.md`. Replaced with a one-line cite + inline enumeration of valid `status:` and `priority:` values (the contract pieces an adopter's parser actually needs).
  - Site 9 (§Starter tasknotes YAML codeblock): same shape — duplicated the standard frontmatter modulo `status: starter`. Absorbed the diff into surrounding prose; kept the markdown layout codeblock since that shows the unique-to-starter body shape (no canonical equivalent inline anywhere else in SPEC).
  - Considered but skipped: §The 4-phase workflow phase-checklist trim (deferred — real readability tradeoff, deserves a separate conversation), the "worth discussing" small trims (§Versioning operational paragraph, §Task-line format parser cite, §Post-closure protocol "Suggest the next move"), and tightening of §Starter tasknotes Lifecycle list (would push past 600w threshold but not worth the readability cost vs. an honest 596w report).

- **Final delta:** SPEC.md 4525w → 3929w = **596w savings** (~13.2% of file, on every `/task` load). Acceptance threshold revised to match measured result rather than chase a round number.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code (viz vitest: 53/53 pass)
- [x] Ran lint/type-check on changed code (tsc --noEmit clean; no lint script in viz)
- [ ] (frontend) Asked the user for visual confirmation — N/A (no UI surface changed)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

```
Round 1: $ npm run test → 53/53 pass · $ npm run typecheck → clean
Round 2: $ npm run test → 53/53 pass · $ npm run typecheck → clean
```

The viz parser reads the PLAN.md task-line / long-description grammar which §"Task-line format" / §"Long-description conventions" document; both sections were trimmed (Site 2) but the grammar table and parser-reference pointer are intact. Round 2 didn't touch any parser-adjacent grammar surface — §Blocked tasks talks about the contract, not parser inputs. Tests confirm.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — N/A (this *is* the doc edit; no other inventory tracks the trimmed sections)
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Trimmed SPEC.md across nine sites in two rounds: **4525w → 3929w = 596w savings (~13.2% of the file, on every `/task` load).** Patch-bumped v0.6.1 → v0.6.2 (clarification only — no contract change, no field changes, no parser changes; adopters need no migration).

**Round 1 (six audit-identified sites):** -377w.

1. §Epic lifecycle — dropped CORE-EPIC-040 worked example; collapsed audit-follow-ups Few/Many; replaced apply/skip prose pair with judgment line.
2. §Long-description conventions — dropped wikilink-style framing paragraph; tightened wikilink-only + code-span clarifications.
3. Write-once policy consolidation — canonical paragraph at top of §Tasknote frontmatter; deleted the 232-238 block + §Model field 631-632 paragraph; §Tasknote body shape backwards-compat now a one-line cite. Single source of truth, three sections refer back.
4. §Starter tasknotes — dropped "Starters are filed selectively..." duplicate.
5. §Phase 1 prose — compressed Re-scope/De-scope/drift detail; cite §"Blocked tasks" instead of restating.
6. §Blocked tasks Viz interaction — compressed two-bullet + two-paragraph block to one sentence.

**Round 2 (re-scope after user's "is this overkill?" cold re-read):** -219w.

7. §Blocked tasks (heaviest section at 595w) — compressed four H3 sub-sections (Entry: Phase 1 / Entry: mid-Phase-2 / Parked state / Exit: resume) to four inline-bolded paragraphs. Section now ~340w. The H3 + numbered-list shape was the "overly prescriptive" finding; the contract content (state transitions, two-signal independence, viz rendering) is preserved verbatim.
8. §Tasknote frontmatter — replaced the 11-line YAML codeblock (which duplicated `templates/tasknote-template.md`) with a one-line cite + inline `status:` / `priority:` enumeration.
9. §Starter tasknotes — dropped the YAML codeblock (duplicated standard frontmatter modulo `status: starter`); absorbed the diff into surrounding prose. Kept the markdown layout codeblock — that's the unique starter body shape.

**Pattern survey finding:** cite-don't-restate is the exact same pattern [[CORE-038]] applied skill-side earlier today; this closes [[CORE-037]]'s twin recommendation. Combined [[CORE-038]] (503w skill) + [[CORE-039]] (596w spec) = **1,099w direct savings** on every `/task` invocation, plus [[CORE-036]]'s archive-strategy savings on top — [[CORE-037]]'s audit recommendations now fully landed.

**Key decisions captured along the way:**

- Site 3 canonical anchor: top of §Tasknote frontmatter (lowest churn; section adopters read first).
- §Versioning out of scope (not flagged by the audit; defer or file fresh).
- §Model field reverse-pointer dropped entirely (canonical statement already names §Model field; back-pointer would have been a doc-loop).
- Round 2 re-scope (vs. file fresh CORE-042): the user noted post-round-1 that 4148w still felt heavy and asked for a critical re-read. Re-opening the in-flight tasknote was cheaper than the closure→commit→re-file cycle.
- Round 2 §Blocked tasks: original sketch was "cite the skill," but a closer look found SKILL.md cites SPEC for these mechanics, not the other way around. So compressed the H3 structure inline rather than moving content out of SPEC.
- Round 2 phase-checklist trim (§The 4-phase workflow): considered, deferred. Real readability tradeoff vs. spec-elegance; deserves a separate conversation if revisited.
- Acceptance threshold: revised from "≥600w" to the measured 596w rather than chase a round number with thin trims.

**Verification:** 53/53 viz tests pass (round 1 + round 2), tsc clean. Adopter parsers (`viz/src/parser.ts`) read PLAN.md grammar — both grammar-adjacent sections (§Task-line format, §Long-description conventions) kept their tables and parser-reference pointers intact. Round 2 didn't touch grammar surface.

**Archived:** 2026-05-06
