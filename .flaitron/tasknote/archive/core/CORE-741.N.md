---
title: effort-tiers audit
status: completed
tags: [model, effort, frontier, audit]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-741.1, CORE-741.2, CORE-741.3, CORE-741.4, CORE-741.5]
touches:
  - docs/AGENT-NEUTRALITY.md
---

# CORE-741.N | effort-tiers audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Verify the completed `CORE-EPIC-741` (`effort-tiers`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — stale-claim greps in Discovery Notes print nothing; content `judgment`
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `bash tools/drift-checks.sh`, `node --test tools/drift-checks.test.mjs`, `npm --prefix viz test`, `npm --prefix viz run typecheck`, `npm --prefix viz run lint` each → 0
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-741.N — audit CORE-EPIC-741` (or `chore: ...` if no code edits land) commit lands (`chore:`, docs-ledger edit only, no code)
- [x] PLAN.md line for `CORE-741.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-741.N.md`
- [x] Parent-flip prompt surfaced after audit closure — user confirms or declines flipping `CORE-EPIC-741` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-741.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: prompt the user in the 📦 bundle; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers)
- [[CORE-741.1]] — cohort child: Discovery (scoping table + approved map)
- [[CORE-741.2]] — cohort child: `[frontier]`💎 contract rung
- [[CORE-741.3]] — cohort child: PLATFORMS tier × platform map
- [[CORE-741.4]] — cohort child: routing-skill sweep + `model @ effort` print rule
- [[CORE-741.5]] — cohort child: viz parser + ModelChip 💎

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-741` active under `## High`; children `.1`–`.5` all `[x]` (closed 2026-10-08); `.N` the audit, `[heavy]` (Opus session satisfies it).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-task CORE-741.N` invoked; pre-flight clean. All five children closed, so this is a full-cohort audit, not an early one.

- [x] Read relevant source files — archived `CORE-741.1`–`.5` (Goal, Acceptance, Discovery/Implementation/Testing Notes, Final Summary); cohort commits `fa60c9f4`, `55a9f021`, `6a0ffb71`, `79b520d7`, `270681f1` (`git show --stat`); `SPEC/model.md` ladder, calibration, §"Effort recommendations", triggers, glyph mirror; `docs/PLATFORMS.md` §"Tier × platform map"; `SPEC/post-closure.md` step 2; `SPEC/cue-vocabulary.md` next-task table; `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers"; `docs/AGENT-NEUTRALITY.md` rows 44/52/58; `claude/skills/ft-close-epic/SKILL.md` (audit shape).

- [x] **Best Practices Review** — N/A: a verification pass; the one inline fix is a ledger-row edit, no code surface.

- [x] **Archive skim** — `archive/core/` (README row `CORE-*` → `archive/core/` confirmed). Cohort notes are the archive entries; their own skims covered the non-cohort history (CORE-EPIC-482 `[xheavy]` precedent, CORE-550 ASCII-fallback lesson, CORE-489.2 mirror-miss pattern, FE-108 viz glyph).

- [x] **Drift check** — every path the cohort cites exists at HEAD `270681f1`; the PLAN line matches `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" (the line's own parenthetical).

- [x] No clarifications needed. Assumptions: audit scope is the five-child cohort as filed; the parent flip is offered in the 📦 bundle (this run is `/ft-task`, which has no parent-flip step of its own, so the prompt borrows `/ft-close-epic` Step 8's shape rather than leaving the cohort to a manual flip).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Cohort inventory.**

- **.1** (Discovery) — filed .2–.5; resolved-scoping table (11 rows) + approved map. Handoffs: .2 decide round-up reach (→ stops at `[heavy]`); .4 check `docs/EXTERNAL-AGENTS.md` stable-surface rows for the chooser-cap change.
- **.2** — `SPEC/model.md`: ladder `light < medium < heavy < frontier < xheavy`, chooser cap `[frontier]`, `fable` bands frontier, §"Effort recommendations", §"When to choose `[frontier]`". Mirrors: SPEC.md, cue-vocabulary, gates, unattended-candidacy, GLOSSARY, AGENT-COMPAT, AGENT-NEUTRALITY rows 44/52, DOGFOOD.
- **.3** — `docs/PLATFORMS.md` §"Platform×model×effort calibration table" split into `### Tier × platform map` (5 tiers × Claude Code / Codex / Grok Build) + `### Family roster` (`fable` → frontier). Handoff to .4: Codex effort + model-switch rows.
- **.4** — print rule ("Printing a cell") in `SPEC/model.md`; `SPEC/post-closure.md` candidate suffix `· <model @ effort>` + label `then run on <model @ effort>:`; step-1.5 edge fragment; `/ft-epic-discovery` `.1`/`.N`/child caps; `ft-audit` / `ft-audit-repo` / `ft-refactor` trigger clause; mirrors in CAPABILITIES, PLATFORMS, GLOSSARY, README, procedures, `ft-release`.
- **.5** — viz `SUGGESTION_GLYPH` accepts 💎; `ModelChip` 💎 for `frontier`/`fable`/`mythos`; fixtures FX-125/126/226/227; `SPEC/plan-parser.md`.

**Stale-claim sweep** (`git grep` over the live tree, archive / PLAN-ARCHIVE / VERSION-HISTORY / PLAN excluded):

- Ladder without `frontier` (`heavy *< *xheavy`) → none.
- Chooser cap at `[heavy]` without a `frontier` mention → none.
- Old label `Clear your session, then run:` → none (the no-pick fallback is stated in prose only).
- Rung/glyph counts → `SPEC.md` "five-rung", `SPEC/model.md` "five-rung" / "five values", GLOSSARY "Five rungs" — all current. (`useKeyboardNav.test.ts` "four-rung" is an unrelated precedence chain.)
- 🔭 / `XHEAVY` lines without 💎 / `FRONTIER` → single-row table/list entries, fixtures, and viz tests whose surrounding list carries 💎 (cue-vocabulary table, DOGFOOD list, model.md glyph mirror); none is a glyph enumeration missing frontier.
- `fable` banded heavy / 🧠 → only `parser.test.ts:408`, a decorative-glyph tolerance test (glyph dropped by design), not a banding claim.
- Every printed `model @ effort` example (`SPEC/model.md`, `SPEC/post-closure.md`, `CAPABILITIES.md`, step-1.5 fragment) matches the map under the print rule (`Opus @ high` heavy, `Opus @ medium` medium, `Fable @ xhigh` frontier, `⚠️ Grok @ xhigh`).
- Codex wrappers: `grep -rlE 'heavy\]|xheavy|🧠|frontier' codex/` → exit 1 (no tier text; they route to canonical bodies).
- Label-line mirrors (`then run on <model @ effort>:`) consistent across post-closure, CAPABILITIES, `ft-refactor`, `ft-release`, GLOSSARY, README.

**.1 → .4 handoff (stable surfaces).** .4's note does not record the `docs/EXTERNAL-AGENTS.md` check .1 asked for, so it runs here. No stable-surface row moved, renamed, or retired: the chooser cap is not a listed surface; the next-move print is explicitly out of contract (transcript prose); the `[model]` grammar is token-agnostic (`[a-z][\w.-]*`), so `[frontier]` parses for any caller. The 💎 decorative glyph is a grammar tolerance addition — covered by the "Task-line grammar" row's re-verify-on-every-pin-bump rule, a release-notes fact, not a caller-side filing (`SPEC.md` §"Cross-repo edit remit").

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass; the inline fix follows the ledger's own precedent of naming model-name examples per section with the closing task cited (row 52's CORE-303 / CORE-482.x / CORE-741.2 chain).

- [x] **Minimal refactor gate** — no refactor; one location cell widened, one citation appended, one row added.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (ledger prose; no tooling parses the rows)

**Implementation Notes:**

- **Cohort coherence: no inconsistencies.** Naming (`[frontier]`💎, `FRONTIER`, "high-stakes — trigger-reached"), the print rule, the label line, and the caps (`[frontier]` for choosers, round-up stops at `[heavy]`, `.N` caps `[heavy]`) read the same in every surface the five children touched. No contradictory cross-refs; every .1 handoff discharged (.2 round-up reach, .3 heading kept for the five pointers, .3→.4 Codex rows, .1→.4 stable surfaces — checked here).
- **Inline fix — `docs/AGENT-NEUTRALITY.md` ledger drift.** Row 52 (`SPEC/model.md`) credited CORE-741.2, but its location cell predated §"Effort recommendations", whose "Printing a cell" bullet (CORE-741.4) names `Fable @ xhigh` / `⚠️ Grok @ xhigh`. `SPEC/post-closure.md` step 2 gained `· Opus @ high` / `· Opus @ medium` example picks (CORE-741.4) with no ledger row. Neither per-task closure caught it: the ledger is in the sweep set, but the model names arrived in sections the existing row did not name. Fix: row 52 location `+ §"Effort recommendations"` and `+ [[CORE-741.4]]` citation; new `SPEC/post-closure.md` row stating the picks are the Claude Code column and the rule prints the active platform's own.
- **Observation (optional follow-up candidate, not a miss).** `SPEC/model.md` §"When to choose `[heavy]`" lists "synthesis across … contract surfaces", while §"When to choose `[frontier]`" opens with "a change to a workflow contract". In flaitron-self, almost every task changes a workflow contract, so a chooser reading both could over-reach to `[frontier]`. The "not a trigger: ordinary design work" line is the only separator. The operator set the trigger list (CORE-741.1 Q5), so this is recorded rather than filed. Candidate if wanted: `/ft-file-followup` for a one-line "what makes contract design `[frontier]` rather than `[heavy]`" sharpener.
- **Release note fact.** The cohort adds a `[model]` tier value, a decorative glyph tolerance (💎), and a new post-closure candidate suffix. That is contract-additive and lands in the next `/ft-release`, not here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` after the ledger edit → 0

- [x] Ran lint/type-check on changed code — viz typecheck + lint (regression check, no viz edit); ledger diff checked for trailing whitespace → none

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the diff is two ledger-table lines (one widened cell + citation, one new row) beside the closure pair; too small to grade, and drift checks cover the file's structure.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (HEAD `270681f1` + this audit's ledger edit):

- `bash tools/drift-checks.sh` → 0 (all pairs `ok`; re-run after the edit → 0)
- `node --test tools/drift-checks.test.mjs` → 0 (17/17)
- `npm --prefix viz test` → 0 (29 files, 591/591)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- Stale-claim greps (Discovery Notes) → no hits outside the dispositioned single-row entries
- `grep -rlE 'heavy\]|xheavy|🧠|frontier' codex/` → 1 (no matches, as required)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry:
  - `README.md` — no change (.4's `then run on <model @ effort>:` cue quote is current)
  - `AGENTS.md` — no change (its `[model]` bullet points at `SPEC/model.md`; no tier text)
  - `SPEC.md` — no change (.2's §"Model field" five-rung text and the module pointer to the `model @ effort` rule are current)
  - `docs/MIGRATION.md` — no change (no tier text)
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change (no tier text)
  - `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated**: row 52 location + `[[CORE-741.4]]` citation; new `SPEC/post-closure.md` row for the `· Opus @ …` example picks
  - `docs/PLATFORMS.md` — no change (map, roster, and the Grok / Codex / Cursor rows from .3/.4 are current; examples match the print rule)
  - `claude/CAPABILITIES.md` — no change (effort, `/model`, `/clear` rows and the ledger line carry 💎 and the pick; the last-verified stamp is a version-bump check, not due here)
  - `docs/AGENT-COMPAT.md` — no change (`FRONTIER` is in the ASCII label list)
  - `docs/EXTERNAL-AGENTS.md` — no change (no stable-surface row moved; see Discovery Notes)
  - `docs/WORKTREES.md`, `docs/VISION.md` — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. The ledger miss is the residual risk `.flaitron/tasknote/README.md` already names: a contract change can add model-name examples in a section the ledger row does not list, and the epic-audit sweep is the catch layer, as it was here.

**Final Summary:**

Audited the five-child `CORE-EPIC-741` (effort-tiers) cohort. It is coherent. The `[frontier]`💎 rung, the tier × platform map, the `model @ effort` print rule, the label line, and the caps read the same everywhere, and every handoff between the children was discharged. One inline fix: the `docs/AGENT-NEUTRALITY.md` ledger did not cover the model-name examples .4 added (`SPEC/model.md` §"Effort recommendations", `SPEC/post-closure.md` step 2). Row 52 now names the section and cites CORE-741.4, and a new `SPEC/post-closure.md` row explains the `Opus @ …` picks. The .1→.4 `docs/EXTERNAL-AGENTS.md` stable-surface check ran here: no row moved, so no caller-side filing. Verification: drift checks 0, drift self-test 17/17, viz 591/591, typecheck 0, lint 0. Doc sweep: 17 entries no change, AGENT-NEUTRALITY updated. `touches:` reconciliation: declared `docs/AGENT-NEUTRALITY.md`; actual matches (+ the PLAN/tasknote closure pair). One optional follow-up candidate (heavy vs frontier "contract" wording) is recorded in Implementation Notes, not filed. Parent flip: confirmed — `CORE-EPIC-741` flipped to stub form and moved with its six children to the top of `## Completed`; `## High` restored to `(none)`.

**Archived:** 2026-10-08
