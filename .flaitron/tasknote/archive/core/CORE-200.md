---
title: shell-discipline-lift-candidate
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-198.2, CORE-125, CORE-EPIC-154]
---

# CORE-200 | shell-discipline-lift-candidate

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-198.2]] [[CORE-125]] [[CORE-EPIC-154]]

## 🎯 Goal

Decide whether to lift the agent-neutral half of `~/.claude/CLAUDE.md` §Shell discipline (the `cd dir && command` avoidance rule) into flowtron's `docs/CONVENTIONS.md` or `claude/AGENTS-snippet.md` as a project-agnostic adopter convention — and execute the lift if the decision is yes.

## ✅ Acceptance

- [x] Decision recorded (don't lift) with rationale
- [x] PLAN.md line flipped to stub form; CORE-200 archived

## 🧩 Subtasks

- [x] Read `~/.claude/CLAUDE.md` §Shell discipline (both bullets) to capture exact wording
- [x] Read CORE-198.2 audit (Finding #19) to recover the lift rationale
- [x] Read `docs/CONVENTIONS.md` and `claude/AGENTS-snippet.md` to assess fit
- [x] Surface the decision to the user via structured ask (AskUserQuestion) with three options: don't lift / lift to CONVENTIONS.md / lift to AGENTS-snippet.md — user chose **don't lift**
- [x] Record rationale in Final Summary

## 🔗 Related

- [[CORE-198.2]] — redundancy audit that surfaced this lift candidate (Finding #19, soft)
- [[CORE-125]] — 2026-05-20 audit-docs fix that operationalized the `git -C` / `npm --prefix` pattern in flowtron's own docs (`claude/CLAUDE-snippet.md`); evidence the rule is already followed de-facto without being codified as a flowtron convention
- [[CORE-EPIC-154]] — multi-agent-portability epic locked the contract-layer agent-neutrality posture; the Claude-permission-prompt half of §Shell discipline stays user-side, and per this task the agent-neutral half stays user-side too

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task as filed is "user decides." The deliverable is the decision itself — surfacing the call via a structured ask is exactly the task shape. Not a Re-scope (no plan rewrite needed) and not a De-scope (the decision IS the deliverable; the user choosing "don't lift" completes the task as filed).

- [x] Read relevant source files:
  - `~/.claude/CLAUDE.md` §Shell discipline (lines 25-27) — two bullets: (1) Claude-permission-prompt rationale for never prepending `cd <current-directory>`; (2) more general "avoid `cd dir && command` whenever the underlying tool can find its own config (Vite/Vitest/tsc/ruff/pytest)". Bullet 2 is the lift candidate.
  - `docs/CONVENTIONS.md` — 5 entries under `## Adheres to` (Conventional Commits, SemVer, GFM, Diátaxis) and 4 under `## Declines` (CHANGELOG, ADRs, release automation, pre-commit hooks). All entries are named external conventions with canonical references / spec links.
  - `claude/AGENTS-snippet.md` — paste-block (~13 markdown body lines) is purely workflow pointers: SPEC reference, PLAN.md path, tasknote paths, `/ft-task` usage, filing-skill menu, 4-phase workflow declaration, `[model]` field semantics, submodule-read-only posture.
  - CORE-198.2 archive (Finding #19) — re-confirmed the lift-rationale shape: agent-neutral + project-agnostic, but flagged "borderline — adds bloat for marginal benefit; user decides."

- [x] **Archive skim** — `_project/tasknote/archive/core/` greps surfaced two relevant precedents beyond CORE-198.2:
  - **CORE-125** (2026-05-20) — audit-docs fix that normalized `cd _project/flowtron && git show vX.Y.Z` to `git -C _project/flowtron show vX.Y.Z` in `claude/CLAUDE-snippet.md`, citing the no-cd shell discipline as established pattern. Evidence: flowtron's own docs already follow the rule de-facto without codifying it.
  - **CORE-EPIC-154** (multi-agent-portability) — contract-neutrality posture: Claude-Code-specific rationale (permission-prompt) stays user-side. Constrains the lift bucket: only the agent-neutral half is eligible, and even that is borderline.
  - Other hits (CORE-099 cohort, CORE-110/113/115/116/119/121/129/134) touched CONVENTIONS.md or AGENTS-snippet.md but on different axes (commit conventions, ADR posture, paste-block migration); none re-do the shell-discipline-lift call.

- [x] **Drift check** — verified at HEAD:
  - `~/.claude/CLAUDE.md` §Shell discipline content matches the task description's quoted text ("avoid `cd dir && command` whenever the underlying tool can find its own config"). ✓
  - Both target docs (`docs/CONVENTIONS.md`, `claude/AGENTS-snippet.md`) exist with the expected structure. ✓
  - CORE-198.2 Finding #19 row matches the PLAN.md line's parenthetical citation. ✓
  - No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **One structured ask via AskUserQuestion** (three options: don't lift / lift to CONVENTIONS.md / lift to AGENTS-snippet.md). User chose **don't lift**. The ask is the task's deliverable, not a scope deviation.

- [x] Subtasks above populated with concrete, ordered steps.

**Discovery Notes:**

**The three options surfaced (and their tradeoffs):**

1. **Don't lift (chosen).** CONVENTIONS.md scope is named external conventions with canonical references — the `cd dir` rule has no such standard; adding it would expand the doc's scope into operator hygiene. AGENTS-snippet.md paste-block is currently pure workflow pointers; adding a behavioral preference would set precedent for unrelated hygiene bullets. The agent-neutral half loses its sting without the Claude-permission-prompt half: it reads as generic shell hygiene that most experienced devs already follow. CORE-125 confirms flowtron's own docs follow the rule de-facto without codifying it.

2. **Lift to `docs/CONVENTIONS.md`.** Would add a new `### Shell command discipline` subsection under `## Adheres to`. Tradeoff: expands the doc's scope beyond named external standards.

3. **Lift to `claude/AGENTS-snippet.md`.** Would add a bullet to the paste-block. Tradeoff: paste-block bloat; first behavioral preference in an otherwise-workflow-only block.

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced no significant scope deviation — the structured ask is exactly the task shape filed in PLAN.md ("user decides"). The user's choice (don't lift) keeps the task on the Proceed path; the remaining execution is recording the rationale. → **Skip 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A (no code change; the deliverable is a recorded decision). The pattern for "decision-shaped tasks with audit-traceable rationale" is established by CORE-198.2's recommendations-only audit shape: surface the call, capture the rationale, archive.
- [x] Implemented the minimal solution — rationale captured in Discovery Notes (option tradeoffs) and Final Summary (decision + justification).
- [x] Updated/added tests for non-trivial behavior — N/A (no code surface).

**Implementation Notes:**

No file edits to `docs/CONVENTIONS.md`, `claude/AGENTS-snippet.md`, or `~/.claude/CLAUDE.md`. The decision is "don't lift"; the rationale lives in this tasknote's body and surfaces in the archive for future audits to consult before re-raising the same lift candidate.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code surface).
- [x] Ran lint/type-check on changed code — N/A.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Verification (substituting for automated tests): the decision is recorded with citations to source files (`~/.claude/CLAUDE.md` §Shell discipline lines 25-27, `docs/CONVENTIONS.md` structure, `claude/AGENTS-snippet.md` paste-block) and load-bearing precedents ([[CORE-198.2]] Finding #19, [[CORE-125]] de-facto-follow evidence, [[CORE-EPIC-154]] contract-neutrality posture). Future audits re-raising this lift candidate can consult this archive before re-surfacing the call.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip — see Final Summary below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change (decision = don't add the bullet) |
| `docs/CONVENTIONS.md` | no change (decision = don't add the subsection) |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change |
| `docs/PLATFORMS.md` | no change |

**Final Summary:**

Decided **not to lift** the agent-neutral half of `~/.claude/CLAUDE.md` §Shell discipline (the `cd dir && command` avoidance rule) into flowtron. The audit ([[CORE-198.2]] Finding #19) flagged this as borderline; the user's call confirms the borderline → keep-personal direction.

Technical detail:
- **No file edits.** Decision recorded in this tasknote's body; archive serves as future audits' reference before re-raising the same lift candidate.
- **Rationale (four-part):** (1) `docs/CONVENTIONS.md` scope is named external conventions with canonical references (Conventional Commits, SemVer, GFM, Diátaxis, Keep a Changelog, ADRs, release-please, pre-commit) — the `cd dir` rule has no such standard; adding it would expand the doc's scope into operator hygiene. (2) `claude/AGENTS-snippet.md` paste-block is currently pure workflow pointers — adding a behavioral preference bullet sets precedent for unrelated hygiene rules (commit style, branch naming, etc.). (3) The agent-neutral half loses its bite without the Claude-permission-prompt half: without "this triggers a permission prompt," the rule reads as generic shell hygiene most experienced devs already follow. (4) [[CORE-125]] archive confirms flowtron's own docs follow the rule de-facto via `git -C` / `npm --prefix` patterns — codifying it adds maintenance burden for marginal effect.
- **Posture:** consistent with [[CORE-EPIC-154]] contract-neutrality — the Claude-permission-prompt half is intentionally user-side; per this task, the agent-neutral half stays user-side as well. The boundary between user-private hygiene preferences and flowtron's adopter-facing contract surface is reaffirmed.
- **Net for the epic:** CORE-EPIC-198 (context-chain-portability) was the originating audit driver; CORE-200 closure leaves CORE-EPIC-198's `## Completed` cohort intact (the epic itself already closed at .5 audit on 2026-05-25). No follow-up tickets filed.

**Archived:** 2026-05-25
