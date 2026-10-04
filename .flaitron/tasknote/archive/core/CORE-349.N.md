---
title: platform-wiring-policy audit
status: completed
tags: []
created: 2026-07-08
due:
related-tasks: [CORE-EPIC-349, CORE-349.2, CORE-349.3, CORE-349.4, CORE-349.5]
---

# CORE-349.N | platform-wiring-policy audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-349]]

## 🎯 Goal

Verify the completed `CORE-EPIC-349` (`platform-wiring-policy`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `chore: CORE-349.N — audit CORE-EPIC-349` commit lands
- [x] PLAN.md line for `CORE-349.N` flipped to stub form `Completed 2026-07-08.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-349.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirmed flipping `CORE-EPIC-349` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-349.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-349]] — Parent epic for platform wiring policy cleanup.
- [[CORE-349.2]] — Established the installed-surface policy.
- [[CORE-349.3]] — Removed non-adopter surfaces from the Codex repo-scoped snippet.
- [[CORE-349.4]] — Synced docs and updater wording to the installed-surface policy.
- [[CORE-349.5]] — Added release-time installed-surface guardrails.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The user explicitly invoked `/ft-close-epic CORE-349.N`; the parent epic remains open, `CORE-349.N` is the reserved terminal audit child, and implementation children `CORE-349.2` through `CORE-349.5` are completed.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- PLAN state at audit start: `CORE-EPIC-349` was open under `## High` with nested `CORE-349.N`; completed implementation children `CORE-349.2` through `CORE-349.5` were already top-level stubs under `## Completed`. Audit treats them as the cohort and will normalize the parent/cohort grouping if the parent-flip prompt is accepted.
- `CORE-349.2` defined the installed-surface policy in `docs/PLATFORMS.md`: shipped inventory can remain full for Claude and Codex, adopter repo wiring installs the tasknote family, worktree pair, and `ft-update`, audit scaffolds are fork/overlay surfaces, global utilities live in user-level wiring, and `ft-release` is flowtron-self-only.
- `CORE-349.3` changed `codex/AGENTS-snippet.md` so Codex adopter repo wiring exposes only the policy subset and excludes `ft-release`, focused audit overlays, and global utilities.
- `CORE-349.4` synchronized README, MIGRATION, AGENT-COMPAT, PLATFORMS, Claude/Codex snippets, and `ft-update` prose so shipped inventory and repo-scoped adopter installs are not conflated.
- `CORE-349.5` extended `claude/skills/ft-release/SKILL.md` standing checks to verify shipped Claude/Codex inventory parity, exact adopter-subset symlink sets, and forbidden repo-scoped installs.
- Archive skim beyond the cohort: the child notes cite `CORE-344`, `CORE-345`, and `CORE-346` as the immediate setup for Codex wrapper parity, platform-aware updater detection, and the v5.11.0 release. Those records support the current policy direction and did not surface contradictory decisions.
- Drift check: current files still match the child deliverables. `docs/PLATFORMS.md` has the installed-surface policy; Claude and Codex snippets each expose the 12 adopter-subset repo-scoped links; Claude commands, Claude skills, and Codex skills each ship 25 `ft-*` slugs; release standing checks include exact-set and forbidden-install checks.
- No clarifications needed. Assumptions: the split PLAN layout is a bookkeeping artifact from closing implementation children before the parent and should be normalized during the parent flip; archived child tasknotes should not be rewritten by this audit unless a contract-critical correction is required.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: prior epic audits keep findings in the audit tasknote and reserve follow-up filing for after closure. That shape fits here because this audit found one record-keeping miss but no policy, snippet, or guardrail contradiction needing inline code/docs edits.
- Cohort coherence: no naming/style contradiction surfaced across the shipped policy. The same categories are used consistently: "shipped inventory", "adopter-installed subset", "global utilities", "focused audit fork/overlay surfaces", and "flowtron-self-only `ft-release`".
- Surface coherence: `README.md`, `docs/MIGRATION.md`, `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, and `claude/skills/ft-update/SKILL.md` all distinguish full shipped inventory from repo-scoped adopter wiring.
- Guardrail coherence: `claude/skills/ft-release/SKILL.md` separates full shipped inventory parity from exact adopter-subset checks and forbidden-install scans. `codex/skills/ft-release/SKILL.md` delegates to the Claude release skill body, so the release-time check applies to Codex release execution too.
- Verification found Claude skills, Claude commands, and Codex skills each ship the same 25 `ft-*` slugs. Claude skill symlinks, Claude command symlinks, and Codex skill symlinks in adopter snippets each resolve to the exact 12-slug adopter subset.
- No inline fixes applied.
- Follow-up candidate: `/ft-file-followup <NEW-ID>` — archived `CORE-349.2` still has frontmatter `status: in-progress` and an "In progress" nav chip despite being archived and completed in PLAN. This is a historical metadata mismatch in the cohort record. It is not policy-blocking and should be handled deliberately rather than silently rewriting archived tasknotes during this audit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- No code or runtime docs were changed by the audit itself; test suite and typecheck are not applicable.
- `find ... -exec basename` inventory checks confirmed Claude skills, Claude commands, and Codex skills each ship the same 25 `ft-*` slugs.
- Exact-set shell checks confirmed Claude skills, Claude commands, and Codex skills in the adopter snippets each expose the same 12-slug adopter subset: `ft-close-epic`, `ft-debug`, `ft-epic-discovery`, `ft-file-followup`, `ft-goal-task`, `ft-micro-task`, `ft-sidequest`, `ft-starter-task`, `ft-task`, `ft-update`, `ft-worktree-end`, and `ft-worktree-start`.
- Forbidden-install scans over repo-scoped snippet symlinks found no upstream focused audit scaffolds, global utilities, or `ft-release`.
- No frontend files changed; visual confirmation not applicable.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change; repo layout now distinguishes full shipped inventories from adopter policy subset and `ft-release` self-only status.
  - `SPEC.md` — no change.
  - `docs/MIGRATION.md` — no change; adopter wiring docs reflect the tasknote family, worktree pair, and `ft-update` subset plus global/self-only carve-outs.
  - `claude/AGENTS-snippet.md` — no change; repo-scoped Claude symlinks match the adopter subset.
  - `codex/AGENTS-snippet.md` — no change; repo-scoped Codex symlinks match the adopter subset and exclude `ft-release`.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change; installed-surface policy remains the canonical category table.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change; matrix wording distinguishes shipped bundles from repo-scoped policy subset.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-08.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audited `CORE-EPIC-349` and found the platform wiring policy implementation coherent across policy docs, adopter snippets, updater wording, and release standing checks. The shipped-vs-installed distinction is now consistent, and the release guardrails verify both full inventory parity and exact adopter-subset wiring.

Technical detail: the audit verified the cohort tasknotes, current policy surfaces, snippet symlink sets, shipped Claude/Codex inventory parity, and forbidden repo-scoped install checks. No inline fixes were needed. One follow-up candidate remains for historical metadata cleanup: archived `CORE-349.2` still says `status: in-progress` despite being completed.

Parent flip confirmed after audit closure: `CORE-EPIC-349` was marked completed and the cohort was grouped under the parent at the top of `## Completed`.

**Archived:** 2026-07-08
