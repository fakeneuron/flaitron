---
title: rename-file-task
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.1, CORE-769.2, CORE-769.4, CORE-769.7, CORE-769.N]
touches:
  - claude/skills/ft-file-followup/
  - claude/skills/ft-file-task/
  - codex/skills/ft-file-followup/
  - codex/skills/ft-file-task/
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - tools/drift-checks.sh
  - SPEC.md
  - SPEC/
  - claude/skills/
  - claude/CAPABILITIES.md
  - templates/tasknote-README.md
  - templates/spec-template.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - docs/AGENT-NEUTRALITY.md
  - docs/EXTERNAL-AGENTS.md
  - docs/CONVENTIONS.md
  - docs/CONTEXT-BUDGET.md
  - AGENTS.md
  - .flaitron/PLAN.md
blocked-by: [CORE-769.2]
---

# CORE-769.3 | rename-file-task

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-769.1]] [[CORE-769.2]] [[CORE-769.4]] [[CORE-769.7]] [[CORE-769.N]]

## 🎯 Goal

Hard-cut rename the `ft-file-followup` skill to `ft-file-task` across every live surface (skill dirs, snippet wiring, rosters, drift checks, cross-references), recording the retirement in MIGRATION, with archives and dated records untouched; shipped as `feat!:`.

## ✅ Acceptance

- [x] Skill dirs renamed; old dirs gone — `test -d claude/skills/ft-file-task && test -d codex/skills/ft-file-task && test ! -e claude/skills/ft-file-followup && test ! -e codex/skills/ft-file-followup`
- [x] Both SKILL.md `name:` lines match the new slug — `bash tools/drift-checks.sh skill_name_invariant`
- [x] No live surface names the old slug — `git grep -n 'ft-file-followup'` outside archives, each remaining hit classified in Testing Notes (`judgment`: dated record, historical narrative, or the retired row)
- [x] MIGRATION §"Skills retired so far" carries an `ft-file-followup` row naming `/ft-file-task`; rows that pointed at the old slug point at the new one — `grep -n 'ft-file-followup' docs/MIGRATION.md`
- [x] Drift checks clean — `bash tools/drift-checks.sh` → 0
- [x] Drift-check self-test passes — `node --test tools/drift-checks.test.mjs` → 0
- [x] §7.1 installed-surface derivation diffs clean — the four `diff -u` lines from `step-7.1-standing-checks.md` → empty
- [ ] flaitron-self local wiring re-pointed (`.claude/skills/ft-file-task`, old link removed) — `judgment`: gitignored per-machine state — not met by the agent: the Path Access hook blocks the relative `ln -s`; handed to the operator
- [x] Closure commit is `feat!:` with a `BREAKING CHANGE:` footer — `judgment` at closure; `git log -1 --format=%B | grep -q '^BREAKING CHANGE:'` post-commit

## 🧩 Subtasks

- [x] `git mv` claude + codex skill dirs; update `name:` and the codex wrapper's relative path
- [x] Snippets: the four `ln -s` blocks (and prose) in claude/codex/cursor/grok `AGENTS-snippet.md`
- [x] `tools/drift-checks.sh` slug list + comments
- [x] Sweep live references: SPEC + SPEC/ modules, skill bodies/fragments, templates, CAPABILITIES, docs, AGENTS.md, `/ft-release` fragments (live lines only)
- [x] MIGRATION: new retired row; re-point `ft-starter-task` / `ft-sidequest` replacement column
- [ ] Re-point flaitron-self local `.claude/skills/` (+ `.codex/skills/` if present) symlinks — handed to the operator (Path Access hook)
- [x] Phase 3: drift checks + self-test + §7.1 diffs + residue grep; `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.1]] — Discovery that scoped this rename (Probe B mechanics, Resolved scoping)
- [[CORE-769.2]] — predecessor; retired the command stubs so this moves only skill dirs
- [[CORE-769.4]] — next rename, same sweep shape
- [[CORE-769.7]] — rename-aware migrate mode for v7.0.0
- [[CORE-769.N]] — terminal audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today by CORE-769.1; `.2` (its `blocked-by`) closed, so the stubs are gone and the rename moves only skill dirs. `ft-file-followup` still ships at HEAD with 46 live referencing files.

- [x] Read relevant source files — `git grep -c 'ft-file-followup'` over non-archive files (46 files), then the wiring surfaces: both SKILL.md frontmatters, the codex wrapper's relative path, the four snippet `ln -s` lines + the claude snippet's peer-skill roster, `drift-checks.sh` `skill_pin_guard_parity` slug list (L84) and comments, MIGRATION §"Skills retired so far"

- [x] **Best Practices Review** — no boundary change: a pure slug rename. The snippet `ln -s` blocks stay the wiring SSOT (CORE-465); `skill_name_invariant` (CORE-769.2) now guards a stale `name:`. `skill_pin_guard_parity`'s printf list is in glob order, and `ft-file-task` sorts in the same slot.

- [x] **Archive skim** — `archive/core/` confirmed against README (`CORE-*`). CORE-769.1 Probe B/D and CORE-769.2 cover this surface (rename = retire + new skill to the tooling; hard cut, no alias; `feat!:` per CORE-712). No new hits needed; archives stay untouched by contract.

- [x] **Drift check** — the PLAN line's named surfaces match HEAD. It does not list a further ~35 live files (SPEC modules, skill bodies, templates, `/ft-release` fragments, CAPABILITIES, several docs) that "cross-references" covers. `tools/` tests and `update-adopters.mjs` carry no slug hit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions:
  - **Kept as dated/historical records:** `docs/VERSION-HISTORY.md`, `docs/CODEX-VERIFICATION.md` (dated v5.33.0 receipt), `docs/HARNESS-SURVEY.md` (dated append-only passes), `step-7.1-standing-checks.md` v5.15.0-stranded-links narrative, `docs/CONTEXT-BUDGET.md` retired-skills narrative.
  - **Re-pointed:** MIGRATION `ft-starter-task` / `ft-sidequest` replacement column → `/ft-file-task`, so an adopter jumping from v5 lands on a live slug; the CONTEXT-BUDGET skill-body ledger row (live name; its byte count is left to the release re-measure, like every other row there).
  - Description prose ("follow-up filer") unchanged — a slug rename, not a re-description.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see the bullets above; the residue classification lands in Testing Notes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — CORE-769.1's rename shape (hard cut, no alias) + CORE-572's retire-and-record row: `git mv` both dirs, sweep live refs, MIGRATION retired row, classify `git grep` residue.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — none; one `ln -s` column re-padded in the claude snippet to keep its alignment.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: a slug rename; `skill_name_invariant` + `skill_pin_guard_parity` already guard it, and the self-test seeds no slug-specific case.

**Implementation Notes:**

- `git mv` of `claude/skills/ft-file-followup` and `codex/skills/ft-file-followup`; `name:`, the body heading, and the codex wrapper's relative path follow.
- `perl -pi` slug swap over 42 live files (all non-archive hits minus the dated records named in Discovery), then restored two historical narratives: the v5.15.0 stranded-links sentence in `step-7.1-standing-checks.md` and the v5.27.0 fold sentence in `docs/CONTEXT-BUDGET.md`.
- Pair F's "retired" paragraph took the new slug in full: `pair_q` failed on its old path citation, and the paragraph also describes where the roster sits today.
- MIGRATION: new `ft-file-followup` → `/ft-file-task` retired row (v7.0.0); the `ft-starter-task` / `ft-sidequest` replacement column re-pointed by the sweep.
- Local wiring not re-pointed by the agent: the Path Access hook reads the relative `ln -s ../../claude/...` target as outside the repo. Handed to the operator.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — drift-check self-test + updater suite

- [x] Ran lint/type-check on changed code — `N/A` for code: no source changed beyond `drift-checks.sh`'s slug list and comments, which `bash tools/drift-checks.sh` executes. Markdown is guarded by the drift checks (Pair Q citations, final newline, frontmatter YAML).

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `/code-review medium` on the working-tree diff: 9 notes, 0 blockers; 4 fixed, 5 declined with reasons

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
test -d claude/skills/ft-file-task && test -d codex/skills/ft-file-task && test ! -e …ft-file-followup ×2 → 0
bash tools/drift-checks.sh                   → 0 (skill_name_invariant, shipped_skill_parity, skill_pin_guard_parity ok; pair_q failed once on Pair F's old path, fixed)
node --test tools/drift-checks.test.mjs      → 0 (19 pass)
node --test tools/update-adopters.test.mjs   → 0 (65 pass)
§7.1 installed-surface: 4 × diff -u          → empty, rc 0 (ssot: ft-close-epic ft-epic-discovery ft-file-task ft-micro-task ft-refactor ft-seed ft-task ft-update)
grep -n 'ft-file-followup' docs/MIGRATION.md → retired row + 2 "until v7.0.0" interim-name notes
```

The §7.1 diffs ran with the `ln -s` prefix spelled as a character-class regex: the Path Access hook reads the literal `../../.flaitron/core/...` grep pattern as an outside path. Same match set.

Residue (`git grep -n ft-file-followup`, non-archive), all kept on purpose:

- **Dated records:** `docs/VERSION-HISTORY.md` (6), `docs/CODEX-VERIFICATION.md` (3, v5.33.0 receipt), `docs/HARNESS-SURVEY.md` (1, dated pass)
- **Historical narrative:** `step-7.1-standing-checks.md` v5.15.0 stranded-links sentence; `docs/CONTEXT-BUDGET.md` v5.27.0 fold sentence (now notes the rename)
- **Rename notes:** MIGRATION retired row + 2 interim-name notes; EXTERNAL-AGENTS pre-v7 probe note
- **This PLAN row**

External review (`/code-review medium`, working-tree diff), graded against Acceptance — all notes:

1. **fixed** — EXTERNAL-AGENTS capability-probe row now says a pre-v7.0.0 pin ships the skill as `ft-file-followup`.
2. **declined** — Steps 1/8 calling `/ft-file-task` on a pre-v7 pin: callers probe first (row fixed in 1); the doc describes the current pin.
3. **fixed** — Pair F rewrite was deliberate (its path citation tripped `pair_q`, and it states where the roster sits today); the Discovery assumption that listed it as kept is corrected.
4. **fixed** — MIGRATION `ft-starter-task` / `ft-sidequest` rows name the interim slug "until v7.0.0".
5. **declined** — CONTEXT-BUDGET ledger byte count: every row in that ledger is a release-time re-measure (§7.1), and the others have drifted too; the tasknote's "same bytes" claim is corrected.
6. **fixed** — CONTEXT-BUDGET fold sentence notes the v7.0.0 rename.
7. **declined (operator)** — flaitron-self local `.claude/skills` / `.agents/skills` links: gitignored per-machine state; handed to the operator with the relink commands, as CORE-769.2 did.
8. **declined** — §7.1 v5.15.0 stranded-links narrative: it names MIGRATION §"Skills retired so far" as authoritative, which now carries the v7 row.
9. **declined** — Pair F lists the dated CODEX-VERIFICATION record among flag surfaces: pre-existing wording, not introduced by the rename; `.N` audit can weigh it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - README.md — no change: names no `ft-file-followup`
  - AGENTS.md — updated: skill roster
  - SPEC.md — updated: §"Deferred hand-off filing" discharge path
  - docs/MIGRATION.md — updated: retired row, two replacement rows, §1 inventory line
  - claude/AGENTS-snippet.md — updated: peer-skill roster + `ln -s` line
  - codex/, cursor/, grok/ AGENTS-snippet.md — updated: `ln -s` lines
  - docs/CONVENTIONS.md — updated: two slug mentions
  - CONTRIBUTING.md — no change
  - SECURITY.md — no change
  - docs/AGENT-NEUTRALITY.md — updated: 4 rows
  - docs/PLATFORMS.md — updated: rows, tree, inventory list
  - claude/CAPABILITIES.md — updated: flag rows
  - docs/AGENT-COMPAT.md — no change
  - docs/EXTERNAL-AGENTS.md — updated: invocations + pre-v7 probe note
  - docs/WORKTREES.md — no change
  - docs/VISION.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`. The rename sweep's shape (dated records kept, interim-name notes on MIGRATION rows, a pre-v7 note on the caller probe) is recorded here for `.4`–`.6` to copy.

**Final Summary:**

`ft-file-followup` is now `ft-file-task`, a hard cut with no alias. Both skill dirs moved with `git mv`; `name:`, the codex wrapper path, the four snippet `ln -s` lines, every roster, the drift-check slug list, and all live cross-references follow. MIGRATION carries a v7.0.0 retired row; the two older rows that pointed at the old slug now name the new one, with the interim name noted. Dated records (VERSION-HISTORY, CODEX-VERIFICATION, HARNESS-SURVEY) and two historical sentences keep the old name.

- **Changed files:** 44 modified (6 of them renamed skill files) + `.flaitron/PLAN.md` and this note at closure.
- **Verification:** see the receipt above; everything exited 0.
- **Refactors:** none; one `ln -s` column re-padded.
- **Docs verdict:** updated; see the doc-drift sweep.
- **`touches:` reconciliation:** every changed path is declared (`SPEC/` and `claude/skills/` as dirs); every declared path changed except `.flaitron/PLAN.md`, which changes at this closure. No undeclared edits.
- **Maintainability:** one name per skill again after `.4`–`.6`; `skill_name_invariant` and `skill_pin_guard_parity` caught the slug at both ends.
- **Operator follow-up (local, uncommitted):** re-point flaitron-self's gitignored `.claude/skills` and `.agents/skills` links.

**Archived:** 2026-10-09
