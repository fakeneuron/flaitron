---
title: ci-drift-checks
status: completed
tags: []
created: 2026-08-24
due:
related-tasks: [CORE-465]
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

# CORE-464 | ci-drift-checks

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-465]]

## 🎯 Goal

Add a `drift` job to `.github/workflows/ci.yml` that runs the release-context-free subset of `/ft-release` §7.1 cross-file drift checks as inline `run:` steps, so drift is caught on the commit that lands it instead of at the next release cut.

## ✅ Acceptance

- [x] `.github/workflows/ci.yml` gains a second job `drift`, on the same `push` / `pull_request` → `main` triggers, `runs-on: ubuntu-latest`, checkout-only (no Node toolchain, no `fetch-depth: 0`), inheriting the workflow-level `permissions: contents: read` and reusing the CORE-434 SHA-pinned `actions/checkout`
- [x] The job runs six named steps, one per drift class: wrapper-name invariant · shipped-skill parity · Pair A clause presence · Pair B (Claude ↔ Codex description flags) · Pair C (template back-link depth) · Pair E (`ft-flowtron` roster row + flag coverage)
- [x] Each step **fails the build** on drift — the §7.1 blocks are print-nothing but exit 0, so each is wrapped in the minimal capture-and-test idiom; no drift class can print and pass
- [x] No new file is added to the repo — every check is inline `run:` shell lifted from `claude/skills/ft-release/SKILL.md` §7.1 or `SPEC.md` §"Skill namespace", modified only by the exit-code adaptation
- [x] All six steps pass against current HEAD (verified locally before the job lands)
- [x] `/ft-release` §7.1 is left unedited — it stays the release gate, and remains the broader superset (Pairs D, F–I, SOP currency, installed-surface policy, self-wiring, README counter are release-context or judgment checks that stay there)
- [x] §7.1 Pair H ("CI verbatim", `grep -E '^      - run: '`) still passes with the new job present, and `ci.yml` carries a one-line comment pinning the drift job's steps to the `- name:` + `run: |` shape that keeps it that way
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI" updated — it currently states the workflow reuses AGENTS.md §"Validation" verbatim, full stop, which stops being the whole truth once a second job lands

## 🧩 Subtasks

- [x] Add the `drift` job to `.github/workflows/ci.yml` with the checkout step + the guard comment
- [x] Port the six checks as `- name:` / `run: |` steps, each wrapped in the fail-on-output idiom
- [x] Validate the YAML parses and the job's shell is `bash -e`-safe (no unguarded failing command, no zsh-only glob assumption)
- [x] Re-run all six checks locally against HEAD; confirm clean
- [x] Re-run §7.1 Pair H (both halves) against the edited `ci.yml`; confirm clean
- [x] Update `docs/CONVENTIONS.md` §"GitHub Actions CI" to describe the two-job shape and what the `drift` job covers vs. what stays release-gated

## 🔗 Related

- [[CORE-465]] — follow-up; wiring-roster SSOT work is explicitly sequenced *after* this task and may retire whichever §7.1 checks the SSOT makes vacuous

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and was demonstrated in-tree three days ago: audit-structure's Finding #9 caught `/ft-refactor`'s `--fast` missing from its Codex mirror (a live Pair B failure sitting in `main`), filed as `CORE-469` and fixed inline. That is the class this ticket closes — the §7.1 checks are correct, they just only fire at a release cut. Scope narrows by one item (Pair A ships as clause-presence only, per the operator ask below) but the shape and intent are unchanged.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source set read.** `.github/workflows/ci.yml` (23 lines, one `validate` job) ·
`claude/skills/ft-release/SKILL.md` §7.1 (lines 252–552) · `SPEC.md` §"Skill
namespace" (118–135) · `AGENTS.md` §"Validation" · `docs/CONVENTIONS.md`
§"GitHub Actions CI".

**The six checks resolve to five §7.1 blocks plus one SPEC block.** The PLAN
line enumerates eight names, but two are aliases: "`ft-flowtron` roster diff"
*is* Pair E, and "template back-link depth" *is* Pair C. The actual set is
wrapper-name invariant · shipped-skill parity · Pair A · Pair B · Pair C ·
Pair E.

**Provenance drift in the PLAN line (non-blocking).** The line attributes the
wrapper-name invariant to `/ft-release` §7.1. It is not there — it lives in
`SPEC.md:126` §"Skill namespace" as its own grep-able block. The check is real
and release-context-free either way, so this changes nothing about what ships;
recorded so a reader does not go looking for it in the release skill.

**Pair A is not a pass/fail check (operator ask #1).** Its §7.1 shell is
`ls templates/` + `grep -n 'tasknote templates (full' README.md SPEC.md
claude/skills/ft-flowtron/SKILL.md`, and the prose then asks a human to
compare: "A file in the directory named by no clause, or a name in a clause
with no file, is the drift." The other five all carry a print-nothing / exit-0
contract. Making Pair A machine-checkable needs a filename→clause-token
derivation (`strip -template.md`, `strip leading tasknote-`, empty → `full`)
that exists nowhere in the repo — new logic, against this ticket's explicit
"No new script" constraint and `docs/PHILOSOPHY.md` §"Zero scripts".
**Operator chose clause-presence only:** CI asserts the three roster clauses
still exist (3 hits). That catches a clause deleted or reworded out from under
the release-time check; it does **not** catch a template added with the clauses
untouched — that half stays a §7.1 judgment call, and the CI step says so in a
comment.

**Pair H collision — the load-bearing find (operator ask #2).** §7.1 Pair H's
"CI verbatim" half extracts the workflow's commands with
`grep -E '^      - run: '` and diffs them against `AGENTS.md` §"Validation".
Six-space `- run: ` is today unique to `jobs.validate.steps`, so a `drift` job
written in that same shape would inject six `+` lines and **break the release
gate** the next time `/ft-release` runs. The drift job's checks are multi-line
loops, so they need `- name:` + `run: |` block scalars anyway — `      - name:`
and `        run: |` both miss the pattern, and Pair H stays clean with no
upstream edit. **Operator chose the comment guard:** a one-line note on the job
pinning that shape, rather than rewriting Pair H's extraction. Verified
empirically in Phase 3, not assumed.

**Archive skim** — `grep -l` for `.github/workflows/ci.yml` across
`archive/core/` returned 8 hits; four are load-bearing here:

- `CORE-430.2` (2026-08-10) minted `ci.yml` as a deliberate reversal of a
  decline reaffirmed three times (`CORE-099.1`, `CORE-115`, `CORE-321`). The
  accepted rationale is **off-machine placement** — CI duplicates gates that
  already exist inline precisely because it runs where Phase 3 didn't. That
  rationale extends to this task verbatim: §7.1 is a gate that only fires when
  a human cuts a release, and `CORE-469` is the proof it can be skipped.
- `CORE-434` (2026-08-12) hardened the workflow with `permissions: contents:
  read` and SHA-pinned actions. **The new job must inherit both** — the
  `permissions:` block is workflow-level so it applies automatically, but the
  checkout must reuse the pinned
  `actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0`, not a
  fresh `@v4`. Its summary also records "Pair H CI-verbatim clean" as a
  verification line, confirming Pair H is the standing check for this file.
- `CORE-436` (2026-08-12) added the README build badge. It targets the
  *workflow*, not a job, so a red `drift` job correctly turns the badge red —
  which is the desired behaviour and needs no README edit.
- `CORE-433.4` / `CORE-430.N` minted Pair H itself after a release-gate edit
  left `/ft-release` narrower than CI with no detector. Same failure family,
  opposite direction.

No archived tasknote proposed and rejected running §7.1 checks in CI, and no
⚠️ Superseded-by pointer touches this surface.

**`fetch-depth: 0` is not needed.** The `validate` job carries it because the
`update-adopters` tests clone the checkout and check out historical release
tags. Every drift check reads only the working tree, so the drift job takes the
default shallow clone.

**Best Practices Review.** Extending an established shape, not minting one:
`ci.yml` already exists with a hardened job to mirror. Responsibilities stay
separated — `validate` runs the AGENTS §"Validation" roster (which Pair H pins
byte-for-byte), `drift` runs cross-file consistency; folding the drift steps
into `validate` would both muddy that boundary and put them straight into Pair
H's extraction path. Dependency direction is one-way and correct: CI reads the
contract surfaces, no contract surface reads CI. The one real duplication —
the same shell now living in `SKILL.md` and `ci.yml` — is accepted by the same
CORE-430.2 argument that accepted the first duplication, and is exactly the
tradeoff the ticket names ("§7.1 stays the release gate").

**Assumptions asserted.** GitHub Actions runs `run:` blocks under `bash -e` on
`ubuntu-latest`, so `diff <(…) <(…)` process substitution is available (Pair E
row coverage and shipped-skill parity both need it) and a non-zero exit fails
the step. The §7.1 "Glob-free by design" caution is about zsh, not bash, so
`SPEC.md`'s `for f in claude/commands/ft-*.md` loop is safe as-lifted — and
that glob has never been empty.

**Baseline: all six checks pass against current HEAD** (run locally before
writing anything). Nothing in this task is fixing a live failure; it is
installing the detector.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`.github/workflows/ci.yml` (+80).** Second job `drift`, checkout-only
(`actions/checkout@11d5960a…` — the CORE-434 pin, reused not re-added), no Node
toolchain, no `fetch-depth: 0`, inheriting the workflow-level
`permissions: contents: read`. Seven `- name:` / `run: |` steps:

| Step | Source block | Exit contract |
|---|---|---|
| Wrapper-name invariant | `SPEC.md` §"Skill namespace" | `bad=` accumulator |
| Shipped-skill parity | §7.1 standing check | `diff -u` (native) |
| Pair A — roster clause presence | §7.1 Pair A, presence half only | `bad=` accumulator |
| Pair B — Claude ↔ Codex flags | §7.1 Pair B | `bad=` accumulator |
| Pair C — back-link depth | §7.1 Pair C, second grep only | `if grep … exit 1` |
| Pair E — roster row coverage | §7.1 Pair E, row half | `diff -u` (native) |
| Pair E — roster flag coverage | §7.1 Pair E, flag half | `bad=` accumulator |

**The exit-code adaptation is the only edit to the lifted shell.** Four of the
seven §7.1 blocks print findings and exit 0 — as gate material read by an
assistant, that is correct; as a CI step it is a detector that can never fail.
Each grew a `bad=` accumulator set beside the existing `echo`, and a closing
`[ -z "$bad" ] || exit 1`. The two `diff -u` blocks and Pair C already carry a
usable exit code and were lifted unchanged (Pair C inverted with `if`, because
a clean `grep` exits 1 and would fail the step under `bash -e`).

**Pair A shipped as presence-only** per the Phase 1 operator ask, with the
reason in a step comment so the next reader does not mistake the narrowing for
an oversight. Pair C's first grep (the informational "which templates carry a
back-link" listing) was dropped — it is context for a human, not a check.

**Three comments carry the non-obvious constraints**, in the shape §7.1 uses
for its own load-bearing details: the job-level comment pins the `- name:` +
`run: |` step shape (the Pair H guard, per operator ask #2) and forbids
`out=$(for … done)` around a `case` (the Phase 3 defect below); the Pair A step
comment scopes its own narrowing.

**`docs/CONVENTIONS.md` (+5/−1).** §"GitHub Actions CI" opened by claiming the
workflow reuses AGENTS.md §"Validation" verbatim, full stop. Reworded to name
the `validate` job, then two paragraphs: what `drift` covers and why the same
off-machine argument carries one layer up, and why the two jobs must stay
separate (Pair H's extraction).

**`SECURITY.md` (+9/−3).** §"GitHub Actions CI" made the same
workflow-runs-the-validation-roster claim. Updated to name both jobs and to
state explicitly that both inherit the workflow-level read-only token and the
same SHA-pinned checkout — so the threat model below it still covers the
surface it claims to. No posture change: `pull_request` (not
`pull_request_target`), no new secrets, no new action.

**Refactors deferred.** §7.1 Pair H's `grep -E '^      - run: '` extraction is
still job-blind and now sits one shape-mistake away from a false `+`; the
operator chose the comment guard over rewriting it, and the ticket says §7.1
stays the release gate. Recorded here so a future Pair H edit knows the
constraint exists. `docs/AGENT-NEUTRALITY.md` has no `docs/CONVENTIONS.md` row
at all, though that file already named `/ft-release`, `/ft-task`, and Phase 3
before this change — a pre-existing gap in the ledger's coverage, and exactly
the class `CORE-466` is filed to close. Not expanded here.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) `N/A` — no frontend surface; `viz/` untouched. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Harness, not eyeballing.** A YAML-parsing harness pulls each `drift` step's
`run:` script out of the committed workflow and executes it under `bash -e`
from the repo root — the same interpreter and flags GitHub Actions uses. The
job is verified as CI will run it, not as it reads.

**Defect caught on the first harness run.** Step 7 (Pair E flag coverage) died
with `syntax error near unexpected token ';;'`. Cause: bash's `$( )` parser
reads a `case` pattern's closing `)` as the end of the command substitution, so
the `out=$(for … case "$row" in *"$f"*) ;; … done)` wrapper I had used for the
uniform fail-on-output idiom cannot contain a `case`. Minimal repro:

```sh
bash -c 'out=$(for f in a b; do case "x" in *"$f"*) ;; *) echo "no $f" ;; esac; done)'
# → syntax error near unexpected token `;;`
```

This is precisely why §7.1's block works as written and broke on being wrapped.
All four loop steps moved to the subshell-free `bad=` accumulator — one idiom
across the job, no parser trap for the next editor to rediscover, and findings
stream to the CI log in order instead of buffering. The constraint is recorded
as a job-level comment.

**Positive verification — 7/7 steps PASS** against current HEAD under
`bash -e`. Nothing here is fixing a live failure.

**Negative verification — 7/7 injected drifts DETECTED.** A green check proves
nothing about a detector; each step was also run against a deliberately broken
tree. Mutations applied to an isolated copy (`claude/`, `codex/`, `templates/`,
`README.md`, `SPEC.md` — the full read set), each asserted `clean=0`,
`drifted≠0`, `reverted=0`:

| Injected drift | Step | Reported |
|---|---|---|
| `ft-task.md` invoke sentence says `` `task` `` | Wrapper-name | `NO SELF-NAME  claude/commands/ft-task.md` |
| `codex/skills/ft-bogus/` with no Claude twin | Shipped-skill parity | `diff` `+ft-bogus` |
| README roster clause reworded | Pair A | `NO ROSTER CLAUSE  README.md` |
| `--zzz` added to `ft-task` Claude `description:` | Pair B | `MISMATCH ft-task \| claude:[--debug --zzz ] codex:[--debug ]` |
| `templates/bogus-template.md` with `](../../PLAN.md)` | Pair C | the offending line + depth message |
| `claude/skills/ft-bogus/` with no roster row | Pair E rows | `diff` `-ft-bogus` |
| `--zzz` added to `ft-task` Claude `description:` | Pair E flags | `MISSING FLAG ft-task --zzz` |

**§7.1 Pair H — clean, both halves, verified after every edit.** Presence half
prints nothing across all five sites; CI-verbatim half `diff` exits 0. The
`- name:` + `run: |` shape keeps the seven new steps out of
`grep -E '^      - run: '`, confirmed by running the check rather than
reasoning about the indent.

**Lint / type-check.** `N/A` for a lint or type-check gate — no code changed.
The equivalent structural gates were run: workflow YAML parses
(`YAML.load_file`), `jobs` resolves to `validate, drift`, zero trailing
whitespace across all three changed files, and the two markdown edits' relative
links resolve from their own directories. `viz/` and `tools/` are untouched, so
per `AGENTS.md` §"Validation" ("use the narrowest validation that covers the
change") the six-command roster is not the right gate here — and it runs
against this commit in CI regardless.

**Quality assertions.** The one duplication this task creates — §7.1's shell
now living in two places — is the ticket's named tradeoff and the same one
`CORE-430.2` accepted for the validation roster; §7.1 stays the SSOT and the
superset. No dead code, no unexplained complexity (every non-obvious line
carries its reason as a comment), no public-surface growth, and the two
code-facing docs that made a now-false factual claim about this workflow were
both corrected in the same change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Installed flowtron's cross-file drift checks as a `drift` job in
`.github/workflows/ci.yml`, so the six release-context-free checks that
previously only fired when a human cut a release now run on every push and PR
to `main`. The gap was not theoretical: `CORE-469` — filed by the same
audit-structure pass, from the same Finding #9 — was a live Pair B failure
(`/ft-refactor`'s `--fast` missing from its Codex mirror) sitting in `main`
between cuts, found by an audit rather than by a gate.

**Changed files:** `.github/workflows/ci.yml` (+80, one new job, seven steps) ·
`docs/CONVENTIONS.md` (+5/−1) · `SECURITY.md` (+9/−3). No new file, no script —
the shell is lifted from `/ft-release` §7.1 and `SPEC.md` §"Skill namespace",
adapted only to fail the step on a finding.

**Verification.** A YAML-parsing harness executes each step's `run:` script out
of the committed workflow under `bash -e` — the interpreter and flags Actions
uses. **7/7 pass** against HEAD, and, because a green detector proves nothing,
**7/7 injected drifts detected** against a deliberately broken copy of the read
set (wrapper renamed, orphan Codex skill, reworded roster clause, unmirrored
`--zzz` flag, wrong-depth back-link, orphan Claude skill, unrostered flag),
each asserted clean→fail→clean. §7.1 Pair H verified clean on both halves after
every edit.

**The harness earned its keep.** The first run failed step 7 with
`syntax error near unexpected token ';;'` — bash's `$( )` parser reads a `case`
pattern's closing `)` as the end of the substitution, so the uniform
`out=$(for … done)` wrapper cannot contain a `case`. That is a defect that
would have shipped a permanently-red CI job. All four loop steps moved to a
subshell-free `bad=` accumulator, and the constraint is a job-level comment so
the next editor does not rediscover it.

**Two judgment calls, both surfaced to the operator before writing anything.**
Pair A has no pass/fail shell in §7.1 — it emits material for a human to
compare — and machine-checking it needs a filename→token derivation that exists
nowhere in the repo; it ships as clause-presence only, with its own scope
stated in a step comment. And §7.1 Pair H extracts CI commands with
`grep -E '^      - run: '`, so a same-shaped `drift` job would have injected six
`+` lines and broken the release gate at the next cut; the job uses `- name:` +
`run: |` block scalars (which its multi-line checks need anyway) and a comment
pins that shape, rather than editing §7.1.

**Refactors deferred, with reasons:** Pair H's extraction is still job-blind —
guarded by comment per the operator's choice, and §7.1 stays the release gate
per the ticket. `docs/AGENT-NEUTRALITY.md` carries no `docs/CONVENTIONS.md` row
at all, though that file named `/ft-release` and `/ft-task` before this change;
pre-existing, and the exact class `CORE-466` is filed to close.

**Documentation verdict:** 15/17 AI-referenced docs "no change";
`docs/CONVENTIONS.md` and `SECURITY.md` both made a factual claim about what
this workflow runs that this change falsified, and both were corrected in the
same commit. `README.md`'s CI badge targets the workflow, not a job, so a red
`drift` correctly turns it red with no edit. No archived tasknote's factual
claim was falsified — `CORE-434`'s "`run:` steps unchanged" was true of
`CORE-434` — so no ⚠️ Superseded-by pointer is written.

**Maintainability effect:** moves six drift classes from "caught at the next
release cut, if the assistant runs §7.1" to "caught on the commit that lands
them, off the authoring machine." The §7.1↔CI duplication is real and is the
tradeoff the ticket names; §7.1 remains the SSOT and the strict superset, and
`CORE-465` — already sequenced after this task — is the place where checks a
declared wiring SSOT makes vacuous get retired from both.

**Archived:** 2026-08-24
