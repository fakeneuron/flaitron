---
title: Learnings box
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: []
touches:
  - SPEC.md
  - templates/tasknote-template.md
---

# CORE-658 | Learnings box

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a Phase 4 checklist item — in both the canonical `SPEC.md` Phase 4
checklist and the `templates/tasknote-template.md` copy — that prompts the
closing agent to name any learning the always-loaded layer (`AGENTS.md` /
`.flowtron/tasknote/README.md` §"AI-referenced docs") should carry, giving
flowtron a push-memory step beside Phase 1's existing archive pull-memory.

## ✅ Acceptance

- [x] `templates/tasknote-template.md` Phase 4 section carries a new
      checklist item, positioned as the last item before the blank line and
      `**Final Summary:**` label, so caobunga's lede-regex contract in
      `docs/EXTERNAL-AGENTS.md` §"Template labels" (`**Final Summary:**`
      immediately followed by `**Archived:**`, nothing interposed) is
      untouched — `judgment` (verified by reading `templates/tasknote-template.md:93-106`)
- [x] `SPEC.md` §"🚀 Phase 4: Closure" checklist carries the matching item,
      keeping the two canonical copies in sync — `judgment` (no CI pair
      binds them; verified by diffing the two checklists by eye)
- [x] New item's wording matches the PLAN.md line's quoted text: "did this
      task teach something the always-loaded layer (AGENTS.md / README
      §AI-referenced docs) should carry? `N/A` or the line." — `judgment`
- [x] No other Phase 4 checklist item, prose, or the `**Final Summary:**` /
      `**Archived:**` label pair is altered — `git diff -- templates/tasknote-template.md SPEC.md`
      shows only the one added line (plus its SPEC.md prose) in each file

## 🧩 Subtasks

- [x] Insert the new checklist item into `templates/tasknote-template.md`
      Phase 4 section, immediately above the blank line preceding
      `**Final Summary:**`
- [x] Insert the matching checklist item into `SPEC.md` §"🚀 Phase 4:
      Closure" checklist, in the same relative position (after "Evidence-based
      recap")
- [x] Re-read both files to confirm the lede-regex contract (label
      immediately followed by the lede paragraph) is untouched

## 🔗 Related

- Origin: `docs/HARNESS-SURVEY.md` §"Gaps (ranked)" #2 — "Push-memory
  (learnings land where the next session reads unprompted) vs. archive
  pull-memory."

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line, `docs/EXTERNAL-AGENTS.md`'s documented
  lede-regex contract, and `docs/HARNESS-SURVEY.md`'s originating gap all
  agree on scope and constraint; nothing surfaced that would re-scope or
  de-scope.

- [x] Read relevant source files — `templates/tasknote-template.md`,
  `SPEC.md` §"🚀 Phase 4: Closure", `templates/tasknote-micro-template.md`
  (confirmed no `**Final Summary:**` label there — ships `## ✅ Recap`
  instead, so out of scope), `templates/tasknote-starter-template.md`
  (confirmed no Phase 4 section — out of scope), `docs/EXTERNAL-AGENTS.md`
  §"Template labels" (the lede-regex contract), `SPEC/model.md` (Step 1.5
  gate)

- [x] **Best Practices Review** — this is a two-file prose/markdown
  insertion mirroring an existing checklist-item pattern (bold label + em
  dash + description) already used by every other Phase 4 item in both
  files; no new abstraction, no refactor needed.

- [x] **Archive skim** — `archive/core/` holds no prior tasknote touching
  `templates/tasknote-template.md`'s Phase 4 section or the
  `**Final Summary:**` label; the closest precedent is CORE-042.4 (retired
  the nav-header chip flip at Phase 4 — cited only in `SPEC.md` prose, not
  archived under this ID) and CORE-621 (`.editorconfig` final-newline
  ratchet) — neither touches this section. No load-bearing prior note found.

- [x] **Drift check** — PLAN.md's description, `docs/HARNESS-SURVEY.md`'s
  gap entry, and the live file contents (`templates/tasknote-template.md`
  lines 93-104, `SPEC.md` lines 511-515) all agree; no drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" —
  **No clarifications needed (--fast implied by [unattended] row marker).**
  Explicit assumptions: (1) "the templates" (plural, in PLAN.md's
  description) means the canonical Phase 4 checklist wherever it's
  restated — `templates/tasknote-template.md` and `SPEC.md`'s mirror copy —
  not the micro or starter templates, which ship no `**Final Summary:**`
  label or Phase 4 section at all; (2) the checkbox's bold label is
  `**Learnings**`, matching the PLAN.md shortname `learnings-box` and the
  house style of the other three Phase 4 items; (3) no gate gets added —
  this is a fourth checklist box, not a new phase boundary or approval
  pause, consistent with SPEC.md's "Phase 4 closure ops … auto-run without
  an intermediate gate."

- [x] Subtasks above populated with concrete, ordered steps, and YAML
  `touches:` declared

**Discovery Notes:** No prior tasknote precedent for this exact edit.
`docs/EXTERNAL-AGENTS.md` §"Template labels" is the binding external
contract: it documents caobunga's lede-regex as reading the paragraph
*immediately after* `**Final Summary:**` as the lede, which is why the new
box must land above the blank line preceding that label, not between it and
`**Archived:**`. No CI mirror pair binds `SPEC.md`'s Phase 4 checklist to
the template's copy (checked `claude/skills/ft-release/step-7.1-mirror-pairs.md`
— no such pair exists), so keeping them in sync here is a manual
consistency call, not a gate requirement.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing four-item Phase 4 checklist pattern (bold label + em dash + description) already used identically in both files; no new shape introduced.

- [x] **Minimal refactor gate** — no refactor; pure insertion. One extra prose paragraph added in `SPEC.md` (not `templates/tasknote-template.md`, which is Recap-only prose-free by convention) explaining the push/pull-memory rationale, since every other Phase 4 checklist item in `SPEC.md` gets an explanatory paragraph and a bare checkbox with no context would be the outlier.

- [x] Implemented the minimal solution — added the `**Learnings**` checklist item to both `templates/tasknote-template.md` (as the last Phase 4 item, directly above the blank line preceding `**Final Summary:**`) and `SPEC.md` §"🚀 Phase 4: Closure" (as the last item in that checklist, followed by a short rationale paragraph).

- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only prose change with no executable behavior.

**Implementation Notes:** Verified the caobunga lede-regex contract (`docs/EXTERNAL-AGENTS.md` §"Template labels") stays intact in `templates/tasknote-template.md`: `**Final Summary:**` still sits on its own line immediately preceded by a blank line and immediately followed by the lede paragraph placeholder, with no other content interposed. `SPEC.md` has no `**Final Summary:**` label to protect — that contract binds the template only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: two markdown-prose edits, no `viz/` or `tools/` code touched; AGENTS.md §"Validation" commands (`npm --prefix viz test`/`typecheck`/`lint`/`build`, `node --test`/`--check` on `tools/update-adopters.*`) exercise none of these paths.

- [x] Ran lint/type-check on changed code — N/A, same reason; no markdown linter is declared in the justfile or CI `validate` job.

- [x] **Verification receipt** — recorded below in Testing Notes. No avoidable duplication (the new item follows the exact bold-label/em-dash shape of its three siblings in both files); no dead code; no complexity; no public-surface growth beyond the one declared checklist box; no stale code-facing documentation introduced.

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend/rendered surface touched (markdown source only, not the visualizer).

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `git -C /Users/fakeneuron/Code/flowtron status --porcelain` (pre-flight, foreign-dirt gate) → exit 0, clean
- `git -C /Users/fakeneuron/Code/flowtron diff -- templates/tasknote-template.md SPEC.md` → exit 0; diff shows exactly the one added checklist line per file (plus SPEC.md's one added rationale paragraph), no other line touched
- Manual re-read of `templates/tasknote-template.md:93-106` and `SPEC.md:511-540` confirms: (1) wording matches PLAN.md CORE-658's quoted text verbatim, (2) `**Final Summary:**` in the template is still immediately preceded by a blank line and immediately followed by the lede paragraph placeholder with nothing interposed — the caobunga lede-regex contract (`docs/EXTERNAL-AGENTS.md` §"Template labels") holds

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 18 entries in `.flowtron/tasknote/README.md`
§"AI-referenced docs":

`README.md` no change · `AGENTS.md` no change · `SPEC.md` **updated** (the
edit target itself — new `**Learnings**` checklist item + rationale
paragraph, §"🚀 Phase 4: Closure") · `docs/MIGRATION.md` no change ·
`claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change ·
`cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change ·
`docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md`
no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no
change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no
change · `docs/EXTERNAL-AGENTS.md` no change (§"Template labels" still holds:
`**Final Summary:**` remains immediately followed by `**Archived:**` with
nothing interposed — the new box lands above the blank line preceding
`**Final Summary:**`, not between the two labels) · `docs/WORKTREES.md` no
change · `docs/VISION.md` no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — `N/A`. This task is itself the mechanism (adding the Learnings box), not an instance of using it; no separate durable insight surfaced beyond what's already captured in `SPEC.md`'s new rationale paragraph.

**Final Summary:** Added a fourth Phase 4 checklist item — `**Learnings**` —
to both `templates/tasknote-template.md` and `SPEC.md` §"🚀 Phase 4: Closure",
prompting closure to name any durable insight the always-loaded layer
(`AGENTS.md` / README §"AI-referenced docs") should carry, as flowtron's
push-memory counterpart to Phase 1's existing archive pull-memory
(`docs/HARNESS-SURVEY.md` gap #2).

Changed: 2 files, +1 line each (the checklist box) plus a 7-line rationale
paragraph in `SPEC.md` only (the template ships no explanatory prose for its
checklist items). Verification: `git diff` on both files confirmed the diff
is exactly the intended insertion (Testing Notes); no test suite applies to
a markdown-only change (N/A, recorded in Phase 3). No refactor made or
deferred — pure insertion following the existing bold-label/em-dash pattern.
Documentation verdict: this task's own deliverable *is* documentation; the
doc-drift sweep above found one deliberate update (`SPEC.md`, the edit
target) and no incidental drift elsewhere. `touches:` scope reconciliation:
declared `SPEC.md` and `templates/tasknote-template.md`; `git diff
--name-only` against the working tree (excluding this tasknote and its
PLAN.md row, per SPEC.md §"Scope reconciliation") matches exactly — no
undeclared paths. Maintainability effect: adds one recurring closure
question with a one-line answer (`N/A` is the common case); no new gate, no
new phase boundary, no runtime — pure prose contract per
`docs/VISION.md` §"What we won't accept".

**Archived:** 2026-09-22
