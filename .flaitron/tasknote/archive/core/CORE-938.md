---
title: paste-block-heading-anchor
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-937, CORE-930]
touches:
  - tools/update-adopters/text.mjs
  - SPEC/fixtures/workflow-block/cases.json
  - claude/skills/ft-update/SKILL.md
---

# CORE-938 | paste-block-heading-anchor

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-937]]

## 🎯 Goal

`workflowPasteBlock` takes the `## Block to paste into AGENTS.md` heading only when that is the whole line (trailing whitespace or CR allowed), and takes a paste fence whose backticks are followed by optional spaces/tabs before `markdown`.

## ✅ Acceptance

- [x] `## Block to paste into AGENTS.md (legacy)` and `…AGENTS.mdx` are not the heading (a snippet with only those reads `null`); the exact heading with trailing spaces, tabs, or a CR still is — `node --test tools/update-adopters.test.mjs`
- [x] ```` ``` markdown ```` (spaces or a tab between the backticks and `markdown`) is the paste fence; ```` ``` markdownish ```` and ```` ``` markdown-example ```` are not — `node --test tools/update-adopters.test.mjs`
- [x] Each behaviour is a `snippetCases` entry in `SPEC/fixtures/workflow-block/cases.json` that fails on the pre-fix code and passes after — `node --test tools/update-adopters.test.mjs`
- [x] The rule's prose (`describes` key, `ft-update` Step 3.5) matches the code — `judgment`: prose, no command decides it
- [x] Syntax checks and the drift roster stay green — `node --check tools/update-adopters/text.mjs && bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the new `snippetCases` entries to `cases.json` and confirm the right ones fail on current code
- [x] `text.mjs`: anchor the heading regex like `WORKFLOW_HEADING` (`[ \t]*\r?$`); opener regex takes `[ \t]*` before `markdown`
- [x] Extend the fixture's `describes` text and `ft-update` Step 3.5's clause to name both rules
- [x] Run the updater suite, syntax checks, and `drift-checks.sh`

## 🔗 Related

- [[CORE-937]] — parent; its External review found both looseness points; it kept the opener at column 0 and strict on the first word
- [[CORE-930]] — wrote the `fenceOpeners`-based reader and the first `snippetCases`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are live in current `text.mjs:73,75`: the heading regex is `/^## Block to paste into AGENTS\.md/` (no end anchor, so a suffixed heading matches) and the opener is `/^`{3,}markdown(?=\s|$)/` (no allowance for CommonMark's optional space). Neither is reachable from the shipped snippet today, so this is latent hardening, not a live bug.

- [x] Read relevant source files — `tools/update-adopters/text.mjs` (`WORKFLOW_HEADING`, `FENCE`, `fenceOpeners`, `workflowPasteBlock`), `SPEC/fixtures/workflow-block/cases.json` (`describes`, `snippetCases`), the suite's two `workflowPasteBlock` tests (`tools/update-adopters.test.mjs:1085`, `:1107`), `ft-update` SKILL.md Step 3.5.

- [x] **Best Practices Review** — N/A: a two-regex change inside one pure function; no module boundary touched. The heading anchor reuses `WORKFLOW_HEADING`'s `[ \t]*\r?$` shape.

- [x] **Archive skim** — `archive/core/` hits for `text.mjs` / `workflow-block/cases.json`: CORE-921 (fixture), CORE-930 (reader + first `snippetCases`), CORE-931.4 / .N (module move), CORE-937 (parent). Only CORE-930 and CORE-937 bear on this. CORE-937 asked about 1–3 *leading* spaces and ruled **column 0 stays**; this task's space is *after* the backticks, a separate question.

- [x] **Drift check** — PLAN row, sidequest stub, and code agree. The stub's heading anchor (`[ \t]*\r?$`) matches `WORKFLOW_HEADING`. The existing test at `update-adopters.test.mjs:1089` uses `## Block to copy` as the negative, unaffected by an end anchor. Fixture `describes` currently says "starts at column 0 with 3+ backticks … and `markdown` as the first word of its info string", and `ft-update` Step 3.5 repeats it: both need the optional-space wording. Existing case "a markdown opener may carry … a CR" has a CR on the heading line, which the anchor must still accept.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked: accept CommonMark's optional space after the backticks? **Yes — spaces and tabs (`[ \t]*`).** Assumptions: column 0 stays (CORE-937); backtick-only (no `~~~markdown`); the first-word rule is unchanged (`markdown` then whitespace or EOL, so ```` ``` markdownish ```` is still not the fence); a backtick-fence info string still may not contain a backtick, which `fenceOpeners` already enforces before the opener regex runs.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Discovery surfaced no significant deviation. Carried from the retired sidequest stub:

> **Idea.** Two pre-existing looseness points in `workflowPasteBlock` (`tools/update-adopters/text.mjs`), found in CORE-937's External review. (1) The `/^## Block to paste into AGENTS\.md/` heading regex has no end anchor, so `## Block to paste into AGENTS.md (legacy)` or `…AGENTS.mdx` is taken as the heading; anchor it like `WORKFLOW_HEADING` (`[ \t]*\r?$`). (2) The opener `/^`{3,}markdown(?=\s|$)/` rejects CommonMark's optional space after the backticks (```` ``` markdown ````), which `FENCE` and `fenceOpeners` accept; decide whether to allow it. Pin both in `SPEC/fixtures/workflow-block/cases.json` `snippetCases`, and update the fixture's `describes` text and `ft-update` Step 3.5.
>
> **Resume anchor.** CORE-937 Phase 3 — External review notes fixed or filed; next the Phase 3 receipt and Phase 4 closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: the heading regex now ends in `[ \t]*\r?$`, the shape of `WORKFLOW_HEADING`; the opener regex gained `[ \t]*` before `markdown`. No new shape, no refactor. Seven `snippetCases` added (suffixed heading, `.mdx` heading, suffixed heading skipped for a later exact one, trailing space/tab on the heading, space and tab before `markdown`, space before `markdownish` / `markdown-example` still rejected). Prose updated in `text.mjs`'s header comment, the fixture's `describes`, and `ft-update` Step 3.5.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test --test-name-pattern=workflowPasteBlock tools/update-adopters.test.mjs` with `text.mjs` stashed → exit 1; first failure `actual '## Workflow\nBody.', expected null` (the suffixed-heading case; the loop stops at the first failure, and the opener cases fail by construction since the old regex has no `[ \t]*`). With the fix → 2 of 2 pass.
- `node --test tools/update-adopters.test.mjs` → exit 0, 125 of 125 pass.
- `node --check tools/update-adopters/text.mjs` → exit 0.
- `bash tools/drift-checks.sh` → every check ok except `pair_q`, which fails only because the deleted sidequest stub is unstaged (`awk: can't open file .flaitron/sidequest/CORE-938.md`); with the deletion staged `pair_q ok`. The closure commit stages it.
- Prose criterion: `describes`, `ft-update` Step 3.5 and the `text.mjs` comment checked against the regexes by reading.
- Frontend 👁️ box: N/A, no UI.

**External review** (`/code-review medium`, over this task's diff only): no correctness findings; three notes. (1) Step 3.5 prose omitted the skip-a-suffixed-heading rule → fixed. (2) The rewrapped Step 3.5 line ran long → fixed by rewrapping (the `markdownish` example was left out; "first word" already covers it). (3) The opener regex duplicates part of `FENCE`'s grammar → no change: a single added `[ \t]*`, deriving it from `FENCE` would be new abstraction.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`workflowPasteBlock` now takes the `## Block to paste into AGENTS.md` heading only as a whole line (trailing spaces, tabs or a CR allowed), so a `(legacy)` or `.mdx` suffix is no longer the heading, and it accepts CommonMark's optional spaces or tabs between the backticks and `markdown` in the paste fence.

- **Changed:** `tools/update-adopters/text.mjs` (two regexes, header comment), `SPEC/fixtures/workflow-block/cases.json` (`describes` + 7 `snippetCases`), `claude/skills/ft-update/SKILL.md` (Step 3.5 clause); the sidequest stub `.flaitron/sidequest/CORE-938.md` retired into Discovery Notes.
- **Verification:** updater suite 125 of 125; `node --check` clean; drift roster ok (pair_q clears on staging the stub deletion); new cases fail on the pre-fix code.
- **Doc-drift sweep:** no change to any swept doc; the only other copy of the opener wording is the `ft-update` Step 3.5 clause, updated here.
- **`touches:` reconciliation:** `git diff --name-only` matches the declared three paths plus the stub deletion.
- **Decision:** space after the backticks is accepted (operator-confirmed); column 0 and backtick-only stay per CORE-937.
- **Learnings:** N/A.

**Archived:** 2026-11-24
