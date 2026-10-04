---
title: release v5.29.0
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-EPIC-603, CORE-EPIC-604, CORE-EPIC-610, CORE-605, CORE-606, CORE-607, CORE-608, CORE-609, CORE-611, CORE-612, CORE-601, FE-121, CORE-599]
---

# CORE-613 | release v5.29.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-603]] [[CORE-EPIC-604]] [[CORE-EPIC-610]] [[CORE-605]] [[CORE-606]] [[CORE-607]] [[CORE-608]] [[CORE-609]] [[CORE-611]] [[CORE-612]] [[CORE-601]] [[FE-121]] [[CORE-599]]

## 🎯 Goal

Cut v5.29.0, a minor release tagging the skill-roster-diet epic (CORE-EPIC-603), the gate-tiering-cold-start epic (CORE-EPIC-604), the archive-closure-integrity epic (CORE-EPIC-610), the CORE-605–609 / 611 / 612 audit-repo follow-ups, and the CORE-601 / FE-121 unattended fixes since v5.28.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.28.0` → `v5.29.0`
- [x] docs/MIGRATION.md example pin bumped `v5.28.0` → `v5.29.0`
- [x] SECURITY.md release-tag example pin bumped `v5.28.0` → `v5.29.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.29.0`, or recorded `skipped @ v5.29.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-613 — flowtron v5.29.0 (...)` commit lands
- [x] Annotated `v5.29.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.29.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-613.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.28.0 → v5.29.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-599]] — prior release tasknote (v5.28.0), structural precedent
- [[CORE-EPIC-603]] — skill-roster-diet epic, tagged in this cut
- [[CORE-EPIC-604]] — gate-tiering-cold-start epic, tagged in this cut
- [[CORE-EPIC-610]] — archive-closure-integrity epic, tagged in this cut
- [[CORE-605]] [[CORE-606]] [[CORE-607]] [[CORE-608]] [[CORE-609]] [[CORE-611]] [[CORE-612]] — audit-repo follow-ups, tagged in this cut
- [[CORE-601]] [[FE-121]] — unattended fixes (updater legacy-only report, viz local-storage helper), tagged in this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-599 / CORE-586 precedent); version drift and commit log verified in `/ft-release` Step 1.1/2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-599.md` (v5.28.0) skimmed as structural precedent; shape matches. Carried-forward lessons: (1) dogfood stamps re-verified from file state at §7.4 (CORE-588); (2) Step 6.1 CI check finds no runs when HEAD is unpushed — resolve by executing the `validate` + `drift` job steps locally; (3) `docs/CONTEXT-BUDGET.md` ledger is refreshed inline at §7.1 — this cycle CORE-603.2/.3/.4, CORE-605, CORE-607, CORE-608 each explicitly deferred their byte re-measure to this cut.

- [x] **Drift check** — `SPEC.md:3` reads `v5.28.0`; `docs/MIGRATION.md:487` and `SECURITY.md:118` example pins both `v5.28.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.28.0`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1 of `/ft-release`).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

31 commits since v5.28.0 (21 feat / 2 docs / 8 chore), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.28.0 → v5.29.0). 104 files changed (+4462 / −1321).

**Adopter migration impact:** no *required* adopter-side edits, but one optional cleanup item. Classified per commit:

- **CORE-603.2 / 603.3 — three skills retired** (`ft-flowtron`, `ft-stats`, `ft-audit-context`; `claude/commands/`, `claude/skills/`, `codex/skills/` copies all deleted). Adopters who symlinked them into `.claude/`, `.agents/`, or a global agent home will have dangling symlinks — `/ft-update` Step 4.6 reports them on the bump; `docs/MIGRATION.md` §retired-skills table carries the three v5.29.0 rows with replacements (`/ft-audit context` for the context audit; `SPEC.md` `**Version:**` / `SPEC/layout.md` §"Skill namespace" for the info screen; `viz/` for stats). This is the one adopter action item for the tag message.
- **CORE-603.3 `context` domain** — `ft-audit` is now eight domains (`passes/context.md` new, runs unforked). Full-copy audit forks pick up the new pass file via `/ft-update`'s fork-refresh; forkers may add `context` to their overlay's domain list (`templates/audit-overlay-template.md` updated).
- **CORE-603.4 description trims** — 7 Claude + 2 Codex `SKILL.md` frontmatter descriptions ≤400 chars; behavior unchanged, reaches adopters via bump.
- **CORE-604.2 `SPEC/gate-postures.md` + CORE-607 `SPEC/post-closure.md`** — lazy-module extractions from `SPEC/gates.md` / `SPEC.md`; stubs left at every moved heading, so every copied citation (adopter paste-block included) resolves one hop. No action.
- **CORE-604.3 runner/stub trim; `[model]` ladder moved into `SPEC.md` §"Model field"; vendor calibration table moved to `docs/PLATFORMS.md`** — contract/skill edits, reach adopters through the bump.
- **CORE-604.4 `## Completed` rotation threshold 100/150 → 60 rows, oldest-rows-by-count granularity** — `templates/PLAN.md` footer + `docs/MIGRATION.md` prose updated; adopters see the advisory earlier. Rotation remains an operator motion; no forced action. Adopters who copied `templates/PLAN.md`'s footer may re-paste (optional).
- **CORE-605 / CORE-609 / CORE-611 / CORE-612 / CORE-608** — citation rewording (`templates/tasknote-template.md` Closed-line), `docs/CONVENTIONS.md` bold-lead citation convention, README glossary count, `caobunga:` commit type, procedures budget row — flowtron-self / doc-only.
- **CORE-606 sidequest-stub retirement check** — runners now execute the stub-retirement rule on promotion; behavior tightening only.
- **CORE-EPIC-610 archive-closure integrity** — Pair P CI check + executable pre-archive gate (`status: completed`, no bare `- [ ]` under Acceptance, `**Archived:**` filled) in `/ft-task`, `/ft-micro-task`, `SPEC/procedures/ft-task.md`. Floor applies to tasknotes archived on/after 2026-09-20. Adopters running the bundled skills get stricter closure; pre-floor archives exempt. No migration.
- **CORE-601 updater legacy-only report** — operator-side `tools/update-adopters.mjs`; no adopter impact.
- **FE-121 `viz/src/storage.ts`** — viz-only pure refactor; adopters running `viz/` get it on bump.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [x] **Minimal refactor gate** — N/A, no refactor in scope

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

The 3 version edits landed as single-token substitutions: `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118` — all `v5.28.0` → `v5.29.0`. Post-edit residue grep: only the `docs/VERSION-HISTORY.md` v5.28.0 heading (historical), the `docs/CONTEXT-BUDGET.md` ledger lines (refreshed at §7.1), and the dogfood stamps resolved below — no real drift.

**Dogfood gate resolved 2026-09-19.** Stamp files clean at walk start (`git status --porcelain` empty). Mid-walk, the Grok Build session **wrote its own stamp directly** into `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:435` despite `docs/DOGFOOD.md` §"Reporting the result" being report-only — caught by step 3's foreign-dirt check, `git checkout`-reverted, and the row resolved here against its receipt instead (fourth occurrence of the CORE-406/501/588 race class; the mechanical check held). `git status --porcelain` re-checked before each of the four writes; step-5 ledger re-verify from file state printed nothing. Ledger:

- Claude → `v5.29.0 · 2026-09-19 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:71`
- Grok → `v5.29.0 · 2026-09-19 (dogfooded)` — written — `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:435`. Receipt (pasted on second ask; first paste was a paraphrase): version `v5.29.0` ✓, "My row" `v5.28.0 · 2026-09-14 (dogfooded)` matched the pre-walk matrix ✓, Phase-1 drive CORE-613 / skip ✓.
- Codex → `v5.29.0 · 2026-09-19 (dogfooded)` — written (drops the `; skipped @ v5.28.0` suffix) — `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:474`. Receipt: all three checks pass; the session self-reported "not stamp-refreshable" because `git status` was not clean — the dirt was this cut's own version-pin edits (the only way a same-checkout receipt can read `v5.29.0`), not anything Codex wrote. Operator accepted Refreshed. **Observation:** DOGFOOD.md Step 3's `git status: clean` expectation cannot coexist with the receipt-must-read-new-version rule in a same-checkout cut — follow-up candidate.
- Cursor → `v5.29.0 · 2026-09-19 (dogfooded)` — written — `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:503`. Receipt (pasted on second ask): version `v5.29.0` ✓, row matched ✓, CORE-613 / skip ✓; session reported zero writes.

**SOP currency: clean (3 candidates dismissed; tier-2 note: 3 `SPEC.md` commits).** `SPEC/procedures/ft-task.md` (stamp 2026-09-12). Tier-1 candidates adjudicated with the operator: `fa7b93a` CORE-603.4 — Claude-only `description:` frontmatter, no neutral surface; `623c1ed` CORE-605 — template Closed-line citation reword, SOP `:441-447` already states placement inline; `4a3c8e1` CORE-604.3 — Claude-runner context trim (posture de-restated into Step 0, `[model]` ladder moved into `SPEC.md`), SOP behavior unchanged and it has no Step 0 to consolidate into. Stamp left un-bumped per the check's contract.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change in this cut

**Testing Notes:**

Markdown mental-pass on the 3 version edits: single-token substitutions, no frontmatter or fenced blocks touched.

Standing validation gate (`AGENTS.md` §"Validation"):

```
npm --prefix viz test           → 29 files, 561 tests passed (exit 0)
npm --prefix viz run typecheck  → exit 0
npm --prefix viz run lint       → exit 0
node --test tools/update-adopters.test.mjs   → 54 tests, 15 suites, 0 failed (exit 0)
node --check tools/update-adopters.test.mjs  → exit 0
node --check tools/update-adopters.mjs       → exit 0
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit f623920` returns no runs — HEAD is 31 commits ahead of `origin/main`, never pushed (same posture as CORE-599 / CORE-586). Resolved by executing every `validate` + `drift` job step locally: gitleaks (`gitleaks dir . --config .gitleaks.toml --no-banner --redact` → "no leaks found"), and all 11 drift-job steps extracted from `ci.yml` and run under `set -e` (wrapper-name invariant, shipped-skill parity, context budget, Pairs A/B/C/J/M/N/O/P — Pair P new this cycle via CORE-610.2; Pair E retired via CORE-603.2) → 11/11 PASS. The post-push run is carried into §7.4 as flag-don't-block.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (exit 0).

Every feature tasknote since v5.28.0 (CORE-600–612 incl. epic children, FE-121) ran its own test pass in its own tasknote; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-19, 18 AI-referenced docs / 4,053 lines; mechanical link + `§"Section"` citation scan first, 5 false positives triaged; targeted reads of every section this cycle's 31 commits touched):** three findings, all Low, health 9/10, all absorbed into the cut as one-token doc edits on operator confirm:

1. Low / cross-doc — `docs/CONVENTIONS.md:58` §7.1-only pair roster named retired Pair G and omitted Pair L → `Pairs D, F, H, I, K, and L`.
2. Low / cross-ref — `docs/EXTERNAL-AGENTS.md:117` `§"What flowtron deliberately is not."` carried the period inside the quotes → moved outside.
3. Low / currency — `docs/PLATFORMS.md:119` "the shipped inventory has grown since" (18 → now 11) → `changed`.

Per-entry verdicts for the other 15 docs: no change (README.md's task-counter refreshed by the §7.1 standing check, not the sweep). Observation, out of sweep scope: `docs/DOGFOOD.md` Step 3's `git status: clean` expectation cannot hold in a same-checkout cut whose receipt must read the post-edit version — see Implementation Notes (Codex row).

**§7.1 standing checks + mirror pairs (all run 2026-09-19, independent of the subroutine):**

- Wiring-consumer derivation (both greps exit 1), shipped-skill parity, installed-surface policy (5 diffs), self-wiring parity local (4 checks) — all PASS.
- Self-wiring parity machine-global (advisory) — **not run**; the path-access guard blocked the `~/.claude/` scan, same as CORE-553 / CORE-586 / CORE-599. Never blocks commit-go.
- README task-counter — was 939 / 2026-09-14; refreshed inline to **964 tasks, 2026-04-28 to 2026-09-19**. The fragment's date grep surfaced a `2026-09-20` hit that is CORE-610.2's *fixture description* (`:125`), not its stamp (`:153`) — the grep is unanchored; latest real stamp is 2026-09-19.
- Context-budget check — 0 OVER BUDGET; §"Known over budget" empty. `docs/CONTEXT-BUDGET.md` §"Ledger" refreshed inline (all rows re-measured at v5.29.0; stamp → 2026-09-19 / CORE-613; skill list drops the three v5.29.0 retirements with a retirement note; cold-start sum 117,719 → 118,727, the +1,008 on `ft-task/SKILL.md` being CORE-EPIC-610's pre-archive gate).
- Pairs A, B, C, F (×2), H (×2), I, J, K (K1+K2), L, M, N, O, P — all PASS, loops confirmed non-vacuous (K1 6 cites, L 12 CI steps, N 6 files, O 5 files). D owned by the README check; G retired.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.29.0, a minor release headlined by three epics: the skill-roster diet (CORE-EPIC-603 — `ft-flowtron`, `ft-stats`, `ft-audit-context` retired, the last folded into `/ft-audit` as its eighth `context` domain; seven skill descriptions trimmed to ≤400 chars), the gate-tiering cold-start cut (CORE-EPIC-604 — `--fast` / `--unattended` postures split into lazy `SPEC/gate-postures.md`, runner posture de-restated to Step 0, `[model]` ladder into `SPEC.md`, vendor table into `docs/PLATFORMS.md`, `## Completed` rotation lowered to a single 60-row threshold with flowtron's own 88-row rotation), and archive-closure integrity (CORE-EPIC-610 — executable pre-archive gate on every closure surface plus CI Pair P over archives dated ≥ 2026-09-20). Around them: CORE-607 moved the post-closure protocol into lazy `SPEC/post-closure.md` and lowered `SPEC.md`'s cap 57k → 53k, CORE-605 took `plan-filing.md` off the flagless closure path, CORE-606 made the sidequest stub-retirement rule executable, CORE-608 budgeted the agent-neutral SOP, CORE-609/611/612 landed doc conventions, CORE-601 fixed the updater's legacy-only report, and FE-121 extracted viz `storage.ts`. Flagless `/ft-task` cold start: ≈172k → ≈119k chars. No required adopter-side edits — the three retirements surface as `/ft-update` Step 4.6 dangling-symlink reports; `/ft-audit-context` callers switch to `/ft-audit context`.

Standing validation gate passed clean (561 viz tests, 54 fleet-updater tests, typecheck + lint clean, 0 `npm audit` findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 31 commits unpushed) and was resolved by executing every `validate` + `drift` job step locally (gitleaks, 11 drift checks incl. new Pair P; Pair E retired) — all clean. `/ft-audit docs ai-referenced` returned three Low findings (health 9/10) over the 18-doc set, all absorbed as one-token edits: the CONVENTIONS §7.1-only pair roster (retired G → L), a period-inside-quotes citation in EXTERNAL-AGENTS, and an inverted "grown" in PLATFORMS. All §7.1 standing checks and mirror pairs (A–P) clean; the README task-counter (939 → 964) and the `docs/CONTEXT-BUDGET.md` ledger were refreshed inline. Machine-global wiring check could not run (path-access guard, same as the prior three cuts) — advisory-only, never-blocking.

**Dogfood gate resolved with all four rows refreshed to `v5.29.0 · 2026-09-19 (dogfooded)`** — the first cut since v5.22.0 with Codex current. One race this cut: the Grok session wrote its stamps directly despite the report-only DOGFOOD.md contract; step 3's foreign-dirt check caught it, the write was reverted, and the row was resolved here against a proper receipt on the second ask (Cursor likewise supplied `Log:` lines on the second ask). Codex's receipt passed all three checks but self-reported `git status` dirty — the dirt being this cut's own version-pin edits — and was accepted as Refreshed; the DOGFOOD.md clean-status clause vs. same-checkout receipts is a follow-up candidate. Step-5 ledger re-verify from file state printed nothing. SOP currency: clean (3 tier-1 candidates dismissed with the operator — Claude-only frontmatter, an already-in-shape SOP passage, a Claude-runner context trim with no behavior delta; tier-2 note: 3 `SPEC.md` commits).

Scope reconciliation: N/A — no `touches:` declared (fixed release recipe). Files changed beyond the recipe's own set: `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`, `docs/PLATFORMS.md` (sweep + dogfood), `README.md`, `docs/CONTEXT-BUDGET.md`, `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md` — each named above.

**Archived:** 2026-09-19
