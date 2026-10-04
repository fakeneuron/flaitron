---
title: spec-fence-langtags
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [CORE-073]
---

# CORE-079 | spec-fence-langtags

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-073]]

## 🎯 Goal

Tag SPEC.md's ~10 bare code fences with `text` or `markdown` language identifiers to match the doc-set's existing hygiene standard.

## ✅ Acceptance

- [ ] All bare fences in SPEC.md carry an appropriate language tag (`text` for tree/plain output, `markdown` for grammar, body, and banner examples)
- [ ] No other prose or structure in SPEC.md is changed

## 🧩 Subtasks

- [ ] Read SPEC.md and identify all bare fences (lines cited: 28/86/103/144/187/247/416/424/438/536)
- [ ] Verify each fence's content and assign the correct tag (`text` vs `markdown`)
- [ ] Apply all tags in a single edit pass
- [ ] Verify no accidental surrounding changes

## 🔗 Related

- [[CORE-073]] — audit that surfaced this (Finding #1, Low, 2026-05-10)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All 10 bare fences confirmed at exact cited lines. No scope change needed.

- [x] Read relevant source files
- [x] **Archive skim** — no prior tasknotes touched code-fence language tagging in SPEC.md; no load-bearing findings.
- [x] **Drift check** — lines 28/86/103/144/187/247/416/424/438/536 all confirmed bare. Line numbers match exactly.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Line assignments:
- Line 28 (project tree): `text`
- Line 86 (task-line grammar): `markdown`
- Line 103 (task-line examples): `markdown`
- Line 144 (wikilink examples): `markdown`
- Line 187 (tasknote body shape): `markdown`
- Line 247 (operator-gate banner): `markdown`
- Line 416 (🏁 state-marker): `markdown`
- Line 424 (next-move suggestion): `markdown`
- Line 438 (copy-paste command line): `text`
- Line 536 (completed stub form): `markdown`

No clarifications needed. `text` for plain-text output blocks; `markdown` for all syntax/grammar examples.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing fence style in SPEC.md uses bare fences only; sibling docs (SPEC/*.md) use tagged fences. Extended that tagged pattern here.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Tagged all 10 opening fences in SPEC.md: `text` for lines 28 (project tree) and 438 (copy-paste command); `markdown` for lines 86/103/144/187/247/416/424/536 (grammar, body, banner, and example blocks). Closing fences left bare (standard). Verified with grep.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Doc-only change. No test suite applies. Verified with grep: 10 tagged opening fences, 10 bare closing fences, no bare opening fences remain.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change. SPEC.md: lang tags added, contract content unchanged. docs/MIGRATION.md: no change. claude/CLAUDE-snippet.md: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Tagged all 10 bare code fences in SPEC.md with `text` or `markdown`. No contract content changed.

**Archived:** 2026-05-11
