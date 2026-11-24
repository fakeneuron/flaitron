---
title: entry-docs
status: completed
tags: [refactor, updater, docs]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/*.mjs
  - SECURITY.md
  - SPEC/layout.md
  - SPEC/scope-boundaries.md
  - README.md
  - .flaitron/audit-overlay/SKILL.md
  - claude/skills/ft-update/SKILL.md
blocked-by:
  - CORE-931.7
---

# CORE-931.8 | entry-docs

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-931]]

## 🎯 Goal

Split `tools/update-adopters.mjs`'s 193-line header so each section sits on the module that holds its code. The entry keeps usage, selection, `--accept-migration`, the submodule-path rule, exit codes, "Not covered" and a one-line-per-module map. Repoint the docs that name the updater's internals (SECURITY.md, `SPEC/layout.md`, `SPEC/scope-boundaries.md`, README, the audit overlay's `performance:` scope). Comments and docs only; no code change.

## ✅ Acceptance

- [x] Code unchanged — `git diff --stat` shows comment-only hunks in `tools/`; `node --test tools/update-adopters.test.mjs`
- [x] Docs — `bash tools/drift-checks.sh`
- [x] Every changed `tools/` line is a comment or blank — `git diff -U0 -- tools/ | grep -E '^[+-]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[+-]\s*(//.*)?$'` prints nothing
- [x] Syntax — `node --check tools/update-adopters.mjs && for f in tools/update-adopters/*.mjs; do node --check "$f"; done`
- [x] No module still defers its contract to the entry header — `! grep -n "contract in ../update-adopters.mjs's header" tools/update-adopters/*.mjs` (and the `"Commit contract" in ../update-adopters.mjs's header` pointer in `apply.mjs` points to its own header)
- [x] Doc pointers repointed — `grep -q 'git()\` in \`tools/update-adopters/release.mjs' SECURITY.md && grep -q 'tools/update-adopters/' SPEC/layout.md && grep -q 'tools/update-adopters/' README.md && grep -q 'tools/update-adopters/' SPEC/scope-boundaries.md && grep -q '`performance:` `viz/src/\*\*` · `tools/update-adopters\*`' .flaitron/audit-overlay/SKILL.md`
- [x] Every header section lands on exactly one file, with no prose dropped — `judgment`: a side-by-side read of the old header against the new homes; only the cross-references are reworded

## 🧩 Subtasks

- [x] Entry header: keep intro, Usage, Selection, `--accept-migration`, Submodule path, Exit codes, Not covered; add the module map; repoint "(below)" cross-refs to module names
- [x] `check.mjs`: take the per-adopter safety gates and gitlink-drift sections; drop the "contract in" pointer; repoint the "Skill wiring" / "Audit forks" "below" refs to `wiring.mjs`
- [x] `apply.mjs`: take Follow-through, Mid-bump rollback and Commit contract; repoint l.187's `"Commit contract"` pointer to the header above
- [x] `wiring.mjs`: take Skill wiring and Audit forks; repoint their "(above)" gate refs to `check.mjs`
- [x] `release.mjs`: take Retired migrations
- [x] `text.mjs` / `workspace.mjs`: repoint the one-line pointer to where their contract now lives
- [x] Docs: SECURITY.md `git()` → `release.mjs`; `SPEC/layout.md` and README `tools/` lines name the module directory; `SPEC/scope-boundaries.md` carve-out clause; overlay `performance:` scope → `tools/update-adopters*`
- [x] Run the Acceptance commands

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic (updater-modules)
- [[CORE-931.7]] — `blocked-by:` predecessor (apply-module; landed `adb80fb9`)
- [[CORE-EPIC-919]] — the overlay's hand-copied figures; this step touches only its `performance:` scope line

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-931.2–.7 all landed. Every module still opens with "contract in ../update-adopters.mjs's header", and that header still describes code that now lives in five other files. The doc pointers (SECURITY.md:283 `git()`, the layout/README `tools/` lines) were each deferred here by name.

- [x] Read relevant source files — the entry header (l.1–193) and import/re-export block; each module's first lines; `apply.mjs:187`; SECURITY.md §"Fleet updater (`tools/`)"; `SPEC/scope-boundaries.md` §"What flaitron does NOT provide"; SPEC.md's carve-out paragraph (l.758); `SPEC/layout.md:55`; README:330; overlay l.59–63.

- [x] **Best Practices Review** — module-boundary docs: each module documents what it does (the locked "beside its code" decision). The entry stays the CLI contract plus a map, so a reader starting at the CLI still finds every section in one hop. No code-boundary change.

- [x] **Archive skim** — area `core` confirmed against the README table (`CORE-*` → `archive/core/`). Load-bearing hits: CORE-931.2 (the "Interim header" decision: module pointers are interim until .8; SECURITY.md:283 deferred here), CORE-931.3 (`SPEC/layout.md` entry deferred here), CORE-931.4–.7 (the module-map and doc repoints deferred here; .7 repointed `apply.mjs:187` to the entry header). No other hit bears on header text.

- [x] **Drift check** — the starter's cited paths and surfaces match current code: header l.2–193, all six modules carry the "contract in" pointer on l.1, SECURITY.md:283 is the only doc line naming an updater function's file, and README:330 / `SPEC/layout.md:55` are the `tools/` lines. The plan matches its PLAN.md line. One addition: `SPEC/scope-boundaries.md` joins `touches:` per the carve-out decision below.

- [x] Asked clarifying questions — carve-out: the operator chose one clause in `SPEC/scope-boundaries.md` ("with its modules under `tools/update-adopters/`"); SPEC.md unchanged (it points to scope-boundaries as canonical). `scope-boundaries.md` carries no byte cap (lazy-module roster in `docs/CONTEXT-BUDGET.md` is informational). Assumptions: `text.mjs` and `workspace.mjs` get no moved section (none of the header's sections is theirs) — only their pointer is repointed; the overlay's narrow `(fleet sweep)` example changes along with the `all` fallback, both to `tools/update-adopters*`.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

The starter context was absorbed into the spec sections above; the original is in git history (`f9a25f68`). Its out-of-scope list stands: the `node --check` roster in AGENTS.md, `justfile` and `ci.yml` (Pair H, locked by CORE-931.2), and the four AGENTS-snippets' "parsed by `tools/update-adopters.mjs`" (still true through the entry).

Baseline `bash tools/drift-checks.sh`: all checks ok; six pre-existing NEAR CAP lines (CORE-EPIC-920's scope), none on a file this task touches.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — kept the 931.2–.7 one-line module header as each file's line 1, minus its "contract in" pointer; the moved sections follow it as a `//` block, each separated by a bare `//` line, as in the entry.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — no refactor; comments and docs only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no code changed; the suite runs as the behavior-unchanged check.

**Implementation Notes:**

- Sections were cut from the entry's l.54–184 by `sed -n` ranges and prepended after each module's line 1, so the prose moved byte-for-byte: `check.mjs` ← safety gates + gitlink drift (both paragraphs); `apply.mjs` ← Follow-through, Mid-bump rollback, Commit contract; `wiring.mjs` ← Skill wiring, Audit forks; `release.mjs` ← Retired migrations. The entry (193 → 72 header lines) keeps intro, Usage, Selection, `--accept-migration`, Submodule path, Exit codes and Not covered, and gains a six-line module map.
- Cross-reference rewording only: the entry's "(below)" → "(apply.mjs)", and Not covered's "(skipped above)/(noted above)" → `check.mjs`/`wiring.mjs`. In `check.mjs`, "follow-through below" → "(apply.mjs)", and the "Skill wiring"/"Audit forks" "below" → "in wiring.mjs". `wiring.mjs`'s "(above)" → "(a check.mjs gate)". `apply.mjs:226` points to "this module's header". In `release.mjs`, "once ran here" → "in the updater". `text.mjs`/`workspace.mjs` line 1 now point to where their rules live (apply's Follow-through + wiring's Skill wiring; the entry's submodule-path rule).
- Docs: SECURITY.md `git()` → `tools/update-adopters/release.mjs`; `SPEC/layout.md` and README `tools/` lines name the module directory; `SPEC/scope-boundaries.md` carve-out gains "(with its modules under `tools/update-adopters/`)"; overlay `performance:` scope → `tools/update-adopters*` (fallback and the fleet-sweep example).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (124/124)

- [x] Ran lint/type-check on changed code — `node --check` on entry + six modules + test file; no lint configured for `tools/`

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason) — see Testing Notes

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — `/code-review medium` over this task's uncommitted diff: 0 blockers, 4 notes (below)

- [x] (frontend) N/A — no rendered surface. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `node --test tools/update-adopters.test.mjs` → 0 (124 pass, 0 fail); `git diff --stat` touches only header comments in `tools/` (see A3)
- A2 `bash tools/drift-checks.sh` → 0 (the six pre-existing NEAR CAP lines only)
- A3 comment-only filter over `git diff -U0 -- tools/` → printed nothing
- A4 `node --check` on the entry + all six modules → 0; `node --check tools/update-adopters.test.mjs` → 0
- A5 `! grep -n "contract in ../update-adopters.mjs's header" tools/update-adopters/*.mjs` → 0
- A6 doc-pointer greps → 0
- External review (`/code-review medium`, this task's diff only): code moves graded byte-identical; 4 notes. **Fixed:** (1) overlay l.77 sacred invariant 3 → `tools/update-adopters*` and "`tools/update-adopters/check.mjs`'s header"; (2) `claude/skills/ft-update/SKILL.md:153` Step 3.5 pointer → `tools/update-adopters/apply.mjs`, "Follow-through" (added to `touches:`); (3) SECURITY.md no-push bullet → "anywhere in `tools/update-adopters.mjs` or its modules under `tools/update-adopters/`". **Filed:** (4) the Node ≥20 guard now runs after the six static imports load: a code change from 931.2–.7, outside this comment-only task → [[CORE-935]] park (`f3224d45`). `bash tools/drift-checks.sh` → 0 after the fixes.
- A7 judgment: `comm -23` of the old header's unique `//` lines against every `//` line in the entry + modules leaves exactly the 8 deliberately reworded cross-reference lines; no other prose lost.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update — `README.md` and `SECURITY.md`: updated in this task (`tools/` line; `git()` and no-push pointers). `SPEC.md`: no change (operator decision; scope-boundaries is canonical). `AGENTS.md`: no change (validation roster locked by CORE-931.2). The four AGENTS-snippets and `docs/MIGRATION.md:576` name the CLI path, still true through the entry: no change. Every other entry: no change (no updater reference).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — N/A: the module map in the entry header is the discoverable index; AGENTS.md needs no pointer.

**Final Summary:**

Split the updater's 193-line header so each section sits on the module that holds its code. `check.mjs` took the safety gates and gitlink drift; `apply.mjs` took Follow-through, Mid-bump rollback and Commit contract; `wiring.mjs` took Skill wiring and Audit forks; `release.mjs` took Retired migrations. The entry kept the CLI contract and gained a module map. Doc pointers were repointed (SECURITY.md ×2, `SPEC/layout.md`, README, `SPEC/scope-boundaries.md` carve-out clause, the audit overlay ×2, `ft-update` Step 3.5).

- **Changed files:** `tools/update-adopters.mjs`, `tools/update-adopters/{apply,check,release,text,wiring,workspace}.mjs` (comments only), `SECURITY.md`, `SPEC/layout.md`, `SPEC/scope-boundaries.md`, `README.md`, `.flaitron/audit-overlay/SKILL.md`, `claude/skills/ft-update/SKILL.md`.
- **Verification:** suite 124/124; `node --check` ×8 → 0; comment-only diff filter → empty; drift checks → 0; header-line `comm` → only the 8 reworded cross-references.
- **Refactors:** none.
- **Doc verdict:** see the doc-drift sweep box.
- **`touches:` reconciliation:** `git diff --name-only` matches the declared set (the `ft-update` skill was added at the External review fix; `SPEC/scope-boundaries.md` at Discovery).
- **Maintainability:** a reader landing in any module now reads that module's contract in place; the entry's header dropped from 193 to 72 lines.
- **Follow-up:** [[CORE-935]] (Node-guard order, parked Low).

**Archived:** 2026-11-24
