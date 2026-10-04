---
title: debug-mode-fold
status: completed
tags: []
created: 2026-08-02
related-tasks: [CORE-388, CORE-392, CORE-391, CORE-EPIC-195]
---

# CORE-390 | debug-mode-fold

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-388]] [[CORE-392]] [[CORE-391]] [[CORE-EPIC-195]]

## 🎯 Goal

Retire `/ft-debug` as a standalone skill and fold its entire delta — four Phase-1 hypothesis prompts plus the Phase-3 minimal-repro re-verify obligation — into `/ft-task` behind a `--debug` flag backed by a lazy SKILL fragment.

## ✅ Acceptance

- [x] `claude/skills/ft-task/step-4-debug-mode.md` fragment created, carrying the four Phase-1 prompts + the Phase-3 re-verify obligation, loaded only when `--debug` is present
- [x] `/ft-task` Step 0 arg grammar accepts `--debug` and `-d`, composing freely with `--fast` in either order; unknown-arg branch still fires for anything else
- [x] `/ft-task` Step 4 (Phase 1) and Step 5 (Phase 3) dispatch to the fragment when `debug-mode = true`
- [x] `/ft-task` frontmatter `description:` extended so bug/regression phrasing still routes here (CORE-388's named cost of the fold)
- [x] Three ft-debug paths deleted: `claude/skills/ft-debug/`, `claude/commands/ft-debug.md`, `codex/skills/ft-debug/`
- [x] Every live `ft-debug` reference resolved across the ~14 referencing files (roster, snippets, SPEC, selection doc, gates, CAPABILITIES, PLATFORMS, MIGRATION, ft-goal-task ×4, ft-new-project ×5, ft-release gate lists, AGENTS.md, README.md) — final count 19 files
- [x] Adopter-facing bump note written for the dangling `.claude/{commands,skills}/ft-debug` symlinks (first retirement of a symlinked adopter-subset skill) — `docs/MIGRATION.md` §"Retired skills leave dangling symlinks", with a `find` detection command and a retired-skills table
- [x] `ft-release`'s three exact-set `diff` gates pass with `ft-debug` removed from the expected adopter subset — plus the three forbidden-install gates
- [x] `git status --porcelain` shows only intended paths — no collateral edits into [[CORE-391]]'s sidequest surfaces

## 🧩 Subtasks

- [x] Resolve the deprecation-shim question with the operator
- [x] Write the `step-4-debug-mode.md` fragment (port ft-debug Steps 4 + 6 verbatim where possible)
- [x] Extend `/ft-task` Step 0 arg parsing to a flag set; add `debug-mode` to the flag semantics paragraph
- [x] Add the Step 4 + Step 5 dispatch lines
- [x] Extend `/ft-task` frontmatter description + `claude/commands/ft-task.md` usage block
- [x] Delete the 3 ft-debug paths
- [x] Sweep references across the ~14 files
- [x] Write the adopter bump note in `docs/MIGRATION.md`
- [x] Verify: ft-release gates, repo-wide grep, roster count 20→19
- [x] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-388]] — verdict source: row 3 `ft-debug` → **MERGE** → `/ft-task --debug`
- [[CORE-392]] — immediate predecessor; the same fold cohort's first landing (roster 21→20)
- [[CORE-391]] — sibling fold still open (`/ft-sidequest` → `/ft-file-followup --park`)
- [[CORE-EPIC-195]] — the epic that built `/ft-debug` in the first place; its tone contract and design rationale are the thing being ported, not discarded

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Second of CORE-388's three remaining folds, directly after [[CORE-392]] landed. The verdict's premise still holds on inspection: `/ft-debug` is 149 lines of which ~100 restate `/ft-task` by reference ("identical to /ft-task" appears across 7 section headers), leaving a delta of four Phase-1 prompts + one Phase-3 rule that ports cleanly to a fragment.

- [x] Read relevant source files

- [x] **Best Practices Review** — the fold *reduces* duplication rather than introducing an abstraction: `/ft-debug`'s seven "identical to /ft-task" sections are a literal restatement of a sibling's contract, which is the duplication the lazy-fragment pattern already exists to avoid. Dependency direction is preserved — the fragment is loaded *by* `/ft-task`, never the reverse, matching `step-1.5-model-edge.md` / `step-3a` / `step-3c`. One responsibility boundary to respect: the fragment owns debug *content* only; all gate/scaffold/closure mechanics stay in the core SKILL, so `--debug` cannot fork the lifecycle.

- [x] **Archive skim** — `[[CORE-EPIC-195]]` built `/ft-debug` (2026-05-29); its design notes are load-bearing here. Three constraints to carry forward intact: (1) the **soft tone contract** — "this prompt helps surface hidden assumptions", never "Iron Law of Debugging"; (2) **no new operator-gate cues** — hypothesis tracking adds no banners; (3) the four prompts are **guidance, not a gate** — skippable, shorthand-able. `[[CORE-042.5]]` is the load-bearing precedent the fold must not violate: it rejected *auto-routing* by size/type ("user picks the entry point at invocation time") — an explicit flag preserves that, an inferred debug mode would not. `[[CORE-389.3]]` supplies the retirement mechanics, but **its precedent does not fully transfer** (see drift check).

- [x] **Drift check** — the PLAN line's technical claims all verify: `/ft-debug`'s delta really is four Phase-1 prompts (Step 4) + one Phase-3 re-verify rule (Step 6); the lazy-fragment pattern really does exist in `claude/skills/ft-task/` (3 fragments). One material difference from the [[CORE-389.3]] / [[CORE-392]] retirements the task line does not anticipate: **`ft-debug` is in the 13-skill adopter symlink subset**, whereas the audit family was fork-only and `ft-quality` was global-install-only. This is the first retirement of a skill that adopters have `.claude/` symlinks pointing at, so deleting it dangles a symlink in every adopter repo on bump — and `/ft-update` currently only *adds* symlinks for newly shipped skills, it never prunes retired ones. Surfaced to the operator below rather than silently choosing.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked one question — how to handle the first retirement of an adopter-symlinked skill. **Answer: hard-delete + bump note**, mirroring the §1.2.1 audit-fork precedent; declined both the `/ft-update` prune-logic expansion and the deprecation shim. Explicit assumptions carried into Phase 2: (1) roster lands at exactly 19, per CORE-388's arithmetic; (2) adopters see a dead `/ft-debug` until they run the documented `rm` — acceptable and documented, not silent; (3) the `/ft-update`-never-prunes gap stays open and gets offered as a follow-up at closure rather than absorbed here; (4) `--debug` is explicit-only — no inference from task text, per [[CORE-042.5]].

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**CORE-388's verdict (row 3, verbatim):** `ft-debug` → **MERGE** → `/ft-task --debug` — "Zero mechanical delta: four Phase-1 prompts + one Phase-3 re-verify obligation, portable as a lazy SKILL fragment (pattern exists: `step-1.5-model-edge.md`). CORE-042.5 rejected *auto-routing*, not flags — a flag preserves 'user picks the entry point.' Cost: weaker NL dispatch ('debug this bug' → separate skill matches better); judged worth one roster slot + one fewer skeleton restatement to drift."

The named cost is the one thing the fold must actively mitigate: today "debug this bug" matches `ft-debug`'s dedicated frontmatter description. After the fold, `/ft-task`'s own `description:` has to carry that phrasing or dispatch silently regresses. Treating this as in-scope, not optional.

**The delta being ported (all of it):**

| Source | Content |
|---|---|
| `ft-debug` Step 4 | Four Phase-1 prompts: expected-vs-observed · hypotheses (generate & rank, 2–5, confidence + falsifier) · minimal repro design (<2 min, isolates the variable) · run repro & update beliefs |
| `ft-debug` Step 6 | Phase-3 obligation: re-run the *exact* minimal repro after the fix; record outcome in Testing Notes; still-failing → back to Phase 2 with updated hypotheses, not victory. Runs **even under `--fast`** |
| `ft-debug` Step 5 | Phase-2 emphasis: target the top surviving hypothesis; state "Addresses hypothesis #N" in Implementation Notes |

Everything else in the file is a restatement of `/ft-task` and dies with it.

**Live reference inventory (~14 files outside `archive/`):** roster + wiring (`claude/skills/ft-flowtron`, `claude/skills/ft-new-project` ×5, `claude/skills/ft-release` ×4 gate lists, `claude/AGENTS-snippet.md` ×3, `codex/AGENTS-snippet.md`); contract (`SPEC.md`, `SPEC/gates.md`, `SPEC/model.md`, `SPEC/tasknote-selection.md` — carries a full "Run a debug tasknote" block, `docs/AGENT-NEUTRALITY.md`); docs (`docs/MIGRATION.md` ×5, `docs/PLATFORMS.md` ×4, `claude/CAPABILITIES.md`, `README.md`, `AGENTS.md`); and sibling cross-refs (`claude/skills/ft-goal-task/SKILL.md` ×4, `claude/commands/ft-goal-task.md`), which define `/ft-goal-task` partly *by contrast with* `/ft-debug` and need rewording rather than deletion.

**Roster arithmetic:** 20 after [[CORE-392]] → **19** here → 18 once [[CORE-391]] lands, hitting CORE-388's target.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the fragment follows `step-1.5-model-edge.md`'s shape exactly: an H1 naming the step, a `> Lazy-loaded SKILL fragment. Loaded by …` prose line declaring its trigger, then executable sections. Dispatch follows the same shape too — the core SKILL names the condition and the path, the fragment holds the content. No new shape invented. Retirement mechanics reuse [[CORE-389.3]] / [[CORE-392]]: `git rm`, then sync every enumeration surface.

- [x] **Minimal refactor gate** — no refactor. Two corrections beyond the literal Acceptance list, both in files this task already edits and both directly caused by the fold: (1) `docs/PLATFORMS.md`'s lazy-fragment parenthetical now names `step-4-debug-mode.md`, since the fold adds the first fragment that isn't a `step-N` of the core dispatch; (2) `docs/MIGRATION.md:221`'s global-glob sentence listed `ft-debug` **and** a bare `quality` — the latter a leftover [[CORE-392]] missed because its grep matched `ft-quality`, not the bare word. Fixed in passing rather than left for an audit to find.

- [x] Implemented the minimal solution — 1 new fragment (67 lines) + 5 edits to `/ft-task`'s SKILL + command, 3 deletions, 19 reference edits

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown-only; no test-bearing code (`viz/`, `tools/`) touched

**Implementation Notes:**

**The fragment.** `claude/skills/ft-task/step-4-debug-mode.md` (67 lines vs. the deleted skill's 149) carries the complete delta: the four Phase 1 prompts verbatim, the Phase 2 hypothesis-targeting emphasis, the Phase 3 repro re-verify, and a one-line Phase 4 recap addition. Three [[CORE-EPIC-195]] design constraints ported intact and stated explicitly in the fragment: the soft tone contract, "guidance, not a gate", and "no new operator-gate cues". The ~82-line reduction is entirely the deleted skill's seven "identical to `/ft-task`" restatement sections.

**Arg grammar.** Step 0 moves from a single-optional-token branch to an **unordered flag set** — `fast-mode` and `debug-mode` initialized false, tokens walked independently, unrecognized tokens still routed to the existing AskUserQuestion. This is the change that lets `--debug --fast` work in either order. Each active flag emits its own inline marker (`⚡` for fast, `🔬` for debug); `🔬` is a *state marker*, not a new operator cue — it requires no response and adds no banner, matching how `⚡` already behaves.

**Dispatch points.** Step 4 (Phase 1) runs the four prompts after the Relevance Assessment; Step 5 (Phase 3) runs the repro re-verify. The Step 0 flag paragraph carries the Read instruction, so the fragment loads once at parse time rather than twice mid-flow.

**NL-dispatch mitigation.** `/ft-task`'s frontmatter `description:` now names bugs, regressions, flaky behavior, and unknown root causes, plus the `--debug` arg shape. This directly addresses the cost CORE-388 flagged; the live skill listing confirmed the new description took effect mid-session.

**One forward-looking claim:** the retired-skills table in `docs/MIGRATION.md` records `ft-debug` and `ft-quality` as retired in **v5.15.0**. Current SPEC version is v5.14.1 and both folds are `feat:` commits, so `/ft-release`'s bump computation yields v5.15.0 deterministically — but if the next cut lands as something else, that table is the one place needing a correction, and `/ft-release`'s doc-drift sweep covers `docs/MIGRATION.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, markdown-only skill/doc changes; no `viz/` or `tools/` code touched

- [x] Ran lint/type-check on changed code — `N/A`, same reason

- [x] **Quality assertions** — verified against the actual diff: four independent counts agree at **19** (`claude/commands/*.md`, `claude/skills/*/`, `codex/skills/*/`, `ft-flowtron` roster rows), matching the three `docs/PLATFORMS.md` literals; repo-wide `grep -rn ft-debug` outside `archive/` returns only this task's own PLAN line, tasknote, and the intentional MIGRATION retired-skills row; the fragment is reachable from exactly one dispatch path and duplicates no content left in the core SKILL. No dead cross-references: every `/ft-goal-task` mention that defined itself *by contrast with* `/ft-debug` was reworded, not deleted, so the sibling's positioning survives the fold.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

**Testing Notes:**

`ft-release`'s six release gates were dry-run rather than inspected, since this task edits the expected-set literals in all three `diff` gates: the three exact-set `diff` gates PASS (adopter subset now 12 slugs, `ft-debug` removed) and the three forbidden-install `grep` gates PASS (no output). A first run appeared to fail — that was zsh not word-splitting an unquoted variable in the harness, not a gate failure; re-run under `bash` with correct splitting, all six pass.

Not machine-verifiable and therefore stated as a limitation: whether `--debug` *dispatches* correctly in a live run. The wiring is verified structurally (flag parsed, fragment path correct and present, both dispatch points reference it), and the skill-listing refresh confirmed the new frontmatter description loaded — but the first real `/ft-task <ID> --debug` invocation is the actual proof.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — **updated** (skill enumeration)
  - `SPEC.md` — **updated** (§"Skill namespace", 19 slugs)
  - `docs/MIGRATION.md` — **updated** (adopter subset ten→nine, wiring block, smoke list, glob sentence, and the new §"Retired skills leave dangling symlinks")
  - `claude/AGENTS-snippet.md` — **updated** (paste-block debug bullet rewritten to `--debug`; two symlink lines removed)
  - `codex/AGENTS-snippet.md` — **updated** (symlink line removed)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated** (skill-name ledger row)
  - `docs/PLATFORMS.md` — **updated** (surface table, installed-surface policy, `commands/` enumeration, three counts 20→19, new `--debug` flag row)
  - `claude/CAPABILITIES.md` — **updated** (`--fast` row scope corrected; new `--debug` row)
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed` (standalone task), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Folded `/ft-debug` into `/ft-task --debug`, replacing a 149-line standalone skill with a 67-line lazy fragment. The retired skill was ~two-thirds restatement — seven sections that said "identical to `/ft-task`" — so the entire real delta (four hypothesis-first Phase 1 prompts, a Phase 2 targeting emphasis, and the Phase 3 repro re-verify) ports to a fragment the flag loads on demand, while the mode itself gains nothing it shouldn't: no new phase, template, banner, or gate.

**Changed** — 2 new files, 3 deletions, 19 modified, markdown only:
- New: `claude/skills/ft-task/step-4-debug-mode.md` (67 lines) + this tasknote
- Deleted: `claude/skills/ft-debug/SKILL.md` (149 lines), `claude/commands/ft-debug.md`, `codex/skills/ft-debug/SKILL.md`
- `/ft-task` SKILL: frontmatter description, Step 0 arg grammar (single-token → unordered flag set), SKILL_DIR fragment list, Step 4 + Step 5 dispatch
- `claude/commands/ft-task.md`: `argument-hint`, description, usage block
- 17 further reference edits across roster, snippets, SPEC + 3 SPEC modules, CAPABILITIES, PLATFORMS, MIGRATION, AGENT-NEUTRALITY, README, AGENTS.md, and `/ft-goal-task` ×6

**Verification:** all six `ft-release` gates dry-run and passing (three exact-set `diff`, three forbidden-install `grep`) — run rather than inspected, since this task edits the expected-set literals inside them; four independent skill counts agree at 19 and match the three `docs/PLATFORMS.md` literals; repo-wide grep leaves no unintended `ft-debug` reference. Stated limitation: live `--debug` dispatch is verified structurally, not by invocation — the first real `/ft-task <ID> --debug` run is the actual proof.

**Refactors:** none. Two in-passing corrections in files already being edited, both caused by this fold — the PLATFORMS lazy-fragment parenthetical, and a bare `quality` leftover at `docs/MIGRATION.md:221` that [[CORE-392]]'s grep missed because it matched `ft-quality` rather than the bare word.

**Documentation verdict:** nine of twelve AI-referenced docs updated; three verified unaffected. The adopter-facing addition is `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" — a `find` one-liner to detect dead symlinks plus a table of what has been retired and what replaced it, covering this fold, [[CORE-392]], and retroactively the [[CORE-389.3]] audit family.

**Maintainability effect:** roster 20 → 19, one step from CORE-388's target of 18. More significantly, the fold removes a *skeleton restatement* — the deleted skill duplicated `/ft-task`'s scaffold, model gate, gates, blocked handling, and closure contract in prose, meaning every lifecycle change had two places to drift. The fragment cannot drift that way: it holds content only, and the mechanics have exactly one home.

**Follow-up surfaced (not actioned):** `/ft-update` wires symlinks for newly shipped skills but never prunes retired ones, so every skill retirement leaves adopters manual cleanup. Documented as a manual step here; the durable fix is a prune step in `/ft-update`. Offered at closure.

**Archived:** 2026-08-02
