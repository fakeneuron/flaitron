---
title: id-allocation-home
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-776, CORE-564, CORE-348, CORE-391, CORE-470]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/plan-filing.md
  - SPEC.md
  - claude/skills/ft-file-task/SKILL.md
  - claude/skills/ft-file-task/park-mode.md
  - claude/skills/ft-open-epic/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-776.6 | id-allocation-home

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-776]] [[CORE-564]] [[CORE-348]] [[CORE-391]] [[CORE-470]]

## 🎯 Goal

Give new-ID allocation one canonical home — `SPEC/plan-filing.md` §"ID allocation" (scan PLAN.md + PLAN-ARCHIVE.md + tasknote/archive/sidequest file names, README-looked-up `<area>`, one numeric space shared by plain, epic, and child IDs) — and have every allocating skill cite it instead of restating a divergent rule.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` carries `## ID allocation` naming PLAN-ARCHIVE.md, the README §"Archive layout" lookup, and EPIC/child IDs in the shared numeric space — `awk '/^## ID allocation$/{a=1;next} a&&/^## /{a=0} a' SPEC/plan-filing.md | grep -c -e PLAN-ARCHIVE -e 'Archive layout' -e 'EPIC-'` ≥ 3 lines matched
- [x] Every allocator cites it: ft-file-task SKILL + park-mode, ft-open-epic, ft-refactor, ft-audit, ft-audit-repo, ft-release (added at review) — `grep -L 'ID allocation' claude/skills/{ft-file-task/SKILL.md,ft-file-task/park-mode.md,ft-open-epic/SKILL.md,ft-refactor/SKILL.md,ft-audit/SKILL.md,ft-audit-repo/SKILL.md,ft-release/SKILL.md}` prints nothing
- [x] The divergent per-skill rules are gone — `grep -rnE 'highest existing|highest used numeric|take max .N.' claude/` prints nothing
- [x] `ft-file-task` pre-flight rejects an explicit ID that lives only in PLAN-ARCHIVE.md — `grep -q 'PLAN-ARCHIVE' claude/skills/ft-file-task/SKILL.md`
- [x] `ft-open-epic` net-shrinks — `wc -c < claude/skills/ft-open-epic/SKILL.md` < 32655
- [x] The section's scan idiom returns the true max on this repo (CORE 777, FE 127) — run it verbatim from the section
- [x] Drift checks pass, `pair_q`'s stale citation included — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Add `## ID allocation` to `SPEC/plan-filing.md` (before §"Filing commits"), update its intro paragraph
- [x] Point SPEC.md §"Task ID convention" Numbering line at it
- [x] ft-file-task SKILL Step 1 steps 2-3 → citation; Step 1a PLAN-ARCHIVE check
- [x] park-mode Step P1 → citation
- [x] ft-open-epic Step 3 → citation + `<area>` definition (net shrink)
- [x] ft-refactor Step 5.1 → citation
- [x] ft-audit + ft-audit-repo "next free `<N>`" → citation
- [x] ft-release Step 1.1.2 → citation (review blocker)
- [x] Run Acceptance commands + drift checks

## 🔗 Related

- [[CORE-EPIC-776]] — parent epic (closure-contract-coherence)
- [[CORE-564]] — related-decision: `<area>` looked up, never derived; left epic skills to "inherit `<area>` from context" (a budget call)
- [[CORE-348]] — introduced ft-file-task's "highest existing non-epic task number" wording, no rationale for excluding epics
- [[CORE-391]] — ported park mode's PLAN-only scan verbatim from sidequest
- [[CORE-470]] — closed-row set is PLAN.md `## Completed` plus PLAN-ARCHIVE.md; missing archive = empty

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three defects reproduce against current text (see drift check); `pair_q` already fails on PLAN.md's citation of the not-yet-written section.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — contract/skill prose only. Responsibility: the allocation rule moves to the SPEC module every filing motion already loads (`plan-filing.md` header names all of them); skills keep only their skill-specific behavior (suggest-vs-auto-allocate, collision handling). Removes five-way duplication.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Area `core` from README §"Archive layout". Model `[heavy]` on Opus → satisfied.
- **Current allocator text:** ft-file-task Step 1.2-3 scans PLAN/tasknote/archive/sidequest but takes "highest existing non-epic task number" (so `CORE-EPIC-N` + children are skipped → a standalone can reuse an epic's N); park-mode P1 scans PLAN.md lines only, counts `<N>` and `<N>.<SUB>` but not `EPIC-<N>`; ft-open-epic Step 3 and ft-refactor Step 5.1 scan PLAN.md + `archive/<area>/` with `<area>` never resolved via the README; ft-audit (§3 + carve-out) and ft-audit-repo say only "next free `<N>`". None reads PLAN-ARCHIVE.md.
- **Drift vs PLAN line:** "79 fixed-inline rows live only there" — my count of PLAN-ARCHIVE row IDs with no archived tasknote is 132 (inline fixes plus rows from older eras). Direction holds, number differs; no code depends on it. ft-open-epic: 32,655 B vs 33,000 cap → 345 B headroom, as stated.
- Also: ft-open-epic uses `<area>` at its `.1` archive skim and `mv` (lines 150/186/244) with no lookup anywhere in the body — same derivation, cheapest to fix by defining `<area>` once at Step 3.
- Also: ft-file-task Step 1a checks an explicit ID against PLAN.md only — an ID living only in PLAN-ARCHIVE.md passes.
- **Archive skim (probe):** CORE-470/565.3 — closed-row set is PLAN `## Completed` + PLAN-ARCHIVE.md, absent archive = empty; CORE-655 already took max IDs across PLAN + PLAN-ARCHIVE. CORE-564 — "`<area>` is looked up, never derived"; skipped epic skills as a budget call, noting a wrong area "yields a duplicate ID". CORE-348 introduced the non-epic wording with no rationale; CORE-391 ported park's PLAN-only scan verbatim. CORE-604.N shows `[[CORE-604]]`/`[[CORE-EPIC-604]]` confusion — supports one shared numeric space. Nothing argues against a canonical section.
- `pair_q` currently fails: `STALE SECTION .flaitron/PLAN.md — SPEC/plan-filing.md §"ID allocation"` — this task's deliverable clears it.
- No clarifications needed. Assumptions: (1) max+1, never backfill gaps (ft-file-task's "lowest unused" phrasing conflicted with its own "next integer after the highest"; max+1 is what the epic skills do); (2) scan **file names and task-row IDs, not note bodies** — an adopter's notes cite flaitron `CORE-` IDs under the same prefix; (3) epic child `.<k>` numbering stays in SPEC/epic.md step 5, pointed to, not restated; (4) per-skill behavior (suggest vs auto-allocate, unattended collision stop) stays in the skills; (5) SPEC.md gets a one-line pointer from §"Task ID convention" Numbering.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: the section follows `plan-filing.md`'s own §"Filing commits" shape — numbered procedure, one shell idiom, a "why" paragraph — and reuses that section's task-row regex rather than defining a second one. Skills cite it the same way they already cite §"Filing commits".
- `SPEC/plan-filing.md`: new `## ID allocation` (folder lookup, scan set, one numeric space, max+1 / no backfill / multi-ID ordering, CORE reading, why-each-source, epic-child pointer to `SPEC/epic.md` step 5); intro paragraph names it.
- `SPEC.md` §"Task ID convention" Numbering line → pointer.
- ft-file-task Step 1.2-3 → citation (step numbering kept, so Step 1's "`--unattended`: steps 1-3 run unchanged" stays true); Step 1a ID check now covers PLAN-ARCHIVE.md. park-mode P1 → citation (its PLAN-only, EPIC-blind scan retired). ft-open-epic Step 3 → citation plus one `<area>` definition covering its later archive-skim and `.1` `mv` uses: 32,655 → 32,428 B (−227). ft-refactor Step 5.1, ft-audit §3, ft-audit-repo → citation.
- Deferred: PLAN-ARCHIVE.md's header says `.flowtron/tasknote/archive/` (typo for `.flaitron/`), but that file is append-only by contract, so it is left alone. No refactor beyond the duplication removal itself.
- Tests: N/A — prose contract, no executable surface; the scan idiom was run against this repo instead (A6).
- Review round (Phase 3 → back here): added `/ft-release`'s fallback release row to the minting list + cited it from ft-release Step 1.1.2 (its own PLAN/tasknote/archive-only scan retired; 35,595 → smaller, under its 40,000 row); item 5 (a hand-picked top-level number, explicit arg or operator override, is free only if unclaimed) — ft-file-task Step 1a cites it; empty prefix starts at `001`; idiom anchored `(^|\*\*)CORE-` so `SAFE-900.md` no longer reads as FE-900; module header names allocation-time loading; intro reworded to list the section instead of appending a contradicting tail.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only diff; `node --test tools/drift-checks.test.mjs` run as the nearest suite

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (the markdown lint of record)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after the review round):

```text
awk §ID allocation | grep -c PLAN-ARCHIVE/Archive layout/EPIC-   → 6 lines (A1)
grep -L 'ID allocation' <7 allocator files>                       → 1, prints nothing (A2)
grep -rnE 'highest existing|highest used numeric|take max .N.' claude/ → 1, no match (A3)
grep -q 'PLAN-ARCHIVE' claude/skills/ft-file-task/SKILL.md        → 0 (A4)
wc -c < claude/skills/ft-open-epic/SKILL.md                       → 32428 (< 32655) (A5)
section idiom, CORE / FE                                          → 777 / 127 (A6); SAFE-900 decoy excluded
bash tools/drift-checks.sh                                        → 0 (A7; pair_q ok — was STALE SECTION before)
node --test tools/drift-checks.test.mjs                           → 0
```

Structural: removes six divergent restatements in favour of one section; no new surface beyond it.

External review (`/code-review medium`, working tree), 8 findings:

1. ft-release still mints a CORE ID with its own scan, and the section's list omits it — **blocker** (Goal: every allocating skill cites it). Fixed; Phase 3 re-run from the top.
2. An explicit ID is checked only literally, so `CORE-776` passes beside `CORE-EPIC-776` — **note**, fixed (item 5 + Step 1a citation).
3. The module header says it loads at commit time, not at allocation — **note**, fixed.
4. The `ls` half of the idiom isn't prefix-anchored (`SAFE-900` → FE-900) — **note**, fixed and decoy-tested.
5. The archive scan is narrowed from all of `archive/` to `archive/<area>/` — **note**, declined. The README table is authoritative (CORE-564), and the old whole-tree scan only compensated for a derived area. A misfiled note is its own defect.
6. No rule for an empty prefix — **note**, fixed (`001`).
7. The intro framing contradicts the new section — **note**, fixed.
8. An operator override isn't re-checked — **note**, fixed by item 5, which covers overrides; the skills already cite the section.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update — README.md, AGENTS.md, docs/MIGRATION.md, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION: no change. None restates the allocation rule (`grep -iE 'allocat|next free|highest (used|existing)'` over them hits nothing relevant). SPEC.md: updated (Numbering pointer). docs/CONTEXT-BUDGET.md: no change, because its ft-open-epic figure is a ledger snapshot that `/ft-release` refreshes.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — N/A: the rule now lives where every allocator reads it.

**Final Summary:**

New-ID allocation now has one home, `SPEC/plan-filing.md` §"ID allocation", and all six allocating skills cite it instead of each restating its own rule. The section looks up the folder in the README, scans PLAN.md, PLAN-ARCHIVE.md, and the tasknote/archive/sidequest file names, treats plain, epic, and child IDs as one numeric space, and allocates max+1.

- Changed: `SPEC/plan-filing.md` (+~50 lines, new section + header/intro), `SPEC.md` (pointer), skills `ft-file-task` (SKILL + park-mode), `ft-open-epic` (−227 B, 32,428), `ft-refactor`, `ft-audit`, `ft-audit-repo`, `ft-release`.
- Verification: the A1–A7 receipt above all passes, the drift suite exits 0 (clears the pre-existing `pair_q` STALE SECTION), and the drift self-test exits 0.
- Refactors: none beyond collapsing six restatements into one citation each.
- Docs: SPEC.md updated; every other AI-referenced doc is unchanged.
- Scope reconciliation: declared 8 files, changed 9. Undeclared: `claude/skills/ft-release/SKILL.md`, added at review (finding 1) and now declared.
- Maintainability: a change to the allocation rule is now one edit instead of six. The epic-number collision and the PLAN-ARCHIVE blind spot are closed for every allocator.
- Drift recorded: the PLAN line's "79 fixed-inline rows" counted 132 noteless row IDs here. The direction held.
- Left alone: the PLAN-ARCHIVE.md header cites `.flowtron/tasknote/archive/` (a typo for `.flaitron/`).

**Archived:** 2026-10-10
