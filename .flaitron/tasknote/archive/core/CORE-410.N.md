---
title: wiring-parity-check audit
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-410, CORE-410.2, CORE-410.3, CORE-410.4]
---

# CORE-410.N | wiring-parity-check audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-410]]

## 🎯 Goal

Verify the completed `CORE-EPIC-410` (`wiring-parity-check`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. — 14/14 swept, 0 updated by this audit.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — naming + style parity good; one factual inconsistency found and fixed (finding 1).
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — §7.1 both halves clean at audit time; sibling shipped-skill parity check re-run clean.
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — 3 findings: 1 fixed inline, 2 cited as follow-up candidates.
- [x] Single `feat: CORE-410.N — audit CORE-EPIC-410` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-410.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-410.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-410` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Re-run `/ft-release` §7.1's self-wiring parity check verbatim — confirm the epic's done-signal (clean local + global) still holds at audit time
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-410.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-410]] — parent epic: nothing verifies flowtron's own installed skill/command surface.
- [[CORE-410.2]] — built the `/ft-release` §7.1 standing self-wiring parity check + the `docs/PLATFORMS.md` policy it asserts against.
- [[CORE-410.3]] — cleared the local half: added the two missing `.claude/` `ft-spec` symlinks.
- [[CORE-410.4]] — cleared the global half: pruned nine dangling `~/.claude/` links, normalized casing to `Code`.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (`.2`, `.3`, `.4`) closed 2026-08-07 with no open siblings, so the cohort is complete and the audit runs on its natural boundary. The epic's deliverable is a *standing check*, which makes the audit's own re-run of that check the sharpest possible coherence probe: if the epic worked, `/ft-release` §7.1 prints clean today without anyone having touched it since.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort shape.** `CORE-EPIC-410` was filed by `/ft-audit-repo` on 2026-08-06 with its children pre-scoped, so it carries **no `.1` Discovery child** — the audit-repo run supplied the discovery. Children are `.2` (build the check), `.3` (fix the local finding), `.4` (fix the global findings), `.N` (this audit). All three implementation children `[x]`, closed 2026-08-07. No early-audit decision needed: Step 2 found zero open siblings.

**Read set.** `SPEC/epic.md`, `.flowtron/tasknote/README.md` §"AI-referenced docs", `.flowtron/PLAN.md`, the three archived cohort tasknotes, plus the cohort's live repo deliverables: `claude/skills/ft-release/SKILL.md` §7.1 (lines 263-354) + §7.4 (line 423), `docs/PLATFORMS.md` §"Installed-surface policy" (lines 74-88). Also read for cross-ref checking: `claude/skills/ft-update/SKILL.md` (the adopter-side dangling scan), `docs/MIGRATION.md` §"Skills retired so far", `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`.

**Cohort deliverable inventory.**

- **`.2` parity-check** — the epic's substance. Added a fourth standing check to `/ft-release` §7.1 ("Standing self-wiring parity check", ~24 lines): a *blocking* local half (bidirectional exact-set diff of `.claude/{skills,commands}` `ft-*` against shipped `claude/{skills,commands}`, plus a broken-link scan) and an *advisory* global half (dangling scan + path-casing report over `~/.claude/`). Added the matching §7.4 advisory verdict bullet, and a 10-line policy paragraph to `docs/PLATFORMS.md` ("Flowtron's own checkout is not an adopter") so the local half asserts against written policy rather than its own assumption. Glob-free by design (zsh unmatched-glob abort — the [[CORE-409]] false-negative class).
- **`.3` wire-ft-spec** — two symlinks: `.claude/skills/ft-spec → ../../claude/skills/ft-spec/` and `.claude/commands/ft-spec.md → ../../claude/commands/ft-spec.md`. Zero repo prose. Cleared the local half's two findings.
- **`.4` prune-stale-globals** — machine state only, zero repo files: removed 9 dangling `~/.claude/` links, re-pointed 26 surviving links (23 `ft-*` + 4 `natabula-*`, minus 1 already correct) from `/Users/fakeneuron/code/` to the true on-disk `/Users/fakeneuron/Code/`. Cleared the global half.

**Epic done-signal re-verified live at audit time (2026-08-08).** Ran `/ft-release` §7.1's self-wiring block verbatim, both halves, in zsh:

- Local skills diff → empty, exit 0. Local commands diff → empty, exit 0. Local dangling scan → silent.
- Global dangling scan → silent.
- Global casing report → exactly **one** line: `23 /Users/fakeneuron/Code/flowtron`.

Both stated pass conditions met; the epic's end state has held a day past `.4`'s close with no maintenance. Also re-ran the sibling shipped-skill parity check (`claude/skills` vs `codex/skills`) — identical by slug. Counts: 18 shipped skills / 18 shipped commands / 18 local `ft-*` skill links / 18 local `ft-*` command links.

**Archive skim.** Self-referential by construction — the cohort children *are* the archive entries in scope, and no non-cohort archived tasknote touches `claude/skills/ft-release/SKILL.md` §7.1's self-wiring block or `docs/PLATFORMS.md` §"Installed-surface policy" (both created/edited by `.2`). [[CORE-349.5]] is the shape precedent `.2` extended and was read via `.2`'s own citation rather than re-opened.

**Drift check.** All paths cited in the cohort's archived tasknotes still resolve at HEAD: `claude/skills/ft-release/SKILL.md` §7.1 + §7.4, `docs/PLATFORMS.md` §"Installed-surface policy", `docs/MIGRATION.md` §"Skills retired so far", `docs/MIGRATION.md` §1.0's discretionary-install wording. No SPEC contract tension — the whole epic landed as shell blocks inside an existing skill procedure, which SPEC §"What flowtron does NOT provide" permits and [[CORE-349.5]] established.

**No clarifications needed.** Cohort scope is unambiguous (three closed children, no deferrals, no partial-cohort question). Assumption asserted: the audit's coherence scope is the cohort's *repo* deliverables plus the machine state they govern — not a re-litigation of `.4`'s casing decision or `.2`'s advisory/blocking split, both of which were operator-confirmed at the time.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** `N/A` for new surface — the audit adds no code and no new shape. What was surveyed is the *existing* shape for consistency: the new §7.1 block was read against its three siblings (lines 263, 271, 280) and matches their form — bolded `**Standing … check**` lead, a "why this exists" paragraph naming the motivating incident, fenced shell, explicit pass condition, explicit posture sentence. The §7.4 advisory verdict bullet reads as a near-parallel of the SOP-currency bullet directly above it (same "carry … into the closure review as one line" phrasing, same two-example `clean` / `finding` pattern, same explicit does-not-block-commit-go sentence). Style parity across the cohort's deliverables is good.

**Minimal refactor gate.** No refactor. One prose correction (below); nothing restructured.

### Coherence findings

**1. Fold-attribution parenthetical undercounted its own cohort's evidence — FIXED INLINE.**

`claude/skills/ft-release/SKILL.md:350` read: "each hit is a link left behind by a retired skill (the `/ft-audit <domain>`, `/ft-task --debug`, and `/ft-file-followup --park` folds each stranded one)." Three folds × one link = three, but the check was written to report **nine**, and [[CORE-410.2]] measured exactly nine in the same session that wrote this sentence. The `/ft-audit <domain>` fold ([[CORE-389.2]]) stranded *five*, not one, and [[CORE-392]]'s outright retirement of `/ft-quality` — which stranded a skill *and* a command — was omitted entirely. `docs/MIGRATION.md` §"Skills retired so far" carries all four retirements correctly, so the cohort's own deliverable contradicted the authoritative table two files away.

Small, clearly in scope, and squarely the class the audit is for: the sentence teaches a future operator what a `DANGLING` hit means, and it taught the wrong arithmetic. Rewritten to the measured breakdown (5 + 1 + 1 + 2 = 9) with a pointer to the MIGRATION table as the authority, so the count lives in one place and the skill cites it rather than restating it.

**2. `.claude/` diff compares names only — a real directory would pass as wired. NOT fixed; follow-up candidate.**

The local half's two `diff -u` commands compare `ls` output on both sides, and the local dangling scan filters `-type l`. A skill directory that was *copied* into `.claude/skills/ft-task` instead of symlinked therefore passes all three commands silently, then diverges from the shipped source with nothing to notice — the same never-noticed-until-a-human-tries-it failure mode the epic exists to close, one layer in. Verified as a live gap, not a live defect: an independent sweep confirms all 36 local `ft-*` entries are symlinks and all resolve into `../../claude/`, so nothing is wrong today. The check just doesn't assert the property. A one-line `! -type l -print` addition would close it; filing that is the operator's call, not an inline edit to a release gate.

**3. `.4`'s deliberate-lowercase decision is recorded only in its archive. NOT fixed; follow-up candidate.**

`.4` normalized every global link to `/Users/fakeneuron/Code` while deliberately *leaving* the lowercase `~/code/flowtron` paths in `README.md:32-33`, `docs/MIGRATION.md:202-203`, and `codex/AGENTS-snippet.md:57` — correctly, because those are generic clone destinations for any reader, not this machine's path. Confirmed consistent across all three files. But the rationale lives only in `.4`'s Testing Notes. The operator who next sees §7.1's casing report flag drift has no reason to archive-skim `.4`, and the obvious remediation — grep for mixed casing, normalize the docs — would reverse a decision made deliberately. Worth one sentence in the §7.1 casing paragraph; again a judgment call for the operator.

**Checked and found coherent (no finding).**

- **Naming.** "Standing self-wiring parity check" fits the `Standing <thing> check` family exactly; "local repo-scoped" / "machine-global" is the same vocabulary `docs/PLATFORMS.md`'s policy table uses.
- **Cross-refs.** `.2`'s SKILL.md block cites `docs/PLATFORMS.md` §"Installed-surface policy" → "Flowtron's own checkout is not an adopter"; both the section and that exact bolded lead exist. `docs/MIGRATION.md` §1.0's discretionary wording, cited as the reason global-missing goes unchecked, reads as quoted. No contradictory cross-ref anywhere in the cohort.
- **`/ft-update` vs §7.1.** The adopter-side dangling scan (`ft-update/SKILL.md:135-136`) is unfiltered and report-only, where §7.1's local half is `ft-*`-filtered and blocking. Not a contradiction — it's the documented adopter/flowtron-self asymmetry: adopters install a policy *subset*, so "missing" is uncheckable there, and `/ft-update` never `rm`s on the adopter's behalf. Both surfaces are glob-free `find`, so `.2`'s zsh lesson is applied consistently.
- **`docs/AGENT-NEUTRALITY.md`.** `.2` reasoned that its `docs/PLATFORMS.md` edit needs no ledger row because the ledger defers platform-wiring documentation to PLATFORMS.md. Re-read at HEAD: PLATFORMS.md still holds no row of its own and the deferral still reads as `.2` described. Conclusion stands.
- **`docs/GLOSSARY.md:61`** names `/ft-sidequest` as a historical parenthetical ("filed via the retired `/ft-sidequest` skill before v5.15.0") — accurate, and already checked by `.4`.

**Observed, deliberately not filed.** §7.1's `-name 'ft-*'` filter means the 4 `natabula-*` global links `.4` fixed have no standing detector and can silently re-drift. Correct as-is: policing another repo's links is outside flowtron's contract, and `.4`'s inclusion of them was a one-time operator-approved courtesy, not a scope expansion.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**1. The epic's own check, run verbatim, is the audit's primary test.** `/ft-release` §7.1's self-wiring block, both halves, in zsh — the same shell and the same commands `.4` ran a day earlier:

| Command | Result | Pass condition |
|---|---|---|
| local skills `diff -u` | empty, exit 0 | ✅ silent |
| local commands `diff -u` | empty, exit 0 | ✅ silent |
| local dangling `find` | no output | ✅ silent |
| global dangling `find` | no output | ✅ silent |
| global casing `readlink \| uniq -c` | `23 /Users/fakeneuron/Code/flowtron` | ✅ exactly one line |

The epic's end state held for a day without maintenance. This is the check's first run by a session that did not build it, which is the useful signal — no operator knowledge was needed to get a clean result.

**2. Stronger property swept independently (the finding-2 evidence).** All local `ft-*` entries under `.claude/{skills,commands}`: 36 total, **0 non-symlinks** (`find … ! -type l`), **0 pointing outside `../../claude/`** (`readlink | grep -qv`). The gap named in finding 2 is latent, not live.

**3. Sibling standing check re-run as a regression guard.** Shipped-skill parity (`claude/skills` vs `codex/skills`, both filtered to dirs containing `SKILL.md`) — identical by slug, 18 each. Counts across all four surfaces: 18 shipped skills / 18 shipped commands / 18 local skill links / 18 local command links.

**4. Doc cross-checks behind the coherence findings.** Grepped the nine retired slugs across the full AI-referenced doc set — one hit (`docs/GLOSSARY.md:61`), a correct historical parenthetical. Grepped `ft-spec` across the wiring docs — present and correct in `claude/AGENTS-snippet.md:59-60`, `codex/AGENTS-snippet.md:26`, `docs/MIGRATION.md:62/260/266/277/432`, `docs/PLATFORMS.md:68-69`, `README.md:45`. Grepped `ln -s ~/[cC]ode` across README / MIGRATION / codex snippet — five hits, all lowercase, all generic clone destinations, consistent with each other and with `.4`'s recorded decision (finding 3).

**5. Lint / type-check.** `git diff --check` clean. Changed file is one markdown prose sentence inside an existing skill — the viz suites (`npm --prefix viz test/lint/typecheck`) and `node --test tools/update-adopters.test.mjs` cover `viz/` and `tools/`, neither touched, so both are `N/A` by scope rather than skipped.

**6. Quality assertions.** The one-sentence edit removes a factual error and adds a citation; no duplication introduced (the count now lives in `docs/MIGRATION.md` alone and is cited, not restated), no dead prose, no public-surface growth, no new file or flag. The corrected sentence *is* the fix to a stale-documentation finding.

**7. `👁️` visual confirmation** — `N/A`, no frontend surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Cumulative sweep for the whole `CORE-EPIC-410` cohort, not just this audit's one-sentence edit. Two greps drove it: the nine retired slugs across the full set, and references to the edited surface (`self-wiring`, `§7.1`, `stranded`, `DANGLING`). Verdicts cite those results.

  - `README.md` — **no change, checked deliberately.** Zero hits on the edited surface. Lines 32-33's `ln -s ~/code/flowtron/…` global-install commands are left lowercase per `.4`'s recorded decision (generic clone destination, not this machine's path) — see finding 3, which proposes documenting that rationale rather than changing the paths. §"Repo layout" never enumerates release-time checks.
  - `SPEC.md` — no change. Zero hits. The contract enumerates no `/ft-release` standing checks, and §"What flowtron does NOT provide" stays satisfied: the cohort added shell blocks inside an existing skill procedure, never a validator or runtime scanner.
  - `docs/MIGRATION.md` — **no change, and it is now the single source for the retirement count.** Zero hits on the edited surface. §"Skills retired so far" carries all four v5.15.0 retirements correctly; this audit's inline fix makes `/ft-release` §7.1 *cite* that table instead of restating its arithmetic wrong. §1.0's discretionary-install wording, which the global half depends on, reads as quoted. §1.2.2's lowercase hot-reload snippet stays as-is per `.4`.
  - `claude/AGENTS-snippet.md` — no change; adopter repo-scoped wiring, and `ft-spec` is correctly installed at lines 59-60. The whole cohort is flowtron-self.
  - `codex/AGENTS-snippet.md` — no change; `ft-spec` correct at line 26, and line 57's `ln -s ~/code/flowtron/codex/skills/*` targets `~/.agents/skills/`, a surface no cohort child touched.
  - `docs/CONVENTIONS.md` — no change; zero hits.
  - `CONTRIBUTING.md` — no change; zero hits.
  - `SECURITY.md` — no change; zero hits.
  - `docs/AGENT-NEUTRALITY.md` — **no change, re-checked at HEAD.** `.2` argued its `docs/PLATFORMS.md` edit needed no ledger row because the ledger explicitly defers platform-wiring documentation to PLATFORMS.md; that deferral still reads as described (lines 18, 77, 82) and PLATFORMS.md still holds no row of its own. This audit's edit is wiring-layer (`claude/skills/`), which the ledger excludes by construction. Conclusion stands for the cohort as a whole.
  - `docs/PLATFORMS.md` — **no change; updated earlier in the cohort by `.2`.** Its single hit is line 87's "`/ft-release` §7.1 verifies both surfaces" inside the "Flowtron's own checkout is not an adopter" paragraph — still accurate, since this audit changed only prose inside that check, not what it verifies.
  - `claude/CAPABILITIES.md` — no change; zero hits. Stamp `v5.15.0 · 2026-08-02 (dogfooded)` untouched — no capability trigger, flag, or operator primitive was added or removed anywhere in the cohort.
  - `docs/AGENT-COMPAT.md` — no change; zero hits. No per-agent consume-mode or dogfood stamp affected.
  - `docs/EXTERNAL-AGENTS.md` — no change; zero hits. No delegation or handoff surface touched.
  - `docs/WORKTREES.md` — no change; zero hits.

  Verdict: **14/14 swept, 0 updated by this audit** (`docs/PLATFORMS.md` was the cohort's one doc update and landed in `.2`). Also checked outside the declared set: `docs/GLOSSARY.md:61`'s `/ft-sidequest` mention is a correct historical parenthetical.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The `CORE-EPIC-410` cohort holds together, and its central claim survives independent re-testing: `/ft-release` §7.1's self-wiring check, run verbatim by a session that did not build it, prints clean on both halves a day after `.4` closed. That is the epic's whole point — flowtron's installed surface is now verified by resolving symlinks rather than by comparing declaration files to each other, and the detector goes green without operator knowledge.

Cohort inventory: `.2` built the check (a fourth `/ft-release` §7.1 standing block — blocking local half, advisory global half — plus the `docs/PLATFORMS.md` "not an adopter" policy it asserts against and a §7.4 verdict bullet); `.3` cleared the local finding with two `.claude/` `ft-spec` symlinks; `.4` cleared the global one by deleting 9 dangling `~/.claude/` links and re-pointing 26 to the true `Code` casing. Verification at audit time: all five §7.1 commands at their pass conditions (global casing exactly one line, `23 /Users/fakeneuron/Code/flowtron`), sibling shipped-skill parity identical at 18 slugs, and 18/18/18/18 across shipped and locally-wired skills and commands.

One inline fix landed — 1 file, 1 sentence. `claude/skills/ft-release/SKILL.md:350` told the operator that a `DANGLING` hit came from one of three folds "each stranding one," which is three; the check was built to report **nine**, measured in the same session that wrote the sentence. The `/ft-audit <domain>` fold stranded five, and `/ft-quality`'s retirement — a skill *and* a command — went unmentioned. `docs/MIGRATION.md` §"Skills retired so far" had all four right the whole time, so the cohort's own deliverable contradicted the authoritative table two files away. Now corrected to the measured 5 + 1 + 1 + 2 breakdown and pointed at that table, so the count has one home.

Two findings were deliberately left for the operator rather than patched into a release gate mid-audit. **(a)** The local half's `diff -u` compares `ls` names and its dangling scan filters `-type l`, so a skill directory *copied* into `.claude/` instead of symlinked passes all three commands and then silently diverges from source — the epic's own failure mode, one layer in. Swept and confirmed latent, not live: all 36 local `ft-*` entries are symlinks resolving into `../../claude/`. **(b)** `.4`'s decision to leave `~/code/flowtron` lowercase in `README.md`, `docs/MIGRATION.md`, and `codex/AGENTS-snippet.md` (correct — generic clone destinations, not this machine's path) is recorded only in its archived Testing Notes; the operator who next sees the casing report has no reason to read it, and the obvious remediation would reverse it.

No refactor. Documentation verdict: 14/14 AI-referenced entries swept cumulatively for the cohort, 0 updated by this audit — `docs/PLATFORMS.md` was the cohort's single doc change and landed in `.2`. `docs/AGENT-NEUTRALITY.md` re-checked at HEAD and its no-row conclusion re-confirmed.

Maintainability effect: the wiring seam's detector now reads correctly as well as running correctly. A standing check earns trust by being right about small things too — an operator who reads "three folds, one each" against a nine-line report learns to discount the prose, and prose is where a check explains what its output means.

**Parent-flip decision:** operator confirmed **Yes** at the 📦 gate. `CORE-EPIC-410` flipped to stub form and the full cohort (`.2`, `.3`, `.4`, `.N`) moved atomically to the top of `## Completed` in the same commit. `## High` is left empty rather than carrying a `(none)` placeholder — this PLAN.md has no such placeholder anywhere (`## Future Opportunities` is likewise a bare heading), so matching the file's existing convention took precedence over the skill's generic instruction.

**Archived:** 2026-08-08
