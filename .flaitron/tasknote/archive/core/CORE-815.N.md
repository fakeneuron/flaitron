---
title: moderate-tier-rename audit
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-EPIC-815, CORE-815.1, CORE-815.2, CORE-815.3, CORE-815.4]
---

# CORE-815.N | moderate-tier-rename audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-815]]

## 🎯 Goal

Verify the completed `CORE-EPIC-815` (`moderate-tier-rename`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] No live tier-meaning `[medium]` outside the alias rule, archives, vendor effort, provenance notes and the dated CODEX-VERIFICATION receipt — `git grep -nE '\[medium\]|MEDIUM|medium-(tier|band)|medium (tier|rung|band)' -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md' ':!docs/VERSION-HISTORY.md' ':!docs/CODEX-VERIFICATION.md'` reviewed
- [x] Natabula and global `~/.claude/CLAUDE.md` hand-offs recorded — filed as natabula NAT-446 (`eed1b4f`, local), per SPEC.md §"Deferred hand-off filing"
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-815` (Step 5), landing in the audit's closure commit
- [x] Single `feat: CORE-815.N — audit CORE-EPIC-815` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-815.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-815.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Residual `[medium]` grep (PLAN line's added check)
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-815.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-815]] — parent epic
- [[CORE-815.1]] · [[CORE-815.2]] · [[CORE-815.3]] · [[CORE-815.4]] — audited cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic` (passed the epic ID; confirmed `CORE-815.N` via AskUserQuestion). All four implementation children closed 2026-10-20, so no early-audit decision.

- [x] Read relevant source files — the four archived cohort tasknotes (Goal, Implementation Notes, Final Summary)

- [x] **Best Practices Review** — N/A: vocabulary rename audit, no module-boundary work

- [x] **Archive skim** — self-referential (cohort children are the archive hits); `<area>` = `core` per README table

- [x] **Drift check** — every path the cohort touched still exists at HEAD; the PLAN `.N` line matches this note's added grep and hand-off acceptance

- [x] Asked clarifying questions — hand-off placement (SPEC.md §"Deferred hand-off filing" vs the epic's recap-prose plan): operator chose a natabula PLAN row (AskUserQuestion, 🛠️ gate)

- [x] Subtasks above populated with ordered steps; YAML `touches:` omitted (no file deliverable beyond PLAN + this note)

**Discovery Notes:**

- `.1` — scoped `.2`–`.4`, rewrote `.N`; measured 44 open `[medium]` rows across 17 `~/Code` PLANs (alias keeps them valid).
- `.2` — contract: SPEC.md §"Model field", `SPEC/model.md` (renames + **Legacy `[medium]` alias** paragraph + optional open-row sed), cue-vocabulary `MODERATE`, candidacy clause 1, plan-parser legacy paragraph, fixtures (FX-161 kept `[medium]🧩`). Holds a release-tag draft for `/ft-release`.
- `.3` — viz: `parser.ts` / `ModelChip.tsx` comments, `parser.test.ts` `[moderate]🧩` case + legacy `[medium]🧩` alias case.
- `.4` — prose: 10 skill files, CAPABILITIES, PLATFORMS bands, AGENT-NEUTRALITY, GLOSSARY, DOGFOOD/AGENT-COMPAT labels, templates/PLAN.md, flaitron's open PLAN rows.
- Hand-off surfaces: natabula has 18 tier-`[medium]` hits across 8 files (`scripts/format-seed-plan.sh` + test, `fleet-pulse.test.sh`, `scripts/README.md`, `docs/FLEET-BRAND.md`, `docs/MIGRATION.md`, `templates/BRAINSTORM-PROMPT.md`, `templates/README.md`) plus its PLAN template row (line 49); its PLAN has no hand-off row. Global `~/.claude/CLAUDE.md` §"Model Selection" still says `[medium]🧩`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass; hand-off row follows natabula's own `chore: file NAT-<n> — <shortname>` precedent

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution — audit findings below; no inline fixes needed

- [x] Updated/added tests — N/A: no code change

**Implementation Notes:**

- **Cohort inventory** — `.1` scoping (3 children + rewritten `.N`); `.2` contract + alias rule + sed + fixtures; `.3` viz comments/tests; `.4` skill/doc/template prose + open PLAN rows. All closed 2026-10-20.
- **Residual grep** (Acceptance 4) — every hit is allowed: the alias rule (SPEC.md:730, `SPEC/model.md`, `SPEC/plan-parser.md`, `SPEC/post-closure.md`, candidacy clause 1, ft-task preamble + step-1.5), fixture FX-161 and its README/describes, the viz legacy-alias test, provenance notes (`(then \`[medium]\`)` in AGENT-NEUTRALITY, PLATFORMS, CORE-816 starter; ft-release "filed before CORE-815"), closed PLAN rows, and the epic's own description. A looser `medium`+tier/rung/band/label/ladder grep left only effort cells and `Medium` priority.
- **Coherence** — labels agree (`MODERATE` in cue-vocabulary, DOGFOOD, AGENT-COMPAT); the alias is worded the same way everywhere ("legacy `[medium]`", stored as written, reads as `[moderate]`); no ladder list in the sweep set omits `moderate`; PLATFORMS bands say `moderate` while effort cells keep `medium`, matching `.2`'s three-axis split.
- **Regressions** — none: `.3`'s viz alias test pins `.2`'s parser rule; drift checks pass at HEAD.
- **Doc-drift sweep (per entry)** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (alias clause from `.2` current) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (`.4` rows current) · `docs/PLATFORMS.md` no change (bands `moderate`, effort `medium`) · `claude/CAPABILITIES.md` no change (stamp is release-time) · `docs/AGENT-COMPAT.md` no change (`MODERATE` label) · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.
- **Inline fixes** — none.
- **Misses filed as child rows** — none.
- **Hand-off** — natabula NAT-446 `[medium]` (legacy, since natabula's pin predates the rename; the release sed migrates it) covers 18 hits / 8 files + its PLAN template row, and the operator's global `~/.claude/CLAUDE.md` §Model Selection edit. Committed `eed1b4f` in natabula, unpushed.
- **Release carry-over** — `.2`'s tag draft (optional sed migration, `No required project-side edits.`) is for the next `/ft-release`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite — N/A: no code change (cohort ran viz 616/616 at `.3`/`.4`)

- [x] Ran lint/type-check — N/A: markdown only; `bash tools/drift-checks.sh` run instead

- [x] **Verification receipt** — recorded in Testing Notes

- [x] **External review** — N/A: no code or contract diff; the deliverable is PLAN flips + this note

- [x] (frontend) N/A — no UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Residual grep (Acceptance 4) → exit 0, hits reviewed as above.
- `bash tools/drift-checks.sh` → 0 (pair_p, pair_q, pair_r ok).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. One process note in Implementation Notes: a PLAN line that plans a cross-repo hand-off as "recap" prose conflicts with SPEC.md §"Deferred hand-off filing"; `/ft-open-epic` drafting could catch it earlier

**Final Summary:**

Audit found the cohort coherent. No live tier-meaning `[medium]` is left in flaitron outside the alias rule, provenance notes, closed rows and the receipt, and the labels and alias wording match across all four children. No misses were filed. The natabula + global CLAUDE.md hand-off went to natabula as NAT-446 at the operator's direction. This closure flips CORE-EPIC-815. Changed files: `.flaitron/PLAN.md` (audit stub + parent flip + cohort move), this tasknote. Doc-drift sweep: no change for all 18 AI-referenced docs.

**Archived:** 2026-10-20
