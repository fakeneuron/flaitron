---
description: Plan a refactor of one named target as a sequenced, behavior-preserving epic — read-only depth analysis, an operator-reviewed plan, then files parent epic + implementation children + `.N` audit with starter tasknotes carrying characterization-test seeds. Never edits code.
argument-hint: <target> [--fast | -f]
---

Invoke the `ft-refactor` skill with `args="$ARGUMENTS"`. The skill resolves the target from `$ARGUMENTS` (a file, directory, module, function/class, or named subsystem), runs a read-only depth survey (dependencies, seams, test coverage, blast radius), drafts a sequenced behavior-preserving plan, surfaces it for operator review, and — only on the operator's go — files parent `<AREA>-EPIC-<N>` + implementation children from `.2` + a `.N` audit into `.flaitron/PLAN.md`, with a starter tasknote per child seeded with characterization-test and behavior-preservation acceptance. Source files are **never** modified: every planned code change happens later through normal `/ft-task` cycles on the filed children.

Usage:

- `/ft-refactor <target>` — survey, review the plan, then file on your go.
- `/ft-refactor <target> --fast` (or `-f`) — skip the plan-review pause; still read-only on source files (writes PLAN + starter notes only).

A target is required — there is no whole-repo fallback. For a breadth sweep across a scope, use `/ft-audit structure`, whose findings recommend an `/ft-refactor <target>` run when one target needs sequenced multi-step restructuring. For an epic whose scope is genuinely open, use `/ft-epic-discovery`; for capturing a design worked out in conversation without filing, copy `templates/spec-template.md` to `.flaitron/specs/<slug>.md` by hand.
