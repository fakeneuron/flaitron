---
title: readme-history-out
status: completed
tags: [context, documentation]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-857.1, CORE-856, CORE-724.5]
touches:
  - .flaitron/tasknote/README.md
  - docs/DOC-DRIFT-SWEEP.md
parallel-safe-with:
  - CORE-857.2
  - CORE-857.6
---

# CORE-857.3 | readme-history-out

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-857]] [[CORE-857.1]] [[CORE-856]] [[CORE-724.5]]

## 🎯 Goal

Move the self-host tasknote README's historical doc-drift-sweep narrative into `docs/DOC-DRIFT-SWEEP.md`, leave one pointer in the README, and reduce that README to at most 6,600 bytes without changing the sweep list or archive-layout table.

## ✅ Acceptance

- [x] `.flaitron/tasknote/README.md` retains its archive-layout table and complete AI-referenced-docs sweep list, and replaces the four historical sweep narratives with one pointer to `docs/DOC-DRIFT-SWEEP.md` — `rg -q 'DOC-DRIFT-SWEEP.md' .flaitron/tasknote/README.md && rg -q '^## Archive layout$' .flaitron/tasknote/README.md` → 0
- [x] `docs/DOC-DRIFT-SWEEP.md` preserves the moved CORE-489.3 / CORE-492 / CORE-543 / CORE-622.3 decision history — `rg -q 'CORE-489.3|CORE-492|CORE-543|CORE-622.3' docs/DOC-DRIFT-SWEEP.md` → 0
- [x] `.flaitron/tasknote/README.md` is no larger than 6,600 bytes — `test $(wc -c < .flaitron/tasknote/README.md) -le 6600` → 0 (6,573 B)
- [x] The untouched template remains free of the moved sweep-history prose — `! rg -q 'CORE-489.3|CORE-492|CORE-543|CORE-622.3' templates/tasknote-README.md` → 0
- [x] Documentation formatting and repository drift checks pass — `git diff --check && bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Review the README's archive table, sweep-list boundary, and history block; compare the template's intentionally separate prose.
- [x] Create `docs/DOC-DRIFT-SWEEP.md` with the moved history and a clear maintenance boundary.
- [x] Replace only the history block in `.flaitron/tasknote/README.md` with one pointer line.
- [x] Run byte, content-boundary, template, formatting, and drift-check verification.
- [x] Reconcile the declared scope and complete closure artifacts.

## 🔗 Related

- [[CORE-EPIC-857]] — parent context-redundancy epic
- [[CORE-857.1]] — discovery that chose the new history home and recorded the template/self-host split
- [[CORE-856]] — predecessor survey that measured the redundant cold-start context
- [[CORE-724.5]] — precedent for distinguishing tasknote-template and flaitron-self documentation surfaces

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The README still contains the exact four history narratives named by the filed task, and the epic discovery confirmed their destination and that the shipped template is deliberately outside this change.

- [x] Read relevant source files — `.flaitron/tasknote/README.md` (archive table, sweep list, and history block), `templates/tasknote-README.md` (unaffected template), and `archive/core/CORE-857.1.md` (destination and scope decision)

- [x] **Best Practices Review** — `N/A`: a small documentation relocation with no code or module boundary.

- [x] **Archive skim** — path grep found broad historical use of the README; read the direct epic predecessor `CORE-857.1` and sibling `CORE-857.2`. Load-bearing finding: retain the self-host/template distinction and move history rather than delete it.

- [x] **Drift check** — the current README is 11,052 B and includes all four named history records after the unchanged sweep list; the PLAN line, epic discovery, and template agree on the scope.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — `--unattended`: assume the new document is a self-contained historical record, the README pointer is a single prose paragraph, and the listed history remains verbatim apart from contextual framing needed by its new home.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

The archive folder is the authoritative `archive/core/` mapping. `CORE-857.1` records the explicit operator decision for this child: keep the README's sweep list and pointer, move the history to `docs/DOC-DRIFT-SWEEP.md`, and do not modify `templates/tasknote-README.md`. The broader archive grep has many routine README mentions, so the immediate epic cohort was the relevant precedent; no Related, `supersedes:`, or supersession pointers add a contrary decision.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — used the repository's lazy-history pattern: the README retains its live routing list and points to a dedicated `docs/` record for the rationale and historical decisions.

- [x] **Minimal refactor gate** — no refactor; moved only the filed lines and added the smallest framing needed for the new document to own its maintenance boundary.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: documentation-only change; content-boundary checks cover the changed behavior.

**Implementation Notes:**

The README's four blocks at former lines 76–141 now live in `docs/DOC-DRIFT-SWEEP.md` under `Sweep-set exclusions` and `Historical decisions`. The README keeps exactly one pointer line. Independent review found that creating the new document made the moved “Eight `docs/` files” ledger stale; Phase 2 changed it to nine and recorded the new document itself as the history record.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — content-boundary acceptance commands passed

- [x] Ran lint/type-check on changed code — `git diff --check` and `bash tools/drift-checks.sh` passed

- [x] **Verification receipt** — each Acceptance verify command recorded below; `N/A` for code-structure concerns because this is documentation only

- [x] **External review** — independent read-only review: pass 1 found one blocker (the stale eight-document exclusion ledger), fixed in Phase 2; pass 2 found no blockers or notes

- [x] (frontend) `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
rg -q 'DOC-DRIFT-SWEEP.md' .flaitron/tasknote/README.md && rg -q '^## Archive layout$' .flaitron/tasknote/README.md → 0
test $(wc -c < .flaitron/tasknote/README.md) -le 6600 → 0 (6,573 B)
rg -q 'CORE-489.3|CORE-492|CORE-543|CORE-622.3' docs/DOC-DRIFT-SWEEP.md → 0
rg -q 'Nine `docs/` files' docs/DOC-DRIFT-SWEEP.md → 0
! rg -q 'CORE-489.3|CORE-492|CORE-543|CORE-622.3' templates/tasknote-README.md → 0
git diff --check → 0
bash tools/drift-checks.sh → 0 (19/19)
```

`--unattended` scope guard at Phase 3: 1 added / 66 deleted README lines plus 114 tasknote and 75 documentation lines (256 total) is below 400; changed paths are the two declared files plus this tasknote workflow path. No park.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `.flaitron/tasknote/README.md` updated as this task's target; no change to `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, or `docs/VISION.md`

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-01.` stub nested under `CORE-EPIC-857`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A`: the new document itself keeps the moved history without adding it to the cold-start README.

**Final Summary:**

Moved the tasknote doc-drift-sweep rationale and CORE-489.3 / CORE-492 / CORE-543 / CORE-622.3 history to `docs/DOC-DRIFT-SWEEP.md`; the tasknote README now keeps its live sweep list, archive table, and one short pointer. The README fell from 11,052 B to 6,573 B, meeting the 6,600 B target.

- **Changed:** `.flaitron/tasknote/README.md`; `docs/DOC-DRIFT-SWEEP.md`.
- **Verification:** all five Acceptance commands, `git diff --check`, and `bash tools/drift-checks.sh` (19/19) passed.
- **Review:** first independent pass found the stale exclusion ledger; it was corrected from eight to nine docs, and the second pass had no findings.
- **Scope:** declared 2 deliverables, changed 2; undeclared deliverables: none. This tasknote is workflow metadata.
- **Maintainability:** long-lived decision history is still available through one explicit pointer without making every task startup read it.

**Archived:** 2026-11-01
