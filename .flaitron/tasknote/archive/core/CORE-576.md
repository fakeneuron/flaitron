---
title: Stale spec draft cleanup
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-EPIC-352, CORE-570, CORE-573]
touches:
  - .flowtron/specs/spec-to-work-handoff.md
---

# CORE-576 | Stale spec draft cleanup

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-352]]

## 🎯 Goal

Resolve the stale `status: draft` on `.flowtron/specs/spec-to-work-handoff.md` — the only file in `.flowtron/specs/`, whose parent epic closed the same day it was drafted and which cites two now-retired skills (`/ft-spec`, `/ft-starter-task`) — by deleting it or marking it `status: superseded`.

## ✅ Acceptance

- [x] `.flowtron/specs/spec-to-work-handoff.md` no longer claims `status: draft` — `grep -q "status: draft" .flowtron/specs/spec-to-work-handoff.md` exits non-zero, or the file is deleted (`judgment` — decided in Discovery)
- [x] No dangling reference to the file's old status/content elsewhere — `judgment` (grep for cross-references, confirm nothing else claims this spec is an active draft)

## 🧩 Subtasks

- [x] Decide delete vs. `status: superseded` per prior-precedent findings
- [x] Apply the chosen edit to `.flowtron/specs/spec-to-work-handoff.md`
- [x] Re-check cross-references for drift

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic that produced the spec (closed 2026-07-12, same day)
- [[CORE-570]] — prior task that deliberately left this file alone as "a historical spec"
- [[CORE-573]] — prior task that deliberately left this file alone as "project data"

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The file still exists exactly as described, still says `status: draft`, and still cites `/ft-spec` and `/ft-starter-task`, both absent from the current skill roster (confirmed against the live skills listing) — the task's premise holds.

- [x] Read relevant source files — read `.flowtron/specs/spec-to-work-handoff.md` in full; confirmed via the live skill roster that `/ft-spec` and `/ft-starter-task` are not present (retired).

- [x] **Best Practices Review** — N/A (single-file markdown status/content edit, no code/module-boundary work).

- [x] **Archive skim** — `grep -rl spec-to-work-handoff .flowtron/tasknote/archive/core/` hit four notes: `CORE-570.md`, `CORE-573.md`, `CORE-352.N.md`, `CORE-352.5.md`. The load-bearing finding: **CORE-570 and CORE-573 each independently and deliberately decided to leave this file untouched**, calling it "a historical spec" / "project data" that "stays as written" / "names the skill as history." Neither prior task treated "cites a retired skill" as grounds to delete it — both treated the file as a historical record of what `/ft-spec` produced, which is itself part of `/ft-spec`'s own retirement story. CORE-352.5/.N record that the file was the actual dogfood output of `/ft-spec`, i.e. evidence the skill once worked, not just idle scratch.

- [x] **Drift check** — PLAN.md line matches current repo state exactly (only spec in dir, `status: draft` since 2026-07-12, parent epic closed same day, cites the two retired skills). No SPEC contract governs `.flowtron/specs/` status transitions directly; `SPEC/superseded-claims.md` covers *tasknote* factual corrections (not applicable — this is a spec file, and nothing in it is factually false, it's just stale/superseded by retirement). No contradiction found, but the PLAN task's premise ("residue" worth cleaning) sits in tension with two prior deliberate "leave alone" calls — resolved as a Proceed, not a Re-scope: those calls were scoped to *other* tasks not touching this file, not a standing decision that the file must never change. This task is the first one actually scoped to it.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumptions: (1) given the two prior deliberate "leave it as historical record" calls, **mark `status: superseded` rather than delete** — this resolves the "cites retired skills" staleness the audit flagged while preserving the file as history (consistent with prior precedent and the codebase's general supersede-over-delete convention); (2) add a one-line note under the frontmatter naming why it's superseded and pointing at the retirement, so a future reader isn't left guessing; (3) `related-tasks:` on this tasknote cites CORE-570/CORE-573 for traceability even though they're historical precedent, not blockers.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:** Two prior tasknotes (CORE-570, CORE-573) explicitly and independently chose to leave `spec-to-work-handoff.md` untouched, valuing it as a historical record (it's the actual `/ft-spec` dogfood output per CORE-352.5/.N). This task doesn't overturn that judgment about the file's historical value — it resolves the narrower, PLAN-filed complaint that the frontmatter still claims an active `status: draft` for a spec whose consuming skills are gone. Verdict: mark `status: superseded`, keep the body intact, add a short pointer explaining why.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, single-file frontmatter edit

- [x] **Minimal refactor gate** — N/A

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no code)

**Implementation Notes:** Flipped `status: draft` → `status: superseded` in `.flowtron/specs/spec-to-work-handoff.md` frontmatter; added a 3-line blockquote under the frontmatter naming the supersession date, why (`/ft-spec` and `/ft-starter-task` retired), and pointing to `[[CORE-352.5]]` for the file's historical provenance. Body left otherwise untouched, per the archive-skim finding that two prior tasks valued it as a historical record.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only)

- [x] **Verification receipt** — `grep -q "status: draft" .flowtron/specs/spec-to-work-handoff.md` → exit 1 (no match; criterion met). Cross-reference sweep: `grep -rn "spec-to-work-handoff"` outside `.flowtron/tasknote/archive/` returns only PLAN.md's own task-line description and this tasknote's text (both describing the *prior* state as history, not asserting it's still draft) — no dangling reference. No avoidable duplication/dead code/stale docs introduced (markdown-only edit).

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change

**Testing Notes:** Both acceptance criteria verified by grep as recorded above; no code paths touched, no test suite applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change to any of the ~20 listed docs; none reference `.flowtron/specs/spec-to-work-handoff.md`'s content or status, so nothing in the swept set drifted.

- [x] Closed — every Acceptance criterion ticked; `status:` flipped to `completed` below; PLAN.md line flipped to stub form and placed at top of `## Completed` (standalone task); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:** Flipped `.flowtron/specs/spec-to-work-handoff.md` frontmatter `status: draft` → `status: superseded` and added a 3-line blockquote naming the 2026-09-12 supersession date, the reason (`/ft-spec` and `/ft-starter-task` retired), and a pointer to `[[CORE-352.5]]` for provenance. Chose supersede-over-delete after the archive skim surfaced two prior tasknotes (CORE-570, CORE-573) that independently and deliberately kept this file as a historical record — deleting it would have discarded that record; superseding resolves the PLAN-filed "stale draft" complaint while preserving it. 1 file changed (markdown-only, ~4 lines added, 1 line changed). Verified: `grep -q "status: draft" .flowtron/specs/spec-to-work-handoff.md` → exit 1; repo-wide grep for dangling references outside the archive found only historical mentions in PLAN.md and this tasknote. No tests/lint applicable (no code touched). `touches:` reconciliation: declared `.flowtron/specs/spec-to-work-handoff.md` only; `git diff --name-only` will additionally show this tasknote file and the PLAN.md stub flip, both expected workflow artifacts. Maintainability effect: removes a stale-status residue an audit flagged, with no loss of the file's historical value.

**Archived:** 2026-09-12
