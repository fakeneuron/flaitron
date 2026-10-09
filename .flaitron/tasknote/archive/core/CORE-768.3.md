---
title: rotation-advisory-retire
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-768, CORE-768.1, CORE-768.2, CORE-768.4, CORE-638.3]
touches:
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - templates/PLAN.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - docs/EXTERNAL-AGENTS.md
  - SPEC.md
  - .flaitron/PLAN.md
blocked-by: [CORE-768.2]
---

# CORE-768.3 | rotation-advisory-retire

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-768]]

## 🎯 Goal

Retire the >60-row `## Completed` rotation advisory from every runner now that [[CORE-768.2]] made rotation an automatic post-closure procedure, reword `/ft-release` §7.1's standing check as a backstop that should always read under-bound, and bring every prose mirror in line with the agent-procedure contract.

## ✅ Acceptance

- [x] Runner advisories gone from `preamble.md`, `SPEC/procedures/ft-task.md`, and `ft-close-epic/SKILL.md`, and the "two advisory checks" call-sites in `ft-task/SKILL.md` + `ft-micro-task/SKILL.md` updated — `git grep -nE "Completed-rotation check|rotation advisory|two advisory checks" -- claude SPEC` prints nothing
- [x] No live surface still calls rotation an operator motion or says nothing auto-applies — `git grep -niE "operator motion|once an operator has rotated|nothing (here )?auto-applies|advisory .## Completed. rotation" -- ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md' ':!.flaitron/PLAN.md' ':!docs/VERSION-HISTORY.md'` prints nothing
- [x] `/ft-release` §7.1 standing check and its §7.4 verdict read as a backstop (over 60 means a closure skipped its rotation; the release's own post-closure rotates) with no "operator motion" / "never applies it" — `grep -n "backstop" claude/skills/ft-release/step-7.1-standing-checks.md claude/skills/ft-release/SKILL.md` plus `judgment` on the prose
- [x] Prose mirrors (templates/PLAN.md, GLOSSARY, MIGRATION, EXTERNAL-AGENTS, SPEC.md, README, AGENTS-snippet) describe automatic rotation — `judgment`: prose accuracy against `SPEC/plan-filing.md` §"`## Completed` rotation"; README and AGENTS-snippet already neutral and accurate, left unchanged
- [x] Drift checks and context budgets pass — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Remove the advisory block from `claude/skills/ft-task/preamble.md` and fix the "Both checks" sentence + header mention
- [x] Update "the two advisory checks" in `ft-task/SKILL.md` and `ft-micro-task/SKILL.md`
- [x] Remove the advisory paragraph from `SPEC/procedures/ft-task.md`
- [x] Remove the Step 2 advisory from `claude/skills/ft-close-epic/SKILL.md`
- [x] Reword `/ft-release` §7.1 standing check (`step-7.1-standing-checks.md`) and the SKILL.md roster lines + §7.4 verdict as a backstop
- [x] Update prose mirrors: templates/PLAN.md, GLOSSARY, MIGRATION, EXTERNAL-AGENTS, SPEC.md, README, AGENTS-snippet
- [x] Run verify greps + `bash tools/drift-checks.sh`; external review
- [x] Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-768]] — parent epic
- [[CORE-768.1]] — Discovery; inventoried the advisory sites and mirrors, resolved "retire runner advisories, keep §7.1 as backstop"
- [[CORE-768.2]] — predecessor: the automatic rotation contract these edits point at
- [[CORE-768.4]] — follow-up: epic parent auto-flip (owns the parent-flip prompt text left untouched here)
- [[CORE-638.3]] — predecessor: mirrored the advisory into every closing runner; this task undoes that mirror

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-768.2]] landed the automatic rotation and the first self-rotation (`b8f262f1`, 204 → 39 rows). The advisories now tell the operator to do by hand what post-closure step 2 does on its own, and several surfaces contradict the new contract ("operator motion", "a release cut never applies it").

- [x] Read relevant source files — `claude/skills/ft-task/preamble.md` §"Locate and capture", `SPEC/procedures/ft-task.md`:160-175, `claude/skills/ft-close-epic/SKILL.md` Step 2, `claude/skills/ft-release/SKILL.md` §7.1 roster + §7.4 verdicts, `step-7.1-standing-checks.md` completed-rotation block, `SPEC/plan-filing.md` §"`## Completed` rotation" (post-.2), `SPEC/post-closure.md` step 2, and each prose-mirror line

- [x] **Best Practices Review** — `N/A` for code. Contract boundary: the mirrors stay one-line pointers to `SPEC/plan-filing.md`; no mirror restates the five-step procedure

- [x] **Archive skim** — area `archive/core/` (README table). Relied on [[CORE-768.1]]'s same-day skim ([[CORE-467]], [[CORE-604.4]], [[CORE-638.3]]) plus [[CORE-768.2]] read in full. Load-bearing: .2's review deferred `ft-close-epic/SKILL.md`, `ft-release/SKILL.md`:336, GLOSSARY, MIGRATION, templates/PLAN.md to this task by name.

- [x] **Drift check** — .1's inventory re-grepped at `b8f262f1`; all sites resolve. Two call-sites .1 didn't list: `ft-task/SKILL.md`:38 and `ft-micro-task/SKILL.md`:48 both say the preamble runs "the two advisory checks". In scope (they describe the preamble being edited). No `tools/drift-checks.sh` pair binds the advisory text. Codex/Cursor/Grok wrappers carry no rotation text.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (a) the §7.1 backstop keeps its flag-don't-block posture and points at the release's own post-closure step 2 to rotate, per .2's "release closures rotate like any other closer"; (b) `docs/VERSION-HISTORY.md` and archived notes stay as written (historical); (c) the SOP's `last-verified:` stamp is left alone (release-owned); (d) the parent-flip prompt and the push-go "parallel to /ft-close-epic's parent-flip" text belong to [[CORE-768.4]].

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Active model Opus 5.5 under a `[medium]` tag: satisfied.

Site list (from `git grep` at `b8f262f1`):

| Kind | Site |
|---|---|
| Retire | `claude/skills/ft-task/preamble.md`:40-47; `SPEC/procedures/ft-task.md`:166-172; `claude/skills/ft-close-epic/SKILL.md`:56-63 |
| Call-site wording | `claude/skills/ft-task/SKILL.md`:38; `claude/skills/ft-micro-task/SKILL.md`:48 ("the two advisory checks") |
| Backstop reword | `claude/skills/ft-release/step-7.1-standing-checks.md`:114-123; `claude/skills/ft-release/SKILL.md`:275, :286, :336 |
| Prose mirrors | `templates/PLAN.md`:45-49; `docs/GLOSSARY.md`:31; `docs/MIGRATION.md`:268; `docs/EXTERNAL-AGENTS.md`:93; `SPEC.md`:701; `README.md`:215; `claude/AGENTS-snippet.md`:19 |

`README.md`:215 and `claude/AGENTS-snippet.md`:19 already describe rotation neutrally ("rotate verbatim", "once `## Completed` outgrows its bound"); check, edit only if inaccurate.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — deletions plus in-place rewording; mirrors keep their one-line-pointer shape to `SPEC/plan-filing.md`. The §7.1 block keeps its advisory-standing-check shape (count → warn → never block), relabelled "advisory backstop"

- [x] **Minimal refactor gate** — no refactor. Parent-flip and push-go "parallel to /ft-close-epic's parent-flip" text left for [[CORE-768.4]]

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: skill/SPEC prose only; `tools/drift-checks.sh` is the applicable suite

**Implementation Notes:**

- Retired: the preamble's Completed-rotation block (the remaining sentence now covers only the filing-discipline check), the SOP's `## Completed`-rotation advisory paragraph, and `/ft-close-epic` Step 2's advisory. `ft-task/SKILL.md` and `ft-micro-task/SKILL.md` now say "the filing-discipline advisory" instead of "the two advisory checks".
- `/ft-release`: in §7.1, over 60 now means a closure skipped its rotation (worktree, dirty files, or a hand-made commit), and the release's own post-closure step 2 repairs it. The echo text, the §7.1 roster label, and the §7.4 verdict all follow that wording; none blocks.
- Mirrors: GLOSSARY, MIGRATION, templates/PLAN.md, EXTERNAL-AGENTS, and SPEC.md now describe automatic rotation (>60 → ≤40, own `chore:` commit). README.md and AGENTS-snippet already read neutrally, so no change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: skill/SPEC prose; `bash tools/drift-checks.sh` is the applicable suite

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review fixes):
- `git grep -nE "Completed-rotation check|rotation advisory|two advisory checks" -- claude SPEC` → exit 1 (no matches; pass)
- `git grep -niE "operator motion|…" -- <live surfaces>` → exit 1 (no matches; pass)
- `grep -n "backstop" claude/skills/ft-release/{step-7.1-standing-checks,SKILL}.md` → exit 0 (§7.1 block, §7.1 roster, §7.4 verdict)
- `bash tools/drift-checks.sh` → 0 (context_budget ok)

Structural checks: no duplication (mirrors stay pointers to `SPEC/plan-filing.md`), no dead text (the preamble's leftover sentence now covers only the filing-discipline check), stale docs fixed in scope.

External review: `/code-review medium` on the working-tree diff, six findings.
- **Blocker, fixed.** The §7.4 verdict said post-closure repairs a miss "after the release commit", but on push-go Yes that rotation commit stays unpushed and Step 8 never mentioned it. Step 8 now has a **Rotation** bullet (runs after §7.5, before 🏁, adds the `· rotated` suffix, commit stays local and rides the next push), and the verdict says the same. Phase 3 re-ran.
- **Blocker, fixed.** The backstop relied on a rotation that `/ft-release` Step 8's summary never named. Fixed by the same Step 8 bullet.
- **Note, fixed.** The §7.1 skip-cause list missed rows added outside any closure (`/ft-audit` inline fixes); added.
- **Note, fixed.** templates/PLAN.md and MIGRATION said "the next closure" rotates; it is the closure that crosses the bound. Reworded.
- **Note, fixed.** The call-site name "filing-discipline advisory" matched no bold-lead; now "filing-discipline check", matching the preamble.
- **Note, fixed.** `touches:` listed README.md and claude/AGENTS-snippet.md, which were left unchanged by judgment (both already neutral and accurate). Dropped from `touches:`; the judgment is recorded under Acceptance 4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md`, `docs/MIGRATION.md`, `docs/EXTERNAL-AGENTS.md` updated in scope. `README.md` and `claude/AGENTS-snippet.md` already accurate, so no change. `AGENTS.md` (pointer to plan-filing, still accurate), codex/cursor/grok snippets (no rotation text), and all other entries: no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`

**Final Summary:**

The >60 `## Completed` rotation advisory is gone from every runner (`/ft-task` + `/ft-micro-task` via the shared preamble, the agent-neutral SOP, `/ft-close-epic` Step 2). Rotation is automatic since [[CORE-768.2]]. `/ft-release` §7.1 keeps the count as an advisory backstop that should read under the bound. A miss is explained (worktree, dirty files, hand commit, or audit inline-fix rows) and repaired by the release's own Step 8 rotation, whose commit rides the next push. GLOSSARY, MIGRATION, templates/PLAN.md, EXTERNAL-AGENTS, and SPEC.md now describe automatic rotation.

- Changed: 12 files plus this note and the PLAN stub; about 40 lines removed, about 20 reworded.
- Verification: all Acceptance greps pass and drift checks return 0; both review blockers fixed and re-verified.
- No refactor.
- `touches:` reconciliation: diff = declared set (README/snippet dropped by judgment, recorded above).
- Maintainability: one rotation contract with no runner-side restatement; the only remaining count is the release backstop.

**Archived:** 2026-10-09
