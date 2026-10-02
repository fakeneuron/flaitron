---
title: calibration-roster
status: completed
tags: []
created: 2026-10-02
due:
related-tasks:
  - CORE-676
  - CORE-684
  - CORE-482.2
touches:
  - docs/PLATFORMS.md
  - SPEC/model.md
  - claude/CAPABILITIES.md
---

# CORE-688 | calibration-roster

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-676]]

## 🎯 Goal

Re-check the calibration table's vendor tops and default-effort bands, then restamp it.

## ✅ Acceptance

- [x] The as-of line stamps the full table 2026-10-02 and no longer limits the recheck to the xAI row — `grep -F 'As of 2026-10-02' docs/PLATFORMS.md`
- [x] The roster cells name Fable 5.1, Opus 5.5, Sonnet 5.5, GPT-6 Astra, GPT-6.1 Sol, Grok 4.7, Gemini 3.1 Pro, and Gemini 3.8 Flash — `grep -F 'Fable 5.1' docs/PLATFORMS.md` and `grep -F 'Gemini 3.8 Flash' docs/PLATFORMS.md`
- [x] Opus 5.5's default effort is `medium` and Sol's default effort is `medium` — `grep -F 'default \`medium\`' docs/PLATFORMS.md`
- [x] Family tokens stay `fable` / `opus` / `sonnet` / `gpt-5` / `codex` / `grok` / `gemini-pro` / `gemini-flash` — `judgment` (the token column is the PLAN vocabulary; generation numbers live in the roster cell)
- [x] `SPEC/model.md`'s effort-axis sentence no longer says `xhigh` is the recommended coding setting for the current Claude family — `grep -F 'xhigh\` the recommended setting for coding' SPEC/model.md` exits 1

## 🧩 Subtasks

- [x] Update the eight roster, ladder, band, and equivalence cells and the as-of stamp
- [x] Align the Codex effort-trigger cell in the same file with the new ladder
- [x] Correct the two falsified clauses in `SPEC/model.md` §"Effort axis"
- [x] Grep-verify the acceptance commands

## 🔗 Related

- [[CORE-676]] — predecessor; rechecked only the xAI row on 2026-10-02 and left the full-table stamp at 2026-08-27 (`related-decision:`)
- [[CORE-684]] — v5.34.0 cut that filed this row from audit-docs Finding #4 (`related-decision:`)
- [[CORE-482.2]] — wrote the table, as of 2026-08-27 (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The stamp and six of eight roster cells are behind the vendor pages read on 2026-10-02. The row is still the right fix.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Area `core` from `.flowtron/tasknote/README.md` §"Archive layout". Model tag `[medium]` matches this Grok session's medium tier. Working tree was clean. `## Completed` holds 50 checked rows, under the rotation advisory.

Read `docs/PLATFORMS.md` §"Platform×model×effort calibration table", `SPEC/model.md` §"Category-vs-concrete matching" and §"Effort axis", and the Codex effort trigger in the same platforms file. Vendor pages read 2026-10-02: Anthropic models overview and effort guide; Fable 5.1 overview; OpenAI latest-model guide, GPT-6 Astra model page, and the Codex models page; xAI reasoning and Grok 4.7 pages; Google Cloud thinking-level table and the Gemini 3.1 Pro page; DeepMind's Gemini 3.1 Deep Think page.

**Roster drift.** Fable 5.1 (Mythos 5.1 is the Glasswing sibling) replaces Fable 5. Opus 5.5 replaces Opus 5 and defaults to `medium` (Opus 5 and earlier still default to `high`). Sonnet 5.5 replaces Sonnet 5 and still defaults to `high`. OpenAI's current tops are GPT-6 Astra, GPT-6.1 Sol (API default `medium`), and GPT-6 Luna. Codex the product recommends those same models; Astra's recommended start there is Light (`low`). Grok 4.7 is unchanged from [[CORE-676]]. Gemini 3.1 Pro is still the Pro top (preview) and Deep Think is still a mode above it; its ladder is now `low`/`medium`/`high`, default `high`. Gemini 3.8 Flash replaces 3.7 Flash, default `medium`.

**Bands.** `fable` and `opus` stay heavy at their defaults, including Opus 5.5 at `medium`. `sonnet` stays medium on purpose (`SPEC/model.md` holds that family at medium). Astra stays heavy as the flagship; Sol stays medium; Luna stays light. The `codex` row's recommended start (Astra at Light, or Sol at `medium`) stays medium-band. Grok stays medium. Gemini Pro stays heavy; Flash stays medium and Flash-Lite stays light. The old "Fable is heavy at every effort, and `fable@low` beats a prior `xhigh`" sentence is sourced for Fable 5, not Fable 5.1, so the equivalence cell no longer states it.

**N/A** best-practices review: this is a dated-facts table, not a module boundary.

Archive: [[CORE-676]] left the 2026-08-27 stamp on purpose. [[CORE-482.2]] created the table and the family tokens. [[CORE-604.3]] moved the table here and dropped the unused `haiku` row. Tokens stay; generation numbers stay in the roster cell. `gpt-5` remains the PLAN token while the cell names GPT-6, same way `opus` survived the 4.x → 5 move. No clarifications needed. Discovery surfaced no significant deviation → skip 🛠️.

**Drift:** the cited path and the 2026-08-27 stamp match. The plan does not contradict `SPEC/model.md`'s "table calibrates, gate does not require a lookup" rule. Two clauses in §"Effort axis" are now false (`xhigh` as the coding recommendation; Codex's general `none`/`minimal` ladder) and are in scope as the same vendor facts. Assumption: do not rename family tokens, do not add a `haiku` row, do not edit historical session sentences.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the existing eight-row table. Roster and ladder cells now name the 2026-10-02 tops; bands stay on the same families. The as-of line is a full-table stamp, so the xAI-only recheck clause is gone. The Grok row is unchanged. The Codex effort trigger in the same file, `SPEC/model.md` §"Effort axis", and `claude/CAPABILITIES.md`'s effort cell each restated the old "xhigh is the coding default" or `none`/`minimal` ladder, so those three clauses now match the table. No new section. No refactor. Tests N/A — the verify commands are greps over the prose facts.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted tests and lint/type-check: N/A — prose-only edit, no code. Structural half: N/A — table cells plus three sentences that restated the same ladder; no code duplication or public-surface growth. Frontend 👁️: N/A — not a UI change.

Verification receipt:

- `grep -F 'As of 2026-10-02' docs/PLATFORMS.md` → 0
- `grep -F 'Fable 5.1' docs/PLATFORMS.md` → 0
- `grep -F 'Gemini 3.8 Flash' docs/PLATFORMS.md` → 0
- `grep -F 'default \`medium\`' docs/PLATFORMS.md` → 0 (Opus 5.5, Sol, and Gemini 3.8 Flash)
- `grep -F 'xhigh\` the recommended setting for coding' SPEC/model.md` → 1
- `grep -F 'As of 2026-08-27' docs/PLATFORMS.md` → 1
- Family-token rows still `fable` / `opus` / `sonnet` / `gpt-5` / `codex` / `grok` / `gemini-pro` / `gemini-flash` — judgment, read off the table

External review (read-only subagent, `docs/PLATFORMS.md` + `SPEC/model.md`): blockers none, notes none, verdict pass. The `claude/CAPABILITIES.md` clause was aligned after that review, during the doc-drift sweep, to the same sentence the review had already accepted in `SPEC/model.md`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The calibration table now names the 2026-10-02 tops and stamps the whole table. Bands are unchanged: Fable and Opus heavy (Opus 5.5 stays heavy at its new `medium` default), Sonnet medium, Astra heavy / Sol medium / Luna light, Codex medium at its recommended start, Grok medium, Gemini Pro heavy, Flash medium. Family tokens did not move. `docs/PLATFORMS.md` (table + Codex effort trigger), `SPEC/model.md` (effort-axis sentence), `claude/CAPABILITIES.md` (the same sentence). Grep receipt all as recorded above. No refactor. Doc-drift: `docs/PLATFORMS.md` and `claude/CAPABILITIES.md` updated; `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` no change. `SPEC/model.md` is outside the sweep set and was edited because its effort-axis sentence stated the same vendor fact. `touches:` is those three paths; the tasknote and PLAN row are the closure pair. A chooser reading the table no longer treats August's roster as current. Learnings: N/A.

**Archived:** 2026-10-02
