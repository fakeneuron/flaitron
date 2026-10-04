---
title: audit-write-step-commit
status: completed
tags: []
created: 2026-08-19
due:
related-tasks: [CORE-429]
touches:
  - SPEC/tasknote-selection.md
  - claude/skills/ft-audit/SKILL.md
  - claude/commands/ft-audit.md
  - SPEC.md
---

# CORE-455 | audit-write-step-commit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-429]]

## 🎯 Goal

Make `/ft-audit` auto-commit its PLAN.md write (tickets + inline fixes) at the write-step confirmation, mirroring the filing-only skills — write-step yes is commit authorization, no second 📦.

## ✅ Acceptance

- [x] `SPEC/tasknote-selection.md` §"Filing commits" extends to `/ft-audit`: write-step confirmation is commit authorization; message shape; explicit-pathspec staging (PLAN.md plus any inline-fix source paths); pre-check/skip-on-dirt guard; commit-never-push; not-a-closure-commit / no 🏁; execution-skills carve-out unchanged
- [x] `claude/skills/ft-audit/SKILL.md` §5 gains explicit write-step confirmation, pre-check, commit as last write, and hand-off SHA reporting
- [x] `claude/commands/ft-audit.md` reflects auto-commit at write-step (no stale "leaves tree dirty" claim)
- [x] `SPEC.md` §"When to use a tasknote" module summary names `/ft-audit` in the filing-commit contract
- [x] Subroutine-safe carve-out (§6) still skips PLAN write and commit when invoked from another skill
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Extend `SPEC/tasknote-selection.md` §"Filing commits" for `/ft-audit`
- [x] Edit `claude/skills/ft-audit/SKILL.md` §5: write-step gate + pre-check + commit + hand-off
- [x] Update `claude/commands/ft-audit.md`
- [x] Update `SPEC.md` module-summary line
- [x] Verify subroutine carve-out and grep for stale claims
- [x] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-429]] — established filing-commit contract for the three filing-only skills; deferred `/ft-audit*` as follow-up

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-audit` §5 names the PLAN.md diff as deliverable but never commits; CORE-429's paper-complete guard makes leftover PLAN dirt a hard stop at the next `/ft-task`, and CORE-429 explicitly deferred audit skills.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — contract lives once in `SPEC/tasknote-selection.md`; skill carries executable interpretation only (CORE-429 DRY boundary). Inline-fix paths must join explicit pathspec staging — never `-a`.

- [x] **Archive skim** — [[CORE-429]] is the direct precedent: pre-check immediately before first write (not pre-flight), filing approval = commit auth, no 🏁, execution-skill carve-out list.

- [x] **Drift check** — PLAN line matches HEAD: ft-audit §5 references "write-step confirmation" in trivial-fix carve-out but never defines the step or commit; ft-audit is absent from filing-only and execution lists in §"Filing commits"; command wrapper says tickets are written but silent on commit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Commit message shape (assumption).** Audit filings have no single `<ID>` — use `chore: audit file tickets — <domain>` (domain token from §1 resolution). Inline-only zero-ticket runs are rare (§5 says skip write on zero findings); if tickets + inline fixes, one commit covers both.

**Staging set.** Always `.flowtron/PLAN.md`; plus each inline-fix source path by name. Never `git add .` / `-a`.

**Write-step confirmation.** Add explicit `AskUserQuestion` (or prose ask) before any PLAN write — mirrors filing skills' review gate; the yes authorizes both write and commit.

**Subroutine carve-out preserved.** §6 "Subroutine-safe" already forbids PLAN writes when invoked as subroutine — commit steps must stay inside the non-subroutine §5 path only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-429 filing-commit pattern; contract once in SPEC, executable steps in skill; no new abstractions

- [x] **Minimal refactor gate** — no refactor; §5 renumbered to absorb write-step + pre-check + commit without touching §1–4 or pass files

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only contract + skill prose)

**Implementation Notes:**

§5 now opens with subroutine skip pointer, then five numbered steps: write-step confirmation → pre-check → write tickets → trivial-fix carve-out (unchanged semantics) → commit with explicit pathspecs. §6 deliverable line and §8 red-flag row updated for SHA hand-off. Codex wrapper is pointer-only — no edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code)

- [x] Ran lint/type-check on changed code — N/A (markdown only)

- [x] **Quality assertions** — contract stated once in SPEC; skill cites it; no duplicate rules; subroutine carve-out untouched at §6

- [x] (frontend) N/A — no frontend changes

**Testing Notes:**

`grep -rn "commit unprompted" claude/skills/ft-audit claude/commands/ft-audit.md` → zero hits. §6 subroutine-safe row still forbids PLAN writes when invoked as subroutine — commit steps live only in §5 which subroutine skips entirely.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` updated (module-summary line) · `docs/MIGRATION.md` no change (§1.2.1 describes fork/install; filing-commit behavior lives in SPEC) · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change

- [x] Closed — Acceptance ticked, YAML `status:` flipped, PLAN.md stubbed, tasknote archived

- [x] **Evidence-based recap** drafted below

**Final Summary:**

`/ft-audit` now auto-commits at write-step confirmation, closing the gap CORE-429 deferred: write-step yes authorizes both PLAN ticket writes (plus inline fixes) and a `chore: audit file tickets — <domain>` commit with explicit pathspecs — no second 📦.

| Path | Change |
|---|---|
| `SPEC/tasknote-selection.md` | §"Filing commits": `/ft-audit` as fourth motion, message shape, inline-fix pathspec note |
| `claude/skills/ft-audit/SKILL.md` | §5 write-step + pre-check + commit; §6/§8 hand-off cues |
| `claude/commands/ft-audit.md` | auto-commit sentence |
| `SPEC.md` | module-summary lists four filing motions |

Verification: grep confirms no stale unprompted-commit claim on audit surfaces; §6 subroutine carve-out unchanged.

**Archived:** 2026-08-19
