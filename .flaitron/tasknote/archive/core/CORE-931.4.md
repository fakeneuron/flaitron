---
title: text-module
status: completed
tags: [refactor, updater]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-931, CORE-931.3, CORE-930, CORE-921]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/text.mjs
blocked-by:
  - CORE-931.3
---

# CORE-931.4 | text-module

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-931]] [[CORE-931.3]] [[CORE-930]] [[CORE-921]]

## 🎯 Goal

Move the updater's pure markdown helpers into `tools/update-adopters/text.mjs`,
behavior-preserving, behind the entry's unchanged export set, with the fence and
workflow-block fixture cases still pinning them through the entry.

## ✅ Acceptance

- [x] Suite incl. fence + workflow-block fixture cases — `node --test tools/update-adopters.test.mjs`
- [x] Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/text.mjs`
- [x] Entry export set unchanged (CORE-931.2's pin) — `node --test --test-name-pattern='entry facade' tools/update-adopters.test.mjs`
- [x] `text.mjs` stays pure — no git, no fs — `! grep -nE "node:fs|release.mjs|git\(" tools/update-adopters/text.mjs`
- [x] The move is behavior-preserving: no function body changes beyond imports and the `export` keyword on `PIN_LINE` — `judgment` (`git diff` shows moves, and the External review confirms it)
- [x] CI drift checks hold — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Create `tools/update-adopters/text.mjs` with the moved code and its comments (`PIN_LINE` exported, `WORKFLOW_HEADING`, `SECTION_END`, `FENCE`, `fenceOpeners`, `headingLines`, `workflowHeadings`, `rewritePinLines`, `workflowPasteBlock`, `replaceWorkflowSection`, `workflowFollowThrough`, `snippetLinks`, `codexRoster`), importing only `SUBMODULE_PATH` from `workspace.mjs`; a one-line header pointing at the entry's contract
- [x] Rewire the entry: drop the moved code, import `PIN_LINE` and the five names it still calls, re-export the six public names; `cachedWorkflowBlock` stays
- [x] Run the suite, the `node --check` pair, the purity grep and the drift checks

## 🔗 Related

- [[CORE-EPIC-931]] — parent epic (updater-modules)
- [[CORE-931.3]] — predecessor (workspace-module); `blocked-by:`, closed
- [[CORE-930]] — same function, independent behaviour fix (fence/CRLF); either order
- [[CORE-921]] — related-decision: the workflow-block fixture owns the bytes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `tools/update-adopters/` holds `release.mjs` and `workspace.mjs` (CORE-931.2/.3 closed), and every symbol the starter names sits in the entry at the cited shape. CORE-930 has not landed, so `workflowPasteBlock` moves as it stands.

- [x] Read relevant source files — the entry's header, import block and re-export, `snippetLinks`/`codexRoster`, the fence-and-workflow block, `cachedWorkflowBlock`, `wiringPlan`'s callers, `workspace.mjs`, and the entry-facade test.

- [x] **Best Practices Review** — `text.mjs` is a leaf over `workspace.mjs` (`SUBMODULE_PATH` only) with no back-import to the entry, so the dependency direction is one-way. `headingLines`, `workflowHeadings`, `replaceWorkflowSection` and the three regex constants have no entry caller, so they stay module-private. `PIN_LINE` is the one non-function export: the entry's `PIN_LINE.test(text)` follow-through guard reads it.

- [x] **Archive skim** — `archive/core/` hits on the moved names: CORE-921 (the workflow-block fixture owns the byte contract, which is why the move changes no body), CORE-922 (the fence rules pinned by `SPEC/fixtures/fence/cases.json`), CORE-853 and CORE-916 (heading-fence and section-end rules, carried by the code's own comments). CORE-931.3 set the module-and-facade shape this move repeats.

- [x] **Drift check** — Starter matches the code and PLAN.md line. One refinement: `PIN_LINE` is exported from `text.mjs`, since the entry's follow-through (`PIN_LINE.test(text)`) still reads it. `TASKNOTE_README` / `AGENTS_MD` stay in the entry (path constants, not text helpers). No change to the plan.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumptions: the existing fixture-driven tests (fence, workflow-block) pin these seams through the entry, so no new pins are added; the entry re-exports the six public names so the export set is unchanged.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-931.2/.3's shape: a leaf module with a one-line header, entry import for in-entry callers, bottom re-export for the public names.

- [x] **Minimal refactor gate** — no refactor beyond the move; CORE-930's fence/CRLF fix stays out.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: the existing fence and workflow-block fixture cases pin these functions through the entry.

**Implementation Notes:**

Extracted the line ranges with `sed` so the moved bytes are untouched; a sorted line diff of removed-versus-added shows `PIN_LINE`'s `export` keyword as the only change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` pair (the updater has no lint or typecheck step); viz untouched.

- [x] **Verification receipt** — see Testing Notes. Changed code free of duplication, dead code and stale docs: the entry's header still describes the code it holds; the module-map doc repoints are CORE-931.8.

- [x] **External review** — see Testing Notes.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface.

**Testing Notes:**

```text
node --test tools/update-adopters.test.mjs                                    → 0 (124 pass, 0 fail)
node --check tools/update-adopters.mjs && node --check tools/update-adopters/text.mjs → 0
entry facade (inside the suite above)                                         → pass
grep purity on text.mjs                                                       → exit 1 (no match, as required)
bash tools/drift-checks.sh                                                    → 0
```

External review: `/code-review medium` over this task's own diff (`tools/update-adopters.mjs` + new `text.mjs`) → no findings. It confirmed each moved body matches its deleted original line for line (only the `export` on `PIN_LINE` is new), no dangling reference in the entry, the re-exported name set equals the old public set, and no import cycle (`text.mjs` → `workspace.mjs` → `release.mjs`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change. No swept doc names the moved helpers' location; the module-map and doc repoints are CORE-931.8's.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: nothing new for the always-loaded layer.

**Final Summary:**

Moved the updater's pure markdown helpers (`PIN_LINE`, the fence scan, Workflow-block and pin-line rewrites, `snippetLinks`, `codexRoster`) into `tools/update-adopters/text.mjs`; the entry imports what it calls and re-exports the six public names. Files: `tools/update-adopters.mjs` (+16/−134), `tools/update-adopters/text.mjs` (new, 138 lines) — all within declared `touches:`. Suite 124/124, `node --check` pair, purity grep and drift checks green; External review found nothing. No refactor beyond the move; CORE-930 stays separate. Maintainability: the entry sheds its fence/Workflow text code, and the leaf module is pure and fixture-pinned.

**Archived:** 2026-11-24
