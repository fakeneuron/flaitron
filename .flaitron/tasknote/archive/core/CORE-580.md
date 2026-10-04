---
title: ft-file-followup-headroom-trim
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-574.4, CORE-574.N]
touches:
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/step-0-flags.md
---

# CORE-580 | ft-file-followup-headroom-trim

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-574.4]] · [[CORE-574.N]]

## 🎯 Goal

Restore ≥ one working unit (~3,000 chars) of headroom on `claude/skills/ft-file-followup/SKILL.md` (30,882 / 33,000 → 2,118) by extracting one narrow-use section into a lazy fragment per the CORE-574.4 recipe — never by raising the cap.

## ✅ Acceptance

- [x] `claude/skills/ft-file-followup/SKILL.md` measures ≤ 29,900 bytes (≥ 3,100 headroom under the 33,000 cap — clears the +3,091 unit) — `test $(wc -c < claude/skills/ft-file-followup/SKILL.md) -le 29900`
- [x] The flag walk, the two flag-conflict refusals + stop shape, and the three mode dispatches (park / starter / unattended, with their inline markers) live in `claude/skills/ft-file-followup/step-0-flags.md`, moved verbatim — two-way line diff of the pre-extract slice vs the fragment body shows only the stranded-pointer repairs listed in Implementation Notes
- [x] Step 0 in `SKILL.md` keeps the path resolution and dispatches the fragment only when a `-`-prefixed token is present (flagless flow reads nothing extra) — `grep -q 'step-0-flags.md' claude/skills/ft-file-followup/SKILL.md`
- [x] No stranded relative pointers (`above` / `below` / `this skill`) in the fragment or the body's Step 0 stub — `grep -n 'above\|below\|this skill' claude/skills/ft-file-followup/step-0-flags.md` reviewed line by line
- [x] The `docs/EXTERNAL-AGENTS.md` capability probe still answers: the literal `--unattended` remains in the body — `grep -c -- '--unattended' claude/skills/ft-file-followup/SKILL.md` ≥ 1
- [x] `docs/CONTEXT-BUDGET.md` §"Budgets" table is not edited — `git diff --name-only` excludes it
- [x] CI context-budget step passes locally on the edited body — the `.github/workflows/ci.yml` "Context budget" loop re-run from the shell, exit 0
- [x] Repo validation gates — `N/A` as written (`AGENTS.md` §"Validation" scopes them to viz + the fleet updater); substituted by the checks above plus `.editorconfig` hygiene (no trailing whitespace, final newline)

## 🧩 Subtasks

- [x] Scripted slice of `SKILL.md` lines 35–108 (the "**Parse `args`.**" paragraph through the `⚡ --unattended active` marker block) → `step-0-flags.md` under the fragment header (H1 + back-ref blockquote, matching `park-mode.md` / `starter-mode.md`)
- [x] Replace the slice in `SKILL.md` with a dispatch stub: initialize the three modes to `false`; no `-`-prefixed token → task-ID token + free text, then Step 1; otherwise Read the fragment, then Step 1
- [x] Name `step-0-flags.md` in the intro paragraph that names the fragments (this skill's Step 0 has no SKILL_DIR roster line; the stub's `Read … now` is the dispatch)
- [x] Repair stranded pointers in the fragment (`Steps 2–5 below` ×2, `Step 3 below`, `this skill`); confirm sibling blockquotes (`park-mode.md`, `starter-mode.md`) still read true
- [x] Verify: `wc -c`, two-way diff, `--unattended` literal count, local run of the CI budget loop, `.editorconfig` hygiene

## 🔗 Related

- [[CORE-574.4]] — predecessor; the `ft-task` headroom-trim whose extraction recipe this task reuses
- [[CORE-574.N]] — the epic audit that surfaced this follow-up

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Condition is live and byte-exact — `SKILL.md` is 30,882 against a 33,000 cap (2,118 of headroom, under both of this body's last substantial edits: CORE-570 +3,091, CORE-577.4 +2,874). Growth is all purposeful (starter merge, candidacy, area resolution), so nothing recent is a trim candidate. Step 0's flag walk + conflict refusals + three mode dispatches (lines 35–108, 5,211 bytes) are the one genuinely branch-conditional section — a flagless filing never needs them — so extraction satisfies `docs/CONTEXT-BUDGET.md`'s "only on the branch that needs them" test rather than deferring happy-path load.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Read:** `claude/skills/ft-file-followup/SKILL.md` (full body; section map below), `park-mode.md` / `starter-mode.md` headers (the back-ref blockquote idiom this skill already uses), `claude/skills/ft-task/step-0-flags.md` header (the CORE-574.4 fragment shape), `docs/CONTEXT-BUDGET.md` §"Budgets" row for `claude/skills/*/SKILL.md`, `.github/workflows/ci.yml` "Context budget" step, and every live reference to the body (`docs/EXTERNAL-AGENTS.md:93` capability probe, `docs/PLATFORMS.md` §flag tables + line 267 fragment list, `claude/CAPABILITIES.md` `--park` / `--starter` rows, `docs/AGENT-NEUTRALITY.md:50`).

**Section map (`wc -c` by range):** frontmatter 1,359 · intro 2,191 · Step 0 paths 740 · Step 0 parse walk 1,277 · flag-conflict refusals + stop shape 1,263 · park + starter dispatch 1,628 · unattended dispatch + marker 1,168 · Step 1 1,702 · Step 1a 1,784 · Step 2 3,190 · Step 3 4,878 · Step 4 5,692 · Step 5 2,388 · Notes 1,609. Total **30,882** / 33,000; target ≤ **29,900**; need ≥ 982 out — the seam below takes ~4,500.

**Seam chosen — Step 0 lines 35–108, 5,211 bytes:** the "**Parse `args`.**" paragraph + six token bullets, the `--park`/`--unattended` and `--starter` conflict refusals with the shared `⏸ … stop` shape, and the three `When <mode> = true` dispatch paragraphs (each already the Read-dispatch for `park-mode.md` / `starter-mode.md`, or the unattended posture statement + `⚡` marker). Lines 110–111 ("Default flow … is byte-identical to the pre-flag skill") stay in the body — that sentence describes the flagless path the stub now routes. Projected body ≈ **26,400**, headroom ≈ **6,600**.

**Why this seam and not the unattended posture or a prose trim:**
- The `--unattended` blocks in Steps 1–5 (~6.5k) are the larger narrow-use mass, but they are eight non-contiguous slices interleaved with the attended flow, and `docs/EXTERNAL-AGENTS.md:93` declares as a *stable caller surface* that this skill "carries its posture inline and ships no fragment" — extracting them is a contract change, not a load-shape change. The PLAN line asks for one section; Step 0 is the contiguous one, and the CORE-574.4 recipe is exactly this motion.
- A prose trim is the fidelity risk CORE-EPIC-558 spent three children repairing after CORE-535.4; verbatim extraction has no such failure mode and the two-way diff proves it.
- Cost shift, stated plainly: any flagged run (`--park` included, the common lightweight case) now pays one extra Read (~5.7k fragment). The flagless default filing drops ~4.5k of eager load. The budget gate measures eager load — the same argument CORE-556.2 / CORE-574.4 recorded. The no-`SPEC.md`-load property CORE-570 preserved is untouched: the fragment reads nothing beyond what the moved paragraphs already dispatched.

**What stays in the body, deliberately:** the intro paragraph naming both mode fragments (gains `step-0-flags.md`), the `<AREA>-<NUMBER>` validity rule, path resolution, the flagless task-ID / free-text rule (restated in the stub — the only net-new prose), and every per-step `unattended-mode` / `starter-mode` overlay block in Steps 1–5 (they describe their own behavior and cite their contracts; the `⏸ --unattended stop` shape they reuse is defined in the fragment, which any `--unattended` run has read at Step 0).

**Best Practices Review.** Touched responsibility is one file's *load shape*; semantics move verbatim. Dependency direction stays one-way (`SKILL.md` → sibling fragment; the fragment's own dispatches to `park-mode.md` / `starter-mode.md` are unchanged). Established shape: this skill's own `park-mode.md` blockquote idiom ("Lazy-loaded SKILL fragment. Loaded by `claude/skills/ft-file-followup/SKILL.md` Step 0 when …"). Required in-scope rewrite: the dispatch stub, the roster mention, and four stranded pointers in the moved text (`Steps 2–5 below` ×2, `Step 3 below`, `this skill`). Deferred: no cap edit, no ledger refresh (next `/ft-release` §7.1 / CI), no touch to the codex wrapper (it routes straight to the canonical body).

**Archive skim.** `grep -l 'claude/skills/ft-file-followup/SKILL.md' archive/core/*.md` → 24 hits; read the load-bearing ones by `touches:` recency: CORE-574.N (filed this; measured 2,118 and named the +3,091 / +2,874 units), CORE-577.4 (candidacy — the Step 3 / S3 / Step 5 text, untouched here), CORE-570 (starter merge — established the three-weight intro and the "no `SPEC.md` load" property this task preserves), CORE-564 (area resolution in Step 1a — untouched), CORE-565.3 (authored the `EXTERNAL-AGENTS.md` probe row that constrains the seam choice above), plus CORE-574.4 (the recipe). No `supersedes:` / ⚠️ pointers bearing on Step 0.

**Drift check.** PLAN line matches HEAD: 30,882 / 33,000 → 2,118, exact. No SPEC contract is contradicted — skill-body load shape only; every contract pointer moves with its paragraph. `park-mode.md` / `starter-mode.md` blockquotes say "Loaded by … SKILL.md Step 0" and stay true (the fragment is read *from* Step 0 and performs Step 0's dispatch). `docs/PLATFORMS.md:267` lists fragments non-exhaustively ("including") — add `step-0-flags.md` to the `ft-file-followup` clause in the Phase 4 sweep if it reads as an exhaustive pair. `docs/EXTERNAL-AGENTS.md:93` probe stays true (literal `--unattended` remains in Steps 1–5 and Notes; "ships no fragment" refers to the posture fragment, which this task does not create). CI "Context budget" step reads the table row, not a ledger figure.

**No clarifications needed (--fast).** Assumptions asserted: (1) extraction over trim, for the fidelity reason above; (2) the Step 0 flag block is the extract, one fragment named `step-0-flags.md` by the `ft-task` sibling convention; (3) `docs/CONTEXT-BUDGET.md` untouched — ledger is release-owned, cap unchanged per the PLAN line; (4) the stub's dispatch test is "any `-`-prefixed token present" (this skill's default flow legitimately carries a task ID and free text, so `rest` non-empty is the wrong test); (5) the unattended posture stays inline per the probe contract.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown only; losslessness proved by two-way line diff instead

**Implementation Notes:**

**Pattern survey.** Extended [[CORE-574.4]] / [[CORE-556.2]]: scripted byte-slice → sibling fragment with this skill's own `park-mode.md` blockquote idiom ("Lazy-loaded SKILL fragment. Loaded by `claude/skills/ft-file-followup/SKILL.md` Step 0 when …"); one-file **Read … now** dispatch in the body. No new shape.

**Minimal refactor gate.** The body's "**Parse `args`.**" paragraph was the only rewrite: it now initializes the three modes, routes a flagless `args` (no `-`-prefixed token) straight to Step 1 with the task-ID / free-text rule restated, and dispatches the fragment otherwise (272 → 631 bytes). The intro sentence "Step 0 loads whichever fragment its flag names" gained a clause naming `step-0-flags.md`. Inside the moved block, five repairs and nothing else: the opening paragraph's "Initialize … then walk the tokens" became "were all initialized to `false` by the host SKILL before this Read … Walk the tokens"; `this skill` → `the host SKILL`; `Steps 2–5 below` → `the host SKILL's Steps 2–5` (×2); `Step 3 below` → `host SKILL Step 3`. The two remaining `below` in the fragment (usage notice, stop shape) point inside the fragment and are not stranded.

**Sizes (`wc -c`).** `SKILL.md` 30,882 → **26,408** (−4,474). Fragment 5,767. Headroom **6,592** against 33,000 — above the 3,100 floor with ~2 of this body's own working units (+2,874 / +3,091) to spare. The projection (~26,400) held within 10 bytes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` (markdown; substituted checks below)

- [x] Ran lint/type-check on changed code — `N/A` (markdown; `.editorconfig` hygiene checked)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

| Verify command | Result |
|---|---|
| `test $(wc -c < claude/skills/ft-file-followup/SKILL.md) -le 29900` | → 0 (26,408) |
| `diff <(pre-extract slice, lines 35–108) <(sed -n '11,$p' step-0-flags.md)` | → 1; five hunks, all the planned repairs listed in Implementation Notes — nothing else |
| `grep -q 'step-0-flags.md' claude/skills/ft-file-followup/SKILL.md` | → 0 (2 hits: intro clause + dispatch) |
| `grep -n 'above\|below\|this skill\|this file' step-0-flags.md` | → 0 (2 hits, both intra-fragment `below`; reviewed) |
| `grep -c -- '--unattended' claude/skills/ft-file-followup/SKILL.md` | → 9 (probe still answers; `--park` / `--starter` literals also remain in the intro) |
| `git diff --name-only` excludes `docs/CONTEXT-BUDGET.md` | → yes |
| `.github/workflows/ci.yml` "Context budget" loop, re-run locally | → 0 (`budget OK`) |
| Trailing-whitespace grep on all edited files; final byte `0a` on both skill files | → clean |

**Structural quality.** No duplication (two-way diff). No dead content — the three mode paragraphs were already the dispatch for their fragments / posture and remain so. Public surface grows by one dispatched sibling in the same directory; `.claude/skills/ft-file-followup` is a directory symlink, so repo-local wiring picks it up with no re-wire (same as [[CORE-574.4]]). Code-facing documentation: `docs/PLATFORMS.md:267` fragment list and the `docs/EXTERNAL-AGENTS.md:93` probe parenthetical updated in Phase 4; `park-mode.md` / `starter-mode.md` blockquotes say "Loaded by … SKILL.md Step 0" and remain true.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 16/18 **no change**: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md` (names `--park` / `--starter` and `starter-mode.md`; still true), `claude/`/`codex/`/`cursor/`/`grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (row 50 names the probe *paths*; unchanged), `claude/CAPABILITIES.md` (`--park` / `--starter` rows say the flag "loads the … lazy fragment" — still true, via Step 0's dispatch), `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md`. **Updated:** `docs/PLATFORMS.md:267` — the `ft-file-followup` fragment list gains `step-0-flags.md` (its `--park` / `--starter` / `--unattended` table rows say the flag and its fragment "live in the loaded skill body" and are left as written — the literals stay in the body); `docs/EXTERNAL-AGENTS.md:93` — the capability-probe parenthetical "ships no fragment" narrowed to "ships no posture fragment; its `step-0-flags.md` sibling holds only the flag parse and is not part of the probe" (the probe rule itself is untouched — a stable caller surface).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-file-followup`'s skill body sat 2,118 bytes under its 33,000-char budget — below both of its own last substantial edits (+3,091, +2,874), the squeeze [[CORE-574.N]] flagged. Rather than raise the cap or trim prose, the one contiguous branch-conditional section — Step 0's flag walk, the two flag-conflict refusals with the shared `⏸ … stop` shape, and the three mode dispatches with their markers — now lives in `step-0-flags.md`, read only when `args` carries a `-`-prefixed token. A flagless filing loads 4,474 fewer bytes and reads nothing extra; a flagged run (`--park` included) pays one ~5.8k Read it did not before, which is the deferral `docs/CONTEXT-BUDGET.md`'s "only on the branch that needs them" test permits. The unattended posture stays inline in Steps 1–5, so the `docs/EXTERNAL-AGENTS.md` capability probe is unchanged.

**Changed:** `claude/skills/ft-file-followup/SKILL.md` (30,882 → 26,408; +12/−77 lines); new `claude/skills/ft-file-followup/step-0-flags.md` (5,767); `docs/PLATFORMS.md` (1 clause); `docs/EXTERNAL-AGENTS.md` (1 parenthetical). `docs/CONTEXT-BUDGET.md` deliberately untouched — cap unchanged, ledger is the next `/ft-release` §7.1's job.

**Verification:** scripted slice; two-way line diff shows exactly the five planned pointer repairs; `wc -c` headroom 6,592 ≥ 3,100; the CI budget loop re-run locally exits 0; `--unattended` literal ×9 in the body.

**`touches:` reconciliation:** `git diff --name-only` = declared two paths **plus** `docs/PLATFORMS.md` and `docs/EXTERNAL-AGENTS.md` (undeclared — surfaced by the Phase 4 doc-drift sweep, one clause each) and PLAN.md / this tasknote (workflow artefacts). Recorded; no phase re-opened.

**Refactors deferred:** the `--unattended` overlay blocks in Steps 1–5 (~6.5k, eight slices) are the next extraction candidate if this body squeezes again, but they are declared inline by the `EXTERNAL-AGENTS.md` probe row, so that move is a contract change to file on its own. **Flag for the operator:** if `~/.claude/skills/ft-file-followup` is a file copy rather than a directory symlink into this repo, the new fragment needs the same re-sync any new sibling does — not checked here (outside the repo).

**Archived:** 2026-09-11
