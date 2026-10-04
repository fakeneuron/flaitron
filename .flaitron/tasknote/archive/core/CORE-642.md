---
title: release v5.31.0
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-631, CORE-EPIC-632, CORE-EPIC-638, CORE-EPIC-639, CORE-630, CORE-633, CORE-634, CORE-635, CORE-636, CORE-637, CORE-640, CORE-641, CORE-629]
---

# CORE-642 | release v5.31.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-631]] [[CORE-EPIC-632]] [[CORE-EPIC-638]] [[CORE-EPIC-639]] [[CORE-630]] [[CORE-633]] [[CORE-634]] [[CORE-635]] [[CORE-636]] [[CORE-637]] [[CORE-640]] [[CORE-641]] [[CORE-629]]

## 🎯 Goal

Cut v5.31.0, a minor release tagging the four audit-repo epics landed since v5.30.0 — CORE-EPIC-631 (lifted-pairs single body), CORE-EPIC-632 (README webp logo + submodule archive-exclusion guidance), CORE-EPIC-638 (rotation-advisory mirrors + `## Completed` rotation), CORE-EPIC-639 (CI node matrix + viz-majors triage) — plus the CORE-630 / 633–637 follow-ups and the CORE-640 / 641 parks.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.30.0` → `v5.31.0`
- [x] docs/MIGRATION.md example pin bumped `v5.30.0` → `v5.31.0`
- [x] SECURITY.md release-tag example pin bumped `v5.30.0` → `v5.31.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.31.0`, or recorded `skipped @ v5.31.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-642 — flowtron v5.31.0 (...)` commit lands
- [x] Annotated `v5.31.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.31.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-642.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.30.0 → v5.31.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-629]] — prior release tasknote (v5.30.0), structural precedent
- [[CORE-EPIC-631]] — lifted-pairs-single-body (.2 feat, .3 docs), tagged in this cut
- [[CORE-EPIC-632]] — readme-logo-webp (.2), submodule-archive-exclusion-guidance (.3), tagged in this cut
- [[CORE-EPIC-638]] — completed-rows rotation (.2), rotation-advisory-mirrors (.3 feat), tagged in this cut
- [[CORE-EPIC-639]] — ci-node-matrix (.2), viz-majors-triage (.3 feat), tagged in this cut
- [[CORE-630]] [[CORE-633]] [[CORE-634]] [[CORE-635]] [[CORE-636]] [[CORE-637]] — docs/chore follow-ups, tagged in this cut
- [[CORE-640]] [[CORE-641]] — parked major bumps (js-yaml 5 / typescript 7), re-checked and still blocked in this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-629 / CORE-613 precedent); version drift and commit log verified in `/ft-release` Step 1.1/2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:501`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-629.md` (v5.30.0, cut earlier today) skimmed as structural precedent; shape matches. Carried-forward lessons: (1) dogfood stamps re-verified from file state at §7.4 (CORE-588); (2) Step 6.1 CI check finds no runs when HEAD is unpushed — resolve by executing the `validate` + `drift` job steps locally under `bash -e` (no `pipefail`); (3) `docs/CONTEXT-BUDGET.md` ledger refreshed inline at §7.1; (4) since CORE-629, the §7.1 mirror-pair runner now extracts the lifted pairs from `ci.yml` (CORE-631.2) and Pair R + the viz-majors and completed-rotation advisories are new to this cut's walk (CORE-635, CORE-639.3, CORE-638.3).

- [x] **Drift check** — `SPEC.md:3` reads `v5.30.0`; `docs/MIGRATION.md:501` and `SECURITY.md:118` example pins both `v5.30.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.30.0`). No drift. (MIGRATION pin moved 487 → 501 since CORE-629 via CORE-632.3's §1.1 addition.)

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1). Assumption: no `feat!:` / `BREAKING CHANGE:` in the 29 commits (verified by log classification).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

29 commits since v5.30.0 (3 feat / 4 docs / 22 chore), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.30.0 → v5.31.0). 49 files changed (+3236 / −695). Four audit-repo epics (CORE-EPIC-631/632 filed 9362667, CORE-EPIC-638/639 filed 3e362b8) plus standalone follow-ups, all closed the same day as v5.30.0.

**Adopter migration impact:** no *required* adopter-side edits. One optional action item (search-tool exclusion of the dogfood archive). Classified per commit:

- **CORE-632.3 submodule-archive-exclusion-guidance** — `docs/MIGRATION.md` §1.1 now tells adopters to keep `.flowtron/core/.flowtron/` (~14 MB, ~1,000 files of flowtron's own dogfood archive) out of search/context tooling (Claude Code Read deny rule, Cursor `.cursorignore`, ripgrep `.ignore`); all four `AGENTS-snippet.md` wiring sections carry a mirrored pointer paragraph; `/ft-new-project` gains a Step 3b deposit. This is the one (optional) adopter action item for the tag message — existing adopters add the exclusion by hand; fresh adopters get it from `/ft-new-project`.
- **CORE-638.3 rotation-advisory-mirrors** — `/ft-micro-task`, `/ft-close-epic`, and `/ft-release` now surface the same `## Completed` >60-row rotation advisory `/ft-task` already had. Behavior addition on bundled skills; no migration.
- **CORE-634 rotation-closed-month-append** — `SPEC/plan-filing.md` rotation clause fixed: a month heading in PLAN-ARCHIVE stays open to appends at its existing position for as long as it exists. Contract clarification; no migration.
- **CORE-635 plan-stub-shape-ratchet** — Pair R (flowtron-self CI drift check for `| shortname` on checked stub rows) + FX-462 malformed-stub case added to `SPEC/fixtures/plan/exclusions.*`. Fixture is additive for adopter PLAN parsers; no action.
- **CORE-631.2 lifted-pairs-single-body / CORE-631.3 procedures-postures-headroom** — `ci.yml` is now the single body for the ten lifted §7.1 mirror pairs; `docs/CONTEXT-BUDGET.md` rows re-measured. Flowtron-self.
- **CORE-639.2 ci-node-matrix / CORE-639.3 viz-majors-triage** — Node 24/26 CI matrix; four viz majors landed (vitest 5 among them), js-yaml 5 and typescript 7 parked (CORE-640 / CORE-641, both re-checked and still upstream-blocked); advisory `npm outdated` majors check added to §7.1. Flowtron-self / viz-only.
- **CORE-633 ci-job-timeouts / CORE-632.2 readme-logo-webp / CORE-630 readme-maturity-note / CORE-636 remove-dead-claudeignore / CORE-637 root-justfile-viz** — flowtron-self housekeeping; no action.
- **CORE-638.2 completed-rows rotation** — flowtron's own PLAN.md housekeeping (88 → 60 rows).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [x] **Minimal refactor gate** — N/A, no refactor in scope

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

The 3 version edits landed as single-token substitutions: `SPEC.md:3`, `docs/MIGRATION.md:501`, `SECURITY.md:118` — all `v5.30.0` → `v5.31.0`. Post-edit residue grep: only the `docs/VERSION-HISTORY.md` v5.30.0 heading (historical), the `docs/CONTEXT-BUDGET.md` ledger lines (refreshed at §7.1), and the dogfood stamps resolved below — no real drift.

**Dogfood gate resolved 2026-09-20.** Stamp files clean at walk start and again before the writes (`git status --porcelain` empty both times). All three third-party receipts arrived in `docs/DOGFOOD.md`'s fenced shape on the first ask and passed the three checks (version `v5.31.0` ✓, "My row" `v5.30.0 · 2026-09-20 (dogfooded)` matched the pre-walk matrix ✓, Phase-1 drive names a task + skip ✓). Cursor's Phase-1 drive named CORE-643, which this session's Step 1 read of PLAN.md did not contain — it was first resolved as **Skipped** on a "not a filed task" reading, then corrected at §7.3 when the PLAN flip diff showed a parallel natabula fleet-audit session had filed `CORE-643 | brand-kit-back-port` under `## Medium` (with an untracked starter) after that read: the receipt had read a real open row, so the row was re-resolved **Refreshed** with the operator. Pre-write dirty check at the re-resolution showed exactly this walk's own ledger rows. Step-5 ledger re-verify from file state printed nothing after each write. Ledger:

- Claude → `v5.31.0 · 2026-09-20 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:71`
- Grok → `v5.31.0 · 2026-09-20 (dogfooded)` — written — `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:440`. Receipt: Phase-1 drive CORE-642 / skip; status clause clean.
- Codex → `v5.31.0 · 2026-09-20 (dogfooded)` — written — `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:479`. Receipt: Phase-1 drive CORE-642 / skip; status clause clean.
- Cursor → `v5.31.0 · 2026-09-20 (dogfooded)` — written (skip rewritten to refresh at §7.3) — `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:508`. Receipt: Phase-1 drive CORE-643 / skip; status clause clean.

**SOP currency: clean (5 candidates dismissed, unchanged since CORE-629; tier-2 note: 7 `SPEC.md` commits).** `SPEC/procedures/ft-task.md` (stamp 2026-09-12). The five tier-1 candidates (`afb0ea6` CORE-622.3, `d49e427` CORE-616, `623c1ed` CORE-605, `4a3c8e1` CORE-604.3, `fa7b93a` CORE-603.4) are exactly the set CORE-613 / CORE-629 adjudicated and dismissed; no commit since v5.30.0 touched `claude/skills/ft-task/` or `templates/tasknote-template.md`. Tier-2 count 6 → 7: the +1 is CORE-629's own `SPEC.md` version-pin bump. Stamp left un-bumped per the check's contract.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change in this cut

**Testing Notes:**

Markdown mental-pass on the 3 version edits: single-token substitutions, no frontmatter or fenced blocks touched.

Standing validation gate (`AGENTS.md` §"Validation"), Node v26.7.0:

```
npm --prefix viz test           → 29 files, 568 tests passed (exit 0)
npm --prefix viz run typecheck  → exit 0
npm --prefix viz run lint       → exit 0
npm --prefix viz run build      → built in 301ms (exit 0)
node --test tools/update-adopters.test.mjs   → 54 tests, 0 failed (exit 0)
node --check tools/update-adopters.test.mjs  → exit 0
node --check tools/update-adopters.mjs       → exit 0
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit 5345bc3` returns no runs — HEAD is 29 commits ahead of `origin/main`, never pushed (same posture as CORE-629 / CORE-613 / CORE-599); `origin/main` (890c693, the v5.30.0 release commit) has its own run `completed · success`. Resolved by executing every `validate` + `drift` job step locally: gitleaks 8.30.1 (`gitleaks dir . --config .gitleaks.toml --no-banner --redact` → "no leaks found"), and all 15 drift-job steps extracted from `ci.yml` (`- name:` + `run: |` bodies) and run under `bash -e` (the CI default shell, no `pipefail`): wrapper-name invariant, shipped-skill parity, context budget, final newline, Pairs A/B/C/H/J/M/N/O/P/Q/R (Pair R new via CORE-635) → 15/15 PASS. The validate job's Node 24/26 matrix (CORE-639.2) was exercised on one line locally (26); the post-push run covers 24 and is carried into §7.4 as flag-don't-block.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (exit 0).

Every feature tasknote since v5.30.0 (CORE-630–639 incl. epic children) ran its own test pass in its own tasknote; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-20, 18 AI-referenced docs / 4,125 lines; mechanical link + repo-path scan first, 4 syntax-example "broken links" triaged; targeted reads of every roster/count/CI/exclusion surface this cycle's 29 commits touched):** **zero findings across all five passes, health 10/10.** AGENTS.md §Repo Layout matches disk (`justfile` omission is CORE-637's recorded decision); `.claudeignore` appears only as MIGRATION §1.1's deliberate "there is none" note; README logo → `LOGO.webp`; the eleven lifted pairs (A, B, C, H, J, M, N, O, P, Q, R) and release-only set (D, F, I, K, L) read identically at both CONVENTIONS sites and AGENTS.md's Pair R paragraph; the `.flowtron/core/.flowtron/` exclusion paragraph (~14 MB, ~1,000 files) is consistent across MIGRATION §1.1 and all four `AGENTS-snippet.md`; CONVENTIONS' CI prose names the Node 24/26 matrix; skill roster 12 = 12. Per-entry verdict for all 18 docs: no change (README.md's task-counter refreshed by the §7.1 standing check, not the sweep). Second consecutive cut with nothing to absorb.

**§7.1 standing checks + mirror pairs (all run 2026-09-20, independent of the subroutine):**

- Wiring-consumer derivation (both greps exit 1), shipped-skill parity (12 = 12), installed-surface policy (5 diffs; SSOT set = 8 adopter skills), self-wiring parity local (4 checks) — all PASS.
- Self-wiring parity machine-global (advisory) — **not run**; the path-access guard blocked the `~/.claude/` scan, same as CORE-553 / 586 / 599 / 613 / 629. Never blocks commit-go.
- README task-counter — was 980 / 2026-09-20; refreshed inline to **999 tasks, 2026-04-28 to 2026-09-20** (19 archivals since this morning's v5.30.0 cut).
- Completed-rotation (advisory) — **68 rows (>60)**; CORE-638.2 rotated 88 → 60 earlier today and the four epic cohorts + follow-ups closed since pushed it back over. Rotate out of band.
- Viz-majors-outdated (advisory) — `js-yaml 4.3.2→5.4.2`, `typescript 5.9.3→7.0.2`; both parked as CORE-640 / CORE-641 and re-checked still upstream-blocked this cycle.
- Context-budget check — 0 OVER BUDGET across all 7 rows (`ft-release/**` at 113,697 / 125,000, down from 122,895 via CORE-631.2); §"Known over budget" empty. `docs/CONTEXT-BUDGET.md` §"Ledger" refreshed inline (stamp → 2026-09-20 / CORE-642 / v5.31.0; cold-start sum unchanged at 120,446; `AGENTS.md` 6,953 → 7,396 (Pair R para), `ft-release/SKILL.md` 31,705 → 32,803, `ft-close-epic` 27,350 → 27,914, `ft-micro-task` 20,755 → 21,319, `ft-new-project` 11,522 → 12,969, `AGENTS-snippet.md` 15,614 → 16,001, `plan-filing.md` 15,971 → 15,991, `ft-release/**` 122,895 → 113,697).
- Pairs A (10 templates named), F (×2), I (7 flags), K (K1 6 cites + K2 3 sections), L (14 mappings, none vacuous) — all PASS. Pairs B, C, H, J, M, N, O, P, Q, R run via the §7.1 runner on the working tree after this cut's edits (11/11 ok) and again in Step 6.1's full 15-step extraction. D owned by the README check; G retired.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-09-20.` at the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.31.0, a minor release closing the four audit-repo epics filed and shipped the same day as v5.30.0: CORE-EPIC-632 (adopters told to keep the submodule's ~14 MB dogfood archive at `.flowtron/core/.flowtron/` out of search/context tooling — MIGRATION §1.1 per-tool recipe, four snippet mirrors, `/ft-new-project` Step 3b deposit; README logo → 4.5 kB webp), CORE-EPIC-631 (`ci.yml` is the single body for the ten lifted §7.1 mirror pairs with a local extract-and-run runner; `ft-release/**` 122,895 → 113,697 chars, cap unchanged), CORE-EPIC-638 (`## Completed` >60-row rotation advisory mirrored onto `/ft-micro-task` / `/ft-close-epic` / `/ft-release`; board rotated 88 → 60), and CORE-EPIC-639 (Node 24/26 CI matrix; four viz majors landed, js-yaml 5 / typescript 7 parked as CORE-640 / 641; advisory `npm outdated` majors check in §7.1). Around them: CORE-634 keeps a PLAN-ARCHIVE month heading open to appends, CORE-635 adds Pair R + FX-462, CORE-633 adds CI job timeouts, CORE-630 the README maturity note, CORE-636 removes the dead `.claudeignore`, CORE-637 a root `justfile`. No required adopter-side edits; one optional action (the exclusion rule).

Standing validation gate passed clean (568 viz tests, 54 fleet-updater tests, typecheck + lint + build clean, 0 `npm audit` findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 29 commits unpushed) and was resolved by executing every `validate` + `drift` job step locally (gitleaks 8.30.1, 15 drift checks incl. new Pair R) — all clean under `bash -e`. `/ft-audit docs ai-referenced` returned zero findings over the 18-doc set. All §7.1 standing checks and mirror pairs (A–R) clean; the README task-counter (980 → 999) and the `docs/CONTEXT-BUDGET.md` ledger were refreshed inline. Advisories: completed-rotation 68 rows (>60) — rotate out of band; viz majors js-yaml 5 / typescript 7 pending, both parked; machine-global wiring check not run (path-access guard, same as the prior five cuts).

**Dogfood gate resolved with all four rows refreshed to `v5.31.0 · 2026-09-20 (dogfooded)`** — Cursor's was first recorded as a skip because its Phase-1 task, CORE-643, was absent from this session's Step 1 PLAN.md read; a parallel natabula fleet-audit session had filed that row (plus an untracked starter) mid-cut, so the receipt was valid and the row was re-resolved Refreshed at §7.3. The lesson for the walk: a receipt naming an unknown task ID means re-read PLAN.md before judging, not just recall it. Step-5 ledger re-verify from file state printed nothing at §5 and again at §7.4. SOP currency: clean (the same five tier-1 candidates CORE-629 dismissed, unchanged; tier-2 note: 7 `SPEC.md` commits).

Scope reconciliation: N/A — no `touches:` declared (fixed release recipe). Files changed beyond the recipe's own set: `README.md` (task counter), `docs/CONTEXT-BUDGET.md` (ledger), `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (dogfood stamps) — each named above. Left out of the cut on the operator's call: the foreign `CORE-643` PLAN.md line (staged around via a hunk-filtered `git apply --cached`) and its untracked starter `.flowtron/tasknote/CORE-643.md` — both stay in the working tree for the natabula session to commit.

**Archived:** 2026-09-20
