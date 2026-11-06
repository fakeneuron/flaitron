---
title: gate-blind-spots audit
status: completed
tags: [audit]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-868, CORE-868.2, CORE-868.3, CORE-868.4]
---

# CORE-868.N | gate-blind-spots audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-868]]

## 🎯 Goal

Verify the completed `CORE-EPIC-868` (`gate-blind-spots`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-868` (Step 5), landing in the audit's closure commit — no misses, so no rows filed
- [x] Single `chore: CORE-868.N — audit CORE-EPIC-868` commit lands (no code edits)
- [x] PLAN.md line for `CORE-868.N` flipped to stub form `Completed 2026-11-06.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-868.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-868.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-868]] — parent epic
- [[CORE-868.2]] · [[CORE-868.3]] · [[CORE-868.4]] — cohort children

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-868.N` invoked; pre-flight passed. All three implementation children closed 2026-11-06 (868.2 `b998e7f0`, 868.3 `8555a6ea`, 868.4 `8d96cccb`). No `.1` child: the epic's Discovery was supplied by audit-repo 2026-11-06. No early-audit decision.

- [x] Read relevant source files — the three archived cohort tasknotes; at HEAD: `tools/drift-checks.sh` (header :15-22, `installer_anchors` :302-351), `.github/workflows/install-test.yml` (header + triggers), `claude/skills/ft-release/SKILL.md` Step 8 :391-400, `docs/CONVENTIONS.md` :58 and :64, `viz/package.json` `overrides`.

- [x] **Best Practices Review** — `N/A`: verification pass, no new code surface.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). Self-referential: the cohort children are the archive entries. Their own skims already covered CORE-851/855/861/863 and FE-129.

- [x] **Drift check** — the cohort's cited paths and lines still match HEAD. CORE-869.2–869.5 landed between 868.2 and 868.3 and edited `tools/drift-checks.sh` and the budget surfaces. `installer_anchors` and its `docs/CONVENTIONS.md` entry both survived that.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Full cohort closed; scope unambiguous.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — no `touches:`; the only writes are PLAN.md and this note.

**Discovery Notes:**

- **CORE-868.2** — `installer_anchors` in `tools/drift-checks.sh`. It evals `install.sh`'s own `is_flaitron_tree` / `agent_snippet` / `agent_dir` / `wire_project` and reads the ft-adopt marker literal off its grep line. Also: a CASES seed plus an eight-test fixture in `tools/drift-checks.test.mjs`, and the check named in `docs/CONVENTIONS.md`'s no-rule/no-catalogue list.
- **CORE-868.3** — `/ft-release` Step 8 `Install:` line (flag-don't-block). It fetches the README URL at the tag, `cmp`s it with the tag's `install.sh`, and runs the tag's `install.test.sh` against it. Also: `workflow_dispatch` on `install-test.yml` and the CONVENTIONS install-test paragraph. Re-scoped: the anchor paths stay out of the path filter, since `installer_anchors` binds them at HEAD.
- **CORE-868.4** — `viz/package.json` `overrides: { minimatch: "^11.0.1" }` (resolves 11.0.5). Alert #6 closes only after push + GitHub re-scan.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`: no new code surface; verification over cohort deliverables.

- [x] **Minimal refactor gate** — no refactor; no inline fix needed.

- [x] Implemented the minimal solution — verification pass, findings below.

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code change.

**Implementation Notes:**

- **Cohort inventory** — see Discovery Notes. The epic row's three blind spots map one-to-one: installer anchors → 868.2, install at a freshly pushed tag → 868.3, open Dependabot alert → 868.4.
- **Coherence findings: no inconsistencies surfaced.**
  - 868.2 and 868.3 tell the same story in all three places. The `installer_anchors` header (`tools/drift-checks.sh:304`: "install-test.yml's path filter does not watch them") matches `install-test.yml`'s header and `docs/CONVENTIONS.md:64`. The 868.3 re-scope removed what would have contradicted it.
  - Naming parity: the `installer_anchors` snake_case slug matches its siblings. The script header list (:21) and CONVENTIONS :58 ("Four checks…") both name the same four no-rule checks.
  - Step 8's `Install:` line follows the `CI:` line's shape: pass / FAIL / `not pushed` spellings, flag-don't-block.
  - Cosmetic, not filed: `install-test.yml`'s header cites `(CORE-868.3)` beside the `installer_anchors` mention. That is right for the keep-out decision, though the check itself is 868.2. The archived 868.2 Related line still describes the dropped filter edit. 868.3 already recorded it as historical, and archives are write-once.
- **Regressions: none.** `bash tools/drift-checks.sh` → 0, with `installer_anchors ok`. `node --test tools/drift-checks.test.mjs` → 40/40. `npm --prefix viz ls minimatch` → every path at 11.0.5.
- **Heads-up, not a miss:** Dependabot alert #6 still reads `open`, because `main` is 15 commits ahead of `origin/main`. 868.4 annotated this criterion `N/A until pushed`. Confirming it needs an operator push, so it is not a child row.
- **Misses filed:** none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` (markdown-only audit); regression runs above.

- [x] Ran lint/type-check on changed code — `N/A`: no code changed.

- [x] **Verification receipt** — `bash tools/drift-checks.sh` → 0 (one non-failing `NEAR CAP claude/skills/ft-release/**` 95%, accepted in 868.3); `node --test tools/drift-checks.test.mjs` → 0 (40 pass).

- [x] **External review** — `N/A`: no inline fix applied; the diff is PLAN.md + this note.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:** See receipt above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  - `README.md` — no change. `:337` names `install-test.yml` as the installer's network test, which is still true.
  - `AGENTS.md` — no change. `:70` and `:138` say "path-filtered", which is still true; `workflow_dispatch` only adds a manual trigger.
  - `SPEC.md` — no change; it names no cohort surface.
  - `docs/MIGRATION.md` — no change.
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change. 868.2 reads their `ln -s` rosters and does not edit them.
  - `docs/CONVENTIONS.md` — no change needed. Both cohort edits (:58, :64) are current and consistent.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change. `:185` describes the workflow's permissions posture, and `workflow_dispatch` leaves that unchanged.
  - `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change. A grep for `install-test|workflow_dispatch|Dependabot|minimatch|installer_anchors|Install:` hits none of them.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`.

**Final Summary:**

Audit of CORE-EPIC-868 (gate-blind-spots): no inconsistencies surfaced and no misses filed. Each of the three blind spots now has a gate: `installer_anchors` (CI drift job) binds the texts `install.sh` parses at HEAD; `/ft-release` Step 8's `Install:` line proves the new tag's README URL post-push; the minimatch `overrides` pin clears alert #6 locally. 868.3's re-scope keeps the anchor files out of `install-test.yml`'s filter, and the drift-check header, the workflow header and `docs/CONVENTIONS.md` all agree with it. Regression runs are green: drift checks 0 and self-test 40/40. Doc-drift sweep: no change on any entry. Heads-up: alert #6 reads `open` on GitHub until the operator pushes.

**Archived:** 2026-11-06
