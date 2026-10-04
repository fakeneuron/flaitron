---
title: harness-value-review audit
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-565, CORE-565.1, CORE-565.2, CORE-565.3, CORE-565.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flowtron/PLAN.md
  - .flowtron/tasknote/CORE-565.N.md
  - .flowtron/tasknote/archive/core/CORE-565.1.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-565.N | harness-value-review audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-565]]

## 🎯 Goal

Verify the completed `CORE-EPIC-565` (`harness-value-review`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. — 18 / 18 walked in Phase 4; no change on every entry
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — including the `.1` spec addendum: the three verdict tables (`.2` §B, `.3` §E, `.4` §B) use one bar, and no `.3` contract declaration contradicts a `.2` trim — Discovery Notes §B
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — every cohort Acceptance verify command re-run at HEAD — 31 / 31 green, Discovery Notes §C
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — two findings (F1 fixed inline, F2 operator heads-up); zero filing candidates
- [x] Single `chore: CORE-565.N — audit CORE-EPIC-565` commit lands — `chore:` because the only edit is a placeholder deletion in an archived note
- [x] PLAN.md line for `CORE-565.N` flipped to stub form `Completed 2026-09-10.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-565.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-565` to `Completed` and moving the cohort to `## Completed` — decision recorded in the Final Summary

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables; one-bar check across the three verdict tables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-565.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-565]] — parent epic (harness-value-review)
- [[CORE-565.1]] — Discovery: Constitution, Specification (incl. the `.N` one-bar addendum), Q0–Q7
- [[CORE-565.2]] — lifecycle-value: `SPEC.md` / `ft-task` trims, two fragment fixes, filed CORE-566–569
- [[CORE-565.3]] — caobunga-contract-fit: `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers", `SPEC/blocked.md` correction, ledger row, three CBN rows
- [[CORE-565.4]] — roster-onboarding-value: six onboarding fixes, filed CORE-570–573, CORE-569 Blocked-by reconcile

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-565` active under `## High`; `.1`–`.4` all `[x]` (each `Completed 2026-09-10.`); `.N` is the canonical audit child; no early-audit decision needed

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-565.N` with the full cohort closed the same day. Four children landed in four commits (`ca65995`, `4533bd8`, `a5da3e0`, `6d77618`) across 19 deliverable files and three contract surfaces, plus eight filed PLAN rows; nobody has yet read the three verdict tables against each other or re-run the children's acceptance commands after the later siblings edited nearby surfaces. The `.1` spec addendum for this audit (one bar across three tables; no `.3` declaration contradicting a `.2` trim) is a judgment only this synthesis can make.

- [x] Read relevant source files — the four archived cohort notes in full; at HEAD: `docs/EXTERNAL-AGENTS.md` §"The Orchestration Contract" + §"Stable surfaces for callers", `SPEC/blocked.md` §"Resuming an interrupted run", `SPEC/versioning.md`, `claude/AGENTS-snippet.md` paste-block pin bullet, `claude/skills/ft-update/SKILL.md` Step 4.5, `docs/AGENT-NEUTRALITY.md` ledger row, `docs/PLATFORMS.md` posture rows, `claude/CAPABILITIES.md` stamp, `README.md` docs list, `.flowtron/tasknote/README.md`, the Pair E / installed-surface / self-wiring recipes in `claude/skills/ft-release/step-7.1-*.md`. No probe — the read set was the cohort's own `touches:` lists.

- [x] **Best Practices Review** — `N/A`: verification pass over markdown deliverables; no code boundary. The one structural rule checked is the cohort's own (cite-don't-restate with the [[CORE-558.N]] qualifier; owner-naming rows that copy nothing).

- [x] **Archive skim** — self-referential: the cohort children *are* the archive entries in scope, read in full. Their own skims cover the non-cohort history ([[CORE-558.N]], [[CORE-473.6]], [[CORE-494]], [[CORE-533]], [[CORE-349.5]], [[CORE-420.N]]); nothing re-read. `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`).

- [x] **Drift check** — §C below: every cohort acceptance command re-run green at HEAD; every section anchor the new stable-surfaces table cites resolves; the two release-gate roster checks and the self-wiring check produce no output. The PLAN line for `.N` matches the `.1` spec addendum; no SPEC contract is contradicted by the one inline fix.

- [x] Asked clarifying questions — **No clarifications needed.** Assumptions: (1) the full cohort is in scope (no early audit); (2) a stray scaffold placeholder in an archived note is scaffold residue, not history, so deleting it does not violate `AGENTS.md` §"Editing Rules" (the audit is the workflow step that verifies cohort deliverables); (3) caobunga-side facts are taken from the cohort's own records — no caobunga path is read this session.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (three paths)

**Discovery Notes:**

### A. Cohort inventory

| Child | Deliverable | Files | Filed |
|---|---|---|---|
| [[CORE-565.1]] discovery (`--deep`) | Constitution (7 constraints, 5 invariants), per-child Specification, Q0–Q7; three child lines; Fan-out Sequential `.2` → `.3` → `.4`, Synthesis `.N` | `PLAN.md` | — |
| [[CORE-565.2]] lifecycle-value | 35-row gate/cue ledger (keep every gate; trim narrative); `SPEC.md` −2,071 chars (9 trims, cap held 57,000), `ft-task/SKILL.md` −1,450 (3 trims); `step-3c` now clears `park-reason:` on resume; `step-1.5` roster copy → cite | `SPEC.md`, `ft-task/SKILL.md`, two fragments, `PLAN.md` | CORE-566 (`model.md` trim), CORE-567 (`park-reason:` home, after `.3`), CORE-568 (template blockquote), CORE-569 (`ft-goal-task` restatement) |
| [[CORE-565.3]] caobunga-contract-fit | `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" (10 rows + 5 out-of-contract); step 6 "Two caller paths"; `SPEC/blocked.md` "dead end" corrected; `AGENT-NEUTRALITY.md` ledger row; README one-liner refreshed; three ready-to-paste CBN rows | `docs/EXTERNAL-AGENTS.md`, `SPEC/blocked.md`, `docs/AGENT-NEUTRALITY.md`, `.flowtron/tasknote/README.md` | (caobunga-side only) |
| [[CORE-565.4]] roster-onboarding-value | 19-row roster verdict table (14 keep, 1 merge, 4 demote); 8-step onboarding walk; six fixes (global `mkdir -p` ×3 surfaces, pin claim ×2 surfaces, `ft-update` 4.5 dir-symlink test, template README archive-folder sentence, `ft-flowtron` adopter path, `ft-new-project` Step 6) | `README.md`, `docs/MIGRATION.md`, `SPEC/versioning.md`, `claude/AGENTS-snippet.md`, three skill bodies, `templates/tasknote-README.md`, `PLAN.md` | CORE-570 (starter→followup merge), CORE-571 (goal-task demote), CORE-572 (worktree pair demote), CORE-573 (ft-spec demote); CORE-569 gained `Blocked by [[CORE-571]]` |

### B. Coherence pass

- **One bar across the three verdict tables (the `.1` addendum).** `.2` §B: "catches a mistake the solo reviewer would otherwise ship / preserves a decision / makes a run resumable" (Constitution #1 + VISION §"Who it's for"). `.3` §E: "complete, stable, verified against the actual reader, no larger than the caller needs" (Constitution #3). `.4` §B: "a solo developer *reaches for it* — run evidence, not mentions" (Constitution #1). All three trace to the `.1` Constitution and each table records cost / what it earns / verdict + reason as the shared shape demanded. **Consistent.**
- **No `.3` declaration contradicts a `.2` trim.** `.2`'s nine `SPEC.md` trims were narrative (nav-chip story, probe rationale, drift narrative, closure-ops restatement, "five seconds" tail, Subtasks-exempt meta-sentence, `/ft-close-epic` aside, `/ft-spec` cross-ref, `InvisiPaw FE-64`). `.3`'s ten owner citations — §"Task-line format", §"Tasknote frontmatter" → "Park reason", §"Task ID convention", §"Paper-complete guard", `SPEC/plan-parser.md` §"Long-description conventions", `SPEC/tasknote-selection.md` §archive convention + §rotation, `SPEC/blocked.md`, the two templates — all resolve at HEAD (§C). **No contradiction.**
- **`.4` against `.3`.** `.4` touched no probe path, template label, or grammar; its `SPEC/versioning.md` rewrite is cited by `.3`'s table preamble ("a change to a stable surface is a versioned release (SPEC/versioning.md)") and the rewritten module still says exactly that. **Consistent.**
- **Naming / style.** All eight filed rows share one shape (`[model]glyph | shortname — … Filed by CORE-565.x.`); all four child stubs are `Completed 2026-09-10.` nested at 2 spaces; `[heavy]🧠` on every cohort line. `CORE-567`'s "run after CORE-565.3 declares the stable surfaces" is now satisfied and reads as a sequencing note, not stale.
- **Cross-repo numbering — finding F2.** `.3` numbered its ready-to-paste rows CBN-148..150 from "next free ID at read time: CBN-148". `.4`, later the same day, records "the adopter's own `CBN-150` (stale pin pointer)" as an existing caobunga row. So at least `CBN-150` is taken; the `.3` rows need renumbering from caobunga's actual next free ID at paste time. Not verifiable from here (no caobunga path approved this session); recorded as the cohort's own records state it.
- **Archive hygiene — finding F1.** `CORE-565.1.md` (archived) carried `**Archived:** 2026-09-10` followed two lines later by the template's literal `**Archived:** YYYY-MM-DD` — scaffold residue the `.1` closure never removed. `.2`–`.4` are clean. The unflipped `🟢 In progress` nav chip in all four is by design (render-derived since CORE-042.4). Unticked `## 🧩 Subtasks` boxes in `.2`–`.4` are exempt by contract (`.2` T7 kept that rule).

### C. Drift check (regression re-run at HEAD)

- `.2`: `SPEC.md` 53,824 (≤ 53,900); `ft-task/SKILL.md` 29,411 (< 30,000); `Read <SKILL_DIR>/` imperatives 2; `step-3c` names `park-reason`; `gemini-flash` in `step-1.5` → 0; `CORE-56[6-9]` rows 4. **9/9 green.**
- `.3`: `## Stable surfaces` present; `unattended-mode.md` named; fragment exists; `--unattended` 12 / 16; `dead end` → 0; `Two caller paths` / `Suggested next task` / `Follow-up` / `PLAN-ARCHIVE` / `Final Summary` all present; adopter names in `SPEC.md` / `SPEC/blocked.md` / `docs/EXTERNAL-AGENTS.md` → 0 / 0 / 0; ledger row present. **11/11 green.**
- `.4`: `CORE-57[0-3]` 5; skills 19; `ln -s` 24; `mkdir -p` 1 / 2; `tasknote/README.md` in `SPEC/versioning.md` → 0; `for the pinned version` → 0; `describe --tags` present; `dirname` present; template README sentence present; `ft-flowtron` adopter path present; info-screen rows 19 = 19; Pair E row diff empty; installed-surface derivation 5/5 diffs empty; self-wiring skills/commands diffs empty, no dangling or non-symlink entries; adopter names on the four edited surfaces → 0. **11/11 green.**
- Anchors cited by the new stable-surfaces table: `SPEC/plan-parser.md` §"Long-description conventions" (:111); `SPEC/tasknote-selection.md` §archive convention (:251), §rotation (:289), §"Filing commits" (:143) + "Unattended filing authority" (:221); `SPEC.md` §"Task ID convention" (:33), §"Post-closure protocol" (:675), §"Versioning" (:817), "Park reason" (:198); `SPEC/gates.md` §"`--fast` operator override" (:312), §"`--unattended` operator posture" (:362), §"`/ft-close-epic` under the posture" (:499); `docs/MIGRATION.md` §"Pinning and bumping" (:498). **All resolve.**
- Wider stale-claim scan: no "records the pinned version" claim survives anywhere in the sweep set or the three sibling snippets (`codex/` / `cursor/` / `grok/` carry no paste-block pin bullet at all); no `dead end` wording elsewhere in `SPEC.md`, `SPEC/`, `docs/`, or `ft-task/`; `SPEC.md`'s `interrupted` row already says "the one code a *caller* writes".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass; the one edit deletes a line and introduces no shape.

- [x] **Minimal refactor gate** — no refactor; one-line deletion in the touched path, nothing adjacent reworded.

- [x] Implemented the minimal solution — one inline fix (F1); one operator heads-up (F2); no `/ft-file-followup` candidates.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown; no code surface).

**Implementation Notes:**

- **Cohort inventoried** — four children, 19 deliverable files, three contract surfaces edited (`SPEC.md`, `SPEC/blocked.md`, `SPEC/versioning.md`), eight PLAN rows filed, one Blocked-by reconcile; details in Discovery Notes §A.
- **Coherence** — the three verdict tables share the `.1` bar; no `.3` declaration cites anything `.2` trimmed; `.4` touched no `.3`-declared surface; naming and stub form uniform across the cohort (§B).
- **Regressions** — none: 31/31 cohort acceptance commands green at HEAD, both release-gate roster checks and the self-wiring check clean, all 13 cited anchors resolve (§C).
- **F1 — inline fix applied.** `.flowtron/tasknote/archive/core/CORE-565.1.md`: deleted the stray `**Archived:** YYYY-MM-DD` template placeholder that sat two lines below the real stamp (−2 lines). Scaffold residue, not a historical record; the audit is the workflow step that verifies cohort deliverables, so `AGENTS.md` §"Editing Rules" is honored, not bent.
- **F2 — operator heads-up, no flowtron filing.** `.3`'s three ready-to-paste CBN rows are numbered CBN-148..150; `.4` records that caobunga's own `CBN-150` (stale pin pointer) already exists. When pasting from caobunga's session, renumber from caobunga's actual next free ID. Caobunga-side only — flowtron never writes into caobunga (`.1` Q3), and an archived tasknote's proposal numbers are a record, not a contract.
- **`/ft-file-followup` candidates:** none. Every miss the cohort surfaced is already a filed row (CORE-566–573); the audit surfaced nothing new that belongs in `PLAN.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; `viz/` and `tools/` untouched)

- [x] Ran lint/type-check on changed code — N/A; substituted `git diff --check` and the regression re-run recorded in Discovery Notes §C

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
cohort acceptance re-run (.2 ×9, .3 ×11, .4 ×11)                       → 31 / 31 green (Discovery Notes §C)
Pair E row-coverage diff                                                → 0, empty
installed-surface derivation (5 diffs)                                  → 0, empty ×5
self-wiring parity (2 diffs + dangling + non-symlink scans)             → 0, no output
13 section anchors cited by §"Stable surfaces for callers"              → all resolve
grep -c '^\*\*Archived:\*\*' archive/core/CORE-565.1.md                 → 1 (was 2)
git diff --check                                                        → 0
git diff --name-only                                                    → .flowtron/tasknote/archive/core/CORE-565.1.md (before closure ops)
git diff | grep -cE 'API_KEY|SECRET|TOKEN|PASSWORD'                     → 0 (keyword clause clear)
```

**Structural assertions (changed prose):** one deletion, no addition — no duplication, dead prose, public-surface growth, or stale code-facing docs can result.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Cumulative pass over the whole cohort, not one slice: `README.md` no change (Quickstart `mkdir -p` landed in `.4`; the EXTERNAL-AGENTS descriptor covers the new section at summary level) · `AGENTS.md` no change (roster names and path conventions untouched by the cohort) · `SPEC.md` no change (`.2`'s trims verified at 53,824; every rule the cohort cites still resolves) · `docs/MIGRATION.md` no change (`.4`'s §1.0 / §1.2.2 edits verified; §"Pinning and bumping" resolves; no residual pin-in-README claim) · `claude/AGENTS-snippet.md` no change (`.4`'s pin bullet verified; `ln -s` block 24 lines, derivation diffs empty) · `codex/AGENTS-snippet.md` no change (derives the wiring block; carries no pin bullet) · `cursor/AGENTS-snippet.md` no change (same) · `grok/AGENTS-snippet.md` no change (same) · `docs/CONVENTIONS.md` no change (cite-don't-restate and §"Verify behavioral claims…" applied by the cohort, not amended) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (`.3`'s ledger row present and accurate; `.4` named no new `claude/` path from the contract layer) · `docs/PLATFORMS.md` no change (posture rows still describe `unattended-mode.md` as the shared fragment, matching the probe row; installed-surface policy unchanged until a filed decision executes) · `claude/CAPABILITIES.md` no change (stamp `v5.26.0 · 2026-09-09`; no bump and no flag change in the cohort) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (`.3`'s section verified; all cited anchors resolve; nothing `.4` did touches a declared surface) · `docs/WORKTREES.md` no change (CORE-572 is a decision row; convention unchanged) · `docs/VISION.md` no change (two-project precedent applied, not amended) — **18 / 18, no change.**

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audited the four-child `harness-value-review` cohort and found it coherent: the three verdict tables measure the same thing (cost to a solo reviewer against a mistake caught, a decision preserved, or a run made resumable — the `.1` Constitution's bar), no `.3` contract declaration cites anything `.2` trimmed, `.4` touched no `.3`-declared stable surface, and every one of the 31 acceptance commands the children recorded still passes at HEAD after the later siblings edited nearby surfaces. The two release-gate roster checks and the self-wiring check produce no output, and all 13 section anchors the new §"Stable surfaces for callers" table cites resolve.

Two findings, neither a PLAN row. **F1** — the archived `.1` note carried the template's literal `**Archived:** YYYY-MM-DD` two lines below its real stamp; deleted inline as scaffold residue. **F2** — `.3`'s three ready-to-paste CBN rows are numbered CBN-148..150, but `.4` records that caobunga's own `CBN-150` already exists; renumber from caobunga's actual next free ID when pasting. Every miss the cohort itself surfaced is already a filed decision row (CORE-566–573), so the audit files nothing new.

**Doc-drift sweep:** 18 / 18 walked cumulatively; no change on every entry.

**Parent-flip decision:** Yes (operator, at the 📦 gate) — `CORE-EPIC-565` flipped to stub form and the six-line cohort moved atomically to the top of `## Completed`; `## High` restored to `(none)`. Committed with the audit closure.

**Evidence.** 1 deliverable file: `.flowtron/tasknote/archive/core/CORE-565.1.md` −2 lines; plus `.flowtron/PLAN.md` (stub flip) and this tasknote (scaffold → archive). Verification in Testing Notes: 31 / 31 cohort commands green, 3 roster/wiring checks clean, 13 / 13 anchors resolve, 18 / 18 doc-drift no change, `git diff --check` clean, keyword clause clear. `touches:` reconciliation: declared 3 paths; `git diff --name-only` shows exactly those 3 — **no undeclared paths**. Maintainability effect: the cohort's 19 deliverable files are confirmed to sit together after four same-day commits, the one stray scaffold line is gone from the archive, and the operator has a one-line correction to apply before routing the caobunga rows.

**Archived:** 2026-09-10
