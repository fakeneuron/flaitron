---
description: Run a first-contact holistic repo audit — Repo Map discovery, thin capped sweep, thematic synthesis, milestone-sequenced plan filed as flaitron epics, plus delegation recommendations for the focused audit family. Stack-neutral, strictly read-only, no fork.
---

Invoke the `ft-audit-repo` skill. The skill resolves scope from `$ARGUMENTS` (`all` / path), discovers and runs the project's own verification gates, builds a read-before-judging Repo Map (purpose, stack, architecture sketch, conventions, vital signs), runs one thin cross-cutting sweep capped at 10 findings, synthesizes 3–5 themes (with explicit won't-fix tradeoffs and measurable done-signals), presents a milestone-sequenced plan with a Milestone-0 safety net, and recommends which focused `/ft-audit <domain>` runs deserve a full pass. After confirmation it files the plan into `.flaitron/PLAN.md` as native flaitron epics — one `<AREA>-EPIC-<N>` per milestone with implementation children and a closing `.N` audit placeholder (the `.1` Discovery child is skipped; this run supplies it). Source files are never modified — there is no trivial-fix carve-out at first contact.

This skill is **stack-neutral and not forked** — run it by reference from the read-only submodule path. See `docs/MIGRATION.md` §1.2.1 for the install note.
