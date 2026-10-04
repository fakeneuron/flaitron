---
title: submodule-archive-exclusion-guidance
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-632, CORE-632.2, CORE-632.N]
touches:
  - docs/MIGRATION.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - claude/skills/ft-new-project/SKILL.md
---

# CORE-632.3 | submodule-archive-exclusion-guidance

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-632]]

## 🎯 Goal

Tell adopters to exclude `.flowtron/core/.flowtron/` (flowtron's dogfood archive) from search and context tooling — a `docs/MIGRATION.md` §1 bullet, one line in each of the four `AGENTS-snippet.md` files, and a matching deposit step in `/ft-new-project`.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.1 names `.flowtron/core/.flowtron/` as the path to exclude, with the per-tool mechanism (Claude Code `Read` deny rule, Cursor `.cursorignore`, ripgrep `.ignore`) — `grep -c 'flowtron/core/.flowtron/' docs/MIGRATION.md` ≥ 3 and `grep -q 'Read(./.flowtron/core/.flowtron/\*\*)' docs/MIGRATION.md`
- [x] Each of the four `AGENTS-snippet.md` files carries one wiring-section line naming `.flowtron/core/.flowtron/` and pointing at MIGRATION §1.1 — `for f in claude codex cursor grok; do grep -q 'flowtron/core/.flowtron/' $f/AGENTS-snippet.md || echo MISSING $f; done` prints nothing
- [x] No added snippet line contains the literal `ln -s` (the roster parser in `tools/update-adopters.mjs` and `/ft-update` Step 4 key on it) — `git diff -U0 -- '*/AGENTS-snippet.md' | grep '^+' | grep -c 'ln -s'` → 0
- [x] `/ft-new-project` has a deposit step writing the exclusion (deny rule + `.ignore`, `.cursorignore` when present), its Step 7 stages the files it created, and the Notes "touches no existing file" claim is updated — `grep -q 'flowtron/core/.flowtron/' claude/skills/ft-new-project/SKILL.md`; `judgment` for the staging/Notes coherence
- [x] `.claudeignore` is not named as a Claude Code mechanism anywhere in the deliverables (Claude Code has no such file) — `git diff -U0 | grep '^+' | grep -c claudeignore` → 0, or only in a sentence saying it does not exist
- [x] Budget: `claude/skills/ft-new-project/SKILL.md` stays under the 33,000 `SKILL.md` cap — `wc -c claude/skills/ft-new-project/SKILL.md`
- [x] Fleet suite still green (the snippet wiring blocks are parsed by it) — `node --test tools/update-adopters.test.mjs` → exit 0

## 🧩 Subtasks

- [x] `docs/MIGRATION.md` §1.1 — add the "keep the dogfood archive out of search and context tooling" block with the per-tool list; §1.6 — one sentence staging the files §1.1 created
- [x] `claude/AGENTS-snippet.md` §"One-time symlink wiring" — one prose line after the `ln -s` block (Claude Code deny rule; pointer to MIGRATION §1.1)
- [x] `codex/` · `cursor/` · `grok/AGENTS-snippet.md` wiring sections — mirrored one-liner each, platform mechanism substituted (`.ignore` / `.cursorignore` / `.ignore`)
- [x] `claude/skills/ft-new-project/SKILL.md` — insert "Step 3b — Fence the submodule's dogfood archive" (deny rule merge + `.ignore` + `.cursorignore`-when-present), extend Step 7 staging, fix the Notes "touches no existing file" claim
- [x] Run the Acceptance verify commands; record the receipt

## 🔗 Related

- [[CORE-EPIC-632]] — parent epic (adopter-footprint)
- [[CORE-632.2]] — predecessor (readme-logo-webp); the other footprint child
- [[CORE-632.N]] — follow-up audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and measured on a live adopter (`~/Code/natabula/.flowtron/core/.flowtron/` = 14 MB / 986 files today); no doc, snippet, or `/ft-new-project` step mentions it. One description-level correction (the `.claudeignore` example — see Drift check) changes which mechanism the guidance names, not the deliverables.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Source read.** `docs/MIGRATION.md` §1.0–1.7 (§1.1 adds the submodule and is the natural home; §1.6 stages by explicit path and derives the symlink list from the snippet — no roster to touch); `claude/AGENTS-snippet.md` (paste-block + §"One-time symlink wiring", whose derived-surface table names the three sibling wiring blocks + MIGRATION §1.6 + `/ft-new-project` Steps 7–8 as derived from the `ln -s` block); `codex/` · `cursor/` · `grok/AGENTS-snippet.md` (each says *"Use the block in `../claude/AGENTS-snippet.md` … Do not maintain a second copy here"* — the paste-block is **not** mirrored, only the wiring sections are); `claude/skills/ft-new-project/SKILL.md` (Steps 0–8 + Notes; Notes claims "does not touch existing files except `AGENTS.md`"); `tools/update-adopters.mjs:443` keys the roster parser on lines containing the literal `ln -s` — added prose must avoid that token.
- **Shipped references into the archive.** Exactly two: `claude/AGENTS-snippet.md:121` and `docs/MIGRATION.md:502` (§"Pinning and bumping") both point at the per-release tasknote in `.flowtron/core/.flowtron/tasknote/archive/core/` for major bumps. `/ft-update` itself does not read the archive. A Claude Code `Read` deny rule fences that one documented read; the annotated tag message carries the same migration steps — recorded as the rule's one cost in the guidance.
- **Best Practices Review** — N/A for code; doc/skill surfaces only. Boundary respected: the `ln -s` roster block stays untouched; the new line sits in prose after it. The three sibling wiring sections are already per-platform prose, so one substituted line each is the established shape (same as the Cursor/Grok notes in `/ft-new-project` Step 3).
- **Archive skim** — `archive/core/` confirmed against the README table. `grep -l 'claudeignore\|cursorignore' archive/core/*.md` → `CORE-483.3`, `CORE-483.N` only: the screenshot-discipline epic, which touched natabula's `configs/.claudeignore` / `.cursorignore` deposits (identical `.flowtron/screenshots/` line) and routed adopter-side ignore-file drift to `/natabula-layer-drift`. No prior note touches `.flowtron/core/.flowtron/` exclusion; no decision blocks this task. Sibling `CORE-632.2` (logo webp) has no Fan-out and does not touch these paths. Natabula's deposits (`configs/.claudeignore`, `configs/.cursorignore`) do not yet carry the submodule-archive line — adopter-layer, outside this repo's remit; noted for the recap.
- **Drift check.** (1) **`.claudeignore` does not exist in Claude Code** — verified 2026-09-20 against `code.claude.com/docs/en/permissions`: the documented control is a `Read(./path/**)` deny rule in `.claude/settings.json` (*"To block Claude's file tools from reading a file or directory, add a `Read` deny rule … Claude makes a best-effort attempt to apply `Read` rules to all built-in tools that read files like Grep and Glob, to `@file` mentions"*). Deny rules do not cover `grep -r pattern .` run from a directory that holds the file. Flowtron's own root `.claudeignore` (`SCRATCH.md`, from CORE-029) and the natabula deposits are therefore inert for Claude Code. The PLAN line's example is corrected in the deliverables, not propagated. (2) The PLAN line's "mirrored to the codex / cursor / grok snippets" only holds for the wiring sections — the paste-block is single-copy by design; placement resolved by the operator (below). (3) Figures: the epic's "12.5 MB / 987 files" is flowtron-self's own `.flowtron/`; a live adopter today measures 14 MB / 986 files — the guidance says "~14 MB, ~1,000 files". (4) "flowtron-self needs nothing" still true — no `.flowtron/core/` here. No SPEC contract touched; the PLAN line's deliverable set is unchanged.
- **Clarifications (AskUserQuestion, 2026-09-20).** Operator chose: **Claude Code mechanism = `Read` deny rule** (named with its one cost, not `.claudeignore`); **placement = one line in each of the four wiring sections**, pointing at MIGRATION §1.1 for the per-tool detail — nothing added to the always-loaded paste-block. Explicit assumptions: Cursor's `.cursorignore` blocks both indexing and AI access (Cursor docs); ripgrep honors a root `.ignore` for descendants including submodule directories; `.gitignore` is the wrong file because the path is tracked content. `/ft-new-project`'s deposit gets its own `Step 3b` heading rather than renumbering Steps 4–8 (the derived-surface table in the snippet cites "Steps 7–8" by number).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only deliverables; the existing fleet suite covers the snippet wiring blocks the prose sits next to

**Implementation Notes:**

- **Pattern survey.** The three sibling wiring sections already carry per-platform prose around a substituted `ln -s` block, so one substituted paragraph per platform is the established shape; the paste-block was left untouched (single-copy, always-loaded). `/ft-new-project` gets a `Step 3b` heading between Steps 3 and 4 rather than a renumber — the snippet's derived-surface table cites "Steps 7–8" by number. No refactor; nothing adjacent touched.
- `docs/MIGRATION.md` §1.1 — new bold-led paragraph + three-bullet per-tool list (Claude Code `Read` deny rule with a pasteable JSON fragment and its one cost; Cursor `.cursorignore`; ripgrep `.ignore`, with the "`.gitignore` is the wrong file" note); §1.6 — one sentence staging the created files; §"Pinning and bumping" step 1 — one clause naming the deny-rule fence and the tag-message fallback.
- `claude/AGENTS-snippet.md` §"One-time symlink wiring" — one paragraph after the "Commit the symlinks" line (deny rule + pointer). `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — the same paragraph with the platform mechanism substituted (`.ignore` / `.cursorignore` / `.ignore`) and a relative `../docs/MIGRATION.md` §1.1 pointer. None of the added lines contains the literal `ln -s` the roster parser keys on.
- `claude/skills/ft-new-project/SKILL.md` — `## Step 3b — Fence the submodule's dogfood archive` (deny-rule merge-not-overwrite, `.ignore` append, `.cursorignore` when present or Cursor-only, the cost surfaced to the user); Step 7 staging sentence; Notes "touches no existing file" claim corrected to name the three merge targets. 11,522 → 12,969 bytes, well under the 33,000 cap.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (parses the snippet wiring blocks the added prose sits beside)

- [x] Ran lint/type-check on changed code — N/A: markdown-only; no markdown linter configured in this repo (per `docs/MIGRATION.md` §1.2.2); re-read each diff hunk instead

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (2026-09-20):

- `grep -c 'flowtron/core/.flowtron/' docs/MIGRATION.md` → 4 (≥ 3) · `grep -q 'Read(./.flowtron/core/.flowtron/\*\*)' docs/MIGRATION.md` → 0
- `for f in claude codex cursor grok; do grep -q 'flowtron/core/.flowtron/' $f/AGENTS-snippet.md || echo MISSING $f; done` → no output
- `git diff -U0 -- '*/AGENTS-snippet.md' | grep '^+' | grep -c 'ln -s'` → 0
- `grep -q 'flowtron/core/.flowtron/' claude/skills/ft-new-project/SKILL.md` → 0; Step 7 staging sentence and Notes claim re-read — coherent (judgment)
- `git diff -U0 | grep '^+' | grep -c claudeignore` → 1, and that line is *"there is no `.claudeignore`"* — the permitted form
- `wc -c claude/skills/ft-new-project/SKILL.md` → 12,969 (cap 33,000)
- `node --test tools/update-adopters.test.mjs` → exit 0 (54 pass / 0 fail)

Structural quality: no duplication beyond the deliberate four-way mirrored paragraph (each names its own platform mechanism and points at the single detailed list in MIGRATION §1.1 rather than restating it); no dead references (`§1.1`, `§1.6`, `§"Pinning and bumping"`, `Step 3b`, `Step 3` all resolve); no public-surface growth beyond the one new skill step; the stale `/ft-new-project` Notes claim was corrected in the same change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `docs/MIGRATION.md` — updated (§1.1 exclusion block, §1.6 staging sentence, §"Pinning and bumping" clause); `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — updated (one wiring-section paragraph each). No change: `README.md` (its headline archive claim still stands — the archive stays where it is), `AGENTS.md`, `SPEC.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (the deny rule is named only on Claude-owned surfaces and in a per-tool list that also names Cursor and ripgrep), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

**Recap.** Six files, +49 / −4 lines, all markdown. Adopters now get the exclusion in three places: `docs/MIGRATION.md` §1.1 carries the substance (why — ~14 MB / ~1,000 files of flowtron's history, not the project's context — and one mechanism per tool: Claude Code `Read(./.flowtron/core/.flowtron/**)` deny rule with its one cost, Cursor `.cursorignore`, ripgrep `.ignore`); each of the four `AGENTS-snippet.md` wiring sections carries one mirrored paragraph naming its platform's mechanism and pointing at §1.1; `/ft-new-project` Step 3b deposits the files (merge, never overwrite) and Step 7 stages them. Flowtron-self needed nothing. **Correction carried, not propagated:** the PLAN line's `.claudeignore` example — Claude Code has no such file (verified against `code.claude.com/docs/en/permissions` 2026-09-20); the guidance names the documented deny rule and says so. Verification: seven Acceptance commands, all green; fleet suite 54/54. `touches:` reconciliation: `git diff --name-only` = exactly the six declared paths; no undeclared paths. Maintainability: one detailed list, four pointers — a future mechanism change edits §1.1 once. **Adopter-layer note (outside this repo):** natabula's `configs/.claudeignore` deposit is inert for Claude Code for the same reason, and neither it nor `configs/.cursorignore` carries the submodule-archive line — a natabula-side follow-up, not flowtron's.

**Archived:** 2026-09-20
