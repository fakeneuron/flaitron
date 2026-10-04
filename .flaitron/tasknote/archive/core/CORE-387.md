---
title: cross-artifact-consistency
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-EPIC-389]
---

# CORE-387 | cross-artifact-consistency

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-389]]

## 🎯 Goal

Close the cross-artifact-consistency gap: give flowtron a surface that checks whether an *active* tasknote's plan still matches `PLAN.md` and SPEC, by extension (audit docs pass or a phase gate) rather than by adding a skill to the roster.

## ✅ Acceptance

- [x] `SPEC.md` §"📝 Phase 1: Discovery" Drift check widened from a code-only cross-reference to also cover the task's plan vs. its `PLAN.md` line and vs. the SPEC contracts it touches
- [x] The rationale prose under the Phase 1 checklist explains *why* the cross-artifact half exists, so the widening isn't an unexplained clause
- [x] Both scaffolding templates (`tasknote-template.md`, `tasknote-micro-template.md`) carry the widened prompt, so scaffolded notes actually ask it
- [x] `SPEC/procedures/ft-task.md` mirrors the widening — contract-only agents get the same check
- [x] `docs/GLOSSARY.md` §"Drift check" and `docs/DOGFOOD.md` Phase 1 step 5 match the widened contract
- [x] No new skill, no new checklist box, no validator — one existing step widened (VISION §"Extension-first"; "a sharper SPEC clause, not a validator")

## 🧩 Subtasks

- [x] Widen the `SPEC.md` Phase 1 Drift check bullet + extend the rationale paragraph below the checklist
- [x] Mirror into `templates/tasknote-template.md` (checklist form)
- [x] Mirror into `templates/tasknote-micro-template.md` (bold-prefix prompt form)
- [x] Mirror into `SPEC/procedures/ft-task.md` (agent-neutral SOP bullet)
- [x] Update `docs/GLOSSARY.md` §"Drift check" definition
- [x] Update `docs/DOGFOOD.md` Phase 1 walkthrough step 5
- [x] Grep-verify no other surface restates the old code-only wording; wikilink/link sanity on changed files

## 🔗 Related

- [[CORE-EPIC-389]] — audit-family consolidation; the consolidated `/ft-audit` docs pass is the named extension point

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and has a one-week-old motivating case in the archive (CORE-393 — a PLAN entry contradicting a SPEC contract survived filing and got a full tasknote before Discovery caught it by judgment). The PLAN line left the home open ("audit docs pass, or the Phase 2 gate"); the operator selected a third, tighter insertion point — widening the existing Phase 1 Drift check — with the concrete SPEC wording in view. Goal and extension-first constraint unchanged, so this is Proceed, not Re-scope.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A` for code boundaries: the deliverable is contract prose across `SPEC.md`, two templates, one procedure SOP, and two docs. The relevant boundary is doc-layer, and it is respected: `SPEC.md` stays the single canonical statement; templates/SOP/glossary/dogfood are projections of it, edited to match rather than to restate independently. No runner `SKILL.md` needs an edit — `/ft-task`, `/ft-goal-task`, and `/ft-micro-task` all defer to SPEC + template for the Drift-check content.

- [x] **Archive skim** — 492 core archives; findings in Discovery Notes below.

- [x] **Drift check** — one stale reference already reconciled upstream, no new drift; details in Discovery Notes.

- [x] Asked clarifying questions — two AskUserQuestion asks, both resolved to the recommended default: **widen the Phase 1 Drift check** (over extending the `/ft-audit docs` pass, or doing both), and **`PLAN.md` line + SPEC** as the checked-against artifact set (over also adding sibling active tasknotes or `.flowtron/specs/`).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Provenance.** CORE-387 was filed 2026-07-31 alongside CORE-386 from the same competitive-landscape review that produced CORE-384's `docs/CONVENTIONS.md` §"Declines" entries; CORE-388 (`skill-roster-utility-review`) named it a *related* "extension-first candidate that may fold into surfaces this review evaluates". CORE-389.1's downstream-impact reconcile already edited the line once — `ft-audit-docs` → "the consolidated audit skill's docs pass (post-[[CORE-EPIC-389]])" — because the named skill was being retired.

- **Drift check result — no new drift.** The one stale path in the line (`ft-audit-docs`) was reconciled by CORE-389.1 before this task started. Its replacement is live: `claude/skills/ft-audit/passes/docs.md` exists, carries the `audit-docs` attribution slug, and its hard rules explicitly skip `.flowtron/tasknote/archive/` while saying nothing about *active* tasknotes — confirming the gap statement is still accurate. Peer reference `spec-kit /speckit.analyze` unverified (external, not load-bearing for the chosen approach).

- **The gap, sharpened.** Phase 1's Drift check today cross-references the task description against **code only** ("file paths, line numbers, function names, and root-cause hypotheses … still match current code"). The Relevance Assessment asks "is this still the right work?" as a judgment call. Neither reads the tasknote's plan *against* its `PLAN.md` line or against the SPEC contracts the plan touches. Between Phase 1 (where the tasknote is derived from PLAN.md) and Phase 4 (where the PLAN line collapses to a `Completed YYYY-MM-DD.` stub and the long description is discarded), nothing re-checks that pairing.

- **Motivating case, one week old.** CORE-393 (`phase4-closure-hygiene`, completed 2026-08-01) was filed asserting the Phase 4 nav-chip flip was a gap. It was not — CORE-042.4 retired that write deliberately, and `SPEC.md` §"Tasknote body shape" says so at length. The contradiction survived filing and reached a full tasknote; Discovery caught it by judgment and re-scoped. `SPEC.md:340-344` now names this as a recurring misreading ("three months later, CORE-393"). That is exactly the class of failure a cross-referential drift check catches at the cheapest moment.

- **Why not the `/ft-audit docs` pass (operator-confirmed).** The pass is invoked episodically; active tasknotes are ephemeral. A sweep that runs when no tasknote is in flight finds nothing, and one that runs mid-task fires outside the phase flow where the correction is cheap. Its `## The 5 passes` count is also fixed by the dispatcher contract, so covering this would mean overloading pass 2 rather than adding a pass.

- **Why not a new Phase 2 box.** `docs/VISION.md` §"What we won't accept" sets the standing remedy for recurring drift as *a sharper SPEC clause, not a validator*, and §"Extension-first" prefers widening an existing shape over inventing a parallel one. Phase 1 already owns eight boxes and Phase 2 four; widening one existing bullet adds zero boxes to either.

- **Blast radius (6 files).** `SPEC.md` (checklist bullet + rationale paragraph) · `templates/tasknote-template.md` · `templates/tasknote-micro-template.md` (bold-prefix form) · `SPEC/procedures/ft-task.md` · `docs/GLOSSARY.md` · `docs/DOGFOOD.md`. The epic skills' own drift checks (`/ft-epic-discovery`, `/ft-close-epic`, `/ft-release`) are different surfaces — conversation-context paths, cohort deliverables, version-string locations — and are deliberately left alone.

- **Deferred:** `SPEC/procedures/ft-task.md` carries `last-verified: v5.13.0 · 2026-07-21`. Its contract (`SPEC/procedures/README.md:45`) bumps that stamp when the SOP is **re-checked against `source:`** — a full re-verification, not a single-bullet edit. Bumping it here would be a false currency claim; left as-is for `/ft-release`'s doc-currency shift.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established shape. The Drift check is already a multi-clause bullet stating one contract in `SPEC.md` and mirrored verbatim-in-substance into two templates, one procedure SOP, and two docs; this widening rides that existing projection chain rather than opening a new surface. The nearest parallel — the Best Practices Review bullet directly above it — carries the same "two things to verify, one bullet" shape.

- [x] **Minimal refactor gate** — no refactor. Six single-clause edits, each in a file that already stated this contract. No file gained or lost a section, box, or heading.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`; no code changed. Flowtron ships no markdown validator by design (`SPEC.md` §"What flowtron does NOT provide"), and adding one here would be the exact archetype the ticket's extension-first framing rejects.

**Implementation Notes:**

Six files, +23/−6. One contract, stated once and projected five times:

| File | Edit |
|---|---|
| `SPEC.md:423` | Drift check bullet widened — code cross-reference **and** plan-vs-`PLAN.md`-line-vs-SPEC cross-reference |
| `SPEC.md:431-443` | New rationale paragraph under the Phase 1 checklist — why the cross-artifact half is separate from the code half, why Phase 1 is the cheapest catch point, and the CORE-393 case that motivated it |
| `templates/tasknote-template.md:49` | Checklist-form mirror |
| `templates/tasknote-micro-template.md:22` | Bold-prefix-form mirror (micro-tasknotes have no checkboxes) |
| `SPEC/procedures/ft-task.md:136-139` | Agent-neutral SOP mirror — contract-only agents (Codex, Grok) get the same check |
| `docs/GLOSSARY.md:45` | Definition restated as two named halves, with the cross-reference-not-judgment distinction |
| `docs/DOGFOOD.md:105` | Phase 1 walkthrough step 5 |

Two deliberate framings carried through every surface:

- **"read them, don't recall them."** The ticket's own diagnosis was that the Relevance Assessment "tests staleness by judgment rather than by cross-reference." A clause that merely said "check consistency" would have reproduced the judgment call it was written to replace, so each mirror names the artifacts to open.
- **No new box.** Phase 1 already carries eight checklist items and Phase 2 four. The widening adds zero to either — the reason this landed on an existing bullet rather than a new Phase 2 step.

Left alone on purpose: the epic skills' own drift checks (`/ft-epic-discovery`, `/ft-close-epic`, `/ft-release`) verify different things — conversation-context paths, cohort-child deliverables, version-string locations — and none of them scaffolds a tasknote plan to cross-reference.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; six markdown contract files, no code. The repo's only registered test gate (`tools/update-adopters.test.mjs`) covers the fleet updater and is untouched.

- [x] Ran lint/type-check on changed code — `N/A`; no lint tooling at repo root (no `package.json` / `justfile`). Substituted a grep-based completeness check, below.

- [x] **Quality assertions** — see Testing Notes.

- [x] (frontend) Asked the user for visual confirmation — `N/A`; no frontend surface touched (`viz/` untouched).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Completeness check (stands in for the absent linter).** A repo-wide grep for the old code-only phrasings across every contract and wiring surface returns exactly the six edited lines and nothing else:

```sh
grep -rn "still match current code\|still match the code\|match current HEAD" \
  SPEC.md SPEC/ templates/ docs/ claude/ codex/ grok/
# → 6 hits, all carrying the widened wording
```

No seventh surface was left restating the narrow contract. `git diff --stat` confirms the footprint: 6 files, +23/−6.

**Quality assertions:**

- **No avoidable duplication.** The projection chain is pre-existing — `SPEC.md` is canonical and the other five files already mirrored the Drift check before this task. Each edit changes an existing sentence; none adds a new statement of the contract.
- **No dead content.** Every edited line was live and reachable before the edit.
- **No unexplained complexity.** The clause names the two artifacts to open. The reasoning behind it lives in one place (the `SPEC.md` rationale paragraph), not repeated across the mirrors.
- **No public-surface growth.** Zero new checklist boxes, sections, headings, skills, flags, or frontmatter fields. Phase 1 still has eight boxes; Phase 2 still has four.
- **No stale contract-facing documentation.** `docs/GLOSSARY.md` and `docs/DOGFOOD.md` — the two surfaces that *define* and *walk through* the step for readers — were updated in the same diff rather than left describing the narrow version.
- **Wikilink integrity.** `grep -on "\[\[[A-Z]\+-[0-9.A-Z]*\]\]"` across changed files returns only pre-existing links (`[[TASK-ID]]` placeholders, `[[CORE-269]]` in DOGFOOD). CORE-393 / CORE-042.4 are cited bare in the new `SPEC.md` prose, matching the existing house style at `SPEC.md:340-344`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below.

| Doc | Verdict |
|---|---|
| `README.md` | **No change** — line 191 points at `SPEC.md` §"📝 Phase 1: Discovery" for the archive-skim/recall framing; a pointer, not a restatement of the Drift check's coverage. |
| `SPEC.md` | **Updated** — Drift check bullet widened (`:423`) + new rationale paragraph (`:431-443`). This task's primary deliverable. |
| `docs/MIGRATION.md` | **No change** — line 411 says "apply Phase 1's drift check fully" when rewrapping a legacy tasknote under a new ID. Deferential by construction; the widened check now applies there automatically, and the sentence is still accurate. |
| `claude/AGENTS-snippet.md` | **No change** — zero hits; snippet does not enumerate Phase 1 steps. |
| `codex/AGENTS-snippet.md` | **No change** — zero hits; wiring commands only. |
| `docs/CONVENTIONS.md` | **No change** — zero hits. The `## Declines` set is untouched; this task adds no tooling to decline. |
| `CONTRIBUTING.md` | **No change** — zero hits. |
| `SECURITY.md` | **No change** — zero hits. Worth noting the widened check reads `PLAN.md` + SPEC, both first-party repo content already in the trust boundary; no new untrusted-input surface. |
| `docs/AGENT-NEUTRALITY.md` | **No change** — line 36 logs §"📝 Phase 1: Discovery" as one of five `--fast` sites in `SPEC.md`. The widening touches neither `--fast` nor the Claude-specific-surface ledger; site count unchanged. |
| `docs/PLATFORMS.md` | **No change** — zero hits. The Codex/Grok wiring reaches this via `SPEC/procedures/ft-task.md`, which was updated in-diff. |
| `claude/CAPABILITIES.md` | **No change** — zero hits; no capability trigger involved. |
| `docs/AGENT-COMPAT.md` | **No change** — zero hits; no per-agent render/emit behavior changed (no new glyph, cue, or banner). |

Two non-list docs were also updated as projections of the changed contract: `docs/GLOSSARY.md` (defines the step) and `docs/DOGFOOD.md` (walks it). Neither is on the AI-referenced list, but leaving them describing the narrow version would have been the drift this task exists to catch.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Closed the cross-artifact-consistency gap by widening Phase 1's Drift check instead of adding a skill: it now cross-references the plan a tasknote is forming against its `PLAN.md` line and the SPEC contracts it touches, not just against the code. The check was already the workflow's cross-reference step — it simply only ever looked at one of the three artifacts.

**Changed:** 6 files, +23/−6. `SPEC.md` (bullet at `:423` + a 13-line rationale paragraph at `:431`), `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`, `SPEC/procedures/ft-task.md`, `docs/GLOSSARY.md`, `docs/DOGFOOD.md`.

**Verification:** no test or lint gate applies (six markdown contract files; repo root has no `package.json`/`justfile`, and the one registered test gate covers the fleet updater). Substituted a repo-wide grep for the old code-only phrasings across `SPEC.md`, `SPEC/`, `templates/`, `docs/`, `claude/`, `codex/`, `grok/` — exactly 6 hits, all carrying the widened wording, no seventh surface left behind. Wikilink scan on changed files returned only pre-existing links.

**Refactors:** none made, none deferred. Every edit rewrote one existing sentence in a file that already stated this contract; no file gained or lost a section, box, or heading.

**Documentation:** all 12 AI-referenced docs swept with per-entry verdicts — 1 updated (`SPEC.md`), 11 no-change, each with a reason. `docs/GLOSSARY.md` and `docs/DOGFOOD.md` updated additionally as off-list projections.

**Deferred:** `SPEC/procedures/ft-task.md`'s `last-verified: v5.13.0 · 2026-07-21` stamp left alone. Its contract bumps it on a full re-check against `source:`, not on a single-bullet edit; bumping here would assert currency this task did not establish. `/ft-release`'s doc-currency shift owns it.

**Maintainability effect:** zero surface growth — no new skill (roster stays 19), no new checklist box (Phase 1 stays at 8, Phase 2 at 4), no validator, no frontmatter field. What changed is the cost of one specific failure: a ticket whose plan contradicts a settled SPEC contract now gets caught by a cross-reference at the top of Discovery rather than by whether the assistant happened to remember the clause. The concrete precedent is one week old — CORE-393 was filed to undo a decision CORE-042.4 settled and `SPEC.md` documents as settled, and reached a full tasknote before anyone reread it. The carrying cost is one contract mirrored across six files, which is the projection chain the Drift check already had.

**Archived:** 2026-08-02
