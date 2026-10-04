---
title: dogfood-receipt-shape
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-613]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/DOGFOOD.md
  - claude/skills/ft-release/step-5-dogfood-sop.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-614 | dogfood-receipt-shape

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-613]]

## 🎯 Goal

Give `docs/DOGFOOD.md` §"Reporting the result" a literal fenced receipt template (three `Log:` lines + proposed stamp) that the session emits verbatim as its final message, and scope Step 3's `git status: clean` clause to files the session wrote, so a same-checkout mid-cut receipt is no longer read as dirty.

## ✅ Acceptance

- [x] `docs/DOGFOOD.md` §"Reporting the result" carries a literal fenced receipt template that the session emits verbatim as its final message — `awk '/^## Reporting the result/{a=1} a' docs/DOGFOOD.md | grep -q '^```text' && awk '/^## Reporting the result/{a=1} a' docs/DOGFOOD.md | grep -q 'final message'`
- [x] The template holds all three `Log:` openers and the proposed-stamp line — `awk '/^## Reporting the result/{a=1} a' docs/DOGFOOD.md | grep -c 'Contract comprehension complete\|Cue-render check complete\|Phase-1 drive complete\|(dogfooded)'` → ≥ 4
- [x] Step 3's clean-status clause is scoped to files the session wrote, and the bare `git status: clean` form is gone from the Log line — `grep -q 'session-written' docs/DOGFOOD.md && ! grep -q 'git status: clean\.' docs/DOGFOOD.md`
- [x] `ft-release` §5 step 2's evidence standard accepts a receipt whose status clause reports pre-existing cut dirt the session did not write — `grep -q 'CORE-614' claude/skills/ft-release/step-5-dogfood-sop.md`
- [x] Markdown stays GFM-clean (fence balanced) — `awk '/^```/{n++} END{exit n%2}' docs/DOGFOOD.md`

## 🧩 Subtasks

- [x] `docs/DOGFOOD.md` Step 3 — rescope the verify block + Log line: expected `git status --porcelain` output is *no path this session wrote*; pre-existing dirt (the same-checkout cut's version-pin edits) is not the session's and does not fail the step
- [x] `docs/DOGFOOD.md` §"Reporting the result" — replace the prose enumeration of the receipt with a fenced `text` template (three `Log:` lines + `Proposed stamp:`), stated as the session's literal final message; keep the "pasted verbatim, not summarised" rule and the who-applies paragraph
- [x] `claude/skills/ft-release/step-5-dogfood-sop.md` step 2 — one sentence: a receipt in the template shape whose status clause notes pre-existing cut dirt still passes; a receipt that self-invalidates on that dirt is still a receipt
- [x] Run the Acceptance verify commands; record the receipt

## 🔗 Related

- [[CORE-613]] — predecessor: the v5.29.0 cut whose dogfood-gate walk saw Grok/Cursor paraphrase the receipt and Codex self-invalidate on a dirty `git status`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-613's dogfood-gate walk recorded the failure mode directly: Grok and Cursor supplied a paraphrase on the first ask (a second ask was needed to get the `Log:` lines), and Codex self-reported "not stamp-refreshable" because `git status` showed the cut's own version-pin edits — dirt the only same-checkout receipt that can read `v5.29.0` must see. The procedure's result section describes the receipt in prose; a fenced literal the agent copies removes the paraphrase path, and the status clause needs to say whose writes it measures.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Source read.** `docs/DOGFOOD.md` in full (8,052 B; not in `docs/CONTEXT-BUDGET.md` / CI budgets). Step 3 verifies with `git status --porcelain` → "Expected output: empty" and logs `git status: clean.`; §"Reporting the result" enumerates the receipt in two prose bullets (three `Log:` lines verbatim + `vX.Y.Z · YYYY-MM-DD (dogfooded)`) with no literal block to copy. Consumer: `claude/skills/ft-release/step-5-dogfood-sop.md` step 2 checks a receipt on exactly three things — version reads `vA.B.C`, "My row" matches current `docs/AGENT-COMPAT.md`, Phase-1 drive names a task + exit-gate decision — and never on the status clause, so the Codex self-invalidation was a session-side misread of a clause the walk does not score. `docs/AGENT-COMPAT.md` §"Reading the cells" (CORE-588 paragraph) mirrors only "three `Log:` lines verbatim plus the proposed stamp" — still true after this change, no edit.
- **Best Practices Review.** N/A — docs-only; no module boundary. The one shape question (should the SOP change too) is answered by the DRY of the contract: DOGFOOD.md defines the receipt, the SOP scores it; rescoping the clause in the definition without telling the scorer that pre-existing dirt is acceptable leaves the same misread available on the walk side.
- **Archive skim.** `ls archive/core/` → 820 notes; `grep -l docs/DOGFOOD.md` → 41 hits. Load-bearing: [[CORE-613]] Implementation Notes (Grok/Cursor receipt on second ask, first paste a paraphrase; Codex self-reported not-refreshable on cut-dirt; explicit "follow-up candidate" observation on Step 3's clean clause vs same-checkout receipts) and [[CORE-588]] (made §"Reporting the result" report-only and defined the receipt as three `Log:` lines + stamp; SOP step 2 evidence standard). [[CORE-406]] / [[CORE-501]] are the earlier race-class notes — context only. Nothing in the archive pins the receipt to prose form; a fenced template is an additive tightening of CORE-588's shape.
- **Drift check.** Heading `## Reporting the result` present; Step 3's `git status --porcelain` block and `git status: clean.` Log line present as described; SOP step 2 evidence paragraph present at line 14. PLAN.md line matches this plan; no SPEC contract governs DOGFOOD.md's wording (it is an operator procedure doc, `docs/`-tier).
- **No clarifications needed (--fast).** Assumptions asserted: (a) the receipt template is a fenced `text` block with bracketed slots, and the final-message rule is stated in one sentence above it; (b) the Step 3 Log line keeps its three scored fields byte-stable and only its status clause changes wording, to `git status (session-written files): clean.`; (c) `step-5-dogfood-sop.md` gets one sentence, tagged CORE-614, not a new step; (d) `docs/AGENT-COMPAT.md` needs no mirror edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, docs-only; the Acceptance verify commands are the checks

**Implementation Notes:**

- **Pattern survey.** The fenced-literal-you-copy shape already exists in the same consumer: `step-5-dogfood-sop.md` step 5 gives the walk a `sh` heredoc to fill rather than describing the loop. The receipt template extends that shape into DOGFOOD.md (a `text` fence with bracketed slots). No refactor; nothing else touched.
- **`docs/DOGFOOD.md` Step 3** — the verify block's "Expected output: empty" became "no path this session wrote", with the same-checkout mid-cut case named explicitly (the cut's three version-pin edits — `SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md` per `/ft-release` §5 — are the only way the receipt can read the new version, and are not the session's). Log line's status clause: `git status: clean.` → `git status (session-written files): clean.`; the three scored fields (version / My row / task + decision) are byte-stable.
- **`docs/DOGFOOD.md` §"Reporting the result"** — the two prose bullets became one fenced `text` block of four lines (three `Log:` openers + `Proposed stamp:`), introduced as "your final message … nothing more, nothing rephrased", followed by the retained evidence / who-applies prose and a closing sentence telling the session not to withhold the receipt over pre-existing dirt because the walk never scores that clause. The who-applies paragraph and its stamp-location list are unchanged.
- **`claude/skills/ft-release/step-5-dogfood-sop.md` step 2** — one appended sentence (tagged CORE-614): the status clause is not scored; a receipt that also mentions pre-existing cut dirt, or self-invalidates on it, is resolved on the three checks, not on its own verdict (the CORE-613 Codex row). The evidence standard's three checks are untouched.
- `docs/AGENT-COMPAT.md` §"Reading the cells" CORE-588 paragraph still describes the receipt accurately ("three `Log:` lines verbatim plus the proposed stamp") — no edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code; Acceptance verify commands below stand in

- [x] Ran lint/type-check on changed code — fence-balance check; markdownlint (not a repo gate, no config) run for information only

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `awk '/^## Reporting the result/{a=1} a' docs/DOGFOOD.md | grep -q '^```text' && … grep -q 'final message'` → 0
- `awk '/^## Reporting the result/{a=1} a' docs/DOGFOOD.md | grep -c 'Contract comprehension complete\|Cue-render check complete\|Phase-1 drive complete\|(dogfooded)'` → 4 (≥ 4 ✓)
- `grep -q 'session-written' docs/DOGFOOD.md && ! grep -q 'git status: clean\.' docs/DOGFOOD.md` → 0
- `grep -q 'CORE-614' claude/skills/ft-release/step-5-dogfood-sop.md` → 0
- `awk '/^```/{n++} END{exit n%2}' docs/DOGFOOD.md` → 0
- Step 3 Log line and the template's third line are byte-identical (`grep -n 'git status (session-written files): clean' docs/DOGFOOD.md` → lines 143 and 155).
- `npx markdownlint-cli2 docs/DOGFOOD.md` (informational; no repo config, not in CI): HEAD already carried 11 default-rule hits; the working tree adds exactly one — MD013 on the template's third line (124 chars), intentional: a receipt line an agent pastes verbatim must not wrap.
- Structural quality: no duplication introduced (the Log-line text exists in Step 3 and in the template by design — the template *is* the paste target); no dead prose left behind (the two prose bullets were replaced, not orphaned); public surface unchanged (same heading, same three stamp files, same three SOP checks).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- **Doc-drift sweep** (17 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs"): `docs/AGENT-COMPAT.md` — no change (its CORE-588 mirror still says "three `Log:` lines verbatim plus the proposed stamp", which the fenced template now literalises); `README.md` — no change (names DOGFOOD.md as "pasteable verification procedure", still true); `docs/PLATFORMS.md` — no change (Cursor footer cites a historical "clean Step-3 write boundary" run, write-once); every other entry (`AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`) — no change, none references the receipt or Step 3's status clause.
- **Changed files:** `docs/DOGFOOD.md` (+34/−15: Step 3 expected-output paragraph + Log-line clause; §"Reporting the result" prose bullets → fenced 4-line receipt template + closing don't-withhold sentence), `claude/skills/ft-release/step-5-dogfood-sop.md` (+1 sentence in step 2, CORE-614-tagged).
- **Verification:** five Acceptance commands all pass (Testing Notes); fence balance clean; Step 3 Log line ≡ template line 3.
- **Refactors:** none; cleanup deferred: none identified.
- **Documentation verdict:** the change *is* documentation; no code-facing doc drifted.
- **`touches:` reconciliation:** `git diff --name-only` → `claude/skills/ft-release/step-5-dogfood-sop.md`, `docs/DOGFOOD.md` — matches the declared set exactly; no undeclared paths.
- **Maintainability effect:** the next dogfood-gate walk receives receipts in one byte-stable shape from every agent (no second ask for `Log:` lines), and a same-checkout mid-cut receipt no longer contradicts its own procedure — the clause the session measures and the checks the walk scores are now the same three fields.

**Archived:** 2026-09-19
