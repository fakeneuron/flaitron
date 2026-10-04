---
title: ft-goal-task-skill
status: completed
tags: []
created: 2026-07-02
related-tasks: [CORE-EPIC-330, CORE-330.1, CORE-330.2, CORE-330.3]
---

# CORE-330.4 | ft-goal-task-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-330]] [[CORE-330.1]] [[CORE-330.2]] [[CORE-330.3]]

## 🎯 Goal

Ship `/ft-goal-task` — a goal-loop tasknote runner (sibling of `/ft-debug`): Phase 1 additionally requires a verify command per Acceptance criterion (taste criteria split to a one-time 👁️ ask); Phase 2↔3 iterate as the loop body under the `SPEC/loop.md` budget + per-cycle relevance gate; Phase 4 unchanged; `--worktree` pairs with `/ft-worktree-start`.

## ✅ Acceptance

- [ ] `claude/skills/ft-goal-task/SKILL.md` exists as a sibling-of-`/ft-debug` goal-loop runner: Step 0 (paths + `--fast`/`--worktree` parse), Steps 1/1.5/2/3a-c delegate to `/ft-task` mechanics, goal-loop cadence inside Phase 1 + the Phase 2↔3 loop body, Phase 4 unchanged
- [ ] Phase 1 **verify-command rule** encoded: every `## ✅ Acceptance` criterion must carry a machine-checkable verify command; unverifiable "taste" criteria split to a one-time 👁️ ask *outside* the loop
- [ ] **Loop body (Phase 2↔3, inline)** encoded per `SPEC/loop.md`: per-cycle relevance gate → execute → run verify commands → commit-per-verified-iteration → append `## 🔁 Iterations` line; terminate on Acceptance-met / `loop-max` / relevance-stop; destructive action → park via `status: blocked` (not banner-into-void)
- [ ] Scaffold sets the three additive loop frontmatter keys (`loop: true` / `loop-max: <N>` / `loop-last-run:`) and injects the `## 🔁 Iterations` section between Phase 3 and Phase 4
- [ ] `--worktree` flag: after Phase 1 Discovery, hands off to `/ft-worktree-start <ID>` (fresh-session isolation); operator re-runs `/ft-goal-task <ID>` inside the worktree to drive the loop
- [ ] Gate collapse honored: loop runs with `--fast` semantics (👁️ suppressed inside the loop; 📦 → commit-per-verified-iteration); the one-time 🛠️ Phase 1→2 gate is a pre-loop event per the skill's flavor
- [ ] `claude/commands/ft-goal-task.md` command stub exists, mirroring `ft-debug.md` (frontmatter `description` + `argument-hint`, usage block, sibling-skill cross-refs), documenting `--fast` + `--worktree`
- [ ] Verify: markdown mental-pass + cross-ref check (cited `SPEC/loop.md` / `SPEC/gates.md` / sibling-skill anchors resolve at HEAD); scope stays skill+stub (wiring deferred to `.5`)

## 🧩 Subtasks

- [ ] Draft `claude/skills/ft-goal-task/SKILL.md` — Step 0 (paths + `--fast`/`--worktree` parse), Steps 1/1.5/2/3a-c (delegate to `/ft-task`; note loop-frontmatter + Iterations-section additions at scaffold), Step 4 Phase 1 (verify-command-per-criterion rule + taste→👁️ split), Step 5 the inline Phase 2↔3 loop body, Step 6 Phase 4 + post-closure (unchanged), Notes block
- [ ] Draft `claude/commands/ft-goal-task.md` command stub (mirror `ft-debug.md`)
- [ ] Phase 3: markdown mental-pass + cross-ref/anchor check against `SPEC/loop.md`, `SPEC/gates.md`, sibling skills
- [ ] Phase 4: doc-drift sweep (expect all no-change; wiring is `.5`) + flip PLAN line + archive

## 🔗 Related

- [[CORE-EPIC-330]] — parent epic (loop-integration)
- [[CORE-330.1]] — discovery; scoped this child (verify-per-criterion gate, Phase 2↔3 loop body, --worktree pairing)
- [[CORE-330.2]] — shipped `SPEC/loop.md`, the loop-task contract this skill drives
- [[CORE-330.3]] — heartbeat template (the *other* loop shape); this skill drives the *goal* loop

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Fourth child of [[CORE-EPIC-330]]; scoped in [[CORE-330.1]] and consumes the contract [[CORE-330.2]] shipped in `SPEC/loop.md`. `/ft-goal-task` drives the *goal* loop (the heartbeat is the other shape, templated in [[CORE-330.3]]). Relevant and unblocked — only `.5` (wiring) and `.6` (audit) remain after this.

- [x] Read relevant source files — `SPEC/loop.md` (the contract this skill drives: gate collapse, per-cycle relevance gate, `loop-max`, `## 🔁 Iterations` log, three additive frontmatter keys), `SPEC.md` (§"Loop tasks" pointer, §"Post-closure protocol", §"Operator-cue glossary"), `SPEC/gates.md` refs (`--fast` override, conditional skip, destructive escalation — via loop.md), `SPEC/epic.md`, `SPEC/tasknote-selection.md` (positioning bullets), `claude/skills/ft-debug/SKILL.md` + `claude/commands/ft-debug.md` (the sibling shape), `claude/commands/ft-task.md`, `claude/skills/ft-worktree-start/SKILL.md` (the `--worktree` pairing), `templates/loop-heartbeat-template.md` (the other loop shape), `templates/tasknote-template.md`, `.flowtron/tasknote/README.md` (AI-referenced ledger).

- [x] **Archive skim** — [[CORE-330.1]] archive read in full: `.4` scoped as "sibling of `/ft-debug`; Phase 1 additionally requires every Acceptance criterion to carry a verify command (unverifiable taste criteria split out to a 👁️ ask); Phase 2↔3 becomes the loop body; Phase 4 unchanged; `--worktree` pairs with `/ft-worktree-start`." [[CORE-330.2]] archive: shipped `SPEC/loop.md` — gate collapse (loop ⇒ `--fast`; 📦 → commit-per-verified-iteration; destructive → park), per-cycle relevance gate, `loop-max`, `🔁 Iterations`, three frontmatter keys (no `loop-interval`). [[CORE-330.3]] archive: heartbeat template (the *other* loop shape) — confirms `/ft-goal-task` owns the goal loop, template owns the heartbeat. `/ft-debug` (CORE-EPIC-195) established the "specialized driver, not a fork; 90% identical to /ft-task; additions live in Phase 1/3 cadence, no new template, no new gate banners" precedent this skill mirrors. No other archive tasknote touches goal-loop content.

- [x] **Drift check** — verified at HEAD: `SPEC/loop.md` exists with all five mechanisms; `/ft-debug` SKILL is single-file (no fragments) + its command stub carries `description`/`argument-hint`; `/ft-worktree-start` hands off to a **fresh session** ("do not carry the old window") + requires a pre-existing tasknote; `## 🔁 Iterations` log + `loop:`/`loop-max:`/`loop-last-run:` keys defined in `SPEC/loop.md`; `.claude/` is gitignored in flowtron-self (per CORE-253) so the deliverable is the committed `claude/skills/` + `claude/commands/` sources (`.5` wires symlinks). No drift.

- [x] Asked clarifying questions — three design forks surfaced via AskUserQuestion; see Resolved scoping. All resolved to the [[CORE-330.1]]-scoped defaults → no approach change.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Shape = specialized driver, not a fork (per `/ft-debug`).** ~90% of the flow is identical to `/ft-task` (Step 0 paths, Step 1 locate, Step 1.5 model gate, Step 2 pre-flight/file-state branch, 3a/3b/3c, Phase 4 closure, post-closure protocol). The goal-loop additions are localized: (a) Phase 1 verify-command-per-criterion rule; (b) the Phase 2↔3 **loop body**; (c) three additive frontmatter keys + a `## 🔁 Iterations` section at scaffold; (d) the `--worktree` flag. No custom template (reuses `templates/tasknote-template.md`), no replacement phases.
- **Verify-command rule (the signature Phase 1 addition).** Every `## ✅ Acceptance` criterion must carry a machine-checkable **verify command** (a shell/test invocation whose exit status is the pass/fail signal) — this is what makes the loop terminable. Criteria only judgeable by eye (taste/visual) are **not loop-verifiable** → split them to a **one-time 👁️ ask that runs once, after convergence, outside the loop**. Analogous to `/ft-debug`'s minimal-repro requirement, but forward-looking (define the check before looping) rather than diagnostic.
- **Loop body = inline, self-paced (operator-confirmed).** After Phase 1 runs once, Phase 2↔3 iterate inline in one session: **per-cycle relevance gate** ("is another iteration still right?") → execute the minimal change → run the Acceptance verify commands → on pass, **commit-per-verified-iteration** + append a `## 🔁 Iterations` line; on fail, log + retry (no commit). Terminate cleanly on Acceptance-met, `loop-max` (soft stop → hand back), or relevance-stop. A destructive/irreversible step needed mid-loop **parks via `status: blocked`** rather than firing a banner into an unattended drive (`SPEC/loop.md` destructive carve-out). The operator MAY wrap the whole thing in `/loop` for cross-session babysitting, but the skill owns the inline drive — flowtron ships no runner (the inline iteration is the assistant executing the contract, not a scheduler).
- **Gate collapse (`SPEC/loop.md` §"Gate collapse").** The loop is autonomous ⇒ inherits `--fast` semantics: the 👁️ visual ask is suppressed *inside* the loop (taste criteria already split to the one-time pre/post 👁️ ask); the 📦 ready-to-commit gate collapses to commit-per-verified-iteration. The 🛠️ Phase 1→2 gate stays a **one-time pre-loop event** per the skill's exit-gate flavor (Discovery runs once before the loop). Explicit `--fast` is redundant with the loop's own collapse but accepted for parity.
- **`--worktree` (operator-confirmed).** Because `/ft-worktree-start` requires a pre-existing tasknote and hands to a fresh session, `--worktree` runs **Phase 1 Discovery only** (scaffold + scope the tasknote), then hands off to `/ft-worktree-start <ID>`. The operator moves into the worktree and re-runs `/ft-goal-task <ID>` (no flag) there to drive the loop in isolation (blast-radius control per `SPEC/loop.md`'s reuse table). The skill never creates the worktree in place.
- **`loop-max` default.** Scaffold prompts for / defaults the ceiling (default **10**) so a goal loop always carries a runaway backstop; the operator can override in Phase 1.
- **Scope (operator-confirmed).** Deliverable = `claude/skills/ft-goal-task/SKILL.md` + `claude/commands/ft-goal-task.md` only, mirroring `/ft-debug`'s single-file shape (no private fragments in v1). All wiring (symlink set, MIGRATION/AGENTS-snippet counts, `ft-update`, GLOSSARY, README + `ft-flowtron` rosters) is **`.5`'s** scope per the `.1` split.

**Resolved scoping:**

| Question | Resolution |
|---|---|
| Loop drive model | **Inline, self-paced** within one session (execute→verify cycles until Acceptance/`loop-max`/relevance-stop); operator MAY wrap with `/loop` for cross-session babysitting |
| `--worktree` mechanics | **Discovery, then hand off** to `/ft-worktree-start <ID>`; operator re-runs `/ft-goal-task <ID>` (no flag) inside the worktree |
| Deliverable scope | **Skill + command stub only**; all wiring/GLOSSARY/roster deferred to `.5` |

**Exit gate:** Discovery surfaced no significant deviation → skip 🛠️. All three clarifying questions resolved to the [[CORE-330.1]]-scoped defaults; no approach change, no subtask restructure. Downstream-impact scan: no PLAN edits (this task ships skill sources only; the active PLAN cohort is the epic's own children, unaffected).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `claude/skills/ft-debug/SKILL.md` is the exact shape template (specialized-driver-not-a-fork; Step 0 flag parse → Steps 1/1.5/2/3a-c "identical to /ft-task" delegations → skill-specific Phase 1/3 cadence → identical closure → Notes). `claude/commands/ft-debug.md` sets the command-stub shape (`description` + `argument-hint` frontmatter, usage block, sibling cross-refs). Extended both; cite-don't-restate the `/ft-task` + `SPEC/loop.md` contracts rather than duplicating them (per the flowtron house convention). No new shape invented.

- [x] Implemented the minimal solution — two new files:
  - `claude/skills/ft-goal-task/SKILL.md` — Step 0 (paths + `--fast`/`--worktree` parse), Steps 1/1.5/2 (delegate to `/ft-task`), Step 3a-c with a **3b scaffold addendum** (three additive loop frontmatter keys + injected `## 🔁 Iterations` section + `loop-max` default 10), Step 4 Phase 1 (the **verify-command-per-criterion rule**, taste→`### 👁️ One-time visual checks` split, no-machine-criteria edge → use `/ft-task`, `--worktree` handoff to `/ft-worktree-start`), Step 5 the **inline Phase 2↔3 loop body** (per-cycle relevance → execute → verify → commit-per-verified-iteration → `🔁` log; `loop-max` soft stop; destructive → `status: blocked` park), Step 6 Phase 4 + post-closure (identical, one-time post-loop 👁️ + `--fast`-skip commit), Notes.
  - `claude/commands/ft-goal-task.md` — command stub mirroring `ft-debug.md` (frontmatter `description` + `argument-hint`, gate-collapse note, three usage forms, when-to-reach-for cross-refs).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill + command sources; no executable surface, nothing viz parses — viz parses neither `claude/` nor `SPEC/`).

**Implementation Notes:**

- One house-style correction mid-execution: an initial `[`SPEC/loop.md`](../../../SPEC/loop.md)` markdown link was switched to a bare inline-code `SPEC/loop.md` reference to match `/ft-debug`'s style and avoid a fragile relative path (these skills get symlinked into `.claude/` and adopters' `.flowtron/core/`, where the relative depth differs).
- Scope held to skill + stub; no wiring/roster/GLOSSARY touched (deferred to `.5` per the confirmed split).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; no code / PLAN / tasknote parse surface touched).

- [x] Ran lint/type-check on changed code — N/A markdown; ran a **cross-reference + anchor + hygiene check** instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

- **Anchor check:** all five `SPEC/loop.md` sections the SKILL cites exist at HEAD — §"Gate collapse" (L44), §"Per-cycle relevance gate" (L73), §"max-iterations budget" (L91), §"`## 🔁 Iterations` log" (L102), §"Frontmatter keys" (L122) ✓. The injected frontmatter keys (`loop:`/`loop-max:`/`loop-last-run:`) and the `🔁 Iterations` line format both match the contract verbatim ✓.
- **File-existence check:** every referenced path resolves — `SPEC/{loop,epic,starter,blocked,model,versioning,gates,tasknote-selection}.md`, `templates/tasknote-template.md`, `docs/WORKTREES.md`, `docs/MIGRATION.md`, `claude/skills/ft-task/step-1.5-model-edge.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-worktree-start/SKILL.md`, `claude/skills/ft-flowtron/SKILL.md`, `claude/AGENTS-snippet.md` ✓.
- **Hygiene:** no trailing whitespace / tabs in either new file ✓; YAML frontmatter `description` has no `: ` colon-space sequence that would break the scalar ✓ (matches `/ft-debug`'s unquoted long-description house style).
- **Markdown mental-pass:** nested code fences (```yaml + ```markdown-with-HTML-comment) balanced; `## 🔁 Iterations` example matches `SPEC/loop.md`; three usage forms + argument-hint consistent between SKILL Step 0 and the command stub ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 11 AI-referenced ledger entries. **Deferred to `.5`** (roster/wiring is `.5`'s explicit scope; operator confirmed skill+stub-only for `.4`): `README.md` (skill roster), `docs/MIGRATION.md` (§1.2 symlink counts), `claude/AGENTS-snippet.md` (Workflow-block listing). **`SPEC.md` — flagged for `.5`:** §"Skill namespace" bundled-`ft-`-skill list is now stale (missing `/ft-goal-task`); `.5`'s PLAN line names only a "README skill-roster touch-up", so it must be widened to also add the SPEC namespace entry (surfaced in the recap). **No change** (7): `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (autonomous-commit-per-iteration behavior was already threat-assessed in `.2`'s `SPEC/loop.md`; this skill only drives that contract — no new surface), `docs/AGENT-NEUTRALITY.md` (`.4` adds only `claude/` wiring-layer files, not a contract-layer Claude reference; `.2` already logged the `/loop` contract surface), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`.

- [x] Closed — PLAN.md `.4` line flipped to stub form `Completed 2026-07-02.` (kept nested under the open epic per cohort convention); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the conditional-skip marker).

**Final Summary:**

Shipped `/ft-goal-task` — a goal-loop tasknote runner, sibling of `/ft-debug`, driving the [[CORE-330.2]] `SPEC/loop.md` contract for the *goal* loop shape (the heartbeat shape is templated in [[CORE-330.3]]). Two new files: `claude/skills/ft-goal-task/SKILL.md` + `claude/commands/ft-goal-task.md`. Like `/ft-debug`, it is a specialized driver (~90% identical to `/ft-task`), with three localized additions: **(1)** a Phase 1 **verify-command-per-Acceptance-criterion rule** — every criterion carries a machine-checkable command whose exit status is its pass/fail signal (the union of all passing = the loop's termination condition); taste-only criteria split to a one-time `### 👁️ One-time visual checks` subsection run once after convergence, and an all-taste Acceptance routes to `/ft-task` instead. **(2)** the inline **Phase 2↔3 loop body** — per-cycle relevance gate → minimal execute → run verify commands → commit-per-verified-iteration + `## 🔁 Iterations` log line (fail → retry, no commit); terminate on Acceptance-met / `loop-max` soft-stop (default 10, hands back to operator) / relevance-stop; a destructive step parks via `status: blocked` rather than firing a banner into an unattended drive. **(3)** a scaffold addendum adding the three additive `loop:`/`loop-max:`/`loop-last-run:` frontmatter keys + the `## 🔁 Iterations` section. Gate collapse is honored (loop runs `--fast` by construction: 📦 → commit-per-iteration, 👁️ → one-time post-loop ask, 🛠️ → one-time pre-loop event). `--worktree` runs Phase 1 here then hands off to `/ft-worktree-start` for a fresh-session isolated loop. Verified: all five cited `SPEC/loop.md` anchors + every referenced file resolve at HEAD; no trailing whitespace; markdown/YAML clean. Markdown-only, no code. Scope held to skill + stub — all adopter wiring (symlink set, MIGRATION/AGENTS-snippet counts, `ft-update`, GLOSSARY, README + `ft-flowtron` rosters, **and the SPEC §"Skill namespace" entry**) is `.5`'s. Remaining epic children: `.5` (wiring + doc sync) then `.6` (audit).

**Archived:** 2026-07-02
