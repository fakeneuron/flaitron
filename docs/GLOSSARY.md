# Flaitron Glossary

**Lazy-loaded vocabulary reference.** One-line definitions for the load-bearing terms, primitives, phases, markers, and grammar elements of the flaitron workflow contract. Pointers only — the authoritative text lives in `SPEC.md` (and lazy `SPEC/` modules + skills).

Adopted from the GSD-Pi `CONTEXT.md` glossary pattern (the "mega-doc" slice that survived the one-task-per-window filter during CORE-EPIC-194 Discovery). See [CORE-194.1](../.flaitron/tasknote/archive/core/CORE-194.1.md) for the extraction rationale and term-cohort decisions.

Alphabetized. ~73 entries. Maintained via epic children and audits.

---

**AGENTS.md** — The agent-neutral block adopters paste into their project `AGENTS.md`; defines the adopter-facing assistant surface (skills, one-time wiring). Source: `claude/AGENTS-snippet.md`. See docs/MIGRATION.md §1.3.

**AI-referenced docs** — The flat list in `.flaitron/tasknote/README.md` §"AI-referenced docs" that every Phase 4 closure and epic-audit subtask walks for the doc-drift sweep. Membership means *swept for drift*, not *loaded at cold start* — the two are independent per-doc properties (CORE-491). `SPEC/` lazy modules and `claude/skills/*` are excluded on both counts.

**area prefix** — The leading token of a TASK-ID (e.g. `CORE-`, `FE-`, `BE-`); declares the scope bucket per SPEC §"Task ID convention". Adopters declare extra domain prefixes in their `.flaitron/tasknote/README.md`.

**audit-family** — The two audit skills `/ft-audit{,-repo}`: the forkable stack scaffold `/ft-audit <domain>` — a parameterized dispatcher over an eight-file `passes/` library (`general` · `backend` · `frontend` · `security` · `performance` · `docs` · `structure` · `context`) — plus `/ft-audit-repo`, the no-fork first-contact holistic audit run by reference from the submodule. Forking rules and naming (no `ft-` prefix on forks) in docs/MIGRATION.md §1.2.1.

**audit-family fork** — An adopter-owned audit skill created by forking an upstream one; must drop the `ft-` prefix so ownership is visible in resolution (e.g. `audit-payments`).

**Blocked by [[ID]]** — Wikilink grammar inside a PLAN.md long-description declaring a hard prerequisite task. Parsed into `Task.blockedBy`. Multiple comma-separated IDs supported. See SPEC §"Task-line format".

**blocked-by (YAML)** — Optional omit-when-absent tasknote frontmatter array of bare task IDs: the durable planning dependency that survives the Phase 4 PLAN stub. Distinct from PLAN `Blocked by [[ID]]` (the don't-start gate) and from `status: blocked` (a started-and-parked run). See SPEC §"Tasknote frontmatter" and SPEC/blocked.md.

**blocked tasknote** — A tasknote whose frontmatter `status: blocked`; parked awaiting a prerequisite. Resumed through the special Step 3c path in `/ft-task`. See SPEC/blocked.md.

**child (epic)** — A normal implementation subtask under a parent epic (e.g. `CORE-194.3`). Distinct from the `.1` Discovery and `.N` Audit bookends. See SPEC/epic.md.

**Closure (Phase 4)** — The final auto-run phase: mandatory doc-drift sweep, PLAN.md line flip to stub form + archive move, recap draft. Flows directly into the post-closure protocol. See SPEC §"🚀 Phase 4: Closure".

**`## Completed` rotation** — The bound on PLAN.md's `## Completed` section: at most 60 checked rows; past that, every closing runner's post-closure step moves the oldest rows (current month included; never splitting an epic cohort from its children) into a sibling `.flaitron/PLAN-ARCHIVE.md` until 40 or fewer remain, in its own `chore:` commit with no prompt. Rows move verbatim, append-only. Viz reads both files. See SPEC/plan-filing.md §"`## Completed` rotation".

**Conditional skip rule** — The deterministic privileged-ops path/keyword test plus bundled-prompt override that decides whether the 📦 ready-to-commit gate fires or the closure auto-commits. Frontend diffs and perf-narrative reasoning do not trip the gate. See SPEC/gates.md §"Conditional skip rule".

**copy-paste line** — The post-closure "suggest next" helper: emoji primary label (`[heavy]🧠` / `[medium]🧩` / `[light]🔧` / `[frontier]💎` / `[xheavy]🔭`) + "design / moderate / mechanical / high-stakes / exploratory" prose + shortname, followed by a tight "Clear your session, then run on <model @ effort>: /ft-task <next-ID>" cue whose label-line glyph and `model @ effort` pick match the chosen candidate's (glyph 🔧/🧩/🧠/💎/🔭, never a default 🔧; with no pick — `[xheavy]`, a concrete token, an unmapped platform — the cue reads "then run:"). Never emits literal `/model` or `/clear` commands.

**CORE-** — The canonical area prefix for cross-cutting, orchestration, and meta tasks (used by flaitron self and every adopter).

**[!critical]** — Optional urgency flag in the task-line grammar; renders a red marker and floats the row to the top of its priority bucket (High). Orthogonal to `[model]` and the priority heading. See SPEC/task-line-segments.md.

**deep pre-pass** — Optional three-stage upfront staging (Constitution → specify → clarify) for high-uncertainty epics before normal Phase 1 Discovery; invoked with `/ft-epic-discovery --deep`. See SPEC/epic.md.

**delegate** — A delegated context that owns exactly one `tasknote/<ID>.md`: it inherits that tasknote's full Phase 1 record and runs the 4-phase workflow through to closure like any session. The bounded counterpart to a probe (which owns nothing); anything broader than one tasknote belongs to the operator's own session. See README.md §"Sessions, loops, and sub-agents".

**Discovery (Phase 1)** — The mandatory opening phase of every tasknote: Reviewed PLAN, Relevance Assessment (Proceed/Re-scope/De-scope), read sources, archive skim, drift check, clarifying questions (or logged assumptions), populate subtasks. Exit gate may emit 🛠️. See SPEC §"📝 Phase 1: Discovery".

**Doc-drift sweep** — The mandatory Phase 4 (and epic-audit) step that walks every entry in the AI-referenced docs list and records "no change" or the precise update performed.

**Downstream-impact reconciliation** — The scan that keeps PLAN.md cohesive as it grows: when a new task is filed or a mid-flow decision changes direction, active PLAN entries are checked for stale / contradictory / redundant overlap and one reconcile action (merge / nest / edit / delete / leave) is proposed per impacted entry behind a user-confirm gate (the plan is never auto-rewritten). Wired into the filing skills and the `/ft-task` Phase 2 decision path. See SPEC/tasknote-selection.md §"Downstream-impact reconciliation".

**Drift check** — Phase 1 step with two halves, both run before any re-interpretation: a *code* cross-reference (file paths, line numbers, function names, and root-cause hypotheses cited in the original PLAN description still match current HEAD) and a *cross-artifact* one (the plan the tasknote is forming neither contradicts a SPEC contract nor diverges from its PLAN.md line). Cross-reference, not judgment — the Relevance Assessment already covers judgment.

**epic** — A parent planning artifact (`CORE-EPIC-N`) whose children are numbered subtasks (`.1` Discovery, implementation children, `.N` Audit). Parent flips to Completed automatically with the closure that leaves every child `[x]` (normally the audit). Full lifecycle in SPEC/epic.md.

**epic Audit (.N)** — The closing subtask of an epic; verifies the completed work sits well in the codebase, runs the cumulative doc-drift sweep across AI-referenced docs, records findings even when clean. Executed via `/ft-close-epic`.

**epic Discovery (.1)** — The opening subtask of an epic; surveys the shared surface, resolves scope questions, and files the concrete child task list in PLAN.md. Deliverable is the filed children (not code). When M>1, may carry optional `## 🌳 Fan-out`. Executed via `/ft-epic-discovery`.

**Execution (Phase 2)** — The implementation phase: mandatory pattern survey of neighboring code first, then minimal targeted change + tests on changed files only. See SPEC §"🛠️ Phase 2: Execution".

**Extension-first** — Outward-facing principle (VISION-only, not in SPEC Core principles): prefer extending an existing pattern (sibling skill, doc convention, tasknote shape) over inventing a parallel one. Promoted from the Phase 2 "Pattern survey" contract step. See docs/VISION.md and SPEC §"🛠️ Phase 2: Execution".

**Fan-out (🌳)** — Optional Discovery `.1` body section declaring which epic children are Parallel / Sequential / Synthesis. Not in the default template; `/ft-epic-discovery` pre-fills when M>1. Children echo via YAML `blocked-by` / `parallel-safe-with`. A declaration, not a scheduler. See SPEC §"Tasknote body shape" and SPEC/epic.md §"Fan-out".

**follow-up** — A lightweight mid-flow task filed via `/ft-file-followup`; produces a one-line PLAN.md entry plus a short context paragraph delivered conversationally. Below the normal tasknote threshold.

**`/ft-refactor`** — The refactor **depth planner that files**: takes one named target, runs a read-only survey (dependencies, seams, test coverage, blast radius), surfaces a sequenced behavior-preserving plan for operator review, then files a parent epic + implementation children from `.2` + a `.N` audit, each child a starter seeded with characterization-test and behavior-preservation acceptance. Never edits source — children execute via `/ft-task`. Its epics carry no `.1` Discovery (the run *is* the discovery). Depth counterpart to `/ft-audit structure`'s **breadth sweep**; contrast a hand-drafted spec (`templates/spec-template.md`; plans, never files) and `/ft-epic-discovery` (files, then drives a generic Discovery).

**`/ft-seed`** — The attended **bulk-seeding utility** for `[unattended]`: walks every open row of an existing `.flaitron/PLAN.md` with the `SPEC/unattended-candidacy.md` predicate, shows the candidates with the token in place inside one prose review gate, writes the token only on the rows the operator keeps, and commits the write under §"Filing commits". No flags — remove the gate and it is a report the filers already emit. Skips rows already marked and `[handoff]` rows; seeds, never repairs. The bulk counterpart to the per-row candidacy each filer proposes at its write step. See SPEC/unattended-candidacy.md §"Seeding an existing plan".

**`/ft-update`** — The adopter-side command that bumps a project's pinned flaitron submodule to the latest released tag: shows current→target + changelog, moves the pin, re-wires newly shipped symlinks, runs a smoke check. Consumer-side counterpart to `/ft-release`. Adopter-only (bails in flaitron-self); takes no arguments. See docs/MIGRATION.md.

**goal loop** — The loop-task shape that repeats Phase 2→3 (execute→verify) against a fixed, machine-checkable `## ✅ Acceptance` target until every check passes, `loop-max` is exhausted, or the per-cycle relevance gate says stop. Driven by `/ft-task --loop`; contrast heartbeat. See SPEC/loop.md.

**grammar elements** — The syntactic pieces of the PLAN.md task-line and tasknote body: `[!critical]`, `[model]`, `[unattended]`, `[handoff]`, `| shortname`, `[[TASK-ID]]` wikilink, `Blocked by [[ID]]`, `Completed YYYY-MM-DD.` stub form, etc. See SPEC/task-line-segments.md.

**[handoff]** — Optional task-level marker in the task-line grammar, sitting in the same trailing run as `[unattended]` AFTER `[model]`; the operator's declaration that the row will stop mid-run for a human act that is not another task (a cross-repo filing prompt, a physical-access step, a credential) — not a dependency, not an absent opt-in, a durable property of the work known at filing time. An operator-less caller declines the row even when `[unattended]` is also present; an attended run is unchanged. Flaitron never writes it and no filer proposes it. Parses into `Task.handoff`. Distinct from the `## 🔄 Handoff` tasknote section below. See SPEC/task-line-segments.md and SPEC/unattended-candidacy.md clause 3.

**Handoff (🔄)** — Optional tasknote body section a session ending mid-task may write so the next reader resumes without reconstructing state: Goal + Acceptance status, key decisions, open questions, relevant paths, next step. Sits in the top block after `## 🔗 Related`; ships in no template, so the single-session happy path pays nothing. Distinct from a park (`status: blocked`), a sidequest's resume anchor, and docs/EXTERNAL-AGENTS.md §"The Handoff Contract" (whole-tasknote transfer to another agent). See SPEC §"Tasknote body shape".

**heartbeat** — The recurring-maintenance loop-task shape: each cycle runs a cheap pre-check then does at most one bounded duty, filing findings as PLAN lines rather than converging on a single target. Ships as `templates/loop-heartbeat-template.md` (copied to `.claude/loop.md`); a stale `loop-last-run:` is its death signal. See SPEC/loop.md.

**iteration log (🔁 Iterations)** — The append-only `## 🔁 Iterations` section a loop task adds between Phase 3 and Phase 4; one line per cycle (number · relevance verdict · verify result · commit sha or no-commit reason). The loop's memory — replaces re-reading the transcript each cycle. See SPEC/loop.md.

**lazy-loaded** — Contract for `SPEC/*.md` modules and `claude/skills/*/SKILL.md` implementations: loaded on demand by the calling stub rather than read at every cold start. The glossary itself follows this pattern to protect one-task-per-window.

**[model]** — Optional short token in a task-line declaring the recommended cognitive-load tier for the work. Five rungs, matched by position rather than count: `[light]` < `[medium]` < `[heavy]` < `[frontier]` < `[xheavy]`. The primary trio is `[light]` / `[medium]` / `[heavy]`; `[frontier]` (glyph 💎) is chooser-assignable but trigger-reached only (contract/architecture design, high blast radius, heavy-epic Discovery, deep research) — round-up stops at `[heavy]`; `[xheavy]` (glyph 🔭) is a **manual-only** exploratory rung the operator files deliberately — an automated chooser (capped at `[frontier]`) must never assign it nor pick up an `[xheavy]`-tagged task, and it always lands the Step 1.5 ⚠️ under-tier advisory because no roster model bands at `xheavy` by default. Specific names `fable`, `opus`, `grok`, etc. remain valid. Read by `/ft-task` Step 1.5 before scaffolding. See SPEC §"Model field" and SPEC/model.md.

**micro-tasknote** — A single-section tasknote (do-the-work + recap only) used for work that exceeds the skip-the-tasknote threshold but is too small for the full 4-phase ceremony. Uses `templates/tasknote-micro-template.md`.

**one-task-per-window** — Core Principle #3: every tasknote is deliberately sized so the assistant can hold the entire scope (PLAN entry, checklists, files touched, tradeoffs, decisions) in one context window. The reason the full GSD-Pi `CONTEXT.md` was declined and only its glossary slice survived as a lazy doc.

**Operator-gate cues** — The up-to-two conditional approval banners the 4-phase workflow can surface: 🛠️ (Phase 1→2) and 📦 (ready-to-commit). Both are conditional; many tasks run end-to-end with only inline state markers. See SPEC §"Operator-gate cues".

**paper-complete** — Failure mode where PLAN.md / tasknote archive show Completed but the task's deliverables never landed in git. Prevented by the paper-complete guard: foreign-dirt hard stop at task entry, atomic single-commit closure (deliverables + PLAN + archive), ban on collateral Completed flips, and 🏁 only with a deliverable-covering SHA. See SPEC §"Paper-complete guard".

**parallel-safe-with** — Optional omit-when-absent tasknote frontmatter array of bare task IDs declaring which siblings may share worktrees with this child. Omitted means *undeclared*, not "safe with everyone." See SPEC §"Tasknote frontmatter" and docs/WORKTREES.md.

**parent epic** — The `CORE-EPIC-N` row in PLAN.md that owns a group of subtasks; remains unchecked until the closure of its last open child (normally the `.N` audit) flips it. See SPEC/plan-filing.md §"Epic parent flip".

**Pattern survey** — The mandatory first sub-step of Phase 2 Execution: examine sibling modules / parallel components / adjacent docs for an existing shape to extend before inventing a new one. See SPEC §"🛠️ Phase 2: Execution".

**Phase 1→2 (🛠️)** — The operator-gate cue emitted after Phase 1 Discovery when a significant scope deviation (Re-scope/De-scope always by default — under `--fast` a Re-scope downgrades to an inline ⚠️ notice; certain clarifications) was surfaced. `/ft-task` uses the `default-skip` flavor. See SPEC §"Operator-gate cues".

**Phase 3: Testing & Linting** — Targeted tests + lint/type-check on changed files; frontend changes add an 👁️ visual-confirmation prose ask in the **emphasized inline shape** — its own line, blank-line isolated, bold `**CONFIRM**` label — never a banner. See SPEC §"🧪 Phase 3: Testing & Linting" and SPEC/cue-vocabulary.md §"Emphasized inline ask shape".

**post-closure protocol** — The three steps that run after a tasknote is archived: commit decision (per Conditional skip rule), suggest-next-move (model-aware), copy-paste line. See `SPEC/post-closure.md`.

**PR / suggestion archetypes** — The eight shapes flaitron deliberately rejects in contributions: schema validators, abstractions without two-project precedent, cross-project query layers beyond the read-only visualizer, multi-user/team features, runtime security scanners / audit daemons, LLM knowledge-base / "wiki layer" subsystems, loop runtimes (runners / schedulers / session daemons), and graph / multi-agent execution runtimes. Terse AI-facing list lives in SPEC; prose mirror in VISION.md. See `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" and docs/VISION.md.

**priority level** — The PLAN.md heading under which a task row lives (`## High`, `## Medium`, etc.). The `[!critical]` flag can float a row inside High. See SPEC §"Priority levels".

**privileged-ops** — The Conditional skip signal: any changed non-documentation file (`.md` / `.mdx` / `.txt` / `.rst` / `.adoc` are exempt from the path half) under migrations/, auth/, security/secrets/, credentials/, or external integrations/, plus any diff — documentation included — containing uppercase credential keywords (`API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`). See SPEC/gates.md §"Conditional skip rule".

**probe** — A bounded, read-only sub-agent that answers one stated question for the session holding the tasknote. It owns no tasknote, never runs Phase 1, never trips a gate, and never closes or archives anything — it reads, searches, returns a distilled summary, and ends, so the parent's Discovery Notes get the findings instead of fifty tool calls. Judgment prompt, not a gate: skipping is always correct for a narrow read set. Brief + fixed return shape at `templates/subagent-probe-template.md`; contrast delegate. See SPEC §"📝 Phase 1: Discovery" and README.md §"Sessions, loops, and sub-agents".

**ready-to-commit (📦)** — The second (and final) operator-gate cue; bundles closure review, recap, and proposed commit message. Fires when the privileged-ops signal is hit or a bundled prompt is queued. See SPEC §"Operator-gate cues".

**Relevance Assessment** — The non-negotiable first substantive step of Phase 1 Discovery: explicit `Proceed` / `Re-scope` / `De-scope` verdict with one-line rationale. Re-scope or De-scope change the plan before any execution. See SPEC §"📝 Phase 1: Discovery".

**related-tasks** — Tasknote frontmatter array (and PLAN wikilinks) capturing predecessor, follow-up, and parent-epic relationships.

**review probe** — The Phase 3 external review: a probe with a fixed question, grading the working diff against the tasknote's `## ✅ Acceptance` rather than answering a written one. Read-only like any probe, and pointedly so — it grades and never patches; the fix is Phase 2's. Returns findings on two rungs: a **blocker** (a criterion does not actually hold) sends the run back to Phase 2, a **note** is recorded and fixed or filed. Its point is that the grader is not the author, self-evaluation being unreliable even where the criteria are machine-checkable. Claude Code runners use `/code-review medium`; others use `templates/subagent-probe-template.md` §"Variant — review probe". `N/A` on a diff too small to grade, which is why `/ft-micro-task` carries no such item. See SPEC §"🧪 Phase 3: Testing & Linting"; contrast probe, delegate.

**shortname** — The optional `| shortname` segment in a task-line (≤~30 chars); becomes the visualizer row title. Falls back to tasknote `title:` or the long description. See SPEC/task-line-segments.md.

**sidequest** — The lightest persistent mid-flow park, filed via `/ft-file-followup --park`; writes a tiny stub at `.flaitron/sidequest/<ID>.md` plus one PLAN line. Priority via a flag or one short question when omitted (flags: [`SPEC/tasknote-selection.md`](../SPEC/tasknote-selection.md) §"When to use a tasknote (and when not to)"). Skips the review gate and the reconciliation scan; replies with priority + resume anchor, then continues the main session inline. Promote via `/ft-micro-task` or `/ft-task` (or expand the stub by hand into a starter), deleting the stub on promotion. (Filed via the retired `/ft-sidequest` skill before v5.15.0 — the artifact is unchanged, only the invocation moved.)

**starter tasknote** — A tasknote whose YAML `status: starter`; a lightweight holding pen for work that is real but not yet ready for a full `/ft-task` invocation. Promoted through a special path (see SPEC/starter.md).

**starter promotion** — The Step 3a path in `/ft-task` that converts a `status: starter` tasknote into a normal in-progress one and continues at Phase 1.

**state-marker (🏁)** — The inline accomplishment summary emitted after the commit lands in the post-closure protocol (1-2 plain-English sentences + optional verification ask). Requires a real deliverable-covering SHA per SPEC §"Paper-complete guard".

**status (tasknote frontmatter)** — One of `not-started`, `in-progress`, `completed`, `starter`, or `blocked`. Drives the entire `/ft-task` dispatch logic (scaffold vs. promote vs. resume vs. error).

**submodule pin** — The deliberate, versioned consumption mechanism: adopters add flaitron as a git submodule pinned to a specific commit. Updates occur only via intentional bumps (see docs/MIGRATION.md).

**supersedes** — Optional omit-when-absent tasknote frontmatter array of bare task IDs, written on the *later* note only: this decision replaces that prior one. Distinct from the ⚠️ `Superseded by` pointer (factual-false forward write on the old note) and from Related prose labels `depends-on:` / `related-decision:` (not YAML keys). See SPEC §"Tasknote frontmatter".

**tasknote** — The self-contained markdown file (YAML frontmatter + 4-phase checklists + Discovery/Implementation/Testing/Closure notes) that holds the complete scope of one unit of work. Exactly one active tasknote per in-flight task.

**tasknote frontmatter** — The YAML block at the top of every tasknote (`title`, `status`, `created`, `related-tasks`, etc.). Most fields are write-once after scaffold. See SPEC §"Tasknote frontmatter".

**Testing & Linting (Phase 3)** — See Phase 3.

**touches** — Tasknote frontmatter array of path/glob strings naming the files this task expects to edit: its **declared scope**. Filled at Phase 1 on any task with file deliverables, reconciled against `git diff --name-only` in the Phase 4 recap as a recorded fact, never a gate. Omit-when-absent in shape (no validator) but omitted only when the task has no file deliverable. Distinct from a starter's `### Files to touch` prose survey. See SPEC §"Tasknote frontmatter".

**[unattended]** — Optional task-level opt-in marker in the task-line grammar, sitting AFTER `[model]`; declares a row safe to dispatch with no operator present, the row-scoped counterpart to the `--unattended` invocation posture. Flaitron never writes it itself — seeding is an operator act, per row at a filer's confirm gate or in bulk via `/ft-seed` — and operator-less callers deny by default on an unmarked row. On an attended `/ft-task` invocation with no flag, it implies `--fast` only, never the `--unattended` posture. See SPEC/task-line-segments.md and SPEC/unattended-candidacy.md.

**VISION.md** — The outward-facing identity document (who it's for, principles recap including Extension-first, "what we won't accept", why this exists). Lazy-loaded; cross-linked with the SPEC PR-archetypes subsection. Companion to PHILOSOPHY.md (history). See docs/VISION.md.

**wikilink [[TASK-ID]]** — The only parsed cross-reference syntax in PLAN long-descriptions and tasknote Related sections; populates `relatedTasks` / `blockedBy` metadata. Bare IDs and angle-bracket placeholders are literal text only. See SPEC §"Task-line format".

**worktree** — Isolated git checkout for one independent epic child (`<project>-worktrees/wt-<ID>/` alongside the project checkout, branch `wt-<ID>`, copy of the child tasknote). Operator-opt-in parallelism; the start procedure may warn on an open YAML `blocked-by` but must not lock. No skill — the hand-run procedure lives in docs/WORKTREES.md.

---

**Maintenance.** This file is the survivor slice of the GSD-Pi `CONTEXT.md` pattern (see CORE-194.1). It is deliberately lazy-loaded and must never be added to the AI-referenced docs list. New terms are introduced only by epic children or audit follow-ups that also update the authoritative SPEC anchors. Last significant update: CORE-741.2 (2026-10-08) — added the `[frontier]` rung to the `[model]` and `copy-paste line` entries.

See [SPEC.md](../SPEC.md) for the contract and [.flaitron/PLAN.md](../.flaitron/PLAN.md) for the current epic context.
