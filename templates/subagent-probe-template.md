# Sub-agent probe — brief + return shape

A **probe** is a bounded, read-only sub-agent that answers one question for the
session holding the tasknote. It owns no tasknote, never runs Phase 1, never
trips a gate, and never closes or archives anything — it reads, searches,
returns a distilled summary, and ends. The point is that the *noise* stays in
the probe: the parent's Discovery Notes get the findings, not fifty tool calls.
Contract: `SPEC.md` §"📝 Phase 1: Discovery" (read step) and `README.md`
§"Sessions, loops, and sub-agents". A delegated context that *does* own a
tasknote is a **delegate**, not a probe — different rules, see the README.

This is a copy-paste artifact, not a lifecycle file. Nothing is written to
`.flaitron/`; the probe's return is pasted (or summarized) into the parent
tasknote's Discovery Notes by the session that spawned it.

---

## Brief (paste into the probe)

> **Question.** `<the one thing this probe answers — a single sentence>`
>
> **Where to look.** `<paths, globs, or "the whole repo" — narrow it if you can>`
>
> **Read-only.** Do not edit, create, move, or delete any file. Do not run
> anything that writes, installs, or hits the network. Do not commit.
>
> **Do not.** Do not open a tasknote, tick a checklist, judge scope, propose a
> plan, or fix anything you find. You are answering a question, not doing the
> task.
>
> **Return exactly the shape below** — nothing else. No transcript, no tool
> log, no narration of your search. If a section is empty, write `none`.

## Return shape (fixed)

```markdown
### Answer
<2-4 sentences. The direct answer to the question. Lead with the conclusion.>

### Files that matter
- `path/to/file.ext:LINE` — <why this one is load-bearing, one line>

### Evidence
<Only what the parent cannot cheaply re-derive: an exact signature, a
surprising value, a contradiction between two files. Quote sparingly.>

### What I did NOT check
<Paths skipped, searches not run, assumptions made. The parent needs to know
the edges of the answer.>
```

---

## Variant — review probe

The Phase 3 external review (`SPEC.md` §"🧪 Phase 3: Testing & Linting") is a
probe with a fixed question, so it gets a fixed brief instead of a written one.
Claude Code runners use `/code-review medium` and skip this section; every other runner
briefs a read-only sub-agent with the block below. The variance from the brief
above: the question is given, and the return is findings rather than an answer.

> **Question.** Does this diff meet the `## ✅ Acceptance` criteria below, and
> does it introduce anything the criteria did not anticipate?
>
> **The diff.** `<paste `git diff` / `git diff --stat`, or name the changed paths>`
>
> **The criteria.** `<paste the tasknote's `## ✅ Acceptance` block verbatim>`
>
> **Read-only.** Do not edit, create, move, or delete any file. Do not run
> anything that writes, installs, or hits the network. Do not commit. **Do not
> fix what you find** — you are grading, not patching.
>
> **Grade every finding into one of two rungs:**
> - **blocker** — a criterion above does not actually hold: unmet, or its verify
>   command passes without deciding it.
> - **note** — everything else worth saying: a defect, duplication, contract
>   drift, or a risk the criteria did not anticipate.
>
> **Return exactly the shape below** — nothing else. No transcript, no tool log.
> If a section is empty, write `none`.

```markdown
### Blockers
- `path/to/file.ext:LINE` — <which criterion fails, and why, one or two lines>

### Notes
- `path/to/file.ext:LINE` — <what, and why it is worth saying, one or two lines>

### What I did NOT check
<Paths skipped, criteria you could not evaluate from the diff alone, assumptions
made. The parent needs to know the edges of the grade.>
```

**The parent still decides.** A reviewer briefed this way has not read the
tasknote, so it will sometimes raise what Discovery already declined. The
session holding the tasknote weighs each finding, records the disposition in
Testing Notes, and owns whether a blocker really is one.

---

## Notes

- **One question per probe.** Two questions means two probes, or a wider brief
  that returns a muddier answer. Bundling is how a probe becomes an unbounded
  sub-agent.
- **Skipping is always correct.** For a narrow, known read set, reading the
  files directly is cheaper than briefing a probe and parsing its return.
- **The parent still owns the judgment.** A probe reports; it does not decide
  whether the task is still relevant, what the scope is, or what to do next.
  Those stay in the session that holds the tasknote.
- **No machinery.** Flaitron ships this brief and this return shape and nothing
  else — no runner, no dispatcher, no fan-out (`docs/VISION.md` §"What we won't
  accept"). Which sub-agent primitive spawns the probe is the operator's and
  the platform's business.
