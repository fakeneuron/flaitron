---
title: parallel-dogfood-stamp-ownership
status: completed
tags: []
created: 2026-08-03
due:
related-tasks: [CORE-405]
---

# CORE-406 | parallel-dogfood-stamp-ownership

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-405]]

## 🎯 Goal

Define and document who writes `last-verified` stamps when agents are dogfooded in parallel, so concurrent sessions stop racing on `docs/AGENT-COMPAT.md` / `docs/PLATFORMS.md` / `claude/CAPABILITIES.md`.

## ✅ Acceptance

- [x] `docs/AGENT-COMPAT.md` §"Reading the cells" Update obligation states that when multiple agent sessions dogfood toward the same release concurrently, only the release-driving session (the one carrying the cut to tag/push) writes the `last-verified` stamp files — other sessions report their refreshed/skipped verdict conversationally instead of editing the files
- [x] `claude/skills/ft-release/SKILL.md` §5 dogfood-gate walk carries the matching scoping rule at the point the walk applies edits
- [x] Doc-drift sweep clean (no other AI-referenced doc needs a matching edit for this rule)

## 🧩 Subtasks

- [ ] Add stamp-write-ownership rule to `docs/AGENT-COMPAT.md` §"Reading the cells" (Update obligation paragraph, after the `docs/DOGFOOD.md` pointer sentence)
- [ ] Add matching rule to `claude/skills/ft-release/SKILL.md` §5, scoping the dogfood-gate walk's stamp writes to the release-driving session
- [ ] Markdown lint mental-pass on both edited files
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-405]] — surfaced the stamp-write race during the v5.15.0 release dogfood gate

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task is well-specified by the filer (this task's own author, from the CORE-405 release chat) down to the exact two edit sites. Confirmed both sites still exist and match the description; no re-scope needed.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A`, doc-only change (no code, no module boundary). The addition is a scoping rule inserted into two existing prose sections; no new abstraction, no refactor.

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/CORE/` + grep for `AGENT-COMPAT.md`/`ft-release/SKILL`/`DOGFOOD.md` matched most archived tasknotes (these paths are boilerplate-referenced in every Phase 4 doc-drift sweep), so the grep alone wasn't a useful filter. Read the directly relevant history instead: CORE-405 (this task's origin — see Discovery Notes), CORE-269 (created `docs/DOGFOOD.md`), CORE-224.1-6 (introduced the `last-verified` stamp scheme this task extends).

- [x] **Drift check** — `docs/AGENT-COMPAT.md` §"Reading the cells" Update obligation (lines 78-90) and `claude/skills/ft-release/SKILL.md` §5 dogfood-gate walk (lines 169-177) both match the task description exactly; no drift. Confirmed `codex/skills/ft-release/SKILL.md` is a thin wrapper pointing at the Claude skill as canonical (`diff` shows it just says "Read and follow `../../../claude/skills/ft-release/SKILL.md`"), so no duplicate edit is needed there.

- [x] Logged "No clarifications needed" — see Discovery Notes for the explicit assumptions.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Explicit assumptions:
- "Release-driving session" = the session that carries the `/ft-release` cut through to §7's tag + push (the one whose commit-go actually lands). Any other session independently exercising `/ft-release` or `docs/DOGFOOD.md` in parallel (e.g. a dogfood verification run under a different agent) is a "parallel dogfood session" for this rule's purposes.
- Root cause (confirmed by reading CORE-405's archived tasknote, lines 106-160): during the v5.15.0 cut, a Grok Build session drove its own `/ft-release` walk independently and in parallel with the Claude session that actually cut the release. `SKILL.md` §5's walk resolves *every* dogfooded row (Claude, Grok, Codex), not just the row for the agent driving that session — so Grok's walk, via its own operator `AskUserQuestion` answers, wrote `skipped @ v5.15.0` for the Claude and Codex rows too. That was accurate at the moment it was written (neither real result existed yet), but it raced against the Claude session's own later resolution and had to be reconciled by hand before tagging. `docs/DOGFOOD.md` §"Recording the result" already tells a lone dogfood session to report its stamp to the operator rather than write it directly — but `ft-release` §5's walk has no equivalent restriction, so a session running the *full release skill* (not just the DOGFOOD.md procedure) writes stamps unconditionally regardless of whether it's the one taking the cut to tag/push.
- Fix scope is exactly the two locations named in the PLAN.md line: `docs/AGENT-COMPAT.md` §"Reading the cells" (the canonical obligation) and `claude/skills/ft-release/SKILL.md` §5 (the walk that currently lacks the restriction). `docs/DOGFOOD.md` needs no edit — its existing report-not-write instruction is already correct for the case it covers (a standalone dogfood run); the gap is specifically in the `ft-release` §5 walk, which this task closes.
- No code changes; this is a docs-only tasknote. Best Practices Review and the Phase 2 pattern-survey/minimal-refactor gates are `N/A` accordingly.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` (doc-only). Both insertions extend the existing prose pattern of their surrounding section (bold lead-in label + paragraph, matching neighboring callouts like "Grep residue is expected..." and "Standing SOP-currency check...").

- [x] **Minimal refactor gate** — `N/A`, no code touched.

- [x] Implemented the minimal solution — two paragraph insertions, no other file changes:
  - `docs/AGENT-COMPAT.md` §"Reading the cells" Update obligation — new "Stamp-write ownership under parallel dogfooding" paragraph, inserted after the `docs/DOGFOOD.md` pointer sentence.
  - `claude/skills/ft-release/SKILL.md` §5 dogfood-gate walk — matching paragraph inserted after step 3 (where the stamp writes actually happen), before the "Grep residue" callout.

- [x] Updated/added tests — `N/A`, prose-only change; no test surface.

**Implementation Notes:**

Confirmed `codex/skills/ft-release/SKILL.md` needs no mirrored edit — it's a thin wrapper ("Read and follow `../../../claude/skills/ft-release/SKILL.md`"), so the Claude-side edit is the single source of truth. `docs/DOGFOOD.md` needs no edit either — its existing "report the updated stamp to the operator" instruction already matches the new rule for the standalone-dogfood case; the gap this task closes is specifically in `ft-release` §5's walk, which previously wrote unconditionally.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, prose-only docs; no test suite covers these files. No root `package.json`/markdown-lint tooling exists in this repo (checked).

- [x] Ran lint/type-check on changed code — `N/A` for the same reason; performed a manual markdown mental-pass instead (`git diff` review): both insertions match surrounding prose style, headings/backticks/bold-lead-ins are well-formed, no broken cross-references.

- [x] **Quality assertions** — no duplication (each file states the rule once, from its own section's angle); no dead prose; the new paragraphs are additive, no surrounding text needed edits; no public-surface growth beyond the intended rule addition; both edited docs stay internally consistent with each other and with `docs/DOGFOOD.md`.

- [x] (frontend) — `N/A`, not a frontend change.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change (stamp itself untouched; this task adds a process rule, not a verification)
  - `docs/AGENT-COMPAT.md` — **updated**: added "Stamp-write ownership under parallel dogfooding" paragraph to §"Reading the cells" Update obligation

  `claude/skills/ft-release/SKILL.md` also updated (matching §5 rule) — not part of the cold-start sweep per README.md (lazy-loaded skill, authoritative when fired), noted here for completeness.

- [x] Closed — all three Acceptance criteria ticked; YAML `status:` flipped to `completed` below; PLAN.md line will flip to stub form in the same closure commit; tasknote moves to archive in the same commit.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Added a stamp-write ownership rule so only the release-driving `/ft-release` session ever writes `last-verified` dogfood stamps — any other session dogfooding in parallel now reports its verdict conversationally instead of racing on the shared stamp files. Two prose insertions, no code:

- `docs/AGENT-COMPAT.md` (+12 lines) — new paragraph in §"Reading the cells" Update obligation.
- `claude/skills/ft-release/SKILL.md` (+2 lines) — matching paragraph in §5's dogfood-gate walk, placed right after the step that performs the file writes.

Verification: manual markdown mental-pass via `git diff` (no lint/test tooling applies to prose docs in this repo); confirmed `codex/skills/ft-release/SKILL.md` is a thin wrapper needing no mirrored edit, and `docs/DOGFOOD.md`'s existing report-to-operator instruction already covers the standalone-dogfood case, so it was correctly left untouched. No refactor — both edits are additive paragraphs matching each section's existing prose pattern. Doc-drift sweep clean. Maintainability effect: closes the exact race documented in CORE-405's tasknote (a parallel Grok session's interim `skipped @ v5.15.0` write for Claude/Codex rows it didn't own, later reconciled by hand); future release cuts with parallel dogfood sessions now have an explicit ownership rule instead of relying on ad hoc reconciliation.

**Archived:** 2026-08-03
