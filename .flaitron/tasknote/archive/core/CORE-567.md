---
title: park-reason-table-home
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-565.2, CORE-565.3, CORE-473.3, CORE-535.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC.md
  - SPEC/blocked.md
  - SPEC/gates.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/unattended-mode.md
  - docs/EXTERNAL-AGENTS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-567 | park-reason-table-home

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-565.2]] [[CORE-565.3]]

## 🎯 Goal

Decide whether the `park-reason:` code table in `SPEC.md` §"Tasknote frontmatter" (~2,900 always-loaded chars needed only at a park) moves to `SPEC/blocked.md` with a one-line pointer left behind, and execute the decision.

## ✅ Acceptance

- [x] **Decision recorded** — Discovery Notes state move / stay with the evidence for each side and the verdict — `judgment` (a decision, not a command) → **move**
- [x] `SPEC/blocked.md` carries a `## Park reason` section holding all eight closed-set codes — `grep -q '^## Park reason' SPEC/blocked.md && [ "$(grep -cE '^\| \`(drift|destructive|prerequisite|model-mismatch|input-needed|visual-confirm|dependency|interrupted)\` \|' SPEC/blocked.md)" = 8 ]` → 0
- [x] `SPEC.md` §"Tasknote frontmatter" no longer carries the code table and leaves a pointer naming `SPEC/blocked.md` §"Park reason" — `! grep -q '^| \`drift\` |' SPEC.md && grep -q 'SPEC/blocked.md) §"Park reason"' SPEC.md` → 0
- [x] Every home-citation for the code set now names `SPEC/blocked.md` §"Park reason" — no `Tasknote frontmatter` citation adjacent to `park-reason` / `closed set` / `code` remains in the six citing files — `grep -n 'Tasknote frontmatter' SPEC/gates.md SPEC/procedures/ft-task.md claude/skills/ft-task/unattended-mode.md docs/EXTERNAL-AGENTS.md SPEC/blocked.md | grep -ci 'park\|closed set\|code tokens'` → prints 2, both false positives (the `status:` closed set; the moved text's own "parked notes" back-cite) — the `judgment` half read all 8 residual hits and found no home cite; the tighter repo-wide `SPEC.md.*Tasknote frontmatter` on `park-reason` lines → 0
- [x] The moved text is verbatim apart from relative-link and "above"/"below" anchor rewrites — `judgment` (diff read of `SPEC.md` −block vs `SPEC/blocked.md` +block) → 5 anchor hunks, no wording change
- [x] `SPEC.md` shrinks by ≥ 2,000 chars and stays under its 57,000 ceiling — `wc -c SPEC.md` (baseline 53,824) → 51,178 (−2,646)
- [x] `SPEC/blocked.md` frontmatter and trigger line still satisfy `SPEC/layout.md` §"Lazy SPEC module frontmatter" — `head -3 SPEC/blocked.md | grep -q '^paths: \[\]' && sed -n 7p SPEC/blocked.md | grep -q '^> Lazy-loaded SPEC module'` → 0

## 🧩 Subtasks

- [ ] Add `## Park reason` to `SPEC/blocked.md` between §"Exit (resume)" and §"Resuming an interrupted run"; move the SPEC.md block in verbatim, rewriting relative links (`SPEC/gates.md` → `gates.md`; self-references → in-file section names; "planning keys above" / "write-once carve-out above" / `§"Task-line format"` → `SPEC.md §…`)
- [ ] Replace `SPEC.md:198-247` with a short **Park reason** pointer paragraph (key exists, value shape, omit-when-absent, home = `SPEC/blocked.md` §"Park reason")
- [ ] Update `SPEC/blocked.md`'s own citations: opening paragraph (`:14`, `:17`), mid-Phase-2 park (`:60`), parked-state "eight stop causes" (`:70`), trigger line (`:7` — name the `--unattended` Step 0 load that now also brings the code table)
- [ ] Repoint `SPEC/gates.md:285-286` and `:450`
- [ ] Repoint `SPEC/procedures/ft-task.md:66-67`
- [ ] Repoint `claude/skills/ft-task/unattended-mode.md:5` and `:27`
- [ ] Repoint `docs/EXTERNAL-AGENTS.md:67` (step 4) and `:91` (stable-surfaces row owner column)
- [ ] Run the Acceptance verify commands; read the residual `Tasknote frontmatter` hits
- [ ] Phase 4: doc-drift sweep, closure, autonomous commit

## 🔗 Related

- [[CORE-565.2]] — lifecycle-value; filed this task after measuring the always-loaded cost of the table (~2,900 chars, needed only at a park)
- [[CORE-565.3]] — caobunga-contract-fit; declared `park-reason:` a stable caller surface owned by section name, so "the pointer moves with it" (predecessor; `depends-on:`)
- [[CORE-473.3]] — introduced the key; its own pattern survey named the `loop-*` module-homed precedent as the matching shape and placed the table in `SPEC.md` only because `.2` had already cited it there (`depends-on:`)
- [[CORE-535.5]] — split `SPEC.md` (owns the code set) from `gates.md` (owns gate → behavior) and deleted the duplicate table; this task moves the code-set home, the split stands (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The predecessor [[CORE-565.3]] has closed and declared the caller surface by section name; the table still sits at `SPEC.md:198-247` (2,993 chars measured), loaded by every lifecycle skill and consumed only on a park path that already loads `SPEC/blocked.md`. The decision is live and the evidence is one-sided (below).

- [x] Read relevant source files — narrow set, read directly: `SPEC.md` (whole), `SPEC/blocked.md` (whole), the citing passages in `SPEC/gates.md:283-287,447-452`, `SPEC/procedures/ft-task.md:63-68,231-236`, `claude/skills/ft-task/unattended-mode.md:5,27`, `docs/EXTERNAL-AGENTS.md:48,67,90-94`, `docs/CONTEXT-BUDGET.md` (SPEC.md ceiling row + lazy-module measurements). No probe.

- [x] **Best Practices Review** — `N/A` for code. The one boundary in play is [[CORE-535.5]]'s ownership split (`SPEC.md` owns the closed code set + lifecycle; `gates.md` owns gate → behavior). Moving the code set to `blocked.md` keeps that split — `gates.md` still points and never restates — and removes the always-loaded/lazy mismatch. [[CORE-473.6]]'s layering (`EXTERNAL-AGENTS.md` names owners in `SPEC/`, copies nothing) is preserved by repointing the two by-name cites.

- [x] **Archive skim** — `grep -l 'SPEC/blocked.md' archive/core/*.md` → 38; `grep -l 'park-reason'` → 22 (the 473 cohort, 495/500/503/504, 526/527, 535.1/.3/.5, 558.2, 565.x). Read the load-bearing ones, logged below. Archive confirmed against the README table (`CORE-*` → `archive/core/`).

- [x] **Drift check** — `SPEC.md` §"Tasknote frontmatter" block verified at `:198-247` (task said ~2,900 chars; measured 2,993 incl. trailing blank). `SPEC/blocked.md` exists at 8,141 chars, unbudgeted, `paths: []` + trigger line intact. Task line matches: CORE-565.3 is `[x]` (its Fan-out ordering satisfied). Contract cross-check: no SPEC rule says the code set must live in the always-loaded core; `SPEC/layout.md`'s lazy-module pattern and the `loop-*` precedent (`SPEC/loop.md` §"Frontmatter keys" homes runner-written keys in the mode module) point the other way. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**The decision: move.**

| | Move to `SPEC/blocked.md` | Stay in `SPEC.md` |
|---|---|---|
| Who needs the table | Only a park writer or a park reader. Every runner park path already loads `blocked.md`: `/ft-task` Step 0 under `--unattended` ("and `blocked.md` alongside it, since every conversion writes a park"), Step 5 mid-Phase-2 park ("Read `blocked.md` and park"), Step 3c resume; `/ft-goal-task` and `/ft-micro-task` mirror those loads. | Every lifecycle skill, on every task, most of which never park. |
| Precedent | [[CORE-473.3]]'s own pattern survey: `park-reason:` "is written by a runner at a park, never by a human at scaffold, which is the `loop-*` situation" — the precedent whose table lives in the mode's module. It landed in `SPEC.md` only because `.2` had already cited it there. [[CORE-535.3]] moved six narrow-use sections out of `SPEC.md` the same way. | [[CORE-445.2]] planning keys are tabled in `SPEC.md` — but those are human-written scaffold-time claims the template comments in; `park-reason:` is in no template. |
| Caller contract | [[CORE-565.3]] declared the surface by **section name** ("step 4 and the new row cite it by section name, so the pointer moves with it"). Two cites in `docs/EXTERNAL-AGENTS.md` repoint; the split-on-first-` — ` rule and the closed-set guarantee are unchanged. | No repointing needed. |
| Cohesion | `blocked.md:70-72` already says "`park-reason:` states which of the eight stop causes put the note here"; the eight codes land next to that sentence and next to §"Resuming an interrupted run", which defines the one caller-written code. | The table sits between the planning keys and `**Date format:**`, unrelated to either. |
| Cost | ~2,600 chars off the always-loaded set; `blocked.md` grows to ~10.7k, still unbudgeted and still lazy. Six files touched, all pointer edits. | Zero edits. |

Nothing on the stay side survives contact with the load pattern. **Verdict: move**, leaving a short **Park reason** pointer paragraph in `SPEC.md` so the frontmatter section still enumerates every key a note may carry.

**Archive findings (load-bearing):**
- [[CORE-473.3]] `:96-98` — the placement was path-dependent, not preferred (quoted above). Its Q1 decision (one key, `<code> — <prose>`, kebab codes named after the stop) and the closed-by-statement / no-validator posture are untouched by a move.
- [[CORE-473.5]] — added `interrupted` and §"Resuming an interrupted run" to `blocked.md`; the table's "the one code a *caller* writes" sentence already forward-cites that section, so the move turns a cross-file cite into an in-file one.
- [[CORE-535.5]] §"Double-homes resolved" — the `SPEC.md` ↔ `gates.md` split. `gates.md:285-286` and `:450` are the two pointers that carry it; both repoint, the split stands.
- [[CORE-565.3]] — declared `park-reason:` stable, owner cited by section name; explicitly anticipated this task. Its `docs/EXTERNAL-AGENTS.md` step 4 + row 91 are the two caller-facing cites to repoint.
- [[CORE-445.1]] — the bar an additive frontmatter change must clear is "existing adopters need no migration". A documentation move writes nothing into any note; cleared trivially.

**Blast radius (`grep -rn park-reason` outside the archive, 24 files):** only six carry a *home* citation for the code set — `SPEC.md`, `SPEC/blocked.md`, `SPEC/gates.md` (×2), `SPEC/procedures/ft-task.md` (`:66-67`), `claude/skills/ft-task/unattended-mode.md` (`:5`, `:27`), `docs/EXTERNAL-AGENTS.md` (`:67`, `:91`). The other 18 use the key or a specific code without naming where the set lives (`ft-task` / `ft-micro-task` / `ft-goal-task` SKILL.md, `unattended-close-epic.md`, `step-3c-resume-blocked.md`, `SPEC/loop.md`, `SPEC/purpose-blurb.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, the snippets, `ft-flowtron`). No codex/cursor/grok file cites the home. `docs/CONTEXT-BUDGET.md`'s lazy-module figures are a dated measurement, re-taken at release — not edited here.

**No clarifications needed.** Assumptions asserted: (1) "one-line pointer" is read as one short paragraph — the frontmatter section must still name the key, its value shape, and omit-when-absent, or a reader enumerating valid keys misses it; (2) the moved text is moved verbatim, not rewritten — this is a where-it-lives task, and any fidelity trim is a separate decision; (3) the caller doc cites the new home the same way it cited the old one (by section name) — `caobunga`'s own contract doc is out of this repo's remit (`SPEC.md` §"Cross-repo edit remit") and is not read or edited; if it cites `SPEC.md` §"Tasknote frontmatter" for the code set, that is a wording refresh for a CBN row, noted in the recap.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-535.3]]'s move-out-of-`SPEC.md` shape: the core keeps a one-paragraph pointer ("Canonical contract: see …" / the `blocked-by:` row already citing `blocked.md`), the lazy module owns the content, and every third-party cite repoints by section name. Mirrors `SPEC/loop.md` §"Frontmatter keys" for a runner-written key. No new shape.

- [x] **Minimal refactor gate** — no refactor. The block moved verbatim; the only textual changes are anchor rewrites forced by the new file (relative link path, "above"/"below", self-reference → "this module"). `blocked.md`'s trigger line gained the `--unattended` Step 0 load, which the runners already perform and the line under-reported — recorded here because the code table is now the reason for that load.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract move, no code; the Acceptance greps are the tests.

**Implementation Notes:**

| File | Change |
|---|---|
| `SPEC/blocked.md` (+67/−7, 8,141 → 11,257 chars, unbudgeted) | New `## Park reason` between §"Exit (resume)" and §"Resuming an interrupted run": the eight-row closed set, the value grammar + yaml example, the split rule, `drift` vs `dependency`, the mandatory-under-`--unattended` write rule, the clear-on-resume rule. Trigger line names the `--unattended` Step 0 load. Three in-file cites (`:14`, `:60`, `:70`) now point at §"Park reason" instead of `SPEC.md`. |
| `SPEC.md` (−50/+5, 53,824 → 51,178 chars, −2,646; ceiling 57,000) | The 2,993-char block replaced by a five-line **Park reason** pointer: key, value shape, omit-when-absent, runner-written / cleared-on-resume, home. |
| `SPEC/gates.md` (`:286`, `:450`) | Two home cites → `SPEC/blocked.md` §"Park reason". The [[CORE-535.5]] split (gates owns gate → behavior, never restates the set) is unchanged. |
| `SPEC/procedures/ft-task.md` (`:67`) | Home cite → `SPEC/blocked.md` §"Park reason". |
| `claude/skills/ft-task/unattended-mode.md` (`:5`, `:27`) | Header now names one canonical file for key + codes + parked state + resume; recipe step 3 cites §"Park reason". |
| `docs/EXTERNAL-AGENTS.md` (`:67`, `:91`) | Step 4 and the stable-surfaces row owner column → `SPEC/blocked.md §"Park reason"` (bare-path form, matching the sibling rows). The split rule and closed-set guarantee a caller relies on are unchanged. |

Not edited on purpose: the 18 other `park-reason` mentions (they use the key or a specific code without naming the set's home); `docs/CONTEXT-BUDGET.md` (dated measurement, re-taken at release); `templates/` (the key is runner-written and was never templated — [[CORE-473.3]]).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code; Acceptance verify commands run below.

- [x] Ran lint/type-check on changed code — no markdown linter in CI (`ci.yml` lints `viz/` only); `.editorconfig` hygiene checked by hand: no trailing whitespace, final newline on all six files; every new `§` anchor resolves (`## Park reason` ×1, `## Resuming an interrupted run` ×1, `gates.md:362` `## `--unattended` operator posture`).

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
grep -q '^## Park reason' SPEC/blocked.md && [ "$(grep -cE '^\| `(drift|…|interrupted)` \|' SPEC/blocked.md)" = 8 ]   → 0
! grep -q '^| `drift` |' SPEC.md && grep -q 'SPEC/blocked.md) §"Park reason"' SPEC.md                                → 0
grep -n 'Tasknote frontmatter' <six files> | grep -ci 'park\|closed set\|code tokens'                                → prints 2 (both false positives, see below)
grep -rn 'park-reason' SPEC claude docs codex cursor grok README.md | grep -c 'SPEC.md.*Tasknote frontmatter'         → prints 0
grep -n -B1 -A1 'Tasknote frontmatter' SPEC/gates.md | grep -c 'park-reason\|code tokens'  (multi-line cite check)  → prints 0
wc -c SPEC.md SPEC/blocked.md                                                                                       → 51178 · 11257
head -3 SPEC/blocked.md | grep -q '^paths: \[\]' && sed -n 7p SPEC/blocked.md | grep -q '^> Lazy-loaded SPEC module' → 0
diff -w <HEAD:SPEC.md:198-247> <blocked.md §"Park reason">                                                           → anchor rewrites only (5 hunks: heading, 2× "above"→cite, link path, self-ref→"this module"/"below")
```

**A4 residual `Tasknote frontmatter` hits, read (8):** `gates.md:168` (`touches:` reconciliation) · `EXTERNAL-AGENTS.md:90` (the `status:` closed set — the "closed set" false positive; `status:` is still owned by `SPEC.md`) · `procedures/ft-task.md:234` (scaffold), `:287` (`touches:`), `:410` (write-once) · `blocked.md:14` (`blocked-by:` planning claim) · `blocked.md:89` (the moved text's own back-cite for omit-when-absent — the "parked" false positive, intended) · `blocked.md:135` (write-once carve-out back-cite, intended). None is a home cite for the code set → **pass**.

**Structural assertions (changed prose):** no duplication — the table exists once, in `blocked.md`; `SPEC.md` keeps a pointer with the key's shape and no rows. No dead prose — the `SPEC.md` pointer still lets a reader enumerating frontmatter keys find `park-reason:`. No public-surface growth — the caller contract (`<code> — <prose>`, split on first ` — `, closed set of eight) is byte-identical; only its address moved, and [[CORE-565.3]] declared it by section name for exactly this. No stale code-facing docs — the six home cites are the full set (`grep -rn park-reason` outside the archive, 24 files, read for home phrasing).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change · `SPEC.md` **deliverable** (block → pointer) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change (its `--unattended` bullet names the key, not the set's home) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (`unattended-mode.md` was already ledgered; its edit is a cite) · `docs/PLATFORMS.md` no change (posture rows name "a closed-set `park-reason:` code", no home) · `claude/CAPABILITIES.md` no change (no version bump; same phrasing as PLATFORMS) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` **deliverable** (step 4 + stable-surfaces row repointed) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change — **18 / 18.**

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Decided **move** and executed it: the `park-reason:` closed code set — eight codes, the split rule, and the write / clear lifecycle — now lives in `SPEC/blocked.md` §"Park reason", the lazy module every park path already loads, and `SPEC.md` §"Tasknote frontmatter" keeps a five-line pointer so the key still appears where frontmatter keys are enumerated. The always-loaded contract drops 2,646 chars (53,824 → 51,178 against a 57,000 ceiling); `blocked.md` grows to 11,257, still unbudgeted and still loaded only on a park, a resume, or an `--unattended` run.

**Why move.** The table's only consumers are park writers and park readers, and every runner park path already Reads `blocked.md` (`/ft-task` Step 0 under `--unattended`, Step 5 mid-Phase-2, Step 3c resume; `/ft-goal-task` and `/ft-micro-task` mirror those loads). [[CORE-473.3]]'s own pattern survey named the `loop-*` module-homed precedent as the matching shape for a runner-written key and put the table in `SPEC.md` only because `.2` had already cited it there. [[CORE-565.3]] declared the caller surface by section name so "the pointer moves with it." Nothing on the stay side survived the load pattern.

**Technical.** Six files, +73/−63 lines, markdown only. `SPEC/blocked.md` +67/−7 (new §"Park reason" between the resume paragraph and §"Resuming an interrupted run"; trigger line names the `--unattended` Step 0 load; three in-file cites repointed). `SPEC.md` −50/+5. Home cites repointed in `SPEC/gates.md` (×2), `SPEC/procedures/ft-task.md` (×1), `claude/skills/ft-task/unattended-mode.md` (×2), `docs/EXTERNAL-AGENTS.md` (×2). The moved text differs from the original by five anchor hunks only (`diff -w`). Verification: 7 Acceptance commands, all pass; the one loose grep (A4) printed 2 false positives that the recorded read of all 8 residual hits clears. Refactors: none; the [[CORE-535.5]] `SPEC.md`↔`gates.md` split stands with the code-set half re-homed. Documentation verdict: 18/18 swept; two deliverables, sixteen no-change.

**Scope reconciliation.** Declared 6 files, changed 6. Undeclared: none.

**Maintainability effect.** One fewer place where every lifecycle skill pays for a park it will not take; the eight codes now sit beside the "eight stop causes" sentence and the one caller-written code's own resume section, so a reader of a parked note gets the whole park contract from one file. The caller contract (`<code> — <prose>`, split on first ` — `, closed set) is byte-identical — only its address moved.

**Out of remit, noted not done.** `caobunga`'s own contract doc may cite `SPEC.md` §"Tasknote frontmatter" for the code set; that is a wording refresh for a `CBN-` row in that repo's session (`SPEC.md` §"Cross-repo edit remit"), of the same kind [[CORE-565.3]] already queued as CBN-148. Not read, not edited from here.

**Archived:** 2026-09-10
