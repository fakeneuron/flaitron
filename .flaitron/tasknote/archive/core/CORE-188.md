---
title: ft-release versioning-shift retire
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-168]
---

# CORE-188 | ft-release versioning-shift retire

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-168]]

## 🎯 Goal

Remove the `/ft-release` Step 5.2 patch/minor "example shift" recipe and its matching Acceptance bullet, since `SPEC/versioning.md` was permanently genericized to `v1.x` placeholders by CORE-168 and the shift step is now drift that would re-introduce literal version examples on the next release cut.

## ✅ Acceptance

- [ ] `claude/skills/ft-release/SKILL.md` no longer references `SPEC/versioning.md` as a release-time edit target (no edit instruction, no drift check, no staging entry).
- [ ] Step 1 intro recipe summary omits `SPEC/versioning.md example shifts ·`.
- [ ] Step 3 Acceptance template drops the `SPEC/versioning.md patch/minor examples shifted …` bullet.
- [ ] Step 4 Discovery "Read relevant source files" and "Drift check" make no mention of `SPEC/versioning.md`.
- [ ] Step 5 Phase 2 has two numbered edits (SPEC.md version + docs/MIGRATION.md pin); the SPEC/versioning.md item is removed and item 3 is renumbered to item 2.
- [ ] Step 7.4 `git add` command omits `SPEC/versioning.md`.
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (per-entry verdict logged).

## 🧩 Subtasks

- [ ] Edit `claude/skills/ft-release/SKILL.md` Step 5: remove item 2 (`SPEC/versioning.md` example shift block); renumber `docs/MIGRATION.md` item 3 → item 2.
- [ ] Edit `claude/skills/ft-release/SKILL.md` Step 3 Acceptance template: drop the `SPEC/versioning.md patch/minor examples shifted …` bullet.
- [ ] Edit `claude/skills/ft-release/SKILL.md` Step 1 intro: drop `SPEC/versioning.md example shifts ·` from the canonical-recipe one-liner.
- [ ] Edit `claude/skills/ft-release/SKILL.md` Step 4 Discovery: drop the `SPEC/versioning.md patch + minor lines (locate by content)` clause from "Read relevant source files"; drop the `SPEC/versioning.md patch line reads vX.Y.Z → vX.Y.(Z+1); minor line reads vX.Y.x → vX.(Y+1).0;` clause from "Drift check".
- [ ] Edit `claude/skills/ft-release/SKILL.md` Step 7.4 staging block: drop `SPEC/versioning.md` from the `git add` argument list.
- [ ] Run Phase 3 lint/type-check mental pass (markdown-prose edits only; no test surface).
- [ ] Run Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; flip PLAN.md line to stub form; archive tasknote.

## 🔗 Related

- [[CORE-168]] — predecessor: permanently genericized `SPEC/versioning.md` examples to `v1.x` placeholders, making the shift step in `/ft-release` drift.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed (with expanded scope — see Discovery Notes)
  **Rationale:** CORE-168 genericized `SPEC/versioning.md` to `v1.x` placeholders (confirmed via archive read). The `/ft-release` Step 5 item 2 "example shift" recipe is now drift that would re-introduce literal version examples on the next release cut, AND the Step 4 Drift check would itself fail because it asserts the file contains `vX.Y.Z → vX.Y.(Z+1)` patterns that no longer exist. Underlying goal (drop the drift-introducing recipe) is unchanged; the sweep is wider than the audit finding stated because the recipe has more references in the SKILL than just Step 5.2 + Acceptance.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **CORE-168 confirmed** (archive read): replaced patch/minor/major examples in `SPEC/versioning.md` with neutral `v1.x` placeholders (`v1.2.3/v1.2.4`, `v1.2.x/v1.3.0`, `v1.x.y/v2.0.0`). The file is now permanently genericized — no manual shift required on release cuts.
- **Archive skim — ft-release SKILL touches:** CORE-174 (Steps 7.4–7.5 alignment with SPEC banners), CORE-144 (drop stale doc-list parenthetical from §7.1), CORE-154.5 (cite-don't-restate sweep) all confirm the cite-don't-restate principle and the pattern of paring the SKILL down to canonical references. CORE-188 fits the same shape: kill drift-prone literal recipes. CORE-043/CORE-046/CORE-048 are the original release tasknotes that established the shift step — now obsoleted by CORE-168.
- **Audit-finding scope (narrow) vs. actual sweep (wider):** the audit-issued finding cited "Step 5.2 + matching Acceptance bullet." The SKILL references `SPEC/versioning.md` as a release-time edit target in **six** locations:
  1. Step 1 intro recipe summary (line 8) — lists "SPEC/versioning.md example shifts" as part of the canonical recipe.
  2. Step 3 Acceptance template (line 99) — bullet `SPEC/versioning.md patch/minor examples shifted off the just-cut release …`.
  3. Step 4 Discovery — "Read relevant source files" (line 117) — directs reading `SPEC/versioning.md` patch + minor lines.
  4. Step 4 Discovery — "Drift check" (line 119) — asserts patch line reads `vX.Y.Z → vX.Y.(Z+1)`, minor line reads `vX.Y.x → vX.(Y+1).0`. This drift-check assertion now FAILS against the genericized file.
  5. Step 5 Phase 2 — item 2 (line 131) — the actual shift recipe (the "Step 5.2" the audit flagged).
  6. Step 7.4 staging block (line 214) — `git add` includes `SPEC/versioning.md`.
- **Drift check (against task description):** PLAN.md says "Step 5.2"; SKILL.md numbering uses Step 5 with sub-items `1./2./3.`. The audit's "5.2" maps to Step 5 → item 2. Confirmed. No other line drift relative to CORE-174's recent edits.
- **Post-edit grep at line 137** (`grep -rn 'vX\.Y\.Z' SPEC.md SPEC/ docs/ README.md templates/ claude/`) — left untouched; verifies the edited doc set is free of literal-current-version refs. Out of scope for CORE-188 (separate latent question of self-match against SKILL placeholders).
- **Operator-gate judgment:** moderate scope deviation (restructured the subtask list — audit said 2 edits, sweep is 6 edits) → fire 🛠️ at Phase 1 exit gate per `default-skip` judgment rule.

**No clarifications needed** — the audit description is internally consistent; the expanded scope is mechanical follow-through from CORE-168's permanent genericization. Assumption: operator wants the SKILL to remain functional on the next release cut (i.e., the Drift check must not fail), so the Discovery + staging references go alongside the Step 5 + Acceptance edits.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Eight surgical edits to `claude/skills/ft-release/SKILL.md` (six from the approved 🛠️ scope + two corollary drift fixes uncovered during execution):

1. **Step 1 intro (line 8)** — dropped `SPEC/versioning.md example shifts ·` from the canonical-recipe one-liner.
2. **Step 3 Acceptance template (line 99)** — dropped the `SPEC/versioning.md patch/minor examples shifted off the just-cut release …` bullet.
3. **Step 4 Discovery — Read relevant source files (line 117)** — dropped the `SPEC/versioning.md patch + minor lines (locate by content)` clause.
4. **Step 4 Discovery — Drift check (line 119)** — dropped the `SPEC/versioning.md patch line reads vX.Y.Z → vX.Y.(Z+1); minor line reads vX.Y.x → vX.(Y+1).0;` assertion.
5. **Step 5 item 2 (line 131)** — dropped the entire `SPEC/versioning.md` example-shift recipe; renumbered `docs/MIGRATION.md` item 3 → item 2.
6. **Step 7.4 staging block (line 214)** — dropped `SPEC/versioning.md` from the `git add` argument list.
7. **Corollary — Step 5 closing line (line 140)** — `(typical: 3 files, +4/−4)` → `(typical: 2 files, +2/−2)`; downstream of the file-count reduction.
8. **Corollary — Step 6 Phase 3 line (line 144)** — `Run a markdown lint mental-pass on the 3 edited files` → `…the 2 edited files`; same file-count reduction.

**Pattern survey:** matches the CORE-144 / CORE-154.5 / CORE-174 cite-don't-restate cleanup shape — pure prose deletion of drift-prone literal recipe steps. No new shape introduced.

**Diff shape:** 1 file changed, +8 / −10 (net -2 lines).

**Verify post-edit:** `grep -n "SPEC/versioning\|3 files\|3 edited\|example shift" claude/skills/ft-release/SKILL.md` returns empty.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-prose edits only; no test surface. Lint mental pass:

- Edits are clean bullet/sentence removals plus one renumbering (item 3 → item 2 in Step 5).
- No frontmatter touched; no fenced blocks broken.
- No frontend surface → 👁️ visual-confirmation ask N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (per AI-referenced docs entry):**

- `README.md` — no change
- `SPEC.md` — no change (SPEC §"Versioning" still points at the canonical [`SPEC/versioning.md`](SPEC/versioning.md) module, which remains valid — just genericized per CORE-168)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change (adopter pointer to `SPEC/versioning.md` is still accurate)
- `docs/CONVENTIONS.md` — no change (cross-link at line 29 still valid)
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change

The edits land entirely in `claude/skills/ft-release/SKILL.md`, which is not in the AI-referenced doc set (it's a SKILL stub loaded on demand by `/ft-release`). No cross-doc drift.

**Final Summary:**

Removed the now-obsolete `SPEC/versioning.md` "example shift" recipe from `claude/skills/ft-release/SKILL.md` — CORE-168 permanently genericized `SPEC/versioning.md` to `v1.x` placeholders, so the shift step was both unnecessary (no examples to shift) and actively harmful (would re-introduce literal version strings on the next release cut, and its corresponding Drift check at Step 4 would fail against the genericized file). Scope expanded from the audit-flagged 2 edits (Step 5.2 + Acceptance bullet) to 8 edits sweeping every reference to `SPEC/versioning.md` as a release-time edit target plus two corollary file-count drift fixes. Next `/ft-release` invocation now applies exactly 2 doc edits (`SPEC.md:3` + `docs/MIGRATION.md` pin) instead of 3.

**Archived:** 2026-05-24
