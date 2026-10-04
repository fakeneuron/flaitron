---
title: model-edge-fragment-strategy
status: completed
tags: []
created: 2026-08-03
due:
related-tasks: [CORE-042.9, CORE-050]
---

# CORE-400 | model-edge-fragment-strategy

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-042.9]] [[CORE-050]]

## 🎯 Goal

Unify the `step-1.5-model-edge.md` sharing strategy across the three model-gate skills (`/ft-task`, `/ft-micro-task`, `/ft-goal-task`) so the fragment has one consistent ownership model instead of a fork-plus-cross-reference mix.

## ✅ Acceptance

- [x] All three model-gate skills resolve their Step 1.5 edge-case fragment through one consistent strategy (no fork-plus-cross-reference mix) — all three resolve `<MODEL_EDGE>` → the single shared fragment
- [x] Every fragment path named in a SKILL.md is `<root>`-prefixed so it resolves in adopter layout (`.flowtron/core/`), not just flowtron self-host — verified by grep; `ft-goal-task` lines 47 + 55 fixed
- [x] The fragment's operator-facing re-invoke instructions name the *invoking* skill, never a hard-coded `/ft-task`, for all three consumers — `<SKILL>` placeholder + per-skill substitution instruction at each call site
- [x] If any duplication remains by design, the sync obligation is stated in-file — `N/A` in the intended sense: zero duplication remains, so there is no sync obligation to state. The fragment instead states its shared-ness and the substitution rule.
- [x] `grep -rn "step-1.5-model-edge"` shows no stale path pointing at a deleted or wrong-skill fragment — 6 live refs, all resolving to the one surviving file

## 🧩 Subtasks

- [ ] Decide the strategy (shared fragment vs consistent fork) — clarifying question
- [ ] Apply the chosen strategy to the fragment file(s)
- [ ] Update `ft-micro-task/SKILL.md` Step 0 + Step 1.5 fragment paths
- [ ] Update `ft-goal-task/SKILL.md` Step 1.5 fragment path (`<root>`-prefix)
- [ ] Update `ft-task/SKILL.md` Step 0 fragment inventory if the file set changed
- [ ] Verify: grep sweep for stale paths + cold re-read of each Step 1.5

## 🔗 Related

- [[CORE-042.9]] — created the lazy-fragment shape and the original `ft-task` copy
- [[CORE-050]] — created the `ft-micro-task` fork; its rationale is the skill-name substitution this task revisits

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The condition the audit described is live and verified — `ft-micro-task` carries a 26-line fork whose only deltas are skill-name substitutions, while `ft-goal-task` cross-references `ft-task`'s copy. Discovery additionally surfaced two latent defects in the cross-reference path (below), which raise this from cosmetic consistency to a correctness fix.

- [x] Read relevant source files — `claude/skills/ft-task/step-1.5-model-edge.md` (26 lines), `claude/skills/ft-micro-task/step-1.5-model-edge.md` (26 lines), and the Step 0 / Step 1.5 sections of all three consuming SKILL.md files.

- [x] **Best Practices Review** — Touched responsibility is a single one: "how to surface a model-gate edge case to the operator." Three consumers need identical behavior modulo one variable (the invoking skill's slash command). Flowtron's own rule — *"Promote a helper into flowtron only when ≥2 projects need the same shape"* (SPEC §"PR / suggestion archetypes flowtron does not accept") — is satisfied at 3 consumers. No new abstraction layer is being invented; the question is only which existing file the three point at. No in-scope refactor beyond the fragment + its three call sites; unrelated cleanup deferred.

- [x] **Archive skim** — 36 archived tasknotes mention `step-1.5-model-edge`; two are load-bearing:
  - [[CORE-042.9]] established the fragment shape (`H1 + 1-line back-ref note + verbatim moved content`) and the parallel-Read stub at branch entry. Any edit must preserve that shape.
  - [[CORE-050]] created the `ft-micro-task` fork. **Its recorded rationale is decisive**: *"The fragment content for `/micro-task` differs slightly from `/task` (different post-edit re-invocation suggestion, e.g. `/micro-task` not `/task`) — copy `task/`'s shape and adapt the skill-name-specific lines."* The fork existed **solely** to parameterize the skill name — not because the branch logic diverges. A fragment that is skill-agnostic by construction removes the fork's entire reason to exist.

- [x] **Drift check** — see Drift sub-section below. Task description verified accurate; two additional defects found.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 2 questions resolved via AskUserQuestion: (1) **Strategy = A** (one shared, skill-agnostic fragment kept at `claude/skills/ft-task/`; `ft-micro-task`'s fork deleted); (2) **Fix the adjacent line-47 unprefixed path too** in the same commit rather than deferring it to a follow-up.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Verified current state

`diff -u` of the two fragments returns exactly **3 changed lines**, all pure skill-name substitution:

| Line | `ft-task` copy | `ft-micro-task` fork |
|---|---|---|
| 3 (back-ref) | ``Loaded by `task` SKILL.md`` / `claude/skills/ft-task/SKILL.md` | ``Loaded by `micro-task` SKILL.md`` / `claude/skills/ft-micro-task/SKILL.md` |
| 11 (Mismatch path 1) | ``re-invoke `/ft-task <TASK-ID>` `` | ``re-invoke `/ft-micro-task <TASK-ID>` `` |
| 26 (Legacy entry) | ``The next time `/ft-task` runs`` | ``The next time `/ft-micro-task` runs`` |

The Category-under-tier section (lines 16–22) is byte-identical — it names no skill.

Reference surface is contained: only the three SKILL.md files reference the fragment. `docs/MIGRATION.md`, `README.md`, `AGENTS.md`, `claude/AGENTS-snippet.md`, and `SPEC/procedures/ft-task.md` never name it, so no doc-inventory fan-out is required.

### B. Drift found — two latent defects in the cross-reference path

Both live in `claude/skills/ft-goal-task/SKILL.md` and are *caused by* the inconsistency this task was filed to fix:

1. **Unprefixed fragment path (adopter-breaking).** Line 55 reads ``read `SPEC/model.md` + `claude/skills/ft-task/step-1.5-model-edge.md` ``. Line 32/33 of the same file correctly define `SPEC_DIR` as `<root>SPEC/` and `SKILL_DIR` as `<root>claude/skills/ft-goal-task/`, where `<root>` = `.flowtron/core/` in an adopter. The Step 1.5 paths are **not** `<root>`-prefixed, so in an adopter project they resolve against repo-root — where no `claude/` or `SPEC/` directory exists. `/ft-task` and `/ft-micro-task` both use the `<SPEC_DIR>` / `<SKILL_DIR>` placeholder form correctly; only `ft-goal-task` hard-codes.

2. **Wrong skill name surfaced to the operator.** Because `ft-goal-task` reads `ft-task`'s copy verbatim, a goal-loop task hitting the concrete-mismatch branch tells the operator to *"re-invoke `/ft-task <TASK-ID>`"* — the wrong skill, which would drop the loop shape (`loop:` / `loop-max:` frontmatter, `## 🔁 Iterations` log) on re-entry. This is exactly the failure [[CORE-050]] forked to avoid, reintroduced by the other half of the inconsistency.

A third, adjacent instance of defect 1 sits on line 47 (``See `claude/skills/ft-task/SKILL.md` Step 0``, also unprefixed) — same defect class, but it is a `--fast` cross-reference, not a model-gate one. Flagged as a clarifying question rather than swept in silently.

### C. Cross-artifact half of the drift check

- `SPEC.md` §"Task-line format" / §"Model field" → `SPEC/model.md`: the fragment is *executable steps*, the SPEC module is the *contract*. Nothing in SPEC names the fragment path, so SPEC needs no edit under any branch.
- `SPEC/procedures/ft-task.md` (`source: claude/skills/ft-task/SKILL.md`, `last-verified: v5.14.1 · 2026-08-02`): its §2 "Resolve the area and check the model" routes contract-only agents to `SPEC/model.md` directly and never names the SKILL fragment. Re-read and verified still accurate — no SOP content change under any branch. Per `SPEC/procedures/README.md`, `last-verified:` is a SOP↔source *sync-event* stamp that `/ft-release` flags but never bumps; see Phase 4 doc-drift sweep for the bump judgment.
- PLAN.md line vs this tasknote: no divergence — the filed either/or is preserved as the clarifying question below.

### D. Options under consideration

| | Strategy | Files | Sync obligation |
|---|---|---|---|
| **A** | One shared, skill-agnostic fragment; `ft-micro-task`'s fork deleted; all three point at it | 1 | none |
| **B** | Same as A but relocated to a neutral `claude/skills/_shared/` home | 1 (+ new dir convention) | none |
| **C** | Fork consistently — `ft-goal-task` gets its own copy; sync note added to each | 3 | 9 lines, manual |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the `<VAR>` path-placeholder idiom already established in every skill's Step 0 "Paths this skill uses" block (`<root>`, `<SPEC_DIR>`, `<SKILL_DIR>`) was extended rather than replaced: the new `MODEL_EDGE` entry is declared the same way and referenced the same way at the branch sites. No new shape invented. Composition over duplication: the fragment is composed in by path from two skills instead of copied into them.

- [x] **Minimal refactor gate** — refactor was Acceptance-required (de-duplication *is* the deliverable). Scope held to the fragment + its call sites. The one deliberate widening is `ft-goal-task` line 47's `<root>` prefix, explicitly operator-approved; the same file's line 184 carries the same unprefixed shape but is a prose cross-reference bibliography, not a runtime load instruction — left alone as out-of-scope.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: flowtron ships no test harness for skill markdown (SPEC §"What flowtron does NOT provide" rejects schema validators). Verification is the grep sweep + structural invariant below.

**Implementation Notes:**

Five files, +15 / −37 lines net:

1. **`claude/skills/ft-task/step-1.5-model-edge.md`** (+8/−3) — back-ref note rewritten to declare shared ownership across all three skills and to define the `<SKILL>` placeholder, including *why* substituting matters (a `/ft-goal-task` re-entry routed through `/ft-task` silently drops `loop:` / `loop-max:` frontmatter and the `## 🔁 Iterations` log). Three hard-coded `/ft-task` occurrences in the Mismatch + Legacy-entry branches → `<SKILL>`. Branch H2 headings unchanged, so all existing "follow the '<branch>' branch" dispatch strings still resolve. CORE-042.9's `H1 + back-ref note + verbatim content` shape preserved.
2. **`claude/skills/ft-micro-task/step-1.5-model-edge.md`** — deleted (`git rm`), 26 lines.
3. **`claude/skills/ft-micro-task/SKILL.md`** (+5/−4) — `SKILL_DIR` demoted to "no private fragments"; new `MODEL_EDGE` path entry; Step 0 summary + all three Step 1.5 branch bullets now read `<MODEL_EDGE>`, with the `/ft-micro-task` substitution instruction stated once.
4. **`claude/skills/ft-goal-task/SKILL.md`** (+3/−2) — new `MODEL_EDGE` entry; line 47 and line 55 `<root>`-prefixed; Step 1.5 gains the `/ft-goal-task` substitution instruction and the loop-shape rationale.
5. **`claude/skills/ft-task/SKILL.md`** (+1/−1) — `SKILL_DIR` inventory annotates the fragment as shared, so a future editor sees the two extra consumers before editing it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — see Testing Notes; suite is unrelated to this diff but was run and baselined.

- [x] Ran lint/type-check on changed code — `N/A`: markdown-only diff, no linter configured for `claude/skills/**`.

- [x] **Quality assertions** — no avoidable duplication (26 duplicated lines eliminated; zero remain), no dead code (the deleted fork had no other referent), no unexplained complexity (one new path variable, declared in the same block as its siblings), no public-surface growth (the skill roster, symlink set, and adopter install surface are all unchanged — only a file *inside* an already-symlinked dir moved), no stale code-facing docs (grep sweep below).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched.

**Testing Notes:**

**Structural verification (the meaningful check for this diff):**

| Check | Result |
|---|---|
| `grep -rn "step-1.5-model-edge"` (non-archive) | 6 refs, all resolving to the one surviving file; zero stale |
| Surviving `<SKILL_DIR>/step-1.5` refs in micro/goal | none (correct) |
| Unprefixed `claude/skills/` load paths in the 3 skills | none (correct); sole remaining hit is `ft-goal-task:184`, a prose bibliography |
| Fragment files on disk | exactly 1 (`ft-task/`) |
| SPEC §"Skill namespace" wrapper-invoke-name invariant | clean (no violations) |

**Pre-existing suite failure (not caused by this task).** `node --test tools/update-adopters.test.mjs` reports **6 failures** (`checkAdopter classification (fixtures)` ×4, `dry-run CLI` ×1, `sandboxed --apply` ×1). Verified pre-existing by running the same suite against a detached `HEAD` worktree: **byte-identical 6 failures**. This diff is markdown-only and touches nothing the suite exercises. Flagged for a follow-up ticket — `tools/update-adopters.test.mjs` is a registered release gate per SPEC §"Working in the flowtron repo itself", so it should not be red going into a release.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries: **no change**. `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md` — zero mentions of `step-1.5-model-edge`. `docs/PLATFORMS.md` and `claude/CAPABILITIES.md` matched the fragment-shaped grep but both hits name `step-4-debug-mode.md` / `park-mode.md`, different fragments. No doc enumerates the model-edge fragment, and the README's own note scopes `claude/skills/*/SKILL.md` + lazy fragments out of the cold-start sweep set. Adopter symlink counts in `docs/MIGRATION.md` §1.2 / `ft-new-project` Step 7-8 are per **skill directory** and unchanged — no directory was added or removed.

  **`SPEC/procedures/ft-task.md` judgment (out-of-sweep but source-adjacent).** Its `source:` is `claude/skills/ft-task/SKILL.md`, which this diff touches. Re-read its §2 "Resolve the area and check the model": it routes contract-only agents to `SPEC/model.md` and never names the SKILL fragment, so it remains accurate — no content edit. `last-verified:` deliberately **not** bumped: per `SPEC/procedures/README.md` the stamp records a SOP↔source *sync event*, and `/ft-release` Step 5 is flag-don't-bump and advisory. Bumping it here would suppress a release-time flag without a real re-verification pass having occurred.

- [x] Closed — every Acceptance criterion ticked or annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, tasknote archived.

- [x] **Evidence-based recap** drafted — below.

**Final Summary:**

Collapsed the `step-1.5-model-edge.md` fragment from a fork-plus-cross-reference mix into one shared, skill-agnostic file that all three model-gate skills (`/ft-task`, `/ft-micro-task`, `/ft-goal-task`) load through a `<MODEL_EDGE>` path variable. Along the way this fixed two live defects that the inconsistency was hiding: `/ft-goal-task` was loading the fragment via repo-root-relative paths that would not resolve in any adopter project, and — because it borrowed `/ft-task`'s copy verbatim — it told operators to re-invoke `/ft-task`, which would drop a goal loop's `loop:` frontmatter and `## 🔁 Iterations` log on re-entry.

- **Changed:** 5 files, +15/−37 (net −22). One file deleted (`ft-micro-task/step-1.5-model-edge.md`, 26 lines).
- **Verified:** 5-point grep/structural sweep (table above), all clean; SPEC wrapper-invoke-name invariant clean. Pre-existing 6-failure `update-adopters` suite baselined against a detached-HEAD worktree and confirmed unrelated.
- **Refactor:** de-duplication was the deliverable, so the Minimal Refactor Gate is satisfied by definition. One operator-approved widening (`ft-goal-task:47`). One same-class instance deliberately left (`ft-goal-task:184` — prose bibliography, not a load path).
- **Documentation:** all 12 AI-referenced docs "no change"; `SPEC/procedures/ft-task.md` re-read, still accurate, stamp deliberately not bumped.
- **Maintainability:** the 9-line skill-name sync surface across duplicated fragments is gone — [[CORE-050]] forked *solely* to substitute the skill name, and a `<SKILL>` placeholder removes that reason entirely. Adding a fourth model-gate skill is now a one-line `MODEL_EDGE` declaration instead of a fourth 26-line copy. Editing the model-gate branch logic is now one file, not three.

**Archived:** 2026-08-03
