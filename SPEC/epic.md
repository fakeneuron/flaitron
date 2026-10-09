---
paths: ['*-EPIC-*.md', '*.[0-9]*.md']
---

# Epic lifecycle

> Lazy-loaded SPEC module. Loaded by `/ft-task` when the task ID matches `<AREA>-EPIC-<N>` or `<AREA>-<N>.<sub>`. See `SPEC.md` for the always-loaded core spec.

Some epics — particularly **code sweeps** and **major multi-child features** —
benefit from bracketing their implementation children with two coordination
tasks: an **opening Discovery** subtask that surveys the codebase and files
the children, and a **closing Audit** subtask that verifies the completed
work sits well in the codebase as a whole. The Discovery + Audit shape
catches scoping misses up front and integration misses at the end. Simpler
implementations don't need it — apply judgment.

This is *epic-level* Discovery, distinct from the per-tasknote Phase 1
Discovery (§"The 4-phase workflow"). Phase 1 Discovery scopes one task; an
epic Discovery subtask scopes the whole epic and produces the child task
list filed in PLAN.md.

**Numbering convention.** Discovery is the first child (`<AREA>-<N>.1`);
the audit is the terminal child, filed as the reserved suffix `<AREA>-<N>.N`.
Both are normal subtasks — same grammar, same 4-phase tasknote, same model
rules. `.N` is **grammar-legal and permanently valid** (parser accepts
`\.(?:\d+|N)` in the subtask slot), so the audit child never needs renaming
to a sequential number at epic-close time. When an epic grows, new
implementation children insert *before* `.N` (`.2`, `.3`, …); `.N` always
remains the last child. An audit child already renamed to a concrete number
stays valid — both forms parse.

**Lifecycle:**

1. **File the epic** with a Discovery subtask (`.1`) and a placeholder Audit
   subtask at the end. Implementation children may be empty at filing — the
   Discovery subtask populates them.
2. **Run Discovery** via `/ft-epic-discovery` (which also files the epic in
   step 1) or `/ft-task <ID>.1` if filed manually. Deliverable: filed child
   entries in PLAN.md, not code.
3. **Run children** in order, normal flow. That serial default
   stands. Parallel execution of *independent* children is
   operator-opt-in via worktrees
   ([`docs/WORKTREES.md`](../docs/WORKTREES.md)), declared on the
   Discovery `.1` as optional `## 🌳 Fan-out` (below) — never a
   scheduler, never a lock.
4. **Run Audit** via `/ft-close-epic <ID>.N` (or `/ft-task <ID>.N`; legacy
   epics with a numeric audit child pass that number instead) once all
   implementation children are closed. Final summary records findings even
   when nothing is wrong. The closure that leaves every child `[x]` flips the
   parent too (§"Child placement invariant" below).
5. **Audit follow-ups.** Misses surfaced by the audit get filed as new
   numeric children (the next `.<k>` after the highest existing numeric
   child; they slot before the terminal `.N`) **by the audit itself, in its
   closure commit**. An open child keeps the parent open, so the parent flip
   waits for the last follow-up's closure. Filing after the audit closes is
   too late: by then its closure has already flipped the parent. For a few
   small follow-ups, close the audit and execute them as normal children.
   For many, also file a fresh Audit subtask to cover the second wave.

**Child placement invariant.** While the parent epic remains active, Phase 4
closure checks each child and rewrites it to the standard stub form but keeps
the row 2-space nested beneath the parent in its current priority section.
Never move an individual numeric or `.N` child to top-level `## Completed`.
The closure that leaves every child `[x]`, whichever runner made it, flips the
parent and moves it with its complete nested cohort atomically into
`## Completed`, with no prompt
([`SPEC/plan-filing.md`](plan-filing.md) §"Epic parent flip").

## Fan-out (optional)

The parent epic stays a PLAN checkbox. There is no parent planning
tasknote. When Discovery files M>1 implementation children, the `.1`
note may carry an optional `## 🌳 Fan-out` insert naming Parallel /
Sequential / Synthesis rows — its shape, placement, and unclassified
default are [`SPEC/tasknote-inserts.md`](tasknote-inserts.md)
§"🌳 Fan-out (optional)".

Each child **echoes** the claim on its own tasknote as omit-when-absent
YAML `blocked-by:` / `parallel-safe-with:` (bare IDs) so a worktree —
which copies **only** the child note — still sees it. `/ft-task`
scaffold for an epic implementation child copies any Fan-out claim that
names it. Omitted YAML means *undeclared*, not "touches nothing" / "safe
with everyone."

Whoever starts a worktree for the child (`docs/WORKTREES.md`
§"Procedure") may **warn** if its `blocked-by` lists a still-open PLAN.md
line (`- [ ]`). It must not lock or refuse — the operator decides. Declaring Fan-out does not authorize chaining two
tasknotes in one window, auto-dispatch, or a job graph. See
[`docs/WORKTREES.md`](../docs/WORKTREES.md) and
[`docs/VISION.md`](../docs/VISION.md) §"What we won't accept".

## Audit acceptance — fixed doc-drift line

Every audit subtask's
`## ✅ Acceptance` includes a doc-drift sweep across
`.flaitron/tasknote/README.md` §"AI-referenced docs": for each entry,
"no change" or the update. Always present — ticks fast when nothing
drifted, surfaces the cumulative slice-local staleness that per-task
Phase 4 closures can miss.

**Skills.** The filing-and-Discovery side of the lifecycle (steps 1-2
above) is codified in `claude/skills/ft-epic-discovery/`; the audit-and-close
side (steps 4-5) is codified in `claude/skills/ft-close-epic/`. Both are
auto-wired into adopter projects via `claude/skills/ft-new-project/SKILL.md`
Step 3 + `docs/MIGRATION.md` §1.2.

**Optional deep pre-pass.** For high-uncertainty epics — those where the
shared design surface, contract impact, or per-child scope is genuinely
unclear at filing time — `/ft-epic-discovery --deep` stages a
`constitution → specify → clarify` pre-pass before Phase 1 Discovery,
with structured-ask review-and-confirm gates between stages. The
default flow is unchanged; reach for `--deep` only when upfront staging
is worth the extra interruption. Contract details live in the skill.
