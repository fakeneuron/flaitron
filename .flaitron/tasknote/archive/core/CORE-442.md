---
title: local-stale-audit-docs
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-389]
---

# CORE-442 | local-stale-audit-docs

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-389]]

## 🎯 Goal

Drop the retired `Skill(ft-audit-docs)` allowlist entry from this checkout's gitignored `.claude/settings.local.json`.

## ✅ Acceptance

- [x] `Skill(ft-audit-docs)` absent from `.claude/settings.local.json`
- [x] File remains valid JSON after the edit
- [x] `git status --porcelain` shows no diff from the settings edit (`.claude/` is gitignored per-machine state)

## 🧩 Subtasks

- [x] Read `.claude/settings.local.json` and confirm `Skill(ft-audit-docs)` is present
- [x] Remove the `Skill(ft-audit-docs)` allow entry
- [x] Validate JSON parses cleanly and grep confirms absence
- [x] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-EPIC-389]] — retired `ft-audit-docs` behind parameterized `/ft-audit <domain>`
- [[CORE-394]] — swept dangling `.claude/` symlinks for the same retirement; settings allowlist was left stale

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `ft-audit-docs` was retired in [[CORE-389.3]]; the skill symlink was swept in [[CORE-394]], but this checkout's `.claude/settings.local.json` still granted `Skill(ft-audit-docs)` at line 24. Pure local hygiene — no design tradeoff.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A`. No code or module boundary touched; deleting one stale allowlist entry in a gitignored personal config file.

- [x] **Archive skim** — [[CORE-291]], [[CORE-292]], [[CORE-220]] edited the same file for stale-path pruning; [[CORE-394]] removed dangling `ft-audit-docs` symlinks but explicitly scoped to symlinks only, leaving settings allowlist cleanup for a follow-up (this task).

- [x] **Drift check** — confirmed live: `.claude/settings.local.json` line 24 was `"Skill(ft-audit-docs)"`; `claude/skills/ft-audit-docs/` is gone (retired [[CORE-389.3]]); no other retired audit-domain skill permissions remained in the file.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: drop only `Skill(ft-audit-docs)`; do not add `Skill(ft-audit)` unless the operator asks.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Live file had 38 allow entries (post-[[CORE-292]] prune). Stale entry: `"Skill(ft-audit-docs)"` at line 24. No `ft-debug`, `ft-quality`, or other retired audit-domain skill permissions present.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed [[CORE-291]]/[[CORE-292]] parse-filter-re-emit precedent for settings.local.json hygiene; no new shape needed.

- [x] **Minimal refactor gate** — `N/A`, no refactor; single-line deletion only.

- [x] Implemented the minimal solution — removed `"Skill(ft-audit-docs)",` from the `allow` array (38→37 entries).

- [x] Updated/added tests for non-trivial behavior — `N/A`, settings file not test-bearing.

**Implementation Notes:**

Single-line deletion in `.claude/settings.local.json`. Replacement skill is `/ft-audit docs` (subroutine form per [[CORE-389.2]]); not added to allowlist — operator can grant `Skill(ft-audit)` if needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no test-bearing code touched

- [x] Ran lint/type-check on changed code — `N/A`, same reason

- [x] **Quality assertions** — `python3 -c "import json; json.load(...)"` passes; `grep ft-audit-docs` returns nothing; `git status --porcelain` shows no diff from the settings edit (only untracked tasknote before closure staging).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

**Testing Notes:**

`python3 -c "import json; json.load(open('.claude/settings.local.json'))"` → JSON OK. `grep -q ft-audit-docs` → absent.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 15 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs": **no change** (only gitignored `.claude/settings.local.json` touched; retirement docs already handled by [[CORE-389.3]]/[[CORE-389.4]]).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Removed the stale `Skill(ft-audit-docs)` allowlist entry from this checkout's gitignored `.claude/settings.local.json` — the last local remnant of the [[CORE-389.3]] retirement that [[CORE-394]]'s symlink sweep did not cover.

**Changed:** 1 gitignored file edited (`.claude/settings.local.json`, 38→37 allow entries, −1 rule). Tracked deliverables: archived tasknote + PLAN.md flip only.

**Verification:** JSON validates clean; `ft-audit-docs` absent from allowlist; `git status --porcelain` shows zero diff from the settings edit.

**Refactors:** none — mechanical deletion only.

**Archived:** 2026-08-12
