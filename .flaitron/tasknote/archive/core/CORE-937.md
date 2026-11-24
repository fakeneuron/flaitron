---
title: paste-block-opener-strict
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-930]
touches:
  - tools/update-adopters/text.mjs
  - SPEC/fixtures/workflow-block/cases.json
  - claude/skills/ft-update/SKILL.md
---

# CORE-937 | paste-block-opener-strict

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-930]]

## 🎯 Goal

`workflowPasteBlock` takes a paste fence only when its info string's first word is exactly `markdown`, and takes the `## Block to paste into AGENTS.md` heading only when it sits outside a fence.

## ✅ Acceptance

- [x] A ```` ```markdown-example ```` line (and ```` ```markdownish ````) after the heading is not the paste fence; ```` ```markdown ```` with a trailing CR, a tab, or an info-string attribute (```` ```markdown title ````) still is — `node --test tools/update-adopters.test.mjs`
- [x] A `## Block to paste into AGENTS.md` line inside an earlier fenced block is skipped: the first unfenced heading's fence is read, and a snippet with only a fenced heading reads `null` — `node --test tools/update-adopters.test.mjs`
- [x] Each behaviour is a `snippetCases` entry in `SPEC/fixtures/workflow-block/cases.json` that fails on the pre-fix code and passes after — `node --test tools/update-adopters.test.mjs`
- [x] The rule's prose (`describes` key, `ft-update` Step 3.5) matches the code — `judgment`: prose, no command decides it
- [x] Syntax checks and the drift roster stay green — `node --check tools/update-adopters/text.mjs && bash tools/drift-checks.sh`

## 🧩 Subtasks

- [ ] Add the new `snippetCases` entries to `cases.json` and confirm they fail on current code
- [ ] `text.mjs`: opener regex requires `markdown` to end the info string's first word; heading search requires `openers[i] === -1`
- [ ] Extend the fixture's `describes` text and `ft-update` Step 3.5's clause to name both rules
- [ ] Run the updater suite, syntax checks, and `drift-checks.sh`

## 🔗 Related

- [[CORE-930]] — parent; its External review found both looseness points (`workflowPasteBlock` fence reading, fixture `snippetCases`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are live in current `text.mjs:71-73`: the opener is `/^`{3,}markdown/` (no end-of-word check) and the heading is found with no fence check. Neither is reachable from the shipped snippet today, so this is latent hardening, not a live bug.

- [x] Read relevant source files — `tools/update-adopters/text.mjs` (`fenceOpeners`, `workflowPasteBlock`), `SPEC/fixtures/workflow-block/cases.json`, the suite's `snippetCases` loop (`tools/update-adopters.test.mjs:1107`), `ft-update` SKILL.md Step 3.5.

- [x] **Best Practices Review** — N/A: a two-line change inside one pure function; no module boundary touched. It reuses `fenceOpeners`, which already answers both questions.

- [x] **Archive skim** — `archive/core/` hits for `text.mjs`: CORE-930 (parent; wrote the `fenceOpeners`-based reader and the nine `snippetCases`), CORE-931.3/.4/.5/.7/.8/.N (the module move and its audit). Only CORE-930 bears on this change; no decision conflicts.

- [x] **Drift check** — PLAN row says "add a word boundary", but `\b` matches between `n` and `-`, so it would not reject `markdown-example`, the stub's own example. The opener needs an end-of-first-word lookahead (`(?=\s|$)`) instead. Everything else cited matches current code. The row's two asks and the fixture/`describes` text agree with `SPEC/layout.md`'s fixture line (no edit needed there).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked: should the opener also accept 1–3 leading spaces (the stub notes `FENCE` allows them)? **No — strict opener only; column 0 stays.** Assumptions: the paste fence stays backtick-only (a `~~~markdown` fence is still not one); the first-word rule is `markdown` followed by whitespace or end of line, a CR counting as whitespace.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea.** `workflowPasteBlock` in `tools/update-adopters/text.mjs` has two pre-existing looseness points, found in CORE-930's External review. (1) The paste-fence opener regex `/^`{3,}markdown/` has no word boundary, so a ```` ```markdown-example ```` fence is taken as the paste fence; it also requires column 0 where `FENCE` allows 3 spaces. (2) The `## Block to paste into AGENTS.md` heading is matched even inside an earlier fenced block; require `openers[i] === -1`. Pin both in `SPEC/fixtures/workflow-block/cases.json` `snippetCases`.
>
> **Resume anchor.** CORE-930 Phase 3 — External review notes being fixed or filed before Phase 4 closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern: `fenceOpeners` already answers "is this line inside a fence" and "does this line open one"; both fixes read it, and the new lookahead follows the `/^sh\b/` info-string reads in `snippetLinks`.

- [x] **Minimal refactor gate** — no refactor needed; two regex/predicate edits in one function. The unanchored heading regex and the space-before-info-string opener are pre-existing and out of the row's scope → filed as CORE-938.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — six new `snippetCases` (`markdown-example`; `markdownish`/`-example` skipped for a later real fence; CR + `markdown title`; tab; fenced heading → `null`; fenced heading skipped for the first unfenced one).

**Implementation Notes:**

- `text.mjs` heading search: `openers[i] === -1 &&` added, so a heading line inside a fence (fence lines included) never counts; the opener regex gained `(?=\s|$)` after `markdown` (a CR is whitespace, so CRLF snippets still read).
- `\b` would not have rejected `markdown-example` (`n`→`-` is a word boundary), so the row's "word boundary" is implemented as an end-of-first-word lookahead.
- The first new case (`markdown-example`) failed on the pre-fix code (`AssertionError … not the paste fence (CORE-937)`) before the edit.
- Prose updated to match: `describes` key in `cases.json`, `ft-update` SKILL.md Step 3.5 (unfenced heading, column 0, backticks not tildes, `markdown` as the first info word).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — see Testing Notes; no duplication, dead code or stale docs in the changed path (swept docs name no paste-fence rule beyond the two edited prose spots).

- [x] **External review** — `/code-review medium` over this task's working-tree diff; dispositions in Testing Notes (no blocker).

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
node --test tools/update-adopters.test.mjs   → 0   (125 tests, 125 pass; new cases fail pre-fix)
node --check tools/update-adopters/text.mjs  → 0
python3 -c "json.load(cases.json)"           → 0
bash tools/drift-checks.sh                   → 0   (no FAILED; NEAR CAP notes are pre-existing, none for touched files)
```

`pair_q` failed once while the sidequest stub's deletion sat unstaged (a tracked path missing on disk); it passes with the deletion staged — a transient of the promotion step, not of the diff.

External review (`/code-review medium`, no blocker):

- **note (pre-existing) — `## Block to paste into AGENTS.md` regex has no end anchor** → filed as [[CORE-938]].
- **nit — opener rejects CommonMark's optional space after the backticks** → filed in CORE-938 (the old regex rejected it too).
- **nit — Step 3.5 reflow left a long line and omitted column-0 / backtick-only** → fixed: rewrapped; column-0 and backtick-only clauses added to Step 3.5 and `describes`.
- **nit — no tab case; suffix/heading boundary cases** → tab case added; heading-suffix cases belong to CORE-938.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `.flaitron/tasknote/README.md` §"AI-referenced docs": no change — none of the listed docs states the paste-fence opener or heading rule (`docs/PLATFORMS.md` and `docs/MIGRATION.md` only name the "Block to paste" section).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-24.` stub at top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — N/A: nothing durable beyond the `\b` vs `-` point, which the fixture now pins.

**Final Summary:**

`workflowPasteBlock` now takes a paste fence only when `markdown` is the first word of its info string (```` ```markdown-example ```` is not one), and only reads a `## Block to paste into AGENTS.md` heading that sits outside a fence. Changed: `tools/update-adopters/text.mjs` (+2 predicate edits, comment), `SPEC/fixtures/workflow-block/cases.json` (+6 `snippetCases`, `describes` extended), `claude/skills/ft-update/SKILL.md` Step 3.5 prose. Verified: updater suite 125/125, `node --check` 0, `drift-checks.sh` clean. External review: no blocker; two pre-existing looseness points filed as CORE-938. Scope: declared 3 files, changed 3 plus the closure files. Undeclared: `.flaitron/sidequest/CORE-938.md` (the follow-up filing).

**Archived:** 2026-11-24
