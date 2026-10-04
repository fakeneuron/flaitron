---
title: release-finding-gate
status: completed
tags: []
created: 2026-10-02
due:
related-tasks: [CORE-684]
touches:
  - claude/skills/ft-release/SKILL.md
---

# CORE-689 | release-finding-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-684]]

## 🎯 Goal

Make `/ft-release` stop on Medium/Low doc-audit findings until the operator either releases anyway or keeps the cut from shipping so those findings are fixed first.

## ✅ Acceptance

- [x] §7.1 no longer defaults a Medium/Low finding to file-and-continue — `! grep -q 'Default to file-followup if uncertain' claude/skills/ft-release/SKILL.md`
- [x] §7.1 offers Release anyway and Stop, and Stop does not enter §7.2 — `grep -q 'Release anyway' claude/skills/ft-release/SKILL.md && grep -q 'do not enter §7.2' claude/skills/ft-release/SKILL.md`
- [x] Critical / High findings stay fix-inline — `grep -q 'Critical / High' claude/skills/ft-release/SKILL.md`
- [x] The ask is not a new standing banner — `grep -q 'caps standing banners at' claude/skills/ft-release/SKILL.md`
- [x] The skill stays under its 40,000-byte budget — `test "$(wc -c < claude/skills/ft-release/SKILL.md)" -lt 40000`

## 🧩 Subtasks

- [x] Replace the §7.1 per-finding absorb-or-file default with one batch ask
- [x] Point the Step 7 opener at that ask
- [x] Run the Acceptance greps and the byte check

## 🔗 Related

- [[CORE-684]] — v5.34.0 cut that filed CORE-685 through CORE-688 and shipped (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The v5.34.0 cut filed four Medium findings and tagged anyway, and `claude/skills/ft-release/SKILL.md` §7.1 still says to default Medium/Low findings to `/ft-file-followup` and continue.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

  N/A — one skill paragraph, no module boundary. The two-banner cap in `SPEC/gates.md` is the constraint that keeps this ask from becoming a banner.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

The disposition lives in one place: `claude/skills/ft-release/SKILL.md` §7.1. Codex and Grok wrappers point at that body. `SPEC/procedures/` does not restate it. A repo grep for `Default to file-followup if uncertain` hits only that paragraph.

Current rule: Critical/High fix inline. Medium/Low are surfaced one by one, absorb-or-file, default file-followup, then the cut continues either way. Zero findings skip ahead to §7.2. That is what CORE-684 did: four Medium findings became CORE-685 through CORE-688, and v5.34.0 still tagged.

`SPEC/gates.md` §"Operator-gate cues" caps standing banners at 🛠️ and 📦. Skill-level asks (release push-go) stay inside an existing shape. This gate therefore stays an `AskUserQuestion`, the same family as Step 1.1, and must not add an `AWAITING APPROVAL` banner.

Archive hits on `ft-release/SKILL.md` are numerous (CORE-475, CORE-492, CORE-507's trim, later pair extractions). The load-bearing precedent is CORE-684's closure note, not those structural edits. Area `archive/core/` matches the README table for `CORE-*`.

No clarifications needed. Assumptions: one batch ask for every remaining Medium/Low finding; **Release anyway** files each via `/ft-file-followup` and then continues; **Stop** does not file, does not enter §7.2, and does not tag — the findings are fixed in this working tree and §7.1 is re-run; Critical/High stay fix-inline; a clean sweep still continues with no ask. Out of scope: the §5 SOP-currency "file then continue" path, and §6.2's high/critical npm-audit follow-up.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

  Extended the skill's existing AskUserQuestion (Step 1.1), and kept the two-banner cap. No new banner.

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

  No refactor. The §5 SOP-currency "file then continue" path and §6.2's npm-audit follow-up stay as they are.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  N/A — the contract is prose. Acceptance is grep plus `wc -c`.

**Implementation Notes:**

`claude/skills/ft-release/SKILL.md` §7.1 now holds Medium/Low findings for one ask. **Stop** (empty or unclear reply included) does not file and does not enter §7.2. **Release anyway** files each finding, then continues. Critical/High still fix inline; a finding that only drops to Medium/Low joins the ask; one that stays Critical or High stops the cut. The ask is not bundled into 📦.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

  N/A — no code. The verify commands are the greps and the byte check below.

- [x] Ran lint/type-check on changed code

  N/A — markdown only. Fence lines in the skill: 22 (balanced).

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

  N/A — no UI.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Structural pass: N/A for duplication and dead code — one skill paragraph plus the Step 7 opener. The public surface grew by the two options the PLAN line asked for.

Verification receipt (exit 0 unless noted):

- `! grep -q 'Default to file-followup if uncertain' claude/skills/ft-release/SKILL.md` → 0
- `grep -q 'Release anyway'` and `grep -q 'do not enter §7.2'` → 0
- `grep -q 'Critical / High'` → 0
- `grep -q 'caps standing banners at'` → 0
- `wc -c` → 34641, under 40000 → 0

External review (read-only sub-agent, blockers: none):

- Note — `SPEC/gates.md` still says closure has no intermediate gates and skill extensions bundle into 📦. Fixed in the skill: the ask is named as a pre-§7.2 wait and is not a 📦 bundle. `SPEC/gates.md` unchanged; push-go remains the release prompt that bundles, and §7.2 was already an earlier wait.
- Note — Release anyway could be read as the default. Fixed: Stop is listed first, neither option is the default, and an empty or unclear reply is Stop.
- Note — a Critical/High fix that only lowers severity could skip the ask. Fixed: cleared means the finding is gone; a drop to Medium/Low is held.
- Note — budget might be characters. Declined: `docs/CONTEXT-BUDGET.md` measures bytes with `wc -c`, and CI does the same.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  No change for every entry in that list (README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md). The edit is `claude/skills/ft-release/SKILL.md`, which that section excludes.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The rule belongs in the release skill the cutter already loads.

**Final Summary:**

`/ft-release` no longer files Medium/Low doc-audit findings and keeps cutting. It stops and asks. Stop holds the cut until the findings are fixed in the working tree. Release anyway is the only path that files them and ships. Critical and High findings still have to be fixed inline. No adopter edit.

`touches:` reconciliation: declared `claude/skills/ft-release/SKILL.md`. The closure diff also updates this task's PLAN row and archive move, which the reconciliation excludes. No undeclared deliverable path.

**Archived:** 2026-10-02
