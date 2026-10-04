---
title: parity-check
status: completed
tags: []
created: 2026-08-06
due:
related-tasks: [CORE-EPIC-410, CORE-410.3, CORE-410.4, CORE-349.5, CORE-329.2]
---

# CORE-410.2 | parity-check

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-410]] [[CORE-410.3]] [[CORE-410.4]] [[CORE-349.5]] [[CORE-329.2]]

## 🎯 Goal

Add a standing release check that diffs flowtron's shipped `claude/skills/` + `claude/commands/` inventory against its own resolved local `.claude/` wiring and the machine-global `~/.claude/` wiring, reporting missing and dangling entries in both directions.

## ✅ Acceptance

- [x] `/ft-release` §7.1 carries a fourth standing check that resolves **actual symlinks** under `.claude/` and `~/.claude/` — the first §7.1 check that reads filesystem state rather than comparing one declaration file to another.
- [x] **Local half (blocking):** exact-set bidirectional diff of `.claude/{skills,commands}` `ft-*` entries against the shipped `claude/{skills,commands}` inventory, plus a broken-link scan. Posture matches its three siblings — fix inline as Critical/High before cutting.
- [x] **Global half (advisory):** dangling-link scan over `~/.claude/{skills,commands}/ft-*` and a mixed-path-casing report. Never blocks commit-go; the verdict rides into the §7.4 closure review as one line, mirroring the SOP-currency check.
- [x] Global "missing" is explicitly **not** checked, with the reason stated inline (`docs/MIGRATION.md` §1.0 makes global installs discretionary).
- [x] `docs/PLATFORMS.md` §"Installed-surface policy" states the flowtron-self repo-scoped wiring rule the local half asserts against, so the check tests a documented policy rather than its own assumption.
- [x] The block runs correctly **as written in zsh** (the operator's shell) — no unmatched-glob aborts, no bare-`$var` word-split false negatives (the [[CORE-409]] silent-false-negative class).
- [x] Executed against live state: reports exactly the 11 known discrepancies (2 local-missing + 9 global-dangling) and the casing split, with zero false positives.

## 🧩 Subtasks

- [x] Add the flowtron-self repo-scoped wiring rule to `docs/PLATFORMS.md` §"Installed-surface policy".
- [x] Draft the standing check block in `claude/skills/ft-release/SKILL.md` §7.1, after the installed-surface policy check.
- [x] Local half — bidirectional exact-set diffs for skills + commands, glob-free broken-link scan, blocking framing.
- [x] Global half — dangling scan + casing report, advisory framing, with the not-checking-missing rationale inline.
- [x] Carry the advisory verdict into §7.4's closure-review bundle alongside the SOP-currency verdict line.
- [x] Execute the block verbatim in zsh; confirm the 11 known findings + casing split and no false positives.
- [x] Doc-drift sweep, closure, archive.

## 🔗 Related

- [[CORE-EPIC-410]] — parent epic: nothing verifies flowtron's own installed skill/command surface.
- [[CORE-410.3]] — sibling: adds the two missing `.claude/` `ft-spec` symlinks this check will flag.
- [[CORE-410.4]] — sibling: prunes the nine dangling `~/.claude/` links this check will flag.
- [[CORE-349.5]] — precedent: the last release-guardrail child; established the `§7.1 Standing … check` shape this extends.
- [[CORE-329.2]] — the drift class the existing symlink-count check was built for.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is live and re-measured today — `.claude/` is missing `ft-spec` (both skill + command) and nine `~/.claude/` links dangle; none of `/ft-release` §7.1's three standing checks look at resolved filesystem wiring.

- [x] Read relevant source files

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read set.** `SPEC.md`, `SPEC/epic.md`, `claude/skills/ft-release/SKILL.md` (§7.1 standing checks), `docs/PLATFORMS.md` §"Installed-surface policy", `docs/MIGRATION.md` §1.0 + §1.2, `claude/AGENTS-snippet.md`, plus live filesystem inventories of `claude/{skills,commands}`, `.claude/{skills,commands}`, and `~/.claude/{skills,commands}`.

**Measured current state (2026-08-06).**

- Shipped: 18 skills under `claude/skills/`, 18 commands under `claude/commands/`. `codex/skills/` matches at 18 (existing parity check covers that axis).
- Local `.claude/`: 17 skills + 17 commands. Missing exactly `ft-spec` on both — shipped 2026-07-12 (CORE-352.2), wired into the *adopter* snippet (`claude/AGENTS-snippet.md:59-60`) and into `/ft-new-project` Step 3, never into flowtron's own checkout. No dangling local entries.
- Global `~/.claude/`: 9 dangling links — `ft-audit-{backend,docs,frontend,performance,security}`, `ft-debug`, `ft-quality`, `ft-sidequest` (skills) and `ft-quality.md` (command). All point at slugs retired into `/ft-audit <domain>` (CORE-389.2), `/ft-task --debug` (CORE-390), `/ft-file-followup --park` (CORE-391), and `/ft-quality`'s retirement (CORE-392).
- Global link targets use mixed path casing: `/Users/fakeneuron/code/flowtron/…` on most, `/Users/fakeneuron/Code/flowtron/…` on `ft-sidequest` + `ft-update`. Both resolve on a case-insensitive macOS volume, so casing alone never dangles.

**Archive skim.** [[CORE-349.5]] is the direct precedent — it split the old Claude/Codex check into a *shipped-skill parity* check and an *installed-surface policy* check, both as shell blocks in `/ft-release` §7.1 with the "fix inline as Critical/High before cutting the release" posture. Its stated design principle: keep flowtron's no-runtime-validator posture and encode shellable release-time checks in the standing release procedure. That is the shape to extend, not replace. [[CORE-329.2]] motivated the symlink-*count* check; [[CORE-352.2]]/[[CORE-352.3]] shipped `ft-spec` and wired it for adopters only.

**The gap, precisely.** All three existing §7.1 standing checks read *declared* wiring — `claude/AGENTS-snippet.md`, `docs/MIGRATION.md`, `ft-new-project/SKILL.md`, `codex/AGENTS-snippet.md`. Every one of them compares one text file to another text file. None resolves an actual symlink. `ft-spec` passes all three today (it is correctly declared everywhere) and is still unrunnable in this checkout.

**Drift check.** PLAN-line claims re-verified against live state: the two missing `.claude/` symlinks ✅, the nine dangling `~/.claude/` links (exact slug list matches) ✅, mixed path casing ✅, `/ft-release` grepping only the adopter wiring list ✅. No SPEC contract contradiction: SPEC §"What flowtron does NOT provide" bans schema validators and runtime scanners, and this check is a shell block inside an existing skill procedure — the same form [[CORE-349.5]] already landed. `docs/PLATFORMS.md` §"Installed-surface policy" is the authority for adopter vs global vs flowtron-self categories and is consistent with the design below.

**Drift found — the PLAN line's done-signal.** The child line reads "Done-signal: the check prints an empty diff." The check cannot print an empty diff when this task closes: the findings it will surface are exactly what [[CORE-410.3]] and [[CORE-410.4]] exist to fix. That done-signal belongs to the epic's end state, not to this child. This task's deliverable is the check itself, verified by executing it and confirming it reports the known 11 discrepancies (2 local-missing + 9 global-dangling) with no false positives; the empty diff arrives after `.3` and `.4` land.

**Clarifications asked (3, all resolved to the recommended default).**

1. *Global-surface strictness* → **dangling-only**. `docs/MIGRATION.md` §1.0 ("install each you want") makes global installs an operator choice, so there is no mandatory set to diff "missing" against; inventing one would turn a documented choice into release-blocking policy. Local `.claude/` keeps the strict bidirectional diff.
2. *Path casing* → **flag it**. [[CORE-410.4]] normalizes once; without a standing check the drift returns on the next hand-run `ln -s`. Casing alone never dangles on a case-insensitive volume, so it is reported separately from the dangling scan.
3. *Gate posture* → **local blocks, global advises**. A `.claude/` symlink is committed repo state and its fix lands in the release commit; a `~/.claude/` symlink is machine state no commit can carry, so blocking a cut on it would be unfixable-in-band. Advisory posture mirrors the SOP-currency check ([[CORE-397]] / [[CORE-409]]).

**Assumption asserted (not asked).** Flowtron's own `.claude/` wires the **full** shipped inventory — it is not an adopter, so `docs/PLATFORMS.md`'s adopter-subset policy does not govern it. Evidence: 17 of 18 slugs are already wired, including `ft-release` (flowtron-self-only) and the global-only utilities. This rule is currently undocumented, which is why the check would otherwise assert against its own assumption; Phase 2 states it in `docs/PLATFORMS.md` so the check tests a written policy, matching how the sibling installed-surface check asserts against the policy table.

**Best Practices Review.** No code changes — the deliverable is a markdown procedure block in `claude/skills/ft-release/SKILL.md` §7.1, alongside three sibling standing checks. Responsibility boundary: `/ft-release` owns release-time standing checks (established by [[CORE-349.5]]); `docs/PLATFORMS.md` owns the policy the checks assert against. Duplication risk is low — the new check reads a surface (resolved symlinks) that none of the three existing blocks touch. No refactor required; no cleanup deferred.

Discovery surfaced no significant deviation → skip 🛠️. The three clarifications refined the check's contract inside the stated scope and all resolved to the recommended default; the approach, root cause, and primary edit surface (`claude/skills/ft-release/SKILL.md` §7.1) are unchanged from the PLAN line. One surface not named in the PLAN line is added — a one-sentence policy statement in `docs/PLATFORMS.md` — because the local half must assert against a written rule rather than its own assumption.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Three sibling blocks in `/ft-release` §7.1 already carry the shape [[CORE-397]] named: a bolded `**Standing … check**` lead, a one-paragraph "why this exists" with the incident that motivated it, a fenced shell block, and an explicit pass condition + posture sentence. The new block extends that shape rather than inventing one. The advisory half additionally borrows the SOP-currency check's flag-don't-block wording and its §7.4 closure-review verdict line, so the two advisory checks read identically at the gate. No new file, no script, no validator — consistent with SPEC §"What flowtron does NOT provide" and with [[CORE-349.5]]'s stated principle of encoding shellable release-time checks in the standing procedure.

**Minimal refactor gate.** No refactor. The three existing blocks are untouched; the new one reads a surface (resolved symlinks) none of them touch, so there is no duplication to fold. `docs/PLATFORMS.md` gained a paragraph, not a restructure.

**Deliverables.**

1. `docs/PLATFORMS.md` §"Installed-surface policy" — new paragraph "**Flowtron's own checkout is not an adopter.**" States the rule the local half asserts against: flowtron's `.claude/` mirrors the full shipped inventory (it is not an adopter, so the adopter-subset policy does not govern it), a shipped slug with no `.claude/` symlink is a miss rather than a policy choice, and machine-global `~/.claude/` installs stay discretionary so only broken links there are drift. Without this the check would assert against its own assumption; with it, the check tests written policy exactly as the sibling installed-surface check does.

2. `claude/skills/ft-release/SKILL.md` §7.1 — new "**Standing self-wiring parity check**" block after the installed-surface policy check, in three parts:
   - *Lead* — names the gap concretely: the three existing checks each compare one declaration file to another and never resolve a symlink, which is why `/ft-spec` passed all three while being unrunnable in this checkout for a month.
   - *Local half (blocking)* — two `diff -u` exact-set comparisons (skills, commands) plus a broken-link `find`. `.claude/` is committed repo state, so a finding is Critical/High and fixed inline before the cut, matching all three siblings.
   - *Global half (advisory)* — a dangling-link `find` and a casing report (`readlink | sed | uniq -c`, which must print exactly one line). Missing is deliberately not checked, with `docs/MIGRATION.md` §1.0's discretionary wording cited inline as the reason. Never blocks commit-go; verdict rides into §7.4.

3. `claude/skills/ft-release/SKILL.md` §7.4 — new "**Global self-wiring verdict (advisory)**" bullet beside the SOP-currency verdict, carrying the one-line result into the closure-review bundle and stating that the local half is absent here because it has already blocked upstream.

**Why `find` and not a glob loop.** The obvious spelling — `for l in ~/.claude/skills/ft-*` — is wrong in the operator's actual shell. zsh treats an unmatched glob as an *error* and aborts the whole command before the loop body runs, so a machine with no global `ft-*` installs would abort the check rather than report clean. That is the [[CORE-409]] silent-false-negative class in a new costume, so the block is glob-free and carries a "do not simplify" note pointing at the same precedent. Verified empirically in Phase 3.

**Not built (noted, not filed).** The check covers the Claude wiring surface only. The Codex equivalent would be `.agents/skills/`, which does not exist in this checkout — `codex/skills/ft-release/SKILL.md` is a 15-line pointer at the Claude body whose standing translation rule ("treat `.claude/` paths as Claude-only install paths") already covers the asymmetry. Building a Codex-side half now would be speculative future-proofing against a directory that isn't there.

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

The deliverable *is* executable shell, so it was tested by execution rather than by reading — every command below was run verbatim as it appears in the skill, in zsh (`$SHELL` = `/bin/zsh`, the shell the operator runs `/ft-release` from).

**1. Live run against the real repo + machine — 11 findings, zero false positives.**

- Local skills diff: one `-ft-spec` line, exit 1.
- Local commands diff: one `-ft-spec.md` line, exit 1.
- Local dangling scan: no output (correct — nothing local dangles).
- Global dangling scan: exactly 9 lines with targets — `ft-audit-{backend,docs,frontend,performance,security}`, `ft-debug`, `ft-quality`, `ft-sidequest` (skills) and `ft-quality.md` (command).
- Global casing report: two lines — `30 …/code/flowtron`, `2 …/Code/flowtron` (the two being `ft-sidequest` + `ft-update`), correctly flagging mixed casing.

Findings match the [[CORE-EPIC-410]] audit's independent count exactly, and each maps to a named cause: `ft-spec` to [[CORE-352.2]], and the dangling set to the `/ft-audit <domain>` fold ([[CORE-389.2]]), `/ft-task --debug` ([[CORE-390]]), `/ft-file-followup --park` ([[CORE-391]]), and `/ft-quality`'s retirement ([[CORE-392]]).

**2. Fixture test — proves the clean state and both diff directions.** Built a scratch fixture (3 shipped skills + 3 shipped commands, fully symlinked) and ran the same three local commands: **all silent** — the empty-diff done-signal is reachable, so the check will go green once [[CORE-410.3]] lands. Then broke it two ways at once — deleted shipped `ft-b` (leaving a live link to a dead slug) and added an `ft-z` link to a never-shipped slug — and re-ran: the diff surfaced `+ft-b` and `+ft-z`, and the dangling scan caught both. Missing-locally is proven by the real-repo `-ft-spec` above, so both directions are covered by evidence rather than by inspection.

**3. zsh glob-abort — the design rationale, verified not assumed.** `for l in /tmp/definitely-no-such-dir/ft-*; do echo body; done` in zsh produced `no matches found` and exited 1 **without running the loop body** — it aborted the enclosing command outright, taking the following `find` down with it. The `find` spelling over the same nonexistent path exits clean and prints nothing. This is why the block is glob-free and carries the do-not-simplify note; a glob loop would have turned "no global installs" into an aborted check on a fresh machine.

**4. Lint / type-check.** `git diff --check` clean (no whitespace errors). No code changed — both edits are markdown prose + fenced shell inside existing documents — so the viz lint/typecheck/test and `update-adopters` suites are `N/A`: they cover `viz/` and `tools/`, neither of which this task touches.

**5. Quality assertions.** No duplication introduced — the new block reads resolved symlinks, a surface none of the three existing §7.1 checks touches. No dead content: every command was executed and every claim in the prose (the 9 dangling links, the two casings, the zsh abort, the `/ft-spec` month) is a measurement from this session. No public-surface growth — no new file, script, skill, or frontmatter field; the block lives inside an existing section of an existing skill. Documentation is not stale: `docs/PLATFORMS.md` was updated in the same change to carry the policy the check asserts against, so the check and its rule land together.

**6. `👁️` visual confirmation** — `N/A`, no frontend surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change; §"Repo layout" describes `claude/` but never enumerates release-time checks.
  - `SPEC.md` — no change; the contract does not enumerate `/ft-release`'s standing checks, and §"What flowtron does NOT provide" is satisfied (a shell block in an existing skill procedure, not a validator).
  - `docs/MIGRATION.md` — no change; §1.0's "install each you want" wording is what the global half cites as its reason for not checking missing, and it stands as written.
  - `claude/AGENTS-snippet.md` — no change; adopter wiring, and this check is flowtron-self.
  - `codex/AGENTS-snippet.md` — no change; same reason.
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — **no change, checked deliberately.** The `SKILL.md` edit is wiring-layer (`claude/`), which the ledger's Principle section excludes by construction. The `docs/PLATFORMS.md` edit *is* contract-layer and names `.claude/` / `~/.claude/` / `/ft-release` — but PLATFORMS.md carries no ledger row today despite its policy table already being dense with those paths, because the ledger explicitly defers platform-wiring documentation to that file ("It does NOT: spell out the platform-plug-in mechanism … see PLATFORMS.md"). The new paragraph is the same kind of wiring fact in the file designated to hold it, so it needs no row.
  - `docs/PLATFORMS.md` — **updated.** New paragraph in §"Installed-surface policy" stating that flowtron's own checkout is not an adopter and mirrors the full shipped inventory in `.claude/`, while global `~/.claude/` installs stay discretionary.
  - `claude/CAPABILITIES.md` — no change; no capability trigger added (no new flag, no new operator primitive).
  - `docs/AGENT-COMPAT.md` — no change; no dogfood stamp involved.
  - `docs/EXTERNAL-AGENTS.md` — no change; no delegation or handoff surface touched.
  - `docs/WORKTREES.md` — no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-release` now verifies flowtron's own installed skill surface by resolving symlinks, not by comparing declaration files to each other. That was the whole gap: all three pre-existing §7.1 standing checks read `claude/AGENTS-snippet.md`, `docs/MIGRATION.md`, `ft-new-project/SKILL.md`, and `codex/AGENTS-snippet.md` against one another, so `/ft-spec` — correctly declared in every one of them — shipped on 2026-07-12 and stayed unrunnable in this checkout for a month without a single check noticing.

Technical detail: `claude/skills/ft-release/SKILL.md` gains a "Standing self-wiring parity check" block in §7.1 (+~24 lines) and a matching advisory verdict bullet in §7.4's closure-review bundle (+1); `docs/PLATFORMS.md` gains a 10-line policy paragraph the check asserts against. The check is deliberately asymmetric: `.claude/` gets a bidirectional exact-set diff plus a broken-link scan and **blocks** the cut, because it is committed repo state whose fix lands in the same commit; `~/.claude/` gets a dangling-link scan and a path-casing report and only **advises**, because it is machine state no commit can carry — the same flag-don't-block posture as the SOP-currency check. Global *missing* is explicitly not checked, with `docs/MIGRATION.md` §1.0's discretionary-install wording cited inline as the reason.

Verification was by execution, in zsh, three ways: the live run reported exactly the 11 known discrepancies (2 local-missing + 9 global-dangling) plus the 30/2 casing split with zero false positives; a scratch fixture proved both the clean state (all three local commands silent — the empty-diff done-signal is reachable) and both diff directions; and the zsh unmatched-glob abort was reproduced directly, confirming the `find`-over-glob choice rather than assuming it. That last one is the [[CORE-409]] silent-false-negative class recurring in new form — a `for l in ~/.claude/skills/ft-*` loop would abort the entire check on a machine with no global installs, so the block is glob-free and says why.

No refactor: the three existing §7.1 blocks are untouched, and the new one reads a surface none of them do. Deferred deliberately: a Codex-side equivalent, since `.agents/` does not exist in this checkout and the Codex `ft-release` wrapper's standing translation rule already covers the asymmetry — building it now would be future-proofing against an absent directory. Documentation verdict: 14/14 AI-referenced entries swept, 1 updated (`docs/PLATFORMS.md`), with `docs/AGENT-NEUTRALITY.md` checked deliberately and found to need no row.

Scope note carried from Discovery: the PLAN line's "done-signal: the check prints an empty diff" is the **epic's** end state, not this child's. The check ships reporting 11 real findings; [[CORE-410.3]] clears the local two and [[CORE-410.4]] the global nine, at which point the fixture-proven clean state becomes the live state.

Maintainability effect: the wiring seam gains its first detector. Before this, a skill could ship, be declared in every wiring document, pass all three release checks, and still be uninstallable — with nothing in the process capable of noticing until a human tried to run it. That failure mode is now caught at every cut.

**Archived:** 2026-08-07
