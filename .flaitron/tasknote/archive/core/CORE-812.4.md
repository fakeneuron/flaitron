---
title: retire-prep-slug
status: completed
tags: [unattended, seed-unattended, prep-unattended, retirement]
created: 2026-10-18
due:
related-tasks: [CORE-EPIC-812, CORE-812.3, CORE-812.N, CORE-778.3, CORE-769.3]
touches:
  - claude/skills/ft-prep-unattended/SKILL.md
  - codex/skills/ft-prep-unattended/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - SPEC/layout.md
  - SPEC/plan-filing.md
  - SPEC/model.md
  - AGENTS.md
  - README.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/GLOSSARY.md
  - docs/EXTERNAL-AGENTS.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONTEXT-BUDGET.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
blocked-by:
  - CORE-812.3
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

# CORE-812.4 | retire-prep-slug

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-812]]

## 🎯 Goal

Retire `/ft-prep-unattended` now that `/ft-seed-unattended` carries its walk: delete both bodies, drop the slug from every roster, check, and contract surface, add the retired-table row, and hand natabula its mirror edit.

## ✅ Acceptance

- [x] Both bodies gone — `test ! -e claude/skills/ft-prep-unattended && test ! -e codex/skills/ft-prep-unattended`
- [x] No live surface names the slug outside retirement/history text — `git grep -n 'prep-unattended' -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN.md' ':!docs/VERSION-HISTORY.md'` prints only the MIGRATION retired row + roster note and the dated CONTEXT-BUDGET history sentences (`judgment` on the residue)
- [x] Retired-table row present — `grep -qE '^\| `ft-prep-unattended` \| v7\.3\.0 \| `/ft-seed-unattended`' docs/MIGRATION.md`
- [x] Glossary and EXTERNAL-AGENTS describe seed as the preparer — `grep -c 'prep' docs/GLOSSARY.md docs/EXTERNAL-AGENTS.md` reviewed (`judgment`: prose)
- [x] Updater left unchanged by decision (no prune) — `git diff --quiet HEAD -- tools/update-adopters.mjs`; suite green — `node --test tools/update-adopters.test.mjs`
- [x] Drift checks pass — `bash tools/drift-checks.sh`
- [x] natabula handoff row filed and committed in `~/Code/natabula` — `git -C ~/Code/natabula log -1 --format=%s` names the filing

## 🧩 Subtasks

- [x] `git rm -r` both ft-prep-unattended bodies; remove flaitron-self's gitignored `.claude/skills` / `.agents/skills` links
- [x] Four snippets: drop the `ln -s` lines and roster mentions; rewrite claude snippet's Utilities line to seed-only
- [x] `tools/drift-checks.sh` guard-parity list → six bodies, `"6 "`
- [x] SPEC/layout.md, SPEC/plan-filing.md (ID allocation, Filing commits prose + table, recognized hunks, fence), SPEC/model.md consulted-by list
- [x] AGENTS.md (utility count), README.md, docs/PLATFORMS.md, docs/AGENT-NEUTRALITY.md, docs/CONTEXT-BUDGET.md skill-body list
- [x] docs/GLOSSARY.md (delete prep entry, widen seed entry, [unattended] line, maintenance stamp), docs/EXTERNAL-AGENTS.md
- [x] step-7.1-mirror-pairs.md Pair C writers row + Pair O prose
- [x] docs/MIGRATION.md retired-table row + §1.2 roster + Step 4.6 note
- [x] File + commit natabula handoff row
- [x] Phase 3: drift checks, updater suite, Acceptance greps, `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-812]] — parent epic
- [[CORE-812.3]] — predecessor: seed absorbed prep's walk; its recap lists the stale prose this child fixes
- [[CORE-778.3]] · [[CORE-769.3]] — hard-cut retirement precedents (bodies, snippets, guard list, MIGRATION row)
- [[CORE-812.N]] — follow-up audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.3` landed the merged walk in `/ft-seed-unattended`. The prep body is now a duplicate that overlaps seed's triggers, and the interim must not ship in a release.

- [x] Read relevant source files — full `git grep prep-unattended` outside the archive; `tools/update-adopters.mjs` `SKILL_RENAME` + its MIGRATION-row test; `codex/reconcile-skills.md` retired-table parser; `docs/MIGRATION.md` §"Retired skills leave dangling symlinks"; `tools/drift-checks.sh` `skill_pin_guard_parity`, `pair_c`, `pair_o`; step-7.1 Pair C / O; natabula `AGENTS.md:15`, `templates/AGENTS.md`, `.flaitron/PLAN.md`

- [x] **Best Practices Review** — deletion plus roster edits; no new abstraction. The one design question (updater prune) resolves to the existing report-only path.

- [x] **Archive skim** — [[CORE-778.3]] and [[CORE-769.3]] (hard cuts) and the `.1`/`.2`/`.3` siblings read; findings below

- [x] **Drift check** — PLAN line matches HEAD. Two surfaces the line doesn't name by path: `docs/GLOSSARY.md` and `docs/EXTERNAL-AGENTS.md` (flagged in `.2`/`.3` recaps; they count as "roster docs"). `SPEC/unattended-candidacy.md` and `SPEC/task-line-segments.md` already carry no prep slug (`.2`).

- [x] Asked clarifying questions — two, answers below

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Inventory: 25 non-archive files name the slug (see `touches:`). Leave alone: `docs/VERSION-HISTORY.md` (history), closed PLAN rows (CORE-805, CORE-797, CORE-783.3), the dated CONTEXT-BUDGET re-measure sentences at :272 and :317, and the EPIC-812 parent line.

Updater: `SKILL_RENAME` is pinned to the v7.0.0 tag. Folding a v7.3.0 slug in would need a multi-tag map. The `ft-debug` (v5.15.0) and `ft-audit-context` (v5.29.0) folds used the table row only: `codex/reconcile-skills.md` auto-prunes exact-owned links for any single-name `ft-*` row whose body is absent at the pin, and `/ft-update` Step 4.6 reports the Claude/Cursor/Grok links. The MIGRATION-row test only binds map → row, so a row with no map entry is fine.

Release version: the retired row says v7.3.0, the next minor after v7.2.0 (epic-chosen minor). `/ft-release` corrects it if the cut differs.

Guard parity: `skill_pin_guard_parity` counts 7 adopter-subset bodies carrying the guard; it drops to 6 when the prep body goes.

Pair C: seed now writes starters (`claude/skills/ft-seed-unattended/SKILL.md:150`), so the writers row swaps prep for seed, not just drops it.

### Resolved scoping

| Question | Answer |
|---|---|
| Updater prune | No. Table row only; `tools/update-adopters.mjs` unchanged. |
| natabula handoff | File a NAT row in `~/Code/natabula/.flaitron/PLAN.md` and commit it there as a filing commit; no push. |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the [[CORE-778.3]] / [[CORE-769.3]] hard-cut shape (git rm bodies, snippet `ln -s` lines, rosters, guard list, MIGRATION row); no new shape

- [x] **Minimal refactor gate** — no refactor; every edit removes or rewords a prep mention

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `tools/drift-checks.test.mjs` guard-drift expectation 1/6 → 1/5 (the seeded body is one of six now)

**Implementation Notes:**

- Deleted `claude/skills/ft-prep-unattended/` and `codex/skills/ft-prep-unattended/`; removed flaitron-self's gitignored `.claude/skills` and `.agents/skills` links (no commit carries those).
- Snippets: four `ln -s` lines dropped; the "adopter-installed subset" prose in claude/cursor/grok/codex; claude's Utilities bullet now names seed alone, with the pin/split/starter clause and the §"Seeding an existing plan" citation.
- `tools/drift-checks.sh` `skill_pin_guard_parity`: list minus prep, `"6 "`, comment "six".
- Contract: `SPEC/layout.md` roster; `SPEC/plan-filing.md` header, §"ID allocation", §"Filing commits" prose, table row, recognized-hunk lines, execution-skill fence; `SPEC/model.md` consulted-by list (prep → seed, since seed now picks a `[model]` for a split's mechanical row).
- Rosters: `AGENTS.md` (Five → Four utility-only), `README.md`, `docs/PLATFORMS.md` (three rosters; skill-body and wrapper counts 12 → 11), `docs/AGENT-NEUTRALITY.md`, `docs/CONTEXT-BUDGET.md` skill-body list (dated sentences left as history).
- Prose: `docs/GLOSSARY.md` (prep entry removed, seed entry widened, `[unattended]` entry trimmed, maintenance stamp); `docs/EXTERNAL-AGENTS.md:63` (seed's same walk prepares).
- `step-7.1-mirror-pairs.md`: Pair C starter writers prep → seed; Pair O prose.
- `docs/MIGRATION.md`: retired row at the table top (v7.3.0, single-name so `codex/reconcile-skills.md` prunes it); §1.2 roster; the Step 4.6 roster note.
- `tools/update-adopters.mjs` unchanged by decision.
- natabula: NAT-432 `[medium] | seed-prep-merge-mirror` (39w) filed under Medium, committed `bed53df` (not pushed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` (19 pass) and `node --test tools/update-adopters.test.mjs` (102 pass)

- [x] Ran lint/type-check on changed code — `node --check` on the three tool scripts; no viz change

- [x] **Verification receipt** — below; no duplication or dead code left (both bodies deleted, guard list and counts re-derived)

- [x] **External review** — `/code-review medium` on the working tree; 0 blockers, 4 notes (below)

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:
- A1 `test ! -e claude/skills/ft-prep-unattended && test ! -e codex/skills/ft-prep-unattended` → 0
- A2 `git grep -n prep-unattended` (archive, PLAN, VERSION-HISTORY, this note excluded) → 7 lines, all retirement/history: MIGRATION row + §Step 4.6 note, GLOSSARY seed entry's "Absorbed the retired" + Maintenance stamp, CONTEXT-BUDGET dated lines 272/314/317, Pair O history clause. `judgment` met
- A3 `grep -qE '^\| `ft-prep-unattended` \| v7\.3\.0 \| `/ft-seed-unattended`' docs/MIGRATION.md` → 0
- A4 GLOSSARY / EXTERNAL-AGENTS read through: seed is the preparer in both. `judgment` met
- A5 `git diff --quiet HEAD -- tools/update-adopters.mjs` → 0; `node --test tools/update-adopters.test.mjs` → 0
- A6 `bash tools/drift-checks.sh` → 0 (re-run after review fixes)
- A7 `git -C ~/Code/natabula log -1 --format=%s` → `chore: file NAT-432 follow-up — seed-prep-merge-mirror` (`bed53df`)

Review (`/code-review medium`, working tree): confirmed clean retirement, 6 guard copies, 11/11 bodies and wrappers, 7 `ln -s` per snippet, and the Codex reconcile parse of the new row. Notes:
1. GLOSSARY header "74 entries" → fixed to 73.
2. GLOSSARY seed entry "remove the gate and it is a report the filers already emit" no longer covers preparations → reworded.
3. CONTEXT-BUDGET v7.2.0-stamped list lost a measured body → restored `ft-prep-unattended 12,334`; the `.4` sentence marks it as history.
4. MIGRATION row hard-codes v7.3.0 before the cut → accepted. The minor was operator-resolved in [[CORE-812.1]] on the `ft-debug` precedent; `/ft-release` corrects the row, the §Step 4.6 note, and this receipt's grep if the cut differs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` updated (subset roster) · `AGENTS.md` updated (utility roster, Five → Four) · `SPEC.md` no change (names no utility slug) · `docs/MIGRATION.md` updated · `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` updated · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` updated · `docs/PLATFORMS.md` updated · `claude/CAPABILITIES.md` no change (no prep row) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` updated (line 63; no stable-surface row names the slug, so no caller-side row owed) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.4` line → stub nested under CORE-EPIC-812, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — N/A

**Final Summary:**

`/ft-prep-unattended` is retired: both bodies are deleted, and no live roster, snippet, contract, or check names it. `docs/MIGRATION.md` has a v7.3.0 retired-table row pointing at `/ft-seed-unattended`. Adopters' Codex links prune automatically, and `/ft-update` Step 4.6 reports the Claude/Cursor/Grok links. By operator decision, `tools/update-adopters.mjs` is unchanged (the `ft-debug` fold precedent). natabula has NAT-432 for its `AGENTS.md` / `templates/AGENTS.md` mirror, committed `bed53df`, not pushed.

Changed: 21 tracked paths (2 deletions, 19 edits) plus flaitron-self's two gitignored links. Verification: A1–A7 → 0; drift self-test 19/19; updater suite 102/102. Review: 0 blockers, 3 notes fixed, 1 accepted. No refactor. `touches:` reconciliation: declared 20, changed 21. The extra path is `tools/drift-checks.test.mjs` (the guard-drift fixture counted seven copies), added to `touches:` during Phase 2. Maintainability: the seed/prep procedure now lives in one body, and the guard set is six. For `.N`: confirm the release cut is a minor so the v7.3.0 row stands, and that no tag ships between `.3` and this commit.

**Archived:** 2026-10-18
