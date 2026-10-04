---
title: platform-parity gate widening audit
status: completed
tags: []
created: 2026-08-21
due:
related-tasks: [CORE-EPIC-460, CORE-460.2, CORE-460.3, CORE-460.4]
---

# CORE-460.N | platform-parity gate widening audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-460]]

## 🎯 Goal

Verify the completed `CORE-EPIC-460` (`platform-parity gate widening`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-460.N — audit CORE-EPIC-460` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-460.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-460.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-460` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-460.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-460]] — parent epic (platform-parity gate widening)
- [[CORE-460.2]] — command-stub `--high` + Pair F widening
- [[CORE-460.3]] — `--park`/`--worktree` flag parity + Pair I
- [[CORE-460.4]] — Codex trigger-table backfill

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children (`.2`, `.3`, `.4`) closed
  2026-08-21; no open siblings, so no early-audit decision was needed. The epic
  carries no `.1` Discovery child by design — `docs/`-sourced discovery was
  supplied by the audit-repo run of 2026-08-20 and recorded on the parent line,
  so the cohort is `.2`/`.3`/`.4` + this `.N`. CORE-460.4 additionally handed a
  named finding forward to this audit ("left for [[CORE-460.N]]"), so the audit
  has concrete inherited scope beyond the standard sweep.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: the audit's surface is contract-layer markdown (docs + a release-gate skill body), not code or module boundaries. The equivalent concern — mirror-surface duplication — is the epic's own subject and is covered by the coherence pass below.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort inventory** (three implementation children, all closed 2026-08-21):

- **CORE-460.2** — *command-stub `--high` + Pair F widening.* Added `--high` to
  the park see-also in `claude/commands/ft-starter-task.md` and
  `claude/commands/ft-epic-discovery.md`; fixed Pair E's flag-count bullet
  (three → four); widened `/ft-release` §7.1 **Pair F** with a second half that
  globs `claude/commands/*.md` rather than naming a fixed list, guarded by a
  `continue` so a bare `--park` mention with no roster (`ft-spec.md`) stays
  legal. 3 files.
- **CORE-460.3** — *`--park`/`--worktree` flag parity + Pair I.* Added `--park`
  and `--worktree` rows to the Grok Build and Cursor trigger tables in
  `docs/PLATFORMS.md`; de-enumerated six prose asides (4 in PLATFORMS, 2 matrix
  rows in `docs/AGENT-COMPAT.md`) to §-pointers; minted **Pair I**, which
  derives *both* its flag roster (from `claude/CAPABILITIES.md` rows) and its
  section list (from PLATFORMS `###` headings) instead of listing either. Net
  −4 mirrors. `grok/AGENTS-snippet.md` was de-scoped by operator decision, and
  that decision is recorded in Pair I's fourth property bullet. 4 files.
- **CORE-460.4** — *Codex trigger-table backfill.* Took Codex's trigger table
  from 4 rows to 11, in Grok's exact order, so Pair I's section guard stops
  exempting it; rewrote the stale **Sub-agent / isolated exploration** row
  against current vendor docs; appended a provenance sentence rather than
  restamping `last-verified` (the CORE-458 precedent); carried CORE-460.3's
  de-enumeration into Codex's three asides; added a fork-don't-symlink note to
  `codex/skills/ft-audit/SKILL.md`. 4 files, +31/−4.

**Cohort shape.** The three children compose cleanly as one arc: `.2` widened an
existing gate to cover a layer it had missed three times, `.3` minted a new gate
that derives rather than lists, and `.4` filled the one surface `.3`'s gate was
structurally exempting. Each child's deliverable is a strictly larger gated
surface than the one before it, which is exactly the epic's stated theme
("mirror-pair gates lag the surfaces they guard").

**Drift check.** All paths cited across the three children resolve at HEAD.
Structural claims re-verified rather than trusted: trigger-table row counts are
**11 / 11 / 11** for Grok Build / Codex CLI / Cursor, and the three stub sections
(Gemini CLI, Aider, Sourcegraph Amp) still carry **0** rows — so Pair I's
"three stub sections have no table at all" property still holds. Pairs F (both
halves), G, and I all print nothing at HEAD; Pair I's derived roster resolves to
`--fast --debug --worktree --park`. No regressions in earlier-shipped cohort
surfaces.

**Archive skim.** Self-referential for the cohort itself. The named
predecessors — CORE-399, CORE-433.2, CORE-422, CORE-456.2, CORE-438.5,
CORE-458 — are all cited inside the children's own notes as the drift history
that motivated each gate; no non-cohort archive entry adds context the children
did not already carry forward.

**Inherited finding.** CORE-460.4's documentation verdict logged one finding
*not fixed*, explicitly deferred here: `docs/MIGRATION.md:72` / `:294` carry
Grok-scoped two-flag asides of the same class CORE-460.3 closed in PLATFORMS and
AGENT-COMPAT, left for `.N` "since they belong to a different platform's
surface." Confirmed present at HEAD.

**No clarifications needed.** Assumptions: (a) the inherited MIGRATION finding is
in-scope for inline repair, since it is a two-line de-enumeration in the idiom
CORE-460.3 already established rather than new contract; (b) archived tasknotes
are immutable history and are not edited by this audit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code changed; both fixes are contract-layer prose. The gates that cover this class (Pairs F/G/H/I) are themselves the regression net and were re-run.

**Implementation Notes:**

**Cohort coherence pass — two findings, both repaired inline.**

**F1 — `docs/MIGRATION.md:72` / `:294` carried the stale two-flag roster.**
Inherited finding, handed forward explicitly by CORE-460.4. Both Grok-scoped
asides read "`--fast` / `--debug` are the same trailing flags" / "`--fast` /
`--debug` work once those bodies are loaded" — a two-flag roster where
`claude/CAPABILITIES.md` carries four (`--fast`, `--debug`, `--worktree`,
`--park`). Same drift class CORE-460.3 closed in PLATFORMS and AGENT-COMPAT,
one adopter-facing doc later.

Repaired in CORE-460.3's established idiom — **de-enumerate to a pointer**
rather than widen the roster, so the surface that can drift shrinks instead of
growing:

```
-  … `--fast` / `--debug` are the same trailing flags as the canonical skill bodies.
+  … the canonical bodies' trailing operator flags come with them — see
+  [`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md#non-claude-capability-triggers).
```

The `:294` site takes the same treatment in its own sentence shape ("work once
those bodies are loaded — see …"), not normalized to `:72`'s wording. Link form
and anchor copied from `docs/AGENT-COMPAT.md`'s existing pointer, which lives in
the same directory, so the relative target resolves identically. **Net −2
mirrors.**

Deliberately left alone: `docs/MIGRATION.md:62` names `--debug` and `--park` in
the same file. That is a per-skill *purpose gloss* ("4-phase runner (with
`--debug` …); in-chat follow-up (with `--park` …)"), not a roster claim about
one platform's flag set — widening or de-enumerating it would damage the
sentence. Same reasoning `docs/AGENT-COMPAT.md` §"Scope of this matrix" applies
to its own illustrative `--fast` mention.

**F2 — Pair I's section-guard property bullet was invalidated by its own
cohort sibling.** `claude/skills/ft-release/SKILL.md:548` still read "Codex's
table names no flag today (its backfill is CORE-460.4)" and "Codex is picked up
automatically the moment it gains its first flag row." CORE-460.4 landed four
hours later in the same cohort and took that table to 11 rows — so a bullet
written to justify a design decision was describing, in the present tense, a
state that no longer existed. Nothing gates this: the property bullets are prose
*about* a check, invisible to every check including their own.

Rewritten to put the exemption in the past and record that it was spent, which
preserves the design rationale (why the guard exists) while stating the current
fact (Codex is inside the gate):

```
- Codex's table names no flag today (its backfill is CORE-460.4) …
- Codex is picked up automatically the moment it gains its first flag row.
+ At mint time this exempted Codex's then-flagless table … The exemption is
+ self-clearing, and Codex has already spent it: CORE-460.4 backfilled that
+ table to 11 rows and Codex entered the gate with no edit to this check. The
+ stub sections remain exempt until they grow a first flag row.
```

This is the more interesting of the two findings: it is a *cohort-internal*
miss. Neither child was wrong on its own — `.3` wrote true prose, `.4` made it
false — and neither child's Phase 4 could have caught it, because each sees only
its own diff. It is precisely the class the epic-audit exists for.

**Verification of both fixes.** Pairs F (both halves), G, H (presence), and I all
print nothing after the edits. Pair I's derived roster still resolves to
`--fast --debug --worktree --park`, and trigger-table row counts hold at
**11 / 11 / 11** with the three stub sections at **0** — so the property the
rewritten bullet now claims is the one the check actually enforces.

**Checked and found clean (no action):**

- **Repo-wide roster sweep.** Grepped every `*.md` outside the archive for the
  two-flag pattern and for bare `--fast` mentions. Every remaining hit is either
  a legitimate single-flag reference (`SPEC/gates.md`'s `--fast` sections,
  `SECURITY.md:88`, `README.md:232`) or a full-roster table. The class is closed
  repo-wide, not just in the two files named.
- **Version-stamp mirroring.** `claude/CAPABILITIES.md` §"Last verified"
  (`v5.16.0 · 2026-08-09 (dogfooded; skipped @ v5.18.0)`) matches
  `docs/AGENT-COMPAT.md`'s Claude row byte-for-byte; PLATFORMS' three
  per-platform stamps match AGENT-COMPAT rows 37-39 exactly (Grok `2026-08-20`,
  Codex + Cursor `2026-08-18`). Codex's stamp is *correctly* un-restamped —
  CORE-460.4 appended provenance instead, per the CORE-458 precedent, so the
  stamp not moving is the recorded decision rather than a miss.
- **De-scope decisions still legible.** CORE-460.3's `grok/AGENTS-snippet.md`
  de-scope and its AGENT-COMPAT de-enumeration are both recorded in Pair I's
  fourth property bullet, so their absence from the gate cannot be misread later
  as oversight. Verified that bullet still reads correctly after the F2 edit to
  the bullet above it.

**Minor, recorded not filed.** The three children's doc-drift sweeps report
"17-entry" (`.2`), "17-entry" (`.3`), and "18 AI-referenced docs" (`.4`). The
list holds **17**. The `.4` count is an off-by-one in an archived note; archived
tasknotes are immutable history and are not edited by this audit, and no live
surface carries the wrong number. No follow-up warranted.

**No `/ft-file-followup` candidates.** Both findings were small, clearly in
scope, and repaired inline; nothing was deferred.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

Both changed files are contract-layer markdown, so the repo's own validation
roster has no direct bearing on them — but it was run rather than assumed, since
one of the two edits lands inside a skill body:

- `node --check tools/update-adopters.mjs` — OK
- `node --check tools/update-adopters.test.mjs` — OK
- `node --test tools/update-adopters.test.mjs` — **37/37 pass, 0 fail**
- `npm --prefix viz` lint/typecheck/test — **`N/A`**: no `viz/` input changed.

The load-bearing verification for a docs-and-gates audit is the release-gate
run, not the test suite: Pairs F (both halves), G, H (presence half), and I all
print nothing at HEAD after the edits, and Pair I's derivation was re-confirmed
to resolve its roster from `claude/CAPABILITIES.md` rather than a literal list.

**Quality assertions:** the F1 fix *removes* two duplicated rosters rather than
adding a third, and the F2 fix changes prose length only. No dead text, no new
public surface, no stale code-facing documentation introduced. **Frontend
confirmation `N/A`** — no UI surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — 17 AI-referenced docs, per-entry verdict:**

| # | Entry | Verdict |
|---|---|---|
| 1 | `README.md` | no change — its `--fast` mention (`:232`) is a single-flag within-task-autonomy bullet, not a roster. Its `:22-23` task counter reads 691 / "as of 2026-08-19" against an archive now at 710; that gap is **stale by design** and owned by `/ft-release` §7.1's Standing README task-counter check, which recomputes it per release cut — not a per-closure obligation, and deliberately not touched here |
| 2 | `AGENTS.md` | no change — carries the full four park flags (Pair F h1 green) |
| 3 | `SPEC.md` | no change — all `--fast` sites are single-flag contract references; v5.18.0 stamp current |
| 4 | `docs/MIGRATION.md` | **updated** — `:72` and `:294` de-enumerated to a §-pointer (finding F1) |
| 5 | `claude/AGENTS-snippet.md` | no change — names `--fast`/`--debug` as composition examples on specific skills, not as a platform roster |
| 6 | `codex/AGENTS-snippet.md` | no change — owns wiring commands only; flags are trigger-reference content, per CORE-460.3's recorded de-scope |
| 7 | `cursor/AGENTS-snippet.md` | no change — same wiring-only scope |
| 8 | `grok/AGENTS-snippet.md` | no change *deliberately* — CORE-460.3's operator de-scope, recorded in Pair I's fourth property bullet |
| 9 | `docs/CONVENTIONS.md` | no change — its `--fast` mention is a CI-rationale aside; Pair H presence half green |
| 10 | `CONTRIBUTING.md` | no change — no flag or platform surface |
| 11 | `SECURITY.md` | no change — `:88` is a single-flag reference inside the submodule-bump threat model |
| 12 | `docs/AGENT-NEUTRALITY.md` | no change — its three `--fast` ledger rows describe *why* the flag is named in SPEC/README, unaffected by roster width; `.4`'s one-word edit already landed |
| 13 | `docs/PLATFORMS.md` | no change — the epic's primary surface, fully closed by `.3` + `.4`; re-verified 11/11/11 rows, stubs at 0, stamps mirror AGENT-COMPAT |
| 14 | `claude/CAPABILITIES.md` | no change — source of truth for the roster; stamp `v5.16.0 · 2026-08-09 (dogfooded; skipped @ v5.18.0)` matches AGENT-COMPAT byte-for-byte |
| 15 | `docs/AGENT-COMPAT.md` | no change — de-enumerated by `.3`/`.4`; all four last-verified stamps consistent with PLATFORMS |
| 16 | `docs/EXTERNAL-AGENTS.md` | no change — no delegation/handoff contract touched by this cohort |
| 17 | `docs/WORKTREES.md` | no change — `--worktree` gained trigger-table rows in `.3`/`.4`, but the convention doc itself is unchanged |

**1 updated, 16 no change** (2 of those carrying an explicit *deliberately*
qualifier, per the de-scope decisions recorded in Pair I).

**Final Summary:**

The `CORE-EPIC-460` cohort holds together, and the audit found the one thing a
per-child closure structurally cannot see: `.4` invalidated prose `.3` had
written four hours earlier, in the same epic.

**Findings: 2, both repaired inline, 0 deferred.**

- **F1** (inherited — `.4` handed it forward): `docs/MIGRATION.md:72` / `:294`
  carried the stale two-flag Grok roster. De-enumerated to a
  `PLATFORMS.md §"Non-Claude capability triggers"` pointer in CORE-460.3's
  established idiom — **net −2 mirrors**, not a widened roster.
- **F2** (cohort-internal, previously unseen): Pair I's section-guard property
  bullet still described Codex's table as flagless and its gate entry as
  hypothetical, which `.4`'s 11-row backfill had already made false. Rewritten
  to preserve the design rationale while stating the spent exemption.

**Changed:** 2 files, 3 insertions / 3 deletions — `docs/MIGRATION.md` (2 lines),
`claude/skills/ft-release/SKILL.md` (1 property bullet).

**Verification:** Pairs F (both halves), G, H (presence), and I all print nothing
at HEAD after the edits; Pair I's derived roster resolves to
`--fast --debug --worktree --park`; trigger-table row counts re-confirmed at
11 / 11 / 11 with three stub sections at 0. `node --test
tools/update-adopters.test.mjs` **37/37 pass**; both `node --check`s OK; `viz`
lint/typecheck/test `N/A` (no `viz/` input changed).

**Cohort verdict:** no regressions in `.2`, `.3`, or `.4`'s shipped surfaces. The
three children compose as one arc — `.2` widened an existing gate to a layer it
had missed three times, `.3` minted a gate that derives rather than lists, `.4`
filled the surface `.3`'s guard was structurally exempting — and each child's
gated surface is strictly larger than the one before it. That is the epic's
stated theme ("mirror-pair gates lag the surfaces they guard") actually
discharged rather than merely asserted.

**Refactors:** none made, none deferred. **Documentation:** 17-entry sweep — 1
updated, 16 no change.

**Maintainability effect:** the epic closes with every non-Claude platform inside
Pair I, the park roster gated by a glob rather than a list, and two fewer prose
mirrors than it started with. The residual gap this audit exposes is narrower and
worth naming: **the property bullets that explain each pair are prose about
checks, and no check reads them.** F2 is that gap's first real instance — a
justification that outlived the condition it justified, inside the very skill
whose job is catching exactly this. Not filed as a follow-up (one instance is not
yet a class), but the next occurrence should mint a ticket rather than another
inline fix.

**Parent-flip decision:** operator confirmed **Yes** at the 📦 gate. `CORE-EPIC-460` flipped to stub form and the full cohort (`.2`, `.3`, `.4`, `.N`) moved atomically to the top of `## Completed`, captured in this same commit. `## Medium` retains 5 entries, so no `(none)` placeholder was needed.

**Archived:** 2026-08-21
