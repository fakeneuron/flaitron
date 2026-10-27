---
title: epic-filing-entry
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-769.1, CORE-766, CORE-741.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-836 | epic-filing-entry

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-769.1]]

## 🎯 Goal

Settle how `/ft-open-epic` hands its `[frontier]` `.1` Discovery to the right model, and file the implementation row that lands the design.

## ✅ Acceptance

- [x] Design for the file→drive model seam written up in Implementation Notes: gate placement, STOP branches, resume entry, `--deep` interaction, mirrors, budget plan — `judgment`: a design call, no command decides it
- [x] One implementation row filed in `.flaitron/PLAN.md` (≤70w, `[model]` per `SPEC/model.md`) — `grep -cE '^- \[ \] \*\*CORE-[0-9]+\*\* .*\| open-epic-model-seam' .flaitron/PLAN.md` → 1
- [x] Drift checks stay green — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Phase 2 (on Fable): draft the seam design against the Resolved scoping table
- [x] Draft the implementation row, word-count it, run the reconciliation scan against CORE-835/CORE-641
- [x] File the row; record the design in Implementation Notes
- [x] Phase 3: `bash tools/drift-checks.sh`; External review `N/A` (filed row, not a diff)
- [x] Phase 4: doc-drift sweep, flip CORE-836 to stub, archive

## 🔗 Related

- [[CORE-769.1]] — settled the `ft-open-epic` / `ft-file-task` / `ft-close-epic` names; precedent cost of a rename
- [[CORE-766]] — the `[frontier]` chooser clause in `/ft-open-epic` Step 2 item 4
- [[CORE-741.2]] — origin of the `[frontier]` rung and its "Heavy-epic Discovery" trigger

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope — the work is unchanged, but the `[model]` tag goes from `[heavy]` to `[frontier]` (operator, at clarifications). The note is parked for a Fable session.
  **Rationale:** The gap is real at HEAD. `/ft-open-epic` Step 2 item 4 files a `[heavy]`/`[frontier]` epic's `.1` as `[frontier]`, and Steps 5–6 go straight into driving it. No model gate runs between the filing and the drive, so the `.1` runs on whatever model filed it.

- [x] Read relevant source files — `claude/skills/ft-open-epic/SKILL.md` (whole file), `claude/skills/ft-task/preamble.md` §"Model gate", `claude/skills/ft-task/step-1.5-model-edge.md`, `SPEC/epic.md` §"Epic lifecycle", `SPEC/model.md` §"Category-vs-concrete matching" + §"When to choose `[frontier]`", `claude/skills/ft-file-task/SKILL.md`.

- [x] **Best Practices Review** — boundary question, not code. Filing lives in `/ft-file-task` (three weights). Epic `.1` driving lives only in `/ft-open-epic` Steps 5–10. `/ft-task` can run a `.1` (`SPEC/epic.md` lifecycle step 2: "`/ft-task <ID>.1` if filed manually") but has none of `/ft-open-epic`'s `.1`-specific behaviour. A file-only path that hands off to `/ft-task` would therefore duplicate or lose Steps 5–10.

- [x] **Archive skim** — `archive/core/` (README row confirmed). 25 notes cite `ft-open-epic`. The load-bearing ones:
  - CORE-769.1 settled the current names: `ft-epic-discovery`→`ft-open-epic`, `ft-file-followup`→`ft-file-task`, as a pair with `ft-close-epic`. The rename was a hard-cut BREAKING major (v7.0.0) touching 25–50 files per slug: four snippet roster blocks, `SPEC/layout.md`, `docs/PLATFORMS.md`, `AGENTS.md`, `docs/GLOSSARY.md`, the `skill_pin_guard_parity`/`shipped_skill_parity` slug lists, and the codex wrappers. Probe B also found the tooling treats a rename as retire + add.
  - CORE-766 added the trigger-only `[frontier]` chooser clause to Step 2 item 4. It changed only how the token is picked, not whether anything gates on it.
  - CORE-741.2 is where the `[frontier]` rung and its "Heavy-epic Discovery" trigger came from.

- [x] **Drift check** — PLAN line matches HEAD. `SPEC/model.md` §"When to choose `[frontier]`" lists "Heavy-epic Discovery" as a trigger, and `/ft-open-epic` Step 2 item 4 applies it. `/ft-task`'s gate for a category tag above the active tier is the advisory "Category under-tier" branch (⚠️ note, proceed), not a STOP. So even the hand-filed `/ft-task <ID>.1` path would only warn a run that's below the tagged tier. Budget: `ft-open-epic/SKILL.md` is 32,906 of its 33,000-byte cap (`docs/CONTEXT-BUDGET.md`), so any gate text must go in a lazy fragment or be paid for with trims. Self-check: this task changes a workflow contract, which is a `[frontier]` trigger ("Contract or architecture design"), yet it was filed `[heavy]`. That's the same kind of under-tagging the task is about, so it's raised as a clarifying question.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Resolved scoping** (operator, 2026-10-26):

| Question | Answer | Consequence |
|---|---|---|
| Direction | Gate inside `/ft-open-epic` | No new slug, no rename, no `/ft-file-task --epic`; the open/close pair from CORE-769.1 stays |
| Gate strength | STOP with a choice | After the Step 4 filing commit, before the Step 5 scaffold. When `.1`'s tag outranks the active model: stop (the filing is already committed; resume on the right model) or proceed here. Stronger than `/ft-task`'s advisory under-tier note |
| CORE-836 deliverable | Decision + one filed implementation row | No skill/SPEC edits in this task |
| This task's model | Retag `[frontier]`, park for Fable | Changing a workflow contract is a `[frontier]` trigger; Phase 2 design runs on Fable @ high |

**Open design points for Phase 2** (each to be decided in the implementation row or written into it):
1. **Resume entry.** The proposal is `/ft-open-epic <AREA>-<N>.1`, which accepts an already-filed `.1` and jumps to Step 5. Step 1.5 only accepts `--deep` today. Decide how the run recovers its locked inputs (area, shortname, M, epic model) from the filed parent/`.1`/`.N` rows. Decide how `--deep` combines with the resume. Decide whether an existing `.1` tasknote gets refused the way `/ft-task` refuses an in-flight one.
2. **The proceed-here branch.** Either keep `.1`'s tag (as `/ft-task`'s under-tier branch does) or retag it to the active tier (as the concrete-mismatch "retag" option does). Choose one and say why.
3. **Placement and budget.** `SKILL.md` has 94 B of headroom. Put the gate and resume entry in a lazy fragment (precedent: `step-5.5-deep-prepass.md`), and trim `SKILL.md` to pay for the pointer.
4. **Mirrors.** Update `codex/skills/ft-open-epic/`, any `SPEC/procedures/` equivalent, `SPEC/epic.md` lifecycle step 2 (the resume entry), the `argument-hint:` / `description:` frontmatter, the flag rosters checked by `pair_s`, `docs/GLOSSARY.md`, and `docs/CONTEXT-BUDGET.md`. Confirm each one with grep before writing the row.
5. **Hand-filed `.1` via `/ft-task`.** Is pointing `/ft-task <ID>.1` users at `/ft-open-epic <ID>.1` in scope? Default: no — the implementation row may cite it as a follow-up.
## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (design + one filed PLAN row; no executable surface)

**Implementation Notes:**

**Pattern survey.** Three existing shapes carry the whole design; nothing new is invented.
- The verdict table in `claude/skills/ft-task/preamble.md` §"Model gate" + `SPEC/model.md` §"Category-vs-concrete matching" (Satisfied / Category under-tier / Concrete mismatch / Legacy) is reused as-is. Only one cell changes strength here: Category under-tier becomes a STOP-with-choice instead of an advisory.
- The STOP shape is `claude/skills/ft-task/step-1.5-model-edge.md` §"Mismatch": AskUserQuestion, option 1 "switch model, re-invoke `<SKILL> <TASK-ID>`" (recommended), option 2 "proceed here". With `<SKILL>` = `/ft-open-epic` and `<TASK-ID>` = the `.1`, option 1 prints `/ft-open-epic <AREA>-<N>.1` — which is exactly the resume entry. That fragment's `<SKILL>` placeholder was designed for substitution, so it can be loaded cross-skill.
- Cross-skill fragment loading has precedent: `/ft-close-epic` loads `ft-task/unattended-mode.md` ("shared, owned by `/ft-task`"). Lazy-fragment extraction for budget has precedent: `ft-open-epic/step-5.5-deep-prepass.md`.

**Design — the `/ft-open-epic` model seam** (decision for the implementation row; each numbered point closes an open design point from Discovery):

**Gate placement — Step 4.5, after the filing commit, before the Step 5 scaffold.** Filing is cheap and model-independent and needs the scoping conversation, which lives in *this* session; the Discovery is the expensive part and needs only the filed rows. Committing the filing first (Step 4 already does) means a STOP leaves a clean tree, so the re-entry passes the foreign-dirt gate. Under `auto-commit = false` (filing left uncommitted because PLAN.md or the index already carried other changes) the STOP prints a ✋ `ACTION` to commit the filing before re-invoking; the operator decides what to do with the other changes. The gate runs identically on a fresh run and on a resume, so it is idempotent: re-entering on the wrong model again stops again.

**Verdicts.** Compare the `.1` row's `[model]` token against the active model per `SPEC/model.md` §"Category-vs-concrete matching":
- *Satisfied* (tier met or exceeded; concrete match) → proceed silently to Step 5. This is the only branch decided in the always-loaded body; the rest load the fragment.
- *Category under-tier* (e.g. `[frontier]` `.1` on Opus) → **STOP with a choice** (the one divergence from `/ft-task`, whose under-tier branch is advisory). Rationale: `/ft-task`'s tag was filed by an operator who could have chosen otherwise; here Step 2 item 4 chose `[frontier]` by rule a moment ago and the operator was never asked, and the `.1`'s output is inherited by every child — the whole reason the "Heavy-epic Discovery" trigger exists. Option 1 (recommended): stop; print `committed <sha>` (or the ✋ `ACTION` above), the pick per `SPEC/model.md` §"Effort recommendations" → "Printing a cell" from `docs/PLATFORMS.md` §"Tier × platform map" (Claude Code: `Fable @ high`; a ⚠️ cell adds the platform switch in prose), and the re-entry line `/ft-open-epic <AREA>-<N>.1` with `--deep` appended when the stopped run carried it. Writes nothing further. Option 2: proceed here on the active model. An `[xheavy]` `.1` (filed from an `[xheavy]` epic) always lands here, as it does in `/ft-task`; the operator proceeds — manual-only territory, expected not exceptional.
- *Concrete mismatch* (a concrete epic token, e.g. `[fable]`, on a different concrete active model) → load `claude/skills/ft-task/step-1.5-model-edge.md` §"Mismatch" unchanged with `<SKILL>` = `/ft-open-epic [--deep]`, `<TASK-ID>` = the `.1`. Option 2 there retags the `.1` row, as in `/ft-task`; the edit rides the Step 10 closure commit.
- *Legacy* cannot occur: Step 4 always writes a token.

**Proceed-here branch keeps the `.1` tag (category case).** `SPEC/model.md`: "the ladder labels the *task's* cognitive load, not the model's benchmark position", and `step-1.5-model-edge.md` under-tier: "do not auto-retag — the category tag stays as filed … so an under-powered run on deep-reasoning work is visible rather than silently accepted". Retagging would erase the record that the Discovery was frontier work. The `.1` tag feeds nothing downstream — children seed from the *epic* token, not `.1`'s — so the tag is history after closure, and history should be true. Visibility of the choice: the proceed branch writes one line into the `.1`'s Discovery Notes (`Ran under-tier on <active model> by operator choice at the Step 4.5 gate.`). The concrete case retags, mirroring `/ft-task`, because a concrete tag is a pin and a pin that names the wrong model is false rather than merely under-served.

**Resume entry — `/ft-open-epic <AREA>-<N>.1 [--deep]`.** Step 1.5 gains one positional form: a token matching `<AREA>-<N>.1` sets `resume-mode = true` and loads the fragment. The resume:
- *Pre-flight:* `.flaitron/PLAN.md` exists; foreign-dirt gate runs as usual; the Step 1 single-task-scope check is skipped (the rows exist).
- *Locates* the parent `**<AREA>-EPIC-<N>**` row and the nested `**<AREA>-<N>.1**` row. The `.1` row must be unchecked and the parent open; otherwise stop with the same conflict text `/ft-task` uses. `.flaitron/tasknote/<AREA>-<N>.1.md` must not exist — if it does, refuse exactly as `/ft-task` Step 1 refuses an in-flight note (`in-progress` → "continue conversationally"; `starter`/`blocked` → point at `/ft-task <ID>.1`, which owns those lifecycles). Resume only ever scaffolds; it never adopts a note.
- *Recovers the locked inputs from the rows:* Area from the ID prefix via `.flaitron/tasknote/README.md` §"Archive layout" (looked up, never derived); shortname from the parent row's `| <shortname>`; epic model from the parent row's `[model]`; audit-present from whether a `**<AREA>-<N>.N**` row exists; priority from the section heading. **M** is the one input the rows do not carry today: Step 4's `.1` template text reads `file children .2..(M+1)` literally. The implementation substitutes the concrete range at filing (`.2..4` for M=3) so the resume reads M from the `.1` row; when the row carries the literal or a hand-written description, the resume asks M in one AskUserQuestion. `related-tasks:` predecessor IDs surfaced in Step 2 are not recoverable and are dropped — `[<AREA>-EPIC-<N>]` alone; the operator can add them in the note.
- *Then* jumps to Step 4.5 (the gate, which now normally passes) → Step 5 scaffold → 5.5 (`--deep`) → 6–10 unchanged. Steps 2, 3 and 4 are skipped entirely.
- *`--deep` combines* as a trailing flag on either form; Step 1.5's existing `--deep` branch sets `deep-mode` and loads its fragment as today. `--unattended` is still refused on both forms.
- *Hand-filed `.1`.* The resume cannot tell a post-STOP state from a hand-filed epic (parent + `.1` + `.N` rows written by hand), so it admits any filed, unstarted `.1` as a consequence, not a feature. `SPEC/epic.md` lifecycle step 2 gains the entry beside `/ft-task <ID>.1`, which stays valid and unchanged (no refusal added there; follow-up only if someone wants `/ft-task` to redirect). Discovery's default "no" on point 5 is thereby kept for `/ft-task` and lifted only where it was free.

**Placement and budget.** `claude/skills/ft-open-epic/SKILL.md` is 32,906 of 33,000 B (94 B headroom). All gate and resume prose goes in one new lazy fragment, `claude/skills/ft-open-epic/step-4.5-model-gate.md` (naming precedent `step-5.5-deep-prepass.md`; unbudgeted like every lazy fragment — `docs/CONTEXT-BUDGET.md` §"Not budgeted, deliberately"). `SKILL.md` carries only: the Step 1.5 positional-arg branch (one bullet), a Step 4.5 heading with the Satisfied-proceeds / otherwise-Read-fragment rule, the SKILL_DIR roster entry, and `argument-hint: '[<AREA>-<N>.1] [--deep]'` + a `description:` clause. Estimated +600 to +800 B, paid for inside the body: rewrite Notes §"One-motion contract" (which now states a falsehood — "No seam where the user has to manually run `/ft-task <ID>.1` after filing" — and must change anyway), and collapse the three Notes "Compare with …" bullets into one. The budget drift check (`bash tools/drift-checks.sh`) is the enforcing test; `docs/CONTEXT-BUDGET.md` §"Skill bodies" is re-measured at the next `/ft-release`, as its ledger says.

**Mirrors** (each grep-confirmed at HEAD):
- `codex/skills/ft-open-epic/SKILL.md` — `description:` names `--deep` only; add the resume form. The wrapper delegates to the canonical body, so the fragment resolves relative to it (`docs/PLATFORMS.md` Codex §"Skill-body flags", Direct route).
- `SPEC/procedures/` — no `ft-open-epic` SOP exists (only `ft-task.md`); nothing to mirror.
- `SPEC/epic.md` lifecycle step 2 — add the resume entry; §"Skills" paragraph unchanged.
- `claude/CAPABILITIES.md` §"The triggers" `--deep` row says "the skill's only argument" → "its only flag" (the resume form is an argument, not a flag; no new trigger row).
- `docs/PLATFORMS.md` line 309's lazy-fragment list — add `ft-open-epic/step-4.5-model-gate.md`.
- `docs/GLOSSARY.md` "epic Discovery (.1)" — optionally append the resume form; `/ft-refactor` entry unaffected.
- `tools/drift-checks.sh` `pair_s` — compares the `/ft-task` flags line and peer-skill slugs only; no new slug, no `/ft-task` flag → **no impact**. The rosters in `AGENTS.md` / `claude/AGENTS-snippet.md` name `/ft-open-epic` bare → no change.
- `SPEC/gate-postures.md` lines 116 / 338 (`/ft-open-epic` refuses `--unattended`) → unchanged; the resume form refuses it too.

**Filed row.** `CORE-837 [heavy]🧠 | open-epic-model-seam` under `## Medium` (the decision is stated here, so per `SPEC/model.md` what remains is execution across several files with budget trims — `[heavy]`, not `[frontier]`). ID allocated per `SPEC/plan-filing.md` §"ID allocation" (max 836 → 837). Word count recorded in Testing Notes.

**Downstream-impact reconciliation scan** (new-task filing trigger). Active rows: CORE-835 (`SPEC/unattended-candidacy.md` clause 3), CORE-641 (typescript bump). Neither shares a file, subsystem, or wikilink with `/ft-open-epic`, its fragments, or `SPEC/epic.md` → **no downstream impact**; no reconcile edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code; the drift checks are the test surface for markdown edits)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (below)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the deliverable is one filed PLAN row plus design prose in this note, not a code diff to grade — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user — N/A (no rendered surface) for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -cE '^- \[ \] \*\*CORE-[0-9]+\*\* .*\| open-epic-model-seam' .flaitron/PLAN.md` → `1`, exit 0
- `bash tools/drift-checks.sh` → exit 1 on first run: `MISSING FILE .flaitron/tasknote/CORE-836.md — ft-task/step-1.5-model-edge.md §"Mismatch"` (pair_q read the short fragment path as a repo path). Citation rewritten to `claude/skills/ft-task/step-1.5-model-edge.md`; re-run → exit 0, all 20 checks ok.
- Row long description: 48 words (≤50 target, ≤70 cap); no `: ` outside inline code that would trip the parser.
- Structural: duplication / dead code — N/A (no code). Stale docs: `claude/skills/ft-open-epic/SKILL.md` Notes §"One-motion contract" ("No seam where the user has to manually run…") becomes false once the gate lands — named in the design as a trim CORE-837 owns; nothing is stale at HEAD today.
- Design-vs-Acceptance self-grade: each of Discovery's five open points has a stated decision and a reason (resume entry, proceed-here tag policy, placement + budget, mirrors, hand-filed `.1`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Settled the `/ft-open-epic` file→drive model seam and filed CORE-837 to implement it. Decision: a Step 4.5 model gate after the filing commit (STOP-with-choice on an under-tier `.1`, tag kept on proceed; `/ft-task`'s Mismatch fragment reused for the concrete case), resumed through `/ft-open-epic <AREA>-<N>.1 [--deep]`, which recovers the locked inputs from the filed rows and jumps to the scaffold. Gate and resume live in a new lazy fragment because `SKILL.md` has 94 B of headroom; the implementation trims the Notes to pay for the pointers.

- **Doc-drift sweep** (12 entries in `.flaitron/tasknote/README.md` §"AI-referenced docs"): `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` — **no change** for all twelve. No contract or wiring surface changed; the row and the design are the only writes.
- **Changed files:** `.flaitron/PLAN.md` (+1 row, then this row's stub flip), this tasknote.
- **Verification:** grep-count → 1; `bash tools/drift-checks.sh` → 0 (after one citation fix).
- **Refactors:** none.
- **`touches:` reconciliation:** declared `.flaitron/PLAN.md`; `git diff --name-only` shows `.flaitron/PLAN.md` and `.flaitron/tasknote/CORE-836.md` (workflow file, always implied) — match.
- **Maintainability effect:** none at HEAD; CORE-837 is sized so the skill body stays under its 33,000 B cap by extracting the fragment the budget ledger already predicted.

**Archived:** 2026-10-26
