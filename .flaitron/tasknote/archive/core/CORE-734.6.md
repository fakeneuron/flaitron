---
title: pair-i-retire
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.3, CORE-734.5, CORE-734.N, CORE-460.3, CORE-460.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-734.6 | pair-i-retire

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-734]] · [[CORE-734.3]] · [[CORE-734.5]] · [[CORE-734.N]] · [[CORE-460.3]] · [[CORE-460.4]]

## 🎯 Goal

Stop the three non-Claude trigger tables in `docs/PLATFORMS.md` restating `claude/CAPABILITIES.md`'s flag rows: each gets one skill-body-flags row that points there and states only that platform's routing, so Pair I has nothing left to bind and retires to a stub.

## ✅ Acceptance

- [x] No non-Claude section carries a per-flag row. Verify: `awk '/^## Non-Claude capability triggers$/,/^## When this doc is useful$/' docs/PLATFORMS.md | grep -cE '^\| \*\*(Force-skip|Unattended posture|Debug mode|Park mode|Starter mode|Loop mode|Deep pre-pass)'` → 0
- [x] Grok, Codex and Cursor each have exactly one skill-body-flags row that links `claude/CAPABILITIES.md`. Verify: same awk `| grep -c '^| \*\*Skill-body flags\*\*.*CAPABILITIES\.md'` → 3
- [x] Codex's row keeps the SOP-first vs direct-wrapper split. Verify: `grep -q 'SPEC/procedures/ft-task.md'` and `grep -q 'step-0-flags.md'` on the Codex row → 0; split read as `judgment`
- [x] Pair I is a retired stub and the letter count is unchanged. Verify: `grep -q '^\*\*Pair I — retired\.\*\*' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0; `grep -c '^\*\*Pair [A-Z]' …` → 17
- [x] No live surface lists I as a live release-only pair. Verify: `git grep -nE 'D, I|D and I|Pairs D, I' -- docs/CONVENTIONS.md claude/skills/ft-release/` prints nothing
- [x] The tree passes and the release directory shrinks. Verify: `bash tools/drift-checks.sh` → 0; `find claude/skills/ft-release -type f -exec cat {} + | wc -c` < 108,477

## 🧩 Subtasks

- [x] `docs/PLATFORMS.md`: replace the seven flag rows in the Grok, Codex and Cursor tables with one **Skill-body flags** row each; amend the Codex backfill note's "four flag rows"
- [x] `step-7.1-mirror-pairs.md`: Pair I → retired stub; preamble release-only list; Pair F stub's roster-copy list; Pair J's Pair I clause; Pair K's "like D and I"
- [x] `docs/CONVENTIONS.md` L58 / L66 release-only lists
- [x] Phase 3: Acceptance greps, full drift run, external review

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax)
- [[CORE-734.3]] — predecessor: the census that classified Pair I as collapsible and kept Codex's split (review note 3)
- [[CORE-734.5]] — predecessor: retired Pair F; the stub shape this follows, and the Pair F stub that names Pair I's surfaces
- [[CORE-734.N]] — the audit that verifies 12 live Pairs, with I counted as retired
- [[CORE-460.3]] — related-decision: minted Pair I and pointed PLATFORMS prose asides at the section
- [[CORE-460.4]] — related-decision: backfilled Codex's flag rows

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The census ([[CORE-734.3]]) found each non-Claude flag row restates the Claude semantics and adds an availability clause. At HEAD that still holds: 21 rows (7 flags × 3 sections) whose "What it controls" and "When" cells copy `claude/CAPABILITIES.md`, and whose only platform delta is how the flag reaches the skill body. A single pointer row removes the copies Pair I polices.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read set.** `docs/PLATFORMS.md` §"Non-Claude capability triggers" (L445–569), `claude/CAPABILITIES.md`, Pair I's entry and every catalogue sentence that cites I, `docs/CONVENTIONS.md` L58 / L66, `docs/CONTEXT-BUDGET.md` L299–321.
- **Per-platform routing, the only delta to keep:**
  - *Grok:* same spelling; the flags and their lazy fragments live in whichever canonical body Grok loaded (`.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.grok/skills/`), resolved relative to that body.
  - *Codex:* two routes. `ft-task`'s wrapper is SOP-first: it reads `SPEC/procedures/ft-task.md` (which names `--fast` / `--unattended` / `--debug` / `--loop` as neutral primitives), and its Step 0 loads canonical `step-0-flags.md` when trailing tokens are present. The `ft-micro-task`, `ft-close-epic`, `ft-file-followup` (`--park` / `--starter`) and `ft-epic-discovery` (`--deep`) wrappers route straight to the canonical body. Each wrapper's frontmatter names its flags.
  - *Cursor:* same as Grok, with Cursor's discovery paths (already in its Skill-invocation row).
- **Live Pair I surfaces** (`git grep`, archives / VERSION-HISTORY / PLAN excluded): the entry itself; the preamble's "D, I, K"; Pair F's stub ("on Pair I's capability surfaces (`claude/CAPABILITIES.md`, `docs/PLATFORMS.md`)"); Pair J ("Pair I reads `CAPABILITIES.md` ↔ `PLATFORMS.md`"); Pair K ("like D and I"); CONVENTIONS L58 and L66. `tools/drift-checks.sh` and `ft-release/SKILL.md` do not cite I.
- **Best Practices Review.**
  - *Responsibility:* `claude/CAPABILITIES.md` owns flag semantics; each PLATFORMS section owns its platform's routing.
  - *Duplication:* 21 rows and a release-only check go away.
  - *Behavior:* none. This is docs plus a release-gate fence, with no CI function involved.
- **Archive skim.** `archive/core/` confirmed against the README table. 20+ notes cite Pair I, mostly as a sibling in other pairs' design notes; the census [[CORE-734.3]] already weighed them. Read [[CORE-460.3]] (minting: it pointed PLATFORMS prose asides at this section instead of restating flags, and the thin snippets stay wiring-only) and [[CORE-734.5]] (stub shape, pointer swaps).
- **Drift check.** The PLAN line matches HEAD: three non-Claude sections with seven flag rows each; the three stubs have none. Not in the line but edited, as in [[CORE-734.5]]: the catalogue citations of I (preamble, F stub, J, K). `docs/CONTEXT-BUDGET.md` L318's "34,235" section size is a ledger snapshot refreshed at release, so it is left for the cut.
- **Downstream-impact scan.** Not triggered. [[CORE-734.7]] edits Pair H/A and the "eleven pairs" CI count, which I does not change.
- **No clarifications needed.** Assumptions:
  - Row label **Skill-body flags**, in the existing four-column shape: Syntax = routing, Controls = "the flags in `claude/CAPABILITIES.md`", When = per CAPABILITIES. No per-flag prose survives.
  - Platform-specific `--deep` structured-ask notes are dropped; the Structured ask rows already say the same.
  - `claude/CAPABILITIES.md` is unchanged: its pattern note ("non-Claude agents reuse this shape") still holds for the non-flag rows.
  - The Codex dated backfill note keeps its history and gains one clause recording the collapse.
  - No `.1` Fan-out names this child, so there is no YAML echo.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no check logic changed; Pair I's fence was release-only prose, and the drift run is the test.

**Implementation Notes:**

- *Pattern survey.* The retired stub follows Pairs F, G and L: what it guarded, why it was minted, what replaced the copies, then "The letter is kept…". The new row keeps the table's four-column shape. Syntax holds the routing, Controls points at `claude/CAPABILITIES.md#the-triggers`, and When says the platform adds and drops no flag. This is the pointer shape [[CORE-460.3]] gave PLATFORMS' prose asides.
- *PLATFORMS.* A scripted, label-anchored swap replaced 21 rows (7 per section) with 3 rows, removing 18 lines in total. Grok and Cursor route to the loaded canonical body. Codex has a **SOP-first** route (`ft-task` → `SPEC/procedures/ft-task.md`, then `step-0-flags.md`, with the whole skill as fallback) and a **direct** route (`ft-micro-task`, `ft-close-epic`, `ft-file-followup`, `ft-epic-discovery`). Only `codex/skills/ft-task/SKILL.md` names the SOP, which confirms the split. The Codex backfill note gains one dated clause recording the fold. The file went from 71,258 to about 55,800 bytes.
- *Catalogue.* Pair I is now a retired stub. Other edits:
  - The preamble's release-only list is now "D, K".
  - Pair F's stub now places the roster copy in `claude/CAPABILITIES.md` alone.
  - Pair J drops "Pair I reads …".
  - Pair K now reads "like D".
- *CONVENTIONS.* L58 and L66 now list "Pairs D and K".
- *Minimal refactor gate.* Left alone:
  - `claude/CAPABILITIES.md`: its pattern note still holds for non-flag rows.
  - `docs/CONTEXT-BUDGET.md` L318: its section figure is release-refreshed.
  - `docs/AGENT-COMPAT.md` and `SPEC/procedures/ft-task.md`: both cite the section, not a flag row.
  - The thin snippets: wiring-only, per [[CORE-460.3]].

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the drift script is the suite here; no viz or updater code changed

- [x] Ran lint/type-check on changed code — N/A: markdown only; `tools/drift-checks.sh` untouched

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review blockers were fixed):

```text
awk <section> | grep -cE '^\| \*\*(Force-skip|…|Deep pre-pass)'      → 0 matches (exit 1)
awk <section> | grep -c '^| \*\*Skill-body flags\*\*.*CAPABILITIES\.md' → 3
Codex row: grep -q SPEC/procedures/ft-task.md / step-0-flags.md        → 0 / 0
grep -q '^\*\*Pair I — retired\.\*\*' mirror-pairs                    → 0
grep -c '^\*\*Pair [A-Z]' mirror-pairs                                 → 17
git grep -nE 'D, I|D and I|Pairs D, I' CONVENTIONS + ft-release/      → 1 (none)
bash tools/drift-checks.sh                                             → 0 (16 ok)
find claude/skills/ft-release -type f -exec cat {} + | wc -c            → 105,436 (< 108,477; −3,041)
wc -c docs/PLATFORMS.md                                                → 56,465 (HEAD 71,258)
```

Judgment (Codex split): the row names both routes in bold, SOP-first for `ft-task` and Direct for every other wrapper, matching `codex/skills/*/SKILL.md`. Only `ft-task`'s wrapper names the SOP.

External review: `/code-review medium` over the working-tree diff → 8 findings, no Acceptance failure.

- **Blockers, fixed (Phase 3 re-ran from the top):**
  1–3. The Codex, Cursor and Grok worked-example "Operator flags" bullets still sent readers to "per-flag detail" in the section. They now point at `claude/CAPABILITIES.md` §"The triggers"; Codex keeps its routing pointer to the section.
  4. The Codex row's Direct list left out `ft-refactor` (which takes `--fast`). The list is now explicitly non-exhaustive ("… and `ft-refactor` among them") under "every other wrapper".
- **Notes:**
  5. The Pair I stub said no roster is left, while the Codex wrapper list was one. Resolved by fix 4: the list is examples under "every other wrapper", not a roster.
  6. The section intro and the CAPABILITIES pattern note still invited per-flag rows → **fixed**: both now say flag rows are pointer-only (`claude/CAPABILITIES.md` added to `touches:`).
  7. The removed rows carried per-platform translations, such as Codex's `--deep` structured-ask fallback → **fixed**: each When cell now sends a platform-native control a flag leans on to that table's own row (the Structured ask rows already hold the fallback). Invocation spelling is in each Skill invocation row.
  8. `docs/CONTEXT-BUDGET.md` L318 still gives the section as 34,235 bytes (now ~19k) → **no change**: the ledger says these figures are "refreshed with the rest of the ledger" at the cut. The drop is explained by this note.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep:**
- Updated: `docs/PLATFORMS.md` (three tables, three worked-example bullets, section intro, Codex backfill note), `claude/CAPABILITIES.md` (pattern note), `docs/CONVENTIONS.md` (L58, L66 release-only lists).
- No change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md` (cites the section, not a row), `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. A `git grep` for Pair I, flag-row and per-flag wording across them is empty.
- Release-owned: `docs/CONTEXT-BUDGET.md` L318 section figure, `docs/VERSION-HISTORY.md`.

**Recap.** Each non-Claude trigger table now has one **Skill-body flags** row in place of seven per-flag rows. The row points at `claude/CAPABILITIES.md` and states that platform's routing; Codex keeps its SOP-first vs direct split. Pair I is a retired stub, and every catalogue and CONVENTIONS citation of I as a live pair is gone.

- **Changed:** `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/CONVENTIONS.md`, `claude/skills/ft-release/step-7.1-mirror-pairs.md`, `.flaitron/PLAN.md`, and this note.
- **Verification:** the receipt above. Every check passes on the second pass, after four review blockers were fixed.
- **Refactors:** none.
- **`touches:` reconciliation:** `git diff --name-only` equals the declared set, with `claude/CAPABILITIES.md` added at review note 6.
- **Maintainability:** one less release-only pair, and 18 fewer table rows to keep in sync. `claude/skills/ft-release/**` dropped 108,477 → 105,436 bytes; `docs/PLATFORMS.md` dropped 71,258 → 56,465.

**Learnings:** N/A. No new rule for the always-loaded layer.

**Archived:** 2026-10-07
