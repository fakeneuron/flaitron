---
title: External skill survey — Discovery
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097]
---

# CORE-097.1 | External skill survey — Discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-097]]

## 🎯 Goal

Scope which comparable claude-code / AI-coding workflow repos to survey, define
the adoption-fit criteria, and file per-candidate findings as implementation
children of CORE-EPIC-097 in PLAN.md.

## ✅ Acceptance

- [ ] Adoption-fit criteria rubric defined and recorded in Discovery Notes (dimensions: load frequency, simplicity, generalizability, fit with flowtron's tasknote/4-phase contract, license, maintenance signal)
- [ ] 3-6 candidate repos surveyed at moderate depth (README + skill/command inventory + 2-3 representative skills) — per-candidate findings table recorded in Discovery Notes
- [ ] Shortlist of recommended adoptions identified with per-candidate adoption-fit verdict + rationale + concrete adoption shape (skill name, where it lives, what it replaces or augments)
- [ ] Implementation children `CORE-097.2 .. CORE-097.<N-1>` filed in PLAN.md (one per recommended adoption; each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit subtask `CORE-097.<N>` filed in PLAN.md as the highest-numbered child (per `SPEC/epic.md` §"Numbering convention" + fixed doc-drift sweep acceptance line)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing

## 🧩 Subtasks

- [ ] Define adoption-fit criteria rubric — record dimensions and what each measures in Discovery Notes
- [ ] Web-discover candidate repos via GitHub search ("claude code skills", "claude-code workflow", "anthropic claude-code", caveman-claude direct lookup); collect ~6-10 candidates
- [ ] Apply criteria rubric to shortlist 3-6 candidates for moderate-depth survey
- [ ] Per shortlisted candidate: fetch README + skill/command inventory + 2-3 representative skill bodies; record in per-candidate findings table
- [ ] Synthesize recommended-adoptions shortlist with adoption-fit verdict + rationale + concrete adoption shape per recommendation
- [ ] Phase 2: write `.2..(N-1)` implementation children + `.N` audit line into PLAN.md under `CORE-EPIC-097` (2-space indent; each `[opus]`-tagged unless rationale for sonnet)
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (indent, model tag, shortname, em-dash, word-count cap)
- [ ] Phase 4: doc-drift sweep + flip `.1` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill-survey)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed Discovery subtask under `CORE-EPIC-097` with explicit deliverable (`.1` shortlist + rationale + per-candidate findings per `SPEC/epic.md`). Parent epic's intent (compare flowtron's shipped skill roster against external claude-code / AI-coding workflow repos) is concrete; no scope ambiguity that warrants re-scope. Caveman-claude named in parent as a known external pattern worth examining.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `SPEC/epic.md` — epic lifecycle contract (Discovery deliverable = filed children, not code; audit subtask as final-numbered child; doc-drift sweep on audit acceptance)
- `claude/skills/` + `claude/commands/` — current flowtron skill roster (15 skills; baseline for comparison)
- `_project/tasknote/README.md` — AI-referenced docs list for Phase 4 closure sweep
- PLAN.md line 30-31 — parent epic `CORE-EPIC-097` description + this Discovery's task line
- `templates/tasknote-template.md` — canonical scaffold consumed at Step 3b

### Archive skim findings

Skimmed `_project/tasknote/archive/core/` (108+ tasknotes). Closest precedent: **CORE-049 (workflow token audit)** — internal audit producing ranked candidates with adoption rationale, follow-ups filed to PLAN.md. Pattern matches this Discovery's "survey → ranked findings → file adoption children" shape almost exactly; reusing its Acceptance/Subtask structure with external-survey substitutions. No prior tasknote has surveyed *external* claude-code repos — this is greenfield. No drift impact from prior tasknotes.

### Drift check

- `SPEC/epic.md` cited in PLAN.md description — file exists at expected path ✓
- Parent epic `CORE-EPIC-097` line in PLAN.md line 30 — present ✓
- `caveman-claude` — external repo reference; verification deferred to Phase 2 web fetch
- Active flowtron skill roster matches `claude/skills/` listing — 15 skills as of HEAD (4b55fc1)

### Resolved scoping (from AskUserQuestion)

| Question | Answer |
|---|---|
| Survey targets | Open web discovery, no pre-curated list (GitHub search for claude-code skills/workflow repos) |
| Web access | WebFetch + WebSearch authorized freely |
| Filing form | One `.N` child per recommended adoption + final `.N` audit subtask (CORE-049 pattern) |
| Depth budget | Moderate — 3-6 shortlisted candidates, README + skill/command inventory + 2-3 representative skills per candidate |

### Adoption-fit criteria rubric (draft — finalized in Phase 2)

Dimensions to score each surveyed skill/pattern on:

1. **Generalizability** — does it apply project-agnostically (flowtron's core value prop) or is it stack-specific?
2. **Fit with flowtron's tasknote/4-phase contract** — does it compose with the existing workflow or fight it?
3. **Simplicity** — small, single-purpose, low cognitive overhead vs. heavy machinery?
4. **Load frequency × cost** — cheap to load every session (always-on) vs. lazy-loaded (per-trigger) — per SPEC §"Cost model" / CORE-037 / CORE-049 precedent
5. **Maintenance signal** — recent commits, issue activity, license clarity (MIT/Apache preferred for vendoring)
6. **Adoption shape** — direct port (new skill in `claude/skills/`), pattern absorption (adapt into existing skill), or contract influence (SPEC.md / template change)?

### Open Phase 2 questions (resolve during execution, not before)

- Final candidate-count N for filing — depends on how many clear the adoption-fit bar after survey. Audit subtask number locks at filing time per `SPEC/epic.md` numbering convention.
- Whether any candidate warrants a deep-dive `.N` follow-up vs. light-touch adoption — case-by-case at filing time.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-049 (workflow token audit) is the canonical filing-children precedent: rank candidates, surface to user, file approved as PLAN.md follow-ups. CORE-098.x children show the canonical 2-space-indent + `[opus]`-tagged + ≤70w cohort-children shape. Reusing both.
- [x] Implemented the minimal solution — 6 children (`.2`-`.7`) filed under `CORE-EPIC-097` in `_project/PLAN.md` under `## Future Opportunities`. All `[opus]`-tagged; 2-space indent preserved; em-dash separator consistent; word-counts 21-27w (all under 50w target / 70w hard cap). Audit subtask at `.7` per SPEC/epic.md numbering convention.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable code surface).

**Implementation Notes:**

### Web-discovery hits (~15 repos surfaced, 6 shortlisted)

Searched: caveman-claude direct lookup; "claude code skills github repo workflow 2026"; "awesome claude code github skills commands subagents"; "claude code slash commands repo template github bundled workflow". Hits: hesreallyhim/awesome-claude-code · VoltAgent/awesome-claude-code-subagents · GetBindu/awesome-claude-code-and-skills · travisvn/awesome-claude-skills · VoltAgent/awesome-agent-skills · JuliusBrussee/caveman · Filip-Podstavec/claude-leverage · angakh/claude-skills-starter · nicholasmartin/claude-workflow-template · shanraisshan/claude-code-best-practice · ashish141199/obsidian-claude-code · catlog22/Claude-Code-Workflow · alirezarezvani/claude-code-github-workflow · qdhenry/Claude-Command-Suite · affaan-m/everything-claude-code · luongnv89/claude-howto · glebis/claude-skills · shinpr/claude-code-workflows.

### Per-candidate findings table

| # | Repo | Core function | Generalizability | Fit with flowtron | Simplicity | License | Activity | Verdict |
|---|------|---------------|------------------|-------------------|-----------|---------|----------|---------|
| 1 | JuliusBrussee/caveman | Output-style token compression (~65% out, 46% in via memory-file rewrite) | Agent-agnostic (30+ tools) | Orthogonal (caveman strips explicit prose; flowtron's prose is intentional for AI cold-start) — but compression *technique* applies to high-load surfaces | Small skill + statusline + hook | MIT | 2026-05-12 (v1.8.2) | **Pattern absorption** — port the 46% memory-compression *technique* to SPEC.md core; do NOT adopt voice |
| 2 | Filip-Podstavec/claude-leverage | Multi-model routing (Opus/Sonnet/Haiku) with hooks + observability | Project-agnostic | **Strong** — formalizes the `[model]` tag pattern flowtron pioneered; observability slot fits flowtron's PLAN.md model-tag data | 9 agents + 8 cmds + 3 hooks | MIT | 38 commits | **Strong adopt** — observability skill; skip duplicate subagents |
| 3 | angakh/claude-skills-starter | 13 fork-and-customize slash commands (clean, commit, quality, scaffold, test, etc.) | Project-agnostic with stack-graceful detection | Partial overlap — flowtron's `/ft-task` is workflow-shaped, theirs are tooling-shaped | 13 cmds + bash impl | MIT | 4 commits | **Selective adopt** — `/ft-quality` (sequence lint+typecheck+test outside tasknote flow) |
| 4 | nicholasmartin/claude-workflow-template | Lightweight PM + GitHub Issues integration + 3-tier WISC progressive loading | Project-agnostic | **Architectural twin** — same 3-tier lazy-load model flowtron already uses, but adds **path-scoped `paths:` frontmatter** auto-load (flowtron skills are command-triggered only) | 9 cmds + 1 skill | not stated ⚠️ | 11 commits | **Pattern absorption** — adopt `paths:` auto-load on SPEC/* lazy modules; license blocks vendoring |
| 5 | shanraisshan/claude-code-best-practice | Methodology essay + community-pattern atlas (Superpowers, Everything-CC, Spec Kit) | Project-agnostic | Validates flowtron's 4-phase (Discovery≈Research+Plan, Exec, Test≈Review, Closure≈Ship). Spec-Kit's `constitution→specify→clarify→plan→tasks→implement` is *deeper* upfront scoping than `ft-epic-discovery` | Methodology, light artifacts | MIT | 2026-05-17 (753 commits, 53.5k★) | **Selective adopt** — optional `--deep` mode on `ft-epic-discovery` |
| 6 | ashish141199/obsidian-claude-code | Obsidian vault template w/ wiki-link-aggressive structure + KM skills (`/day`, `/research`, etc.) | Obsidian-specific | Validates flowtron's Obsidian-positioning memory — but their skills are KM-focused, orthogonal to task-execution | 9 KM cmds, todo.md tasks | MIT | 5 commits | **Skip** — no skills to port; positioning validation only |

### Excluded candidates (rationale)

- **hesreallyhim/awesome-claude-code · VoltAgent/awesome-*  · GetBindu · travisvn · glebis** — curated lists / aggregators, not workflow frameworks. Useful for discovery, not adoption.
- **affaan-m/everything-claude-code** — maximalist (136 skills, 30 agents); opposite of flowtron's lean ethos. Skill-shape ideas could be skimmed at audit time.
- **catlog22/Claude-Code-Workflow** — JSON-driven 22-agent / 37-skill framework; heavyweight, not project-agnostic in the same way flowtron is.
- **alirezarezvani/claude-code-github-workflow** — GitHub Actions automation focus; orthogonal to local-workflow scope.
- **luongnv89/claude-howto** — visual guide / tutorial, not a runnable workflow.
- **qdhenry/Claude-Command-Suite** — slash-command suite for code review / security audit; flowtron's `ft-audit*` family already covers static audit.
- **shinpr/claude-code-workflows** — REST API / React templates; stack-specific.

### Recommended adoptions shortlist (ranked)

| Rank | Adoption shape | Source inspiration | Cost estimate | Novelty for flowtron |
|------|----------------|---------------------|----------------|----------------------|
| P1.a | `/ft-stats` skill — aggregate `[model]` distribution + completion velocity from PLAN.md `## Completed` data | claude-leverage `/leverage-stats` | Small (~80 LOC skill) | High — flowtron uniquely has structured model-tag data; nobody else does |
| P1.b | Path-scoped auto-load on `SPEC/*.md` lazy modules via `paths:` frontmatter | claude-workflow-template WISC tier-2 | Small (frontmatter edit + SPEC contract note) | Medium — fills a real gap in flowtron's lazy-load model |
| P1.c | Post-CORE-049 token-audit refresh — apply caveman's 46% memory-compression benchmark to SPEC.md core | caveman + CORE-049 precedent | Medium (audit + targeted rewrites) | Medium — extends an established flowtron pattern |
| P2.a | `/ft-quality` skill — sequence lint+typecheck+test outside tasknote flow | claude-skills-starter `/quality` | Small (~50 LOC skill) | Low — convenience layer; covers a real but minor gap |
| P2.b | Optional `--deep` mode on `ft-epic-discovery` for high-uncertainty epics | spec-kit `constitution→specify→clarify→plan` | Small (skill-prompt edit) | Low — adds an opt-in dimension to existing skill |

### Open question for user (Phase 2 gate)

Per the CORE-049 precedent ("user-approved candidates filed as follow-up tasks"), the shortlist needs approval/pruning before filing children. Surfacing via AskUserQuestion before writing PLAN.md lines.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only).
- [x] Ran lint/type-check on changed code — N/A (markdown-prose only).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the 6 newly-filed PLAN.md lines passed: 2-space child indent preserved, `**CORE-097.N**` bold IDs intact, `[opus]` tag present on every line, `| <shortname>` segment ≤30 chars (longest: 19), em-dash separator (` — `) consistent, long descriptions 21-27w (all under 50w target / 70w hard cap), no trailing whitespace introduced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.1` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/CLAUDE-snippet.md` | no change |

Pure Discovery filing introduced no new contracts/concepts. Adoption-shape contract edits will land inside each implementation child (`CORE-097.2..6`) as appropriate, and the audit `.7` doc-drift sweep will catch cumulative drift.

### Recap

Surveyed 6 shortlisted claude-code / AI-coding workflow repos (caveman, claude-leverage, claude-skills-starter, claude-workflow-template, claude-code-best-practice, obsidian-claude-code) drawn from a ~15-candidate web-discovery pool. Filed 6 children (`.2`-`.7`) under `CORE-EPIC-097` representing 5 user-approved adoptions plus a closing audit subtask — `/ft-stats`, SPEC `paths:` auto-load, SPEC.md token-refresh, `/ft-quality`, `/ft-epic-discovery --deep`, and the audit. All PLAN.md lines word-counted 21-27w (under 50w target / 70w hard cap), `[opus]`-tagged, 2-space-indented under the parent epic. Per-candidate findings table + excluded-candidate rationale recorded for future reference.

**Archived:** 2026-05-18
