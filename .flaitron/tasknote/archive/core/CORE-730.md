---
title: global-skill-conflicts
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-729, CORE-613, CORE-674]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/gate-postures.md
  - docs/PLATFORMS.md
  - claude/skills/ft-close-epic/unattended-close-epic.md
  - docs/CONTEXT-BUDGET.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-seed/SKILL.md
  - claude/skills/ft-task/SKILL.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-730 | global-skill-conflicts

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-729]]

## 🎯 Goal

Detect flaitron skill slugs in agent homes (`~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills`) that shadow repo-scoped wiring, and make `/ft-release` §7.1's machine-global parity check actually run now that natabula NAT-379 can grant read access to those homes.

## ✅ Acceptance

- [x] §7.1's machine-global half asks first (one AskUserQuestion naming `~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills`), and its refused-read "not run" line names natabula's `scripts/grant-global-skill-read.sh` as the remedy — `grep -c 'grant-global-skill-read' claude/skills/ft-release/step-7.1-standing-checks.md` ≥ 1 + `judgment` (ask wording read)
- [x] §7.1 adds an advisory over-install scan: `ft-*` entries in the three homes other than the global-only utilities, symlink or copy — `grep -q 'OVER-INSTALL' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] `/ft-release`'s description stops claiming a global symlink — `grep -c 'global symlink' claude/skills/ft-release/SKILL.md` → 0
- [x] The skill/pin guard stop has an `--unattended` shape (`⏸ --unattended stop — skill-pin-mismatch: …`, no park) in both the fragment and its SPEC contract — `grep -l 'skill-pin-mismatch' claude/skills/ft-task/unattended-mode.md SPEC/gate-postures.md | wc -l` → 2
- [x] `/ft-update` Step 4.7's refused-read line names the remedy (a `read` root, armed by the operator) without citing maintainer-only tooling, since it ships to adopters — `grep -q 'read. root' claude/skills/ft-update/SKILL.md && ! grep -q natabula claude/skills/ft-update/SKILL.md`
- [x] The machine-global scan actually ran this session (operator-approved paths) and its result is recorded — `judgment`: the outcome depends on live machine state; the receipt is the scan's output, or the refusal plus its remedy
- [x] Context budgets and CI drift steps hold — CI `Context budget` step + `drift` job steps, run locally → 0

## 🧩 Subtasks

- [x] `step-7.1-standing-checks.md` machine-global half: ask-first paragraph, add `~/.agents/skills` to the scans, over-install command, "not run" line with remedy
- [x] `ft-release/SKILL.md`: fix description; §7.4 verdict example names over-installs
- [x] `ft-update/SKILL.md` Step 4.7: remedy pointer on a refused read
- [x] `unattended-mode.md` §"Pre-scaffold stops" + `SPEC/gate-postures.md` §"Pre-scaffold stops": skill/pin-mismatch stop bullet
- [x] Phase 3: acceptance greps, budget + drift steps, live scan, external review

## 🔗 Related

- [[CORE-729]] — parent; shipped the skill/pin guard and filed this sidequest
- [[CORE-613]] · [[CORE-674]] — `/ft-release` cuts that logged the machine-global parity check as "not run — path-access guard"
- natabula NAT-379 — prerequisite (operator-run `grant-global-skill-read.sh`), completed 2026-10-07

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The prerequisite natabula NAT-379 closed today (2026-10-07). The §7.1 machine-global check has logged "not run — path-access guard" at every cut since CORE-553 (CORE-613 and CORE-674 included), and CORE-729 left three review notes parked in this stub. None of them has been addressed elsewhere.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

> Carried from the retired sidequest stub:
>
> **Idea**
>
> Once natabula NAT-379 lets flaitron sessions read agent homes (`read` roots for `~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills` in `~/.claude/path-access-roots`), check them for flaitron slugs that shadow repo-scoped wiring. CORE-729's skill/pin guard stops those runs in adopters. Also make `/ft-release` §7.1's "Self-wiring parity machine-global (advisory)" check actually run instead of logging "not run — path-access guard" every cut (CORE-613, CORE-674). Square `/ft-release`'s description ("Flaitron-self only (global symlink)") with PLATFORMS ("`ft-release` [is] never installed globally"); CORE-729's review flagged the contradiction. Also from that review: give the skill/pin guard stop an `--unattended` shape (`⏸ --unattended stop` cause / `park-reason:` code) in `claude/skills/ft-task/unattended-mode.md`.
>
> **Resume anchor**
>
> CORE-729 Phase 2: guard, PLATFORMS paragraph, `/ft-update` Step 4.7, and the NAT-379 filing were done; next came Phase 3 verification.

- **Access is two layers.** The NAT-195 hook needs `read` roots, which the operator arms with natabula's `scripts/grant-global-skill-read.sh` (NAT-379 shipped the script; the live append is the operator's act). The prose rule in `~/.claude/CLAUDE.md` §"Path Access" still requires per-path approval in the conversation. NAT-379's recap says a standing exception there is an operator follow-up. So §7.1 asks first, the same shape as `/ft-update` Step 4.7. That approval satisfies the prose rule, and the hook either admits the read or refuses it, which reports "not run" plus the remedy.
- **Over-install is the shadow check for flaitron-self.** PLATFORMS §"One canonical install path per project" says an agent home carries only the global-only utilities. CORE-439 deferred making §7.1 check over-install ("Candidate follow-up if the rule proves hard to hold"), and CORE-729 then found exactly that: `~/.claude/skills/ft-task` was shadowing repo-scoped wiring. The scan reads names only (`find -maxdepth 1 -name 'ft-*'`) and never lists a home's other entries. Its allowlist is the two `(global-only)` rows of the same fragment's exclusion list, so policy has one in-file source.
- **Homes.** The scan covers the three roots NAT-379 grants. `~/.agents/skills` is new to §7.1, because PLATFORMS names it as the cross-agent shadow surface. `/ft-update` 4.7's wider six-home probe stays as it is: the extra homes simply refuse until the operator grants them.
- **Unattended shape.** The guard stop is a `⏸ --unattended stop`, not a park. It fires at Step 0 (pre-scaffold) or on a lazily read missing file after earlier writes, and the guard already says "make no further write". A park would be one, and resuming through the same mismatched body cannot succeed. Stop causes are an open kebab-case vocabulary (`foreign-dirt`, `open-siblings`, `flag-conflict`, …), so no `SPEC/blocked.md` closed-set change is needed. `/ft-close-epic` inherits it through the shared pre-scaffold stop shape (`unattended-close-epic.md:24`).
- **Description.** `ft-release`'s "(global symlink)" predates CORE-439, which made `ft-release` repo-scoped in flaitron's own checkout. PLATFORMS line 109 is canonical.
- **Budgets.** The `ft-release/**` directory total is 118,051 of 125,000. `gate-postures.md` is 20,559 of 22,000 (one bullet, ~400 bytes, fits). `unattended-mode.md` is 16,735 and has no specific row.
- **Archive skim** (`archive/core/`, confirmed against README). CORE-439: the repo-scoped-wins rule plus the deferred over-install check. CORE-729: the guard, Step 4.7, and the three review notes filed here. CORE-613 and CORE-674: the "not run" logs. CORE-677.2 and CORE-711.1: earlier operator-approved inventories found dangling global links, which is why the dangling scan stays.
- **Drift check.** The PLAN line matches. NAT-379 is `[x]` in natabula. Cited lines match: `ft-release/SKILL.md:3`, PLATFORMS:109, `step-7.1-standing-checks.md:82-95`, and `ft-update` 4.7 lines 189-208.
- **Clarifications (AskUserQuestion, 2026-10-07).** (1) Ask first at each cut. (2) Add an advisory over-install scan. (3) Run the scan live now as Phase 3 verification; the operator approved `~/.claude/skills`, `~/.claude/commands` and `~/.agents/skills` for this session.
- **Best practices.** Doc/skill prose plus shell snippets only. Extend the existing advisory block instead of adding a new check section; derive the allowlist from the in-file exclusion list.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown skill/SPEC prose and an operator-run shell snippet; the snippet was exercised live and negative-tested (Testing Notes)

**Implementation Notes:**

- **Pattern survey.** I extended the existing advisory "Machine-global wiring" block rather than adding a section. The ask-first paragraph copies `/ft-update` Step 4.7's shape: one AskUserQuestion naming the homes, a name-filtered probe, and degrade-to-"not run". The over-install allowlist points at the two `(global-only)` rows of the same fragment's exclusion list. The `--unattended` bullet joins the existing §"Pre-scaffold stops" list in both the fragment and its SPEC contract.
- **Hook finding (live).** The first draft's over-install filter `grep -Ev '/ft-(…)'` was refused by the path-access hook, which read the pattern's leading `/` as a walk root. That would have made the new command fail at every cut even with roots armed. I changed it to `[/]ft-(…)`, with a sentence saying why, so nobody "simplifies" it back.
- **PLATFORMS.** I added one clause naming `/ft-release` §7.1 as the maintainer-side detection surface beside `/ft-update` 4.7. Its touches entry was added mid-Phase 2.
- **Refactor.** None.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for viz/updater suites (no viz or `tools/` source touched); the CI `drift` job steps are the targeted suite for skill/SPEC prose

- [x] Ran lint/type-check on changed code — `git diff --check` → 0; no TS/JS touched

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final run, after review pass 4 fixes):

- A1 `grep -c 'grant-global-skill-read' claude/skills/ft-release/step-7.1-standing-checks.md` → 0 (count 1). Judgment: the ask names the three homes plus any symlinked home's target, Run is listed first, and a refused read records the remedy.
- A2 `grep -q 'OVER-INSTALL' …standing-checks.md` → 0
- A3 `grep -c 'global symlink' claude/skills/ft-release/SKILL.md` → 0 (count 0). The body line "symlinked under `~/.claude/skills/ft-release` … for global invocation" was also fixed after review pass 4, and `grep -ciE 'global symlink|for global invocation'` → 0.
- A4 `grep -l 'skill-pin-mismatch' claude/skills/ft-task/unattended-mode.md SPEC/gate-postures.md | wc -l` → 2. The SPEC bullet pins the line shape, and all seven guard copies carry the `⏸` form.
- A5 `grep -q 'read. root' claude/skills/ft-update/SKILL.md && ! grep -q natabula claude/skills/ft-update/SKILL.md` → 0
- A6 **Live scan, operator-approved for this session** (`~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills`). I ran the final shipped block verbatim, and the hook admitted it, so the NAT-379 roots are armed. Dangling: none. Casing: one line (6 links into one checkout). Over-install: none. Exit 0. The first draft was refused by the hook (`grep -Ev '/ft-…'` read as a walk root), which is why the shipped command uses `[/]`.
- Fixture tests (scratchpad): with a symlinked home, `find` without `-H` finds 0 and `find -H` finds 2. The over-install filter on synthetic paths flags `ft-task`, `ft-release`, `ft-task.md` and `ft-new-project-x`, and passes `ft-new-project` and `ft-audit-repo.md`. An empty `allow` takes the not-run branch.
- A7 every CI workflow step run locally under `bash -e` (gitleaks skipped): 16/16 → 0. That includes `Context budget` (`ft-epic-discovery` 32,195 ≤ 33,000; `ft-release/**` 120,430 ≤ 125,000), `Skill/pin guard parity` (one variant ×7), and Pair Q (new § citations resolve).
- `git diff --check` → 0.
- Structural: there is no dead code. The allowlist is derived from the in-file exclusion list rather than restated. The seven-way guard clause is the deliberate CI-enforced copy (CORE-729).

External review: `/code-review medium`, working-tree diff, four passes.

- **Pass 1** (10 findings). **Blocker**: `/ft-close-epic`'s closed `<cause>` list lacked `skill-pin-mismatch`, contradicting the Discovery claim that it inherits the stop; fixed. **Notes fixed**: the pre-scaffold section scope versus a post-write stop; "Step 0" mislocated the guard; the §7.1/§7.4 label mismatch; dangling links double-counted as over-install; relative-target false casing; the missing default on the ask; and the hand-copied allowlist, now derived. **Notes for closure**: missing receipts and the stale PLAN wording, both handled at closure.
- **Pass 2** (10). **Blocker**: the `⏸` shape was unreachable, because the guard runs before `unattended-mode.md` loads. I moved the `⏸` form into the 7× guard paragraph itself. **Notes fixed**: the close-epic SKILL/fragment intros; the gate-postures intro; the empty allowlist; PLATFORMS "at each cut" made conditional; casing extended to `~/.agents/skills` with an absolute-only filter; and `touches:`. **Note, partly declined**: a default-Skip ask would regress to "not run" every cut, so the ask lists Run first.
- **Pass 3** (10). **Blockers (judgment)**: the SPEC bullet did not pin the line shape (fixed), and a symlinked home scanned as a false clean (fixed with `find -H`, fixture-tested). **Notes fixed**: the empty allowlist now skips the scan (ugrep rejects the empty group); non-checkout targets in casing; the `/ft-update` remedy no longer names maintainer-only natabula tooling (it ships to adopters; A5 was re-worded to match); the `ft-close-epic` budget figure; and the load-order wording. **Note, declined**: the guard's `⏸` clause also sits in bodies without `--unattended`, but CI's one-variant ×7 parity requires identical copies, at about 114 bytes each.
- **Pass 4** (10; no hard blockers). **Fixed**: the A3 body line still claimed global symlinks; PLATFORMS:98's "only broken links are drift"; PLATFORMS coverage now says "three homes it scans"; the ask names a symlinked home's target; the `.flaitron/` segment no longer reads as a checkout in casing; whole-home double-count prose; the committed-versus-uncommitted wording in the guard stop; and A1 wording (the remedy is for refused reads only). **Note, declined**: probing named slugs as Step 4.7 does instead of enumerating. Enumeration catches copies of retired or unknown slugs, it is name-filtered to `ft-*`, and the tradeoff is now stated in the fragment.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep (README §"AI-referenced docs"):
- `docs/PLATFORMS.md`: **updated**. §"Installed-surface policy" now names broken, mis-cased, and over-installed links as drift. §"One canonical install path per project" names `/ft-release` §7.1 as the maintainer-side detection beside `/ft-update` 4.7.
- `docs/CONTEXT-BUDGET.md` (not in the list): **updated**. The row 49 figures and the ledger row 98 entry.
- `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: **no change**. CONTRIBUTING §"Machine-global installs: utilities only" already states the rule the new scan enforces. CAPABILITIES' "terminates and writes nothing" covers `/ft-file-followup --unattended`'s unanswerable inputs, not the guard.

Learnings: N/A for the always-loaded layer. One durable fact is recorded in the fragment itself: the path-access hook reads a leading `/` token in a `find` pipeline as a walk root, so release scans quote patterns with `[/]`.

**Final Summary:**

`/ft-release` §7.1's machine-global check now runs instead of logging "not run" at every cut. It asks first, naming the three agent homes that NAT-379's roots cover, and degrades to a `not run` line that names the remedy. It gains an advisory **over-install** scan that reports `ft-*` entries beyond the global-only utilities (the shadows CORE-729's guard trips on in adopters). It also follows symlinked homes (`find -H`), derives its allowlist from the in-file exclusion list, and was proven live against this machine: clean, 6 links, one checkout. The skill/pin guard's `--unattended` form, `⏸ --unattended stop — skill-pin-mismatch: …; wrote …`, now lives in the guard paragraph of all seven bodies, where it is reachable, and is contracted in `SPEC/gate-postures.md` and both posture fragments. `/ft-release`'s description and body no longer claim a global install. `/ft-update` 4.7's refused-read line names the operator's read-root remedy.

- **Changed:** 16 files: §7.1 fragment, `ft-release` body, `ft-update`, seven guard copies, `unattended-mode.md`, `unattended-close-epic.md`, `gate-postures.md`, PLATFORMS, CONTEXT-BUDGET. The sidequest stub was retired.
- **Verification:** acceptance greps, the live scan, fixtures, and 16/16 CI steps → 0. Four review passes: 4 blockers fixed, 3 notes declined with reasons.
- **Refactors:** none.
- **`touches:` reconciliation:** `git diff --name-only` = the declared paths, plus the retired `.flaitron/sidequest/CORE-730.md` (the promotion contract deletes it) and this tasknote. No other undeclared path.
- **Maintainability:** CORE-439's deferred over-install check now exists, and the allowlist has one source. The CI parity check keeps the guard's `⏸` clause identical across all seven copies.

**Archived:** 2026-10-07
