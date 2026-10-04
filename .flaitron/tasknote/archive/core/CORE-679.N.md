---
title: grok-probe-row audit
status: completed
tags: []
created: 2026-10-02
due:
related-tasks:
  - CORE-EPIC-679
  - CORE-679.2
---

# CORE-679.N | grok-probe-row audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-679]]

## 🎯 Goal

Verify the completed CORE-EPIC-679 (`grok-probe-row`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. — `judgment` (the sweep is a per-entry reading, recorded in Final Summary)
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — `judgment` (one child; findings in Implementation Notes)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `awk '/^### Grok Build$/,/^### Codex CLI$/' docs/PLATFORMS.md | grep -F '**Sub-agent / isolated exploration**' | grep -q 'prompt`, `description`, `background`, `isolation`, `resume_from`, `cwd'` and the absence grep in Testing Notes
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup` filing (filed after audit closure). None to file.
- [x] Single `chore: CORE-679.N — audit CORE-EPIC-679` commit lands (no code edits)
- [x] PLAN.md line for `CORE-679.N` flipped to stub form `Completed 2026-10-02.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-679.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read CORE-679.2's Final Summary and Implementation Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" — fixed doc-drift sweep
- [x] Cohort coherence pass — the Grok Sub-agent row against this session's `spawn_subagent` schema and the public guide
- [x] Surface audit findings in Implementation Notes
- [x] Phase 4: flip the CORE-679.N PLAN line to stub form and archive this tasknote

## 🔗 Related

- [[CORE-EPIC-679]] — parent; Discovery supplied by audit-repo, no `.1`, no `## 🌳 Fan-out`
- [[CORE-679.2]] — the only implementation child; rewrote the Grok Sub-agent row

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-679.2 is closed (2026-10-02) and is the only implementation child. No open siblings. The audit is the terminal `.N`.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Cohort at audit time: [[CORE-679.2]] archived, deliverable `docs/PLATFORMS.md` (Grok Sub-agent row + the adoption-notes provenance sentence). No `.1`. Parent still open under `## Medium`. Area is `archive/core/` per the README table. `touches:` omitted — this audit edits no deliverable file.

### Read set

PLAN.md Medium parent and the `.2` / `.N` children. Archived CORE-679.2. `docs/PLATFORMS.md` Grok trigger row and the provenance sentence above the calibration table. `README.md` §"Sessions, loops, and sub-agents". `claude/CAPABILITIES.md` Sub-agent row (Claude's Task tool). This session's `spawn_subagent` schema. Public guide `xai-org/grok-build` `main` `…/docs/user-guide/16-subagents.md`, fetched again 2026-10-02. `SPEC/epic.md` §"Audit acceptance". No probe — one named row.

### Archive skim

CORE-679.2 already recorded the prior hits: [[CORE-458]] wrote the old row from the 2026-08-20 guide (true then; no ⚠️ pointer), [[CORE-408.4]] is Claude's Task tool. Nothing in the cohort falsifies those notes.

### Best Practices Review

N/A — verification pass over one existing table row. No new surface.

### Drift check

The PLAN line still asks to audit the Grok trigger correction. The row names `prompt`, `description`, `background`, `isolation`, `resume_from`, and `cwd`, and says a probe is read-only only when the prompt says so. This session's tool schema is that set, default `background: true`, `isolation` of `none` or `worktree`, and no agent-type parameter. The public guide's spawn table still calls `background` `run_in_background`, still says built-in `explore` / `plan` cannot be picked by name, and still says an optional `subagent_type` appears only when custom agents exist. That is the same split CORE-679.2 recorded. The row follows this session's tool, which is what the epic asked for. `SPEC/epic.md` requires the doc-drift line on this note; it is the first Acceptance criterion.

### Clarifications

No clarifications needed. Assumptions: do not restore `subagent_type` as caller syntax; do not retouch Codex, Cursor, or Claude rows; leave the section `Last verified` stamp, which marks the v5.33.0 dogfood rather than this row.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey N/A — no new code. The audit is a reading of the one shipped row.

Cohort inventory:

- [[CORE-679.2]] — rewrote the Grok **Sub-agent / isolated exploration** syntax, controls, and when-to-reach cells, and appended one sentence to the adoption-notes provenance line. `docs/PLATFORMS.md` only.

Coherence: the row, the provenance sentence, and README's probe rule agree. README still requires a probe to be read-only as a flowtron rule; the Grok row says this tool does not enforce that, so the bound goes in the prompt. `claude/CAPABILITIES.md` still names `subagent_type` on Claude's Task tool. A repo search finds no other live `subagent_type` instruction. The public guide's extra host-type paragraph is already fenced as "not on this tool." No inline fix. No `/ft-file-followup` candidates.

Tests N/A — no code change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: audit reading, no code change

- [x] Ran lint/type-check on changed code — N/A: no code change

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — N/A: no deliverable diff to grade; the closure pair is this note and the PLAN stub

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Structural half: N/A — no changed code.

Verification receipt (re-run of CORE-679.2's row checks against HEAD):

- parameter grep → exit 0
- probe-sentence grep → exit 0
- old `` `subagent_type` param `` grep → exit 1 (absence holds)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The Grok Sub-agent row still matches this session's `spawn_subagent` tool, and no other live surface tells a Grok caller to pass a read-only `subagent_type`. No code change. The three row checks held.

Doc-drift sweep: no change — `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md` (CORE-679.2's rewrite still matches; this audit does not edit it), `claude/CAPABILITIES.md` (Claude Task `subagent_type`, a different tool), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

`touches:` omitted. The closure pair is this note and the PLAN stub. No refactor. Maintainability: the correction survives a same-day re-read of the tool schema and the public guide. Learnings: N/A.

Parent [[CORE-EPIC-679]] stays open under `## Medium`. This run is `/ft-task`, so it does not flip the parent. `/ft-close-epic` will bail once this note is archived; the remaining motion is a manual stub flip of the parent plus the nested cohort into `## Completed`.

**Archived:** 2026-10-02
