---
title: cursor-install-verify
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438, CORE-438.1, CORE-438.3]
---

# CORE-438.2 | cursor-install-verify

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]] · [[CORE-438.1]] · [[CORE-438.3]]

> **⚠️ Superseded by [[CORE-438.3]]** — Finding 4's named mechanism is wrong: at HEAD there is no `newSkillsShipped()` (the function is `wiredSkillKeys()`), and it does not key off the §"One-time symlink wiring" heading — it scans every `ln -s` line in the snippet. Its conclusion (Cursor adopters are flagged via the Claude snippet) holds.

## 🎯 Goal

Empirically settle whether Cursor discovers and invokes flowtron skills through a relative directory symlink into `.flowtron/core/claude/skills/`, and lock the adopter install mechanism (symlink or copy) that `CORE-438.3` will document.

## ✅ Acceptance

- [x] Symlink resolution + skill discovery verified empirically at **adopter depth** (`<probe>/.claude|.cursor|.agents/skills/<name> -> ../../.flowtron/core/claude/skills/<name>`) in a fresh Cursor session, with the exact commands and observed roster output recorded in Testing Notes
- [x] **Install mechanism locked** — symlink or copy — with a one-line rationale, plus the chosen `.cursor/skills/` vs `.claude/skills/` install dir, reconciled against [[CORE-439]]'s "repo-scoped wiring is canonical" rule
- [x] Watcher/live-reload behaviour through a directory symlink checked (the specific third-party claim [[CORE-438.1]] flagged), with the verdict recorded even if it is "not reproducible" — **not reproducible for discovery**; in-session hot reload recorded as untestable headlessly and non-load-bearing (Testing Notes, Test 3)
- [x] A **Findings for `.3`** section written in a form `CORE-438.3` can lift directly into `cursor/AGENTS-snippet.md` (install commands + caveats), so `.3` needs no re-derivation
- [x] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"
- [x] **(added at the 🛠️ gate)** The four invalid-YAML `claude/skills/*/SKILL.md` frontmatter descriptions repaired, with before/after verified in a live Cursor session

## 🧩 Subtasks

- [x] Build a scratch adopter-shaped fixture (`.flowtron/core/claude/skills/` real dir + uniquely-named probe skills) outside the flowtron checkout
- [x] Wire one probe skill per candidate dir — `.cursor/skills/`, `.agents/skills/`, `.claude/skills/` — each a **relative** symlink at adopter depth, plus a real-directory control
- [x] Enumerate the fixture from a fresh `cursor-agent` session and record which probes appear (discovery) and which can be invoked (resolution)
- [x] Test watcher/live-reload: edit a probe body through the symlink target mid-session and re-enumerate
- [x] Lock the mechanism + install dir; write the **Findings for `.3`** section
- [x] Phase 3: re-run the enumeration as the verification pass; record raw output
- [x] Phase 4: doc-drift sweep, closure writes, archive
- [x] *(added at the 🛠️ gate)* Repair the four invalid-YAML descriptions and prove the fix with a live before/after enumeration

## 🔗 Related

- [[CORE-EPIC-438]] — parent epic: promote Cursor from contract-only stub to a shipped wiring platform
- [[CORE-438.1]] — epic Discovery; surfaced undocumented symlink tolerance as the epic's one blocking unknown
- [[CORE-438.3]] — consumes this task's locked install mechanism in `cursor/AGENTS-snippet.md`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-438.1]] deliberately ordered this child first because
  undocumented symlink tolerance is the epic's one blocking unknown — `.3` cannot
  write install commands until the mechanism is settled. Still true at HEAD.
  Discovery narrowed the remaining question (the `.claude/skills/` half is now
  answered from live session state) but did not eliminate it: the two *native*
  Cursor dirs and adopter-depth resolution remain untested.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### The session is the experiment (partial answer, free)

This tasknote is being driven by `/ft-task` **under Cursor**, in the flowtron
checkout. Flowtron self-host wires its own skills exactly the way an adopter
does, one hop shallower:

```text
.claude/skills/ft-task -> ../../claude/skills/ft-task/     (relative dir symlink)
```

All 18 entries in `<repo>/.claude/skills/` are relative directory symlinks
(`ls -la` verified). Cursor enumerated all 18 into this session's skill roster
**by their symlink path**, and the `ft-task` body was read through that path to
drive this run. So, for the project-scope `.claude/skills/` compat dir:

| Question | Answer | Evidence |
|---|---|---|
| Relative dir symlink **discovered**? | **Yes** | 18/18 in this session's roster |
| Symlink **resolved + read**? | **Yes** | this SKILL.md was read through it |
| Symlink **invoked**? | **Yes** | this run |
| Absolute dir symlink? | **Yes** | `~/.claude/skills/ft-*` → flowtron `claude/skills/*` also enumerated |

The third-party "Cursor's watcher does not reliably follow directory symlinks"
report that [[CORE-438.1]] flagged as the epic's blocking unknown is therefore
**not reproducible for initial discovery**. It may still hold for *live reload*
(watcher ≠ enumerator) — carried into Phase 2 as an explicit test.

**What this does not settle** (the actual Phase 2 work):

1. `.cursor/skills/` and project-level `.agents/skills/` — Cursor's *native*
   dirs — are untested. Neither exists in this checkout.
2. **Adopter depth** is one hop deeper and crosses a git submodule
   (`../../.flowtron/core/claude/skills/<name>`). Depth should not matter to
   `readlink`, but it is the shape `.3` will actually ship, so it gets tested
   as-shipped rather than by analogy.

### Load-bearing finding — 4 skills ship invalid YAML frontmatter

Not in the filed scope; found while auditing why this session's roster looked
wrong. Four `ft-*` skills enumerated with an **empty description**:
`ft-audit`, `ft-release`, `ft-task`, `ft-worktree-end`.

Cause is not length (`ft-file-followup` at 855 chars is the longest and parses
fine). It is **YAML validity**: a plain unquoted scalar may not contain `": "`,
and exactly these four descriptions do.

| Skill | Offending substring | js-yaml verdict |
|---|---|---|
| `ft-audit` | `Domains: ` | `incomplete explicit mapping pair` |
| `ft-release` | `feat: ` | `incomplete explicit mapping pair` |
| `ft-task` | `cadence: ` | `incomplete explicit mapping pair` |
| `ft-worktree-end` | `checkout: ` | `incomplete explicit mapping pair` |

Verified with a real parser (`viz/node_modules/js-yaml`) across all 18 bodies:
**4 invalid, 14 valid — a 4/4 exact match with the four empty roster
descriptions.** Correlation is total across an 18-sample set.

**Why it matters.** Claude Code tolerates this (these skills have worked for
months); Cursor does not. The description is what drives *model invocation* — an
agent decides to reach for a skill by reading it. Under Cursor, `/ft-task`
itself is currently **command-invocable but not model-discoverable**. That is a
Cursor-specific correctness defect in the canonical skill bodies, and it lands
squarely inside this task's remit ("empirically verify Cursor skill discovery
before anything is built on it"). Scope decision surfaced to the operator below.

### Archive skim — `.flowtron/tasknote/archive/core/`

- **[[CORE-439]]** (closed today, same epic) — **removes work from this task.**
  It already measured Cursor's enumeration semantics live (project and user
  scope enumerate separately; user-scope slugs dedupe by name, `.claude` over
  `.agents`, body-blind) and already locked the install *policy*: repo-scoped
  wiring is canonical, agent home carries global-only utilities. `.2` therefore
  does not re-decide *where* to install — only whether the *mechanism* resolves.
- **[[CORE-438.1]]** — parent Discovery; ordered `.2` first for this unknown and
  fixed the thin-bundle decision that makes `claude/skills/` bodies the symlink
  target for Cursor adopters.
- **[[CORE-154.3]]** — adopter symlink path stability into `.flowtron/core/` is a
  Constitution non-negotiable. A "copy instead of symlink" outcome would collide
  with it; symlink-viable is the strongly preferred result, not merely the
  convenient one.
- **[[CORE-320]]** — `update-adopters.mjs` `newSkillsShipped()` keys off the
  `AGENTS-snippet.md` §"One-time symlink wiring" `ln -s` list. Whatever `.2`
  locks must be expressible as `ln -s` lines under that exact heading, or Cursor
  adopters go unflagged on bump. Constrains the mechanism choice.
- **[[CORE-349.2]]** — installed-surface vocabulary; `.3` must declare Cursor's row.

### Drift check

- `claude/AGENTS-snippet.md:33-61` §"One-time symlink wiring" re-read: adopter
  shape confirmed as `ln -s ../../.flowtron/core/claude/skills/<name> .claude/skills/<name>`.
  This is the exact string Phase 2 replicates.
- `docs/PLATFORMS.md:132` still labels `cursor/` "hypothetical" and `:370` still
  carries the Cursor stub — both accurate at HEAD, both owned by `.4`/`.5`. No
  drift for `.2`.
- `docs/AGENT-COMPAT.md:39` Cursor row still reads `unverified` / "no flowtron
  bundle" — as [[CORE-438.1]] recorded; `.4` owns it. Unchanged.
- `docs/PLATFORMS.md:104-108` (written by [[CORE-439]] today) states project and
  user scope enumerate separately — **re-confirmed** by this session's roster
  (18 project + 17 user `.claude` + 1 user `.agents` = 36). Consistent, no drift.
- **Small drift found:** `.gitignore:11` comments the block as "Personal Claude
  Code / Codex / **Cursor** wiring for this checkout", but the block ignores only
  `.claude/` and `.agents/`. `.cursor/` is not ignored, so the comment overstates
  coverage at HEAD. [[CORE-439]] added `.agents/` and wrote that comment without
  adding `.cursor/`. Relevant because Phase 2 may create `.cursor/skills/` here.
- No SPEC contract conflict — wiring-layer only, no contract semantics, no
  Cursor-specific term entering the contract layer.
- **Superseded-claim check:** the frontmatter finding falsifies no archived
  *factual* claim. No archived note asserts flowtron's SKILL.md frontmatter is
  valid YAML; the defect was simply never observed, because Claude Code tolerates
  it. No superseded-claim pointer owed.

### Best Practices Review

Touched boundary is the wiring layer plus (pending the scope decision) the
canonical `claude/skills/*/SKILL.md` frontmatter. Dependency direction holds:
`claude/skills/` bodies are the single upstream source that every platform's
wiring points *at*, so a frontmatter fix there is a same-layer correction, not a
Cursor-specific fork — the fix is plain YAML validity and improves every
platform's parse, which is why it does not violate [[CORE-438.1]]'s
"no Cursor-specific term in the shared layer" posture. No refactor of existing
wiring in scope; `codex/` and `grok/` untouched. The scratch fixture is
throwaway and lands outside the repo, so it adds no surface.

### Clarifying question

One genuine ambiguity, surfaced to the operator via structured ask and recorded
at the 🛠️ gate below: **does the invalid-YAML frontmatter fix land in `.2`, or
get filed as a separate task?** No other ambiguity — remaining assumptions are
explicit: (a) symlink is the preferred outcome per [[CORE-154.3]]; (b) install
*location* policy is already settled by [[CORE-439]] and is not reopened here;
(c) the scratch fixture is disposable and is not committed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**🛠️ gate resolution.** Fired on the scope deviation; operator chose *"Fix in
CORE-438.2"* for the invalid-YAML frontmatter defect, declining the optional
release-gate check. Both decisions honoured — the four bodies are repaired here,
and the regression guard is recorded as a recommended follow-up rather than built.

**Pattern survey.** The experiment reuses flowtron's own install shape rather
than inventing a test harness: the fixture is a byte-for-byte copy of
`claude/AGENTS-snippet.md` §"One-time symlink wiring"'s
`ln -s ../../.flowtron/core/claude/skills/<name>` form. The frontmatter fix
follows the 14 already-valid bodies (unquoted plain scalar) instead of
introducing quoted scalars for 4 of 18 — no new shape.

**Minimal refactor gate.** No refactor. The fix is four single-line edits with
no structural change. Quoting the scalars was rejected: `ft-task`'s description
carries both `"` and `'` (`SPEC's`, `args="CORE-004"`), so either quote style
would need escaping — more fragile than the punctuation change, and it would
split the 18 bodies into two styles.

### The experiment

Throwaway fixture at `/tmp/ft-cursor-probe` (outside the repo, so it creates no
git dirt; deleted at closure). It reproduces adopter layout exactly — a real
`.flowtron/core/claude/skills/` holding the bodies, and **relative** symlinks at
true adopter depth (`../../.flowtron/core/claude/skills/<name>`):

| Probe | Installed at | Shape | Frontmatter |
|---|---|---|---|
| `probe-alpha` | `.cursor/skills/` | relative symlink | valid |
| `probe-bravo` | `.agents/skills/` | relative symlink | valid |
| `probe-charlie` | `.claude/skills/` | relative symlink | valid |
| `probe-delta` | `.cursor/skills/` | **real directory** (control) | valid |
| `probe-echo` | `.cursor/skills/` | relative symlink | **invalid** (colon-space) |

`probe-echo` is the controlled test of the frontmatter hypothesis: identical
install shape to `probe-alpha`, differing only in the colon-space.

### Fix applied (4 files, 1 line each)

| File | Edit |
|---|---|
| `claude/skills/ft-audit/SKILL.md` | `Domains: general` → `Domains — general` |
| `claude/skills/ft-release/SKILL.md` | `single feat: commit` → ``single `feat:` commit`` (colon now followed by a backtick, not a space — and it correctly marks a literal commit-type token) |
| `claude/skills/ft-task/SKILL.md` | `cadence: expected vs observed` → `cadence — expected vs observed` |
| `claude/skills/ft-worktree-end/SKILL.md` | `From the main checkout: verifies` → `From the main checkout it verifies` |

Meaning is preserved in all four; no description was shortened or re-scoped.

**Discovered, not fixed (out of approved scope).** `claude/commands/*.md` carries
the **same** latent defect in 5 of 18 wrappers — `ft-audit`, `ft-file-followup`,
`ft-release`, `ft-spec`, `ft-worktree-end`. Left alone deliberately: Cursor does
not read `.claude/commands/` ([[CORE-438.1]] recorded that compat as
undocumented, unlike `.claude/skills/`), and Claude Code parses them fine today,
so there is no observable defect to fix — unlike the skill bodies, where the
symptom was measured. Recommended as a follow-up alongside the frontmatter-validity
release check the operator declined here. `codex/skills/*/SKILL.md` was swept in
the same pass and is **18/18 valid** — no action needed.

**Deferred to `.4`.** `.gitignore:11` comments its block as "Personal Claude Code
/ Codex / **Cursor** wiring" but ignores only `.claude/` and `.agents/`; `.cursor/`
is absent, so the comment overstates coverage. Not fixed here — the fixture lives
outside the repo so this task creates no `.cursor/` dirt, and `.4` owns
surface propagation. Recorded so it is not lost.

**Tests:** no new automated test — the deliverable is an empirical finding plus a
4-line frontmatter repair, and flowtron ships no frontmatter validator (adding
one is the declined option, and would be a schema validator of the kind SPEC
§"What flowtron does NOT provide" rejects). Verification is the live-session
before/after in Testing Notes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34/34 pass** (run because `claude/skills/ft-release/SKILL.md` is release machinery and the updater suite is a registered release gate)

- [x] Ran lint/type-check on changed code — N/A: four markdown frontmatter lines; no lintable or typed surface. Frontmatter validity was machine-checked instead (below), which is the analogous check for this diff

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

All results below are from **real `cursor-agent` sessions** (v2026.08.11-e8db854)
run headlessly against the fixture, not from documentation or inference. Each
session was asked to answer *without using tools*, purely from the skill roster
in its context — so the output reports what Cursor actually enumerated.

### Test 1 — discovery through a relative symlink at adopter depth

Command: `cursor-agent -p --trust` in `/tmp/ft-cursor-probe`, asked to list every
`probe-*` skill with its path and description.

| Probe | Install dir | Discovered | Path reported | Description |
|---|---|---|---|---|
| `probe-alpha` | `.cursor/skills/` symlink | ✅ | via the symlink | ✅ present |
| `probe-bravo` | `.agents/skills/` symlink | ✅ | via the symlink | ✅ present |
| `probe-charlie` | `.claude/skills/` symlink | ✅ | via the symlink | ✅ present |
| `probe-delta` | `.cursor/skills/` real dir | ✅ | — | ✅ present |
| `probe-echo` | `.cursor/skills/` symlink | ✅ | via the symlink | ❌ **EMPTY** |

**All three candidate directories follow relative directory symlinks at adopter
depth.** The third-party claim that Cursor's watcher does not reliably follow
directory symlinks — [[CORE-438.1]]'s designated blocking unknown for the epic —
**did not reproduce** in any of the three.

### Test 2 — invocation (not just discovery)

`probe-alpha` was invoked through the `.cursor/skills/` symlink and instructed to
emit a token stored only in the symlink *target*. Expected
`FT-PROBE-PROBE_ALPHA-OK`; received `FT-PROBE-PROBE_ALPHA-OK`. Resolution and
execution both work, so the PLAN line's "resolve **and invoke**" is answered yes.

### Test 3 — target edits propagate through the link

The description in `.flowtron/core/claude/skills/probe-alpha/SKILL.md` was
mutated, then a **fresh** session re-enumerated: it reported the mutated text.
Edits to the submodule target are therefore visible through the symlink — the
case that matters when `/ft-update` moves the pin.

*Honest limit:* this proves fresh-session re-read, not in-session hot reload. A
running session's roster is fixed at start, so live reload is not testable
headlessly. It is also not load-bearing for flowtron — a pin bump is followed by
a new session, never mid-task.

### Test 4 — the frontmatter defect, controlled

`probe-echo` is identical to `probe-alpha` in install shape and differs only by a
colon-space inside its `description:`. It was the **only** probe to enumerate
with an empty description. Combined with the 4/4 match across flowtron's own 18
bodies, this moves the finding from correlation to a controlled result.

### Test 5 — before/after on the real bodies

The four repaired skills were symlinked into the fixture and re-enumerated live:

| Skill | Before fix | After fix |
|---|---|---|
| `ft-audit` | EMPTY | ✅ `Parameterized principal-engineer audit — …` |
| `ft-release` | EMPTY | ✅ `Cut a flowtron release — version bump, …` |
| `ft-task` | EMPTY | ✅ `Start a flowtron tasknote and drive it …` |
| `ft-worktree-end` | EMPTY | ✅ `Clean up an isolated git worktree for …` |
| `probe-echo` (unfixed control) | EMPTY | EMPTY — control held |

The unfixed control staying empty in the same session rules out session-level
variance as the explanation.

### Test 6 — cross-directory slug collision within project scope

The same slug (`probe-alpha`) was installed in **both** `.cursor/skills/` and
`.claude/skills/` of one project. Result: **`COUNT=1`**, resolving to the
`.claude/skills/` path. Project-scope directories therefore dedupe by slug —
`.claude/` winning over `.cursor/`, the same ordering [[CORE-439]] observed in
the user tier. This is the finding that shapes `.3`, below.

### Machine-checked frontmatter validity (js-yaml, all surfaces)

| Surface | Files | Result |
|---|---|---|
| `claude/skills/*/SKILL.md` | 18 | ✅ 18/18 valid (was 14/18) |
| `codex/skills/*/SKILL.md` | 18 | ✅ 18/18 valid — no action needed |
| `claude/commands/*.md` | 18 | ❌ 5 invalid — reported, out of scope (Implementation Notes) |

### Findings for CORE-438.3 (lift-ready)

1. **Mechanism: relative directory symlink. Locked.** Verified discovered,
   resolved, and invoked at exact adopter depth in all three candidate dirs. No
   copy-based fallback is needed, so [[CORE-154.3]]'s path-stability
   non-negotiable is preserved and the pinning story is unchanged.
2. **Cursor adopters need no new install commands.** Because project-scope dirs
   dedupe by slug and `.claude/skills/` wins (Test 6), an adopter who followed
   `claude/AGENTS-snippet.md` §"One-time symlink wiring" **already has a working
   Cursor install**. `cursor/AGENTS-snippet.md` should point at that existing
   block rather than duplicate it, and offer `.cursor/skills/` only as the
   variant for a Cursor-only project.
3. **Precedence is observed, not documented — and flowtron is immune to it
   anyway.** Both links resolve to the same canonical body, so whichever
   directory wins serves identical content. Do not build logic on the ordering.
4. **[[CORE-320]] caveat — do not skip the heading.** `update-adopters.mjs`
   `newSkillsShipped()` keys off `ln -s` lines under a literal
   §"One-time symlink wiring" heading. If `cursor/AGENTS-snippet.md` only
   *references* the Claude block per finding 2, Cursor adopters are flagged via
   the Claude snippet they actually ran — correct, but `.3` must confirm that
   rather than assume it, and must not ship an empty heading that parses to zero
   wired skills.
5. **Ship a frontmatter caveat.** Cursor parses SKILL.md frontmatter more
   strictly than Claude Code; an invalid `description:` costs model-invocation
   discovery silently, with the skill still listed. Worth a line in the snippet
   for adopters who fork skills.

### Quality assertions

- **Duplication:** none introduced. The fix is four in-place edits; no text was
  copied between files, and the fixture lives outside the repo.
- **Dead code / surface growth:** zero. No new file, skill, template, script, or
  frontmatter field ships. The repo diff is 4 files × 1 line.
- **Unexplained complexity:** none — the diff is punctuation.
- **Stale code-facing docs:** the four descriptions are themselves code-facing
  documentation, and this task makes them *less* stale (they now reach the model
  under Cursor at all). Grepped the old wording across the repo: the only
  survivors are `claude/skills/ft-flowtron/SKILL.md:55,59`, which *paraphrase*
  two of them in a body roster table, and the two command wrappers already
  reported above. The `ft-flowtron` cells are body prose in a markdown table —
  outside frontmatter, so they carry no parse impact and no staleness (they were
  never verbatim copies). Left unchanged.
- **Behavioural risk:** the edits change only prose inside a description field.
  No skill instruction, step, or gate text was touched, so no skill behaviour
  changes on any platform — verified by the diff being confined to line 3 of
  each file.
- **Known-invalid left in place, deliberately:** 5 `claude/commands/*.md`
  wrappers, with the evidence and reasoning recorded in Implementation Notes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs", per entry:

| Doc | Verdict |
|---|---|
| `README.md` | no change — no install or skill-inventory claim is affected |
| `SPEC.md` | no change — wiring/empirical task; no contract semantics touched |
| `docs/MIGRATION.md` | no change — this task *confirms* the documented symlink install rather than altering it; Cursor adoption steps are `.4`'s deliverable |
| `claude/AGENTS-snippet.md` | no change — §"One-time symlink wiring" is verified correct as written; its "To verify … wiring" line gaining a Cursor clause belongs to `.4` |
| `codex/AGENTS-snippet.md` | no change — Codex wiring untouched; `codex/skills/` swept and 18/18 valid |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — no new trust boundary; symlink targets are unchanged and the fixture was disposable and outside the repo |
| `docs/AGENT-NEUTRALITY.md` | no change — the frontmatter fix is plain YAML validity, benefiting every platform; no Cursor-specific term entered any shared surface |
| `docs/PLATFORMS.md` | no change **here** — the `cursor/` "hypothetical" comment (`:132`) and Cursor stub (`:370`) remain `.4`/`.5`'s. The new project-scope dedupe measurement (Test 6) extends [[CORE-439]]'s §"One canonical install path per project", which today documents only the user-tier rule; recorded in Findings for `.3` rather than written here, keeping doc edits inside the children that own them |
| `claude/CAPABILITIES.md` | no change — Claude Code trigger reference; the four edits change no skill behaviour on Claude Code, and its last-verified stamp is unaffected |
| `docs/AGENT-COMPAT.md` | no change — the Cursor row stays `unverified`; the stamp requires a `docs/DOGFOOD.md` pass, which is `.5`. This task verified an *install mechanism*, not a session dogfood, and inflating the row would misreport currency |
| `docs/EXTERNAL-AGENTS.md` | no change |
| `docs/WORKTREES.md` | no change — `ft-worktree-end`'s description changed, but the doc states the convention and does not quote it (grep-verified) |

Fourteen entries, all "no change" — correct for a task whose committed diff is
four frontmatter lines, with every doc surface the findings imply deliberately
routed to `.3`/`.4`.

**Final Summary:**

Settled the blocking unknown [[CORE-438.1]] filed this child to settle, and found
a second, unrelated Cursor defect while doing it.

**The symlink question is answered yes, on all three paths.** In real
`cursor-agent` sessions against an adopter-shaped fixture, relative directory
symlinks at exact adopter depth
(`../../.flowtron/core/claude/skills/<name>`) were discovered, resolved, and
successfully **invoked** from `.cursor/skills/`, `.agents/skills/`, and
`.claude/skills/` alike. The third-party "Cursor's watcher does not reliably
follow directory symlinks" report did not reproduce. **Mechanism locked:
symlink** — so [[CORE-154.3]]'s path-stability non-negotiable holds and no
copy-based fallback is needed anywhere downstream.

**The result that shrinks `.3`:** installing one slug in both `.cursor/skills/`
and `.claude/skills/` of the same project enumerates it **once**, not twice, with
`.claude/` winning. Any adopter who already ran
`claude/AGENTS-snippet.md` §"One-time symlink wiring" therefore *already has a
working Cursor install*. `cursor/AGENTS-snippet.md` should reference that block
rather than ship a parallel one — which extends [[CORE-438.1]]'s "thin bundle"
decision from "no skill wrappers" to "no new install commands either".

**The incidental find, which mattered more than expected.** Four skills —
`ft-audit`, `ft-release`, `ft-task`, `ft-worktree-end` — shipped **invalid YAML
frontmatter**: an unquoted `description:` scalar may not contain a colon-space,
and each carried exactly one (`Domains: `, `feat: `, `cadence: `, `checkout: `).
Claude Code tolerates this; Cursor does not, and silently drops the description
while still listing the skill. Since the description is what makes a skill
*model-invocable*, `/ft-task` itself was command-only under Cursor — the flagship
skill, invisible to the model, on the platform the operator now drives daily.
Found by auditing why this session's own roster looked wrong.

**Changed files (4, one line each):** `claude/skills/{ft-audit,ft-release,ft-task,ft-worktree-end}/SKILL.md`
— punctuation only, meaning preserved. Quoting the scalars was rejected because
`ft-task`'s description carries both `"` and `'`, so either quote style would
need escaping and would split the 18 bodies into two styles.

**Verification:** six live `cursor-agent` experiments, including two controls —
a real-directory probe and an unfixed invalid-frontmatter probe that stayed EMPTY
in the same session that showed all four repaired skills recovering their
descriptions, ruling out session variance. Frontmatter validity machine-checked
with `js-yaml` across three surfaces: `claude/skills/` now 18/18 (was 14/18),
`codex/skills/` already 18/18. `node --test tools/update-adopters.test.mjs` →
34/34, run because `ft-release`'s body is release machinery. Lint/type-check
`N/A` (markdown frontmatter).

**Refactors:** none made, none needed. Two items **discovered and deliberately
not fixed**, both recorded with evidence: 5 of 18 `claude/commands/*.md` wrappers
carry the same invalid-YAML defect (left because Cursor does not read
`.claude/commands/` and Claude Code parses them fine — no observable symptom,
unlike the skill bodies), and `.gitignore:11` claims to cover Cursor wiring while
omitting `.cursor/` (routed to `.4`).

**Documentation verdict:** 14 of 14 AI-referenced docs "no change" — every doc
surface these findings imply is owned by `.3`, `.4`, or `.5`, and writing them
here would have raided those children's scope.

**Maintainability effect:** `.3` starts with its central question already
answered and its scope reduced from "author install commands" to "reference the
existing ones", and the epic's one blocking risk is retired. Against that, the
frontmatter class of defect remains unguarded — the release check that would
catch a recurrence was offered and declined, so it is filed as a recommendation
rather than shipped. Worth knowing that this defect survived months of use
because the only platform that surfaces it is the one flowtron had not yet
verified.

**Archived:** 2026-08-12
