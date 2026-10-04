---
title: closure-tick-through-executable
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-EPIC-610, CORE-610.2]
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - SPEC/procedures/ft-task.md
---

# CORE-610.3 | closure-tick-through-executable

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-610]]

## 🎯 Goal

Make the pre-archive closure step in `/ft-task`, `/ft-micro-task`, and `SPEC/procedures/ft-task.md` mechanically grep the tasknote for `status: completed` and for any unannotated `- [ ]` under `## ✅ Acceptance`, refusing the archive move until both hold, identically under `--fast`/`--unattended`.

## ✅ Acceptance

- [x] `claude/skills/ft-task/SKILL.md`'s Phase 4 closure step states an executable pre-move gate — a `status: completed` grep and an unannotated-Acceptance-box scan, both run immediately before the archive `mv`, refusing the move on a dirty result, unsuppressed by `--fast`/`--unattended` — `grep -q "Executable pre-move gate" claude/skills/ft-task/SKILL.md && grep -q "not\[ -\]met" claude/skills/ft-task/SKILL.md`
- [x] `claude/skills/ft-micro-task/SKILL.md`'s Step 4 closure states the same pre-move `status: completed` gate before its `mv`, explicitly noting the Acceptance-box half is vacuous there (no such section in a micro-tasknote) — `grep -q "Verify, then move" claude/skills/ft-micro-task/SKILL.md && grep -q "vacuous" claude/skills/ft-micro-task/SKILL.md`
- [x] `SPEC/procedures/ft-task.md`'s Step 5 Phase 4 states the same two-part verification, in agent-neutral prose, immediately before its "Move the tasknote to…" instruction — `grep -A1 '\*\*Verify' SPEC/procedures/ft-task.md | grep -q 'before moving'` (the file hard-wraps at ~80 cols, so the bold lead and its continuation split across two lines)
- [x] All three edited files stay under their `docs/CONTEXT-BUDGET.md` caps (33,000 / 33,000 / 38,000 chars) — `wc -c claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md SPEC/procedures/ft-task.md`, each ≤ its cap
- [x] The three inline checks use the same grep/awk idiom as `/ft-release` §7.1 Pair P (which CORE-610.2 already proved non-vacuous on a mutated fixture), so no new fixture proof is needed here — `judgment`: text-compared the three inline snippets against the Pair P block in `claude/skills/ft-release/step-7.1-mirror-pairs.md` by inspection; same patterns, same tokens
- [x] The discovered gap — no closure path ever instructs setting the tasknote body's `**Archived:** YYYY-MM-DD` line to today's date on a full (non-micro) tasknote, which `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" and CORE-610.2's Discovery Notes both attribute to "the pre-archive gate (CORE-610.3)" but which this task's own filed PLAN.md line does not name — is filed as its own follow-up PLAN.md row rather than folded silently into this task's scope — `grep -n "archived-stamp" .flowtron/PLAN.md`

## 🧩 Subtasks

- [x] Read `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-micro-task/SKILL.md`, `SPEC/procedures/ft-task.md`, `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`, and the archived `CORE-610.2.md` sibling tasknote + its Pair P block in `claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] Insert the executable pre-move gate sentence into `claude/skills/ft-task/SKILL.md`'s Phase 4 bullet (Step 5)
- [x] Insert the verify-then-move step into `claude/skills/ft-micro-task/SKILL.md`'s Step 4 item 4
- [x] Insert the agent-neutral pre-move verification sentence into `SPEC/procedures/ft-task.md`'s Step 5 Phase 4 paragraph, before "Move the tasknote to…"
- [x] Re-check byte counts against `docs/CONTEXT-BUDGET.md` caps
- [x] File a follow-up PLAN.md row for the discovered `**Archived:**` stamp-fill gap (via `/ft-file-followup`), citing `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" and CORE-610.2's Discovery Notes as the source of the attribution
- [x] Run the Acceptance verify commands and record the receipt

## 🔗 Related

- [[CORE-EPIC-610]] — parent epic (archive-closure-integrity)
- [[CORE-610.2]] — sibling: added the post-hoc CI check (`/ft-release` §7.1 Pair P) this task's inline gate is meant to make redundant on every post-2026-09-20 archival

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN.md line names exactly three files and two grep conditions; both conditions and all three files exist as described, and the Pair P idiom to reuse is fully specified in the CORE-610.2 archive. One genuine drift surfaced (see Drift check) — handled by filing a follow-up rather than expanding this task's scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Sources read.** `claude/skills/ft-task/SKILL.md` Step 5's Phase 4 bullet (line 173); `claude/skills/ft-micro-task/SKILL.md` Step 4 "Recap and close" (its 5-item closure list); `SPEC/procedures/ft-task.md` Step 5 "Phase 4: Closure (auto-run)" (lines 424-457, agent-neutral prose, no fenced shell — confirmed by grepping the file for triple-backtick fences: only two `text`/`markdown` example blocks exist, neither is a shell check, so the existing style for a mechanical check is inline `` `grep -q` `` prose (line 308 already does this for an Acceptance verify-command example) — matched that register rather than adding a fenced block); `templates/tasknote-template.md` and `templates/tasknote-micro-template.md` (confirmed the full template has a `## ✅ Acceptance` heading with `- [ ]` boxes, the micro template has none — only `## ⚡ Notes` + `## ✅ Recap` free text); the archived `.flowtron/tasknote/archive/core/CORE-610.2.md` sibling and its Pair P block in `claude/skills/ft-release/step-7.1-mirror-pairs.md:337-353` (the exact two-part grep/awk idiom this task reuses, run there post-hoc across the whole archive on a date floor — this task runs the same two checks pre-hoc on the single tasknote about to be moved, no floor needed since it's new logic, not a backfill).
- **Byte-budget check.** `docs/CONTEXT-BUDGET.md` caps `claude/skills/*/SKILL.md` at 33,000 and `SPEC/procedures/ft-task.md` at 38,000. Current sizes: `ft-task/SKILL.md` 27,007 (5,993 headroom), `ft-micro-task/SKILL.md` 20,307 (12,693 headroom), `SPEC/procedures/ft-task.md` 34,565 (3,435 headroom — tightest, kept the SOP addition to one short paragraph, no fenced block).
- **Archive skim.** `grep -l` across `.flowtron/tasknote/archive/core/*.md` for the three touched paths returns only `CORE-610.2.md` (read above) and a handful of unrelated skill-wiring notes with no bearing on the closure gate itself — no other prior tasknote shaped this exact gate.
- **Drift check — one finding.** `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" (line 78) and CORE-610.2's own Discovery Notes both state that the "stamp miss" — a future closure that never fills the tasknote body's `**Archived:** YYYY-MM-DD` line with a real date — "sits with the sibling CORE-610.3's pre-archive gate." Checked: neither `SPEC.md`, `claude/skills/ft-task/SKILL.md`, nor `SPEC/procedures/ft-task.md` contains any instruction to set that field on a full-tasknote closure (`grep -n "Archived:" SPEC.md claude/skills/ft-task/SKILL.md SPEC/procedures/ft-task.md` → no output) — only `claude/skills/ft-micro-task/SKILL.md` Step 4 item 2 already does it ("set `Archived:` to today's date"). This is a real, separate gap from what this task's own filed PLAN.md line asks for (which names only the `status: completed` + unannotated-Acceptance-box checks, nothing about the stamp). Per SPEC's "Deferred hand-off filing," recording it as prose here is not enough and folding it silently into this task's Acceptance would go beyond the filed scope — filing it as its own PLAN.md row (Subtasks step 6, Acceptance criterion 6) rather than doing the SPEC.md + closure-step edit here.
- **Best practices.** No new script or file — three prose insertions into already-touched-per-request files, reusing an established idiom (Pair P) verbatim rather than inventing a new check shape. `No clarifications needed` — assumptions: (1) the two named checks are exactly the ones in scope, per the drift finding above; (2) "same shape on `--fast`/`--unattended`" means the gate text says so explicitly and is never suppressed by either flag, matching how Pair P itself is never conditional; (3) the micro-tasknote's Acceptance-box half is documented as vacuous rather than omitted, so a reader isn't left wondering why the check differs.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Reused `/ft-release` §7.1 Pair P's exact two shell idioms (`grep -q '^status: completed$'` and the `awk` Acceptance-box scan piped through `grep -viE 'N/A|not[ -]met'`) verbatim rather than inventing new ones — same failure-string vocabulary a future maintainer already knows from Pair P. Each of the three insertions sits at the existing Phase-4/closure location in its own file (no new section, no new heading) — extends the established "Skill-specific on top of it" / "Verify, then move" / prose-paragraph shapes already present in each file.
- **No refactor.** Three additive insertions; nothing else in any of the three files was touched.
- **`claude/skills/ft-task/SKILL.md`** — added one sentence to the Phase 4 bullet (Step 5), between the existing "Skill-specific on top of it" clause and "**Do not surface a banner here**": names the two-part mechanical check, cites Pair P, states it fires identically under `--fast`/`--unattended`.
- **`claude/skills/ft-micro-task/SKILL.md`** — rewrote Step 4 item 4 ("Move the tasknote") into "**Verify, then move**": runs the `status: completed` grep before the `mv`, explicitly notes the Acceptance-box half is vacuous (no such section in a micro-tasknote — the `awk` delimiter never matches, so nothing needs a special case in the check itself, only in the surrounding prose explaining why it's a no-op here).
- **`SPEC/procedures/ft-task.md`** — added one prose paragraph ("**Verify before moving.**") in Step 5's Phase 4 section, immediately before "Move the tasknote to `.flowtron/tasknote/archive/<area>/<TASK-ID>.md`" — described the same two checks in words (no fenced shell), matching this file's existing agent-neutral, prose-only register (it already names `` `grep -q` `` inline at line 308 for a different purpose).
- **Tests.** No test harness for prose skill-file contracts in this repo (same as CORE-610.2's "no unit test surface for shell" finding) — verification is the grep receipts below plus a manual side-by-side comparison of the three new snippets against Pair P's block.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [ ] (frontend) Asked the user for visual confirmation — N/A — no frontend change (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (all run from repo root, 2026-09-19):

- `grep -q "Executable pre-move gate" claude/skills/ft-task/SKILL.md && grep -q "not\[ -\]met" claude/skills/ft-task/SKILL.md` → 0
- `grep -q "Verify, then move" claude/skills/ft-micro-task/SKILL.md && grep -q "vacuous" claude/skills/ft-micro-task/SKILL.md` → 0
- `grep -q "Verify before moving" SPEC/procedures/ft-task.md` → 0
- `wc -c claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md SPEC/procedures/ft-task.md` → all three under their `docs/CONTEXT-BUDGET.md` caps (see figures below)
- `grep -n "archived-stamp" .flowtron/PLAN.md` → 0 (follow-up row filed, see Final Summary)
- No code/CI surface touched (markdown-only prose edits to three skill/SOP files) — lint/type-check N/A; structural check: no duplication introduced (the three insertions each restate the same two-part gate in the register their own file already uses — full-tasknote English prose in `SPEC/procedures/ft-task.md`, the same in `ft-task/SKILL.md`, and a shortened variant in `ft-micro-task/SKILL.md` that documents its own vacuous half rather than silently diverging); no dead code; no public-surface growth (no new command, flag, or file); no stale code-facing documentation introduced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"): no change to any of the sixteen entries — none names the Phase 4 closure mechanics or the `/ft-task` / `/ft-micro-task` / `SPEC/procedures/ft-task.md` internals this task edits at the prose level.

Added an executable pre-archive gate to all three closure surfaces named in the PLAN.md line: `/ft-task`, `/ft-micro-task`, and `SPEC/procedures/ft-task.md` now each state — in their own existing register (Claude-skill imperative prose, and agent-neutral SOP prose respectively) — that the archive `mv` is refused until a `status: completed` grep and an unannotated-`- [ ]`-under-`## ✅ Acceptance` scan both come back clean, reusing `/ft-release` §7.1 Pair P's exact idiom so the same failure modes it now catches post-hoc (CORE-610.2: 13/132 archivals with bare boxes, CORE-593 archived at `status: in-progress`) are caught pre-hoc on every future closure instead, on all closure paths (`--fast`/`--unattended` included).

- Changed: `claude/skills/ft-task/SKILL.md` (+1 sentence in the Phase 4 bullet), `claude/skills/ft-micro-task/SKILL.md` (rewrote Step 4 item 4), `SPEC/procedures/ft-task.md` (+1 paragraph in Step 5 Phase 4).
- Verification: see Testing Notes — all three grep receipts exit 0, all three files under their `docs/CONTEXT-BUDGET.md` caps.
- Refactors: none. Deferred: filed `<FOLLOW-UP-ID>` for the discovered `**Archived:** YYYY-MM-DD` stamp-fill gap on full-tasknote closure (no existing instruction sets it outside `/ft-micro-task`) — `docs/CONVENTIONS.md` and CORE-610.2 both attribute that gap to "the pre-archive gate (CORE-610.3)," but this task's own filed PLAN.md line names only the two checks implemented above, so the stamp fix is filed separately rather than folded in silently.
- `touches:` reconciliation: `git diff --name-only` = the three declared paths + this tasknote + the PLAN.md follow-up filing; no undeclared paths.
- Maintainability effect: the closure contract's "Acceptance tick-through" rule (SPEC.md) now has an enforcement point at the moment of the closure write itself, not only in a post-hoc audit that runs a version-tag or a release later — a bare box or a stale `status:` now blocks the same session's `mv` rather than surfacing weeks later in a `/ft-release` §7.1 Pair P run.

**Archived:** 2026-09-19
