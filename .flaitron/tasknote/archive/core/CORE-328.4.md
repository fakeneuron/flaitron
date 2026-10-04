---
title: autonomous-loop-guidance
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-328, CORE-328.1]
---

# CORE-328.4 | autonomous-loop-guidance

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-328]]

## 🎯 Goal

Document the "one task per context window" ↔ operator-`/clear` coupling, why autonomous multi-task loops and sub-agents bypass it, and the recommended safe pattern (fresh session / worktree per independent epic child / how `--fast` fits) — descriptive doc only, no loop machinery.

## ✅ Acceptance

- [ ] One new `README.md` section, directly after §"Agent memory" (before §"Repo layout"), documents: (a) the "one task per context window" ↔ operator-`/clear` coupling (principle is enforced socially — the assistant cannot run `/clear`); (b) why autonomous multi-task loops and sub-agents bypass that discipline; (c) the recommended safe pattern — fresh session per task, worktree per independent epic child (`docs/WORKTREES.md`), and where `--fast` fits (within-task autonomy, not a loop)
- [ ] Descriptive only — zero machinery: no new skills, loop runners, session tooling, or SPEC changes (VISION §"What we won't accept" guard from the filing)
- [ ] Shape/length consistent with the sibling §"Agent memory" section (~≤25 content lines, CORE-022 precedent)
- [ ] Claims consistent with canonical sources: `claude/CAPABILITIES.md` `/clear` row, `SPEC/gates.md` §"`--fast` operator override", `docs/WORKTREES.md` five locked conventions
- [ ] No overlap back into `.2` positioning territory (memory framing stays in §"Agent memory"; this section is session/loop discipline)

## 🧩 Subtasks

- [ ] Decide the doc home (done in Phase 1: README.md via AskUserQuestion, sibling to §"Agent memory")
- [ ] Phase 2: draft the section after §"Agent memory", extending the README positioning-section shape
- [ ] Phase 2: cross-check claims vs `claude/CAPABILITIES.md`, `SPEC/gates.md`, `docs/WORKTREES.md`, VISION "won't accept"
- [ ] Phase 3: markdown mental-pass on the new section
- [ ] Phase 4: doc-drift sweep + PLAN.md flip to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-328]] — parent epic (cc-agent-alignment)
- [[CORE-328.1]] — epic Discovery; filed this child with scope rationale

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-07-02 by [[CORE-328.1]] Discovery (gaps 1+2: no sub-agent concept anywhere; "one task per context window" enforced socially via operator `/clear`, which autonomous loops bypass). Nothing shifted since filing (same day); the gap is real — no doc anywhere connects the principle to its operator-side enforcement or tells autonomous-agent users the safe pattern. The `.1` scoring table flagged the guard explicitly: net-positive *only if* descriptive-only.

- [x] Read relevant source files — `README.md` (home + §"Agent memory" sibling shape), `docs/WORKTREES.md` (worktree half of the safe pattern), `SPEC/gates.md` §"`--fast` operator override" (canonical `--fast` surface), `claude/CAPABILITIES.md` `/clear` row, `SPEC.md` Core Principle #3, `docs/VISION.md` / `docs/PHILOSOPHY.md` (principle prose + "won't accept" guardrails), `.flowtron/tasknote/archive/core/CORE-328.{1,2}.md`.

- [x] **Archive skim** — [[CORE-328.1]]: this child covers gaps 1+2 with a descriptive-only guard; sub-agent delegation *machinery* was explicitly WON'T-FILE — this doc must not backdoor it. [[CORE-328.2]]: §"Agent memory" landed directly before §"Repo layout" and deliberately deferred loop guidance here; its boundary note is the reverse of this task's. CORE-215 cohort (via `docs/WORKTREES.md`): worktree convention is locked five-ways; cite it, don't restate it.

- [x] **Drift check** — all cited surfaces exist at HEAD: `README.md` §"Agent memory" (lines 131–153, before §"Repo layout"), `claude/CAPABILITIES.md:32` (`/clear` operator-only row), `SPEC/gates.md` §"`--fast` operator override", `docs/WORKTREES.md`, SPEC.md Core Principle #3 ("One task per context window"). No drift.

- [x] Asked clarifying questions — AskUserQuestion on the doc home (the one genuinely open decision, mirroring the `.2` precedent). **Answer: README.md**, new section directly after §"Agent memory" — CORE-022 shape/length discipline applies.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **The coupling, precisely:** SPEC Core Principle #3 sizes tasks to fit one context window, but the *reset between tasks* is operator-owned — `/clear` is a Claude Code UI command the assistant cannot run (`claude/CAPABILITIES.md:32`). The post-closure copy-paste line ("Clear your session, then run: …") is the prose expression of that handoff. An autonomous multi-task loop (agent chains task after task in one session) never gets the reset: context accretes, and the principle's enforcement point silently disappears. Sub-agents bypass differently — they spawn fresh contexts *outside* the tasknote discipline (no Phase 1, no gates, no archive trail) unless each is handed exactly one tasknote.
- **Safe pattern to document:** one tasknote per session (fresh session ≈ the reset); for parallel independent epic children, one worktree + fresh session per child (`docs/WORKTREES.md`); `--fast` = within-task autonomy (suppresses routine operator gates on one run — `SPEC/gates.md`), i.e. the sanctioned way to make a *single* task hands-off, not a license to chain tasks.
- **Guard:** descriptive doc only. VISION "won't accept" + the `.1` won't-file of sub-agent delegation machinery mean no loop runner, no session tooling, no new skill — the section describes the discipline and points at existing surfaces.
- **Boundary vs `.2`:** §"Agent memory" owns the *state/memory* framing; this section owns *session/loop* discipline. It may reference the memory layer as what makes fresh sessions cheap (one-file resume) but must not restate it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the README positioning-section shape (CORE-022 lineage, refreshed by the `.2` §"Agent memory" sibling): framing paragraph → bulleted pattern list → closing no-machinery line. No new shape needed.

- [x] Implemented the minimal solution — one new `## Sessions, loops, and sub-agents` section in `README.md`, directly after §"Agent memory" (before §"Repo layout").

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only README section; no executable surface).

**Implementation Notes:**

- Section is 28 content lines: framing paragraph (the coupling: principle #3's between-task reset is operator-owned; loops skip it, free-roaming sub-agents sidestep gates + archive trail) · four safe-pattern bullets (one tasknote per session · worktree + fresh session per independent epic child, citing `docs/WORKTREES.md` · `--fast` = within-task autonomy, not task-chaining · sub-agents get exactly one tasknote) · closing no-machinery line citing VISION §"What we won't accept".
- Every claim traced to a canonical source during drafting: `/clear` operator-only (`claude/CAPABILITIES.md:32`), post-closure cue wording (SPEC §"Post-closure protocol"), `--fast` surface (`SPEC/gates.md` §"`--fast` operator override"), worktree convention cited-not-restated (`docs/WORKTREES.md`), VISION heading verified by grep.
- Boundary held both ways: memory framing stays in §"Agent memory" (referenced once as what makes fresh sessions cheap); no loop machinery described or implied — the section is purely descriptive per the `.1` filing guard.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose only).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the new section: `##` heading level matches siblings ✓ · placement between §"Agent memory" and §"Repo layout" ✓ · relative links `[SPEC.md](SPEC.md)`, `[docs/WORKTREES.md](docs/WORKTREES.md)`, `[docs/VISION.md](docs/VISION.md)` all valid from repo root ✓ · cited headings exist (SPEC Core Principle #3, VISION §"What we won't accept", README §"Agent memory") ✓ · bullets use `- ` + bold leads matching the sibling section ✓ · inline code backticks render (`--fast`, `/ft-task`, `tasknote/<ID>.md`) ✓ · no bare wikilinks ✓ · no trailing whitespace ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: **updated** (new §"Sessions, loops, and sub-agents" — the task's deliverable). All other entries — `SPEC.md` (no contract change; section describes existing behavior), `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (README is public-facing, not contract-layer; per the `.2` precedent no ledger entry needed), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (cited, not modified), `docs/AGENT-COMPAT.md`: **no change**.

- [x] Closed — PLAN.md `.4` line flipped to stub form `Completed 2026-07-02.` (in place under the open epic, per the `.1`–`.3` precedent); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the conditional-skip marker).

**Final Summary:**

Added a 28-line `## Sessions, loops, and sub-agents` section to `README.md` (between §"Agent memory" and §"Repo layout") documenting the "one task per context window" ↔ operator-`/clear` coupling: the between-task reset is operator-owned (the assistant cannot run `/clear` — `claude/CAPABILITIES.md`), autonomous multi-task loops skip it, and free-roaming sub-agents sidestep the workflow's gates and archive trail. Safe patterns documented as four bullets: one tasknote per session (fresh session ≈ the reset, cheap via the §"Agent memory" resume point) · one worktree + fresh session per independent epic child (`docs/WORKTREES.md`) · `--fast` = within-task autonomy per `SPEC/gates.md`, not task-chaining · sub-agents get exactly one tasknote. Closing line pins the descriptive-only guard (no loop runner/scheduler/session tooling — VISION §"What we won't accept"). Home decided in Phase 1 via operator ask (README.md, sibling to §"Agent memory", CORE-022 shape discipline). Zero machinery; every claim traced to its canonical source.

**Archived:** 2026-07-02
