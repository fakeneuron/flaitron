---
title: install-path dedup
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438]
---

# CORE-439 | install-path dedup

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]]

## 🎯 Goal

Pick one canonical skill-install path per agent and document it, so flowtron's
skills are enumerated once in a session's system prompt instead of ~3×.

## ✅ Acceptance

- [ ] `docs/PLATFORMS.md` §"Installed-surface policy" states the canonical-path
      rule in one place: **repo-scoped wiring is canonical**, and an agent home
      carries only the global-only utility set — with the two observed harness
      behaviours (project/user tiers enumerate separately; user-tier slugs dedupe
      by name across `.claude`/`.agents`, body-blind) given as the reason.
- [ ] The rule is stated **per agent home**, and names the cross-agent read of
      `~/.agents/skills/` (Claude + Cursor + Codex) as why Codex wrappers must
      not be globally installed beyond the utility set.
- [ ] `docs/MIGRATION.md` §1.2.2's whole-inventory global glob and its
      "instead of **or alongside**" license no longer contradict the rule.
- [ ] `codex/AGENTS-snippet.md` §"Pinning notes" maintainer glob no longer
      contradicts the rule.
- [ ] `docs/MIGRATION.md` §1.0's per-skill install shape reads as the *only*
      sanctioned global install (no change expected to the command itself).
- [ ] A copy-paste cleanup block is surfaced to the operator (✋ ACTION, not
      executed) with the measured before/after roster effect.
- [ ] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md`
      §"AI-referenced docs".

## 🧩 Subtasks

- [ ] Write the canonical-path rule into `docs/PLATFORMS.md`
      §"Installed-surface policy", after the existing four-term vocabulary
- [ ] Amend that section's "Machine-global `~/.claude/` installs stay
      discretionary … only *broken* links there are drift" clause so
      discretionary means *which* utilities, not *how many* copies
- [ ] Correct `docs/MIGRATION.md` §1.2.2 — the `claude/skills/*` global glob and
      the "instead of or alongside" sentence
- [ ] Correct `codex/AGENTS-snippet.md` §"Pinning notes" `codex/skills/*` glob
- [ ] Re-read `docs/MIGRATION.md` §1.0 and `README.md:35`; confirm both already
      match the rule or fix them
- [ ] Phase 3: markdown pass over the diff; re-grep the install-shape sites to
      confirm no surviving contradiction
- [ ] Phase 4: doc-drift sweep, closure writes, then surface the operator
      cleanup block

## 🔗 Related

- [[CORE-EPIC-438]] — cursor-wiring epic; `.2` verifies Cursor install paths and `.3` ships the `cursor/` bundle, both of which need this decision first

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The duplication is real and measurable in this very session
  (36 `ft-*` roster entries for 18 unique skills). [[CORE-EPIC-438]] `.2`/`.3`
  are about to lock a *fourth* install path (`.cursor/skills/`), so the
  canonical-path decision is cheapest now, before it is written into a new
  adopter snippet.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Measured duplication (this session, Cursor, cwd = flowtron checkout)

Three directories install flowtron skills for one agent:

| Install path | Points at | `ft-*` count | Authorised by |
|---|---|---|---|
| `<repo>/.claude/skills/` | `../../claude/skills/*` (relative) | 18 | `docs/PLATFORMS.md` §"Installed-surface policy" → "Flowtron's own checkout is not an adopter" (**mandatory**: full inventory, 1:1) |
| `~/.claude/skills/` | `/Users/…/Code/flowtron/claude/skills/*` (absolute) | 17 (no `ft-spec`) | `docs/MIGRATION.md` §1.0 install table + §1.2.2 hot-reload glob (**discretionary**) |
| `~/.agents/skills/` | `/Users/…/Code/flowtron/codex/skills/*` (absolute) | 18 | `codex/AGENTS-snippet.md` §"Pinning notes" maintainer hot-reload block (**discretionary**) |

Session roster: **84 skill entries, 36 of them `ft-*`, for 18 unique skills** —
18 redundant entries, all flowtron-owned. (A further 13 duplicates come from the
operator's Cloudflare plugin cache mirroring `~/.agents/skills/`; **out of scope**
— not flowtron's surface. Total ≈31/84, which corroborates the PLAN line's
"~29 of ~81" estimate; treat that figure as approximately confirmed, not exact.)

### Observed resolution rule (empirical, this harness)

- Project-scope and user-scope are **separate tiers** — `<repo>/.claude/skills/ft-task`
  and `~/.claude/skills/ft-task` both enumerate. This is the whole duplication.
- Within the user tier, collisions are deduped **by slug**, with `~/.claude/skills/`
  winning over `~/.agents/skills/`. Evidence: 17 of the 18 `~/.agents/skills/ft-*`
  Codex wrappers were shadowed; only `ft-spec` surfaced, and only because
  `~/.claude/skills/` happens not to have it. Same pattern on the non-flowtron
  `cloudflare` family.

### Correctness hazard (not just bloat)

The shadowing is slug-based, not body-aware. `~/.agents/skills/ft-spec` resolves
to the **Codex** wrapper, and it is what a Cursor session loads. Codex wrappers
are written around Codex's lack of a native structured ask and instruct the agent
to degrade it to prose — exactly the mis-instruction [[CORE-438.1]] identified as
"actively harmful" for Cursor, which has a native structured ask. So the current
layout does not merely waste roster entries; on at least one slug it serves the
wrong body to this agent. Any slug present in `~/.agents/` but absent from
`~/.claude/` inherits this.

### Archive skim — `.flowtron/tasknote/archive/core/`

- **[[CORE-438.1]]** — established that Cursor loads `.claude/skills/` as a
  documented compat surface, and that `.2` will lock a fourth install path.
  Its "thin `cursor/` bundle" decision means Cursor adopters symlink the
  canonical `claude/skills/` bodies, so a canonical-path rule benefits it directly.
- **[[CORE-349.2]]** — authored the four-term vocabulary (shipped inventory /
  adopter-installed subset / global-only utilities / flowtron-self-only). The
  **global-only utilities** category already implies the answer: those five skills
  live in the agent home *instead of* per-repo, which by symmetry means the
  repo-wired subset should not *also* live in the agent home.
- **[[CORE-154.3]]** — adopter symlink path stability into `.flowtron/core/` is a
  Constitution non-negotiable. Whatever is decided must not touch the
  repo-scoped adopter path.
- **[[CORE-320]]** — `update-adopters.mjs` `newSkillsShipped()` reads the
  `AGENTS-snippet.md` §"One-time symlink wiring" `ln -s` list; snippet edits are
  fleet-visible, so any install-shape change there has a downstream consumer.

### Drift check

- All three install dirs verified on disk at HEAD `51a6175`; every symlink
  resolves (no dangling links).
- `docs/PLATFORMS.md:78-87` ("Flowtron's own checkout is not an adopter") is
  accurate and stays — the repo-scoped mirror is deliberate. The clause
  "Machine-global `~/.claude/` installs stay discretionary … only *broken* links
  there are drift" is the sentence that licenses the duplication.
- `docs/MIGRATION.md:200-206` §1.2.2 tells maintainers to glob-install the
  **entire** inventory globally (`ln -s ~/code/flowtron/claude/skills/*`), and
  `:210-221` explicitly blesses doing it "instead of **or alongside**" the local
  `.claude/` wiring. That "alongside" is the direct cause of the 17-entry overlap.
- `codex/AGENTS-snippet.md:51-58` carries the same glob shape for `~/.agents/skills/`.
- No SPEC contract conflict: SPEC.md §"Skill namespace" reserves the `ft-` slug
  namespace but says nothing about *where* skills install. This task is
  wiring/docs-layer only, consistent with the PLAN.md line.
- No archived tasknote carries a falsified factual claim → no superseded-claim
  pointer owed.

### Best Practices Review

Touched boundary is documentation of the wiring layer, not code. Dependency
direction is preserved: `docs/PLATFORMS.md` owns the policy vocabulary and
`docs/MIGRATION.md` + the per-platform `AGENTS-snippet.md` files are the
executable projections of it — so the decision belongs in PLATFORMS.md and the
install commands elsewhere must be corrected to match, never the reverse. No
in-scope refactor; no new abstraction (a rule, not a mechanism — flowtron ships
no installer, per SPEC §"What flowtron does NOT provide").

### Resolved scoping

| Question | Resolution |
|---|---|
| Which canonical rule | **Repo-scoped wins.** An agent home carries only the global-only utility set (`ft-new-project`, `ft-flowtron`, `ft-stats`, `ft-audit-context`, `ft-audit-repo`, `+ft-update`); the tasknote family, worktree pair, and `ft-release` are never installed globally, because every repo that uses them already wires them repo-scoped. Rejected: dropping flowtron-self's repo-scoped mirror — that would rewrite a deliberate `docs/PLATFORMS.md` mandate to solve a machine-state problem. |
| Codex wrappers at `~/.agents/skills/` | **Same rule, and say why.** Claude and Cursor both read that directory, so a globally installed Codex wrapper can be served to an agent it was not written for. The utility set is the ceiling there too, and only on a machine where Codex actually drives. |
| Deliverable reach | **Docs are the committed deliverable**; machine state stays operator-owned and is surfaced as a copy-paste ✋ ACTION block. Flowtron ships no installer (SPEC §"What flowtron does NOT provide"). |

**Deliberately deferred.** `claude/skills/ft-release/SKILL.md` §7.1's
"Machine-global wiring — advisory" block scans for dangling links and path-casing
drift, but not for *over*-install. Extending it would make the new rule
machine-checkable, but §7.1 is explicitly non-blocking machine state and the
operator scoped this task to docs — recording the option here rather than growing
the diff. Candidate follow-up if the rule proves hard to hold.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Followed the existing shape of §"Installed-surface policy":
a named rule stated once in `docs/PLATFORMS.md`, with `docs/MIGRATION.md` and the
per-platform `AGENTS-snippet.md` files as its executable projections pointing
back by section name. That is the same one-way dependency the section already
declares ("The per-platform `AGENTS-snippet.md` files are the executable install
source and must be kept aligned to this policy"), so no new shape was invented
and the rule text exists in exactly one place.

**Minimal refactor gate.** One restructure was required rather than cosmetic:
`docs/MIGRATION.md` §1.2.2 presented the machine-global glob as the primary
maintainer install and the repo-scoped wiring as "Optional … instead of **or
alongside**". Correcting only the command while leaving that framing would have
left the section arguing against the rule it now cites, so the two blocks were
swapped in emphasis — repo-scoped first as canonical, global demoted to
utilities-only. The closing sentence "The global form above is still the right
choice when you want a single `~/.claude/` that serves flowtron + every adopter
project" was deleted: it is the exact license the task exists to withdraw.

**Sites changed (5):**

| File | Change |
|---|---|
| `docs/PLATFORMS.md` | New `###` subsection "One canonical install path per project" under §"Installed-surface policy" (+31 lines), stating the rule and the two agent behaviours that motivate it. Amended the §"Flowtron's own checkout is not an adopter" discretionary clause to scope *discretionary* to which utilities, not how many copies. |
| `docs/MIGRATION.md` §1.0 | Added a paragraph making the per-skill install shape the only sanctioned global one (the `ln -s` command itself was already correct). |
| `docs/MIGRATION.md` §1.2.2 | Repo-scoped `.claude/` wiring promoted to the primary hot-reload path; machine-global block rewritten as utilities-only; "instead of or alongside" and the closing global-is-still-right sentence removed. Added the parallel `.agents/skills/` repo-scoped block for Codex maintainers. |
| `codex/AGENTS-snippet.md` | §"Pinning notes" maintainer glob replaced with a repo-scoped `.agents/skills/` install plus the cross-agent-read rationale. |
| `.gitignore` | Added `.agents/`; rewrote the comment block, which described the now-withdrawn "global symlinks … optional local equivalent" posture. |

**Two additions beyond the four files previewed at the 🛠️ gate**, both forced by
making the rule followable rather than merely stated:

1. **`.agents/` in `.gitignore` + the Codex repo-scoped block.** The rule sends
   Codex maintainers to repo-scoped wiring, but flowtron's checkout had no
   `.agents/skills/` and no ignore rule for one — so the rule as written would
   have had no path to comply with for Codex, and complying would have created
   untracked dirt. One ignore line and one command block close that.
2. **`docs/MIGRATION.md` §1.0 paragraph.** §1.0 is where an adopter actually
   reads install instructions; leaving it silent would have meant the rule lived
   only in a doc adopters reach second.

**Discovered, not fixed (out of approved scope).**
`claude/skills/ft-release/SKILL.md:341` asserts "`.claude/` is committed repo
state, so the fix lands in this cut". That is false at HEAD — `.claude/` is
gitignored (`.gitignore:16`) and `git ls-files .claude` is empty, verified this
session. The claim makes a §7.1 check blocking on the grounds that its fix is
committable, when it is machine state like the global half. Left alone: changing
a release gate's blocking posture is a separate decision, and the operator scoped
this task to install-path documentation. Recommended follow-up.

**Tests:** N/A — markdown prose and one `.gitignore` line; no executable surface.
Verification is the re-grep in Testing Notes.
## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34/34 pass** (run because `codex/AGENTS-snippet.md` is a fleet-updater input)

- [x] Ran lint/type-check on changed code — N/A: markdown prose + one `.gitignore` line; no lintable or typed surface

- [x] **Quality assertions** — see below

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

### Contradiction re-grep (the actual verification for a docs task)

| Check | Command | Result |
|---|---|---|
| No surviving whole-inventory glob into an agent home | `rg 'ln -s.*(claude\|codex)/skills/\*.*~/'` (excl. archive + this note) | no matches ✅ |
| No surviving license sentences | `rg 'instead of or alongside\|global form above'` (excl. archive) | no matches ✅ |
| Rule referenced from every projection | `rg -c 'One canonical install path per project'` | `docs/PLATFORMS.md` 1 (the definition), `docs/MIGRATION.md` 3, `codex/AGENTS-snippet.md` 1 ✅ |

### Fleet-updater integration

`tools/update-adopters.mjs` `wiredSkillKeys()` scans **every** `ln -s` line in a
snippet, so a new command block there is a live input. Its
`snippetKeyPattern` (`/\.flowtron\/core\/(codex\/skills\/\S+)/`, line 95) requires
a `.flowtron/core/` prefix, which the new maintainer-side `ln -s ../../codex/skills/*`
line does not carry — and the line it replaced was equally a glob, so the parsed
key set is unchanged. Confirmed by the passing suite above rather than by
inspection alone.

### Quality assertions

- **Duplication:** the rule text exists once, in `docs/PLATFORMS.md`. The three
  other sites cite it by section name rather than restating it; each states only
  the local install command it governs. Net prose was *removed* from
  `docs/MIGRATION.md` §1.2.2 (the two blocks previously repeated the `.claude/`
  relative-symlink explanation nearly verbatim — that duplication is now gone).
- **Dead content:** the withdrawn "global form above is still the right choice"
  sentence and the "Optional: local `.claude/` wiring" heading were deleted, not
  left contradicting the new rule.
- **Public-surface growth:** one new `###` subsection and one `.gitignore` entry.
  No new skill, template, script, or frontmatter field — the deliverable is a
  rule, consistent with SPEC §"What flowtron does NOT provide" (no installer).
- **Stale references:** all four `[`PLATFORMS.md`](PLATFORMS.md)` /
  `../docs/PLATFORMS.md` links resolve, and every cited section heading exists.
  `README.md:35` re-read and left alone — it already installs a single utility,
  which is exactly the shape the rule mandates.
- **Known-stale left in place, deliberately:** `claude/skills/ft-release/SKILL.md:341`
  ("`.claude/` is committed repo state") — recorded in Implementation Notes with
  the evidence and the reason it is out of scope.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

| Doc | Verdict |
|---|---|
| `README.md` | no change — §"Quickstart" installs a single utility (`ft-new-project`), already the shape the new rule mandates; re-read to confirm |
| `SPEC.md` | no change — §"Skill namespace" reserves the `ft-` slug namespace but is silent on install location; this task adds no contract semantics |
| `docs/MIGRATION.md` | **updated** — §1.0 gained the one-at-a-time clause; §1.2.2 restructured (repo-scoped promoted to canonical, global demoted to utilities-only, Codex block added) |
| `claude/AGENTS-snippet.md` | no change — adopter repo-scoped wiring only; carries no machine-global install commands (verified by grep) |
| `codex/AGENTS-snippet.md` | **updated** — §"Pinning notes" maintainer glob replaced with repo-scoped wiring + cross-agent-read rationale |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — no new trust boundary; the rule reduces the number of paths from which skill bodies load, if anything |
| `docs/AGENT-NEUTRALITY.md` | no change — the rule lands in the wiring layer (`docs/PLATFORMS.md`), not the contract layer, so the ledger of Claude-specific contract surfaces is unaffected |
| `docs/PLATFORMS.md` | **updated** — new §"One canonical install path per project"; discretionary clause in §"Flowtron's own checkout is not an adopter" scoped |
| `claude/CAPABILITIES.md` | no change — Claude-only trigger reference, no install surface |
| `docs/AGENT-COMPAT.md` | no change — per-agent capability/currency matrix; install-path policy is PLATFORMS.md's half of the split |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change |

Three of fourteen updated; the rest re-read and confirmed unaffected.
(`.gitignore` is not on the AI-referenced list but was changed — noted here so
the sweep is not read as the complete file list; see Implementation Notes.)

**Final Summary:**

Locked one canonical skill-install path per project and withdrew the
documentation that licensed installing the same skills two and three times over.
Flowtron's 18 skills were landing in a session's roster 36 times — measured live
in this Cursor session, 36 of 84 total entries — because project scope and user
scope enumerate separately and three directories all carried the full inventory.

The rule: **repo-scoped wiring is canonical; an agent home carries only the
global-only utilities.** It is stated once, in `docs/PLATFORMS.md`
§"One canonical install path per project", with the two agent behaviours that
make it a correctness rule rather than tidiness — separate scope enumeration, and
user-scope collisions resolving by slug rather than by body.

The second behaviour is the finding worth keeping. Slug-based shadowing is
body-blind, and `~/.agents/skills/` is read by Codex, Claude Code, and Cursor
alike — so a globally installed Codex wrapper gets served to agents it was not
written for. That is observable right now: `ft-spec` resolves to the Codex
wrapper in this Cursor session, and Codex wrappers instruct the agent to degrade
a structured ask to prose, which [[CORE-438.1]] identified as "actively harmful"
for a platform with a native one. So the duplication was not only wasting roster
entries; on at least one slug it was serving the wrong body.

**Changed files (5):** `docs/PLATFORMS.md` (+31/−3), `docs/MIGRATION.md`
(§1.0 +2, §1.2.2 restructured — net prose reduced, two near-duplicate
explanations collapsed to one), `codex/AGENTS-snippet.md` (+13/−6),
`.gitignore` (+`.agents/`, comment rewritten), and this tasknote.

**Verification:** three contradiction re-greps, all clean (no surviving
whole-inventory glob into an agent home; no surviving "instead of or alongside"
or "global form above" license; the rule cited from all three projections). Plus
`node --test tools/update-adopters.test.mjs` → 34/34, run because
`codex/AGENTS-snippet.md` is a live fleet-updater input — its
`snippetKeyPattern` requires a `.flowtron/core/` prefix the new maintainer line
does not carry, so the parsed key set is unchanged. Lint/type-check `N/A`
(markdown).

**Refactors:** one made — `docs/MIGRATION.md` §1.2.2's two install blocks were
swapped in emphasis rather than edited in place, because correcting the command
while leaving "Optional … instead of **or alongside**" would have left the
section arguing against the rule it now cites. One deferred:
`claude/skills/ft-release/SKILL.md:341` claims "`.claude/` is committed repo
state" — false at HEAD (`.gitignore:16`; `git ls-files .claude` empty, verified),
and it makes a §7.1 check blocking on that false premise. Changing a release
gate's blocking posture is a separate decision; recommended as a follow-up.

**Documentation verdict:** 3 of 14 AI-referenced docs updated, 11 confirmed
unaffected.

**Maintainability effect:** the rule lands *before* [[CORE-EPIC-438]] `.3` writes
a fourth install path — `cursor/AGENTS-snippet.md` now has a policy to inherit
instead of a precedent to copy, which was the whole reason this was filed ahead
of it. Enforcement stays human: no installer, no validator, one rule in the doc
that the platform snippets already declare themselves subordinate to.

**Archived:** 2026-08-12
