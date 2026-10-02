---
title: grok-spawn-schema
status: completed
tags: []
created: 2026-10-02
due:
related-tasks:
  - CORE-EPIC-679
  - CORE-458
  - CORE-679.N
touches:
  - docs/PLATFORMS.md
---

# CORE-679.2 | grok-spawn-schema

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-679]]

## 🎯 Goal

Rewrite the Grok Sub-agent trigger row so it matches the live `spawn_subagent` tool, and say a probe is read-only only when the prompt says so.

## ✅ Acceptance

- [x] The Grok **Sub-agent / isolated exploration** row names `prompt`, `description`, `background`, `isolation`, `resume_from`, and `cwd` — `awk '/^### Grok Build$/,/^### Codex CLI$/' docs/PLATFORMS.md | grep -F '**Sub-agent / isolated exploration**' | grep -q 'prompt`, `description`, `background`, `isolation`, `resume_from`, `cwd`'
- [x] That row states a probe is read-only only when the prompt says so — `awk '/^### Grok Build$/,/^### Codex CLI$/' docs/PLATFORMS.md | grep -F '**Sub-agent / isolated exploration**' | grep -q 'read-only only when the prompt says so'`
- [x] That row no longer tells the caller to pass `` `subagent_type` param (`general` / `explore` / `plan`) `` — `awk '/^### Grok Build$/,/^### Codex CLI$/' docs/PLATFORMS.md | grep -F '**Sub-agent / isolated exploration**' | grep -q 'subagent_type` param'; test $? -eq 1`
- [x] Whitespace check on the doc edit — `git diff --check -- docs/PLATFORMS.md`

## 🧩 Subtasks

- [x] Rewrite the Grok **Sub-agent / isolated exploration** row to the live parameters
- [x] Adjust the CORE-458 provenance sentence so it does not still present that 2026-08-20 refresh as the row's current schema
- [x] Run the Acceptance checks and close

## 🔗 Related

- [[CORE-EPIC-679]] — parent epic; Discovery supplied by audit-repo, no `.1` note and no `## 🌳 Fan-out`
- [[CORE-458]] — wrote the current row from the 2026-08-20 `subagent_type` guide (historical; not a falsified-at-the-time claim)
- [[CORE-679.N]] — epic audit; owns any leftover platform-row drift this child does not touch

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The Grok row still tells the caller to pass `subagent_type` (`general` / `explore` / `plan`) and treats `explore`/`plan` as a read-only probe. The live tool in this Grok 4.7 session does not.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### Read set

PLAN.md Medium row (unchecked). `docs/PLATFORMS.md` Grok trigger table and the adoption-notes provenance sentence. This session's `spawn_subagent` schema. Current `xai-org/grok-build` `main` `crates/codegen/xai-grok-pager/docs/user-guide/16-subagents.md` (fetched 2026-10-02). README §"Sessions, loops, and sub-agents" (probe contract). `SPEC/epic.md` §"Fan-out". `SPEC/superseded-claims.md`. No probe — one named row.

### Archive skim

Area is `archive/core/` per the README table. `subagent_type` hits in that archive: [[CORE-408.4]] (Claude Task tool, different surface) and [[CORE-458]] (wrote this Grok row). CORE-458's claim was true of the guide it fetched on 2026-08-20. That is vendor drift since, not a fact untrue at write time — no ⚠️ pointer, no `supersedes:` (the decision to document the tool stands; the parameters moved). No `.1` and no Fan-out, so omit `blocked-by:` / `parallel-safe-with:`.

### Best Practices Review

N/A — one existing table row. Same four-column shape as the other Grok triggers. No new section.

### Drift check

The PLAN line matches the file: the row is still the CORE-458 text. Live parameters are `prompt`, `description`, `background` (default true), `isolation` (`none` or `worktree`), `resume_from`, `cwd`. The tool description says there is no agent-type or role parameter. The current public guide's spawn table lists the same set except it names `background` as `run_in_background`, says built-in `explore` / `plan` cannot be picked by name, and says capability mode is not a spawn argument. Host types still exist in that guide; they are not on this session's tool. The row follows the live names the PLAN lists. README still requires a probe to be read-only as a flowtron rule; that is the prompt bound, not a Grok sandbox. Left alone. `**Last verified:**` stays `v5.33.0 · 2026-09-23 (dogfooded)` — it marks a dogfood of the section, and this is not a `docs/DOGFOOD.md` run. Completed count is 70, past the 60-row advisory.

### Clarifications

No clarifications needed. Assumptions: document this session's parameter names, including a short note that the public guide calls `background` `run_in_background`; do not restore `subagent_type` as caller syntax; update the provenance sentence in the same file so it does not keep citing the 2026-08-20 schema as current; leave Codex/Cursor rows, `claude/CAPABILITIES.md`, and `docs/CODEX-VERIFICATION.md` (a captured stream) alone.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the existing Grok trigger-row shape. No refactor. Rewrote the Sub-agent syntax, controls, and when-to-reach cells, and appended one sentence to the adoption-notes provenance line so the 2026-08-20 CORE-458 refresh stays historical. Left the section `Last verified` stamp. Tests N/A — markdown only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: docs-only, no test surface

- [x] Ran lint/type-check on changed code — `git diff --check -- docs/PLATFORMS.md` → 0

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — N/A: two-line documentation diff, graded by the Acceptance greps

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Structural half: N/A for duplication, dead code, and public-surface growth — one table row and one provenance sentence. The provenance sentence is the code-facing note that would otherwise have stayed stale.

Verification receipt:

- parameter grep → exit 0
- probe-sentence grep → exit 0
- old `` `subagent_type` param `` grep → exit 1 (absence holds)
- `git diff --check -- docs/PLATFORMS.md` → exit 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The Grok Sub-agent row now lists the live `spawn_subagent` parameters and says a probe is read-only only when the prompt says so. `docs/PLATFORMS.md` +2/−2. Checks above all held. No refactor.

Doc-drift sweep: `docs/PLATFORMS.md` updated (Grok Sub-agent row + provenance sentence). No change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md` (Claude Task `subagent_type`, a different tool), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

`touches:` is `docs/PLATFORMS.md`; the PLAN row and this note are the closure pair. Maintainability: a Grok session no longer reads `explore` as a sandbox. Learnings: N/A.

**Archived:** 2026-10-02
