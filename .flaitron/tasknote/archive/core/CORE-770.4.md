---
title: project-20-v7-handoff
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-770, CORE-770.1, CORE-769.7]
touches:
  - .flaitron/PLAN.md
parallel-safe-with:
  - CORE-770.2
  - CORE-770.3
---

# CORE-770.4 | project-20-v7-handoff

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-770]]

## 🎯 Goal

File two project-20 PLAN rows (cross-repo remit) for the v7 gaps CORE-770.1 found: the retired-command-stub preconditions, and the NAT-195 hook's false positives.

## ✅ Acceptance

- [x] Row for the retired `.claude/commands/ft-task.md` stub filed in project-20 `.flaitron/PLAN.md`, naming `project-20-init`, `project-20-adopt` and `docs/CLAUDE-LAYERING.md` — `grep -c 'commands/ft-task' ~/code/project-20/.flaitron/PLAN.md` ≥ 1
- [x] Row for the NAT-195 hook false positives filed, naming the relative `ln -s` case and the two evidence cases — `grep -c 'guard-path-access' ~/code/project-20/.flaitron/PLAN.md` ≥ 1
- [x] Each row ≤ 50 words in its description (70w hard cap) — `wc -w` per row
- [x] project-20 commit contains only `.flaitron/PLAN.md` — `git -C ~/code/project-20 show --stat --format= HEAD`
- [x] Doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs": no change or the update — `judgment`: reading each entry

## 🧩 Subtasks

- [x] Re-verify each cited project-20 claim against live files (drift check)
- [x] Draft the two rows; word-count each
- [x] Append them under `## High` in project-20's PLAN.md after NAT-391 (NAT-392, NAT-393); commit in project-20 (NAT-391 precedent)
- [x] Phase 4: doc-drift sweep, flip `.4` PLAN line to stub form, archive, commit

## 🔗 Related

- [[CORE-770.1]] — Discovery that found these (Discovery Notes §C)
- [[CORE-769.7]] — filed NAT-391, the rename-only row these two complement
- [[CORE-EPIC-770]] — parent epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` scoped this as a cross-repo filing; nothing in flaitron changed since. SPEC §"Cross-repo edit remit" says to file in the target repo rather than edit it from this cycle.

- [x] Read relevant source files — `.1` archived note; project-20 `.claude/skills/project-20-init/SKILL.md`, `project-20-adopt/SKILL.md`, `docs/CLAUDE-LAYERING.md`, `.flaitron/PLAN.md`, `scripts/guard-path-access.sh` (grep)

- [x] **Best Practices Review** — `N/A`: PLAN filing, no code or module boundary

- [x] **Archive skim** — `archive/core/` (README table row `CORE-*` → `archive/core/`): CORE-770.1 (source of the findings) and CORE-769.7 (NAT-391 precedent: one-file PLAN commit in project-20)

- [x] **Drift check** — all three claims hold in project-20 at `e6f66a6`: `project-20-init/SKILL.md:20` requires `.claude/commands/ft-task.md` and points at `/ft-new-project`; `project-20-adopt/SKILL.md:20` lists it in the not-adopted detector; `docs/CLAUDE-LAYERING.md:135` describes `.claude/commands/ft-*.md`. Highest filed ID is NAT-391 → next are NAT-392, NAT-393. A third hook false positive occurred in this very session (see Notes).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: rows go under `## High` beside NAT-391 (the init break is a hard stop on every v7 repo); models `[light]` for the doc/skill fix, `[medium]` for the hook (security-sensitive, needs tests); commit in project-20 follows the NAT-391 precedent.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Hook evidence, for the NAT-393 row: this session a `grep -rn … | grep -v '/archive/\|node_modules\|\.flaitron/core'` was blocked, the guard reading the `-v` pattern as a path rooted at `/archive/…`. That is the third misread alongside `.1`'s `~/.claude` grep regex and `sed -n '/CORE-EPIC-770/p'` address.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the NAT-391 filing precedent (CORE-769.7): one-file PLAN commit in project-20, `filed by flaitron CORE-<ID>` tail

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: PLAN filing only

**Implementation Notes:**

- Filed in project-20 `.flaitron/PLAN.md` under `## High` after NAT-391, commit `33452cb` (one file, +2 lines, local only — not pushed):
  - **NAT-392** `[light]` v7-no-command-stubs (43w): drop the `.claude/commands/ft-task.md` precondition from `project-20-init` and `project-20-adopt`'s detector, fix `docs/CLAUDE-LAYERING.md`; lands with NAT-391.
  - **NAT-393** `[medium]` nat195-symlink-false-positive (49w): the relative `ln -s` climb misread plus three evidence cases.
- **Downstream impact:** none. Neither row changes a flaitron contract; `.2` and `.3` touch disjoint files.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — Acceptance commands recorded in Testing Notes; `N/A` for code quality assertions (no code)

- [x] **External review** — `N/A`: the diff is two PLAN rows in another repo, 2 lines (too small to grade; CORE-770.1 precedent)

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -c 'commands/ft-task' project-20/.flaitron/PLAN.md   → 1
grep -c 'guard-path-access' project-20/.flaitron/PLAN.md  → 1
wc -w NAT-392 / NAT-393 descriptions                    → 43 / 49 (≤50w)
git -C project-20 show --stat --format= HEAD              → .flaitron/PLAN.md | 2 ++ (only file)
bash tools/drift-checks.sh                              → 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs": no change for every entry; the deliverable is two rows in project-20's PLAN, and no flaitron doc cites them

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A`

**Final Summary:**

Two project-20 rows are filed, so project-20's v7 bump now has everything it needs:
- **NAT-392**: `project-20-init` hard-stops on every v7-adopted repo over the retired `.claude/commands/ft-task.md`; same stub in `project-20-adopt`'s detector and `docs/CLAUDE-LAYERING.md`.
- **NAT-393**: the NAT-195 hook reads relative `ln -s` targets and quoted patterns as path climbs.

- **Changed files (flaitron):** `.flaitron/PLAN.md` (`.4` stub) and this note. **project-20:** `.flaitron/PLAN.md` (+2 rows, commit `33452cb`, unpushed).
- **Verification:** all four Acceptance commands pass; drift checks → 0.
- **Refactors:** none. **Docs verdict:** no change.
- **`touches:` reconciliation:** declared `.flaitron/PLAN.md`; changed that plus this note (excluded). project-20's file is outside this repo by design (cross-repo remit).
- **Maintainability:** work stays with its owner; project-20's own `/ft-task` cycle executes the rows.

**Archived:** 2026-10-09
