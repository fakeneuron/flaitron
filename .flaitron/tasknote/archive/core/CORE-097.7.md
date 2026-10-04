---
title: EPIC-097 final audit
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097, CORE-097.1, CORE-097.2, CORE-097.3, CORE-097.4, CORE-097.5, CORE-097.6]
---

# CORE-097.7 | EPIC-097 final audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-097]]

## 🎯 Goal

Verify the 5 external-skill patterns adopted via EPIC-097 (ft-stats, paths-autoload, spec-terse-pass, ft-quality, epic-discovery --deep) sit well together across SPEC, skills, and templates after children close.

## ✅ Acceptance

- [ ] Cross-pattern integration check: the 5 adopted patterns don't conflict with each other or with pre-existing flowtron conventions (PLAN-discipline, 4-phase tasknote, post-closure protocol, paths-autoload contract).
- [ ] SPEC surface coherent: SPEC.md + SPEC/*.md modules still cross-reference correctly after the .3 (paths-autoload) and .4 (terse-pass) edits; no broken anchors or orphaned modules.
- [ ] Skill surface coherent: ft-stats, ft-quality, ft-epic-discovery --deep mode are invokable, frontmatter is well-formed, and they don't duplicate or shadow each other.
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs": for each entry, "no change" or the update.
- [ ] Findings (if any) filed as `.8+` children or as fresh tickets; otherwise epic parent CORE-EPIC-097 closed in PLAN.md.

## 🧩 Subtasks

- [ ] **Pass A — Skill surface coherence** — verify ft-stats / ft-quality / ft-epic-discovery are well-formed (frontmatter valid, command stubs present), ft-flowtron's "Bundled skills" table rows are correct and ordered, and there are no shadowed/duplicate skill names.
- [ ] **Pass B — SPEC surface coherence** — verify SPEC.md §"Skill namespace" slug list includes the new skills, the `### Lazy SPEC module frontmatter` subsection landed, SPEC/epic.md `--deep` pointer is present, and no anchor / cross-ref drift.
- [ ] **Pass C — Adopter wiring coherence** — verify docs/MIGRATION.md §1.0 global-install symlink blocks for ft-stats and ft-quality are present, consistent in shape with the ft-flowtron block, and CLAUDE-snippet.md is unchanged (per the lifecycle-vs-utility split).
- [ ] **Pass D — Cross-pattern integration** — verify the 5 patterns don't conflict with each other or with pre-existing contracts (2-banner cap preserved, `paths:` frontmatter declarative-only doesn't break /ft-task dispatch, ft-quality "outside the tasknote flow" claim holds, --deep default flow byte-identical).
- [ ] **Pass E — Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update; covers cumulative slice-local staleness the per-child Phase 4 sweeps could miss.
- [ ] **Findings disposition** — if any miss surfaces, file as `.8+` children or fresh tickets per SPEC/epic.md §"Audit follow-ups"; if none, close epic CORE-EPIC-097 parent line.
- [ ] Phase 4: archive tasknote + flip PLAN.md lines (`.7` to stub + parent epic if all children + this audit close cleanly).

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill survey)
- [[CORE-097.1]] — discovery (shortlist + adoption rationale)
- [[CORE-097.2]] — ft-stats skill
- [[CORE-097.3]] — spec-paths-autoload (frontmatter `paths:` on SPEC/*.md)
- [[CORE-097.4]] — spec-token-refresh (SPEC.md terse-pass audit)
- [[CORE-097.5]] — ft-quality skill
- [[CORE-097.6]] — epic-discovery --deep mode

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Final-subtask audit bracket per `SPEC/epic.md` §"Numbering convention"; all 5 implementation children (`.2`-`.6`) closed cleanly on 2026-05-18, plus the upstream Discovery `.1`. Audit scope is "verify the cohort sits well in the codebase as a whole" — per-child Phase 4 sweeps were thorough but only see their own slice; cross-pattern integration + cumulative drift live here.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- 6 archived child tasknotes (`CORE-097.1` through `.6`) in `_project/tasknote/archive/core/` — canonical record of what each subtask landed
- `SPEC/epic.md` — audit lifecycle contract; fixed doc-drift acceptance line; "Audit follow-ups" branch
- HEAD inventory of the 17 cited files (skills, SPEC modules, docs, command stubs) — all present
- All 5 `SPEC/*.md` lazy modules' top-of-file confirmed to carry `paths:` frontmatter per CORE-097.3 contract

### Archive skim (the audit IS the cohort skim)

This audit's scope IS the 6 child tasknotes already loaded above. No prior audit precedent in the area to skim — CORE-101 (audit-family bundle) and CORE-049 (workflow token audit) are the closest cohorts but neither was an epic-final audit; the epic-final-audit lifecycle was formalized via SPEC/epic.md only after CORE-EPIC-098 closed (CORE-098 didn't run one). CORE-EPIC-097 is the first epic with a formalized `.<final>` audit subtask.

### Drift check

| Cited surface | At HEAD? |
|---|---|
| `claude/skills/ft-stats/SKILL.md` + `claude/commands/ft-stats.md` | ✓ |
| `claude/skills/ft-quality/SKILL.md` + `claude/commands/ft-quality.md` | ✓ |
| `claude/skills/ft-epic-discovery/SKILL.md` + command stub | ✓ |
| `claude/skills/ft-flowtron/SKILL.md` (bundled-skills table) | ✓ |
| All 5 `SPEC/*.md` lazy modules with `paths:` frontmatter | ✓ (`epic.md` populated; 4 others `paths: []`) |
| `SPEC.md` + `docs/MIGRATION.md` + `claude/CLAUDE-snippet.md` + `README.md` | ✓ |
| `_project/tasknote/README.md` §"AI-referenced docs" | ✓ |

No drift between child-recorded edits and HEAD state. Safe to proceed to the audit passes (Phase 2).

### No clarifications needed

Scope is unambiguous: 5 audit passes per the Subtasks list, each producing a per-pass verdict; findings file as `.8+` children or fresh tickets per SPEC/epic.md §"Audit follow-ups". The audit-specific fixed doc-drift sweep is encoded in Acceptance. No user input required to start Phase 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for an audit task; the deliverable is the audit findings + filed follow-ups. Methodology mirrors `SPEC/epic.md` §"Audit follow-ups": 5 passes (skill / SPEC / adopter wiring / cross-pattern integration / doc-drift), capped findings filed as `.<N+1>` children.
- [x] Implemented the minimal solution — 5 passes executed; per-pass verdict + 1 finding filed (see below)
- [x] Updated/added tests for non-trivial behavior — N/A (audit; no code change)

**Implementation Notes:**

### Pass A — Skill surface coherence

| Check | Verdict |
|---|---|
| `claude/skills/ft-stats/SKILL.md` frontmatter (`name: ft-stats` + description) + 5 numbered steps + Step 5 "Stop" | ✅ well-formed |
| `claude/skills/ft-quality/SKILL.md` frontmatter (`name: ft-quality` + description) + 5 numbered steps + Step 5 "Stop" + fail-fast logic + empty-state branch | ✅ well-formed |
| `claude/skills/ft-epic-discovery/SKILL.md` frontmatter (`name: ft-epic-discovery` + description mentions `--deep`) + Step 1.5 arg-parse + Step 5.5 three-stage pre-pass | ✅ well-formed |
| Command stubs (`ft-stats.md` / `ft-quality.md` / `ft-epic-discovery.md`) exist with canonical `description:` frontmatter | ✅ present |
| `ft-flowtron`'s "Bundled skills" table has rows for `/ft-stats` (L56) and `/ft-quality` (L57) | ✅ present + ordered |
| No skill-name shadowing or duplication | ✅ |
| `claude/commands/ft-epic-discovery.md:5` body says `Invoke the `epic-discovery` skill` (unprefixed) + `claude/skills/ft-epic-discovery/SKILL.md:6` H1 reads `# epic-discovery — …` (unprefixed) | ❌ **Finding A1** |

**Finding A1 — CORE-104 namespace residue in `ft-epic-discovery` surface.** Two occurrences of the unprefixed legacy name `epic-discovery` survived CORE-104 (skill namespace prefix rename) and CORE-097.6's `--deep` edit:

- `claude/commands/ft-epic-discovery.md:5` — `Invoke the \`epic-discovery\` skill.` — operational concern: directive to the assistant naming the wrong skill ID. Comparable stubs (`ft-stats.md`, `ft-quality.md`) correctly say `Invoke the \`ft-stats\` skill` / `Invoke the \`ft-quality\` skill`.
- `claude/skills/ft-epic-discovery/SKILL.md:6` — H1 `# epic-discovery — flowtron epic filing + Discovery driver`. Cosmetic — H1 isn't load-bearing, but inconsistent with the directory + frontmatter `name:` of `ft-epic-discovery`.

Confirmed-narrow via `grep -rn -e "^# epic-discovery" -e "\`epic-discovery\`" --include="*.md" --exclude-dir=archive`: only 2 hits, both in the ft-epic-discovery namespace itself. No other CORE-104 residue elsewhere in the codebase. Small, mechanical fix → filed as `.8` per `SPEC/epic.md` §"Audit follow-ups" ("For a few small follow-ups, close the audit and execute them as normal children").

### Pass B — SPEC surface coherence

| Check | Verdict |
|---|---|
| `SPEC.md` §"Skill namespace" (L83-90) slug list includes `/ft-stats` and `/ft-quality` | ✅ |
| `SPEC.md` §"### Lazy SPEC module frontmatter" (L57-79) subsection landed; documents `paths:` convention as declarative-only | ✅ |
| `SPEC/epic.md` §"Optional deep pre-pass" (L60-66) opt-in pointer referencing `/ft-epic-discovery --deep` | ✅ |
| All 5 `SPEC/*.md` lazy modules carry `paths:` frontmatter (verified Discovery) — `epic.md` populated; 4 others `paths: []` | ✅ |
| No anchor / cross-ref drift introduced by the cohort | ✅ |

### Pass C — Adopter wiring coherence

| Check | Verdict |
|---|---|
| `docs/MIGRATION.md` §1.0 global-install blocks: ft-new-project (L29-34), ft-flowtron (L36-41), ft-stats (L43-48), ft-quality (L50-55), ft-release (L57-62) — all present, ordered, formatted consistently | ✅ |
| `claude/CLAUDE-snippet.md` "One-time symlink wiring" (L25-43) lists per-project workflow-lifecycle skills only (ft-task, ft-starter-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic); deliberately excludes ft-stats / ft-quality (global-install utility skills) | ✅ |
| Lifecycle-vs-utility split coherent across CORE-097.2 / .5 / .6 | ✅ |

### Pass D — Cross-pattern integration

| Check | Verdict |
|---|---|
| 2-banner cap (🛠️ + 📦) preserved: ft-stats / ft-quality / ft-flowtron all Step 5 "Stop" (no banners, no commit gate); --deep pre-pass uses AskUserQuestion gates per SPEC §"Operator-gate cues" "skill-level extensions don't introduce new gates" | ✅ |
| `paths:` frontmatter is declarative-only: SPEC.md L76-79 explicitly says `/ft-task` hardcoded dispatch (Steps 1.5 / 2 / 3a / 3c / 5) remains the runtime source of truth; no `/ft-task` SKILL.md changes from CORE-097.3 | ✅ |
| ft-quality "outside the tasknote flow" claim holds: SKILL.md L132-134 explicit ("`/ft-task` mid-flight + `/ft-quality` invoked → the two skills do not communicate") | ✅ |
| --deep default-flow byte-identical: CORE-097.6 mental-walked the no-`--deep` branch; Step 1.5 empty branch sets `deep-mode = false`; Steps 5 and 5.5 no-op when false | ✅ |
| ft-stats counting grain (subtasks + parent epics each = 1 data point) is consistent with `[model]`-tag ownership model in SPEC §"Task-line format" / §"Model field" | ✅ |

### Pass E — Doc-drift sweep (audit-specific fixed acceptance line per `SPEC/epic.md`)

| Doc | Verdict |
|---|---|
| `README.md` | no change — references `/ft-task` / `/ft-release` / `/ft-new-project` as illustrative; doesn't enumerate the full bundled-skill roster (consistent across .2 / .5 closures) |
| `SPEC.md` | no change — audits don't modify the contract; cumulative cohort state from .2 / .3 / .5 is correct at HEAD (slug list extended; `### Lazy SPEC module frontmatter` subsection landed; no further updates owed from `.7`) |
| `docs/MIGRATION.md` | no change — `/ft-stats` and `/ft-quality` global-install blocks already landed in §1.0 during their respective `.2` / `.5` closures; no new adoption procedures owed from the audit |
| `claude/CLAUDE-snippet.md` | no change — lifecycle-vs-utility split confirmed by the audit (Pass C); ft-stats / ft-quality intentionally absent from CLAUDE-snippet because they're global-install utilities, not per-project workflow-lifecycle skills |

Audit-pass introduced no AI-referenced doc updates of its own. Cohort-level cumulative drift is clean.

### Filed follow-ups

`- [ ] **CORE-097.8** [sonnet] | epic-discovery-residue — Replace 2 unprefixed `epic-discovery` strings (command stub L5 directive + SKILL.md L6 H1) with `ft-epic-discovery` per CORE-104 namespace prefix. Surfaced by [[<CORE-097.7>]] audit.`

Filed as `.8` child of CORE-EPIC-097 in `## Future Opportunities` per `SPEC/epic.md` §"Audit follow-ups". `[sonnet]` tag — mechanical 2-string edit with a clear plan (per global CLAUDE.md model-selection guidance). Word-count 27w, under the 50w target. After `.8` closes, the parent epic CORE-EPIC-097 can flip to Completed and the cohort can move to `## Completed`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (audit task; the deliverable is the per-pass verdicts + filed `.8` follow-up, not code)
- [x] Ran lint/type-check on changed code — N/A (markdown only); markdown mental-pass on the one new PLAN.md line (`.8`): 4-space indent preserved (2-space child indent under CORE-EPIC-097, sibling shape matches `.1`-`.7`); `[sonnet]` tag present; em-dash separator; `[[<CORE-097.7>]]` wikilink angle-bracketed correctly per SPEC §"Long-description conventions"; word-count 27w (under 50w target); no trailing whitespace.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Audit task — no code, no tests, no lint targets. The 5-pass audit + one-line PLAN.md filing is the entire substantive surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.7` line flipped to stub form (kept in-place under CORE-EPIC-097 per epic-lifecycle convention; parent + cohort move to `## Completed` only after `.8` closes); tasknote moved to `_project/tasknote/archive/core/CORE-097.7.md`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" §"Conditional skip rule" — 2 markdown-prose files diff; no frontend / privileged-ops / perf surface)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/CLAUDE-snippet.md` | no change |

Audit-pass introduced no new contracts/concepts. The single filed `.8` follow-up is a 2-string mechanical edit that will run its own doc-drift sweep at its own closure.

### Recap

Final-subtask audit of CORE-EPIC-097 (external-skill survey + 5 adoptions). Walked 5 audit passes: (A) skill-surface coherence across ft-stats / ft-quality / ft-epic-discovery + their command stubs + ft-flowtron's bundled-skills table; (B) SPEC.md surface coherence (skill-namespace slug list, `### Lazy SPEC module frontmatter` subsection, `SPEC/epic.md` `--deep` pointer, paths: frontmatter on all 5 lazy modules); (C) adopter-wiring coherence (MIGRATION.md global-install blocks + CLAUDE-snippet lifecycle-vs-utility split); (D) cross-pattern integration (2-banner cap preserved, paths: declarative-only, ft-quality independent, --deep default byte-identical); (E) cumulative doc-drift sweep across the 4-file AI-referenced doc set.

**1 finding surfaced:** CORE-104 namespace residue in the ft-epic-discovery surface — `claude/commands/ft-epic-discovery.md:5` body and `claude/skills/ft-epic-discovery/SKILL.md:6` H1 both use the unprefixed legacy name `epic-discovery`. Confirmed-narrow via grep (only 2 hits, both inside the ft-epic-discovery namespace itself). Small, mechanical → filed as `CORE-097.8` under CORE-EPIC-097 in `## Future Opportunities` per `SPEC/epic.md` §"Audit follow-ups" ("close the audit and execute as a normal child"). `[sonnet]`-tagged for the mechanical text fix. After `.8` closes, the parent epic CORE-EPIC-097 flips to Completed and the cohort moves to `## Completed`.

**Archived:** 2026-05-18
