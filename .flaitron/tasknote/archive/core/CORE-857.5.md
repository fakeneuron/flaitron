---
title: small-task-routing
status: completed
tags: [routing, micro, context-redundancy]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-856, CORE-857.1, CORE-857.2, CORE-818]
blocked-by:
  - CORE-857.2
touches:
  - SPEC/tasknote-selection.md
  - claude/skills/ft-task/micro-mode.md
  - templates/tasknote-micro-template.md
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/SKILL.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-audit/SKILL.md
  - SPEC/plan-filing.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-857.5 | small-task-routing

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-857]] [[CORE-856]] [[CORE-857.2]]

## 🎯 Goal

Stop small tasks over-routing: make the doc-patch skip rule outrank "has a PLAN ID" at a ~25-line threshold, let the micro ⚡ log drop its `N/A`-prone lines, and have `/ft-task` Step 1 name the tier the PLAN line implies as an advisory.

## ✅ Acceptance

- [x] A1 — `SPEC/tasknote-selection.md` makes the skip list outrank a PLAN.md ID (use-list ID bullet qualified; one paragraph naming the direct-edit close and the Step 1 advisory) and the doc-patch threshold reads ~25 lines — `grep -q 'under ~25 lines' SPEC/tasknote-selection.md && grep -q 'fits none of the skip cases' SPEC/tasknote-selection.md && grep -q 'skip-tier closures' SPEC/tasknote-selection.md`
- [x] A2 — `SPEC/plan-filing.md` carries §"Exception — skip-tier closures": a self-contained stub that still ends `Completed YYYY-MM-DD.` and keeps `| shortname` (so Pair R, rotation date resolution, and ID allocation need no change) — `grep -q 'Exception — skip-tier closures' SPEC/plan-filing.md && bash tools/drift-checks.sh pair_r`
- [x] A3 — micro ⚡ log folds an `N/A` Best Practices Review / External review / Docs touched verdict into one `**N/A:**` line with each reason; the obligations still run — `grep -q '\*\*N/A:\*\*' templates/tasknote-micro-template.md && grep -q '\*\*N/A:\*\*' claude/skills/ft-task/micro-mode.md`
- [x] A4 — the preamble's §"Locate and capture" carries a tier advisory: names skip / micro / full when it differs from the invoked shape, never changes flags; on skip (attended, no `--fast`) asks once — edit directly vs run as invoked; `--fast` / `--unattended` / `[unattended]` proceed as invoked — `grep -q 'Tier advisory' claude/skills/ft-task/preamble.md`
- [x] A5 — no stale ~10-line threshold or "decline to scaffold" rule remains in live contract/skill text, and the procedure mirrors the advisory — `! git grep -n -e '~10-line' -e 'under ~10 lines' -- SPEC claude templates docs ':!*/archive/*' ':!docs/HARNESS-SURVEY.md' && ! grep -q 'decline to scaffold' claude/skills/ft-task/SKILL.md && grep -q 'Tier advisory' SPEC/procedures/ft-task.md`
- [x] A6 — every touched file under its `docs/CONTEXT-BUDGET.md` cap; citations resolve; final newlines — `bash tools/drift-checks.sh`
- [x] A7 — drift-check self-test still green — `node --test tools/drift-checks.test.mjs`

## 🧩 Subtasks

- [x] `SPEC/tasknote-selection.md` — qualify the ID bullet, ~10 → ~25, add the skip-wins paragraph (direct-edit close for standalone rows; epic children keep a tasknote; Step 1 advisory)
- [x] `SPEC/plan-filing.md` — add §"Exception — skip-tier closures" beside the inline-audit-fix exception
- [x] `templates/tasknote-micro-template.md` + `claude/skills/ft-task/micro-mode.md` — the `**N/A:**` fold
- [x] `claude/skills/ft-task/preamble.md` — Tier advisory in §"Locate and capture"
- [x] `claude/skills/ft-task/SKILL.md` Notes — replace the "decline to scaffold" bullet with a pointer to the advisory
- [x] `SPEC/procedures/ft-task.md` — ~25 threshold in §"When to run this procedure"; mirror the Tier advisory into Step 1
- [x] `claude/skills/ft-audit/SKILL.md` — inline-fix carve-out threshold ~10 → ~25 (restates the SPEC number)
- [x] `docs/CONTEXT-BUDGET.md` — ledger holds for any budgeted file this grows; run drift checks

## 🔗 Related

- [[CORE-EPIC-857]] — parent epic (`context-redundancy`)
- [[CORE-856]] — the survey whose bucket E measured six of ten small closures over-routed (predecessor)
- [[CORE-857.2]] — procedure point-not-narrate; this child mirrors into the same file after it (Fan-out Sequential)
- [[CORE-818]] — made micro the routing default for known work; this edits the fragment it wired

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-856 bucket E measured the defect (six of ten small closures over-routed; the `:13`/`:20` contradiction is still at HEAD); `.2` closed, so the procedure mirror is unblocked.

- [x] Read relevant source files — `SPEC/tasknote-selection.md` (use/skip + micro routing), `claude/skills/ft-task/micro-mode.md`, `templates/tasknote-micro-template.md`, `claude/skills/ft-task/preamble.md`, `SPEC/procedures/ft-task.md` §"When to run" + Step 1, `SPEC/plan-filing.md` (Completed convention, inline-fix exception, rotation date resolution, ID allocation), `SPEC.md` §Phase 3 External review `N/A`, `SPEC/cue-vocabulary.md` non-cue glyphs, `tools/drift-checks.sh` `pair_r`, `docs/CONTEXT-BUDGET.md` rows

- [x] **Best Practices Review** — contract-boundary work: the threshold number and the skip-wins rule live once in `tasknote-selection.md`; the procedure, `ft-task` Notes, and `ft-audit` restate the number and must follow. The closure form belongs to `plan-filing.md` (owner of stub forms), not the routing module. The advisory belongs in `preamble.md` (every-run Step 1), mirrored in the procedure's Step 1 per its agent-neutral-mirror role.

- [x] **Archive skim** — `archive/core/` (area confirmed in the README table) has 301 path hits, so scoped to the predecessor cohort: [[CORE-818]] made micro the default and fixed "explicit opt-in, never runner auto-select" — the advisory must keep that. [[CORE-778.2]] set the micro External review to the normal rule (run it, or `N/A` with reason) — the fold keeps the reason. [[CORE-724.3]] budgeted `tasknote-selection.md` at 12,500 (now 10,723). [[CORE-856]] §E is the evidence; [[CORE-857.1]] Resolved scoping fixed all four fixes and the ~25 threshold.

- [x] **Drift check** — PLAN line matches `.1`'s scoping table. `:13` / `:20` cited lines still hold the contradiction. Drift found and reconciled with the operator: `ft-task/SKILL.md:146` says "decline to scaffold" on skip-tier, which contradicts "advisory, never auto-select" (Q1 below). Two restatements of the ~10 number exist outside the PLAN line's list — `SPEC/procedures/ft-task.md:34` (in scope: mirror) and `claude/skills/ft-audit/SKILL.md:96` (added to scope: it restates the SPEC number). A filed row closed without a tasknote has no stub form today — added `SPEC/plan-filing.md` to scope.

- [x] Asked clarifying questions — AskUserQuestion, 2026-11-01:

  | question | answer |
  |---|---|
  | Skip-tier advisory behavior | Advise, ask once (edit directly + self-contained Completed close, or run as invoked), then proceed; `--fast`/`--unattended` proceed as invoked; replaces "decline to scaffold" |
  | Micro `N/A` lines | Collapse into one `**N/A:**` line carrying each reason (keeps SPEC.md's "records `N/A` with a one-line reason") |

  Assumptions asserted: (1) the direct-edit close applies to standalone rows; an epic child keeps a tasknote, since its closure drives the parent flip (`SPEC/plan-filing.md` §"Epic parent flip"). (2) The skip-tier stub keeps `| shortname` and ends `Completed YYYY-MM-DD.`, so Pair R, rotation date resolution, and ID allocation hold unchanged. (3) The advisory reuses ⚠️ (registered "inline advisory" non-cue glyph) and fires only when the implied tier differs from the invoked shape; no line when they agree, and none when a tasknote for the ID already exists. (4) `SPEC.md` §Phase 3 "When it is `N/A`" points at the module for the skip shape and needs no edit.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Downstream.** [[CORE-857.4]] trims `ft-task/SKILL.md` and names "epic Notes L145"; this task rewrites the adjacent L146 bullet to a shorter pointer, which only helps `.4`'s ≤23,500 B target — no reconcile edit needed. `.N` re-measures cold start, which now includes the preamble's advisory bytes.

**Budget headroom.** `preamble.md` 7,513 / 9,000 · `procedures/ft-task.md` 25,042 / 26,000 · `tasknote-selection.md` 10,723 / 12,500 · `micro-mode.md` and the micro template carry no row of their own.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: the skip-tier stub copies §"Exception — inline audit fixes"'s self-contained-row idea but keeps the standard `Completed YYYY-MM-DD.` tail so Pair R / rotation / ID allocation need no carve-out; the tier advisory copies the preamble's own filing-discipline advisory (⚠️ one-liner, never blocks); the `**N/A:**` fold is one more bold-prefix line in the existing ⚡ log.

- [x] **Minimal refactor gate** — no refactor; `SKILL.md` Notes bullet shortened to a pointer only because its "decline to scaffold" rule contradicted the advisory.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract only; `tools/drift-checks.sh` (`pair_r`, `pair_q`, `context_budget`) and its self-test cover the surfaces touched

**Implementation Notes:**

- `SPEC/tasknote-selection.md` — ID bullet now "…and fits none of the skip cases below"; doc-patch threshold ~10 → ~25; new paragraph: skip wins over an ID, standalone rows close by direct edit as a self-contained stub, epic children keep a tasknote, Step 1 names the tier as an advisory.
- `SPEC/plan-filing.md` — §"Exception — skip-tier closures": `- [x] **TASK-ID** [model] | shortname — <what changed>; no tasknote. Completed YYYY-MM-DD.`, edit + row in one commit.
- `claude/skills/ft-task/preamble.md` — **Tier advisory** in §"Locate and capture" after the 🎯 blurb: fires only on a mismatch with the invoked shape and only when no tasknote exists; never changes flags; on skip, attended and not `fast-mode`, one AskUserQuestion (run as invoked / edit directly → foreign-dirt gate, edit, stub, one commit, no push).
- `SPEC/procedures/ft-task.md` — §"When to run" now defers to the Step 1 advisory with the ~25 number; Step 1 mirrors the advisory in agent-neutral terms (structured ask, Step 3's foreign-dirt gate).
- `claude/skills/ft-task/SKILL.md` Notes — "decline to scaffold" → pointer to the advisory, "never decline on your own".
- `claude/skills/ft-task/micro-mode.md` + `templates/tasknote-micro-template.md` — `N/A` Best Practices / External review / Docs touched fold into one `**N/A:**` line with each reason; obligations still run; the three placeholders point at the fold.
- `claude/skills/ft-audit/SKILL.md` — inline-fix carve-out restates ~25.
- `docs/CONTEXT-BUDGET.md` — "held" ledger entries for the three budgeted files that grew.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0 (21/21)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (all checks ok)

- [x] **Verification receipt** — receipt below; no duplication beyond the deliberate procedure mirror; the one stale-number hit is the dated survey record, left as history

- [x] **External review** — `/code-review medium` on this task's working-tree diff; 10 findings: 1 blocker (returned to Phase 2, fixed, Phase 3 re-run), 8 notes fixed, 1 note no-change; dispositions in Testing Notes

- [x] (frontend) `N/A` — no rendered surface changed

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:
- A1 `grep -q 'under ~25 lines' … && grep -q 'fits none of the skip cases' … && grep -q 'skip-tier closures' SPEC/tasknote-selection.md` → 0
- A2 `grep -q 'Exception — skip-tier closures' SPEC/plan-filing.md && bash tools/drift-checks.sh pair_r` → 0
- A3 `grep -q '\*\*N/A:\*\*'` on micro template + `micro-mode.md` → 0
- A4 `grep -q 'Tier advisory' claude/skills/ft-task/preamble.md` → 0
- A5 first run → 1: `docs/HARNESS-SURVEY.md:404` — the dated 2026-11-01 survey quoting the old `:20` text. A historical record, kept; the verify command now excludes it (`':!docs/HARNESS-SURVEY.md'`) → 0
- A6 `bash tools/drift-checks.sh` → 0 (`context_budget ok`: preamble 8,524 / 9,000 · procedure 25,765 / 26,000 · tasknote-selection 11,180 / 12,500)
- A7 `node --test tools/drift-checks.test.mjs` → 0
- Re-run after the review fixes: A1–A7 → 0

External review (`/code-review medium`, working-tree diff), graded against Acceptance:
1. **Blocker (A4)** — the edit-directly path ran before §Pre-flight / §Model gate, skipping the model gate. Fixed: the path now runs once both pass (preamble + procedure).
2. Note — the advisory ignored a sidequest stub, which would be orphaned by a direct-edit close. Fixed: the advisory also skips when `.flaitron/sidequest/<ID>.md` exists.
3. Note — on Re-scope, the folded `**N/A:**` Best Practices entry was not carried into the Phase 1 box. Fixed: the fold paragraph says Re-scope carries the line and ticks the boxes it discharges.
4. Note — the `**N/A:**` line sits out of phase order. Covered by fix 3 plus "a folded line counts as filled"; the position is kept so one line collects all three phases.
5. Note — the skip-tier stub example dropped the trailing bracket-token run. Fixed: "verbatim trailing bracket-token run … apply unchanged".
6. Note — §"Why each source" named only inline audit fixes as row-only records. Fixed: it names skip-tier closures too.
7. Note — the edit-directly commit has no 📦. No change: the operator picks the route at the ask, and an autonomous commit of a doc-only diff matches `SPEC/gates.md` §"Conditional skip rule"'s skip branch.
8. Note — the procedure's "When to run" lacked the epic-child exception. Fixed: "a standalone row's PLAN.md ID".
9. Note — `--debug` / `--loop` runs would get a "reads as micro" warning that suggests a refused route. Fixed: the advisory is skipped under those flags (preamble + procedure).
10. Note — the procedure mirror dropped "never push". Fixed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 17 entries "no change": none restates the skip-threshold number or the micro ⚡ line labels (`git grep` for `micro` / `⚡` / `10 lines` across them); `claude/CAPABILITIES.md`'s `--micro` row and `docs/GLOSSARY.md` say "above the skip threshold" without a number; `docs/EXTERNAL-AGENTS.md` pins no micro label

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the rule now lives in the always-read preamble and the procedure's Step 1, which is the always-loaded layer for this behavior

**Final Summary:**

Small tasks now route by size before ID. A doc patch under ~25 lines skips the tasknote even when it has a PLAN.md ID. Such a standalone row closes by direct edit as a self-contained stub, while an epic child keeps its tasknote. `/ft-task` Step 1 flags a tier mismatch in one ⚠️ line and never changes flags. On a skip-tier row with the operator present, it asks once whether to run as invoked or edit directly. Micro notes fold `N/A` Best Practices / External review / Docs lines into one `**N/A:**` line, keeping each reason.

- Changed: `SPEC/tasknote-selection.md`, `SPEC/plan-filing.md` (§"Exception — skip-tier closures", ID-allocation rationale), `claude/skills/ft-task/preamble.md` (Tier advisory), `SPEC/procedures/ft-task.md` (mirror + ~25), `claude/skills/ft-task/SKILL.md` (Notes pointer), `claude/skills/ft-task/micro-mode.md` + `templates/tasknote-micro-template.md` (`N/A` fold), `claude/skills/ft-audit/SKILL.md` (~25), `docs/CONTEXT-BUDGET.md` (three held entries).
- Verification: A1–A7 → 0, before and after the review fixes; the first A5 run's single hit was the dated survey record, which the verify command now excludes.
- External review: 1 blocker (edit-directly path skipped the model gate) fixed; 8 notes fixed; 1 note no-change with reason.
- Refactors: none. Doc verdict: sweep "no change" throughout.
- `touches:` reconciliation: `git diff --name-only` = the nine declared paths; no undeclared path.
- Maintainability: the threshold number now lives once in the routing module plus three named restatements (procedure, `ft-audit`, survey history). Budgets: preamble 8,524 / 9,000, procedure 25,765 / 26,000 (235 B headroom; `.N` should note it), tasknote-selection 11,180 / 12,500.

**Archived:** 2026-11-01
