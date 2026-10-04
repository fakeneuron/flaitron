---
title: loop-contract
status: completed
tags: []
created: 2026-07-02
related-tasks: [CORE-EPIC-330, CORE-330.1, CORE-328.4]
---

# CORE-330.2 | loop-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-330]] [[CORE-330.1]] [[CORE-328.4]]

## 🎯 Goal

Ship `SPEC/loop.md` — the lazy module defining flowtron's loop-task contract (gate collapse, per-cycle relevance gate, max-iterations budget, 🔁 iterations log, additive frontmatter keys) — and redraw the README/VISION boundary so it reads: Claude Code's `/loop` is the runtime; flowtron ships the markdown contract the loop reports to.

## ✅ Acceptance

- [ ] `SPEC/loop.md` exists as a lazy module (frontmatter + `> Lazy-loaded` prose line + contract body), matching the shape of sibling modules (`blocked.md` / `gates.md`)
- [ ] Contract covers: gate collapse (loop implies `--fast` semantics; commit-per-verified-iteration; destructive 🗄️/▶️ does NOT collapse → park via `status: blocked`), per-cycle relevance gate, `max-iterations` budget, `## 🔁 Iterations` append-only log convention, and the three additive frontmatter keys (`loop:` / `loop-max:` / `loop-last-run:`; explicitly no `loop-interval`)
- [ ] README §"Sessions, loops, and sub-agents" redrawn: `/loop` runtime vs. flowtron contract boundary (no more "flowtron ships no loop runner… by design" as the last word)
- [ ] docs/VISION.md §"What we won't accept" reconciled with the new contract (still rejects a loop runner/scheduler/daemon; carves the markdown contract as in-scope)
- [ ] SPEC.md core anchors the module (§"Loop tasks" pointer, parallel to §"Blocked tasks")
- [ ] Doc-drift sweep across README §"AI-referenced docs" ledger

## 🧩 Subtasks

- [ ] Draft `SPEC/loop.md` contract body (5 mechanisms + reconciliation frame)
- [ ] Add SPEC.md §"Loop tasks" pointer section
- [ ] Redraw README §"Sessions, loops, and sub-agents" boundary
- [ ] Reconcile docs/VISION.md §"What we won't accept"
- [ ] Phase 3: markdown mental-pass + wikilink-integrity + cross-ref check
- [ ] Phase 4: doc-drift sweep + flip PLAN line + archive

## 🔗 Related

- [[CORE-EPIC-330]] — parent epic (loop-integration)
- [[CORE-330.1]] — discovery; scoped this child's mechanisms + reconciliation frame
- [[CORE-328.4]] — landed README §"Sessions, loops, and sub-agents" (descriptive-only stance this task reconciles)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scoped in [[CORE-330.1]] (closed same day) as the epic's contract child. Core design pre-resolved in that Discovery; this task drafts the module + redraws the boundary. Relevant and unblocked — the three sibling children (`.3`/`.4`/`.5`) consume this contract.

- [x] Read relevant source files — `SPEC.md` (§"Blocked tasks"/§"Post-closure protocol"/§"Operator-cue glossary"/§"What flowtron does NOT provide"), `SPEC/blocked.md` (park mechanism = loop hard-stop escape hatch + module shape reference), `SPEC/gates.md` (§"`--fast` operator override", §"Conditional skip rule", destructive-action escalation), `SPEC/epic.md`, `templates/tasknote-template.md`, README §"Sessions, loops, and sub-agents", `docs/VISION.md` §"What we won't accept", `.flowtron/tasknote/README.md` (AI-referenced ledger).

- [x] **Archive skim** — [[CORE-330.1]] archive read in full (scoped this child). [[CORE-328.4]] load-bearing: it landed README §"Sessions, loops, and sub-agents" with the descriptive-only "flowtron ships no loop runner, scheduler, or session tooling, by design" close — the exact line this task reconciles. No other archive tasknote touches loop content.

- [x] **Drift check** — All cited surfaces verified at HEAD: `--fast` three-surface contract (`SPEC/gates.md` §"`--fast` operator override"), destructive 🗄️/▶️ escalation is a bounded safety control not a standing gate (`SPEC/gates.md`), `status: blocked` mid-Phase-2 parking (`SPEC/blocked.md`), lazy-module frontmatter `paths:` convention (`SPEC.md` §"Lazy SPEC module frontmatter"). One nuance confirmed: README's "VISION §What we won't accept" pointer is README's *gloss* — VISION currently carries no loop bullet, so reconciling VISION means adding net-new doctrine, not editing an existing bullet.

- [x] Asked clarifying questions — two design decisions surfaced via AskUserQuestion (VISION footprint + SPEC.md anchoring); see Resolved scoping.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Contract shape (from [[CORE-330.1]]):** `SPEC/loop.md` is a status/content-triggered lazy module → `paths: []`. Loaded by `/ft-goal-task` (`.4`, not yet built) when a tasknote carries `loop: true`. Five mechanisms:
  1. **Gate collapse.** A loop is autonomous by construction, so it inherits `--fast` semantics: the 📦 ready-to-commit gate collapses to **commit-per-verified-iteration** (each iteration that passes its verify command commits autonomously; a failing iteration does not commit). The 🛠️ Phase 1→2 gate is a one-time pre-loop event (unchanged). **Carve-out:** the destructive 🗄️/▶️ escalation does NOT collapse — an autonomous loop cannot wait on a blocking banner, so a destructive/irreversible command **parks the tasknote via `status: blocked`** ([[CORE-330.1]]) rather than firing a banner into the void.
  2. **Per-cycle relevance gate.** Core Principle #4 ("Relevance before action") generalizes from once-per-task to once-per-iteration: before each cycle, "is another iteration still the right work?" A `no` terminates the loop cleanly (not a failure).
  3. **max-iterations budget.** Hard upper bound on cycles (`loop-max:`), independent of the per-cycle relevance gate — a backstop against runaway loops even if the relevance gate keeps saying yes.
  4. **`## 🔁 Iterations` log.** Append-only tasknote section, one line per cycle (verdict + verify result + commit sha). Replaces transcript re-reads as the loop's memory; the iteration count vs. `loop-max` is readable at a glance.
  5. **Additive frontmatter keys.** `loop: true|false`, `loop-max: <int>`, `loop-last-run: <YYYY-MM-DD>`. **Deliberately no `loop-interval`** — cadence belongs to the `/loop` invocation (the runtime), not the tasknote file (the contract). Additive per the write-once policy; legacy tasknotes ignore them.
- **Reconciliation frame (the boundary redraw):** flowtron answers *what* the AI does + how it stays scoped; Claude Code's `/loop` answers *when it runs + how long it keeps going*. The boundary: **`/loop` is the runtime (runner/scheduler/session tooling — stays out of flowtron); `SPEC/loop.md` is the contract the loop reports to (termination = Acceptance/relevance gate, blast-radius = `wt-<ID>`, hard-stop = `status: blocked` park, memory = 🔁 log).** "One tasknote per session" holds: a goal loop deepens within-task autonomy on exactly one tasknote; it never chains tasks.
- **VISION treatment:** the won't-accept list still rejects a loop **runtime** (runner/scheduler/daemon/session-state tooling); the markdown **contract** is carved in-scope — structurally parallel to the read-only-viz carve-out on the cross-project-query bullet.

**Resolved scoping:**

| Question | Resolution |
|---|---|
| VISION.md footprint | **Add a dedicated won't-accept bullet** — reject loop runtime (runner/scheduler/daemon/session-state tooling), carve the markdown loop contract in-scope (parallels the read-only-viz carve-out) |
| SPEC.md anchoring | **Add §"Loop tasks" pointer** — SPEC.md core gets a short pointer section (parallel to §"Blocked tasks"), making the contract discoverable from the cold-start surface |

Both confirmed the fuller footprint already scaffolded into ✅ Acceptance / 🧩 Subtasks — no approach change, no subtask restructure. **Discovery surfaced no significant deviation → skip 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `SPEC/blocked.md` is the shape template: `paths: []` frontmatter + `> Lazy-loaded SPEC module. Loaded by …` prose line + contract body mixing a mechanism table with prose sections. Extended that shape; the SPEC.md §"Loop tasks" pointer parallels §"Blocked tasks"; the VISION bullet parallels the read-only-viz carve-out structure. No new shape invented.

- [x] Implemented the minimal solution — five file touches:
  - `SPEC/loop.md` (new lazy module) — runtime-vs-contract boundary + reuse table, gate collapse (📦 → commit-per-verified-iteration; destructive carve-out → park), per-cycle relevance gate, `loop-max` budget, `## 🔁 Iterations` log, three frontmatter keys (+ the deliberate no-`loop-interval` rationale).
  - `SPEC.md` §"Loop tasks" pointer (after §"Blocked tasks") + terse mirror bullet in §"PR / suggestion archetypes flowtron does not accept".
  - `README.md` §"Sessions, loops, and sub-agents" closing paragraph redrawn (runtime in the runner, contract in flowtron).
  - `docs/VISION.md` §"What we won't accept" dedicated loop bullet (rejects runtime; carves the contract in-scope).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract + docs; no executable surface, nothing viz parses).

**Implementation Notes:**

- SPEC.md ↔ VISION.md mirror kept in sync: adding the VISION won't-accept bullet required the parallel terse mirror in SPEC.md §"PR / suggestion archetypes" (VISION line 30 declares that mirror contract). Each VISION bullet now still has exactly one SPEC archetype mirror.
- Cross-refs verified live (see Testing Notes) — all `gates.md` anchors, `blocked.md`, `WORKTREES.md`, `VISION.md` targets exist.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; no code, no PLAN.md/tasknote parse surface touched — viz parses neither `SPEC/` nor `docs/`).

- [x] Ran lint/type-check on changed code — N/A markdown; ran a cross-reference + relative-link verification grep instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Cross-reference verification (grep): `SPEC/gates.md` anchors cited by `loop.md` all exist — §"Operator-cue vocabulary" (L45), "### Destructive-action escalation" (L124), §"`--fast` operator override" (L266) ✓ · README §"Sessions, loops, and sub-agents" anchor ✓ · all referenced files (`docs/WORKTREES.md`, `docs/VISION.md`, `SPEC/blocked.md`, `SPEC/gates.md`) exist ✓ · `loop.md` relative links resolve from `SPEC/` (`../docs/…`, sibling `blocked.md`/`gates.md`) ✓ · VISION loop bullet + SPEC terse mirror both present, 1:1 ✓ · no dangling wikilinks (loop.md uses relative markdown links, not `[[ID]]`; tasknote wikilinks all point at real IDs) ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 11 ledger entries: `README.md` **UPDATED** (§"Sessions, loops, and sub-agents" boundary redraw — deliverable) · `SPEC.md` **UPDATED** (§"Loop tasks" pointer + §"PR archetypes" mirror bullet — deliverables) · `docs/AGENT-NEUTRALITY.md` **UPDATED** (logged the new `/loop` contract-layer surface) · `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `claude/CAPABILITIES.md` **no change** (adopter/skill wiring is `.5`/`.4`) · `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (markdown contract, no new attack surface), `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md` **no change**.

- [x] Closed — PLAN.md `.2` line flipped to stub form `Completed 2026-07-02.` (kept nested under the open epic per cohort convention); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the conditional-skip marker).

**Final Summary:**

Shipped `SPEC/loop.md`, the loop-task contract lazy module, and redrew the runtime-vs-contract boundary across README + VISION. The module names how existing flowtron patterns compose under repetition: **gate collapse** (a loop runs with `--fast` semantics — the 📦 gate becomes commit-per-verified-iteration; the 🛠️ gate stays a one-time pre-loop event; the destructive 🗄️/▶️ escalation does NOT collapse → an autonomous loop parks via `status: blocked` instead of firing a banner into an unattended session), a **per-cycle relevance gate** (Core Principle #4 generalized once-per-iteration; a `stop` is clean termination), a **`loop-max:` budget** (soft-stop backstop against non-convergence), the **`## 🔁 Iterations`** append-only log (loop memory, replaces transcript re-reads), and three additive frontmatter keys (`loop:` / `loop-max:` / `loop-last-run:` — deliberately no `loop-interval`, since cadence belongs to the runtime, not the file). The boundary redraw (README §"Sessions, loops, and sub-agents"; new SPEC.md §"Loop tasks" pointer + a dedicated VISION §"What we won't accept" bullet with its terse SPEC mirror): **Claude Code's `/loop` is the runtime; flowtron ships the markdown contract the loop reports to** — no runner/scheduler/daemon enters flowtron. Doc-drift sweep also logged the new `/loop` contract-layer reference in the neutrality ledger. Five files (`SPEC/loop.md` new; `SPEC.md`, `README.md`, `docs/VISION.md`, `docs/AGENT-NEUTRALITY.md` edited); markdown-only, no code. Next epic child: `.3` heartbeat template consumes this contract.

**Archived:** 2026-07-02
