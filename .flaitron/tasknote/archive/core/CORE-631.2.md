---
title: lifted-pairs-single-body
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-631, CORE-631.3, CORE-631.N, CORE-622.2, CORE-624]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - .github/workflows/ci.yml
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/SKILL.md
---

# CORE-631.2 | lifted-pairs-single-body

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-631]]

## 🎯 Goal

For the ten §7.1 mirror pairs already lifted into the CI `drift` job, make one copy canonical and collapse the other to a pointer so `claude/skills/ft-release/**` lands ≥ 1.5 working units under its 125,000-byte cap without raising the cap, with `docs/CONVENTIONS.md` §"GitHub Actions CI" and the Pair L mapping rows updated to match.

## ✅ Acceptance

- [x] A1 `claude/skills/ft-release/**` ≤ 117,050 (125,000 − 1.5 × 5,300, the unit's high end) — `find claude/skills/ft-release -type f -exec cat {} + | wc -c`
- [x] A2 Cap unchanged — `grep -q '^| `claude/skills/ft-release/\*\*` | 125,000 |' docs/CONTEXT-BUDGET.md`
- [x] A3 Every lifted pair's §7.1 entry names its CI step and carries a `Reads:` line; no `sh` fence remains under A/B/C/H/J/M/N/O/P/Q except Pair A's content half — `awk` fence census over the fragment
- [x] A4 §7.1's local runner extracts the ten `Pair *` steps from `ci.yml` and all run green on HEAD under `bash -e` — run the runner block
- [x] A5 Pair L passes on HEAD and is non-vacuous: fires on a mutated `Reads:` line and on a mutated CI path — run Pair L three times (clean / mutated catalogue / mutated CI), restore
- [x] A6 Every `drift` job step (the three source-fence checks + ten pairs + final-newline) green locally under `bash -e` — extract-and-run all steps
- [x] A7 `ci.yml` parses as YAML — `python3 -c 'import yaml'` or `ruby -ryaml`
- [x] A8 `docs/CONVENTIONS.md` §"GitHub Actions CI" and the Pair L prose describe the flipped relationship (ci.yml is the body for the ten; §7.1 catalogues) — `judgment`, read both
- [x] A9 Pair Q green after the edit (no citation in the moved prose went stale) — covered by A6

## 🧩 Subtasks

- [x] S1 Move each lifted pair's shell-design bullets (and shell-internal sentences) into its `ci.yml` step as `#` comments inside the `run: |` block; keep the shell verbatim
- [x] S2 Rewrite each of the ten §7.1 entries: purpose lead (kept) · `Reads:` line derived from the CI step via Pair L's `paths()` · `CI step:` name · findings glossary + fix guidance (kept, trimmed of shell internals); drop the fence (Pair A keeps its `ls templates/` content-half fence)
- [x] S3 Add one generic local runner to §7.1 (extract every `- name: Pair *` step's `run: |` body from `ci.yml`, run under `bash -e`)
- [x] S4 Rewrite Pair L: `paths()` drops comment lines and one-char path heads (`s/`, `2/` noise); three source rows keep CI→source direction; ten catalogue rows compare CI step paths against the entry's `Reads:` line with the arrow flipped (repair §7.1)
- [x] S5 Update `docs/CONVENTIONS.md` §"GitHub Actions CI" (lifted → body; "no script is added" wording; Pair L description) and `SKILL.md` §7.1 / context-hatch claims that name the fragment size
- [x] S6 Verify A1–A9

## 🔗 Related

- [[CORE-EPIC-631]] — parent epic (budget-headroom); Discovery supplied by audit-repo 2026-09-20, no `.1` sibling
- [[CORE-631.3]] — sibling child (procedures / postures headroom)
- [[CORE-631.N]] — epic closure audit
- [[CORE-622.2]] — set the current `claude/skills/ft-release/**` cap (125,000)
- [[CORE-624]] — pair-h-lift-to-ci (last lift; established the current lifted-pair shape)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Measured on HEAD: `ft-release/**` = 122,895 / 125,000 (2,105 headroom, under half a working unit at +4,000–5,300). `step-7.1-mirror-pairs.md` = 54,996; the ten lifted pairs total 35,132 bytes of which ~5,100 are `sh` fences duplicated verbatim in `ci.yml` and ~12,250 are shell-design bullets about those fences. The PLAN line's diagnosis holds exactly; both options it names are viable and the operator picked the arrow flip.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Sizes (HEAD 9362667).** `ft-release/**` 122,895; fragment files: SKILL.md 31,705 · step-5-dogfood-sop 14,323 · step-7.1-mirror-pairs 54,996 · step-7.1-standing-checks 19,254 · step-7.2-tag-message 2,617. Per-pair byte split (lead / fence / prose / bullets): A 293/84/747/0 · B 481/446/540/0 · C 348/93/799/0 · H 760/943/1583/623 · J 1035/520/703/2332 · M 1148/537/1028/1859 · N 1122/373/552/1156 · O 1154/375/1139/1630 · P 1114/573/761/2765 · Q 1205/1145/1277/1889. Fences alone net ~3.8k after the runner + `Reads:` lines are added back (→ ~119.1k, borderline); fences + bullets net ~17k (→ ~106k, ~3.5 units under).
- **Source shape.** `ci.yml` `drift` job = 3 source-fence steps (wrapper-name ← `SPEC/layout.md`; parity + context budget ← `step-7.1-standing-checks.md`), 1 unbound step (final newline, CORE-621), 10 pair steps. Every pair step is the §7.1 fence verbatim plus a `bad=` accumulator; Pair H additionally carries two comments. Pair L joins on the `- name: ` prefix and compares `paths()` sets after an `echo`-string strip; CORE-624 recorded `s/` (from `sed 's/…//'`) as pre-existing noise in both sets — a `Reads:` line would have to list it, so `paths()` needs a one-char-head filter (`{2,}` on the first segment) and a comment-line strip (the moved bullets will sit inside `run: |` as `#` lines).
- **Release-time run after the flip.** `/ft-release` §6.1 already gates the cut on CI status for HEAD, but the cut's own edits (version pins, docs) can mint a Pair Q / Pair H miss before commit, so §7.1 keeps a local pre-commit run: one generic awk that extracts each `- name: Pair *` step's `run: |` body from `ci.yml` and pipes it to `bash -e` — the CI shell (`bash -e`, no `pipefail`, per Pair Q's note). Zsh-incompatible constructs (`[[ "$d" < "$floor" ]]` is fine in both) are not a concern because the runner invokes bash explicitly.
- **Pair A / Pair C partial lifts.** Pair A's content half (`ls templates/` vs both roster clauses) and Pair C's write-target table stay §7.1-only by `docs/CONVENTIONS.md`'s own list; Pair A keeps its 84-byte fence for the content half, and both get a `Reads:` line + step name for the lifted half.
- **Archive skim** (53 notes name the fragment; read the load-bearing four): CORE-543 minted Pair L — path-set compare, not byte identity, fix direction CI→§7.1 because §7.1 was the source; the three extraction bugs it records (`\*` dynamic-regex, `echo` strip, zero-path vacuity) all still apply to the rewritten Pair L. CORE-622.2 set the directory cap at 117,971 + ~1.5 units. CORE-624 (Pair H lift, 2026-09-20) is the freshest shape — "verbatim plus `bad=`", Pair L row added, CONVENTIONS' two lists moved H across; it left `ft-release/**` at 122,901. CORE-610.2 (Pair P) found the `bash -e` + empty-`grep` substitution trap on the mutated-copy proof — that `|| true` rationale is exactly the kind of note that must travel with the shell.
- **Best practices.** Touched responsibility: §7.1 = release-time catalogue + local runner; `ci.yml` = executable body + design notes; Pair L = the binding. Dependency direction flips for ten rows (§7.1 describes CI) and stays for three (CI copies §7.1 / `SPEC/layout.md`). No new abstraction beyond one runner loop; no script file (CONVENTIONS' "no script is added" still holds — the shell lives in `ci.yml`).
- **Drift check.** PLAN figures (122,895 / 54,996 / ten pairs A B C H J M N O P Q) match HEAD. `docs/CONVENTIONS.md` §"GitHub Actions CI" says "the shell is lifted from §7.1" and "§7.1 remains … the broader superset" — both need rewording. `SKILL.md` line 97 says the two §7.1 fragments are "~40k" — will be ~55k→~38k+19k; adjust the figure. `docs/CONTEXT-BUDGET.md` §Ledger's `ft-release 122,895` figure is refreshed by the standing context-budget check at the next cut; not touched here.
- **Clarifications** (AskUserQuestion, answered): direction = `ci.yml` is the body; notes = move to `ci.yml` as `#` comments inside each `run: |` block.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — no test suite covers shell-in-markdown; the mutation proofs in Testing Notes are the test

**Implementation Notes:**

- **Pattern survey.** Extended the shape CORE-624 left: `ci.yml` pair steps keep their `- name: Pair <letter> — …` + `run: |` form and their shell byte-for-byte; only `#` comment lines were added inside the block (design bullets from §7.1, converted to plain text, wrapped at ~78 cols). The drift-job header comment now states the two kinds of step and why the `Pair <letter> ` prefix is load-bearing (the §7.1 runner and Pair L both join on it).
- **§7.1 fragment** (54,996 → 40,578). New preamble "Two kinds of pair" + a 7-line local runner (awk extracts each `Pair *` step's block scalar, strips the 10-space indent, pipes to `bash -e`). Each of the ten entries is now: purpose lead (kept, with the old "Lifted into the CI drift job" bullet folded into a closing "which is why this pair runs per push" clause) · `Reads:` · `CI step:` + findings glossary + fix guidance · any scope note that is about the *pair* rather than the shell (Pair J positional args, Pair M's silence, Pair N/O's Q hand-off, Pair Q's bare-section scope). Pair A keeps its 2-line content-half fence; Pair C keeps its write-target table. D, F, G, I, K untouched except K's roster gained the `H` CORE-624 forgot (pre-existing one-token drift, fixed in passing because this task rewrites that roster's meaning).
- **Pair L rewrite.** `paths()` gains three normalizations — `#`-comment-line drop (the moved notes name paths freely), `\.` → `.` (a grep pattern's `SPEC/unattended-candidacy\.md` must derive the same token as the `Reads:` line's path), and a `$top` filter keeping only tokens whose first segment is a repo-root entry (`ls -A`), which retires the `s/` noise CORE-624 recorded plus `Acceptance/`, `budget/`, `2/`, `SPEC_DIR/`. Two loops: three source rows (unchanged direction, repair the CI copy) and ten catalogue rows (`Reads:` line vs CI step, repair the line; plus a `no CI step` assertion so a renamed step cannot pass vacuously). `ci_paths()` factored out because both loops need it.
- **Refactor gate.** No refactor beyond the task; `s/\\\././g` and the `$top` filter are the minimum that lets a hand-written `Reads:` line equal a derived set without listing noise. Deferred: nothing surfaced.
- **Docs.** `docs/CONVENTIONS.md` §"GitHub Actions CI": "the shell is lifted from §7.1" → the two-kinds statement; Pair L paragraph names both fix directions. `SKILL.md`: the §7.1 fragment bullet mentions the runner; the context-hatch's "~40k" (stale since CORE-507, actually 74k before this task) corrected to the now-true ~60k.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the ten `Pair *` steps + all 14 named drift steps extracted from `ci.yml` and run under `bash -e`; Pair L extracted from the fragment and run under `bash -e` and `zsh`

- [x] Ran lint/type-check on changed code — `ruby -ryaml` parse of `ci.yml`; final-newline drift step green (no actionlint on this machine)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → `108576` (cap 125,000; 1.5-unit bar 117,050; 16,424 headroom ≈ 3.1 units at 5,300) → exit 0
- A2 `grep -q '^| `claude/skills/ft-release/\*\*` | 125,000 |' docs/CONTEXT-BUDGET.md` → exit 0
- A3 fence census: `sh` fences remain only under the preamble runner, A (content half), F, I, K, L; all ten lifted entries carry `Reads:` + `CI step:` → exit 0
- A4 §7.1 runner over `ci.yml` → `Pair A ok` … `Pair Q ok` (10/10) → exit 0
- A5 Pair L clean under `bash -e` and `zsh` → no output, exit 0. Mutations (each restored, `git status` re-verified): `Reads:` of J → `ft-*.txt` ⇒ `PAIR L MISS: Pair J …repair the Reads: line` with `< claude/commands/ft-*.md / > claude/commands/ft-*.txt`; CI Pair A reads `SPEC.md` (the v5.25.0 shape) ⇒ `PAIR L MISS: Pair A` with `< SPEC.md / > SPEC/layout.md`; CI parity step reads `codex/skillz` ⇒ `PAIR L MISS: Shipped-skill parity …repair the CI copy`; CI step renamed `Pair N` → `Pair Z` ⇒ `PAIR L MISS: Pair N — no CI step, or it reads no path` + the set diff
- A6 all 14 named `drift` steps extracted and run under `bash -e` → 14 × `ok`, exit 0
- A7 `ruby -ryaml -e 'YAML.load_file(".github/workflows/ci.yml")'` → exit 0 (15 drift steps parsed)
- A8 judgment: `docs/CONVENTIONS.md` §"GitHub Actions CI" paragraphs 3–4 and the fragment's Pair L lead + fix-direction paragraph read the flipped relationship; both name the three copied checks and the ten body-in-CI pairs
- A9 covered by A6 (Pair Q green after the edit — every new `§"…"` citation in the rewritten entries resolves)
- Structural: no duplication left between the fragment and `ci.yml` for the ten pairs (the shell exists once); no dead code (Pair L's old single-loop mapping replaced, not left beside the new one); public-surface growth = one runner block + one `Reads:` convention, both documented in the fragment preamble and `ci.yml`'s header.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `docs/CONVENTIONS.md` — updated (§"GitHub Actions CI": the ten pair steps are the shell, the three copied checks keep their source, Pair L's two fix directions). All other entries — README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md — no change (none names the pair shell or where it lives).

Made `ci.yml` the single body for the ten §7.1 mirror pairs already in the CI `drift` job. Each pair's shell now exists once, in its workflow step, with its design notes as `#` comments beside the line they explain; `step-7.1-mirror-pairs.md` keeps a catalogue entry per pair — purpose, a `Reads:` line, the step name, what a finding means and how to fix it — and opens with a 7-line runner that extracts the ten steps from `ci.yml` and runs them locally under `bash -e` before the cut. Pair L's arrow flips for those ten rows (repair the `Reads:` line to match the step) and stays for the three copied checks (repair the copy); its `paths()` extractor drops comment lines, regex escapes, and non-repo-root tokens so a hand-written `Reads:` line can equal a derived set. `claude/skills/ft-release/**` lands at **108,576 / 125,000** (from 122,895; the fragment 54,996 → 40,578) — ~3.1 working units under, against the ≥ 1.5 asked — with the cap untouched.

- Changed (4 files): `.github/workflows/ci.yml` (+202/−0 lines, all comments; shell byte-identical), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (+69/−232), `docs/CONVENTIONS.md` (2 paragraphs), `claude/skills/ft-release/SKILL.md` (2 lines; corrected a "~40k" claim stale since CORE-507).
- Verification: A1–A9 receipts above; Pair L proven non-vacuous in four directions; all 14 drift steps green locally.
- Refactors: none beyond the task; Pair K's lifted-pair roster gained the `H` CORE-624 missed. Deferred: none.
- `touches:` reconciliation: `git diff --name-only` = exactly the four declared paths; no undeclared paths.
- Maintainability effect: the next mirror pair costs the directory budget once (a catalogue entry, ~1k) instead of twice (entry + fence + design bullets, ~4–5k); a shell edit has one home, and Pair L still fails the cut if the catalogue stops describing what CI reads.

**Archived:** 2026-09-20
