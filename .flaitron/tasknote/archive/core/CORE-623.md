---
title: validation-roster-build-step
status: completed
tags: [ci, mirror-pairs, docs]
created: 2026-09-20
due:
related-tasks: [CORE-622.4, CORE-624]
touches:
  - AGENTS.md
  - docs/CONVENTIONS.md
  - .flowtron/tasknote/README.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
---

# CORE-623 | validation-roster-build-step

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-622.4]] [[CORE-624]]

## 🎯 Goal

Promote `npm --prefix viz run build` — added to CI `validate` by CORE-622.4 — into `AGENTS.md` §"Validation" and its four labeled mirrors so the roster reads seven commands everywhere and `/ft-release` §7.1 Pair H passes again.

## ✅ Acceptance

- [x] `AGENTS.md` §"Validation" viz fence lists `npm --prefix viz run build` after `lint` — `awk '/^## Validation$/,/^## Dev Server$/' AGENTS.md | grep -qx 'npm --prefix viz run build'`
- [x] Pair H presence half prints nothing with `npm --prefix viz run build` added to its heredoc — run the §7.1 Pair H presence loop verbatim from `step-7.1-mirror-pairs.md`
- [x] Pair H CI-verbatim half produces no output, exit 0 — run the §7.1 Pair H `diff -u` verbatim
- [x] Pair H prose reads "seven commands (4 viz + …)" and the "six commands" phrasing is gone from live surfaces — `grep -rn 'six commands' AGENTS.md docs/CONVENTIONS.md claude/skills/ft-release/ .flowtron/tasknote/README.md` prints nothing
- [x] `npm --prefix viz run build` passes locally so the promoted command is a real gate on this machine — `npm --prefix viz run build` → 0

## 🧩 Subtasks

- [x] `AGENTS.md` §"Validation": add `npm --prefix viz run build` to the viz fence after `lint`
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI": add the command to the verbatim list; "six commands" → "seven commands"; §"Dependency audit cadence" parenthetical adds `run build`
- [x] `.flowtron/tasknote/README.md` §"Project quick commands": add a `Viz build` bullet and `npm run build` to the bare-forms line
- [x] `claude/skills/ft-release/SKILL.md` Step 6 fence: add the command after `lint`
- [x] `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair H: heredoc gains the command; prose "six commands (3 viz + …)" → "seven commands (4 viz + …)"
- [x] Run both Pair H halves + `npm --prefix viz run build`; record receipts

## 🔗 Related

- [[CORE-622.4]] — predecessor; added the CI `build` step without touching the roster mirrors
- [[CORE-624]] — follow-up (`blocked-by:` this task); lifts Pair H into the CI `drift` job so this class of miss fails on the landing commit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The drift is live and mechanical — Pair H's CI-verbatim `diff -u` exits 1 today with a single `+npm --prefix viz run build` line. CORE-622.4 deliberately added the build step as a real check (catches a Node-only module leaking into the browser bundle), so the fix is to promote it into the roster, not to pull it from CI. All five surfaces the PLAN line names still exist in the shapes Pair H expects.

- [x] Read relevant source files — `.github/workflows/ci.yml` `validate` job (line 30 carries the build step); `AGENTS.md` §"Validation" (lines 78-100, two fences); `docs/CONVENTIONS.md` §"GitHub Actions CI" (line 54, prose list + "six commands") and §"Dependency audit cadence" (line 64, `(test, run typecheck, run lint)` parenthetical); `.flowtron/tasknote/README.md` §"Project quick commands" (lines 128-142, bullets + bare-forms line); `claude/skills/ft-release/SKILL.md` Step 6 fence (lines 187-194); `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair H (lines 81-114: prose, presence heredoc, CI-verbatim diff). `viz/package.json` `build` = `tsc --noEmit && vite build`.

- [x] **Best Practices Review** — N/A for code boundaries: docs + skill prose + a shell heredoc. The structural point is Pair H's own rule: "fix a miss by updating the named mirror to match `AGENTS.md` §"Validation" in that surface's established shape — do not normalize every restatement to one fence." Each surface gets the command in its own idiom (fence line / prose list / README bullet / heredoc line).

- [x] **Archive skim** — `archive/core/` confirmed against the README table (832 notes). `grep -l 'run build'` hits are mostly early viz scaffolding (CORE-023/024/042.x/098.x/114-119) predating Pair H; the load-bearing ones are [[CORE-622.4]] (added the CI step, verified `build` → 0 locally, 317 modules) and [[CORE-622.N]] (audit confirmed `ci.yml` line 30 carries it; did not re-run Pair H, which is release-only). Pair H history: CORE-433.4 minted it, CORE-507 moved it into the fragment, CORE-578 added the gitleaks carve-out prose in CONVENTIONS, CORE-594/CORE-610.2 touched adjacent pairs. No prior note promoted a command into the roster after Pair H existed, so this is the first exercise of its "fix a miss" instruction.

- [x] **Drift check** — PLAN line's claims verified: the build step is in `ci.yml` `validate` (line 30); none of the five surfaces name it; Pair H's CI-verbatim diff exits 1 (run this session). One extra site the PLAN line does not name: `docs/CONVENTIONS.md` §"Dependency audit cadence" line 64 enumerates "the other `validate` commands (`test`, `run typecheck`, `run lint`)" — same file as a named mirror, same class of staleness; adding `run build` there is in scope of "promote `build` into the roster" and noted as such. No SPEC contract contradicted; PLAN line unchanged.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed (--fast). Assumptions: (1) `build` sits after `lint` in every surface, matching CI order — the CI-verbatim half is order-sensitive; (2) the README bare-forms line gains `npm run build` alongside the other viz bare forms; (3) the §"Dependency audit cadence" parenthetical is updated as part of the CONVENTIONS mirror, not filed separately; (4) `ci.yml` is not touched — it is already correct and is the surface the other five must match.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Pair H current state: presence half passes (six-command heredoc, all six present everywhere); CI-verbatim half fails with `+npm --prefix viz run build`. After this task both halves must pass with the heredoc at seven lines.
- Pair H prose parenthetical "(3 viz + `node --test` + 2 × `node --check`)" becomes "(4 viz + …)". The CONVENTIONS "six commands above" sentence becomes "seven commands above".
- [[CORE-624]] (lift Pair H into CI) is the structural fix so the next roster miss fails on its own commit; out of scope here.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: docs + skill prose + a heredoc line; the Pair H shell checks are the tests and were run

**Implementation Notes:**

- Pattern survey: Pair H's own instruction governs — "fix a miss by updating the named mirror to match `AGENTS.md` §"Validation" in that surface's established shape — do not normalize every restatement to one fence." Each surface got the command in its own idiom: fence line (AGENTS, `/ft-release` Step 6), prose list + count word (CONVENTIONS), README bullet + bare-forms entry, heredoc line + count words (Pair H). `build` sits after `lint` everywhere, matching CI order (the CI-verbatim half is order-sensitive).
- Minimal refactor gate: no refactor. One adjacent edit beyond the five named surfaces — `docs/CONVENTIONS.md` §"Dependency audit cadence" parenthetical `(test, run typecheck, run lint)` → `(…, run build)` — same file as a named mirror, same staleness, and the sentence's claim (validate commands are pure functions of the commit) holds for `build` too. `ci.yml` untouched: it is already correct and is what the others must match. `viz/README.md` §"Commands" left as-is: not a Pair H mirror, out of the PLAN line's scope.
- Diff: 5 files, +9/−5 lines.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — Pair H presence + CI-verbatim halves (the checks that bind these surfaces)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `npm --prefix viz run build` (`tsc --noEmit && vite build`) run as the promoted command

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user — N/A: no frontend change (and suppressed under implied --fast) for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `awk '/^## Validation$/,/^## Dev Server$/' AGENTS.md | grep -qx 'npm --prefix viz run build'` → 0
- Pair H presence loop (seven-line heredoc, verbatim from `step-7.1-mirror-pairs.md`) → 0, printed nothing
- Pair H CI-verbatim `diff -u` → 0, no output (was exit 1 with `+npm --prefix viz run build` before this task)
- `grep -rn 'six commands' AGENTS.md docs/CONVENTIONS.md claude/skills/ft-release/ .flowtron/tasknote/README.md` → 1 (no matches — pass)
- `npm --prefix viz run build` → 0 (`tsc --noEmit && vite build`, built in 452ms)
- Context budget: `claude/skills/ft-release/**` = 122,198 ≤ 125,000; `SKILL.md` = 31,705 ≤ 40,000
- Structural quality: no duplication beyond the labeled-mirror convention this task exists to keep consistent; no dead code; no public-surface growth; the roster prose now agrees with the roster fences on every surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Promoted `npm --prefix viz run build` — added to CI `validate` by CORE-622.4 — into `AGENTS.md` §"Validation" and its four labeled mirrors (`docs/CONVENTIONS.md` §"GitHub Actions CI", `.flowtron/tasknote/README.md` §"Project quick commands", `/ft-release` SKILL.md Step 6 fence, and `step-7.1-mirror-pairs.md` Pair H heredoc + "seven commands (4 viz + …)" prose), plus the adjacent §"Dependency audit cadence" parenthetical in CONVENTIONS. Both Pair H halves now pass (CI-verbatim `diff -u` was exit 1 before). Verification: A1–A5 receipts above all green; `ft-release/**` at 122,198/125,000. No refactors; no deferred cleanup. Doc-drift sweep: `AGENTS.md` and `docs/CONVENTIONS.md` are the deliverables; all other AI-referenced docs no change. `touches:` reconciliation: `git diff --name-only` = exactly the five declared paths. Maintainability: the "passing" definition is verbatim on the human-run and CI-run sides again, so the next `/ft-release` cut will not fail §7.1 Pair H on a step nobody dropped; [[CORE-624]] makes this class of miss fail on its landing commit instead of at the next cut.

**Archived:** 2026-09-20
