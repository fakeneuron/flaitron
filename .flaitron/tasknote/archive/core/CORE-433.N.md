---
title: drift blind spots audit
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-433, CORE-433.2, CORE-433.3, CORE-433.4]
---

# CORE-433.N | drift blind spots audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-433]]

## 🎯 Goal

Verify the completed `CORE-EPIC-433` (`drift blind spots`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-433.N — audit CORE-EPIC-433` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-433.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-433.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-433` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-433.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-433]] — parent epic: drift blind spots
- [[CORE-433.2]] — manual mirror sync (park flags, `--worktree`, layout tree, AGENTS docs bullet)
- [[CORE-433.3]] — `AGENTS.md` into AI-referenced list; Pair F/G release gates
- [[CORE-433.4]] — Step 6 sync + Pair H validation-roster gate + CONVENTIONS SSOT rewrite

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-433.N`; all three implementation children (`.2`, `.3`, `.4`) are closed; parent `CORE-EPIC-433` remains active under `## Medium`. No early-audit bypass — full cohort audit.

- [x] Read relevant source files — archived `CORE-433.2`, `CORE-433.3`, `CORE-433.4` tasknotes; cohort deliverables at HEAD (`AGENTS.md`, `SPEC.md`, `docs/CONVENTIONS.md`, `docs/GLOSSARY.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `claude/skills/ft-release/SKILL.md`, `claude/skills/ft-flowtron/SKILL.md`, `.flowtron/tasknote/README.md`, `SPEC/tasknote-selection.md`)

- [x] **Best Practices Review** — N/A (audit verification pass; no new code surface).

- [x] **Archive skim** — `CORE-430.N` filed F2 under this epic (addressed by `.4`); `CORE-399` partial flag sync (`.2` residual); `CORE-420.N`/`CORE-420.5` established Pair E / §7.1 shape (`.3` extended); `CORE-438.1` noted complementary `.3`/`.4` work — no contradicting design decisions.

- [x] **Drift check** — all paths cited in cohort children's deliverables still exist at HEAD; Pair F/G/H commands from `ft-release` §7.1 run clean; CI-verbatim diff exits 0.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Cohort inventory (no `.1` tasknote — discovery supplied by audit-repo 2026-08-10):**
  - **[[CORE-433.2]]** — seven markdown files: `--high` at 5 park-roster sites, `--worktree` at 2 goal-task sites, three `.flowtron/` layout paths in `SPEC.md`, dropped stale "security" from `AGENTS.md` `docs/` bullet.
  - **[[CORE-433.3]]** — `AGENTS.md` added to AI-referenced docs list; Pair F (park flags, 5 mirrors) + Pair G (`--worktree`, 2 mirrors) in `ft-release` §7.1.
  - **[[CORE-433.4]]** — `ft-release` Step 6 synced to six AGENTS validation commands; Pair H (5-site presence + CI-verbatim); `docs/CONVENTIONS.md` names both `--check` paths and rewrites "exactly one place" to SSOT + gated mirrors.
- **Assumptions:** full-cohort audit (all implementation children closed); codex/cursor `AGENTS-snippet.md` park-flag omission is intentional per `.2`/`.3` carve-outs (platform wiring, not contract-layer mirrors); `CORE-434`/`CORE-435`/`CORE-436` on PLAN are separate CORE-430.N surfacings, not this epic's misses.
- **No clarifications needed.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A (verification audit; cohort extended existing §7.1 pair-block pattern from CORE-420.x).

- [x] **Minimal refactor gate** — N/A; no code edits applied.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (verification via encoded release-gate shell commands).

**Implementation Notes:**

- **Cohort children inventoried** — see Discovery Notes; deliverables span 9+ markdown surfaces plus `ft-release` §7.1 Pairs F–H.
- **Coherence findings — no inconsistencies surfaced:**
  - Pair F: all 5 park mirrors name `--low|--med|--fut|--high` at HEAD.
  - Pair G: both `--worktree` mirrors present at HEAD.
  - Pair H: all 6 validation commands present at 5 sites; Step 6 `awk` scope clean; CI-verbatim `diff` exits 0.
  - `.2` layout tree paths (`specs/`, `sidequest/`, `STATS.md`) present in `SPEC.md`.
  - `AGENTS.md` `docs/` bullet no longer lists "security".
  - `.3`'s `AGENTS.md` AI-referenced entry matches the file's role.
  - `.4`'s CONVENTIONS SSOT sentence aligns with Pair H's five-site model.
- **Inline fixes applied:** none — HEAD already coherent.
- **`/ft-file-followup` candidates:** none — remaining drift classes (`CORE-434` CI hardening, `CORE-435` hooks-vs-CI rationale, `CORE-436` badge) are already filed on PLAN from `CORE-430.N`, outside this epic's scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code edits).

- [x] Ran lint/type-check on changed code — N/A (markdown-only audit; verification was encoded Pair F/G/H shell commands).

- [x] **Quality assertions** — N/A (no changed code).

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI).

**Testing Notes:**

- Pair F at HEAD → no output.
- Pair G at HEAD → no output.
- Pair H presence at HEAD → no output.
- Pair H CI-verbatim at HEAD → `diff` exit 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary (16 entries; all no change at audit time).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested under active `CORE-EPIC-433`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Full-cohort audit of `CORE-EPIC-433` (drift blind spots): three implementation children closed cleanly; Pairs F/G/H and CI-verbatim checks pass at HEAD with no inline fixes. Cohort deliverables are coherent — manual mirror sync (`.2`), gate widening (`.3`), and validation-roster binding (`.4`) stack without contradictory cross-refs. No `/ft-file-followup` misses; adjacent PLAN items (`CORE-434`–`436`) remain separate surfacings from `CORE-430.N`.

**Doc-drift sweep (16 entries):**
- `README.md` — no change
- `AGENTS.md` — no change (`.3` added to list; content current)
- `SPEC.md` — no change (`.2` layout tree still present)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change (`.4` SSOT rewrite still accurate)
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change

Out-of-list cohort surfaces verified: `docs/GLOSSARY.md`, `SPEC/tasknote-selection.md`, `claude/skills/ft-flowtron/SKILL.md`, `claude/skills/ft-release/SKILL.md`, `.github/workflows/ci.yml`.

**Parent-flip:** user confirmed Yes — `CORE-EPIC-433` flipped to stub form and cohort moved to `## Completed` 2026-08-12.

**Archived:** 2026-08-12
