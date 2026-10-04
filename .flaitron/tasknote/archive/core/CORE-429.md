---
title: auto-commit filed tasks
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-391, CORE-358]
---

# CORE-429 | auto-commit filed tasks

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-391]] [[CORE-358]]

## 🎯 Goal

Make the filing-only skills (`/ft-file-followup` default flow, its `--park` mode, and `/ft-starter-task`) treat filing approval as commit authorization — auto-committing `chore: file <ID> …` at hand-off instead of leaving PLAN.md dirty for the next session.

## ✅ Acceptance

- [x] `SPEC/tasknote-selection.md` gains a §"Filing commits" section carrying the contract: filing approval **is** commit authorization for the three filing-only skills; the three `chore: file <ID> …` message shapes; explicit-pathspec staging (never `-a`); the pre-check/skip-on-dirt guard; commit-never-push; and the explicit statement that a filing commit is **not** a closure commit (no PLAN flip, no archive move, **no 🏁**)
- [x] `/ft-file-followup` records whether `.flowtron/PLAN.md` is already dirty (`git status --porcelain -- .flowtron/PLAN.md`) **before** any write, setting the `auto-commit` decision — **amended in execution:** the check sits at Step 4 item 1 (immediately before the append), not Step 1a; a pre-flight reading goes stale across the Step 2-3 operator pause (see Implementation Notes)
- [x] `/ft-file-followup` Step 4 commits the filing (PLAN line + confirmed reconcile edits) as its last write; Step 5 hand-off reports the SHA instead of "Do **not** commit unprompted"
- [x] `park-mode.md` Step P4 commits the stub + PLAN line; Step P5's ≤70w reply carries the SHA inline without adding a section — **amended:** P4 runs its own pre-check as item 1 rather than inheriting one from host Step 1a, for the same staleness reason (park's Step P2 priority question also spans a turn)
- [x] `/ft-starter-task` gains the same pre-check (at Step 4, before the template copy); Step 5 commits the starter file + PLAN entry + confirmed reconcile edits; Step 6 hand-off reports the SHA
- [x] Both command wrappers (`claude/commands/ft-file-followup.md`, `claude/commands/ft-starter-task.md`) drop the now-false "Does not commit unprompted" claim
- [x] Execution skills are untouched — `/ft-task`, `/ft-micro-task`, `/ft-goal-task`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-release`, `/ft-new-project`, `/ft-update`, `/ft-spec` keep their commit-go gate verbatim (verified via `git diff --name-only`)
- [x] Repo-wide grep confirms no live "commit unprompted" / "Does not commit unprompted" text survives on the three filing surfaces or their wrappers
- [x] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"
- [x] **Added in closure:** `/ft-starter-task`'s frontmatter `description:` no longer claims it "hands off without committing" — a live false claim on the skill-dispatch surface, surfaced by the doc sweep rather than the initial body-text census

## 🧩 Subtasks

- [x] Write `SPEC/tasknote-selection.md` §"Filing commits" (insert after §"PLAN.md filing-discipline thresholds", before §"`## Completed` archive convention" — filing-discipline neighbours it)
- [x] Edit `claude/skills/ft-file-followup/SKILL.md`: pre-check + commit in Step 4, Step 5 hand-off rewrite
- [x] Edit `claude/skills/ft-file-followup/park-mode.md`: Step P4 pre-check + commit, Step P5 reply-shape SHA
- [x] Edit `claude/skills/ft-starter-task/SKILL.md`: Step 4 pre-check, Step 5 commit, Step 6 hand-off rewrite, frontmatter `description:` fix
- [x] Edit both `claude/commands/` wrappers
- [x] Verify: repo-wide grep for the retired claims; codex wrappers confirmed pointer-only (no edit needed); `/ft-flowtron` roster rows confirmed to make no commit claim (no edit needed) — but `/ft-starter-task`'s own `description:` **did** carry one and was fixed
- [x] Doc-drift: `SPEC.md` §"When to use a tasknote" enumerates the module's contents, so its list gained the filing-commit contract

## 🔗 Related

- [[CORE-391]] — folded `/ft-sidequest` into `/ft-file-followup --park`; owns `park-mode.md`, whose Step P4 carries one of the three "do not commit unprompted" lines
- [[CORE-358]] — paper-complete guard; its foreign-dirt gate at task entry is what turns a filing skill's leftover dirt into a hard stop on the next `/ft-task`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The symptom is live and verified by grep — all three named surfaces still carry "do not commit unprompted", and CORE-358's foreign-dirt gate makes that leftover dirt a hard stop at the *next* `/ft-task` entry, so the cost is real rather than cosmetic.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Surface census (drift check, code half).** All three claims in the PLAN.md line verify against current text:

| Surface | Line | Current text |
|---|---|---|
| `claude/skills/ft-file-followup/SKILL.md` | 155 | `Do **not** commit unprompted.` + `chore: file <TASK-ID> follow-up — <shortname>` |
| `claude/skills/ft-file-followup/park-mode.md` | 102 | `Do **not** commit unprompted.` (no message format defined) |
| `claude/skills/ft-starter-task/SKILL.md` | 129 | `Do **not** commit unprompted.` + `chore: file <TASK-ID> starter — <shortname>` |

Two command wrappers repeat the claim in prose and must move with the skills: `claude/commands/ft-file-followup.md:6` and `claude/commands/ft-starter-task.md:6` (both `Does not commit unprompted.`). Park mode has **no** message format today — this task defines the third shape (`chore: file <ID> park — <shortname>`).

**Codex wrappers are pointer-only.** `codex/skills/ft-file-followup/SKILL.md` and `codex/skills/ft-starter-task/SKILL.md` both read "Read and follow `../../../claude/skills/…/SKILL.md`" with no restatement of any commit rule (`grep -rn commit codex/` returns exactly one hit, in `ft-release`'s frontmatter). Consistent with CORE-358's Acceptance ("Grok/Codex pointers remain pointer-only") — **no codex edit needed**.

**Pattern survey.** Autonomous filing commits are already established upstream, so this extends a pattern rather than inventing one:

- `SPEC/loop.md` §"Gate collapse" collapses the 📦 gate to commit-per-verified-iteration; the `## 🔁 Iterations` log reports the result as plain `committed \`a1b2c3d\`` (lines 114-116) — **no 🏁**. Reuse this exact shape for filing hand-offs.
- `templates/loop-heartbeat-template.md:95-98` — "a cycle that filed a finding commits its PLAN + LOOP-LOG edits autonomously (`chore: heartbeat — <one-line summary>`)". A `chore:`-prefixed autonomous commit of PLAN edits produced by a *filing* action is already the sanctioned shape.

**Why 🏁 is excluded (contract collision).** `SPEC.md` §"Paper-complete guard" §3 and `SPEC/gates.md` reserve 🏁 for a closure commit whose SHA covers Acceptance deliverables. A filing commit has no tasknote closure, no PLAN flip, and no archive move, so emitting 🏁 would both dilute the marker and assert a deliverable-covering SHA that doesn't exist. The SPEC section states this negatively on purpose — it is the misread a future AI is most likely to make.

**Guard rationale (mid-flow is the primary case).** `/ft-file-followup` is documented as running *inside* an active `/ft-task`, where the working tree legitimately carries the parent task's in-progress edits. So the commit must stage **explicit pathspecs** — never `git commit -a`, never `git add .` — or a filing would swallow the parent's unfinished work. `.flowtron/PLAN.md` is normally clean mid-flow (the parent flips it at Phase 4), so the common path commits cleanly; the pre-check covers the rare case where a prior same-session filing or reconcile edit is still pending.

**Archive skim.** No archived tasknote contains the phrase "commit unprompted" — the no-commit contract has never been revisited since each skill was written. Load-bearing prior decisions:

- [[CORE-391]] (sidequest-fold) — owns `park-mode.md` and locked its reply contract: ≤70w, "no extra sections, no reconcile notes". Any SHA report must fit *inside* the existing two-line shape, not append a third section.
- [[CORE-358]] (paper-complete guard) — established the foreign-dirt gate at task entry. This is the mechanism that converts a filing skill's leftover dirt into a hard `/ft-task` stop, and therefore the strongest argument for this task.
- [[CORE-420.4]] — corrected the sidequest stub's back-link depth; confirms `.flowtron/sidequest/<ID>.md` sits one level under `.flowtron/`, so the stub pathspec is `.flowtron/sidequest/<ID>.md`.

**Drift check, cross-artifact half.** No SPEC contract is contradicted. `SPEC/gates.md` §"Operator-gate cues" caps the workflow at two standing phase-gate banners — filing skills surface neither, so the cap is unaffected and no gate is added or removed. `SPEC/gates.md`'s §"Conditional skip rule" governs the *closure* diff only and is out of scope. `SPEC/starter.md`'s lifecycle (filing → sitting → promotion) says nothing about commits and needs no edit. `docs/CONVENTIONS.md:17` already sanctions `chore:` as an active commit type with the `<TASK-ID>` carrying area info.

**Clarifications asked (2, both confirmed the recommended reading):**

1. **Scope** → the three named surfaces only (+ their two command wrappers). `/ft-spec` stays out: it never touches PLAN.md, so it isn't part of the stated symptom. The `/ft-audit*` family stays out: it writes PLAN tickets but is a stack-neutral fork template adopters own, and its run is an audit with its own closure rather than a filing motion. Both are legitimate future follow-ups, not this task.
2. **Dirt guard** → pre-check `.flowtron/PLAN.md` before writing; dirty ⇒ skip the auto-commit, say so in one line, fall back to today's leave-it-for-the-surrounding-commit behavior. Fail-soft, and never sweeps unrelated PLAN edits into a `chore: file` commit.

**Explicit assumptions:** commit only, never push (adopter repos push from their own sessions); the pre-check lives in the host `/ft-file-followup` Step 1a so park mode inherits it via its existing "run the host SKILL's Step 1a pre-flight" line rather than duplicating it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, no code changed (markdown contract + skill files only); the applicable gates are the two `/ft-release` roster-parity checks, the SPEC wrapper-name invariant, and the stale-claim greps, all run in Phase 3

**Implementation Notes:**

**Boundary held (DRY).** The contract lives once, in `SPEC/tasknote-selection.md` §"Filing commits"; each skill carries only its executable interpretation (which paths to stage, which message shape, which step number) and cites the section. This is the established skill-vs-SPEC split, so no new abstraction was introduced.

**Mid-flight design correction — pre-check placement.** First pass put the `git status --porcelain -- .flowtron/PLAN.md` pre-check in each skill's Step 1a pre-flight, alongside the ID/conflict checks. That is wrong: every filing motion **pauses for the operator** between pre-flight and its first write (the AskUserQuestion collection + review gate in the default and starter flows; the no-flag priority question at park's Step P2), so a reading taken at pre-flight can be stale by the time the commit uses it — exactly the foreign-dirt-in-the-filing-commit failure the guard exists to prevent. Moved to immediately before each skill's **first write**: `/ft-file-followup` Step 4 item 1, `park-mode.md` Step P4 item 1, `/ft-starter-task` Step 4 opener. The placement rule is stated in the SPEC section as load-bearing so a later edit doesn't quietly hoist it back to pre-flight. This also removed a re-check clause the first pass needed in park mode only — one rule, three identical placements, no special case.

**Park mode's approval story is different, and stated.** The other two motions inherit commit authorization from their Step 3 review gate. Park mode has no review gate by CORE-391's design, so Step P4 names the **invocation itself** (flag + priority flag, or the P2 answer) as the authorization. Without that sentence a future reader would find an auto-commit with no visible approval and reasonably conclude it was a bug.

**Park's ≤70w reply respected.** CORE-391 locked the shape at two lines, "no extra sections". The SHA rides the *existing* first line as a `· committed \`<sha>\`` tail (+2 words, `· uncommitted` on the skip path), so the reply contract is extended rather than broken.

**Third message shape defined.** Park mode had no commit-message format at all (the other two already documented theirs), so `chore: file <ID> park — <shortname>` is new — completing the table rather than inventing a convention: `docs/CONVENTIONS.md:17` already lists `chore:` as an active type, and `templates/loop-heartbeat-template.md:95-98` already ships a `chore:`-prefixed autonomous commit of PLAN edits produced by a filing action.

**Deferred (out of scope, per the confirmed scope answer).** `/ft-spec` (writes `.flowtron/specs/<slug>.md`, never touches PLAN.md) and the `/ft-audit*` family (writes PLAN tickets, but is a stack-neutral fork template with its own audit closure) both leave artifacts uncommitted today. Neither is one of the three filing-only motions this task names; both are legitimate future follow-ups.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the contract-layer equivalents, all clean: `/ft-release` §7.1 row-coverage `diff` (exit 0) + flag-coverage loop (no output); SPEC.md §"Skill namespace" wrapper-name invariant (no output); `node --test tools/update-adopters.test.mjs` → **fail 0** (registered release gate; untouched by this change, run as a regression check)

- [x] Ran lint/type-check on changed code — `N/A`, no TypeScript or code touched (`viz/` untouched, so its lint/typecheck scripts don't apply); markdown has no linter by design (Core Principle #2, zero scripts)

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface; zero files under `viz/` changed

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Stale-claim greps.** `grep -rn "commit unprompted"` over the three filing surfaces + their two wrappers returns **zero** hits. The six surviving repo-wide hits are all execution skills — `ft-new-project` (skill + wrapper), `ft-update`, `ft-release`, `ft-micro-task`, `ft-epic-discovery`, `ft-spec` — exactly the set Acceptance requires untouched, and `git diff --name-only` confirms none of them is in the diff.

**Greedy-stage audit.** Every `git add` written into the three skills names explicit paths; each is paired with an inline "never `git commit -a` / `git add .` / `git add -A`" prohibition. This is the one failure mode that would let a filing swallow the parent `/ft-task`'s unfinished work, so it is asserted at both the SPEC and skill layers rather than only the contract.

**Pre-check ordering verified.** Grepped step order in all three files: the pre-check line precedes the first write in each (`SKILL.md` 131 → 133; `park-mode.md` 91 → 102; `ft-starter-task` 89 → 94), and each commit step back-references the pre-check by its actual location.

**Frontmatter description caught by the sweep.** `/ft-starter-task`'s `description:` still ended "and hands off without committing" — a live false claim on a surface consumed by skill dispatch, missed by the initial path census because the census grepped body text. Fixed. Confirmed safe against `/ft-release` §7.1's flag-coverage gate first: that check extracts only `--flag` tokens from `description:`, so prose edits cannot trip it — and re-running both halves after the edit reported clean.

**Quality assertions.** No duplication introduced (contract stated once in SPEC, cited three times); no dead text left behind (each retired "do not commit unprompted" line was replaced, not merely appended to); no public-surface growth (no new skill, flag, gate, banner, or cue glyph — the two-banner cap and the operator-cue vocabulary are both untouched); no stale cross-references (Step 4 item renumbering in `/ft-file-followup` propagated to the Step 5 hand-off's `4.4`/`4.5` citations, and `park-mode.md`'s P4 items renumbered 1-5).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — describes the roster and adoption, makes no claim about filing-skill commit behavior |
  | `SPEC.md` | **updated** — §"When to use a tasknote" enumerates `SPEC/tasknote-selection.md`'s contents; the list omitted the new §"Filing commits" and now names it. §"Paper-complete guard" needs no edit: its §2 atomic-closure rules and §3 🏁 rule govern *closure* commits, and the new section defers to both by name |
  | `docs/MIGRATION.md` | no change — adoption/bump procedures; no filing-commit surface (grep for commit claims returns nothing) |
  | `claude/AGENTS-snippet.md` | no change — install/wiring block; no behavioral claims about filing skills |
  | `codex/AGENTS-snippet.md` | no change — same, Codex install paths only |
  | `docs/CONVENTIONS.md` | no change — already lists `chore:` as an active commit type with the `<TASK-ID>` carrying area info, which the three `chore: file <ID> …` shapes satisfy as-is |
  | `CONTRIBUTING.md` | no change — solo-maintenance model, issue/PR guidance |
  | `SECURITY.md` | no change — the filing commit stages only operator-approved filing paths and adds no new content-trust surface |
  | `docs/AGENT-NEUTRALITY.md` | no change — the contract lands in a SPEC module (agent-neutral); no new Claude-specific surface to ledger |
  | `docs/PLATFORMS.md` | no change — the two-layer model holds: contract in SPEC, wiring in `claude/`; Codex wrappers stay pointer-only |
  | `claude/CAPABILITIES.md` | no change — no capability trigger involved |
  | `docs/AGENT-COMPAT.md` | no change — no per-agent consume-mode or entry-point shift |
  | `docs/EXTERNAL-AGENTS.md` | no change — one-agent-per-tasknote and the handoff contract are untouched; a filing commit is not a tasknote transfer |
  | `docs/WORKTREES.md` | no change — no branch/worktree surface; the filing commit lands on the current branch |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Flowtron's three filing-only motions now commit their own filing instead of leaving it as working-tree dirt: `/ft-file-followup`, its `--park` mode, and `/ft-starter-task` treat filing approval as commit authorization and land a `chore: file <ID> …` commit at hand-off. Execution skills are untouched and keep their commit-go gate.

**Changed files (7, +~145/−16, markdown only):**

| Path | Change |
|---|---|
| `SPEC/tasknote-selection.md` | new §"Filing commits" (~50 lines): the authorization rationale, the three message shapes, explicit-pathspec staging, the pre-check/skip-on-dirt guard with its placement rule, commit-never-push, the not-a-closure-commit / no-🏁 statement, and the execution-skill carve-out; module header gains "filing-commit contract" |
| `claude/skills/ft-file-followup/SKILL.md` | pre-check + commit as Step 4 items 1 and 4 (items renumbered 1-5); Step 5 hand-off reports the SHA |
| `claude/skills/ft-file-followup/park-mode.md` | pre-check + commit as Step P4 items 1 and 5 (renumbered 1-5); Step P5's ≤70w reply gains a `· committed \`<sha>\`` tail |
| `claude/skills/ft-starter-task/SKILL.md` | pre-check opens Step 4; commit closes Step 5; Step 6 reports the SHA; frontmatter `description:` false claim fixed |
| `claude/commands/ft-file-followup.md` | wrapper prose: retired claim → auto-commit, for both default and `--park` |
| `claude/commands/ft-starter-task.md` | wrapper prose: same |
| `SPEC.md` | §"When to use a tasknote" content enumeration gains the filing-commit contract (doc-drift sweep) |

**Verification:** `/ft-release` §7.1 row-coverage `diff` exit 0 + flag-coverage loop no output; SPEC.md wrapper-name invariant no output; `node --test tools/update-adopters.test.mjs` fail 0; `grep -rn "commit unprompted"` returns zero hits on the five filing surfaces and exactly the six expected execution-skill hits; `git diff --name-only` confirms no execution skill was touched.

**Refactors:** one made, one deferred. Made — the pre-check moved from each skill's Step 1a pre-flight to immediately before its first write, because every filing motion pauses for the operator in between and a stale reading defeats the guard's whole purpose; this also let park mode drop a re-check special case, leaving one rule with three identical placements. Deferred — `/ft-spec` and the `/ft-audit*` family leave artifacts uncommitted for the same underlying reason but sit outside the three named motions (confirmed scope), so neither was touched.

**Documentation verdict:** 14 AI-referenced docs swept; 1 updated (`SPEC.md`), 13 no change. Plus one unplanned fix the sweep caught that the initial body-text census missed — `/ft-starter-task`'s frontmatter `description:` was still advertising "hands off without committing" to skill dispatch.

**Maintainability effect:** removes a recurring cross-session cost rather than adding capability. Before, every filing left `.flowtron/PLAN.md` dirty, and CORE-358's foreign-dirt gate converted that dirt into a hard STOP at the *next* `/ft-task` entry — so the cost of filing landed on an unrelated later task, and the operator paid it by hand. The guard keeps the change conservative: a filing never commits foreign PLAN dirt, never stages greedily, and never pushes, and when the pre-check sees a dirty PLAN.md the behavior degrades exactly to what it was before this task.

**Archived:** 2026-08-10
