---
title: audit-overlay-home
status: starter
tags: []
created: 2026-10-06
related-tasks: [CORE-720, CORE-219, CORE-439, CORE-073]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# `### Files to touch` below stays the prose survey; YAML `touches:` is the
# short queryable list once known.
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-721 | audit-overlay-home

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-10-06) · 🔗 [[CORE-720]] [[CORE-219]] [[CORE-439]] [[CORE-073]]

## 🌱 Starter context

_Captured 2026-10-06 during [[CORE-720]] Phase 3, where the gap blocked closure — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Flaitron's own `/audit` overlay lives at `.claude/skills/audit/SKILL.md`. That
path is **gitignored** — `.gitignore:21` ignores `.claude/` with the comment
"Personal Claude Code / Codex / Cursor / Grok wiring for this checkout … Never
commit per-machine state", added by [[CORE-219]] and reaffirmed by [[CORE-439]]
("one canonical skill-install path per project"). The overlay is therefore
untracked, absent from `HEAD`, and outside every backup, review, and CI path
the repo otherwise relies on. It exists on one machine.

The rule costs the other skills nothing: every entry in `.claude/skills/` is a
**symlink** into tracked `claude/skills/`. `audit/` alone is a real directory
holding a real file, because the audit scaffold is **forked-not-symlinked** by
design. It is the one skill the ignore rule strands.

The contradiction is documented on both sides: `docs/MIGRATION.md` §1.2.1
prescribes installing the overlay at exactly `.claude/skills/$SKILL/SKILL.md`,
and flaitron-self then ignores that path. Neither side is wrong in isolation,
which is why this sat unnoticed since [[CORE-219]].

Concrete cost already incurred: [[CORE-720]] filled the overlay's `docs` deltas
and bumped its `flaitron-reconciled:` pin to v6.0.0 — 4,183 bytes of verified
work that could not be staged, so SPEC §"Paper-complete guard" forbade the PLAN
flip and the task parked at `input-needed` instead of closing.

### Solution shape

Three dispositions were enumerated at the [[CORE-720]] park; this task picks one
and reconciles the docs to it.

- **Force-commit** (`git add -f`) — fastest, versions the work, but overrides a
  twice-affirmed policy for one file and leaves `.claude/` half-tracked, which a
  later `/audit context` run would likely flag as exactly the inconsistency it
  screens for.
- **Relocate to a tracked home + symlink** — matches how every sibling skill is
  wired and fixes the gap properly. The hard part is *where*: `claude/skills/`
  is the **shipped** surface, so an `audit/` directory there would propagate
  flaitron's own fork to adopters, which is wrong. Needs a tracked path that is
  self-host-only.
- **Accept unversioned** — declare the overlay per-machine by design, and change
  [[CORE-720]]'s Acceptance so a filled overlay is not a committable deliverable.
  Cheapest; leaves the durability gap and the one-machine exposure standing.

### Files to touch (preliminary survey — drift-check at promotion)

- `.gitignore` — line 21 (`.claude/`) and its comment block, if the disposition
  narrows the rule (e.g. a negation for this one path).
- `docs/MIGRATION.md` — §1.2.1 / §1.2.2, which prescribe the `.claude/` install
  path; any relocation must land here or adopters inherit a stale recipe.
- `.claude/skills/audit/SKILL.md` — the overlay itself (moves, or stays and is
  force-added).
- `claude/skills/ft-audit/scaffold-bootstrap.md` — §5's flaitron-self fork
  branch names the install path and the `flaitron-reconciled:` lookup; it must
  agree with whatever this task decides.
- `.flaitron/tasknote/CORE-720.md` — parked; its Acceptance and `park-reason:`
  resolve here.

### Explicitly out of scope

- Filling the six remaining unclean audit domains — that is [[CORE-722]], which
  this task blocks for the same reason.
- Any change to the audit **scaffold** (`claude/skills/ft-audit/**`) beyond
  making its documented install path true.
- Whether adopters should commit their own `.claude/` — their `.gitignore` is
  theirs. Only revisit if the chosen disposition changes the advice flaitron
  *ships* in `docs/MIGRATION.md`.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Close CORE-720 over an uncommittable deliverable? | No — park it | SPEC §"Paper-complete guard" forbids a workflow-paper-only closure commit when Acceptance needs a real deliverable |
| Force-commit CORE-720's work to unblock it? | No, not unilaterally | Overriding a twice-affirmed `.gitignore` policy is an operator call, not a runner's |
| Fix the gap inside CORE-720? | No — file separately | CORE-720 is a `[light]` delta-fill; choosing a versioning home is design work with adopter-contract reach |
| Model tier | `[heavy]` | Genuine design ambiguity (where a self-host-only tracked path lives without shipping to adopters) + a docs contract edit. `SPEC/model.md`'s round-up default binds on doubt |

### Open at promotion (Phase 1 should resolve)

- Which disposition? Lean: **relocate + symlink**, since it is the only one that
  both versions the work and keeps `docs/MIGRATION.md` §1.2.1 honest.
- If relocating, what tracked path is self-host-only? Lean: something outside
  `claude/skills/` (which ships) — `.flaitron/` is the self-host convention for
  flaitron's own state and is already tracked. Verify nothing ships from there.
- Does the symlink survive the `/audit` skill-resolution path, and does CI's
  Pair Q then start scanning the overlay's citations? Both are behaviour changes
  worth confirming rather than assuming.
- Does `/ft-update` need to learn the new location for adopters, or is this
  purely self-host? Lean: self-host only.
- Should `docs/AGENT-NEUTRALITY.md` or `docs/CONTEXT-BUDGET.md` gain a row for
  the relocated file? Lean: a budget row, once it is tracked.

### Related

- [[CORE-720]] — parked by this gap (`park-reason: input-needed`); its Acceptance and closure resolve here. `blocked-by:`
- [[CORE-722]] — the six remaining unclean audit domains; blocked by this task for the same uncommittable-deliverable reason
- [[CORE-219]] — added `.claude/` to `.gitignore` ("incomplete-dot-claude-skill-wiring")
- [[CORE-439]] — reaffirmed it ("one canonical skill-install path per project")
- [[CORE-073]] — created the `/audit` overlay fork, back when `.claude/` was still tracked
- [[CORE-644]] — taught `scaffold-bootstrap.md` §5 and `docs/MIGRATION.md` §1.2.2 the flaitron-self fork path this task must keep true
