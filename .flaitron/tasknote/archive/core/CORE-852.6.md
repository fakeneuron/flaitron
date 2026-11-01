---
title: ft-update-parity-carveout
status: completed
tags: [fleet, pin-bump, ft-update, scope]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.4, CORE-852.5, CORE-852.7]
touches:
  - claude/skills/ft-update/SKILL.md
  - codex/skills/ft-update/SKILL.md
  - codex/reconcile-skills.md
  - SPEC/scope-boundaries.md
  - SPEC.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - docs/MIGRATION.md
  - docs/WORKTREES.md
  - README.md
blocked-by:
  - CORE-852.5
---

# CORE-852.6 | ft-update-parity-carveout

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-852]] [[CORE-852.5]] [[CORE-852.7]]

## 🎯 Goal

Make `/ft-update`'s single-repo bump write what `tools/update-adopters.mjs` writes — the `Pinned to:` line, the AGENTS.md `## Workflow` block, and the tracked dangling-link prune — and widen the CLI carve-out wording to name the adopter files the updater writes.

## ✅ Acceptance

- [x] `/ft-update` (Claude body) rewrites every `Pinned to: vX.Y.Z` in `.flaitron/tasknote/README.md` to `<target>` after an approved bump, with the updater's symlink skip — `grep -q 'Pinned to:' claude/skills/ft-update/SKILL.md`
- [x] `/ft-update` replaces AGENTS.md's one exact `## Workflow` section with the target snippet's paste block, with the updater's three skips (symlink, >1 heading, block missing) — `grep -q '## Workflow' claude/skills/ft-update/SKILL.md`
- [x] `/ft-update` prunes tracked dangling links into `<FT>` on every present surface after an approved bump, keeping untracked / foreign ones and `.claude/worktrees/` — `grep -qi 'tracked dangling' claude/skills/ft-update/SKILL.md`
- [x] Codex wrapper names the follow-through so the Codex path writes the same — `grep -q 'follow-through\|Step 3.5' codex/skills/ft-update/SKILL.md`
- [x] `SPEC/scope-boundaries.md` and `SPEC.md` carve-outs name the adopter files the updater writes — `grep -q 'Pinned to:' SPEC/scope-boundaries.md && grep -q 'AGENTS.md' SPEC.md`
- [x] No doc still claims non-Codex dangling links are report-only after a bump — `judgment` — the sweep list in Implementation Notes
- [x] Context budgets and drift checks pass — `bash tools/drift-checks.sh` exits 0
- [x] Updater suite unaffected — `node --test tools/update-adopters.test.mjs` exits 0

## 🧩 Subtasks

- [x] `claude/skills/ft-update/SKILL.md`: new Step 3.5 follow-through (pin line + Workflow block) after the checkout; Step 4 non-Codex prune after an approved bump; Step 4.6 narrowed to what remains; Step 2 preview + Step 5 staging/recap name the follow-through paths; description frontmatter
- [x] `codex/skills/ft-update/SKILL.md`: one sentence keeping the follow-through on the Codex path
- [x] `SPEC/scope-boundaries.md` + `SPEC.md`: widen the carve-out
- [x] Sweep: `claude/AGENTS-snippet.md` §"Bumping", `codex/`/`cursor/`/`grok/` snippet pinning notes, `docs/MIGRATION.md` §"Pinning and bumping" + §"Retired skills", `README.md` versioning line
- [x] Run drift checks + updater suite

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.1]] — Discovery; locked "parity: both the tool and `/ft-update`"
- [[CORE-852.4]] — ported the pin-line and Workflow-block follow-through into the updater (predecessor)
- [[CORE-852.5]] — ported wiring + tracked dangling-link prune into the updater (predecessor; blocked-by per Fan-out)
- [[CORE-852.7]] — parity run + release (follow-up)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.4`/`.5` landed the three writes in the updater; `/ft-update` still has none of them (Step 4 prunes Codex-only, Step 4.6 report-only elsewhere, no pin-line or Workflow step). Until this lands, a single-repo bump and a batch bump of the same repo produce different commits.

- [x] Read relevant source files — `claude/skills/ft-update/SKILL.md` (all), `codex/skills/ft-update/SKILL.md`, `tools/update-adopters.mjs` header (follow-through, wiring, rollback, Not covered) + `rewritePinLines` / `workflowPasteBlock` / `replaceWorkflowSection` / `danglingLinks` / `wireSkills` / `WIRING_SURFACES` / `PRUNE_SKIP`, `SPEC/scope-boundaries.md:27-33`, `SPEC.md:760-772`, `codex/reconcile-skills.md` head.

- [x] **Best Practices Review** — markdown-only skill; the parity source of truth is the updater's code, so the skill states the same rules in prose (no second regex engine, no script — `SPEC/scope-boundaries.md`). Codex pruning keeps `reconcile-skills.md` (exact-owned retired links, even untracked); the generic tracked prune covers the remaining surfaces and any Codex leftovers.

- [x] **Archive skim** — `archive/core/` (CORE row confirmed). Load-bearing: **CORE-852.1** (parity decision; matrix rows "Dangling links", "`Pinned to:` line", "AGENTS.md `## Workflow`"); **CORE-852.4** (exact `## Workflow` heading, section ends at H1/H2, parent-dir symlink guard — deliberate deviations from W, which `/ft-update` should follow since parity is with the tool); **CORE-852.5** (prune-before-create; untracked dangling kept; `.claude/` whole root, worktrees skipped; deviations named so `.6` doesn't read them as drift); **CORE-849** (reconcile block zsh portability — not touched here); **CORE-841** (no bearing).

- [x] **Drift check** — PLAN line matches; `SPEC.md` carve-out at `:762` (as `.1` recorded); `scope-boundaries.md:29`. The tool's header "Not covered" was already rewritten by `.5`, so not in scope. `SECURITY.md` and `docs/MIGRATION.md:573` already updated by `.4`/`.5`. `Pinned to:` is a natabula-side tasknote README convention — flaitron's templates don't carry it, so the step is a no-op where absent.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions (all follow the tool, per the locked parity decision): (1) the pin-line and Workflow writes run only after an approved Step 3 checkout, never on repair-only runs, and are previewed in the Step 2 confirm rather than gated separately; (2) the Workflow block is read from `<FT>/claude/AGENTS-snippet.md` after checkout (the sparse trim excludes only `<FT>/.flaitron/`); (3) the non-Codex tracked prune runs only after an approved bump — repair-only runs keep today's report-only rule for non-Codex surfaces; (4) Codex keeps `reconcile-skills.md` at both pins, and the tracked prune also sweeps `.agents/skills` after the bump, as the tool does.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Doc spots still claiming the old prune rule: `claude/AGENTS-snippet.md:110` (outside the paste fence — lines 15-31), `codex/AGENTS-snippet.md:88-92`, `cursor/AGENTS-snippet.md:114`, `grok/AGENTS-snippet.md:97`, `docs/MIGRATION.md:512` + §"Retired skills" intro, `README.md:340-342`. `docs/VISION.md:22`, `SPEC/layout.md:50`, `README.md:312`, `AGENTS.md` — name the carve-out only; no change. `docs/CODEX-VERIFICATION.md` — historical receipt; left alone. Budgets: `SPEC.md` 44,221 / 49,000; ft-update body 22,965 / 33,000; `scope-boundaries.md` 5,583 (ledger in `docs/CONTEXT-BUDGET.md:249`).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — new `## Step 3.5` follows the body's existing numbered-step shape (Step 4.5 / 4.6 / 4.7 precedent); the prune paragraph sits at the head of Step 4 beside the Codex block it complements; rules transcribed from the updater's code, not from W

- [x] **Minimal refactor gate** — none; Step 4's closing "Retirement pruning is bounded to the Codex block" sentence rewritten because the new prune falsified it

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown skill body, no executable change; updater suite re-run unchanged

**Implementation Notes:**

- `claude/skills/ft-update/SKILL.md`: frontmatter description; Step 2 preview names the follow-through (covered by the bump confirm); Step 2 decline skips 3.5; new Step 3.5 (pin line; Workflow block — exact heading, H1/H2 end, symlink/parent-symlink skip, >1-heading and missing-block skips, zero headings → no-op, matching `followThrough`); Step 4 tracked prune (bump only, before per-platform rules, `.claude/` whole tree minus worktrees, tracked + target inside `<FT>`); Step 4 closing sentence; Step 4.6 intro; Step 5 staging + recap.
- `codex/skills/ft-update/SKILL.md`: after an approved bump, run 3.5 + the tracked prune, then the reconcile block against the new pin.
- `SPEC/scope-boundaries.md` / `SPEC.md`: carve-out now names the four adopter writes (gitlink, `Pinned to:`, `## Workflow`, skill links) as exactly `/ft-update`'s, never PLAN/tasknote/source.
- Sweep: `claude/AGENTS-snippet.md` §"Bumping" (outside the paste fence), `codex/` / `cursor/` / `grok/` snippet pinning notes, `docs/MIGRATION.md` §"Pinning and bumping" + §"Retired skills" intro, `docs/WORKTREES.md:98` (found by the post-edit sweep grep, not in Discovery's list), `README.md:340`. No change: `docs/VISION.md`, `SPEC/layout.md`, `AGENTS.md`, `SECURITY.md`, `docs/MIGRATION.md:573` (all already accurate); `docs/CODEX-VERIFICATION.md` historical.
- Ordering vs the tool: the tool prunes then creates inside one rollback window; `/ft-update` stages and the operator commits, so there is no rollback to mirror — a declined commit leaves the staged tree for the operator.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (the procedure blocks it extracts from `codex/reconcile-skills.md` are unchanged)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `bash tools/drift-checks.sh` is the markdown gate

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — six `/code-review medium` rounds over the working tree; every blocker fixed; round 6 fixes are mechanical and verified by drift + suite, not re-reviewed — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

External review round 1 (`/code-review medium`, working tree) — 10 findings:
1. **blocker** — prune + Step 3.5 writes ran before the Codex target-pin conflict check (updater skips untouched). Fixed: Step 3.5 "A Step 4 conflict after this step undoes the bump" restore recipe.
2. **blocker** — prune walked a surface whose root/skills dir is redirected; updater leaves it out (`wiringPlan` `continue`, verified at `:1142-1146`). Fixed in the prune paragraph.
3. **note** — updater's `SECTION_END` / `WORKFLOW_HEADING` match `#` lines inside code fences (tool code from `.4`, not this diff). Filed **CORE-853** (`--park`, `b777495f`).
4. **note** — prose "heading" read as Markdown-aware would diverge from the tool. Fixed: Step 3.5 states line-by-line matching, fenced lines included (CORE-853 fixes both).
5. **blocker** — Step 2 preview judged the Workflow block from the checked-out current snippet. Fixed: `git -C <FT> show <target>:claude/AGENTS-snippet.md`.
6. **blocker** — "target does not exist" / "resolves inside" looser than ENOENT/ENOTDIR + lexical containment. Fixed in prose.
7. **blocker** — a Step 1 current-pin link to a skill the target retires survived as untracked and was staged dangling. Fixed: Step 1-created links count as tracked for the prune.
8. **note** — `codex/reconcile-skills.md:17` still said grouped rows stay report-only. Fixed.
9. **blocker** — `git ls-files` without `--literal-pathspecs`. Fixed (exact path printed).
10. **note** — SPEC.md carve-out omitted the local commit and drifted from scope-boundaries' "never PLAN.md…". Fixed in both.

Blockers → Phase 2 fixes, Phase 3 re-run from the top (drift 0, suite 120/120, greps 0).

External review round 2 — 9 findings, 4 of them inside round 1's undo recipe (unmatched-pathspec restore, untracked Step-1 links lost, Codex `REMOVED` links not restored, index gitlink restored from HEAD instead of the Step 0 entry). **Blocker** for the design, not 4 patches: restructured so the Codex pass runs against `<target>` at the head of Step 3.5, before any follow-through write — `checkAdopter`'s order — so the undo shrinks to the pin plus that pass's own `CREATED`/`REMOVED` report and `git update-index --cacheinfo` with the entry gitlink. The other five: **blocker** dirty AGENTS.md/README swept into the bump commit → Step 3.5 skips a dirty file with a note; **blocker** non-Codex creation made body-less / ignored links the updater won't → Step 4 notes them instead; **note** `ls-files` without `-z` mis-quotes non-ASCII → `-z`, "prints anything"; **note** ENOTDIR missing from the dangling definition → added; **note** the prune ran on the bump confirm without a preview → Step 2 preview lists the links via `git cat-file -e <target>:<path>`.

Phase 3 re-run: drift 0, suite 120/120, greps 0.

External review round 3 — 7 findings. **Blockers:** (1) dirty-file skip could never be re-applied (a rerun is same-version, repair-only) → dirty README/AGENTS.md now stop the bump at Step 2 and route to the repair-only hand-off; (2) Codex-first made a tracked, non-exact retired link CONFLICT where the updater just prunes it → order is now prune → Codex pass → files → non-Codex links, and the undo restores pruned links with `git checkout --`; (3) the undo had no route to the Step 5 repair hand-off → added; (4) prune removals under `.agents/skills` were missing from the Codex net-path report → Step 5 stages them directly. **Notes:** (5) Step 5's ignored-path force-add ask → note and leave unstaged, as the updater does; (6) a trailing slash on `<FT>` broke `update-index` and the link targets → Step 0 rule; (7) the Codex wrapper's sequence left out the other surfaces → it now cites Step 3.5's full order.

Phase 3 re-run: drift 0, suite 120/120, greps 0.

External review round 4 — 6 findings: the undo restored pruned links and then deleted them as `CREATED`; unrelated staged or dirty tracked files were bumped over; a link the undo re-created was staged anyway; a stale roster-path link was cleared by the prune where the updater skips; Step-1 links for slugs the target dropped were kept; failures other than a Codex conflict left the bump half-applied. The loop wasn't converging, so I asked the operator (**operator decision, 2026-11-01: clean-tree gate**). Step 2 now copies the updater's preconditions before the ask: an empty index and clean tracked files (apart from `<FT>` and Step 1 paths), plus a read-only Codex roster check at `<target>` (redirected root, empty roster, missing body, non-exact roster destination), any miss routing to repair-only. Step 3.5's undo is now one universal recipe for any failure after the checkout, exact because the tree was clean. Item 4 also removes Step-1 links outside the target roster. Accepted residual, recorded for `.7`'s parity run: an *untracked* non-exact retired Codex link still CONFLICTs in reconcile-skills' retirement loop, where the updater keeps it.

Phase 3 re-run: drift 0, suite 120/120, greps 0.

External review round 5 — 8 findings. **Blockers:** (1) an untracked AGENTS.md / README could not be restored → the undo writes back saved copies; (2) staged links survived a failed commit → the undo now spans checkout through Step 4.6, and a rejected Step 5 commit leaves the staged bump for the operator (pre-existing `/ft-update` behaviour; accepted divergence — the updater rolls back on a hook reject); (3) a dirty `<FT>` worktree → added to the gate; (4) detached HEAD → added to the gate; (5) the undo left new directories and Step 4.5 pass copies behind → it now removes them. **Notes:** (6) no pinned-ahead guard → gate added; (7) EOF bytes for the Workflow replace → spelled out; (8) the prune preview vs sparse-excluded paths → preview caveat. Phase 3 re-run: drift 0, suite 120/120. Body at 30,138 / 33,000.

External review round 6 — 4 findings. **Blockers:** (1) the gate exempted a staged `<FT>` gitlink, which the undo then reset to HEAD → the gate now requires an empty index, `<FT>` included; (2) item 4 removed Step-1 links *after* the non-Codex rules ran, so a roster link kept as "custom" was then deleted and never re-created → remove first, then create. **Notes:** (3) the undo's `git restore` lacked `--literal-pathspecs` → added; (4) a retired-slug destination conflict was not caught before the ask → added to the Step 2 Codex check. Round 6's fixes are mechanical and were not re-reviewed.

Final receipt:
- `bash tools/drift-checks.sh` → exit 0 (context_budget ok)
- `node --test tools/update-adopters.test.mjs` → exit 0, 120/120
- `grep -q 'Pinned to:' claude/skills/ft-update/SKILL.md` → 0 · `grep -q '## Workflow' …` → 0 · `grep -qi 'tracked dangling' …` → 0
- `grep -q 'follow-through\|Step 3.5' codex/skills/ft-update/SKILL.md` → 0
- `grep -q 'Pinned to:' SPEC/scope-boundaries.md && grep -q 'AGENTS.md' SPEC.md` → 0
- Sweep judgment: `git grep dangling | grep -iE 'report|only'` hits re-read; none still claims non-Codex links are report-only after a bump
- Sizes: ft-update body 30,563 / 33,000 · `SPEC.md` 44,428 / 49,000 · `scope-boundaries.md` 5,915

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` updated (versioning line) · `AGENTS.md` no change · `SPEC.md` updated (carve-out) · `docs/MIGRATION.md` updated (§"Pinning and bumping", §"Retired skills") · `claude/AGENTS-snippet.md` updated (§"Bumping") · `codex/AGENTS-snippet.md` updated · `cursor/AGENTS-snippet.md` updated · `grok/AGENTS-snippet.md` updated · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change ("batches the `/ft-update` recipe" now holds more exactly) · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` updated (`:98`) · `docs/VISION.md` no change

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.6` line → `Completed 2026-11-01.` stub nested under CORE-EPIC-852, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A for the always-loaded layer. Process note: a prose skill that mirrors a transactional engine needs the engine's *preconditions* (clean tree, read-only conflict check) before it can have a simple undo. Patching the undo case by case did not converge (rounds 1–4).

**Final Summary:**

`/ft-update` now writes what the fleet updater writes on a bump: the `Pinned to:` line, the AGENTS.md `## Workflow` replace (exact bytes, the updater's skips), and the tracked dangling-link prune on every present surface. Bumps follow the updater's preconditions (**operator decision, 2026-11-01: clean-tree gate**). Step 2 refuses a bump on a dirty tree or index, a dirty `<FT>`, detached HEAD, a pinned-ahead checkout, or a read-only Codex roster/retired conflict at the target; each refusal falls back to the repair-only hand-off. After the checkout, Step 3.5 runs prune → Codex pass → files → links, and any failure through Step 4.6 runs one exact undo. The CLI carve-out in `SPEC.md` and `SPEC/scope-boundaries.md` now names the four adopter writes and the local commit. Six external-review rounds; every blocker fixed.

- **Changed files:** `claude/skills/ft-update/SKILL.md`, `codex/skills/ft-update/SKILL.md`, `codex/reconcile-skills.md`, `SPEC.md`, `SPEC/scope-boundaries.md`, `claude/` / `codex/` / `cursor/` / `grok/` `AGENTS-snippet.md`, `docs/MIGRATION.md`, `docs/WORKTREES.md`, `README.md`, `.flaitron/PLAN.md` (stub), this note (archived).
- **Verification:** receipt above — drift 0, suite 120/120, Acceptance greps 0.
- **Refactors:** none. The round-2 / round-4 restructures replaced this task's own new prose, not existing code.
- **Doc verdict:** 9 updated, 9 no change (sweep above).
- **`touches:` reconciliation:** declared 13 paths; diff = those 12 deliverables plus the workflow bookkeeping (PLAN, note). `codex/reconcile-skills.md` and `docs/WORKTREES.md` were added to `touches:` mid-task. Matches.
- **Maintainability:** the single-repo and batch paths now share one write set. The ft-update body sits at 30,563 / 33,000, so its next substantial edit should extract a lazy fragment (Step 3.5 + the prune are the natural candidate).
- **Residuals (accepted, for `.7`'s parity run):** an untracked non-exact retired Codex link CONFLICTs in reconcile-skills where the updater keeps it; a hook-rejected Step 5 commit leaves the staged bump rather than rolling back; fence-aware headings → **CORE-853**.

**Archived:** 2026-11-01
