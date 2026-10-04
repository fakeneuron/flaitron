# Loop tasks

> Lazy-loaded SPEC module. Loaded by `/ft-task --loop` at its Step 0 (and by a resume of a tasknote carrying `loop: true`), and consulted whenever a task is run under an iteration loop. See `SPEC.md` for the always-loaded core spec.

A **loop task** is a normal tasknote run under an iteration loop: the
assistant repeats Phase 2 → Phase 3 (execute → verify) against a fixed
Acceptance target until the target is met, a budget is exhausted, or a
per-cycle relevance check says stop. Goal loops (converge on a verifiable
outcome) and heartbeats (recurring maintenance passes) are the two shapes.
The goal shape is driven by `/ft-task --loop`; the heartbeat shape ships as a
ready-made per-cycle contract at
[`templates/loop-heartbeat-template.md`](../templates/loop-heartbeat-template.md)
(copy to `.claude/loop.md`, replace its Duties, run under a loop runner).

## Runtime vs. contract — the boundary

Flaitron answers *what* the assistant does and how it stays scoped. An
iteration loop adds *when it runs and how long it keeps going* — and that
half is **not** flaitron's to own.

**Claude Code's `/loop` (or any equivalent runner) is the runtime.** It
owns cadence, scheduling, re-invocation, and session lifetime. Flaitron
ships **no loop runner, scheduler, daemon, or session-state tooling** — see
[`docs/VISION.md`](../docs/VISION.md) §"What we won't accept".

**`SPEC/loop.md` is the contract the loop reports to.** Every termination
and safety property a loop needs already exists as a flaitron pattern; this
module names how they compose under repetition:

| Loop need | Flaitron pattern it reuses |
|---|---|
| Termination condition | `## ✅ Acceptance` criteria (met → stop) |
| "Still the right work?" | Core Principle #4 relevance gate, per-cycle |
| Runaway backstop | `loop-max:` hard iteration ceiling |
| Blast-radius control | `wt-<ID>` worktree isolation ([`docs/WORKTREES.md`](../docs/WORKTREES.md)) |
| Hard-stop escape hatch | `status: blocked` park ([`SPEC/blocked.md`](blocked.md)) |
| Loop memory | `## 🔁 Iterations` append-only log (below); the heartbeat shape logs to `.flaitron/LOOP-LOG.md` per [`templates/loop-heartbeat-template.md`](../templates/loop-heartbeat-template.md) |

"One tasknote per session" (README §"Sessions, loops, and sub-agents")
holds under looping: a loop **deepens within-task autonomy on exactly one
tasknote** — it never chains to a second task. That is why a loop can
inherit `--fast` semantics (below) without violating the sizing principle.

## Gate collapse

A loop is autonomous by construction — it cannot pause on a banner and wait
for the operator between cycles. So a loop task runs with **`--fast`
semantics** (see [`SPEC/gate-postures.md`](gate-postures.md) §"`--fast` operator override"):

- **🛠️ Phase 1→2 gate** — a one-time pre-loop event, unchanged. Discovery
  runs once before the loop starts; the 🛠️ exit gate fires or skips per
  `/ft-task`'s `default-skip` flavor. It is not re-run each cycle.
- **📦 ready-to-commit gate** — collapses to **commit-per-verified-iteration**.
  Each cycle whose verify command passes commits autonomously (behind the
  `✅` skip-marker, per the `--fast` force-skip); a cycle that fails
  verification does **not** commit — it retries or terminates. There is no
  per-cycle operator approval; the verify command is the gate.
- **👁️ visual-confirmation ask** — suppressed *inside* the loop, exactly as
  under `--fast`. A criterion that can only be judged by eye is not
  loop-verifiable; split it out to a one-time 👁️ ask outside the loop (the
  `--loop` Acceptance-criterion rule, `claude/skills/ft-task/step-5-loop-mode.md`
  §"Step 4"). Under `--unattended` that
  one-time ask does not vanish — it **parks** with
  `park-reason: visual-confirm — …`, per [`SPEC/gate-postures.md`](gate-postures.md)
  §"`--unattended` operator posture". The per-cycle suppression is unaffected:
  the loop never had an ask to convert.
- **External review** — collapses the same way, and for the same reason the
  taste checks do: it grades a diff, and the loop's termination condition is
  its verify commands. It runs **once**, after convergence, beside that
  one-time ask (`claude/skills/ft-task/step-5-loop-mode.md` §"Step 6"), never
  per cycle. Suppressed by neither flag; a **blocker** re-opens the loop rather
  than closure.

**Destructive-action carve-out.** The one thing that does **not** collapse
is the destructive 🗄️/▶️/📡/💻 escalation ([`SPEC/gates.md`](gates.md)
§"Destructive-action escalation"). `--fast`
never suppresses it, and a loop cannot fire a blocking banner into an
unattended session. So when a cycle needs a destructive or irreversible
command (a migration, a `git push`, an `rm`), the loop **parks the tasknote
via `status: blocked`** ([`SPEC/blocked.md`](blocked.md)) and stops — the
operator resumes with the destructive step under a real gate. Parking, not
banner-into-the-void, is the loop's hard-stop for irreversible actions.

## Per-cycle relevance gate

Core Principle #4 — *relevance before action* — generalizes from
once-per-task to **once-per-cycle**. Before each iteration the loop asks:
*is another iteration still the right work?* Concretely, a cycle is skipped
or the loop terminates when:

- All `## ✅ Acceptance` criteria already pass (goal met — the normal
  clean exit).
- The cycle's intended change is empty / a no-op (a heartbeat pass with
  nothing to do — near-free, log it and move on).
- Discovery-level assumptions no longer hold (the target moved) — terminate
  and hand back to the operator rather than converge on stale intent.

A relevance `stop` is a **clean termination, not a failure** — the loop
ends because the work is done or no longer right, exactly as the once-per-
task gate would refuse to start stale work.

## max-iterations budget

`loop-max:` sets a hard ceiling on cycles, **independent of** the per-cycle
relevance gate. The relevance gate stops the loop when the work is done;
`loop-max` stops it when the work *won't* converge — a backstop against a
loop that keeps finding "one more thing" past the point of diminishing
return. Reaching `loop-max` without meeting Acceptance is a **soft stop**:
the loop halts, the `## 🔁 Iterations` log records budget-exhaustion, and
the tasknote is handed back to the operator (not auto-parked, not
auto-closed — the operator decides to raise the budget, re-scope, or park).

## `## 🔁 Iterations` log

Loop tasks add one append-only section to the standard tasknote body,
between Phase 3 and Phase 4:

```markdown
## 🔁 Iterations

- **1** · relevance: proceed · verify: ✅ pass · committed `a1b2c3d`
- **2** · relevance: proceed · verify: ❌ fail (2 assertions) · no commit → retry
- **3** · relevance: proceed · verify: ✅ pass · committed `e4f5g6h`
- **4** · relevance: stop (Acceptance met) · loop terminated
```

One line per cycle: iteration number, relevance verdict, verify result, and
the commit sha (or the reason no commit landed). The log is the loop's
**memory** — it replaces re-reading the transcript each cycle, and the
iteration count against `loop-max` is readable at a glance. Append-only:
cycles are never rewritten, matching the write-once spirit of the archive.

## Frontmatter keys

Three **additive** keys extend the tasknote frontmatter for loop tasks.
Additive per the write-once policy (`SPEC.md` §"Tasknote frontmatter") —
legacy and non-loop tasknotes omit them, and tools ignore them when absent.

| Key | Value | Meaning |
|---|---|---|
| `loop:` | `true` \| `false` | Marks the tasknote as a loop task; the content trigger that loads this module |
| `loop-max:` | integer | Hard iteration ceiling (the budget above) |
| `loop-last-run:` | `YYYY-MM-DD` | Date of the most recent cycle — staleness signal for heartbeats (a long-stale `loop-last-run` means the loop stopped being re-invoked) |

**No `loop-interval` key — deliberate.** Cadence (every N minutes, on a
cron, on demand) belongs to the `/loop` *invocation* — the runtime — not to
the tasknote *file* — the contract. Baking an interval into the tasknote
would pull scheduler state into flaitron, which the runtime/contract
boundary above explicitly keeps out. A heartbeat's honest death signal is a
stale `loop-last-run:`, not a promised interval the file cannot enforce.
