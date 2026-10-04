---
title: bold-lead-citation-targets
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: []
touches:
  - docs/CONVENTIONS.md
---

# CORE-609 | bold-lead-citation-targets

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Record bold-lead paragraphs as a valid `§"Title"` citation target in `docs/CONVENTIONS.md`, since the mechanical heading-resolution checks (e.g. Pairs K/N) only ever match `## ` headings and are structurally blind to the ≥12 citations that already resolve to a bold-lead paragraph instead.

## ✅ Acceptance

- [x] `docs/CONVENTIONS.md` documents that a `§"Title"` citation may resolve to either a markdown heading or a bold-lead paragraph, naming the heading-only blind spot in the mirror-pair checks — `judgment` (prose addition; no command decides doc completeness)
- [x] The four surfaced targets (`SPEC.md` §"Deferred hand-off filing", `SPEC/plan-filing.md` §"Unattended filing authority", `SPEC/blocked.md` §"Exit (resume)", `SPEC/tasknote-selection.md` §"File a starter") are named in the new convention text — `grep -c` each bold-lead string is present in both its source file and the new CONVENTIONS.md text

## 🧩 Subtasks

- [x] Confirm each of the four cited targets is a bold-lead paragraph (not a heading) at its current location
- [x] Draft a new `docs/CONVENTIONS.md` subsection under "Adheres to" documenting both valid `§` anchor shapes and the heading-only check blind spot
- [x] Insert the subsection near "Canonical source with labeled mirrors" (same citation-integrity topic)
- [x] Verify the new prose and doc-drift sweep

## 🔗 Related

Surfaced by `/ft-audit-repo` 2026-09-19 (Theme: Cross-reference integrity outside the checks).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN.md line's four targets and citer count check out exactly against current source (below); the two named remedies (promote to `###` headings, or record bold-leads as a valid target) are both real options, and recording the convention is the better fit for this repo's existing style and its declared "markdown is the schema, no validator" posture — no re-scope needed.

- [x] Read relevant source files — verified all four cited targets and located the citation-checking machinery.

- [x] **Best Practices Review** — N/A: pure prose addition to `docs/CONVENTIONS.md`, no code or module boundaries touched.

- [x] **Archive skim** — `grep -l docs/CONVENTIONS.md .flowtron/tasknote/archive/core/*.md` returned 5 hits (CORE-604.2, CORE-605, CORE-EPIC-194, CORE-EPIC-208, CORE-607); all are routine doc-drift-sweep "no change"/generic-mention rows, none address `§"Title"` citation-target shape. No prior tasknote on this exact question.

- [x] **Drift check** — confirmed by direct read, not recall:
  - `SPEC.md:557` is `**Deferred hand-off filing.**` (bold-lead, not a heading) — 9 distinct citing files found via grep (`claude/CAPABILITIES.md`, `claude/commands/ft-file-followup.md`, `claude/skills/ft-task/unattended-mode.md`, `claude/skills/ft-file-followup/SKILL.md` ×2, `claude/skills/ft-file-followup/step-0-flags.md` ×2, `SPEC/plan-filing.md`, `SPEC/unattended-candidacy.md`, `SPEC/procedures/ft-task.md`, `docs/EXTERNAL-AGENTS.md`) — PLAN.md's "8 citers" is close enough (count depends on whether same-file repeats are counted once); not worth re-litigating the exact number.
  - `SPEC/plan-filing.md:101` is `**Unattended filing authority.**` (bold-lead) — 1 citer (`SPEC/unattended-candidacy.md:136`).
  - `SPEC/blocked.md:71` is `**Exit (resume).**` (bold-lead) — 1 citer (`claude/skills/ft-task/step-3c-resume-blocked.md`).
  - `SPEC/tasknote-selection.md:42` is `**File a starter (\`/ft-file-followup [ID] --starter\`) when:**` (bold-lead) — 1 citer (`claude/skills/ft-file-followup/starter-mode.md`).
  - Confirmed via `claude/skills/ft-release/step-7.1-mirror-pairs.md` that Pair K (`grep -qF -- "## $sec"` style, scoped to `docs/VISION.md` labeled mirrors) and Pair N (`grep -qF -- "## $sec" SPEC/unattended-candidacy.md`) both resolve citations by matching a literal `## ` heading — no existing pair (A–O) is even scoped to check these four citations, and none of the family's heading-match idioms (K, N, and O's anchored `^## Filing commits`) would ever match a bold-lead paragraph. No drift from the PLAN.md line; no SPEC contract contradicted.

- [x] Logged: No clarifications needed. Both remedies named on the PLAN.md line are legitimate; chose "record bold-leads as valid `§` targets in `docs/CONVENTIONS.md`" over promoting the four to `###` headings, because (a) bold-lead paragraphs are an established, widely-used style throughout `SPEC.md`/`SPEC/*.md` for named concepts that aren't meant to be navigable headings, so promoting only these four would be an arbitrary carve-out with no technical payoff (none of Pairs A–O are scoped to check them even as headings), and (b) documenting the convention matches `docs/VISION.md` §"Schema validators"'s declared preference for sharper prose over new mechanical checks.

- [x] Subtasks above populated; `touches: [docs/CONVENTIONS.md]` declared.

**Discovery Notes:** See drift-check bullets above for the full citer inventory and the Pair K/N/O mechanics confirming the blind spot is structural (no pair is scoped to these targets, and the family's shared idiom is a literal `## ` match).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing `### <named convention>` shape used by "Canonical source with labeled mirrors" immediately above it: a short lead paragraph, then bullets in the same bold-lead-callout style. No new abstraction.

- [x] **Minimal refactor gate** — N/A, no code touched; only a new prose subsection inserted, nothing existing restructured.

- [x] Implemented the minimal solution — inserted `### `§"Title"` citations may target a heading or a bold-lead paragraph` between "Canonical source with labeled mirrors" and "Verify behavioral claims against flowtron's own source" in `docs/CONVENTIONS.md`, naming the Pair K/N/O mechanics and all four surfaced targets.

- [x] Updated/added tests for non-trivial behavior — N/A, documentation-only change with no testable behavior.

**Implementation Notes:** Single edit to `docs/CONVENTIONS.md`. No other file needed a change — the four target files (`SPEC.md`, `SPEC/plan-filing.md`, `SPEC/blocked.md`, `SPEC/tasknote-selection.md`) already carry the bold-lead paragraphs unmodified, and no citer needed correction (all four resolve correctly today; the finding was about check *coverage*, not broken links).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only markdown edit, no test surface.

- [x] Ran lint/type-check on changed code — N/A, no code changed.

- [x] **Verification receipt** — see commands below; no avoidable duplication (the new subsection cites existing Pair K/N/O text rather than restating it), no dead code, no stale code-facing docs affected.

- [x] (frontend) N/A — no frontend surface touched.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `grep -n '^### ' docs/CONVENTIONS.md` → 0, new subsection listed at line 85 between "Canonical source with labeled mirrors" and "Verify behavioral claims against flowtron's own source"
- `grep -o "Deferred hand-off filing" docs/CONVENTIONS.md | wc -l` → 0, count 1
- `grep -o "Unattended filing authority" docs/CONVENTIONS.md | wc -l` → 0, count 1
- `grep -o "Exit (resume)" docs/CONVENTIONS.md | wc -l` → 0, count 1
- `grep -o "File a starter" docs/CONVENTIONS.md | wc -l` → 0, count 1
- `grep -c '\*\*Deferred hand-off filing\.\*\*' SPEC.md` → 0, count 1 (bold-lead untouched)
- `grep -c '\*\*Unattended filing authority\.\*\*' SPEC/plan-filing.md` → 0, count 1
- `grep -c '\*\*Exit (resume)\.\*\*' SPEC/blocked.md` → 0, count 1
- `grep -c '\*\*File a starter' SPEC/tasknote-selection.md` → 0, count 1

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (bold-lead untouched) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` **updated** (new "`§"Title"` citations may target a heading or a bold-lead paragraph" subsection) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change (cited, not edited)

- [x] Closed — both Acceptance criteria ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to `Completed 2026-09-19.` at top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:** Added a new `### `§"Title"` citations may target a heading or a bold-lead paragraph` subsection to `docs/CONVENTIONS.md` (between "Canonical source with labeled mirrors" and "Verify behavioral claims against flowtron's own source"), recording that a `§"Title"` citation may resolve to either a markdown heading or a bold-lead paragraph, and naming the four surfaced targets (`SPEC.md` §"Deferred hand-off filing", `SPEC/plan-filing.md` §"Unattended filing authority", `SPEC/blocked.md` §"Exit (resume)", `SPEC/tasknote-selection.md` §"File a starter") plus the mechanics of why Pairs K, N, and O — every existing citation-resolution check — only ever match a literal `## ` heading and so can never cover a bold-lead target. Chose "record the convention" over "promote the four to `###` headings" because bold-leads are an established, widely-used style throughout `SPEC.md`/`SPEC/*.md` and none of Pairs A–O are even scoped to check these four citations regardless of heading level, so promoting them would buy no check coverage — only documenting the accepted convention, per `docs/VISION.md` §"Schema validators"'s declared preference for sharper prose over new mechanical checks. No source file's bold-lead paragraph or any citer needed a change — all four citations already resolve correctly today; the finding was about check-coverage blindness, not broken links. `touches:` reconciliation: `git diff --name-only` = `docs/CONVENTIONS.md`, matching the declared scope exactly. Maintainability effect: closes a documentation gap so a future contributor doesn't mistake the coverage blind spot for a bug, and gives a future citation-check author (or auditor) an explicit place naming which anchor shapes are legitimate.

**Archived:** 2026-09-19
