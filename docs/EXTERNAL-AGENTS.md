# Handing Tasknotes to External CLI Agents

Flaitron is agent-neutral: the tasknote, `PLAN.md`, and `SPEC.md` are plain markdown, so any coding agent that can read a repo can pick up a flaitron task. This document records the convention for **handing a single tasknote off to an external CLI coding agent** — Kiro, Claude Code, Codex, or any equivalent — and getting its work back cleanly.

It is a documentation pattern, not a subsystem. Flaitron ships **no orchestrator, no scheduler, and no multi-agent runtime** — see [Not an orchestration runtime](#not-an-orchestration-runtime) below. What it *does* ship for a caller running tasknotes with nobody watching is a markdown contract: [The Orchestration Contract](#the-orchestration-contract). The tools named here are **examples**, not dependencies; the convention is tool-agnostic.

## The Core Rule: One Agent Per Tasknote

**A tasknote is the unit of handoff, and exactly one agent owns it at a time.**

The tasknote already exists to hold one task's entire scope in one context window (SPEC.md §"Core principles" #3). That property is what makes it a clean handoff boundary: the receiving agent gets the Goal, Acceptance criteria, Subtasks, and Discovery Notes as a self-contained brief, and the 4-phase workflow tells it exactly where to pick up.

Do **not** split one tasknote across two agents, and do **not** have two agents share a working tree on the same task. If work is genuinely parallelizable, it is *already* two tasknotes — file it as an epic with independent children (SPEC/epic.md) and hand each child to its own agent in its own worktree (below).

A **probe** is not a second owner: it owns no tasknote, never enters the 4-phase lifecycle, and returns a distilled summary to the agent that does own the tasknote — see README.md §"Sessions, loops, and sub-agents" for the probe/delegate split. This rule bounds *ownership*, not every context an owner may consult.

## The Handoff Contract

An external agent needs three things to run a flaitron tasknote, and nothing more:

1. **The tasknote file** — `.flaitron/tasknote/<TASK-ID>.md`, with Phase 1 Discovery complete (Relevance Assessment made, Acceptance + Subtasks populated). Discovery is where scope is locked; do the handoff *after* it, so the receiving agent executes rather than re-scopes.
2. **The contract** — `SPEC.md` (or the pinned `.flaitron/core/SPEC.md` submodule in an adopter project). Defines the 4-phase workflow, the relevance gate, and the operator cues the agent should emit.
3. **`PLAN.md`** — so the agent can flip the task line at closure and read related-task context.

All three are in the repo already. The "handoff" is therefore just: point the external agent at the repo and tell it which `<TASK-ID>` to run. No export step, no serialization, no shared state beyond the files git already tracks.

This is distinct from the optional `## 🔄 Handoff` tasknote section (`SPEC/tasknote-inserts.md`), which captures mid-task resume state for the *same* task's next session rather than transferring ownership to another agent.

## Isolating Parallel Agents: Use Worktrees

Running two external agents at once on the same checkout means two agents stepping on each other's working tree. The isolation convention already exists — see [WORKTREES.md](WORKTREES.md).

For each independent epic child you want to run in parallel:

1. The start half of [`docs/WORKTREES.md`](WORKTREES.md) §"Procedure" creates a `wt-<TASK-ID>` branch + worktree at `<project>-worktrees/wt-<TASK-ID>/` (sibling of the project checkout) and copies the active tasknote into it.
2. Open a fresh session for **one** external agent in that worktree directory and hand it `<TASK-ID>`.
3. The end half verifies the merge (or explicit discard), removes the worktree, and archives the tasknote from the main checkout.

One agent, one tasknote, one worktree. The worktree convention's "when to reach for it" rules (independent children of a discovery-scoped epic; no hard dependencies on in-flight siblings) apply unchanged — worktrees are the isolation primitive; this doc is about *who* runs inside one.

## The Return

When an external agent runs a tasknote to completion, its output is exactly what any flaitron session produces: the tasknote archived to `.flaitron/tasknote/archive/<area>/`, the `PLAN.md` line flipped to the `Completed YYYY-MM-DD.` stub, and a commit. Reviewing that work is the same operator gate as always — the 📦 ready-to-commit recap and the closure diff. Nothing about an external agent changes the post-closure protocol (SPEC.md §"Post-closure protocol").

**A run has three possible endings, not one.** A run driven with no operator present (see [The Orchestration Contract](#the-orchestration-contract) below) may also stop deliberately, or refuse to start at all. All three are filesystem facts, so a caller reads the outcome from the repo rather than from a transcript:

- **Closed** — tasknote archived, `PLAN.md` line stubbed `[x]`, one atomic commit covering deliverables + PLAN flip + archive move.
- **Parked** — tasknote still at `.flaitron/tasknote/<TASK-ID>.md` with `status: blocked` and a `park-reason:` code, `PLAN.md` line still `[ ]`, no commit. Phase 1 and any partial Phase 2 are preserved verbatim.
- **Refused** — nothing written at all. A pre-scaffold stop (a dirty tree, an already-closed ID, an existing archive) is reported and the run terminates rather than leaving a half-scaffolded note behind.

**The control point moves; it does not disappear.** With an operator at the 📦 gate, the diff review is the control. With none, two things hold that line in its place: the park conversions, which stop the run at any question an absent operator would have answered, and the **paper-complete guard** (SPEC.md §"Paper-complete guard"), which the posture leaves untouched — the foreign-dirt gate still refuses a dirty tree, closure is still one atomic commit, and 🏁 still requires a real deliverable-covering SHA. Review is deferred to the accumulated commits, not removed from the loop.

If the external agent worked in a worktree, the end half of the worktree procedure is the merge-and-clean step. If it worked on the main checkout in its own session, the returned commit is reviewed and kept like any other.

## The Orchestration Contract

Everything above assumes an operator choosing when to hand a tasknote out and reading the result when it comes back. A caller may also drive a tasknote with **nobody present** — a headless session, a scheduled run, a process handing out children of an epic. Flaitron supports that the same way it supports loops and worktrees: with a contract, not a runtime. The caller declares the posture; flaitron guarantees a readable outcome in the repo.

What follows is the whole of what such a caller may rely on. Each rule names its canonical owner rather than restating it — the contract lives in `SPEC/`, and a second copy here would be the first thing to drift.

1. **Declare the posture.** Pass `--unattended` to the skill driving the tasknote. It declares something `--fast` never claims: that no operator is present to answer a gate. Three skills accept it — the two runners (`/ft-task`, `/ft-micro-task`), where it supersets `--fast`'s autonomy (but not its 👁️ delegation, per step 3) and the two are never passed together, and `/ft-close-epic`, which never accepted `--fast`, so there it carries the posture directly. `/ft-epic-discovery` deliberately accepts neither: filing an epic is a scoping conversation, and there is nobody to have it with. A fourth skill accepts the flag without driving a tasknote at all: `/ft-file-followup --unattended`, the filing motion a driver calls at closure to discharge step 8 below. Contract: SPEC/gate-postures.md §"`--unattended` operator posture". Per-agent availability and routing: [PLATFORMS.md](PLATFORMS.md).

2. **Deny by default when choosing what to dispatch.** A PLAN.md row may carry an optional `[unattended]` marker after its `[model]` token — the operator's declaration that *this row* is safe to drive with nobody present. Flaitron never writes it; seeding is an operator act, and a caller that files rows cannot mark its own. So an **unmarked row is undecided, not approved**: a caller selecting work autonomously takes marked rows only, and leaves the rest for a session with somebody in it. The marker is row-level and the posture in step 1 is invocation-level; the marker never implies the posture (an attended runner reads it only as implied `--fast` — SPEC/gate-postures.md §"`--fast` operator override"), and the posture does not require the marker. Grammar and position: SPEC.md §"Task-line format". The two ways authors mis-write it: `SPEC/plan-parser.md` §"`[unattended]` / `[handoff]` mis-authoring footguns". How rows come to carry it: every filing skill *proposes* candidates inside its existing confirm gate, and an operator-less filing emits an `unattended-candidates:` line instead of writing — so a caller reading that line has a shortlist for the next attended session, never a marked row; an operator seeds a plan that predates the proposal in bulk with `/ft-seed`, again inside one gate (`SPEC/unattended-candidacy.md`).

3. **Expect a park wherever a gate needs a person.** Most gates that survive `--fast` do so because they need a decision, not merely patience — a scope verdict, a destructive command, a manual prerequisite. One converts for the opposite reason: `--fast` *suppresses* the 👁️ visual-confirmation ask precisely by handing it to the operator standing there, so with nobody present it parks rather than vanishing. Under the posture each of these stops the run rather than blocking on an answer nobody is there to give. A park is not a failure: it is Phase 1 and any partial Phase 2 preserved at the exact point a decision was needed. SPEC/gates.md enumerates which gates convert; a caller needs only to know that a park is an expected ending, not an error.

4. **Classify a stop by its code, not its prose.** A parked tasknote carries `park-reason: <code> — <explanation>`. Split on the first ` — `, branch on the code, and never parse the explanation. The codes are a **closed set**: a new stop cause adds a row upstream rather than inventing a value, so exhaustive branching is safe and an unrecognized code is a bug rather than a variant. The set and each code's meaning: SPEC/blocked.md §"Park reason".

5. **Resume by re-invoking the same skill.** A parked tasknote is paused, not closed. Running `<SKILL> <TASK-ID>` against it takes the resume path automatically, restores `in-progress`, clears the reason, and continues where the park left off. Nothing is reconstructed and Discovery is not re-run — that preservation is the point. Most codes describe a question, so the natural resume is an attended one with somebody there to answer it. Contract: SPEC/blocked.md.

6. **Annotate or continue a run that ended without stopping.** A killed process, an exhausted context, or a lost session leaves a tasknote at `in-progress` with no gate having fired and no reason written — a state the runners refuse, because restarting a half-executed task would re-run Discovery over finished work. **Two caller paths** are contract-legal, and flaitron performs neither: (a) convert the note into the parked state above with two frontmatter writes (`status: blocked` plus an `interrupted` reason) and re-invoke normally, so the resume path takes it from there; or (b) point a fresh agent at the note with a prose continue — drive the remaining phases in that file through closure, do not re-invoke the runner — carrying the posture in prose, since there is no invocation to hang a flag on. The tasknote, not the session, holds the context either way. Flaitron ships no crash detector, supervisor, or session daemon, and a runner cannot annotate a note in a session that no longer exists. Path (a)'s two writes are the one caller write this contract names — working-tree edits the resume path consumes, never a commit (step 9). Contract: SPEC/blocked.md §"Resuming an interrupted run".

7. **Expect one deferred motion when closing an epic.** Under the posture, the epic-close runner drives the terminal audit child to full closure and commits it, then leaves the parent-flip unanswered: the parent line stays `[ ]` above a cohort of `[x]` children, which is structurally what "flip pending" looks like. The audit is reachable; the irreversible cohort move stays operator-owned. Terms: SPEC/gate-postures.md §"`/ft-close-epic` under the posture".

8. **File what you defer to the operator.** A run with nobody present defers more to the absent operator, not less — every manual step it could not take falls to them. `SPEC.md` §"Deferred hand-off filing" therefore binds an operator-less closure in full: a deferred real-world step becomes its own unchecked PLAN.md row, never prose in a Recap or a `## 🔄 Handoff` that no future reader will look at. The discharge path is `/ft-file-followup --unattended`, whose filing commit is authorized by that duty rather than by an operator's review approval; a run that *parks* files nothing, because a park is paused rather than closed and its `park-reason:` already carries what to take up on resume. Contract: SPEC/plan-filing.md §"Filing commits" → "Unattended filing authority".

9. **Commit nothing of your own into the producer repo.** The only commits a dispatched run may add to the repo it runs in are the worker's — the atomic closure commit (§"The Return") and a filing commit (step 8). A caller commits nothing else there: a status snippet, a dispatch log, a registry, a heartbeat — anything the caller keeps for itself — lives caller-side, never as a tracked file it writes and commits in the target. A foreign commit is foreign dirt to the next run's paper-complete guard and noise in a closure history that is meant to read as one commit per task; a producer that ignores such a file is exercising the boundary, not breaking a contract. Step 6's two frontmatter writes are the one caller write this contract names, and they never become a commit. Owner: SPEC.md §"Cross-repo edit remit" states the same boundary for a task's deliverables — a repo's edits land through its own cycle — and §"Paper-complete guard" is what a foreign commit trips.

The posture removes *pauses*, never *proof* — every part of the paper-complete guard holds with no unattended variant, and Phase 3 runs the repo's **full validation set** rather than the attended targeted default (budget the run time for it; a red the diff did not cause parks `input-needed` rather than closing over it — SPEC/gate-postures.md §"What `--unattended` never relaxes"). Phase 3's **External review** likewise runs unrelaxed: a context that did not write the diff grades it against `## ✅ Acceptance`, and a blocker the run cannot fix parks `input-needed` — with nobody reading the commit, it is the only read of the diff that is not the generator's own. Budget a read-only sub-agent for it; it grades and never patches, so it commits nothing and trips no boundary in step 9 above. What it deliberately does **not** provide is the subject of [Not an Orchestration Runtime](#not-an-orchestration-runtime); what it *does* let a caller hook is the next section.

## Stable surfaces for callers

The rules above say what a caller must *do*. This section says what it may *rely on* — the surfaces a reader or dispatcher may hook without the next flaitron release moving them. Each row names its canonical owner and copies nothing; a change to a stable surface is a versioned release (SPEC/versioning.md), never a silent edit. The list was verified against a real out-of-repo reader and dispatcher and is deliberately no larger than one needs.

| Surface | What a caller may rely on | Owner |
|---|---|---|
| Task-line grammar | The grammar in SPEC.md §"Task-line format". `viz/src/parser.ts` is the canonical reference implementation and `SPEC/plan-parser.md` the tolerance list; a caller that ports the grammar re-verifies it against both on every pin bump. | SPEC.md §"Task-line format" · SPEC/task-line-segments.md · SPEC/plan-parser.md |
| Trailing bracket-token run | Lowercase bracket tokens after `[model]` are tolerated and dropped — `[unattended]` and `[handoff]` are the two canonical members. Flaitron never fails a row on an unknown lowercase token and never assigns one a meaning, so a caller may read its own tokens there. What such a token *means* is the caller's, not flaitron's. | SPEC/plan-parser.md |
| `[unattended]` marker | Deny-by-default (step 2); flaitron never writes it; the Phase 4 stub rewrite copies the trailing token run verbatim, so a marker survives closure. | SPEC/task-line-segments.md · SPEC/plan-filing.md §"`## Completed` archive convention" |
| `[handoff]` marker | The operator's declaration that the row stops mid-run for a human act that is not another task. A caller choosing work with nobody present declines it even when `[unattended]` is also present; an attended read never denies on it. Flaitron never writes it and no filer proposes it; it survives closure like `[unattended]`. | SPEC/task-line-segments.md · SPEC/unattended-candidacy.md §"Candidacy predicate" |
| `unattended-candidates:` line | Literal `unattended-candidates:` prefix, bare comma-separated IDs in PLAN order or `none`, transcript-only under `--fast` / standalone `--unattended`, persisted in the discharging runner's Final Summary / `## ✅ Recap`. | SPEC/unattended-candidacy.md §"Three postures" · §"Persistence" |
| `Blocked by [[ID]]` | Wikilink-only, literal, case-sensitive; cleared by removing the clause, not by the blocker closing. | SPEC/plan-parser.md §"Long-description conventions" · SPEC/blocked.md |
| The closed-row set | `PLAN.md` `## Completed` **and**, once an operator has rotated, `.flaitron/PLAN-ARCHIVE.md` (closed rows only, moved verbatim and grouped by month). A caller resolving an ID against completion reads both; a missing archive file is empty, never an error. | SPEC/plan-filing.md §"`## Completed` rotation" |
| Tasknote `status:` and location | The closed set `starter` / `not-started` / `in-progress` / `blocked` / `completed`. Open notes live at `.flaitron/tasknote/<ID>.md`; closed ones under `archive/<area>/`, where `<area>` is the project's README table — `archive/*/<ID>.md` is the portable glob. | SPEC.md §"Tasknote frontmatter" · §"Task ID convention" |
| `park-reason:` | `<code> — <prose>`; split on the first ` — `; codes are a closed set (step 4). | SPEC/blocked.md §"Park reason" |
| Tasknote body headings | The full template's four `## <emoji> Phase N: <Name>` headings — an optional leading emoji token, the literal `Phase N:`, the name after it — and the `- [x]` / `- [ ]` run beneath each up to the next `## `; plus `## 🎯 Goal`, which both templates ship. Enough to read a note's furthest-reached phase and its goal from the body alone. The micro template ships no phase headings (`## ⚡ Notes` instead), so a micro note has no phase progress to read. | `SPEC.md` §"Tasknote body shape" · `templates/tasknote-template.md` · `templates/tasknote-micro-template.md` |
| Template labels | `**Final Summary:**` followed by `**Archived:**` in the full template's Phase 4 section — the paragraph after the first label is the lede; `**Verdict:** De-scope` in the Relevance Assessment marks a De-scope closure. The micro template ships `## ✅ Recap` + `**Archived:**` and no `**Final Summary:**`, so a micro closure has no lede to read. | `templates/tasknote-template.md` · `templates/tasknote-micro-template.md` |
| Capability probes | The pinned `/ft-task` recognizes `--unattended` iff `claude/skills/ft-task/unattended-mode.md` exists **and** the literal `--unattended` appears in `claude/skills/ft-task/SKILL.md`; the pinned `/ft-file-followup` recognizes it iff the literal appears in `claude/skills/ft-file-followup/SKILL.md` (that skill carries its posture inline and ships no posture fragment; its `step-0-flags.md` sibling holds the flag parse, conflict refusals, and mode dispatch, and is not part of the probe). The fragment is the shared posture body `/ft-task`, `/ft-micro-task`, and `/ft-close-epic` load, and it stays at that path under that name. | `claude/skills/ft-task/unattended-mode.md` (ledgered in AGENT-NEUTRALITY.md) · PLATFORMS.md |
| The three endings | Filesystem facts, per [The Return](#the-return): a `[x]` stub `Completed YYYY-MM-DD.` plus a new HEAD covering deliverables; `status: blocked` + `park-reason:` on the open note; nothing written. | SPEC.md §"Paper-complete guard" · SPEC/blocked.md |

**Out of contract.** Some callers read these; none of them is flaitron's. Reading one is fine; relying on flaitron to write, keep, or shape it is not:

- A `**Suggested next task:** **ID**` header line in `PLAN.md` — flaitron writes it nowhere. The post-closure next-move suggestion is transcript prose (`SPEC/post-closure.md`), not a file surface.
- A `### Follow-up…` heading in a tasknote — flaitron defines no such heading; a deferred step is filed as its own PLAN row (step 8). A caller may ask *its own* worker for a heading, but no producer owes one.
- Any trailing bracket token other than `[unattended]` / `[handoff]` — tolerated and dropped; the caller's meaning, not flaitron's.
- Tasknote YAML `blocked-by:` read as a gate — it is a planning claim, not a don't-start gate (SPEC/blocked.md).
- The `⏸ --unattended stop — …` and `⏸ --unattended park — …` markers — transcript prose. The outcome is read from the repo, per [The Return](#the-return).

## Not an Orchestration Runtime

This document describes a **convention and a markdown contract**, for an operator who chooses to run more than one agent and for a caller running one with nobody watching. Neither is a runtime. Flaitron deliberately does not provide, and will not accept:

- A multi-agent scheduler or dispatcher that assigns tasknotes to agents.
- A session daemon that keeps external agents alive or polls their state.
- A "fan-out" or "swarm" runtime that runs children in parallel automatically.
- A job graph or lock over `## 🌳 Fan-out` / YAML `blocked-by:` / `parallel-safe-with:` — those are markdown facts, not a scheduler. The worktree start procedure may warn on an open blocker; it must not refuse.

These are the same rejections VISION.md §"What we won't accept" makes for loop runtimes, graph / multi-agent execution runtimes, and cross-project query layers: flaitron ships the **markdown contract** the agents report to (the tasknote, the 4-phase workflow, the operator cues, the Fan-out declaration, and the operator-less posture above), and the *runtime* — which agent, when, in which session — stays with the operator and whatever CLI they chose. If you want parallelism, isolated worktrees ([WORKTREES.md](WORKTREES.md)) plus a fresh session per child is the whole mechanism. See [PHILOSOPHY.md](PHILOSOPHY.md) §"What flaitron deliberately is not".

## Relationship to the Rest of Flaitron

- **The contract does not vary by agent; it varies by posture.** The 4-phase workflow, relevance gate, operator cues (🛠️ / 📦), and post-closure protocol are identical whether the agent running a tasknote is Claude Code, Codex, Kiro, or the operator by hand. What differs is the posture the *caller* declares: the operator-less posture (§"The Orchestration Contract") is an opt-in, additive SPEC contract that converts unanswerable gates into parks. A run that does not declare it sees the contract exactly as it was before the posture existed.
- **Agent-neutral by construction.** See [AGENT-NEUTRALITY.md](AGENT-NEUTRALITY.md) and [AGENT-COMPAT.md](AGENT-COMPAT.md) for the per-agent consume-mode matrix. An external agent that can read markdown and run `cp` / `mv` / `git` can run a tasknote; a contract-only agent uses the procedure SOPs (`SPEC/procedures/`).
- **Worktrees are the isolation layer.** [WORKTREES.md](WORKTREES.md) owns the parallel-execution convention; this doc adds only the "one external agent per tasknote" framing on top of it.

---

**Related:** [WORKTREES.md](WORKTREES.md) · [AGENT-NEUTRALITY.md](AGENT-NEUTRALITY.md) · [AGENT-COMPAT.md](AGENT-COMPAT.md) · [PLATFORMS.md](PLATFORMS.md) · [VISION.md](VISION.md) §"What we won't accept"
