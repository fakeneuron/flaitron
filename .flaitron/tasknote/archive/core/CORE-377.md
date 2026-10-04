---
title: platforms-worked-example-currency
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: [CORE-374, CORE-375, CORE-376, CORE-271.5, CORE-257]
---

# CORE-377 | platforms-worked-example-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-374]] [[CORE-375]] [[CORE-376]] [[CORE-271.5]] [[CORE-257]]

## 🎯 Goal

Clear the four currency/consistency defects in `docs/PLATFORMS.md` surfaced by the 2026-07-27 audit-docs sweep: dead adopter names, an undercounted `--fast` surface, a self-contradicting Grok structured-ask cell, and a malformed table row.

## ✅ Acceptance

- [x] `docs/PLATFORMS.md:94` cites only adopters that exist today; the load-bearing claim (adopter symlinks point at `../../.flowtron/core/claude/...`, so that path is non-negotiable) is preserved
- [x] `docs/PLATFORMS.md:220` lists the `--fast` surface as the four skills `SPEC/gates.md` §"`--fast` operator override" names (`/ft-task`, `/ft-micro-task`, `/ft-debug`, `/ft-goal-task`)
- [x] The Grok **Structured ask** cell states one coherent position — the observed behavior leads, the launch-doc assumption is marked as superseded — with no self-refuting sentence pair
- [x] The Grok **Procedure pointer** row carries four cells, matching the table's four-column header and the Codex table's equivalent row
- [x] No other `docs/PLATFORMS.md` content changed; `docs/PHILOSOPHY.md` and `.flowtron/PLAN.md` origin-story mentions of fintown/photard are left intact (past-tense history, not currency claims)

## 🧩 Subtasks

- [x] Fix `:94` — replace `(InvisiPaw, fintown, photard)` with live adopters
- [x] Fix `:220` — expand the `--fast` skill list to four, with a parenthetical for `/ft-spec`'s unrelated flag
- [x] Fix `:286` — rewrite the Grok Structured-ask cell so observation leads and the launch-doc claim reads as superseded
- [x] Fix `:287` — add the missing "When to reach for it" cell to the Grok Procedure-pointer row
- [x] Verify no other live doc makes the same four claims; re-grep the fixed strings

## 🔗 Related

- [[CORE-374]] — sibling audit-docs finding (conventions declines count)
- [[CORE-375]] — sibling audit-docs finding (AGENT-NEUTRALITY.md ledger currency, incl. the `--fast` "3 sites" row)
- [[CORE-376]] — sibling audit-docs finding (SPEC omissions mirror)
- [[CORE-271.5]] — added the Grok Procedure-pointer row (origin of the 3-cell defect)
- [[CORE-257]] — Grok dogfood that produced the structured-ask observation now contradicting the cell

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four cited defects reproduce verbatim at the cited line numbers in current `docs/PLATFORMS.md`; none has been fixed by an intervening commit.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A` — documentation-only task; no code, module boundaries, or dependency direction in scope.

- [x] **Archive skim** — `grep -l PLATFORMS.md archive/core/*.md` returns ~20 hits. Load-bearing findings:
  - `CORE-271.5` (`83f7a40`) added the Grok **Procedure pointer** row — `git log -L 287,287` confirms the 3-cell row is an authoring slip at insertion, not a deliberate shape. The Codex table's equivalent row (`:305`) has all four cells and is the correct model to mirror.
  - `CORE-133` / `CORE-136` / `CORE-182` are a prior *series* of fintown/photard leak-cleanups (2026-05-22 → 2026-05-24) across `SPEC.md` and `MIGRATION.md`. `docs/PLATFORMS.md:94` was missed by that sweep — this task is the tail of a known, repeatedly-fixed drift class, which raises confidence that removing the names is the intended treatment.
  - `CORE-154.3` locked the wiring-layer structure and is what `:92-96` cites as non-negotiable. The *claim* at `:94` (adopter symlink path stability) is still true and must survive; only the example names are stale.

- [x] **Drift check** — all four citations verified against current `docs/PLATFORMS.md`:
  - `:94` — `production (InvisiPaw, fintown, photard) point at` ✅ reproduces. `~/code` scan: `fintown` absent entirely; `photard` renamed → `siteguy` (2026-06-13, CORE-44.3). `InvisiPaw` still live. Verified six adopters (`InvisiPaw`, `siteguy`, `marscharts`, `bidviz`, `bananapeel`, `wandora`) all resolve `.claude/skills/ft-task → ../../.flowtron/core/claude/skills/ft-task`, so the cited path is exactly right.
  - `:220` — `` `--fast` / `-f` on `/ft-task` and `/ft-micro-task` `` ✅ reproduces. `SPEC/gates.md:302-307` is authoritative: four skills, and `/ft-spec` carries a separate unrelated `--fast`. `grep -l` over `claude/skills/*/SKILL.md` returns seven files mentioning `--fast`, but three are non-gate mentions (`ft-spec` = unrelated flag; `ft-worktree-start`/`ft-worktree-end` = prose references), so the contract's four is correct.
  - `:286` — Structured-ask cell asserts `Grok Build will always use prose asks per launch docs.` then immediately parenthesizes the 2026-06-01 CORE-257 observation that AskUserQuestion rendered a clean multi-option UI ✅ reproduces. Note `:266` (prose, same doc) already states the corrected position — "Structured ask primitive observed to work (divergence from launch-coverage assumption in the triggers table below)" — so the doc is internally inconsistent and `:266` shows the intended direction.
  - `:287` — Grok Procedure-pointer row has 3 cells against the 4-column header (`Trigger | Syntax | What it controls in flowtron | When to reach for it`) ✅ reproduces.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. Scope is `docs/PLATFORMS.md` only. `docs/PHILOSOPHY.md:7-11` and `.flowtron/PLAN.md:8` also name fintown/photard, but both are **past-tense origin story** ("By early 2026 I was running three projects in parallel…"), not present-tense currency claims. Rewriting history is out of scope and would damage the record.
  2. `:94`'s replacement names three live adopters as illustration rather than enumerating all 19 — the sentence's job is to establish that production symlinks depend on path stability, not to maintain an adopter registry (which would itself become a drift source).
  3. `:286` resolves in favor of the **observation**, not the launch docs. The dogfood evidence is first-hand and `:266` already committed to that reading.
  4. `:287`'s missing cell is authored to mirror the Codex Procedure-pointer row's "When to reach for it" framing (`:305`).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The four defects are independent single-line edits in one file with no shared
mechanism — this is a cleanup batch, not a refactor. Two are pure currency
(`:94`, `:220`), one is a coherence contradiction (`:286`), one is malformed
markdown (`:287`).

The `:94` fix is the tail of the `CORE-133`/`CORE-136`/`CORE-182` leak-cleanup
series; treating it the same way (drop the dead names, keep the claim) is
consistent with three prior precedents rather than a new judgment call.

The `:286` fix is the only one with real content judgment, and `:266` in the
same doc has already made that call — the trigger table simply never caught up.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — each fix mirrors an existing in-repo shape rather than inventing one:
  - `:220` mirrors `claude/CAPABILITIES.md:30`, which already enumerates all four `--fast` skills plus the `/ft-spec` carve-out. PLATFORMS.md is now aligned to that reference rather than restating the contract independently.
  - `:287`'s new cell mirrors the Codex Procedure-pointer row (`:305`), which is the same trigger in the sibling table.
  - `:286` follows the doc's own `:266` prose, which had already adopted the observation-over-launch-docs position.
  - `:94` follows the `CORE-133`/`CORE-136`/`CORE-182` precedent: drop the dead names, keep the claim.

- [x] **Minimal refactor gate** — no refactor. Four independent single-cell/single-line edits, 7 insertions / 5 deletions in one file. Deferred (out of scope, owned elsewhere): `docs/AGENT-NEUTRALITY.md:36`'s "3 sites in `SPEC.md`" undercount is real drift but is explicitly assigned to sibling task [[CORE-375]]; editing it here would collide.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, documentation-only change with no executable surface.

**Implementation Notes:**

`:94` names three live adopters (`InvisiPaw, siteguy, marscharts, …`) with an
ellipsis rather than enumerating all 19. Enumerating would recreate the exact
drift being fixed; the sentence's job is to establish that production symlinks
depend on path stability, not to maintain a registry.

`:286` inverts the cell: the CORE-257 observation now leads the Syntax cell,
the launch-coverage assumption is recorded as the reason prose remains the
guaranteed fallback, and the "When to reach for it" cell states the operational
rule (reach for structured, let it degrade) plus the explicit supersession. The
TUI-vs-base-CLI caveat is preserved — it is a genuine open question, not part
of the contradiction.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no executable code changed. Substituted structural verification below.

- [x] Ran lint/type-check on changed code — `N/A` (no linter covers `docs/*.md`). Substituted:
  - **Table well-formedness:** `awk -F'|'` cell count across every table in `docs/PLATFORMS.md` — all 8 tables now have rows matching their header width. The Grok trigger table (`:282-289`) is uniformly 4 cells, including the previously-malformed Procedure-pointer row.
  - **Wikilink integrity:** all 5 `[[TASK-ID]]` links in the file (`CORE-091`, `CORE-154.1/.2/.3`, `CORE-349.5`) resolve to real PLAN.md entries or archived tasknotes — no danglers.
  - **Fix verification:** `grep` confirms zero `fintown`/`photard` and zero `will always use prose` remaining in `docs/PLATFORMS.md`.

- [x] **Quality assertions** — no duplication introduced (`:220` points at SPEC rather than restating the gate semantics); no dead content; the four edits are each one sentence or one table cell; no public-surface growth; the changed doc is now consistent with `SPEC/gates.md:302-307` and `claude/CAPABILITIES.md:30`, which are the code-facing authorities for the `--fast` surface.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched.

**Testing Notes:**

Verification commands and results:

```
awk -F'|' '/^\|/ {n=NF-2; ...}' docs/PLATFORMS.md   → 8 tables, all rows match header width ✅
grep -n "fintown\|photard" docs/PLATFORMS.md         → no matches ✅
grep -n "will always use prose" docs/PLATFORMS.md    → no matches ✅
wikilink resolve loop (5 links)                      → 5 OK, 0 dangling ✅
git diff --stat                                      → 1 file, +7 −5 ✅
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — `:176`'s `--fast` mention is an illustrative single-skill example in a principles list, not a surface enumeration |
  | `SPEC.md` | no change — defers to `SPEC/gates.md`, which is already correct |
  | `docs/MIGRATION.md` | no change — no `--fast` enumeration, no dead adopter names |
  | `claude/AGENTS-snippet.md` | no change — per-skill `--fast` mentions (`:22`, `:23`, `:25`) are all accurate |
  | `codex/AGENTS-snippet.md` | no change |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — `:81` is a usage caution, not an enumeration |
  | `docs/AGENT-NEUTRALITY.md` | no change **in this task** — `:36`'s "3 sites in `SPEC.md`" is real drift but explicitly owned by [[CORE-375]] |
  | `docs/PLATFORMS.md` | **updated** — this task's deliverable (4 fixes) |
  | `claude/CAPABILITIES.md` | no change — `:30` already lists all four `--fast` skills; it is the reference PLATFORMS.md was aligned *to* |
  | `docs/AGENT-COMPAT.md` | no change — the Grok row (`:37`) records primitive + currency and makes no structured-ask claim; its `v5.14.0 · 2026-07-27` stamp stays current |

  Also left intentionally untouched: the two `**Last verified:** v5.14.0 · 2026-07-27 (dogfooded)` stamps in `docs/PLATFORMS.md` (`:291`, `:313`). Those track dogfood-run currency, not doc-edit currency — this task ran no new dogfood session.

- [x] Closed — PLAN.md line flipped to stub form and moved to the top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cleared the four `docs/PLATFORMS.md` defects from the 2026-07-27 audit-docs
sweep: dead adopter names at `:94`, an undercounted `--fast` surface at `:220`,
a self-contradicting Grok structured-ask cell at `:286`, and a 3-cell row in a
4-column table at `:287`.

- **Changed:** `docs/PLATFORMS.md` only — +7 / −5.
- **Verification:** table well-formedness (8 tables, all uniform), wikilink
  integrity (5/5 resolve), and grep confirmation that both stale strings are
  gone. No test suite applies to a docs-only change.
- **Refactors:** none made. One deferred — `docs/AGENT-NEUTRALITY.md:36`, owned
  by [[CORE-375]].
- **Documentation verdict:** 1 of 12 AI-referenced docs updated, 11 no-change,
  each verdict backed by a grep.
- **Maintainability effect:** the doc no longer contradicts `SPEC/gates.md` or
  `claude/CAPABILITIES.md` on the `--fast` surface, and no longer contradicts
  itself on Grok's structured-ask support — removing two spots where a future
  AI reading PLATFORMS.md as ground truth would have been misled.

**Archived:** 2026-07-27
