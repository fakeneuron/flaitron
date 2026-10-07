---
title: epic-per-child-model
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-epic-discovery/SKILL.md
  - SPEC/model.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-726 | epic-per-child-model

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Make `/ft-epic-discovery` propose a `[model]` per implementation child at Phase 2 filing instead of copying the epic token onto every line, and document in `SPEC/model.md` that a concrete token (e.g. `[fable]`) is how to pin a named model, since category tags match by tier.

## ✅ Acceptance

- [x] Step 2 #4 names the collected token as the epic's default (parent / `.1` / `.N`, and each child proposal's starting point), not a token for every line — `! grep -q 'goes on every PLAN.md line this skill writes' claude/skills/ft-epic-discovery/SKILL.md`
- [x] Step 7 drafts a `[model]` per implementation child from its Discovery-settled shape (category tokens capped at `[heavy]`; concrete only when the epic token is concrete or the operator named one) — `grep -q 'Per-child \`\[model\]\`' claude/skills/ft-epic-discovery/SKILL.md`
- [x] Step 7's review prompt gains a divergence trigger — a child whose proposed token departs from the epic token — and uniform cohorts still file with no prompt — `grep -q 'departs from the epic token' claude/skills/ft-epic-discovery/SKILL.md`
- [x] Pattern-survey note reads "present", not "preserved" — `! grep -q 'preserved on every line' claude/skills/ft-epic-discovery/SKILL.md`
- [x] `SPEC/model.md` practical guidance documents the concrete token as the way to pin a named model — `grep -q 'Pinning a named model' SPEC/model.md`
- [x] `ft-epic-discovery` body stays under the 33,000 `claude/skills/*/SKILL.md` cap — `test $(wc -c < claude/skills/ft-epic-discovery/SKILL.md) -lt 33000`
- [x] Codex wrapper needs no edit (pure pointer to the Claude body) — `judgment`: the wrapper holds no model prose

## 🧩 Subtasks

- [x] Reword Step 2 #4 (epic default, not every line)
- [x] Add the per-child `[model]` paragraph to Step 7 and the divergence trigger to its review prompt; record departures in Implementation Notes
- [x] Reword the pattern-survey note ("present on every line")
- [x] Add the "Pinning a named model" paragraph to `SPEC/model.md` §"Practical guidance and agent-aware defaults"
- [x] Check the byte budget; refresh `docs/CONTEXT-BUDGET.md` figures only if a cited figure goes stale

## 🔗 Related

- Adopter precedent: sciphoenix SCI-128 `research/extraction/ROLLOUT.md` §3 "Model per child".
- [[CORE-415.1]], [[CORE-416.1]], [[CORE-438.1]], [[CORE-483.1]] — prior epics whose Discovery already diverged child tags by shape (practice ahead of the skill prose).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The skill prose still says the Step 2 token "goes on every PLAN.md line this skill writes" (SKILL.md:61) and "preserved on every line" (:200). Past Discoveries (CORE-415.1, 416.1, 438.1, 483.1) already diverged child tags by hand, so practice is ahead of the contract. `SPEC/model.md` never says that a concrete token is the only way to pin a named model.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Sources read:** `claude/skills/ft-epic-discovery/SKILL.md` (Step 2 #4, Step 4 lines, Steps 7–8), `codex/skills/ft-epic-discovery/SKILL.md` (8-line pointer to the Claude body, so no edit), `SPEC/model.md` (whole file), `SPEC/epic.md` (model is mentioned only as "same model gate").
- **Best practices:** N/A for code. This is skill/SPEC prose. Keep the contract in `SPEC/model.md` and keep the skill's procedural line short; the 33,000 cap leaves ~2.2k headroom (body 30,765).
- **Archive skim (core, 70 hits on the skill path, narrowed by grep to per-child model mentions):** CORE-415.1 and 416.1 each diverged child tags, operator-approved at the 🛠️ gate. CORE-438.1 tagged "by actual shape rather than inheriting the parent". CORE-483.1 recorded "Model tags diverge per child from the epic-level `[medium]` per the Step 2 resolution". So the per-child proposal codifies existing practice and adds no new behavior. No prior decision argues for uniform tags.
- **Drift check:** The cited lines match current code (SKILL.md:61, :200). The PLAN line matches the stub. The stub's `touches:` listed the codex wrapper, but that file is a pointer, so it was dropped from `touches:`. The PLAN line's "Parked at `.flaitron/sidequest/`" pointer goes stale with the stub's retirement and is replaced at closure by the stub-form flip.
- **Clarifications (AskUserQuestion):** (1) The review prompt shows the per-child proposal **only when a child departs from the epic token**, so uniform cohorts file with no prompt. (2) Proposals use **category tokens capped at `[heavy]`**. A concrete token is filed only when the epic token is already concrete or the operator named a model (in Step 2 or Discovery). `SPEC/model.md` documents the concrete token as the pin.

Carried from the retired sidequest stub:

> **Idea**
>
> `/ft-epic-discovery` collects one `[model]` at Step 2 #4 and writes it on every line — parent, `.1`, `.N`, and (per the Phase 2 pattern-survey note, "`[<model>]` tag preserved on every line") each `.2..(M+1)` child. Children differ in cognitive load, but the skill never asks per child, so every epic files uniform. Worse, a uniform category tag cannot route work to a specific top model: `[heavy]` is matched by tier (`SPEC/model.md` §"Category-vs-concrete matching"), so an Opus session silently satisfies a child that needs Fable.
>
> Fix: at the Phase 2 child-filing step, propose a `[model]` per child (default = the epic's token; raise or lower per child from its Discovery-settled shape), shown in the existing review prompt alongside `[unattended]` candidacy; reword the "tag preserved on every line" note to "tag present on every line". Add a `SPEC/model.md` practical-guidance line: when a child must run on one named model, file the concrete token (e.g. `[fable]`) — the exact-identity gate enforces it; a category tag only advises.
>
> Origin: sciphoenix SCI-128 (2026-10-07) hand-patched this as a project-local per-archetype table in `research/extraction/ROLLOUT.md` §3 "Model per child" — `[fable]` for T1/T2 source mining, chart + synthesis and B1 inventories; `[heavy]` for `.1`/`.N`. That table is the adopter precedent.
>
> **Resume anchor**
>
> Not started. Filed from a sciphoenix session; nothing in flight here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** extends the existing Step 7 review prompt by adding one trigger beside the scan and `[unattended]` candidacy, which is how candidacy was added. No new prompt, cue, or box. The contract text sits in `SPEC/model.md` §"Practical guidance" next to the existing "precision escape hatch" paragraph.
- **Minimal refactor gate:** no refactor. Two words were disambiguated in the touched paragraph ("keeps an `[unattended]` token"), because the new `[model]` sentence made the bare "token" ambiguous.
- **Edits:** SKILL.md Step 2 #4 (the epic's token goes on parent / `.1` / `.N` and seeds each child proposal); new **Per-child `[model]`** paragraph in Step 7; review-prompt divergence trigger; Implementation Notes capture line; "preserved" → "present". `SPEC/model.md` gains the **Pinning a named model** paragraph.
- **Tests:** N/A, prose-only contract surface with no executable code.
- **Budget:** `ft-epic-discovery` body 30,765 → 32,081 bytes after three review rounds (cap 33,000). The lazy-module ledger figures are release-refreshed (§"Ledger"; the `model.md` row already read 14,765 against a 13,038-byte pre-change file) and were left for `/ft-release`. The `claude/skills/*/SKILL.md` cap rationale (line 49) and its history row (line 98) cite this body by name, so both were refreshed to 32,081. That leaves ~1k of headroom, and the next substantial edit extracts a fragment.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests: N/A (markdown only). Lint: N/A. A trailing-whitespace grep on the diff was clean, and CI's context-budget step was run locally → exit 0.
- **Verification receipt:**
  - `! grep -q 'goes on every PLAN.md line this skill writes' claude/skills/ft-epic-discovery/SKILL.md` → 0
  - `grep -q 'Per-child \`\[model\]\`' claude/skills/ft-epic-discovery/SKILL.md` → 0
  - `grep -q 'departs from the epic token' claude/skills/ft-epic-discovery/SKILL.md` → 0
  - `! grep -q 'preserved on every line' claude/skills/ft-epic-discovery/SKILL.md` → 0
  - `grep -q 'Pinning a named model' SPEC/model.md` → 0
  - `test $(wc -c < claude/skills/ft-epic-discovery/SKILL.md) -lt 33000` → 0 (31,562; re-run after review rounds 1–3 → 0 at 32,081)
  - Codex wrapper: judgment. It is an 8-line pointer to the Claude body with no model prose, so no edit.
  - CI context-budget step (local) → 0
  - Structural: no duplication (the contract is in `model.md`; the skill carries the procedural line plus a one-clause why); no dead text; the stale "preserved on every line" wording was removed.
- Frontend 👁️: N/A (no UI).
- **External review, round 1** (`/code-review medium`, working-tree diff), 10 findings:
  - **Blockers** (Step 7 per-child drafting criterion), fixed in Phase 2 and Phase 3 re-run:
    - (1) An operator `[model]` edit did not re-run candidacy, so a `[heavy] [unattended]` row could land. It now re-runs §"Candidacy predicate" on that row.
    - (2) The cited heuristic files "epic children" under `[heavy]`, which pushes every child up. Now marked as a filing-time default, not a per-child verdict.
    - (5) "add the token" was ambiguous between `[model]` and `[unattended]`. It now names `[unattended]`.
    - (6) The per-child paragraph followed the write bullet. The write bullet now says each line is drafted with its per-child token before the write.
  - **Notes**, all fixed:
    - (3) An `[xheavy]` epic clashed with the `[heavy]` cap. It now seeds `[heavy]`.
    - (4)+(9) The skill-specific sentence in `SPEC/model.md` disagreed with the skill. Removed; the skill cites §"Pinning a named model" instead.
    - (7) "blocks every other session" overstated the gate. Now worded as the switch-or-retag block.
    - (8) The `docs/CONTEXT-BUDGET.md` figure was stale. Line 49 rationale and line 98 history were refreshed to 31,937, now ~1k headroom, with the next substantial edit to extract a fragment.
  - (10) The PLAN line's stale sidequest pointer needs no change; it is replaced by the stub-form flip at closure.
- **External review, round 2** (re-run after Phase 2), 9 findings:
  - **Blockers**, fixed:
    - (1) An operator retag re-ran candidacy on only that row, so clause-6 dependents kept `[unattended]`.
    - (2) A newly admitted row could gain `[unattended]` without assent.
    - Both fixed: the re-run now covers the whole cohort and re-asks for any row whose result changed.
  - **Notes**, all fixed:
    - (3) The SPEC `[heavy]` bullet said "epic children". Now "design-bearing epic children" at the root, and the skill's workaround clause was dropped.
    - (4) The rule for a concrete epic token was undefined. A concrete seed now lowers to the matching category.
    - (5) An `[xheavy]` epic made every child a "departure". Departure is now measured against the seed.
    - (6) Step 8 now checks the child-token constraints.
    - (8) This budget note was stale. Corrected above.
    - (9) The pin paragraph didn't say that a concrete token fails candidacy clause 1. Now it does.
  - (7) The PLAN pointer needs no change (closure flip).
- **External review, round 3** (re-run after the round-2 blockers), 8 findings, **no blockers**:
  - Notes, fixed:
    - (1) A concrete epic seed contradicted the concrete-token allowance. A concrete seed now stays as-is unless lowered.
    - (2) The capture line used a different departure baseline. It now says "departs from its seed".
    - (3) A retag could leave the old glyph. A retag now replaces the token and any glyph.
    - (5) "any heavy-tier session" now reads "at or above heavy tier".
  - Notes, no change:
    - (4) The prompt never fires to pin a child that matches its seed. That is the divergence-only trigger the operator chose at Discovery Q1; a pin enters through Step 2 or Discovery, and the Step 7 rule then allows the concrete token.
    - (6) An `[xheavy]` epic token on `.1`/`.N` is existing Step 2/4 behavior from an operator pick, not an automated choice, so it is out of scope.
    - (7) The PLAN pointer is replaced by the closure flip.
    - (8) The `model.md` ledger row is release-refreshed by design (see the Budget note).
  - No blocker, so Phase 3 does not re-run.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

- **Doc-drift sweep** (README §"AI-referenced docs"): no change needed in README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four agent snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, or VISION. None of them describes epic-discovery's model filing or category/concrete pinning (grep-checked).
- **Changed:**
  - `claude/skills/ft-epic-discovery/SKILL.md`: Step 2 #4 makes the token the epic's own; Step 7 adds per-child `[model]` drafting (seeded from the epic, category tokens capped at `[heavy]`, concrete only when seeded or operator-named), a divergence trigger on the review prompt with a cohort-wide candidacy re-run on retag, the departure capture line, and the explicit `[unattended]` wording; Step 8 checks the child tokens; "preserved" → "present".
  - `SPEC/model.md`: new §"Pinning a named model" paragraph; the `[heavy]` bullet now says "design-bearing epic children".
  - `docs/CONTEXT-BUDGET.md`: the SKILL.md cap rationale and history now read 32,081.
  - The sidequest stub was retired.
- **Verification:** 6/6 Acceptance commands → 0, plus the codex-wrapper judgment. The CI budget step run locally → 0, and the trailing-whitespace grep was clean. Three `/code-review medium` rounds: rounds 1 and 2 had blockers that were fixed with Phase 3 re-run; round 3 had notes only.
- **Refactors:** none.
- **`touches:` reconciliation:** declared {SKILL.md, SPEC/model.md}. The diff adds `docs/CONTEXT-BUDGET.md` (a figure refresh after the review), the sidequest stub deletion, and the workflow files (PLAN, tasknote).
- **Maintainability:** the skill now states practice four prior epics already followed. The pinning rule lives once in `SPEC/model.md`, and the skill cites it. `ft-epic-discovery` has ~0.9k headroom under its cap, so the next substantial edit should extract a lazy fragment.
- **Learnings:** N/A. Nothing new for the always-loaded layer.

**Archived:** 2026-10-07
