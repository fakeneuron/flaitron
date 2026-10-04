---
title: release-dogfood-concurrent-write-hardening
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-586]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-release/step-5-dogfood-sop.md
  - claude/skills/ft-release/SKILL.md
  - docs/DOGFOOD.md
  - docs/AGENT-COMPAT.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-588 | release-dogfood-concurrent-write-hardening

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-586]]

## 🎯 Goal

Harden `/ft-release`'s dogfood-gate walk against parallel-session write races and unverifiable third-party completion claims, both surfaced during the CORE-586 (v5.27.0) cut.

## ✅ Acceptance

- [x] `docs/DOGFOOD.md` never instructs a dogfood session to edit the stamp files — its result section is report-only and names the receipt shape (the three `Log:` lines + proposed stamp) — `grep -q 'do \*\*not\*\* edit' docs/DOGFOOD.md && ! grep -q '^## Recording the result' docs/DOGFOOD.md`
- [x] `step-5-dogfood-sop.md` step 2 carries an evidence standard: a Refreshed resolution for a row other than the driving session's own agent requires a DOGFOOD.md receipt, and a claim without one (or describing something other than DOGFOOD.md, or at a version ≠ vA.B.C) resolves as Skipped — `grep -q "receipt" claude/skills/ft-release/step-5-dogfood-sop.md`
- [x] `step-5-dogfood-sop.md` step 3 has no self-judged escape hatch: dirt on the stamp files at walk start is a STOP, and the check runs immediately before each write — `grep -q "At walk start" claude/skills/ft-release/step-5-dogfood-sop.md`
- [x] `step-5-dogfood-sop.md` gains a file-state re-verify (step 5) that greps every resolved row's expected stamp across all its locations after the walk, and `SKILL.md` §7.4's dogfood-gate enforcement re-runs it from file state before commit-go rather than summarising from memory — `grep -q "Re-verify from file state" claude/skills/ft-release/step-5-dogfood-sop.md && grep -q "step 5" claude/skills/ft-release/SKILL.md`
- [x] `docs/AGENT-COMPAT.md` §"Reading the cells" ownership prose mirrors the change (CORE-406 / CORE-501 parity precedent) — `grep -q "CORE-588" docs/AGENT-COMPAT.md`
- [x] `claude/skills/ft-release/SKILL.md` stays under its 40,000-char context budget — `test $(wc -c < claude/skills/ft-release/SKILL.md) -le 40000`
- [x] Doc-drift sweep clean — `judgment` (Phase 4 sweep across README §"AI-referenced docs")


## 🧩 Subtasks

- [x] `docs/DOGFOOD.md` — rename §"Recording the result" → §"Reporting the result"; make it report-only (never edit the stamp files, whoever applies is the operator or the release-driving `/ft-release` walk); define the receipt shape; extend the "write no files" rule to the whole procedure
- [x] `step-5-dogfood-sop.md` step 2 — add the receipt-based evidence standard for third-party rows (receipt required; no receipt / wrong procedure / wrong version → Skipped)
- [x] `step-5-dogfood-sop.md` step 3 — walk-start clean check is a STOP with no "own earlier edit" hatch; per-write pre-check; on a resume, reconcile from the Implementation Notes ledger of resolutions already applied
- [x] `step-5-dogfood-sop.md` — add step 5 "Re-verify from file state" (grep loop over resolved rows × locations); update the ownership paragraph to name CORE-588 as the third occurrence and why the CORE-501 backstop was one-sided
- [x] `SKILL.md` §7.4 dogfood-gate enforcement — re-run step 5 from file state before commit-go
- [x] `docs/AGENT-COMPAT.md` §"Reading the cells" — mirror paragraph (evidence standard + DOGFOOD.md report-only + file-state re-verify), tagged CORE-588
- [x] Verify: acceptance greps, budget check, markdown read-through of the diff


## 🔗 Related

- [[CORE-586]] — predecessor: the v5.27.0 cut where both failure modes surfaced

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Third occurrence of the same race (CORE-406 prose rule at v5.15.0 → CORE-501 mechanical backstop at v5.22.0 → still raced at v5.27.0). The PLAN line names two distinct failures and both trace to concrete gaps in the current text, so the task is well-scoped as a prose hardening of the same three surfaces the two predecessors touched, plus `docs/DOGFOOD.md`, which both predecessors explicitly left untouched and which turns out to hold the root cause.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — N/A: prose-only contract edit, same shape as CORE-406 / CORE-501; no module boundary touched

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Source read:** `claude/skills/ft-release/step-5-dogfood-sop.md` (the walk: steps 1–4 + ownership paragraph), `claude/skills/ft-release/SKILL.md` §5 (fragment load, L174) and §7.4 (dogfood-gate enforcement, L320–330 — a summary block, not a file-state check), `docs/DOGFOOD.md` (three steps + §"Recording the result"), `docs/AGENT-COMPAT.md` §"Reading the cells" L71–120 (stamp format, update obligation, ownership paragraph, CORE-501 backstop paragraph). Stamp locations today: `docs/AGENT-COMPAT.md:36–39`, `claude/CAPABILITIES.md:71`, `docs/PLATFORMS.md:402/441/470`. `codex/skills/ft-release/SKILL.md` is a thin pointer wrapper — no mirrored edit needed (same finding as CORE-406 / CORE-501).

**Archive skim** (`archive/core/`, 36 hits on `step-5-dogfood-sop|DOGFOOD.md`; read CORE-586, CORE-406, CORE-501, CORE-405 excerpt):
- CORE-406 (v5.15.0 cut): added the prose ownership rule — only the release-driving session writes stamps; others report conversationally. Explicitly left `docs/DOGFOOD.md` untouched, reasoning its "report to the operator" sentence already covered the standalone case.
- CORE-501 (v5.22.0 cut): the rule failed one release later ("a parallel session wrote all eight stamp locations anyway, two with rationale that didn't survive checking"). Added step 3's `git status --porcelain` dirty check before writes. Again left `docs/DOGFOOD.md` untouched ("its own standalone procedure already self-verifies via `git status --porcelain`").
- CORE-586 (v5.27.0 cut): raced a third time. The release-driving session's own Claude "Refreshed" write was overwritten to `skipped @ v5.27.0` by a parallel writer mid-walk; the three parallel sessions' self-reports contradicted each other and file state; Codex's report described driving `/ft-release` itself rather than running DOGFOOD.md → resolved Skipped by operator agreement.

**Root-cause analysis (why CORE-501's backstop did not hold):**
1. *The backstop is one-sided.* Step 3's dirty check lives only in the Claude `ft-release` fragment. The parallel writers at CORE-586 were Grok / Cursor / Codex sessions running `docs/DOGFOOD.md`, which never loads that fragment. Its §"Recording the result" step 1 reads "update the agent's `last-verified` stamp" (an instruction to write) while its last sentence says "report the updated stamp to the operator so they can apply the edits" — internally contradictory, and a session that takes the first reading writes with no check at all. The dirty-check claim "a second writer will see the first writer's dirt" only holds if the second writer runs it. Both predecessors left DOGFOOD.md alone on the belief its report sentence sufficed; three occurrences say otherwise.
2. *The walk trusts its writes stick.* Nothing re-reads file state after the walk: §7.4's enforcement is a summary block produced from memory of the resolutions, so a clobbered write passes to the tag unless someone notices by hand (which is how CORE-586 caught it).
3. *Step 3's escape hatch is self-judged.* "the dirt isn't this session's own earlier edit" is the exact judgment CORE-501 said sessions get wrong; it also makes the check run once per walk rather than before each write, leaving a check-then-write window.
4. *No evidence standard.* Step 2 asks the operator "was a real session run?" with no required shape. DOGFOOD.md already defines three `Log:` lines per step but its result section never says to report them, so a claim can be a paraphrase of something else entirely (the Codex case).

**Design (prose-only, mirrors the CORE-406 / CORE-501 shape):**
- `docs/DOGFOOD.md`: the dogfood session **never** edits the stamp files — its output is a *receipt* (the three `Log:` lines verbatim + the stamp the row should carry); the writer is the operator by hand or the release-driving `/ft-release` walk. Removes the second writer entirely, which is the fix the other two tasks kept deferring.
- `step-5-dogfood-sop.md` step 2: receipt-based evidence standard for any row other than the driving session's own agent. Step 3: clean-at-walk-start is a STOP with no hatch; the check re-runs immediately before each write; a resume reconciles against the Implementation Notes ledger of resolutions already applied (recorded fact, not memory). New step 5: file-state re-verify — grep each resolved row's expected stamp across all its locations; mismatch = concurrent clobber → STOP.
- `SKILL.md` §7.4: the enforcement block is produced by re-running step 5, not from memory. Budget headroom: 31,371 / 40,000.
- `docs/AGENT-COMPAT.md`: mirror paragraph tagged CORE-588 (parity precedent).

**Not in scope:** file locks, a stamp-writing script, or changing the stamp format. Flowtron's `docs/VISION.md` §"What we won't accept" rules out lock machinery; a grep loop is the ceiling.

**Drift check:** PLAN line cites no paths or line numbers; the two failure modes it names ("parallel-session write races", "unverifiable third-party completion claims") both match CORE-586's Implementation Notes and current file text. The plan neither contradicts a SPEC contract (the release gate contract lives in `docs/AGENT-COMPAT.md` + the skill, not SPEC.md) nor diverges from the PLAN line. No drift.

**No clarifications needed.** Assumptions: (a) a Refreshed claim that cannot produce a receipt resolves as Skipped — never blocks the cut, and the row can be refreshed at the next DOGFOOD.md run; (b) standalone (non-release) dogfood runs keep the existing "operator applies the edits by hand" path; (c) no ✋ halt-your-sessions gate is added — with DOGFOOD.md report-only there is no second writer to halt, and the re-verify catches anything that slips.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only; the one new shell block (step 5) was exercised by hand under zsh (see Testing Notes)

**Implementation Notes:**

Pattern: additive prose in the same places CORE-406 / CORE-501 wrote (fragment steps + ownership paragraph; AGENT-COMPAT.md mirror paragraph directly under theirs), plus the `docs/DOGFOOD.md` result section both predecessors deferred. No refactor; no unrelated cleanup.

- `docs/DOGFOOD.md` — §"Recording the result" → §"Reporting the result": the session hands back a **receipt** (three `Log:` lines verbatim + proposed stamp) and never edits the three stamp files; the "all locations together" list is kept but addressed to *whoever applies* (operator by hand, or the release-driving walk). The procedure intro's "write no files" rule now explicitly covers the result section. No other file referenced the old heading (repo-wide grep, archive excluded).
- `step-5-dogfood-sop.md` — step 2 gains the evidence standard (own row on own verification; every other row only against a receipt whose version is `vA.B.C`, whose "My row" matches current file state, and whose Phase-1 drive names a task + exit-gate decision; anything else → Skipped with a note). Step 3 is now clean-at-walk-start = STOP with no exception, then a per-write check against a written **ledger** in Implementation Notes (replaces the self-judged "own earlier edit" hatch). New step 5 "Re-verify from file state": a `grep -qF` loop over the ledger's stamp × files, run at walk end and again at §7.4. Ownership paragraph names why CORE-501's backstop was one-sided. Example stamps use `vA.B.C` / `vP.Q.R` / `YYYY-MM-DD` placeholders, and the cut is cited as "the CORE-586 cut" rather than by version, so the next release's version-pin residue grep gains no new hits.
- `SKILL.md` §7.4 — the dogfood-gate enforcement bullet now says to produce the summary by re-running step 5 from file state, never from memory. 31,371 → 31,627 chars (budget 40,000).
- `docs/AGENT-COMPAT.md` — mirror paragraph "Report-only dogfood sessions + file-state re-verify (CORE-588)" under the CORE-501 one.
- `codex/skills/ft-release/SKILL.md` is a pointer wrapper — nothing to mirror (same as both predecessors).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (prose); the CI `drift` job's context-budget script and gitleaks were run locally instead

- [x] Ran lint/type-check on changed code — N/A (markdown; no linter in this repo); read the full diff once for GFM shape and `.editorconfig` conformance

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Acceptance verify commands (all exit 0):

```
grep -q 'do \*\*not\*\* edit' docs/DOGFOOD.md && ! grep -q '^## Recording the result' docs/DOGFOOD.md → 0
grep -q receipt claude/skills/ft-release/step-5-dogfood-sop.md → 0
grep -q 'At walk start' claude/skills/ft-release/step-5-dogfood-sop.md → 0
grep -q 'Re-verify from file state' claude/skills/ft-release/step-5-dogfood-sop.md && grep -q 'step 5' claude/skills/ft-release/SKILL.md → 0
grep -q CORE-588 docs/AGENT-COMPAT.md → 0
test $(wc -c < claude/skills/ft-release/SKILL.md) -le 40000 → 0   (31,627)
```

Step 5 re-verify block exercised by hand under zsh against the live stamps plus a deliberate `v9.9.9` probe row: the two real rows printed nothing, the probe printed exactly one `MISSING` line — the block splits the path list correctly under zsh and reports only misses. CI drift-job context-budget script run locally → PASS (0 over budget). `gitleaks dir . --config .gitleaks.toml` → no leaks found. Version-pin residue: `grep v5.27.0` over the four touched files hits only the matrix/footer stamps (no new prose residue). Structural quality: no duplication introduced — the receipt shape is defined once in DOGFOOD.md and referenced by the fragment and AGENT-COMPAT.md; no dead prose left (old "Recording" heading had no other referrers); public-surface growth is one fragment step and one section rename.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:** `README.md` no change (its DOGFOOD.md blurb "runs to confirm compatibility and refresh its row" describes the effect, and DOGFOOD.md's own intro says the same) · `AGENTS.md` no change · `SPEC.md` no change (release gate lives outside it) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change (footers carry stamps, no write-ownership prose) · `claude/CAPABILITIES.md` no change (points at AGENT-COMPAT.md §"Reading the cells", which was updated) · `docs/AGENT-COMPAT.md` **updated** (mirror paragraph) · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

**Final Summary:**

Hardened the `/ft-release` dogfood-gate walk against the two failures the v5.27.0 cut hit. Prose-only, four files, +77/−25:

- `docs/DOGFOOD.md` — the root cause. Its result section told a dogfood session to "update the stamp" and, in the same breath, to report it for the operator to apply; sessions took the first reading and wrote with no concurrency check, because the check (CORE-501) only exists inside the Claude `ft-release` fragment they never load. Both predecessors had left this file alone. It is now report-only: the session hands back a receipt (three `Log:` lines verbatim + proposed stamp), never an edit.
- `claude/skills/ft-release/step-5-dogfood-sop.md` — step 2 evidence standard (a third-party row is refreshed only against a receipt at `vA.B.C` whose "My row" matches file state; a paraphrase, wrong version, or "I ran something else" → Skipped — the Codex case); step 3 clean-at-walk-start with no self-judged exception, then per-write checks against a written ledger; new step 5 greps every ledger stamp back from the files (tested under zsh with a probe row), run at walk end and again before commit-go.
- `claude/skills/ft-release/SKILL.md` §7.4 — the enforcement summary is produced by re-running step 5, not from memory (31,627 / 40,000 chars).
- `docs/AGENT-COMPAT.md` — mirror paragraph tagged CORE-588, keeping the CORE-406 / CORE-501 parity.

Verification: six acceptance greps + budget test all exit 0; CI context-budget script and gitleaks run locally, clean; no new version-pin residue (the cut is cited as "the CORE-586 cut"). `touches:` reconciliation: `git diff --name-only` = exactly the four declared paths. Maintainability effect: the second writer is gone by contract, an unearned "Refreshed" has a defined thing it must produce, and a clobbered stamp is caught by a grep before the tag instead of by a human noticing — three cuts of hand reconciliation had that as the only backstop.

**Archived:** 2026-09-12
