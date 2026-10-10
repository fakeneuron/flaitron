---
title: roster-flag-guard
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-473.4]
touches:
  - AGENTS.md
  - claude/AGENTS-snippet.md
---

# CORE-771 | roster-flag-guard

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-473.4]]

## 🎯 Goal

Make `AGENTS.md`'s workflow roster names-only with a `/ft-task` flags line mirroring the adopter paste-block, and align both KEEP IN SYNC guards.

## ✅ Acceptance

- [x] Roster no longer lists `/ft-task --debug` / `--loop` as skills — `grep -c 'ft-task --debug' AGENTS.md` → 0
- [x] Flags line carries `--fast` and `--unattended` — `grep -q -- '--unattended' AGENTS.md`
- [x] Guards in both files mention the flags line — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] Edit AGENTS.md roster, flags line, guard items 1 and 3
- [x] Edit claude/AGENTS-snippet.md guard item 1

## 🔗 Related

- [[CORE-473.4]] — cited the names-only rule to omit `--unattended`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment** — **Verdict:** Proceed. **Rationale:** roster still carried the fossil entries.
- [x] Read relevant source files
- [x] **Best Practices Review** — N/A, docs only
- [x] **Archive skim** — no prior tasknotes needed beyond CORE-473.4 reference
- [x] **Drift check** — AGENTS.md lines match the PLAN row
- [x] Asked clarifying questions OR logged "No clarifications needed (--fast)"
- [x] Subtasks populated; `touches:` declared

**Discovery Notes:** No clarifications needed (--fast). Flags line text copied from the snippet, paths un-prefixed for self-host.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrored the snippet's flags line
- [x] **Minimal refactor gate** — none
- [x] Implemented the minimal solution
- [x] Updated/added tests — N/A, docs

**Implementation Notes:** Roster is names-only; flags line follows it; guards say so.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite — `bash tools/drift-checks.sh` → 0
- [x] Lint/type-check — N/A, markdown only
- [x] **Verification receipt** — `bash tools/drift-checks.sh` → exit 0
- [x] **External review** — N/A, ~20-line doc diff too small to grade
- [x] (frontend) N/A

**Testing Notes:** all drift checks ok (context_budget, pair_q, pair_r included). Full validation set (`just test/lint/typecheck`, viz npm) not run: docs-only diff touching no viz or tools code.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change
- [x] Closed
- [x] **Evidence-based recap** — AGENTS.md, claude/AGENTS-snippet.md changed; matches `touches:`
- [x] **Learnings** — N/A

**Final Summary:** AGENTS.md roster now names-only plus a `/ft-task` flags line; both guards updated.

**Archived:** 2026-10-10
