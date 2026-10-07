---
title: skill-pin-mismatch
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-724.4]
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-seed/SKILL.md
  - claude/skills/ft-update/SKILL.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/CONTEXT-BUDGET.md
  - .github/workflows/ci.yml
  - .flaitron/sidequest/CORE-730.md
  - .flaitron/PLAN.md
---

# CORE-729 | skill-pin-mismatch

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-724.4]] · [[CORE-439]] · [[CORE-730]]

## 🎯 Goal

Stop a globally installed flaitron skill body (tracking flaitron's working tree) from silently running against an adopter's older pinned `.flaitron/core/` fragments: decide pinning vs. version guard, fail a missing fragment with an explicit skill/pin-mismatch message, and extend `/ft-update`'s checks to surface the condition.

## ✅ Acceptance

- [x] The seven adopter-subset Claude bodies that resolve `<root>` (ft-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic, ft-refactor, ft-seed) carry one byte-identical skill/pin guard — `grep -h '^\*\*Skill/pin guard\.\*\*' claude/skills/*/SKILL.md | sort | uniq -c` prints one line with count 7
- [x] The guard stops on an announced base directory outside an adopter project **and** on any absent named file, printing `⛔ skill/pin mismatch` — `grep -c 'skill/pin mismatch' claude/skills/ft-task/SKILL.md` ≥ 1 + `judgment` (wording read against the two triggers)
- [x] `docs/PLATFORMS.md` §"One canonical install path per project" records the shadowing mechanism, the guard, and why not a version guard — `grep -q 'skill/pin guard' docs/PLATFORMS.md`
- [x] `/ft-update` gains a report-only agent-home shadow check that probes only flaitron slugs (never lists an agent home) and degrades to "not run" on a refused read — `grep -q '^## Step 4.7 — Agent-home shadow check' claude/skills/ft-update/SKILL.md`
- [x] Context budgets hold — CI's `Context budget` step, run locally → exit 0
- [x] Standing validation — `npm --prefix viz test`, `node --test tools/update-adopters.test.mjs` → exit 0
- [x] The read-access script is filed in natabula, not written from here (SPEC §"Cross-repo edit remit") — `grep -q 'NAT-379' ../natabula/.flaitron/PLAN.md`
- [x] The future global-skill conflict task is parked in flaitron — `grep -q 'global-skill-conflicts' .flaitron/PLAN.md`

## 🧩 Subtasks

- [x] Insert the guard paragraph after the Step 0 bail line in the seven bodies (scripted, identical text)
- [x] Add the skill/pin guard paragraph to `docs/PLATFORMS.md` §"One canonical install path per project"
- [x] Add `/ft-update` Step 4.7 (agent-home shadow check); fix its stale "global-symlink" Note
- [x] File NAT-379 (grant-global-skill-read script) in natabula's PLAN.md; commit there
- [x] Park the global-skill-conflict follow-up in flaitron (`/ft-file-followup --park`)
- [x] Phase 3: budget step, viz tests, updater tests, external review

## 🔗 Related

- [[CORE-724.4]] — predecessor; introduced `preamble.md` (absent at v6.0.0), surfacing the mismatch
- [[CORE-439]] — install-path dedup; set the repo-scoped-is-canonical rule this guard enforces

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Live defect: this very session loaded `/ft-task` from `~/.claude/skills/ft-task`, so every adopter on this machine runs the working-tree body (reads `preamble.md`) against a v6.0.0 pin that lacks it. Policy already forbids the global copy (`docs/PLATFORMS.md`); nothing enforces or detects it.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Mechanism.** In Claude Code a personal-scope skill shadows a same-named project skill — observed here: flaitron-self wires `.claude/skills/ft-task` repo-scoped, yet this session's skill header named `~/.claude/skills/ft-task`. In an adopter the global body runs, but its Step 0 resolves `<root>` = `.flaitron/core/` (the pin), so body and fragments come from different versions. v6.0.0's `claude/skills/ft-task/` has no `preamble.md` (`git ls-tree v6.0.0`).
- **Why not a version guard.** Working-tree `SPEC.md:3` still reads `**Version:** v6.0.0` while carrying unreleased 724.4 fragments — a version compare passes exactly the failing case. A path-identity check (announced base directory inside vs outside the adopter project) catches released and unreleased drift with no extra read; the missing-file stop backs it on runtimes that announce no base directory.
- **Why not "pinning" (resolve `<root>` from the body's own checkout).** Internally consistent, but it silently ignores the adopter's pin — the versioning promise the submodule exists for.
- **Scope of bodies.** Seven Claude bodies carry the identical Step 0 layout block (`If neither matches, bail.`): ft-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic, ft-refactor, ft-seed. `ft-update` resolves `<FT>` differently and is the remedy path, so it gets a report (Step 4.7) not a stop. `SPEC/procedures/ft-task.md` (Codex/Cursor/Grok) resolves everything relative to itself — self-consistent, out of scope. Codex wrappers read the Claude bodies, so they inherit the guard.
- **Path access.** Agents here cannot read `~/.claude/skills/` (NAT-195 hook); `/ft-release` §7.1's machine-global parity check has logged "not run" every cut for the same reason (CORE-613, CORE-674). The hook honors `read <path>` lines in `~/.claude/path-access-roots`, operator-written only (`natabula/docs/CLAUDE-LAYERING.md`; `scripts/guard-path-access.sh` — `~/.claude/` is denied only absent a root).
- **Budgets.** `claude/skills/*/SKILL.md` 33,000 cap; largest touched is ft-epic-discovery at 29,997 — the ~760-byte guard fits (30,7xx after). `preamble.md` untouched.
- **Archive skim.** `archive/core/` (confirmed against README table): CORE-439 set "repo-scoped wiring is canonical; agent home carries only global-only utilities"; CORE-724.4 introduced `preamble.md`; CORE-613/674 record the blocked `~/.claude/` scan. No prior guard attempt.
- **Drift check.** PLAN line matches; cited 90ca1719 = CORE-724.4; v6.0.0 lacks `preamble.md` (verified). `/ft-update` Notes call it "global-symlink" — contradicts the PLATFORMS table (adopter subset); fixed here since Step 4.7 now reports exactly that install.
- **Clarifications (operator, AskUserQuestion).** (1) Guard = path-identity + missing-file. (2) Operator wants flaitron sessions able to see global skills via a script, with a future task to ensure global skills don't conflict; (3) script home = `natabula/scripts/`. Per SPEC §"Cross-repo edit remit" the script is **filed** as NAT-379 in natabula (natabula pairs every script with a `*.test.sh`), not written from this cycle; the operator gets an interim one-liner. The conflict task is parked here as a CORE follow-up.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only skill/doc prose, no executable code; acceptance greps + CI drift steps cover it

**Implementation Notes:**

- **Pattern survey.** Extended the existing Step 0 layout block every adopter-subset body already shares (`If neither matches, bail.`) with one paragraph inserted right after it, scripted so the seven copies are byte-identical (a `uniq -c` check proves it — same idiom as the shared-block discipline in `preamble.md`'s origin, CORE-724.4). `/ft-update` Step 4.7 copies Step 4.6's report-only shape (probe → ⚠️ block → "No … found" → never deletes).
- **Guard wording.** Missing-file trigger narrowed to "a skill fragment, SPEC module, or template" so the project files a body reads conditionally (sidequest stub, PLAN) never trip it. The guard is one physical line in each body (bodies mix wrapped and unwrapped prose), kept that way for the single-line identity grep.
- **Live demonstration.** The `/ft-file-followup --park` run inside this task loaded `~/.claude/skills/ft-file-followup`, and its body already showed the new guard. That proves agent-home installs track the working tree. It did not trip, because the guard is adopter-layout only.
- **`/ft-update` Step 4.7** asks first (one AskUserQuestion naming the homes), then probes named flaitron slugs under five agent homes plus `~/.claude/commands/<slug>.md`. It never lists a home, since filenames are the user's, and degrades to "not run" on a decline or a refused read.
- **Stale note fixed.** `/ft-update` §Notes said "Both are global-symlink" — contradicted the PLATFORMS adopter-subset row and would now contradict Step 4.7.
- **Cross-repo.** natabula `7ddb59c` files NAT-379 (one PLAN line, Medium). flaitron `d9a4ec42` parks CORE-730.
- **Refactor.** None.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (re-run after review pass 2 fixes; same results):

- `grep -h '^\*\*Skill/pin guard\.\*\*' claude/skills/*/SKILL.md | sort | uniq -c` → 0, prints a single `7` line
- `grep -c 'skill/pin mismatch' claude/skills/ft-task/SKILL.md` → 0 (1); judgment: both triggers (base dir outside adopter; absent fragment/SPEC module/template) present in the text
- `grep -q 'skill/pin guard' docs/PLATFORMS.md` → 0
- `grep -q '^## Step 4.7 — Agent-home shadow check' claude/skills/ft-update/SKILL.md` → 0
- CI `Context budget` step, run locally → 0 (ft-epic-discovery 30,765 ≤ 33,000)
- `npm --prefix viz test` → 0 (587 passed); `node --test tools/update-adopters.test.mjs` → 0
- `grep -q 'NAT-379' ../natabula/.flaitron/PLAN.md` → 0 (natabula `7ddb59c`)
- `grep -q 'global-skill-conflicts' .flaitron/PLAN.md` → 0 (`d9a4ec42`)
- All 16 CI `drift` steps run locally under CI's shell (`bash -e`, no pipefail) → 0. Under a stricter `-o pipefail` copy, Pair B/J/M failed on empty `grep -o`; that is a local-harness artifact, not a CI failure. New `Skill/pin guard parity` step negative-tested on a scratch copy with one body altered → 1, `GUARD DRIFT copies-per-variant: 1 6`
- `git diff --check` → 0
- Lint/type-check: N/A, markdown + one CI shell step; no viz source touched.
- Duplication: the seven-way guard copy is deliberate (each body must be self-sufficient against an old pin) and is now CI-enforced. No dead code, no stale docs (sweep below).

External review, pass 1 (`/code-review medium`, working-tree diff), 10 findings:

1. **Blocker.** Step 4.7 checked paths under `~` without approval → fixed: AskUserQuestion naming the five homes (default Skip); a decline reports "not run — declined".
2. **Blocker.** The guard pointer's bare `docs/PLATFORMS.md` doesn't exist in an adopter → fixed: "flaitron's `docs/PLATFORMS.md` (`.flaitron/core/docs/PLATFORMS.md` in an adopter)", all seven.
3. **Blocker.** PLATFORMS overclaimed that the missing-file backstop catches content drift → fixed: states that only the base-directory check catches unreleased drift, that a changed-but-present file passes, and that pre-guard copies carry no guard.
4. **Blocker.** Step 4.7 said the guard "stops every run" → fixed: it stops only where the runtime names a base directory, and an older or unnamed copy runs silently.
5. **Note.** The Step 5 recap omitted shadow hits → fixed.
6. **Note.** The duplicate self-count sentence → removed.
7. **Note.** CONTEXT-BUDGET's headroom prose went stale → fixed: rows 49 and 98 updated (30,730; ~1 working unit).
8. **Note.** Nothing enforced the 7× copies → fixed: CI `Skill/pin guard parity` drift step.
9. **Note.** PLATFORMS was in tension with "listed twice" → fixed: listed or not, invoking it ran the user-scope body (one observation, dated).
10. **Note.** `ft-release`'s description says "global symlink", contradicting PLATFORMS → filed into the CORE-730 stub (global-skill-conflicts), its natural home. The line predates this diff and was not touched.

External review, pass 2 (re-run from the top after the blockers), 8 findings, all **notes**:

1. "Write nothing" is false for a lazy missing-file stop that fires after earlier writes → fixed: "make no further write, name anything this run already wrote".
2. The guard stop has no `--unattended` ⏸/park shape → filed into the CORE-730 stub; it needs a new cause code in `unattended-mode.md`'s closed set, which is a contract change beyond this diff.
3. MIGRATION overstated the guard → fixed: "runs against the pin, stopping … only where its guard can see the mismatch".
4. `touches:` drift → already reconciled before pass 2 landed (the reviewer read an earlier copy). PLAN.md changes at closure.
5. Stale Implementation Note ("counts its own base directory") and the ~640-byte figure → fixed.
6. The parity step checked the count, not which bodies → fixed: an added `diff` against the named seven. A swap test (guard moved ft-seed → ft-update) → 1.
7. Step 4.7 lacked a Codex-native home → added `~/.codex/skills` to the ask and the probe.
8. Pair Q skipped the guard's § citation because of the parenthetical → fixed: § now follows `docs/PLATFORMS.md` directly, and all CI drift steps (Pair Q included) → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the one durable rule (edit the seven guard copies together) is CI-enforced by `Skill/pin guard parity`, so no always-loaded line is needed

Doc-drift sweep (README §"AI-referenced docs"):
- `docs/PLATFORMS.md`: updated (guard paragraph). `docs/MIGRATION.md` §1.0: updated (one clause). `docs/CONTEXT-BUDGET.md`: updated (rows 49, 98; not in the AI-doc list but its prose went stale).
- `README.md`, `AGENTS.md`, `SPEC.md`, `claude/AGENTS-snippet.md`, `codex/`/`cursor/`/`grok/` snippets, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: no change. None describes Step 0 path resolution or `/ft-update`'s step list. `AGENTS.md` §"Validation" roster unchanged (the CI step is additive to the `drift` job, like Pair R).
- `docs/AGENT-NEUTRALITY.md`: no change. The new PLATFORMS sentences sit in the section that already names `~/.claude/skills` as a locator, and the guard is phrased runtime-neutrally ("if the runtime names this skill's base directory").

**Final Summary:**

Shipped a skill/pin guard. Every adopter-subset Claude body that resolves `<root>` (ft-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic, ft-refactor, ft-seed) now stops with `⛔ skill/pin mismatch` when the runtime names its base directory outside the adopter project, or when a fragment, SPEC module, or template it names is absent. That catches an agent-home body (tracking flaitron's working tree) running against an older pin, the live CORE-724.4 `preamble.md` break. The design is path-identity over a version guard, because the working tree keeps the v6.0.0 Version line.

- **`/ft-update`** gains Step 4.7: an ask-first, report-only agent-home shadow probe over named flaitron slugs. The recap carries its hits.
- **CI** gains `Skill/pin guard parity` (one variant × the named seven).
- **Docs:** PLATFORMS and MIGRATION document the mechanism and its limits.
- **Cross-repo:** natabula NAT-379 (read-roots script, `7ddb59c`) and flaitron CORE-730 (global-skill-conflicts park, `d9a4ec42`) carry the agent-home access and audit work. CORE-730 also holds the review-deferred `--unattended` stop shape and the `ft-release` "global symlink" description.

Verification: acceptance greps, the CI budget step, all 17 CI drift steps (local, CI shell), viz 587/587, and the updater suite all → 0. Two `/code-review medium` passes: pass 1 had 4 blockers and 6 notes, all fixed or filed; pass 2 had 8 notes, 7 fixed and 1 filed. Refactors: none. Maintainability: one byte-identical paragraph, CI-guarded, in place of silent cross-version execution.

**Archived:** 2026-10-07
