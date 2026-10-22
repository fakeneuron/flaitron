---
title: micro-default
status: completed
tags: []
created: 2026-10-22
due:
related-tasks: [CORE-724.7, CORE-778.4]
touches:
  - SPEC/tasknote-selection.md
  - SPEC/post-closure.md
  - claude/skills/ft-task/step-0-flags.md
  - docs/GLOSSARY.md
  - templates/tasknote-README.md
  - claude/CAPABILITIES.md
  - SPEC/procedures/ft-task.md
---

# CORE-818 | micro-default

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-724.7]]

## 🎯 Goal

Flip the routing default so known work with no design question — a small multi-file change included — starts as `--micro`, while unknown scope, a tradeoff, `--loop`, and `--debug` stay on the full tasknote and a Re-scope still promotes micro to full.

## ✅ Acceptance

- [x] `SPEC/tasknote-selection.md` routes micro by known scope + no design question (a small multi-file change included), keeps unknown scope / a tradeoff / `--loop` / `--debug` on the full tasknote, names Re-scope as the promotion path, and the file-count axis and full-tasknote doubt-default are gone — `grep -q "small multi-file change" SPEC/tasknote-selection.md && grep -q "Re-scope" SPEC/tasknote-selection.md && ! grep -qE "single-file or near it|You're unsure — default to|When in doubt, write the full tasknote" SPEC/tasknote-selection.md`
- [x] The mode's one-line descriptions no longer frame micro as "too small for the ceremony" or route on file count — `! git grep -n -E "too small for (four|the full)|below full 4-phase|single-file or near it|or you are unsure" -- SPEC claude docs templates` (widened after External review)
- [x] The post-closure copy-paste line points its `--micro` pick at the routing rule — `grep -q "tasknote-selection.md" SPEC/post-closure.md`
- [x] `--micro` stays explicit opt-in (routing default, not runner auto-select) — `grep -q "Explicit opt-in only" SPEC/procedures/ft-task.md && grep -q "Explicit-opt-in only" claude/skills/ft-task/step-0-flags.md`
- [x] Drift checks and context budgets pass — `bash tools/drift-checks.sh`
- [x] The new routing reads as one coherent rule with no micro/full overlap — `judgment`: wording quality, no command decides it

## 🧩 Subtasks

- [x] Rewrite the micro use/skip blocks and the closing doubt-default in `SPEC/tasknote-selection.md`
- [x] Align the mode descriptions in `step-0-flags.md`, `docs/GLOSSARY.md`, `templates/tasknote-README.md`
- [x] Point `SPEC/post-closure.md`'s "`--micro` for micros" at the routing rule (≤349 B headroom)
- [x] Run the Acceptance greps and `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-724.7]] — predecessor: its review left "single-file or near it" (micro) overlapping "touches multiple files" (full), with "unsure → `/ft-task`" as the tie-break; this task replaces the file-count axis
- [[CORE-778.4]] — predecessor: folded `/ft-micro-task` into `/ft-task --micro`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC/tasknote-selection.md` still routes micro on file count ("single-file or near it") and closes on "When in doubt, write the full tasknote" / "You're unsure — default to `/ft-task`". Both are what the PLAN line asks to flip.

- [x] Read relevant source files — `SPEC/tasknote-selection.md`, `claude/skills/ft-task/micro-mode.md`, `step-0-flags.md`, `SPEC/procedures/ft-task.md` §primitives, `SPEC/post-closure.md` step 3, `docs/GLOSSARY.md`, `templates/tasknote-README.md`, `claude/CAPABILITIES.md` `--micro` row; `git grep` for every micro-threshold phrasing

- [x] **Best Practices Review** — N/A: contract prose only, no code or module boundary

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). Grep for the threshold phrasings hit only [[CORE-724.7]]: its review flagged the micro/full overlap and left "unsure → `/ft-task`" as the tie-break. No other load-bearing hits.

- [x] **Drift check** — PLAN line matches; cited file exists and holds both doubt-default lines (`:95`, `:111`). No drift.

- [x] Asked clarifying questions — operator picked **routing default** over runner auto-select: the rule changes in `SPEC/tasknote-selection.md`, `--micro` stays an explicit flag, and agents apply the rule wherever they print an invocation.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Explicit-opt-in sites (`SPEC/procedures/ft-task.md:52`, `step-0-flags.md:34`) stay as they are. The operator still passes the flag, so this changes only how the tier is picked.
- "Use a tasknote when the change touches more than one file" (`tasknote-selection.md:12`) covers tasknote-vs-none, not the tier. Left unchanged.
- Skill `description:` lines ("micro-sized task") are generic; left as-is to avoid trigger churn.
- `docs/CONTEXT-BUDGET.md` §"Adopter-side always-loaded" ledger figure for `templates/tasknote-README.md` is refreshed by `/ft-release` §7.1, not here.
- Downstream scan: only [[CORE-819]] shares the area (closure subject rule). It is Unaffected.
- Doubt split: if known work might be too big for micro, start micro, and Re-scope converts it in place. If the scope is actually unknown, use the full tasknote.

Discovery surfaced no significant deviation (the mechanism question was answered before planning) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing use/skip bullet-block shape in `SPEC/tasknote-selection.md`; no new section

- [x] **Minimal refactor gate** — no refactor; one-line rewrites at the sibling description sites only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose; `tools/drift-checks.sh` covers budgets/citations

**Implementation Notes:**

- `SPEC/tasknote-selection.md`: the micro "use" bullet routes on known scope plus no design question, with a small multi-file change named and micro called the default tier for known work. The "skip" block now lists unknown scope or a tradeoff, `--loop`/`--debug` (micro refuses both), and downstream-useful 4-phase state; "You're unsure — default to `/ft-task`" is dropped. The closing doubt-default flips to start micro when unsure (Re-scope promotes in place), while unknown scope still starts full.
- `step-0-flags.md`, `docs/GLOSSARY.md`, `templates/tasknote-README.md`: the "too small for the ceremony" framing is replaced with known scope and no design question. The README's "threshold at" became "routing at".
- `SPEC/post-closure.md` step 3: "`--micro` for micros" now cites the routing rule, so the copy-paste line applies the default (9,651 → 9,737 B, budget 10,000).
- Explicit-opt-in sites unchanged, per the operator's routing-default choice.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (markdown-only diff; no viz/updater code touched)

- [x] Ran lint/type-check on changed code — N/A: no code changed

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 tasknote-selection routing grep (`grep -q "small multi-file change" … && ! grep -qE "single-file or near it|…"`) → 0
- A2 `! git grep -n -E "too small for (four|the full)|below full 4-phase|single-file or near it|or you are unsure" -- SPEC claude docs templates` → 0 (widened pattern; the first pass with the narrow pattern also → 0 but missed CAPABILITIES)
- A3 `grep -q "tasknote-selection.md" SPEC/post-closure.md` → 0
- A4 explicit-opt-in greps (`SPEC/procedures/ft-task.md`, `step-0-flags.md`) → 0
- A5 `bash tools/drift-checks.sh` → 0 (context_budget, pair_q, final_newline … all ok)
- Second pass, after the External review fixes: A1–A5 → 0 again.
- External review (`/code-review medium`, working-tree diff), 7 findings:
  - **blocker** — `claude/CAPABILITIES.md:36` `--micro` row still stated the old rule (single-file, unsure → full). Fixed; it now carries the new rule with a pointer. Back to Phase 2, and Phase 3 re-ran.
  - **note** — Re-scope fires only in Phase 1. Fixed: the wording now says "Discovery's `Re-scope` verdict". Growth found mid-Phase 2 was outside micro's promotion path before this task too.
  - **note** — under `--unattended` a doubtful micro run that Re-scopes parks as `drift`, which costs more than the old unsure→full default. Left as-is: the PLAN line accepts this ("Re-scope still promotes").
  - **note** — the doubt line sat after the debug blocks. Fixed: moved under the skip-micro block.
  - **note** — the "4-phase log would carry useful state downstream" skip bullet overlapped the new single axis. Fixed: dropped. The PLAN line's full-stay list is exhaustive.
  - **note** — `step-0-flags.md` was ambiguous between routing default and auto-select. Fixed: a clause now says the runner never picks micro on its own.
  - **note** — `SPEC/procedures/ft-task.md:52` had no pointer for non-Claude agents. Fixed: the routing-default clause now cites `SPEC/tasknote-selection.md`.
- A6 judgment: the micro and full blocks now split on one axis (known scope + no design question vs unknown scope / tradeoff / `--loop` / `--debug`). That removes the file-count overlap [[CORE-724.7]] left open, and the doubt-default no longer contradicts the new default.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `claude/CAPABILITIES.md`: updated (`--micro` row's when-to-use cell). `SPEC.md`, `AGENTS.md`, `README.md`, `claude/AGENTS-snippet.md`, `codex/`/`cursor/`/`grok/` snippets: no change (flag listed without a sizing rule). `docs/MIGRATION.md`: no change (the v7.0.0 retirement row is historical). `docs/AGENT-NEUTRALITY.md`: no change (the `--micro` ledger row already names `SPEC/procedures/ft-task.md` and the tasknote-selection site). The rest of the list: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: no always-loaded change needed. Acceptance greps for stale wording should target the old rule's phrasing, not just its framing; the original A2 pattern missed the CAPABILITIES restatement.

**Final Summary:**

Micro is now the routing default for known work with no design question, including a small multi-file change. When it is unclear whether known work fits, start micro; Discovery's Re-scope promotes it. Unknown scope, a tradeoff, `--loop`, and `--debug` stay on the full tasknote. `--micro` stays an explicit flag, and the runner never auto-selects it.

- Changed: `SPEC/tasknote-selection.md` (routing + doubt-default), `SPEC/post-closure.md` (copy-paste pointer, 9,737 B / 10,000), `SPEC/procedures/ft-task.md` (agent-neutral pointer), `claude/CAPABILITIES.md`, `claude/skills/ft-task/step-0-flags.md`, `docs/GLOSSARY.md`, `templates/tasknote-README.md`.
- Verification: A1–A5 → 0 on both passes; `tools/drift-checks.sh` all ok (context_budget included).
- Refactors: none. Doc verdict: CAPABILITIES updated, rest of the sweep unchanged.
- `touches:` reconciliation: declared 7 = `git diff --name-only` 7 (CAPABILITIES and procedures added after the External review; no undeclared paths).
- Maintainability: removes the file-count micro/full overlap [[CORE-724.7]] left open; one axis now routes the tier.

**Archived:** 2026-10-22
