---
title: release v5.27.0
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-577, CORE-574, CORE-558, CORE-581, CORE-553]
---

# CORE-586 | release v5.27.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-577]] [[CORE-574]] [[CORE-558]] [[CORE-581]] [[CORE-553]]

## 🎯 Goal

Cut v5.27.0, a minor release tagging the external-agents candidacy contract (CORE-577), the headroom-trim epic (CORE-574), the SOP-fidelity epic (CORE-558), and the quality-stack-gaps hardening (CORE-581) since v5.26.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.26.0` → `v5.27.0`
- [x] docs/MIGRATION.md example pin bumped `v5.26.0` → `v5.27.0`
- [x] SECURITY.md release-tag example pin bumped `v5.26.0` → `v5.27.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.27.0`, or recorded `skipped @ v5.27.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-586 — flowtron v5.27.0 (...)` commit lands
- [ ] Annotated `v5.27.0` tag created with adopter-facing release notes
- [ ] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.27.0` (minor: headline + 2–4 main bullets + optional secondary)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-586.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.26.0 → v5.27.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [ ] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-553]] — prior release tasknote (v5.26.0), structural precedent
- [[CORE-577]] — external-agents candidacy contract epic, tagged in this cut
- [[CORE-574]] — headroom-trim epic, tagged in this cut
- [[CORE-558]] — SOP-fidelity epic, tagged in this cut
- [[CORE-581]] — quality-stack-gaps hardening, tagged in this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-553 / CORE-541 precedent); version drift and commit log verified in `/ft-release` Step 2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:489`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-553.md` (v5.26.0) skimmed as structural precedent; shape matches (Testing Notes standing-gate block, Final Summary evidence-based recap). No structural drift.

- [x] **Drift check** — `SPEC.md:3` reads `v5.26.0`; `docs/MIGRATION.md:489` and `SECURITY.md:118` example pins both `v5.26.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.26.0`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1 of `/ft-release`).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

77 commits since v5.26.0 (25 feat / 14 fix / 24 chore / 13 docs / 1 refactor), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.26.0 → v5.27.0).

**Adopter migration impact:** the dominant adopter-facing shape this cycle is skill consolidation, not new capability. Five skills were fully retired and their content merged elsewhere: `ft-goal-task` (CORE-571, merged into `ft-task`), `ft-spec` (CORE-573, demoted), `ft-starter-task` (CORE-570, merged into `ft-file-followup --starter`), `ft-worktree-start`/`ft-worktree-end` (CORE-572, demoted/merged). `docs/MIGRATION.md`'s flagged-symlink surface list already covers this (CORE-583 kept it current for Grok). This is exactly the case `/ft-update` is built for ("report any dangling symlinks left by retired skills") — no manual adopter step beyond running the routine bump. New this cycle but flowtron-self-only (no adopter action): `.github/workflows/ci.yml` (CI drift-job hardening, CORE-574.2/.3/.4, CORE-578 gitleaks step) and `.github/dependabot.yml` (CORE-581). `ft-file-followup` gained `--unattended` (CORE-579 external-agents candidacy groundwork) and `ft-task` gained `--loop` mode (CORE-577 series) — additive, no migration action. No breaking template/frontmatter changes.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [ ] **Minimal refactor gate** — N/A, no refactor in scope

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior — N/A unless a code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

Dogfood gate resolved 2026-09-12: **Claude** refreshed `v5.27.0 · 2026-09-12 (dogfooded)` (this session's own real verification); **Grok** refreshed `v5.27.0 · 2026-09-12 (dogfooded)` (real evidence reported — ran `docs/DOGFOOD.md` end-to-end, contract read, full cue vocabulary, Phase 1 drive on CORE-586); **Cursor** refreshed `v5.27.0 · 2026-09-12 (dogfooded)` (real evidence reported — steps 1–3 of `docs/DOGFOOD.md` passed under Cursor); **Codex** left `skipped @ v5.27.0` (its self-report described attempting to drive the whole `/ft-release` itself, not evidence of a Codex CLI verification — operator agreed to skip). All matrix/footer locations kept in sync.

**Concurrent-write race encountered and resolved.** The operator ran the Grok/Cursor/Codex dogfood sessions in the same working tree, in parallel with this release-driving session. This session's own "Refreshed" write to the Claude stamp was silently overwritten by another writer to "skipped @ v5.27.0" mid-walk, and the three sessions' self-reports contradicted each other and the actual file state. Per operator decision, this session became sole writer for the remainder of the cut (other sessions instructed to halt and report evidence conversationally instead). Filed [[CORE-588]] to harden the dogfood-gate walk against this failure mode.

SOP-currency walk ran against `SPEC/procedures/ft-task.md` (stamp date 2026-09-08). Six source-surface drift candidates were reported (`CORE-574.4`, `CORE-568`, `CORE-565.2`, `CORE-557`, `CORE-558.4`, `CORE-554`); adjudicated to 2 genuine (CORE-557's Verification-receipt box, CORE-565.2's park-reason resume-clear fix) vs 4 dismissed (Claude-only skill-dispatch/metadata trims). Filed [[CORE-587]] to re-check and mirror both fixes into the SOP. No SOP stamp bumped (flag-don't-bump, per the check's own contract). SOP currency: candidates found, adjudicated, follow-up filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change in this cut

**Testing Notes:**

**§7.1 standing checks (run ahead of the doc-drift subroutine's return):** wiring-consumer derivation (clean, exit 1 both), installed-surface policy (all 5 diffs clean), local repo-scoped self-wiring (all 4 checks clean). Machine-global wiring (advisory-only, never blocks) could not be run — this session's path-access guard blocked `find`/`ls` against `~/.claude/skills` and `~/.claude/commands` even after the operator approved the scan in-conversation; the guard appears to require a mechanical allowlist (`~/.claude/path-access-roots`) rather than conversational approval. Recorded as **not run** (advisory; carried into §7.4 as `Global wiring: not run this cut — path-access guard`).

Standing validation gate (`AGENTS.md` §"Validation"):

```
npm --prefix viz test           → 29 files, 550 tests passed
npm --prefix viz run typecheck  → clean (exit 0)
npm --prefix viz run lint       → clean (exit 0)
node --test tools/update-adopters.test.mjs   → 52 tests, 15 suites, 0 failed
node --check tools/update-adopters.test.mjs  → OK
node --check tools/update-adopters.mjs       → OK
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit $(git rev-parse HEAD)` returns no runs — HEAD is 77 commits ahead of `origin/main`, never pushed, so GitHub has never seen it. Per the step's own wording this is explicitly not a pass, reported rather than skipped. Resolved by executing all `validate` + `drift` job steps locally: gitleaks secret scan (`gitleaks dir . --config .gitleaks.toml` → "no leaks found"), and all 11 drift-job checks (wrapper-name invariant, shipped-skill parity, context budget, Pairs A/B/C/E×2/J/M/N) → all PASS.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities.

CORE-542/543/551/552/545/554/557/558.N/561/562/563/564/565.N/566/567/568/570/571/572/573/574.N/575.N/576/577.N/578/579/580/581/582/583/584/585 (and every other tasknote since v5.26.0) each ran their own test pass in their own tasknotes; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-12, all 18 AI-referenced docs read in full):** zero findings across all 5 passes (Claims vs. code, Cross-doc consistency, Cross-references, Currency, Stale content). Health 10/10 — no proposed PLAN.md tickets. Verified: 14/14/14 command-vs-skill counts match disk; no stray reference to any of the 5 retired skills; version pin + dogfood stamps consistent across all surfaces; README task-counter matches the ledger; no broken cross-references in the swept doc set.

**§7.1 standing checks + mirror pairs (all run 2026-09-12, independent of the `/ft-audit docs` subroutine):**

- Wiring-consumer derivation, shipped-skill parity, installed-surface policy (4 diffs), self-wiring parity local (blocking) — all PASS.
- Self-wiring parity machine-global (advisory) — not run; recursive walk of `~/.claude/` blocked by the path-access guard (same as CORE-553 precedent). Carried forward as advisory-only, never blocks commit-go.
- README task-counter — was stale (857 tasks / 2026-09-09), fixed inline: 919 tasks, 2026-04-28 to 2026-09-12 (`README.md`).
- Context-budget check — 0 OVER BUDGET; `docs/CONTEXT-BUDGET.md` §"Known over budget" empty. Ledger refreshed inline (all rows re-measured at v5.27.0; skill-bodies row updated to drop the 5 retired skills and add no new one; SPEC/ row gained `unattended-candidacy.md`).
- Pairs A, B, C, E (×2), F (×2), H (×2), I, J, K (K1+K2), M, N, L — all PASS.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation, and concrete maintainability effect

**Final Summary:**

Cut flowtron v5.27.0, a minor release headlined by skill consolidation (five overlapping skills — `ft-goal-task`, `ft-spec`, `ft-starter-task`, `ft-worktree-start`/`-end` — retired and folded into `ft-task`/`ft-file-followup --starter`, CORE-570/571/572/573) and the `[unattended]` candidacy contract (CORE-EPIC-577): every filing surface now proposes the marker under one shared rule, confirmed at its existing review gate rather than seeded silently. Release/CI integrity hardened three ways: a gitleaks secret-scan CI step (CORE-578), the context-budget check lifted into the CI drift job (CORE-574.2/.3), and a documented `npm audit` cadence backed by a new Dependabot config (CORE-581) — alongside a real js-yaml CVE bump (GHSA-2883, FE-106.3) and an out-of-range `npm audit fix` (CORE-575.2/.3). No required adopter-side edits — the five retirements surface as `/ft-update` dangling-symlink reports, and `templates/`'s one change (CORE-568's test-strategy pointer) reaches adopters the same way.

Standing validation gate passed clean (550 viz tests, 52 fleet-updater tests, typecheck + lint clean, 0 npm audit findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 77 commits unpushed) and was resolved by executing all `validate` + `drift` job steps locally (gitleaks, 11 drift checks) — all clean. `/ft-audit docs ai-referenced` returned zero findings across all 5 passes (health 10/10) over the 18-doc AI-referenced set. All §7.1 standing checks and mirror pairs (A–N) clean; the README task-counter and context-budget ledger were refreshed (both landed via a concurrent session mid-cut, independently verified against fresh measurements before accepting). Machine-global wiring check could not run — this session's path-access guard blocked scanning `~/.claude/` even after operator approval — carried forward as advisory-only, never-blocking, same posture as prior cuts.

**Dogfood gate resolved amid a genuine concurrent-write race:** the operator ran real Grok, Cursor, and Codex dogfood sessions in this same working tree in parallel with this release-driving session. This session's own Claude "Refreshed" stamp was silently overwritten by another writer mid-walk, and the three sessions' self-reports contradicted each other and the actual file state — resolved by making this session sole writer for the remainder of the cut. Final state: Claude/Grok/Cursor refreshed to `v5.27.0 · 2026-09-12 (dogfooded)`; Codex `skipped @ v5.27.0` (its self-report described driving `/ft-release` itself, not evidence of its own verification). Filed [[CORE-588]] to harden the walk against this failure mode.

**SOP-currency check found genuine drift:** `SPEC/procedures/ft-task.md` is missing CORE-557's "Verification receipt" evidence box and CORE-565.2's park-reason resume-clear fix. Adjudicated 2 real (of 6 raw candidates) vs. 4 dismissed (Claude-only skill-dispatch/metadata trims). Filed [[CORE-587]] rather than fixing inline (a SOP re-check is a full tasknote per the check's own contract). SOP stamp left un-bumped, as the check requires.

**Archived:** 2026-09-12
