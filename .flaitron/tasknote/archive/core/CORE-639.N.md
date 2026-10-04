---
title: toolchain-currency audit
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-639, CORE-639.2, CORE-639.3, CORE-640, CORE-641]
---

# CORE-639.N | toolchain-currency audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-639]]

## 🎯 Goal

Verify the completed `CORE-EPIC-639` (`toolchain-currency`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. `judgment` — per-entry verdicts in Final Summary
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — `judgment`
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `grep -n 'matrix' .github/workflows/ci.yml`; `grep -n 'Node 24' docs/CONVENTIONS.md`; package.json pins; `grep -n 'open-pull-requests-limit' .github/dependabot.yml`; `grep -A20 'Standing viz-majors-outdated check' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — `judgment` (none to file)
- [x] Single `feat: CORE-639.N — audit CORE-EPIC-639` (or `chore: ...` if no code edits land) commit lands (staged at 📦; `chore:` — markdown only)
- [x] PLAN.md line for `CORE-639.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-639.N.md`
- [x] Parent-flip prompt surfaced after audit closure — user confirms or declines flipping `CORE-EPIC-639` to `Completed` and moving the cohort to `## Completed` (bundled into the 📦 gate)

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-639.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: prompt user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-639]] — parent epic (toolchain-currency)
- [[CORE-639.2]] — cohort child (ci-node-matrix)
- [[CORE-639.3]] — cohort child (viz-majors-triage)
- [[CORE-640]] — parked follow-up (js-yaml 5; gray-matter `safeLoad.bind`)
- [[CORE-641]] — parked follow-up (typescript 7; typescript-eslint + TS2882)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-task CORE-639.N` invoked on the open terminal audit child. Both implementation children closed 2026-09-20 (`CORE-639.2` ci-node-matrix; `CORE-639.3` viz-majors-triage). No `.1` Discovery child — Discovery supplied by `/ft-audit-repo` 2026-09-20. No open siblings; no early-audit decision. `## Completed` holds 64 checked rows (>60 advisory).

- [x] Read relevant source files — archived [[CORE-639.2]] and [[CORE-639.3]]; live `.github/workflows/ci.yml` `validate` job; `viz/package.json` engines + dep pins + gray-matter override; `.github/dependabot.yml`; `docs/CONVENTIONS.md` §"GitHub Actions CI" + §"Dependency audit cadence"; `claude/skills/ft-release/step-7.1-standing-checks.md` viz-majors-outdated block; `ft-release/SKILL.md` §7.1 index + standing-advisories sentence + §7.4 verdict; PLAN.md `CORE-640` / `CORE-641` rows.

- [x] **Best Practices Review** — N/A: verification pass over existing cohort deliverables; no code surface.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Cohort children are the archive entries in scope. Non-cohort hits on the same surfaces (distilled; not re-read in full): [[CORE-575.3]] authored the gray-matter `$js-yaml` override `.3` preserved and that blocked the js-yaml 5 bump; [[CORE-575.4]] put `npm audit` in `/ft-release` §6.2 not CI — the registry-time reason `.3` copied for `outdated`; [[CORE-638.3]] is the §7.1 advisory shape `.3` copied (never `exit 1`, index + §7.4, no CI Pair); [[CORE-581]] Dependabot security-only (`open-pull-requests-limit: 0`); [[CORE-114]] majors allowed when roster green; [[CORE-457.4]] deferred `npm outdated` majors; [[CORE-433.4]] Pair H `run:`-line binding that `.2` must not (and did not) touch. No Fan-out / `.1`.

- [x] **Drift check** — cited paths exist at HEAD. See Discovery Notes.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Cohort inventory.** `CORE-639.2` — `validate` job `strategy.matrix.node: [24, 26]` + `setup-node` `node-version: ${{ matrix.node }}`; no `- run:` line changed; CONVENTIONS §"GitHub Actions CI" "on Node 24" → "on a Node 24/26 matrix". `CORE-639.3` — kept `@types/node` 26, `globals` 17, `@testing-library/jest-dom` 7, `vitest` 5; reverted + parked `js-yaml` 5 as [[CORE-640]] and `typescript` 7 as [[CORE-641]]; added `/ft-release` §7.1 advisory-only viz-majors-outdated check + SKILL.md index / standing-advisories sentence / §7.4 verdict; CONVENTIONS §"Dependency audit cadence" one-sentence pointer. Dependabot left `open-pull-requests-limit: 0`.
- **Archive skim (non-cohort).** [[CORE-575.3]] is why js-yaml 5 cannot hide behind nested 3.x. [[CORE-575.4]] / [[CORE-638.3]] are why `outdated` is advisory in §7.1, not Pair H. [[CORE-581]] is why Dependabot stayed security-only. [[CORE-433.4]] is why `.2` only touched job-level keys.
- **Drift check (HEAD, 2026-09-20).**
  - `ci.yml` `validate` carries `strategy.matrix.node: [24, 26]` and `node-version: ${{ matrix.node }}`.
  - `docs/CONVENTIONS.md` is the only markdown `Node 24` hit, and it reads "on a Node 24/26 matrix".
  - `viz/package.json` engines `"^22.22.2 || ^24.15.0 || >=26.0.0"`; pins match `.3`: `@types/node ^26.6.2`, `globals ^17.12.0`, `@testing-library/jest-dom ^7.0.1`, `vitest ^5.0.1`, `typescript ^5.9.3`, `js-yaml ^4.3.2`, gray-matter override `$js-yaml` still present.
  - `npm --prefix viz outdated`: remaining majors are `js-yaml 4.3.2→5.4.2` and `typescript 5.9.3→7.0.2` only (in-range minors exist; out of epic scope).
  - PLAN.md `CORE-640` / `CORE-641` still open under `## Low`, descriptions match `.3`'s park reasons.
  - Dependabot both ecosystems `open-pull-requests-limit: 0`.
  - `Standing viz-majors-outdated check` present; SKILL.md indexes it, names it among standing advisories, carries §7.4 verdict.
- No clarifications needed. Assumptions: (1) cohort is complete as filed (two implementation children, no `.1`); (2) already-filed [[CORE-640]] / [[CORE-641]] are the parked majors, not new audit misses; (3) parent-flip is the operator's after the audit closes (epic.md: only `/ft-close-epic` / this `.N` close moves the cohort); (4) `## Completed` 64-row overflow is CORE-638 rotation debt re-accruing, not a toolchain-currency miss — do not re-file rotation from this audit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: no new surface; verification pass over existing cohort deliverables.

- [x] **Minimal refactor gate** — N/A: no edits applied.

- [x] Implemented the minimal solution — verification only; findings in Implementation Notes.

- [x] Updated/added tests for non-trivial behavior — N/A: no code edits landed.

**Implementation Notes:**

- **Cohort children inventoried.**
  - `CORE-639.2` (`ci-node-matrix`): `validate` job `strategy.matrix.node: [24, 26]`; `setup-node` interpolates `${{ matrix.node }}`; CONVENTIONS §"GitHub Actions CI" now says "on a Node 24/26 matrix". Pair H `run:` lines untouched (`npm ci` + seven AGENTS commands + gitleaks as a named block, not a single-line `- run:`).
  - `CORE-639.3` (`viz-majors-triage`): landed `@types/node` 26, `globals` 17, `@testing-library/jest-dom` 7, `vitest` 5; parked `js-yaml` 5 as [[CORE-640]] (gray-matter `safeLoad.bind` at import) and `typescript` 7 as [[CORE-641]] (typescript-eslint TS 7 hard-error + TS2882). `/ft-release` §7.1 viz-majors-outdated advisory + SKILL.md index / standing-advisories sentence / §7.4 verdict; CONVENTIONS cadence pointer. Dependabot still `open-pull-requests-limit: 0`.
- **Cohort coherence — no inconsistencies surfaced.** `.2` and `.3` share `docs/CONVENTIONS.md` but different sections (CI vs cadence) with no contradictory claim. `.3` did not touch `ci.yml` `- run:` lines; `.2` did not touch `viz/package.json`. Remaining majors at HEAD (`js-yaml` 4.3.2→5.4.2, `typescript` 5.9.3→7.0.2) match the two already-filed Low parks. Engines still `^22.22.2 || ^24.15.0 || >=26.0.0` (CI 24/26, local 26) as the parent epic described. Standing-advisories sentence names completed-rotation, viz-majors-outdated, and machine-global — three, matching the two CORE-638.3 advisories plus this epic's third.
- **No regressions** in either child's surfaces at HEAD (receipts in Testing Notes).
- **Inline fixes:** none.
- **Misses → `/ft-file-followup`:** none. Already-filed [[CORE-640]] / [[CORE-641]] are the parked majors, not new misses. Two historical nits on archived `CORE-639.2` are not live drift: (1) `related-tasks:` listed only `.N`, not the parent; (2) Final Summary claimed a standalone `## Completed` move — the PLAN row stayed nested, which is the epic-child rule. `## Completed` 64-row overflow is CORE-638 rotation debt re-accruing after a day of closes; out of this epic's scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: markdown-prose verification only; no markdown linter in this repo

- [x] **Verification receipt** — recorded below; N/A for changed-code quality assertions (no code changed)

- [x] (frontend) N/A — not a frontend change; no 👁️ ask

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown-prose verification only; no test surface. Verification receipt (HEAD, 2026-09-20):

- `grep -n 'matrix' .github/workflows/ci.yml` → 0 (`matrix:` L17; `node-version: ${{ matrix.node }}` L27; `node: [24, 26]` present on the strategy block)
- `grep -n 'Node 24' docs/CONVENTIONS.md` → 0 (sole hit is "on a Node 24/26 matrix")
- `grep -n 'open-pull-requests-limit' .github/dependabot.yml` → 0 (both ecosystems `0`)
- `grep -A20 'Standing viz-majors-outdated check' claude/skills/ft-release/step-7.1-standing-checks.md` → 0
- `grep -n 'viz-majors\|outdated' claude/skills/ft-release/SKILL.md` → 0 (L280 index, L291 standing-advisories sentence, L342 §7.4)
- standing viz-majors snippet → 0, prints `⚠️ viz majors pending: js-yaml 4.3.2→5.4.2, typescript 5.9.3→7.0.2`
- `grep -E '^      - run: ' .github/workflows/ci.yml` → install + seven AGENTS commands only (Pair H shape)
- `awk … | grep -c '^\s*- \[x\]'` on PLAN.md `## Completed` → `64` (>60 advisory)

Frontend confirmation N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (verdicts in Final Summary)

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line to stub form nested under CORE-EPIC-639; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs", cumulative over the cohort): `docs/CONVENTIONS.md` — **updated** by CORE-639.2 (CI Node 24/26 matrix) and CORE-639.3 (majors-currency pointer to `/ft-release` §7.1). No change: `README.md`, `AGENTS.md` (only the `no-Node-under-src/ui/` rule), `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. None of those surfaces restated a Node 24-only CI claim or a majors-cadence policy.

**Recap.** Audit ran over the two-child `CORE-EPIC-639` cohort; no inconsistencies surfaced — CI still matrices Node 24/26 with Pair H run-lines untouched, four viz majors landed and two remain parked as already-filed CORE-640 / CORE-641, Dependabot stays security-only, and `/ft-release` §7.1/§7.4 carry the matching never-block majors look. No inline fix. No `/ft-file-followup` candidates. `touches:` omitted (audit; no file deliverable). Maintainability: Node-version and majors currency are per-push / per-cut looks instead of a silent single-lane pile-up.

**Parent-flip decision (Step 8/9):** Yes — `CORE-EPIC-639` stubbed `Completed 2026-09-20.` and moved with `.2` / `.3` / `.N` to the top of `## Completed` in the audit commit.

**Archived:** 2026-09-20
