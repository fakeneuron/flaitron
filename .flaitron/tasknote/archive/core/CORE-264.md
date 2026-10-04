---
title: flowtron-dir-rename
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: []
---

# CORE-264 | flowtron-dir-rename

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Rename `_project/` → `.flowtron/` and the submodule path `_project/flowtron/` → `.flowtron/core/` across all source, docs, skills, commands, templates, and TypeScript.

## ✅ Acceptance

- [ ] `_project/` directory on disk renamed to `.flowtron/`
- [ ] `viz/src/workspace.ts` hardcoded paths updated to `.flowtron/`
- [ ] All docs, SPEC files, skills, commands, and templates updated (`_project/flowtron/` → `.flowtron/core/`, `_project/` → `.flowtron/`)
- [ ] `docs/MIGRATION.md` adoption instructions updated (submodule setup command, all path refs)
- [ ] `viz` test suite passes after path changes
- [ ] Archive tasknotes untouched (historical records)

## 🧩 Subtasks

- [ ] 1. `git mv _project .flowtron` on disk
- [ ] 2. Update `viz/src/workspace.ts` hardcoded paths
- [ ] 3. Update `viz/src/*.test.ts` and fixture files
- [ ] 4. Global find-and-replace across all live source: `_project/flowtron/` → `.flowtron/core/`, then `_project/` → `.flowtron/`
- [ ] 5. Run `npm --prefix viz run typecheck` and `npm --prefix viz test`
- [ ] 6. Verify no `_project` references remain in live source (excluding archive)

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Design decision confirmed (Option A: `.flowtron/` dotfolder). Scope is a straightforward rename + find-and-replace.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope

- [x] **Drift check** — file paths, line numbers, function names cited still match current code

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Archive skim: CORE-004/005/006/007/008/010/011/012/018/020 touch `_project/` but only as bootstrap/migration records — no load-bearing decisions to preserve. This rename supersedes them.
- `workspace.ts:56` has `entry.name.startsWith('.')` guard that skips dotdirs at the workspace root (e.g. `~/code/`). This correctly does NOT affect `.flowtron/` inside a project dir — unrelated, no change needed.
- `workspace.ts:60`: the flowtron spec path changes from `_project/flowtron/SPEC.md` → `.flowtron/core/SPEC.md` for adopting projects.
- `viz/src/test/fixtures.ts:26`: hardcoded `/_project/tasknote/` path in `makeTasknote` default — needs updating.
- `archiveCache.test.ts:23` and `devApi.test.ts:96,113-115`: hardcoded `_project` paths in test helpers.
- `docs/MIGRATION.md`: `mkdir -p _project` → `mkdir -p .flowtron` (harmless to keep; creates dir before submodule add).
- Archive tasknote content: left as historical records; internal `_project` refs remain as-is.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `workspace.ts` pattern is self-contained; Edit tool with replace_all=true for TS files, bulk sed for markdown.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `git mv _project .flowtron` moves everything atomically.
- `workspace.ts`: 4 path strings updated (`_project` → `.flowtron`, `flowtron` segment → `core`).
- `workspace.test.ts`, `archiveCache.test.ts`, `devApi.test.ts`, `test/fixtures.ts`: `replace_all=true` for `_project` → `.flowtron`.
- Bulk sed (two passes: `_project/flowtron/` → `.flowtron/core/`, then `_project/` → `.flowtron/`) on ~70 live markdown files. One manual fix: `--exclude-dir=_project` grep example in `docs/MIGRATION.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz run typecheck` — clean.
- `npm --prefix viz test -- --run` — 172/172 passed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs checked; 8 updated (had `_project` refs), 3 no-change (AGENT-NEUTRALITY, AGENT-COMPAT, CAPABILITIES).

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted

**Final Summary:**

Renamed `_project/` → `.flowtron/` across the entire repo: directory on disk (`git mv`), `viz/src/workspace.ts` hardcoded paths, 5 TypeScript test/fixture files, and ~70 markdown files (docs, SPEC, skills, commands, templates). The submodule path convention also updated from `_project/flowtron/` → `.flowtron/core/`. 172/172 tests pass.

**Archived:** 2026-06-01
