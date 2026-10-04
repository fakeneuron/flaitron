---
title: cursor-wiring-bundle
status: completed
tags: []
created: 2026-08-12
related-tasks: [CORE-EPIC-438, CORE-438.1, CORE-438.2, CORE-439]
---

# CORE-438.3 | cursor-wiring-bundle

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]] · [[CORE-438.1]] · [[CORE-438.2]] · [[CORE-439]]

## 🎯 Goal

Ship the `cursor/` sibling wiring directory — `AGENTS-snippet.md` plus a
`procedures/ft-task.md` pointer, no skill wrappers — so Cursor becomes a
first-class wiring platform under `docs/PLATFORMS.md` §"The symmetric plug-in
pattern".

## ✅ Acceptance

- [x] `cursor/AGENTS-snippet.md` exists and carries all three sections `docs/PLATFORMS.md` §"What the `<PLATFORM>`-snippet must contain" mandates: paste-block **reference** (not a second copy), one-time wiring commands, pinning notes
- [x] The wiring section implements [[CORE-438.2]]'s locked mechanism — **relative directory symlink** — and its finding 2: the primary path points adopters at `claude/AGENTS-snippet.md` §"One-time symlink wiring" instead of duplicating that `ln -s` list, with a real `.cursor/skills/` block offered only as the Cursor-only-project variant
- [x] The `ln -s` block sits under a literal `## One-time symlink wiring` heading and is non-empty, per the PLAN line and [[CORE-438.2]] finding 4's "no empty heading that parses to zero wired skills" — parity `diff` shows 11/11
- [x] Fleet-updater behaviour **confirmed against `tools/update-adopters.mjs`, not assumed** ([[CORE-438.2]] finding 4's explicit obligation), and the verdict recorded in Testing Notes — the confirmation *disproved* the PLAN line's rationale; see Testing Notes §"Fleet-updater confirmation"
- [x] `cursor/procedures/ft-task.md` ships as a thin router to `SPEC/procedures/ft-task.md`, matching the `codex/` + `grok/` pointer shape ("route, don't copy" per `SPEC/procedures/README.md`)
- [x] No skill or command wrappers ship — no `cursor/skills/`, no `cursor/commands/` — per [[CORE-438.1]]'s thin-bundle decision
- [x] The snippet declares itself subordinate to `docs/PLATFORMS.md` §"One canonical install path per project" ([[CORE-439]]) and adds a repo-scoped install path only, never a second global one
- [x] Contract layer untouched: no `SPEC.md`, `SPEC/*.md`, or `templates/` edit, and no Cursor-specific term enters the contract layer (`docs/AGENT-NEUTRALITY.md` posture preserved)
- [x] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Create `cursor/` with `AGENTS-snippet.md`: paste-block reference, `## One-time symlink wiring` (Claude-block reference as primary + `.cursor/skills/` variant block), frontmatter-strictness caveat, pinning notes
- [x] Create `cursor/procedures/ft-task.md` mirroring the `codex/` / `grok/` router shape
- [x] Verify the fleet-updater claim against `tools/update-adopters.mjs` `WIRING_SURFACES` / `wiredSkillKeys` and record what actually flags a Cursor adopter
- [x] Phase 3: confirm no `cursor/skills/` or `cursor/commands/` exists; markdown pass; re-run the updater suite (snippet surface is a fleet-updater input)
- [x] Phase 4: doc-drift sweep, superseded-claim pointer on [[CORE-438.2]] if the drift finding holds, closure writes, archive

## 🔗 Related

- [[CORE-EPIC-438]] — parent epic: promote Cursor from contract-only stub to a shipped wiring platform
- [[CORE-438.1]] — epic Discovery; locked the **thin** bundle (snippet + procedure pointer, no skill wrappers)
- [[CORE-438.2]] — locked the install mechanism (relative symlink) and left five lift-ready findings this task consumes
- [[CORE-439]] — one-canonical-install-path rule this snippet must inherit rather than re-litigate

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `cursor/` does not exist at HEAD (`ls` verified), the two
  upstream children that gate it are closed, and [[CORE-438.2]] handed over a
  locked mechanism plus a "Findings for `CORE-438.3`" section written to be
  lifted. Nothing in the filed scope has gone stale; the task is smaller than
  filed rather than different, because finding 2 replaced "author install
  commands" with "reference the existing ones".

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

`SPEC.md` (contract + repo-layout list), `SPEC/epic.md`, `SPEC/procedures/README.md`,
`docs/PLATFORMS.md` (full), `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`,
`codex/procedures/ft-task.md`, `grok/procedures/ft-task.md`,
`tools/update-adopters.mjs` (wiring-surface region), `.gitignore`,
`docs/AGENT-NEUTRALITY.md` (ledger + out-of-scope section),
`.flowtron/tasknote/README.md`, and the three archived siblings
[[CORE-438.1]] / [[CORE-438.2]] / [[CORE-439]]. Narrow and known-shaped — no
probe needed.

### What the two closed siblings already decided (this task inherits, not re-decides)

| Decision | Source | Effect on `.3` |
|---|---|---|
| Bundle is **thin**: `AGENTS-snippet.md` + `procedures/ft-task.md`, no skill wrappers | [[CORE-438.1]] | Fixes the deliverable to two files |
| Mechanism is **relative directory symlink**, verified discovered + resolved + invoked at adopter depth | [[CORE-438.2]] finding 1 | No copy fallback, no pinning-story divergence |
| Cursor adopters need **no new install commands** — project-scope dirs dedupe by slug, `.claude/` wins | [[CORE-438.2]] finding 2 | Snippet *references* the Claude block; `.cursor/skills/` is the Cursor-only variant |
| Do not build logic on directory precedence | [[CORE-438.2]] finding 3 | State it as an observation, not a rule |
| Ship a frontmatter-strictness caveat | [[CORE-438.2]] finding 5 | One caveat paragraph in the snippet |
| Repo-scoped wiring is canonical; agent home carries global-only utilities | [[CORE-439]] | Snippet adds one repo-scoped path and cites the rule |

### Drift check

- `cursor/` **does not exist** at HEAD — confirmed by `ls`. No partial bundle to reconcile.
- `codex/procedures/ft-task.md` and `grok/procedures/ft-task.md` are byte-identical
  apart from the platform word in the H1. That is the shape to mirror, and
  `SPEC/procedures/README.md` §"Loading convention" confirms the pointer routes
  rather than restates.
- `docs/PLATFORMS.md:132` still labels `cursor/` "hypothetical Cursor wiring" and
  `:370` still carries the `### Cursor (stub)`. This task falsifies the first.
  Both flips are filed to `.4`/`.5` and are deliberately **not** taken here —
  same containment [[CORE-438.2]] practised. Tracked, not forgotten.
- `.gitignore:11` still comments its block as covering "Cursor wiring" while
  ignoring only `.claude/` and `.agents/`. Unchanged from [[CORE-438.2]]'s note;
  still routed to `.4`. This task creates no `.cursor/` directory in the
  checkout, so it adds no dirt.
- `docs/AGENT-NEUTRALITY.md:75-85` names `cursor/` as a sibling wiring dir inside
  its **out-of-scope** section, pointing at `PLATFORMS.md` for the pattern. Shipping
  `cursor/` needs no ledger entry: the ledger tracks Claude-specific surfaces in
  the *contract* layer, and this is wiring.

#### Drift found — the PLAN line's fleet-updater rationale is wrong at HEAD

The `.3` PLAN line asks for the `ln -s` block "under a `One-time symlink wiring`
heading **so the fleet updater flags bumps**". That causal clause does not hold:

- `tools/update-adopters.mjs:77-101` defines `WIRING_SURFACES` as a **hardcoded
  two-entry list** — `claude/AGENTS-snippet.md` and `codex/AGENTS-snippet.md`.
  A `cursor/AGENTS-snippet.md` is not read at all, whatever heading it carries.
- `wiredSkillKeys()` (`:301-315`) is **heading-agnostic**: it iterates every line
  of the snippet, keeps those containing `ln -s`, and matches
  `surface.snippetKeyPattern`. The `One-time symlink wiring` heading is
  load-bearing for humans and for `/ft-update` Step 4, not for this function.

**The operative conclusion is nonetheless correct, for a different reason.**
Cursor adopters *are* flagged today — through the Claude surface, because
[[CORE-438.2]]'s locked mechanism has them symlinking canonical
`claude/skills/<name>` bodies, which is exactly the key set
`claude/AGENTS-snippet.md` already enumerates. Registering a third
`WIRING_SURFACES` entry belongs to `.4` (its PLAN line already names
`update-adopters.mjs` skill-flagging). So the heading ships for cross-platform
consistency and for `.4` to register against — not because it flags anything on
its own.

#### Superseded-claim pointer owed to [[CORE-438.2]]

[[CORE-438.2]]'s Findings section (finding 4) states that
`update-adopters.mjs` **`newSkillsShipped()`** "keys off `ln -s` lines under a
literal §"One-time symlink wiring" heading". Two halves of that are factually
untrue about the repo at the time it was written (same HEAD as this task):

1. There is no `newSkillsShipped()` at HEAD — the function is `wiredSkillKeys()`,
   called from `newSkillWiringSurfaces()`. The old name survives only in
   [[CORE-320]]'s historical PLAN description.
2. The scan is heading-agnostic, as shown above.

A future reader could act on this wrongly — e.g. believe that renaming the
heading breaks fleet flagging, or that shipping the heading is what enables it.
Per SPEC §"Tasknote frontmatter" this is a falsified *factual* claim rather than a
superseded decision, so this closure appends the one-line
`> **⚠️ Superseded by [[CORE-438.3]]**` pointer to that note, append-only, in the
same commit. Note the surrounding conclusion ("flagged via the Claude snippet")
stands — only the named mechanism was wrong.

### Archive skim — `.flowtron/tasknote/archive/core/`

- **[[CORE-091]]** — each platform's `AGENTS-snippet.md` is the **sole** source of
  truth for that platform's wiring commands; other docs point at it. So
  `cursor/AGENTS-snippet.md` may reference `claude/`'s block but must not restate it.
- **[[CORE-154.3]]** — sibling top-level dirs, no parent `wiring/`, no rename of
  `claude/`. `cursor/` at the repo root is the sanctioned shape.
- **[[CORE-271.4]]** — the procedure-pointer wrapper pattern; the exact artifact
  `cursor/procedures/ft-task.md` mirrors.
- **[[CORE-320]]** — origin of the snippet-driven skill flagging, and the source of
  the stale `newSkillsShipped()` name the drift check above corrects.
- **[[CORE-349.2]]** — installed-surface vocabulary. Cursor's row in the
  §"Installed-surface policy" table is `.4`'s propagation work; this snippet states
  the same categories in prose so it is self-sufficient for an adopter.
- **[[CORE-439]]** — the canonical-install-path rule, written *specifically* so this
  snippet would inherit a policy rather than copy a precedent.

### Best Practices Review

The touched boundary is the wiring layer only, and the dependency direction is
one-way: `cursor/` may reference `SPEC/procedures/`, `claude/skills/` bodies, and
`docs/PLATFORMS.md` policy; nothing in the contract layer may reference `cursor/`.
The live duplication risk is the `ln -s` list — reproducing `claude/`'s eleven
adopter-subset lines in a second snippet would violate [[CORE-091]]'s single-source
posture and create a mirror pair that drifts on the next skill addition. Finding 2
avoids it: reference the Claude block, and ship only the small Cursor-only variant
that genuinely differs (a different install *directory* for the same targets). No
refactor of `claude/`, `codex/`, or `grok/` is in scope.

### No clarifications needed

The one fork worth an ask — reference the Claude block versus ship a parallel
`ln -s` list — was already resolved by [[CORE-438.2]] finding 2 ("point at that
existing block rather than duplicate it, and offer `.cursor/skills/` only as the
variant for a Cursor-only project"). Explicit assumptions:

1. Two files ship, nothing else. `cursor/skills/` and `cursor/commands/` stay absent.
2. Propagation to the ~16 enumeration sites — including the `docs/PLATFORMS.md`
   tree comment, the §"Installed-surface policy" table row, `SPEC.md`'s
   repo-layout list, and `update-adopters.mjs` — is `.4`'s, not this task's.
3. The Cursor trigger table and `docs/AGENT-COMPAT.md` stamp are `.5`'s.
4. The snippet is adopter-facing prose; flowtron's own checkout stays wired
   through `.claude/` and needs no `.cursor/` directory.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** `cursor/AGENTS-snippet.md` follows `codex/AGENTS-snippet.md`'s
section order and voice one-for-one — sibling-of-`claude/` lede, paste-block
reference, one-time wiring, pinning notes — which is itself the shape
`docs/PLATFORMS.md` §"What the `<PLATFORM>`-snippet must contain" prescribes.
`cursor/procedures/ft-task.md` is the `codex/` / `grok/` router verbatim apart
from the platform word in its H1, keeping the three pointers a legible mirror set.
One section is new rather than borrowed: §"Forking skills — the description must
be valid YAML", which exists because the defect it documents is Cursor-specific
(discharging [[CORE-438.2]] finding 5). No new shape was invented for the
deliverable itself.

**Minimal refactor gate.** No refactor. `claude/`, `codex/`, and `grok/` are
untouched, and nothing existing was rewritten — the whole diff is two new files.
The one thing deliberately **not** written is a parallel copy of `claude/`'s
`ln -s` list as the primary install path: that would violate [[CORE-091]]'s
single-source posture and create a mirror pair drifting on the next skill
addition. The Cursor-only block that does ship is not that duplication — it
targets the same canonical `claude/skills/` bodies from a different install
directory, which is the only thing that genuinely differs.

**Files shipped (2):**

| File | Lines | Contents |
|---|---|---|
| `cursor/AGENTS-snippet.md` | 116 | Thin-bundle lede · paste-block reference · `## One-time symlink wiring` (Claude-block-is-enough primary + 11-line `.cursor/skills/` Cursor-only variant) · frontmatter-strictness caveat · pinning notes |
| `cursor/procedures/ft-task.md` | 8 | Router to `SPEC/procedures/ft-task.md` |

No `cursor/skills/`, no `cursor/commands/` — verified absent in Phase 3.

**How each [[CORE-438.2]] finding was discharged:**

| Finding | Where it landed |
|---|---|
| 1 — mechanism is relative symlink | §"One-time symlink wiring" `ln -s` block + §"Pinning notes" statement that Cursor follows relative dir symlinks at adopter depth |
| 2 — adopters need no new install commands | The section leads with "already wired for Claude Code → already wired for Cursor" and routes to `claude/AGENTS-snippet.md`; `.cursor/skills/` is explicitly the Cursor-only-project variant |
| 3 — precedence is observed, don't build on it | Stated as a dedupe *observation* motivating "run that block and stop there"; no ordering logic anywhere |
| 4 — confirm the fleet-updater story, don't assume | Confirmed against source; result in Testing Notes and in the superseded-claim pointer below |
| 5 — ship a frontmatter caveat | §"Forking skills — the description must be valid YAML" |

**Two judgment calls worth recording.**

1. **Commands are not wired.** `claude/AGENTS-snippet.md` symlinks six
   `.claude/commands/*.md` stubs alongside the skills; the Cursor block wires
   skills only. Cursor's documented compatibility covers `.claude/skills/` but
   not `.claude/commands/` ([[CORE-438.1]]), and a Cursor skill auto-exposes as
   `/<skill-name>`, so the stubs would be both unread and unnecessary. Said
   explicitly in the snippet so the omission does not read as an oversight.
2. **`.cursor/skills/` recommended over `.agents/skills/`.** [[CORE-438.2]]
   verified all three directories work, but `.agents/skills/` is Codex's
   repo-scoped directory — installing canonical bodies there invites the exact
   body-blind slug collision with `codex/skills/` wrappers that [[CORE-439]]
   documented at the user tier.

**Tests:** no new automated test. The deliverable is two adopter-facing markdown
files, and flowtron ships no markdown validator (SPEC §"What flowtron does NOT
provide"). The verification that matters is the source-level confirmation of the
fleet-updater claim plus the parity check on the `ln -s` block, both in Testing
Notes; the registered updater suite was run because a new platform snippet sits
adjacent to a live fleet-updater input.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34/34 pass** (run because a new platform `AGENTS-snippet.md` sits adjacent to the fleet updater's snippet inputs)

- [x] Ran lint/type-check on changed code — N/A: two new markdown files; no lintable or typed surface. The analogous checks for this diff (link resolution, fence balance, whitespace, `ln -s` key parity) were run instead and are recorded below

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

### Fleet-updater confirmation ([[CORE-438.2]] finding 4's explicit obligation)

Read from source, then verified by command rather than inspection:

| Check | Result |
|---|---|
| `WIRING_SURFACES` entries (`tools/update-adopters.mjs:77-101`) | **2** — `claude/AGENTS-snippet.md` (`:80`) and `codex/AGENTS-snippet.md` (`:93`) |
| Any `cursor` reference in the updater | **none** (`rg cursor tools/update-adopters.mjs` → no matches) |
| Does `wiredSkillKeys()` anchor on a heading? | **No** (`:301-315` iterates every line, filters `ln -s`, matches `snippetKeyPattern`) |

**Verdict.** `cursor/AGENTS-snippet.md` is not read by the fleet updater at HEAD,
so shipping the heading does not by itself make anything flag — the PLAN line's
causal clause is inaccurate (Discovery Notes §"Drift found"). Cursor adopters
*are* flagged today, via the **Claude** surface: the mechanism [[CORE-438.2]]
locked has them symlinking canonical `claude/skills/<name>` bodies, which is the
key set `claude/AGENTS-snippet.md` already enumerates. Registering a third
surface is `.4`'s filed work. Fleet behaviour is therefore **unchanged by this
task**, which the passing suite corroborates.

### The heading is not empty ([[CORE-438.2]] finding 4's second half)

Ran `ft-release` §7.1's own parity-check shape against the new block:

```sh
diff -u <(printf '%s\n' ft-close-epic ft-epic-discovery ft-file-followup \
  ft-goal-task ft-micro-task ft-spec ft-starter-task ft-task ft-update \
  ft-worktree-end ft-worktree-start | sort) \
  <(grep "^ln -s ../../.flowtron/core/claude/skills/" cursor/AGENTS-snippet.md \
    | sed -E 's#.*claude/skills/(ft-[^ ]+).*#\1#' | sort)
```

Identical — **11/11 parity with the Claude adopter subset**, 11 `ln -s` lines
total. So the section parses to a full key set, not zero.

### Release-guardrail regression check

`claude/skills/ft-release/SKILL.md` §7.1's wiring checks are scoped to
`codex/skills` and `claude/`; none enumerates platform directories generically,
so a new unregistered `cursor/` breaks no existing gate. Extending §7.1 to cover
it is `.4`'s filed scope, consistent with how `.4`'s PLAN line already reads.

### Markdown / structural pass

| Check | Result |
|---|---|
| Relative links resolve (`../../SPEC/procedures/ft-task.md`, `../claude/AGENTS-snippet.md`, `../docs/PLATFORMS.md`) | 3/3 OK |
| Code-fence balance in the snippet | 2 markers — balanced |
| Trailing whitespace under `cursor/` | none |
| Final newline both files | present |
| Section set vs. `docs/PLATFORMS.md` §"What the `<PLATFORM>`-snippet must contain" | all three mandated sections present (paste-block · wiring commands · pinning notes), plus the Cursor-specific frontmatter caveat |
| `cursor/skills/` · `cursor/commands/` absent | confirmed — `find cursor -type f` returns exactly the two shipped files |
| `.editorconfig` (UTF-8, LF, 2-space, final newline) | conformant |

### Quality assertions

- **Duplication:** the `claude/` `ln -s` list is referenced, not copied — the one
  place a mirror pair could have been born. The Cursor-only block is not a copy
  of it: same 11 targets, different install directory, which is the only real
  difference between the two platforms' installs. The paste-block is referenced
  per [[CORE-091]]. `cursor/procedures/ft-task.md` *is* near-identical to its
  `codex/` and `grok/` siblings, and deliberately so — `SPEC/procedures/README.md`
  §"Loading convention" defines these as thin per-platform pointers, so an
  8-line router per platform is the prescribed shape rather than duplication to
  factor out.
- **Dead content:** none. Every section is load-bearing for an adopter; no
  placeholder, no TODO, no forward-reference to unshipped files.
- **Public-surface growth:** one new top-level directory with two files, which is
  exactly what the PLAN line and the plug-in pattern authorize. No new skill,
  command, template, script, or frontmatter field. Against `codex/`'s twenty
  files, `cursor/` carries two.
- **Stale code-facing documentation:** the snippet makes no claim about the
  fleet updater flagging Cursor adopters, because the confirmation above showed
  that claim would be false. Three known-stale surfaces elsewhere
  (`docs/PLATFORMS.md:132` "hypothetical", `:370` Cursor stub,
  `.gitignore:11` comment) are recorded in Discovery Notes with their owning
  child rather than silently inherited.
- **Contract-layer cleanliness:** `git status --porcelain` shows only
  `cursor/` and this tasknote — no `SPEC.md`, `SPEC/*.md`, or `templates/` edit,
  so no Cursor-specific term entered the contract layer.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

| Doc | Verdict |
|---|---|
| `README.md` | no change — the `cursor/` repo-layout bullet and skill-roster prose are `.4`'s filed deliverable |
| `SPEC.md` | no change — §"Working in the flowtron repo itself" gaining a `cursor/` bullet is `.4`'s; no contract semantics touched here |
| `docs/MIGRATION.md` | no change — a Cursor install pointer belongs to `.4`; per [[CORE-091]] it would point at the new snippet, not duplicate it |
| `claude/AGENTS-snippet.md` | no change — referenced by the new snippet, not edited. Its "To verify … wiring" line gaining a Cursor clause is `.4`'s, as [[CORE-438.2]] already recorded |
| `codex/AGENTS-snippet.md` | no change — Codex wiring untouched; the new snippet mirrors its section shape without altering it |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — no new trust boundary. The symlink targets are the same canonical bodies Claude adopters already wire; a new adopter-facing markdown file adds no privileged surface. `.4` owns the threat-model enumeration line |
| `docs/AGENT-NEUTRALITY.md` | no change — verified against the ledger: `cursor/` is named only in §"Out of scope for this ledger" as a sibling wiring dir, and this task adds no Cursor term to the contract layer, so no ledger entry is owed |
| `docs/PLATFORMS.md` | no change **here**, and this is the one entry where that is a deliberate deferral rather than a non-event: `:132`'s "hypothetical Cursor wiring" tree comment is **falsified by this task**, and `:370`'s `### Cursor (stub)` plus the §"Today's surface" and §"Installed-surface policy" rows all need Cursor entries. Every one of those is explicitly filed to `.4`/`.5`; writing them here would raid those children's scope. Recorded in Discovery Notes with its owning child |
| `claude/CAPABILITIES.md` | no change — Claude Code trigger reference; nothing about Claude's surface changed |
| `docs/AGENT-COMPAT.md` | no change — the Cursor row stays `unverified`. This task shipped wiring, not a dogfood session; the `dogfooded` stamp requires `docs/DOGFOOD.md`'s pass, which is `.5`. The row's stale "no flowtron bundle" clause is `.4`'s |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change — the worktree pair is wired by the new snippet but the convention itself is unchanged |

**One list membership deferred, not missed.** `claude/AGENTS-snippet.md` and
`codex/AGENTS-snippet.md` are both *on* this AI-referenced list, so
`cursor/AGENTS-snippet.md` belongs there by symmetry. `.4`'s PLAN line names
"tasknote README" among the ~16 enumeration sites it propagates to, so the entry
lands with the rest of the cohort rather than as a one-off edit here.

**Superseded-claim pointer written.** Appended to
`.flowtron/tasknote/archive/core/CORE-438.2.md` under its nav header, correcting
finding 4's named mechanism (`newSkillsShipped()` / heading-anchored scanning);
append-only, original text untouched, staged in this closure commit. Rationale
and evidence in Discovery Notes §"Superseded-claim pointer owed".

**Final Summary:**

Shipped `cursor/` as flowtron's fourth platform wiring directory, promoting
Cursor from a contract-only stub to a first-class wiring platform — in **two
files and 124 lines**, against `codex/`'s twenty files.

That size is the result, not a shortcut. Because Cursor loads `.claude/skills/`
as a documented compatibility surface ([[CORE-438.1]]) and project-scope skill
directories dedupe by slug ([[CORE-438.2]]), an adopter who already ran
`claude/AGENTS-snippet.md` §"One-time symlink wiring" **already has a working
Cursor install**. So the snippet's primary instruction is to run the block that
already exists and stop — the `.cursor/skills/` block ships only as the variant
for a project with no `.claude/` wiring. No skill wrappers, no second `ln -s`
list to drift, no Codex-style primitive translation (Cursor's native structured
ask and sub-agents mean the canonical bodies run as written).

**The verification that changed an answer.** [[CORE-438.2]] finding 4 obliged
this task to *confirm* rather than assume that shipping a
`One-time symlink wiring` heading makes the fleet updater flag Cursor adopters.
It does not. `tools/update-adopters.mjs` defines `WIRING_SURFACES` as a hardcoded
two-entry list (`claude/` + `codex/` snippets), so `cursor/AGENTS-snippet.md` is
never read; and `wiredSkillKeys()` is heading-agnostic, scanning every `ln -s`
line rather than a named section. The PLAN line's causal clause was therefore
wrong, though its conclusion survives for a different reason: Cursor adopters are
flagged through the *Claude* surface, because the locked mechanism has them
symlinking canonical `claude/skills/` bodies. Registering a third surface is
`.4`'s filed work. This also falsified two factual details in [[CORE-438.2]]'s
own finding 4, so that note carries a superseded-claim pointer as of this commit.

**Changed files (3):** `cursor/AGENTS-snippet.md` (+116),
`cursor/procedures/ft-task.md` (+8), and a one-line pointer appended to
`.flowtron/tasknote/archive/core/CORE-438.2.md`; plus this tasknote
(scaffold → archive) and the PLAN.md child-line flip.

**Verification:** the fleet-updater claim confirmed against source and by command
(2 surfaces, zero `cursor` references, no heading anchoring);
`node --test tools/update-adopters.test.mjs` → **34/34**, corroborating that
fleet behaviour is unchanged; an `ft-release` §7.1-shaped parity `diff` proving
the wiring block parses to **11/11** of the Claude adopter subset rather than the
empty heading [[CORE-438.2]] warned against; §7.1 re-read and confirmed to
enumerate no platform dirs generically, so the unregistered `cursor/` breaks no
gate; and a structural pass (3/3 relative links resolve, balanced fences, no
trailing whitespace, final newlines, all three PLATFORMS-mandated sections
present). Lint/type-check `N/A` — two markdown files.

**Refactors:** none made, none deferred. The candidate deliberately avoided was
copying `claude/`'s eleven-line `ln -s` list into a second snippet, which
[[CORE-091]]'s single-source posture forbids and which would drift on the next
skill addition.

**Documentation verdict:** 14 of 14 AI-referenced docs "no change" — with
`docs/PLATFORMS.md` recorded as a *knowing* deferral, since this task falsifies
its "hypothetical Cursor wiring" tree comment and `.4` owns the flip. The
`cursor/AGENTS-snippet.md` entry that this list now warrants is likewise filed
into `.4`'s enumeration sweep.

**Maintainability effect:** flowtron gains a platform without gaining a copy of
its skill inventory — the `ft-*` bodies keep a single upstream home, and the only
recurring cost is one more gated row in the per-release dogfood walk (enrolled by
`.5`). The standing risk is that `cursor/` is now shipped but unregistered in the
surfaces that police wiring parity: the fleet updater does not read its snippet
and `ft-release` §7.1 does not check its shape. Both are `.4`'s filed scope, and
until `.4` lands, `cursor/` is correct but unguarded.

**Archived:** 2026-08-12
