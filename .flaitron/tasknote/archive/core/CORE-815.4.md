---
title: moderate-tier-sweep
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-EPIC-815, CORE-815.2, CORE-815.3, CORE-815.N]
touches:
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-open-epic/SKILL.md
  - claude/skills/ft-file-task/SKILL.md
  - claude/skills/ft-file-task/park-mode.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-seed-unattended/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/CAPABILITIES.md
  - docs/PLATFORMS.md
  - docs/AGENT-NEUTRALITY.md
  - docs/GLOSSARY.md
  - docs/DOGFOOD.md
  - docs/AGENT-COMPAT.md
  - templates/PLAN.md
  - .flaitron/PLAN.md
blocked-by:
  - CORE-815.3
---

# CORE-815.4 | moderate-tier-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-815]]

## 🎯 Goal

Rename every remaining live tier-meaning `medium` to `moderate` across skills, docs, CAPABILITIES, the PLAN template and flaitron's open PLAN rows. Vendor effort `medium`, `## Medium` priority, VERSION-HISTORY, archives and dated records stay as they are.

## ✅ Acceptance

- [x] No live tier-meaning `[medium]` / `MEDIUM` label / `medium-tier` / `medium-band` remains in `claude/`, `docs/` (minus VERSION-HISTORY, CODEX-VERIFICATION), `templates/`. Alias mentions and provenance notes are allowed — `grep -rnE '\[medium\]|MEDIUM|medium-(tier|band)|medium (tier|rung|band)|held at medium|medium suits' claude docs templates | grep -vE 'VERSION-HISTORY|CODEX-VERIFICATION|legacy \`\[medium\]\`|then \`\[medium\]\`|CORE-815|CORE-259\]\] \(added the \`\[medium\]\`'` prints nothing
- [x] PLATFORMS roster band cells and Tier column say `moderate`, and its effort cells keep `medium` — `judgment`: a grep can't tell the two axes apart in one table row; read the table
- [x] flaitron's open PLAN rows carry `[moderate]` — `grep -nE '^ *- \[ \] .*\*\* \[medium\]' .flaitron/PLAN.md` prints nothing
- [x] Context budgets and drift checks still pass — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Skills: preamble, step-1.5-model-edge, ft-open-epic, ft-file-task (+ park-mode), ft-refactor, ft-audit-repo, ft-seed-unattended, ft-release
- [x] CAPABILITIES.md lines 40, 62
- [x] docs: PLATFORMS (map Tier column, band prose, roster band cells, line 500, platform rows 522/578), AGENT-NEUTRALITY, GLOSSARY, DOGFOOD, AGENT-COMPAT
- [x] templates/PLAN.md lines 17, 41
- [x] `.flaitron/PLAN.md`: `[medium]` → `[moderate]` on open rows CORE-EPIC-815, CORE-815.4, CORE-815.N
- [x] Phase 3: acceptance greps + drift checks

## 🔗 Related

- [[CORE-EPIC-815]] — parent epic
- [[CORE-815.2]] — contract rename + alias rule (predecessor)
- [[CORE-815.3]] — viz rename (predecessor)
- [[CORE-815.N]] — audit; runs the residual-`[medium]` grep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` renamed the contract and `.3` the viz; the skills, docs and template still teach `[medium]`, so writers following them would keep emitting the legacy token.

- [x] Read relevant source files — every hit of `medium|MEDIUM` across `claude/ docs/ templates/ codex/ cursor/ grok/ README.md`, read in context

- [x] **Best Practices Review** — N/A: prose rename, no module boundaries

- [x] **Archive skim** — CORE-815.1 (scope + keep list), CORE-815.2 (alias rule, `MODERATE` label with no gloss, writers emit `[moderate]`), CORE-815.3 (viz done). See Discovery Notes

- [x] **Drift check** — hit list matches .1's inventory; `codex/`, `cursor/`, `grok/` and `README.md` have no tier hits (README's `/code-review medium` is effort); no drift

- [x] Asked clarifying questions — one, via AskUserQuestion (see Discovery Notes)

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

*Keep (not tier):* `--med`/`--medium` park-mode priority flag and `Medium` priority prose; effort `medium` (CAPABILITIES 31/44, PLATFORMS `@ medium` cells, effort-ladder columns, 447 "Cells name only `medium`…", 519/542); `/code-review medium` (README, subagent-probe-template, micro-mode, ft-task SKILL); ft-audit `Medium` severity; VERSION-HISTORY; closed PLAN rows (the alias keeps them valid; history).

*Resolved:*

| Question | Resolution |
|---|---|
| `docs/CODEX-VERIFICATION.md` 559/565/750 | **Keep as history.** The doc is a dated v5.33.0 receipt whose names, reproduce steps included, stay as pinned (it still says `.flowtron`); the alias keeps the rows valid. A de-scope of one file named on the PLAN line, confirmed by the operator. |

*Assumptions:*

- "mid-tier models like Grok/Sonnet" stays; only the token after it changes. "mid-tier" is general English and does not use the tier name.
- DOGFOOD `🧩 MEDIUM (moderate)` → `🧩 MODERATE`, the same as `.2`'s cue-vocabulary row, which dropped the gloss once it matched the label.
- PLATFORMS historical sentences ("[[CORE-814]] moved Claude `[medium]`…") rename too. They describe a tier, and the tier now has the new name.
- ft-release's "matches every prior release entry" stays true at tier level (older entries are legacy `[medium]`, which is the same tier). Only the token changes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — same line-addressed token rename `.2` did on the SPEC files. No new shape

- [x] **Minimal refactor gate** — no refactor; only token and band-word renames

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose only. Viz already pins the alias (`.3`)

**Implementation Notes:**

- `[medium]` → `[moderate]` in 10 skill files (ft-audit included, which the PLAN line didn't name under claude/skills), CAPABILITIES, PLATFORMS, AGENT-NEUTRALITY, GLOSSARY and templates/PLAN.md.
- Band words: step-1.5 "moderate-tier like grok"; PLATFORMS roster "Band at default effort" cells (sonnet, gpt-5 Sol, codex, grok, gemini-flash) plus every "≈ … medium-band" equivalence, the map's gap sentence and the "row stays `moderate`" line; AGENT-NEUTRALITY "calibrate moderate-tier" and "Sonnet 5 held at moderate".
- Labels: DOGFOOD `🧩 MODERATE`, AGENT-COMPAT ASCII label list `MODERATE`.
- `.flaitron/PLAN.md`: CORE-EPIC-815, CORE-815.4 and CORE-815.N → `[moderate]`. Closed rows keep `[medium]` (alias).
- Kept: every effort cell (`@ medium`, the effort-ladder columns, "Cells name only `medium`…", "limited to medium/high/xhigh"), `--medium` priority flag, CODEX-VERIFICATION (operator call).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → 616/616 (the parser reads PLAN-shaped markdown)

- [x] Ran lint/type-check on changed code — N/A: markdown only. Drift checks cover final newlines and budgets

- [x] **Verification receipt** — see Testing Notes. No duplication or dead prose added

- [x] **External review** — `/code-review medium` over the working-tree diff; 7 findings, recorded below

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -rnE '\[medium\]|MEDIUM|medium-(tier|band)' claude docs templates | grep -vE 'VERSION-HISTORY|CODEX-VERIFICATION'` → 1 (no matches). A wider form (`medium (tier|rung|band)`, `held at medium`, plus codex/cursor/grok/README/AGENTS/CONTRIBUTING/SPEC/procedures) → 1
- `grep -nE '^ *- \[ \] .*\*\* \[medium\]' .flaitron/PLAN.md` → 1 (no open legacy rows)
- `bash tools/drift-checks.sh` → 0
- PLATFORMS table read by eye in the word-diff: Tier column and band cells say `moderate`, and every `low`/`medium`/`high` effort cell is unchanged

*External review (`/code-review medium`, 7 findings):*

1. **Blocker, fixed.** `preamble.md:15` capture list dropped the `[medium]` alias → `[moderate]` (legacy `[medium]`).
2. **Blocker, fixed.** `step-1.5-model-edge.md:9` category list, same fix (matches `SPEC/model.md:55`).
3. **Note, fixed.** AGENT-NEUTRALITY provenance rewrote what CORE-259 and CORE-373 shipped → restored their `[medium]` wording and added a `[[CORE-815]]` rename credit. The CORE-814 mentions in AGENT-NEUTRALITY and PLATFORMS now read "`[moderate]` (then `[medium]`)".
4. **Note, fixed.** CAPABILITIES:31 "medium suits moderate…" → "moderate suits multi-step…".
5. **Note, fixed.** The `.N` row now excludes provenance notes and the dated CODEX-VERIFICATION receipt (54w, under the 70w cap). The `.4` row becomes a stub at closure.
6. **Note, fixed.** ft-release "(matches every prior release entry)" → "(the tier of every prior release entry, filed before [[CORE-815]] as legacy `[medium]`)".
7. **Note, no change.** DOGFOOD `🧩 MODERATE` follows the canonical `SPEC/cue-vocabulary.md:252` row, which has no gloss.

Phase 3 re-run after the fixes: acceptance grep → no matches; PLAN grep → no matches; `bash tools/drift-checks.sh` → 0; `npm --prefix viz test` → 616/616.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated this task: docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md. No change: README.md, AGENTS.md, SPEC.md (`.2`), docs/MIGRATION.md, the claude/codex/cursor/grok snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md (no tier hits)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Skills, docs, CAPABILITIES and the PLAN template now teach `[moderate]`, and the gate's own lists name `[medium]` as a legacy alias. PLATFORMS bands say `moderate` and its effort cells still say `medium`. The dated provenance and the CODEX-VERIFICATION receipt keep `[medium]`. flaitron's open rows are `[moderate]`, and `.N`'s grep excludes the receipt and provenance notes. `touches:` reconciliation: every changed path is declared except `claude/skills/ft-audit/SKILL.md`, a `[medium]` hit the PLAN line didn't name. Verification: acceptance greps clean, drift checks 0, viz 616/616. Maintainability: one vocabulary per axis in every writer-facing doc.

**Archived:** 2026-10-20
