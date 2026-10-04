---
title: argument-hint-drift-gate
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-460.2, CORE-460.3, CORE-473.4, CORE-465, CORE-469]
touches:
  - claude/skills/ft-release/SKILL.md
  - claude/commands/ft-epic-discovery.md
  - claude/commands/ft-stats.md
  - docs/CONVENTIONS.md
---

# CORE-475 | argument-hint-drift-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-460.2]] [[CORE-460.3]] [[CORE-473.4]] [[CORE-465]] [[CORE-469]]

## 🎯 Goal

Mint a **Pair J** mirror-pair check in `/ft-release` §7.1 that binds each
`claude/commands/ft-*.md` stub's `argument-hint:` to the flags that stub
documents for itself — ignoring cross-reference mentions of other skills'
flags — and fix the findings it reports so the gate ships green.

## ✅ Acceptance

- [x] `/ft-release` §7.1 gains **Pair J** in the established mirror-pair shape: prose naming the drift class + the surfaces, a derived check (no hand-maintained roster), and a deliberate-properties note
- [x] The check's flag source is **stub-local and derived** — each stub's own `description:` frontmatter plus every backticked span that invokes its own slug — so a stub added or a flag landed later is covered the day it lands
- [x] Cross-reference flag mentions are ignored: `ft-worktree-start.md` / `ft-worktree-end.md` (`--fast` "not applicable here"), `ft-epic-discovery.md` / `ft-starter-task.md` (`/ft-file-followup --park [--low|--med|--fut|--high]`), `ft-goal-task.md` (`/ft-task <TASK-ID> --debug`), `ft-close-epic.md` ("there is no `--fast` here") all report clean
- [x] Pair J negative-tests as **firing** on the pre-fix tree (reports `ft-epic-discovery` and `ft-stats`) and prints nothing at HEAD after the fixes
- [x] `claude/commands/ft-epic-discovery.md` carries `argument-hint: [--deep]`; `claude/commands/ft-stats.md` carries `argument-hint: [--write]`
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI"'s §7.1-subset sentence names the widened pair range (`Pairs D and F–J`)
- [x] Pairs A–I still pass at HEAD — re-ran the wrapper-name invariant + Pairs B, E, F, G, I silent. Pairs A, C, D, H not re-run: none reads `claude/commands/` or `docs/CONVENTIONS.md` (A = `templates/` roster, C = template back-links, D = the README counter, H = validation commands), and the full `AGENTS.md` §"Validation" set passed

## 🧩 Subtasks

- [x] Draft the Pair J check and run it against the pre-fix tree (expect exactly two findings, zero false positives)
- [x] Write the Pair J block into `claude/skills/ft-release/SKILL.md` §7.1 after Pair I
- [x] Add `argument-hint:` to `claude/commands/ft-epic-discovery.md` and `claude/commands/ft-stats.md`
- [x] Update `docs/CONVENTIONS.md:58` pair range
- [x] Re-run Pair J (clean) + Pairs A–I + the wrapper-name invariant
- [x] Phase 4 closure ops

## 🔗 Related

- [[CORE-460.3]] — related-decision: minted Pair I with the derive-both-halves + section-guard idiom this pair reuses
- [[CORE-460.2]] — related-decision: widened Pair F to a globbed `claude/commands/*.md` half; established that command stubs are gate-able surfaces
- [[CORE-473.4]] — predecessor: last task to edit command-stub `argument-hint:` lines (added `--unattended` to three)
- [[CORE-465]] — related-decision: "derive, don't count" — a roster gate that itself drifted out of the roster
- [[CORE-469]] — a live Pair B failure sitting in `main` between cuts; the reason these gates keep getting widened

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and verified at HEAD — ten of nineteen
  `claude/commands/ft-*.md` stubs carry `argument-hint:`, and
  `ft-epic-discovery` (accepts `--deep`) and `ft-stats` (accepts `--write`)
  document a flag with no hint at all. No existing §7.1 check reaches
  `argument-hint:`.

- [x] Read relevant source files — probe not used; the read set was known and narrow (19 command stubs + §7.1)

- [x] **Best Practices Review** — N/A for code boundaries; this is a doc/gate surface. The applicable house pattern is the §7.1 mirror-pair shape (Pairs A–I): prose naming the drift class + its historical precedent, a **derived** check (never a hand-maintained roster), and a "properties a future edit should preserve" note. Pair J extends that pattern rather than inventing a new one. Its flag-extraction regex (`--[a-z][a-z-]+`, `grep -e` for BSD) is Pair B/E/F's established idiom.

- [x] **Archive skim** — `grep -l` over `archive/core/` for the touched paths:
  - [[CORE-460.3]] — minted Pair I; its recorded properties (derive both halves; a section naming *no* flag is skipped, not failed — the `continue` idiom) are the direct model for Pair J's "a stub documenting no flag is exempt" guard. It also records that [[CORE-460.2]] "surveyed and deliberately declined to mint Pair I", i.e. minting a pair is a normal follow-on motion here.
  - [[CORE-460.2]] — fixed the `claude/commands/*.md` half of Pair F; its notes locate the drift entry point at `CORE-399.md:24`, whose pattern-survey line named `ft-file-followup`'s `argument-hint` and `claude/AGENTS-snippet.md` but *not* the two command stubs. Same class as this task, one field over.
  - [[CORE-433.3]] — assumed "command `argument-hint` files stay out of scope (adopter paste / Claude wiring, not contract-layer mirrors)". That was a scope assumption for *that* task, later overtaken by CORE-460.2's command-stub half; it is not a standing decision that `argument-hint:` is ungateable. No superseded-claim pointer is owed — nothing factual was falsified.
  - [[CORE-473.4]] — most recent `argument-hint:` edit (added `--unattended` to `ft-task` / `ft-micro-task` / `ft-goal-task`), confirming the current hint shape is deliberate and maintained.
  - [[CORE-434]] — Pair H pins `ci.yml` `run:` lines byte-for-byte to `AGENTS.md` §Validation; this task must not touch `run:` steps. It does not.

- [x] **Drift check** — verified against current code, not recall:
  - `claude/skills/ft-release/SKILL.md` §7.1 exists and holds Pairs A–I (A:373, B:384, C:397, D:414, E:416, F:446, G:474, H:484, I:519); §7.2 begins at 546. Pair J's insertion point is between them.
  - Command stubs at HEAD: **with** `argument-hint:` — `ft-close-epic`, `ft-file-followup`, `ft-goal-task`, `ft-micro-task`, `ft-refactor`, `ft-spec`, `ft-starter-task`, `ft-task`, `ft-worktree-end`, `ft-worktree-start`. **Without** — `ft-audit`, `ft-audit-context`, `ft-audit-repo`, `ft-epic-discovery`, `ft-flowtron`, `ft-new-project`, `ft-release`, `ft-stats`, `ft-update`.
  - The PLAN line's live finding reproduces: `ft-epic-discovery.md` documents `--deep` in both its `description:` and a Usage bullet, with no `argument-hint:`. A **second** genuine finding exists that the PLAN line does not name: `ft-stats.md`'s `description:` documents `--write` with no `argument-hint:`.
  - Cross-artifact half: SPEC.md §"Skill namespace" contracts only the wrapper-name invariant (`Invoke the <name> skill`), not frontmatter — no contradiction. `docs/CONVENTIONS.md:58` enumerates the §7.1 checks the CI `drift` job does **not** duplicate as "Pairs D and F–I" — a mirror that must widen to `F–J`. This is the one cross-file obligation the new pair creates.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Flag source is stub-local.** Pair J reads one file per skill — the stub that carries the hint — rather than joining to `claude/skills/*/SKILL.md`. The PLAN line frames it as "the flags each stub documents", and a stub-local pair needs no cross-file join. Consequence: a flag named only in the *skill* body (e.g. `ft-close-epic`'s `--unattended`, which its stub states only in a negation clause) is not extracted. Accepted, one-directional, documented in the pair.
  2. **Cross-reference immunity comes from the span rule, not a phrase blocklist.** A flag counts only inside a backticked span invoking the stub's *own* slug (plus the `description:` line, where see-alsos never appear). Bare spans with no slug (`` `--fast` `` in the worktree stubs' "not applicable here" sentence) and foreign-slug spans (`` `/ft-task <TASK-ID> --debug` ``) are both excluded structurally. No `not applicable` / `there is no` string matching — that would be the fragile version.
  3. **One-directional (body → hint).** A hint may name flags the body does not (short aliases `-f` / `-d` / `-p`, and `ft-file-followup`'s priority roster, already owned by Pair F). Checking the reverse would report those as drift — the same reason Pair E's flag half is one-directional.
  4. **Long flags only** (`--[a-z][a-z-]+`), matching Pair B/E/F's established regex. Short aliases are not extracted.
  5. **Positional args are out of scope.** `ft-audit` (`<domain> [scope]`) and `ft-audit-repo` (`all` / path) accept arguments but no flags, so Pair J is silent on them. A positional-arg hint is a UX nicety, not the flag-drift class this pair guards. Not fixed here.
  6. **Pair J stays in §7.1 and does not join the CI `drift` job**, matching Pairs F–I. Adding it to `ci.yml` would also risk Pair H's `run:`-line extraction. Out of scope.
  7. **Both findings get fixed in this cut.** A gate that ships already-failing is the exact CORE-465 anti-pattern, so `ft-stats` is fixed alongside the named `ft-epic-discovery`.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Why the existing pairs miss this.** Pair B compares `claude/skills/*/SKILL.md`
`description:` to its Codex twin's `description:` — frontmatter to frontmatter,
correctly blind to `claude/commands/`. Pair E compares those same skill
descriptions to the `ft-flowtron` roster table. Pair F globs
`claude/commands/*.md` but only for the four park-priority flags, guarded to
skip a stub that names none. Pair I is `CAPABILITIES.md` ↔ `PLATFORMS.md`.
Nothing reads `argument-hint:` — the one frontmatter field Claude Code surfaces
to the operator at the moment they type the slash command.

**Design of the check.** Two halves over one loop:

- *Existence* — a stub whose own-flag set is non-empty must carry an
  `argument-hint:` at all. This is the half that fires today.
- *Coverage* — for a stub that has one, every own-flag must appear in it.

Flag source per stub `s`:

1. its `description:` line, run through Pair B's verbatim quote-strip
   (`sed -E 's/"[^"]*"//g'`) so `args="…"` illustrations never inflate the set;
2. every backticked span in the file that invokes `/s` — matched as
   `/s` followed by a non-`[a-z-]` character or end-of-span, so `/ft-audit`
   does not swallow `/ft-audit-repo`.

**Pre-fix expected output** (validated by hand against all 19 stubs): exactly
two `MISSING HINT` lines — `ft-epic-discovery :: --deep` and
`ft-stats :: --write`. Every other stub either resolves to an empty own-flag
set (exempt) or has all its own flags in its hint. Cross-reference sites
checked individually and all clean.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Pair J extends the §7.1 mirror-pair shape rather than
inventing one: prose naming the drift class and its precedent → a derived
check → a "properties a future edit should preserve" list. Three idioms are
borrowed rather than re-invented — Pair B's quote-strip `sed` (kept verbatim,
per its own sync note), Pair E's `case "$row" in *"$f"*)` membership test, and
Pair F's `continue` guard (a surface documenting no flag is skipped, not
failed). No new shape was needed, so none was justified.

**Minimal refactor gate.** No refactor. Pair J is additive; Pairs A–I are
untouched. The one edit outside the new block is the `docs/CONVENTIONS.md`
range widening, which Acceptance requires.

**Design iterations that were rejected before landing.** Recorded because the
rejected versions look reasonable:

1. *Whole-body flag extraction with a negation blocklist* (`not applicable`,
   `there is no`). Rejected — it makes correctness depend on sentence wording,
   and it still could not separate `ft-close-epic.md`'s own `--unattended`
   from the `--fast` negated in the same clause.
2. *Line-level exclusion of any line naming a foreign slug.* Rejected on
   measurement, not taste: both of `ft-micro-task.md`'s Usage bullets happen
   to cross-reference `/ft-task`, so the stub derived an empty set and the
   check went silent on a stub it should cover.
3. *Joining to `claude/skills/*/SKILL.md` `description:` as a third source.*
   It would recover `ft-close-epic`'s `--unattended`, but several skill
   descriptions bury their flags inside `args="…"` illustrations that the
   quote-strip (correctly) removes, so the gain is partial while the pair
   stops being stub-local. Declined; the coverage gap is documented instead.

The landed rule — a flag counts from the stub's own `description:`, or from a
backticked span invoking the stub's own slug — makes cross-reference immunity
*structural*. Every real cross-reference in the corpus is either a foreign-slug
span or a bare span, and both are excluded without reading any prose.

**Changed files (4):**

- `claude/skills/ft-release/SKILL.md` — +~30 lines: the Pair J block, inserted
  between Pair I and §7.2.
- `claude/commands/ft-epic-discovery.md` — +1 line: `argument-hint: [--deep]`.
- `claude/commands/ft-stats.md` — +1 line: `argument-hint: [--write]`.
- `docs/CONVENTIONS.md` — 1 word: §"GitHub Actions CI"'s §7.1-subset sentence,
  `Pairs D and F–I` → `Pairs D and F–J`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface changed (four markdown files)

**Testing Notes:**

**Pair J negative test (pre-fix tree).** Reported exactly two findings and no
false positives:

```text
MISSING HINT      ft-epic-discovery :: --deep
MISSING HINT      ft-stats :: --write
```

The derived own-flag set was inspected for all 19 stubs before the fix. Every
cross-reference site resolved as designed: `ft-worktree-start`,
`ft-worktree-end`, `ft-starter-task`, and `ft-close-epic` each derive the empty
set (bare or foreign-slug spans only); `ft-goal-task` derives
`--fast --unattended --worktree` and correctly **not** `--debug`, which appears
only inside its `` `/ft-task <TASK-ID> --debug` `` see-also span.

**Pair J positive test (post-fix).** Silent.

**Shell portability.** Verified identical output under both zsh and bash. The
zsh array-subscript trap was found by running the check, not by reading it: an
unbraced `$s[^a-z-]` dies with `bad math expression`, and the resulting empty
`grep` pattern matched every span and reported cross-references as drift — a
silent-false-positive mode, so `${s}` is recorded as load-bearing in the pair.

**Neighbouring §7.1 gates re-run at HEAD — all silent:** wrapper-name
invariant, Pair B, Pair E (rows `diff` exit 0 + flags), Pair F command-stub
half, Pair G, Pair I.

**Full validation suite** (`AGENTS.md` §"Validation", all six):

- `npm --prefix viz test` — 470 passed (470)
- `npm --prefix viz run typecheck` — clean
- `npm --prefix viz run lint` — clean
- `node --test tools/update-adopters.test.mjs` — exit 0
- `node --check tools/update-adopters.test.mjs` / `node --check tools/update-adopters.mjs` — clean

Markdown fence balance in `ft-release/SKILL.md` re-checked (62 fence lines,
even); the new `sh` fence opens and closes correctly despite carrying inline
backticks in the span-extraction `grep`.

**Quality assertions.** No duplication introduced — the three borrowed idioms
are cited to their owning pairs rather than re-explained. No dead code. The
one non-obvious construct in the check (`${s}` + `[^a-z-]`) carries its
rationale in the properties list. No public-surface growth: two stubs gained a
frontmatter field the other ten already carry. `docs/CONVENTIONS.md` was the
only stale cross-reference the change created, and it is fixed in the same
commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted

**Doc-drift sweep (18 entries):**

| Doc | Verdict |
|---|---|
| `README.md` | no change — repo overview; carries no pair roster |
| `AGENTS.md` | no change — peer-skill roster is names-only (plus Pair F's park flags); no `argument-hint` surface |
| `SPEC.md` | no change — §"Skill namespace" contracts the wrapper-name invariant only; §7.1 pairs are wiring-layer |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change — wiring commands + names-only roster |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | **updated** — §"GitHub Actions CI": `Pairs D and F–I` → `Pairs D and F–J` |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — `argument-hint:` is Claude Code wiring under `claude/`; adds no contract-layer surface, so no ledger row |
| `docs/PLATFORMS.md` | no change — its non-Claude trigger tables are bound to `CAPABILITIES.md` rows by Pair I, which is unchanged and still silent |
| `claude/CAPABILITIES.md` | no change — see the deferred note below; last-verified stamp untouched (no version bump in this cut) |
| `docs/AGENT-COMPAT.md` | no change — structural matrix; defers per-agent triggers to PLATFORMS |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |
| `.flowtron/tasknote/README.md` | no change — doc set and quick commands unaffected |

**Deferred (not this task's surface).** `--deep` is arguably a
`claude/CAPABILITIES.md` row: it is an operator flag that changes *how*
`/ft-epic-discovery` runs (a three-stage pre-pass with its own gates), which is
the same footing as `--debug`'s "adds content only" row. It is absent today.
Adding it is not a one-line edit — Pair I holds every non-Claude
`docs/PLATFORMS.md` trigger table that already names ≥1 flag to the *full*
derived roster, so a new `CAPABILITIES.md` row obliges matching rows in those
tables. That is a task, not a closure fix. `--write` is deliberately **not** a
candidate: it selects an output destination rather than changing how the skill
runs.

**Final Summary:**

Minted **Pair J** in `/ft-release` §7.1 — the first standing check to bind a
command stub's `argument-hint:` to the flags that stub actually documents — and
fixed the two stubs it reported, so the gate ships green rather than
pre-drifted.

The gap it closes: `argument-hint:` is the only flag roster Claude Code shows
the operator at the moment they type a slash command, and nothing had ever read
it. Pairs B and E read `claude/skills/*/SKILL.md` frontmatter, Pair I reads
`CAPABILITIES.md` ↔ `PLATFORMS.md`, and Pair F globs `claude/commands/*.md` but
only for four park-priority flags. `/ft-epic-discovery` had shipped `--deep`
with no hint at all since the flag landed; `/ft-stats --write` was in the same
state and had not been noticed.

Evidence: 4 files changed (~33 lines net). Pair J negative-tested as firing on
the pre-fix tree with exactly two findings and zero false positives across all
19 stubs, then silent post-fix, in both zsh and bash. The wrapper-name
invariant and Pairs B, E, F, G, and I re-ran silent at HEAD; the full
`AGENTS.md` §"Validation" set passed (470 viz tests, typecheck, lint,
`node --test`, both `node --check`s).

Refactors: none — the pair is additive and reuses three existing §7.1 idioms
by citation. Deferred: a `CAPABILITIES.md` row for `--deep`, which pulls Pair
I's non-Claude tables along with it (recorded above).

Maintainability effect: the check is derived and stub-local — one file per
skill, no roster to keep in sync — so a stub added or a flag landed later is
covered the day it lands, and it cannot suffer the CORE-465 failure of a gate
that drifts out of its own roster. Cross-reference immunity is structural
rather than phrase-based, so rewording a see-also sentence cannot break it.

**Archived:** 2026-08-25
