---
title: honest edge states audit
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-432, CORE-432.2, CORE-432.3, CORE-432.4]
---

# CORE-432.N | honest edge states audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-432]]

## 🎯 Goal

Verify the completed CORE-EPIC-432 (`honest edge states`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-432.N — audit CORE-EPIC-432` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-432.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-432.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-432` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-432.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-432]] — parent epic: honest edge states
- [[CORE-432.2]] — header version unknown display
- [[CORE-432.3]] — prune epic children under filter
- [[CORE-432.4]] — validate FLOWTRON_UPDATE_LATEST at the seam

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-432.N`. All implementation children closed 2026-08-10 (`.2`, `.3`, `.4`); no open siblings. Discovery was supplied by audit-repo 2026-08-10 (no `.1` child — intentional). Early-audit gate N/A.

- [x] Read relevant source files — archived `CORE-432.2` / `.3` / `.4`; HEAD `viz/src/ui/App.tsx` (header version + `filteredNodes` prune), `viz/src/ui/App.test.tsx` (cohort suites), `tools/update-adopters.mjs` seam + header Exit codes, `tools/update-adopters.test.mjs` seam-validation describe

- [x] **Best Practices Review** — N/A (audit is verification over existing deliverables; no new code surface unless an inline fix is required)

- [x] **Archive skim** — cohort archives are the primary inventory. Adjacent context already recorded in children: CORE-098.* (search without prune), TEST-003 (env seam intro), CORE-424.2 (exit-code contract), ProjectSelector/versionCurrency honesty for unknown pins. No non-cohort archive re-read required beyond what children already cited.

- [x] **Drift check** — HEAD still matches each child's shipped shape:
  - Header: `projectVersions[active] ? · flowtron ${pin} : null` (no `?? VIZ_VERSION`); `VIZ_VERSION` remains in `constants.ts` for release pin only
  - Filter: single `filteredNodes` map prunes children; `filteredCount` / `visibleIds` / `bySection` consume that tree; CORE-432.3 comment present
  - Seam: `override !== undefined` → `parseSemverTag` or exit 2 naming `FLOWTRON_UPDATE_LATEST`; header Exit codes document the env case
  - PLAN epic line still under Medium; children stubs nested correctly

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) full-cohort audit (all three implementation children); (2) thematic sibling edges need not share a code module — coherence is honesty contract + non-contradiction, not forced DRY across viz header / filter / fleet CLI.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Closed | Surface | Deliverable |
|---|---|---|---|
| **CORE-432.2** | 2026-08-10 | `viz/src/ui/App.tsx` header subtitle | Dropped dishonest `?? VIZ_VERSION` fallback; omit pin segment when unknown; tests for known + null pin |
| **CORE-432.3** | 2026-08-10 | `App.tsx` `filteredNodes` | Prune non-matching epic children at single derivation; count/render/keyboard-nav share one tree; 3 prune tests |
| **CORE-432.4** | 2026-08-10 | `tools/update-adopters.mjs` | Validate `FLOWTRON_UPDATE_LATEST` when set; exit 2 names env var; 2 CLI tests |

### Epic theme check

Theme: *edge states misreport instead of admitting unknown*. Each child fixes a different dishonest edge (invented version, inflated match count, "no release tags" blame for bad env). No shared module required; no cross-child API coupling.

### Prior follow-up already filed

CORE-432.2 surfaced **CORE-437** (loosen auto-commit gates) — already on PLAN Medium; not an audit miss.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A (verification audit; no new pattern introduced)

- [x] **Minimal refactor gate** — no inline fix applied; no refactor

- [x] Implemented the minimal solution — verification only: coherence inventory + fixed doc-drift sweep + regression re-run

- [x] Updated/added tests for non-trivial behavior — N/A (no code change)

**Implementation Notes:**

### Cohort children inventoried

- **CORE-432.2** — Honest header version: known pin shows ` · flowtron vX.Y.Z`; unknown omits segment. `VIZ_VERSION` kept for `/ft-release` + package.json mirror only.
- **CORE-432.3** — Honest filtered tree: non-matching children pruned; parent kept when any child matches; unfiltered identity preserved. Count string `N of M matching` and `visibleIds` use pruned tree.
- **CORE-432.4** — Honest env seam: set-but-invalid override exits 2 with `FLOWTRON_UPDATE_LATEST` named; unset still uses `latestReleaseTag()` → exit 1 only when no tags.

### Coherence findings

- **No inconsistencies surfaced.** Three independent honesty edges under one theme; no contradictory cross-refs (`.4` Related cites `.2`/`.3` as completed siblings; `.3` cites `.2`; `.2` micro-shape has no sibling Related — acceptable for micro).
- **Style parity:** each fix is local to the single dishonest site, reuses existing helpers (`parseSemverTag`, `matchesFilter`), pins behavior with targeted tests.
- **Naming:** PLAN shortnames match tasknote titles and test describe labels (`CORE-432.3` / `CORE-432.4` tagged in suites).

### Regression re-verify (audit time)

- `npm --prefix viz test -- --run src/ui/App.test.tsx` → **45/45 pass**
- `node --test tools/update-adopters.test.mjs` → **34/34 pass**
- `node --check` clean on both updater files

### Misses / follow-up candidates

- **None.** CORE-437 already filed from `.2`. No additional `/ft-file-followup` candidates from this audit.

### Inline fixes

- None.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A code change; re-ran cohort suites as regression evidence (see Implementation Notes)

- [x] Ran lint/type-check on changed code — N/A (no code edits this audit)

- [x] **Quality assertions** — N/A (no code change)

- [x] (frontend) Asked the user for visual confirmation — N/A (audit verification only; no UI change)

**Testing Notes:**

Markdown-prose verification + regression re-run of the three children's test surfaces. Frontend 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change |
  | `SPEC.md` | no change |
  | `docs/MIGRATION.md` | no change |
  | `claude/AGENTS-snippet.md` | no change |
  | `codex/AGENTS-snippet.md` | no change |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change |
  | `docs/AGENT-NEUTRALITY.md` | no change |
  | `docs/PLATFORMS.md` | no change |
  | `claude/CAPABILITIES.md` | no change |
  | `docs/AGENT-COMPAT.md` | no change |
  | `docs/EXTERNAL-AGENTS.md` | no change |
  | `docs/WORKTREES.md` | no change |

  None of the cold-start docs document viz header pin fallback, filtered-tree prune, or `FLOWTRON_UPDATE_LATEST` validation. Per-child Phase 4 already left AI-referenced set unchanged; cumulative sweep agrees. Tool header Exit-codes clause updated in `.4` (not AI-referenced).

- [x] Closed — Acceptance ticked (commit + parent-flip pending 📦); YAML `status: completed`; PLAN.md audit line stubbed under active parent; tasknote → `archive/core/CORE-432.N.md`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Honest-edge-states audit found no cohort inconsistencies and no doc drift. Header pin honesty, filtered-tree prune, and update-adopters env validation remain coherent independent edges under the epic theme; regression suites green (45 App + 34 updater). No follow-ups to file (CORE-437 already on PLAN from `.2`).

**Parent-flip:** Yes — parent stubbed + full cohort moved to top of `## Completed` (2026-08-10).

**Archived:** 2026-08-10

