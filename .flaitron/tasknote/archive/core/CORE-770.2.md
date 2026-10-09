---
title: memory-refresh
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-770, CORE-770.1]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - ~/.claude/projects/-Users-fakeneuron-Code-flaitron/memory/ (outside the repo; agent-owned memory)
parallel-safe-with:
  - CORE-770.3
  - CORE-770.4
---

# CORE-770.2 | memory-refresh

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-770]]

## 🎯 Goal

Bring the seven flaitron-project memory files and their MEMORY.md index in line with v7 — current names, slugs, paths and the `SPEC/post-closure.md` step 3 next-move shape — without changing what each rule says.

## ✅ Acceptance

- [x] No stale name survives in the memory dir — `grep -rniE 'flowtron|/ft-starter-task|/ft-epic-discovery|/ft-file-followup|ft-audit-context|_project/PLAN|\.flowtron' <memory-dir>` prints nothing
- [x] The next-move memory describes the `post-closure.md` step 3 shape (label line plus own-line invocation, 👇 exception) and no literal `/clear` / `/model` — `grep -rnE '/clear|/model' <memory-dir>` prints nothing
- [x] Every MEMORY.md pointer resolves to a file and every file has a pointer — `judgment` (checked by listing the dir against the index)
- [x] Each rule's substance is unchanged — `judgment` (reviewed by reading each before/after diff)

## 🧩 Subtasks

- [x] Get operator approval naming the memory dir, then read all seven files and MEMORY.md
- [x] Verify each file's current-name claims against flaitron (skill roster, `SPEC/post-closure.md`, `.flaitron/` paths)
- [x] Rewrite the stale names and paths, per file
- [x] Rewrite the next-move copy-paste shape to match `SPEC/post-closure.md` step 3
- [x] Update the MEMORY.md index hooks to match
- [x] Run the Acceptance greps

## 🔗 Related

- [[CORE-EPIC-770]] — parent epic (global-layer-alignment)
- [[CORE-770.1]] — Discovery; its Discovery Notes §B lists the stale memory files and why

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-770.1 found six of the seven memory files stale against v7, and I confirmed it by reading all seven. Nothing has changed since: flaitron's skill roster and `SPEC/post-closure.md` step 3 are as the row describes.

- [x] Read relevant source files — read the seven memory files, `SPEC/post-closure.md`, `ls claude/skills`, `claude/skills/ft-audit/SKILL.md` (domains), `README.md` and `docs/CONVENTIONS.md` (Obsidian), `tools/update-adopters.mjs` (no-push claim). Small read set, so no probe.

- [x] **Best Practices Review** — `N/A`: memory prose, no code or module boundary

- [x] **Archive skim** — `archive/core/` resolves from the README table (`CORE-*` → `archive/core/`). Relevant: `CORE-770.1` (source of the stale list). No other tasknote touches the memory dir.

- [x] **Drift check** — PLAN line matches `.1`'s Discovery Notes §B. One drift against that list: `.1` says `/ft-epic-discovery` and `/ft-file-followup` are "renamed"; the roster confirms the current names are `/ft-open-epic` and `/ft-file-task`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — one ask, the memory-path approval (granted for `/Users/fakeneuron/.claude/projects/-Users-fakeneuron-Code-flaitron/memory/`). Assumptions below.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Hook friction.** The NAT-195 hook blocks Bash on the approved memory path even with in-conversation approval, because the root is not in `path-access-roots`. Read and Edit on named files work, so the task proceeds without `ls` or `grep` on the dir. The Acceptance greps need either the operator to add the root or the Grep tool on the approved path.
- **Assumptions.**
  - Rename names and paths only. Rule text, dates, and the originSessionId fields stay.
  - File names and `name:` fields stay as they are (surgical). The `[[...]]` links use file stems while `name:` fields are hyphen slugs on two files; this predates v7, so it is out of scope and reported in the recap.
  - Historical task IDs (CORE-018, CORE-022, CORE-EPIC-483) stay.
- **Findings beyond `.1`'s list.**
  - `feedback_no_cd_before_git` also says `flowtron` (path and repo name in its 2026-05-11 narrative).
  - `project_obsidian_positioning` cites `docs/OBSIDIAN.md`, which does not exist in the tree or in git history. The live surface is `README.md` §"Working in markdown vaults" and `docs/CONVENTIONS.md`.
  - `feedback_playwright_artifact_paths`: `.flaitron/screenshots/viz-board.png` is the tracked README hero shot, so that carve-out still holds under the new dir name.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** No code. The rewrite follows `SPEC/post-closure.md` step 3 verbatim: label line, own-line inline-code invocation, 👇 exception, no literal clear/model commands.
- **Edits (12 in memory files, 4 in the index, all name/path/shape only):**
  - `feedback_post_closure_suggest_next`: closure bullet rewritten to the step 3 shape; `/task` → `/ft-task`; SPEC pointer → `SPEC/post-closure.md`.
  - `project_obsidian_positioning`: flowtron → flaitron (5 spots); `docs/OBSIDIAN.md` → `README.md` §"Working in markdown vaults".
  - `feedback_playwright_artifact_paths`: `.flowtron/screenshots/` → `.flaitron/screenshots/`; flowtron → flaitron (2 spots); `viz-board.png` path made explicit.
  - `feedback_no_cd_before_git`: flowtron → flaitron (3 spots, including the historical path).
  - `feedback_no_premature_slash_commands`: `/ft-starter-task` → `/ft-file-task` in the description; the `/clear then /model` example → "clear-session label line"; the epic bullet rewritten for `/ft-open-epic` and `👇 Run in this session:` (retired `✋` cue and the `/ft-close-epic` attribution dropped, with the `post-closure.md` step 3 pointer in their place).
  - `feedback_no_bulk_adopter_push`: flowtron → flaitron (2 spots).
  - `feedback_no_scratchpad_files`: `_project/PLAN.md` → `.flaitron/PLAN.md`; `/ft-audit-context` → `/ft-audit context`; flowtron → flaitron.
  - `MEMORY.md`: three hooks fixed, plus the step 3 shape added to the first hook.
- **Hook false positive.** A sed expression containing the literal `/clear|/model` was read as a path by the NAT-195 hook and blocked; I used Edit instead. Same class as the `sed -n '/CORE-EPIC-770/p'` case in `.1` §C, so it rides along as evidence for `.4`'s rows.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests, lint/type-check, 👁️ CONFIRM: `N/A`: memory prose, no code or UI.
- **External review:** `N/A`: the deliverable lives outside the repo, where a reviewer context would hit the same Path Access block; the in-repo diff is only this note and the PLAN stub. Substance check done by me instead (see criterion 4 below).
- Receipt (the operator ran the combined grep in-session, because the hook blocks Bash on the memory dir):

```text
grep -rniE 'flowtron|/ft-starter-task|/ft-epic-discovery|/ft-file-followup|ft-audit-context|_project/PLAN|\.flowtron|/clear|/model' <memory-dir> → exit 1 (no matches)
```

  That one run covers criteria 1 and 2.
- Criterion 3 (pointers): all seven files were opened by the names the index lists, and each has a hook line. I could not `ls` the dir, so a stray eighth file is unchecked; Discovery `.1` counted seven.
- Criterion 4 (substance): every edit swapped a name, path or command shape. The one removal is the retired `✋` cue and the `/ft-close-epic` attribution in `feedback_no_premature_slash_commands`; its replacement points to the live rule in `SPEC/post-closure.md` step 3.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A`: memory is agent-owned and outside flaitron's contract

**Final Summary:**

The seven flaitron-project memory files and their index now use v7 names and paths and the `SPEC/post-closure.md` step 3 next-move shape. No rule's meaning changed.

- **Changed files:** all outside the repo, under the approved memory dir: 7 memory files plus `MEMORY.md`. In the repo, only `.flaitron/PLAN.md` and this note.
- **Verification:** combined stale-name grep → exit 1 (no matches), run by the operator. Criteria 3 and 4 judged by reading.
- **Refactors:** none.
- **Doc verdict:** no change for every `README.md` §"AI-referenced docs" entry. The task edits only agent memory, and flaitron's docs never cite it.
- **`touches:` reconciliation:** declared the memory dir. `git diff --name-only` shows none of it, since it is not in the repo; the repo diff is `.flaitron/PLAN.md` and the archived note only.
- **Not covered:** the `[[...]]` links in the memories use file stems while two `name:` fields are hyphen slugs. That predates v7 and is out of scope.
- **Hook evidence for `.4`:** the NAT-195 hook blocks Bash on an operator-approved path, and it read a `/clear|/model` regex as a path.
- **Maintainability:** the next-move memory now points at the live rule instead of copying a shape that has already drifted twice.

**Archived:** 2026-10-09
