---
name: ft-epic-discovery
description: File a new flaitron epic and drive its `.1` Discovery tasknote in one motion, filing parent, `.1`, and `.N` audit PLAN lines and scaffolding `.1` with tailored pre-fill. With `--deep`, stages a constitution-specify-clarify pre-pass for high-uncertainty epics before Phase 1 Discovery begins.
---

# ft-epic-discovery — flaitron epic filing + Discovery driver

You are filing a new epic and driving its `.1` Discovery tasknote in one motion. The full lifecycle contract lives in `<SPEC_DIR>/epic.md` — this skill is the executable interpretation of the lifecycle's filing-and-Discovery side, not a replacement. Treat `SPEC/epic.md` as authoritative when this file is silent or in tension.

The skill takes one optional argument: `--deep`. When passed, it stages a `constitution → specify → clarify` pre-pass for high-uncertainty epics before Phase 1 Discovery begins (see Step 1.5 + Step 5.5). All other inputs (area, shortname, priority, model, implementation-child count M) are collected via AskUserQuestion in Step 2.

## Step 0 — Resolve paths

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

Paths this skill uses:
- SPEC: `<root>SPEC.md` (always loaded core)
- SPEC_DIR (lazy modules `epic.md` · `post-closure.md`): `<root>SPEC/`
- SKILL_DIR (lazy fragment `step-5.5-deep-prepass.md`): `<root>claude/skills/ft-epic-discovery/`
- Template: `<root>templates/tasknote-template.md`
- PLAN: `.flaitron/PLAN.md`, tasknote dir: `.flaitron/tasknote/` (always)

After resolving paths, Read `<SPEC_DIR>/epic.md` for the canonical lifecycle before drafting anything.

## Step 1 — Pre-flight

- `.flaitron/PLAN.md` must exist (cwd is a flaitron-adopting project or flaitron itself).
- **Foreign-dirt gate (paper-complete guard).** Before PLAN writes / scaffold, run `git status --porcelain`. If non-empty: **STOP**, surface the dirt list, ask the operator to commit / stash / discard themselves, then re-invoke. Do not auto-clean. See SPEC §"Paper-complete guard".
- The conversation should already have surfaced enough context to motivate filing an epic: a problem worth bracketing with Discovery + Audit subtasks, not a single-task scope. If the conversation has only surfaced a single-task scope, surface to the user: "This looks like single-task scope rather than an epic — recommend `/ft-file-followup [ID] --starter` or a one-line PLAN.md filing instead." Do not proceed unless the user confirms epic scope.

## Step 1.5 — Parse `$ARGUMENTS`

The skill recognizes one optional argument: `--deep`. Branch:

- **Empty `$ARGUMENTS`** → default flow. Set internal flag `deep-mode = false` and continue to Step 2. Steps 5 and 5.5 are no-ops in this branch — flow is byte-identical to the pre-`--deep` skill.
- **`--deep`** → set `deep-mode = true` and **Read `<SKILL_DIR>/step-5.5-deep-prepass.md` now** — it carries the whole of deep mode: what the flag is for, the Step 5 scaffold injection, and the three Step 5.5 stages (constitution → specify → clarify) that run before Phase 1 Discovery begins.
- **`--unattended`** → this skill does not accept it (`SPEC/gate-postures.md` §"`--unattended` operator posture"): filing an epic means having a scoping conversation, and there is none to have with nobody present. Terminate readably and write nothing — do not fall through to the "Any other arg" branch below:

  ```markdown
  ⏸ --unattended stop — unsupported-flag: `/ft-epic-discovery` requires an operator scoping conversation; it has no unattended mode. File the epic conversationally, or use a runner that accepts `--unattended` (`/ft-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-close-epic`).
  ```

- **Any other arg** → surface a one-line usage notice ("Unknown arg `<arg>`. Usage: `/ft-epic-discovery` or `/ft-epic-discovery --deep`.") and ask via AskUserQuestion whether the user meant `--deep`, the default flow, or to abort. Do not proceed silently.

`--deep` is opt-in for **high-uncertainty epics**; the fragment's §"What `--deep` is for" carries the judgment call.

## Step 2 — Collect inputs

Use AskUserQuestion to gather all inputs in one motion. Pre-populate from conversation context where possible — the AI proposes; the user confirms or overrides:

1. **Area** — per SPEC §"Task ID convention"; any project-specific prefixes declared in `.flaitron/tasknote/README.md`. AI proposes from conversation context.
2. **Shortname** — concise label up to ~30 chars (e.g., `expand-shipped-skills`, `viz-keyboard-overhaul`). Used as the parent epic's `| shortname` segment.
3. **Priority** — `High | Medium | Low | Future Opportunities`. AI proposes its best read. For urgent epics, propose `High` with a `[!critical]` flag on the parent (see `SPEC/task-line-segments.md`).
4. **Model** — see `SPEC/model.md` §"Model field" (and its "Practical guidance and agent-aware defaults" subsection) for examples and realistic defaults (mid-tier models like Grok/Sonnet often `[medium]`, or `[light]` for mechanical work); AI proposes a token (primary labels or specific name); this is the epic's token — it goes on the parent, `.1`, and `.N` lines, and each implementation child's Step 7 proposal starts from it.
5. **Implementation-child count M** — number of implementation children, *excluding* Discovery (`.1`) and the audit (`.N`). E.g., M=3 → the epic has `.1` Discovery + `.2..4` implementation + `.N` audit. The audit is always the reserved terminal `.N` suffix (per SPEC/epic.md), decoupled from the count — it never renumbers as children are added. The Discovery's deliverable is filing `.2..(M+1)` (the implementation children).

The user may decline the audit subtask if the epic is a simple multi-child implementation that doesn't warrant the audit bracket (per `SPEC/epic.md` line 11: "Simpler implementations don't need it — apply judgment"). In that case, the epic has `.1` Discovery + `.2..(M+1)` implementation and no `.N` audit; skip the audit-line filing in Step 4.

## Step 3 — Resolve next available `<AREA>-EPIC-<N>`

Scan `.flaitron/PLAN.md` AND `.flaitron/tasknote/archive/<area>/` for the highest used numeric suffix in the chosen area, considering BOTH regular task IDs (`<AREA>-NNN`, `<AREA>-NNN.M`) AND epic IDs (`<AREA>-EPIC-NNN`). Per SPEC §"Task ID convention": `<AREA>-EPIC-<N>` and `<AREA>-<N>.<sub>` share the numeric suffix — the epic and its children use the same N.

Compute `next-N = max-used + 1`. The new parent epic ID = `<AREA>-EPIC-<next-N>`; children will be `<AREA>-<next-N>.1` (Discovery), `<AREA>-<next-N>.2..(M+1)` (implementation, filed during Phase 2), and `<AREA>-<next-N>.N` (audit — the reserved literal suffix, filed now).

Surface to the user:

```text
Filing new epic:
  Parent:    <AREA>-EPIC-<next-N> | <shortname>
  Discovery: <AREA>-<next-N>.1
  Children:  <AREA>-<next-N>.2 .. <AREA>-<next-N>.<M+1>   (filed in Phase 2)
  Audit:     <AREA>-<next-N>.N     (reserved literal suffix; omit if no audit)

Confirm or override?
```

The user may override the numeric suffix (e.g., to align with an externally-tracked ID). Once locked, use this `<TASK-ID>` shape throughout.

## Step 4 — File the PLAN.md lines

**Filing-commit pre-check.** Immediately before the append, run the pre-check in `SPEC/plan-filing.md` §"Filing commits": `git diff --cached --quiet` non-zero, or any PLAN.md change beyond earlier task-row filings → `auto-commit = false`; otherwise `auto-commit = true`, recording any accumulated-filing IDs. Not a gate — the foreign-dirt gate makes `true` the common case, but the Step 2–3 confirmation pauses can stale that reading, so run it here.

Append to `.flaitron/PLAN.md` under the chosen `## <Priority>` heading. Use the canonical task-line grammar (SPEC §"Task-line format"; a dependency on another row is `Blocked by [[<ID>]]`, wikilink-only — `SPEC/plan-parser.md` §"Long-description conventions"). Three lines (or two if N excludes audit), nested with 2-space indent under the parent for the subtask lines:

```markdown
- [ ] **<AREA>-EPIC-<next-N>** [<model>] | <shortname> — One-paragraph epic description (filed via /ft-epic-discovery; refined at .1 closure).
  - [ ] **<AREA>-<next-N>.1** [<model>] | <shortname> discovery — Scope shared design and file children .2..(M+1) per SPEC/epic.md.
  - [ ] **<AREA>-<next-N>.N** [<model>] | <shortname> audit — Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line). Filed now with the reserved terminal `.N` suffix (never renumbers as children are added).
```

Placement:

- If the priority section already has entries, append to the bottom of that section.
- If the section carries a `(none)` placeholder, replace the placeholder with the new entries.
- Preserve the 2-space child indent on the `.1` and `.N` lines (per CORE-EPIC-057 cohort in `.flaitron/PLAN.md`: `  - [ ] **CORE-057.1** ...`).

Do NOT pre-write `.2..(M+1)` lines here — that is the Discovery's Phase 2 deliverable.

The parent epic's long description is a placeholder that the Discovery `.1` will refine at closure time (the epic's actual scope crystallizes from Discovery, not from filing-time guesswork). Keep it under the 70w hard cap (SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds").

**Commit the filing** (when `auto-commit = true`), before Step 5 scaffolds `.1` — the Step 3 confirmation is the commit authorization:

```sh
git add .flaitron/PLAN.md
git diff --cached   # whole index, no pathspec
git commit -m "chore: file <AREA>-EPIC-<next-N> — <shortname>"
```

**Post-stage verification.** Recognized hunks: the parent and `.1` rows, the `.N` row when filed, any replaced `(none)`, and the accumulated filings the pre-check recorded (their IDs go in the body line that section names). Anything else → `git restore --staged .flaitron/PLAN.md`, skip the commit, and say so as for `auto-commit = false`. Report `committed <sha>` as plain text, **no 🏁** — the `.1` closure in Step 10 carries it. `auto-commit = false` → skip with one line (`filing left uncommitted — PLAN.md or the index already carried other changes`); the rows then ride the Step 10 closure commit. Explicit pathspecs, the whole-index read, and commit-never-push: `SPEC/plan-filing.md` §"Filing commits".

## Step 5 — Scaffold the `.1` Discovery tasknote

Copy `<template>` to `<tasknote dir>/<AREA>-<next-N>.1.md` and fill the frontmatter per SPEC §"Tasknote frontmatter":

- `title:` — `<shortname> discovery` (e.g., `expand-shipped-skills discovery`).
- `status:` — `in-progress`.
- `created:` — today's date (`YYYY-MM-DD`).
- `related-tasks:` — `[<AREA>-EPIC-<next-N>]` plus any predecessor IDs the user surfaced in Step 2.

Replace the H1 with `# <AREA>-<next-N>.1 | <shortname> discovery` and update the nav header `🔗` chip to `[[<AREA>-EPIC-<next-N>]]`.

Pre-populate `## 🎯 Goal`, `## ✅ Acceptance`, and `## 🧩 Subtasks` with the canonical epic-Discovery shape parameterized to the locked inputs:

**Goal (one sentence):**

> Scope the `<AREA>-EPIC-<next-N>` epic (`<shortname>`) before any implementation child fires; deliverable = filed concrete child scopes for `<AREA>-<next-N>.2..(M+1)` in `.flaitron/PLAN.md`.

**Acceptance (parameterized):**

```markdown
- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for <AREA>-<next-N>.2 .. <AREA>-<next-N>.<M+1> filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line <AREA>-<next-N>.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)
```

**Subtasks (parameterized):**

```markdown
- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flaitron/tasknote/archive/<area>/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for <AREA>-<next-N>.2 .. <AREA>-<next-N>.<M+1>; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flaitron/PLAN.md under <AREA>-EPIC-<next-N> with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote
```

Leave the standard 4-phase checklist sections from the template intact below the populated Goal / Acceptance / Subtasks. Drop the audit-related Acceptance/Subtask line if the epic excluded the audit in Step 2.

**If `deep-mode = true`** (set in Step 1.5), also inject the `## 🧭 Deep Pre-pass` placeholder section — shape and placement in `<SKILL_DIR>/step-5.5-deep-prepass.md` §"Scaffold injection (Step 5)", already loaded at Step 1.5.

**If M>1**, also inject an empty `## 🌳 Fan-out` placeholder in the same top-block slot (after Related, before Handoff / Deep Pre-pass / the `---` rule):

```markdown
## 🌳 Fan-out

- **Parallel:**
- **Sequential:**
- **Synthesis:**
```

Leave the rows blank at scaffold — Step 7 fills them when the child lines are filed. M=1 skips the heading (nothing to fan out). Contract: [`SPEC/tasknote-inserts.md`](../../../SPEC/tasknote-inserts.md) and [`SPEC/epic.md`](../../../SPEC/epic.md) §"Fan-out". The heading is an optional insert, not a template change.

## Step 5.5 — Deep pre-pass (only on `--deep`)

Skip entirely if `deep-mode = false`. On `--deep`, drive the three stages from the fragment's §"Step 5.5 — Deep pre-pass (only on `--deep`)" — each ends with an AskUserQuestion review gate, not a banner; the two-banner cap is preserved.

## Step 6 — Drive Phase 1: Discovery

Walk the Phase 1 checklist per SPEC §"📝 Phase 1: Discovery". Tick boxes as each step completes. Skill-specific imperatives:

- **Reviewed PLAN.md** — already done (the parent + `.1` + `.N` lines were written in Step 4).
- **Relevance Assessment** — Verdict: Proceed (the user explicitly invoked `/ft-epic-discovery`, motivating filing an epic). Rationale: capture from the Step 1 conversation context.
- **Read relevant source files** — read the source files the conversation surfaced as in-scope for the epic. If none surfaced yet, ask the user which directories / modules / files the epic touches and read those.
- **Archive skim** — `ls <tasknote dir>/archive/<area>/` then `grep -l <source-path> <tasknote dir>/archive/<area>/*.md` for each source path (prefer YAML `touches:` when set). Read hits; also open IDs named by Related / `supersedes` / ⚠️ pointers — still grep + read, no query engine. Log load-bearing findings (file moves, precedents, design decisions, regressions) in Discovery Notes.
- **Drift check** — verify file paths, line numbers, and concepts cited in the conversation context still match HEAD. Flag any drift.
- **Clarifying questions** — use AskUserQuestion to resolve open scoping decisions for the implementation children.
  Typical questions: per-child shortname + scope; cross-cutting adopter-wiring policy; SPEC contract impact per child. Record answers in a "Resolved scoping" table in Discovery Notes.
- **Subtasks populated** — the Step 5 scaffold pre-filled the canonical epic-Discovery subtask list; refine them now if Discovery surfaced a scope shift.

Do not enter Phase 2 until every Phase 1 box is ticked. Once ticked, apply the SPEC/gates.md §"Phase 1→2 exit gate"'s **`default-fire-on-clarifications` flavor** — the higher-checkpoint flavor, not `/ft-task`'s `default-skip`. That section's rule is authoritative for which asks fire; this skill only routes the two outcomes:

- **"No clarifications needed" branch** — emit the inline marker `✅ Phase 1 Discovery complete; entering Phase 2 Execution.` and start Step 7 Phase 2 immediately. Plain prose, not a banner; not a new gate.
- **Clarifications-surfaced branch** — surface the **🛠️ Phase 1→2 operator-gate cue** with the mandatory 1-2 sentence plain-English preview line (per SPEC/gates.md §"Operator-gate cues") and wait for the user's go (conversational assent — SPEC/cue-vocabulary.md §"Accepted gate replies") before starting Step 7 Phase 2.

## Step 7 — Drive Phase 2: Execution

The Phase 2 deliverable is the filed child lines. Walk the Phase 2 checklist:

- **Pattern survey** — the existing CORE-EPIC-057 children are the closest precedent for the cohort-children filing pattern (2-space indent under the parent; `[<model>]` tag present on every line; em-dash separator; per-child long description ≤50w target / 70w hard cap).
- **Implemented the minimal solution** — write the drafted `.2..(M+1)` child lines — each carrying its per-child `[model]` (below), drafted before the write — into `.flaitron/PLAN.md` directly under the existing `.1` Discovery line, before the `.N` audit line (or at the bottom if the epic excluded audit). Preserve the 2-space child indent. Word-count each line; rewrite if any breach the 70w cap.
- **Updated/added tests** — N/A (pure PLAN.md filing; no executable code surface).

**Per-child `[model]`.** Draft each `.2..(M+1)` token from the shape Discovery settled for that child — seed it from the epic's token (an `[xheavy]` epic seeds `[heavy]`), then raise or lower to the tier whose `SPEC/model.md` §"Practical guidance and agent-aware defaults" work shape the child matches (a concrete seed stays as-is unless lowered, which yields a category token). Propose category tokens only, capped at `[heavy]`; a concrete token (e.g. `[fable]`) only when the epic token is concrete or the operator named that model — a category tag matches by tier, so pinning a named model needs the concrete token (`SPEC/model.md` §"Pinning a named model").

**Downstream-impact reconciliation scan.** SPEC/tasknote-selection.md §"Downstream-impact reconciliation" is authoritative for the triggers, the three scan steps, the impact classes, and the reconcile actions. The child cohort is a **new-task filing** trigger, so run the scan after writing the `.2..(M+1)` lines — scoping it to the **rest of** the active PLAN, since the just-filed children are themselves out of scope. A fresh-area epic whose children obviously touch nothing already filed skips it (judgment) — note "no downstream impact" and move on. Its user-confirm is an **AskUserQuestion-style review prompt, not a new banner** — the two-banner cap (🛠️ Phase 1→2 + 📦 ready-to-commit) is preserved, consistent with Step 5.5's per-stage gates.

**`[unattended]` candidacy** (mirror of `SPEC/unattended-candidacy.md` §"Three postures" — Read that module now, at this write step). Attended branch only: this skill accepts neither `--fast` nor `--unattended` (Step 1.5), so the `unattended-candidates:` line never fires here. Run §"Candidacy predicate" over each `.2..(M+1)` line as just written **and** over the `.N` audit row Step 4 filed; Step 4's parent + `.1` lines are not re-evaluated. Clause 6 on this surface: the `.1` is this tasknote and closes at Step 9 of the same motion, so the implementation child with no filed predecessor reads its predecessor as closed; every later child is admitted only when its stem predecessor — per the Fan-out classification Discovery settled (filled below), or `.k-1` when undeclared — is proposed in the same pass; the `.N` likewise reads `.1` as closed.

**The review prompt fires when the scan proposes an action, the predicate admits a row, or a child's proposed `[model]` departs from the epic token's seed** — the same AskUserQuestion-style prompt; with none, no prompt, as before. A departing child shows its `[model]` beside the epic's; an operator edit to it replaces that token (and any glyph) in place and re-runs §"Candidacy predicate" over the whole cohort, re-asking for any row whose result changed before `[unattended]` lands. It shows each candidate line with `[unattended]` in place after `[<model>]` and any model-suggestion glyph (SPEC §"Task-line format"; position footgun in `SPEC/plan-parser.md`), naming the clause-6 predecessor where one applies, alongside any reconcile proposals. The operator's assent keeps an `[unattended]` token; an edit that drops it drops it and every kept row leaning on it (module §"Three postures"); a declined row shows no token and says nothing. After the confirmation, add `[unattended]` to each confirmed row in place — the just-written children and the Step 4 `.N` alike: insert it after `[<model>]` and copy every other segment verbatim. Neither the candidacy nor the reconcile proposal adds a cue, banner, or checklist box.

Capture in Implementation Notes: the count of lines written, word-count per line, any change to the implementation-child count M from the filing-time estimate (the audit's `.N` suffix is unaffected — it never renumbers), any reconcile edits applied to existing entries (or "no downstream impact"), the candidacy result — rows proposed, confirmed, and cascaded (or "no candidates") — and each child whose `[model]` departs from its seed (or "uniform").

**Fan-out fill (when M>1).** The Step 5 placeholder is still empty. Populate `## 🌳 Fan-out` from the Discovery scoping: Parallel (independent children that may share worktrees), Sequential (`[[ID]] after [[pred]]`), Synthesis (the `.N` audit; no extra parent synthesis task). Omit a row that does not apply. When Discovery did not classify, default every implementation child to Sequential and `.N` to Synthesis. Do not write `blocked-by` / `parallel-safe-with` onto the child PLAN lines — those keys live on each child's tasknote at `/ft-task` scaffold (YAML echo). Contract: [`SPEC/epic.md`](../../../SPEC/epic.md) §"Fan-out".

Phase 2 flows continuously into the Step 8 markdown mental-pass and Step 9 closure ops without an intermediate gate; the next operator-gate cue is the 📦 ready-to-commit banner in Step 10.

## Step 8 — Drive Phase 3: Testing & Linting

Markdown-prose edits only — no test surface. Markdown mental-pass on the edited PLAN.md block:

- 2-space child indent preserved on every new line.
- `**<AREA>-<next-N>.<M>**` bold ID intact.
- `[<model>]` tag present on every new line; a child's is a category token no heavier than `[heavy]`, or the concrete token Step 7 allows.
- `[unattended]`, where the Step 7 review kept it, sits after `[<model>]` and any glyph, before `| <shortname>`; no token on the parent or `.1` line, none on a row the review declined.
- `| <shortname>` segment present and ≤30 chars.
- Em-dash separator (` — `) consistent.
- Long description ≤70w hard cap; ≤50w target.
- No trailing whitespace.
- Any reconcile-edited existing lines (the Step 7 scan) still parse — grammar, indent, and cross-refs intact.
- If M>1: `## 🌳 Fan-out` is present and populated; wikilinks on Parallel / Sequential / Synthesis rows match the filed children; M=1 notes have no Fan-out heading.

Tick all five Phase 3 boxes (test suite N/A, lint N/A, receipt N/A, External review N/A — the deliverable is filed PLAN lines, not a diff to grade — frontend N/A).

## Step 9 — Drive Phase 4: Closure (auto-run)

Walk the closure steps in order under SPEC §"Paper-complete guard". **No banner here** — closure ops auto-run; the recap drafted at the end bundles into Step 10's 📦 gate. Flip **only the `.1` line** (not the parent or other children); flip only when ready to proceed to the atomic commit in Step 10. Pure Discovery filing is workflow-only: PLAN child lines + archive are the deliverables.

- **Doc-drift sweep** — for each entry in `<tasknote dir>/README.md` §"AI-referenced docs", state per-entry verdict ("no change" or the specific update). Pure Discovery filing typically lands "no change" across the board — contract edits live inside the implementation children.
- **Tick through `## ✅ Acceptance`** — tick every criterion the Discovery satisfied; annotate any it did not (`N/A` / not-met with a one-line reason). Never leave a box silently unticked. Do **not** flip the markdown nav chip to `✅ Completed` — that write was retired by CORE-042.4 and the chip is render-derived from YAML (SPEC §"🚀 Phase 4: Closure").
- **Flip the `.1` PLAN.md line to stub form** — `- [x] **<AREA>-<next-N>.1** [<model>] | <shortname> discovery — Completed YYYY-MM-DD.` per SPEC/plan-filing.md §"`## Completed` archive convention". Keep nested under `<AREA>-EPIC-<next-N>` in its current `## <Priority>` section (SPEC/epic.md §"Child placement invariant").
- **Flip the `.1` tasknote's YAML `status:`** — `in-progress` → `completed`, before the move — a lifecycle write, not a retroactive edit (SPEC §"Tasknote frontmatter" → "Write-once does not cover lifecycle writes").
- **Move the `.1` tasknote** — set `**Archived:** YYYY-MM-DD` in the tasknote's Phase 4 block, then `mv <tasknote dir>/<AREA>-<next-N>.1.md <tasknote dir>/archive/<area>/<AREA>-<next-N>.1.md`. Plain `mv`, not `git mv`: Step 5 scaffolded the note untracked and nothing stages it before Step 10, so `git mv` fails "not under version control".
- **Draft the recap** — leads with a 1-2 sentence plain-English summary (epic filed, Discovery closed, children scoped), then technical detail (cohort surface inventoried, child line word-counts, any change to M). Hold it for Step 10's 📦 bundle; do not surface a banner now.

## Step 10 — Post-closure protocol

**Read `<SPEC_DIR>/post-closure.md` now** — the protocol is a lazy module, loaded here and nowhere earlier — then run it under SPEC §"Paper-complete guard", branching on SPEC/gates.md §"Conditional skip rule". Skill-specific orchestration:

- Evaluate the **📦 conditional skip rule** against the closure diff. For pure `/ft-epic-discovery` filings the diff is typically PLAN.md edits + a tasknote scaffold/archive — no privileged-ops surface — so the skip branch is the common case (workflow-only carve-out). Branch:
  - **Skip branch** (signals clear; no bundled in-📦 prompt — `/ft-epic-discovery` carries none) — run that section's **autonomous-commit motion** end to end, naming the cleared signal in its marker (e.g., `PLAN.md edit + tasknote scaffold/archive; no privileged-ops surface`). Do not surface a 📦 banner.
  - **Fire branch** (privileged-ops signal hits) — its **bundled-approval motion**: surface the 📦 gate (`SPEC/post-closure.md` step 1) and wait for commit-go.
- Proposed commit message (skill-specific): `feat: <AREA>-<next-N>.1 — scope <AREA>-EPIC-<next-N> children`, or `feat: <AREA>-<next-N>.1 — file <AREA>-EPIC-<next-N> + scope children` when Step 4 left the filing uncommitted (or a user-edited variant). Do not commit unprompted on the fire branch.
- 🏁 per `SPEC/post-closure.md` step 2, **only with a real SHA** whose paths cover PLAN + archive (and any other Discovery deliverables) — the skip branch collapses 🛠️ / 📦 to inline markers, but 🏁 still fires.
- Suggest-next-move: run `SPEC/post-closure.md` step 2 as written — the **fresh PLAN.md re-read**, the unchecked-and-open-section verification, the **PLAN exhausted (terminal)** form when no candidate survives, and the emoji-primary-label print. Read the full task-line shape (including `[model]`) to know the recommended model for each child. The next move is typically `/ft-task <AREA>-<next-N>.2` (first implementation child).
- Copy-paste helper: run `SPEC/post-closure.md` step 3 as written — the glyph copied from the chosen candidate line, the own-line inline-code invocation with no trailing punctuation, and the 👇 `Run in this session:` exception for context-dependent skills. Here the invocation line is `` `/ft-task <next-ID>` ``.

## Notes

- **One-motion contract.** This skill files the parent + `.1` + `.N` PLAN lines AND drives the `.1` Discovery tasknote through closure in a single invocation. No seam where the user has to manually run `/ft-task <ID>.1` after filing — `/ft-task` would refuse to restart the in-progress tasknote anyway.
- **Audit subtask is optional.** Per `SPEC/epic.md` line 11, simpler multi-child implementations don't need the Discovery + Audit bracket. Step 2's AskUserQuestion offers the option to skip the audit; in that case Step 4 files only the parent + `.1` and the epic has no `.N` audit slot.
- **M can shift during Discovery.** If the Discovery surfaces that the implementation-child count M was wrong (scope shrinks or grows), Phase 2 in Step 7 files a different number of numeric children (`.2..(M+1)`) — the audit's reserved `.N` suffix is unaffected and never renumbers. Document the shift in Implementation Notes.
- **Parent description is a placeholder.** The parent epic's long description filed in Step 4 is a one-paragraph placeholder; the Discovery's Final Summary refines it at closure time. The visualizer parses both states identically.
- **Auto-wired into adopters.** Symlinked into adopter projects via `claude/skills/ft-new-project/SKILL.md` Step 3 + `docs/MIGRATION.md` §1.2 + `claude/AGENTS-snippet.md`'s "One-time symlink wiring" section. New adopter projects bootstrapping via `/ft-new-project` get this skill automatically; existing adopters pick it up on next flaitron version bump.
- **Compare with `/ft-close-epic`** — the sibling skill that scaffolds + drives the audit `.N` tasknote at the end of an epic and prompts the user to flip the parent line to `Completed`. `/ft-epic-discovery` opens an epic; `/ft-close-epic` closes it.
- **Compare with `/ft-task`** — `/ft-task <ID>` runs an existing PLAN.md entry (starter, in-progress, or fresh) through the 4-phase workflow. `/ft-epic-discovery` files a new epic AND its first child AND drives that first child to closure. The two skills don't overlap.
- **Compare with `/ft-file-followup --starter`** — `/ft-file-followup [ID] --starter` files a single starter tasknote with rich AI-captured context. `/ft-epic-discovery` files an epic + its first two child lines + drives a full Discovery. Use `--starter` when scope is single-task; use `/ft-epic-discovery` when scope warrants the Discovery + Audit bracket. **Cross-session handoff:** when an epic brief is fully formed in the current session but `/ft-epic-discovery` itself will run in a fresh session (e.g., `/clear` planned, model swap), file a starter now to park the brief — next session reads the starter file as context before invoking `/ft-epic-discovery`. See `claude/skills/ft-file-followup/starter-mode.md` §Notes "Proactive invocation on cross-session handoff".
