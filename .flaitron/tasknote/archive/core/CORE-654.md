---
title: release v5.32.0
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [FE-122, CORE-EPIC-651, CORE-EPIC-652, CORE-643, CORE-640, CORE-644, CORE-642]
---

# CORE-654 | release v5.32.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-122]] [[CORE-EPIC-651]] [[CORE-EPIC-652]] [[CORE-643]] [[CORE-640]] [[CORE-644]] [[CORE-642]]

## 🎯 Goal

Cut v5.32.0, a minor release tagging FE-122 (handoff-chip) and closing CORE-EPIC-651 (gate-reliability) and CORE-EPIC-652 (public-surface-decoupling), plus the CORE-643 (brand-kit-back-port), CORE-640 (js-yaml-5-gray-matter, previously parked), and CORE-644 (audit-bootstrap-self-branch) follow-ups, since v5.31.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.31.0` → `v5.32.0`
- [x] docs/MIGRATION.md example pin bumped `v5.31.0` → `v5.32.0`
- [x] SECURITY.md release-tag example pin bumped `v5.31.0` → `v5.32.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.32.0`, or recorded `skipped @ v5.32.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-654 — flowtron v5.32.0 (...)` commit lands
- [x] Annotated `v5.32.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.32.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-654.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.31.0 → v5.32.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-642]] — prior release tasknote (v5.31.0), structural precedent
- [[FE-122]] — handoff-chip, tagged in this cut
- [[CORE-EPIC-651]] — gate-reliability (.2–.5 feat), closed and tagged in this cut
- [[CORE-EPIC-652]] — public-surface-decoupling (.2 feat), closed and tagged in this cut
- [[CORE-643]] — brand-kit-back-port, tagged in this cut
- [[CORE-640]] — js-yaml-5-gray-matter, previously parked (CORE-642), landed and tagged in this cut
- [[CORE-644]] — audit-bootstrap-self-branch, tagged in this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-642 / CORE-629 precedent); version drift and commit log verified in `/ft-release` Step 1.1/2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:501`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-642.md` (v5.31.0, prior cut) skimmed as structural precedent; shape matches.

- [x] **Drift check** — `SPEC.md:3` reads `v5.31.0`; `docs/MIGRATION.md:501` and `SECURITY.md:118` example pins both `v5.31.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.31.0`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1). Assumption: no `feat!:` / `BREAKING CHANGE:` in the 17 commits (verified by log classification).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

17 commits since v5.31.0 (10 feat / 7 chore), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.31.0 → v5.32.0). Two epics closed same-day (CORE-EPIC-651 gate-reliability, CORE-EPIC-652 public-surface-decoupling) plus FE-122, CORE-643, CORE-640, CORE-644 standalone follow-ups.

**Adopter migration impact:** no required adopter-side edits. Classified per commit:

- **FE-122 handoff-chip** — viz-only UI addition (`viz/src/ui/HandoffChip.tsx`). Flowtron-self visualizer feature; no migration.
- **CORE-EPIC-651 gate-reliability** (.2 Pair-Q out-of-repo skip, .3 updater-test cleanup-race fix, .4 engines CI matrix, .5 lockfile/engines sync) — CI/test reliability hardening for flowtron-self; no adopter action.
- **CORE-EPIC-652 public-surface-decoupling** (.2 natabula-ref-inventory) — reworded 17 internal doc/comment references that leaked the operator's private `natabula` fleet layer to stand alone, retained 5 as labelled `operator-private` pointers; prose/comment-only, no adopter-facing contract change.
- **CORE-643 brand-kit-back-port** — added flowtron's own `brand/` identity kit (logo/favicon SVGs + BRAND.md/README.md); flowtron-self branding, not adopter-facing.
- **CORE-640 js-yaml-5-gray-matter** — replaced `gray-matter` with an in-repo frontmatter splitter in `viz/src/tasknote-parse.ts`, unblocking the js-yaml 4→5 bump (previously parked at CORE-642/v5.31.0). Viz-internal; no adopter action.
- **CORE-644 audit-bootstrap-self-branch** — parameterized `/ft-audit`'s scaffold bootstrap and `templates/audit-overlay-template.md` to name both the adopter submodule path and the flowtron-self in-tree path; additive/prose, benefits adopters forking the audit template but requires no action.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [x] **Minimal refactor gate** — N/A, no refactor in scope

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

The 3 version edits landed as single-token substitutions: `SPEC.md:3`, `docs/MIGRATION.md:501`, `SECURITY.md:118` — all `v5.31.0` → `v5.32.0`. Post-edit residue grep: only historical refs (`docs/VERSION-HISTORY.md` heading, `docs/CONTEXT-BUDGET.md` narrative) and the dogfood stamps resolved below — no real drift.

**Dogfood gate resolved 2026-09-21.** Stamp files clean at walk start and again before the shared skip write (`git status --porcelain` empty both times). Ledger:

- Claude → `v5.32.0 · 2026-09-21 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:71`
- Grok → `v5.31.0 · 2026-09-20 (dogfooded; skipped @ v5.32.0)` — written (no receipt offered) — `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:440`
- Codex → `v5.31.0 · 2026-09-20 (dogfooded; skipped @ v5.32.0)` — written (no receipt offered) — `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:479`
- Cursor → `v5.31.0 · 2026-09-20 (dogfooded; skipped @ v5.32.0)` — written (no receipt offered) — `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:508`

Step-5 ledger re-verify from file state printed nothing.

**SOP currency: clean (5 candidates dismissed, unchanged since CORE-642; tier-2 note: 8 `SPEC.md` commits).** `SPEC/procedures/ft-task.md` (stamp 2026-09-12). The five tier-1 candidates (`afb0ea6` CORE-622.3, `d49e427` CORE-616, `623c1ed` CORE-605, `4a3c8e1` CORE-604.3, `fa7b93a` CORE-603.4) are the same set CORE-613/629/642 adjudicated and dismissed; no new commit since v5.31.0 touched `claude/skills/ft-task/` or `templates/tasknote-template.md` without also updating the SOP (CORE-652.2's `claude/skills/ft-task/SKILL.md` edit landed in the same commit as its `SPEC/procedures/ft-task.md` mirror, so the check correctly filtered it as synced). Tier-2 count 7 → 8: the +1 is CORE-652.2's own `SPEC.md` edit. Stamp left un-bumped per the check's contract.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change in this cut

**Testing Notes:**

Markdown mental-pass on the 3 version edits: single-token substitutions, no frontmatter or fenced blocks touched.

Standing validation gate (`AGENTS.md` §"Validation"), Node v26.7.0:

```
npm --prefix viz test           → 29 files, 578 tests passed (exit 0)
npm --prefix viz run typecheck  → exit 0
npm --prefix viz run lint       → exit 0
npm --prefix viz run build      → built in 353ms (exit 0)
node --test tools/update-adopters.test.mjs   → 54 tests, 0 failed (exit 0)
node --check tools/update-adopters.test.mjs  → exit 0
node --check tools/update-adopters.mjs       → exit 0
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit 2915c3dd` returns no runs — HEAD is 17 commits ahead of `origin/main`, never pushed (same posture as CORE-642). `origin/main` (b9552f15) has its own run `completed · success`. Resolved by executing every `validate` + `drift` job step locally: gitleaks 8.30.1 (`gitleaks dir . --config .gitleaks.toml --no-banner --redact` → "no leaks found"), and all 15 drift-job steps extracted from `ci.yml` (wrapper-name invariant, shipped-skill parity, context budget, final newline, Pairs A/B/C/H/J/M/N/O/P/Q/R) run under `bash -e` → 15/15 PASS.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (exit 0).

Every feature tasknote since v5.31.0 ran its own test pass in its own tasknote; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-09-21.` at the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-21, 18 AI-referenced docs / ~4,100 lines; changed-file diff review targeted at the 7 docs this cycle's 17 commits touched — AGENTS.md, SECURITY.md, SPEC.md, docs/AGENT-NEUTRALITY.md, docs/CONVENTIONS.md, docs/MIGRATION.md, docs/PLATFORMS.md, plus docs/AGENT-COMPAT.md / claude/CAPABILITIES.md from the dogfood walk; the CI-mirrored Pair Q section-citation resolver already covers cross-references over the whole tree):** **zero findings across all five passes, health 10/10.** `SPEC.md`'s `NAT-*` example reworded to `OPS-*` (CORE-652.2); `AGENTS.md`'s KEEP-IN-SYNC line-number pointer and `justfile` repo-layout row both current; `docs/AGENT-NEUTRALITY.md` ledger gained the two rows CORE-652.2/CORE-646 required; `docs/CONVENTIONS.md`'s gitleaks-provenance and Pair Q out-of-repo-skip prose match current behavior; the three version pins (`SPEC.md`/`docs/MIGRATION.md`/`SECURITY.md`) and the four dogfood stamps read `v5.32.0`/`v5.31.0 (…skipped @ v5.32.0)` consistently across `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`. No residual `natabula` references anywhere in the 18-doc sweep set. No stale "as of" dates found. Per-entry verdict for all 18 docs: no change beyond what's named above. Third consecutive cut with nothing to absorb.

**§7.1 standing checks + mirror pairs (all run 2026-09-21, independent of the subroutine):**

- Wiring-consumer derivation (both greps exit 1), shipped-skill parity (12 = 12), installed-surface policy (5 diffs; SSOT set = 8 adopter skills), self-wiring parity local (4 checks) — all PASS.
- Self-wiring parity machine-global (advisory) — **not run**; the path-access guard blocked the `~/.claude/` scan, same as every prior cut. Never blocks commit-go.
- README task-counter — was 999 / 2026-09-20; refreshed inline to **1011 tasks, 2026-04-28 to 2026-09-21**.
- Completed-rotation (advisory) — **63 rows (>60)**. Rotate out of band.
- Viz-majors-outdated (advisory) — `typescript 5.9.3→7.0.2`, parked as CORE-641, re-checked still upstream-blocked; js-yaml no longer pending (CORE-640 landed it this cut).
- Context-budget check — 0 OVER BUDGET across all rows (`ft-release/**` at 113,985 / 125,000). §"Known over budget" empty. `docs/CONTEXT-BUDGET.md` §"Ledger" refreshed inline (stamp → 2026-09-21 / CORE-654 / v5.32.0; cold-start sum 120,446 → 120,948 via `.flowtron/tasknote/README.md`'s CORE-650 exclusion paragraph +498 plus single-digit drift; `AGENTS.md` 7,396 → 7,568, `ft-release/SKILL.md` 32,803 → 32,878, `ft-task/SKILL.md` 28,103 → 28,105, `ft-file-followup/SKILL.md` 26,177 → 26,179, `ft-micro-task/SKILL.md` 21,319 → 21,321, `SPEC/procedures/ft-task.md` 35,933 → 35,935, `SPEC/scope-boundaries.md` 5,347 → 5,371, `templates/tasknote-README.md` 4,837 → 4,839, `ft-release/**` 113,697 → 113,985, `ft-task/**` 74,650 → 74,652).
- Pairs A, F (×2), I, K (K1 + K2), L (3 source rows + 11 catalogue rows) — all PASS. Pairs B, C, H, J, M, N, O, P, Q, R already run via the local extraction at §6.1 on the working tree after this cut's edits (15/15 PASS there, superset of the 11 CI-lifted pairs).

**Final Summary:**

Cut flowtron v5.32.0, a minor release closing two epics filed and shipped this cycle: CORE-EPIC-651 (gate-reliability — Pair Q now skips out-of-repo section citations instead of misreporting them; the fleet-updater test suite's cleanup race fixed; Node engines matrix and lockfile back in sync) and CORE-EPIC-652 (public-surface-decoupling — every non-archive `natabula` reference in the tracked tree reworded to stand alone or labelled `operator-private`, closing the gap `docs/AGENT-NEUTRALITY.md`'s ledger now tracks). Alongside them: FE-122 adds a Handoff Chip to the visualizer's task rows, CORE-640 replaces `gray-matter` with an in-repo frontmatter splitter (unblocking the js-yaml 4→5 bump parked since v5.31.0), CORE-643 gives flowtron its own `brand/` identity kit, and CORE-644 parameterizes `/ft-audit`'s scaffold-bootstrap for a flowtron-self install context. No required adopter-side edits.

Standing validation gate passed clean (578 viz tests, 54 fleet-updater tests, typecheck + lint + build clean, 0 `npm audit` findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 17 commits unpushed) and was resolved by executing every `validate` + `drift` job step locally (gitleaks 8.30.1, 15 drift checks) — all clean under `bash -e`. `/ft-audit docs ai-referenced` returned zero findings over the 18-doc set for the third consecutive cut. All §7.1 standing checks and mirror pairs (A–R, D, F, I, K, L) clean; the README task-counter (999 → 1011) and the `docs/CONTEXT-BUDGET.md` ledger were refreshed inline. Advisories: completed-rotation 63 rows (>60) — rotate out of band; typescript 7 major still parked (CORE-641); machine-global wiring check not run (path-access guard, same as every prior cut).

Dogfood gate resolved: Claude refreshed to `v5.32.0 · 2026-09-21 (dogfooded)` on this session's own verification; Grok, Codex, and Cursor recorded `skipped @ v5.32.0` (no receipts offered this cut) with their prior real-verification stamps preserved. Step-5 ledger re-verify from file state printed nothing. SOP currency: clean (the same five tier-1 candidates CORE-613/629/642 dismissed, unchanged; tier-2 note: 8 `SPEC.md` commits).

Scope reconciliation: N/A — no `touches:` declared (fixed release recipe). Files changed beyond the recipe's own set: `README.md` (task counter), `docs/CONTEXT-BUDGET.md` (ledger), `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (dogfood stamps) — each named above.

**Archived:** 2026-09-21
