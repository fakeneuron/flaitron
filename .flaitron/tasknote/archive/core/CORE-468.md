---
title: audit-bootstrap-lazy
status: completed
tags: []
created: 2026-08-24
due:
related-tasks: [CORE-463.4, CORE-390]
touches:
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit/scaffold-bootstrap.md
  - claude/commands/ft-audit.md
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-update/SKILL.md
  - codex/skills/ft-audit/SKILL.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
---

# CORE-468 | audit-bootstrap-lazy

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-463.4]]

## 🎯 Goal

Move `/ft-audit` SKILL.md §1.5 — 149 of 311 lines that only ever fire on an *unfilled* fork — into a lazily-loaded `claude/skills/ft-audit/scaffold-bootstrap.md` fragment behind a short §1 step 3 trigger, and record the reassessment verdict on whether its three resolution branches earn their keep.

## ✅ Acceptance

- [x] `claude/skills/ft-audit/scaffold-bootstrap.md` exists, carries the full §1.5 content (5 steps) plus a lazy-fragment header blockquote matching the `ft-task/step-4-debug-mode.md` shape, and loses no rule, table row, branch, or safety boundary in the move
- [x] `claude/skills/ft-audit/SKILL.md` §1.5 is gone; §1 step 3 becomes a short trigger that keeps the **overlay exemption** inline (so a filled thin overlay — the recommended fork shape — still never loads the fragment) and hands off everything else
- [x] SKILL.md drops to ~165 lines; §§2–8 keep their existing numbering (no renumber — the fragment is not a numbered section)
- [x] Every surviving `§1.5` reference in SKILL.md (§0 pointer, §6 fork-install carve-out, §7 three rationalization rows, §8 four red flags) re-points at the fragment; the §6/§7/§8 rules themselves stay in the always-loaded file
- [x] `docs/MIGRATION.md` §1.2.1 (`SKILL.md` §1.5 → fragment) and `claude/skills/ft-update/SKILL.md` (`§1.5 bootstrap` mention) re-point
- [x] The six "fork the whole directory (`SKILL.md` + `passes/`)" enumerations name the new fragment so a full-copy forker copies a complete tree
- [x] `docs/PLATFORMS.md` lazy-fragment enumeration registers `ft-audit/scaffold-bootstrap.md`
- [x] Reassessment verdict on the three branches recorded in the fragment as a short rationale note, argued against `docs/CONVENTIONS.md` §"Template override stacking"
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Extract SKILL.md lines 39–186 verbatim into `claude/skills/ft-audit/scaffold-bootstrap.md`; add the lazy-fragment header blockquote and demote `### 1..5` to the fragment's own headings
- [x] Append the "Why three branches" rationale note (reassessment verdict) to the fragment
- [x] Replace SKILL.md §1 step 3 with the short trigger (overlay exemption retained inline)
- [x] Re-point the in-SKILL.md `§1.5` references: §0 pointer, §6 carve-out, §7 rows, §8 red flags
- [x] Re-point `docs/MIGRATION.md` §1.2.1 + `claude/skills/ft-update/SKILL.md`
- [x] Add the fragment to the six fork-enumeration sites + `docs/PLATFORMS.md`
- [x] Phase 3: verify no content lost (line accounting), no dangling `§1.5` reference repo-wide, markdown structure pass; run the portable test suite
- [x] Phase 4: doc-drift sweep + PLAN stub flip + archive

## 🔗 Related

- [[CORE-463.4]] — built §1.5 in the first place (`depends-on:` — this task relocates its deliverable without changing its behavior)
- [[CORE-390]] — precedent: `/ft-debug` folded into `/ft-task --debug` as a 67-line lazy fragment; the pattern this task copies
- [[CORE-465]] — declared the adopter-wiring roster SSOT; confirms `ft-audit` is deliberately outside symlink wiring (fork-only), so no wiring roster changes here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every claim in the PLAN line verified live against HEAD (see Drift check). §1.5 is 149 of 311 lines (47.9%) and, by its own text, "Reached only from §1 step 3, and only when placeholders were found. A filled fork never arrives here" — i.e. it is dead context on every run of a correctly-configured install, which is the exact profile the `step-4-debug-mode.md` lazy-fragment pattern exists for. Nothing has landed against `ft-audit/SKILL.md` since CORE-463.2 (the `structure` domain) that changes the shape.

- [x] Read relevant source files — `claude/skills/ft-audit/SKILL.md` (all sections), `claude/skills/ft-task/{SKILL.md,step-4-debug-mode.md}` (the target pattern), `templates/audit-overlay-template.md`, `docs/CONVENTIONS.md` §"Template override stacking", `docs/MIGRATION.md` §1.2.1, `claude/skills/ft-update/SKILL.md` Step 4.5, `codex/skills/ft-audit/SKILL.md`, `docs/PLATFORMS.md`.

- [x] **Best Practices Review** — see "Responsibility boundaries" below.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/*.md` for `ft-audit` returned 20 hits; read the load-bearing ones: `CORE-463.4` (authored §1.5 — its Acceptance is the contract this move must preserve byte-for-byte in behavior), `CORE-463.N` (epic audit; confirms §1.5's structural-detection design was deliberately chosen over a literal token list, and that two design defects were caught in its own Phase 3 — so the text is load-bearing and must move verbatim, not be re-summarized), `CORE-465` (wiring-roster SSOT; `ft-audit` is deliberately absent from symlink wiring, so this task touches no roster). No prior note moved a fragment out of `ft-audit/`; `CORE-390` is the cross-skill precedent.

- [x] **Drift check** — all PLAN-line claims hold at HEAD:
  - §1.5 spans lines 39–187; `## 2.` starts at 188. **149 lines of 311 = 47.9%** ✅
  - `ft-task/step-4-debug-mode.md` exists (67 lines) and is dispatched from `SKILL.md` Step 0 ✅
  - `docs/CONVENTIONS.md` §"Template override stacking" exists at line 118 ✅
  - No SPEC contract governs skill-internal file layout, so the split contradicts nothing. `SPEC/procedures/ft-task.md` has an agent-neutral SOP that names `ft-task`'s fragment, but there is **no** `SPEC/procedures/ft-audit.md`, so no SOP needs a mirror entry.
  - One nuance the PLAN line does not anticipate, recorded here rather than treated as drift: the current step 3 applies the **thin-overlay exemption at the trigger**. A 3-line trigger that defers the exemption to the fragment would make every *filled overlay* run load 149 lines to discover it is a no-op — defeating the split for the fork shape flowtron recommends. The trigger therefore keeps the exemption clause inline.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Flat sibling, not a subdirectory** — `claude/skills/ft-audit/scaffold-bootstrap.md` beside `SKILL.md`, matching `ft-task/step-*.md` and `ft-file-followup/park-mode.md`, and matching the name the PLAN line specifies.
  2. **§§2–8 are not renumbered.** §1.5 was the only fractional section; removing it leaves 1→2→…→8 contiguous. Renumbering would churn every cross-reference in the repo for no gain.
  3. **§6 / §7 / §8 rules stay in the always-loaded file.** They are read on *every* run precisely to catch an auditor who skipped the bootstrap — a red flag you can only read after loading the fragment cannot catch "you never loaded the fragment". Only their `§1.5` pointers change.
  4. **Content moves verbatim.** Per the CORE-463.N record, §1.5's wording is load-bearing (structural detection, the destructive-intent denylist, the not-derivable carve-out); this is a relocation, not a rewrite.
  5. **Reassessment lands as documentation, not as new mechanics.** The verdict is "keep all three" (argued below); no branch is added, removed, or given new obligations. Minimum-viable — the PLAN line asked for a reassessment, not a redesign.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Responsibility boundaries.** `ft-audit/SKILL.md` currently carries two distinct responsibilities: *run an audit* (§§1–8) and *fix an unfilled fork* (§1.5). The second is a one-time install-repair concern that shares no state with the first and, by construction, cannot co-occur with a normal run — §1.5's own text says a filled fork never reaches it. Splitting on that seam is the SRP cut, and the dependency direction is one-way (dispatcher → fragment; the fragment returns values and never calls back). Composition over inlining, and no new abstraction is introduced — the lazy-fragment shape already has three-skill precedent in this repo (`ft-task/step-*.md`, `ft-file-followup/park-mode.md`, `ft-audit/passes/*.md`), so the "two-project precedent" bar in SPEC §"PR / suggestion archetypes flowtron does not accept" is cleared without argument.

**Reference surface to re-point (enumerated live, `grep -rn` over `*.md` less `node_modules` / `archive/`):**

| Site | Current text | Action |
|---|---|---|
| `ft-audit/SKILL.md:26` | §0 pointer "§1.5 automates the mechanical half" | re-point to fragment |
| `ft-audit/SKILL.md:34` | §1 step 3, one long paragraph | replace with short trigger |
| `ft-audit/SKILL.md:39-187` | §1.5 body | **extract** |
| `ft-audit/SKILL.md:241` | §6 "Fork-install carve-out (§1.5 only)" | re-point |
| `ft-audit/SKILL.md` §7 | 3 rationalization rows cite §1.5 | re-point |
| `ft-audit/SKILL.md` §8 | 4 red flags cite §1.5 | re-point |
| `ft-update/SKILL.md:143` | "`/ft-audit`'s own §1.5 bootstrap" | re-point |
| `docs/MIGRATION.md:172` | "`SKILL.md` §1.5 catches that at dispatch time" | re-point |
| `docs/PLATFORMS.md:264` | lazy-fragment enumeration omits it | add fragment |
| 6 × "fork the whole directory (`SKILL.md` + `passes/`)" — `ft-audit/SKILL.md:3,12`, `claude/commands/ft-audit.md:7`, `ft-flowtron/SKILL.md:56`, `codex/skills/ft-audit/SKILL.md:12`, `docs/MIGRATION.md:109,121,236` | enumerate the fork payload | name the fragment |

The `cp -R .../ft-audit/. ...` install command in MIGRATION.md §1.2.1 copies the directory wholesale, so full-copy forks pick the fragment up **mechanically** with no command change; the prose enumerations are what go stale. Thin overlays read `.flowtron/core/claude/skills/ft-audit/SKILL.md` and resolve siblings relative to it, so the fragment resolves for them unchanged. `/ft-update` Step 4.5's pass-file refresh keys on the `passes/` directory specifically and is unaffected.

**Reassessment — do the three resolution branches earn their keep?**

`docs/CONVENTIONS.md` §"Template override stacking" declines *layered* resolution ("flowtron resolves each template from exactly one place"), answers customization "once, at a single seam: the fork", and backs it with SPEC's "abstractions without two-project precedent". Grading each branch:

- **Fork + fill** — *is* the sanctioned seam. Uncontested.
- **Proceed degraded** — resolves nothing; it is an explicit refusal to resolve, carrying a mandatory unfilled-scaffold banner. Not a layer at all.
- **Run once with these** — the only real candidate. It is a *third* value source (repo metadata, applied in memory, nothing written).

Verdict: **all three stay.** Two reasons.

1. **It is not a layer.** The three branches are mutually exclusive per run, never stacked, and never consulted in priority order — the failure CONVENTIONS names ("resolving the stack in your head" to answer *which value rendered and why*) cannot occur. Step 4's prompt prints every derived value beside the file it came from *before* the operator picks a branch, so provenance is explicit at the decision point rather than reconstructed after it.
2. **It is load-bearing in two of three install contexts.** Step 2 withholds fork+fill in a non-adopter repo, and step 1's overlay paragraph withholds it for an overlay that reaches the bootstrap. In both, dropping run-once leaves *degraded* as the sole option — the step-3 derivation would be computed, displayed, and then unusable in exactly the contexts where forking is impossible. That is a strictly worse skill.

Recorded in the fragment as a short "Why three branches" note so the question is not re-litigated on the next structure audit. No branch gains new obligations — the reassessment concludes the design was right, and minimum-viable means saying so rather than redesigning around it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the established lazy-fragment shape rather than inventing one: `claude/skills/ft-audit/scaffold-bootstrap.md` is a flat sibling of `SKILL.md`, matching `ft-task/step-*.md` (4 fragments) and `ft-file-followup/park-mode.md`. Header blockquote copies `step-4-debug-mode.md`'s two-part shape — a "loaded by X, only when Y" line naming what the fragment owns, then an "adds *content*, never mechanics" paragraph fencing what it does **not** change. Step headings promoted `###` → `##` so the fragment's own hierarchy starts one level under its `#` title, again matching the sibling fragments.

**The extraction.** SKILL.md lines 39–187 (heading + 146 body lines + trailing blank) removed; body lines 41–186 moved verbatim. Verified by `diff` against `git show HEAD:` — **zero unintended deltas**; the only three are the two self-references that had to change (`This section` → `This fragment`; two `§1.5` back-references → `this fragment`) and the appended rationale note. §§2–8 keep their numbering: §1.5 was the only fractional section, so removing it leaves 1→2→…→8 contiguous and every existing `§N` cross-reference in the repo stays valid.

**The trigger (§1 step 3).** Two paragraphs. The first keeps the placeholder scan **and the thin-overlay exemption** inline — deliberately, and against the PLAN line's literal "3-line trigger" framing: deferring the exemption to the fragment would make every *filled thin overlay* — the fork shape `docs/MIGRATION.md` §1.2.1 recommends — load 149 lines only to discover it is a no-op, inverting the point of the split. The second hands off: `stop, Read the sibling scaffold-bootstrap.md, and run it`, naming what the fragment owns (detection rationale, full overlay exemption, install-context branch, derivation table + destructive-intent denylist, three branches).

**What stayed in the always-loaded file, and why.** The §6 fork-install carve-out, the three §7 rationalization rows, and the four §8 red flags all reference the bootstrap but were **not** moved. They are read on every run precisely to catch an auditor who *skipped* the bootstrap — a red flag reachable only after loading the fragment cannot catch "you never loaded the fragment." Only their pointers changed (`§1.5` → `scaffold-bootstrap.md` / "the scaffold bootstrap").

**Reassessment deliverable.** A 14-line **Why three branches** note appended after the fragment's step-4 branch list — placed there because that is where a reader meets the question. Verdict: keep all three; argued as (a) not a resolution stack — mutually exclusive per run, never priority-ordered, with every derived value printed beside its source *before* the operator chooses, and (b) *run once* is the only value-applying branch in two of three install contexts (non-adopter repo; overlay reaching the fragment), so dropping it would compute the derivation and then refuse to use it. **No branch gained or lost obligations** — the reassessment concluded the design was right, and saying so is the minimum-viable answer to the question the PLAN line asked.

**Minimal refactor gate.** No rewrite, no re-summarizing. `CORE-463.N` records that §1.5's wording is load-bearing (structural detection over a literal token list; the destructive-intent denylist; the not-derivable carve-out) and that two design defects were caught in its own Phase 3 — so relocation-verbatim was the only safe move. Deferred nothing.

**Reference re-points (11 sites, 8 files):** §0 pointer · §1 step 3 · §6 carve-out (×2 lines) · §7 rows (×2) · §8 red flags (×3) in `ft-audit/SKILL.md`; `ft-update/SKILL.md` bootstrap mention; `docs/MIGRATION.md:172`. **Fork-payload enumerations (6 sites):** `ft-audit/SKILL.md` frontmatter `description:` + intro + fork line, `claude/commands/ft-audit.md`, `ft-flowtron/SKILL.md` roster row, `codex/skills/ft-audit/SKILL.md` fork blockquote, `docs/MIGRATION.md` ×3 — each now names `scaffold-bootstrap.md`. **Registration:** `docs/PLATFORMS.md` lazy-fragment enumeration.

**No install-command change needed.** MIGRATION.md §1.2.1's `cp -R .flowtron/core/claude/skills/ft-audit/. .claude/skills/$SKILL/` copies the directory wholesale, so full-copy forks pick the fragment up mechanically. Thin overlays read `.flowtron/core/claude/skills/ft-audit/SKILL.md` and resolve siblings relative to it, so the fragment resolves unchanged. `/ft-update` Step 4.5's pass-file refresh keys on the `passes/` directory specifically and is untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

Markdown-only change — no source, no tests to add, so the `viz` `lint`/`typecheck`/`test` gates are **N/A** (nothing under `viz/` changed) and no test was written for prose.

- **Content-loss check (the load-bearing one).** `diff <(git show HEAD:claude/skills/ft-audit/SKILL.md | sed -n '41,186p') <(sed -n '7,168p' scaffold-bootstrap.md)` → exactly 3 hunks, all intentional and listed in Implementation Notes. No rule, table row, branch, denylist entry, or safety boundary lost.
- **Line accounting.** `ft-audit/SKILL.md` **311 → 164** (-147, -47.3%); `scaffold-bootstrap.md` 168 (146 moved + 6 header + 15 rationale + blank). Always-loaded dispatcher context halved, which was the point.
- **No dangling reference.** `grep -rn '§1.5' --include='*.md'` over the tree (less `node_modules`, `archive/`) returns only this tasknote's own historical prose and `ft-new-project/SKILL.md:93`, which cites `docs/MIGRATION.md` §1.5 — a different document's section, unrelated.
- **Portable suite.** `node --test tools/update-adopters.test.mjs` → **37/37 pass**. `node --check tools/update-adopters.mjs` → clean.
- **CI `drift` job, all six steps run locally** → all ok: command self-name · shipped-skill parity (`claude/skills` ↔ `codex/skills`, 19/19 — the new sibling is a file, not a skill dir, so parity is untouched) · Pair A templates roster clause · Pair B Claude↔Codex flag parity · Pair C template back-link depth · Pair E ft-flowtron roster row coverage.
- **Quality assertions.** No duplication introduced (the content exists in exactly one place — it moved, it was not copied); no dead prose (every moved line is still reachable via the step-3 trigger); public surface unchanged (no new domain, branch, flag, gate, or banner); the trigger's overlay-exemption retention is explained inline rather than left as unexplained complexity.
- **`👁️ CONFIRM` — N/A.** No frontend surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", all 17 entries:

| Doc | Verdict |
|---|---|
| `README.md` | no change — names `templates/` only; no `ft-audit` internals |
| `AGENTS.md` | no change — no `ft-audit` mention |
| `SPEC.md` | no change — its 8 `ft-audit` mentions are namespace, 🔍 glyph, next-move, and filing-commit rules; none touch file layout |
| `docs/MIGRATION.md` | **updated** — §1.2.1 fork payload (×3) + the self-filling-bootstrap paragraph re-pointed from `SKILL.md` §1.5 to §1 step 3 + the `scaffold-bootstrap.md` fragment |
| `claude/AGENTS-snippet.md` | no change — its one `ft-audit` mention is the `/ft-refactor` breadth/depth contrast |
| `codex/AGENTS-snippet.md` | no change — names `ft-audit-context` / `ft-audit-repo` in the global-install list only |
| `cursor/AGENTS-snippet.md` | no change — same |
| `grok/AGENTS-snippet.md` | no change — same |
| `docs/CONVENTIONS.md` | no change — §"Template override stacking" names the fork as the single seam, which this task's reassessment **confirms** rather than falsifies; the note cites it one-way |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — lists `/ft-audit` as a skill, no internals |
| `docs/AGENT-NEUTRALITY.md` | no change — its `ft-audit*` row registers `SPEC/tasknote-selection.md` consumers, not file layout; no new Claude-specific surface introduced (the fragment is platform-neutral markdown, reached identically by the Codex wrapper) |
| `docs/PLATFORMS.md` | **updated** — lazy-fragment enumeration now registers `ft-audit/scaffold-bootstrap.md` alongside `ft-task/step-*.md` and `ft-file-followup/park-mode.md` |
| `claude/CAPABILITIES.md` | no change — no `--flag` added; the fragment is dispatch-triggered, not operator-triggered |
| `docs/AGENT-COMPAT.md` | no change |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |

**Superseded-claim pointer:** none. `CORE-463.4`/`CORE-463.N` describe §1.5 accurately *for the repo at the time they were written*; per SPEC §"Tasknote frontmatter" the carve-out covers claims that were never true, not structure that later moved.

**Final Summary:**

Moved `/ft-audit`'s scaffold-bootstrap procedure out of the always-loaded dispatcher and into a lazily-loaded sibling, and answered the filed question about its three resolution branches with a recorded verdict of *keep all three*.

- `claude/skills/ft-audit/SKILL.md` **311 → 164 lines (-47.3%)** — §1.5's 149 lines, which by construction only ever fire on an unfilled fork, no longer load on every audit run.
- New `claude/skills/ft-audit/scaffold-bootstrap.md` (168 lines): the procedure verbatim (`diff`-verified against `HEAD` — zero unintended deltas) + a lazy-fragment header + the 14-line **Why three branches** reassessment note.
- §1 step 3 is now a two-paragraph trigger that **keeps the thin-overlay exemption inline** — a deliberate deviation from the PLAN line's "3-line" framing, because deferring it would make every filled overlay (the recommended fork shape) load the fragment just to learn it is a no-op.
- 11 reference re-points + 6 fork-payload enumerations + 1 lazy-fragment registration across 8 files. The `cp -R` install command needed no change; overlays and `/ft-update` Step 4.5 are unaffected.
- **Refactors made:** the SRP split itself (audit-a-project vs repair-an-unfilled-install share no state and cannot co-occur). **Deferred:** none. **Explicitly not moved:** the §6/§7/§8 bootstrap rules, which must stay always-loaded to catch an auditor who skipped the fragment.
- **Verification:** content-loss diff clean · 37/37 `node --test` · `node --check` clean · all six CI `drift` steps pass locally · no dangling `§1.5` reference repo-wide.
- **Maintainability:** every `/ft-audit` run in every adopter now spends ~47% less dispatcher context on a procedure it will not execute, and the three-branch design decision is recorded where the next structure audit will find it instead of being re-litigated.

**Archived:** 2026-08-24
