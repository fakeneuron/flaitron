---
title: gate-relaxation-pass
status: completed
tags: []
created: 2026-09-07
due:
related-tasks: [CORE-535.5, CORE-EPIC-535, CORE-450, CORE-437, CORE-494, CORE-495]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/gates.md
  - SPEC/cue-vocabulary.md
  - SPEC/gate-discipline.md
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-goal-task/SKILL.md
  - docs/EXTERNAL-AGENTS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-536 | gate-relaxation-pass

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-535.5]] [[CORE-450]] [[CORE-437]] [[CORE-494]]

## 🎯 Goal

Relax four gate behaviors so routine runs pass through with fewer pauses — a doc-only edit under a privileged path no longer fires 📦, `--fast` downgrades a Re-scope 🛠️ to an inline notice, the closed commit-go set accepts more explicit commit verbs, and the runners read a PLAN.md row's `[unattended]` marker as implied `--fast` — without weakening any safety control (De-scope, destructive escalation, paper-complete guard, `--unattended` parks).

## ✅ Acceptance

- [x] **C1 — 📦 signal is path+content.** `SPEC/gates.md` §"Conditional skip rule": a changed file under a privileged-ops path glob trips the signal only when it is not a documentation file (extension list, stated once); the credential-keyword clause still scans every hunk, documentation included. Still deterministic — no judgment valve.
- [x] **C2 — `--fast` downgrades Re-scope.** Under `--fast`, a `Re-scope` verdict performs its PLAN.md line + tasknote-header rewrite, emits a one-line ⚠️ inline notice, and proceeds; `De-scope` still fires 🛠️. Default flow is unchanged. Under `--unattended`, `Re-scope` still parks `drift` — the notice is a delegation to a present operator and is not inherited.
- [x] **C3 — wider closed commit-go set.** `SPEC/cue-vocabulary.md` §"Accepted gate replies" names the widened set (still closed, case-insensitive, punctuation-insensitive); `looks good` / `lgtm` stay out (👁️ collision). Emission example unchanged.
- [x] **C4 — runners read `[unattended]`.** A PLAN.md row carrying `[unattended]` runs with `fast-mode = true` on an attended invocation of `/ft-task`, `/ft-micro-task`, `/ft-goal-task`, with an inline marker naming the source. The marker never implies the `--unattended` posture; `SPEC.md` §"Task-line format", `SPEC/procedures/ft-task.md`, and `docs/EXTERNAL-AGENTS.md` say so.
- [x] `SPEC/gates.md` §"Flag precedence and surface matrix" (ladder + matrix) and §"`--fast` operator override" reflect the new surface count; §"`--unattended` operator posture" → "What is inherited, and what is not" names which of `--fast`'s surfaces are inherited.
- [x] Standing rule (CORE-386/388): each new escape hatch ships with matching `SPEC/gate-discipline.md` §"Rationalizations" rows and §"Red Flags" lines; existing rows that restate the old contract (`exactly three`, `Re-scope/De-scope always fire`, `commit`/`go`/`yes`) are updated.
- [x] Every restatement site outside `SPEC/` is synced (plus the `/ft-task` command stub, `docs/CONTEXT-BUDGET.md`, and `templates/PLAN.md`, found in the sweep): the three runner skills + `unattended-mode.md`, `SPEC/procedures/ft-task.md`, `docs/GLOSSARY.md`, `SECURITY.md` (control-surface change named, as CORE-437 did), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `README.md`.
- [x] Budgets hold: `wc -c` `SPEC.md` ≤ 50,000 · `SPEC/gates.md` ≤ 35,000 · every `claude/skills/*/SKILL.md` ≤ 30,000 (`ft-release` ≤ 40,000); `docs/AGENT-NEUTRALITY.md` site counts re-measured and corrected if changed. — 49,002 / 34,866 / max 28,845 / 37,369; `SPEC.md` count 4 → 5 corrected
- [x] No dangling `§"…"` citation into `SPEC/{gates,cue-vocabulary,gate-discipline}.md`; release Pair K2 still passes; `viz/src/parser.ts` untouched (grammar unchanged).

## 🧩 Subtasks

- [ ] Operator confirms the four design choices (AskUserQuestion) — shape of C1's exemption, C2's `--unattended` treatment, C3's membership, C4's semantics
- [ ] `SPEC/gates.md` — §"Conditional skip rule" (C1); §"Phase 1→2 exit gate" flag-interaction ¶ (C2); ladder + matrix (C2, C4); §"`--fast` operator override" (C2, C4); §"What is inherited" + §"Park conversions" (C2)
- [ ] `SPEC/cue-vocabulary.md` §"Accepted gate replies" (C3)
- [ ] `SPEC/gate-discipline.md` — update the stale rows; add one Rationalizations row + one Red Flag per candidate
- [ ] `SPEC.md` — §"Task-line format" `[unattended]` row (C4); §"Post-closure protocol" step 1 closed-set mention (C3)
- [ ] Runner skills — `ft-task` Step 0 marker + Step 1 capture + Step 4 `--fast` ¶; `ft-goal-task` Step 0/1/4; `ft-micro-task` Step 1; `unattended-mode.md` "What the posture adds" + conversion-map 🛠️ row
- [ ] `SPEC/procedures/ft-task.md` — Step 1 clarifier (C4), Step 4 exit gate (C2), Step 6 (C3)
- [ ] Docs sweep — `docs/EXTERNAL-AGENTS.md` (C4), `docs/GLOSSARY.md` (C1, C2), `SECURITY.md` (C1), `docs/PLATFORMS.md` + `claude/CAPABILITIES.md` + `README.md` (C2), `docs/AGENT-NEUTRALITY.md` counts
- [ ] Phase 3 — dangling-citation scan, Pair K2, budget check; Phase 4 closure

## 🔗 Related

- [[CORE-535.5]] — predecessor; surfaced the four candidates while untangling `SPEC/gates.md`, deferred them as behavior change
- [[CORE-EPIC-535]] — the context-load epic that deliberately excluded behavior change
- [[CORE-450]] — related-decision: set the closed commit-go set and excluded `okay` / `looks good`; C3 widens it, keeps the 👁️-collision exclusion
- [[CORE-437]] — related-decision: last loosening of the 📦 fire set (retired frontend + perf-narrative signals); C1 is the same motion one step further
- [[CORE-494]] — related-decision: minted the `[unattended]` marker grammar; C4 gives the runners a reading of it
- [[CORE-495]] — related-decision: the "supersets autonomy, not delegations" hinge C2 reuses for the Re-scope notice

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four candidates are live: the 📦 path globs still fire on a `.md` under `**/auth/**`; the drift carve-out still fires 🛠️ on Re-scope under `--fast`; the commit-go set is still exactly `commit` / `go` / `yes`; and no runner reads `[unattended]` (only the operator-less caller does). Each is a contained contract edit with a cite-once home in `SPEC/`. The PLAN.md line is the decision this note lands; no rewrite.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Read set

`SPEC.md` (whole), `SPEC/gates.md` (whole), `SPEC/cue-vocabulary.md`, `SPEC/gate-discipline.md`, `SPEC/plan-parser.md` §"`[unattended]` mis-authoring footguns", `SPEC/procedures/ft-task.md` (primitives table, Steps 1/4/6), `claude/skills/ft-task/SKILL.md` + `unattended-mode.md`, `claude/skills/ft-micro-task/SKILL.md` Steps 0/3/5, `claude/skills/ft-goal-task/SKILL.md` Steps 0/1/4/6, `docs/EXTERNAL-AGENTS.md`, `docs/GLOSSARY.md`, `SECURITY.md` §lethal trifecta, `docs/AGENT-NEUTRALITY.md` ledger row 40, `docs/CONTEXT-BUDGET.md`, `viz/src/parser.ts` (`UNATTENDED_MARKER`, read-only).

### B. Best Practices Review

Contract layer, not code. Ownership is cite-once and already settled by [[CORE-437]] / [[CORE-450]] / [[CORE-535.5]]: `SPEC/gates.md` owns every *decision* (when a banner fires, what a flag reaches); `SPEC/cue-vocabulary.md` owns the reply sets; `SPEC/gate-discipline.md` owns the refutations; `SPEC.md` core carries the task-line grammar and one pointer per gate; skills, the SOP, and docs carry pointers plus examples. Each candidate edits its owner once and re-points restatements. No new section headings in `gates.md` (`docs/AGENT-NEUTRALITY.md` enumerates them by name; the [[CORE-487]] Pair K2 grep pins §"Runtime stays out."). No new cue glyph — C2's notice rides ⚠️, already a bounded non-cue glyph. `viz/src/parser.ts` is untouched: C4 reads a token the parser already captures.

### C. Archive skim (grep over `SPEC/gates.md` returned 20+ notes; the [[CORE-535.5]] probe distillation was reused rather than re-read)

- **[[CORE-437]]** loosened 📦 from three signals to one, on the ground that solo work is mostly routine diffs. It kept the path globs deterministic ("no judgment valve") and named the control-surface change in `SECURITY.md`. C1 follows both rules: an extension list is deterministic, and the doc exemption is named in `SECURITY.md`.
- **[[CORE-450]]** set the closed commit-go set and excluded `okay` (too weak) and `looks good` (👁️'s natural reply — promoting it lets a visual confirmation bind as commit authorization). C3 keeps the 👁️-collision exclusion; whether `ok` / `okay` join is the operator's call (question below).
- **[[CORE-495]]** established the hinge C2 reuses: `--unattended` supersets `--fast`'s *autonomy*, not its *delegations*. A Re-scope downgraded to an inline notice is a delegation of the review to a present operator, so it converts to a park under `--unattended` exactly as 👁️ does.
- **[[CORE-494]] / [[CORE-496]] / [[CORE-495]]** minted `[unattended]` and stated three times that the row marker and the invocation posture are independent ("neither implies the other"). C4 keeps the marker from implying the *posture*; what it adds is the weaker inference that a row declared safe with nobody present needs no pauses when somebody is. Those three sites are re-worded, not contradicted.
- **[[CORE-386]] / [[CORE-388]]** standing rule: a new escape hatch ships with Rationalizations + Red Flags rows. Four hatches here → four row pairs, plus three stale rows to fix (`exactly three`, `always fire`, `commit`/`go`/`yes`).
- **[[CORE-535.5]]** brought `gates.md` to 32,299 b against a 35,000 cap and `SPEC.md` to 48,771 against 50,000; every addition here must be paid for in prose economy, and the ledger in `docs/CONTEXT-BUDGET.md` is re-measured at closure.

### D. Drift check

Every path and section the PLAN.md line names exists at HEAD. `**/auth/**` is at `gates.md:199`; the drift carve-out is at `gates.md:179` and the matrix row at `:263`; the closed set is at `cue-vocabulary.md:186`; `[unattended]` is canonical grammar at `SPEC.md:66-80` and captured by `viz/src/parser.ts:141`. Cross-artifact: none of the four contradicts the two-banner cap, the paper-complete guard, or the destructive-action escalation — each is confined to a surface the flag ladder already lists. One tension is real and resolved by design rather than by executing a different task: C4 versus the "neither implies the other" clause ([[CORE-496]]) — resolved by scoping the implication to `--fast`, never to the posture.

### E. The four designs (recommendations put to the operator)

| # | Change | Recommended shape | Stays tight |
|---|---|---|---|
| C1 | 📦 privileged-ops signal | Path globs apply to non-documentation files only (`.md` `.mdx` `.txt` `.rst` `.adoc`); the keyword clause still scans every hunk, docs included | A secret in a README still fires; migrations / code under `auth/` still fire; no judgment valve |
| C2 | Re-scope under `--fast` | PLAN.md + header rewrite as today, then `⚠️ Re-scope (--fast) — <what changed>; proceeding.` and enter Phase 2 | De-scope always fires 🛠️; default flow unchanged; `--unattended` still parks `drift` |
| C3 | Commit-go set | Add `ship` / `ship it` / `land` / `land it` / `commit it` / `y` / `yep` / `yeah` / `approved` / `do it`; `ok` / `okay` per operator; `looks good` / `lgtm` stay out | Destructive banners keep inheriting the closed set without a weak member |
| C4 | `[unattended]` row marker | The three runners set `fast-mode = true` when the row carries it and no flag was passed; marker `⚡ --fast implied by the [unattended] row marker` | Never implies `--unattended`; parser + grammar unchanged; adopter callers' deny-by-default unchanged |

### F. Clarifications

Four structured asks, one per candidate; the operator took the recommended
shape on all four (recorded verbatim so the transcript is not needed):

1. **C1** — documentation extensions (`.md` `.mdx` `.txt` `.rst` `.adoc`) are exempt from the *path globs*; the *keyword clause* scans every hunk, documentation included. Rejected: "path AND keyword both required" (would auto-commit a keyword-free migration) and a `.md`-only exemption.
2. **C2** — `--unattended` still parks a Re-scope as `drift`. Rejected: inheriting the notice and proceeding (a re-interpreted task executing with nobody watching).
3. **C3** — add `commit it` / `y` / `yep` / `yeah` / `ship` / `ship it` / `land` / `land it` / `approved` / `do it`; `ok` / `okay` stay out (too weak — and the destructive banner keeps inheriting the closed set without a weak member); `looks good` / `lgtm` stay out (👁️ collision). Rejected: adding `ok` / `okay` with a destructive carve-out; a four-word minimal set.
4. **C4** — the marker implies `--fast` on an attended run of all three runners when no flag was passed, and never implies the posture. Rejected: `/ft-task`-only wiring, implying the full posture, and surface-only.

Explicit assumptions: no new cue glyph (C2's notice rides ⚠️, an existing non-cue advisory glyph); no new `gates.md` section heading (the `docs/AGENT-NEUTRALITY.md` ledger enumerates them); `SPEC/procedures/ft-task.md` stays neutral — it names *autonomous mode*, never `--fast`, outside its primitives table; `viz/src/parser.ts` is not touched; `/ft-micro-task`'s Re-scope stays a promote-to-`/ft-task` (a different motion from a rewrite, so C2 does not reach it); destructive-action banner reply semantics are untouched.

**Exit-gate judgment.** Discovery surfaced no significant deviation — the four asks confirmed the recommended shapes and reshaped nothing → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

### Pattern survey

Cite-once, as [[CORE-437]] / [[CORE-450]] / [[CORE-535.5]] left it: each
candidate changed its owner once and every restatement became a pointer or a
one-clause echo. No new heading in `SPEC/gates.md` (the `docs/AGENT-NEUTRALITY.md`
ledger enumerates them — its gates.md count is 14 before and after), no new cue
glyph (C2's notice rides ⚠️, an existing non-cue advisory), no parser change
(C4 reads a token `viz/src/parser.ts` already captures).

### What landed, per candidate

- **C1** — `gates.md` §"Conditional skip rule": the keyword clause became its
  own bullet (it was folded into the Security/secrets glob line), the path
  globs now apply to non-documentation files, and one paragraph states the
  extension list and the two boundary cases. Echoed in `docs/GLOSSARY.md`
  (privileged-ops) and `SECURITY.md` (lethal-trifecta paragraph — a
  control-surface change, named there as [[CORE-437]] did).
- **C2** — `gates.md` §"Phase 1→2 exit gate" → Flag interaction owns the
  downgrade and the notice shape; the ladder (rungs 2-3), the matrix (the
  Re-scope/De-scope row split in two), §"`--fast` operator override" (three →
  four surfaces), §"What is inherited" (two delegations), and §"Park
  conversions" follow. Echoed in the `ft-task` / `ft-goal-task` Step 0 markers
  and Step 4 branches, `unattended-mode.md`, the SOP Step 4, `docs/GLOSSARY.md`
  (Phase 1→2), `docs/PLATFORMS.md` (three `--fast` rows), `claude/CAPABILITIES.md`,
  and the `/ft-task` command stub.
- **C3** — `cue-vocabulary.md` §"Accepted gate replies" names the widened set;
  the 🟢 table row, `SPEC.md` post-closure step 1, and the SOP Step 6 point at
  it without forking the list. `/ft-micro-task`'s `🟢 GO` prompt keeps printing
  `commit` / `go` / `yes` — it is the emission example, not the accept-list.
- **C4** — `gates.md` §"`--fast` operator override" owns the implication; a
  matrix row and ladder rung 3 point at it. Wired into all three runners'
  Step 1 (`ft-task` capture list; `ft-micro-task` a new paragraph under the
  status gate; `ft-goal-task` by reference), the SOP's primitives table and
  Step 1 clarifier, `SPEC.md` §"Task-line format", `docs/EXTERNAL-AGENTS.md`
  step 2, and `templates/PLAN.md`'s header comment.
- **Discipline** — `gate-discipline.md`: three stale rows rewritten (`exactly
  three`, `always fire`, `commit`/`go`/`yes`), four Rationalizations rows and
  four Red Flags added, one per candidate ([[CORE-386]] standing rule).

### Minimal refactor gate

One structural change beyond the stated deliverables, required by C1: the
credential-keyword clause moved out of the Security/secrets glob bullet into
its own **Keyword clause (any path)** bullet, because "documentation is exempt
from the path globs, never from the keyword clause" is only statable when the
two halves are separate lines. Deferred, untouched: the `docs/AGENT-NEUTRALITY.md`
`gate-discipline.md` group lists three sections but only two mention `--fast`
at HEAD (§"Refused carve-outs" never did) — pre-existing, not a surface this
task moved.

### Budget

`gates.md` had 2,701 b of headroom; the four candidates first landed it at
35,302, so the C1 paragraph, the C2 notice (fenced block → inline code), the
C4 paragraph, and ladder rung 3 were tightened to bring it back under. Final
figures in Testing Notes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-only change; no code path, parser, or fixture was touched
(`viz/src/parser.ts` deliberately untouched — the grammar it captures is
unchanged), so no executable suite covers it. The structural checks that do:

- **Stale-restatement sweep** — grep over every non-archive surface for the
  four phrases the old contract used (`exactly three` / `three surfaces`,
  `Re-scope/De-scope still fire`, `Re-scope/De-scope always fire`,
  `neither implies the other`). Two rounds; the second round surfaced the
  `/ft-task` command stub, now fixed. **0 remaining.**
- **Dangling-citation scan** — every `SPEC/{gates,cue-vocabulary,gate-discipline}.md
  §"…"` citation repo-wide resolved against the three files' headings. The
  only three hits are the known `docs/AGENT-NEUTRALITY.md` ledger-row scanner
  artifact [[CORE-535.5]] recorded (the regex window slides across that row's
  file-column boundary). **0 real.** No heading was added, renamed, or moved.
- **Release Pair K2** (`step-7.1-mirror-pairs.md`) — `gates.md`
  §"Runtime stays out." still names `VISION.md` within 6 lines. Passes.
- **Standing context-budget check** (`step-7.1-standing-checks.md`, verbatim
  `wc -c … | sort -rn`) — `SPEC.md` 49,002 ≤ 50,000 · `SPEC/gates.md`
  **34,866** ≤ 35,000 (peaked at 35,302 mid-task; four of this task's own
  additions were tightened, no pre-existing prose cut) · `ft-release`
  37,369 ≤ 40,000 · `ft-task` 28,845 ≤ 30,000 · every other `SKILL.md`
  under. All under.
- **`docs/AGENT-NEUTRALITY.md` counts** — re-measured with the ledger's
  any-mention rule against HEAD and the working tree: `SPEC/gates.md` 14 → 14
  (no section gained or lost a `--fast` mention), `SPEC/cue-vocabulary.md`
  3 → 3, `SPEC.md` 4 → **5** (§"Task-line format" now names the flag the
  marker implies) — ledger row updated.
- `git diff --check` clean.

**Quality assertions.** No duplication: each candidate has one owner and the
restatement sites carry a clause or a pointer, not a second copy of the rule
(the widened reply set appears in full exactly once). No dead prose: the three
rewritten discipline rows kept their refuting citations ([[CORE-386]] rule).
No public-surface growth beyond the four behaviors the PLAN.md line names —
no new cue, heading, flag, frontmatter key, or parser field. Documentation is
the deliverable; the doc-drift verdict is in Phase 4.

👁️ `N/A` — no rendered surface changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs",
per entry:

| Entry | Verdict |
|---|---|
| `README.md` | no change — its `--fast` bullet names only "the routine operator gates", no per-surface list |
| `AGENTS.md` | no change |
| `SPEC.md` | **Updated** — §"Task-line format" `[unattended]` row names the implied flag; §"Post-closure protocol" step 1 points at the widened set |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change — names the flags, restates no surface list |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | **Updated** — lethal-trifecta paragraph names the documentation exemption and the any-file keyword clause (control-surface change, named as [[CORE-437]] did) |
| `docs/AGENT-NEUTRALITY.md` | **Updated** — `SPEC.md` half of the ledger row: §"Task-line format" added, count 4 → 5 |
| `docs/PLATFORMS.md` | **Updated** — the three `--fast` rows (Grok / Codex / Claude): Re-scope downgrade + marker implication |
| `claude/CAPABILITIES.md` | **Updated** — `--fast` row; last-verified stamp untouched (verified at version bumps) |
| `docs/AGENT-COMPAT.md` | no change — names `--fast` only as a capability trigger |
| `docs/EXTERNAL-AGENTS.md` | **Updated** — orchestration contract step 2: the marker implies `--fast` on an attended run, never the posture |
| `docs/WORKTREES.md` | no change |
| `docs/VISION.md` | no change — Pair K2 verified the `gates.md` pointer intact |

Outside the sweep set, changed because they own or restate the contract:
`SPEC/gates.md`, `SPEC/cue-vocabulary.md`, `SPEC/gate-discipline.md`,
`SPEC/procedures/ft-task.md`, `claude/skills/{ft-task,ft-micro-task,ft-goal-task}/SKILL.md`,
`claude/skills/ft-task/unattended-mode.md`, `claude/commands/ft-task.md`,
`docs/GLOSSARY.md` (two existing entries, no new term), `docs/CONTEXT-BUDGET.md`
(lazy-module ledger re-measured), `templates/PLAN.md` (header comment).

**Final Summary:**

Relaxed four gate behaviors, each confirmed by the operator at Discovery, and
kept every safety control where it was. A documentation file under a
privileged path no longer fires 📦 on path alone (the keyword clause still
scans it); `--fast` downgrades a Re-scope 🛠️ to a one-line ⚠️ notice while
the PLAN.md rewrite is still made and De-scope still fires; the closed
commit-go set gained the explicit commit verbs an operator actually types
(`ship it`, `land`, `commit it`, `yep`, `approved`, `do it`, …) while `ok` /
`okay` and `looks good` / `lgtm` stay out for [[CORE-450]]'s reasons; and the
three runners read a PLAN.md row's `[unattended]` marker as implied `--fast` on
an attended run — never as the `--unattended` posture, which stays the
caller's declaration.

**Files.** 21 modified, 1 archived tasknote, 0 code. Owners: `SPEC/gates.md`
(+~1,900 b net, 32,299 → 34,866 — under its 35,000 cap after tightening four
of this task's own additions), `SPEC/cue-vocabulary.md`,
`SPEC/gate-discipline.md` (+4 Rationalizations rows, +4 Red Flags, 3 stale
rows rewritten). Everything else is a pointer or one-clause echo.

**Verification.** Stale-restatement sweep 0 remaining (two rounds; the second
caught the `/ft-task` command stub); dangling-citation scan 0 real; Pair K2
passes; standing context-budget check passes on every budgeted surface;
`docs/AGENT-NEUTRALITY.md` counts re-measured against HEAD (gates.md 14 → 14,
SPEC.md 4 → 5, ledger corrected). Details in Testing Notes.

**Refactors.** One, required by C1: the credential-keyword clause moved out of
the Security/secrets glob bullet into its own bullet so "exempt from the path
globs, never from the keyword clause" is statable. Deferred: the
`docs/AGENT-NEUTRALITY.md` `gate-discipline.md` group names three sections but
only two mention `--fast` at HEAD — pre-existing, not a surface this task
moved.

**Maintainability effect.** The `--fast` surface list is now four everywhere it
is stated (gates.md ×2, gate-discipline.md, CAPABILITIES, PLATFORMS ×3, three
skill markers, one command stub) — the sweep found and fixed every restatement,
so the next relaxation pass has a grep-able inventory of exactly which sites
carry the count. The "supersets autonomy, not delegations" hinge from
[[CORE-495]] now carries two delegations instead of one, which is the test that
it was a principle and not a special case for 👁️.

**Archived:** 2026-09-07
