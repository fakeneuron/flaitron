---
tagline: "Markdown tasknotes for AI-assisted coding"
one_liner: "Flaitron is a lightweight, agent-neutral tasknote workflow for solo AI-assisted coding — one markdown plan, four-phase tasknotes, no scripts or database."
description: "Flaitron is a project-agnostic tasknote system for solo, AI-assisted coding: one markdown plan (PLAN.md) as the single source of truth per project, consumed via git submodule, with self-contained four-phase tasknotes (Discovery, Execution, Testing, Closure) that keep AI context windows sized to hold a complete task. A relevance gate re-checks scope before work starts, cutting stale or drifted work. No daemons, scripts, or database — just versioned markdown, readable and editable by any agent or human."
---

# Brand

The three fields above are this project's public blurb — the one place a
card, a catalog entry, a README index, or a social post should quote from.
Fill all three; keep them public-safe. Caps are caps, not targets:

- `tagline` — ≤ 8 words. The catchphrase.
- `one_liner` — ≤ 25 words. One sentence: what it is and for whom.
- `description` — ≤ 80 words. The paragraph a card could carry whole.

Below this line the file is free — longer copy, voice notes, what not to
say. This file and `README.md` are the self-contained contract.

## Name casing

- `flaitron` is the framework, its repo, package and paths. It is always
  lowercase, even at the start of a sentence or a heading.
- `FLAITRON` is the consulting business at flaitron.com, which has its own
  repo. Use it here only when you mean the business, never for the framework.
  A check cannot tell which one is meant, so review enforces this.
- Any other casing, including an initial capital, is wrong in tracked
  text. Archived tasknotes and `.flaitron/PLAN-ARCHIVE.md` rows are
  write-once and keep whatever casing they were written with.
- An identifier joined to other word characters follows its own convention
  (`FLAITRON_HOME`, `cachedFlaitronFile`) and is not brand text. A
  standalone name, in code or prose, follows this rule.

The blurb fields above, `assets.json` and the SVG labels still use the old
capitalized form until CORE-863 renames them.
