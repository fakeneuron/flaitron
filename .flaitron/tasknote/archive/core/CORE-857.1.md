---
title: context-redundancy discovery
status: completed
tags: [context, epic-discovery]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-856, CORE-EPIC-724]
---

# CORE-857.1 | context-redundancy discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-857]] [[CORE-856]] [[CORE-EPIC-724]]

## 🎯 Goal

Scope the `CORE-EPIC-857` epic (`context-redundancy`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-857.2..6` in `.flaitron/PLAN.md`, each bound to the byte target the CORE-856 survey measured.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-857.2 .. CORE-857.6 filed in .flaitron/PLAN.md (all under the 70w hard cap; `.5` at 65w is over the 50w target by operator-selected scope)
- [x] Audit line CORE-857.N reviewed and confirmed as-filed (re-measure clause already present)
- [x] Phase 4 doc-drift sweep at closure: no AI-referenced doc updates (pure Discovery filing)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-857.2 .. CORE-857.6; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-857 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-857]] — parent epic
- [[CORE-856]] — the survey whose §Filing proposed this epic's shape and byte targets (predecessor)
- [[CORE-EPIC-724]] — `context-diet` (2026-10-07), the prior trim pass whose cold-start-trim / lazy-module-trim / skill-body-dedupe children are the mechanical precedent

## 🌳 Fan-out

- **Parallel:** [[CORE-857.2]] · [[CORE-857.3]] · [[CORE-857.6]] — disjoint files (`SPEC/procedures/ft-task.md` / `.flaitron/tasknote/README.md` + new `docs/DOC-DRIFT-SWEEP.md` / `SPEC.md` + `SPEC/scope-boundaries.md`)
- **Sequential:** [[CORE-857.4]] after [[CORE-857.6]] (pointers target final SPEC headings) · [[CORE-857.5]] after [[CORE-857.2]] (both edit the procedure)
- **Synthesis:** [[CORE-857.N]] — audit + per-runner cold-start re-measure

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed on the operator's go at CORE-856's 📦 against the survey's recommendation (a); the children's byte targets are measured, not guessed.

- [x] Read relevant source files — the five child surfaces were read and bucketed by CORE-856's five probes this session (`SPEC/procedures/ft-task.md`, `claude/skills/ft-task/SKILL.md`, `.flaitron/tasknote/README.md`, `SPEC/tasknote-selection.md`, `SPEC.md`); the distilled tables are in `docs/HARNESS-SURVEY.md` §"2026-11-01" and `archive/core/CORE-856.md` Implementation Notes

- [x] **Best Practices Review** — `N/A`: PLAN.md filing; no code boundary

- [x] **Archive skim** — path greps over `archive/core/` return hundreds of hits for the always-loaded files (README 771, procedure 192, tasknote-selection 270), so the skim was scoped to the predecessor cohort instead of a probe: findings below

- [x] **Drift check** — every byte figure the children cite was measured at HEAD this session (`63cbb972` carries them); nothing has changed on those files since. The PLAN rows match the Step 3 confirmation.

- [x] Asked clarifying questions — resolved via AskUserQuestion, table below

- [x] Subtasks above populated with ordered steps; `touches:` omitted (PLAN rows + this note are the only deliverables)

**Discovery Notes:**

**Shared design surface.** Five always-loaded or near-universal files, one per child, plus their guards: `tools/drift-checks.sh` `pair_q` (every `§"…"` citation must resolve — the cost of any heading move), `pair_s` (AGENTS.md ↔ paste-block literals), `context_budget` (every trimmed file's cap must be lowered, or the regrowth CORE-856 measured repeats). Adopter wiring: `SPEC/`, `templates/`, and `claude/skills/` ship to adopters via the submodule; `.flaitron/tasknote/README.md` does **not** — `templates/tasknote-README.md` carries none of the five history paragraphs (grep for CORE-543 / 622.3 / 489.3 → 0), so `.3` is flaitron-self only. `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" pins `SPEC.md` heading names; `.6` moves prose under headings, never the headings.

**Archive precedents (load-bearing).** [[CORE-724.4]] did the same point-not-narrate move on the procedure (34,320 → 32,740) and 11 skill bodies and drew 9 blockers across two review passes — "most blockers were cuts that took a unique rule with them"; `.2` and `.4` inherit that risk, hence `[heavy]`. [[CORE-724.3]] set tasknote-selection's first budget row (12,500) — `.5` adds prose there and must stay under it or trade bytes. [[CORE-724.5]] established the template-vs-self split `.3` relies on. [[CORE-657]] (De-scoped): the nav-chip "history" in `SPEC.md` is CORE-393 hardening — `.6`'s filter. [[CORE-818]] made micro the default for known work (2026-10-22); `.5`'s "lighter micro log" edits the fragment CORE-818 wired. [[CORE-727]] named CORE-728 / 750 / 766 as over-ceremony without filing — `.5` is that follow-up.

**Resolved scoping** (AskUserQuestion, 2026-11-01):

| question | answer |
|---|---|
| Shortname / model / M / audit | `context-redundancy` · `[heavy]` · M=5 · `.N` kept |
| Priority | High (AI-decided, confirmed) |
| `.3` history home | new `docs/DOC-DRIFT-SWEEP.md`; README keeps the list + one pointer |
| `.5` scope | all four: resolve `tasknote-selection.md:13` vs `:20`; lighter micro log (drop N/A-prone lines); `/ft-task` Step 1 tier advisory (never auto-select); raise the doc-patch skip threshold ~10 → ~25 lines |
| Per-child models | `.2` `[heavy]`, `.3` `[moderate]`, `.4` `[heavy]`, `.5` `[heavy]`, `.6` `[heavy]` |

**Fan-out reasoning.** `.2`, `.3`, `.6` touch disjoint files and can run in parallel worktrees. `.4` repoints the skill at SPEC headings, so it follows `.6` (which may stub a heading). `.5` mirrors its routing change into the procedure, so it follows `.2` to avoid a merge on the same file. `.N` synthesizes and re-measures.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the epic-cohort filing pattern (CORE-EPIC-724's children in `PLAN-ARCHIVE.md`: 2-space indent, `[model]` glyph on every row, em-dash, byte targets in the description)

- [x] **Minimal refactor gate** — `N/A`: PLAN rows only

- [x] Implemented the minimal solution — five rows written under CORE-EPIC-857 between `.1` and `.N`

- [x] Updated/added tests for non-trivial behavior — `N/A`: no executable surface

**Implementation Notes:**

- 5 lines written (`.2`–`.6`); M unchanged from the filing-time estimate. Word counts 49 / 40 / 54 / 65 / 58 — all under the 70w cap; `.5` exceeds the 50w target because it carries the four fixes the operator selected.
- Per-child `[model]`: `.3` departs from the `[heavy]` seed to `[moderate]` (a file move with a byte target); `.2` `.4` `.5` `.6` uniform `[heavy]`. Operator accepted in Discovery.
- Downstream-impact scan over the rest of the active PLAN (CORE-855 release, CORE-641 parked, FE-151 viz): no downstream impact.
- `[unattended]` candidacy: `.3` admitted (clause 1 `[moderate]`; clause 3 screen clean; clause 6 predecessor `.1` closes in this motion), confirmed by the operator and written after `[moderate]🧩`. `.2` `.4` `.5` `.6` and `.N` are bare `[heavy]` → not candidates; nothing cascaded.
- Fan-out filled: Parallel `.2` `.3` `.6` · Sequential `.4` after `.6`, `.5` after `.2` · Synthesis `.N`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: PLAN rows

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (receipt below)

- [x] **Verification receipt** — markdown mental-pass: 2-space indent on all seven child rows; bold IDs intact; `[model]` + glyph on every row; `[unattended]` sits after `[moderate]🧩` and before `| readme-history-out` on `.3` only; `| shortname` ≤30 chars; em-dash separators; no trailing whitespace; `## 🌳 Fan-out` present with wikilinks matching the filed IDs

- [x] **External review** — `N/A`: the deliverable is filed PLAN rows, not a diff to grade

- [x] (frontend) `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → 0 (run after the PLAN edits; `pair_r` covers the `.1` stub's shortname pipe)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all "no change": pure Discovery filing; the contract edits land inside `.2`–`.6`

- [x] Closed — Acceptance ticked, `status: completed`, `.1` row → `Completed 2026-11-01.` stub nested under CORE-EPIC-857 in `## High`, note moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** — below

- [x] **Learnings** — `N/A`

**Final Summary:**

Filed CORE-EPIC-857 `context-redundancy` and scoped five implementation children from the CORE-856 survey's measured buckets. They are `.2` procedure-point-not-narrate, `.3` readme-history-out (`[moderate]`, `[unattended]`), `.4` skill-b2-pointers, `.5` small-task-routing, and `.6` spec-c-extraction. The `.N` audit is kept as filed and adds a per-runner cold-start re-measure.

- Every child carries a byte target from the survey's classification table and names the cap it lowers, so the regrowth CORE-856 measured (51% of the diet's cut back in 25 days) cannot silently repeat.
- Operator decisions are in the Resolved scoping table: history home `docs/DOC-DRIFT-SWEEP.md`; all four routing fixes in `.5` including a ~25-line skip threshold; `.3` at `[moderate]`, the rest `[heavy]`.
- Fan-out: `.2` `.3` `.6` parallel; `.4` after `.6`; `.5` after `.2`.
- No contract file changed in this task. `touches:` omitted: the deliverable is the PLAN rows and this note.

**Archived:** 2026-11-01
