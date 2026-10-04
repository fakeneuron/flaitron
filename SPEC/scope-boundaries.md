# Scope boundaries — cross-repo edits, and what flaitron does not provide

> Lazy-loaded SPEC module. Read when Discovery surfaces work belonging to a different repo, or when evaluating whether a feature, helper, or PR belongs in flaitron at all. See `SPEC.md` for the always-loaded core spec.

## Cross-repo edit remit

A tasknote's deliverable lands in the repo whose session opened it. When
Discovery surfaces work that belongs in a different repo — a doc, config,
or code change outside this checkout — **file it there** (a PLAN.md line,
a starter tasknote, or a routed ticket) rather than editing it directly
from this task cycle. The target repo's own `/ft-task` cycle (or
equivalent) executes it, with its own Discovery, Acceptance, and closure
commit. This makes the boundary symmetric with the routing convention
adopting projects already enforce in the other direction — a task that
finds a flaitron-side issue files a `CORE-` ticket and routes it, rather
than fixing flaitron directly from that project's session.

**CORE-483.3 exception.** One tasknote predates this rule: it edited two
`.gitignore` files in a sibling operator-private repo directly as its whole
deliverable — deliberate, recorded, flaitron-side commit only. That precedent stands as
the single documented exception, not a license — like the CLI and
cross-project-query carve-outs below, it
does not extend to future tasks.

## What flaitron does NOT provide

To prevent scope creep, flaitron deliberately omits:

- A CLI tool (use `cp`, `mv`, and your editor) — with one carved-out
  exception: [`tools/update-adopters.mjs`](../tools/update-adopters.mjs), the
  operator-side batch updater that walks the workspace and moves each
  adopter's pinned submodule to the latest non-breaking release (dry-run by
  default, local commits only, never pushes). It maintains the fleet *around*
  flaitron-adopting projects, not the workflow inside one — like viz under
  the query-API exclusion, it is the singular exception, not a precedent.
- Schema validation (markdown is the schema; the assistant catches drift)
- A database backend (markdown files in git are the database)
- Cross-project query API (each project owns its history; the read-only
  visualizer is a single global instance — a multi-project query API is
  not; like the CLI carve-out above, it is the singular exception, not a
  precedent)
- Per-project CI hooks (those belong in the adopting project)

If you find yourself wanting these, write a project-side helper. Do not add
them to flaitron.

## PR / suggestion archetypes flaitron does not accept

For future-AI mid-task discipline. Outward-facing prose version with full justification lives in [`docs/VISION.md`](../docs/VISION.md) §"What we won't accept".

- **Schema validators.** PR-rejection mirror of "Schema validation" above — markdown is the schema; runtime checkers reintroduce the friction the v0.1.0 cut removed.
- **Abstractions without two-project precedent.** Promote a helper into flaitron only when ≥2 projects need the same shape. Three similar lines is cheaper than premature abstraction. Bounded exception, per `docs/VISION.md` §"What we won't accept": a declared caller surface with one real out-of-repo consumer is admissible when it costs the standalone workflow nothing — no gate, no runner behaviour, no flaitron-performed write.
- **Cross-project query layers beyond the read-only visualizer.** PR-rejection mirror of "Cross-project query API" above — viz is the singular exception; anything richer is out of scope.
- **Multi-user / team features.** PR-rejection mirror of "Multi-user / team features" in `docs/VISION.md` §"What we won't accept" — solo system; teams use a different tool.
- **Runtime security scanners / audit daemons.** PR-rejection mirror of "Runtime security scanners" in `docs/VISION.md` §"What we won't accept" — the control is the human at the gate, not a scorer; deterministic enforcement lives in per-project permission hooks. `ft-audit security` + `SECURITY.md` already cover the markdown-native need.
- **LLM knowledge-base / "wiki layer" subsystems.** PR-rejection mirror of "LLM knowledge-base" in `docs/VISION.md` §"What we won't accept" — tasknotes + `PLAN.md` + `archive/` already are the clean LLM-maintained markdown layer; a parallel `raw/`+`wiki/` tree duplicates the SSOT. "Knowledge Gate" phase, `/ft-wiki-*` skills, and link-linters are rejected like schema validators.
- **Loop runtime — runners, schedulers, session daemons.** PR-rejection mirror of "Loop runners" in `docs/VISION.md` §"What we won't accept" — the loop *runtime* (cadence, re-invocation, session lifetime) is Claude Code's `/loop` or any equivalent, not flaitron. Flaitron ships only the markdown *contract* the loop reports to ([`SPEC.md`](../SPEC.md) §"Loop tasks" → [`SPEC/loop.md`](loop.md)); a scheduler, a session daemon, or a `loop-interval` tasknote field is rejected like a cross-project query layer.
- **Graph / multi-agent execution runtimes.** PR-rejection mirror of "Graph / multi-agent execution runtimes" in `docs/VISION.md` §"What we won't accept" — declare fan-out, `blocked-by`, and `parallel-safe-with` in markdown; never schedule, lock, or auto-fan-out. Worktrees plus a fresh session per child remain the whole parallelism mechanism ([`docs/WORKTREES.md`](../docs/WORKTREES.md)). A job graph, swarm runner, or lock over those declarations is rejected like a loop scheduler.
