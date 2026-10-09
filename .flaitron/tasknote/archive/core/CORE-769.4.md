---
title: rename-open-epic
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.3, CORE-769.5, CORE-769.7, CORE-769.N]
touches:
  - claude/skills/ft-epic-discovery/
  - claude/skills/ft-open-epic/
  - codex/skills/ft-epic-discovery/
  - codex/skills/ft-open-epic/
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - tools/drift-checks.sh
  - SPEC/
  - claude/skills/
  - claude/CAPABILITIES.md
  - templates/spec-template.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - docs/AGENT-NEUTRALITY.md
  - docs/EXTERNAL-AGENTS.md
  - docs/CONTEXT-BUDGET.md
  - docs/WORKTREES.md
  - AGENTS.md
  - .flaitron/PLAN.md
blocked-by: [CORE-769.3]
---

# CORE-769.4 | rename-open-epic

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-769.1]] [[CORE-769.3]] [[CORE-769.5]] [[CORE-769.7]] [[CORE-769.N]]

## 🎯 Goal

Hard-cut rename the `ft-epic-discovery` skill to `ft-open-epic` (pairing it with `ft-close-epic`) across every live surface, recording the retirement in MIGRATION, with archives and dated records untouched; shipped as `feat!:`.

## ✅ Acceptance

- [x] Skill dirs renamed; old dirs gone — `test -d claude/skills/ft-open-epic && test -d codex/skills/ft-open-epic && test ! -e claude/skills/ft-epic-discovery && test ! -e codex/skills/ft-epic-discovery`
- [x] Both SKILL.md `name:` lines match the new slug — `bash tools/drift-checks.sh skill_name_invariant`
- [x] No live surface names the old slug — `git grep -n 'ft-epic-discovery'` outside archives, each remaining hit classified in Testing Notes (`judgment`: dated record, historical narrative, or the retired row)
- [x] MIGRATION §"Skills retired so far" carries an `ft-epic-discovery` row naming `/ft-open-epic` — `grep -n 'ft-epic-discovery' docs/MIGRATION.md`
- [x] Drift checks clean — `bash tools/drift-checks.sh` → 0
- [x] Drift-check self-test passes — `node --test tools/drift-checks.test.mjs` → 0
- [x] §7.1 installed-surface derivation diffs clean — the four `diff -u` lines from `step-7.1-standing-checks.md` → empty
- [x] Closure commit is `feat!:` with a `BREAKING CHANGE:` footer — `judgment` at closure; `git log -1 --format=%B | grep -q '^BREAKING CHANGE:'` post-commit

## 🧩 Subtasks

- [x] `git mv` claude + codex skill dirs; update `name:`, body heading, and the codex wrapper's relative path
- [x] Snippets: the four `ln -s` lines (and the claude peer-skill roster)
- [x] `tools/drift-checks.sh` slug list (glob order: `ft-open-epic` sorts after `ft-micro-task`)
- [x] Sweep live references: SPEC modules, skill bodies/fragments, templates, CAPABILITIES, docs, AGENTS.md, `/ft-release` fragments (live lines only)
- [x] MIGRATION: new retired row; §1 inventory line
- [x] Phase 3: drift checks + self-test + §7.1 diffs + residue grep; `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]] — Discovery that scoped this rename
- [[CORE-769.3]] — predecessor; same sweep shape, copied here
- [[CORE-769.5]] — next rename
- [[CORE-769.7]] — rename-aware migrate mode for v7.0.0
- [[CORE-769.N]] — terminal audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.3` (its `blocked-by`, per `.1` Fan-out Sequential) closed today; `ft-epic-discovery` still ships at HEAD with 43 referencing non-archive files.

- [x] Read relevant source files — `git grep -n 'ft-epic-discovery'` over non-archive files, read in context; both SKILL.md frontmatters, codex wrapper path, the four snippet `ln -s` lines, `drift-checks.sh` L84 slug list, MIGRATION §"Skills retired so far" and §1 inventory line

- [x] **Best Practices Review** — no boundary change: a pure slug rename. Snippet `ln -s` blocks stay the wiring SSOT; `skill_name_invariant` / `skill_pin_guard_parity` guard the slug.

- [x] **Archive skim** — `archive/core/` confirmed against README (`CORE-*`). CORE-769.3 is the template: dated records kept, MIGRATION retired row, `git grep` residue classified, local wiring handed to the operator.

- [x] **Drift check** — PLAN line matches HEAD; "same sweep shape as CORE-769.3" covers the cross-reference sweep.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions:
  - **Kept as dated/historical records:** `docs/VERSION-HISTORY.md`, `docs/CODEX-VERIFICATION.md`, `docs/HARNESS-SURVEY.md`, `.flaitron/PLAN-ARCHIVE.md`, closed `.flaitron/PLAN.md` rows, `.flaitron/specs/spec-to-work-handoff.md` (`status: superseded` historical record), `docs/CONTEXT-BUDGET.md` cap-history row (L98), `tools/drift-checks.sh` CORE-744 incident comment (L208).
  - **Re-pointed:** the CONTEXT-BUDGET live ledger lines (L49 largest-body sentence, L282 per-skill bytes) take the live name.
  - Description prose unchanged — a slug rename, not a re-description.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see the bullets above; residue classification lands in Testing Notes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — CORE-769.3's rename shape: `git mv` both dirs, sweep live refs, MIGRATION retired row, classify `git grep` residue.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — none; one `ln -s` column re-padded in the claude snippet.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: a slug rename; `skill_name_invariant` + `skill_pin_guard_parity` already guard it.

**Implementation Notes:**

- `git mv` of `claude/skills/ft-epic-discovery` and `codex/skills/ft-epic-discovery`; `name:`, body heading, SKILL_DIR path, and the codex wrapper's relative path follow via the sweep.
- `perl -pi` slug swap over 37 live files (all non-archive hits minus the dated records named in Discovery), then restored two historical lines: the CONTEXT-BUDGET cap-history row (L98) and the CORE-744 incident comment in `drift-checks.sh` (L208).
- `drift-checks.sh` `skill_pin_guard_parity` list reordered to glob order (`ft-open-epic` after `ft-micro-task`).
- MIGRATION: new `ft-epic-discovery` → `/ft-open-epic` retired row (v7.0.0); §1 inventory line renamed by the sweep.
- Local wiring (`.claude/skills`, `.agents/skills`) left to the operator, as in CORE-769.3 (Path Access hook).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — drift-check self-test + updater suite

- [x] Ran lint/type-check on changed code — `N/A` for code: only `drift-checks.sh`'s slug list and comments changed, which `bash tools/drift-checks.sh` executes; markdown guarded by the drift checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `/code-review medium` on the working-tree diff: 5 notes, 0 blockers; 3 fixed, 2 declined

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
test -d …ft-open-epic ×2 && test ! -e …ft-epic-discovery ×2   → 0
bash tools/drift-checks.sh skill_name_invariant               → 0
bash tools/drift-checks.sh                                    → 0
node --test tools/drift-checks.test.mjs                       → 0 (19 pass)
node --test tools/update-adopters.test.mjs                    → 0 (65 pass)
§7.1 installed-surface: 4 × diff -u                           → empty, rc 0 (ssot: ft-close-epic ft-file-task ft-micro-task ft-open-epic ft-refactor ft-seed ft-task ft-update)
grep -n 'ft-epic-discovery' docs/MIGRATION.md                 → the retired row
```

The §7.1 diffs ran with the `ln -s` prefix's `.flaitron` spelled `[.]flaitron` (Path Access hook), same match set as CORE-769.3.

Residue (`git grep -n ft-epic-discovery`, non-archive), all kept on purpose:

- **Dated records:** `docs/VERSION-HISTORY.md` (3), `docs/CODEX-VERIFICATION.md` (3), `docs/HARNESS-SURVEY.md` (1), `.flaitron/PLAN-ARCHIVE.md` (1), `.flaitron/specs/spec-to-work-handoff.md` (7, `status: superseded`)
- **Historical narrative:** `docs/CONTEXT-BUDGET.md` cap-history row; `tools/drift-checks.sh` CORE-744 comment and Pair J's CORE-744 sentence (both now note the new name)
- **Rename note:** MIGRATION retired row
- **PLAN.md:** this row + the closed CORE-758 row

External review (`/code-review medium`, working-tree diff), graded against Acceptance — all notes:

1. **declined** — CONTEXT-BUDGET L49/L282 byte count (32,749 vs actual 32,667): every ledger row is a release-time re-measure (§7.1); same disposition as CORE-769.3.
2. **declined (operator)** — flaitron-self local `.claude/skills` / `.agents/skills` links: gitignored per-machine state, handed to the operator (still outstanding from CORE-769.3 too).
3. **fixed** — codex/cursor/grok `ln -s` blocks re-sorted (`ft-open-epic` after `ft-micro-task`).
4. **fixed** — Pair J CORE-744 sentence now reads `/ft-open-epic` (then `/ft-epic-discovery`).
5. **fixed** — `drift-checks.sh` CORE-744 comment notes `(now ft-open-epic)`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - README.md — no change: no old-slug hit
  - AGENTS.md — updated: skill roster
  - SPEC.md — no change: no old-slug hit
  - docs/MIGRATION.md — updated: retired row, §1 inventory line
  - claude/AGENTS-snippet.md — updated: peer-skill roster + `ln -s` line
  - codex/, cursor/, grok/ AGENTS-snippet.md — updated: `ln -s` lines (re-sorted)
  - docs/CONVENTIONS.md — no change
  - CONTRIBUTING.md — no change
  - SECURITY.md — no change
  - docs/AGENT-NEUTRALITY.md — updated: 3 rows
  - docs/PLATFORMS.md — updated: rows, tree, inventory list
  - claude/CAPABILITIES.md — updated: `--deep` row
  - docs/AGENT-COMPAT.md — no change
  - docs/EXTERNAL-AGENTS.md — updated: one invocation
  - docs/WORKTREES.md — updated: Fan-out row
  - docs/VISION.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. For `.5`/`.6`: zsh does not word-split `$files` — pipe `git grep -lz` into `xargs -0`; re-sort the codex/cursor/grok `ln -s` blocks, not just the drift-check list.

**Final Summary:**

`ft-epic-discovery` is now `ft-open-epic`, a hard cut with no alias, pairing it with `ft-close-epic`. Both skill dirs moved with `git mv`; `name:`, the codex wrapper path, the four snippet `ln -s` lines, every roster, the drift-check slug list, and all live cross-references follow. MIGRATION carries a v7.0.0 retired row. Dated records and two CORE-744 historical mentions keep the old name.

- **Changed files:** 37 modified (3 of them renamed skill files) + `.flaitron/PLAN.md` and this note at closure.
- **Verification:** see the receipt above; everything exited 0.
- **Refactors:** none; one `ln -s` column re-padded, three `ln -s` blocks re-sorted.
- **Docs verdict:** updated; see the doc-drift sweep.
- **`touches:` reconciliation:** every changed path is declared (`SPEC/` and `claude/skills/` as dirs); every declared path changed except `.flaitron/PLAN.md`, which changes at this closure. No undeclared edits.
- **Maintainability:** the epic bookends now read as a pair (`ft-open-epic` / `ft-close-epic`).
- **Operator follow-up (local, uncommitted):** re-point flaitron-self's gitignored `.claude/skills` and `.agents/skills` links (`ft-open-epic` and, from `.3`, `ft-file-task`).

**Archived:** 2026-10-09
