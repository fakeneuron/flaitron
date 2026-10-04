---
title: handoff-persistence-rule
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: []
---

# CORE-528 | handoff-persistence-rule

[← PLAN.md](../PLAN.md) · ✅ Completed

> **⚠️ Superseded by [[CORE-533]]** — the paragraph no longer names the post-closure copy-paste line as something written before archive: that line is emitted after the closure commit lands and names the next task, which the adjacent "Recap is recap-only" callout keeps out of the recap.

## 🎯 Goal

Add a Phase 4 guidance line to `SPEC.md`: anything handed to the operator
(verbatim paste lines, commands, filings) is written into the tasknote
(Recap or Handoff) before archive, since a terminal recap is not durable.

## ⚡ Notes

**Relevance:** Proceed — the gap is real and current. `SPEC.md` §"🚀 Phase 4:
Closure" already documents the Recap and the post-closure protocol's
copy-paste line, and §"🔄 Handoff (optional)" already documents mid-task
resume state, but nothing states that operator-facing artifacts *must* land
in one of those tasknote surfaces before archive rather than only ever
appearing in the terminal. That silence is what caobunga CBN-120.2 F2
surfaced: a verbatim hand-off (paste line / command / filing) was given to
the operator in the terminal only, then lost once the session scrolled past
it, because the tasknote never recorded it.

**Best Practices Review:** Contract-layer markdown only, no module touched.
Read the full closure surface first — §"🚀 Phase 4: Closure" (Recap
description, the `> Recap is recap-only` callout), §"🔄 Handoff (optional)"
(fixed five-part shape, "not a park / not a sidequest / not the handoff
contract" boundary), and the post-closure protocol's three steps (commit
bundle, 🏁 next-move, copy-paste line) — to place the new rule adjacent to
what it governs and to name the concrete surfaces (copy-paste line, proposed
commit message, filing command) without inventing new ones.

**Drift check:** No drift — the Recap and Handoff sections and the
post-closure protocol's copy-paste-line step are current and unchanged by
this task; the new paragraph only adds a persistence rule and
cross-references the existing `## 🔄 Handoff` heading.

**Archive skim:** `ls .flowtron/tasknote/archive/core/` then `grep -rl
"CBN-120"` over it — no prior tasknote in `archive/core/` references
CBN-120.2 or a durability/persistence rule for operator-facing hand-offs;
this is new ground. Reviewed sibling filings from the same batch
(`CORE-529` deferred-handoff-filing-discipline, `CORE-530`
preserve-bracket-tokens) for precedent: both are also PLAN.md-filed but
unstarted, and both address different caobunga CBN-120.2 findings (F4 filing
discipline, F5 bracket-token loss) with no overlap on this task's F2 durability
gap.

**Pattern survey:** Extended the existing shape — a bold-headed prose
paragraph placed immediately after the callout it extends, matching how
§"🚀 Phase 4: Closure" already sequences a bulleted rule followed by a
bold-headed clarifying paragraph (e.g. "Acceptance tick-through" following
the same callout). No new heading, table, or checklist introduced.

**Implementation:** Added a **Handoff persistence** paragraph to `SPEC.md`
§"🚀 Phase 4: Closure", directly after the `> Recap is recap-only` callout
and before "Acceptance tick-through." It states: anything handed to the
operator at closure — a verbatim paste line (the post-closure protocol's
copy-paste line), a proposed commit message, a filing command — is written
into the tasknote (the Recap, or a `## 🔄 Handoff` for mid-task state) before
archive, because a terminal recap is not durable once the session scrolls
past or the terminal closes.

**Docs touched:** No change to any of the other 17 AI-referenced docs
(`.flowtron/tasknote/README.md` §"AI-referenced docs") — `SPEC.md` itself is
the edited doc; `docs/EXTERNAL-AGENTS.md`'s Handoff Contract section
(ownership transfer between agents) is a distinct concept from the tasknote
`## 🔄 Handoff` section this change cites, per that doc's own line 27
disambiguation, so no mirror is needed there.

## ✅ Recap

Added a **Handoff persistence** paragraph to `SPEC.md` §"🚀 Phase 4: Closure",
immediately after the `> Recap is recap-only` callout. It closes the gap
caobunga CBN-120.2 F2 surfaced: nothing previously required a verbatim
operator hand-off (a copy-paste line, a proposed commit message, a filing
command) to land in the tasknote before archive, so one given only in the
terminal was lost once the session scrolled past it. The new paragraph
states that such hand-offs must be written into the Recap, or a `## 🔄
Handoff` for mid-task state, before archive — a terminal recap is not
durable.

One file changed (`SPEC.md`, +7/-0 lines). No code path touched; no refactor.
No other AI-referenced doc needed a mirror — `docs/EXTERNAL-AGENTS.md`'s
Handoff Contract is a distinct, already-disambiguated concept from the
tasknote `## 🔄 Handoff` section this change cites.

**Archived:** 2026-09-06
