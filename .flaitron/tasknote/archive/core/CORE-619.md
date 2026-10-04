---
title: ft-seed
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-EPIC-577, CORE-494]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-seed/SKILL.md
  - claude/commands/ft-seed.md
  - codex/skills/ft-seed/SKILL.md
  - .claude/skills/ft-seed
  - .claude/commands/ft-seed.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - CLAUDE.md
  - README.md
  - SPEC.md
  - SPEC/layout.md
  - SPEC/unattended-candidacy.md
  - SPEC/plan-filing.md
  - docs/GLOSSARY.md
  - docs/PLATFORMS.md
  - docs/CONTEXT-BUDGET.md
  - docs/EXTERNAL-AGENTS.md
  - docs/MIGRATION.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-619 | ft-seed

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-577]]

## 🎯 Goal

Ship an attended `/ft-seed` skill that walks an existing PLAN.md with the `SPEC/unattended-candidacy.md` predicate and confirms `[unattended]` per row inside one operator gate, so large pre-existing plans get a seeding path other than hand-editing while flowtron still writes nothing unconfirmed.

## ✅ Acceptance

- [x] `/ft-seed` ships as a Claude skill body + command wrapper + Codex wrapper, self-wired in `.claude/` — `test -f claude/skills/ft-seed/SKILL.md && test -f claude/commands/ft-seed.md && test -f codex/skills/ft-seed/SKILL.md && test -L .claude/skills/ft-seed && test -L .claude/commands/ft-seed.md`
- [x] Wrapper-name invariant holds — `grep -q '\`ft-seed\`' claude/commands/ft-seed.md`
- [x] Skill body under the `claude/skills/*/SKILL.md` 33,000-byte budget — `test $(wc -c < claude/skills/ft-seed/SKILL.md) -le 33000`
- [x] Pair N: the body names the module, carries the `unattended-candidates:` literal, and a mirror label resolving to a real `## ` heading — run the CI Pair N loop from `.github/workflows/ci.yml` → exit 0
- [x] Pair O: the body sets `auto-commit = `, reads `git diff --cached` without `--quiet`, and cites `SPEC/plan-filing.md §"Filing commits"` — run the CI Pair O loop → exit 0
- [x] `/ft-seed` is in the adopter-installed subset on all four wiring surfaces — run `/ft-release` §7.1 "Standing installed-surface policy check" derivation + 4 diffs → all empty, exit 0
- [x] Shipped-skill parity Claude ↔ Codex — the two `find … -type d … SKILL.md` listings from step-7.1-standing-checks.md diff empty
- [x] Local self-wiring parity — the four `.claude/` commands in step-7.1-standing-checks.md print nothing
- [x] `SPEC/unattended-candidacy.md` names `/ft-seed` in §"Surfaces and mirrors" and the seeding contract keeps "Flowtron itself never writes `[unattended]`" verbatim — `grep -q 'ft-seed' SPEC/unattended-candidacy.md && grep -qF 'Flowtron itself never writes `[unattended]` — seeding is an operator act' SPEC/unattended-candidacy.md`
- [x] `SPEC/plan-filing.md` §"Filing commits" carries a `/ft-seed` message row — `grep -q '| \`/ft-seed\` |' SPEC/plan-filing.md`
- [x] Rosters name the skill: `SPEC/layout.md` §"Skill namespace", `docs/GLOSSARY.md`, `docs/PLATFORMS.md`, `docs/CONTEXT-BUDGET.md` §"Skill bodies" — `for f in SPEC/layout.md docs/GLOSSARY.md docs/PLATFORMS.md docs/CONTEXT-BUDGET.md; do grep -q 'ft-seed' $f || echo MISSING $f; done` prints nothing
- [x] The skill walks the plan without writing anything unconfirmed and confirms per row in exactly one prose gate — `judgment`: a skill body is prose; verified by reading it against SPEC/unattended-candidacy.md §"Recommend, never write"

## 🧩 Subtasks

- [x] Write `claude/skills/ft-seed/SKILL.md` — Step 0 resolve paths + no-flags parse; Step 1 read module + walk open rows; Step 2 predicate per row (skip already-marked / `[handoff]`); Step 3 one prose review gate; Step 4 write confirmed tokens after `[model]`; Step 5 filing-commit (`auto-commit = `, pathspec, post-stage diff); Notes (attended-only, never writes unconfirmed, no cue/banner)
- [x] Write `claude/commands/ft-seed.md` wrapper (names `` `ft-seed` ``) and `codex/skills/ft-seed/SKILL.md` wrapper
- [x] Self-wire `.claude/skills/ft-seed` + `.claude/commands/ft-seed.md` relative symlinks
- [x] `claude/AGENTS-snippet.md`: paste-block bullet + two `ln -s` lines + "adopter-installed subset" sentence; regenerate the three derived platform blocks (`codex/` · `cursor/` · `grok/`) by substitution + their subset sentence
- [x] `SPEC/unattended-candidacy.md`: intro reader list, new §"Seeding an existing plan", §"Surfaces and mirrors" row
- [x] `SPEC/plan-filing.md` §"Filing commits": add the motion + message row; `SPEC.md` candidacy paragraph: one pointer sentence
- [x] Rosters: `CLAUDE.md` utility line, `SPEC/layout.md` namespace list, `docs/GLOSSARY.md` entry (+ `[unattended]` entry pointer), `docs/PLATFORMS.md` (standalone skills, subset column, 11→12 counts), `docs/CONTEXT-BUDGET.md` skill-bodies list, `docs/EXTERNAL-AGENTS.md` step 2 clause, `docs/MIGRATION.md` §1.2 subset + §3 roster note, `README.md` quickstart subset sentence
- [x] Run the Pair N / Pair O loops, the §7.1 installed-surface + parity + self-wiring checks, byte budget, wrapper-name invariant

## 🔗 Related

- [[CORE-EPIC-577]] — `unattended-candidacy`: the predicate + three-posture contract this skill reuses at filing time (related-decision)
- [[CORE-494]] — origin of "flowtron never writes `[unattended]` — seeding is an operator act", preserved verbatim here (related-decision)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Still true: every candidacy mirror (CORE-577.3–.6) fires only at a filer's write step; the module's intro names "a filing surface at its write step" and a discharging runner as its only readers. An adopter plan filed before v5.28 (or by hand) has no path to the token but hand-editing. A bulk attended walk with one gate is the missing surface; it reuses the predicate verbatim and adds no autonomy.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Source read.** `SPEC/unattended-candidacy.md` (predicate, three postures, persistence, surfaces table, Pair N label shape); the six existing mirrors (`ft-file-followup` :148, `ft-audit` §5.1, `ft-refactor` Step 3/4, `ft-epic-discovery`, `ft-audit-repo`, `ft-task/unattended-mode.md`); `SPEC/plan-filing.md` §"Filing commits" (pre-check / pathspec / post-stage-diff; Pair O binds on the `auto-commit = ` literal); `claude/AGENTS-snippet.md` §"One-time symlink wiring" (SSOT roster; three derived platform blocks; `ft-update` Step 4 + `tools/update-adopters.mjs` `wiredSkillKeys()` derive from it — no tool edit needed); `claude/skills/ft-release/step-7.1-standing-checks.md` (installed-surface derivation excludes only `ft-audit`/`ft-audit-repo`/`ft-new-project`/`ft-release`, so a new adopter skill needs no edit there; Claude↔Codex parity; `.claude/` self-wiring parity); `.github/workflows/ci.yml` Pair N + Pair O loops; `docs/CONTEXT-BUDGET.md` (33,000-byte `claude/skills/*/SKILL.md` glob row; §"Skill bodies" list); `SPEC/layout.md` §"Skill namespace" + wrapper-name invariant; `docs/PLATFORMS.md` §"Installed-surface policy"; the thin-skill idiom in `ft-update/SKILL.md` (markdown-only, no tasknote, git inline via Bash).
- **Best practices.** Extends two established shapes rather than inventing: the thin procedural skill (`ft-update`) for the body, and the prose review gate + filing-commit tail (`ft-file-followup` Step 3/4) for the write. The predicate is *not* restated — the body Reads the module and carries the labeled mirror paragraph in the fixed six-sentence idiom CORE-577.N audited (label parenthetical → predicate clause → "proposed, never seeded" → attended-only sentence → CORE-494 sentence). No new gate vocabulary, cue, banner, or checklist box (module §"Recommend, never write" third bullet). Placement is adopter-installed (acts on the adopter's PLAN.md and must read the *pinned* module), not global-only.
- **Archive skim.** `grep -l unattended-candidacy|ft-seed|bulk-seed archive/core/*.md` → 21 hits; load-bearing ones read: CORE-577.1 (resolved-scoping table — "filing never seeds the marker"), 577.2 (module authored; Pair N must exclude `ft-release/`; the CI step passes vacuously with zero mirrors), 577.4 (`ft-file-followup` mirror + runner-side persistence hook), 577.5 (`ft-audit`/`ft-refactor` mirrors; carve-out rows never evaluated), 577.6 (last table row; the six-sentence mirror idiom), 577.N (audit: the idiom is what Pair N binds; `ft-refactor` paraphrases sentence 3 — accepted). CORE-494 is the "seeding is an operator act" origin, quoted verbatim in SPEC.md §"Task-line format". No prior tasknote proposes a bulk path; the gap is real.
- **Drift check.** PLAN line cites `SPEC/unattended-candidacy.md` ✅ exists. "Candidacy fires only at filing time today" ✅ — module intro line 3 + all six mirrors are write-step mirrors. No SPEC contract contradicted: the module already sanctions a prose gate ("A surface whose gate is a prose review … does the same in prose"), and its §"Recommend, never write" is preserved word-for-word. Plan vs PLAN line: byte-consistent — attended, one gate, per-row confirm, nothing unconfirmed written.
- **Clarifications (AskUserQuestion, answered).** Gate shape → **prose review** (unbounded row count; `AskUserQuestion` caps at 16 options per call, which would break "one gate" on a large plan). Self-commit → **yes, under §"Filing commits"** (message `chore: seed [unattended] — <N> rows`; otherwise the write becomes PLAN dirt that the paper-complete guard converts into a hard stop at the next `/ft-task`).
- **Assumptions.** (1) Rows already carrying `[unattended]` anywhere on the line are skipped, not repositioned — position repair is `SPEC/plan-parser.md`'s footgun territory, reported not fixed. (2) `[handoff]` rows are skipped by clause 3 (definitive). (3) Scope is the four active sections of `.flowtron/PLAN.md` only — `## Completed` and `PLAN-ARCHIVE.md` never. (4) Clause 6 "same pass with the same candidacy" reads naturally here: an epic child whose stem predecessor is itself a candidate in this walk qualifies. (5) No flags — the module's "a surface that accepts neither flag has only the attended branch" is the whole design; the `unattended-candidates:` literal appears once, stated as never emitted (Pair N needs the literal). (6) De-seeding (removing tokens) is out of scope.
- **New surfaces touched (why so many one-liners).** A shipped skill is rostered in: the snippet SSOT + 3 derived platform blocks, the two wrapper files, `.claude/` self-wiring, `CLAUDE.md` utility line, `SPEC/layout.md`, GLOSSARY, PLATFORMS (three sites incl. 11→12 counts), CONTEXT-BUDGET §"Skill bodies", plus the "tasknote family and `/ft-update`" subset sentence repeated in README / MIGRATION §1.2 / the four snippets. Each is one line; none is a new roster copy (the derivation checks stay derivations).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Body extends the thin-procedural-skill shape (`ft-update`: markdown-only, no tasknote, git inline, Step 0 two-layout resolve + bail) and the filing tail (`ft-file-followup` Step 4: pre-check → write → pathspec stage → whole-index `git diff --cached` → commit, `no 🏁`). The candidacy mirror paragraph copies the six-sentence idiom CORE-577.N audited, label on one line (Pair N's `grep -oE` is line-based — a wrapped label fails `NO LABELED MIRROR`; caught on the first local run and fixed). Gate is a prose review, per the operator's Discovery answer; Step 3 says why not `AskUserQuestion` (16-option cap splits a large plan across gates).
- **Minimal refactor gate.** No refactor. Every touched doc got a one-line roster or pointer edit; the only new prose blocks are the skill body, the wrappers, the GLOSSARY entry, and §"Seeding an existing plan" in the candidacy module. Pair O's "Five skill bodies" sentence and SPEC.md's "five filing motions" parenthetical were extended with a clause rather than renumbered — `/ft-seed` is not a filing motion; it rides the contract.
- **SPEC delta.** `SPEC/unattended-candidacy.md`: intro reader list + new `## Seeding an existing plan` (the only new heading; Pair N labels still resolve to `## Three postures`) + surfaces-table row. `SPEC/plan-filing.md`: contract sentence + gate list + message row `chore: seed [unattended] — <N> rows`. `SPEC.md`: one pointer sentence (47,513 → 47,661; budget 53,000).
- **Wiring.** Snippet SSOT gained the paste-block bullet + `ln -s` pair; the three platform blocks regenerated by substitution; `.claude/` self-wiring symlinks created (`.claude/` is gitignored in this checkout — `.gitignore:21` — so they are local filesystem state, which is what the §7.1 self-wiring parity check reads). No edit to `ft-update`, `ft-new-project`, `tools/update-adopters.mjs`, or the §7.1 installed-surface check: all four derive from the SSOT block.
- **Tests.** No executable code changed; the CI `drift` job is the test surface — run locally in Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — markdown skill + docs, no UI. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (bash, from repo root):

- `test -f claude/skills/ft-seed/SKILL.md && test -f claude/commands/ft-seed.md && test -f codex/skills/ft-seed/SKILL.md && test -L .claude/skills/ft-seed && test -L .claude/commands/ft-seed.md` → 0
- `grep -q '\`ft-seed\`' claude/commands/ft-seed.md` → 0 (CI wrapper-name loop over all `ft-*` → clean)
- `wc -c claude/skills/ft-seed/SKILL.md` → 12,313 ≤ 33,000 (CI context-budget loop over every budgeted surface → clean; `SPEC.md` 47,661 ≤ 53,000)
- CI Pair N loop (`.github/workflows/ci.yml:169`) → `PAIR N OK`, exit 0 — first run failed `NO LABELED MIRROR claude/skills/ft-seed/SKILL.md` on a line-wrapped label; fixed, re-run clean
- CI Pair O loop (`ci.yml:183`) under `bash -c` → `PAIR O OK`, exit 0 (the same loop under the interactive zsh reports `NO POST-STAGE DIFF` for every filer including the five pre-existing ones — shell quirk, not a finding; CI runs bash)
- §7.1 installed-surface derivation + 4 `diff -u` → all empty, exit 0
- Shipped-skill parity `find … SKILL.md` Claude ↔ Codex `diff -u` → empty, exit 0
- Local self-wiring: both `.claude/` `diff -u` empty; dangling-symlink `find` and non-symlink `find` → no output
- CI Pair B / Pair J / Pair M (flag ↔ wrapper ↔ argument-hint) → clean (ft-seed declares no flags on any surface)
- `grep -q 'ft-seed' SPEC/unattended-candidacy.md && grep -qF 'Flowtron itself never writes \`[unattended]\` — seeding is an operator act' SPEC/unattended-candidacy.md` → 0
- `grep -q '| \`/ft-seed\` |' SPEC/plan-filing.md` → 0
- `for f in SPEC/layout.md docs/GLOSSARY.md docs/PLATFORMS.md docs/CONTEXT-BUDGET.md; do grep -q ft-seed $f || echo MISSING $f; done` → no output
- Judgment criterion (walks without writing unconfirmed; one gate): read the body against module §"Recommend, never write" — Step 3 stops before any write, Step 4 writes only kept rows, no flag branch exists, `unattended-candidates:` literal present and stated as never emitted → met
- Structural quality: no duplication (predicate not restated — body Reads the module), no dead prose, no new cue/banner/checklist box, public surface grew by exactly one skill slug on every roster that lists slugs; code-facing docs (CONTEXT-BUDGET §"Skill bodies", snippet byte figure) updated in the same change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `README.md` — updated (quickstart subset sentence). `AGENTS.md` — updated (utility-only line: three → four, names `/ft-seed`). `SPEC.md` — updated (candidacy pointer sentence; "five filing motions" parenthetical gains the `/ft-seed` clause). `docs/MIGRATION.md` — updated (§1.2 subset sentence; §3 roster note "`/ft-seed` added in CORE-619"). `claude/AGENTS-snippet.md` — updated (paste-block bullet, `ln -s` pair, subset sentence). `codex/` · `cursor/` · `grok/AGENTS-snippet.md` — updated (derived `ln -s` line + subset sentence each). `docs/CONVENTIONS.md` — no change (labeled-mirror convention applies unchanged; the new mirror carries it). `CONTRIBUTING.md` — no change. `SECURITY.md` — no change. `docs/AGENT-NEUTRALITY.md` — no change (no new Claude-only surface: Codex wrapper shipped, all four platform blocks carry the slug). `docs/PLATFORMS.md` — updated (standalone-skill list, two subset-column cells, 11 → 12 counts). `claude/CAPABILITIES.md` — no change (no flags). `docs/AGENT-COMPAT.md` — no change. `docs/EXTERNAL-AGENTS.md` — updated (step 2: how a pre-proposal plan gets seeded). `docs/WORKTREES.md` — no change. `docs/VISION.md` — no change (markdown skill, no runtime; scope boundary untouched).

**Recap.** Shipped `/ft-seed`: `claude/skills/ft-seed/SKILL.md` (12,313 B, 5 steps + Notes), `claude/commands/ft-seed.md`, `codex/skills/ft-seed/SKILL.md`, and the two `.claude/` self-wiring symlinks. Contract: `SPEC/unattended-candidacy.md` gained `## Seeding an existing plan` + a surfaces-table row + an intro reader; `SPEC/plan-filing.md` §"Filing commits" binds the write (`chore: seed [unattended] — <N> rows`); `SPEC.md` points at the bulk path in one sentence. Rosters touched with one-liners: snippet SSOT + three derived platform blocks, `AGENTS.md`, `README.md`, `SPEC/layout.md`, `docs/GLOSSARY.md` (new entry + `[unattended]` pointer), `docs/PLATFORMS.md`, `docs/CONTEXT-BUDGET.md`, `docs/EXTERNAL-AGENTS.md`, `docs/MIGRATION.md`, and Pair O's prose in `ft-release/step-7.1-mirror-pairs.md`. Verification: every CI `drift` step run locally (wrapper-name, parity, context budget, Pairs B/J/M/N/O) → clean; §7.1 installed-surface derivation, Claude↔Codex parity, and `.claude/` self-wiring parity → clean. Refactors: none; deferred nothing. Documentation verdict: every roster that lists slugs names the new one; no doc restates the predicate. **`touches:` reconciliation** — `git diff --name-only` + untracked vs declared: 20 declared, 22 changed. Undeclared: `claude/skills/ft-release/step-7.1-mirror-pairs.md` (Pair O's "Five skill bodies" sentence — found during Phase 2 when the CI loop bound the new file) and `AGENTS.md` (declared as `CLAUDE.md`, which is a symlink to it — same file, git names the target). `.claude/skills/ft-seed` + `.claude/commands/ft-seed.md` are declared and created but gitignored (`.gitignore:21`), so they never appear in the diff. Maintainability effect: the `[unattended]` marker now has a seeding path for the ~plan-sized backlog that predates CORE-577, with zero new gate vocabulary and the CORE-494 rule intact verbatim; the release-gate derivations (`ft-update` Step 4, `tools/update-adopters.mjs`, §7.1 installed-surface) picked the new slug up with no edit, which is the property they were built for.

**Archived:** 2026-09-19
