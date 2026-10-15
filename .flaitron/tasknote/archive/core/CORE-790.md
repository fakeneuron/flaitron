---
title: doc-nit-sweep
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: []
touches:
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - CONTRIBUTING.md
  - docs/MIGRATION.md
  - claude/skills/ft-file-task/SKILL.md
  - claude/CAPABILITIES.md
  - docs/CONVENTIONS.md
  - docs/CODEX-VERIFICATION.md
  - README.md
  - docs/GLOSSARY.md
  - .flaitron/tasknote/README.md
---

# CORE-790 | doc-nit-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-734.4]] · [[CORE-769.2]]

## 🎯 Goal

Fix the present-tense prose residue from the 2026-10-15 docs audit (Findings #5, #6, #8–#11) that no drift pair reads, without touching adjacent text.

## ✅ Acceptance

- [x] Pair F, CONTRIBUTING §"Developing flaitron skills", and the `ft-flowtron` MIGRATION row each mark command stubs as pre-v7.0.0 — `grep -c "v7.0.0" ` on each edited line (receipt in Testing Notes)
- [x] `ft-file-task` `argument-hint` names `-p`; CAPABILITIES `--park` row names `--medium` / `--future` — `grep -q -- '--park|-p' claude/skills/ft-file-task/SKILL.md && grep -q -- '--medium' claude/CAPABILITIES.md`
- [x] CONVENTIONS' two parentheticals (release-only checks; the eight validate commands) agree with `step-7.1-mirror-pairs.md` line 9 and `AGENTS.md` §"Validation" — `judgment`: prose reconciliation, read against both sources
- [x] CODEX-VERIFICATION preamble and README entry name each dated receipt the doc holds — `grep -q "677.4" README.md`
- [x] Glossary count reads 74 in `docs/GLOSSARY.md` and `README.md` — `grep -c '~73' docs/GLOSSARY.md README.md` prints `0` for both
- [x] `.flaitron/tasknote/README.md` §"AI-referenced docs" notes Pair L's retirement — `grep -q "CORE-734.4" .flaitron/tasknote/README.md`
- [x] No drift regression — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] Pair F: "any command stub" → pre-v7.0.0; "its command stub" → note v7.0.0 retirement
- [x] CONTRIBUTING line ~69: "Command stubs likewise…" → pre-v7.0.0 stubs
- [x] MIGRATION `ft-flowtron` row: qualify the `~/.claude/commands/<skill>.md` half as pre-v7.0.0
- [x] ft-file-task `argument-hint`: add `-p`
- [x] CAPABILITIES `--park` row: add `--medium` / `--future` aliases
- [x] CONVENTIONS: release-only parenthetical (CI section) and eight-commands parenthetical (audit-cadence section)
- [x] CODEX-VERIFICATION preamble + README entry: name the receipts
- [x] Glossary `~73` → `74` in both files
- [x] Tasknote README: Pair L retirement note
- [x] Run drift checks

## 🔗 Related

- [[CORE-734.4]] — retired Pair L (script became the only shell)
- [[CORE-769.2]] — retired the command stubs (v7.0.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every cited location exists and still carries the stale prose (verified by reading each, below).

- [x] Read relevant source files — all ten targets plus `step-7.1-mirror-pairs.md` line 9, `AGENTS.md` §"Validation", `ci.yml`, `park-mode.md`, `step-0-flags.md`

- [x] **Best Practices Review** — N/A: docs-only prose edits, no code or module boundary

- [x] **Archive skim** — `archive/core/` hits on the touched files are generic (CAPABILITIES 518, CONVENTIONS 630, GLOSSARY 171, mirror-pairs 87, CODEX-VERIFICATION 32); not read, because these are factual prose corrections checked against live files, not design decisions. The load-bearing priors are already cited in the text being edited (CORE-734.4, CORE-769.2, CORE-677.2/.3/.4).

- [x] **Drift check** — PLAN line matches current files, with these refinements:
  - Pair F: two spots, "any command stub that named a partial roster" and "its command stub" in the surface list.
  - CONTRIBUTING: line ~69 "Command stubs likewise need an exact target…" is the unqualified one; line 49 is already qualified.
  - MIGRATION: the `ft-flowtron` row cites the `~/.claude/commands/<skill>.md` pair; stubs retired in v7.0.0.
  - `-p` alias confirmed in `step-0-flags.md:15`; `--medium` / `--future` confirmed in `park-mode.md:40-41` and `SPEC/tasknote-selection.md:72`.
  - CONVENTIONS CI section lists "Pairs A, D and K" beside "the README task counter" — D *is* the README counter (mirror-pairs line 42), and line 9 says only A and K keep their shell in the catalogue. Audit-cadence section repeats "Pairs A, D and K" and names only four of the eight `validate` commands (AGENTS.md §"Validation": 4 viz + 3 updater + drift self-test).
  - CODEX-VERIFICATION holds three dated records, not two: the 677.2 installation receipt (preamble), 677.3 workflow parity, 677.4 bounded comparison. PLAN says "both receipts"; I name all three that exist.
  - Glossary: 74 entries counted (`**term** —` lines); both files read `~73`.
  - Pair L: retired by CORE-734.4; `.flaitron/tasknote/README.md:123` cites it as live.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: "both receipts" is a count slip (three exist); the exact wording of each qualification is mine, minimal.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** See drift-check bullets above. Skip-branch: no significant deviation; the only PLAN divergence ("both" vs three receipts) is a wording count, not scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Pattern survey: each edit extends the surrounding sentence in place; no new structure. Minimal refactor: none. Tests: N/A — prose only; the drift checks are the regression net. Choices beyond the PLAN line: CONVENTIONS release-only list drops the double-counted Pair D (the README counter *is* Pair D) and cites line 9 of `step-7.1-mirror-pairs.md`; the eight-command parenthetical cites AGENTS.md §"Validation"; CODEX-VERIFICATION and README name three records (677.2/.3/.4), not "both".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -c "pre-v7.0.0 command stub" …/step-7.1-mirror-pairs.md` → 1 (Pair F qualifier; the second spot carries "until v7.0.0 retired them"); CONTRIBUTING `Pre-v7.0.0` → 1; MIGRATION `pre-v7.0.0 \`~/.claude/commands` → 1
- `grep -q -- '--park|-p' claude/skills/ft-file-task/SKILL.md && grep -q -- '--medium' claude/CAPABILITIES.md` → 0
- `grep -q "677.4" README.md` → 0
- `grep -c '~73' docs/GLOSSARY.md README.md` → 0 / 0
- `grep -q "CORE-734.4" .flaitron/tasknote/README.md` → 0
- `bash tools/drift-checks.sh` → 0 (pair_b, pair_j, pair_m all ok after the `argument-hint` change)
- CONVENTIONS reconciliation: judgment — read against `step-7.1-mirror-pairs.md` line 9 and `AGENTS.md` §"Validation" (8 commands = the 8 `validate` run steps in `ci.yml` after `npm ci`).
- External review: N/A — 19 inserted lines of prose across ten docs, each checked against its source above; below the size where a separate review grades anything the drift checks and greps do not.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Qualified the retired command stubs as pre-v7.0.0 (Pair F, CONTRIBUTING, MIGRATION `ft-flowtron` row); added `-p` to `ft-file-task`'s `argument-hint` and `--medium` / `--future` to the CAPABILITIES `--park` row; reconciled both CONVENTIONS parentheticals; named the CORE-677.2/.3/.4 records in CODEX-VERIFICATION and README; glossary count 74 in both files; noted Pair L's retirement in the tasknote README. Doc-drift sweep: no change beyond the edits themselves. `touches:` reconciliation: `git diff --name-only` matches the ten declared paths. Learnings: N/A. Noted, not fixed: README's "1180 tasks" counter trails the 1191-note archive (release-time standing check, §7.1 Pair D).

**Archived:** 2026-10-15
