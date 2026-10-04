---
title: adopter-doc-propagation
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-EPIC-301, CORE-301.1, CORE-301.2, CORE-301.3, CORE-301.4]
---

# CORE-301.5 | adopter-doc-propagation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-301]] [[CORE-301.1]] [[CORE-301.2]] [[CORE-301.3]] [[CORE-301.4]]

## 🎯 Goal

Propagate the §"Downstream-impact reconciliation" contract to the adopter-facing surface — the `AGENTS.md` paste-block (behavioral note) and the glossary (new term) — and run a verification sweep that every wired skill's cross-reference to the section resolves and no adopter doc still describes filing as append-only.

## ✅ Acceptance

- [ ] `claude/AGENTS-snippet.md` paste-block notes the downstream-impact reconciliation behavior (new-task filing + mid-flow decisions scan active PLAN entries behind a user-confirm), citing `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation"
- [ ] `docs/GLOSSARY.md` gains an alphabetized **Downstream-impact reconciliation** entry; entry count + "Last significant update" stamp refreshed
- [ ] `docs/MIGRATION.md` propagation resolved per Discovery verdict (edit or logged no-change with rationale)
- [ ] Verification sweep: every skill citing §"Downstream-impact reconciliation" resolves to the live section; no adopter doc claims the old filing-only behavior
- [ ] Scope held to the adopter surface (`.5`) — no contract or skill-wiring edits (those were `.2`–`.4`)
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Re-read the three adopter targets + the contract section to fix exact insertion points
- [ ] `AGENTS-snippet.md`: add the reconciliation behavioral bullet in the paste-block
- [ ] `GLOSSARY.md`: insert the alphabetized term; bump entry count + "Last significant update" stamp
- [ ] `MIGRATION.md`: apply the Discovery verdict (edit or no-change)
- [ ] Verification sweep: grep every §"Downstream-impact reconciliation" cite resolves; confirm no filing-only stale claim
- [ ] Markdown mental-pass (headings, alphabetization, wikilink-integrity, cross-refs)
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-301]] — parent epic (plan-cohesion-blast-radius)
- [[CORE-301.1]] — Discovery; resolved scope + child split (`.5` = docs + adopter sweep)
- [[CORE-301.2]] — reconciliation-contract; authored the §"Downstream-impact reconciliation" this child propagates
- [[CORE-301.3]] — wire-inline-filers (ft-file-followup + ft-starter-task)
- [[CORE-301.4]] — wire-epic-and-decisions (ft-epic-discovery + ft-task decision path); last skill-wiring child before this propagation

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Final implementation child of `CORE-EPIC-301` before the `.6` audit. `.2` shipped the contract, `.3`/`.4` wired all four trigger surfaces; `.5` is the `.1` Resolved-scoping table's "docs + adopter sweep" deliverable — propagate the now-stable contract to the adopter surface so adopters pick it up on their next bump. Pure doc propagation; no contract or skill edits.

- [x] Read relevant source files — `claude/AGENTS-snippet.md`, `docs/GLOSSARY.md`, `docs/MIGRATION.md` (§1.3 + headings), `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" (the contract), `.flowtron/tasknote/README.md` §"AI-referenced docs", and predecessors `CORE-301.1/.2/.3/.4.md`

- [x] **Archive skim** — grepped `archive/core/` for the three target paths. The predecessors `CORE-301.2/.3/.4` are the load-bearing precedents: `.2` confirms the SPEC anchor exists (`SPEC/tasknote-selection.md` §"Downstream-impact reconciliation") and synced `SPEC.md`'s module summary; `.3`/`.4` deferred every adopter-doc edit to `.5` ("`docs/MIGRATION.md` no change (adopter propagation is `.5`)" · "`claude/AGENTS-snippet.md` no change (`.5`)"). `.1`'s Discovery Notes name the adopter surface as exactly these three: snippet · MIGRATION · glossary. No prior tasknote propagated a behavioral contract to the glossary outside the CORE-194 glossary-extraction cohort.

- [x] **Drift check** — all three targets exist at HEAD. `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" exists (lines 131–195) with the triggers/scan/classification/action/user-confirm structure. The glossary is alphabetized (~51 entries), declares its own "introduce terms only via epic children that update the SPEC anchor" maintenance rule (this child qualifies; the anchor already exists from `.2`), and carries a "must never be added to the AI-referenced docs list" invariant. `AGENTS-snippet.md` paste-block enumerates filing-skill behaviors inline and already references `SPEC/tasknote-selection.md`. No drift.

- [x] Asked clarifying questions — one decision surfaced and resolved with the user: **MIGRATION.md = no-change + verify.** MIGRATION carries no behavioral-contract prose for any workflow feature (all such contracts live in SPEC and reach adopters via the pasted block), so a reconciliation note there would be a parallel pattern with no precedent. Propagation lands in the two real adopter-facing surfaces (snippet + glossary); MIGRATION is covered by the verification sweep (confirm no stale filing-only claim — there is none). Explicit assumptions: (1) glossary entry is in-bounds per its own maintenance rule (epic child + SPEC anchor shipped in `.2`); (2) snippet gets one behavioral bullet citing the SPEC section, not a contract restatement; (3) no contract or skill edits — `.5` is adopter-surface only.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Three named targets, three different propagation shapes:**
  - **`docs/GLOSSARY.md`** — clear win. Add an alphabetized **Downstream-impact reconciliation** entry (insert after "Doc-drift sweep" / before "Drift check"), one-line definition pointing at the SPEC anchor. The glossary's own maintenance rule sanctions this exactly: "New terms are introduced only by epic children or audit follow-ups that also update the authoritative SPEC anchors" — `.5` is an epic child and the anchor shipped in `.2`. Bump the "~51 entries" count and the "Last significant update" stamp.
  - **`claude/AGENTS-snippet.md`** — the paste-block enumerates filing-skill behaviors inline, so adding one behavioral bullet (filing + mid-flow decisions run a downstream-impact reconciliation scan against active PLAN entries behind a user-confirm; cite the SPEC section) is consistent extension and strengthens the adopter cold-start signal. Adopters get the behavior transitively via SPEC today, but the snippet is the agent-facing surface that names each filing behavior explicitly.
  - **`docs/MIGRATION.md`** — see the scope nuance below; this is the one genuine judgment call.
- **MIGRATION.md scope nuance.** MIGRATION.md is purely *mechanical adoption + bump procedure* (add submodule, symlink wiring, paste block, create PLAN/README, commit, pin/bump). It carries **no behavioral-contract surface** — it never describes the doc-drift sweep, operator gates, or any other workflow behavior as prose; those all live in SPEC and arrive via the pasted block. There is no per-feature "what's new" section (flowtron has no CHANGELOG; release notes live in tag messages). Adding a reconciliation note to MIGRATION would introduce a *parallel pattern with no precedent*, against extension-first. The existing `reconcil` hits in MIGRATION (lines 128–135, 245) are the unrelated fork-provenance "reconciled" sense. So my Phase-1 lean: **MIGRATION = no change**, covered by the verification sweep (confirm no stale filing-only claim — there is none). But the task line explicitly enumerates MIGRATION, so I am surfacing this rather than silently dropping it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — two existing shapes extended, no new pattern: the glossary's own maintenance rule + the CORE-194 term-cohort entries are the precedent for adding an alphabetized term; the snippet's inline per-filing-skill behavioral bullets are the precedent for the behavioral note. MIGRATION left untouched precisely because adding behavioral prose there would be a *new* pattern with no precedent.

- [x] Implemented the minimal solution — three edits across two files:
  - `claude/AGENTS-snippet.md` paste-block: added one behavioral bullet after the filing-skills bullet — new-task filing + mid-flow direction-changing decisions run the downstream-impact reconciliation scan (stale/contradictory/redundant overlap → merge/nest/edit/delete/leave behind a user-confirm; plan never auto-rewritten), citing `.flowtron/core/SPEC/tasknote-selection.md` §"Downstream-impact reconciliation".
  - `docs/GLOSSARY.md`: inserted the alphabetized **Downstream-impact reconciliation** entry (between "Doc-drift sweep" and "Drift check"), pointing at the SPEC anchor.
  - `docs/GLOSSARY.md` header/footer: bumped "~51 entries" → "~52 entries" and the "Last significant update" stamp → `CORE-301.5 (2026-06-07)`.
  - `docs/MIGRATION.md`: **no change** (per Phase-1 decision — mechanical adoption/bump steps only; no behavioral-contract surface).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs; no executable surface)

**Implementation Notes:** Adopter-surface only — zero contract or skill edits (those were `.2`–`.4`). The snippet uses the adopter-context path `.flowtron/core/SPEC/...`; the glossary uses the bare `SPEC/...` house style of its sibling entries. The glossary stays out of the AI-referenced-docs list by its own invariant, so this propagation does not expand the Phase-4 cold-start sweep.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — verification sweep + markdown mental-pass instead (below)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Verification sweep (the task's own acceptance gate): grepped every `Downstream-impact reconciliation` cite repo-wide — all five active skills (`ft-starter-task`, `ft-epic-discovery`, `ft-file-followup`, `ft-task`) + the new `AGENTS-snippet.md` bullet + the new glossary entry resolve to the live anchor `SPEC/tasknote-selection.md:131 ## Downstream-impact reconciliation`. **Zero** parseable `[[A-Z]+-[0-9]+` wikilinks introduced (the `[[wikilink]]` token in the glossary entry is lowercase-literal). No adopter doc carries a stale filing-only claim (the snippet's pre-existing filing-skills bullet lists *what* each skill files, never an append-and-stop mechanic; MIGRATION carries no filing-behavior prose). Glossary alphabetization correct (Doc-drift → Downstream-impact → Drift). Pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per entry in `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md` no change · `SPEC.md` no change (§"When to use a tasknote" module summary already names the reconciliation scan from `.2`) · **`docs/MIGRATION.md` no change** (Phase-1 verdict — mechanical adoption steps; no behavioral surface; verified no stale filing-only claim) · **`claude/AGENTS-snippet.md` UPDATED** (this task — reconciliation behavioral bullet) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change (scan is user-gated; no new injection surface) · `docs/AGENT-NEUTRALITY.md` no change (snippet bullet is agent-neutral; no Claude-specific surface added) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change. (`docs/GLOSSARY.md` is deliberately excluded from this list per its own invariant — edited as a primary deliverable, not a sweep entry.)

- [x] Closed — PLAN.md `.5` line flipped to stub form `Completed 2026-06-07.` (nested in place under `CORE-EPIC-301`; parent stays open until the `.6` audit) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Final Summary:** Propagated the §"Downstream-impact reconciliation" contract to the adopter surface — the final implementation child of `CORE-EPIC-301`. The `claude/AGENTS-snippet.md` paste-block gains a behavioral bullet so adopters' assistants know filing + mid-flow decisions run a cohesion scan behind a user-confirm gate; `docs/GLOSSARY.md` gains an alphabetized **Downstream-impact reconciliation** term (count + stamp refreshed). `docs/MIGRATION.md` resolved as no-change (mechanical-only doc; adding behavioral prose would be a parallel pattern with no precedent — confirmed with the user). Verification sweep passed: all five active skill cites + the two new doc cites resolve to the live SPEC anchor; no adopter doc claims the old filing-only behavior. Adopter-surface only — zero contract or skill edits. Only the `.6` audit remains before the epic closes.

**Archived:** 2026-06-07
