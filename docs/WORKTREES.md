# Worktree Convention for Parallel Epic Children

Flaitron's default execution model is strictly serial within a tasknote and serial across siblings under an epic. For adopters with large backlogs of *independent* children (e.g. a 20-child follow-up wave after a discovery epic), the stash/branch-swap overhead becomes real.

This document records the adopted convention for executing independent epic children in isolated git worktrees. It is a direct adoption of the `using-git-worktrees` pattern from obra/superpowers, lifted into flaitron as this convention doc plus the [Procedure](#procedure) below — a handful of git commands each way, run by hand or by whatever agent is in the session. The pattern is **workflow-orthogonal**: it does not change the 4-phase contract, the relevance gate, or any post-closure protocol inside a tasknote.

See [[CORE-EPIC-215]] (and its .1 Discovery [[CORE-215.1]]) for the origin, locked decisions, and sibling precedent [[CORE-EPIC-195]].

## The Five Locked Conventions

| Area                  | Choice                                      | Rationale |
|-----------------------|---------------------------------------------|-----------|
| Location              | `<project>-worktrees/wt-<TASK-ID>/`, a sibling of the project checkout | Keeps the primary project checkout clean; mirrors the `viz/` co-location pattern used in flaitron self-host. Derived from the checkout rather than a fixed home path, so it is correct wherever a project lives — and for projects under the viz workspace root it resolves inside it, so global viz scans (`${FLAITRON_VIZ_WORKSPACE:-~/code}/*/.flaitron/PLAN.md`) continue to work without special config. |
| Branch naming         | `wt-<TASK-ID>` (e.g. `wt-CORE-215.3`)      | Short, unambiguous, instantly recognizable as a flaitron worktree; avoids collision with normal feature branches. |
| Skill naming          | *Demoted* — no skill; the [Procedure](#procedure) below is the executable form | Shipped as `/ft-worktree-start` + `/ft-worktree-end` from CORE-215.3/.4; [[CORE-572]] retired both after 3.5 months with no `wt-` branch ever created here or in an adopter. The bodies were shell wrapping around the four commands each way, so the doc now carries them directly. |
| Tasknote handling     | Copy the active tasknote into the worktree | The agent working in the isolated checkout needs the full Phase 1 context (Goal, Acceptance, Discovery Notes, resolved questions). Copy is simple, reviewable, and avoids symlink/hardlink edge cases across machines. |
| Merge / cleanup       | Verify merge (or explicit discard), `git worktree remove`, archive the *copied* tasknote from the *main* checkout | The worktree is a throwaway execution environment. Cleanup discipline lives in the end procedure so the main checkout's archive and git history remain the source of truth. |

All five choices were explicitly resolved during the re-scope documented in CORE-EPIC-215 (and its Discovery child CORE-215.1); the skill-naming row was revised by [[CORE-572]]. Future changes require a new tasknote + rationale.

## When to Reach for a Worktree

Use a worktree **only** for independent children of a multi-child epic:

- The epic has a `.1` Discovery that filed the children (or equivalent explicit scoping).
- The specific child has **no hard dependencies** on prior siblings still in flight. The durable form of that claim is the child's own YAML `blocked-by:` / `parallel-safe-with:` (echoed from the Discovery `.1` `## 🌳 Fan-out` heading — see [Fan-out, YAML, and the start warn](#fan-out-yaml-and-the-start-warn) below). Omitted YAML means *undeclared*, not "safe with everyone."
- You want to pipeline two or more such children on the same machine without constant stashing.

Do **not** use for:
- Single-task work
- Dependent children (where order or shared state matters)
- Main-line development on `main` / your primary branch
- Anything that would require the worktree to become long-lived

The convention is deliberately narrow so the procedure stays a handful of commands and the mental model stays simple.

## Fan-out, YAML, and the start warn

Three surfaces, one claim:

| Surface | Who writes it | What a worktree sees |
|---|---|---|
| Discovery `.1` `## 🌳 Fan-out` | `/ft-epic-discovery` when M>1 | **Nothing** — the worktree copies only the child note |
| Child YAML `blocked-by:` / `parallel-safe-with:` | `/ft-task` scaffold echo | The copied child note |
| Start-procedure warn | Whoever runs the [Procedure](#procedure) reads the child YAML | Warns if `blocked-by` lists a still-open PLAN `- [ ]` line; never locks or refuses |

Independence is no longer verbal-only, but it is still operator-driven. Fan-out is a markdown declaration, not a scheduler — see [`SPEC/epic.md`](../SPEC/epic.md) §"Fan-out" and [`docs/VISION.md`](VISION.md) §"What we won't accept" (graph / multi-agent execution runtimes).

## Procedure

Both halves run from the **main** checkout (`git rev-parse --git-dir` must not contain `/worktrees/`), with a tasknote already filed for `<TASK-ID>` — typically after its Phase 1 Discovery has run, so the copy carries the resolved scope.

**Start:**

```sh
TASK_ID=CORE-215.3                                    # the child to isolate
ROOT=$(git rev-parse --show-toplevel)
WT_DIR="$(dirname "$ROOT")/$(basename "$ROOT")-worktrees/wt-${TASK_ID}"

git show-ref --verify --quiet "refs/heads/wt-${TASK_ID}" && echo "branch exists — pick: reuse, delete, or abort"
test -e "$WT_DIR" && echo "dir exists — a prior start never ended; inspect before removing"

git worktree add -b "wt-${TASK_ID}" "$WT_DIR"          # branch from HEAD + checkout in one step
git -C "$WT_DIR" submodule update --init               # adopters: `add` leaves .flaitron/core empty, and the skills stop without it
mkdir -p "$WT_DIR/.flaitron/tasknote"
cp ".flaitron/tasknote/${TASK_ID}.md" "$WT_DIR/.flaitron/tasknote/"
cp ".flaitron/tasknote/README.md"     "$WT_DIR/.flaitron/tasknote/"   # area table for the worktree session
```

The `submodule update` line is a no-op in a checkout with no submodules; in an adopter it checks out the pinned `.flaitron/core`, and [MIGRATION.md](MIGRATION.md) §1.1's sparse-checkout line can be re-run inside the worktree to trim it the same way. Before `add`, read the child's YAML: if `blocked-by:` names a PLAN line that is still `- [ ]`, **warn** and let the operator decide — never refuse. Then hand off: open a *fresh* session in `$WT_DIR` and run `/ft-task <TASK-ID>` there (with `--loop` for a goal loop — run Phase 1 in main first, isolate, then re-invoke with the flag). The main-checkout tasknote stays untouched; it is the coordination point until the end half runs.

**End:**

```sh
git branch --merged | grep -q "wt-${TASK_ID}" || echo "NOT merged — merge first, or confirm an explicit discard"
git log --oneline "HEAD..wt-${TASK_ID}"                 # what the branch carries beyond HEAD

cp "$WT_DIR/.flaitron/tasknote/archive/<area>/${TASK_ID}.md" ".flaitron/tasknote/archive/<area>/"   # skip on discard
git -C "$WT_DIR" status --porcelain | grep -q . && echo "dirty — commit or stash inside it first" \
  || git worktree remove --force "$WT_DIR"            # --force only because git refuses any worktree with an initialized submodule (an adopter's .flaitron/core)
git branch -D "wt-${TASK_ID}"                          # optional; the reflog keeps it recoverable for a while
```

Three rules the commands above encode, worth stating plainly:

1. **Main checkout only.** Both halves run from the primary tree — the one with the full archive and the merge target.
2. **Check for collisions before `add`.** An existing `wt-` branch or worktree dir is a prior start that never ended; inspect, don't clobber.
3. **Merged or explicit discard before `remove`.** Never delete an unmerged branch's work without the operator saying so; the `cp` of the archived tasknote is belt-and-suspenders for the merge that normally brings it over.

A `git branch --list 'wt-*'` with no matching `git worktree list` entry is an orphan from a start that never ended — clean it the same way.

## Relationship to the Rest of Flaitron

- **No 4-phase change inside a worktree.** The relevance gate, operator cues (🛠️ / 📦), conditional skip rule, and post-closure protocol are unchanged inside any tasknote that happens to run here. Fan-out / child YAML (CORE-445.3) is a planning declaration, not a second lifecycle.
- **Epic lifecycle still governs.** The `.1` Discovery + children + `.N` Audit bracket (see [`SPEC/epic.md`](../SPEC/epic.md)) owns multi-child work; worktrees are the execution accelerator for the independent subset, declared on `.1` as optional `## 🌳 Fan-out`.
- **Adopter wiring.** None — the procedure is this doc. Adopters who wired the retired skill pair see its dangling symlinks at their next `/ft-update` (`docs/MIGRATION.md` §"Retired skills leave dangling symlinks").
- **External CLI agents.** Worktrees are the isolation layer for running independent children in parallel; [`docs/EXTERNAL-AGENTS.md`](EXTERNAL-AGENTS.md) adds the "one external agent per tasknote" convention on top — hand each worktree-isolated child to a single external agent (Kiro / Claude Code / Codex).

## Open Questions (None)

All scoping decisions for the convention itself were locked before this document was authored. Implementation details that surfaced during [[CORE-215.3]] / [[CORE-215.4]] were recorded in those tasknotes; [[CORE-279]] hardened the end half; [[CORE-572]] folded both into the procedure above.

---

**Related:** [[CORE-EPIC-215]] · [[CORE-215.1]] · [[CORE-215.3]] · [[CORE-215.4]] · [[CORE-215.5]] · [[CORE-215.6]] · [[CORE-279]] · [[CORE-572]] (skills → procedure) · [[CORE-EPIC-195]] (sibling pattern) · [[CORE-EPIC-445]] (Fan-out + warn-only start)
