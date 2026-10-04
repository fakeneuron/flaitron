---
title: glossary-unattended-entry
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-494]
touches:
  - docs/GLOSSARY.md
---

# CORE-590 | glossary-unattended-entry

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-494]]

## 🎯 Goal

Add a `[unattended]` entry to `docs/GLOSSARY.md` alongside the existing `[!critical]`/`[model]` entries, extend the `grammar elements` list, and refresh the Maintenance last-update line.

## ✅ Acceptance

- [x] `docs/GLOSSARY.md` has a `**[unattended]**` entry pointing at `SPEC.md` §"Task-line format" and `SPEC/unattended-candidacy.md` — `judgment` (doc-content check)
- [x] `grammar elements` entry lists `[unattended]` — `judgment` (doc-content check)
- [x] Maintenance last-update line names CORE-590 with today's date — `judgment` (doc-content check)

## 🧩 Subtasks

- [x] Read `docs/GLOSSARY.md` in full to match existing entry style/format
- [x] Insert a `**[unattended]**` glossary entry (alphabetically placed) mirroring the `[!critical]`/`[model]` entries' style
- [x] Add `[unattended]` to the `grammar elements` entry's example list
- [x] Update the Maintenance last-update line to cite CORE-590

## 🔗 Related

- [[CORE-494]] — the entry was declined there under the Maintenance clause; this task re-files it

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md row and docs/GLOSSARY.md both confirm the gap — `[!critical]` and `[model]` have entries, `[unattended]` does not, and `grammar elements` doesn't list it either. No drift.

- [x] Read relevant source files — `docs/GLOSSARY.md`, `SPEC.md` §"Task-line format", `SPEC/unattended-candidacy.md`

- [x] **Best Practices Review** — doc-only change adding one glossary entry in the established one-line-definition style; no code touched, no abstraction/dependency concerns. N/A beyond style-matching.

- [x] **Archive skim** — `archive/core/` skimmed for CORE-494 (declined this same entry) and CORE-489.2 (last glossary Maintenance update, extended the `[model]` entry). No other prior notes touch `docs/GLOSSARY.md`'s `[unattended]`/grammar-elements content.

- [x] **Drift check** — PLAN.md line, `SPEC.md` §"Task-line format", and `SPEC/unattended-candidacy.md` all current; no divergence.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--fast, implied by `[unattended]` row marker). Assumption: mirror the existing `[!critical]`/`[model]` entry format and alphabetical placement.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:**

CORE-494 declined this entry "under the Maintenance clause" (doc frozen at the time / not yet warranted). `docs/GLOSSARY.md` line 151 Maintenance note shows the last significant update was CORE-489.2 (2026-08-29), which extended the `[model]` entry. This task adds the missing `[unattended]` entry, extends the `grammar elements` line (docs/GLOSSARY.md:75) to list it, and refreshes the Maintenance line to cite CORE-590.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `[!critical]`/`[model]` one-line-definition entry shape; no new shape needed.

- [x] **Minimal refactor gate** — N/A; pure doc addition, no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, doc-only change.

**Implementation Notes:**

Added a `**[unattended]**` entry (alphabetized by its bracket letter, next to `VISION.md`, mirroring `[!critical]`/`[model]` placement conventions), extended the `grammar elements` entry (docs/GLOSSARY.md:75) to list `[unattended]`, and refreshed the Maintenance last-update line (docs/GLOSSARY.md:153) to cite CORE-590.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown-only.

- [x] Ran lint/type-check on changed code — N/A, markdown-only.

- [x] **Verification receipt** — recorded below; no avoidable duplication/dead code/complexity introduced; no other doc references `[unattended]` glossary content.

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -n "unattended\]" docs/GLOSSARY.md` → exit 0, confirms the new entry, the grammar-elements addition, and the Maintenance line all present.
- Acceptance criterion 1 (`[unattended]` entry present, pointing at SPEC §"Task-line format" and SPEC/unattended-candidacy.md) → verified by inspection, line 143.
- Acceptance criterion 2 (`grammar elements` lists `[unattended]`) → verified by inspection, line 75.
- Acceptance criterion 3 (Maintenance line cites CORE-590 + today's date) → verified by inspection, line 153.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change to any listed doc. `docs/GLOSSARY.md` is deliberately excluded from that list (per its own Maintenance note) and is the file this task edited.

- [x] Closed — all Acceptance criteria met; `status:` → `completed`; PLAN.md line flipped to stub form and moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted below.

**Final Summary:**

Added the missing `[unattended]` glossary entry to `docs/GLOSSARY.md` (declined earlier at CORE-494), extended the `grammar elements` entry to list it, and refreshed the Maintenance last-update line. One file changed, three targeted edits, ~4 lines net. `touches:` (`docs/GLOSSARY.md`) matches `git diff --name-only` exactly — no undeclared paths. No refactors made or deferred. Documentation verdict: this task's deliverable *is* the doc fix; no other AI-referenced doc required updating (doc-drift sweep: no change). Maintainability effect: closes a known glossary gap flagged at CORE-494, keeping `docs/GLOSSARY.md` in sync with the task-line grammar it documents.

**Archived:** 2026-09-12
