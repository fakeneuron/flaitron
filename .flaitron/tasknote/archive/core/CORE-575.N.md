---
title: viz-dependency-posture audit
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-EPIC-575, CORE-575.2, CORE-575.3, CORE-575.4]
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

# CORE-575.N | viz-dependency-posture audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-575]]

## 🎯 Goal

Verify the completed `CORE-EPIC-575` (`viz-dependency-posture`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — no misses found, so no filings needed
- [x] Single `chore: CORE-575.N — audit CORE-EPIC-575` commit lands (no code edits landed — verification-only audit)
- [x] PLAN.md line for `CORE-575.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-575.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-575` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-575.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-575]] — parent epic (viz-dependency-posture)
- [[CORE-575.2]] — npm-audit-fix-in-range
- [[CORE-575.3]] — gray-matter-js-yaml-residue
- [[CORE-575.4]] — audit-in-ci-or-cadence

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (`.2`, `.3`, `.4`) are closed; this is the epic's terminal audit child, invoked by the user via `/ft-close-epic CORE-575.N`.

- [x] Read relevant source files — read all three archived cohort tasknotes (`CORE-575.2.md`, `CORE-575.3.md`, `CORE-575.4.md`) in full; re-verified current repo state directly (`viz/package.json` overrides block, `npm --prefix viz audit --audit-level=high`, `docs/CONVENTIONS.md` §"Dependency audit cadence", `claude/skills/ft-release/SKILL.md` §6.2)

- [x] **Best Practices Review** — N/A: audit subtask is a verification pass over already-landed cohort deliverables, no new code/module-boundary surface of its own

- [x] **Archive skim** — this epic's own cohort *is* the archive skim target (`archive/core/CORE-575.{2,3,4}.md`); no non-cohort archived tasknote references `viz/package.json`, gray-matter, or the audit-cadence decision

- [x] **Drift check** — re-ran `npm --prefix viz audit --audit-level=high` → still 0 vulnerabilities (no new advisory since `.3`'s closure); `viz/package.json` still carries the `gray-matter.js-yaml` override; `docs/CONVENTIONS.md` §"Dependency audit cadence" and `claude/skills/ft-release/SKILL.md` §6.2 still cross-reference each other correctly (canonical ↔ labeled mirror). No drift from any cohort child's Final Summary.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. No open siblings (all three implementation children closed); audit runs against the full cohort as filed.

- [x] Subtasks above populated with concrete, ordered steps (Step 3 pre-fill); no `touches:` declared — this audit is a verification pass, no file deliverable of its own beyond the tasknote/PLAN.md bookkeeping

**Discovery Notes:**

Cohort inventory (from archived Final Summaries):
- **CORE-575.2** (`npm-audit-fix-in-range`) — `npm --prefix viz audit fix` cleared the 4 in-range advisories (vitest/@vitest-mocker, baseline-browser-mapping, browserslist ×2); 16 packages updated, `viz/package.json` unchanged, `viz/package-lock.json` changed. As a side effect, bumped gray-matter's nested js-yaml to 3.15.2, already patching the CPU-use advisory `.3` was filed to address.
- **CORE-575.3** (`gray-matter-js-yaml-residue`) — added `"overrides": { "gray-matter": { "js-yaml": "$js-yaml" } }` to `viz/package.json`, eliminating the now-redundant nested js-yaml 3.x copy entirely (not just patching it). Verified safe: gray-matter's default engines are bound but never invoked (`viz/src/tasknote-parse.ts` overrides both). Declined a `SECURITY.md` note — no active advisory to accept.
- **CORE-575.4** (`audit-in-ci-or-cadence`) — decided a documented release-cadence check over a `validate`-job CI step (audit's advisory-database time-dependence conflicts with §7.1 Pair H's deterministic byte-for-byte binding). Added `docs/CONVENTIONS.md` §"Dependency audit cadence" (canonical) + `claude/skills/ft-release/SKILL.md` §6.2 (labeled mirror). `AGENTS.md` / `.github/workflows/ci.yml` deliberately untouched.

No inconsistencies surfaced across the three: `.2` and `.3` both scope to `viz/package.json` + `viz/package-lock.json` and are sequential (`.3`'s Discovery explicitly re-ran `npm audit` per `.2`'s pointer-forward, rather than assuming staleness); `.4` is documentation-only and correctly left the dependency files untouched. All three "Doc-drift sweep" entries in their own Phase 4 closures correctly logged "no change" except `.4`, which correctly named its own two edits as the change itself (not drift to a third surface). Naming is consistent (`viz-dependency-posture` epic shortname carried through all three children's titles/rationale). No contradictory cross-refs: `.3` and `.4` both cite `.2`'s Final Summary accurately.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no new code surface of its own

- [x] **Minimal refactor gate** — N/A: no fix needed (see findings below); nothing to refactor

- [x] Implemented the minimal solution — the "solution" here is the audit verification itself; no code/doc fix required (see Implementation Notes)

- [x] Updated/added tests for non-trivial behavior — N/A, no code changed

**Implementation Notes:**

Cohort coherence pass (Acceptance criteria 2–4):

- **Naming/style consistency** — all three children carry the `viz-dependency-posture` epic shortname consistently in their tasknote titles and Related sections; PLAN.md stub lines for `.2`/`.3`/`.4` follow the same `- [x] **CORE-575.<n>** [tier] | shortname — Completed YYYY-MM-DD.` shape.
- **No contradictory cross-refs** — `.3`'s Discovery correctly follows `.2`'s Final Summary pointer-forward (re-ran `npm audit` before assuming its own scope was still needed); `.4`'s Discovery independently confirms `AGENTS.md`/CI untouched, consistent with `.3`'s scope (dependency-tree only, no CI/doc surface). No child's claim about another's deliverable is stale.
- **No regressions in earlier-shipped surfaces** — re-ran `npm --prefix viz audit --audit-level=high` (0 vulnerabilities, matches `.3`'s and `.4`'s closing state) and confirmed `viz/package.json`'s `overrides` block is still intact (`.3`'s deliverable wasn't clobbered by `.4`'s doc-only commit, as expected).
- **Doc-drift sweep** — see Phase 4 below (fixed acceptance line); no findings beyond what `.4` already recorded as its own change.

**No misses found.** The cohort is coherent: `.2` cleared the in-range advisories (with a beneficial side effect that reduced `.3`'s remaining scope), `.3` closed the architectural residue `.2`'s side effect didn't fully resolve, and `.4` gave the audit signal a durable home without perturbing either dependency file. No `/ft-file-followup` candidates surfaced.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changed by this audit; re-ran the full suite anyway for confidence (see Testing Notes)

- [x] Ran lint/type-check on changed code — N/A, no code changed; re-ran anyway as a sanity check

- [x] **Verification receipt** — see Testing Notes below; N/A for duplication/dead-code/doc-drift — no new surface introduced by this audit

- [x] (frontend) N/A — audit/verification task, no UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities)
- `npm --prefix viz test` → 0 (531/531 passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `grep -n '"overrides"' viz/package.json` → line 25 (gray-matter/js-yaml override intact)
- `grep -n "Dependency audit cadence" docs/CONVENTIONS.md` → found
- `grep -n "6.2 — Dependency audit" claude/skills/ft-release/SKILL.md` → found

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked every entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" against the full closed cohort (`.2`, `.3`, `.4`): `README.md` — no change. `AGENTS.md` — no change (deliberately left untouched by `.4`). `SPEC.md` — no change. `docs/MIGRATION.md` — no change. `claude/AGENTS-snippet.md` — no change. `codex/AGENTS-snippet.md` — no change. `cursor/AGENTS-snippet.md` — no change. `grok/AGENTS-snippet.md` — no change. `docs/CONVENTIONS.md` — already updated by `.4` (§"Dependency audit cadence", the cohort's own deliverable, re-verified intact and consistent, not drift needing a further fix). `CONTRIBUTING.md` — no change. `SECURITY.md` — no change (`.3` already considered and declined a named-accept entry; no active advisory exists to accept). `docs/AGENT-NEUTRALITY.md` — no change. `docs/PLATFORMS.md` — no change. `claude/CAPABILITIES.md` — no change. `docs/AGENT-COMPAT.md` — no change. `docs/EXTERNAL-AGENTS.md` — no change. `docs/WORKTREES.md` — no change. `docs/VISION.md` — no change. (`claude/skills/*/SKILL.md`, including `ft-release/SKILL.md` §6.2, sit outside this sweep set per the README's own exclusion note; `.4` already verified that mirror against its canonical section during its own closure, re-confirmed above in Discovery.)

- [x] Closed — every `## ✅ Acceptance` criterion ticked (see below); `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and kept nested under active parent `CORE-EPIC-575` (moves to top of `## Completed` only if the Step 8 parent-flip is confirmed); tasknote to be moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Audited the closed `CORE-EPIC-575` (`viz-dependency-posture`) cohort — `CORE-575.2` (npm-audit-fix-in-range), `CORE-575.3` (gray-matter-js-yaml-residue), `CORE-575.4` (audit-in-ci-or-cadence) — for coherence and cumulative doc drift. **No inconsistencies or misses found.** The three children sequence cleanly: `.2`'s `npm audit fix` cleared the 4 in-range advisories and, as a beneficial side effect, already patched gray-matter's nested js-yaml to a non-vulnerable version, narrowing `.3`'s remaining scope to the architectural residue (a redundant js-yaml 3.x copy, not an active advisory) — which `.3` correctly detected via its own Discovery drift check before proceeding, rather than assuming its PLAN.md line's original premise still held. `.4` then gave the audit signal a durable home (`/ft-release` §6.2 cadence, not a `validate`-job CI step) without touching either dependency file, keeping `.3`'s fix and Pair H's byte-for-byte `validate` binding both intact.

Re-verification: `npm --prefix viz audit --audit-level=high` → 0 vulnerabilities; `viz/package.json`'s `gray-matter.js-yaml` override still present (line 25); `docs/CONVENTIONS.md` §"Dependency audit cadence" and `claude/skills/ft-release/SKILL.md` §6.2 still cross-reference each other correctly (canonical ↔ labeled mirror). Full validation gates re-run clean: `npm --prefix viz test` → 531/531 passed, `npm --prefix viz run typecheck` → 0, `npm --prefix viz run lint` → 0. Doc-drift sweep: every `.flowtron/tasknote/README.md` §"AI-referenced docs" entry is "no change" except `docs/CONVENTIONS.md`, which already carries the cohort's own deliverable from `.4`. No `/ft-file-followup` candidates to file. `CORE-EPIC-575`'s stated goal — "make `npm --prefix viz audit` a signal again and settle the gray-matter → js-yaml 3.x residue" — is fully met: the audit is clean, the residue is architecturally eliminated (not just patched), and the signal has a durable release-cadence home.

**Parent-flip decision:** all four children (`.2`, `.3`, `.4`, `.N`) closed → user confirmed Yes. `CORE-EPIC-575` flipped to stub form and the whole cohort moved atomically to the top of `.flowtron/PLAN.md` `## Completed`.

**Archived:** 2026-09-12
