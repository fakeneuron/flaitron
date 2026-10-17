---
title: prep-unattended-skill
status: completed
tags: []
created: 2026-10-13
due:
related-tasks: [CORE-EPIC-783, CORE-783.1, CORE-783.2, CORE-783.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-prep-unattended/SKILL.md
  - codex/skills/ft-prep-unattended/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - SPEC/unattended-candidacy.md
  - SPEC/plan-filing.md
  - SPEC/layout.md
  - SPEC/task-line-segments.md
  - docs/GLOSSARY.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/CONTEXT-BUDGET.md
  - docs/EXTERNAL-AGENTS.md
  - docs/AGENT-NEUTRALITY.md
  - AGENTS.md
  - README.md
blocked-by:
  - CORE-783.2
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-783.3 | prep-unattended-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-783]]

## 🎯 Goal

Add the attended, flagless `/ft-prep-unattended` skill that classifies declined rows, pins a fact or splits a mechanical child from an attended remainder, and files starters, never writing `[unattended]`, and ship it in the adopter subset beside `/ft-seed-unattended`.

## ✅ Acceptance

- [x] Claude body is flagless and states that it never writes `[unattended]` — `test -f claude/skills/ft-prep-unattended/SKILL.md && ! grep -q '^argument-hint:' claude/skills/ft-prep-unattended/SKILL.md && grep -E -q 'never writes .\[unattended\].' claude/skills/ft-prep-unattended/SKILL.md && grep -q 'accepts no task ID and no' claude/skills/ft-prep-unattended/SKILL.md`
- [x] Shipped-skill names match their directories, and Claude and Codex inventories match — `bash tools/drift-checks.sh skill_name_invariant && bash tools/drift-checks.sh shipped_skill_parity`
- [x] The pin-guard paragraph is one variant across the seven `<root>`-resolving bodies, including this skill — `bash tools/drift-checks.sh skill_pin_guard_parity`
- [x] The candidacy module owns the prep taxonomy, and filing commits name the message — `grep -q '^## Preparing declined rows$' SPEC/unattended-candidacy.md && grep -F -q 'chore: prep unattended — <N> rows' SPEC/plan-filing.md`
- [x] The adopter subset names the skill on the four snippet blocks and the roster docs — `missing=; for f in claude/AGENTS-snippet.md codex/AGENTS-snippet.md cursor/AGENTS-snippet.md grok/AGENTS-snippet.md SPEC/layout.md docs/GLOSSARY.md docs/PLATFORMS.md docs/MIGRATION.md docs/CONTEXT-BUDGET.md README.md AGENTS.md; do grep -q 'ft-prep-unattended' "$f" || missing="$missing $f"; done; test -z "$missing"`
- [x] The new filer satisfies the candidacy mirror, the filing-commit pair, and section citations — `bash tools/drift-checks.sh pair_n && bash tools/drift-checks.sh pair_o && bash tools/drift-checks.sh pair_q`
- [x] The pin-guard self-test still fails a mutated copy, at the new count of seven — `node --test tools/drift-checks.test.mjs`
- [x] The body does not copy the clause-3 sentence — `! grep -R -F -q 'A keyword miss is not a semantic pass' claude/skills`
- [x] The procedure applies the module's pin / split / stay classes and files a starter from the existing template, without a new template or a nested filer gate — `judgment` (prose procedure; presence of the classes and the template path is what the read decides)

## 🧩 Subtasks

- [x] Add `## Preparing declined rows` and the surfaces-table row. Bind the write in `SPEC/plan-filing.md`.
- [x] Write the Claude body and the Codex wrapper on the seed pattern. Copy the pin-guard line byte-for-byte.
- [x] Add the slug to the snippet SSOT and the three derived blocks, and to the roster sentences those blocks sit beside.
- [x] Point the drift pin-guard list at seven bodies and update its self-test count.
- [x] Run the drift checks and the self-test.

## 🔗 Related

- [[CORE-EPIC-783]] — parent epic
- [[CORE-783.1]] — discovery; filed this child's scope
- [[CORE-783.2]] — blocked-by: clause 3 pin lands first
- [[CORE-783.N]] — synthesis audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The open Medium child is the skill Discovery already scoped. `.2` is closed, so the sequential claim is satisfied.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

  The predicate and the pin/split/stay taxonomy live in `SPEC/unattended-candidacy.md`. The skill Reads that module and does not restate a clause. Wiring follows the adopter-subset derivation: the Claude `ln -s` block is the roster, and the other three blocks are substitutions.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/core/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

  `<area>` is `archive/core/` (README table). A read-only probe graded the design against the archive. Findings are in Discovery Notes. No ⚠️ pointer on the hits.

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

  The PLAN line matches Discovery's filed 34-word scope. `/ft-seed-unattended` is the attended flagless marker walk. Clause 3 already names `/ft-prep-unattended` as a decliner and the skill did not exist. No path drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: a standalone split takes the next top-level ID and the source row becomes the remainder; an epic-child split takes the next `.<k>` before `.N`; the taxonomy lives in a new candidacy section, the same shape as seed's section; the confirm commits under Filing commits as `chore: prep unattended — <N> rows`; the starter is copied from the existing template and `/ft-file-task --starter` is not called, so that filer's gate does not fire; a mechanical row is `[light]🔧` or `[medium]🧩` only; the source row's `[model]` is not retagged.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Archive probe: no contradiction. [[CORE-783.1]] withdrew the claim that seed is the only writer. [[CORE-783.2]] forbids copying the clause-3 sentence into a skill body and forbids new visual keywords. [[CORE-736]] says mirrors do not restate the predicate. [[CORE-619]] is the roster shape: read the module, labeled mirror, never-emitted `unattended-candidates:` literal, four active sections only, nothing written before the reply. [[CORE-577.2]] adds no gate, banner, cue, or checklist box. [[CORE-769.2]] retired command stubs. The project-07 mirror stays a handoff.

Fan-out echo: Sequential `[[CORE-783.3]] after [[CORE-783.2]]` → `blocked-by: CORE-783.2`. No Parallel row. `.2` is `[x]`.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended `/ft-seed-unattended`: one attended walk, one prose gate, a filing commit, the pin-guard line copied byte-for-byte. The new behavior is the declined-row classification, which the candidacy module owns.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor. Roster edits are the one-line additions a new adopter-subset slug requires. Unrelated ledger numbers were left as stamped.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  `tools/drift-checks.test.mjs` expects the pin-guard drift counts for seven bodies (`1 6` or `6 1`).

**Implementation Notes:**

Local `.claude/skills/ft-prep-unattended` → `../../claude/skills/ft-prep-unattended`. `.claude/` is gitignored, so the link is checkout state the self-wiring diff reads and the commit does not carry. Installed-surface diffs of the four `ln -s` blocks were empty.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `test -f claude/skills/ft-prep-unattended/SKILL.md && ! grep -q '^argument-hint:' claude/skills/ft-prep-unattended/SKILL.md && grep -E -q 'never writes .\[unattended\].' claude/skills/ft-prep-unattended/SKILL.md && grep -q 'accepts no task ID and no' claude/skills/ft-prep-unattended/SKILL.md` → 0
- `bash tools/drift-checks.sh skill_name_invariant` → 0
- `bash tools/drift-checks.sh shipped_skill_parity` → 0
- `bash tools/drift-checks.sh skill_pin_guard_parity` → 0
- `grep -q '^## Preparing declined rows$' SPEC/unattended-candidacy.md && grep -F -q 'chore: prep unattended — <N> rows' SPEC/plan-filing.md` → 0
- roster loop over the four snippets plus layout, glossary, platforms, migration, context budget, README, and AGENTS.md → 0
- `bash tools/drift-checks.sh pair_n` → 0
- `bash tools/drift-checks.sh pair_o` → 0
- `bash tools/drift-checks.sh pair_q` → 0
- `node --test tools/drift-checks.test.mjs` → 0 (19 pass)
- `! grep -R -F -q 'A keyword miss is not a semantic pass' claude/skills` → 0
- judgment: the skill Reads §"Preparing declined rows", copies `templates/tasknote-starter-template.md`, and does not call `/ft-file-task --starter`

Structural: the taxonomy lives in the module. The skill does not restate a clause. The pin-guard line matches seed byte-for-byte. No new template. The public surface grew by one slug on the adopter-subset rosters.

External review (read-only probe): no blockers. Four notes, all fixed in this commit. The glossary entry now sits before `/ft-refactor`. A mechanical row is inserted after its source, or 2-space nested before `.N` when the source is an epic child, and the next `.<k>` counts siblings already on disk. A source ID that already has a tasknote stays, and that stay is in the module. Pair C's writer cell names `/ft-prep-unattended`.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Shipped `/ft-prep-unattended`, the attended flagless walk of declined rows. It pins a fact, splits a mechanical row from an attended remainder, and files a starter. It never writes `[unattended]`. The taxonomy is `SPEC/unattended-candidacy.md` §"Preparing declined rows". The skill, the Codex wrapper, and the adopter-subset roster ship beside `/ft-seed-unattended`.

Doc-drift sweep: `README.md` updated (quickstart subset). `AGENTS.md` updated (utility line, four → five). `SPEC.md` no change. `docs/MIGRATION.md` updated (§1.2). `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, and `grok/AGENTS-snippet.md` updated. `docs/CONVENTIONS.md` no change. `CONTRIBUTING.md` no change. `SECURITY.md` no change. `docs/AGENT-NEUTRALITY.md` updated (plan-filing reference list). `docs/PLATFORMS.md` updated (standalone list and the two subset cells). `claude/CAPABILITIES.md` no change. `docs/AGENT-COMPAT.md` no change (it names the policy subset without a slug list). `docs/EXTERNAL-AGENTS.md` updated (step 2: prep never writes the marker; no stable-surface row retired). `docs/WORKTREES.md` no change. `docs/VISION.md` no change.

`touches:` reconciliation is recorded against `git diff --name-only` at commit. The gitignored `.claude/skills/ft-prep-unattended` symlink is checkout state, not a committed path.

Learnings: N/A. The always-loaded utility roster was updated in this commit.

**Archived:** 2026-10-13
