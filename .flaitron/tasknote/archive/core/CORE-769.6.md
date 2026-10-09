---
title: rename-seed-unattended
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.3, CORE-769.5, CORE-769.7, CORE-769.N]
touches:
  - claude/skills/ft-seed/
  - claude/skills/ft-seed-unattended/
  - codex/skills/ft-seed/
  - codex/skills/ft-seed-unattended/
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - SPEC/
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - AGENTS.md
  - README.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONTEXT-BUDGET.md
  - docs/EXTERNAL-AGENTS.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - .flaitron/PLAN.md
blocked-by: [CORE-769.5]
---

# CORE-769.6 | rename-seed-unattended

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-769.1]] [[CORE-769.3]] [[CORE-769.5]] [[CORE-769.7]] [[CORE-769.N]]

## 🎯 Goal

Hard-cut rename the `ft-seed` skill to `ft-seed-unattended` across every live surface (skill dirs, snippet wiring, rosters, drift checks, cross-references), recording the retirement in MIGRATION, with archives and dated records untouched; shipped as `feat!:`.

## ✅ Acceptance

- [x] Skill dirs renamed; old dirs gone — `test -d claude/skills/ft-seed-unattended && test -d codex/skills/ft-seed-unattended && test ! -e claude/skills/ft-seed && test ! -e codex/skills/ft-seed`
- [x] Both SKILL.md `name:` lines match the new slug — `bash tools/drift-checks.sh skill_name_invariant`
- [x] No live surface names the old slug — `git grep -nw 'ft-seed'` outside archives, each remaining hit classified in Testing Notes (`judgment`: dated record, historical narrative, or the retired row)
- [x] MIGRATION §"Skills retired so far" carries an `ft-seed` row naming `/ft-seed-unattended` — `grep -n '^| `ft-seed`' docs/MIGRATION.md`
- [x] Drift checks clean — `bash tools/drift-checks.sh` → 0
- [x] Drift-check self-test passes — `node --test tools/drift-checks.test.mjs` → 0
- [x] §7.1 installed-surface derivation diffs clean — the four `diff -u` lines from `step-7.1-standing-checks.md` → empty
- [ ] flaitron-self local wiring re-pointed (`.claude/skills/ft-seed-unattended`, `.agents/skills/ft-seed-unattended`, old links removed) — `judgment`: gitignored per-machine state; not met by the agent: the Path Access hook blocks the relative `ln -s`; handed to the operator
- [x] Closure commit is `feat!:` with a `BREAKING CHANGE:` footer — `judgment` at closure; `git log -1 --format=%B | grep -q '^BREAKING CHANGE:'` post-commit

## 🧩 Subtasks

- [x] `git mv` claude + codex skill dirs; update `name:`, body heading, and the codex wrapper's heading + relative path
- [x] Snippets: the four `ln -s` lines (and roster prose) in claude/codex/cursor/grok `AGENTS-snippet.md`
- [x] `tools/drift-checks.sh` slug list; `tools/drift-checks.test.mjs` seeded path
- [x] Sweep live references: SPEC/ modules, `/ft-release` Pair O, AGENTS.md, README, docs (live lines only)
- [x] MIGRATION: new retired row; L472 inventory note
- [ ] Re-point flaitron-self local `.claude/skills/` + `.agents/skills/` symlinks — handed to the operator (Path Access hook)
- [x] Phase 3: drift checks + self-test + updater suite + §7.1 diffs + residue grep (slug and bare stem); `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]] — Discovery that scoped this rename
- [[CORE-769.3]] — sweep shape this copies
- [[CORE-769.5]] — predecessor (Fan-out: sequential)
- [[CORE-769.7]] — rename-aware migrate mode for v7.0.0; consumes the final rename map
- [[CORE-769.N]] — terminal audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today by CORE-769.1; `.5` (Fan-out predecessor) closed at HEAD. `ft-seed` still ships with 25 non-archive referencing files.

- [x] Read relevant source files — `git grep -n ft-seed` over non-archive files; both SKILL.md frontmatters + headings, codex wrapper path, four snippet `ln -s` lines, `drift-checks.sh` L84 slug list, `drift-checks.test.mjs` L46 seeded path, MIGRATION §"Skills retired so far"

- [x] **Best Practices Review** — no boundary change: a pure slug rename. `ft-seed-unattended` keeps its glob-order slot in the `skill_pin_guard_parity` printf list (after `ft-refactor`, before `ft-task`). It is adopter-installed (unlike `.5`'s global-only `ft-adopt`), so the `ln -s` lines move, as in `.3`.

- [x] **Archive skim** — `archive/core/` confirmed against README (`CORE-*`). CORE-769.3/.5 closed notes give the shape: dated records kept, interim-name notes, local wiring handed to the operator, residue-grep the bare stem (`.5` Learnings).

- [x] **Drift check** — PLAN line matches HEAD; no named surface missing.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions:
  - **Kept as dated/historical records:** `docs/VERSION-HISTORY.md`, `docs/CODEX-VERIFICATION.md`, `.flaitron/PLAN-ARCHIVE.md`, `docs/CONTEXT-BUDGET.md` L147 (historical byte-delta narrative about a past `SPEC.md` pointer).
  - **Re-pointed:** the CONTEXT-BUDGET skill-body ledger row (live name; bytes left to release re-measure, as in `.3`–`.5`); MIGRATION L472 inventory note gets the new slug with the interim name.
  - The commit message `chore: seed [unattended] — <N> rows` and the "seed" verb in prose are not the slug; unchanged.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see the bullets above; the residue classification lands in Testing Notes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — CORE-769.3/.5 rename shape: `git mv` both dirs, `perl -pi` live-ref sweep, MIGRATION retired row, classified residue.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — none; the claude snippet's `ln -s` line takes a single space (the new slug fills the alignment column exactly).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: a slug rename; `skill_name_invariant` + `skill_pin_guard_parity` guard it, and the self-test's seeded `skill_pin_guard_parity` case path moved with the dir.

**Implementation Notes:**

- `git mv` of `claude/skills/ft-seed` and `codex/skills/ft-seed`; `name:`, the codex wrapper's heading and path follow via the sweep; body heading `# seed` → `# seed-unattended`.
- `perl -pi` slug swap (`\bft-seed\b(?!-)`) over 21 live files — every non-archive hit minus VERSION-HISTORY, CODEX-VERIFICATION, PLAN-ARCHIVE, this PLAN row. Then restored the CONTEXT-BUDGET L147 historical byte-delta sentence.
- MIGRATION: new `ft-seed` → `/ft-seed-unattended` retired row (v7.0.0); L472 inventory note says the skill was added in CORE-619 as `ft-seed`.
- `tools/drift-checks.sh` printf list and `drift-checks.test.mjs` seeded path follow via the sweep; glob order unchanged.
- Local wiring not re-pointed by the agent: the Path Access hook reads the relative `ln -s ../../claude/...` target as outside the repo. Handed to the operator.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — drift-check self-test + updater suite

- [x] Ran lint/type-check on changed code — `N/A` for code: only `drift-checks.sh`'s slug list and the self-test's seeded path changed, both executed below; markdown guarded by the drift checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `/code-review medium` on the working-tree diff: 7 notes, 0 blockers; 2 fixed, 5 declined/handed off

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
test -d …ft-seed-unattended ×2 && test ! -e …ft-seed ×2        → 0
bash tools/drift-checks.sh                                    → 0 (skill_name_invariant, skill_pin_guard_parity ok; re-run after review fixes → 0)
node --test tools/drift-checks.test.mjs                       → 0 (19 pass)
node --test tools/update-adopters.test.mjs                    → 0 (65 pass)
§7.1 installed-surface: 4 × diff -u                           → empty, rc 0 (ssot: ft-close-epic ft-file-task ft-micro-task ft-open-epic ft-refactor ft-seed-unattended ft-task ft-update)
grep -n '^| `ft-seed`' docs/MIGRATION.md                      → the retired row (L523)
```

The §7.1 diffs ran with the `ln -s` prefix's dots spelled `[.]` (Path Access hook), same match set as CORE-769.3–.5.

Residue (`\bft-seed\b(?!-)`, non-archive), all kept on purpose:

- **Dated records:** `docs/VERSION-HISTORY.md` (2), `docs/CODEX-VERIFICATION.md` (3), `.flaitron/PLAN-ARCHIVE.md` (3)
- **Historical narrative:** `docs/CONTEXT-BUDGET.md` L147 (a past `SPEC.md` pointer's byte delta)
- **Rename notes:** MIGRATION retired row + L472 "added in CORE-619 as `ft-seed`, renamed at v7.0.0"
- **This PLAN row**

Bare-stem check (`.5` Learnings): no `` `seed` `` / `skills/seed` slug-like prose; the remaining "seed" hits are the verb and the `chore: seed [unattended]` commit message.

External review (`/code-review medium`, working-tree diff), graded against Acceptance — all notes:

1. **declined (operator)** — flaitron-self local `.claude/skills` / `.agents/skills` links: gitignored per-machine state; the relink is blocked by the Path Access hook, handed to the operator as in `.3`–`.5`.
2. **fixed** — the tasknote was mid-write when reviewed; Phase 3 notes and residue classification are now recorded.
3. **declined** — CONTEXT-BUDGET ledger byte count: every row is a release-time re-measure (§7.1), same as `.3`–`.5`.
4. **declined** — `-unattended` suffix vs the `--unattended` flag: the slug was settled with the operator in [[CORE-769.1]]; it names the marker, and the body already says attended-only. The guard line's `--unattended` clause is the shared Skill/pin guard text `skill_pin_guard_parity` holds byte-identical across skills.
5. **handed off** — natabula's `natabula-adopt` calls `/ft-seed`: the natabula caller row is [[CORE-769.7]]'s filing per CORE-769.1 (cross-repo edit remit).
6. **declined** — body heading `# seed-unattended`: matches the bare-stem style of `ft-file-task` (`# file-task`) and `ft-adopt` (`# adopt`); only `ft-open-epic` differs.
7. **fixed** — MIGRATION L472 note now says the skill was renamed at v7.0.0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - README.md — updated: adopter-subset roster
  - AGENTS.md — updated: utility-skill roster
  - SPEC.md — no change: names no `ft-seed`
  - docs/MIGRATION.md — updated: L79 subset prose, L472 inventory note, retired row
  - claude/AGENTS-snippet.md — updated: utilities line, `ln -s` line, subset prose
  - codex/, cursor/, grok/ AGENTS-snippet.md — updated: `ln -s` lines + subset prose
  - docs/CONVENTIONS.md — no change
  - CONTRIBUTING.md — no change
  - SECURITY.md — no change
  - docs/AGENT-NEUTRALITY.md — updated: plan-filing row
  - docs/PLATFORMS.md — updated: rows + inventory list
  - claude/CAPABILITIES.md — no change
  - docs/AGENT-COMPAT.md — no change
  - docs/EXTERNAL-AGENTS.md — updated: seeding prose
  - docs/WORKTREES.md — no change
  - docs/VISION.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. For [[CORE-769.7]]: the final rename map is `ft-file-followup`→`ft-file-task`, `ft-epic-discovery`→`ft-open-epic`, `ft-new-project`→`ft-adopt` (global-only), `ft-seed`→`ft-seed-unattended`.

**Final Summary:**

`ft-seed` is now `ft-seed-unattended`. It is a hard cut with no alias, and the skill is still adopter-installed. Both skill dirs moved with `git mv`. The `name:`, the body heading, the codex wrapper, the four snippet `ln -s` lines, every roster, the drift-check slug list and self-test path, and all live cross-references now use the new name. MIGRATION carries a v7.0.0 retired row. Dated records and one historical sentence keep the old name.

- **Changed files:** 21 modified (2 of them renamed skill files) + `.flaitron/PLAN.md` and this note at closure.
- **Verification:** see the receipt above; everything exited 0.
- **Refactors:** none.
- **Docs verdict:** updated; see the doc-drift sweep.
- **`touches:` reconciliation:** every changed path is declared (`SPEC/` as a dir); every declared path changed except `.flaitron/PLAN.md`, which changes at this closure. No undeclared edits.
- **Maintainability:** completes the four renames; `.7` has its final map.
- **Operator follow-up (local, uncommitted):** re-point flaitron-self's gitignored `.claude/skills/ft-seed` → `ft-seed-unattended` and `.agents/skills/ft-seed` → `ft-seed-unattended` (and the stale `.3`–`.5` links, if still there).

**Archived:** 2026-10-09
