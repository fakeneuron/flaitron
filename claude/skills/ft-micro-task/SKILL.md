---
name: ft-micro-task
description: Start and complete a flaitron micro-tasknote in one shot for tasks above the skip threshold but below full ceremony. With `--fast` (`-f`), forces the autonomous-commit path at closure. With `--unattended`, runs with no operator present, parking at gates instead of asking.
---

# micro-task — flaitron micro-tasknote runner

You are starting **and completing** a micro-tasknote for the task ID provided in `args` (e.g., `CORE-050`). The full workflow contract lives in flaitron's `SPEC.md` — this skill is the executable interpretation, not a replacement. Treat SPEC.md as authoritative when this file is silent or in tension.

A **micro-tasknote** is a single-section lightweight tasknote for tasks above the skip-tasknote threshold (more than a one-line typo, more than ~10 doc lines) but small enough that the full 4-phase ceremony is overkill — typically small audits, focused doc patches, single-file behavior tweaks with no design tradeoffs to record. The non-negotiable contracts (relevance, drift, archive skim, best-practices review, and pattern survey) survive as **bold-prefix prompts** in a single `## ⚡ Notes` section rather than checklist boxes. Closure is one step (recap + flip PLAN + archive).

This skill is **file + execute (one-shot)**: it scaffolds the lightweight tasknote, drives execution inline, and closes — all in a single conversation. Compare with `/ft-task` (full 4-phase flow for normal-size tasks) and `/ft-file-followup --starter` (filing-only for tasks discovered with rich context but not ready to start).

If `args` is missing or its first token doesn't match `<AREA>-<NUMBER>` (or `<AREA>-<NUMBER>.<SUB>` for epic subtasks), stop and ask the user for a valid task ID. Do not guess. Trailing `--fast` / `-f` and `--unattended` flags are the only other accepted tokens — see Step 0.

## Step 0 — Resolve paths

Two layouts. Pick by which file exists:

- **Adopter project:** `.flaitron/core/SPEC.md` exists → `<root>` = `.flaitron/core/`.
- **Flaitron self-host:** repo-root `SPEC.md` with heading `# Flaitron — Workflow Specification` → `<root>` = repo-root.

If neither matches, bail.

**Skill/pin guard.** On the adopter layout, if the runtime names this skill's base directory and it lies outside this project (an agent-home install such as `~/.claude/skills/<slug>`), stop: this body is not the copy pinned at `.flaitron/core/`, and it can cite files the pin lacks. On either layout, a skill fragment, SPEC module, or template this skill says to Read that is absent also stops the run — never improvise its contents. Both stops make no further write, name anything this run already wrote, and print `⛔ skill/pin mismatch — <base directory or missing path>` (invoked with `--unattended`: `⏸ --unattended stop — skill-pin-mismatch: <same>; wrote <paths, or nothing>.`), pointing at flaitron's `docs/PLATFORMS.md` §"One canonical install path per project" (under `.flaitron/core/` in an adopter): remove the agent-home copy so the repo-scoped wiring runs.

Paths this skill uses:
- SPEC: `<root>SPEC.md` (always loaded core)
- SPEC_DIR (lazy modules `epic.md` · `model.md` · `gate-postures.md` · `post-closure.md`): `<root>SPEC/`
- SKILL_DIR: `<root>claude/skills/ft-micro-task/` (no private fragments)
- PREAMBLE (shared Step 1 / 1.5 fragment, owned by `/ft-task`; it resolves the Step 1.5 edge fragment `step-1.5-model-edge.md` beside itself): `<root>claude/skills/ft-task/preamble.md`
- UNATTENDED (shared `--unattended` fragment, owned by `/ft-task`): `<root>claude/skills/ft-task/unattended-mode.md`
- Micro template: `<root>templates/tasknote-micro-template.md`
- PLAN: `.flaitron/PLAN.md`, tasknote dir: `.flaitron/tasknote/` (always)

**Parse `args`.** Split on whitespace into `(TASK-ID, rest...)`. `rest` is an **unordered flag set** — recognize each token independently. Initialize `fast-mode = false` and `unattended-mode = false`, then walk the tokens:

- **`--fast` or `-f`** → set `fast-mode = true`. Emit exactly one inline marker after path resolution: `⚡ --fast active — 📦 signal trips suppressed at Step 5; Re-scope still promotes to /ft-task, De-scope still recaps.`
- **`--unattended`** (no short alias) → set `unattended-mode = true` **and** `fast-mode = true` — the posture supersets `--fast`'s autonomy, so the operator never passes both (its 👁️ suppression is not inherited, but `/ft-micro-task` emits no separate 👁️ ask, so nothing changes here). Its marker replaces `--fast`'s: `⚡ --unattended active — no operator present: 📦 signal trips suppressed, and the gates an operator-less run cannot answer park the tasknote instead of asking.`
- **Any other trailing arg** → surface a one-line usage notice (``Unknown arg `<arg>`. Usage: `/ft-micro-task <TASK-ID> [--fast] [--unattended]`.``) and ask via AskUserQuestion whether the user meant `--fast`, `--unattended`, the default flow, or to abort. Do not proceed silently.

`fast-mode` in `/ft-micro-task` targets Step 5's Conditional skip rule — `/ft-micro-task` has no banner-block Phase 1→2 gate and no separate 👁️ ask, so the 📦 fire branch is the only suppressible gate. Default flow (`fast-mode = false`) is byte-identical to the pre-flag skill — see SPEC/gates.md §"Operator-gate cues" for the contract. **When `fast-mode = true`, Read `<SPEC_DIR>/gate-postures.md` now** — the flag's own contract is its §"`--fast` operator override".

`unattended-mode` is the operator-less posture. **When `unattended-mode = true`, Read `<UNATTENDED>` now** (and `<SPEC_DIR>/gate-postures.md` + `<SPEC_DIR>/blocked.md` alongside it — the posture's contract, and the `park-reason:` codes every conversion writes). The steps below do not restate it: every gate that would ask an operator — the Step 1.5 concrete-model STOP, a Step 3 `Re-scope` / `De-scope` verdict, a mid-execution hard dependency (park with promote-to-`/ft-task` as a resume instruction, not the attended re-file), a destructive-action escalation or prerequisite ✋ `ACTION`, a queued commit-go question at Step 5 — parks the tasknote instead (the concrete-model STOP with a sidequest stub present terminates and writes nothing), with the code keyed to *this* skill's step in `<UNATTENDED>` §"Conversion map"; the Step 1 pre-flight checks terminate and write nothing (§"Pre-scaffold stops"); the paper-complete guard is never relaxed (§"What `--unattended` never relaxes"). Contract: SPEC/gate-postures.md §"`--unattended` operator posture".

## Step 1 — Locate the task in PLAN.md and pre-flight

**Read `<PREAMBLE>` now** and run its §"Locate and capture": the PLAN.md lookup, the status gate, the segment capture, the `[unattended]` row marker, the 🎯 purpose blurb, and the two advisory checks. Filing-on-the-fly is out of scope here; the PLAN.md entry must already exist. The row marker's `<suppressions>` clause is `📦 signal trips suppressed at Step 5`. This skill has one scaffold path, so the blurb and the ✅ Recap are the operator's only two plain-English reads of the run.

Then run its §"Pre-flight" (Area, epic-ID dispatch, foreign-dirt gate, archive collision, `--unattended` open-siblings audit), with this check ahead of its foreign-dirt bullet, so an uncommitted note is refused as in flight rather than stopped as dirt; micro-tasknotes for epic subtasks are valid — same lifecycle, lighter ceremony:

- If `.flaitron/tasknote/<TASK-ID>.md` already exists: stop. The tasknote is in flight or already closed-but-not-archived. Surface the conflict; recommend the user continue conversationally rather than restarting. If the session that started it is gone (killed, out of context, an orchestrator's child that exited), that recommendation is unreachable — name the park-then-resume path in `<SPEC_DIR>/blocked.md` §"Resuming an interrupted run" instead. **Exception — this skill's own `model-mismatch` park.** A note with `status: blocked`, `park-reason: model-mismatch …`, and a `## ⚡ Notes` section is the bare scaffold the `--unattended` model gate wrote (`<UNATTENDED>` §"Pre-scaffold stops"): it passes on through the rest of Pre-flight to Step 1.5, and Step 2 resumes it instead of scaffolding. Any other existing note, a blocked `/ft-task`-shaped one included, stops as above.

## Step 1.5 — Model gate (BEFORE scaffolding)

Run `<PREAMBLE>` §"Model gate", substituting `/ft-micro-task` for the edge fragment's `<SKILL>` placeholder. **Satisfied** proceeds to Step 2.

## Step 2 — Scaffold the micro-tasknote

**Resume a `model-mismatch` park.** If Step 1 let an existing note through, resume it in place and skip the template copy and the stub retirement below. It is a bare scaffold with no Notes filled and no work done, so there is nothing to drift-check. Fill any scaffold value below the note lacks (🎯 Goal, `related-tasks:`), flip `status: blocked` → `in-progress`, flip the nav chip `⏸ Blocked` → `🟢 In progress`, and remove `park-reason:` (`<SPEC_DIR>/blocked.md` §"Exit (resume)"), then continue at Step 3.

**Sidequest-stub retirement.** If `.flaitron/sidequest/<TASK-ID>.md` exists, this scaffold is a sidequest promotion — read it now; once the scaffold below is written, carry every section below its nav line (`## Idea`, `## Resume anchor`, and any added by hand), verbatim, into the new note's `## ⚡ Notes`, ahead of the bold-prefix prompts, as a quoted block headed `Carried from the retired sidequest stub:`, section headings turned into bold labels, and only after that write delete the stub (`rm .flaitron/sidequest/<TASK-ID>.md`). Contract: `claude/skills/ft-file-followup/park-mode.md` §Notes → "Promotion" ("Delete `.flaitron/sidequest/<ID>.md` after promotion"); this executes it at the point a promoting run actually writes, instead of relying on the promoter to remember a rule stated only in that fragment and `docs/GLOSSARY.md`.

Copy the micro template (path resolved in Step 0) to `.flaitron/tasknote/<TASK-ID>.md`. Frontmatter and body shape: see SPEC §"Tasknote frontmatter" + §"Tasknote body shape" + `SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)" micro carve-out for the `## ⚡ Notes` / `## ✅ Recap` skeleton.

**Skill-specific scaffold values:**

- `title:` — prefer PLAN.md `| shortname` (Step 1); else derive from long description.
- `status:` `in-progress`. `created:` today (`YYYY-MM-DD`). `tags:` / `due:` / `related-tasks:` from PLAN.md line context; default empty.
- 🎯 Goal — derived from the PLAN.md line; ask if too terse for a one-sentence goal.
- ⚡ Notes ships with bold-prefix prompts in place (filled in Step 3); ✅ Recap is placeholder (filled in Step 4).

## Step 3 — Drive execution inline

Fill the five bold-prefix prompts in `## ⚡ Notes` before touching code. They mirror SPEC §"📝 Phase 1: Discovery" (Relevance / Best Practices Review / Drift / Archive skim) + §"🛠️ Phase 2: Execution" (Pattern survey).

Skill-specific imperatives on top of the SPEC contracts:

- **Relevance:** if `Re-scope`, a meaningful re-scope usually means promote to `/ft-task` — archive the micro and re-invoke `/ft-task <ID>`. If `De-scope`, jump to Step 4 with the de-scope rationale as the recap.
- **Declared scope:** fill the note's **Declared scope** line — YAML `touches:` with the paths this task expects to edit, or `N/A — no file deliverable`. Reconciled in the Recap against `git diff --name-only`; a recorded fact, never a gate (SPEC §"Tasknote frontmatter").
- **Archive skim recipe:** `ls .flaitron/tasknote/archive/<area>/`, then `grep -l <path> .flaitron/tasknote/archive/<area>/*.md` for source paths in scope (prefer YAML `touches:` when set). Read hits; also open IDs named by Related / `supersedes` / ⚠️ pointers — still grep + read, no query engine; log load-bearing findings inline. Empty or absent `archive/<area>/` → re-check `<area>` against the README table before believing it (a derived-and-wrong folder reads exactly like an empty one); once confirmed, `no prior tasknotes` and move on.

Then **do the work**: extend an established pattern or justify a new one; refactor only when Acceptance requires it or the touched path would otherwise introduce duplication, obscure responsibility, or violate a dependency boundary. Record that reason and defer unrelated cleanup. Run targeted tests + lint/type-check on changed files, then record the **Verification receipt** inline — each command as `command → exit code` with the first failure line when non-zero — and confirm alongside it the canonical structural quality assertions for changed code (otherwise `N/A` with reason). Micro-tasknotes have no Testing Notes section; the receipt goes in the **Implementation** bold-prefix. Update **Implementation** bold-prefix as you go (what changed, key decisions). At closure-readiness fill **Docs touched:** per `.flaitron/tasknote/README.md` §"AI-referenced docs" (the micro-tasknote equivalent of `/ft-task`'s Phase 4 doc-drift sweep): "no change" or the specific update.

If a hard dependency surfaces, abandon the micro-tasknote and re-file as `/ft-task` (or a `/ft-file-followup --starter` starter) — micro-tasks are not designed to park. Surface and ask.

## Step 4 — Recap and close

The single closure step. Per SPEC §"Paper-complete guard", flip PLAN/archive only when deliverables are ready for the same atomic commit; flip **only this task's** line (no collateral Completed flips). In one motion:

1. **Fill ✅ Recap** — evidence-based final summary: changed paths/LOC where meaningful, verification results, refactors made or deferred with rationale, documentation verdict, and maintainability effect.
2. **Flip YAML `status:`** — `in-progress` → `completed` — a lifecycle write, not a retroactive edit (SPEC §"Tasknote frontmatter" → "Write-once does not cover lifecycle writes"); set `Archived:` to today's date (`YYYY-MM-DD`).
3. **Update PLAN.md** — flip the line to the stub form (see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear). For a standalone task, move the row to the top of `## Completed`; for an epic child, preserve its 2-space nesting beneath the active parent until `/ft-close-epic` moves the whole cohort.
4. **Verify, then move** — before the `mv`, run `grep -q '^status: completed$' .flaitron/tasknote/<TASK-ID>.md`; a failing result means step 2's status flip is still outstanding — fix it and re-run rather than moving (the Acceptance-box half of `/ft-task`'s same check is vacuous here — micro-tasknotes carry no `## ✅ Acceptance` section). Same idiom as `/ft-release` §7.1 Pair P and `/ft-task`'s pre-move gate; applies identically under `--fast`/`--unattended`. Then `mv .flaitron/tasknote/<TASK-ID>.md .flaitron/tasknote/archive/<area>/<TASK-ID>.md`.
5. **Recap to the user** per SPEC §"🚀 Phase 4: Closure" — brief summary + optional verification request. **Recap is recap-only**; the next-task suggestion belongs in Step 5, not the recap. Wait for confirmation.

Do not treat archive/Completed as done until Step 5's commit lands with deliverables.

## Step 5 — Post-closure protocol

**Read `<SPEC_DIR>/post-closure.md` now** — the protocol is a lazy module, loaded here and nowhere earlier — then run it under SPEC §"Paper-complete guard", branching on SPEC/gates.md §"Conditional skip rule". `/ft-micro-task` carries no 📦 banner — its commit-go is the emphasized 🟢 GO ask (the module's "ft-micro-task carve-out") — but the same rule applies. Stage deliverables + PLAN + archive together; 🏁 only after a real deliverable-covering SHA (`git show --name-only`); never invent a SHA.

- **Skip branch** (signals clear) — run that section's **autonomous-commit motion** end to end, naming the cleared signal in its marker (e.g., `single-file doc patch; no privileged-ops surface`). Micro-tasknotes hit this branch often by design — their threshold aligns with the rule's clean-diff target.
- **Fire branch** (privileged-ops signal hits) — its **bundled-approval motion**, with the emphasized 🟢 GO ask in place of the 📦 banner. Surface it and wait:

  ```markdown
  🟢 **GO** — Ready to commit? Reply `commit` / `go` / `yes`.
  ```

  After commit + deliverable-covering check, same continuous flow as the skip branch's post-commit tail.

**`--fast` override.** Canonical in SPEC/gates.md §"Conditional skip rule" → Flag overrides and SPEC/gate-postures.md §"`--fast` operator override": `--fast` forces Skip regardless of signal trips (naming the suppressed signals in the marker). The paper-complete guard is not suppressed.

Skill-specific:
- **Commit message:** `feat: <TASK-ID> — <title>` (or `fix:` / `docs:` / `chore:`). Scaffold + closure typically bundle into one commit alongside the code/doc change.
- **Suggest next move:** run `SPEC/post-closure.md` step 2 as written — the **fresh PLAN.md re-read** (never the Step 1 cached parse), the unchecked-and-open-section verification that drops failing candidates, the **PLAN exhausted (terminal)** form when none survives, the emoji-primary-label print, and the 🔍 prefix on `/ft-audit*` candidates. On the terminal form, skip the copy-paste line below.
- **Copy-paste helper:** run `SPEC/post-closure.md` step 3 as written — the glyph copied from the chosen candidate line, the own-line inline-code invocation with no trailing punctuation, and the 👇 `Run in this session:` exception for context-dependent skills. Here the invocation line is `` `/<next-skill> <ID>` ``.

## Notes

- **Routing:** see SPEC/tasknote-selection.md §"When to use a tasknote (and when not to)" micro carve-out. `/ft-micro-task`'s niche: above the skip threshold, single-file, no design tradeoffs. Multi-file / design tradeoffs → `/ft-task` (the 4-phase ceremony pays for itself). Filing-only mid-flow → `/ft-file-followup` (`--starter` for rich context). If unsure, default to `/ft-task`.
- **Sub-tasks of an epic** (`<AREA>-<NUMBER>.<SUB>`) follow the same flow. The parent epic line is not flipped to complete until all children are. Full lifecycle in `<SPEC_DIR>/epic.md`.
