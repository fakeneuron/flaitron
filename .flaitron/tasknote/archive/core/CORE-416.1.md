---
title: closure-artifact-fidelity discovery
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-416, CORE-415.N, CORE-381, CORE-393]
---

# CORE-416.1 | closure-artifact-fidelity discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-416]]

> **⚠️ Superseded by [[CORE-416.2]]** — the 322-of-615 (52%) headline and its "live drift" framing were measured against a 2026-07-01 cutoff, but the obligation dates to 2026-08-01; post-rule compliance is 43/45. The `SPEC/procedures/ft-task.md` propagation gap never existed — `git blame` puts that text at the commit that created the rule.

## 🎯 Goal

Scope the `CORE-EPIC-416` epic (`closure-artifact-fidelity`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-416.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-416.2 .. CORE-416.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-416.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-416.2 .. CORE-416.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-416 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-416]] — parent epic (closure-artifact-fidelity)
- [[CORE-415.N]] — the audit that surfaced this epic (found the same defect class in 3 of 4 cohort children)
- [[CORE-381]] — `phase4-status-flip`: asserted the YAML flip and backfilled 359 archives; the backfill precedent
- [[CORE-393]] — `phase4-closure-hygiene`: folded the Acceptance tick-through into the Phase 4 closure box

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent + `.1` + `.N` filed in this session's Step 4; `## Medium` was `(none)` before this epic.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The epic was motivated by measured evidence from the `CORE-415.N` audit immediately preceding it, not by speculation: three of four children in that cohort carried closure-artifact defects, and a repo-wide scan showed the pattern is systemic and live (`CORE-412`, archived the same day, missed its status flip). The defect class has a named precedent (CORE-381) and a named contract owner (CORE-393), so the scope is well-bounded.

- [x] Read relevant source files — `SPEC.md` §"🚀 Phase 4: Closure" (`:610`), `templates/tasknote-template.md`, `SPEC/procedures/ft-task.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-close-epic/SKILL.md`, `claude/skills/ft-goal-task/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `viz/src/parser.ts`, `viz/src/ui/utils.ts`, plus archived samples (`CORE-381`, `CORE-394`, `CORE-406`, `FE-084`, `CORE-415.2`)

- [x] **Best Practices Review** — N/A for module boundaries at Discovery (deliverable is PLAN filing). Flagged for the viz child: any detection surface must sit in the existing tasknote-render path (`viz/src/tasknote.ts`), not a new parser, since `viz/src/parser.ts` is PLAN-scoped and reading tasknote-body checkbox state is a different responsibility.

- [x] **Archive skim** — CORE-381 (`phase4-status-flip`: asserted the YAML flip, backfilled 359 archives — the backfill precedent, and itself an instance of the defect), CORE-393 (`phase4-closure-hygiene`: folded the Acceptance tick-through into the Phase 4 box — the contract owner), CORE-042.4/.5 (nav-chip flip retired; chip render-derived), CORE-415.N (the audit that surfaced this epic).

- [x] **Drift check** — clean. `SPEC.md:610` carries the tick-through wording as cited; the propagation gap at `SPEC/procedures/ft-task.md` and `claude/skills/ft-micro-task/SKILL.md` is present at HEAD. Nothing in this plan contradicts a SPEC contract — the Subtasks-exempt decision *fills* a silence rather than reversing a rule.

- [x] Asked clarifying questions — three resolved via AskUserQuestion; see "Resolved scoping" below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Measured scope (counts, not estimates)

Scanned all 614 archived tasknotes:

| Block | Notes with unticked boxes | Governed by SPEC.md:610? |
|---|---|---|
| `## ✅ Acceptance` | **322** (52%) | **yes** — "every criterion ticked or explicitly annotated" |
| `## 🧩 Subtasks` | 308 | **no** — the box names Acceptance only |
| Phase checklists | 65 | partially (per-phase boxes) |

The "explicitly annotated" carve-out absorbs only **16** notes repo-wide (unticked boxes carrying an inline `N/A` + reason, e.g. `FE-084:99`), so it does not explain the bulk. **Live, not historical:** 57 of 154 notes archived since 2026-07-01 (37%) are affected, and `CORE-412` (archived 2026-08-08) missed its `status:` flip.

**The dominant shape** is a whole `## ✅ Acceptance` + `## 🧩 Subtasks` pair left untouched while the 4-phase checklists below are fully ticked and the Phase 4 box asserts tick-through — see `CORE-381` (19 ticked / 23 unticked), `CORE-394`, `CORE-406`, `CORE-415.2`. Notably `CORE-381` — the task that asserted the status flip and backfilled 359 archives — is itself an instance.

### Shared design surface

**Contract layer.** `SPEC.md:610` is canonical. The assertion propagated to `templates/tasknote-template.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-close-epic/SKILL.md`, `claude/skills/ft-goal-task/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md` — but **not** to:

- **`SPEC/procedures/ft-task.md`** — the agent-neutral SOP that contract-only agents (Grok, Codex-via-SOP per `docs/AGENT-COMPAT.md`) read *instead of* the skills. An agent working from the SOP alone never encounters the obligation. This is the most plausible mechanism behind the drift and the highest-value single fix.
- **`claude/skills/ft-micro-task/SKILL.md`** — likely legitimate, since micro-tasknotes carry no `## ✅ Acceptance` block; to be confirmed by the contract child rather than assumed.

**Detection layer.** None exists. `viz/src/parser.ts` parses PLAN.md checkboxes only; `viz/src/ui/utils.ts:20` resolves completion from the PLAN row. Nothing reads checkbox state inside a tasknote body, which is how 322 notes accumulated unnoticed. Any new surface belongs in the tasknote-render path, not the PLAN parser.

**Constraint.** `docs/CONVENTIONS.md` §Declines rules out validators/scripts as the enforcement mechanism, so the answer is contract propagation plus visibility — not a linter.

### Resolved scoping (AskUserQuestion, 2026-08-08)

| # | Question | Resolution |
|---|---|---|
| 1 | Does `## 🧩 Subtasks` carry a tick obligation? | **Scaffolding — exempt.** Declare it explicitly in SPEC. Subtasks are a working plan that legitimately churns mid-task; Acceptance is the contract. Sets the backfill target at 322, not ~334, and makes the rule followable |
| 2 | Backfill reach | **Full archive** — all 322, matching CORE-381's 359-file precedent. No cutoff date a future reader must know about |
| 3 | Detection mechanism | **Propagate + viz surface** — close the `SPEC/procedures/ft-task.md` gap so contract-only agents see the rule, and add a viz indicator for archived notes with unticked Acceptance |

**Scope note.** Q1's answer converts a contract *silence* into an explicit exemption, which is a real SPEC edit and not merely a measurement decision — it belongs in the contract child alongside the propagation fix.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the cohort-children filing pattern used by `CORE-EPIC-415` and `CORE-EPIC-410`: 2-space indent under the parent, `[model]` tag on every line, em-dash separator, per-child description ≤50w target / 70w hard cap, children inserted between `.1` and the terminal `.N`.

- [x] **Minimal refactor gate** — N/A (pure PLAN.md filing; no code path touched).

- [x] Implemented the minimal solution — three child lines (`CORE-416.2`–`.4`) written under `CORE-EPIC-416`, between the `.1` and `.N` lines.

- [x] Updated/added tests for non-trivial behavior — N/A (no executable surface).

**Implementation Notes:**

- **3 child lines filed**; word counts 33w / 32w / 36w — all under the 50w target.
- **M unchanged** from the filing-time estimate (M=3). The `.N` audit line was reviewed and left exactly as filed: this Discovery surfaced no scope shift that changes the audit's fixed doc-drift shape.
- **Child sequencing is load-bearing.** `.2` (contract) must precede `.4` (backfill), because the Subtasks-exempt decision determines what `.4` actually backfills — 322 Acceptance-only, not ~334. Filing them out of order would have `.4` applying a rule `.2` had not yet settled.
- **Per-child model tokens:** `.2` `[heavy]🧠` (contract design), `.3` `[medium]🧩` (viz surface in an existing render path), `.4` `[light]🔧` (mechanical once `.2` lands). Operator was offered `[medium]🧩` for `.4` on volume grounds and kept `[light]🔧`.
- **Downstream-impact reconciliation scan: no downstream impact.** The active PLAN sections contain only this epic's own cohort (`## Medium` held `(none)` before this filing; `High` / `Low` / `Future Opportunities` are empty). No existing line was read against, edited, or nested.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable surface touched).

- [x] Ran lint/type-check on changed code — N/A (markdown-only); markdown mental-pass recorded in Testing Notes.

- [x] **Quality assertions** — N/A (no code changed).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; PLAN.md text only).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space child indent preserved on all five nested lines (verified by grep — 5 matches); bold `**CORE-416.x**` IDs intact; `[model]` tag present on every line; `| shortname` segments all ≤30 chars (`tick-through-contract` = 21, `viz-closure-drift-surface` = 25, `acceptance-backfill` = 19); em-dash separators consistent; no trailing whitespace anywhere in the file; children correctly placed between `.1` and the terminal `.N`; no existing lines touched (reconcile scan clean).

Note on word-counting: a naive `sed 's/.*— //'` under-counts `.3` (reports 8w) because that description contains a legitimate mid-sentence em-dash. Counted by hand instead — 32w. Worth recording so a future reader does not mistake the artifact for a short line.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs" (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`): **no change** — pure Discovery filing. The contract edits this epic implies (`SPEC.md:610`, `SPEC/procedures/ft-task.md`) are `CORE-416.2`'s deliverable and deliberately do not land here.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-416` in `## Medium` per SPEC/epic.md §"Child placement invariant", tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip: PLAN.md edit + tasknote scaffold/archive only; no frontend/privileged surface)

**Final Summary:**

Filed `CORE-EPIC-416` (`closure-artifact-fidelity`) and closed its Discovery. The epic addresses a defect the immediately-preceding `CORE-415.N` audit surfaced in three of four cohort children, then confirmed as systemic.

**Scoped from measurement, not estimate.** Scanning all 614 archived tasknotes: **322 (52%) carry unticked `## ✅ Acceptance` criteria** — the block `SPEC.md:610` actually governs — while its "explicitly annotated" carve-out absorbs only 16 notes repo-wide. The drift is live, not historical debt: 57 of 154 notes archived since 2026-07-01 are affected, and `CORE-412` (archived 2026-08-08) missed its `status:` flip. The dominant shape is a whole Acceptance + Subtasks pair left untouched while the phase checklists below are fully ticked and the Phase 4 box asserts tick-through. `CORE-381` — the task that asserted the status flip and backfilled 359 archives — is itself an instance.

**Two structural findings drove the child split.** First, the tick-through assertion CORE-393 added to `SPEC.md` propagated to the template and four skills but **not** to `SPEC/procedures/ft-task.md`, the agent-neutral SOP that contract-only agents read *instead of* the skills — the most plausible mechanism behind the drift and the highest-value single fix. Second, **no detection surface exists**: `viz` parses PLAN.md checkboxes but never reads checkbox state inside tasknote bodies, which is how 322 notes accumulated unnoticed.

**Three scoping decisions resolved with the operator.** `## 🧩 Subtasks` is declared **working scaffolding, exempt** from tick-through — converting a contract silence into an explicit exemption and setting the backfill target at 322 rather than ~334. Backfill reaches the **full archive**, matching CORE-381's precedent, so no cutoff date burdens a future reader. Detection is **propagation + a viz surface**, respecting `docs/CONVENTIONS.md` §Declines, which rules out a validator.

**Children filed:** `.2` `tick-through-contract` ([heavy]🧠, 33w), `.3` `viz-closure-drift-surface` ([medium]🧩, 32w), `.4` `acceptance-backfill` ([light]🔧, 36w); `.N` audit confirmed as-filed. Sequencing is load-bearing — `.2` must precede `.4`, since the Subtasks-exempt decision determines what `.4` backfills. M unchanged at 3; no downstream PLAN impact (the active sections held nothing but this cohort).

**Archived:** 2026-08-08
