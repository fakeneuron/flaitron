---
name: ft-release
description: Cut a flaitron release — version bump, doc-currency shifts, doc-drift sweep, single `feat:` commit, annotated tag, VERSION-HISTORY prepend, push. Use when the user asks to cut or ship a flaitron release. Flaitron-self only (repo-scoped in flaitron's own checkout); never installed in adopter projects or agent homes. Encodes the CORE-048 / CORE-046 / CORE-043 release recipe.
---

# release — flaitron self-host release skill

You are cutting a flaitron release. The recipe is canonical (CORE-048 / CORE-046 / CORE-043 precedents): SPEC.md version bump · docs/MIGRATION.md pin bump · doc-drift sweep · single `feat:` commit · annotated tag · curated `docs/VERSION-HISTORY.md` prepend · push. This skill scaffolds and drives a release tasknote through the full 4-phase flow.

This skill is **flaitron-self only**. It is wired repo-scoped in flaitron's own `.claude/` and never installed globally (`docs/PLATFORMS.md` §"One canonical install path per project"); it never runs in adopter projects. Step 0 enforces this.

The release task is normally filed in `.flaitron/PLAN.md` as a one-line entry before `/ft-release` runs — for example:

```text
- [ ] **<TASK-ID>** [model] | release vX.Y.Z — Cut vX.Y.Z minor release tagging <FEAT-A> + <FEAT-B> since v<prev>.
```

`/ft-release` scans PLAN for the entry and drives it. If no such entry exists, Step 1 offers to draft and file one itself (task ID, version, and description all self-computed from repo state) rather than just bouncing the user to file it by hand. The skill takes **no arguments**.

## Step 0 — Verify cwd is the flaitron repo

The skill bails if invoked outside flaitron's own checkout:

- `SPEC.md` exists at the repo root with the heading `# Flaitron — Workflow Specification` on line 1.
- `.flaitron/PLAN.md` exists (flaitron's own PLAN.md, not an adopter's `.flaitron/core/PLAN.md`).
- `.flaitron/core/SPEC.md` does NOT exist (its presence means we're inside an adopting project — `/ft-release` must not run there).

If any check fails, stop. Tell the user `/ft-release` only runs from inside the flaitron repo. Do not modify any files.

## Step 1 — Find the pending release task in PLAN.md

Read `.flaitron/PLAN.md`. Scan un-checked task lines under `## High | Medium | Low` (and `## Critical` if a legacy heading is still present — see SPEC §"Task-line format"; skip `## Completed` and `## Future Opportunities`) whose `| <shortname>` segment matches `release v*` (case-insensitive — e.g., `release vX.Y.Z`).

- **Zero matches.** Don't just bounce the user to file it by hand — offer to draft and file the line now (Step 1.1 below), same as if it had already existed. Only fall back to stopping if the user declines.
- **Multiple matches.** Stop. List the matches and tell the user `/ft-release` requires exactly one pending release task. Ask them to close/de-scope the duplicates or restructure to a single line. Do not scaffold.
- **Exactly one match.** Capture the `<TASK-ID>`, the `[model]` segment, the `| <shortname>` segment, the long description, and the section heading (priority). Continue.

Parse the **target version** from the shortname: `release v<X.Y.Z>` → `vX.Y.Z`. If the shortname doesn't conform, stop and ask the user to fix the line.

### Step 1.1 — Zero-matches fallback: draft and file the line

Runs only when Step 1 found no pending `release v*` line. Computes the same version/bump-kind facts Step 2 would, just earlier, so the two never disagree — this step does not replace Step 2's own confirmation, it just gets the PLAN line in place first.

1. **Compute the proposed version.** Read `SPEC.md:3` for the current version. Run `git describe --tags --abbrev=0` and confirm it matches — if it doesn't, stop and surface the drift exactly as Step 2 would (don't file a new release line over an already-broken state). Run `git log <last-tag>..HEAD --oneline`, classify each commit by Conventional-Commits prefix (same rule as Step 2: `feat!:`/`BREAKING CHANGE:` → major, `feat:` → minor, everything else → patch), and take the highest-rank classification as the proposed bump kind. Apply it to the current version for the proposed new version. If there are zero commits since the last tag, stop and tell the user there is nothing to release yet.
2. **Suggest a task ID.** Flaitron-self release tasknotes always use the `CORE` area (every prior `release v*` entry does). Scan `.flaitron/PLAN.md`, `.flaitron/tasknote/`, and `.flaitron/tasknote/archive/core/` for the highest existing `CORE-<N>` and suggest `CORE-<N+1>`.
3. **Draft the shortname, model, and description.** Shortname: `release v<A.B.C>`. Model: `[medium]🧩` (matches every prior release entry). Long description: `Cut v<A.B.C> <bump-kind> release tagging <FEAT-A> + <FEAT-B> since v<prev>.` — name the feature-level task IDs found in the classified commit log (e.g. from `feat: <TASK-ID> — ...` subjects), not every individual commit.
4. **Surface the draft and ask.** AskUserQuestion with the fully drafted line shown verbatim (e.g. `- [ ] **CORE-<N>** [medium]🧩 | release vA.B.C — ...`) and options: **File it and continue** (default) / **Let me edit the task ID, version, or description first** / **I'll file it myself — stop here**. Honor edits before filing.
5. **On accept, append the line** under `## Medium` in `.flaitron/PLAN.md` (bottom of the section, or replacing a `(none)` placeholder) using the canonical task-line grammar. Do **not** commit this edit separately — flaitron's own release history shows the pending line and its Step 7.3 flip-to-Completed have always landed in the single release commit together, never as a standalone filing commit, so this follows the same pattern. Then proceed exactly as if Step 1 had found this line as its one match — capture the same fields, and skip re-deriving the bump proposal in Step 2 since it was already computed here.
6. **On decline ("I'll file it myself"),** stop with the original message: "No pending `release v*` task in PLAN.md. File a one-liner first (e.g., `**<TASK-ID>** [model] | release vX.Y.Z — ...`), then run `/ft-release` again." Do not scaffold.

## Step 2 — Verify state and propose bump kind

Read `SPEC.md:3` to get the **current version** (the line `**Version:** vX.Y.Z`).

Run:

```sh
git describe --tags --abbrev=0
```

This is the last tag. If it doesn't match the SPEC.md version, stop and surface the drift (typically an aborted prior release; user reconciles before continuing).

Run:

```sh
git log <last-tag>..HEAD --oneline
```

Classify each commit by Conventional-Commits prefix:

- `feat!:` or commit body containing `BREAKING CHANGE:` → major
- `feat:` (no `!`) → minor
- `fix:` / `chore:` / `docs:` / `refactor:` / etc. → patch

Compute the **proposed bump kind** = the highest-rank classification across all commits. Compute the **proposed new version** by applying the bump to the current version.

Surface to the user:

```text
Current version: vX.Y.Z (matches SPEC.md:3 and `git describe`)
PLAN target:     vA.B.C
Commits since vX.Y.Z:
  - feat: ... (additive)
  - fix:  ... (clarification)
  - ...
→ Proposed bump kind: <patch|minor|major>  (vX.Y.Z → v<auto-computed>)

Confirm or override?
```

If the proposed bump and the PLAN-line target match, the user confirms in one shot. If they disagree, surface the disagreement explicitly and ask which to use; the PLAN-line target wins by default unless the user revises the line. Once locked, the **new version** = the user-confirmed `vA.B.C`. Use this throughout the rest of the skill.

## Step 2.5 — Context-budget self-assessment (escape hatch)

Before scaffolding the tasknote (Step 3), self-assess whether the **remaining context budget** is comfortable for a full release cut driven inline in this session. A full cut is a long, multi-file motion: the 3 version edits (Step 5), the dogfood-gate walk (per-agent `AskUserQuestion` + stamp edits), the `/ft-audit docs` subroutine (5 passes over the doc set, Step 7.1), tag-message drafting (Step 7.2), and the commit/tag/push sequence (Step 7.5). Driving all of that with little headroom risks a degraded cut.

**Still needed after CORE-507 (re-evaluated).** That task cut this file from ~77k to ~38k by moving §7.1's standing checks and mirror pairs into fragments, so the *eager* load at Step 0 is roughly half what it was and this hatch should fire less often than it already did. It is not thereby obsolete: the budget this step guards is the whole cut, not the skill body. The two §7.1 fragments are ~60k that still arrives — just at Step 7 instead of Step 0 — and the `/ft-audit docs` subroutine, the dogfood-gate walk, and the version edits are unchanged. The split improves the odds of a clean inline cut; it does not remove the failure mode this hatch exists for.

- **Comfortable** → proceed to Step 3 and drive the cut inline. This is the default — the skill drives the whole release in one session; the escape hatch never fires.
- **Tight** → do **not** scaffold. Surface an **offer** and let the operator decide (self-assess + offer; the assistant flags, the human chooses):
  - **Drive inline now** — proceed to Step 3 anyway (operator accepts the tight budget).
  - **Defer to a fresh chat** — nothing is scaffolded. The pending `release v*` PLAN line found in Step 1 is the *only* prerequisite and already exists, so there is nothing new to file — the deferral hands the whole skill to a clean context. Tell the user to `/clear` and re-run `/ft-release` in a fresh session: it re-scans PLAN, picks up the same pending line, and self-assesses again with a full budget. Emit the re-entry as the canonical copy-paste cue (🧠 label line, then the invocation alone on its own line as inline-code with no trailing punctuation; `/ft-release` takes no args):

    ```markdown
    🧠 Clear your session, then run:
    `/ft-release`
    ```

**Re-entry is `/ft-release`, not `/ft-task <TASK-ID>`.** The release recipe (3 version edits · dogfood gate · annotated tag · push) lives in *this* skill; running `/ft-task` against the pre-filed release line would drive the generic 4-phase flow without any of it. The escape hatch defers the release skill itself to a clean context — it does not hand off to the tasknote runner.

## Step 3 — Scaffold the release tasknote

Copy `templates/tasknote-template.md` to `.flaitron/tasknote/<TASK-ID>.md` and populate the frontmatter:

- `title:` — the PLAN-line shortname (e.g., `release vX.Y.Z`).
- `status:` — `in-progress`.
- `created:` — today's date (`YYYY-MM-DD`).
- `related-tasks:` — populate from the PLAN-line long description's referenced task IDs (e.g., `[<FEAT-A>, <FEAT-B>]` when those features triggered the bump). Include the most recent prior release tasknote as a precedent reference (e.g., `[<FEAT-A>, <FEAT-B>, <PREV-RELEASE>]`).

🎯 Goal — one sentence drafted from the PLAN-line long description.

Pre-populate `## ✅ Acceptance` and `## 🧩 Subtasks` with the canonical 7-step recipe parameterized to `vX.Y.Z` (current) and `vA.B.C` (new). Mirror CORE-048's archived tasknote shape — the Acceptance and Subtasks sections there are the canonical template.

Acceptance (parameterized):

```markdown
- [ ] SPEC.md `**Version:** vX.Y.Z` → `vA.B.C`
- [ ] docs/MIGRATION.md example pin bumped `vX.Y.Z` → `vA.B.C`
- [ ] SECURITY.md release-tag example pin bumped `vX.Y.Z` → `vA.B.C`
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `vA.B.C`, or recorded `skipped @ vA.B.C` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [ ] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: <TASK-ID> — flaitron vA.B.C (...)` commit lands
- [ ] Annotated `vA.B.C` tag created with adopter-facing release notes
- [ ] `docs/VERSION-HISTORY.md` prepended with a curated entry for `vA.B.C` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flaitron/tasknote/archive/core/<TASK-ID>.md`
```

Subtasks (parameterized): mirror CORE-048's 6-line subtask list with the same shape — line-numbered references will need re-resolution via grep at execution time (they drift between releases).

## Step 4 — Drive Phase 1: Discovery

Walk the Phase 1 checklist per SPEC §"📝 Phase 1: Discovery". Most boxes tick fast — the recipe is canonical:

- **Reviewed PLAN.md** — already done in Step 1 of this skill.
- **Relevance Assessment** — Verdict: Proceed. Rationale: bump pattern is well-established; commit log + version drift verified in Step 2.
- **Read relevant source files** — `SPEC.md:3`, `docs/MIGRATION.md` example pin (grep for `describe --tags`).
- **Archive skim** — `.flaitron/tasknote/archive/core/` for prior release tasknotes (CORE-048, CORE-046, CORE-043). Note any structural drift in their precedents that this release should account for.
- **Drift check** — verify the cited locations: `SPEC.md:3` reads `**Version:** vX.Y.Z`; docs/MIGRATION.md grep returns one example pin at `(e.g., \`vX.Y.Z\`)`. Surface any drift before continuing.
- **Adopter migration impact** — for each commit since the last tag, classify whether it requires adopter action (new template section, new doc-set entry, BREAKING change with migration steps). Capture findings in Discovery Notes — feeds the Migration block of the tag message in Phase 4. CORE-047 (in CORE-048's release) is the canonical example of a context-sensitive migration block.
- **Clarifying questions** — typically none. If the bump is major, or if any commit's adopter impact is ambiguous, AskUserQuestion to confirm the migration block contents.
- **Subtasks populated** — already populated in Step 3 from the recipe.

Tick boxes as each step completes. Do not enter Phase 2 until every Phase 1 box is ticked.

## Step 5 — Drive Phase 2: Execution

Apply the 3 version edits in order:

1. **`SPEC.md:3`** — `**Version:** vX.Y.Z` → `**Version:** vA.B.C`.
2. **`docs/MIGRATION.md`** — locate the example pin (grep for `describe --tags`) and bump `(e.g., \`vX.Y.Z\`)` → `(e.g., \`vA.B.C\`)`. Historical references like `v1.0 additions` stay (write-once historical context, per CORE-046 precedent).
3. **`SECURITY.md`** — locate the release-tag example pin (grep for `release tags (e.g.`) and bump `(e.g. \`vX.Y.Z\`)` → `(e.g. \`vA.B.C\`)`.

Verify the `v`-prefixed pins post-edit:

```sh
grep -rn 'vX\.Y\.Z' SPEC.md SPEC/ docs/ README.md SECURITY.md templates/ claude/ 2>/dev/null
```

The three `v`-prefixed pins above should be clean.

**Dogfood gate + SOP-currency walk — read the fragment now.** The 3 version edits above stay here; the dogfood-or-explicit-skip walk and the standing SOP-currency check live in a sibling fragment so this skill stays under its load budget. Read `claude/skills/ft-release/step-5-dogfood-sop.md` now — it carries both walks. Walk them in that order, then continue to the tick-boxes closer below. The fragment is part of this step, not an optional appendix: skipping it silently drops the dogfood gate.

Tick boxes; populate Implementation Notes with the diff shape (the 3 version edits, plus any dogfood-gate stamp refreshes/skips landed by the walk in `step-5-dogfood-sop.md`, plus the SOP-currency verdict).

## Step 6 — Drive Phase 3: Testing & Linting

The 3 version edits are markdown prose — run a markdown lint mental-pass on SPEC.md, docs/MIGRATION.md, and SECURITY.md:

- Edits are single-token version-string substitutions; surrounding prose unchanged.
- No frontmatter touched; no fenced blocks broken.

Independently of the version edits, run the standing viz + fleet-updater validation gate — the commands in `AGENTS.md` §"Validation", from the repo root. Every cut runs it regardless of which files it touches.

If a viz/code feature ships in this release, surface that the feature's own tasknote already ran its test pass — `/ft-release` does not re-run feature tests beyond these standing validation gates.

### 6.1 — CI status on the commit being built on (blocking)

The Step 6 gate proves the tree passes **on this machine**, and say nothing
about GitHub Actions. The `drift` job is not in the local roster, so a
CI-only failure is invisible to Step 6 — at [[CORE-546]] it had been failing on
every push since [[CORE-535.3]], and v5.25.0 was tagged on a commit whose own run
concluded `failure`, unread. Check it:

```sh
sha=$(git rev-parse HEAD)
gh run list --commit "$sha" --json workflowName,status,conclusion \
  --jq '.[] | "\(.workflowName)\t\(.status)\t\(.conclusion)"'
```

Every reported run must be `completed` + `success`. Read the result as:

- **All green** — proceed to Step 7.
- **Any `failure` / `cancelled` / `timed_out`** — **blocking.** Unlike §7.1's
  machine-global wiring half, this is repo state a commit in this cut can fix,
  so it takes the same Critical/High posture: fix inline, or stop and tell the
  operator why the cut cannot proceed. Never tag over a red commit — the tag is
  what adopters pin, and `/ft-update` moves the fleet onto it.
- **Still `in_progress` / `queued`** — not a pass. Wait for it, or surface the
  state and let the operator decide; never read "not yet failed" as green.
- **No runs reported, `gh` missing, or `gh` not authenticated** — not a pass
  either. Say so explicitly and hand the operator the verdict rather than
  skipping the step silently. A check that fails open reports clean instead of
  reporting the truth (§"Glob-free by design" in the standing checks is the same
  lesson one surface over).

**Scope: the commit this release builds on, not the release commit** — the
latter does not exist until §7.5, so its run is only observable after the push.
Deliberately not a wait-loop inside the cut: what failed at v5.25.0 was an
*inherited* red `main`, which this step catches. Carry the post-push run into
the §7.4 closure review as one line, flag-don't-block.

### 6.2 — Dependency audit (release cadence)

Run the visualizer's dependency audit once per cut — deliberately not part of
the `validate` CI gate above. `docs/CONVENTIONS.md` §"Dependency audit
cadence" is canonical on why: `npm audit`'s result depends on the public
advisory database's state at run time, not just the code, so gating every
push on it would redden CI for commits that touched nothing relevant.

```sh
npm --prefix viz audit --audit-level=high
```

- **Clean (exit 0)** — proceed to Step 7.
- **Findings reported** — fix inline when in scope for this release, or file
  a follow-up PLAN.md task via `/ft-file-followup` before closing the cut.
  Never let a release close with unaddressed high/critical findings
  unrecorded.

## Step 7 — Drive Phase 4: Closure

Walk the closure steps in order. Three waits, each only when it fires, and none of them is a new banner: the §7.1 Medium/Low finding ask (release anyway, or stop), the §7.2 tag-message review, and the bundled 📦 commit-go (§7.4). Wait at each one that fires.

### 7.1 — Doc-drift sweep (via `/ft-audit docs` subroutine)

Invoke the flaitron-self `ft-audit` skill in **subroutine mode** with the `docs` domain and the `ai-referenced` scope token. The bundled `passes/docs.md` leaves its default-scope slot a forker placeholder, so the AI-referenced docs set declared in `.flaitron/tasknote/README.md` §"AI-referenced docs" is reachable only by naming the token — a bare `docs` resolves to the unfilled default and stops to ask:

```text
Skill(ft-audit) with args "docs ai-referenced"
```

That pass file keeps its placeholders whatever scope you pass, so the dispatcher's §1 step 3 scaffold bootstrap still stops the run before pass 1. Take its **run once** branch: rubric = the doc-set contract above, gates = the CI `drift` job's doc checks run locally (`bash tools/drift-checks.sh pair_q final_newline context_budget` — Pair Q section-citation resolver, final-newline, context budget; there is no markdown linter). Then the `docs` domain walks its 5 passes (Claims vs. code · Cross-doc consistency · Cross-references · Currency · Stale content) over the declared doc set and returns the report inline. Per the dispatcher's Subroutine-safe hard rule it does **not** write tickets to `.flaitron/PLAN.md`; the release skill is the orchestrator. Critical / High findings are fixed inline. Medium / Low findings are not disposed one by one, and filing them does not by itself let the cut continue.

Classify each returned finding:
- **Critical / High** — fix inline as part of the release cut (the 3 version edits in Phase 2 normally clear the routine SPEC + MIGRATION + SECURITY version-pin drift; anything else surfaced here gets the same treatment). Cleared means the finding is gone. A finding that only drops to Medium or Low is held for the ask below. If it is still Critical or High after the inline fix, stop the cut and say why. Release anyway is not available for a finding that is still Critical or High.
- **Medium / Low** — hold it. Do not file it yet, and do not absorb it inside the ask.

If any Medium or Low finding is still open, stop and ask with AskUserQuestion before §7.2. Show every held finding as a one-line summary. Two options, and neither is the default:

- **Stop** — do not file, do not enter §7.2, and do not tag. Record the findings in the release tasknote. The cut stays in this working tree until they are fixed here and §7.1 is re-run. A re-run that still reports Medium or Low findings asks again. A re-run that reports none continues into the standing checks below.
- **Release anyway** — file each held finding via `/ft-file-followup`, record the new task IDs in the release tasknote, then continue the cut. This is the only path that ships with those findings still open.

An empty, unclear, or uncertain reply is **Stop**. This ask is a skill-recipe wait, like the §7.2 tag-message review. It is not bundled into 📦: Stop has to land before §7.2, and folding the choice into commit-go would tag before the operator made it.

If the sweep reports zero findings, or the only findings were Critical / High and those are fixed inline, say so and continue into the standing checks below. **Release anyway** does the same after the follow-ups are filed. **Stop** does not: do not read the standing checks, and do not enter §7.2. Do not invent a third phase-gate banner for this ask — `SPEC/gates.md` §"Operator-gate cues" caps standing banners at 🛠️ and 📦. This is a blocking AskUserQuestion in the same family as Step 1.1.

**Standing checks — read both fragments now** (only when the cut is continuing). Independently of the subroutine findings, §7.1 carries two blocks of standing checks that live in sibling fragments so this skill stays under its load budget. Read them **in parallel**:

- `claude/skills/ft-release/step-7.1-standing-checks.md` — wiring-consumer
  derivation · shipped-skill parity · installed-surface policy · self-wiring
  parity (local blocking + machine-global advisory) · README task-counter ·
  completed-rotation (advisory) · viz-majors-outdated (advisory) · context
  budget (`docs/CONTEXT-BUDGET.md`; also refreshes that doc's ledger in this
  cut).
- `claude/skills/ft-release/step-7.1-mirror-pairs.md` — the Pair A–R
  mirror-pair catalogue, opening with the local runner for the ten pairs
  whose shell lives in `tools/drift-checks.sh` (plus the wrapper-name
  invariant).

Walk them in that order, then continue to §7.2. Both fragments are part of this
step, not optional appendices: skipping the second silently drops every
mirror-pair gate. Every check in them blocks the cut unless it says otherwise
(the machine-global wiring half, the completed-rotation count, and the
viz-majors-outdated list are the standing advisories).

### 7.2 — Auto-draft annotated tag message

Read `claude/skills/ft-release/step-7.2-tag-message.md` now — it carries the full section (tag-message draft, sentinel check, VERSION-HISTORY entry). Lock both the tag message and the VERSION-HISTORY entry together when the user approves, then continue to §7.3.

### 7.3 — Final Summary + flip PLAN line + move tasknote

Write the tasknote's `**Final Summary:**` block (one paragraph: what shipped + adopter-impact summary) and set `**Archived:** YYYY-MM-DD`.

Edit `.flaitron/PLAN.md`:

- Replace the un-checked release task line with stub form: `- [x] **<TASK-ID>** [<model>] | <shortname> — Completed YYYY-MM-DD.` (drop the long description per SPEC/plan-filing.md §"`## Completed` archive convention").
- Move the line from its current section to the top of `## Completed`.

Move the tasknote file with a plain `mv` — it was copied fresh in Step 3 and never committed, so it is **untracked** and `git mv` fails (`fatal: not under version control`): `mv .flaitron/tasknote/<TASK-ID>.md .flaitron/tasknote/archive/core/<TASK-ID>.md`. The §7.4 `git add` stages the archived file.

### 7.4 — Stage and surface the 📦 ready-to-commit gate

Stage explicitly (do NOT use `git add .` or `-A` — there may be unrelated unstaged work):

```sh
git add SPEC.md docs/MIGRATION.md SECURITY.md docs/VERSION-HISTORY.md .flaitron/PLAN.md
git add .flaitron/tasknote/archive/core/<TASK-ID>.md
# If the §5 dogfood-gate walk landed any refresh/skip edits, also stage the touched stamp files
# (a git add of an unchanged file is a no-op, so listing all three is safe):
git add docs/AGENT-COMPAT.md docs/PLATFORMS.md claude/CAPABILITIES.md
```

(The Step 7.3 `mv` left the archived tasknote untracked; the explicit `git add` here stages it.)

Surface the bundled 📦 ready-to-commit gate per SPEC/gates.md §"Operator-gate cues" (banner block + mandatory 1-2 sentence preview line summarising what executes on commit-go — typically "cut flaitron vA.B.C: commit the 3 version edits + any dogfood-gate stamp refreshes/skips + PLAN.md flip + tasknote archive, create annotated `vA.B.C` tag, push branch + tag to origin, and publish a GitHub Release for `vA.B.C` (or hold local, unpublished, if push-go declined)"). Alongside the SPEC-defined bundle (closure review · recap · proposed commit message), this skill carries:

- **Dogfood-gate resolution (enforcement)** — confirm the §5 walk resolved **every** dogfooded row **by re-running `step-5-dogfood-sop.md` step 5 from file state now** (the grep loop over the walk's ledger; must print nothing) — never from memory of what the walk wrote, since a parallel session can overwrite a stamp between §5 and here (CORE-588) — and surface the per-agent summary inside the closure review:

  ```text
  Dogfood gate:
    Claude  refreshed → vA.B.C
    Grok    skipped @ vA.B.C
    Codex   skipped @ vA.B.C
    Cursor  skipped @ vA.B.C
  ```

  This is a hard gate: **do not surface commit-go while any dogfooded row is unresolved** (stale prefix carrying no `; skipped @ vA.B.C` suffix for this release). An unresolved row sends you back to §5 to refresh-or-skip it before the cut continues — the gate blocks tagging until the summary shows every dogfooded row resolved.

- **SOP-currency verdict (advisory)** — carry the §5 flag-don't-bump result into the closure review as one line, e.g. `SOP currency: clean` or `SOP currency: ft-task behind source (2 candidates) → filed CORE-NNN`. Unlike the dogfood gate this **does not block commit-go**, and the `last-verified:` stamps are not among the files this cut edits.

- **Global self-wiring verdict (advisory)** — carry the §7.1 machine-global half into the closure review as one line, e.g. `Global wiring: clean`, `Global wiring: 9 dangling links, 2 path casings, 1 over-install — fix out of band`, or `Global wiring: not run — read refused; run natabula's scripts/grant-global-skill-read.sh`. Like the SOP-currency verdict this **does not block commit-go**: agent homes are machine state and no file in this cut can carry the fix. The §7.1 *local* half is not reported here — it blocks upstream and is already resolved by the time this gate is reached.

- **Completed-rotation verdict (advisory)** — carry the §7.1 completed-rotation count into the closure review as one line, e.g. `Completed rotation: 36 rows (bound 60)` or `Completed rotation: 88 rows (>60) — rotate out of band`. Like the two verdicts above this **does not block commit-go**: rotation is an operator motion (`SPEC/plan-filing.md` §"`## Completed` rotation") and a release cut never applies it.

- **Viz-majors-outdated verdict (advisory)** — carry the §7.1 majors list into the closure review as one line, e.g. `Viz majors: none pending` or `Viz majors: typescript 5.9.3→7.0.2, js-yaml 4.3.2→5.4.2 — bump or re-park out of band`. Like the three verdicts above this **does not block commit-go**: `npm outdated` is registry-time state (`docs/CONVENTIONS.md` §"Dependency audit cadence") and a release cut never bumps majors inline.

- **Push-go prompt** — AskUserQuestion with default Yes, a bundled in-📦 prompt parallel to /ft-close-epic's parent-flip (per SPEC/gates.md §"Conditional skip rule" bundled-prompt override):

  ```
  Push branch + tag vA.B.C to origin on commit-go?
  (default Yes; No leaves the commit + tag local for manual push)
  ```

- **Commit message** — `feat: <TASK-ID> — flaitron vA.B.C (<one-clause summary>)`.

- **Tag message** — locked at §7.2; included by reference (the user has already approved it). Surfaced here so the user sees the full atomic motion — commit + tag + optional push — when granting commit-go.

The commit-go prompt carries the canonical `🟢 GO` prefix (e.g., `🟢 GO: Reply commit / go to land.`). Do not commit unprompted. The single 🟢 GO commit-go authorizes the atomic sequence: commit → tag → push (if push-go Yes).

### 7.5 — Commit, tag, push (atomic on 🟢 commit-go)

On 🟢 GO commit-go (push-go answer already captured in the §7.4 bundle), run in this order:

1. ▶️ RUN: `git commit` with the surfaced message.
2. ▶️ RUN: `git tag -a vA.B.C -F -` with the approved message from §7.2 (HEREDOC).
3. **If push-go was Yes** — ▶️ RUN: `git push origin <current-branch>` then `git push origin vA.B.C`, then ▶️ RUN: `gh release create vA.B.C --latest --title "<title>" --notes "<notes>"` — title is the §7.2 locked tag message's first line (`flaitron vA.B.C — <headline>`), notes is everything after it, `--latest` marks it the repo's latest release (flaitron cuts releases linearly off `main`, so this is always correct — no need to ask). A release can't be created for a tag that isn't on origin yet, so this always runs after the tag push, never before or in place of it.
   **If push-go was No** — stop after the tag; §8's 🏁 marker names the manual push + `gh release create` commands as a follow-up step.

Verify each operation before the next (`git log -1 --stat`, `git tag --list vA.B.C`, and on push-go Yes also `git ls-remote --tags origin vA.B.C` and `gh release view vA.B.C`). The separate prose "ask explicitly before pushing" pause from earlier revisions is collapsed — push approval is captured upstream as the bundled push-go prompt at §7.4, per SPEC §"Operator-gate cues" ("skill-level extensions (epic parent-flip, release push-go) bundle into 📦").

## Step 8 — Post-closure protocol (🏁 marker + suggest-next-move + copy-paste)

The post-closure protocol is canonical in `SPEC/post-closure.md` — **Read it now**; it is a lazy module, loaded here and nowhere earlier (steps 1-3: commit / mark landed with 🏁 / offer copy-paste line). For releases:

- **Recap** — already bundled into the §7.4 📦 gate per SPEC §"🚀 Phase 4: Closure" (not re-surfaced here). One paragraph of what shipped (version, headline features, adopter migration if any); drop the "verification request" — the verification IS the push.
- **🏁 post-commit state-marker** — once §7.5's operations land (commit + tag + push + release create on push-go Yes; commit + tag only on push-go No), emit the marker per `SPEC/post-closure.md` step 2:

  ```markdown
  🏁 **<TASK-ID> — committed `<sha>`, tagged `vA.B.C`, published release** · archived to `.flaitron/tasknote/archive/core/<TASK-ID>.md`
  <1-2 sentence plain-English summary of what shipped + adopter-impact>
  ```

  On push-go No, drop "published release" from the marker and append a one-line manual follow-up reminder under it (e.g., `Manual push pending: ▶️ RUN: \`git push origin <branch>\` then \`git push origin vA.B.C\`, then \`gh release create vA.B.C --latest --title "<title>" --notes "<notes>"\`.`).

- **Suggest-next-move + copy-paste line** — follow in the same response as the 🏁 marker. Candidates carry `[model]` inline per option (`**<TASK-ID>** [model] | shortname — one-sentence "why now"`). The next move is typically the next pending child in the cohort that filed this release, or `/ft-file-followup` for any drift surfaced during the cut.

## Notes

- **Flaitron-self only.** This skill is never symlinked into adopter projects. Adopters consume flaitron via submodule pin and the manual bump procedure in `docs/MIGRATION.md` §"Pinning and bumping".
- **Context-budget escape hatch (Step 2.5).** A full cut is a long session. If the remaining context budget looks tight at invocation, the skill offers to defer the whole cut to a fresh `/ft-release` chat (re-entry is `/ft-release`, not `/ft-task <TASK-ID>` — the recipe lives here) rather than driving inline on thin headroom. Comfortable budgets skip the hatch and drive inline as before.
- **Why no args.** A flaitron release is a coordinated cut — there is at most one pending `release v*` task in PLAN at a time. The PLAN-line filing normally happens before `/ft-release` runs, or Step 1.1 drafts and files it on the spot when none exists yet (still gated by an AskUserQuestion review — never a silent write). Multiple un-cut releases queued is a process smell; the skill bails to surface it.
- **Tag-message review is mandatory.** The auto-draft seeds the structure; the user is expected to review and edit. CORE-048's deviation from CORE-046's `No required project-side edits` boilerplate (calling out CORE-047's adopter action item) is the canonical example of context-sensitive editing — a rote auto-draft would have missed it.
