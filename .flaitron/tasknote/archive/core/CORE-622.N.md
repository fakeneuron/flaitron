---
title: drift-ratchet-gaps audit
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-622, CORE-622.2, CORE-622.3, CORE-622.4]
---

# CORE-622.N | drift-ratchet-gaps audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-622]]

## 🎯 Goal

Verify the completed `CORE-EPIC-622` (`drift-ratchet-gaps`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. (See Implementation Notes — one entry drifted, `docs/CONVENTIONS.md`, already correctly updated by CORE-622.3.)
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — no inconsistencies found.
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `npm --prefix viz run lint`/`typecheck` both clean.
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — N/A, no misses found.
- [x] Single `feat: CORE-622.N — audit CORE-EPIC-622` (or `chore: ...` if no code edits land) commit lands — pending this closure's commit (no code edits landed → `chore:`).
- [x] PLAN.md line for `CORE-622.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-622.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-622` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-622.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-622]] — parent epic (drift-ratchet-gaps)
- [[CORE-622.2]] — skill-directory-budget-row
- [[CORE-622.3]] — section-citation-resolver
- [[CORE-622.4]] — viz-shared-pure-node-guard

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (CORE-622.2, .3, .4) closed 2026-09-20; no open siblings (Step 2 walk of PLAN.md found none). The epic-audit shape applies per SPEC/epic.md — cohort touched a shared surface (`.github/workflows/ci.yml` edited by all three children) that warrants a coherence check.

- [x] Read relevant source files — read all three archived cohort tasknotes in full (`archive/core/CORE-622.2.md`, `.3.md`, `.4.md`: Goal, Notes, Recap) plus current-state `.github/workflows/ci.yml`, `docs/CONTEXT-BUDGET.md`, `docs/CONVENTIONS.md`, `docs/GLOSSARY.md`, `claude/skills/ft-release/SKILL.md`.

- [x] **Best Practices Review** — N/A, verification-only audit pass; no new code surface introduced by this tasknote itself.

- [x] **Archive skim** — self-referential: the cohort's three archived tasknotes (`archive/core/CORE-622.{2,3,4}.md`) are the read set (Step 4 above). No prior tasknote history on the touched surfaces beyond the cohort itself and its own cited precedents (CORE-574.2, CORE-608, CORE-609, CORE-543, CORE-492, CORE-546 — all already surfaced and reconciled inside .2's and .3's own Discovery).

- [x] **Drift check** — verified live state matches each child's closure claims: `ci.yml` carries the `build` step (line 30), the Context-budget step (lines 81-105) matching .2's implementation verbatim, and Pair Q (lines 206+) matching .3's; `docs/CONTEXT-BUDGET.md`'s `ft-release/**` row is present at 125,000 budget; `claude/skills/ft-release/**` measures 122,140 at HEAD (≤ budget, consistent with .3's post-Pair-Q figure, natural growth from .2's 117,971 baseline); `docs/CONVENTIONS.md` roster reads "...and Q" and the "gap accepted" line is rewritten; `docs/GLOSSARY.md`'s `Fan-out` citation resolves (prefix match against `## Fan-out (optional)`); `claude/skills/ft-release/SKILL.md` reads "Pair A–Q". No drift found.

- [x] Logged "No clarifications needed" — cohort state is unambiguous (three closed children, no open siblings, no scope shift).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this is a verification pass with no expected file deliverable; if a fix had been required it would have been logged and `touches:` added at that point.

**Discovery Notes:**

Cohort deliverables inventoried:
- **CORE-622.2** (skill-directory-budget-row) — `docs/CONTEXT-BUDGET.md` `ft-release/**` | 125,000 directory-total row + Precedence/Ledger prose; `.github/workflows/ci.yml` + `step-7.1-standing-checks.md` gained a `*'**')` case arm summing the directory.
- **CORE-622.3** (section-citation-resolver) — new CI `drift` step + §7.1 **Pair Q**: resolves every path-bearing `§"Section"` citation in live markdown against a heading or bold-lead; retired Pairs N/O's one-file resolution halves into it; fixed five real `§"Fan-out."` citer breaks; updated `docs/CONVENTIONS.md`, `.flowtron/tasknote/README.md` (declination record), `claude/skills/ft-release/SKILL.md` roster.
- **CORE-622.4** (viz-shared-pure-node-guard) — extended `viz/eslint.config.js`'s `no-restricted-imports` `node:*` guard to the eight shared-pure modules; added `npm --prefix viz run build` to CI's `validate` job.

All three independently touched `.github/workflows/ci.yml` — the shared surface this audit checked most closely for coherence (Phase 2).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, verification-only pass; no new code shape introduced.

- [x] **Minimal refactor gate** — N/A, no fixes required (see findings below).

- [x] Implemented the minimal solution — audit found the cohort coherent; no inline fix needed.

- [x] Updated/added tests for non-trivial behavior — N/A, no code changed.

**Implementation Notes:**

**Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — walked every entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" (17 entries) against cohort commits `b9965c6`/`afb0ea6`/`6650d75`:
- `README.md` — no change
- `AGENTS.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `grok/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — updated by CORE-622.3 (roster gained Pair Q; §"Section citations..." rewritten to describe the resolver instead of "gap accepted"). Verified still accurate at HEAD.
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change
- `docs/VISION.md` — no change

Only one listed entry drifted (`docs/CONVENTIONS.md`), and it was correctly updated at CORE-622.3's own Phase 4 closure. `docs/CONTEXT-BUDGET.md`, `.flowtron/tasknote/README.md`, and `docs/GLOSSARY.md` were also touched by the cohort but are deliberately off the AI-referenced-docs list (not evaluated here; their edits were verified at each child's own closure).

**Cohort coherence inventory:**
- `.github/workflows/ci.yml` — all three children's edits coexist cleanly: `build` step (CORE-622.4) at line 30, Context-budget step (CORE-622.2) at lines 81-105, Pair Q (CORE-622.3) at lines 206+. No conflicting or duplicated steps.
- Naming/style parity — CORE-622.2's `*'**')` case arm and CORE-622.3's Pair Q both extend existing §7.1/CI idioms (case-arm dispatch, `bad=`/`exit 1` mirroring) rather than introducing new shapes. CORE-622.4's ESLint block mirrors the existing `src/ui/**` block shape.
- Cross-refs — `claude/skills/ft-release/SKILL.md`'s Pair roster reads "Pair A–Q" (current); `docs/CONVENTIONS.md`'s CI roster reads "...N, O, P, and Q" (current); `docs/CONTEXT-BUDGET.md`'s `ft-release/**` row cites CORE-622.2's own baseline (117,971) and directory measures 122,140 at HEAD — consistent growth from CORE-622.3's Pair Q addition, still under the 125,000 budget. No contradictory cross-refs found.
- `docs/GLOSSARY.md`'s `Fan-out` citation (fixed by CORE-622.3) resolves cleanly against `## Fan-out (optional)` under Pair Q's prefix-match rule.

**No regressions** — `npm --prefix viz run lint` → 0, `npm --prefix viz run typecheck` → 0 (re-run at audit time, confirms CORE-622.4's ESLint/build additions didn't regress the existing suite).

**No misses found.** No `/ft-file-followup` candidates to log — the cohort is coherent and each child's own closure claims hold at HEAD.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changed by this audit; ran the viz suite anyway as a regression check on the cohort's own changes (below).

- [x] Ran lint/type-check on changed code — N/A for this tasknote's own edits (markdown only); ran viz lint/typecheck as a cohort regression check.

- [x] **Verification receipt** — `npm --prefix viz run lint` → 0 (clean) · `npm --prefix viz run typecheck` → 0 (clean) · `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → 122,140 (≤ 125,000 budget) · `grep -n "Pair A" claude/skills/ft-release/SKILL.md` → confirms "Pair A–Q" · `grep -n Fan-out docs/GLOSSARY.md` → citation resolves against `## Fan-out (optional)`. No avoidable duplication/dead code/stale docs found in the cohort's surfaces.

- [x] (frontend) N/A — no UI change; this is a markdown-only audit tasknote.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

`npm --prefix viz run lint` → 0, no output.
`npm --prefix viz run typecheck` → 0, no output.
Both confirm CORE-622.4's ESLint `no-restricted-imports` extension and CI `build` step addition didn't regress the existing viz suite. No test suite exists for the shell-based CI/§7.1 checks (CORE-622.2, CORE-622.3) beyond the extraction-and-run verification each child already performed at its own Phase 3 closure (recorded in their archived tasknotes) — not re-run here since no code changed since.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — see Implementation Notes (one drift, `docs/CONVENTIONS.md`, already correctly reflected).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form; kept nested beneath `CORE-EPIC-622` per epic-child convention pending Step 8 parent-flip decision; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Audited the closed `CORE-EPIC-622` (drift-ratchet-gaps) cohort — three implementation children (CORE-622.2 skill-directory-budget-row, CORE-622.3 section-citation-resolver, CORE-622.4 viz-shared-pure-node-guard) — and found it coherent. Doc-drift sweep across all 17 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries found exactly one drifted entry (`docs/CONVENTIONS.md`), and it was already correctly updated by CORE-622.3's own Phase 4 closure. Cohort coherence inventory: `.github/workflows/ci.yml`'s three independent additions (context-budget `**` arm, Pair Q, `build` step) coexist without conflict; cross-refs (`ft-release/SKILL.md`'s "Pair A–Q", `CONVENTIONS.md`'s CI roster, `CONTEXT-BUDGET.md`'s `ft-release/**` row at 122,140/125,000) are all internally consistent; naming/style parity holds across all three children's additions (each extends an established idiom rather than introducing a new shape). No regressions: `npm --prefix viz run lint` and `typecheck` both exit 0. No misses found — no `/ft-file-followup` filings needed. This audit made no code edits (`chore:` commit). `touches:` reconciliation: N/A (no `touches:` declared; no file deliverable beyond this tasknote and the PLAN.md/archive closure ops). Maintainability: the cohort closes the three drift-ratchet gaps the epic was filed to close (skill-directory budget, section-citation resolution, viz shared-pure Node guard + build check) with no loose ends.

**Parent-flip:** user confirmed Yes — `CORE-EPIC-622` flipped to stub form and moved, with its four nested children (CORE-622.2, .3, .4, .N), atomically to the top of `## Completed` in this same closure commit.

**Archived:** 2026-09-20
