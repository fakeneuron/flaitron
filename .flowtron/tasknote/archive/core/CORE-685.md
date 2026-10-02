---
title: security-closure-push
status: completed
tags: []
created: 2026-10-02
due:
related-tasks:
  - CORE-684
touches:
  - SECURITY.md
  - SPEC/post-closure.md
---

# CORE-685 | security-closure-push

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-684]]

## 🎯 Goal

Name `git push` as a gated step separate from the closure commit, and make `SECURITY.md` say that.

## ✅ Acceptance

- [x] `SECURITY.md`'s lethal-trifecta bullet no longer says the closure protocol commits and pushes, and it names push as a separate gated step — `grep -F 'Push is a separate gated step.' SECURITY.md` exits 0 and `grep -F 'commits and pushes' SECURITY.md` exits 1
- [x] `SPEC/post-closure.md` names push as a separate gated step and states that commit-go does not authorize `git push` — `grep -F 'Push is a separate gated step.' SPEC/post-closure.md` exits 0 and `grep -F 'authorize \`git push\`' SPEC/post-closure.md` exits 0
- [x] Push is not a fourth step of the three-step protocol — `grep -E '^[0-9]+\. \*\*' SPEC/post-closure.md` prints only steps 1–3 (Commit, Mark the commit landed, Offer the copy-paste line)
- [x] No live markdown outside `.flowtron/` still says the closure protocol commits and pushes — `git grep -F 'commits and pushes' -- '*.md' ':!.flowtron'` exits 1

## 🧩 Subtasks

- [x] Add the push-boundary paragraph to `SPEC/post-closure.md` without adding a protocol step
- [x] Rewrite the `SECURITY.md` lethal-trifecta bullet so it matches that boundary
- [x] Confirm no other markdown surface still claims the closure protocol pushes

## 🔗 Related

- [[CORE-684]] — v5.34.0 docs audit that filed this finding (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The cited mismatch is live: `SECURITY.md` says the closure protocol commits and pushes, and `SPEC/post-closure.md` only commits.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — prose contract alignment, no code module boundary. The existing shape to extend is `/ft-release`'s bundled push-go, not a new protocol step or banner.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Area `core` from `.flowtron/tasknote/README.md` §"Archive layout". Model tag `[light]`; this session is a heavier tier, so the gate proceeds.

`SECURITY.md` lethal-trifecta bullet (around the "commits and pushes" sentence) claims flowtron's closure protocol commits and pushes, so a pushed file is an exfil surface. `SPEC/post-closure.md` is three steps: commit, mark landed, copy-paste line. Commit-go authorizes the local commit. No push step.

The separation already exists for releases. `SPEC/gates.md` §"Operator-gate cues" bundles release push-go into 📦. `/ft-release` §7.4–§7.5 pushes only when that prompt is Yes. [[CORE-461]] added GitHub Release publish on the same push-go. Archive hits on `SECURITY.md` are mostly "no change" sweep rows; none of them decide that ordinary closure pushes.

Plan: one boundary paragraph in `SPEC/post-closure.md`, then correct the `SECURITY.md` bullet to match. Do not add `git push` to ordinary task closure, do not change `/ft-release` mechanics, and do not add a cue or banner. `SPEC.md`'s three-step stub stays a pointer.

No clarifications needed. Assumptions: the PLAN verb "name" is a contract sentence, not a new push behavior; the threat model keeps the local commit as an exfil surface and treats a pushed file as an exfil surface only after the separate gate.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the existing release push-go (`SPEC/gates.md` §"Operator-gate cues", `/ft-release` §7.4–§7.5) instead of adding a fourth protocol step or a new banner. No refactor. No test code: the change is two prose paragraphs.

`/ft-release` mechanics are unchanged. Ordinary commit-go still does not push. On a release, push-go is answered inside the 📦 bundle, and only a Yes lets the following commit-go include the push.

Archived [[CORE-250]] still says the protocol commits and pushes. That sentence is the 2026-05-31 rationale for the threat-model bullet this task corrects. Spec evolution, not a factual-correction pointer (`SPEC/superseded-claims.md`). The archive text stays.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

No code test suite and no lint/type-check. N/A — markdown contract prose only. The Acceptance greps are the verify commands.

Verification receipt (after the review wording fix):

- `grep -F 'Push is a separate gated step.' SECURITY.md` → 0
- `grep -F 'commits and pushes' SECURITY.md` → 1
- `grep -F 'Push is a separate gated step.' SPEC/post-closure.md` → 0
- `grep -F 'authorize \`git push\`' SPEC/post-closure.md` → 0
- `grep -E '^[0-9]+\. \*\*' SPEC/post-closure.md` → steps 1–3 only
- `git grep -F 'commits and pushes' -- '*.md' ':!.flowtron'` → 1
- `wc -c SPEC/post-closure.md` → 8389 (budget 12,000)
- Diff keyword scan (`API_KEY` / `SECRET` / `TOKEN` / `PASSWORD`) → no hits

Structural half: the two paragraphs state one rule on purpose (threat model restates the contract). No dead prose, no new public cue, no new protocol step. `SPEC.md`'s three-step stub stays accurate because push is outside those steps.

External review (read-only probe): blockers none. Two notes, both fixed in the same diff:

- `SECURITY.md` "closes this" no longer leaves "this" pointing at a commit-and-push channel. The gate now "closes the local-commit surface".
- `SPEC/post-closure.md` no longer says nothing authorizes `git push`. Ordinary commit-go does not. Release push-go Yes is what lets the following commit-go include the push, matching `/ft-release` §7.4–§7.5.

Frontend visual confirm: N/A — no UI.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The closure protocol still only commits. Push is named as its own gate: ordinary task closure never pushes, and a release push happens only after push-go Yes. `SECURITY.md` now says the same thing, so the lethal-trifecta bullet no longer treats a push as part of every closure.

Doc-drift sweep: `SECURITY.md` updated (lethal-trifecta bullet). No change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

`touches:` declared `SECURITY.md` and `SPEC/post-closure.md`. Closure also writes this tasknote and the `PLAN.md` row, which the reconciliation excludes. No other paths.

Learnings: N/A. The boundary lives in `SPEC/post-closure.md`, which the always-loaded stub already points at.

**Archived:** 2026-10-02
