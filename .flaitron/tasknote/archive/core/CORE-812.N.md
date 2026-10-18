---
title: seed-prep-merge audit
status: completed
tags: [unattended, seed-unattended, epic-audit]
created: 2026-10-18
due:
related-tasks: [CORE-EPIC-812, CORE-812.1, CORE-812.2, CORE-812.3, CORE-812.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-812.N | seed-prep-merge audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-812]]

## 🎯 Goal

Verify the completed `CORE-EPIC-812` (`seed-prep-merge`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-812` (Step 5), landing in the audit's closure commit — no misses, so no rows filed
- [x] Single `feat: CORE-812.N — audit CORE-EPIC-812` (or `chore: ...` if no code edits land) commit lands — `chore:`, no code edits
- [x] PLAN.md line for `CORE-812.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-812.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-812.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-812]] — parent epic
- [[CORE-812.1]] — Discovery; "Resolved scoping" table
- [[CORE-812.2]] — contract (`SPEC/unattended-candidacy.md` merged section)
- [[CORE-812.3]] — seed body absorbs prep's walk
- [[CORE-812.4]] — prep slug retired; natabula handoff NAT-432

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-812` open under its priority section; `.1`–`.4` all `[x]`, `.N` the only open child

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-812.N`; pre-flight passed (clean tree, no live or archived `.N` note, no open siblings). All four children closed 2026-10-18 in sequence (`c40ef300`, `fe1ecaa2`, `44ee04a2`, `5648cfc9`); no early-audit decision.

- [x] Read relevant source files — the four archived cohort notes in full; `SPEC/epic.md`; the tasknote README; live surfaces named below

- [x] **Best Practices Review** — N/A: verification pass over shipped prose, no new module boundary

- [x] **Archive skim** — self-referential (the cohort is the archive set); the cohort notes already digest CORE-619, CORE-783.x, CORE-797, CORE-810, CORE-811

- [x] **Drift check** — paths the cohort touched still exist at HEAD; `claude/skills/ft-prep-unattended/` and `codex/skills/ft-prep-unattended/` absent as `.4` intended; the seed body measures 22,345 B, matching `docs/CONTEXT-BUDGET.md:313`

- [x] No clarifications needed. Assumptions: (1) the v7.3.0 figure in the MIGRATION retired row stands until `/ft-release` cuts — the epic chose a minor and `/ft-release` corrects the row if the cut differs; (2) NAT-432 is natabula's to run, not this audit's

- [x] Subtasks above populated with ordered steps; YAML `touches:` omitted — verification only, no file deliverable beyond this note and the PLAN flip

**Discovery Notes:**

Cohort deliverables:
- [[CORE-812.1]] — filed `.2`–`.4` (44/43/40w) and the Fan-out (`.2` → `.3` → `.4`, `.N` synthesis). Settled one skill, three-part gate, dependent token item, minor version, natabula handoff.
- [[CORE-812.2]] — `SPEC/unattended-candidacy.md` §"Seeding an existing plan" now contracts one walk and one gate (marks · preparations + dependent token item · stays); Pin / Split / Stay bullets byte-identical under `### Preparing declined rows`. `SPEC/plan-filing.md` (seed mints a standalone split's ID; recognizer accepts rewrites, inserted rows, composite pin+token line) and `SPEC/task-line-segments.md` reconciled.
- [[CORE-812.3]] — `claude/skills/ft-seed-unattended/SKILL.md` 12,487 → 22,345 B with prep's drafting rules folded in; Codex wrapper description; budget ledger re-measured.
- [[CORE-812.4]] — both prep bodies deleted; rosters, snippets (7 `ln -s` each), SPEC/layout, SPEC/plan-filing, SPEC/model, GLOSSARY, EXTERNAL-AGENTS, AGENT-NEUTRALITY, PLATFORMS, CONTEXT-BUDGET, Pair C/O, guard-parity list (6) updated; MIGRATION v7.3.0 retired row; NAT-432 filed in natabula (`bed53df`).

Open questions carried from the cohort recaps, now settled: "no release between `.3` and `.4`" — latest tag is `v7.2.0` (CORE-809, before `1ad34039`), so no tag carries the interim. GLOSSARY and EXTERNAL-AGENTS (deferred by `.2`/`.3`) were fixed in `.4`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no new surface

- [x] **Minimal refactor gate** — no refactor; no inline fix needed

- [x] Implemented the minimal solution — coherence checks below

- [x] Updated/added tests for non-trivial behavior — N/A (no code)

**Implementation Notes:**

Coherence checks run at HEAD `5648cfc9`:
- Slug residue: `git grep prep-unattended` outside the archive, VERSION-HISTORY, and PLAN-ARCHIVE → only retirement/history text (MIGRATION retired row + §Step 4.6 note, GLOSSARY "Absorbed the retired" + Maintenance stamp, CONTEXT-BUDGET dated lines 272/314/317, Pair O history clause) and closed PLAN rows (CORE-805, CORE-797, CORE-783.3) plus the parent line. Matches `.4`'s A2 residue.
- Contract ↔ body ↔ docs: `SPEC/unattended-candidacy.md`, `SPEC/task-line-segments.md:40-44`, `SPEC/plan-filing.md` §"ID allocation" / §"Filing commits" (prose, message table, recognizer), `docs/GLOSSARY.md:69`, `docs/MIGRATION.md:531`, and `claude/AGENTS-snippet.md:24` all describe one walk that marks and prepares behind one gate and one `chore: seed [unattended] — <N> rows` commit. No contradictory cross-refs.
- Counts: four snippets carry 7 `ln -s` lines each; 11 Claude bodies and 11 Codex wrappers, matching `docs/PLATFORMS.md:303/332`; AGENTS.md "Four bundled skills are utility-only"; `SPEC/model.md` consulted-by list names seed once; AGENT-NEUTRALITY's "seven filing motions" and Pair O's "Seven skill bodies" count the filing motions without seed, unchanged by the epic and still true.
- Unchanged-by-decision: `tools/update-adopters.mjs` carries no prep entry (`.4` scoping).
- Handoff: natabula NAT-432 open under its Medium section, committed `bed53df`.

Findings: no inconsistencies surfaced. No misses, so no child rows filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — regression check over the cohort's tooling: `node --test tools/drift-checks.test.mjs` → 19/19; `node --test tools/update-adopters.test.mjs` → 102/102

- [x] Ran lint/type-check on changed code — N/A (markdown only)

- [x] **Verification receipt** — `bash tools/drift-checks.sh` → 0 (all checks ok); the Acceptance boxes are judgment over the checks in Implementation Notes

- [x] **External review** — N/A: no inline fix landed, so no diff to grade

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

`bash tools/drift-checks.sh` → 0 · `node --test tools/drift-checks.test.mjs` → 0 (19 pass) · `node --test tools/update-adopters.test.mjs` → 0 (102 pass). Seed body `wc -c` 22,345 = budget ledger figure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (`.4` updated the subset roster; reads seed-only) · `AGENTS.md` no change (Four utility-only, seed listed) · `SPEC.md` no change (names no utility slug) · `docs/MIGRATION.md` no change (v7.3.0 row, §1.2 roster, Step 4.6 note coherent) · `claude/AGENTS-snippet.md` no change (Utilities line seed-only with prep clauses) · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` no change (7 links each, subset prose names seed) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (plan-filing row lists seed, no prep) · `docs/PLATFORMS.md` no change (11/11 counts) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (line 63 coherent; no stable-surface row named the slug) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.N` line → stub nested under CORE-EPIC-812, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — N/A

**Final Summary:**

The audit found no inconsistencies. `/ft-prep-unattended` is fully folded into `/ft-seed-unattended`, and the contract, skill body, glossary, migration row, snippets, and rosters all describe one walk with one gate and one commit. No misses, so no follow-up rows, and the parent epic flips in this closure.

Checked: slug residue (history text only), contract ↔ body ↔ doc prose, roster and link counts, guard parity, budget figure, natabula NAT-432 (`bed53df`). Verification: `bash tools/drift-checks.sh` → 0; drift self-test 19/19; updater suite 102/102. Settled from the cohort recaps: no tag landed between `.2` and `.4` (latest `v7.2.0` predates the epic). One heads-up for the next release: the MIGRATION retired row says v7.3.0, so the cut must be a minor or `/ft-release` corrects the row. Changed: this note and `.flaitron/PLAN.md` (`.N` stub + parent flip + cohort move). No refactor.

**Archived:** 2026-10-18
