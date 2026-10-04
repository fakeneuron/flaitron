---
title: adopter-footprint audit
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-632, CORE-632.2, CORE-632.3]
---

# CORE-632.N | adopter-footprint audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-632]]

## 🎯 Goal

Verify the completed `CORE-EPIC-632` (`adopter-footprint`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-632.N — audit CORE-EPIC-632` (or `chore: ...` if no code edits land) commit lands (staged at Step 9's 📦 gate; `chore:` — markdown only)
- [x] PLAN.md line for `CORE-632.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-632.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-632` to `Completed` and moving the cohort to `## Completed` (bundled into the 📦 gate; decision recorded in Final Summary)

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-632.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-632]] — parent epic (adopter-footprint)
- [[CORE-632.2]] — cohort child (readme-logo-webp)
- [[CORE-632.3]] — cohort child (submodule-archive-exclusion-guidance)

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-632.N` invoked explicitly; Step 2 pre-flight passed. Cohort state at audit time: `CORE-632.2` (readme-logo-webp) closed 2026-09-20 under `--unattended`; `CORE-632.3` (submodule-archive-exclusion-guidance) closed 2026-09-20 attended. No `.1` Discovery child — the epic's Discovery was supplied by `/ft-audit-repo` 2026-09-20. No open siblings; no early-audit decision.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Cohort inventory.** `CORE-632.2` — `README.md:4` `<img src>` → `LOGO.webp`; new root `LOGO.webp` (4,566 bytes, byte-identical copy of `viz/public/LOGO.webp`); `LOGO.png` (446,650 bytes) removed. `CORE-632.3` — `docs/MIGRATION.md` §1.1 exclusion block (per-tool list: Claude Code `Read(./.flowtron/core/.flowtron/**)` deny rule + its one cost, Cursor `.cursorignore`, ripgrep `.ignore`), §1.6 staging sentence, §"Pinning and bumping" tag-message fallback clause; one mirrored wiring-section paragraph in each of `claude/` · `codex/` · `cursor/` · `grok/AGENTS-snippet.md`; `/ft-new-project` `Step 3b` + Step 7 staging + corrected Notes claim.
- **Best Practices Review** — N/A: verification pass over markdown deliverables; no code surface.
- **Archive skim** — `archive/core/` confirmed against the README table. Cohort children are the archive entries in scope; `CORE-632.3`'s own skim already followed the `.claudeignore` / `.cursorignore` thread to `CORE-483.3` / `CORE-483.N` (screenshot-discipline deposits). `git log -- .claudeignore` → single commit `a6e4f47` (CORE-029). No further non-cohort history on the cohort's paths.
- **Drift check (HEAD, 2026-09-20).** `.2`: `grep -n LOGO README.md` → line 4 only, `LOGO.webp`; `LOGO.png` absent; `git grep LOGO.png` outside `.flowtron/` → none. `.3`: `git grep 'flowtron/core/.flowtron/'` hits exactly the seven documented sites (MIGRATION ×4 incl. §"Pinning and bumping", four snippets, `ft-new-project` Step 3b); no added snippet line carries `ln -s`; `wc -c ft-new-project/SKILL.md` → 12,969 (cap 33,000); the only live `claudeignore` mention is MIGRATION §1.1's "there is no `.claudeignore`". Epic-line figures ("12.5 MB / 987 files") vs HEAD `du -sh .flowtron` → 14M, 994 tracked files — the deliverables say "~14 MB, ~1,000 files", which still holds; the parent line stubs at flip, no edit needed.
- **PLAN-side observation.** `CORE-632.2`'s stub reads `- [x] **CORE-632.2** Completed 2026-09-20.` — no `| shortname`. Already owned by `CORE-635` (plan-stub-shape-ratchet: fixture + CI pair + repair the row); not re-filed here, and not repaired inline so CORE-635's ratchet has its live case.
- No clarifications needed. Assumption: the cohort is complete as filed (two implementation children); the audit does not re-litigate the epic's "keep the archive where the README's headline claim needs it" decision.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no code edits landed; audit is a verification pass

**Implementation Notes:**

- **Pattern survey / refactor gate** — N/A: no new surface; no edits applied.
- **Cohort coherence — no inconsistencies surfaced.** Figures agree across all seven sites ("~14 MB, ~1,000 files"); each platform paragraph names exactly one mechanism (Claude Code deny rule / Codex `.ignore` / Cursor `.cursorignore` / Grok `.ignore`) and points at the single detailed list in `docs/MIGRATION.md` §1.1 rather than restating it; `Step 3b`'s three-item list matches §1.1's three tools and its "one cost" sentence matches §1.1 and §"Pinning and bumping" word-for-word in substance; Step 7 and the Notes claim name the same three merge targets as Step 3b. `.2` and `.3` touch disjoint paths — no cross-refs to contradict.
- **No regressions** in either child's surfaces at HEAD (Drift check receipts above). Root `LOGO.webp` and `viz/public/LOGO.webp` are byte-identical — a deliberate two-copy shape (README root-relative path; viz serves its own `public/`), 4.5 KB each, not a miss.
- **Inline fix applied (1):** `docs/PLATFORMS.md` §"What the `<PLATFORM>`-snippet must contain", item 2 — +5 lines: every snippet's wiring section now also carries the one-line dogfood-archive exclusion naming the platform's ignore mechanism (CORE-632.3 added it to all four), and the checklist a future platform author follows did not say so. Surfaced by the doc-drift sweep; applied inline as a one-sentence checklist update.
- **Miss → `/ft-file-followup` candidate (1):** flowtron's root `.claudeignore` (`SCRATCH.md`, from CORE-029 `a6e4f47`) is dead on both counts — `SCRATCH.md` no longer exists, and CORE-632.3 verified Claude Code has no `.claudeignore` mechanism (the live docs now say so at MIGRATION §1.1). `git rm .claudeignore`; light, `--park --low` shape. Not applied inline: outside the cohort's deliverables, and the audit stays a verification pass.
- **Already owned, not re-filed:** `CORE-632.2` stub missing `| shortname` → `CORE-635`. **Adopter-layer, not flowtron's:** natabula's `configs/.claudeignore` deposit is inert and neither it nor `configs/.cursorignore` carries the submodule-archive line (recorded by `CORE-632.3`; natabula-side).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: markdown-only (`docs/PLATFORMS.md` +5 lines); no markdown linter in this repo; diff hunk re-read

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown-prose verification only; no test surface. Verification receipt = the Drift-check commands in Discovery Notes (all green at HEAD 2026-09-20). Frontend confirmation N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs", cumulative over the cohort): `docs/PLATFORMS.md` — **updated** (§"What the `<PLATFORM>`-snippet must contain" item 2 now names the dogfood-archive exclusion line every snippet carries since CORE-632.3). No change: `README.md` (logo already `LOGO.webp` via `.2`; archive headline claim untouched by design), `AGENTS.md` (Repo Layout never listed `LOGO.png`), `SPEC.md`, `docs/MIGRATION.md` / `claude|codex|cursor|grok/AGENTS-snippet.md` (updated by `.3`, verified coherent at HEAD), `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (the deny rule is a context hygiene control, not a threat-model mitigation), `docs/AGENT-NEUTRALITY.md` (§1.1's Claude bullet is one of three in a per-tool list; row 56 already frames MIGRATION as the full Claude adoption guide), `claude/CAPABILITIES.md` (no ignore/deny trigger entry existed before; not a capability the skills key on), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

**Recap.** Audit ran over the two-child `CORE-EPIC-632` cohort; no inconsistencies surfaced across the cohort's deliverables — figures, mechanism names, and every §1.1 / §1.6 / Step 3b / Step 7 cross-reference agree at HEAD, and both children's Acceptance receipts re-verify. One inline fix from the sweep (`docs/PLATFORMS.md`, +5 lines). One follow-up candidate: `git rm` flowtron's dead root `.claudeignore` (`SCRATCH.md` gone; mechanism inert per `.3`) — light, park-low. `CORE-632.2`'s bare stub is already `CORE-635`'s. `touches:` reconciliation: no `touches:` declared (audit); `git diff --name-only` = `docs/PLATFORMS.md` + this tasknote + `PLAN.md`. Maintainability: the platform plug-in checklist now matches what the four shipped snippets actually carry, so the next wiring bundle inherits the exclusion line instead of rediscovering it.

**Parent-flip decision (Step 8/9):** Yes — `CORE-EPIC-632` stubbed `Completed 2026-09-20.` and moved with `.2` / `.3` / `.N` to the top of `## Completed` in the audit commit.

**Archived:** 2026-09-20
