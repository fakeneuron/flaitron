---
title: adopter-surface-sync audit
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-329, CORE-329.2, CORE-329.3, CORE-329.4]
---

# CORE-329.5 | adopter-surface-sync audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-329]]

## 🎯 Goal

Verify the completed `CORE-EPIC-329` (`adopter-surface-sync`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-329.5 — audit CORE-EPIC-329` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-329.5` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-329.5.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-329` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-329.5` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-329]] — parent epic (adopter-surface-sync, audit-repo 2026-07-02)
- [[CORE-329.2]] — ft-update-wiring-sync
- [[CORE-329.3]] — new-logo-adoption
- [[CORE-329.4]] — cosmetic-sweep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-329.5`. Pre-flight passed: parent epic `CORE-EPIC-329` open in `## High`, `CORE-329.5` is the highest-numbered child (.2, .3, .4, .5), no open siblings (all three implementation children `[x]`).

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Cohort inventory** (all three archived at `.flowtron/tasknote/archive/core/`):
  - **CORE-329.2** (`ft-update-wiring-sync`) — synced the `/ft-update` wiring fan-out that `e8f492a` left behind. Fixed `docs/MIGRATION.md` (§1.2 nine→ten + heading + role clause; §1.6 staging block +2 paths; §1.7 verify enumeration) and `claude/skills/ft-new-project/SKILL.md` (Step 3 heading; Step 7 staging block +2 paths; Step 8 eighteen→twenty + 2 readlink lines). Added a standing count-relative symlink-wiring check to `claude/skills/ft-release/SKILL.md` §7.1. All four consumer blocks verified at 20.
  - **CORE-329.3** (`new-logo-adoption`) — adopted root `LOGO.png` (446 KB, 705×705) as canonical logo source. Regenerated `viz/public/LOGO.webp` (4,566 bytes) and `viz/public/favicon.png` (3,633 bytes) via the FE-058 `cwebp`/`sips` pipeline. Removed dead `viz/public/LOGO.png` (374 KB, old FE-058 leftover) and unused `viz/public/favicon.svg`. No source-code path changes (`App.tsx:276`, `index.html:6` unchanged). Visually confirmed via Playwright.
  - **CORE-329.4** (`cosmetic-sweep`) — stripped the stale "plus the wiring in CORE-215.5" clause from both `claude/commands/ft-worktree-start.md:19` and `ft-worktree-end.md:19` (Discovery caught the identical clause in both files; PLAN line only named `-start`). Added a new alphabetized `/ft-update` term to `docs/GLOSSARY.md` (between `follow-up` and `grammar elements`), bumped the ~52→~53 count at `docs/GLOSSARY.md:7` and `README.md:20`.
- **Archive skim:** cohort children themselves are the relevant archive entries (self-referential per skill Step 4 guidance). No non-cohort paths in `claude/AGENTS-snippet.md`, `docs/MIGRATION.md`, `claude/skills/ft-new-project/`, `docs/GLOSSARY.md`, `README.md`, or `viz/public/` surfaced in adjacent archived tasknotes beyond what each child's own Discovery already cited (FE-058 for the logo pipeline, CORE-215.6/CORE-235/CORE-244/CORE-324.4 already checked by CORE-329.4's own archive skim).
- **Drift check:** spot-verified current repo state against each child's closure claims — `docs/GLOSSARY.md:7` and `README.md:20` both read "~53"; `claude/skills/ft-release/SKILL.md` §7.1 carries the standing snippet-count check; `viz/public/LOGO.png` and `favicon.svg` are absent (`git rm`'d); no `CORE-215.5` references remain in either worktree command doc. No drift found — all three children's cited state matches HEAD.
- No clarifications needed. Cohort closed cleanly with no deferred/partial children, so no early-audit scope question applies.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A; audit is a verification pass over existing cohort deliverables, no new code surface.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code changes

**Implementation Notes:**

- **Cohort coherence pass:**
  - Naming: all three children use consistent doc-drift sweep prose shape (bullet per AI-referenced-docs entry, "no change" or specific update) — matches the fixed-line convention verbatim.
  - Style parity: CORE-329.2 and CORE-329.4 both touch enumeration/count text and both verify with deterministic grep/count checks in Testing Notes — consistent verification discipline. CORE-329.3 (asset swap) uses Playwright visual confirmation instead, appropriate for its frontend surface — no inconsistency, just a different verification shape for a different task type.
  - Cross-refs: no contradictory claims between children. CORE-329.2's doc-drift sweep explicitly notes "glossary count is CORE-329.4's scope" — correctly deferred, and CORE-329.4 delivered exactly that. CORE-329.4's doc-drift sweep correctly excludes `docs/GLOSSARY.md` from the AI-referenced-docs list (per that doc's own Maintenance line) while still updating it as the task's primary artifact — consistent with README.md's glossary-is-separate convention.
- **No regressions found** in earlier-shipped cohort surfaces: CORE-329.2's wiring counts (20) still hold; CORE-329.3's logo assets still resolve; CORE-329.4's glossary count (53) and worktree docs still clean.
- **No inline fixes needed** — no coherence gaps or stale cross-refs surfaced.
- **No follow-up misses to file.** Cohort is internally consistent; nothing to hand off to `/ft-file-followup`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changes this task
- [x] Ran lint/type-check on changed code — N/A, no code changes this task
- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface touched by the audit itself (CORE-329.3's own visual confirmation already covered logo rendering)

**Testing Notes:**

Audit is a markdown-prose verification pass; no code or test surface. Re-verified deterministic counts cited by cohort children (glossary count = 53, snippet wiring count = 20, zero stale CORE-215.5/nine/eighteen references) — all hold at HEAD.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs":

  - `README.md` — no change (cohort's glossary-count update already landed via CORE-329.4)
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change (cohort's wiring-fan-out update already landed via CORE-329.2)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-02.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audited the closed `CORE-EPIC-329` (`adopter-surface-sync`) cohort — three children (wiring-fan-out sync, logo adoption, cosmetic sweep). No inconsistencies surfaced: naming/style consistent across children, no contradictory cross-refs, no regressions in earlier-shipped surfaces, cumulative doc-drift sweep clean (both cohort-landed doc updates — MIGRATION wiring counts, README/GLOSSARY count bump — hold at HEAD, no further drift). No follow-up filings needed.

**Archived:** 2026-07-02
