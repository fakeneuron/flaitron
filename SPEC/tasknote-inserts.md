# Optional tasknote inserts — Fan-out and Handoff

> Lazy-loaded SPEC module. Read when writing one of the two optional top-block sections a tasknote may carry: `## 🌳 Fan-out` (epic-cohort parallelism, on a Discovery `.1` when M>1) or `## 🔄 Handoff` (mid-task resume state). Neither ships in `templates/tasknote-template.md`, and a tasknote without them is complete, not incomplete. See `SPEC.md` §"Tasknote body shape" for the standard layout and the always-loaded core spec.

## 🌳 Fan-out (optional)

An epic Discovery `.1` that files more than one implementation child
(M>1) may declare how those children relate — which may run in parallel
worktrees, which stay serial, which is synthesis. It sits in the top
block after `## 🔗 Related`. `/ft-open-epic` pre-fills an empty
placeholder at scaffold when M>1 and populates it when the child lines
are filed; the default full template does not ship the heading, so a
single-child or non-epic tasknote pays nothing. Fixed shape, three
rows:

```markdown
## 🌳 Fan-out

- **Parallel:** [[CORE-445.2]] · [[CORE-445.3]]
- **Sequential:** [[CORE-445.4]] after .2
- **Synthesis:** [[CORE-445.N]] (audit; no extra parent synthesis task)
```

Omit a row that does not apply. When Discovery does not classify,
default every implementation child to Sequential and `.N` to Synthesis
— that matches [`SPEC/epic.md`](epic.md) "run children in order."
M=1 epics skip the heading (nothing to fan out).

Each named child also gets a Related type-hint. The YAML echo onto each
child, and the warn-never-lock rule — a declaration, not a scheduler — are
the lifecycle's: [`SPEC/epic.md`](epic.md) §"Fan-out". Isolation convention:
[`docs/WORKTREES.md`](../docs/WORKTREES.md).

## 🔄 Handoff (optional)

A session ending mid-task — context exhausted, the operator stopping for the
day, the work continuing in a different tool — can leave a **Handoff**: a
short brief that lets the next reader resume without reconstructing state
from Discovery Notes and a half-ticked Phase 2. It sits in the top block
after `## 🔗 Related` (and after `## 🌳 Fan-out` when that heading is
present), because a resuming reader should meet it before the
execution record. Fixed shape, five parts:

```markdown
## 🔄 Handoff

- **Goal + Acceptance status** — what is done, what is left, which criteria are green.
- **Key decisions** — choices already made that the next session must not relitigate.
- **Open questions** — what is genuinely undecided, and who decides it.
- **Relevant paths** — the files actually in play, not the whole read set.
- **Next step** — the single concrete action to take first.
```

Write one when it is cheaper than the cold read it replaces. A task that
finishes in one session never needs one — which is exactly why this is
documented rather than templated: the happy path pays nothing.

**What a Handoff is not.** Three neighbouring surfaces already exist, and
reaching for the wrong one loses information:

- **Not a park.** A hard dependency parks the tasknote via `status: blocked`
  ([`SPEC/blocked.md`](blocked.md)), preserving Phase 1 and partial
  Phase 2 verbatim and stopping the workflow. A Handoff has no blocker — the
  work can continue, just not in this session.
- **Not a sidequest.** A sidequest stub's `## Resume anchor` records where the
  *main* session was when a tangential idea fired; it belongs to a different,
  newly filed task. A Handoff belongs to *this* one.
- **Not the handoff contract.**
  [`docs/EXTERNAL-AGENTS.md`](../docs/EXTERNAL-AGENTS.md) §"The Handoff Contract"
  transfers a *whole tasknote* to another agent after Phase 1 — ownership
  moves, and the three repo files already suffice with nothing extra written.
  Same word, different concept: there, someone else takes the task; here, the
  same task's next session picks it up.

The tasknote stays the primary resume point either way
([README.md](../README.md) §"Agent memory"). A Handoff makes that read cheaper;
it never replaces it.
