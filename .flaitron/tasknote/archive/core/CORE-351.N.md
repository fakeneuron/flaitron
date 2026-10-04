---
title: audit-repo-safety-net audit
status: completed
tags: []
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-351, CORE-351.2, CORE-351.3]
---

# CORE-351.N | audit-repo-safety-net audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-351]]

## 🎯 Goal

Verify the completed `CORE-EPIC-351` (`audit-repo-safety-net`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables (viz advisory clearance + `update-adopters.mjs` gitlink-drift detection), and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces (re-run the three viz gates + `node --check` on `update-adopters.mjs`; confirm viz moderate audit still clean)
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-351.N — audit CORE-EPIC-351` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-351.N` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-351.N.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-351` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Re-run the epic's own gates (viz test/typecheck/lint + moderate audit; `node --check` on the tool) — no regression since each child closed
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-351.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-351]] — parent safety-net epic (Milestone 0)
- [[CORE-351.2]] — cohort child: cleared viz dependency advisories
- [[CORE-351.3]] — cohort child: update-adopters gitlink-state detection

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-351` active; cohort children `.2` + `.3` both `[x]` closed 2026-07-12 (no `.1`; Discovery supplied by audit-repo). No open siblings.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-351.N`; pre-flight passed (parent active, audit child is canonical `.N`, both implementation siblings closed). Capturing cohort state at audit time: `.2` (viz-advisory-patches) and `.3` (update-adopters-gitlink-state) both closed 2026-07-12; no early-audit — full cohort complete.

- [x] Read relevant source files — both cohort archives (`archive/core/CORE-351.2.md`, `CORE-351.3.md`) read in full; deliverable surfaces re-checked at HEAD (`viz/package-lock.json` via `npm audit`, `tools/update-adopters.mjs`).

- [x] **Archive skim** — self-referential for an epic audit; the cohort children are themselves the archive entries. `.2` cites CORE-233/CORE-119 (prior dep work); `.3` cites CORE-312/320/322/345 (update-adopters history) — all prior, none re-touched by this cohort. No non-cohort surface needs cumulative context.

- [x] **Drift check** — cohort deliverables still match HEAD: `gitlinkDrift`/`describePin` functions + `drift` status + `drifted` counter present in `tools/update-adopters.mjs` (`:153`, `:170`, `:328`, `:406`); `node --check` passes; viz moderate audit exits 0. No path/name drift since either child closed.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Full cohort closed; audit scope unambiguous (verify two independent safety-net surfaces sit coherently, sweep docs, no regressions).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Cohort inventory (Milestone 0 safety net — clear current advisories + harden fleet-tool current-state detection before feature work):

- **CORE-351.2 | viz-advisory-patches** — synced the stale committed `viz/package-lock.json` (Jun 14) to the fixed dep versions already resolved in `node_modules`, clearing all 4 npm-audit advisories (1 low / 1 moderate / 2 high) at moderate level. Lockfile-only (105 ins / 95 del); no `package.json` range change. Bumps: @babel/core 7.29.0→7.29.7, js-yaml 3.14.2→3.15.0 + 4.1.1→4.3.0, vite 6.4.2→6.4.3, ws 8.20.1→8.21.0.
- **CORE-351.3 | update-adopters-gitlink-state** — taught `tools/update-adopters.mjs` to detect superproject gitlink drift (committed pin lagging latest while worktree SPEC.md reads latest). Added `gitlinkDrift()` + `describePin()`, a report-only `drift` status (⚠ line + `drifted` counter), and a header-comment block. Bump/skip/clean-`current` paths untouched; never auto-committed.

Two disjoint surfaces (viz deps vs operator-side fleet tool) — no shared files, no ordering dependency between the children.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A; audit is a verification pass over existing cohort deliverables, no new code surface.

- [x] Implemented the minimal solution — cohort coherence pass (verification only; no inline fix needed).

- [x] Updated/added tests for non-trivial behavior — N/A (no code edits).

**Implementation Notes:**

**Cohort coherence — no inconsistencies surfaced.**

- **Deliverable inventory** — `.2` touched `viz/package-lock.json` only; `.3` touched `tools/update-adopters.mjs` only. Zero file overlap; the two surfaces are fully independent, so no cross-contamination risk.
- **Cross-ref integrity** — each child's `## 🔗 Related` block correctly names the other as sibling and `CORE-EPIC-351` as parent; wikilinks `[[CORE-351.2]]` ↔ `[[CORE-351.3]]` resolve. Both `related-tasks` frontmatter lists are consistent (`[CORE-EPIC-351, <other-sibling>, CORE-351.N]`).
- **Style parity** — both children followed the same closure discipline (stub-form PLAN flip, archive move, doc-drift sweep recorded), and both correctly deferred the cohort's move to `## Completed` to epic close. No contradictory conventions.
- **SPEC alignment** — `.3`'s new report-only `drift` status keeps `tools/update-adopters.mjs` inside its SPEC.md §"What flowtron does NOT provide" carve-out (dry-run default, local commits only, never pushes) — drift adds no state-mutating path. Carve-out text still accurate.

**Findings:** No misses in the flowtron repo → no `/ft-file-followup` candidates. (`.3`'s live finding — 10 `~/code` adopters carry real gitlink drift — is out-of-scope per-repo work, fixed in each adopter's own session, never bulk-pushed from flowtron.)

No inline fixes applied.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code edits in this audit; instead re-ran the epic's own gates to confirm no regression since each child closed (see notes).

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` passes; viz typecheck + lint clean.

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI surface in either cohort child).

**Testing Notes:**

No-regression re-run of the cohort's own gates:

- `npm --prefix viz audit --audit-level=moderate` → `found 0 vulnerabilities`, exit 0 (`.2` still holds).
- `npm --prefix viz test` → 16 files / 229 tests passed.
- `npm --prefix viz run typecheck` → clean.
- `npm --prefix viz run lint` → clean.
- `node --check tools/update-adopters.mjs` → OK; `gitlinkDrift`/`describePin`/`drift` status/`drifted` counter all present (`.3` still holds).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line)** — cumulative sweep across all AI-referenced docs. The cohort touched a lockfile (no doc pins dep versions) and added an internal report status to `update-adopters.mjs` (no doc enumerates its status vocabulary):

  - `README.md` — no change
  - `SPEC.md` — no change (§"What flowtron does NOT provide" carve-out stays accurate — the tool is still dry-run default / local commits only / never pushes; `drift` is report-only, adds no state-mutating path)
  - `docs/MIGRATION.md` — no change (§ tool pointer at :424 describes dry-run/skip behavior, not the status list)
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (supply-chain posture unchanged; dep clearance is routine currency, not a threat-model shift)
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-351.N.md`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Audited the completed `CORE-EPIC-351` (`audit-repo-safety-net`) Milestone-0 cohort — no inconsistencies surfaced. The two children touch fully disjoint surfaces (`.2` synced `viz/package-lock.json` to clear 4 npm-audit advisories; `.3` added report-only gitlink-drift detection to `tools/update-adopters.mjs`), with correct reciprocal cross-refs and consistent closure discipline. No-regression re-run of the cohort's gates all green (viz 229/229 tests, typecheck + lint clean, moderate audit 0 vulns; `node --check` OK with the new drift functions present). Cumulative doc-drift sweep: all 12 AI-referenced docs "no change" — the SPEC.md tool carve-out stays accurate since `drift` is report-only. No flowtron-repo misses → no follow-ups filed. (`.3`'s live finding that 10 `~/code` adopters carry real gitlink drift is out-of-scope per-repo work.)

**Archived:** 2026-07-12
