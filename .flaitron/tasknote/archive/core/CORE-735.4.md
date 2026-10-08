---
title: sparse-checkout-docs
status: completed
tags: [epic-child, docs]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-735, CORE-735.3, CORE-735.N, CORE-632.3]
touches:
  - docs/MIGRATION.md
  - claude/skills/ft-new-project/SKILL.md
  - claude/skills/ft-update/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - docs/PLATFORMS.md
  - docs/UPGRADING.md
  - .flaitron/PLAN.md
---

# CORE-735.4 | sparse-checkout-docs

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-735]]

## 🎯 Goal

Ship [[CORE-735.3]]'s decision: adopters sparse-checkout `.flaitron/core` without its dogfood `.flaitron/`. The recipe goes in MIGRATION §1.1 and `ft-new-project` Step 2, and `ft-update` re-applies it on every run (Step 1, before the version check). The existing deny/`.ignore`/`.cursorignore` fence stays, reworded as the fallback.

## ✅ Acceptance

- [x] MIGRATION §1.1 carries the sparse line after `checkout <tag>`, states the git floor, and rewords the fence as fallback — `awk '/^### 1.1 /{a=1} /^### 1.2 /{a=0} a' docs/MIGRATION.md | grep -c "sparse-checkout set --no-cone '/\*' '!/.flaitron/'"` ≥ 1 and `… | grep -qi 'fallback' && … | grep -q '2.35'`
- [x] MIGRATION §"Pinning and bumping" re-applies sparse alongside the checkout, and says the fleet updater does not — `awk '/^## Pinning and bumping/{a=1} /^## Visualizer/{a=0} a' docs/MIGRATION.md | grep -q 'sparse-checkout set'`
- [x] `ft-new-project` Step 2 runs the sparse line; Step 3b is framed as the fallback — `grep -c "sparse-checkout set --no-cone" claude/skills/ft-new-project/SKILL.md` ≥ 1 and `grep -qi 'fallback' claude/skills/ft-new-project/SKILL.md`
- [x] `ft-update` re-applies sparse on every run (Step 1, before the version check and the Step 3 checkout) — `awk '/^## Step 1 /{a=1} /^## Step 2 /{a=0} a' claude/skills/ft-update/SKILL.md | grep -q 'sparse-checkout set'`
- [x] The four AGENTS-snippets' fence paragraphs name sparse-checkout first and the ignore line as fallback — `for f in claude codex cursor grok; do grep -q 'sparse' $f/AGENTS-snippet.md || echo MISS $f; done` prints nothing
- [x] `tools/update-adopters.mjs` unchanged (operator: docs only) — `git diff --quiet HEAD -- tools/update-adopters.mjs`
- [x] Repo checks green — `bash tools/drift-checks.sh` → 0 and the CONTEXT-BUDGET check (via drift/CI script) → 0

## 🧩 Subtasks

- [x] MIGRATION §1.1: add the sparse line + git floor; reword the fence paragraph as fallback
- [x] MIGRATION §"Pinning and bumping": sparse re-apply in step 2; step 1's per-release-tasknote note; fleet-updater sentence
- [x] `ft-new-project` Step 2 sparse line; Step 3b intro reworded as fallback
- [x] `ft-update` Step 1 re-apply (every run)
- [x] Four AGENTS-snippet fence paragraphs + `docs/PLATFORMS.md` snippet-requirement line
- [x] Verify: Acceptance greps, drift-checks, budget check

## 🔗 Related

- [[CORE-EPIC-735]] — parent epic (adopter-footprint)
- [[CORE-735.3]] — predecessor: the decision this implements
- [[CORE-735.N]] — follow-up: epic audit
- [[CORE-632.3]] — origin of the per-platform fence line the snippets carry

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.3` filed this row today with an exact recipe; nothing in PLAN has since landed on these surfaces.

- [x] Read relevant source files — MIGRATION §1.1 and §"Pinning and bumping"; `ft-new-project` Steps 1–3b, 7, Notes; `ft-update` Steps 3 and 5; the four AGENTS-snippets' fence paragraphs and `claude/AGENTS-snippet.md` §"Bumping"; `tools/update-adopters.mjs` checkout paths (`checkoutVerified`, rollback); `docs/PLATFORMS.md` §snippet requirements (line ~254); CONTEXT-BUDGET rows.

- [x] **Best Practices Review** — N/A: docs and skill prose only; no module boundary changes.

- [x] **Archive skim** — area `core` confirmed against the README table. [[CORE-735.3]] (decision, known costs, `.4` scope) and [[CORE-735.2]] (numbers) are the load-bearing hits; [[CORE-632.3]] is the origin of the snippet fence line, cited from PLATFORMS.md.

- [x] **Drift check** — PLAN row matches `.3`'s `.4` scope. `git grep 'core/\.flaitron'` outside the archive: MIGRATION (lines 58–67, 485), `ft-new-project` 70–73, four snippets, PLATFORMS.md 254, UPGRADING 34 (v6 rename recipe's deny-rule rename — leave; review round 2 added an optional sparse line to its step 3 re-add), an updater test fixture (path rename, unrelated). Budgets: `claude/skills/*/SKILL.md` cap 33,000; `ft-update` is 18,497 and `ft-new-project` 12,958, so there is ample headroom. MIGRATION and PLATFORMS are budget-exempt.

- [x] Asked clarifying questions — AskUserQuestion: the fleet updater stays **docs only** (Recommended). Its `git checkout` respects an existing sparse config; MIGRATION notes that a fleet bump does not restore sparse after a re-clone, and the fence covers that window.
  Assumptions: `ft-update` re-applies unconditionally (idempotent, and the only way to restore sparse after a re-clone). Git floor stated as ≥ 2.35, the first release whose `sparse-checkout` docs list `set --no-cone`. Existing adopters pick it up at their next `/ft-update`; no UPGRADING entry.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Pinning step 1 points at the per-release tasknote under `.flaitron/core/.flaitron/`. Sparse removes it from the working tree, the same cost the deny rule already carries; the tag message stays readable, and so does `git -C .flaitron/core show vX.Y.Z:<path>`.
- Non-cone mode is documented as discouraged in newer git but not slated for removal. Cone mode cannot express "everything except one directory" without listing every top-level directory, which would drift as flaitron adds directories. Non-cone is the fit; worth one clause.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing shape on each surface. The sparse line joins MIGRATION §1.1's / `ft-new-project` Step 2's add→checkout block, and `ft-update` Step 3's checkout→add block. The fence paragraphs keep their structure and gain a "sparse first, this as fallback" lead. The CORE-632.3 one-liner pattern in each snippet is kept, as PLATFORMS.md requires.

- [x] **Minimal refactor gate** — no refactor. Each edit is local to the paragraph or code block that names the dogfood path. UPGRADING.md:34 (v6 rename recipe) is left as historical.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose and skill-instruction edits; `tools/update-adopters.mjs` unchanged by operator choice.

**Implementation Notes:**

- MIGRATION §1.1: sparse line after `checkout vX.Y.Z`. The new paragraph covers what it saves (18.5 → 2.9 MB), the git floor (≥ 2.35), and why non-cone. Two limits: the config is per-clone, restored by `/ft-update`; objects are unchanged. The old fence paragraph is now **Fallback: fence the path per tool.** Its bullets are unchanged.
- MIGRATION §"Pinning and bumping": step 1 names sparse alongside the deny rule as what hides the per-release tasknote, and step 2's block gains the re-apply. The fleet-updater paragraph now says it keeps but does not apply sparse.
- `ft-new-project` Step 2: sparse line runs even when pinned to `main`; older git → skip and say so. Step 3b intro reframed as the fallback, with its three writes unchanged.
- `ft-update` Step 1: re-apply runs on every run, after the tag fetch and before the version check and any confirm, guarded by `git --version` ≥ 2.35. Every exit and the Step 5 recap name the outcome. Step 3's checkout then respects it, so the archive is never written back. This was originally placed after the Step 3 checkout and moved by review rounds 1–2 (see Testing Notes).
- `docs/UPGRADING.md` v6 re-add recipe gets an optional sparse line (review round 2).
- Four snippets + PLATFORMS.md §snippet requirements: sparse first, ignore mechanism as fallback.
- Bytes: `ft-new-project` 12,958 → 13,591; `ft-update` 18,497 → 18,982 (cap 33,000).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A as a test run: no code changed. A scratchpad probe stood in: sparse set, then `checkout v6.0.0` → no `.flaitron/`, `SPEC.md` present, `status` clean. `git show v6.0.0:.flaitron/tasknote/archive/core/CORE-680.md` reads from objects.

- [x] Ran lint/type-check on changed code — N/A: markdown only; `tools/drift-checks.sh` (incl. CONTEXT-BUDGET caps) is the lint here

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run):
- §1.1 sparse line / fallback (`-qi`) / `2.35` → 1 match, 0, 0
- §Pinning `sparse-checkout set` → 0
- `ft-new-project` sparse line / fallback → 1 match, 0
- `ft-update` Step 1 `sparse-checkout set` → 0
- snippets loop → prints nothing
- `git diff --quiet HEAD -- tools/update-adopters.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (budget caps incl.; `ft-update` 19,414 / `ft-new-project` 13,766 of 33,000)

Criterion 1's verify command was corrected from `grep -q fallback` to `-qi` (the prose says "**Fallback:**"); the criterion is unchanged.

External review — `/code-review medium` on the working-tree diff, three rounds:
- **Round 1.** Blocker: `/ft-update`'s already-latest early exit skipped the re-apply, so "this is where it comes back" was false. Back to Phase 2, initially fixed by re-applying on the early exit too. Notes fixed: Step 5 recap slot; ft-new-project Step 8 hand-off bullet; sparse before checkout (no write-then-delete churn); pinning step 1 `show <tag>:<path>`; ~14 → ~16 MB reconciled across five surfaces. Note rejected: claimed git 2.25–2.34 works without `--no-cone`; not verifiable (when `set` auto-enables sparse varies by version), so the floor stays at 2.35. Note no-action: the fleet updater does not apply sparse (operator chose docs-only; stated in MIGRATION).
- **Round 2.** Blocker-class: "re-applies on every run" overclaimed (a declined bump, older git). Fixed by moving the re-apply to one unconditional spot at the top of `ft-update` Step 1 with a `git --version` guard, and naming the outcome on every exit. Notes fixed: git-version detection in ft-new-project; "deprecated, no current plan to remove" wording matches git docs; `ls-tree` discovery for the tasknote ID; tasknote placement text; optional sparse line in the UPGRADING v6 re-add.
- **Round 3.** No blocker. Notes fixed: tag fetch before `ls-tree`/`show`; re-apply placed before the network fetch; Step 3 claim conditioned on the older-git skip; the ft-new-project recap's "on any run" → "on git ≥ 2.35"; fleet-updater mention dropped from the adopter paste-block; a garbled sentence; UPGRADING declared in `touches:`. Accepted risk: locally modified files under `<FT>/.flaitron/` survive `sparse-checkout set` with a warning; adopters don't edit the submodule. Deferred to [[CORE-735.N]]: the sparse caveats are repeated across ~10 surfaces rather than pointing at §1.1 (skill bodies must be self-contained, so the audit judges the trade).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: MIGRATION, PLATFORMS, UPGRADING, the four AGENTS-snippets, `ft-new-project` and `ft-update` bodies. No change: SPEC.md + modules (no contract change), README, AGENTS/CLAUDE, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION, PHILOSOPHY, DOGFOOD, CONTEXT-BUDGET (ledger figures are dated measurements, caps not near), VERSION-HISTORY (`/ft-release` writes it), GLOSSARY.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Task-local: a step that restores per-clone state has to sit before every early exit, including the network fetch and the confirm. Placing it at the mutation point (Step 3) missed two exits, and review rounds 1–2 found them one at a time.

**Final Summary:**

Shipped [[CORE-735.3]]'s decision. MIGRATION §1.1 and `ft-new-project` Step 2 add `git -C .flaitron/core sparse-checkout set --no-cone '/*' '!/.flaitron/'` after the pin checkout. Working tree goes ~18.5 → ~2.9 MB; floor git ≥ 2.35. `ft-update` re-applies it first thing in Step 1 on every run, so a re-cloned adopter gets the trim back even with no newer tag, offline, or on a declined bump. MIGRATION §Pinning re-applies it before the checkout and reads a hidden release tasknote from objects. The deny/`.ignore`/`.cursorignore` fence is reworded as the fallback across MIGRATION, `ft-new-project` Step 3b, the four snippets, and PLATFORMS' snippet requirement. The fleet updater is unchanged (operator: docs only); MIGRATION states its gap.

Changed files: the eight docs/skill/snippet paths in `touches:`, `.flaitron/PLAN.md` (stub flip only), and this note. `touches:` reconciliation: declared = actual (UPGRADING was added to `touches:` mid-task, at review round 3). No refactors. Maintainability effect: adopters' submodule tree drops ~84% with no change to flaitron-self's workflow. Cost: the sparse caveats now repeat across ~10 surfaces, flagged for [[CORE-735.N]].

**Archived:** 2026-10-08
