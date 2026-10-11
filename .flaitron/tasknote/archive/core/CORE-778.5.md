---
title: docs-sweep
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-778, CORE-778.4]
touches:
  - docs/GLOSSARY.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-NEUTRALITY.md
  - templates/tasknote-README.md
  - templates/spec-template.md
  - viz/src/tasknote.test.ts
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-778.5 | docs-sweep

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-778]]

## 🎯 Goal

Sweep the last stale `micro` / `/ft-micro-task` mentions out of the docs and templates, and pin the `--micro` note shape in a viz parser fixture.

## ✅ Acceptance

- [x] No stale `ft-micro-task` mention remains outside the allowlist (`docs/VERSION-HISTORY.md`, archives, and the correct-history exceptions in Discovery Notes) — `git grep -l ft-micro-task -- . ':!docs/VERSION-HISTORY.md' ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` lists only the allowlist
- [x] The swept docs and templates describe `/ft-task --micro` and the current template shape — `judgment` (prose accuracy; the grep above only proves the old name is gone)
- [x] A viz fixture parses a `--micro`-shaped note (Goal / Acceptance / Subtasks, one `## ⚡ Notes` log, no phase headings) — `npm --prefix viz test`
- [x] Viz typecheck, lint, and build stay green — `npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build`
- [x] Drift checks and context budgets stay green — `bash tools/drift-checks.sh`
- [x] Phase 4 doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs": per-entry "no change" or the update — `judgment` (recorded in Phase 4)

## 🧩 Subtasks

- [x] `docs/GLOSSARY.md` — rewrite the `micro-tasknote` entry for `/ft-task --micro` and the spec-on-top shape
- [x] `docs/CONTEXT-BUDGET.md` — preamble rows (L50, L99) and the stale ledger prose (L255, L284, L305)
- [x] `docs/AGENT-NEUTRALITY.md` — fix the `tasknote-selection.md` skill-name row (L38); drop the micro-template recap-line row (L56)
- [x] `templates/tasknote-README.md` L19 and `templates/spec-template.md` L47 — point at `/ft-task <ID> --micro`
- [x] Viz fixture: a `--micro`-shaped note in `viz/src/tasknote.test.ts`
- [x] Run the allowlist grep, `npm --prefix viz` test / typecheck / lint / build, and `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-EPIC-778]] — parent epic: fold `/ft-micro-task` into `/ft-task --micro`
- [[CORE-778.4]] — predecessor: contract reconcile; its closing note lists what it left for this sweep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The epic's last implementation child. Docs and templates still name the retired runner; the work is a bounded sweep plus one test fixture, matching its `[light]` tag.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Best Practices Review:** N/A for the docs. The one code touch is a test fixture added beside the existing `parseTasknote` cases in `viz/src/tasknote.test.ts`; no module boundary moves.

**Archive skim:** `archive/core/` (README table: `CORE-*` → `archive/core/`). [[CORE-778.1]] inventoried the surface; [[CORE-778.2]] through [[CORE-778.4]] each recorded which mentions they left to this child. [[CORE-778.4]]'s Maintainability line is the authoritative handoff: this child owns GLOSSARY, CONTEXT-BUDGET, AGENT-NEUTRALITY, CODEX-VERIFICATION, `tasknote-README.md`, `spec-template.md`; the rest are correct history.

**Drift check.** Read against HEAD `9600bbfa`; three findings change the PLAN line's literal wording:

1. **The "grep is empty" criterion is not literally attainable.** After [[CORE-778.4]], `git grep -l ft-micro-task` outside VERSION-HISTORY and the archives still hits correct history: `docs/MIGRATION.md` (retired-skills row and the v7.0.0 relink recipe), `tools/update-adopters.mjs` and its test (the rename-map fold), `claude/skills/ft-release/step-7.1-mirror-pairs.md` L101 (Pair M example), `claude/skills/ft-task/micro-mode.md` L12 (the legacy-note upgrade), `docs/EXTERNAL-AGENTS.md` L97 (archived-note exception), `.flaitron/PLAN.md` L23 (the epic row), `.flaitron/PLAN-ARCHIVE.md`. These cannot be removed without falsifying the retirement record, so Acceptance binds the grep to that allowlist instead.
2. **`docs/CODEX-VERIFICATION.md` is a dated receipt, not a roster.** Its header says it is a 2026-10-01 observation that predates v6.0.0 and uses the v5.33.0 names. `ft-micro-task` appears in it exactly as `ft-file-followup` does (renamed at v7.0.0 and left in place). Rewriting observed link states would falsify the receipt. Verdict: no change; added to the allowlist.
3. **`README.md` has no micro mention** (`grep -i micro README.md` is empty). No change.

Real work, by file: `docs/GLOSSARY.md` L89 (entry describes the retired do-the-work-plus-recap shape and cites the runner's template); `docs/CONTEXT-BUDGET.md` L50 and L99 (preamble "shared with `/ft-micro-task`" — the [[CORE-778.4]] handoff), L255 (the [[CORE-605]] citer list names the deleted `claude/skills/ft-micro-task/SKILL.md`), L284 (skill-body size roster lists the deleted skill), L305 (the preamble-has-its-own-row rationale names `/ft-micro-task`); `docs/AGENT-NEUTRALITY.md` L38 (names the skill in a ledger row for `SPEC/tasknote-selection.md`, which no longer cites it) and L56 (a ledger row for a recap line in the micro template that points at the deleted `SKILL.md`; `templates/tasknote-micro-template.md` no longer carries any such path); `templates/tasknote-README.md` L19 and `templates/spec-template.md` L47.

**Viz parser.** Fixture only. The `--micro` shape has `## 🎯 Goal` / `## ✅ Acceptance` / `## 🧩 Subtasks`, one `## ⚡ Notes` log, and no phase headings, so `parseTasknote` yields all-zero `phases`. The fixture asserts what the parser actually returns today rather than a prediction.

**Clarifications:** No clarifications needed. Assumptions: the allowlist in finding 1 is the intended reading of the PLAN line's "outside VERSION-HISTORY and the archive" (the [[CORE-778.4]] handoff already names those exceptions); the 20-file budget numbers in CONTEXT-BUDGET (L284 sizes) are edited by removing the deleted skill's entry, not by re-measuring.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the `--micro` parser fixture

**Implementation Notes:**

Pattern: the sibling children's own sweeps ([[CORE-778.3]], [[CORE-778.4]]) — edit the prose in place, keep the surrounding ledger shape, leave history rows as history. Fixture sits beside the existing `parseTasknote` cases (`returns zero phase counts…`, starter case) and asserts observed parser output.

Edits:
- `docs/GLOSSARY.md` — `micro-tasknote` entry rewritten for `/ft-task <ID> --micro` and the spec-on-top shape; `review probe` entry drops the clause explaining why the retired runner had no review item (a micro note now carries **External review**); `sidequest` entry promotes via `/ft-task` (`--micro` for a micro-sized stub).
- `docs/CONTEXT-BUDGET.md` — preamble row rationale and history row (the [[CORE-778.3]] step recorded, 7,512 B measured); [[CORE-605]] citer list names the retired runner's SKILL.md in past tense; the skill-body size roster loses the deleted skill; the preamble-has-its-own-row sentence drops the second runner; the branch-gated flag list gains `--micro`. The roster's other figures are a dated snapshot and were not re-measured.
- `docs/AGENT-NEUTRALITY.md` — dropped the retired skill from the `tasknote-selection.md` and `plan-filing.md` skill-name rows; deleted the micro-template recap-line row (the template carries no such path now).
- `templates/tasknote-README.md`, `templates/spec-template.md` — `/ft-task <ID> --micro`.
- `viz/src/tasknote.test.ts` — `parses a --micro note: spec on top, one Notes log, no phase headings`.

Deferred, not done: `docs/CODEX-VERIFICATION.md` (dated receipt, README-declared outside the sweep set; see Discovery finding 2) and `README.md` (no micro text). Scope grew by two lines the PLAN row did not name (`AGENT-NEUTRALITY.md` L39 and the `GLOSSARY.md` `review probe` / `sidequest` entries) because the acceptance grep and the swept files' own claims required them.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason — N/A: the diff is ~12 lines of doc prose plus one self-contained test fixture, too small to grade; the allowlist grep and drift checks decide the mechanical criteria

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface changed (a test fixture only)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (Acceptance order):
- `git grep -l ft-micro-task -- . ':!docs/VERSION-HISTORY.md' ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` → exit 0; lists exactly the allowlist: `.flaitron/PLAN.md`, `step-7.1-mirror-pairs.md`, `micro-mode.md`, `docs/CODEX-VERIFICATION.md`, `docs/EXTERNAL-AGENTS.md`, `docs/MIGRATION.md`, `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`. Every one is correct history (Discovery finding 1 and 2). No other hit; a case-insensitive `ft-micro` grep adds none.
- Judgment criterion (swept prose describes `--micro` and the current shape): read each rewritten entry against `micro-mode.md` and `SPEC/tasknote-selection.md` L81-94 — consistent.
- `npm --prefix viz test` → 29 files, 592 tests passed (includes the new fixture; `tasknote.test.ts` alone 65 passed).
- `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0.
- `bash tools/drift-checks.sh` → 0 (context_budget, pair_q, pair_r, final_newline all ok). `git diff --check` → 0.
- Structural: no duplication or dead code; stale docs are the subject of the task.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `docs/AGENT-NEUTRALITY.md` — updated (two ledger rows corrected, one deleted). `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (a case-insensitive `micro` grep shows only current `--micro` wording; `README.md` has none). `docs/EXTERNAL-AGENTS.md` — no change (row 97 keeps its archived-note exception, per the [[CORE-778.4]] handoff). Excluded-by-README records edited anyway where they state live facts: `docs/GLOSSARY.md`, `docs/CONTEXT-BUDGET.md`; `docs/CODEX-VERIFICATION.md` untouched (dated receipt).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A — nothing the always-loaded layer lacks. One note for the audit: an epic's literal "grep is empty" criterion collides with retirement records by design; the allowlist belongs in the criterion when it is filed.

**Final Summary:**

The last stale `/ft-micro-task` mentions are out of the live docs and templates, and a viz fixture now pins the `--micro` note shape. `git grep ft-micro-task` outside VERSION-HISTORY and the archives lists only correct history, which cannot be removed without falsifying the retirement record.

- Changed: `docs/GLOSSARY.md`, `docs/CONTEXT-BUDGET.md`, `docs/AGENT-NEUTRALITY.md`, `templates/tasknote-README.md`, `templates/spec-template.md`, `viz/src/tasknote.test.ts` (new fixture). `docs/CODEX-VERIFICATION.md` (dated receipt) and `README.md` (no micro text) needed no change.
- Verification: allowlist grep lists only the eight correct-history files; viz 592 tests, typecheck, lint, build all 0; `bash tools/drift-checks.sh` 0.
- Wording departure: the PLAN row's "grep empty" is met as "grep lists only the allowlist" (Discovery Notes finding 1). External review N/A (diff too small to grade).
- Docs: doc-drift sweep recorded in Phase 4; only `docs/AGENT-NEUTRALITY.md` of the swept set needed edits.
- Scope reconciliation: `touches:` declared six paths and the diff edits those six, plus this note.
- Maintainability: the live docs no longer name a deleted skill, and the micro note shape has a parser regression guard. The audit [[CORE-778.N]] runs next.

**Archived:** 2026-10-10
