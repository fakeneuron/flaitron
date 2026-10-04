---
title: public-surface-decoupling audit
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [CORE-EPIC-652, CORE-652.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-652.N | public-surface-decoupling audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-652]]

## 🎯 Goal

Verify the completed `CORE-EPIC-652` (`public-surface-decoupling`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-652.N — audit CORE-EPIC-652` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-652.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-652.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-652` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-652.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-652]] — parent epic (public-surface-decoupling); Discovery supplied by audit-repo 2026-09-21, no `.1` child
- [[CORE-652.2]] — sole implementation child (natabula-ref-inventory), closed 2026-09-21

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-652.N`; Step 2 pre-flight passed (parent `CORE-EPIC-652` active under `## Medium`, sole implementation child `CORE-652.2` closed 2026-09-21, no open siblings, no early-audit decision). Cohort is one child + this audit; Discovery was supplied by audit-repo 2026-09-21, so no `.1` exists.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: verification pass over prose/comment deliverables; no code module or dependency boundary touched — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Cohort inventory (from `archive/core/CORE-652.2.md`):** 14 files, comment/prose only, commit `4181ae63`. 22 inventory lines resolved — 17 reworded to stand alone (the 7 `NAT-*` → `archive/natabula/` example sites became `OPS-*` → `archive/operations/`: `SPEC.md`, `SPEC/procedures/ft-task.md`, three skill bodies, `.flowtron/tasknote/README.md`, `templates/tasknote-README.md`; plus `ci.yml` comment, `SPEC/scope-boundaries.md` CORE-483.3 exception, `docs/CONVENTIONS.md` gitleaks provenance, `.gitleaks.toml` body) and 5 retained as labelled `operator-private` pointers (`brand/BRAND.md:18`, `brand/README.md:21`, `justfile:2,8`, `.gitleaks.toml:2,61`). Label convention: the literal phrase `operator-private` on the same line as any retained path, so `grep -v operator-private` proves coverage. Operator-chosen trade-off recorded: `.gitleaks.toml` comments now diverge from the fleet baseline (rules byte-identical).

**Archive skim:** self-referential — the only cohort child is itself the archive entry. Non-cohort history the child already cited (`CORE-578` gitleaks deposit, `CORE-637` justfile, `CORE-643` brand kit, `CORE-483.3` scope precedent) re-read for context only; none contradicts the `.2` rewording.

**Drift check (against HEAD `4181ae63`):** all 14 `touches:` paths exist; the child's Testing Notes commands re-run and reproduce (see Implementation Notes). `SPEC/epic.md` lifecycle honoured — `.2` stayed nested under the active parent. PLAN.md `CORE-652.N` line reads `[light]🔧 | public-surface-decoupling audit` — shortname present, no bare `| audit` placeholder to replace.

**Clarifications:** No clarifications needed. Assumptions: (1) the epic's scope is pointers into the private `~/Code/natabula` layer, so historical project names (`fintown`, `InvisiPaw`, `photard`) in `docs/PHILOSOPHY.md`, the PLAN.md Vision blurb, `SPEC/gate-discipline.md`, and viz test fixtures are origin-story / fixture text, not private-layer coupling — out of scope, no follow-up; (2) `~/code/flowtron` clone paths in `README.md` / `docs/MIGRATION.md` are the public install location, not a private pointer.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`: verification pass, no new surface — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — `N/A`: no code edits landed — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution — audit findings recorded below; no inline fix required

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code change

**Implementation Notes:**

**Cohort children inventoried:**
- `CORE-652.2` natabula-ref-inventory — 14 files reworded/labelled; see Discovery Notes for the split.

**Coherence findings — no inconsistencies surfaced:**
- Inventory grep re-run at HEAD: `git grep -n -i natabula -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!.flowtron/PLAN.md' ':!.flowtron/tasknote/CORE-652.N.md' | grep -v operator-private` → empty. Every surviving mention is on an `operator-private` line.
- `git grep -n 'operator-private' -- . ':!.flowtron'` → 8 lines / 6 files, matching the child's receipt exactly. Label placement is consistent: the three sites that keep a literal path (`.gitleaks.toml:2`, `brand/BRAND.md:18`, `brand/README.md:21`, `justfile:8`) carry the label on the same line; the path-less sites (`justfile:2`, `SPEC/scope-boundaries.md:19`, `docs/CONVENTIONS.md:54`, `.gitleaks.toml:61`) use it adjectivally. Parenthetical-vs-adjective variance is stylistic, not contractual — the grep contract is the literal phrase, which all 8 honour.
- The two brand-kit sites use the identical sentence shape (`Standard (operator-private): … §"Brand kit" — this … self-contained contract`) — style parity holds.
- `OPS-*` → `archive/operations/` example: 7 sites, all present; `.flowtron/tasknote/README.md:38` and `templates/tasknote-README.md:62` (live copy vs template) say the same thing; the three skill-body Area bullets are md5-identical (`415ebe36…`).
- `.gitleaks.toml` header and `ci.yml` comment tell the same story (deposited copy, read in place, CORE-578) — no contradictory cross-ref. `docs/CONVENTIONS.md:54` and `AGENTS.md:112` agree on the scan's additive-to-roster status.
- `grep -c -i -E 'marscharts|invisipaw|bidviz|bananapeel|polymarket' .gitleaks.toml` → 0.
- Budgets: `SPEC.md` 47,833 ≤ 53,000; `SPEC/procedures/ft-task.md` 35,935 ≤ 38,000; skill bodies 28,105 / 21,321 / 26,179 ≤ 33,000.

**Inline fixes applied:** none.

**Follow-up candidates:** none. Out-of-scope observation (recorded, not filed): public origin-story project names in `docs/PHILOSOPHY.md` / PLAN.md Vision / `SPEC/gate-discipline.md` / viz test fixtures are not private-layer pointers and were never in the epic's 14-file inventory.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed; audit is a markdown-prose verification pass

- [x] Ran lint/type-check on changed code — `N/A`: only this tasknote and PLAN.md change

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend change (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git grep -n -i natabula -- . ':!.flowtron/tasknote/archive' ':!.flowtron/PLAN-ARCHIVE.md' ':!.flowtron/PLAN.md' ':!.flowtron/tasknote/CORE-652.N.md' | grep -v operator-private` → exit 1 (no output = pass)
- `grep -c -i -E 'marscharts|invisipaw|bidviz|bananapeel|polymarket' .gitleaks.toml` → `0`, exit 0
- `git grep -n 'operator-private' -- . ':!.flowtron'` → 8 lines, exit 0
- Area-bullet md5 across three skill bodies → identical, exit 0
- `wc -c` budgets → all under cap, exit 0
- Cross-read of the 18 `AI-referenced docs` entries for `gitleaks|justfile|brand|fleet|~/Code/|operator-private|design-standards|stack-tendencies` → only public clone paths and release-tarball verification prose; no stale provenance claim.
- Structural: no code changed; nothing to check for duplication or dead code.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (fixed line):** `README.md` — no change; `AGENTS.md` — no change; `SPEC.md` — no change (the `.2` `OPS-*` neutralization in §"Task ID convention" holds at HEAD); `docs/MIGRATION.md` — no change; `claude/AGENTS-snippet.md` — no change; `codex/AGENTS-snippet.md` — no change; `cursor/AGENTS-snippet.md` — no change; `grok/AGENTS-snippet.md` — no change; `docs/CONVENTIONS.md` — no change (the `.2` §"GitHub Actions CI" operator-private provenance wording holds); `CONTRIBUTING.md` — no change; `SECURITY.md` — no change (its gitleaks lines cover release-tarball verification, not baseline provenance); `docs/AGENT-NEUTRALITY.md` — no change; `docs/PLATFORMS.md` — no change; `claude/CAPABILITIES.md` — no change; `docs/AGENT-COMPAT.md` — no change; `docs/EXTERNAL-AGENTS.md` — no change; `docs/WORKTREES.md` — no change; `docs/VISION.md` — no change. None of the 18 names the private layer; the cohort's two swept-doc edits are intact.

**Recap:** Audit ran over the one-child cohort; no inconsistencies surfaced and no inline fix was needed. Verification per Testing Notes — inventory grep empty, 8 labelled sites, 0 private repo names in `.gitleaks.toml`, Area bullet md5-identical ×3, budgets under cap. No refactors. `touches:` omitted (no file deliverable beyond this tasknote + PLAN.md); `git diff --name-only` = `.flowtron/PLAN.md` + this tasknote's archive move only. Maintainability effect: the `operator-private` label is confirmed as a single greppable contract for every retained private pointer, so future sweeps re-run one command. Follow-ups: none.

**Parent-flip decision:** Yes — operator confirmed at the 📦 gate; `CORE-EPIC-652` flipped to stub form and the cohort (`.2`, `.N`) moved atomically to the top of `## Completed` in the closure commit. `## Medium` restored to `(none)`.

**Archived:** 2026-09-21
