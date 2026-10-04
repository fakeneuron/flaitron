---
title: release v5.33.0
status: completed
tags: []
created: 2026-09-23
due:
related-tasks: [FE-124, CORE-661, CORE-656, CORE-654]
---

# CORE-674 | release v5.33.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-124]] [[CORE-661]] [[CORE-656]] [[CORE-654]]

## 🎯 Goal

Cut v5.33.0, a minor release tagging FE-124 (viz-ready-filter), CORE-661 (audit-decay-pass), and CORE-656 (review-probe), since v5.32.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.32.0` → `v5.33.0`
- [x] docs/MIGRATION.md example pin bumped `v5.32.0` → `v5.33.0`
- [x] SECURITY.md release-tag example pin bumped `v5.32.0` → `v5.33.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.33.0`, or recorded `skipped @ v5.33.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-674 — flowtron v5.33.0 (...)` commit lands — pending 🟢 GO, part of the atomic §7.5 sequence
- [x] Annotated `v5.33.0` tag created with adopter-facing release notes — pending 🟢 GO, part of the atomic §7.5 sequence
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.33.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin — pending 🟢 GO + push-go, part of the atomic §7.5 sequence
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-674.md`

## 🧩 Subtasks

- [ ] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.32.0 → v5.33.0
- [ ] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [ ] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [ ] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [ ] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [ ] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-654]] — prior release tasknote (v5.32.0), structural precedent
- [[FE-124]] — viz-ready-filter, tagged in this cut
- [[CORE-661]] — audit-decay-pass, tagged in this cut
- [[CORE-656]] — review-probe, tagged in this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-654 / CORE-642 precedent); version drift and commit log verified in `/ft-release` Step 1.1/2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:501`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-654.md` (v5.32.0, prior cut) skimmed as structural precedent; shape matches.

- [x] **Drift check** — `SPEC.md:3` reads `v5.32.0`; `docs/MIGRATION.md:501` and `SECURITY.md:118` example pins both `v5.32.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.32.0`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1). Assumption: no `feat!:` / `BREAKING CHANGE:` in the 28 commits (verified by log classification).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

28 commits since v5.32.0 (4 feat / 1 fix / rest chore+docs), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.32.0 → v5.33.0).

**Adopter migration impact:** no required adopter-side edits. Classified per feat/fix commit:

- **FE-124 viz-ready-filter** — viz-only UI addition (`taskView.ts` `isReady` predicate + header "Ready" toggle). Flowtron-self visualizer feature; no migration.
- **CORE-666 core660-link-fix** — fixed an adopter-relative link inside an in-flight flowtron-self tasknote that CI's Pair Q was flagging as a missing file. Internal housekeeping; no adopter action.
- **CORE-661 audit-decay-pass** — adds Phase 6 "Contract decay" to `/ft-audit`'s `context` domain, explicitly flowtron-self only (SPEC lives in the pinned submodule in an adopter checkout, outside the audited surface per the domain's hard rules). `docs/MIGRATION.md`'s audit-domain table row updated to reflect the new pass count/name; informational only, no adopter action.
- **CORE-656 review-probe** — the headline feature: adds a mandatory Phase 3 "External review" step to the SPEC's 4-phase workflow (a context that did not write the diff grades it against `## ✅ Acceptance`; blocker → back to Phase 2, note → fixed or filed). Ships in `claude/skills/ft-task/SKILL.md`, `step-5-loop-mode.md`, `ft-close-epic`, `ft-epic-discovery`, and `templates/subagent-probe-template.md` — reaches every adopter's next `/ft-task` run automatically via the submodule pin bump, no manual step required. Neither `--fast` nor `--unattended` suppresses it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [x] **Minimal refactor gate** — N/A, no refactor in scope

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

The 3 version edits landed as single-token substitutions: `SPEC.md:3`, `docs/MIGRATION.md:501`, `SECURITY.md:118` — all `v5.32.0` → `v5.33.0`. Post-edit residue grep: only historical refs (`docs/VERSION-HISTORY.md` heading, `docs/CONTEXT-BUDGET.md` narrative) and the dogfood stamps (resolved below) — no real drift.

**Dogfood gate resolved 2026-09-23.** Stamp files clean at walk start (`git status --porcelain` empty). All four dogfooded rows resolved as **Refreshed** at `v5.33.0 · 2026-09-23 (dogfooded)`, each on a receipt satisfying the three-check evidence standard (version reads v5.33.0; "My row" matches the pre-write stamp; Phase-1 drive names a task + exit-gate decision). Ledger:

- Claude → `v5.33.0 · 2026-09-23 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:73`
- Grok → `v5.33.0 · 2026-09-23 (dogfooded)` — written (operator-supplied receipt: Task CORE-641, exit-gate skip ✅) — `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:440`
- Codex → `v5.33.0 · 2026-09-23 (dogfooded)` — written (operator-supplied receipt: Task CORE-641, exit-gate fire 🛠️) — `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:479`
- Cursor → `v5.33.0 · 2026-09-23 (dogfooded)` — written (operator-supplied receipt: Task CORE-641, exit-gate skip ✅) — `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:508`

Step-5 ledger re-verify from file state printed nothing.

**SOP currency: 2 candidates dismissed, 1 real finding filed as CORE-675.** `SPEC/procedures/ft-task.md` (stamp 2026-09-12, unchanged — this check flags, never bumps). 3 tier-1 candidates since the CORE-654 cut's dismissed set: `da5245ea` CORE-673 (code-review-level-pin) dismissed — Claude-only skill-dispatch field (`/code-review medium` pin in `claude/skills/ft-task/SKILL.md`'s Phase 3 prose; the SOP's agent-neutral External review already briefs a read-only sub-agent via `templates/subagent-probe-template.md`, unaffected). `f8c44275` CORE-664 (spec-section-extract) dismissed — citation-only repoint in `claude/skills/ft-task/SKILL.md`; the SOP's two `SPEC.md §"Task-line format"` citations (grammar/ordering/capture semantics) still resolve against the retained stub per CORE-664's own design (per-segment table and worked examples moved out, grammar/ordering stayed). `a233a315` CORE-658 (learnings-box) is a **real finding**: it added a Phase-4 "Learnings" checklist item to `SPEC.md` and `templates/tasknote-template.md`, but the SOP's own Phase 4 restatement (`SPEC/procedures/ft-task.md` "5 — Phases 2-4") names every other Phase-4 item (doc-drift sweep, tick-through, status flip, Archived stamp, superseded pointer, PLAN flip, recap) except this one — filed as [[CORE-675]] via `/ft-file-followup` (uncommitted; rides into this cut's closure commit since PLAN.md was already dirty). Tier-2 note: 14 `SPEC.md` commits since stamp, not skimmed (no tier-1 finding pointed at a restated section beyond the one filed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero

- [x] **External review** — N/A, following the canonical `/ft-release` recipe verbatim; this cut's own §6.1/§6.2/§7.1 checks are the review

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change in this cut

**Testing Notes:**

Markdown mental-pass on the 3 version edits: single-token substitutions, no frontmatter or fenced blocks touched.

Standing validation gate (`AGENTS.md` §"Validation"):

```
npm --prefix viz test           → 29 files, 587 tests passed (exit 0)
npm --prefix viz run typecheck  → exit 0
npm --prefix viz run lint       → exit 0
npm --prefix viz run build      → built in 218ms (exit 0)
node --test tools/update-adopters.test.mjs   → 54 tests, 0 failed (exit 0)
node --check tools/update-adopters.test.mjs  → exit 0
node --check tools/update-adopters.mjs       → exit 0
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit 749ed6be` returns no runs — HEAD is 35 commits ahead of `origin/main`, never pushed (same posture as CORE-654/CORE-642). `origin/main` (4bd1805d) has its own run `completed · success`. Resolved by executing every `validate` + `drift` job step locally: gitleaks 8.30.1 (`gitleaks dir . --config .gitleaks.toml --no-banner --redact` → "no leaks found"), and all 15 drift-job steps extracted from `ci.yml` (wrapper-name invariant, shipped-skill parity, context budget, final newline, Pairs A/B/C/H/J/M/N/O/P/Q/R) run locally → 15/15 PASS. Pair O's `-qv` grep combination initially false-failed under this session's `ugrep` shell-function shadow (a zsh snapshot artifact, not a repo issue); re-run with the real `grep` binary via a plain `bash -c` subshell (which does not inherit the interactive shell's function) confirmed PASS.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (exit 0).

Every feature tasknote since v5.32.0 ran its own test pass in its own tasknote; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**

- [x] Closed

- [x] **Evidence-based recap** drafted

- [x] **Learnings** — N/A, no durable insight beyond what CORE-675 already filed as a follow-up (the SOP-currency check itself worked as designed)

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-23, 18 AI-referenced docs; changed-file diff review targeted at the 10 docs this cycle's 28 commits touched or this cut's own edits touched — AGENTS.md, README.md, SPEC.md, claude/CAPABILITIES.md, docs/AGENT-NEUTRALITY.md, docs/EXTERNAL-AGENTS.md, docs/MIGRATION.md, plus docs/AGENT-COMPAT.md / docs/PLATFORMS.md / SECURITY.md from this cut's own version + dogfood edits; the CI-mirrored Pair Q section-citation resolver already covers cross-references over the whole tree):** **zero findings across all five passes, health 10/10. Fourth consecutive clean cut.** `README.md`'s new `docs/HARNESS-SURVEY.md` link resolves to a real file; the CORE-656 review-probe addition (SPEC.md, README.md, claude/CAPABILITIES.md, docs/GLOSSARY.md, docs/AGENT-NEUTRALITY.md) is internally consistent and correctly pins `/code-review medium` everywhere it's named (matching CORE-673); the CORE-664 citation repoints (docs/AGENT-NEUTRALITY.md, docs/EXTERNAL-AGENTS.md, docs/MIGRATION.md, AGENTS.md) all resolve to `SPEC/task-line-segments.md`, confirmed present by Pair Q; the CORE-658 Learnings-box addition is present and consistent in SPEC.md and templates/tasknote-template.md. The three version pins (SPEC.md/docs/MIGRATION.md/SECURITY.md) and the four dogfood stamps read `v5.33.0 · 2026-09-23 (dogfooded)` consistently across docs/AGENT-COMPAT.md, docs/PLATFORMS.md, claude/CAPABILITIES.md. The eight untouched docs (CONTRIBUTING.md, docs/CONVENTIONS.md, docs/WORKTREES.md, docs/VISION.md, the four `AGENTS-snippet.md` files) carry no change. No stale "as of" dates found. Per-entry verdict for all 18 docs: no change beyond what's named above.

**§7.1 standing checks + mirror pairs (all run 2026-09-23, independent of the subroutine):**

- Wiring-consumer derivation (both greps exit 1), shipped-skill parity (already verified 15/15 at §6.1), installed-surface policy (5 diffs; SSOT set = 8 adopter skills), self-wiring parity local (4 checks) — all PASS.
- Self-wiring parity machine-global (advisory) — **not run**; the path-access guard blocked the `~/.claude/` scan, same as every prior cut. Never blocks commit-go.
- README task-counter — was 1011 / 2026-09-21; refreshed inline to **1037 tasks, 2026-04-28 to 2026-09-23**.
- Completed-rotation (advisory) — **92 rows (>60)**. Rotate out of band.
- Viz-majors-outdated (advisory) — `typescript 5.9.3→7.0.2`, still the same parked candidate (CORE-641).
- Context-budget check — 0 OVER BUDGET across all rows (`ft-release/**` unchanged at 113,985). §"Known over budget" empty. `docs/CONTEXT-BUDGET.md` §"Ledger" refreshed inline (stamp → 2026-09-23 / CORE-674 / v5.33.0; cold-start sum 121,840 → 121,609 via `gates.md` −464 against `ft-task/SKILL.md` +218 and `SPEC.md` +15; `SPEC.md` 46,908 → 46,923, `ft-task/SKILL.md` 29,120 → 29,338, `SPEC/gates.md` 20,796 → 20,332, `SPEC/procedures/ft-task.md` 35,935 → 34,115, `SPEC/plan-filing.md` 15,991 → 17,176 (CORE-667's fast-rescope-park-drift carve-out), `SPEC/blocked.md` 12,100 → 14,627 (CORE-665's phase1-attended-park widening), new `SPEC/task-line-segments.md` row added at 5,691 (CORE-664 extraction, previously unlisted), `ft-epic-discovery`/`ft-close-epic`/`ft-audit`/`ft-file-followup`/`ft-refactor`/`ft-seed`/`ft-audit-repo` SKILL.md rows drifted single- to low-triple-digits each, `ft-task/**` whole-directory total 74,652 → 76,823).
- Pairs A, F (×2), I, K (K1 + K2), L (3 source rows + 11 catalogue rows) — all PASS. Pairs B, C, H, J, M, N, O, P, Q, R already run via the local CI-shell extraction at §6.1 on the working tree after this cut's edits (15/15 PASS there, superset of the 11 CI-lifted pairs).

**Final Summary:**

Cut flowtron v5.33.0, a minor release headlined by CORE-656's Phase 3 External review — a context that did not write the diff now grades it against `## ✅ Acceptance` on two rungs (blocker / note) before every closure, closing the self-grading gap `docs/HARNESS-SURVEY.md` ranked #1. Alongside it: CORE-661 adds a sixth "Contract decay" pass to `/ft-audit`'s `context` domain (flowtron-self only), FE-124 gives the visualizer a "Ready" filter, and FE-EPIC-125 (+ FE-126) completes a comment/provenance trim pass across the visualizer and `vite.config.ts`. CORE-EPIC-670 closed a context-headroom epic that shrank several always-loaded and lazy SPEC surfaces with no cap raised, and a second-pass harness survey (`docs/HARNESS-SURVEY.md`) compares flowtron against 17 contemporary harnesses. CORE-673 pins `/code-review medium` at every External-review call site so an unattended run can't inherit a leftover interactive level. No required adopter-side edits.

Standing validation gate passed clean (587 viz tests, 54 fleet-updater tests, typecheck + lint + build clean, 0 `npm audit` findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 35 commits unpushed) and was resolved by executing every `validate` + `drift` job step locally (gitleaks 8.30.1, 15 drift checks) — all clean, after working around a session-local `ugrep` shell-function shadow that initially false-failed Pair O. `/ft-audit docs ai-referenced` returned zero findings over the changed-file set for the fourth consecutive cut. All §7.1 standing checks and mirror pairs (A–R, D, F, I, K, L) clean; the README task-counter (1011 → 1037) and the `docs/CONTEXT-BUDGET.md` ledger were refreshed inline. Advisories: completed-rotation 92 rows (>60) — rotate out of band; typescript 7 major still parked (CORE-641); machine-global wiring check not run (path-access guard, same as every prior cut).

Dogfood gate resolved: all four dogfooded rows (Claude / Grok / Codex / Cursor) refreshed to `v5.33.0 · 2026-09-23 (dogfooded)` — Claude on this session's own verification, the other three on operator-supplied receipts satisfying the three-check evidence standard. Step-5 ledger re-verify from file state printed nothing. SOP currency: 2 candidates dismissed (Claude-only skill-dispatch field, citation-only repoint), 1 real finding filed as [[CORE-675]] (SOP's Phase 4 restatement missing the CORE-658 Learnings item).

Scope reconciliation: N/A — no `touches:` declared (fixed release recipe). Files changed beyond the recipe's own set: `README.md` (task counter), `docs/CONTEXT-BUDGET.md` (ledger), `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (dogfood stamps), `.flowtron/PLAN.md` (also carries the CORE-675 follow-up filing) — each named above.

**Archived:** 2026-09-23
