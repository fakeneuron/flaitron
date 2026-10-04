# Heartbeat loop — `.claude/loop.md`

One **cycle** of a recurring maintenance pass. The runtime (cadence,
re-invocation, session lifetime) belongs to `/loop` or any equivalent runner;
**this file is the per-cycle contract** the loop reports to. Contract details:
`.flaitron/core/SPEC/loop.md` (`SPEC/loop.md` in the flaitron repo).

Copy this file to `.claude/loop.md`, replace the **Duties** with your project's,
then run it under a loop runner. Each invocation executes **exactly one cycle**
of the steps below, in order.

> A heartbeat is a janitor, not a goal loop. It never converges on a single
> target — each cycle does **at most one** maintenance duty and files what it
> finds as a PLAN line for the operator to promote later. It is autonomous:
> it runs with `--fast` semantics (see `SPEC/loop.md` §"Gate collapse") and
> never pauses on a banner.

---

## 1 · Cycle pre-check (cheap — empty cycles are near-free)

Before scanning duties, run a **cheap** liveness check (a couple of reads /
greps — no full audit). This is the per-cycle relevance gate
(`SPEC/loop.md` §"Per-cycle relevance gate") specialized for heartbeats:

- Is there any plausible signal of work since the last cycle? (recent commits,
  new/unfiled items, a quick check that flips red)
- If **nothing plausible** → append one *empty-cycle* line to
  `.flaitron/LOOP-LOG.md` (§4), stop the cycle. No PLAN edit, no commit needed.
- If the Discovery-level assumptions this heartbeat was set up under no longer
  hold (the target moved) → log `stop` and terminate; hand back to the operator.

Empty cycles must stay near-free — resist turning the pre-check into a full pass.

## 2 · Duties (ordered — **first match wins**)

Walk the list top-to-bottom. The **first** duty that finds real work becomes
this cycle's *entire* work: do that one duty, write back (§3, §4), end the
cycle. The next cycle picks up wherever the ordering leads. One duty per cycle
keeps each cycle small and bounded ("one task per context window" under
repetition). Ordering **is** priority.

Replace the list below with your project's duties, cheapest-detection-first:

<!--
  WORKED EXAMPLE — flaitron self-host (dogfood). Replace for your project.

  1. Wikilink / cross-ref integrity — grep for dangling `[[TASK-ID]]` wikilinks
     and broken relative doc links. Found → file one ≤50w PLAN line per broken ref.
  2. Doc-drift — a count/claim in an AI-referenced doc (README, SPEC, GLOSSARY)
     that no longer matches code (e.g. skill-roster count, version pin). Found →
     file one ≤50w PLAN line naming the doc + the drift.
  3. PLAN hygiene — a stranded `## Completed` line out of place, a duplicate ID,
     or a filing over the 70w cap. Found → file one ≤50w PLAN line describing it.
  4. Quality smoke — if cheaply runnable, `npm --prefix viz run lint` / `typecheck`.
     A new failure → file one ≤50w PLAN line with the failing check.
-->

1. **<Duty name>** — <cheap detection>. Found → file per §3, log per §4, stop.
2. **<Duty name>** — <cheap detection>. Found → file per §3, log per §4, stop.
3. **<Duty name>** — <cheap detection>. Found → file per §3, log per §4, stop.

If **no** duty finds work, treat the cycle as empty (§1 empty-cycle path).

## 3 · Write-back — PLAN.md (one line per finding)

For each finding, append **one** task line to `.flaitron/PLAN.md`, under the
right priority section, using the task-line grammar
(`SPEC.md` §"Task-line format"):

- **≤50 words** (filing discipline — `SPEC/tasknote-selection.md`; hard cap 70w).
- Fresh sequential `<AREA>-<N>` ID; a `[model]` label; a short `| shortname`.
- Default priority **Low** / **Future Opportunities** for janitorial finds
  unless the finding is clearly High. Filing a line is a *proposal* — the
  operator prioritizes.
- **Guardrail against floods:** if one duty surfaces many findings of the same
  class (dozens), file a **single roll-up line** proposing a dedicated task
  instead of spamming PLAN with near-duplicates.

## 4 · Write-back — LOOP-LOG.md (one line per cycle)

Append **one** line per cycle (including empty cycles — this is the heartbeat's
proof-of-life) to `.flaitron/LOOP-LOG.md`. The log is the loop's memory and its
staleness signal: the **most-recent date is the de-facto `loop-last-run`**
(`SPEC/loop.md` §"Frontmatter keys") — a long-stale top line means the loop
stopped being re-invoked (sessions expire ~7 days; a heartbeat is babysitting,
not cron).

Line format:

```text
- YYYY-MM-DD · <empty | duty: "<name>"> · <no findings | filed AREA-N[, AREA-M]>
```

**Commit policy** (`SPEC/loop.md` §"Gate collapse" — commit-per-verified-iteration):
a cycle that filed a finding commits its PLAN + LOOP-LOG edits autonomously
(`chore: heartbeat — <one-line summary>`). Empty cycles append their
proof-of-life LOOP-LOG line and leave it for the next substantive cycle to
bundle — no per-empty-cycle commit noise.

## 5 · NEVER (the autonomous-safety envelope)

A heartbeat runs unattended. Filing a PLAN line is the **maximum** action. Never:

- **Open or scaffold a tasknote.** Promotion (`/ft-task <ID>`) is the operator's
  deliberate act; the heartbeat only files the PLAN line.
- **Edit or move `## Completed`, or flip any existing checkbox.** History is
  read-only; write-backs are strictly additive.
- **Run a destructive or irreversible command** (migration, `git push`, `rm`,
  release). Per `SPEC/loop.md` §"Gate collapse" the destructive escalation does
  **not** collapse under `--fast` — file a PLAN line describing the needed action
  instead, so the operator runs it under a real gate.
- **Chain to a second task or start unrelated work.** One duty, one cycle.

<!--
  Optional: bound an open-ended heartbeat with a `loop-max:` ceiling on the
  loop invocation (see `SPEC/loop.md` §"max-iterations budget"). Cadence is the
  runner's, never a field in this file — a stale LOOP-LOG date is the honest
  death signal, not a promised interval.
-->
