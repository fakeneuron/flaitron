---
title: release v5.30.0
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-618, CORE-619, CORE-EPIC-622, CORE-624, CORE-614, CORE-615, CORE-616, CORE-617, CORE-620, CORE-621, CORE-623, CORE-625, CORE-613]
---

# CORE-629 | release v5.30.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-618]] [[CORE-619]] [[CORE-EPIC-622]] [[CORE-624]] [[CORE-614]] [[CORE-615]] [[CORE-616]] [[CORE-617]] [[CORE-620]] [[CORE-621]] [[CORE-623]] [[CORE-625]] [[CORE-613]]

## 🎯 Goal

Cut v5.30.0, a minor release tagging the plan-grammar fixtures (CORE-618), the `/ft-seed` skill (CORE-619), the citation-integrity epic (CORE-EPIC-622), the Pair H CI lift (CORE-624), and the CORE-614–617 / 620 / 621 / 623 / 625 follow-ups since v5.29.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.29.0` → `v5.30.0`
- [x] docs/MIGRATION.md example pin bumped `v5.29.0` → `v5.30.0`
- [x] SECURITY.md release-tag example pin bumped `v5.29.0` → `v5.30.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.30.0`, or recorded `skipped @ v5.30.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-629 — flowtron v5.30.0 (...)` commit lands
- [x] Annotated `v5.30.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.30.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-629.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.29.0 → v5.30.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-613]] — prior release tasknote (v5.29.0), structural precedent
- [[CORE-618]] — plan-grammar-fixtures, tagged in this cut
- [[CORE-619]] — ft-seed skill, tagged in this cut
- [[CORE-EPIC-622]] — citation-integrity epic (.2 skill-directory-budget-row, .3 section-citation-resolver, .4 viz-shared-pure-node-guard), tagged in this cut
- [[CORE-624]] — pair-h-lift-to-ci, tagged in this cut
- [[CORE-614]] [[CORE-615]] [[CORE-616]] [[CORE-617]] [[CORE-620]] [[CORE-621]] [[CORE-623]] [[CORE-625]] — docs/fix/chore follow-ups, tagged in this cut
- [[CORE-630]] — README maturity note, filed during this cut's PLAN-line drafting (versioning discussion)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-613 / CORE-599 precedent); version drift and commit log verified in `/ft-release` Step 1.1/2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-613.md` (v5.29.0) skimmed as structural precedent; shape matches. Carried-forward lessons: (1) dogfood stamps re-verified from file state at §7.4 (CORE-588); (2) Step 6.1 CI check finds no runs when HEAD is unpushed — resolve by executing the `validate` + `drift` job steps locally; (3) `docs/CONTEXT-BUDGET.md` ledger refreshed inline at §7.1; (4) CORE-614 landed since — DOGFOOD.md receipts now have a literal fenced template and the git-status clause is scoped to files the session wrote, so the CORE-613 Codex self-invalidation class should not recur.

- [x] **Drift check** — `SPEC.md:3` reads `v5.29.0`; `docs/MIGRATION.md:487` and `SECURITY.md:118` example pins both `v5.29.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.29.0`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed on the cut itself; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1). The operator raised a versioning question at filing (is v6 ripe / does a high major mislead on maturity) — answered from `SPEC/versioning.md`: major counts breaking changes, not maturity; v1–v5 landed in 25 days (2026-05-07 → 2026-06-01) as genuine breaks, and the contract has been break-free for 30 minors since. Resolution: keep semver, no renumbering (tags immutable, `/ft-update` + `natabula-align` compare monotonically); README maturity note filed as [[CORE-630]].

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

20 commits since v5.29.0 (6 feat / 2 fix / 4 docs / 8 chore), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.29.0 → v5.30.0). 69 files changed (+4197 / −146).

**Adopter migration impact:** no *required* adopter-side edits. One optional action item (new skill wiring). Classified per commit:

- **CORE-619 `/ft-seed`** — new attended skill (`claude/skills/ft-seed/`, command wrapper, Codex wrapper; snippet SSOT + three derived platform blocks updated). Adopters get the symlink wired by `/ft-update` Step 4 on the bump; re-pasting the AGENTS snippet roster is optional. This is the one adopter action item for the tag message.
- **CORE-618 `SPEC/fixtures/plan/`** — new shared conformance suite for the PLAN.md task-line grammar (six samples + expected-parse JSON + consumer README). Additive; adopters with their own PLAN parsers (caobunga CBN-203, natabula NAT-294) can consume it. No action.
- **CORE-617 unattended full-suite** — `--unattended` Phase 3 now runs the repo's full validation set (justfile → AGENTS.md → CI steps) rather than the attended targeted default; a red the run cannot make green parks `input-needed`. Behavior tightening on the bundled skills + SOP; no migration.
- **CORE-616 receipt-not-transcript / CORE-614 dogfood-receipt-shape** — SPEC + ft-task + DOGFOOD.md clarifications; doc-only.
- **CORE-EPIC-622 drift-ratchet gaps** — .2 skill-directory budget row (flowtron-self CI/§7.1), .3 section-citation resolver (Pair Q + CI step; fixed five citers), .4 viz shared-pure `node:*` ESLint guard + `npm run build` in CI validate. Flowtron-self CI and viz-only; no adopter action.
- **CORE-624 Pair H lift to CI / CORE-623 validation-roster build step / CORE-621 editorconfig final-newline CI step / CORE-625 gitleaks checksum verify** — flowtron-self CI hardening + `SECURITY.md` supply-chain note. No adopter action.
- **CORE-615 task-counter grep anchor** — `/ft-release` §7.1 fix; flowtron-self.
- **CORE-620 `## Completed` rotation** — flowtron's own PLAN.md housekeeping.
- **CORE-626 / 627 / 628** — audit-repo Low findings fixed inline (viz tsconfig types, CONVENTIONS pair list, AGENTS.md layout row). No adopter action.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [x] **Minimal refactor gate** — N/A, no refactor in scope

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

The 3 version edits landed as single-token substitutions: `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118` — all `v5.29.0` → `v5.30.0`. Post-edit residue grep: only the `docs/VERSION-HISTORY.md` v5.29.0 heading (historical), the `docs/MIGRATION.md` retired-skills table (write-once), the `docs/CONTEXT-BUDGET.md` ledger lines (refreshed at §7.1), and the dogfood stamps resolved below — no real drift.

**Dogfood gate resolved 2026-09-20.** Stamp files clean at walk start and again before the writes (`git status --porcelain` empty both times). All three third-party receipts arrived in `docs/DOGFOOD.md`'s fenced shape on the first ask (CORE-614's template held — no paraphrase, no self-invalidation this cut) and passed the three checks: version `v5.30.0` ✓, "My row" `v5.29.0 · 2026-09-19 (dogfooded)` matched the pre-walk matrix ✓, Phase-1 drive named a task + skip ✓. Step-5 ledger re-verify from file state printed nothing. Ledger:

- Claude → `v5.30.0 · 2026-09-20 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:71`
- Grok → `v5.30.0 · 2026-09-20 (dogfooded)` — written — `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:435`. Receipt: Phase-1 drive CORE-630 / skip; status clause clean of session-written files.
- Codex → `v5.30.0 · 2026-09-20 (dogfooded)` — written — `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:474`. Receipt: Phase-1 drive CORE-629 / skip; status clause clean.
- Cursor → `v5.30.0 · 2026-09-20 (dogfooded)` — written — `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:503`. Receipt: Phase-1 drive CORE-630 / skip; status clause clean.

**SOP currency: clean (5 candidates dismissed; tier-2 note: 6 `SPEC.md` commits).** `SPEC/procedures/ft-task.md` (stamp 2026-09-12). Three candidates (`fa7b93a` CORE-603.4, `623c1ed` CORE-605, `4a3c8e1` CORE-604.3) were adjudicated and dismissed at CORE-613 and are unchanged. Two new: `afb0ea6` CORE-622.3 — period moved outside a `§"Fan-out"` citation in `ft-task/SKILL.md`, punctuation only; `d49e427` CORE-616 — "the receipt, not the transcript" gloss on ft-task's Phase 3 bullet, dismissed with the operator because the SOP at `:409-411` already defines the receipt as `command → exit code` + first failure line (the tail by construction). Stamp left un-bumped per the check's contract.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change in this cut

**Testing Notes:**

Markdown mental-pass on the 3 version edits: single-token substitutions, no frontmatter or fenced blocks touched.

Standing validation gate (`AGENTS.md` §"Validation"):

```
npm --prefix viz test           → 29 files, 568 tests passed (exit 0)
npm --prefix viz run typecheck  → exit 0
npm --prefix viz run lint       → exit 0
npm --prefix viz run build      → built in 484ms (exit 0)
node --test tools/update-adopters.test.mjs   → 54 tests, 15 suites, 0 failed (exit 0)
node --check tools/update-adopters.test.mjs  → exit 0
node --check tools/update-adopters.mjs       → exit 0
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit 8a9ecae` returns no runs — HEAD is 16 commits ahead of `origin/main`, never pushed (same posture as CORE-613 / CORE-599 / CORE-586). Resolved by executing every `validate` + `drift` job step locally: gitleaks 8.30.1 (`gitleaks dir . --config .gitleaks.toml --no-banner --redact` → "no leaks found", exit 0), and all 14 drift-job steps extracted from `ci.yml` and run under `bash -e` (the CI default shell — a first pass with `-o pipefail` added falsely failed Pairs B/J/M on a no-match `grep -oE` inside `$(…)`; GitHub's unspecified-shell default is `bash -e {0}` without pipefail, and under that all three pass): wrapper-name invariant, shipped-skill parity, context budget, final newline (new via CORE-621), Pairs A/B/C/H (new via CORE-624)/J/M/N/O/P/Q (new via CORE-622.3) → 14/14 PASS. The post-push run is carried into §7.4 as flag-don't-block.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (exit 0).

Every feature tasknote since v5.29.0 (CORE-614–625 incl. epic children, CORE-626–628 inline) ran its own test pass in its own tasknote; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-20, 18 AI-referenced docs / 4,074 lines; mechanical link + repo-path scan first, 7 false positives triaged; targeted reads of every roster/count/CI surface this cycle's 20 commits touched):** **zero findings across all five passes, health 10/10.** Skill roster on disk (12) matches every roster surface and `/ft-seed` is present on all eight wiring/roster docs; `SPEC/fixtures/plan/` is named in README/AGENTS; SECURITY.md's gitleaks-checksum bullets match `ci.yml`; CONVENTIONS §"GitHub Actions CI" lists the 14 drift steps exactly and the release-only pair list reads `D, F, I, K, and L` at both sites (Pair H correctly absent post-CORE-624). Per-entry verdict for all 18 docs: no change (README.md's task-counter refreshed by the §7.1 standing check, not the sweep). First cut since v5.26.0 with nothing to absorb — consistent with the citation, roster, and validation-mirror checks having moved into the CI drift job.

**§7.1 standing checks + mirror pairs (all run 2026-09-20, independent of the subroutine):**

- Wiring-consumer derivation (both greps exit 1), shipped-skill parity (12 = 12), installed-surface policy (5 diffs; SSOT set = 8 adopter skills incl. `ft-seed`), self-wiring parity local (4 checks) — all PASS.
- Self-wiring parity machine-global (advisory) — **not run**; the path-access guard blocked the `~/.claude/` scan, same as CORE-553 / CORE-586 / CORE-599 / CORE-613. Never blocks commit-go.
- README task-counter — was 964 / 2026-09-19; refreshed inline to **980 tasks, 2026-04-28 to 2026-09-20** (CORE-615's `^` anchor held — no fixture-text false hit this time).
- Context-budget check — 0 OVER BUDGET across all 7 rows (`ft-release/**` at 122,895 / 125,000 is the tightest); §"Known over budget" empty. `docs/CONTEXT-BUDGET.md` §"Ledger" refreshed inline (every row re-measured at v5.30.0; stamp → 2026-09-20 / CORE-629; cold-start sum 118,727 → 120,446, the +1,719 being mostly the tasknote README's CORE-622.3 guard-history paragraph (+1,065) and `SPEC.md`'s ft-seed/fixtures pointers (+566); `ft-release/**` 116,394 → 122,895, `ft-task/**` 73,512 → 74,650).
- Pairs A (10 templates named), F (×2), I (7 flags), K (K1 6 cites + K2 3 sections), L (13 mappings, 1–8 paths each, none vacuous) — all PASS. Pairs B, C, H, J, M, N, O, P, Q verified via their CI drift copies (14/14 green under `bash -e`, bound to §7.1 by Pair L). D owned by the README check; G retired.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-09-20.` at the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.30.0, a minor release headlined by two adopter-facing surfaces and one CI-hardening epic: `SPEC/fixtures/plan/` (CORE-618 — six whole-file PLAN.md samples with expected-parse JSON and a consumer contract, the visualizer's parser as reference consumer at 110 tests), `/ft-seed` (CORE-619 — attended bulk-seeding of `[unattended]` under the candidacy predicate, one review gate, wired into the snippet SSOT and all three derived platform blocks), and CORE-EPIC-622 drift-ratchet gaps (a `ft-release/**` directory-total budget row; Pair Q resolving every path-bearing `§"Title"` citation in live markdown, with N/O's one-file halves retired into it; the viz `node:*` guard over eight shared-pure modules and `vite build` in CI). Around them: CORE-617 makes `--unattended` Phase 3 run the full validation set, CORE-624 lifts Pair H into CI, CORE-621 adds a final-newline CI ratchet, CORE-625 checksum-verifies the CI gitleaks tarball, CORE-614/616 tighten receipts, CORE-620 rotates `## Completed`, and CORE-626–628 close three audit-repo Lows inline. No required adopter-side edits — `/ft-seed` wires via `/ft-update` Step 4.

Standing validation gate passed clean (568 viz tests, 54 fleet-updater tests, typecheck + lint + build clean, 0 `npm audit` findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 16 commits unpushed) and was resolved by executing every `validate` + `drift` job step locally (gitleaks 8.30.1, 14 drift checks incl. new final-newline / Pair H / Pair Q) — all clean under the CI default shell (a `-o pipefail` harness artifact falsely failed B/J/M on the first pass and is recorded in Testing Notes). `/ft-audit docs ai-referenced` returned zero findings over the 18-doc set. All §7.1 standing checks and mirror pairs (A–Q) clean; the README task-counter (964 → 980) and the `docs/CONTEXT-BUDGET.md` ledger were refreshed inline. Machine-global wiring check could not run (path-access guard, same as the prior four cuts) — advisory-only.

**Dogfood gate resolved with all four rows refreshed to `v5.30.0 · 2026-09-20 (dogfooded)`** — the first cut where all three third-party receipts arrived in `docs/DOGFOOD.md`'s fenced shape on the first ask, with no paraphrase, no stamp race, and no self-invalidation (CORE-614's template and scoped status clause did their job). Step-5 ledger re-verify from file state printed nothing at §5 and again at §7.4. SOP currency: clean (5 tier-1 candidates dismissed — three carried over from CORE-613 unchanged, plus a punctuation-only citation fix and a "receipt, not transcript" gloss the SOP already states by construction; tier-2 note: 6 `SPEC.md` commits).

Versioning question raised and settled at PLAN-line filing: the major number counts breaking changes (v1–v5 landed in 25 days in May 2026 as genuine breaks; 30 break-free minors since), not maturity; no renumbering — README maturity note filed as [[CORE-630]].

Scope reconciliation: N/A — no `touches:` declared (fixed release recipe). Files changed beyond the recipe's own set: `README.md` (task counter), `docs/CONTEXT-BUDGET.md` (ledger), `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (dogfood stamps) — each named above.

**Archived:** 2026-09-20
