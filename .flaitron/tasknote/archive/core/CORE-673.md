---
title: code-review-level-pin
status: completed
tags: []
created: 2026-09-23
due:
related-tasks: [CORE-656]
touches:
  - claude/skills/ft-task/SKILL.md
  - SPEC.md
  - claude/CAPABILITIES.md
  - README.md
  - docs/GLOSSARY.md
  - templates/subagent-probe-template.md
---

# CORE-673 | code-review-level-pin

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Pin an explicit `/code-review medium` wherever the contract names `/code-review` as the tool a Claude runner uses to satisfy Phase 3's External review box, so an unattended run can't inherit a leftover interactive `high`/`max` level.

## ⚡ Notes

**Relevance:** Proceed — the gap is real: `ft-task/SKILL.md` Phase 3 and SPEC.md's "Who reviews" both said `/code-review` with no level, and `/code-review` reuses whatever level the operator last typed interactively.
**Best Practices Review:** No new abstraction; this is a find-and-pin across every site that instructs a Claude runner to invoke the tool. Vendor-neutral prose (the "not the author" property statements) is left untouched — only the concrete Claude-Code invocation clauses gained the level.
**Drift check:** No drift — `code-review`'s no-level-given behavior (reuse last-typed level) matches the `code-review` skill description in this session's own skill listing. `ultra` was already excluded from the contract (`README.md`, `CAPABILITIES.md`) and stays excluded.
**Archive skim:** `grep -l` across `.flowtron/tasknote/archive/core/` for the four `touches:` files turned up [[CORE-656]] (`review-probe`, Completed 2026-09-22) — the task that first wrote the vendor-neutral "Who reviews" prose and the four AGENT-NEUTRALITY-tracked sites naming `/code-review`. No conflict: CORE-656 established *that* the tool is named, this task only adds the level.
**Declared scope:** see YAML `touches:` above.
**Pattern survey:** Followed CORE-656's own site list (`docs/AGENT-NEUTRALITY.md`'s ledger row for `/code-review` names exactly these four "any-mention" sites: `SPEC.md`, `templates/subagent-probe-template.md`, `README.md`, `docs/GLOSSARY.md`) plus the two additional Claude-Code-wiring sites the operator named (`ft-task/SKILL.md`, `claude/CAPABILITIES.md`). `step-5-loop-mode.md` §"Step 6" was checked and does not name the tool (it points at `SPEC.md`'s section instead), so it needed no edit — it inherits the pin transitively.
**Implementation:** Six one-line edits, each turning a bare `` `/code-review` `` mention into `` `/code-review medium` ``: `ft-task/SKILL.md:172` (Phase 3 invocation), `SPEC.md:471` ("Who reviews"), `claude/CAPABILITIES.md:41` (row's first cell, added a clause naming the pin and its reason), `README.md:278`, `docs/GLOSSARY.md:125`, `templates/subagent-probe-template.md:58`. `ultra` stays excluded everywhere it already was. No code changed; `wc -c` confirms `SPEC.md` (46,923) and `ft-task/SKILL.md` (29,338) stay well under their `docs/CONTEXT-BUDGET.md` caps (53,000 / 33,000).
**Docs touched:** `.flowtron/tasknote/README.md` §"AI-referenced docs" — none of the six touched files are in that sweep set beyond what this task already covers directly (SPEC.md, README.md, GLOSSARY.md, and the skill/template bodies are the sweep's own subject matter, not a downstream doc referencing them).

## ✅ Recap

Pinned `/code-review medium` as the explicit level at all six sites where the flowtron contract tells a Claude runner which tool satisfies Phase 3's External review box: `claude/skills/ft-task/SKILL.md`, `SPEC.md`, `claude/CAPABILITIES.md`, `README.md`, `docs/GLOSSARY.md`, `templates/subagent-probe-template.md`. `step-5-loop-mode.md` needed no edit (it doesn't name the tool directly). `ultra` remains excluded everywhere. No code, no design tradeoffs — pure contract-text find-and-pin. `touches:` matches `git diff --name-only` exactly, plus this tasknote and the PLAN.md filing/flip.

**Archived:** 2026-09-23
