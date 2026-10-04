# Why Flaitron Exists

Flaitron is a workflow system for one person. The person is me, and the work is solo AI-assisted coding across a handful of side projects. This document is the "why" — the things `SPEC.md` deliberately leaves out because they're history, not contract.

## The actual problem

By early 2026 I was running three projects in parallel — fintown, InvisiPaw, photard — all built with Claude Code, all with their own homegrown workflow tooling. Each had drifted in a different direction:

- **fintown** had a `plan.json` file, three Python helper scripts (`create_tasknote.py`, `archive_tasknote.py`, `validate_plan.py`), a `WORKFLOW.md`, and a `TASKNOTE_QUICK_REFERENCE.md`. Tasknotes were validated against a JSON schema. The scripts mostly worked. The schema was mostly accurate. "Mostly" turned into a tax every time I context-switched.
- **InvisiPaw** had a single PLAN.md and free-form tasknotes. Lighter, but the assistant kept inventing slightly different tasknote shapes each session because there was no template.
- **photard** had the lightest setup of the three — a PLAN.md, a few notes, and good intentions. It was the cleanest, but only because it was the youngest. Given another six months it would have grown its own dialect too.

The shared symptom was drift. Every project's workflow was a slightly different snowflake, and every Claude Code session was effectively re-learning local conventions before doing any actual work. The cost wasn't visible per session — it was visible across projects.

## What I tried first, and why it didn't stick

The obvious move was to standardize. I kept a `TasknoteSystem/` reference folder with scripts, templates, and validators — the idea was that each project would copy or symlink from it.

That didn't work. Two reasons.

First, the scripts were the wrong abstraction. They existed because JSON plans needed validation. JSON plans needed validation because nothing else could read them. But Claude can read markdown directly and notice when a tasknote is missing a section — the validator is the assistant, not a script. Once I admitted that, the scripts had no job left.

Second, copying the reference into each project meant the projects diverged again the moment I tweaked one of them. Standardization without versioning is just a slower flavor of drift. The reference folder was supposed to fix the snowflake problem; it just made bigger snowflakes.

## What stuck across all three

When I cleared away the project-specific debris, the same shape kept showing up:

- A **PLAN.md** at the project root with priority headings and a completed section.
- **Tasknotes** for non-trivial work — one markdown file per task, with checklist phases.
- A **4-phase rhythm**: Discovery → Execution → Testing → Closure. The phases were named differently in each project, but the rhythm was the same.
- A **relevance gate** at the start of every tasknote — "is this still the right work?" — because plans go stale faster than I update them.
- A **model-routing signal** per task — I was constantly burning Opus tokens on mechanical work, or worse, trying to do design work on Sonnet and not noticing the quality drop. (In the current system, this is the `[model]` tag on the PLAN.md task line, not a field inside the tasknote.)

The pattern was robust. The infrastructure around it wasn't. Flaitron is what's left when you keep the pattern and throw away the infrastructure.

## The decisions that fall out

**Markdown over JSON.** JSON exists when something other than a human or a language model needs to parse the file. Nothing else parses my plans. Markdown reads naturally in diffs, edits cleanly, and survives partial-update interruptions without becoming syntactically invalid. JSON has none of those properties.

**Zero scripts.** Every operation is `cp`, `mv`, or editing a markdown file. There is no `flaitron new`, no `flaitron archive`, no `flaitron validate`. The `/ft-task` slash command is a Claude Code skill that calls the same `cp` and `mv` you would call by hand — it's an interface for the assistant, not a binary. If a script feels needed, the answer is almost always "no, that's the assistant's job."

**One task per context window.** Tasknotes are sized so the assistant can hold the entire scope in working memory: the plan entry, the tasknote checklist, the files involved, the tradeoffs. Anything bigger becomes an epic with subtasks. The constraint is real — context windows are finite, and a task that doesn't fit is a task that will get half-done in two passes.

**Relevance before action.** Every tasknote opens with a Relevance Assessment. The verdict is `Proceed`, `Re-scope`, or `De-scope`. Plans are snapshots of past intent; the world moves; sometimes the right move is to throw the task out. Putting that decision first, every time, prevents the slow accumulation of zombie work.

**Versioned and pinned.** Adopting projects pull flaitron in as a git submodule pinned to a specific commit. When I edit flaitron, projects don't see the change until I deliberately bump them. This is the part the earlier `TasknoteSystem/` folder didn't have. It's also the part that makes flaitron work as a system rather than a folder.

## What flaitron deliberately is not

It is not a CLI tool. It is not a database. It is not a schema. It is not a validator. It is not a cross-project query engine. It is not a multi-user platform. It is not a task tracker for teams. It is not a graph runtime — declaring that two children may run in parallel is markdown; scheduling them is someone else's job. `SPEC/scope-boundaries.md` spells these out as `What flaitron does NOT provide`; the reason they're called out is that I either had them and they made things worse (helper scripts, JSON schema validation), or I was tempted to build them and stopped (cross-project queries, a "new project" CLI, a job graph over tasknotes). Each absence is deliberate.

The temptation to add them is real and recurring. The discipline is to write a project-side helper instead, and only promote something into flaitron when at least two projects need the same thing in the same shape.

## Open questions at v0.1.0

The shape worked for me. v0.1.0 was the first cut — the four-phase tasknote, the relevance gate, the model field, the submodule + symlink adoption pattern, the `/ft-task` skill. It was deliberately small. The interesting unknowns at the time were at the edges: what would happen at the second-major-version boundary, what an aggregating visualizer would look like (read-only across projects), whether epic subtasks would scale or fragment.

For the contract, see [SPEC.md](../SPEC.md). For how to put flaitron into a project, see [MIGRATION.md](MIGRATION.md).
