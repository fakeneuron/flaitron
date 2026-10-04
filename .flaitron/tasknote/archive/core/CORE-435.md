---
title: duplication rationale
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-430.N]
---

# CORE-435 | duplication rationale

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-430.N]]

## 🎯 Goal

Reconcile `docs/CONVENTIONS.md` §Pre-commit hooks and §GitHub Actions CI so the duplication argument is consistent — state why off-machine CI duplication is accepted while same-machine hook duplication is declined.

## ✅ Acceptance

- [x] §GitHub Actions CI names off-machine placement as the reason command duplication is accepted
- [x] §Pre-commit hooks names same-machine placement as the reason hook duplication is declined, with a cross-reference to the CI section
- [x] No apparent contradiction remains between the two sections on "duplicating Phase 3 checks"

## 🧩 Subtasks

- [x] Read `docs/CONVENTIONS.md` §GitHub Actions CI and §Pre-commit hooks plus CORE-430.N F1
- [x] Draft reconciling sentences in both sections (off-machine vs same-machine)
- [x] Verify README/CONTRIBUTING mirrors need no prose change (section names only)
- [x] Phase 4 closure

## 🔗 Related

- [[CORE-430.N]] — audit F1 surfaced this hooks-vs-CI contradiction

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-430.N F1 is still accurate — both sections cite command duplication with opposite verdicts and no reconciling sentence. Doc-only fix; no contract or workflow change.

- [x] Read relevant source files — `docs/CONVENTIONS.md` §GitHub Actions CI (52–56) and §Pre-commit hooks (84–90); `CORE-430.N` F1; README/CONTRIBUTING mirror lines (section-name lists only).

- [x] **Best Practices Review** — N/A (markdown prose only). Match CONVENTIONS voice: short named sections, rationale paragraphs, cross-refs between adheres/declines siblings.

- [x] **Archive skim** — `CORE-430.N` F1 defines the fix shape (off-machine CI vs same-machine hooks). `CORE-433.4` explicitly left F1 to this task. `CORE-434` deferred CONVENTIONS SHA-pin mention here.

- [x] **Drift check** — PLAN line, section headings, and F1 line refs (~88, ~56) still match HEAD. F2 roster wording already fixed by CORE-433.4; out of scope.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Distinction to state:** Phase 3 runs inline in the authoring context. Pre-commit hooks re-run the same checks on that same machine at commit time — they don't catch a skipped gate, they repeat it. GitHub Actions CI runs the identical commands on GitHub-hosted runners after push, catching changes that land without Phase 3 (manual edit, `--fast`, etc.).
- **Approach:** State the distinction in both sections with cross-refs; do not re-argue the hooks decline or soften CI acceptance.
- **Assumptions:** README/CONTRIBUTING need no edit (they list section titles, not duplication rationale). No SPEC contract change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing CONVENTIONS rationale paragraphs; cross-ref pattern matches release automation → PHILOSOPHY and other adheres/declines siblings.

- [x] **Minimal refactor gate** — prose-only; no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown prose only).

**Implementation Notes:**

- §GitHub Actions CI: added two sentences — off-machine placement as why duplication is accepted; pre-commit hook contrast with cross-ref to §Pre-commit hooks.
- §Pre-commit hooks: replaced bare "duplicate at commit time" with same-machine rationale and cross-ref back to §GitHub Actions CI.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only).

- [x] Ran lint/type-check on changed code — N/A (markdown-only).

- [x] **Quality assertions** — no duplication beyond the deliberate cross-ref pair; no stale claims; both sections now state the same underlying rule (off-machine safety net vs same-machine repeat).

- [x] (frontend) N/A — no frontend surface.

**Testing Notes:**

Manual read-through of both sections confirms consistent framing with no remaining contradiction on duplication.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary below.

- [x] Closed — Acceptance ticked; YAML `status:` `completed`; PLAN stub flipped; tasknote archived.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Reconciled CORE-430.N F1: `docs/CONVENTIONS.md` now states that GitHub Actions CI accepts command duplication because it runs off the authoring machine, while pre-commit hooks are declined because they repeat Phase 3 on the same machine. Two short cross-referenced paragraphs; README/CONTRIBUTING unchanged (section-name mirrors only).

**Doc-drift sweep:** `docs/CONVENTIONS.md` — updated (this task). All other `.flowtron/tasknote/README.md` §"AI-referenced docs" entries: no change.

**Archived:** 2026-08-12
