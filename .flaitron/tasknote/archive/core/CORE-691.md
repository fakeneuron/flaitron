---
title: doc-crossfile-cite-sweep
status: completed
tags: []
created: 2026-10-03
due:
related-tasks: []
touches:
  - SPEC/procedures/ft-task.md
  - SPEC/blocked.md
  - SPEC/gates.md
  - SPEC/starter.md
  - README.md
  - docs/GLOSSARY.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
---

# CORE-691 | doc-crossfile-cite-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the audit-docs 2026-10-03 cross-file pointer, wording and count drifts (Findings #5, #14, #15, #16).

## ✅ Acceptance

- [x] No `.flowtron/core/docs/` left in the three snippets — `grep -rn 'core/docs' codex/AGENTS-snippet.md cursor/AGENTS-snippet.md grok/AGENTS-snippet.md` exits 1
- [x] Cites retargeted or named — `grep -F 'SPEC/superseded-claims.md' SPEC/procedures/ft-task.md`, `grep -F 'SPEC/plan-parser.md` §"Long-description' SPEC/blocked.md`, `grep -F 'SPEC.md` §"🚀 Phase 4' SPEC/gates.md`, `grep -F step-7.1-standing-checks.md README.md` all exit 0
- [x] Counts and wording — `grep -F '~73' README.md docs/GLOSSARY.md`, `grep -F 'retired template default' SPEC/blocked.md`, `grep -F 'Explicitly out of scope' SPEC/starter.md` exit 0
- [x] Repo validation set green — `npm --prefix viz test|typecheck|lint|build`, `node --test tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] Apply the nine file edits listed in the PLAN row
- [x] Run the validation set and the External review

## 🔗 Related

- Surfaced by audit-docs 2026-10-03 (Findings #5, #14, #15, #16, Low)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every cited drift was live; two line numbers had shifted (`SPEC/procedures/ft-task.md:440` is 439-440, `SPEC/gates.md:50` cite sits in the preview-line paragraph).

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A, prose-only edits.

- [x] **Archive skim** — area `core` per the README table; no prior note owns these lines beyond the audit that filed them.

- [x] **Drift check** — line numbers matched within a few lines; targets located by content.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks populated and `touches:` declared

**Discovery Notes:**

No clarifications needed (--unattended). Assumptions: the glossary count follows the PLAN's ~73 (raw `^\*\*` count is 75); the missing `SPEC/starter.md` sub-heading is added to the conventional list, matching `templates/tasknote-starter-template.md`.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing cite forms (`` `File` §"Section" ``).

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose only.

**Implementation Notes:**

Nine files edited, one line each (starter.md rewraps one line). The `.flowtron/core/docs/` paths became `../docs/` in all three snippets.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt**

- [x] **External review**

- [x] (frontend) N/A — no UI.

**Testing Notes:**

Full validation set (--unattended): `npm --prefix viz test` → 0; `npm --prefix viz run typecheck` → 0; `npm --prefix viz run lint` → 0; `npm --prefix viz run build` → 0; `node --test tools/update-adopters.test.mjs` → 0 (54 pass).

External review (/code-review medium): no blockers. One note: `SPEC/blocked.md` "retired template default" vs `SPEC.md:130` still listing `not-started` as a valid status. No change needed — the template default is `in-progress` and the PLAN row specifies this wording; the enum keeps the value.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` and `docs/GLOSSARY.md` updated (count); the three snippets updated (paths). No change: the other AI-referenced docs.

- [x] Closed

- [x] **Evidence-based recap**

- [x] **Learnings** — N/A.

**Final Summary:**

Nine docs carry corrected cites, paths and counts. `touches:` matches `git diff --name-only` exactly.

unattended-candidates: none

**Archived:** 2026-10-03
