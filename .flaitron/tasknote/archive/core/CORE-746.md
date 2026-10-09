---
title: frontier-sweep-gaps
status: completed
tags: [model, frontier, docs]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-741.N]
touches:
  - SPEC/task-line-segments.md
  - SPEC/model.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-task/preamble.md
---

# CORE-746 | frontier-sweep-gaps

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Close the four sites CORE-741's `[frontier]💎` sweep missed so the `[model]` ladder reads the same everywhere: `SPEC/task-line-segments.md`, `SPEC/model.md`'s loader header, `/ft-file-followup` Step 2 item 3, and `ft-task/preamble.md:15`.

## ✅ Acceptance

- [x] `[model]` row in `SPEC/task-line-segments.md` names `[frontier]` and `[xheavy]`, drops the retired `other`-bucket clause — `grep -q 'frontier' SPEC/task-line-segments.md` and `! grep -q 'as `other`' SPEC/task-line-segments.md`
- [x] `SPEC/task-line-segments.md` header's citer list matches the files that actually cite it — `judgment` (a path list has no single command; checked against the Discovery grep)
- [x] `SPEC/model.md` loader header names the filing/choosing skills that consult it — `judgment` + the Discovery grep of `SPEC/model.md` citers
- [x] `/ft-file-followup` Step 2 item 3 carries the never-`[xheavy]` clause — `grep -n 'xheavy' claude/skills/ft-file-followup/SKILL.md`
- [x] `ft-task/preamble.md` `[model]` capture bullet names all five rungs — `grep -n 'xheavy' claude/skills/ft-task/preamble.md`
- [x] Budgets and drift checks stay green — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Grep the real citers of `SPEC/task-line-segments.md` and `SPEC/model.md`
- [x] Edit the `[model]` row + header citer list in `SPEC/task-line-segments.md`
- [x] Edit the loader header in `SPEC/model.md`
- [x] Add the never-`[xheavy]` clause to `/ft-file-followup` Step 2 item 3
- [x] Update `preamble.md:15`
- [x] Run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers) whose sweep missed these sites
- [[CORE-741.N]] — the audit whose cohort this follows

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `[light]🔧 [unattended]`, `## High`; `--fast` implied by the row marker.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four gaps still reproduce at HEAD (`a249755b`): the `[model]` row lists only heavy/medium/light and says tooling buckets unknown tokens as `other`; `viz/src/ui/ModelChip.tsx` and `SPEC/plan-parser.md` accept any short lowercase token, so the `other` clause is stale.

- [x] Read relevant source files — `SPEC/task-line-segments.md` (header + row 12), `SPEC/model.md` (header, ladder, chooser caps), `claude/skills/ft-file-followup/SKILL.md` Step 2, `claude/skills/ft-task/preamble.md:15`, `SPEC.md` §"Model field", `docs/GLOSSARY.md` `[model]` entry (already carries the five-rung wording to mirror).

- [x] **Best Practices Review** — N/A (prose-only edits; no code or module boundary).

- [x] **Archive skim** — `archive/core/` grepped for the four paths: CORE-741.1–.5 and .N cover the sweep that missed these sites; no prior decision on the four sites themselves.

- [x] **Drift check** — PLAN line matches HEAD for all four sites. Two details the PLAN line left implicit: (a) `task-line-segments.md` header names six filing skills as citers (`/ft-file-followup`, `/ft-epic-discovery`, `/ft-seed`, `/ft-refactor`, `/ft-audit`, `/ft-audit-repo`), but by path only `/ft-file-followup`, `/ft-epic-discovery`, `/ft-seed` cite it among skills, plus the runners' shared `preamble.md` (for the legacy `## Critical` soft-migration). (b) `SPEC/model.md` header says only the runners' gate loads it; `/ft-file-followup` and `/ft-epic-discovery` also point at its §"Model field" when choosing a token, and `/ft-audit` / `/ft-audit-repo` / `/ft-refactor` cite its tier rules.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--fast). Assumptions: the "wrong citer list" is the `task-line-segments.md` header's skill list; the "loader header" gap is `SPEC/model.md` naming only the runners as consumers; edits mirror the existing `docs/GLOSSARY.md` and `SPEC.md` §"Model field" wording rather than inventing new phrasing.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape (mirrored `docs/GLOSSARY.md` / `SPEC.md` §"Model field" wording; header form follows `SPEC/gate-postures.md`'s "consulted by" idiom)

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup (none needed)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only; `tools/drift-checks.sh` is the guard

**Implementation Notes:** Five single-line substitutions across four files (`git diff --stat`: 5 insertions, 5 deletions). `task-line-segments.md` `[model]` row now names `[frontier]` / `[xheavy]` and says the parser accepts any short lowercase token (replacing the retired `other`-bucket clause); its header citer list is now `/ft-file-followup`, `/ft-epic-discovery`, `/ft-seed`, and the runners' shared `preamble.md`. `SPEC/model.md` header gains a "consulted, not force-Read" sentence for the five skills that cite it. `/ft-file-followup` Step 2 item 3 gains the trigger-only `[frontier]` / never-`[xheavy]` clause. `preamble.md:15` lists the five rungs.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — prose-only; the drift suite is the targeted check (below)

- [x] Ran lint/type-check on changed code — N/A, markdown only; `drift-checks.sh` covers final newlines and context budgets

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q 'frontier' SPEC/task-line-segments.md && ! grep -q 'as `other`' SPEC/task-line-segments.md` → 0
- `grep -c 'xheavy' claude/skills/ft-file-followup/SKILL.md` → 1; `grep -c 'xheavy' claude/skills/ft-task/preamble.md` → 2 (one pre-existing)
- `bash tools/drift-checks.sh` → 0 (every check `ok`; budgets: `task-line-segments.md` 5,890 / 10,000, `preamble.md` 8,215 / 9,000, `ft-file-followup/SKILL.md` 24,971 / 33,000)
- Citer-list and loader-header criteria are `judgment`, decided against the Discovery greps.
- Post-fix `bash tools/drift-checks.sh` → 0 (`task-line-segments.md` 5,976 / 10,000).
- **External review** (`/code-review medium`, working-tree diff): no blockers; five findings, all notes:
  1. `ft-epic-discovery` Step 4 Model item has the same missing clause → **filed** as [[CORE-766]] (SKILL.md is 32,663 / 33,000 bytes; a fifth site, outside this task's four).
  2. `SPEC/model.md` header overstates `/ft-refactor` → no change: it does cite `SPEC/model.md` for token choice, and the header says "consulted", not that it applies every rung.
  3. `task-line-segments.md` header called `preamble.md` a per-segment-facts citer that carries a row shape → **fixed**: reworded to say it cites one fact (legacy `## Critical` soft-migration) and needs no load.
  4. Replaced `other` clause leaves downstream handling unstated → no change: `viz/src/ui/ModelChip.tsx` returns no chip for unrecognized tokens, and the parser accepts any short lowercase token, which the row now says.
  5. Tasknote boxes unticked → stale read; the review ran while this note was being updated.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change. `SPEC.md` §"Model field", `docs/GLOSSARY.md` `[model]`, `docs/PLATFORMS.md`, and `claude/AGENTS-snippet.md` already carry the five-rung ladder this task aligned the four sites to; no other swept doc names the retired `other` bucket.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-08.` stub at top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A

**Final Summary:** Closed the four `[frontier]💎` sweep gaps CORE-741 missed so the `[model]` ladder reads the same at every site. `SPEC/task-line-segments.md` `[model]` row now names `[frontier]` / `[xheavy]` and drops the retired `other`-bucket clause, and its header citer list is corrected; `SPEC/model.md`'s header names the skills that consult it; `/ft-file-followup` Step 2 item 3 carries the trigger-only `[frontier]` / never-`[xheavy]` clause; `ft-task/preamble.md:15` lists all five rungs. Verification: Acceptance greps → 0, `bash tools/drift-checks.sh` → 0. External review: no blockers; one note fixed (preamble citer wording), one filed as [[CORE-766]] (`/ft-epic-discovery` has the same gap), three needed no change. `touches:` reconciliation: `git diff --name-only` = the four declared files, exactly. Doc-drift: no change.

**Archived:** 2026-10-08
