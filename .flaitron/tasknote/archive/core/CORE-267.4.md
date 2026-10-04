---
title: v5-skip-debt-discharge
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-267, CORE-267.3, CORE-267.5]
---

# CORE-267.4 | v5-skip-debt-discharge

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-267]] · 🔗 [[CORE-267.5]]

## 🎯 Goal

Stamp the Grok+Codex `last-verified` cells in AGENT-COMPAT.md and PLATFORMS.md with the v4.4.0 skip notation, and sweep the 4 `unverified` rows to remove the "noted-not-gated" phrasing in favour of the new explicit-skip convention.

## ✅ Acceptance

- [x] AGENT-COMPAT.md Grok and Codex rows carry `last-verified` in the form `` `v4.4.0 · <date> (dogfooded; skipped @ v5.0.0)` ``
- [x] PLATFORMS.md Grok and Codex rows carry the same stamp form
- [x] No row in either doc retains stale stamp without skip notation
- [x] No other cells modified beyond the 4 targeted rows

## 🧩 Subtasks

- [ ] Read AGENT-COMPAT.md and PLATFORMS.md to identify the exact 4 rows and current wording
- [ ] Edit AGENT-COMPAT.md Grok row: stamp `last-verified` + remove noted-not-gated prose
- [ ] Edit AGENT-COMPAT.md Codex row: same
- [ ] Edit PLATFORMS.md Grok row: stamp `last-verified` + remove noted-not-gated prose
- [ ] Edit PLATFORMS.md Codex row: same
- [ ] Verify no other rows were touched (diff review)

## 🔗 Related

- [[CORE-EPIC-267]] — parent epic: release-dogfood-gate
- [[CORE-267.2]] — dogfood-checklist-convention (established the new stamp format)
- [[CORE-267.3]] — ft-release-gate-wiring (wired the gate check)
- [[CORE-267.5]] — audit (upcoming final subtask)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-267.2 explicitly scoped live stamp updates to this task; both docs confirmed to carry the pre-skip stamps for Grok+Codex at HEAD.

- [x] Read relevant source files — `docs/AGENT-COMPAT.md` (matrix table + §"Reading the cells") and `docs/PLATFORMS.md` (Grok Build + Codex CLI stubs)

- [x] **Archive skim** — see Discovery Notes

- [x] **Drift check** — see Discovery Notes

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Archive skim

Relevant prior tasknotes touching these paths:
- **`CORE-267.2.md`** — established the `; skipped @ vX.Y.Z` suffix format. Implementation notes state: "PLATFORMS bare stamp values + CAPABILITIES delegation reference both stay consistent with the strengthened obligation; PLATFORMS/CAPABILITIES live-value updates are `CORE-267.4`, not here." Confirms exactly what this task must do.
- **`CORE-267.3.md`** — wired the gate into `ft-release`; no stamp edits there, confirms stamps are unresolved.
- **`CORE-265.md`** — v5.0.0 release; refreshed Claude stamps, silently left Grok/Codex at v4.4.0. The specific debt this task discharges.
- **`CORE-257.md`** — dogfood run for Grok at v4.4.0 (the last real verification). The date in the current stamp `2026-06-01` comes from this.
- **`CORE-258.md`** — dogfood run for Codex at v4.4.0. Same origin for the date.

### Drift check

- AGENT-COMPAT.md Grok row: `v4.4.0 · 2026-06-01 (dogfooded)` — no skip suffix. ✅ Target confirmed.
- AGENT-COMPAT.md Codex row: `v4.4.0 · 2026-06-01 (dogfooded)` — no skip suffix. ✅ Target confirmed.
- PLATFORMS.md Grok Build stub: `**Last verified:** \`v4.4.0 · 2026-06-01 (dogfooded)\`` — no skip suffix. ✅ Target confirmed.
- PLATFORMS.md Codex CLI stub: `**Last verified:** \`v4.4.0 · 2026-06-01 (dogfooded)\`` — no skip suffix. ✅ Target confirmed.
- 4 unverified rows (Cursor, Gemini CLI, Aider, Sourcegraph Amp): all say `unverified` in both docs. "Noted-not-gated" label is in §"Reading the cells" explanation text (CORE-267.2 already authored it). No changes needed for these rows.

### No clarifications needed — explicit assumptions

1. **Stamp format**: `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)` per CORE-267.2.
2. **4 unverified rows**: sweep confirms no wording change needed; `unverified` is the correct label per §"Reading the cells" vocabulary.
3. **CAPABILITIES.md**: CORE-267.2 verified it "delegates format+obligation back to AGENT-COMPAT.md §Reading the cells" — no stamp value to update there (no per-Grok/Codex stamp cell in CAPABILITIES.md). Out of scope.
4. **Only 4 edits total**: Grok+Codex in AGENT-COMPAT.md matrix table (2) + Grok+Codex in PLATFORMS.md stubs (2).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing backtick-quoted stamp cell in the matrix table and the `**Last verified:**` inline code in PLATFORMS.md stubs; same style as the Claude row and the dogfooded suffix already defined in §"Reading the cells"

- [x] Implemented the minimal solution — 4 targeted in-place edits: 2 in AGENT-COMPAT.md matrix table (Grok+Codex rows), 2 in PLATFORMS.md stub footers (Grok Build+Codex CLI)

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only)

**Implementation Notes:**

4 edits appended `; skipped @ v5.0.0` to the parenthetical context-tag in each Grok/Codex stamp:
- `docs/AGENT-COMPAT.md` matrix table: Grok Build row + Codex CLI row
- `docs/PLATFORMS.md`: §"Grok Build" `**Last verified:**` + §"Codex CLI" `**Last verified:**`

Unverified rows (Cursor, Gemini CLI, Aider, Sourcegraph Amp) confirmed `unverified` in both docs — no change needed; they are noted-not-gated per §"Reading the cells".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only); diff verified exactly 4 targeted lines, no unintended changes

- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend)

**Testing Notes:**

Diff clean: 2 rows in AGENT-COMPAT.md matrix table + 2 stubs in PLATFORMS.md; unverified rows (Cursor, Gemini CLI, Aider, Sourcegraph Amp) untouched in both docs.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md no change · SPEC.md no change · docs/MIGRATION.md no change · claude/AGENTS-snippet.md no change · docs/CONVENTIONS.md no change · CONTRIBUTING.md no change · SECURITY.md no change · docs/AGENT-NEUTRALITY.md no change · **docs/PLATFORMS.md updated** (Grok+Codex stamps) · claude/CAPABILITIES.md no change · **docs/AGENT-COMPAT.md updated** (Grok+Codex stamps)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip — doc-only, no signal trips)

**Final Summary:**

Discharged the v5.0.0 explicit-skip debt for Grok Build and Codex CLI by appending `; skipped @ v5.0.0` to both their `last-verified` stamps in `docs/AGENT-COMPAT.md` (matrix table) and `docs/PLATFORMS.md` (stub footers) — 4 targeted lines changed. The 4 unverified rows (Cursor, Gemini CLI, Aider, Sourcegraph Amp) were swept and confirmed correct as `unverified` (noted-not-gated, exempt from the gate). Closes the silent-leave-old-stamp from CORE-265; all dogfooded-history rows now carry explicit release disposition at v5.0.0.

**Archived:** 2026-06-01
