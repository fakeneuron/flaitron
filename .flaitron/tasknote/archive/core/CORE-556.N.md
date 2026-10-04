---
title: release-skill-headroom audit
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-EPIC-556, CORE-556.2]
---

# CORE-556.N | release-skill-headroom audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-556]]

## 🎯 Goal

Verify the completed CORE-EPIC-556 (`release-skill-headroom`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-556.N — audit CORE-EPIC-556` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-556.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-556.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-556` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-556.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-556]] — parent epic (release-skill-headroom)
- [[CORE-556.2]] — ft-release-fragment-split (sole implementation child)
- [[CORE-507]] — related-decision: the extraction pattern this child extended (verbatim slice + dispatch; Step 5 was the deferred next-largest section)
- [[CORE-555]] — related-decision: one working unit = +2,567 chars; two units ≈ 5,134

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The sole implementation child (`.2`) is `[x]` and archived, the parent `CORE-EPIC-556` is still active under `## Future Opportunities`, and `.N` is the reserved terminal audit child. No early-audit gate fired (zero open siblings). Discovery was supplied by audit-repo at filing — there is no `.1` tasknote, which `.2` already recorded. Closed 2026-09-09, same day as `.2`.

- [x] Read relevant source files — archived [[CORE-556.2]] in full, then each claimed deliverable against HEAD: `claude/skills/ft-release/SKILL.md` (Step 5 heading + dispatch + closer), `claude/skills/ft-release/step-5-dogfood-sop.md` (fragment header + repaired "version-pin grep in Step 5"), sibling fragments `step-7.1-standing-checks.md` / `step-7.1-mirror-pairs.md` / `step-7.2-tag-message.md` (dispatch idiom + "in Step 5" pointers), `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Ledger" (cap unchanged; ledger refresh deferred). Narrow known set; no probe.

- [x] **Best Practices Review** — N/A as a code-design review: the audit's deliverable is verification, not a new code surface. No inline fix landed.

- [x] **Archive skim** — self-referential by construction (the cohort child is the archive entry under review). Beyond the cohort, `.2`'s own skim plus a targeted grep of `archive/core/` for `claude/skills/ft-release` pointed at [[CORE-507]] (the pattern `.2` extends: scripted slice, two-way line diff, heading stays, Step 5 left under the then-cap), [[CORE-042.9]] / [[CORE-400]] (H1 + 1-line back-ref + verbatim moved content), [[CORE-555]] (working unit +2,567), [[CORE-397]] (SOP-currency lives in Step 5 beside the stamps). No ⚠️ `Superseded by` pointer on the cohort. No `.1` Discovery note; parent PLAN line says "Discovery supplied by audit-repo 2026-09-09".

- [x] **Drift check** — every cohort deliverable still matches HEAD (verified by `wc -c` and grep, not recall): `SKILL.md` **30,619** bytes (headroom **9,381** against the 40,000 cap); `step-5-dogfood-sop.md` **9,545**; Step 5 heading stays in `SKILL.md` with a one-file `Read … now` dispatch of the fragment; fragment repair "the version-pin grep in Step 5" is live; closer cites `step-5-dogfood-sop.md` not "the walk above"; `step-7.1-standing-checks.md` "SOP-currency check/block in Step 5" and "3 version edits in Step 5" still hold because the heading and the version edits stayed. Re-read PLAN lines at `.flowtron/PLAN.md:26-28`; they match as filed. No SPEC contradiction: `.N` is the reserved audit suffix, the child stayed nested, no `.1` is the audit-repo-supplied-Discovery shape `.2` already documented. Zero live `ft-release/SKILL.md:<line>` citations outside the write-once archive.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions: (a) audit scope is the full one-child cohort, none deferred; (b) items `.2` already deferred (do not extract §7.2, do not re-evaluate Step 2.5, do not refresh `docs/CONTEXT-BUDGET.md` ledger — that is the next `/ft-release` §7.1's job) stay deferred unless HEAD shows they became in-scope; (c) no `.1` is not a miss — PLAN says "Discovery supplied by audit-repo".

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (one line per child, deliverable verified against HEAD):

| Child | Deliverable | Verified at HEAD |
|---|---|---|
| [[CORE-556.2]] `ft-release-fragment-split` | Extracted Step 5 dogfood + SOP-currency walk into `step-5-dogfood-sop.md`; `SKILL.md` 39,315 → 30,619 (headroom 9,381 ≥ two working units / 5,134) | `wc -c` 30,619 / 9,545; dispatch at `SKILL.md:174`; fragment header matches CORE-042.9 / §7.2 idiom |

**Recorded so the next audit does not re-raise them:**

- **A. No `.1` Discovery tasknote.** Filing used audit-repo Discovery; PLAN parent line says so; `.2` omitted `blocked-by` / `parallel-safe-with` for that reason. Not a miss.
- **B. `docs/CONTEXT-BUDGET.md` ledger still reads `ft-release 39,315` / whole-directory `92,839`.** `.2` Acceptance forbade editing that doc; §7.1's standing check refreshes the ledger at the next `/ft-release`. Measured at audit: body 30,619, directory 98,411. Stale-by-design, not a cohort miss.
- **C. Step 2.5 still narrates CORE-507's ~77k → ~38k cut.** `.2` explicitly deferred re-evaluating the hatch (whole-cut budget is a superset of eager load). Historical sentence about CORE-507 remains accurate; the dogfood walk still arrives in the session, now via the fragment. Not in-scope.
- **D. §7.2 stays inline (2,617 bytes).** Out of `.2`'s PLAN-named extract; parent goal (not one edit from the 40,000 gate) is already met at 9,381 of headroom.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification body of the audit (no new code surface; no inline fix).

- [x] **Minimal refactor gate** — no refactor. No code or archived-record correction landed.

- [x] Implemented the minimal solution — verification pass over the cohort coherence checklist; findings recorded below. Nothing in scope to patch inline.

- [x] Updated/added tests for non-trivial behavior — N/A: no code changed.

**Implementation Notes:**

### Cohort children inventoried

- [[CORE-556.2]] — extracted the Step 5 dogfood-or-explicit-skip walk and standing SOP-currency check from `claude/skills/ft-release/SKILL.md` into sibling `step-5-dogfood-sop.md` (CORE-042.9 / CORE-507 shape: H1 + 1-line back-ref + verbatim slice; one-file `Read … now` dispatch matching §7.2). Two relative-reference repairs the move required. Body 39,315 → 30,619; headroom 9,381 against the 40,000 cap.

### Coherence findings

**No inconsistencies surfaced.** One-child cohort, so there is no sibling-to-sibling naming or cross-ref conflict to reconcile. The extract matches the established fragment set: `step-5-dogfood-sop.md` sits beside `step-7.1-standing-checks.md` / `step-7.1-mirror-pairs.md` / `step-7.2-tag-message.md`, same header idiom, same directory-symlink pickup (`.claude/skills/ft-release` → `../../claude/skills/ft-release/`). Section-level `§5` citations still resolve because the heading stayed in `SKILL.md`. Standing-checks pointers that name "the SOP-currency check in Step 5" and "the 3 version edits in Step 5" remain true.

**No regressions in earlier-shipped surfaces.** CORE-507's §7.1 fragments and §7.2 fragment still dispatch from `SKILL.md`; Step 2.5 escape hatch is intact; version-pin grep, 3 version edits, and tick-boxes closer remain in the body. Directory listing is the pre-cohort four files plus the new fragment.

### Inline fixes

None.

### Follow-up candidates (file after audit closure)

**None.** Deferred residuals listed in Discovery Notes B–D stay with the child that recorded them; HEAD does not make them in-scope. Ledger refresh remains the next `/ft-release` §7.1's job, not a new PLAN row.

### Checked and cleared (not findings)

- **`.2` nav chip still reads 🟢 In progress** — CORE-042.4 retired flipping the markdown chip; YAML `status: completed` is the source of truth.
- **`.2` `related-tasks` lists CORE-507 rather than only the cohort** — optional key; Related prose names the parent, CORE-507, `.N`, and CORE-555. Legal.
- **Parent lives under `## Future Opportunities`** — audit-repo filing location, not drift. Parent-flip (if confirmed) moves the nested cohort to `## Completed` and restores `(none)` under Future Opportunities.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only audit; `AGENTS.md` §"Validation" scopes its six commands to viz and the fleet updater, and this change touches neither. Substituted: `wc -c` of `SKILL.md` + fragment, grep for stranded `above`/`below`/`this skill` pointers, live `ft-release/SKILL.md:<line>` citation scan.

- [x] Ran lint/type-check on changed code — N/A: no code. Same substituted checks as above.

- [x] **Quality assertions** — N/A for the diff: markdown audit record, no code. No duplication, dead code, complexity, or public-surface growth.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A. No UI/visual surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Result |
|---|---|
| `wc -c` SKILL.md | 30,619 (headroom 9,381 ≥ 5,134) |
| `wc -c` step-5-dogfood-sop.md | 9,545 |
| Whole-directory `find claude/skills/ft-release -type f` | 98,411 (ledger 92,839 is the v5.26.0 snapshot; refresh is §7.1) |
| Fragment header | matches `step-7.2-tag-message.md` idiom (H1 + lazy-fragment back-ref) |
| Dispatch | `SKILL.md:174` one-file `Read … now`; closer names the fragment |
| Fragment "grep above" repair | live: "the version-pin grep in Step 5" |
| `step-7.1-standing-checks.md` "in Step 5" | still accurate (heading + version edits stayed) |
| Live `ft-release/SKILL.md:<line>` citations outside archive | none |
| Section-level `§5` citations | heading still in SKILL.md (`docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md`, `SPEC/procedures/README.md`, `docs/AGENT-NEUTRALITY.md`) |
| `.claude/skills/ft-release` | directory symlink; new fragment is visible with no re-wire |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (the fixed audit line)** — walked all 18 entries. **No change** on every one: `README.md` · `AGENTS.md` · `SPEC.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` · `docs/VISION.md`.

  Swept as a **cumulative cohort sweep**: grepped the whole set in one pass for `ft-release` / `§5` / `Step 5` / `40,000` / `lazy fragment`. Hits that name this cohort's surface, then checked by hand:

  - **`docs/AGENT-COMPAT.md`** — cites `ft-release` §5 at section level for the dogfood-gate walk. Heading stayed in `SKILL.md`. **No change.**
  - **`docs/AGENT-NEUTRALITY.md`** — ledger row names `/ft-release` as the skill running the SOP-currency check (CORE-397). Check still lives under Step 5 (now dispatched into the fragment; heading stayed). **No change.**
  - **`docs/PLATFORMS.md`** — already documents `SKILL.md` (+ lazy fragments); `/ft-release` remains flowtron-self-only. **No change.**
  - **`AGENTS.md`** — names `/ft-release` in the self-host skill roster. **No change.**
  - **`README.md`** — closed-task count recomputed by `/ft-release` §7.1; points at `claude/skills/ft-release/SKILL.md`. Path still valid. **No change.**
  - **`claude/` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md`** — cite `/ft-release` §7.1 (installed-surface / self-only). Untouched by a Step 5 extract. **No change.**
  - **`docs/MIGRATION.md`**, **`docs/CONVENTIONS.md`**, **`docs/VISION.md`**, **`docs/EXTERNAL-AGENTS.md`**, **`docs/WORKTREES.md`**, **`claude/CAPABILITIES.md`**, **`SPEC.md`**, **`CONTRIBUTING.md`**, **`SECURITY.md`** — mention `/ft-release` as the release cutter or a §7.1 gate, never the eager-load body size or the inline location of the dogfood walk. **No change.**

  Skill bodies and `docs/CONTEXT-BUDGET.md` are excluded from this set. Ledger staleness (`ft-release 39,315`) is Discovery Notes B — next `/ft-release` §7.1, not a sweep-set edit.

- [x] Closed — every `## ✅ Acceptance` criterion ticked (none annotated `N/A` or not-met), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, then tasknote moved to `.flowtron/tasknote/archive/core/`. Operator confirmed parent-flip: `CORE-EPIC-556` stubbed and the nested cohort moved atomically to the top of `## Completed`.

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

The `CORE-EPIC-556` (`release-skill-headroom`) cohort is coherent and the sole implementation child's deliverable is live at HEAD. The audit surfaced **no inconsistencies and no follow-ups to file**. Operator confirmed parent-flip: parent stubbed and the nested cohort (`.2` `.N`) moved to the top of `## Completed`.

- **Files changed:** this audit tasknote + PLAN.md (`.N` stub, parent stub, cohort moved to `## Completed`; `(none)` restored under `## Future Opportunities`). Workflow-only. No code, no archived-record correction.
- **Verification:** `wc -c` `SKILL.md` 30,619 (headroom 9,381 ≥ two working units); fragment 9,545; dispatch + both relative-reference repairs live; no live `SKILL.md:<line>` pins; section-level `§5` citations still resolve.
- **Refactors:** none.
- **Documentation:** no drift across all 18 AI-referenced docs. CONTEXT-BUDGET ledger remains the next `/ft-release` §7.1 refresh (Discovery Notes B).
- **Follow-ups — none.** §7.2 staying inline, Step 2.5's CORE-507 narration, and the stale ledger stay with `.2`'s recorded deferrals; HEAD does not make them in-scope.
- **Maintainability:** `/ft-release`'s eager-load body is no longer one moderate edit from the 40,000-char gate. The dogfood/SOP walk can grow in its own file without pushing the body back over the cap. Directory symlink picks the fragment up with no re-wire.

**Archived:** 2026-09-09

