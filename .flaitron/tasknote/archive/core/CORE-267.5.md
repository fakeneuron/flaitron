---
title: release-dogfood-gate audit
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-267, CORE-267.1, CORE-267.2, CORE-267.3, CORE-267.4]
---

# CORE-267.5 | release-dogfood-gate audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-267]]

## 🎯 Goal

Verify the completed `CORE-EPIC-267` (`release-dogfood-gate`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `chore: CORE-267.5 — audit CORE-EPIC-267` commit lands (no code/doc edits — clean audit)
- [ ] PLAN.md line for `CORE-267.5` flipped to stub form `Completed 2026-06-01.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-267.5.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-267` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-267.5` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-267]] — parent epic (release-dogfood-gate)
- [[CORE-267.2]] — dogfood-checklist-convention (AGENT-COMPAT §"Reading the cells")
- [[CORE-267.3]] — ft-release-gate-wiring (ft-release §3/§5/§7.4)
- [[CORE-267.4]] — v5-skip-debt-discharge (live Grok/Codex stamps)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-267.5`; pre-flight passed (`.5` is the highest `.N` under active parent `CORE-EPIC-267`; siblings `.1`–`.4` all `[x]`; no open implementation children; no in-flight or archived `.5` tasknote). Capture cohort state at audit time and verify integration coherence.

- [x] Read relevant source files — the four cohort deliverable surfaces at HEAD: `docs/AGENT-COMPAT.md` (.2 convention + .4 stamps), `claude/skills/ft-release/SKILL.md` §3/§5/§7.4 (.3 wiring), `docs/PLATFORMS.md` Grok/Codex footers (.4), `claude/CAPABILITIES.md` §"Last verified" (Claude stamp + delegation).

- [x] **Archive skim** — read all four cohort children's archived tasknotes (`CORE-267.1`–`.4`); deliverables captured below. Self-referential for an epic audit (the cohort children are themselves the archive entries).

- [x] **Drift check** — every cited path/anchor verified against HEAD; no drift (line anchors current, stamps live, cross-refs resolve).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed; cohort is the full filed set (.1–.4 closed), no early-audit/partial-cohort condition.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory (children's deliverables)

- **CORE-267.1** (discovery) — scoped the epic, filed `.2`–`.4`; no executable surface. Resolved 4 scoping forks: reuse existing stamps as the checklist (no new artifact), record skips via a `; skipped @ vX.Y.Z` context-tag, gate dogfooded agents only (Claude/Grok/Codex), 3-child split. No SPEC contract edit (ft-release is flowtron-self only).
- **CORE-267.2** (dogfood-checklist-convention) — two edits to `docs/AGENT-COMPAT.md` §"Reading the cells": (1) added the `; skipped @ vX.Y.Z` context-tag suffix; (2) rewrote the soft "refresh the cell when…" obligation into a **release gate (dogfood-or-explicit-skip)**, naming `ft-release` §5/§7 as the enforcer.
- **CORE-267.3** (ft-release-gate-wiring) — four edits to `claude/skills/ft-release/SKILL.md`: §3 acceptance line, §5 dogfood-gate walk (enumerate → per-agent resolution → apply across all stamp locations), §7.4 staging + 📦 bundle hard-gate.
- **CORE-267.4** (v5-skip-debt-discharge) — appended `; skipped @ v5.0.0` to the Grok+Codex stamps in `docs/AGENT-COMPAT.md` matrix + `docs/PLATFORMS.md` footers (4 lines); confirmed the 4 `unverified` rows correct (noted-not-gated).

### Drift check (HEAD)

- `docs/AGENT-COMPAT.md` — `; skipped @ vX.Y.Z` suffix defined l.70–75; release-gate obligation l.77–87 (names `ft-release` §5/§7); Grok l.37 + Codex l.38 carry `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)`; Claude l.36 `v5.0.0 · 2026-06-01 (dogfooded)`; 4 unverified rows l.39–42. ✅
- `claude/skills/ft-release/SKILL.md` — §3 acceptance l.102; §5 walk l.145–155; §7.4 staging l.235–237 + bundle hard-gate l.244–253. ✅
- `docs/PLATFORMS.md` — Grok l.236 + Codex l.247 footers carry the identical stamp form; 4 unverified footers l.255–279. ✅
- `claude/CAPABILITIES.md` §"Last verified" l.54–56 — `v5.0.0 · 2026-06-01 (dogfooded)`, delegates format+obligation to AGENT-COMPAT §"Reading the cells". ✅

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A (verification pass over existing cohort deliverables; no new code surface).

- [x] Implemented the minimal solution — verification only; no inline fixes required (cohort coherent at HEAD).

- [x] Updated/added tests for non-trivial behavior — N/A (no code edits).

**Implementation Notes:**

### Cohort coherence findings — no inconsistencies surfaced

- **Stamp-form parity (.4 across two docs).** Grok + Codex stamps are byte-identical between `AGENT-COMPAT.md` matrix (l.37–38) and `PLATFORMS.md` footers (l.236, 247): `v4.4.0 · 2026-06-01 (dogfooded; skipped @ v5.0.0)`. No matrix/footer drift — the .3 walk's "apply across all locations together" requirement is satisfied in the live state.
- **Worked example matches live data.** The §"Reading the cells" worked example (`AGENT-COMPAT.md` l.71) uses the exact live Grok/Codex stamp — the convention doc (.2) and the discharged debt (.4) agree literally, not just in shape. Strong coherence signal.
- **Convention ↔ enforcer cross-ref is bidirectional.** AGENT-COMPAT §"Reading the cells" (l.84) names `ft-release` §5/§7 as the enforcer; ft-release §5 (l.145) + §3 (l.102) cite back to `AGENT-COMPAT.md` §"Reading the cells" for the format+obligation. Both resolve.
- **Refresh/skip vocabulary is consistent** across the cohort: `dogfood-or-explicit-skip`, `; skipped @ vX.Y.Z` (suffix; prefix pinned to last real verification), `noted-not-gated` for `unverified`/`docs-only` rows. ft-release §5 (l.149–150) Refreshed/Skipped branches match the AGENT-COMPAT semantics exactly (Refreshed drops the suffix; Skipped pins prefix + sets/bumps suffix).
- **CAPABILITIES delegation intact (.4 scope decision).** No per-Grok/Codex stamp lives in CAPABILITIES.md; it carries only the Claude stamp + delegates the format/obligation to AGENT-COMPAT. .4's "out of scope" call holds at HEAD.
- **No regressions in earlier surfaces.** §"Pre-adoption verification" (l.89–98: "Grok Build and Codex CLI have now been dogfooded once") and §"Cross-agent cue fallback policy" (l.120–125) remain consistent with the explicit-skip state — a recorded skip is still a deliberate "not yet", so "the natural next step for the Grok and Codex rows" (a real dogfood) reads correctly, not contradictorily.

### Doc-drift sweep cross-check (cumulative, slice-local)

Grep across the 8 non-touched AI-referenced docs for stale obligation/stamp wording (`verify, don't bump` / `refresh the cell` / `minor/patch leave` / `last.verified` / `dogfood` / `skipped @`) returned a single hit: `README.md:36`, a doc-index one-liner ("…skill primitives, and last-verified currency") — a stable description of AGENT-COMPAT, unaffected by the obligation rewrite. No external doc restates ft-release's stamp rule, so nothing drifted out of sync with the .2/.3 rewrite.

### Misses / follow-up candidates

None. No inline fixes applied; no `/ft-file-followup` candidates surfaced. Clean audit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changed; markdown/prose verification only).

- [x] Ran lint/type-check on changed code — N/A (no code changed).

- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend).

**Testing Notes:**

Verification audit — no code or doc edits landed, so no test/lint surface. Coherence verified by reading the four deliverable surfaces against each other + one cross-doc grep (above). All three Phase 3 boxes N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (l.36 index entry stable)
  - `SPEC.md` — no change (gate is flowtron-self only; no contract edit)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (no stamp prose)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (no new contract-layer Claude reference; AGENT-COMPAT already in-ledger scope)
  - `docs/PLATFORMS.md` — no change *this audit* (Grok/Codex stamps landed in `.4`; coherent at HEAD)
  - `claude/CAPABILITIES.md` — no change (Claude stamp current; delegation intact)
  - `docs/AGENT-COMPAT.md` — no change *this audit* (convention `.2` + stamps `.4` landed; coherent at HEAD)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (kept nested under `CORE-EPIC-267` per epic-cohort grouping; parent + cohort move only on Step 9 parent-flip confirmation) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate alongside the parent-flip prompt)

**Final Summary:**

Audited the `CORE-EPIC-267` (`release-dogfood-gate`) cohort — no inconsistencies surfaced; the four children sit coherently in the codebase. The convention (.2, `docs/AGENT-COMPAT.md` §"Reading the cells"), the wiring (.3, `ft-release` §3/§5/§7.4), and the discharged v5.0.0 skip-debt (.4, AGENT-COMPAT + PLATFORMS stamps) form a consistent dogfood-or-explicit-skip gate: the Grok/Codex stamps are byte-identical across the matrix and the PLATFORMS footers, the §"Reading the cells" worked example matches the live stamps exactly, the convention↔enforcer cross-refs resolve bidirectionally, and the refresh/skip vocabulary is consistent end-to-end. Doc-drift sweep across all 11 AI-referenced docs: no change (the only grep hit, `README.md:36`, is a stable doc-index description). CAPABILITIES delegation and the unverified-row "noted-not-gated" exemption both hold. No inline fixes, no `/ft-file-followup` candidates. Parent-flip eligible — all CORE-EPIC-267 children closed.

**Archived:** 2026-06-01
