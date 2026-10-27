---
title: open-epic-model-seam
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-836, CORE-769.1, CORE-766]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-open-epic/SKILL.md
  - claude/skills/ft-open-epic/step-4.5-model-gate.md
  - codex/skills/ft-open-epic/SKILL.md
  - SPEC/epic.md
  - claude/CAPABILITIES.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-837 | open-epic-model-seam

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-836]]

## 🎯 Goal

Gate `/ft-open-epic`'s `.1` Discovery on the `.1` row's `[model]` after the filing commit, with an under-tier STOP-with-choice and a `/ft-open-epic <AREA>-<N>.1 [--deep]` resume entry, as designed in CORE-836.

## ✅ Acceptance

- [x] New lazy fragment `claude/skills/ft-open-epic/step-4.5-model-gate.md` carries the gate verdicts (under-tier STOP-with-choice, tag kept on proceed; concrete mismatch via `ft-task/step-1.5-model-edge.md` §"Mismatch") and the resume entry (pre-flight, row location, input recovery, refusal of an existing note) — `test -f claude/skills/ft-open-epic/step-4.5-model-gate.md && grep -q 'Category under-tier' claude/skills/ft-open-epic/step-4.5-model-gate.md && grep -q 'Resume' claude/skills/ft-open-epic/step-4.5-model-gate.md`
- [x] `SKILL.md` gains the Step 1.5 positional branch, a Step 4.5 heading (Satisfied proceeds; otherwise Read the fragment), the SKILL_DIR roster entry, `argument-hint`/`description:` resume form, and Step 4's `.1` row writes the concrete child range — `grep -c 'step-4.5-model-gate.md' claude/skills/ft-open-epic/SKILL.md` ≥ 3 and `grep -q '^## Step 4.5' claude/skills/ft-open-epic/SKILL.md`
- [x] Notes §"One-motion contract" no longer claims there is no seam — `! grep -q 'No seam where the user' claude/skills/ft-open-epic/SKILL.md`
- [x] `SKILL.md` stays under its 33,000 B cap and all drift checks pass — `bash tools/drift-checks.sh` → 0
- [x] Mirrors updated: Codex wrapper description, `SPEC/epic.md` lifecycle step 2, `claude/CAPABILITIES.md` `--deep` row, `docs/PLATFORMS.md` lazy-fragment list, `docs/GLOSSARY.md` epic Discovery entry — `grep -q '\.1' codex/skills/ft-open-epic/SKILL.md && grep -q 'ft-open-epic <AREA>-<N>.1' SPEC/epic.md && grep -q 'step-4.5-model-gate.md' docs/PLATFORMS.md && grep -q 'ft-open-epic <AREA>-<N>.1' docs/GLOSSARY.md && ! grep -q "skill's only argument" claude/CAPABILITIES.md`
- [x] Gate and resume prose read coherently against the CORE-836 design and the `/ft-task` model-gate machinery they reuse — `judgment`: skill prose, no executable surface

## 🧩 Subtasks

- [x] Write `claude/skills/ft-open-epic/step-4.5-model-gate.md` (gate verdicts + resume entry)
- [x] Edit `claude/skills/ft-open-epic/SKILL.md`: frontmatter, intro, SKILL_DIR roster, Step 1.5 branch + usage notice, Step 4 `.1` concrete range, Step 4.5 heading, Notes trims (One-motion contract rewrite, collapse the three "Compare with" bullets)
- [x] Mirrors: Codex wrapper, `SPEC/epic.md` step 2, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, `docs/GLOSSARY.md`
- [x] Phase 3: byte count, `bash tools/drift-checks.sh`, `node --test tools/drift-checks.test.mjs`, external review
- [x] Phase 4: doc-drift sweep, flip CORE-837 to stub, archive

## 🔗 Related

- [[CORE-836]] — the design this implements (Implementation Notes)
- [[CORE-769.1]] — the open/close skill pair names this keeps
- [[CORE-766]] — the `[frontier]` chooser clause that makes the `.1` tag outrank the filing session

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** HEAD still has the gap CORE-836 found. `/ft-open-epic` Step 2 item 4 files a `[heavy]`/`[frontier]` epic's `.1` as `[frontier]`, and Steps 5–10 then drive it with no model check in between. The design is settled and every point it left open is decided.

- [x] Read relevant source files — `claude/skills/ft-open-epic/SKILL.md` (whole), `step-5.5-deep-prepass.md`, `claude/skills/ft-task/step-1.5-model-edge.md`, `claude/skills/ft-task/preamble.md` §"Model gate", `SPEC/epic.md` lifecycle, `codex/skills/ft-open-epic/SKILL.md`, `tools/drift-checks.sh` Pairs J / M + frontmatter YAML check + context_budget.

- [x] **Best Practices Review** — boundary work across skills. Gate and resume go in one lazy fragment owned by `ft-open-epic`. The concrete-mismatch branch reuses `ft-task/step-1.5-model-edge.md` §"Mismatch" by reference with its `<SKILL>` placeholder, the same way `/ft-close-epic` loads `ft-task/unattended-mode.md`. The category under-tier branch is new prose because it is stronger than `/ft-task`'s advisory. Nothing is duplicated.

- [x] **Archive skim** — `archive/core/` (README row confirmed). CORE-836 (the design) already skimmed the 25 `ft-open-epic` hits and logged what matters: CORE-769.1 (names, rename cost), CORE-766 (frontier chooser clause), and CORE-741.2 (the `[frontier]` rung). Also re-read: CORE-744 (`argument-hint: [--deep]` parsed as a YAML list, so the hint must be single-quoted, which the drift `skill_frontmatter_yaml` check enforces) and Pair J's history (the hint must name every flag documented in `/ft-open-epic` spans).

- [x] **Drift check** — CORE-836's citations hold at HEAD. `SKILL.md` is 32,906 B against a 33,000 cap. The Step 4 `.1` row template literally reads `file children .2..(M+1)`. Notes §"One-motion contract" still says "No seam…". `SPEC/epic.md` lifecycle step 2 is at lines 37–39. `claude/CAPABILITIES.md:39` says "the skill's only argument". `docs/PLATFORMS.md:309` lists `ft-open-epic/step-5.5-deep-prepass.md`. `SPEC/procedures/` has only `ft-task.md`. Pairs J/M extract only `--flags`, so a positional `<AREA>-<N>.1` in the hint is invisible to them and the hint stays `'[<AREA>-<N>.1] [--deep]'` (single-quoted for YAML). The PLAN line matches the design. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) the CORE-836 design is implemented as written, with no reopened decisions. (2) `docs/CONTEXT-BUDGET.md` §"Skill bodies" is not re-measured here; its ledger is refreshed at `/ft-release`. (3) `/ft-task <ID>.1` stays unchanged, with no redirect (CORE-836 point 5). (4) Under resume, Step 6's Relevance rationale comes from the parent row and the operator, since there's no Step 1 conversation, and Step 10's commit message uses the plain `.1` form because the filing was already committed.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- The CORE-836 design (archived note, §"Implementation Notes") is the spec, and nothing in it is reopened here.
- The positional resume token is invisible to the drift Pairs J/M (they extract `--flags` only), and `skill_frontmatter_yaml` requires the hint to be single-quoted since it opens with `[`.
- Budget: SKILL.md has 94 B of headroom. The edits must come out net-negative or near zero, paid for by the two Notes trims the design names.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (skill prose; the drift checks are the test surface and run in Phase 3)

**Implementation Notes:**

- **Pattern survey.** Extends three existing shapes. `step-5.5-deep-prepass.md` set the lazy-fragment and naming precedent. `ft-task/step-1.5-model-edge.md` §"Mismatch" is reused unchanged for the concrete branch, with `<SKILL>` substituted, the same way `/ft-close-epic` loads `ft-task/unattended-mode.md`. The verdict vocabulary comes from `SPEC/model.md` §"Category-vs-concrete matching". The only new shape is the category under-tier STOP, and the CORE-836 design gives the reason for it.
- **Fragment** `claude/skills/ft-open-epic/step-4.5-model-gate.md` (new, unbudgeted lazy fragment) has two parts. §"Step 4.5 — Model gate" covers the Category under-tier STOP with switch-or-proceed (tag kept, plus one Discovery Notes line on proceed), Concrete mismatch (via the `/ft-task` fragment, which retags on proceed), and Legacy. §"Resume entry" covers pre-flight, row location, closed and archive refusals, existing-note refusal, input recovery (M from the concrete range, asked when absent), and the Step 6 / Step 10 readings.
- **One addition beyond the CORE-836 design:** a §"Legacy" branch. The design said Legacy "cannot occur" because Step 4 always writes a token. But the resume admits hand-filed `.1` rows, which may lack one, so the branch defers to `/ft-task`'s §"Legacy entry" and re-runs the gate.
- **Pair O wording.** The first draft wrote the literal `auto-commit = false` in the fragment, and Pair O treats any file carrying that literal as a filing runner. The fragment now says "left the filing uncommitted", since it reads the state rather than running the motion.
- **`SKILL.md`**: changed the frontmatter `description:` and `argument-hint: '[<AREA>-<N>.1] [--deep]'`, the intro, the SKILL_DIR roster, Step 1's scope check (skipped on a resume), Step 1.5 (a positional branch and a new usage notice), the Step 4 `.1` row (`.2..<M+1>` written as a number), and added a new Step 4.5 heading. To pay for these, Notes §"One-motion contract" was rewritten (its "No seam" claim is now false) and the three "Compare with" bullets were collapsed into one §"Siblings" bullet. 32,906 → 32,951 B (cap 33,000).
- **Mirrors:** Codex wrapper `description:`, `SPEC/epic.md` lifecycle step 2, the `claude/CAPABILITIES.md` `--deep` row ("only argument" → "only flag"), the `docs/PLATFORMS.md` lazy-fragment list, and the `docs/GLOSSARY.md` epic Discovery entry. No mirror needed for `SPEC/procedures/` (no `ft-open-epic` SOP) or for `pair_s` rosters (no new slug or `/ft-task` flag).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` (the drift checks' self-test; no other suite covers skill prose)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh`

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A (no rendered surface) — Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → exit 1 on first run: `NO POST-STAGE DIFF claude/skills/ft-open-epic/step-4.5-model-gate.md` / `NO RESOLVING CITATION` (pair_o). The fragment named the `auto-commit = false` literal, so it was reworded (Implementation Notes). Re-run → exit 0, all checks ok. After the review fixes → exit 0.
- `node --test tools/drift-checks.test.mjs` → exit 0 (21 pass, 0 fail).
- Acceptance 1 (fragment greps) → exit 0. Acceptance 2: `grep -c 'step-4.5-model-gate.md' SKILL.md` → 3, `^## Step 4.5` present. Acceptance 3 (`! grep -q 'No seam where the user'`) → exit 0. Acceptance 5 (mirror greps) → exit 0.
- Budget: `wc -c claude/skills/ft-open-epic/SKILL.md` → 32,967 (cap 33,000; `context_budget` ok).
- Structural: no duplication (the concrete branch defers to `ft-task/step-1.5-model-edge.md` instead of restating it), no dead text (the three "Compare with" bullets were collapsed rather than left beside the new §"Siblings"), and no stale docs (the "No seam" Notes claim was rewritten; mirrors updated).
- **External review** (`/code-review medium`, scoped to the working-tree diff; graded against CORE-836 §Implementation Notes and this note's Acceptance). 8 findings:
  1. **blocker** — On a `--deep` run, the concrete-mismatch re-entry substituted `<SKILL>` = `/ft-open-epic --deep`, which prints flag-first, and Step 1.5 resumes only when the ID leads, so the re-entry would have filed a duplicate epic. Fixed: the fragment now prints the re-entry ID-first with ` --deep` appended. Phase 3 re-run.
  2. **blocker** — The resume bullet said "composes with `--deep`" but neither set `deep-mode` nor loaded the deep fragment. Fixed: in SKILL.md, a trailing `--deep` also takes its own bullet; the fragment sets `deep-mode = false` without it.
  3. **blocker** — Resume step 2 checked `archive/<area>/` before step 4 resolved `<area>`. Fixed: Area is resolved in step 1 (README lookup; no row → stop).
  4. **blocker** — A closed `.1` got "stop and ask", not `/ft-task`'s non-negotiable status gate. Fixed: "**Stop. Do not scaffold** … No reply re-opens this ID."
  5. **note** — The body's Satisfied verdict lacked `/ft-task`'s "verified tier, not an impression" guard. Fixed: the guard was added inline in Step 4.5.
  6. **note** — Step 1 runs before Step 1.5, so "Skipped on a resume (Step 1.5)" pointed forward, and "replaces Steps 1–4" contradicted the pre-flight. Fixed: SKILL.md now reads "Skipped when `$ARGUMENTS` names a `.1`", and the fragment says "replaces Steps 2–4 and Step 1's scope check".
  7. **note** — The concrete `.2..<M+1>` range goes stale when M shifts. No change: the resume refuses once a `.1` note exists, and closure replaces the `.1` row's description with the stub, so a shifted M is never read from the row.
  8. **note** — Step 4.5's body summary named only the under-tier STOP. Fixed: it now says "for every other verdict" (the routing was already correct: "Otherwise Read").

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`/ft-open-epic` now gates its `.1` Discovery on the `.1` row's `[model]` after the filing commit. Under-tier stops with a switch-or-proceed choice (the tag is kept on proceed), and `/ft-open-epic <AREA>-<N>.1 [--deep]` resumes a filed, unstarted `.1` from its rows. Gate and resume live in a new lazy fragment, and SKILL.md stays under its cap.

- **Doc-drift sweep** (`.flaitron/tasknote/README.md` §"AI-referenced docs"): `claude/CAPABILITIES.md`, `docs/GLOSSARY.md`, `docs/PLATFORMS.md` and `SPEC/epic.md` were updated in this task (Mirrors). Every other entry has **no change**, including `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` and `docs/CONTEXT-BUDGET.md`. A grep for `/ft-open-epic` argument forms found no other hit, and the budget ledger is re-measured at `/ft-release`.
- **Changed files:** `claude/skills/ft-open-epic/SKILL.md`, `claude/skills/ft-open-epic/step-4.5-model-gate.md` (new), `codex/skills/ft-open-epic/SKILL.md`, `SPEC/epic.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, `docs/GLOSSARY.md`, `.flaitron/PLAN.md` (stub flip), this tasknote.
- **Verification:** drift checks → 0, their self-test → 21/21, all Acceptance greps → 0. The external review found 4 blockers and 4 notes. All 4 blockers and 3 of the notes were fixed; 1 note needed no change (reason in Testing Notes).
- **Refactors:** the SKILL.md Notes trims only (the One-motion contract rewrite and the collapsed sibling bullets), both needed for budget and for accuracy.
- **`touches:` reconciliation:** `git diff --name-only` matches the declared set exactly, plus this tasknote (workflow file, always implied).
- **Maintainability effect:** SKILL.md is 32,906 → 32,967 B (33 B headroom). The next substantial edit to it must extract another fragment, as `docs/CONTEXT-BUDGET.md` anticipates.

**Archived:** 2026-10-26
