---
title: paste-block-fence-crlf
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-921, CORE-931.4, CORE-922]
touches:
  - tools/update-adopters/text.mjs
  - tools/update-adopters.test.mjs
  - SPEC/fixtures/workflow-block/cases.json
  - claude/skills/ft-update/SKILL.md
  - SPEC/layout.md
---

# CORE-930 | paste-block-fence-crlf

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-921]] · [[CORE-931.4]] · [[CORE-922]]

## 🎯 Goal

`workflowPasteBlock` reads the snippet's paste fence with the shared fence rules (`fenceOpeners`) so an inner fence no longer truncates the block, and a CRLF AGENTS.md gets a CRLF Workflow block; both behaviours are pinned in `SPEC/fixtures/workflow-block/cases.json`.

## ✅ Acceptance

- [x] A snippet whose paste fence holds an inner fence (```` ```sh ```` … ```` ``` ````) yields the whole block, not the text up to the inner fence — a `snippetCases` entry in `cases.json` — `node --test tools/update-adopters.test.mjs`
- [x] A ```` ````markdown ```` outer fence extracts; an unclosed paste fence, a ```` ```markdown ```` line nested inside an earlier fence, and a missing heading all read as `null` — same fixture + suite
- [x] A CRLF AGENTS.md (its `## Workflow` heading line ends in CR) is rewritten with the block in CRLF, separator blank line included, and no mixed endings; an LF file's bytes are unchanged (every existing case still passes) — same suite
- [x] The fixture `describes` states the extractor's fence rule and the CRLF rule; `claude/skills/ft-update/SKILL.md` Step 3.5 summary names both — `grep -q CRLF SPEC/fixtures/workflow-block/cases.json claude/skills/ft-update/SKILL.md`
- [x] Syntax and drift checks pass — `node --check tools/update-adopters/text.mjs` and `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `workflowPasteBlock`: open on the first column-0 ```` ```markdown ```` (or longer-backtick) line after the heading that `fenceOpeners` says opens a fence; close on the line before the first line outside that fence; null when it never closes
- [x] `replaceWorkflowSection`: when `lines[start]` ends in `\r`, write the block with `\r\n` separators and the separator after it as `\r\n`
- [x] `cases.json`: add `snippetCases` (snippet lines → block lines | null) and CRLF `cases`; extend `describes`
- [x] `update-adopters.test.mjs`: run `snippetCases` in the paste-block test; the existing follow-through harness already runs the CRLF cases (embedded `\r`)
- [x] `ft-update/SKILL.md` Step 3.5: one clause each for the fence rule and the CRLF rule
- [x] Run `node --test tools/update-adopters.test.mjs`, `node --check`, `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-921]] — parent; its External review surfaced both gaps
- [[CORE-931.4]] — moved the helpers into `tools/update-adopters/text.mjs`
- [[CORE-922]] — pinned the shared fence rules in `SPEC/fixtures/fence/cases.json`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are real in current code: `text.mjs:68-70` opens on `/^```markdown/` and closes on the first `/^```/` line with no fence awareness, and `replaceWorkflowSection` joins with bare `\n`, so a CRLF file gets LF block lines. The shipped snippet's paste fence holds no inner fence today (lines 15–31 of `claude/AGENTS-snippet.md`), so this is latent, not live.

- [x] Read relevant source files — `tools/update-adopters/text.mjs`, `tools/update-adopters.test.mjs` (paste-block + fixture tests), `SPEC/fixtures/workflow-block/cases.json`, `claude/skills/ft-update/SKILL.md` Step 3.5, `claude/AGENTS-snippet.md`, `apply.mjs` call sites.

- [x] **Best Practices Review** — `fenceOpeners` is already the one fence scan in `text.mjs` (used by `headingLines`, `snippetLinks`); reuse it, add no second scanner. The fixture is the byte contract `/ft-update` follows, so the rule lands in `describes` first and the skill summary only points at it ("the case wins").

- [x] **Archive skim** — `archive/core/` hits: CORE-921 (fixture + byte contract; External review findings), CORE-922 (fence fixture rules), CORE-931.4 (move into `text.mjs`), CORE-852.4 (original helpers). Nothing contradicts; CORE-922 confirms a `\r` after a closing fence counts as whitespace.

- [x] **Drift check** — PLAN line and sidequest stub match current code (`workflowPasteBlock` lives in `tools/update-adopters/text.mjs`); no other `workflowPasteBlock` caller than `apply.mjs:134`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked: CRLF rule → **match the file** (heading line ending in CR ⇒ block written CRLF). Assumptions: an LF file's bytes never change; a block that is already CRLF in an LF file is left as-is; the detector is the `## Workflow` heading line only, so a half-CRLF file follows its heading.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Discovery skipped the 🛠️ gate: no significant deviation (the Re-scope question was only the CRLF choice, answered above).

Carried from the retired sidequest stub:

> **Idea**
> `workflowPasteBlock` in `tools/update-adopters/text.mjs` (moved there by CORE-931.4) opens on a bare ```` ```markdown ```` line and closes on the first ```` ``` ```` line, ignoring the shared fence rules (`SPEC/fixtures/fence`, `fenceOpeners`), so a paste block holding an inner fence would be truncated in every adopter's AGENTS.md. Separately, a CRLF AGENTS.md gets LF Workflow lines (mixed endings). Use `fenceOpeners` for the extractor and pin both behaviours as cases in `SPEC/fixtures/workflow-block/cases.json`. Pre-existing; surfaced by CORE-921's External review.
>
> **Resume anchor**
> CORE-921 Phase 3 — External review findings being fixed or filed before Phase 4 closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: `workflowPasteBlock` now reuses `fenceOpeners` the way `snippetLinks` already does; `replaceWorkflowSection` gains an `eol` local, no new helper. Fixtures follow the existing `cases.json` shape (embedded `\r` as in the CORE-916 marker case); `snippetCases` is a sibling array run by one new test.
- Extractor: appends a `''` sentinel line so an unclosed paste fence is visible as a fence run that never ends (a closer on the snippet's last line still reads).
- Finding while writing cases: a same-length backtick fence line inside a ```` ```markdown ```` paste fence **closes** it (CommonMark) — so "an inner fence no longer truncates" holds for tilde fences and for a longer outer fence, not for a same-length backtick one. Pinned both ways in `snippetCases`; the snippet's own paste fence holds no inner fence today. Authors who need an inner backtick fence use a ```` ````markdown ```` outer fence, which now extracts.
- CRLF rule (operator choice): heading line ends in CR ⇒ block + separators CRLF; LF heading ⇒ LF unchanged.
- `drift-checks` `pair_q` failed once on the deleted-but-unstaged sidequest stub (git still listed it); staging the deletion cleared it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `node --test tools/update-adopters.test.mjs` → exit 0 (125 pass, 0 fail; includes the new `snippetCases` test and the 4 added CRLF `cases`)
- `node --check tools/update-adopters/text.mjs` → exit 0
- `grep -q CRLF SPEC/fixtures/workflow-block/cases.json` → exit 0; `grep -q CRLF claude/skills/ft-update/SKILL.md` → exit 0
- `bash tools/drift-checks.sh` → exit 0 (only pre-existing `NEAR CAP` notices on files this task did not touch); `node --test tools/drift-checks.test.mjs` → 49 pass, 0 fail
- No duplication, dead code, or stale docs: the one dead `end - 1 === open` guard was removed before the first run; `SPEC/layout.md`'s fixture line now names the snippet cases.

External review (`/code-review medium`, this task's working-tree diff vs HEAD): no blockers. Notes:

- **note — stray CR from a CRLF snippet checkout** → fixed: `block.replace(/\r$/, '')` before the CRLF join; pinned by the "a block already in CRLF is not doubled" case.
- **note — LF heading in a CRLF file stays LF (mixed endings)** → by design, the operator-confirmed rule is "the heading line decides" (Discovery assumptions); pinned by its own case and stated in `describes`. No change.
- **note — SKILL.md Step 3.5 clause vague** → fixed: names the 3+ backtick `markdown` opener and the closes-where-that-fence-does rule, re-wrapped.
- **note (pre-existing) — opener regex has no word boundary / column 0** and **heading matched inside a fence** → filed as CORE-937 (parked).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`workflowPasteBlock` now reads the snippet's paste fence by `fenceOpeners`' rules (only a line that opens a fence can be the paste fence; it closes where that fence does; an unclosed one is `null`), and `replaceWorkflowSection` writes the block in CRLF when the `## Workflow` heading line ends in CR (LF files byte-identical). Changed: `tools/update-adopters/text.mjs`, `tools/update-adopters.test.mjs`, `SPEC/fixtures/workflow-block/cases.json` (4 CRLF `cases`, new `snippetCases` ×9, `describes` extended), `claude/skills/ft-update/SKILL.md` Step 3.5, `SPEC/layout.md` fixture line. A same-length backtick fence inside a ```` ```markdown ```` paste fence still closes it (CommonMark); the shipped snippet has none, and ```` ````markdown ```` now works for authors who need one. Follow-up: CORE-937. `touches:` reconciled — `git diff --name-only` matches the declared list plus the closure files (PLAN, sidequest stub deletion/filing, this note).

**Archived:** 2026-11-24
