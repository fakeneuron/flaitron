---
title: readiness-basis
status: completed
tags: []
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-850.1, CORE-850.3, CORE-850.4, CORE-850.5]
touches:
  - SPEC/unattended-candidacy.md
  - SPEC/starter.md
  - templates/tasknote-starter-template.md
  - claude/skills/ft-file-task/starter-mode.md
  - claude/skills/ft-task/step-3a-promote-starter.md
  - .flaitron/PLAN.md
---

# CORE-850.2 | readiness-basis

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-850]] [[CORE-850.1]]

## 🎯 Goal

Define the readiness basis a starter must carry for a `[heavy]` or rendered-surface row to be admissible for `[unattended]`. Wire it into the starter template, starter promotion, and `/ft-file-task --starter`'s candidacy proposal, and make clause 1 admit `[heavy]` only on a complete basis.

## ✅ Acceptance

- [x] `SPEC/unattended-candidacy.md` has `## Readiness basis` defining facts (a)–(d) and how a basis is confirmed — `grep -q '^## Readiness basis$' SPEC/unattended-candidacy.md`
- [x] Clause 1 admits `[heavy]` only with a complete basis and cites the section — `grep -q 'Readiness basis' <(sed -n '/^## Candidacy predicate/,/^## Three postures/p' SPEC/unattended-candidacy.md)`
- [x] Starter template ships `### Acceptance that decides it` between Decisions locked and Open at promotion — `grep -q '^### Acceptance that decides it' templates/tasknote-starter-template.md`
- [x] `/ft-file-task --starter` S3 shows the basis and proposes the token on `[heavy]` only when complete, with a labeled mirror and the literal (Pair N) — `bash tools/drift-checks.sh pair_n`
- [x] Promotion seeds `## ✅ Acceptance` from the subsection verbatim — `grep -q 'Acceptance that decides it' claude/skills/ft-task/step-3a-promote-starter.md && grep -q 'Acceptance that decides it' SPEC/starter.md`
- [x] `.3`'s PLAN line amended to own rendered-surface admission under clause 3 — `grep -q 'rendered-surface' <(grep 'CORE-850.3\*\*' .flaitron/PLAN.md)`
- [x] Heavy brief with a complete basis proposes the token; an incomplete one does not — `judgment`: a paper walk of the S3 rule over two drafted briefs, recorded in Testing Notes (no executable filer)
- [x] Drift checks green — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`

## 🧩 Subtasks

- [x] Write `## Readiness basis` in `SPEC/unattended-candidacy.md` (after §"Candidacy predicate"); minimal clause-1 edit citing it
- [x] Add `### Acceptance that decides it` to `templates/tasknote-starter-template.md`
- [x] `starter-mode.md` S3: show the basis, propose on `[heavy]` only when complete; labeled mirror + literal
- [x] `step-3a-promote-starter.md` + `SPEC/starter.md`: seed Acceptance verbatim; sub-heading list updated
- [x] Amend `.3` PLAN line (rendered-surface admission under clause 3)
- [x] Phase 3: drift checks, paper walk, external review

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-850.1]] — Discovery; Specification `.2` and Clarifications are the contract
- [[CORE-850.3]] — cites this section; owns the rest of clause 1 and rendered-surface admission under clause 3
- [[CORE-850.4]] — seeder `scope` drafts this basis
- [[CORE-850.5]] — runner enforces `touches:` and reads criterion (d)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** First implementation child of CORE-EPIC-850; its PLAN line and the `.1` Specification still match HEAD (clause 1 still fails `[heavy]`; starter template has no acceptance subsection).

- [x] Read relevant source files — `SPEC/unattended-candidacy.md`, `templates/tasknote-starter-template.md`, `SPEC/starter.md`, `claude/skills/ft-file-task/starter-mode.md` + host `SKILL.md` Step 3, `claude/skills/ft-task/step-3a-promote-starter.md`, `SPEC.md` §"🧪 Phase 3" (verify-command rule), `tools/drift-checks.sh` `pair_n`, `docs/CONTEXT-BUDGET.md` lazy-module row.

- [x] **Best Practices Review** — module boundary: the predicate lives once (Constitution principle 3), so the clause-1 admission lands in the module and `starter-mode.md` carries a labeled mirror, not its own rule.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). Grep hits: starter template 33, `SPEC/starter.md` 23, `starter-mode.md` 14, `step-3a` 13 — mostly incidental. Load-bearing: CORE-850.1 (Specification `.2`, Clarifications, stated assumptions), CORE-812.3 (seeder writes starters from the template — a new sub-heading must stay optional), CORE-783.3 (prep taxonomy home). `viz/src/tasknote.test.ts` carries its own inline starter fixture; it does not read the template.

- [x] **Drift check** — PLAN line matches `.1` Specification `.2`. Two gaps found and resolved below: clause 1 rejects `[heavy]` at HEAD, so the S3 proposal would be inert; and no child owned clause 3's rendered-surface admission.

- [x] Asked clarifying questions — answered 2026-10-31: (1) minimal clause-1 edit lands in `.2`; `.3` keeps concrete-name tiers, frontier exclusion, clause-3 precision, never-autonomous set, and mirror re-resolution. (2) Rendered-surface admission under clause 3 goes to `.3`; amend its PLAN line now. (3) Promotion seeds `## ✅ Acceptance` from `### Acceptance that decides it` verbatim.

  Assumptions: a basis is required only for rows above `[moderate]` or rows that change a rendered surface; "confirmed" means kept at an operator filing gate (`--starter` S3, seeder Step 3); the subsection is optional in the template like every other sub-heading; `docs/CONTEXT-BUDGET.md` lazy rows are re-measured at release, not here.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Fan-out: `.2` is named only as a predecessor (`.3` and `.5` after `.2`); no `blocked-by:` / `parallel-safe-with:` echo for this note.
- Pair N binds any `claude/skills/` file naming `SPEC/unattended-candidacy.md`: adding the citation to `starter-mode.md` requires the `unattended-candidates:` literal and a `mirror of` label there.
- `SPEC/procedures/ft-task.md` delegates promotion to `step-3a-promote-starter.md`; no agent-neutral mirror to update.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: a new `## ` module section next to §"Candidacy predicate"; a starter `### ` sub-heading in the template's existing run; a labeled mirror in `starter-mode.md` S3, matching the host `SKILL.md` Step 3 mirror

- [x] **Minimal refactor gate** — no refactor; edits only add to, or extend, the touched paragraphs

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: contract prose; Pair N already binds the new mirror (it failed once, then passed)

**Implementation Notes:**

- `SPEC/unattended-candidacy.md`: clause 1 gains a second arm (`[heavy]` with a complete basis). New `## Readiness basis` defines facts (a)–(d), confirmation by an operator filing gate, and the rule that an incomplete basis names what is missing. Clause 3 is untouched, since rendered-surface admission is `.3`'s.
- `templates/tasknote-starter-template.md`: `### Acceptance that decides it`, with an HTML comment naming the contract and one placeholder criterion in verify-command shape.
- `starter-mode.md`: the S3 **Readiness basis** paragraph (labeled mirror, the four fields, `basis incomplete — …`, the literal); the S3 sub-heading list; the S4 `touches:` fill.
- `step-3a-promote-starter.md`: Acceptance is seeded verbatim from the subsection, and Phase 1 may add criteria but not reword them. It cites `<SPEC_DIR>/starter.md`, not the candidacy module, so Pair N doesn't treat it as a filer.
- `SPEC/starter.md`: the sub-heading list, plus one paragraph naming the basis combination and the verbatim seeding.
- `.flaitron/PLAN.md`: `.3` line amended (55 words). Clause 1 now *extends* `.2`'s heavy admission to heavy-tier names, and clause 3 admits rendered-surface rows with a complete basis. This is a downstream reconcile the operator confirmed at the Discovery ask.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown only; no viz code)

- [x] **Verification receipt** — below; no duplication: the basis is defined once in the module, and `SPEC/starter.md`, `starter-mode.md`, and step-3a point at it

- [x] **External review** — two `/code-review medium` passes; pass 1 had 3 blockers, all fixed, and Phase 3 re-ran; pass 2 had 0 blockers; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:

```text
grep -q '^## Readiness basis$' SPEC/unattended-candidacy.md            → 0
grep -q 'Readiness basis' <(sed -n '/^## Candidacy predicate/,/^## Three postures/p' …)  → 0
grep -q '^### Acceptance that decides it' templates/tasknote-starter-template.md  → 0  (line 50: after Decisions locked 44, before Open at promotion 60)
bash tools/drift-checks.sh pair_n                                       → 0  (first run → 1: label wrapped across two lines; fixed onto one line)
grep -q 'Acceptance that decides it' step-3a-promote-starter.md && … SPEC/starter.md  → 0
grep -q 'rendered-surface' <(grep 'CORE-850.3\*\*' .flaitron/PLAN.md)    → 0
bash tools/drift-checks.sh                                              → 0
node --test tools/drift-checks.test.mjs                                 → 0  (pass 21, fail 0)
```

Paper walk of the S3 rule (judgment criterion):

- **Complete basis.** A drafted `[heavy]` row on a non-rendered contract change. Its starter has `touches: [SPEC/blocked.md]`, two `### Acceptance that decides it` criteria each ending in a `grep -q` command, and no `### Open at promotion`. Result: (a) present, (b) present, (c) present, (d) not applicable. Clause 1 admits the row (`[heavy]` with a complete basis), and clauses 2–6 pass on the drafted text. The review shows the line with `[heavy] [unattended]` in place. **Proposes.**
- **Incomplete basis.** The same row, but one criterion is marked `judgment`, and `### Open at promotion` holds one question. Result: (b) missing and (c) missing. Clause 1 fails, so there is no token, and the review names `basis incomplete — (b), (c)`. **Does not propose.**
- A `[moderate]` row with no starter basis is unaffected (clause 1's first arm). A rendered-surface `[moderate]` row still declines under clause 3's semantic layer until `.3` lands. Its basis fields are listed, but no token is proposed. After review pass 2, the review shows `basis complete; declined — clause 3` here.

External review (`/code-review medium`, working-tree diff only), two passes:

- **Pass 1 — 3 blockers, 5 notes; all fixed.**
  - Blocker: the predicate preamble read only the row text, so the basis arm could not run. It now names the starter.
  - Blocker: "verbatim" seeding contradicted the drift check. A drifted criterion is now surfaced, never silently reworded (step-3a + `SPEC/starter.md`).
  - Blocker: "all four fields" failed a non-rendered heavy row on (d). Now "every applicable field", with (d) `n/a`.
  - Note fixed: the §"Seeding" pin example now names "no complete basis".
  - Note fixed: "runs unchanged" became "with the one addition below", and the paragraph states that it overrides the host's "says nothing".
  - Note fixed: an unfilled placeholder is not a criterion.
  - Note fixed: the `### Open at promotion …` heading suffix is tolerated.
  - Note fixed: the rendered-surface basis is stated as necessary but not enough, with clause 3 deciding.
  - Phase 3 re-ran from the top: drift → 0, self-test pass 21 / fail 0, A1–A6 → 0.
- **Pass 2 — 0 blockers, 8 notes.**
  - Fixed: clause 1 says "operator-confirmed".
  - Fixed: promotion skips the placeholder and writes `- [ ]` items.
  - Fixed: the template placeholder is a plain bullet, not a live checkbox.
  - Fixed: S3 names the declining clause when the basis is complete.
  - Deferred to [[CORE-850.4]]: `ft-seed-unattended/SKILL.md:163` and the seeder do not read a row's starter for the basis arm. The seeder is `.4`'s file, and reading the basis belongs with its `scope` disposition.
  - Deferred to [[CORE-850.5]]: nothing re-checks a basis after a later hand edit. The runner should read the basis as it stands at dispatch, beside its `touches:` check.
  - Covered by [[CORE-850.3]]'s PLAN line: `model.md:325`, the task-line-segments blurb, and EXTERNAL-AGENTS step 2 still give the old clause-1 answer until mirrors are re-resolved.
  - No change: "needs" / "Required" in `SPEC/starter.md` and the template comment already reads as necessary-not-sufficient.
- Final re-run: `bash tools/drift-checks.sh` → 0; `node --test tools/drift-checks.test.mjs` → 0 (pass 21, fail 0); A2, A3 → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry has no change:
  - Root and contract docs: `README.md`, `AGENTS.md`, `SPEC.md` (the verify-command rule is cited, not changed), `CONTRIBUTING.md`, `SECURITY.md`.
  - Snippets: `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`.
  - `docs/MIGRATION.md`: its two hits name the template path only.
  - Other docs: `docs/CONVENTIONS.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/VISION.md`.
  - `docs/EXTERNAL-AGENTS.md` (its stable-surface rows for the basis belong to `.6`; step 2 to `.3`) and `docs/WORKTREES.md` (`.6`).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.2` line → `Completed 2026-10-31.` stub nested under CORE-EPIC-850, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A` for the always-loaded layer. A note for this repo: the path-access hook reads awk/sed regex text such as `/Decisions` as a path, so phrase those checks as `grep -n` instead.

**Final Summary:**

**What changed.** The readiness basis now exists. `SPEC/unattended-candidacy.md` §"Readiness basis" defines four facts a starter must carry:
- (a) a non-empty `touches:`
- (b) `### Acceptance that decides it`, where every criterion names its command
- (c) an empty `### Open at promotion`
- (d) a deciding spec on a rendered surface

It also covers operator confirmation and naming what is missing.

**Downstream wiring:**
- Clause 1 admits `[heavy]` only on a complete, confirmed basis, and the predicate preamble now reads the starter.
- The starter template ships the new subsection.
- `/ft-file-task --starter` S3 lists the basis fields and proposes the token only when the predicate admits. Otherwise it names what is missing or which clause declined.
- Promotion seeds `## ✅ Acceptance` verbatim, and drift is surfaced, never silently reworded.
- `.3`'s PLAN line now owns rendered-surface admission under clause 3, a reconcile the operator confirmed.

**Verification.** A1–A6 → 0. `bash tools/drift-checks.sh` → 0. `node --test tools/drift-checks.test.mjs` → 0. A7 judgment met by a paper walk. Two review passes: 3 blockers and 9 notes fixed, 3 notes deferred to `.3` / `.4` / `.5` (Testing Notes).

**`touches:` reconciliation.** The diff matches all six declared paths, plus this note's archive move. No refactors.

**Maintainability.** The basis is defined once, and three surfaces point at it.

**Archived:** 2026-10-31
