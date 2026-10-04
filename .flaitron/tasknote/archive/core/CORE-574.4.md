---
title: ft-task-headroom-trim
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-574, CORE-556.2, CORE-558.5, CORE-574.N]
touches:
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-0-flags.md
---

# CORE-574.4 | ft-task-headroom-trim

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-574]] [[CORE-556.2]] [[CORE-574.N]]

## 🎯 Goal

Bring `claude/skills/ft-task/SKILL.md` to at least 3,400 chars of headroom under its 33,000-char budget (≤ 29,600 bytes) by trimming or extracting narrow-use content into a lazy fragment, without editing the Budgets table.

## ✅ Acceptance

- [x] `claude/skills/ft-task/SKILL.md` measures ≤ 29,600 bytes (≥ 3,400 headroom under the 33,000 cap) — `test $(wc -c < claude/skills/ft-task/SKILL.md) -le 29600`
- [x] The flag walk, per-flag markers, four mode definitions, and composition rule live in `claude/skills/ft-task/step-0-flags.md`, moved verbatim — two-way line diff of the pre-extract slice vs the fragment body shows only planned repairs
- [x] Step 0 in `SKILL.md` keeps the path resolution and dispatches the fragment only when `rest` is non-empty (default flow reads nothing extra) — `grep -q 'step-0-flags.md' claude/skills/ft-task/SKILL.md`
- [x] No stranded relative pointers (`above` / `below` / `this skill`) in the fragment or in the body's Step 0 stub — `grep -n 'above\|below' claude/skills/ft-task/step-0-flags.md` reviewed line by line
- [x] `docs/CONTEXT-BUDGET.md` §"Budgets" table is not edited — `git diff --name-only` excludes it
- [x] CI context-budget step passes locally on the edited body — the `.github/workflows/ci.yml` "Context budget" loop re-run from the shell, exit 0
- [x] Repo validation gates — `N/A` as written (`AGENTS.md` §"Validation" scopes them to viz + the fleet updater); substituted by the checks above plus `.editorconfig` hygiene (no trailing whitespace, final newline)

## 🧩 Subtasks

- [x] Scripted slice of `SKILL.md` lines 32–55 (the `--fast` bullet through "The flags are orthogonal…") → `step-0-flags.md` under the fragment header (H1 + 1-line back-ref blockquote, matching `step-5-loop-mode.md`)
- [x] Replace the "**Parse `args`.**" paragraph + moved block in `SKILL.md` with a dispatch: initialize the four modes to `false`; empty `rest` → Step 1; otherwise Read the fragment, then Step 1
- [x] Add `step-0-flags.md` to the SKILL_DIR fragment roster line in Step 0
- [x] Sweep stranded pointers in both files; confirm sibling blockquotes (`SPEC/loop.md`, `SPEC/blocked.md`, `unattended-mode.md`, `step-5-loop-mode.md`) still read true
- [x] Verify: `wc -c`, two-way diff, local run of the CI budget loop, `.editorconfig` hygiene

## 🔗 Related

- [[CORE-EPIC-574]] — parent epic (drift-ci-and-budget-headroom); no `.1` Discovery note — Discovery supplied by audit-repo 2026-09-11, so no Fan-out to echo
- [[CORE-556.2]] — depends-on: the extraction pattern this child extends (verbatim slice + Read-dispatch stub, losslessness by two-way line diff)
- [[CORE-558.5]] — related-decision: set the 33,000 cap and measured this body's working unit at +1,187 to +3,390
- [[CORE-558.4]] — related-decision: the one class of loss a shrink of this body has produced (a disambiguator at a decision point); extraction is verbatim precisely to avoid a repeat
- [[CORE-535.4]] — related-decision: cite-don't-restate already ran on this body; the remaining prose is routing, not restatement, so a second trim pass would delete imperatives
- [[CORE-574.5]] — sibling: same motion on `SPEC.md`; independent
- [[CORE-574.N]] — sibling audit placeholder; not started

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Condition is live and byte-exact — `SKILL.md` is 31,839 against a 33,000 cap (1,161 of headroom, a third of one working unit on this body). Growth since [[CORE-558.4]]'s 29,355 is all purposeful (`--loop` fold-in from CORE-571, README-table area resolution from CORE-564, verify-receipt from CORE-557, `touches:` from CORE-559), so nothing recent is a trim candidate. The Step 0 flag block is a genuinely branch-conditional ~4k that the default flow never needs — the one section that satisfies `docs/CONTEXT-BUDGET.md`'s "only on the branch that needs them" test rather than gaming the number by deferring happy-path load.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Read:** `claude/skills/ft-task/SKILL.md` (full body — it is the skill driving this run; section map below), the six sibling fragments' headers (dispatch + blockquote idiom), `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Ledger" / lazy-fragments paragraph, `.github/workflows/ci.yml` "Context budget" step (CORE-574.2), `SPEC/epic.md` (child YAML echo — no `.1`, nothing to copy), `codex/skills/ft-task/SKILL.md` (pointer wrapper; loads fragments "only when the source dispatch says they apply" — unaffected), `SPEC/procedures/ft-task.md` header (`source:` is the directory, not a byte mirror; primitives table names the modes conceptually — unaffected).

**Section map (`wc -c` by `## ` heading):** Step 0 5,340 · Step 1 3,748 · Step 1.5 1,650 · Step 2 2,603 · Step 3a 238 · Step 3b 1,861 · Step 3c 683 · Step 4 5,076 · Step 5 5,340 · Step 6 2,544 · Notes 785 · frontmatter ~1.4k. Total **31,839** / 33,000; target ≤ **29,600**; need ≥ 2,239 out.

**Seam chosen — Step 0 lines 32–55, 3,985 bytes:** the five flag bullets, the marker-emission paragraph + four marker strings, the four `<mode>` definition paragraphs (each already the dispatch for its own fragment), and the composition rule. Plus the 330-byte "**Parse `args`.**" paragraph, rewritten as the dispatch stub (~600). Projected body ≈ **28,100**, headroom ≈ **4,900** — above the 3,400 floor with margin for one more working unit, and CORE-556.2 warns projections undershoot because the stub is net-new.

**Why this seam and not Step 5 / Step 4 / a prose trim:**
- Step 4 / 5 / 6 run on every task; extracting them defers happy-path load without shedding it — exactly what `docs/CONTEXT-BUDGET.md` calls gaming the number. The flag block loads only when `rest` is non-empty; the default flow drops ~3.7k of eager load for real.
- A prose trim is the fidelity risk [[CORE-EPIC-558]] spent three children repairing after [[CORE-535.4]]: every loss found was a disambiguator at a decision point. Verbatim extraction has no such failure mode; the two-way diff proves it.
- Cost shift, stated plainly: a flagged run (`--fast` alone included) now pays one extra Read (~4.3k fragment) it did not before. Session total for flagged runs rises slightly; eager load for every run falls. The budget gate measures eager load — the same argument [[CORE-556.2]] recorded.

**What stays in the body, deliberately:** the intro line naming the accepted flags; Step 1's `[unattended]` row-marker rule (a flagless path that sets `fast-mode` and carries its own marker + contract pointer); every per-step `fast-mode` / `unattended-mode` / `debug-mode` / `loop-mode` branch in Steps 1.5–6 (they describe their own behavior and cite their contracts; none needs the Step 0 definitions to route).

**Best Practices Review.** Touched responsibility is one file's *load shape*; semantics move verbatim. Dependency direction stays one-way (`SKILL.md` → sibling fragment). Established shape: `step-5-loop-mode.md` header idiom (`# <Title> (executable steps)` + "Lazy-loaded SKILL fragment. Loaded by `task` SKILL.md Step 0 when …"). Required in-scope rewrite: only the dispatch stub and the roster line. Deferred: no `SPEC.md` touch (that is [[CORE-574.5]]), no ledger refresh (next `/ft-release` §7.1 / CI), no cap edit, no touch to `ft-micro-task`'s own parse (it parses two flags itself; no shared code).

**Archive skim.** `grep -l 'claude/skills/ft-task/SKILL.md' archive/core/*.md` → 99 hits; read the load-bearing ones rather than a probe since the epic and the budget doc already name them: [[CORE-556.2]] (pattern + the "dispatch is net-new" undershoot warning + one-file `Read … now` idiom), [[CORE-558.4]] (the only recorded loss class from shrinking this body; the "Route on a verified tier" paragraph at Step 1.5 is untouched here), [[CORE-535.4]] (cite-don't-restate already applied — 33,940 → 27,570; remaining prose is routing), [[CORE-558.5]] (cap + working-unit measurement), [[CORE-574.2]] / [[CORE-574.3]] (siblings — CI budget check + pairs; neither touches this body). No `supersedes:` / ⚠️ pointers on the hits that bear on Step 0.

**Drift check.** PLAN line matches HEAD: body 31,839 / 33,000 (the epic line's "1,161 under" is exact). No SPEC contract is contradicted — this is a skill-body load-shape change; every contract pointer moves with its paragraph. Cross-file blockquotes that say a module is "loaded by `/ft-task` at Step 0" (`SPEC/loop.md`, `SPEC/blocked.md`, `unattended-mode.md`, `step-5-loop-mode.md`) stay true: the fragment is read *from* Step 0 and performs Step 0's dispatch. `docs/PLATFORMS.md:267` lists fragments with "including", non-exhaustively — no change. CI "Context budget" step reads the table row, not a ledger figure — passes on any body ≤ 33,000. No live `ft-task/SKILL.md:<line>` citations outside the write-once archive.

**No clarifications needed.** Assumptions: (1) extraction over trim, for the fidelity reason above; (2) the flag block is the extract, one fragment named `step-0-flags.md` by the sibling convention; (3) `docs/CONTEXT-BUDGET.md` untouched — ledger is release-owned, cap unchanged per the PLAN line; (4) fragment paths stay literal `<SKILL_DIR>/…` (resolved in the body before the Read); (5) no Fan-out YAML — no `.1` note exists.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown only; losslessness proved by two-way line diff instead

**Implementation Notes:**

**Pattern survey.** Extended [[CORE-556.2]] / [[CORE-507]]: scripted byte-slice → sibling fragment with the `step-5-loop-mode.md` header idiom (`# <Title> (executable steps)` + "Lazy-loaded SKILL fragment. Loaded by `task` SKILL.md Step 0 when …"); one-file **Read … now** dispatch in the body. No new shape.

**Minimal refactor gate.** The body's "**Parse `args`.**" paragraph was the only rewrite: it now initializes the four modes, routes an empty `rest` straight to Step 1, and dispatches the fragment otherwise (330 → 634 bytes). The fragment gains a two-sentence preamble stating the modes were already initialized and re-stating the unordered-set rule that the old paragraph carried. The moved block is untouched. `SKILL_DIR` roster line gains `step-0-flags.md`. Nothing else in the body moved.

**Sizes (`wc -c`).** `SKILL.md` 31,839 → **28,199** (−3,640). Fragment 4,700. Headroom **4,801** against 33,000 — above the 3,400 floor with ~1.4 units of this body's own working range (+1,187 to +3,390) to spare. The projection (~28,100) held within 100 bytes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` (markdown; substituted checks below)

- [x] Ran lint/type-check on changed code — `N/A` (markdown; `.editorconfig` hygiene checked)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

| Verify command | Result |
|---|---|
| `test $(wc -c < claude/skills/ft-task/SKILL.md) -le 29600` | → 0 (28,199) |
| `diff <(pre-extract slice, lines 32–55) <(sed -n '7,$p' step-0-flags.md)` | → 0, IDENTICAL (zero repairs needed inside the block) |
| `grep -q 'step-0-flags.md' claude/skills/ft-task/SKILL.md` | → 0 (2 hits: roster line + dispatch) |
| `grep -n 'above\|below\|this skill\|this file' step-0-flags.md` | → 1 (no hits; reviewed) |
| `git diff --name-only` excludes `docs/CONTEXT-BUDGET.md` | → yes |
| `.github/workflows/ci.yml` "Context budget" loop, re-run locally | → 0 (`budget OK`) |
| Trailing-whitespace grep on all three edited files; final byte `0a` on both skill files | → clean |
| Flag literals still in the body for `docs/EXTERNAL-AGENTS.md`'s capability probe | `--unattended` ×7, `--fast` ×10, `--debug` ×2, `--loop` ×3 |

**Structural quality.** No duplication (two-way diff). No dead content — the four mode paragraphs were already the dispatch for their fragments and remain so. Public surface grows by one dispatched sibling in the same directory; `.claude/skills/ft-task` is a directory symlink, so repo-local wiring picks it up with no re-wire (same as [[CORE-556.2]]). Code-facing documentation: `docs/PLATFORMS.md` `--fast` row updated in Phase 4; sibling blockquotes (`SPEC/loop.md`, `SPEC/blocked.md`, `unattended-mode.md`, `step-5-loop-mode.md`) say "at Step 0" and remain true.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 17/18 **no change**: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/`/`codex/`/`cursor/`/`grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md` (cites §"Step 0 — Resolve paths"; heading stayed), `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (the probe row it ledgers still holds), `claude/CAPABILITIES.md` (describes `--debug` behavior, not where the parse lives), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (capability probe — literal `--unattended` still in `SKILL.md`, fragment path unchanged), `docs/WORKTREES.md`, `docs/VISION.md`. **Updated:** `docs/PLATFORMS.md` `--fast` row — "where the literal flag parse lives" → names Step 0's `step-0-flags.md` dispatch; the `--unattended` / `--debug` rows say "same two-step routing" and are left as written.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-task`'s skill body sat 1,161 bytes under its 33,000-char budget — a third of one of its own working units, the same squeeze [[CORE-558.5]] measured at 645 before raising the cap. Rather than raise it again or trim prose ([[CORE-EPIC-558]] showed what a trim of this body costs), the one genuinely branch-conditional section — the Step 0 flag walk, markers, mode definitions, and composition rule — now lives in `step-0-flags.md`, read only when the invocation carries a flag. The default flow loads 3,640 fewer bytes and reads nothing extra; a flagged run pays one ~4.7k Read it did not before, which is the deferral the budget doc's "only on the branch that needs them" test permits.

**Changed:** `claude/skills/ft-task/SKILL.md` (31,839 → 28,199, +2/−27 lines); new `claude/skills/ft-task/step-0-flags.md` (4,700); `docs/PLATFORMS.md` (1 clause). `docs/CONTEXT-BUDGET.md` deliberately untouched — cap unchanged, ledger is the next `/ft-release` §7.1's job.

**Verification:** scripted slice; two-way line diff identical (zero in-block repairs — the block carried no `above`/`below` pointers); `wc -c` headroom 4,801 ≥ 3,400; the CI budget loop re-run locally exits 0; flag literals remain in the body so the `docs/EXTERNAL-AGENTS.md` capability probe still answers.

**`touches:` reconciliation:** `git diff --name-only` = declared two paths **plus** `docs/PLATFORMS.md` (undeclared — surfaced by the Phase 4 doc-drift sweep, one clause) and this tasknote / PLAN.md (workflow artefacts). Recorded; no phase re-opened.

**Refactors deferred:** no second trim pass on the body (routing, not restatement, after [[CORE-535.4]]); `SPEC.md` is [[CORE-574.5]]. **Flag for the operator:** if `~/.claude/skills/ft-task` is a file copy rather than a directory symlink into this repo, the new fragment needs the same re-sync any new sibling does — not checked here (outside the repo).

**Archived:** 2026-09-11
