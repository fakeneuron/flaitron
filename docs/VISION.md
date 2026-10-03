# Flowtron — Vision

Flowtron is a workflow contract for one person managing a handful of solo AI-assisted coding projects. It exists to catch the agent before it wastes a session: the four phases, the Relevance Assessment, and the Acceptance criteria are the checkpoints where you look, and one task per context window is what keeps each one small enough to actually review — without scripts, daemons, databases, or schemas to maintain.

See [SPEC.md](../SPEC.md) for the contract and [PHILOSOPHY.md](PHILOSOPHY.md) for the history of how the shape got here.

## Who it's for

Solo developers running 2-5 side projects in parallel with an AI coding assistant. The fit is sharpest when:

- You are the only reviewer the agent gets — no team handoff, no second pair of eyes catching a bad session before it lands.
- You context-switch across multiple projects week-to-week and want one source-of-truth workflow shape, not a snowflake per repo.
- You use an AI assistant (Claude Code, Codex, or similar) for actual implementation, not just code review.

Flowtron is **not** for teams, monorepos at scale, large open-source projects with contributor onboarding, or non-code knowledge management.

## Principles

Recap of [SPEC.md](../SPEC.md) §"Core principles" — outward-facing. The contract version is canonical; this page is the identity statement.

- **Markdown over JSON.** Plans and tasknotes are markdown files: human-editable, AI-scannable in diffs, partial-update-safe. JSON is for tools that parse; nothing here does. *(SPEC #1)*
- **Zero scripts.** Every operation is `cp`, `mv`, or editing markdown. There is no `flowtron new`, no validator, no daemon (one operator-side fleet updater, `tools/update-adopters.mjs`, is the bounded exception — see [SPEC/scope-boundaries.md](../SPEC/scope-boundaries.md) §"What flowtron does NOT provide"). Skills wrap the same operations the user would run by hand. *(SPEC #2)*
- **One task per context window.** Tasknotes are sized so the assistant holds the whole scope in working memory: plan entry · checklist · files touched · tradeoffs. Anything larger becomes an epic with subtasks. *(SPEC #3)*
- **Relevance before action.** Every tasknote opens with a Relevance Assessment (`Proceed` / `Re-scope` / `De-scope`) — plans go stale faster than they're updated; killing zombie work is cheaper than executing it. *(SPEC #4)*
- **Versioned and pinned.** Adopting projects pin a specific flowtron commit. Updates ride a deliberate bump — no force-upgrades. *(SPEC #5)*
- **Extension-first.** Prefer extending an existing pattern (sibling skill, parallel doc convention, similar tasknote section) over inventing a parallel shape. Promoted to outward-facing principle from SPEC §"🛠️ Phase 2: Execution" → "Pattern survey" (the per-task contract step). *(VISION-only — not enumerated in SPEC §"Core principles", but operative throughout SPEC.)*

## What we won't accept

Future flowtron contributions — AI-suggested or human-PR'd — get filtered against this list. The AI-facing terse mirror lives in [SPEC/scope-boundaries.md](../SPEC/scope-boundaries.md) §"What flowtron does NOT provide" → "PR / suggestion archetypes flowtron does not accept" for mid-task discipline, one bullet per rejection, each naming the entry here that it mirrors.

This section is the **canonical** statement: the justification is written once, here, and every restatement elsewhere is a deliberate labeled mirror that points back to it. Beyond the SPEC list, several docs restate a *single* rejection as it applies to their own surface — [`SPEC/loop.md`](../SPEC/loop.md) §"Runtime vs. contract — the boundary" for loop runners, [`SPEC/gate-postures.md`](../SPEC/gate-postures.md) §"`--unattended` operator posture" for the operator-less posture, [EXTERNAL-AGENTS.md](EXTERNAL-AGENTS.md) §"Not an Orchestration Runtime" for multi-agent conventions, and [WORKTREES.md](WORKTREES.md) for fan-out. Those are *applications*, not duplicates: each is read in place by someone deciding something local, so the prose stays where the decision is made rather than collapsing into a link. The pattern is ratified in [CONVENTIONS.md](CONVENTIONS.md) §"Canonical source with labeled mirrors" and guarded at release time by `/ft-release` §7.1 Pair K, which checks that the citations and pointers still resolve.

- **Schema validators.** Markdown is the schema; the assistant catches drift. Adding a JSON-schema validator (or equivalent runtime checker) reintroduces the friction flowtron was built to remove — see the v0.1.0 history in [PHILOSOPHY.md](PHILOSOPHY.md). PRs that ship validation tooling are rejected; if drift is recurring, the answer is a sharper SPEC clause, not a validator.

- **Abstractions without two-project precedent.** A helper is only canonical when ≥2 projects need the same shape. One project's convenience function is a project-side helper, not a flowtron primitive. Three similar lines repeated across projects is cheaper than an abstraction layer that fits none of them well. PRs that promote a single-project pattern into flowtron are deferred until a second project's organic need surfaces. **The bounded exception is a declared caller surface** ([EXTERNAL-AGENTS.md](EXTERNAL-AGENTS.md) §"Stable surfaces for callers"): a surface with **one real out-of-repo consumer** is admissible when it costs the standalone workflow nothing — no new gate, no runner behaviour, no write flowtron performs on its own, and a project that never uses it sees the contract exactly as before. Flowtron may carry features that exist so a tool *around* it can adopt it, even ones flowtron never exercises internally; the `[handoff]` marker and the `[unattended]` candidacy proposals are the instances. The test is the standalone cost, not the consumer count — a surface that would add a pause or a write to an ordinary task still waits for the second project.

- **Cross-project query layers beyond the read-only visualizer.** Each project owns its own history. The read-only `viz/` Kanban is the *one* aggregated surface, intentionally scoped to "show me everything open, grouped by priority" — anything richer (queryable cross-project search, dependency graphs spanning repos, status APIs) is out of scope. The exception is documented and bounded; PRs that expand it without that boundary check are rejected.

- **Multi-user / team features.** Flowtron is a solo system. Assignment fields, reviewer queues, approval workflows, shared-state coordination, role-based access — none of these belong here. Teams have different needs and different existing tools; flowtron deliberately doesn't compete with them.

- **Runtime security scanners / agent-callable audit servers.** Markdown is the schema and the human at the gate is the control; an advisory risk-scorer — or an MCP "auditor" the agent calls into — adds attack surface and false confidence without an enforcement chokepoint. Deterministic enforcement (block-secrets, restrict-shell) belongs in per-project Claude Code permission hooks, not in flowtron. The markdown-native security need is already met by the `ft-audit` skill's `security` domain and [`SECURITY.md`](../SECURITY.md). PRs that ship audit daemons, scan scripts, or a fifth "Security Gate" lifecycle phase are rejected.

- **LLM knowledge-base / "wiki layer" subsystems.** A parallel `raw/` + `wiki/` + `instructions/` tree (the Karpathy "LLM wiki" pattern) duplicates what flowtron already is: tasknotes + `PLAN.md` + `archive/` *are* the clean, LLM-maintained markdown layer, and `[[wikilink]]` cross-references already exist. The good kernel — distill source once, then query the clean layer — is already the spine of the workflow (one task per context window; the Discovery archive-skim). PRs that ship a wiki subsystem, `/ft-wiki-*` ingest/query skills, a "Knowledge Gate" lifecycle phase, or consistency-linting health-checks are rejected for the same reasons as schema validators.

- **Loop runners, schedulers, and session tooling.** When a task is run under an iteration loop (a goal loop or a heartbeat), the *runtime* — cadence, re-invocation, cron scheduling, session lifetime — belongs to Claude Code's `/loop` or any equivalent runner, not to flowtron. A daemon that keeps sessions alive, a scheduler that fires tasks on a clock, or a `loop-interval` field baked into a tasknote all pull runtime state into what is meant to be a static markdown contract. The bounded exception, structurally parallel to the read-only visualizer: flowtron *does* ship the markdown **contract a loop reports to** — gate collapse, the `## 🔁 Iterations` log, the `loop:` / `loop-max:` / `loop-last-run:` frontmatter keys, and the `status: blocked` park as the destructive-action hard stop ([SPEC.md](../SPEC.md) §"Loop tasks"). Contract in flowtron, runtime in the runner; PRs that ship the runtime — a scheduler, a session daemon, or a cadence field — are rejected.

- **Graph / multi-agent execution runtimes.** Declaring that two epic children may run in parallel — `## 🌳 Fan-out` on a Discovery `.1`, YAML `blocked-by:` / `parallel-safe-with:` on the children — is a markdown fact, the same class as a PLAN `Blocked by [[ID]]` line. Scheduling those children, locking a worktree, auto-fan-out, or dispatching a swarm over those edges is a *runtime*, and flowtron will not become one. The bounded exception is already shipped: isolated git worktrees plus a fresh session per child ([WORKTREES.md](WORKTREES.md)), with the start procedure willing to **warn** on an open `blocked-by` and forbidden to refuse. Contract in flowtron, runtime with the operator; PRs that ship a job graph, a lock, or a multi-agent scheduler over those declarations are rejected like loop runners.

## Why this exists

The full history — what failed before, why each principle hardened, why the infrastructure is deliberately thin — lives in [PHILOSOPHY.md](PHILOSOPHY.md). The one-paragraph version: flowtron is what's left after keeping the workflow pattern that survived three concurrent side projects and throwing away every piece of infrastructure that didn't earn its weight. The contract in [SPEC.md](../SPEC.md) is the result; everything else is a project-side helper.
