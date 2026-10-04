---
title: release v5.28.0
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: [CORE-EPIC-598, CORE-593, CORE-594, CORE-595, CORE-596, CORE-597, FE-118, FE-119, FE-120, CORE-586]
---

# CORE-599 | release v5.28.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-598]] [[CORE-593]] [[CORE-594]] [[CORE-595]] [[CORE-596]] [[CORE-597]] [[FE-118]] [[FE-119]] [[FE-120]] [[CORE-586]]

## 🎯 Goal

Cut v5.28.0, a minor release tagging the flowtron↔caobunga concert epic (CORE-EPIC-598: caller-write boundary fixes, handoff-token ratify, caobunga handoff rows), the CORE-593–597 filing/SPEC hardening run, and the FE-118/119/120 viz changes since v5.27.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.27.0` → `v5.28.0`
- [x] docs/MIGRATION.md example pin bumped `v5.27.0` → `v5.28.0`
- [x] SECURITY.md release-tag example pin bumped `v5.27.0` → `v5.28.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.28.0`, or recorded `skipped @ v5.28.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-599 — flowtron v5.28.0 (...)` commit lands
- [x] Annotated `v5.28.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.28.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-599.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v5.27.0 → v5.28.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-586]] — prior release tasknote (v5.27.0), structural precedent
- [[CORE-EPIC-598]] — flowtron↔caobunga concert epic, tagged in this cut
- [[CORE-593]] [[CORE-594]] [[CORE-595]] [[CORE-596]] [[CORE-597]] — filing / SPEC hardening run, tagged in this cut
- [[FE-118]] [[FE-119]] [[FE-120]] — viz changes, tagged in this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Canonical, well-established release recipe (CORE-586 / CORE-553 precedent); version drift and commit log verified in `/ft-release` Step 1.1/2.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:489`, `SECURITY.md:118` (version pin locations)

- [x] **Best Practices Review** — N/A, release cut is a doc/version-pin motion, not a code change

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-586.md` (v5.27.0) skimmed as structural precedent; shape matches (Testing Notes standing-gate block, Final Summary evidence-based recap). No structural drift. Its two carried-forward lessons apply here: (1) dogfood stamps are re-verified from file state at §7.4 (CORE-588 hardening landed in this cycle); (2) Step 6.1 CI check may find no runs if HEAD is unpushed — resolve by executing the `validate` + `drift` job steps locally.

- [x] **Drift check** — `SPEC.md:3` reads `v5.27.0`; `docs/MIGRATION.md:489` and `SECURITY.md:118` example pins both `v5.27.0` — all three consistent with `git describe --tags --abbrev=0` (`v5.27.0`). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed; minor bump target confirmed via AskUserQuestion during PLAN-line filing (Step 1.1 of `/ft-release`).

- [x] Subtasks above populated with concrete, ordered steps. No `touches:` declared — this cut edits SPEC.md/docs/MIGRATION.md/SECURITY.md/docs/VERSION-HISTORY.md/PLAN.md per the fixed release recipe, not a task-specific file set.

**Discovery Notes:**

26 commits since v5.27.0 (11 feat / 2 fix / 5 docs / 7 chore / 1 `caobunga:` status write, since retired by CORE-597), no `feat!:` or `BREAKING CHANGE:` → minor bump confirmed (v5.27.0 → v5.28.0).

**Adopter migration impact:** no required adopter-side edits. Classified per commit:

- **CORE-598.3 `[handoff]` ratified** — additive second trailing token on PLAN.md task lines (SPEC §"Task-line format", `templates/PLAN.md` grammar block, viz parser `Task.handoff`). Existing rows unaffected; adopters may start using it, nothing to migrate.
- **CORE-595 `SPEC/plan-filing.md` split** — §"Filing commits", §"`## Completed` archive convention", §"`## Completed` rotation" moved out of `SPEC/tasknote-selection.md`. `tasknote-selection.md:3` carries a forward pointer, so adopter surfaces still citing the old module (pasted AGENTS.md snippet, copied `templates/PLAN.md` footer, older tasknote-template copies) resolve one hop. Optional tidy: repoint those citations on the next re-paste.
- **CORE-589 snippet `## Completed` rotation clause + CORE-596 `paths:` frontmatter retirement** — snippet gain is picked up on next re-paste (optional); `paths:` removal only touches flowtron's own lazy modules, no adopter consumer ever parsed it.
- **CORE-598.2 caller-write boundary / YAML-safe `park-reason:`; CORE-591 / CORE-593 filing-commit index guard** — contract + skill-body edits, reach adopters through the bump; no action.
- **FE-118 🤖 unattended chip, FE-119 origin-guard same-site reject, FE-120 SSE heartbeat extract** — viz-only; adopters running `viz/` get them on bump. FE-119 tightens the dev-server SSE guard (SECURITY.md updated); a page served from a sibling loopback port can no longer hold `/api/events` slots — that was never a supported access path.
- **CORE-592 updater realpath, CORE-594 Pair O CI check, CORE-597 gitignore, CORE-587/588/590 docs** — flowtron-self / operator-side only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, following the canonical `/ft-release` recipe verbatim

- [x] **Minimal refactor gate** — N/A, no refactor in scope

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code feature ships in this release beyond the standard doc/version edits

**Implementation Notes:**

The 3 version edits landed as single-token substitutions: `SPEC.md:3`, `docs/MIGRATION.md:489`, `SECURITY.md:118` — all `v5.27.0` → `v5.28.0`. Post-edit residue grep: only the `SPEC/procedures/ft-task.md` `last-verified:` SOP stamp (never a release pin), the write-once "retired at v5.27.0" rows in `docs/MIGRATION.md`'s retired-skills table, and the `docs/CONTEXT-BUDGET.md` ledger line (refreshed at §7.1) — no real drift.

**Dogfood gate resolved 2026-09-14** (stamp files clean at walk start; `git status --porcelain` re-checked before each write; step-5 ledger re-verify from file state printed nothing). Ledger:

- Claude → `v5.28.0 · 2026-09-14 (dogfooded)` — written (this session's own verification) — `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:71`
- Grok → `v5.28.0 · 2026-09-14 (dogfooded)` — written — `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:402`. Receipt pasted by the operator from a Grok Build session: version `v5.28.0` ✓, "My row" matched the pre-walk matrix stamp ✓, Phase-1 drive named CORE-599 with exit-gate decision skip ✓; session reported writing nothing.
- Cursor → `v5.28.0 · 2026-09-14 (dogfooded)` — written — `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:470`. Receipt pasted from a Cursor session: same three checks pass (v5.28.0 / matching row / CORE-599 skip); stamp files reported clean.
- Codex → `v5.22.0 · 2026-08-29 (dogfooded; skipped @ v5.28.0)` — written — `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:441`. No Codex session this cut; prefix kept at the last real verification.

No concurrent-write race this cut — the CORE-588 report-only `docs/DOGFOOD.md` result section held (both third-party sessions handed back receipts instead of editing stamps).

**SOP currency: clean.** `SPEC/procedures/ft-task.md` (stamp 2026-09-12): zero tier-1 drift candidates — CORE-595, CORE-598.2, CORE-598.3 each touched `claude/skills/ft-task/` or `SPEC.md` *and* the SOP in the same commit (in-sync mirrors); zero tier-2 notes. Stamp left un-bumped per the check's contract.

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
node --test tools/update-adopters.test.mjs   → 53 tests, 15 suites, 0 failed (exit 0)
node --check tools/update-adopters.test.mjs  → exit 0
node --check tools/update-adopters.mjs       → exit 0
```

**Step 6.1 (CI status): not a literal pass — resolved by direct local execution.** `gh run list --commit 202f16d` returns no runs — HEAD is 26 commits ahead of `origin/main`, never pushed, so GitHub has never seen it (same posture as CORE-586). Resolved by executing every `validate` + `drift` job step locally: gitleaks secret scan (`gitleaks dir . --config .gitleaks.toml --no-banner --redact` → "no leaks found"), and all 12 drift-job checks (wrapper-name invariant, shipped-skill parity, context budget, Pairs A/B/C/E×2/J/M/N/O — Pair O new this cycle via CORE-594) → 12/12 PASS, exit 0. The post-push run is carried into §7.4 as flag-don't-block.

**Step 6.2 (dependency audit):** `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities (exit 0).

Every feature tasknote since v5.27.0 (CORE-587–597, CORE-598.1–.N, FE-118/119/120) ran its own test pass in its own tasknote; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

**`/ft-audit docs ai-referenced` subroutine (run 2026-09-14, all 18 AI-referenced docs read in full; mechanical link + `§"Section"` citation scan first, 7 false positives triaged):** five findings, health 9/10, all absorbed into the cut as trivial doc edits on operator confirm:

1. Medium / cross-doc — `/ft-refactor` is a fifth filing motion (sets `auto-commit =`, cites §"Filing commits", own commit shape) but the contract said "four" and its message table omitted it → `SPEC/plan-filing.md` (loader sentence, new table row, "five"), `SPEC.md` §"When to use a tasknote" summary, `docs/AGENT-NEUTRALITY.md` ledger row.
2. Medium / claims-vs-code — `SPEC.md` §"Layout" pointed readers at `SPEC/layout.md` for "lazy SPEC module frontmatter", a section CORE-596 deleted → clause dropped.
3. Medium / currency — `docs/PLATFORMS.md` Codex structured-ask row said "all 19 wrappers"; 14 on disk (v5.27.0 retirements) → `14`.
4. Low / cross-ref — `docs/EXTERNAL-AGENTS.md` step 2 cited the pre-CORE-598.3 anchor label in `SPEC/plan-parser.md` → repointed to "`[unattended]` / `[handoff]` mis-authoring footguns".
5. Low / cross-doc — `docs/MIGRATION.md` dangling-symlink loop omitted `.grok/skills` while claiming to be `/ft-update` Step 4.6's command → loop now matches Step 4.6 exactly.

Per-entry verdicts for the other 13 docs: no change (README.md's task-counter refreshed by the §7.1 standing check, not the sweep). Observation, out of sweep scope: `SPEC/layout.md:51` still contrasts SOP frontmatter against the retired `paths:` convention.

**§7.1 standing checks + mirror pairs (all run 2026-09-14, independent of the subroutine):**

- Wiring-consumer derivation (both greps exit 1), shipped-skill parity, installed-surface policy (5 diffs), self-wiring parity local (4 checks) — all PASS.
- Self-wiring parity machine-global (advisory) — **not run**; the path-access guard blocked the `~/.claude/` scan, same as CORE-553 / CORE-586. Never blocks commit-go.
- README task-counter — was 919 / 2026-09-12; refreshed inline to **939 tasks, 2026-04-28 to 2026-09-14** (count taken before this release's own tasknote is archived, per precedent).
- Context-budget check — 0 OVER BUDGET; §"Known over budget" empty. `docs/CONTEXT-BUDGET.md` §"Ledger" refreshed inline (all rows re-measured at v5.28.0; stamp → 2026-09-14 / CORE-599; the "retired this cycle" prose pinned to v5.27.0).
- Pairs A, B, C, E (×2), F (×2), H (×2), I, J, K (K1+K2), L, M, N, O — all PASS (D owned by the README check; G retired).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cut flowtron v5.28.0, a minor release headlined by the `[handoff]` marker — ratified as the second canonical trailing token on a PLAN.md row (CORE-598.3) — and the close of the flowtron↔caobunga concert epic (CORE-EPIC-598): a caller commits nothing of its own into a producer repo, `park-reason:` values are YAML-safe scalars, and VISION records the one-real-consumer exception to the two-project rule. Around it: the PLAN.md-row contracts split out of `SPEC/tasknote-selection.md` into a new `SPEC/plan-filing.md` (CORE-595), the consumer-less `paths:` frontmatter left the `SPEC/` modules (CORE-596), every filing runner gained an index-empty pre-check plus a post-stage read of the staged index (CORE-591/593) bound by new CI Pair O (CORE-594), the dogfood gate was hardened against parallel-session writes (CORE-588), and viz shipped the 🤖 unattended chip, a same-site SSE origin-guard reject, and a heartbeat extract (FE-118/119/120). No required adopter-side edits — `[handoff]` is additive, and CORE-595's move resolves through a forward pointer.

Standing validation gate passed clean (561 viz tests, 53 fleet-updater tests, typecheck + lint clean, 0 `npm audit` findings at `--audit-level=high`). Step 6.1 could not observe a CI run (HEAD 26 commits unpushed) and was resolved by executing every `validate` + `drift` job step locally (gitleaks, 12 drift checks incl. new Pair O) — all clean. `/ft-audit docs ai-referenced` returned five findings (3 Medium, 2 Low; health 9/10) over the 18-doc set, all absorbed as trivial doc edits: the filing-motion count (four → five, `/ft-refactor` added to the message-shape table), a stale `SPEC.md` pointer to a deleted `layout.md` section, a stale Codex wrapper count, a renamed `plan-parser.md` anchor label, and the Grok-only dangling-symlink loop. All §7.1 standing checks and mirror pairs (A–O) clean; the README task-counter (919 → 939) and the `docs/CONTEXT-BUDGET.md` ledger were refreshed inline. Machine-global wiring check could not run (path-access guard, same as the prior two cuts) — advisory-only, never-blocking.

**Dogfood gate resolved with no race this cut** — the CORE-588 report-only `docs/DOGFOOD.md` result section held: Grok and Cursor sessions handed back receipts instead of editing stamps, both passed the three receipt checks (v5.28.0 / matching row / CORE-599 Phase-1 drive), and the step-5 ledger re-verify from file state printed nothing. Final state: Claude/Grok/Cursor refreshed to `v5.28.0 · 2026-09-14 (dogfooded)`; Codex `v5.22.0 · 2026-08-29 (dogfooded; skipped @ v5.28.0)`. SOP currency: clean (every source-surface commit since the stamp also touched the SOP).

Scope reconciliation: N/A — no `touches:` declared (fixed release recipe). Files changed beyond the recipe's own set: `SPEC/plan-filing.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `docs/EXTERNAL-AGENTS.md`, `README.md`, `docs/CONTEXT-BUDGET.md`, and the three dogfood stamp files — each named above.

**Archived:** 2026-09-14
