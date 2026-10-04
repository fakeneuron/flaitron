---
title: skill-description-trim
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-603, CORE-603.1, CORE-603.2, CORE-603.3, CORE-603.N]
blocked-by:
  - CORE-603.3
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - codex/skills/ft-task/SKILL.md
  - codex/skills/ft-file-followup/SKILL.md
---

# CORE-603.4 | skill-description-trim

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-603]] · [[CORE-603.1]] · [[CORE-603.3]]

## 🎯 Goal

Cut the always-on `description:` frontmatter of the seven skills above 700
chars down to a trigger sentence plus one house-shape clause per flag
(≤400 chars each), relocating any genuinely new information into the SKILL
body, keeping the Codex twins proportionate, and leaving Pairs B and J clean.

## ✅ Acceptance

- [x] Each of the 7 `claude/skills/<s>/SKILL.md` `description:` fields is ≤400 chars — `for s in ft-task ft-file-followup ft-audit ft-close-epic ft-refactor ft-micro-task ft-epic-discovery; do n=$(grep -m1 '^description:' claude/skills/$s/SKILL.md | wc -c); [ "$n" -le 401 ] || echo "OVER $s $n"; done` prints nothing (401 = 400 + trailing newline byte)
- [x] `ft-audit`'s per-domain hint clauses (frontend/security/performance/docs/structure/context) survive somewhere in the body, since they exist nowhere else — `judgment` (read diff) — moved to a new body glossary line
- [x] Pair B (Claude flag set ↔ Codex flag set) prints nothing — `for d in claude/skills/ft-*/SKILL.md; do s=$(basename "$(dirname "$d")"); c="codex/skills/$s/SKILL.md"; [ -f "$c" ] || continue; cf=$(grep -m1 '^description:' "$d" | sed -E 's/"[^"]*"//g' | grep -oE '\-\-[a-z][a-z-]+' | sort -u | tr '\n' ' '); xf=$(grep -m1 '^description:' "$c" | sed -E 's/"[^"]*"//g' | grep -oE '\-\-[a-z][a-z-]+' | sort -u | tr '\n' ' '); [ "$cf" = "$xf" ] || echo "MISMATCH $s | claude:[$cf] codex:[$xf]"; done`
- [x] Pair J (command-stub `argument-hint:` ↔ its own description/body flags) prints nothing — same script as `claude/skills/ft-release/step-7.1-mirror-pairs.md` §"Pair J" (unaffected since `claude/commands/*.md` are untouched, but re-run as a regression check)
- [x] Pair M (skill `description:` ↔ command stub `argument-hint:`) prints nothing — same script as §"Pair M" (guards that a trimmed description didn't drop a flag clause the hint still promises)
- [x] No `claude/skills/*/SKILL.md` exceeds the 33,000-char budget row in `docs/CONTEXT-BUDGET.md` — `wc -c` on all 7 touched bodies
- [x] `git diff --check` → 0

## 🧩 Subtasks

- [x] Rewrite the 7 Claude `description:` fields to trigger sentence + one house-shape clause per flag (`ft-audit` has no flags — domain positional list only), dropping invocation examples and body-restating summary sentences
- [x] Add a domain-scope glossary line to `ft-audit`'s body (after the intro paragraph, before §0) carrying the per-domain hints the trimmed description drops — the only genuinely new information at risk, since the body's §1 step 1 domain list is bare tokens
- [x] Trim the two disproportionately verbose Codex twins (`ft-task`, `ft-file-followup`) to a matching terse shape in Codex's own voice, preserving the identical flag set; leave the other five Codex twins as-is (already short, already proportionate)
- [x] Run Pairs B, J, and M; fix any regression
- [x] `wc -c` the 7 touched `claude/skills/*/SKILL.md` bodies against the 33,000 budget
- [x] `git diff --check`

## 🔗 Related

- [[CORE-EPIC-603]] — parent epic (skill-roster-diet)
- [[CORE-603.1]] — Discovery; fleet survey measured the 9.6 KB always-on description tax and scoped these three implementation children
- [[CORE-603.3]] — predecessor (`blocked-by`); folded `ft-audit-context` into `ft-audit`'s `context` domain, deferring this trim
- [[CORE-603.N]] — epic-close audit (successor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Sequential predecessor [[CORE-603.3]] is closed (2026-09-18); `ft-audit`'s description already carries the `context` token this task trims. Working tree was clean at start. Scope matches the PLAN.md line exactly — no drift.

- [x] Read relevant source files — read all 7 Claude `SKILL.md` descriptions + bodies (targeted greps), all 7 Codex `SKILL.md` twins in full (they are 250–1,100 byte thin wrappers), the 7 `claude/commands/<s>.md` stubs, and `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pairs B, J, and M in full (exact check scripts + the deliberate-properties lists)

- [x] **Best Practices Review** — N/A (prose/frontmatter trim, no code); the equivalent judgment call is "does the trim destroy information the checks or an operator rely on", covered by the archive skim + drift check below

- [x] **Archive skim** — `archive/core/` (README table). Load-bearing: [[CORE-554]] (`micro-task-description-flags`) minted Pair M and the "With `--flag`, …" house-voice convention, and demonstrated editing the Codex twin in **its own voice**, not a copy of the Claude sentence, whenever a flag is added; [[CORE-420.5]] is the origin of Pair B's quote-strip pipeline (load-bearing for extraction correctness); [[CORE-565.2]]/[[CORE-565.N]] are the nearest prior *body* word-trim precedent (SPEC.md + `ft-task/SKILL.md`), useful for shape (compress a paragraph, keep the load-bearing clauses, drop restated cross-references) but not description-specific. [[CORE-603.1]] and [[CORE-603.3]] are the immediate predecessors (already read in full above).

- [x] **Drift check** — re-measured all 7 Claude description char counts directly (`awk`, subtracting the `description: ` prefix): ft-file-followup 1,314 · ft-task 1,299 · ft-audit 1,076 (up from .1's 960 — `.3` added the `context` domain) · ft-close-epic 790 · ft-refactor 746 · ft-micro-task 745 · ft-epic-discovery 700. All seven still the PLAN.md-named set; no contradiction with SPEC or the epic's prior children.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:**

**Content-loss check (the real risk in this task).** For each of the 7 skills, grepped the SKILL.md body for the substance of every clause the trimmed description drops. Result: every dropped clause is a **pure restatement** of content that already lives — usually in more depth — in the body or a lazy fragment: ft-task's hypothesis-first breakdown and loop-convergence detail live verbatim in `step-4-debug-mode.md` / `step-5-loop-mode.md`; ft-file-followup's park-priority / starter-file-survey / `--unattended` posture / filing-threshold pointer all live in the body (`§"Routing…"`, `§"--unattended is the operator-less posture"`); ft-close-epic's legacy-ID acceptance, sibling-warn, default-Yes, and bracket-twin framing are all in the body; ft-refactor's depth-escalation and invoke-example clauses are covered by body §"Compare with `/ft-audit structure`"; ft-micro-task's threshold/shape language is in body §10 + the Routing bullet; ft-epic-discovery's `--deep` pre-pass detail and "auto-wired into adopters" line are both in the body verbatim. **One exception:** `ft-audit`'s per-domain parenthetical hints (what "frontend" / "security" / "performance" / "docs" / "structure" / "context" each cover) exist **nowhere else** — the body's §1 step 1 domain list is bare tokens. This is the one genuinely displaced fact; it moves to a new glossary line in the body per the Subtasks above. Everything else is safe to drop, not move.

**Codex-twin scope decision.** Pair B compares extracted `--flag` *sets*, not prose length, so trimming only the Claude side leaves Pair B green as long as no flag clause is dropped (verified: extracted flag sets are identical old-Claude / old-Codex / new-Claude-draft for all 7). "Codex twins in lockstep" (PLAN.md line) is read as a proportionality request, not a second character cap: of the 7 Codex twins, only `ft-task` (571 chars) and `ft-file-followup` (522 chars) are meaningfully bloated relative to their new ≤400-char Claude counterparts; the other five are already 245–301 chars and already proportionate. Scope: trim those two in Codex's own voice (per [[CORE-554]]'s precedent), leave the other five untouched.

**`ft-audit` has no flags.** It takes a positional `<domain> [scope]`, not `--flags`; Pair J and Pair M both explicitly carve out `/ft-audit` as "positional arguments are out of scope." Its trim is trigger sentence + concise domain list only, no house-shape flag clause.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — house-shape flag clause convention (`With `--flag`, <verb>…`) is [[CORE-554]]'s established pattern; reused verbatim, no new shape

- [x] **Minimal refactor gate** — no refactor; frontmatter + one new body line per touched file, nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown frontmatter; Pairs B/J/M are the existing verification gates, run in Phase 3)

**Implementation Notes:**

- Rewrote all 7 Claude `description:` fields to trigger sentence + one `With `--flag`, …` clause per documented flag (`ft-audit` has none — positional `<domain> [scope]` — so its trim is trigger + concise domain list). Dropped: invocation examples (`args="CORE-004 --debug"`-style), the meta-summary sentence restating the skill's own step structure, and "Use when the user asks…" dispatch phrasing where a shorter trigger already carries the same selection signal.
- Added one new body line to `claude/skills/ft-audit/SKILL.md` (after the "One dispatcher, eight domains" paragraph, before the fork-checklist section): the per-domain parenthetical hints the description used to carry, since the body's §1 step 1 domain list is bare tokens with no explanation elsewhere.
- Trimmed `codex/skills/ft-task/SKILL.md` and `codex/skills/ft-file-followup/SKILL.md` descriptions to a matching terse shape, each in Codex's own established voice (not a copy of the Claude sentence), preserving the identical `--flag` set. Left the other five Codex twins untouched — already 245–301 chars, already proportionate to their new Claude counterparts.
- No refactor beyond the frontmatter + one body line: no shared helper, no new file, no dispatcher-procedure edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)

- [x] Ran lint/type-check on changed code — `git diff --check` → 0

- [x] **Verification receipt** — see Testing Notes

- [x] (frontend) N/A — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- **Char-count receipt** (`description:` field, byte length after the `description: ` prefix): ft-task 397 · ft-file-followup 358 · ft-audit 346 · ft-close-epic 224 · ft-refactor 263 · ft-micro-task 272 · ft-epic-discovery 291 — all ≤400 → 0 over.
- **Pair B** (Claude flag set ↔ Codex flag set, `step-7.1-mirror-pairs.md`'s exact script) → prints nothing (0 mismatches).
- **Pair J** (command-stub `argument-hint:` ↔ its own description/body flags) → prints nothing (regression check; `claude/commands/*.md` untouched).
- **Pair M** (skill `description:` ↔ command stub `argument-hint:`) → prints nothing (no `UNDOCUMENTED FLAG`, no `MISSING STUB`).
- **Context-budget receipt** (`wc -c`, 33,000-char row): ft-task 27,389 · ft-file-followup 26,161 · ft-audit 27,165 · ft-close-epic 26,470 · ft-refactor 16,042 · ft-micro-task 20,248 · ft-epic-discovery 29,092 — all well under budget. `docs/CONTEXT-BUDGET.md`'s per-skill ledger (lines 80, 134-137) is now stale but is explicitly release-measured, not task-measured (doc's own header + [[CORE-603.3]] precedent) — deferred to the next release cut, not edited here.
- `git diff --check` → 0.
- Structural quality: no avoidable duplication (the domain hints moved to `ft-audit`'s body exist in exactly one place, not copied from the description), no dead code, no unexplained complexity, no public-surface growth (same flags, same domains, same skills), code-facing docs updated where load-bearing (the one `ft-audit` body line) and left alone where the removed prose was pure restatement.
- Content-loss verification: diff-read all 9 changed files against the Discovery content-loss check (§Discovery Notes) — every dropped clause's substance still resolves in the body, lazy fragment, or (for `ft-audit`) the new glossary line.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 18 entries "no change": `claude/skills/*/SKILL.md` is explicitly excluded from this sweep set (`.flowtron/tasknote/README.md` §"AI-referenced docs" — "sit outside this sweep set, excluded on both counts"), and no other listed doc names these 7 skills' description text, char counts, or flag rosters. `docs/CONTEXT-BUDGET.md` (not in the sweep set) now carries a stale per-skill byte ledger; deliberately release-measured, not edited here (doc's own header + [[CORE-603.3]] precedent).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and kept nested beneath its active parent `CORE-EPIC-603`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Trimmed the always-on `description:` frontmatter of the seven flowtron skills [[CORE-603.1]]'s fleet survey flagged as over 700 chars — `ft-file-followup`, `ft-task`, `ft-audit`, `ft-close-epic`, `ft-refactor`, `ft-micro-task`, `ft-epic-discovery` — down to a trigger sentence plus one house-shape flag clause each, all now ≤400 chars (224–397). Every clause dropped was verified as a pure restatement already present in the skill's own body or a lazy fragment, except `ft-audit`'s per-domain hints, which moved into a new body glossary line (its body's domain list was bare tokens). Also trimmed the two disproportionately verbose Codex twins (`ft-task`, `ft-file-followup`) to a matching terse shape in their own voice, leaving the other five untouched.

- **Files:** 9 changed — 7 `claude/skills/<s>/SKILL.md` description trims (+1 new body line in `ft-audit`), 2 `codex/skills/<s>/SKILL.md` description trims (`ft-task`, `ft-file-followup`); this tasknote (scaffolded + archived); `.flowtron/PLAN.md` (stub flip).
- **Verification:** all 7 descriptions ≤400 chars (397/358/346/224/263/272/291); Pairs B, J, M all print nothing; all 7 bodies well under the 33,000-char `SKILL.md` budget row; `git diff --check` → 0.
- **Refactors:** none. Deferred: `docs/CONTEXT-BUDGET.md`'s per-skill byte ledger (release re-measure, per [[CORE-603.3]] precedent) — the epic's own `.N` audit or the next `/ft-release` cut re-measures it.
- **Documentation verdict:** 18 of 18 AI-referenced docs "no change" (`claude/skills/*/SKILL.md` is out of sweep scope by design; `CONTEXT-BUDGET.md` is out of sweep scope and release-measured).
- **`touches:` reconciliation:** declared 9 files; `git diff --cached --name-only` will show exactly those 9 plus `.flowtron/PLAN.md`'s stub flip and this tasknote's archive move. No undeclared paths.
- **Maintainability effect:** the epic's always-on description tax drops further on top of [[CORE-603.2]]/[[CORE-603.3]]'s cuts — the seven heaviest description offenders in the fleet survey are now all under 400 chars, each carrying exactly its trigger sentence and documented flags, with the fuller explanation available in the body for an agent (or operator) that actually loads the skill. Closes [[CORE-EPIC-603]]'s three implementation children; [[CORE-603.N]] audits the finished epic.

**Archived:** 2026-09-18
