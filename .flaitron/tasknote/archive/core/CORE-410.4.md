---
title: prune-stale-globals
status: completed
tags: []
created: 2026-08-07
due:
related-tasks: [CORE-EPIC-410, CORE-410.2, CORE-410.3, CORE-389.2, CORE-390, CORE-391, CORE-392]
---

# CORE-410.4 | prune-stale-globals

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-410]] [[CORE-410.2]] [[CORE-410.3]] [[CORE-389.2]] [[CORE-390]] [[CORE-391]] [[CORE-392]]

## 🎯 Goal

Clear the machine-global `~/.claude/` half of the wiring-parity gap: remove the nine symlinks left dangling by retired skill slugs, and re-point every surviving global link at the directory's true on-disk path casing so `/ft-release` §7.1's advisory half reports clean.

## ✅ Acceptance

- [x] All nine dangling `~/.claude/` links are gone — `ft-audit-{backend,docs,frontend,performance,security}`, `ft-debug`, `ft-quality`, `ft-sidequest` (skills) and `ft-quality.md` (command). Nothing else in `~/.claude/` is removed.
- [x] Every surviving global symlink target — the 23 `ft-*` links **and** the 4 `natabula-*` links — spells the home directory `/Users/fakeneuron/Code/…`, matching the true on-disk casing.
- [x] `/ft-release` §7.1's machine-global half, run verbatim, prints nothing for the dangling scan and exactly **one** line for the casing report.
- [x] `/ft-release` §7.1's local half still passes unchanged — the `.claude/` bidirectional diffs and broken-link scan stay silent (guards against collateral damage from [[CORE-410.3]]).
- [x] Every surviving link resolves to a real file/directory after the rewrite (no link broken by the re-point).
- [x] The epic's end-state done-signal is met: with `.3` and `.4` both landed, the full §7.1 check — local *and* global — is clean.

## 🧩 Subtasks

- [x] Snapshot the pre-change state of `~/.claude/{skills,commands}` for before/after evidence.
- [x] Surface the exact `rm` list for operator approval (destructive, outside the repo, not git-recoverable).
- [x] Remove the nine dangling links.
- [x] Re-point every mis-cased surviving link (`ft-*` + `natabula-*`) to `/Users/fakeneuron/Code/…` via `ln -sfn`.
- [x] Verify: all links resolve; dangling scan silent; casing report exactly one line.
- [x] Run `/ft-release` §7.1 in full (local + global halves) to confirm the epic's clean end state.
- [x] Doc-drift sweep, closure, archive.

## 🔗 Related

- [[CORE-EPIC-410]] — parent epic: nothing verifies flowtron's own installed skill/command surface.
- [[CORE-410.2]] — built the `/ft-release` §7.1 check that measured these nine links and the casing split; this task clears what it found.
- [[CORE-410.3]] — sibling: cleared the *local* `.claude/` half (`ft-spec`). Together, `.3` + `.4` make the check print clean.
- [[CORE-389.2]] — folded the five `ft-audit-<domain>` skills into `/ft-audit <domain>`, stranding five links.
- [[CORE-390]] — folded `/ft-debug` into `/ft-task --debug`, stranding one.
- [[CORE-391]] — folded `/ft-sidequest` into `/ft-file-followup --park`, stranding one.
- [[CORE-392]] — retired `/ft-quality`, stranding its skill + command pair.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Re-measured live today — the nine dangling links are all still present and still dangling, and the casing split still stands. The check that reports them ([[CORE-410.2]]) shipped yesterday, so this is the freshest possible ticket.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read set.** `SPEC.md`, `SPEC/epic.md`, `.flowtron/tasknote/README.md`, `claude/skills/ft-release/SKILL.md` §7.1 + §7.4, `docs/PLATFORMS.md` §"Installed-surface policy", the archived [[CORE-410.2]] tasknote, plus live inventories of `claude/{skills,commands}`, `.claude/{skills,commands}`, and `~/.claude/{skills,commands}`.

**Measured current state (2026-08-07).**

- Shipped: 18 skills + 18 commands. Local `.claude/`: 18 + 18, exact match both directions — [[CORE-410.3]] closed the `ft-spec` gap, so the blocking half of §7.1 is already green.
- Global `~/.claude/`: 32 `ft-*` links (25 skills + 7 commands) plus 4 `natabula-*` skill links. Exactly 9 dangle, and the slug list matches the PLAN line character-for-character.
- Casing across all 36 global links: 34 spell `/Users/fakeneuron/code`, 2 spell `/Users/fakeneuron/Code` (`ft-sidequest`, which is one of the nine being deleted, and `ft-update`).

**Every dangling link maps to a deliberate retirement.** None is an accident to investigate — each is residue from a fold that landed upstream and never reached back into machine state: the five `ft-audit-<domain>` slugs to [[CORE-389.2]]'s `/ft-audit <domain>` fold, `ft-debug` to [[CORE-390]]'s `/ft-task --debug`, `ft-sidequest` to [[CORE-391]]'s `/ft-file-followup --park`, and the `ft-quality` skill + command pair to [[CORE-392]]'s outright retirement. Cross-checked against the shipped inventory: not one of those slugs exists under `claude/skills/` or `claude/commands/` today. Deleting them removes no reachable capability.

**Drift found — the casing target was undecided, and the majority answer is the wrong one.** The PLAN line says "normalize every remaining target to one path casing (`~/code/` vs `~/Code/` currently mixed)" without naming which. The obvious reading is majority-wins → lowercase `code`, a single relink. That reading is wrong. The true on-disk directory is `/Users/fakeneuron/Code` (verified by `find -maxdepth 1 -iname code`, which prints the real entry name rather than echoing the query). So 34 of 36 links currently resolve only because the boot volume is case-insensitive — and the *stated rationale* for the casing check in `claude/skills/ft-release/SKILL.md:350` is precisely that mixed casing "resolves on a case-insensitive volume and silently stops resolving on a case-sensitive one." Normalizing down to `code` would make the check print its one clean line while leaving all 23 surviving links latently broken: a green check over the exact failure mode the check was written to catch. Surfaced to the operator; resolved to `Code`.

**Clarifications asked (2, both resolved to the recommended option).**

1. *Casing target* → **`Code`, the true on-disk casing.** ~22 relinks instead of 1. Chosen because it is the only option under which a clean §7.1 casing report means the links are actually correct, per the drift note above.
2. *Scope — include the 4 `natabula-*` links?* → **Yes.** They carry the identical lowercase defect but fall outside §7.1's `-name 'ft-*'` filter, so the check will never report them. The PLAN line says "every remaining target," and stopping at the boundary of a grep pattern would leave a known-defective residue of exactly the kind this epic exists to eliminate. Four extra one-line relinks, no added risk.

**Assumptions asserted (not asked).**

- `~/.claude/skills/clean-stray` and `~/.claude/skills/polite-scraping` are real directories, not symlinks, and are untouched.
- Re-pointing a link to differently-cased spelling of the same real path is a no-op for resolution on this machine, so no skill's behavior changes today. The benefit is portability and honesty of the recorded target, not a fixed breakage.
- Global "missing" stays unchecked and unfixed — `docs/MIGRATION.md` §1.0 makes global installs discretionary, a point [[CORE-410.2]] deliberately encoded. This task does not add any global link.

**Deliverable lives outside the repo — closure is workflow-only.** Every change this task makes is machine state under `~/.claude/`; no tracked file changes. SPEC §"Paper-complete guard" §2's workflow-only carve-out covers exactly this ("pure filing / Discovery / audit-with-no-code tasks may land PLAN + archive alone when Acceptance has no other deliverable surfaces"), and [[CORE-410.2]] anticipated it in writing: `~/.claude/` is "machine state — no commit in this cut can carry the fix." The closure commit is therefore PLAN + archive only, by design rather than by omission, and the verification evidence in Testing Notes is what stands in for a diff.

**Destructive-action posture.** Nine `rm` calls on paths outside `~/code/`, not recoverable by git. Per SPEC §"Operator-cue glossary" the destructive-action escalation applies, and the global `CLAUDE.md` guardrail asks for conservatism outside `~/code/`. The exact command list goes to the operator for approval before anything is removed, even though the PLAN line already authorizes the removals in the abstract.

**Best Practices Review.** `N/A` — no code, no module boundaries, no repo files. The work is filesystem state changes plus verification.

Discovery surfaced no significant deviation → skip 🛠️. Both clarifications resolved to the recommended option and neither changed the approach, the surface, or the subtask shape: the casing answer picked a direction the PLAN line had left open rather than reversing one it had set, and the natabula answer widened the target set by four identical one-line operations. Root cause, edit surface, and sequencing are unchanged from the PLAN line.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** `docs/MIGRATION.md` §"Skills retired so far" already prescribes the adopter-facing shape for this exact cleanup — locate the stranded links, then "Remove each hit with `rm`. The commands are safe: these are symlinks into the submodule, never real files." This task is that procedure applied to the maintainer's own machine, so it follows it rather than inventing a cleanup motion. No new script, no tool, nothing added to the repo — consistent with SPEC §"What flowtron does NOT provide". `N/A` on DRY/SRP/composition: no code.

**Minimal refactor gate.** No refactor. Zero repo files touched.

**Operator approval.** The nine removals were surfaced as a destructive-action escalation (paths outside the repo, not git-recoverable) with each link's retiring task named, and executed on an explicit 🟢 go.

**Step 1 — removals (9).** Each `rm` was guarded by `[ -L "$f" ] && [ ! -e "$f" ]`, so the command could only ever remove a path that was *both* a symlink *and* already broken. A live link or a real file would have printed `SKIPPED` instead. All nine reported `removed`; none skipped.

**Step 2 — re-points (26).** A single loop over every symlink in `~/.claude/{skills,commands}` rewrote the target prefix `/Users/fakeneuron/code/` → `/Users/fakeneuron/Code/` with `ln -sfn`, guarded by an `[ ! -e "$new" ] && exit 1` pre-check so a rewrite that would have produced a broken link aborted the whole run before touching anything. Result: **26 re-pointed, 1 already correct** (`ft-update`, the sole pre-existing `Code` link once `ft-sidequest` was deleted). That accounts for all 27 surviving links — 23 `ft-*` + 4 `natabula-*`.

Deliberately prefix-anchored (`${old/#…}`) rather than a bare substitution, so only the leading home-directory segment could change; a `code` appearing later in a path would have been left alone.

**Not touched.** `~/.claude/skills/clean-stray` and `~/.claude/skills/polite-scraping` are real directories, not links, and the loop skips non-links by construction (`[ -L "$f" ] || continue`). Verified present and unmodified after the run. No global link was added — global *missing* stays an operator choice per `docs/MIGRATION.md` §1.0.

**No repo deliverable, by design.** `git status --porcelain` after both steps shows only the untracked tasknote. See the Discovery note on the workflow-only closure carve-out.

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

The change is machine state, so the test *is* the check [[CORE-410.2]] built for it. `claude/skills/ft-release/SKILL.md` §7.1 was run **verbatim, both halves**, as the operator's own release procedure would run it.

**1. Global half (the target) — clean.**

- Dangling scan: **no output**. Was 9 lines before.
- Casing report: **exactly one line** — `23 /Users/fakeneuron/Code/flowtron`. Was two (`30 …/code`, `2 …/Code`) when [[CORE-410.2]] measured it. Both of the check's stated pass conditions are met.

**2. Local half — still clean (regression guard).** Both `diff -u` exact-set comparisons silent, broken-link scan silent. This is not incidental: it confirms the global work did not disturb [[CORE-410.3]]'s `.claude/` wiring, and it is the half that *blocks* a release cut.

**3. Every surviving link resolves.** Independent sweep over all 27 links (`[ -e "$f" ]` per link, including the 4 `natabula-*` outside §7.1's `ft-*` filter): zero broken. The re-point could not have stranded anything.

**4. Before/after snapshot diff — the change is exactly what was authorized, and nothing more.** Full pre- and post-state captured to scratchpad and diffed. The diff contains precisely two classes of change: the 9 removed lines (exactly the approved slug list) and 26 target-casing rewrites. No link added, no link's *name* changed, no non-link entry touched, `ft-update` correctly untouched as already-correct. 38 entries before → 29 after (38 − 9).

**5. Repo lint/tests — `N/A` with reason.** `git status --porcelain` shows only the untracked tasknote: no source, no markdown, no config changed. The viz suites (`npm --prefix viz test/lint/typecheck`) and `node --test tools/update-adopters.test.mjs` cover `viz/` and `tools/`, neither in this diff. Running them would test nothing this task touched.

**6. Quality assertions.** `N/A` — no code changed. The adjacent claim that *does* deserve assertion is that no capability was lost: each of the nine deleted slugs was cross-checked against the live shipped inventory (`ls claude/skills`, `ls claude/commands`) and none exists upstream, so every deletion removed an unreachable link rather than a working entry point.

**7. `👁️` visual confirmation** — `N/A`, no frontend surface.

**Recurrence vector, noted not fixed.** `docs/MIGRATION.md` §1.2.2's maintainer hot-reload snippet is `ln -s ~/code/flowtron/claude/skills/* ~/.claude/skills/` — lowercase. Re-running it on this machine would reintroduce the exact casing drift just cleaned. It is deliberately left alone: `~/code/flowtron` there is a *generic clone destination* for any reader, correct for anyone who actually clones to a lowercase path, and rewriting it to `~/Code/` would impose one maintainer's local directory casing on every adopter. The recurrence is instead covered by design — §7.1's casing report is the standing detector that catches it at the next cut, which is precisely what [[CORE-EPIC-410]] exists to provide.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Two greps drove the sweep rather than per-file reading: one for the nine retired slugs across the whole doc set, one for `~/code/flowtron` path literals and `ln -s` install commands. Verdicts below cite those results.

  - `README.md` — **no change, checked deliberately.** Lines 31-33 carry `git clone … ~/code/flowtron` + two `ln -s ~/code/flowtron/…` commands. Left as-is: that path is a generic clone destination for any reader, correct for anyone who clones lowercase. Normalizing it to `~/Code/` would publish one maintainer's local directory casing as adopter instruction. Neither command references a retired slug.
  - `SPEC.md` — no change. Line 49 ("when working in `~/code/flowtron/`") is the same generic shorthand; the contract enumerates no global install state.
  - `docs/MIGRATION.md` — **no change, checked closely — it is the doc most likely to be stale and is not.** §"Skills retired so far" (lines 474-479) lists all four retirements (`ft-debug`, `ft-sidequest`, `ft-quality`, `ft-audit-{backend,frontend,security,performance,docs}`) with replacements, and the preceding paragraph already prescribes exactly this cleanup ("Remove each hit with `rm`. The commands are safe: these are symlinks into the submodule, never real files"). That table is a deliberate historical record and correct as written — the fix here was the machine catching up to the doc, not the reverse. §1.2.2's lowercase hot-reload snippet is left alone per the recurrence-vector note in Testing Notes.
  - `claude/AGENTS-snippet.md` — no change; adopter repo-scoped wiring, no retired slug, no global install command.
  - `codex/AGENTS-snippet.md` — no change. Line 57's `ln -s ~/code/flowtron/codex/skills/*` targets `~/.agents/skills/`, a Codex surface this task never touched, and the same generic-path reasoning applies.
  - `docs/CONVENTIONS.md` — no change; no retired-slug or path hits.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change; no contract-layer edit was made at all (zero repo files changed), so there is nothing to ledger.
  - `docs/PLATFORMS.md` — **no change, checked deliberately.** §"Installed-surface policy" is the authority this task's global half asserts against, and [[CORE-410.2]] updated it one task ago. Its two governing sentences — global installs are discretionary, only *broken* links there are drift — describe exactly the end state now reached. No retired slug appears in its policy table.
  - `claude/CAPABILITIES.md` — no change; no flag, skill, or operator primitive added or removed.
  - `docs/AGENT-COMPAT.md` — no change; no dogfood stamp or per-agent consume-mode affected.
  - `docs/EXTERNAL-AGENTS.md` — no change; no delegation or handoff surface touched.
  - `docs/WORKTREES.md` — no change.

  Verdict: 14/14 swept, 0 updated. Also checked outside the declared set: `docs/GLOSSARY.md:61` names `/ft-sidequest` only as a historical parenthetical ("filed via the retired `/ft-sidequest` skill before v5.15.0"), which is accurate.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

The machine's global Claude wiring now matches what flowtron actually ships. Nine `~/.claude/` symlinks pointing at skill slugs retired four releases ago were deleted, and every surviving link — 23 `ft-*` plus 4 `natabula-*` — was re-pointed at the home directory's true on-disk casing. `/ft-release` §7.1's advisory global half, which reported 9 dangling links and a split casing yesterday, now reports nothing and a single casing line.

Deliverables are entirely machine state: **0 repo files changed**, 9 links removed, 26 re-pointed, 1 already correct. The removals were guarded so each `rm` could only fire on a path that was both a symlink and already broken; the re-points were prefix-anchored and pre-checked so a rewrite producing a broken link would have aborted the run. Verification ran §7.1 verbatim — global half clean on both conditions, local half still clean as a regression guard on [[CORE-410.3]] — plus an all-27-link resolution sweep and a before/after snapshot diff confirming the change set contains exactly the nine authorized deletions and 26 casing rewrites and nothing else.

The one judgment call worth recording: the PLAN line left the casing *target* open, and the obvious majority-wins reading (34 of 36 links spelled `code`) was the wrong answer. The directory is really `/Users/fakeneuron/Code`, so those 34 resolved only by grace of a case-insensitive volume — and the check's own stated rationale is that mixed casing "silently stops resolving on a case-sensitive one." Normalizing down to `code` would have produced a green one-line report over 23 latently-broken links: the check passing while the defect it exists to catch got worse. Normalizing up to `Code` costs 25 extra relinks and makes a clean report mean something. The operator confirmed both that and the decision to include the 4 out-of-scope `natabula-*` links, which carry the identical defect but fall outside §7.1's `ft-*` filter and would never have been reported.

No refactor (no code). Documentation verdict: 14/14 AI-referenced entries swept, **0 updated** — and the notable finding is that `docs/MIGRATION.md` was already correct, carrying both the retirement table and the `rm` cleanup procedure this task executed. The drift was the machine lagging the docs, not the docs lagging the code. Deliberately left alone: §1.2.2's lowercase `ln -s ~/code/flowtron/…` hot-reload snippet, which would reintroduce the drift if re-run here but is correct as generic adopter instruction — the recurrence is covered by the standing §7.1 casing check rather than by publishing one maintainer's path casing.

Maintainability effect: [[CORE-EPIC-410]]'s done-signal is now live. The check [[CORE-410.2]] built prints clean on both halves for the first time — `.3` cleared the local miss, `.4` the global residue — so from the next release cut forward, any output at all from §7.1 is a genuine new regression rather than known-and-tolerated noise. A detector that always reports findings is one people learn to skim; this is the point at which it becomes a signal.

**Archived:** 2026-08-07
