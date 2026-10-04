---
title: CI gate on push audit
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-430, CORE-430.2]
---

# CORE-430.N | CI gate on push audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-430]]

## 🎯 Goal

Verify the completed `CORE-EPIC-430` (`CI gate on push`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-430.N — audit CORE-EPIC-430` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-430.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-430.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-430` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-430.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-430]] — parent epic: CI gate on push
- [[CORE-430.2]] — sole implementation child: Actions workflow

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-430.N`; Step 1/2 pre-flight passed (clean tree, parent `CORE-EPIC-430` active under `## High`, `.N` is the reserved terminal audit child, no open siblings — the cohort is the single implementation child `CORE-430.2`, closed 2026-08-10). Single-child cohort, so "coherence across children" collapses to "does the one child's deliverable sit coherently against the surrounding doc set" — that is where the audit weight goes.

- [x] Read relevant source files — `.flowtron/tasknote/archive/core/CORE-430.2.md` (full Final Summary + Implementation Notes), `.github/workflows/ci.yml` (the shipped deliverable), `AGENTS.md` §"Validation" (lines 38-63, the canonical command source), `docs/CONVENTIONS.md` (full §Adheres-to/§Declines structure + the new §"GitHub Actions CI" entry at 52-56), `README.md` (badge row + declines/adheres mirror at :76), `CONTRIBUTING.md:35` (mirror), `SECURITY.md` (full — threat model + supply-chain section), `docs/PHILOSOPHY.md:41` (§"Zero scripts", the backing principle CONVENTIONS cites), `.flowtron/tasknote/README.md` (AI-referenced docs list + §"Project quick commands"), `claude/skills/ft-release/SKILL.md:238-239` (surfaced by grep as a fifth copy of the command roster). No probe needed — read set narrow and enumerable.

- [x] **Best Practices Review** — N/A for the audit itself (verification pass, no module boundary touched). Applied *to* the cohort: the workflow correctly treats `AGENTS.md` §"Validation" as the single definitional source rather than re-deriving CI-specific commands — the right dependency direction. The gap is that nothing enforces it (see Implementation Notes F2).

- [x] **Archive skim** — largely self-referential (the cohort is one child, itself an archive entry). `CORE-430.2`'s own skim already surfaced the load-bearing non-cohort history: `CORE-099.1` / `CORE-115` / `CORE-321` (the thrice-reaffirmed CI decline this epic reverses), `CORE-374` / `CORE-384` (the CONVENTIONS↔README/CONTRIBUTING mirror invariant), `CORE-383` (badge set chosen *because* no CI existed — now stale as an assumption, see F4). Re-verified rather than re-derived; no additional archive reads changed the picture.

- [x] **Drift check** — every path cited in `CORE-430.2`'s Final Summary still matches HEAD: `.github/workflows/ci.yml` (640 bytes, sole file under `.github/`), `docs/CONVENTIONS.md` §"GitHub Actions CI" now at 52-56 under `## Adheres to`, `README.md:76` + `CONTRIBUTING.md:35` mirrors both carry "GitHub Actions CI" in the adheres parenthetical and no longer in the declines parenthetical. Declines rosters agree 7-for-7 across all three files. No SPEC contract touched by the cohort (CI lives outside the workflow contract layer).

- [x] Asked clarifying questions — **No clarifications needed.** Assumptions: (a) the audit is scoped to flowtron-self surfaces — `.github/` is not shipped to adopters, so adopter-facing docs are out of scope unless they assert something about CI (none do); (b) misses get filed as follow-ups after closure, not fixed inline, per Step 5's threshold.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Single-child cohort (`CORE-430.2` only — this epic was filed by `/ft-audit-repo` with Discovery supplied upfront, hence no `.1`; children start at `.2`). No early-audit decision was needed: the sole implementation child closed 2026-08-10 before this audit opened.

Because the cohort is one child, the audit's real value is not intra-cohort consistency but **blast-radius consistency** — the child reversed a documented, thrice-reaffirmed architectural decline, and a reversal of that size ripples into docs whose rationale was written under the old assumption. That framing drove the read set above and produced all four findings.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A. Verification pass over existing cohort deliverables; no new code surface, no pattern to extend.

- [x] **Minimal refactor gate** — N/A. **No inline fixes applied** (deliberate — see Implementation Notes "Why nothing was fixed inline").

- [x] Implemented the minimal solution — cohort inventory + coherence pass + fixed doc-drift sweep run; four findings recorded below as `/ft-file-followup` candidates.

- [x] Updated/added tests — N/A, no code changed.

**Implementation Notes:**

### Cohort inventory

- **`CORE-430.2`** (Actions workflow, closed 2026-08-10) — added `.github/workflows/ci.yml` (single `validate` job: `actions/checkout@v4` + `actions/setup-node@v4` at Node 20 with npm cache keyed on `viz/package-lock.json`, then `npm --prefix viz ci` and the six `AGENTS.md` §"Validation" commands). Also moved `docs/CONVENTIONS.md` §"CI / GitHub Actions" from `## Declines` to `## Adheres to` (renamed §"GitHub Actions CI") and updated its `README.md:76` / `CONTRIBUTING.md:35` mirrors per the CORE-384 invariant.

### Coherence verdict

Verified clean:

- Workflow commands match `AGENTS.md` §"Validation" **verbatim and in the same order** (3 viz + `node --test` + 2 × `node --check`). The `npm --prefix viz ci` install step is the only addition, and it's required.
- CONVENTIONS↔README↔CONTRIBUTING mirror invariant (CORE-384) holds: adheres parenthetical carries "GitHub Actions CI" in all three; declines rosters agree 7-for-7 with `docs/CONVENTIONS.md`'s `## Declines` headings.
- `docs/PHILOSOPHY.md:41` §"Zero scripts" needs no update — it scopes *flowtron's own operations* (`cp`/`mv`/markdown edits, "no `flowtron validate` binary"), not the project's validation tooling. A CI config that invokes the repo's existing test commands doesn't falsify it.
- **No regressions** in the cohort's surface: all six workflow commands re-run at HEAD and pass (see Testing Notes).

### Findings (follow-up candidates — none fixed inline)

- **F1 — `docs/CONVENTIONS.md` contradicts itself on duplication.** §"Pre-commit hooks" (line ~88) declines hooks because "hooks would duplicate the check at commit time." §"GitHub Actions CI" (line 56) *accepts* CI on exactly that basis — "it duplicates their exact commands as a free, automatic check on every push." Same document, opposite verdicts on the same argument, with no reconciling sentence. The distinction the reader needs (CI runs off the developer's machine and catches a *skipped* gate; a hook runs on the same machine that just skipped it) exists but is never stated. → `/ft-file-followup` candidate, medium.

- **F2 — the "exactly one place" claim is falsified by a fifth copy.** `docs/CONVENTIONS.md:56` asserts "The commands are identical by design (see AGENTS.md §"Validation") so there is exactly one place that defines what 'passing' means." The roster is in fact restated at five sites — `AGENTS.md:44-48,56-60` (canonical), `.github/workflows/ci.yml:20-25`, `docs/CONVENTIONS.md:54` (prose), `.flowtron/tasknote/README.md:66-71`, and `claude/skills/ft-release/SKILL.md:238-239` — and the fifth **already diverges**: ft-release writes `npm --prefix viz run test` (harmless variant) but **omits both `node --check` commands**, which `AGENTS.md` calls part of the release gate. So the release gate is narrower than CI, and nothing detects that. → `/ft-file-followup` candidate, medium; the natural home is **`CORE-EPIC-433`** (drift blind spots), specifically alongside `CORE-433.3` "widen gates", rather than a standalone task.

- **F3 — `SECURITY.md` has no entry for the new CI surface.** The doc reasons explicitly about contributor PRs as the threat vector and advises adopters to "pin to annotated release tags … not a moving target." The workflow the cohort added does neither of the analogous things for itself: no `permissions:` block (so the job inherits the repository's default `GITHUB_TOKEN` scope rather than declaring `contents: read`), and actions pinned to mutable `@v4` tags rather than commit SHAs. The `pull_request` trigger also newly executes fork-authored code on a runner. Exposure is genuinely low (`pull_request`, not `pull_request_target`, so fork runs get a read-only token and no secrets) — this is a hardening + documentation gap, not a live vulnerability. → `/ft-file-followup` candidate, medium.

- **F4 — `README.md` badge row is now conservatively stale.** Per `CORE-383`, the badge set (license + version only) was chosen specifically because no CI existed, making a build badge dishonest. CI now exists, so a build-status badge became available and honest on 2026-08-10. Opportunity, not a defect. → `/ft-file-followup` candidate, low.

### Why nothing was fixed inline

F2 is the only finding whose surface looks like a one-line correction (softening CONVENTIONS.md:56). Softening it would make the sentence true while leaving the actual divergence — a release gate that skips two checks CI runs — in place and unrecorded. That trades a visible inconsistency for a hidden one, so the finding is filed rather than papered over. F1 re-argues a decline's rationale, F3 changes a shipped workflow's security posture, F4 adds public-facing README chrome — all beyond an audit's inline-fix threshold.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code changed by the audit; instead re-ran the cohort's full deliverable (all six workflow commands) at HEAD as the no-regressions check. See Testing Notes.

- [x] Ran lint/type-check on changed code — N/A for the audit's own diff (markdown prose only); `npm --prefix viz run lint` + `run typecheck` run anyway as part of the regression check, both clean.

- [x] **Quality assertions** — audit surfaced one real duplication issue in the cohort's surrounding docs (F2, five restatements of the command roster with one already diverged) and one stale documentation claim (F2's "exactly one place" sentence). Both filed, neither fixed inline, rationale recorded above.

- [x] (frontend) N/A — no frontend surface touched by the audit.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Re-ran the cohort's six shipped commands at HEAD, in the workflow's exact order, as the no-regressions check (GitHub Actions still can't be triggered from this session):

- `npm --prefix viz test` → 300 passed (19 files), 6.31s
- `npm --prefix viz run typecheck` → clean (`tsc --noEmit`)
- `npm --prefix viz run lint` → clean (`eslint src`)
- `node --test tools/update-adopters.test.mjs` → 32 pass, 0 fail
- `node --check tools/update-adopters.test.mjs` → OK
- `node --check tools/update-adopters.mjs` → OK

Identical results to `CORE-430.2`'s Phase 3 run — no drift in the gate's own outcome since the cohort closed. `.github/` still contains exactly one file (`workflows/ci.yml`, 640 bytes).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries. Method: `grep -rn -i "github actions|CI / GitHub|\.github/workflows|CI-free|no CI\b"` across the declared set, plus a targeted read of every file whose rationale could have been written under the pre-CI assumption.
  - `README.md` — **no change** (mirror already correct at :76). Badge-row gap logged as F4, not fixed here.
  - `SPEC.md` — no change (CI is outside the workflow contract layer; zero CI references)
  - `docs/MIGRATION.md` — no change (`.github/` is flowtron-self only, never shipped to adopters; no CI claims)
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — **change needed, deferred to follow-up** (F1 self-contradiction on duplication; F2 falsified "exactly one place" claim at :56). Rationale for deferring in Implementation Notes.
  - `CONTRIBUTING.md` — no change (mirror correct at :35; declines roster agrees 7-for-7)
  - `SECURITY.md` — **change needed, deferred to follow-up** (F3: no threat-model entry for the CI surface; workflow lacks `permissions:` and uses mutable `@v4` tags while the doc advises pinning elsewhere)
  - `docs/AGENT-NEUTRALITY.md` — no change (workflow is agent-neutral; no Claude-specific surface added)
  - `docs/PLATFORMS.md` — no change (CI is not a platform-wiring layer)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change (CI triggers on `main` only; `wt-*` branches are unaffected by design)

- [x] Closed — all 8 `## ✅ Acceptance` criteria ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested under the active `CORE-EPIC-430`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Audited `CORE-EPIC-430` (`CI gate on push`) — a single-child cohort (`CORE-430.2`). The shipped workflow is sound: its six commands match `AGENTS.md` §"Validation" verbatim and in order, all six still pass at HEAD, and the CONVENTIONS↔README↔CONTRIBUTING mirror invariant (CORE-384) holds 7-for-7. **Four findings surfaced, all in the docs surrounding the deliverable rather than in the deliverable itself** — the predictable blast radius of a child that reversed a thrice-reaffirmed architectural decline.

**Findings (all filed as follow-up candidates, none fixed inline):**
- **F1** (medium) — `docs/CONVENTIONS.md` declines pre-commit hooks for duplicating checks while accepting CI *because* it duplicates checks; no reconciling sentence.
- **F2** (medium) — `docs/CONVENTIONS.md:56` claims "exactly one place defines what passing means," but the roster sits at five sites and `claude/skills/ft-release/SKILL.md:238-239` already diverges — it omits both `node --check` commands, making the release gate narrower than CI, undetected. Natural home: `CORE-EPIC-433` (drift blind spots), alongside `CORE-433.3` "widen gates".
- **F3** (medium) — `SECURITY.md` has no entry for the new CI surface; the workflow declares no `permissions:` and pins actions to mutable `@v4`. Hardening/doc gap, not a live vulnerability (`pull_request`, not `pull_request_target`).
- **F4** (low) — `README.md` badge row omits a build badge that only became honest when CI shipped (per `CORE-383`'s reasoning).

**Changed files:** none beyond this tasknote + its `PLAN.md` line — audit is a `chore:`, no code or doc edits landed.

**Parent-flip decision:** confirmed (Yes). `CORE-EPIC-430` flipped to stub form and the full cohort (parent + `.2` + `.N`) moved atomically to the top of `## Completed`; `## High` was left empty so its `(none)` placeholder was restored.

**Verification:** all six workflow commands re-run at HEAD (viz 300/300 tests, clean typecheck, clean lint; updater 32/32, both syntax checks OK) — identical to `CORE-430.2`'s Phase 3 results, confirming no regression since cohort close.

**Refactors:** none, deliberately. F2's surface invites a one-line softening of `CONVENTIONS.md:56`; applying it would make the sentence true while hiding the actual divergence (a release gate skipping two checks CI runs). Filed instead of papered over.

**Documentation verdict:** 12 of 14 AI-referenced docs clean; 2 (`docs/CONVENTIONS.md`, `SECURITY.md`) carry deferred changes tracked as F1/F2/F3.

**Maintainability effect:** the epic's stated gap ("gates only fire when a human runs them") is genuinely closed for the six commands. The audit's contribution is naming the second-order gap the reversal opened — the command roster is now copy-pasted across five files with nothing keeping them in sync, and one copy has already drifted. That is exactly the class `CORE-EPIC-433` exists to close, so F2 has a filed home rather than becoming orphaned debt.

**Archived:** 2026-08-10
