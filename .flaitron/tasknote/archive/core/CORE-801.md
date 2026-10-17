---
title: public-privacy-scrub
status: completed
tags: []
created: 2026-10-17
due:
related-tasks: []
touches:
  - .flaitron/
  - brand/README.md
  - brand/PROMPTS.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - docs/CODEX-VERIFICATION.md
---

# CORE-801 | public-privacy-scrub

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Audit this public repo's tree and history for operator home paths and private project names, scrub those leaks from the product paths, and record the findings.

## ✅ Acceptance

- [x] No operator absolute-home prefix, no capital-C operator code directory, and no personal gmail in the tree — `judgment` (the needles cannot be committed; Phase 3 records each hit count as 0)
- [x] The synthetic fixture stays — `git grep -F '/Users/x/' -- viz/src/ui/TaskDetail.test.tsx` prints the fixture line
- [x] Private project names are gone from `.flaitron/` except the tracked `caobunga-status` filename token — `judgment` (the denylist is not committed; Phase 3 runs it from a temp file and records the hit count)
- [x] PLAN Vision no longer names the origin projects — `judgment` (the verify command would republish the names; read the Vision paragraph)
- [x] `docs/PHILOSOPHY.md`, `docs/GATE-DISCIPLINE.md`, and `docs/VERSION-HISTORY.md` are unchanged — `git diff --name-only -- docs/PHILOSOPHY.md docs/GATE-DISCIPLINE.md docs/VERSION-HISTORY.md` prints nothing
- [x] The named product pointers no longer carry the private fleet name or the chamber-source project — `judgment` (same denylist, scoped to `brand/README.md`, `brand/PROMPTS.md`, the two `ft-release` files, and `docs/CODEX-VERIFICATION.md`)
- [x] Lowercase `~/code` adopter default remains — `git grep -F '~/code' -- README.md` prints a hit
- [x] Markdown drift checks pass — `bash tools/drift-checks.sh` → exit 0

## 🧩 Subtasks

- [x] Rewrite the PLAN Vision sentence so it keeps `~/code/` and drops the origin-project names
- [x] Reword the unlabelled product pointers in `brand/`, `ft-release`, and `docs/CODEX-VERIFICATION.md` so they say `operator-private` and do not name the fleet repo or the chamber source
- [x] Mechanically scrub `.flaitron/`: absolute home prefixes, the capital-C operator code directory, the home-relative operator directory, the personal email, and private project names. Leave the tracked `caobunga-status` filename token intact
- [x] Confirm the three narrative docs and the `/Users/x/` fixture are untouched
- [x] Run the structural greps, the temp-file denylist, and `bash tools/drift-checks.sh`

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The public tree on `origin/main` still contains operator home paths and private project names, mostly under `.flaitron/` and also in PLAN Vision. The scrub is real work; two execution rulings stay with the operator.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

  N/A — content scrub, not a module-boundary change. The prior scrub shape to extend is CORE-652 (reword adopter-facing pointers, label retained operator-private ones), not a new redaction dialect.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Area resolves to `archive/core/` via `.flaitron/tasknote/README.md` §"Archive layout" (`CORE-*`). The PLAN row is unchecked under `## High`. No `[unattended]` marker. No tasknote, archive copy, or sidequest stub existed at entry. Working tree was clean; this note is the only new file.

Published state: `github.com/fakeneuron/flaitron` is public. `origin/main` contains the leaks. Local `main` is 10 commits ahead of `origin/main` (not yet pushed), including the commit that filed this row.

Working-tree classes (HEAD):

- Absolute `/Users/<user>/` paths: 33 files, 83 matches, all under `.flaitron/tasknote/archive/`. The only product hit is `viz/src/ui/TaskDetail.test.tsx`, a synthetic `/Users/x/` fixture. Leave that fixture.
- Capital-C operator code directory: 53 files / 184 matches, all inside `.flaitron/`. That casing is this machine. Lowercase `~/code` outside `.flaitron/` is the product's adopter-workspace default (13 files) and stays.
- `~/.claude`, `~/.agents`, `~/.grok`, `~/.codex`, `~/.cursor` outside `.flaitron/` are the documented global skill homes and stay. The same tokens inside dogfood are mixed with operator-specific notes.
- Private project names and one personal email sit mostly in `.flaitron/` (archive tasknotes plus PLAN Vision). Product files that also name them: `docs/PHILOSOPHY.md` (origin story), `docs/GATE-DISCIPLINE.md` (one motivating case), `docs/VERSION-HISTORY.md` (the decoupling entries), `brand/README.md`, `brand/PROMPTS.md`, and two `claude/skills/ft-release/` files.
- Git author email is on every published commit (~1517 on `origin/main`) plus one local-only author. A working-tree scrub does not touch commit metadata.

Archive skim (`archive/core/`, re-checked against the README table):

- CORE-383 — README screenshot was recaptured so the public board would not show the private project roster.
- CORE-652.2 / CORE-652.N — non-archive private-fleet pointers were reworded or labelled `operator-private`. Archives, `PLAN-ARCHIVE.md`, and `PLAN.md` were an explicit exclusion, not a finding that they were clean. Write-once is why that epic left them. This task's PLAN line reopens the dogfood and names PLAN Vision.

Drift: the PLAN line matches the tree. `~/code` as the product default is not the leak; the capital-C operator code directory and absolute home paths are. CORE-652's "no bare private pointer" rule has regressed: `ft-release` and `brand/README.md` name the private fleet layer without the `operator-private` label. SPEC write-once still says archived tasknotes are historical records; scrubbing them is the exception this row asks for, and the dogfood ruling allows it. No cross-repo edit: private repos are not touched from here (`SPEC/scope-boundaries.md`).

Operator rulings (2026-10-17):

- History: accept what is already published. Scrub the working tree only. No force-push. The git author email stays on existing commits.
- Dogfood: stays public and is scrubbed in place, including archived tasknotes. Write-once yields for this task only.
- Product prose: scrub PLAN Vision, and reword the unlabelled bare pointers. Leave `docs/PHILOSOPHY.md`, `docs/GATE-DISCIPLINE.md`, and `docs/VERSION-HISTORY.md`. Lowercase `~/code` and the `~/.claude`-style skill homes stay. The `/Users/x/` fixture stays.

Assumptions recorded with those rulings:

- `docs/CODEX-VERIFICATION.md` has one bare fleet-layer sentence in the same class as the `ft-release` pointers. It is in the scrub set. It was not named in the question because the first inventory missed the capital-N spelling.
- `caobunga-status.md` stays. CORE-597 made that filename the deliverable. The scrub protects the literal `caobunga-status` token inside dogfood so those references still name the file. Other uses of that project name in dogfood are scrubbed. VERSION-HISTORY's decoupling entry is on the leave list and still names it.
- Already-labelled `operator-private` lines (`justfile`, `.gitleaks.toml`, `docs/CONVENTIONS.md`) stay. They do not carry a project name.
- Replacement in dogfood is mechanical: home prefixes become `~` / `~/code`, and each private project name becomes a stable `project-NN` token. The legend is not committed. History still contains the real strings, which the history ruling accepts.
- No cross-repo edit.

Discovery surfaced no significant deviation → skip 🛠️. The three rulings follow the filed line (scrub the tree, operator chooses history and dogfood publicity) and the product-file list is that line's "also in this PLAN's Vision" made concrete.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: live product pointers follow CORE-652 — reword so the line says `operator-private` and no longer names the fleet repo or the chamber source. The archive is 210 files of the same substitution, which hand-rewording does not scale, so dogfood uses one mechanical pass: home prefixes become `~` or `~/code`, and each private project name becomes a stable `project-NN` token. The legend is not committed. History still has the original strings, per the history ruling.

No code refactor. A committed denylist test would republish the names, so the regression check is the drift suite plus the Phase 3 counts.

Left in place, on purpose: `docs/PHILOSOPHY.md`, `docs/GATE-DISCIPLINE.md`, `docs/VERSION-HISTORY.md`, the `/Users/x/` fixture, lowercase `~/code`, the `~/.claude`-style skill homes, already-labelled `operator-private` lines, and `caobunga-status.md` (CORE-597's filename). The literal `caobunga-status` token inside dogfood is protected so those references still name the file.

`docs/CODEX-VERIFICATION.md` is in the scrub set as the same bare-pointer class as `ft-release`. The first inventory missed it because of a capital N.

The first review returned two blockers, both in the mechanical pass. The status-file sentinel contained the project name, so the name replace rewrote the sentinel and the restore missed. Those 56 bracket tokens are the literal `caobunga-status` again, including the CORE-597 completed-task shortname. Six capital-C directory segments that were not the tilde form (`Code/flowtron`, `…/Code`, and `/…/Code/flowtron`) are now lowercase `code`. `Claude Code` is unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Testing Notes:**

No code changed, so the viz suite, typecheck, and lint were not run. The acceptance greps and the drift suite are the checks. Structural review: substitutions only, no new code, no dead code. `git diff --check` → 0.

```text
home-prefix tracked count → 0
capital-C directory-segment count → 0
personal-gmail tracked count → 0
denylist in .flaitron/ after masking the status-file token → 0
denylist in the five product pointer files → 0
git grep -F '/Users/x/' -- viz/src/ui/TaskDetail.test.tsx → 0
git diff --name-only -- docs/PHILOSOPHY.md docs/GATE-DISCIPLINE.md docs/VERSION-HISTORY.md → 0
git grep -F '~/code' -- README.md → 0
bash tools/drift-checks.sh → 0
```

The two greps that must print a hit exited 0 and printed one. The narrative-doc name-only diff printed nothing. A word-boundary credential scan of added lines was 0.

External review, re-run after the two Phase 2 fixes: no blockers. Counts from that probe: brackets 0, path segments 0, home 0, gmail 0, denylist-dogfood 0, denylist-product 0. One note, `.flaitron/tasknote/archive/core/CORE-439.md:97` (and the next line): an absolute install path whose username is already an ellipsis. Disposition: declined. That column records an absolute path on purpose, and the account is already redacted. Not filed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Scrubbed the working tree. Published history stays as it is. The dogfood stays public and was scrubbed in place, including archived tasknotes. PLAN Vision no longer names the origin projects. Unlabelled product pointers now say `operator-private`. The three narrative docs, the status filename, the `/Users/x/` fixture, and lowercase `~/code` stay.

Doc-drift, each entry no change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. `SPEC/*.md` and skill bodies stay outside the sweep on volume. This task did edit two `ft-release` files and `docs/CODEX-VERIFICATION.md`; those are outside the sweep and were checked under Acceptance. No superseded-claim pointer. No new PLAN row: the history ruling and the status filename are decisions, not deferred work.

`touches:` matches the diff once this note and the PLAN row are set aside: `.flaitron/`, `brand/README.md`, `brand/PROMPTS.md`, the two `ft-release` files, and `docs/CODEX-VERIFICATION.md`. No refactor. A public reader of the tree now sees `project-NN` tokens instead of the private roster. The legend is not in the repo. History still has the original strings.

**Learnings:** N/A

**Archived:** 2026-10-17
