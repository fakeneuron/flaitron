---
title: spec-paths-frontmatter-retire
status: completed
tags: []
created: 2026-09-13
due:
related-tasks: []
touches:
  - SPEC/blocked.md
  - SPEC/cue-vocabulary.md
  - SPEC/gate-discipline.md
  - SPEC/gates.md
  - SPEC/layout.md
  - SPEC/loop.md
  - SPEC/model.md
  - SPEC/plan-filing.md
  - SPEC/plan-parser.md
  - SPEC/purpose-blurb.md
  - SPEC/scope-boundaries.md
  - SPEC/starter.md
  - SPEC/superseded-claims.md
  - SPEC/tasknote-inserts.md
  - SPEC/tasknote-selection.md
  - SPEC/unattended-candidacy.md
  - SPEC/versioning.md
  - SPEC/procedures/README.md
  - docs/AGENT-NEUTRALITY.md
  - claude/AGENTS-snippet.md
---

# CORE-596 | spec-paths-frontmatter-retire

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Remove the unconsumed `paths:` YAML frontmatter key from the 17 `SPEC/*.md`
lazy modules that declare it empty, and delete the three documentation
references to the retired convention.

## ✅ Acceptance

- [ ] The 17 named lazy modules carry no `paths:` frontmatter — `grep -l '^paths:' SPEC/*.md` returns only `SPEC/epic.md`
- [ ] `SPEC/epic.md`'s populated `paths: ['*-EPIC-*.md', '*.[0-9]*.md']` frontmatter is untouched (only module with a real filename trigger) — `judgment`, confirmed by the grep above
- [ ] `SPEC/layout.md` no longer has the §"Lazy SPEC module frontmatter" subsection — `grep -q 'Lazy SPEC module frontmatter' SPEC/layout.md` exits 1
- [ ] `docs/AGENT-NEUTRALITY.md` no longer has the `SPEC/layout.md` / "Lazy SPEC module frontmatter" table row — `grep -q 'Lazy SPEC module frontmatter' docs/AGENT-NEUTRALITY.md` exits 1
- [ ] `SPEC/procedures/README.md` no longer has the "Unlike the `SPEC/*.md` lazy modules... `paths:` field" contrast sentence, rest of paragraph intact — `grep -q 'Unlike the' SPEC/procedures/README.md` exits 1, `grep -q 'source: field intentionally records derivation' SPEC/procedures/README.md` exits 0
- [ ] No dangling reference to the retired section remains anywhere outside archived tasknotes (which are historical record, not edited) — `grep -rn 'Lazy SPEC module frontmatter' --include='*.md' . | grep -v '.flowtron/tasknote/archive'` returns nothing

## 🧩 Subtasks

- [ ] Strip the 3-line `---\npaths: []\n---` frontmatter block from the 17 non-epic SPEC modules
- [ ] Delete `SPEC/layout.md` §"Lazy SPEC module frontmatter" (keep the sibling "Procedure SOPs" section and everything else in "Working in the flowtron repo itself" unchanged)
- [ ] Delete the `docs/AGENT-NEUTRALITY.md:36` table row for `SPEC/layout.md` §"Lazy SPEC module frontmatter"
- [ ] Delete the `SPEC/procedures/README.md:84-86` contrast sentence ("Unlike the `SPEC/*.md` lazy modules... SKILL dispatch."), keep the `source:` paragraph that follows
- [ ] Fix the now-stale cross-ref + claim in `claude/AGENTS-snippet.md` (line ~56): drop the sentence claiming flowtron's own SPEC modules "carry the same `paths:` frontmatter" and linking to the deleted section; keep the CONTEXT-BUDGET.md pointer sentence
- [ ] Repo-wide grep sweep to confirm no other non-archived reference to the retired section/frontmatter survives

## 🔗 Related

- [[CORE-097.3]] — shipped the `paths:` frontmatter convention (2026-05-18), declarative-only, "future tooling MAY parse"; this task retires it since nothing ever did

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line still matches current repo state exactly — 18 `SPEC/*.md` files exist, 17 declare `paths: []` and `epic.md` alone declares a populated value, matching CORE-097.3's original design and the "17" count in the filing. `docs/AGENT-NEUTRALITY.md:36` and `SPEC/procedures/README.md:85` both still contain the named content. No drift.

- [x] Read relevant source files — read all 18 `SPEC/*.md` frontmatter blocks, `SPEC/layout.md` §"Lazy SPEC module frontmatter" + §"Procedure SOPs" in full, `docs/AGENT-NEUTRALITY.md`'s table row, `SPEC/procedures/README.md`'s contrast paragraph, and confirmed via grep that no tooling (`tools/`, `viz/src/`) parses the `paths:` key anywhere — it is genuinely consumer-less, including on `epic.md`.

- [x] **Best Practices Review** — this is a documentation-only retire (no code, no module-boundary questions). N/A.

- [x] **Archive skim** — `CORE-097.3` (original ship, confirms 17-empty/1-populated design and the "declarative-only, future tooling MAY parse" framing this task's PLAN line quotes). `CORE-154.2`, `CORE-271.2`, `CORE-271.6` touched the same `docs/AGENT-NEUTRALITY.md` row / `SPEC.md` §"Lazy SPEC module frontmatter" text at the time `SPEC/procedures/` was introduced — historical record only, nothing load-bearing that changes this task's scope.

- [x] **Drift check** — no drift; PLAN.md line, `SPEC/layout.md` line numbers, and the two doc references all match current file state as read above.

- [x] Asked clarifying questions OR logged "No clarifications needed (--fast)" — assumption: only the 17 modules with empty `paths: []` lose their frontmatter; `SPEC/epic.md`'s populated frontmatter is out of scope (matches the PLAN line's explicit "17" count and CORE-097.3's original epic.md-is-the-exception design). Assumption: `claude/AGENTS-snippet.md`'s stale cross-ref (discovered mid-Discovery, not named in the PLAN line) is fixed as a direct, mechanical consequence of deleting the section it points to — it is a required doc-drift fix, not scope creep, and `claude/AGENTS-snippet.md` is itself on the Phase 4 AI-referenced-docs sweep list.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

Confirmed via `grep -rln "paths:" --include="*.md" .` (excluding archived tasknotes)
that the only non-SPEC-module file referencing the frontmatter convention by
name/section is `claude/AGENTS-snippet.md:56` (adopter-facing analogy pointing at
`SPEC/layout.md` §"Lazy SPEC module frontmatter"); `docs/CONTEXT-BUDGET.md`
explicitly lists the lazy `SPEC/` modules (other than `gates.md`) as
"Not budgeted, deliberately," and the CI `drift` job's byte-budget check only
walks the `## Budgets` table (4 rows, none of the files this task touches), so
shrinking these files has no CI byte-budget impact. No CI check parses or
requires the `paths:` key itself.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, pure deletion of a retired documentation convention; no new pattern introduced.

- [x] **Minimal refactor gate** — no refactor; deletions only, confined to the named surfaces plus the one directly-caused stale reference.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code/tests touch this frontmatter.

**Implementation Notes:**

- Stripped the 3-line `---\npaths: []\n---` block (+ trailing blank line) from all 17 non-epic `SPEC/*.md` modules via a small Python script (byte-exact assertion on each file's first 4 lines before writing, to avoid touching any file whose frontmatter didn't match the expected shape). `SPEC/epic.md`'s populated frontmatter left untouched.
- Deleted `SPEC/layout.md` §"Lazy SPEC module frontmatter" in full (lines 46-74 of the pre-edit file); the sibling §"Procedure SOPs" heading now follows directly after the "Global-only utilities install..." paragraph.
- Deleted the one-line `docs/AGENT-NEUTRALITY.md` table row citing that section.
- Deleted the "Unlike the `SPEC/*.md` lazy modules... SKILL dispatch." sentence from `SPEC/procedures/README.md`, keeping the following `source:`-field paragraph verbatim.
- `claude/AGENTS-snippet.md`: dropped the sentence claiming flowtron's own SPEC modules "carry the same `paths:` frontmatter" (now false) and its link to the deleted section; kept the unrelated CONTEXT-BUDGET.md pointer sentence.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown-only change; no test suite covers `SPEC/*.md` prose.

- [x] Ran lint/type-check on changed code — N/A, no lint config covers markdown content in this repo.

- [x] **Verification receipt** — all Acceptance commands run; no avoidable duplication/dead code/stale docs found beyond what this task itself fixed.

- [x] (frontend) Asked the user for visual confirmation — N/A, no UI surface touched.

**Testing Notes:**

- `grep -l '^paths:' SPEC/*.md` → 0 (output: `SPEC/epic.md` only)
- `grep -q 'Lazy SPEC module frontmatter' SPEC/layout.md` → 1
- `grep -q 'Lazy SPEC module frontmatter' docs/AGENT-NEUTRALITY.md` → 1
- `grep -q 'Unlike the' SPEC/procedures/README.md` → 1
- `grep -q 'source. field intentionally records derivation' SPEC/procedures/README.md` → 0
- `grep -rn 'Lazy SPEC module frontmatter' --include='*.md' . | grep -v '.flowtron/tasknote/archive'` → only this tasknote's own prose and the still-open PLAN.md line (both expected; PLAN.md flips to stub form at closure below)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs". `claude/AGENTS-snippet.md` and `docs/AGENT-NEUTRALITY.md` — updated (see Execution). `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (grep confirms no `paths:`/"Lazy SPEC module frontmatter" reference in any of them). `SPEC/*.md` lazy modules (incl. `SPEC/layout.md`, edited directly this task) and `claude/skills/*/SKILL.md` are outside the sweep set per that doc's own carve-out.

- [x] Closed — every Acceptance criterion ticked and verified above; no criterion left `N/A` without reason.

- [x] **Evidence-based recap** drafted (below)

**Final Summary:**

Removed the consumer-less `paths:` YAML frontmatter key from the 17 `SPEC/*.md`
lazy modules that declared it empty (`blocked` · `cue-vocabulary` ·
`gate-discipline` · `gates` · `layout` · `loop` · `model` · `plan-filing` ·
`plan-parser` · `purpose-blurb` · `scope-boundaries` · `starter` ·
`superseded-claims` · `tasknote-inserts` · `tasknote-selection` ·
`unattended-candidacy` · `versioning`); `SPEC/epic.md`'s populated frontmatter
(the one module with a real filename trigger) is untouched. Deleted the three
documentation references to the retired convention named in the PLAN.md line
(`SPEC/layout.md` §"Lazy SPEC module frontmatter", the `docs/AGENT-NEUTRALITY.md`
table row, the `SPEC/procedures/README.md` contrast sentence), plus one stale
cross-ref/claim discovered mid-Discovery in `claude/AGENTS-snippet.md` that
pointed at the now-deleted section and asserted a now-false fact.

20 files changed, all deletions (no new lines beyond the two shortened
sentences left standing in `SPEC/procedures/README.md` and
`claude/AGENTS-snippet.md`). `touches:` scope reconciliation: `git diff
--name-only` matches the declared `touches:` list exactly (17 SPEC modules +
`SPEC/procedures/README.md` + `docs/AGENT-NEUTRALITY.md` +
`claude/AGENTS-snippet.md`), plus this tasknote and the PLAN.md closure edit.
No tests/lint apply (markdown-only, no tooling parses this frontmatter — the
whole point of the retire). Ships a shipped-but-unused declarative contract
that CORE-097.3 flagged as speculative in 2026-05-18 and nothing ever
consumed.

**Archived:** 2026-09-13
