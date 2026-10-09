---
title: rename-adopt
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.3, CORE-769.4, CORE-769.6, CORE-769.7, CORE-769.N]
touches:
  - claude/skills/ft-new-project/
  - claude/skills/ft-adopt/
  - codex/skills/ft-new-project/
  - codex/skills/ft-adopt/
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - claude/skills/
  - SPEC/
  - README.md
  - AGENTS.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONTEXT-BUDGET.md
  - docs/CONVENTIONS.md
  - .flaitron/PLAN.md
blocked-by: [CORE-769.4]
---

# CORE-769.5 | rename-adopt

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-769.1]] [[CORE-769.3]] [[CORE-769.4]] [[CORE-769.6]] [[CORE-769.7]] [[CORE-769.N]]

## 🎯 Goal

Hard-cut rename the global-only `ft-new-project` skill to `ft-adopt` (pairing it with `ft-update`) across every live surface, including the global-only ones (§7.1 exclusion list + regex, PLATFORMS global column, MIGRATION §1.0 recipe, README quickstart), recording the retirement in MIGRATION; archives and dated records untouched; shipped as `feat!:`.

## ✅ Acceptance

- [x] Skill dirs renamed; old dirs gone — `test -d claude/skills/ft-adopt && test -d codex/skills/ft-adopt && test ! -e claude/skills/ft-new-project && test ! -e codex/skills/ft-new-project`
- [x] Both SKILL.md `name:` lines match the new slug — `bash tools/drift-checks.sh skill_name_invariant`
- [x] No live surface names the old slug — `git grep -n 'ft-new-project'` outside archives, each remaining hit classified in Testing Notes (`judgment`: dated record, historical narrative, or the retired row)
- [x] §7.1 exclusion list + regex name `ft-adopt`, and the installed-surface diffs stay clean — `grep -c 'ft-adopt' claude/skills/ft-release/step-7.1-standing-checks.md` ≥ 3 + the four `diff -u` lines → empty
- [x] MIGRATION §"Skills retired so far" carries an `ft-new-project` row naming `/ft-adopt` and the global re-link — `grep -n 'ft-new-project' docs/MIGRATION.md`
- [x] Drift checks clean — `bash tools/drift-checks.sh` → 0
- [x] Drift-check self-test passes — `node --test tools/drift-checks.test.mjs` → 0
- [ ] Operator's global `~/.claude/skills/ft-new-project` link re-pointed — `judgment`: per-machine state outside the repo — not met by the agent: outside the Path Access roots; handed to the operator
- [x] Closure commit is `feat!:` with a `BREAKING CHANGE:` footer — `judgment` at closure; `git log -1 --format=%B | grep -q '^BREAKING CHANGE:'` post-commit

## 🧩 Subtasks

- [x] `git mv` claude + codex skill dirs; update `name:`, body heading, codex wrapper path
- [x] Sweep live references (README, AGENTS.md, SPEC modules, skill bodies, snippets, `/ft-release` §7.1, docs)
- [x] MIGRATION: new retired row (with global re-link step)
- [x] Phase 3: drift checks + self-test + §7.1 diffs + residue grep; `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]] — Discovery that scoped this rename
- [[CORE-769.3]] — sweep shape this copies
- [[CORE-769.4]] — predecessor (`blocked-by`, Fan-out Sequential)
- [[CORE-769.6]] — next rename
- [[CORE-769.7]] — rename-aware migrate mode; natabula caller row (`natabula-adopt` calls `/ft-new-project`)
- [[CORE-769.N]] — terminal audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.4` (its `blocked-by`) closed today; `ft-new-project` still ships at HEAD with 24 live referencing files.

- [x] Read relevant source files — `git grep -n ft-new-project` over non-archive files; both SKILL.md frontmatters + the codex wrapper path; §7.1 exclusion list (L33) and regex (L45) plus the Step 7–8 awk (L11); MIGRATION §1.0 + install table + L81 + retired table; README quickstart; PLATFORMS L74 global column + L295; the three non-Claude snippets' user-skill-dir line.

- [x] **Best Practices Review** — no boundary change: a slug rename. Unlike `.3`/`.4`, this skill is global-only, so it is in no `ln -s` block and not in `skill_pin_guard_parity` — the snippets name it only in prose. `ft-adopt` sorts before `ft-audit` in `ls` glob order, irrelevant to the §7.1 regex (an alternation).

- [x] **Archive skim** — `archive/core/` confirmed against README (`CORE-*`). CORE-769.1 Probe C (`ft-new-project` is the only truly global-only skill; Step 0 aborts when `.flaitron/core/` exists) and CORE-769.3/.4 (sweep shape, residue classes, operator-owned links). Archives stay untouched.

- [x] **Drift check** — PLAN line's named surfaces match HEAD (§7.1 L33/L45, PLATFORMS L74, MIGRATION §1.0). Unnamed but in the sweep: README quickstart (global `ln -s` + invocation), ft-update L98/L206, the three snippets' user-skill-dir prose. `tools/` code carries no slug hit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions:
  - **Kept as dated/historical records:** `docs/VERSION-HISTORY.md`, `docs/CODEX-VERIFICATION.md` (dated receipt), `.flaitron/PLAN-ARCHIVE.md`.
  - **Re-pointed:** the CONTEXT-BUDGET skill-body ledger and its §1-citation prose (live names; byte counts left to the release re-measure, as in `.3`/`.4`).
  - Body heading `# new-project — …` → `# adopt — …`; description prose unchanged. The `<your-new-project>` placeholder in MIGRATION §1.0 is not the slug and stays.
  - The operator's global `~/.claude/skills/ft-new-project` link is outside the repo — handed to the operator, not touched.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see the bullets above; the residue classification lands in Testing Notes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — CORE-769.3/.4 rename shape: `git mv` both dirs, `perl -pi` live-ref sweep, MIGRATION retired row, classified residue.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — none; two lists re-sorted so `ft-adopt` sits in alphabetical order (AGENTS.md utility roster, §7.1 exclusion list + regex), list column re-padded.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: a slug rename; `skill_name_invariant` guards the `name:`, the §7.1 diffs guard the exclusion regex.

**Implementation Notes:**

- `git mv` of `claude/skills/ft-new-project` and `codex/skills/ft-new-project`; `name:`, the codex wrapper's path and heading follow via the sweep; body heading `# new-project` → `# adopt`.
- `perl -pi` slug swap over 21 live files (every non-archive hit minus VERSION-HISTORY, CODEX-VERIFICATION, PLAN-ARCHIVE, this PLAN row). Unlike `.3`/`.4`, there are no `ln -s` lines to touch, because the skill is global-only. The snippets name it only in their user-skill-dir prose.
- MIGRATION: new `ft-new-project` → `/ft-adopt` retired row (v7.0.0) that says the dangling link is in the agent home, where `/ft-update` Step 4.6 does not scan.
- CONTRIBUTING L53 bare `new-project` → `adopt` (review note 2; invisible to the `ft-new-project` residue grep).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — drift-check self-test + updater suite

- [x] Ran lint/type-check on changed code — `N/A` for code: no source changed beyond the §7.1 fragment's regex, which the §7.1 diffs execute; markdown guarded by the drift checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `/code-review medium` on the working-tree diff: 6 notes, 0 blockers; 3 fixed, 3 declined/handed off

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
test -d …ft-adopt ×2 && test ! -e …ft-new-project ×2          → 0
bash tools/drift-checks.sh                                    → 0 (skill_name_invariant ok; re-run after review fixes → 0)
node --test tools/drift-checks.test.mjs                       → 0 (19 pass)
node --test tools/update-adopters.test.mjs                    → 0 (65 pass)
§7.1 installed-surface: 4 × diff -u                           → empty, rc 0 (ssot: ft-close-epic ft-file-task ft-micro-task ft-open-epic ft-refactor ft-seed ft-task ft-update)
grep -c 'ft-adopt' step-7.1-standing-checks.md                → 4
grep -n 'ft-new-project' docs/MIGRATION.md                    → the retired row
```

The §7.1 diffs ran with the `ln -s` prefix's `.flaitron` spelled `[.]flaitron` (Path Access hook), same match set as CORE-769.3/.4.

Residue (`git grep -n new-project`, non-archive), all kept on purpose:

- **Dated records:** `docs/VERSION-HISTORY.md` (1), `docs/CODEX-VERIFICATION.md` (2), `.flaitron/PLAN-ARCHIVE.md` (7)
- **Not the slug:** MIGRATION §1.0 `<your-new-project>` placeholder
- **Rename note:** MIGRATION retired row
- **This PLAN row**

External review (`/code-review medium`, working-tree diff), graded against Acceptance — all notes:

1. **handed off (operator)** — the operator's global `~/.claude/skills/ft-new-project` link points at this working tree, so it dangles at commit time, not at release; natabula's `natabula-adopt` calls `/ft-new-project`. The link is outside the Path Access roots (operator relink). The natabula caller row is [[CORE-769.7]]'s filing per CORE-769.1. The immediate break is surfaced in the recap.
2. **fixed** — CONTRIBUTING L53 bare `new-project` → `adopt`.
3. **declined (operator)** — flaitron-self local `.claude/skills` / `.agents/skills` links: gitignored per-machine state, same disposition as CORE-769.3/.4.
4. **fixed** — MIGRATION row now names every user skill directory (Claude plus Codex/Cursor/Grok), not just `~/.claude`.
5. **fixed** — MIGRATION row says the dangling link is in the agent home, where `/ft-update` Step 4.6 does not scan.
6. **declined** — CONTEXT-BUDGET ledger byte count: every row is a release-time re-measure (§7.1), the same disposition as `.3`/`.4`. The retirement prose covers retired rows, and `ft-adopt` is a rename that keeps its row.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - README.md — updated: Quickstart global `ln -s` + invocation
  - AGENTS.md — updated: utility-skill roster (re-sorted)
  - SPEC.md — no change: names no `ft-new-project`
  - docs/MIGRATION.md — updated: §1.0 heading/recipe/install table, L10, L81, §3 collision note, retired row
  - claude/AGENTS-snippet.md — updated: derived-consumer table row
  - codex/, cursor/, grok/ AGENTS-snippet.md — updated: user-skill-dir prose
  - docs/CONVENTIONS.md — updated: two mentions
  - CONTRIBUTING.md — updated: L53 surface list
  - SECURITY.md — no change
  - docs/AGENT-NEUTRALITY.md — updated: 3 rows
  - docs/PLATFORMS.md — updated: global-only column + inventory prose
  - claude/CAPABILITIES.md — no change
  - docs/AGENT-COMPAT.md — no change
  - docs/EXTERNAL-AGENTS.md — no change: no slug hit (a global-only skill is not on the caller stable surface)
  - docs/WORKTREES.md — no change
  - docs/VISION.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. Rename-sweep note for `.6`: residue-grep the bare stem too (`seed`-style prose like CONTRIBUTING's "release, new-project" escapes the `ft-` grep).

**Final Summary:**

`ft-new-project` is now `ft-adopt`. It is a hard cut with no alias, and the skill is still global-only. Both skill dirs moved with `git mv`. The `name:`, the body heading, the codex wrapper path, the §7.1 exclusion list and regex, the PLATFORMS global-only column, the MIGRATION §1.0 recipe, the README quickstart and every other live reference now use the new name. MIGRATION carries a v7.0.0 retired row whose re-link step targets the agent home. Dated records keep the old name.

- **Changed files:** 23 modified (2 of them renamed skill files) + `.flaitron/PLAN.md` and this note at closure.
- **Verification:** see the receipt above; everything exited 0.
- **Refactors:** none; two lists re-sorted to keep alphabetical order.
- **Docs verdict:** updated; see the doc-drift sweep.
- **`touches:` reconciliation:** one undeclared path, `CONTRIBUTING.md` (review note 2). The `ft-new-project` dirs are declared as renamed paths. `.flaitron/PLAN.md` changes at this closure. Every other declared path changed.
- **Maintainability:** the bootstrap and bump skills now read as a pair (`ft-adopt` / `ft-update`).
- **Operator follow-up (local, outside the repo):** re-point `~/.claude/skills/ft-new-project` → `ft-adopt`. It points at this working tree, so it dangles at commit time, and `natabula-adopt` (which calls `/ft-new-project`) breaks until natabula is updated ([[CORE-769.7]] files that row). Also re-point flaitron-self's gitignored `.claude/skills` and `.agents/skills` links.

**Archived:** 2026-10-09
